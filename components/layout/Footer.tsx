import Link from 'next/link';
import { Github, Twitter, Linkedin, Loader2 } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-background border-t border-border py-12 md:py-20">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">

                    {/* Brand */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground tracking-tighter">
                            Antigravity
                        </h2>
                        <p className="text-muted-foreground max-w-sm">
                            Crafting digital experiences that defy expectations.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="grid grid-cols-2 gap-10 md:gap-20">
                        <div className="flex flex-col gap-4">
                            <h4 className="font-semibold text-foreground">Socials</h4>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                                <Github size={18} /> GitHub
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                                <Twitter size={18} /> Twitter
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                                <Linkedin size={18} /> LinkedIn
                            </Link>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h4 className="font-semibold text-foreground">Sitemap</h4>
                            <Link href="#product" className="text-muted-foreground hover:text-primary transition-colors">Product</Link>
                            <Link href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</Link>
                            <Link href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} Antigravity Portfolio. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
                        <Link href="#" className="hover:text-foreground">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
