import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SUBJECTS } from "@/content/subjects";
import {
  Sparkles,
  Calculator,
  FlaskConical,
  Leaf,
  Palette,
  Code2,
  Globe2,
  BookOpen,
  Wrench,
  ArrowRight,
  Clock,
  Compass,
  ArrowLeft,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  Calculator,
  FlaskConical,
  Leaf,
  Palette,
  Code2,
  Globe2,
  BookOpen,
  Wrench,
};

interface SubjectPageProps {
  params: {
    subject: string;
  };
}

// Generate static params for all 9 subjects
export function generateStaticParams() {
  return SUBJECTS.map((s) => ({
    subject: s.slug,
  }));
}

export default function SubjectDetailPage({ params }: SubjectPageProps) {
  const subjectSlug = params.subject.toLowerCase();
  const subject = SUBJECTS.find(
    (s) => s.slug.toLowerCase() === subjectSlug || s.id.toLowerCase() === subjectSlug
  );

  // If subject not found, render friendly empty state
  if (!subject) {
    return (
      <div className="flex flex-col min-h-screen bg-lumi-bg">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center p-6 text-center">
          <div className="max-w-md p-8 rounded-4xl bg-lumi-surface border border-lumi-border shadow-card">
            <div className="w-16 h-16 rounded-3xl bg-lumi-lavender text-lumi-violet flex items-center justify-center mx-auto mb-4">
              <Compass className="w-8 h-8 animate-spin" />
            </div>
            <h1 className="text-2xl font-extrabold text-lumi-text mb-2">Subject Not Found</h1>
            <p className="text-sm text-lumi-muted mb-6">
              We couldn't locate this subject workshop. Explore our 9 core disciplines below!
            </p>
            <PrimaryButton href="/subjects" variant="primary" size="md">
              Browse All Subjects
            </PrimaryButton>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const IconComponent = iconMap[subject.iconName] || Sparkles;

  // Group topics by level
  const beginnerTopics = subject.sampleTopics.filter((t) => t.level === "beginner");
  const intermediateTopics = subject.sampleTopics.filter((t) => t.level === "intermediate");
  const advancedTopics = subject.sampleTopics.filter((t) => t.level === "advanced");

  return (
    <div className="flex flex-col min-h-screen bg-lumi-bg">
      <SiteHeader />

      <main className="flex-1 pb-24">
        {/* Subject Header Banner */}
        <section className="pt-10 pb-16 border-b border-lumi-border bg-gradient-to-b from-lumi-surface to-lumi-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back breadcrumb */}
            <Link
              href="/subjects"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-lumi-muted hover:text-lumi-violet mb-6 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Subjects</span>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
                  style={{ backgroundColor: subject.badgeBg, color: subject.accentColor }}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{subject.name} Exploration Hub</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-lumi-text tracking-tight mb-4">
                  {subject.name}
                </h1>

                <p className="text-base sm:text-lg text-lumi-muted leading-relaxed font-normal max-w-2xl mb-8">
                  {subject.overview}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <PrimaryButton
                    href={`/learn?question=${encodeURIComponent(
                      subject.sampleQuestions[0]?.question || subject.sampleTopics[0]?.featuredQuestion || "Explore"
                    )}`}
                    size="lg"
                    variant="primary"
                    icon={<ArrowRight className="w-5 h-5" />}
                  >
                    Start Exploring First Topic
                  </PrimaryButton>
                  <span className="text-xs font-bold text-lumi-muted">
                    {subject.sampleTopics.length} Interactive Topics Available
                  </span>
                </div>
              </div>

              {/* Thematic Visual Badge */}
              <div className="lg:col-span-4 flex justify-center lg:justify-end">
                <div
                  className="w-40 h-40 sm:w-48 sm:h-48 rounded-4xl flex items-center justify-center text-white shadow-float relative group"
                  style={{ backgroundColor: subject.accentColor }}
                >
                  <IconComponent className="w-20 h-20 sm:w-24 sm:h-24 transition-transform duration-300 group-hover:scale-110" strokeWidth={2} />
                  <div className="absolute -bottom-3 -right-3 px-3 py-1.5 rounded-xl bg-lumi-surface border border-lumi-border shadow-sm text-xs font-bold text-lumi-text flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-lumi-violet" />
                    <span>Lumi6 Certified Lab</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Topics by Level */}
        <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-lumi-violet px-3 py-1 rounded-full bg-lumi-lavender inline-block mb-1">
                Level Pathways
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-lumi-text">
                Suggested Topics & Experiments
              </h2>
            </div>
          </div>

          <div className="space-y-12">
            {/* Beginner Section */}
            {beginnerTopics.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800">
                    Level 1: Beginner
                  </span>
                  <span className="text-xs text-lumi-muted">
                    Great for starting out and building foundational intuition
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {beginnerTopics.map((topic) => (
                    <div
                      key={topic.id}
                      className="p-6 rounded-3xl bg-lumi-surface border border-lumi-border shadow-subtle hover:shadow-card transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs text-lumi-muted mb-2 font-semibold">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-lumi-violet" />
                            <span>{topic.estimatedMinutes} mins</span>
                          </span>
                          <span className="capitalize">{topic.level}</span>
                        </div>
                        <h3 className="text-lg font-bold text-lumi-text mb-2">
                          {topic.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-lumi-muted leading-relaxed mb-4">
                          {topic.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-lumi-border/60 flex items-center justify-between">
                        <span className="text-xs font-semibold text-lumi-muted italic truncate max-w-[200px]">
                          "{topic.featuredQuestion}"
                        </span>
                        <Link
                          href={`/learn?question=${encodeURIComponent(topic.featuredQuestion)}`}
                          className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-lumi-violet hover:underline shrink-0"
                        >
                          <span>Launch</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Intermediate Section */}
            {intermediateTopics.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-lg text-xs font-bold bg-blue-100 text-blue-800">
                    Level 2: Intermediate
                  </span>
                  <span className="text-xs text-lumi-muted">
                    Connecting variables and observing multi-step cause-and-effect
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {intermediateTopics.map((topic) => (
                    <div
                      key={topic.id}
                      className="p-6 rounded-3xl bg-lumi-surface border border-lumi-border shadow-subtle hover:shadow-card transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs text-lumi-muted mb-2 font-semibold">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-lumi-violet" />
                            <span>{topic.estimatedMinutes} mins</span>
                          </span>
                          <span className="capitalize">{topic.level}</span>
                        </div>
                        <h3 className="text-lg font-bold text-lumi-text mb-2">
                          {topic.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-lumi-muted leading-relaxed mb-4">
                          {topic.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-lumi-border/60 flex items-center justify-between">
                        <span className="text-xs font-semibold text-lumi-muted italic truncate max-w-[200px]">
                          "{topic.featuredQuestion}"
                        </span>
                        <Link
                          href={`/learn?question=${encodeURIComponent(topic.featuredQuestion)}`}
                          className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-lumi-violet hover:underline shrink-0"
                        >
                          <span>Launch</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Advanced Section */}
            {advancedTopics.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-lg text-xs font-bold bg-purple-100 text-purple-800">
                    Level 3: Advanced Deep Dive
                  </span>
                  <span className="text-xs text-lumi-muted">
                    Testing edge cases and discovering universal principles
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {advancedTopics.map((topic) => (
                    <div
                      key={topic.id}
                      className="p-6 rounded-3xl bg-lumi-surface border border-lumi-border shadow-subtle hover:shadow-card transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs text-lumi-muted mb-2 font-semibold">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-lumi-violet" />
                            <span>{topic.estimatedMinutes} mins</span>
                          </span>
                          <span className="capitalize">{topic.level}</span>
                        </div>
                        <h3 className="text-lg font-bold text-lumi-text mb-2">
                          {topic.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-lumi-muted leading-relaxed mb-4">
                          {topic.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-lumi-border/60 flex items-center justify-between">
                        <span className="text-xs font-semibold text-lumi-muted italic truncate max-w-[200px]">
                          "{topic.featuredQuestion}"
                        </span>
                        <Link
                          href={`/learn?question=${encodeURIComponent(topic.featuredQuestion)}`}
                          className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-lumi-violet hover:underline shrink-0"
                        >
                          <span>Launch</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Instant Question Tiles for this subject */}
        {subject.sampleQuestions.length > 0 && (
          <section className="mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 border-t border-lumi-border">
            <h2 className="text-xl sm:text-2xl font-extrabold text-lumi-text mb-6">
              Popular Questions in {subject.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {subject.sampleQuestions.map((q) => (
                <Link
                  key={q.id}
                  href={`/learn?question=${encodeURIComponent(q.question)}`}
                  className="p-5 rounded-2xl bg-lumi-surface border border-lumi-border hover:border-lumi-violet shadow-subtle hover:shadow-card transition-all flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-lumi-violet px-2.5 py-0.5 rounded-md bg-lumi-lavender mb-2 inline-block">
                      {q.topic}
                    </span>
                    <h3 className="text-base font-bold text-lumi-text group-hover:text-lumi-violet transition-colors">
                      {q.question}
                    </h3>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs font-bold text-lumi-violet">
                    <span>Investigate</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
