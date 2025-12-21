'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';

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
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4 md:p-8">
                        <motion.div
                            layoutId={`project-${project.id}`}
                            className="bg-background border border-border w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative pointer-events-auto flex flex-col md:flex-row"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white z-10 transition-colors"
                            >
                                <X size={20} />
                            </button>

                            {/* Image Section */}
                            <div className="w-full md:w-1/2 relative h-64 md:h-auto">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent md:bg-gradient-to-r" />
                            </div>

                            {/* Content Section */}
                            <div className="w-full md:w-1/2 p-8 flex flex-col">
                                <h2 className="text-3xl font-bold mb-2">{project.title}</h2>
                                <p className="text-muted-foreground mb-6">{project.description}</p>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-semibold mb-2 text-primary">About</h3>
                                        <p className="text-muted-foreground leading-relaxed text-sm">
                                            {project.longDescription}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold mb-2 text-primary">Technologies</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map((t) => (
                                                <span key={t} className="px-2 py-1 text-xs font-medium rounded-md bg-secondary text-secondary-foreground">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-auto pt-8 flex gap-4">
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        className="flex-1 py-3 bg-primary text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
                                    >
                                        Live Demo
                                        <ExternalLink size={16} />
                                    </a>
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            className="px-4 py-3 border border-border rounded-xl font-medium flex items-center gap-2 hover:bg-secondary transition-colors"
                                        >
                                            <Github size={20} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
