"use client";

import { useEffect, useState } from "react";

/** Checks whether an asset at `path` loads successfully, for optional conditional rendering. */
export function useAssetAvailable(path: string) {
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const img = new window.Image();
    img.onload = () => {
      if (!cancelled) setAvailable(true);
    };
    img.onerror = () => {
      if (!cancelled) setAvailable(false);
    };
    img.src = path;
    return () => {
      cancelled = true;
    };
  }, [path]);

  return available;
}
