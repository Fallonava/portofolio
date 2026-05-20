'use client';

import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';
import { InfiniteScroll } from '@/components/ui/InfiniteScroll';
import Image from 'next/image';
import { techStack } from '@/lib/data';
import type { SiteSettings } from '@/sanity/lib/siteSettings';

interface AboutProps {
  settings?: SiteSettings;
}

export function About({ settings }: AboutProps) {
  const heading = settings?.aboutHeading || 'ABOUT ME';
  const aboutText = settings?.aboutText || 
    "I AM A FULL STACK DEVELOPER WITH A PASSION FOR BUILDING DIGITAL EXPERIENCES THAT ARE NOT JUST FUNCTIONAL, BUT RAW AND UNAPOLOGETIC.\n\nMY PHILOSOPHY IS SIMPLE: Code is power. I bridge the gap between engineering and brutalist aesthetics to create software that feels alive.";
  
  const skills = settings?.aboutSkills && settings.aboutSkills.length > 0 
    ? settings.aboutSkills 
    : techStack.map(t => t.name);

  // Helper to match custom skill names with our local techStack icons if possible
  const getSkillItem = (skillName: string) => {
    const matched = techStack.find(t => t.name.toLowerCase() === skillName.toLowerCase());
    return {
      name: skillName,
      icon: matched?.icon || null
    };
  };

  const skillItems = skills.map(getSkillItem);

  return (
    <section id="about" className="py-32 bg-secondary relative overflow-hidden border-b-[3px] border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black mb-8 tracking-tighter uppercase text-center bg-card text-card-foreground brutal-border brutal-shadow inline-block px-4 sm:px-8 py-4 -rotate-2 text-outline">
              {heading}
            </h2>
            <div className="text-foreground font-bold max-w-3xl mx-auto text-xl md:text-2xl uppercase border-[3px] border-border p-6 brutal-shadow bg-primary rounded-2xl space-y-4 whitespace-pre-line">
              {aboutText}
            </div>

            <div className="mt-12 flex gap-8">
              <div className="bg-secondary border-[3px] border-border p-4 text-center brutal-shadow-sm flex-1 rounded-2xl">
                <span className="block text-5xl font-black text-foreground">5+</span>
                <span className="text-lg font-bold text-foreground uppercase">Years Exp</span>
              </div>
              <div className="bg-accent border-[3px] border-border p-4 text-center brutal-shadow-sm flex-1 rounded-2xl">
                <span className="block text-5xl font-black text-foreground">50+</span>
                <span className="text-lg font-bold text-foreground uppercase">Projects</span>
              </div>
            </div>
          </motion.div>

          {/* Tech Stack / Infinite Scroll */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="p-8 bg-card brutal-border brutal-shadow transform rotate-1 rounded-2xl">
              <h3 className="text-3xl font-black mb-6 flex items-center gap-3 text-card-foreground uppercase border-b-[3px] border-border pb-4">
                <span className="p-2 bg-tertiary border-[3px] border-border text-foreground">
                  <Code2 size={28} strokeWidth={3} />
                </span>
                Tech Stack & Skills
              </h3>
              <InfiniteScroll
                items={skillItems.map(item => (
                  <div key={item.name} className="flex flex-col items-center justify-center gap-2">
                    {item.icon ? (
                      <div className="relative w-12 h-12 md:w-16 md:h-16">
                        <Image
                          src={item.icon}
                          alt={item.name}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 48px, 64px"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-accent border-[3px] border-border rounded-xl">
                        <span className="text-2xl font-black">{item.name.charAt(0)}</span>
                      </div>
                    )}
                    <span className="text-xs font-black text-foreground uppercase bg-accent border-[2px] border-border px-2 py-1 rounded-lg">
                      {item.name}
                    </span>
                  </div>
                ))}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
