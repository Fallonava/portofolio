'use client';

import { ReactNode, useEffect, useState } from 'react';
import Lenis from 'lenis';
import { useAnimationFrame } from 'framer-motion';

export function SmoothScroll({ children }: { children: ReactNode }) {
    const [lenis, setLenis] = useState<Lenis | null>(null);

    useEffect(() => {
        const lenisInstance = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        setLenis(lenisInstance);

        return () => {
            lenisInstance.destroy();
            setLenis(null);
        };
    }, []);

    useAnimationFrame((time) => {
        if (lenis) {
            lenis.raf(time);
        }
    });

    return <>{children}</>;
}
