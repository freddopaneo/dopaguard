export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-dopaguard-bg">
          {process.env.NEXT_PUBLIC_APP_NAME || "Dopaguard"} — bientôt
        </h1>
        <p className="mt-2 text-slate-500">Fondations du projet en cours de construction.</p>
      </div>
    </div>
  );
}
