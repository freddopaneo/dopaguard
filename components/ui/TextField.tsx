import type { InputHTMLAttributes } from "react";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function TextField({ label, id, className = "", ...props }: TextFieldProps) {
  return (
    <div className="flex flex-col gap-1 text-left">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={id}
        className={`rounded-md border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none focus:border-dopaguard-accent focus:ring-2 focus:ring-dopaguard-accent/40 ${className}`}
        {...props}
      />
    </div>
  );
}
