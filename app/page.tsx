import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/ui/Marquee";
import { About } from "@/components/sections/About";
import dynamic from 'next/dynamic';

const Experience = dynamic(() => import("@/components/sections/Experience").then(m => m.Experience), { ssr: true });
const Projects = dynamic(() => import("@/components/sections/Projects").then(m => m.Projects), { ssr: true });
const Features = dynamic(() => import("@/components/sections/Features").then(m => m.Features), { ssr: true });
const Contact = dynamic(() => import("@/components/sections/Contact").then(m => m.Contact), { ssr: true });
const Testimonials = dynamic(() => import("@/components/sections/Testimonials").then(m => m.Testimonials), { ssr: true });
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <Hero />
      <Marquee />
      <About />

      <Experience />

      <Projects />

      <Features />



      <Testimonials />

      <Contact />

      <Footer />
    </main>
  );
}
