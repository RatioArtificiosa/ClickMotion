"use client";

/**
 * Spinning Roadster on vertical (Y) axis.
 * Model: /assets/roadster/roadster.glb
 *
 * Hardened for production:
 * - No HDR Environment (avoids network textures + broken-image flash)
 * - No HEAD-check placeholder swap (no red block flash)
 * - Canvas mounts only when the stage is on-screen
 * - Light GPU (dpr cap, soft shadows, single scene instance)
 * - WebGL context-loss recovery without white sad-square stuck state
 */

import {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  Component,
  type ErrorInfo,
  type ReactNode,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Clone, ContactShadows, useGLTF } from "@react-three/drei";
import * as THREE from "three";

export const ROADSTER_GLB = "/assets/roadster/roadster.glb";

/** Radians / second around Y. Keep in sync with capture clock. */
export const SPIN_SPEED = 0.32;
const MODEL_SCALE = 0.72;
const MODEL_Y = 0.22;
/** Initial Y on the group (also used when capture drives absolute angle). */
const SPIN_BASE_Y = Math.PI * 0.15;

declare global {
  interface Window {
    /**
     * Storefront capture only: presentation seconds since encode t=0.
     * When set, spin is angle = SPIN_BASE + t * SPIN_SPEED (1×), not wall-clock dt
     * (screenshot settle waits otherwise make the GLB spin 3-5x too fast).
     */
    __MS_CAPTURE_CLOCK?: number | null;
  }
}

// Warm the GLB cache as soon as this module loads (no placeholder phase).
if (typeof window !== "undefined") {
  try {
    useGLTF.preload(ROADSTER_GLB);
  } catch {
    /* ignore */
  }
}

type Props = {
  reduced?: boolean;
  className?: string;
  /** When false, dispose Canvas (parent sheet still off-screen). Default true. */
  active?: boolean;
};

function SpinningModel({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  // Cached GLB. Clone instance so Canvas remounts never re-parent a disposed graph.
  const { scene } = useGLTF(ROADSTER_GLB);

  useFrame((_, dt) => {
    if (reduced || !group.current) return;
    // Capture: absolute angle from presentation clock (see window.__MS_CAPTURE_CLOCK)
    const cap =
      typeof window !== "undefined" ? window.__MS_CAPTURE_CLOCK : null;
    if (typeof cap === "number" && Number.isFinite(cap)) {
      group.current.rotation.y = SPIN_BASE_Y + cap * SPIN_SPEED;
      return;
    }
    // Cap dt so tab-return doesn't spin wildly
    const step = Math.min(dt, 0.05);
    group.current.rotation.y += step * SPIN_SPEED;
  });

  return (
    <group
      ref={group}
      position={[0, MODEL_Y, 0]}
      rotation={[0, SPIN_BASE_Y, 0]}
      scale={MODEL_SCALE}
    >
      <Center top={false}>
        <Clone object={scene} castShadow receiveShadow />
      </Center>
    </group>
  );
}

function Scene({ reduced }: { reduced: boolean }) {
  return (
    <>
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 7, 3]} intensity={1.2} castShadow={false} />
      <directionalLight position={[-3, 2, -2]} intensity={0.4} />
      <directionalLight position={[0, 3, 5]} intensity={0.35} />

      <Suspense fallback={null}>
        <SpinningModel reduced={reduced} />
      </Suspense>

      <ContactShadows
        position={[0, -0.02, 0]}
        opacity={0.4}
        scale={7}
        blur={2.2}
        far={2.5}
        frames={1}
      />
    </>
  );
}

/** Catches R3F render errors so we can remount instead of white void. */
class CanvasErrorBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    this.props.onError();
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

export default function RoadsterTurntable({
  reduced = false,
  className = "",
  active = true,
}: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [canvasKey, setCanvasKey] = useState(0);
  const [dead, setDead] = useState(false);

  // Only create a WebGL context when the sheet stage is actually visible.
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        const show =
          entry.isIntersecting && entry.intersectionRatio >= 0.08;
        setInView(show);
      },
      { threshold: [0, 0.08, 0.2, 0.5], rootMargin: "40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const recover = useCallback(() => {
    setDead(false);
    setCanvasKey((k) => k + 1);
  }, []);

  const onBoundaryError = useCallback(() => {
    setDead(true);
    // Soft recover after a beat (context often recovers after dispose)
    window.setTimeout(() => recover(), 400);
  }, [recover]);

  const mountCanvas = active && inView && !dead;

  return (
    <div
      ref={hostRef}
      className={`relative h-full w-full bg-black ${className}`}
    >
      {mountCanvas ? (
        <CanvasErrorBoundary key={`bound-${canvasKey}`} onError={onBoundaryError}>
          <Canvas
            key={`gl-${canvasKey}`}
            camera={{ position: [0, 1.05, 4.2], fov: 32, near: 0.1, far: 40 }}
            dpr={[1, 1.5]}
            gl={{
              antialias: true,
              alpha: false,
              powerPreference: "default",
              failIfMajorPerformanceCaveat: false,
              stencil: false,
              depth: true,
            }}
            frameloop={reduced ? "demand" : "always"}
            style={{ background: "#000", width: "100%", height: "100%" }}
            onCreated={({ gl }) => {
              gl.setClearColor(0x000000, 1);
              const canvas = gl.domElement;
              const onLost = (e: Event) => {
                e.preventDefault();
                setDead(true);
                window.setTimeout(() => recover(), 500);
              };
              const onRestored = () => {
                setDead(false);
                setCanvasKey((k) => k + 1);
              };
              canvas.addEventListener("webglcontextlost", onLost, false);
              canvas.addEventListener("webglcontextrestored", onRestored, false);
            }}
          >
            <Scene reduced={reduced} />
          </Canvas>
        </CanvasErrorBoundary>
      ) : (
        <div className="absolute inset-0 bg-black" aria-hidden />
      )}
    </div>
  );
}
