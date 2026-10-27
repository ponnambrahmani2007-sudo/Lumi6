import React from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  HeartHandshake,
  ShieldCheck,
  BrainCircuit,
  MessageCircle,
  Lightbulb,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  HelpCircle,
} from "lucide-react";

export default function ParentsPage() {
  const conversationStarters = [
    {
      question: "What surprised you in your experiment today?",
      reason: "Focuses on unexpected outcomes rather than right-or-wrong scores.",
    },
    {
      question: "How did your prediction compare to what really happened?",
      reason: "Helps children see hypotheses as tools for discovery without fear of error.",
    },
    {
      question: "If you changed one more variable, what do you think would happen?",
      reason: "Encourages lateral curiosity and independent extension.",
    },
    {
      question: "Can you show me the sketch you drew in your studio notebook?",
      reason: "Celebrates creative self-expression alongside scientific thinking.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-lumi-bg">
      <SiteHeader />

      <main className="flex-1 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <SectionHeading
            eyebrow="Grown-ups & Educators Guide"
            title="A calm, thoughtful space for young minds to flourish"
            subtitle="Understand our philosophy of active inquiry, safe screen time, and non-judgmental learning for children aged 8–12."
          />

          {/* Core Commitments */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="p-8 rounded-4xl bg-lumi-surface border border-lumi-border shadow-subtle flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-lumi-lavender text-lumi-deep flex items-center justify-center mb-5">
                  <BrainCircuit className="w-6 h-6 text-lumi-violet" />
                </div>
                <h3 className="text-xl font-bold text-lumi-text mb-3">
                  Thinking Over Memorizing
                </h3>
                <p className="text-sm text-lumi-muted leading-relaxed font-normal">
                  Children don't learn deep science by watching someone else lecture on video. Lumi6 provides hands-on visual micro-worlds where children make predictions and test variables directly.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-lumi-border/60 text-xs font-bold text-lumi-violet">
                First-Principles Learning
              </div>
            </div>

            <div className="p-8 rounded-4xl bg-lumi-surface border border-lumi-border shadow-subtle flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-lumi-mint text-emerald-800 flex items-center justify-center mb-5">
                  <ShieldCheck className="w-6 h-6 text-emerald-700" />
                </div>
                <h3 className="text-xl font-bold text-lumi-text mb-3">
                  Zero Judgment or Failure Anxiety
                </h3>
                <p className="text-sm text-lumi-muted leading-relaxed font-normal">
                  Traditional quizzes trigger test anxiety. In Lumi6, there are no red buzzers or negative score deductions. A prediction that differs from the outcome is treated as an exciting moment to observe why.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-lumi-border/60 text-xs font-bold text-emerald-700">
                Psychological Safety
              </div>
            </div>

            <div className="p-8 rounded-4xl bg-lumi-surface border border-lumi-border shadow-subtle flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-5">
                  <Lightbulb className="w-6 h-6 text-amber-700" />
                </div>
                <h3 className="text-xl font-bold text-lumi-text mb-3">
                  Absolute Privacy & No Ads
                </h3>
                <p className="text-sm text-lumi-muted leading-relaxed font-normal">
                  No advertising, no third-party tracking cookies, and no personal data collection. Children explore anonymously, and discoveries persist securely in the browser.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-lumi-border/60 text-xs font-bold text-amber-700">
                Child-First Ethics
              </div>
            </div>
          </div>

          {/* Conversation Starters for Parents */}
          <div className="p-8 sm:p-12 rounded-4xl bg-lumi-surface border border-lumi-border shadow-card mb-16">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-lumi-violet px-3 py-1 rounded-full bg-lumi-lavender inline-block mb-3">
                At The Dinner Table
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-lumi-text">
                Offline Conversation Starters
              </h2>
              <p className="text-sm text-lumi-muted mt-2 leading-relaxed">
                Extend what your child explores on Lumi6 into meaningful family discussions without interrogating them.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {conversationStarters.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-3xl bg-lumi-bg border border-lumi-border flex flex-col justify-between"
                >
                  <p className="text-base font-bold text-lumi-text mb-2">
                    "{item.question}"
                  </p>
                  <p className="text-xs text-lumi-muted leading-relaxed font-normal">
                    <strong>Why this works:</strong> {item.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to action */}
          <div className="text-center max-w-xl mx-auto">
            <h3 className="text-2xl font-extrabold text-lumi-text mb-3">
              Experience the studio together
            </h3>
            <p className="text-sm text-lumi-muted mb-6">
              Try an interactive science or math lab with your child and see their curiosity ignite.
            </p>
            <PrimaryButton
              href="/learn"
              size="lg"
              variant="primary"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Open Curiosity Studio
            </PrimaryButton>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
