import { useState } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import FooterSimple from "@/components/FooterSimple";
import MobileMenu from "@/components/MobileMenu";
import { OptimizedImage } from "@/components/OptimizedImage";
import ImageGallery from "@/components/ImageGallery";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { IconMapper } from "@/components/ui/IconMapper";
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
              {(caseStudy.challenges as any[]).map((challenge, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="text-primary mb-3">
                    <IconMapper iconName={challenge.icon || "target"} className="h-6 w-6" />
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
                    <IconMapper iconName={step.icon || "target"} className="h-5 w-5" />
                  </div>
                  <div className="flex md:hidden items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3">
                      <IconMapper iconName={step.icon || "target"} className="h-4 w-4" />
                    </div>
                    <h4 className="text-xl font-semibold">{step.title}</h4>
                  </div>
                  <h4 className="text-xl font-semibold mb-2 hidden md:block">{step.title}</h4>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Gallery Section */}
          {caseStudy.galleryImages && caseStudy.galleryImages.length > 0 && (
            <div className="mb-10">
              <h3 className="text-2xl font-semibold mb-6">Gallery</h3>
              <ImageGallery 
                images={caseStudy.galleryImages} 
                originalImages={Array.isArray(caseStudy.originalImages) ? caseStudy.originalImages : undefined}
                title={project.title}
              />
            </div>
          )}
          
          {/* Results/Outcomes Section */}
          {caseStudy.outcomes && (
            <div className="mb-10">
              <h3 className="text-2xl font-semibold mb-4">Results & Impact</h3>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <p className="text-gray-600">
                  {caseStudy.outcomes}
                </p>
              </div>
            </div>
          )}
          
          {/* Key Learnings Section */}
          {caseStudy.learnings && (
            <div className="mb-10">
              <h3 className="text-2xl font-semibold mb-4">Key Learnings</h3>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <p className="text-gray-600">
                  {caseStudy.learnings}
                </p>
              </div>
            </div>
          )}
          
          {/* Next Case Study Section (if applicable) */}
          {caseStudy.nextProjectId && (
            <div className="text-center mt-16">
              <h3 className="text-xl font-semibold mb-4">Explore More Work</h3>
              <Button 
                variant="default" 
                className="px-6"
                onClick={() => setLocation(`/case-study/${caseStudy.nextProjectId}`)}
              >
                Next Case Study
              </Button>
            </div>
          )}
        </div>
      </main>
      <FooterSimple />
    </div>
  );
}