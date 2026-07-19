const REASONS = [
  {
    title: "Vos informations évoluent.",
    body: "Nouveaux prix, horaires, offres, équipe, adresse : chaque changement met du temps à être compris par les IA — et en attendant, elles répondent faux.",
  },
  {
    title: "Les IA se mettent à jour sans prévenir.",
    body: "ChatGPT, Gemini et les autres changent de version et de sources régulièrement. Une réponse correcte aujourd'hui peut devenir fausse demain, du jour au lendemain.",
  },
  {
    title: "De nouveaux contenus vous concernant apparaissent.",
    body: "Un avis client, un article de presse, un post : dès qu'un contenu est publié, il peut être absorbé par les IA — y compris un signal négatif que vous n'avez pas vu passer.",
  },
  {
    title: "Vos concurrents avancent.",
    body: "Pendant que vous ne regardez pas, un concurrent qui soigne sa présence en ligne peut vous prendre la place de « recommandé » dans les réponses des IA.",
  },
];

export function WhyContinuousMonitoring() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-14 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-dopaguard-navy sm:text-4xl">
          Vérifier une fois ne sert à rien. Votre réputation IA change chaque semaine.
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-dopaguard-navyMid/80">
          Un scan ponctuel est une photo. Votre réputation, elle, est en mouvement permanent.
          Voici pourquoi la surveillance continue est le seul vrai rempart :
        </p>
      </div>

      <div className="mt-14 grid gap-8 sm:grid-cols-2">
        {REASONS.map((reason, index) => (
          <div key={reason.title} className="flex gap-4 rounded-2xl border border-dopaguard-muted bg-white p-6">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-dopaguard-navy text-sm font-bold text-dopaguard-lime">
              {index + 1}
            </span>
            <div>
              <h3 className="font-semibold text-dopaguard-navy">{reason.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-dopaguard-navyMid/80">{reason.body}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-12 max-w-2xl rounded-2xl bg-dopaguard-navy px-6 py-6 text-center text-base font-medium leading-relaxed text-white">
        C&apos;est exactement pour cela que Dopaguard ne fait pas qu&apos;un scan : il
        surveille, chaque semaine, et vous prévient.{" "}
        <span className="text-dopaguard-lime">Une réputation à jour est une réputation surveillée.</span>
      </p>
    </section>
  );
}
