import React from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SubjectCard } from "@/components/cards/SubjectCard";
import { QuestionCard } from "@/components/cards/QuestionCard";
import { RainbowExperimentPreview } from "@/components/landing/RainbowExperimentPreview";
import { SUBJECTS, CURIOSITY_SHOWCASE } from "@/content/subjects";
import {
  Sparkles,
  ArrowRight,
  HelpCircle,
  Lightbulb,
  Compass,
  MessageCircle,
  FlaskConical,
  CheckCircle2,
  ShieldCheck,
  BrainCircuit,
  Eye,
  HeartHandshake,
} from "lucide-react";

export default function HomePage() {
  const learningSteps = [
    {
      number: "01",
      title: "Ask a Question",
      description:
        "Every big idea starts with curiosity. Ask about rainbows, black holes, robot codes, or fraction slices without fear of sounding silly.",
      icon: <HelpCircle className="w-6 h-6 text-lumi-violet" />,
      color: "bg-lumi-lavender",
    },
    {
      number: "02",
      title: "Make a Prediction",
      description:
        "What do you think will happen? Guess freely! In Lumi6, hypotheses are never penalized—errors are just stepping stones to understanding.",
      icon: <Eye className="w-6 h-6 text-lumi-deep" />,
      color: "bg-amber-100",
    },
    {
      number: "03",
      title: "Explore and Experiment",
      description:
        "Slide dials, connect circuit wires, stretch shapes, and test forces in real time. See cause-and-effect happen right before your eyes.",
      icon: <FlaskConical className="w-6 h-6 text-emerald-600" />,
      color: "bg-lumi-mint",
    },
    {
      number: "04",
      title: "Explain What You Discovered",
      description:
        "Draw your mental model on the canvas, unlock progressive clues, and save your personal Discovery Card to review anytime.",
      icon: <Lightbulb className="w-6 h-6 text-amber-600" />,
      color: "bg-orange-100",
    },
  ];

  const companionPrompts = [
    {
      prompt: "What do you notice?",
      context: "Encourages careful observation before jumping to conclusions.",
      tag: "Observation",
    },
    {
      prompt: "What do you think will happen next?",
      context: "Builds predictive reasoning and scientific intuition.",
      tag: "Hypothesis",
    },
    {
      prompt: "Want a small hint?",
      context: "Gentle guidance that preserves the joy of figuring it out yourself.",
      tag: "Scaffolding",
    },
    {
      prompt: "How could you test that idea?",
      context: "Inspires active experimentation and hands-on testing.",
      tag: "Experiment",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-lumi-bg">
      {/* Section A: Navigation */}
      <SiteHeader />

      <main className="flex-1">
        {/* Section B: Hero */}
        <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
          {/* Subtle background circles */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-lumi-lavender/40 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lumi-lavender text-lumi-deep text-xs sm:text-sm font-extrabold uppercase tracking-wider mb-6 shadow-subtle">
                <Sparkles className="w-4 h-4 text-lumi-violet animate-pulse" />
                <span>A NEW WAY TO LEARN</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-lumi-text tracking-tight leading-[1.1] mb-6">
                Big questions. Bright ideas.{" "}
                <span className="text-lumi-violet block sm:inline">
                  Your kind of discovery.
                </span>
              </h1>

              {/* Supporting text */}
              <p className="text-lg sm:text-xl text-lumi-muted leading-relaxed max-w-2xl mx-auto mb-10 font-normal">
                Lumi6 helps curious minds explore how the world works through interactive experiments, visual explanations, drawing, and guided questions.
              </p>

              {/* Dual CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <PrimaryButton
                  href="/learn"
                  size="lg"
                  variant="primary"
                  icon={<ArrowRight className="w-5 h-5" />}
                  className="w-full sm:w-auto shadow-float"
                >
                  Start Exploring
                </PrimaryButton>
                <PrimaryButton
                  href="#how-it-works"
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  See How It Works
                </PrimaryButton>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-semibold text-lumi-muted">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-lumi-success" />
                  <span>No Wrong-Answer Penalties</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-lumi-success" />
                  <span>Touch & Tablet Friendly</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-lumi-success" />
                  <span>Zero Ads or Trackers</span>
                </span>
              </div>
            </div>

            {/* Interactive Visual Hero Showcase (Original SVG/CSS mental model preview) */}
            <div className="mt-14 max-w-4xl mx-auto rounded-4xl bg-lumi-surface border-2 border-lumi-border shadow-card p-4 sm:p-6 lg:p-8">
              <div className="flex items-center justify-between pb-4 border-b border-lumi-border">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-xs font-bold text-lumi-muted ml-2">
                    Lumi6 Curiosity Studio Preview
                  </span>
                </div>
                <Link
                  href="/learn"
                  className="text-xs font-bold text-lumi-violet hover:underline flex items-center gap-1"
                >
                  <span>Launch Live Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Three Mini Interactive Visual Pillars */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Visual 1: Light Spectrum */}
                <Link
                  href="/learn?question=Why%20does%20a%20rainbow%20have%20different%20colors"
                  className="group p-5 rounded-2xl bg-lumi-bg border border-lumi-border hover:border-lumi-violet hover:shadow-subtle transition-all text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-lumi-lavender text-lumi-deep flex items-center justify-center mb-3">
                    <Sparkles className="w-5 h-5 text-lumi-violet group-hover:rotate-12 transition-transform" />
                  </div>
                  <h4 className="text-base font-extrabold text-lumi-text group-hover:text-lumi-violet">
                    Light & Prisms
                  </h4>
                  <p className="text-xs text-lumi-muted mt-1 leading-relaxed">
                    Watch sunlight bend through glass into a full rainbow spectrum.
                  </p>
                  <span className="inline-block mt-3 text-xs font-bold text-lumi-violet">
                    Try Lab →
                  </span>
                </Link>

                {/* Visual 2: Fractions */}
                <Link
                  href="/learn?question=Is%20two-fourths%20really%20the%20same%20as%20one-half"
                  className="group p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 hover:border-amber-400 hover:shadow-subtle transition-all text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
                    <FlaskConical className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </div>
                  <h4 className="text-base font-extrabold text-lumi-text group-hover:text-amber-800">
                    Pizza Fractions
                  </h4>
                  <p className="text-xs text-lumi-muted mt-1 leading-relaxed">
                    Slice whole pizzas into 2 to 12 pieces to discover equivalent fractions.
                  </p>
                  <span className="inline-block mt-3 text-xs font-bold text-amber-700">
                    Try Lab →
                  </span>
                </Link>

                {/* Visual 3: Robot Sequencing */}
                <Link
                  href="/learn?question=How%20do%20computers%20follow%20instructions"
                  className="group p-5 rounded-2xl bg-purple-50/70 border border-purple-200/80 hover:border-purple-400 hover:shadow-subtle transition-all text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center mb-3">
                    <BrainCircuit className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </div>
                  <h4 className="text-base font-extrabold text-lumi-text group-hover:text-purple-800">
                    Robot Coding
                  </h4>
                  <p className="text-xs text-lumi-muted mt-1 leading-relaxed">
                    Program a curious rover through obstacle mazes using code cards.
                  </p>
                  <span className="inline-block mt-3 text-xs font-bold text-purple-700">
                    Try Lab →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section C: Curiosity Showcase */}
        <section className="py-20 bg-lumi-surface border-y border-lumi-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Curiosity Showcase"
              title="What question sparks your mind today?"
              subtitle="Pick any mystery to enter the studio with real visual experiments and encouraging prompts."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CURIOSITY_SHOWCASE.map((item) => (
                <QuestionCard key={item.id} item={item} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <PrimaryButton
                href="/learn"
                size="md"
                variant="secondary"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Ask Your Own Custom Question
              </PrimaryButton>
            </div>
          </div>
        </section>

        {/* Section D: How Lumi6 Works */}
        <section id="how-it-works" className="py-20 md:py-28 bg-lumi-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="The Learning Process"
              title="How Lumi6 helps you think like a real scientist"
              subtitle="We don't immediately hand you answers to memorize. Instead, we guide you through an exciting 4-step journey of active discovery."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {learningSteps.map((step) => (
                <div
                  key={step.number}
                  className="flex flex-col justify-between p-6 rounded-3xl bg-lumi-surface border border-lumi-border shadow-subtle hover:shadow-card transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-12 h-12 rounded-2xl ${step.color} flex items-center justify-center shadow-sm`}>
                        {step.icon}
                      </div>
                      <span className="text-2xl font-black text-lumi-border font-mono">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-lumi-text mb-2.5">
                      {step.title}
                    </h3>
                    <p className="text-sm text-lumi-muted leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-lumi-border/60">
                    <span className="text-xs font-bold text-lumi-violet uppercase tracking-wider">
                      Active Thinking
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section E: Explore Subjects */}
        <section id="subjects" className="py-20 md:py-28 bg-lumi-surface border-y border-lumi-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Explore 9 Curricula"
              title="A unified playground across every subject"
              subtitle="From bending light rays and balancing equations to coding rovers and writing stories, every subject shares a friendly, consistent exploration interface."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SUBJECTS.map((subject) => (
                <SubjectCard key={subject.id} subject={subject} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <PrimaryButton
                href="/subjects"
                size="lg"
                variant="primary"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Browse All Topics & Levels
              </PrimaryButton>
            </div>
          </div>
        </section>

        {/* Section F: The Thinking Companion */}
        <section className="py-20 md:py-28 bg-lumi-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left explanation */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lumi-lavender text-lumi-deep text-xs font-extrabold uppercase tracking-wider">
                  <BrainCircuit className="w-4 h-4 text-lumi-violet" />
                  <span>The Thinking Companion</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-lumi-text tracking-tight leading-tight">
                  Encouragement that sparks your own bright ideas.
                </h2>

                <p className="text-base sm:text-lg text-lumi-muted leading-relaxed font-normal">
                  Traditional chatbots just dump long text answers. Lumi acts like a patient, curious lab mentor. It asks thoughtful questions, offers gentle progressive clues, and always provides a complete, clear explanation whenever you want one.
                </p>

                <div className="space-y-3.5 pt-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-lumi-success shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-sm font-bold text-lumi-text">Progressive Help Ladder:</strong>
                      <p className="text-xs sm:text-sm text-lumi-muted">
                        Request a tiny hint, an everyday analogy, or the full solution at any time.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-lumi-success shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-sm font-bold text-lumi-text">Zero Evaluation Judgment:</strong>
                      <p className="text-xs sm:text-sm text-lumi-muted">
                        No red cross marks or buzzer sounds. Testing unexpected ideas is celebrated!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <PrimaryButton href="/learn" size="md" variant="primary">
                    Meet Lumi in the Studio
                  </PrimaryButton>
                </div>
              </div>

              {/* Right prompt cards */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {companionPrompts.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-3xl bg-lumi-surface border border-lumi-border shadow-subtle hover:shadow-card transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md bg-lumi-lavender text-lumi-deep mb-3 inline-block">
                        {item.tag}
                      </span>
                      <h3 className="text-lg font-bold text-lumi-text mb-2">
                        "{item.prompt}"
                      </h3>
                      <p className="text-xs text-lumi-muted leading-relaxed">
                        {item.context}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-lumi-border/60 flex items-center gap-1.5 text-xs font-bold text-lumi-violet">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Friendly Guidance</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section G: Interactive Learning Preview */}
        <section className="py-20 md:py-28 bg-lumi-surface border-y border-lumi-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Hands-On Lab Demo"
              title="Test a real experiment right here"
              subtitle="Slide the angle dial, change the light beam, and see how glass separates sunlight into vibrant colors."
            />

            <RainbowExperimentPreview />
          </div>
        </section>

        {/* Section H: Final CTA */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-lumi-lavender/30 to-lumi-bg text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="w-16 h-16 rounded-3xl bg-lumi-violet text-white flex items-center justify-center mx-auto mb-6 shadow-md">
              <Sparkles className="w-8 h-8 text-lumi-yellow animate-pulse" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-lumi-text tracking-tight mb-4">
              Your next big discovery starts with one question.
            </h2>

            <p className="text-base sm:text-lg text-lumi-muted max-w-xl mx-auto mb-8 font-normal">
              Enter the studio to ask questions, explore interactive visual models, sketch your ideas, and discover how things work.
            </p>

            <PrimaryButton
              href="/learn"
              size="lg"
              variant="primary"
              icon={<ArrowRight className="w-5 h-5" />}
              className="shadow-float"
            >
              Start Exploring
            </PrimaryButton>
          </div>
        </section>
      </main>

      {/* Section I: Footer */}
      <SiteFooter />
    </div>
  );
}
