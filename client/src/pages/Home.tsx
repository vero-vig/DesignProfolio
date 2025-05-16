import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PortfolioSection from "@/components/PortfolioSection";
import SkillsSection from "@/components/SkillsSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import MobileMenu from "@/components/MobileMenu";
import { useState } from "react";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A') {
        const href = target.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const id = href.slice(1);
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth'
            });
            
            // Update URL without page reload
            window.history.pushState({}, '', href);
            
            // Close mobile menu if open
            setIsMobileMenuOpen(false);
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Veronica Vignoni | Product Manager & UX/UI Designer | New York</title>
        <meta name="description" content="Professional portfolio of Veronica Vignoni, a Product Manager & UX/UI Designer with over 4 years of PM experience and 15+ years of design expertise based in New York." />
        <meta name="keywords" content="Product Manager, UX/UI Designer, Portfolio, New York, Veronica Vignoni, Product Management, User Experience, User Interface, Digital Products" />
        <link rel="canonical" href="https://vero.pmdesign.com" />
        {/* Page-specific structured data for better indexing */}
        <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "mainEntity": {
              "@type": "Person",
              "name": "Veronica Vignoni",
              "description": "Product Manager with over 4 years of experience and UX/UI Designer with more than 15 years of design expertise",
              "jobTitle": "Product Manager & UX/UI Designer",
              "knowsAbout": ["Product Management", "UX/UI Design", "User Research", "Design Thinking", "Agile Methodologies"]
            },
            "speakable": {
              "@type": "SpeakableSpecification",
              "cssSelector": ["#hero h1", "#about p"]
            }
          }
        `}
        </script>
      </Helmet>
      <Header toggleMobileMenu={toggleMobileMenu} />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <main>
        <HeroSection />
        <PortfolioSection />
        <SkillsSection />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
