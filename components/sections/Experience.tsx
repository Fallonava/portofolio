'use client';

import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

const experiences = [
    {
        year: "2024 - Present",
        title: "Full Stack Developer",
        company: "Freelance",
        description: "Building modern web applications using Next.js, React, and Tailwind CSS. Specializing in high-performance dashboards and interactive UIs.",
        tech: ["Next.js", "React", "TypeScript", "Tailwind"]
    },
    {
        year: "2023 - 2024",
        title: "Frontend Engineeer",
        company: "Tech Startups",
        description: "Collaborated with design teams to implement pixel-perfect user interfaces. Optimized core web vitals and improved site performance by 40%.",
        tech: ["React", "Redux", "Framer Motion"]
    },
    {
        year: "2022 - 2023",
        title: "Junior Web Developer",
        company: "Digital Agency",
        description: "Developed responsive websites for various clients. Maintained legacy codebases and integrated CMS solutions.",
        tech: ["HTML/CSS", "JavaScript", "WordPress"]
    }
];

export function Experience() {
    return (
        <section id="experience" className="py-24 bg-background relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 tracking-tight">
                        Professional <span className="text-primary">Journey</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        A timeline of my growth and contributions in the tech world.
                    </p>
                </motion.div>

                <div className="max-w-3xl mx-auto relative">
                    {/* Vertical Line */}
                    <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0" />

                    {experiences.map((exp, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className={`flex flex-col md:flex-row gap-8 mb-12 md:mb-16 relative ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                                }`}
                        >
                            {/* Dot */}
                            <div className="absolute left-[6px] md:left-1/2 top-0 w-5 h-5 rounded-full bg-background border-4 border-primary shadow-[0_0_10px_rgba(59,130,246,0.5)] z-10 -translate-x-0 md:-translate-x-1/2" />

                            {/* Content Spacer for Alternating Layout */}
                            <div className="hidden md:block w-1/2" />

                            {/* Content Card */}
                            <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                                <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 group">
                                    <div className="flex items-center gap-2 text-primary font-semibold mb-2 text-sm">
                                        <Calendar size={14} />
                                        <span>{exp.year}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                                        {exp.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                                        <Briefcase size={14} />
                                        <span>{exp.company}</span>
                                    </div>
                                    <p className="text-muted-foreground mb-4 leading-relaxed">
                                        {exp.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {exp.tech.map((t, i) => (
                                            <span key={i} className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium border border-primary/10">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
