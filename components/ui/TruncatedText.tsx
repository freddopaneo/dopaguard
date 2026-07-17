"use client";

import { useState } from "react";
import { HighlightedText } from "@/components/HighlightedText";

interface TruncatedTextProps {
  text: string;
  previewLength?: number;
  highlightExcerpts?: string[];
  className?: string;
  toggleClassName?: string;
}

export function TruncatedText({ text, previewLength = 300, highlightExcerpts, className, toggleClassName }: TruncatedTextProps) {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > previewLength;
  const displayText = !expanded && isLong ? `${text.slice(0, previewLength)}…` : text;

  return (
    <>
      <p className={className}>
        {highlightExcerpts ? <HighlightedText text={displayText} excerpts={highlightExcerpts} /> : displayText}
      </p>
      {isLong && (
        <button type="button" onClick={() => setExpanded((e) => !e)} className={toggleClassName}>
          {expanded ? "Réduire" : "Lire la suite"}
        </button>
      )}
    </>
  );
}
