"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * The hero: a large graphite surface undulating like brushed metal or silk,
 * lit from behind so its crests catch an ember rim light.
 *
 * The surface is deliberately NOT scroll-reactive. It keeps its full character
 * at every scroll position and simply lives — the only inputs are time and a
 * slight pointer tilt. The chaos-to-system idea is carried by the pinned method
 * sequence further down the page, not by flattening the hero.
 *
 * Height is a sum of sines rather than sampled noise — deterministic, cheap,
 * and analytically differentiable, so exact normals come from four extra
 * evaluations in the vertex shader with no normal map or lighting rig.
 */

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uAmp;

  varying vec3 vNormal;
  varying vec3 vView;
  varying float vElev;
  varying float vDepth;

  // Layered swell: three long components plus three finer ones that give the
  // surface its texture. All six are always present.
  float wave(vec2 p, float t) {
    float h = 0.0;
    h += sin(p.x * 0.30 + t * 0.28) * 1.00;
    h += sin(p.y * 0.24 - t * 0.22) * 0.80;
    h += sin((p.x + p.y) * 0.19 + t * 0.17) * 0.60;
    h += sin((p.x - p.y) * 0.37 - t * 0.31) * 0.42;
    h += sin(p.x * 0.72 + p.y * 0.18 + t * 0.44) * 0.26;
    h += sin(p.y * 0.95 - p.x * 0.22 - t * 0.52) * 0.15;
    return h;
  }

  void main() {
    vec2 p = position.xy;
    float t = uTime;

    float h = wave(p, t) * uAmp;

    // Analytic-ish normal from central differences on the same function.
    float e = 0.45;
    float hL = wave(p - vec2(e, 0.0), t) * uAmp;
    float hR = wave(p + vec2(e, 0.0), t) * uAmp;
    float hD = wave(p - vec2(0.0, e), t) * uAmp;
    float hU = wave(p + vec2(0.0, e), t) * uAmp;
    vec3 n = normalize(vec3(hL - hR, hD - hU, 2.0 * e));

    vec4 mv = modelViewMatrix * vec4(p.x, p.y, h, 1.0);

    vNormal = normalize(normalMatrix * n);
    vView = -mv.xyz;
    vDepth = -mv.z;
    vElev = h;

    gl_Position = projectionMatrix * mv;
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uHi;
  uniform vec3 uSignal;

  varying vec3 vNormal;
  varying vec3 vView;
  varying float vElev;
  varying float vDepth;

  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(vView);
    vec3 L = normalize(vec3(0.30, 0.62, 0.72));

    float diff = max(dot(N, L), 0.0);
    float fres = pow(1.0 - max(dot(N, V), 0.0), 3.0);

    vec3 H = normalize(L + V);
    float spec = pow(max(dot(N, H), 0.0), 56.0);

    // Graphite body. The ambient floor keeps the ridges legible across the
    // whole width instead of collapsing to black wherever the key light misses.
    vec3 color = uBase + uHi * (0.09 + diff * 0.92);

    // The single accent: an ember rim where the surface turns away.
    color += uSignal * fres * 0.62;

    // Crests catch the light.
    float crest = smoothstep(0.45, 1.75, vElev);
    color += uSignal * crest * 0.10;
    color += vec3(spec) * 0.22;

    // Dissolve into the page ground at distance so there is no hard edge.
    float fade = clamp(1.0 - (vDepth - 12.0) / 40.0, 0.0, 1.0);

    gl_FragColor = vec4(color, fade);
  }
`;

type Props = {
  /** Plane subdivisions per side. Scales with device tier. */
  segments: number;
  /** Render one composed frame and never animate. */
  still?: boolean;
};

export default function MetalWave({ segments, still = false }: Props) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const group = useRef<THREE.Group>(null);
  const pointer = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();

  const geometry = useMemo(
    () => new THREE.PlaneGeometry(120, 80, segments, Math.round(segments * 0.7)),
    [segments]
  );

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: 1.35 },
      uBase: { value: new THREE.Color("#0b0b0e") },
      uHi: { value: new THREE.Color("#6e6e7e") },
      uSignal: { value: new THREE.Color("#ff4d1c") },
    }),
    []
  );

  useFrame((state, delta) => {
    if (still || !material.current) return;

    material.current.uniforms.uTime.value += delta;

    const px = (state.pointer.x * viewport.width) / 90;
    const py = (state.pointer.y * viewport.height) / 90;
    pointer.current.x += (px - pointer.current.x) * Math.min(delta * 1.8, 1);
    pointer.current.y += (py - pointer.current.y) * Math.min(delta * 1.8, 1);

    if (group.current) {
      group.current.rotation.z = pointer.current.x * 0.03;
      group.current.position.y = -3.2 + pointer.current.y * 0.6;
    }
  });

  return (
    <group ref={group} position={[0, -3.2, 0]}>
      <mesh geometry={geometry} rotation={[-1.19, 0, 0]} position={[0, 0, -14]} frustumCulled={false}>
        <shaderMaterial
          ref={material}
          vertexShader={VERTEX}
          fragmentShader={FRAGMENT}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
