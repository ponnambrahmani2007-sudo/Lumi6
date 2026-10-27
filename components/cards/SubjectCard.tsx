import React from "react";
import Link from "next/link";
import { SubjectItem } from "@/lib/types";
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

interface SubjectCardProps {
  subject: SubjectItem;
  className?: string;
}

export function SubjectCard({ subject, className }: SubjectCardProps) {
  const IconComponent = iconMap[subject.iconName] || Sparkles;

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between p-6 rounded-3xl bg-lumi-surface border border-lumi-border shadow-subtle hover:shadow-card hover:-translate-y-1 transition-all duration-200",
        className
      )}
    >
      <div>
        {/* Top Header & Icon */}
        <div className="flex items-center justify-between mb-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm transition-transform duration-200 group-hover:scale-105"
            style={{ backgroundColor: subject.accentColor }}
          >
            <IconComponent className="w-6 h-6" strokeWidth={2.2} />
          </div>
          <span
            className="text-xs font-bold px-3 py-1 rounded-full text-lumi-text"
            style={{ backgroundColor: subject.badgeBg }}
          >
            {subject.sampleTopics.length} Topics
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-bold text-lumi-text group-hover:text-lumi-violet transition-colors">
          {subject.name}
        </h3>
        <p className="mt-2 text-sm text-lumi-muted leading-relaxed line-clamp-2">
          {subject.description}
        </p>

        {/* Sample Topic Pills */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {subject.sampleTopics.slice(0, 2).map((topic) => (
            <span
              key={topic.id}
              className="text-xs px-2.5 py-1 rounded-lg bg-lumi-bg border border-lumi-border text-lumi-text font-medium"
            >
              {topic.title}
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-4 border-t border-lumi-border/60 flex items-center justify-between">
        <span className="text-xs font-bold text-lumi-muted uppercase tracking-wider">
          Explore Hub
        </span>
        <Link
          href={`/subjects/${subject.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-lumi-violet group-hover:text-lumi-deep focus-visible:rounded-lg"
          aria-label={`Explore ${subject.name}`}
        >
          <span>Open Subject</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
