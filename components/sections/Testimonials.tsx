'use client';

import CardSwap, { Card } from "@/components/ui/CardSwap";
import DecryptedText from "@/components/ui/DecryptedText";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function Testimonials() {
    return (
        <section className="py-24 bg-background overflow-hidden relative min-h-[800px] flex items-center justify-center">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Side: Text & Animation */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 z-20">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-4"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                Client Stories
                            </div>

                            <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight mb-4 text-foreground">
                                Trusted by <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                                    Industry Leaders
                                </span>
                            </h2>

                            <p className="text-muted-foreground text-lg max-w-xl">
                                Discover how I help companies transform their digital presence with
                                high-performance applications and stunning designs.
                            </p>
                        </motion.div>

                        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                            <div className="flex flex-col items-center lg:items-start p-4 rounded-2xl bg-secondary/30 backdrop-blur-sm border border-border/50">
                                <h3 className="text-3xl font-bold text-primary">100%</h3>
                                <p className="text-sm text-muted-foreground">Client Satisfaction</p>
                            </div>
                            <div className="flex flex-col items-center lg:items-start p-4 rounded-2xl bg-secondary/30 backdrop-blur-sm border border-border/50">
                                <h3 className="text-3xl font-bold text-primary">24/7</h3>
                                <p className="text-sm text-muted-foreground">Support & Maintenance</p>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-8"
                        >
                            <DecryptedText
                                text="READY_TO_COLLABORATE_//"
                                animateOn="view"
                                revealDirection="center"
                                speed={100}
                                maxIterations={20}
                                className="font-mono text-sm text-primary/70 tracking-widest"
                            />
                        </motion.div>
                    </div>

                    {/* Right Side: Card Swap */}
                    <div className="flex items-center justify-center w-full h-[600px] relative">
                        <CardSwap
                            cardDistance={60}
                            verticalDistance={70}
                            delay={4000}
                            pauseOnHover={true}
                            width={350}
                            height={400}
                            skewAmount={4}
                        >
                            {CARDS.map((card) => (
                                <Card key={card.id} className="p-8 flex flex-col justify-between shadow-2xl dark:bg-neutral-900 bg-white dark:border-white/10 border-neutral-200">
                                    <div>
                                        {card.content}
                                    </div>
                                    <div>
                                        <p className="text-neutral-900 font-bold dark:text-white text-lg">
                                            {card.name}
                                        </p>
                                        <p className="text-neutral-500 font-medium dark:text-neutral-400">
                                            {card.designation}
                                        </p>
                                    </div>
                                </Card>
                            ))}
                        </CardSwap>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Small utility to highlight the content of specific section of a testimonial content
export const Highlight = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <span
            className={cn(
                "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
                className
            )}
        >
            {children}
        </span>
    );
};

const CARDS = [
    {
        id: 0,
        name: "Sarah Chen",
        designation: "Product Manager @ TechFlow",
        content: (
            <>
                <p className="mb-4 text-neutral-700 dark:text-neutral-200">
                    The dashboard Fallonava built for us <Highlight>transformed our workflow</Highlight>.
                    The attention to detail and performance optimization is simply outstanding.
                </p>
            </>
        ),
    },
    {
        id: 1,
        name: "Michael Ross",
        designation: "Director @ HealthPlus",
        content: (
            <>
                <p className="mb-4 text-neutral-700 dark:text-neutral-200">
                    I was impressed by the <Highlight>modern aesthetic</Highlight> and intuitive UX.
                    Highly recommended for anyone looking for premium web development.
                </p>
            </>
        ),
    },
    {
        id: 2,
        name: "Elena Rodriguez",
        designation: "Founder @ ArtDisplay",
        content: (
            <>
                <p className="mb-4 text-neutral-700 dark:text-neutral-200">
                    The digital display solution is <Highlight>beautiful and reliable</Highlight>.
                    It runs 24/7 without a hitch and looks amazing on our 4K screens.
                </p>
            </>
        ),
    },
];
