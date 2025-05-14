import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useLocation } from "wouter";
import resume from "@/assets/resume.pdf";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [location] = useLocation();
  const isHomePage = location === "/" || location.startsWith("/#");

  return (
    <div className={`fixed top-0 right-0 w-full h-screen bg-white z-50 transform transition-transform duration-300 lg:hidden ${
      isOpen ? "translate-x-0" : "translate-x-full"
    }`}>
      <div className="flex justify-end p-6">
        <Button variant="ghost" size="icon" className="text-2xl" onClick={onClose} aria-label="Close menu">
          <X />
        </Button>
      </div>
      <div className="flex flex-col items-center gap-8 text-xl mt-16">
        {isHomePage ? (
          <>
            <a href="#home" className="hover:text-primary transition-colors duration-300" onClick={onClose}>Home</a>
            <a href="#portfolio" className="hover:text-primary transition-colors duration-300" onClick={onClose}>Portfolio</a>
            <a href="#skills" className="hover:text-primary transition-colors duration-300" onClick={onClose}>Skills</a>
            <a href="#about" className="hover:text-primary transition-colors duration-300" onClick={onClose}>About</a>
            <a href="#contact" className="hover:text-primary transition-colors duration-300" onClick={onClose}>Contact</a>
          </>
        ) : (
          <a href="/" className="hover:text-primary transition-colors duration-300" onClick={onClose}>Home</a>
        )}
        <a 
          href={resume} 
          download="Vero_CV.pdf"
          className="bg-primary text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-colors duration-300"
        >
          Download CV
        </a>
      </div>
    </div>
  );
}
