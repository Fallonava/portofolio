'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    maxKey?: number; // Maximum rotation in degrees
    scale?: number; // Scale on hover
    damp?: boolean; // Whether to use spring damping
}

export const TiltCard = ({
    children,
    className = '',
    maxKey = 15,
    scale = 1.05,
    damp = true,
}: TiltCardProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [maxKey, -maxKey]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-maxKey, maxKey]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseXPos = e.clientX - rect.left;
        const mouseYPos = e.clientY - rect.top;

        const xPct = mouseXPos / width - 0.5;
        const yPct = mouseYPos / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX: damp ? rotateX : useTransform(y, [-0.5, 0.5], [maxKey, -maxKey]),
                rotateY: damp ? rotateY : useTransform(x, [-0.5, 0.5], [-maxKey, maxKey]),
                transformStyle: 'preserve-3d',
            }}
            whileHover={{ scale }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`relative transform-gpu ${className}`}
        >
            <div style={{ transform: "translateZ(50px)" }}>
                {children}
            </div>
        </motion.div>
    );
};
