"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles, BookOpen, Compass, HeartHandshake, ArrowRight } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Explore", href: "/subjects", icon: <Compass className="w-4 h-4" /> },
    { label: "Subjects", href: "/subjects", icon: <BookOpen className="w-4 h-4" /> },
    { label: "How It Works", href: "/#how-it-works", icon: <Sparkles className="w-4 h-4" /> },
    { label: "For Parents", href: "/parents", icon: <HeartHandshake className="w-4 h-4" /> },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-200 border-b",
        scrolled
          ? "bg-lumi-bg/95 backdrop-blur-md border-lumi-border shadow-subtle py-3"
          : "bg-lumi-bg border-transparent py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Logo size="md" />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors duration-150 flex items-center gap-1.5",
                  isActive
                    ? "text-lumi-violet bg-lumi-lavender"
                    : "text-lumi-text hover:text-lumi-violet hover:bg-lumi-lavender/50"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <PrimaryButton
            href="/learn"
            size="sm"
            variant="primary"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Start Exploring
          </PrimaryButton>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden inline-flex items-center justify-center p-2.5 rounded-xl text-lumi-text hover:bg-lumi-lavender focus-visible:ring-2 focus-visible:ring-lumi-violet transition-colors"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu with Accessible Animation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-lumi-border bg-lumi-surface/98 backdrop-blur-lg px-4 pt-4 pb-6 shadow-card animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-colors",
                    isActive
                      ? "bg-lumi-lavender text-lumi-deep"
                      : "text-lumi-text hover:bg-lumi-lavender/50"
                  )}
                >
                  <span className="text-lumi-violet">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              );
            })}
            <div className="pt-3 mt-2 border-t border-lumi-border">
              <PrimaryButton
                href="/learn"
                size="md"
                className="w-full justify-center"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Start Exploring
              </PrimaryButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
