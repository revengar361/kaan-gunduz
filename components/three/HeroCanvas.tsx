"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import MetalWave from "./MetalWave";
import StaticField from "./StaticField";
import { detectDevice, type DeviceProfile } from "@/lib/device-tier";

/**
 * The site's only WebGL canvas.
 *
 * The surface is ambient: it responds to time and pointer, not to scroll, so
 * there is no scroll listener here at all.
 */
export default function HeroCanvas() {
  const [device, setDevice] = useState<DeviceProfile | null>(null);

  useEffect(() => {
    setDevice(detectDevice());
  }, []);

  // Server render and first paint: the static composition. No layout shift,
  // and it is the permanent state for reduced-motion / no-WebGL visitors.
  if (!device || device.tier === "fallback") {
    return <StaticField />;
  }

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={device.dpr}
      gl={{ antialias: device.tier === "high", alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 2.4, 16], fov: 46 }}
      style={{ position: "absolute", inset: 0 }}
      aria-hidden
    >
      <MetalWave segments={device.segments} />
    </Canvas>
  );
}
