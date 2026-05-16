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
                "bg-white brutal-border p-6",
                hoverEffect && "brutal-hover brutal-shadow-sm",
                !hoverEffect && "brutal-shadow",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
