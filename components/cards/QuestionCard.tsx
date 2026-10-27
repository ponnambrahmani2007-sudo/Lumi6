import React from "react";
import Link from "next/link";
import { CuriosityQuestion } from "@/lib/types";
import { Sparkles, Magnet, Moon, Leaf, Wrench, Calculator, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  Magnet,
  Moon,
  Leaf,
  Wrench,
  Calculator,
};

interface QuestionCardProps {
  item: CuriosityQuestion;
  className?: string;
}

export function QuestionCard({ item, className }: QuestionCardProps) {
  const IconComponent = iconMap[item.iconName] || Sparkles;
  const targetUrl = `/learn?question=${encodeURIComponent(item.question)}`;

  return (
    <Link
      href={targetUrl}
      className={cn(
        "group relative flex flex-col justify-between p-6 rounded-3xl bg-lumi-surface border border-lumi-border shadow-subtle hover:shadow-card hover:-translate-y-1.5 transition-all duration-200 text-left cursor-pointer",
        className
      )}
    >
      <div>
        {/* Subject & Icon pill */}
        <div className="flex items-center justify-between mb-4">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-sm transition-transform duration-200 group-hover:scale-110"
            style={{ backgroundColor: item.accentColor }}
          >
            <IconComponent className="w-5 h-5" strokeWidth={2.2} />
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-lumi-lavender text-lumi-deep">
            {item.subjectName}
          </span>
        </div>

        {/* Big Question */}
        <h3 className="text-lg sm:text-xl font-bold text-lumi-text group-hover:text-lumi-violet transition-colors leading-snug">
          {item.question}
        </h3>

        {/* Hint snippet */}
        <p className="mt-3 text-sm text-lumi-muted leading-relaxed font-normal">
          {item.hintSnippet}
        </p>
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-3 flex items-center justify-between text-sm font-bold text-lumi-violet group-hover:text-lumi-deep">
        <span className="text-xs font-medium text-lumi-muted">Explore in Studio</span>
        <span className="inline-flex items-center gap-1">
          <span>Think & Discover</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
