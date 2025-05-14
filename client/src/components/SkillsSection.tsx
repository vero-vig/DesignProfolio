import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { designSkills, productSkills, designTools, productTools } from "@/data/skills";

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="skills" className="py-16" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">My Skills & Expertise</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A comprehensive overview of my professional skills and expertise in design and product management.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* UX/UI Design Skills */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <i className="fas fa-bezier-curve text-primary mr-3"></i> UX/UI Design
            </h3>
            
            <div className="space-y-6">
              {designSkills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <span>{skill.percentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.percentage}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 grid grid-cols-3 gap-4">
              {designTools.map((tool, index) => (
                <div key={index} className="bg-secondary p-3 rounded-lg text-center">
                  <div className="text-2xl mb-2 text-primary"><i className={tool.icon}></i></div>
                  <p className="text-sm">{tool.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Product Management Skills */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <i className="fas fa-tasks-alt text-primary mr-3"></i> Product Management
            </h3>
            
            <div className="space-y-6">
              {productSkills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <span>{skill.percentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.percentage}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 grid grid-cols-3 gap-4">
              {productTools.map((tool, index) => (
                <div key={index} className="bg-secondary p-3 rounded-lg text-center">
                  <div className="text-2xl mb-2 text-primary"><i className={tool.icon}></i></div>
                  <p className="text-sm">{tool.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
