import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export function Card({ children, className, hoverEffect = true, ...props }: CardProps) {
    return (
        <div
            className={cn(
                "rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden p-6",
                hoverEffect && "transition-all duration-300 hover:bg-white/10 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
