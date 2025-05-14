import { pgTable, text, serial, integer, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users schema (basic auth)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Portfolio projects schema
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // ui, ux, product
  imageSrc: text("image_src").notNull(),
  tags: text("tags").array(),
});

// Case studies schema
export const caseStudies = pgTable("case_studies", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  client: text("client").notNull(),
  timeline: text("timeline").notNull(),
  role: text("role").notNull(),
  tools: text("tools").array(),
  overview: text("overview").notNull(),
  challenges: json("challenges").notNull(),
  process: json("process").notNull(),
  results: json("results").notNull(),
  keyLearnings: json("key_learnings").notNull(),
});

// Contact messages schema
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  recipient: text("recipient"),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertProjectSchema = createInsertSchema(projects).pick({
  title: true,
  description: true,
  category: true,
  imageSrc: true,
  tags: true,
});

export const insertCaseStudySchema = createInsertSchema(caseStudies).pick({
  projectId: true,
  client: true,
  timeline: true,
  role: true,
  tools: true,
  overview: true,
  challenges: true,
  process: true,
  results: true,
  keyLearnings: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
  recipient: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type InsertCaseStudy = z.infer<typeof insertCaseStudySchema>;
export type CaseStudy = typeof caseStudies.$inferSelect;

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
