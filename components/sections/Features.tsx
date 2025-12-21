'use client';

import { motion } from 'framer-motion';
import { TiltCard } from '@/components/ui/TiltCard';
import { Palette, Rocket, Lock, Globe, Smartphone, Zap } from 'lucide-react';

const features = [
    {
        title: "Modern Aesthetics",
        description: "Interfaces that blend art and functionality using the latest design trends.",
        icon: Palette,
        color: "text-purple-400"
    },
    {
        title: "High Performance",
        description: "Optimized for speed with Next.js App Router and server components.",
        icon: Rocket,
        color: "text-blue-400"
    },
    {
        title: "Secure by Design",
        description: "Implementing best practices for data protection and authentication.",
        icon: Lock,
        color: "text-green-400"
    },
    {
        title: "Global Scale",
        description: "Built to deploy on the edge, reaching users instantly anywhere.",
        icon: Globe,
        color: "text-cyan-400"
    },
    {
        title: "Mobile First",
        description: "Responsive designs that look clear and fluid on any device.",
        icon: Smartphone,
        color: "text-pink-400"
    },
    {
        title: "Instant Interactivity",
        description: "Smooth animations and transitions powered by Framer Motion.",
        icon: Zap,
        color: "text-amber-400"
    }
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 50 } }
};

export function Features() {
    return (
        <section id="features" className="py-24 relative bg-background">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 tracking-tight">
                        Designed for <span className="text-primary">Impact</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Every project is built with a focus on core principles that drive user engagement and business growth.
                    </p>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {features.map((feature, idx) => (
                        <motion.div key={idx} variants={item}>
                            <TiltCard className="h-full flex flex-col items-start gap-4 p-6 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <div className={`p-3 rounded-2xl bg-white/5 ${feature.color}`}>
                                    {(() => {
                                        const Icon = feature.icon;
                                        return <Icon size={32} />;
                                    })()}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
