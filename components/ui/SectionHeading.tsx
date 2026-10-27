import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
  eyebrowColor?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
  eyebrowColor = "bg-lumi-lavender text-lumi-deep",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col mb-10 md:mb-14",
        isCenter ? "items-center text-center max-w-3xl mx-auto" : "items-start text-left max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "text-xs md:text-sm font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3.5 inline-block",
            eyebrowColor
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-lumi-text tracking-tight leading-[1.15]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3.5 md:mt-4 text-base md:text-lg text-lumi-muted leading-relaxed font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
}
