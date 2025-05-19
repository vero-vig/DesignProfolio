import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import express from "express";
import { insertContactMessageSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { sendContactFormEmail } from "./email";
import { fallbackProjects, fallbackCaseStudies } from "./fallbackData";
import { log } from "./vite";

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
      
      // If we got real data from database, return it
      if (projects && projects.length > 0) {
        return res.json(projects);
      }
      
      // If no projects found in database, use fallback data
      log("Database connection issue - using fallback project data");
      const fallbackData = category && category !== "all" 
        ? fallbackProjects.filter(p => p.category === category) 
        : fallbackProjects;
        
      res.json(fallbackData);
    } catch (error) {
      console.error("Error fetching projects:", error);
      log("Database error - using fallback project data");
      
      // Use fallback data when database is unreachable
      const category = req.query.category as string;
      const fallbackData = category && category !== "all" 
        ? fallbackProjects.filter(p => p.category === category) 
        : fallbackProjects;
        
      res.json(fallbackData);
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const project = await storage.getProjectById(id);
      
      if (project) {
        return res.json(project);
      }
      
      // If project not found in database, check fallback data
      const fallbackProject = fallbackProjects.find(p => p.id === id);
      if (fallbackProject) {
        log(`Database connection issue - using fallback data for project ${id}`);
        return res.json(fallbackProject);
      }
      
      return res.status(404).json({ message: "Project not found" });
    } catch (error) {
      console.error("Error fetching project:", error);
      
      // Check fallback data when database is unreachable
      const id = parseInt(req.params.id);
      const fallbackProject = fallbackProjects.find(p => p.id === id);
      
      if (fallbackProject) {
        log(`Database error - using fallback data for project ${id}`);
        return res.json(fallbackProject);
      }
      
      res.status(404).json({ message: "Project not found" });
    }
  });

  app.get("/api/case-studies/:projectId", async (req, res) => {
    try {
      const projectId = parseInt(req.params.projectId);
      const caseStudy = await storage.getCaseStudyByProjectId(projectId);
      
      if (caseStudy) {
        return res.json(caseStudy);
      }
      
      // If case study not found in database, check fallback data
      const fallbackCaseStudy = fallbackCaseStudies[projectId];
      if (fallbackCaseStudy) {
        log(`Database connection issue - using fallback data for case study ${projectId}`);
        return res.json(fallbackCaseStudy);
      }
      
      return res.status(404).json({ message: "Case study not found" });
    } catch (error) {
      console.error("Error fetching case study:", error);
      
      // Check fallback data when database is unreachable
      const projectId = parseInt(req.params.projectId);
      const fallbackCaseStudy = fallbackCaseStudies[projectId];
      
      if (fallbackCaseStudy) {
        log(`Database error - using fallback data for case study ${projectId}`);
        return res.json(fallbackCaseStudy);
      }
      
      res.status(404).json({ message: "Case study not found" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      // Prepare contact data with recipient
      const contactData = {
        ...req.body,
        recipient: req.body.recipient || 'veronica.vignoni@gmail.com'
      };
      
      const result = insertContactMessageSchema.safeParse(contactData);
      
      if (!result.success) {
        const errorMessage = fromZodError(result.error).message;
        return res.status(400).json({ message: errorMessage });
      }
      
      // Store the contact message in the database
      const contactMessage = await storage.createContactMessage(result.data);
      
      // Send the email via SendGrid
      const emailSent = await sendContactFormEmail(contactMessage);
      
      if (!emailSent) {
        console.warn('Email delivery failed, but contact was saved in database');
      }
      
      res.status(201).json({ 
        message: "Message sent successfully", 
        emailDelivered: emailSent
      });
    } catch (error: any) {
      console.error("Error sending message:", error);
      
      // Send more detailed error message
      const errorMessage = error.message || "Unknown error occurred";
      res.status(500).json({ 
        message: "Error sending message", 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
