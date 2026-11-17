"use client";

import { useEffect } from "react";

function observe(selector: string, options: IntersectionObserverInit) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  }, options);

  document.querySelectorAll(selector).forEach((element) => observer.observe(element));
  return observer;
}

export function RevealObserver() {
  useEffect(() => {
    const blocks = observe("[data-reveal]", { rootMargin: "0px 0px -6% 0px", threshold: 0.06 });
    const scenes = observe("[data-scene]", { threshold: 0.32 });
    return () => {
      blocks.disconnect();
      scenes.disconnect();
    };
  }, []);

  return null;
}
