'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

interface Project {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    image: string;
    tech: string[];
    link: string;
    github?: string;
    color: string;
}

interface ProjectModalProps {
    project: Project | null;
    onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
    // Lock scroll on open
    useEffect(() => {
        if (project) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [project]);

    if (!project) return null;

    return (
        <AnimatePresence>
            {project && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 z-50"
                    />

                    {/* Modal */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-4 md:inset-10 z-50 flex items-center justify-center pointer-events-none"
                    >
                        <div className="bg-background w-full max-w-5xl max-h-full overflow-y-auto pointer-events-auto border-[4px] border-border rounded-3xl shadow-[16px_16px_0px_0px_var(--color-border)] flex flex-col">
                            {/* Header */}
                            <div className="sticky top-0 z-10 flex justify-between items-center p-6 md:p-8 bg-background border-b-[4px] border-border">
                                <h2 className="text-3xl font-bold text-foreground">{project.title}</h2>
                                <button
                                    onClick={onClose}
                                    className="p-3 bg-card border-[3px] border-border brutal-shadow-sm brutal-hover rounded-xl text-card-foreground"
                                >
                                    <X size={32} strokeWidth={3} />
                                </button>
                            </div>

                            {/* Content Section */}
                            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
                                {/* Image Section */}
                                <div className="w-full md:w-1/2">
                                    <div className="relative w-full aspect-video border-[4px] border-border rounded-2xl overflow-hidden bg-black">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="object-cover"
                                        />
                                    </div>
                                </div>

                                <div className="w-full md:w-1/2 flex flex-col">
                                    <p className="text-foreground font-bold mb-6 text-lg">{project.description}</p>

                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="font-black text-lg mb-2 text-foreground uppercase">About</h3>
                                            <p className="text-foreground/80 leading-relaxed font-bold">
                                                {project.longDescription}
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="font-black text-lg mb-2 text-card-foreground uppercase">Technologies</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {project.tech.map((t) => (
                                                    <span key={t} className="px-3 py-1 text-xs font-black uppercase brutal-border bg-background text-foreground brutal-shadow-sm">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex gap-4">
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-primary text-foreground font-black uppercase text-xl brutal-border brutal-shadow-sm brutal-hover rounded-xl"
                                        >
                                            Live Demo
                                            <ExternalLink size={24} />
                                        </a>
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-4 py-3 bg-card brutal-border font-medium flex items-center gap-2 hover:bg-secondary transition-colors brutal-shadow-sm brutal-hover rounded-xl text-foreground"
                                            >
                                                <Github size={24} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
