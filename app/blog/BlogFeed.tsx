'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, Clock, ArrowRight, Tag, BookOpen } from 'lucide-react';
import Link from 'next/link';

interface Post {
  _id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: number;
  tags?: string[];
  slug: string;
  imageUrl?: string;
}

interface BlogFeedProps {
  posts: Post[];
  settings: any;
}

// Simple hash function to generate stable vibrant gradient parameters based on title
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

export function BlogFeed({ posts, settings }: BlogFeedProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Dynamic tag extraction with count
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    posts.forEach((post) => {
      post.tags?.forEach((tag) => {
        const cleaned = tag.trim();
        if (cleaned) {
          counts[cleaned] = (counts[cleaned] || 0) + 1;
        }
      });
    });
    return counts;
  }, [posts]);

  const uniqueTags = useMemo(() => Object.keys(tagCounts).sort(), [tagCounts]);

  // Dynamic filter logic
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTag = !selectedTag || post.tags?.some((t) => t.trim() === selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  return (
    <div className="space-y-12">
      {/* Intro Hero Section */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest"
        >
          <BookOpen size={12} /> The Lab Notebook
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl font-heading font-black tracking-tight uppercase"
        >
          Creative Insights & Technical Writeups
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground font-bold text-base md:text-lg max-w-xl mx-auto leading-relaxed"
        >
          Deep dives into next-generation development, responsive user experiences, interactive architecture, and premium aesthetics.
        </motion.p>
      </div>

      {/* Control Bar: Search & Tag filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="space-y-6 max-w-4xl mx-auto"
      >
        {/* Search Bar */}
        <div className="relative group">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search writeups by keywords, technologies, tags..."
            className="w-full pl-12 pr-6 py-4 bg-card/40 hover:bg-card/60 focus:bg-card border-[3px] border-border rounded-2xl outline-none font-bold text-base text-foreground transition-all duration-300 placeholder:text-muted-foreground/60 focus:shadow-[8px_8px_0px_0px_var(--color-border)]"
          />
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
        </div>

        {/* Tag Filters */}
        {uniqueTags.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center justify-center pt-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl border-[3px] transition-all duration-200 ${
                selectedTag === null
                  ? 'bg-primary border-border text-foreground brutal-shadow-sm'
                  : 'bg-card/40 border-border/40 text-muted-foreground hover:border-border hover:text-foreground'
              }`}
            >
              All Articles ({posts.length})
            </button>
            {uniqueTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl border-[3px] transition-all duration-200 ${
                  selectedTag === tag
                    ? 'bg-primary border-border text-foreground brutal-shadow-sm'
                    : 'bg-card/40 border-border/40 text-muted-foreground hover:border-border hover:text-foreground'
                }`}
              >
                #{tag} ({tagCounts[tag]})
              </button>
            ))}
          </div>
        )}
      </motion.div>

      {/* Grid of articles */}
      <div className="max-w-6xl mx-auto pt-4">
        <AnimatePresence mode="wait">
          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-24 bg-card/20 border-[3px] border-border/50 rounded-3xl p-8"
            >
              <Search size={48} className="mx-auto text-muted-foreground/45 mb-4 animate-bounce" />
              <h3 className="text-xl font-black uppercase tracking-wide">No writeups found</h3>
              <p className="text-muted-foreground font-bold text-sm mt-1">Try refining your search terms or filters.</p>
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08 }
                }
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPosts.map((post) => (
                <motion.article
                  key={post._id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 25 } }
                  }}
                  className="group flex flex-col bg-card/30 backdrop-blur-xl border-[4px] border-border rounded-3xl overflow-hidden brutal-shadow hover:shadow-[12px_12px_0px_0px_var(--color-border)] hover:-translate-y-1 transition-all duration-300 relative"
                >
                  {/* Image wrapper */}
                  <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/9] w-full overflow-hidden border-b-[4px] border-border">
                    {post.imageUrl ? (
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div
                        style={getGradientStyle(post.title)}
                        className="w-full h-full flex items-center justify-center p-6 text-center text-white/95 font-bold uppercase tracking-wider relative"
                      >
                        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] group-hover:backdrop-blur-[0px] transition-all" />
                        <span className="relative text-sm font-heading z-10 leading-snug drop-shadow-md">{post.title}</span>
                      </div>
                    )}
                    {/* Hover indicator overlay */}
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="bg-background/90 text-foreground border-2 border-border font-black text-xs uppercase px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md">
                        Read Article <ArrowRight size={12} strokeWidth={3} />
                      </div>
                    </div>
                  </Link>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      {/* Meta information */}
                      <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground/80">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {post.readTime} min read
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-heading font-black leading-snug tracking-tight text-foreground group-hover:text-primary transition-colors">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>

                      {/* Excerpt */}
                      <p className="text-sm text-muted-foreground/90 font-medium leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Footer: Tags & CTA */}
                    <div className="space-y-3 pt-2">
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setSelectedTag(selectedTag === tag ? null : tag);
                              }}
                              className="inline-flex items-center gap-0.5 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider bg-tertiary border border-border/40 text-foreground rounded-lg cursor-pointer hover:border-primary transition-colors"
                            >
                              <Tag size={8} />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
