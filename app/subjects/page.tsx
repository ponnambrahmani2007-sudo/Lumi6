import React from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SubjectCard } from "@/components/cards/SubjectCard";
import { QuestionCard } from "@/components/cards/QuestionCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SUBJECTS, CURIOSITY_SHOWCASE } from "@/content/subjects";
import { Sparkles, Compass, BookOpen, ArrowRight } from "lucide-react";

export default function SubjectsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-lumi-bg">
      <SiteHeader />

      <main className="flex-1 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <SectionHeading
            eyebrow="Curriculum Directory"
            title="Explore All 9 Learning Disciplines"
            subtitle="Choose a subject to dive into bite-sized topics, hands-on micro-worlds, and interactive investigations."
          />

          {/* Grid of all 9 subjects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {SUBJECTS.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
          </div>

          {/* Quick Questions Showcase Section */}
          <div className="mt-16 pt-16 border-t border-lumi-border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-lumi-violet px-3 py-1 rounded-full bg-lumi-lavender inline-block mb-2">
                  Instant Inquiry
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-lumi-text">
                  Jump into a Curious Question
                </h2>
              </div>

              <PrimaryButton
                href="/learn"
                size="sm"
                variant="primary"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Open Studio
              </PrimaryButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CURIOSITY_SHOWCASE.slice(0, 3).map((item) => (
                <QuestionCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
