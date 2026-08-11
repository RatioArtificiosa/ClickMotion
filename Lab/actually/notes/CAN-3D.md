# CAN-3D — WebGL can hero dissection verbatim → ACTUALLY texture swap

Source: `raw/still_raw.html` hero slice + `assets/*.png` + sub-agent 3D audit Verdict: **REAL 3D — three/r3f/drei + gsap** (not image stack). `still-01.png 160K / 02 170K / 03 171K` are preloads + og fallbacks (1120×1400 RGBA). Date 2026-08-09.

## Evidence

```
images/cans/still-01.png       HTTP 200 160,443 1120×1400 ETag e2fbd233...
images/cans/still-02.png       HTTP 200 169,806
images/cans/still-03.png       HTTP 200 170,532
models/can.glb                 200 model/gltf-binary 298,048  "5c72f126..."
textures/labels/still-01-clear.png 335,462
textures/labels/still-02-dawn.png  340,955
textures/labels/still-03-dusk.png  343,865
hdri/studio_small_03_1k.hdr     995,328
_next/chunks/0cmb.wqv_a2_y.js   1,164,715  InlineCan/Can3D/StudioEnvironment (≈117× "three")
```
SSR: `<section id="hero">…<canvas style="display:block"></canvas>…preload link for still-01/02/03` — 6 canvases sitewide.

## Bundled code (verbatim gist)

```js
// InlineCan — hero+flavors+inside reuse
InlineCan({sku:e, targetHeight:r=2.5, spinPeriodSeconds:a, initialRotationY:c=0, stageMotionRef:h, onFirstFrame:d, active:p=!0}){
  let{ref:f,inView:m}=useInView("600px");
  return <div ref={f} class="absolute inset-0 pointer-events-none">
    <Canvas dpr={canvasDpr()} frameloop={m&&p?"always":"never"} gl={{antialias:true,alpha:true,toneMapping:ACESFilmicToneMapping,toneMappingExposure:1.05}} camera={{position:[0,.3,7.6],fov:26}} class="!absolute !inset-0 !pointer-events-none">
      <StudioEnvironment/>
      <ambientLight intensity={.2}/>
      <directionalLight position={[4,6,5]} intensity={1.4} color="#ffffff"/>
      <directionalLight position={[-4,2,3]} intensity={.5} color="#ffffff"/>
      <directionalLight position={[0,4,-5]} intensity={1.1} color="#ffffff"/>
      {a ? <Can3D skuNumber={e} rotationPeriodSeconds={a} initialRotationY={c} enableTilt={false} targetHeight={r}/>
         : <Can3D skuNumber={e} controlledRotationY={0} controlledTiltX={.16} targetHeight={r} stageMotionRef={h}/>}
    </Canvas></div>
}
StudioEnvironment = <Suspense><Environment files="/hdri/studio_small_03_1k.hdr" background={false}/></Suspense>
d6.preload("/models/can.glb")
```

```js
let pr={"01":"/textures/labels/still-01-clear.png","02":"/textures/labels/still-02-dawn.png","03":"/textures/labels/still-03-dusk.png"};
Can3D({skuNumber:e="01", rotationPeriodSeconds:t=30, heroMotion:i, controlledRotationY:l, controlledTiltX:u=0, enableParallax:c, targetHeight:h=2.2, ...}){
  let A = useMemo(()=>{ let t=pr[e]??pr["01"], n=new TextureLoader().load(t); n.colorSpace="srgb"; n.anisotropy=16; n.minFilter=1008; n.magFilter=1006; n.generateMipmaps=true; n.wrapS=1000/*Repeat*/; n.wrapT=1001/*Clamp*/; n.flipY=false; n.center.set(.5,.5); n.offset.x=-.14; n.offset.y=-.34; n.repeat.x=1; n.repeat.y=1; n.rotation=0; return n },[e]),
  M = useMemo(()=>new MeshStandardMaterial({color:"#C8C8C8",metalness:.95,roughness:.42,envMapIntensity:.85,transparent:true,opacity:+!i}),[i]),
  C = useMemo(()=>new MeshStandardMaterial({map:A, color:"#ffffff",metalness:.05,roughness:.65,envMapIntensity:.60,transparent:true,opacity:+!i}),[A,i]),
  E = useMemo(()=>{ let e=S.clone(true), t=[]; e.traverse(e=>e.isMesh&&t.push(e)); let n=new Box3().setFromObject(e), r=new Vector3(), i=new Vector3(); n.getSize(r); n.getCenter(i); let a=r.y>0?h/r.y:1; e.scale.setScalar(a); e.position.set(-i.x*a,-i.y*a,-i.z*a); let s=1===t.length?t[0]:(t.find(e=>/body|label|main|side|cylinder/i.test(e.name))||t.reduce((a,b)=>(b.geometry.attributes.position?.count??0)>(a.geometry.attributes.position?.count??0)?b:a)); for(let e of t) e.material=e===s?C:M, e.castShadow=true, e.receiveShadow=true; return e },[S,C,M,h]),
  // entrance: position.y 4*(1-t), rotX 35deg*(1-t), rotY -540deg*(1-n), scale .8->1, opacity 0->1 over 1.6s; then scroll scrub pn=1.4π, drag 0.005 rad/px, parallax rot lerp 0.05, bob y=.06*sin(2π/6*O)
}
Inside Canvas shadows:true ContactShadows position [0,-1.4,0] opacity .32 scale4 blur2 far2 resolution512 color #1a1b1d
Camera hero [0,.3,7.6] fov26 targetHeight 2.5 (hero 2.2-2.6, flavors 2.55, inside 2.2); Inside [0,.4,7.2] fov28; dpr min(devicePixelRatio,2) frameloop inView 600px && active else never
```

