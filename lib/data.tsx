import React from "react";
import { Palette, Rocket, Lock, Globe, Smartphone, Zap } from 'lucide-react';
import { cn } from "@/lib/utils";

export const Highlight = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <span
            className={cn(
                "font-black bg-accent text-foreground brutal-border px-3 py-1 inline-block -rotate-1 brutal-shadow-sm",
                className
            )}
        >
            {children}
        </span>
    );
};

// --- Types ---
export interface ExperienceItem {
    year: string;
    title: string;
    company: string;
    description: string;
    tech: string[];
}

export interface FeatureItem {
    title: string;
    description: string;
    icon: React.ElementType;
    color: string;
}

export interface TechItem {
    name: string;
    icon: string;
}

export interface ProjectItem {
    id: string;
    title: string;
    category: string;
    description: string;
    longDescription: string;
    image: string;
    link: string;
    tech: string[];
    color: "blue" | "pink";
}

export interface TestimonialItem {
    id: number;
    name: string;
    designation: string;
    content: React.ReactNode;
}

// --- Data ---
export const experiences: ExperienceItem[] = [
    {
        year: "2024 - Present",
        title: "Full Stack Developer",
        company: "Freelance",
        description: "Building modern web applications using Next.js, React, and Tailwind CSS. Specializing in high-performance dashboards and interactive UIs.",
        tech: ["Next.js", "React", "TypeScript", "Tailwind"]
    },
    {
        year: "2023 - 2024",
        title: "Frontend Engineeer",
        company: "Tech Startups",
        description: "Collaborated with design teams to implement pixel-perfect user interfaces. Optimized core web vitals and improved site performance by 40%.",
        tech: ["React", "Redux", "Framer Motion"]
    },
    {
        year: "2022 - 2023",
        title: "Junior Web Developer",
        company: "Digital Agency",
        description: "Developed responsive websites for various clients. Maintained legacy codebases and integrated CMS solutions.",
        tech: ["HTML/CSS", "JavaScript", "WordPress"]
    }
];

export const features: FeatureItem[] = [
    {
        title: "Modern Aesthetics",
        description: "Interfaces that blend art and functionality using the latest design trends.",
        icon: Palette,
        color: "bg-tertiary"
    },
    {
        title: "High Performance",
        description: "Optimized for speed with Next.js App Router and server components.",
        icon: Rocket,
        color: "bg-accent"
    },
    {
        title: "Secure by Design",
        description: "Implementing best practices for data protection and authentication.",
        icon: Lock,
        color: "bg-primary"
    },
    {
        title: "Global Scale",
        description: "Built to deploy on the edge, reaching users instantly anywhere.",
        icon: Globe,
        color: "bg-secondary"
    },
    {
        title: "Mobile First",
        description: "Responsive designs that look clear and fluid on any device.",
        icon: Smartphone,
        color: "bg-pink-400"
    },
    {
        title: "Instant Interactivity",
        description: "Snappy animations and transitions powered by Framer Motion.",
        icon: Zap,
        color: "bg-tertiary"
    }
];

