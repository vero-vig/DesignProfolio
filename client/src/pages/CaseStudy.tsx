import { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import FooterSimple from "@/components/FooterSimple";
import MobileMenu from "@/components/MobileMenu";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Search, FileText, Lightbulb, PenTool, Layers, BarChart, Clock, Users, Lock, ShieldAlert, Zap, Target } from "lucide-react";
import { CaseStudy, Project } from "@shared/schema";
import resume from "@/assets/Veronica_Vignoni_CV.pdf";

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
  
  return (
    <div className="min-h-screen bg-white">
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
              <img 
                src={project.imageSrc} 
                alt={project.title} 
                className="rounded-xl shadow-md w-full h-auto object-cover"
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
                <a 
                  href={resume} 
                  download="Vero_CV.pdf"
                  className="flex items-center justify-center w-full bg-primary text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-colors duration-300"
                >
                  Download CV <ExternalLink className="ml-2 h-4 w-4" />
                </a>
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
                const getChallengeIcon = (title: string) => {
                  const titleLower = title.toLowerCase();
                  if (titleLower.includes('time') || titleLower.includes('deadline')) {
                    return <Clock className="h-6 w-6" />;
                  } else if (titleLower.includes('user') || titleLower.includes('customer')) {
                    return <Users className="h-6 w-6" />;
                  } else if (titleLower.includes('security') || titleLower.includes('privacy')) {
                    return <Lock className="h-6 w-6" />;
                  } else if (titleLower.includes('risk') || titleLower.includes('compliance')) {
                    return <ShieldAlert className="h-6 w-6" />;
                  } else if (titleLower.includes('performance') || titleLower.includes('speed')) {
                    return <Zap className="h-6 w-6" />;
                  } else if (titleLower.includes('goal') || titleLower.includes('objective')) {
                    return <Target className="h-6 w-6" />;
                  } else {
                    return <ShieldAlert className="h-6 w-6" />;
                  }
                };

                const icon = getChallengeIcon(challenge.title);
                
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
                // Select the appropriate icon based on the step title or content
                const getStepIcon = (title: string) => {
                  const titleLower = title.toLowerCase();
                  if (titleLower.includes('research') || titleLower.includes('discover')) {
                    return <Search className="h-5 w-5" />;
                  } else if (titleLower.includes('analysis') || titleLower.includes('define')) {
                    return <FileText className="h-5 w-5" />;
                  } else if (titleLower.includes('ideation') || titleLower.includes('idea')) {
                    return <Lightbulb className="h-5 w-5" />;
                  } else if (titleLower.includes('design') || titleLower.includes('prototype')) {
                    return <PenTool className="h-5 w-5" />;
                  } else if (titleLower.includes('implementation') || titleLower.includes('develop')) {
                    return <Layers className="h-5 w-5" />;
                  } else if (titleLower.includes('testing') || titleLower.includes('evaluation')) {
                    return <BarChart className="h-5 w-5" />;
                  } else {
                    return <FileText className="h-5 w-5" />;
                  }
                };

                const icon = getStepIcon(step.title);
                
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
