import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "secondary" | "subtle" | "outline" | "mint" | "yellow";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
  className?: string;
}

export function PrimaryButton({
  href,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  children,
  className,
  disabled,
  ...props
}: PrimaryButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-bold tracking-tight rounded-2xl transition-all duration-200 active:scale-[0.98] select-none text-center cursor-pointer disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100";

  const sizeStyles = {
    sm: "px-4 py-2 text-sm min-h-[40px] gap-1.5",
    md: "px-6 py-3 text-base min-h-[48px] gap-2",
    lg: "px-8 py-4 text-lg min-h-[56px] gap-2.5 shadow-md",
  };

  const variantStyles = {
    primary:
      "bg-lumi-violet text-white hover:bg-lumi-deep shadow-subtle hover:shadow-float",
    secondary:
      "bg-lumi-lavender text-lumi-deep hover:bg-[#E5DEFF] border border-lumi-violet/20",
    subtle:
      "bg-lumi-surface text-lumi-text hover:bg-lumi-lavender/40 border border-lumi-border",
    outline:
      "bg-transparent text-lumi-text border-2 border-lumi-border hover:border-lumi-violet hover:text-lumi-violet",
    mint:
      "bg-lumi-mint text-lumi-text hover:bg-[#B6EED8] border border-lumi-mint",
    yellow:
      "bg-lumi-yellow text-lumi-text hover:bg-[#FCD04B] shadow-subtle",
  };

  const combinedClasses = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="inline-flex shrink-0">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedClasses} aria-disabled={disabled}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} disabled={disabled} {...props}>
      {content}
    </button>
  );
}
