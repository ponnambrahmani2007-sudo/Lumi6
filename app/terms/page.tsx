import React from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BookOpen, Sparkles, CheckCircle2, ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-lumi-bg">
      <SiteHeader />

      <main className="flex-1 py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-lumi-muted hover:text-lumi-violet mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>

          <SectionHeading
            eyebrow="Platform Guidelines"
            title="Terms of Use & Community Spirit"
            subtitle="Clear, friendly rules designed to maintain a safe, welcoming learning space for every child."
            align="left"
          />

          <div className="p-8 sm:p-10 rounded-4xl bg-lumi-surface border border-lumi-border shadow-card space-y-8 text-sm sm:text-base text-lumi-text leading-relaxed font-normal">
            <div>
              <h3 className="text-lg font-bold text-lumi-text mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-lumi-violet" />
                <span>1. Purpose of Lumi6</span>
              </h3>
              <p className="text-lumi-muted">
                Lumi6 is provided as an educational exploratory tool for children, families, and classrooms. It is intended to foster curiosity, scientific inquiry, mathematical thinking, and creative expression.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-lumi-text mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-lumi-violet" />
                <span>2. Safe and Encouraging Conduct</span>
              </h3>
              <p className="text-lumi-muted">
                Users are encouraged to explore freely, test unexpected ideas, and ask questions. Any attempt to compromise platform security, reverse-engineer proprietary models, or introduce harmful content is prohibited.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-lumi-text mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-lumi-violet" />
                <span>3. Educational Disclaimer</span>
              </h3>
              <p className="text-lumi-muted">
                The visual simulations, models, and interactive tools are simplified representations of real-world phenomena engineered for educational intuition. While grounded in real scientific and mathematical principles, they should not be used as technical engineering specifications for physical construction.
              </p>
            </div>

            <div className="pt-4 border-t border-lumi-border text-xs text-lumi-muted">
              <p>Last updated: October 2026. Lumi6 Educational Foundation.</p>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
