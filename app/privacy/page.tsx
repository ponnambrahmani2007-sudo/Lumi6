import React from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ShieldCheck, Lock, Heart, CheckCircle2, ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
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
            eyebrow="Child Safety & Privacy"
            title="Our Plain-English Privacy Commitment"
            subtitle="We believe learning spaces for children should be safe, private, and free from corporate surveillance."
            align="left"
          />

          {/* Child-Friendly Summary Box */}
          <div className="p-6 sm:p-8 rounded-4xl bg-lumi-lavender/60 border-2 border-lumi-violet/30 shadow-subtle mb-10">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-6 h-6 text-lumi-violet shrink-0" />
              <h2 className="text-xl font-extrabold text-lumi-deep">
                Summary for Young Learners (Reading Level: Kid-Friendly)
              </h2>
            </div>
            <ul className="space-y-2.5 text-sm sm:text-base text-lumi-text font-medium">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                <span>We do not ask for your real name, home address, school, or phone number.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                <span>You will never see advertisements, pop-ups, or commercial sponsorships on Lumi6.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                <span>Your drawings and questions stay on your device unless you choose to export them.</span>
              </li>
            </ul>
          </div>

          {/* Detailed Guardian Disclosures */}
          <div className="p-8 sm:p-10 rounded-4xl bg-lumi-surface border border-lumi-border shadow-card space-y-8 text-sm sm:text-base text-lumi-text leading-relaxed font-normal">
            <div>
              <h3 className="text-lg font-bold text-lumi-text mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-lumi-violet" />
                <span>1. Minimal Data Collection Architecture</span>
              </h3>
              <p className="text-lumi-muted">
                Lumi6 operates on a strict data-minimization model. Children can explore, test simulations, sketch on the drawing canvas, and engage with the thinking companion anonymously. No user account or personally identifiable information (PII) is required for core learning.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-lumi-text mb-2 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-lumi-violet" />
                <span>2. Zero Third-Party Advertising & Tracking</span>
              </h3>
              <p className="text-lumi-muted">
                We do not sell data, partner with ad networks, or embed third-party advertising trackers. Our learning platform is built purely for educational empowerment, not algorithmic engagement monetization.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-lumi-text mb-2 flex items-center gap-2">
                <Heart className="w-4 h-4 text-lumi-violet" />
                <span>3. Local Storage & Guardian Control</span>
              </h3>
              <p className="text-lumi-muted">
                Drawings and activity parameters are saved locally within your browser's local storage and IndexedDB. Parents and guardians can clear this data at any time directly through their browser settings or our settings panel.
              </p>
            </div>

            <div className="pt-4 border-t border-lumi-border text-xs text-lumi-muted">
              <p>
                Questions or feedback regarding child safety? Contact our educational team at <span className="font-semibold text-lumi-text">safety@lumi6.org</span>.
              </p>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
