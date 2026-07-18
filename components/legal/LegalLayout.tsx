import Link from "next/link";

export function LegalLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-dopaguard-cream px-6 py-12 text-dopaguard-navy">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="text-xs font-semibold text-dopaguard-navyMid/60 hover:text-dopaguard-navyMid">
          ← {process.env.NEXT_PUBLIC_APP_NAME || "Dopaguard"}
        </Link>
        <h1 className="mt-6 text-2xl font-bold">{title}</h1>
        <div className="mt-6 flex flex-col gap-5 text-sm leading-relaxed text-dopaguard-navyMid">{children}</div>
      </div>
    </div>
  );
}
