import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/** Source orbit order (orbit-09 → orbit-01) */
export const ORBIT_SRC = Array.from({ length: 9 }, (_, i) => {
  const n = String(9 - i).padStart(2, "0");
  return `/images/orbit/orbit-${n}.jpg`;
});

const CARD_ASPECT = 568 / 812;
const HELIX_R = 12;
/** Total Y climb over 2 full turns */
const PITCH_TOTAL = 28;
const TURNS = 2;
const B = PITCH_TOTAL / (2 * Math.PI * TURNS);
const ARC_X = Math.sqrt(HELIX_R * HELIX_R + B * B);
const PATH_LEN = 2 * Math.PI * TURNS * ARC_X;
const CARD_SPACING = 6.2;
/** Source path height of each card ribbon */
const CARD_H = 5.8;
const CARD_W = CARD_H * CARD_ASPECT;
const SEGMENTS = 116;
const V = 2 * Math.PI;
const EP = (ORBIT_SRC.length - 1) * CARD_SPACING + CARD_H;
/** Helix phase finishes at 400/600 of g (source) */
const HELIX_G_END = 400 / 600;

function helixPoint(theta: number, out = new THREE.Vector3()) {
  const t = (theta - V) / 2;
  const bump = 2.5 * Math.exp(-t * t);
  return out.set(
    HELIX_R * Math.cos(theta),
    -16 + theta * B - bump,
    HELIX_R * Math.sin(theta),
  );
}

function helixTangent(theta: number, out = new THREE.Vector3()) {
  const t = (theta - V) / 2;
  const r = -t * 2.5 * Math.exp(-t * t);
  return out
    .set(-HELIX_R * Math.sin(theta), B - r, HELIX_R * Math.cos(theta))
    .normalize();
}

/** Center + width binormal matching source ribbon deformation */
function cardFrame(
  theta: number,
  target: {
    center: THREE.Vector3;
    binormal: THREE.Vector3;
  },
) {
  helixPoint(theta, target.center);
  const tan = helixTangent(theta);
  const c = Math.cos(theta);
  const u = Math.sin(theta);
  target.binormal.set(tan.y * u, tan.z * c - tan.x * u, -tan.y * c);
  target.binormal.normalize();
  target.binormal.y += 0.6;
  target.binormal.normalize();
  return target.center;
}

function camConfig(w: number) {
  // Exact source DribbleSection camera (0.924d2y-5_87.js):
  // position (0, 0, l()), lookAt(0, 0, 0), fov d() — never tilt down.
  // Tilting lookY negative lifts the helix into mid-frame (our old bug).
  const tablet = w >= 768 && w < 1200;
  if (w < 768) return { z: 28, fov: 58 };
  if (tablet) return { z: 24, fov: 54 };
  return { z: 22, fov: 52 };
}

type OrbitSceneProps = {
  progressRef: MutableRefObject<number>;
  urls: string[];
};

