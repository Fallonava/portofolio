'use client';

import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

import { experiences } from '@/lib/data';

export function Experience() {
    return (
        <section id="experience" className="py-32 bg-primary relative overflow-hidden border-y-[3px] border-border">
            <div className="absolute inset-0 bg-dot opacity-20 pointer-events-none mix-blend-multiply dark:mix-blend-overlay"></div>
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-center mb-24"
                >
                    <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black uppercase tracking-tighter text-center bg-card text-card-foreground brutal-border brutal-shadow inline-block px-4 sm:px-8 py-4 rotate-2 text-outline">
                        PROFESSIONAL JOURNEY
                    </h2>
                </motion.div>

                <div className="max-w-4xl mx-auto relative">
                    {/* Vertical Line */}
                    <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-2 bg-foreground -translate-x-1/2 rounded-full" />

                    {experiences.map((exp, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className={`flex flex-col md:flex-row gap-8 mb-16 relative ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                                }`}
                        >
                            {/* Square Indicator */}
                            <div className="absolute left-[15px] md:left-1/2 top-4 w-6 h-6 bg-tertiary brutal-border z-10 -translate-x-1/2 brutal-shadow-sm" />

                            {/* Content Spacer for Alternating Layout */}
                            <div className="hidden md:block w-1/2" />

                            <div className="w-full md:w-1/2 pl-12 md:px-12">
                                <div className="p-8 bg-card brutal-border brutal-shadow group brutal-hover">
                                    <div className="flex items-center gap-2 text-card-foreground bg-accent border-[3px] border-border px-3 py-1 font-black mb-4 text-sm w-fit brutal-shadow-sm uppercase rounded-xl">
                                        <Calendar size={16} />
                                        <span>{exp.year}</span>
                                    </div>
                                    <h3 className="text-3xl font-black text-card-foreground mb-2 uppercase">
                                        {exp.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-card-foreground font-bold text-lg mb-6 uppercase border-b-[3px] border-border pb-4">
                                        <Briefcase size={18} />
                                        <span>{exp.company}</span>
                                    </div>
                                    <p className="text-card-foreground font-bold mb-6 leading-relaxed">
                                        {exp.description}
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        {exp.tech.map((t, i) => (
                                            <span key={i} className="px-3 py-1 bg-background text-foreground font-black uppercase text-xs border-[3px] border-border rounded-xl brutal-shadow-sm">
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
