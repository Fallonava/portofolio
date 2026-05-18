'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '@/components/theme-toggle';
import type { SiteSettings } from '@/sanity/lib/siteSettings';

const defaultNavLinks = [
    { name: 'About',        href: '#about' },
    { name: 'Experience',   href: '#experience' },
    { name: 'Projects',     href: '#projects' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact',      href: '#contact' },
];

interface NavbarProps { settings?: SiteSettings }

export function Navbar({ settings }: NavbarProps) {
    const [scrolled, setScrolled]         = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const name = settings?.heroName || 'Fallonava';

    return (
        <nav className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-[3px] border-transparent',
            scrolled ? 'bg-background border-border py-3' : 'bg-transparent py-5')}>
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group brutal-hover p-1">
                    <div className="w-10 h-10 bg-primary border-[3px] border-border flex items-center justify-center text-foreground font-bold text-xl brutal-shadow-sm rounded-xl">
                        {name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-heading font-black text-2xl tracking-tight text-foreground uppercase">
                        {name}
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-6">
                    {defaultNavLinks.map((link) => (
                        <Link key={link.name} href={link.href}
                            className="text-base font-bold text-foreground border-[3px] border-transparent hover:border-border hover:bg-tertiary px-4 py-2 transition-all brutal-hover rounded-xl">
                            {link.name}
                        </Link>
                    ))}
                    <ThemeToggle />
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden flex items-center gap-4">
                    <ThemeToggle />
                    <button className="text-card-foreground p-2 border-[3px] border-border bg-card brutal-shadow-sm brutal-active rounded-xl"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-background border-b-[3px] border-border overflow-hidden">
                        <div className="flex flex-col p-6 gap-4">
                            {defaultNavLinks.map((link) => (
                                <Link key={link.name} href={link.href}
                                    className="text-xl font-bold text-card-foreground brutal-border bg-card hover:bg-tertiary transition-colors py-3 px-4 brutal-shadow-sm brutal-active"
                                    onClick={() => setMobileMenuOpen(false)}>
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
