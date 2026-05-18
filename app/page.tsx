import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/ui/Marquee";
import { About } from "@/components/sections/About";
import dynamic from 'next/dynamic';

const Experience   = dynamic(() => import("@/components/sections/Experience").then(m => m.Experience),   { ssr: true });
const Projects     = dynamic(() => import("@/components/sections/Projects").then(m => m.Projects),       { ssr: true });
const Features     = dynamic(() => import("@/components/sections/Features").then(m => m.Features),       { ssr: true });
const Contact      = dynamic(() => import("@/components/sections/Contact").then(m => m.Contact),         { ssr: true });
const Testimonials = dynamic(() => import("@/components/sections/Testimonials").then(m => m.Testimonials), { ssr: true });
import { Footer } from "@/components/layout/Footer";
import { client } from "@/sanity/lib/client";
import { getSiteSettings } from "@/sanity/lib/siteSettings";
import { MaintenancePage } from "@/components/ui/MaintenancePage";

export const revalidate = 60;

async function getSanityData() {
  try {
    const projects     = await client.fetch(`*[_type == "project" && isPublic == true] | order(order asc)`);
    const experiences  = await client.fetch(`*[_type == "experience"] | order(order asc)`);
    const testimonials = await client.fetch(`*[_type == "testimonial"] | order(order asc)`);

    return {
      projects:     projects.map((p: any) => ({ ...p, id: p._id })),
      experiences:  experiences.map((e: any) => ({ ...e, id: e._id })),
      testimonials: testimonials.map((t: any) => ({ ...t, id: t._id })),
    };
  } catch {
    return { projects: [], experiences: [], testimonials: [] };
  }
}

export default async function Home() {
  const [{ projects, experiences, testimonials }, settings] = await Promise.all([
    getSanityData(),
    getSiteSettings(),
  ]);

  // Maintenance mode
  if (settings.maintenanceMode) {
    return <MaintenancePage message={settings.maintenanceMessage} />;
  }

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Navbar settings={settings} />
      <Hero settings={settings} />
      <Marquee />
      <About />

      {settings.showExperience !== false && experiences?.length > 0 && <Experience data={experiences} />}
      {settings.showProjects   !== false && projects?.length > 0     && <Projects data={projects} />}
      {settings.showFeatures   !== false && <Features />}
      {settings.showTestimonials !== false && testimonials?.length > 0 && <Testimonials data={testimonials} />}

      <Contact settings={settings} />
      <Footer settings={settings} />
    </main>
  );
}
