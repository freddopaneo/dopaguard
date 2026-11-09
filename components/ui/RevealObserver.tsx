"use client";

import { useEffect } from "react";

/**
 * Scroll reveal: every element carrying `data-reveal` gets the `is-vu` class when it
 * enters the viewport (CSS in globals.css). Without JavaScript nothing is hidden, so
 * SEO and accessibility are unaffected. Honors prefers-reduced-motion.
 */
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;

    root.classList.add("has-js");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-vu");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    const observeAll = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-vu)").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) el.classList.add("is-vu");
        else io.observe(el);
      });
    };
    observeAll();

    // Elements rendered later (client components, route changes) are picked up too.
    const mo = new MutationObserver(() => observeAll());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      root.classList.remove("has-js");
    };
  }, []);

  return null;
}
