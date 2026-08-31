"use client";

import { useEffect, useRef, useState } from "react";
import { countUp } from "@/lib/animations/counter";
import { registerGsap } from "@/lib/animations/gsap";

type AnimatedCounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  formatter?: (value: number) => string;
  className?: string;
};

const defaultFormatter = (value: number) => Math.round(value).toLocaleString("en-IN");

export default function AnimatedCounter({ value, prefix = "", suffix = "", formatter = defaultFormatter, className }: AnimatedCounterProps) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    registerGsap();
    if (!ref.current) return;
    countUp({ to: value, onUpdate: setDisplay, trigger: ref.current });
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatter(display)}
      {suffix}
    </span>
  );
}
