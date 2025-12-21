import React from 'react';

export const NextJsIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <mask id="mask0_408_134" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
            <circle cx="90" cy="90" r="90" fill="black" />
        </mask>
        <g mask="url(#mask0_408_134)">
            <circle cx="90" cy="90" r="90" fill="currentColor" />
            <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0_linear_408_134)" />
            <rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear_408_134)" />
        </g>
        <defs>
            <linearGradient id="paint0_linear_408_134" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="paint1_linear_408_134" x1="121" y1="54" x2="120.791" y2="75.5087" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
        </defs>
    </svg>
);

export const ReactIcon = ({ className }: { className?: string }) => (
    <svg viewBox="-10.5 -9.45 21 18.9" xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor">
        <circle cx="0" cy="0" r="2" fill="currentColor"></circle>
        <g stroke="currentColor" strokeWidth="1" fill="none">
            <ellipse rx="10" ry="4.5"></ellipse>
            <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
            <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
        </g>
    </svg>
);

export const TailwindIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor">
        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
    </svg>
);

export const TypeScriptIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor">
        <path d="M1.5,63.91C1.5,29.46,29.46,1.5,63.91,1.5S126.33,29.46,126.33,63.91S98.37,126.33,63.91,126.33,1.5,98.37,1.5,63.91ZM111.41,75.12h-11.75V70c0-6.19-1.92-9.69-9.5-9.69-5.91,0-8.8,2.78-8.8,6.88,0,4.86,4,6.86,10.74,9.26s12.8,5.82,12.8,15.24c0,11.33-8.87,17.43-19.94,17.43-12.63,0-20.4-6.42-20.4-18.72h11.23v3.74c0,6.58,2.83,9.08,9.09,9.08s8.91-2.63,8.91-7.46c0-5.18-4-7.53-11.45-10.08s-12.08-5.34-12.08-14.43c0-10.86,8.87-16.71,19.92-16.71,11,0,18.06,5.08,19.16,16.59h-0.12V75.12ZM68.14,40.16V51.33H51.52v56.46H40.29V51.33H23.58V40.16H68.14Z" />
    </svg>
);

export const NodeJsIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor">
        <path d="M64,8.5L111,35V82.5L64,109L17,82.5V35L64,8.5Z M64,45 L 85,32 L 64,20 L 43,32 L 64,45 Z M 43,58 L 22,46 V 73 L 43,85 V 58 Z M 64,98 L 85,85 V 58 L 64,70 L 43,58 V 85 L 64,98 Z" />
    </svg>
); // Simplified Hexagon look as abstract Node

export const FramerIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor">
        <path d="M4 0h16v8h-8zM4 12V8h8l8 8h-8zM4 12l8 8v4z" />
    </svg>
);

export const FigmaIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 38 57" xmlns="http://www.w3.org/2000/svg" className={className} fill="none">
        <path d="M19 28.5C19 28.5 19 19 28.5 19C38 19 38 28.5 38 28.5C38 28.5 38 38 28.5 38C19 38 19 28.5 19 28.5Z" fill="#1ABCFE" />
        <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5V57H9.5C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
        <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
        <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
        <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
    </svg>
);

export const GitIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor">
        <path d="M15.618 17.038l-4.072-4.072v-5.26a2.91 2.91 0 10-1.455 0v5.863l4.336 4.336a1.03 1.03 0 101.456-1.456l-0.265-0.265zM2.518,17.206L10.724,25.41a2.91,2.91,0,0,0,4.116,0l8.206-8.206a2.91,2.91,0,0,0,0-4.116L14.84,4.882a2.91,2.91,0,0,0-4.116,0L2.518,13.088A2.91,2.91,0,0,0,2.518,17.206ZM11.452,5.59a1.455,1.455,0,0,1,2.058,0l8.206,8.206a1.455,1.455,0,0,1,0,2.058l-8.206,8.206a1.455,1.455,0,0,1-2.058,0L3.246,15.854a1.455,1.455,0,0,1,0-2.058Z" />
    </svg>
);
