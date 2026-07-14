import type { InputHTMLAttributes } from "react";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function TextField({ label, id, className = "", ...props }: TextFieldProps) {
  return (
    <div className="flex flex-col gap-1.5 text-left">
      <label htmlFor={id} className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </label>
      <input
        id={id}
        className={`rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-300 outline-none transition-colors focus:border-dopaguard-navy focus:ring-4 focus:ring-dopaguard-navy/10 ${className}`}
        {...props}
      />
    </div>
  );
}
