"use client";

import React, { useRef, useState, useEffect } from "react";
import { PenTool, Eraser, Trash2, X, Download, Undo, Palette, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface DrawingPanelProps {
  onClose: () => void;
  className?: string;
  initialPrompt?: string;
}

const COLOR_PALETTE = [
  { name: "Violet", hex: "#7057E8" },
  { name: "Blue", hex: "#2563EB" },
  { name: "Mint", hex: "#16A34A" },
  { name: "Yellow", hex: "#EAB308" },
  { name: "Coral", hex: "#E11D48" },
  { name: "Orange", hex: "#EA580C" },
  { name: "Ink Dark", hex: "#25233A" },
  { name: "White", hex: "#FFFFFF" },
];

export function DrawingPanel({ onClose, className, initialPrompt }: DrawingPanelProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const [color, setColor] = useState<string>("#7057E8");
  const [brushSize, setBrushSize] = useState<number>(6);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [history, setHistory] = useState<ImageData[]>([]);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas to parent container dimensions
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Fill white background
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Save initial blank state
    setHistory([ctx.getImageData(0, 0, canvas.width, canvas.height)]);
  }, []);

  // Save state for undo
  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    setHistory((prev) => [...prev.slice(-10), ctx.getImageData(0, 0, canvas.width, canvas.height)]);
  };

  const undo = () => {
    if (history.length <= 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const newHistory = [...history];
    newHistory.pop(); // remove current
    const previousState = newHistory[newHistory.length - 1];
    ctx.putImageData(previousState, 0, 0);
    setHistory(newHistory);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveState();
  };

  // Drawing coordinates from pointer event
  const getCoordinates = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.setPointerCapture(e.pointerId);
    setIsDrawing(true);

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = tool === "eraser" ? brushSize * 3 : brushSize;
    ctx.strokeStyle = tool === "eraser" ? "#FFFFFF" : color;
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.closePath();
    try {
      canvas.releasePointerCapture(e.pointerId);
    } catch {
      // Ignored if capture already lost
    }
    setIsDrawing(false);
    saveState();
  };

  const downloadDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `lumi6-discovery-sketch-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div
      className={cn(
        "flex flex-col bg-lumi-surface rounded-3xl border-2 border-lumi-violet shadow-card overflow-hidden",
        className
      )}
    >
      {/* Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-lumi-bg border-b border-lumi-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-lumi-lavender flex items-center justify-center text-lumi-deep">
            <Palette className="w-4 h-4 text-lumi-violet" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-lumi-text">Discovery Sketchpad</h4>
            <p className="text-xs text-lumi-muted">
              {initialPrompt || "Draw your idea, map light rays, or diagram a solution"}
            </p>
          </div>
        </div>

        {/* Actions (Undo, Clear, Save, Close) */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={undo}
            disabled={history.length <= 1}
            className="p-2 rounded-xl text-lumi-text hover:bg-lumi-lavender disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            title="Undo"
            aria-label="Undo last stroke"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={clearCanvas}
            className="p-2 rounded-xl text-lumi-text hover:bg-lumi-coral/20 text-rose-600 transition-colors"
            title="Clear canvas"
            aria-label="Clear canvas"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={downloadDrawing}
            className="p-2 rounded-xl text-lumi-text hover:bg-lumi-lavender transition-colors"
            title="Download drawing"
            aria-label="Download sketch as PNG"
          >
            <Download className="w-4 h-4 text-lumi-violet" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-lumi-muted hover:text-lumi-text hover:bg-lumi-lavender transition-colors ml-1"
            title="Close drawing panel"
            aria-label="Close drawing panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="relative flex-1 bg-white min-h-[300px] sm:min-h-[400px]">
        <canvas
          ref={canvasRef}
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={stopDrawing}
          onPointerCancel={stopDrawing}
          className="absolute inset-0 w-full h-full cursor-crosshair touch-none select-none"
          aria-label="Drawing surface for sketches"
        />
      </div>

      {/* Bottom Tool Selector & Color Palette */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3 sm:p-4 bg-lumi-bg border-t border-lumi-border">
        {/* Tool: Pen vs Eraser */}
        <div className="flex items-center gap-1 bg-lumi-surface p-1 rounded-2xl border border-lumi-border">
          <button
            type="button"
            onClick={() => setTool("pen")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
              tool === "pen"
                ? "bg-lumi-violet text-white shadow-sm"
                : "text-lumi-muted hover:text-lumi-text"
            )}
            aria-label="Pen tool"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Pen</span>
          </button>
          <button
            type="button"
            onClick={() => setTool("eraser")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
              tool === "eraser"
                ? "bg-lumi-violet text-white shadow-sm"
                : "text-lumi-muted hover:text-lumi-text"
            )}
            aria-label="Eraser tool"
          >
            <Eraser className="w-3.5 h-3.5" />
            <span>Eraser</span>
          </button>
        </div>

        {/* Color Palette (Disabled when eraser active) */}
        <div className="flex items-center gap-1.5">
          {COLOR_PALETTE.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => {
                setColor(c.hex);
                setTool("pen");
              }}
              style={{ backgroundColor: c.hex }}
              className={cn(
                "w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 transition-transform relative flex items-center justify-center",
                color === c.hex && tool === "pen"
                  ? "scale-110 border-lumi-text shadow-sm"
                  : "border-white hover:scale-105"
              )}
              title={c.name}
              aria-label={`Select ${c.name} color`}
            >
              {color === c.hex && tool === "pen" && (
                <Check
                  className={cn(
                    "w-3.5 h-3.5",
                    c.hex === "#FFFFFF" || c.hex === "#EAB308" ? "text-lumi-text" : "text-white"
                  )}
                  strokeWidth={3}
                />
              )}
            </button>
          ))}
        </div>

        {/* Brush Size Slider */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-lumi-muted">Size:</span>
          <div className="flex items-center gap-1.5 bg-lumi-surface px-2.5 py-1.5 rounded-xl border border-lumi-border">
            {[3, 6, 12].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setBrushSize(size)}
                className={cn(
                  "w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold transition-colors",
                  brushSize === size
                    ? "bg-lumi-lavender text-lumi-deep font-extrabold"
                    : "text-lumi-muted hover:text-lumi-text"
                )}
                aria-label={`Brush size ${size}`}
              >
                <span
                  className="rounded-full bg-current"
                  style={{ width: `${size}px`, height: `${size}px` }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
