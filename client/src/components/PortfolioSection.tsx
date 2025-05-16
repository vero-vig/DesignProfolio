import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import CaseStudyModal from "./CaseStudyModal";
import { OptimizedImage } from "./OptimizedImage";
import { Project } from "@shared/schema";
import { Tag } from "lucide-react";

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [, setLocation] = useLocation();

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };
  
  const openCaseStudy = (project: Project) => {
    setLocation(`/case-study/${project.id}`);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="portfolio" className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">My Portfolio</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Showcasing my work in product management and UX/UI design across various industries and platforms.
          </p>
        </div>

        {/* Portfolio Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button 
            variant={activeFilter === "all" ? "default" : "outline"}
            className="rounded-full"
            onClick={() => handleFilterClick("all")}
          >
            All
          </Button>
          <Button 
            variant={activeFilter === "product" ? "default" : "outline"}
            className="rounded-full"
            onClick={() => handleFilterClick("product")}
          >
            Product Management
          </Button>
          <Button 
            variant={activeFilter === "ui" ? "default" : "outline"}
            className="rounded-full"
            onClick={() => handleFilterClick("ui")}
          >
            UX/UI Design
          </Button>
        </div>

        {/* Portfolio Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md">
                <div className="w-full h-64 bg-gray-200 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-gray-200 rounded-full w-16 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <AnimatePresence>
              {filteredProjects.map(project => (
                <motion.div 
                  key={project.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                  variants={item}
                  layout
                >
                  <div className="relative">
                    <OptimizedImage 
                      src={project.imageSrc} 
                      alt={`${project.title} - ${project.description} by Veronica Vignoni`} 
                      className="w-full h-64" 
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-primary bg-opacity-90 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <Button 
                        variant="secondary" 
                        className="rounded-full text-primary"
                        onClick={() => openCaseStudy(project)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags?.map((tag, index) => (
                        <span key={index} className="text-xs font-medium bg-purple-100 text-purple-800 px-3 py-1 rounded-full flex items-center">
                          <Tag size={10} className="mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

{/* "View All Projects" button hidden as requested
        <div className="text-center mt-12">
          <a href="#" className="inline-flex items-center text-primary hover:underline">
            View All Projects <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
*/}
      </div>

      {selectedProject && (
        <CaseStudyModal 
          projectId={selectedProject.id} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
}
