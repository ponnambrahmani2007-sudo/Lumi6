import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  href?: string;
}

export function Logo({ className = "", size = "md", href = "/" }: LogoProps) {
  const iconSizes = {
    sm: "w-5 h-5",
    md: "w-7 h-7",
    lg: "w-9 h-9",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  const badgeSizes = {
    sm: "text-xs px-1.5 py-0.5",
    md: "text-xs px-2 py-0.5",
    lg: "text-sm px-2.5 py-1",
  };

  const content = (
    <div className={`inline-flex items-center gap-2 group cursor-pointer ${className}`}>
      {/* Radiant Spark Icon */}
      <div className="relative flex items-center justify-center rounded-2xl bg-gradient-to-tr from-lumi-violet to-lumi-deep text-white p-1.5 shadow-sm group-hover:scale-105 transition-transform duration-200">
        <Sparkles className={`${iconSizes[size]} text-lumi-yellow animate-pulse`} strokeWidth={2.5} />
      </div>

      {/* Brand Text */}
      <div className="flex items-center">
        <span className={`font-extrabold tracking-tight text-lumi-text ${textSizes[size]}`}>
          Lumi
        </span>
        <span className={`font-extrabold tracking-tight text-lumi-violet ${textSizes[size]}`}>
          6
        </span>
        <span className={`ml-2 font-semibold uppercase tracking-wider rounded-full bg-lumi-lavender text-lumi-deep font-sans ${badgeSizes[size]}`}>
          Explore
        </span>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} aria-label="Lumi6 - Home" className="focus-visible:rounded-xl">
        {content}
      </Link>
    );
  }

  return content;
}
