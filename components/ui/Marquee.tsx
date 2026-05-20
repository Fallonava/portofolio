'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { SiteSettings } from '@/sanity/lib/siteSettings';

interface MarqueeProps {
  settings?: SiteSettings;
}

export function Marquee({ settings }: MarqueeProps) {
  const baseText = settings?.marqueeText || "NEOBRUTALISM 2026 • CREATIVE DEVELOPER • RAW POWER • BENTO UI";
  // Duplicate text to ensure seamless infinite scroll
  const text = `${baseText} • ${baseText} • `;

  return (
    <div className="w-full bg-accent border-y-[3px] border-border py-4 overflow-hidden relative z-10 flex">
      <motion.div
        className="whitespace-nowrap flex"
        animate={{
          x: [0, -1000],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 15,
            ease: "linear",
          },
        }}
      >
        <span className="text-3xl font-black text-foreground uppercase tracking-widest px-4">{text}</span>
        <span className="text-3xl font-black text-foreground uppercase tracking-widest px-4">{text}</span>
      </motion.div>
    </div>
  );
}
