import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import resume from "@/assets/resume.pdf";

interface HeaderProps {
  toggleMobileMenu: () => void;
}

export default function Header({ toggleMobileMenu }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = location === "/" || location.startsWith("/#");
  
  return (
    <header className={`fixed w-full bg-white z-40 transition-all duration-300 ${
      isScrolled ? "shadow-sm bg-opacity-95 backdrop-blur-sm py-3" : "py-4"
    }`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="/" className="text-2xl font-bold text-primary">
          Vero<span className="text-foreground">.PM&Design</span>
        </a>

        <nav className="hidden lg:flex items-center space-x-8">
          {isHomePage ? (
            <>
              <a href="#home" className="hover:text-primary transition-colors duration-300">Home</a>
              <a href="#portfolio" className="hover:text-primary transition-colors duration-300">Portfolio</a>
              <a href="#skills" className="hover:text-primary transition-colors duration-300">Skills</a>
              <a href="#about" className="hover:text-primary transition-colors duration-300">About</a>
              <a href="#contact" className="hover:text-primary transition-colors duration-300">Contact</a>
            </>
          ) : (
            <a href="/" className="hover:text-primary transition-colors duration-300">Home</a>
          )}
          <a 
            href={resume} 
            download="Veronica_Vignoni_CV.pdf"
            className="bg-primary text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-colors duration-300"
          >
            Download CV
          </a>
        </nav>

        <Button 
          variant="ghost" 
          size="icon" 
          className="text-2xl lg:hidden" 
          onClick={toggleMobileMenu}
          aria-label="Menu"
        >
          <i className="fas fa-bars"></i>
        </Button>
      </div>
    </header>
  );
}
