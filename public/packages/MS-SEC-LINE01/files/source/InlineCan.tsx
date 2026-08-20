"use client";

import { useEffect, useRef, type MutableRefObject } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Can3D, StudioLights, type StageMotion } from "./Can3D";
import { canvasDpr } from "./hooks";
import { useInView } from "./useInView";

type Props = {
  sku: string;
  labelUrl?: string;
  meshUrl?: string;
  targetHeight?: number;
  stageMotionRef?: MutableRefObject<StageMotion | null>;
  active?: boolean;
  className?: string;
};

/** Non-hero can: controlled tilt, stageMotion for flavors crossfade. */
export function InlineCan({
  sku,
  labelUrl,
  meshUrl,
  targetHeight = 2.55,
  stageMotionRef,
  active = true,
  className = "",
}: Props) {
  const { ref, inView } = useInView("600px");

  return (
    <div ref={ref} className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        dpr={canvasDpr()}
        frameloop={inView && active ? "always" : "never"}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
        camera={{ position: [0, 0.3, 7.6], fov: 26 }}
        className="!absolute !inset-0 !pointer-events-none"
      >
        <StudioLights />
        <Can3D
          skuNumber={sku}
          labelUrl={labelUrl}
          meshUrl={meshUrl}
          controlledRotationY={0}
          controlledTiltX={0.16}
          targetHeight={targetHeight}
          stageMotionRef={stageMotionRef}
        />
      </Canvas>
    </div>
  );
}

/** Stacked product meshes for lineup stage (one canvas; refs length = catalog). */
export function FlavorsCanStage({
  motionRefs,
  activeIndex,
  skus,
  labelUrls,
  meshUrls,
}: {
  motionRefs: MutableRefObject<StageMotion | null>[];
  activeIndex: number;
  /** SKU numbers mapped to label textures (default 01/02/03). */
  skus?: string[];
  /** Parallel label paths from product.labelPath */
  labelUrls?: (string | undefined)[];
  /** Parallel mesh paths from product.meshPath */
  meshUrls?: (string | undefined)[];
}) {
  const { ref, inView } = useInView("1500px");
  const list =
    skus && skus.length
      ? skus
      : motionRefs.map((_, i) => String(i + 1).padStart(2, "0"));

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none">
      <Canvas
        dpr={canvasDpr()}
        frameloop={inView ? "always" : "never"}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
        camera={{ position: [0, 0.3, 7.6], fov: 26 }}
        className="!absolute !inset-0 !pointer-events-none"
      >
        <StudioLights />
        {list.map((sku, i) => (
          <Can3D
            key={`${sku}-${i}`}
            skuNumber={sku}
            labelUrl={labelUrls?.[i]}
            meshUrl={meshUrls?.[i] || "/models/can.glb"}
            controlledRotationY={0}
            controlledTiltX={0.16}
            targetHeight={2.55}
            stageMotionRef={motionRefs[i]}
          />
        ))}
      </Canvas>
      <span className="sr-only" aria-hidden>
        {activeIndex}
      </span>
    </div>
  );
}
