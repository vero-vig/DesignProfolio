import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Project, CaseStudy } from "@shared/schema";

interface CaseStudyModalProps {
  projectId: number;
  onClose: () => void;
}

export default function CaseStudyModal({ projectId, onClose }: CaseStudyModalProps) {
  const [open, setOpen] = useState(true);
  
  const { data: project, isLoading: isProjectLoading } = useQuery<Project>({
    queryKey: [`/api/projects/${projectId}`],
    enabled: !!projectId,
  });
  
  const { data: caseStudy, isLoading: isCaseStudyLoading } = useQuery<CaseStudy>({
    queryKey: [`/api/case-studies/${projectId}`],
    enabled: !!projectId,
  });
  
  const handleClose = () => {
    setOpen(false);
    onClose();
  };
  
  const isLoading = isProjectLoading || isCaseStudyLoading;
  
  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Loading case study...</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  
  if (!project || !caseStudy) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Case Study Not Found</DialogTitle>
            <DialogDescription>
              Sorry, we couldn't find the case study you're looking for.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={handleClose}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-left">
          <DialogTitle className="text-3xl font-bold mb-2">{project.title}</DialogTitle>
        </DialogHeader>
        
        <button
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          onClick={handleClose}
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Close</span>
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <img 
              src={project.imageSrc} 
              alt={project.title} 
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
            {(caseStudy.challenges as any[]).map((challenge, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-primary text-2xl mb-3">
                  <i className={`fas fa-${challenge.icon}`}></i>
                </div>
                <h4 className="font-semibold mb-2">{challenge.title}</h4>
                <p className="text-gray-600 text-sm">{challenge.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-6">My Process</h3>
          
          <div className="relative">
            <div className="absolute left-6 h-full w-0.5 bg-gray-200 hidden md:block"></div>
            
            {(caseStudy.process as any[]).map((step, index) => (
              <div key={index} className="relative md:pl-16 pb-8">
                <div className="hidden md:flex absolute left-0 w-12 h-12 rounded-full bg-primary text-white items-center justify-center">
                  <i className={`fas fa-${step.icon}`}></i>
                </div>
                <div className="flex md:hidden items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3">
                    <i className={`fas fa-${step.icon}`}></i>
                  </div>
                  <h4 className="text-xl font-semibold">{step.title}</h4>
                </div>
                <h4 className="text-xl font-semibold mb-2 hidden md:block">{step.title}</h4>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
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
      </DialogContent>
    </Dialog>
  );
}
