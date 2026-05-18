'use client';

import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, Github, Linkedin, Twitter, Globe, Instagram } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import type { SiteSettings } from '@/sanity/lib/siteSettings';

const PLATFORM_ICON: Record<string, any> = {
    'GitHub': Github, 'LinkedIn': Linkedin, 'Twitter/X': Twitter,
    'Instagram': Instagram, 'Website': Globe, 'Email': Mail,
};

const DEFAULT_EMAIL = 'hello@fallonava.com';

interface ContactProps { settings?: SiteSettings }

export function Contact({ settings }: ContactProps) {
    const [focused, setFocused] = useState<string | null>(null);

    const socialLinks = settings?.socialLinks?.filter(l => l.visible && l.url) ?? [];
    const emailLink   = socialLinks.find(l => l.platform === 'Email');
    const email       = emailLink?.url?.replace('mailto:', '') ?? DEFAULT_EMAIL;

    const displaySocials = socialLinks.filter(l => l.platform !== 'Email').slice(0, 4);

    return (
        <section id="contact" className="py-32 bg-background relative overflow-hidden border-b-[3px] border-border">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, var(--color-border) 0, var(--color-border) 2px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }} className="text-center mb-16">
                    <h2 className="text-5xl md:text-7xl font-heading font-black mb-6 tracking-tighter uppercase text-foreground" style={{ textShadow: '4px 4px 0px var(--color-primary)' }}>
                        Let's <span className="bg-white text-foreground px-4 brutal-border inline-block brutal-shadow-sm rotate-2">Connect</span>
                    </h2>
                    <p className="text-foreground font-bold max-w-2xl mx-auto text-xl uppercase bg-white brutal-border p-4 brutal-shadow">
                        Ready to start your next project? I'm open to new opportunities and collaborations.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-col gap-8">
                        <div className="p-10 bg-card brutal-border brutal-shadow relative overflow-hidden group">
                            <h3 className="text-4xl font-black mb-6 flex items-center gap-3 text-card-foreground uppercase">
                                <span className="p-3 bg-accent border-[3px] border-border brutal-shadow-sm text-foreground rounded-xl">
                                    <MessageSquare size={32} strokeWidth={3} />
                                </span>
                                Get in touch
                            </h3>
                            <p className="text-card-foreground font-bold leading-relaxed mb-8 border-l-[3px] border-border pl-4">
                                Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!
                            </p>
                            <button
                                onClick={() => { navigator.clipboard.writeText(email); toast.success("Email copied!", { icon: "📋" }); }}
                                className="flex items-center gap-4 p-4 bg-tertiary brutal-border group/link cursor-pointer brutal-shadow-sm brutal-hover text-left w-full">
                                <Mail className="text-foreground group-hover/link:scale-110 transition-transform" size={32} strokeWidth={3} />
                                <div>
                                    <div className="text-sm font-black text-foreground uppercase">Email</div>
                                    <div className="font-bold text-foreground text-xl">{email}</div>
                                </div>
                            </button>
                        </div>

                        {/* Social Links from settings */}
                        {displaySocials.length > 0 && (
                            <div className="flex flex-col gap-4">
                                <h4 className="font-semibold text-muted-foreground uppercase tracking-wider text-sm">Socials</h4>
                                <div className="flex gap-4 flex-wrap">
                                    {displaySocials.map((s) => {
                                        const Icon = PLATFORM_ICON[s.platform] ?? Globe;
                                        return (
                                            <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer"
                                                className="p-4 bg-card brutal-border text-card-foreground brutal-shadow-sm brutal-hover" aria-label={s.platform}>
                                                <Icon size={32} strokeWidth={3} />
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }} className="relative">
                        <form className="relative p-10 bg-card brutal-border brutal-shadow flex flex-col gap-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="name" className="text-lg font-black text-card-foreground uppercase">Name</label>
                                    <input type="text" id="name" placeholder="John Doe"
                                        className="w-full px-5 py-4 bg-background border-[3px] border-border rounded-xl outline-none text-foreground font-bold placeholder-foreground/50 focus:bg-primary transition-colors"
                                        onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="email" className="text-lg font-black text-card-foreground uppercase">Email</label>
                                    <input type="email" id="email" placeholder="john@example.com"
                                        className="w-full px-5 py-4 bg-background border-[3px] border-border rounded-xl outline-none text-foreground font-bold placeholder-foreground/50 focus:bg-primary transition-colors"
                                        onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="message" className="text-lg font-black text-card-foreground uppercase">Message</label>
                                <textarea id="message" rows={4} placeholder="How can I help you?"
                                    className="w-full px-5 py-4 bg-background border-[3px] border-border rounded-xl outline-none text-foreground font-bold placeholder-foreground/50 resize-none focus:bg-primary transition-colors"
                                    onFocus={() => setFocused('message')} onBlur={() => setFocused(null)} />
                            </div>
                            <button className="mt-4 w-full py-5 bg-secondary text-foreground font-black uppercase text-xl brutal-border brutal-shadow-sm brutal-hover flex items-center justify-center gap-3">
                                Send Message <Send size={24} strokeWidth={3} />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
