import Link from 'next/link';
import { Github, Twitter, Linkedin, Instagram, Youtube, Globe, Mail } from 'lucide-react';
import type { SiteSettings } from '@/sanity/lib/siteSettings';

const PLATFORM_ICON: Record<string, any> = {
    'GitHub':     Github,
    'LinkedIn':   Linkedin,
    'Twitter/X':  Twitter,
    'Instagram':  Instagram,
    'YouTube':    Youtube,
    'Email':      Mail,
    'Website':    Globe,
};

interface FooterProps { settings?: SiteSettings }

export function Footer({ settings }: FooterProps) {
    const name         = settings?.heroName   || 'Fallonava';
    const bio          = settings?.heroBio    || 'Crafting digital experiences that defy expectations with raw power.';
    const socialLinks  = settings?.socialLinks?.filter(l => l.visible && l.url) ?? [];

    const defaultSocials = [
        { platform: 'GitHub',   url: 'https://github.com/Fallonava' },
        { platform: 'Twitter/X', url: '#' },
        { platform: 'LinkedIn', url: '#' },
    ];

    const socials = socialLinks.length > 0 ? socialLinks : defaultSocials;

    return (
        <footer className="bg-primary border-t-[3px] border-border py-16 md:py-24">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">

                    {/* Brand */}
                    <div className="flex flex-col gap-6">
                        <h2 className="text-5xl md:text-7xl font-heading font-black text-foreground tracking-tighter uppercase">
                            {name}
                        </h2>
                        <p className="text-foreground font-bold text-lg max-w-sm border-l-[3px] border-border pl-4">
                            {bio}
                        </p>
                    </div>

                    {/* Links */}
                    <div className="grid grid-cols-2 gap-10 md:gap-20">
                        <div className="flex flex-col gap-4">
                            <h4 className="font-black text-xl text-foreground uppercase bg-card border-[3px] border-border inline-block px-4 py-2 self-start brutal-shadow-sm rounded-xl">Socials</h4>
                            {socials.slice(0, 4).map((s) => {
                                const Icon = PLATFORM_ICON[s.platform] ?? Globe;
                                return (
                                    <Link key={s.platform} href={s.url} target="_blank"
                                        className="font-bold text-foreground hover:bg-card hover:border-border border-[3px] border-transparent px-3 py-2 rounded-xl transition-colors flex items-center gap-2 w-fit brutal-hover">
                                        <Icon size={20} /> {s.platform}
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="flex flex-col gap-4">
                            <h4 className="font-black text-xl text-foreground uppercase bg-card border-[3px] border-border inline-block px-4 py-2 self-start brutal-shadow-sm rounded-xl">Sitemap</h4>
                            {['#about','#experience','#projects','#contact'].map(href => (
                                <Link key={href} href={href}
                                    className="font-bold text-foreground hover:bg-card hover:border-border border-[3px] border-transparent px-3 py-2 rounded-xl transition-colors w-fit brutal-hover capitalize">
                                    {href.replace('#','')}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t-[3px] border-border flex flex-col md:flex-row justify-between items-center gap-6 text-base font-bold text-foreground">
                    <p className="bg-card text-card-foreground border-[3px] border-border px-4 py-2 brutal-shadow-sm rounded-xl">
                        © {new Date().getFullYear()} {name}. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex gap-4">
                        <Link href="#" className="hover:text-primary transition-colors underline decoration-[3px] underline-offset-4">Privacy Policy</Link>
                        <Link href="#" className="hover:text-primary transition-colors underline decoration-[3px] underline-offset-4">Terms of Service</Link>
                    </div>
                </div>

                {/* Gigantic Text */}
                <div className="w-full mt-24 overflow-hidden border-t-[3px] border-border pt-8 flex justify-center">
                    <h1 className="text-[15vw] leading-none font-black text-foreground uppercase tracking-tighter select-none">
                        {name.toUpperCase()}
                    </h1>
                </div>
            </div>
        </footer>
    );
}
