import React from "react";
import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { Sparkles, ShieldCheck, Heart, Compass } from "lucide-react";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  const exploreLinks = [
    { label: "All Subjects", href: "/subjects" },
    { label: "Science & Physics", href: "/subjects/science" },
    { label: "Mathematics", href: "/subjects/mathematics" },
    { label: "Coding & Logic", href: "/subjects/coding" },
    { label: "Earth & Environment", href: "/subjects/earth" },
  ];

  const platformLinks = [
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Curiosity Studio", href: "/learn" },
    { label: "Parent Guide", href: "/parents" },
    { label: "Child Privacy Pledge", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
  ];

  return (
    <footer className="bg-lumi-surface border-t border-lumi-border mt-20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-lumi-border">
          {/* Brand & Mission Column */}
          <div className="md:col-span-2 flex flex-col items-start pr-0 md:pr-8">
            <Logo size="md" className="mb-4" />
            <p className="text-lumi-muted text-base leading-relaxed max-w-md mb-6 font-normal">
              Lumi6 is an interactive, multi-subject learning environment designed for children aged 8–12. We empower curious minds to think independently, explore visual models, and discover how the world works without fear of judgment.
            </p>
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-lumi-mint/50 border border-lumi-mint text-lumi-text text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-lumi-success shrink-0" />
              <span>Zero advertisements • Zero behavioral tracking • Made for safe exploration</span>
            </div>
          </div>

          {/* Subjects Navigation */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-lumi-text mb-4 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-lumi-violet" />
              <span>Explore Subjects</span>
            </h3>
            <ul className="space-y-2.5">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-lumi-muted hover:text-lumi-violet transition-colors font-medium inline-block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform & Trust Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-lumi-text mb-4 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-lumi-violet" />
              <span>Learning Platform</span>
            </h3>
            <ul className="space-y-2.5">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-lumi-muted hover:text-lumi-violet transition-colors font-medium inline-block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-lumi-muted font-medium">
          <p>© {currentYear} Lumi6. Built with curiosity for independent thinkers everywhere.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-lumi-violet transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-lumi-violet transition-colors">
              Terms of Use
            </Link>
            <Link href="/parents" className="hover:text-lumi-violet transition-colors">
              Grown-ups Area
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
