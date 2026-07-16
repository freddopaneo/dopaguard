"use client";

import { useState } from "react";
import { BrandInfoStep } from "./BrandInfoStep";
import { TruthSheetStep } from "./TruthSheetStep";
import { PromptSelectionStep } from "./PromptSelectionStep";
import { ConfirmationStep } from "./ConfirmationStep";

type Step = 1 | 2 | 3 | 4 | "done";

interface Props {
  initialStep: Step;
  brandId?: string;
  brandName?: string;
}

function SuccessScreen() {
  return (
    <div className="py-8 text-center">
      <h2 className="text-lg font-semibold text-dopaguard-navy">Configuration terminée !</h2>
      <p className="mt-3 text-sm leading-relaxed text-dopaguard-navyMid">
        Votre première analyse arrive très prochainement. Vous recevrez un email dès qu&apos;elle sera disponible.
      </p>
    </div>
  );
}

export function OnboardingWizard({ initialStep, brandId: initialBrandId, brandName: initialBrandName }: Props) {
  const [step, setStep] = useState<Step>(initialStep);
  const [brandId, setBrandId] = useState(initialBrandId ?? "");
  const [brandName, setBrandName] = useState(initialBrandName ?? "");
  const [promptCount, setPromptCount] = useState(0);

  if (step === "done") {
    return <SuccessScreen />;
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
        <ConfirmationStep brandId={brandId} brandName={brandName} promptCount={promptCount} onDone={() => setStep("done")} />
      )}
    </div>
  );
}
