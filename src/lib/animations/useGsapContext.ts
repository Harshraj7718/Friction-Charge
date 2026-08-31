"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";
import { gsap, registerGsap } from "./gsap";

/**
 * Runs `setup` inside a gsap.context() scoped to the returned ref, and
 * reverts every tween/ScrollTrigger created inside it on unmount or when
 * `deps` change. This is the single place animation cleanup happens so
 * individual sections never leak ScrollTrigger instances.
 */
export function useGsapContext<T extends HTMLElement = HTMLDivElement>(
  setup: (context: { scope: T; gsap: typeof gsap }) => void,
  deps: React.DependencyList = []
): RefObject<T | null> {
  const scopeRef = useRef<T | null>(null);

  useLayoutEffect(() => {
    if (!scopeRef.current) return;
    registerGsap();

    const ctx = gsap.context(() => {
      setup({ scope: scopeRef.current as T, gsap });
    }, scopeRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scopeRef;
}
