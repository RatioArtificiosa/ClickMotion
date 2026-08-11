import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { MutableRefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

const pe = (35 * Math.PI) / 180;
const pt = -((Math.PI / 180) * 540);
const pn = 1.4 * Math.PI;

// Can labels: *-2.png variants (same base name as original still labels)
export const LABEL_MAP: Record<string, string> = {
  "01": "/textures/labels/still-01-clear-2.png",
  "02": "/textures/labels/still-02-dawn-2.png",
  "03": "/textures/labels/still-03-dusk-2.png",
};

export type StageMotion = {
  x?: number;
  y: number;
  rotZ?: number;
  scale: number;
  opacity: number;
};

type Props = {
  skuNumber?: string;
  rotationPeriodSeconds?: number;
  initialRotationY?: number;
  enableTilt?: boolean;
  heroMotion?: boolean;
  scrollTriggerEl?: HTMLElement | null;
  startEntrance?: boolean;
  onDragStart?: () => void;
  controlledRotationY?: number;
  controlledTiltX?: number;
  enableParallax?: boolean;
  targetHeight?: number;
  materialOpacityRef?: MutableRefObject<number | null>;
  externalScrollRotRef?: MutableRefObject<number | null>;
  externalTiltRef?: MutableRefObject<number | null>;
  pointerFollowRef?: MutableRefObject<{
    x: number;
    y: number;
    active: boolean;
  } | null>;
  pointerRotYRef?: MutableRefObject<number | null>;
  lockBlendRef?: MutableRefObject<number | null>;
  dollyRef?: MutableRefObject<number | null>;
  stageMotionRef?: MutableRefObject<StageMotion | null>;
};

export function Can3D({
  skuNumber = "01",
  rotationPeriodSeconds = 30,
  initialRotationY = 0,
  enableTilt = true,
  heroMotion = false,
  scrollTriggerEl = null,
  startEntrance = true,
  onDragStart,
  controlledRotationY,
  controlledTiltX = 0,
  enableParallax = false,
  targetHeight = 2.2,
  materialOpacityRef,
  externalScrollRotRef,
  externalTiltRef,
  pointerFollowRef,
  pointerRotYRef,
  lockBlendRef,
  dollyRef,
  stageMotionRef,
}: Props) {
  const group = useRef<THREE.Group>(null);
  const { gl } = useThree();
  const { scene } = useGLTF("/models/can.glb");

  const labelTex = useMemo(() => {
    if (typeof document === "undefined") return null;
    const url = LABEL_MAP[skuNumber] ?? LABEL_MAP["01"];
    const n = new THREE.TextureLoader().load(url);
    n.colorSpace = THREE.SRGBColorSpace;
    n.anisotropy = 16;
    n.minFilter = THREE.LinearMipmapLinearFilter;
    n.magFilter = THREE.LinearFilter;
    n.generateMipmaps = true;
    n.wrapS = THREE.RepeatWrapping;
    n.wrapT = THREE.ClampToEdgeWrapping;
    n.flipY = false;
    n.center.set(0.5, 0.5);
    n.offset.x = -0.14;
    n.offset.y = -0.34;
    n.repeat.set(1, 1);
    n.rotation = 0;
    return n;
  }, [skuNumber]);

  const metalMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#C8C8C8",
        metalness: 0.95,
        roughness: 0.42,
        envMapIntensity: 0.85,
        transparent: true,
        opacity: heroMotion ? 0 : 1,
      }),
    [heroMotion],
  );

  const labelMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: labelTex,
        color: "#ffffff",
        metalness: 0.05,
        roughness: 0.65,
        envMapIntensity: 0.6,
        transparent: true,
        opacity: heroMotion ? 0 : 1,
      }),
    [labelTex, heroMotion],
  );

  const model = useMemo(() => {
    if (!scene) return null;
    const e = scene.clone(true);
    const meshes: THREE.Mesh[] = [];
    e.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) meshes.push(o as THREE.Mesh);
    });
    if (!meshes.length) return e;
    const box = new THREE.Box3().setFromObject(e);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const a = size.y > 0 ? targetHeight / size.y : 1;
    e.scale.setScalar(a);
    e.position.set(-center.x * a, -center.y * a, -center.z * a);

    let body =
      meshes.length === 1
        ? meshes[0]
        : meshes.find((m) =>
            /body|label|main|side|cylinder/i.test(m.name),
          ) ||
          meshes.reduce((best, m) => {
            const c = m.geometry.attributes.position?.count ?? 0;
            const bc = best.geometry.attributes.position?.count ?? 0;
            return c > bc ? m : best;
          });

    for (const m of meshes) {
      m.material = m === body ? labelMat : metalMat;
      m.castShadow = true;
      m.receiveShadow = true;
    }
    return e;
  }, [scene, labelMat, metalMat, targetHeight]);

  const t0 = useRef(0);
  const entered = useRef(false);
  const dragYaw = useRef(0);
  const dragPitch = useRef(0);
  const scrollRot = useRef(0);
  const dragging = useRef(false);
  const hover = useRef(false);
  const dragStarted = useRef(false);
  const ptrX = useRef(0);
  const ptrY = useRef(0);
  const baseYaw = useRef(0);
  const basePitch = useRef(0);
  const paraY = useRef(0);
  const paraX = useRef(0);
  const followX = useRef(0);
  const followY = useRef(0);
  const followPrevX = useRef(0);
  const roll = useRef(0);
  const scaleS = useRef(1);
  const lastYaw = useRef(0);
  const smoothPtrYaw = useRef(0);

  useEffect(() => {
    if (!heroMotion || !scrollTriggerEl || externalScrollRotRef) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: scrollTriggerEl,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (e) => {
          if (!dragging.current) scrollRot.current = e.progress * pn;
        },
      });
    });
    return () => ctx.revert();
  }, [heroMotion, scrollTriggerEl, externalScrollRotRef]);

  useEffect(() => {
    if (heroMotion && startEntrance) {
      t0.current = performance.now() / 1000;
      entered.current = false;
    }
  }, [heroMotion, startEntrance]);

  useEffect(() => {
    return () => {
      labelTex?.dispose();
      metalMat.dispose();
      labelMat.dispose();
    };
  }, [labelTex, metalMat, labelMat]);

  const setCursor = (c: string) => {
    const el = gl.domElement;
    if (document.documentElement.classList.contains("has-custom-cursor")) {
      el.style.cursor = "none";
      return;
    }
    el.style.cursor = c;
  };

  const endDrag = (e: { currentTarget: Element; pointerId: number }) => {
    if (heroMotion && dragging.current) {
      dragging.current = false;
      smoothPtrYaw.current = dragYaw.current;
      setCursor(hover.current ? "grab" : "auto");
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        /* */
      }
    }
  };

  useFrame(({ pointer }, delta) => {
    const s = group.current;
    if (!s || !model) return;

    if (!heroMotion) {
      if (materialOpacityRef?.current != null) {
        metalMat.opacity = materialOpacityRef.current;
        labelMat.opacity = materialOpacityRef.current;
      }
      if (controlledRotationY !== undefined) {
        lastYaw.current += (controlledRotationY - lastYaw.current) * 0.06;
        if (enableParallax) {
          paraY.current += (0.15 * pointer.x - paraY.current) * 0.05;
          paraX.current += (0.08 * pointer.y - paraX.current) * 0.05;
        } else {
          paraY.current = 0;
          paraX.current = 0;
        }
        s.rotation.y = lastYaw.current + (enableParallax ? paraY.current : 0);
        s.rotation.x = controlledTiltX + (enableParallax ? paraX.current : 0);
        s.rotation.z = 0;
        const st = stageMotionRef?.current;
        if (st) {
          s.position.x = st.x ?? 0;
          s.position.y = st.y;
          s.rotation.z = st.rotZ ?? 0;
          s.scale.setScalar(st.scale);
          metalMat.opacity = st.opacity;
          labelMat.opacity = st.opacity;
        }
        return;
      }
      const spin = (2 * Math.PI) / Math.max(rotationPeriodSeconds, 0.001);
      s.rotation.y += spin * delta;
      if (enableTilt) {
        const tx = 0.05 + -(0.1 * pointer.y);
        s.rotation.x += (tx - s.rotation.x) * 0.045;
        const tz = 0.03 * pointer.x;
        s.rotation.z += (tz - s.rotation.z) * 0.045;
      }
      return;
    }

    // heroMotion path
    if (t0.current === 0) return;
    const now = performance.now() / 1000;
    const h = now - t0.current;
    if (h < 1.6) {
      const e = h / 1.6;
      const t = 1 - Math.pow(1 - e, 4);
      const n = e < 0.5 ? 4 * e * e * e : 1 - Math.pow(-2 * e + 2, 3) / 2;
      s.position.y = 4 * (1 - t);
      s.rotation.x = pe * (1 - t);
      s.rotation.y = pt * (1 - n);
      s.rotation.z = 0;
      s.scale.setScalar(0.8 + 0.2 * t);
      metalMat.opacity = t;
      labelMat.opacity = t;
      return;
    }
    if (!entered.current) {
      entered.current = true;
      dragYaw.current = 0;
      metalMat.opacity = 1;
      labelMat.opacity = 1;
    }

    let yaw: number;
    const b = externalScrollRotRef
      ? externalScrollRotRef.current ?? 0
      : scrollRot.current;
    if (dragging.current) {
      yaw = dragYaw.current;
    } else if (pointerRotYRef) {
      const blend = lockBlendRef?.current ?? 0;
      smoothPtrYaw.current +=
        ((pointerRotYRef.current ?? 0) - smoothPtrYaw.current) *
        (0.055 + 0.1 * blend);
      yaw = smoothPtrYaw.current;
    } else if (b > 0.001) {
      yaw = b;
    } else {
      dragYaw.current += 0.08 * delta;
      yaw = dragYaw.current;
    }
    lastYaw.current = yaw;

    paraY.current += (0.15 * pointer.x - paraY.current) * 0.05;
    paraX.current += (0.08 * pointer.y - paraX.current) * 0.05;

    const follow = pointerFollowRef?.current;
    const Ax = follow?.active ? 2.5 * follow.x : 0;
    const Ay = follow?.active ? 1.6 * follow.y : 0;
    const prevFx = followPrevX.current;
    const F = 0.09 + (lockBlendRef?.current ?? 0) * 0.09;
    followX.current += (Ax - followX.current) * F;
    followY.current += (Ay - followY.current) * F;
    followPrevX.current = followX.current;

    const invDelta = 1 / Math.max(delta, 0.001);
    let U =
      Math.max(
        -0.22,
        Math.min(
          0.22,
          -(0.016 * (invDelta * (1.4 * (followX.current - prevFx)))),
        ),
      ) *
      (follow?.active ? 1 - (lockBlendRef?.current ?? 0) : 0);
    roll.current += (U - roll.current) * 0.075;

    s.rotation.y = yaw + paraY.current + (followX.current / 2.5) * 0.22;
    s.rotation.x =
      dragPitch.current + paraX.current + (externalTiltRef?.current ?? 0);
    s.rotation.z = roll.current;

    const O = now - (t0.current + 1.6);
    s.position.x = followX.current;
    s.position.y = 0.06 * Math.sin(((2 * Math.PI) / 6) * O) + followY.current;

    const k =
      hover.current && (lockBlendRef?.current ?? 0) < 0.5 ? 1.04 : 1;
    scaleS.current += (k - scaleS.current) * 0.1;
    s.scale.setScalar(scaleS.current * (1 + (dollyRef?.current ?? 0)));
  });

  if (!model) return null;

  return (
    <group
      ref={group}
      position={heroMotion ? [0, 4, 0] : [0, 0, 0]}
      rotation={
        heroMotion
          ? [pe, pt, 0]
          : controlledRotationY !== undefined
            ? [controlledTiltX, controlledRotationY, 0]
            : [0.05, initialRotationY, 0]
      }
      scale={heroMotion ? 0.8 : 1}
      onPointerOver={
        heroMotion
          ? () => {
              hover.current = true;
              setCursor(dragging.current ? "grabbing" : "grab");
            }
          : undefined
      }
      onPointerOut={
        heroMotion
          ? () => {
              hover.current = false;
              if (!dragging.current) setCursor("auto");
            }
          : undefined
      }
      onPointerDown={
        heroMotion
          ? (e) => {
              dragging.current = true;
              setCursor("grabbing");
              if (!dragStarted.current) {
                dragStarted.current = true;
                onDragStart?.();
              }
              dragYaw.current = lastYaw.current;
              const ne = e.nativeEvent as PointerEvent;
              ptrX.current = ne.clientX;
              ptrY.current = ne.clientY;
              baseYaw.current = dragYaw.current;
              basePitch.current = dragPitch.current;
              try {
                (e.target as Element).setPointerCapture?.(ne.pointerId);
              } catch {
                /* */
              }
            }
          : undefined
      }
      onPointerMove={
        heroMotion
          ? (e) => {
              if (!dragging.current) return;
              const ne = e.nativeEvent as PointerEvent;
              const dx = ne.clientX - ptrX.current;
              const dy = ne.clientY - ptrY.current;
              dragYaw.current = baseYaw.current + 0.005 * dx;
              dragPitch.current = basePitch.current + 0.005 * dy;
            }
          : undefined
      }
      onPointerUp={
        heroMotion
          ? (e) =>
              endDrag({
                currentTarget: e.target as Element,
                pointerId: (e.nativeEvent as PointerEvent).pointerId,
              })
          : undefined
      }
      onPointerLeave={
        heroMotion
          ? (e) =>
              endDrag({
                currentTarget: e.target as Element,
                pointerId: (e.nativeEvent as PointerEvent).pointerId,
              })
          : undefined
      }
    >
      <primitive object={model} />
    </group>
  );
}

