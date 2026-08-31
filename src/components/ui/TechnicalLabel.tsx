import type { ComponentPropsWithRef, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type TechnicalLabelProps = ComponentPropsWithRef<"span"> & { children: ReactNode };

export default function TechnicalLabel({ children, className, ref, ...props }: TechnicalLabelProps) {
  return (
    <span
      ref={ref}
      className={cn(
        "font-mono-tech inline-flex items-center gap-1.5 rounded-full border border-card-border bg-card/80 px-3 py-1 text-xs tracking-wide text-bright-green",
        className
      )}
      {...props}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-bright-green shadow-[0_0_8px_rgba(69,245,140,0.9)]" />
      {children}
    </span>
  );
}
