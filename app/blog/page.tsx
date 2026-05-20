import { client } from '@/sanity/lib/client';
import { getSiteSettings } from '@/sanity/lib/siteSettings';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BlogFeed } from './BlogFeed';
import { BookOpen, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 30;

export async function generateMetadata() {
  const settings = await getSiteSettings();
  return {
    title: `Blog | ${settings.heroName || 'Fallonava'} Portfolio`,
    description: settings.seoDescription || 'Read the latest technical writeups, design explorations, and full-stack development articles by Fallonava.',
    openGraph: {
      title: `Blog | ${settings.heroName || 'Fallonava'} Portfolio`,
      description: settings.seoDescription || 'Read the latest technical writeups and design articles.',
    }
  };
}

export default async function BlogPage() {
  const [posts, settings] = await Promise.all([
    client.fetch(`*[_type == "post" && isPublic == true] | order(publishedAt desc) {
      _id,
      title,
      excerpt,
      publishedAt,
      readTime,
      tags,
      "slug": slug.current,
      "imageUrl": mainImage.asset->url
    }`),
    getSiteSettings(),
  ]);

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground relative overflow-hidden">
      {/* Ambient background glow matching visionOS */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

      <Navbar settings={settings} />

      <div className="flex-1 container mx-auto px-6 pt-32 pb-24 relative z-10">
        {!settings.showBlog ? (
          <div className="max-w-md mx-auto text-center py-20 bg-card/40 backdrop-blur-xl border-[4px] border-border rounded-3xl p-8 brutal-shadow mt-12">
            <BookOpen size={64} className="mx-auto text-primary mb-6 animate-pulse" />
            <h2 className="text-3xl font-black uppercase tracking-tight text-foreground mb-4">Blog Mode Coming Soon</h2>
            <p className="text-muted-foreground font-bold mb-8 leading-relaxed">
              We are currently drafting premium case studies, technical insights, and design philosophies. Stay tuned for liftoff!
            </p>
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-primary border-[3px] border-border text-foreground font-black uppercase rounded-2xl brutal-shadow-sm brutal-hover transition-all">
              <ArrowLeft size={16} strokeWidth={3} /> Back Home
            </Link>
          </div>
        ) : (
          <BlogFeed posts={posts} settings={settings} />
        )}
      </div>

      <Footer settings={settings} />
    </main>
  );
}