export const techStack: TechItem[] = [
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "GraphQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
    { name: "Prisma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
    { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "Vercel", icon: "https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png" },
];

export const allProjects: ProjectItem[] = [
    {
        id: "fallonava-app",
        title: "Fallonava App",
        category: "Web",
        description: "A comprehensive hospital management dashboard designed for efficiency and clarity.",
        longDescription: "Fallonava App is a state-of-the-art hospital management system designed to streamline operations and enhance patient care. It features a robust dashboard for real-time monitoring of hospital resources, patient flows, and staff schedules. Built with a focus on data visualization, it empowers administrators to make informed decisions quickly.",
        image: "/images/fallonava-app.png",
        link: "https://app.fallonava.my.id",
        tech: ["Next.js", "Neo-Brutalism", "Tailwind"],
        color: "blue"
    },
    {
        id: "fallonava-display",
        title: "Digital Display",
        category: "System",
        description: "A modern digital display interface for public information and queue management.",
        longDescription: "The Digital Display system transforms traditional hospital signage into dynamic, interactive screens. It provides real-time updates on doctor availability, queue status, and public announcements. Designed for high visibility and reliability, it ensures patients remain informed and reduces anxiety in waiting areas.",
        image: "/images/fallonava-display.png",
        link: "https://display.fallonava.my.id",
        tech: ["React", "Real-time", "Socket.io"],
        color: "pink"
    },
    {
        id: "e-commerce-pro",
        title: "E-Commerce Pro",
        category: "Web",
        description: "High conversion headless e-commerce storefront with brutalist design.",
        longDescription: "Built with Next.js and Shopify Storefront API. Features lightning fast page loads, optimistic cart updates, and a unique brutalist aesthetic that drives user engagement.",
        image: "/images/fallonava-app.png",
        link: "https://github.com/Fallonava",
        tech: ["Next.js", "Shopify API", "Stripe"],
        color: "blue"
    },
    {
        id: "med-tracker-mobile",
        title: "MedTracker Mobile",
        category: "Mobile",
        description: "Cross-platform mobile application for tracking daily medications.",
        longDescription: "A React Native application helping elderly patients track their medication schedules with push notifications and easy-to-read brutalist typography.",
        image: "/images/fallonava-display.png",
        link: "https://github.com/Fallonava",
        tech: ["React Native", "Expo", "Zustand"],
        color: "pink"
    },
    {
        id: "fintech-dashboard",
        title: "Fintech Dashboard",
        category: "UI/UX",
        description: "Dark-mode focused dashboard for cryptocurrency portfolio tracking.",
        longDescription: "A conceptual UI/UX design for a brutalist crypto dashboard, featuring high-contrast neon accents, dense data tables, and interactive charts.",
        image: "/images/fallonava-app.png",
        link: "https://github.com/Fallonava",
        tech: ["Figma", "Prototyping", "UI Design"],
        color: "blue"
    },
    {
        id: "internal-cms",
        title: "Internal CMS",
        category: "System",
        description: "Custom content management system for digital agencies.",
        longDescription: "A lightweight, secure CMS built specifically for managing dynamic brutalist portfolios and case studies without the bloat of WordPress.",
        image: "/images/fallonava-display.png",
        link: "https://github.com/Fallonava",
        tech: ["React", "Node.js", "PostgreSQL"],
        color: "pink"
    },
    {
        id: "brutal-ui-kit",
        title: "Brutal UI Kit",
        category: "Web",
        description: "Open-source React component library for Neobrutalism design.",
        longDescription: "A collection of accessible, highly-customizable React components featuring stark contrasts, hard shadows, and bold typography.",
        image: "/images/fallonava-app.png",
        link: "https://github.com/Fallonava",
        tech: ["React", "Storybook", "NPM"],
        color: "blue"
    },
    {
        id: "fitness-tracker",
        title: "Iron Gym App",
        category: "Mobile",
        description: "Workout tracking app with offline-first capabilities.",
        longDescription: "Mobile app for gym goers to track PRs, routines, and rest timers. Built with offline-first architecture using WatermelonDB.",
        image: "/images/fallonava-display.png",
        link: "https://github.com/Fallonava",
        tech: ["React Native", "WatermelonDB", "Reanimated"],
        color: "pink"
    }
];

export const PROJECT_CATEGORIES = ["All", "Web", "Mobile", "UI/UX", "System"];

export const testimonials: TestimonialItem[] = [
    {
        id: 0,
        name: "Sarah Chen",
        designation: "Product Manager @ TechFlow",
        content: (
            <>
                <p className="mb-4 text-black">
                    The dashboard Fallonava built for us <Highlight>transformed our workflow</Highlight>.
                    The attention to detail and performance optimization is simply outstanding.
                </p>
            </>
        ),
    },
    {
        id: 1,
        name: "Michael Ross",
        designation: "Director @ HealthPlus",
        content: (
            <>
                <p className="mb-4 text-black">
                    I was impressed by the <Highlight>modern aesthetic</Highlight> and intuitive UX.
                    Highly recommended for anyone looking for premium web development.
                </p>
            </>
        ),
    },
    {
        id: 2,
        name: "Elena Rodriguez",
        designation: "Founder @ ArtDisplay",
        content: (
            <>
                <p className="mb-4 text-black">
                    The digital display solution is <Highlight>beautiful and reliable</Highlight>.
                    It runs 24/7 without a hitch and looks amazing on our 4K screens.
                </p>
            </>
        ),
    },
];
