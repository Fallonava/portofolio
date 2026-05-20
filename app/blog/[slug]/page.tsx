import { client } from '@/sanity/lib/client';
import { getSiteSettings } from '@/sanity/lib/siteSettings';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { notFound } from 'next/navigation';
import { ArticleReader } from './ArticleReader';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 30;

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug && isPublic == true][0] {
      title,
      excerpt
    }`,
    { slug }
  );

  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  const settings = await getSiteSettings();

  return {
    title: `${post.title} | Blog | ${settings.heroName || 'Fallonava'}`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
    }
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([
    client.fetch(
      `*[_type == "post" && slug.current == $slug && isPublic == true][0] {
        _id,
        title,
        excerpt,
        content,
        publishedAt,
        readTime,
        tags,
        "slug": slug.current,
        "imageUrl": mainImage.asset->url
      }`,
      { slug }
    ),
    getSiteSettings(),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

      <Navbar settings={settings} />

      <div className="flex-1 pt-32 pb-24 relative z-10">
        <ArticleReader post={post} settings={settings} />
      </div>

      <Footer settings={settings} />
    </main>
  );
}
