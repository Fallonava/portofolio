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

export const revalidate = 60; // Revalidate every 60 seconds

async function getSanityData() {
  try {
    const projects = await client.fetch(`*[_type == "project" && isPublic == true] | order(order asc)`);
    const experiences = await client.fetch(`*[_type == "experience"] | order(order asc)`);
    const testimonials = await client.fetch(`*[_type == "testimonial"] | order(order asc)`);
    
    // Map _id to id to match mock data interfaces expected by components
    const mappedProjects = projects.map((p: any) => ({ ...p, id: p._id }));
    const mappedExperiences = experiences.map((e: any) => ({ ...e, id: e._id }));
    const mappedTestimonials = testimonials.map((t: any) => ({ ...t, id: t._id }));

    return { projects: mappedProjects, experiences: mappedExperiences, testimonials: mappedTestimonials };
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return { projects: [], experiences: [], testimonials: [] };
  }
}

export default async function Home() {
  const { projects: sanityProjects, experiences: sanityExperiences, testimonials: sanityTestimonials } = await getSanityData();

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <Hero />
      <Marquee />
      <About />

      {sanityExperiences?.length > 0 && <Experience data={sanityExperiences} />}

      {sanityProjects?.length > 0 && <Projects data={sanityProjects} />}

      <Features />

      {sanityTestimonials?.length > 0 && <Testimonials data={sanityTestimonials} />}

      <Contact />

      <Footer />
    </main>
  );
}
