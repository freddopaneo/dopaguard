import Link from "next/link";

export default function BienvenuePage() {
  return (
    <div
      className="flex min-h-screen items-center justify-center px-6"
      style={{ background: "linear-gradient(135deg, #133742 0%, #0d2e38 100%)" }}
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-[0_20px_60px_-15px_rgba(13,46,56,0.35)]">
        <h1 className="text-xl font-bold text-dopaguard-navy">Paiement enregistré, merci !</h1>
        <p className="mt-3 text-sm leading-relaxed text-dopaguard-navyMid">
          Un email avec votre lien de connexion vient de vous être envoyé.
        </p>
        <p className="mt-4 text-xs text-dopaguard-navyMid/60">
          Vous ne le recevez pas ?{" "}
          <Link href="/login" className="font-medium text-dopaguard-navy underline">
            Demandez un nouveau lien
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
