"use client";

import React, { useState } from "react";
import { Sparkles, HelpCircle, BookOpen, RotateCcw, Lightbulb } from "lucide-react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { cn } from "@/lib/utils";

export function RainbowExperimentPreview() {
  const [angle, setAngle] = useState(45);
  const [beamType, setBeamType] = useState<"white" | "laser">("white");
  const [hintTier, setHintTier] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const hints = [
    "Look closely at where the beam hits the glass prism. Does it keep going straight, or does it bend?",
    "Different colors of light travel at slightly different speeds inside glass. Red bends the least, while violet bends the most!",
    "Because white sunlight is made of all the rainbow colors mixed together, bending them spreads them out like a colorful fan!",
  ];

  const handleNextHint = () => {
    setHintTier((prev) => (prev + 1) % hints.length);
  };

  const resetExperiment = () => {
    setAngle(45);
    setBeamType("white");
    setHintTier(0);
    setShowExplanation(false);
  };

  // Calculate simulated refraction angles based on slider
  const dispersionSpread = (angle / 45) * 22; // spread factor
  const baseDeflection = 120 + (angle - 30) * 1.2;

  return (
    <div className="w-full bg-lumi-surface rounded-4xl border border-lumi-border shadow-card p-6 sm:p-8 lg:p-10 transition-all">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-lumi-border">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lumi-lavender text-lumi-deep text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-lumi-violet" />
            <span>Interactive Science Lab</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-lumi-text">
            Build a Rainbow: The Magic Prism
          </h3>
          <p className="text-sm text-lumi-muted mt-1">
            Turn the flashlight angle to see how glass bends sunlight into a vibrant color spectrum.
          </p>
        </div>

        <button
          onClick={resetExperiment}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-lumi-muted hover:text-lumi-text hover:bg-lumi-bg border border-lumi-border transition-colors self-start sm:self-center"
          title="Reset experiment"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Lab</span>
        </button>
      </div>

      {/* Main Interactive Stage */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Simulation Canvas / Visual SVG */}
        <div className="lg:col-span-7 bg-[#1A1829] rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[320px] sm:min-h-[380px] shadow-inner select-none">
          {/* Subtle Ambient Glow */}
          <div className="absolute inset-0 bg-radial from-lumi-violet/10 via-transparent to-transparent pointer-events-none" />

          {/* SVG Ray Tracing Diagram */}
          <svg
            viewBox="0 0 500 320"
            className="w-full h-auto max-h-[300px] overflow-visible"
            aria-label="Interactive prism and light beam simulation"
          >
            <defs>
              <linearGradient id="rainbowSpectrum" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EF4444" />
                <stop offset="17%" stopColor="#F97316" />
                <stop offset="34%" stopColor="#EAB308" />
                <stop offset="50%" stopColor="#22C55E" />
                <stop offset="68%" stopColor="#06B6D4" />
                <stop offset="85%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
              <filter id="laserGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Flashlight emitter */}
            <g transform={`rotate(${angle - 45}, 80, 160)`}>
              <rect x="20" y="145" width="55" height="30" rx="6" fill="#475569" />
              <polygon points="75,140 95,130 95,190 75,180" fill="#64748B" />
              <circle cx="85" cy="160" r="8" fill="#F8FAFC" />
            </g>

            {/* Incoming Beam */}
            <line
              x1="95"
              y1="160"
              x2="220"
              y2="160"
              stroke={beamType === "white" ? "#FFFFFF" : "#22C55E"}
              strokeWidth={beamType === "white" ? "5" : "3"}
              strokeOpacity="0.9"
              filter="url(#laserGlow)"
            />

            {/* Glass Prism Triangle */}
            <polygon
              points="250,70 190,240 310,240"
              fill="rgba(207, 245, 231, 0.25)"
              stroke="rgba(255, 255, 255, 0.85)"
              strokeWidth="3"
              className="backdrop-blur-sm"
            />
            {/* Prism internal highlights */}
            <line
              x1="220"
              y1="160"
              x2="260"
              y2={150 + (angle - 45) * 0.3}
              stroke={beamType === "white" ? "#FFFFFF" : "#22C55E"}
              strokeWidth="4"
              strokeOpacity="0.75"
            />

            {/* Outgoing Refracted Beam / Spectrum */}
            {beamType === "white" ? (
              <g>
                {/* Red ray (bends least) */}
                <line
                  x1="260"
                  y1="150"
                  x2="460"
                  y2={baseDeflection - dispersionSpread}
                  stroke="#EF4444"
                  strokeWidth="3.5"
                  strokeOpacity="0.95"
                />
                {/* Yellow ray */}
                <line
                  x1="260"
                  y1="150"
                  x2="460"
                  y2={baseDeflection}
                  stroke="#EAB308"
                  strokeWidth="3.5"
                  strokeOpacity="0.95"
                />
                {/* Green ray */}
                <line
                  x1="260"
                  y1="150"
                  x2="460"
                  y2={baseDeflection + dispersionSpread * 0.5}
                  stroke="#22C55E"
                  strokeWidth="3.5"
                  strokeOpacity="0.95"
                />
                {/* Blue ray */}
                <line
                  x1="260"
                  y1="150"
                  x2="460"
                  y2={baseDeflection + dispersionSpread * 1.0}
                  stroke="#3B82F6"
                  strokeWidth="3.5"
                  strokeOpacity="0.95"
                />
                {/* Violet ray (bends most) */}
                <line
                  x1="260"
                  y1="150"
                  x2="460"
                  y2={baseDeflection + dispersionSpread * 1.5}
                  stroke="#A855F7"
                  strokeWidth="3.5"
                  strokeOpacity="0.95"
                />

                {/* Projection Screen with Rainbow Band */}
                <rect x="460" y="60" width="12" height="200" rx="4" fill="#334155" />
                <rect
                  x="456"
                  y={Math.max(65, baseDeflection - dispersionSpread - 8)}
                  width="8"
                  height={Math.min(180, dispersionSpread * 2.5 + 20)}
                  rx="3"
                  fill="url(#rainbowSpectrum)"
                  filter="url(#laserGlow)"
                />
              </g>
            ) : (
              /* Monochromatic Green Laser */
              <g>
                <line
                  x1="260"
                  y1="150"
                  x2="460"
                  y2={baseDeflection + dispersionSpread * 0.4}
                  stroke="#22C55E"
                  strokeWidth="4"
                  filter="url(#laserGlow)"
                />
                <rect x="460" y="60" width="12" height="200" rx="4" fill="#334155" />
                <circle
                  cx="460"
                  cy={baseDeflection + dispersionSpread * 0.4}
                  r="6"
                  fill="#22C55E"
                  filter="url(#laserGlow)"
                />
              </g>
            )}

            {/* Labels */}
            <text x="70" y="275" fill="#94A3B8" fontSize="12" fontWeight="bold">
              Light Source
            </text>
            <text x="215" y="55" fill="#CBD5E1" fontSize="13" fontWeight="bold">
              Glass Prism
            </text>
            <text x="390" y="275" fill="#94A3B8" fontSize="12" fontWeight="bold">
              {beamType === "white" ? "Rainbow Spectrum" : "Laser Dot"}
            </text>
          </svg>

          {/* Interactive touch badge */}
          <div className="absolute bottom-3 left-4 text-xs font-medium text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-lumi-mint animate-ping" />
            <span>Live Refraction Angle: {angle}°</span>
          </div>
        </div>

        {/* Right: Controls & Thinking Tools */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          {/* Controls Box */}
          <div className="p-5 rounded-3xl bg-lumi-bg border border-lumi-border space-y-5">
            <h4 className="text-base font-bold text-lumi-text flex items-center justify-between">
              <span>Lab Controls</span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-lumi-surface border border-lumi-border text-lumi-violet">
                Touch Friendly
              </span>
            </h4>

            {/* Angle Slider */}
            <div>
              <div className="flex justify-between items-center text-sm font-semibold mb-2">
                <label htmlFor="angle-slider" className="text-lumi-text">
                  Beam Angle:
                </label>
                <span className="font-bold text-lumi-violet">{angle}°</span>
              </div>
              <input
                id="angle-slider"
                type="range"
                min="20"
                max="70"
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                className="w-full h-3 bg-lumi-lavender rounded-lg appearance-none cursor-pointer accent-lumi-violet touch-none"
                aria-valuemin={20}
                aria-valuemax={70}
                aria-valuenow={angle}
                aria-label="Adjust light beam angle"
              />
              <div className="flex justify-between text-xs text-lumi-muted mt-1 font-medium">
                <span>Shallow (20°)</span>
                <span>Steep (70°)</span>
              </div>
            </div>

            {/* Beam Type Toggle */}
            <div>
              <label className="block text-sm font-semibold text-lumi-text mb-2">
                Light Beam Type:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setBeamType("white")}
                  className={cn(
                    "py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all border flex items-center justify-center gap-1.5",
                    beamType === "white"
                      ? "bg-lumi-surface text-lumi-deep border-lumi-violet shadow-sm ring-2 ring-lumi-violet/20"
                      : "bg-transparent text-lumi-muted border-lumi-border hover:bg-lumi-surface"
                  )}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-200 border border-slate-400" />
                  <span>White Sunlight</span>
                </button>
                <button
                  type="button"
                  onClick={() => setBeamType("laser")}
                  className={cn(
                    "py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all border flex items-center justify-center gap-1.5",
                    beamType === "laser"
                      ? "bg-lumi-surface text-lumi-deep border-lumi-violet shadow-sm ring-2 ring-lumi-violet/20"
                      : "bg-transparent text-lumi-muted border-lumi-border hover:bg-lumi-surface"
                  )}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>Green Laser</span>
                </button>
              </div>
            </div>
          </div>

          {/* Progressive Hint & Explanation Actions */}
          <div className="space-y-3">
            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={handleNextHint}
                className="flex-1 py-3 px-4 rounded-2xl bg-lumi-lavender text-lumi-deep hover:bg-[#E5DEFF] text-sm font-bold border border-lumi-violet/20 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <HelpCircle className="w-4 h-4 text-lumi-violet" />
                <span>Show Hint ({hintTier + 1}/3)</span>
              </button>

              <button
                type="button"
                onClick={() => setShowExplanation(!showExplanation)}
                className="flex-1 py-3 px-4 rounded-2xl bg-lumi-yellow text-lumi-text hover:bg-[#FCD04B] text-sm font-bold shadow-subtle transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Lightbulb className="w-4 h-4 text-amber-700" />
                <span>{showExplanation ? "Hide Explanation" : "Explain What's Happening"}</span>
              </button>
            </div>

            {/* Hint Box */}
            <div className="p-4 rounded-2xl bg-lumi-lavender/50 border border-lumi-violet/20 text-xs sm:text-sm text-lumi-text font-medium flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-lumi-violet shrink-0 mt-0.5" />
              <div>
                <strong className="text-lumi-deep block mb-0.5">Clue #{hintTier + 1}:</strong>
                <p>{hints[hintTier]}</p>
              </div>
            </div>

            {/* Explanation Modal / Dropdown */}
            {showExplanation && (
              <div className="p-5 rounded-2xl bg-lumi-surface border-2 border-lumi-yellow shadow-card text-xs sm:text-sm text-lumi-text animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center gap-2 mb-2 font-extrabold text-lumi-text text-sm sm:text-base">
                  <BookOpen className="w-4 h-4 text-lumi-violet" />
                  <span>The Science of Light Refraction</span>
                </div>
                <p className="text-lumi-muted leading-relaxed font-normal mb-2">
                  When light travels through air, it flies at top speed. But when it enters thick glass, it slows down and changes direction—an effect called <strong>refraction</strong>.
                </p>
                <p className="text-lumi-muted leading-relaxed font-normal">
                  Red light has longer wavelengths, so it glides through with less bending. Violet light has shorter, energetic wavelengths, bending the sharpest. That separation creates the rainbow!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
