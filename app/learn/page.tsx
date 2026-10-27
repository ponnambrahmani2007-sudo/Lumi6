import React from "react";
import { LearningWorkspace } from "@/components/learning/LearningWorkspace";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Curiosity Studio — Lumi6",
  description:
    "An interactive thinking space where children aged 8–12 can explore concepts, test predictions with interactive models, sketch ideas, and ask questions.",
};

export default function LearnPage() {
  return <LearningWorkspace />;
}
