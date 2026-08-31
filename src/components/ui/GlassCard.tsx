import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  hover?: boolean;
};

export default function GlassCard({ children, className, hover = true, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass technical-border rounded-2xl p-6 transition-all duration-300",
        hover && "hover:-translate-y-1 hover:border-bright-green/40 hover:shadow-[0_0_40px_rgba(69,245,140,0.12)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
