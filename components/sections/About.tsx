'use client';

import { motion } from 'framer-motion';
import { InfiniteScroll } from '@/components/ui/InfiniteScroll';
import Image from 'next/image';

const techStack = [
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "GraphQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
    { name: "Prisma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
    { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "Vercel", icon: "https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png" },
];

export function About() {
    return (
        <section id="about" className="py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 tracking-tight">
                            Beyond the <span className="text-primary">Pixel</span>
                        </h2>
                        <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                            <p>
                                I am a Full Stack Developer with a passion for building digital experiences that are not just functional, but emotional.
                            </p>
                            <p>
                                My philosophy is simple: <strong className="text-foreground">Technology should be indistinguishable from magic.</strong> I bridge the gap between engineering and aesthetics to create software that feels alive.
                            </p>
                            <p>
                                Whether it's a complex dashboard or a stunning landing page, I bring a detail-oriented approach to every line of code.
                            </p>
                        </div>

                        <div className="mt-8 flex gap-8">
                            <div>
                                <span className="block text-3xl font-bold text-foreground">5+</span>
                                <span className="text-sm text-muted-foreground">Years Experience</span>
                            </div>
                            <div>
                                <span className="block text-3xl font-bold text-foreground">50+</span>
                                <span className="text-sm text-muted-foreground">Projects Delivered</span>
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
                        <div className="bg-secondary/20 border border-border/50 rounded-3xl p-8 backdrop-blur-sm">
                            <h3 className="text-xl font-bold mb-6 text-center">Powering My Workflow</h3>
                            <InfiniteScroll
                                items={techStack.map(tech => (
                                    <div key={tech.name} className="flex flex-col items-center justify-center gap-2">
                                        <div className="relative w-12 h-12 md:w-16 md:h-16">
                                            <Image
                                                src={tech.icon}
                                                alt={tech.name}
                                                fill
                                                className="object-contain"
                                                sizes="(max-width: 768px) 48px, 64px"
                                            />
                                        </div>
                                        <span className="text-sm font-medium text-muted-foreground">{tech.name}</span>
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
