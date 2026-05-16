'use client';

import { motion } from 'framer-motion';
import { TiltCard } from '@/components/ui/TiltCard';
import { Palette, Rocket, Lock, Globe, Smartphone, Zap } from 'lucide-react';

import { features } from '@/lib/data';

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
        <section id="features" className="py-32 relative bg-background border-b-[3px] border-border">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black mb-8 tracking-tighter uppercase text-center bg-card text-card-foreground brutal-border brutal-shadow inline-block px-4 sm:px-8 py-4 rotate-1 text-outline">
                        DESIGNED FOR IMPACT
                    </h2>
                    <p className="text-foreground font-bold max-w-2xl mx-auto text-xl uppercase brutal-border p-4 brutal-shadow bg-secondary">
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
                            <TiltCard className="h-full !p-0 rounded-2xl">
                                <div className="h-full flex flex-col items-start gap-6 p-8 bg-card brutal-border brutal-shadow">
                                    <div className={`p-4 brutal-border brutal-shadow-sm text-foreground ${feature.color}`}>
                                        {(() => {
                                            const Icon = feature.icon;
                                            return <Icon size={40} strokeWidth={3} />;
                                        })()}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black mb-4 text-card-foreground uppercase">{feature.title}</h3>
                                        <p className="text-card-foreground font-bold leading-relaxed border-l-[3px] border-border pl-4">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
