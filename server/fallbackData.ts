import { Project, CaseStudy } from "@shared/schema";

// Fallback projects data when database isn't accessible
export const fallbackProjects: Project[] = [
  {
    id: 1,
    title: "Public Website Redesign",
    description: "UI/UX Design, Web Development",
    category: "ui",
    imageSrc: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    tags: ["Figma", "Design System", "Responsive Design"]
  },
  {
    id: 2,
    title: "Platform Core Experience",
    description: "Product Management, UX Strategy",
    category: "product",
    imageSrc: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    tags: ["Roadmapping", "User Interviews", "Feature Prioritization"]
  },
  {
    id: 3,
    title: "Learning Platform",
    description: "Product Manager",
    category: "product",
    imageSrc: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    tags: ["Product Management", "Communication", "Roadmapping", "Leadership"]
  }
];

// Fallback case studies data when database isn't accessible
export const fallbackCaseStudies: { [key: number]: CaseStudy } = {
  1: {
    id: 1,
    projectId: 1,
    client: "Fintech Company",
    timeline: "4 months",
    role: "Lead UI/UX Designer",
    tools: ["Figma", "Adobe Creative Suite", "HTML/CSS"],
    overview: "Complete redesign of the public-facing website for a fintech company, focusing on improving user engagement, conversion rates, and overall brand perception.",
    challenges: [
      {
        icon: "chart-line",
        title: "Low Conversion Rate",
        description: "The existing website had poor conversion metrics with high bounce rates and low time-on-page."
      },
      {
        icon: "users",
        title: "Inconsistent Brand Experience",
        description: "Brand elements varied across pages creating a disjointed user experience."
      },
      {
        icon: "globe",
        title: "International Audience",
        description: "The website needed to serve users from multiple countries with different regulatory requirements."
      }
    ],
    process: [
      {
        icon: "search",
        title: "Research & Discovery",
        description: "Conducted competitor analysis, user interviews, and stakeholder workshops to gather requirements and set project goals."
      },
      {
        icon: "sitemap",
        title: "Information Architecture",
        description: "Reorganized the site structure to improve findability and user flow based on user feedback and analytics."
      },
      {
        icon: "pencil-ruler",
        title: "Wireframing & Prototyping",
        description: "Created low and high-fidelity wireframes to test navigation patterns and content organization."
      },
      {
        icon: "paint-brush",
        title: "Visual Design",
        description: "Developed a comprehensive UI kit and style guide to ensure brand consistency across all pages."
      }
    ],
    results: [
      {
        metric: "+58%",
        description: "Increase in Conversion Rate"
      },
      {
        metric: "+42%",
        description: "Increase in Time on Site"
      },
      {
        metric: "-32%",
        description: "Reduction in Bounce Rate"
      }
    ],
    keyLearnings: [
      {
        title: "User-Centered Approach",
        description: "Prioritizing user needs over stakeholder preferences led to better performance metrics and improved user satisfaction."
      },
      {
        title: "Iterative Testing",
        description: "Regular user testing throughout the design process helped identify issues early and validate design decisions."
      },
      {
        title: "Content Strategy",
        description: "Integrating content creation with design processes ensured messaging and visuals worked together coherently."
      }
    ]
  },
  2: {
    id: 2,
    projectId: 2,
    client: "CAIS",
    timeline: "6 months",
    role: "Product Manager",
    tools: ["Jira", "Figma", "Google Analytics"],
    overview: "Led the redesign of core platform features to improve user experience and operational efficiency while reducing technical debt.",
    challenges: [
      {
        icon: "scale",
        title: "Balance reuse with innovation",
        description: "Needed to standardize components across products while allowing for innovation and customization."
      },
      {
        icon: "pencil",
        title: "User Growth without UX Scaling",
        description: "The platform's user base had grown significantly, but UX resources hadn't scaled accordingly."
      },
      {
        icon: "messages-square",
        title: "Lack of Ownership & Communication",
        description: "Teams were working in silos, causing inconsistent user experiences and redundant development efforts."
      }
    ],
    process: [
      {
        icon: "network",
        title: "Reusable components architecture",
        description: "Established a component-based design system that balanced standardization with flexibility."
      },
      {
        icon: "folder-open",
        title: "Backlog & Documentation",
        description: "Created comprehensive documentation and prioritized product backlog to align development efforts."
      },
      {
        icon: "screen-share",
        title: "Demo & Stakeholders",
        description: "Implemented regular cross-functional demos to break down silos and improve communication."
      },
      {
        icon: "users-round",
        title: "Team Growth & Mentorship",
        description: "Expanded and mentored the product team to handle increased platform complexity."
      }
    ],
    results: [
      {
        metric: "+40%",
        description: "Increase in Feature Development Speed"
      },
      {
        metric: "+65%",
        description: "Improvement in User Satisfaction"
      },
      {
        metric: "-50%",
        description: "Reduction in Design Inconsistencies"
      }
    ],
    keyLearnings: [
      {
        title: "Reestablished Ownership",
        description: "Clear ownership of components and features led to better quality and faster development."
      },
      {
        title: "Organized & Prioritized",
        description: "Structured approach to backlog management improved focus on high-impact features."
      },
      {
        title: "Built a Lean Core Team",
        description: "Small, highly skilled teams with clear responsibilities outperformed larger teams with ambiguous roles."
      },
      {
        title: "User-Centered Enhancements",
        description: "Continuous user feedback ensured features met actual needs rather than assumed requirements."
      }
    ]
  },
  3: {
    id: 3,
    projectId: 3,
    client: "CAIS",
    timeline: "5 months",
    role: "Product Manager",
    tools: ["Jira", "Confluence", "Slack", "Miro"],
    overview: "Led the development of a comprehensive learning platform for financial advisors, focusing on educational content delivery and certification tracking.",
    challenges: [
      {
        icon: "puzzle",
        title: "Complex Integration Requirements",
        description: "The platform needed to integrate with multiple existing systems including CRM, LMS, and certification databases."
      },
      {
        icon: "users",
        title: "Diverse User Needs",
        description: "Users ranged from novice to expert financial advisors with varying technical abilities and educational requirements."
      },
      {
        icon: "calendar",
        title: "Tight Timeline",
        description: "The platform needed to launch within 5 months to support a major company initiative."
      }
    ],
    process: [
      {
        icon: "target",
        title: "Stakeholder alignment",
        description: "Facilitated workshops with key stakeholders to align on vision, goals, and success metrics."
      },
      {
        icon: "users",
        title: "User research & persona development",
        description: "Conducted interviews with financial advisors to understand learning patterns and content needs."
      },
      {
        icon: "layout",
        title: "MVP Scoping",
        description: "Defined a minimal viable product that delivered core value while meeting the deadline constraints."
      },
      {
        icon: "git-branch",
        title: "Agile Implementation",
        description: "Led cross-functional teams using agile methodology to deliver features in priority order."
      }
    ],
    results: [
      {
        metric: "96%",
        description: "Advisor Satisfaction Rate"
      },
      {
        metric: "+78%",
        description: "Increase in Course Completions"
      },
      {
        metric: "100%",
        description: "On-time Launch"
      }
    ],
    keyLearnings: [
      {
        title: "Improved Stakeholder Communication",
        description: "Regular, structured communication with stakeholders prevented scope creep and maintained alignment."
      },
      {
        title: "Content-First Approach",
        description: "Focusing on content quality and structure before UI design led to better educational outcomes."
      },
      {
        title: "Long-Term Planning",
        description: "Balancing immediate needs with long-term platform scalability prevented future technical constraints."
      },
      {
        title: "Cross-Functional Collaboration",
        description: "Tight integration between product, design, and engineering teams improved solution quality and innovation."
      }
    ]
  }
};