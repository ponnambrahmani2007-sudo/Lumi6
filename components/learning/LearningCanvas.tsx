"use client";

import React, { useState } from "react";
import { Sparkles, RotateCcw, HelpCircle, Lightbulb, Play, Compass, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface LearningCanvasProps {
  currentQuestion?: string;
  onOpenDrawing?: () => void;
  className?: string;
}

export function LearningCanvas({
  currentQuestion = "Why does a rainbow have different colors?",
  onOpenDrawing,
  className,
}: LearningCanvasProps) {
  // Determine mode from question
  const isFraction = currentQuestion.toLowerCase().includes("fraction") || currentQuestion.toLowerCase().includes("pizza");
  const isRobot = currentQuestion.toLowerCase().includes("robot") || currentQuestion.toLowerCase().includes("code") || currentQuestion.toLowerCase().includes("computer");
  const isMoon = currentQuestion.toLowerCase().includes("moon") || currentQuestion.toLowerCase().includes("night");

  // State for Rainbow/Light
  const [angle, setAngle] = useState(48);
  const [beamColor, setBeamColor] = useState<"white" | "red" | "violet">("white");

  // State for Pizza Fractions
  const [slices, setSlices] = useState(4);
  const [eatenCount, setEatenCount] = useState(1);

  // State for Robot Grid
  const [robotPos, setRobotPos] = useState({ x: 0, y: 0, dir: "right" });
  const [commands, setCommands] = useState<string[]>([]);

  // Prediction selection
  const [prediction, setPrediction] = useState<string | null>(null);

  // Reset current experiment
  const resetActivity = () => {
    setAngle(48);
    setBeamColor("white");
    setSlices(4);
    setEatenCount(1);
    setRobotPos({ x: 0, y: 0, dir: "right" });
    setCommands([]);
    setPrediction(null);
  };

  // Robot movement helpers
  const addRobotCommand = (cmd: string) => {
    if (commands.length < 6) {
      setCommands((prev) => [...prev, cmd]);
    }
  };

  const runRobot = () => {
    let { x, y, dir } = { ...robotPos };
    commands.forEach((cmd) => {
      if (cmd === "forward") {
        if (dir === "right" && x < 3) x += 1;
        if (dir === "left" && x > 0) x -= 1;
        if (dir === "down" && y < 3) y += 1;
        if (dir === "up" && y > 0) y -= 1;
      } else if (cmd === "turn-right") {
        const dirs = ["right", "down", "left", "up"];
        const next = (dirs.indexOf(dir) + 1) % 4;
        dir = dirs[next];
      } else if (cmd === "turn-left") {
        const dirs = ["right", "down", "left", "up"];
        const next = (dirs.indexOf(dir) + 3) % 4;
        dir = dirs[next];
      }
    });
    setRobotPos({ x, y, dir });
  };

  return (
    <div
      className={cn(
        "flex flex-col bg-lumi-surface rounded-3xl border border-lumi-border shadow-card overflow-hidden",
        className
      )}
    >
      {/* Top Stage Navigation & Question */}
      <div className="p-4 sm:p-6 bg-lumi-bg border-b border-lumi-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lumi-lavender text-lumi-deep text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-lumi-violet" />
            <span>Interactive Mental Model</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-lumi-text">
            {currentQuestion}
          </h2>
          <p className="text-xs sm:text-sm text-lumi-muted mt-1">
            Test your ideas below. Make a prediction, adjust the variables, and observe the results!
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onOpenDrawing && (
            <button
              type="button"
              onClick={onOpenDrawing}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-lumi-mint/50 border border-lumi-mint text-lumi-text hover:bg-lumi-mint text-xs font-bold transition-all active:scale-95"
            >
              <Compass className="w-4 h-4 text-emerald-700" />
              <span>Draw My Idea</span>
            </button>
          )}
          <button
            type="button"
            onClick={resetActivity}
            className="p-2.5 rounded-xl border border-lumi-border bg-lumi-surface text-lumi-muted hover:text-lumi-text hover:bg-lumi-bg transition-colors"
            title="Reset Experiment"
            aria-label="Reset experiment parameters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Prediction Prompt Step (Pedagogical Loop Step 4) */}
      <div className="p-4 bg-lumi-lavender/30 border-b border-lumi-border">
        <div className="flex items-center gap-2 mb-2">
          <Eye className="w-4 h-4 text-lumi-violet" />
          <span className="text-xs font-bold uppercase tracking-wider text-lumi-deep">
            Step 1: Your Prediction (No wrong answers!)
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {[
            isFraction
              ? "Cutting more slices gives you more food"
              : isRobot
              ? "Robot steps 1 block for every card"
              : "All light colors bend by the exact same amount",
            isFraction
              ? "More slices are just smaller pieces of the same whole"
              : isRobot
              ? "Robot can jump walls directly"
              : "Colors bend by different amounts in glass",
            isFraction
              ? "You cannot cut a pizza into odd pieces"
              : isRobot
              ? "Turns change the direction without moving"
              : "Light reflects completely without entering glass",
          ].map((opt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPrediction(opt)}
              className={cn(
                "p-2.5 rounded-xl text-xs font-semibold text-left transition-all border",
                prediction === opt
                  ? "bg-lumi-surface border-lumi-violet text-lumi-deep shadow-sm ring-2 ring-lumi-violet/20"
                  : "bg-lumi-surface/70 border-lumi-border text-lumi-text hover:bg-lumi-surface"
              )}
            >
              <span>{opt}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Simulation Viewport */}
      <div className="p-6 flex-1 flex flex-col justify-center items-center">
        {/* Render Activity 1: Light & Prisms */}
        {!isFraction && !isRobot && !isMoon && (
          <div className="w-full max-w-xl bg-[#1A1829] rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-inner text-center">
            <svg viewBox="0 0 460 260" className="w-full h-auto overflow-visible select-none">
              <defs>
                <linearGradient id="spectrumGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#EF4444" />
                  <stop offset="25%" stopColor="#EAB308" />
                  <stop offset="50%" stopColor="#22C55E" />
                  <stop offset="75%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#A855F7" />
                </linearGradient>
              </defs>

              {/* Source flashlight */}
              <g transform={`rotate(${angle - 45}, 60, 130)`}>
                <rect x="10" y="115" width="50" height="30" rx="5" fill="#475569" />
                <polygon points="60,110 80,100 80,160 60,150" fill="#64748B" />
              </g>

              {/* Incoming ray */}
              <line
                x1="80"
                y1="130"
                x2="190"
                y2="130"
                stroke={beamColor === "white" ? "#FFFFFF" : beamColor === "red" ? "#EF4444" : "#A855F7"}
                strokeWidth="4"
                strokeOpacity="0.9"
              />

              {/* Glass Prism */}
              <polygon
                points="220,50 160,210 280,210"
                fill="rgba(207, 245, 231, 0.2)"
                stroke="#FFFFFF"
                strokeWidth="2.5"
              />

              {/* Internal ray */}
              <line
                x1="190"
                y1="130"
                x2="230"
                y2={120 + (angle - 45) * 0.3}
                stroke={beamColor === "white" ? "#FFFFFF" : beamColor === "red" ? "#EF4444" : "#A855F7"}
                strokeWidth="3.5"
              />

              {/* Refracted outgoing spectrum */}
              {beamColor === "white" ? (
                <g>
                  <polygon
                    points={`230,120 420,${90 - (angle - 45) * 0.5} 420,${170 + (angle - 45) * 0.5}`}
                    fill="url(#spectrumGradient)"
                    opacity="0.85"
                  />
                  <rect x="420" y="50" width="10" height="160" rx="4" fill="#334155" />
                </g>
              ) : (
                <g>
                  <line
                    x1="230"
                    y1="120"
                    x2="420"
                    y2={beamColor === "red" ? 100 : 160}
                    stroke={beamColor === "red" ? "#EF4444" : "#A855F7"}
                    strokeWidth="4"
                  />
                  <rect x="420" y="50" width="10" height="160" rx="4" fill="#334155" />
                  <circle
                    cx="420"
                    cy={beamColor === "red" ? 100 : 160}
                    r="5"
                    fill={beamColor === "red" ? "#EF4444" : "#A855F7"}
                  />
                </g>
              )}

              <text x="50" y="235" fill="#94A3B8" fontSize="12" fontWeight="bold">
                Angle: {angle}°
              </text>
              <text x="180" y="35" fill="#CBD5E1" fontSize="12" fontWeight="bold">
                Glass Prism
              </text>
              <text x="360" y="235" fill="#94A3B8" fontSize="12" fontWeight="bold">
                Spectrum
              </text>
            </svg>
          </div>
        )}

        {/* Render Activity 2: Pizza Fractions */}
        {isFraction && (
          <div className="w-full max-w-md p-6 bg-amber-50 rounded-3xl border-2 border-amber-200 text-center flex flex-col items-center">
            <svg viewBox="0 0 240 240" className="w-56 h-56 overflow-visible mb-4">
              {/* Outer Pizza Crust */}
              <circle cx="120" cy="120" r="100" fill="#D97706" />
              <circle cx="120" cy="120" r="90" fill="#FDE047" />

              {/* Slices representation */}
              {Array.from({ length: slices }).map((_, i) => {
                const startAngle = (i * 360) / slices;
                const endAngle = ((i + 1) * 360) / slices;
                const isEaten = i < eatenCount;

                const x1 = 120 + 90 * Math.cos((Math.PI * startAngle) / 180);
                const y1 = 120 + 90 * Math.sin((Math.PI * startAngle) / 180);
                const x2 = 120 + 90 * Math.cos((Math.PI * endAngle) / 180);
                const y2 = 120 + 90 * Math.sin((Math.PI * endAngle) / 180);
                const largeArc = 360 / slices > 180 ? 1 : 0;

                const pathData = `M 120 120 L ${x1} ${y1} A 90 90 0 ${largeArc} 1 ${x2} ${y2} Z`;

                return (
                  <path
                    key={i}
                    d={pathData}
                    fill={isEaten ? "#FEF3C7" : "#F59E0B"}
                    stroke="#B45309"
                    strokeWidth="2"
                    opacity={isEaten ? "0.3" : "1"}
                    className="cursor-pointer transition-opacity"
                    onClick={() => setEatenCount(i + 1)}
                  />
                );
              })}

              <circle cx="120" cy="120" r="6" fill="#78350F" />
            </svg>

            {/* Fraction readout */}
            <div className="inline-flex items-center gap-3 p-3 rounded-2xl bg-white border border-amber-300 shadow-sm">
              <span className="text-sm font-bold text-lumi-text">Portion Selected:</span>
              <span className="text-xl font-extrabold text-lumi-violet">
                {eatenCount} / {slices}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-lumi-lavender text-lumi-deep">
                ({Math.round((eatenCount / slices) * 100)}% of Whole)
              </span>
            </div>
          </div>
        )}

        {/* Render Activity 3: Robot Navigator */}
        {isRobot && (
          <div className="w-full max-w-md p-6 bg-purple-50 rounded-3xl border-2 border-purple-200 text-center flex flex-col items-center">
            {/* 4x4 Grid */}
            <div className="grid grid-cols-4 gap-2 p-3 bg-white rounded-2xl border border-purple-300 shadow-sm mb-4">
              {Array.from({ length: 16 }).map((_, i) => {
                const cellX = i % 4;
                const cellY = Math.floor(i / 4);
                const isRobotHere = robotPos.x === cellX && robotPos.y === cellY;
                const isTarget = cellX === 3 && cellY === 3;

                return (
                  <div
                    key={i}
                    className={cn(
                      "w-12 h-12 sm:w-14 sm:h-14 rounded-xl border flex items-center justify-center font-bold text-xs relative transition-all",
                      isRobotHere
                        ? "bg-lumi-violet text-white shadow-md scale-105"
                        : isTarget
                        ? "bg-amber-100 border-amber-300 text-amber-700"
                        : "bg-lumi-bg border-purple-100 text-purple-300"
                    )}
                  >
                    {isRobotHere ? "🤖" : isTarget ? "⭐" : ""}
                  </div>
                );
              })}
            </div>

            {/* Commands queue */}
            <div className="w-full flex items-center justify-between text-xs font-bold text-purple-900 mb-2">
              <span>Program Cards: ({commands.length}/6)</span>
              <button
                type="button"
                onClick={() => setCommands([])}
                className="text-xs text-rose-600 hover:underline"
              >
                Clear Script
              </button>
            </div>
            <div className="w-full min-h-[40px] p-2 rounded-xl bg-white border border-purple-200 flex items-center gap-1.5 overflow-x-auto mb-4">
              {commands.length === 0 ? (
                <span className="text-xs text-lumi-muted mx-auto">Add command cards below</span>
              ) : (
                commands.map((cmd, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 rounded-lg bg-lumi-lavender text-lumi-deep text-xs font-bold whitespace-nowrap"
                  >
                    {cmd}
                  </span>
                ))
              )}
            </div>
          </div>
        )}

        {/* Render Moon Phases / Earth */}
        {isMoon && (
          <div className="w-full max-w-md p-6 bg-slate-900 rounded-3xl text-center text-white flex flex-col items-center">
            <div className="relative w-40 h-40 rounded-full bg-slate-800 border-2 border-slate-700 overflow-hidden mb-4 shadow-inner flex items-center justify-center">
              {/* Moon illuminated section */}
              <div
                className="absolute inset-0 bg-yellow-100 transition-all duration-300 rounded-full"
                style={{
                  clipPath: `inset(0 ${100 - (angle / 90) * 100}% 0 0)`,
                }}
              />
              <span className="relative z-10 text-xs font-bold text-slate-400">Moon View</span>
            </div>
            <p className="text-xs text-slate-300">
              Sunlight angle changes how much of the bright side is facing Earth!
            </p>
          </div>
        )}
      </div>

      {/* Interactive Controls Bar */}
      <div className="p-4 sm:p-6 bg-lumi-bg border-t border-lumi-border flex flex-wrap items-center justify-between gap-4">
        {!isFraction && !isRobot && (
          <div className="flex-1 min-w-[200px]">
            <div className="flex justify-between text-xs sm:text-sm font-bold text-lumi-text mb-1">
              <span>Adjust Angle: {angle}°</span>
              <span className="text-xs text-lumi-muted">Rotate Source</span>
            </div>
            <input
              type="range"
              min="25"
              max="70"
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="w-full h-2.5 bg-lumi-lavender rounded-lg appearance-none cursor-pointer accent-lumi-violet"
              aria-label="Adjust angle"
            />
          </div>
        )}

        {isFraction && (
          <div className="flex-1 min-w-[200px] flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-xs font-bold text-lumi-text mb-1">
                <span>Slice Count: {slices} pieces</span>
              </div>
              <input
                type="range"
                min="2"
                max="12"
                value={slices}
                onChange={(e) => {
                  const s = Number(e.target.value);
                  setSlices(s);
                  if (eatenCount > s) setEatenCount(s);
                }}
                className="w-full h-2.5 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                aria-label="Adjust slices"
              />
            </div>
          </div>
        )}

        {isRobot && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => addRobotCommand("forward")}
              className="px-3 py-1.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 text-xs font-bold transition-colors"
            >
              + Step Forward
            </button>
            <button
              type="button"
              onClick={() => addRobotCommand("turn-right")}
              className="px-3 py-1.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 text-xs font-bold transition-colors"
            >
              + Turn Right ↪
            </button>
            <button
              type="button"
              onClick={() => addRobotCommand("turn-left")}
              className="px-3 py-1.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 text-xs font-bold transition-colors"
            >
              + Turn Left ↩
            </button>
            <button
              type="button"
              onClick={runRobot}
              className="px-4 py-1.5 rounded-xl bg-lumi-violet text-white hover:bg-lumi-deep text-xs font-bold transition-all shadow-sm flex items-center gap-1"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Run Code</span>
            </button>
          </div>
        )}

        {/* Light beam color buttons */}
        {!isFraction && !isRobot && !isMoon && (
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setBeamColor("white")}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-bold transition-all border",
                beamColor === "white"
                  ? "bg-lumi-surface text-lumi-deep border-lumi-violet shadow-sm"
                  : "bg-transparent text-lumi-muted border-lumi-border"
              )}
            >
              Sunlight
            </button>
            <button
              type="button"
              onClick={() => setBeamColor("red")}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-bold transition-all border",
                beamColor === "red"
                  ? "bg-red-50 text-red-700 border-red-500 shadow-sm"
                  : "bg-transparent text-lumi-muted border-lumi-border"
              )}
            >
              Red Ray
            </button>
            <button
              type="button"
              onClick={() => setBeamColor("violet")}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-bold transition-all border",
                beamColor === "violet"
                  ? "bg-purple-50 text-purple-700 border-purple-500 shadow-sm"
                  : "bg-transparent text-lumi-muted border-lumi-border"
              )}
            >
              Violet Ray
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
