'use client';

import { motion, AnimatePresence, Transition } from 'framer-motion';

interface RotatingTextProps {
    texts: string[];
    transition?: Transition;
    initial?: any;
    animate?: any;
    exit?: any;
    animatePresenceMode?: "sync" | "wait" | "popLayout";
    animatePresenceInitial?: boolean;
    rotationInterval?: number;
    staggerDuration?: number;
    staggerFrom?: "first" | "last" | "center" | "random" | number;
    loop?: boolean;
    auto?: boolean;
    splitBy?: "characters" | "words" | "lines" | string;
    onNext?: (index: number) => void;
    mainClassName?: string;
    splitLevelClassName?: string;
    elementLevelClassName?: string;
}

import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

export const RotatingText = forwardRef<any, RotatingTextProps>((props, ref) => {
    const {
        texts,
        transition = { type: "spring", damping: 25, stiffness: 300 },
        initial = { y: "100%", opacity: 0 },
        animate = { y: 0, opacity: 1 },
        exit = { y: "-120%", opacity: 0 },
        animatePresenceMode = "wait",
        animatePresenceInitial = false,
        rotationInterval = 2000,
        staggerDuration = 0,
        staggerFrom = "first",
        loop = true,
        auto = true,
        splitBy = "characters",
        onNext,
        mainClassName,
        splitLevelClassName,
        elementLevelClassName,
        ...rest
    } = props;

    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    const splitElements = (text: string) => {
        const split = text.split(splitBy === "characters" ? "" : splitBy === "words" ? " " : splitBy);
        return split;
    };

    useEffect(() => {
        if (!auto) return;
        const intervalId = setInterval(() => {
            setCurrentTextIndex((prevIndex) => {
                const next = prevIndex === texts.length - 1 ? (loop ? 0 : prevIndex) : prevIndex + 1;
                if (onNext && next !== prevIndex) onNext(next);
                return next;
            });
        }, rotationInterval);
        return () => clearInterval(intervalId);
    }, [auto, rotationInterval, texts.length, loop, onNext]);

    useImperativeHandle(ref, () => ({
        next: () => {
            setCurrentTextIndex((prevIndex) => {
                const next = prevIndex === texts.length - 1 ? (loop ? 0 : prevIndex) : prevIndex + 1;
                if (onNext && next !== prevIndex) onNext(next);
                return next;
            });
        },
        previous: () => {
            setCurrentTextIndex((prevIndex) => {
                const next = prevIndex === 0 ? (loop ? texts.length - 1 : prevIndex) : prevIndex - 1;
                if (onNext && next !== prevIndex) onNext(next);
                return next;
            });
        },
        jumpTo: (index: number) => {
            const next = Math.max(0, Math.min(index, texts.length - 1));
            setCurrentTextIndex(next);
            if (onNext && next !== currentTextIndex) onNext(next);
        },
        reset: () => setCurrentTextIndex(0),
    }));

    const elements = splitElements(texts[currentTextIndex]);

    return (
        <div className={`flex flex-wrap whitespace-pre-wrap relative overflow-hidden ${mainClassName}`} {...rest}>
            <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
                <motion.div
                    key={currentTextIndex}
                    className={`flex flex-wrap whitespace-pre-wrap relative ${splitLevelClassName}`}
                    layout
                >
                    {elements.map((word, index) => (
                        <motion.span
                            key={index}
                            initial={initial}
                            animate={animate}
                            exit={exit}
                            transition={{
                                ...transition,
                                delay: typeof staggerDuration === 'number' ? staggerDuration * index : 0
                            }}
                            className={`inline-block ${elementLevelClassName}`}
                        >
                            {word}
                            {splitBy === "words" && index < elements.length - 1 && "\u00A0"}
                        </motion.span>
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    );
});

RotatingText.displayName = "RotatingText";
