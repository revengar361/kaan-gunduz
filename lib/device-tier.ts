"use client";

export type Tier = "high" | "medium" | "low" | "fallback";

export type DeviceProfile = {
  tier: Tier;
  /** Plane subdivisions per side for the hero wave surface. */
  segments: number;
  dpr: [number, number];
  reducedMotion: boolean;
  webgl: boolean;
};

const FALLBACK: DeviceProfile = {
  tier: "fallback",
  segments: 0,
  dpr: [1, 1],
  reducedMotion: true,
  webgl: false,
};

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

/**
 * Detected once on mount. Deliberately conservative: when a signal is missing
 * we assume the weaker device, because a dropped-frame hero on a mid-range
 * Android is a worse outcome than a slightly simpler one on a desktop.
 */
export function detectDevice(): DeviceProfile {
  if (typeof window === "undefined") return FALLBACK;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const webgl = hasWebGL();

  if (!webgl) return { ...FALLBACK, reducedMotion };
  if (reducedMotion) {
    return { tier: "fallback", segments: 0, dpr: [1, 1], reducedMotion: true, webgl };
  }

  const nav = navigator as Navigator & { deviceMemory?: number };
  const memory = nav.deviceMemory ?? 4;
  const cores = navigator.hardwareConcurrency ?? 4;
  const width = window.innerWidth;
  const coarse = window.matchMedia("(pointer: coarse)").matches;

  if (coarse || width < 768) {
    return { tier: "low", segments: 90, dpr: [1, 1], reducedMotion: false, webgl };
  }

  if (width >= 1280 && cores >= 8 && memory >= 8) {
    return { tier: "high", segments: 220, dpr: [1, 2], reducedMotion: false, webgl };
  }

  return { tier: "medium", segments: 150, dpr: [1, 1.5], reducedMotion: false, webgl };
}