## Can

- **Geometry:** single `can.glb` (298K) auto-fit: `a = h / r.y` → `scale a` + `-center*a` position; largest mesh or `/body|label|main|side|cylinder/i` gets label material `C`, others get metal `M`.
- **Metal lid/rim/base:** `MeshStandardMaterial { color:#C8C8C8, metalness:0.95, roughness:0.42, envMapIntensity:0.85, transparent:true }`
- **Label cylinder:** `MeshStandardMaterial { map:labelTexture, color:#ffffff, metalness:0.05, roughness:0.65, envMapIntensity:0.60, transparent:true }` `castShadow/receiveShadow true` (hero none, Inside shadows true).
- **Texture sampler:** `colorSpace srgb, anisotropy 16, minFilter LinearMipmapLinear(1008), mag Linear(1006), wrapS Repeat(1000) wrapT Clamp(1001), flipY false, center .5,.5, offset -.14/-.34, repeat 1,1, rotation 0`
- **Lighting:** `ambient .20/.15`, directional `1.4 [4,6,5]` + `.5 [-4,2,3]` + `1.1/1.2 [0,4,-5]`, env `studio_small_03_1k.hdr`

## Interaction

- Constants (verbatim): `pe=35*π/180`, `pt=-(540*π/180)`, `pn=1.4*π`
- Entrance 1.6s: `y 4*(1-t)`, `rotX pe*(1-t)`, `rotY pt*(1-n)`, `scale .8→1`, `opacity 0→1` (`t=1-(1-e)^4` quart out; `n` cubic inOut)
- Scroll scrub `pn` via ST `start top top end bottom top scrub:1` → `progress*pn`; fallback `+=.08*delta` when no scroll rot
- Drag `.005 rad/px` both axes + capture; grab scale target **1.04** while dragging
- Parallax `.15/.08` lerp `.05`; tilt lerp `.045`; bob `.06*sin(2π/6*t)`
- Hero: **`dprCap:1.5`**, ContactShadows **`opacity:.35`** `[0,-1.4,0]` scale4 blur2 far2 res512
- Full tables: `notes/GSAP-ANIMATIONS.md` §3.3 · gaps: `notes/GAPS-AUDIT.md`

## ACTUALLY swap (only change)

Do **not** remodel, **do not** change metalness/roughness/envMapIntensity/camera/lights/HDR/toneMapping/anisotropy/offset/targetHeight. Only swap label textures and preloads:

```js
let pr={"01":"/textures/labels/actually-01-clear.png","02":"/textures/labels/actually-02-dawn.png","03":"/textures/labels/actually-03-dusk.png"};
// head: <link rel="preload" href="/images/cans/actually-0{1,2,3}.png"/>
// also preload /textures/labels/actually-*.png if eager
```

Generate `actually-01-clear.png` etc: open `still-01-clear.png`, replace text layer `STILL.` → `ACTUALLY.` — keep **Test Söhne Breit Extrafett 800 tracking -0.02em, color #1a1b1d on bone**, keep `STILL.` 6 chars → `ACTUALLY.` 9 chars by **scale 0.70 or tracking -0.04em**, `line-height 0.78`, offset already `-0.14/-0.34` stays. Keep numerals `01` (`Tiempos tabular-nums`) unchanged. Export **1024+ sRGB PNG, mipmaps, Repeat/Clamp**. Also fallback `images/cans/actually-0*.png` 1120×1400 RGBA (bake WebGL or keep PNG swap).

Keep `clip-path:circle(0 at 50% 48%)` reveal + `ScrollTrigger pin scrub 1` + `pointer drag .005` + `z-[100]/z-20/z-30` + `font-wordmark 900 -0.5px` + `60vh halo`.

Checklist: copy `models/can.glb` + `hdri/studio_small_03_1k.hdr` → ACTUALLY domain, update `pr` + preloads, keep all params verbatim, test drag/scroll scrubs, halo `60vh blur6` visible.
