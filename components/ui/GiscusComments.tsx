'use client'

import Giscus from '@giscus/react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function GiscusComments() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Wait for hydration
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const currentTheme = theme === 'system' ? resolvedTheme : theme
  // We use standard 'dark' or 'light' for Giscus themes
  const giscusTheme = currentTheme === 'dark' ? 'transparent_dark' : 'light'

  return (
    <div className="mt-20 pt-12 border-t-[3px] border-border relative">
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-background px-6">
        <span className="text-sm font-bold uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full">
          Discussion
        </span>
      </div>
      <div className="bg-card/50 backdrop-blur-xl border-[3px] border-border brutal-shadow rounded-[32px] p-6 sm:p-10 overflow-hidden">
        <Giscus
          id="comments"
          repo="YOUR_GITHUB_USERNAME/YOUR_REPO_NAME"
          repoId="YOUR_REPO_ID"
          category="Comments"
          categoryId="YOUR_CATEGORY_ID"
          mapping="pathname"
          term="Welcome to @giscus/react component!"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme={giscusTheme}
          lang="en"
          loading="lazy"
        />
        <p className="text-xs font-bold text-muted-foreground/60 text-center mt-8 uppercase tracking-wider">
          Powered by GitHub Discussions
        </p>
      </div>
    </div>
  )
}
