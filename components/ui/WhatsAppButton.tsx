'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

export function WhatsAppButton() {
    const [isHovered, setIsHovered] = useState(false);
    const phoneNumber = "6282136357362";
    const message = "Hello Fallonava! I would like to discuss a project.";
    const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] flex items-center gap-4">
            {/* Tooltip */}
            <motion.div
                initial={{ opacity: 0, x: 20, pointerEvents: 'none' }}
                animate={{ 
                    opacity: isHovered ? 1 : 0, 
                    x: isHovered ? 0 : 20,
                    pointerEvents: isHovered ? 'auto' : 'none'
                }}
                className="hidden md:flex items-center justify-center px-4 py-2 bg-card text-card-foreground font-black text-sm uppercase brutal-border brutal-shadow-sm whitespace-nowrap"
            >
                Let's Talk!
            </motion.div>

            {/* Button */}
            <motion.a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                className="relative group flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-black rounded-full border-[3px] border-border brutal-shadow cursor-pointer transition-colors"
                aria-label="Chat on WhatsApp"
            >
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                    className="absolute inset-0 bg-[#25D366] rounded-full opacity-40 -z-10"
                />
                <MessageCircle size={32} strokeWidth={2.5} />
            </motion.a>
        </div>
    );
}
