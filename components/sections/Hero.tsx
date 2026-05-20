'use client';

import { RotatingText } from '@/components/ui/RotatingText';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import Link from 'next/link';
import { Magnetic } from '@/components/ui/Magnetic';
import { useState } from 'react';
import type { SiteSettings } from '@/sanity/lib/siteSettings';

interface HeroProps { settings?: SiteSettings }

export function Hero({ settings }: HeroProps) {
    const [hovered, setHovered] = useState(false);

    const name      = settings?.heroName     || 'Faishal Fx';
    const tagline   = settings?.heroTagline  || 'Full-Stack Developer';
    const bio       = settings?.heroBio      || 'Building digital experiences with raw power, stark contrast, and unapologetic design.';
    const ctaLabel  = settings?.heroCtaLabel || "Let's Talk";
    const ctaUrl    = settings?.heroCtaUrl   || '#contact';
    const resumeUrl = settings?.resumeUrl    || '/resume.pdf';
    const videoUrl  = settings?.heroBackgroundVideo;

    return (
        <section id="hero" className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-background border-b-4 border-border">
            {/* Ambient Background Grid */}
            <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none z-1"></div>
            <div className="absolute inset-0 z-1 opacity-20" style={{ backgroundImage: 'radial-gradient(var(--color-border) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

            {/* Premium Apple Ambient Video Background */}
            {videoUrl && (
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-0 opacity-25 pointer-events-none mix-blend-luminosity"
                >
                    <source src={videoUrl} type="video/mp4" />
                </video>
            )}

            <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center">

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-accent text-foreground text-sm font-bold tracking-widest uppercase border-2 border-border brutal-shadow-sm">
                    <span>Available for Hire</span>
                </motion.div>

                <div className="text-[clamp(3rem,8vw,8rem)] font-heading font-black text-foreground tracking-tighter leading-[0.8] mb-8 uppercase">
                    <span className="block text-foreground" style={{ textShadow: '4px 4px 0px var(--color-primary)' }}>{name}</span>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="flex flex-col md:flex-row items-center justify-center gap-4 mt-4">
                        <span className="text-foreground bg-accent px-4 py-1 border-4 border-border brutal-shadow-sm text-[clamp(1.2rem,3.5vw,3.5rem)]">
                            {tagline}
                        </span>
                        <RotatingText
                            texts={['Web', 'Design', 'Tech']}
                            mainClassName="bg-primary px-4 sm:px-4 md:px-6 text-primary-foreground border-4 border-border brutal-shadow-sm overflow-hidden py-1 sm:py-2 md:py-3 justify-center"
                            staggerFrom="last" initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "-120%" }}
                            staggerDuration={0.025} splitLevelClassName="overflow-hidden pb-1 sm:pb-2 md:pb-2"
                            transition={{ type: "spring", damping: 30, stiffness: 400 }} rotationInterval={2000}
                        />
                    </motion.div>
                </div>

                <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                    className="text-xl md:text-2xl font-bold text-card-foreground mb-12 max-w-2xl mx-auto bg-card border-[3px] border-border p-4 brutal-shadow-sm rotate-1">
                    {bio}
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Magnetic intensity={0.2}>
                        <Link href={ctaUrl}
                            className="w-full sm:w-auto px-8 py-4 bg-primary text-foreground font-black uppercase text-xl border-[3px] border-border brutal-shadow brutal-hover rounded-2xl flex items-center justify-center gap-3">
                            {ctaLabel}<ArrowRight size={24} strokeWidth={3} />
                        </Link>
                    </Magnetic>
                    <Magnetic intensity={0.2}>
                        <a href={resumeUrl} target="_blank" rel="noopener noreferrer"
                            className="w-full sm:w-auto px-8 py-4 bg-card text-card-foreground font-black uppercase text-xl border-[3px] border-border brutal-shadow brutal-hover rounded-2xl flex items-center justify-center gap-3">
                            <Download size={24} strokeWidth={3} />Download CV
                        </a>
                    </Magnetic>
                </motion.div>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-primary/0 via-primary to-primary/0 animate-pulse" />
            </motion.div>
        </section>
    );
}
