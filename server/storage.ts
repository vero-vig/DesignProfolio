import { 
  users, type User, type InsertUser,
  projects, type Project, type InsertProject,
  caseStudies, type CaseStudy, type InsertCaseStudy,
  contactMessages, type ContactMessage, type InsertContactMessage
} from "@shared/schema";

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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private caseStudies: Map<number, CaseStudy>;
  private contactMessages: Map<number, ContactMessage>;
  private userId: number;
  private projectId: number;
  private caseStudyId: number;
  private contactMessageId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.caseStudies = new Map();
    this.contactMessages = new Map();
    this.userId = 1;
    this.projectId = 1;
    this.caseStudyId = 1;
    this.contactMessageId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Project methods
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }
  
  async getProjectById(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }
  
  async getProjectsByCategory(category: string): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(
      (project) => project.category === category
    );
  }
  
  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.projectId++;
    const project: Project = { ...insertProject, id };
    this.projects.set(id, project);
    return project;
  }
  
  // Case Study methods
  async getCaseStudies(): Promise<CaseStudy[]> {
    return Array.from(this.caseStudies.values());
  }
  
  async getCaseStudyByProjectId(projectId: number): Promise<CaseStudy | undefined> {
    return Array.from(this.caseStudies.values()).find(
      (caseStudy) => caseStudy.projectId === projectId
    );
  }
  
  async createCaseStudy(insertCaseStudy: InsertCaseStudy): Promise<CaseStudy> {
    const id = this.caseStudyId++;
    const caseStudy: CaseStudy = { ...insertCaseStudy, id };
    this.caseStudies.set(id, caseStudy);
    return caseStudy;
  }
  
  // Contact methods
  async createContactMessage(insertContactMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.contactMessageId++;
    const contactMessage: ContactMessage = { ...insertContactMessage, id };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }
  
  // Initialize sample data
  private initializeData() {
    // Add projects
    const projects: InsertProject[] = [
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
    
    projects.forEach(project => this.createProject(project));
    
    // Add case studies
    const financialAppCaseStudy: InsertCaseStudy = {
      projectId: 1,
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
      keyLearnings: "This project reinforced the importance of balancing simplicity with depth of functionality, especially for complex data. I learned valuable techniques for presenting financial information in accessible ways while maintaining accuracy and detail for power users. The collaborative approach with the client's development team also provided insights into creating designs that were both visually impressive and technically feasible within their constraints."
    };
    
    this.createCaseStudy(financialAppCaseStudy);
  }
}

export const storage = new MemStorage();
