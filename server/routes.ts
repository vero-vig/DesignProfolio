import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import express from "express";
import { insertContactMessageSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.get("/api/projects", async (req, res) => {
    try {
      const category = req.query.category as string;
      
      let projects;
      if (category && category !== "all") {
        projects = await storage.getProjectsByCategory(category);
      } else {
        projects = await storage.getProjects();
      }
      
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Error fetching projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const project = await storage.getProjectById(id);
      
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ message: "Error fetching project" });
    }
  });

  app.get("/api/case-studies/:projectId", async (req, res) => {
    try {
      const projectId = parseInt(req.params.projectId);
      const caseStudy = await storage.getCaseStudyByProjectId(projectId);
      
      if (!caseStudy) {
        return res.status(404).json({ message: "Case study not found" });
      }
      
      res.json(caseStudy);
    } catch (error) {
      console.error("Error fetching case study:", error);
      res.status(500).json({ message: "Error fetching case study" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      // Extract recipient if provided
      const { recipient, ...contactData } = req.body;
      
      const result = insertContactMessageSchema.safeParse(contactData);
      
      if (!result.success) {
        const errorMessage = fromZodError(result.error).message;
        return res.status(400).json({ message: errorMessage });
      }
      
      // Store the contact message in the database
      const contactMessage = await storage.createContactMessage(result.data);
      
      // Here you would typically send an email to the recipient (veronica.vignoni@gmail.com)
      // This would require an email service integration
      console.log(`New contact form submission would be sent to: ${recipient || 'veronica.vignoni@gmail.com'}`);
      console.log(`From: ${result.data.name} (${result.data.email})`);
      console.log(`Subject: ${result.data.subject}`);
      console.log(`Message: ${result.data.message}`);
      
      res.status(201).json({ message: "Message sent successfully" });
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({ message: "Error sending message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
