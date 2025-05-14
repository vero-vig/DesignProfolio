import { Linkedin, Instagram, Twitter, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#" className="text-2xl font-bold text-primary">
              Vero<span className="text-foreground">.PM&Design</span>
            </a>
            <p className="text-gray-600 mt-2">UX/UI Designer & Product Manager</p>
          </div>

          <div className="flex flex-wrap gap-6">
            <a href="#home" className="text-gray-600 hover:text-primary transition-colors duration-300">Home</a>
            <a href="#portfolio" className="text-gray-600 hover:text-primary transition-colors duration-300">Portfolio</a>
            <a href="#skills" className="text-gray-600 hover:text-primary transition-colors duration-300">Skills</a>
            <a href="#about" className="text-gray-600 hover:text-primary transition-colors duration-300">About</a>
            <a href="#contact" className="text-gray-600 hover:text-primary transition-colors duration-300">Contact</a>
          </div>
        </div>

        <hr className="my-8 border-gray-200" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">© {new Date().getFullYear()} Veronica Vignoni. All rights reserved.</p>
          
          <div className="flex gap-4">
            <a href="#" className="text-gray-500 hover:text-primary transition-colors duration-300">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-primary transition-colors duration-300">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-primary transition-colors duration-300">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-primary transition-colors duration-300">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