function OrbitCards({ progressRef, urls }: OrbitSceneProps) {
  const meshes = useRef<THREE.Mesh[]>([]);
  const textures = useMemo(() => {
    const loader = new THREE.TextureLoader();
    return urls.map((url) => {
      const tex = loader.load(url);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.anisotropy = 4;
      return tex;
    });
  }, [urls]);

  const geos = useMemo(
    () => urls.map(() => new THREE.PlaneGeometry(1, 1, SEGMENTS, 1)),
    [urls],
  );

  // Rounded-corner card shader (source uRadius SDF) for polish
  const mats = useMemo(() => {
    return textures.map((map) => {
      return new THREE.ShaderMaterial({
        uniforms: {
          map: { value: map },
          uRadius: { value: 0.045 },
        },
        vertexShader: /* glsl */ `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          uniform sampler2D map;
          uniform float uRadius;
          varying vec2 vUv;
          void main() {
            vec2 uv = vUv;
            // front-face flip baked into UV already; soft rounded rect alpha
            vec2 p = abs(uv - 0.5) * 2.0;
            vec2 b = vec2(1.0 - uRadius * 2.0);
            vec2 q = p - b;
            float dist = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - uRadius * 0.0;
            // simpler: inset rounded box in UV space
            vec2 halfSize = vec2(0.5 - uRadius);
            vec2 d = abs(uv - 0.5) - halfSize;
            float sd = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - uRadius;
            float alpha = 1.0 - smoothstep(-0.002, 0.002, sd);
            if (alpha < 0.01) discard;
            vec4 col = texture2D(map, uv);
            gl_FragColor = vec4(col.rgb, col.a * alpha);
          }
        `,
        side: THREE.DoubleSide,
        transparent: true,
        depthWrite: true,
      });
    });
  }, [textures]);

  const rails = useMemo(() => {
    const buildGeo = (sign: number) => {
      const pts: THREE.Vector3[] = [];
      const n = 500;
      const halfW = sign * (CARD_W * 0.5 + 0.12);
      const frame = {
        center: new THREE.Vector3(),
        binormal: new THREE.Vector3(),
      };
      for (let i = 0; i <= n; i++) {
        const theta = (i / n) * 2 * Math.PI * TURNS;
        cardFrame(theta, frame);
        pts.push(
          new THREE.Vector3(
            frame.center.x + frame.binormal.x * halfW,
            frame.center.y + frame.binormal.y * halfW,
            frame.center.z + frame.binormal.z * halfW,
          ),
        );
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      geo.setDrawRange(0, 0);
      return geo;
    };
    const mat = new THREE.LineBasicMaterial({
      color: "#9E9E9E",
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    });
    const geoA = buildGeo(1);
    const geoB = buildGeo(-1);
    const lineA = new THREE.Line(geoA, mat);
    const lineB = new THREE.Line(geoB, mat);
    lineA.frustumCulled = false;
    lineB.frustumCulled = false;
    lineA.renderOrder = 5;
    lineB.renderOrder = 5;
    return { geoA, geoB, mat, lineA, lineB };
  }, []);

  useEffect(() => {
    return () => {
      geos.forEach((g) => g.dispose());
      mats.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
      rails.geoA.dispose();
      rails.geoB.dispose();
      rails.mat.dispose();
    };
  }, [geos, mats, textures, rails]);

  const tmp = useMemo(
    () => ({
      center: new THREE.Vector3(),
      binormal: new THREE.Vector3(),
    }),
    [],
  );

  useFrame(() => {
    const g = THREE.MathUtils.clamp(progressRef.current, 0, 1);
    // Source P = min(1, g / (400/600)) — helix completes at 2/3 of phase g
    const P = Math.min(1, g / HELIX_G_END);

    // Source path offset: P*(y+ep) - ep + 25
    // At P=0 base is negative → no cards (they ease in from off-path / off-screen)
    const base = P * (PATH_LEN + EP) - EP + 25;

    // Rails grow with P; draw slightly ahead of cards
    const railCount = Math.max(0, Math.floor(P * 501));
    rails.geoA.setDrawRange(0, railCount);
    rails.geoB.setDrawRange(0, railCount);

    for (let i = 0; i < meshes.current.length; i++) {
      const mesh = meshes.current[i];
      if (!mesh) continue;
      const s = base + CARD_SPACING * i;
      // Source: visible while 0 < s < pathLen. Require a hair of lead-in so
      // partial “card ends” never sit clipped in the viewport corner — cards
      // fully form on the path before they’re shown, and hide before the path tail.
      const lead = CARD_H * 0.2;
      const visible =
        s > lead && s < PATH_LEN - lead && P > 0.001 && P < 0.995;
      mesh.visible = visible;
      if (!mesh.visible) continue;

      const pathPos = Math.min(s, PATH_LEN - 0.001);
      const a = CARD_H;
      const o = pathPos + 2.9 - 0.5 * a;
      const halfW = CARD_W * 0.5;
      const pos = mesh.geometry.attributes.position as THREE.BufferAttribute;
      const uv = mesh.geometry.attributes.uv as THREE.BufferAttribute;

      for (let e = 0; e <= SEGMENTS; e++) {
        const t = e / SEGMENTS;
        const theta = (o + t * a) / ARC_X;
        cardFrame(theta, tmp);
        const { x: cx, y: cy, z: cz } = tmp.center;
        const { x: bx, y: by, z: bz } = tmp.binormal;

        for (let r = 0; r < 2; r++) {
          const w = r === 0 ? -halfW : halfW;
          const vi = (SEGMENTS + 1) * r + e;
          pos.setXYZ(vi, cx + bx * w, cy + by * w, cz + bz * w);
          // Source flips front-face UV.x
          uv.setXY(vi, 1 - t, r);
        }
      }
      pos.needsUpdate = true;
      uv.needsUpdate = true;
    }
  });

  // Slight lift so the smile threads the lower half of MOTION (Trionn).
  return (
    <group position={[0, 0.9, 0]}>
      {urls.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) meshes.current[i] = el;
          }}
          geometry={geos[i]}
          material={mats[i]}
          frustumCulled={false}
          renderOrder={1}
          visible={false}
        />
      ))}
      <primitive object={rails.lineA} />
      <primitive object={rails.lineB} />
    </group>
  );
}

function CameraSync() {
  const { camera, size, gl } = useThree();
  useEffect(() => {
    const apply = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const { z, fov } = camConfig(w);
      // Source: S.position.set(0, 0, l()); S.lookAt(0, 0, 0)
      camera.position.set(0, 0, z);
      if (camera instanceof THREE.PerspectiveCamera) {
        camera.fov = fov;
        camera.aspect = w / Math.max(h, 1);
        camera.near = 0.1;
        camera.far = 500;
        camera.updateProjectionMatrix();
      }
      camera.lookAt(0, 0, 0);
      gl.setSize(w, h, false);
    };
    apply();
    window.addEventListener("resize", apply);
    // Re-measure after pinType:fixed settles
    const t1 = window.setTimeout(apply, 50);
    const t2 = window.setTimeout(apply, 250);
    return () => {
      window.removeEventListener("resize", apply);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [camera, gl, size.width, size.height]);
  return null;
}

type OrbitHelixProps = {
  progressRef: MutableRefObject<number>;
  className?: string;
};

/**
 * WebGL helix orbit matching trionn.com DribbleSection:
 * radius 12, pitch 28/4π, card spacing 6.2, ribbon deformation, guide rails.
 */
export function OrbitHelix({ progressRef, className }: OrbitHelixProps) {
  return (
    <div
      className={
        className ??
        "pointer-events-none absolute inset-0 z-[1] h-full w-full"
      }
      aria-hidden
      style={{ width: "100%", height: "100%" }}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 22], fov: 52, near: 0.1, far: 500 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        // PinType fixed can leave R3F at default 300×150 — always fill viewport
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          background: "transparent",
        }}
        resize={{ scroll: true, debounce: 0 }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          gl.setSize(window.innerWidth, window.innerHeight, false);
        }}
      >
        <CameraSync />
        <OrbitCards progressRef={progressRef} urls={ORBIT_SRC} />
      </Canvas>
    </div>
  );
}
