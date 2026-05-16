'use client';

import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ArrowUpRight, Folder, FolderOpen } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ProjectModal } from "../ui/ProjectModal";

import { PROJECT_CATEGORIES as CATEGORIES } from '@/lib/data';
import { urlForImage } from "@/sanity/lib/image";

export function Projects({ data }: { data: any[] }) {
    const [selectedProject, setSelectedProject] = useState<any | null>(null);
    const [activeCategory, setActiveCategory] = useState("All");
    const [showArchive, setShowArchive] = useState(false);

    const filteredProjects = data.filter(
        (project) => activeCategory === "All" || project.category === activeCategory
    );

    // Grid shows max 6 featured projects for a highly aesthetic interlocking bento layout
    const featuredProjects = filteredProjects.slice(0, 6);
    // Archive shows the rest
    const archiveProjects = filteredProjects.slice(6);

    return (
        <section id="projects" className="py-32 bg-background relative z-10 border-b-[3px] border-border">
            <div className="container mx-auto px-6">
                
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black mb-8 tracking-tighter uppercase text-center bg-card text-card-foreground brutal-border brutal-shadow inline-block px-4 sm:px-8 py-4 -rotate-2 text-outline">
                        FEATURED WORK
                    </h2>
                    <p className="text-card-foreground font-bold max-w-2xl mx-auto text-xl uppercase brutal-border p-4 brutal-shadow-sm bg-card mb-8">
                        Selected projects demonstrating passion for raw quality.
                    </p>

                    {/* Category Filters */}
                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 font-black uppercase text-sm md:text-base border-[3px] border-border brutal-shadow-sm brutal-hover transition-colors rounded-xl ${
                                    activeCategory === cat 
                                        ? "bg-primary text-primary-foreground translate-y-[2px] translate-x-[2px] shadow-none" 
                                        : "bg-card text-card-foreground hover:bg-tertiary"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Featured Asymmetric Grid */}
                <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
                    <AnimatePresence mode="popLayout">
                        {featuredProjects.map((project, idx) => {
                            // Responsive Interlocking Bento Pattern (Mobile, Tablet, Desktop)
                            let colSpan = 'col-span-2 sm:col-span-3 md:col-span-4';
                            let aspectRatio = 'aspect-video md:aspect-[21/9]';
                            
                            if (featuredProjects.length === 1) {
                                colSpan = 'col-span-2 sm:col-span-3 md:col-span-4';
                                aspectRatio = 'aspect-video md:aspect-[21/9]';
                            } else {
                                if (idx === 0) {
                                    colSpan = 'col-span-2 sm:col-span-3 md:col-span-4'; // Superstar
                                    aspectRatio = 'aspect-video md:aspect-[21/9]';
                                } else if (idx === 1) {
                                    colSpan = 'col-span-2 sm:col-span-2 md:col-span-2 md:row-span-2'; // Large
                                    aspectRatio = 'aspect-video md:aspect-square md:h-full';
                                } else if (idx === 2) {
                                    colSpan = 'col-span-2 sm:col-span-1 md:col-span-2'; // Horizontal
                                    aspectRatio = 'aspect-video sm:aspect-square md:aspect-video';
                                } else if (idx === 3) {
                                    colSpan = 'col-span-1 sm:col-span-1 md:col-span-1'; // Small/Twin
                                    aspectRatio = 'aspect-square';
                                } else if (idx === 4) {
                                    colSpan = 'col-span-1 sm:col-span-2 md:col-span-1'; // Small/Twin
                                    aspectRatio = 'aspect-square sm:aspect-video md:aspect-square';
                                } else if (idx === 5) {
                                    colSpan = 'col-span-2 sm:col-span-3 md:col-span-4'; // Footer
                                    aspectRatio = 'aspect-video md:aspect-[21/9]';
                                }
                            }

                            return (
                                <motion.div 
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    key={project.id} 
                                    onClick={() => setSelectedProject(project)} 
                                    className={`cursor-pointer block group h-full ${colSpan}`}
                                >
                                    <SpotlightCard className="h-full flex flex-col !p-6" hoverColor={project.color === 'blue' ? "bg-cyan-400" : "bg-pink-400"}>
                                        <div className={`relative w-full overflow-hidden mb-6 brutal-border bg-black transition-colors brutal-shadow-sm ${aspectRatio}`}>
                                            <Image
                                                src={typeof project.image === 'string' ? project.image : urlForImage(project.image).url()}
                                                alt={project.title}
                                                fill
                                                priority={idx === 0}
                                                sizes="(max-width: 768px) 100vw, 80vw"
                                                className="object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className={`px-4 py-2 border-[3px] border-border brutal-shadow-sm rounded-xl font-black uppercase text-xs ${project.color === 'blue' ? 'bg-cyan-200 text-black' : 'bg-pink-200 text-black'}`}>
                                                    {project.category}
                                                </div>
                                                <ArrowUpRight className={`text-foreground brutal-border bg-background p-1 brutal-shadow-sm transition-transform group-hover:translate-x-1 group-hover:-translate-y-1`} size={32} />
                                            </div>
                                            <h3 className={`text-xl sm:text-2xl md:text-4xl font-black mb-2 text-card-foreground uppercase leading-none md:leading-tight`}>
                                                {project.title}
                                            </h3>
                                            <p className="text-card-foreground font-bold leading-relaxed mb-6 flex-1 bg-background/50 p-2 sm:p-3 brutal-border text-xs sm:text-base">
                                                {project.description}
                                            </p>
                                            <div className="flex flex-wrap gap-1 sm:gap-2 mt-auto">
                                                {project.tech.map((t: string) => (
                                                    <span key={t} className={`px-2 py-1 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-black uppercase brutal-border brutal-shadow-sm bg-background text-foreground`}>
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </SpotlightCard>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {/* Show Archive Button */}
                {archiveProjects.length > 0 && (
                    <motion.div layout className="mt-16 flex justify-center">
                        <button
                            onClick={() => setShowArchive(!showArchive)}
                            className="flex items-center gap-3 px-8 py-4 bg-tertiary text-foreground font-black uppercase text-xl border-[3px] border-border brutal-shadow brutal-hover rounded-2xl transition-all"
                        >
                            {showArchive ? <FolderOpen size={28} strokeWidth={3} /> : <Folder size={28} strokeWidth={3} />}
                            {showArchive ? "Hide Archive" : "View Full Archive"}
                        </button>
                    </motion.div>
                )}

                {/* List View Archive */}
                <AnimatePresence>
                    {showArchive && archiveProjects.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-16 max-w-5xl mx-auto overflow-hidden"
                        >
                            <h3 className="text-3xl font-black mb-8 text-foreground uppercase border-b-[3px] border-border pb-4">
                                Project Archive
                            </h3>
                            <div className="flex flex-col gap-4">
                                {archiveProjects.map((project) => (
                                    <div 
                                        key={project.id}
                                        onClick={() => setSelectedProject(project)}
                                        className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-card brutal-border brutal-shadow-sm brutal-hover cursor-pointer group transition-colors"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                                            <h4 className="text-2xl font-black text-card-foreground uppercase group-hover:text-primary transition-colors">
                                                {project.title}
                                            </h4>
                                            <div className="hidden md:flex flex-wrap gap-2">
                                                {project.tech.slice(0, 2).map((t: string) => (
                                                    <span key={t} className="px-2 py-1 text-[10px] font-black uppercase border-[2px] border-border bg-background text-foreground">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 mt-4 md:mt-0 justify-between md:justify-end w-full md:w-auto">
                                            <span className="font-bold text-sm text-card-foreground uppercase bg-accent px-3 py-1 border-[2px] border-border">
                                                {project.category}
                                            </span>
                                            <ArrowUpRight className="text-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" size={24} strokeWidth={3} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
            </div>
        </section>
    );
}
