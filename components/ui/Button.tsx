import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md bg-dopaguard-bg px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-dopaguard-accent hover:text-dopaguard-bg disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}
