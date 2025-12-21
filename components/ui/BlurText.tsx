'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface BlurTextProps {
    text: string;
    delay?: number;
    className?: string;
    animate?: any;
    initial?: any;
    direction?: 'up' | 'down';
    threshold?: number;
    rootMargin?: string;
}

export function BlurText({
    text,
    delay = 0.2,
    className = '',
    animate,
    initial,
    direction = 'up',
    threshold = 0.1,
    rootMargin = '-100px',
}: BlurTextProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: threshold, margin: rootMargin as any });
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (isInView && !hasAnimated) {
            setHasAnimated(true);
        }
    }, [isInView, hasAnimated]);

    const defaultInitial = {
        filter: 'blur(10px)',
        opacity: 0,
        y: direction === 'up' ? 20 : -20,
    };

    const defaultAnimate = {
        filter: 'blur(0px)',
        opacity: 1,
        y: 0,
    };

    return (
        <motion.span
            ref={ref}
            initial={initial || defaultInitial}
            animate={hasAnimated ? (animate || defaultAnimate) : (initial || defaultInitial)}
            transition={{ duration: 0.8, delay, ease: "easeOut" }}
            className={`inline-block ${className}`}
        >
            {text}
        </motion.span>
    );
}
