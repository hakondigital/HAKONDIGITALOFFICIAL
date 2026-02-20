"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";

interface SplitTextOptions {
  type?: "words" | "chars" | "lines";
  stagger?: number;
  duration?: number;
  delay?: number;
  y?: number;
}

export function useSplitTextReveal(options: SplitTextOptions = {}) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const split = new SplitType(el, {
      types: options.type === "chars" ? "chars" : options.type === "lines" ? "lines" : "words",
    });

    const targets =
      options.type === "chars"
        ? split.chars
        : options.type === "lines"
        ? split.lines
        : split.words;

    if (!targets) return;

    gsap.set(targets, {
      y: options.y ?? 40,
      opacity: 0,
    });

    gsap.to(targets, {
      y: 0,
      opacity: 1,
      duration: options.duration ?? 0.8,
      stagger: options.stagger ?? 0.04,
      delay: options.delay ?? 0.2,
      ease: "power3.out",
    });

    return () => {
      split.revert();
    };
  }, [options]);

  return elementRef;
}
