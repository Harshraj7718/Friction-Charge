import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
  /** Override the default display-scale sizing — useful for longer, sentence-length titles. */
  titleClassName?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  as: Tag = "h2",
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p data-reveal className="font-mono-tech mb-4 text-xs uppercase tracking-[0.2em] text-bright-green">
          {eyebrow}
        </p>
      )}
      <Tag
        data-reveal
        data-split-text
        className={cn("font-display text-4xl leading-[1.1] font-medium text-balance sm:text-5xl lg:text-6xl", titleClassName)}
      >
        {title}
      </Tag>
      {description && (
        <p data-reveal className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
