'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface DecryptedTextProps {
    text: string;
    speed?: number;
    maxIterations?: number;
    sequential?: boolean;
    revealDirection?: 'start' | 'end' | 'center';
    useOriginalCharsOnly?: boolean;
    characters?: string;
    className?: string;
    parentClassName?: string;
    encryptedClassName?: string;
    animateOn?: 'view' | 'hover';
    [key: string]: any;
}

export default function DecryptedText({
    text,
    speed = 50,
    maxIterations = 10,
    sequential = false,
    revealDirection = 'start',
    useOriginalCharsOnly = false,
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+',
    className = '',
    parentClassName = '',
    encryptedClassName = '',
    animateOn = 'hover',
    ...props
}: DecryptedTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isHovering, setIsHovering] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const containerRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        let interval: any;
        let currentIteration = 0;

        const getNextChar = (char: string) => {
            if (useOriginalCharsOnly) {
                const index = Math.floor(Math.random() * text.length);
                return text[index];
            }
            const index = Math.floor(Math.random() * characters.length);
            return characters[index];
        };

        const runAnimation = () => {
            if (currentIteration >= maxIterations) {
                setDisplayText(text);
                clearInterval(interval);
                return;
            }

            setDisplayText(
                text
                    .split('')
                    .map((char, index) => {
                        if (char === ' ') return ' ';
                        if (currentIteration >= maxIterations) return char;

                        // Sequential reveal logic
                        if (sequential) {
                            const progress = currentIteration / maxIterations;
                            const charProgress =
                                revealDirection === 'start' ? index / text.length :
                                    revealDirection === 'end' ? (text.length - 1 - index) / text.length :
                                        Math.abs(index - text.length / 2) / (text.length / 2); // center

                            if (progress > charProgress) return char;
                        }

                        return getNextChar(char);
                    })
                    .join('')
            );

            currentIteration++;
        };

        if ((animateOn === 'hover' && isHovering) || (animateOn === 'view' && isScrolled)) {
            interval = setInterval(runAnimation, speed);
        } else {
            setDisplayText(text); // reset
        }

        return () => clearInterval(interval);
    }, [isHovering, isScrolled, text, speed, maxIterations, sequential, revealDirection, characters, useOriginalCharsOnly, animateOn]);

    useEffect(() => {
        if (animateOn !== 'view') return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsScrolled(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [animateOn]);

    return (
        <span
            ref={containerRef}
            className={`inline-block whitespace-nowrap ${parentClassName}`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            {...props}
        >
            <span className={className}>{displayText}</span>
        </span>
    );
}
