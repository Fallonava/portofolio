'use client';

import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { ProjectModal } from "../ui/ProjectModal";

const projects = [
    {
        id: "fallonava-app",
        title: "Fallonava App",
        description: "A comprehensive hospital management dashboard designed for efficiency and clarity.",
        longDescription: "Fallonava App is a state-of-the-art hospital management system designed to streamline operations and enhance patient care. It features a robust dashboard for real-time monitoring of hospital resources, patient flows, and staff schedules. Built with a focus on data visualization, it empowers administrators to make informed decisions quickly.",
        image: "/images/fallonava-app.png",
        link: "https://app.fallonava.my.id",
        tech: ["Next.js", "Neo-Brutalism", "Dashboard", "Tailwind CSS", "Recharts"],
        color: "blue"
    },
    {
        id: "fallonava-display",
        title: "Digital Display",
        description: "A modern digital display interface for public information and queue management.",
        longDescription: "The Digital Display system transforms traditional hospital signage into dynamic, interactive screens. It provides real-time updates on doctor availability, queue status, and public announcements. Designed for high visibility and reliability, it ensures patients remain informed and reduces anxiety in waiting areas.",
        image: "/images/fallonava-display.png",
        link: "https://display.fallonava.my.id",
        tech: ["React", "Real-time", "Animations", "Socket.io", "Framer Motion"],
        color: "pink"
    }
];

export function Projects() {
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

    return (
        <section id="projects" className="py-24 bg-background relative z-10">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 tracking-tight">
                        Featured <span className="text-primary">Work</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Selected projects that demonstrate my passion for quality and performance.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {projects.map((project) => (
                        <div key={project.id} onClick={() => setSelectedProject(project)} className="cursor-pointer block group h-full">
                            <SpotlightCard className="h-full flex flex-col" spotlightColor={project.color === 'blue' ? "rgba(26, 115, 232, 0.2)" : "rgba(236, 72, 153, 0.2)"}>
                                <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-6 border border-white/10 group-hover:border-primary/30 transition-colors">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`p-3 rounded-lg ${project.color === 'blue' ? 'bg-blue-500/10 text-blue-400' : 'bg-pink-500/10 text-pink-400'}`}>
                                            {project.color === 'blue' ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-dashboard"><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-monitor-play"><path d="m10 7 5 3-5 3Z" /><rect width="20" height="14" x="2" y="3" rx="2" /><path d="M12 17v4" /><path d="M8 21h8" /></svg>
                                            )}
                                        </div>
                                        <ArrowUpRight className={`text-gray-500 transition-colors ${project.color === 'blue' ? 'group-hover:text-blue-400' : 'group-hover:text-pink-400'}`} />
                                    </div>
                                    <h3 className={`text-2xl font-bold mb-2 text-white transition-colors ${project.color === 'blue' ? 'group-hover:text-blue-400' : 'group-hover:text-pink-400'}`}>
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed mb-4 flex-1">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {project.tech.slice(0, 3).map((t) => (
                                            <span key={t} className={`px-3 py-1 text-xs font-medium rounded-full border ${project.color === 'blue' ? 'bg-blue-500/10 text-blue-300 border-blue-500/20' : 'bg-pink-500/10 text-pink-300 border-pink-500/20'}`}>
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </SpotlightCard>
                        </div>
                    ))}
                </div>

                <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
            </div>
        </section>
    );
}
