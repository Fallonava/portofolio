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
import { client } from "@/sanity/lib/client";
import { allProjects, experiences as staticExperiences, testimonials as staticTestimonials } from "@/lib/data";

export const revalidate = 60; // Revalidate every 60 seconds

async function getSanityData() {
  try {
    const projects = await client.fetch(`*[_type == "project"] | order(order asc)`);
    const experiences = await client.fetch(`*[_type == "experience"] | order(order asc)`);
    const testimonials = await client.fetch(`*[_type == "testimonial"] | order(order asc)`);
    return { projects, experiences, testimonials };
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return { projects: [], experiences: [], testimonials: [] };
  }
}

export default async function Home() {
  const { projects: sanityProjects, experiences: sanityExperiences, testimonials: sanityTestimonials } = await getSanityData();

  const finalProjects = sanityProjects?.length > 0 ? sanityProjects : allProjects;
  const finalExperiences = sanityExperiences?.length > 0 ? sanityExperiences : staticExperiences;
  const finalTestimonials = sanityTestimonials?.length > 0 ? sanityTestimonials : staticTestimonials;

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <Hero />
      <Marquee />
      <About />

      <Experience data={finalExperiences} />

      <Projects data={finalProjects} />

      <Features />

      <Testimonials data={finalTestimonials} />

      <Contact />

      <Footer />
    </main>
  );
}
