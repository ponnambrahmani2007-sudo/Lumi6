"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Lightbulb, HelpCircle, Bot, User, CheckCircle2 } from "lucide-react";
import { ChatMessage } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ThinkingCompanionProps {
  currentQuestion?: string;
  onSelectAction?: (action: string) => void;
  className?: string;
}

export function ThinkingCompanion({
  currentQuestion = "Why does a rainbow have different colors?",
  className,
}: ThinkingCompanionProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      sender: "companion",
      text: `Hello, investigator! I'm Lumi, your curious thinking companion. We're exploring: "${currentQuestion}". What do you notice when looking at the experiment?`,
      timestamp: "Just now",
      type: "encouragement",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [hintIndex, setHintIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const curatedHints = [
    "Notice where the light enters the glass. It bends because glass is denser than air!",
    "Different colors bend by different amounts. Violet bends the sharpest; red bends the gentlest.",
    "Try rotating the angle slider! When the angle changes, does the rainbow band spread out wider or narrower?",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // When question prop changes, update initial companion message
  useEffect(() => {
    if (currentQuestion) {
      setMessages([
        {
          id: `msg-welcome-${Date.now()}`,
          sender: "companion",
          text: `Welcome to our workshop! We're exploring: "${currentQuestion}". Before changing anything, what do you predict will happen?`,
          timestamp: "Just now",
          type: "encouragement",
        },
      ]);
      setHintIndex(0);
    }
  }, [currentQuestion]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputText.trim();
    if (!query) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    // Simulate friendly thoughtful companion response
    setTimeout(() => {
      let reply = "That is a wonderful observation! When you test that idea, watch how the visual lines respond.";
      if (query.toLowerCase().includes("why") || query.toLowerCase().includes("how")) {
        reply = "Great question! That gets right to how energy and light work. Try adjusting the slider on the left to see if the colors change!";
      } else if (query.toLowerCase().includes("color") || query.toLowerCase().includes("red") || query.toLowerCase().includes("blue")) {
        reply = "You noticed the colors! Each color actually travels as a wave with its own unique wavelength.";
      } else if (query.toLowerCase().includes("bend") || query.toLowerCase().includes("glass")) {
        reply = "Spot on! That bending is called refraction. Glass slows down light just enough to turn its direction.";
      }

      const companionReply: ChatMessage = {
        id: `companion-${Date.now()}`,
        sender: "companion",
        text: reply,
        timestamp: "Just now",
        type: "encouragement",
      };
      setMessages((prev) => [...prev, companionReply]);
    }, 600);
  };

  const handleRequestHint = () => {
    const hintText = curatedHints[hintIndex % curatedHints.length];
    setHintIndex((prev) => prev + 1);

    const hintMessage: ChatMessage = {
      id: `hint-${Date.now()}`,
      sender: "companion",
      text: `💡 Hint: ${hintText}`,
      timestamp: "Just now",
      type: "hint",
    };
    setMessages((prev) => [...prev, hintMessage]);
  };

  const handleRequestExplanation = () => {
    const explanationMessage: ChatMessage = {
      id: `explain-${Date.now()}`,
      sender: "companion",
      text: "✨ Complete Explanation: White light looks plain, but it contains all the colors of the rainbow together. Inside glass, light travels slower than in air. Because violet light waves are shorter, they get slowed and bent more than red waves. This separates the colors into a stunning spectrum!",
      timestamp: "Just now",
      type: "explanation",
    };
    setMessages((prev) => [...prev, explanationMessage]);
  };

  const quickPrompts = [
    "What do you notice?",
    "Why does it bend?",
    "Can we make it wider?",
  ];

  return (
    <div
      className={cn(
        "flex flex-col bg-lumi-surface rounded-3xl border border-lumi-border shadow-subtle overflow-hidden h-[540px] sm:h-[600px]",
        className
      )}
    >
      {/* Top Header: Companion Identity */}
      <div className="flex items-center justify-between p-4 bg-lumi-bg border-b border-lumi-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-lumi-violet to-lumi-deep text-white flex items-center justify-center shadow-sm">
            <Sparkles className="w-5 h-5 text-lumi-yellow animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm font-extrabold text-lumi-text">Lumi</h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-lumi-mint text-lumi-text border border-lumi-mint">
                Friendly Companion
              </span>
            </div>
            <p className="text-xs text-lumi-muted">Thinking & inquiry partner</p>
          </div>
        </div>

        {/* Quick action badges */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleRequestHint}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-lumi-lavender text-lumi-deep text-xs font-bold hover:bg-[#E5DEFF] transition-colors active:scale-95"
            title="Ask for a clue"
          >
            <HelpCircle className="w-3.5 h-3.5 text-lumi-violet" />
            <span className="hidden sm:inline">Hint</span>
          </button>
          <button
            type="button"
            onClick={handleRequestExplanation}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-lumi-yellow text-lumi-text text-xs font-bold hover:bg-[#FCD04B] transition-colors active:scale-95"
            title="Get full explanation"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-700" />
            <span className="hidden sm:inline">Explain</span>
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isCompanion = msg.sender === "companion";
          return (
            <div
              key={msg.id}
              className={cn("flex gap-2.5 items-start", isCompanion ? "justify-start" : "justify-end")}
            >
              {isCompanion && (
                <div className="w-7 h-7 rounded-xl bg-lumi-lavender text-lumi-deep flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4 text-lumi-violet" />
                </div>
              )}

              <div
                className={cn(
                  "p-3.5 rounded-2xl max-w-[85%] text-xs sm:text-sm leading-relaxed",
                  isCompanion
                    ? msg.type === "hint"
                      ? "bg-lumi-lavender/70 border border-lumi-violet/30 text-lumi-text font-medium"
                      : msg.type === "explanation"
                      ? "bg-amber-50 border border-lumi-yellow text-lumi-text font-medium"
                      : "bg-lumi-bg border border-lumi-border text-lumi-text font-normal"
                    : "bg-lumi-violet text-white font-medium"
                )}
              >
                {msg.text}
              </div>

              {!isCompanion && (
                <div className="w-7 h-7 rounded-xl bg-lumi-violet text-white flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Carousel */}
      <div className="px-4 py-2 bg-lumi-bg/50 border-t border-lumi-border flex gap-1.5 overflow-x-auto no-scrollbar">
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => setInputText(prompt)}
            className="text-xs px-2.5 py-1 rounded-lg bg-lumi-surface border border-lumi-border text-lumi-muted hover:text-lumi-violet hover:border-lumi-violet shrink-0 transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSendMessage}
        className="p-3 bg-lumi-surface border-t border-lumi-border flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask Lumi a question or share what you notice..."
          className="flex-1 px-4 py-2.5 rounded-xl bg-lumi-bg border border-lumi-border text-xs sm:text-sm text-lumi-text placeholder:text-lumi-muted focus:bg-white focus:outline-none focus:ring-2 focus:ring-lumi-violet"
          aria-label="Ask a question"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-2.5 rounded-xl bg-lumi-violet text-white hover:bg-lumi-deep disabled:opacity-40 disabled:hover:bg-lumi-violet transition-colors active:scale-95 shrink-0"
          aria-label="Send question"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