useGLTF.preload("/models/can.glb");

/** Hero canvas wrapper with lights + shadows */
export function HeroCanCanvas({
  skuNumber = "01",
  startEntrance,
  pointerRotYRef,
  pointerFollowRef,
  lockBlendRef,
  dollyRef,
  dprCap = 1.5,
  targetHeight = 2.5,
  onDragStart,
  scrollTriggerEl,
}: {
  skuNumber?: string;
  startEntrance: boolean;
  pointerRotYRef: MutableRefObject<number | null>;
  pointerFollowRef: MutableRefObject<{
    x: number;
    y: number;
    active: boolean;
  } | null>;
  lockBlendRef: MutableRefObject<number | null>;
  dollyRef: MutableRefObject<number | null>;
  dprCap?: number;
  targetHeight?: number;
  onDragStart?: () => void;
  scrollTriggerEl?: HTMLElement | null;
}) {
  // Rendered via parent Canvas
  return (
    <Can3D
      skuNumber={skuNumber}
      heroMotion
      startEntrance={startEntrance}
      pointerRotYRef={pointerRotYRef}
      pointerFollowRef={pointerFollowRef}
      lockBlendRef={lockBlendRef}
      dollyRef={dollyRef}
      targetHeight={targetHeight}
      onDragStart={onDragStart}
      scrollTriggerEl={scrollTriggerEl}
    />
  );
}

export function StudioLights() {
  return (
    <>
      <Environment files="/hdri/studio_small_03_1k.hdr" background={false} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} color="#ffffff" />
      <directionalLight position={[-4, 2, 3]} intensity={0.5} color="#ffffff" />
      <directionalLight position={[0, 4, -5]} intensity={1.1} color="#ffffff" />
    </>
  );
}

export function HeroContactShadow() {
  return (
    <ContactShadows
      position={[0, -1.4, 0]}
      opacity={0.35}
      scale={4}
      blur={2}
      far={2}
      resolution={512}
      color="#1a1b1d"
    />
  );
}
