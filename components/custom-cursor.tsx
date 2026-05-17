"use client"

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { usePathname } from 'next/navigation'

export function CustomCursor() {
  const pathname = usePathname()
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  })

  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // Check if hovering over interactive elements
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener("mousemove", mouseMove)
    window.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", mouseMove)
      window.removeEventListener("mouseover", handleMouseOver)
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      height: 24,
      width: 24,
      backgroundColor: "var(--color-primary)",
      mixBlendMode: "difference" as any,
    },
    hover: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      height: 64,
      width: 64,
      backgroundColor: "var(--color-secondary)",
      mixBlendMode: "difference" as any,
    }
  }

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] rounded-full pointer-events-none hidden md:block"
      variants={variants}
      animate={isHovering ? "hover" : "default"}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
        mass: 0.5
      }}
    />
  )
}
