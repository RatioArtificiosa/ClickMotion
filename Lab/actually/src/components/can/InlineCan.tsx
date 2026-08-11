import { useEffect, useRef, type MutableRefObject } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Can3D, StudioLights, type StageMotion } from "./Can3D";
import { canvasDpr } from "../../lib/hooks";
import { useInView } from "../../lib/useInView";

type Props = {
  sku: string;
  targetHeight?: number;
  stageMotionRef?: MutableRefObject<StageMotion | null>;
  active?: boolean;
  className?: string;
};

/** Non-hero can: controlled tilt, stageMotion for flavors crossfade. */
export function InlineCan({
  sku,
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
          controlledRotationY={0}
          controlledTiltX={0.16}
          targetHeight={targetHeight}
          stageMotionRef={stageMotionRef}
        />
      </Canvas>
    </div>
  );
}

/** Three stacked cans for flavors (one scene with three refs). */
export function FlavorsCanStage({
  motionRefs,
  activeIndex,
}: {
  motionRefs: MutableRefObject<StageMotion | null>[];
  activeIndex: number;
}) {
  const { ref, inView } = useInView("1500px");
  const skus = ["01", "02", "03"];

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
        {skus.map((sku, i) => (
          <Can3D
            key={sku}
            skuNumber={sku}
            controlledRotationY={0}
            controlledTiltX={0.16}
            targetHeight={2.55}
            stageMotionRef={motionRefs[i]}
          />
        ))}
      </Canvas>
      {/* active index used only so parent can force re-eval if needed */}
      <span className="sr-only" aria-hidden>
        {activeIndex}
      </span>
    </div>
  );
}
