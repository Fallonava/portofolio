import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-primary border-t-[3px] border-border py-16 md:py-24">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">

                    {/* Brand */}
                    <div className="flex flex-col gap-6">
                        <h2 className="text-5xl md:text-7xl font-heading font-black text-foreground tracking-tighter uppercase">
                            Fallonava<br/>Project
                        </h2>
                        <p className="text-foreground font-bold text-lg max-w-sm border-l-[3px] border-border pl-4">
                            Crafting digital experiences that defy expectations with raw power.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="grid grid-cols-2 gap-10 md:gap-20">
                        <div className="flex flex-col gap-4">
                            <h4 className="font-black text-xl text-foreground uppercase bg-card border-[3px] border-border inline-block px-4 py-2 self-start brutal-shadow-sm rounded-xl">Socials</h4>
                            <Link href="https://github.com/Fallonava" target="_blank" className="font-bold text-foreground hover:bg-card hover:border-border border-[3px] border-transparent px-3 py-2 rounded-xl transition-colors flex items-center gap-2 w-fit brutal-hover">
                                <Github size={20} /> GitHub
                            </Link>
                            <Link href="#" className="font-bold text-foreground hover:bg-card hover:border-border border-[3px] border-transparent px-3 py-2 rounded-xl transition-colors flex items-center gap-2 w-fit brutal-hover">
                                <Twitter size={20} /> Twitter
                            </Link>
                            <Link href="#" className="font-bold text-foreground hover:bg-card hover:border-border border-[3px] border-transparent px-3 py-2 rounded-xl transition-colors flex items-center gap-2 w-fit brutal-hover">
                                <Linkedin size={20} /> LinkedIn
                            </Link>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h4 className="font-black text-xl text-foreground uppercase bg-card border-[3px] border-border inline-block px-4 py-2 self-start brutal-shadow-sm rounded-xl">Sitemap</h4>
                            <Link href="#product" className="font-bold text-foreground hover:bg-card hover:border-border border-[3px] border-transparent px-3 py-2 rounded-xl transition-colors w-fit brutal-hover">Product</Link>
                            <Link href="#features" className="font-bold text-foreground hover:bg-card hover:border-border border-[3px] border-transparent px-3 py-2 rounded-xl transition-colors w-fit brutal-hover">Features</Link>
                            <Link href="#contact" className="font-bold text-foreground hover:bg-card hover:border-border border-[3px] border-transparent px-3 py-2 rounded-xl transition-colors w-fit brutal-hover">Contact</Link>
                        </div>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t-[3px] border-border flex flex-col md:flex-row justify-between items-center gap-6 text-base font-bold text-foreground">
                    <p className="bg-card text-card-foreground border-[3px] border-border px-4 py-2 brutal-shadow-sm rounded-xl">© {new Date().getFullYear()} Fallonava Project. ALL RIGHTS RESERVED.</p>
                    <div className="flex gap-4">
                        <Link href="#" className="hover:text-primary transition-colors underline decoration-[3px] underline-offset-4">Privacy Policy</Link>
                        <Link href="#" className="hover:text-primary transition-colors underline decoration-[3px] underline-offset-4">Terms of Service</Link>
                    </div>
                </div>

                {/* Gigantic Text */}
                <div className="w-full mt-24 overflow-hidden border-t-[3px] border-border pt-8 flex justify-center">
                    <h1 className="text-[15vw] leading-none font-black text-foreground uppercase tracking-tighter select-none">
                        FALLONAVA
                    </h1>
                </div>
            </div>
        </footer>
    );
}
