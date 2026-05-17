'use client';

import CardSwap, { Card } from "@/components/ui/CardSwap";
import DecryptedText from "@/components/ui/DecryptedText";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { testimonials as staticCards } from "@/lib/data";
import { PortableText } from "next-sanity";

export function Testimonials({ data }: { data: any[] }) {
    const CARDS = data.length > 0 ? data : staticCards;
    return (
        <section className="py-32 bg-secondary border-b-[3px] border-border overflow-hidden relative min-h-[800px] flex items-center justify-center">
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
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary brutal-border text-foreground text-sm font-black uppercase mb-4 brutal-shadow-sm transform -rotate-1">
                                Client Stories
                            </div>

                            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black uppercase tracking-tighter mb-6">
                                <span className="block text-outline bg-card text-card-foreground brutal-border brutal-shadow inline-block px-4 sm:px-6 py-2 -rotate-2">
                                    Trusted By
                                </span>
                                <br />
                                <span className="block mt-4 text-foreground drop-shadow-[4px_4px_0_rgba(0,0,0,1)] dark:drop-shadow-[4px_4px_0_rgba(255,255,255,1)]">
                                    Industry Leaders
                                </span>
                            </h2>

                            <p className="text-card-foreground font-bold text-xl max-w-xl bg-card brutal-border p-4 brutal-shadow">
                                Discover how I help companies transform their digital presence with
                                raw power and uncompromising designs.
                            </p>
                        </motion.div>

                        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                            <div className="flex flex-col items-center lg:items-start p-6 bg-accent brutal-border brutal-shadow-sm transform rotate-1">
                                <h3 className="text-5xl font-black text-foreground mb-2">100%</h3>
                                <p className="text-sm font-bold text-foreground uppercase">Client Satisfaction</p>
                            </div>
                            <div className="flex flex-col items-center lg:items-start p-6 bg-tertiary brutal-border brutal-shadow-sm transform -rotate-1">
                                <h3 className="text-5xl font-black text-foreground mb-2">24/7</h3>
                                <p className="text-sm font-bold text-foreground uppercase">Support & Maint.</p>
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
                                className="font-mono text-xl font-black text-card-foreground tracking-widest bg-card border-[3px] border-border px-2 py-1 rounded-xl"
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
                            {CARDS.map((card, idx) => (
                                <Card key={card.id ?? idx} className="p-8 flex flex-col justify-between bg-card brutal-border brutal-shadow transition-transform hover:-translate-y-2">
                                    <div className="text-xl font-bold text-card-foreground border-l-[3px] border-border pl-4 mb-8">
                                        {/* Support Sanity (text/string), Sanity (block), and static (ReactNode) */}
                                        {typeof card.content === 'string' 
                                            ? <p className="mb-4 text-black">{card.content}</p>
                                            : Array.isArray(card.content)
                                                ? <PortableText value={card.content} />
                                                : card.content
                                        }
                                    </div>
                                    <div className="bg-primary p-4 brutal-border mt-auto">
                                        <p className="text-foreground font-black text-xl uppercase tracking-wider">
                                            {card.name}
                                        </p>
                                        <p className="text-foreground font-bold uppercase text-sm mt-1">
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

