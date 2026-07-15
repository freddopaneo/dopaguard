interface HighlightedTextProps {
  text: string;
  excerpts: string[];
}

export function HighlightedText({ text, excerpts }: HighlightedTextProps) {
  const ranges: { start: number; end: number }[] = [];

  for (const excerpt of excerpts) {
    if (!excerpt) continue;
    const start = text.indexOf(excerpt);
    if (start === -1) continue;
    ranges.push({ start, end: start + excerpt.length });
  }

  if (ranges.length === 0) {
    return <>{text}</>;
  }

  ranges.sort((a, b) => a.start - b.start);

  const merged: { start: number; end: number }[] = [];
  for (const range of ranges) {
    const last = merged[merged.length - 1];
    if (last && range.start < last.end) {
      last.end = Math.max(last.end, range.end);
    } else {
      merged.push({ ...range });
    }
  }

  const segments: { text: string; highlighted: boolean }[] = [];
  let cursor = 0;
  for (const range of merged) {
    if (range.start > cursor) {
      segments.push({ text: text.slice(cursor, range.start), highlighted: false });
    }
    segments.push({ text: text.slice(range.start, range.end), highlighted: true });
    cursor = range.end;
  }
  if (cursor < text.length) {
    segments.push({ text: text.slice(cursor), highlighted: false });
  }

  return (
    <>
      {segments.map((segment, index) =>
        segment.highlighted ? (
          <span
            key={index}
            className="rounded bg-dopaguard-critical/10 px-1 py-0.5 font-medium text-dopaguard-critical"
          >
            {segment.text}
          </span>
        ) : (
          <span key={index}>{segment.text}</span>
        )
      )}
    </>
  );
}
