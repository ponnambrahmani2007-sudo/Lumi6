"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { LearningCanvas } from "@/components/learning/LearningCanvas";
import { ThinkingCompanion } from "@/components/learning/ThinkingCompanion";
import { DrawingPanel } from "@/components/learning/DrawingPanel";
import {
  Compass,
  Sparkles,
  Palette,
  MessageSquare,
  FlaskConical,
  BookOpen,
  ArrowLeft,
  Share2,
} from "lucide-react";
import { cn } from "@/lib/utils";

function WorkspaceContent() {
  const searchParams = useSearchParams();
  const rawQuestion = searchParams.get("question");

  const [currentQuestion, setCurrentQuestion] = useState<string>(
    rawQuestion || "Why does a rainbow have different colors?"
  );

  const [activeTab, setActiveTab] = useState<"experiment" | "companion" | "drawing">(
    "experiment"
  );
  const [isDrawingOpen, setIsDrawingOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (rawQuestion) {
      setCurrentQuestion(decodeURIComponent(rawQuestion));
    }
  }, [rawQuestion]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-lumi-bg flex flex-col">
      {/* Top Studio Bar */}
      <header className="sticky top-0 z-30 bg-lumi-surface/95 backdrop-blur-md border-b border-lumi-border px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/subjects"
            className="p-2 rounded-xl text-lumi-muted hover:text-lumi-text hover:bg-lumi-lavender transition-colors"
            title="Return to Subjects"
            aria-label="Back to subjects"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <Logo size="sm" />

          {/* Current Topic Badge */}
          <div className="hidden md:flex items-center gap-2 pl-3 border-l border-lumi-border">
            <span className="text-xs font-bold uppercase tracking-wider text-lumi-muted">
              Studio Topic:
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-lumi-text bg-lumi-lavender px-3 py-1 rounded-full truncate max-w-xs">
              {currentQuestion}
            </span>
          </div>
        </div>

        {/* Right Navigation & Tools */}
        <div className="flex items-center gap-2">
          {/* Drawing Tool Button */}
          <button
            type="button"
            onClick={() => {
              setIsDrawingOpen(!isDrawingOpen);
              setActiveTab("drawing");
            }}
            className={cn(
              "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all",
              isDrawingOpen
                ? "bg-lumi-violet text-white shadow-sm"
                : "bg-lumi-surface border border-lumi-border text-lumi-text hover:bg-lumi-lavender"
            )}
            aria-label="Toggle Drawing Sketchpad"
          >
            <Palette className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">Draw & Sketch</span>
          </button>

          {/* Share Discovery Button */}
          <button
            type="button"
            onClick={handleShare}
            className="p-2 sm:px-3 sm:py-2 rounded-xl border border-lumi-border bg-lumi-surface text-lumi-muted hover:text-lumi-text text-xs font-bold transition-colors flex items-center gap-1.5"
            title="Share activity link"
            aria-label="Share activity link"
          >
            <Share2 className="w-4 h-4 text-lumi-violet" />
            <span className="hidden sm:inline">{copiedLink ? "Copied!" : "Share"}</span>
          </button>

          <Link
            href="/subjects"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-lumi-lavender text-lumi-deep text-xs sm:text-sm font-bold hover:bg-[#E5DEFF] transition-colors"
          >
            <Compass className="w-4 h-4" />
            <span>More Topics</span>
          </Link>
        </div>
      </header>

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden flex border-b border-lumi-border bg-lumi-surface px-4 py-2 gap-2">
        <button
          type="button"
          onClick={() => {
            setActiveTab("experiment");
            setIsDrawingOpen(false);
          }}
          className={cn(
            "flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all",
            activeTab === "experiment"
              ? "bg-lumi-lavender text-lumi-deep shadow-sm"
              : "text-lumi-muted hover:text-lumi-text"
          )}
        >
          <FlaskConical className="w-4 h-4" />
          <span>Interactive Lab</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("companion");
            setIsDrawingOpen(false);
          }}
          className={cn(
            "flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all",
            activeTab === "companion"
              ? "bg-lumi-lavender text-lumi-deep shadow-sm"
              : "text-lumi-muted hover:text-lumi-text"
          )}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Thinking Guide</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("drawing");
            setIsDrawingOpen(true);
          }}
          className={cn(
            "flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all",
            activeTab === "drawing"
              ? "bg-lumi-lavender text-lumi-deep shadow-sm"
              : "text-lumi-muted hover:text-lumi-text"
          )}
        >
          <Palette className="w-4 h-4" />
          <span>Sketch</span>
        </button>
      </div>

      {/* Main Studio Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {/* If Drawing Modal / Panel is active */}
        {isDrawingOpen ? (
          <div className="space-y-6 animate-in fade-in duration-200">
            <DrawingPanel
              onClose={() => {
                setIsDrawingOpen(false);
                setActiveTab("experiment");
              }}
              initialPrompt={`Diagram your thinking for: "${currentQuestion}"`}
            />
          </div>
        ) : (
          /* Desktop Two-Column Responsive Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left Column: Interactive Lab Experiment (7 cols) */}
            <div
              className={cn(
                "lg:col-span-7",
                activeTab === "companion" ? "hidden lg:block" : "block"
              )}
            >
              <LearningCanvas
                currentQuestion={currentQuestion}
                onOpenDrawing={() => {
                  setIsDrawingOpen(true);
                  setActiveTab("drawing");
                }}
              />
            </div>

            {/* Right Column: Thinking Companion (5 cols) */}
            <div
              className={cn(
                "lg:col-span-5",
                activeTab === "experiment" ? "hidden lg:block" : "block"
              )}
            >
              <ThinkingCompanion currentQuestion={currentQuestion} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export function LearningWorkspace() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-lumi-bg flex items-center justify-center p-8">
          <div className="p-6 rounded-3xl bg-lumi-surface border border-lumi-border shadow-card flex items-center gap-3 text-lumi-violet font-bold text-lg">
            <Sparkles className="w-6 h-6 animate-spin text-lumi-violet" />
            <span>Opening Lumi6 Curiosity Studio...</span>
          </div>
        </div>
      }
    >
      <WorkspaceContent />
    </Suspense>
  );
}
