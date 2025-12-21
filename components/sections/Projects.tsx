'use client';

import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export function Projects() {
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
                    {/* Project 1 */}
                    <Link href="https://app.fallonava.my.id" target="_blank" className="block group h-full">
                        <SpotlightCard className="h-full flex flex-col" spotlightColor="rgba(26, 115, 232, 0.2)">
                            <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-6 border border-white/10 group-hover:border-blue-500/30 transition-colors">
                                <Image
                                    src="/images/fallonava-app.png"
                                    alt="Fallonava App Dashboard"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-dashboard"><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg>
                                    </div>
                                    <ArrowUpRight className="text-gray-500 group-hover:text-blue-400 transition-colors" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">Fallonava App</h3>
                                <p className="text-gray-400 leading-relaxed mb-4 flex-1">
                                    A comprehensive hospital management dashboard designed for efficiency and clarity. Features real-time data visualization and deep analytics.
                                </p>
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">Next.js</span>
                                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">Neo-Brutalism</span>
                                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">Dashboard</span>
                                </div>
                            </div>
                        </SpotlightCard>
                    </Link>

                    {/* Project 2 */}
                    <Link href="https://display.fallonava.my.id" target="_blank" className="block group h-full">
                        <SpotlightCard className="h-full flex flex-col" spotlightColor="rgba(236, 72, 153, 0.2)">
                            <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-6 border border-white/10 group-hover:border-pink-500/30 transition-colors">
                                <Image
                                    src="/images/fallonava-display.png"
                                    alt="Fallonava Digital Display"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-pink-500/10 rounded-lg text-pink-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-monitor-play"><path d="m10 7 5 3-5 3Z" /><rect width="20" height="14" x="2" y="3" rx="2" /><path d="M12 17v4" /><path d="M8 21h8" /></svg>
                                    </div>
                                    <ArrowUpRight className="text-gray-500 group-hover:text-pink-400 transition-colors" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-pink-400 transition-colors">Digital Display</h3>
                                <p className="text-gray-400 leading-relaxed mb-4 flex-1">
                                    A modern digital display interface for public information and queue management. Built for high visibility and smooth transitions.
                                </p>
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-pink-500/10 text-pink-300 border border-pink-500/20">React</span>
                                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-pink-500/10 text-pink-300 border border-pink-500/20">Real-time</span>
                                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-pink-500/10 text-pink-300 border border-pink-500/20">Animations</span>
                                </div>
                            </div>
                        </SpotlightCard>
                    </Link>
                </div>
            </div>
        </section>
    );
}
