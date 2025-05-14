import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import resume from "@/assets/resume.pdf";

export default function AboutSection() {
  return (
    <section id="about" className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1593642532973-d31b6557fa68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000" 
              alt="Minimal designer workspace with laptop and design tools" 
              className="rounded-xl shadow-lg w-full h-auto" 
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">About Me</h2>
            
            <p className="text-gray-600 mb-4">
              Hello! I'm Veronica Vignoni, a passionate Product Manager and UX/UI Designer with over 4 years of experience as a Product Manager and more than 15 years as a designer creating user-centered digital products that drive business success.
            </p>
            
            <p className="text-gray-600 mb-4">
              I specialize in building intuitive, accessible, and visually compelling experiences while leading cross-functional teams through the full product lifecycle. My approach blends strategic thinking, creative problem-solving, and data-driven insights to deliver solutions that meet user needs and align with business goals.
            </p>
            
            <p className="text-gray-600 mb-6">
              With a background in design and front-end development, I ensure clear communication between technical and non-technical stakeholders, accurate estimations, and a seamless product delivery process. I've led teams of up to 10 people, introduced scalable CMS solutions, and successfully managed complex migrations—all while improving workflows and team efficiency.
            </p>

            <p className="text-gray-600 mb-6">
              I'm bilingual (English/Spanish), thrive in dynamic environments, and love bringing clarity, structure, and empathy to every project I lead.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div>
                <h3 className="font-semibold mb-2">Expertise</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="text-primary mt-1 mr-2 h-4 w-4" />
                    <span>Product Manager at CAIS (via GlobalLogic)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-primary mt-1 mr-2 h-4 w-4" />
                    <span>Project Manager at GlobalLogic</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-primary mt-1 mr-2 h-4 w-4" />
                    <span>UX Lead at Hexacta</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Education</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="text-primary mt-1 mr-2 h-4 w-4" />
                    <span>Google Cloud Digital Leader Certification</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-primary mt-1 mr-2 h-4 w-4" />
                    <span>Bachelor's in Graphic Design Communication</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-primary mt-1 mr-2 h-4 w-4" />
                    <span>Bilingual: English / Spanish</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <Button 
              asChild
              className="rounded-full"
            >
              <a href={resume} download="Vero_CV.pdf">Download CV</a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
