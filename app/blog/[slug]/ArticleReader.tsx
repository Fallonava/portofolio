'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Tag, User, Share2, Check, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { GiscusComments } from '@/components/ui/GiscusComments';

interface Post {
  _id: string;
  title: string;
  excerpt: string;
  content: any[];
  publishedAt: string;
  readTime: number;
  tags?: string[];
  slug: string;
  imageUrl?: string;
}

interface ArticleReaderProps {
  post: Post;
  settings: any;
}

// Custom serializers for Sanity Portable Text
const portableTextComponents = {
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight text-foreground mt-12 mb-6 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl md:text-3xl font-heading font-black uppercase tracking-tight text-foreground mt-10 mb-4 pl-4 border-l-[5px] border-primary leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl md:text-2xl font-heading font-black uppercase tracking-tight text-foreground mt-8 mb-3 leading-tight">
        {children}
      </h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="my-8 pl-5 pr-4 py-4 border-l-[5px] border-primary/60 italic text-muted-foreground bg-primary/5 rounded-r-2xl font-semibold leading-relaxed">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p className="text-foreground/90 font-medium text-base md:text-lg leading-relaxed mb-6 font-sans">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-6 space-y-2 mb-6 text-foreground/90 font-medium text-base md:text-lg font-sans">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-6 space-y-2 mb-6 text-foreground/90 font-medium text-base md:text-lg font-sans">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="marker:text-primary pl-1">{children}</li>,
    number: ({ children }: any) => <li className="marker:text-primary pl-1">{children}</li>,
  },
  marks: {
    link: ({ children, value }: any) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-primary hover:underline font-bold inline-flex items-center gap-0.5"
        >
          {children}
          {target === '_blank' && <ArrowUpRight size={14} className="inline shrink-0" />}
        </a>
      );
    },
    strong: ({ children }: any) => <strong className="font-extrabold text-foreground">{children}</strong>,
    code: ({ children }: any) => (
      <code className="px-2 py-0.5 rounded-lg bg-tertiary border border-border/40 font-mono text-sm font-semibold text-primary">
        {children}
      </code>
    ),
  },
};

// Stable gradient fallback matching list view
function getGradientStyle(title: string) {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color1 = Math.abs(hash % 360);
  const color2 = Math.abs((hash + 80) % 360);
  return {
    background: `linear-gradient(135deg, hsl(${color1}, 80%, 40%), hsl(${color2}, 85%, 20%))`,
  };
}

export function ArticleReader({ post, settings }: ArticleReaderProps) {
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll();

  const handleShare = () => {
    if (typeof window === 'undefined') return;
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const authorName = settings.heroName || 'Fallonava';

  return (
    <div className="container mx-auto px-6 max-w-4xl relative">
      {/* Dynamic Top Reading Progress Bar (Apple-style) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-primary z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navigation & Controls */}
      <div className="flex justify-between items-center mb-8 shrink-0">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-card/60 hover:bg-card border-[3px] border-border text-foreground font-black uppercase text-xs rounded-xl brutal-shadow-sm brutal-hover transition-all duration-200"
        >
          <ArrowLeft size={14} strokeWidth={3} /> Back to Lab
        </Link>
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-card/60 hover:bg-card border-[3px] border-border text-foreground font-black uppercase text-xs rounded-xl brutal-shadow-sm brutal-hover transition-all duration-200"
        >
          {copied ? (
            <>
              <Check size={14} strokeWidth={3} className="text-[#34C759]" /> Copied!
            </>
          ) : (
            <>
              <Share2 size={14} strokeWidth={3} /> Share Link
            </>
          )}
        </button>
      </div>

      {/* Article Header */}
      <header className="space-y-6 mb-12">
        <div className="flex flex-wrap gap-2">
          {post.tags?.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-0.5 px-3 py-1 text-xs font-black uppercase tracking-wider bg-primary/10 border border-primary/30 text-primary rounded-xl"
            >
              <Tag size={10} />
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-none text-foreground uppercase">
          {post.title}
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground font-bold leading-relaxed">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-muted-foreground/80 pt-2 border-t-[3px] border-border/20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 border-2 border-border flex items-center justify-center text-primary font-black uppercase">
              {authorName.charAt(0)}
            </div>
            <span>By {authorName}</span>
          </div>
          <span className="flex items-center gap-1.5">
            <Calendar size={14} />
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            {post.readTime} min read
          </span>
        </div>
      </header>

      {/* Featured Cover Image Banner */}
      <div className="relative w-full aspect-[21/9] border-[4px] border-border rounded-3xl overflow-hidden bg-black brutal-shadow mb-12">
        {post.imageUrl ? (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            style={getGradientStyle(post.title)}
            className="w-full h-full flex items-center justify-center p-8 text-center text-white/95 font-heading font-black text-2xl md:text-3xl uppercase tracking-wider"
          >
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
            <span className="relative z-10 leading-snug drop-shadow-lg">{post.title}</span>
          </div>
        )}
      </div>

      {/* Article Content Layout */}
      <div className="prose prose-invert max-w-[65ch] mx-auto mb-16 select-text selection:bg-primary/30">
        <PortableText value={post.content} components={portableTextComponents} />
      </div>

      {/* Premium Author Bio Card */}
      <footer className="max-w-[65ch] mx-auto border-[4px] border-border bg-card/30 backdrop-blur-xl rounded-3xl p-6 md:p-8 brutal-shadow relative overflow-hidden">
        {/* Glow behind author */}
        <div className="absolute bottom-[-20%] left-[-20%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[40px] pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-primary border-[3px] border-border text-foreground font-black text-2xl flex items-center justify-center shrink-0 brutal-shadow-sm">
            {authorName.charAt(0).toUpperCase()}
          </div>
          <div className="space-y-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h4 className="text-xl font-heading font-black uppercase text-foreground">
                Written by {authorName}
              </h4>
              <span className="text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-lg uppercase tracking-wider">
                Author
              </span>
            </div>
            <p className="text-sm font-semibold text-muted-foreground leading-relaxed">
              {settings.heroBio || 'Creative developer and full-stack specialist constructing high-fidelity user experiences and beautiful clean code bases.'}
            </p>
          </div>
        </div>
      </footer>

      {/* Embedded Comments Section */}
      <GiscusComments />
    </div>
  );
}
