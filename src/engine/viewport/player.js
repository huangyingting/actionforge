import {
  A as V,
  D,
  F as m,
  G as S,
  H as r,
  I as E,
  J as F,
  a as C,
  b as t,
  d as s,
  f as H,
  g as a,
  i as e,
  m as R,
} from '../animation/engine.js';
import { c as l, d as Q } from '../animation/poses.js';
import {
  b as c,
  e as j,
  f as z,
  h as p,
  i as O,
  j as f,
  k as J,
  l as Z,
} from '../rigging/retargeting.js';
import { a as U, b as u, c as d, d as K } from '../animation/channels.js';
import {
  Aa as T,
  D as A,
  W as n,
  _ as o,
  aa as X,
  ba as L,
  c as b,
  ea as x,
  fa as y,
  ma as W,
  na as q,
  v as P,
  w as Y,
  y as v,
  z as B,
} from '../animation/math.js';
import { a as G } from '../dependencies/gltf-loader-compat.js';
import { c as g } from '../dependencies/skeleton-utils-compat.js';
import {
  Bg as I,
  Cb as h,
  Db as N,
  Ed as i,
  Id as M,
  Jg as k0,
  Mf as k1,
  Nc as k2,
  Oc as k3,
  Od as k4,
  Pc as k5,
  Pf as k6,
  Vb as k7,
  Vd as k8,
  Ve as k9,
  Wd as kk,
  Yd as kw,
  Ye as kV,
  Zd as kD,
  ad as km,
  ba as kS,
  bd as kE,
  bg as kF,
  cd as kC,
  ef as kt,
  fd as kH,
  gd as ke,
  id as kR,
  ie as kl,
  kd as kQ,
  ke as kc,
  kg as kj,
  md as kz,
  me as kp,
  n as kO,
  od as kf,
  pg as kJ,
  vg as kZ,
  yd as kU,
  yg as ku,
  zd as kd,
} from '../dependencies/three-compat.js';
var lu = ['ba', 'step', 'keys'],
  cu = ['dither', 'flat', 'shaded'],
  uu = ['sides', 'speed', 'boneSpeed', 'boneSpeedOwn'],
  fu = Object.freeze({
    enabled: !1,
    mode: 'ba',
    before: 5,
    after: 5,
    step: 2,
    shading: 'dither',
    showMesh: !0,
    inFront: !1,
    characterInFront: !0,
    colouring: 'sides',
    beforeColour: '#668ccc',
    afterColour: '#cc7366',
    keyColour: '#66d980',
    useKeyColour: !0,
    slowColour: '#4d79d9',
    fastColour: '#d94d4d',
    alphaNear: 0.45,
    alphaFar: 0.1,
    duringPlayback: !0,
    playbackCount: 2,
    teleport: !1,
  }),
  Br = (kK, kT, kA, kn) =>
    Number.isFinite(Number(kK)) ? Math.min(kA, Math.max(kT, Number(kK))) : kn,
  Wn = (kK, kT) => (/^#[0-9a-f]{6}$/i.test(String(kK)) ? String(kK).toLowerCase() : kT);
function Fr(kK = {}) {
  let kT = fu,
    kA = (kn, kX, kL, kb) => Math.round(Br(kn, kX, kL, kb));
  return {
    enabled: !!kK.enabled,
    mode: lu.includes(kK.mode) ? kK.mode : kT.mode,
    before: kA(kK.before, 0, 8, kT.before),
    after: kA(kK.after, 0, 8, kT.after),
    step: kA(kK.step, 1, 10, kT.step),
    shading: cu.includes(kK.shading) ? kK.shading : kT.shading,
    showMesh: !!(kK.showMesh ?? kT.showMesh),
    inFront: !!(kK.inFront ?? kT.inFront),
    characterInFront: !!(kK.characterInFront ?? kT.characterInFront),
    colouring: uu.includes(kK.colouring) ? kK.colouring : kT.colouring,
    beforeColour: Wn(kK.beforeColour, kT.beforeColour),
    afterColour: Wn(kK.afterColour, kT.afterColour),
    keyColour: Wn(kK.keyColour, kT.keyColour),
    useKeyColour: !!(kK.useKeyColour ?? kT.useKeyColour),
    slowColour: Wn(kK.slowColour, kT.slowColour),
    fastColour: Wn(kK.fastColour, kT.fastColour),
    alphaNear: Br(kK.alphaNear, 0.05, 1, kT.alphaNear),
    alphaFar: Br(kK.alphaFar, 0, 0.5, kT.alphaFar),
    duringPlayback: !!(kK.duringPlayback ?? kT.duringPlayback),
    playbackCount: kA(kK.playbackCount, 1, 8, kT.playbackCount),
    teleport: !!(kK.teleport ?? kT.teleport),
  };
}
function vs(kK, kT, kA, kn, kX = new Set(), kL = []) {
  let kb = [];
  if (kK.mode === 'ba') {
    for (let kx = kK.before; kx >= 1; kx--) {
      let ky = kT - kx * kK.step;
      ky >= kA && kb.push(ky);
    }
    for (let kW = 1; kW <= kK.after; kW++) {
      let kq = kT + kW * kK.step;
      kq <= kn && kb.push(kq);
    }
  } else {
    if (kK.mode === 'step') {
      let kP = Math.floor((kT - kA) / kK.step),
        kY = kA + kP * kK.step;
      kY >= kT && (kY -= kK.step);
      for (let kv = 0; kY >= kA && kv < kK.before; kY -= kK.step, kv++) kb.push(kY);
      kY = kA + (kP + 1) * kK.step;
      for (let kB = 0; kY <= kn && kB < kK.after; kY += kK.step, kB++) kb.push(kY);
    } else {
      let kG = [...kX].sort((kh, kN) => kh - kN),
        kg = kG.filter((kh) => kh < kT),
        kI = kG.filter((kh) => kh > kT);
      kb.push(...kg.slice(Math.max(0, kg.length - kK.before)), ...kI.slice(0, kK.after));
    }
  }
  for (let kh of kL)
    Number.isInteger(kh) && kh !== kT && kh >= kA && kh <= kn && !kb.includes(kh) && kb.push(kh);
  return kb.sort((kN, ki) => kN - ki);
}
function xs(kK, kT, kA) {
  if (kK.length <= kA * 2) return kK;
  let kn = [],
    kX = 0,
    kL = 0;
  for (let kb of kK)
    kb < kT && kX < kA ? (kn.push(kb), kX++) : kb > kT && kL < kA && (kn.push(kb), kL++);
  return kn;
}
function Ms(kK, kT = null) {
  let kA = (kK || [])
    .map((kn) => (typeof kn == 'number' ? { u: kn } : kn))
    .filter((kn) => Number.isFinite(kn?.u));
  return kT && (kT.bones?.size || kT.ik)
    ? kA
        .filter(
          (kn) =>
            kn.mark ||
            (kn.ik != null && kn.ik === kT.ik) ||
            (Array.isArray(kn.bones) && kn.bones.some((kX) => kT.bones?.has(kX))),
        )
        .map((kn) => kn.u)
    : kA.map((kn) => kn.u);
}
function Es(kK, kT) {
  let kA = new Set(kT || []);
  if (!kA.size) return null;
  let kn = new Uint8Array(kK.length),
    kX = new Set();
  return (
    kK.forEach((kL, kb) => {
      (kA.has(kL.name) || (kL.parent >= 0 && kn[kL.parent])) && ((kn[kb] = 1), kX.add(kb));
    }),
    kX.size ? kX : null
  );
}
function ks(kK, kT, kA) {
  let kn = new Float32Array(kT * kA);
  for (let kX = 0; kX < kT; kX++) {
    let kL = kX > 0 ? kX - 1 : Math.min(1, kT - 1);
    for (let kb = 0; kb < kA; kb++) {
      let kx = (kX * kA + kb) * 3,
        ky = (kL * kA + kb) * 3;
      kn[kX * kA + kb] = Math.hypot(
        kK[kx] - kK[ky],
        kK[kx + 1] - kK[ky + 1],
        kK[kx + 2] - kK[ky + 2],
      );
    }
  }
  return kn;
}
function Ss(kK, kT, kA, kn) {
  let kX = (kW, kq, kP) => (kq - kW < 1e-9 ? 0 : Math.min(1, Math.max(0, (kP - kW) / (kq - kW))));
  if (kn === 'speed') {
    let kW = new Float32Array(kT);
    for (let kY = 0; kY < kT; kY++) {
      let kv = 0;
      for (let kB = 0; kB < kA; kB++) kv += kK[kY * kA + kB];
      kW[kY] = kA ? kv / kA : 0;
    }
    let kq = 1 / 0,
      kP = -1 / 0;
    for (let kG of kW) ((kq = Math.min(kq, kG)), (kP = Math.max(kP, kG)));
    return kW.map((kg) => kX(kq, kP, kg));
  }
  let kL = 1 / 0,
    kb = -1 / 0;
  for (let kg of kK) ((kL = Math.min(kL, kg)), (kb = Math.max(kb, kg)));
  if (kn !== 'boneSpeedOwn') return kK.map((kI) => kX(kL, kb, kI));
  let kx = new Float32Array(kK.length),
    ky = Math.max(1e-9, (kb - kL) * 0.0001);
  for (let kI = 0; kI < kA; kI++) {
    let kh = 1 / 0,
      kN = -1 / 0;
    for (let ki = 0; ki < kT; ki++) {
      let kM = kK[ki * kA + kI];
      ((kh = Math.min(kh, kM)), (kN = Math.max(kN, kM)));
    }
    if (!(kN - kh <= ky)) {
      for (let w0 = 0; w0 < kT; w0++) kx[w0 * kA + kI] = kX(kh, kN, kK[w0 * kA + kI]);
    }
  }
  return kx;
}
var Wr = (kK, kT, kA) => kK.map((kn, kX) => kn + (kT[kX] - kn) * kA),
  yn = (kK) => [1, 3, 5].map((kT) => parseInt(kK.slice(kT, kT + 2), 16) / 255);
function Ps(kK, kT, kA, kn, kX = new Set(), kL = null) {
  let kb = kT < kA,
    kx = kn.filter((kv) => (kb ? kv < kA : kv > kA)).sort((kv, kB) => kv - kB),
    ky = Math.max(0, kx.indexOf(kT)),
    kW = kx.length,
    kq = (kb ? kW - 1 - ky : ky) / Math.max(kW - 1, 1),
    kP = kK.alphaNear + (kK.alphaFar - kK.alphaNear) * kq;
  if (kK.colouring && kK.colouring !== 'sides' && kL != null)
    return {
      rgb: Wr(yn(kK.slowColour), yn(kK.fastColour), Math.min(1, Math.max(0, kL))),
      alpha: kP,
    };
  let kY = kK.useKeyColour && kX.has(kT) ? kK.keyColour : kb ? kK.beforeColour : kK.afterColour;
  return { rgb: yn(kY), alpha: kP };
}
function Rs(kK, kT) {
  return kK.slice().sort((kA, kn) => {
    let kX = Math.abs(kA - kT),
      kL = Math.abs(kn - kT);
    return kX !== kL ? kL - kX : kA - kn;
  });
}
function Cu(kK) {
  return [
    ...new Set(
      (kK || []).filter(Number.isFinite).map((kT) => +Math.min(1, Math.max(0, kT)).toFixed(5)),
    ),
  ]
    .sort((kT, kA) => kT - kA)
    .join(',');
}
function Tu(kK) {
  let kT = String(kK || '')
    .split(',')
    .map((kA) => kA.trim())
    .filter(Boolean)
    .map(Number)
    .filter((kA) => Number.isFinite(kA) && kA >= 0 && kA <= 1);
  return [...new Set(kT)].sort((kA, kn) => kA - kn);
}
var du =
    '\n#include <common>\n#include <skinning_pars_vertex>\nuniform sampler2D uBoneTex;\nuniform vec3 uRigidTint;\nuniform float uRigidMask;\nvarying vec3 vGhostNormal;\nvarying vec3 vTint;\nvarying float vMask;\nvoid main() {\n    #include <beginnormal_vertex>\n    #include <skinbase_vertex>\n    #include <skinnormal_vertex>\n    #include <begin_vertex>\n    #include <skinning_vertex>\n    #include <project_vertex>\n    vGhostNormal = normalize(mat3(modelMatrix) * objectNormal);\n    #ifdef USE_SKINNING\n    vec4 b0 = texelFetch(uBoneTex, ivec2(int(skinIndex.x + 0.5), 0), 0);\n    vec4 b1 = texelFetch(uBoneTex, ivec2(int(skinIndex.y + 0.5), 0), 0);\n    vec4 b2 = texelFetch(uBoneTex, ivec2(int(skinIndex.z + 0.5), 0), 0);\n    vec4 b3 = texelFetch(uBoneTex, ivec2(int(skinIndex.w + 0.5), 0), 0);\n    float ws = skinWeight.x + skinWeight.y + skinWeight.z + skinWeight.w;\n    if (ws > 1e-5) {\n        vTint = (b0.rgb * skinWeight.x + b1.rgb * skinWeight.y + b2.rgb * skinWeight.z + b3.rgb * skinWeight.w) / ws;\n        ' +
    'vMask = (b0.a * skinWeight.x + b1.a * skinWeight.y + b2.a * skinWeight.z + b3.a * skinWeight.w) / ws;\n    } else {\n        vTint = b0.rgb;\n        vMask = b0.a;\n    }\n    #else\n    vTint = uRigidTint;\n    vMask = uRigidMask;\n    #endif\n}',
  pu =
    '\nuniform vec4 uGhostColor;\nuniform int uStyle;\nuniform int uPerBone;\nuniform int uMasked;\nvarying vec3 vGhostNormal;\nvarying vec3 vTint;\nvarying float vMask;\nfloat bayer4x4(ivec2 p) {\n    int idx = (p.y & 3) * 4 + (p.x & 3);\n    float pattern[16] = float[16](\n        0.0/16.0,  8.0/16.0,  2.0/16.0, 10.0/16.0,\n       12.0/16.0,  4.0/16.0, 14.0/16.0,  6.0/16.0,\n        3.0/16.0, 11.0/16.0,  1.0/16.0,  9.0/16.0,\n       15.0/16.0,  7.0/16.0, 13.0/16.0,  5.0/16.0);\n    return pattern[idx];\n}\nvoid main() {\n    if (uMasked == 1 && vMask < 0.5) discard;\n    vec3 base = uPerBone == 1 ? vTint : uGhostColor.rgb;\n    if (uStyle == 0) {\n        if (bayer4x4(ivec2(gl_FragCoord.xy)) >= uGhostColor.a) discard;\n        gl_FragColor = vec4(base, 1.0);\n        return;\n    }\n    vec3 col = base;\n    if (uStyle == 2) {\n        vec3 n = normalize(vGhostNormal);\n        vec3 L = normalize(vec3(0.4, 0.7, 0.5));\n        col *= max(dot(n, L), 0.0) * 0.75 + 0.25;\n    }\n    gl_FragColor = vec4(col, uGhostColor.a);\n}',
  mu =
    '\nvarying vec3 vBoneNormal;\nvarying vec3 vTint;\nvoid main() {\n    vec4 p = vec4(position, 1.0);\n    vec3 nrm = normal;\n    #ifdef USE_INSTANCING\n    p = instanceMatrix * p;\n    nrm = mat3(instanceMatrix) * nrm;\n    #endif\n    #ifdef USE_INSTANCING_COLOR\n    vTint = instanceColor;\n    #else\n    vTint = vec3(1.0);\n    #endif\n    vBoneNormal = normalize(normalMatrix * nrm);\n    gl_Position = projectionMatrix * modelViewMatrix * p;\n}',
  hu =
    '\nuniform vec4 uGhostColor;\nuniform int uPerBone;\nvarying vec3 vBoneNormal;\nvarying vec3 vTint;\nvoid main() {\n    vec3 L = normalize(vec3(0.1, 0.1, 0.8));\n    float d = dot(normalize(vBoneNormal), L) * 0.5 + 0.5;\n    float lit = d * d;\n    vec3 base = uPerBone == 1 ? vTint : uGhostColor.rgb;\n    gl_FragColor = vec4(base * (0.2 + 0.8 * lit), uGhostColor.a);\n}',
  gu = { dither: 0, flat: 1, shaded: 2 };
function yu(kK) {
  let kT = [0, 0, 0],
    kA = [0, 1, 0],
    kn = [
      [0.1, 0.1, 0],
      [0, 0.1, 0.1],
      [-0.1, 0.1, 0],
      [0, 0.1, -0.1],
    ],
    kX = [];
  for (let kb = 0; kb < 4; kb++) {
    let kx = kn[kb],
      ky = kn[(kb + 1) % 4];
    kX.push(...kT, ...kx, ...ky, ...ky, ...kx, ...kA);
  }
  let kL = new kK['BufferGeomet' + 'ry']();
  return (
    kL.setAttribute('position', new kK['Float32Buffe' + 'rAttribute'](kX, 3)),
    kL.computeVertexNormals(),
    kL
  );
}
function Cs({ THREE: kK, clone: kT, scene: kA, isProp: kn = () => !1 }) {
  let kX = null,
    kL = null,
    kb = [],
    kx = 0,
    ky = [],
    kW = [],
    kq = null,
    kP = new kK['Vector3'](0, 1, 0),
    kY = new kK['Vector3'](),
    kv = new kK['Vector3'](),
    kB = new kK['Vector3'](),
    kG = new kK['Quaternion'](),
    kg = new kK['Vector3'](),
    kI = new kK['Matrix4'](),
    kh = new kK['Color'](),
    kN = (wk) => {
      ((wk.blendSrc = kK.SrcAlphaFactor),
        (wk.blendDst = kK.OneMinusSrcAlphaFactor),
        (wk.blendSrcAlpha = kK.OneFactor),
        (wk.blendDstAlpha = kK.OneMinusSrcAlphaFactor));
    },
    ki = (wk) => wk.isMesh || wk.isLine || wk.isPoints || wk.isSprite;
  function kM() {
    ky = [];
    let wk = new Map();
    kb.forEach((ww) => {
      if (!ww.isBone || kn(ww)) return;
      let wV = ww.parent;
      for (; wV && wV !== kX && !wk.has(wV);) wV = wV.parent;
      (wk.set(ww, ky.length),
        ky.push({ node: ww, name: ww.name, parent: wV && wk.has(wV) ? wk.get(wV) : -1 }));
    });
  }
  function w0(wk, ww, wV) {
    let wD = new Map(ww.map((wC, wt) => [wC, wt])),
      wm = new Map();
    ky.forEach((wC, wt) => {
      wm.has(wC.name) || wm.set(wC.name, wt);
    });
    let wS = kL?.plan,
      wr = (wC) => {
        for (let wt = wC, wH = 0; wt && wH < 128; wt = wS?.parentOf?.get(wt), wH++) {
          let wa = wS?.role?.get(wt);
          if (wa?.kind === 'mapped') return wa.our;
        }
        return null;
      },
      wE = (wC) => (wV ? (wm.get(wr(wC?.name)) ?? -1) : (wD.get(wC) ?? -1)),
      wF = -1;
    for (let wC = wk.parent; wC && wF < 0; wC = wC.parent) wF = wV ? -1 : (wD.get(wC) ?? -1);
    return { map: wk.isSkinnedMesh ? Int32Array.from(wk.skeleton.bones, wE) : null, anchor: wF };
  }
  function w1(wk, ww, wV, wD, wm, wS) {
    if (!ki(wk)) return;
    if (!wV) {
      ((wk.visible = !1), (wk.userData.ghostHidden = !0));
      return;
    }
    let { map: wr, anchor: wE } = w0(wk, wD, wm),
      wF = Math.max(1, wr?.length ?? 1),
      wC = new kK['DataTexture'](new Uint8Array(wF * 4).fill(255), wF, 1, kK.RGBAFormat);
    ((wC.magFilter = wC.minFilter = kK.NearestFilter),
      (wC.generateMipmaps = !1),
      (wC.needsUpdate = !0));
    let wt = new kK['ShaderMateri' + 'al']({
      uniforms: {
        ...ww,
        uBoneTex: { value: wC },
        uRigidTint: { value: new kK['Vector3'](1, 1, 1) },
        uRigidMask: { value: 1 },
      },
      vertexShader: du,
      fragmentShader: pu,
      depthWrite: !1,
      toneMapped: !1,
    });
    (kN(wt),
      (wk.material = wt),
      (wk.frustumCulled = !1),
      (wk.castShadow = !1),
      (wk.receiveShadow = !1),
      (wk.userData.ghost = { map: wr, anchor: wE, tex: wC }),
      wS.push(wk));
  }
  function w2() {
    let wk = {
        uGhostColor: { value: new kK['Vector4'](1, 1, 1, 0.5) },
        uStyle: { value: 0 },
        uPerBone: { value: 0 },
        uMasked: { value: 0 },
      },
      ww = kT(kX),
      wV = [];
    ww.traverse((wR) => wV.push(wR));
    let wD = wV.length === kb.length,
      wm = wD ? wV.map((wR, wl) => [wl, wR]) : [],
      wS = wD ? ky.map((wR) => wV[kb.indexOf(wR.node)]) : [],
      wr = [];
    wV.forEach((wR, wl) =>
      w1(wR, wk, wR.isMesh && (wR.isSkinnedMesh || (wD && kn(kb[wl]))), wS, !1, wr),
    );
    let wE = [];
    wS.forEach((wR, wl) => {
      ky[wl].parent >= 0 && wE.push({ node: wR, from: wS[ky[wl].parent], owner: ky[wl].parent });
    });
    let wF = null,
      wC = null;
    (kL?.companion &&
      kL.driverFor &&
      ((wF = kT(kL.companion)),
      wF.traverse((wR) => w1(wR, wk, wR.isSkinnedMesh, wS, !0, wr)),
      (wC = kL.driverFor(ww, wF)),
      (wF.visible = !1),
      kA.add(wF)),
      (kq ??= yu(kK)));
    let wt = new kK['ShaderMateri' + 'al']({
      uniforms: { uGhostColor: { value: new kK['Vector4'](1, 1, 1, 0.5) }, uPerBone: { value: 0 } },
      vertexShader: mu,
      fragmentShader: hu,
      depthWrite: !1,
      toneMapped: !1,
      blending: kK.CustomBlending,
    });
    kN(wt);
    let wH = new kK['InstancedMes' + 'h'](kq, wt, Math.max(1, wE.length));
    ((wH.frustumCulled = !1), (wH.visible = !1), kA.add(wH), (ww.visible = !1), kA.add(ww));
    let wa = {
      root: ww,
      pairs: wm,
      theirs: wF,
      drive: wC,
      uniforms: wk,
      meshes: wr,
      joints: wS,
      bones: wE,
      boneMesh: wH,
      boneMaterial: wt,
      frame: null,
      part: null,
    };
    return (kW.push(wa), wa);
  }
  function w3() {
    for (let wk of kW) {
      (wk.root.removeFromParent(), wk.theirs?.removeFromParent(), wk.boneMesh.removeFromParent());
      for (let ww of wk.meshes) (ww.material.dispose(), ww.userData.ghost?.tex.dispose());
      (wk.boneMaterial.dispose(), wk.boneMesh.dispose());
    }
    kW.length = 0;
  }
  let w4 = (wk) => wk.root.visible || wk.boneMesh.visible || !!wk.theirs?.visible;
  function w5(wk) {
    ((wk.root.visible = !1),
      wk.theirs && (wk.theirs.visible = !1),
      (wk.boneMesh.visible = !1),
      (wk.frame = null));
  }
  let w6 = (wk, ww) =>
      wk.tints && ww >= 0 ? [wk.tints[ww * 3], wk.tints[ww * 3 + 1], wk.tints[ww * 3 + 2]] : wk.rgb,
    w7 = (wk, ww) => !wk.part || (ww >= 0 && wk.part.has(ww));
  function w8(wk, ww) {
    for (let wV of wk.meshes) {
      let { map: wD, anchor: wm, tex: wS } = wV.userData.ghost;
      if (wD) {
        let wr = wS.image.data;
        for (let wE = 0; wE < wD.length; wE++) {
          let wF = wD[wE] >= 0 ? wD[wE] : wm,
            wC = w6(ww, wF);
          ((wr[wE * 4] = Math.round(wC[0] * 255)),
            (wr[wE * 4 + 1] = Math.round(wC[1] * 255)),
            (wr[wE * 4 + 2] = Math.round(wC[2] * 255)),
            (wr[wE * 4 + 3] = w7(ww, wF) ? 255 : 0));
        }
        wS.needsUpdate = !0;
      } else {
        let wt = w6(ww, wm);
        (wV.material.uniforms.uRigidTint.value.set(wt[0], wt[1], wt[2]),
          (wV.material.uniforms.uRigidMask.value = w7(ww, wm) ? 1 : 0));
      }
    }
  }
  function w9(wk, ww) {
    let wV = ww.pose.data,
      wD = ww.pose.shown;
    for (let [wr, wE] of wk.pairs)
      (wE.position.fromArray(wV, wr * 10),
        wE.quaternion.fromArray(wV, wr * 10 + 3),
        wE.scale.fromArray(wV, wr * 10 + 7),
        wr > 0 && !wE.userData.ghostHidden && (wE.visible = wD[wr] === 1));
    (wk.root.updateMatrixWorld(!0),
      wk.drive?.(),
      wk.theirs?.updateMatrixWorld(!0),
      (wk.frame = ww.frame ?? null),
      (wk.part = ww.part ?? null));
    let wm = wk.meshes.some((wF) => wF.isSkinnedMesh && wF.visible);
    if (ww.showMesh && wm) {
      let wF = wk.uniforms;
      (wF.uGhostColor.value.set(ww.rgb[0], ww.rgb[1], ww.rgb[2], ww.alpha),
        (wF.uStyle.value = gu[ww.shading] ?? 0),
        (wF.uPerBone.value = ww.tints ? 1 : 0),
        (wF.uMasked.value = ww.part ? 1 : 0),
        (ww.tints || ww.part || wk.painted) && w8(wk, ww),
        (wk.painted = !!(ww.tints || ww.part)));
      for (let wC of wk.meshes) {
        let wt = wC.material;
        ((wt.transparent = !1),
          (wt.blending = ww.shading === 'dither' ? kK.NoBlending : kK.CustomBlending),
          (wt.depthTest = !ww.inFront),
          (wC.renderOrder = ww.order));
      }
      ((wk.root.visible = kX.visible),
        wk.theirs && (wk.theirs.visible = kX.visible && kL?.companion?.visible !== !1),
        (wk.boneMesh.visible = !1));
      return;
    }
    ((wk.root.visible = !1), wk.theirs && (wk.theirs.visible = !1));
    let wS = 0;
    for (let wH of wk.bones) {
      if (!w7(ww, wH.owner)) continue;
      (wH.from.getWorldPosition(kY), wH.node.getWorldPosition(kv), kB.subVectors(kv, kY));
      let wa = kB.length();
      if (
        (kG.setFromUnitVectors(kP, wa > 1e-9 ? kB.divideScalar(wa) : kP),
        kg.setScalar(Math.max(wa, 0.000001)),
        wk.boneMesh.setMatrixAt(wS, kI.compose(kY, kG, kg)),
        ww.tints)
      ) {
        let we = w6(ww, wH.owner);
        wk.boneMesh.setColorAt(wS, kh.setRGB(we[0], we[1], we[2]));
      }
      wS++;
    }
    ((wk.boneMesh.count = wS),
      (wk.boneMesh.instanceMatrix.needsUpdate = !0),
      wk.boneMesh.instanceColor && (wk.boneMesh.instanceColor.needsUpdate = !0),
      wk.boneMaterial.uniforms.uGhostColor.value.set(ww.rgb[0], ww.rgb[1], ww.rgb[2], ww.alpha),
      (wk.boneMaterial.uniforms.uPerBone.value = ww.tints && wk.boneMesh.instanceColor ? 1 : 0),
      (wk.boneMaterial.depthTest = !ww.inFront),
      (wk.boneMesh.renderOrder = ww.order),
      (wk.boneMesh.visible = kX.visible && wS > 0));
  }
  return {
    setRig(wk, ww = null) {
      (w3(),
        (kX = wk || null),
        (kL = ww || null),
        (kb = []),
        kX?.traverse((wV) => kb.push(wV)),
        kM(),
        kx++);
    },
    get version() {
      return kx;
    },
    jointList: () => ky.map((wk) => ({ name: wk.name, parent: wk.parent })),
    capture() {
      if (!kX) return null;
      let wk = [];
      (kX.traverse((wm) => wk.push(wm)),
        (wk.length !== kb.length || wk.some((wm, wS) => wm !== kb[wS])) &&
          (w3(), (kb = wk), kM(), kx++));
      let ww = new Float64Array(kb.length * 10),
        wV = new Uint8Array(kb.length);
      (kb.forEach((wm, wS) => {
        (wm.position.toArray(ww, wS * 10),
          wm.quaternion.toArray(ww, wS * 10 + 3),
          wm.scale.toArray(ww, wS * 10 + 7),
          (wV[wS] = wm.visible ? 1 : 0));
      }),
        kX.updateWorldMatrix(!0, !0));
      let wD = new Float32Array(ky.length * 3);
      return (
        ky.forEach((wm, wS) => {
          kY.setFromMatrixPosition(wm.node.matrixWorld).toArray(wD, wS * 3);
        }),
        { version: kx, data: ww, shown: wV, pos: wD }
      );
    },
    show(wk) {
      let ww = 0;
      if (kX) {
        for (let wV of wk) !wV.pose || wV.pose.version !== kx || (w9(kW[ww] ?? w2(), wV), ww++);
      }
      for (; ww < kW.length; ww++) w5(kW[ww]);
    },
    hide() {
      for (let wk of kW) w5(wk);
    },
    shown: () => kW.filter(w4).length,
    ghosts() {
      return kW
        .filter(w4)
        .map((wk) => ({
          frame: wk.frame,
          joints: wk.joints
            .filter((ww, wV) => !wk.part || wk.part.has(wV))
            .map((ww) => ww.getWorldPosition(new kK['Vector3']())),
        }));
    },
    dispose() {
      (w3(), kq?.dispose(), (kq = null));
    },
  };
}
function Ts(kK, kT) {
  let kA = new kK['Object3D'](),
    kn = new kK['Object3D'](),
    kX = new kK['Object3D'](),
    kL = new kK.Object3D();
  return (
    (kA.name = 'prop-base:' + kT),
    (kn.name = 'prop-lead:' + kT),
    (kX.name = 'prop-follow:' + kT),
    (kL.name = 'prop-out:' + kT),
    (kA.userData.ikEffector = !0),
    kA.add(kn),
    kn.add(kX),
    kn.add(kL),
    { base: kA, lead: kn, follow: kX, propOut: kL }
  );
}
function As(kK, kT, { bone: kA, tip: kn, frame: kX, home: kL, reframe: kb, pelvis: kx }, ky) {
  let { base: kW, lead: kq, follow: kP, propOut: kY } = kT;
  if (!kA || !kX || !kL) return;
  let kv = ky;
  (kW.parent !== kL && kL.add(kW),
    kb &&
      (kW.updateMatrixWorld(!0),
      kq.updateMatrixWorld(!0),
      kv.c.copy(kW.matrixWorld).invert(),
      kv.d.multiplyMatrices(kq.matrixWorld, kv.c)),
    kA.updateMatrixWorld(!0),
    kX.updateMatrixWorld(!0),
    kL.updateMatrixWorld(!0),
    kA.getWorldPosition(kv.p),
    kX.getWorldQuaternion(kv.q),
    kx && (kv.p.applyMatrix4(kx.mat), kx.onFrame && kv.q.premultiply(kx.quat)),
    kv.a.compose(kv.p, kv.q, kv.s.set(1, 1, 1)),
    kv.b.copy(kL.matrixWorld).invert().multiply(kv.a).decompose(kW.position, kW.quaternion, kv.s),
    kW.scale.set(1, 1, 1),
    kW.updateMatrixWorld(!0),
    kb &&
      (kv.c.copy(kW.matrixWorld).invert(),
      kv.c.multiply(kv.d).multiply(kW.matrixWorld).decompose(kq.position, kq.quaternion, kv.s),
      kq.scale.set(1, 1, 1),
      kq.updateMatrixWorld(!0)),
    kv.a.copy(kW.matrixWorld).invert(),
    kn &&
      (kn.updateMatrixWorld(!0),
      kx
        ? (kv.c.multiplyMatrices(kx.mat, kn.matrixWorld), kv.b.multiplyMatrices(kv.a, kv.c))
        : kv.b.multiplyMatrices(kv.a, kn.matrixWorld),
      kv.b.decompose(kP.position, kP.quaternion, kv.s),
      kP.scale.set(1, 1, 1)),
    kx
      ? (kv.c.multiplyMatrices(kx.mat, kA.matrixWorld), kv.b.multiplyMatrices(kv.a, kv.c))
      : kv.b.multiplyMatrices(kv.a, kA.matrixWorld),
    kv.b.decompose(kY.position, kY.quaternion, kv.s),
    kY.scale.set(1, 1, 1),
    kq.updateMatrixWorld(!0));
}
var Os = (kK) => ({
    a: new kK['Matrix4'](),
    b: new kK['Matrix4'](),
    c: new kK.Matrix4(),
    d: new kK['Matrix4'](),
    p: new kK['Vector3'](),
    q: new kK['Quaternion'](),
    s: new kK['Vector3'](),
  }),
  qe = {
    chain: [0.95, 0.95, 1],
    axis: [0.35, 0.35, 0.45],
    pole: [0.25, 0.95, 0.45],
    target: [0.2, 0.85, 1],
    missed: [1, 0.3, 0.3],
    fk: [1, 0.35, 0.9],
    offset: [1, 0.85, 0.2],
    idle: [0.45, 0.45, 0.55],
  };
function Bs(kK, kT = 4) {
  let kA = Math.max(1, kT) * 16 * 2,
    kn = new Float32Array(kA * 3),
    kX = new Float32Array(kA * 3),
    kL = new kK['BufferGeomet' + 'ry'](),
    kb = new kK['BufferAttrib' + 'ute'](kn, 3),
    kx = new kK['BufferAttrib' + 'ute'](kX, 3);
  (kb.setUsage(kK.DynamicDrawUsage),
    kx.setUsage(kK.DynamicDrawUsage),
    kL.setAttribute('position', kb),
    kL.setAttribute('color', kx),
    kL.setDrawRange(0, 0));
  let ky = new kK['LineBasicMat' + 'erial']({
      vertexColors: !0,
      depthTest: !1,
      depthWrite: !1,
      transparent: !0,
      opacity: 0.95,
    }),
    kW = new kK['LineSegments'](kL, ky);
  ((kW.name = 'ik-debug'),
    (kW.frustumCulled = !1),
    (kW.renderOrder = 999),
    (kW.visible = !1),
    (kW.matrixAutoUpdate = !1));
  let kq = 0,
    kP = (kG, kg, kI, kh, kN, ki, kM) => {
      if (kq + 2 > kA) return;
      let w0 = kq * 3;
      ((kn[w0] = kG),
        (kn[w0 + 1] = kg),
        (kn[w0 + 2] = kI),
        (kX[w0] = kM[0]),
        (kX[w0 + 1] = kM[1]),
        (kX[w0 + 2] = kM[2]),
        (w0 += 3),
        (kn[w0] = kh),
        (kn[w0 + 1] = kN),
        (kn[w0 + 2] = ki),
        (kX[w0] = kM[0]),
        (kX[w0 + 1] = kM[1]),
        (kX[w0 + 2] = kM[2]),
        (kq += 2));
    },
    kY = (kG, kg, kI) => {
      (kP(kG.x - kg, kG.y, kG.z, kG.x + kg, kG.y, kG.z, kI),
        kP(kG.x, kG.y - kg, kG.z, kG.x, kG.y + kg, kG.z, kI),
        kP(kG.x, kG.y, kG.z - kg, kG.x, kG.y, kG.z + kg, kI));
    };
  function kv(kG) {
    let kg = kG.active ? qe.chain : qe.idle;
    (kP(kG.root.x, kG.root.y, kG.root.z, kG.mid.x, kG.mid.y, kG.mid.z, kg),
      kP(kG.mid.x, kG.mid.y, kG.mid.z, kG.tip.x, kG.tip.y, kG.tip.z, kg),
      kP(kG.root.x, kG.root.y, kG.root.z, kG.tip.x, kG.tip.y, kG.tip.z, qe.axis),
      kP(
        kG.mid.x,
        kG.mid.y,
        kG.mid.z,
        kG.mid.x + kG.pole.x * 0.12,
        kG.mid.y + kG.pole.y * 0.12,
        kG.mid.z + kG.pole.z * 0.12,
        qe.pole,
      ),
      kG.hasTarget &&
        (kY(kG.fkTip, 0.02 * 0.7, qe.fk),
        kY(kG.target, 0.02, kG.reached ? qe.target : qe.missed),
        kP(kG.fkTip.x, kG.fkTip.y, kG.fkTip.z, kG.target.x, kG.target.y, kG.target.z, qe.offset),
        kP(
          kG.tip.x,
          kG.tip.y,
          kG.tip.z,
          kG.target.x,
          kG.target.y,
          kG.target.z,
          kG.reached ? qe.target : qe.missed,
        ),
        kG.hasPole &&
          (kP(
            kG.mid.x,
            kG.mid.y,
            kG.mid.z,
            kG.poleTarget.x,
            kG.poleTarget.y,
            kG.poleTarget.z,
            qe.pole,
          ),
          kY(kG.poleTarget, 0.02 * 0.7, qe.pole))));
  }
  function kB(kG) {
    if (kW.visible) {
      kq = 0;
      for (let kg of kG || []) kv(kg);
      (kL.setDrawRange(0, kq), (kb.needsUpdate = !0), (kx.needsUpdate = !0));
    }
  }
  return {
    object3d: kW,
    update: kB,
    setVisible(kG) {
      ((kW.visible = !!kG), kW.visible || kL.setDrawRange(0, 0));
    },
    get visible() {
      return kW.visible;
    },
    dispose() {
      (kL.dispose(), ky.dispose());
    },
  };
}
var Bu = [
  ['Chain', qe.chain, 'The limb as solved'],
  ['Pole', qe.pole, 'The plane the joint bends in \u2014 and the hint, once you place one'],
  ['FK', qe.fk, 'Where the clip put the tip, before your offset'],
  ['Target', qe.target, 'What the solver aimed at'],
  ['Offset', qe.offset, 'The gap between them \u2014 your sliders'],
  ['Missed', qe.missed, 'Target out of reach; the chain is doing its best'],
];
function Fu(kK) {
  return (
    '#' +
    kK
      .map((kT) =>
        Math.round(Math.min(1, Math.max(0, kT)) * 255)
          .toString(16)
          .padStart(2, '0'),
      )
      .join('')
  );
}
var zr = 0.028;
function Fs(kK, kT, kA = () => null) {
  let kn = new kK['Object3D']();
  ((kn.name = 'ik-effectors'), (kn.matrixAutoUpdate = !1));
  let kX = new kK['SphereGeomet' + 'ry'](zr, 14, 10),
    kL = new kK['OctahedronGe' + 'ometry'](zr * 0.7),
    kb = {
      idle: kx(3120086, 0.55),
      on: kx(3398143, 0.95),
      sel: kx(16766515, 1),
      poleIdle: kx(3116874, 0.55),
      poleOn: kx(4256370, 0.95),
    };
  function kx(wd, wK) {
    return new kK['MeshBasicMat' + 'erial']({
      color: wd,
      wireframe: !0,
      transparent: !0,
      opacity: wK,
      depthTest: !1,
      depthWrite: !1,
    });
  }
  let ky = new Map();
  for (let { key: wd, label: wK, tip: wT, kind: wA = 'limb' } of kT) {
    let wX = new kK['Object3D']();
    wX.name = 'ik-anchor:' + wd;
    let wL = new kK.Object3D();
    ((wL.name = 'effector:' + wd), wX.add(wL));
    let wb = wA === 'pole',
      wx = new kK['Mesh'](wb ? kL : kX, wb ? kb.poleIdle : kb.idle);
    ((wx.renderOrder = 998),
      (wx.userData.limb = wd),
      wL.add(wx),
      kn.add(wX),
      ky.set(wd, {
        key: wd,
        label: wK,
        tip: wT,
        anchor: wX,
        node: wL,
        marker: wx,
        kind: wA,
        enabled: !1,
        authored: new kK.Quaternion(),
        dRot: new kK['Quaternion'](),
        parentBone: null,
        ride: null,
        driver: wT,
        drawnAt: new kK['Vector3'](),
        keyPos: null,
        keyRot: null,
      }),
      (wX.userData.ikEffector = !0));
  }
  let kW = null,
    kq = null,
    kP = 1;
  function kY(wy) {
    kP = Number(wy) > 0 ? Number(wy) : 1;
  }
  let kv = !0;
  function kB(wy) {
    kv = !!wy;
    for (let wW of ky.values()) wW.marker.visible = kv;
  }
  let kG = new kK['Quaternion'](),
    kg = new kK['Quaternion'](),
    kI = new kK['Quaternion'](),
    kh = new kK['Quaternion'](),
    kN = new kK['Vector3']();
  function ki() {
    let wy = kA();
    (wy ? wy.getWorldQuaternion(kG) : kG.identity(), kg.copy(kG).invert());
  }
  let kM = new kK['Quaternion']();
  function w0(wy) {
    (wy.tip.getWorldQuaternion(kI),
      wy.parentBone && wy.ride
        ? (wy.parentBone.getWorldQuaternion(kM).multiply(wy.ride).invert(),
          wy.authored.copy(kM).multiply(kI))
        : wy.authored.copy(kg).multiply(kI));
  }
  function w1(wy) {
    let wW = wy.driver && wy.driver !== wy.tip;
    ((wy.driver ?? wy.tip).getWorldPosition(kN),
      wW ? wy.driver.getWorldQuaternion(kh).multiply(kI.copy(wy.authored).invert()) : kh.copy(kG),
      wy.parentBone
        ? (wy.parentBone.updateMatrixWorld(!0),
          wy.anchor.position.copy(wy.parentBone.worldToLocal(kN)),
          wy.ride && !wW
            ? wy.anchor.quaternion.copy(wy.ride)
            : (wy.parentBone.getWorldQuaternion(kI).invert(),
              wy.anchor.quaternion.copy(kI).multiply(kh)))
        : (wy.anchor.position.copy(kN), wy.anchor.quaternion.copy(kh)),
      wy.anchor.scale.setScalar(wy.parentBone ? 1 : kP),
      wy.anchor.updateMatrixWorld(!0),
      wy.node.updateMatrixWorld(!0),
      wy.node.getWorldPosition(wy.drawnAt));
  }
  function w2(wy, wW) {
    let wq = ky.get(wy),
      wP = wW ?? wq?.tip ?? null;
    if (!wq || wq.driver === wP) return;
    wq.node.updateMatrixWorld(!0);
    let wY = wq.node.getWorldPosition(new kK['Vector3']());
    ((wq.driver = wP),
      ki(),
      w0(wq),
      w1(wq),
      wq.node.position.copy(wq.anchor.worldToLocal(wY)),
      wq.node.updateMatrixWorld(!0));
  }
  let w3 = (wy) => ky.get(wy)?.driver ?? null,
    w4 = new kK.Matrix4(),
    w5 = new kK['Matrix4'](),
    w6 = new kK['Vector3'](),
    w7 = new kK.Quaternion(),
    w8 = new kK['Vector3']();
  function w9(wy, wW, wq = {}) {
    let wP = ky.get(wy),
      wY = wq.ride ?? null,
      wv = (!wY && !wP?.ride) || !!(wY && wP?.ride && Math.abs(wY.dot(wP.ride)) > 1 - 1e-12);
    if (!wP || (wP.parentBone === (wW ?? null) && wv)) return;
    let wB = !wY && !wP.ride && !wq.carryFrom && !wq.carryTo,
      wG = !wB && !wP.enabled && !wO(wy);
    (!wB &&
      !wG &&
      (ki(),
      w0(wP),
      w1(wP),
      kq !== wP.key && wP.node.quaternion.copy(wP.dRot).multiply(wP.authored)),
      wP.node.updateWorldMatrix(!0, !1));
    let wg = wP.node.getWorldPosition(new kK.Vector3());
    (w4.copy(wP.node.matrixWorld),
      wq.carryFrom && w4.premultiply(wq.carryFrom),
      (wP.parentBone = wW ?? null),
      (wP.ride = wW && wY ? wY.clone() : null),
      (wW ?? kn).add(wP.anchor),
      ki(),
      wB || w0(wP),
      w1(wP),
      wB
        ? wP.node.position.copy(wP.anchor.worldToLocal(wg))
        : wG
          ? (wP.node.position.set(0, 0, 0),
            wP.dRot.identity(),
            wP.node.quaternion.copy(wP.authored))
          : (w5.copy(wP.anchor.matrixWorld),
            wq.carryTo && w5.premultiply(wq.carryTo),
            w5.invert().multiply(w4).decompose(w6, w7, w8),
            wP.node.position.copy(w6),
            wP.dRot.copy(w7).multiply(kI.copy(wP.authored).invert()).normalize(),
            wP.node.quaternion.copy(wP.dRot).multiply(wP.authored)),
      wP.node.updateMatrixWorld(!0));
  }
  let wk = (wy) => ky.get(wy)?.parentBone ?? null,
    ww = new kK['Euler'](),
    wV = new kK.Quaternion();
  function wD(wy, wW) {
    let wq = ky.get(wy);
    if (!wq) return;
    if (!wW?.length) {
      wq.keyPos = wq.keyRot = null;
      return;
    }
    wq.keyPos = P(Y(wW, [0, 1, 2]));
    let wP =
      wq.kind !== 'pole' &&
      wW.some((wY) => [3, 4, 5].some((wv) => Math.abs(Number(wY.v?.[wv]) || 0) > 1e-9))
        ? P(Y(wW, [3, 4, 5]))
        : null;
    wq.keyRot = wP
      ? (wY) => {
          let wv = wP(wY) || [0, 0, 0];
          return (
            ww.set(wv[0] * wc, wv[1] * wc, wv[2] * wc, 'XYZ'),
            wV.setFromEuler(ww),
            [wV.x, wV.y, wV.z, wV.w]
          );
        }
      : null;
  }
  function wm(wy, wW) {
    if (!wy.keyPos || wW == null || kq === wy.key) return;
    let wq = wy.keyPos(wW) || [0, 0, 0];
    if ((wy.node.position.set(wq[0], wq[1], wq[2]), wy.keyRot)) {
      let wP = wy.keyRot(wW);
      wy.dRot.set(wP[0], wP[1], wP[2], wP[3]);
    } else wy.dRot.identity();
  }
  let wS = () => [...ky.values()].some((wy) => wy.enabled && wy.keyPos);
  function wr(wy = null) {
    ki();
    for (let wW of ky.values())
      wW.enabled &&
        (w0(wW),
        w1(wW),
        wm(wW, wy),
        kq !== wW.key &&
          (wW.node.quaternion.copy(wW.dRot).multiply(wW.authored), wW.node.updateMatrixWorld(!0)));
  }
  function wE(wy, wW = null) {
    let wq = ky.get(wy);
    return !wq || !wq.enabled
      ? null
      : (ki(),
        w0(wq),
        w1(wq),
        wm(wq, wW),
        kq !== wq.key &&
          (wq.node.quaternion.copy(wq.dRot).multiply(wq.authored), wq.node.updateMatrixWorld(!0)),
        wq.node);
  }
  function wF(wy) {
    let wW = ky.get(wy);
    wW && wW.dRot.copy(wW.node.quaternion).multiply(kI.copy(wW.authored).invert());
  }
  function wC(wy) {
    kq = wy && ky.has(wy) ? wy : null;
  }
  function wt(wy, wW) {
    let wq = ky.get(wy);
    wq &&
      ((wq.enabled = !!wW),
      (wq.anchor.visible = wq.enabled),
      !wq.enabled && kq === wy && (kq = null),
      wH(),
      wq.enabled && wr());
  }
  function wH() {
    for (let wy of ky.values()) {
      let wW = wy.kind === 'pole';
      wy.marker.material = wy.enabled
        ? wy.key === kW
          ? kb.sel
          : wW
            ? kb.poleOn
            : kb.on
        : wW
          ? kb.poleIdle
          : kb.idle;
    }
  }
  let wa = new kK['Euler'](),
    wR = 180 / Math.PI;
  function wl(wy) {
    let wW = ky.get(wy);
    return wW
      ? (wa.setFromQuaternion(wW.dRot, 'XYZ'),
        [...wW.node.position.toArray(), wa.x * wR, wa.y * wR, wa.z * wR])
      : [0, 0, 0, 0, 0, 0];
  }
  let wQ = new kK['Euler'](),
    wc = Math.PI / 180;
  function wj(wy, wW) {
    let wq = ky.get(wy);
    wq &&
      (wq.node.position.set(Number(wW[0]) || 0, Number(wW[1]) || 0, Number(wW[2]) || 0),
      wW.length >= 6 &&
        (wQ.set(
          (Number(wW[3]) || 0) * wc,
          (Number(wW[4]) || 0) * wc,
          (Number(wW[5]) || 0) * wc,
          'XYZ',
        ),
        wq.dRot.setFromEuler(wQ),
        wq.node.quaternion.copy(wq.dRot).multiply(wq.authored)),
      wq.node.updateMatrixWorld(!0));
  }
  function wz(wy) {
    let wW = ky.get(wy);
    wW &&
      (wW.node.position.set(0, 0, 0),
      wW.dRot.identity(),
      wW.node.quaternion.copy(wW.authored),
      wW.node.updateMatrixWorld(!0));
  }
  function wp() {
    for (let wy of ky.keys()) wz(wy);
  }
  function wO(wy) {
    let wW = ky.get(wy);
    return wW ? wW.node.position.lengthSq() > 1e-10 || Math.abs(wW.dRot.w) < 1 - 1e-7 : !1;
  }
  function wf(wy) {
    return ((kW = ky.has(wy) ? wy : null), wH(), kW);
  }
  function wJ() {
    for (let wy of ky.values()) wy.enabled && wy.node.getWorldPosition(wy.drawnAt);
  }
  function wZ(wy) {
    let wW = null,
      wq = 1 / 0,
      wP = (zr * 1.35 * kP) ** 2;
    for (let wY of ky.values()) {
      if (!wY.enabled || wy.ray.distanceSqToPoint(wY.drawnAt) > wP) continue;
      let wv = wy.ray.origin.distanceToSquared(wY.drawnAt);
      wv < wq && ((wq = wv), (wW = wY.key));
    }
    return wW;
  }
  function wU(wy, wW) {
    let wq = ky.get(wy);
    return wq ? wq.node.getWorldPosition(wW ?? kN.clone()) : null;
  }
  return {
    group: kn,
    update: wr,
    updateOne: wE,
    capture: wF,
    setDragging: wC,
    setEnabled: wt,
    select: wf,
    pick: wZ,
    position: wU,
    delta: wl,
    setKeys: wD,
    hasKeys: wS,
    setDelta: wj,
    setParent: w9,
    parentOf: wk,
    setScale: kY,
    setShown: kB,
    get shown() {
      return kv;
    },
    setDriver: w2,
    driverOf: w3,
    snapshot: wJ,
    reset: wz,
    resetAll: wp,
    touched: wO,
    node: (wy) => ky.get(wy)?.node ?? null,
    anchor: (wy) => ky.get(wy)?.anchor ?? null,
    enabled: () => [...ky.values()].filter((wy) => wy.enabled).map((wy) => wy.key),
    get selected() {
      return kW;
    },
    get dragging() {
      return kq;
    },
    kind: (wy) => ky.get(wy)?.kind ?? null,
    dispose() {
      (kX.dispose(), kL.dispose());
      for (let wy of Object.values(kb)) wy.dispose();
    },
  };
}
function zs(kK, { rigRoot: kT, ikStage: kA, effectors: kn, THREE: kX, fps: kL = 30 } = {}) {
  if (!kK || !kT || !kA || !kX) return kK;
  let kb = kA.active?.() ?? [],
    kx = kA.pelvisActive?.() ? kA.pelvis?.() : null;
  if (!kb.length && !kx) return kK;
  let ky = new Set(kb);
  if (kx) {
    for (let kN of kA.followers?.() ?? []) ky.add(kN);
  }
  let kW = new Set(),
    kq = new Set();
  for (let ki of ky) {
    for (let kM of kA.chainBones?.(ki) ?? []) kW.add(kM);
    for (let w0 of kA.placedBones?.(ki) ?? []) kq.add(w0);
  }
  if ((kx && kW.add(kx.name), !kW.size)) return kK;
  let kP = new Map();
  kT.traverse((w1) => {
    w1.name && !kP.has(w1.name) && kP.set(w1.name, w1);
  });
  let kY = wu(kK, kW, 1, kL);
  if (kA.hasWindows?.() || kn?.hasKeys?.()) {
    let w1 = Math.max(2, Math.round(kK.duration * kL) + 1),
      w2 = Array.from({ length: w1 }, (w3, w4) => (w4 / (w1 - 1)) * kK.duration);
    kY = [...new Set([...kY, ...w2].map((w3) => +w3.toFixed(6)))].sort((w3, w4) => w3 - w4);
  }
  if (kY.length < 2) return kK;
  let kv = new kX['AnimationMix' + 'er'](kT),
    kB = kv.clipAction(kK);
  kB.play();
  let kG = new Map(),
    kg = new Map();
  for (let w3 of kW) kG.set(w3, new Float32Array(kY.length * 4));
  kx && kg.set(kx.name, new Float32Array(kY.length * 3));
  for (let w4 of kq) kg.set(w4, new Float32Array(kY.length * 3));
  for (let w5 = 0; w5 < kY.length; w5++) {
    (kv.setTime(Math.min(kY[w5], kK.duration - 0.000001)), kT.updateMatrixWorld(!0));
    let w6 = kK.duration > 0 ? kY[w5] / kK.duration : null;
    (kn?.update(w6), kA.run(w6));
    for (let w7 of kW) {
      let w8 = kP.get(w7);
      if (!w8) continue;
      let w9 = kG.get(w7);
      ((w9[w5 * 4] = w8.quaternion.x),
        (w9[w5 * 4 + 1] = w8.quaternion.y),
        (w9[w5 * 4 + 2] = w8.quaternion.z),
        (w9[w5 * 4 + 3] = w8.quaternion.w));
      let wk = kg.get(w7);
      wk &&
        ((wk[w5 * 3] = w8.position.x),
        (wk[w5 * 3 + 1] = w8.position.y),
        (wk[w5 * 3 + 2] = w8.position.z));
    }
    kA.restore();
  }
  (kB.stop(), kv.uncacheClip(kK), kT.updateMatrixWorld(!0));
  let kI = kK.clone(),
    kh = new Float32Array(kY);
  for (let [ww, wV] of kG) Ws(kI, ww + '.quaternion', kX.QuaternionKeyframeTrack, kh, wV);
  for (let [wD, wm] of kg) Ws(kI, wD + '.position', kX.VectorKeyframeTrack, kh, wm);
  return ((kI.name = kK.name), kI);
}
function wu(kK, kT, kA, kn = 30) {
  let kX = new Set();
  for (let kx of kK.tracks) {
    let ky = kx.name.split('.')[0];
    if (kT.has(ky)) {
      for (let kW of kx.times) kX.add(kW);
    }
  }
  let kL = [...kX].sort((kq, kP) => kq - kP);
  if (kL.length < 2) {
    let kq = Math.max(2, Math.round(kK.duration * kn) + 1);
    kL = Array.from({ length: kq }, (kP, kY) => (kY / (kq - 1)) * kK.duration);
  }
  let kb = [];
  for (let kP = 0; kP < kL.length - 1; kP++) {
    let kY = kL[kP],
      kv = kL[kP + 1];
    for (let kB = 0; kB < kA; kB++) kb.push(kY + (kv - kY) * (kB / kA));
  }
  return (kb.push(kL[kL.length - 1]), kb);
}
function Ws(kK, kT, kA, kn, kX) {
  let kL = new kA(kT, kn, kX),
    kb = kK.tracks.findIndex((kx) => kx.name === kT);
  kb >= 0 ? (kK.tracks[kb] = kL) : kK.tracks.push(kL);
}
var bu = 20000;
function af({ container: kK, assetRoot: kT, rig: kA = s, clearPictures: kX = !1 }) {
  let kL = new G(),
    kb = kA,
    kx = !1,
    ky = new Map(),
    kW = new Map(),
    kq = [],
    kP = [],
    kY,
    kv,
    kB,
    kG,
    kg,
    kI = null,
    kh = [],
    kN = null,
    kM = !1,
    w0 = null,
    w1 = !1,
    w2 = !1,
    w3 = 1,
    w4 = !1,
    w5 = !1,
    w6 = !1,
    w7 = !1,
    w8 = n(),
    w9 = null,
    wk = { l: null, r: null },
    ww = { l: null, r: null },
    wV = (CR) => (CR === 'l' ? 'r' : 'l');
  function wD(CR = !1) {
    if (!DP || !Dv) return;
    let CQ = null;
    CR && (Dv.update(wJ()), (CQ = wm()));
    let Cj = (Cz) => {
      let Cp = mj.parents[Cz],
        CO = wC(Cz, Cp),
        Cf = {};
      (Cp === 'chest' && (Cf.ride = wF(CO)),
        CQ && ((Cf.carryFrom = wS(Dv.parentOf(Cz)) ? CQ : null), (Cf.carryTo = wS(CO) ? CQ : null)),
        Dv.setParent(Cz, CO, Cf));
    };
    for (let Cz of wq()) Cj(Cz);
    for (let Cp of wA()) Cj(e(Cp));
  }
  function wm() {
    let CR = DP?.pelvis();
    if (!CR || !mj.enabled.has('pelvis')) return null;
    kI.updateMatrixWorld(!0);
    let CQ = CR.matrixWorld.clone();
    if (!DP.carry(wJ())) return null;
    let Cj = CR.matrixWorld.clone().multiply(CQ.invert());
    return (DP.restore(), Cj);
  }
  let wS = (CR) => {
    let CQ = DP?.pelvis();
    for (let Cj = CR; Cj && CQ; Cj = Cj.parent) if (Cj === CQ) return !0;
    return !1;
  };
  function wr() {
    let CR = DP?.root('arm_l'),
      CQ = DP?.root('arm_r');
    if (!CR || !CQ) return null;
    let Cj = new Set();
    for (let Cz = CR.parent; Cz; Cz = Cz.parent) Cj.add(Cz);
    for (let Cp = CQ.parent; Cp; Cp = Cp.parent) if (Cj.has(Cp)) return Cp.isBone ? Cp : null;
    return null;
  }
  let wE = new Map();
  function wF(CR) {
    if (!CR || !kI) return null;
    if (wE.has(CR)) return wE.get(CR);
    let CQ = null,
      Cj = (Cz, Cp) => {
        let CO = new km();
        return (
          new kH().copy(Cz.skeleton.boneInverses[Cp]).invert().decompose(new kE(), CO, new kE()),
          CO
        );
      };
    return (
      kI.traverse((Cz) => {
        if (CQ || !Cz.isSkinnedMesh) return;
        let Cp = Cz.skeleton.bones.indexOf(CR),
          CO = mz ? Cz.skeleton.bones.indexOf(mz) : -1;
        Cp < 0 ||
          (CQ = Cj(Cz, Cp)
            .invert()
            .multiply(CO < 0 ? new km() : Cj(Cz, CO)));
      }),
      wE.set(CR, CQ),
      CQ
    );
  }
  function wC(CR, CQ) {
    if (!CQ || CQ === 'root') return null;
    if (CQ === 'pelvis') return DP?.pelvis() ?? null;
    if (CQ === 'chest') return wr();
    if (CQ === 'prop') {
      let Cj = /_r$/i.test(String(CR)) ? 'r' : 'l';
      return Dq.get(z[Cj])?.bone ?? null;
    }
    if (CQ === 'tip') {
      let Cz = String(CR).replace(/^pole\./, '');
      return DP?.tip(Cz) ?? null;
    }
    return null;
  }
  function wH() {
    if (!DP) return;
    DP.clear();
    for (let Cp of DP.limbs()) {
      if (!mj.enabled.has(Cp)) continue;
      let CO = e(Cp);
      DP.set(Cp, {
        node: Dv?.node(Cp),
        poleNode: wR(CO) ? Dv.node(CO) : null,
        positionWeight: mj.positionWeight,
      });
    }
    DP.setPelvis(
      mj.enabled.has('pelvis')
        ? { node: Dv?.node('pelvis'), positionWeight: mj.positionWeight }
        : {},
    );
    let CR = {};
    for (let [Cf, CJ] of Object.entries(mj.ranges)) Dv?.touched(Cf) && !wa(Cf) && (CR[Cf] = CJ);
    DP.setWindows(CR);
    let CQ = wT().filter(wR),
      Cj = CQ.some((CZ) => mj.solo[CZ]),
      Cz = {};
    for (let CZ of CQ) {
      let CU = mj.muted[CZ] || (Cj && !mj.solo[CZ]);
      Cz[CZ] = CU ? 0 : (mj.weights[CZ] ?? 1);
    }
    DP.setFactors(Cz);
  }
  let wa = (CR) => !!mj.keys[CR]?.length,
    wR = (CR) => !!Dv?.touched(CR) || wa(CR),
    wQ = !1;
  function wj(CR) {
    return ((wQ = !!CR), wQ);
  }
  let wz = null,
    wp = (CR, CQ) =>
      wQ &&
      !wa(CR) &&
      !!CQ &&
      Dv.delta(CR).some((Cj, Cz) => Math.abs(Cj - (CQ[Cz] ?? 0)) > 0.000001),
    wO = null;
  function wf() {
    if (wO) return wO();
    let CR = w0?.clip?.duration;
    return CR > 0
      ? { u: wX((w0.action?.time ?? 0) / CR), frames: Math.max(2, Math.round(CR * 30) + 1) }
      : null;
  }
  let wJ = () => (w0?.clip?.duration > 0 ? (w0.action?.time ?? 0) / w0.clip.duration : null),
    wZ = (CR) => String(CR).replace(/^pole\./, '');
  function wU(CR, CQ = null) {
    let Cj = wf();
    if (!Cj || !Dv || !mj.enabled.has(wZ(CR))) return !1;
    let Cz = mj.keys[CR];
    if (!Cz?.length) {
      let Cf = Dv.touched(CR) ? Dv.delta(CR) : [0, 0, 0, 0, 0, 0],
        CJ = mj.ranges[CR];
      if (
        ((Cz =
          CJ && !b(CJ)
            ? A(CJ, 1, Cj.frames).map((CZ) => ({ ...CZ, v: Cf.map((CU) => CU * CZ.v) }))
            : []),
        mj.ranges[CR])
      ) {
        let CZ = { ...mj.ranges };
        (delete CZ[CR], (mj.ranges = CZ));
      }
      (CQ == null && Cz.length && (Dv.setKeys(CR, Cz), Dv.updateOne(CR, Cj.u), (CQ = Dv.delta(CR))),
        CQ == null && (CQ = Cf));
    }
    CQ == null && (CQ = Dv.delta(CR));
    let Cp = [0, 1, 2, 3, 4, 5].map((CU) => Number(CQ[CU]) || 0),
      CO = B(Cz, Cj.u, Cp, Cj.frames);
    return ((mj.keys = { ...mj.keys, [CR]: CO }), Dv.setKeys(CR, CO), Dv.updateOne(CR, Cj.u), !0);
  }
  function wd(CR) {
    wO = typeof CR == 'function' ? CR : null;
  }
  function wK(CR) {
    if (!mj.keys[CR]) return;
    let CQ = { ...mj.keys };
    (delete CQ[CR], (mj.keys = CQ), Dv?.setKeys(CR, null));
  }
  let wT = () => (DP ? [...wq(), ...wA().map(e)] : []),
    wA = () => DP?.poled?.() ?? [],
    wX = (CR) => Math.min(1, Math.max(0, Number(CR) || 0));
  function wL(CR = {}) {
    if ((CR.positionWeight !== void 0 && (mj.positionWeight = wX(CR.positionWeight)), CR.enabled)) {
      mj.enabled = new Set(CR.enabled);
      for (let Cj of wq()) Dv?.setEnabled(Cj, mj.enabled.has(Cj));
      for (let Cz of wA()) Dv?.setEnabled(e(Cz), mj.enabled.has(Cz));
      Vy(Dv?.selected ?? null);
    }
    let CQ = !!(CR.keys && CR.parents);
    if ((CQ && ((mj.parents = {}), wb(CR)), CR.offsets))
      for (let [Cp, CO] of Object.entries(CR.offsets)) {
        let Cf = !CR.keys && wa(Cp);
        if (CO && Cf) {
          wU(Cp, CO);
          continue;
        }
        (CO && !CR.keys && wQ && wU(Cp, CO)) ||
          (!CO && Cf && wK(Cp), CO ? Dv?.setDelta(Cp, CO) : Dv?.reset(Cp));
      }
    if (CR.keys) {
      mj.keys = {};
      for (let [CJ, CZ] of Object.entries(CR.keys))
        Array.isArray(CZ) && CZ.length && (mj.keys[CJ] = CZ);
      for (let CU of DP ? wT() : []) Dv?.setKeys(CU, mj.keys[CU] ?? null);
    }
    if (CR.keyAt) {
      for (let Cd of [].concat(CR.keyAt)) wU(Cd);
    }
    return (
      CR.ranges && (mj.ranges = { ...CR.ranges }),
      CR.muted && (mj.muted = { ...CR.muted }),
      CR.solo && (mj.solo = { ...CR.solo }),
      CR.weights && (mj.weights = { ...CR.weights }),
      CR.parents && !CQ && wb(CR),
      CR.selected !== void 0 && Vy(CR.selected),
      wH(),
      DL()
    );
  }
  function wb(CR) {
    for (let [CQ, Cj] of Object.entries(CR.parents))
      (!CR.keys && wa(CQ)) ||
        (Cj && Cj !== 'root' ? (mj.parents[CQ] = String(Cj)) : delete mj.parents[CQ]);
    wD(!!CR.asDrawn);
  }
  let wx = new kE();
  function wy(CR, CQ) {
    let Cj = Dv?.anchor(CR);
    if (!Cj || !mj.enabled.has(wZ(CR))) return !1;
    Cj.updateWorldMatrix(!0, !1);
    let Cz = Cj.worldToLocal(wx.set(Number(CQ[0]) || 0, Number(CQ[1]) || 0, Number(CQ[2]) || 0));
    return (wL({ offsets: { [CR]: [Cz.x, Cz.y, Cz.z] } }), !0);
  }
  function wW(CR) {
    let CQ = Dv?.node(CR);
    return CQ ? CQ.getWorldPosition(new kE()).toArray() : null;
  }
  function wq() {
    let CR = DP.limbs();
    return DP.pelvis() ? [...CR, 'pelvis'] : CR;
  }
  let wP = (CR) => (CR === 'pelvis' ? (DP.pelvisHandle?.() ?? DP.pelvis()) : DP.tip(CR)),
    wY = (CR) => (CR === 'pelvis' ? (kb.hipsLabel ?? 'Pelvis') : DP.label(CR));
  function wv() {
    let CR = wq().map((CQ) => ({ key: CQ, label: wY(CQ), tip: wP(CQ) }));
    for (let CQ of wA())
      CR.push({ key: e(CQ), label: DP.label(CQ) + ' pole', tip: DP.mid(CQ), kind: 'pole' });
    ((Dv = Fs(k0, CR, () => mz)), Dv.setShown(rT), kY.add(Dv.group), Vu());
  }
  function wB(CR, CQ) {
    let Cj = Dq.get(CR);
    if (!Cj) return null;
    ((Cj.led = !!CQ),
      Cj.led && !Cj.on && Vz(CR, !0),
      Cj.led
        ? (Cj.lead.position.set(0, 0, 0),
          Cj.lead.quaternion.identity(),
          Cj.lead.add(Cj.marker),
          VE())
        : Cj.ctl.add(Cj.marker),
      DB &&
        (DB.object === Cj.ctl || DB.object === Cj.lead) &&
        (DB.setSize(DG), DB.setSpace(mj.gizmoSpace), DB.attach(wG(Cj))));
    let Cz = Cj.side === 'r' ? 'arm_r' : 'arm_l';
    return (
      Dv?.setDriver(Cz, Cj.led ? Cj.follow : null),
      Cj.led && mj.enabled.add(Cz),
      wH(),
      md(),
      Cj.led
    );
  }
  let wG = (CR) => (CR.led ? CR.lead : CR.ctl),
    wg = new kH(),
    wI = new kE(),
    wh = new kH(),
    wN = new kE(),
    wM = new kH(),
    V0 = new kE(),
    V1 = new km(),
    V2 = new Set(['prop', 'root', 'pelvis']);
  function V3(CR) {
    return CR.parent === 'prop'
      ? CR.bone
      : CR.parent === 'pelvis'
        ? (DP?.pelvis() ?? mz ?? kI)
        : (mz ?? kI);
  }
  function V4(CR, CQ) {
    let Cj = Dq.get(CR);
    if (!Cj) return null;
    let Cz = V2.has(CQ) ? CQ : 'prop';
    return (Cj.parent === Cz || ((Cj.parent = Cz), (Cj.reframe = !0), md()), Cj.parent);
  }
  let V5 = Os(k0),
    V6 = new kE(),
    V7 = new kE(),
    V8 = new kE(),
    V9 = new km(),
    Vk = new km(),
    Vw = new km(),
    VV = new kH(),
    VD = new kH(),
    Vm = { mat: VV, quat: Vw, onFrame: !0 };
  function VS() {
    if (!mj.enabled.has('pelvis')) return null;
    let CR = wX(mj.positionWeight);
    if (CR <= 0) return null;
    let CQ = DP?.pelvis(),
      Cj = Dv?.updateOne?.('pelvis', wJ());
    return !CQ || !Cj
      ? null
      : (CQ.updateMatrixWorld(!0),
        CQ.getWorldPosition(V6),
        CQ.getWorldQuaternion(V9),
        Cj.getWorldPosition(V7),
        Cj.getWorldQuaternion(Vk),
        CR < 1 && (V7.lerpVectors(V6, V7, CR), Vk.slerpQuaternions(V9, Vk, CR)),
        VV.compose(V7, Vk, V8.set(1, 1, 1)),
        VD.compose(V6, V9, V8.set(1, 1, 1)).invert(),
        VV.multiply(VD),
        Vw.copy(Vk).multiply(V9.invert()),
        Vm);
  }
  function VE() {
    let CR = VS();
    for (let CQ of Dq.values()) {
      if (!CQ.led) continue;
      let Cj = mz ?? kI;
      if (!Cj) continue;
      let Cz = V3(CQ);
      (CR && (CR.onFrame = Cz !== Cj),
        As(
          k0,
          CQ.leadNodes,
          {
            bone: CQ.bone,
            tip: DP?.tip(CQ.side === 'r' ? 'arm_r' : 'arm_l') ?? null,
            frame: Cz,
            home: Cj,
            reframe: CQ.reframe === !0,
            pelvis: CR,
          },
          V5,
        ),
        (CQ.reframe = !1));
    }
  }
  function VF(CR, CQ) {
    (CR.parent.updateMatrixWorld(!0),
      wg.copy(CR.parent.matrixWorld).invert().multiply(CQ),
      wg.decompose(CR.position, CR.quaternion, wI),
      CR.scale.set(1, 1, 1),
      CR.updateMatrixWorld(!0));
  }
  function VC() {
    if ((Dq.clear(), !!kI))
      for (let CR of ['r', 'l']) {
        let CQ = z[CR],
          Cj = null;
        if (
          (kI.traverse((Cd) => {
            !Cj && Cd.name === CQ && (Cj = Cd);
          }),
          !Cj?.parent)
        )
          continue;
        let Cz = new kR();
        ((Cz.name = 'prop-ctl:' + CQ), (Cz.userData.ikEffector = !0));
        let Cp = new kd(
          new k9(0.035),
          new kz({
            color: 14721082,
            wireframe: !0,
            transparent: !0,
            opacity: 0.9,
            depthTest: !1,
            depthWrite: !1,
          }),
        );
        ((Cp.renderOrder = 999),
          (Cp.userData.propBone = CQ),
          (Cp.visible = !1),
          Cz.add(Cp),
          Cz.position.copy(Cj.position),
          Cz.quaternion.copy(Cj.quaternion),
          Cj.parent.add(Cz),
          Cz.updateMatrixWorld(!0));
        let CO = Ts(k0, CQ),
          { base: Cf, lead: CJ, follow: CZ, propOut: CU } = CO;
        Dq.set(CQ, {
          bone: Cj,
          ctl: Cz,
          leadNodes: CO,
          base: Cf,
          lead: CJ,
          follow: CZ,
          propOut: CU,
          marker: Cp,
          on: !1,
          side: CR,
          name: CQ,
          parent: 'prop',
          led: !1,
          animated: {
            position: new kE().copy(Cj.position),
            quaternion: new km().copy(Cj.quaternion),
          },
        });
      }
  }
  function VH() {
    for (let CR of Dq.values())
      if (CR.on) {
        if (
          (CR.animated.position.copy(CR.bone.position),
          CR.animated.quaternion.copy(CR.bone.quaternion),
          CR.led)
        ) {
          (CR.propOut.updateMatrixWorld(!0),
            VF(CR.bone, CR.propOut.matrixWorld),
            CR.ctl.position.copy(CR.bone.position),
            CR.ctl.quaternion.copy(CR.bone.quaternion));
          continue;
        }
        (CR.bone.position.copy(CR.ctl.position),
          CR.bone.quaternion.copy(CR.ctl.quaternion),
          CR.bone.updateMatrixWorld(!0));
      }
  }
  function VR() {
    for (let CR of Dq.values())
      CR.on &&
        (CR.bone.position.copy(CR.animated.position),
        CR.bone.quaternion.copy(CR.animated.quaternion),
        CR.bone.updateMatrixWorld(!0));
  }
  function VQ(CR) {
    let CQ = Dq.get(CR);
    if (!CQ) return null;
    let Cj = CQ.on ? CQ.animated : CQ.bone;
    return (
      CQ.ctl.position.copy(Cj.position),
      CQ.ctl.quaternion.copy(Cj.quaternion),
      CQ.ctl.updateMatrixWorld(!0),
      CQ.led &&
        (CQ.lead.position.set(0, 0, 0),
        CQ.lead.quaternion.identity(),
        CQ.lead.updateMatrixWorld(!0)),
      md(),
      VO(CR)
    );
  }
  function Vj() {
    for (let CR of Dq.values()) (VQ(CR.name), Vz(CR.name, !1));
  }
  function Vz(CR, CQ) {
    let Cj = Dq.get(CR);
    if (!Cj) return null;
    let Cz = Cj.on ? Cj.animated : Cj.bone;
    return (
      Cj.ctl.position.copy(Cz.position),
      Cj.ctl.quaternion.copy(Cz.quaternion),
      Cj.ctl.updateMatrixWorld(!0),
      !CQ && Cj.led && wB(CR, !1),
      (Cj.on = !!CQ),
      (Cj.marker.visible = Cj.on),
      !Cj.on && DB?.object === wG(Cj) && (DB.detach(), (DB.enabled = !1)),
      md(),
      Cj.on
    );
  }
  let Vp = new ke();
  function VO(CR) {
    let CQ = Dq.get(CR);
    if (!CQ) return null;
    let Cj = wG(CQ);
    Vp.setFromQuaternion(Cj.quaternion, 'XYZ');
    let Cz = 180 / Math.PI;
    return {
      pos: [Cj.position.x * 100, Cj.position.y * 100, Cj.position.z * 100],
      rot: [Vp.x * Cz, Vp.y * Cz, Vp.z * Cz],
    };
  }
  function Vf(CR, CQ, Cj, Cz) {
    let Cp = Dq.get(CR);
    if (!Cp) return null;
    let CO = Number(Cz) || 0,
      Cf = wG(Cp);
    if (CQ === 'pos') Cf.position.setComponent(Cj, CO / 100);
    else {
      Vp.setFromQuaternion(Cf.quaternion, 'XYZ');
      let CJ = [Vp.x, Vp.y, Vp.z];
      ((CJ[Cj] = (CO * Math.PI) / 180),
        Cf.quaternion.setFromEuler(Vp.set(CJ[0], CJ[1], CJ[2], 'XYZ')));
    }
    return (Cf.updateMatrixWorld(!0), Cp.on || Vz(CR, !0), md(), VO(CR));
  }
  function VJ() {
    let CR = {};
    for (let CQ of Dq.values())
      CQ.on &&
        (CR[CQ.name] = { pos: CQ.ctl.position.toArray(), quat: CQ.ctl.quaternion.toArray() });
    return CR;
  }
  function VZ(CR) {
    return (
      DB &&
        ((mj.gizmoSpace = CR === 'local' ? 'local' : 'world'),
        (DB.object !== ru || !DN) && DB.setSpace(mj.gizmoSpace),
        md()),
      mj.gizmoSpace
    );
  }
  function VU(CR) {
    if (!DB) return null;
    let CQ = CR ? Dq.get(CR) : null;
    return !CQ || !CQ.on
      ? (DB.object !== ru && (DB.detach(), (DB.enabled = !1)), md(), null)
      : (Dv?.select(null),
        (rO = null),
        (rf = []),
        F7(),
        DB.setMode(mj.gizmoMode),
        DB.setSize(DG),
        DB.setSpace(mj.gizmoSpace),
        DB.attach(wG(CQ)),
        DB.setSpace(mj.gizmoSpace),
        (DB.enabled = !0),
        md(),
        CR);
  }
  function Vu() {
    if (DB) return;
    ((DB = new t(kv, kB.domElement)),
      DB.setSpace(mj.gizmoSpace),
      DB.setSize(DG),
      (DB.enabled = !1),
      (rA = DB.getHelper ? DB.getHelper() : DB),
      kY.add(rA),
      DB.addEventListener('dragging-changed', (CQ) => {
        if (((kG.enabled = !CQ.value), CQ.value && FW(), DB.object === ru)) {
          (CQ.value ? Fj() : Ff(), md());
          return;
        }
        if (
          (Dv?.setDragging(CQ.value ? Dv.selected : null),
          CQ.value && (wz = Dv?.selected ? [...Dv.delta(Dv.selected)] : null),
          !CQ.value)
        ) {
          VK();
          let Cj = Dv?.selected;
          (Cj && (wa(Cj) || wp(Cj, wz)) && (wU(Cj, Dv.delta(Cj)), wH()), (wz = null));
        }
        md();
      }),
      DB.addEventListener('objectChange', VK),
      kB.domElement.addEventListener('pointerdown', VT, !0));
    let CR = (CQ) => {
      CQ.key !== 'Control' ||
        E5 === (CQ.type === 'keydown') ||
        ((E5 = CQ.type === 'keydown'), DB.dragging && FW());
    };
    (window.addEventListener('keydown', CR, !0),
      window.addEventListener('keyup', CR, !0),
      window.addEventListener('blur', () => {
        E5 = !1;
      }),
      window.addEventListener(
        'pointermove',
        (CQ) => {
          ((E7.x = CQ.clientX), (E7.y = CQ.clientY));
        },
        !0,
      ),
      window.addEventListener('keydown', (CQ) => {
        if (
          E6 ||
          CQ.ctrlKey ||
          CQ.metaKey ||
          CQ.altKey ||
          CQ.repeat ||
          CQ.target?.closest?.('input, textarea, select, [contenteditable]') ||
          !FN()
        )
          return;
        let Cj = CQ.key.toLowerCase();
        Cj === 'r' && Sv && rO
          ? FM('rotate') && CQ.preventDefault()
          : Cj === 'g' && DB.object && DB.object !== ru && FM('move') && CQ.preventDefault();
      }),
      kB.domElement.addEventListener('keydown', Vd),
      (kB.domElement.tabIndex = 0));
  }
  function Vd(CR) {
    if (CR.key === 'w' || CR.key === 'W') VW('translate');
    else {
      if (CR.key === 'e' || CR.key === 'E') VW('rotate');
      else return;
    }
    CR.preventDefault();
  }
  function VK() {
    if (!Dv?.selected) {
      DB?.object && [...Dq.values()].some((CR) => wG(CR) === DB.object) && md();
      return;
    }
    (mj.gizmoMode === 'rotate' && Dv.capture(Dv.selected), wH());
  }
  function VT(CR) {
    if (EX?.enabled && EX.axis) return;
    if (ER) {
      let Cp = Ef(CR, 16);
      if (Cp) {
        (ER.onSelect ? ER.onSelect(Cp) : EJ(CR, Cp),
          CR.stopImmediatePropagation(),
          CR.preventDefault());
        return;
      }
    }
    if (EP) {
      let CO = F5(CR, 12);
      if (CO) {
        (EP.onPick(CO), CR.stopImmediatePropagation(), CR.preventDefault());
        return;
      }
    }
    if (F0) {
      let Cf = F4(CR, 12);
      if (Cf) {
        (F0.onPick(Cf), CR.stopImmediatePropagation(), CR.preventDefault());
        return;
      }
    }
    if (EU && CR.button === 0) {
      let CJ = EK(CR);
      if (CJ) {
        (EU.onPick(CJ), CR.stopImmediatePropagation(), CR.preventDefault());
        return;
      }
    }
    if (Sv && ED && !Em) {
      (FH(CR), CR.stopImmediatePropagation(), CR.preventDefault());
      return;
    }
    if (!DB || DB.dragging) return;
    if (Sv && Fk(CR, DB.axis ? 8 : 14)) {
      CR.stopImmediatePropagation();
      return;
    }
    if (!Dv || DB.axis) {
      DB.axis || Vb(CR);
      return;
    }
    let CQ = kB.domElement.getBoundingClientRect();
    (Dx.set(
      ((CR.clientX - CQ.left) / CQ.width) * 2 - 1,
      -((CR.clientY - CQ.top) / CQ.height) * 2 + 1,
    ),
      Db.setFromCamera(Dx, kv));
    let Cj = Db.intersectObjects(
      [...Dq.values()].filter((CZ) => CZ.on).map((CZ) => CZ.marker),
      !1,
    )[0];
    if (Cj) {
      VU(Cj.object.userData.propBone);
      return;
    }
    let Cz = Dv.pick(Db);
    Cz ? (Vy(Cz), md()) : Vb(CR);
  }
  let VA = !1,
    VX = null,
    VL = () => VA && Sv && rf.length > 0;
  function Vb(CR) {
    CR.button !== 0 ||
      CR.shiftKey ||
      CR.ctrlKey ||
      CR.metaKey ||
      CR.altKey ||
      (!VL() && !(r4.length && SI.teleport)) ||
      ((VX = { x: CR.clientX, y: CR.clientY, id: CR.pointerId }),
      window.addEventListener('pointerup', Vx, !0));
  }
  function Vx(CR) {
    window.removeEventListener('pointerup', Vx, !0);
    let CQ = VX;
    if (
      ((VX = null),
      !CQ ||
        CR.pointerId !== CQ.id ||
        Math.hypot(CR.clientX - CQ.x, CR.clientY - CQ.y) > 4 ||
        E6 ||
        ED ||
        Em)
    )
      return;
    let Cj = SI.teleport ? rR(CR) : null;
    if (Cj != null) {
      (S9((Cj / (rE() - 1)) * w0.clip.duration), CD());
      return;
    }
    VL() && Fw(null);
  }
  function Vy(CR) {
    if (!Dv || !DB) return null;
    let CQ = Dv.select(CR),
      Cj = CQ ? CQ.replace(/^pole\./, '') : null,
      Cz = Cj && mj.enabled.has(Cj) ? Dv.node(CQ) : null;
    return (
      Cz
        ? ((rO = null),
          (rf = []),
          F7(),
          DB.setMode(mj.gizmoMode),
          DB.setSize(DG),
          DB.setSpace(mj.gizmoSpace),
          DB.attach(Cz),
          (DB.enabled = !0))
        : DB.object !== ru && (DB.detach(), (DB.enabled = !1)),
      CQ
    );
  }
  function VW(CR) {
    return (
      DB &&
        ((mj.gizmoMode = CR === 'rotate' ? 'rotate' : 'translate'), DB.setMode(mj.gizmoMode), md()),
      mj.gizmoMode
    );
  }
  function Vq() {
    let CR = kK.clientWidth,
      CQ = kK.clientHeight,
      Cj = Math.round(CR * mS),
      Cz = Math.round(Cj / mE);
    return { x: CR - Cj - mF, y: CQ - Cz - mF, w: Cj, h: Cz, viewH: CQ };
  }
  function VP() {
    let CR = m7 && !!m4;
    if (!m8) {
      if (!CR) return;
      ((m8 = document.createElement('div')), (m8.className = 'lib-camview'));
      let Cj = document.createElement('span');
      ((Cj.className = 'lib-camview__tag'),
        (Cj.textContent = 'Rig camera'),
        m8.appendChild(Cj),
        kK.appendChild(m8));
    }
    if (((m8.hidden = !CR), !CR)) return;
    let CQ = Vq();
    ((m8.style.left = CQ.x + 'px'),
      (m8.style.top = CQ.viewH - CQ.y - CQ.h + 'px'),
      (m8.style.width = CQ.w + 'px'),
      (m8.style.height = CQ.h + 'px'));
  }
  function VY() {
    if (!m7 || !m4) return;
    let CR = Vq();
    if (CR.w < 40 || CR.h < 30) return;
    let CQ = m5?.visible;
    (m5 && (m5.visible = !1),
      (m4.aspect = CR.w / CR.h),
      m4.updateProjectionMatrix(),
      kB.setScissorTest(!0),
      kB.setViewport(CR.x, CR.y, CR.w, CR.h),
      kB.setScissor(CR.x, CR.y, CR.w, CR.h),
      kB.render(kY, m4),
      kB.setScissorTest(!1),
      kB.setViewport(0, 0, kK.clientWidth, kK.clientHeight),
      m5 && (m5.visible = CQ));
  }
  let Vv = null,
    VB = [];
  function VG(CR) {
    ((Vv = CR && typeof CR.camera == 'function' && typeof CR.rect == 'function' ? CR : null), CD());
  }
  function Vg() {
    if (!Vv) return;
    let CR = Vv.camera(),
      CQ = CR && Vv.rect();
    if (!CQ || CQ.w < 40 || CQ.h < 30) return;
    let Cj = kK.clientHeight - CQ.y - CQ.h;
    for (let Cp of kY.children)
      Cp.visible &&
        !(Cp.isLight || Cp === kI || Cp === SL?.companion || Cp === Dz) &&
        ((Cp.visible = !1), VB.push(Cp));
    let Cz = Dv?.shown;
    (Cz && Dv.setShown(!1),
      kB.setScissorTest(!0),
      kB.setViewport(CQ.x, Cj, CQ.w, CQ.h),
      kB.setScissor(CQ.x, Cj, CQ.w, CQ.h),
      kB.render(kY, CR),
      kB.setScissorTest(!1),
      kB.setViewport(0, 0, kK.clientWidth, kK.clientHeight),
      Cz && Dv.setShown(!0));
    for (let CO of VB) CO.visible = !0;
    VB.length = 0;
  }
  let VI = (CR, CQ, Cj) => Math.min(Cj, Math.max(CQ, Number(CR))),
    Vh = [],
    VN = new i(),
    VM = null,
    D0 = { position: [0, 0, 0], quaternion: [0, 0, 0, 1], size: 1 },
    D1 = new kH(),
    D2 = new kE(),
    D3 = new km(),
    D4 = new kE(),
    D5 = !1;
  function D6() {
    D5 &&
      (Dv?.setScale(D0.size),
      !(!kI || !VM) &&
        (D1.compose(D2.fromArray(D0.position), D3.fromArray(D0.quaternion), D4.setScalar(D0.size))
          .multiply(VM)
          .decompose(kI.position, kI.quaternion, kI.scale),
        kI.updateMatrixWorld(!0)));
  }
  function D7(CR = {}) {
    let CQ = (Cj, Cz) => Array.isArray(Cj) && Cj.length === Cz && Cj.every(Number.isFinite);
    return (
      CQ(CR.position, 3) && (D0.position = [...CR.position]),
      CQ(CR.quaternion, 4) &&
        CR.quaternion.some((Cj) => Cj !== 0) &&
        (D0.quaternion = D3.fromArray(CR.quaternion).normalize().toArray()),
      Number.isFinite(CR.size) && CR.size > 0 && (D0.size = VI(CR.size, 0.05, 20)),
      (D5 = !0),
      D6(),
      D8()
    );
  }
  let D8 = () => ({ position: [...D0.position], quaternion: [...D0.quaternion], size: D0.size });
  function D9(CR) {
    if (!kI) return;
    kI.updateMatrixWorld(!0);
    let CQ = wJ();
    (Dv?.update(CQ), DP?.run(CQ), Dy?.(), kI.updateMatrixWorld(!0));
    try {
      return CR();
    } finally {
      DP?.restore();
    }
  }
  let Dk = new k4(),
    Dw = new kE(),
    DV = new k3(),
    DD = new kQ(),
    Dm = new kz({ colorWrite: !1, side: kO }),
    DS = -1000000000;
  function DE(CR = {}) {
    return (CD(1, !0), new Promise((CQ, Cj) => Vh.push({ opts: CR, resolve: CQ, reject: Cj })));
  }
  function DF() {
    if (!Vh.length || !kB) return;
    let CR = Vh.splice(0);
    kB.getSize(DV);
    let CQ = kB.getPixelRatio(),
      Cj = Dv?.shown;
    Cj && Dv.setShown(!1);
    for (let { opts: Cz, resolve: Cp, reject: CO } of CR) {
      let Cf = [],
        CJ = null,
        CZ = null,
        CU = null,
        Cd = [];
      try {
        if (Cz.clear && !kX)
          throw new Error(
            'a picture with nothing behind it needs a player made with clearPictures',
          );
        let CK = Math.round(VI(Cz.width ?? 640, 16, 8192)),
          CT = Math.round(VI(Cz.height ?? 360, 16, 8192)),
          CA = (Cy) =>
            Cy.isLight ||
            (Cz.only ? !!Cz.only(Cy) : Cy === kI || Cy === SL?.companion || !!Cz.show?.(Cy)),
          CX = (Cy) => !!Cz.casting?.(Cy),
          CL = (Cy) => !!Cz.hiding?.(Cy);
        for (let Cy of kY.children)
          !CA(Cy) && !CX(Cy) && !CL(Cy) && Cy.visible && ((Cy.visible = !1), Cf.push(Cy));
        let Cb = Cz.ortho ? Dk : VN;
        if (Cz.ortho) {
          let CW = VI(Cz.ortho, 0.001, 100000),
            Cq = (CW * CK) / CT;
          ((Cb.top = CW / 2), (Cb.bottom = -CW / 2), (Cb.right = Cq / 2), (Cb.left = -Cq / 2));
        } else ((Cb.fov = VI(Cz.fov ?? 40, 1, 170)), (Cb.aspect = CK / CT));
        if (
          ((Cb.near = VI(Cz.near ?? 0.05, 0.001, 1000)),
          (Cb.far = VI(Cz.far ?? 500, 1, 100000)),
          Cb.position.fromArray(Cz.position ?? [0, 1.2, 4]),
          Cz.quaternion
            ? Cb.quaternion.fromArray(Cz.quaternion).normalize()
            : (Cb.up.fromArray(Cz.up ?? [0, 1, 0]),
              Cb.lookAt(Dw.fromArray(Cz.target ?? [0, 1, 0]))),
          Cz.shift && (Cz.shift.x || Cz.shift.y)
            ? Cb.setViewOffset(CK, CT, Cz.shift.x || 0, Cz.shift.y || 0, CK, CT)
            : Cb.clearViewOffset(),
          Cb.updateProjectionMatrix(),
          Cb.updateMatrixWorld(!0),
          Cz.clear)
        ) {
          let CP = kY.fog;
          ((CJ = {
            sky: kY.background,
            fog: CP,
            near: CP?.near,
            far: CP?.far,
            density: CP?.density,
            ink: kB.getClearColor(DD).getHex(),
            alpha: kB.getClearAlpha(),
          }),
            (kY.background = null),
            CP?.isFogExp2
              ? (CP.density = 0)
              : CP && ((CP.near = 1000000000), (CP.far = 2000000000)),
            kB.setClearColor(0, 0));
        }
        if (
          (kB.setPixelRatio(1), kB.setSize(CK, CT, !1), (CZ = Cz.dress?.() ?? null), Cz.casting)
        ) {
          (kB.setScissor(0, 0, 1, 1),
            kB.setScissorTest(!0),
            kB.render(kY, Cb),
            kB.setScissorTest(!1),
            (CU = { auto: kB.shadowMap.autoUpdate }),
            (kB.shadowMap.autoUpdate = !1));
          for (let CY of kY.children)
            !CA(CY) && !CL(CY) && CY.visible && ((CY.visible = !1), Cf.push(CY));
        }
        if (Cz.hiding) {
          for (let Cv of kY.children)
            CA(Cv) ||
              !CL(Cv) ||
              !Cv.visible ||
              Cv.traverse((CB) => {
                CB.isMesh &&
                  CB.material !== Dm &&
                  (Cd.push([CB, CB.material, CB.renderOrder]),
                  (CB.material = Dm),
                  (CB.renderOrder = DS));
              });
        }
        kB.render(kY, Cb);
        let Cx = document.createElement('canvas');
        ((Cx.width = CK),
          (Cx.height = CT),
          Cx.getContext('2d').drawImage(kB.domElement, 0, 0, CK, CT),
          Cp(Cx));
      } catch (CB) {
        CO(CB);
      } finally {
        for (let [CG, Cg, CI] of Cd) ((CG.material = Cg), (CG.renderOrder = CI));
        for (let Ch of Cf) Ch.visible = !0;
        CU &&
          (kB.setScissorTest(!1),
          (kB.shadowMap.autoUpdate = CU.auto),
          (kB.shadowMap.needsUpdate = !0));
        try {
          CZ?.();
        } catch (CN) {
          console.error(CN);
        }
        CJ &&
          ((kY.background = CJ.sky),
          CJ.fog?.isFogExp2
            ? (CJ.fog.density = CJ.density)
            : CJ.fog && ((CJ.fog.near = CJ.near), (CJ.fog.far = CJ.far)),
          kB.setClearColor(CJ.ink, CJ.alpha));
      }
    }
    (Cj && Dv.setShown(!0),
      kB.setPixelRatio(CQ),
      kB.setSize(DV.x, DV.y, !1),
      kB.render(kY, kv),
      VY(),
      Vg());
  }
  let DC = {
    v: new kE(),
    a: new km(),
    b: new km(),
    now: new km(),
    delta: new km(),
    ident: new km(),
  };
  function DH() {
    if (((mD = new Map()), (mV = null), !kI)) return;
    let CR = mz ?? kI;
    if (!CR) return;
    kI.updateMatrixWorld(!0);
    let CQ = CR.getWorldQuaternion(new km()).invert();
    for (let Cj of mk) {
      let Cz = null;
      (kI.traverse((Cp) => {
        !Cz && Cp.name === Cj && (Cz = Cp);
      }),
        Cz &&
          mD.set(Cj, {
            pos: CR.worldToLocal(Cz.getWorldPosition(new kE())),
            quat: CQ.clone().multiply(Cz.getWorldQuaternion(new km())),
            bone: Cz,
          }));
    }
    De(mw.source);
  }
  function De(CR) {
    let CQ = mD.get(CR);
    return ((mV = CQ?.bone ?? null), !!CQ);
  }
  function DR() {
    return mk.filter((CR) => mD.has(CR));
  }
  let DQ = !1,
    Dj = null,
    Dz = null,
    Dp = 0.5,
    DO = new kE();
  function Df() {
    let CR = mz ?? kI;
    if (!DQ || !CR || !kG) {
      Dj = null;
      return;
    }
    if ((CR.getWorldPosition(DO), Dj)) {
      let CQ = DO.x - Dj.x,
        Cj = DO.z - Dj.z;
      ((kv.position.x += CQ), (kv.position.z += Cj), (kG.target.x += CQ), (kG.target.z += Cj));
    } else Dj = new kE();
    (Dj.copy(DO),
      Dz &&
        ((Dz.position.x = Math.round(DO.x / Dp) * Dp),
        (Dz.position.z = Math.round(DO.z / Dp) * Dp)));
  }
  function DJ(CR) {
    return ((DQ = !!CR), (Dj = null), DQ || Dz?.position.set(0, 0, 0), DQ);
  }
  function DZ() {
    let CR = mD.get(mw.source);
    if (!m4 || !mV || !CR) return;
    let CQ = CR.pos,
      Cj = CR.quat,
      Cz = mw.weight > 0,
      Cp = mw.rotation > 0;
    if (!Cz && !Cp) return;
    let CO = m4.parent;
    if (!CO?.isBone) return;
    let Cf = mz ?? kI,
      { v: CJ, a: CZ, b: CU, now: Cd, delta: CK, ident: CT } = DC,
      CA = CO.parent === Cf;
    (mm.position || (mm.position = new kE()),
      mm.quaternion || (mm.quaternion = new km()),
      mm.position.copy(CO.position),
      mm.quaternion.copy(CO.quaternion),
      (mm.active = !0),
      Cz &&
        (mV.getWorldPosition(CJ),
        Cf.worldToLocal(CJ),
        CJ.sub(CQ),
        mw.verticalOnly && ((CJ.x = 0), (CJ.z = 0)),
        CJ.multiplyScalar(mw.weight),
        CA ||
          (Cf.getWorldQuaternion(CZ),
          CO.parent.getWorldQuaternion(CU).invert(),
          CJ.applyQuaternion(CZ).applyQuaternion(CU)),
        CO.position.add(CJ)),
      Cp &&
        (Cf.getWorldQuaternion(CZ).invert(),
        Cd.copy(CZ).multiply(mV.getWorldQuaternion(CU)),
        CK.copy(Cd).multiply(Cj.clone().invert()),
        CT.identity(),
        CK.copy(CT.slerp(CK, mw.rotation)),
        CA ||
          (Cf.getWorldQuaternion(CZ),
          CO.parent.getWorldQuaternion(CU).invert(),
          CK.copy(CU)
            .multiply(CZ)
            .multiply(CK)
            .multiply(CZ.clone().invert())
            .multiply(CU.clone().invert())),
        CO.quaternion.copy(CK).multiply(mm.quaternion)),
      CO.updateMatrixWorld(!0));
  }
  function DU() {
    if (!mm.active) return;
    let CR = m4?.parent;
    (CR?.isBone &&
      (CR.position.copy(mm.position), CR.quaternion.copy(mm.quaternion), CR.updateMatrixWorld(!0)),
      (mm.active = !1));
  }
  function Du(CR = {}) {
    return (
      CR.weight !== void 0 && (mw.weight = VI(CR.weight, 0, 1)),
      CR.rotation !== void 0 && (mw.rotation = VI(CR.rotation, 0, 1)),
      CR.verticalOnly !== void 0 && (mw.verticalOnly = !!CR.verticalOnly),
      CR.source !== void 0 &&
        CR.source !== mw.source &&
        De(String(CR.source)) &&
        (mw.source = String(CR.source)),
      md(),
      DK()
    );
  }
  function Dd(CR = {}) {
    return (
      CR.reset &&
        m4 &&
        ((m4.fov = m9.fov), (m4.near = m9.near), m4.updateProjectionMatrix(), m5?.update()),
      m4 &&
        CR.fov !== void 0 &&
        ((m4.fov = VI(CR.fov, 10, 140)), m4.updateProjectionMatrix(), m5?.update()),
      m4 &&
        CR.near !== void 0 &&
        ((m4.near = VI(CR.near, 0.001, 1)), m4.updateProjectionMatrix(), m5?.update()),
      CR.size !== void 0 && ((mS = VI(CR.size, mC, mH)), VP()),
      md(),
      DK()
    );
  }
  function DK() {
    return {
      has: !!m4,
      helper: m6,
      view: m7,
      fov: m4 ? +m4.fov.toFixed(1) : null,
      near: m4 ? m4.near : null,
      size: mS,
      sizeRange: [mC, mH],
      follow: { ...mw },
      followSources: DR(),
      defaults: { ...m9 },
      bone: m4?.parent?.name ?? null,
    };
  }
  function DT(CR) {
    return ((m6 = !!CR && !!m4), m5 && (m5.visible = m6), md(), m6);
  }
  function DA(CR) {
    return ((m7 = !!CR && !!m4), VP(), md(), m7);
  }
  function DX(CR) {
    return ((mj.debug = !!CR), DP?.setDebug(mj.debug), DY?.setVisible(mj.debug), md(), mj.debug);
  }
  function DL() {
    let CR = DP ? wq() : [],
      CQ = wA().map(e),
      Cj = {};
    for (let Cz of [...CR, ...CQ]) wR(Cz) && (Cj[Cz] = Dv.delta(Cz));
    return {
      debug: mj.debug,
      gizmoMode: mj.gizmoMode,
      selected: Dv?.selected ?? null,
      dragging: Dv?.dragging ?? null,
      positionWeight: mj.positionWeight,
      enabled: [...mj.enabled],
      offsets: Cj,
      parents: { ...mj.parents },
      ranges: { ...mj.ranges },
      muted: { ...mj.muted },
      solo: { ...mj.solo },
      weights: { ...mj.weights },
      keys: { ...mj.keys },
      gizmoSpace: mj.gizmoSpace,
      limbs: CR,
      poled: wA(),
      ends: Object.fromEntries(
        CR.filter((Cp) => Cp !== 'pelvis').map((Cp) => [Cp, kb.limbs?.[Cp]?.end ?? null]),
      ),
      labels: Object.fromEntries(CR.map((Cp) => [Cp, wY(Cp)])),
      active: DP?.active?.() ?? [],
      props: [...Dq.values()].map((Cp) => ({
        name: Cp.name,
        side: Cp.side,
        on: Cp.on,
        led: !!Cp.led,
        parent: Cp.parent ?? 'root',
        selected: DB?.object === wG(Cp),
        ...VO(Cp.name),
      })),
    };
  }
  let Db = new kJ(),
    Dx = new k3(),
    Dy = null,
    DW = null,
    Dq = new Map(),
    DP = null,
    DY = null,
    Dv = null,
    DB = null,
    DG = 0.6,
    Dg = 0.2,
    DI = 0.38,
    Dh = ['global', 'local', 'view', 'parent'],
    DN = null,
    DM = () => DN ?? (mj.gizmoSpace === 'local' ? 'local' : 'global'),
    m0 = (CR) => {
      let CQ = DN ?? 'global';
      return CR.local ? (CQ === 'global' ? 'local' : 'global') : CQ;
    },
    m1 = {
      global: 'global ',
      local: 'its own ',
      view: 'the view\u2019s ',
      parent: 'its parent\u2019s ',
    },
    m2 = null,
    m3 = null,
    m4 = null,
    m5 = null,
    m6 = !1,
    m7 = !1,
    m8 = null,
    m9 = { fov: 50, near: 0.01 },
    mk = ['Head', 'neck_01', 'spine_03', 'pelvis'],
    mw = { weight: 0, rotation: 0, verticalOnly: !0, source: 'Head' },
    mV = null,
    mD = new Map(),
    mm = { active: !1, position: null, quaternion: null },
    mS = 0.3,
    mE = 16 / 9,
    mF = 12,
    mC = 0.15,
    mH = 0.6,
    ma = { id: null, entry: null },
    mR = 0,
    mQ = new Set(),
    mj = {
      positionWeight: 1,
      enabled: new Set(),
      debug: !1,
      gizmoMode: 'translate',
      parents: {},
      ranges: {},
      muted: {},
      solo: {},
      weights: {},
      keys: {},
      gizmoSpace: 'world',
    },
    mz = null,
    mp = new Map(),
    mO = { ...U },
    mf = 'root',
    mJ = !0,
    mZ = !1,
    mU = (CR) =>
      new Promise((CQ, Cj) => {
        let Cz = setTimeout(() => Cj(new Error('Timed out loading ' + CR)), bu);
        kL.load(
          CR,
          (Cp) => {
            (clearTimeout(Cz), c(Cp), CQ(Cp));
          },
          void 0,
          (Cp) => {
            (clearTimeout(Cz), Cj(new Error(Cp?.message || 'Failed to load ' + CR)));
          },
        );
      }),
    md = () => {
      CD();
      let CR = C7();
      for (let CQ of kP) CQ(CR);
    };
  function mK() {
    ((kY = new kD()),
      (kY.background = new kQ(2369583)),
      (kY.fog = new kw(2369583, 6, 22)),
      (kv = new i(42, 1, 0.01, 200)),
      (kB = new kk({ antialias: !0, alpha: !!kX })),
      kB.setPixelRatio(Math.min(window.devicePixelRatio, 2)),
      (kB.outputColorSpace = k7),
      (kB.toneMapping = kS),
      (kB.toneMappingExposure = 1.1),
      kK.appendChild(kB.domElement),
      (kG = new C(kv, kB.domElement)),
      (kG.enableDamping = !0),
      (kG.dampingFactor = 0.08),
      (kG.minDistance = 0.6),
      (kG.maxDistance = 12),
      kY.add(new k1(12375295, 2764599, 2)));
    let CR = new k6(16777215, 2.2);
    (CR.position.set(3, 5, 4), kY.add(CR));
    let CQ = new k6(640460, 1.1);
    (CQ.position.set(-4, 2, -3), kY.add(CQ));
    let Cj = new ku(10, 20, 4033423, 3356993);
    ((Cj.material.transparent = !0),
      (Cj.material.opacity = 0.45),
      kY.add(Cj),
      (Dz = Cj),
      new ResizeObserver(mT).observe(kK),
      mT());
  }
  function mT() {
    if (mZ || !kB) return;
    let CR = kK.clientWidth,
      CQ = kK.clientHeight;
    if (CR === 0 || CQ === 0) {
      requestAnimationFrame(mT);
      return;
    }
    (kB.domElement.width === CR && kB.domElement.height === CQ) ||
      (kB.setSize(CR, CQ, !1),
      (kB.domElement.style.width = '100%'),
      (kB.domElement.style.height = '100%'),
      mb(CR, CQ),
      VP(),
      CD());
  }
  let mA = null,
    mX = null,
    mL = null;
  function mb(CR, CQ) {
    if (kv.isOrthographicCamera) {
      let Cj = (mA * CR) / CQ;
      ((kv.top = mA / 2), (kv.bottom = -mA / 2), (kv.right = Cj / 2), (kv.left = -Cj / 2));
    } else kv.aspect = CR / CQ;
    kv.updateProjectionMatrix();
  }
  function mx(CR) {
    if (!kv || !kB) return;
    let CQ = Number(CR) > 0 ? Number(CR) : null;
    mX ??= kv;
    let Cj = CQ ? (mL ??= new k4(-1, 1, 1, -1, kv.near, kv.far)) : mX;
    (Cj !== kv &&
      (Cj.position.copy(kv.position),
      Cj.quaternion.copy(kv.quaternion),
      Cj.up.copy(kv.up),
      (Cj.near = kv.near),
      (Cj.far = kv.far),
      (kv = Cj),
      (kG.object = kv),
      DB && (DB.camera = kv),
      EX && (EX.camera = kv)),
      (mA = CQ));
    let Cz = kB.getSize(new k3());
    (mb(Cz.x, Cz.y), kG.update(), CD());
  }
  function my() {
    let CR = SL ? new kC().setFromObject(SL.companion) : new kC().setFromObject(kI);
    if (CR.isEmpty()) {
      let CJ = new kE();
      (SL?.companion ?? kI).traverse((CZ) => {
        CZ.isBone && CR.expandByPoint(CZ.getWorldPosition(CJ));
      });
    }
    let CQ = CR.getSize(new kE()),
      Cj = CR.getCenter(new kE()),
      Cz = Math.max(CQ.y, kx ? Math.max(CQ.x, CQ.z) * 0.7 : 0, 0.001),
      [Cp, CO, Cf] = kx ? [1.1, 0.35, 1.9] : [0.9, 0.25, 1.7];
    (kG.target.set(Cj.x, Cj.y, Cj.z),
      kv.position.set(Cj.x + Cz * Cp, Cj.y + Cz * CO, Cj.z + Cz * Cf),
      kG.update());
  }
  function mW(CR) {
    ((kI = CR.scene),
      (kh = []),
      (SK = new Map()),
      kI.traverse((CQ) => {
        CQ.isBone && CQ.name && SK.set(CQ.name, CQ.quaternion.toArray());
      }),
      F6(),
      kI.traverse((CQ) => {
        (CQ.isMesh || CQ.isSkinnedMesh) && ((CQ.frustumCulled = !1), kh.push(CQ));
      }));
    for (let CQ of kh) {
      let Cj = Array.isArray(CQ.material) ? CQ.material : [CQ.material];
      for (let Cz of Cj) Cz && (Cz.wireframe = kM);
    }
    ((w9 = X(kI)),
      (SA = CR.reference ?? null),
      (SL = CR.custom ?? null),
      SL &&
        (kY.add(SL.companion),
        SL.overlay && kY.add(SL.overlay),
        SL.companion.traverse((Cp) => {
          if (Cp.isMesh) {
            ((Cp.frustumCulled = !1), kh.push(Cp));
            for (let CO of [].concat(Cp.material || [])) CO.wireframe = kM;
          }
        })),
      (SX = SA ? R({ ours: SA, theirs: kI, THREE: k0 }) : null),
      kI.updateMatrixWorld(!0),
      (Sb = new Map()),
      kI.traverse((Cp) => {
        Cp.isBone &&
          Sb.set(Cp, {
            p: Cp.position.clone(),
            q: Cp.quaternion.clone(),
            q0: Cp.getWorldQuaternion(new km()),
          });
      }),
      (Sx = null),
      (Sy = null),
      (SW = null),
      (wk = O(kI)),
      (Dy = Z(
        kI,
        k0,
        () => !1,
        () => DW,
      )),
      VC(),
      (DP = a(kI, k0, kb)),
      wE.clear(),
      (DY = Bs(k0, DP.limbs().length)),
      DY.setVisible(mj.debug),
      DP.setDebug(mj.debug),
      kY.add(DY.object3d),
      (mz = null),
      wv(),
      kY.add(kI),
      (VM = new kH().compose(kI.position, kI.quaternion, kI.scale)),
      D6(),
      (kg = new kj(kI)),
      kg.addEventListener('finished', (Cp) => {
        !w0 || Cp.action !== w0.action || ((w2 = !0), md());
      }),
      kI.traverse((Cp) => {
        !mz && Cp.name === mf && (mz = Cp);
      }),
      kN && (kY.remove(kN), kN.dispose?.(), (kN = new kZ(kI)), kY.add(kN)),
      (m4 = CR.cameras?.[0] ?? null),
      m4
        ? ((m4.near = 0.01),
          m4.updateProjectionMatrix(),
          (m9 = { fov: m4.fov, near: m4.near }),
          (m5 = new I(m4)),
          (m5.visible = m6),
          kY.add(m5),
          DH())
        : ((m6 = !1), (m7 = !1)),
      VP());
  }
  function mq() {
    ((w0 = null),
      rC(!1),
      SB?.setRig(null),
      (SG = null),
      (Sg = null),
      (r4 = []),
      SL && (SL.companion.removeFromParent(), SL.overlay?.removeFromParent(), (SL = null)),
      Eh(null),
      Ep(null),
      Ed(null),
      Ex(null),
      mQ.clear(),
      kg?.stopAllAction(),
      kg && kI && kg.uncacheRoot(kI),
      (kg = null));
    for (let CR of ['l', 'r']) ww[CR]?.holder && wk[CR] && J(wk[CR], ww[CR].holder);
    (DB?.detach(),
      Dv && (kY.remove(Dv.group), Dv.dispose(), (Dv = null)),
      DY && (kY.remove(DY.object3d), DY.dispose(), (DY = null)),
      (DP = null),
      (Dy = null),
      (wk = { l: null, r: null }),
      (w9 = null),
      (mz = null),
      m5 && (kY.remove(m5), m5.dispose?.(), (m5 = null)),
      (m4 = null),
      (mV = null),
      (mD = new Map()),
      (mm.active = !1),
      kI &&
        (kY.remove(kI),
        kI.traverse((CQ) => {
          if (!CQ.isMesh && !CQ.isSkinnedMesh) return;
          CQ.geometry?.dispose?.();
          let Cj = Array.isArray(CQ.material) ? CQ.material : [CQ.material];
          for (let Cz of Cj) Cz?.dispose?.();
        }),
        (kI = null)),
      (kh = []));
  }
  async function mP(CR) {
    return (
      kB || mK(),
      (m2 = CR),
      (mf = CR.rig?.joints?.[0] || 'root'),
      (m3 = mY(CR)),
      mW(await mU(kT + '/' + mv(CR, m3))),
      my(),
      kB.setAnimationLoop(CC),
      { bones: CR.rig.bones }
    );
  }
  function mY(CR) {
    let CQ = CR.rigs ?? {};
    return Object.keys(CQ).find((Cj) => CQ[Cj].default) ?? Object.keys(CQ)[0] ?? null;
  }
  function mv(CR, CQ) {
    return CR.rigs?.[CQ]?.file ?? CR.rig.file;
  }
  let mB = null;
  function mG() {
    let CR = mB;
    if (!CR || !kI || !Dy?.setReference) return 0;
    let CQ = [];
    kI.traverse((CO) => {
      CO.isBone && CQ.push([CO, CO.position.clone(), CO.quaternion.clone(), CO.scale.clone()]);
    });
    let Cj = new kj(kI),
      Cz = Cj.clipAction(CR);
    (Cz.play(), Cj.setTime(0), kI.updateMatrixWorld(!0));
    let Cp = Dy.setReference();
    (Cz.stop(), Cj.uncacheClip(CR), Cj.uncacheRoot(kI));
    for (let [CO, Cf, CJ, CZ] of CQ)
      (CO.position.copy(Cf), CO.quaternion.copy(CJ), CO.scale.copy(CZ));
    return (kI.updateMatrixWorld(!0), Cp);
  }
  let mg = null;
  async function mI(CR) {
    if (!m2 || (CR === m3 && !mg)) return m3;
    let CQ = m2.rigs?.[CR];
    if (!CQ) throw new Error('Unknown rig "' + CR + '"');
    if (!CQ.file) throw new Error('Rig "' + CR + '" has no GLB yet');
    return mM(CR, () => mU(kT + '/' + CQ.file), null);
  }
  async function mh(CR, CQ = null, { force: Cj = !1 } = {}) {
    if (!m2) return null;
    let Cz = m2.rigs?.human ? 'human' : mY(m2);
    if (!Cj && (CR ?? null) === mg && Cz === m3) return mg;
    let Cp = (CR ?? null) === mg && Cz === m3,
      CO = m2.rigs?.[Cz];
    if (!CO?.file) throw new Error('The full-body rig has no GLB');
    return (
      await mM(
        Cz,
        async () => {
          let Cf = await mU(kT + '/' + CO.file),
            CJ = null;
          if (CR && CQ) {
            CJ = Cf.scene.clone(!0);
            let CZ = [];
            CJ.traverse((Cd) => {
              Cd.isMesh && CZ.push(Cd);
            });
            for (let Cd of CZ) Cd.removeFromParent();
            CJ.updateMatrixWorld(!0);
            let CU = CQ(Cf.scene) ?? Cf.scene;
            CU.companion ? ((Cf.scene = CU.scene), (Cf.custom = CU)) : (Cf.scene = CU);
          }
          return { ...Cf, cameras: CR ? [] : Cf.cameras, reference: CJ, custom: Cf.custom ?? null };
        },
        CR ?? null,
        { frame: !Cp },
      ),
      mg
    );
  }
  async function mN(CR) {
    if (!m2) return null;
    if (!CR) {
      if (!kx) return null;
      let Cj = mY(m2);
      return (await mM(Cj, () => mU(kT + '/' + mv(m2, Cj)), null), null);
    }
    let CQ = await mU(CR.url);
    if (mZ) return null;
    (Number(CR.size) > 0 && CQ.scene.scale.setScalar(Number(CR.size)), ++mR, mq());
    for (let Cz of ['l', 'r']) ww[Cz] = null;
    return (
      (ma = { id: null, entry: null }),
      (kb = CR.rig ?? kA),
      (mf = null),
      (kx = !0),
      (m3 = CR.key),
      (mg = null),
      mW(CQ),
      my(),
      md(),
      { animations: CQ.animations ?? [] }
    );
  }
  async function mM(CR, CQ, Cj, { frame: Cz = !0 } = {}) {
    let Cp = {
        id: w0?.id ?? null,
        time: w0?.action?.time ?? 0,
        props: { l: ww.l?.id ?? null, r: ww.r?.id ?? null },
        ik: {
          enabled: [...mj.enabled],
          offsets: Object.fromEntries(Object.entries(DL().offsets).filter(([CJ]) => !wa(CJ))),
          keys: { ...mj.keys },
          selected: Dv?.selected ?? null,
        },
      },
      CO = kx;
    CO &&
      ((Cp.id = null),
      (Cp.props = { l: null, r: null }),
      (Cp.ik = { enabled: [], offsets: {}, keys: {}, selected: null }));
    let Cf = await CQ();
    if (mZ) return m3;
    if ((mq(), CO)) {
      ((kb = kA),
        (mf = m2?.rig?.joints?.[0] || 'root'),
        (kx = !1),
        (ma = { id: null, entry: null }));
      for (let CJ of ['l', 'r']) ww[CJ] = null;
    }
    ((m3 = CR), (mg = Cj), mW(Cf), (Cz || CO) && my(), mG());
    for (let CZ of ['l', 'r']) {
      let CU = Cp.props[CZ];
      ((ww[CZ] = null), CU && (await SF(CU, null, CZ)));
    }
    return (
      wL(Cp.ik),
      Cp.id && Cp.id === ma.id && ma.entry && (await S3(Cp.id, ma.entry), S9(Cp.time)),
      md(),
      m3
    );
  }
  async function S0(CR, CQ) {
    if (ky.has(CR)) return ky.get(CR);
    if (kW.has(CR)) return kW.get(CR);
    let Cj = (
      typeof CQ.load == 'function'
        ? Promise.resolve()
            .then(() => CQ.load())
            .then((Cz) => ({ animations: [Cz] }))
        : mU(kT + '/' + CQ.file)
    )
      .then((Cz) => {
        let Cp = Cz.animations?.[0];
        if (!Cp) throw new Error(CR + ': GLB contains no animation');
        return (ky.set(CR, Cp), kW.delete(CR), Cp);
      })
      .catch((Cz) => {
        throw (kW.delete(CR), Cz);
      });
    return (kW.set(CR, Cj), Cj);
  }
  function S1(CR) {
    let CQ = CR;
    return (
      w6 && (CQ = K(CQ, { rootName: mf, fromOrigin: w7 })),
      o(w8) || (CQ = L(CQ, w8, w9, { cuts: !0 })),
      w4 &&
        mO.yaw &&
        !kx &&
        (CQ = j(CQ, { rootName: mf, children: SQ(), rootRest: SK.get(mf) ?? null })),
      (ST = CQ),
      Sd.length && (CQ = T(CQ, Sd, SK, { cuts: !0 })),
      w5 && (CQ = d(CQ, kx ? { partner: H(kb) } : void 0)),
      SX && (CQ = SX.fit(CQ)),
      w4 && (CQ = u(CQ, { rootName: mf, lock: mO })),
      CQ
    );
  }
  function S2(CR) {
    let CQ = ST;
    try {
      return S1(CR);
    } finally {
      ST = CQ;
    }
  }
  async function S3(CR, CQ, { crossfadeMs: Cj = 250 } = {}) {
    let Cz = ++mR,
      Cp = await S0(CR, CQ);
    if (!(mZ || Cz !== mR)) return ((ma = { id: CR, entry: CQ }), S6(CR, Cp, Cj));
  }
  function S4(CR, { id: CQ = '__composite__', crossfadeMs: Cj = 250 } = {}) {
    return mZ ? null : (++mR, S6(CQ, CR, Cj));
  }
  function S5(CR) {
    return mZ || !w0 ? null : ((w0.raw = CR), SV(), CR);
  }
  function S6(CR, CQ, Cj) {
    let Cz = S1(CQ),
      Cp = kg.clipAction(Cz);
    return (
      Cp.reset(),
      Cp.setLoop(mJ ? N : h, mJ ? 1 / 0 : 1),
      (Cp.clampWhenFinished = !mJ),
      (Cp.enabled = !0),
      Cp.setEffectiveTimeScale(1),
      Cp.setEffectiveWeight(1),
      Cp.play(),
      w0 &&
        w0.action &&
        w0.action !== Cp &&
        (w0.action.crossFadeTo(Cp, Cj / 1000, !1), mQ.add({ clip: w0.clip, action: w0.action })),
      (DW = new Set(
        Cz.tracks.map((CO) => CO.name.split('.')[0]).filter((CO) => CO === z.r || CO === z.l),
      )),
      (w0 = { id: CR, clip: Cz, raw: CQ, action: Cp }),
      (w1 = !1),
      (w2 = !1),
      (kg.timeScale = w3),
      md(),
      Cz
    );
  }
  function S7(CR) {
    let CQ = !!CR;
    if (!CQ && w2 && w0) {
      S8();
      return;
    }
    ((w1 = CQ), (kg.timeScale = w1 ? 0 : w3), w1 || FL(!1), md());
  }
  function S8() {
    w0 &&
      (w0.action.reset(),
      (w0.action.paused = !1),
      w0.action.play(),
      (w2 = !1),
      (w1 = !1),
      (kg.timeScale = w3),
      kg.update(0),
      md());
  }
  function S9(CR) {
    if (!w0) return;
    let CQ = Math.max(0, Math.min(CR, w0.clip.duration));
    (Math.abs(CQ - w0.action.time) > 0.000001 && FL(),
      w2 &&
        CQ < w0.clip.duration - 0.0001 &&
        ((w2 = !1), (w0.action.paused = !1), w0.action.play()),
      (w0.action.time = CQ),
      kg.update(0),
      md());
  }
  function Sk(CR) {
    ((w3 = CR), w1 || (kg.timeScale = w3), md());
  }
  function Sw(CR) {
    ((mJ = !!CR),
      w0 &&
        (w0.action.setLoop(mJ ? N : h, mJ ? 1 / 0 : 1),
        (w0.action.clampWhenFinished = !mJ),
        mJ && w2 && S8()),
      md());
  }
  function SV() {
    if (w0) {
      let CR = w0.action.time,
        CQ = w1;
      (kg.stopAllAction(), kg.uncacheClip(w0.clip));
      let Cj = S1(w0.raw),
        Cz = kg.clipAction(Cj);
      (Cz.setLoop(mJ ? N : h, mJ ? 1 / 0 : 1),
        (Cz.clampWhenFinished = !mJ),
        Cz.play(),
        (Cz.time = Math.min(CR, Cj.duration)),
        (w0 = { ...w0, clip: Cj, action: Cz }),
        (w2 = !1),
        (w1 = CQ),
        (kg.timeScale = w1 ? 0 : w3),
        kg.update(0));
    }
  }
  function SD(CR) {
    return ((w8 = { ...w8, ...CR }), SV(), { ...w8 });
  }
  async function Sm(CR, CQ) {
    if (mp.has(CR)) return mp.get(CR);
    if (CQ?.scene) return (mp.set(CR, CQ.scene), CQ.scene);
    if (!CQ?.file) return null;
    let Cj = await mU(kT + '/' + CQ.file);
    return mZ ? null : (mp.set(CR, Cj.scene), Cj.scene);
  }
  function SS(CR) {
    return new Promise((CQ, Cj) => {
      kL.parse(CR, '', (Cz) => CQ(Cz.scene), Cj);
    });
  }
  function SE(CR) {
    return new Promise((CQ, Cj) => {
      kL.parse(CR, '', (Cz) => CQ({ scene: Cz.scene, animations: Cz.animations || [] }), Cj);
    });
  }
  async function SF(CR, CQ, Cj = p) {
    let Cz = wk[Cj],
      Cp = ww[Cj];
    if ((Cp && (J(Cz, Cp.holder), (ww[Cj] = null), wH()), !Cz || !CR)) return null;
    if (((ww[Cj] = { id: CR, holder: null }), !mp.has(CR))) {
      if (CQ?.scene) mp.set(CR, CQ.scene);
      else {
        if (CQ?.file) {
          let Cf = await mU(kT + '/' + CQ.file);
          if (mZ) return null;
          mp.set(CR, Cf.scene);
        } else return ((ww[Cj] = null), null);
      }
    }
    if (ww[Cj]?.id !== CR) return null;
    let CO = ww[wV(Cj)]?.id === CR ? mp.get(CR).clone(!0) : mp.get(CR);
    return ((ww[Cj] = { id: CR, holder: f(Cz, CO, k0) }), wH(), ww[Cj].holder);
  }
  function SC(CR) {
    let CQ = !!CR;
    return (CQ === w5 || ((w5 = CQ), SV(), md()), w5);
  }
  function SH(CR) {
    let CQ = !!CR;
    return (CQ === w6 || ((w6 = CQ), SV(), md()), w6);
  }
  function SR(CR) {
    let CQ = !!CR;
    return (CQ === w7 || ((w7 = CQ), w6 && SV(), md()), w7);
  }
  let SQ = () =>
    (kI?.getObjectByName(mf)?.children ?? []).filter((CR) => CR.isBone).map((CR) => CR.name);
  function Sj(CR) {
    let CQ = !!CR;
    return (CQ === w4 || ((w4 = CQ), SV(), md()), w4);
  }
  function Sz(CR) {
    return ((mO = { ...mO, ...CR }), w4 && SV(), md(), { ...mO });
  }
  function Sp() {
    return (
      kN ? (kY.remove(kN), kN.dispose?.(), (kN = null)) : ((kN = new kZ(kI)), kY.add(kN)),
      md(),
      !!kN
    );
  }
  function SO() {
    kM = !kM;
    for (let CR of kh) {
      let CQ = Array.isArray(CR.material) ? CR.material : [CR.material];
      for (let Cj of CQ) Cj && (Cj.wireframe = kM);
    }
    return (md(), kM);
  }
  let Sf = 'colour',
    SJ = new kt({ color: 12172481, roughness: 0.86, metalness: 0 });
  function SZ(CR) {
    return ((Sf = CR === 'grey' ? 'grey' : 'colour'), md(), Sf);
  }
  function SU() {
    if (Sf !== 'grey' || !kI) return null;
    let CR = [],
      CQ = (Cj) => {
        (CR.push([Cj, Cj.material]),
          (Cj.material = Array.isArray(Cj.material) ? Cj.material.map(() => SJ) : SJ));
      };
    return (
      kI.traverse((Cj) => {
        Cj.isMesh && (Cj.isSkinnedMesh || rF(Cj)) && CQ(Cj);
      }),
      SL?.companion?.traverse((Cj) => {
        Cj.isSkinnedMesh && CQ(Cj);
      }),
      (SJ.wireframe = kM),
      () => {
        for (let [Cj, Cz] of CR) Cj.material = Cz;
      }
    );
  }
  let Sd = [],
    SK = new Map(),
    ST = null,
    SA = null,
    SX = null,
    SL = null,
    Sb = new Map(),
    Sx = null,
    Sy = null,
    SW = null;
  function Sq(CR, CQ = null, { lift: Cj = 0 } = {}) {
    if (!kI) return;
    if (!CR) {
      if (Sy) {
        for (let [CO, Cf, CJ] of Sy) (CO.position.copy(Cf), CO.quaternion.copy(CJ));
      }
      ((Sy = null), (Sx = null), (SW = null), md());
      return;
    }
    Sy || (Sy = [...Sb.keys()].map((CZ) => [CZ, CZ.position.clone(), CZ.quaternion.clone()]));
    let Cz = new Map(),
      Cp = new Map();
    for (let [CZ, CU] of Sb) {
      let Cd = Cz.get(CZ.parent) ?? CZ.parent.getWorldQuaternion(new km()),
        CK = CR === 'T' ? null : CR.get(CZ.name),
        CT = CK ? CK.clone().multiply(CU.q0) : Cd.clone().multiply(CU.q);
      (Cz.set(CZ, CT), Cp.set(CZ, Cd.clone().invert().multiply(CT)));
    }
    if (
      ((Sx = Cp), (SW = CQ ?? (CR === 'T' ? 'T' : 'theirs')), (SP = null), CR !== 'T' && Cj > 0)
    ) {
      let CA = [...Sb.keys()].find((CX) => CX.name === 'pelvis');
      if (CA?.parent) {
        let CX = new k5().setFromMatrix4(CA.parent.matrixWorld.clone().invert());
        SP = {
          bone: CA,
          p: Sb.get(CA)
            .p.clone()
            .add(new kE(0, -Cj, 0).applyMatrix3(CX)),
        };
      }
    }
    md();
  }
  let SP = null;
  function SY() {
    if (Sx) {
      for (let [CR, CQ] of Sx)
        (CR.position.copy(SP?.bone === CR ? SP.p : Sb.get(CR).p), CR.quaternion.copy(CQ));
    }
  }
  let Sv = !1,
    SB = null,
    SG = null,
    Sg = null,
    SI = Fr(),
    Sh = [],
    SN = [],
    SM = 30,
    r0 = 0,
    r1 = new Map(),
    r2 = '',
    r3 = 0,
    r4 = [],
    r5 = null,
    r6 = {
      for: '',
      joints: 0,
      pos: null,
      have: null,
      left: 0,
      next: 0,
      scaled: null,
      scaledAs: '',
    };
  function r7(CR = {}) {
    return ((SI = Fr({ ...SI, ...CR })), { ...SI });
  }
  function r8(CR, CQ = 30) {
    ((Sh = Array.isArray(CR)
      ? CR.map((Cj) => (typeof Cj == 'number' ? { u: Cj } : Cj)).filter((Cj) =>
          Number.isFinite(Cj?.u),
        )
      : []),
      (SM = Number.isFinite(CQ) && CQ > 0 ? CQ : 30),
      r0++);
  }
  function r9(CR) {
    SN = Array.isArray(CR) ? CR.filter(Number.isInteger) : [];
  }
  let rk = [];
  function rw(CR) {
    rk = Array.isArray(CR) ? CR.filter(Array.isArray).map((CQ) => CQ.map(String)) : [];
  }
  function rV() {
    let CR = new Set(Sv ? rf : []),
      CQ = Dv?.selected ?? null;
    if (CQ) {
      for (let Cj of DP?.chainBones(CQ) ?? []) CR.add(Cj);
    }
    return [...CR];
  }
  function rD() {
    let CR = new Set(rk.flat()),
      CQ = new Set([...CR].map((Cj) => (w5 ? rN(Cj) : Cj)));
    return { shown: CR, kept: CQ, ik: null };
  }
  function rm(CR, CQ, Cj) {
    let Cz = CR / CQ;
    ((w0.action.time = Math.min(Math.max(0, Cz * Cj), Cj - 0.000001)),
      kg.update(0),
      Dy?.(),
      VE(),
      Dv?.update(Cz),
      DP?.run(Cz));
    let Cp = SB.capture();
    return (DP?.restore(), Cp);
  }
  function rS(CR, CQ, Cj, Cz) {
    let Cp = SB.jointList().length;
    (r6.for !== CR || r6.joints !== Cp) &&
      Object.assign(r6, {
        for: CR,
        joints: Cp,
        pos: new Float32Array(CQ * Cp * 3),
        have: new Uint8Array(CQ),
        left: CQ,
        next: 0,
        scaled: null,
        scaledAs: '',
      });
    let CO = !1;
    if (r6.left > 0) {
      let Cf = (CZ, CU) => {
        r6.have[CZ] ||
          CU?.pos?.length !== Cp * 3 ||
          (r6.pos.set(CU.pos, CZ * Cp * 3), (r6.have[CZ] = 1), r6.left--);
      };
      for (let [CZ, CU] of r1) CZ < CQ && Cf(CZ, CU);
      r6.next >= CQ && (r6.next = 0);
      let CJ = performance.now() + 6;
      for (; r6.left > 0 && r6.next < CQ && performance.now() < CJ;) {
        let Cd = r6.next++;
        if (r6.have[Cd]) continue;
        let CK = rm(Cd, Cj, Cz);
        ((CO = !0), r1.set(Cd, CK), Cf(Cd, CK));
      }
      r6.left > 0 && CD();
    }
    return (
      r6.left === 0 &&
        r6.scaledAs !== SI.colouring &&
        ((r6.scaled = Ss(ks(r6.pos, CQ, Cp), CQ, Cp, SI.colouring)), (r6.scaledAs = SI.colouring)),
      { scaled: r6.left === 0 ? r6.scaled : null, took: CO }
    );
  }
  let rE = () => Math.max(2, Math.round(w0.clip.duration * SM) + 1);
  function rF(CR) {
    for (let CQ = CR; CQ && CQ !== kI; CQ = CQ.parent) {
      if (CQ.userData?.ikEffector) return !1;
      if (CQ.name === '__prop__') return !0;
    }
    return !1;
  }
  function rC(CR) {
    if (!CR || (r5 && r5.version !== SB?.version)) {
      if (r5) {
        for (let [Cj, Cz] of r5) Cj.renderOrder = Cz;
      }
      r5 = null;
    }
    if (!CR || r5) return;
    ((r5 = []), (r5.version = SB?.version));
    let CQ = (Cp) => {
      Cp.isMesh &&
        (Cp.isSkinnedMesh || rF(Cp)) &&
        (r5.push([Cp, Cp.renderOrder]), (Cp.renderOrder = 20));
    };
    (kI?.traverse(CQ), SL?.companion?.traverse(CQ));
  }
  function rH() {
    let CR = !(w1 || w2);
    if (!(
      SI.enabled &&
      w0 &&
      kg &&
      kI &&
      !mQ.size &&
      w0.clip.duration > 0 &&
      (!CR || SI.duringPlayback)
    )) {
      (SB?.hide(), (r4 = []), rC(!1));
      return;
    }
    ((SB ??= Cs({ THREE: k0, clone: g, scene: kY, isProp: rF })),
      (SG !== kI || Sg !== SL) && (rC(!1), SB.setRig(kI, SL), (SG = kI), (Sg = SL)));
    let CQ = w0.clip.duration,
      Cj = w0.action.time,
      Cz = rE(),
      Cp = Cz - 1,
      CO = (CB) => Math.round(Math.min(1, Math.max(0, CB)) * Cp),
      Cf = CO(Cj / CQ),
      CJ = rD(),
      CZ = !!(CJ.shown.size || CJ.ik),
      CU = new Set(Ms(Sh, CZ ? { bones: CJ.kept, ik: CJ.ik } : null).map(CO)),
      Cd = vs(SI, Cf, 0, Cp, CU, SN);
    CR && (Cd = xs(Cd, Cf, SI.playbackCount));
    let CK = performance.now(),
      CT = w0.clip.uuid + '|' + Cz + '|' + r0 + '|' + SB.version,
      CA = rJ || E6 || DB?.dragging || Dv?.dragging;
    (CT !== r2 || r1.size > 4000 || (!CR && !CA && CK - r3 > 600)) &&
      (r1.clear(), (r2 = CT), (r3 = CK));
    let CX = !1;
    for (let CB of Cd) r1.has(CB) || (r1.set(CB, rm(CB, Cp, CQ)), (CX = !0));
    let CL = SI.colouring !== 'sides' ? rS(CT, Cz, Cp, CQ) : null;
    (CL?.took && (CX = !0),
      CX &&
        ((w0.action.time = Cj),
        kg.update(0),
        r2 !== w0.clip.uuid + '|' + Cz + '|' + r0 + '|' + SB.version && r1.clear()));
    let Cb = SB.jointList().length,
      Cx = CL?.scaled ?? null,
      Cy = Cx && SI.colouring !== 'speed',
      CW = yn(SI.slowColour),
      Cq = yn(SI.fastColour),
      CP = CZ ? Es(SB.jointList(), [...CJ.shown]) : null,
      CY = Rs(Cd, Cf),
      Cv = SI.inFront && SI.characterInFront;
    (rC(Cv),
      SB.show(
        CY.map((CG, Cg) => {
          let CI = null,
            Ch = null;
          if (Cx && !Cy) CI = Cx[CG];
          else {
            if (Cy) {
              Ch = new Float32Array(Cb * 3);
              let t0 = 0;
              for (let t1 = 0; t1 < Cb; t1++) {
                let t2 = Cx[CG * Cb + t1];
                ((t0 += t2), Ch.set(Wr(CW, Cq, t2), t1 * 3));
              }
              CI = Cb ? t0 / Cb : 0;
            }
          }
          let { rgb: CN, alpha: CM } = Ps(SI, CG, Cf, Cd, CU, CI);
          return {
            frame: CG,
            pose: r1.get(CG),
            rgb: CN,
            alpha: CM,
            shading: SI.shading,
            showMesh: SI.showMesh,
            inFront: SI.inFront,
            order: (Cv ? 5 : 30) + Cg * 0.001,
            part: CP,
            tints: Ch,
          };
        }),
      ),
      (r4 = CY));
  }
  function rR(CR) {
    if (!r4.length || !w0) return null;
    let CQ = kB.domElement.getBoundingClientRect(),
      Cj = new kE(),
      Cz = 900,
      Cp = null;
    for (let CO of SB.ghosts())
      for (let Cf of CO.joints) {
        if ((Cj.copy(Cf).project(kv), Cj.z > 1)) continue;
        let CJ = (Cj.x * 0.5 + 0.5) * CQ.width + CQ.left,
          CZ = (0.5 - Cj.y * 0.5) * CQ.height + CQ.top,
          CU = (CJ - CR.clientX) ** 2 + (CZ - CR.clientY) ** 2;
        CU < Cz && ((Cz = CU), (Cp = CO.frame));
      }
    return Cp;
  }
  let rQ = new kE(),
    rj = new km(),
    rz = new km();
  function rp(CR, CQ, Cj = null, Cz = null) {
    if (!w0 || !kg || !kI || mQ.size || !(w0.clip.duration > 0)) return null;
    let Cp = CR.map((CT) => kI.getObjectByName(CT) ?? null),
      CO =
        Cz?.pose && rJ && rZ
          ? [...rZ.bones, ...rZ.partners]
              .map((CT) => {
                let CA = Cz.pose[w5 ? rN(CT.b.name) : CT.b.name];
                if (!CA) return null;
                let CX = w0.clip.tracks.find((CL) => CL.name === CT.b.name + '.quaternion');
                return {
                  b: CT.b,
                  shown: CT.b.quaternion.clone(),
                  from: CT.local0,
                  rel: CA,
                  read: CX?.createInterpolant() ?? null,
                  end: CX ? CX.times[CX.times.length - 1] : 0,
                };
              })
              .filter(Boolean)
          : [],
      Cf = Cz?.ik && Dv && Dv.dragging === Cz.ik.key ? Dv.node(Cz.ik.key) : null,
      CJ = Cf?.position.clone(),
      CZ = Cf?.quaternion.clone();
    Cf && (Dv.setDragging(null), Dv.setKeys(Cz.ik.key, Cz.ik.curve));
    let CU = Cp.map((CT) => (CT ? new Float32Array(CQ.length * 3) : null)),
      Cd = w0.clip.duration,
      CK = w0.action.time;
    for (let CT = 0; CT < CQ.length; CT++) {
      ((w0.action.time = Math.min(Math.max(0, CQ[CT] * Cd), Cd - 0.000001)), kg.update(0));
      for (let CA of CO)
        (CA.read
          ? rj.fromArray(CA.read.evaluate(Math.min(w0.action.time, CA.end)))
          : rj.copy(CA.from),
          rz.fromArray(CA.rel, CT * 4),
          w5 && rz.set(rz.x, -rz.y, -rz.z, rz.w),
          CA.b.quaternion.copy(rj).multiply(rz));
      (Dy?.(), VE(), Dv?.update(CQ[CT]), DP?.run(CQ[CT]));
      for (let CX = 0; CX < Cp.length; CX++) {
        if (!Cp[CX]) continue;
        let CL = Cj?.[CX];
        (CL
          ? (Cp[CX].updateWorldMatrix(!0, !1),
            rQ.set(CL[0], CL[1], CL[2]).applyMatrix4(Cp[CX].matrixWorld))
          : Cp[CX].getWorldPosition(rQ),
          rQ.toArray(CU[CX], CT * 3));
      }
      DP?.restore();
    }
    ((w0.action.time = CK), kg.update(0));
    for (let Cb of CO) Cb.b.quaternion.copy(Cb.shown);
    return (
      Cf &&
        (Dv.setKeys(Cz.ik.key, mj.keys[Cz.ik.key] ?? null),
        Dv.setDragging(Cz.ik.key),
        Dv.updateOne(Cz.ik.key, wJ()),
        Cf.position.copy(CJ),
        Cf.quaternion.copy(CZ),
        Cf.updateMatrixWorld(!0),
        Dv.capture(Cz.ik.key)),
      CU
    );
  }
  let rO = null,
    rf = [],
    rJ = !1,
    rZ = null,
    rU = [],
    ru = new kR();
  ru.name = 'pose-proxy';
  let rd = new Map(),
    rK = new k8();
  ((rK.name = 'pose-markers'), (rK.visible = !1));
  let rT = !0,
    rA = null;
  function rX() {
    rK.visible = Sv && rT;
    let CR = kY?.getObjectByName('ik-effectors');
    (CR && (CR.visible = rT),
      Dv?.setShown(rT),
      DB && rA && ((rA.visible = rT && !!DB.object), (DB.enabled = rT && !!DB.object)));
  }
  function rL(CR) {
    return ((rT = !!CR), rX(), md(), rT);
  }
  let rb = [],
    rx = new kz({ depthTest: !1, depthWrite: !1, toneMapped: !1 }),
    ry = new kV(0.013, 10, 8),
    rW = null,
    rq = new kH(),
    rP = new kH().makeScale(0, 0, 0),
    rY = [],
    rv = null,
    rB = new kc({
      vertexColors: !0,
      transparent: !0,
      opacity: 0.75,
      depthTest: !1,
      depthWrite: !1,
      toneMapped: !1,
    }),
    rG = { idle: new kQ(3074186), set: new kQ(16747069), sel: new kQ(16766515) },
    rg = !0,
    rI = (CR) => (kx ? !!kb.posable?.test(CR) : x(CR)),
    rh = (CR) => !kx && y(CR),
    rN = (CR) => (kx ? H(kb)(CR) : W(CR)),
    rM = !1,
    E0 = !0,
    E1 = new Map(),
    E2 = null,
    E3 = 15,
    E4 = !1,
    E5 = !1,
    E6 = null,
    E7 = { x: null, y: null },
    E8 = { x: new kE(1, 0, 0), y: new kE(0, 1, 0), z: new kE(0, 0, 1) },
    E9 = new kE(),
    Ek = new kE(),
    Ew = new km(),
    EV = 0.5,
    ED = !1,
    Em = null,
    ES = new kE(),
    EE = new km(),
    EF = new km(),
    EC = new km(),
    EH = new km(),
    ER = null,
    EQ = new kV(0.016, 12, 10),
    Ej = {
      idle: new kQ(16747069),
      found: new kQ(15660024),
      sel: new kQ(16766515),
      mid: new kQ(16109890),
      left: new kQ(4164863),
      right: new kQ(16732240),
      chosen: new kQ(16777215),
    },
    Ez = new Set(['mid', 'left', 'right']);
  function Ep(CR) {
    if (
      (ER &&
        (ER.dots.removeFromParent(),
        ER.dots.dispose(),
        ER.tip.remove(),
        kB.domElement.removeEventListener('pointermove', ER.hover),
        (ER = null)),
      !CR?.points?.length)
    )
      return;
    let CQ = new kl(
      EQ,
      new kz({ depthTest: !1, depthWrite: !1, toneMapped: !1 }),
      CR.points.length,
    );
    ((CQ.renderOrder = 1001), (CQ.frustumCulled = !1), kY.add(CQ));
    let Cj = document.createElement('div');
    ((Cj.className = 'lib-jointtip'), (Cj.hidden = !0), kK.appendChild(Cj));
    let Cz = (Cp) => {
      if (ER.drag) return;
      let CO = Ef(Cp, 16),
        Cf = CO && ER.points.find((CZ) => CZ.id === CO);
      if (((Cj.hidden = !Cf), (kB.domElement.style.cursor = Cf ? 'grab' : ''), !Cf)) return;
      let CJ = kK.getBoundingClientRect();
      ((Cj.textContent = Cf.label ?? Cf.id),
        (Cj.style.left = Cp.clientX - CJ.left + 14 + 'px'),
        (Cj.style.top = Cp.clientY - CJ.top + 14 + 'px'));
    };
    (kB.domElement.addEventListener('pointermove', Cz),
      (ER = { ...CR, dots: CQ, tip: Cj, hover: Cz, drag: null }),
      EO());
  }
  function EO() {
    ER &&
      (ER.points.forEach((CR, CQ) => {
        let Cj = CR.hidden ? 0 : (CR.size ?? 1);
        ER.dots.setMatrixAt(CQ, rq.makeScale(Cj, Cj, Cj).setPosition(CR.pos.x, CR.pos.y, CR.pos.z));
        let Cz = ER.drag?.id === CR.id || CR.chosen;
        ER.dots.setColorAt(
          CQ,
          Cz ? (Ez.has(CR.kind) ? Ej.chosen : Ej.sel) : (Ej[CR.kind] ?? Ej.idle),
        );
      }),
      (ER.dots.instanceMatrix.needsUpdate = !0),
      ER.dots.instanceColor && (ER.dots.instanceColor.needsUpdate = !0));
  }
  function Ef(CR, CQ) {
    if (!ER) return null;
    let Cj = kB.domElement.getBoundingClientRect(),
      Cz = CR.clientX - Cj.left,
      Cp = CR.clientY - Cj.top,
      CO = null,
      Cf = CQ * CQ;
    for (let CJ of ER.points) {
      if (CJ.hidden || (ER.onSelect && CJ.chosen) || (ES.copy(CJ.pos).project(kv), ES.z > 1))
        continue;
      let CZ =
        ((((ES.x + 1) / 2) * Cj.width - Cz) ** 2 + (((1 - ES.y) / 2) * Cj.height - Cp) ** 2) /
        Math.max(0.6, Math.min(1, CJ.size ?? 1)) ** 2;
      CZ < Cf && ((Cf = CZ), (CO = CJ.id));
    }
    return CO;
  }
  function EJ(CR, CQ) {
    let Cj = ER.points.find((CZ) => CZ.id === CQ),
      Cz = new M().setFromNormalAndCoplanarPoint(kv.getWorldDirection(new kE()).negate(), Cj.pos),
      Cp = kB.domElement,
      CO = new kE(),
      Cf = (CZ) => {
        let CU = Cp.getBoundingClientRect();
        (Dx.set(
          ((CZ.clientX - CU.left) / CU.width) * 2 - 1,
          -((CZ.clientY - CU.top) / CU.height) * 2 + 1,
        ),
          Db.setFromCamera(Dx, kv),
          Db.ray.intersectPlane(Cz, CO) && ER?.onDrag?.(CQ, CO.x, CO.y, CO));
      },
      CJ = () => {
        (Cp.removeEventListener('pointermove', Cf),
          Cp.removeEventListener('pointerup', CJ),
          (Cp.style.cursor = ''),
          ER && ((ER.drag = null), EO(), ER.onDrop?.(CQ)));
      };
    ((ER.drag = { id: CQ }),
      (Cp.style.cursor = 'grabbing'),
      Cp.setPointerCapture?.(CR.pointerId),
      Cp.addEventListener('pointermove', Cf),
      Cp.addEventListener('pointerup', CJ),
      EO());
  }
  function EZ(CR) {
    ER && ((ER.points = CR), EO());
  }
  let EU = null;
  function Ed(CR) {
    ((EU = CR?.targets?.length ? CR : null),
      kB && (kB.domElement.style.cursor = EU ? 'crosshair' : ''));
  }
  function EK(CR) {
    let CQ = kB.domElement.getBoundingClientRect();
    return (
      Dx.set(
        ((CR.clientX - CQ.left) / CQ.width) * 2 - 1,
        -((CR.clientY - CQ.top) / CQ.height) * 2 + 1,
      ),
      Db.setFromCamera(Dx, kv),
      Db.intersectObjects(EU.targets, !1)[0] ?? null
    );
  }
  let ET = null;
  function EA(CR, CQ = {}) {
    let Cj = CR === !0 ? 'front' : CR;
    if (Cj) {
      ET ||
        (ET = {
          pos: kv.position.clone(),
          target: kG.target.clone(),
          fov: kv.fov,
          rotate: kG.enableRotate,
          near: kG.minDistance,
        });
      let Cz = SL ? new kC().setFromObject(SL.companion) : new kC().setFromObject(kI),
        Cp = Cj === 'free' && CQ.at,
        CO = Cp ? new kE(...CQ.at) : Cz.getCenter(new kE()),
        Cf = Cp
          ? Math.max(CQ.reach ?? 0.25, 0.05)
          : Math.max(Cz.max.y - Cz.min.y, Cz.max.x - Cz.min.x, 0.5);
      kv.fov = Cj === 'free' ? ET.fov : 10;
      let CJ = k2.degToRad(kv.fov / 2),
        CZ = Cp ? Math.min(1, kv.aspect || 1) : 1,
        CU = ((Cj === 'free' ? 0.75 : 0.62) * Cf) / (Math.tan(CJ) * CZ);
      (Cj === 'side'
        ? kv.position.set(CO.x + CU, CO.y, CO.z)
        : Cj === 'back'
          ? kv.position.set(CO.x, CO.y, CO.z - CU)
          : Cj === 'free'
            ? kv.position
                .copy(CO)
                .addScaledVector(new kE(...(CQ.from ?? [0.55, 0.2, 0.8])).normalize(), CU)
            : kv.position.set(CO.x, CO.y, CO.z + CU),
        (kG.minDistance = Cp ? Math.min(ET.near, CU * 0.25) : ET.near),
        kG.target.copy(CO),
        (kG.enableRotate = Cj === 'free'),
        kv.updateProjectionMatrix(),
        kG.update());
    } else
      ET &&
        (kv.position.copy(ET.pos),
        kG.target.copy(ET.target),
        (kv.fov = ET.fov),
        (kG.enableRotate = ET.rotate),
        (kG.minDistance = ET.near),
        kv.updateProjectionMatrix(),
        kG.update(),
        (ET = null));
  }
  let EX = null,
    EL = null,
    Eb = null;
  function Ex(CR) {
    if (((Eb = CR ?? null), !CR)) {
      EX && (EX.detach(), (EX.enabled = !1));
      return;
    }
    (EX ||
      ((EL = new kR()),
      kY.add(EL),
      (EX = new t(kv, kB.domElement)),
      EX.setMode('translate'),
      EX.setSpace('world'),
      EX.setSize(0.7),
      kY.add(EX.getHelper ? EX.getHelper() : EX),
      EX.addEventListener('dragging-changed', (CQ) => {
        ((kG.enabled = !CQ.value), CQ.value || Eb?.onEnd?.());
      }),
      EX.addEventListener('objectChange', () => {
        let CQ = Eb?.onMove?.(EL.position.clone());
        CQ && EL.position.copy(CQ);
      })),
      EL.position.copy(CR.pos),
      EL.updateMatrixWorld(!0),
      EX.attach(EL),
      (EX.enabled = !0));
  }
  let Ey = new Set();
  function EW(CR) {
    (Ey.add(CR), kY.add(CR));
  }
  function Eq(CR) {
    (Ey.delete(CR), CR.removeFromParent());
  }
  let EP = null,
    EY = {
      free: new kQ(8227737),
      mapped: new kQ(3074186),
      sel: new kQ(16766515),
      bad: new kQ(16734810),
    },
    Ev = 5,
    EB = new kV(1, 12, 8),
    EG = new kE(),
    Eg = new kE();
  function EI() {
    let CR = kB.domElement.clientHeight || 1,
      CQ = kv.isOrthographicCamera ? (kv.top - kv.bottom) / kv.zoom / CR : 0,
      Cj = (2 * Math.tan(((kv.fov ?? 50) * Math.PI) / 360)) / CR;
    return (
      kv.getWorldDirection(EG),
      (Cz, Cp, CO) => {
        let Cf = CQ || Math.max(Eg.copy(CO).sub(kv.position).dot(EG), 0.001) * Cj;
        Cz.setMatrixAt(Cp, rq.makeScale(Cf * Ev, Cf * Ev, Cf * Ev).setPosition(CO));
      }
    );
  }
  function Eh(CR) {
    if (
      (EP &&
        (EP.dots.removeFromParent(),
        EP.dots.dispose(),
        EP.tip.remove(),
        kB.domElement.removeEventListener('pointermove', EP.hover),
        (EP = null)),
      !CR?.bones?.length)
    )
      return;
    let CQ = new kl(EB, new kz({ depthTest: !1, depthWrite: !1, toneMapped: !1 }), CR.bones.length);
    ((CQ.renderOrder = 1000), (CQ.frustumCulled = !1), kY.add(CQ));
    let Cj = document.createElement('div');
    ((Cj.className = 'lib-jointtip'), (Cj.hidden = !0), kK.appendChild(Cj));
    let Cz = (Cp) => {
      let CO = F5(Cp, 12),
        Cf = CO && EP.bones.find((CZ) => CZ.id === CO);
      if (((Cj.hidden = !Cf), !Cf)) return;
      let CJ = kK.getBoundingClientRect();
      ((Cj.textContent = Cf.label ?? Cf.id),
        (Cj.style.left = Cp.clientX - CJ.left + 12 + 'px'),
        (Cj.style.top = Cp.clientY - CJ.top + 12 + 'px'));
    };
    (kB.domElement.addEventListener('pointermove', Cz),
      (EP = { ...CR, marks: CR.marks ?? new Map(), dots: CQ, tip: Cj, hover: Cz }),
      EN(),
      EM());
  }
  function EN() {
    EP &&
      (EP.bones.forEach(({ id: CR }, CQ) => EP.dots.setColorAt(CQ, EY[EP.marks.get(CR) ?? 'free'])),
      EP.dots.instanceColor && (EP.dots.instanceColor.needsUpdate = !0));
  }
  function EM() {
    if (!EP) return;
    SL?.companion.updateMatrixWorld(!0);
    let CR = EI();
    (EP.bones.forEach(({ bone: CQ }, Cj) =>
      CR(EP.dots, Cj, ES.setFromMatrixPosition(CQ.matrixWorld)),
    ),
      (EP.dots.instanceMatrix.needsUpdate = !0));
  }
  let F0 = null;
  function F1(CR) {
    if (F0) {
      (F0.root.removeFromParent(),
        F0.dots.removeFromParent(),
        F0.dots.dispose(),
        F0.tip.remove(),
        kB.domElement.removeEventListener('pointermove', F0.hover),
        CR || (kv.position.copy(F0.cam.pos), kG.target.copy(F0.cam.target), kG.update()));
      let CX = F0.cam;
      ((F0 = null), CR && (CR = { ...CR, cam: CX }));
    }
    if (!CR?.root || !CR.bones?.length) return;
    let CQ = SL?.companion ?? kI;
    CQ.updateMatrixWorld(!0);
    let Cj = new kC().setFromObject(CQ);
    if (Cj.isEmpty()) {
      let CL = new kE();
      CQ.traverse((Cb) => {
        Cb.isBone && Cj.expandByPoint(Cb.getWorldPosition(CL));
      });
    }
    let Cz = CR.root;
    (kY.add(Cz), Cz.position.set(0, 0, 0), Cz.scale.setScalar(1), Cz.updateMatrixWorld(!0));
    let Cp = new kC().setFromObject(Cz),
      CO = Math.max(Cj.max.y - Cj.min.y, 0.1);
    (Cz.scale.setScalar(CO / Math.max(Cp.max.y - Cp.min.y, 0.000001)),
      Cz.updateMatrixWorld(!0),
      (Cp = new kC().setFromObject(Cz)),
      Cz.position.set(
        Cj.min.x - CO * 0.3 - Cp.max.x,
        Cj.min.y - Cp.min.y,
        (Cj.min.z + Cj.max.z) / 2 - (Cp.min.z + Cp.max.z) / 2,
      ),
      Cz.updateMatrixWorld(!0));
    let Cf = new kl(EB, new kz({ depthTest: !1, depthWrite: !1, toneMapped: !1 }), CR.bones.length);
    ((Cf.renderOrder = 1000), (Cf.frustumCulled = !1), kY.add(Cf));
    let CJ = document.createElement('div');
    ((CJ.className = 'lib-jointtip'), (CJ.hidden = !0), kK.appendChild(CJ));
    let CZ = (Cb) => {
      let Cx = F4(Cb, 12),
        Cy = Cx && F0.bones.find((Cq) => Cq.id === Cx);
      if (((CJ.hidden = !Cy), !Cy)) return;
      let CW = kK.getBoundingClientRect();
      ((CJ.textContent = Cy.label ?? Cy.id),
        (CJ.style.left = Cb.clientX - CW.left + 12 + 'px'),
        (CJ.style.top = Cb.clientY - CW.top + 12 + 'px'));
    };
    (kB.domElement.addEventListener('pointermove', CZ),
      (F0 = {
        root: Cz,
        bones: CR.bones,
        dots: Cf,
        marks: CR.marks ?? new Map(),
        onPick: CR.onPick,
        tip: CJ,
        hover: CZ,
        cam: CR.cam ?? { pos: kv.position.clone(), target: kG.target.clone() },
      }),
      F3(),
      F2());
    let CU = Cj.clone().union(new kC().setFromObject(Cz)),
      Cd = CU.getCenter(new kE()),
      CK = CU.getSize(new kE()),
      CT = Math.tan((kv.fov * Math.PI) / 360),
      CA = Math.max(CK.y / 2 / CT, CK.x / 2 / CT / Math.max(kv.aspect, 0.2)) * 1.12 + CK.z / 2;
    (kG.target.copy(Cd), kv.position.set(Cd.x, Cd.y + CK.y * 0.05, Cd.z + CA), kG.update());
  }
  function F2() {
    if (!F0) return;
    let CR = EI();
    (F0.bones.forEach(({ bone: CQ }, Cj) =>
      CR(F0.dots, Cj, ES.setFromMatrixPosition(CQ.matrixWorld)),
    ),
      (F0.dots.instanceMatrix.needsUpdate = !0));
  }
  function F3() {
    F0 &&
      (F0.bones.forEach(({ id: CR }, CQ) => F0.dots.setColorAt(CQ, EY[F0.marks.get(CR) ?? 'free'])),
      F0.dots.instanceColor && (F0.dots.instanceColor.needsUpdate = !0));
  }
  function F4(CR, CQ) {
    if (!F0) return null;
    let Cj = kB.domElement.getBoundingClientRect(),
      Cz = CR.clientX - Cj.left,
      Cp = CR.clientY - Cj.top,
      CO = null,
      Cf = CQ * CQ;
    for (let { id: CJ, bone: CZ } of F0.bones) {
      if ((ES.setFromMatrixPosition(CZ.matrixWorld).project(kv), ES.z > 1)) continue;
      let CU = ((ES.x + 1) / 2) * Cj.width,
        Cd = ((1 - ES.y) / 2) * Cj.height,
        CK = (CU - Cz) ** 2 + (Cd - Cp) ** 2;
      CK < Cf && ((Cf = CK), (CO = CJ));
    }
    return CO;
  }
  function F5(CR, CQ) {
    if (!EP) return null;
    let Cj = kB.domElement.getBoundingClientRect(),
      Cz = CR.clientX - Cj.left,
      Cp = CR.clientY - Cj.top,
      CO = null,
      Cf = CQ * CQ;
    for (let { id: CJ, bone: CZ } of EP.bones) {
      if ((ES.setFromMatrixPosition(CZ.matrixWorld).project(kv), ES.z > 1)) continue;
      let CU = ((ES.x + 1) / 2) * Cj.width,
        Cd = ((1 - ES.y) / 2) * Cj.height,
        CK = (CU - Cz) ** 2 + (Cd - Cp) ** 2;
      CK < Cf && ((Cf = CK), (CO = CJ));
    }
    return CO;
  }
  function F6() {
    (rK.parent || kY.add(rK, ru),
      rW && (rK.remove(rW), rW.dispose(), (rW = null)),
      rd.clear(),
      kI?.traverse((CQ) => {
        !CQ.isBone ||
          !rI(CQ.name) ||
          rd.set(CQ.name, {
            userData: { bone: CQ },
            position: new kE(),
            visible: !0,
            index: rd.size,
          });
      }),
      (rW = new kl(ry, rx, Math.max(1, rd.size))),
      (rW.count = rd.size),
      (rW.renderOrder = 999),
      (rW.frustumCulled = !1),
      rK.add(rW),
      (rY = []));
    for (let CQ of rd.values()) {
      let Cj = CQ.userData.bone.parent;
      for (; Cj && !(Cj.isBone && rd.has(Cj.name));) Cj = Cj.parent;
      Cj && rY.push([CQ, rd.get(Cj.name)]);
    }
    rv && (rK.remove(rv), rv.geometry.dispose());
    let CR = new kU();
    (CR.setAttribute('position', new kf(new Float32Array(rY.length * 6), 3)),
      CR.setAttribute('color', new kf(new Float32Array(rY.length * 6), 3)),
      (rv = new kp(CR, rB)),
      (rv.renderOrder = 998),
      (rv.frustumCulled = !1),
      rK.add(rv),
      F8(),
      F7());
  }
  function F7() {
    if (rW) {
      for (let [CQ, Cj] of rd)
        rW.setColorAt(Cj.index, CQ === rO ? rG.sel : rf.includes(CQ) ? rG.set : rG.idle);
      rW.instanceColor && (rW.instanceColor.needsUpdate = !0);
    }
    let CR = rv?.geometry.attributes.color;
    CR &&
      (rY.forEach(([Cz], Cp) => {
        let CO = Cz.userData.bone.name,
          Cf = CO === rO ? rG.sel : rf.includes(CO) ? rG.set : rG.idle;
        (CR.setXYZ(Cp * 2, Cf.r, Cf.g, Cf.b), CR.setXYZ(Cp * 2 + 1, Cf.r, Cf.g, Cf.b));
      }),
      (CR.needsUpdate = !0));
  }
  function F8() {
    for (let [CR, CQ] of rd) CQ.visible = rg || !rh(CR);
  }
  function F9() {
    if (!Sv) return;
    kI?.updateMatrixWorld(!0);
    for (let [Cj, Cz] of rd) {
      Cz.position.setFromMatrixPosition(Cz.userData.bone.matrixWorld);
      let Cp = rh(Cj) ? DI : 1;
      rW?.setMatrixAt(
        Cz.index,
        Cz.visible
          ? rq.makeScale(Cp, Cp, Cp).setPosition(Cz.position.x, Cz.position.y, Cz.position.z)
          : rP,
      );
    }
    rW && (rW.instanceMatrix.needsUpdate = !0);
    let CR = rv?.geometry.attributes.position;
    CR &&
      (rY.forEach(([CO, Cf], CJ) => {
        let CZ = CO.visible ? CO.position : Cf.position;
        (CR.setXYZ(CJ * 2, CZ.x, CZ.y, CZ.z),
          CR.setXYZ(CJ * 2 + 1, Cf.position.x, Cf.position.y, Cf.position.z));
      }),
      (CR.needsUpdate = !0));
    let CQ = rO && rd.get(rO)?.userData.bone;
    if (CQ && !rJ) {
      CQ.getWorldPosition(ru.position);
      let CO = DM();
      (CO === 'view'
        ? ru.quaternion.copy(kv.quaternion)
        : CO === 'parent' && CQ.parent
          ? CQ.parent.getWorldQuaternion(ru.quaternion)
          : CQ.getWorldQuaternion(ru.quaternion),
        ru.updateMatrixWorld(!0));
    }
  }
  function Fk(CR, CQ = 14) {
    let Cj = kB.domElement.getBoundingClientRect(),
      Cz = null;
    for (let [Cp, CO] of rd) {
      if (!CO.visible || (ES.copy(CO.position).project(kv), ES.z > 1)) continue;
      let Cf = Cj.left + ((ES.x + 1) / 2) * Cj.width,
        CJ = Cj.top + ((1 - ES.y) / 2) * Cj.height,
        CZ = Math.hypot(Cf - CR.clientX, CJ - CR.clientY);
      CZ < CQ && (!Cz || CZ < Cz.d) && (Cz = { name: Cp, d: CZ });
    }
    return Cz ? (Fw(Cz.name, { add: CR.shiftKey }), !0) : !1;
  }
  function Fw(CR, { add: CQ = !1 } = {}) {
    return (
      !!CR && rd.has(CR)
        ? CQ
          ? (rf = rf.includes(CR) ? rf.filter((Cj) => Cj !== CR) : [...rf, CR])
          : (rf = [CR])
        : (rf = []),
      FV()
    );
  }
  function FV() {
    return (
      (rO = rf.length ? rf[rf.length - 1] : null),
      F7(),
      DB &&
        (rO
          ? (Dv?.select(null),
            F9(),
            DB.setMode('rotate'),
            DB.setSpace(DM() === 'global' ? 'world' : 'local'),
            DB.setSize(rh(rO) ? Dg : DG),
            DB.attach(ru),
            (DB.enabled = !0))
          : DB.object === ru &&
            (DB.detach(), (DB.enabled = !1), DB.setMode(mj.gizmoMode), DB.setSpace(mj.gizmoSpace)),
        md()),
      rO
    );
  }
  function FD() {
    if (!rO) return [];
    let CR = [];
    for (let CQ of rf)
      rd.get(CQ)?.userData.bone.traverse((Cj) => {
        Cj.isBone &&
          rd.has(Cj.name) &&
          !rf.includes(Cj.name) &&
          !CR.includes(Cj.name) &&
          CR.push(Cj.name);
      });
    return (CR.length && ((rf = [...rf.filter((Cj) => Cj !== rO), ...CR, rO]), F7(), md()), rf);
  }
  function Fm({ add: CR = !1 } = {}) {
    if (!rO) return [];
    let CQ = (Cz) => (rd.has(rN(Cz)) ? rN(Cz) : Cz),
      Cj = rf.map(CQ);
    return (
      (rf = CR ? [...[...new Set([...rf, ...Cj])].filter((Cz) => Cz !== rO), rO] : Cj),
      FV(),
      rf
    );
  }
  function FS(CR) {
    return ((rM = !!CR), md(), rM);
  }
  function FE(CR) {
    return (
      (DN = Dh.includes(CR) ? CR : null),
      DB && DB.object === ru && DB.setSpace(DM() === 'global' ? 'world' : 'local'),
      F9(),
      md(),
      DM()
    );
  }
  function FF(CR) {
    return ((rg = !!CR), F8(), F9(), md(), rg);
  }
  function FC(CR = !0) {
    let CQ = !!CR && Sv;
    return (
      !CQ && Em && FR(null),
      (ED = CQ),
      kB && (kB.domElement.style.cursor = ED ? 'crosshair' : ''),
      md(),
      ED
    );
  }
  function FH(CR) {
    let CQ = document.createElement('div');
    ((CQ.className = 'lib-posebox'),
      document.body.appendChild(CQ),
      (Em = {
        x0: CR.clientX,
        y0: CR.clientY,
        x1: CR.clientX,
        y1: CR.clientY,
        add: CR.shiftKey,
        id: CR.pointerId,
        el: CQ,
      }));
    let Cj = (Cp) => {
        Cp.pointerId === Em?.id &&
          ((Em.x1 = Cp.clientX),
          (Em.y1 = Cp.clientY),
          Object.assign(Em.el.style, {
            left: Math.min(Em.x0, Em.x1) + 'px',
            top: Math.min(Em.y0, Em.y1) + 'px',
            width: Math.abs(Em.x1 - Em.x0) + 'px',
            height: Math.abs(Em.y1 - Em.y0) + 'px',
          }));
      },
      Cz = (Cp) => {
        Cp.pointerId === Em?.id && FR(Cp);
      };
    ((Em.off = () => {
      (window.removeEventListener('pointermove', Cj, !0),
        window.removeEventListener('pointerup', Cz, !0));
    }),
      window.addEventListener('pointermove', Cj, !0),
      window.addEventListener('pointerup', Cz, !0),
      Cj(CR));
  }
  function FR(CR) {
    let CQ = Em;
    if (
      ((Em = null),
      CQ.off(),
      CQ.el.remove(),
      (ED = !1),
      kB && (kB.domElement.style.cursor = ''),
      CR)
    ) {
      let Cj = Math.min(CQ.x0, CQ.x1),
        Cz = Math.max(CQ.x0, CQ.x1),
        Cp = Math.min(CQ.y0, CQ.y1),
        CO = Math.max(CQ.y0, CQ.y1),
        Cf = kB.domElement.getBoundingClientRect(),
        CJ = [];
      for (let [CZ, CU] of rd) {
        if (!CU.visible || (ES.copy(CU.position).project(kv), ES.z > 1)) continue;
        let Cd = Cf.left + ((ES.x + 1) / 2) * Cf.width,
          CK = Cf.top + ((1 - ES.y) / 2) * Cf.height;
        Cd >= Cj && Cd <= Cz && CK >= Cp && CK <= CO && CJ.push(CZ);
      }
      if (CQ.add || CR.shiftKey) {
        let CT = rO;
        rf = [...new Set([...rf.filter((CA) => CA !== CT), ...CJ, ...(CT ? [CT] : [])])];
      } else {
        let CA = (CL) => {
            let Cb = 0;
            for (let Cx = rd.get(CL).userData.bone; Cx; Cx = Cx.parent) Cb++;
            return Cb;
          },
          CX = CJ.reduce((CL, Cb) => (CL == null || CA(Cb) < CA(CL) ? Cb : CL), null);
        rf = CX ? [...CJ.filter((CL) => CL !== CX), CX] : [];
      }
      FV();
      return;
    }
    md();
  }
  function FQ(CR) {
    return (
      (Sv = !!CR),
      (rK.visible = Sv && rT),
      !Sv && rO && Fw(null),
      !Sv && ED && FC(!1),
      md(),
      Sv
    );
  }
  function Fj() {
    (w1 || S7(!0), (rJ = !0));
    let CR = rf.map((Cj) => rd.get(Cj)?.userData.bone).filter((Cj) => Cj?.parent);
    for (let Cj of CR) Cj.updateWorldMatrix(!0, !1);
    let CQ = [];
    if (rM)
      for (let Cz of CR) {
        let Cp = rN(Cz.name);
        if (Cp !== Cz.name && rd.has(Cp) && !rf.includes(Cp)) {
          let CO = rd.get(Cp).userData.bone;
          CQ.push({ from: Cz, b: CO, local0: CO.quaternion.clone() });
        }
      }
    rZ = {
      q0: ru.getWorldQuaternion(new km()),
      space: DM(),
      bones: CR.map((Cf) => ({
        b: Cf,
        local0: Cf.quaternion.clone(),
        world0: Cf.getWorldQuaternion(new km()),
        parent0: Cf.parent ? Cf.parent.getWorldQuaternion(new km()) : new km(),
      })),
      partners: CQ,
    };
  }
  function Fz() {
    if (!rJ || !rZ) return;
    let CR;
    if (
      (rZ.modal
        ? (CR = FB(rZ.modal, EE))
        : (ru.getWorldQuaternion(EF),
          (CR = rZ.space === 'local' ? 'own' : rZ.space === 'parent' ? 'parent' : 'room'),
          CR === 'room'
            ? EE.copy(EF).multiply(EC.copy(rZ.q0).invert())
            : EE.copy(rZ.q0).invert().multiply(EF)),
      CR === 'own')
    ) {
      for (let CQ of rZ.bones) CQ.b.quaternion.copy(CQ.local0).multiply(EE);
    } else {
      if (CR === 'parent') {
        for (let Cj of rZ.bones) Cj.b.quaternion.copy(EE).multiply(Cj.local0);
      } else {
        for (let Cz of rZ.bones)
          (EH.copy(Cz.world0).invert().multiply(EE).multiply(Cz.world0),
            Cz.b.quaternion.copy(Cz.local0).multiply(EH));
      }
    }
    for (let { from: Cp, b: CO } of rZ.partners)
      CO.quaternion.set(Cp.quaternion.x, -Cp.quaternion.y, -Cp.quaternion.z, Cp.quaternion.w);
  }
  function Fp(CR, CQ = null) {
    let Cj = CQ == null ? (w0?.action?.time ?? 0) : CQ * (w0?.clip?.duration ?? 0),
      Cz = ST?.tracks.find((Cp) => Cp.name === CR + '.quaternion');
    return Cz
      ? [...Cz.createInterpolant().evaluate(Math.min(Cj, Cz.times[Cz.times.length - 1]))]
      : (SK.get(CR) ?? [0, 0, 0, 1]);
  }
  function FO() {
    Fz();
    let CR = [...rZ.bones.map((Cp) => Cp.b), ...rZ.partners.map((Cp) => Cp.b)],
      CQ = wf(),
      Cj = CQ ? v(CQ.u, CQ.frames) : wJ(),
      Cz = CR.map((Cp) => {
        let CO = Cp.quaternion.toArray(),
          Cf = w5 ? rN(Cp.name) : Cp.name;
        return { bone: Cf, target: w5 ? q(CO) : CO, base: Fp(Cf, Cj) };
      });
    return { turned: CR, bones: Cz, u: Cj };
  }
  function Ff() {
    if (rZ?.bones.length && w0) {
      let { turned: CR, bones: CQ, u: Cj } = FO();
      if (E0) {
        for (let Cz of rU) Cz({ bones: CQ, u: Cj });
      } else FA(CR, CQ, Cj, FT(rZ));
    }
    ((rJ = !1), (rZ = null));
  }
  function FJ(CR) {
    if (!w0 || !kI || rJ || E6) return !1;
    let CQ = wf(),
      Cj = CQ ? v(CQ.u, CQ.frames) : wJ();
    if (Cj == null) return !1;
    let Cz = [],
      Cp = [],
      CO = new Map();
    for (let [Cf, CJ] of Object.entries(CR ?? {})) {
      let CZ = rd.get(Cf)?.userData.bone;
      if (!CZ || CJ?.length !== 4) continue;
      (CO.set(CZ, CZ.quaternion.clone()), CZ.quaternion.fromArray(CJ).normalize(), Cz.push(CZ));
      let CU = w5 ? rN(Cf) : Cf,
        Cd = CZ.quaternion.toArray();
      Cp.push({ bone: CU, target: w5 ? q(Cd) : Cd, base: Fp(CU, Cj) });
    }
    if (!Cp.length) return !1;
    if (E0) {
      for (let CK of rU) CK({ bones: Cp, u: Cj });
    } else FA(Cz, Cp, Cj, CO);
    return (CD?.(), !0);
  }
  let FZ = null;
  function FU(CR) {
    let CQ = FZ;
    if (CQ) {
      for (let [Cj, Cz] of CQ) (Cj.quaternion.copy(Cz.wasQ), Cj.position.copy(Cz.wasP));
    }
    if (((FZ = null), CR && kI)) {
      let Cp = new Map(),
        CO = (Cf) => {
          let CJ = rd.get(Cf)?.userData.bone ?? null;
          return (
            CJ &&
              !Cp.has(CJ) &&
              Cp.set(CJ, {
                q: null,
                p: null,
                wasQ: CQ?.get(CJ)?.wasQ ?? CJ.quaternion.clone(),
                wasP: CQ?.get(CJ)?.wasP ?? CJ.position.clone(),
              }),
            CJ ? Cp.get(CJ) : null
          );
        };
      for (let [Cf, CJ] of Object.entries(CR.turns ?? {})) {
        let CZ = CJ?.length === 4 ? CO(Cf) : null;
        CZ && (CZ.q = new km().fromArray(CJ).normalize());
      }
      for (let [CU, Cd] of Object.entries(CR.places ?? {})) {
        let CK = Cd?.length === 3 ? CO(CU) : null;
        CK && (CK.p = new kE().fromArray(Cd));
      }
      Cp.size && (FZ = Cp);
    }
    return (Fd(), CD?.(), !!FZ);
  }
  function Fd() {
    if (FZ) {
      for (let [CR, CQ] of FZ) (CQ.q && CR.quaternion.copy(CQ.q), CQ.p && CR.position.copy(CQ.p));
    }
  }
  function FK(CR) {
    ((Sd = Array.isArray(CR) ? CR : []), FL(), SV());
  }
  function FT(CR) {
    let CQ = new Map();
    for (let Cj of [...CR.bones, ...CR.partners]) CQ.set(Cj.b, Cj.local0);
    return CQ;
  }
  function FA(CR, CQ, Cj, Cz) {
    (E2 && Math.abs(E2.u - Cj) > 1e-9 && FL(!1),
      (E2 ??= { u: Cj, bones: new Map() }),
      CR.forEach((Cp, CO) => {
        let Cf = E1.get(Cp)?.orig ?? Cz.get(Cp)?.clone() ?? Cp.quaternion.clone();
        (E1.set(Cp, { q: Cp.quaternion.clone(), orig: Cf }), E2.bones.set(CQ[CO].bone, CQ[CO]));
      }),
      md());
  }
  function FX() {
    if (!(rJ || !E1.size)) {
      for (let [CR, CQ] of E1) CR.quaternion.copy(CQ.q);
    }
  }
  function FL(CR = !0) {
    if (!(!E1.size && !E2)) {
      for (let [CQ, Cj] of E1) CQ.quaternion.copy(Cj.orig);
      (E1.clear(), (E2 = null), CR && md());
    }
  }
  function Fb() {
    let CR = E2;
    if (!CR) return !1;
    FL(!1);
    for (let CQ of rU) CQ({ bones: [...CR.bones.values()], u: CR.u });
    return (md(), !0);
  }
  function Fx(CR) {
    return ((E0 = !!CR), E0 && FL(!1), md(), E0);
  }
  let Fy = () => (E4 !== E5 ? E3 : 0);
  function FW() {
    if (!DB) return;
    let CR = DB.object === ru ? Fy() : 0;
    DB.setRotationSnap(CR ? k2.degToRad(CR) : null);
  }
  function Fq(CR) {
    return (CR > 0 ? ((E3 = CR), (E4 = !0)) : (E4 = !1), FW(), md(), E4 ? E3 : 0);
  }
  let FP = (CR) =>
      CR.typed !== '' && CR.typed !== '-' && CR.typed !== '.' && Number.isFinite(Number(CR.typed))
        ? Number(CR.typed)
        : null,
    FY = 1 / 70;
  function Fv(CR, CQ) {
    let Cj = new kE().fromArray(CR);
    if (Cj.lengthSq() < 1e-12) return null;
    (Cj.normalize(), kv.getWorldDirection(ES));
    let Cz = Cj.clone().applyQuaternion(CQ).cross(Ek.copy(ES).negate()),
      Cp = Cz.dot(E9.setFromMatrixColumn(kv.matrixWorld, 0)),
      CO = -Cz.dot(E9.setFromMatrixColumn(kv.matrixWorld, 1)),
      Cf = Math.hypot(Cp, CO);
    return Cf < 0.2 ? null : { axis: Cj, sx: Cp / Cf, sy: CO / Cf };
  }
  function FB(CR, CQ) {
    let Cj = FP(CR);
    if (CR.roll && Cj == null)
      return (
        CQ.setFromAxisAngle(
          CR.roll.axis,
          ((CR.x - CR.x0) * CR.roll.sx + (CR.y - CR.y0) * CR.roll.sy) * FY,
        ),
        'own'
      );
    let Cz = (CR.theta * 180) / Math.PI,
      Cp = Fy();
    (Cp && Cj == null && (Cz = Math.round(Cz / Cp) * Cp), kv.getWorldDirection(ES));
    let CO = k2.degToRad;
    if (CR.trackball) {
      let Cf = (CR.x - CR.x0) * EV,
        CJ = (CR.y - CR.y0) * EV;
      return (
        Cj != null
          ? ((Cf = Cj), (CJ = 0))
          : Cp && ((Cf = Math.round(Cf / Cp) * Cp), (CJ = Math.round(CJ / Cp) * Cp)),
        CQ.setFromAxisAngle(E9.set(0, 1, 0).applyQuaternion(kv.quaternion), CO(Cf)),
        Ew.setFromAxisAngle(E9.set(1, 0, 0).applyQuaternion(kv.quaternion), CO(CJ)),
        CQ.premultiply(Ew),
        'room'
      );
    }
    if (CR.axis) {
      let CZ = E8[CR.axis],
        CU = CR.act ? m0(CR) : 'global',
        Cd =
          CU === 'local'
            ? E9.copy(CZ).applyQuaternion(CR.act.world0)
            : CU === 'parent'
              ? E9.copy(CZ).applyQuaternion(CR.act.parent0)
              : CU === 'view'
                ? E9.copy(CZ).applyQuaternion(kv.quaternion)
                : E9.copy(CZ),
        CK = Math.sign(Cd.dot(ES)) || 1;
      return (
        CQ.setFromAxisAngle(CU === 'view' ? Cd : CZ, CO(Cj ?? Cz * CK)),
        CU === 'local' ? 'own' : CU === 'parent' ? 'parent' : 'room'
      );
    }
    return (CQ.setFromAxisAngle(E9.copy(ES).negate(), CO(Cj ?? -Cz)), 'room');
  }
  function FG(CR, CQ) {
    let Cj = FP(CR),
      Cz = CR.axis ? E9.copy(E8[CR.axis]) : null;
    if ((Cz && CR.local && Cz.applyQuaternion(CR.node.getWorldQuaternion(EE)), Cj != null))
      return CQ.copy(Cz ?? E8.x)
        .multiplyScalar(Cj / 100)
        .add(CR.p0);
    let Cp = kB.domElement.getBoundingClientRect(),
      CO = (CK, CT) => (
        Dx.set(((CK - Cp.left) / Cp.width) * 2 - 1, -((CT - Cp.top) / Cp.height) * 2 + 1),
        Db.setFromCamera(Dx, kv),
        Db.ray.clone()
      ),
      Cf = CO(CR.x0, CR.y0),
      CJ = CO(CR.x, CR.y);
    if (Cz) {
      let CK = (CT) => {
        let CA = Ek.copy(CR.p0).sub(CT.origin),
          CX = Cz.dot(CT.direction),
          CL = Cz.dot(CA),
          Cb = CT.direction.dot(CA),
          Cx = 1 - CX * CX;
        return Math.abs(Cx) < 1e-9 ? 0 : (CX * Cb - CL) / Cx;
      };
      return CQ.copy(Cz)
        .multiplyScalar(CK(CJ) - CK(Cf))
        .add(CR.p0);
    }
    kv.getWorldDirection(ES);
    let CZ = new M().setFromNormalAndCoplanarPoint(ES, CR.p0),
      CU = Cf.intersectPlane(CZ, new kE()),
      Cd = CJ.intersectPlane(CZ, new kE());
    return (CU && Cd ? CQ.copy(CR.p0).add(Cd.sub(CU)) : CQ.copy(CR.p0)).addScaledVector(
      ES,
      CR.depth ?? 0,
    );
  }
  let Fg = new kH();
  function FI(CR) {
    return E6?.kind !== 'move' ? !1 : ((E6.depth = (E6.depth ?? 0) + (Number(CR) || 0)), Fh(), !0);
  }
  function Fh() {
    let CR = E6;
    if (CR?.kind === 'turn') {
      (FB(CR, EE),
        CR.node.parent.getWorldQuaternion(EF),
        CR.node.quaternion.copy(EC.copy(EF).invert().multiply(EE).multiply(EF)).multiply(CR.q0),
        CR.node.updateMatrixWorld(!0),
        Dv.capture(CR.ik));
      return;
    }
    if (CR?.kind !== 'move') return;
    let CQ = FG(CR, new kE()),
      Cj = CR.node.parent;
    if (CR.seen)
      (Fg.copy(CR.drawn).invert(),
        CR.node.position
          .copy(CR.start)
          .add(CQ.applyMatrix4(Fg))
          .sub(Ek.copy(CR.p0).applyMatrix4(Fg)));
    else {
      Cj.updateWorldMatrix(!0, !1);
      let Cz = Cj.worldToLocal(CR.p0.clone());
      CR.node.position.copy(CR.start).add(Cj.worldToLocal(CQ).sub(Cz));
    }
    (CR.node.updateMatrixWorld(!0), VK());
  }
  function FN() {
    if (!kB || E7.x == null) return !1;
    let CR = kB.domElement.getBoundingClientRect();
    return E7.x >= CR.left && E7.x <= CR.right && E7.y >= CR.top && E7.y <= CR.bottom;
  }
  function FM(CR, CQ = {}) {
    if (E6 || !DB || DB.dragging || !w0 || !kB) return !1;
    let Cj = kB.domElement.getBoundingClientRect(),
      Cz = CQ.at?.[0] ?? E7.x ?? Cj.left + Cj.width / 2,
      Cp = CQ.at?.[1] ?? E7.y ?? Cj.top + Cj.height / 2;
    if (CR === 'rotate') {
      if (!Sv || !rO) return !1;
      let CO = { time: w0.action.time, paused: w1 };
      Fj();
      let Cf = rZ.bones.find((CU) => CU.b.name === rO) ?? rZ.bones[0];
      if (!Cf) return ((rJ = !1), (rZ = null), !1);
      Cf.b.getWorldPosition(ES).project(kv);
      let CJ = Cj.left + ((ES.x + 1) / 2) * Cj.width,
        CZ = Cj.top + ((1 - ES.y) / 2) * Cj.height;
      ((E6 = {
        kind: CR,
        x0: Cz,
        y0: Cp,
        x: Cz,
        y: Cp,
        px: CJ,
        py: CZ,
        theta: 0,
        last: Math.atan2(Cp - CZ, Cz - CJ),
        axis: null,
        local: !1,
        trackball: !!CQ.trackball,
        typed: '',
        was: CO,
        act: Cf,
        roll: CQ.roll ? Fv(CQ.roll, Cf.world0) : null,
        rePivot: !!CQ.at,
      }),
        (rZ.modal = E6));
    } else {
      if (CR === 'turn') {
        let CU = CQ.ik ? Dv?.node(CQ.ik) : null;
        if (!CU?.parent) return !1;
        (Dv.setDragging(CQ.ik), CU.getWorldPosition(ES).project(kv));
        let Cd = Cj.left + ((ES.x + 1) / 2) * Cj.width,
          CK = Cj.top + ((1 - ES.y) / 2) * Cj.height;
        E6 = {
          kind: CR,
          x0: Cz,
          y0: Cp,
          x: Cz,
          y: Cp,
          px: Cd,
          py: CK,
          theta: 0,
          last: Math.atan2(Cp - CK, Cz - Cd),
          axis: null,
          local: !1,
          trackball: !!CQ.trackball,
          typed: '',
          node: CU,
          ik: CQ.ik,
          q0: CU.quaternion.clone(),
          rePivot: !0,
        };
      } else {
        let CT = CQ.ik ? Dv?.node(CQ.ik) : DB.object;
        if (!CT || CT === ru || (!CQ.ik && !DB.enabled) || !CT.parent) return !1;
        let CA = CQ.ik ?? (Dv?.selected && Dv.node(Dv.selected) === CT ? Dv.selected : null);
        (CA && Dv.setDragging(CA),
          (E6 = {
            kind: CR,
            x0: Cz,
            y0: Cp,
            x: Cz,
            y: Cp,
            node: CT,
            ik: CA,
            start: CT.position.clone(),
            p0: CT.getWorldPosition(new kE()),
            axis: null,
            local: !1,
            typed: '',
            drawn: CQ.ik ? new kH() : null,
            seen: !1,
          }));
      }
    }
    return (
      window.addEventListener('pointermove', C2, !0),
      window.addEventListener('pointerdown', C3, !0),
      window.addEventListener('contextmenu', C4, !0),
      window.addEventListener('keydown', C5, !0),
      CQ.quiet ||
        ((C0 = document.createElement('div')),
        (C0.className = 'lib-modalhint'),
        Object.assign(C0.style, { left: Cj.left + 12 + 'px', top: Cj.top + 12 + 'px' }),
        document.body.appendChild(C0)),
      C1(),
      md(),
      !0
    );
  }
  let C0 = null;
  function C1() {
    let CR = E6;
    if (!CR || !C0) return;
    let CQ = FP(CR),
      Cj = CR.kind === 'rotate' && CR.act ? (DN ?? 'global') : 'global',
      Cz = CR.trackball
        ? ' (trackball)'
        : CR.axis
          ? ' along ' +
            (CR.kind === 'rotate' && CR.act ? m1[m0(CR)] : CR.local ? 'its own ' : 'global ') +
            CR.axis.toUpperCase()
          : '',
      Cp;
    if (CR.kind === 'rotate') {
      let CO = Fy(),
        Cf = (CR.theta * 180) / Math.PI;
      (CO && CQ == null && (Cf = Math.round(Cf / CO) * CO),
        (Cp =
          CQ != null
            ? CR.typed + '\u00B0'
            : CR.trackball
              ? (Math.hypot(CR.x - CR.x0, CR.y - CR.y0) * EV).toFixed(1) + '\u00B0'
              : Math.abs(Cf).toFixed(1) + '\u00B0' + (CO ? ' (snap ' + CO + '\u00B0)' : '')));
    } else
      Cp =
        CQ != null
          ? CR.typed + ' cm'
          : (CR.node.getWorldPosition(Ek).distanceTo(CR.p0) * 100).toFixed(1) + ' cm';
    C0.textContent =
      '' +
      (CR.kind === 'rotate' ? 'Rotate' : 'Move') +
      Cz +
      ': ' +
      Cp +
      ' \u2014 X Y Z ' +
      Cj +
      ' axis (again: ' +
      (Cj === 'global' ? 'local' : 'global') +
      ')' +
      (CR.kind === 'rotate' ? ' \u00B7 R again: trackball' : '') +
      ' \u00B7 type a number \u00B7 Enter or click keeps \u00B7 Esc or right-click cancels';
  }
  function C2(CR) {
    let CQ = E6;
    if (CQ) {
      if (((CQ.x = CR.clientX), (CQ.y = CR.clientY), CQ.kind !== 'move')) {
        let Cj = Math.atan2(CQ.y - CQ.py, CQ.x - CQ.px),
          Cz = Cj - CQ.last;
        (Cz > Math.PI ? (Cz -= 2 * Math.PI) : Cz < -Math.PI && (Cz += 2 * Math.PI),
          (CQ.theta += Cz),
          (CQ.last = Cj));
      }
      (Fh(), C1());
    }
  }
  function C3(CR) {
    E6 && (CR.preventDefault(), CR.stopImmediatePropagation(), C6(CR.button === 0));
  }
  function C4(CR) {
    (CR.preventDefault(), CR.stopImmediatePropagation());
  }
  function C5(CR) {
    let CQ = E6;
    if (!CQ) return;
    let Cj = CR.key;
    if (Cj === 'Control' || Cj === 'Shift' || Cj === 'Alt' || Cj === 'Meta') return;
    if ((CR.preventDefault(), CR.stopImmediatePropagation(), Cj === 'Escape')) {
      C6(!1);
      return;
    }
    if (Cj === 'Enter') {
      C6(!0);
      return;
    }
    let Cz = Cj.toLowerCase();
    if (Cz === 'x' || Cz === 'y' || Cz === 'z')
      ((CQ.trackball = !1),
        CQ.axis !== Cz
          ? ((CQ.axis = Cz), (CQ.local = !1))
          : CQ.local
            ? ((CQ.axis = null), (CQ.local = !1))
            : (CQ.local = !0));
    else {
      if (Cz === 'r' && CQ.kind === 'rotate')
        ((CQ.trackball = !CQ.trackball),
          (CQ.axis = null),
          (CQ.local = !1),
          (CQ.x0 = CQ.x),
          (CQ.y0 = CQ.y));
      else {
        if (/^[0-9.]$/.test(Cj)) CQ.typed += Cj;
        else {
          if (Cj === '-') CQ.typed = CQ.typed.startsWith('-') ? CQ.typed.slice(1) : '-' + CQ.typed;
          else {
            if (Cj === 'Backspace') CQ.typed = CQ.typed.slice(0, -1);
            else return;
          }
        }
      }
    }
    (Fh(), C1(), md());
  }
  function C6(CR) {
    let CQ = E6;
    if (CQ) {
      if (
        (window.removeEventListener('pointermove', C2, !0),
        window.removeEventListener('pointerdown', C3, !0),
        window.removeEventListener('contextmenu', C4, !0),
        window.removeEventListener('keydown', C5, !0),
        C0?.remove(),
        (C0 = null),
        (E6 = null),
        CQ.kind === 'rotate')
      ) {
        if (CR) Ff();
        else {
          for (let Cj of [...rZ.bones, ...rZ.partners]) Cj.b.quaternion.copy(Cj.local0);
          ((rJ = !1),
            (rZ = null),
            Math.abs(w0.action.time - CQ.was.time) > 1e-9 && S9(CQ.was.time),
            CQ.was.paused || S7(!1));
        }
      } else
        CQ.kind === 'turn'
          ? (CR ||
              (CQ.node.quaternion.copy(CQ.q0), CQ.node.updateMatrixWorld(!0), Dv.capture(CQ.ik)),
            Dv.setDragging(null))
          : (CR || (CQ.node.position.copy(CQ.start), CQ.node.updateMatrixWorld(!0)),
            VK(),
            CQ.ik &&
              (Dv.setDragging(null),
              CR &&
                (wa(CQ.ik) || (wQ && CQ.node.position.distanceToSquared(CQ.start) > 1e-12)) &&
                (wU(CQ.ik, Dv.delta(CQ.ik)), wH())));
      md();
    }
  }
  function C7() {
    return {
      id: w0?.id ?? null,
      duration: w0?.clip?.duration ?? 0,
      time: w0?.action?.time ?? 0,
      paused: w1,
      speed: w3,
      loop: mJ,
      finished: w2,
      inPlace: w4,
      mirrored: w5,
      reversed: w6,
      reverseOrigin: w7,
      lock: { ...mO },
      adjust: { ...w8 },
      props: { l: ww.l?.id ?? null, r: ww.r?.id ?? null },
      ik: DL(),
      pose: {
        mode: Sv,
        bone: rO,
        bones: [...rf],
        dataBone: rO ? (w5 ? rN(rO) : rO) : null,
        dataBones: rf.map((CR) => (w5 ? rN(CR) : CR)),
        space: mj.gizmoSpace,
        axes: DM(),
        fingers: rg,
        xMirror: rM,
        box: ED,
        autoKey: E0,
        pending: E2 ? { u: E2.u, bones: [...E2.bones.keys()] } : null,
        snap: E4 ? E3 : 0,
        modal: E6
          ? {
              kind: E6.kind,
              axis: E6.axis,
              local: E6.local,
              trackball: !!E6.trackball,
              typed: E6.typed,
            }
          : null,
        dragging: !!rJ,
      },
      rig: m3,
      character: mg,
      bodyScale: SX?.s ?? 1,
      fitted: !!SX,
      restPreview: SW,
      cam: DK(),
      rigs: Object.entries(m2?.rigs ?? {})
        .filter(([, CR]) => CR.file)
        .map(([CR, CQ]) => ({ id: CR, label: CQ.label ?? CR, clips: CQ.clips ?? 0 })),
      hands: { l: !!wk.l, r: !!wk.r },
      hasSocket: !!(wk.l || wk.r),
      skeleton: !!kN,
      wireframe: kM,
    };
  }
  let C8 = new kF(),
    C9 = !1,
    Ck = 0,
    Cw = 0,
    CV = 30;
  function CD(CR = CV, CQ = !1) {
    C9 && (CR > Ck && (Ck = CR), CQ || Cw++);
  }
  function Cm() {
    let CR = !!((w0 && !w1) || E6 || rJ || DB?.dragging || mQ.size);
    return (CR && Cw++, Ck > 0 ? (Ck--, !0) : CR || Vh.length > 0);
  }
  let CS = new Set([
      'getState',
      'getView',
      'getViewOrtho',
      'getScene',
      'getRenderer',
      'getRigRoot',
      'getStanding',
      'getRigDescription',
      'getClips',
      'getActivity',
      'withDrawnPose',
      'poseBase',
      'poseBones',
      'ikChain',
      'ikControlBone',
      'ikPoint',
      'isCached',
      'onTick',
      'onState',
      'onPose',
      'onDrawn',
      'takePicture',
      'invalidate',
      'setDrawOnDemand',
      'samplePaths',
      'parseGlb',
      'parseGltf',
      'getPoseRest',
      'getReferenceRig',
      'getCustom',
      'getPropTransform',
      'getPropPlacements',
      'getPropControls',
      'getRestFrames',
      'onionPicked',
    ]),
    CE = null;
  function CF(CR) {
    if (!!CR !== C9) {
      if (((C9 = !!CR), !C9 || !CE || CE.onDemandReady)) {
        CD();
        return;
      }
      CE.onDemandReady = !0;
      for (let [CQ, Cj] of Object.entries(CE))
        typeof Cj != 'function' ||
          CS.has(CQ) ||
          (CE[CQ] = (...Cz) => {
            CD();
            let Cp = Cj(...Cz);
            return (
              typeof Cp?.then == 'function' &&
                Cp.then(
                  () => CD(),
                  () => CD(),
                ),
              Cp
            );
          });
      for (let Cz of [
        'pointermove',
        'pointerdown',
        'pointerup',
        'wheel',
        'keydown',
        'keyup',
        'resize',
      ])
        window.addEventListener(Cz, (Cp) => CD(CV, Cz === 'pointermove' && !Cp.buttons), {
          capture: !0,
          passive: !0,
        });
      kG?.addEventListener('change', () => CD(CV, !0));
      for (let Cp of ['focus', 'visibilitychange', 'pageshow'])
        window.addEventListener(Cp, () => CD(CV, !0), !0);
      (kB?.domElement.addEventListener('webglcontextrestored', () => CD(CV, !0)), CD());
    }
  }
  function CC() {
    if (mZ) return;
    if (C9 && !Cm()) {
      C8.getDelta();
      return;
    }
    if ((kg?.update(C8.getDelta()), kg))
      for (let Cj of mQ) {
        if (w0 && Cj.action === w0.action) {
          mQ.delete(Cj);
          continue;
        }
        (Cj.action.getEffectiveWeight() === 0 || !Cj.action.isRunning()) &&
          (kg.uncacheClip(Cj.clip), mQ.delete(Cj));
      }
    (rH(), Fz(), FX(), Fd(), SY(), Dy?.(), VE());
    let CR = wJ();
    if ((Dv?.update(CR), DP?.run(CR), Dv?.snapshot(), E6?.drawn)) {
      let Cz = E6;
      (Cz.node.parent.updateWorldMatrix(!0, !1),
        Cz.drawn.copy(Cz.node.parent.matrixWorld),
        Cz.seen || ((Cz.seen = !0), Cz.p0.copy(Cz.start).applyMatrix4(Cz.drawn)));
    }
    if (E6?.rePivot) {
      let Cp = E6,
        CO = kB.domElement.getBoundingClientRect();
      ((Cp.rePivot = !1),
        (Cp.kind === 'rotate' ? Cp.act.b : Cp.node).getWorldPosition(ES).project(kv),
        (Cp.px = CO.left + ((ES.x + 1) / 2) * CO.width),
        (Cp.py = CO.top + ((1 - ES.y) / 2) * CO.height),
        (Cp.last = Math.atan2(Cp.y - Cp.py, Cp.x - Cp.px)));
    }
    (F9(),
      Dy?.(),
      VH(),
      DZ(),
      Df(),
      DY?.update(DP?.debugData()),
      SL?.drive(),
      EM(),
      F2(),
      !rT && rA && (rA.visible || DB.enabled) && rX(),
      kG.update());
    let CQ = SU();
    (kB.render(kY, kv), CQ?.(), VY(), Vg(), DF());
    for (let Cf of rb)
      try {
        Cf();
      } catch (CJ) {
        console.error(CJ);
      }
    if ((DP?.restore(), VR(), DU(), w0)) {
      let CZ = w0.action.time;
      for (let CU of kq) CU(CZ, w0.clip.duration);
    }
  }
  function CH() {
    ((mZ = !0),
      m8?.remove(),
      kB?.domElement?.removeEventListener('pointerdown', VT, !0),
      kB?.domElement?.removeEventListener('keydown', Vd),
      DB?.detach(),
      DB?.dispose(),
      Dv?.dispose(),
      DY?.dispose(),
      kB?.setAnimationLoop(null),
      kB?.dispose());
  }
  return (
    (CE = {
      invalidate: CD,
      setDrawOnDemand: CF,
      getActivity: () => Cw,
      init: mP,
      play: S3,
      playRaw: S4,
      updateRaw: S5,
      replay: S8,
      loadPropScene: Sm,
      parseGlb: SS,
      parseGltf: SE,
      setPaused: S7,
      seek: S9,
      setSpeed: Sk,
      setLoop: Sw,
      setInPlace: Sj,
      setLock: Sz,
      setMirrored: SC,
      setReversed: SH,
      setReverseOrigin: SR,
      setAdjust: SD,
      setCharacter: mh,
      setPoses: FK,
      setPoseMode: FQ,
      selectPoseBone: Fw,
      pickPoseChildren: FD,
      pickPoseOtherSide: Fm,
      setPoseFingers: FF,
      setPoseXMirror: FS,
      armPoseBox: FC,
      setPoseAutoKey: Fx,
      keyPendingPose: Fb,
      setPoseSnap: Fq,
      startPoseModal: FM,
      setOnion: r7,
      setOnionKeys: r8,
      setOnionPins: r9,
      setOnionGroups: rw,
      onionPicked: rV,
      setShading: SZ,
      samplePaths: rp,
      takePicture: DE,
      getScene: () => kY,
      ikControlBone: (CR) => wP(CR)?.name ?? null,
      setHandles: rL,
      pushPoseModal: FI,
      endPoseModal: (CR = !0) => C6(CR),
      onDrawn: (CR) => rb.push(CR),
      setStanding: D7,
      getStanding: D8,
      withDrawnPose: D9,
      ikChain: (CR) => DP?.chainBones(CR) ?? [],
      reachIk: wy,
      ikPoint: wW,
      getRigDescription: () => kb,
      getView: () => ({
        get camera() {
          return kv;
        },
        controls: kG,
      }),
      setViewOrtho: mx,
      getViewOrtho: () => mA,
      setInset: VG,
      getRenderer: () => kB,
      poseDragTargets: () => {
        if (!rJ || !rZ?.bones.length || !w0) return null;
        let { bones: CR, u: CQ } = FO();
        return { bones: CR, u: CQ };
      },
      takePoseTargets: FJ,
      tryPose: FU,
      setPoseAxes: FE,
      poseBones: () => [...rd.keys()],
      poseBase: Fp,
      getPoseRest: () => SK,
      posePartner: (CR) => rN(CR),
      overViewport: () => FN(),
      viewportRect: () => kB?.domElement.getBoundingClientRect() ?? null,
      setPoseEmptyClick: (CR) => {
        VA = !!CR;
      },
      onPose: (CR) => rU.push(CR),
      setProp: SF,
      setIkOptions: wL,
      setIkClock: wd,
      setIkAutoKey: wj,
      setIkDebug: DX,
      setIkGizmoMode: VW,
      setRig: mI,
      setBody: mN,
      setCamHelper: DT,
      setCamView: DA,
      setCamOptions: Dd,
      setCamFollow: Du,
      setStageFollow: DJ,
      toggleSkeleton: Sp,
      toggleWireframe: SO,
      getState: C7,
      dispose: CH,
      frameRig: my,
      getClips: () => (w0 ? { raw: w0.raw, shown: w0.clip } : null),
      bakeIk: (CR, { fps: CQ } = {}) =>
        zs(CR, { rigRoot: kI, ikStage: DP, effectors: Dv, THREE: k0, fps: CQ }),
      presentClip: (CR) => S2(CR),
      fitClip: (CR) => (SX ? SX.fit(CR) : CR),
      getReferenceRig: () => SA ?? kI,
      setRestPreview: Sq,
      getCustom: () => SL,
      setJointPicker: Eh,
      setMarkerEditor: Ep,
      updateMarkers: EZ,
      setFrontView: EA,
      addOverlay: EW,
      removeOverlay: Eq,
      setMeshPicker: Ed,
      setPointGizmo: Ex,
      markJoints: (CR) => {
        EP && ((EP.marks = CR), EN());
      },
      setOurFigure: F1,
      markOurJoints: (CR) => {
        F0 && ((F0.marks = CR), F3());
      },
      ikWillBake() {
        return DP ? (DP.active?.() ?? []).length > 0 || !!DP.pelvisActive?.() : !1;
      },
      setPropControl: Vz,
      selectProp: VU,
      setPropAxis: Vf,
      getPropTransform: VO,
      resetProps: Vj,
      resetPropTransform: VQ,
      getPropPlacements: VJ,
      setPropLeads: wB,
      setPropParent: V4,
      setIkGizmoSpace: VZ,
      getPropControls: () =>
        [...Dq.values()].map((CR) => ({
          name: CR.name,
          side: CR.side,
          on: CR.on,
          led: CR.led,
          selected: DB?.object === wG(CR),
        })),
      getRigRoot: () => kI,
      getRestFrames: () => w9,
      loadClip: (CR, CQ) => S0(CR, CQ),
      setGripReference(CR) {
        return ((mB = CR ?? null), mG());
      },
      addClip(CR, CQ) {
        return !CR || !CQ ? !1 : (ky.set(CR, CQ), !0);
      },
      onTick: (CR) => kq.push(CR),
      onState: (CR) => kP.push(CR),
      isCached: (CR) => ky.has(CR),
    }),
    CE
  );
}
function uf(kK, { kind: kT, hand: kA = Q } = {}) {
  let kn = kK?.turns ?? {};
  if (kT === 'hand') {
    let kX = {};
    for (let kL of l) {
      let kb = kn[kL + '_' + kA];
      kb?.length === 4 && (kX[kL] = kA === Q ? [...kb] : q(kb));
    }
    return Object.keys(kX).length ? { hand: kX } : null;
  }
  return kT !== 'body' || !Object.keys(kn).length
    ? null
    : {
        turns: Object.fromEntries(Object.entries(kn).map(([kx, ky]) => [kx, [...ky]])),
        places: kK.hips?.length === 3 ? { pelvis: [...kK.hips] } : {},
      };
}
function Hr(kK, kT) {
  return kK === 'hand'
    ? Object.entries(kT?.hand ?? {}).map(([kA, kn]) => ({
        name: kA + '_' + Q + '.quaternion',
        values: [...kn],
      }))
    : [
        ...Object.entries(kT?.turns ?? {}).map(([kA, kn]) => ({
          name: kA + '.quaternion',
          values: [...kn],
        })),
        ...Object.entries(kT?.places ?? {}).map(([kA, kn]) => ({
          name: kA + '.position',
          values: [...kn],
        })),
      ];
}
function ff(kK) {
  let kT = kK?.camera && kK.stand ? Hr('body', kK.stand) : Hr(kK?.kind, kK?.pose);
  return kT.length
    ? {
        duration: 1 / 30,
        tracks: kT.map((kA) => ({
          name: kA.name,
          times: [0, 1 / 30],
          values: [...kA.values, ...kA.values],
        })),
      }
    : null;
}
function df({ assetRoot: kK, manifest: kT }) {
  let kA = null;
  async function kn() {
    let [
        kX,
        { GLTFLoader: kL },
        { clone: kb },
        { createPreviewStage: kx, readLook: ky },
        { posePicture: kW, readHandView: kq, POSE_LOOK_FILE: kP },
      ] = await Promise.all([
        import('../dependencies/three.js'),
        import('../dependencies/gltf-loader.js'),
        import('../dependencies/skeleton-utils.js'),
        import('../api/previews.js'),
        import('./pose-pictures.js'),
      ]),
      kY = (kI) =>
        fetch(kI).then(
          (kh) => (kh.ok ? kh.json() : null),
          () => null,
        ),
      kv =
        Object.values(kT.rigs ?? {}).find((kI) => kI.default)?.file ??
        Object.values(kT.rigs ?? {})[0]?.file ??
        kT.rig?.file,
      [kB, kG, kg] = await Promise.all([
        new kL().loadAsync(kK + '/' + kv),
        kY(kK + '/preview-look.json'),
        kY(kK + '/' + kP),
      ]);
    return {
      THREE: kX,
      posePicture: kW,
      rig: kB.scene,
      stage: kx({ THREE: kX, clone: kb }),
      bodyLook: { ...ky(kG), inPlace: !1 },
      handView: kq(kg?.hand),
    };
  }
  return {
    async pictureOf(kX, kL) {
      try {
        let kb = await (kA ??= kn()),
          { THREE: kx } = kb,
          ky = Hr(kX, kL).map(
            (kW) =>
              new (kW.name.endsWith('.position')
                ? kx['VectorKeyfra' + 'meTrack']
                : kx['QuaternionKe' + 'yframeTrack'])(
                kW.name,
                [0, 1 / 30],
                [...kW.values, ...kW.values],
              ),
          );
        return ky.length
          ? await kb.posePicture({
              stage: kb.stage,
              THREE: kx,
              rig: kb.rig,
              kind: kX,
              clip: new kx['AnimationCli' + 'p']('kept', 1 / 30, ky),
              bodyLook: kb.bodyLook,
              handView: kb.handView,
            })
          : null;
      } catch (kW) {
        return (console.warn('[poses] its picture could not be made:', kW), (kA = null), null);
      }
    },
  };
}
var qr = (kK, kT = {}, ...kA) => {
    let kn = Object.assign(document.createElement(kK), kT);
    return (kn.append(...kA), kn);
  },
  vu = 'http://www.w3.org/2000/svg',
  Hs = (kK) => +Number(kK).toFixed(4),
  Lr = (kK, kT) => +Number(kK).toFixed(kT),
  ko = { fov: 42, near: 0.01, far: 200 },
  qs = (kK) => (kK.roll ? E(kK.position, kK.target, kK.roll) : [0, 1, 0]),
  xu = (kK) => D(kK.lens, kK.resX / kK.resY, kK.sensor);
function Mu(kK) {
  let kT = V(kK.resX, kK.resY);
  return (
    (kT === 'custom' ? kK.resX + ' \u00D7 ' + kK.resY : kT) +
    ' \u00B7 ' +
    (kK.type === 'ortho' ? 'ortho ' + Lr(kK.orthoScale, 2) + ' m' : Lr(kK.lens, 1) + ' mm') +
    (kK.roll ? ' \u00B7 rolled ' + Lr(kK.roll, 1) + '\u00B0' : '')
  );
}
function hf({
  player: kK,
  stage: kT,
  margin: kA = 0.05,
  locked: kn = () => !1,
  onLeft: kX = () => {},
  onMoved: kL = null,
}) {
  let kb = null,
    kx = null,
    ky = !1,
    kW = { dim: 0.6, guides: '' },
    kq = () => kK.getView(),
    kP = () => kb.resX / kb.resY,
    kY = () => kb.type === 'ortho',
    kv = document.createElementNS(vu, 'svg');
  (kv.setAttribute('viewBox', '0 0 100 100'),
    kv.setAttribute('preserveAspectRatio', 'none'),
    kv.setAttribute('aria-hidden', 'true'));
  let kB = qr('span'),
    kG = qr('i', {}, kv, kB),
    kg = qr('div', { className: 'lib-shotframe', hidden: !0 }, kG);
  kT.prepend(kg);
  function kI(w2 = null) {
    (w2 && (kW = { ...kW, ...w2 }),
      kv.innerHTML !== kW.guides && (kv.innerHTML = kW.guides),
      kb &&
        ((kB.textContent = Mu(kb)),
        (kG.style.boxShadow =
          '0 0 0 4000px rgba(0,0,0,' + Math.max(0, Math.min(1, kW.dim)).toFixed(2) + ')')));
  }
  function kh() {
    let w2 = kT.clientWidth,
      w3 = kT.clientHeight,
      w4 = S(w2, w3, kP(), kA);
    ky = !0;
    try {
      kK.setViewOrtho(kY() ? (m(kb.orthoScale, kP()) * w3) / w4.h : null);
      let w5 = kq();
      (w5.camera.position.fromArray(kb.position),
        w5.controls.target.fromArray(kb.target),
        w5.camera.up.fromArray(qs(kb)),
        kY() ? (w5.camera.zoom = 1) : (w5.camera.fov = r(xu(kb), w3, w4.h)),
        (w5.camera.near = kb.clipStart),
        (w5.camera.far = kb.clipEnd));
      let w6 = F(kb, w4.w, w4.h);
      (w6.x || w6.y
        ? w5.camera.setViewOffset(w2, w3, w6.x, w6.y, w2, w3)
        : w5.camera.clearViewOffset(),
        w5.camera.updateProjectionMatrix(),
        w5.controls.update());
    } finally {
      ky = !1;
    }
    (Object.assign(kG.style, {
      left: w4.x + 'px',
      top: w4.y + 'px',
      width: w4.w + 'px',
      height: w4.h + 'px',
    }),
      (kg.hidden = !1),
      kI(),
      kK.invalidate?.());
  }
  function kN(w2, w3 = null) {
    if ((w1(), !kb)) {
      let w4 = kq();
      kx = {
        position: w4.camera.position.toArray(),
        target: w4.controls.target.toArray(),
        fov: w4.camera.isPerspectiveCamera ? w4.camera.fov : ko.fov,
        tall: kK.getViewOrtho?.() ?? null,
        zoom: w4.camera.zoom,
        near: w4.camera.near,
        far: w4.camera.far,
      };
    }
    ((kb = w2), w3 && (kW = { ...kW, ...w3 }), kh());
  }
  function ki(w2 = !0) {
    if (kb) {
      ky = !0;
      try {
        kK.setViewOrtho(kx?.tall ?? null);
        let w3 = kq();
        (w2 &&
          kx &&
          (w3.camera.position.fromArray(kx.position), w3.controls.target.fromArray(kx.target)),
          w3.camera.isPerspectiveCamera
            ? (w3.camera.fov = kx?.fov ?? ko.fov)
            : (w3.camera.zoom = kx?.zoom ?? 1),
          w3.camera.up.set(0, 1, 0),
          (w3.camera.near = kx?.near ?? ko.near),
          (w3.camera.far = kx?.far ?? ko.far),
          w3.camera.clearViewOffset(),
          w3.camera.updateProjectionMatrix(),
          w3.controls.update());
      } finally {
        ky = !1;
      }
      ((kg.hidden = !0), (kb = null), (kx = null), kK.invalidate?.());
    }
  }
  let kM = !1,
    w0 = !1;
  function w1() {
    let w2 = kq()?.controls;
    kM ||
      !w2?.addEventListener ||
      ((kM = !0),
      w2.addEventListener('start', () => {
        w0 = !0;
      }),
      w2.addEventListener('end', () => {
        w0 = !1;
      }),
      w2.addEventListener('change', () => {
        if (ky || !kb) return;
        if (!kn() || !kL) {
          w0 && (ki(!1), kX());
          return;
        }
        let w3 = kq(),
          w4 = {
            position: w3.camera.position.toArray().map(Hs),
            target: w3.controls.target.toArray().map(Hs),
          },
          w5 = kY() && w3.camera.zoom !== 1;
        (w5 && (w4.orthoScale = kb.orthoScale / w3.camera.zoom),
          (kb = kL(w4) ?? kb),
          w5 ? kh() : kb.roll && w3.camera.up.fromArray(qs(kb)));
      }));
  }
  return (
    new ResizeObserver(() => {
      kb && kh();
    }).observe(kT),
    {
      get on() {
        return !!kb;
      },
      look: kN,
      dress: kI,
      leave: ki,
      hear: w1,
    }
  );
}
export {
  Bu as a,
  Fu as b,
  fu as c,
  Fr as d,
  Cu as e,
  Tu as f,
  af as g,
  qs as h,
  xu as i,
  hf as j,
  uf as k,
  ff as l,
  df as m,
};
