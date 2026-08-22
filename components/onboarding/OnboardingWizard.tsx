"use client";

import { useState } from "react";
import { BrandInfoStep } from "./BrandInfoStep";
import { TruthSheetStep } from "./TruthSheetStep";
import { PromptSelectionStep } from "./PromptSelectionStep";
import { ConfirmationStep } from "./ConfirmationStep";
import { PROVIDER_ORDER, ALL_PROVIDERS, PROVIDER_LABELS } from "@/lib/providers";

type Step = 1 | 2 | 3 | 4 | "done";

interface Props {
  initialStep: Step;
  brandId?: string;
  brandName?: string;
}

function SuccessScreen({ plan }: { plan: string | null }) {
  const providers = (plan === "essentiel" ? PROVIDER_ORDER : ALL_PROVIDERS).map((p) => PROVIDER_LABELS[p]);

  return (
    <div className="py-8 text-center">
      <h2 className="text-lg font-semibold text-dopaguard-navy">Configuration terminée !</h2>
      <p className="mt-3 text-sm leading-relaxed text-dopaguard-navyMid">
        Votre première analyse est en cours ({providers.join(", ")}) — elle prend quelques minutes. Revenez sur
        votre tableau de bord d&apos;ici là, il se remplira automatiquement.
      </p>
      <a
        href="/dashboard"
        className="mt-6 inline-block rounded-lg border border-dopaguard-navy/20 px-5 py-2.5 text-sm font-semibold text-dopaguard-navy transition-colors hover:bg-dopaguard-muted"
      >
        Voir mon tableau de bord →
      </a>
    </div>
  );
}

export function OnboardingWizard({ initialStep, brandId: initialBrandId, brandName: initialBrandName }: Props) {
  const [step, setStep] = useState<Step>(initialStep);
  const [brandId, setBrandId] = useState(initialBrandId ?? "");
  const [brandName, setBrandName] = useState(initialBrandName ?? "");
  const [promptCount, setPromptCount] = useState(0);
  const [plan, setPlan] = useState<string | null>(null);

  if (step === "done") {
    return <SuccessScreen plan={plan} />;
  }

  return (
    <div>
      <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-dopaguard-navyMid/50">
        Étape {step} sur 4
      </p>
      {step === 1 && (
        <BrandInfoStep
          onDone={(id, name) => {
            setBrandId(id);
            setBrandName(name);
            setStep(2);
          }}
        />
      )}
      {step === 2 && <TruthSheetStep brandId={brandId} onDone={() => setStep(3)} />}
      {step === 3 && (
        <PromptSelectionStep
          brandId={brandId}
          brandName={brandName}
          onDone={(count) => {
            setPromptCount(count);
            setStep(4);
          }}
        />
      )}
      {step === 4 && (
        <ConfirmationStep
          brandId={brandId}
          brandName={brandName}
          promptCount={promptCount}
          onDone={(completedPlan) => {
            setPlan(completedPlan);
            setStep("done");
          }}
        />
      )}
    </div>
  );
}
