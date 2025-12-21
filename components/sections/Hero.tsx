'use client';

import { GalaxyBackground } from './GalaxyBackground';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function Hero() {
    const [hovered, setHovered] = useState(false);

    return (
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background/90 to-background">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0 opacity-40">
                <GalaxyBackground />
            </div>

            {/* Content Layer */}
            <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase border border-primary/20 backdrop-blur-sm"
                >
                    <span>Available for Hire</span>
                </motion.div>

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold text-foreground tracking-tight leading-[1.1] mb-8"
                >
                    Building the <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                        Future of Web
                    </span>
                </motion.h1>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                    className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed"
                >
                    A full-stack developer portfolio inspired by the principles of light, gravity, and seamless interaction.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 items-center"
                >
                    <Link
                        href="#projects"
                        className={cn(
                            "px-8 py-3.5 rounded-full font-medium text-white shadow-lg transition-all duration-300 flex items-center gap-2",
                            "bg-primary hover:bg-blue-700 hover:shadow-primary/25 hover:-translate-y-1"
                        )}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    >
                        View Projects
                        <ArrowRight size={18} className={cn("transition-transform", hovered ? "translate-x-1" : "")} />
                    </Link>

                    <Link
                        href="/resume.pdf"
                        target="_blank"
                        className={cn(
                            "px-8 py-3.5 rounded-full font-medium text-foreground border border-border bg-background hover:bg-muted/50 transition-all duration-300 flex items-center gap-2",
                            "hover:border-primary/50 hover:-translate-y-1"
                        )}
                    >
                        <Download size={18} />
                        Download CV
                    </Link>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-primary/0 via-primary to-primary/0 animate-pulse" />
            </motion.div>
        </section>
    );
}
