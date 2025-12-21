'use client';

import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function Contact() {
    const [focused, setFocused] = useState<string | null>(null);

    return (
        <section id="contact" className="py-24 bg-background relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 tracking-tight">
                        Let's <span className="text-primary">Connect</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Ready to start your next project? I'm open to new opportunities and collaborations.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col gap-8"
                    >
                        <div className="p-8 rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50 shadow-lg relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <span className="p-3 rounded-xl bg-primary/10 text-primary">
                                    <MessageSquare size={24} />
                                </span>
                                Get in touch
                            </h3>
                            <p className="text-muted-foreground leading-relaxed mb-8">
                                Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!
                            </p>

                            <div className="flex flex-col gap-6">
                                <a href="mailto:hello@fallonava.com" className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-border/50 hover:border-primary/50 transition-colors group/link cursor-pointer">
                                    <Mail className="text-primary group-hover/link:scale-110 transition-transform" />
                                    <div>
                                        <div className="text-xs text-muted-foreground">Email</div>
                                        <div className="font-medium text-foreground">hello@fallonava.com</div>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h4 className="font-semibold text-muted-foreground uppercase tracking-wider text-sm">Socials</h4>
                            <div className="flex gap-4">
                                {[
                                    { icon: Github, link: "#", label: "Github" },
                                    { icon: Linkedin, link: "#", label: "LinkedIn" },
                                    { icon: Twitter, link: "#", label: "Twitter" }
                                ].map((social, idx) => (
                                    <a
                                        key={idx}
                                        href={social.link}
                                        target="_blank"
                                        className="p-4 rounded-xl bg-card border border-border/50 hover:border-primary/50 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all duration-300 transform hover:-translate-y-1"
                                        aria-label={social.label}
                                    >
                                        <social.icon size={24} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="relative"
                    >
                        {/* Holographic Border Effect */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-20 blur-xl animate-pulse" />

                        <form className="relative p-8 md:p-10 rounded-3xl bg-background/80 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="name" className="text-sm font-medium text-muted-foreground ml-1">Name</label>
                                    <div className={`relative rounded-xl overflow-hidden transition-all duration-300 ring-1 ring-border/50 ${focused === 'name' ? 'ring-primary shadow-[0_0_20px_rgba(37,99,235,0.15)]' : 'bg-secondary/20'}`}>
                                        <input
                                            type="text"
                                            id="name"
                                            className="w-full px-5 py-4 bg-transparent outline-none text-foreground placeholder-muted-foreground/50"
                                            placeholder="John Doe"
                                            onFocus={() => setFocused('name')}
                                            onBlur={() => setFocused(null)}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="email" className="text-sm font-medium text-muted-foreground ml-1">Email</label>
                                    <div className={`relative rounded-xl overflow-hidden transition-all duration-300 ring-1 ring-border/50 ${focused === 'email' ? 'ring-primary shadow-[0_0_20px_rgba(37,99,235,0.15)]' : 'bg-secondary/20'}`}>
                                        <input
                                            type="email"
                                            id="email"
                                            className="w-full px-5 py-4 bg-transparent outline-none text-foreground placeholder-muted-foreground/50"
                                            placeholder="john@example.com"
                                            onFocus={() => setFocused('email')}
                                            onBlur={() => setFocused(null)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="message" className="text-sm font-medium text-muted-foreground ml-1">Message</label>
                                <div className={`relative rounded-xl overflow-hidden transition-all duration-300 ring-1 ring-border/50 ${focused === 'message' ? 'ring-primary shadow-[0_0_20px_rgba(37,99,235,0.15)]' : 'bg-secondary/20'}`}>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        className="w-full px-5 py-4 bg-transparent outline-none text-foreground placeholder-muted-foreground/50 resize-none"
                                        placeholder="How can I help you?"
                                        onFocus={() => setFocused('message')}
                                        onBlur={() => setFocused(null)}
                                    />
                                </div>
                            </div>

                            <button className="mt-2 w-full py-4 rounded-xl bg-gradient-to-r from-primary to-blue-600 text-white font-bold tracking-wide shadow-lg hover:shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2">
                                Send Message
                                <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
