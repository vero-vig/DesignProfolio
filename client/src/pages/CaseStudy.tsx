import { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import FooterSimple from "@/components/FooterSimple";
import MobileMenu from "@/components/MobileMenu";
import { OptimizedImage } from "@/components/OptimizedImage";
import ImageGallery from "@/components/ImageGallery";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, ExternalLink, Search, FileText, Lightbulb, PenTool, Layers, BarChart, 
  Clock, Users, Lock, ShieldAlert, Zap, Target, Code, Database, UserCheck, 
  Settings, Layout, Smartphone, MessageSquare, Brain, Workflow, FileCheck, TestTube, 
  Laptop, Presentation, ClipboardList, LineChart, Gauge, Puzzle, Rocket,
  FolderOpen, Network, ScreenShare, UsersRound, Globe, Monitor, Scale,
  Pencil, MessagesSquare, User, CalendarDays, Timer, ListChecks, Terminal
} from "lucide-react";
import { CaseStudy, Project } from "@shared/schema";
import ResumeDownloadMenu from "@/components/ResumeDownloadMenu";

export default function CaseStudyPage() {
  const [, setLocation] = useLocation();
  const [_, params] = useRoute<{ id: string }>("/case-study/:id");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const projectId = params ? parseInt(params.id) : 0;
  
  const { data: project, isLoading: isProjectLoading } = useQuery<Project>({
    queryKey: [`/api/projects/${projectId}`],
    enabled: !!projectId,
  });
  
  const { data: caseStudy, isLoading: isCaseStudyLoading } = useQuery<CaseStudy>({
    queryKey: [`/api/case-studies/${projectId}`],
    enabled: !!projectId,
  });
  
  const isLoading = isProjectLoading || isCaseStudyLoading;
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header toggleMobileMenu={toggleMobileMenu} />
        <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        <main className="pt-24 pb-16 px-4">
          <div className="container mx-auto">
            <div className="flex justify-center items-center min-h-[50vh]">
              <div className="animate-pulse">
                <div className="h-10 bg-gray-200 rounded-md w-64 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded-md w-96 mb-8"></div>
                <div className="h-60 bg-gray-200 rounded-md w-full max-w-3xl"></div>
              </div>
            </div>
          </div>
        </main>
        <FooterSimple />
      </div>
    );
  }
  
  if (!project || !caseStudy) {
    return (
      <div className="min-h-screen bg-white">
        <Header toggleMobileMenu={toggleMobileMenu} />
        <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        <main className="pt-24 pb-16 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Case Study Not Found</h2>
            <p className="mb-8">The case study you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => setLocation("/")} variant="default">
              Return to Home
            </Button>
          </div>
        </main>
        <FooterSimple />
      </div>
    );
  }
  
  // Generate dynamic meta descriptions based on case study content
  const getMetaDescription = () => {
    if (!project || !caseStudy) return "";
    return `Case study: ${project.title} for ${caseStudy.client}. ${caseStudy.overview.substring(0, 150)}...`;
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{project?.title} Case Study | Veronica Vignoni | Product Manager & Designer</title>
        <meta name="description" content={getMetaDescription()} />
        <meta name="keywords" content={`${project?.title}, Case Study, ${caseStudy?.client}, ${project?.tags?.join(", ")}, Veronica Vignoni, Product Management, UX/UI Design`} />
        <link rel="canonical" href={`https://vero.pmdesign.com/case-study/${projectId}`} />
        
        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content={`${project?.title} Case Study | Veronica Vignoni`} />
        <meta property="og:description" content={getMetaDescription()} />
        <meta property="og:image" content={project?.imageSrc} />
        <meta property="og:url" content={`https://vero.pmdesign.com/case-study/${projectId}`} />
        <meta property="og:type" content="article" />
        
        {/* Structured data for case study */}
        <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "${project?.title} Case Study",
            "author": {
              "@type": "Person",
              "name": "Veronica Vignoni"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Vero.PM&Design",
              "logo": {
                "@type": "ImageObject",
                "url": "https://vero.pmdesign.com/logo.png"
              }
            },
            "description": "${getMetaDescription().replace(/"/g, '\\"')}",
            "image": "${project?.imageSrc}",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://vero.pmdesign.com/case-study/${projectId}"
            },
            "keywords": "${project?.tags?.join(", ")}",
            "articleSection": "Case Study"
          }
        `}
        </script>
      </Helmet>
      <Header toggleMobileMenu={toggleMobileMenu} />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <Button
            variant="ghost"
            className="mb-8 hover:bg-secondary"
            onClick={() => setLocation("/#portfolio")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
          </Button>
          
          <h1 className="text-3xl lg:text-4xl font-bold mb-6">{project.title}</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <OptimizedImage 
                src={project.imageSrc} 
                alt={`${project.title} - Case study for ${caseStudy.client} by Veronica Vignoni`}
                className="rounded-xl shadow-md w-full h-auto"
              />
            </div>
            
            <div>
              <div className="bg-secondary p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Project Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-700">Client</h4>
                    <p>{caseStudy.client}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700">Timeline</h4>
                    <p>{caseStudy.timeline}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700">Role</h4>
                    <p>{caseStudy.role}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700">Tools</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {caseStudy.tools?.map((tool, index) => (
                        <span key={index} className="text-xs font-medium bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <ResumeDownloadMenu 
                  className="w-full flex justify-center bg-primary text-white px-6 py-3 hover:bg-opacity-90 transition-colors duration-300"
                  buttonVariant="ghost"
                  buttonText="Download CV"
                />
              </div>
            </div>
          </div>
          
          <div className="mb-10">
            <h3 className="text-2xl font-semibold mb-4">Project Overview</h3>
            <p className="text-gray-600">
              {caseStudy.overview}
            </p>
          </div>
          
          <div className="mb-10">
            <h3 className="text-2xl font-semibold mb-4">The Challenge</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(caseStudy.challenges as any[]).map((challenge, index) => {
                // Select the appropriate icon based on the challenge title or content
                const getChallengeIcon = (title: string, description: string = '') => {
                  // Client's specific icon requests for "The Challenge" section
                  if (title.includes('Balance reuse with innovation')) {
                    return <Scale className="h-6 w-6" />;
                  } else if (title.includes('User Growth without UX Scaling')) {
                    return <Pencil className="h-6 w-6" />;
                  } else if (title.includes('Lack of Ownership & Communication')) {
                    return <MessagesSquare className="h-6 w-6" />;
                  }
                  
                  const titleLower = title.toLowerCase();
                  const descLower = description.toLowerCase();
                  const combinedText = titleLower + ' ' + descLower;
                  
                  if (titleLower.includes('time') || titleLower.includes('deadline') || combinedText.includes('schedule')) {
                    return <Clock className="h-6 w-6" />;
                  } else if (titleLower.includes('user') || titleLower.includes('customer') || combinedText.includes('stakeholder')) {
                    return <Users className="h-6 w-6" />;
                  } else if (titleLower.includes('security') || titleLower.includes('privacy') || combinedText.includes('protect')) {
                    return <Lock className="h-6 w-6" />;
                  } else if (titleLower.includes('risk') || titleLower.includes('compliance') || combinedText.includes('regulatory')) {
                    return <ShieldAlert className="h-6 w-6" />;
                  } else if (titleLower.includes('performance') || titleLower.includes('speed') || combinedText.includes('fast')) {
                    return <Zap className="h-6 w-6" />;
                  } else if (titleLower.includes('goal') || titleLower.includes('objective') || combinedText.includes('target')) {
                    return <Target className="h-6 w-6" />;
                  } else if (titleLower.includes('tech') || titleLower.includes('technology') || combinedText.includes('code')) {
                    return <Code className="h-6 w-6" />;
                  } else if (titleLower.includes('data') || titleLower.includes('information') || combinedText.includes('database')) {
                    return <Database className="h-6 w-6" />;
                  } else if (titleLower.includes('budget') || titleLower.includes('cost') || combinedText.includes('expense')) {
                    return <LineChart className="h-6 w-6" />;
                  } else if (titleLower.includes('complex') || titleLower.includes('integration') || combinedText.includes('system')) {
                    return <Puzzle className="h-6 w-6" />;
                  } else if (titleLower.includes('balance') || combinedText.includes('balance')) {
                    return <Scale className="h-6 w-6" />;
                  } else {
                    return <ShieldAlert className="h-6 w-6" />;
                  }
                };

                const icon = getChallengeIcon(challenge.title, challenge.description);
                
                return (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="text-primary mb-3">
                      {icon}
                    </div>
                    <h4 className="font-semibold mb-2">{challenge.title}</h4>
                    <p className="text-gray-600 text-sm">{challenge.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="mb-10">
            <h3 className="text-2xl font-semibold mb-6">My Process</h3>
            
            <div className="relative">
              <div className="absolute left-6 h-full w-0.5 bg-gray-200 hidden md:block"></div>
              
              {(caseStudy.process as any[]).map((step, index) => {
                // Select the appropriate icon based on the specific step title
                const getStepIcon = (title: string, description: string = '') => {
                  // Client's specific icon requests for "My Process" section
                  // Special case for "Design Product and Design System" project (ID 4)
                  if (title === "Built from the Ground Up") {
                    return <PenTool className="h-5 w-5" />;
                  } else if (title === "Hands-on Frontend Work") {
                    return <Code className="h-5 w-5" />;
                  } else if (title === "Team Enablement & Education") {
                    return <UsersRound className="h-5 w-5" />;
                  } else if (title === "User-Centric Collaboration") {
                    return <Pencil className="h-5 w-5" />;
                  } else if (title === "Process Improvement") {
                    return <ListChecks className="h-5 w-5" />;
                  } 
                  // Other existing cases
                  else if (title.includes('Reusable components architecture')) {
                    return <Network className="h-5 w-5" />;
                  } else if (title.includes('Backlog & Documentation')) {
                    return <FolderOpen className="h-5 w-5" />;
                  } else if (title.includes('Demo & Stakeholders')) {
                    return <ScreenShare className="h-5 w-5" />;
                  } else if (title.includes('Team Growth & Mentorship')) {
                    return <UsersRound className="h-5 w-5" />;
                  } else if (title.includes('Permission Logic Rollout')) {
                    return <FolderOpen className="h-5 w-5" />;
                  } else if (title.includes('Stakeholder alignment') || title.includes('MVP Scoping')) {
                    return <Monitor className="h-5 w-5" />;
                  } else if (title.includes('Reestablished Ownership')) {
                    return <User className="h-5 w-5" />;
                  } else if (title.includes('Organized & Prioritized')) {
                    return <ListChecks className="h-5 w-5" />;
                  } else if (title.includes('Built a Lean Core Team')) {
                    return <Laptop className="h-5 w-5" />;
                  } else if (title.includes('User-Centered Enhancements')) {
                    return <User className="h-5 w-5" />;
                  } else if (title.includes('Improved Stakeholder Communication')) {
                    return <MessagesSquare className="h-5 w-5" />;
                  } else if (title.includes('Long-Term Planning')) {
                    return <CalendarDays className="h-5 w-5" />;
                  }
                  
                  // Generic matching for other steps
                  const titleLower = title.toLowerCase();
                  const descLower = description.toLowerCase();
                  const combinedText = titleLower + ' ' + descLower;

                  // Very specific matches
                  if (titleLower.includes('tech stack') || titleLower.includes('integration') || combinedText.includes('code')) {
                    return <Code className="h-5 w-5" />;
                  } else if (titleLower.includes('user testing') || titleLower.includes('usability')) {
                    return <UserCheck className="h-5 w-5" />;
                  } else if (titleLower.includes('data') || titleLower.includes('database')) {
                    return <Database className="h-5 w-5" />;
                  } else if (titleLower.includes('workshop') || titleLower.includes('brainstorm')) {
                    return <MessageSquare className="h-5 w-5" />;
                  } else if (titleLower.includes('mobile') || titleLower.includes('responsive')) {
                    return <Smartphone className="h-5 w-5" />;
                  } else if (titleLower.includes('wireframe') || titleLower.includes('layout')) {
                    return <Layout className="h-5 w-5" />;
                  } else if (titleLower.includes('strategy') || titleLower.includes('planning')) {
                    return <ClipboardList className="h-5 w-5" />;
                  } else if (titleLower.includes('workflow') || titleLower.includes('process')) {
                    return <Workflow className="h-5 w-5" />;
                  } else if (titleLower.includes('testing') || titleLower.includes('qa')) {
                    return <TestTube className="h-5 w-5" />;
                  } else if (titleLower.includes('requirement') || titleLower.includes('specification')) {
                    return <FileCheck className="h-5 w-5" />;
                  } else if (titleLower.includes('analysis') || titleLower.includes('metrics')) {
                    return <LineChart className="h-5 w-5" />;
                  } else if (titleLower.includes('present') || titleLower.includes('pitch')) {
                    return <Presentation className="h-5 w-5" />;
                  } else if (titleLower.includes('performance') || titleLower.includes('speed')) {
                    return <Gauge className="h-5 w-5" />;
                  } else if (titleLower.includes('implementation') || titleLower.includes('develop')) {
                    return <Puzzle className="h-5 w-5" />;
                  } else if (titleLower.includes('deploy') || titleLower.includes('launch')) {
                    return <Rocket className="h-5 w-5" />;
                  }
                  
                  // More general matches
                  else if (titleLower.includes('research') || titleLower.includes('discover')) {
                    return <Search className="h-5 w-5" />;
                  } else if (titleLower.includes('ideation') || titleLower.includes('idea')) {
                    return <Lightbulb className="h-5 w-5" />;
                  } else if (titleLower.includes('design') || titleLower.includes('prototype')) {
                    return <PenTool className="h-5 w-5" />;
                  } else if (titleLower.includes('configure') || titleLower.includes('setting')) {
                    return <Settings className="h-5 w-5" />;
                  } else if (titleLower.includes('concept') || titleLower.includes('thinking')) {
                    return <Brain className="h-5 w-5" />;
                  } else if (titleLower.includes('review') || titleLower.includes('evaluation')) {
                    return <BarChart className="h-5 w-5" />;
                  } else {
                    return <Laptop className="h-5 w-5" />;
                  }
                };

                const icon = getStepIcon(step.title, step.description);
                
                return (
                  <div key={index} className="relative md:pl-16 pb-8">
                    <div className="hidden md:flex absolute left-0 w-12 h-12 rounded-full bg-primary text-white items-center justify-center">
                      {icon}
                    </div>
                    <div className="flex md:hidden items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3">
                        {icon}
                      </div>
                      <h4 className="text-xl font-semibold">{step.title}</h4>
                    </div>
                    <h4 className="text-xl font-semibold mb-2 hidden md:block">{step.title}</h4>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Gallery Section */}
          {caseStudy.galleryImages && caseStudy.galleryImages.length > 0 && (
            <div className="mb-10">
              <h3 className="text-2xl font-semibold mb-6">Gallery</h3>
              <ImageGallery 
                images={caseStudy.galleryImages} 
                title={project.title}
              />
            </div>
          )}
          
          <div className="mb-10">
            <h3 className="text-2xl font-semibold mb-6">Results & Impact</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {(caseStudy.results as any[]).map((result, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm text-center">
                  <div className="text-primary text-3xl font-bold mb-2">
                    {result.metric}
                  </div>
                  <p className="text-gray-600">{result.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-4">Key Learnings</h3>
            <div className="text-gray-600">
              {Array.isArray(caseStudy.keyLearnings) && 
                caseStudy.keyLearnings.map((learning: {title: string, description: string}, index: number) => (
                  <div key={index} className="mb-6">
                    <h4 className="font-bold text-lg mb-2">{learning.title}</h4>
                    <p>{learning.description}</p>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </main>
      
      <FooterSimple />
    </div>
  );
}
