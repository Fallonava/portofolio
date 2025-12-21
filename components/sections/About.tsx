'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { InfiniteScroll } from '../ui/InfiniteScroll';
import { NextJsIcon, ReactIcon, TypeScriptIcon, TailwindIcon, NodeJsIcon, FramerIcon, FigmaIcon, GitIcon } from '@/components/ui/Icons';

export function About() {
    return (
        <section id="about" className="py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

                    {/* Left Column: Heading */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-heading font-bold leading-tight tracking-tight">
                            Crafting <span className="text-primary">digital reality</span> through code & design.
                        </h2>
                    </motion.div>

                    {/* Right Column: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col gap-8"
                    >
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            I am a full-stack developer obsessed with performance and micro-interactions.
                            My philosophy is simple: technology should feel like magic—invisible, effortless, and powerful.
                        </p>

                        <p className="text-lg text-foreground leading-relaxed">
                            With a background in computer science and a passion for visual arts,
                            I bridge the gap between engineering and aesthetics.
                            Currently building next-gen web applications with <strong>Next.js</strong>, <strong>React</strong>, and <strong>TypeScript</strong>.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 mt-4">
                            <div className="flex flex-col gap-2">
                                <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Experience</h4>
                                <span className="text-2xl font-heading font-semibold">5+ Years</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Projects</h4>
                                <span className="text-2xl font-heading font-semibold">50+ Delivered</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Location</h4>
                                <span className="text-2xl font-heading font-semibold">Jakarta, ID</span>
                            </div>
                        </div>

                        <div className="pt-8">
                            <Link
                                href="mailto:hello@antigravity.dev"
                                className="inline-flex items-center text-lg font-medium text-primary hover:text-blue-700 transition-colors group"
                            >
                                Let&apos;s work together
                                <ArrowUpRight className="ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </Link>
                        </div>
                    </motion.div>
                </div>

                <div className="mt-24">
                    <h3 className="text-center text-2xl font-bold mb-8 text-muted-foreground">Technologi Stack</h3>
                    <InfiniteScroll
                        items={[
                            <div key="next" className="flex items-center gap-2 text-foreground font-bold text-xl"><NextJsIcon className="w-8 h-8" /> Next.js</div>,
                            <div key="react" className="flex items-center gap-2 text-foreground font-bold text-xl"><ReactIcon className="w-8 h-8 text-[#61DAFB]" /> React</div>,
                            <div key="ts" className="flex items-center gap-2 text-foreground font-bold text-xl"><TypeScriptIcon className="w-8 h-8 text-[#3178C6]" /> TypeScript</div>,
                            <div key="tw" className="flex items-center gap-2 text-foreground font-bold text-xl"><TailwindIcon className="w-8 h-8 text-[#06B6D4]" /> Tailwind</div>,
                            <div key="node" className="flex items-center gap-2 text-foreground font-bold text-xl"><NodeJsIcon className="w-8 h-8 text-[#339933]" /> Node.js</div>,
                            <div key="framer" className="flex items-center gap-2 text-foreground font-bold text-xl"><FramerIcon className="w-8 h-8" /> Framer</div>,
                            <div key="figma" className="flex items-center gap-2 text-foreground font-bold text-xl"><FigmaIcon className="w-8 h-8" /> Figma</div>,
                            <div key="git" className="flex items-center gap-2 text-foreground font-bold text-xl"><GitIcon className="w-8 h-8 text-[#F05032]" /> Git</div>,
                        ]}
                        direction="left"
                        speed="normal"
                        className="w-full"
                    />
                </div>
            </div>
        </section>
    );
}
