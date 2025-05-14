import { 
  users, type User, type InsertUser,
  projects, type Project, type InsertProject,
  caseStudies, type CaseStudy, type InsertCaseStudy,
  contactMessages, type ContactMessage, type InsertContactMessage
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Project methods
  getProjects(): Promise<Project[]>;
  getProjectById(id: number): Promise<Project | undefined>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  
  // Case Study methods
  getCaseStudies(): Promise<CaseStudy[]>;
  getCaseStudyByProjectId(projectId: number): Promise<CaseStudy | undefined>;
  createCaseStudy(caseStudy: InsertCaseStudy): Promise<CaseStudy>;
  
  // Contact methods
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result.length > 0 ? result[0] : undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result.length > 0 ? result[0] : undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }
  
  // Project methods
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }
  
  async getProjectById(id: number): Promise<Project | undefined> {
    const result = await db.select().from(projects).where(eq(projects.id, id));
    return result.length > 0 ? result[0] : undefined;
  }
  
  async getProjectsByCategory(category: string): Promise<Project[]> {
    return await db.select().from(projects).where(eq(projects.category, category));
  }
  
  async createProject(insertProject: InsertProject): Promise<Project> {
    const result = await db.insert(projects).values(insertProject).returning();
    return result[0];
  }
  
  // Case Study methods
  async getCaseStudies(): Promise<CaseStudy[]> {
    return await db.select().from(caseStudies);
  }
  
  async getCaseStudyByProjectId(projectId: number): Promise<CaseStudy | undefined> {
    const result = await db.select().from(caseStudies).where(eq(caseStudies.projectId, projectId));
    return result.length > 0 ? result[0] : undefined;
  }
  
  async createCaseStudy(insertCaseStudy: InsertCaseStudy): Promise<CaseStudy> {
    const result = await db.insert(caseStudies).values(insertCaseStudy).returning();
    return result[0];
  }
  
  // Contact methods
  async createContactMessage(insertContactMessage: InsertContactMessage): Promise<ContactMessage> {
    const result = await db.insert(contactMessages).values(insertContactMessage).returning();
    return result[0];
  }

  // Method to initialize the database with sample data
  async initializeDataIfEmpty() {
    // Check if projects table is empty
    const existingProjects = await db.select().from(projects);
    
    if (existingProjects.length === 0) {
      // Add projects
      const projectsData: InsertProject[] = [
        {
          title: "Financial App Redesign",
          description: "UI/UX Design, Mobile App",
          category: "ui",
          imageSrc: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
          tags: ["Figma", "Design System", "Prototyping"]
        },
        {
          title: "E-commerce Product Launch",
          description: "Product Management, Strategy",
          category: "product",
          imageSrc: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
          tags: ["Roadmapping", "Market Research", "A/B Testing"]
        },
        {
          title: "Streaming Service User Research",
          description: "UX Research, User Testing",
          category: "ux",
          imageSrc: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
          tags: ["User Interviews", "Usability Testing", "Heuristic Evaluation"]
        },
        {
          title: "Analytics Dashboard Redesign",
          description: "UI Design, Data Visualization",
          category: "ui",
          imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
          tags: ["Adobe XD", "Information Architecture", "Data Viz"]
        },
        {
          title: "SaaS Product Strategy",
          description: "Product Management, Go-to-market",
          category: "product",
          imageSrc: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
          tags: ["Product Strategy", "OKRs", "User Stories"]
        },
        {
          title: "Health App User Experience",
          description: "UX Design, Wireframing",
          category: "ux",
          imageSrc: "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
          tags: ["User Flows", "Information Architecture", "Accessibility"]
        }
      ];
      
      // Insert all projects
      const insertedProjects = await db.insert(projects).values(projectsData).returning({ id: projects.id });
      
      // Add case study for the Financial App Redesign project
      if (insertedProjects.length > 0) {
        const financialAppProjectId = insertedProjects[0].id;
        
        const financialAppCaseStudy: InsertCaseStudy = {
          projectId: financialAppProjectId,
          client: "FinTech Solutions Inc.",
          timeline: "3 months",
          role: "Lead UI/UX Designer",
          tools: ["Figma", "Design System", "Prototyping"],
          overview: "The client approached me to redesign their financial management app to improve user engagement and satisfaction. The existing app had poor user retention and satisfaction scores, despite offering valuable financial tools. I was tasked with completely reimagining the user experience while maintaining the core functionality that users valued, with a focus on making financial data more accessible and actionable.",
          challenges: [
            {
              icon: "chart-line",
              title: "Complex Data Visualization",
              description: "Financial data needed to be presented in an intuitive way without losing important details."
            },
            {
              icon: "users",
              title: "Diverse User Base",
              description: "Users ranged from financial novices to experts, requiring an interface that worked for both."
            },
            {
              icon: "shield-alt",
              title: "Security Concerns",
              description: "Balancing ease of use with appropriate security measures for sensitive financial data."
            }
          ],
          process: [
            {
              icon: "search",
              title: "Research & Discovery",
              description: "Conducted user interviews, competitive analysis, and usability testing on the existing app to identify pain points and opportunities. Key findings showed users struggled with navigation, understanding their financial status at a glance, and found the transaction history difficult to parse."
            },
            {
              icon: "pencil-ruler",
              title: "UX Design & Wireframing",
              description: "Created user flows, information architecture, and wireframes focusing on simplifying navigation and making key information accessible. Implemented a new dashboard approach with customizable widgets and a simplified navigation system."
            },
            {
              icon: "paint-brush",
              title: "UI Design & Prototyping",
              description: "Developed a clean, professional visual design system with accessible color schemes and typography that improved readability of financial data. Created interactive prototypes for testing key user flows and gathering feedback before implementation."
            },
            {
              icon: "check-circle",
              title: "Testing & Iteration",
              description: "Conducted usability testing with diverse user groups to validate design decisions and identify areas for improvement. Iterated based on user feedback, particularly improving transaction filtering and categorization features."
            }
          ],
          results: [
            {
              metric: "+42%",
              description: "Increase in Daily Active Users"
            },
            {
              metric: "+38%",
              description: "Improvement in User Satisfaction"
            },
            {
              metric: "-24%",
              description: "Reduction in Support Tickets"
            }
          ],
          keyLearnings: [
            {
              title: "General Insights",
              description: "This project reinforced the importance of balancing simplicity with depth of functionality, especially for complex data. I learned valuable techniques for presenting financial information in accessible ways while maintaining accuracy and detail for power users."
            },
            {
              title: "User-Centered Design Process",
              description: "Started with extensive user research to understand pain points. Conducted multiple rounds of usability testing. Implemented changes based on real user feedback."
            },
            {
              title: "Data Visualization Principles",
              description: "Used progressive disclosure for complex information. Applied consistent color coding for financial metrics. Created custom visualizations for key financial indicators."
            },
            {
              title: "Collaboration with Development",
              description: "Daily standups with engineering team improved implementation. Technical constraints informed design decisions early. Documentation of design system ensured consistency."
            }
          ]
        };
        
        await db.insert(caseStudies).values(financialAppCaseStudy);
      }
    }
  }
}

export const storage = new DatabaseStorage();
