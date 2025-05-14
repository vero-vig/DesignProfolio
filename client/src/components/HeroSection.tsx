import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Linkedin, Instagram } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="home" className="pt-24 lg:pt-32 pb-16 lg:pb-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">
              <span className="text-primary">Product Manager</span> & UX/UI Designer
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-8">
              I create thoughtful digital experiences and lead product development that drives business results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                size="lg" 
                className="rounded-full px-8"
                id="view-portfolio-btn"
              >
                <a href="#portfolio">View Portfolio</a>
              </Button>
              <Button 
                asChild
                size="lg" 
                variant="outline" 
                className="rounded-full px-8 border-primary text-primary hover:bg-primary hover:text-white"
              >
                <a href="#contact">Contact Me</a>
              </Button>
            </div>

            <div className="flex gap-6 mt-12">
              <a href="https://www.linkedin.com/in/veronicavignoni/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors duration-300">
                <Linkedin size={24} />
              </a>
              <a href="https://www.instagram.com/verovig2022/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors duration-300">
                <Instagram size={24} />
              </a>
            </div>
          </motion.div>

          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=900" 
              alt="Designer workspace with laptop and design tools" 
              className="rounded-xl shadow-lg w-full h-auto" 
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
