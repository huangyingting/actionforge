import { containModalFocus } from './ui/modal';
import {
  a as V,
  b as D,
  c as m,
  e as S,
  f as r,
  g as E,
  h as F,
  i as C,
} from './export/character.js';
import {
  a as s,
  b as H,
  c as a,
  d as R,
  e as Q,
  f as c,
  g as j,
  h as z,
  i as p,
  j as O,
  k as f,
  l as J,
  q as Z,
  r as U,
  s as u,
  t as d,
} from './export/pipeline.js';
import { a as K, b as T, c as A } from './storage/characters.js';
import { a as X } from './ui/support.js';
import {
  a as L,
  b,
  c as x,
  d as y,
  e as W,
  f as q,
  g as P,
  h as Y,
  i as v,
  j as B,
  k as G,
  m as g,
} from './viewport/player.js';
import { d as I, e as h } from './storage/poses.js';
import {
  A as N,
  B as M,
  C as k0,
  E as k1,
  F as k2,
  J as k3,
  K as k4,
  L as k5,
  M as k6,
  O as k7,
  P as k8,
  Q as k9,
  R as kk,
  S as kw,
  T as kV,
  V as kD,
  e as km,
  f as kS,
  h as kE,
  i as kF,
  j as kC,
  k as kt,
  l as kH,
  n as ke,
  o as kR,
  p as kQ,
  q as kj,
  r as kz,
  s as kO,
  t as kJ,
  u as kZ,
  y as kU,
  z as kK,
} from './animation/engine.js';
import { a as kT, b as kA, e as kn, f as ko, g as kX, h as kL } from './animation/poses.js';
import {
  C as kb,
  D as kx,
  G as ky,
  I as kW,
  J as kq,
  a as kP,
  b as kY,
  d as kv,
  m as kB,
  n as kG,
  s as kg,
  t as kI,
  z as kN,
} from './rigging/retargeting.js';
import { c as kM, d as w0, e as w1, f as w2, g as w3 } from './animation/channels.js';
import {
  $ as w4,
  A as w5,
  B as w6,
  Ba as w7,
  C as w8,
  Ca as w9,
  D as wk,
  Da as ww,
  Ea as wV,
  Fa as wD,
  G as wm,
  Ga as wS,
  H as wE,
  Ha as wF,
  I as wC,
  Ia as wt,
  J as wH,
  Ja as we,
  K as wR,
  Ka as wQ,
  L as wj,
  La as wz,
  M as wO,
  Ma as wf,
  N as wJ,
  Na as wZ,
  O as wU,
  Oa as wK,
  P as wT,
  Pa as wA,
  Q as wn,
  Qa as wX,
  R as wL,
  Ra as wb,
  S as wx,
  Sa as wy,
  T as wW,
  U as wq,
  V as wP,
  W as wY,
  X as wv,
  Y as wB,
  Z as wG,
  _ as wg,
  a as wI,
  b as wN,
  c as wM,
  ca as V0,
  d as V1,
  da as V2,
  ea as V3,
  f as V4,
  fa as V5,
  g as V6,
  h as V7,
  ja as V8,
  k as V9,
  ka as Vk,
  l as Vw,
  la as VV,
  m as VD,
  ma as Vm,
  n as VS,
  o as VE,
  oa as VF,
  p as VC,
  pa as Vt,
  qa as VH,
  r as Ve,
  ra as VR,
  s as VQ,
  sa as Vj,
  t as Vz,
  ta as VO,
  ua as VJ,
  v as VZ,
  va as VU,
  w as VK,
  wa as VT,
  x as VA,
  xa as Vn,
  y as VX,
  ya as VL,
  z as Vb,
  za as Vx,
} from './animation/math.js';
import {
  a as Vy,
  b as VW,
  c as Vq,
  e as VP,
  g as VY,
  h as Vv,
  j as VB,
  m as VG,
} from './storage/library.js';
import './storage/database.js';
import { a as Vg } from './dependencies/gltf-loader-compat.js';
import { c as VI } from './dependencies/skeleton-utils-compat.js';
import './dependencies/gltf-exporter-compat.js';
import {
  Bf as Vh,
  Jg as VN,
  Vd as VM,
  bd as D0,
  ef as D1,
  zd as D2,
} from './dependencies/three-compat.js';
import './interop/exports.js';
function bc(D3) {
  let D4 = D3 instanceof Uint8Array ? D3 : new Uint8Array(D3),
    D5 = new DataView(D4.buffer, D4.byteOffset, D4.byteLength);
  if (D4.length < 20 || D5.getUint32(0, !0) !== 1179937895 || D5.getUint32(16, !0) !== 1313821514)
    throw new Error('that is not a .glb');
  let D6 = D5.getUint32(12, !0),
    D7 = JSON.parse(new TextDecoder().decode(D4.subarray(20, 20 + D6))),
    D8 = 20 + D6,
    D9 = new Uint8Array(0);
  for (; D8 + 8 <= D4.length;) {
    let Dk = D5.getUint32(D8, !0);
    if (D5.getUint32(D8 + 4, !0) === 5130562) {
      D9 = D4.subarray(D8 + 8, D8 + 8 + Dk);
      break;
    }
    D8 += 8 + Dk;
  }
  return { json: D7, bin: D9 };
}
function wc(D3, D4) {
  let D5 = (Dw, DV = 4) => (DV - (Dw % DV)) % DV,
    D6 = new TextEncoder().encode(JSON.stringify(D3)),
    D7 = D6.length + D5(D6.length),
    D8 = D4.length + D5(D4.length),
    D9 = new Uint8Array(20 + D7 + (D4.length ? 8 + D8 : 0)),
    Dk = new DataView(D9.buffer);
  return (
    Dk.setUint32(0, 1179937895, !0),
    Dk.setUint32(4, 2, !0),
    Dk.setUint32(8, D9.length, !0),
    Dk.setUint32(12, D7, !0),
    Dk.setUint32(16, 1313821514, !0),
    D9.set(D6, 20),
    D9.fill(32, 20 + D6.length, 20 + D7),
    D4.length &&
      (Dk.setUint32(20 + D7, D8, !0), Dk.setUint32(24 + D7, 5130562, !0), D9.set(D4, 28 + D7)),
    D9
  );
}
function yc(D3, D4) {
  return (
    D4 &&
      (D3.asset = {
        ...D3.asset,
        ...(D4.copyright ? { copyright: D4.copyright } : {}),
        ...(D4.extras ? { extras: { ...(D3.asset?.extras ?? {}), ...D4.extras } } : {}),
      }),
    D3
  );
}
var kc = (D3) =>
  !(
    (D3.buffers ?? []).length !== 1 ||
    D3.buffers[0].uri ||
    (D3.bufferViews ?? []).some((D4) => D4.extensions) ||
    (D3.extensionsRequired ?? []).some((D4) => /meshopt|draco/i.test(D4))
  );
function vc(D3, D4) {
  if (!kc(D3)) return D4;
  let D5 = new Set(),
    D6 = new Set(),
    D7 = (DE) => {
      Number.isInteger(DE) && D5.add(DE);
    };
  for (let DE of D3.meshes ?? [])
    for (let DF of DE.primitives ?? []) {
      (Object.values(DF.attributes ?? {}).forEach(D7), D7(DF.indices));
      for (let DC of DF.targets ?? []) Object.values(DC).forEach(D7);
    }
  for (let Dt of D3.skins ?? []) D7(Dt.inverseBindMatrices);
  for (let DH of D3.animations ?? [])
    for (let De of DH.samplers ?? []) (D7(De.input), D7(De.output));
  for (let DR of D5) {
    let DQ = D3.accessors[DR];
    (Number.isInteger(DQ?.bufferView) && D6.add(DQ.bufferView),
      Number.isInteger(DQ?.sparse?.indices?.bufferView) && D6.add(DQ.sparse.indices.bufferView),
      Number.isInteger(DQ?.sparse?.values?.bufferView) && D6.add(DQ.sparse.values.bufferView));
  }
  for (let Dj of D3.images ?? []) Number.isInteger(Dj.bufferView) && D6.add(Dj.bufferView);
  let D8 = new Map(),
    D9 = [],
    Dk = [],
    Dw = 0;
  (D3.bufferViews ?? []).forEach((Dz, DO) => {
    if (!D6.has(DO)) return;
    Dw += (4 - (Dw % 4)) % 4;
    let DJ = Dz.byteOffset ?? 0;
    (Dk.push([Dw, D4.subarray(DJ, DJ + Dz.byteLength)]),
      D8.set(DO, D9.length),
      D9.push({ ...Dz, buffer: 0, byteOffset: Dw }),
      (Dw += Dz.byteLength));
  });
  let DV = new Uint8Array(Dw);
  for (let [Dz, DO] of Dk) DV.set(DO, Dz);
  let DD = new Map(),
    Dm = [];
  (D3.accessors ?? []).forEach((DJ, DZ) => {
    if (!D5.has(DZ)) return;
    let DU = { ...DJ };
    (Number.isInteger(DJ.bufferView) && (DU.bufferView = D8.get(DJ.bufferView)),
      DJ.sparse &&
        (DU.sparse = {
          ...DJ.sparse,
          indices: { ...DJ.sparse.indices, bufferView: D8.get(DJ.sparse.indices.bufferView) },
          values: { ...DJ.sparse.values, bufferView: D8.get(DJ.sparse.values.bufferView) },
        }),
      DD.set(DZ, Dm.length),
      Dm.push(DU));
  });
  let DS = (DJ) => (Number.isInteger(DJ) ? DD.get(DJ) : DJ);
  for (let DJ of D3.meshes ?? [])
    for (let DZ of DJ.primitives ?? []) {
      for (let DU of Object.keys(DZ.attributes ?? {})) DZ.attributes[DU] = DS(DZ.attributes[DU]);
      Number.isInteger(DZ.indices) && (DZ.indices = DS(DZ.indices));
      for (let DK of DZ.targets ?? []) for (let DT of Object.keys(DK)) DK[DT] = DS(DK[DT]);
    }
  for (let DA of D3.skins ?? [])
    Number.isInteger(DA.inverseBindMatrices) &&
      (DA.inverseBindMatrices = DS(DA.inverseBindMatrices));
  for (let Dn of D3.animations ?? [])
    for (let DX of Dn.samplers ?? []) ((DX.input = DS(DX.input)), (DX.output = DS(DX.output)));
  for (let DL of D3.images ?? [])
    Number.isInteger(DL.bufferView) && (DL.bufferView = D8.get(DL.bufferView));
  return (
    (D3.accessors = Dm),
    (D3.bufferViews = D9),
    (D3.buffers = [{ byteLength: DV.length }]),
    DV
  );
}
function _c(D3, D4, D5 = null) {
  let { json: D6, bin: D7 } = bc(D3),
    D8 = JSON.parse(JSON.stringify(D6)),
    D9 = [
      ...new Set(
        D4.map((Dk) => (D8.animations ?? []).find((Dw) => Dw.name === Dk)).filter(Boolean),
      ),
    ];
  if (!D9.length) throw new Error('none of those animations is in the file');
  return ((D8.animations = D9), yc(D8, D5), wc(D8, vc(D8, D7)));
}
var yf = (D3) =>
    String(D3 ?? '')
      .replace(/\s/g, '_')
      .replace(/[[\].:/]/g, ''),
  kf = { position: 'translation', quaternion: 'rotation', scale: 'scale' },
  vf = 2300;
function xc(D3, D4, D5 = null) {
  let { json: D6, bin: D7 } = bc(D3),
    D8 = JSON.parse(JSON.stringify(D6));
  if (!kc(D8))
    throw new Error(
      'this file\u2019s data is not in one piece inside it: nothing can be written into it',
    );
  (delete D8.animations, yc(D8, D5));
  let D9 = vc(D8, D7),
    Dk = new Map();
  ((D8.nodes ?? []).forEach((DF, DC) => {
    let Dt = yf(DF.name);
    Dt && !Dk.has(Dt) && Dk.set(Dt, DC);
  }),
    (D8.accessors ??= []),
    (D8.bufferViews ??= []));
  let Dw = [],
    DV = D9.length,
    DD = (DF, DC, Dt = {}) => {
      DV += (4 - (DV % 4)) % 4;
      let DH = new Uint8Array(DF.buffer, DF.byteOffset, DF.byteLength);
      return (
        Dw.push([DV, DH]),
        D8.bufferViews.push({ buffer: 0, byteOffset: DV, byteLength: DH.length }),
        (DV += DH.length),
        D8.accessors.push({
          bufferView: D8.bufferViews.length - 1,
          componentType: 5126,
          count: DF.length / (DC === 'VEC4' ? 4 : DC === 'VEC3' ? 3 : 1),
          type: DC,
          ...Dt,
        }),
        D8.accessors.length - 1
      );
    },
    Dm = (DF, DC) => DF.length === DC.length && DF.every((Dt, DH) => Dt === DC[DH]),
    DS = [];
  for (let DF of D4 ?? []) {
    let DC = [],
      Dt = [],
      DH = [];
    for (let De of DF?.tracks ?? []) {
      let DR = String(De.name).lastIndexOf('.'),
        DQ = Dk.get(De.name.slice(0, DR)),
        Dj = kf[De.name.slice(DR + 1)];
      if (DQ === void 0 || !Dj) continue;
      let Dz = Float32Array.from(De.times),
        DO = Dj === 'rotation' ? 4 : 3;
      if (!Dz.length || De.values.length !== Dz.length * DO) continue;
      let DJ = DH.find(([DU]) => Dm(DU, Dz))?.[1];
      DJ === void 0 &&
        ((DJ = DD(Dz, 'SCALAR', { min: [Dz[0]], max: [Dz[Dz.length - 1]] })), DH.push([Dz, DJ]));
      let DZ = DD(Float32Array.from(De.values), DO === 4 ? 'VEC4' : 'VEC3');
      (DC.push({
        input: DJ,
        output: DZ,
        interpolation: De.getInterpolation?.() === vf ? 'STEP' : 'LINEAR',
      }),
        Dt.push({ sampler: DC.length - 1, target: { node: DQ, path: Dj } }));
    }
    Dt.length &&
      DS.push({
        name: String(DF.name || 'Animation ' + (DS.length + 1)),
        samplers: DC,
        channels: Dt,
      });
  }
  if (!DS.length) throw new Error('none of those animations moves a bone of the file');
  D8.animations = DS;
  let DE = new Uint8Array(DV);
  DE.set(D9, 0);
  for (let [DU, DK] of Dw) DE.set(DK, DU);
  return ((D8.buffers = [{ byteLength: DE.length }]), wc(D8, DE));
}
var Mc = {
    root: (D3) => D3 === 'root' || D3 === 'pelvis',
    chest: (D3) => /^spine_/.test(D3),
    head: (D3) => D3 === 'Head' || /^neck_/.test(D3),
    arms: (D3) => /^(clavicle|upperarm|lowerarm|hand)_[lr]$/.test(D3),
    hands: (D3) => /^(index|middle|pinky|ring|thumb)_/.test(D3),
    legs: (D3) => /^(thigh|calf|foot|ball)_/.test(D3),
  },
  _f = ['head', 'arms', 'hands', 'chest', 'legs'],
  xf = {
    'Upper body': ['head', 'arms', 'hands', 'chest'],
    'Lower body': ['legs'],
    'Head only': ['head'],
    'Arms only': ['arms', 'hands'],
  },
  Mf = { root: 'Root', chest: 'Chest', head: 'Head', arms: 'Arms', hands: 'Hands', legs: 'Legs' };
function Cf(D3) {
  for (let D4 of Object.keys(Mc)) if (Mc[D4](D3)) return D4;
  return null;
}
var os = Object.freeze({
    keys: _f,
    labels: Mf,
    presets: xf,
    first: 'Upper body',
    regionOf: Cf,
    other: 'legs',
    root: 'root',
    travel: 'legs',
    mixAs: (D3) => $f(D3),
    partner: null,
  }),
  Br = new WeakMap();
function Oc(D3) {
  let D4 = D3?.regions;
  if (!D4) return os;
  if (!Br.has(D3)) {
    let D5 = D4.keys.filter((D6) => D4.bones[D6]);
    Br.set(
      D3,
      Object.freeze({
        keys: D4.keys,
        labels: D4.labels,
        presets: D4.presets,
        first: D4.first,
        regionOf: (D6) => D5.find((D7) => D4.bones[D7].test(D6)) ?? null,
        other: D4.other,
        root: null,
        travel: null,
        mixAs: (D6) => D6,
        partner: kS(D3),
      }),
    );
  }
  return Br.get(D3);
}
function Sf(D3) {
  let D4 = D3.lastIndexOf('.');
  return D4 < 0 ? [D3, ''] : [D3.slice(0, D4), D3.slice(D4 + 1)];
}
function $f(D3) {
  return D3 === 'root' ? 'legs' : D3;
}
function Cc(D3, D4) {
  let D5 = D3.weight ?? 1,
    D6 = D3.regions;
  return D6
    ? Array.isArray(D6)
      ? D6.includes(D4)
        ? D5
        : 0
      : Object.prototype.hasOwnProperty.call(D6, D4)
        ? D5 * (D6[D4] ?? 1)
        : 0
    : 0;
}
function Sc(D3, D4, D5, D6) {
  let D7 = D5[0],
    D8 = D5[1],
    D9 = D5[2],
    Dk = D5[3],
    Dw = D4[0] * D7 + D4[1] * D8 + D4[2] * D9 + D4[3] * Dk;
  if ((Dw < 0 && ((D7 = -D7), (D8 = -D8), (D9 = -D9), (Dk = -Dk), (Dw = -Dw)), Dw > 0.9995)) {
    ((D3[0] = D4[0] + (D7 - D4[0]) * D6),
      (D3[1] = D4[1] + (D8 - D4[1]) * D6),
      (D3[2] = D4[2] + (D9 - D4[2]) * D6),
      (D3[3] = D4[3] + (Dk - D4[3]) * D6));
    let DE = Math.hypot(D3[0], D3[1], D3[2], D3[3]) || 1;
    return ((D3[0] /= DE), (D3[1] /= DE), (D3[2] /= DE), (D3[3] /= DE), D3);
  }
  let DV = Math.acos(Dw),
    DD = Math.sin(DV),
    Dm = Math.sin((1 - D6) * DV) / DD,
    DS = Math.sin(D6 * DV) / DD;
  return (
    (D3[0] = D4[0] * Dm + D7 * DS),
    (D3[1] = D4[1] * Dm + D8 * DS),
    (D3[2] = D4[2] * Dm + D9 * DS),
    (D3[3] = D4[3] * Dm + Dk * DS),
    D3
  );
}
function Gs(D3, D4) {
  return [
    D3[3] * D4[0] + D3[0] * D4[3] + D3[1] * D4[2] - D3[2] * D4[1],
    D3[3] * D4[1] - D3[0] * D4[2] + D3[1] * D4[3] + D3[2] * D4[0],
    D3[3] * D4[2] + D3[0] * D4[1] - D3[1] * D4[0] + D3[2] * D4[3],
    D3[3] * D4[3] - D3[0] * D4[0] - D3[1] * D4[1] - D3[2] * D4[2],
  ];
}
var Ic = (D3) => [-D3[0], -D3[1], -D3[2], D3[3]];
function jr(D3, D4) {
  let D5 = Gs(Gs(D3, [D4[0], D4[1], D4[2], 0]), Ic(D3));
  return [D5[0], D5[1], D5[2]];
}
function Af(D3) {
  let D4 = Math.hypot(D3[1], D3[3]);
  return D4 > 1e-9 ? [0, D3[1] / D4, 0, D3[3] / D4] : [0, 0, 0, 1];
}
function $c(D3, D4, D5, D6, D7) {
  for (let D8 = 0; D8 < D7; D8++) D3[D8] = D4[D8] + (D5[D8] - D4[D8]) * D6;
  return D3;
}
function Ys(D3, D4) {
  let D5 = Math.max(0, Number(D3?.start) || 0),
    D6 = D3?.end,
    D7 = D6 == null ? D4 : Math.max(D5, Number(D6)),
    D8 = Math.max(0, Number(D3?.clipIn) || 0),
    D9 = Math.max(0, Number(D3?.fadeIn) || 0),
    Dk = Math.max(0, Number(D3?.fadeOut) || 0),
    Dw = D3?.speed > 0 ? Number(D3.speed) : 1;
  return { start: D5, end: D7, clipIn: D8, fadeIn: D9, fadeOut: Dk, speed: Dw };
}
function Hs(D3) {
  let D4 = D3.map((D6) => ({
      fadeIn: D6.fadeIn || 0,
      fadeOut: D6.fadeOut || 0,
      xIn: 0,
      xOut: 0,
      from: -1,
    })),
    D5 = new Map();
  D3.forEach((D6, D7) => {
    let D8 = D6.track ?? D7;
    (D5.has(D8) || D5.set(D8, []), D5.get(D8).push(D7));
  });
  for (let D6 of D5.values()) {
    let D7 = [...D6].sort((D8, D9) => D3[D8].start - D3[D9].start || D8 - D9);
    for (let D8 = 1; D8 < D7.length; D8++) {
      let D9 = D7[D8],
        Dk = D7[0];
      for (let Dm = 1; Dm < D8; Dm++) D3[D7[Dm]].end > D3[Dk].end && (Dk = D7[Dm]);
      let Dw = D3[D9],
        DV = D3[Dk],
        DD = DV.end - Dw.start;
      DD > 0.000001 &&
        DV.end < Dw.end - 0.000001 &&
        ((D4[D9].fadeIn = DD),
        (D4[D9].xIn = DD),
        (D4[D9].from = Dk),
        (D4[Dk].fadeOut = 0),
        (D4[Dk].xOut = Math.max(D4[Dk].xOut, DD)));
    }
  }
  return D4;
}
function Tc(D3, D4) {
  let D5 = Hs(D3.map((D6, D7) => ({ track: D6.track ?? D7, ...Ys(D6, D4) })));
  return D3.map((D6, D7) =>
    D5[D7].xIn > 0 || D5[D7].xOut > 0
      ? {
          ...D6,
          fadeIn: D5[D7].fadeIn,
          fadeOut: D5[D7].fadeOut,
          xfadeIn: D5[D7].xIn,
          xfadeOut: D5[D7].xOut,
        }
      : D6,
  );
}
var Rr = (D3, D4) => ((D3 % D4) + D4) % D4;
function Pi(D3, D4, D5) {
  return (D3 || [])
    .filter(([D6, D7]) => !(D6 === 0 && D7 === D4 - 1) && (D5 || D6 > 0))
    .map(([D6]) => D6);
}
function Ac(D3) {
  let D4 = D3.feet;
  if (D3.reverse && D3.frames > 0) {
    let D5 = (D6) =>
      (D6 || []).map(([D7, D8]) => [D3.frames - 1 - D8, D3.frames - 1 - D7]).reverse();
    D4 = { l: D5(D4.l), r: D5(D4.r) };
  }
  return D3.mirror ? { l: D4.r, r: D4.l } : D4;
}
function Ec(D3, D4) {
  if (D3.loops) return D3.frames - 1;
  let D5 = [...Pi(D4.l, D3.frames, !1), ...Pi(D4.r, D3.frames, !1)].sort((D7, D8) => D7 - D8),
    D6 = D5.slice(1)
      .map((D7, D8) => D7 - D5[D8])
      .filter((D7) => D7 > 0)
      .sort((D7, D8) => D7 - D8);
  return D6.length ? 2 * D6[D6.length >> 1] : D3.frames - 1;
}
function Pc({ out: D3, into: D4, at: D5, fps: D6 = 30 }) {
  if (!D3?.feet) return { reason: (D3?.name ?? 'The strip before') + " doesn't step" };
  if (!D4?.feet) return { reason: (D4?.name ?? 'This strip') + " doesn't step" };
  let D7 = Ac(D3),
    D8 = Ac(D4),
    D9 = Ec(D3, D7),
    Dk = Ec(D4, D8);
  if (!(D9 > 0) || !(Dk > 0)) return { reason: 'No stride to measure' };
  let Dw = ((D3.clipIn || 0) + (D5 - (D3.start || 0)) * (D3.speed || 1)) * D6;
  Dw = D3.loops ? Rr(Dw, D3.frames - 1) : Math.min(D3.frames - 1, Math.max(0, Dw));
  let DV = (D5 - (D4.start || 0)) * (D4.speed || 1) * D6,
    DD = null;
  for (let Dm of ['l', 'r']) {
    let DS = null;
    for (let Dt of Pi(D7[Dm], D3.frames, D3.loops)) {
      let DH = D3.loops ? Rr(Dw - Dt, D3.frames - 1) : Dw - Dt;
      DH >= 0 && (DS === null || DH < DS) && (DS = DH);
    }
    if (DS === null) continue;
    let DE = (DS / D9) * Dk,
      DF = Pi(D8[Dm], D4.frames, D4.loops);
    if (!DF.length) continue;
    let DC = null;
    if (D4.loops) DC = Rr(DF[0] + DE - DV, D4.frames - 1);
    else
      for (let De of DF) {
        let DR = De + DE - DV;
        if (DR >= 0 && DR < D4.frames - 1) {
          DC = DR;
          break;
        }
      }
    DC !== null && (!DD || DS < DD.age) && (DD = { foot: Dm, age: DS, f: DC });
  }
  return DD ? { clipIn: DD.f / D6, foot: DD.foot } : { reason: 'No step in either clip lines up' };
}
function zr(
  D3,
  D4,
  { fps: D5 = 30, clipDuration: D6 = 0, loops: D7 = !0, timelineEnd: D8 = 1 / 0 } = {},
) {
  let D9 = Math.round(D4 * D5) / D5,
    Dk = D3.start ?? 0,
    Dw = D3.end ?? D8;
  if (!(D9 > Dk + 0.5 / D5) || !(D9 < Dw - 0.5 / D5)) return null;
  let DV = D3.speed > 0 ? D3.speed : 1,
    DD = (D3.clipIn ?? 0) + (D9 - Dk) * DV;
  D6 > 0 && (DD = D7 ? DD % D6 : Math.min(DD, D6));
  let Dm = { ...D3, end: D9 };
  delete Dm.fadeOut;
  let DS = { ...D3, start: D9 };
  return (
    D3.end == null && delete DS.end,
    DD > 1e-9 ? (DS.clipIn = +DD.toFixed(6)) : delete DS.clipIn,
    delete DS.fadeIn,
    [Dm, DS]
  );
}
var Fc = (D3) => (D3?.clip?.duration || 0) / (D3?.speed > 0 ? D3.speed : 1);
function Kr(D3) {
  return (
    !(D3?.start > 0) &&
    D3?.end == null &&
    !(D3?.clipIn > 0) &&
    !(D3?.fadeIn > 0) &&
    !(D3?.fadeOut > 0) &&
    !(D3?.speed > 0 && D3.speed !== 1) &&
    !D3?.mirror &&
    !D3?.reverse &&
    !(D3?.repeat === 'repeat' || D3?.repeat === 'hold')
  );
}
function ss(D3, D4 = null) {
  let D5 = Fc(D3?.[0]),
    D6 = D4 > 0 ? D4 : D5;
  for (let D7 of D3 ?? []) D7?.end != null && D7.end > D6 && (D6 = D7.end);
  return D6;
}
function Nc(
  D3,
  {
    fps: D4 = 30,
    name: D5 = null,
    rootName: D6 = 'root',
    duration: D7 = null,
    range: D8 = null,
    body: D9 = os,
  } = {},
) {
  if (!D3?.length) throw new Error('composeClips: no layers');
  let Dk = D3[0],
    Dw = D8 ? Math.max(0, Number(D8.start) || 0) : 0,
    DV = D8 ? Math.max(Dw + 1 / D4, Number(D8.end) || 0) : ss(D3, D7),
    DD = DV - Dw;
  if (!(DV > 0)) throw new Error('composeClips: base layer has no duration');
  if (D3.length === 1 && Dw === 0 && Math.abs(DV - Dk.clip.duration) < 0.000001 && Kr(Dk))
    return Dk.clip;
  D3 = Tc(D3, DV);
  let Dm = D3.map((DL) => {
      let Db = new Map(),
        Dx = DL.clip;
      (DL.reverse && (Dx = w0(Dx, { rootName: D6, fromOrigin: !!DL.origin })),
        DL.mirror && (Dx = kM(Dx, D9.partner ? { partner: D9.partner } : void 0)));
      for (let Dy of Dx.tracks) Db.set(Dy.name, Dy);
      return Db;
    }),
    DS = Math.max(2, Math.round(DD * D4) + 1),
    DE = new Float32Array(DS);
  for (let DL = 0; DL < DS; DL++) DE[DL] = DL / D4;
  DE[DS - 1] = DD;
  function DF(Db, Dx, Dy, DW) {
    let Dq = Dm[Db].get(Dx),
      DP = D3[Db].clip.duration,
      DY = Dq.createInterpolant(),
      Dv = D3[Db].loops === !1,
      { start: DB, end: DG, clipIn: Dg, fadeIn: DI, fadeOut: Dh, speed: DN } = Ys(D3[Db], DV),
      DM = null;
    if (Dy === D6 && DW === 'position' && DP > 0) {
      let m0 = Array.from(DY.evaluate(0));
      DM = Array.from(DY.evaluate(DP)).map((m1, m2) => m1 - m0[m2]);
    }
    return {
      track: Dq,
      srcDur: DP,
      interp: DY,
      lap: DM,
      hold: Dv,
      start: DB,
      end: DG,
      clipIn: Dg,
      fadeIn: DI,
      fadeOut: Dh,
      speed: DN,
    };
  }
  function DC(Db, Dx, Dy, DW) {
    let Dq = 0,
      DP = Dy;
    Dx.srcDur > 0 &&
      Dy > Dx.srcDur &&
      (Dx.hold
        ? (DP = Dx.srcDur)
        : ((Dq = Math.floor(Dy / Dx.srcDur)), (DP = Dy - Dq * Dx.srcDur)));
    let DY = Dx.interp.evaluate(DP);
    for (let Dv = 0; Dv < DW; Dv++) Db[Dv] = DY[Dv];
    if (Dq && Dx.lap) {
      for (let DB = 0; DB < DW; DB++) Db[DB] += Dq * Dx.lap[DB];
    }
  }
  let Dt = (Db, Dx) => Dx >= Db.start - 1e-9 && Dx <= Db.end + 1e-9,
    DH = (Db, Dx) => Dt(Db, Dx) && V1(Db, Dx) >= 1 - 1e-9;
  function De(Db, Dx, Dy, DW, Dq) {
    let DP = Dq ? Math.min(Dx.end, Math.max(Dx.start, Dy)) : Dy;
    DC(Db, Dx, Dx.clipIn + (DP - Dx.start) * (Dx.speed || 1), DW);
  }
  let DR = new Set();
  for (let Db of Dm) for (let Dx of Db.keys()) DR.add(Dx);
  let DQ = (Dy) => D3[Dy].track ?? Dy,
    Dj = DQ(0),
    Dz = (Dy) => DQ(Dy) === Dj;
  function DO(Dy, DW) {
    let Dq = null;
    for (let DP of Dy) DP.end < DW - 1e-9 && (!Dq || DP.end > Dq.end) && (Dq = DP);
    return Dq;
  }
  function DJ(Dy, DW, Dq, DP, DY, Dv) {
    let DB = DO(DW, Dq),
      DG = !1;
    for (let Dg of DW) {
      if (!Dt(Dg, Dq)) continue;
      if (!DG) {
        if ((DB ? V1(Dg, Dq) : 1) >= 1) {
          (De(Dy, Dg, Dq, DP, !0), (DG = !0));
          continue;
        }
        (De(Dy, DB, Dq, DP, !0), (DG = !0));
      }
      let DI = V1(Dg, Dq);
      DI <= 0 || (De(Dv, Dg, Dq, DP, !1), DY ? Sc(Dy, Dy, Dv, DI) : $c(Dy, Dy, Dv, DI, DP));
    }
    DG || De(Dy, DB ?? DW[0], Dq, DP, !0);
  }
  function DZ(Dy, DW) {
    let Dq = Dy.filter((DP) => Dt(DP, DW));
    for (let DP = Dq.length - 1; DP >= 0; DP--) if (DH(Dq[DP], DW)) return Dq[DP];
    return DO(Dy, DW) ?? Dq[0] ?? Dy[0];
  }
  let DU = D6 + '.position',
    DK = D6 + '.quaternion',
    DT = DA();
  function DA() {
    let Dy = (DM) => Dm[DM].has(DU) || Dm[DM].has(DK),
      DW = (DM) => ({ li: DM, ...Ys(D3[DM], DV) }),
      Dq = [],
      DP = [];
    for (let DM = 0; DM < D3.length; DM++)
      Dy(DM) &&
        (Dz(DM) ? DP.push(DW(DM)) : D9.travel && Cc(D3[DM], D9.travel) > 0 && Dq.push(DW(DM)));
    if (!DP.length) {
      if (!Dq.length) return null;
      let m0 = DQ(Dq[0].li);
      ((DP = Dq.filter((m1) => DQ(m1.li) === m0)), (Dq = Dq.filter((m1) => DQ(m1.li) !== m0)));
    }
    let DY = new Map(),
      Dv = (m1) => (
        DY.has(m1) ||
          DY.set(m1, {
            pos: Dm[m1].has(DU) ? DF(m1, DU, D6, 'position') : null,
            quat: Dm[m1].has(DK) ? DF(m1, DK, D6, 'quaternion') : null,
          }),
        DY.get(m1)
      ),
      DB = new Float32Array(3),
      DG = new Float32Array(4),
      Dg = (m1, m2) => {
        let m3 = Dv(m1),
          m4 = [0, 0, 0],
          m5 = [0, 0, 0, 1];
        return (
          m3.pos && (De(DB, m3.pos, m2, 3, !0), (m4 = [DB[0], DB[1], DB[2]])),
          m3.quat && (De(DG, m3.quat, m2, 4, !0), (m5 = [DG[0], DG[1], DG[2], DG[3]])),
          { p: m4, q: m5 }
        );
      },
      DI = new Array(DS),
      Dh = null,
      DN = Math.round(Dw * D4);
    for (let m1 = -DN; m1 < DS; m1++) {
      let m2 = m1 < 0 ? (DN + m1) / D4 : Dw + DE[m1],
        m3 = null;
      for (let m4 = Dq.length - 1; m4 >= 0; m4--)
        if (DH(Dq[m4], m2)) {
          m3 = Dq[m4];
          break;
        }
      if (((m3 = m3 ?? DZ(DP, m2)), !Dh)) Dh = { li: m3.li, R: [0, 0, 0, 1], O: [0, 0, 0] };
      else {
        if (m3.li !== Dh.li) {
          let m5 = Ys(D3[Dh.li], DV),
            m6 = Math.max(m3.start, Math.min(m2, m5.end)),
            m7 = Dg(Dh.li, m6),
            m8 = jr(Dh.R, m7.p);
          ((m8[0] += Dh.O[0]), (m8[2] += Dh.O[2]));
          let m9 = Gs(Dh.R, m7.q),
            mk = Dg(m3.li, m6),
            mw = Af(Gs(m9, Ic(mk.q))),
            mV = jr(mw, mk.p);
          Dh = { li: m3.li, R: mw, O: [m8[0] - mV[0], 0, m8[2] - mV[2]] };
        }
      }
      m1 >= 0 && (DI[m1] = Dh);
    }
    return DI;
  }
  let Dn = [];
  for (let Dy of DR) {
    let [DW, Dq] = Sf(Dy),
      DP = D9.regionOf(DW) ?? D9.other,
      DY = DP === D9.root && DW === D6,
      Dv = DY ? D9.travel : D9.mixAs(DP),
      DB = [],
      DG = [];
    for (let m6 = 0; m6 < D3.length; m6++) {
      if (!Dm[m6].has(Dy)) continue;
      if (Dz(m6)) {
        DB.push({ li: m6, w: 1 });
        continue;
      }
      let m7 = Cc(D3[m6], Dv);
      m7 > 0 && DG.push({ li: m6, w: Math.min(1, m7) });
    }
    if (!DB.length) {
      if (!DG.length) continue;
      let m8 = DQ(DG[0].li);
      ((DB = DG.filter((m9) => DQ(m9.li) === m8).map((m9) => ({ ...m9, w: 1 }))),
        (DG = DG.filter((m9) => DQ(m9.li) !== m8)));
    }
    let Dg = Dq === 'quaternion',
      DI = (m9) => ({ ...m9, ...DF(m9.li, Dy, DW, Dq) }),
      Dh = DB.map(DI),
      DN = DG.map(DI),
      DM = new Map([...Dh, ...DN].map((m9) => [m9.li, m9])),
      m0 = (DN[DN.length - 1] ?? Dh[Dh.length - 1]).track,
      m1 = m0.getValueSize(),
      m2 = new Float32Array(DS * m1),
      m3 = new Float32Array(m1),
      m4 = new Float32Array(m1),
      m5 = new Float32Array(m1);
    for (let m9 = 0; m9 < DS; m9++) {
      let mk = Dw + DE[m9];
      if (DY) {
        let mw = DT?.[m9],
          mV = mw && DM.get(mw.li);
        if (mV) {
          if ((De(m3, mV, mk, m1, !0), Dq === 'position')) {
            let mD = jr(mw.R, [m3[0], m3[1], m3[2]]);
            ((m3[0] = mD[0] + mw.O[0]), (m3[1] = mD[1]), (m3[2] = mD[2] + mw.O[2]));
          } else {
            if (Dq === 'quaternion') {
              let mm = Gs(mw.R, [m3[0], m3[1], m3[2], m3[3]]);
              ((m3[0] = mm[0]), (m3[1] = mm[1]), (m3[2] = mm[2]), (m3[3] = mm[3]));
            }
          }
        } else {
          let mS = null;
          for (let mE = DN.length - 1; mE >= 0; mE--)
            if (DH(DN[mE], mk)) {
              mS = DN[mE];
              break;
            }
          De(m3, mS ?? DZ(Dh, mk), mk, m1, !0);
        }
        m2.set(m3, m9 * m1);
        continue;
      }
      DJ(m3, Dh, mk, m1, Dg, m5);
      for (let mF of DN) {
        if (!Dt(mF, mk)) continue;
        let mC = mF.w * V1(mF, mk);
        mC <= 0 || (De(m4, mF, mk, m1, !1), Dg ? Sc(m3, m3, m4, mC) : $c(m3, m3, m4, mC, m1));
      }
      m2.set(m3, m9 * m1);
    }
    Dn.push(new m0['constructor'](Dy, DE.slice(), m2));
  }
  let DX = D5 ?? D3.map((mt) => mt.clip.name).join('+');
  return new Dk['clip'].constructor(DX, DD, Dn);
}
function Bc(D3, { fps: D4 = 30, duration: D5 = null, range: D6 = null } = {}) {
  if (!D3?.length) return { duration: 0, fps: D4, loops: !1, layers: [], lengths: [] };
  let D7 = D6 ? Math.max(0, Number(D6.start) || 0) : 0,
    D8 = D6 ? Math.max(D7 + 1 / D4, Number(D6.end) || 0) : ss(D3, D5),
    D9 = 0.001;
  D3 = Tc(D3, D8);
  let Dk = (Dm) => D3[Dm].track ?? Dm,
    Dw = D3.filter((Dm, DS) => Dk(DS) === Dk(0)).length,
    DV = D3.map((Dm, DS) => {
      let DE = Dm.clip.duration,
        DF = Dm.loops === !1;
      if (!Kr(Dm)) return Ef(Dm, DS, D8, D9, D4, Dk(DS) === Dk(0));
      if (DS === 0 && DE >= D8 - D9)
        return {
          name: Dm.clip.name,
          duration: DE,
          tiles: !0,
          mode: 'base',
          note: DF ? 'base \u00B7 one-shot' : 'base',
        };
      if (DE > D8 + D9)
        return {
          name: Dm.clip.name,
          duration: DE,
          tiles: !1,
          mode: DF ? 'hold' : 'tile',
          note: 'cuts at ' + Math.round((D8 / DE) * 100) + '%',
          suggest: [DE, DE * 2].map((DH) => +DH.toFixed(2)),
        };
      if (DF)
        return {
          name: Dm.clip.name,
          duration: DE,
          tiles: !0,
          mode: 'hold',
          note: 'plays once, holds',
        };
      let DC = D8 / DE,
        Dt = Math.abs(DC - Math.round(DC)) < D9;
      return {
        name: Dm.clip.name,
        duration: DE,
        tiles: Dt,
        mode: 'tile',
        note: Dt ? '\u00D7' + Math.round(DC) : DC.toFixed(2) + ' cycles',
        suggest: Dt
          ? null
          : [Math.floor(DC), Math.ceil(DC)]
              .filter((DH) => DH >= 1)
              .map((DH) => +(DH * DE).toFixed(2)),
      };
    }),
    DD =
      D3[0].loops !== !1 &&
      Dw <= 1 &&
      DV.every((Dm) => Dm.loopSafe ?? (Dm.mode === 'base' || (Dm.mode === 'tile' && Dm.tiles)));
  return { duration: D8 - D7, fps: D4, loops: DD, layers: DV, lengths: Of(D3, D4) };
}
function Ef(D3, D4, D5, D6, D7 = 30, D8 = D4 === 0) {
  let D9 = D3.loops === !1,
    { start: Dk, end: Dw, clipIn: DV, fadeIn: DD, fadeOut: Dm, speed: DS } = Ys(D3, D5),
    DE = D3.clip.duration / DS,
    DF = DV / DS,
    DC = D4 === 0 ? 0 : DD,
    Dt = D4 === 0 ? 0 : Dm,
    DH = Dw - Dk,
    De = DE - DF,
    DR = Dw >= D5 - D6,
    DQ =
      D3.xfadeIn > D6
        ? ' \u00B7 crossfades ' +
          Math.round(D3.xfadeIn * D7) +
          ' f' +
          (Dt > D6 ? ' \u00B7 fades out ' + Math.round(Dt * D7) + ' f' : '')
        : DC > D6 || Dt > D6
          ? ' \u00B7 fades ' + Math.round(DC * D7) + '/' + Math.round(Dt * D7) + ' f'
          : '',
    Dj =
      (Math.abs(DS - 1) > 0.000001 ? ' \u00B7 ' + +DS.toFixed(2) + '\u00D7' : '') +
      (D3.mirror ? ' \u00B7 mirrored' : '') +
      (D3.reverse ? (D3.origin ? ' \u00B7 reversed from origin' : ' \u00B7 reversed') : ''),
    Dz = (Dk > D6 ? ' \u00B7 from ' + Dk.toFixed(2) + ' s' : '') + DQ + Dj,
    DO = { name: D3.clip.name, duration: DE },
    DJ = Dk <= D6 && !(DC > D6),
    DZ = DR && !(Dt > D6);
  if (D9) {
    let DX = De > DH + D6,
      DL = DX && DR && D3.end == null,
      Db = DL
        ? 'cuts at ' + Math.round(((DF + DH) / DE) * 100) + '%'
        : DX
          ? 'trimmed'
          : De < DH - D6
            ? 'plays once, holds'
            : 'plays once';
    return {
      ...DO,
      mode: D8 ? 'base' : 'hold',
      tiles: !DL,
      note: Db + Dz,
      loopSafe: !D8 && !DJ && !DZ,
    };
  }
  let DU = DH / DE,
    DK = !DR || Math.abs((DF + DH) / DE - Math.round((DF + DH) / DE)) < D6,
    DT = Math.abs(DU - Math.round(DU)) < D6 ? '\u00D7' + Math.round(DU) : DU.toFixed(2) + ' cycles',
    DA = !D8 && !DJ && !DZ,
    Dn = DJ && DZ;
  return {
    ...DO,
    mode: D8 ? 'base' : 'tile',
    tiles: DK,
    note: DT + Dz,
    loopSafe: DA || (Dn && DK),
  };
}
var jc = (D3, D4) => (D4 ? jc(D4, D3 % D4) : D3),
  Lf = 2400;
function Of(D3, D4 = 30) {
  if (!D3?.length) return [];
  let D5 = (DV) => Math.max(1, Math.round(Fc(DV) * D4)),
    D6 = D3.map(D5),
    D7 = (DV) =>
      Math.round(
        ((Number(DV.start) || 0) +
          Math.max(
            0,
            ((DV.clip?.duration || 0) - (Number(DV.clipIn) || 0)) / (DV.speed > 0 ? DV.speed : 1),
          )) *
          D4,
      ),
    D8 = Math.max(
      ...D3.map((DV) => Math.max(D7(DV), DV.end != null ? Math.round(DV.end * D4) : 0)),
    ),
    D9 = [],
    Dk = (DV, DD) => {
      !(DV > 0) ||
        DV > Lf ||
        D9.some((Dm) => Dm.frames === DV) ||
        D9.push({ frames: DV, seconds: +(DV / D4).toFixed(3), note: DD });
    };
  (Dk(D6[0], 'base'), D8 > D6[0] && Dk(D8, 'nothing cut'));
  let Dw = D3.filter((DV) => DV.loops !== !1).map(D5);
  if (Dw.length) {
    let DV = Dw.reduce((DD, Dm) => (DD / jc(DD, Dm)) * Dm);
    Dk(DV * Math.max(1, Math.ceil(D8 / DV)), 'every cycle whole');
  }
  return D9;
}
var Ur = 3;
function Os(D3) {
  let D4 = 0,
    D5 = null;
  for (let D6 of D3?.tracks ?? []) {
    if (!D6.name.endsWith('.quaternion')) continue;
    let D7 = D6.values,
      D8 = D7.length - 4;
    if (D8 < 4) continue;
    let D9 = 0;
    for (let Dm = 0; Dm < 4; Dm++) D9 += D7[Dm] * D7[D8 + Dm];
    let Dk = D9 < 0 ? -1 : 1,
      Dw = 0,
      DV = 0;
    for (let DS = 0; DS < 4; DS++) {
      let DE = Dk * D7[D8 + DS];
      ((Dw += (D7[DS] - DE) ** 2), (DV += (D7[DS] + DE) ** 2));
    }
    let DD = (4 * Math.atan2(Math.sqrt(Dw), Math.sqrt(DV)) * 180) / Math.PI;
    DD > D4 && ((D4 = DD), (D5 = D6.name));
  }
  return { loops: D4 <= Ur, seam: +D4.toFixed(2), node: D5 };
}
function qr(D3, D4) {
  if (Kr(D3)) return '';
  let D5 = (DV) => Math.max(0, Math.round((Number(DV) || 0) * D4)),
    D6 = D3.end == null ? '' : String(D5(D3.end)),
    D7 = D3.clipIn > 0 ? '+' + D5(D3.clipIn) : '',
    D8 = D3.fadeIn > 0 || D3.fadeOut > 0 ? '*' + D5(D3.fadeIn) + '*' + D5(D3.fadeOut) : '',
    D9 = D3.speed > 0 && D3.speed !== 1 ? 'x' + Math.round(D3.speed * 100) : '',
    Dk = (D3.mirror ? '!' : '') + (D3.reverse ? (D3.origin ? 'O' : 'B') : ''),
    Dw = D3.repeat === 'repeat' ? 'R' : D3.repeat === 'hold' ? 'H' : '';
  return '@' + D5(D3.start) + '-' + D6 + D7 + D8 + D9 + Dk + Dw;
}
function Rc(D3) {
  let D4 = /^@(\d+)-(\d*)(?:\+(\d+))?(?:\*(\d+)\*(\d+))?(?:x(\d+))?(!)?([BO])?([RH])?$/.exec(
    D3 || '',
  );
  return D4
    ? {
        start: Number(D4[1]),
        end: D4[2] === '' ? null : Number(D4[2]),
        in: Number(D4[3] || 0),
        fadeIn: Number(D4[4] || 0),
        fadeOut: Number(D4[5] || 0),
        speed: D4[6] ? Number(D4[6]) / 100 : 1,
        mirror: !!D4[7],
        reverse: !!D4[8],
        origin: D4[8] === 'O',
        repeat: D4[9] === 'R' ? 'repeat' : D4[9] === 'H' ? 'hold' : null,
      }
    : null;
}
function Dc(D3, D4 = 30) {
  return D3
    ? {
        start: D3.start / D4,
        end: D3.end == null ? null : D3.end / D4,
        clipIn: (D3.in || 0) / D4,
        fadeIn: (D3.fadeIn || 0) / D4,
        fadeOut: (D3.fadeOut || 0) / D4,
        ...(D3.speed > 0 && D3.speed !== 1 ? { speed: D3.speed } : {}),
        ...(D3.mirror ? { mirror: !0 } : {}),
        ...(D3.reverse ? { reverse: !0 } : {}),
        ...(D3.reverse && D3.origin ? { origin: !0 } : {}),
        ...(D3.repeat ? { repeat: D3.repeat } : {}),
      }
    : {};
}
function Fi(D3) {
  return String(D3 ?? '')
    .replace(/[^A-Za-z0-9 _-]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 24);
}
function If(D3) {
  if (!D3) return '';
  let D4 = Fi(D3.name);
  return (D4 ? ';n=' + D4.replace(/ /g, '+') : '') + (D3.mute ? ';m' : '') + (D3.solo ? ';s' : '');
}
function Tf(D3) {
  let D4 = {};
  for (let D5 of D3)
    if (D5.startsWith('n=')) {
      let D6 = Fi(D5.slice(2).replace(/\+/g, ' '));
      D6 && (D4.name = D6);
    } else D5 === 'm' ? (D4.mute = !0) : D5 === 's' && (D4.solo = !0);
  return Object.keys(D4).length ? D4 : null;
}
function Wr(D3, D4 = null, D5 = 30, D6 = null, D7 = null) {
  let D8 = [],
    D9 = new Map();
  D3.forEach((Dw, DV) => {
    let DD = Dw.track ?? '#' + DV;
    (D9.has(DD) || (D9.set(DD, D8.length), D8.push([])), D8[D9.get(DD)].push(Dw));
  });
  let Dk = D6
    ? ['@' + Math.round(D6.start * D5) + '-' + Math.round(D6.end * D5)]
    : D4 > 0
      ? ['=' + +Number(D4).toFixed(3)]
      : [];
  return [
    ...D8.map((Dw, DV) => {
      let DD = Pf(Dw[0], DV, D5),
        Dm = Dw.slice(1).map((DE) => DE.id + qr(DE, D5)),
        DS = D7 ? If(D7(Dw[0].track, DV)) : '';
      return [DD, ...Dm].join(',') + DS;
    }),
    ...Dk,
  ].join('~');
}
function Pf(D3, D4, D5) {
  if (D4 === 0) return D3.id + qr(D3, D5);
  let D6 = D3.regions,
    D7 = Array.isArray(D6) ? D6 : Object.keys(D6 || {}),
    D8 = [D3.id + Lc(D3.weight)];
  for (let D9 of D7) D8.push(D9 + Lc(Array.isArray(D6) ? 1 : D6[D9]));
  return D8.join('.') + qr(D3, D5);
}
function qc(D3) {
  let D4 = String(D3 || '')
      .split('~')
      .find((D8) => D8.startsWith('@')),
    D5 = D4 && /^@(\d+)-(\d+)$/.exec(D4);
  if (!D5) return null;
  let D6 = Number(D5[1]),
    D7 = Number(D5[2]);
  return D7 > D6 ? { start: D6, end: D7 } : null;
}
function zc(D3) {
  let D4 = String(D3 || '')
      .split('~')
      .find((D6) => D6.startsWith('=')),
    D5 = D4 ? Number(D4.slice(1)) : NaN;
  return Number.isFinite(D5) && D5 > 0 ? D5 : null;
}
function Lc(D3) {
  let D4 = Math.round((D3 ?? 1) * 100);
  return D4 === 100 ? '' : ':' + D4;
}
function Dr(D3) {
  let D4 = D3.indexOf(':');
  if (D4 < 0) return [D3, 1];
  let D5 = parseInt(D3.slice(D4 + 1), 10);
  return [D3.slice(0, D4), Number.isFinite(D5) ? Math.min(1, Math.max(0, D5 / 100)) : 1];
}
function Kc(D3, D4 = os) {
  let D5 = [];
  return (
    String(D3 || '')
      .split('~')
      .filter((D6) => D6 && !D6.startsWith('=') && !D6.startsWith('@'))
      .forEach((D6, D7) => {
        let [D8, ...D9] = D6.split(';'),
          Dk = Tf(D9),
          [Dw, ...DV] = D8.split(','),
          DD = Ff(Dw, D7, D4);
        if (DD.id) {
          D5.push({ ...DD, track: D7, ...(Dk ? { trackAttrs: Dk } : {}) });
          for (let Dm of DV) {
            let DS = Dm.indexOf('@'),
              DE = DS < 0 ? Dm : Dm.slice(0, DS),
              DF = DS < 0 ? null : Rc(Dm.slice(DS));
            DE &&
              D5.push({
                id: DE,
                weight: DD.weight,
                regions: { ...DD.regions },
                track: D7,
                ...(DF ? { frames: DF } : {}),
              });
          }
        }
      }),
    D5
  );
}
function Ff(D3, D4, D5 = os) {
  let D6 = D3.indexOf('@'),
    D7 = D6 < 0 ? null : Rc(D3.slice(D6)),
    D8 = (D6 < 0 ? D3 : D3.slice(0, D6)).split('.');
  if (D8[0] === 'user' && D8.length > 1) D8.splice(0, 2, 'user.' + D8[1]);
  else {
    if (D8[0] === 'animal' && D8.length > 2) D8.splice(0, 3, 'animal.' + D8[1] + '.' + D8[2]);
    else {
      if (D8[0] === 'community' && D8.length > 1) {
        let DV = D4 === 0 ? D8.length : 2;
        for (; DV < D8.length && !D8[DV - 1].includes(':') && !D5.keys.includes(Dr(D8[DV])[0]);)
          DV++;
        D8.splice(0, DV, D8.slice(0, DV).join('.'));
      }
    }
  }
  let [D9, Dk] = Dr(D8[0]);
  if (D4 === 0) return { id: D9, weight: 1, regions: {}, ...(D7 ? { frames: D7 } : {}) };
  let Dw = {};
  for (let DD of D8.slice(1)) {
    let [Dm, DS] = Dr(DD);
    D5.keys.includes(Dm) && (Dw[Dm] = DS);
  }
  return { id: D9, weight: Dk, regions: Dw, ...(D7 ? { frames: D7 } : {}) };
}
function Uc({
  mount: D3,
  player: D4,
  clips: D5,
  getSelected: D6,
  rootName: D7 = 'root',
  body: D8 = () => os,
  onChange: D9 = () => {},
  onShare: Dk = null,
}) {
  let Dw = () => (typeof D7 == 'function' ? D7() : D7),
    DV = [],
    DD = 0,
    Dm = null,
    DS = null,
    DE = 0,
    DF = new Map(),
    DC = () => DV[0]?.track;
  function DH(mn) {
    if (mn === DC()) return !1;
    let mo = DF.get(mn);
    return mo?.mute
      ? !0
      : [...DF.entries()].some(
          ([mX, mL]) => mL.solo && mX !== DC() && DV.some((mb) => mb.track === mX),
        ) && !mo?.solo;
  }
  let De = (mn) => DF.get(mn) ?? null,
    DR = new Set(),
    DQ = null,
    Dj = new Map(),
    Dz = (mn) => D5[mn]?.label || mn;
  async function DO(mn) {
    await Promise.all(
      mn
        .filter((mo) => !Dj.has(mo))
        .map(async (mo) => {
          Dj.set(mo, await D4.loadClip(mo, D5[mo]));
        }),
    );
  }
  async function DJ() {
    let mn = D6().filter((mo) => !DV.some((mX) => mX.id === mo));
    if (mn.length) {
      await DO(mn);
      for (let mo of mn)
        DV.push({
          id: mo,
          track: DD++,
          weight: 1,
          regions:
            DV.length === 0
              ? {}
              : Object.fromEntries((D8().presets[D8().first] ?? []).map((mX) => [mX, 1])),
        });
      mQ();
    }
  }
  let DZ = (mn) => Dj.get(mn)?.duration ?? D5[mn]?.duration ?? 0,
    DU = () => Object.fromEntries(D8().keys.map((mn) => [mn, 1])),
    DK = () => [...new Set(DV.map((mn) => mn.track))],
    DT = (mn) => DV.filter((mo) => mo.track === mn);
  function DA() {
    DV = DK().flatMap((mn) =>
      DT(mn)
        .map((mo, mX) => [mo, mX])
        .sort((mo, mX) => (mo[0].start ?? 0) - (mX[0].start ?? 0) || mo[1] - mX[1])
        .map(([mo]) => mo),
    );
  }
  async function Dn(mn) {
    let mo = D6();
    if (!mo.length) return;
    await DO(mo);
    let mX = mC(),
      mL = (mb) => Math.round(mb * mX) / mX;
    for (let mb of mo) {
      let mx = DT(mn),
        my = mx[mx.length - 1];
      if (!my) return;
      my.end == null &&
        (my.end = mL((my.start ?? 0) + Math.max(1 / mX, DZ(my.id) - (my.clipIn ?? 0))));
      let mW = my.end;
      DV.splice(DV.indexOf(my) + 1, 0, {
        id: mb,
        track: mn,
        weight: my.weight ?? 1,
        regions: { ...(my.regions || {}) },
        start: mW,
        end: mL(mW + Math.max(1 / mX, DZ(mb))),
      });
    }
    (DA(), mQ());
  }
  function DX(mn, mo) {
    let mX = DV[mn];
    if (!mX) return;
    let mL = mC(),
      mb = (mx) => Math.round(mx * mL) / mL;
    if ('speed' in mo) {
      let mx = mX.speed > 0 ? mX.speed : 1,
        my = Math.min(4, Math.max(0.1, Number(mo.speed) || 1));
      if (mX.end != null) {
        let mW = mX.start ?? 0;
        mX.end = Math.max(mW + 1 / mL, mb(mW + ((mX.end - mW) * mx) / my));
      }
      Math.abs(my - 1) < 0.000001 ? delete mX.speed : (mX.speed = +my.toFixed(3));
    }
    ('mirror' in mo && (mo.mirror ? (mX.mirror = !0) : delete mX.mirror),
      'reverse' in mo && (mo.reverse ? (mX.reverse = !0) : delete mX.reverse),
      'origin' in mo && (mo.origin ? (mX.origin = !0) : delete mX.origin),
      'repeat' in mo &&
        (mo.repeat === 'repeat' || mo.repeat === 'hold'
          ? (mX.repeat = mo.repeat)
          : delete mX.repeat),
      DA(),
      mj());
  }
  async function DL({
    id: mn,
    track: mo = null,
    start: mX = 0,
    baseId: mL = null,
    toBase: mb = !1,
  }) {
    if ((await DO(DV.length || !mL ? [mn] : [mn, mL]), !DV.length && !mL)) {
      let mY = D5[mn]?.fps || 30,
        mv = (mG) => Math.round(Math.max(0, mG) * mY) / mY,
        mB = mv(mX);
      (DV.push({
        id: mn,
        track: DD++,
        weight: 1,
        regions: {},
        start: mB,
        end: mv(mB + Math.max(1 / mY, DZ(mn))),
      }),
        DA(),
        mj());
      return;
    }
    DV.length || DV.push({ id: mL, track: DD++, weight: 1, regions: {} });
    let mx = mC(),
      my = (mG) => Math.round(Math.max(0, mG) * mx) / mx,
      mW = my(mX),
      mq = mb ? DV[0].track : mo,
      mP = mq == null ? [] : DT(mq);
    if (!mP.length)
      DV.push({
        id: mn,
        track: DD++,
        weight: 1,
        regions: DU(),
        start: mW,
        end: my(mW + Math.max(1 / mx, DZ(mn))),
      });
    else {
      let mG = ss(mF(), Dm);
      for (let mg of mP) mg.end == null && (mg.end = my(mG));
      DV.push({
        id: mn,
        track: mq,
        weight: mP[0].weight ?? 1,
        regions: { ...(mP[0].regions || {}) },
        start: mW,
        end: my(mW + Math.max(1 / mx, DZ(mn))),
      });
    }
    (DA(), mj());
  }
  function Db(mn) {
    (DV.splice(mn, 1), mQ());
  }
  let Dx = () => (DS ? DS.end : ss(mF(), Dm)),
    Dy = (mn) => {
      let { uid: mo, ...mX } = mn;
      return { ...mX, regions: { ...(mn.regions || {}) }, uid: ++DE };
    };
  function DW(mn, mo) {
    let mX = DV[mn];
    if (!mX) return null;
    let mL = zr(mX, mo, { fps: mC(), clipDuration: DZ(mX.id), loops: mE(mX), timelineEnd: Dx() });
    if (!mL) return null;
    let [mb, mx] = mL;
    DV[mn] = mb;
    let my = { ...mx, regions: { ...(mx.regions || {}) }, uid: ++DE };
    return (DV.splice(mn + 1, 0, my), DA(), mj(), my.uid);
  }
  function Dq(mn, mo = null) {
    let mX = DV[mn];
    if (!mX) return null;
    let mL = mC(),
      mb = (mP) => Math.round(Math.max(0, mP) * mL) / mL,
      mx = mX.start ?? 0,
      my = mX.end ?? Dx(),
      mW = Dy(mX),
      mq = mo ? mo.start : my;
    if (
      ((mW.start = mb(mq)),
      (mW.end = Math.max(mW.start + 1 / mL, mb(mo && mo.end != null ? mo.end : mq + (my - mx)))),
      mo && 'track' in mo && mo.track !== mX.track)
    ) {
      if (mo.track == null) ((mW.track = DD++), (mW.regions = DU()), (mW.weight = 1));
      else {
        let mP = DT(mo.track);
        if (!mP.length) return null;
        ((mW.track = mo.track),
          (mW.regions = { ...(mP[0].regions || {}) }),
          (mW.weight = mP[0].weight ?? 1));
      }
    }
    return (DV.push(mW), DA(), mj(), mW.uid);
  }
  let DP = null;
  function DY(mn) {
    let mo = mn.map((mL) => DV[mL]).filter(Boolean);
    if (!mo.length) return !1;
    let mX = Math.min(...mo.map((mL) => mL.start ?? 0));
    return (
      (DP = mo.map((mL) => {
        let { uid: mb, ...mx } = mL,
          my = mL.end ?? Dx();
        return {
          ...mx,
          regions: { ...(mL.regions || {}) },
          rel: (mL.start ?? 0) - mX,
          len: my - (mL.start ?? 0),
        };
      })),
      !0
    );
  }
  async function Dv({ at: mn = 0, track: mo = void 0 } = {}) {
    if (!DP?.length) return [];
    await DO([...new Set(DP.map((my) => my.id))]);
    let mX = mC(),
      mL = (my) => Math.round(Math.max(0, my) * mX) / mX,
      mb = new Map(),
      mx = [];
    for (let my of DP) {
      let { rel: mW, len: mq, ...mP } = my,
        mY = { ...mP, regions: { ...(mP.regions || {}) }, uid: ++DE };
      if (
        ((mY.start = mL(mn + mW)),
        (mY.end = Math.max(mY.start + 1 / mX, mL(mn + mW + mq))),
        !DV.length)
      )
        ((mY.track = DD++), (mY.regions = {}), (mY.weight = 1));
      else {
        if (mo !== void 0 && DT(mo).length) {
          let mv = DT(mo);
          ((mY.track = mo),
            (mY.regions = { ...(mv[0].regions || {}) }),
            (mY.weight = mv[0].weight ?? 1));
        } else
          DT(my.track).length ||
            (mb.has(my.track) || mb.set(my.track, DD++),
            (mY.track = mb.get(my.track)),
            Object.keys(mY.regions).length || (mY.regions = DU()));
      }
      (DV.push(mY), mx.push(mY.uid));
    }
    return (DA(), mj(), mx);
  }
  function DB(mn) {
    let mo = mC(),
      mX = (mb) => Math.round(Math.max(0, mb) * mo) / mo,
      mL = mn.map((mb) => ({ L: DV[mb.i], ...mb })).filter((mb) => mb.L);
    if (mL.length) {
      for (let { L: mb, start: mx, end: my } of mL) {
        let mW = mX(mx);
        (mW > 0 ? (mb.start = mW) : delete mb.start,
          my != null && (mb.end = Math.max(mW + 1 / mo, mX(my))));
      }
      (DA(), mj());
    }
  }
  function DG(mn) {
    let mo = new Set(mn.map((mX) => DV[mX]).filter(Boolean));
    if (mo.size) {
      if (((DV = DV.filter((mX) => !mo.has(mX))), !DV.length)) {
        m9();
        return;
      }
      (DA(), mj());
    }
  }
  function Dg(mn) {
    let mo = mn.map((mW) => DV[mW]).filter(Boolean);
    if (!mo.length) return [];
    let mX = mC(),
      mL = (mW) => Math.round(Math.max(0, mW) * mX) / mX,
      mb = Math.min(...mo.map((mW) => mW.start ?? 0)),
      mx = Math.max(...mo.map((mW) => mW.end ?? Dx())) - mb,
      my = [];
    for (let mW of mo) {
      let mq = Dy(mW),
        mP = (mW.start ?? 0) + mx,
        mY = (mW.end ?? Dx()) + mx;
      ((mq.start = mL(mP)),
        (mq.end = Math.max(mq.start + 1 / mX, mL(mY))),
        DV.push(mq),
        my.push(mq.uid));
    }
    return (DA(), mj(), my);
  }
  function DI(mn, mo) {
    let mX = mn.map((mb) => DV[mb]).filter(Boolean),
      mL = [];
    for (let mb of mX) {
      let mx = zr(mb, mo, { fps: mC(), clipDuration: DZ(mb.id), loops: mE(mb), timelineEnd: Dx() });
      if (!mx) continue;
      let my = DV.indexOf(mb);
      DV[my] = mx[0];
      let mW = { ...mx[1], regions: { ...(mx[1].regions || {}) }, uid: ++DE };
      (DV.splice(my + 1, 0, mW), mL.push(mW.uid));
    }
    return mL.length ? (DA(), mj(), mL) : [];
  }
  function Dh(mn, mo = {}, { live: mX = !1 } = {}) {
    if (!DV.some((mx) => mx.track === mn)) return;
    let mL = mn === DC(),
      mb = { ...(DF.get(mn) || {}) };
    if ('name' in mo) {
      let mx = Fi(mo.name);
      mx ? (mb.name = mx) : delete mb.name;
    }
    (!mL && 'mute' in mo && (mo.mute ? (mb.mute = !0) : delete mb.mute),
      !mL && 'solo' in mo && (mo.solo ? (mb.solo = !0) : delete mb.solo),
      Object.keys(mb).length ? DF.set(mn, mb) : DF.delete(mn));
    for (let my of DT(mn))
      ('weight' in mo && !mL && (my.weight = Math.min(1, Math.max(0, Number(mo.weight) || 0))),
        'regions' in mo && !mL && (my.regions = { ...(mo.regions || {}) }));
    mX ? mD() : mj();
  }
  function DN(mn) {
    if (DV[mn]) {
      if ((DV.splice(mn, 1), !DV.length)) {
        m9();
        return;
      }
      (DA(), mj());
    }
  }
  function DM(mn) {
    ((DV = DV.filter((mo) => mo.track !== mn)), mQ());
  }
  function m0(mn, mo) {
    let mX = DK(),
      mL = mX.indexOf(mn),
      mb = mL + mo;
    mL <= 0 ||
      mb <= 0 ||
      mb >= mX.length ||
      (([mX[mL], mX[mb]] = [mX[mb], mX[mL]]), (DV = mX.flatMap((mx) => DT(mx))), mQ());
  }
  function m1(mn, mo) {
    let mX = mn.regions || {};
    return Object.prototype.hasOwnProperty.call(mX, mo) ? (mX[mo] ?? 1) : null;
  }
  let m2 = (mn, mo) => {
    for (let mX of DT(DV[mn].track)) mo(mX);
  };
  function m3(mn, mo) {
    let mX = Object.prototype.hasOwnProperty.call(DV[mn].regions, mo);
    (m2(mn, (mL) => {
      mX ? delete mL.regions[mo] : (mL.regions[mo] = 1);
    }),
      mQ());
  }
  function m4(mn, mo, mX) {
    (m2(mn, (mL) => {
      mL.regions[mo] = mX;
    }),
      mD());
  }
  function m5(mn, mo) {
    (m2(mn, (mX) => {
      mX.weight = mo;
    }),
      mD());
  }
  function m6(mn, mo) {
    (m2(mn, (mX) => {
      mX.regions = Object.fromEntries((D8().presets[mo] || []).map((mL) => [mL, 1]));
    }),
      mQ());
  }
  function m7(mn, mo) {
    let mX = DV[mn];
    if (!mX) return;
    let mL = mC(),
      mb = (my) => Math.round(Math.max(0, Number(my) || 0) * mL) / mL,
      mx = {
        start: mX.start ?? 0,
        end: mX.end ?? null,
        clipIn: mX.clipIn ?? 0,
        fadeIn: mX.fadeIn ?? 0,
        fadeOut: mX.fadeOut ?? 0,
        ...mo,
      };
    ((mX.start = mb(mx.start)),
      (mX.clipIn = mb(mx.clipIn)),
      (mX.end = mx.end == null ? null : Math.max(mX.start + 1 / mL, mb(mx.end))),
      (mX.fadeIn = mb(mx.fadeIn)),
      (mX.fadeOut = mb(mx.fadeOut)),
      mX.start > 0 || delete mX.start,
      mX.clipIn > 0 || delete mX.clipIn,
      mX.end == null && delete mX.end,
      mX.fadeIn > 0 || delete mX.fadeIn,
      mX.fadeOut > 0 || delete mX.fadeOut,
      DA(),
      mj());
  }
  function m8(mn, mo, mX = {}) {
    let mL = DV[mn];
    if (!mL) return !1;
    if (mo != null && mL.track === mo) return (m7(mn, mX), !0);
    let mb = DV[0].track;
    if (mL.track === mb && DT(mb).length === 1) return !1;
    let mx = DK();
    if (mo == null) ((mL.track = DD++), (mL.regions = DU()), (mL.weight = 1), mx.push(mL.track));
    else {
      let my = DT(mo);
      if (!my.length) return !1;
      ((mL.track = mo),
        (mL.regions = { ...(my[0].regions || {}) }),
        (mL.weight = my[0].weight ?? 1));
    }
    return ((DV = mx.flatMap((mW) => DT(mW))), m7(DV.indexOf(mL), mX), !0);
  }
  function m9() {
    ((DV = []), (Dm = null), (DS = null), DF.clear(), (DQ = null), mJ(), mk(), D9(null));
  }
  function mk() {
    try {
      DV.length >= 1
        ? history.replaceState(null, '', '#c=' + Wr(DV, Dm, mC(), DS, De))
        : location.hash.slice(1).startsWith('c=') &&
          history.replaceState(null, '', location.pathname + location.search);
    } catch {}
  }
  async function mw(mn, mo = null, mX = null) {
    let mL = (mn || []).filter((mW) => D5[mW.id]),
      mb = (mn || []).length - mL.length;
    if (
      (mb &&
        console.warn(
          '[Composer] ' +
            mb +
            ' layer(s) in the link are no longer in the library and were skipped.',
        ),
      mL.length < 1)
    )
      return !1;
    await DO(mL.map((mW) => mW.id));
    let mx = D5[mL[0].id]?.fps || 30,
      my = mL[0].track ?? 0;
    ((DV = mL.map((mW, mq) => ({
      id: mW.id,
      track: mW.track ?? mq,
      weight: mW.weight ?? 1,
      regions: (mW.track ?? mq) === my ? {} : { ...(mW.regions || {}) },
      ...Dc(mW.frames, mx),
    }))),
      (DD = Math.max(0, ...DV.map((mW) => mW.track)) + 1),
      DF.clear());
    for (let mW of mL) mW.trackAttrs && DF.set(mW.track ?? 0, { ...mW.trackAttrs });
    return (
      DA(),
      (DR = new Set()),
      (Dm = mo > 0 ? +Number(mo).toFixed(3) : null),
      (DS = mX ? { start: mX.start / mx, end: mX.end / mx } : null),
      mj(),
      !0
    );
  }
  let mV = null;
  function mD() {
    mV === null &&
      (mV = requestAnimationFrame(() => {
        ((mV = null),
          mt(),
          DQ &&
            (D4.getState().id === '__composite__'
              ? D4.updateRaw(DQ)
              : D4.playRaw(DQ, { id: '__composite__', crossfadeMs: 0 })),
          mk(),
          D9(DQ));
      }));
  }
  let mm = new Map();
  function mS(mn) {
    let mo = D5[mn]?.loops;
    if (typeof mo == 'boolean') return mo;
    if (!mm.has(mn)) {
      let mX = Dj.get(mn);
      mm.set(mn, mX ? Os(mX).loops : !0);
    }
    return mm.get(mn);
  }
  let mE = (mn) => (mn.repeat === 'repeat' ? !0 : mn.repeat === 'hold' ? !1 : mS(mn.id)),
    mF = () =>
      DV.map((mn) => ({
        clip: Dj.get(mn.id),
        weight: DH(mn.track) ? 0 : (mn.weight ?? 1),
        regions: mn.regions,
        loops: mE(mn),
        repeat: mn.repeat,
        start: mn.start,
        end: mn.end,
        clipIn: mn.clipIn,
        fadeIn: mn.fadeIn,
        fadeOut: mn.fadeOut,
        track: mn.track,
        speed: mn.speed,
        mirror: mn.mirror,
        reverse: mn.reverse,
        origin: mn.origin,
      })),
    mC = () => D5[DV[0]?.id]?.fps || 30;
  function mt() {
    DQ =
      DV.length >= 1
        ? Nc(mF(), { fps: mC(), rootName: Dw(), duration: Dm, range: DS, body: D8() })
        : null;
  }
  function mH(mn) {
    if (mn === 'auto') DS = null;
    else {
      if (mn === 'manual') {
        if (DS) return;
        DS = { start: 0, end: ss(mF(), Dm) };
      } else {
        if (mn && mn.end > mn.start) {
          let mo = mC(),
            mX = (mb) => Math.round(Math.max(0, mb) * mo) / mo,
            mL = mX(mn.start);
          DS = { start: mL, end: Math.max(mL + 1 / mo, mX(mn.end)) };
        } else return;
      }
    }
    mj();
  }
  function me() {
    DQ &&
      D4.getState().id !== '__composite__' &&
      (D4.playRaw(DQ, { id: '__composite__', crossfadeMs: 0 }), D9(DQ));
  }
  function mR(mn) {
    let mo = mn > 0 ? +Number(mn).toFixed(3) : null;
    mo !== Dm && ((Dm = mo), mQ());
  }
  function mQ() {
    (mt(), mJ(), mk(), DQ && D4.playRaw(DQ, { id: '__composite__', crossfadeMs: 200 }), D9(DQ));
  }
  function mj() {
    (mt(),
      mJ(),
      mk(),
      DQ &&
        (D4.getState().id === '__composite__'
          ? D4.updateRaw(DQ)
          : D4.playRaw(DQ, { id: '__composite__', crossfadeMs: 0 })),
      D9(DQ));
  }
  function mz() {
    return DV.length >= 1
      ? location.origin + location.pathname + '#c=' + Wr(DV, Dm, mC(), DS, De)
      : null;
  }
  let mO = (mn, mo, mX) => {
    let mL = document.createElement(mn);
    return (mo && (mL.className = mo), mX != null && (mL.textContent = mX), mL);
  };
  function mJ() {
    D3.innerHTML = '';
    let mn = mO('div', 'lib-comp__head');
    mn.appendChild(mO('span', 'lib-comp__title', 'Compose'));
    let mo = mO('button', 'lib-btn lib-btn--sm', '+ Add selected');
    if (
      ((mo.type = 'button'), mo.addEventListener('click', DJ), mn.appendChild(mo), DV.length >= 1)
    ) {
      let mb = mO('button', 'lib-btn lib-btn--sm', 'Link');
      ((mb.type = 'button'),
        (mb.title = Dk
          ? 'Copy a short link to exactly this'
          : 'Copy a link that rebuilds this composite'),
        mb.addEventListener('click', async () => {
          if (Dk) {
            Dk(mb);
            return;
          }
          let mx = mz();
          if (mx) {
            try {
              (await navigator.clipboard.writeText(mx), (mb.textContent = 'Copied'));
            } catch {
              mb.textContent = 'In address bar';
            }
            setTimeout(() => {
              mb.textContent = 'Link';
            }, 1800);
          }
        }),
        mn.appendChild(mb));
    }
    if (DV.length) {
      let mx = mO('button', 'lib-btn lib-btn--sm', 'Clear');
      ((mx.type = 'button'), mx.addEventListener('click', m9), mn.appendChild(mx));
    }
    if ((D3.appendChild(mn), !DV.length)) {
      D3.appendChild(
        mO(
          'p',
          'lib-comp__hint',
          'Tick clips in the grid, then Add. The first becomes the base; each one after it overrides the regions you give it.',
        ),
      );
      return;
    }
    let mX = mO('ol', 'lib-comp__list'),
      mL = DK();
    for (let my = mL.length - 1; my >= 0; my--)
      mX.appendChild(mZ(DV.indexOf(DT(mL[my])[0]), my, mL.length));
    (D3.appendChild(mX), D3.appendChild(mK()));
  }
  function mZ(mn, mo, mX) {
    let mL = DV[mn],
      mb = mL.track,
      mx = DT(mb),
      my = mo === 0,
      mW = mO('li', 'lib-comp__layer' + (my ? ' is-base' : '')),
      mq = mO('div', 'lib-comp__row');
    if (!my) {
      let mI = mO('button', 'lib-comp__twisty', DR.has(mb) ? '\u25BE' : '\u25B8');
      ((mI.type = 'button'),
        (mI.title = DR.has(mb) ? 'Collapse' : 'Expand per-region weights'),
        mI.setAttribute('aria-expanded', String(DR.has(mb))),
        mI.addEventListener('click', () => {
          (DR.has(mb) ? DR.delete(mb) : DR.add(mb), mJ());
        }),
        mq.appendChild(mI));
    }
    let mP = mx.length === 1 ? Dz(mL.id) : mx.map((mN) => Dz(mN.id)).join(' \u2192 '),
      mY = DF.get(mL.track)?.name;
    (mq.appendChild(
      mO(
        'span',
        'lib-comp__name' + (DH(mL.track) ? ' is-muted' : ''),
        (mY ? mY + ' \u00B7 ' + mP : mP) + (DH(mL.track) ? ' (muted)' : ''),
      ),
    ),
      mq.appendChild(mO('span', 'lib-comp__tag', my ? 'base' : 'layer ' + mo)));
    let mv = mO('span', 'lib-comp__btns');
    if (!my)
      for (let [mN, mM, S0] of [
        ['\u2191', 1, 'Move up \u2014 higher layers win'],
        ['\u2193', -1, 'Move down'],
      ]) {
        let S1 = mO('button', 'lib-btn lib-btn--icon', mN);
        ((S1.type = 'button'),
          (S1.title = S0),
          (S1.disabled = (mM > 0 && mo === mX - 1) || (mM < 0 && mo === 1)),
          S1.addEventListener('click', () => m0(mb, mM)),
          mv.appendChild(S1));
      }
    let mB = mO('button', 'lib-btn lib-btn--icon', '\u2715');
    ((mB.type = 'button'),
      (mB.title = mx.length > 1 ? 'Remove this track and every strip on it' : 'Remove layer'),
      mB.addEventListener('click', () => DM(mb)),
      mv.appendChild(mB),
      mq.appendChild(mv),
      mW.appendChild(mq));
    {
      let S2 = mC(),
        S3 = (S5) => Math.round((S5 ?? 0) * S2) + 1,
        S4 = mO('ol', 'lib-comp__strips');
      for (let S5 of mx) {
        let S6 = DV.indexOf(S5),
          S7 = mO('li', 'lib-comp__strip');
        S7.appendChild(mO('span', 'lib-comp__strip-name', Dz(S5.id)));
        let S8 = S5.end ?? ss(mF(), Dm);
        S7.appendChild(mO('span', 'lib-comp__strip-at', S3(S5.start) + '\u2013' + S3(S8)));
        let S9 = mO(
          'button',
          'lib-btn lib-btn--icon lib-comp__strip-mirror' + (S5.mirror ? ' is-on' : ''),
          '\u21CB',
        );
        ((S9.type = 'button'),
          (S9.title = S5.mirror
            ? 'Mirrored \u2014 click to un-mirror this strip'
            : 'Mirror this strip only'),
          S9.setAttribute('aria-pressed', String(!!S5.mirror)),
          S9.addEventListener('click', () => DX(S6, { mirror: !S5.mirror })),
          S7.appendChild(S9));
        let Sk = mO(
          'button',
          'lib-btn lib-btn--icon lib-comp__strip-mirror' + (S5.reverse ? ' is-on' : ''),
          '\u25C2',
        );
        ((Sk.type = 'button'),
          (Sk.title = S5.reverse
            ? 'Reversed \u2014 click to play this strip forwards again'
            : 'Reverse this strip only'),
          Sk.setAttribute('aria-pressed', String(!!S5.reverse)),
          Sk.addEventListener('click', () => DX(S6, { reverse: !S5.reverse })),
          S7.appendChild(Sk));
        let Sw = document.createElement('input');
        ((Sw.type = 'number'),
          (Sw.className = 'lib-comp__strip-speed'),
          (Sw.min = '0.1'),
          (Sw.max = '4'),
          (Sw.step = '0.05'),
          (Sw.value = String(S5.speed > 0 ? S5.speed : 1)),
          (Sw.title = "This strip's speed \u2014 2 plays it twice as fast"),
          Sw.setAttribute('aria-label', 'Speed of ' + Dz(S5.id)),
          Sw.addEventListener('change', () => DX(S6, { speed: Number(Sw.value) })),
          S7.appendChild(Sw),
          S7.appendChild(mO('span', 'lib-comp__strip-x', '\u00D7')));
        let SV = S5.repeat ?? 'auto',
          SD = mS(S5.id) ? 'repeats' : 'holds',
          Sm = mO(
            'button',
            'lib-btn lib-comp__strip-repeat' + (SV !== 'auto' ? ' is-on' : ''),
            SV === 'auto' ? 'auto' : SV === 'repeat' ? 'loop' : 'hold',
          );
        ((Sm.type = 'button'),
          (Sm.title =
            (SV === 'auto'
              ? 'Auto \u2014 measured, so it ' + SD + ' after its clip ends'
              : SV === 'repeat'
                ? 'Forced to repeat after its clip ends'
                : 'Forced to hold its last pose') +
            '. Click to change: auto \u2192 loop \u2192 hold.'));
        let SS = { auto: 'repeat', repeat: 'hold', hold: 'auto' }[SV];
        if (
          (Sm.addEventListener('click', () => DX(S6, { repeat: SS })),
          S7.appendChild(Sm),
          mx.length > 1)
        ) {
          let SE = mO('button', 'lib-btn lib-btn--icon', '\u2715');
          ((SE.type = 'button'),
            (SE.title = 'Remove this strip'),
            SE.addEventListener('click', () => Db(S6)),
            S7.appendChild(SE));
        }
        S4.appendChild(S7);
      }
      mW.appendChild(S4);
    }
    let mG = mO('button', 'lib-comp__addstrip', '+ Strip after');
    if (
      ((mG.type = 'button'),
      (mG.title = 'Add the clips ticked in the grid to this track, after its last strip'),
      mG.addEventListener('click', () => Dn(mb)),
      my)
    )
      return (
        mW.appendChild(
          mO(
            'p',
            'lib-comp__note',
            'Owns every region no layer above claims. Root and pelvis always follow whoever owns the legs.',
          ),
        ),
        mW.appendChild(mG),
        mW
      );
    if ((mW.appendChild(mU('Layer', mL.weight ?? 1, (SF) => m5(mn, SF))), DR.has(mb))) {
      let SF = mO('div', 'lib-comp__regions');
      for (let SC of D8().keys) {
        let SH = m1(mL, SC),
          SR = SH !== null,
          SQ = mO('div', 'lib-comp__region' + (SR ? ' is-on' : '')),
          Sj = mO('button', 'lib-comp__tick', SR ? '\u2713' : '');
        ((Sj.type = 'button'),
          (Sj.title = SR ? 'Stop owning this region' : 'Own this region'),
          Sj.addEventListener('click', () => m3(mn, SC)),
          SQ.appendChild(Sj),
          SQ.appendChild(mO('span', 'lib-comp__region-name', D8().labels[SC])));
        let Sz = document.createElement('input');
        ((Sz.type = 'range'),
          (Sz.className = 'lib-comp__slider'),
          (Sz.min = '0'),
          (Sz.max = '100'),
          (Sz.step = '1'),
          (Sz.value = String(Math.round((SR ? SH : 1) * 100))),
          (Sz.disabled = !SR),
          Sz.setAttribute('aria-label', D8().labels[SC] + ' influence'));
        let SO = mO('span', 'lib-comp__pct', SR ? Math.round(SH * 100) + '%' : '\u2014');
        (Sz.addEventListener('input', () => {
          ((SO.textContent = Sz.value + '%'), m4(mn, SC, Number(Sz.value) / 100));
        }),
          SQ.appendChild(Sz),
          SQ.appendChild(SO),
          SF.appendChild(SQ));
      }
      mW.appendChild(SF);
    } else {
      let SJ = mO('div', 'lib-comp__chips');
      for (let SZ of D8().keys) {
        let SU = m1(mL, SZ),
          SK = SU !== null,
          ST = mO(
            'button',
            'lib-chip' + (SK ? ' is-on' : ''),
            SK && SU < 1 ? D8().labels[SZ] + ' ' + Math.round(SU * 100) + '%' : D8().labels[SZ],
          );
        ((ST.type = 'button'), ST.addEventListener('click', () => m3(mn, SZ)), SJ.appendChild(ST));
      }
      mW.appendChild(SJ);
    }
    let mg = mO('div', 'lib-comp__presets');
    for (let SA of Object.keys(D8().presets)) {
      let Sn = mO('button', 'lib-comp__preset', SA);
      ((Sn.type = 'button'), Sn.addEventListener('click', () => m6(mn, SA)), mg.appendChild(Sn));
    }
    return (mW.appendChild(mg), mW.appendChild(mG), mW);
  }
  function mU(mn, mo, mX) {
    let mL = mO('div', 'lib-comp__master');
    mL.appendChild(mO('span', 'lib-comp__region-name', mn));
    let mb = document.createElement('input');
    ((mb.type = 'range'),
      (mb.className = 'lib-comp__slider'),
      (mb.min = '0'),
      (mb.max = '100'),
      (mb.step = '1'),
      (mb.value = String(Math.round(mo * 100))),
      mb.setAttribute('aria-label', mn + ' influence'));
    let mx = mO('span', 'lib-comp__pct', Math.round(mo * 100) + '%');
    return (
      mb.addEventListener('input', () => {
        ((mx.textContent = mb.value + '%'), mX(Number(mb.value) / 100));
      }),
      mL.appendChild(mb),
      mL.appendChild(mx),
      mL
    );
  }
  function mK() {
    let mn = mO('div', 'lib-comp__report');
    if (DV.length < 1)
      return (
        mn.appendChild(
          mO(
            'p',
            'lib-comp__hint',
            'Add clips to compose \u2014 or drag them onto the Strips timeline.',
          ),
        ),
        mn
      );
    let mo = Bc(mF(), { fps: mC(), duration: Dm, range: DS });
    (DS?.start > 0 && DQ && (mo.loops = Os(DQ).seam <= Ur),
      mn.appendChild(
        mO(
          'div',
          'lib-comp__dur',
          mo.duration.toFixed(2) +
            ' s @ ' +
            mo.fps +
            ' fps \u00B7 ' +
            (mo.loops ? 'loops' : 'one-shot'),
        ),
      ));
    for (let mX of mo.layers) {
      let mL = mO('div', 'lib-comp__tile' + (mX.tiles ? '' : ' is-warn'));
      (mL.appendChild(mO('span', 'lib-comp__tile-name', mX.name)),
        mL.appendChild(
          mO(
            'span',
            'lib-comp__tile-note',
            mX.duration.toFixed(2) +
              ' s \u00B7 ' +
              (mX.tiles ? '\u2713' : '\u2717') +
              ' ' +
              mX.note,
          ),
        ),
        mX.suggest?.length &&
          mL.appendChild(
            mO('span', 'lib-comp__tile-fix', 'try ' + mX.suggest.join(' s or ') + ' s'),
          ),
        mn.appendChild(mL));
    }
    return (mn.appendChild(DS ? mA() : mT(mo)), mn);
  }
  function mT(mn) {
    let mo = mO('div', 'lib-comp__len');
    mo.appendChild(mO('span', 'lib-comp__len-label', 'Length'));
    let mX = (mb) => Math.abs(mb - mn.duration) < 0.001;
    for (let mb of mn.lengths) {
      let mx = mO(
        'button',
        'lib-btn lib-btn--sm' + (mX(mb.seconds) ? ' is-on' : ''),
        mb.seconds.toFixed(2) + ' s',
      );
      ((mx.type = 'button'),
        (mx.title = mb.note + ' \u2014 ' + mb.frames + ' frames'),
        mx.appendChild(mO('span', 'lib-comp__len-note', mb.note)),
        mx.addEventListener('click', () => mR(mb.note === 'base' ? null : mb.seconds)),
        mo.appendChild(mx));
    }
    let mL = document.createElement('input');
    return (
      (mL.type = 'number'),
      (mL.className = 'lib-comp__len-input'),
      (mL.step = '0.1'),
      (mL.min = '0.1'),
      (mL.value = mn.duration.toFixed(2)),
      (mL.title = 'Composite length in seconds'),
      mL.addEventListener('change', () => mR(Number(mL.value))),
      mo.appendChild(mL),
      mo
    );
  }
  function mA() {
    let mn = mO('div', 'lib-comp__len');
    mn.appendChild(mO('span', 'lib-comp__len-label', 'Range'));
    let mo = mC();
    mn.appendChild(
      mO(
        'span',
        'lib-comp__len-note',
        'frames ' +
          (Math.round(DS.start * mo) + 1) +
          '\u2013' +
          (Math.round(DS.end * mo) + 1) +
          ', set in Strips',
      ),
    );
    let mX = mO('button', 'lib-btn lib-btn--sm', 'Automatic');
    return (
      (mX.type = 'button'),
      (mX.title = 'Let the strips decide the length again'),
      mX.addEventListener('click', () => mH('auto')),
      mn.appendChild(mX),
      mn
    );
  }
  return (
    mJ(),
    {
      restore: mw,
      shareUrl: mz,
      getComposite: () => DQ,
      isActive: () => !!DQ,
      sourceIds: () => [...new Set(DV.filter((mn) => !DH(mn.track)).map((mn) => mn.id))],
      getStack: () =>
        DQ
          ? {
              length: DS ? DS.end - DS.start : ss(mF(), Dm),
              offset: DS ? DS.start : 0,
              range: DS ? { ...DS } : null,
              fps: mC(),
              layers: DV.map((mn, mo) => ({
                id: mn.id,
                uid: (mn.uid ??= ++DE),
                label: Dz(mn.id),
                duration: Dj.get(mn.id)?.duration ?? D5[mn.id]?.duration ?? 0,
                loops: mE(mn),
                regions: mo === 0 ? null : Object.keys(mn.regions || {}),
                weight: mn.weight ?? 1,
                start: mn.start ?? 0,
                end: mn.end ?? null,
                clipIn: mn.clipIn ?? 0,
                fadeIn: mn.fadeIn ?? 0,
                fadeOut: mn.fadeOut ?? 0,
                track: mn.track,
                speed: mn.speed > 0 ? mn.speed : 1,
                mirror: !!mn.mirror,
                reverse: !!mn.reverse,
                origin: !!mn.origin,
                repeat: mn.repeat ?? 'auto',
                measured: mS(mn.id),
                feet: D5[mn.id]?.feet ?? null,
                frames: D5[mn.id]?.frames ?? null,
                trackName: DF.get(mn.track)?.name ?? null,
                mute: !!DF.get(mn.track)?.mute,
                solo: !!DF.get(mn.track)?.solo,
                muted: DH(mn.track),
                regionWeights: { ...(mn.regions || {}) },
              })),
            }
          : null,
      setTiming: m7,
      setStripProps: DX,
      moveStripToTrack: m8,
      removeStrip: DN,
      splitStrip: DW,
      splitStrips: DI,
      moveStrips: DB,
      removeStrips: DG,
      duplicateStrips: Dg,
      setTrack: Dh,
      copyStrip: Dq,
      copyStrips: DY,
      paste: Dv,
      hasClipboard: () => !!DP?.length,
      dropStrip: DL,
      setRange: mH,
      playSequence: me,
      clear: m9,
      refresh: mJ,
    }
  );
}
var Wc = 'cgstuff.lib.tools',
  Vc = '__collapsed__';
function Gc({ rail: D3, panel: D4, onChange: D5 = () => {} }) {
  let D6 = [...D3.querySelectorAll('[data-tool]')],
    D7 = [...D4.querySelectorAll('[data-tool]')];
  if (!D6.length) return { get: () => [], show: () => {}, hide: () => {}, collapse: () => {} };
  let D8 = D6.map((DV) => DV.dataset.tool),
    D9 = new Set();
  function Dk() {
    for (let DD of D6) {
      let Dm = D9.has(DD.dataset.tool);
      (DD.classList.toggle('is-on', Dm), DD.setAttribute('aria-pressed', String(Dm)));
    }
    let DV = !1;
    for (let DS of D7) {
      let DE = D9.has(DS.dataset.tool);
      ((DS.hidden = !DE), DS.classList.toggle('is-first', DE && !DV), DE && (DV = !0));
    }
    ((D4.hidden = D9.size === 0), D3.setAttribute('aria-expanded', String(D9.size > 0)));
    try {
      localStorage.setItem(Wc, D9.size ? [...D9].join(',') : Vc);
    } catch {}
    D5([...D9]);
  }
  for (let DV of D6)
    DV.addEventListener('click', () => {
      let DD = DV.dataset.tool;
      if (D9.has(DD)) return;
      (D9.clear(), D9.add(DD), Dk());
    });
  let Dw = [D8[0]];
  try {
    let DD = localStorage.getItem(Wc);
    if (DD === Vc) Dw = [];
    else {
      if (DD) {
        let Dm = DD.split(',').filter((DS) => D8.includes(DS));
        Dm.length && (Dw = [Dm.at(-1)]);
      }
    }
  } catch {}
  for (let DS of Dw) D9.add(DS);
  return (
    Dk(),
    {
      get: () => [...D9],
      show: (DE) => {
        D8.includes(DE) && !D9.has(DE) && (D9.clear(), D9.add(DE), Dk());
        document.dispatchEvent(new CustomEvent('af:layout', { detail: { inspector: true, focus: 'normal' } }));
      },
      hide: (DE) => {
        D9.delete(DE) && Dk();
      },
      collapse: () => {
        (D9.clear(), Dk());
      },
      markEdited(DE) {
        let DF = new Set(DE ?? []);
        for (let DC of D6) DC.classList.toggle('is-edited', DF.has(DC.dataset.tool));
      },
    }
  );
}
function Yc({ mount: D3, player: D4, onChange: D5 = () => {} }) {
  let D6 = (Dw, DV, DD) => {
      let Dm = document.createElement(Dw);
      return (DV && (Dm.className = DV), DD != null && (Dm.textContent = DD), Dm);
    },
    D7 = () => D4.getState().cam ?? { has: !1 };
  function D8({
    label: Dw,
    value: DV,
    min: DD,
    max: Dm,
    step: DS,
    format: DE,
    hint: DF,
    apply: DC,
  }) {
    let Dt = D6('div', 'lib-adj__row');
    Dt.appendChild(D6('span', 'lib-adj__label', Dw));
    let DH = document.createElement('input');
    ((DH.type = 'range'),
      (DH.className = 'lib-comp__slider lib-adj__slider'),
      (DH.min = String(DD)),
      (DH.max = String(Dm)),
      (DH.step = String(DS)),
      (DH.value = String(DV)),
      (DH.title = DF));
    let De = D6('span', 'lib-comp__pct', DE(DV));
    return (
      DH.addEventListener('input', () => {
        let DR = Number(DH.value);
        ((De.textContent = DE(DR)), DC(DR), D5());
      }),
      Dt.appendChild(DH),
      Dt.appendChild(De),
      Dt
    );
  }
  function D9(Dw) {
    let DV = D6('div', 'lib-ik__row');
    DV.appendChild(D6('span', 'lib-adj__label', 'Show'));
    let DD = D6('div', 'lib-ik__modes');
    for (let [Dm, DS, DE, DF] of [
      [
        'Frustum',
        Dw.helper,
        () => D4.setCamHelper(!Dw.helper),
        'Draw the camera frustum in the viewport',
      ],
      [
        'Side view',
        Dw.view,
        () => D4.setCamView(!Dw.view),
        'Render what this camera sees, top right',
      ],
    ]) {
      let DC = D6('button', 'lib-btn lib-btn--axis' + (DS ? ' is-on' : ''), Dm);
      ((DC.type = 'button'),
        (DC.title = DF),
        DC.addEventListener('click', () => {
          (DE(), Dk(), D5());
        }),
        DD.appendChild(DC));
    }
    return (DV.appendChild(DD), DV);
  }
  function Dk() {
    D3.innerHTML = '';
    let Dw = D7(),
      DV = D6('div', 'lib-comp__head');
    if ((DV.appendChild(D6('span', 'lib-comp__title', 'Camera')), Dw.has)) {
      let De = D6('button', 'lib-btn lib-btn--sm', 'Reset');
      ((De.type = 'button'),
        (De.title =
          "Back to the rig's own lens \u2014 " + Math.round(Dw.defaults.fov) + '\u00B0 FOV'),
        De.addEventListener('click', () => {
          (D4.setCamOptions({ reset: !0 }), Dk(), D5());
        }),
        DV.appendChild(De));
    }
    if ((D3.appendChild(DV), !Dw.has)) {
      D3.appendChild(
        D6(
          'p',
          'lib-comp__hint',
          'This rig ships no camera. Export one from the addon bone-parented to a bone, and it will appear here.',
        ),
      );
      return;
    }
    D3.appendChild(D9(Dw));
    let DD = D6('div', 'lib-adj');
    (DD.appendChild(
      D8({
        label: 'FOV',
        value: Dw.fov,
        min: 10,
        max: 140,
        step: 1,
        format: (DR) => Math.round(DR) + '\u00B0',
        hint: 'Vertical field of view. Most FPS viewmodels sit between 60 and 90',
        apply: (DR) => D4.setCamOptions({ fov: DR }),
      }),
    ),
      DD.appendChild(
        D8({
          label: 'Near',
          value: Math.round(Dw.near * 1000),
          min: 1,
          max: 200,
          step: 1,
          format: (DR) => Math.round(DR) + ' mm',
          hint: 'Near clip plane. Raise it if the hands vanish, lower it if they are sliced open',
          apply: (DR) => D4.setCamOptions({ near: DR / 1000 }),
        }),
      ),
      DD.appendChild(
        D8({
          label: 'Inset',
          value: Math.round(Dw.size * 100),
          min: Math.round(Dw.sizeRange[0] * 100),
          max: Math.round(Dw.sizeRange[1] * 100),
          step: 1,
          format: (DR) => Math.round(DR) + '%',
          hint: 'How much of the viewport the side view takes',
          apply: (DR) => D4.setCamOptions({ size: DR / 100 }),
        }),
      ),
      D3.appendChild(DD));
    let Dm = Dw.follow ?? { weight: 0, verticalOnly: !0, source: 'Head' },
      DS = Dw.followSources ?? [],
      DE = D6('div', 'lib-comp__head');
    (DE.appendChild(D6('span', 'lib-comp__title', 'Head follow')), D3.appendChild(DE));
    let DF = D6('div', 'lib-adj');
    (DF.appendChild(
      D8({
        label: 'Position',
        value: Math.round(Dm.weight * 100),
        min: 0,
        max: 100,
        step: 1,
        format: (DR) => Math.round(DR) + '%',
        hint: "How much of the body's bob reaches the camera. Turn it down for a clip that animates the camera bone itself",
        apply: (DR) => D4.setCamFollow({ weight: DR / 100 }),
      }),
    ),
      DF.appendChild(
        D8({
          label: 'Rotation',
          value: Math.round((Dm.rotation ?? 0) * 100),
          min: 0,
          max: 100,
          step: 1,
          format: (DR) => Math.round(DR) + '%',
          hint: 'Turn the camera with the source bone. Preview only \u2014 in a game this belongs to the mouse, and inheriting it causes motion sickness',
          apply: (DR) => D4.setCamFollow({ rotation: DR / 100 }),
        }),
      ),
      D3.appendChild(DF));
    let DC = D6('div', 'lib-ik__row');
    DC.appendChild(D6('span', 'lib-adj__label', 'Axis'));
    let Dt = D6('div', 'lib-ik__modes');
    for (let [DR, DQ, Dj, Dz] of [
      ['Vertical', Dm.verticalOnly, !0, 'Up and down only \u2014 the bob worth having'],
      [
        'All',
        !Dm.verticalOnly,
        !1,
        'Side and forward sway too. Large on a run, and it reads as drunk',
      ],
    ]) {
      let DO = D6('button', 'lib-btn lib-btn--axis' + (DQ ? ' is-on' : ''), DR);
      ((DO.type = 'button'),
        (DO.title = Dz),
        DO.addEventListener('click', () => {
          (D4.setCamFollow({ verticalOnly: Dj }), Dk(), D5());
        }),
        Dt.appendChild(DO));
    }
    if ((DC.appendChild(Dt), D3.appendChild(DC), DS.length > 1)) {
      let DJ = D6('div', 'lib-ik__row');
      DJ.appendChild(D6('span', 'lib-adj__label', 'From'));
      let DZ = D6('div', 'lib-ik__modes');
      for (let DU of DS) {
        let DK = D6('button', 'lib-btn lib-btn--axis' + (DU === Dm.source ? ' is-on' : ''), DU);
        ((DK.type = 'button'),
          (DK.title = 'Take the bob from the \u201C' + DU + '\u201D bone'),
          DK.addEventListener('click', () => {
            (D4.setCamFollow({ source: DU }), Dk(), D5());
          }),
          DZ.appendChild(DK));
      }
      (DJ.appendChild(DZ), D3.appendChild(DJ));
    }
    let DH = Dm.rotation ?? 0;
    (D3.appendChild(
      D6(
        'p',
        'lib-comp__hint',
        Dm.weight <= 0 && DH <= 0
          ? "At 0 the camera only moves if a clip keys the camera bone. Raise Position to borrow the body's bob."
          : DH > 0
            ? 'Following \u201C' +
              Dm.source +
              '\u201D, rotation included \u2014 preview only. A game would take rotation from the mouse.'
            : 'Adding \u201C' +
              Dm.source +
              '\u201D movement on top of the camera bone, never its rotation.',
      ),
    ),
      D3.appendChild(
        D6(
          'p',
          'lib-comp__hint',
          Dw.bone
            ? 'Rides the \u201C' +
                Dw.bone +
                '\u201D bone, so it moves with whatever a clip does to it. Nothing keys it yet \u2014 author an FPS clip and it comes alive.'
            : 'Not parented to a bone, so it holds still while the body animates.',
        ),
      ));
  }
  return (Dk(), { render: Dk, get: () => D7() });
}
function Hc({
  mount: D3,
  player: D4,
  travels: D5 = () => !1,
  frames: D6 = () => null,
  seam: D7 = () => null,
  clock: D8 = () => null,
  advanced: D9 = () => !1,
  autoKey: Dk = () => !1,
  onChange: Dw = () => {},
}) {
  let DV = wY(),
    DD = new Map(),
    Dm = new Set(),
    DS = null;
  function DE() {
    DS === null &&
      (DS = requestAnimationFrame(() => {
        ((DS = null), D4.setAdjust(DV), Dw({ ...DV }), DL());
      }));
  }
  function DF(DY, Dv) {
    ((DV[DY] = Dv), DE());
  }
  function DC(DY) {
    let Dv = wx[DY];
    ((DV[DY] = Dv.neutral),
      DV.keys?.[DY] && ((DV.keys = { ...DV.keys }), delete DV.keys[DY]),
      DV.muted?.[DY] && ((DV.muted = { ...DV.muted }), delete DV.muted[DY]),
      DV.solo?.[DY] && ((DV.solo = { ...DV.solo }), delete DV.solo[DY]));
    let DB = DD.get(DY);
    (DB && ((DB.input.value = String(Dv.neutral)), (DB.out.textContent = DT(DY, Dv.neutral))),
      DW(DY),
      DE());
  }
  function Dt(DY, Dv) {
    let DB = Dv && !wM(Dv) ? Dv : null;
    if (DB) DV.ranges = { ...DV.ranges, [DY]: DB };
    else {
      let DG = { ...DV.ranges };
      (delete DG[DY], (DV.ranges = DG));
    }
    (DE(), Dx());
  }
  function DH() {
    ((DV = wY()), Dm.clear());
    for (let DY of wW) {
      let Dv = DD.get(DY),
        DB = wx[DY];
      Dv && ((Dv.input.value = String(DB.neutral)), (Dv.out.textContent = DT(DY, DB.neutral)));
    }
    (Dx(), DE());
  }
  let De = null,
    DR = null,
    DQ = (DY) => wv(DV, DY),
    Dj = (DY, Dv) => Math.min(wx[DY].max, Math.max(wx[DY].min, Number(Dv) || 0));
  function Dz(DY) {
    let Dv = DQ(DY);
    if (!Dv) return DV[DY] ?? wx[DY].neutral;
    let DB = D8();
    return VZ(Dv)(DB ? DB.u : 0);
  }
  function DO(DY) {
    let Dv = DQ(DY),
      DB = D8();
    if (!Dv || !DB) return null;
    let DG = VX(DB.u, DB.frames);
    return Dv.find((Dg) => VX(Dg.u, DB.frames) === DG) || null;
  }
  function DJ(DY, Dv) {
    let DB = { ...(DV.keys || {}) };
    (Dv?.length ? (DB[DY] = Dv) : delete DB[DY],
      (DV.keys = DB),
      Dv?.length || (DV[DY] = wx[DY].neutral),
      DE());
  }
  function DZ(DY, Dv = null) {
    let DB = D8(),
      DG = wx[DY];
    if (!DB || DG?.kind !== 'offset') return !1;
    let Dg = DQ(DY);
    if (!Dg) {
      let Dh = DV[DY] ?? DG.neutral,
        DN = wG(DV, DY);
      ((Dg = wM(DN) ? [] : wk(DN, Dh, DB.frames)),
        Dv == null && (Dv = Dg.length ? VZ(Dg)(DB.u) : Dh),
        (DV[DY] = DG.neutral));
      let DM = { ...DV.ranges };
      (delete DM[DY], (DV.ranges = DM), Dm.delete(DY));
    }
    let DI = Dv ?? VZ(Dg)(DB.u);
    return (DJ(DY, Vb(Dg, DB.u, Dj(DY, DI), DB.frames)), !0);
  }
  function DU(DY) {
    let Dv = D8();
    Dv && (DO(DY) ? DJ(DY, w6(DQ(DY), Dv.u, Dv.frames)) : DZ(DY), Dx());
  }
  function DK(DY) {
    let Dv = DD.get(DY);
    if (!Dv?.dia) return;
    let DB = !!DQ(DY),
      DG = !!DO(DY);
    (Dv.dia.classList.toggle('is-keyed', DB),
      Dv.dia.classList.toggle('is-on', DG),
      Dv.dia.setAttribute('aria-pressed', String(DG)),
      (Dv.dia.title = DG
        ? 'A key on this frame \u2014 click to remove it'
        : DB
          ? 'Key this frame (K)'
          : 'Key this slider here \u2014 it then follows its keys (K)'));
  }
  let DT = (DY, Dv) => {
      let DB = wx[DY],
        DG = (DB.step ?? 1) < 1 ? 2 : 0;
      return '' + Dv.toFixed(DG) + DB.unit;
    },
    DA = (DY, Dv, DB) => {
      let DG = document.createElement(DY);
      return (Dv && (DG.className = Dv), DB != null && (DG.textContent = DB), DG);
    },
    Dn = null,
    DX = null;
  function DL() {
    if (!Dn) return;
    let DY = w4(DV) && D5();
    if (((Dn.hidden = !DY), DX)) {
      let Dv = D7(),
        DB = Dv && Dv.before <= Db && Dv.after > Db;
      ((DX.hidden = !DB),
        DB &&
          (DX.textContent =
            'This clip used to loop cleanly. With these windows it ends ' +
            Math.round(Dv.after) +
            '\u00B0 from where it starts, so it will pop each time it repeats. End the window before the last frame to keep the loop.'));
    }
  }
  let Db = 3;
  function Dx() {
    ((D3.innerHTML = ''), DD.clear());
    let DY = DA('div', 'lib-comp__head');
    DY.appendChild(DA('span', 'lib-comp__title', 'Adjust'));
    let Dv = DA('button', 'lib-btn lib-btn--sm', 'Reset all');
    ((Dv.type = 'button'),
      Dv.addEventListener('click', DH),
      DY.appendChild(Dv),
      D3.appendChild(DY));
    let DB = DA('div', 'lib-adj');
    for (let Dg of wq) {
      DB.appendChild(Dy(Dg));
      let DI = DD.get(Dg)?.chip;
      (DI && DB.appendChild(DI), Dm.has(Dg) && D6() && DB.appendChild(DQ(Dg) ? Dq(Dg) : DP(Dg)));
    }
    D3.appendChild(DB);
    let DG = DA('div', 'lib-adj lib-adj--split');
    for (let Dh of wP) DG.appendChild(Dy(Dh));
    (D3.appendChild(DG),
      (Dn = DA(
        'p',
        'lib-adj__warn',
        'Leg offsets move where the feet land, but the clip still travels its original distance \u2014 expect foot slide.',
      )),
      (Dn.hidden = !0),
      D3.appendChild(Dn),
      (DX = DA('p', 'lib-adj__warn', '')),
      (DX.hidden = !0),
      D3.appendChild(DX),
      DL());
  }
  function Dy(DY) {
    let Dv = wx[DY],
      DB = DA('div', 'lib-adj__row');
    DB.appendChild(DA('span', 'lib-adj__label', Dv.label));
    let DG = document.createElement('input');
    ((DG.type = 'range'),
      (DG.className = 'lib-comp__slider lib-adj__slider'),
      (DG.min = String(Dv.min)),
      (DG.max = String(Dv.max)),
      (DG.step = String(Dv.step ?? 1)));
    let Dg = !!DQ(DY);
    ((DG.value = String(Dg ? Dz(DY) : (DV[DY] ?? Dv.neutral))),
      DG.setAttribute('aria-label', Dv.label),
      Dg && DB.classList.add('is-keyed'),
      DG.style.setProperty('--neutral', ((Dv.neutral - Dv.min) / (Dv.max - Dv.min)) * 100 + '%'));
    let DI = DA('span', 'lib-comp__pct', DT(DY, Dg ? Dz(DY) : (DV[DY] ?? Dv.neutral)));
    if (
      (Dv.kind === 'offset' &&
        wB(DV, DY) &&
        (DB.classList.add('is-muted'),
        (DB.title = DV.muted?.[DY]
          ? 'Muted in Strips \u2014 kept, not applied'
          : 'Silent while another control is soloed in Strips')),
      DG.addEventListener('input', () => {
        ((De = DY),
          (DI.textContent = DT(DY, Number(DG.value))),
          DQ(DY)
            ? DZ(DY, Number(DG.value))
            : Dk() && DZ(DY, Number(DG.value))
              ? (DR = DY)
              : DF(DY, Number(DG.value)),
          DW(DY),
          DK(DY));
      }),
      DG.addEventListener('change', () => {
        DR === DY && ((DR = null), Dx());
      }),
      DG.addEventListener('pointerdown', () => {
        De = DY;
      }),
      DG.addEventListener('dblclick', () => DC(DY)),
      (DI.title = 'Double-click the slider to reset'),
      DB.appendChild(DG),
      DB.appendChild(DI),
      DD.set(DY, { input: DG, out: DI }),
      Dv.kind === 'offset' && (D9() || Dg))
    ) {
      let Dh = DA('button', 'lib-adj__key', '\u25C6');
      ((Dh.type = 'button'),
        Dh.addEventListener('click', () => {
          ((De = DY), DU(DY));
        }),
        DB.appendChild(Dh),
        (DD.get(DY).dia = Dh),
        DK(DY));
    }
    if (Dv.kind === 'offset' && D6()) {
      let DN = DA('button', 'lib-adj__more', wM(wG(DV, DY)) ? '\u2304' : '\u2303');
      ((DN.type = 'button'),
        (DN.title = 'Apply over part of the clip'),
        DN.addEventListener('click', () => {
          (Dm.has(DY) ? Dm.delete(DY) : Dm.add(DY), Dx());
        }),
        DB.appendChild(DN),
        wM(wG(DV, DY)) || DB.classList.add('is-ranged'));
      let DM = DA('button', 'lib-adj__span');
      ((DM.type = 'button'),
        DM.addEventListener('click', () => {
          (Dm.has(DY) ? Dm.delete(DY) : Dm.add(DY), Dx());
        }),
        Object.assign(DD.get(DY), { chip: DM, toggle: DN }),
        DW(DY));
    }
    return DB;
  }
  function DW(DY) {
    let Dv = DD.get(DY);
    if (!Dv?.chip) return;
    let DB = wx[DY],
      DG = DQ(DY);
    if (DG) {
      let m0 = Dm.has(DY);
      ((Dv.chip.hidden = !1),
        (Dv.toggle.hidden = !0),
        (Dv.chip.textContent =
          DG.length + ' key' + (DG.length === 1 ? '' : 's') + (m0 ? ' \u25B4' : ' \u25BE')),
        (Dv.chip.title = 'Follows its keys \u2014 click for their frames'),
        Dv.chip.classList.add('is-ranged'),
        Dv.chip.setAttribute('aria-expanded', String(m0)));
      return;
    }
    let Dg = wG(DV, DY),
      DI = wM(Dg),
      Dh = Math.abs((DV[DY] ?? DB.neutral) - DB.neutral) > 0.000001,
      DN = Dm.has(DY);
    ((Dv.chip.hidden = DI && !Dh && !DN), (Dv.toggle.hidden = !Dv.chip.hidden));
    let DM = DN ? ' \u25B4' : ' \u25BE';
    if (DI)
      ((Dv.chip.textContent = 'Whole clip' + DM),
        (Dv.chip.title = 'Applies to every frame \u2014 click to limit it to part of the clip'));
    else {
      let m1 = V6(Dg, D6());
      ((Dv.chip.textContent =
        'Frames ' +
        m1.start +
        '\u2013' +
        m1.end +
        (m1.blendIn > 0 || m1.blendOut > 0
          ? ' \u00B7 fades ' + m1.blendIn + '/' + m1.blendOut
          : '') +
        DM),
        (Dv.chip.title = 'Applies to part of the clip \u2014 click to change which frames'));
    }
    (Dv.chip.classList.toggle('is-ranged', !DI), Dv.chip.setAttribute('aria-expanded', String(DN)));
  }
  function Dq(DY) {
    let Dv = D6(),
      DB = DQ(DY) || [],
      DG = DA('div', 'lib-adj__range lib-adj__keys'),
      Dg = DB.map((Dh) => Math.round(Dh.u * (Dv - 1)) + 1).join(' \u00B7 ');
    DG.appendChild(
      DA('span', 'lib-adj__range-note', 'Keys on frame' + (DB.length === 1 ? '' : 's') + ' ' + Dg),
    );
    let DI = DA('button', 'lib-btn lib-btn--sm', 'Clear keys');
    return (
      (DI.type = 'button'),
      (DI.title = 'Remove every key \u2014 the slider goes back to neutral (Ctrl+Z undoes)'),
      DI.addEventListener('click', () => {
        (DJ(DY, null), Dm.delete(DY), Dx());
      }),
      DG.appendChild(DI),
      DG
    );
  }
  function DP(DY) {
    let Dv = D6(),
      DB = DA('div', 'lib-adj__range'),
      DG = V6(wG(DV, DY), Dv),
      Dg = () => V6(wG(DV, DY), Dv),
      DI = (m0, m1, m2, m3, m4) => {
        let m5 = DA('label', 'lib-adj__range-cell');
        m5.appendChild(DA('span', null, m0));
        let m6 = document.createElement('input');
        return (
          (m6.type = 'number'),
          (m6.min = String(m2)),
          (m6.max = String(m3)),
          (m6.value = String(m1)),
          m6.addEventListener('change', () => m4(Number(m6.value))),
          m5.appendChild(m6),
          m5
        );
      };
    (DB.appendChild(
      DI('From', DG.start, 1, Dv, (m0) => {
        let m1 = Dg();
        Dt(DY, V7({ ...m1, start: Math.min(m0, m1.end) }, Dv));
      }),
    ),
      DB.appendChild(
        DI('To', DG.end, 1, Dv, (m0) => {
          let m1 = Dg();
          Dt(DY, V7({ ...m1, end: Math.max(m0, m1.start) }, Dv));
        }),
      ),
      DB.appendChild(
        DI('Fade in', DG.blendIn, 0, Dv, (m0) => {
          let m1 = Dg();
          Dt(DY, V7({ ...m1, blendIn: Math.max(0, m0) }, Dv));
        }),
      ),
      DB.appendChild(
        DI('Fade out', DG.blendOut, 0, Dv, (m0) => {
          let m1 = Dg();
          Dt(DY, V7({ ...m1, blendOut: Math.max(0, m0) }, Dv));
        }),
      ));
    let Dh = () => {
        let m0 = D4.getState?.() || {};
        return m0.duration > 0
          ? V6({ start: Math.min(1, Math.max(0, (m0.time || 0) / m0.duration)) }, Dv).start
          : null;
      },
      DN = (m0, m1, m2) => {
        let m3 = DA('button', 'lib-btn lib-btn--sm lib-adj__here', m0);
        return (
          (m3.type = 'button'),
          (m3.title = m1),
          m3.addEventListener('click', () => {
            let m4 = Dh();
            m4 != null && m2(m4);
          }),
          m3
        );
      };
    (DB.appendChild(
      DN('From here', 'Start at the playhead', (m0) => {
        let m1 = Dg();
        Dt(DY, V7({ ...m1, start: m0, end: Math.max(m1.end, m0) }, Dv));
      }),
    ),
      DB.appendChild(
        DN('To here', 'End at the playhead', (m0) => {
          let m1 = Dg();
          Dt(DY, V7({ ...m1, end: m0, start: Math.min(m1.start, m0) }, Dv));
        }),
      ));
    let DM = DA('button', 'lib-btn lib-btn--sm', 'Whole clip');
    return (
      (DM.type = 'button'),
      DM.addEventListener('click', () => {
        (Dt(DY, { ...wI }), Dx());
      }),
      DB.appendChild(DM),
      DG.end >= Dv &&
        DG.blendOut > 0 &&
        DB.appendChild(
          DA(
            'span',
            'lib-adj__range-note',
            'ends at the last frame, so it holds rather than fading out',
          ),
        ),
      DB
    );
  }
  return (
    Dx(),
    {
      get: () => ({ ...DV }),
      isNeutral: () => wg(DV),
      set: (DY) => {
        ((DV = { ...wY(), ...DY }),
          (DV.ranges = { ...(DY?.ranges || {}) }),
          (DV.muted = { ...(DY?.muted || {}) }),
          (DV.solo = { ...(DY?.solo || {}) }),
          (DV.keys = { ...(DY?.keys || {}) }),
          Dm.clear());
        for (let Dv of Object.keys(DV.ranges)) Dm.add(Dv);
        (Dx(), DE());
      },
      reset: DH,
      refreshWarning: DL,
      refresh: () => {
        (Dx(), DL());
      },
      setRange: (DY, Dv) => Dt(DY, Dv),
      setValue: (DY, Dv, { live: DB = !1 } = {}) => {
        let DG = wx[DY];
        if (!DG) return;
        let Dg = Math.min(DG.max, Math.max(DG.min, Number(Dv))),
          DI = DD.get(DY);
        (DI && ((DI.input.value = String(Dg)), (DI.out.textContent = DT(DY, Dg))),
          (De = DY),
          DQ(DY) ? DZ(DY, Dg) : (Dk() && DZ(DY, Dg)) || DF(DY, Dg),
          DB || Dx());
      },
      keyAt: (DY) => {
        let Dv = DZ(DY);
        return (Dx(), Dv);
      },
      toggleKey: DU,
      setCurve: (DY, Dv) => {
        (DJ(DY, Dv), Dx());
      },
      lastTouched: () => De,
      tick: () => {
        for (let [DY, Dv] of DD)
          if (DQ(DY)) {
            if (document.activeElement !== Dv.input) {
              let DB = Dz(DY);
              ((Dv.input.value = String(DB)), (Dv.out.textContent = DT(DY, DB)));
            }
            DK(DY);
          }
      },
      setFlags: (DY, Dv = {}) => {
        if (wx[DY]) {
          for (let DB of ['mute', 'solo']) {
            if (!(DB in Dv)) continue;
            let DG = DB === 'mute' ? 'muted' : 'solo',
              Dg = { ...(DV[DG] || {}) };
            (Dv[DB] ? (Dg[DY] = !0) : delete Dg[DY], (DV[DG] = Dg));
          }
          (DE(), Dx());
        }
      },
      resetKey: (DY) => {
        (DC(DY), Dx());
      },
    }
  );
}
function Xc({
  mount: D3,
  player: D4,
  props: D5 = {},
  THREE: D6,
  loadGlb: D7,
  onChange: D8 = () => {},
}) {
  let D9 = new Map(),
    Dk = new Map(),
    Dw = new Map(),
    DV = () => ({ ...D5, ...Object.fromEntries(D9) });
  async function DD(DQ, Dj, Dz, { persist: DO = !0 } = {}) {
    let DJ = await D7(Dz.slice(0));
    if (!DJ) throw new Error('that file has no scene in it');
    let DZ = null;
    try {
      DZ = ke(DJ, D6);
    } catch {}
    return (
      DZ && Dk.set(DQ, DZ),
      D9.set(DQ, { label: Dj, scene: DJ }),
      DO && (await VY(Vq, { id: DQ, label: Dj, bytes: Dz, thumb: DZ || void 0, at: Date.now() })),
      DQ
    );
  }
  async function Dm() {
    let DQ = [];
    try {
      DQ = await VP(Vq);
    } catch (Dj) {
      return (console.warn('[Props] stored props are unavailable:', Dj.message), 0);
    }
    for (let Dz of DQ)
      if (!(!Dz?.id || !Dz.bytes)) {
        Dz.thumb && Dk.set(Dz.id, Dz.thumb);
        try {
          await DD(Dz.id, Dz.label, Dz.bytes, { persist: !1 });
        } catch (DO) {
          console.warn('[Props] could not read "' + Dz.label + '":', DO.message);
        }
      }
    return (DQ.length && De(), DQ.length);
  }
  async function DS(DQ) {
    let Dj = D4.getState().props ?? {};
    for (let Dz of ['l', 'r']) Dj[Dz] === DQ && (await D4.setProp(null, null, Dz));
    (D9.delete(DQ), Dk.delete(DQ));
    try {
      await Vv(Vq, DQ);
    } catch {}
    (De(), D8(D4.getState().props));
  }
  let DE = (DQ, Dj, Dz) => {
    let DO = document.createElement(DQ);
    return (Dj && (DO.className = Dj), Dz != null && (DO.textContent = Dz), DO);
  };
  async function DF(DQ, Dj) {
    let Dz = D4.getState().props?.[Dj] === DQ ? null : DQ;
    (await D4.setProp(Dz, Dz ? DV()[Dz] : null, Dj), De(), D8(D4.getState().props));
  }
  function DC() {
    let DQ = D4.getState().props ?? {};
    for (let [Dj, Dz] of Dw) {
      for (let DO of ['l', 'r']) Dz.btn[DO].classList.toggle('is-on', DQ[DO] === Dj);
      Dz.root.classList.toggle('is-held', DQ.l === Dj || DQ.r === Dj);
    }
  }
  async function Dt(DQ, Dj, Dz) {
    if (Dk.has(DQ)) {
      Dz.src = Dk.get(DQ);
      return;
    }
    try {
      let DO = Dj.scene ?? (await D4.loadPropScene(DQ, Dj));
      if (!DO) return;
      let DJ = ke(DO, D6);
      DJ && (Dk.set(DQ, DJ), (Dz.src = DJ));
    } catch {}
  }
  function DH(DQ, Dj) {
    let Dz = DE('div', 'lib-prop'),
      DO = document.createElement('img');
    ((DO.className = 'lib-prop__thumb'),
      (DO.alt = ''),
      (DO.loading = 'lazy'),
      Dz.appendChild(DO),
      Dt(DQ, Dj, DO),
      Dz.appendChild(DE('span', 'lib-prop__name', Dj.label || DQ)));
    let DJ = DE('div', 'lib-prop__hands'),
      DZ = {};
    for (let DU of ['l', 'r']) {
      let DK = DE('button', 'lib-btn lib-btn--axis', DU.toUpperCase());
      ((DK.type = 'button'),
        (DK.title = 'Hold in the ' + (DU === 'l' ? 'left' : 'right') + ' hand'),
        (DK.disabled = !D4.getState().hands?.[DU]),
        DK.addEventListener('click', () => DF(DQ, DU)),
        DJ.appendChild(DK),
        (DZ[DU] = DK));
    }
    if ((Dz.appendChild(DJ), D9.has(DQ))) {
      let DT = DE('button', 'lib-prop__rm', '\u00D7');
      ((DT.type = 'button'),
        (DT.title = 'Remove ' + (Dj.label || DQ)),
        DT.addEventListener('click', (DA) => {
          (DA.stopPropagation(), DS(DQ));
        }),
        Dz.appendChild(DT));
    }
    return (Dw.set(DQ, { root: Dz, btn: DZ }), Dz);
  }
  function De() {
    ((D3.innerHTML = ''), Dw.clear());
    let DQ = DE('div', 'lib-comp__head');
    DQ.appendChild(DE('span', 'lib-comp__title', 'Props'));
    let Dj = DE('button', 'lib-btn lib-btn--sm', 'Empty hands');
    ((Dj.type = 'button'),
      Dj.addEventListener('click', async () => {
        (await D4.setProp(null, null, 'l'),
          await D4.setProp(null, null, 'r'),
          DC(),
          D8(D4.getState().props));
      }),
      DQ.appendChild(Dj),
      D3.appendChild(DQ));
    let Dz = Object.entries(DV());
    if (!Dz.length)
      D3.appendChild(DE('p', 'lib-comp__hint', 'No props yet. Drop a .glb here to try one.'));
    else {
      let DO = DE('div', 'lib-props__grid');
      for (let [DJ, DZ] of Dz) DO.appendChild(DH(DJ, DZ));
      D3.appendChild(DO);
    }
    (D3.appendChild(
      DE(
        'p',
        'lib-comp__hint',
        'Drop a .glb to add your own. It is kept in this browser \u2014 nothing is uploaded.',
      ),
    ),
      DC());
  }
  (D3.addEventListener('dragover', (DQ) => {
    (DQ.preventDefault(), D3.classList.add('is-dropping'));
  }),
    D3.addEventListener('dragleave', () => D3.classList.remove('is-dropping')));
  async function DR(DQ) {
    if (!/\.(glb|gltf)$/i.test(DQ?.name ?? '')) return !1;
    let Dj = DQ.name.replace(/\.(glb|gltf)$/i, ''),
      Dz = 'drop:' + Dj;
    try {
      return (await DD(Dz, Dj, await DQ.arrayBuffer()), De(), !0);
    } catch (DO) {
      return (console.warn('[Props] could not read that file:', DO.message), !1);
    }
  }
  return (
    D3.addEventListener('drop', (DQ) => {
      (DQ.preventDefault(), D3.classList.remove('is-dropping'));
      let Dj = [...(DQ.dataTransfer?.files ?? [])].find((Dz) => /\.(glb|gltf)$/i.test(Dz.name));
      Dj && DR(Dj);
    }),
    De(),
    Dm(),
    {
      refresh: DC,
      render: De,
      restore: Dm,
      forget: DS,
      addFile: DR,
      get: () => D4.getState().props,
    }
  );
}
var Nf = (() => {
  let D3 = new Uint32Array(256);
  for (let D4 = 0; D4 < 256; D4++) {
    let D5 = D4;
    for (let D6 = 0; D6 < 8; D6++) D5 = D5 & 1 ? 3988292384 ^ (D5 >>> 1) : D5 >>> 1;
    D3[D4] = D5 >>> 0;
  }
  return D3;
})();
function Bf(D3) {
  let D4 = 4294967295;
  for (let D5 = 0; D5 < D3.length; D5++) D4 = Nf[(D4 ^ D3[D5]) & 255] ^ (D4 >>> 8);
  return (D4 ^ 4294967295) >>> 0;
}
function jf(D3 = new Date()) {
  let D4 =
      ((D3.getHours() & 31) << 11) | ((D3.getMinutes() & 63) << 5) | ((D3.getSeconds() / 2) & 31),
    D5 =
      (((D3.getFullYear() - 1980) & 127) << 9) |
      (((D3.getMonth() + 1) & 15) << 5) |
      (D3.getDate() & 31);
  return { time: D4, date: D5 };
}
function Jc() {
  let D3 = [];
  async function D4(D6, D7) {
    let D8 = D7 instanceof Blob ? new Uint8Array(await D7.arrayBuffer()) : new Uint8Array(D7);
    D3.push({ name: D6, bytes: D8, crc: Bf(D8), ...jf() });
  }
  async function D5() {
    let D6 = new TextEncoder(),
      D7 = [],
      D8 = [],
      D9 = 0;
    for (let DV of D3) {
      let DD = D6.encode(DV.name),
        Dm = new DataView(new ArrayBuffer(30));
      (Dm.setUint32(0, 67324752, !0),
        Dm.setUint16(4, 20, !0),
        Dm.setUint16(6, 0, !0),
        Dm.setUint16(8, 0, !0),
        Dm.setUint16(10, DV.time, !0),
        Dm.setUint16(12, DV.date, !0),
        Dm.setUint32(14, DV.crc, !0),
        Dm.setUint32(18, DV.bytes.length, !0),
        Dm.setUint32(22, DV.bytes.length, !0),
        Dm.setUint16(26, DD.length, !0),
        Dm.setUint16(28, 0, !0),
        D7.push(new Uint8Array(Dm.buffer), DD, DV.bytes));
      let DS = new DataView(new ArrayBuffer(46));
      (DS.setUint32(0, 33639248, !0),
        DS.setUint16(4, 20, !0),
        DS.setUint16(6, 20, !0),
        DS.setUint16(8, 0, !0),
        DS.setUint16(10, 0, !0),
        DS.setUint16(12, DV.time, !0),
        DS.setUint16(14, DV.date, !0),
        DS.setUint32(16, DV.crc, !0),
        DS.setUint32(20, DV.bytes.length, !0),
        DS.setUint32(24, DV.bytes.length, !0),
        DS.setUint16(28, DD.length, !0),
        DS.setUint16(30, 0, !0),
        DS.setUint16(32, 0, !0),
        DS.setUint16(34, 0, !0),
        DS.setUint16(36, 0, !0),
        DS.setUint32(38, 0, !0),
        DS.setUint32(42, D9, !0),
        D8.push(new Uint8Array(DS.buffer), DD),
        (D9 += 30 + DD.length + DV.bytes.length));
    }
    let Dk = D8.reduce((DE, DF) => DE + DF.length, 0),
      Dw = new DataView(new ArrayBuffer(22));
    return (
      Dw.setUint32(0, 101010256, !0),
      Dw.setUint16(4, 0, !0),
      Dw.setUint16(6, 0, !0),
      Dw.setUint16(8, D3.length, !0),
      Dw.setUint16(10, D3.length, !0),
      Dw.setUint32(12, Dk, !0),
      Dw.setUint32(16, D9, !0),
      Dw.setUint16(20, 0, !0),
      new Blob([...D7, ...D8, new Uint8Array(Dw.buffer)], { type: 'application/zip' })
    );
  }
  return {
    add: D4,
    generate: D5,
    get count() {
      return D3.length;
    },
  };
}
var td = 'actionforge.project',
  nd = 1;
function od(D3 = '') {
  return String(D3).match(/(?:^|&)r=(u\.[0-9a-f]+)/)?.[1] ?? null;
}
async function sd(D3, D4 = []) {
  let D5 = Jc(),
    D6 = new TextEncoder();
  await D5.add('project.json', D6.encode(D3));
  for (let D7 of D4)
    (await D5.add('characters/' + D7.id + '.' + D7.format, D7.blob),
      D7.rig &&
        D7.source &&
        (await D5.add('characters/' + D7.id + '.source.' + D7.source.format, D7.source.blob)));
  return (
    await D5.add(
      'characters/index.json',
      D6.encode(
        JSON.stringify(
          D4.map(({ id: D8, name: D9, format: Dk, kind: Dw, map: DV, rig: DD, source: Dm }) => ({
            id: D8,
            name: D9,
            format: Dk,
            ...(DV ? { kind: Dw, map: DV } : {}),
            ...(DD ? { kind: 'autorigged', rig: DD, sourceFormat: Dm?.format ?? null } : {}),
          })),
        ),
      ),
    ),
    D5.generate()
  );
}
function Rf(D3) {
  let D4 = (D9) => typeof D9 == 'number' && Number.isFinite(D9),
    D5 =
      D3.markers && typeof D3.markers == 'object'
        ? Object.fromEntries(
            Object.entries(D3.markers).filter(
              ([D9, Dk]) =>
                D9 !== '__proto__' &&
                /^[a-z_]+$/.test(D9) &&
                Array.isArray(Dk) &&
                Dk.length === 2 &&
                Dk.every(D4),
            ),
          )
        : null,
    D6 = (Array.isArray(D3.tags) ? D3.tags : [])
      .filter(
        (D9) =>
          D9 &&
          Number.isInteger(D9.mesh) &&
          D9.mesh >= 0 &&
          Number.isInteger(D9.vertex) &&
          D9.vertex >= 0 &&
          (D9.kind === 'cloth' || (D9.kind === 'prop' && typeof D9.bone == 'string')),
      )
      .map((D9) => ({
        mesh: D9.mesh,
        vertex: D9.vertex,
        kind: D9.kind,
        ...(D9.kind === 'prop' ? { bone: D9.bone } : {}),
      })),
    D7 =
      D3.joints && typeof D3.joints == 'object'
        ? Object.fromEntries(
            Object.entries(D3.joints).filter(
              ([D9, Dk]) =>
                D9 !== '__proto__' &&
                /^[A-Za-z0-9_]+$/.test(D9) &&
                Array.isArray(Dk) &&
                Dk.length === 3 &&
                Dk.every(D4),
            ),
          )
        : {},
    D8 =
      D3.envelopes && typeof D3.envelopes == 'object'
        ? Object.fromEntries(
            Object.entries(D3.envelopes).filter(
              ([D9, Dk]) =>
                D9 !== '__proto__' && /^[A-Za-z0-9_]+$/.test(D9) && D4(Dk) && Dk >= 0.2 && Dk <= 5,
            ),
          )
        : {};
  return {
    markers: D5 && Object.keys(D5).length ? D5 : null,
    own: (Array.isArray(D3.own) ? D3.own : []).filter((D9) => typeof D9 == 'string'),
    tags: D6,
    joints: D7,
    envelopes: D8,
    turn: Number.isInteger(D3.turn) ? ((D3.turn % 4) + 4) % 4 : 0,
    height: D4(D3.height) && D3.height > 0 ? D3.height : null,
  };
}
async function id(D3) {
  let D4 = new Uint8Array(D3);
  if (D4[0] === 80 && D4[1] === 75) {
    let { unzipSync: D5 } = await import('./dependencies/compression.js'),
      D6;
    try {
      D6 = D5(D4);
    } catch {
      throw new Error('That project file is damaged');
    }
    if (!D6['project.json']) throw new Error('That is not an ActionForge project');
    let D7 = ed(new TextDecoder().decode(D6['project.json'])),
      D8 = [];
    try {
      D8 = JSON.parse(new TextDecoder().decode(D6['characters/index.json'] ?? new Uint8Array()));
    } catch {}
    let D9 = (Array.isArray(D8) ? D8 : [])
      .filter((Dk) => Dk && /^u\.[0-9a-f]+$/.test(Dk.id) && /^(glb|fbx)$/.test(Dk.format))
      .map((Dk) => {
        let Dw = /^(glb|fbx)$/.test(Dk.sourceFormat)
          ? D6['characters/' + Dk.id + '.source.' + Dk.sourceFormat]
          : null;
        return {
          id: Dk.id,
          name: String(Dk.name || 'Character'),
          format: Dk.format,
          bytes: D6['characters/' + Dk.id + '.' + Dk.format],
          ...(Dk.map && typeof Dk.map == 'object' ? { kind: 'custom', map: Dk.map } : {}),
          ...(Dk.rig && typeof Dk.rig == 'object'
            ? {
                kind: 'autorigged',
                rig: Rf(Dk.rig),
                source: Dw?.length ? { format: Dk.sourceFormat, bytes: Dw } : null,
              }
            : {}),
        };
      })
      .filter((Dk) => Dk.bytes?.length);
    return { ...D7, characters: D9 };
  }
  return { ...ed(new TextDecoder().decode(D4)), characters: [] };
}
function rd(D3 = '', D4 = null) {
  let D5 = new Set(String(D3).match(/user\.[A-Za-z0-9_]+/g) ?? []);
  return (D4 && String(D4).startsWith('user.') && D5.add(D4), [...D5]);
}
function Zc(D3) {
  let D4 = new Uint8Array(D3.buffer, D3.byteOffset, D3.byteLength),
    D5 = '';
  for (let D6 = 0; D6 < D4.length; D6 += 32768)
    D5 += String.fromCharCode(...D4.subarray(D6, D6 + 32768));
  return btoa(D5);
}
function Qc(D3) {
  let D4 = atob(String(D3)),
    D5 = new Uint8Array(D4.length);
  for (let D6 = 0; D6 < D4.length; D6++) D5[D6] = D4.charCodeAt(D6);
  return new Float32Array(D5.buffer);
}
function ad({ name: D3, state: D4 = '', clip: D5 = null, clips: D6 = [] }) {
  return JSON.stringify({
    format: td,
    version: nd,
    exported: new Date().toISOString(),
    name: D3,
    state: D4,
    clip: D5,
    clips: D6.map((D7) => ({
      ...D7,
      tracks: (D7.tracks ?? []).map((D8) => ({
        name: D8.name,
        type: D8.type,
        times: Zc(Float32Array.from(D8.times)),
        values: Zc(Float32Array.from(D8.values)),
      })),
    })),
  });
}
function ed(D3) {
  let D4;
  try {
    D4 = JSON.parse(String(D3));
  } catch {
    throw new Error('That is not an ActionForge file');
  }
  if (Array.isArray(D4) || D4?.format === 'actionforge.presets' || Array.isArray(D4?.presets)) {
    let D6 = (Array.isArray(D4) ? D4 : D4.presets)
      .filter(
        (D7) => D7 && typeof D7.name == 'string' && D7.name.trim() && typeof D7.state == 'string',
      )
      .map((D7) => ({
        name: D7.name.trim(),
        state: D7.state,
        clip: typeof D7.clip == 'string' ? D7.clip : null,
        at: Number(D7.at) || Date.now(),
      }));
    if (!D6.length) throw new Error('No projects in that file');
    return { presets: D6 };
  }
  if (D4?.format !== td) throw new Error('That is not an ActionForge project');
  if (!(D4.version <= nd))
    throw new Error(
      'That project is from a newer ActionForge \u2014 reload the page and try again',
    );
  if (typeof D4.state != 'string') throw new Error('That project has no scene in it');
  let D5 = [];
  for (let D7 of Array.isArray(D4.clips) ? D4.clips : [])
    if (!(
      !D7 ||
      typeof D7.id != 'string' ||
      !D7.id.startsWith('user.') ||
      !Array.isArray(D7.tracks)
    ))
      try {
        D5.push({
          ...D7,
          tracks: D7.tracks.map((D8) => ({
            name: D8.name,
            type: D8.type,
            times: Qc(D8.times),
            values: Qc(D8.values),
          })),
        });
      } catch {}
  return {
    project: {
      name: typeof D4.name == 'string' && D4.name.trim() ? D4.name.trim() : 'Imported project',
      state: D4.state,
      clip: typeof D4.clip == 'string' ? D4.clip : null,
      clips: D5,
    },
  };
}
var Df = ['cgstuff.lib.presets'],
  qf = (D3) => D3 && typeof D3.name == 'string' && typeof D3.state == 'string',
  ld = 'cgstuff.library.projectWithCharacter',
  Vr = () => {
    try {
      return localStorage.getItem(ld) !== '0';
    } catch {
      return !0;
    }
  };
function cd({
  mount: D3,
  scene: D4,
  open: D5,
  fresh: D6,
  recent: D7 = () => [],
  openRecent: D8 = async () => {},
  describe: D9 = () => '',
  onShare: Dk = null,
  clipsFor: Dw = () => [],
  adoptClips: DV = async () => {},
  characterFor: DD = async () => null,
  adoptCharacters: Dm = async () => 0,
  onCurrent: DS = () => {},
}) {
  let DE = [],
    DF = !1,
    DC = !1,
    Dt = null,
    DH = (DB, DG, Dg) => {
      let DI = document.createElement(DB);
      return (DG && (DI.className = DG), Dg != null && (DI.textContent = Dg), DI);
    },
    De = (DB) => DE.find((DG) => DG.name === DB) ?? null,
    DR = (DB) => /(^|&)c=/.test(DB || '');
  function DQ() {
    let DB = Dt && De(Dt);
    if (!DB) return !1;
    let DG = D4();
    return (DG.state || '') !== (DB.state || '')
      ? !0
      : !DR(DG.state) && (DG.clip || null) !== (DB.clip || null);
  }
  async function Dj() {
    try {
      DE = await VP(Vy);
    } catch {
      DE = [];
    }
    ((DF = !0), Dv());
  }
  function Dz(DB) {
    ((Dt = DB || null), DS(Dt), Dv());
  }
  async function DO(DB, { state: DG, clip: Dg }) {
    let DI = De(DB),
      Dh = Date.now();
    await VY(Vy, {
      name: DB,
      state: DG,
      clip: Dg || null,
      at: Dh,
      created: DI?.created ?? DI?.at ?? Dh,
    });
  }
  async function DJ() {
    if (!Dt || !De(Dt)) return DZ();
    try {
      await DO(Dt, D4());
    } catch {
      DW('Could not save \u2014 this browser is blocking storage');
      return;
    }
    (DW('Saved \u201C' + Dt + '\u201D'), await Dj());
  }
  async function DZ() {
    let DB = D4();
    if (!DB.state && !DB.clip) {
      DW('Nothing to save yet \u2014 pick a clip or build a scene first');
      return;
    }
    let DG = prompt(
      'Save this scene as a project called',
      Dt ? Dt + ' copy' : DK(DB.state),
    )?.trim();
    if (
      DG &&
      !(
        De(DG) &&
        DG !== Dt &&
        !confirm(
          'A project called \u201C' + DG + '\u201D already exists. Replace it with this scene?',
        )
      )
    ) {
      try {
        await DO(DG, DB);
      } catch {
        DW('Could not save \u2014 this browser is blocking storage');
        return;
      }
      ((Dt = DG), DS(Dt), DW('Saved \u201C' + DG + '\u201D'), await Dj());
    }
  }
  async function DU(DB) {
    let DG = String(DB || '').trim() || 'Untitled',
      Dg = DG;
    for (let DI = 2; De(Dg); DI++) Dg = DG + ' ' + DI;
    try {
      await DO(Dg, D4());
    } catch {
      return (DW('Could not save \u2014 this browser is blocking storage'), null);
    }
    return ((Dt = Dg), DS(Dt), await Dj(), Dg);
  }
  function DK(DB) {
    let DG = [];
    return (
      DR(DB) && DG.push('sequence'),
      /(^|&)a=/.test(DB) && DG.push('adjusted'),
      /(^|&)i=/.test(DB) && DG.push('posed'),
      /:k|\/k/.test(DB) && DG.push('keyed'),
      DG.join(' + ') || 'Untitled'
    );
  }
  async function DT(DB) {
    if (!DC) {
      DC = !0;
      try {
        (await D5({ state: DB.state, clip: DB.clip || null }), (Dt = DB.name), DS(Dt));
      } finally {
        ((DC = !1), Dv());
      }
    }
  }
  async function DA() {
    if (!DC) {
      DC = !0;
      try {
        (await D6(), (Dt = null), DS(null));
      } finally {
        ((DC = !1), Dv());
      }
    }
  }
  async function Dn(DB) {
    let DG = prompt('Rename the project', DB.name)?.trim();
    if (!(!DG || DG === DB.name)) {
      if (De(DG)) {
        DW('There is already a project called \u201C' + DG + '\u201D');
        return;
      }
      try {
        (await VY(Vy, { ...DB, name: DG }), await Vv(Vy, DB.name));
      } catch {
        DW('Could not rename \u2014 this browser is blocking storage');
        return;
      }
      (Dt === DB.name && ((Dt = DG), DS(Dt)), await Dj());
    }
  }
  async function DX(DB) {
    if (confirm('Delete the project \u201C' + DB.name + '\u201D? This cannot be undone.')) {
      try {
        await Vv(Vy, DB.name);
      } catch {}
      (Dt === DB.name && ((Dt = null), DS(null)), await Dj());
    }
  }
  async function DL(DB, DG) {
    let Dg = ad({ name: DB, state: DG.state, clip: DG.clip || null, clips: Dw(DG.state, DG.clip) }),
      DI = od(DG.state),
      Dh = DI && Vr() ? await DD(DI).catch(() => null) : null,
      DN = Dh ? await sd(Dg, [Dh]) : new Blob([Dg], { type: 'application/json' });
    (DI &&
      !Dh &&
      DW(
        Vr()
          ? 'Downloaded \u2014 the character isn\u2019t in this browser, so it isn\u2019t in the file'
          : 'Downloaded without the character',
      ),
      kq(
        DN,
        ((DB || 'untitled')
          .replace(/[^\w\- ]+/g, '')
          .trim()
          .replace(/\s+/g, '_') || 'untitled') + '.actionforge',
      ));
  }
  async function Db(DB) {
    let DG;
    try {
      DG = await DB.arrayBuffer();
    } catch {
      DW('Could not read that file');
      return;
    }
    {
      let Dg;
      try {
        Dg = await id(DG);
      } catch (m1) {
        DW(m1.message);
        return;
      }
      if (Dg.presets) {
        let m2 = new Set(DE.map((m4) => m4.name)),
          m3 = Dg.presets.filter((m4) => m2.has(m4.name)).length;
        try {
          await VB(Vy, Dg.presets);
        } catch {
          DW('Could not import \u2014 this browser is blocking storage');
          return;
        }
        (DW('Added ' + (Dg.presets.length - m3) + ', updated ' + m3), await Dj());
        return;
      }
      let DI = Dg.project;
      try {
        await DV(DI.clips);
      } catch {}
      let Dh = 0;
      try {
        Dh = await Dm(Dg.characters);
      } catch {}
      let DN = DI.name,
        DM = (m4) => m4 && m4.state === DI.state && (m4.clip || null) === (DI.clip || null);
      for (let m4 = 2; De(DN) && !DM(De(DN)); m4++) DN = DI.name + ' (' + m4 + ')';
      try {
        await DO(DN, DI);
      } catch {
        DW('Could not keep it \u2014 this browser is blocking storage');
      }
      (await Dj(), await DT(De(DN) ?? { name: DN, state: DI.state, clip: DI.clip }));
      let m0 = [
        DI.clips.length
          ? DI.clips.length + ' imported clip' + (DI.clips.length === 1 ? '' : 's')
          : '',
        Dg.characters.length ? (Dh ? 'its character' : 'its character (already here)') : '',
      ].filter(Boolean);
      DW('Opened \u201C' + DN + '\u201D' + (m0.length ? ' with ' + m0.join(' and ') : ''));
    }
  }
  let Dx = null,
    Dy = null;
  function DW(DB) {
    document.dispatchEvent(new CustomEvent('af:project-notice', { detail: DB }));
    Dx &&
      ((Dx.textContent = DB),
      (Dx.hidden = !1),
      clearTimeout(DW.t),
      (DW.t = setTimeout(() => {
        Dx && (Dx.hidden = !0);
      }, 3500)));
  }
  let Dq = (DB) => {
    let DG = (Date.now() - DB) / 1000;
    return DG < 60
      ? 'just now'
      : DG < 3600
        ? Math.round(DG / 60) + ' min ago'
        : DG < 86400
          ? Math.round(DG / 3600) + ' h ago'
          : DG < 172800
            ? 'yesterday'
            : new Date(DB).toLocaleDateString();
  };
  function DP(DB, DG, Dg, DI = 'lib-btn lib-btn--sm') {
    let Dh = DH('button', DI, DB);
    return (
      (Dh.type = 'button'),
      (Dh.title = DG),
      Dh.addEventListener('click', (DN) => {
        (DN.stopPropagation(), Dg(Dh));
      }),
      Dh
    );
  }
  function DY() {
    if (!Dy) return;
    Dy.innerHTML = '';
    let DB = Dt && De(Dt),
      DG = DQ();
    document.dispatchEvent(new CustomEvent('af:project-status', {
      detail: { name: DB ? DB.name : 'Untitled scene', status: DB ? (DG ? 'Unsaved changes' : 'Saved locally') : 'Not saved' },
    }));
    (Dy.classList.toggle('is-dirty', DG),
      Dy.appendChild(DH('span', 'lib-proj__cur-dot', DG ? '\u25CF' : '')),
      Dy.appendChild(DH('span', 'lib-proj__cur-name', DB ? DB.name : 'Untitled scene')),
      Dy.appendChild(
        DH(
          'span',
          'lib-proj__cur-note',
          DB ? (DG ? 'unsaved changes \u2014 Ctrl+S' : 'saved') : 'Save to keep it as a project',
        ),
      ),
      Dy.appendChild(
        DP(
          '\u2193',
          'Download this scene as an .actionforge file',
          () => DL(DB ? DB.name : 'Untitled', D4()),
          'lib-btn lib-btn--icon',
        ),
      ));
  }
  function Dv() {
    D3.innerHTML = '';
    let DB = DH('div', 'lib-comp__head');
    (DB.appendChild(DH('span', 'lib-comp__title', 'Projects')),
      DB.appendChild(DP('Save', 'Save the scene to its project (Ctrl+S)', () => DJ())),
      DB.appendChild(DP('Save as\u2026', 'Save the scene as a new project', () => DZ())),
      DB.appendChild(
        DP('New', 'Start a new, empty scene \u2014 this one stays where it is saved or kept', () =>
          DA(),
        ),
      ),
      D3.appendChild(DB),
      (Dy = DH('div', 'lib-proj__cur')),
      D3.appendChild(Dy),
      DY());
    let DG = document.createElement('input');
    ((DG.type = 'file'),
      (DG.accept = '.actionforge,application/json,.json,application/zip'),
      (DG.hidden = !0),
      DG.addEventListener('change', () => {
        let DM = DG.files?.[0];
        ((DG.value = ''), DM && Db(DM));
      }),
      D3.appendChild(DG));
    let Dg = DH('div', 'lib-proj__files');
    Dg.appendChild(
      DP(
        'Open file\u2026',
        'Open an .actionforge project \u2014 or a presets file from before projects',
        () => DG.click(),
      ),
    );
    let DI = DH('label', 'lib-check');
    DI.title =
      'When the scene wears your own character, \u2193 puts it in the file (the file gets bigger). Official characters and the mannequin are never included \u2014 every copy of the site has them.';
    let Dh = DH('input');
    if (
      ((Dh.type = 'checkbox'),
      (Dh.checked = Vr()),
      Dh.addEventListener('change', () => {
        try {
          localStorage.setItem(ld, Dh.checked ? '1' : '0');
        } catch {}
      }),
      DI.append(Dh, ' Include your character'),
      Dg.appendChild(DI),
      D3.appendChild(Dg),
      (Dx = DH('p', 'lib-comp__hint')),
      (Dx.hidden = !0),
      D3.appendChild(Dx),
      !DF)
    ) {
      D3.appendChild(DH('p', 'lib-comp__hint', 'Loading\u2026'));
      return;
    }
    if (!DE.length)
      D3.appendChild(
        DH(
          'p',
          'lib-comp__hint',
          'Build a scene, then Save as\u2026 to keep it here. Kept on this machine \u2014 \u2193 writes a file you can open anywhere.',
        ),
      );
    else {
      let DM = DH('ul', 'lib-presets');
      for (let m0 of DE) {
        let m1 = DH('li', 'lib-preset' + (m0.name === Dt ? ' is-current' : '')),
          m2 = DH('button', 'lib-preset__open');
        ((m2.type = 'button'),
          (m2.title = m0.name === Dt ? 'This is the project on screen' : 'Open this project'),
          m2.appendChild(DH('span', 'lib-preset__name', m0.name)));
        let m3 = [D9(m0.state), m0.at ? Dq(m0.at) : ''].filter(Boolean).join(' \u00B7 ');
        (m3 && m2.appendChild(DH('span', 'lib-preset__note', m3)),
          m2.addEventListener('click', () => DT(m0)),
          m1.appendChild(m2),
          Dk &&
            m1.appendChild(
              DP(
                '\u29C9',
                'Copy a short link to this project',
                (m4) => Dk(m0.state, m4),
                'lib-btn lib-btn--icon',
              ),
            ),
          m1.appendChild(
            DP(
              '\u2193',
              'Download as an .actionforge file',
              () => DL(m0.name, m0),
              'lib-btn lib-btn--icon',
            ),
          ),
          m1.appendChild(DP('\u270E', 'Rename', () => Dn(m0), 'lib-btn lib-btn--icon')),
          m1.appendChild(DP('\u2715', 'Delete', () => DX(m0), 'lib-btn lib-btn--icon')),
          DM.appendChild(m1));
      }
      D3.appendChild(DM);
    }
    let DN = D7();
    if (DN.length) {
      D3.appendChild(DH('p', 'lib-ik__seph', 'Recent \u2014 kept automatically'));
      let m4 = DH('ul', 'lib-presets lib-proj__recent');
      for (let m5 of DN) {
        let m6 = DH('li', 'lib-preset'),
          m7 = DH('button', 'lib-preset__open');
        ((m7.type = 'button'),
          (m7.title = 'Carry on with this scene'),
          m7.appendChild(
            DH(
              'span',
              'lib-preset__name',
              (m5.project || 'Untitled') + ' \u00B7 ' + Dq(m5.updated),
            ),
          ));
        let m8 = D9(m5.state) || (m5.clip ? m5.clip.replace(/_/g, ' ') : '');
        (m8 && m7.appendChild(DH('span', 'lib-preset__note', m8)),
          m7.addEventListener('click', async () => {
            if (!DC) {
              DC = !0;
              try {
                (await D8(m5), (Dt = m5.project && De(m5.project) ? m5.project : null), DS(Dt));
              } finally {
                ((DC = !1), Dv());
              }
            }
          }),
          m6.appendChild(m7),
          m4.appendChild(m6));
      }
      D3.appendChild(m4);
    }
  }
  return (
    Dv(),
    VG(Vy, Df, qf)
      .catch(() => 0)
      .then(Dj),
    {
      render: Dv,
      refresh: DY,
      save: DJ,
      saveAs: DZ,
      saveNew: DU,
      current: () => Dt,
      setCurrent: Dz,
      get: () => [...DE],
    }
  );
}
var Js = 'animal.',
  Xs = (D3, D4) => (typeof D3 == 'string' ? D3.trim().slice(0, D4) : '');
function zf(D3) {
  return String(D3 ?? '')
    .replace(/_+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Za-z])(\d)/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^./, (D4) => D4.toUpperCase());
}
var Zs = (D3, D4) => '' + Js + D3 + '.' + D4;
function dd(D3, { empty: D4 = !1 } = {}) {
  return (Array.isArray(D3?.items) ? D3.items : [])
    .map((D5) => {
      let D6 = Xs(D5?.id, 64),
        D7 = Xs(D5?.model, 120),
        D8 = (Array.isArray(D5?.clips) ? D5.clips : []).filter((DS) => typeof DS == 'string' && DS);
      if (!/^[a-z0-9][a-z0-9_-]*$/.test(D6) || !/^[\w.-]+\.glb$/i.test(D7) || (!D8.length && !D4))
        return null;
      let D9 = D8.includes(D5.stands) ? D5.stands : (D8.find((DS) => /^idle$/i.test(DS)) ?? D8[0]),
        Dk = Number(D5.size) > 0 ? Number(D5.size) : 1,
        Dw = (DS) => (typeof DS == 'string' && DS && !/^([a-z]+:|\/)/i.test(DS) ? DS : ''),
        DV = {};
      for (let [DS, DE] of Object.entries(D5.media && typeof D5.media == 'object' ? D5.media : {}))
        D8.includes(DS) &&
          (Dw(DE?.preview) || Dw(DE?.icon)) &&
          (DV[DS] = { preview: Dw(DE.preview), icon: Dw(DE.icon) });
      let DD = {};
      for (let [DF, DC] of Object.entries(
        D5.seconds && typeof D5.seconds == 'object' ? D5.seconds : {},
      ))
        D8.includes(DF) && Number(DC) > 0 && (DD[DF] = Number(DC));
      let Dm = (Dt) => (Number(D5[Dt]) > 0 ? { [Dt]: Number(D5[Dt]) } : {});
      return {
        id: D6,
        name: Xs(D5.name, 60) || D6,
        file: '' + D7 + (D5.version ? '?v=' + encodeURIComponent(D5.version) : ''),
        size: Dk,
        stands: D9,
        clips: D8,
        picture: Dw(D5.picture),
        seconds: DD,
        media: DV,
        ...(Xs(D5.species, 40) ? { species: Xs(D5.species, 40) } : {}),
        ...Dm('hip'),
        ...Dm('mass'),
      };
    })
    .filter(Boolean);
}
function ud(D3, D4 = {}, D5 = 'animals') {
  let D6 = {};
  for (let D7 of D3.clips) {
    let D8 = D3.media?.[D7],
      D9 = zf(D7);
    D6[Zs(D3.id, D7)] = {
      label: D9,
      duration: Number(D4[D7] ?? D3.seconds?.[D7]) || 0,
      tags: [D9.split(' ')[0].toLowerCase()],
      rootMotion: !1,
      loops: /^(idle|walk|gallop|eating|run|trot)/i.test(D7) && !/react|to ?idle|jump/i.test(D7),
      animal: D3.id,
      take: D7,
      icon: D8?.icon ? D5 + '/' + D8.icon : void 0,
      preview: D8?.preview ? D5 + '/' + D8.preview : void 0,
      file: null,
    };
  }
  return D6;
}
function fd({ urlOf: D3 }) {
  let D4 = new Vg();
  async function D5(D6) {
    let D7 = await fetch(D3(D6));
    if (!D7.ok) throw new Error('its file could not be fetched (' + D7.status + ')');
    return D7.arrayBuffer();
  }
  return { urlOf: D3, bytesOf: D5, fresh: async (D6) => D4.parseAsync(await D5(D6), '') };
}
function hd({
  rigRoot: D3,
  like: D4,
  THREE: D5,
  name: D6 = 'Pose',
  seconds: D7 = 1,
  rootName: D8 = 'root',
}) {
  let D9 = new Map();
  D3.traverse((Dw) => {
    Dw.name && !D9.has(Dw.name) && D9.set(Dw.name, Dw);
  });
  let Dk = [];
  for (let Dw of D4?.tracks || []) {
    let DV = Dw.name.lastIndexOf('.'),
      DD = D9.get(Dw.name.slice(0, DV)),
      Dm = Dw.name.slice(DV + 1);
    if (DD) {
      if (Dm === 'quaternion') {
        let DS = DD.quaternion;
        Dk.push(
          new D5['QuaternionKe' + 'yframeTrack'](
            Dw.name,
            [0, D7],
            [DS.x, DS.y, DS.z, DS.w, DS.x, DS.y, DS.z, DS.w],
          ),
        );
      } else {
        if (Dm === 'position' || Dm === 'scale') {
          let DE = DD[Dm].clone();
          (Dm === 'position' && DD.name === D8 && ((DE.x = 0), (DE.z = 0)),
            Dk.push(
              new D5['VectorKeyfra' + 'meTrack'](
                Dw.name,
                [0, D7],
                [DE.x, DE.y, DE.z, DE.x, DE.y, DE.z],
              ),
            ));
        }
      }
    }
  }
  return new D5['AnimationCli' + 'p'](D6, D7, Dk);
}
function Gr(D3) {
  let D4 = D3.tracks.reduce((D7, D8) => D7 + D8.values.length, 0),
    D5 = new Float32Array(D4),
    D6 = 0;
  for (let D7 of D3.tracks) (D5.set(D7.values, D6), (D6 += D7.values.length));
  return D5.buffer;
}
var pd = 'cgstuff.library.newLength';
function md({
  bar: D3,
  before: D4 = null,
  fps: D5 = () => 30,
  canScreen: D6 = () => !0,
  onCreate: D7 = async () => {},
}) {
  let D8 = (DS, DE, DF) => {
      let DC = document.createElement(DS);
      return (DE && (DC.className = DE), DF != null && (DC.textContent = DF), DC);
    },
    D9 = D8('button', 'af-import af-new', 'New animation');
  ((D9.type = 'button'),
    (D9.title =
      'Start an animation from nothing: a pose held for as long as you choose, ready to be posed and keyed'),
    D9.setAttribute('aria-haspopup', 'dialog'),
    D4 && D4.parentNode === D3 ? D3.insertBefore(D9, D4) : D3?.appendChild(D9));
  let Dk = null;
  function Dw() {
    Dk &&
      (Dk.remove(),
      (Dk = null),
      document.removeEventListener('pointerdown', DV, !0),
      document.removeEventListener('keydown', DD, !0),
      D9.setAttribute('aria-expanded', 'false'));
  }
  let DV = (DS) => {
      Dk && !Dk.contains(DS.target) && DS.target !== D9 && Dw();
    },
    DD = (DS) => {
      DS.key === 'Escape' && (DS.preventDefault(), DS.stopPropagation(), Dw(), D9.focus());
    };
  function Dm() {
    ((Dk = D8('form', 'lib-newpop')),
      Dk.setAttribute('role', 'dialog'),
      Dk.setAttribute('aria-label', 'New animation'),
      (Dk.noValidate = !0));
    let DS = (DT, ...DA) => {
        let Dn = D8('label', 'lib-newpop__row');
        return (Dn.append(D8('span', 'lib-newpop__label', DT), ...DA), Dk.append(Dn), Dn);
      },
      DE = D8('input', 'lib-newpop__text');
    ((DE.type = 'text'),
      (DE.value = 'My animation'),
      (DE.maxLength = 60),
      (DE.autocomplete = 'off'),
      DS('Name', DE));
    let DF = D8('input', 'lib-newpop__num');
    ((DF.type = 'number'), (DF.min = '2'), (DF.max = '1800'), (DF.step = '1'));
    let DC = 60;
    try {
      let DT = Number(localStorage.getItem(pd));
      DT >= 2 && DT <= 1800 && (DC = Math.round(DT));
    } catch {}
    DF.value = String(DC);
    let Dt = D8('span', 'lib-newpop__unit', ''),
      DH = () => Math.min(1800, Math.max(2, Math.round(Number(DF.value) || 0))),
      De = () => {
        Dt.textContent =
          'frames \u00B7 ' + ((DH() - 1) / D5()).toFixed(2) + ' s at ' + D5() + ' fps';
      };
    (DF.addEventListener('input', De), De(), DS('Length', DF, Dt));
    let DR = D8('div', 'lib-newpop__row');
    DR.append(D8('span', 'lib-newpop__label', 'Starts as'));
    let DQ = D8('div', 'lib-newpop__choices'),
      Dj = (DA, Dn, DX, DL, Db = !1) => {
        let Dx = D8('label', 'lib-newpop__choice' + (Db ? ' is-off' : '')),
          Dy = D8('input');
        return (
          (Dy.type = 'radio'),
          (Dy.name = 'lib-new-from'),
          (Dy.value = DA),
          (Dy.checked = DL),
          (Dy.disabled = Db),
          (Dx.title = DX),
          Dx.append(Dy, D8('span', null, Dn)),
          DQ.append(Dx),
          Dy
        );
      },
      Dz = D6();
    (Dj('rest', 'The rest pose', 'The character standing in its T-pose', !0),
      Dj(
        'screen',
        'The pose on screen',
        Dz
          ? 'The character as it stands right now, on this frame, with everything applied to it'
          : 'Nothing is on screen to start from yet',
        !1,
        !Dz,
      ),
      DR.append(DQ),
      Dk.append(DR));
    let DO = D8(
        'p',
        'lib-newpop__note',
        'Replaces what is on the timeline. What was there is kept under Projects, in Recent.',
      ),
      DJ = D8('p', 'lib-newpop__err');
    DJ.hidden = !0;
    let DZ = D8('button', 'lib-btn lib-btn--go', 'Create');
    ((DZ.type = 'submit'),
      Dk.append(DO, DJ, DZ),
      Dk.addEventListener('submit', async (DA) => {
        if ((DA.preventDefault(), DZ.disabled)) return;
        let Dn = DH();
        DF.value = String(Dn);
        try {
          localStorage.setItem(pd, String(Dn));
        } catch {}
        ((DZ.disabled = !0), (DZ.textContent = 'Making it\u2026'), (DJ.hidden = !0));
        try {
          (await D7({
            name: DE.value.trim() || 'My animation',
            frames: Dn,
            from:
              Dk.querySelector('input[name="lib-new-from"]:checked')?.value === 'screen'
                ? 'screen'
                : 'rest',
          }),
            Dw());
        } catch (DX) {
          (console.error(DX),
            (DJ.textContent = 'It couldn\u2019t be made: ' + (DX?.message || DX)),
            (DJ.hidden = !1),
            (DZ.disabled = !1),
            (DZ.textContent = 'Create'));
        }
      }),
      document.body.appendChild(Dk));
    let DU = D9.getBoundingClientRect(),
      DK = Dk.offsetWidth;
    ((Dk.style.left = Math.max(8, Math.min(window.innerWidth - DK - 8, DU.right - DK)) + 'px'),
      (Dk.style.top = DU.bottom + 6 + 'px'),
      document.addEventListener('pointerdown', DV, !0),
      document.addEventListener('keydown', DD, !0),
      D9.setAttribute('aria-expanded', 'true'),
      DE.focus(),
      DE.select());
  }
  return (
    D9.addEventListener('click', () => {
      Dk ? Dw() : Dm();
    }),
    { button: D9, close: Dw }
  );
}
function Yr(D3, D4 = []) {
  let D5 = String(D3 ?? '').trim() || 'My animation',
    D6 = new Set([...D4].map((D8) => String(D8 ?? '').trim()));
  if (!D6.has(D5)) return D5;
  let D7 = D5.replace(/\.\d{3,}$/, '');
  for (let D8 = 1; ; D8++) {
    let D9 = D7 + '.' + String(D8).padStart(3, '0');
    if (!D6.has(D9)) return D9;
  }
}
function gd(D3, D4 = 'root') {
  let D5 = D3?.tracks?.find((D9) => D9.name === D4 + '.position')?.values;
  if (!D5 || D5.length < 6) return { moved: !1, distance: 0 };
  let D6 = D5.length / 3,
    D7 = Math.hypot(
      D5[(D6 - 1) * 3] - D5[0],
      D5[(D6 - 1) * 3 + 1] - D5[1],
      D5[(D6 - 1) * 3 + 2] - D5[2],
    ),
    D8 = 0;
  for (let D9 = 1; D9 < D6; D9++)
    D8 += Math.hypot(
      D5[D9 * 3] - D5[D9 * 3 - 3],
      D5[D9 * 3 + 1] - D5[D9 * 3 - 2],
      D5[D9 * 3 + 2] - D5[D9 * 3 - 1],
    );
  return { moved: Math.max(D7, D8) > 0.01, distance: Number(D7.toFixed(4)) };
}
function bd({
  button: D3,
  nameNow: D4 = () => '',
  whatNow: D5 = () => '',
  taken: D6 = () => [],
  onSave: D7 = async () => {},
}) {
  let D8 = (Dm, DS, DE) => {
    let DF = document.createElement(Dm);
    return (DS && (DF.className = DS), DE != null && (DF.textContent = DE), DF);
  };
  if (!D3) return { close() {} };
  D3.setAttribute('aria-haspopup', 'dialog');
  let D9 = null;
  function Dk() {
    D9 &&
      (D9.remove(),
      (D9 = null),
      document.removeEventListener('pointerdown', Dw, !0),
      document.removeEventListener('keydown', DV, !0),
      D3.setAttribute('aria-expanded', 'false'));
  }
  let Dw = (Dm) => {
      D9 && !D9.contains(Dm.target) && Dm.target !== D3 && Dk();
    },
    DV = (Dm) => {
      Dm.key === 'Escape' && (Dm.preventDefault(), Dm.stopPropagation(), Dk(), D3.focus());
    };
  function DD() {
    ((D9 = D8('form', 'lib-newpop')),
      D9.setAttribute('role', 'dialog'),
      D9.setAttribute('aria-label', 'Save to my animations'),
      (D9.noValidate = !0));
    let Dm = D8('label', 'lib-newpop__row'),
      DS = D8('input', 'lib-newpop__text');
    ((DS.type = 'text'),
      (DS.value = String(D4() || '').trim() || 'My animation'),
      (DS.maxLength = 60),
      (DS.autocomplete = 'off'),
      Dm.append(D8('span', 'lib-newpop__label', 'Name'), DS));
    let DE = D8('p', 'lib-newpop__note'),
      DF = () => {
        let Dz = DS.value.trim() || 'My animation',
          DO = Yr(Dz, D6());
        ((DE.textContent =
          DO === Dz
            ? ''
            : '\u201C' + Dz + '\u201D is taken: this one will be \u201C' + DO + '\u201D.'),
          (DE.hidden = !DE.textContent));
      };
    (DS.addEventListener('input', DF), DF());
    let DC = D5(),
      Dt = D8(
        'p',
        'lib-newpop__note',
        (DC
          ? DC + ', with everything set on it.'
          : 'What is on screen, with everything set on it.') +
          ' It is kept with your animations, and in your library folder if you have chosen one.',
      ),
      DH = D8('p', 'lib-newpop__err');
    DH.hidden = !0;
    let De = D8('button', 'lib-btn lib-btn--go', 'Save');
    ((De.type = 'submit'),
      D9.append(Dm, DE, Dt, DH, De),
      D9.addEventListener('submit', async (Dz) => {
        if ((Dz.preventDefault(), !De.disabled)) {
          ((De.disabled = !0), (De.textContent = 'Saving\u2026'), (DH.hidden = !0));
          try {
            (await D7({ name: DS.value.trim() || 'My animation' }), Dk());
          } catch (DO) {
            (console.error(DO),
              (DH.textContent = 'It couldn\u2019t be saved: ' + (DO?.message || DO)),
              (DH.hidden = !1),
              (De.disabled = !1),
              (De.textContent = 'Save'));
          }
        }
      }),
      document.body.appendChild(D9));
    let DR = D3.getBoundingClientRect(),
      DQ = D9.offsetWidth,
      Dj = D9.offsetHeight;
    ((D9.style.left = Math.max(8, Math.min(window.innerWidth - DQ - 8, DR.right - DQ)) + 'px'),
      (D9.style.top =
        (DR.bottom + 6 + Dj <= window.innerHeight - 8
          ? DR.bottom + 6
          : Math.max(8, DR.top - 6 - Dj)) + 'px'),
      document.addEventListener('pointerdown', Dw, !0),
      document.addEventListener('keydown', DV, !0),
      D3.setAttribute('aria-expanded', 'true'),
      DS.focus(),
      DS.select());
  }
  return (
    D3.addEventListener('click', () => {
      D9 ? Dk() : DD();
    }),
    { close: Dk }
  );
}
var Kf = 100,
  wd = 0.4,
  yd = 1,
  Uf = 8;
function kd({
  mount: D3,
  player: D4,
  clock: D5 = () => null,
  advanced: D6 = () => !1,
  onChange: D7 = () => {},
}) {
  let D8 = (Dx, Dy, DW) => {
      let Dq = document.createElement(Dx);
      return (Dy && (Dq.className = Dy), DW != null && (Dq.textContent = DW), Dq);
    },
    D9 = () => D4.getState().ik ?? {},
    Dk = () => D9().selected,
    Dw = (Dx) => D9().offsets?.[Dx] ?? [0, 0, 0, 0, 0, 0],
    DV = (Dx) =>
      (D9().ends?.[Dx] ?? (Dx.startsWith('leg') ? 'foot' : 'hand')) === 'foot' ? 'Foot' : 'Hand',
    DD = [],
    Dm = null;
  function DS(Dx, Dy, DW) {
    let Dq = [...Dw(Dx)];
    for (; Dq.length < 6;) Dq.push(0);
    ((Dq[Dy] = DW), Dm?.(Dx, Dq) || D4.setIkOptions({ offsets: { [Dx]: Dq } }), D7());
  }
  function DE(Dx) {
    let Dy = new Set(D9().enabled ?? []);
    (Dy.has(Dx) ? Dy.delete(Dx) : Dy.add(Dx),
      D4.setIkOptions({ enabled: [...Dy], selected: Dy.has(Dx) ? Dx : null }),
      D7(),
      Dn());
  }
  let DF = (Dx) => D9().keys?.[Dx] ?? null;
  function DC(Dx) {
    let Dy = DF(Dx),
      DW = D5();
    if (!Dy?.length || !DW) return !1;
    let Dq = VX(DW.u, DW.frames);
    return Dy.some((DP) => VX(DP.u, DW.frames) === Dq);
  }
  function Dt(Dx) {
    let Dy = D5();
    if (!Dy) return;
    let DW = DF(Dx);
    if (DW?.length && DC(Dx)) {
      let Dq = w6(DW, Dy.u, Dy.frames);
      Dq.length
        ? D4.setIkOptions({ keys: { ...D9().keys, [Dx]: Dq } })
        : D4.setIkOptions({ offsets: { [Dx]: null } });
    } else D4.setIkOptions({ keyAt: Dx });
    (D7(), Dn());
  }
  function DH(Dx) {
    let Dy = !!DF(Dx)?.length;
    if (!D6() && !Dy) return null;
    let DW = DC(Dx),
      Dq = D8(
        'button',
        'lib-adj__key lib-ik__key' + (Dy ? ' is-keyed' : '') + (DW ? ' is-on' : ''),
        '\u25C6',
      );
    return (
      (Dq.type = 'button'),
      (Dq.dataset.key = Dx),
      Dq.setAttribute('aria-pressed', String(DW)),
      (Dq.title = DW
        ? 'A key on this frame \u2014 click to remove it'
        : Dy
          ? 'Key this frame (K)'
          : 'Key this control here \u2014 it then follows its keys (K)'),
      Dq.addEventListener('click', (DP) => {
        (DP.stopPropagation(), Dt(Dx));
      }),
      Dq
    );
  }
  function De(Dx, Dy) {
    (D4.setIkOptions({ parents: { [Dx]: Dy } }), D7(), Dn());
  }
  function DR(Dx, Dy) {
    let DW = D9().parents?.[Dx] ?? 'root',
      Dq = !!DF(Dx)?.length,
      DP = D8('div', 'lib-ik__psw');
    DP.dataset.key = Dx;
    for (let [DY, Dv, DB] of Dy) {
      let DG = D8('button', 'lib-ik__pb' + (DW === DY ? ' is-on' : ''), Dv);
      ((DG.type = 'button'),
        (DG.title = Dq ? 'Keyed \u2014 clear its keys to change its space' : DB),
        (DG.disabled = Dq),
        DG.addEventListener('click', (Dg) => {
          (Dg.stopPropagation(), De(Dx, DY));
        }),
        DP.appendChild(DG));
    }
    return DP;
  }
  function DQ(Dx, Dy, DW, Dq) {
    let DP = Dy === 'pos' ? wd : yd,
      DY = D8('div', 'lib-ik__axes' + (Dq ? ' ' + Dq : ''));
    (DY.appendChild(D8('span', 'lib-ik__lb', DW)),
      ['x', 'y', 'z'].forEach((DB, DG) => {
        DY.appendChild(
          DK(
            DB,
            DP,
            () => D4.getPropTransform(Dx.name)?.[Dy]?.[DG] ?? 0,
            (Dg) => {
              (D4.setPropAxis(Dx.name, Dy, DG, Dg), D7());
            },
          ),
        );
      }));
    let Dv = D8('button', 'lib-ik__zero', '\u21BA');
    return (
      (Dv.type = 'button'),
      (Dv.title = 'Back to where the animation puts it'),
      Dv.addEventListener('click', (DB) => {
        (DB.stopPropagation(), D4.resetPropTransform(Dx.name), D7(), Dn());
      }),
      DY.appendChild(Dv),
      DY
    );
  }
  function Dj(Dx, Dy, DW) {
    let Dq = D8('div', 'lib-ik__psw');
    for (let [DP, DY, Dv] of Dy) {
      let DB = D8('button', 'lib-ik__pb' + (Dx === DP ? ' is-on' : ''), DY);
      ((DB.type = 'button'),
        (DB.title = Dv),
        DB.addEventListener('click', (DG) => {
          (DG.stopPropagation(), DW(DP));
        }),
        Dq.appendChild(DB));
    }
    return Dq;
  }
  function Dz(Dx) {
    (D4.setIkOptions({ selected: Dx }), Dn());
  }
  function DO(Dx) {
    (D4.setIkGizmoMode(Dx), Dn());
  }
  function DJ(Dx) {
    (D4.setIkOptions({ offsets: { [Dx]: null } }), D7(), Dn());
  }
  function DZ() {
    let Dx = {};
    for (let Dy of D9().limbs ?? []) ((Dx[Dy] = null), (Dx[kF(Dy)] = null));
    (D4.setIkOptions({ offsets: Dx, enabled: [], selected: null }), D4.resetProps?.(), D7(), Dn());
  }
  function DU() {
    (D4.setIkDebug(!D9().debug), Dn());
  }
  function DK(Dx, Dy, DW, Dq) {
    let DP = D8('div', 'lib-ik__f lib-ik__f--' + Dx);
    DP.appendChild(D8('b', null, Dx.toUpperCase()));
    let DY = document.createElement('input');
    ((DY.type = 'text'),
      (DY.inputMode = 'decimal'),
      (DY.value = DW().toFixed(1)),
      DP.appendChild(DY));
    let Dv = !1,
      DB = 0,
      DG = 0,
      Dg = !1;
    (DY.addEventListener('pointerdown', (Dh) => {
      document.activeElement !== DY &&
        ((Dv = !0),
        (Dg = !1),
        (DB = Dh.clientX),
        (DG = DW()),
        DY.setPointerCapture(Dh.pointerId),
        Dh.preventDefault());
    }),
      DY.addEventListener('pointermove', (Dh) => {
        if (!Dv) return;
        let DN = Dh.clientX - DB;
        Math.abs(DN) > 2 && (Dg = !0);
        let DM = DG + DN * (Dh.shiftKey ? Dy / Uf : Dy);
        ((DY.value = DM.toFixed(1)), Dq(DM));
      }));
    let DI = (Dh) => {
      if (Dv) {
        Dv = !1;
        try {
          DY.releasePointerCapture(Dh.pointerId);
        } catch {}
        Dg || (DY.focus(), DY.select());
      }
    };
    return (
      DY.addEventListener('pointerup', DI),
      DY.addEventListener('pointercancel', DI),
      DY.addEventListener('input', () => {
        let Dh = parseFloat(DY.value);
        Number.isFinite(Dh) && Dq(Dh);
      }),
      DY.addEventListener('blur', () => {
        DY.value = DW().toFixed(1);
      }),
      DY.addEventListener('keydown', (Dh) => {
        Dh.key === 'Enter' && DY.blur();
      }),
      DD.push({ input: DY, read: DW }),
      DP
    );
  }
  function DT(Dx, Dy, DW, Dq) {
    let DP = DW === 0 ? Kf : 1,
      DY = DW === 0 ? wd : yd,
      Dv = D8('div', 'lib-ik__axes' + (Dq ? ' ' + Dq : ''));
    (Dv.appendChild(D8('span', 'lib-ik__lb', Dy)),
      ['x', 'y', 'z'].forEach((DG, Dg) => {
        Dv.appendChild(
          DK(
            DG,
            DY,
            () => (Dw(Dx)[DW + Dg] ?? 0) * DP,
            (DI) => DS(Dx, DW + Dg, DI / DP),
          ),
        );
      }));
    let DB = D8('button', 'lib-ik__zero', '\u21BA');
    return (
      (DB.type = 'button'),
      (DB.title = 'Back to the animated pose'),
      DB.addEventListener('click', (DG) => {
        (DG.stopPropagation(), DJ(Dx));
      }),
      Dv.appendChild(DB),
      Dv
    );
  }
  function DA() {
    let Dx = D8('div', 'lib-ik__legend');
    for (let [Dy, DW, Dq] of L) {
      let DP = D8('div', 'lib-ik__key');
      DP.title = Dq;
      let DY = D8('span', 'lib-ik__swatch');
      ((DY.style.color = b(DW)),
        DP.appendChild(DY),
        DP.appendChild(D8('span', null, Dy)),
        Dx.appendChild(DP));
    }
    return Dx;
  }
  function Dn() {
    ((D3.innerHTML = ''), (DD = []));
    let Dx = D9(),
      Dy = Dx.limbs ?? [],
      DW = D8('div', 'lib-comp__head');
    DW.appendChild(D8('span', 'lib-comp__title', 'IK'));
    let Dq = D8('button', 'lib-btn lib-btn--sm' + (Dx.debug ? ' is-on' : ''), 'Debug');
    ((Dq.type = 'button'),
      (Dq.title = 'Draw the chain, the bend plane and the target in the viewport'),
      Dq.addEventListener('click', DU),
      DW.appendChild(Dq));
    let DP = D8('button', 'lib-btn lib-btn--sm', 'Reset all');
    if (
      ((DP.type = 'button'),
      DP.addEventListener('click', DZ),
      DW.appendChild(DP),
      D3.appendChild(DW),
      !Dy.length)
    ) {
      D3.appendChild(D8('p', 'lib-comp__hint', 'This rig has nothing to drive.'));
      return;
    }
    let DY = new Set(Dx.enabled ?? []),
      Dv = Dk();
    for (let m1 of Dy) {
      let m2 = DY.has(m1),
        m3 = m1 === 'pelvis',
        m4 = kF(m1),
        m5 = Dv === m1 || Dv === m4,
        m6 = D8('div', 'lib-ik__ctl' + (m2 ? '' : ' is-off') + (m5 ? ' is-sel' : '')),
        m7 = D8('div', 'lib-ik__ctlrow');
      m7.title = 'Put the gizmo on this effector';
      let m8 = D8('span', 'lib-ik__dot' + (m2 ? ' is-on' : ''));
      if (
        ((m8.title = m2
          ? m3
            ? 'Driving the hips \u2014 click to stop'
            : 'Solving \u2014 click to stop'
          : m3
            ? 'Click to drive the hips'
            : 'Click to solve this limb'),
        m8.addEventListener('click', (mk) => {
          (mk.stopPropagation(), DE(m1));
        }),
        m7.appendChild(m8),
        m7.appendChild(D8('span', 'lib-ik__nm', Dx.labels?.[m1] ?? m1)),
        (Dx.offsets?.[m1] || Dx.offsets?.[m4]) &&
          m7.appendChild(D8('span', 'lib-ik__moved', '\u25CF')),
        m2)
      ) {
        let mk = DH(m1);
        mk && m7.appendChild(mk);
      }
      if (!m3) {
        let mw = Dx.labels?.pelvis && Dx.labels.pelvis !== 'Pelvis' ? Dx.labels.pelvis : 'Hips';
        m7.appendChild(
          DR(m1, [
            [
              'root',
              'Root',
              'Stays put when the ' + mw.toLowerCase() + ' ' + (mw === 'Hips' ? 'move' : 'moves'),
            ],
            ['pelvis', mw, 'Follows the ' + mw.toLowerCase()],
          ]),
        );
      }
      (m7.addEventListener('click', () => Dz(m1)), m6.appendChild(m7));
      let m9 = D8('div', 'lib-ik__body');
      if (
        (m9.appendChild(DT(m1, 'Pos cm', 0)),
        m9.appendChild(DT(m1, 'Rot \u00B0', 3, 'lib-ik__axes--rot')),
        !m3 && (Dx.poled ?? Dy).includes(m1))
      ) {
        let mV = D8('div', 'lib-ik__pole'),
          mD = D8('div', 'lib-ik__polehead'),
          mm = D8('span', 'lib-ik__pdot' + (Dx.offsets?.[m4] ? ' is-on' : ''));
        if ((mD.appendChild(mm), mD.appendChild(D8('span', 'lib-ik__pnm', 'Pole')), m2)) {
          let mS = DH(m4);
          mS && mD.appendChild(mS);
        }
        ((mD.title =
          'Which way the elbow or knee points. Left alone, the rig picks the plane from the animation'),
          mD.addEventListener('click', (mE) => {
            (mE.stopPropagation(), Dz(m4));
          }),
          mD.appendChild(
            DR(m4, [
              ['root', 'Root', 'The bend plane stays fixed to the body'],
              ['tip', DV(m1), 'The bend plane tracks the limb end'],
            ]),
          ),
          mV.appendChild(mD),
          mV.appendChild(DT(m4, 'Pos cm', 0)),
          m9.appendChild(mV));
      }
      (m6.appendChild(m9), D3.appendChild(m6));
    }
    let DB = typeof Dv == 'string' && Dv.startsWith('pole.'),
      DG = (Dx.props ?? []).some((mE) => mE.selected),
      Dg = D8('div', 'lib-ik__row');
    Dg.appendChild(D8('span', 'lib-adj__label', 'Gizmo'));
    let DI = D8('div', 'lib-ik__modes');
    for (let [mE, mF, mC] of [
      ['translate', 'Move', 'Drag the effector. W'],
      ['rotate', 'Rotate', 'Turn the hand or foot. E'],
    ]) {
      let mt = D8('button', 'lib-btn lib-btn--axis' + (Dx.gizmoMode === mE ? ' is-on' : ''), mF);
      ((mt.type = 'button'),
        (mt.title = mC),
        (mt.disabled = (!Dv && !DG) || (mE === 'rotate' && DB)),
        mt.addEventListener('click', () => DO(mE)),
        DI.appendChild(mt));
    }
    let Dh = D8('div', 'lib-ik__modes');
    for (let [mH, me, mR] of [
      ['world', 'World', 'Drag along the world axes'],
      ['local', 'Local', 'Drag along the control\u2019s own axes'],
    ]) {
      let mQ = D8('button', 'lib-btn lib-btn--axis' + (Dx.gizmoSpace === mH ? ' is-on' : ''), me);
      ((mQ.type = 'button'),
        (mQ.title = mR),
        (mQ.disabled = !Dv && !DG),
        mQ.addEventListener('click', () => {
          (D4.setIkGizmoSpace(mH), Dn());
        }),
        Dh.appendChild(mQ));
    }
    (Dg.appendChild(DI), D3.appendChild(Dg));
    let DN = D8('div', 'lib-ik__row');
    (DN.appendChild(D8('span', 'lib-adj__label', 'Space')), DN.appendChild(Dh), D3.appendChild(DN));
    let DM = Dx.props ?? [];
    if (DM.length) {
      D3.appendChild(D8('p', 'lib-ik__seph', 'Props'));
      for (let mj of DM) {
        let mz = D8('div', 'lib-ik__ctlrow lib-ik__proprow' + (mj.selected ? ' is-sel' : '')),
          mO = D8('span', 'lib-ik__dot' + (mj.on ? ' is-on' : ''));
        ((mO.title = mj.on
          ? 'Adjusting \u2014 click to hand the prop back to the animation'
          : 'Click to adjust where this prop sits'),
          mO.addEventListener('click', (mT) => {
            (mT.stopPropagation(),
              D4.setPropControl(mj.name, !mj.on),
              mj.on || D4.selectProp(mj.name),
              D7(),
              Dn());
          }),
          mz.appendChild(mO),
          mz.appendChild(D8('span', 'lib-ik__nm', mj.side === 'r' ? 'R hand prop' : 'L hand prop')),
          (mz.title = mj.on ? 'Put the gizmo on this prop' : 'Not adjusting'),
          mz.addEventListener('click', () => {
            mj.on && (D4.selectProp(mj.name), Dn());
          }));
        let mJ = D8(
          'div',
          'lib-ik__ctl' + (mj.on ? '' : ' is-off') + (mj.selected ? ' is-sel' : ''),
        );
        mJ.appendChild(mz);
        let mZ = D8('div', 'lib-ik__body');
        (mZ.appendChild(DQ(mj, 'pos', 'Pos cm')),
          mZ.appendChild(DQ(mj, 'rot', 'Rot \u00B0', 'lib-ik__axes--rot')));
        let mU = D8('label', 'lib-ik__follow'),
          mK = document.createElement('input');
        if (
          ((mK.type = 'checkbox'),
          (mK.checked = !!mj.led),
          mK.addEventListener('change', (mT) => {
            (mT.stopPropagation(), D4.setPropLeads(mj.name, mK.checked), D7(), Dn());
          }),
          mU.appendChild(mK),
          mU.appendChild(
            D8('span', null, (mj.side === 'r' ? 'R' : 'L') + ' arm follows this prop'),
          ),
          (mU.title =
            'Animate the prop and the arm follows it, instead of the hand carrying the prop. Turns that arm\u2019s IK on.'),
          mU.addEventListener('click', (mT) => mT.stopPropagation()),
          mZ.appendChild(mU),
          mj.led)
        ) {
          let mT = D8('div', 'lib-ik__axes');
          (mT.appendChild(D8('span', 'lib-ik__lb', 'Axes')),
            mT.appendChild(
              Dj(
                mj.parent ?? 'prop',
                [
                  ['prop', 'Prop', 'Along the prop, as it is with leading off'],
                  ['root', 'Root', 'Along the character, whatever the wrist does'],
                  ['pelvis', 'Hips', 'Along the torso: leans and twists with it'],
                ],
                (mA) => {
                  (D4.setPropParent(mj.name, mA), D7(), Dn());
                },
              ),
            ),
            mT.addEventListener('click', (mA) => mA.stopPropagation()),
            mZ.appendChild(mT));
        }
        (mJ.appendChild(mZ), D3.appendChild(mJ));
      }
      D3.appendChild(
        D8(
          'p',
          'lib-comp__hint',
          'Moves the bone the prop hangs from, so it applies to anything that hand holds. While it is on, the clip stops driving that bone.',
        ),
      );
    }
    let m0 = D8('div', 'lib-adj lib-adj--split');
    (m0.appendChild(
      DX(
        'Reach',
        Dx.positionWeight ?? 1,
        'How far each control moves toward its effector. 0 is the animation as authored',
      ),
    ),
      D3.appendChild(m0),
      D3.appendChild(
        D8(
          'p',
          'lib-comp__hint',
          DY.size
            ? 'Drag the effector in the viewport, or scrub a field \u2014 they are the same value. It rides the animation, so the clip keeps playing under whatever you set.'
            : 'Nothing solving \u2014 the pose is untouched. Click a dot to start.',
        ),
      ),
      Dx.debug &&
        (D3.appendChild(DA()),
        D3.appendChild(
          D8(
            'p',
            'lib-comp__hint',
            'Green is the plane the joint bends in \u2014 it should turn with the limb, never snap to the other side. Red target means out of reach.',
          ),
        )));
  }
  function DX(Dx, Dy, DW) {
    let Dq = D8('div', 'lib-adj__row'),
      DP = D8('span', 'lib-adj__label', Dx);
    ((DP.title = DW), Dq.appendChild(DP));
    let DY = document.createElement('input');
    ((DY.type = 'range'),
      (DY.className = 'lib-comp__slider'),
      (DY.min = '0'),
      (DY.max = '100'),
      (DY.step = '1'),
      (DY.value = String(Math.round(Dy * 100))),
      (DY.title = DW));
    let Dv = D8('span', 'lib-comp__pct', DY.value + '%');
    return (
      DY.addEventListener('input', () => {
        ((Dv.textContent = DY.value + '%'),
          D4.setIkOptions({ positionWeight: Number(DY.value) / 100 }),
          D7());
      }),
      Dq.appendChild(DY),
      Dq.appendChild(Dv),
      Dq
    );
  }
  let DL = 0;
  function Db() {
    DL = requestAnimationFrame(Db);
    let Dx = D9(),
      Dy = (Dx.props ?? []).some((Dq) => Dq.selected),
      DW = Object.keys(Dx.keys || {}).length > 0;
    if (!((!Dx.dragging && !Dy && !DW) || !DD.length)) {
      if (DW) {
        for (let Dq of D3.querySelectorAll('.lib-ik__key')) {
          let DP = DC(Dq.dataset.key);
          (Dq.classList.toggle('is-on', DP),
            Dq.setAttribute('aria-pressed', String(DP)),
            Dq.classList.toggle('is-keyed', !!DF(Dq.dataset.key)?.length));
        }
        for (let DY of D3.querySelectorAll('.lib-ik__psw'))
          if (DF(DY.dataset.key)?.length) {
            for (let Dv of DY.children)
              Dv.disabled ||
                ((Dv.disabled = !0),
                (Dv.title = 'Keyed \u2014 clear its keys to change its space'));
          }
      }
      for (let DB of DD) {
        if (document.activeElement === DB.input) continue;
        let DG = DB.read().toFixed(1);
        DB.input.value !== DG && (DB.input.value = DG);
      }
    }
  }
  return (
    Db(),
    Dn(),
    {
      render: Dn,
      get: () => D9(),
      setWriter: (Dx) => {
        Dm = typeof Dx == 'function' ? Dx : null;
      },
      dispose() {
        cancelAnimationFrame(DL);
      },
    }
  );
}
var Lo = (D3, D4, D5) => D5 * D3 + (1 - D5) * D4;
function Xr(D3) {
  let D4 = [],
    D5 = -1;
  for (let D6 = 0; D6 <= D3.length; D6++)
    D6 < D3.length && D3[D6]
      ? D5 < 0 && (D5 = D6)
      : D5 >= 0 && (D4.push({ start: D5, length: D6 - D5 }), (D5 = -1));
  return D4;
}
var Wf = (D3) => (D3 - 1 >= 0 ? D3 - 1 : D3),
  Vf = (D3, D4) => (D4 < D3 ? D4 : D4 - 1),
  Ni = {
    breakdown: {
      name: 'Breakdown',
      tip: 'Each picked key towards the key before (left) or after (right) \u2014 a breakdown between them',
      bounds: [-1, 1],
      start: 0,
      overshoot: !0,
    },
    neighbor: {
      name: 'Blend to Neighbor',
      tip: 'The picked keys blended towards the key before or after',
      bounds: [-1, 1],
      start: 0,
      overshoot: !0,
    },
    toDefault: {
      name: 'Blend to Default Value',
      tip: 'The picked keys blended towards the value they have unkeyed',
      bounds: [0, 1],
      start: 0,
      overshoot: !0,
    },
    ease: {
      name: 'Ease',
      tip: 'The picked keys lined up on an ease in or out between the keys either side (Tab: its sharpness)',
      bounds: [-1, 1],
      start: 0,
      overshoot: !1,
      toggle: 'Tab',
    },
    offset: {
      name: 'Blend Offset',
      tip: 'The picked keys moved together, until they meet the key before or after',
      bounds: [-1, 1],
      start: 0,
      overshoot: !0,
    },
    toEase: {
      name: 'Blend to Ease',
      tip: 'The picked keys blended towards an ease in or out',
      bounds: [-1, 1],
      start: 0,
      overshoot: !1,
    },
    matchSlope: {
      name: 'Match Slope',
      tip: 'The picked keys blended towards the slope of the keys beyond either side',
      bounds: [-1, 1],
      start: 0,
      overshoot: !1,
    },
    pushPull: {
      name: 'Push Pull',
      tip: 'The picked keys pushed away from, or pulled towards, a straight line between the keys either side',
      bounds: [0, 2],
      start: 1,
      overshoot: !0,
    },
    shear: {
      name: 'Shear Keys',
      tip: 'The picked keys sheared from the key before (D: from the key after)',
      bounds: [-1, 1],
      start: 0,
      overshoot: !0,
      toggle: 'd',
    },
    scaleAverage: {
      name: 'Scale Average',
      tip: 'The picked keys scaled about their average',
      bounds: [0, 2],
      start: 1,
      overshoot: !0,
    },
    scaleNeighbor: {
      name: 'Scale from Neighbor',
      tip: 'The picked keys scaled from the key before (D: the key after)',
      bounds: [0, 2],
      start: 1,
      overshoot: !0,
      toggle: 'd',
    },
    timeOffset: {
      name: 'Time Offset',
      tip: "The picked keys take the curve's values from frames earlier or later, round its loop",
      bounds: [-10, 10],
      start: 0,
      overshoot: !0,
      unit: 'frames',
      step: 1,
      percent: !1,
    },
  };
for (let e of Object.values(Ni)) ((e.percent ??= !0), (e.step ??= 0.1));
var Is = {
  gaussian: {
    name: 'Smooth (Gaussian)',
    tip: 'The picked keys smoothed by a Gaussian filter over the curve either side',
    bounds: [0, 1],
    start: 0,
    overshoot: !1,
    percent: !0,
    step: 0.1,
  },
  butterworth: {
    name: 'Butterworth Smooth',
    tip: "The picked keys smoothed by a Butterworth filter, keeping the curve's general shape (lower: smoother)",
    bounds: [0, 15],
    start: 3,
    overshoot: !1,
    percent: !1,
    unit: 'Hz',
    step: 1.5,
  },
};
function Hr(D3, D4, D5) {
  let D6 = (D3 - D5) * D4;
  return (D6 / Math.sqrt(1 + D6 * D6) + 1) * 0.5;
}
function Gf(D3, D4, D5, D6, D7, D8) {
  let D9 =
    (D6 * Math.pow(D3 - D7, D4)) / (Math.pow(D3 - D7, D4) + Math.pow(D5 - (D3 - D7), D4)) + D8;
  return (D3 > D7 + D5 ? (D9 = D6 + D8) : D3 < D7 && (D9 = D8), D9);
}
var Yf = (D3, D4) => D3 - D4 * Math.floor(D3 / D4);
function xd(D3, D4, D5, D6, D7 = {}) {
  let D8 = D4.length,
    D9 = D4.map((DV) => DV.v),
    Dk = D4.map((DV) => DV.x),
    Dw = D9.slice();
  if (!D8) return Dw;
  if (D3 === 'toDefault')
    return (
      D4.forEach((DV, DD) => {
        D5[DD] && (Dw[DD] = Lo(D7.rest ?? 0, D9[DD], D6));
      }),
      Dw
    );
  for (let { start: DV, length: DD } of Xr(D5)) {
    let Dm = DV + DD,
      DS = Wf(DV),
      DE = Vf(D8, Dm),
      DF = Dk[DE] - Dk[DS],
      DC = D9[DE] - D9[DS],
      Dt = (DH) => {
        for (let De = DV; De < Dm; De++) Dw[De] = DH(De);
      };
    switch (D3) {
      case 'breakdown': {
        let DH = (D6 + 1) / 2;
        Dt(() => Lo(D9[DE], D9[DS], DH));
        break;
      }
      case 'neighbor': {
        let De = D6 < 0 ? D9[DS] : D9[DE];
        Dt((DR) => Lo(De, D9[DR], Math.abs(D6)));
        break;
      }
      case 'ease': {
        if (Math.abs(DF) < 1e-9) break;
        let DR = D7.sharpness ?? 2,
          DQ = -D6,
          Dj = Hr(-1, DR, DQ),
          Dz = Hr(1, DR, DQ);
        Dt((DO) => D9[DS] + (DC * (Hr(((Dk[DO] - Dk[DS]) / DF) * 2 - 1, DR, DQ) - Dj)) / (Dz - Dj));
        break;
      }
      case 'offset': {
        let DO = D6 > 0 ? D9[DE] - D9[Dm - 1] : D9[DS] - D9[DV];
        Dt((DJ) => D9[DJ] + DO * Math.abs(D6));
        break;
      }
      case 'toEase': {
        if (Math.abs(DF) < 1e-9) break;
        let DJ = D6 > 0 ? -1 : 0;
        Dt((DZ) => {
          let DU = D9[DS] + DC * Gf((Dk[DZ] - Dk[DS]) / DF, 3, 2, 2, DJ, DJ),
            DK = D6 > 0 ? DU - D9[DZ] : D9[DZ] - DU;
          return D9[DZ] + DK * D6;
        });
        break;
      }
      case 'matchSlope': {
        let DZ, DU;
        if (D6 >= 0) {
          if (Dm >= D8 - 1) return null;
          ((DZ = DE), (DU = Dm + 1));
        } else {
          if (DV <= 1) return null;
          ((DZ = DS), (DU = DV - 2));
        }
        let DK = D9[DU] - D9[DZ],
          DT = Dk[DU] - Dk[DZ];
        if (DT === 0) return null;
        Dt((DA) => D9[DA] + (D9[DZ] + ((Dk[DA] - Dk[DZ]) * DK) / DT - D9[DA]) * Math.abs(D6));
        break;
      }
      case 'shear': {
        if (Math.abs(DF) < 1e-9) break;
        Dt(
          (DA) =>
            D9[DA] +
            DC * (D7.from === 'right' ? (Dk[DE] - Dk[DA]) / DF : (Dk[DA] - Dk[DS]) / DF) * D6,
        );
        break;
      }
      case 'pushPull': {
        if (Math.abs(DF) < 1e-9) break;
        Dt((DA) => {
          let Dn = D9[DS] + (DC * (Dk[DA] - Dk[DS])) / DF;
          return Dn + (D9[DA] - Dn) * D6;
        });
        break;
      }
      case 'scaleAverage': {
        let DA = 0;
        for (let DX = DV; DX < Dm; DX++) DA += D9[DX];
        let Dn = DA / DD;
        Dt((DL) => Lo(Dn, D9[DL], 1 - D6));
        break;
      }
      case 'scaleNeighbor': {
        let DL = D7.from === 'right' ? DE : DS;
        Dt((Db) => Lo(D9[Db], D9[DL], D6));
        break;
      }
      case 'timeOffset': {
        let Db = Dk[0],
          Dx = Dk[D8 - 1] - Db,
          Dy = D9[D8 - 1] - D9[0];
        if (!(Dx > 0) || !D7.at) break;
        Dt((DW) => {
          let Dq = Dk[DW] + D6;
          return D7.at(Yf(Dq - Db, Dx) + Db) + Dy * Math.floor((Dq - Db) / Dx);
        });
        break;
      }
      default:
        break;
    }
  }
  return Dw;
}
function Hf(D3, D4) {
  let D5 = new Float64Array(D4),
    D6 = 2 * D3 * D3,
    D7 = 0;
  for (let D8 = 0; D8 < D4; D8++) {
    let D9 = D8 / (D4 - 1);
    ((D5[D8] = Math.exp((-D9 * D9) / D6)), (D7 += D8 ? 2 * D5[D8] : D5[D8]));
  }
  for (let Dk = 0; Dk < D4; Dk++) D5[Dk] /= D7;
  return D5;
}
function Md(D3, D4, D5, D6, { sigma: D7 = 0.33, width: D8 = 6 } = {}) {
  let D9 = D3.map((Dw) => Dw.v),
    Dk = Hf(D7, D8 + 1);
  for (let { start: Dw, length: DV } of Xr(D4)) {
    let DD = D3[Dw].x,
      Dm = Math.trunc(D3[Dw + DV - 1].x - DD) + (D8 * 2 + 1),
      DS = Array.from({ length: Dm }, (DF, DC) => D6(DD - D8 + DC)),
      DE = DS.slice();
    for (let DF = D8; DF < Dm - D8; DF++) {
      let DC = DS[DF] * Dk[0];
      for (let Dt = 1; Dt <= D8; Dt++) DC += (DS[DF + Dt] + DS[DF - Dt]) * Dk[Dt];
      DE[DF] = DC;
    }
    for (let DH = Dw; DH < Dw + DV; DH++) {
      let De = D3[DH].x - DD + D8,
        DR = Math.round(De),
        DQ = Math.min(Dm - 1, Math.max(0, DR + Math.sign(De - DR))),
        Dj = Lo(DE[DQ], DE[DR], Math.abs(De - DR));
      D9[DH] = Lo(Dj, D3[DH].v, D5);
    }
  }
  return D9;
}
function Xf(D3, D4, D5) {
  let D6 = Math.tan((Math.PI * D3) / D4),
    D7 = D6 * D6,
    D8 = new Float64Array(D5),
    D9 = new Float64Array(D5),
    Dk = new Float64Array(D5);
  for (let Dw = 0; Dw < D5; Dw++) {
    let DV = Math.sin((Math.PI * (2 * Dw + 1)) / (4 * D5)),
      DD = D7 + 2 * D6 * DV + 1;
    ((D8[Dw] = D7 / DD), (D9[Dw] = (2 * (1 - D7)) / DD), (Dk[Dw] = -(D7 - 2 * D6 * DV + 1) / DD));
  }
  return { A: D8, d1: D9, d2: Dk, order: D5 };
}
function vd(D3, D4, D5, D6, D7) {
  for (let D8 = 0; D8 < D7.order; D8++)
    ((D4[D8] = D7.d1[D8] * D5[D8] + D7.d2[D8] * D6[D8] + D3),
      (D3 = D7.A[D8] * (D4[D8] + 2 * D5[D8] + D6[D8])),
      (D6[D8] = D5[D8]),
      (D5[D8] = D4[D8]));
  return D3;
}
function Jf(D3, D4, D5, D6, D7, D8) {
  if (D5 === D6 || D8 === 0) return D3[D5];
  let D9 = D3[D5] - D3[D5 - 1],
    Dk = D3[D6] - D3[D6 + 1],
    Dw = D4[D5 + D8 - 1] - D4[D5 + D8],
    DV = D4[D6 - D8] - D4[D6 - D8 - 1];
  if (D7 - D5 <= D8) {
    let DD = D7 - D5;
    return Lo(D4[D5 + D8] + Dw * (D8 - DD), D3[D5] + D9 * DD, Math.min(1, Math.max(0, DD / D8)));
  }
  if (D6 - D7 <= D8) {
    let Dm = D6 - D7;
    return Lo(D4[D6 - D8] + DV * (D8 - Dm), D3[D6] + Dk * Dm, Math.min(1, Math.max(0, Dm / D8)));
  }
  return 0;
}
function Cd(
  D3,
  D4,
  D5,
  D6,
  { fps: D7 = 30, order: D8 = 4, perFrame: D9 = 1, blend: Dk = 1, inOut: Dw = 1 } = {},
) {
  let DV = D3.map((DS) => DS.v),
    DD = D7 * D9,
    Dm = Xf(Math.min(D5, DD / 2), DD, D8);
  for (let { start: DS, length: DE } of Xr(D4)) {
    let DF = D3[DS].x,
      DC = D3[DS + DE - 1].x,
      Dt = (Math.trunc(DC - DF) + 1 + D8 * 2) * D9 + 60,
      DH = Array.from({ length: Dt }, (DK, DT) => D6(DF - D8 + DT / D9)),
      De = new Float64Array(Dt),
      DR = new Float64Array(D8),
      DQ = new Float64Array(D8),
      Dj = new Float64Array(D8),
      Dz = DH[0];
    for (let DK = 0; DK < Dt; DK++) De[DK] = vd(DH[DK] - Dz, DR, DQ, Dj, Dm) + Dz;
    ((DR = new Float64Array(D8)), (DQ = new Float64Array(D8)), (Dj = new Float64Array(D8)));
    let DO = De[Dt - 1];
    for (let DT = Dt - 1; DT >= 0; DT--) De[DT] = vd(De[DT] - DO, DR, DQ, Dj, Dm) + DO;
    let DJ = D8 * D9,
      DZ = Math.trunc(DC - DF + D8) * D9,
      DU = Math.min(Dw, Math.trunc((DZ - DJ) / 2));
    for (let DA = DS; DA < DS + DE; DA++) {
      let Dn =
          DU === 0
            ? 1
            : DA < DS + Math.trunc(DE / 2)
              ? Math.min((DA - DS) / DU, 1)
              : Math.min((DS + DE - DA - 1) / DU, 1),
        DX = Math.round((D3[DA].x - DF + D8) * D9),
        DL = Lo(De[DX], Jf(DH, De, DJ, DZ, DX, DU), Dn);
      DV[DA] = Lo(DL, DH[DX], Dk);
    }
  }
  return DV;
}
function Sd(D3, D4) {
  let D5 = D3.map((D9, Dk) => Dk).filter((D9) => D4[D9]),
    D6 = D3.map((D9) => ({ v: D9.v, hIn: D9.hIn, hOut: D9.hOut }));
  if (D5.length < 3) return D6;
  let D7 = D5.map((D9) => D3[D9].v),
    D8 = [];
  for (let D9 = 1; D9 < D5.length - 1; D9++) {
    let Dk = D7[D9 - 1],
      Dw = D9 - 2 > 0 ? D7[D9 - 2] : D7[D9 - 1],
      DV = D7[D9],
      DD = D7[D9 + 1],
      Dm = D9 + 2 < D5.length ? D7[D9 + 2] : D7[D9 + 1],
      DS = (3 * Dw + 5 * Dk + 2 * DV + DD + Dm) / 12,
      DE = (Dw + Dk + 2 * DV + 5 * DD + 3 * Dm) / 12;
    D8[D9] = { y1: DS, y2: (DS + DE) / 2, y3: DE };
  }
  for (let DF = 1; DF < D5.length - 1; DF++) {
    let DC = D5[DF],
      Dt = D3[DC],
      DH = D8[DF];
    D6[DC] = { v: DH.y2, hIn: Dt.hIn * 0.7 + DH.y1 * 0.3, hOut: Dt.hOut * 0.7 + DH.y3 * 0.3 };
  }
  return D6;
}
var is = (D3, D4, D5) => Math.abs(D3 - D4) <= D5;
function $d(
  D3,
  D4,
  { thresh: D5 = 0.001, onlyPicked: D6 = !0, clearDefault: D7 = !1, rest: D8 = 0 } = {},
) {
  let D9 = D3.length,
    Dk = new Array(D9).fill(!1);
  if (!D9 || (!D7 && D9 === 1)) return { keep: Dk.fill(!0), empty: !1 };
  Dk[0] = !0;
  let Dw = 0;
  for (let Dm = 1; Dm < D9; Dm++) {
    let DS = D3[Dw],
      DE = D3[Dm],
      DF = Dm < D9 - 1 ? D3[Dm + 1] : null,
      DC;
    (D6 && !D4[Dm]
      ? (DC = !0)
      : is(DE.x, DS.x, D5)
        ? (DC =
            DF && is(DE.x, DF.x, D5) && !is(DF.v, DS.v, D5)
              ? DE.v > DF.v && !is(DE.v, DS.v, D5)
              : !is(DE.v, DS.v, D5))
        : DF
          ? (DC = !is(DE.v, DS.v, D5) || !is(DE.v, DF.v, D5))
          : (DC = !is(DE.v, DS.v, D5)),
      DC && ((Dk[Dm] = !0), (Dw = Dm)));
  }
  let DV = Dk.filter(Boolean).length,
    DD = D7 && DV === 1 && D3[Dk.indexOf(!0)].v === D8;
  return { keep: Dk, empty: DD };
}
function Ad(D3, D4, D5) {
  let D6 = [],
    D7 = null;
  for (let D8 = 0; D8 < D3.length; D8++) {
    if (!D4[D8]) continue;
    if (D7 == null) {
      D7 = D3[D8];
      continue;
    }
    if (D8 < D3.length - 1 && D4[D8 + 1]) continue;
    let D9 = D3[D8],
      Dk = Math.ceil(D9.x - D7.x),
      Dw = Math.floor(D7.x);
    for (let DV = 1; DV < Dk; DV++) D6.push({ x: Dw + DV, v: D5(Dw + DV) });
    D7 = null;
  }
  return D6;
}
function _d(D3, D4) {
  let D5 = [0, 0, 0];
  for (let D6 = 0; D6 < 3; D6++)
    ((D5[D6] = D3[D6] - D4[D6]),
      D5[D6] > 180
        ? ((D3[D6] -= Math.floor(D5[D6] / 360 + 0.5) * 360), (D5[D6] = D3[D6] - D4[D6]))
        : D5[D6] < -180 &&
          ((D3[D6] += Math.floor(-D5[D6] / 360 + 0.5) * 360), (D5[D6] = D3[D6] - D4[D6])));
  for (let D7 = 0, D8 = 1, D9 = 2; D7 < 3; D8 = D9, D9 = D7++)
    Math.abs(D5[D7]) > 180 &&
      Math.abs(D5[D8]) < 90 &&
      Math.abs(D5[D9]) < 90 &&
      (D3[D7] += D5[D7] > 0 ? -360 : 360);
  return D3;
}
function Zf(D3, D4) {
  let D5 = Vk(VV(D3)),
    D6 =
      Math.abs(Math.cos((D5[1] * Math.PI) / 180)) <= 0.0000375
        ? D5.slice()
        : [D5[0] + 180, 180 - D5[1], D5[2] + 180],
    D7 = _d(D5, D4),
    D8 = _d(D6, D4),
    D9 = (Dk) => Math.abs(Dk[0] - D4[0]) + Math.abs(Dk[1] - D4[1]) + Math.abs(Dk[2] - D4[2]);
  return D9(D7) > D9(D8) ? D8 : D7;
}
function Ed(D3) {
  let D4 = D3.map((D9) => (D9 ? D9.map((Dk) => Dk.v) : null)),
    D5 = !1,
    [D6, D7, D8] = D3;
  if (D6 && D7 && D8 && D6.length === D7.length && D7.length === D8.length && D6.length >= 2) {
    D5 = !0;
    let D9 = [D6[0].v, D7[0].v, D8[0].v];
    for (let Dk = 1; Dk < D6.length; Dk++)
      Math.abs(D6[Dk].x - D7[Dk].x) > 0.00001 ||
        Math.abs(D7[Dk].x - D8[Dk].x) > 0.00001 ||
        Math.abs(D6[Dk].x - D8[Dk].x) > 0.00001 ||
        ((D9 = Zf([D4[0][Dk], D4[1][Dk], D4[2][Dk]], D9)),
        (D4[0][Dk] = D9[0]),
        (D4[1][Dk] = D9[1]),
        (D4[2][Dk] = D9[2]));
  }
  for (let Dw of D4)
    if (!(!Dw || Dw.length <= 2))
      for (let DV = 1; DV < Dw.length; DV++) {
        let DD = Dw[DV - 1] > Dw[DV] ? 1 : -1;
        for (; DD * (Dw[DV - 1] - Dw[DV]) >= 180;) Dw[DV] += DD * 360;
      }
  return { values: D4, together: D5 };
}
var bs = Math.fround,
  Qf = 3.4028234663852886e38,
  Nd = 12,
  uo = (D3) => D3 * D3,
  ta = (D3, D4) => (D3 < D4 ? D4 : D3),
  Go = (D3, D4) => D3[0] * D4[0] + D3[1] * D4[1],
  ji = (D3, D4) => Math.sqrt(uo(D3[0] - D4[0]) + uo(D3[1] - D4[1])),
  ep = (D3) => -1e-8 < D3 && D3 < 1e-8;
function Jr(D3) {
  let D4 = D3[0] * D3[0] + D3[1] * D3[1];
  if (D4 !== 0 && (D4 = Math.sqrt(D4)) !== 0) {
    let D5 = 1 / D4;
    ((D3[0] *= D5), (D3[1] *= D5));
  }
  return D4;
}
function Ld(D3, D4) {
  let D5 = Go(D3, D4);
  return [D3[0] - D4[0] * D5, D3[1] - D4[1] * D5];
}
function Bi(D3, D4, D5, D6, D7, D8, D9) {
  ((D3[0] = D4[0]),
    (D3[1] = D4[1]),
    (D3[6] = D5[0]),
    (D3[7] = D5[1]),
    (D3[2] = D4[0] - D6[0] * D7),
    (D3[3] = D4[1] - D6[1] * D7),
    (D3[4] = D5[0] + D8[0] * D9),
    (D3[5] = D5[1] + D8[1] * D9));
}
function Bd(D3, D4, D5) {
  let D6 = 1 - D4;
  for (let D7 = 0; D7 < 2; D7++) {
    let D8 = D3[D7] * D6 + D3[2 + D7] * D4,
      D9 = D3[2 + D7] * D6 + D3[4 + D7] * D4,
      Dk = D3[4 + D7] * D6 + D3[6 + D7] * D4;
    D5[D7] = (D8 * D6 + D9 * D4) * D6 + (D9 * D6 + Dk * D4) * D4;
  }
}
function tp(D3, D4, D5, D6, D7) {
  let D8 = 1 - D4,
    D9 = D8 * D8,
    Dk = D4 * D4,
    Dw = 2 * D8 * D4;
  for (let DV = 0; DV < 2; DV++) {
    let DD = D3[DV],
      Dm = D3[2 + DV],
      DS = D3[4 + DV],
      DE = D3[6 + DV],
      DF = Dm - DD,
      DC = DS - Dm,
      Dt = DE - DS,
      DH = DD + DF * D4,
      De = Dm + DC * D4,
      DR = DS + Dt * D4;
    ((D5[DV] = (DH * D8 + De * D4) * D8 + (De * D8 + DR * D4) * D4),
      (D6[DV] = 3 * (DF * D9 + DC * Dw + Dt * Dk)),
      (D7[DV] = 6 * ((DC - DF) * D8 + (Dt - DC) * D4)));
  }
}
function Zr(D3, D4, D5, D6) {
  let D7 = 0,
    D8 = [0, 0];
  for (let D9 = 1; D9 < D5 - 1; D9++) {
    Bd(D3, D6[D9], D8);
    let Dk = uo(D4[2 * D9] - D8[0]) + uo(D4[2 * D9 + 1] - D8[1]);
    Dk >= D7 && (D7 = Dk);
  }
  return D7;
}
function np(D3, D4, D5, D6, D7) {
  let D8 = 0,
    D9 = [0, 0];
  for (let Dk = 1; Dk < D5 - 1; Dk++) {
    Bd(D3, D6[Dk], D9);
    let Dw = uo(D4[2 * Dk] - D9[0]) + uo(D4[2 * Dk + 1] - D9[1]);
    if (Dw >= D7) return D7;
    Dw >= D8 && (D8 = Dw);
  }
  return D8;
}
function op(D3, D4) {
  let D5 = (Dw, DV) => Math.sqrt(uo(D3[2 * Dw] - D3[2 * DV]) + uo(D3[2 * Dw + 1] - D3[2 * DV + 1])),
    D6 = D4 - 1,
    D7 = 0,
    D8 = D5(D4 - 2, D6),
    D9 = 0,
    Dk = [0, 0];
  for (let Dw = 0; Dw < D4; Dw++) {
    let DV = D5(D6, D7),
      DD = D8 + DV;
    ((D9 += DD),
      (Dk[0] += D3[2 * D6] * DD),
      (Dk[1] += D3[2 * D6 + 1] * DD),
      (D8 = DV),
      (D6 = D7),
      D7++);
  }
  if (D9 !== 0) {
    let Dm = 1 / D9;
    ((Dk[0] *= Dm), (Dk[1] *= Dm));
  }
  return Dk;
}
function sp(D3, D4) {
  let D5 = Go(D3, D4),
    D6 = D5 < 0 ? ji(D3, D4) : Math.sqrt(uo(D3[0] + D4[0]) + uo(D3[1] + D4[1]));
  return D6 > Number.EPSILON ? Math.acos(ta(-Math.abs(D5), -1)) / D6 : Math.PI / 2;
}
function ip(D3, D4) {
  let D5 = Go(D3, D4);
  if (D5 > 1 - 1e-8) return (1 / 3) * 0.75;
  if (D5 < -1 + 1e-8) return 1 / 2;
  let D6 = Math.acos(D5) / 2,
    D7 = Math.sin(D6);
  return (1 - Math.cos(D6)) / (D7 * 2) / D7;
}
function rp(D3, D4, D5, D6, D7) {
  let D8 = ji(D3, D4),
    D9 = D8 * (ip(D5, D6) / 0.75),
    Dk = D8 * sp(D5, D6),
    Dw = D7 / Dk;
  return ((Dw = (Dw - 1) * 1.75 + 1), D9 * Dw);
}
function Od(D3, D4, D5, D6, D7) {
  let D8 = rp(D3, D4, D5, D6, D7);
  return Number.isFinite(D8) ? D8 : ji(D3, D4) / 3;
}
function ap(D3, D4, D5, D6, D7) {
  let D8 = 2 * (D4 - 1),
    D9 = [D3[0], D3[1]],
    Dk = [D3[D8], D3[D8 + 1]],
    Dw = ji(D9, Dk) / 3;
  Bi(D7, D9, Dk, D5, Dw, D6, Dw);
}
function lp(D3, D4, D5, D6, D7) {
  let D8 = 2 * (D4 - 1),
    D9 = [D3[0], D3[1]],
    Dk = [D3[D8], D3[D8 + 1]],
    Dw = [Dk[0] - D9[0], Dk[1] - D9[1]],
    DV = Jr(Dw),
    DD = [Ld(D5, Dw), Ld(D6, Dw)];
  (Jr(DD[0]), Jr(DD[1]), (DD[1][0] *= -1), (DD[1][1] *= -1));
  let Dm = [0, 0],
    DS = [0, 0];
  for (let DC = 1; DC < D4 - 1; DC++)
    for (let Dt = 0; Dt < 2; Dt++) {
      ((DS[0] = D9[0] - D3[2 * DC]), (DS[1] = D9[1] - D3[2 * DC + 1]));
      let DH = Go(DS, DD[Dt]);
      ((DS[0] = DD[Dt][0] * DH), (DS[1] = DD[Dt][1] * DH), (Dm[Dt] = ta(Dm[Dt], Go(DS, DD[Dt]))));
    }
  let DE = Dm[0] / 0.75 / Math.abs(Go(D5, DD[0])),
    DF = Dm[1] / 0.75 / Math.abs(Go(D6, DD[1]));
  ((!(DE > 0) || DE > Dm[0] + DV) && (DE = DV / 3),
    (!(DF > 0) || DF > Dm[1] + DV) && (DF = DV / 3),
    Bi(D7, D9, Dk, D5, DE, D6, DF));
}
function Id(D3, D4, D5, D6, D7, D8, D9) {
  let Dk = 2 * (D4 - 1),
    Dw = [D3[0], D3[1]],
    DV = [D3[Dk], D3[Dk + 1]],
    DD,
    Dm;
  {
    let DR = 0,
      DQ = 0,
      Dj = 0,
      Dz = 0,
      DO = 0,
      DJ = 0;
    for (let DT = 0; DT < D4; DT++) {
      let DA = D6[DT],
        Dn = 1 - DA,
        DX = Dn * Dn,
        DL = DA * DA,
        Db = 3 * DA * Dn,
        Dx = Db * Dn,
        Dy = Db * DA,
        DW = DX * (1 + 2 * DA),
        Dq = DL * (3 - 2 * DA);
      for (let DP = 0; DP < 2; DP++) {
        let DY = D7[DP] * Dx,
          Dv = D8[DP] * Dy,
          DB = D3[2 * DT + DP] - Dw[DP] * DW + DV[DP] * Dq;
        ((DR += DY * DB), (DQ += Dv * DB), (Dj += DY * DY), (Dz += DY * Dv), (DJ += Dv * Dv));
      }
      DO = Dz;
    }
    let DZ = Dj * DJ - Dz * DO,
      DU = DQ * Dj - DR * Dz,
      DK = DR * DJ - DQ * Dz;
    (ep(DZ) && (DZ = Dj * DJ * 1e-11), (DD = DK / DZ), (Dm = DU / DZ));
  }
  let DS = !0;
  if (
    ((!(DD >= 0) || !(Dm >= 0)) && ((DD = Dm = Od(Dw, DV, D7, D8, D5)), (DS = !1)),
    Bi(D9, Dw, DV, D7, DD, D8, Dm),
    !DS)
  )
    return;
  let DE = op(D3, D4),
    DF = 3,
    DC = 0;
  for (let DG = 0; DG < D4; DG++) {
    let Dg = 0;
    for (let DI = 0; DI < 2; DI++) Dg += uo((D3[2 * DG + DI] - DE[DI]) * DF);
    DC = ta(DC, Dg);
  }
  let Dt = (Dh) => uo(DE[0] - D9[Dh]) + uo(DE[1] - D9[Dh + 1]),
    DH = Dt(2),
    De = Dt(4);
  (DH > DC || De > DC) &&
    ((DD = Dm = Od(Dw, DV, D7, D8, D5)),
    Bi(D9, Dw, DV, D7, DD, D8, Dm),
    (DH = Dt(2)),
    (De = Dt(4)));
  for (let [Dh, DN] of [
    [2, DH],
    [4, De],
  ]) {
    if (!(DN > DC)) continue;
    let DM = Math.sqrt(DC) / Math.sqrt(DN);
    ((D9[Dh] = (D9[Dh] - DE[0]) * DM + DE[0]), (D9[Dh + 1] = (D9[Dh + 1] - DE[1]) * DM + DE[1]));
  }
}
function cp(D3, D4) {
  let D5 = new Float64Array(D4);
  for (let D6 = 1; D6 < D4; D6++)
    D5[D6] = Math.sqrt(uo(D3[2 * D6] - D3[2 * D6 - 2]) + uo(D3[2 * D6 + 1] - D3[2 * D6 - 1]));
  return D5;
}
function dp(D3, D4, D5) {
  D5[0] = 0;
  for (let D8 = 1; D8 < D3; D8++) D5[D8] = D5[D8 - 1] + D4[D8];
  let D6 = D5[D3 - 1],
    D7 = 1 / D6;
  for (let D9 = 1; D9 < D3; D9++) D5[D9] *= D7;
  return D6;
}
function up(D3, D4, D5, D6, D7, D8, D9) {
  return (
    tp(D3, D6, D7, D8, D9),
    (D7[0] -= D4),
    (D7[1] -= D5),
    D6 - Go(D7, D8) / (D8[0] * D8[0] + D8[1] * D8[1] + Go(D7, D9))
  );
}
function fp(D3, D4, D5, D6, D7) {
  let D8 = [0, 0],
    D9 = [0, 0],
    Dk = [0, 0];
  for (let Dw = 0; Dw < D5; Dw++)
    if (
      ((D7[Dw] = up(D3, D4[2 * Dw], D4[2 * Dw + 1], D6[Dw], D8, D9, Dk)), !Number.isFinite(D7[Dw]))
    )
      return !1;
  return (D7.sort(), !(D7[0] < 0 || D7[D5 - 1] > 1));
}
function pp(D3, D4, D5, D6, D7, D8, D9) {
  let Dk = new Float64Array(D4),
    Dw = dp(D4, D5, Dk);
  Id(D3, D4, Dw, Dk, D6, D7, D9);
  let DV = Zr(D9, D3, D4, Dk),
    DD = new Float64Array(8);
  if (!(DV < D8)) {
    ap(D3, D4, D6, D7, DD);
    let DS = Zr(DD, D3, D4, Dk);
    DV > DS && ((DV = DS), D9.set(DD));
  }
  if (!(DV < D8)) {
    lp(D3, D4, D6, D7, DD);
    let DE = np(DD, D3, D4, Dk, DV);
    DV > DE && ((DV = DE), D9.set(DD));
  }
  if (DV < D8) return DV;
  DD.set(D9);
  let Dm = new Float64Array(D4);
  for (let DF = 0; DF < 4 && fp(DD, D3, D4, Dk, Dm); DF++) {
    Id(D3, D4, Dw, Dm, D6, D7, DD);
    let DC = Zr(DD, D3, D4, Dm);
    if ((DV > DC && ((DV = DC), D9.set(DD)), DV < D8)) break;
    [Dk, Dm] = [Dm, Dk];
  }
  return DV;
}
function hp(D3, D4, D5, D6, D7) {
  let D8 = new Float64Array(8),
    D9 = pp(D3, D4, cp(D3, D4), D5, D6, D7, D8);
  return { hl: [D8[2], D8[3]], hr: [D8[4], D8[5]], errorSq: D9 };
}
var ea = class {
  constructor() {
    this.tree = [];
  }
  get ['size']() {
    return this.tree.length;
  }
  ['swap'](D3, D4) {
    let D5 = this.tree,
      D6 = D5[D3],
      D7 = D5[D4];
    ((D6.index = D4), (D5[D4] = D6), (D7.index = D3), (D5[D3] = D7));
  }
  ['down'](D3) {
    let D4 = this.tree,
      D5 = D4.length;
    for (;;) {
      let D6 = 2 * D3 + 1,
        D7 = D6 + 1,
        D8 = D3;
      if (
        (D6 < D5 && D4[D6].value < D4[D8].value && (D8 = D6),
        D7 < D5 && D4[D7].value < D4[D8].value && (D8 = D7),
        D8 === D3)
      )
        break;
      (this.swap(D3, D8), (D3 = D8));
    }
  }
  ['up'](D3) {
    let D4 = this.tree;
    for (; D3 > 0;) {
      let D5 = (D3 - 1) >> 1;
      if (D4[D5].value < D4[D3].value) break;
      (this.swap(D5, D3), (D3 = D5));
    }
  }
  ['insert'](D3, D4) {
    let D5 = { value: D3, index: this.tree.length, ptr: D4 };
    return (this.tree.push(D5), this.up(D5.index), D5);
  }
  ['update'](D3, D4, D5) {
    ((D3.ptr = D5),
      D4 < D3.value
        ? ((D3.value = D4), this.up(D3.index))
        : D4 > D3.value && ((D3.value = D4), this.down(D3.index)));
  }
  ['popMin']() {
    let D3 = this.tree,
      D4 = D3[0],
      D5 = D3.length - 1;
    return (D5 && this.swap(0, D5), D3.pop(), D5 && this.down(0), D4.ptr);
  }
  ['remove'](D3) {
    let D4 = D3.index;
    for (; D4 > 0;) {
      let D5 = (D4 - 1) >> 1;
      (this.swap(D5, D4), (D4 = D5));
    }
    this.popMin();
  }
};
function mp(D3, D4, D5, D6, D7, D8, D9, Dk) {
  let Dw = D9,
    DV = D3,
    DD = (3 * (D4 - D3)) / Dw;
  Dw *= Dw;
  let Dm = (3 * (D3 - 2 * D4 + D5)) / Dw;
  Dw *= D9;
  let DS = (D6 - D3 + 3 * (D4 - D5)) / Dw;
  ((D3 = DV), (D4 = DD + Dm + DS), (D5 = 2 * Dm + 6 * DS), (D6 = 6 * DS));
  for (let DE = 0; DE <= D9; DE++, D8 += Dk) ((D7[D8] = D3), (D3 += D4), (D4 += D5), (D5 += D6));
}
function Td(D3) {
  let D4 = D3[0] * D3[0] + D3[1] * D3[1];
  if (D4 > 1e-35) {
    D4 = Math.sqrt(D4);
    let D5 = 1 / D4;
    ((D3[0] *= D5), (D3[1] *= D5));
  } else ((D3[0] = D3[1] = 0), (D4 = 0));
  return D4;
}
function gp(D3, D4, D5, D6) {
  let { hl: D7, hr: D8, errorSq: D9 } = hp(D5, D6, D3, D4, 0),
    Dk = 2 * (D6 - 1);
  return {
    cost: bs(D9),
    handles: [
      D3[0] * (D7[0] - D5[0]) + D3[1] * (D7[1] - D5[1]),
      D4[0] * (D8[0] - D5[Dk]) + D4[1] * (D8[1] - D5[Dk + 1]),
    ],
  };
}
function Qr(D3, D4, D5, D6) {
  let D7 = D5.prev.pointIndex,
    D8 = D5.next.pointIndex - D7 + 1,
    { cost: D9, handles: Dk } = gp(
      D5.prev.tan[1],
      D5.next.tan[0],
      D4.subarray(2 * D7, 2 * (D7 + D8)),
      D8,
    );
  if (D9 < D6) {
    let Dw = D5.heapNode ? D5.heapNode.ptr : { knotIndex: D5.knotIndex, handles: null };
    ((Dw.handles = Dk),
      D5.heapNode ? D3.update(D5.heapNode, D9, Dw) : (D5.heapNode = D3.insert(D9, Dw)));
  } else D5.heapNode && (D3.remove(D5.heapNode), (D5.heapNode = null));
}
var Pd = (D3) => D3 === 'auto' || D3 === 'clamped';
function Fd(D3, D4) {
  return (
    D3 === 'vector' ? (D3 = 'free') : Pd(D3) && (D3 = 'aligned'),
    Pd(D4) && (D4 = 'aligned'),
    [D3, D4]
  );
}
function bp(D3, { resolu: D4 = Nd, errorSqMax: D5 = 1 / 0, targetLen: D6 = 0 } = {}) {
  let D7 = D3.length,
    D8 = {
      removed: new Array(D7).fill(!1),
      hl: D3.map((Dm) => [Dm.hl[0], Dm.hl[1]]),
      hr: D3.map((Dm) => [Dm.hr[0], Dm.hr[1]]),
      h1: D3.map((Dm) => Dm.h1 ?? null),
      h2: D3.map((Dm) => Dm.h2 ?? null),
    };
  if (D7 < 3 || D6 >= D7) return D8;
  let D9 = D7 - 1,
    Dk = new Float64Array(2 * (D9 * D4 + 1));
  for (let Dm = 0; Dm < 2; Dm++) {
    for (let DS = 0; DS < D9; DS++)
      mp(
        D3[DS].co[Dm],
        D3[DS].hr[Dm],
        D3[DS + 1].hl[Dm],
        D3[DS + 1].co[Dm],
        Dk,
        2 * DS * D4 + Dm,
        D4,
        2,
      );
    Dk[2 * D9 * D4 + Dm] = D3[D9].co[Dm];
  }
  let Dw = D3.map((DE, DF) => {
    let DC = [DE.hl[0] - DE.co[0], DE.hl[1] - DE.co[1]],
      Dt = [DE.co[0] - DE.hr[0], DE.co[1] - DE.hr[1]],
      DH = Td(DC),
      De = -Td(Dt);
    return {
      pointIndex: DF * D4,
      knotIndex: DF,
      tan: [DC, Dt],
      handles: [DH, De],
      canRemove: !!DE.canRemove,
      isRemoved: !1,
      heapNode: null,
      prev: null,
      next: null,
    };
  });
  for (let DE = 0; DE < D7; DE++)
    ((Dw[DE].prev = Dw[DE - 1] ?? null), (Dw[DE].next = Dw[DE + 1] ?? null));
  Dw[0].canRemove = Dw[D9].canRemove = !1;
  let DV = new ea();
  for (let DF of Dw) DF.canRemove && Qr(DV, Dk, DF, D5);
  let DD = D7;
  for (; DD > D6 && DV.size;) {
    let DC = DV.popMin(),
      Dt = Dw[DC.knotIndex];
    ((Dt.heapNode = null),
      (Dt.prev.handles[1] = DC.handles[0]),
      (Dt.next.handles[0] = DC.handles[1]));
    let DH = Dt.prev,
      De = Dt.next;
    ((De.prev = DH),
      (DH.next = De),
      (Dt.next = Dt.prev = null),
      (Dt.isRemoved = !0),
      DH.canRemove && Qr(DV, Dk, DH, D5),
      De.canRemove && Qr(DV, Dk, De, D5),
      DD--);
  }
  for (let DR = 0; DR < D7; DR++) {
    let DQ = Dw[DR],
      Dj = D3[DR].co;
    if (DQ.isRemoved) {
      D8.removed[DR] = !0;
      continue;
    }
    (DR !== 0 &&
      Dw[DR - 1].isRemoved &&
      ((D8.hl[DR] = [Dj[0] + DQ.tan[0][0] * DQ.handles[0], Dj[1] + DQ.tan[0][1] * DQ.handles[0]]),
      ([D8.h1[DR], D8.h2[DR]] = Fd(D8.h1[DR], D8.h2[DR]))),
      DR !== D9 &&
        Dw[DR + 1].isRemoved &&
        ((D8.hr[DR] = [Dj[0] + DQ.tan[1][0] * DQ.handles[1], Dj[1] + DQ.tan[1][1] * DQ.handles[1]]),
        ([D8.h2[DR], D8.h1[DR]] = Fd(D8.h2[DR], D8.h1[DR]))));
  }
  return D8;
}
function jd(D3, D4, { frames: D5, ratio: D6 = 1 / 3, errorMax: D7 = null, yScale: D8 = 1 } = {}) {
  let D9 = D3?.length ?? 0,
    Dk = { remove: [], handles: new Map(), skipped: 0 },
    Dw = D7 == null ? bs(D6) : 1,
    DV = D7 == null ? Qf : bs(bs(D7) * bs(D7));
  if (!D9 || Dw === 0 || DV === 0) return Dk;
  let DD = Math.max(2, Math.round(D5 || 0)) - 1,
    Dm = D3.map((Dj) => [Dj.u * DD, Dj.v * D8]),
    DS = D3.map((Dj) => [(Dj.u - Dj.lenIn) * DD, (Dj.v - Dj.tin * Dj.lenIn) * D8]),
    DE = D3.map((Dj) => [(Dj.u + Dj.lenOut) * DD, (Dj.v + Dj.tout * Dj.lenOut) * D8]),
    DF = D3.map((Dj) => Dj.type ?? null),
    DC = DF.slice(),
    Dt = new Array(D9).fill(!0),
    DH = new Array(D9).fill(!1),
    De = (Dj, Dz) => [(Dz[0] - Dj[0]) * (1 / 3) + Dj[0], (Dz[1] - Dj[1]) * (1 / 3) + Dj[1]];
  for (let Dj = 0; Dj < D9; Dj++)
    if (D3[Dj].i !== V9) {
      if (D3[Dj].i !== Vw) {
        ((Dt[Dj] = !1), Dk.skipped++);
        continue;
      }
      ((DH[Dj] = !0),
        (DF[Dj] = DC[Dj] = 'free'),
        Dj !== 0 && (DS[Dj] = De(Dm[Dj], Dm[Dj - 1])),
        Dj + 1 !== D9 && (DE[Dj] = De(Dm[Dj], Dm[Dj + 1])));
    }
  let DR = new Array(D9).fill(!1),
    DQ = (Dz) => !!D4?.[Dz] && Dt[Dz];
  for (let Dz = 0; Dz < D9;) {
    if (!DQ(Dz)) {
      Dz++;
      continue;
    }
    let DO = Dz;
    for (; Dz < D9 && DQ(Dz);) Dz++;
    let DJ = Dz - DO,
      DZ = DJ;
    (DO + DZ !== D9 && Dt[DO + DZ] && DZ++, DO !== 0 && Dt[DO - 1] && (DO--, DZ++));
    let DU = Math.ceil(bs(DZ - bs(DJ * Dw))),
      DK = [];
    for (let DA = DO; DA < DO + DZ; DA++)
      DK.push({
        co: Dm[DA],
        hl: DS[DA],
        hr: DE[DA],
        canRemove: !!D4?.[DA],
        h1: DF[DA],
        h2: DC[DA],
      });
    let DT = bp(DK, { resolu: Nd, errorSqMax: DV, targetLen: DU });
    for (let Dn = 0; Dn < DZ; Dn++)
      (DT.removed[Dn] && (DR[DO + Dn] = !0),
        (DS[DO + Dn] = DT.hl[Dn]),
        (DE[DO + Dn] = DT.hr[Dn]),
        (DF[DO + Dn] = DT.h1[Dn]),
        (DC[DO + Dn] = DT.h2[Dn]));
  }
  for (let DX = 0; DX < D9; DX++) {
    if (DR[DX]) {
      Dk.remove.push(DX);
      continue;
    }
    let DL = DX > 0 && DR[DX - 1],
      Db = DX < D9 - 1 && DR[DX + 1];
    if (!DL && !Db && !DH[DX]) continue;
    let Dx = D3[DX],
      Dy = Dx.tin,
      DW = Dx.tout,
      Dq = Dx.lin ?? null,
      DP = Dx.lout ?? null;
    if (DH[DX] && DX > 0) {
      let Dv = D3[DX - 1];
      ((Dy = (Dx.v - Dv.v) / (Dx.u - Dv.u)), (Dq = (Dx.u - Dv.u) / 3));
    }
    if (DH[DX] && DX < D9 - 1) {
      let DB = D3[DX + 1];
      ((DW = (DB.v - Dx.v) / (DB.u - Dx.u)), (DP = (DB.u - Dx.u) / 3));
    }
    (DL && (Dq = (Dm[DX][0] - DS[DX][0]) / DD), Db && (DP = (DE[DX][0] - Dm[DX][0]) / DD));
    let DY = DF[DX] === 'free' || DC[DX] === 'free' || Dy !== DW ? 'free' : 'aligned';
    Dk.handles.set(DX, {
      tin: Dy,
      tout: DW,
      lin: Dq,
      lout: DP,
      type: DY,
      ...(DH[DX] ? { i: V9 } : {}),
    });
  }
  return Dk;
}
var ws = 22,
  Ri = 16,
  Rd = 4.5,
  na = 9,
  wp = 64,
  yp = '10px ui-monospace, SFMono-Regular, Consolas, monospace',
  Zn = (D3, D4, D5) => Math.min(D5, Math.max(D4, D3));
function Dd({
  mount: D3,
  onCurves: D4 = () => {},
  onPoseMove: D5 = () => {},
  onPoseDelete: D6 = () => {},
  onSeek: D7 = () => {},
  onHint: D8 = () => {},
  onMute: D9 = () => {},
}) {
  let Dk = (EK, ET, EA) => {
    let En = document.createElement(EK);
    return (ET && (En.className = ET), EA != null && (En.textContent = EA), En);
  };
  (D3.classList.add('lib-graph'), (D3.innerHTML = ''));
  let Dw = Dk('div', 'lib-graph__side'),
    DV = Dk('div', 'lib-graph__sidehead'),
    DD = Dk('span', 'lib-graph__sidetitle', 'Curves'),
    Dm = Dk('button', 'lib-btn lib-btn--sm', 'All');
  ((Dm.type = 'button'), (Dm.title = 'Show every curve'));
  let DS = Dk('input', 'lib-graph__search');
  ((DS.type = 'search'),
    (DS.placeholder = 'Search'),
    (DS.title = 'Only the curves whose names hold this (Ctrl+F with the pointer over the graph)'),
    DS.addEventListener('input', () => {
      ((mD = DS.value.trim().toLowerCase()), SV(), S6(), Sm(), E1());
    }),
    DS.addEventListener('keydown', (EK) => {
      EK.key === 'Enter'
        ? DS.blur()
        : EK.key === 'Escape' &&
          (EK.stopPropagation(),
          DS.value ? ((DS.value = ''), DS.dispatchEvent(new Event('input'))) : DS.blur());
    }),
    DV.append(DD, DS, Dm));
  let DE = Dk('div', 'lib-graph__list');
  Dw.append(DV, DE);
  let DF = Dk('div', 'lib-graph__main'),
    DC = Dk('div', 'lib-graph__tools'),
    DH = Dk('div', 'lib-graph__wrap'),
    DR = Dk('canvas', 'lib-graph__canvas');
  ((DR.tabIndex = 0), DR.setAttribute('aria-label', 'Curves of the keyed controls'));
  let DQ = Dk('p', 'lib-graph__empty');
  (DH.append(DR, DQ), DF.append(DC, DH), D3.append(Dw, DF));
  let Dj = DR.getContext('2d'),
    Dz = (EK, ET) => {
      let EA = Dk('label', 'lib-graph__field');
      EA.append(Dk('span', 'lib-graph__label', EK));
      let En = Dk('input', 'lib-graph__num ' + ET);
      return ((En.type = 'number'), EA.append(En), { box: EA, input: En });
    },
    DO = Dz('Frame', 'lib-graph__num--frame');
  ((DO.input.step = '1'), (DO.input.min = '1'));
  let DJ = Dz('Value', 'lib-graph__num--value');
  DJ.input.step = 'any';
  let DZ = Dk('span', 'lib-graph__unit', '');
  DJ.box.append(DZ);
  let DU = (EK, ET) => {
      let EA = Dk('div', 'lib-graph__seg');
      EA.append(Dk('span', 'lib-graph__label', EK));
      let En = new Map();
      for (let [EX, EL, Eb, Ex] of ET) {
        let Ey = Dk('button', 'lib-btn lib-btn--sm lib-graph__opt', EL);
        ((Ey.type = 'button'),
          (Ey.title = Eb),
          Ey.addEventListener('click', Ex),
          En.set(EX, Ey),
          EA.append(Ey));
      }
      return { box: EA, btns: En };
    },
    DK = {
      free: 'Free: set by hand, each side its own (Alt-drag a handle does this)',
      vector: 'Vector: each side pointed along the curve toward its neighbour \u2014 a corner',
      aligned: 'Aligned: set by hand, the two sides in one line',
      auto: 'Automatic: the curve chooses a smooth slope, and may swing past a key',
      clamped:
        "Auto Clamped: the curve chooses a smooth slope, never past either key \u2014 a new key's",
    },
    DT = { free: 'Free', vector: 'Vector', aligned: 'Aligned', auto: 'Auto', clamped: 'Clamped' },
    DA = DU(
      'Handles',
      wU.map(([EK]) => [EK, DT[EK], DK[EK], () => SE(EK)]),
    ),
    DX = DU('To the next', [
      [V9, 'Bezier', 'A curve to the next key, shaped by the handles', () => SF(V9)],
      [Vw, 'Linear', 'A straight line to the next key', () => SF(Vw)],
      [VD, 'Step', 'Holds until the next key, then jumps', () => SF(VD)],
    ]),
    DL = (EK, ET, EA) => {
      let En = Dk('button', 'lib-btn lib-btn--sm lib-graph__menubtn', EK);
      return (
        (En.type = 'button'),
        (En.title = ET),
        En.addEventListener('click', () => {
          let EX = En.getBoundingClientRect();
          r5(EX.left, EX.bottom, EK, EA());
        }),
        En
      );
    },
    Db = DL('Channel', 'Lock, mute, hide and show curves; the Euler filter', () => rY()),
    Dx = DL(
      'Key',
      'Snap, mirror, insert, copy and paste; handles and interpolation; decimate, bake, clean; the blend and smooth tools',
      () => rP(),
    ),
    Dy = Dk('button', 'lib-btn lib-btn--sm', 'Fit');
  ((Dy.type = 'button'),
    (Dy.title = 'Every key in view, with its handles (Home)'),
    Dy.addEventListener('click', () => {
      (S4(!1), E1());
    }));
  let DW = 'cgstuff.library.graphNormalize',
    Dq = !1;
  try {
    Dq = localStorage.getItem(DW) === '1';
  } catch {}
  let DP = Dk('button', 'lib-btn lib-btn--sm lib-graph__opt', 'Normalize');
  ((DP.type = 'button'),
    (DP.title =
      "Show every curve between -1 and 1, each by its own range (Blender's Normalize) \u2014 the keys keep their values"),
    DP.addEventListener('click', () => {
      Dq = !Dq;
      try {
        localStorage.setItem(DW, Dq ? '1' : '0');
      } catch {}
      if (!m0) return;
      S1();
      let EK = m2?.t0,
        ET = m2?.t1;
      (S4(!1), EK != null && ((m2.t0 = EK), (m2.t1 = ET)), EZ(), Sm(), E1());
    }));
  let DY = Dk('button', 'lib-btn lib-btn--sm', 'Fit keys');
  ((DY.type = 'button'),
    (DY.title = 'The picked keys in view (F)'),
    DY.addEventListener('click', () => {
      (S4(!0), E1());
    }));
  let Dv = 'cgstuff.library.graphPivot',
    DB = Dk('label', 'lib-graph__field');
  DB.append(Dk('span', 'lib-graph__label', 'Pivot'));
  let DG = Dk('select', 'lib-graph__select');
  for (let [EK, ET] of [
    ['bbox', 'Bounding Box Center'],
    ['cursor', '2D Cursor'],
    ['individual', 'Individual Centers'],
  ])
    DG.append(new Option(ET, EK));
  ((DG.title =
    "What R and S turn and scale about: the picked keys' middle, the 2D cursor, or each key about itself (its handles)"),
    DB.append(DG));
  let Dg = 'bbox';
  try {
    let EA = localStorage.getItem(Dv);
    ['bbox', 'cursor', 'individual'].includes(EA) && (Dg = EA);
  } catch {}
  ((DG.value = Dg),
    DG.addEventListener('change', () => {
      Dg = DG.value;
      try {
        localStorage.setItem(Dv, Dg);
      } catch {}
    }));
  let DI = Dz('Cursor', 'lib-graph__num--value');
  ((DI.input.step = 'any'),
    (DI.box.title =
      "The 2D cursor's value \u2014 Shift + right-click in the graph sets it, with the frame"));
  let Dh = 0,
    DN =
      'Right-click: the menu \u00B7 G move \u00B7 R rotate \u00B7 S scale \u00B7 Shift+D duplicate \u00B7 Shift+right-click the 2D cursor \u00B7 middle-drag moves the view \u00B7 wheel zooms',
    DM = Dk('span', 'lib-graph__help', DN);
  DC.append(
    Db,
    Dx,
    DO.box,
    DJ.box,
    DA.box,
    DX.box,
    DB,
    DI.box,
    Dk('span', 'lib-graph__spacer'),
    DM,
    DP,
    Dy,
    DY,
  );
  let m0 = null,
    m1 = [],
    m2 = null,
    m3 = new Set(),
    m4 = new Map(),
    m5 = new Set(),
    m6 = new Set(),
    m7 = new Map(),
    m8 = [],
    m9 = null,
    mk = null,
    mw = new Set(),
    mV = new Set(),
    mD = '',
    mm = null,
    mS = 0,
    mE = 0,
    mF = 1,
    mC = 0,
    mH = () => Math.max(2, Math.round(m0?.frames || 2)),
    me = (En) => En / (mH() - 1),
    mR = (En) => Math.round(En * (mH() - 1)),
    mQ = (En) => m0.offset + En * m0.clock,
    mj = (En) => (m0.clock > 0 ? (En - m0.offset) / m0.clock : 0),
    mz = () => (m0?.poses?.length ? m0.poses.length * Ri + 6 : 0),
    mO = () => ws,
    mJ = () => mE - mz(),
    mZ = (En) => ((En - m2.t0) / (m2.t1 - m2.t0)) * mS,
    mU = (En) => m2.t0 + (En / mS) * (m2.t1 - m2.t0),
    mK = (En) => mO() + ((m2.v1 - En) / (m2.v1 - m2.v0)) * (mJ() - mO()),
    mT = (En) => m2.v1 - ((En - mO()) / (mJ() - mO())) * (m2.v1 - m2.v0),
    mA = () => mS / (m2.t1 - m2.t0),
    mX = () => (mJ() - mO()) / (m2.v1 - m2.v0),
    mL = (En) => m1.find((EX) => EX.id === En),
    mb = (En) => !mD || (En.label + ' ' + (En.control.parent || '')).toLowerCase().includes(mD),
    mx = () => m1.filter((En) => !m3.has(En.id) && mb(En)),
    my = (En, EX) => m8.some((EL) => EL.ch === En && EL.f === EX && !EL.side),
    mW = (En, EX, EL) => m8.some((Eb) => Eb.ch === En && Eb.f === EX && Eb.side === EL),
    mq = (En, EX) => m8.some((EL) => EL.ch === En && EL.f === EX),
    mP = (En, EX) => m8.some((EL) => EL.pose === En && EL.f === EX),
    mY = () => m8.filter((En) => En.ch),
    mv = (En) =>
      En.id === mk || mw.has(En.id) || !!En.control.picked || m8.some((EX) => EX.ch === En.id),
    mB = () => m1.filter((En) => mw.has(En.id) || m8.some((EX) => EX.ch === En.id)),
    mG = 0.25,
    mg = (En, EX) => (EX * En.scale + En.no) * En.nk,
    mI = (En, EX) => (EX / En.nk - En.no) / En.scale,
    mN = (En) => En.scale * En.nk,
    mM = (En) => En.group + '|' + En.key,
    S0 = (En) => !En.quiet || (m4.has(mM(En)) ? m4.get(mM(En)) : !!En.picked);
  function S1() {
    m1 = [];
    for (let En of m0.controls || []) {
      if (!S0(En)) continue;
      let EX = mM(En),
        EL = En.sample ? En.sample() : null;
      for (let Eb of En.axes) {
        let Ex = VA(En.curve, Eb.axis),
          Ey = EL
            ? (Eq) => EL(Eq)[Eb.axis]
            : VZ(
                Ex.map((Eq) => ({
                  u: Eq.u,
                  v: Eq.v,
                  i: Eq.i,
                  tin: Eq.tin,
                  tout: Eq.tout,
                  lin: Eq.lin,
                  lout: Eq.lout,
                })),
              ),
          EW = {
            id: EX + '|' + (Eb.axis ?? ''),
            cid: EX,
            control: En,
            axis: Eb.axis,
            label: En.axes.length > 1 ? En.label + ' ' + Eb.label : En.label,
            short: En.axes.length > 1 ? Eb.label : En.label,
            colour: Eb.colour,
            unit: Eb.unit || '',
            scale: Eb.scale || 1,
            min: Eb.min ?? -1 / 0,
            max: Eb.max ?? 1 / 0,
            rest: Eb.rest ?? 0,
            keys: Ex,
            f: Ey,
            nk: 1,
            no: 0,
          };
        (Object.assign(EW, S3(EW)), m1.push(EW));
      }
    }
  }
  let S2 = new Map();
  function S3(En) {
    if (!Dq || !En.keys.length) return { nk: 1, no: 0 };
    if (mm && S2.has(En.id)) return S2.get(En.id);
    let EX = En.keys[0].u,
      EL = En.keys[En.keys.length - 1].u,
      Eb = 1 / 0,
      Ex = -1 / 0;
    for (let Eq of En.keys)
      ((Eb = Math.min(Eb, Eq.v * En.scale)), (Ex = Math.max(Ex, Eq.v * En.scale)));
    if (EL > EX)
      for (let EP = 0; EP <= 200; EP++) {
        let EY = En.f(EX + ((EL - EX) * EP) / 200);
        EY != null && ((Eb = Math.min(Eb, EY * En.scale)), (Ex = Math.max(Ex, EY * En.scale)));
      }
    let Ey = Ex - Eb,
      EW = Ey > 1e-9 ? { nk: 2 / Ey, no: -Eb - Ey / 2 } : { nk: 1, no: -Eb };
    return (S2.set(En.id, EW), EW);
  }
  function S4(EX = !1) {
    if (!m0) return;
    let EL = 12 / (m0.fps || 30),
      Eb = 1 / 0,
      Ex = -1 / 0,
      Ey = 1 / 0,
      EW = -1 / 0,
      Eq = (Eg, EI) => {
        let EN = mQ(Eg);
        ((Eb = Math.min(Eb, EN)),
          (Ex = Math.max(Ex, EN)),
          EI != null && ((Ey = Math.min(Ey, EI)), (EW = Math.max(EW, EI))));
      },
      EP = EX ? SC() : [],
      EY = EX
        ? EP.map((Eg) => ({ c: Eg.c, ks: [Eg.k] }))
        : mx().map((Eg) => ({ c: Eg, ks: Eg.keys }));
    for (let { c: Eg, ks: EI } of EY) {
      for (let EN of EI) {
        Eq(EN.u, mg(Eg, EN.v));
        let { hasIn: EM, hasOut: F0 } = rI(Eg, Eg.keys.indexOf(EN));
        (EM && Eq(EN.u - EN.lenIn, mg(Eg, EN.v - EN.tin * EN.lenIn)),
          F0 && Eq(EN.u + EN.lenOut, mg(Eg, EN.v + EN.tout * EN.lenOut)));
      }
      if (!EX && EI.length > 1) {
        let F1 = EI[0].u,
          F2 = EI[EI.length - 1].u;
        for (let F3 = 0; F3 <= 120; F3++) {
          let F4 = Eg.f(F1 + ((F2 - F1) * F3) / 120);
          F4 != null && ((Ey = Math.min(Ey, mg(Eg, F4))), (EW = Math.max(EW, mg(Eg, F4))));
        }
      }
    }
    if (EX) {
      for (let F5 of m8.filter((F6) => F6.pose)) Eq(me(F5.f), null);
    } else {
      for (let F6 of m0.poses || []) for (let F7 of F6.keys) Eq(F7.u, null);
    }
    if (
      (Ex >= Eb || ((Eb = m0.offset), (Ex = m0.offset + Math.max(m0.clock, 0.1))), Ex - Eb < EL)
    ) {
      let F8 = (Eb + Ex) / 2;
      ((Eb = F8 - EL / 2), (Ex = F8 + EL / 2));
    }
    EW >= Ey || ((Ey = -10), (EW = 10));
    let Ev = EW - Ey;
    if (Ev < 0.000001) {
      let F9 = Math.max(Dq ? 0.5 : 5, Math.abs(EW) * 0.5);
      ((Ey -= F9), (EW += F9), (Ev = EW - Ey));
    }
    let EB = (Ex - Eb) * (EX ? 0.25 : 0.05),
      EG = Ev * (EX ? 0.35 : 0.08);
    m2 = { t0: Eb - EB, t1: Ex + EB, v0: Ey - EG, v1: EW + EG };
  }
  let S5 = null;
  function S6() {
    DE.innerHTML = '';
    let EX = [],
      EL = (EW, Eq, EP, EY) => {
        let Ev = Dk('button', 'lib-graph__tog' + (Eq ? ' is-on' : ''), EW);
        return (
          (Ev.type = 'button'),
          (Ev.title = EP),
          Ev.setAttribute('aria-pressed', String(!!Eq)),
          Ev.addEventListener('click', (EB) => {
            (EB.preventDefault(), EB.stopPropagation(), EY());
          }),
          Ev
        );
      },
      Eb = (EW) =>
        EL(
          'M',
          EW.muted,
          'Mute ' +
            (EW.group === 'bone' ? 'the layer ' + EW.parent : EW.label) +
            ' \u2014 kept, plays nothing',
          () => D9(EW.group, EW.key),
        ),
      Ex = (EW, Eq, EP = '', EY = null) => {
        EX.push(EW.id);
        let Ev = mw.has(EW.id) || m8.some((EN) => EN.ch === EW.id),
          EB = Dk(
            'label',
            'lib-graph__row ' +
              EP +
              (mk === EW.id ? ' is-lit' : '') +
              (Ev ? ' is-sel' : '') +
              (EW.control.muted ? ' is-muted' : '') +
              (mV.has(EW.id) ? ' is-locked' : ''),
          ),
          EG = Dk('input');
        ((EG.type = 'checkbox'),
          (EG.checked = !m3.has(EW.id)),
          (EG.title = 'Show this curve'),
          EG.addEventListener('change', () => {
            (EG.checked ? m3.delete(EW.id) : m3.add(EW.id), SV(), S6(), Sm(), E1());
          }));
        let Eg = Dk('span', 'lib-graph__dot');
        Eg.style.background = EW.colour;
        let EI = Dk('span', 'lib-graph__name', Eq);
        return (
          (EI.title =
            '' +
            EW.label +
            (EW.control.muted ? ' (muted)' : '') +
            (mV.has(EW.id) ? ' (locked)' : '') +
            ' \u2014 click: pick this curve (Ctrl adds, Shift the curves between); double-click: its keys'),
          EI.addEventListener('click', (EN) => {
            EN.preventDefault();
            let EM = EN.ctrlKey || EN.metaKey;
            if (EN.shiftKey && S5 && EX.includes(S5)) {
              let F0 = EX.indexOf(S5),
                F1 = EX.indexOf(EW.id);
              for (let F2 of EX.slice(Math.min(F0, F1), Math.max(F0, F1) + 1)) mw.add(F2);
            } else
              EM ? (mw.has(EW.id) ? mw.delete(EW.id) : mw.add(EW.id)) : (mw.clear(), mw.add(EW.id));
            ((S5 = EW.id), (mk = EW.id), S6(), Sm(), E1());
          }),
          EI.addEventListener('dblclick', (EN) => {
            (EN.preventDefault(),
              mV.has(EW.id) || (SK(EW.id, EN.ctrlKey || EN.metaKey), mw.add(EW.id), S6()));
          }),
          EB.append(
            EG,
            Eg,
            EI,
            Dk('span', 'lib-graph__rowunit', EW.unit),
            EL('L', mV.has(EW.id), "Lock \u2014 its keys can't be picked or changed", () =>
              S7([EW]),
            ),
          ),
          EY && EB.append(EY),
          EB
        );
      };
    for (let EW of (m0?.controls || []).filter((Eq) => !Eq.quiet)) {
      let Eq = m1.filter((EP) => EP.control === EW && mb(EP));
      if (Eq.length > 1 || (Eq.length && EW.axes.length > 1)) {
        let EP = Dk(
          'div',
          'lib-graph__group lib-graph__group--ctl' + (EW.muted ? ' is-muted' : ''),
        );
        (EP.append(Dk('span', 'lib-graph__name', EW.label), Eb(EW)), DE.append(EP));
        for (let EY of Eq) DE.append(Ex(EY, EY.short, 'lib-graph__row--axis'));
      } else Eq.length && DE.append(Ex(Eq[0], Eq[0].label, '', Eb(EW)));
    }
    let Ey = [
      ...new Set((m0?.controls || []).filter((Ev) => Ev.quiet).map((Ev) => Ev.parent || '')),
    ];
    for (let Ev of Ey) {
      let EB = m0.controls.filter((F0) => F0.quiet && (F0.parent || '') === Ev),
        EG = EB.filter((F0) => !mD || (F0.label + ' ' + Ev).toLowerCase().includes(mD));
      if (!EG.length) continue;
      let Eg = EB.filter(S0).length,
        EI = Dk('div', 'lib-graph__group lib-graph__fold' + (EB[0]?.muted ? ' is-muted' : ''));
      (EI.setAttribute('role', 'button'), (EI.tabIndex = 0));
      let EN = m5.has(Ev);
      (EI.append(
        Dk('span', 'lib-graph__caret', EN ? '\u25B8' : '\u25BE'),
        Dk('span', 'lib-graph__name', Ev || 'Bones'),
        Dk('span', 'lib-graph__rowunit', Eg + ' of ' + EB.length),
        Eb(EB[0]),
      ),
        (EI.title =
          Ev +
          ": its bones. Tick one to see its rotation's channels (W X Y Z) \u2014 the joints picked in the viewport are ticked for you"));
      let EM = () => {
        (EN ? m5.delete(Ev) : m5.add(Ev), S6());
      };
      if (
        (EI.addEventListener('click', EM),
        EI.addEventListener('keydown', (F0) => {
          (F0.key === 'Enter' || F0.key === ' ') && (F0.preventDefault(), EM());
        }),
        DE.append(EI),
        !EN)
      )
        for (let F0 of EG) {
          let F1 = mM(F0),
            F2 = S0(F0),
            F3 = Dk(
              'label',
              'lib-graph__row lib-graph__row--bone' +
                (F0.muted ? ' is-muted' : '') +
                (F0.picked ? ' is-picked' : ''),
            ),
            F4 = Dk('input');
          if (
            ((F4.type = 'checkbox'),
            (F4.checked = F2),
            (F4.title = "Show this bone's curves"),
            F4.addEventListener('change', () => {
              (m4.set(F1, F4.checked),
                S1(),
                Sk(),
                S6(),
                Sm(),
                S9(),
                F4.checked && mS && (EZ(), Sw(m1.filter((F5) => F5.cid === F1))),
                E1());
            }),
            F3.append(
              F4,
              Dk('span', 'lib-graph__name', F0.label),
              Dk('span', 'lib-graph__rowunit', F0.picked ? 'picked' : ''),
            ),
            (F3.title = F0.label + ": its rotation's channels, each with keys of its own"),
            DE.append(F3),
            F2)
          ) {
            for (let F5 of m1.filter((F6) => F6.control === F0 && mb(F6)))
              DE.append(Ex(F5, F5.short, 'lib-graph__row--axis lib-graph__row--deep'));
          }
        }
    }
    for (let F6 of m0?.poses || []) {
      let F7 = Dk('div', 'lib-graph__row lib-graph__row--pose' + (F6.muted ? ' is-muted' : ''));
      ((F7.title =
        "A pose layer's keys are whole poses: they move in time here, along the bottom of the graph"),
        F7.append(
          Dk('span', 'lib-graph__diamond', '\u25C6'),
          Dk('span', 'lib-graph__name', F6.name),
          Dk('span', 'lib-graph__rowunit', 'time'),
        ),
        DE.append(F7));
    }
    Dm.disabled = !m3.size;
  }
  function S7(En) {
    if (!En.length) return;
    let EX = En.every((EL) => mV.has(EL.id));
    for (let EL of En) EX ? mV.delete(EL.id) : mV.add(EL.id);
    (EX || ((m8 = m8.filter((Eb) => !Eb.ch || !mV.has(Eb.ch))), m9 && mV.has(m9.ch) && (m9 = null)),
      D8(EX ? 'Unlocked' : "Locked: its keys can't be picked or changed \u2014 L again unlocks"),
      S6(),
      Sm(),
      E1());
  }
  function S8(En) {
    let EX = new Set();
    for (let EL of En) {
      let Eb = EL.control,
        Ex = Eb.group === 'bone' ? 'layer|' + Eb.parent : mM(Eb);
      EX.has(Ex) || (EX.add(Ex), D9(Eb.group, Eb.key));
    }
  }
  function S9() {
    let En = (m0.controls || []).some((Eb) => Eb.quiet),
      EX = !m1.length && !(m0.poses || []).length,
      EL = EX
        ? m0.playing === !1
          ? 'A clip is being previewed over the sequence. Go back to the sequence to see its keys.'
          : 'No keys yet. Pose a joint with the Pose tool, key an Adjust slider with its \u25C6, or an IK control with K, and its curve appears here.'
        : !m1.length && En
          ? 'Pick a joint in the viewport with the Pose tool, or tick a bone in the list, to see its curves.'
          : '';
    ((DQ.hidden = !EL),
      (DQ.textContent = EL),
      DQ.classList.toggle('is-over', !!EL && !EX),
      (DR.style.visibility = EX ? 'hidden' : 'visible'));
  }
  function Sk() {
    ((m8 = m8.filter((En) => !En.ch || mL(En.ch))),
      m9 && !mL(m9.ch) && (m9 = null),
      mk && !mL(mk) && (mk = null));
  }
  function Sw(En) {
    if (!m2 || !En.length) return;
    let EX = 1 / 0,
      EL = -1 / 0;
    for (let Ex of En)
      for (let Ey = 0; Ey <= 120; Ey++) {
        let EW = Ex.f(Ey / 120);
        EW != null && ((EX = Math.min(EX, mg(Ex, EW))), (EL = Math.max(EL, mg(Ex, EW))));
      }
    if (!(EL >= EX)) return;
    let Eb = Math.max(2, (Math.max(m2.v1, EL) - Math.min(m2.v0, EX)) * 0.1);
    (EX < m2.v0 && (m2.v0 = EX - Eb), EL > m2.v1 && (m2.v1 = EL + Eb));
  }
  function SV() {
    let En = (EX) => m3.has(EX) || (mL(EX) && !mb(mL(EX)));
    ((m8 = m8.filter((EX) => !EX.ch || !En(EX.ch))), m9 && En(m9.ch) && (m9 = null));
  }
  Dm.addEventListener('click', () => {
    (m3.clear(), S6(), E1());
  });
  let SD = (En) => {
    let EX = mL(En?.ch),
      EL = EX ? EX.keys.findIndex((Eb) => mR(Eb.u) === En.f) : -1;
    return EL < 0 ? null : { c: EX, k: EX.keys[EL], j: EL };
  };
  function Sm() {
    let En = m9 && SD(m9),
      EX = mY().map(SD).filter(Boolean),
      EL = document.activeElement === DO.input || document.activeElement === DJ.input;
    ((DO.input.disabled = DJ.input.disabled = !En),
      (!EL || !En) &&
        ((DO.input.value = En ? String(En.k ? mR(En.k.u) + 1 : '') : ''),
        (DJ.input.value = En ? String(+(En.k.v * En.c.scale).toFixed(2)) : '')),
      (DO.input.max = String(mH())),
      (DZ.textContent = En ? En.c.unit : ''));
    let Eb = new Set(EX.map((Ey) => wT(Ey.k)));
    for (let [Ey, EW] of DA.btns)
      ((EW.disabled = !EX.length),
        EW.classList.toggle('is-on', Eb.has(Ey)),
        EW.setAttribute('aria-pressed', String(Eb.has(Ey))));
    let Ex = new Set(EX.map((Eq) => Eq.k.i));
    for (let [Eq, EP] of DX.btns)
      ((EP.disabled = !EX.length),
        EP.classList.toggle('is-on', Ex.has(Eq)),
        EP.setAttribute('aria-pressed', String(Ex.has(Eq))));
    ((DY.disabled = !EX.length),
      document.activeElement !== DI.input && (DI.input.value = String(+Dh.toFixed(3))),
      (Dy.disabled = !m1.length),
      DP.classList.toggle('is-on', Dq),
      DP.setAttribute('aria-pressed', String(Dq)));
  }
  function SS(En, EX, EL = !1) {
    let Eb = [];
    for (let Ex of new Set(En)) {
      let Ey = m0.controls.find((EW) => EW.group + '|' + EW.key === Ex);
      Ey && Eb.push({ group: Ey.group, key: Ey.key, curve: EX(Ey.curve, Ey) });
    }
    Eb.length && D4(Eb, { live: EL });
  }
  function SE(En) {
    let EX = mY()
      .map((EL) => ({ s: EL, c: mL(EL.ch) }))
      .filter((EL) => EL.c);
    EX.length &&
      SS(
        EX.map((EL) => EL.c.cid),
        (EL, Eb) => {
          let Ex = EL;
          for (let Ey of EX) Ey.c.control === Eb && (Ex = wn(Ex, me(Ey.s.f), mH(), Ey.c.axis, En));
          return Ex;
        },
      );
  }
  function SF(En) {
    let EX = mY()
      .map((EL) => ({ s: EL, c: mL(EL.ch) }))
      .filter((EL) => EL.c);
    EX.length &&
      SS(
        EX.map((EL) => EL.c.cid),
        (EL, Eb) => {
          let Ex = EL,
            Ey = EX.filter((EW) => EW.c.control === Eb);
          for (let EW of new Set(Ey.map((Eq) => Eq.c.axis)))
            Ex = wO(
              Ex,
              Ey.filter((Eq) => Eq.c.axis === EW).map((Eq) => me(Eq.s.f)),
              mH(),
              En,
              EW,
            );
          return Ex;
        },
      );
  }
  let SC = ({ keysOnly: En = !1 } = {}) => {
      let EX = new Set();
      return mY()
        .filter((EL) => !(En && EL.side))
        .map((EL) => {
          let Eb = EL.ch + '|' + EL.f;
          if (EX.has(Eb)) return null;
          EX.add(Eb);
          let Ex = mL(EL.ch),
            Ey = Ex?.keys.find((EW) => mR(EW.u) === EL.f);
          return Ey ? { s: { ch: EL.ch, f: EL.f }, c: Ex, k: Ey } : null;
        })
        .filter(Boolean);
    },
    SH = (En) =>
      En.map(({ s: EX, c: EL, k: Eb }) => ({
        ch: EX.ch,
        cid: EL.cid,
        axis: EL.axis,
        f: EX.f,
        v: mg(EL, Eb.v),
        scale: mN(EL),
        shift: EL.no * EL.nk,
        min: mg(EL, EL.min),
        max: mg(EL, EL.max),
        own: Eb.own,
        free: Eb.free,
        tin: Eb.tin,
        tout: Eb.tout,
        lin: Eb.lin,
        lout: Eb.lout,
        lenIn: Eb.lenIn,
        lenOut: Eb.lenOut,
        kind: Eb.type === 'auto' || Eb.type === 'vector' ? Eb.type : null,
      })),
    SR = (En, EX) =>
      En.ch === EX.ch &&
      En.pose === EX.pose &&
      En.f === EX.f &&
      (En.side ?? null) === (EX.side ?? null);
  function SQ(En, EX = (Eq, EP) => [Eq, EP], { handles: EL = !0 } = {}) {
    let Eb = SH(SC());
    if (!Eb.length) {
      D8('Pick keys on a curve first');
      return;
    }
    let Ex = new Map(),
      Ey = [];
    for (let Eq of new Set(Eb.map((EP) => EP.cid))) {
      let EP = Eb.filter((EG) => EG.cid === Eq),
        EY = m0.controls.find((EG) => mM(EG) === Eq);
      if (!EY) continue;
      let { curve: Ev, landed: EB } = wJ(EY.curve, EL ? EP : EP.map((EG) => ({ ...EG, own: !1 })), {
        pt: En,
        lin: EX,
        frames: mH(),
      });
      (EP.forEach((EG, Eg) => Ex.set(EG.ch + '|' + EG.f, EB[Eg])),
        Ey.push({ group: EY.group, key: EY.key, curve: Ev }));
    }
    let EW = [
      ...Eb.map((EG) => ({ ch: EG.ch, f: Ex.get(EG.ch + '|' + EG.f) ?? EG.f })),
      ...m8.filter((EG) => EG.pose),
    ];
    ((m8 = EW.filter((EG, Eg) => EW.findIndex((EI) => SR(EI, EG)) === Eg)),
      m9 && (m9 = m8.find((EG) => EG.ch === m9.ch) ?? null),
      Ey.length && D4(Ey, { live: !1 }));
  }
  let Sj = () => [
    ...rQ().flatMap((En) => En.keys.map((EX) => ({ ch: En.id, f: mR(EX.u) }))),
    ...(m0?.poses || []).flatMap((En) => En.keys.map((EX) => ({ pose: En.id, f: mR(EX.u) }))),
  ];
  function Sz(En, { extend: EX = !1, subtract: EL = !1 } = {}) {
    if (
      (EL
        ? (m8 = m8.filter((Eb) => !En.some((Ex) => SR(Eb, Ex))))
        : (m8 = EX ? [...m8, ...En.filter((Eb) => !m8.some((Ex) => SR(Ex, Eb)))] : En.slice()),
      (!m9 || !m8.some((Eb) => SR(Eb, m9))) && (m9 = mY().slice(-1)[0] ?? null),
      m9 && (mk = m9.ch),
      !EL)
    ) {
      mw.clear();
      for (let Eb of mY()) mw.add(Eb.ch);
    }
    (S6(), Sm(), E1());
  }
  let SO = () => Sz(Sj()),
    SJ = () => Sz([]),
    SZ = () => Sz(Sj().filter((En) => !m8.some((EX) => SR(EX, En)))),
    SU = (En, EX = !1) =>
      Sz(
        Sj().filter((EL) => En.has(EL.f)),
        { extend: EX },
      ),
    SK = (En, EX = !1) => {
      let EL = mL(En);
      EL &&
        !mV.has(En) &&
        Sz(
          EL.keys.map((Eb) => ({ ch: En, f: mR(Eb.u) })),
          { extend: EX },
        );
    },
    ST = (En, EX = !1) => {
      let EL = Ew();
      Sz(
        Sj().filter((Eb) => (En < 0 ? Eb.f <= EL : Eb.f >= EL)),
        { extend: EX },
      );
    },
    SA = () => {
      let En = new Set(mY().map((EX) => EX.ch));
      Sz(
        rQ()
          .filter((EX) => En.has(EX.id))
          .flatMap((EX) => EX.keys.map((EL) => ({ ch: EX.id, f: mR(EL.u) }))),
      );
    };
  function SX(En) {
    let EX = [];
    for (let EL of rQ()) {
      let Eb = EL.keys.map((Ey) => mR(Ey.u)),
        Ex = Eb.map((Ey) => my(EL.id, Ey));
      Eb.forEach((Ey, EW) => {
        (En
          ? Ex[EW] || Ex[EW - 1] || Ex[EW + 1]
          : Ex[EW] && EW > 0 && EW < Eb.length - 1 && Ex[EW - 1] && Ex[EW + 1]) &&
          EX.push({ ch: EL.id, f: Ey });
      });
    }
    Sz([...EX, ...m8.filter((Ey) => Ey.pose)]);
  }
  function SL(En) {
    if (En === 'none') m3.clear();
    else {
      let EX = new Set(mB().map((EL) => EL.id));
      if ((!EX.size && mk && EX.add(mk), !EX.size)) {
        D8('Pick keys on a curve first');
        return;
      }
      for (let EL of m1) (En === 'picked') === EX.has(EL.id) && m3.add(EL.id);
    }
    (SV(), S6(), Sm(), E1());
  }
  function Sb({ frame: En = !0, value: EX = !0 } = {}) {
    let EL = SC();
    if (!EL.length) {
      D8('Pick keys on a curve first');
      return;
    }
    (En && D7(me(Math.round(EL.reduce((Eb, Ex) => Eb + Ex.s.f, 0) / EL.length)) * m0.clock),
      EX && (Dh = EL.reduce((Eb, Ex) => Eb + mg(Ex.c, Ex.k.v), 0) / EL.length),
      Sm(),
      E1());
  }
  let Sx = () => {
      let En = Math.round(Ew());
      SQ((EX, EL) => [En, EL]);
    },
    Sy = () => SQ((En, EX) => [En, Dh]),
    SW = () => {
      let En = m0.fps || 30;
      SQ((EX, EL) => [Math.round(EX / En) * En, EL]);
    };
  function Sq() {
    let En = SC();
    if (!En.length) {
      D8('Pick keys on a curve first');
      return;
    }
    SS([...new Set(En.map((EX) => EX.c.cid))], (EX, EL) => {
      let Eb = EX;
      for (let Ex of En.filter((Ey) => Ey.c.control === EL))
        Eb = w5(Eb, me(Ex.s.f), mH(), Ex.c.axis, { tin: 0, tout: 0 });
      return Eb;
    });
  }
  let SP = () => {
      let En = Ew();
      SQ(
        (EX, EL) => [2 * En - EX, EL],
        (EX, EL) => [-EX, EL],
      );
    },
    SY = () =>
      SQ(
        (En, EX) => [En, 2 * Dh - EX],
        (En, EX) => [En, -EX],
      ),
    Sv = () =>
      SQ(
        (En, EX, EL) => [En, 2 * (EL?.shift ?? 0) - EX],
        (En, EX) => [En, -EX],
      ),
    SB = () => {
      let En = new Set(mY().map((EX) => EX.ch));
      return (!En.size && mk && En.add(mk), mx().filter((EX) => En.has(EX.id)));
    };
  function SG(En, EX = !1) {
    let EL = (En === 'all' ? mx() : En === 'active' ? (mk && mL(mk) ? [mL(mk)] : []) : SB()).filter(
      (Ex) => !mV.has(Ex.id),
    );
    if (!EL.length) {
      D8(En === 'all' ? 'No curve is shown' : 'Pick a key on a curve, or touch one, first');
      return;
    }
    let Eb = Math.round(Ew());
    (SS([...new Set(EL.map((Ex) => Ex.cid))], (Ex, Ey) => {
      let EW = Ex;
      for (let Eq of EL.filter((EP) => EP.control === Ey))
        EW = EX
          ? wR(EW, me(Eb), mH(), Eq.axis, { v: Zn(mI(Eq, Dh), Eq.min, Eq.max) })
          : wH(EW, me(Eb), mH(), Eq.axis);
      return EW;
    }),
      Sz(EL.map((Ex) => ({ ch: Ex.id, f: Eb }))));
  }
  function Sg(En, EX) {
    let EL = mk && mL(mk);
    if (!EL) {
      D8('Click a curve first: Ctrl + right-click adds a key to the curve last touched');
      return;
    }
    if (mV.has(EL.id)) {
      D8(EL.label + ' is locked');
      return;
    }
    let Eb = mR(Zn(mj(mU(En)), 0, 1));
    (SS([EL.cid], (Ex) => wR(Ex, me(Eb), mH(), EL.axis, { v: Zn(mI(EL, mT(EX)), EL.min, EL.max) })),
      Sz([{ ch: EL.id, f: Eb }]));
  }
  function SI() {
    if (!m8.length) return;
    let En = mY()
        .map((EL) => ({ s: EL, c: mL(EL.ch) }))
        .filter((EL) => EL.c),
      EX = m8.filter((EL) => EL.pose);
    ((m8 = []),
      (m9 = null),
      SS(
        En.map((EL) => EL.c.cid),
        (EL, Eb) => {
          let Ex = EL,
            Ey = En.filter((EW) => EW.c.control === Eb);
          for (let EW of new Set(Ey.map((Eq) => Eq.c.axis)))
            Ex = wj(
              Ex,
              Ey.filter((Eq) => Eq.c.axis === EW).map((Eq) => me(Eq.s.f)),
              mH(),
              EW,
            );
          return Ex;
        },
      ));
    for (let EL of new Set(EX.map((Eb) => Eb.pose)))
      D6(
        EL,
        EX.filter((Eb) => Eb.pose === EL).map((Eb) => me(Eb.f)),
      );
    (Sm(), E1());
  }
  let SN = null;
  function SM() {
    let En = SC();
    if (!En.length) return (D8('Pick keys on a curve to copy them'), 0);
    let EX = Math.min(...En.map((EL) => EL.s.f));
    return (
      (SN = En.map(({ s: EL, c: Eb, k: Ex }) => ({
        group: Eb.control.group,
        key: Eb.control.key,
        axis: Eb.axis,
        axes: Eb.control.axes.length,
        df: EL.f - EX,
        v: Ex.v,
        i: Ex.i,
        ...(Ex.own ? { tin: Ex.tin, tout: Ex.tout, free: Ex.free } : {}),
      }))),
      D8('Copied ' + En.length + ' key' + (En.length > 1 ? 's' : '')),
      En.length
    );
  }
  function r0(En = !1) {
    if (!SN?.length) {
      D8('Nothing copied yet: pick keys and press Ctrl+C');
      return;
    }
    let EX = Math.round(Ew()),
      EL = mH(),
      Eb = [],
      Ex = m0.partner ?? Vm,
      Ey = 0,
      EW = 0;
    for (let Eq of SN) {
      let EP = Eq.key,
        EY = 1;
      if (En && Eq.group === 'bone') {
        let EG = EP.indexOf(':');
        ((EP = EP.slice(0, EG) + ':' + Ex(EP.slice(EG + 1))),
          ((Eq.axes === 4 && (Eq.axis === 2 || Eq.axis === 3)) ||
            (Eq.axes === 3 && (Eq.axis === 1 || Eq.axis === 2))) &&
            (EY = -1));
      } else En && EW++;
      let Ev = m0.controls.find((Eg) => Eg.group === Eq.group && Eg.key === EP),
        EB = EX + Eq.df;
      if (
        !Ev ||
        Ev.axes.length !== Eq.axes ||
        !Ev.axes.some((Eg) => (Eg.axis ?? null) === (Eq.axis ?? null)) ||
        EB < 0 ||
        EB > EL - 1 ||
        mV.has(mM(Ev) + '|' + (Eq.axis ?? ''))
      ) {
        Ey++;
        continue;
      }
      Eb.push({
        ctl: Ev,
        axis: Eq.axis,
        f: EB,
        d: {
          v: Eq.v * EY,
          i: Eq.i,
          ...(Eq.tin != null ? { tin: Eq.tin * EY, tout: Eq.tout * EY, free: Eq.free } : {}),
        },
      });
    }
    if (!Eb.length) {
      D8(
        'Nothing to paste here: those curves are not in the graph, or the keys would fall outside the clip',
      );
      return;
    }
    (SS([...new Set(Eb.map((Eg) => mM(Eg.ctl)))], (Eg, EI) => {
      let EN = Eg;
      for (let EM of Eb.filter((F0) => F0.ctl === EI)) EN = wR(EN, me(EM.f), EL, EM.axis, EM.d);
      return EN;
    }),
      Sz(Eb.map((Eg) => ({ ch: mM(Eg.ctl) + '|' + (Eg.axis ?? ''), f: Eg.f }))),
      D8(
        'Pasted ' +
          Eb.length +
          ' key' +
          (Eb.length > 1 ? 's' : '') +
          (Ey ? ' \u00B7 ' + Ey + ' had nowhere to go' : '') +
          (EW ? " \u00B7 keys other than a bone's pasted as they were" : ''),
      ));
  }
  let r1 = null;
  function r2() {
    r1 &&
      (r1.remove(),
      (r1 = null),
      document.removeEventListener('pointerdown', r3, !0),
      document.removeEventListener('keydown', r4, !0));
  }
  let r3 = (En) => {
      r1 && !r1.contains(En.target) && r2();
    },
    r4 = (En) => {
      En.key === 'Escape' && (En.preventDefault(), En.stopPropagation(), r2());
    };
  function r5(En, EX, EL, Eb) {
    (r2(),
      (r1 = Dk('div', 'lib-seq__menu lib-seq__menu--graph')),
      r1.setAttribute('role', 'menu'),
      r1.append(Dk('div', 'lib-seq__menu-title', EL)));
    for (let EW of Eb) {
      let Eq = Dk('div', 'lib-seq__menu-row');
      Eq.append(Dk('span', 'lib-seq__menu-label', EW.label || ''));
      let EP = Dk('div', 'lib-seq__menu-group');
      for (let EY of EW.items) {
        let Ev = Dk(
          'button',
          'lib-btn lib-btn--sm lib-seq__menu-opt' + (EY.on ? ' is-on' : ''),
          EY.text,
        );
        ((Ev.type = 'button'),
          EY.tip && (Ev.title = EY.tip),
          (Ev.disabled = !!EY.off),
          Ev.addEventListener('click', (EB) => {
            (r2(), EY.run(EB));
          }),
          EP.append(Ev));
      }
      (Eq.append(EP), r1.append(Eq));
    }
    (r1.addEventListener('contextmenu', (EB) => EB.preventDefault()), document.body.append(r1));
    let Ex = r1.offsetWidth,
      Ey = r1.offsetHeight;
    ((r1.style.left = Math.max(8, Math.min(En, window.innerWidth - Ex - 8)) + 'px'),
      (r1.style.top =
        (EX + Ey + 8 > window.innerHeight ? Math.max(8, EX - Ey - 4) : EX + 4) + 'px'),
      document.addEventListener('pointerdown', r3, !0),
      document.addEventListener('keydown', r4, !0));
  }
  let r6 = () => {
      let En = DR.getBoundingClientRect();
      return E7
        ? [En.left + E7[0], En.top + E7[1]]
        : [En.left + En.width / 2, En.top + En.height / 2];
    },
    r7 = () => !mY().length;
  function r8() {
    let En = SC(),
      EX = new Set(En.map((EW) => EW.k.i)),
      EL = EX.size === 1 ? [...EX][0] : null,
      Eb = VS(EL),
      Ex = (EW, Eq, EP) => ({
        text: EW,
        tip: EP,
        on: EL === Eq,
        off: !En.length,
        run: () => SF(Eq),
      }),
      Ey = (EW) => ({
        text: Ve[EW],
        tip: Ve[EW] + ' easing to the next key',
        on: Eb?.name === EW,
        off: !En.length,
        run: () => SF(VC(EW, Eb?.way ?? null)),
      });
    return [
      {
        label: 'Interpolation',
        items: [
          Ex('Bezier', V9, 'A smooth curve to the next key'),
          Ex('Linear', Vw, 'A straight line to the next key'),
          Ex('Step', VD, 'Holds, then jumps at the next key'),
        ],
      },
      {
        label: 'Easing',
        items: ['sine', 'quad', 'cubic', 'quart', 'quint', 'expo', 'circ'].map(Ey),
      },
      { label: 'Dynamic', items: ['back', 'bounce', 'elastic'].map(Ey) },
    ];
  }
  function r9() {
    let En = SC(),
      EX = En.filter((Ey) => VS(Ey.k.i)),
      EL = new Set(EX.map((Ey) => VS(Ey.k.i).way ?? null)),
      Eb = EL.size === 1 ? [...EL][0] : void 0,
      Ex = (Ey, EW, Eq) => ({
        text: Ey,
        tip: Eq,
        on: Eb === EW,
        off: !EX.length,
        run: () => rk(EW),
      });
    return [
      {
        label: 'Ease',
        items: [
          Ex('Auto', null, 'As Blender has it: in for an easing, out for Back, Bounce and Elastic'),
          Ex('In', 'in', 'Starts slowly'),
          Ex('Out', 'out', 'Arrives slowly'),
          Ex('In and out', 'io', 'Slow at both ends'),
        ],
      },
    ];
  }
  function rk(En) {
    let EX = SC().filter((EL) => VS(EL.k.i));
    if (!EX.length) {
      D8('Give the keys an easing first');
      return;
    }
    SS([...new Set(EX.map((EL) => EL.c.cid))], (EL, Eb) => {
      let Ex = EL;
      for (let Ey of EX.filter((EW) => EW.c.control === Eb))
        Ex = wO(Ex, [me(Ey.s.f)], mH(), VC(VS(Ey.k.i).name, En), Ey.c.axis);
      return Ex;
    });
  }
  let rw = () => {
      let En = new Set(SC().map((EX) => wT(EX.k)));
      return [
        {
          label: 'Handle type',
          items: wU.map(([EX, EL]) => ({
            text: EL,
            tip: DK[EX],
            on: En.size === 1 && En.has(EX),
            off: r7(),
            run: () => SE(EX),
          })),
        },
      ];
    },
    rV = () => [
      {
        label: 'Selection to',
        items: [
          { text: 'Current Frame', off: r7(), run: Sx },
          { text: 'Cursor Value', off: r7(), run: Sy },
          { text: 'Nearest Second', off: r7(), run: SW },
        ],
      },
      {
        label: 'Handles',
        items: [
          { text: 'Flatten Handles', tip: 'Level handles on the picked keys', off: r7(), run: Sq },
        ],
      },
      {
        label: 'Cursor',
        items: [
          {
            text: 'Cursor to Selection',
            tip: "The playhead and the cursor value to the picked keys' middle (Ctrl+G)",
            off: r7(),
            run: () => Sb(),
          },
          { text: 'Cursor Value to Selection', off: r7(), run: () => Sb({ frame: !1 }) },
        ],
      },
    ],
    rD = () => [
      {
        label: 'Mirror',
        items: [
          { text: 'By Times Over Current Frame', off: r7(), run: SP },
          { text: 'By Values Over Cursor Value', off: r7(), run: SY },
          { text: 'By Values Over Zero Value', off: r7(), run: Sv },
        ],
      },
    ],
    rm = () => [
      {
        label: 'Insert',
        items: [
          {
            text: 'All Channels',
            tip: "A key on the playhead's frame on every curve shown",
            run: () => SG('all'),
          },
          {
            text: 'Only Selected Channels',
            tip: 'On the curves with a key picked, or the one last touched',
            run: () => SG('picked'),
          },
          {
            text: 'Active Channel at Cursor',
            tip: 'On the curve last touched, at the 2D cursor',
            run: () => SG('active', !0),
          },
          {
            text: 'Selected Channels at Cursor',
            tip: 'On the picked curves, at the 2D cursor',
            run: () => SG('picked', !0),
          },
        ],
      },
    ];
  function rS(En, EX) {
    r5(En, EX, 'Keys', [
      {
        label: 'Clipboard',
        items: [
          { text: 'Copy', off: r7(), run: SM },
          { text: 'Paste', off: !SN?.length, run: () => r0(!1) },
          { text: 'Paste Flipped', off: !SN?.length, run: () => r0(!0) },
        ],
      },
      ...rw(),
      ...r8(),
      ...r9(),
      {
        label: 'Keys',
        items: [
          {
            text: 'Insert Keyframes',
            tip: "On the picked curves, on the playhead's frame",
            run: () => SG('picked'),
          },
          {
            text: 'Duplicate',
            tip: 'Copies of the picked keys, to move (Shift+D)',
            off: r7(),
            run: (EL) => {
              let Eb = DR.getBoundingClientRect();
              ED('move', [EL.clientX - Eb.left, EL.clientY - Eb.top], { copy: !0 });
            },
          },
          { text: 'Delete', off: !m8.length, run: SI },
        ],
      },
      ...rD(),
      ...rV(),
    ]);
  }
  let rE = 300,
    rF = {
      name: 'Decimate (Ratio)',
      tip: 'Keys taken out where they shape the curve least \u2014 this share of the picked ones',
      bounds: [0, 1],
      start: 0.5,
      overshoot: !1,
      percent: !0,
      step: 0.1,
    },
    rC = {
      name: 'Decimate (Allowed Change)',
      tip: 'Keys taken out while the curve stays within this much of what it was',
      bounds: [0, 10],
      start: 0,
      overshoot: !0,
      percent: !1,
      step: 0.1,
    },
    rt = (En) => (En === 'decimate' ? rF : En === 'decimateError' ? rC : (Ni[En] ?? Is[En]));
  function rH(En, EX, { any: EL = !1 } = {}) {
    let Eb = mH(),
      Ex = VA(EX, En.axis).map((Eq) => ({ ...Eq, x: Eq.u * (Eb - 1) })),
      Ey = Ex.map((Eq) => (EL ? mq(En.id, mR(Eq.u)) : my(En.id, mR(Eq.u)))),
      EW = VZ(
        Ex.map((Eq) => ({
          u: Eq.u,
          v: Eq.v,
          i: Eq.i,
          tin: Eq.tin,
          tout: Eq.tout,
          lin: Eq.lin,
          lout: Eq.lout,
        })),
      );
    return { c: En, keys: Ex, picked: Ey, at: (Eq) => EW(Eq / (Eb - 1)) };
  }
  function rR(En, EX, EL) {
    let Eb = new Map();
    return (
      EX.keys.forEach((Ex, Ey) => {
        let EW = Zn(EL[Ey], EX.c.min, EX.c.max);
        Math.abs(EW - Ex.v) > 1e-12 && Eb.set(mR(Ex.u), EW);
      }),
      Eb.size ? wC(En, mH(), EX.c.axis, Eb) : En
    );
  }
  let rQ = () => mx().filter((En) => !mV.has(En.id));
  function rj(En, EX, EL, Eb) {
    let Ex = rH(EX, EL);
    if (!Ex.picked.some(Boolean)) return Eb;
    if (En.op === 'decimate' || En.op === 'decimateError') {
      let EW = jd(Ex.keys, Ex.picked, {
        frames: mH(),
        ratio: En.op === 'decimate' ? En.f : 1,
        errorMax: En.op === 'decimate' ? null : En.f,
        yScale: EX.unit === '\u00B0' ? Math.PI / 180 : 1,
      });
      En.skipped += EW.skipped || 0;
      let Eq = Eb;
      for (let [EP, EY] of EW.handles) {
        let Ev = Ex.keys[EP];
        (EY.i && (Eq = wO(Eq, [Ev.u], mH(), EY.i, EX.axis)),
          (Eq = w5(Eq, Ev.u, mH(), EX.axis, {
            tin: EY.tin,
            tout: EY.tout,
            free: EY.type === 'free',
            lin: EY.lin,
            lout: EY.lout,
          })));
      }
      return EW.remove.length
        ? wj(
            Eq,
            EW.remove.map((EB) => Ex.keys[EB].u),
            mH(),
            EX.axis,
          )
        : Eq;
    }
    let Ey;
    if (En.op === 'gaussian') Ey = Md(Ex.keys, Ex.picked, En.f, Ex.at);
    else {
      if (En.op === 'butterworth') Ey = Cd(Ex.keys, Ex.picked, En.f, Ex.at, { fps: m0.fps || 30 });
      else {
        if (
          ((Ey = xd(En.op, Ex.keys, Ex.picked, En.op === 'ease' ? En.vals.factor : En.f, {
            rest: EX.rest,
            sharpness: En.vals.sharpness,
            from: En.from,
            at: Ex.at,
          })),
          !Ey)
        )
          return ((En.refused = !0), Eb);
      }
    }
    return rR(Eb, Ex, Ey);
  }
  function rz(En, EX) {
    if (!m0 || !m2) return !1;
    let EL = rt(En),
      Eb = rQ().filter((EW) => EW.keys.some((Eq) => my(EW.id, mR(Eq.u))));
    if (!Eb.length) return (D8(EL.name + ': pick keys on a curve first'), !1);
    let Ex = m0.fps || 30,
      Ey = En === 'butterworth' ? [0, Ex / 2] : EL.bounds.slice();
    return (
      (mm = {
        kind: 'slide',
        op: En,
        meta: EL,
        bounds: Ey,
        step: En === 'butterworth' ? Ex / 20 : EL.step,
        over: !1,
        overOk: EL.overshoot,
        f: EL.start,
        raw: EL.start,
        last: EX,
        typed: '',
        fine: !1,
        steps: !1,
        from: 'left',
        which: 'factor',
        vals: { factor: EL.start, sharpness: 2 },
        skipped: 0,
        refused: !1,
        orig: new Map(Eb.map((EW) => [EW.cid, EW.control.curve])),
        chs: Eb.map((EW) => EW.id),
      }),
      window.addEventListener('pointermove', rJ, !0),
      window.addEventListener('pointerdown', rJ, !0),
      window.addEventListener('contextmenu', Em, !0),
      window.addEventListener('keydown', rZ, !0),
      window.addEventListener('keyup', rZ, !0),
      (DR.style.cursor = 'ew-resize'),
      rU(!0),
      !0
    );
  }
  function rO(En) {
    let EX = mm,
      EL = EX.bounds[1] - EX.bounds[0];
    ((EX.raw += ((En - EX.last) / (rE / EL)) * (EX.fine ? 1 / 8 : 1)), (EX.last = En));
    let Eb = EX.raw;
    (EX.steps && (Eb = Math.round(Eb / EX.step) * EX.step),
      (EX.over && EX.overOk) ||
        (Eb = Zn(Eb, EX.bounds[0], EX.which === 'sharpness' ? 1 / 0 : EX.bounds[1])),
      (EX.f = Eb),
      (EX.vals[EX.which] = Eb));
  }
  function rJ(En) {
    let EX = mm;
    if (EX?.kind === 'slide') {
      if ((Em(En), En.type === 'pointermove')) {
        if (En.buttons & 2) {
          rK(!1);
          return;
        }
        if (EX.typed) return;
        ((EX.fine = En.shiftKey),
          (EX.steps = En.ctrlKey || En.metaKey),
          rO(En.clientX),
          E5(() => {
            mm === EX && rU(!0);
          }));
        return;
      }
      En.button === 2 ? rK(!1) : En.button === 0 && rK(!0);
    }
  }
  function rZ(En) {
    let EX = mm;
    if (EX?.kind !== 'slide') return;
    Em(En);
    let EL = En.key;
    if (En.type === 'keyup') {
      (EL === 'Shift' && (EX.fine = !1), (EL === 'Control' || EL === 'Meta') && (EX.steps = !1));
      return;
    }
    if (EL === 'Escape') {
      rK(!1);
      return;
    }
    if (EL === 'Enter' || EL === ' ') {
      rK(!0);
      return;
    }
    if (EL === 'Shift') {
      EX.fine = !0;
      return;
    }
    if (EL === 'Control' || EL === 'Meta') {
      EX.steps = !0;
      return;
    }
    if ((EL === 'e' || EL === 'E') && EX.overOk) {
      ((EX.over = !EX.over), rO(EX.last), rU(!0));
      return;
    }
    if (EL === 'Tab' && EX.op === 'ease') {
      ((EX.which = EX.which === 'factor' ? 'sharpness' : 'factor'),
        (EX.bounds = EX.which === 'factor' ? [-1, 1] : [0.001, 10]),
        (EX.overOk = EX.which === 'sharpness'),
        (EX.f = EX.raw = EX.vals[EX.which]),
        (EX.typed = ''),
        rU(!0));
      return;
    }
    if ((EL === 'd' || EL === 'D') && (EX.op === 'shear' || EX.op === 'scaleNeighbor')) {
      ((EX.from = EX.from === 'left' ? 'right' : 'left'), rU(!0));
      return;
    }
    if (EL === 'Backspace') EX.typed = EX.typed.slice(0, -1);
    else {
      if (EL === '-') EX.typed = EX.typed.startsWith('-') ? EX.typed.slice(1) : '-' + EX.typed;
      else {
        if (/^[0-9.]$/.test(EL)) EX.typed += EL;
        else return;
      }
    }
    let Eb = EC(EX.typed);
    if (Eb != null) {
      let Ex = EX.meta.percent && EX.which === 'factor';
      ((EX.f = EX.raw =
        EX.overOk && EX.over
          ? Ex
            ? Eb / 100
            : Eb
          : Zn(Ex ? Eb / 100 : Eb, EX.bounds[0], EX.which === 'sharpness' ? 1 / 0 : EX.bounds[1])),
        (EX.vals[EX.which] = EX.f));
    }
    rU(!0);
  }
  function rU(En) {
    let EX = mm;
    if (EX?.kind !== 'slide') return;
    ((EX.skipped = 0), (EX.refused = !1));
    let EL = [];
    for (let [Ey, EW] of EX.orig) {
      let Eq = m0.controls.find((EY) => mM(EY) === Ey);
      if (!Eq) continue;
      let EP = EW;
      for (let EY of EX.chs) {
        let Ev = mL(EY);
        Ev?.cid === Ey && (EP = rj(EX, Ev, EW, EP));
      }
      EL.push({ group: Eq.group, key: Eq.key, curve: EP });
    }
    let Eb =
        EX.which === 'sharpness'
          ? 'sharpness ' + +EX.f.toFixed(3)
          : EX.meta.percent
            ? Math.round(EX.f * 100) + '%'
            : '' + +EX.f.toFixed(2) + (EX.meta.unit ? ' ' + EX.meta.unit : ''),
      Ex = [
        EX.typed ? '[' + EX.typed + '|]' : '',
        EX.overOk ? 'E ' + (EX.over ? 'held to its range' : 'past its ends') : '',
        EX.op === 'ease' ? 'Tab: ' + (EX.which === 'factor' ? 'sharpness' : 'curve bend') : '',
        EX.op === 'shear' || EX.op === 'scaleNeighbor'
          ? 'D: from the ' + (EX.from === 'left' ? 'right' : 'left')
          : '',
        EX.refused ? 'no key beyond the keys either side to match' : '',
        EX.skipped
          ? EX.skipped + ' step or eased key' + (EX.skipped > 1 ? 's' : '') + ' left as they are'
          : '',
      ]
        .filter(Boolean)
        .join(' \u00B7 ');
    ((DM.textContent =
      EX.meta.name +
      ': ' +
      Eb +
      (Ex ? ' \u00B7 ' + Ex : '') +
      ' \u2014 move the pointer (Shift finer, Ctrl in steps), click or Enter to keep, Esc or right-click to cancel'),
      DM.classList.add('is-busy'),
      EL.length ? D4(EL, { live: En }) : E1());
  }
  function rK(En) {
    let EX = mm;
    if (EX?.kind === 'slide') {
      if (
        ((E4 = null),
        window.removeEventListener('pointermove', rJ, !0),
        window.removeEventListener('pointerdown', rJ, !0),
        window.removeEventListener('keydown', rZ, !0),
        window.removeEventListener('keyup', rZ, !0),
        setTimeout(() => window.removeEventListener('contextmenu', Em, !0), 600),
        (DM.textContent = DN),
        DM.classList.remove('is-busy'),
        (DR.style.cursor = 'default'),
        En)
      )
        (rU(!1), (mm = null), EZ());
      else {
        mm = null;
        let EL = [...EX.orig]
          .map(([Eb, Ex]) => {
            let Ey = m0.controls.find((EW) => mM(EW) === Eb);
            return Ey ? { group: Ey.group, key: Ey.key, curve: Ex } : null;
          })
          .filter(Boolean);
        EL.length && D4(EL, { live: !1 });
      }
      (S6(), Sm(), E1());
    }
  }
  function rT(En, EX) {
    let EL = new Map();
    for (let Ex of En) EL.set(Ex.cid, [...(EL.get(Ex.cid) || []), Ex]);
    let Eb = [];
    for (let [Ey, EW] of EL) {
      let Eq = m0.controls.find((EY) => mM(EY) === Ey);
      if (!Eq) continue;
      let EP = Eq.curve;
      for (let EY of EW) EP = EX(EY, Eq.curve, EP);
      Eb.push({ group: Eq.group, key: Eq.key, curve: EP });
    }
    Eb.length && D4(Eb, { live: !1 });
  }
  function rA(En) {
    let EX = En ? rQ().filter(mv) : rQ(),
      EL = 0;
    (rT(EX, (Eb, Ex, Ey) => {
      let EW = rH(Eb, Ex),
        { keep: Eq, empty: EP } = $d(EW.keys, EW.picked, {
          onlyPicked: !En,
          clearDefault: En,
          rest: Eb.rest,
        }),
        EY = EW.keys.filter((Ev, EB) => EP || !Eq[EB]).map((Ev) => Ev.u);
      return ((EL += EY.length), EY.length ? wj(Ey, EY, mH(), Eb.axis) : Ey);
    }),
      (m8 = m8.filter((Eb) => !Eb.ch || mL(Eb.ch)?.keys.some((Ex) => mR(Ex.u) === Eb.f))),
      D8(
        EL
          ? 'Cleaned: ' + EL + ' key' + (EL > 1 ? 's' : '') + ' taken out'
          : 'Nothing to clean: every key adds something',
      ));
  }
  function rX() {
    let En = 0;
    (rT(rQ(), (EX, EL, Eb) => {
      let Ex = rH(EX, EL, { any: !0 }),
        Ey = Eb;
      for (let EW of Ad(Ex.keys, Ex.picked, Ex.at))
        ((Ey = wR(Ey, me(EW.x), mH(), EX.axis, { v: Zn(EW.v, EX.min, EX.max), i: V9 })), En++);
      return Ey;
    }),
      D8(
        En
          ? 'Baked: ' + En + ' key' + (En > 1 ? 's' : '') + ' added'
          : 'Pick two keys or more on a curve to bake between them',
      ));
  }
  function rL() {
    rT(rQ(), (En, EX, EL) => {
      let Eb = rH(En, EX, { any: !0 }),
        Ex = Eb.keys.map((Eq) => ({
          v: Eq.v,
          hIn: Eq.v - Eq.tin * Eq.lenIn,
          hOut: Eq.v + Eq.tout * Eq.lenOut,
        })),
        Ey = Sd(Ex, Eb.picked),
        EW = rR(
          EL,
          Eb,
          Ey.map((Eq) => Eq.v),
        );
      return (
        Eb.keys.forEach((Eq, EP) => {
          if (!Eq.own || Ey[EP].v === Eq.v) return;
          let EY = (Ey[EP].v - Ey[EP].hIn) / Eq.lenIn,
            Ev = Eq.free ? (Ey[EP].hOut - Ey[EP].v) / Eq.lenOut : EY;
          EW = w5(EW, Eq.u, mH(), En.axis, {
            tin: EY,
            tout: Ev,
            free: Eq.free,
            lin: Eq.lin,
            lout: Eq.lout,
          });
        }),
        EW
      );
    });
  }
  function rb() {
    let En = 0,
      EX = [];
    for (let EL of m0.controls.filter((Eb) => Array.isArray(Eb.euler))) {
      let Eb = EL.euler
        .map((Eq) => mL(mM(EL) + '|' + Eq))
        .map((Eq) => (Eq && mv(Eq) && !mV.has(Eq.id) ? Eq : null));
      if (!Eb.some(Boolean)) continue;
      let Ex = Eb.map((Eq) => (Eq ? rH(Eq, EL.curve) : null)),
        { values: Ey } = Ed(Ex.map((Eq) => Eq?.keys ?? null)),
        EW = EL.curve;
      (Ex.forEach((Eq, EP) => {
        Eq && (EW = rR(EW, Eq, Ey[EP]));
      }),
        EX.push({ group: EL.group, key: EL.key, curve: EW }),
        En++);
    }
    (EX.length && D4(EX, { live: !1 }),
      D8(
        En
          ? 'Euler filter: ' + En + ' rotation' + (En > 1 ? 's' : '') + ' checked for flips'
          : "The Euler filter is for turns in angles: pick an IK control's turn, or a bone with curves of its own",
      ));
  }
  let rx = (En, EX) => rz(En, EX?.clientX ?? DR.getBoundingClientRect().left + (E7?.[0] ?? mS / 2)),
    ry = () => [
      {
        label: 'Blend',
        items: Object.entries(Ni).map(([En, EX]) => ({
          text: EX.name,
          tip: EX.tip,
          off: r7(),
          run: (EL) => rx(En, EL),
        })),
      },
    ],
    rW = () => [
      {
        label: 'Smooth',
        items: [
          {
            text: Is.gaussian.name,
            tip: Is.gaussian.tip,
            off: r7(),
            run: (En) => rx('gaussian', En),
          },
          {
            text: 'Smooth (Legacy)',
            tip: "The picked keys averaged with their neighbours, as Blender's older Smooth (Alt+O)",
            off: r7(),
            run: rL,
          },
          {
            text: Is.butterworth.name,
            tip: Is.butterworth.tip,
            off: r7(),
            run: (En) => rx('butterworth', En),
          },
        ],
      },
    ],
    rq = () => [
      {
        label: 'Density',
        items: [
          { text: rF.name, tip: rF.tip, off: r7(), run: (En) => rx('decimate', En) },
          { text: rC.name, tip: rC.tip, off: r7(), run: (En) => rx('decimateError', En) },
          {
            text: 'Bake Keyframes',
            tip: 'A key on every frame between the picked keys (Shift+Alt+O)',
            off: r7(),
            run: rX,
          },
          {
            text: 'Clean Keyframes',
            tip: 'The picked keys that add nothing to the curve taken out',
            off: r7(),
            run: () => rA(!1),
          },
          {
            text: 'Clean Channels',
            tip: 'Every key of the picked curves that adds nothing taken out \u2014 and a curve left at its default, gone',
            run: () => rA(!0),
          },
        ],
      },
    ],
    rP = () => [
      ...rV(),
      ...rD(),
      {
        label: 'Jump',
        items: [
          {
            text: 'Jump to Selected',
            tip: 'The playhead and the cursor to the picked keys (Ctrl+G)',
            off: r7(),
            run: () => Sb(),
          },
        ],
      },
      ...rm(),
      {
        label: 'Clipboard',
        items: [
          { text: 'Copy', off: r7(), run: SM },
          { text: 'Paste', off: !SN?.length, run: () => r0(!1) },
          { text: 'Paste Flipped', off: !SN?.length, run: () => r0(!0) },
          {
            text: 'Duplicate',
            off: r7(),
            run: (En) => {
              let EX = DR.getBoundingClientRect();
              ED('move', [En.clientX - EX.left, En.clientY - EX.top], { copy: !0 });
            },
          },
          { text: 'Delete', off: !m8.length, run: SI },
        ],
      },
      ...rw(),
      ...r8(),
      ...r9(),
      ...rq(),
      ...ry(),
      ...rW(),
    ],
    rY = () => [
      {
        label: 'Settings',
        items: [
          {
            text: 'Lock',
            tip: "The picked curves' keys can't be picked or changed \u2014 or unlocked again",
            off: !mB().length,
            run: () => S7(mB()),
          },
          {
            text: 'Mute',
            tip: "The picked curves' controls play nothing (the whole control: an IK control, a slider, a pose layer)",
            off: !mB().length,
            run: () => S8(mB()),
          },
        ],
      },
      {
        label: 'Show',
        items: [
          { text: 'Hide Selected Curves', tip: 'H', run: () => SL('picked') },
          { text: 'Hide Unselected Curves', tip: 'Shift+H', run: () => SL('others') },
          { text: 'Reveal Curves', tip: 'Alt+H', run: () => SL('none') },
        ],
      },
      {
        label: 'Filter',
        items: [
          {
            text: 'Discontinuity (Euler) Filter',
            tip: "Flips of 360\u00B0, and to the other way of writing a turn, taken out of a rotation's angles",
            run: rb,
          },
        ],
      },
    ],
    rv = (En, EX) => {
      (En.addEventListener('keydown', (EL) => {
        (EL.stopPropagation(),
          EL.key === 'Enter' && (EL.preventDefault(), En.blur()),
          EL.key === 'Escape' && (EL.preventDefault(), (En.value = ''), En.blur(), Sm()));
      }),
        En.addEventListener('change', EX));
    };
  (rv(DO.input, () => {
    let En = m9 && SD(m9),
      EX = Zn(Math.round(Number(DO.input.value)) - 1, 0, mH() - 1);
    if (!En || !Number.isFinite(EX) || EX === m9.f) {
      Sm();
      return;
    }
    if (En.c.keys.some((Eb) => mR(Eb.u) === EX)) {
      (D8('There is a key on that frame already'), Sm());
      return;
    }
    let EL = m9.f;
    ((m8 = m8.map((Eb) => (Eb.ch === m9.ch && Eb.f === EL ? { ch: Eb.ch, f: EX } : Eb))),
      (m9 = { ch: m9.ch, f: EX }),
      SS([En.c.cid], (Eb) => wm(Eb, [{ from: me(EL), to: me(EX) }], mH(), En.c.axis)));
  }),
    rv(DJ.input, () => {
      let En = m9 && SD(m9),
        EX = Number(DJ.input.value);
      if (!En || DJ.input.value === '' || !Number.isFinite(EX)) {
        Sm();
        return;
      }
      SS([En.c.cid], (EL) =>
        wE(EL, En.k.u, mH(), En.c.axis, Zn(EX / En.c.scale, En.c.min, En.c.max)),
      );
    }),
    rv(DI.input, () => {
      let En = Number(DI.input.value);
      (DI.input.value !== '' && Number.isFinite(En) && (Dh = En), Sm(), E1());
    }));
  let rB = (En, EX, EL) => EL.find((Eb) => Eb * En >= EX) ?? EL[EL.length - 1],
    rG = [0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 15, 30, 45, 90, 180, 360, 720, 1800, 3600],
    rg = [1, 2, 5, 10, 15, 30, 60, 90, 150, 300, 600, 900],
    rI = (En, EX) => ({
      hasIn: EX > 0 && En.keys[EX - 1].i === V9,
      hasOut: EX >= 0 && EX < En.keys.length - 1 && En.keys[EX].i === V9,
    });
  function rN(En, EX) {
    let EL = En.keys[EX],
      Eb = mZ(mQ(EL.u)),
      Ex = mK(mg(En, EL.v)),
      Ey = (EP, EY, Ev) => [mZ(mQ(EL.u + EP * EY)), mK(mg(En, EL.v + EP * Ev * EY))],
      { hasIn: EW, hasOut: Eq } = rI(En, EX);
    return {
      kx: Eb,
      ky: Ex,
      tipOut: Eq ? Ey(1, EL.lenOut, EL.tout) : null,
      tipIn: EW ? Ey(-1, EL.lenIn, EL.tin) : null,
    };
  }
  let rM = (En) => mJ() + 3 + En * Ri + Ri / 2,
    E0 = (En, EX) => {
      let EL = mR(EX.u);
      return mm?.kind === 'xf' ? (mm.poseTo.get(En.id + '|' + EL) ?? EL) : EL;
    };
  function E1() {
    if (!mS || !mE || (Dj.setTransform(mF, 0, 0, mF, 0, 0), Dj.clearRect(0, 0, mS, mE), !m0 || !m2))
      return;
    let En = mO(),
      EX = mJ();
    Dj.font = yp;
    let EL = mZ(m0.offset),
      Eb = mZ(m0.offset + m0.clock);
    ((Dj.fillStyle = 'rgba(0, 0, 0, 0.28)'),
      EL > 0 && Dj.fillRect(0, En, Math.min(EL, mS), mE - En),
      Eb < mS && Dj.fillRect(Math.max(Eb, 0), En, mS - Math.max(Eb, 0), mE - En));
    let Ex = m0.fps || 30,
      Ey = rB(mA() / Ex, wp, rg);
    ((Dj.lineWidth = 1), (Dj.textBaseline = 'middle'), (Dj.textAlign = 'left'));
    for (let Ev = Math.max(0, Math.ceil((m2.t0 * Ex) / Ey) * Ey); Ev / Ex <= m2.t1; Ev += Ey) {
      let EB = Math.round(mZ(Ev / Ex)) + 0.5;
      ((Dj.strokeStyle = 'rgba(255, 255, 255, 0.06)'),
        Dj.beginPath(),
        Dj.moveTo(EB, En),
        Dj.lineTo(EB, mE),
        Dj.stroke(),
        (Dj.fillStyle = 'rgba(255, 255, 255, 0.45)'),
        Dj.fillText(String(Ev + 1), EB + 4, ws / 2));
    }
    let EW = rB(mX(), 30, rG);
    for (let EG = Math.ceil(m2.v0 / EW) * EW; EG <= m2.v1; EG += EW) {
      let Eg = Math.round(mK(EG)) + 0.5;
      if (Eg < En + 6 || Eg > EX - 2) continue;
      let EI = Math.abs(EG) < EW / 2;
      ((Dj.strokeStyle = EI ? 'rgba(255, 255, 255, 0.22)' : 'rgba(255, 255, 255, 0.06)'),
        Dj.beginPath(),
        Dj.moveTo(0, Eg),
        Dj.lineTo(mS, Eg),
        Dj.stroke(),
        (Dj.fillStyle = 'rgba(255, 255, 255, 0.45)'),
        Dj.fillText(String(+EG.toFixed(EW < 1 ? 2 : 0)), 4, Eg - 7));
    }
    Dj.textBaseline = 'top';
    for (let EN of m0.marks || []) {
      let EM = Math.round(mZ(EN.t)) + 0.5;
      EM < -200 ||
        EM > mS ||
        ((Dj.strokeStyle = 'rgba(255, 255, 255, 0.14)'),
        Dj.setLineDash([3, 4]),
        Dj.beginPath(),
        Dj.moveTo(EM, En),
        Dj.lineTo(EM, EX),
        Dj.stroke(),
        Dj.setLineDash([]),
        (Dj.fillStyle = 'rgba(255, 255, 255, 0.3)'),
        Dj.fillText(EN.label, EM + 4, En + 3));
    }
    (Dj.save(), Dj.beginPath(), Dj.rect(0, En, mS, EX - En), Dj.clip());
    let Eq = mx().sort((F0, F1) => (F0.id === mk) - (F1.id === mk)),
      EP = mj(m2.t0),
      EY = mj(m2.t1);
    for (let F0 of Eq) {
      if (!F0.keys.length || EY <= EP) continue;
      let F1 = [],
        F2 = 2 / (mA() * m0.clock);
      for (let F3 = EP; F3 < EY; F3 += F2) F1.push(F3);
      F1.push(EY);
      for (let F4 of F0.keys) F4.u > EP && F4.u < EY && F1.push(F4.u, Math.max(EP, F4.u - 1e-7));
      (F1.sort((F5, F6) => F5 - F6),
        (Dj.strokeStyle = F0.colour),
        (Dj.globalAlpha = F0.control.muted ? 0.4 : mv(F0) ? 1 : mG),
        (Dj.lineWidth = F0.id === mk ? 2.2 : 1.5),
        F0.control.muted ? Dj.setLineDash([5, 4]) : mV.has(F0.id) && Dj.setLineDash([2, 3]),
        Dj.beginPath(),
        F1.forEach((F5, F6) => {
          let F7 = mZ(mQ(F5)),
            F8 = mK(mg(F0, F0.f(F5)));
          F6 ? Dj.lineTo(F7, F8) : Dj.moveTo(F7, F8);
        }),
        Dj.stroke(),
        Dj.setLineDash([]),
        (Dj.globalAlpha = 1));
    }
    for (let F5 of Eq)
      F5.keys.forEach((F6, F7) => {
        let F8 = mR(F6.u);
        if (!mq(F5.id, F8)) return;
        let F9 = rN(F5, F7);
        for (let [Fk, Fw] of [
          ['in', F9.tipIn],
          ['out', F9.tipOut],
        ]) {
          if (!Fw) continue;
          let FV = mW(F5.id, F8, Fk);
          ((Dj.strokeStyle = FV ? '#fff' : 'rgba(255, 255, 255, 0.7)'),
            (Dj.lineWidth = 1),
            Dj.beginPath(),
            Dj.moveTo(F9.kx, F9.ky),
            Dj.lineTo(Fw[0], Fw[1]),
            Dj.stroke(),
            Dj.beginPath(),
            Dj.arc(Fw[0], Fw[1], FV ? 4.5 : 3.5, 0, Math.PI * 2),
            FV
              ? ((Dj.fillStyle = '#fff'),
                Dj.fill(),
                (Dj.lineWidth = 1.5),
                (Dj.strokeStyle = F5.colour),
                Dj.stroke())
              : F6.own
                ? ((Dj.fillStyle = '#fff'), Dj.fill())
                : ((Dj.fillStyle = '#12161c'), Dj.fill(), Dj.stroke()));
        }
      });
    for (let F6 of Eq)
      for (let F7 of F6.keys) {
        let F8 = mZ(mQ(F7.u)),
          F9 = mK(mg(F6, F7.v));
        if (F8 < -10 || F8 > mS + 10) continue;
        let Fk = my(F6.id, mR(F7.u)),
          Fw = Fk ? Rd + 1.5 : Rd;
        (Dj.beginPath(),
          F7.i === VD
            ? Dj.rect(F8 - Fw * 0.85, F9 - Fw * 0.85, Fw * 1.7, Fw * 1.7)
            : F7.i === Vw
              ? (Dj.moveTo(F8, F9 - Fw * 1.2),
                Dj.lineTo(F8 + Fw * 1.2, F9),
                Dj.lineTo(F8, F9 + Fw * 1.2),
                Dj.lineTo(F8 - Fw * 1.2, F9),
                Dj.closePath())
              : Dj.arc(F8, F9, Fw, 0, Math.PI * 2),
          (Dj.fillStyle = Fk ? '#fff' : F6.colour),
          (Dj.globalAlpha = Fk ? 1 : F6.control.muted ? 0.5 : mv(F6) ? 1 : mG),
          Dj.fill(),
          (Dj.globalAlpha = 1),
          (Dj.lineWidth = 1.5),
          (Dj.strokeStyle = Fk ? F6.colour : '#12161c'),
          Dj.stroke());
      }
    (Dj.restore(),
      mz() &&
        ((Dj.fillStyle = 'rgba(255, 255, 255, 0.04)'),
        Dj.fillRect(0, EX, mS, mE - EX),
        (Dj.strokeStyle = 'rgba(255, 255, 255, 0.12)'),
        (Dj.lineWidth = 1),
        Dj.beginPath(),
        Dj.moveTo(0, EX + 0.5),
        Dj.lineTo(mS, EX + 0.5),
        Dj.stroke(),
        (Dj.textBaseline = 'middle'),
        m0.poses.forEach((FV, FD) => {
          let Fm = rM(FD);
          for (let FS of FV.keys) {
            let FE = mR(FS.u),
              FF = mZ(mQ(me(E0(FV, FS)))),
              FC = mP(FV.id, FE),
              FH = FC ? 6 : 5;
            (Dj.beginPath(),
              Dj.moveTo(FF, Fm - FH),
              Dj.lineTo(FF + FH, Fm),
              Dj.lineTo(FF, Fm + FH),
              Dj.lineTo(FF - FH, Fm),
              Dj.closePath(),
              (Dj.fillStyle = FC ? '#fff' : 'rgba(87, 224, 160, 0.95)'),
              (Dj.globalAlpha = FV.muted && !FC ? 0.5 : 1),
              Dj.fill(),
              (Dj.globalAlpha = 1));
          }
        })));
    {
      let FV = Math.round(mK(Dh)) + 0.5;
      FV > En &&
        FV < EX &&
        ((Dj.strokeStyle = 'rgba(102, 204, 255, 0.55)'),
        (Dj.lineWidth = 1),
        Dj.setLineDash([6, 4]),
        Dj.beginPath(),
        Dj.moveTo(0, FV),
        Dj.lineTo(mS, FV),
        Dj.stroke(),
        Dj.setLineDash([]));
    }
    if (mm?.kind === 'xf' && mm.mode !== 'move' && Dg !== 'individual') {
      let FD = mZ(mQ(me(mm.pivot.f))),
        Fm = mK(mm.pivot.v);
      ((Dj.strokeStyle = 'rgba(255, 255, 255, 0.6)'),
        (Dj.lineWidth = 1),
        Dj.setLineDash([3, 3]),
        Dj.beginPath(),
        Dj.moveTo(FD, Fm),
        Dj.lineTo(mm.last[0], mm.last[1]),
        Dj.stroke(),
        Dj.setLineDash([]),
        Dj.beginPath(),
        Dj.arc(FD, Fm, 4, 0, Math.PI * 2),
        Dj.stroke());
    }
    if (
      (mm?.kind === 'box' &&
        ((Dj.strokeStyle = '#fff'),
        (Dj.lineWidth = 1),
        Dj.setLineDash([4, 3]),
        Dj.strokeRect(
          Math.min(mm.x0, mm.x1) + 0.5,
          Math.min(mm.y0, mm.y1) + 0.5,
          Math.abs(mm.x1 - mm.x0),
          Math.abs(mm.y1 - mm.y0),
        ),
        Dj.setLineDash([])),
      (Dj.fillStyle = 'rgba(255, 255, 255, 0.05)'),
      Dj.fillRect(0, 0, mS, ws),
      m0.playing !== !1)
    ) {
      let FS = Math.round(mZ(m0.offset + mC)) + 0.5;
      ((Dj.strokeStyle = Dj.fillStyle = '#fff'),
        (Dj.lineWidth = 1),
        Dj.beginPath(),
        Dj.moveTo(FS, 0),
        Dj.lineTo(FS, mE),
        Dj.stroke(),
        Dj.beginPath(),
        Dj.moveTo(FS - 5, 0),
        Dj.lineTo(FS + 5, 0),
        Dj.lineTo(FS, 9),
        Dj.closePath(),
        Dj.fill());
    }
  }
  function E2(En, EX) {
    let EL = null;
    for (let Eq of rQ())
      for (let EP = 0; EP < Eq.keys.length; EP++) {
        if (!mq(Eq.id, mR(Eq.keys[EP].u))) continue;
        let EY = rN(Eq, EP);
        for (let [Ev, EB] of [
          ['out', EY.tipOut],
          ['in', EY.tipIn],
        ]) {
          let EG = EB ? Math.hypot(EB[0] - En, EB[1] - EX) : 1 / 0;
          EG < na && (!EL || EG < EL.d) && (EL = { kind: 'handle', c: Eq, j: EP, side: Ev, d: EG });
        }
      }
    let Eb = null;
    for (let Eg of rQ())
      Eg.keys.forEach((EI, EN) => {
        let EM = Math.hypot(mZ(mQ(EI.u)) - En, mK(mg(Eg, EI.v)) - EX) - (Eg.id === mk ? 0.5 : 0);
        EM < na && (!Eb || EM < Eb.d) && (Eb = { kind: 'key', c: Eg, j: EN, d: EM });
      });
    let Ex = EX >= mO() && EX <= mJ() + 2;
    if (EL && Ex && (!Eb || EL.d < Eb.d)) return EL;
    if (Eb && Ex) return Eb;
    if (EX > mJ()) {
      let EI = Math.floor((EX - mJ() - 3) / Ri),
        EN = m0.poses?.[EI];
      if (EN) {
        for (let EM of EN.keys)
          if (Math.abs(mZ(mQ(EM.u)) - En) < na) return { kind: 'pose', p: EN, f: mR(EM.u) };
      }
      return null;
    }
    let Ey = mj(mU(En));
    if (Ey < 0 || Ey > 1) return null;
    let EW = null;
    for (let F0 of mx()) {
      if (!F0.keys.length) continue;
      let F1 = Math.abs(mK(mg(F0, F0.f(Ey))) - EX);
      F1 < 6 && (!EW || F1 < EW.d) && (EW = { kind: 'line', c: F0, u: Ey, d: F1 });
    }
    return EW;
  }
  let E3 = (En) => {
      let EX = DR.getBoundingClientRect();
      return [En.clientX - EX.left, En.clientY - EX.top];
    },
    E4 = null;
  function E5(En) {
    let EX = !E4;
    ((E4 = En),
      EX &&
        requestAnimationFrame(() => {
          let EL = E4;
          ((E4 = null), EL?.());
        }));
  }
  let E6 = (En) => D7(Zn(mU(En), m0.offset, m0.offset + m0.clock) - m0.offset);
  DR.addEventListener('contextmenu', (En) => En.preventDefault());
  let E7 = null;
  (DR.addEventListener('pointerleave', () => {
    E7 = null;
  }),
    DR.addEventListener('pointerdown', (En) => {
      if (!m0 || !m2 || mm?.kind === 'xf' || mm?.kind === 'slide') return;
      (r2(), DR.focus({ preventScroll: !0 }));
      try {
        DR.setPointerCapture(En.pointerId);
      } catch {}
      let [EX, EL] = E3(En),
        Eb = En.ctrlKey || En.metaKey;
      if (En.button === 2) {
        if ((En.preventDefault(), En.shiftKey)) {
          ((mm = { kind: 'cursor' }), Ek(EX, EL));
          return;
        }
        if (Eb) {
          EL >= ws && Sg(EX, EL);
          return;
        }
        rS(En.clientX, En.clientY);
        return;
      }
      if (En.button === 1) {
        (En.preventDefault(),
          (mm = { kind: Eb ? 'zoom' : 'pan', x0: EX, y0: EL, view: { ...m2 } }));
        return;
      }
      if (En.button !== 0) return;
      if (EL < ws) {
        ((mm = { kind: 'scrub' }), E6(EX));
        return;
      }
      let Ex = E2(EX, EL);
      if (En.altKey && Ex && Ex.kind !== 'handle') {
        Eb && Ex.kind !== 'pose'
          ? SK(Ex.c.id, En.shiftKey)
          : Ex.kind !== 'line' &&
            SU(new Set([Ex.kind === 'pose' ? Ex.f : mR(Ex.c.keys[Ex.j].u)]), En.shiftKey);
        return;
      }
      if (Eb) {
        mm = {
          kind: 'box',
          x0: EX,
          y0: EL,
          x1: EX,
          y1: EL,
          had: m8.slice(),
          subtract: !0,
          side: !0,
          extend: En.shiftKey,
        };
        return;
      }
      if (!Ex) {
        mm = { kind: 'box', x0: EX, y0: EL, x1: EX, y1: EL, had: En.shiftKey ? m8.slice() : [] };
        return;
      }
      if (Ex.kind === 'line') {
        ((mk = Ex.c.id), S6(), E1());
        return;
      }
      if (Ex.kind === 'handle') {
        let Eq = mR(Ex.c.keys[Ex.j].u),
          EP = { ch: Ex.c.id, f: Eq, side: Ex.side },
          EY = mW(EP.ch, Eq, EP.side);
        if (((mk = Ex.c.id), (m9 = { ch: EP.ch, f: Eq }), En.shiftKey)) {
          ((m8 = EY ? m8.filter((Ev) => !SR(Ev, EP)) : [...m8, EP]), S6(), Sm(), E1());
          return;
        }
        if (EY && m8.length > 1) {
          ((mm = { kind: 'press', x0: EX, y0: EL, alone: EP }), S6(), Sm(), E1());
          return;
        }
        ((m8 = [EP]),
          (mm = {
            kind: 'handle',
            c: Ex.c,
            f: Eq,
            side: Ex.side,
            orig: Ex.c.control.curve,
            moved: !1,
          }),
          S6(),
          Sm(),
          E1());
        return;
      }
      let Ey =
          Ex.kind === 'pose'
            ? { pose: Ex.p.id, f: Ex.f }
            : { ch: Ex.c.id, f: mR(Ex.c.keys[Ex.j].u) },
        EW = Ex.kind === 'pose' ? mP(Ey.pose, Ey.f) : my(Ey.ch, Ey.f);
      if (En.shiftKey) {
        ((m8 = EW
          ? m8.filter((Ev) => !(Ev.ch === Ey.ch && Ev.pose === Ey.pose && Ev.f === Ey.f))
          : [...m8, Ey]),
          Ey.ch && ((m9 = EW ? null : Ey), (mk = Ey.ch)),
          S6(),
          Sm(),
          E1());
        return;
      }
      (EW || ((m8 = [Ey]), mw.clear()),
        Ey.ch && ((m9 = Ey), (mk = Ey.ch)),
        (mm = { kind: 'press', x0: EX, y0: EL, alone: EW ? Ey : null }),
        S6(),
        Sm(),
        E1());
    }),
    DR.addEventListener('pointermove', (En) => {
      let [EX, EL] = E3(En);
      if (((E7 = [EX, EL]), !mm)) {
        if (!m0 || !m2) return;
        let Ex = EL < ws ? { kind: 'ruler' } : E2(EX, EL);
        DR.style.cursor = Ex
          ? Ex.kind === 'ruler'
            ? 'ew-resize'
            : Ex.kind === 'line'
              ? 'pointer'
              : Ex.kind === 'pose'
                ? 'ew-resize'
                : 'grab'
          : 'default';
        return;
      }
      let Eb = mm;
      if (!(Eb.kind === 'xf' || Eb.kind === 'slide')) {
        if (Eb.kind === 'handle' && En.buttons & 2) {
          E9();
          return;
        }
        if (Eb.kind === 'scrub') {
          E6(EX);
          return;
        }
        if (Eb.kind === 'cursor') {
          Ek(EX, EL);
          return;
        }
        if (Eb.kind === 'pan') {
          let Ey = ((EX - Eb.x0) / mS) * (Eb.view.t1 - Eb.view.t0),
            EW = ((EL - Eb.y0) / (mJ() - mO())) * (Eb.view.v1 - Eb.view.v0);
          ((m2 = {
            t0: Eb.view.t0 - Ey,
            t1: Eb.view.t1 - Ey,
            v0: Eb.view.v0 + EW,
            v1: Eb.view.v1 + EW,
          }),
            E1());
          return;
        }
        if (Eb.kind === 'zoom') {
          let Eq = Eb.view.t0 + (Eb.x0 / mS) * (Eb.view.t1 - Eb.view.t0),
            EP = Eb.view.v1 - ((Eb.y0 - mO()) / (mJ() - mO())) * (Eb.view.v1 - Eb.view.v0),
            EY = Zn(
              (Eb.view.t1 - Eb.view.t0) * Math.exp(-(EX - Eb.x0) * 0.01),
              4 / (m0.fps || 30),
              Math.max(20, (m0.duration || 1) * 6),
            ),
            Ev = Zn((Eb.view.v1 - Eb.view.v0) * Math.exp((EL - Eb.y0) * 0.01), 0.05, 20000),
            EB = EY / (Eb.view.t1 - Eb.view.t0),
            EG = Ev / (Eb.view.v1 - Eb.view.v0),
            Eg = Eq - (Eq - Eb.view.t0) * EB,
            EI = EP - (EP - Eb.view.v0) * EG;
          ((m2 = { t0: Eg, t1: Eg + EY, v0: EI, v1: EI + Ev }), E1());
          return;
        }
        if (Eb.kind === 'box') {
          ((Eb.x1 = EX), (Eb.y1 = EL), E1());
          return;
        }
        if (Eb.kind === 'handle') {
          let EN = mL(Eb.c.id),
            EM = EN ? EN.keys.findIndex((F5) => mR(F5.u) === Eb.f) : -1;
          if (EM < 0) return;
          let F0 = rN(EN, EM);
          if (
            !Eb.moved &&
            Math.hypot(
              EX - (Eb.side === 'out' ? F0.tipOut : F0.tipIn)?.[0],
              EL - (Eb.side === 'out' ? F0.tipOut : F0.tipIn)?.[1],
            ) < 2
          )
            return;
          Eb.moved = !0;
          let F1 =
              (Eb.side === 'out' ? Math.max(EX - F0.kx, 1) : Math.min(EX - F0.kx, -1)) /
              mA() /
              m0.clock,
            F2 = -(EL - F0.ky) / mX() / mN(EN) / F1,
            F3 = Math.abs(F1),
            F4 = En.altKey;
          E5(() => {
            mm === Eb &&
              SS(
                [EN.cid],
                () => wL(Eb.orig, me(Eb.f), mH(), EN.axis, Eb.side, F2, { apart: F4, len: F3 }),
                !0,
              );
          });
          return;
        }
        if (Eb.kind === 'press') {
          if (Math.hypot(EX - Eb.x0, EL - Eb.y0) < 3) return;
          (ED('move', [Eb.x0, Eb.y0], { release: !0 }), mm?.kind === 'xf' && EE(EX, EL, En));
        }
      }
    }));
  function E8(En) {
    let EX = mm;
    if (EX && !(EX.kind === 'xf' || EX.kind === 'slide')) {
      if (((E4 = null), (mm = null), EX.kind === 'box')) {
        let EL = Math.min(EX.x0, EX.x1),
          Eb = Math.max(EX.x0, EX.x1),
          Ex = Math.min(EX.y0, EX.y1),
          Ey = Math.max(EX.y0, EX.y1),
          EW = Eb - EL > 2 || Ey - Ex > 2;
        if (EX.side && !EW) {
          ST(mj(mU(EX.x0)) * (mH() - 1) < Ew() ? -1 : 1, EX.extend);
          return;
        }
        let Eq = [];
        if (EW) {
          for (let EP of rQ())
            for (let EY of EP.keys) {
              let Ev = mZ(mQ(EY.u)),
                EB = mK(mg(EP, EY.v));
              Ev >= EL && Ev <= Eb && EB >= Ex && EB <= Ey && Eq.push({ ch: EP.id, f: mR(EY.u) });
            }
          (m0.poses || []).forEach((EG, Eg) => {
            let EI = rM(Eg);
            if (!(EI < Ex || EI > Ey))
              for (let EN of EG.keys) {
                let EM = mZ(mQ(EN.u));
                EM >= EL && EM <= Eb && Eq.push({ pose: EG.id, f: mR(EN.u) });
              }
          });
        }
        if (EX.subtract) {
          Sz(Eq, { subtract: !0 });
          return;
        }
        ((m8 = [...EX.had.filter((EG) => !Eq.some((Eg) => SR(Eg, EG))), ...Eq]),
          EX.had.length || mw.clear(),
          (m9 = Eq.filter((EG) => EG.ch).pop() ?? (EX.had.length ? m9 : null)),
          m9 && (mk = m9.ch),
          S6(),
          Sm(),
          E1());
        return;
      }
      if (EX.kind === 'handle') {
        if (EX.moved) {
          let EG = mL(EX.c.id);
          EG && SS([EG.cid], (Eg) => Eg, !1);
        }
        return;
      }
      EX.kind === 'press' &&
        EX.alone &&
        m8.length > 1 &&
        ((m8 = [EX.alone]),
        EX.alone.ch && (m9 = { ch: EX.alone.ch, f: EX.alone.f }),
        S6(),
        Sm(),
        E1());
    }
  }
  (DR.addEventListener('pointerup', E8),
    DR.addEventListener('pointercancel', () => {
      mm?.kind === 'xf' ? EO(!1) : mm?.kind === 'handle' ? E9() : E8(null);
    }));
  function E9() {
    let En = mm;
    if (En?.kind !== 'handle') return !1;
    if (((E4 = null), (mm = null), En.moved)) {
      let EX = mL(En.c.id);
      EX && SS([EX.cid], () => En.orig, !1);
    }
    return (E1(), !0);
  }
  function Ek(En, EX) {
    (E6(En), (Dh = mT(EX)), Sm(), E1());
  }
  let Ew = () => (m0?.clock > 0 ? Zn(mC / m0.clock, 0, 1) * (mH() - 1) : 0),
    EV = { move: 'Move', rotate: 'Rotate', scale: 'Scale' };
  function ED(En, EX, { release: EL = !1, copy: Eb = !1 } = {}) {
    if (!m0 || !m2 || !EX) return !1;
    let Ex = SH(SC({ keysOnly: !Eb })),
      Ey = Eb
        ? []
        : mY()
            .filter((Ev) => Ev.side && !my(Ev.ch, Ev.f))
            .map((Ev) => {
              let EB = mL(Ev.ch),
                EG = EB?.keys.find((EM) => mR(EM.u) === Ev.f);
              if (!EG) return null;
              let Eg = Ev.side === 'out' ? 1 : -1,
                EI = Ev.side === 'out' ? EG.lenOut : EG.lenIn,
                EN = Ev.side === 'out' ? EG.tout : EG.tin;
              return {
                ch: Ev.ch,
                cid: EB.cid,
                axis: EB.axis,
                f: Ev.f,
                side: Ev.side,
                kv: mg(EB, EG.v),
                scale: mN(EB),
                tf: Ev.f + Eg * EI * (mH() - 1),
                tv: mg(EB, EG.v + Eg * EN * EI),
              };
            })
            .filter(Boolean),
      EW = En === 'rotate' || Eb ? [] : m8.filter((Ev) => Ev.pose).map((Ev) => ({ ...Ev }));
    if (!Ex.length && !EW.length && !Ey.length)
      return (D8(En === 'rotate' || Eb ? 'Pick keys on a curve first' : 'Pick keys first'), !1);
    let Eq = [...Ex.map((Ev) => Ev.f), ...EW.map((Ev) => Ev.f), ...Ey.map((Ev) => Ev.tf)],
      EP = [...Ex.map((Ev) => Ev.v), ...Ey.map((Ev) => Ev.tv)],
      EY =
        Dg === 'cursor'
          ? { f: Ew(), v: Dh }
          : {
              f: (Math.min(...Eq) + Math.max(...Eq)) / 2,
              v: EP.length ? (Math.min(...EP) + Math.max(...EP)) / 2 : Dh,
            };
    return (
      (mm = {
        kind: 'xf',
        mode: En,
        release: EL,
        copy: Eb,
        items: Ex,
        hands: Ey,
        poses: EW,
        pivot: EY,
        orig: new Map(
          [...Ex, ...Ey].map((Ev) => [Ev.cid, m0.controls.find((EB) => mM(EB) === Ev.cid).curve]),
        ),
        start: EX.slice(),
        last: EX.slice(),
        virt: EX.slice(),
        lock: null,
        typed: ['', ''],
        field: 0,
        snap: !1,
        sel0: m8.slice(),
        active0: m9,
        poseTo: new Map(),
        landed: null,
      }),
      window.addEventListener('pointermove', ES, !0),
      window.addEventListener('pointerdown', ES, !0),
      window.addEventListener('pointerup', ES, !0),
      window.addEventListener('contextmenu', Em, !0),
      window.addEventListener('keydown', EF, !0),
      (DR.style.cursor = En === 'move' ? 'move' : 'crosshair'),
      Ej(!0),
      !0
    );
  }
  let Em = (En) => {
    (En.preventDefault(), En.stopPropagation());
  };
  function ES(En) {
    let EX = mm;
    if (EX?.kind === 'xf') {
      if ((Em(En), En.type === 'pointermove')) {
        if (En.buttons & 2) {
          EO(!1);
          return;
        }
        let [EL, Eb] = E3(En);
        EE(EL, Eb, En);
        return;
      }
      if (En.type === 'pointerdown') {
        if (En.button === 2) {
          EO(!1);
          return;
        }
        if (En.button === 0) {
          EO(!0);
          return;
        }
        return;
      }
      En.type === 'pointerup' && EX.release && En.button === 0 && EO(!0);
    }
  }
  function EE(En, EX, EL) {
    let Eb = mm,
      Ex = EL?.shiftKey ? 0.1 : 1;
    ((Eb.virt = [Eb.virt[0] + (En - Eb.last[0]) * Ex, Eb.virt[1] + (EX - Eb.last[1]) * Ex]),
      (Eb.last = [En, EX]),
      (Eb.snap = !!(EL?.ctrlKey || EL?.metaKey)),
      E5(() => {
        mm === Eb && Ej(!0);
      }));
  }
  function EF(En) {
    let EX = mm;
    if (EX?.kind !== 'xf') return;
    let EL = En.key;
    if ((Em(En), EL === 'Escape')) {
      EO(!1);
      return;
    }
    if (EL === 'Enter' || EL === ' ') {
      EO(!0);
      return;
    }
    if (EL === 'Control' || EL === 'Meta') {
      ((EX.snap = !0), Ej(!0));
      return;
    }
    if ((EL === 'x' || EL === 'X' || EL === 'y' || EL === 'Y') && EX.mode !== 'rotate') {
      let Eb = EL.toLowerCase();
      ((EX.lock = EX.lock === Eb ? null : Eb), (EX.field = EX.lock === 'y' ? 1 : 0), Ej(!0));
      return;
    }
    if ('grsGRS'.includes(EL) && EL.length === 1) {
      let Ex = { g: 'move', r: 'rotate', s: 'scale' }[EL.toLowerCase()];
      if (Ex !== EX.mode) {
        let Ey = EX.last.slice(),
          EW = EX.sel0,
          Eq = EX.release,
          EP = EX.copy;
        (EO(!1), (m8 = EW), ED(Ex, Ey, { release: Eq, copy: EP }));
      }
      return;
    }
    if (EL === 'Tab') {
      (EX.mode === 'move' && !EX.lock && (EX.field = 1 - EX.field), Ej(!0));
      return;
    }
    if (EL === 'Backspace') {
      ((EX.typed[EX.field] = EX.typed[EX.field].slice(0, -1)), Ej(!0));
      return;
    }
    if (EL === '-') {
      let EY = EX.typed[EX.field];
      ((EX.typed[EX.field] = EY.startsWith('-') ? EY.slice(1) : '-' + EY), Ej(!0));
      return;
    }
    /^[0-9.]$/.test(EL) && ((EX.typed[EX.field] += EL), Ej(!0));
  }
  window.addEventListener('keyup', (En) => {
    mm?.kind === 'xf' && (En.key === 'Control' || En.key === 'Meta') && ((mm.snap = !1), Ej(!0));
  });
  let EC = (En) => (/[0-9]/.test(En) && Number.isFinite(Number(En)) ? Number(En) : null);
  function EH() {
    let EX = mm,
      EL = (mA() * m0.clock) / (mH() - 1),
      Eb = mX(),
      [Ex, Ey] = EX.start,
      [EW, Eq] = EX.virt,
      EP = EX.typed.map(EC),
      EY = EP.some((F0) => F0 != null),
      Ev = { mode: EX.mode, pivot: EX.pivot };
    if (EX.mode === 'move') {
      let F0 = (EW - Ex) / EL,
        F1 = -(Eq - Ey) / Eb;
      return (
        EY && ((F0 = EP[0] ?? 0), (F1 = EP[1] ?? 0)),
        EX.snap && !EY && (F1 = Math.round(F1 / ER()) * ER()),
        EX.lock === 'x' && (F1 = 0),
        EX.lock === 'y' && (F0 = 0),
        (Ev.df = Math.round(F0)),
        (Ev.dfRaw = F0),
        (Ev.dv = F1),
        Ev
      );
    }
    let EB = mZ(mQ(me(EX.pivot.f))),
      EG = mK(EX.pivot.v);
    if (EX.mode === 'rotate') {
      let F2 = Math.atan2(-(Ey - EG), Ex - EB),
        F3 = ((Math.atan2(-(Eq - EG), EW - EB) - F2) * 180) / Math.PI;
      return (
        (F3 = ((F3 + 540) % 360) - 180),
        EX.snap && !EY && (F3 = Math.round(F3 / 5) * 5),
        EP[0] != null && (F3 = EP[0]),
        (Ev.angle = (F3 * Math.PI) / 180),
        (Ev.deg = F3),
        Ev
      );
    }
    let Eg = Ex - EB,
      EI = Ey - EG,
      EN = Eg * Eg + EI * EI,
      EM = EN > 1 ? ((EW - EB) * Eg + (Eq - EG) * EI) / EN : 1;
    return (
      EX.snap && !EY && (EM = Math.round(EM * 10) / 10),
      EP[0] != null && (EM = EP[0]),
      (Ev.sx = EX.lock === 'y' ? 1 : EM),
      (Ev.sy = EX.lock === 'x' ? 1 : EM),
      (Ev.k = EM),
      Ev
    );
  }
  let ER = () => rB(mX(), 30, rG);
  function EQ(En) {
    if (En.mode === 'move')
      return { pt: (EW, Eq) => [EW + En.df, Eq + En.dv], lin: (EW, Eq) => [EW, Eq] };
    if (En.mode === 'scale')
      return {
        pt: (EW, Eq, EP) => [EP.f + (EW - EP.f) * En.sx, EP.v + (Eq - EP.v) * En.sy],
        lin: (EW, Eq) => [EW * En.sx, Eq * En.sy],
      };
    let EX = (mA() * m0.clock) / (mH() - 1),
      EL = mX(),
      Eb = Math.cos(En.angle),
      Ex = Math.sin(En.angle),
      Ey = (EW, Eq) => {
        let EP = EW * EX,
          EY = Eq * EL;
        return [(EP * Eb - EY * Ex) / EX, (EP * Ex + EY * Eb) / EL];
      };
    return {
      pt: (EW, Eq, EP) => {
        let [EY, Ev] = Ey(EW - EP.f, Eq - EP.v);
        return [EP.f + EY, EP.v + Ev];
      },
      lin: Ey,
    };
  }
  function Ej(EX) {
    let EL = mm;
    if (EL?.kind !== 'xf') return;
    let Eb = EH(),
      { pt: Ex, lin: Ey } = EQ(Eb),
      EW = mH(),
      Eq = Dg === 'individual' && Eb.mode !== 'move',
      EP = Eq ? (EG, Eg) => [EG, Eg] : (EG, Eg) => Ex(EG, Eg, EL.pivot),
      EY = [],
      Ev = new Map();
    for (let [EG, Eg] of EL.orig) {
      let EI = EL.items.filter((F2) => F2.cid === EG),
        { curve: EN, landed: EM } = wJ(
          Eg,
          Eb.mode === 'move' && !EL.copy ? EI.map((F2) => ({ ...F2, own: !1 })) : EI,
          { pt: EP, lin: Ey, frames: EW, copy: EL.copy },
        );
      EI.forEach((F2, F3) => Ev.set(F2.ch + '|' + F2.f, EM[F3]));
      let F0 = EN;
      for (let F2 of EL.hands.filter((F3) => F3.cid === EG)) {
        let [F3, F4] =
            Eb.mode === 'move'
              ? [F2.tf + Eb.dfRaw, F2.tv + Eb.dv]
              : Eq
                ? Ex(F2.tf, F2.tv, { f: F2.f, v: F2.kv })
                : EP(F2.tf, F2.tv),
          F5 = F2.side === 'out' ? Math.max(F3 - F2.f, 0.05) : Math.min(F3 - F2.f, -0.05),
          F6 = F5 / (EW - 1);
        F0 = wL(F0, me(F2.f), EW, F2.axis, F2.side, (F4 - F2.kv) / F2.scale / F6, {
          len: Math.abs(F6),
        });
      }
      let F1 = m0.controls.find((F7) => mM(F7) === EG);
      F1 && EY.push({ group: F1.group, key: F1.key, curve: F0 });
    }
    EL.poseTo = new Map(
      EL.poses.map((F7) => [
        F7.pose + '|' + F7.f,
        Eq ? F7.f : Zn(Math.round(EP(F7.f, 0)[0]), 0, EW - 1),
      ]),
    );
    let EB = EL.items.map((F7) => ({ ch: F7.ch, f: Ev.get(F7.ch + '|' + F7.f) ?? F7.f }));
    if (
      ((m8 = [
        ...EB,
        ...EL.hands.map((F7) => ({ ch: F7.ch, f: F7.f, side: F7.side })),
        ...EL.poses.map((F7) => ({ ...F7 })),
      ]),
      EL.active0?.ch)
    ) {
      let F7 = EL.items.findIndex((F8) => F8.ch === EL.active0.ch && F8.f === EL.active0.f);
      m9 = F7 >= 0 ? EB[F7] : null;
    }
    ((EL.landed = EB), (EL.st = Eb), Ez(Eb), EY.length ? D4(EY, { live: EX }) : E1());
  }
  function Ez(En) {
    let EX = mm,
      EL = EX.items[0] ?? EX.hands[0],
      Eb = (EL && !Dq && mL(EL.ch)?.unit) || '',
      Ex = (Eq) => (EX.typed[Eq] ? '[' + EX.typed[Eq] + (EX.field === Eq ? '|' : '') + ']' : ''),
      Ey =
        En.mode === 'move'
          ? 'Dx ' +
            (Ex(0) || En.df) +
            ' frames \u00B7 Dy ' +
            (Ex(1) || +En.dv.toFixed(2)) +
            (Eb ? ' ' + Eb : '')
          : En.mode === 'rotate'
            ? (Ex(0) || +En.deg.toFixed(1)) + '\u00B0'
            : '\u00D7 ' + (Ex(0) || +En.k.toFixed(3)),
      EW =
        EX.lock === 'x' ? ' \u00B7 time only (X)' : EX.lock === 'y' ? ' \u00B7 value only (Y)' : '';
    ((DM.textContent =
      '' +
      (EX.copy ? 'Duplicate \u00B7 ' : '') +
      EV[En.mode] +
      ' \u00B7 ' +
      Ey +
      EW +
      (EX.snap ? ' \u00B7 snapping (Ctrl)' : '') +
      ' \u2014 ' +
      (EX.release ? 'let go' : 'click or Enter') +
      ' to keep, Esc or right-click to cancel'),
      DM.classList.add('is-busy'));
  }
  function EO(En) {
    let EX = mm;
    if (EX?.kind === 'xf') {
      if (
        ((E4 = null),
        window.removeEventListener('pointermove', ES, !0),
        window.removeEventListener('pointerdown', ES, !0),
        window.removeEventListener('pointerup', ES, !0),
        window.removeEventListener('keydown', EF, !0),
        setTimeout(() => window.removeEventListener('contextmenu', Em, !0), 600),
        (DM.textContent = DN),
        DM.classList.remove('is-busy'),
        (DR.style.cursor = 'default'),
        En)
      ) {
        (Ej(!1), (mm = null));
        let EL = new Map();
        for (let Eb of EX.poses) {
          let Ex = EX.poseTo.get(Eb.pose + '|' + Eb.f) ?? Eb.f;
          Ex !== Eb.f &&
            (EL.has(Eb.pose) || EL.set(Eb.pose, []),
            EL.get(Eb.pose).push({ from: me(Eb.f), to: me(Ex) }));
        }
        m8 = m8.map((Ey) =>
          Ey.pose ? { pose: Ey.pose, f: EX.poseTo.get(Ey.pose + '|' + Ey.f) ?? Ey.f } : Ey,
        );
        for (let [Ey, EW] of EL) D5(Ey, EW);
        EZ();
      } else {
        ((mm = null), (m8 = EX.sel0), (m9 = EX.active0));
        let Eq = [...EX.orig]
          .map(([EP, EY]) => {
            let Ev = m0.controls.find((EB) => mM(EB) === EP);
            return Ev ? { group: Ev.group, key: Ev.key, curve: EY } : null;
          })
          .filter(Boolean);
        Eq.length && D4(Eq, { live: !1 });
      }
      (S6(), Sm(), E1());
    }
  }
  (DR.addEventListener('dblclick', (En) => {
    if (!m0 || !m2) return;
    let [EX, EL] = E3(En),
      Eb = EL < ws ? null : E2(EX, EL);
    if (Eb?.kind !== 'line') return;
    let Ex = mR(Zn(Eb.u, 0, 1));
    ((m8 = [{ ch: Eb.c.id, f: Ex }]),
      (m9 = m8[0]),
      (mk = Eb.c.id),
      SS([Eb.c.cid], (Ey) => wH(Ey, me(Ex), mH(), Eb.c.axis)));
  }),
    DR.addEventListener(
      'wheel',
      (En) => {
        if (!m0 || !m2) return;
        En.preventDefault();
        let [EX, EL] = E3(En),
          Eb = En.deltaMode === 1 ? 33 : En.deltaMode === 2 ? 400 : 1,
          Ex = En.deltaX * Eb,
          Ey = En.deltaY * Eb,
          EW = (Ev) => {
            let EB = Ev * 0.001 * (m2.t1 - m2.t0);
            ((m2.t0 += EB), (m2.t1 += EB));
          };
        if (En.shiftKey) {
          let Ev = (Ey || Ex) * 0.001 * (m2.v1 - m2.v0);
          ((m2.v0 -= Ev), (m2.v1 -= Ev), E1());
          return;
        }
        if (En.ctrlKey || En.metaKey) {
          (EW(Ey || Ex), E1());
          return;
        }
        if (Math.abs(Ex) > Math.abs(Ey)) {
          (EW(Ex), E1());
          return;
        }
        let Eq = Math.exp(Ey * 0.0015),
          EP = mU(EX),
          EY = mT(EL);
        {
          let EB = Zn(
              (m2.t1 - m2.t0) * Eq,
              4 / (m0.fps || 30),
              Math.max(20, (m0.duration || 1) * 6),
            ),
            EG = EB / (m2.t1 - m2.t0);
          ((m2.t0 = EP - (EP - m2.t0) * EG), (m2.t1 = m2.t0 + EB));
        }
        {
          let Eg = Zn((m2.v1 - m2.v0) * Eq, 0.05, 20000),
            EI = Eg / (m2.v1 - m2.v0);
          ((m2.v0 = EY - (EY - m2.v0) * EI), (m2.v1 = m2.v0 + Eg));
        }
        E1();
      },
      { passive: !1 },
    ));
  function EJ() {
    let En = DH.getBoundingClientRect(),
      EX = Math.max(0, Math.floor(En.width)),
      EL = Math.max(0, Math.floor(En.height));
    !EX ||
      !EL ||
      ((mF = Math.min(2, window.devicePixelRatio || 1)),
      !(EX === mS && EL === mE && DR.width === Math.round(EX * mF)) &&
        ((mS = EX),
        (mE = EL),
        (DR.width = Math.round(EX * mF)),
        (DR.height = Math.round(EL * mF)),
        (DR.style.width = EX + 'px'),
        (DR.style.height = EL + 'px'),
        m0 && !m2 && m1.length && S4(!1),
        E1()));
  }
  new ResizeObserver(EJ).observe(DH);
  function EZ() {
    if (m2) {
      let En = 1 / 0,
        EX = -1 / 0;
      for (let EL of mx()) {
        let Eb = m7.get(EL.id);
        for (let Ex of EL.keys) {
          let Ey = mR(Ex.u),
            EW = mg(EL, Ex.v);
          Eb?.get(Ey) !== EW && ((En = Math.min(En, EW)), (EX = Math.max(EX, EW)));
        }
      }
      if (EX >= En && (En < m2.v0 || EX > m2.v1)) {
        let Eq = Math.min(m2.v0, En),
          EP = Math.max(m2.v1, EX),
          EY = (EP - Eq) * 0.12;
        (En < m2.v0 && (m2.v0 = Eq - EY), EX > m2.v1 && (m2.v1 = EP + EY));
      }
    }
    m7 = new Map(m1.map((Ev) => [Ev.id, new Map(Ev.keys.map((EB) => [mR(EB.u), mg(Ev, EB.v)]))]));
  }
  function EU(En) {
    if (((m0 = En || null), !m0)) {
      ((m1 = []), E1());
      return;
    }
    mC = m0.time || 0;
    {
      let Ex = new Set((m0.controls || []).map(mM));
      for (let Ey of [...m4.keys()]) Ex.has(Ey) || m4.delete(Ey);
    }
    S1();
    let EX = new Set(m1.map((EW) => EW.id));
    {
      let EW = new Set(
        (m0.controls || []).flatMap((Eq) => Eq.axes.map((EP) => mM(Eq) + '|' + (EP.axis ?? ''))),
      );
      for (let Eq of [...m3]) EW.has(Eq) || m3.delete(Eq);
    }
    (mm ||
      ((m8 = m8.filter((EP) =>
        EP.ch
          ? mL(EP.ch)?.keys.some((EY) => mR(EY.u) === EP.f)
          : m0.poses?.some((EY) => EY.id === EP.pose && EY.keys.some((Ev) => mR(Ev.u) === EP.f)),
      )),
      m9 && !SD(m9) && (m9 = mY().pop() ?? null)),
      mk && !EX.has(mk) && (mk = null));
    let EL = new Set(m1.map((EP) => EP.cid)),
      Eb = [...EL].some((EP) => !m6.has(EP));
    ((!m2 || ![...m6].some((EP) => EL.has(EP))) &&
    !mm &&
    mS &&
    (m1.length || (m0.poses || []).length)
      ? S4(!1)
      : Eb && !mm && m2 && Sw(m1.filter((EP) => !m6.has(EP.cid))),
      (m6 = EL),
      mm || EZ(),
      S9(),
      S6(),
      Sm(),
      EJ(),
      E1());
  }
  return {
    render: EU,
    tick(En) {
      ((mC = En), m0 && m2 && mS && E1());
    },
    key(En) {
      if (!m0) return !1;
      let EX = En.ctrlKey || En.metaKey,
        EL = En.key;
      if (mm?.kind === 'xf' || mm?.kind === 'slide') return !0;
      if (EL === 'Escape' && mm?.kind === 'handle') return (E9(), !0);
      let Eb = En.altKey,
        Ex = En.shiftKey,
        Ey = EL.length === 1 ? EL.toLowerCase() : EL,
        EW = (EP = !1, EY = !1, Ev = !1) => EX === EP && Eb === EY && Ex === Ev,
        Eq = (EP, EY) => {
          let [Ev, EB] = r6();
          return (r5(Ev, EB, EP, EY), !0);
        };
      return EW() && E7 && /^[grs]$/.test(Ey) && !mm
        ? (ED({ g: 'move', r: 'rotate', s: 'scale' }[Ey], E7), !0)
        : EW(!1, !1, !0) && Ey === 'd' && !mm
          ? (E7 ? ED('move', E7, { copy: !0 }) : D8('Shift+D with the pointer over the graph'), !0)
          : En.code === 'NumpadDecimal' && !EX && !Eb
            ? (S4(mY().length > 0), E1(), !0)
            : EX && !Eb && (En.code === 'NumpadAdd' || En.code === 'NumpadSubtract')
              ? (SX(En.code === 'NumpadAdd'), !0)
              : !EX && !Eb && (EL === 'Delete' || EL === 'Backspace')
                ? (SI(), !0)
                : (EW() || EW(!0)) && Ey === 'a'
                  ? (SO(), !0)
                  : EW(!1, !0) && Ey === 'a'
                    ? (SJ(), !0)
                    : EW(!0) && Ey === 'i'
                      ? (SZ(), !0)
                      : EW() && (En.code === 'BracketLeft' || En.code === 'BracketRight')
                        ? (ST(En.code === 'BracketLeft' ? -1 : 1), !0)
                        : EW() && Ey === 'l'
                          ? (SA(), !0)
                          : EW(!0) && Ey === 'k'
                            ? (SU(new Set([Math.round(Ew())])), !0)
                            : EW() && Ey === 'h'
                              ? (SL('picked'), !0)
                              : EW(!1, !1, !0) && Ey === 'h'
                                ? (SL('others'), !0)
                                : EW(!1, !0) && Ey === 'h'
                                  ? (SL('none'), !0)
                                  : EW(!0) && Ey === 'g'
                                    ? (Sb(), !0)
                                    : EW() && Ey === 't'
                                      ? Eq('Interpolation', r8())
                                      : EW(!0) && Ey === 'e'
                                        ? Eq('Easing', r9())
                                        : EW() && Ey === 'v'
                                          ? Eq('Handle type', rw())
                                          : EW() && Ey === 'i'
                                            ? Eq('Insert Keyframes', rm())
                                            : EW() && Ey === 'x'
                                              ? Eq('Delete', [
                                                  {
                                                    label: 'Keys',
                                                    items: [
                                                      {
                                                        text: 'Delete Keyframes',
                                                        off: !m8.length,
                                                        run: SI,
                                                      },
                                                      {
                                                        text: 'Clean Keyframes',
                                                        tip: 'The picked keys that add nothing to the curve taken out',
                                                        off: r7(),
                                                        run: () => rA(!1),
                                                      },
                                                      {
                                                        text: 'Clean Channels',
                                                        tip: 'Every key of the picked curves that adds nothing taken out \u2014 and a curve left at its default, gone',
                                                        run: () => rA(!0),
                                                      },
                                                    ],
                                                  },
                                                ])
                                              : EW(!1, !0) && Ey === 's'
                                                ? Eq('Smooth', rW())
                                                : EW(!1, !0) && Ey === 'd'
                                                  ? Eq('Blend', ry())
                                                  : EW(!1, !0) && Ey === 'o'
                                                    ? (r7()
                                                        ? D8('Pick keys on a curve first')
                                                        : rL(),
                                                      !0)
                                                    : EW(!1, !0, !0) && Ey === 'o'
                                                      ? (r7()
                                                          ? D8('Pick keys on a curve first')
                                                          : rX(),
                                                        !0)
                                                      : EW(!0) && Ey === 'f' && E7
                                                        ? (DS.focus(), DS.select(), !0)
                                                        : EW(!1, !1, !0) && Ey === 's'
                                                          ? Eq('Snap', rV())
                                                          : EW(!0) && Ey === 'm'
                                                            ? Eq('Mirror', rD())
                                                            : EX && !Eb && !Ex && Ey === 'c'
                                                              ? window.getSelection?.()?.toString()
                                                                ? !1
                                                                : mY().length
                                                                  ? (SM(), !0)
                                                                  : ((SN = null), !1)
                                                              : EX &&
                                                                  !Eb &&
                                                                  Ey === 'v' &&
                                                                  SN?.length
                                                                ? (r0(Ex), !0)
                                                                : EW() && EL === 'Escape'
                                                                  ? (m8.length &&
                                                                      ((m8 = []),
                                                                      (m9 = null),
                                                                      Sm(),
                                                                      E1()),
                                                                    !0)
                                                                  : !EX && EL === 'Home'
                                                                    ? (S4(!1), E1(), !0)
                                                                    : EW() && Ey === 'f'
                                                                      ? (S4(mY().length > 0),
                                                                        E1(),
                                                                        !0)
                                                                      : !1;
    },
    zoom(En) {
      if (!m2) return;
      let EX = (m2.t0 + m2.t1) / 2,
        EL = Zn((m2.t1 - m2.t0) / En, 4 / (m0?.fps || 30), Math.max(20, (m0?.duration || 1) * 6));
      ((m2.t0 = EX - EL / 2), (m2.t1 = EX + EL / 2), E1());
    },
    fit() {
      (S4(!1), E1());
    },
    picked() {
      let En = [];
      for (let EX of m8) {
        if (EX.pose) {
          En.push({ group: 'pose', key: EX.pose, frame: EX.f });
          continue;
        }
        let EL = mL(EX.ch);
        EL &&
          !En.some(
            (Eb) => Eb.group === EL.control.group && Eb.key === EL.control.key && Eb.frame === EX.f,
          ) &&
          En.push({ group: EL.control.group, key: EL.control.key, frame: EX.f });
      }
      return En;
    },
    pick(En) {
      m8 = [];
      for (let EX of En || []) {
        if (EX.group === 'pose') {
          m8.push({ pose: EX.key, f: EX.frame });
          continue;
        }
        for (let EL of m1)
          EL.control.group === EX.group &&
            EL.control.key === EX.key &&
            !m3.has(EL.id) &&
            mb(EL) &&
            !mV.has(EL.id) &&
            EL.keys.some((Eb) => mR(Eb.u) === EX.frame) &&
            m8.push({ ch: EL.id, f: EX.frame });
      }
      ((m9 = mY().pop() ?? null), m9 && (mk = m9.ch), m0 && (S6(), Sm(), E1()));
    },
    controls() {
      let En = [],
        EX = (EL, Eb) => {
          En.some((Ex) => Ex.group === EL && Ex.key === Eb) || En.push({ group: EL, key: Eb });
        };
      for (let EL of m8)
        if (EL.pose) EX('pose', EL.pose);
        else {
          let Eb = mL(EL.ch);
          Eb && !Eb.control.selfKey && EX(Eb.control.group, Eb.control.key);
        }
      if (!En.length && mk) {
        let Ex = mL(mk);
        Ex && !Ex.control.selfKey && EX(Ex.control.group, Ex.control.key);
      }
      return En;
    },
    keyHere() {
      if (!m0 || !(m0.clock > 0)) return [];
      let En = new Set();
      for (let EL of mY()) {
        let Eb = mL(EL.ch);
        Eb?.control.selfKey && En.add(Eb.control);
      }
      if (!En.size && mk) {
        let Ex = mL(mk);
        Ex?.control.selfKey && En.add(Ex.control);
      }
      if (!En.size) return [];
      let EX = Zn(mC / m0.clock, 0, 1);
      return (SS([...En].map(mM), (Ey) => wH(Ey, EX, mH())), [...En].map((Ey) => Ey.label));
    },
  };
}
var fo = 168,
  qd = 140,
  kp = 'cgstuff.library.seqHeight',
  vp = 'cgstuff.library.graphHeight',
  zd = !0,
  _p = 64,
  xp = 0.3,
  oa = 10;
function Kd({
  mount: D3,
  player: D4,
  model: D5,
  togglePlay: D6,
  fmt: D7 = (r1) => r1.toFixed(2) + 's',
  body: D8 = () => os,
  onEdit: D9 = () => {},
  onProps: Dk = () => {},
  onMoveTrack: Dw = () => {},
  onRange: DV = () => {},
  onPlaySequence: DD = () => {},
  onClear: Dm = () => {},
  onDelete: DS = () => {},
  onSplit: DE = () => null,
  onDuplicate: DF = () => null,
  onCopyTo: DC = () => null,
  onCopy: DH = () => !1,
  onPaste: De = async () => [],
  canPaste: DR = () => !1,
  onMoveMany: DQ = () => {},
  onDeleteMany: Dj = () => {},
  onDuplicateMany: Dz = () => [],
  onSplitMany: DO = () => [],
  onTrack: DJ = () => {},
  onAdjust: DZ = () => {},
  onIk: DU = () => {},
  onKeyProps: DK = () => {},
  onSetKey: DT = () => null,
  onPose: DA = () => {},
  onCopyKeys: DX = () => 0,
  onAdvanced: DL = () => {},
  onCurves: Db = () => {},
  onClose: Dx = () => {},
}) {
  let Dy = 1,
    DW = 100,
    Dq = { duration: 0, fps: 30, tracks: [] },
    DP = (r1, r2, r3) => {
      let r4 = document.createElement(r1);
      return (r2 && (r4.className = r2), r3 != null && (r4.textContent = r3), r4);
    };
  D3.innerHTML = '';
  let DY = DP('div', 'lib-seq__grip');
  ((DY.title = 'Drag to resize, or use Up and Down'),
    DY.setAttribute('role', 'separator'),
    DY.setAttribute('aria-label', 'Timeline height'),
    DY.setAttribute('aria-orientation', 'horizontal'),
    DY.setAttribute('aria-valuemin', String(qd)),
    (DY.tabIndex = 0),
    D3.appendChild(DY));
  let Dv = DP('div', 'lib-seq__bar'),
    DB = DP('button', 'lib-btn lib-btn--play', '\u25B6');
  ((DB.type = 'button'), DB.addEventListener('click', () => D6()));
  let DG = DP('span', 'lib-seq__time', ''),
    Dg = DP('div', 'lib-seq__slot'),
    DI = DP('span', 'lib-seq__spacer'),
    Dh = (r1, r2, r3) => {
      let r4 = DP('button', 'lib-btn lib-btn--sm', r1);
      return ((r4.type = 'button'), (r4.title = r2), r4.addEventListener('click', r3), r4);
    },
    DN = Dh(
      'Advanced',
      'Advanced \u2014 keyframes: \u25C6 on each Adjust slider, K keys the selected lane, \u2191 \u2193 jump between keys',
      () => DL(!Dq.advanced),
    );
  DN.classList.add('lib-seq__adv');
  let DM = Dh(
      '\u25C2\u25C6',
      'Previous key (\u2191) \u2014 of the selected lanes, or of every lane',
      () => SC(-1),
    ),
    m0 = Dh(
      '\u25C6\u25B8',
      'Next key (\u2193) \u2014 of the selected lanes, or of every lane',
      () => SC(1),
    );
  (DM.classList.add('lib-seq__jump'), m0.classList.add('lib-seq__jump'));
  let m1 = Dh('Strips', 'The timeline: clips, bands and keys', () => mv('strips')),
    m2 = Dh(
      'Graph',
      'The keys as curves \u2014 drag a key, or its handles, to shape how a control moves',
      () => mv('graph'),
    );
  (m1.classList.add('lib-seq__viewopt'), m2.classList.add('lib-seq__viewopt'));
  let m3 = DP('div', 'lib-seq__view');
  (m3.setAttribute('role', 'group'),
    m3.setAttribute('aria-label', 'What the timeline shows'),
    m3.append(m1, m2));
  let m4 = Dh('\u2212', 'Zoom out', () => {
      mE === 'graph' ? mC.zoom(1 / 1.5) : mM(Dy / 1.5);
    }),
    m5 = Dh('Fit', 'Fit the whole timeline', () => {
      mE === 'graph' ? mC.fit() : ((mg = null), mM(1));
    }),
    m6 = Dh('+', 'Zoom in', () => {
      mE === 'graph' ? mC.zoom(1.5) : mM(Dy * 1.5);
    }),
    m7 = Dh('\u2715', 'Leave strips', () => {
      (SA(), Dx());
    }),
    m8 = DP('div', 'lib-seq__preview'),
    m9 = DP('div', 'lib-seq__range'),
    mk = DP('span', 'lib-seq__toast');
  mk.hidden = !0;
  let mw = null,
    mV = (r1) => {
      ((mk.textContent = r1),
        (mk.hidden = !1),
        clearTimeout(mw),
        (mw = setTimeout(() => {
          mk.hidden = !0;
        }, 1800)));
    };
  (Dv.append(DB, DM, m0, DG, mk, m8, m9, Dg, DI, ...(zd ? [m3] : []), DN, m4, m5, m6, m7),
    D3.appendChild(Dv));
  let mD = DP('div', 'lib-seq__scroll'),
    mm = DP('div', 'lib-seq__content');
  (mD.appendChild(mm), D3.appendChild(mD));
  let mS = DP('div', 'lib-seq__graph');
  ((mS.hidden = !0), D3.appendChild(mS));
  let mE = 'strips',
    mF = !1,
    mC = Dd({
      mount: mS,
      onCurves: (r1, r2) => Db(r1, r2),
      onPoseMove: (r1, r2) => {
        let r3 = Dq.clock ?? Dq.duration,
          r4 = Dq.offset || 0;
        DQ(
          r2.map((r5) => ({
            edit: { kind: 'key', group: 'pose', key: r1, u: r5.from, off: r4 },
            start: r4 + r5.to * r3,
            end: r4 + r5.to * r3,
          })),
        );
      },
      onPoseDelete: (r1, r2) =>
        Dj(r2.map((r3) => ({ kind: 'key', group: 'pose', key: r1, u: r3 }))),
      onSeek: (r1) => {
        (Dq.hasSequence && Dq.playing === !1 && DD(),
          D4.seek(Math.min(Dq.clock ?? Dq.duration, Math.max(0, r1))));
      },
      onHint: (r1) => mV(r1),
      onMute: (r1, r2) => {
        let r3 = r1 === 'bone' ? 'pose' : r1,
          r4 = r1 === 'bone' ? r2.slice(0, r2.indexOf(':')) : r2,
          r5 = Dq.tracks.find((r6) => r6.head?.kind === r3 && r6.head.key === r4)?.head;
        if (!r5) {
          mV('That control has no lane to mute');
          return;
        }
        ((r3 === 'ik' ? DU : r3 === 'pose' ? DA : DZ)(r5.key, { mute: !r5.mute }),
          mV(r5.mute ? 'Unmuted' : 'Muted'));
      },
    }),
    mt = DP('div', 'lib-seq__playhead'),
    mH = DP('div', 'lib-seq__readout'),
    me = null,
    mR = [],
    mQ = () => [...mR, ...(me ? [me] : [])],
    mj = (r1) => !!r1 && mQ().some((r2) => mW(r2, r1)),
    mz = () => mQ().filter((r1) => r1.kind === 'layer'),
    mO = (r1) => r1?.kind === 'adjust' || r1?.kind === 'ik',
    mJ = (r1) => r1?.kind === 'key',
    mZ = (r1) => mO(r1) || mJ(r1),
    mU = () => mQ().filter(mO),
    mK = () => mQ().filter(mJ);
  function mT(r1) {
    let r2 = [];
    for (let r3 of r1) r3 && !r2.some((r4) => mW(r4, r3)) && r2.push(r3);
    ((me = r2.length ? r2[r2.length - 1] : null), (mR = r2.slice(0, -1)));
  }
  function mA(r1) {
    mT(r1);
    for (let r2 of mm.querySelectorAll('.lib-seq__strip.is-selected'))
      r2.classList.remove('is-selected');
    for (let r3 of mm.querySelectorAll('.lib-seq__strip'))
      r3.__edit && mj(r3.__edit) && r3.classList.add('is-selected');
  }
  let mX = (r1) => (mj(r1) ? mQ().filter((r2) => !mW(r2, r1)) : [...mQ(), r1]),
    mL = !1,
    mb = !1,
    mx = null,
    my = null,
    mW = (r1, r2) =>
      r1 &&
      r2 &&
      r1.kind === r2.kind &&
      r1.key === r2.key &&
      (r1.uid != null && r2.uid != null ? r1.uid === r2.uid : r1.index === r2.index),
    mq = () => (mE === 'graph' ? vp : kp);
  function mP(r1) {
    let r2 = Math.max(qd, Math.round(window.innerHeight * (mE === 'graph' ? 0.8 : 0.6))),
      r3 = Math.min(r2, Math.max(qd, Math.round(r1)));
    D3.style.height = r3 + 'px';
    DY.setAttribute('aria-valuenow', String(r3));
    DY.setAttribute('aria-valuemax', String(r2));
    try {
      localStorage.setItem(mq(), String(r3));
    } catch {}
  }
  function mY() {
    let r1 = mE === 'graph' ? 420 : 290;
    try {
      let r2 = Number(localStorage.getItem(mq()));
      mP(r2 > 0 ? r2 : r1);
    } catch {
      mP(r1);
    }
  }
  mY();
  function mv(r1, { quiet: r2 = !1 } = {}) {
    r1 = zd && r1 === 'graph' ? 'graph' : 'strips';
    let r3 = mE,
      r4 =
        r3 === r1
          ? null
          : r3 === 'graph'
            ? mC.picked()
            : mK().map((r5) => ({ group: r5.group || 'adjust', key: r5.key, frame: r5.uid }));
    ((mE = r1),
      SA(),
      (mD.hidden = mE === 'graph'),
      (mS.hidden = mE !== 'graph'),
      D3.classList.toggle('is-graph', mE === 'graph'));
    for (let [r5, r6] of [
      [m1, 'strips'],
      [m2, 'graph'],
    ])
      (r5.classList.toggle('is-on', mE === r6), r5.setAttribute('aria-pressed', String(mE === r6)));
    if ((mY(), Sy(), r4)) {
      if (mE === 'graph') mC.pick(r4);
      else {
        let r7 = Dq.tracks
          .flatMap((r8) => r8.strips)
          .map((r8) => r8.edit)
          .filter(mJ);
        mA(
          r4
            .map((r8) =>
              r7.find(
                (r9) =>
                  (r9.group || 'adjust') === r8.group && r9.key === r8.key && r9.uid === r8.frame,
              ),
            )
            .filter(Boolean),
        );
      }
    }
    !r2 && !D3.hidden && window.dispatchEvent(new Event('resize'));
  }
  DY.addEventListener('pointerdown', (r1) => {
    (r1.preventDefault(), DY.setPointerCapture(r1.pointerId));
    let r2 = r1.clientY,
      r3 = D3.getBoundingClientRect().height,
      r4 = (r6) => mP(r3 + (r2 - r6.clientY)),
      r5 = () => {
        (DY.removeEventListener('pointermove', r4),
          DY.removeEventListener('lostpointercapture', r5),
          window.dispatchEvent(new Event('resize')));
      };
    (DY.addEventListener('pointermove', r4), DY.addEventListener('lostpointercapture', r5));
  });
  DY.addEventListener('keydown', (event) => {
    if (!['ArrowUp', 'ArrowDown', 'Home'].includes(event.key)) return;
    event.preventDefault();
    event.stopPropagation();
    mP(event.key === 'Home' ? 280 : D3.clientHeight + (event.key === 'ArrowUp' ? 24 : -24));
    window.dispatchEvent(new Event('resize'));
  });
  let mB = () => Dq.duration * (1 + xp);
  function mG() {
    let r1 = Math.max(100, mD.clientWidth - fo - 24);
    return Dq.duration > 0 ? r1 / mB() : 100;
  }
  let mg = null,
    mI = 0,
    mN = null;
  function mM(r1) {
    ((Dy = Math.min(40, Math.max(1, r1))), Sy());
  }
  function S0() {
    let r1 = Dq.fps || 30;
    for (let r2 of [1, 2, 5, 10, 15, 30, 60, 90, 150, 300, 600])
      if ((r2 / r1) * DW >= _p) return r2;
    return 900;
  }
  function S1(r1) {
    let r2 = DP('div', 'lib-seq__row lib-seq__row--ruler');
    r2.appendChild(DP('div', 'lib-seq__head'));
    let r3 = DP('div', 'lib-seq__lane lib-seq__lane--ruler');
    r3.style.width = r1 + 'px';
    let r4 = Dq.fps || 30,
      r5 = S0(),
      r6 = Math.round(mB() * r4);
    for (let r8 = 0; r8 <= r6; r8 += r5) {
      let r9 = DP('span', 'lib-seq__tick', String(r8 + 1));
      ((r9.style.left = (r8 / r4) * DW + 'px'), r3.appendChild(r9));
    }
    let r7 = (rk) => {
      let rw = rk.clientX - r3.getBoundingClientRect().left;
      Dq.hasSequence && Dq.playing === !1 && DD();
      let rV = Dq.clock ?? Dq.duration;
      D4.seek(Math.min(rV, Math.max(0, rw / DW - (Dq.offset || 0))));
    };
    return (
      r3.addEventListener('pointerdown', (rk) => {
        (r3.setPointerCapture(rk.pointerId), r7(rk));
        let rw = (rD) => r7(rD),
          rV = () => {
            (r3.removeEventListener('pointermove', rw), r3.removeEventListener('pointerup', rV));
          };
        (r3.addEventListener('pointermove', rw), r3.addEventListener('pointerup', rV));
      }),
      Dq.hasSequence &&
        (r3.appendChild(S2('start', Dq.range ? Dq.range.start : 0)),
        r3.appendChild(S2('end', Dq.range ? Dq.range.end : Dq.duration))),
      r2.appendChild(r3),
      r2
    );
  }
  function S2(r1, r2) {
    let r3 = DP('div', 'lib-seq__rhandle lib-seq__rhandle--' + r1 + (Dq.range ? ' is-manual' : ''));
    return (
      (r3.style.left = r2 * DW + 'px'),
      (r3.title = Dq.range
        ? "Drag to move the range's " + r1
        : 'Drag to set the range by hand \u2014 Range switches to Manual'),
      r3.addEventListener('pointerdown', (r4) => S3(r4, r1, r3)),
      r3
    );
  }
  function S3(r1, r2, r3) {
    if (r1.button !== 0) return;
    (r1.preventDefault(), r1.stopPropagation());
    let r4 = Dq.fps || 30,
      r5 = 1 / r4,
      r6 = r3.parentElement,
      r7 = { start: Dq.range ? Dq.range.start : 0, end: Dq.range ? Dq.range.end : Dq.duration },
      r8 = { ...r7 },
      r9 = S8(null);
    ((mL = !0), r3.classList.add('is-dragging'), mm.appendChild(mH));
    let rk = (rS) => {
        let rE = Math.max(
            0,
            Math.round((rS.clientX - r6.getBoundingClientRect().left) / DW / r5) * r5,
          ),
          rF = null;
        if (!rS.altKey) {
          let rt = null;
          for (let rH of r9) {
            let re = Math.abs(rH - rE) * DW;
            re <= oa && (!rt || re < rt.d) && (rt = { c: rH, d: re });
          }
          rt && ((rE = rt.c), (rF = rt.c));
        }
        r2 === 'start'
          ? (r8.start = Math.min(rE, r8.end - r5))
          : (r8.end = Math.max(rE, r8.start + r5));
        let rC = r2 === 'start' ? r8.start : r8.end;
        ((r3.style.left = rC * DW + 'px'),
          mx && ((mx.style.width = r8.start * DW + 'px'), (mx.hidden = r8.start <= 1e-9)),
          my && (my.style.left = fo + r8.end * DW + 'px'),
          (mH.textContent =
            r2 +
            ' ' +
            S5(rC) +
            '  \u00B7  ' +
            (Math.round((r8.end - r8.start) * r4) + 1) +
            ' frames'),
          (mH.style.left = fo + rC * DW + 'px'),
          (mH.style.top = mD.scrollTop + 24 + 'px'),
          rF != null
            ? ((S9.style.left = fo + rF * DW + 'px'), S9.isConnected || mm.appendChild(S9))
            : S9.remove());
      },
      rw = !1,
      rV = (rS) => {
        if (rS.pointerId === r1.pointerId) {
          if (!(rS.buttons & 1)) {
            rm();
            return;
          }
          rk(rS);
        }
      },
      rD = (rS) => {
        rS.pointerId === r1.pointerId && rm();
      };
    function rm() {
      if (rw) return;
      ((rw = !0),
        window.removeEventListener('pointermove', rV),
        window.removeEventListener('pointerup', rD),
        window.removeEventListener('pointercancel', rD),
        mH.remove(),
        S9.remove(),
        (mL = !1),
        (mb = !1),
        Math.abs(r8.start - r7.start) > 1e-9 || Math.abs(r8.end - r7.end) > 1e-9
          ? DV({ start: r8.start, end: r8.end })
          : Sy());
    }
    (window.addEventListener('pointermove', rV),
      window.addEventListener('pointerup', rD),
      window.addEventListener('pointercancel', rD));
  }
  let S4 = 10,
    S5 = (r1) => Math.round(r1 * (Dq.fps || 30)) + 1;
  function S6() {
    let r1 = document.activeElement;
    r1 &&
      r1 !== document.body &&
      D3.contains(r1) &&
      /^(INPUT|SELECT|TEXTAREA|BUTTON)$/.test(r1.tagName) &&
      r1.blur();
  }
  function S7(r1, r2, r3) {
    if (r1.button !== 0) return;
    (S6(), r1.preventDefault(), r1.stopPropagation());
    let r4 = r3.getBoundingClientRect(),
      r5 = r1.clientX - r4.left,
      r6 = r1.target.closest?.('.lib-seq__fade'),
      r7 = mJ(r2.edit)
        ? 'move'
        : r6
          ? r6.classList.contains('lib-seq__fade--in')
            ? 'fi'
            : 'fo'
          : r5 <= S4
            ? 'l'
            : r5 >= r4.width - S4
              ? 'r'
              : 'move',
      r8 = 1 / (Dq.fps || 30),
      r9 = (rX) => Math.round(rX / r8) * r8,
      rk = mO(r2.edit),
      rw = {
        start: r2.start,
        end: r2.end,
        clipIn: r2.edit.clipIn ?? 0,
        fadeIn: rk ? (r2.edit.blendIn ?? 0) : (r2.edit.fadeIn ?? 0),
        fadeOut: rk ? (r2.edit.blendOut ?? 0) : (r2.edit.fadeOut ?? 0),
      },
      rV = r1.clientX,
      rD = { ...rw },
      rm = r7 === 'move' && r2.edit.kind === 'layer' && (r1.ctrlKey || r1.metaKey);
    if (rm) {
      let rX = r3.cloneNode(!0);
      (rX.classList.add('is-copy'), r3.parentElement.appendChild(rX), (r3 = rX));
    }
    let rS = r7 === 'move' && !rm && mj(r2.edit) ? mQ() : [],
      rE =
        rS.length > 1
          ? Dq.tracks
              .flatMap((rL) => rL.strips)
              .filter((rL) => rL.edit && rS.some((rb) => mW(rb, rL.edit)))
              .map((rL) => ({
                s: rL,
                el: [...mm.querySelectorAll('.lib-seq__strip')].find(
                  (rb) => rb.__edit && mW(rb.__edit, rL.edit),
                ),
              }))
              .filter((rL) => rL.el)
          : null,
      rF = 0;
    if (rE) {
      for (let rL of rE) rL.el.classList.add('is-dragging');
    }
    let rC = r3.closest('.lib-seq__row'),
      rt =
        r7 === 'move' && r2.edit.kind === 'layer' && !r2.edit.lonely && !rE
          ? [...mm.querySelectorAll('.lib-seq__row[data-drop]')].filter((rb) =>
              ['track', 'new'].includes(JSON.parse(rb.dataset.drop).kind),
            )
          : [],
      rH = null,
      re = 0,
      rR = null,
      rQ = r7 === 'fi' || r7 === 'fo' ? [] : S8(rE ? rE.map((rb) => rb.s) : rm ? null : r2),
      rj = (rb) => {
        let rx = null;
        for (let ry of rQ) {
          let rW = Math.abs(ry - rb) * DW;
          rW <= oa && (!rx || rW < rx.d) && (rx = { c: ry, d: rW });
        }
        return rx;
      },
      rz = r2.edit.kind === 'layer';
    if (rz) {
      for (let rb of mm.querySelectorAll('.lib-seq__xfade'))
        (Number(rb.dataset.a) === r2.edit.index || Number(rb.dataset.b) === r2.edit.index) &&
          (rb.hidden = !0);
    }
    let rO = [];
    function rJ() {
      for (let rY of rO) rY.remove();
      if (((rO = []), !rz || r7 === 'fi' || r7 === 'fo')) return 0;
      let rx = [
          ...(
            (rH
              ? Dq.tracks.find((rv) => rv.drop?.kind === 'track' && rv.drop.track === rH.drop.track)
              : Dq.tracks.find((rv) => rv.strips.includes(r2))
            )?.strips ?? []
          ).filter((rv) => rv !== r2 && rv.edit?.kind === 'layer'),
          rD,
        ].map((rv) => ({ track: 0, start: rv.start, end: rv.end, fadeIn: 0, fadeOut: 0 })),
        ry = Hs(rx),
        rW = rx.length - 1,
        rq = (rH ? rH.row : rC).querySelector('.lib-seq__lane'),
        rP = 0;
      return (
        ry.forEach((rv, rB) => {
          if (!(rv.xIn > 0) || (rB !== rW && rv.from !== rW)) return;
          let rG = Sk(rx[rB].start, rv.xIn);
          (rG.classList.add('is-live'),
            rq.appendChild(rG),
            rO.push(rG),
            (rP = Math.max(rP, rv.xIn)));
        }),
        rP
      );
    }
    try {
      r3.setPointerCapture(r1.pointerId);
    } catch {}
    ((mL = !0),
      r3.classList.add('is-dragging'),
      r3.parentElement.classList.add('is-dragging'),
      mm.appendChild(mH));
    let rZ = Dq.fps || 30,
      rU = () => {
        if (
          ((r3.style.left = rD.start * DW + 'px'),
          (r3.style.width = Math.max(2, (rD.end - rD.start) * DW) + 'px'),
          r7 === 'fi' || r7 === 'fo')
        ) {
          if (rk) {
            let rx = Dq.offset || 0;
            Sw(
              r3,
              rD.start > rx + 1e-9 ? rD.fadeIn : 0,
              rD.end < Dq.duration - 1e-9 ? rD.fadeOut : 0,
            );
          } else Sw(r3, rD.fadeIn, rD.fadeOut);
          mH.textContent =
            'fade in ' +
            Math.round(rD.fadeIn * rZ) +
            ' f  \u00B7  out ' +
            Math.round(rD.fadeOut * rZ) +
            ' f';
        } else
          mH.textContent = rE
            ? rE.length +
              ' selected  \u00B7  ' +
              (rF >= 0 ? '+' : '\u2212') +
              Math.round(Math.abs(rF) * rZ) +
              ' f'
            : mJ(r2.edit)
              ? 'key  \u00B7  frame ' + S5(rD.start)
              : (rm ? 'copy  \u00B7  ' : '') +
                (S5(rD.start) +
                  ' \u2192 ' +
                  S5(rD.end) +
                  '  \u00B7  ' +
                  Math.round((rD.end - rD.start) * rZ) +
                  ' f') +
                (r7 === 'l' && rD.clipIn > 0
                  ? '  \u00B7  in +' + Math.round(rD.clipIn * rZ) + ' f'
                  : '');
        if (
          (rH && (mH.textContent += '  \u00B7  to ' + rH.name),
          r7 === 'move' || r7 === 'l' || r7 === 'r')
        ) {
          let ry = rJ();
          ry > 0 && (mH.textContent += '  \u00B7  crossfade ' + Math.round(ry * rZ) + ' f');
        }
        (rR != null
          ? ((S9.style.left = fo + rR * DW + 'px'), S9.isConnected || mm.appendChild(S9))
          : S9.remove(),
          (mH.style.left = fo + rD.start * DW + 'px'),
          (mH.style.top = r3.offsetTop + r3.parentElement.offsetTop + re - 22 + 'px'));
      },
      rK = (rx) => {
        let ry = r9((rx.clientX - rV) / DW);
        if (rE) {
          let rW = Math.max(...rE.map((rB) => ((mZ(rB.s.edit) && Dq.offset) || 0) - rB.s.start)),
            rq = rE.filter((rB) => mZ(rB.s.edit)),
            rP = rq.length ? Math.min(...rq.map((rB) => Dq.duration - rB.s.end)) : 1 / 0,
            rY = (rB) => Math.min(rP, Math.max(rW, rB)),
            rv = rY(ry);
          if (((rR = null), !rx.altKey && rQ.length)) {
            let rB = null;
            for (let rG of rE)
              for (let rg of [rG.s.start + rv, rG.s.end + rv]) {
                let rI = rj(rg);
                rI && (!rB || rI.d < rB.d) && (rB = { d: rI.d, shift: rI.c - rg, at: rI.c });
              }
            rB &&
              Math.abs(rY(rv + rB.shift) - (rv + rB.shift)) < 1e-9 &&
              ((rv += rB.shift), (rR = rB.at));
          }
          rF = rv;
          for (let rN of rE) rN.el.style.left = (rN.s.start + rv) * DW + 'px';
          ((rD = { ...rw, start: rw.start + rv, end: rw.end + rv }), rU());
          return;
        }
        if (r7 === 'move') {
          let rM = Math.max(0, rw.start + ry);
          if (((rD = { ...rw, start: rM, end: rw.end + (rM - rw.start) }), rt.length > 1)) {
            let E0 = rt.find((E2) => {
                let E3 = E2.getBoundingClientRect();
                return rx.clientY >= E3.top && rx.clientY <= E3.bottom;
              }),
              E1 = E0 && E0 !== rC ? E0 : null;
            (E1 !== rH?.row &&
              (rH?.row.classList.remove('is-drop'),
              (rH = E1
                ? {
                    row: E1,
                    drop: JSON.parse(E1.dataset.drop),
                    name: E1.querySelector('.lib-seq__name')?.textContent || 'track',
                  }
                : null),
              rH?.row.classList.add('is-drop')),
              (re = rH ? rH.row.getBoundingClientRect().top - rC.getBoundingClientRect().top : 0),
              (r3.style.transform = re ? 'translateY(' + re + 'px)' : ''));
          }
        } else {
          if (r7 === 'l') {
            let E2 = Math.min(rw.end - r8, rw.start + ry),
              E3 = rw.clipIn + (E2 - rw.start);
            (mO(r2.edit) ? (E3 = 0) : E3 < 0 && ((E2 = rw.start - rw.clipIn), (E3 = 0)),
              (rD = { ...rw, start: Math.max(0, E2), clipIn: E3 }));
          } else {
            if (r7 === 'fi' || r7 === 'fo') {
              let E4 = rw.end - rw.start;
              r7 === 'fi'
                ? (rD = { ...rw, fadeIn: Math.min(E4 - rw.fadeOut, Math.max(0, rw.fadeIn + ry)) })
                : (rD = { ...rw, fadeOut: Math.min(E4 - rw.fadeIn, Math.max(0, rw.fadeOut - ry)) });
            } else rD = { ...rw, end: Math.max(rw.start + r8, rw.end + ry) };
          }
        }
        if (((rR = null), !rx.altKey && rQ.length)) {
          if (r7 === 'move') {
            let E5 = rj(rD.start),
              E6 = rj(rD.end),
              E7 =
                E5 && (!E6 || E5.d <= E6.d)
                  ? { delta: E5.c - rD.start, at: E5.c }
                  : E6
                    ? { delta: E6.c - rD.end, at: E6.c }
                    : null;
            E7 &&
              rD.start + E7.delta >= -1e-9 &&
              ((rD.start = Math.max(0, rD.start + E7.delta)), (rD.end += E7.delta), (rR = E7.at));
          } else {
            if (r7 === 'l') {
              let E8 = rj(rD.start);
              if (E8 && E8.c < rD.end - r8 + 1e-9) {
                let E9 = mO(r2.edit) ? 0 : rD.clipIn + (E8.c - rD.start);
                E9 >= -1e-9 && ((rD.start = E8.c), (rD.clipIn = Math.max(0, E9)), (rR = E8.c));
              }
            } else {
              if (r7 === 'r') {
                let Ek = rj(rD.end);
                Ek && Ek.c > rD.start + r8 - 1e-9 && ((rD.end = Ek.c), (rR = Ek.c));
              }
            }
          }
        }
        (mO(r2.edit) &&
          ((rD.start = Math.max(0, rD.start)), (rD.end = Math.min(Dq.duration, rD.end))),
          mJ(r2.edit) &&
            (rD.start = rD.end = Math.min(Dq.duration, Math.max(Dq.offset || 0, rD.start))),
          rU());
      },
      rT = !1,
      rA = () => {
        if (rT) return;
        ((rT = !0),
          window.removeEventListener('pointermove', rn),
          window.removeEventListener('pointerup', ro),
          window.removeEventListener('pointercancel', ro),
          r3.classList.remove('is-dragging'),
          r3.parentElement?.classList.remove('is-dragging'),
          mH.remove(),
          S9.remove());
        for (let rW of rO) rW.remove();
        for (let rq of mm.querySelectorAll('.lib-seq__xfade[hidden]')) rq.hidden = !1;
        if (((mL = !1), rH?.row.classList.remove('is-drop'), (r3.style.transform = ''), rE)) {
          for (let rP of rE) rP.el.classList.remove('is-dragging');
          if (((mb = !1), Math.abs(rF) > 0.000001)) {
            (mT(
              rE.map((rY) =>
                mJ(rY.s.edit) && Dq.keyUid
                  ? { ...rY.s.edit, uid: Dq.keyUid(rY.s.start + rF) }
                  : rY.s.edit,
              ),
            ),
              DQ(
                rE.map((rY) => ({ edit: rY.s.edit, start: rY.s.start + rF, end: rY.s.end + rF })),
              ));
            return;
          }
          (mT(r1.shiftKey ? mX(r2.edit) : [r2.edit]), Sy());
          return;
        }
        if (rm) {
          (r3.remove(), (mb = !1));
          let rY =
            rH || Math.abs(rD.start - rw.start) > 0.000001
              ? DC(r2.edit, rH ? rH.drop : null, { start: rD.start, end: rD.end })
              : null;
          (mT([rY != null ? { kind: 'layer', uid: rY } : r2.edit]), Sy());
          return;
        }
        if (rH) {
          ((mb = !1), mT([]), Dw(r2.edit, rH.drop, { start: rD.start, end: rD.end }));
          return;
        }
        if (
          !['start', 'end', 'clipIn', 'fadeIn', 'fadeOut'].some(
            (rv) => Math.abs((rD[rv] ?? 0) - (rw[rv] ?? 0)) > 0.000001,
          )
        ) {
          ((mb = !1), mT(r1.shiftKey ? mX(r2.edit) : [r2.edit]), Sy());
          return;
        }
        (mT([mJ(r2.edit) && Dq.keyUid ? { ...r2.edit, uid: Dq.keyUid(rD.start) } : r2.edit]),
          (mb = !1));
        let rx =
            r7 === 'move' && r2.edit.kind === 'layer'
              ? Dq.tracks.reduce(
                  (rv, rB) =>
                    rv +
                    rB.strips.filter(
                      (rG) =>
                        mJ(rG.edit) &&
                        rG.start >= rw.start - 0.000001 &&
                        rG.start <= rw.end + 0.000001,
                    ).length,
                  0,
                )
              : 0,
          ry =
            r7 === 'move'
              ? { start: rD.start, end: rD.end }
              : r7 === 'l'
                ? { start: rD.start, clipIn: rD.clipIn }
                : r7 === 'fi'
                  ? rk
                    ? { blendIn: rD.fadeIn }
                    : { fadeIn: rD.fadeIn }
                  : r7 === 'fo'
                    ? rk
                      ? { blendOut: rD.fadeOut }
                      : { fadeOut: rD.fadeOut }
                    : { end: rD.end };
        (D9(r2.edit, ry),
          rx &&
            mV(
              rx +
                ' key' +
                (rx === 1 ? '' : 's') +
                ' stayed \u2014 select them with the strip to move them together',
            ));
      },
      rn = (rx) => {
        if (rx.pointerId === r1.pointerId) {
          if (!(rx.buttons & 1)) {
            rA(rx);
            return;
          }
          rK(rx);
        }
      },
      ro = (rx) => {
        rx.pointerId === r1.pointerId && rA(rx);
      };
    (window.addEventListener('pointermove', rn),
      window.addEventListener('pointerup', ro),
      window.addEventListener('pointercancel', ro),
      rU());
  }
  function S8(r1) {
    let r2 = Array.isArray(r1) ? new Set(r1) : new Set(r1 ? [r1] : []),
      r3 = [0, Dq.duration];
    Dq.offset > 0 && r3.push(Dq.offset);
    let r4 = D4.getState().time;
    r4 >= 0 && r3.push((Dq.offset || 0) + r4);
    for (let r5 of Dq.tracks) for (let r6 of r5.strips) r2.has(r6) || r3.push(r6.start, r6.end);
    return r3;
  }
  let S9 = DP('div', 'lib-seq__snapline');
  function Sk(r1, r2) {
    let r3 = DP('div', 'lib-seq__xfade');
    ((r3.style.left = r1 * DW + 'px'), (r3.style.width = Math.max(2, r2 * DW) + 'px'));
    let r4 = Math.round(r2 * (Dq.fps || 30));
    return (
      r2 * DW > 26 && r3.appendChild(DP('span', 'lib-seq__xfade-label', r4 + ' f')),
      (r3.title =
        'Crossfade, ' +
        r4 +
        ' frames \u2014 where the strips overlap. Move either strip to change it.'),
      r3
    );
  }
  function Sw(r1, r2, r3) {
    let r4 = (r7) =>
      r1.querySelector('.' + r7) || r1.appendChild(DP('span', 'lib-seq__ramp ' + r7));
    ((r4('lib-seq__ramp--in').style.width = Math.max(0, r2) * DW + 'px'),
      (r4('lib-seq__ramp--out').style.width = Math.max(0, r3) * DW + 'px'));
    let r5 = r1.querySelector('.lib-seq__fade--in'),
      r6 = r1.querySelector('.lib-seq__fade--out');
    (r5 && (r5.style.left = Math.max(0, r2) * DW + 'px'),
      r6 && (r6.style.right = Math.max(0, r3) * DW + 'px'));
  }
  function SV(r1, r2) {
    let r3 = DP('div', 'lib-seq__strip ' + r2);
    return (
      (r3.style.left = r1.start * DW + 'px'),
      (r3.style.width = Math.max(2, (r1.end - r1.start) * DW) + 'px'),
      r3
    );
  }
  function SD(r1, r2) {
    let r3 = DP('div', 'lib-seq__row lib-seq__row--' + (r1.kind || 'clip'));
    r1.drop && (r3.dataset.drop = JSON.stringify(r1.drop));
    let r4 = DP('div', 'lib-seq__head'),
      r5 = r4.appendChild(DP('span', 'lib-seq__name', r1.name)),
      r6 = r1.head;
    (r6 &&
      (r6.muted && r3.classList.add('is-muted'),
      r6.solo && r3.classList.add('is-solo'),
      r6.kind !== 'adjust' &&
        ((r5.title = 'Double-click to rename'),
        r5.addEventListener('dblclick', () => SO(r5, r6, r1.name)))),
      r6?.kind === 'adjust'
        ? r4.appendChild(SQ(r6))
        : r6?.kind === 'ik'
          ? r4.appendChild(Sj(r6))
          : r6?.kind === 'pose'
            ? r4.appendChild(Sz(r6))
            : r6 && !r6.isBase
              ? r4.appendChild(SR(r6))
              : r1.sub && r4.appendChild(DP('span', 'lib-seq__sub', r1.sub)),
      r3.appendChild(r4));
    let r7 = DP('div', 'lib-seq__lane' + (r1.empty ? ' is-empty' : ''));
    ((r7.style.width = r2 + 'px'),
      r1.empty &&
        r7.appendChild(
          DP('span', 'lib-seq__empty-hint', r1.hint || 'Drag a clip here from the grid to start'),
        ),
      r7.addEventListener('pointerdown', (r8) => {
        r8.button === 0 && SH(r8);
      }),
      r1.spark && r7.appendChild(SF(r1.spark, r2)));
    for (let r8 of r1.strips) {
      if (r8.kind === 'key') {
        r7.appendChild(SS(r8));
        continue;
      }
      if (r8.kind === 'pending') {
        let rV = DP('div', 'lib-seq__strip is-key is-pending');
        ((rV.style.left = r8.start * DW + 'px'),
          r8.title && (rV.title = r8.title),
          r7.appendChild(rV));
        continue;
      }
      let r9 = r8.kind || 'clip';
      if (r8.holdBefore) {
        let rD = SV(r8.holdBefore, 'is-hold-out');
        (rD.appendChild(DP('span', 'lib-seq__label', 'holds first pose')), r7.appendChild(rD));
      }
      let rk = SV(
          r8,
          'is-' +
            r9 +
            (r8.cut ? ' is-cut' : '') +
            (r8.edit ? ' is-editable' : '') +
            (mj(r8.edit) ? ' is-selected' : ''),
        ),
        rw = rk.appendChild(DP('span', 'lib-seq__label', r8.label));
      if (
        (r8.xfadeIn > 0 && (rw.style.marginLeft = r8.xfadeIn * DW + 'px'),
        (rk.__edit = r8.edit),
        r8.title && (rk.title = r8.title),
        r8.edit)
      ) {
        if (
          (rk.appendChild(DP('span', 'lib-seq__edge lib-seq__edge--l')),
          rk.appendChild(DP('span', 'lib-seq__edge lib-seq__edge--r')),
          !r8.edit.noFade)
        ) {
          if (!r8.edit.xIn) {
            let rm = DP('span', 'lib-seq__fade lib-seq__fade--in');
            ((rm.title = 'Drag to fade in'), rk.append(rm));
          }
          if (!r8.edit.xOut) {
            let rS = DP('span', 'lib-seq__fade lib-seq__fade--out');
            ((rS.title = 'Drag to fade out'), rk.append(rS));
          }
        }
        rk.addEventListener('pointerdown', (rE) => S7(rE, r8, rk));
      }
      if (r8.edit?.props) {
        rk.addEventListener('contextmenu', (rF) => {
          (rF.preventDefault(), Sm(r8.edit), SL(r8, rF.clientX, rF.clientY));
        });
        let rE = DP('button', 'lib-seq__more', '\u22EF');
        ((rE.type = 'button'),
          (rE.title = 'Mirror, reverse, speed, and what happens after it ends'),
          rE.addEventListener('pointerdown', (rF) => rF.stopPropagation()),
          rE.addEventListener('click', (rF) => {
            (rF.stopPropagation(), Sm(r8.edit));
            let rC = rE.getBoundingClientRect();
            SL(r8, rC.left, rC.top);
          }),
          rk.appendChild(rE));
      } else r8.edit && rk.addEventListener('contextmenu', (rF) => rF.preventDefault());
      if (
        (mO(r8.edit) || r8.rampIn > 0 || r8.rampOut > 0
          ? Sw(rk, r8.rampIn ?? 0, r8.rampOut ?? 0)
          : r8.edit &&
            !r8.edit.noFade &&
            Sw(rk, r8.edit.xIn ? 0 : (r8.edit.fadeIn ?? 0), r8.edit.fadeOut ?? 0),
        r7.appendChild(rk),
        r8.xfadeIn > 0)
      ) {
        let rF = Sk(r8.start, r8.xfadeIn);
        ((rF.dataset.a = String(r8.edit?.index ?? -1)),
          (rF.dataset.b = String(r8.xfadeFrom ?? -1)),
          r7.appendChild(rF));
      }
      for (let [rC, rt] of (r8.repeats || []).entries()) {
        let rH = SV(rt, 'is-repeat');
        (rH.appendChild(DP('span', 'lib-seq__label', '\u00D7' + (rC + 2))), r7.appendChild(rH));
      }
      if (r8.hold) {
        let re = SV(r8.hold, 'is-hold');
        (re.appendChild(DP('span', 'lib-seq__label', 'holds last pose')), r7.appendChild(re));
      }
      if (r8.holdAfter) {
        let rR = SV(r8.holdAfter, 'is-hold-out');
        (rR.appendChild(DP('span', 'lib-seq__label', 'holds last pose')), r7.appendChild(rR));
      }
    }
    return (r3.appendChild(r7), r3);
  }
  function Sm(r1) {
    mA(r1 ? [r1] : []);
  }
  function SS(r1) {
    let r2 = r1.edit,
      r3 = DP(
        'div',
        'lib-seq__strip is-key is-editable' +
          (r2.i === Vw ? ' is-linear' : r2.i === VD ? ' is-step' : VE(r2.i) ? ' is-eased' : '') +
          (mj(r2) ? ' is-selected' : ''),
      );
    return (
      (r3.style.left = r1.start * DW + 'px'),
      (r3.__edit = r2),
      r1.title && (r3.title = r1.title),
      r3.addEventListener('pointerdown', (r4) => S7(r4, r1, r3)),
      r3.addEventListener('contextmenu', (r4) => {
        (r4.preventDefault(), mj(r2) || Sm(r2), SL(r1, r4.clientX, r4.clientY));
      }),
      r3
    );
  }
  function SE() {
    let r1 = mK();
    if (!r1.length) return !1;
    let r2 = r1[r1.length - 1],
      r3 = Dq.tracks.flatMap((r5) => r5.strips).find((r5) => r5.edit && mW(r5.edit, r2));
    if (!r3) return !1;
    let r4 =
      [...mm.querySelectorAll('.lib-seq__strip.is-key')]
        .find((r5) => r5.__edit && mW(r5.__edit, r2))
        ?.getBoundingClientRect() ?? D3.getBoundingClientRect();
    return (SL(r3, r4.left + r4.width / 2, r4.top), !0);
  }
  function SF(r1, r2) {
    let r3 = 'http://www.w3.org/2000/svg',
      r4 = document.createElementNS(r3, 'svg');
    (r4.setAttribute('class', 'lib-seq__spark'),
      r4.setAttribute('width', String(r2)),
      r4.setAttribute('viewBox', '0 0 ' + r2 + ' 100'),
      r4.setAttribute('preserveAspectRatio', 'none'));
    let r5 = (r8) => 88 - r8 * 76,
      r6 = document.createElementNS(r3, 'line');
    (r6.setAttribute('class', 'lib-seq__spark-zero'),
      r6.setAttribute('x1', '0'),
      r6.setAttribute('x2', String(r2)),
      r6.setAttribute('y1', String(r5(r1.zero))),
      r6.setAttribute('y2', String(r5(r1.zero))),
      r4.appendChild(r6));
    let r7 = document.createElementNS(r3, 'path');
    return (
      r7.setAttribute('class', 'lib-seq__spark-line'),
      r7.setAttribute(
        'd',
        r1.points
          .map(
            ([r8, r9], rk) =>
              '' + (rk ? 'L' : 'M') + (r8 * DW).toFixed(1) + ',' + r5(r9).toFixed(1),
          )
          .join(' '),
      ),
      r4.appendChild(r7),
      r4
    );
  }
  function SC(r1) {
    let r2 = Dq.tracks.flatMap((rk) => rk.strips.filter((rw) => mJ(rw.edit))),
      r3 =
        mE === 'graph'
          ? new Set(mC.picked().map((rk) => rk.key))
          : new Set(
              mQ()
                .filter(
                  (rk) => mJ(rk) || rk.kind === 'adjust' || rk.kind === 'ik' || rk.kind === 'pose',
                )
                .map((rk) => rk.key),
            ),
      r4 = r3.size ? r2.filter((rk) => r3.has(rk.edit.key)) : r2;
    if (!r4.length) {
      mV(Dq.advanced ? 'No keys yet \u2014 K keys the selected lane' : 'No keys');
      return;
    }
    Dq.hasSequence && Dq.playing === !1 && DD();
    let r5 = Dq.offset || 0,
      r6 = r5 + (D4.getState().time || 0),
      r7 = 0.5 / (Dq.fps || 30),
      r8 = [...new Set(r4.map((rk) => rk.start))].sort((rk, rw) => rk - rw),
      r9 = r1 < 0 ? [...r8].reverse().find((rk) => rk < r6 - r7) : r8.find((rk) => rk > r6 + r7);
    if (r9 == null) {
      mV(r1 < 0 ? 'No key before this one' : 'No key after this one');
      return;
    }
    (D4.getState().paused || D4.setPaused(!0), D4.seek(Math.max(0, r9 - r5)));
  }
  function SH(r1) {
    S6();
    let r2 = r1.clientX,
      r3 = r1.clientY,
      r4 = r1.shiftKey ? mQ() : [],
      r5 = null,
      r6 = [],
      r7 = () =>
        [...mm.querySelectorAll('.lib-seq__strip.is-editable')].filter(
          (rk) => rk.__edit?.kind === 'layer' || mZ(rk.__edit),
        ),
      r8 = (rk) => {
        if (
          rk.pointerId !== r1.pointerId ||
          (!r5 && Math.hypot(rk.clientX - r2, rk.clientY - r3) < 4)
        )
          return;
        r5 || ((r5 = DP('div', 'lib-seq__marquee')), mm.appendChild(r5), (mL = !0));
        let rw = mm.getBoundingClientRect(),
          rV = Math.min(r2, rk.clientX),
          rD = Math.max(r2, rk.clientX),
          rm = Math.min(r3, rk.clientY),
          rS = Math.max(r3, rk.clientY);
        ((r5.style.left = rV - rw.left + 'px'),
          (r5.style.top = rm - rw.top + 'px'),
          (r5.style.width = rD - rV + 'px'),
          (r5.style.height = rS - rm + 'px'),
          (r6 = []));
        for (let rE of r7()) {
          let rF = rE.getBoundingClientRect(),
            rC = rF.right > rV && rF.left < rD && rF.bottom > rm && rF.top < rS;
          (rE.classList.toggle('is-marquee', rC), rC && r6.push(rE.__edit));
        }
      },
      r9 = (rk) => {
        if (rk.pointerId === r1.pointerId) {
          if (
            (window.removeEventListener('pointermove', r8),
            window.removeEventListener('pointerup', r9),
            window.removeEventListener('pointercancel', r9),
            !r5)
          ) {
            mA(r4);
            return;
          }
          r5.remove();
          for (let rw of mm.querySelectorAll('.is-marquee')) rw.classList.remove('is-marquee');
          ((mL = !1), mA([...r4, ...r6]), mb && ((mb = !1), Sy()));
        }
      };
    (window.addEventListener('pointermove', r8),
      window.addEventListener('pointerup', r9),
      window.addEventListener('pointercancel', r9));
  }
  function SR(r1) {
    let r2 = DP('div', 'lib-seq__headctl'),
      r3 = (r6, r7, r8, r9) => {
        let rk = DP('button', 'lib-seq__hbtn' + (r7 ? ' is-on' : ''), r6);
        return (
          (rk.type = 'button'),
          (rk.title = r8),
          rk.setAttribute('aria-pressed', String(r7)),
          rk.addEventListener('click', (rw) => {
            (rw.stopPropagation(), r9());
          }),
          rk
        );
      };
    r2.append(
      r3(
        'M',
        r1.mute,
        'Mute \u2014 this layer stays, contributing nothing, and is left out of the export (M)',
        () => DJ(r1.track, { mute: !r1.mute }),
      ),
      r3('S', r1.solo, 'Solo \u2014 every other layer but Base goes silent', () =>
        DJ(r1.track, { solo: !r1.solo }),
      ),
    );
    let r4 = document.createElement('input');
    ((r4.type = 'range'),
      (r4.className = 'lib-seq__hweight'),
      (r4.min = '0'),
      (r4.max = '100'),
      (r4.step = '1'),
      (r4.value = String(Math.round((r1.weight ?? 1) * 100))),
      (r4.title = 'Weight ' + r4.value + '%'),
      (r4.dataset.track = String(r1.track)),
      r4.setAttribute('aria-label', 'Layer weight'),
      r4.addEventListener('pointerdown', (r6) => {
        (r6.stopPropagation(),
          (mL = !0),
          window.addEventListener(
            'pointerup',
            () => {
              ((mL = !1), mb && ((mb = !1), Sy()));
            },
            { once: !0 },
          ));
      }),
      r4.addEventListener('input', () => {
        ((r4.title = 'Weight ' + r4.value + '%'),
          DJ(r1.track, { weight: Number(r4.value) / 100 }, { live: !0 }));
      }),
      r4.addEventListener('change', () => DJ(r1.track, { weight: Number(r4.value) / 100 })),
      r2.appendChild(r4));
    let r5 = r3('\u25BE', !1, 'Which body parts this layer drives', () => SJ(r1, r5));
    return (r5.classList.add('lib-seq__hreg'), r2.appendChild(r5), r2);
  }
  function SQ(r1) {
    let r2 = DP('div', 'lib-seq__headctl'),
      r3 = (r6, r7, r8, r9) => {
        let rk = DP('button', 'lib-seq__hbtn' + (r7 ? ' is-on' : ''), r6);
        return (
          (rk.type = 'button'),
          (rk.title = r8),
          rk.setAttribute('aria-pressed', String(r7)),
          rk.addEventListener('click', (rw) => {
            (rw.stopPropagation(), r9());
          }),
          rk
        );
      };
    r2.append(
      r3('M', r1.mute, 'Mute \u2014 keeps the value, applies nothing (M)', () =>
        DZ(r1.key, { mute: !r1.mute }),
      ),
      r3('S', r1.solo, 'Solo \u2014 every other adjust lane goes silent', () =>
        DZ(r1.key, { solo: !r1.solo }),
      ),
    );
    let r4 = document.createElement('input');
    ((r4.type = 'range'),
      (r4.className = 'lib-seq__hweight'),
      (r4.min = String(r1.min)),
      (r4.max = String(r1.max)),
      (r4.step = String(r1.step)),
      (r4.value = String(r1.value)));
    let r5 = (r6) => '' + Math.round(Number(r6)) + r1.unit;
    return (
      (r4.title = r5(r4.value)),
      (r4.dataset.track = 'adjust:' + r1.key),
      r4.setAttribute('aria-label', 'Amount'),
      r4.addEventListener('pointerdown', (r6) => {
        (r6.stopPropagation(),
          (mL = !0),
          window.addEventListener(
            'pointerup',
            () => {
              ((mL = !1), mb && ((mb = !1), Sy()));
            },
            { once: !0 },
          ));
      }),
      r4.addEventListener('input', () => {
        ((r4.title = r5(r4.value)), DZ(r1.key, { value: Number(r4.value) }, { live: !0 }));
      }),
      r4.addEventListener('change', () => DZ(r1.key, { value: Number(r4.value) })),
      r2.appendChild(r4),
      r2.appendChild(DP('span', 'lib-seq__hval', r5(r1.value))),
      r2
    );
  }
  function Sj(r1) {
    let r2 = DP('div', 'lib-seq__headctl'),
      r3 = (r6, r7, r8, r9) => {
        let rk = DP('button', 'lib-seq__hbtn' + (r7 ? ' is-on' : ''), r6);
        return (
          (rk.type = 'button'),
          (rk.title = r8),
          rk.setAttribute('aria-pressed', String(r7)),
          rk.addEventListener('click', (rw) => {
            (rw.stopPropagation(), r9());
          }),
          rk
        );
      };
    r2.append(
      r3('M', r1.mute, 'Mute \u2014 keeps the offset, applies nothing (M)', () =>
        DU(r1.key, { mute: !r1.mute }),
      ),
      r3('S', r1.solo, 'Solo \u2014 every other IK lane goes silent; held feet keep holding', () =>
        DU(r1.key, { solo: !r1.solo }),
      ),
    );
    let r4 = document.createElement('input');
    ((r4.type = 'range'),
      (r4.className = 'lib-seq__hweight'),
      (r4.min = '0'),
      (r4.max = '100'),
      (r4.step = '1'),
      (r4.value = String(Math.round((r1.weight ?? 1) * 100))));
    let r5 = (r6) => Math.round(Number(r6)) + '%';
    return (
      (r4.title = 'Reach ' + r5(r4.value)),
      (r4.dataset.track = 'ik:' + r1.key),
      r4.setAttribute('aria-label', 'How far it reaches'),
      r4.addEventListener('pointerdown', (r6) => {
        (r6.stopPropagation(),
          (mL = !0),
          window.addEventListener(
            'pointerup',
            () => {
              ((mL = !1), mb && ((mb = !1), Sy()));
            },
            { once: !0 },
          ));
      }),
      r4.addEventListener('input', () => {
        ((r4.title = 'Reach ' + r5(r4.value)),
          DU(r1.key, { weight: Number(r4.value) / 100 }, { live: !0 }));
      }),
      r4.addEventListener('change', () => DU(r1.key, { weight: Number(r4.value) / 100 })),
      r2.appendChild(r4),
      r2.appendChild(DP('span', 'lib-seq__hval', r5(r4.value))),
      r2
    );
  }
  function Sz(r1) {
    let r2 = DP('div', 'lib-seq__headctl'),
      r3 = (r5, r6, r7, r8) => {
        let r9 = DP('button', 'lib-seq__hbtn' + (r6 ? ' is-on' : ''), r5);
        return (
          (r9.type = 'button'),
          (r9.title = r7),
          r9.setAttribute('aria-pressed', String(r6)),
          r9.addEventListener('click', (rk) => {
            (rk.stopPropagation(), r8());
          }),
          r9
        );
      };
    r2.append(
      r3('M', r1.mute, 'Mute \u2014 kept, applies nothing (M)', () =>
        DA(r1.key, { mute: !r1.mute }),
      ),
      r3('S', r1.solo, 'Solo \u2014 the other pose layers go silent', () =>
        DA(r1.key, { solo: !r1.solo }),
      ),
    );
    let r4 = document.createElement('input');
    return (
      (r4.type = 'range'),
      (r4.className = 'lib-seq__hweight'),
      (r4.min = '0'),
      (r4.max = '100'),
      (r4.step = '1'),
      (r4.value = String(Math.round((r1.weight ?? 1) * 100))),
      (r4.title = 'Weight ' + r4.value + '%'),
      (r4.dataset.track = 'pose:' + r1.key),
      r4.setAttribute('aria-label', 'Pose weight'),
      r4.addEventListener('pointerdown', (r5) => {
        (r5.stopPropagation(),
          (mL = !0),
          window.addEventListener(
            'pointerup',
            () => {
              ((mL = !1), mb && ((mb = !1), Sy()));
            },
            { once: !0 },
          ));
      }),
      r4.addEventListener('change', () => DA(r1.key, { weight: Number(r4.value) / 100 })),
      r4.addEventListener('input', () => {
        r4.title = 'Weight ' + r4.value + '%';
      }),
      r2.appendChild(r4),
      r2.appendChild(DP('span', 'lib-seq__hval', r4.value + '%')),
      r2
    );
  }
  function SO(r1, r2, r3) {
    let r4 = document.createElement('input');
    ((r4.className = 'lib-seq__rename'), (r4.value = r2.given || r3), (r4.maxLength = 24));
    let r5 = !1,
      r6 = (r7) => {
        r5 ||
          ((r5 = !0),
          r7 && r4.value.trim() !== (r2.given || r3) ? DJ(r2.track, { name: r4.value }) : Sy());
      };
    (r4.addEventListener('keydown', (r7) => {
      (r7.stopPropagation(),
        r7.key === 'Enter'
          ? (r7.preventDefault(), r6(!0))
          : r7.key === 'Escape' && (r7.preventDefault(), r6(!1)));
    }),
      r4.addEventListener('blur', () => r6(!0)),
      r1.replaceWith(r4),
      r4.focus(),
      r4.select());
  }
  function SJ(r1, r2) {
    (SA(),
      (SU = DP('div', 'lib-seq__menu lib-seq__menu--regions')),
      (SK = { kind: 'track', track: r1.track }),
      SZ(r1),
      document.body.appendChild(SU));
    let r3 = r2.getBoundingClientRect(),
      r4 = SU.offsetHeight;
    ((SU.style.left = Math.max(8, r3.left) + 'px'),
      (SU.style.top =
        (r3.bottom + r4 + 8 > window.innerHeight ? Math.max(8, r3.top - r4 - 4) : r3.bottom + 4) +
        'px'),
      document.addEventListener('pointerdown', Sn, !0),
      window.addEventListener('keydown', SX, !0));
  }
  function SZ(r1) {
    ((SU.innerHTML = ''), SU.appendChild(DP('div', 'lib-seq__menu-title', 'Body parts')));
    let r2 = DP('div', 'lib-seq__menu-group');
    for (let r3 of D8().keys) {
      let r4 = Object.prototype.hasOwnProperty.call(r1.regions || {}, r3),
        r5 = DP(
          'button',
          'lib-btn lib-btn--sm lib-seq__menu-opt' + (r4 ? ' is-on' : ''),
          D8().labels[r3] || r3,
        );
      ((r5.type = 'button'),
        r5.setAttribute('aria-pressed', String(r4)),
        r5.addEventListener('click', () => {
          let r6 = { ...(r1.regions || {}) };
          (r4 ? delete r6[r3] : (r6[r3] = 1), DJ(r1.track, { regions: r6 }));
        }),
        r2.appendChild(r5));
    }
    (SU.appendChild(r2),
      SU.appendChild(DP('p', 'lib-seq__menu-note', 'The hips and the root go with Legs.')));
  }
  let SU = null,
    SK = null,
    ST = [0.5, 0.75, 1, 1.5, 2];
  function SA() {
    (SU?.remove(),
      (SU = null),
      (SK = null),
      document.removeEventListener('pointerdown', Sn, !0),
      window.removeEventListener('keydown', SX, !0));
  }
  function Sn(r1) {
    SU && !SU.contains(r1.target) && SA();
  }
  function SX(r1) {
    r1.key === 'Escape' && (r1.preventDefault(), r1.stopPropagation(), SA());
  }
  function SL(r1, r2, r3) {
    (SA(),
      (SU = DP('div', 'lib-seq__menu')),
      SU.setAttribute('role', 'dialog'),
      (SK = r1.edit),
      mJ(r1.edit) ? Sb(r1) : Sx(r1),
      document.body.appendChild(SU));
    let r4 = SU.offsetWidth,
      r5 = SU.offsetHeight,
      r6 = Math.min(r2, window.innerWidth - r4 - 8),
      r7 = r3 + r5 + 8 > window.innerHeight ? Math.max(8, r3 - r5 - 4) : r3 + 4;
    ((SU.style.left = Math.max(8, r6) + 'px'),
      (SU.style.top = r7 + 'px'),
      document.addEventListener('pointerdown', Sn, !0),
      window.addEventListener('keydown', SX, !0));
  }
  function Sb(r1) {
    let r2 = r1.edit,
      r3 = SU.contains(document.activeElement) ? document.activeElement.dataset.key : null;
    ((SU.innerHTML = ''), SU.classList.add('lib-seq__menu--key'));
    let r4 = Dq.tracks
        .flatMap((rC) => rC.strips)
        .map((rC) => rC.edit)
        .filter(mJ),
      r5 = (mj(r2) ? mK() : [r2]).map((rC) => r4.find((rt) => mW(rt, rC)) ?? rC);
    r5.some((rC) => mW(rC, r2)) || r5.push(r2);
    let r6 = r5.length > 1;
    SU.appendChild(
      DP(
        'div',
        'lib-seq__menu-title',
        r6 ? r5.length + ' keys' : r2.control + '  \u00B7  key on frame ' + (r2.uid + 1),
      ),
    );
    let r7 = (rC, ...rt) => {
      let rH = DP('div', 'lib-seq__menu-row');
      rH.appendChild(DP('span', 'lib-seq__menu-label', rC));
      let re = DP('div', 'lib-seq__menu-group');
      (re.append(...rt), rH.appendChild(re), SU.appendChild(rH));
    };
    if (!r2.vector && !r6) {
      let rC = document.createElement('input');
      ((rC.type = 'number'),
        (rC.className = 'lib-seq__menu-num'),
        (rC.min = String(r2.min)),
        (rC.max = String(r2.max)),
        (rC.step = String(r2.step || 1)),
        (rC.value = String(+Number(r2.v).toFixed(2))),
        (rC.dataset.key = 'v'));
      let rt = () => {
        let rH = Number(rC.value);
        Number.isFinite(rH) &&
          Math.abs(rH - r2.v) > 1e-9 &&
          DK(r2, { v: Math.min(r2.max, Math.max(r2.min, rH)) });
      };
      (rC.addEventListener('keydown', (rH) => {
        (rH.stopPropagation(), rH.key === 'Enter' && (rH.preventDefault(), rt()));
      }),
        rC.addEventListener('change', () =>
          setTimeout(() => {
            rC.isConnected && rt();
          }, 0),
        ),
        r7('Value', rC, DP('span', 'lib-seq__menu-unit', r2.unit || '')));
    }
    let r8 = new Set(r5.map((rH) => rH.i || V9)),
      r9 = r8.size === 1 ? [...r8][0] : null,
      rk = r9 ? VS(r9) : null,
      rw = r5.some((rH) => VS(rH.i)),
      rV = (rH, re, rR, rQ, rj = !1) => {
        let rz = DP('button', 'lib-btn lib-btn--sm lib-seq__menu-opt' + (rR ? ' is-on' : ''), rH);
        return (
          (rz.type = 'button'),
          (rz.title = re),
          (rz.disabled = rj),
          rz.setAttribute('aria-pressed', String(rR)),
          rz.addEventListener('click', rQ),
          rz
        );
      },
      rD = (rH) => {
        for (let re of r5) DK(re, { i: rH });
      },
      rm = (rH, re, rR) => rV(rH, rR, r9 === re, () => rD(re)),
      rS = (rH) =>
        rV(Ve[rH], Ve[rH] + ' easing to the next key', rk?.name === rH, () =>
          rD(VC(rH, rk?.way ?? null)),
        );
    (r7(
      'Interpolation',
      rm(
        'Bezier',
        V9,
        'A smooth curve to the next key, flowing through the keys, as Blender\u2019s Bezier',
      ),
      rm('Linear', Vw, 'A straight line to the next key'),
      rm('Step', VD, 'Holds until the next key, then jumps'),
    ),
      r7('Easing', ...['sine', 'quad', 'cubic', 'quart', 'quint', 'expo', 'circ'].map(rS)),
      r7('Dynamic', ...['back', 'bounce', 'elastic'].map(rS)));
    let rE = (rH, re, rR) =>
      rV(
        rH,
        rR,
        !!rk && (rk.way ?? null) === re,
        () => {
          for (let rQ of r5) {
            let rj = VS(rQ.i);
            rj && DK(rQ, { i: VC(rj.name, re) });
          }
        },
        !rw,
      );
    r7(
      'Ease',
      rE('Auto', null, 'As Blender has it: eased in, or out for Back, Bounce and Elastic'),
      rE('In', 'in', 'Starts slowly, arrives at speed'),
      rE('Out', 'out', 'Starts at speed, arrives slowly'),
      rE('In and out', 'io', 'Slow at both ends'),
    );
    let rF = DP(
      'button',
      'lib-btn lib-btn--sm lib-seq__menu-del',
      r6 ? 'Delete ' + r5.length + ' keys' : 'Delete key',
    );
    if (
      ((rF.type = 'button'),
      rF.addEventListener('click', () => {
        (SA(), mT([]), Dj(r5));
      }),
      r7('', rF),
      r3)
    ) {
      let rH = SU.querySelector('[data-key="' + r3 + '"]');
      rH && (rH.focus(), rH.select?.());
    }
  }
  function Sx(r1) {
    let r2 = r1.edit.props,
      r3 = (rz) => Dk(r1.edit, rz),
      r4 = SU.contains(document.activeElement) ? document.activeElement.dataset.key : null;
    SU.innerHTML = '';
    let r5 = Dq.tracks.find((rz) => rz.strips.includes(r1))?.name;
    SU.appendChild(
      DP('div', 'lib-seq__menu-title', (r1.edit.name || r1.label) + (r5 ? '  \u00B7  ' + r5 : '')),
    );
    let r6 = (rz, ...rO) => {
        let rJ = DP('div', 'lib-seq__menu-row');
        rJ.appendChild(DP('span', 'lib-seq__menu-label', rz));
        let rZ = DP('div', 'lib-seq__menu-group');
        return (rZ.append(...rO), rJ.appendChild(rZ), SU.appendChild(rJ), rJ);
      },
      r7 = (rz, rO, rJ, rZ) => {
        let rU = DP('button', 'lib-btn lib-btn--sm lib-seq__menu-opt' + (rO ? ' is-on' : ''), rz);
        return (
          (rU.type = 'button'),
          rU.setAttribute('aria-pressed', String(rO)),
          rZ && (rU.title = rZ),
          rU.addEventListener('click', rJ),
          rU
        );
      },
      r8 = r1.edit,
      r9 = Dq.fps || 30,
      rk = (rz) => Math.round(rz * r9),
      rw = Math.max(1, rk(r1.end - r1.start)),
      rV = r8.speed || 1,
      rD = r8.k || 1,
      rm = Math.max(1, Math.round((r8.clipLen || 0) * r9)),
      rS = Math.round(((r8.clipIn || 0) / rD) * rV * r9),
      rE = rk(r8.fadeIn || 0),
      rF = rk(r8.fadeOut || 0),
      rC = (rz, rO) => {
        if (!Number.isFinite(rO)) {
          Sx(r1);
          return;
        }
        let rJ = (rZ) => rZ / r9;
        if (rz === 'start') {
          let rZ = rJ(Math.max(1, rO) - 1);
          D9(r8, { start: rZ, end: rZ + (r1.end - r1.start) });
        } else {
          if (rz === 'end') D9(r8, { end: rJ(Math.max(rk(r1.start) + 1, rO - 1)) });
          else {
            if (rz === 'length') D9(r8, { end: r1.start + rJ(Math.max(1, rO)) });
            else {
              if (rz === 'clipIn') {
                let rU = Math.min(rm - 1, Math.max(0, rO));
                D9(r8, { clipIn: (rJ(rU) / rV) * rD });
              } else
                rz === 'fadeIn'
                  ? D9(r8, { fadeIn: rJ(Math.min(rw - rF, Math.max(0, rO))) })
                  : rz === 'fadeOut' && D9(r8, { fadeOut: rJ(Math.min(rw - rE, Math.max(0, rO))) });
            }
          }
        }
      },
      rt = (rz, rO, { min: rJ = 0, max: rZ = 99999, tip: rU = '', aria: rK = rz } = {}) => {
        let rT = document.createElement('input');
        return (
          (rT.type = 'number'),
          (rT.className = 'lib-seq__menu-num'),
          (rT.dataset.key = rz),
          (rT.min = String(rJ)),
          (rT.max = String(rZ)),
          (rT.step = '1'),
          (rT.value = String(rO)),
          rU && (rT.title = rU),
          rT.setAttribute('aria-label', rK),
          rT.addEventListener('keydown', (rA) => {
            (rA.stopPropagation(),
              rA.key === 'Enter' && (rA.preventDefault(), rC(rz, Math.round(Number(rT.value)))));
          }),
          rT.addEventListener('change', () =>
            setTimeout(() => {
              rT.isConnected && rC(rz, Math.round(Number(rT.value)));
            }, 0),
          ),
          rT
        );
      },
      rH = (rz) => DP('span', 'lib-seq__menu-sub', rz);
    (r6(
      'Frames',
      rH('start'),
      rt('start', rk(r1.start) + 1, {
        min: 1,
        aria: 'Start frame',
        tip: 'Moves the strip \u2014 its length stays',
      }),
      rH('end'),
      rt('end', rk(r1.end) + 1, { min: 2, aria: 'End frame', tip: 'Trims its tail' }),
      rH('length'),
      rt('length', rw, { min: 1, aria: 'Length in frames' }),
      rH('f'),
    ),
      r6(
        'Clip in',
        rt('clipIn', rS, {
          min: 0,
          max: rm - 1,
          aria: 'Frames into its clip',
          tip: 'Which frame of its own clip it starts on \u2014 the strip stays put, the content slips',
        }),
        rH('f into its clip, of ' + rm),
      ));
    {
      let rz = r8.feet;
      if (rz?.clipIn != null && rz.inStep)
        r6('Feet', DP('span', 'lib-seq__menu-ok', '\u2713 In step with ' + rz.from));
      else {
        if (rz?.clipIn != null) {
          let rO = r7(
            'Match feet to ' + rz.from,
            !1,
            () => D9(r8, { clipIn: rz.clipIn }),
            'Start this clip on the step that puts the same leg forward as the strip before it',
          );
          ((rO.dataset.key = 'matchFeet'), r6('Feet', rO));
        } else r6('Feet', rH(rz?.reason || 'Nothing to step with'));
      }
    }
    if (r8.noFade)
      r6('Fades', rH('none \u2014 the first base strip has nothing under it to fade from'));
    else {
      let rJ = (rU, rK, rT, rA) =>
          rT
            ? DP('span', 'lib-seq__menu-fixed', rA + ' ' + rK + ' f crossfade')
            : [rH(rA), rt(rU, rK, { min: 0, max: rw, aria: 'Fade ' + rA + ' in frames' })],
        rZ = r6(
          'Fades',
          ...((...rU) => rU.flat())(
            rJ('fadeIn', rE, r8.xIn, 'in'),
            rJ('fadeOut', rF, r8.xOut, 'out'),
          ),
          ...(!r8.xIn || !r8.xOut ? [rH('f')] : []),
        );
      (r8.xIn || r8.xOut) &&
        (rZ.title =
          'A crossfade is the overlap with the strip next to it \u2014 move either strip to change it');
    }
    (r6(
      'Modifiers',
      r7(
        '\u21CB Mirrored',
        r2.mirror,
        () => r3({ mirror: !r2.mirror }),
        'Swap left and right on this strip only',
      ),
      r7(
        '\u25C2 Reversed',
        r2.reverse,
        () => r3({ reverse: !r2.reverse }),
        'Play this strip backwards \u2014 this strip only',
      ),
      (() => {
        let rU = r7(
          'Origin',
          r2.origin,
          () => r3({ origin: !r2.origin }),
          'Start the reversed clip on the origin, where the clip itself started \u2014 off, it starts where the clip ended (a true reverse). Only seen on the first strip of the timeline: every later strip carries on from the one before it either way.',
        );
        return ((rU.disabled = !r2.reverse), rU);
      })(),
    ),
      r6(
        'Strip',
        r7(
          'Split at playhead',
          !1,
          () => {
            let rU = r1.edit;
            (SA(), SI(rU));
          },
          'Cut this strip in two where the playhead is \u2014 the S key does the same',
        ),
        r7(
          'Duplicate',
          !1,
          () => {
            let rU = r1.edit;
            (SA(), SN(rU));
          },
          'A copy straight after it \u2014 Ctrl+D does the same',
        ),
        r7(
          'Delete strip',
          !1,
          () => {
            let rU = r1.edit;
            (SA(), DS(rU));
          },
          "Remove this strip \u2014 the Delete key does the same, Ctrl+Z brings it back. Deleting the base's only strip makes the next layer up the base.",
        ),
      ));
    let re = document.createElement('input');
    ((re.type = 'number'),
      (re.className = 'lib-seq__menu-speed'),
      (re.min = '0.1'),
      (re.max = '4'),
      (re.step = '0.05'),
      (re.value = String(+r2.speed.toFixed(3))),
      re.setAttribute('aria-label', 'Speed'),
      (re.dataset.key = 'speed'),
      re.addEventListener('change', () => r3({ speed: Number(re.value) })),
      re.addEventListener('keydown', (rU) => rU.stopPropagation()));
    let rR = ST.map((rU) =>
      r7(rU + '\u00D7', Math.abs(r2.speed - rU) < 0.000001, () => r3({ speed: rU })),
    );
    r6('Speed', ...rR, re, DP('span', 'lib-seq__menu-x', '\u00D7'));
    let rQ = 'Auto \u00B7 ' + (r2.measured ? 'repeats' : 'holds'),
      rj = r6(
        'After it ends',
        r7(
          rQ,
          r2.repeat === 'auto',
          () => r3({ repeat: 'auto' }),
          'The scan measured this clip, so it ' + (r2.measured ? 'repeats' : 'holds its last pose'),
        ),
        r7(
          'Loop',
          r2.repeat === 'repeat',
          () => r3({ repeat: 'repeat' }),
          'Play the clip again from the top',
        ),
        r7('Hold', r2.repeat === 'hold', () => r3({ repeat: 'hold' }), 'Freeze on its last pose'),
      );
    if (
      (r2.overruns ||
        rj.after(
          DP(
            'p',
            'lib-seq__menu-note',
            'This strip ends before its clip does, so this has no effect until it is made longer.',
          ),
        ),
      r4)
    ) {
      let rU = SU.querySelector('[data-key="' + r4 + '"]');
      rU && (rU.focus(), rU.select?.());
    }
  }
  function Sy() {
    if (D3.hidden) return;
    if (mL) {
      mb = !0;
      return;
    }
    let r1 = document.activeElement?.classList?.contains('lib-seq__hweight')
      ? document.activeElement.dataset.track
      : null;
    if (((Dq = D5() || { duration: 0, fps: 30, tracks: [] }), mE === 'graph')) {
      let r7 = D4.getState();
      (mC.render({ ...(Dq.graph?.() || {}), time: r7.time || 0 }),
        SB(),
        Sv(r7.time || 0),
        SG(r7.paused || r7.finished));
      return;
    }
    {
      let r8 = Dq.tracks
        .flatMap((r9) => r9.strips)
        .map((r9) => r9.edit)
        .filter(Boolean);
      mT(
        mQ()
          .map((r9) => r8.find((rk) => mW(rk, r9)))
          .filter(Boolean),
      );
    }
    let r2 = mD.clientWidth,
      r3 = Dy === 1 && mg != null && mB() * mg > Math.max(100, r2 - fo - 24) + 1;
    ((mg == null || r2 !== mI || Dq.hasSequence !== mN || r3) &&
      ((mg = mG()), (mI = r2), (mN = Dq.hasSequence)),
      (DW = mg * Dy),
      Dq.duration > 0 || (mg = null));
    let r4 = Math.max(1, Math.ceil(mB() * DW) + 2, r2 - fo - 24);
    if (
      ((mm.innerHTML = ''),
      (mm.style.width = fo + r4 + 'px'),
      mm.appendChild(S1(r4)),
      !Dq.tracks.length)
    ) {
      let r9 = DP(
        'p',
        'lib-seq__empty',
        'Pick a clip, or build a composite, and its tracks appear here.',
      );
      mm.appendChild(r9);
    }
    for (let rk of Dq.tracks) mm.appendChild(SD(rk, r4));
    ((mx = DP('div', 'lib-seq__before')),
      (mx.style.left = fo + 'px'),
      (mx.style.width = (Dq.offset || 0) * DW + 'px'),
      (mx.hidden = !(Dq.offset > 0)),
      (mx.title = 'Before the range \u2014 not in the composite'),
      mm.appendChild(mx));
    let r5 = DP('div', 'lib-seq__beyond');
    ((r5.style.left = fo + Dq.duration * DW + 'px'),
      (r5.title = Dq.range
        ? 'Past the range \u2014 not in the composite'
        : 'Past the end \u2014 drop a strip here to lengthen the composite'),
      mm.appendChild(r5),
      (my = r5),
      mm.appendChild(mt),
      r1 != null && mm.querySelector('.lib-seq__hweight[data-track="' + r1 + '"]')?.focus());
    let r6 = D4.getState();
    if (
      (SB(),
      Sv(r6.time || 0, r6.duration || Dq.duration),
      SG(r6.paused || r6.finished),
      SU && SK?.kind === 'track')
    ) {
      let rw = Dq.tracks.find((rV) => rV.head?.track === SK.track)?.head;
      rw && !rw.isBase ? SZ(rw) : SA();
    } else {
      if (SU && mJ(SK)) {
        let rV = Dq.tracks.flatMap((rD) => rD.strips).find((rD) => rD.edit && mW(rD.edit, SK));
        rV ? ((SK = rV.edit), Sb(rV)) : SA();
      } else {
        if (SU) {
          let rD = Dq.tracks.flatMap((rS) => rS.strips).filter((rS) => rS.edit?.props),
            rm =
              rD.find((rS) => mW(rS.edit, SK)) ??
              rD.find((rS) => rS.edit.index === SK.index && rS.edit.name === SK.name);
          rm ? ((SK = rm.edit), Sx(rm)) : SA();
        }
      }
    }
  }
  let SW = null,
    Sq = null;
  function SP() {
    (SW?.remove(), (SW = null), Sq?.remove(), (Sq = null));
    for (let r1 of mm.querySelectorAll('.lib-seq__row.is-drop')) r1.classList.remove('is-drop');
  }
  function SY(r1, r2, r3) {
    if (D3.hidden) return null;
    let r4 = mD.getBoundingClientRect();
    if (
      (Sq && !Sq.isConnected && (Sq = null),
      SW && !SW.isConnected && (SW = null),
      !Sq && Dq.canAddTrack && !mm.querySelector('.lib-seq__row--new'))
    ) {
      ((Sq = DP('div', 'lib-seq__row lib-seq__row--new')),
        (Sq.dataset.drop = JSON.stringify({ kind: 'new' })));
      let rm = DP('div', 'lib-seq__head');
      (rm.appendChild(DP('span', 'lib-seq__name', 'New track')),
        rm.appendChild(DP('span', 'lib-seq__sub', 'drop here to add')),
        Sq.appendChild(rm));
      let rS = DP('div', 'lib-seq__lane');
      ((rS.style.width = Math.max(1, Math.ceil(mB() * DW) + 2) + 'px'),
        Sq.appendChild(rS),
        mm.insertBefore(Sq, mm.querySelector('.lib-seq__row[data-drop]') || mt));
    }
    if (r1 < r4.left || r1 > r4.right || r2 < r4.top || r2 > r4.bottom) {
      for (let rE of mm.querySelectorAll('.lib-seq__row.is-drop')) rE.classList.remove('is-drop');
      return (SW?.remove(), (SW = null), null);
    }
    let r5 = [...mm.querySelectorAll('.lib-seq__row[data-drop]')].find((rF) => {
      let rC = rF.getBoundingClientRect();
      return r2 >= rC.top && r2 <= rC.bottom;
    });
    if (!r5) {
      for (let rF of mm.querySelectorAll('.lib-seq__row.is-drop')) rF.classList.remove('is-drop');
      return (SW?.remove(), (SW = null), null);
    }
    let r6 = JSON.parse(r5.dataset.drop);
    for (let rC of mm.querySelectorAll('.lib-seq__row.is-drop'))
      rC !== r5 && rC.classList.remove('is-drop');
    r5.classList.add('is-drop');
    let r7 = r5.querySelector('.lib-seq__lane'),
      r8 = r1 - r7.getBoundingClientRect().left,
      r9 = 1 / (Dq.fps || 30),
      rk = Math.max(0, Math.round(r8 / DW / r9) * r9),
      rw = S8(null),
      rV = null;
    for (let rt of rw) {
      let rH = Math.abs(rt - rk) * DW;
      rH <= oa && (!rV || rH < rV.d) && (rV = { e: rt, d: rH });
    }
    rV && (rk = rV.e);
    let rD = Math.max(r9, (r3.duration || 0) * (Dq.scale || 1));
    return (
      SW || (SW = DP('div', 'lib-seq__strip is-dropghost')),
      (SW.textContent = r3.label + '  \u00B7  frame ' + S5(rk)),
      (SW.style.left = rk * DW + 'px'),
      (SW.style.width = Math.max(2, rD * DW) + 'px'),
      SW.parentElement !== r7 && r7.appendChild(SW),
      { drop: r6, start: rk }
    );
  }
  function Sv(r1) {
    let r2 = (Dq.offset || 0) + r1;
    ((mt.hidden = Dq.playing === !1),
      (mt.style.left = fo + r2 * DW + 'px'),
      (DG.textContent = Dq.playing === !1 ? '' : D7(r2) + ' / ' + D7(Dq.duration)),
      mE === 'graph' && mC.tick(r1));
  }
  function SB() {
    let r1 = Dv.contains(document.activeElement) ? document.activeElement.dataset?.key : null;
    DN.classList.toggle('is-on', !!Dq.advanced);
    let r2 = (Dq.tracks || []).some((r6) => (r6.strips || []).some((r7) => mJ(r7.edit)));
    if (
      ((DM.hidden = m0.hidden = !Dq.advanced && !r2),
      DN.setAttribute('aria-pressed', String(!!Dq.advanced)),
      (m8.innerHTML = ''),
      (m8.hidden = !(Dq.previewing && Dq.hasSequence)),
      !m8.hidden)
    ) {
      let r6 = DP('button', 'lib-btn lib-btn--sm', 'Back to sequence');
      ((r6.type = 'button'),
        (r6.title = 'Previewing ' + Dq.previewing),
        r6.addEventListener('click', () => DD()),
        m8.appendChild(r6));
    }
    if (((m9.innerHTML = ''), (m9.hidden = !Dq.hasSequence), !Dq.hasSequence)) return;
    let r3 = !!Dq.range,
      r4 = (r7, r8, r9, rk) => {
        let rw = DP('button', 'lib-btn lib-btn--sm lib-seq__range-opt' + (r8 ? ' is-on' : ''), r7);
        return (
          (rw.type = 'button'),
          (rw.title = rk),
          rw.setAttribute('aria-pressed', String(r8)),
          rw.addEventListener('click', r9),
          rw
        );
      };
    if (
      (m9.append(
        DP('span', 'lib-seq__range-label', 'Range'),
        r4('Auto', !r3, () => DV('auto'), 'The strips decide how long it is'),
        r4(
          'Manual',
          r3,
          () => DV('manual'),
          'Set the start and end yourself, like Blender \u2014 the timeline stops resizing, and the export is exactly this range',
        ),
      ),
      r3)
    ) {
      let r7 = Dq.fps || 30,
        r8 = Dq.range,
        r9 = (rD, rm) => {
          if (!Number.isFinite(rm)) {
            SB();
            return;
          }
          let rS = (rE) => (Math.max(1, rE) - 1) / r7;
          DV(
            rD === 'rs'
              ? { start: Math.min(rS(rm), r8.end - 1 / r7), end: r8.end }
              : { start: r8.start, end: Math.max(rS(rm), r8.start + 1 / r7) },
          );
        },
        rk = (rD, rm, rS) => {
          let rE = document.createElement('input');
          return (
            (rE.type = 'number'),
            (rE.className = 'lib-seq__range-num'),
            (rE.min = '1'),
            (rE.step = '1'),
            (rE.value = String(rm)),
            (rE.dataset.key = rD),
            (rE.title = rS),
            rE.setAttribute('aria-label', rS),
            rE.addEventListener('keydown', (rF) => {
              (rF.stopPropagation(),
                rF.key === 'Enter' && (rF.preventDefault(), r9(rD, Math.round(Number(rE.value)))));
            }),
            rE.addEventListener('change', () =>
              setTimeout(() => {
                rE.isConnected && r9(rD, Math.round(Number(rE.value)));
              }, 0),
            ),
            rE
          );
        },
        rw = () => (Dq.offset || 0) + (D4.getState().time || 0),
        rV = (rD, rm, rS) => {
          let rE = DP('button', 'lib-btn lib-btn--sm lib-seq__range-mark', rD);
          return ((rE.type = 'button'), (rE.title = rm), rE.addEventListener('click', rS), rE);
        };
      m9.append(
        DP('span', 'lib-seq__range-sub', 'start'),
        rk('rs', S5(r8.start), 'Start frame'),
        rV('\u21E4', 'Start at the playhead', () =>
          DV({ start: Math.min(rw(), r8.end - 1 / r7), end: r8.end }),
        ),
        DP('span', 'lib-seq__range-sub', 'end'),
        rk('re', S5(r8.end), 'End frame'),
        rV('\u21E5', 'End at the playhead', () =>
          DV({ start: r8.start, end: Math.max(rw(), r8.start + 1 / r7) }),
        ),
      );
    }
    let r5 = DP('button', 'lib-btn lib-btn--sm lib-seq__clear', 'Clear');
    if (
      ((r5.type = 'button'),
      (r5.title = 'Remove every strip and start from scratch \u2014 Ctrl+Z brings them back'),
      r5.addEventListener('click', () => Dm()),
      m9.appendChild(r5),
      r1)
    ) {
      let rD = Dv.querySelector('[data-key="' + r1 + '"]');
      rD && (rD.focus(), rD.select?.());
    }
  }
  function SG(r1) {
    ((DB.textContent = r1 ? '\u25B6' : '\u23F8'),
      DB.setAttribute('aria-label', r1 ? 'Play' : 'Pause'));
  }
  function Sg(r1) {
    r1 != null && Sm({ kind: 'layer', uid: r1 });
  }
  function SI(r1) {
    let r2 = DE(r1);
    r2 == null ? mV('The playhead is not inside that strip') : (Sg(r2), mV('Split'));
  }
  function SN(r1) {
    let r2 = DF(r1);
    r2 != null && (Sg(r2), mV('Duplicated'));
  }
  function SM(r1) {
    let r2 = D4.getState(),
      r3 = Dq.fps || 30;
    (r2.paused || D4.setPaused(!0), Dq.hasSequence && Dq.playing === !1 && DD());
    let r4 = Dq.clock ?? Dq.duration,
      r5 = Math.round((r2.time || 0) * r3) / r3 + r1 / r3;
    D4.seek(Math.min(r4, Math.max(0, r5)));
  }
  function r0() {
    let r1 = me && Dq.tracks.flatMap((r4) => r4.strips).find((r4) => r4.edit && mW(r4.edit, me));
    if (!r1) {
      ((mg = null), mM(1));
      return;
    }
    let r2 = Math.max(100, mD.clientWidth - fo - 24),
      r3 = Math.max(1 / (Dq.fps || 30), r1.end - r1.start);
    (mg == null && Sy(),
      (Dy = Math.min(40, Math.max(1, (r2 * 0.8) / r3 / (mg || 1)))),
      Sy(),
      (mD.scrollLeft = Math.max(0, r1.start * DW - r2 * 0.1)));
  }
  return (
    window.addEventListener('keydown', (r1) => {
      if (D3.hidden) return;
      let r2 = r1.target;
      if (r2 && (r2.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(r2.tagName))) return;
      let r3 = r1.ctrlKey || r1.metaKey,
        r4 = r1.key;
      if (mE === 'graph') {
        if (mC.key(r1)) {
          r1.preventDefault();
          return;
        }
        if (!r3 && (r4 === 'ArrowLeft' || r4 === 'ArrowRight'))
          (r1.preventDefault(), SM((r4 === 'ArrowLeft' ? -1 : 1) * (r1.shiftKey ? 10 : 1)));
        else {
          if (!r3 && !r1.altKey && (r4 === 'ArrowUp' || r4 === 'ArrowDown'))
            (r1.preventDefault(), SC(r4 === 'ArrowUp' ? -1 : 1));
          else {
            if (!r3 && !r1.altKey && (r4 === 'k' || r4 === 'K')) {
              if ((r1.preventDefault(), !Dq.advanced && !Dq.poseKeys)) {
                mV('Keys are in Advanced mode \u2014 the switch in this bar');
                return;
              }
              let rw = mC.keyHere(),
                rV = mC.controls(),
                rD =
                  rV.length || !rw.length
                    ? DT(rV.map((rm) => ({ kind: 'key', group: rm.group, key: rm.key })))
                    : null;
              mV(
                [rw.length ? 'Keyed ' + rw.join(', ') : '', rD || '']
                  .filter(Boolean)
                  .join(' \u00B7 ') || 'Pick a curve, or use a slider, and K keys it here',
              );
            } else {
              if (!r3 && r4 === 'End') (r1.preventDefault(), D4.seek(Dq.clock ?? Dq.duration));
              else {
                if (r3 && (r4 === 'c' || r4 === 'C')) {
                  if (window.getSelection?.()?.toString()) return;
                  let rm = Dq.tracks
                      .flatMap((rF) => rF.strips)
                      .map((rF) => rF.edit)
                      .filter(mJ),
                    rS = mC
                      .picked()
                      .map((rF) =>
                        rm.find(
                          (rC) =>
                            (rC.group || 'adjust') === rF.group &&
                            rC.key === rF.key &&
                            rC.uid === rF.frame,
                        ),
                      )
                      .filter(Boolean);
                  if (!rS.length) return;
                  r1.preventDefault();
                  let rE = DX(rS);
                  rE && ((mF = !0), mV(rE > 1 ? 'Copied ' + rE + ' keys' : 'Copied a key'));
                } else {
                  if (r3 && (r4 === 'v' || r4 === 'V')) {
                    if (!mF || !DR()) return;
                    (r1.preventDefault(),
                      Promise.resolve(De(null)).then((rF) => {
                        !rF ||
                          Array.isArray(rF) ||
                          !Array.isArray(rF.keys) ||
                          (mC.pick(
                            rF.keys.map((rC) => ({
                              group: rC.group || 'adjust',
                              key: rC.key,
                              frame: rC.uid,
                            })),
                          ),
                          rF.keys.length &&
                            mV(
                              rF.keys.length > 1
                                ? 'Pasted ' + rF.keys.length + ' keys'
                                : 'Pasted a key',
                            ));
                      }));
                  }
                }
              }
            }
          }
        }
        return;
      }
      let r5 = me?.kind === 'layer' ? me : null,
        r6 = mz(),
        r7 = (rF) => mA(rF.map((rC) => ({ kind: 'layer', uid: rC }))),
        r8 = mU(),
        r9 = mK(),
        rk = r8.length
          ? ' \u2014 Adjust and IK bands skipped'
          : r9.length
            ? ' \u2014 keys skipped'
            : '';
      if (!r3 && !r1.altKey && (r4 === 'Delete' || r4 === 'Backspace')) {
        let rF = mQ();
        if (!rF.length) return;
        (r1.preventDefault(),
          mT([]),
          SA(),
          rF.length === 1 && rF[0].kind === 'layer' ? DS(rF[0]) : Dj(rF));
      } else {
        if (!r3 && !r1.altKey && (r4 === 't' || r4 === 'T')) {
          if (!r9.length) {
            mV('Select keys first: T sets how they go to the next key');
            return;
          }
          (r1.preventDefault(), SE());
        } else {
          if (!r3 && !r1.altKey && (r4 === 's' || r4 === 'S')) {
            if ((r1.preventDefault(), !r6.length)) {
              mV(
                r8.length
                  ? 'A band has one window \u2014 nothing to split'
                  : r9.length
                    ? 'A key is a moment \u2014 nothing to split'
                    : 'Select a strip to split it',
              );
              return;
            }
            if (r6.length === 1) {
              SI(r6[0]);
              return;
            }
            let rC = DO(r6);
            rC?.length
              ? (r7(rC), mV('Split ' + rC.length + rk))
              : mV('The playhead is not inside any selected strip');
          } else {
            if (r3 && (r4 === 'd' || r4 === 'D')) {
              if ((r1.preventDefault(), r6.length > 1)) {
                let rt = Dz(r6);
                rt?.length && (r7(rt), mV('Duplicated ' + rt.length + rk));
              } else
                r6.length === 1
                  ? SN(r6[0])
                  : r8.length && mV('A band has one window \u2014 nothing to duplicate');
            } else {
              if (r3 && (r4 === 'c' || r4 === 'C')) {
                if (window.getSelection?.()?.toString()) return;
                if (!r6.length && r9.length) {
                  r1.preventDefault();
                  let rH = DX(r9);
                  rH && ((mF = !0), mV(rH > 1 ? 'Copied ' + rH + ' keys' : 'Copied a key'));
                  return;
                }
                if (!r6.length) return;
                (r1.preventDefault(),
                  DH(r6) &&
                    ((mF = !1), mV((r6.length > 1 ? 'Copied ' + r6.length : 'Copied') + rk)));
              } else {
                if (r3 && (r4 === 'v' || r4 === 'V')) {
                  if (!DR()) return;
                  (r1.preventDefault(),
                    Promise.resolve(De(r5)).then((re) => {
                      if (re && !Array.isArray(re) && Array.isArray(re.keys)) {
                        (mA(re.keys),
                          re.keys.length &&
                            mV(
                              re.keys.length > 1
                                ? 'Pasted ' + re.keys.length + ' keys'
                                : 'Pasted a key',
                            ));
                        return;
                      }
                      re?.length && (r7(re), mV(re.length > 1 ? 'Pasted ' + re.length : 'Pasted'));
                    }));
                } else {
                  if (r3 && (r4 === 'a' || r4 === 'A'))
                    (r1.preventDefault(),
                      mA(
                        Dq.tracks
                          .flatMap((re) => re.strips)
                          .filter((re) => re.edit?.kind === 'layer' || mZ(re.edit))
                          .map((re) => re.edit),
                      ));
                  else {
                    if (!r3 && !r1.altKey && r4 === 'Escape')
                      mQ().length && (r1.preventDefault(), mA([]));
                    else {
                      if (!r3 && !r1.altKey && (r4 === 'm' || r4 === 'M')) {
                        if (
                          (r1.preventDefault(), me?.kind === 'ik' || (mJ(me) && me.group === 'ik'))
                        ) {
                          let rR = Dq.tracks.find(
                            (rQ) => rQ.head?.kind === 'ik' && rQ.head.key === me.key,
                          )?.head;
                          rR && (DU(rR.key, { mute: !rR.mute }), mV(rR.mute ? 'Unmuted' : 'Muted'));
                          return;
                        }
                        if (mJ(me) && me.group === 'pose') {
                          let rQ = Dq.tracks.find(
                            (rj) => rj.head?.kind === 'pose' && rj.head.key === me.key,
                          )?.head;
                          rQ && (DA(rQ.key, { mute: !rQ.mute }), mV(rQ.mute ? 'Unmuted' : 'Muted'));
                          return;
                        }
                        if (me?.kind === 'adjust' || (mJ(me) && me.group !== 'ik')) {
                          let rj = Dq.tracks.find(
                            (rz) => rz.head?.kind === 'adjust' && rz.head.key === me.key,
                          )?.head;
                          rj && (DZ(rj.key, { mute: !rj.mute }), mV(rj.mute ? 'Unmuted' : 'Muted'));
                          return;
                        }
                        let re = r5 && Dq.tracks.find((rz) => rz.head?.track === r5.track);
                        if (!re) {
                          mV('Select a strip to mute its layer');
                          return;
                        }
                        if (re.head.isBase) {
                          mV('Base cannot be muted \u2014 it grounds every bone');
                          return;
                        }
                        (DJ(re.head.track, { mute: !re.head.mute }),
                          mV(re.head.mute ? 'Unmuted' : 'Muted'));
                      } else {
                        if (!r3 && (r4 === 'ArrowLeft' || r4 === 'ArrowRight'))
                          (r1.preventDefault(),
                            SM((r4 === 'ArrowLeft' ? -1 : 1) * (r1.shiftKey ? 10 : 1)));
                        else {
                          if (!r3 && !r1.altKey && (r4 === 'ArrowUp' || r4 === 'ArrowDown'))
                            (r1.preventDefault(), SC(r4 === 'ArrowUp' ? -1 : 1));
                          else {
                            if (!r3 && !r1.altKey && (r4 === 'k' || r4 === 'K')) {
                              if ((r1.preventDefault(), !Dq.advanced && !Dq.poseKeys)) {
                                mV('Keys are in Advanced mode \u2014 the switch in this bar');
                                return;
                              }
                              let rz = DT(mQ());
                              mV(
                                rz || 'Select an Adjust lane, or use a slider, and K keys it here',
                              );
                            } else
                              !r3 && (r4 === 'Home' || r4 === 'End')
                                ? (r1.preventDefault(),
                                  Dq.hasSequence && Dq.playing === !1 && DD(),
                                  D4.seek(r4 === 'Home' ? 0 : (Dq.clock ?? Dq.duration)))
                                : !r3 &&
                                  !r1.altKey &&
                                  (r4 === 'f' || r4 === 'F') &&
                                  (r1.preventDefault(), r0());
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }),
    mD.addEventListener(
      'wheel',
      (r1) => {
        if (!(r1.ctrlKey || r1.metaKey) || D3.hidden) return;
        r1.preventDefault();
        let r2 = r1.clientX - mD.getBoundingClientRect().left,
          r3 = (mD.scrollLeft + r2 - fo) / DW;
        ((Dy = Math.min(40, Math.max(1, Dy * (r1.deltaY < 0 ? 1.2 : 1 / 1.2)))),
          Sy(),
          (mD.scrollLeft = Math.max(0, r3 * DW + fo - r2)));
      },
      { passive: !1 },
    ),
    D4.onTick((r1, r2) => {
      if (D3.hidden) return;
      let r3 = Dq.clock ?? Dq.duration;
      if (r2 > 0 && Math.abs(r2 - r3) > 0.0001) {
        Sy();
        return;
      }
      if (Dq.playId !== void 0 && D4.getState().id !== Dq.playId) {
        Sy();
        return;
      }
      Sv(r1);
    }),
    D4.onState((r1) => {
      D3.hidden || SG(r1.paused || r1.finished);
    }),
    new ResizeObserver(() => {
      D3.hidden || Sy();
    }).observe(mD),
    mv('strips', { quiet: !0 }),
    {
      render: Sy,
      slot: Dg,
      setView: mv,
      view: () => mE,
      previewDrop: SY,
      clearDrop: SP,
      dropAt(r1, r2, r3) {
        let r4 = SY(r1, r2, r3);
        return (SP(), r4);
      },
    }
  );
}
function Ud({ limit: D3 = 100 } = {}) {
  let D4 = [],
    D5 = [],
    D6 = null;
  return {
    record(D7) {
      return D7 === D6
        ? !1
        : D6 === null
          ? ((D6 = D7), !1)
          : (D4.push(D6),
            D4.length > D3 && (D4 = D4.slice(D4.length - D3)),
            (D6 = D7),
            (D5 = []),
            !0);
    },
    reset(D7) {
      D6 = D7;
    },
    undo() {
      return D4.length ? (D5.push(D6), (D6 = D4.pop()), D6) : null;
    },
    redo() {
      return D5.length ? (D4.push(D6), (D6 = D5.pop()), D6) : null;
    },
    canUndo: () => D4.length > 0,
    canRedo: () => D5.length > 0,
    get present() {
      return D6;
    },
    get depth() {
      return { undo: D4.length, redo: D5.length };
    },
  };
}
var Mp = (D3) => {
    let D4 = D3.replace(/-/g, '+').replace(/_/g, '/'),
      D5 = atob(D4 + '='.repeat((4 - (D4.length % 4)) % 4));
    return Uint8Array.from(D5, (D6) => D6.charCodeAt(0));
  },
  Wd = /^[A-Za-z0-9]{8,12}$/,
  Cp = /^[A-Za-z0-9_-]{22}$/;
async function Sp(D3, D4) {
  let D5 = new Uint8Array(D3);
  if (!Cp.test(D4))
    throw new Error('The link is missing its key \u2014 it was cut short when copied.');
  let D6 = await crypto.subtle.importKey('raw', Mp(D4), 'AES-GCM', !1, ['decrypt']),
    D7;
  try {
    D7 = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: D5.slice(1, 13) }, D6, D5.slice(13));
  } catch {
    throw new Error('The link\u2019s key does not match \u2014 it was changed when copied.');
  }
  return JSON.parse(new TextDecoder().decode(D7));
}
async function Vd({ state: D3, clip: D4 = null }, { origin: D5, fetchImpl: D6 = fetch } = {}) {
  if (globalThis.__actionforgePages) return globalThis.__actionforgePages.share(D3, D4);
  let D7 = await D6(D5 + '/api/share', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ state: D3, clip: D4 }),
  });
  if (D7.status === 413) throw new Error('Too much to fit in a short link.');
  if (!D7.ok) throw new Error('Could not save the link (' + D7.status + ').');
  let { id: D8 } = await D7.json();
  if (!Wd.test(D8 || '')) throw new Error('The server answered with something that is not a link.');
  return D5 + '/s/' + D8;
}
async function Gd(D3, D4 = '', { origin: D5, fetchImpl: D6 = fetch } = {}) {
  if (!Wd.test(D3)) throw new Error('That is not a short link.');
  let D7 = await D6(D5 + '/api/share/' + D3);
  if (D7.status === 404) throw new Error('This short link does not exist.');
  if (!D7.ok) throw new Error('Could not open the link (' + D7.status + ').');
  let D8 = new Uint8Array(await D7.arrayBuffer()),
    D9;
  if (D8[0] === 1) D9 = await Sp(D8, D4);
  else {
    try {
      D9 = JSON.parse(new TextDecoder().decode(D8));
    } catch {
      D9 = null;
    }
    if (!D9 || typeof D9 != 'object') throw new Error('This short link is damaged.');
  }
  return {
    state: typeof D9.state == 'string' ? D9.state : '',
    clip: typeof D9.clip == 'string' ? D9.clip : null,
  };
}
var Di = 'actionforge.progress',
  Yd = () => ({ version: 1, facts: {}, levels: {}, picks: {}, quests: {} }),
  rs = (D3) => (D3 && typeof D3 == 'object' && !Array.isArray(D3) ? D3 : {});
function $p(D3 = null) {
  let D4 = Yd(),
    D5 = new Set(),
    D6 = () => {
      if (!D3) return D4;
      try {
        let D9 = JSON.parse(D3.getItem(Di) || 'null');
        return D9 && D9.version === 1
          ? {
              version: 1,
              facts: rs(D9.facts),
              levels: rs(D9.levels),
              picks: rs(D9.picks),
              quests: rs(D9.quests),
            }
          : Yd();
      } catch {
        return D4;
      }
    },
    D7 = (D9) => {
      if (((D4 = D9), D3)) {
        let Dk = !1;
        try {
          Dk = JSON.parse(D3.getItem(Di) || 'null')?.version > 1;
        } catch {}
        try {
          Dk || D3.setItem(Di, JSON.stringify(D9));
        } catch {}
      }
      for (let Dw of D5)
        try {
          Dw();
        } catch (DV) {
          console.error(DV);
        }
    },
    D8 = (D9, Dk) => (Dk ? rs(D9.levels[Dk]) : D9.facts);
  return {
    note(D9, Dk = null) {
      let Dw = D6();
      return D8(Dw, Dk)[D9]
        ? !1
        : (Dk
            ? (Dw.levels[Dk] = { ...rs(Dw.levels[Dk]), [D9]: Date.now() })
            : (Dw.facts[D9] = Date.now()),
          D7(Dw),
          !0);
    },
    has(D9, Dk = null) {
      let Dw = D6();
      return D9.startsWith('slot:')
        ? !!Dw.picks[D9.slice(5)]
        : !!(Dw.facts[D9] || (Dk && rs(Dw.levels[Dk])[D9]));
    },
    when(D9, Dk = null) {
      let Dw = D6();
      return Dw.facts[D9] ?? (Dk ? rs(Dw.levels[Dk])[D9] : null) ?? null;
    },
    facts(D9 = null) {
      return { ...D8(D6(), D9) };
    },
    picks() {
      return { ...D6().picks };
    },
    keepPicks(D9) {
      let Dk = D6();
      JSON.stringify(Dk.picks) !== JSON.stringify(D9) && ((Dk.picks = { ...D9 }), D7(Dk));
    },
    quest(D9) {
      let Dk = D6().quests[D9];
      return Dk ? { ...Dk } : null;
    },
    keepQuest(D9, Dk) {
      let Dw = D6();
      JSON.stringify(Dw.quests[D9] ?? null) !== JSON.stringify(Dk) &&
        ((Dw.quests[D9] = { ...Dk }), D7(Dw));
    },
    forget(D9 = null) {
      let Dk = D6();
      (D9
        ? (delete Dk.levels[D9], delete Dk.quests[D9])
        : ((Dk.facts = {}), (Dk.levels = {}), (Dk.quests = {})),
        D7(Dk));
    },
    watch(D9) {
      return (D5.add(D9), () => D5.delete(D9));
    },
    changed() {
      for (let D9 of D5)
        try {
          D9();
        } catch (Dk) {
          console.error(Dk);
        }
    },
  };
}
function Ap() {
  try {
    return globalThis.localStorage ?? null;
  } catch {
    return null;
  }
}
var as = $p(Ap());
try {
  globalThis.addEventListener?.('storage', (D3) => {
    (D3.key === Di || D3.key === null) && as.changed();
  });
} catch {}
var Qs = 'actionforge.scene.';
function Hd({
  storage: D3 = globalThis.localStorage,
  keep: D4 = 10,
  now: D5 = () => Date.now(),
} = {}) {
  let D6 = null,
    D7 = null,
    D8 = (Dm, DS = null) => {
      try {
        return Dm();
      } catch {
        return DS;
      }
    },
    D9 = (Dm) =>
      Dm?.aside && typeof Dm.aside == 'object'
        ? { state: String(Dm.aside.state ?? ''), clip: Dm.aside.clip ?? null }
        : null,
    Dk = (Dm) => JSON.stringify([Dm?.state ?? '', Dm?.clip ?? null, Dm?.project ?? null, D9(Dm)]);
  function Dw() {
    let Dm = [];
    return (
      D8(() => {
        for (let DS = 0; DS < D3.length; DS++) {
          let DE = D3.key(DS);
          if (!DE || !DE.startsWith(Qs)) continue;
          let DF = D8(() => JSON.parse(D3.getItem(DE)));
          DF && typeof DF.state == 'string' && DF.id && Dm.push(DF);
        }
      }),
      Dm.sort((DS, DE) => (DE.updated || 0) - (DS.updated || 0))
    );
  }
  function DV(Dm = null) {
    return (
      (D6 = Dm?.id || '' + D5().toString(36) + Math.random().toString(36).slice(2, 7)),
      (D7 = Dm ? Dk(Dm) : null),
      D6
    );
  }
  function DD({ state: Dm = '', clip: DS = null, project: DE = null, aside: DF = null } = {}) {
    D6 || DV();
    let DC = Dk({ state: Dm, clip: DS, project: DE, aside: DF });
    if (DC === D7) return !1;
    let Dt = D8(() => JSON.parse(D3.getItem(Qs + D6))),
      DH = D5(),
      De = D9({ aside: DF }),
      DR = {
        id: D6,
        state: Dm,
        clip: DS,
        project: DE,
        ...(De ? { aside: De } : {}),
        created: Dt?.created ?? DH,
        updated: DH,
      };
    if (!D8(() => (D3.setItem(Qs + D6, JSON.stringify(DR)), !0), !1)) return !1;
    D7 = DC;
    for (let DQ of Dw().slice(D4)) D8(() => D3.removeItem(Qs + DQ.id));
    return !0;
  }
  return {
    list: Dw,
    latest: () => Dw()[0] ?? null,
    begin: DV,
    save: DD,
    remove: (Dm) => D8(() => D3.removeItem(Qs + Dm)),
    current: () => D6,
  };
}
var Xd = 'cgstuff.library.poseFingers',
  Jd = 'cgstuff.library.poseList',
  Zd = 'cgstuff.library.poseXMirror',
  Qd = 'cgstuff.library.poseAxes',
  Ep = ['global', 'local', 'view', 'parent'],
  eu = 'cgstuff.library.poseSnap',
  Lp = () => {
    try {
      let D3 = Number(localStorage.getItem(eu));
      return D3 === 5 || D3 === 15 ? D3 : 0;
    } catch {
      return 0;
    }
  },
  sa = (D3, D4) => {
    try {
      let D5 = localStorage.getItem(D3);
      return D5 == null ? D4 : D5 === '1';
    } catch {
      return D4;
    }
  },
  ia = (D3, D4) => {
    try {
      localStorage.setItem(D3, D4 ? '1' : '0');
    } catch {}
  },
  Op = [
    ['Spine and head', (D3) => /^(pelvis|spine_\d+|neck_\d+|head)$/i.test(D3)],
    ['Left arm', (D3) => /^(clavicle|upperarm|lowerarm)/.test(D3) && D3.endsWith('_l')],
    ['Left hand', (D3) => D3 === 'hand_l' || (V5(D3) && D3.endsWith('_l'))],
    ['Right arm', (D3) => /^(clavicle|upperarm|lowerarm)/.test(D3) && D3.endsWith('_r')],
    ['Right hand', (D3) => D3 === 'hand_r' || (V5(D3) && D3.endsWith('_r'))],
    ['Left leg', (D3) => /^(thigh|calf|foot|ball)/.test(D3) && D3.endsWith('_l')],
    ['Right leg', (D3) => /^(thigh|calf|foot|ball)/.test(D3) && D3.endsWith('_r')],
  ];
function tu({
  mount: D3,
  player: D4,
  clock: D5 = () => null,
  onChange: D6 = () => {},
  onPending: D7 = () => {},
}) {
  let D8 = [],
    D9 = 0,
    Dk = null,
    Dw = (m7) => D4.posePartner?.(m7) ?? Vm(m7),
    DV = (m7) => D4.getRigDescription?.()?.sides?.[m7]?.ends ?? '_' + m7,
    DD = (m7, m8, m9) => {
      let mk = document.createElement(m7);
      return (m8 && (mk.className = m8), m9 != null && (mk.textContent = m9), mk);
    },
    Dm = (m7, m8, m9, mk = 'lib-btn lib-btn--sm') => {
      let mw = DD('button', mk, m7);
      return (
        (mw.type = 'button'),
        (mw.title = m8),
        mw.addEventListener('click', (mV) => {
          (mV.stopPropagation(), m9(mw, mV));
        }),
        mw
      );
    },
    DS = (m7) =>
      String(m7 || '')
        .replace(/_(l|r)$/, (m8, m9) => (m9 === 'l' ? ' L' : ' R'))
        .replace(/_/g, ' ')
        .replace(/^\w/, (m8) => m8.toUpperCase());
  function DE({ quiet: m7 = !1 } = {}) {
    (D4.setPoses(D8.filter(Vt)), D6(), m7 || m2());
  }
  function DF() {
    return (
      D8.length || (D8 = [VF({ id: DC(), name: 'Pose 1', keys: [] })]),
      (D9 = Math.min(Math.max(0, D9), D8.length - 1)),
      D9
    );
  }
  let DC = () => 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
    Dt = null,
    DH = (m7, m8, m9, mk) => {
      let mw = {};
      for (let { bone: mV, target: mD, base: mm } of m9)
        mw[mV] = w7({ poses: m7, index: m8, bone: mV, u: mk, base: mm, target: mD });
      return mw;
    };
  D4.onPose(({ bones: m7, u: m8 }) => {
    let m9 = D5();
    if (!m9 || m8 == null || !m7?.length) return;
    let mk = DF(),
      mw = DH(D8, mk, m7, m8);
    ((D8[mk] = Dt?.(D8[mk], m8, m9.frames, mw) ?? wQ(D8[mk], m8, m9.frames, mw)), DE());
  });
  function De() {
    ((D8 = [...D8, VF({ id: DC(), name: 'Pose ' + (D8.length + 1), keys: [] })]),
      (D9 = D8.length - 1),
      m2());
  }
  function DR(m7, m8) {
    D8[m7] && ((D8[m7] = VF({ ...D8[m7], ...m8 })), DE());
  }
  function DQ(m7) {
    D8[m7] &&
      ((Vt(D8[m7]) &&
        !confirm(
          'Delete the pose layer \u201C' +
            D8[m7].name +
            '\u201D and its keys? Ctrl+Z brings it back.',
        )) ||
        ((D8 = D8.filter((m8, m9) => m9 !== m7)),
        (D9 = Math.min(D9, Math.max(0, D8.length - 1))),
        DE()));
  }
  function Dj(m7 = D9) {
    if (D4.getState().pose?.pending) return D4.keyPendingPose();
    let m8 = D5(),
      m9 = D8[m7] || { keys: [] },
      mk = m7 === D9 ? Dz() : [];
    if (!m8 || (!Vt(D8[m7]) && !mk.length)) return !1;
    let mw = w9(m9, m8.u),
      mV = mk.length ? Object.fromEntries(mk.map((mD) => [mD, mw[mD] ?? [0, 0, 0, 1]])) : mw;
    return (D8[m7] || (m7 = DF()), (D8[m7] = wQ(D8[m7], m8.u, m8.frames, mV)), DE(), !0);
  }
  let Dz = () => D4.getState().pose?.dataBones ?? [],
    DO = {
      breakdown: 'Breakdown',
      push: 'Push Pose',
      relax: 'Relax Pose',
      blend: 'Blend to Neighbor',
    },
    DJ = null,
    DZ = null,
    DU = 0;
  window.addEventListener(
    'pointermove',
    (m7) => {
      DZ = m7.clientX;
    },
    { capture: !0, passive: !0 },
  );
  function DK(m7, m8 = null) {
    let m9 = D4.viewportRect?.(),
      mk = m8 ?? Object.assign(document.createElement('div'), { className: 'lib-modalhint' });
    return (
      m9 && Object.assign(mk.style, { left: m9.left + 12 + 'px', top: m9.top + 12 + 'px' }),
      (mk.textContent = m7),
      mk.isConnected || document.body.appendChild(mk),
      mk
    );
  }
  function DT(m7) {
    let m8 = DK(m7);
    (clearTimeout(DU), (DU = setTimeout(() => m8.remove(), 1800)));
  }
  function DA(m7) {
    let m8 = D5(),
      m9 = Dz(),
      mk = D8[D9];
    if (!m8) return;
    if (!m9.length) {
      DT(DO[m7] + ': pick bones first');
      return;
    }
    let mw = Math.round(VX(m8.u, m8.frames) * (m8.frames - 1));
    if (!mk || !ww(mk, m9, mw, m8.frames).any) {
      DT(DO[m7] + ': the picked bones have no keys on this layer to slide between');
      return;
    }
    D4.getState().paused || D4.setPaused(!0);
    let mV = D4.viewportRect?.();
    ((DJ = {
      mode: m7,
      i: D9,
      L0: mk,
      u: VX(m8.u, m8.frames),
      frame: mw,
      frames: m8.frames,
      bones: m9,
      f: 0.5,
      raw: 0.5,
      last: DZ ?? (mV ? mV.left + mV.width / 2 : 0),
      typed: '',
      fine: !1,
      steps: !1,
      over: !1,
      axes: null,
      hint: DK(''),
    }),
      window.addEventListener('pointermove', DL, !0),
      window.addEventListener('pointerdown', Db, !0),
      window.addEventListener('contextmenu', Dn, !0),
      window.addEventListener('keydown', Dx, !0),
      window.addEventListener('keyup', Dx, !0),
      DX());
  }
  function Dn(m7) {
    (m7.preventDefault(), m7.stopImmediatePropagation());
  }
  function DX() {
    let m7 = DJ,
      m8 = wV(m7.L0, m7.bones, m7.frame, m7.frames, m7.mode, m7.f, { axes: m7.axes });
    m8 && ((D8[m7.i] = wQ(m7.L0, m7.u, m7.frames, m8.bones)), D4.setPoses(D8.filter(Vt)));
    let m9 = m7.typed ? '[' + m7.typed + '|]' : Math.round(m7.f * 100) + '%';
    DK(
      DO[m7.mode] +
        ': ' +
        m9 +
        ' \u2014 between frame ' +
        ((m8?.prev ?? 0) + 1) +
        ' and frame ' +
        ((m8?.next ?? 0) + 1) +
        (m7.axes ? ' \u00B7 ' + m7.axes.toUpperCase() + ' only (angle bones)' : '') +
        ' \u2014 move the pointer across (Shift finer, Ctrl in tenths, E ' +
        (m7.over ? 'held to 0\u2013100%' : 'past the ends') +
        ') \u00B7 X Y Z an axis \u00B7 type a number \u00B7 click or Enter keeps \u00B7 Esc or right-click cancels',
      m7.hint,
    );
  }
  function DL(m7) {
    let m8 = DJ;
    if (!m8) return;
    if (((m8.fine = m7.shiftKey), (m8.steps = m7.ctrlKey || m7.metaKey), m8.typed)) {
      m8.last = m7.clientX;
      return;
    }
    ((m8.raw += ((m7.clientX - m8.last) / 300) * (m8.fine ? 1 / 8 : 1)), (m8.last = m7.clientX));
    let m9 = m8.raw;
    (m8.steps && (m9 = Math.round(m9 * 10) / 10),
      (m8.f = m8.over ? m9 : Math.min(1, Math.max(0, m9))),
      DX());
  }
  function Db(m7) {
    DJ && (Dn(m7), Dy(m7.button === 0));
  }
  function Dx(m7) {
    let m8 = DJ;
    if (!m8) return;
    let m9 = m7.key;
    if (m7.type === 'keyup') {
      (m9 === 'Shift' && (m8.fine = !1), (m9 === 'Control' || m9 === 'Meta') && (m8.steps = !1));
      return;
    }
    if (m9 === 'Shift') {
      m8.fine = !0;
      return;
    }
    if (m9 === 'Control' || m9 === 'Meta') {
      m8.steps = !0;
      return;
    }
    if (m9 === 'Alt') return;
    if ((m7.preventDefault(), m7.stopImmediatePropagation(), m9 === 'Escape')) {
      Dy(!1);
      return;
    }
    if (m9 === 'Enter') {
      Dy(!0);
      return;
    }
    let mk = m9.toLowerCase();
    if (mk === 'e') ((m8.over = !m8.over), m8.over || (m8.f = Math.min(1, Math.max(0, m8.f))));
    else {
      if (mk === 'x' || mk === 'y' || mk === 'z') m8.axes = m8.axes === mk ? null : mk;
      else {
        if (/^[0-9.]$/.test(m9)) m8.typed += m9;
        else {
          if (m9 === '-') m8.typed = m8.typed.startsWith('-') ? m8.typed.slice(1) : '-' + m8.typed;
          else {
            if (m9 === 'Backspace') m8.typed = m8.typed.slice(0, -1);
            else return;
          }
        }
      }
    }
    let mw = /[0-9]/.test(m8.typed) ? Number(m8.typed) : NaN;
    (Number.isFinite(mw) &&
      (m8.f = m8.raw = m8.over ? mw / 100 : Math.min(1, Math.max(0, mw / 100))),
      DX());
  }
  function Dy(m7) {
    let m8 = DJ;
    m8 &&
      ((DJ = null),
      window.removeEventListener('pointermove', DL, !0),
      window.removeEventListener('pointerdown', Db, !0),
      window.removeEventListener('keydown', Dx, !0),
      window.removeEventListener('keyup', Dx, !0),
      setTimeout(() => window.removeEventListener('contextmenu', Dn, !0), 600),
      m8.hint.remove(),
      m7 ? DE() : ((D8[m8.i] = m8.L0), D4.setPoses(D8.filter(Vt))));
  }
  window.addEventListener(
    'keydown',
    (m7) => {
      if (
        DJ ||
        (m7.key !== 'e' && m7.key !== 'E') ||
        m7.metaKey ||
        m7.target?.closest?.('input, textarea, select, [contenteditable]')
      )
        return;
      let m8 = D4.getState().pose || {};
      if (!m8.mode || m8.modal || !D4.overViewport?.()) return;
      let m9 =
        m7.shiftKey && m7.altKey
          ? 'blend'
          : m7.shiftKey && !m7.ctrlKey
            ? 'breakdown'
            : m7.ctrlKey && !m7.altKey && !m7.shiftKey
              ? 'push'
              : m7.altKey && !m7.ctrlKey && !m7.shiftKey
                ? 'relax'
                : null;
      m9 && (m7.preventDefault(), m7.stopImmediatePropagation(), DA(m9));
    },
    !0,
  );
  let DW = () => (Dz().length ? Dz() : VH(D8[D9] || { keys: [] })),
    Dq = () => {
      let m7 = D5();
      return m7 ? { u: VX(m7.u, m7.frames), frames: m7.frames } : null;
    },
    DP = (m7) => (m8) => D4.poseBase(m8, m7);
  function DY() {
    let m7 = D8[D9];
    if (!m7) return;
    let m8 = m7;
    for (let m9 of Dz()) m8 = wf(m8, m9);
    ((D8[D9] = m8), DE());
  }
  function Dv() {
    let m7 = Dq(),
      m8 = DW();
    !m7 || !m8.length || ((Dk = wS(D8, m8, m7.u, DP(m7.u))), m2());
  }
  function DB(m7) {
    let m8 = Dq();
    if (!m8 || !Object.keys(m7).length) return;
    let m9 = DF();
    ((D8[m9] = wQ(
      D8[m9],
      m8.u,
      m8.frames,
      wF({ poses: D8, index: m9, u: m8.u, targets: m7, baseOf: DP(m8.u) }),
    )),
      DE());
  }
  let DG = () => Dk && DB(Dk),
    Dg = () => Dk && DB(wt(Dk, Dw));
  function DI() {
    let m7 = Dq(),
      m8 = DW();
    if (!m7 || !m8.length) return;
    let m9 = DP(m7.u);
    DB(Object.fromEntries(m8.map((mk) => [mk, m9(mk)])));
  }
  function Dh(m7) {
    let m8 = Dq();
    if (!m8) return;
    let m9 = DV(m7),
      mk = [
        ...new Set(
          DW()
            .filter((mw) => Dw(mw) !== mw)
            .map((mw) => (mw.endsWith(m9) ? mw : Dw(mw))),
        ),
      ];
    mk.length && DB(we(wS(D8, mk, m8.u, DP(m8.u)), m7, { ends: m9, partner: Dw }));
  }
  let DN = null;
  function DM(m7) {
    let m8 = DD('span', 'lib-pose__euler'),
      m9 = m7.dataBone,
      mk = D8[D9],
      mw = mk && VH(mk).includes(m9) ? VJ(mk).get(m9) : null,
      mV = ['X', 'Y', 'Z'].map((mm) => {
        let mS = DD('label', 'lib-pose__axis', mm),
          mE = document.createElement('input');
        return (
          (mE.type = 'number'),
          (mE.step = '1'),
          (mE.className = 'lib-pose__num'),
          (mE.title =
            mm +
            ': the layer\u2019s turn on this frame, degrees about the bone\u2019s own axes \u2014 Enter keys it'),
          mE.addEventListener('keydown', (mF) => {
            mF.key === 'Enter'
              ? (mF.preventDefault(), m1())
              : mF.key === 'Escape' && (mF.preventDefault(), (DN.editing = !1), m0(), mE.blur());
          }),
          mS.appendChild(mE),
          m8.appendChild(mS),
          mE
        );
      });
    (m8.addEventListener('focusin', () => {
      DN && (DN.editing = !0);
    }),
      m8.addEventListener('focusout', (mm) => {
        DN?.editing && !m8.contains(mm.relatedTarget) && m1();
      }));
    let mD = mk && VR(mk, m9) ? VZ(mk.curves[m9]) : null;
    return (
      (DN = {
        bone: m9,
        inputs: mV,
        at: (mm) => (mD ? mD(mm) : Vk(mw ? mw(mm) : [0, 0, 0, 1])),
        shown: [0, 0, 0],
        editing: !1,
      }),
      m0(),
      m8
    );
  }
  function m0() {
    let m7 = Dq();
    if (!DN || !m7 || DN.editing || !DN.inputs[0].isConnected) return;
    let m8 = DN.at(m7.u).map((m9) => (Math.abs(m9) < 0.005 ? 0 : m9));
    ((DN.shown = m8.map((m9) => Number(m9.toFixed(2)))),
      DN.inputs.forEach((m9, mk) => {
        let mw = m8[mk].toFixed(2);
        m9.value !== mw && (m9.value = mw);
      }));
  }
  function m1() {
    let m7 = Dq();
    if (!m7 || !DN) return;
    DN.editing = !1;
    let m8 = DN.inputs.map((mk) => Number(mk.value) || 0);
    if (m8.every((mk, mw) => Math.abs(mk - DN.shown[mw]) < 1e-9)) {
      m0();
      return;
    }
    let m9 = DF();
    ((D8[m9] =
      Dt?.(D8[m9], m7.u, m7.frames, { [DN.bone]: VV(m8) }) ??
      wz(D8[m9], DN.bone, m7.u, m7.frames, m8)),
      DE());
  }
  function m2() {
    ((DN = null), (D3.innerHTML = ''));
    let m7 = DD('div', 'lib-comp__head');
    (m7.appendChild(DD('span', 'lib-comp__title', 'Pose')),
      m7.appendChild(Dm('+ Layer', 'A new pose layer \u2014 posed bones key the selected one', De)),
      D3.appendChild(m7));
    let m8 = D4.getState().pose || {},
      m9 = m8.bones || [],
      mk = DD('div', 'lib-pose__bone');
    if (m9.length) {
      let mL =
          m9.length > 3
            ? m9.length + ' bones \u2014 ' + m9.slice(-3).map(DS).join(', ') + '\u2026'
            : m9.map(DS).join(', '),
        mb = DD('span', 'lib-pose__bone-name', mL);
      ((mb.title = m9.map(DS).join(', ')),
        mk.appendChild(mb),
        m8.dataBone &&
          m8.dataBone !== m8.bone &&
          mk.appendChild(DD('span', 'lib-pose__bone-note', 'mirrored \u2014 keys the other side')),
        mk.appendChild(DM(m8)),
        mk.appendChild(
          Dm(
            '\u25C6 Key',
            'Key the selected layer here, every bone it holds (K)',
            () => Dj(),
            'lib-btn lib-btn--sm',
          ),
        ),
        mk.appendChild(
          Dm(
            '+ Children',
            'Pick every joint below the picked ones too \u2014 a hand\u2019s fingers, a finger\u2019s joints',
            () => D4.pickPoseChildren(),
          ),
        ),
        mk.appendChild(
          Dm(
            m9.length > 1 ? 'Remove bones' : 'Remove bone',
            'Take the picked bones off this layer on every frame \u2014 back on the animation',
            DY,
          ),
        ));
    } else
      mk.appendChild(
        DD(
          'span',
          'lib-comp__hint',
          'Click a joint in the viewport, then turn it with the gizmo \u2014 Shift+click adds joints, + Children the ones below. Letting go keys them on this frame.',
        ),
      );
    D3.appendChild(mk);
    let mw = DD('div', 'lib-pose__bone');
    mw.appendChild(DD('span', 'lib-adj__label', 'Axes'));
    let mV = document.createElement('select');
    ((mV.className = 'lib-pose__axes'),
      (mV.title =
        'What X, Y and Z are, for the rings and for R. Each joint always turns about its own joint'));
    for (let [mx, my, mW] of [
      ['global', 'Global', 'The room\u2019s axes'],
      [
        'local',
        'Local',
        'Each joint\u2019s own axes: joints picked together turn alike, each about its own',
      ],
      ['view', 'View', 'The screen\u2019s axes: across, up, and towards you'],
      ['parent', 'Parent', 'The axes of the part each joint hangs from'],
    ]) {
      let mq = document.createElement('option');
      (Object.assign(mq, { value: mx, textContent: my, title: mW }), mV.appendChild(mq));
    }
    ((mV.value = m8.axes || 'global'),
      mV.addEventListener('change', () => {
        try {
          localStorage.setItem(Qd, mV.value);
        } catch {}
        (D4.setPoseAxes(mV.value), mV.blur(), m2());
      }),
      mw.appendChild(mV));
    let mD = Dm(
      'X-mirror',
      'A drag turns the other side too, as its mirror image \u2014 both keyed',
      () => {
        (ia(Zd, !m8.xMirror), D4.setPoseXMirror(!m8.xMirror));
      },
      'lib-btn lib-btn--axis' + (m8.xMirror ? ' is-on' : ''),
    );
    (mD.setAttribute('aria-pressed', String(!!m8.xMirror)), mw.appendChild(mD), D3.appendChild(mw));
    let mm = DD('div', 'lib-pose__bone');
    mm.appendChild(DD('span', 'lib-adj__label', 'Snap'));
    let mS = DD('div', 'lib-ik__modes');
    for (let [mP, mY] of [
      [0, 'Off'],
      [5, '5\u00B0'],
      [15, '15\u00B0'],
    ])
      mS.appendChild(
        Dm(
          mY,
          mP
            ? 'Turns snap to ' + mP + '\u00B0 steps \u2014 hold Ctrl during a drag to flip it'
            : 'No snap \u2014 hold Ctrl during a drag for steps',
          () => {
            try {
              localStorage.setItem(eu, String(mP));
            } catch {}
            D4.setPoseSnap(mP);
          },
          'lib-btn lib-btn--axis' + ((m8.snap || 0) === mP ? ' is-on' : ''),
        ),
      );
    if ((mm.appendChild(mS), D3.appendChild(mm), m8.pending)) {
      let mv = DD('div', 'lib-pose__pending');
      (mv.appendChild(
        DD(
          'span',
          null,
          'Not keyed yet: ' +
            m8.pending.bones.length +
            ' bone' +
            (m8.pending.bones.length === 1 ? '' : 's') +
            ' on this frame. K keys it; another frame or Play drops it.',
        ),
      ),
        mv.appendChild(
          Dm('\u25C6 Key', 'Key the pose on screen (K)', () => Dj(), 'lib-btn lib-btn--sm'),
        ),
        D3.appendChild(mv));
    }
    m8.modal &&
      D3.appendChild(
        DD(
          'p',
          'lib-comp__hint',
          m8.modal.kind === 'rotate'
            ? 'Rotating \u2014 X, Y or Z for a global axis (again: local), R again for trackball, a number for degrees, Enter or click keeps, Esc cancels.'
            : 'Moving \u2014 X, Y or Z for an axis (again: its own), a number for centimetres, Enter or click keeps, Esc cancels.',
        ),
      );
    let mE = DD('div', 'lib-pose__bone'),
      mF = Dm(
        'Fingers',
        'Show the finger joints \u2014 off, they cannot be clicked, boxed or listed',
        () => {
          (ia(Xd, !m8.fingers), D4.setPoseFingers(!m8.fingers));
        },
        'lib-btn lib-btn--axis' + (m8.fingers !== !1 ? ' is-on' : ''),
      );
    mF.setAttribute('aria-pressed', String(m8.fingers !== !1));
    let mC = Dm(
      '\u21C4 Other side',
      'Pick the mirror side instead \u2014 Shift+click: both sides',
      (mB, mG) => D4.pickPoseOtherSide({ add: !!mG?.shiftKey }),
    );
    mC.disabled = !m9.length;
    let mt = Dm(
      '\u25AD Box (B)',
      'Drag a box over the viewport to pick every joint in it \u2014 Shift adds, Esc cancels',
      () => D4.armPoseBox(!m8.box),
      'lib-btn lib-btn--sm' + (m8.box ? ' is-on' : ''),
    );
    (mE.append(mF, mC, mt), D3.appendChild(mE));
    let mH = document.createElement('details');
    ((mH.className = 'lib-pose__list'),
      (mH.open = sa(Jd, !1)),
      mH.addEventListener('toggle', () => ia(Jd, mH.open)),
      mH.appendChild(DD('summary', null, 'Bones')));
    let me = (D4.poseBones?.() || []).filter((mB) => m8.fingers !== !1 || !V5(mB)),
      mR = (mB) => (D4.getState().mirrored ? Dw(mB) : mB),
      mQ = new Set(VH(D8[D9] || { keys: [] })),
      mj = new Set(),
      mz = D4.getRigDescription?.()?.regions,
      mO = (
        mz
          ? mz.keys
              .filter((mB) => mz.bones[mB])
              .map((mB) => [mz.labels[mB], (mG) => mz.bones[mB].test(mG)])
          : Op
      ).map(([mB, mG]) => [mB, me.filter((mg) => mG(mg) && !mj.has(mg) && mj.add(mg))]);
    mO.push(['Other', me.filter((mB) => !mj.has(mB))]);
    for (let [mB, mG] of mO) {
      if (!mG.length) continue;
      let mg = DD('div', 'lib-pose__group');
      mg.appendChild(DD('div', 'lib-pose__group-name', mB));
      let mI = DD('div', 'lib-pose__items');
      for (let mN of mG) {
        let mM = Dm(
          (mQ.has(mR(mN)) ? '\u25C6 ' : '') + DS(mN),
          mQ.has(mR(mN))
            ? 'On the selected layer \u2014 Shift+click adds to the pick'
            : 'Shift+click adds to the pick',
          (S0, S1) => D4.selectPoseBone(mN, { add: !!S1?.shiftKey }),
          'lib-pose__item' + (mN === m8.bone ? ' is-sel' : m9.includes(mN) ? ' is-set' : ''),
        );
        mI.appendChild(mM);
      }
      (mg.appendChild(mI), mH.appendChild(mg));
    }
    if ((D3.appendChild(mH), D8.length)) {
      let S0 = DD('ul', 'lib-pose__layers'),
        S1 = D8.some((S2) => S2.solo && Vt(S2));
      (D8.forEach((S2, S3) => {
        let S4 = DD(
          'li',
          'lib-pose__layer' +
            (S3 === D9 ? ' is-sel' : '') +
            (S2.mute || (S1 && !S2.solo) ? ' is-muted' : ''),
        );
        S4.addEventListener('click', () => {
          ((D9 = S3), m2());
        });
        let S5 = DD('span', 'lib-pose__name', S2.name);
        ((S5.title = 'Double-click to rename'),
          S5.addEventListener('dblclick', (S8) => {
            S8.stopPropagation();
            let S9 = prompt('Rename the pose layer', S2.name)?.trim();
            S9 && DR(S3, { name: S9 });
          }),
          S4.appendChild(S5),
          S4.appendChild(
            DD(
              'span',
              'lib-pose__meta',
              VH(S2).length + ' bones \u00B7 ' + Vj(S2).length + ' keys',
            ),
          ));
        let S6 = (S8, S9, Sk, Sw) => {
          let SV = Dm(S8, Sk, Sw, 'lib-seq__hbtn' + (S9 ? ' is-on' : ''));
          return (SV.setAttribute('aria-pressed', String(S9)), SV);
        };
        (S4.appendChild(
          S6('M', S2.mute, 'Mute \u2014 kept, applies nothing', () => DR(S3, { mute: !S2.mute })),
        ),
          S4.appendChild(
            S6('S', S2.solo, 'Solo \u2014 the other pose layers go silent', () =>
              DR(S3, { solo: !S2.solo }),
            ),
          ));
        let S7 = document.createElement('input');
        ((S7.type = 'range'),
          (S7.min = '0'),
          (S7.max = '100'),
          (S7.step = '1'),
          (S7.className = 'lib-pose__weight'),
          (S7.value = String(Math.round(S2.weight * 100))),
          (S7.title = 'Weight ' + S7.value + '%'),
          S7.addEventListener('click', (S8) => S8.stopPropagation()),
          S7.addEventListener('input', () => {
            ((D8[S3] = VF({ ...D8[S3], weight: Number(S7.value) / 100 })),
              D4.setPoses(D8.filter(Vt)));
          }),
          S7.addEventListener('change', () => DR(S3, { weight: Number(S7.value) / 100 })),
          S4.appendChild(S7),
          S4.appendChild(Dm('\u2715', 'Delete the layer', () => DQ(S3), 'lib-btn lib-btn--icon')),
          S0.appendChild(S4));
      }),
        D3.appendChild(S0));
    }
    let mJ = DD('div', 'lib-pose__tools'),
      mZ = m9.length > 0 || Vt(D8[D9]),
      mU = m9.length ? 'the picked bones' : 'every bone the layer holds',
      mK = Dm('Copy pose', 'The pose of ' + mU + ' on this frame, as you see it', Dv);
    mK.disabled = !mZ;
    let mT = Dm(
      'Paste pose',
      'Key the ' + (Dk ? Object.keys(Dk).length : 0) + ' copied bones here, looking as they did',
      DG,
    );
    mT.disabled = !Dk;
    let mA = Dm(
      'Paste flipped',
      'Key the copy mirrored onto the other side here \u2014 a centre bone onto itself',
      Dg,
    );
    mA.disabled = !Dk;
    let mn = Dm(
      'Mirror L\u2192R',
      'The right side becomes the left\u2019s mirror image on this frame \u2014 ' + mU,
      () => Dh('l'),
    );
    mn.disabled = !mZ;
    let mo = Dm(
      'Mirror R\u2192L',
      'The left side becomes the right\u2019s mirror image on this frame \u2014 ' + mU,
      () => Dh('r'),
    );
    mo.disabled = !mZ;
    let mX = Dm(
      'Reset key',
      'Key ' + mU + ' back to the animation\u2019s own pose on this frame',
      DI,
    );
    ((mX.disabled = !mZ),
      mJ.append(mX, mK, mT, mA, mn, mo),
      D3.appendChild(mJ),
      D8.length &&
        !VO(D8).length &&
        D8.some(Vt) &&
        D3.appendChild(
          DD('p', 'lib-adj__warn', 'Every pose layer is muted or at 0% \u2014 nothing is posed.'),
        ));
  }
  (D4.setPoseEmptyClick?.(!0), D4.setPoseFingers?.(sa(Xd, !0)), D4.setPoseXMirror?.(sa(Zd, !1)));
  try {
    let m7 = localStorage.getItem(Qd);
    Ep.includes(m7) && D4.setPoseAxes?.(m7);
  } catch {}
  D4.setPoseSnap?.(Lp());
  let m3 = (m8) => D8.findIndex((m9) => m9.id === m8),
    m4 = () => D5()?.frames ?? 2;
  (m2(),
    document.addEventListener('keydown', (m8) => {
      if (m8.target?.closest?.('input, textarea, select, [contenteditable]')) return;
      let m9 = D4.getState().pose || {};
      if (m9.mode) {
        if ((m8.key === 'b' || m8.key === 'B') && !m8.ctrlKey && !m8.metaKey && !m8.altKey) {
          (m8.preventDefault(), D4.armPoseBox(!m9.box));
          return;
        }
        m8.key === 'Escape' &&
          (m9.box ? D4.armPoseBox(!1) : m9.bones?.length && D4.selectPoseBone(null));
      }
    }));
  let m5,
    m6 = 'null';
  return (
    D4.onState?.((m8) => {
      let m9 =
        (m8.pose?.bones || []).join(',') +
        '|' +
        m8.pose?.space +
        '|' +
        m8.pose?.axes +
        '|' +
        m8.pose?.dataBone +
        '|' +
        m8.pose?.fingers +
        '|' +
        m8.pose?.xMirror +
        '|' +
        m8.pose?.box +
        '|' +
        m8.rig +
        '|' +
        m8.pose?.autoKey +
        '|' +
        m8.pose?.snap +
        '|' +
        m8.pose?.onion +
        '|' +
        JSON.stringify(m8.pose?.pending ?? null) +
        '|' +
        JSON.stringify(m8.pose?.modal ?? null);
      if (m9 !== m5) {
        let mk = JSON.stringify(m8.pose?.pending ?? null);
        (mk !== m6 && ((m6 = mk), D7()), (m5 = m9), m2());
      }
    }),
    {
      render: m2,
      tick: m0,
      pending: () => D4.getState().pose?.pending ?? null,
      get: () => D8.filter(Vt).map((m8) => ({ ...m8 })),
      set: (m8) => {
        ((D8 = (m8 || []).map((m9, mk) => VF(m9, mk))),
          (D9 = Math.min(D9, Math.max(0, D8.length - 1))),
          D4.setPoses(D8.filter(Vt)),
          m2());
      },
      keyNow: (m8) => Dj(m8 == null ? D9 : m3(m8)),
      selected: () => D8[D9]?.id ?? null,
      setLayer: (m8, m9) => DR(m3(m8), m9),
      moveKeys: (m8, m9) => {
        let mk = m3(m8);
        mk >= 0 && ((D8[mk] = wZ(D8[mk], m9, m4())), DE());
      },
      removeKeys: (m8, m9) => {
        let mk = m3(m8);
        mk >= 0 && ((D8[mk] = wK(D8[mk], m9)), DE());
      },
      setInterp: (m8, m9, mk) => {
        let mw = m3(m8);
        mw >= 0 && ((D8[mw] = wA(D8[mw], m9, mk)), DE());
      },
      pasteKey: (m8, m9, mk, mw) => {
        let mV = m3(m8);
        mV < 0 ||
          ((D8[mV] = wQ(D8[mV], m9, m4(), mk)),
          mw && (D8[mV] = wA(D8[mV], VX(m9, m4()), mw)),
          DE());
      },
      keysOf: (m8) => D8[m3(m8)]?.keys ?? [],
      setKeyer: (m8) => {
        Dt = typeof m8 == 'function' ? m8 : null;
      },
      tryKey: ({ bones: m8, u: m9 } = {}) => {
        let mk = D5();
        if (!mk || m9 == null || !m8?.length) return null;
        let mw = D8.length ? D8 : [VF({ id: '_', name: 'Pose 1', keys: [] })],
          mV = Math.min(Math.max(0, D9), mw.length - 1),
          mD = DH(mw, mV, m8, m9);
        return {
          before: mw[mV],
          after: Dt?.(mw[mV], m9, mk.frames, mD) ?? wQ(mw[mV], m9, mk.frames, mD),
        };
      },
      rescale: (m8, m9) => {
        ((D8 = D8.map((mk) => wX(mk, m8, m9))), D4.setPoses(D8.filter(Vt)));
      },
      keyTimes: (m8) => Vj(D8[m3(m8)] || { keys: [] }),
      offsetsAt: (m8, m9) => (D8[m3(m8)] ? w9(D8[m3(m8)], m9) : {}),
      keyedAt: (m8, m9) => (D8[m3(m8)] ? wD(D8[m3(m8)], m9) : {}),
      boneCurve: (m8, m9) => (D8[m3(m8)] ? Vn(D8[m3(m8)], m9) : []),
      boneEuler: (m8, m9) => (D8[m3(m8)] ? VL(D8[m3(m8)], m9) : () => [0, 0, 0]),
      isCurveBone: (m8, m9) => VR(D8[m3(m8)], m9),
      setBoneCurve: (m8, m9, mk, { live: mw = !1 } = {}) => {
        let mV = m3(m8);
        mV < 0 || ((D8[mV] = Vx(D8[mV], m9, mk)), DE({ quiet: mw }));
      },
      boneQuatCurve: (m8, m9) => (D8[m3(m8)] ? VU(D8[m3(m8)], m9) : []),
      setBoneQuat: (m8, m9, mk, { live: mw = !1 } = {}) => {
        let mV = m3(m8);
        mV < 0 || ((D8[mV] = VT(D8[mV], m9, mk)), DE({ quiet: mw }));
      },
    }
  );
}
var nu = 'cgstuff.library.onion',
  ra = 'cgstuff.library.onionPins',
  qi = (D3, D4) => {
    try {
      return JSON.parse(localStorage.getItem(D3) || 'null') ?? D4;
    } catch {
      return D4;
    }
  },
  aa = (D3, D4) => {
    try {
      localStorage.setItem(D3, JSON.stringify(D4));
    } catch {}
  },
  ou = (D3) =>
    String(D3 || '')
      .replace(/_(l|r)$/, (D4, D5) => (D5 === 'l' ? ' L' : ' R'))
      .replace(/_/g, ' ')
      .replace(/^\w/, (D4) => D4.toUpperCase());
function Do(D3, D4, D5) {
  let D6 = document.createElement(D3);
  return (D4 && (D6.className = D4), D5 != null && (D6.textContent = D5), D6);
}
function su({
  toggle: D3,
  more: D4,
  player: D5,
  clock: D6 = () => null,
  seek: D7 = () => {},
  marks: D8 = null,
  clipKey: D9 = () => '',
}) {
  let Dk = y({ ...qi(nu, {}), enabled: !1 }),
    Dw = null,
    DV = null,
    DD = null,
    Dm = null,
    DS = null,
    DE = null,
    DF = '',
    DC = 'cgstuff.library.onionGroups',
    Dt = () =>
      (qi(DC, []) || [])
        .filter((Dy) => Array.isArray(Dy?.bones) && Dy.bones.length)
        .map((Dy) => ({ bones: Dy.bones.map(String), on: Dy.on !== !1 })),
    DH = () =>
      D5.setOnionGroups?.(
        Dt()
          .filter((Dy) => Dy.on)
          .map((Dy) => Dy.bones),
      );
  function De(Dy) {
    (aa(DC, Dy), DH(), Dw && DL());
  }
  let DR = () => {
      let Dy = D6();
      return Dy && Dy.frames >= 2
        ? { at: Math.round(Math.min(1, Math.max(0, Dy.u)) * (Dy.frames - 1)), last: Dy.frames - 1 }
        : null;
    },
    DQ = (Dy) => (qi(ra, {})[Dy] || []).filter(Number.isInteger);
  function Dj(Dy) {
    let DW = qi(ra, {}),
      Dq = D9(),
      DP = [...new Set(Dy)].sort((DY, Dv) => DY - Dv);
    (DP.length ? (DW[Dq] = DP) : delete DW[Dq], aa(ra, DW), D5.setOnionPins?.(DP), Dw && DL());
  }
  let Dz = () => {
    let Dy = DR();
    return Dy
      ? [...new Set((D8?.get() || []).map((DW) => Math.round(DW * Dy.last)))].sort(
          (DW, Dq) => DW - Dq,
        )
      : [];
  };
  function DO(Dy) {
    let DW = DR();
    !DW || !D8 || (D8.set(Dy.map((Dq) => Dq / DW.last)), Dw && DL());
  }
  function DJ(Dy) {
    ((Dk = y({ ...Dk, ...Dy })), D5.setOnion?.(Dk));
    let { enabled: DW, ...Dq } = Dk;
    (aa(nu, Dq), DZ(), Dw && DL());
  }
  function DZ() {
    (D3.classList.toggle('is-on', Dk.enabled),
      D3.setAttribute('aria-pressed', String(Dk.enabled)),
      D4.classList.toggle('is-on', !!Dw),
      D4.setAttribute('aria-expanded', String(!!Dw)));
  }
  function DU() {
    (Dw?.remove(),
      (Dw = null),
      (DV = null),
      (DD = null),
      (Dm = null),
      document.removeEventListener('pointerdown', DK, !0),
      window.removeEventListener('keydown', DT, !0),
      window.removeEventListener('resize', DA),
      DZ());
  }
  function DK(Dy) {
    Dw && !Dw.contains(Dy.target) && !D4.contains(Dy.target) && DU();
  }
  function DT(Dy) {
    Dy.key === 'Escape' && (Dy.preventDefault(), Dy.stopPropagation(), DU());
  }
  function DA() {
    if (!Dw) return;
    let Dy = D3.getBoundingClientRect(),
      DW = Dw.offsetWidth;
    ((Dw.style.left = Math.max(8, Math.min(Dy.left, window.innerWidth - DW - 8)) + 'px'),
      (Dw.style.bottom = Math.max(8, window.innerHeight - Dy.top + 4) + 'px'));
  }
  function Dn() {
    ((Dw = Do('div', 'lib-seq__menu lib-onion')),
      Dw.setAttribute('role', 'dialog'),
      Dw.setAttribute('aria-label', 'Onion skin settings'),
      DL(),
      document.body.appendChild(Dw),
      DA(),
      document.addEventListener('pointerdown', DK, !0),
      window.addEventListener('keydown', DT, !0),
      window.addEventListener('resize', DA),
      DZ());
  }
  function DX() {
    let Dy = DR();
    if (((DE = Dy?.at ?? null), DV)) {
      let DW = Dy != null && DQ(D9()).includes(Dy.at);
      ((DV.textContent = DW ? 'Unpin Frame' : 'Pin Frame'),
        DV.classList.toggle('is-on', DW),
        (DV.disabled = !Dy));
    }
    if (DD) {
      let Dq = Dy != null && Dz().includes(Dy.at);
      ((DD.textContent = Dq ? 'Unmark Frame' : 'Mark Frame'),
        DD.classList.toggle('is-on', Dq),
        (DD.disabled = !Dy || !D8));
    }
    Dw?.querySelectorAll('[data-frame]').forEach((DP) =>
      DP.classList.toggle('is-on', Number(DP.dataset.frame) === DE),
    );
  }
  function DL() {
    let Dy = Dw.contains(document.activeElement) ? document.activeElement.dataset.key : null;
    Dw.innerHTML = '';
    let DW = (m2, ...m3) => {
        let m4 = Do('div', 'lib-seq__menu-row');
        m4.appendChild(Do('span', 'lib-seq__menu-label', m2));
        let m5 = Do('div', 'lib-seq__menu-group');
        (m5.append(...m3), m4.appendChild(m5), Dw.appendChild(m4));
      },
      Dq = (m2, m3, m4, m5, m6 = !1) => {
        let m7 = Do('button', 'lib-btn lib-btn--axis' + (m4 ? ' is-on' : ''), m2);
        return (
          (m7.type = 'button'),
          (m7.title = m3),
          (m7.disabled = m6),
          m7.setAttribute('aria-pressed', String(m4)),
          m7.addEventListener('click', m5),
          m7
        );
      },
      DP = (m2, m3) => {
        let m4 = Do('div', 'lib-ik__modes');
        for (let [m5, m6, m7] of m3)
          m4.appendChild(Dq(m5, m7, Dk[m2] === m6, () => DJ({ [m2]: m6 })));
        return m4;
      },
      DY = (m2, m3, m4, m5 = !1) => Dq(m2, m4, Dk[m3], () => DJ({ [m3]: !Dk[m3] }), m5),
      Dv = (m2, m3, m4, m5, { scale: m6 = 1 } = {}) => {
        let m7 = document.createElement('input');
        ((m7.type = 'number'),
          (m7.className = 'lib-seq__menu-num'),
          (m7.min = String(m3)),
          (m7.max = String(m4)),
          (m7.step = '1'),
          (m7.value = String(Math.round(Dk[m2] * m6))),
          (m7.title = m5),
          (m7.dataset.key = m2));
        let m8 = () => {
          let m9 = Number(m7.value);
          Number.isFinite(m9) && DJ({ [m2]: Math.min(m4, Math.max(m3, Math.round(m9))) / m6 });
        };
        return (
          m7.addEventListener('keydown', (m9) => {
            (m9.stopPropagation(), m9.key === 'Enter' && (m9.preventDefault(), m8()));
          }),
          m7.addEventListener('change', m8),
          m7
        );
      },
      DB = (m2, m3) => {
        let m4 = document.createElement('input');
        return (
          (m4.type = 'color'),
          (m4.className = 'lib-onion__colour'),
          (m4.value = Dk[m2]),
          (m4.title = m3),
          m4.setAttribute('aria-label', m3),
          (m4.dataset.key = m2),
          m4.addEventListener('input', () => {
            ((Dk = y({ ...Dk, [m2]: m4.value })), D5.setOnion?.(Dk));
          }),
          m4.addEventListener('change', () => DJ({ [m2]: m4.value })),
          m4
        );
      },
      DG = (m2) => Do('span', 'lib-onion__word', m2),
      Dg = (m2, m3, m4, m5, m6, m7) => {
        let m8 = Dq(m2, m3, m4, m5),
          m9 = Dq('\u00D7', m6, !1, m7);
        m9.setAttribute('aria-label', m6 + ': ' + m2);
        let mk = Do('span', 'lib-onion__chip');
        return (mk.append(m8, m9), { g: mk, go: m8 });
      },
      DI = (m2, m3, m4) => {
        let { g: m5, go: m6 } = Dg(
          String(m2 + 1),
          'Go to frame ' + (m2 + 1),
          !1,
          () => D7(m2),
          m3,
          m4,
        );
        return ((m6.dataset.frame = String(m2)), m5);
      };
    (DW(
      'Frames',
      DP('mode', [
        ['B/A', 'ba', 'Before/After: ghosts around the playhead, moving with it'],
        ['Step', 'step', 'A fixed grid of frames from the first'],
        ['Keys', 'keys', 'The nearest keys and marked key poses'],
      ]),
      DG('before'),
      Dv('before', 0, 8, 'Ghosts before'),
      DG('after'),
      Dv('after', 0, 8, 'Ghosts after'),
      DG('every'),
      Dv('step', 1, 10, 'Frames between ghosts'),
    ),
      DW(
        'Look',
        DP('shading', [
          ['Dither', 'dither', 'Dots: never darker where it overlaps'],
          ['Flat', 'flat', 'See-through'],
          ['Shaded', 'shaded', 'See-through, lit'],
        ]),
      ),
      DW(
        'Show',
        DY('Mesh', 'showMesh', 'Show Mesh \u2014 off: the bones'),
        DY('X-Ray', 'inFront', 'In Front (X-Ray): over everything'),
        DY(
          'Body In Front',
          'characterInFront',
          'Character In Front: with X-Ray, the body stays over its ghosts',
        ),
        DY(
          'While Playing',
          'duringPlayback',
          'Show During Playback: ' + x.playbackCount + ' each side',
        ),
        DY(
          'Teleport to Ghost',
          'teleport',
          'Teleport to Ghost: a click on a ghost goes to its frame. Off: a click near a ghost does nothing to the time',
        ),
      ));
    let Dh = Dk.colouring !== 'sides';
    (DW(
      'Colour',
      DP('colouring', [
        ['Sides', 'sides', 'Before and after colours'],
        ['Speed', 'speed', 'Each ghost by how fast it moves'],
        ['Per Bone', 'boneSpeed', 'Each bone by its speed, against the fastest bone'],
        ['Per Bone Own', 'boneSpeedOwn', 'Each bone against its own fastest moment'],
      ]),
      DB('beforeColour', 'Before Color'),
      DB('afterColour', 'After Color'),
      DB('keyColour', 'Key Color'),
      Do('span', 'lib-onion__gap'),
      DB('slowColour', 'Slow'),
      DB('fastColour', 'Fast'),
      DY(
        'Key Colour',
        'useKeyColour',
        Dh
          ? 'Keyframe Color: off while coloured by speed'
          : 'Keyframe Color: ghosts on keys in the key colour',
        Dh,
      ),
    ),
      DW(
        'Opacity',
        DG('near'),
        Dv('alphaNear', 5, 100, 'Alpha Near', { scale: 100 }),
        DG('%'),
        DG('far'),
        Dv('alphaFar', 0, 50, 'Alpha Far', { scale: 100 }),
        DG('%'),
      ),
      Dw.appendChild(Do('div', 'lib-onion__line')));
    let DN = Dt(),
      DM = D5.onionPicked?.() || [];
    ((DF = DM.join(',')),
      (Dm = Dq(
        'Pin Selection',
        'Pin the selected bones as a group',
        !1,
        () => {
          let m2 = [...new Set(D5.onionPicked?.() || [])].sort(),
            m3 = Dt();
          !m2.length ||
            m3.some((m4) => m4.bones.join(',') === m2.join(',')) ||
            De([...m3, { bones: m2, on: !0 }]);
        },
        !DM.length,
      )),
      DW(
        'Groups',
        Dm,
        ...DN.map((m2, m3) => {
          let m4 = ou(m2.bones[0]) + (m2.bones.length > 1 ? ' +' + (m2.bones.length - 1) : '');
          return Dg(
            m4,
            m2.bones.map(ou).join(', ') + ' \u2014 click: ' + (m2.on ? 'off' : 'on'),
            m2.on,
            () => De(DN.map((m5, m6) => (m6 === m3 ? { ...m5, on: !m5.on } : m5))),
            'Remove group',
            () => De(DN.filter((m5, m6) => m6 !== m3)),
          ).g;
        }),
      ));
    let m0 = DQ(D9());
    ((DV = Dq('Pin Frame', 'Pin a ghost on this frame (this clip)', !1, () => {
      let m2 = DR();
      m2 && Dj(m0.includes(m2.at) ? m0.filter((m3) => m3 !== m2.at) : [...m0, m2.at]);
    })),
      DW('Pins', DV, ...m0.map((m2) => DI(m2, 'Unpin', () => Dj(m0.filter((m3) => m3 !== m2))))));
    let m1 = Dz();
    if (
      ((DD = Dq('Mark Frame', 'Mark this frame as a key pose (kept with the animation)', !1, () => {
        let m2 = DR();
        m2 && DO(m1.includes(m2.at) ? m1.filter((m3) => m3 !== m2.at) : [...m1, m2.at]);
      })),
      DW(
        'Key Poses',
        DD,
        ...m1.map((m2) => DI(m2, 'Unmark', () => DO(m1.filter((m3) => m3 !== m2)))),
      ),
      DX(),
      Dy)
    ) {
      let m2 = Dw.querySelector('[data-key="' + Dy + '"]');
      m2 && (m2.focus(), m2.select?.());
    }
    DA();
  }
  function Db() {
    ((DS = D9()), D5.setOnionPins?.(DQ(DS)), DH(), Dw && DL());
  }
  function Dx() {
    if (D9() !== DS) {
      Db();
      return;
    }
    if (!Dw) return;
    DR()?.at !== DE && DX();
    let Dy = (D5.onionPicked?.() || []).join(',');
    Dy !== DF && Dm && ((DF = Dy), (Dm.disabled = !Dy));
  }
  return (
    D3.addEventListener('click', () => DJ({ enabled: !Dk.enabled })),
    D4.addEventListener('click', () => (Dw ? DU() : Dn())),
    D5.setOnion?.(Dk),
    Db(),
    DZ(),
    { get: () => ({ ...Dk }), set: DJ, close: DU, refresh: Db, tick: Dx }
  );
}
var la = 240,
  ca = 13;
function iu(D3, D4, D5) {
  if (D5) {
    let D6 = new D3['AnimationMix' + 'er'](D4);
    (D6.clipAction(D5).play(), D6.setTime(0));
  }
  return (D4.updateMatrixWorld(!0), D4);
}
function ru(D3, D4) {
  let D5 = () => new D3['Vector3'](),
    D6 = [];
  D4.traverse((DR) => {
    DR.isBone && D6.push(DR);
  });
  let D7 = (DR) => D6.find((DQ) => DQ.name === DR) ?? null,
    D8 = (DR) => DR.getWorldPosition(D5()),
    D9 = (DR) => DR.setY(0);
  function Dk(DR) {
    let DQ = DR.children.filter(
      (Dj) => Dj.isBone && !Dj.name.startsWith('ik_') && !Dj.name.startsWith('socket_'),
    );
    return DQ.length <= 1
      ? (DQ[0] ?? null)
      : (DQ.find((Dj) => /^middle_01/.test(Dj.name)) ??
          DQ.find((Dj) => /^neck/.test(Dj.name)) ??
          null);
  }
  function Dw(DR) {
    let DQ = D8(DR),
      Dj = Dk(DR);
    return Dj
      ? DQ.lerp(D8(Dj), 0.5)
      : DR.children.some((Dz) => Dz.isBone && V3(Dz.name)) || !DR.parent?.isBone
        ? DQ
        : DQ.add(DQ.clone().sub(D8(DR.parent)).multiplyScalar(0.7));
  }
  function DV({ points: DR, look: DQ, up: Dj, pad: Dz, more: DO = [0, 0, 0, 0], parts: DJ }) {
    let DZ = DQ.clone().normalize().negate(),
      DU = D5().crossVectors(Dj, DZ).normalize(),
      DK = D5().crossVectors(DZ, DU).normalize(),
      DT = 1 / 0,
      DA = -1 / 0,
      Dn = 1 / 0,
      DX = -1 / 0;
    for (let DB of DR) {
      let DG = DB.dot(DU),
        Dg = DB.dot(DK);
      ((DT = Math.min(DT, DG)),
        (DA = Math.max(DA, DG)),
        (Dn = Math.min(Dn, Dg)),
        (DX = Math.max(DX, Dg)));
    }
    let DL = Math.max(DA - DT, DX - Dn) * Dz;
    ((DT -= DL + DO[0]), (DA += DL + DO[1]), (DX += DL + DO[2]), (Dn -= DL + DO[3]));
    let Db = Math.max(DA - DT, DX - Dn) / 2,
      Dx = Db,
      Dy = DR.reduce((DI, Dh) => DI + Dh.dot(DZ), 0) / DR.length,
      DW = DU.clone()
        .multiplyScalar((DT + DA) / 2)
        .add(DK.clone().multiplyScalar((Dn + DX) / 2))
        .add(DZ.clone().multiplyScalar(Dy)),
      Dq = new D3['Orthographic' + 'Camera'](-Db, Db, Dx, -Dx, 0.01, 60);
    (Dq.up.copy(DK),
      Dq.position.copy(DW).add(DZ.clone().multiplyScalar(20)),
      Dq.lookAt(DW),
      Dq.updateMatrixWorld(!0),
      Dq.updateProjectionMatrix());
    let DP = DJ.map((DI) => {
        let Dh = Dw(DI).project(Dq);
        return { bone: DI.name, x: (Dh.x + 1) / 2, y: (1 - Dh.y) / 2 };
      }),
      DY = 2 * la,
      Dv = Math.round((DY * Dx) / Db);
    return { camera: Dq, width: DY, height: Dv, spots: Ip(DP, la, (la * Dx) / Db) };
  }
  let DD = D5();
  for (let DR of ['l', 'r']) {
    let DQ = D7('foot_' + DR),
      Dj = D7('ball_' + DR);
    DQ && Dj && DD.add(D9(D8(Dj).sub(D8(DQ))));
  }
  (DD.lengthSq() < 1e-8 && DD.set(0, 0, 1), DD.normalize());
  let Dm = D6.find((Dz) => /^head$/i.test(Dz.name)),
    DS = DV({
      points: D6.filter((Dz) => !Dz.name.startsWith('ik_') && !Dz.name.startsWith('socket_')).map(
        D8,
      ),
      look: DD.clone().negate(),
      up: D5().set(0, 1, 0),
      pad: 0.05,
      more: [0, 0, Dm ? 0.2 : 0, 0],
      parts: D6.filter((Dz) => V3(Dz.name) && !V5(Dz.name)),
    }),
    DE = D7('hand_l'),
    DF = D6.filter((Dz) => V5(Dz.name) && Dz.name.endsWith('_l')),
    DC = null,
    Dt = D7('middle_01_l'),
    DH = D7('index_01_l'),
    De = D7('pinky_01_l');
  if (DE && Dt && DH && De && DF.length) {
    let Dz = D8(Dt).sub(D8(DE)).normalize(),
      DO = D8(DH).sub(D8(De)).normalize(),
      DJ = D5().crossVectors(DO, Dz).normalize(),
      DZ = Dz.clone()
        .sub(DJ.clone().multiplyScalar(Dz.dot(DJ)))
        .normalize(),
      DU = D6.filter((DT) => /_leaf_l$/.test(DT.name) && V5(DT.parent?.name)),
      DK = DE.parent?.isBone ? D8(DE).lerp(D8(DE.parent), 0.22) : D8(DE);
    DC = DV({
      points: [D8(DE), DK, ...DF.map(D8), ...DU.map(D8)],
      look: DJ.clone().negate(),
      up: DZ,
      pad: 0.16,
      parts: [DE, ...DF],
    });
  }
  return { body: DS, hand: DC };
}
function Ip(D3, D4, D5) {
  let D6 = D3.map((D8) => ({ ...D8, px: D8.x * D4, py: D8.y * D5 }));
  for (let D8 = 0; D8 < 12; D8++) {
    let D9 = !1;
    for (let Dk = 0; Dk < D6.length; Dk++)
      for (let Dw = Dk + 1; Dw < D6.length; Dw++) {
        let DV = D6[Dw].px - D6[Dk].px,
          DD = D6[Dw].py - D6[Dk].py,
          Dm = Math.hypot(DV, DD);
        if (Dm >= ca) continue;
        Dm < 0.000001 ? ((DV = 0), (DD = 1)) : ((DV /= Dm), (DD /= Dm));
        let DS = (ca - Dm) / 2;
        ((D6[Dk].px -= DV * DS),
          (D6[Dk].py -= DD * DS),
          (D6[Dw].px += DV * DS),
          (D6[Dw].py += DD * DS),
          (D9 = !0));
      }
    if (!D9) break;
  }
  let D7 = ca / 2;
  return D6.map((DE) => ({
    bone: DE.bone,
    x: Math.min(D4 - D7, Math.max(D7, DE.px)) / D4,
    y: Math.min(D5 - D7, Math.max(D7, DE.py)) / D5,
  }));
}
function au(D3) {
  return D3.map((D4) => ({ bone: D4.bone.replace(/_l$/, '_r'), x: 1 - D4.x, y: D4.y }));
}
function lu(D3, D4, D5) {
  let D6 = new D3['Scene'](),
    D7 = new D3['HemisphereLi' + 'ght'](16777215, 5264476, 2.4),
    D8 = new D3['DirectionalL' + 'ight'](16777215, 1.9);
  (D6.add(D4, D7, D8, D8.target),
    D4.traverse((Dw) => {
      Dw.isMesh && (Dw.frustumCulled = !1);
    }));
  let D9 = new D3['WebGLRendere' + 'r']({ antialias: !0, alpha: !0 });
  D9.setClearColor(0, 0);
  let Dk = {};
  try {
    for (let [Dw, DV] of Object.entries(D5)) {
      if (!DV) {
        Dk[Dw] = null;
        continue;
      }
      (D8.position.copy(DV.camera.position).add(DV.camera.up.clone().multiplyScalar(6)),
        D8.target.position
          .copy(DV.camera.position)
          .add(DV.camera.getWorldDirection(new D3['Vector3']()).multiplyScalar(20)),
        D8.target.updateMatrixWorld(!0),
        D9.setSize(DV.width, DV.height, !1),
        D9.render(D6, DV.camera),
        (Dk[Dw] = D9.domElement.toDataURL('image/png')));
    }
  } finally {
    (D6.remove(D4), D9.dispose(), D9.forceContextLoss?.());
  }
  return Dk;
}
var So = (D3, D4 = {}, ...D5) => {
  let D6 = Object.assign(document.createElement(D3), D4);
  return (D6.append(...D5), D6);
};
function cu({ mount: D3, player: D4, three: D5, rigUrl: D6, restClip: D7 = () => null }) {
  let D8 = 'body',
    D9 = 'l',
    Dk = null,
    Dw = null,
    DV = new Map(),
    DD = (Dn, DX, DL) => {
      let Db = So('button', {
        type: 'button',
        className: 'lib-btn lib-btn--axis',
        textContent: Dn,
        title: DX,
      });
      return (Db.addEventListener('click', DL), Db);
    },
    Dm = {
      body: DD('Body', 'The whole body', () => {
        ((D8 = 'body'), DQ());
      }),
      hand: DD('Hand', 'A hand: the palm, and each joint of each finger', () => {
        ((D8 = 'hand'), DQ());
      }),
    },
    DS = {
      l: DD('Left', 'The left hand', () => {
        ((D9 = 'l'), DQ());
      }),
      r: DD('Right', 'The right hand', () => {
        ((D9 = 'r'), DQ());
      }),
    },
    DE = So('img', { className: 'lib-picker__pic', alt: '', draggable: !1 }),
    DF = So('div', { className: 'lib-picker__spots' }),
    DC = So('div', { className: 'lib-picker__band', hidden: !0 }),
    Dt = So('div', { className: 'lib-picker' }, DE, DF, DC),
    DH = So('p', { className: 'lib-comp__hint' });
  D3.replaceChildren(
    So(
      'div',
      { className: 'lib-comp__head' },
      So('span', { className: 'lib-comp__title', textContent: 'Picker' }),
    ),
    So('p', {
      className: 'lib-comp__hint',
      textContent:
        'Click a spot to pick that joint. Shift adds one. A drag picks all it goes over: with Shift it adds them, with Ctrl it takes them out. Turn what is picked with its rings in the view, or R.',
    }),
    So(
      'div',
      { className: 'lib-picker__modes' },
      Dm.body,
      Dm.hand,
      So('span', { className: 'lib-picker__gap' }),
      DS.l,
      DS.r,
    ),
    Dt,
    DH,
  );
  async function De() {
    let Dn = await D5(),
      DX = await fetch(D6);
    if (!DX.ok) throw new Error("the character's file returned " + DX.status);
    let DL = (await D4.parseGltf(await DX.arrayBuffer())).scene;
    iu(Dn, DL, await D7());
    let Db = ru(Dn, DL),
      Dx = lu(Dn, DL, Db);
    Dk = {};
    for (let Dy of ['body', 'hand'])
      Db[Dy] && Dx[Dy] && (Dk[Dy] = { url: Dx[Dy], spots: Db[Dy].spots });
    DQ();
  }
  function DR() {
    Dk ||
      Dw ||
      ((DH.textContent = 'Making the pictures\u2026'),
      (Dw = De().then(
        () => {
          DH.textContent = '';
        },
        (Dn) => {
          (console.warn('[picker]', Dn),
            (DH.textContent = 'The pictures could not be made.'),
            (Dw = null));
        },
      )));
  }
  function DQ() {
    let Dn = Dk?.[D8] ?? null,
      DX = D8 === 'hand' && D9 === 'r';
    if ((DF.replaceChildren(), DV.clear(), Dn)) {
      ((DE.src = Dn.url), DE.classList.toggle('is-flipped', DX));
      for (let DL of DX ? au(Dn.spots) : Dn.spots) {
        let Db = So('button', {
          type: 'button',
          className: 'lib-picker__spot',
          title: DL.bone.replace(/_/g, ' '),
        });
        ((Db.dataset.bone = DL.bone),
          (Db.style.left = DL.x * 100 + '%'),
          (Db.style.top = DL.y * 100 + '%'),
          DF.append(Db),
          DV.set(DL.bone, Db));
      }
    }
    Dj();
  }
  function Dj() {
    let Dn = D4.getState().pose ?? {},
      DX = new Set(Dn.bones ?? []);
    for (let [DL, Db] of DV)
      (Db.classList.toggle('is-on', DX.has(DL)), Db.classList.toggle('is-last', DL === Dn.bone));
    for (let [Dx, Dy] of Object.entries(Dm)) Dy.classList.toggle('is-on', Dx === D8);
    for (let [DW, Dq] of Object.entries(DS))
      (Dq.classList.toggle('is-on', DW === D9), (Dq.disabled = D8 !== 'hand'));
  }
  D4.onState(Dj);
  let Dz = (Dn) => {
    Dn.some(V5) && D4.getState().pose?.fingers === !1 && D4.setPoseFingers(!0);
  };
  function DO(Dn, DX) {
    (Dz(Dn), DX || D4.selectPoseBone(null));
    let DL = new Set(D4.getState().pose?.bones ?? []);
    for (let Db of Dn) DL.has(Db) || D4.selectPoseBone(Db, { add: !0 });
  }
  function DJ(Dn) {
    let DX = new Set(D4.getState().pose?.bones ?? []);
    for (let DL of Dn) DX.has(DL) && D4.selectPoseBone(DL, { add: !0 });
  }
  function DZ(Dn, DX) {
    (Dz([Dn]), D4.selectPoseBone(Dn, { add: DX }));
  }
  let DU = null,
    DK = 4,
    DT = (Dn) => {
      let DX = Dt.getBoundingClientRect();
      return [Dn.clientX - DX.left, Dn.clientY - DX.top, DX];
    };
  (Dt.addEventListener('pointerdown', (Dn) => {
    if (Dn.button !== 0 || !Dk?.[D8]) return;
    let [DX, DL] = DT(Dn);
    DU = {
      x: DX,
      y: DL,
      pointer: Dn.pointerId,
      spot: Dn.target.closest('.lib-picker__spot')?.dataset.bone ?? null,
      band: !1,
      box: null,
    };
    try {
      Dt.setPointerCapture(Dn.pointerId);
    } catch {}
    Dn.preventDefault();
  }),
    window.addEventListener('pointermove', (Dn) => {
      if (!DU || Dn.pointerId !== DU.pointer) return;
      let [DX, DL, Db] = DT(Dn);
      if (!DU.band && Math.hypot(DX - DU.x, DL - DU.y) < DK) return;
      DU.band = !0;
      let Dx = Math.max(0, Math.min(DU.x, DX)),
        Dy = Math.max(0, Math.min(DU.y, DL)),
        DW = Math.min(Db.width, Math.max(DU.x, DX)),
        Dq = Math.min(Db.height, Math.max(DU.y, DL));
      DU.box = [Dx, Dy, DW, Dq];
      let DP = (DY, Dv) => (DY / Dv) * 100 + '%';
      (Object.assign(DC.style, {
        left: DP(Dx, Db.width),
        top: DP(Dy, Db.height),
        width: DP(Math.max(0, DW - Dx), Db.width),
        height: DP(Math.max(0, Dq - Dy), Db.height),
      }),
        (DC.hidden = !1));
    }));
  function DA(Dn, DX) {
    let DL = DU;
    if (!DL || Dn.pointerId !== DL.pointer) return;
    ((DU = null), (DC.hidden = !0));
    try {
      Dt.releasePointerCapture(DL.pointer);
    } catch {}
    if (!DX) return;
    if (!DL.band) {
      DL.spot ? DZ(DL.spot, Dn.shiftKey) : Dn.shiftKey || DO([], !1);
      return;
    }
    let Db = Dt.getBoundingClientRect(),
      [Dx, Dy, DW, Dq] = DL.box,
      DP = [];
    for (let [DY, Dv] of DV) {
      let DB = Dv.getBoundingClientRect(),
        DG = DB.left + DB.width / 2 - Db.left,
        Dg = DB.top + DB.height / 2 - Db.top;
      DG >= Dx && DG <= DW && Dg >= Dy && Dg <= Dq && DP.push(DY);
    }
    Dn.ctrlKey || Dn.metaKey ? DJ(DP) : DO(DP, Dn.shiftKey);
  }
  return (
    window.addEventListener('pointerup', (Dn) => DA(Dn, !0)),
    window.addEventListener('pointercancel', (Dn) => DA(Dn, !1)),
    DQ(),
    { show: DR, paint: Dj }
  );
}
var $n = (D3, D4 = {}, ...D5) => {
    let D6 = Object.assign(document.createElement(D3), D4);
    return (D6.append(...D5), D6);
  },
  du = 'cgstuff.library.stage',
  uu = (D3) => +Number(D3).toFixed(4),
  Oo = (D3, D4) => +Number(D3).toFixed(D4),
  Ts = { least: 180, first: 260, shape: 260 / 170 },
  da = [
    'lens',
    'sensor',
    'orthoScale',
    'resX',
    'resY',
    'roll',
    'shiftX',
    'shiftY',
    'clipStart',
    'clipEnd',
  ],
  zi = (D3) =>
    [...D3.position, ...D3.target, D3.type === 'ortho' ? 1 : 0, ...da.map((D4) => D3[D4])]
      .map((D4) => +Number(D4).toFixed(3))
      .join(',');
function pu(D3) {
  if (D3 == null || D3 === '') return null;
  let D4 = String(D3).split(',').map(Number);
  if (!D4.every(Number.isFinite)) return null;
  if (D4.length === 7)
    return k4({ position: D4.slice(0, 3), target: D4.slice(3, 6), lens: k1(D4[6], 16 / 9) });
  if (D4.length !== 7 + da.length) return null;
  let D5 = { position: D4.slice(0, 3), target: D4.slice(3, 6), type: D4[6] ? 'ortho' : 'persp' };
  return (
    da.forEach((D6, D7) => {
      D5[D6] = D4[7 + D7];
    }),
    k4(D5)
  );
}
var fu = [
  [
    'thirds',
    'Thirds',
    'The frame in three each way: put what matters on a line, or where two cross',
    '<line x1="33.333" y1="0" x2="33.333" y2="100"/><line x1="66.667" y1="0" x2="66.667" y2="100"/><line x1="0" y1="33.333" x2="100" y2="33.333"/><line x1="0" y1="66.667" x2="100" y2="66.667"/>',
  ],
  [
    'centre',
    'Centre',
    'The middle of the frame',
    '<line x1="50" y1="42" x2="50" y2="58"/><line x1="45.5" y1="50" x2="54.5" y2="50"/>',
  ],
  [
    'diagonals',
    'Diagonals',
    'Corner to corner',
    '<line x1="0" y1="0" x2="100" y2="100"/><line x1="100" y1="0" x2="0" y2="100"/>',
  ],
  [
    'safe',
    'Safe areas',
    'Keep action inside the outer box and words inside the inner one: the edges of a screen can be cut off',
    '<rect x="5" y="5" width="90" height="90"/><rect x="10" y="10" width="80" height="80"/>',
  ],
];
function hu({
  mount: D3,
  stage: D4,
  player: D5,
  three: D6,
  onChange: D7 = () => {},
  work: D8 = null,
}) {
  let D9 = null,
    Dk = 0,
    Dw = () => {
      (D9 && D8?.camera() && D8.keep(DV()), D7());
    },
    DV = () => (D9 ? { ...D9, position: [...D9.position], target: [...D9.target] } : null),
    DD = { locked: !1, shown: !0, window: !0, wide: Ts.first, dim: 60, guides: {} };
  try {
    Object.assign(DD, JSON.parse(localStorage.getItem(du) || '{}'));
  } catch {}
  ((!DD.guides || typeof DD.guides != 'object') && (DD.guides = {}),
    (DD.dim = Number.isFinite(Number(DD.dim)) ? Math.max(0, Math.min(100, Number(DD.dim))) : 60));
  let Dm = () => {
      try {
        localStorage.setItem(du, JSON.stringify(DD));
      } catch {}
    },
    DS = () => D5.getView(),
    DE = () => D9.resX / D9.resY,
    DF = () => D9.type === 'ortho',
    DC = () => v(D9),
    DH = () => Y(D9),
    De = () => {
      let mb = DS();
      return {
        position: mb.camera.position.toArray().map(uu),
        target: mb.controls.target.toArray().map(uu),
      };
    },
    DR = () => ({
      dim: DD.dim / 100,
      guides: fu
        .filter(([mb]) => DD.guides[mb])
        .map((mb) => mb[3])
        .join(''),
    }),
    DQ = B({
      player: D5,
      stage: D4,
      locked: () => !!DD.locked,
      onLeft: () => mL(),
      onMoved(mb) {
        return (
          (D9 = k4({ ...D9, ...mb })),
          mL(),
          clearTimeout(Dk),
          (Dk = setTimeout(Dw, 300)),
          D9
        );
      },
    }),
    Dj = () => DQ.hear();
  function Dz(mb) {
    (Dj(), mb && D9 ? DQ.look(D9, DR()) : DQ.leave(!0), mL());
  }
  function DO() {
    if ((Dj(), !DQ.on)) {
      let mb = DS(),
        mx = De();
      ((D9 = k4(D9 ? { ...D9, ...mx } : { ...mx, lens: k1(mb.camera.fov, 16 / 9) })),
        DQ.look(D9, DR()));
    }
    (mL(), Dw());
  }
  function DJ(mb, mx = !0) {
    D9 && ((D9 = k4({ ...D9, ...mb })), DQ.on && DQ.look(D9), mL(), mx && Dw());
  }
  let DZ = $n('b', { className: 'lib-shotpip__pic' }),
    DU = $n('i', {
      className: 'lib-shotpip__grip',
      title: 'Drag to make this picture larger or smaller',
    }),
    DK = $n(
      'div',
      { className: 'lib-shotpip', hidden: !0 },
      DU,
      $n('span', { textContent: 'The shot' }),
      DZ,
    );
  D4.prepend(DK);
  let DT = null,
    DA = null,
    Dn = () =>
      Math.max(
        Ts.least,
        Math.floor(Math.min(D4.clientWidth * 0.6, D4.clientHeight * 0.7 * Ts.shape)),
      );
  function DX(mb, mx = 1 / 0) {
    ((DD.wide = Math.round(Math.min(mx, Math.max(Ts.least, Number(mb) || Ts.first)))),
      (DK.style.width = DD.wide + 'px'));
  }
  DX(DD.wide);
  function DL() {
    if (((DT = null), DK.hidden || !D9)) return;
    let mb = DK.clientWidth - 8,
      mx = DK.clientHeight - 24,
      my = DE();
    if (mb < 16 || mx < 16) return;
    let mW = Math.round(Math.min(mb, mx * my)),
      mq = Math.round(mW / my);
    Object.assign(DZ.style, {
      left: Math.round(4 + (mb - mW) / 2) + 'px',
      top: Math.round(20 + (mx - mq) / 2) + 'px',
      width: mW + 'px',
      height: mq + 'px',
    });
    let mP = D4.getBoundingClientRect(),
      mY = DZ.getBoundingClientRect();
    DT = { x: Math.round(mY.left - mP.left), y: Math.round(mY.top - mP.top), w: mW, h: mq };
  }
  {
    let mb = null,
      mx = (mW) => {
        mb &&
          (DX(
            Math.max(
              mb.right - (mW.clientX - mb.dx),
              (mb.bottom - (mW.clientY - mb.dy)) * Ts.shape,
            ),
            Dn(),
          ),
          mn());
      },
      my = () => {
        if (mb) {
          mb = null;
          for (let [mW, mq] of [
            ['pointermove', mx],
            ['pointerup', my],
            ['pointercancel', my],
          ])
            window.removeEventListener(mW, mq, !0);
          Dm();
        }
      };
    DU.addEventListener('pointerdown', (mW) => {
      if (mW.button !== 0 || mb) return;
      (mW.preventDefault(), mW.stopPropagation());
      let mq = DK.getBoundingClientRect();
      mb = {
        dx: mW.clientX - mq.left,
        dy: mW.clientY - mq.top,
        right: mq.right,
        bottom: mq.bottom,
      };
      for (let [mP, mY] of [
        ['pointermove', mx],
        ['pointerup', my],
        ['pointercancel', my],
      ])
        window.addEventListener(mP, mY, !0);
    });
  }
  let Db = (mW, mq, mP, mY = 'lib-btn lib-btn--sm') => {
      let mv = $n('button', { type: 'button', className: mY, textContent: mW, title: mq });
      return (mv.addEventListener('click', mP), mv);
    },
    Dx = (mW) => $n('input', { type: 'number', ...mW }),
    Dy = (mW) => $n('input', { type: 'range', ...mW }),
    DW = (mW) => $n('p', { className: 'lib-stagetool__head', textContent: mW }),
    Dq = (mW, mq, mP, { tag: mY = 'label', wide: mv = !1 } = {}) =>
      $n(
        mY,
        {
          className: 'lib-stagetool__field' + (mv ? ' lib-stagetool__field--wide' : ''),
          title: mq,
        },
        $n('span', { textContent: mW }),
        mP,
      ),
    DP = (mW, ...mq) => $n('span', { className: 'lib-stagetool__' + mW }, ...mq),
    DY = (mW, mq, mP, mY) => (
      mW.addEventListener('change', () => {
        ((DD[mq] = mW.checked), Dm(), mL());
      }),
      $n('label', { className: 'lib-check', title: mY }, mW, $n('span', { textContent: mP }))
    ),
    Dv = (mW, mq) =>
      mW.addEventListener('change', () => {
        let mP = Number(mW.value);
        mW.value !== '' && Number.isFinite(mP) ? mq(mP) : mL();
      }),
    DB = (mW, mq) => {
      (mW.addEventListener('input', () => mq(Number(mW.value), !1)),
        mW.addEventListener('change', () => mq(Number(mW.value), !0)));
    },
    DG = Db(
      'Set camera',
      'Put the camera where you are looking from now. Set again, it is moved there',
      DO,
    ),
    Dg = Db('Stage', 'The free view, to look round', () => Dz(!1), 'lib-btn lib-btn--axis'),
    DI = Db('Shot', 'Look through the camera', () => Dz(!0), 'lib-btn lib-btn--axis'),
    Dh = $n('input', { type: 'checkbox' }),
    DN = $n('input', { type: 'checkbox' }),
    DM = $n('input', { type: 'checkbox' }),
    m0 = $n('p', { className: 'lib-comp__hint' }),
    m1 = $n('input', { type: 'checkbox' }),
    m2 = $n('p', { className: 'lib-comp__hint' });
  m1.addEventListener('change', () => {
    (D9 && D8?.name() && D8.keep(m1.checked ? DV() : null), mL());
  });
  let m3 = ['Across', 'Up', 'Toward you'],
    m4 = m3.map((mW) => Dx({ step: 0.01, ariaLabel: mW })),
    m5 = m3.map((mW) => Dx({ step: 0.01, ariaLabel: mW }));
  (m4.forEach((mW, mq) =>
    Dv(mW, (mP) => DJ({ position: D9.position.map((mY, mv) => (mv === mq ? mP : mY)) })),
  ),
    m5.forEach((mW, mq) =>
      Dv(mW, (mP) => DJ({ target: D9.target.map((mY, mv) => (mv === mq ? mP : mY)) })),
    ));
  let m6 = Db(
      'Perspective',
      'As a camera sees: nearer things are bigger',
      () => DJ({ type: 'persp' }),
      'lib-btn lib-btn--axis',
    ),
    m7 = Db(
      'Ortho',
      'No perspective: the same size near and far, as in a plan or an elevation',
      () => DJ({ type: 'ortho' }),
      'lib-btn lib-btn--axis',
    ),
    m8 = Dy({ min: 12, max: 200, step: 1 }),
    m9 = Dx({ min: 8, max: 300, step: 1, ariaLabel: 'Focal length, millimetres' }),
    mk = Dx({ min: 5, max: 150, step: 0.1 }),
    mw = Dx({ min: 4, max: 100, step: 0.1 }),
    mV = Dx({ min: 0.05, max: 1000, step: 0.1 });
  (DB(m8, (mW, mq) => DJ({ lens: mW }, mq)),
    Dv(m9, (mW) => DJ({ lens: mW })),
    Dv(mk, (mW) => DJ({ lens: k0(mW, D9.sensor) })),
    Dv(mw, (mW) => DJ({ sensor: mW })),
    Dv(mV, (mW) => DJ({ orthoScale: mW })));
  let mD = Dq(
      'Focal length',
      'The focal length, as on a camera: a small number sees wide, a large one close',
      DP('with', m8, m9),
    ),
    mm = Dq(
      'Field of view \u00B0',
      "The angle the lens sees along the picture's longer side. It is the focal length said another way: change one and the other follows",
      mk,
    ),
    mS = Dq(
      'Sensor mm',
      "The size of the sensor, along the picture's longer side. 36 is a full-frame camera",
      mw,
    ),
    mE = Dq(
      'Ortho scale m',
      'An orthographic camera: how many metres the picture spans along its longer side',
      mV,
    ),
    mF = $n('select');
  for (let mW of kU) mF.add(Object.assign(new Option(mW.label, mW.id), { title: mW.hint }));
  (mF.add(new Option('Custom', 'custom')),
    mF.addEventListener('change', () => {
      if (mF.value !== 'custom') {
        let [mq, mP] = kK(mF.value).res;
        DJ({ resX: mq, resY: mP });
      }
    }));
  let mC = Dx({ min: 16, max: 16384, step: 1, ariaLabel: 'Pixels across' }),
    mt = Dx({ min: 16, max: 16384, step: 1, ariaLabel: 'Pixels down' });
  (Dv(mC, (mq) => DJ({ resX: mq })), Dv(mt, (mq) => DJ({ resY: mq })));
  let mH = Dy({ min: 0, max: 100, step: 1 });
  mH.addEventListener('input', () => {
    ((DD.dim = Number(mH.value)), Dm(), DQ.dress(DR()));
  });
  let me = Dx({ min: 0.001, max: 1000, step: 0.01, ariaLabel: 'Clip start, metres' }),
    mR = Dx({ min: 0.1, max: 100000, step: 1, ariaLabel: 'Clip end, metres' }),
    mQ = Dx({ min: -2, max: 2, step: 0.01, ariaLabel: 'Shift across' }),
    mj = Dx({ min: -2, max: 2, step: 0.01, ariaLabel: 'Shift up' }),
    mz = Dy({ min: -45, max: 45, step: 1 }),
    mO = Dx({ min: -180, max: 180, step: 1, ariaLabel: 'Roll, degrees' });
  (Dv(me, (mq) => DJ({ clipStart: mq })),
    Dv(mR, (mq) => DJ({ clipEnd: mq })),
    Dv(mQ, (mq) => DJ({ shiftX: mq })),
    Dv(mj, (mq) => DJ({ shiftY: mq })),
    DB(mz, (mq, mP) => DJ({ roll: mq }, mP)),
    Dv(mO, (mq) => DJ({ roll: mq })));
  let mJ = new Map(
      fu.map(([mq, mP, mY]) => [
        mq,
        Db(mP, mY, () => {
          ((DD.guides[mq] = !DD.guides[mq]), Dm(), mL());
        }),
      ]),
    ),
    mZ = $n(
      'fieldset',
      { className: 'lib-stagetool__set' },
      DW('Position'),
      Dq(
        'Stands at, m',
        'Where the camera stands, in metres: across, up, and toward you',
        DP('three', ...m4),
        { tag: 'div', wide: !0 },
      ),
      Dq(
        'Looks at, m',
        'The place the camera looks at, in metres: across, up, and toward you',
        DP('three', ...m5),
        { tag: 'div', wide: !0 },
      ),
      DW('Lens'),
      Dq('Type', 'With perspective, as a camera sees \u2014 or with none', DP('two', m6, m7), {
        tag: 'div',
      }),
      mD,
      mm,
      mS,
      mE,
      DW('Picture'),
      Dq('Shape', 'The shape of the picture', mF),
      Dq(
        'Resolution px',
        'How many pixels the picture is, across and down',
        DP('pair', mC, $n('span', { textContent: '\u00D7' }), mt),
        { tag: 'div' },
      ),
      Dq(
        'Dim outside',
        "How dark the view is outside the picture's frame, in Shot. It is not part of the picture",
        mH,
      ),
      DW('Clip, shift, roll'),
      Dq(
        'Clip start, end',
        'Nearer than the first and further than the second is not drawn, metres',
        DP('pair', me, $n('span', { textContent: '\u2013' }), mR),
        { tag: 'div' },
      ),
      Dq(
        'Shift X, Y',
        "The lens slid across the sensor, as a share of the picture's longer side: the picture moves without the camera turning, so upright lines stay upright",
        DP('pair', mQ, $n('span', { textContent: ',' }), mj),
        { tag: 'div' },
      ),
      Dq('Roll \u00B0', 'Tip the horizon: a tilted, uneasy frame', DP('with', mz, mO)),
      DW('Guides'),
      $n('p', {
        className: 'lib-comp__hint',
        textContent: 'Lines over the frame in Shot, to compose by. They are not in the picture.',
      }),
      $n('div', { className: 'lib-stagetool__two' }, ...mJ.values()),
    );
  D3.replaceChildren(
    $n(
      'div',
      { className: 'lib-comp__head' },
      $n('span', { className: 'lib-comp__title', textContent: 'Stage' }),
    ),
    $n('p', {
      className: 'lib-comp__hint',
      textContent:
        'A camera for the scene: look at your work from the angle it is meant to be seen from.',
    }),
    $n(
      'div',
      { className: 'lib-stagetool__row' },
      DG,
      $n('span', { className: 'lib-stagetool__gap' }),
      Dg,
      DI,
    ),
    DY(
      Dh,
      'locked',
      'Lock view to camera',
      'Looking through the camera, moving the view moves the camera with it. Off, moving the view leaves the camera where it was set',
    ),
    DY(
      DN,
      'shown',
      'Show the camera in the scene',
      'The camera drawn in the scene, where it stands and what it takes in, while you are not looking through it',
    ),
    DY(
      DM,
      'window',
      'Show the shot window',
      'What the camera sees, small, in a corner of the view while you look round. Drag its corner to make it larger or smaller',
    ),
    m0,
    ...(D8
      ? [
          $n(
            'label',
            {
              className: 'lib-check',
              title:
                'Ticked: this animation, which is one of your own, keeps this camera. Posted to the community, it is shown from here; picked again, this is its camera. Only your own animations keep one',
            },
            m1,
            $n('span', { textContent: 'Keep this view with this animation' }),
          ),
          m2,
        ]
      : []),
    mZ,
  );
  let mU = null,
    mK = !1;
  async function mT() {
    if (!(mU || mK)) {
      mK = !0;
      try {
        let mq = await D6(),
          mP = new mq['PerspectiveC' + 'amera'](40, 16 / 9, 0.05, 1),
          mY = new mq['CameraHelper'](mP);
        ((mY.name = 'stage-camera'),
          (mY.visible = !1),
          D5.addOverlay(mY),
          (mU = {
            ghost: mP,
            helper: mY,
            persp: new mq['PerspectiveC' + 'amera'](),
            none: new mq['Orthographic' + 'Camera'](-1, 1, 1, -1, 0.05, 500),
            at: new mq['Vector3'](),
          }),
          D5.setInset?.({ camera: () => DA, rect: () => DT }));
      } catch {
        mK = !1;
      }
    }
  }
  function mA(mq) {
    (mq.position.fromArray(D9.position),
      mq.up.fromArray(DH()),
      mq.lookAt(mU.at.fromArray(D9.target)));
  }
  function mn() {
    let mq = !!D9 && !DQ.on;
    if (((DK.hidden = !(mq && DD.window)), DL(), (DA = null), !mU)) return;
    let { ghost: mP, helper: mY, persp: mv, none: mB } = mU;
    if (
      ((mY.visible = mq && !!DD.shown),
      mY.visible &&
        (mA(mP),
        (mP.fov = DF() ? 18 : DC()),
        (mP.aspect = DE()),
        (mP.far = Math.max(0.3, Math.hypot(...D9.position.map((mG, mg) => mG - D9.target[mg])))),
        mP.updateProjectionMatrix(),
        mP.updateMatrixWorld(!0),
        mY.update()),
      DT)
    ) {
      let mG = DF() ? mB : mv;
      if ((mA(mG), (mG.near = D9.clipStart), (mG.far = D9.clipEnd), DF())) {
        let mI = k2(D9.orthoScale, DE()),
          mN = mI * DE();
        ((mG.top = mI / 2), (mG.bottom = -mI / 2), (mG.right = mN / 2), (mG.left = -mN / 2));
      } else ((mG.fov = DC()), (mG.aspect = DE()));
      let mg = k3(D9, DT.w, DT.h);
      (mg.x || mg.y ? mG.setViewOffset(DT.w, DT.h, mg.x, mg.y, DT.w, DT.h) : mG.clearViewOffset(),
        mG.updateProjectionMatrix(),
        mG.updateMatrixWorld(!0),
        (DA = mG));
    }
    D5.invalidate?.();
  }
  function mo() {
    (!mU &&
      D9 &&
      !DQ.on &&
      (DD.shown || DD.window) &&
      mT().then(() => {
        mU && mn();
      }),
      mn());
  }
  let mX = k4({});
  function mL() {
    let mq = (mB, mG) => {
        document.activeElement !== mB && mB.value !== String(mG) && (mB.value = String(mG));
      },
      mP = D9 ?? mX,
      mY = mP.type === 'ortho';
    if (
      ((Dg.disabled = DI.disabled = mZ.disabled = !D9),
      Dg.classList.toggle('is-on', !DQ.on),
      DI.classList.toggle('is-on', DQ.on),
      (Dh.checked = !!DD.locked),
      (DN.checked = !!DD.shown),
      (DM.checked = !!DD.window),
      D8)
    ) {
      let mB = D8.name();
      ((m1.disabled = !D9 || !mB),
        (m1.checked = !!(mB && D8.camera())),
        (m2.textContent = mB
          ? m1.checked
            ? '\u201C' + mB + '\u201D keeps this view: posted, it is shown from here.'
            : 'Tick, and \u201C' + mB + '\u201D keeps this view.'
          : 'Only your own animations keep a view: this one is not one of them.'));
    }
    ((m0.textContent = D9
      ? DQ.on
        ? DD.locked
          ? 'Looking through the camera: moving the view moves it.'
          : 'Looking through the camera. Moving the view leaves it where it is.'
        : 'The free view.'
      : 'No camera is set yet.'),
      m4.forEach((mG, mg) => mq(mG, Oo(mP.position[mg], 3))),
      m5.forEach((mG, mg) => mq(mG, Oo(mP.target[mg], 3))),
      m6.classList.toggle('is-on', !mY),
      m7.classList.toggle('is-on', mY));
    for (let mG of [mD, mm, mS]) mG.classList.toggle('is-off', mY);
    (mE.classList.toggle('is-off', !mY),
      mq(m8, Math.round(mP.lens)),
      mq(m9, Oo(mP.lens, 1)),
      mq(mk, Oo(M(mP.lens, mP.sensor), 1)),
      mq(mw, Oo(mP.sensor, 1)),
      mq(mV, Oo(mP.orthoScale, 2)));
    let mv = N(mP.resX, mP.resY);
    ((mF.value = mv),
      mq(mC, mP.resX),
      mq(mt, mP.resY),
      mq(mH, DD.dim),
      mq(me, Oo(mP.clipStart, 3)),
      mq(mR, Oo(mP.clipEnd, 2)),
      mq(mQ, Oo(mP.shiftX, 3)),
      mq(mj, Oo(mP.shiftY, 3)),
      mq(mz, Math.max(-45, Math.min(45, Math.round(mP.roll)))),
      mq(mO, Oo(mP.roll, 1)));
    for (let [mg, mI] of mJ) mI.classList.toggle('is-on', !!DD.guides[mg]);
    (DQ.dress(DR()), mo());
  }
  return (
    new ResizeObserver(() => mn()).observe(D4),
    new ResizeObserver(() => mn()).observe(DK),
    mL(),
    {
      get: DV,
      set(mq) {
        ((D9 = mq ? k4(mq) : null),
          DQ.on && (D9 ? DQ.look(D9) : DQ.leave(!0)),
          D9 && D8?.camera() && D8.keep(DV()),
          mL());
      },
      picked() {
        let mq = D8?.camera() ?? null;
        if (mq) {
          let mP = k4(mq);
          (!D9 || zi(mP) !== zi(D9)) && ((D9 = mP), DQ.on && DQ.look(D9), D7());
        }
        mL();
      },
      show() {
        (Dj(), mL());
      },
    }
  );
}
var Qn = (D3, D4 = {}, ...D5) => {
    let D6 = Object.assign(document.createElement(D3), D4);
    return (D6.append(...D5), D6);
  },
  Tp = 220,
  Pp = 4;
function mu({
  mount: D3,
  clips: D4,
  assetRoot: D5,
  onTake: D6,
  blend: D7 = null,
  own: D8 = null,
  onSave: D9 = null,
  hasView: Dk = null,
}) {
  let Dw = 'body',
    DV = 'both',
    DD = '',
    Dm = Object.entries(D4 ?? {})
      .filter(([, Dq]) => kT(Dq) && Dq.file && !Dq.deprecated && !Dq.unlisted)
      .map(([Dq, DP]) => ({
        id: Dq,
        kind: kT(DP),
        label: DP.label || Dq,
        tags: (DP.tags || []).join(' ').toLowerCase(),
        picture: DP.icon ? D5 + '/' + DP.icon : null,
        own: !1,
      })),
    DS = [],
    DE = (Dq, DP, DY, Dv = 'lib-btn lib-btn--axis') => {
      let DB = Qn('button', { type: 'button', className: Dv, textContent: Dq, title: DP });
      return (DB.addEventListener('click', DY), DB);
    },
    DF = {
      body: DE('Body', 'Poses of the whole character', () => {
        ((Dw = 'body'), Db());
      }),
      hand: DE('Hand', 'Poses of the hand: the fingers take them, and nothing else does', () => {
        ((Dw = 'hand'), Db());
      }),
    },
    DC = {
      l: DE('Left', 'The left hand takes it', () => {
        ((DV = 'l'), Db());
      }),
      r: DE('Right', 'The right hand takes it', () => {
        ((DV = 'r'), Db());
      }),
      both: DE('Both', 'Both hands take it', () => {
        ((DV = 'both'), Db());
      }),
    },
    Dt = Qn('input', { type: 'checkbox' }),
    DH = Qn('span', { textContent: 'Only the picked parts' }),
    De = Qn('input', { type: 'checkbox' }),
    DR = () => !!Dk?.() && De.checked,
    DQ = DE(
      'Save this pose',
      'Keep the character as it stands on this frame as a pose of your own',
      () => D9?.('body', null, { view: DR() }),
      'lib-btn lib-btn--sm',
    ),
    Dj = DE(
      'Save this hand',
      '',
      () => D9?.('hand', DV === 'l' ? 'l' : 'r', { view: DR() }),
      'lib-btn lib-btn--sm',
    ),
    Dz = Qn(
      'label',
      { className: 'lib-check lib-poses__view' },
      De,
      Qn('span', { textContent: 'With this view' }),
    );
  function DO() {
    let Dq = !!Dk?.();
    ((De.disabled = !Dq),
      Dz.classList.toggle('is-disabled', !Dq),
      (Dz.title = Dq
        ? 'Ticked: the pose is kept with the camera that is set in Stage. Posted to the community, it is shown from there. Its picture here does not change'
        : 'There is no camera to keep: set one in the Stage tool first'));
  }
  let DJ = Qn('div', { className: 'lib-grid' }),
    DZ = new Map(),
    DU = (Dq) => !!(Dq?.ctrlKey || Dq?.metaKey);
  function DK() {
    ((DS = [
      ...Dm,
      ...(D8?.all() ?? []).map((Dq) => ({
        id: Dq.id,
        kind: Dq.kind,
        label: Dq.name,
        tags: Dq.from ? 'yours mine remix' : 'yours mine',
        picture: D8.pictureUrl(Dq.id),
        own: !0,
        from: Dq.from ?? null,
      })),
    ].sort((Dq, DP) => Dq.label.localeCompare(DP.label))),
      DZ.clear(),
      DJ.replaceChildren());
    for (let Dq of DS) {
      let DP = Qn('div', { className: 'lib-tile__media' });
      if (Dq.picture) {
        let Dv = Qn('img', {
          alt: '',
          loading: 'lazy',
          decoding: 'async',
          draggable: !1,
          src: Dq.picture,
        });
        (Dv.addEventListener('error', () => Dv.remove()), DP.append(Dv));
      }
      let DY = Qn(
        'button',
        {
          type: 'button',
          className: 'lib-tile lib-tile--pose' + (Dq.own ? ' is-own' : ''),
          title:
            Dq.label +
            ' \u2014 click to put it on the character on this frame, drag across it to go part of the way \u00B7 Ctrl: its mirror image',
        },
        DP,
        Qn(
          'div',
          { className: 'lib-tile__body' },
          Qn('span', { className: 'lib-tile__name', textContent: Dq.label }),
        ),
      );
      if (Dq.own) {
        let DB = (DG, Dg, DI) => {
          let Dh = Qn('span', {
            className: 'lib-tile__own-tool',
            textContent: DG,
            title: Dg,
            role: 'button',
            tabIndex: 0,
          });
          return (
            Dh.addEventListener('pointerdown', (DN) => DN.stopPropagation()),
            Dh.addEventListener('click', (DN) => {
              DN.stopPropagation();
              Promise.resolve().then(DI).catch((error) => window.alert('Could not update the pose: ' + error.message));
            }),
            Dh
          );
        };
        DY.append(
          Qn('span', {
            className: 'lib-tile__own',
            textContent: Dq.from ? 'Remix' : 'Yours',
            title: Dq.from
              ? 'A remix of \u201C' + Dq.from.name + '\u201D by ' + (Dq.from.by?.name ?? 'someone')
              : '',
          }),
          Qn(
            'span',
            { className: 'lib-tile__own-tools' },
            DB('\u270E', 'Rename this pose', () => {
              let DG = window.prompt('A new name for this pose', Dq.label);
              return DG?.trim() && D8.rename(Dq.id, DG);
            }),
            DB('\u2715', 'Take this pose out of your poses', () => {
              return window.confirm(
                'Take \u201C' + Dq.label + '\u201D out of your poses? It cannot be brought back.',
              ) && D8.remove(Dq.id);
            }),
          ),
        );
      }
      (DY.addEventListener('click', (DG) => {
        if (DA) {
          DA = !1;
          return;
        }
        D6(Dq.id, { kind: Dq.kind, hand: DV, mirrored: DU(DG) });
      }),
        DY.addEventListener('pointerdown', (DG) => Dn(DG, Dq, DY)),
        DJ.append(DY),
        DZ.set(Dq.id, DY));
    }
    Db();
  }
  D3.replaceChildren(
    Qn(
      'div',
      { className: 'lib-poses__modes' },
      DF.body,
      DF.hand,
      Qn('span', { className: 'lib-poses__gap' }),
      DC.l,
      DC.r,
      DC.both,
    ),
    Qn(
      'label',
      {
        className: 'lib-check lib-poses__only',
        title:
          'Ticked: a pose goes onto the joints that are picked \u2014 in the view, or on the Picker \u2014 and no others. With nothing picked, or not ticked, it goes onto every joint it turns',
      },
      Dt,
      DH,
    ),
    ...(D9 ? [Qn('div', { className: 'lib-poses__save' }, DQ, Dj), ...(Dk ? [Dz] : [])] : []),
    DJ,
  );
  let DT = null,
    DA = !1;
  function Dn(Dq, DP, DY) {
    if (!(Dq.button !== 0 || DT || !D7)) {
      ((DA = !1), (DT = { p: DP, tile: DY, x: Dq.clientX, pointer: Dq.pointerId, on: !1, t: 0 }));
      try {
        DY.setPointerCapture(Dq.pointerId);
      } catch {}
    }
  }
  function DX(Dq, DP) {
    ((DT.t = Dq), (DT.tile.dataset.blend = Math.round(Dq * 100) + '%'), D7.to(Dq, DP));
  }
  function DL(Dq) {
    let DP = DT;
    if (DP) {
      DT = null;
      try {
        DP.tile.releasePointerCapture(DP.pointer);
      } catch {}
      (DP.tile.classList.remove('is-blending'),
        delete DP.tile.dataset.blend,
        DP.on && D7.end(!!Dq && DP.t > 0));
    }
  }
  (window.addEventListener('pointermove', (Dq) => {
    if (!DT || Dq.pointerId !== DT.pointer) return;
    if (DT.on && Dq.buttons & 2) {
      DL(!1);
      return;
    }
    let DP = Dq.clientX - DT.x;
    if (!DT.on) {
      if (Math.abs(DP) < Pp || !D7.begin(DT.p.id, { kind: DT.p.kind, hand: DV, mirrored: DU(Dq) }))
        return;
      ((DT.on = DA = !0), DT.tile.classList.add('is-blending'));
    }
    DX(Math.max(0, Math.min(1, DP / Tp)), DU(Dq));
  }),
    window.addEventListener('pointerup', (Dq) => {
      (DT && Dq.pointerId === DT.pointer && DL(!0),
        DA &&
          setTimeout(() => {
            DA = !1;
          }, 0));
    }),
    window.addEventListener('pointercancel', (Dq) => {
      DT && Dq.pointerId === DT.pointer && DL(!1);
    }),
    window.addEventListener(
      'keydown',
      (Dq) => {
        DT?.on &&
          (Dq.key === 'Escape'
            ? (Dq.preventDefault(), Dq.stopImmediatePropagation(), DL(!1))
            : (Dq.key === 'Control' || Dq.key === 'Meta') && DX(DT.t, !0));
      },
      !0,
    ),
    window.addEventListener(
      'keyup',
      (Dq) => {
        DT?.on && (Dq.key === 'Control' || Dq.key === 'Meta') && DX(DT.t, !1);
      },
      !0,
    ),
    window.addEventListener(
      'contextmenu',
      (Dq) => {
        (DT?.on || DA) && Dq.preventDefault();
      },
      !0,
    ));
  function Db() {
    let Dq = 0;
    for (let DP of DS) {
      let DY =
        DP.kind !== Dw ||
        (!!DD &&
          !DP.label.toLowerCase().includes(DD) &&
          !DP.id.includes(DD) &&
          !DP.tags.includes(DD));
      ((DZ.get(DP.id).hidden = DY), DY || Dq++);
    }
    for (let [Dv, DB] of Object.entries(DF)) DB.classList.toggle('is-on', Dv === Dw);
    for (let [DG, Dg] of Object.entries(DC))
      (Dg.classList.toggle('is-on', DG === DV), (Dg.disabled = Dw !== 'hand'));
    return (
      (Dj.title =
        'Keep the ' +
        (DV === 'l' ? 'left' : 'right') +
        ' hand as it is on this frame as a hand pose of your own' +
        (DV === 'both' ? ' (with Both chosen: the right)' : '') +
        '. It goes onto either hand afterwards'),
      Dx?.(Dq),
      Dq
    );
  }
  let Dx = null,
    Dy = 0,
    DW = () => {
      DH.textContent = Dt.checked
        ? Dy
          ? 'Only the picked parts (' + Dy + ')'
          : 'Only the picked parts (none picked)'
        : 'Only the picked parts';
    };
  return (
    Dt.addEventListener('change', DW),
    D8?.onChange(DK),
    DK(),
    DO(),
    {
      paintView: DO,
      filter(Dq) {
        return (
          (DD = String(Dq ?? '')
            .trim()
            .toLowerCase()),
          Db()
        );
      },
      onCount(Dq) {
        Dx = Dq;
      },
      onlyPicked: () => Dt.checked,
      setPicked(Dq) {
        Dq !== Dy && ((Dy = Dq), DW());
      },
      showKind(Dq) {
        (Dq === 'body' || Dq === 'hand') && ((Dw = Dq), Db());
      },
    }
  );
}
var Fp = ['thumb', 'index', 'middle', 'ring', 'pinky'],
  gu = (D3) => ['clavicle_' + D3, 'upperarm_' + D3, 'lowerarm_' + D3, 'hand_' + D3],
  bu = (D3) => ['thigh_' + D3, 'calf_' + D3, 'foot_' + D3, 'ball_' + D3],
  wu = (D3) => Fp.flatMap((D4) => [1, 2, 3].map((D5) => D4 + '_0' + D5 + '_' + D3)),
  yu = [
    ['Hips & spine', ['root', 'pelvis', 'spine_01', 'spine_02', 'spine_03', 'neck_01', 'Head'], !0],
    ['Left arm', gu('l'), !0],
    ['Right arm', gu('r'), !0],
    ['Left leg', bu('l'), !0],
    ['Right leg', bu('r'), !0],
    ['Left fingers', wu('l'), !1],
    ['Right fingers', wu('r'), !1],
  ],
  ua = {
    root: 'Root',
    pelvis: 'Pelvis',
    spine_01: 'Spine 1',
    spine_02: 'Spine 2',
    spine_03: 'Spine 3 (chest)',
    neck_01: 'Neck',
    Head: 'Head',
    clavicle: 'Clavicle',
    upperarm: 'Upper arm',
    lowerarm: 'Forearm',
    hand: 'Hand',
    thigh: 'Thigh',
    calf: 'Shin',
    foot: 'Foot',
    ball: 'Toes',
  },
  ys = (D3) => {
    if (ua[D3]) return ua[D3];
    let D4 = /^([a-z]+)_(\d+_)?([lr])$/.exec(D3);
    if (!D4) return D3;
    let D5 = ua[D4[1]] ?? D4[1][0].toUpperCase() + D4[1].slice(1);
    return D4[2] ? D5 + ' ' + +D4[2].slice(0, -1) : D5;
  },
  ku = ['spine_01', 'spine_02', 'spine_03'],
  fa = (D3, D4) =>
    kj.includes(D3) || (ku.includes(D3) && !ku.some((D5) => D4[D5]) && D3 === 'spine_01');
function vu({
  mount: D3,
  player: D4,
  ourParent: D5 = new Map(),
  THREE: D6,
  onChange: D7,
  onClose: D8,
  onSaveFile: D9 = null,
  readFile: Dk = null,
  ourFigure: Dw = null,
}) {
  let DV = !1,
    DD = '',
    Dm = null,
    DS = {},
    DE = null,
    DF = null,
    DC = !1,
    Dt = !1,
    DH = () => {
      Dt && Dm?.ready && D4.getState().restPreview !== 'T' && D4.setRestPreview('T', 'T');
    },
    De = 'cgstuff.retarget.sideBySide',
    DR = 'cgstuff.retarget.autoMirror',
    DQ = (m1, m2) => {
      try {
        let m3 = localStorage.getItem(m1);
        return m3 == null ? m2 : m3 === '1';
      } catch {
        return m2;
      }
    },
    Dj = (m1, m2) => {
      try {
        localStorage.setItem(m1, m2 ? '1' : '0');
      } catch {}
    },
    Dz = DQ(De, !0),
    DO = DQ(DR, !0),
    DJ = null,
    DZ = !1,
    DU = null,
    DK = () => yu.flatMap((m1) => m1[1]);
  function DT() {
    ((DZ = !1), D4.setOurFigure?.(null));
  }
  async function DA() {
    if (!DV || !Dz || !Dw || !D4.setOurFigure) {
      DT();
      return;
    }
    if (DZ) {
      Dv();
      return;
    }
    if (((DJ ??= await Dw()), !DV || !Dz || DZ)) return;
    ((DZ = !0), Dt || ((Dt = !0), DH(), DM()));
    let m1 = new Map();
    (DJ.traverse((m2) => {
      m2.isBone && !m1.has(m2.name) && m1.set(m2.name, m2);
    }),
      D4.setOurFigure({
        root: DJ,
        bones: DK()
          .filter((m2) => m1.has(m2))
          .map((m2) => ({ id: m2, bone: m1.get(m2), label: ys(m2) + ' \u2014 ours' })),
        onPick: Db,
      }),
      Dv());
  }
  let Dn = (m1) =>
    /_l$/.test(m1) ? m1.replace(/_l$/, '_r') : /_r$/.test(m1) ? m1.replace(/_r$/, '_l') : null;
  function DX(m1) {
    let m2 = DS.pelvis && Dq(DS.pelvis),
      m3 = Dq(m1);
    if (!m2 || !m3) return null;
    let m4 = m3.clone();
    m4.x = 2 * m2.x - m3.x;
    let m5 = null,
      m6 = 1 / 0;
    for (let m7 of Dm.bones) {
      let m8 = Dq(m7);
      if (!m8 || m7 === m1) continue;
      let m9 = m8.distanceTo(m4);
      m9 < m6 && ((m6 = m9), (m5 = m7));
    }
    return m6 < 0.05 ? m5 : null;
  }
  function DL(m1, m2) {
    if (DO) {
      let m3 = Dn(m1),
        m4 = m3 && DX(m2);
      m3 && m4 && (DS[m3] = m4);
    }
    Dg(m1, m2);
  }
  function Db(m1) {
    if (DU) {
      let m2 = DU;
      ((DU = null), (DE = null), (DF = m1), DL(m1, m2));
      return;
    }
    ((DE = DE === m1 ? null : m1),
      (DF = m1),
      DM(),
      DE && DN(ys(DE) + ': now click its match on \u201C' + DD + '\u201D.'));
  }
  let Dx = (m1, m2, m3) => {
      let m4 = document.createElement(m1);
      return (m2 && (m4.className = m2), m3 != null && (m4.textContent = m3), m4);
    },
    Dy = (m1, m2, m3, m4 = 'lib-btn lib-btn--sm') => {
      let m5 = Dx('button', m4, m1);
      return (
        (m5.type = 'button'),
        (m5.title = m2),
        m5.addEventListener('click', (m6) => {
          (m6.stopPropagation(), m3(m6));
        }),
        m5
      );
    },
    DW = (m1) => Dm?.names?.[m1] ?? m1,
    Dq = (m1) => (Dm?.joints?.[m1] ? Dm.joints[m1].clone().applyMatrix4(Dm.place) : null);
  function DP() {
    let m1 = new Map(),
      m2 = (m6, m7) => m1.set(m6, [...(m1.get(m6) ?? []), m7]),
      m3 = new Map();
    for (let [m6, m7] of Object.entries(DS)) m3.set(m7, [...(m3.get(m7) ?? []), m6]);
    let m4 = DS.pelvis && Dq(DS.pelvis),
      m5 = (m8, m9) => {
        for (let mk = Dm.parents[m8]; mk; mk = Dm.parents[mk]) if (mk === m9) return !0;
        return !1;
      };
    for (let [m8, m9] of Object.entries(DS)) {
      m3.get(m9).length > 1 &&
        m2(
          m8,
          'also used for ' +
            m3
              .get(m9)
              .filter((mm) => mm !== m8)
              .map(ys)
              .join(', '),
        );
      let mk = /_([lr])$/.exec(m8)?.[1],
        mw = Dq(m9);
      mk &&
        m4 &&
        mw &&
        Math.abs(mw.x - m4.x) > 0.02 &&
        Math.sign(mw.x - m4.x) !== (mk === 'l' ? 1 : -1) &&
        m2(m8, 'on the other side of the body');
      let mV = D5.get(m8);
      for (; mV && !DS[mV];) mV = D5.get(mV);
      mV &&
        mV !== 'root' &&
        DS[mV] !== m9 &&
        !m5(m9, DS[mV]) &&
        m2(m8, 'not under ' + DW(DS[mV]) + ' (' + ys(mV) + ')');
      let mD = Dm.align?.info?.get(m8)?.swing;
      mD > 60 &&
        m2(m8, 'points ' + Math.round(mD) + '\u00B0 away from ours \u2014 probably the wrong bone');
    }
    return m1;
  }
  function DY() {
    let m1 = D4.getCustom?.();
    if (!DV || !m1 || !Dm?.bones) {
      D4.setJointPicker?.(null);
      return;
    }
    let m2 = new Map();
    (m1.companion.traverse((m3) => {
      m3.isBone && !m2.has(m3.name) && m2.set(m3.name, m3);
    }),
      D4.setJointPicker({
        bones: Dm.bones
          .filter((m3) => m2.has(m3))
          .map((m3) => ({ id: m3, bone: m2.get(m3), label: DW(m3) })),
        onPick: DB,
      }),
      Dv(),
      DA());
  }
  function Dv() {
    let m1 = DP(),
      m2 = new Map();
    for (let [m4, m5] of Object.entries(DS)) m2.set(m5, m1.has(m4) ? 'bad' : 'mapped');
    (DF && DS[DF] && m2.set(DS[DF], 'sel'), DU && m2.set(DU, 'sel'), D4.markJoints?.(m2));
    let m3 = new Map();
    for (let m6 of DK())
      m3.set(
        m6,
        m6 === DE || (m6 === DF && !DU)
          ? 'sel'
          : m1.has(m6) || (fa(m6, DS) && !DS[m6])
            ? 'bad'
            : DS[m6]
              ? 'mapped'
              : 'free',
      );
    D4.markOurJoints?.(m3);
  }
  function DB(m1) {
    if (DE) {
      let m3 = DE;
      ((DE = null), (DF = m3), DL(m3, m1));
      return;
    }
    if (Dz && Dw && ((DU = DU === m1 ? null : m1), Dv(), DU)) {
      DN(DW(m1) + ': now click the joint of ours it plays.');
      return;
    }
    let m2 = Object.keys(DS).find((m4) => DS[m4] === m1);
    ((DF = m2 ?? null),
      DM(),
      m2
        ? D3.querySelector('[data-our="' + m2 + '"]')?.scrollIntoView({ block: 'nearest' })
        : DN(DW(m1) + ' isn\u2019t mapped. Press \u25CE on a row, then click it.'));
  }
  async function DG() {
    ((DC = !0), DM());
    try {
      await D7({ ...DS });
    } finally {
      ((DC = !1), DH(), DM());
    }
  }
  function Dg(m1, m2) {
    (m2 ? (DS[m1] = m2) : delete DS[m1], DG());
  }
  function DI() {
    let m1 = DS.pelvis && Dq(DS.pelvis);
    if (!m1) return DN('Map the pelvis first \u2014 mirroring is across it.');
    for (let [m2, m3] of Object.entries({ ...DS })) {
      if (!/_l$/.test(m2)) continue;
      let m4 = Dq(m3);
      if (!m4) continue;
      let m5 = m4.clone();
      m5.x = 2 * m1.x - m4.x;
      let m6 = null,
        m7 = 1 / 0;
      for (let m8 of Dm.bones) {
        let m9 = Dq(m8);
        if (!m9 || m8 === m3) continue;
        let mk = m9.distanceTo(m5);
        mk < m7 && ((m7 = mk), (m6 = m8));
      }
      m6 && m7 < 0.05 && (DS[m2.replace(/_l$/, '_r')] = m6);
    }
    DG();
  }
  let Dh = null;
  function DN(m1) {
    Dh && ((Dh.textContent = m1), (Dh.hidden = !m1));
  }
  function DM() {
    if (!DV) return;
    D3.innerHTML = '';
    let m1 = Dx('div', 'lib-comp__head');
    m1.appendChild(Dx('span', 'lib-comp__title', 'Retarget'));
    let m2 = DP(),
      m3 = Dm?.missing ?? [],
      m4 = Dm?.ready && !m2.size;
    (m1.appendChild(
      Dy(
        m4 ? 'Done \u2713' : 'Close',
        m4
          ? 'Every bone checks out \u2014 back to the Character tool'
          : 'Back to the Character tool \u2014 the mapping is saved as it is',
        () => D8(),
        'lib-btn lib-btn--sm' + (m4 ? ' is-good' : ''),
      ),
    ),
      D3.appendChild(m1));
    let m5 = Object.keys(DS).length,
      m6 = Dx(
        'p',
        'lib-retarget__status' + (m3.length ? ' is-missing' : m2.size ? ' is-warn' : ' is-ready'),
      );
    ((m6.textContent =
      '\u201C' +
      DD +
      '\u201D \u00B7 ' +
      m5 +
      ' of ours mapped \u00B7 ' +
      (m3.length
        ? 'still needed: ' +
          m3
            .map((mF) =>
              mF === 'spine'
                ? 'a spine bone'
                : ys(mF) + (/_l$/.test(mF) ? ' (L)' : /_r$/.test(mF) ? ' (R)' : ''),
            )
            .join(', ')
        : m2.size
          ? 'plays, but ' +
            m2.size +
            ' row' +
            (m2.size === 1 ? ' needs' : 's need') +
            ' a look (\u26A0 below)'
          : '\u2713 all correct \u2014 clips play on it')),
      D3.appendChild(m6));
    let m7 =
      Dm?.source?.kind === 'saved'
        ? 'Started from your saved mapping for this rig.'
        : Dm?.source?.kind === 'known'
          ? 'Recognised: ' + Dm.source.label + ' \u2014 mapped by its names.'
          : Dm?.known
            ? 'Recognised: ' + Dm.known.label + '.'
            : '';
    (m7 || Dm?.skeletonOnly) &&
      D3.appendChild(
        Dx(
          'p',
          'lib-retarget__note',
          [m7, Dm?.skeletonOnly ? 'A skeleton only \u2014 no mesh; its bones are drawn.' : '']
            .filter(Boolean)
            .join(' '),
        ),
      );
    let m8 = Dm?.unweighted ?? [];
    if (m8.length) {
      let mF = Dm.bones.length,
        mC = m8.slice(0, 8).join(', ') + (m8.length > 8 ? ' and ' + (m8.length - 8) + ' more' : '');
      D3.appendChild(
        Dx(
          'p',
          'lib-retarget__note',
          'This skeleton has ' +
            (mF + m8.length) +
            ' bones, but only ' +
            mF +
            ' ' +
            (mF === 1 ? 'is' : 'are') +
            ' listed: the other ' +
            m8.length +
            ' ' +
            (m8.length === 1 ? 'has' : 'have') +
            ' no skin weights, so ' +
            (m8.length === 1 ? 'it moves' : 'they move') +
            ' nothing (' +
            mC +
            '). Weight the mesh to them in your 3D software and add the file again.',
        ),
      );
    }
    let m9 = Dx('div', 'lib-retarget__tools');
    if (
      (m9.append(
        Dy(
          'Auto-map',
          Dm?.known
            ? 'Start again from the suggestion (' + Dm.known.label + ')'
            : 'Start again from the suggestion',
          () => {
            ((DS = { ...Dm.suggested }), DG());
          },
        ),
        Dy(
          'Mirror L \u2192 R',
          'Map each right-side bone from its left twin, mirrored across the body',
          DI,
        ),
        Dy('Clear', 'Unmap every bone', () => {
          confirm('Unmap every bone?') && ((DS = {}), DG());
        }),
      ),
      D9 &&
        m9.append(
          Dy(
            'Save mapping\u2026',
            'Download this mapping as a file \u2014 to keep, or to share with someone who has the same rig',
            () => D9(),
          ),
        ),
      Dk)
    ) {
      let mt = Dx('input');
      ((mt.type = 'file'),
        (mt.accept = '.json,application/json'),
        (mt.hidden = !0),
        mt.addEventListener('change', async () => {
          let mH = mt.files?.[0];
          if (((mt.value = ''), !!mH))
            try {
              let me = await Dk(mH);
              ((DS = me.map),
                DN(
                  Object.keys(me.map).length +
                    ' bones from the file' +
                    (me.lost ? ', ' + me.lost + ' not in this rig' : '') +
                    (me.sameRig ? '' : ' \u2014 it was made for another rig, so check it') +
                    '.',
                ),
                DG());
            } catch (mR) {
              DN(mR.message);
            }
        }),
        m9.append(
          Dy('Load mapping\u2026', 'Use a mapping file saved from this or a similar rig', () =>
            mt.click(),
          ),
          mt,
        ));
    }
    D3.appendChild(m9);
    let mk = D4.getState(),
      mw = Dt || mk.restPreview === 'T',
      mV = Dx('label', 'lib-check lib-retarget__hold');
    mV.title =
      'Freezes the character in our T-pose, the pose every clip starts from. Only what you see \u2014 the mapping and the animation are untouched.';
    let mD = Dx('input');
    if (
      ((mD.type = 'checkbox'),
      (mD.checked = mw),
      (mD.disabled = !Dm?.ready),
      mD.addEventListener('change', () => {
        ((Dt = mD.checked), D4.setRestPreview(Dt ? 'T' : null, Dt ? 'T' : null), DM());
      }),
      mV.append(mD, ' Hold in T-pose (to check)'),
      D3.appendChild(mV),
      Dw)
    ) {
      let mH = Dx('label', 'lib-check lib-retarget__hold');
      mH.title =
        'Our mannequin beside theirs: click a joint of ours, then its match on theirs \u2014 or the other way round';
      let me = Dx('input');
      ((me.type = 'checkbox'),
        (me.checked = Dz),
        me.addEventListener('change', () => {
          ((Dz = me.checked), Dj(De, Dz), (DU = null), Dz ? DY() : DT(), DM());
        }),
        mH.append(me, ' Side by side with ours'));
      let mR = Dx('label', 'lib-check lib-retarget__hold');
      mR.title =
        'Linking a left joint links its right twin too \u2014 the bone of theirs mirrored across their hips';
      let mQ = Dx('input');
      ((mQ.type = 'checkbox'),
        (mQ.checked = DO),
        mQ.addEventListener('change', () => {
          ((DO = mQ.checked), Dj(DR, DO));
        }),
        mR.append(mQ, ' Mirror as I link'),
        D3.append(mH, mR));
    }
    (D3.appendChild(
      Dx('p', 'lib-retarget__note', 'View only \u2014 doesn\u2019t change anything.'),
    ),
      (Dh = Dx(
        'p',
        'lib-comp__hint',
        Dz && Dw
          ? 'Click a joint of ours (left), then its match on theirs (right) \u2014 or the other way round. Green: linked \u00B7 red: needed \u00B7 yellow: picked. Hover a dot for its name.'
          : 'Press \u25CE on a row, then click the joint on the character \u2014 or pick from the list. Hover a dot for its name.',
      )),
      D3.appendChild(Dh),
      DE &&
        DN(
          'Click the character\u2019s ' +
            ys(DE).toLowerCase() +
            (/_l$/.test(DE) ? ' (left)' : /_r$/.test(DE) ? ' (right)' : '') +
            '\u2026 (Esc to stop)',
        ));
    let mm = (mj) => String(DW(mj)).split(/[:|]/).pop(),
      mS = (Dm?.bones ?? []).map(mm),
      mE = (Dm?.bones ?? []).map((mj, mz) => [
        mj,
        mS.indexOf(mS[mz]) === mS.lastIndexOf(mS[mz]) ? mS[mz] : DW(mj),
      ]);
    for (let [mj, mz, mO] of yu) {
      let mJ = Dx('details', 'lib-retarget__group');
      mJ.open = mO || mz.some((mT) => m2.has(mT) || mT === DF || mT === DE);
      let mZ = mz.filter((mT) => DS[mT]).length,
        mU = mz.filter((mT) => m2.has(mT) || (fa(mT, DS) && !DS[mT])).length,
        mK = Dx('summary', null, mj + ' \u00B7 ' + mZ + '/' + mz.length + ' ');
      (mK.appendChild(
        Dx(
          'span',
          mU ? 'lib-retarget__mark is-bad' : 'lib-retarget__mark is-ok',
          mU ? '\u26A0 ' + mU + ' to fix' : '\u2713',
        ),
      ),
        mJ.appendChild(mK));
      for (let mT of mz) {
        let mA = Dx('div', 'lib-retarget__row');
        mA.dataset.our = mT;
        let mn = fa(mT, DS) && !DS[mT];
        (mA.classList.toggle('is-missing', mn),
          mA.classList.toggle('is-bad', m2.has(mT)),
          mA.classList.toggle('is-focus', mT === DF),
          mA.classList.toggle('is-armed', mT === DE),
          mA.appendChild(Dx('span', 'lib-retarget__ours', ys(mT) + (kj.includes(mT) ? ' *' : ''))));
        let mo = Dx('select', 'lib-retarget__theirs');
        mo.appendChild(new Option('\u2014', ''));
        for (let [my, mW] of mE) mo.appendChild(new Option(mW, my, !1, DS[mT] === my));
        ((mo.value = DS[mT] ?? ''),
          mo.addEventListener('change', () => {
            ((DF = mT), Dg(mT, mo.value || null));
          }),
          mo.addEventListener('focus', () => {
            ((DF = mT), Dv());
          }),
          mA.appendChild(mo));
        let mX = Dm?.how?.[mT],
          mL = DS[mT]
            ? Dm?.suggested?.[mT] === DS[mT]
              ? mX === 'name'
                ? 'suggested, by name'
                : mX === 'structure'
                  ? 'suggested, by shape'
                  : 'suggested, ' + (Dm?.known?.label ?? 'by name')
              : 'set by you'
            : '';
        ((mo.title = DS[mT] ? DW(DS[mT]) + ' \u2014 ' + mL : 'Not mapped'),
          mo.classList.toggle('is-manual', mL === 'set by you'));
        let mb = m2.has(mT)
            ? ['\u26A0', 'is-bad', m2.get(mT).join(' \u00B7 ')]
            : mn
              ? ['!', 'is-need', 'Needed before clips can play']
              : DS[mT]
                ? ['\u2713', 'is-ok', 'Checks out']
                : ['', '', 'Optional \u2014 follows its parent'],
          mx = Dx('span', 'lib-retarget__mark ' + mb[1], mb[0]);
        ((mx.title = mb[2]),
          mA.appendChild(mx),
          mA.appendChild(
            Dy(
              '\u25CE',
              'Pick it on the character',
              () => {
                ((DE = DE === mT ? null : mT), (DF = mT), DM(), Dv());
              },
              'lib-btn lib-btn--icon',
            ),
          ),
          mJ.appendChild(mA),
          m2.has(mT) &&
            mJ.appendChild(Dx('p', 'lib-retarget__issue', m2.get(mT).join(' \u00B7 '))));
      }
      D3.appendChild(mJ);
    }
    (DC ? D3.classList.add('is-busy') : D3.classList.remove('is-busy'), Dv());
  }
  let m0 = (m1) => {
    DV &&
      (DE || DU) &&
      m1.key === 'Escape' &&
      ((DE = null), (DU = null), DM(), m1.stopPropagation());
  };
  return (
    window.addEventListener('keydown', m0, !0),
    {
      get isOpen() {
        return DV;
      },
      ourParentFill(m1) {
        for (let [m2, m3] of m1) D5.set(m2, m3);
      },
      open(m1, m2) {
        ((DV = !0),
          (DD = m1),
          (Dm = m2),
          (DS = { ...m2.map }),
          (DE = null),
          (DF = null),
          DM(),
          DY());
      },
      update(m1) {
        ((Dm = m1), (DS = { ...m1.map }), DH(), DM(), DY());
      },
      close() {
        ((DV = !1),
          (DE = null),
          (DU = null),
          (Dt = !1),
          D4.setJointPicker?.(null),
          DT(),
          D4.getState().restPreview && D4.setRestPreview(null));
      },
    }
  );
}
var _u = /^(thumb|index|middle|ring|pinky)_/,
  ti = ['torso', 'arm_l', 'arm_r', 'hand_l', 'hand_r', 'leg_l', 'leg_r'];
function ei(D3) {
  let D4 = /_([lr])$/.exec(D3)?.[1];
  return /^(upperarm|lowerarm)_/.test(D3)
    ? 'arm_' + D4
    : /^hand_/.test(D3) || _u.test(D3)
      ? 'hand_' + D4
      : /^(thigh|calf|foot|ball)_/.test(D3)
        ? 'leg_' + D4
        : 'torso';
}
function pa(D3, D4) {
  let D5 = ei(D3),
    D6 = ei(D4);
  if (D5 === D6) return 'join';
  let D7 = (D9, Dk) =>
      D5.startsWith(D9) && D6.startsWith(Dk)
        ? [D3, D4, D5, D6]
        : D6.startsWith(D9) && D5.startsWith(Dk)
          ? [D4, D3, D6, D5]
          : null,
    D8;
  if ((D8 = D7('torso', 'arm'))) {
    let [D9, Dk, , Dw] = D8;
    return /^upperarm_/.test(Dk) &&
      (D9 === 'spine_03' || D9 === 'neck_01' || D9 === 'clavicle_' + Dw.slice(-1))
      ? 'join'
      : 'cut';
  }
  if ((D8 = D7('torso', 'leg'))) {
    let [DV, DD] = D8;
    return /^thigh_/.test(DD)
      ? DV === 'pelvis'
        ? 'join'
        : DV === 'spine_01' || DV === 'spine_02'
          ? 'evidence'
          : 'cut'
      : 'cut';
  }
  return (D8 = D7('arm', 'hand'))
    ? D8[2].slice(-1) === D8[3].slice(-1) && /^lowerarm_/.test(D8[0])
      ? 'join'
      : 'cut'
    : D7('leg', 'leg')
      ? 'evidence'
      : 'cut';
}
function Np(D3, D4, D5, D6, D7, D8, D9, Dk, Dw, DV, DD, Dm) {
  let DS = D9 - D6,
    DE = Dk - D7,
    DF = Dw - D8,
    DC = DV - D6,
    Dt = DD - D7,
    DH = Dm - D8,
    De = D3 - D6,
    DR = D4 - D7,
    DQ = D5 - D8,
    Dj = DS * De + DE * DR + DF * DQ,
    Dz = DC * De + Dt * DR + DH * DQ,
    DO = (Dv, DB, DG) => (D3 - Dv) * (D3 - Dv) + (D4 - DB) * (D4 - DB) + (D5 - DG) * (D5 - DG);
  if (Dj <= 0 && Dz <= 0) return DO(D6, D7, D8);
  let DJ = D3 - D9,
    DZ = D4 - Dk,
    DU = D5 - Dw,
    DK = DS * DJ + DE * DZ + DF * DU,
    DT = DC * DJ + Dt * DZ + DH * DU;
  if (DK >= 0 && DT <= DK) return DO(D9, Dk, Dw);
  let DA = Dj * DT - DK * Dz;
  if (DA <= 0 && Dj >= 0 && DK <= 0) {
    let Dv = Dj / (Dj - DK);
    return DO(D6 + Dv * DS, D7 + Dv * DE, D8 + Dv * DF);
  }
  let Dn = D3 - DV,
    DX = D4 - DD,
    DL = D5 - Dm,
    Db = DS * Dn + DE * DX + DF * DL,
    Dx = DC * Dn + Dt * DX + DH * DL;
  if (Dx >= 0 && Db <= Dx) return DO(DV, DD, Dm);
  let Dy = Db * Dz - Dj * Dx;
  if (Dy <= 0 && Dz >= 0 && Dx <= 0) {
    let DB = Dz / (Dz - Dx);
    return DO(D6 + DB * DC, D7 + DB * Dt, D8 + DB * DH);
  }
  let DW = DK * Dx - Db * DT;
  if (DW <= 0 && DT - DK >= 0 && Db - Dx >= 0) {
    let DG = (DT - DK) / (DT - DK + (Db - Dx));
    return DO(D9 + DG * (DV - D9), Dk + DG * (DD - Dk), Dw + DG * (Dm - Dw));
  }
  let Dq = 1 / (DW + Dy + DA),
    DP = Dy * Dq,
    DY = DA * Dq;
  return DO(D6 + DS * DP + DC * DY, D7 + DE * DP + Dt * DY, D8 + DF * DP + DH * DY);
}
function ha(D3, D4, { leaf: D5 = 8, beta: D6 = 2 } = {}) {
  let D7 = D4.length / 3,
    D8 = new Float64Array(9 * D7),
    D9 = new Float64Array(3 * D7),
    Dk = new Float64Array(3 * D7),
    Dw = new Float64Array(D7);
  for (let Dz = 0; Dz < D7; Dz++) {
    for (let Dn = 0; Dn < 3; Dn++)
      for (let DX = 0; DX < 3; DX++) D8[9 * Dz + 3 * Dn + DX] = D3[3 * D4[3 * Dz + Dn] + DX];
    let DO = 9 * Dz,
      DJ = D8[DO + 3] - D8[DO],
      DZ = D8[DO + 4] - D8[DO + 1],
      DU = D8[DO + 5] - D8[DO + 2],
      DK = D8[DO + 6] - D8[DO],
      DT = D8[DO + 7] - D8[DO + 1],
      DA = D8[DO + 8] - D8[DO + 2];
    ((Dk[3 * Dz] = 0.5 * (DZ * DA - DU * DT)),
      (Dk[3 * Dz + 1] = 0.5 * (DU * DK - DJ * DA)),
      (Dk[3 * Dz + 2] = 0.5 * (DJ * DT - DZ * DK)),
      (Dw[Dz] = Math.hypot(Dk[3 * Dz], Dk[3 * Dz + 1], Dk[3 * Dz + 2])));
    for (let DL = 0; DL < 3; DL++)
      D9[3 * Dz + DL] = (D8[DO + DL] + D8[DO + 3 + DL] + D8[DO + 6 + DL]) / 3;
  }
  let DV = Int32Array.from({ length: D7 }, (Db, Dx) => Dx),
    DD = Math.max(16, Math.ceil((4 * D7) / D5) + 16),
    Dm = new Int32Array(DD),
    DS = new Int32Array(DD),
    DE = new Int32Array(DD).fill(-1),
    DF = new Int32Array(DD).fill(-1),
    DC = new Float64Array(3 * DD),
    Dt = new Float64Array(3 * DD),
    DH = new Float64Array(DD),
    De = 0,
    DR = (Db, Dx) => {
      let Dy = De++;
      ((Dm[Dy] = Db), (DS[Dy] = Dx - Db));
      let DW = 0,
        Dq = 0,
        DP = 0,
        DY = 0,
        Dv = 0,
        DB = 0,
        DG = 0,
        Dg = [1 / 0, 1 / 0, 1 / 0],
        DI = [-1 / 0, -1 / 0, -1 / 0];
      for (let m2 = Db; m2 < Dx; m2++) {
        let m3 = DV[m2],
          m4 = Dw[m3];
        ((DW += m4),
          (Dq += m4 * D9[3 * m3]),
          (DP += m4 * D9[3 * m3 + 1]),
          (DY += m4 * D9[3 * m3 + 2]),
          (Dv += Dk[3 * m3]),
          (DB += Dk[3 * m3 + 1]),
          (DG += Dk[3 * m3 + 2]));
        for (let m5 = 0; m5 < 3; m5++)
          ((Dg[m5] = Math.min(Dg[m5], D9[3 * m3 + m5])),
            (DI[m5] = Math.max(DI[m5], D9[3 * m3 + m5])));
      }
      DW > 0
        ? ((Dq /= DW), (DP /= DW), (DY /= DW))
        : ((Dq = (Dg[0] + DI[0]) / 2), (DP = (Dg[1] + DI[1]) / 2), (DY = (Dg[2] + DI[2]) / 2));
      let Dh = 0;
      for (let m6 = Db; m6 < Dx; m6++) {
        let m7 = 9 * DV[m6];
        for (let m8 = 0; m8 < 3; m8++)
          Dh = Math.max(
            Dh,
            (D8[m7 + 3 * m8] - Dq) ** 2 +
              (D8[m7 + 3 * m8 + 1] - DP) ** 2 +
              (D8[m7 + 3 * m8 + 2] - DY) ** 2,
          );
      }
      if (
        ((DC[3 * Dy] = Dq),
        (DC[3 * Dy + 1] = DP),
        (DC[3 * Dy + 2] = DY),
        (Dt[3 * Dy] = Dv),
        (Dt[3 * Dy + 1] = DB),
        (Dt[3 * Dy + 2] = DG),
        (DH[Dy] = Dh * D6 * D6),
        Dx - Db <= D5)
      )
        return Dy;
      let DN = 0;
      for (let m9 = 1; m9 < 3; m9++) DI[m9] - Dg[m9] > DI[DN] - Dg[DN] && (DN = m9);
      DV.subarray(Db, Dx).sort((mk, mw) => D9[3 * mk + DN] - D9[3 * mw + DN]);
      let DM = (Db + Dx) >> 1,
        m0 = DR(Db, DM),
        m1 = DR(DM, Dx);
      return ((DE[Dy] = m0), (DF[Dy] = m1), Dy);
    };
  D7 && DR(0, D7);
  let DQ = new Float64Array(9 * D7);
  for (let Db = 0; Db < D7; Db++) DQ.set(D8.subarray(9 * DV[Db], 9 * DV[Db] + 9), 9 * Db);
  let Dj = new Int32Array(256);
  return {
    at: (Dx, Dy, DW) => {
      if (!D7) return 0;
      let Dq = 0,
        DP = 0;
      for (Dj[Dq++] = 0; Dq;) {
        let DY = Dj[--Dq],
          Dv = DC[3 * DY] - Dx,
          DB = DC[3 * DY + 1] - Dy,
          DG = DC[3 * DY + 2] - DW,
          Dg = Dv * Dv + DB * DB + DG * DG;
        if (Dg > DH[DY]) {
          DP +=
            (Dv * Dt[3 * DY] + DB * Dt[3 * DY + 1] + DG * Dt[3 * DY + 2]) / (Dg * Math.sqrt(Dg));
          continue;
        }
        if (DE[DY] < 0) {
          for (let DI = Dm[DY], Dh = Dm[DY] + DS[DY]; DI < Dh; DI++) {
            let DN = 9 * DI,
              DM = DQ[DN] - Dx,
              m0 = DQ[DN + 1] - Dy,
              m1 = DQ[DN + 2] - DW,
              m2 = DQ[DN + 3] - Dx,
              m3 = DQ[DN + 4] - Dy,
              m4 = DQ[DN + 5] - DW,
              m5 = DQ[DN + 6] - Dx,
              m6 = DQ[DN + 7] - Dy,
              m7 = DQ[DN + 8] - DW,
              m8 = Math.hypot(DM, m0, m1),
              m9 = Math.hypot(m2, m3, m4),
              mk = Math.hypot(m5, m6, m7),
              mw = DM * (m3 * m7 - m4 * m6) + m0 * (m4 * m5 - m2 * m7) + m1 * (m2 * m6 - m3 * m5),
              mV =
                m8 * m9 * mk +
                (DM * m2 + m0 * m3 + m1 * m4) * mk +
                (m2 * m5 + m3 * m6 + m4 * m7) * m8 +
                (m5 * DM + m6 * m0 + m7 * m1) * m9;
            DP += 2 * Math.atan2(mw, mV);
          }
          continue;
        }
        ((Dj[Dq++] = DE[DY]), (Dj[Dq++] = DF[DY]));
      }
      return DP / (4 * Math.PI);
    },
    nodes: De,
  };
}
function xu(
  { positions: D3, index: D4, bones: D5, height: D6 },
  { exclude: D7 = null, h: D8 = D6 / 220, band: D9 = 1.25 * D8 } = {},
) {
  let Dk = Date.now(),
    Dw = D3.length / 3,
    DV = new Int32Array(Dw),
    DD = new Map(),
    Dm = 0;
  for (let mB = 0; mB < Dw; mB++) {
    let mG =
        Math.round(D3[3 * mB] * 100000) +
        ',' +
        Math.round(D3[3 * mB + 1] * 100000) +
        ',' +
        Math.round(D3[3 * mB + 2] * 100000),
      mg = DD.get(mG);
    (mg === void 0 && ((mg = Dm++), DD.set(mG, mg)), (DV[mB] = mg));
  }
  let DS = new Float64Array(3 * Dm);
  for (let mI = 0; mI < Dw; mI++)
    for (let mN = 0; mN < 3; mN++) DS[3 * DV[mI] + mN] = D3[3 * mI + mN];
  let DE = [];
  for (let mM = 0; mM < D4.length; mM += 3) {
    if (D7 && (D7[D4[mM]] || D7[D4[mM + 1]] || D7[D4[mM + 2]])) continue;
    let S0 = DV[D4[mM]],
      S1 = DV[D4[mM + 1]],
      S2 = DV[D4[mM + 2]];
    S0 !== S1 && S1 !== S2 && S0 !== S2 && DE.push(S0, S1, S2);
  }
  let DF = Uint32Array.from(DE),
    DC = DF.length / 3,
    DH = Int32Array.from({ length: Dm }, (S3, S4) => S4),
    De = (S3) => {
      for (; DH[S3] !== S3;) S3 = DH[S3] = DH[DH[S3]];
      return S3;
    };
  for (let S3 = 0; S3 < DF.length; S3 += 3)
    ((DH[De(DF[S3])] = De(DF[S3 + 1])), (DH[De(DF[S3 + 1])] = De(DF[S3 + 2])));
  let DR = new Map(),
    DQ = [0, 0, 0];
  for (let S4 = 0; S4 < Dm; S4++)
    for (let S5 = 0; S5 < 3; S5++) DQ[S5] += DS[3 * S4 + S5] / Math.max(1, Dm);
  for (let S6 = 0; S6 < DF.length; S6 += 3) {
    let S7 = 3 * DF[S6],
      S8 = 3 * DF[S6 + 1],
      S9 = 3 * DF[S6 + 2],
      Sk = DS[S7] - DQ[0],
      Sw = DS[S7 + 1] - DQ[1],
      SV = DS[S7 + 2] - DQ[2],
      SD = DS[S8] - DQ[0],
      Sm = DS[S8 + 1] - DQ[1],
      SS = DS[S8 + 2] - DQ[2],
      SE = DS[S9] - DQ[0],
      SF = DS[S9 + 1] - DQ[1],
      SC = DS[S9 + 2] - DQ[2],
      SH = De(DF[S6]);
    DR.set(
      SH,
      (DR.get(SH) ?? 0) +
        Sk * (Sm * SC - SS * SF) +
        Sw * (SS * SE - SD * SC) +
        SV * (SD * SF - Sm * SE),
    );
  }
  let Dj = 0;
  for (let SR of DR.values()) SR < 0 && Dj++;
  for (let SQ = 0; SQ < DF.length; SQ += 3)
    if (DR.get(De(DF[SQ])) < 0) {
      let Sj = DF[SQ + 1];
      ((DF[SQ + 1] = DF[SQ + 2]), (DF[SQ + 2] = Sj));
    }
  let Dz = DR.size,
    DO = [1 / 0, 1 / 0, 1 / 0],
    DJ = [-1 / 0, -1 / 0, -1 / 0];
  for (let Sz = 0; Sz < DF.length; Sz++)
    for (let SO = 0; SO < 3; SO++) {
      let SJ = DS[3 * DF[Sz] + SO];
      ((DO[SO] = Math.min(DO[SO], SJ)), (DJ[SO] = Math.max(DJ[SO], SJ)));
    }
  let DZ = D9 + 2 * D8,
    DU = [0, 1, 2].map((SZ) => Math.ceil((DJ[SZ] - DO[SZ] + 2 * DZ) / D8) + 1);
  for (; DU[0] * DU[1] * DU[2] > 40000000;)
    ((D8 *= 1.2),
      (D9 *= 1.2),
      (DU = [0, 1, 2].map((SZ) => Math.ceil((DJ[SZ] - DO[SZ] + 2 * (D9 + 2 * D8)) / D8) + 1)));
  let [DK, DT, DA] = DU,
    Dn = DK * DT,
    DX = Dn * DA,
    DL = [DO[0] - (D9 + 2 * D8), DO[1] - (D9 + 2 * D8), DO[2] - (D9 + 2 * D8)],
    Db = (SZ) => DL[0] + SZ * D8,
    Dx = (SZ) => DL[1] + SZ * D8,
    Dy = (SZ) => DL[2] + SZ * D8,
    DW = 4,
    Dq = Math.ceil(DK / DW),
    DP = Math.ceil(DT / DW),
    DY = Math.ceil(DA / DW),
    Dv = new Uint8Array(DX),
    DB = new Uint8Array(Dq * DP * DY),
    DG = D9 * D9;
  for (let SZ = 0; SZ < DF.length; SZ += 3) {
    let SU = 3 * DF[SZ],
      SK = 3 * DF[SZ + 1],
      ST = 3 * DF[SZ + 2],
      SA = Math.max(0, Math.ceil((Math.min(DS[SU], DS[SK], DS[ST]) - D9 - DL[0]) / D8)),
      Sn = Math.min(DK - 1, Math.floor((Math.max(DS[SU], DS[SK], DS[ST]) + D9 - DL[0]) / D8)),
      SX = Math.max(0, Math.ceil((Math.min(DS[SU + 1], DS[SK + 1], DS[ST + 1]) - D9 - DL[1]) / D8)),
      SL = Math.min(
        DT - 1,
        Math.floor((Math.max(DS[SU + 1], DS[SK + 1], DS[ST + 1]) + D9 - DL[1]) / D8),
      ),
      Sb = Math.max(0, Math.ceil((Math.min(DS[SU + 2], DS[SK + 2], DS[ST + 2]) - D9 - DL[2]) / D8)),
      Sx = Math.min(
        DA - 1,
        Math.floor((Math.max(DS[SU + 2], DS[SK + 2], DS[ST + 2]) + D9 - DL[2]) / D8),
      );
    for (let Sy = Sb; Sy <= Sx; Sy++)
      for (let SW = SX; SW <= SL; SW++)
        for (let Sq = SA; Sq <= Sn; Sq++) {
          let SP = Sq + DK * SW + Dn * Sy;
          Dv[SP] ||
            (Np(
              Db(Sq),
              Dx(SW),
              Dy(Sy),
              DS[SU],
              DS[SU + 1],
              DS[SU + 2],
              DS[SK],
              DS[SK + 1],
              DS[SK + 2],
              DS[ST],
              DS[ST + 1],
              DS[ST + 2],
            ) < DG &&
              (Dv[SP] = 1));
        }
    for (let SY = Math.floor(Sb / DW); SY <= Math.floor(Sx / DW); SY++)
      for (let Sv = Math.floor(SX / DW); Sv <= Math.floor(SL / DW); Sv++)
        for (let SB = Math.floor(SA / DW); SB <= Math.floor(Sn / DW); SB++)
          DB[SB + Dq * (Sv + DP * SY)] = 1;
  }
  let Dg = Date.now(),
    DI = ha(DS, DF),
    Dh = 0;
  for (let SG = 0; SG < DY; SG++)
    for (let Sg = 0; Sg < DP; Sg++)
      for (let SI = 0; SI < Dq; SI++) {
        let SN = SI * DW,
          SM = Sg * DW,
          r0 = SG * DW,
          r1 = Math.min(DK, SN + DW),
          r2 = Math.min(DT, SM + DW),
          r3 = Math.min(DA, r0 + DW);
        if (!DB[SI + Dq * (Sg + DP * SG)]) {
          if (
            (Dh++,
            Math.abs(DI.at(Db((SN + r1 - 1) / 2), Dx((SM + r2 - 1) / 2), Dy((r0 + r3 - 1) / 2))) <
              0.5)
          )
            continue;
          for (let r4 = r0; r4 < r3; r4++)
            for (let r5 = SM; r5 < r2; r5++)
              Dv.fill(2, SN + DK * r5 + Dn * r4, r1 + DK * r5 + Dn * r4);
          continue;
        }
        for (let r6 = r0; r6 < r3; r6++)
          for (let r7 = SM; r7 < r2; r7++)
            for (let r8 = SN; r8 < r1; r8++) {
              let r9 = r8 + DK * r7 + Dn * r6;
              Dv[r9] || (Dh++, Math.abs(DI.at(Db(r8), Dx(r7), Dy(r6))) >= 0.5 && (Dv[r9] = 2));
            }
      }
  let DN = Date.now(),
    DM = (rk, rw, rV) => {
      let rD = Math.round((rk - DL[0]) / D8),
        rm = Math.round((rw - DL[1]) / D8),
        rS = Math.round((rV - DL[2]) / D8);
      return rD < 0 || rm < 0 || rS < 0 || rD >= DK || rm >= DT || rS >= DA
        ? -1
        : rD + DK * rm + Dn * rS;
    },
    m0 = D5.map((rk, rw) => rw),
    m1 = m0.length,
    m2 = Int32Array.from(D5, (rk) =>
      _u.test(rk.name) ? D5.findIndex((rw) => rw.name === 'hand_' + rk.name.slice(-1)) : -1,
    ).map((rk, rw) => (rk >= 0 ? rk : rw)),
    m3 = new Float64Array(m1);
  for (let rk = 0; rk < m1; rk++) {
    let rw = D5[m0[rk]],
      rV = [rw.tail[0] - rw.head[0], rw.tail[1] - rw.head[1], rw.tail[2] - rw.head[2]],
      rD = Math.hypot(...rV) || 1;
    for (let rt = 0; rt < 3; rt++) rV[rt] /= rD;
    let rm = Math.abs(rV[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0],
      rS = [
        rV[1] * rm[2] - rV[2] * rm[1],
        rV[2] * rm[0] - rV[0] * rm[2],
        rV[0] * rm[1] - rV[1] * rm[0],
      ],
      rE = Math.hypot(...rS);
    for (let rH = 0; rH < 3; rH++) rS[rH] /= rE;
    let rF = [
        rV[1] * rS[2] - rV[2] * rS[1],
        rV[2] * rS[0] - rV[0] * rS[2],
        rV[0] * rS[1] - rV[1] * rS[0],
      ],
      rC = [];
    for (let re of [0.25, 0.5, 0.75]) {
      let rR = [
        rw.head[0] + re * rD * rV[0],
        rw.head[1] + re * rD * rV[1],
        rw.head[2] + re * rD * rV[2],
      ];
      for (let rQ = 0; rQ < 16; rQ++) {
        let rj = (rQ * Math.PI) / 8,
          rz = [0, 1, 2].map((rZ) => Math.cos(rj) * rS[rZ] + Math.sin(rj) * rF[rZ]),
          rO = !1,
          rJ = -1;
        for (let rZ = 0; rZ * D8 * 0.5 < 0.4 * D6; rZ++) {
          let rU = rZ * D8 * 0.5,
            rK = DM(rR[0] + rU * rz[0], rR[1] + rU * rz[1], rR[2] + rU * rz[2]);
          if (rK >= 0 && Dv[rK] > 0) rO = !0;
          else {
            if (rO) {
              rJ = rU;
              break;
            } else {
              if (rU > 0.1 * D6) break;
            }
          }
        }
        rJ > 0 && rC.push(rJ);
      }
    }
    (rC.sort((rT, rA) => rT - rA),
      (m3[rk] = Math.max(2 * D8, 0.012 * D6, rC.length ? rC[rC.length >> 1] : 0)));
  }
  let m4 = new Float64Array(3 * m1),
    m5 = new Float64Array(3 * m1),
    m6 = new Float64Array(m1);
  for (let rT = 0; rT < m1; rT++) {
    let rA = D5[m0[rT]];
    for (let rn = 0; rn < 3; rn++)
      ((m4[3 * rT + rn] = rA.head[rn]), (m5[3 * rT + rn] = rA.tail[rn] - rA.head[rn]));
    m6[rT] = m5[3 * rT] ** 2 + m5[3 * rT + 1] ** 2 + m5[3 * rT + 2] ** 2 || 1e-12;
  }
  let m7 = new Int8Array(DX).fill(-1),
    m8 = 0;
  for (let ro = 0; ro < DA; ro++)
    for (let rX = 0; rX < DT; rX++)
      for (let rL = 0; rL < DK; rL++) {
        let rb = rL + DK * rX + Dn * ro;
        if (!Dv[rb]) continue;
        m8++;
        let rx = Db(rL),
          ry = Dx(rX),
          rW = Dy(ro),
          rq = 1 / 0,
          rP = 0;
        for (let rY = 0; rY < m1; rY++) {
          let rv = rx - m4[3 * rY],
            rB = ry - m4[3 * rY + 1],
            rG = rW - m4[3 * rY + 2],
            rg = (rv * m5[3 * rY] + rB * m5[3 * rY + 1] + rG * m5[3 * rY + 2]) / m6[rY];
          rg = rg < 0 ? 0 : rg > 1 ? 1 : rg;
          let rI = rv - rg * m5[3 * rY],
            rN = rB - rg * m5[3 * rY + 1],
            rM = rG - rg * m5[3 * rY + 2],
            E0 = (rI * rI + rN * rN + rM * rM) / (m3[rY] * m3[rY]);
          E0 < rq && ((rq = E0), (rP = rY));
        }
        m7[rb] = m2[rP];
      }
  let m9 = Date.now(),
    mk = new Uint8Array(m1 * m1);
  for (let E1 = 0; E1 < m1; E1++)
    for (let E2 = 0; E2 < m1; E2++)
      mk[E1 * m1 + E2] = { join: 0, cut: 1, evidence: 2 }[pa(D5[m0[E1]].name, D5[m0[E2]].name)];
  let mw = [
      [1, 0, 0],
      [-1, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
      [-1, -1, 1],
      [0, -1, 1],
      [1, -1, 1],
      [-1, 0, 1],
      [0, 0, 1],
      [1, 0, 1],
      [-1, 1, 1],
      [0, 1, 1],
      [1, 1, 1],
    ],
    mV = new Uint8Array(DX),
    mD = [];
  for (let E3 = 0; E3 < DA; E3++)
    for (let E4 = 0; E4 < DT; E4++)
      for (let E5 = 0; E5 < DK; E5++) {
        let E6 = E5 + DK * E4 + Dn * E3;
        if (!Dv[E6]) continue;
        let E7 = m7[E6];
        for (let [E8, E9, Ek] of mw) {
          let Ew = E5 + E8,
            EV = E4 + E9,
            ED = E3 + Ek;
          if (Ew < 0 || Ew >= DK || EV >= DT || EV < 0 || ED >= DA) continue;
          let Em = Ew + DK * EV + Dn * ED;
          if (!Dv[Em] || m7[Em] === E7) continue;
          let ES = mk[E7 * m1 + m7[Em]];
          ES === 1 ? ((mV[E6] = 1), (mV[Em] = 1)) : ES === 2 && mD.push(E6, Em);
        }
      }
  let mm = 0;
  if (mD.length) {
    let EE = new Uint8Array(DX),
      EF = new Uint8Array(DX),
      EC = (EH, ER, EQ) => {
        let Ej = EH % DK,
          Ez = Math.floor(EH / DK) % DT,
          EO = Math.floor(EH / Dn);
        for (let EJ = -ER; EJ <= ER; EJ++)
          for (let EZ = -ER; EZ <= ER; EZ++)
            for (let EU = -ER; EU <= ER; EU++) {
              let EK = Ej + EU,
                ET = Ez + EZ,
                EA = EO + EJ;
              EK >= 0 &&
                ET >= 0 &&
                EA >= 0 &&
                EK < DK &&
                ET < DT &&
                EA < DA &&
                (EQ[EK + DK * ET + Dn * EA] = 1);
            }
      };
    for (let EH of mD) EE[EH] || EC(EH, 2, EE);
    let Et = (0.003 * D6) / 1.8;
    for (let ER = 0; ER < DF.length; ER += 3) {
      let EQ = 3 * DF[ER],
        Ej = 3 * DF[ER + 1],
        Ez = 3 * DF[ER + 2],
        EO = (DS[EQ] + DS[Ej] + DS[Ez]) / 3,
        EJ = (DS[EQ + 1] + DS[Ej + 1] + DS[Ez + 1]) / 3,
        EZ = (DS[EQ + 2] + DS[Ej + 2] + DS[Ez + 2]) / 3,
        EU = DM(EO, EJ, EZ);
      if (EU < 0 || !EE[EU]) continue;
      let EK = DS[Ej] - DS[EQ],
        ET = DS[Ej + 1] - DS[EQ + 1],
        EA = DS[Ej + 2] - DS[EQ + 2],
        En = DS[Ez] - DS[EQ],
        Eo = DS[Ez + 1] - DS[EQ + 1],
        EX = DS[Ez + 2] - DS[EQ + 2],
        EL = ET * EX - EA * Eo,
        Eb = EA * En - EK * EX,
        Ex = EK * Eo - ET * En,
        Ey = Math.hypot(EL, Eb, Ex);
      Ey < 1e-14 ||
        ((EL /= Ey),
        (Eb /= Ey),
        (Ex /= Ey),
        Math.abs(DI.at(EO + Et * EL, EJ + Et * Eb, EZ + Et * Ex)) >= 0.75 && (mm++, EC(EU, 2, EF)));
    }
    for (let EW = 0; EW < mD.length; EW += 2)
      (EF[mD[EW]] || EF[mD[EW + 1]]) && ((mV[mD[EW]] = 1), (mV[mD[EW + 1]] = 1));
  }
  let mS = 0;
  for (let Eq = 0; Eq < DX; Eq++) mV[Eq] && ((Dv[Eq] = 0), (m7[Eq] = -1), mS++);
  let mE = Date.now(),
    mF = DK - 1,
    mC = (DK - 1) * (DT - 1),
    mt = new Map(),
    mH = [],
    me = [],
    mR = (EP, EY, Ev) => {
      let EB = EP + mF * EY + mC * Ev,
        EG = mt.get(EB);
      if (EG !== void 0) return EG;
      let Eg = 0,
        EI = 0,
        EN = 0,
        EM = 0,
        F0 = (F4, F5, F6) => Dv[EP + F4 + DK * (EY + F5) + Dn * (Ev + F6)] > 0;
      for (let F4 = 0; F4 < 2; F4++)
        for (let F5 = 0; F5 < 2; F5++)
          (F0(0, F4, F5) !== F0(1, F4, F5) && ((Eg += 0.5), (EI += F4), (EN += F5), EM++),
            F0(F4, 0, F5) !== F0(F4, 1, F5) && ((Eg += F4), (EI += 0.5), (EN += F5), EM++),
            F0(F4, F5, 0) !== F0(F4, F5, 1) && ((Eg += F4), (EI += F5), (EN += 0.5), EM++));
      let F1 = new Map(),
        F2 = -1,
        F3 = 0;
      for (let F6 = 0; F6 < 2; F6++)
        for (let F7 = 0; F7 < 2; F7++)
          for (let F8 = 0; F8 < 2; F8++) {
            let F9 = m7[EP + F6 + DK * (EY + F7) + Dn * (Ev + F8)];
            if (F9 < 0) continue;
            let Fk = (F1.get(F9) ?? 0) + 1;
            (F1.set(F9, Fk), Fk > F3 && ((F3 = Fk), (F2 = F9)));
          }
      return (
        (EG = me.length),
        mH.push(Db(EP + Eg / EM), Dx(EY + EI / EM), Dy(Ev + EN / EM)),
        me.push(F2),
        mt.set(EB, EG),
        EG
      );
    },
    mQ = [],
    mj = (EP, EY, Ev, EB, EG) => {
      if (EG) {
        let EI = EY;
        ((EY = EB), (EB = EI));
      }
      let Eg = (EN, EM) =>
        (mH[3 * EN] - mH[3 * EM]) ** 2 +
        (mH[3 * EN + 1] - mH[3 * EM + 1]) ** 2 +
        (mH[3 * EN + 2] - mH[3 * EM + 2]) ** 2;
      Eg(EP, Ev) <= Eg(EY, EB) ? mQ.push(EP, EY, Ev, EP, Ev, EB) : mQ.push(EP, EY, EB, EY, Ev, EB);
    };
  for (let EP = 1; EP < DA - 1; EP++)
    for (let EY = 1; EY < DT - 1; EY++)
      for (let Ev = 1; Ev < DK - 1; Ev++) {
        let EB = Ev + DK * EY + Dn * EP,
          EG = Dv[EB] > 0;
        (EG !== Dv[EB + 1] > 0 &&
          mj(mR(Ev, EY - 1, EP - 1), mR(Ev, EY, EP - 1), mR(Ev, EY, EP), mR(Ev, EY - 1, EP), !EG),
          EG !== Dv[EB + DK] > 0 &&
            mj(mR(Ev - 1, EY, EP - 1), mR(Ev - 1, EY, EP), mR(Ev, EY, EP), mR(Ev, EY, EP - 1), !EG),
          EG !== Dv[EB + Dn] > 0 &&
            mj(
              mR(Ev - 1, EY - 1, EP),
              mR(Ev, EY - 1, EP),
              mR(Ev, EY, EP),
              mR(Ev - 1, EY, EP),
              !EG,
            ));
      }
  let mz = me.length,
    mO = Int32Array.from({ length: mz }, (Eg, EI) => EI),
    mJ = (Eg) => {
      for (; mO[Eg] !== Eg;) Eg = mO[Eg] = mO[mO[Eg]];
      return Eg;
    };
  for (let Eg = 0; Eg < mQ.length; Eg += 3)
    ((mO[mJ(mQ[Eg])] = mJ(mQ[Eg + 1])), (mO[mJ(mQ[Eg + 1])] = mJ(mQ[Eg + 2])));
  let mZ = new Map();
  for (let EI = 0; EI < mQ.length; EI += 3) {
    let EN = 3 * mQ[EI],
      EM = 3 * mQ[EI + 1],
      F0 = 3 * mQ[EI + 2],
      F1 = mH[EN] - DQ[0],
      F2 = mH[EN + 1] - DQ[1],
      F3 = mH[EN + 2] - DQ[2],
      F4 = mH[EM] - DQ[0],
      F5 = mH[EM + 1] - DQ[1],
      F6 = mH[EM + 2] - DQ[2],
      F7 = mH[F0] - DQ[0],
      F8 = mH[F0 + 1] - DQ[1],
      F9 = mH[F0 + 2] - DQ[2],
      Fk = mJ(mQ[EI]);
    mZ.set(
      Fk,
      (mZ.get(Fk) ?? 0) +
        (F1 * (F5 * F9 - F6 * F8) + F2 * (F6 * F7 - F4 * F9) + F3 * (F4 * F8 - F5 * F7)) / 6,
    );
  }
  let mU = 0;
  for (let Fw of mZ.values()) Fw < 0 && mU++;
  let mK = [];
  for (let FV = 0; FV < mQ.length; FV += 3)
    mZ.get(mJ(mQ[FV])) > 0 && mK.push(mQ[FV], mQ[FV + 1], mQ[FV + 2]);
  let mT = new Int32Array(mz).fill(-1),
    mA = 0;
  for (let FD of mK) mT[FD] < 0 && (mT[FD] = mA++);
  let mn = new Float64Array(3 * mA),
    mo = new Int16Array(mA);
  for (let Fm = 0; Fm < mz; Fm++)
    if (mT[Fm] >= 0) {
      for (let FS = 0; FS < 3; FS++) mn[3 * mT[Fm] + FS] = mH[3 * Fm + FS];
      mo[mT[Fm]] = me[Fm] >= 0 ? m0[me[Fm]] : -1;
    }
  let mX = Uint32Array.from(mK, (FE) => mT[FE]),
    mL = Array.from({ length: mA }, () => new Set());
  for (let FE = 0; FE < mX.length; FE += 3)
    for (let FF = 0; FF < 3; FF++)
      (mL[mX[FE + FF]].add(mX[FE + ((FF + 1) % 3)]), mL[mX[FE + ((FF + 1) % 3)]].add(mX[FE + FF]));
  let mb = mL.map((FC) => Int32Array.from(FC)),
    mx = new Float64Array(3 * mA);
  for (let FC = 0; FC < 10; FC++)
    for (let Ft of [0.5, -0.53]) {
      for (let FH = 0; FH < mA; FH++) {
        let Fe = mb[FH];
        if (!Fe.length) {
          for (let Fz = 0; Fz < 3; Fz++) mx[3 * FH + Fz] = mn[3 * FH + Fz];
          continue;
        }
        let FR = 0,
          FQ = 0,
          Fj = 0;
        for (let FO of Fe) ((FR += mn[3 * FO]), (FQ += mn[3 * FO + 1]), (Fj += mn[3 * FO + 2]));
        ((mx[3 * FH] = mn[3 * FH] + Ft * (FR / Fe.length - mn[3 * FH])),
          (mx[3 * FH + 1] = mn[3 * FH + 1] + Ft * (FQ / Fe.length - mn[3 * FH + 1])),
          (mx[3 * FH + 2] = mn[3 * FH + 2] + Ft * (Fj / Fe.length - mn[3 * FH + 2])));
      }
      mn.set(mx);
    }
  for (let FJ = 0; FJ < 3; FJ++)
    for (let FZ = 0; FZ < mA; FZ++)
      if (mo[FZ] < 0) {
        for (let FU of mb[FZ])
          if (mo[FU] >= 0) {
            mo[FZ] = mo[FU];
            break;
          }
      }
  let my = D5.map((FK) => ti.indexOf(ei(FK.name))),
    mW = Int32Array.from(mo, (FK) => (FK >= 0 ? my[FK] : -1)),
    mq = Date.now(),
    mP = new Float64Array(3 * Dm);
  for (let FK = 0; FK < DF.length; FK += 3) {
    let FT = 3 * DF[FK],
      FA = 3 * DF[FK + 1],
      Fn = 3 * DF[FK + 2],
      FX = DS[FA] - DS[FT],
      FL = DS[FA + 1] - DS[FT + 1],
      Fb = DS[FA + 2] - DS[FT + 2],
      Fx = DS[Fn] - DS[FT],
      Fy = DS[Fn + 1] - DS[FT + 1],
      FW = DS[Fn + 2] - DS[FT + 2],
      Fq = FL * FW - Fb * Fy,
      FP = Fb * Fx - FX * FW,
      FY = FX * Fy - FL * Fx;
    for (let Fv of [FT, FA, Fn]) ((mP[Fv] += Fq), (mP[Fv + 1] += FP), (mP[Fv + 2] += FY));
  }
  let mY = new Int16Array(Dw).fill(-1),
    mv = new Int16Array(Dm).fill(-2);
  for (let FB = 0; FB < Dw; FB++) {
    if (D7?.[FB]) continue;
    let FG = DV[FB];
    if (mv[FG] === -2) {
      let Fg = Math.hypot(mP[3 * FG], mP[3 * FG + 1], mP[3 * FG + 2]) || 1,
        FI = -1;
      for (let Fh of [-1.5, -0.75, 0, 0.75]) {
        let FN = DM(
          DS[3 * FG] + (Fh * D8 * mP[3 * FG]) / Fg,
          DS[3 * FG + 1] + (Fh * D8 * mP[3 * FG + 1]) / Fg,
          DS[3 * FG + 2] + (Fh * D8 * mP[3 * FG + 2]) / Fg,
        );
        if (FN >= 0 && m7[FN] >= 0) {
          FI = m0[m7[FN]];
          break;
        }
      }
      mv[FG] = FI;
    }
    mY[FB] = mv[FG];
  }
  return {
    positions: Float32Array.from(mn),
    index: mX,
    bone: mo,
    region: mW,
    inputBone: mY,
    h: D8,
    stats: {
      pieces: Dz,
      turned: Dj,
      grid: DK + '\u00D7' + DT + '\u00D7' + DA,
      h: +(D8 * 1000).toFixed(1),
      inside: m8,
      queries: Dh,
      treeNodes: DI.nodes,
      carved: mS,
      buried: mm,
      hollows: mU,
      vertices: mA,
      triangles: mX.length / 3,
      input: DC,
      ms: {
        band: Dg - Dk,
        winding: DN - Dg,
        label: m9 - DN,
        carve: mE - m9,
        surface: mq - mE,
        total: Date.now() - Dk,
      },
    },
  };
}
var Ps = [
    { id: 'chin', label: 'Chin' },
    { id: 'shoulder_l', label: 'Shoulder (L)', twin: 'shoulder_r' },
    { id: 'shoulder_r', label: 'Shoulder (R)', twin: 'shoulder_l' },
    { id: 'elbow_l', label: 'Elbow (L)', twin: 'elbow_r', found: !0 },
    { id: 'elbow_r', label: 'Elbow (R)', twin: 'elbow_l', found: !0 },
    { id: 'wrist_l', label: 'Wrist (L)', twin: 'wrist_r' },
    { id: 'wrist_r', label: 'Wrist (R)', twin: 'wrist_l' },
    { id: 'tip_l', label: 'Fingertip (L)', twin: 'tip_r', found: !0 },
    { id: 'tip_r', label: 'Fingertip (R)', twin: 'tip_l', found: !0 },
    { id: 'groin', label: 'Groin' },
    { id: 'hip_l', label: 'Hip (L)', twin: 'hip_r', found: !0 },
    { id: 'hip_r', label: 'Hip (R)', twin: 'hip_l', found: !0 },
    { id: 'knee_l', label: 'Knee (L)', twin: 'knee_r', found: !0 },
    { id: 'knee_r', label: 'Knee (R)', twin: 'knee_l', found: !0 },
    { id: 'ankle_l', label: 'Ankle (L)', twin: 'ankle_r' },
    { id: 'ankle_r', label: 'Ankle (R)', twin: 'ankle_l' },
  ],
  Ki = new Set(Ps.filter((D3) => D3.found).map((D3) => D3.id)),
  ma = ['tip_l', 'tip_r'],
  Bp = {
    shoulder_l: 'upperarm_l',
    shoulder_r: 'upperarm_r',
    elbow_l: 'lowerarm_l',
    elbow_r: 'lowerarm_r',
    wrist_l: 'hand_l',
    wrist_r: 'hand_r',
    knee_l: 'calf_l',
    knee_r: 'calf_r',
    ankle_l: 'foot_l',
    ankle_r: 'foot_r',
  },
  jp = {
    pelvis: 0.33,
    spine_01: 0.42,
    spine_02: 0.42,
    spine_03: 0.51,
    neck_01: 0.68,
    Head: 0.55,
    clavicle_l: 0.88,
    clavicle_r: 0.88,
    foot_l: 0.4,
    foot_r: 0.4,
  };
function si(D3) {
  let D4 = [];
  return (
    D3.updateMatrixWorld(!0),
    D3.traverse((D5) => {
      D5.isMesh && !D5.isSkinnedMesh && D5.geometry?.attributes?.position && D4.push(D5);
    }),
    D4
  );
}
function ga(D3, D4, { turn: D5 = 0, height: D6 = null } = {}) {
  D3.updateMatrixWorld(!0);
  let D7 = new D4['Box3']().setFromObject(D3),
    D8 = D7.getSize(new D4['Vector3']()),
    D9 = new D4['Matrix4']();
  (D8.z > D8.y * 1.3 && D8.z >= D8.x * 0.8 && D9.makeRotationX(-Math.PI / 2),
    D9.premultiply(new D4['Matrix4']().makeRotationY((D5 * Math.PI) / 2)));
  let Dk = D7.clone().applyMatrix4(D9),
    Dw = Dk.max.y - Dk.min.y,
    DV =
      [1, 0.01, 0.001, 2.54 / 100, 100].find((DE) => Dw * DE > 0.5 && Dw * DE < 3) ??
      1.8 / Math.max(Dw, 0.000001);
  (Dw * DV < 1.2 && (DV = 1.8 / Math.max(Dw, 0.000001)),
    D6 > 0 && (DV = D6 / Math.max(Dw, 0.000001)));
  let DD = new D4['Matrix4']().makeScale(DV, DV, DV).multiply(D9),
    Dm = D7.clone().applyMatrix4(DD),
    DS = Dm.getCenter(new D4['Vector3']());
  return new D4['Matrix4']().makeTranslation(-DS.x, -Dm.min.y, -DS.z).multiply(DD);
}
function Ui(D3, D4, D5) {
  let D6 = [],
    D7 = [];
  for (let Dw of D3) {
    let DV = Dw.geometry.index ? Dw.geometry.toNonIndexed() : Dw.geometry.clone(),
      DD = new D5['Matrix4']().multiplyMatrices(D4, Dw.matrixWorld),
      Dm = DV.attributes.position,
      DS = new Float32Array(Dm.count * 3),
      DE = new D5.Vector3();
    for (let DC = 0; DC < Dm.count; DC++)
      (DE.fromBufferAttribute(Dm, DC).applyMatrix4(DD), DE.toArray(DS, DC * 3));
    if (DD.determinant() < 0) {
      for (let Dt = 0; Dt + 8 < DS.length; Dt += 9)
        for (let DH = 0; DH < 3; DH++) {
          let De = DS[Dt + 3 + DH];
          ((DS[Dt + 3 + DH] = DS[Dt + 6 + DH]), (DS[Dt + 6 + DH] = De));
        }
    }
    D6.push(DS);
    let DF = Math.max(1, Math.floor(Dm.count / 8000));
    for (let DR = 0; DR < Dm.count; DR += DF)
      D7.push(new D5['Vector3'](DS[DR * 3], DS[DR * 3 + 1], DS[DR * 3 + 2]));
  }
  let D8 = new Float32Array(D6.reduce((DQ, Dj) => DQ + Dj.length, 0)),
    D9 = 0;
  for (let DQ of D6) (D8.set(DQ, D9), (D9 += DQ.length));
  let Dk = new D5['Box3']().setFromArray(D8);
  return {
    verts: D7,
    all: D8,
    box: Dk,
    height: Dk.max.y - Math.min(0, Dk.min.y),
    grid: Cu(D8, Dk),
  };
}
function Cu(D3, D4) {
  let D5 = D4.min.x,
    D6 = D4.min.y,
    D7 = Math.max(D4.max.x - D5, D4.max.y - D6, 0.000001) / 256,
    D8 = Math.floor((D4.max.x - D5) / D7) + 1,
    D9 = Math.floor((D4.max.y - D6) / D7) + 1,
    Dk = D3.length / 9,
    Dw = (DS) => {
      let DE = DS * 9,
        DF = (Dt, DH, De) => Math.min(Dt, DH, De),
        DC = (Dt, DH, De) => Math.max(Dt, DH, De);
      return [
        Math.floor((DF(D3[DE], D3[DE + 3], D3[DE + 6]) - D5) / D7),
        Math.floor((DC(D3[DE], D3[DE + 3], D3[DE + 6]) - D5) / D7),
        Math.floor((DF(D3[DE + 1], D3[DE + 4], D3[DE + 7]) - D6) / D7),
        Math.floor((DC(D3[DE + 1], D3[DE + 4], D3[DE + 7]) - D6) / D7),
      ];
    },
    DV = new Uint32Array(D8 * D9 + 1);
  for (let DS = 0; DS < Dk; DS++) {
    let [DE, DF, DC, Dt] = Dw(DS);
    for (let DH = DC; DH <= Dt; DH++) for (let De = DE; De <= DF; De++) DV[DH * D8 + De + 1]++;
  }
  for (let DR = 0; DR < D8 * D9; DR++) DV[DR + 1] += DV[DR];
  let DD = new Uint32Array(DV[D8 * D9]),
    Dm = DV.slice(0, D8 * D9);
  for (let DQ = 0; DQ < Dk; DQ++) {
    let [Dj, Dz, DO, DJ] = Dw(DQ);
    for (let DZ = DO; DZ <= DJ; DZ++) for (let DU = Dj; DU <= Dz; DU++) DD[Dm[DZ * D8 + DU]++] = DQ;
  }
  return { x0: D5, y0: D6, cell: D7, nx: D8, ny: D9, start: DV, list: DD };
}
function Yo(D3, D4, D5) {
  Math.abs(D4) < 0.000001 && (D4 += 0.0001 * D3.height);
  let D6 = D3.grid,
    D7 = D3.all,
    D8 = Math.floor((D4 - D6.x0) / D6.cell),
    D9 = Math.floor((D5 - D6.y0) / D6.cell);
  if (D8 < 0 || D9 < 0 || D8 >= D6.nx || D9 >= D6.ny) return null;
  let Dk = D9 * D6.nx + D8,
    Dw = [];
  for (let DD = D6.start[Dk]; DD < D6.start[Dk + 1]; DD++) {
    let Dm = D6.list[DD] * 9,
      DS = D7[Dm],
      DE = D7[Dm + 1],
      DF = D7[Dm + 3],
      DC = D7[Dm + 4],
      Dt = D7[Dm + 6],
      DH = D7[Dm + 7],
      De = (DC - DH) * (DS - Dt) + (Dt - DF) * (DE - DH);
    if (Math.abs(De) < 1e-14) continue;
    let DR = ((DC - DH) * (D4 - Dt) + (Dt - DF) * (D5 - DH)) / De,
      DQ = ((DH - DE) * (D4 - Dt) + (DS - Dt) * (D5 - DH)) / De;
    DR < -1e-9 ||
      DQ < -1e-9 ||
      DR + DQ > 1 + 1e-9 ||
      Dw.push(DR * D7[Dm + 2] + DQ * D7[Dm + 5] + (1 - DR - DQ) * D7[Dm + 8]);
  }
  Dw.sort((Dj, Dz) => Dz - Dj);
  let DV = [];
  for (let Dj of Dw) (!DV.length || DV[DV.length - 1] - Dj > 0.001) && DV.push(Dj);
  return DV.length < 2
    ? DV.length === 1
      ? { front: DV[0], back: DV[0] }
      : null
    : { front: DV[0], back: DV[1] };
}
function Rp(D3, D4, D5) {
  Math.abs(D4) < 0.000001 && (D4 += 0.0001 * D3.height);
  let D6 = D3.grid,
    D7 = D3.all,
    D8 = Math.floor((D4 - D6.x0) / D6.cell),
    D9 = Math.floor((D5 - D6.y0) / D6.cell);
  if (D8 < 0 || D9 < 0 || D8 >= D6.nx || D9 >= D6.ny) return [];
  let Dk = D9 * D6.nx + D8,
    Dw = [];
  for (let DE = D6.start[Dk]; DE < D6.start[Dk + 1]; DE++) {
    let DF = D6.list[DE] * 9,
      DC = D7[DF],
      Dt = D7[DF + 1],
      DH = D7[DF + 3],
      De = D7[DF + 4],
      DR = D7[DF + 6],
      DQ = D7[DF + 7],
      Dj = (De - DQ) * (DC - DR) + (DR - DH) * (Dt - DQ);
    if (Math.abs(Dj) < 1e-14) continue;
    let Dz = ((De - DQ) * (D4 - DR) + (DR - DH) * (D5 - DQ)) / Dj,
      DO = ((DQ - Dt) * (D4 - DR) + (DC - DR) * (D5 - DQ)) / Dj;
    Dz < -1e-9 ||
      DO < -1e-9 ||
      Dz + DO > 1 + 1e-9 ||
      Dw.push({ z: Dz * D7[DF + 2] + DO * D7[DF + 5] + (1 - Dz - DO) * D7[DF + 8], in: Dj > 0 });
  }
  Dw.sort((DJ, DZ) => DZ.z - DJ.z);
  let DV = [];
  for (let DJ of Dw) {
    let DZ = DV[DV.length - 1];
    (DZ && DZ.z - DJ.z < 0.001 && DZ.in === DJ.in) || DV.push(DJ);
  }
  let DD = [],
    Dm = 0,
    DS = 0;
  for (let DU of DV)
    DU.in
      ? (Dm === 0 && (DS = DU.z), Dm++)
      : Dm > 0 && --Dm === 0 && DD.push({ front: DS, back: DU.z });
  return (Dm > 0 && DV.length && DD.push({ front: DS, back: DV[DV.length - 1].z }), DD);
}
function Su(D3, D4, D5) {
  let D6 = Rp(D3, D4, D5);
  if (!D6.length) return Yo(D3, D4, D5);
  let D7 = 0.015 * D3.height,
    D8 = 0.08 * D3.height;
  for (let D9 = 0; D9 < D6.length; D9++) {
    let Dk = D6[D9],
      Dw = D6[D9 + 1];
    if (Dk.front - Dk.back >= D7 || !Dw || Dk.back - Dw.front > D8) return Dk;
  }
  return D6[D6.length - 1];
}
function ba(D3, D4, D5, D6) {
  return (
    (D3.tree ??= ha(
      Float64Array.from(D3.all),
      Uint32Array.from({ length: D3.all.length / 3 }, (D7, D8) => D8),
    )),
    D3.tree.at(D4, D5, D6)
  );
}
function oi(D3, D4, D5, D6 = 0.025) {
  let D7 = Su(D3, D4, D5);
  return !D7 || D7.front - D7.back < D6 * D3.height
    ? null
    : Math.abs(ba(D3, D4, D5, (D7.front + D7.back) / 2)) >= 0.3
      ? D7
      : null;
}
function ii(D3) {
  let D4 = D3.height,
    D5 = 0.004 * D4,
    D6 = [];
  for (let D7 of [0.55, 0.6, 0.65, 0.7]) {
    let D8 = D7 * D4,
      D9 = null,
      Dk = null;
    for (let Dw = D3.box.min.x; Dw <= D3.box.max.x; Dw += D5)
      oi(D3, Dw, D8, 0.04)
        ? Dk
          ? (Dk[1] = Dw)
          : (Dk = [Dw, Dw])
        : Dk && ((!D9 || Dk[1] - Dk[0] > D9[1] - D9[0]) && (D9 = Dk), (Dk = null));
    (Dk && (!D9 || Dk[1] - Dk[0] > D9[1] - D9[0]) && (D9 = Dk), D9 && D6.push((D9[0] + D9[1]) / 2));
  }
  return (D6.sort((DV, DD) => DV - DD), D6.length ? D6[D6.length >> 1] : 0);
}
function $u(D3) {
  let D4 = D3.height,
    D5 = ii(D3),
    D6 = D3.box.max.x - D3.box.min.x,
    D7 = D3.box.max.z - D3.box.min.z;
  if (D7 > 1.3 * D6) return 'side';
  if (D6 < 1.1 * D7) return 'unsure';
  let D8 = D3.all,
    D9 = 0,
    Dk = 0,
    Dw = 0;
  for (let DV of [1, -1]) {
    let DD = [],
      Dm = [];
    for (let DE = 0; DE < D8.length; DE += 3) {
      let DF = D8[DE],
        DC = D8[DE + 1],
        Dt = D8[DE + 2];
      DV * (DF - D5) <= 0.02 * D4 ||
        (DC > 0.05 * D4 && DC < 0.08 * D4 ? DD.push(Dt) : DC < 0.03 * D4 && Dm.push(Dt));
    }
    if (DD.length < 10 || Dm.length < 10) continue;
    DD.sort((DH, De) => DH - De);
    let DS = DD[DD.length >> 1];
    ((D9 += Math.max(...Dm) - DS), (Dk += DS - Math.min(...Dm)), Dw++);
  }
  return Dw ? (D9 > 1.3 * Dk ? 'front' : Dk > 1.3 * D9 ? 'back' : 'unsure') : 'unsure';
}
function Dp(D3, D4) {
  let D5 = D3.height,
    D6 = 0.004 * D5;
  if (oi(D3, D4[0], D4[1] - 0.1 * D5, 0.04)) return null;
  for (let D7 = D4[1] - 0.1 * D5; D7 < D4[1] + 0.15 * D5; D7 += D6)
    if (oi(D3, D4[0], D7, 0.04)) return D7;
  return null;
}
function Au(D3, D4, D5, D6, D7 = [1, 0]) {
  let D8 = 0.012 * D3.height,
    D9 = [];
  for (let DD of [0, -1, 1, -2, 2]) {
    let Dm = D4 + DD * D8 * D7[0],
      DS = D5 + DD * D8 * D7[1],
      DE = Su(D3, Dm, DS);
    DE && D9.push({ ...DE, x: Dm, y: DS });
  }
  if (!D9.length) return null;
  let Dk = Math.max(...D9.map((DF) => DF.front)),
    Dw = D9.filter((DF) => Dk - DF.front < 0.04 * D3.height),
    DV = Dw.filter((DF) =>
      [1 / 3, 1 / 2, 2 / 3].every(
        (DC) => Math.abs(ba(D3, DF.x, DF.y, DF.back + DC * (DF.front - DF.back))) >= 0.3,
      ),
    );
  return (DV.length ? DV : Dw).reduce((DF, DC) =>
    DC.front - DC.back > DF.front - DF.back ? DC : DF,
  );
}
function ni(D3, D4, D5, D6, D7 = null, D8 = [1, 0]) {
  let D9 = Au(D3, D4, D5, D6, D8);
  if (!D9) return 0;
  let Dk = jp[D7] ?? 0.5;
  return D9.back + Dk * (D9.front - D9.back);
}
function qp(D3, D4) {
  let D5 = { ...D3 };
  for (let D6 of ['l', 'r']) {
    let D7 = D3['hip_' + D6] ?? D3.groin;
    for (let [D8, D9] of [
      ['wrist_' + D6, D3['shoulder_' + D6]],
      ['ankle_' + D6, D7],
    ]) {
      let Dk = D3[D8];
      if (!Dk || !D9 || Yo(D4, Dk[0], Dk[1])) continue;
      let Dw = Dk[0] - D9[0],
        DV = Dk[1] - D9[1];
      for (let DD = 1; DD <= 40; DD++) {
        let Dm = [1, -1]
          .map((DS) => {
            let DE = (DS * DD * 0.5 * Math.PI) / 180,
              DF = Math.cos(DE),
              DC = Math.sin(DE);
            return [D9[0] + DF * Dw - DC * DV, D9[1] + DC * Dw + DF * DV];
          })
          .find((DS) => Yo(D4, DS[0], DS[1]));
        if (Dm) {
          D5[D8] = Dm;
          break;
        }
      }
    }
  }
  return D5;
}
function zp(D3, D4, D5, D6, D7) {
  let D8 = D3.height,
    D9 = D3.all,
    Dk = [];
  for (let DR = 0; DR < D9.length; DR += 3) {
    let DQ = D9[DR],
      Dj = D9[DR + 1],
      Dz = D9[DR + 2];
    Dj > D4.y + 0.01 * D8 ||
      D5 * (DQ - D6) <= 0 ||
      Math.abs(DQ - D4.x) > 0.08 * D8 ||
      Dz < D4.z - 0.1 * D8 ||
      Dz > D4.z + 0.2 * D8 ||
      Dk.push([DQ, Dj, Dz]);
  }
  if (Dk.length < 30) return null;
  let Dw = Dk.reduce((DO, DJ) => Math.min(DO, DJ[1]), 1 / 0),
    DV = Dk.filter((DO) => DO[1] < Dw + 0.4 * (D4.y - Dw));
  if (!DV.length) return null;
  let DD = DV.reduce((DO, DJ) => (DJ[2] > DO[2] ? DJ : DO)),
    Dm = [DD[0] - D4.x, DD[2] - D4.z],
    DS = Math.hypot(...Dm);
  if (DS < 0.03 * D8) return null;
  Dm = [Dm[0] / DS, Dm[1] / DS];
  let DE = (DO) => (DO[0] - D4.x) * Dm[0] + (DO[2] - D4.z) * Dm[1],
    DF = DV.filter((DO) => Math.abs(DE(DO) - 0.8 * DS) < 0.015 * D8);
  if (DF.length >= 4) {
    let DO = DF.reduce((DK, DT) => DK + DT[0], 0) / DF.length,
      DJ = DF.reduce((DK, DT) => DK + DT[2], 0) / DF.length,
      DZ = [DO - D4.x, DJ - D4.z],
      DU = Math.hypot(...DZ);
    DU > 0.000001 && ((Dm = [DZ[0] / DU, DZ[1] / DU]), (DS = Math.max(...DV.map(DE))));
  }
  let DC = 0.66 * DS,
    Dt = Dk.filter((DK) => Math.abs(DE(DK) - DC) < 0.012 * D8),
    DH = Dt.length ? Dt.reduce((DK, DT) => Math.max(DK, DT[1]), -1 / 0) : Dw + 0.03 * D8,
    De = Dw + Math.min(0.5 * (DH - Dw), 0.4 * (D4.y - Dw));
  return {
    ball: new D7.Vector3(D4.x + DC * Dm[0], De, D4.z + DC * Dm[1]),
    tip: new D7['Vector3'](D4.x + DS * Dm[0], De, D4.z + DS * Dm[1]),
  };
}
function ri(D3, D4, D5, D6, D7 = null) {
  let D8 = D4.clone().sub(D5),
    D9 = D7 ? D7.clone().sub(D4) : null,
    Dk = D9 && D9.length() > 0.01 * D3.height ? D9.length() : 0,
    Dw = Dk ? 1.15 * Dk : D8.length() * 0.9,
    DV = (Dk ? D9 : D8).clone().normalize(),
    DD = D3.all,
    Dm = [];
  for (let Dz = 0; Dz < DD.length; Dz += 3) {
    let DO = new D6['Vector3'](DD[Dz], DD[Dz + 1], DD[Dz + 2]),
      DJ = DO.clone().sub(D4),
      DZ = DJ.dot(DV);
    DJ.length() > Dw ||
      DZ < 0.01 * D3.height ||
      (Dk && DJ.addScaledVector(DV, -DZ).length() > 0.6 * Dk) ||
      Dm.push(DO);
  }
  if (Dm.length < 20)
    return Dk ? { dir: DV, length: Dk, palm: new D6.Vector3(0, 0, 1), flat: 1, given: !0 } : null;
  let DS = Dm.reduce((DU, DK) => DU.add(DK), new D6['Vector3']()).multiplyScalar(1 / Dm.length),
    DE = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
  for (let DU of Dm) {
    let DK = [DU.x - DS.x, DU.y - DS.y, DU.z - DS.z];
    for (let DT = 0; DT < 3; DT++) for (let DA = 0; DA < 3; DA++) DE[DT][DA] += DK[DT] * DK[DA];
  }
  let DF = Up(DE),
    DC = new D6['Vector3'](...DF[0].v);
  DC.dot(DS.clone().sub(D4)) < 0 && DC.negate();
  let Dt = 0;
  for (let Dn of Dm) Dt = Math.max(Dt, Dn.clone().sub(D4).dot(DC));
  let DH = Dm.filter((DX) => DX.clone().sub(D4).dot(DC) > 0.85 * Dt),
    De = DH.reduce((DX, DL) => DX.add(DL), new D6['Vector3']())
      .multiplyScalar(1 / DH.length)
      .clone()
      .sub(D4)
      .normalize(),
    DR = 0;
  for (let DX of Dm) DR = Math.max(DR, DX.clone().sub(D4).dot(De));
  let DQ = new D6['Vector3'](...DF[2].v);
  DQ.addScaledVector(De, -DQ.dot(De)).normalize();
  let Dj = DF[2].value / Math.max(DF[1].value, 1e-12);
  if (Dk) {
    let DL = new D6['Vector3'](...DF[2].v);
    return (
      DL.addScaledVector(DV, -DL.dot(DV)),
      { dir: DV, length: Dk, palm: DL.lengthSq() > 1e-8 ? DL.normalize() : DQ, flat: Dj, given: !0 }
    );
  }
  return { dir: De, length: DR, palm: DQ, flat: Dj };
}
var Wi = ['thumb', 'index', 'middle', 'ring', 'pinky'],
  wa = [5, 4, 3, 2],
  Eu = (D3 = 5) => Wi.slice(1, 1 + Math.min(Math.max((D3 | 0) - 1, 1), 4)),
  ai = (D3 = 5) => {
    let D4 = Eu(D3);
    return Wi.slice(1)
      .filter((D5) => !D4.includes(D5))
      .flatMap((D5) =>
        ['l', 'r'].flatMap((D6) =>
          ['01', '02', '03', '04_leaf'].map((D7) => D5 + '_' + D7 + '_' + D6),
        ),
      );
  };
function ya(D3, D4, D5, D6, D7 = 4) {
  let D8 = D5.dir,
    D9 = D5.palm,
    Dk = new D6['Vector3']().crossVectors(D8, D9).normalize(),
    Dw = D5.length,
    DV = 1.6 * Dw,
    DD = 0.35 * Dw,
    Dm = D3.all,
    DS = [],
    DE = new D6['Vector3']();
  for (let DP = 0; DP < Dm.length; DP += 9) {
    let DY = [];
    for (let Dv = 0; Dv < 9; Dv += 3) {
      DE.set(Dm[DP + Dv] - D4.x, Dm[DP + Dv + 1] - D4.y, Dm[DP + Dv + 2] - D4.z);
      let DB = DE.dot(D8),
        DG = DE.dot(D9);
      if (
        DB < 0 ||
        DB > DV ||
        Math.abs(DG) > DD ||
        DE.length() > DV ||
        (D5.given && Math.abs(DE.dot(Dk)) > 0.8 * Dw)
      )
        break;
      DY.push(DE.dot(Dk), DB, DG);
    }
    DY.length === 9 && DS.push(...DY);
  }
  if (DS.length < 450) return null;
  let DF = Float32Array.from(DS),
    DC = new D6['Box3']().setFromArray(DF),
    Dt = { all: DF, box: DC, height: D3.height, grid: Cu(DF, DC) },
    DH = Dw / 160,
    De = [];
  for (let Dg = DH / 2; Dg <= DC.max.y; Dg += DH) {
    let DI = [],
      Dh = null;
    for (let DN = DC.min.x - DH; DN <= DC.max.x + DH; DN += DH) {
      let DM = Yo(Dt, DN, Dg);
      DM
        ? Dh
          ? ((Dh.a1 = DN), Dh.z.push((DM.front + DM.back) / 2))
          : (Dh = { a0: DN, a1: DN, z: [(DM.front + DM.back) / 2] })
        : Dh && (DI.push(Dh), (Dh = null));
    }
    if ((Dh && DI.push(Dh), !DI.length && Dg > 0.5 * Dw)) break;
    De.push({
      t: Dg,
      runs: DI.map((m0) => ({
        a0: m0.a0,
        a1: m0.a1,
        c: (m0.a0 + m0.a1) / 2,
        z: m0.z[m0.z.length >> 1],
      })),
    });
  }
  let DR = (m0) => m0.a1 - m0.a0,
    DQ = (m0) => DR(m0) >= 2 * DH,
    Dj = 3,
    Dz = Math.round(0.06 * 160),
    DO = (m0, m1, m2, m3 = 0) => {
      let m4 = [],
        m5 = m0,
        m6 = 0,
        m7 = 0,
        m8 = DR(m0);
      for (let m9 = m1 + m2; m9 >= 0 && m9 < De.length; m9 += m2) {
        let mk =
          De[m9].runs.find((mw) => mw.a0 <= m5.c && mw.a1 >= m5.c) ??
          De[m9].runs.find((mw) => Math.abs(mw.c - m5.c) < 0.4 * m8);
        if (!mk) {
          if (++m6 > Dj) break;
          continue;
        }
        if (((m6 = 0), DR(mk) > 1.8 * m8)) {
          if (!(m2 > 0 && DR(mk) <= m3 * m8) && ++m7 > Dz) {
            m4.length = Math.max(0, m4.length - Dz);
            break;
          }
          m4.push({ t: De[m9].t, c: m5.c, z: mk.z });
          continue;
        }
        ((m7 = 0), (m5 = mk), m4.push({ t: De[m9].t, c: mk.c, z: mk.z }));
      }
      return m4;
    },
    DJ = (m0) =>
      D4.clone().addScaledVector(Dk, m0.c).addScaledVector(D8, m0.t).addScaledVector(D9, m0.z),
    DZ = (m0, m1, m2 = 0) => {
      let m3 = { t: De[m1].t, c: m0.c, z: m0.z },
        m4 = [...DO(m0, m1, -1).reverse(), m3, ...DO(m0, m1, 1, m2)];
      return { c: m0.c, tipT: m4[m4.length - 1].t, line: m4.map(DJ) };
    },
    DU = null;
  {
    let m0 = null;
    (De.forEach((m1, m2) => {
      if (m1.t < 0.15 * Dw || m1.t > 0.7 * Dw) return;
      let m3 = m1.runs.filter(DQ);
      if (m3.length < 2) return;
      let m4 = m3[m3.length - 1].a1 - m3[0].a0;
      for (let [m5, m6] of [
        [m3[0], m3[1]],
        [m3[m3.length - 1], m3[m3.length - 2]],
      ]) {
        let m7 = Math.max(m6.a0 - m5.a1, m5.a0 - m6.a1);
        DR(m5) < 0.3 * m4 &&
          (!m0 || m7 > m0.gap) &&
          (m0 = { r: m5, k: m2, gap: m7, side: m5 === m3[0] ? -1 : 1 });
      }
    }),
      m0 && (DU = { ...DZ(m0.r, m0.k), side: m0.side }));
  }
  let DK = DU ? Math.max(0, ...De.map((m1, m2) => (m1.t <= DU.tipT ? m2 : 0))) : 0,
    DT = (m1) =>
      m1.runs.filter(DQ).filter((m2) => !DU || Math.abs(m2.c - DU.c) > 0.02 * Dw || m1.t > DU.tipT)
        .length,
    DA = De.map((m1, m2) => (m2 > DK * 0.6 ? DT(m1) : 0)),
    Dn = Math.max(0, ...DA);
  if (Dn < D7) return null;
  let DX = DA.map((m1, m2) => (m1 === Dn ? m2 : -1)).filter((m1) => m1 >= 0),
    DL = DX[DX.length >> 1],
    Db = De[DL].runs
      .filter(DQ)
      .map((m1) => DZ(m1, DL, D7 + 0.6))
      .sort((m1, m2) => m1.c - m2.c);
  if (
    (DU &&
      (Db = Db.filter(
        (m1) => m1.line[0].distanceTo(DU.line[0]) > 0.03 * Dw || Math.abs(m1.c - DU.c) > 0.05 * Dw,
      )),
    Db.length > D7 &&
      (Db = Db.sort((m1, m2) => m2.tipT - m1.tipT)
        .slice(0, D7)
        .sort((m1, m2) => m1.c - m2.c)),
    Db.length !== D7)
  )
    return null;
  let Dx = (m1) => m1.line[m1.line.length - 1].z,
    Dy = Db[D7 - 1],
    DW = Math.abs(Dx(Db[0]) - Dx(Dy)) > 0.25 * Math.abs(Dy.c - Db[0].c);
  D7 < 2 ||
    (DW
      ? Dx(Db[0]) > Dx(Dy)
      : DU
        ? Math.abs(Db[0].c - DU.c) < Math.abs(Dy.c - DU.c)
        : Db[0].tipT > Dy.tipT) ||
    Db.reverse();
  let Dq = {};
  return (
    Wi.slice(1, 1 + D7).forEach((m1, m2) => {
      let m3 = Db[m2];
      Dq[m1] = { web: m3.line[0], tip: m3.line[m3.line.length - 1], line: m3.line };
    }),
    DU && (Dq.thumb = { web: DU.line[0], tip: DU.line[DU.line.length - 1], line: DU.line }),
    Dq
  );
}
function Kp(D3, D4) {
  let D5 = null,
    D6 = 1 / 0;
  for (let D7 = 1; D7 < D3.length; D7++) {
    let D8 = D3[D7 - 1],
      D9 = D3[D7].clone().sub(D8),
      Dk = D9.lengthSq(),
      Dw = Dk > 1e-12 ? Math.max(0, Math.min(1, D4.clone().sub(D8).dot(D9) / Dk)) : 0,
      DV = D8.clone().addScaledVector(D9, Dw),
      DD = DV.distanceToSquared(D4);
    DD < D6 && ((D6 = DD), (D5 = DV));
  }
  return D5 ?? D4.clone();
}
function Lu(D3, D4, D5) {
  D3.updateMatrixWorld(!0);
  let D6 = [];
  D3.traverse((D9) => {
    D9.isMesh && D9.geometry?.attributes?.position && D6.push(D9);
  });
  let D7 = Ui(D6, new D5['Matrix4'](), D5),
    D8 = (D9) => {
      let Dk = D4.joint.get('hand_' + D9),
        Dw = ri(D7, Dk, D4.joint.get('lowerarm_' + D9), D5);
      return (
        Dw &&
          (Dw.tips = Object.fromEntries(
            Object.entries(ya(D7, Dk, Dw, D5) ?? {}).map(([DV, DD]) => [DV, DD.tip]),
          )),
        Dw
      );
    };
  return { l: D8('l'), r: D8('r') };
}
function Up(D3) {
  let D4 = D3.map((D6) => D6.slice()),
    D5 = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ];
  for (let D6 = 0; D6 < 50; D6++) {
    let D7 = 0;
    for (let D8 = 0; D8 < 3; D8++) for (let D9 = D8 + 1; D9 < 3; D9++) D7 += D4[D8][D9] ** 2;
    if (D7 < 1e-20) break;
    for (let Dk = 0; Dk < 3; Dk++)
      for (let Dw = Dk + 1; Dw < 3; Dw++) {
        if (Math.abs(D4[Dk][Dw]) < 1e-30) continue;
        let DV = (D4[Dw][Dw] - D4[Dk][Dk]) / (2 * D4[Dk][Dw]),
          DD = Math.sign(DV || 1) / (Math.abs(DV) + Math.sqrt(DV * DV + 1)),
          Dm = 1 / Math.sqrt(DD * DD + 1),
          DS = DD * Dm;
        for (let DE = 0; DE < 3; DE++) {
          let DF = D4[DE][Dk],
            DC = D4[DE][Dw];
          ((D4[DE][Dk] = Dm * DF - DS * DC), (D4[DE][Dw] = DS * DF + Dm * DC));
        }
        for (let Dt = 0; Dt < 3; Dt++) {
          let DH = D4[Dk][Dt],
            De = D4[Dw][Dt];
          ((D4[Dk][Dt] = Dm * DH - DS * De), (D4[Dw][Dt] = DS * DH + Dm * De));
        }
        for (let DR = 0; DR < 3; DR++) {
          let DQ = D5[DR][Dk],
            Dj = D5[DR][Dw];
          ((D5[DR][Dk] = Dm * DQ - DS * Dj), (D5[DR][Dw] = DS * DQ + Dm * Dj));
        }
      }
  }
  return [0, 1, 2]
    .map((Dz) => ({ value: D4[Dz][Dz], v: [D5[0][Dz], D5[1][Dz], D5[2][Dz]] }))
    .sort((Dz, DO) => DO.value - Dz.value);
}
function Wp(D3, D4, D5, D6) {
  let D7 = new Set(),
    D8 = -1 / 0,
    D9 = 0,
    Dk = D3.map((Dw) => {
      let DV = Dw.geometry;
      DV.boundingBox || DV.computeBoundingBox();
      let DD = DV.boundingBox
        .clone()
        .applyMatrix4(new D6['Matrix4']().multiplyMatrices(D4, Dw.matrixWorld));
      return ((D9 = Math.max(D9, DD.max.y)), DD);
    });
  return (
    D3.forEach((Dw, DV) => {
      Dk[DV].min.y >= D5 - (0.02 * D9) / 1.83 && D7.add(Dw);
    }),
    D7.size === D3.length && D7.clear(),
    D3.forEach((Dw, DV) => {
      D7.has(Dw) || (D8 = Math.max(D8, Dk[DV].max.y));
    }),
    {
      headOnly: D7,
      skin: Ui(
        D3.filter((Dw) => !D7.has(Dw)),
        D4,
        D6,
      ),
      skullTop: D8,
    }
  );
}
function Vp(D3, D4) {
  let D5 = D4.box.max.y,
    D6 = D5 / 1.8,
    [D7, D8] = D3.chin,
    D9 = (DV) => Yo(D4, D7, DV)?.front ?? null,
    Dk = null;
  for (let DV = D8 + 0.03 * D6; DV >= D8 - 0.08 * D6; DV -= 0.002 * D6) {
    let DD = D9(DV),
      Dm = D9(DV - 0.01 * D6);
    DD == null ||
      Dm == null ||
      DD - Dm > 0.045 * D5 ||
      ((!Dk || DD - Dm > Dk.drop) && (Dk = { y: DV - 0.005 * D6, drop: DD - Dm }));
  }
  if (!Dk || Dk.drop < 0.006 * D6) return { markers: D3, jawY: null, moved: 0 };
  let Dw = Dk.y - (0.0143 * D5) / 1.83;
  return { markers: { ...D3, chin: [D7, Dw] }, jawY: Dk.y, moved: Dw - D8 };
}
function Vi(D3, D4, D5, D6, D7, { digits: D8 = 5 } = {}) {
  let { headOnly: D9, skin: Dk, skullTop: Dw } = Wp(D4, D5, D3.chin[1], D7),
    DV = Vp(D3, Dk);
  return {
    joints: Yp(DV.markers, Dk, D6, D7, { digits: D8 }),
    head: { chin: DV.markers.chin, headOnly: D9, skullTop: Dw },
    moved: DV.moved,
  };
}
function ka(D3, D4, D5) {
  let D6 = D3.box.max.y,
    D7 = D4.height ?? 1.86,
    D8 = (DS) => D4.joint.get(DS),
    D9 = (DS) => (DS / D7) * D6,
    Dk = ii(D3),
    Dw = (DS, DE) => DS.filter((DF) => (DE === 'l' ? DF.x > Dk : DF.x < Dk)),
    DV = (DS, DE, DF = 0.02 * D6) => {
      let DC = Dw(
        D3.verts.filter((Dt) => Math.abs(Dt.y - DS) < DF),
        DE,
      );
      return DC.length
        ? DC.reduce((Dt, DH) => Dt + DH.x, 0) / DC.length
        : Dk + (DE === 'l' ? 1 : -1) * D9(D8('calf_l').x);
    },
    DD = { chin: [Dk, D9(1.54)], groin: [Dk, D9(0.843)] },
    Dm = D9(D8('upperarm_l').y);
  for (let DS of ['l', 'r']) {
    let DE = DS === 'l' ? 1 : -1,
      DF = new D5.Vector2(Dk + DE * D9(D8('upperarm_l').x), Dm),
      DC = Dw(
        D3.verts.filter((Dz) => Dz.y > D9(0.9)),
        DS,
      ),
      Dt = DC.length ? DC.reduce((Dz, DO) => (DE * DO.x > DE * Dz.x ? DO : Dz)) : null,
      DH = Dt ? new D5['Vector2'](Dt.x, Dt.y) : new D5.Vector2(DE * D9(0.97), Dm),
      De = DF.clone().lerp(DH, 0.7),
      DR = DF.clone().lerp(DH, 0.35);
    ((DD['shoulder_' + DS] = DF.toArray()),
      (DD['elbow_' + DS] = DR.toArray()),
      (DD['wrist_' + DS] = De.toArray()),
      (DD['tip_' + DS] = DH.toArray()));
    let DQ = D9(D8('calf_l').y),
      Dj = D9(D8('foot_l').y);
    ((DD['hip_' + DS] = [Dk + DE * D9(D8('thigh_l').x), D9(D8('thigh_l').y)]),
      (DD['knee_' + DS] = [DV(DQ, DS), DQ]),
      (DD['ankle_' + DS] = [DV(Dj, DS), Dj]));
  }
  return DD;
}
function Ou(D3, D4, D5 = null) {
  let D6 = (DS) => D4.joint.get(DS),
    D7 = (DS) => D3[DS],
    D8 = (D7('ankle_l')[1] + D7('ankle_r')[1]) / 2,
    D9 = D5 ? Dp(D5, D7('groin')) : null,
    Dk = [D7('groin')[0], Math.max(D7('groin')[1], D9 == null ? -1 / 0 : D9 - 0.03 * D5.height)],
    Dw = Dk[1] - D8,
    DV = 0.843 - D6('foot_l').y,
    DD = (D7('shoulder_l')[0] - D7('shoulder_r')[0]) / 2,
    Dm = (D6('thigh_l').x / D6('upperarm_l').x) * DD;
  if (D5) {
    let DS = D5.height,
      DE = Dk[1] - 0.06 * DS,
      DF = 0.002 * DS,
      DC = (De, DR) => {
        let DQ = null,
          Dj = null;
        for (let DZ = DF; DZ < 0.25 * DS; DZ += DF) {
          let DU = oi(D5, Dk[0] + De * DZ, DE);
          if ((DU && DQ === null && (DQ = DZ), DU)) Dj = DZ;
          else {
            if (DQ !== null) break;
          }
        }
        if (DQ === null || Dj - DQ > 0.14 * DS) return null;
        let Dz = (DQ + Dj) / 2,
          DO = D3['knee_' + DR];
        if (!DO || DO[1] >= DE) return Dz;
        let DJ = De * (DO[0] - Dk[0]);
        return Math.atan2(DJ - Dz, DE - DO[1]) < (5 * Math.PI) / 180
          ? Dz
          : Dz + ((Dz - DJ) / (DE - DO[1])) * (Dk[1] + ((D6('thigh_l').y - 0.843) / DV) * Dw - DE);
      },
      Dt = DC(1, 'l'),
      DH = DC(-1, 'r');
    Dt !== null && DH !== null && (Dm = (Dt + DH) / 2);
  }
  return {
    apart: Dm,
    thighY: Dk[1] + ((D6('thigh_l').y - 0.843) / DV) * Dw,
    below: ((D6('thigh_l').y - D6('pelvis').y) / DV) * Dw,
  };
}
function Gp(D3, D4, D5, D6, D7 = () => !0) {
  let D8 = 0.004 * D3.height,
    D9 = [],
    Dk = null;
  for (let Dm = -D6; Dm <= D6; Dm += D8) {
    let DS = D4[0] + Dm * D5[0],
      DE = D4[1] + Dm * D5[1];
    D7(DS) && Yo(D3, DS, DE)
      ? Dk
        ? (Dk[1] = Dm)
        : (Dk = [Dm, Dm])
      : Dk && (D9.push(Dk), (Dk = null));
  }
  if ((Dk && D9.push(Dk), !D9.length)) return null;
  let Dw = (DF) => (DF[0] <= 0 && DF[1] >= 0 ? 0 : Math.min(Math.abs(DF[0]), Math.abs(DF[1]))),
    DV = D9.reduce((DF, DC) => (Dw(DC) < Dw(DF) ? DC : DF)),
    DD = (DV[0] + DV[1]) / 2;
  return [D4[0] + DD * D5[0], D4[1] + DD * D5[1]];
}
function Iu(
  D3,
  D4,
  D5,
  D6,
  { own: D7 = new Set(), mirror: D8 = !1, mid: D9 = ii(D4), tips: Dk = !0 } = {},
) {
  return (
    (!D3.knee_l || !D3.knee_r) &&
      (D3 = Mu(D3, D4, D5, D6, { own: D7, mirror: D8, mid: D9, tips: !1 })),
    Mu(D3, D4, D5, D6, { own: D7, mirror: D8, mid: D9, tips: Dk })
  );
}
function Mu(D3, D4, D5, D6, { own: D7, mirror: D8, mid: D9, tips: Dk = !0 }) {
  let Dw = (Dt) => D5.joint.get(Dt),
    DV = { ...D3 },
    DD = Ou(D3, D5, D4),
    Dm = D3.groin[0];
  for (let Dt of ['l', 'r']) {
    let DH = 'hip_' + Dt,
      De = Dt === 'l' ? 1 : -1;
    D7.has(DH) ||
      (DV[DH] =
        D8 && Dt === 'r' ? [2 * D9 - DV.hip_l[0], DV.hip_l[1]] : [Dm + De * DD.apart, DD.thighY]);
  }
  let DS = (DR, DQ, Dj) => {
      let Dz = Dw(DQ).distanceTo(Dw(DR));
      return Dz / (Dz + Dw(Dj).distanceTo(Dw(DQ)));
    },
    DE = DS('upperarm_l', 'lowerarm_l', 'hand_l'),
    DF = DS('thigh_l', 'calf_l', 'foot_l'),
    DC = (DR, DQ, Dj, Dz) => {
      let DO = DQ[0] - DR[0],
        DJ = DQ[1] - DR[1],
        DZ = Math.hypot(DO, DJ) || 1,
        DU = [DR[0] + Dj * DO, DR[1] + Dj * DJ];
      return Gp(D4, DU, [-DJ / DZ, DO / DZ], 0.35 * DZ, Dz) ?? DU;
    };
  for (let DR of ['l', 'r']) {
    let DQ = DR === 'l' ? 1 : -1;
    for (let [Dj, Dz, DO, DJ, DZ] of [
      ['elbow', D3['shoulder_' + DR], D3['wrist_' + DR], DE, void 0],
      ['knee', DV['hip_' + DR], D3['ankle_' + DR], DF, (DU) => DQ * (DU - Dm) > 0],
    ]) {
      let DU = Dj + '_' + DR;
      if (!D7.has(DU)) {
        if (D8 && DR === 'r') {
          DV[DU] = [2 * D9 - DV[Dj + '_l'][0], DV[Dj + '_l'][1]];
          continue;
        }
        DV[DU] = DC(Dz, DO, DJ, DZ);
      }
    }
  }
  for (let DK of ['l', 'r']) {
    let DT = 'tip_' + DK,
      DA = DV['wrist_' + DK],
      Dn = DV['elbow_' + DK];
    if (D7.has(DT) || !DA || !Dn) continue;
    if (D8 && DK === 'r' && DV.tip_l) {
      DV[DT] = [2 * D9 - DV.tip_l[0], DV.tip_l[1]];
      continue;
    }
    if (!Dk && DV[DT]) continue;
    let DX = (DW) => new D6.Vector3(DW[0], DW[1], ni(D4, DW[0], DW[1], D6)),
      DL = DX(DA),
      Db = Dk ? ri(D4, DL, DX(Dn), D6) : null,
      Dx =
        Dw('middle_04_leaf_l').distanceTo(Dw('hand_l')) / Dw('hand_l').distanceTo(Dw('lowerarm_l')),
      Dy = Db ? ya(D4, DL, Db, D6)?.middle?.tip : null;
    DV[DT] = Dy
      ? [Dy.x, Dy.y]
      : Db
        ? [DL.x + 0.96 * Db.length * Db.dir.x, DL.y + 0.96 * Db.length * Db.dir.y]
        : [DA[0] + Dx * (DA[0] - Dn[0]), DA[1] + Dx * (DA[1] - Dn[1])];
  }
  return DV;
}
function Yp(D3, D4, D5, D6, { digits: D7 = 5 } = {}) {
  let D8 = Eu(D7);
  D3 = qp(D3, D4);
  let D9 = (DL, Db, Dx) => new D6['Vector3'](DL, Db, Dx),
    Dk = (DL) => D5.joint.get(DL),
    Dw = new Map(),
    DV = (DL, Db, Dx, Dy) => Dw.set(DL, D9(Db, Dx, ni(D4, Db, Dx, D6, DL, Dy))),
    DD = (DL) => D3[DL],
    Dm = (DL, Db) => {
      let Dx = DD(Db)[0] - DD(DL)[0],
        Dy = DD(Db)[1] - DD(DL)[1],
        DW = Math.hypot(Dx, Dy) || 1;
      return [-Dy / DW, Dx / DW];
    },
    DS = {
      shoulder: ['shoulder', 'elbow'],
      elbow: ['shoulder', 'wrist'],
      wrist: ['elbow', 'wrist'],
      knee: ['groin', 'ankle'],
      ankle: ['knee', 'ankle'],
    };
  for (let [DL, Db] of Object.entries(Bp)) {
    let [Dx, Dy] = DL.split('_'),
      [DW, Dq] = DS[Dx].map((DP) => (DP === 'groin' ? 'groin' : DP + '_' + Dy));
    if (Dx === 'shoulder') {
      let [DP, DY] = DD(DL),
        Dv = DD('elbow_' + Dy);
      Dw.set(
        Db,
        D9(DP, DY, ni(D4, DP + 0.2 * (Dv[0] - DP), DY + 0.2 * (Dv[1] - DY), D6, Db, Dm(DW, Dq))),
      );
    } else DV(Db, ...DD(DL), Dm(DW, Dq));
  }
  let DE = DD('groin'),
    DF = Ou(D3, D5, D4),
    DC = (DB) => D3['hip_' + DB] ?? [DE[0] + (DB === 'l' ? 1 : -1) * DF.apart, DF.thighY];
  for (let DB of ['l', 'r']) {
    let [DG, Dg] = DC(DB),
      DI = DD('knee_' + DB);
    Dw.set(
      'thigh_' + DB,
      D9(
        DG,
        Dg,
        ni(
          D4,
          DG + 0.2 * (DI[0] - DG),
          Dg + 0.2 * (DI[1] - Dg),
          D6,
          'thigh_' + DB,
          Dm('groin', 'ankle_' + DB),
        ),
      ),
    );
  }
  let Dt = (DC('l')[0] + DC('r')[0]) / 2,
    DH = (DC('l')[1] + DC('r')[1]) / 2 - DF.below;
  for (let Dh = 0; Dh < 25 && !oi(D4, Dt, DH, 0.04); Dh++) DH += 0.004 * D4.height;
  DV('pelvis', Dt, DH);
  let De = (DN, DM, m0, m1) => {
    let m2 = Dw.get(DN),
      m3 = Dw.get(m0).clone().sub(m2).normalize(),
      m4 = new D6['Vector3'](0, 0, m1).addScaledVector(m3, -m1 * m3.z);
    if (m4.lengthSq() < 1e-8) return;
    m4.normalize();
    let m5 = Dw.get(DM).clone().sub(m2).dot(m4);
    m5 < 0 && Dw.get(DM).addScaledVector(m4, -2 * m5);
  };
  for (let DN of ['l', 'r'])
    (De('thigh_' + DN, 'calf_' + DN, 'foot_' + DN, 1),
      De('upperarm_' + DN, 'lowerarm_' + DN, 'hand_' + DN, -1));
  let DR = {};
  for (let DM of ['l', 'r']) {
    if (((DR[DM] = zp(D4, Dw.get('foot_' + DM), DM === 'l' ? 1 : -1, DE[0], D6)), !DR[DM]))
      continue;
    let m0 = Dw.get('thigh_' + DM),
      m1 = Dw.get('foot_' + DM),
      m2 = Dw.get('calf_' + DM),
      m3 = m1.clone().sub(m0).cross(DR[DM].tip.clone().sub(m0));
    m3.lengthSq() < 1e-10 || (m3.normalize(), m2.addScaledVector(m3, -m2.clone().sub(m0).dot(m3)));
  }
  let DQ = (DD('shoulder_l')[1] + DD('shoulder_r')[1]) / 2,
    Dj = DD('chin'),
    Dz = DQ + ((Dk('neck_01').y - Dk('upperarm_l').y) / (1.54 - Dk('upperarm_l').y)) * (Dj[1] - DQ),
    DO = (DD('shoulder_l')[0] + DD('shoulder_r')[0]) / 2,
    DJ = Dk('neck_01').y - Dk('pelvis').y;
  for (let m4 of ['spine_01', 'spine_02', 'spine_03']) {
    let m5 = (Dk(m4).y - Dk('pelvis').y) / DJ;
    DV(m4, DE[0] + m5 * (DO - DE[0]), DH + m5 * (Dz - DH));
  }
  (DV('neck_01', DO, Dz),
    DV('Head', Dj[0], Dj[1] + ((Dk('Head').y - 1.54) / D5.height) * D4.box.max.y));
  let DZ = D4.box.max.y / (D5.height ?? 1.86),
    DU = (Dz - DH) / DJ,
    DK = (m6, m7, m8, m9) =>
      Dw.set(
        m6,
        Dw.get(m7)
          .clone()
          .add(Dk(m6).clone().sub(Dk(m7)).applyQuaternion(m8).multiplyScalar(m9)),
      ),
    DT = (m6, m7, m8, m9) =>
      new D6.Quaternion().setFromUnitVectors(
        Dk(m7).clone().sub(Dk(m6)).normalize(),
        Dw.get(m9).clone().sub(Dw.get(m8)).normalize(),
      ),
    DA = new D6.Quaternion(),
    Dn = new Map();
  for (let [m6, m7] of D5.parent) m7 && Dn.set(m7, [...(Dn.get(m7) ?? []), m6]);
  let DX = (m8, m9) => {
    for (let mk of Dn.get(m8) ?? []) (m9(mk), DX(mk, m9));
  };
  for (let m8 of ['l', 'r']) {
    DK('clavicle_' + m8, 'spine_03', DA, DU);
    {
      let mQ = Dw.get('clavicle_' + m8);
      mQ.z = ni(D4, mQ.x, mQ.y, D6, 'clavicle_' + m8);
    }
    let m9 = DT('lowerarm_' + m8, 'hand_' + m8, 'lowerarm_' + m8, 'hand_' + m8),
      mk =
        Dw.get('hand_' + m8).distanceTo(Dw.get('lowerarm_' + m8)) /
        Dk('hand_' + m8).distanceTo(Dk('lowerarm_' + m8)),
      mw = D3['tip_' + m8],
      mV = mw
        ? (() => {
            let mj = Au(D4, mw[0], mw[1], D6);
            return D9(mw[0], mw[1], mj ? (mj.front + mj.back) / 2 : Dw.get('hand_' + m8).z);
          })()
        : null,
      mD = ri(D4, Dw.get('hand_' + m8), Dw.get('lowerarm_' + m8), D6, mV),
      mm = D5.hands?.[m8];
    if (mD && mD.length > 0.02 * D4.height) {
      let mj = mD.given && mm?.tips?.middle ? mm.tips.middle.clone().sub(Dk('hand_' + m8)) : null,
        mz = mj
          ? mj.clone().normalize()
          : (mm?.dir ??
            Dk('middle_04_leaf_' + m8)
              .clone()
              .sub(Dk('hand_' + m8))
              .normalize());
      if (
        ((m9 = new D6['Quaternion']().setFromUnitVectors(mz, mD.dir)),
        (mk =
          mD.length /
          (mj
            ? mj.length()
            : (mm?.length ?? Dk('middle_04_leaf_' + m8).distanceTo(Dk('hand_' + m8))))),
        mD.flat < 0.5)
      ) {
        let mO = (
          mm?.palm ??
          new D6.Vector3()
            .crossVectors(
              mz,
              Dk('index_01_' + m8)
                .clone()
                .sub(Dk('pinky_01_' + m8)),
            )
            .normalize()
        )
          .clone()
          .applyQuaternion(m9);
        mO.addScaledVector(mD.dir, -mO.dot(mD.dir)).normalize();
        let mJ = mD.palm.dot(mO) < 0 ? mD.palm.clone().negate() : mD.palm,
          mZ = Math.atan2(new D6.Vector3().crossVectors(mO, mJ).dot(mD.dir), mO.dot(mJ));
        m9 = new D6['Quaternion']().setFromAxisAngle(mD.dir, mZ).multiply(m9);
      }
    }
    let mS = D8[0],
      mE = D8[D8.length - 1],
      mF = D8.includes('middle') ? 'middle' : mS,
      mC = mD && ya(D4, Dw.get('hand_' + m8), mD, D6, D8.length);
    mC && mV && mC[mF].tip.distanceTo(mV) > 0.3 * mD.length && (mC = null);
    let mt = mm?.tips;
    if (mC && mt?.[mS] && mt[mF] && mt[mE]) {
      let mU = Dw.get('hand_' + m8),
        mK = Dk('hand_' + m8),
        mT = (mo, mX) => {
          let mL = mo.clone().normalize(),
            mb = new D6['Vector3']().crossVectors(mL, mX).normalize(),
            mx = new D6['Vector3']().crossVectors(mb, mL);
          return new D6['Matrix4']().makeBasis(mL, mx, mb);
        },
        mA = mC[mF].tip.clone().sub(mU),
        mn = mt[mF].clone().sub(mK);
      if (mS !== mE) {
        let mo = mT(mA, mC[mS].tip.clone().sub(mC[mE].tip)).multiply(
          mT(mn, mt[mS].clone().sub(mt[mE])).invert(),
        );
        m9 = new D6['Quaternion']().setFromRotationMatrix(mo);
      } else
        m9 = new D6['Quaternion']()
          .setFromUnitVectors(mn.clone().applyQuaternion(m9).normalize(), mA.clone().normalize())
          .multiply(m9);
      ((mk = mA.length() / mn.length()), DX('hand_' + m8, (mX) => DK(mX, 'hand_' + m8, m9, mk)));
      for (let mX of Wi) {
        if (!mC[mX] || !mt[mX]) continue;
        let mL = mX + '_01_' + m8,
          mb = mX + '_04_leaf_' + m8,
          mx =
            mC.thumb &&
            Dw.get(mb)
              .clone()
              .sub(Dw.get(mL))
              .angleTo(
                mC.thumb.tip
                  .clone()
                  .add(Dk(mb).clone().sub(mt.thumb).applyQuaternion(m9).multiplyScalar(mk))
                  .sub(Dw.get(mL)),
              );
        if (mX === 'thumb' && mx > (15 * Math.PI) / 180) {
          let mI = mC.thumb,
            mN = mI.tip
              .clone()
              .add(Dk(mb).clone().sub(mt.thumb).applyQuaternion(m9).multiplyScalar(mk)),
            mM = 'thumb_02_' + m8,
            S0 = 'thumb_03_' + m8,
            S1 = (
              mI.tip.distanceTo(mI.web) > 0.012 * D4.height
                ? mI.tip.clone().sub(mI.web)
                : mN.clone().sub(Dw.get(mL))
            ).normalize(),
            S2 = mk * (Dk(S0).distanceTo(Dk(mM)) + Dk(mb).distanceTo(Dk(S0))),
            S3 = mN.clone().addScaledVector(S1, -S2),
            S4 =
              Dk(mL).distanceTo(Dk('hand_' + m8)) /
              (Dk(mL).distanceTo(Dk('hand_' + m8)) + Dk(mM).distanceTo(Dk(mL)));
          (Dw.set(mL, mU.clone().lerp(S3, S4)),
            Dw.set(mM, S3),
            Dw.set(
              S0,
              S3.clone().lerp(
                mN,
                Dk(S0).distanceTo(Dk(mM)) / (Dk(S0).distanceTo(Dk(mM)) + Dk(mb).distanceTo(Dk(S0))),
              ),
            ),
            Dw.set(mb, mN));
          continue;
        }
        let my = mC[mX].tip
            .clone()
            .add(Dk(mb).clone().sub(mt[mX]).applyQuaternion(m9).multiplyScalar(mk)),
          mW = Dw.get(mL),
          mq = Dw.get(mb).clone().sub(mW),
          mP = my.clone().sub(mW);
        if (mq.length() < 0.000001 || mP.length() < 0.000001) continue;
        let mY = new D6['Quaternion']().setFromUnitVectors(
            mq.clone().normalize(),
            mP.clone().normalize(),
          ),
          mv = mP.length() / mq.length();
        DX(mL, (S5) =>
          Dw.set(
            S5,
            mW.clone().add(Dw.get(S5).clone().sub(mW).applyQuaternion(mY).multiplyScalar(mv)),
          ),
        );
        let mB = mC[mX].line,
          mG = mD.palm,
          mg = (S5) => Math.abs(ba(D4, S5.x, S5.y, S5.z)) < 0.3;
        if (mB?.length > 1 && mX !== 'thumb') {
          for (let S6 of [mX + '_02_' + m8, mX + '_03_' + m8])
            Dw.has(S6) && mg(Dw.get(S6)) && Dw.set(S6, Kp(mB, Dw.get(S6)));
          let S5 = Dw.get(mL);
          mg(S5) && S5.addScaledVector(mG, mB[0].clone().sub(S5).dot(mG));
        }
      }
    } else DX('hand_' + m8, (S7) => DK(S7, 'hand_' + m8, m9, mk));
    let mH = DT('calf_' + m8, 'foot_' + m8, 'calf_' + m8, 'foot_' + m8),
      me =
        Dw.get('foot_' + m8).distanceTo(Dw.get('calf_' + m8)) /
        Dk('foot_' + m8).distanceTo(Dk('calf_' + m8));
    DX('foot_' + m8, (S7) => DK(S7, 'foot_' + m8, mH, me));
    let mR = DR[m8];
    mR &&
      (Dw.set('ball_' + m8, mR.ball),
      Dw.has('ball_leaf_' + m8) && Dw.set('ball_leaf_' + m8, mR.tip));
  }
  for (let S7 of D5.bones.keys()) {
    if (Dw.has(S7) || /^(root|ik_|socket_)/.test(S7)) continue;
    let S8 = D5.parent.get(S7);
    S8 && Dw.has(S8) && DK(S7, S8, DA, DZ);
  }
  return (Dw.set('root', D9(0, 0, 0)), Dw);
}
function Tu(D3, D4, D5, D6) {
  let D7 = [];
  D3.traverse((D9) => {
    D9.isMesh && D7.push(D9);
  });
  for (let D9 of D7) D9.removeFromParent();
  let D8 = new D6['Group']();
  return (
    (D8.name = '__character__'),
    D5.decompose(D8.position, D8.quaternion, D8.scale),
    D8.add(D4.scene),
    D4.scene.traverse((Dk) => {
      Dk.isMesh && (Dk.frustumCulled = !1);
    }),
    D8.updateMatrixWorld(!0),
    { scene: D3, companion: D8, overlay: null, drive() {}, preview: !0 }
  );
}
function Pu(D3) {
  let D4 = [],
    D5 = (D7) => D3[D7][1],
    D6 = (D7) => D3[D7][0];
  for (let D7 of ['l', 'r']) {
    let D8 = D7 === 'l' ? 'left' : 'right';
    (((D9, Dk, Dw) => {
      let DV = Math.hypot(D6(Dk) - D6(D9), D5(Dk) - D5(D9)),
        DD = Math.hypot(D6(Dw) - D6(Dk), D5(Dw) - D5(Dk)),
        Dm = Math.hypot(D6(Dw) - D6(D9), D5(Dw) - D5(D9));
      return DV + DD < Dm * 1.6;
    })('shoulder_' + D7, 'elbow_' + D7, 'wrist_' + D7) ||
      D4.push('The ' + D8 + ' elbow isn\u2019t between the shoulder and the wrist.'),
      (D5('knee_' + D7) < D5('groin') && D5('knee_' + D7) > D5('ankle_' + D7)) ||
        D4.push('The ' + D8 + ' knee should be between the groin and the ankle.'),
      D5('shoulder_' + D7) > D5('groin') || D4.push('The ' + D8 + ' shoulder is below the groin.'),
      (D7 === 'l' ? 1 : -1) * (D6('shoulder_' + D7) - D6('groin')) <= 0 &&
        D4.push(
          'The ' +
            D8 +
            " shoulder is on the other side of the body \u2014 it's the character's " +
            D8 +
            ', on your ' +
            (D7 === 'l' ? 'right' : 'left') +
            '.',
        ));
  }
  return (
    (D5('chin') > D5('shoulder_l') && D5('chin') > D5('shoulder_r')) ||
      D4.push('The chin should be above the shoulders.'),
    D4
  );
}
function Hp(D3, D4, D5, D6, D7) {
  let D8 = D7[0] - D6[0],
    D9 = D7[1] - D6[1],
    Dk = D7[2] - D6[2],
    Dw = D8 * D8 + D9 * D9 + Dk * Dk || 1e-12,
    DV = ((D3 - D6[0]) * D8 + (D4 - D6[1]) * D9 + (D5 - D6[2]) * Dk) / Dw;
  return ((DV = DV < 0 ? 0 : DV > 1 ? 1 : DV), [D6[0] + DV * D8, D6[1] + DV * D9, D6[2] + DV * Dk]);
}
function Xp(D3, D4) {
  let D5 = D3.length / 3,
    D6 = new Int32Array(D5),
    D7 = new Map(),
    D8 = 0,
    D9 = (Dw) => Math.round(Dw / D4);
  for (let Dw = 0; Dw < D5; Dw++) {
    let DV = D9(D3[3 * Dw]) + ',' + D9(D3[3 * Dw + 1]) + ',' + D9(D3[3 * Dw + 2]),
      DD = D7.get(DV);
    (DD === void 0 && ((DD = D8++), D7.set(DV, DD)), (D6[Dw] = DD));
  }
  let Dk = new Float64Array(3 * D8);
  for (let Dm = 0; Dm < D5; Dm++) Dk.set([D3[3 * Dm], D3[3 * Dm + 1], D3[3 * Dm + 2]], 3 * D6[Dm]);
  return { map: D6, V: Dk, m: D8 };
}
function Jp(D3, D4, D5) {
  let D6 = [1 / 0, 1 / 0, 1 / 0],
    D7 = [-1 / 0, -1 / 0, -1 / 0];
  for (let DV = 0; DV < D3.length; DV += 3)
    for (let DD = 0; DD < 3; DD++)
      ((D6[DD] = Math.min(D6[DD], D3[DV + DD])), (D7[DD] = Math.max(D7[DD], D3[DV + DD])));
  let D8 = Math.max(D7[0] - D6[0], D7[1] - D6[1], D7[2] - D6[2], 0.000001) / D5,
    D9 = [0, 1, 2].map((Dm) => Math.max(1, Math.ceil((D7[Dm] - D6[Dm]) / D8) + 1)),
    Dk = new Map(),
    Dw = (Dm, DS) => Math.min(D9[DS] - 1, Math.max(0, Math.floor((Dm - D6[DS]) / D8)));
  for (let Dm = 0; Dm < D4.length; Dm += 3) {
    let DS = [1 / 0, 1 / 0, 1 / 0],
      DE = [-1 / 0, -1 / 0, -1 / 0];
    for (let DF = 0; DF < 3; DF++)
      for (let DC = 0; DC < 3; DC++) {
        let Dt = D3[3 * D4[Dm + DF] + DC];
        ((DS[DC] = Math.min(DS[DC], Dt)), (DE[DC] = Math.max(DE[DC], Dt)));
      }
    for (let DH = Dw(DS[0], 0); DH <= Dw(DE[0], 0); DH++)
      for (let De = Dw(DS[1], 1); De <= Dw(DE[1], 1); De++)
        for (let DR = Dw(DS[2], 2); DR <= Dw(DE[2], 2); DR++) {
          let DQ = DH + D9[0] * (De + D9[1] * DR),
            Dj = Dk.get(DQ);
          (Dj || Dk.set(DQ, (Dj = [])), Dj.push(Dm));
        }
  }
  return {
    mn: D6,
    h: D8,
    dims: D9,
    cells: Dk,
    V: D3,
    T: D4,
    triStamp: new Int32Array(D4.length / 3),
    cellStamp: new Map(),
    stamp: 0,
  };
}
function Zp(D3, D4, D5) {
  let { mn: D6, h: D7, dims: D8, cells: D9, V: Dk, T: Dw, triStamp: DV, cellStamp: DD } = D3,
    Dm = D5[0] - D4[0],
    DS = D5[1] - D4[1],
    DE = D5[2] - D4[2],
    DF = Math.max(1, Math.ceil((2 * Math.hypot(Dm, DS, DE)) / D7)),
    DC = ++D3.stamp;
  for (let Dt = 0; Dt <= DF; Dt++) {
    let DH = Dt / DF,
      De = Math.floor((D4[0] + DH * Dm - D6[0]) / D7),
      DR = Math.floor((D4[1] + DH * DS - D6[1]) / D7),
      DQ = Math.floor((D4[2] + DH * DE - D6[2]) / D7);
    for (let Dj = -1; Dj <= 1; Dj++)
      for (let Dz = -1; Dz <= 1; Dz++)
        for (let DO = -1; DO <= 1; DO++) {
          let DJ = De + Dj,
            DZ = DR + Dz,
            DU = DQ + DO;
          if (DJ < 0 || DZ < 0 || DU < 0 || DJ >= D8[0] || DZ >= D8[1] || DU >= D8[2]) continue;
          let DK = DJ + D8[0] * (DZ + D8[1] * DU);
          if (DD.get(DK) === DC) continue;
          DD.set(DK, DC);
          let DT = D9.get(DK);
          if (DT) {
            for (let DA of DT)
              if (
                DV[DA / 3] !== DC &&
                ((DV[DA / 3] = DC),
                Qp(D4, Dm, DS, DE, Dk, 3 * Dw[DA], 3 * Dw[DA + 1], 3 * Dw[DA + 2]))
              )
                return !0;
          }
        }
  }
  return !1;
}
function Qp(D3, D4, D5, D6, D7, D8, D9, Dk) {
  let Dw = D7[D9] - D7[D8],
    DV = D7[D9 + 1] - D7[D8 + 1],
    DD = D7[D9 + 2] - D7[D8 + 2],
    Dm = D7[Dk] - D7[D8],
    DS = D7[Dk + 1] - D7[D8 + 1],
    DE = D7[Dk + 2] - D7[D8 + 2],
    DF = D5 * DE - D6 * DS,
    DC = D6 * Dm - D4 * DE,
    Dt = D4 * DS - D5 * Dm,
    DH = Dw * DF + DV * DC + DD * Dt;
  if (Math.abs(DH) < 1e-14) return !1;
  let De = 1 / DH,
    DR = D3[0] - D7[D8],
    DQ = D3[1] - D7[D8 + 1],
    Dj = D3[2] - D7[D8 + 2],
    Dz = (DR * DF + DQ * DC + Dj * Dt) * De;
  if (Dz < 0 || Dz > 1) return !1;
  let DO = DQ * DD - Dj * DV,
    DJ = Dj * Dw - DR * DD,
    DZ = DR * DV - DQ * Dw,
    DU = (D4 * DO + D5 * DJ + D6 * DZ) * De;
  if (DU < 0 || Dz + DU > 1) return !1;
  let DK = (Dm * DO + DS * DJ + DE * DZ) * De;
  return DK > 0.001 && DK < 0.999;
}
function Gi(
  { positions: D3, index: D4, bones: D5 },
  {
    cutoff: D6 = 0.01,
    tol: D7 = 0.001,
    maxIter: D8 = 3000,
    exclude: D9 = null,
    link: Dk = 0,
    linkWeight: Dw = 4,
    onProgress: DV = null,
  } = {},
) {
  let DD = Date.now(),
    Dm = D3.length / 3,
    DS = D5.length,
    { map: DE, V: DF, m: DC } = Xp(D3, 0.00001),
    Dt = [];
  for (let m5 = 0; m5 < D4.length; m5 += 3) {
    if (D9 && (D9[D4[m5]] || D9[D4[m5 + 1]] || D9[D4[m5 + 2]])) continue;
    let m6 = DE[D4[m5]],
      m7 = DE[D4[m5 + 1]],
      m8 = DE[D4[m5 + 2]];
    m6 !== m7 && m7 !== m8 && m6 !== m8 && Dt.push(m6, m7, m8);
  }
  let DH = Uint32Array.from(Dt),
    De = new Uint8Array(DC);
  for (let m9 = 0; m9 < Dm; m9++) D9?.[m9] || (De[DE[m9]] = 1);
  let DR = new Float64Array(DC),
    DQ = new Map(),
    Dj = (mk, mw, mV) => {
      let mD = mk < mw ? mk * DC + mw : mw * DC + mk;
      DQ.set(mD, (DQ.get(mD) ?? 0) + mV);
    };
  for (let mk = 0; mk < DH.length; mk += 3) {
    let mw = [DH[mk], DH[mk + 1], DH[mk + 2]],
      mV = mw.map((mF) => [DF[3 * mF], DF[3 * mF + 1], DF[3 * mF + 2]]),
      mD = (mF, mC) => [mF[0] - mC[0], mF[1] - mC[1], mF[2] - mC[2]],
      mm = (mF, mC) => [
        mF[1] * mC[2] - mF[2] * mC[1],
        mF[2] * mC[0] - mF[0] * mC[2],
        mF[0] * mC[1] - mF[1] * mC[0],
      ],
      mS = (mF, mC) => mF[0] * mC[0] + mF[1] * mC[1] + mF[2] * mC[2],
      mE = Math.hypot(...mm(mD(mV[1], mV[0]), mD(mV[2], mV[0])));
    if (!(mE < 1e-14)) {
      for (let mF = 0; mF < 3; mF++) DR[mw[mF]] += mE / 6;
      for (let mC = 0; mC < 3; mC++) {
        let mt = mD(mV[(mC + 1) % 3], mV[mC]),
          mH = mD(mV[(mC + 2) % 3], mV[mC]);
        Dj(
          mw[(mC + 1) % 3],
          mw[(mC + 2) % 3],
          Math.max(0, (0.5 * mS(mt, mH)) / Math.hypot(...mm(mt, mH))),
        );
      }
    }
  }
  let Dz = 0;
  if (Dk > 0) {
    let me = Int32Array.from({ length: DC }, (mz, mO) => mO),
      mR = (mz) => {
        for (; me[mz] !== mz;) mz = me[mz] = me[me[mz]];
        return mz;
      };
    for (let mz = 0; mz < DH.length; mz += 3)
      ((me[mR(DH[mz])] = mR(DH[mz + 1])), (me[mR(DH[mz + 1])] = mR(DH[mz + 2])));
    let mQ = new Map(),
      mj = (mO, mJ, mZ) =>
        Math.floor(mO / Dk) + ',' + Math.floor(mJ / Dk) + ',' + Math.floor(mZ / Dk);
    for (let mO = 0; mO < DC; mO++)
      if (De[mO] && DR[mO] > 0) {
        let mJ = mj(DF[3 * mO], DF[3 * mO + 1], DF[3 * mO + 2]),
          mZ = mQ.get(mJ);
        (mZ || mQ.set(mJ, (mZ = [])), mZ.push(mO));
      }
    for (let mU = 0; mU < DC; mU++) {
      if (!De[mU] || !(DR[mU] > 0)) continue;
      let mK = DF[3 * mU],
        mT = DF[3 * mU + 1],
        mA = DF[3 * mU + 2],
        mn = Math.floor(mK / Dk),
        mo = Math.floor(mT / Dk),
        mX = Math.floor(mA / Dk),
        mL = mR(mU),
        mb = Dk,
        mx = -1;
      for (let my = -1; my <= 1; my++)
        for (let mW = -1; mW <= 1; mW++)
          for (let mq = -1; mq <= 1; mq++)
            for (let mP of mQ.get(mn + my + ',' + (mo + mW) + ',' + (mX + mq)) ?? []) {
              if (mR(mP) === mL) continue;
              let mY = Math.hypot(mK - DF[3 * mP], mT - DF[3 * mP + 1], mA - DF[3 * mP + 2]);
              mY < mb && ((mb = mY), (mx = mP));
            }
      mx >= 0 && (Dj(mU, mx, Dw), Dz++);
    }
  }
  let DO = new Uint32Array(DC);
  for (let mv of DQ.keys()) (DO[Math.floor(mv / DC)]++, DO[mv % DC]++);
  let DJ = new Uint32Array(DC + 1);
  for (let mB = 0; mB < DC; mB++) DJ[mB + 1] = DJ[mB] + DO[mB];
  let DZ = new Uint32Array(DJ[DC]),
    DU = new Float64Array(DJ[DC]),
    DK = DJ.slice(0, DC),
    DT = new Float64Array(DC);
  for (let [mG, mg] of DQ) {
    let mI = Math.floor(mG / DC),
      mN = mG % DC;
    ((DZ[DK[mI]] = mN),
      (DU[DK[mI]++] = -mg),
      (DZ[DK[mN]] = mI),
      (DU[DK[mN]++] = -mg),
      (DT[mI] += mg),
      (DT[mN] += mg));
  }
  let DA = Date.now(),
    Dn = Jp(DF, DH, 64),
    DX = new Float64Array(3 * DC);
  for (let mM = 0; mM < DH.length; mM += 3) {
    let S0 = 3 * DH[mM],
      S1 = 3 * DH[mM + 1],
      S2 = 3 * DH[mM + 2],
      S3 = DF[S1] - DF[S0],
      S4 = DF[S1 + 1] - DF[S0 + 1],
      S5 = DF[S1 + 2] - DF[S0 + 2],
      S6 = DF[S2] - DF[S0],
      S7 = DF[S2 + 1] - DF[S0 + 1],
      S8 = DF[S2 + 2] - DF[S0 + 2],
      S9 = S4 * S8 - S5 * S7,
      Sk = S5 * S6 - S3 * S8,
      Sw = S3 * S7 - S4 * S6;
    for (let SV of [S0, S1, S2]) ((DX[SV] += S9), (DX[SV + 1] += Sk), (DX[SV + 2] += Sw));
  }
  let DL = new Int32Array(DC).fill(-1),
    Db = new Float64Array(DC),
    Dx = 0,
    Dy = D5.map(() => [0, 0, null]);
  for (let SD = 0; SD < DC; SD++) {
    if (!De[SD]) continue;
    let Sm = DF[3 * SD],
      SS = DF[3 * SD + 1],
      SE = DF[3 * SD + 2],
      SF = Math.hypot(DX[3 * SD], DX[3 * SD + 1], DX[3 * SD + 2]) || 1,
      SC = [
        Sm - (0.0001 * DX[3 * SD]) / SF,
        SS - (0.0001 * DX[3 * SD + 1]) / SF,
        SE - (0.0001 * DX[3 * SD + 2]) / SF,
      ];
    for (let SQ = 0; SQ < DS; SQ++) {
      let Sj = Hp(Sm, SS, SE, D5[SQ].head, D5[SQ].tail);
      ((Dy[SQ][0] = SQ),
        (Dy[SQ][1] = Math.hypot(Sj[0] - Sm, Sj[1] - SS, Sj[2] - SE)),
        (Dy[SQ][2] = Sj));
    }
    let St = Dy.slice().sort((Sz, SO) => Sz[1] - SO[1]),
      SH = -1,
      SR = 0;
    for (let Sz = 0; Sz < Math.min(St.length, 6); Sz++)
      if (!Zp(Dn, SC, St[Sz][2])) {
        ((SH = St[Sz][0]), (SR = St[Sz][1]));
        break;
      }
    (SH < 0 && (Dx++, (SH = St[0][0]), (SR = St[0][1])),
      (DL[SD] = SH),
      (Db[SD] = 1 / Math.max(SR * SR, 1e-8)));
  }
  let DW = Date.now(),
    Dq = new Float64Array(DC);
  for (let SO = 0; SO < DC; SO++) Dq[SO] = DT[SO] + DR[SO] * Db[SO] || 1;
  let DP = (SJ, SZ) => {
      for (let SU = 0; SU < DC; SU++) {
        let SK = Dq[SU] * SJ[SU];
        for (let ST = DJ[SU]; ST < DJ[SU + 1]; ST++) SK += DU[ST] * SJ[DZ[ST]];
        SZ[SU] = SK;
      }
    },
    DY = new Int32Array(4 * DC).fill(-1),
    Dv = new Float32Array(4 * DC),
    DB = (SJ, SZ, SU) => {
      let SK = 3;
      if (!(SU <= Dv[4 * SJ + 3])) {
        for (; SK > 0 && Dv[4 * SJ + SK - 1] < SU;)
          ((Dv[4 * SJ + SK] = Dv[4 * SJ + SK - 1]), (DY[4 * SJ + SK] = DY[4 * SJ + SK - 1]), SK--);
        ((Dv[4 * SJ + SK] = SU), (DY[4 * SJ + SK] = SZ));
      }
    },
    DG = new Float64Array(DC),
    Dg = new Float64Array(DC),
    DI = new Float64Array(DC),
    Dh = new Float64Array(DC),
    DN = new Float64Array(DC),
    DM = new Float64Array(DC),
    m0 = 0,
    m1 = 0;
  for (let SJ = 0; SJ < DS; SJ++) {
    let SZ = !1;
    for (let SA = 0; SA < DC; SA++) {
      let Sn = DL[SA] === SJ;
      ((DM[SA] = Sn ? DR[SA] * Db[SA] : 0), (DN[SA] = Sn ? 1 : 0), (SZ ||= Sn));
    }
    if (!SZ) continue;
    (m1++, DP(DN, Dh));
    let SU = 0,
      SK = 0;
    for (let SX = 0; SX < DC; SX++)
      ((DG[SX] = DM[SX] - Dh[SX]),
        (Dg[SX] = DG[SX] / Dq[SX]),
        (DI[SX] = Dg[SX]),
        (SU += DM[SX] * DM[SX]),
        (SK += DG[SX] * Dg[SX]));
    SU = Math.sqrt(SU);
    let ST = 0;
    for (; ST < D8; ST++) {
      DP(DI, Dh);
      let SL = 0;
      for (let Sq = 0; Sq < DC; Sq++) SL += DI[Sq] * Dh[Sq];
      let Sb = SK / SL,
        Sx = 0;
      for (let SP = 0; SP < DC; SP++)
        ((DN[SP] += Sb * DI[SP]), (DG[SP] -= Sb * Dh[SP]), (Sx += DG[SP] * DG[SP]));
      if (Math.sqrt(Sx) < D7 * SU) break;
      let Sy = 0;
      for (let SY = 0; SY < DC; SY++) ((Dg[SY] = DG[SY] / Dq[SY]), (Sy += DG[SY] * Dg[SY]));
      let SW = Sy / SK;
      SK = Sy;
      for (let Sv = 0; Sv < DC; Sv++) DI[Sv] = Dg[Sv] + SW * DI[Sv];
    }
    m0 += ST;
    for (let SB = 0; SB < DC; SB++) DN[SB] > D6 && DB(SB, SJ, DN[SB]);
    DV?.(SJ + 1, DS);
  }
  let m2 = Date.now(),
    m3 = new Uint16Array(4 * Dm),
    m4 = new Float32Array(4 * Dm);
  for (let SG = 0; SG < Dm; SG++) {
    let Sg = DE[SG];
    if (D9?.[SG]) continue;
    let SI = 0;
    for (let SN = 0; SN < 4; SN++) DY[4 * Sg + SN] >= 0 && (SI += Dv[4 * Sg + SN]);
    if (SI <= 0) {
      ((m3[4 * SG] = Math.max(0, DL[Sg])), (m4[4 * SG] = 1));
      continue;
    }
    for (let SM = 0; SM < 4; SM++)
      DY[4 * Sg + SM] < 0 ||
        ((m3[4 * SG + SM] = DY[4 * Sg + SM]), (m4[4 * SG + SM] = Dv[4 * Sg + SM] / SI));
  }
  return {
    index: m3,
    weight: m4,
    stats: {
      vertices: Dm,
      welded: DC,
      unseen: Dx,
      links: Dz,
      bones: m1,
      iterations: Math.round(m0 / Math.max(1, m1)),
      ms: { surface: DA - DD, visibility: DW - DA, solve: m2 - DW, total: Date.now() - DD },
    },
  };
}
function Fu(D3, D4 = 0.00001) {
  let D5 = D3.length / 3,
    D6 = new Int32Array(D5),
    D7 = new Map(),
    D8 = 0,
    D9 = (Dw) => Math.round(Dw / D4);
  for (let Dw = 0; Dw < D5; Dw++) {
    let DV = D9(D3[3 * Dw]) + ',' + D9(D3[3 * Dw + 1]) + ',' + D9(D3[3 * Dw + 2]),
      DD = D7.get(DV);
    (DD === void 0 && ((DD = D8++), D7.set(DV, DD)), (D6[Dw] = DD));
  }
  let Dk = new Float64Array(3 * D8);
  for (let Dm = 0; Dm < D5; Dm++) Dk.set([D3[3 * Dm], D3[3 * Dm + 1], D3[3 * Dm + 2]], 3 * D6[Dm]);
  return { map: D6, V: Dk, m: D8 };
}
function Nu(D3, D4) {
  let D5 = new Float64Array(D3.length);
  for (let D6 = 0; D6 < D4.length; D6 += 3) {
    let D7 = 3 * D4[D6],
      D8 = 3 * D4[D6 + 1],
      D9 = 3 * D4[D6 + 2],
      Dk = D3[D8] - D3[D7],
      Dw = D3[D8 + 1] - D3[D7 + 1],
      DV = D3[D8 + 2] - D3[D7 + 2],
      DD = D3[D9] - D3[D7],
      Dm = D3[D9 + 1] - D3[D7 + 1],
      DS = D3[D9 + 2] - D3[D7 + 2],
      DE = Dw * DS - DV * Dm,
      DF = DV * DD - Dk * DS,
      DC = Dk * Dm - Dw * DD;
    for (let Dt of [D7, D8, D9]) ((D5[Dt] += DE), (D5[Dt + 1] += DF), (D5[Dt + 2] += DC));
  }
  for (let DH = 0; DH < D5.length; DH += 3) {
    let De = Math.hypot(D5[DH], D5[DH + 1], D5[DH + 2]) || 1;
    ((D5[DH] /= De), (D5[DH + 1] /= De), (D5[DH + 2] /= De));
  }
  return D5;
}
function eh(D3, D4, D5) {
  let D6 = new Map(),
    D7 = (D8, D9, Dk) => D8 + ',' + D9 + ',' + Dk;
  for (let D8 = 0; D8 < D4.length; D8 += 3) {
    let D9 = [1 / 0, 1 / 0, 1 / 0],
      Dk = [-1 / 0, -1 / 0, -1 / 0];
    for (let Dw = 0; Dw < 3; Dw++)
      for (let DV = 0; DV < 3; DV++) {
        let DD = D3[3 * D4[D8 + Dw] + DV];
        ((D9[DV] = Math.min(D9[DV], DD)), (Dk[DV] = Math.max(Dk[DV], DD)));
      }
    for (let Dm = Math.floor(D9[0] / D5); Dm <= Math.floor(Dk[0] / D5); Dm++)
      for (let DS = Math.floor(D9[1] / D5); DS <= Math.floor(Dk[1] / D5); DS++)
        for (let DE = Math.floor(D9[2] / D5); DE <= Math.floor(Dk[2] / D5); DE++) {
          let DF = D7(Dm, DS, DE),
            DC = D6.get(DF);
          (DC || D6.set(DF, (DC = [])), DC.push(D8));
        }
  }
  return { cells: D6, cell: D5, key: D7 };
}
function th(D3, D4, D5, D6) {
  let D7 = [D5[0] - D4[0], D5[1] - D4[1], D5[2] - D4[2]],
    D8 = [D6[0] - D4[0], D6[1] - D4[1], D6[2] - D4[2]],
    D9 = [D3[0] - D4[0], D3[1] - D4[1], D3[2] - D4[2]],
    Dk = (Dz, DO) => Dz[0] * DO[0] + Dz[1] * DO[1] + Dz[2] * DO[2],
    Dw = Dk(D7, D9),
    DV = Dk(D8, D9);
  if (Dw <= 0 && DV <= 0) return [1, 0, 0];
  let DD = [D3[0] - D5[0], D3[1] - D5[1], D3[2] - D5[2]],
    Dm = Dk(D7, DD),
    DS = Dk(D8, DD);
  if (Dm >= 0 && DS <= Dm) return [0, 1, 0];
  let DE = Dw * DS - Dm * DV;
  if (DE <= 0 && Dw >= 0 && Dm <= 0) {
    let Dz = Dw / (Dw - Dm);
    return [1 - Dz, Dz, 0];
  }
  let DF = [D3[0] - D6[0], D3[1] - D6[1], D3[2] - D6[2]],
    DC = Dk(D7, DF),
    Dt = Dk(D8, DF);
  if (Dt >= 0 && DC <= Dt) return [0, 0, 1];
  let DH = DC * DV - Dw * Dt;
  if (DH <= 0 && DV >= 0 && Dt <= 0) {
    let DO = DV / (DV - Dt);
    return [1 - DO, 0, DO];
  }
  let De = Dm * Dt - DC * DS;
  if (De <= 0 && DS - Dm >= 0 && DC - Dt >= 0) {
    let DJ = (DS - Dm) / (DS - Dm + (DC - Dt));
    return [0, 1 - DJ, DJ];
  }
  let DR = 1 / (De + DH + DE),
    DQ = DH * DR,
    Dj = DE * DR;
  return [1 - DQ - Dj, DQ, Dj];
}
function nh(D3, D4, D5, D6, D7, D8) {
  let D9 = [D7[0] - D6[0], D7[1] - D6[1], D7[2] - D6[2]],
    Dk = [D8[0] - D6[0], D8[1] - D6[1], D8[2] - D6[2]],
    Dw = [
      D4[1] * Dk[2] - D4[2] * Dk[1],
      D4[2] * Dk[0] - D4[0] * Dk[2],
      D4[0] * Dk[1] - D4[1] * Dk[0],
    ],
    DV = D9[0] * Dw[0] + D9[1] * Dw[1] + D9[2] * Dw[2];
  if (Math.abs(DV) < 1e-14) return null;
  let DD = 1 / DV,
    Dm = [D3[0] - D6[0], D3[1] - D6[1], D3[2] - D6[2]],
    DS = (Dm[0] * Dw[0] + Dm[1] * Dw[1] + Dm[2] * Dw[2]) * DD;
  if (DS < 0 || DS > 1) return null;
  let DE = [
      Dm[1] * D9[2] - Dm[2] * D9[1],
      Dm[2] * D9[0] - Dm[0] * D9[2],
      Dm[0] * D9[1] - Dm[1] * D9[0],
    ],
    DF = (D4[0] * DE[0] + D4[1] * DE[1] + D4[2] * DE[2]) * DD;
  if (DF < 0 || DS + DF > 1) return null;
  let DC = (Dk[0] * DE[0] + Dk[1] * DE[1] + Dk[2] * DE[2]) * DD;
  return Math.abs(DC) <= D5 ? [DC, [1 - DS - DF, DS, DF]] : null;
}
function Bu(
  D3,
  D4,
  D5,
  {
    maxDistance: D6,
    maxAngle: D7 = 35,
    link: D8 = 0,
    cutoff: D9 = 0.01,
    tol: Dk = 0.000001,
    maxIter: Dw = 4000,
  } = {},
) {
  let DV = Date.now(),
    DD = D3.positions,
    Dm = D3.index,
    DS = D3.skinIndex,
    DE = D3.skinWeight,
    DF = D4.positions.length / 3,
    { map: DC, V: Dt, m: DH } = Fu(D4.positions),
    De = [];
  for (let m5 = 0; m5 < D4.index.length; m5 += 3) {
    let m6 = DC[D4.index[m5]],
      m7 = DC[D4.index[m5 + 1]],
      m8 = DC[D4.index[m5 + 2]];
    m6 !== m7 && m7 !== m8 && m6 !== m8 && De.push(m6, m7, m8);
  }
  let DR = Uint32Array.from(De),
    DQ = Nu(Dt, DR),
    Dj = eh(DD, Dm, D6),
    Dz = (m9, mk) => [DD[3 * Dm[m9 + mk]], DD[3 * Dm[m9 + mk] + 1], DD[3 * Dm[m9 + mk] + 2]],
    DO = Fu(DD),
    DJ = new Uint32Array(Dm.length);
  for (let m9 = 0; m9 < Dm.length; m9++) DJ[m9] = DO.map[Dm[m9]];
  let DZ = Nu(DO.V, DJ),
    DU = (mk, mw) => {
      let mV = [0, 0, 0];
      for (let mm = 0; mm < 3; mm++) {
        let mS = 3 * DO.map[Dm[mk + mm]];
        for (let mE = 0; mE < 3; mE++) mV[mE] += mw[mm] * DZ[mS + mE];
      }
      let mD = Math.hypot(...mV) || 1;
      return [mV[0] / mD, mV[1] / mD, mV[2] / mD];
    },
    DK = Math.cos((D7 * Math.PI) / 180),
    DT = D3.labels,
    DA = D4.labels ? new Int32Array(DH).fill(-1) : null;
  if (DA) {
    for (let mk = DF - 1; mk >= 0; mk--) DA[DC[mk]] = D4.labels[mk];
  }
  let Dn = new Float64Array(DH * D5),
    DX = new Uint8Array(DH),
    DL = new Int32Array(Dm.length / 3).fill(-1);
  for (let mw = 0; mw < DH; mw++) {
    let mV = [Dt[3 * mw], Dt[3 * mw + 1], Dt[3 * mw + 2]],
      mD = [DQ[3 * mw], DQ[3 * mw + 1], DQ[3 * mw + 2]],
      mm = [Math.floor(mV[0] / Dj.cell), Math.floor(mV[1] / Dj.cell), Math.floor(mV[2] / Dj.cell)],
      mS = null;
    for (let mF = -1; mF <= 1; mF++)
      for (let mC = -1; mC <= 1; mC++)
        for (let mt = -1; mt <= 1; mt++)
          for (let mH of Dj.cells.get(Dj.key(mm[0] + mF, mm[1] + mC, mm[2] + mt)) ?? []) {
            if (
              DL[mH / 3] === mw ||
              ((DL[mH / 3] = mw),
              DA && DT && DA[mw] >= 0 && DT[Dm[mH]] >= 0 && DT[Dm[mH]] !== DA[mw])
            )
              continue;
            let me = Dz(mH, 0),
              mR = Dz(mH, 1),
              mQ = Dz(mH, 2),
              mj = nh(mV, mD, D6, me, mR, mQ),
              mz,
              mO,
              mJ = !1;
            if (mj) ((mz = mj[1]), (mO = Math.abs(mj[0])), (mJ = !0));
            else {
              mz = th(mV, me, mR, mQ);
              let mU = [0, 1, 2].map((mK) => mz[0] * me[mK] + mz[1] * mR[mK] + mz[2] * mQ[mK]);
              mO = Math.hypot(mU[0] - mV[0], mU[1] - mV[1], mU[2] - mV[2]);
            }
            if (mO > D6) continue;
            let mZ = (mJ ? 0 : D6) + mO;
            (!mS || mZ < mS.rank) && (mS = { rank: mZ, t: mH, bary: mz });
          }
    if (!mS) continue;
    let mE = DU(mS.t, mS.bary);
    if (!(Math.abs(mE[0] * mD[0] + mE[1] * mD[1] + mE[2] * mD[2]) < DK)) {
      for (let mK = 0; mK < 3; mK++) {
        let mT = Dm[mS.t + mK],
          mA = mS.bary[mK];
        for (let mn = 0; mn < 4; mn++) {
          let mo = DE[4 * mT + mn];
          mo > 0 && (Dn[mw * D5 + DS[4 * mT + mn]] += mA * mo);
        }
      }
      DX[mw] = 1;
    }
  }
  let Db = Date.now(),
    Dx = new Map(),
    Dy = (mX, mL, mb) => {
      let mx = mX < mL ? mX * DH + mL : mL * DH + mX;
      Dx.set(mx, (Dx.get(mx) ?? 0) + mb);
    };
  for (let mX = 0; mX < DR.length; mX += 3) {
    let mL = [DR[mX], DR[mX + 1], DR[mX + 2]];
    for (let mb = 0; mb < 3; mb++) {
      let mx = mL[mb],
        my = mL[(mb + 1) % 3],
        mW = mL[(mb + 2) % 3],
        mq = [
          Dt[3 * my] - Dt[3 * mx],
          Dt[3 * my + 1] - Dt[3 * mx + 1],
          Dt[3 * my + 2] - Dt[3 * mx + 2],
        ],
        mP = [
          Dt[3 * mW] - Dt[3 * mx],
          Dt[3 * mW + 1] - Dt[3 * mx + 1],
          Dt[3 * mW + 2] - Dt[3 * mx + 2],
        ],
        mY = Math.hypot(
          mq[1] * mP[2] - mq[2] * mP[1],
          mq[2] * mP[0] - mq[0] * mP[2],
          mq[0] * mP[1] - mq[1] * mP[0],
        );
      Dy(
        my,
        mW,
        mY > 1e-14
          ? Math.max(0.001, (0.5 * (mq[0] * mP[0] + mq[1] * mP[1] + mq[2] * mP[2])) / mY)
          : 0.001,
      );
    }
  }
  let DW = Int32Array.from({ length: DH }, (mv, mB) => mB),
    Dq = (mv) => {
      for (; DW[mv] !== mv;) mv = DW[mv] = DW[DW[mv]];
      return mv;
    };
  for (let mv = 0; mv < DR.length; mv += 3)
    ((DW[Dq(DR[mv])] = Dq(DR[mv + 1])), (DW[Dq(DR[mv + 1])] = Dq(DR[mv + 2])));
  if (D8 > 0) {
    let mB = new Map(),
      mG = (mI, mN, mM) =>
        Math.floor(mI / D8) + ',' + Math.floor(mN / D8) + ',' + Math.floor(mM / D8);
    for (let mI = 0; mI < DH; mI++) {
      let mN = mG(Dt[3 * mI], Dt[3 * mI + 1], Dt[3 * mI + 2]),
        mM = mB.get(mN);
      (mM || mB.set(mN, (mM = [])), mM.push(mI));
    }
    let mg = Int32Array.from({ length: DH }, (S0, S1) => Dq(S1));
    for (let S0 = 0; S0 < DH; S0++) {
      let S1 = Dt[3 * S0],
        S2 = Dt[3 * S0 + 1],
        S3 = Dt[3 * S0 + 2],
        S4 = Math.floor(S1 / D8),
        S5 = Math.floor(S2 / D8),
        S6 = Math.floor(S3 / D8),
        S7 = D8,
        S8 = -1;
      for (let S9 = -1; S9 <= 1; S9++)
        for (let Sk = -1; Sk <= 1; Sk++)
          for (let Sw = -1; Sw <= 1; Sw++)
            for (let SV of mB.get(S4 + S9 + ',' + (S5 + Sk) + ',' + (S6 + Sw)) ?? []) {
              if (mg[SV] === mg[S0]) continue;
              let SD = Math.hypot(S1 - Dt[3 * SV], S2 - Dt[3 * SV + 1], S3 - Dt[3 * SV + 2]);
              SD < S7 && ((S7 = SD), (S8 = SV));
            }
      S8 >= 0 && (Dy(S0, S8, 1), (DW[Dq(S0)] = Dq(S8)));
    }
  }
  let DP = new Set();
  for (let Sm = 0; Sm < DH; Sm++) DX[Sm] && DP.add(Dq(Sm));
  let DY = new Uint8Array(DH),
    Dv = 0,
    DB = 0;
  for (let SS = 0; SS < DH; SS++) DX[SS] || (DP.has(Dq(SS)) ? ((DY[SS] = 1), DB++) : Dv++);
  let DG = [],
    Dg = new Int32Array(DH).fill(-1);
  for (let SE = 0; SE < DH; SE++) DY[SE] && ((Dg[SE] = DG.length), DG.push(SE));
  let DI = DG.length,
    Dh = 0;
  if (DI) {
    let SF = Array.from({ length: DI }, () => []),
      SC = new Float64Array(DI);
    for (let [SZ, SU] of Dx) {
      let SK = Math.floor(SZ / DH),
        ST = SZ % DH;
      (DY[SK] && ((SC[Dg[SK]] += SU), SF[Dg[SK]].push([ST, SU])),
        DY[ST] && ((SC[Dg[ST]] += SU), SF[Dg[ST]].push([SK, SU])));
    }
    let St = [];
    for (let SA = 0; SA < D5; SA++)
      for (let Sn = 0; Sn < DH; Sn++)
        if (DX[Sn] && Dn[Sn * D5 + SA] > 0) {
          St.push(SA);
          break;
        }
    let SH = new Float64Array(DI),
      SR = new Float64Array(DI),
      SQ = new Float64Array(DI),
      Sj = new Float64Array(DI),
      Sz = new Float64Array(DI),
      SO = new Float64Array(DI),
      SJ = (SX, SL) => {
        for (let Sb = 0; Sb < DI; Sb++) {
          let Sx = SC[Sb] * SX[Sb];
          for (let [Sy, SW] of SF[Sb]) DY[Sy] && (Sx -= SW * SX[Dg[Sy]]);
          SL[Sb] = Sx;
        }
      };
    for (let SX of St) {
      let SL = 0;
      for (let Sy = 0; Sy < DI; Sy++) {
        let SW = 0;
        for (let [Sq, SP] of SF[Sy]) DY[Sq] || (SW += SP * Dn[Sq * D5 + SX]);
        ((SO[Sy] = SW), (SL += SW * SW), (SH[Sy] = 0));
      }
      if (SL === 0) continue;
      ((SL = Math.sqrt(SL)), SJ(SH, Sz));
      let Sb = 0;
      for (let SY = 0; SY < DI; SY++)
        ((SR[SY] = SO[SY] - Sz[SY]),
          (SQ[SY] = SR[SY] / SC[SY]),
          (Sj[SY] = SQ[SY]),
          (Sb += SR[SY] * SQ[SY]));
      let Sx = 0;
      for (; Sx < Dw; Sx++) {
        SJ(Sj, Sz);
        let Sv = 0;
        for (let SN = 0; SN < DI; SN++) Sv += Sj[SN] * Sz[SN];
        let SB = Sb / Sv,
          SG = 0;
        for (let SM = 0; SM < DI; SM++)
          ((SH[SM] += SB * Sj[SM]), (SR[SM] -= SB * Sz[SM]), (SG += SR[SM] * SR[SM]));
        if (Math.sqrt(SG) < Dk * SL) break;
        let Sg = 0;
        for (let r0 = 0; r0 < DI; r0++) ((SQ[r0] = SR[r0] / SC[r0]), (Sg += SR[r0] * SQ[r0]));
        let SI = Sg / Sb;
        Sb = Sg;
        for (let r1 = 0; r1 < DI; r1++) Sj[r1] = SQ[r1] + SI * Sj[r1];
      }
      Dh += Sx;
      for (let r2 = 0; r2 < DI; r2++) Dn[DG[r2] * D5 + SX] = Math.max(0, SH[r2]);
    }
  }
  let DN = Date.now(),
    DM = new Uint16Array(4 * DF),
    m0 = new Float32Array(4 * DF),
    m1 = new Uint8Array(DF),
    m2 = new Uint8Array(DF),
    m3 = new Array(4);
  for (let r3 = 0; r3 < DF; r3++) {
    let r4 = DC[r3];
    if (((m1[r3] = DX[r4]), !DX[r4] && !DY[r4])) {
      m2[r3] = 1;
      continue;
    }
    for (let r6 = 0; r6 < 4; r6++) m3[r6] = [0, 0];
    for (let r7 = 0; r7 < D5; r7++) {
      let r8 = Dn[r4 * D5 + r7];
      if (r8 <= m3[3][1]) continue;
      let r9 = 3;
      for (; r9 > 0 && m3[r9 - 1][1] < r8;) ((m3[r9] = m3[r9 - 1]), r9--);
      m3[r9] = [r7, r8];
    }
    let r5 = 0;
    for (let rk = 0; rk < 4; rk++) m3[rk][1] >= D9 && (r5 += m3[rk][1]);
    if (r5 <= 0) {
      m2[r3] = 1;
      continue;
    }
    for (let rw = 0; rw < 4; rw++)
      m3[rw][1] < D9 || ((DM[4 * r3 + rw] = m3[rw][0]), (m0[4 * r3 + rw] = m3[rw][1] / r5));
  }
  let m4 = 0;
  for (let rV = 0; rV < DH; rV++) m4 += DX[rV];
  return {
    index: DM,
    weight: m0,
    trusted: m1,
    unfilled: m2,
    stats: {
      vertices: DF,
      welded: DH,
      trusted: m4,
      filled: DB,
      unfilled: Dv,
      iterations: Dh,
      ms: { match: Db - DV, fill: DN - Db, total: Date.now() - DV },
    },
  };
}
function ju(D3, D4, { skip: D5 = null, res: D6 = 64 } = {}) {
  let D7 = [1 / 0, 1 / 0, 1 / 0],
    D8 = [-1 / 0, -1 / 0, -1 / 0];
  for (let DD = 0; DD < D3.length; DD += 3)
    for (let Dm = 0; Dm < 3; Dm++)
      ((D7[Dm] = Math.min(D7[Dm], D3[DD + Dm])), (D8[Dm] = Math.max(D8[Dm], D3[DD + Dm])));
  let D9 = Math.max(D8[0] - D7[0], D8[1] - D7[1], D8[2] - D7[2], 0.000001) / D6,
    Dk = [0, 1, 2].map((DS) => Math.max(1, Math.ceil((D8[DS] - D7[DS]) / D9) + 1)),
    Dw = new Map(),
    DV = (DS, DE) => Math.min(Dk[DE] - 1, Math.max(0, Math.floor((DS - D7[DE]) / D9)));
  for (let DS = 0; DS < D4.length; DS += 3) {
    if (D5 && (D5[D4[DS]] || D5[D4[DS + 1]] || D5[D4[DS + 2]])) continue;
    let DE = [1 / 0, 1 / 0, 1 / 0],
      DF = [-1 / 0, -1 / 0, -1 / 0];
    for (let DC = 0; DC < 3; DC++)
      for (let Dt = 0; Dt < 3; Dt++) {
        let DH = D3[3 * D4[DS + DC] + Dt];
        ((DE[Dt] = Math.min(DE[Dt], DH)), (DF[Dt] = Math.max(DF[Dt], DH)));
      }
    for (let De = DV(DE[0], 0); De <= DV(DF[0], 0); De++)
      for (let DR = DV(DE[1], 1); DR <= DV(DF[1], 1); DR++)
        for (let DQ = DV(DE[2], 2); DQ <= DV(DF[2], 2); DQ++) {
          let Dj = De + Dk[0] * (DR + Dk[1] * DQ),
            Dz = Dw.get(Dj);
          (Dz || Dw.set(Dj, (Dz = [])), Dz.push(DS));
        }
  }
  return { mn: D7, h: D9, dims: Dk, cells: Dw, P: D3, T: D4 };
}
function oh(D3, D4, D5, D6) {
  return Ru(D3, D4, D5, D6, !0)[0] ?? 1 / 0;
}
function sh(D3, D4, D5, D6, { gap: D7 = 0.35, min: D8 = 0.01 } = {}) {
  let D9 = Ru(D3, D4, D5, D6, !1);
  if (!D9.length) return 1 / 0;
  let Dk = D9[0],
    Dw = D7 * D9[0] + D8;
  for (let DV = 1; DV < D9.length && !(D9[DV] - Dk > Dw); DV++) Dk = D9[DV];
  return Dk;
}
function Ru(D3, D4, D5, D6, D7) {
  let { mn: D8, h: D9, dims: Dk, cells: Dw, P: DV, T: DD } = D3,
    Dm = Math.floor((D4[0] - D8[0]) / D9),
    DS = Math.floor((D4[1] - D8[1]) / D9),
    DE = Math.floor((D4[2] - D8[2]) / D9),
    DF = [Math.sign(D5[0]) || 1, Math.sign(D5[1]) || 1, Math.sign(D5[2]) || 1],
    DC = (Dz) => {
      let DO = [Dm, DS, DE][Dz] + (DF[Dz] > 0 ? 1 : 0);
      return Math.abs(D5[Dz]) < 1e-12 ? 1 / 0 : (D8[Dz] + DO * D9 - D4[Dz]) / D5[Dz];
    },
    Dt = [DC(0), DC(1), DC(2)],
    DH = [0, 1, 2].map((Dz) => (Math.abs(D5[Dz]) < 1e-12 ? 1 / 0 : D9 / Math.abs(D5[Dz]))),
    De = 1 / 0,
    DR = 0,
    DQ = new Set(),
    Dj = [];
  for (; DR <= D6 && (!D7 || DR < De);) {
    if (Dm >= 0 && DS >= 0 && DE >= 0 && Dm < Dk[0] && DS < Dk[1] && DE < Dk[2]) {
      let DO = Dw.get(Dm + Dk[0] * (DS + Dk[1] * DE));
      if (DO)
        for (let DJ of DO) {
          if (DQ.has(DJ)) continue;
          DQ.add(DJ);
          let DZ = ih(D4, D5, DV, 3 * DD[DJ], 3 * DD[DJ + 1], 3 * DD[DJ + 2]);
          DZ > 0.00001 && DZ <= D6 && (Dj.push(DZ), DZ < De && (De = DZ));
        }
    } else {
      if (
        (Dm < 0 && DF[0] < 0) ||
        (DS < 0 && DF[1] < 0) ||
        (DE < 0 && DF[2] < 0) ||
        (Dm >= Dk[0] && DF[0] > 0) ||
        (DS >= Dk[1] && DF[1] > 0) ||
        (DE >= Dk[2] && DF[2] > 0)
      )
        break;
    }
    let Dz = Dt[0] < Dt[1] ? (Dt[0] < Dt[2] ? 0 : 2) : Dt[1] < Dt[2] ? 1 : 2;
    ((DR = Dt[Dz]),
      (Dt[Dz] += DH[Dz]),
      Dz === 0 ? (Dm += DF[0]) : Dz === 1 ? (DS += DF[1]) : (DE += DF[2]));
  }
  return Dj.sort((DU, DK) => DU - DK);
}
function ih(D3, D4, D5, D6, D7, D8) {
  let D9 = D5[D7] - D5[D6],
    Dk = D5[D7 + 1] - D5[D6 + 1],
    Dw = D5[D7 + 2] - D5[D6 + 2],
    DV = D5[D8] - D5[D6],
    DD = D5[D8 + 1] - D5[D6 + 1],
    Dm = D5[D8 + 2] - D5[D6 + 2],
    DS = D4[1] * Dm - D4[2] * DD,
    DE = D4[2] * DV - D4[0] * Dm,
    DF = D4[0] * DD - D4[1] * DV,
    DC = D9 * DS + Dk * DE + Dw * DF;
  if (Math.abs(DC) < 1e-14) return -1;
  let Dt = 1 / DC,
    DH = D3[0] - D5[D6],
    De = D3[1] - D5[D6 + 1],
    DR = D3[2] - D5[D6 + 2],
    DQ = (DH * DS + De * DE + DR * DF) * Dt;
  if (DQ < 0 || DQ > 1) return -1;
  let Dj = De * Dw - DR * Dk,
    Dz = DR * D9 - DH * Dw,
    DO = DH * Dk - De * D9,
    DJ = (D4[0] * Dj + D4[1] * Dz + D4[2] * DO) * Dt;
  return DJ < 0 || DQ + DJ > 1 ? -1 : (DV * Dj + DD * Dz + Dm * DO) * Dt;
}
function Du(
  D3,
  D4,
  {
    stations: D5 = 6,
    rays: D6 = 12,
    lo: D7 = 0.15,
    hi: D8 = 0.85,
    far: D9 = 0.6,
    layers: Dk = !0,
  } = {},
) {
  let Dw = [D4.tail[0] - D4.head[0], D4.tail[1] - D4.head[1], D4.tail[2] - D4.head[2]],
    DV = Math.hypot(...Dw) || 1e-9,
    DD = Dw.map((Dt) => Dt / DV),
    Dm = Math.abs(DD[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0],
    DS = [
      DD[1] * Dm[2] - DD[2] * Dm[1],
      DD[2] * Dm[0] - DD[0] * Dm[2],
      DD[0] * Dm[1] - DD[1] * Dm[0],
    ],
    DE = Math.hypot(...DS);
  DS = DS.map((Dt) => Dt / DE);
  let DF = [
      DD[1] * DS[2] - DD[2] * DS[1],
      DD[2] * DS[0] - DD[0] * DS[2],
      DD[0] * DS[1] - DD[1] * DS[0],
    ],
    DC = [];
  for (let Dt = 0; Dt < D5; Dt++) {
    let DH = D5 === 1 ? (D7 + D8) / 2 : D7 + ((D8 - D7) * Dt) / (D5 - 1),
      De = [D4.head[0] + DH * Dw[0], D4.head[1] + DH * Dw[1], D4.head[2] + DH * Dw[2]],
      DR = [];
    for (let DQ = 0; DQ < D6; DQ++) {
      let Dj = (2 * Math.PI * DQ) / D6,
        Dz = Math.cos(Dj),
        DO = Math.sin(Dj),
        DJ = [Dz * DS[0] + DO * DF[0], Dz * DS[1] + DO * DF[1], Dz * DS[2] + DO * DF[2]],
        DZ = Dk ? sh(D3, De, DJ, D9) : oh(D3, De, DJ, D9);
      Number.isFinite(DZ) && DR.push(DZ);
    }
    DR.length * 2 < D6 || (DR.sort((DU, DK) => DU - DK), DC.push([DH, DR[DR.length >> 1]]));
  }
  return DC;
}
var ls = (D3) => (D3 <= 0 ? 0 : D3 >= 1 ? 1 : D3 * D3 * (3 - 2 * D3));
function Fs(D3, D4) {
  let D5 = [D4.tail[0] - D4.head[0], D4.tail[1] - D4.head[1], D4.tail[2] - D4.head[2]],
    D6 = D5[0] * D5[0] + D5[1] * D5[1] + D5[2] * D5[2] || 1e-12,
    D7 =
      ((D3[0] - D4.head[0]) * D5[0] + (D3[1] - D4.head[1]) * D5[1] + (D3[2] - D4.head[2]) * D5[2]) /
      D6,
    D8 = [
      D4.head[0] + D7 * D5[0] - D3[0],
      D4.head[1] + D7 * D5[1] - D3[1],
      D4.head[2] + D7 * D5[2] - D3[2],
    ];
  return [D7, Math.hypot(...D8), Math.sqrt(D6)];
}
function qu(D3, { hip: D4 = 0, lat: D5 = !1 } = {}) {
  let D6 = [],
    D7 = [],
    D8 = (D9) => D3.findIndex((Dk) => Dk.name === D9);
  for (let D9 of ['l', 'r']) {
    let Dk = D3[D8('thigh_' + D9)],
      Dw = D8('pelvis');
    D4 > 0 &&
      Dk &&
      Dw >= 0 &&
      (D6.push({
        name: 'hip_' + D9,
        head: Dk.head.slice(),
        tail: Dk.head.map((DH, De) => DH + (DH - Dk.tail[De]) * D4),
      }),
      D7.push(Dw));
    let DV = D3[D8('upperarm_' + D9)],
      DD = D3[D8('spine_03')],
      {
        down: Dm = 0.3,
        inset: DS = 0.25,
        to: DE = 'spine_02',
        owner: DF = 'spine_03',
      } = D5 === !0 ? {} : D5 || {},
      DC = D3[D8(DE)],
      Dt = D8(DF);
    if (D5 && DV && DD && DC && Dt >= 0) {
      let DH = DV.head,
        De = Math.hypot(DV.tail[0] - DH[0], DV.tail[1] - DH[1], DV.tail[2] - DH[2]),
        DR = DH[0] - (DH[0] - DD.head[0]) * DS,
        DQ = (DH[2] + DD.head[2]) / 2,
        Dj = [DR, DH[1] - Dm * De, DQ],
        Dz = [DR, DC.head[1], DQ];
      Dj[1] > Dz[1] + 0.01 && (D6.push({ name: 'lat_' + D9, head: Dj, tail: Dz }), D7.push(Dt));
    }
  }
  return { segs: [...D3, ...D6], owner: D7 };
}
function zu({ index: D3, weight: D4 }, D5, D6) {
  if (!D6.length) return;
  let D7 = new Map();
  for (let D8 = 0; D8 < D3.length / 4; D8++) {
    let D9 = !1;
    for (let Dk = 0; Dk < 4; Dk++) D4[4 * D8 + Dk] > 0 && D3[4 * D8 + Dk] >= D5 && (D9 = !0);
    if (D9) {
      D7.clear();
      for (let Dw = 0; Dw < 4; Dw++) {
        if (!(D4[4 * D8 + Dw] > 0)) continue;
        let DV = D3[4 * D8 + Dw] >= D5 ? D6[D3[4 * D8 + Dw] - D5] : D3[4 * D8 + Dw];
        D7.set(DV, (D7.get(DV) ?? 0) + D4[4 * D8 + Dw]);
      }
      Ns(D3, D4, D8, D7);
    }
  }
}
function Ku({ index: D3, weight: D4 }, D5, D6, D7, D8 = null, D9 = 3) {
  let Dk = D5.length / 3,
    Dw = ah(D5, D6),
    DV = new Map(),
    DD = (DF, DC, Dt) =>
      Math.floor(DF / D7) + ',' + Math.floor(DC / D7) + ',' + Math.floor(Dt / D7);
  for (let DF = 0; DF < Dk; DF++) {
    if (D8?.[DF]) continue;
    let DC = DD(D5[3 * DF], D5[3 * DF + 1], D5[3 * DF + 2]),
      Dt = DV.get(DC);
    (Dt || DV.set(DC, (Dt = [])), Dt.push(DF));
  }
  let Dm = [];
  for (let DH = 0; DH < Dk; DH++) {
    if (D8?.[DH]) continue;
    let De = D5[3 * DH],
      DR = D5[3 * DH + 1],
      DQ = D5[3 * DH + 2],
      Dj = Math.floor(De / D7),
      Dz = Math.floor(DR / D7),
      DO = Math.floor(DQ / D7),
      DJ = [];
    for (let DZ = -1; DZ <= 1; DZ++)
      for (let DU = -1; DU <= 1; DU++)
        for (let DK = -1; DK <= 1; DK++)
          for (let DT of DV.get(Dj + DZ + ',' + (Dz + DU) + ',' + (DO + DK)) ?? [])
            Dw[DT] !== Dw[DH] &&
              Math.hypot(D5[3 * DT] - De, D5[3 * DT + 1] - DR, D5[3 * DT + 2] - DQ) <= D7 &&
              DJ.push(DT);
    DJ.length && Dm.push([DH, DJ]);
  }
  let DS = new Map(),
    DE = new Map();
  for (let DA = 0; DA < D9; DA++) {
    let Dn = [];
    for (let [DX, DL] of Dm) {
      ks(D3, D4, DX, DS);
      for (let Db of DL)
        for (let [Dx, Dy] of ks(D3, D4, Db, DE)) DS.set(Dx, (DS.get(Dx) ?? 0) + Dy);
      Dn.push([DX, new Map(DS)]);
    }
    for (let [DW, Dq] of Dn) Ns(D3, D4, DW, Dq);
  }
  return Dm.length;
}
function Uu(D3, { positions: D4, index: D5, segs: D6, pieces: D7 = [], skip: D8 = null }, D9 = {}) {
  let { index: Dk, weight: Dw } = D3,
    {
      thigh: DV = 0.55,
      theta: DD = 1,
      behind: Dm = 0.7,
      shoulder: DS = 1,
      len: DE = 0.15,
      anchor: DF = 0.006,
    } = D9,
    DC = (mV) => D6.findIndex((mD) => mD.name === mV),
    Dt = DC('pelvis'),
    DH = DC('thigh_l'),
    De = DC('thigh_r'),
    DR = DC('calf_l'),
    DQ = DC('calf_r'),
    Dj = D7.map((mV) => Array.from(mV).filter((mD) => !D8?.[mD])).filter((mV) => mV.length);
  if (!Dj.length || [Dt, DH, De, DR, DQ].some((mV) => mV < 0)) return { cloth: 0 };
  let Dz = D4.length / 3,
    DO = new Map(),
    DJ = (mV) => [D4[3 * mV], D4[3 * mV + 1], D4[3 * mV + 2]],
    DZ = D6[DH].head,
    DU = D6[De].head,
    DK = (DZ[1] + DU[1]) / 2,
    DT = (D6[DR].head[1] + D6[DQ].head[1]) / 2,
    DA = Math.max(0.001, DK - DT),
    Dn = (DZ[2] + DU[2]) / 2,
    DX = DC('upperarm_l') >= 0 ? D6[DC('upperarm_l')].head[1] : DK + DA,
    DL = new Uint8Array(Dz);
  for (let mV of Dj) for (let mD of mV) DL[mD] = 1;
  let Db = (mm, mS, mE) => {
      let mF = D6[mm].head,
        mC = D6[mS].head,
        mt = D6[mS].tail,
        mH = (me, mR, mQ) => [me[0] + mQ * (mR[0] - me[0]), me[2] + mQ * (mR[2] - me[2])];
      return mE >= mF[1]
        ? [mF[0], mF[2]]
        : mE >= mC[1]
          ? mH(mF, mC, (mF[1] - mE) / Math.max(0.000001, mF[1] - mC[1]))
          : mE >= mt[1]
            ? mH(mC, mt, (mC[1] - mE) / Math.max(0.000001, mC[1] - mt[1]))
            : [mt[0], mt[2]];
    },
    Dx = (mm, mS, mE) => {
      let mF = Db(mS, mE, mm[1]);
      return Math.hypot(mm[0] - mF[0], mm[2] - mF[1]);
    },
    Dy = (mm, mS) => {
      let mE = [];
      for (let mF = 0; mF < Dz; mF++) {
        if (DL[mF] || D8?.[mF]) continue;
        let mC = -1,
          mt = 0;
        for (let me = 0; me < 4; me++)
          Dw[4 * mF + me] > mt && ((mt = Dw[4 * mF + me]), (mC = Dk[4 * mF + me]));
        let mH = DJ(mF);
        mC === mm && mH[1] < DK - 0.2 * DA && mH[1] > DT + 0.1 * DA && mE.push(Dx(mH, mm, mS));
      }
      return (mE.sort((mR, mQ) => mR - mQ), Math.max(0.02, mE.length ? mE[mE.length >> 1] : 0.07));
    },
    DW = Dy(DH, DR),
    Dq = Dy(De, DQ),
    DP = ['pelvis', 'spine_01', 'spine_02', 'spine_03', 'neck_01'].map(DC).filter((mm) => mm >= 0),
    DY = DP.map((mm) => D6[mm].head[1]),
    Dv = { l: DC('clavicle_l'), r: DC('clavicle_r') },
    DB = { l: DC('upperarm_l'), r: DC('upperarm_r') },
    DG = DP.length > 3 ? DY[3] : DY[DY.length - 2],
    Dg = (mm, mS, mE) => {
      let mF = mm[1],
        mC = 0;
      for (; mC < DY.length - 2 && mF > DY[mC + 1];) mC++;
      let mt = Math.max(0, Math.min(1, (mF - DY[mC]) / Math.max(0.000001, DY[mC + 1] - DY[mC])));
      (mE.set(DP[mC], 1 - mt), mE.set(DP[mC + 1], (mE.get(DP[mC + 1]) ?? 0) + mt));
      let mH = Dv[mS] >= 0 ? 0.6 * ls((mF - DG) / Math.max(0.000001, DX - DG)) : 0;
      if (mH > 0) {
        for (let [me, mR] of mE) mE.set(me, mR * (1 - mH));
        mE.set(Dv[mS], (mE.get(Dv[mS]) ?? 0) + mH);
      }
      return mE;
    },
    DI = (mm) => Math.max(0, Math.min(Dx(mm, DH, DR) - DW, Dx(mm, De, DQ) - Dq)),
    Dh = (mm, mS, mE) => {
      let mF = Dx(mm, DH, DR),
        mC = Dx(mm, De, DQ),
        mt = Math.max(0.001, Math.min(DK - mm[1], DA)),
        mH = mm[1] >= DK ? 0 : Math.max(0, Math.min(DV, 1 - mE / (mt * DD)));
      mH *= 1 - Dm * ls((Dn - mm[2] - 1.2 * Math.min(DW, Dq)) / 0.1);
      let me = Db(DH, DR, mm[1]),
        mR = Db(De, DQ, mm[1]),
        mQ = Math.max(0.001, Math.hypot(me[0] - mR[0], me[1] - mR[1])),
        mj = ls(0.5 + (0.5 * (mC - mF)) / mQ);
      return (mS.set(Dt, 1 - mH), mS.set(DH, mH * mj), mS.set(De, mH * (1 - mj)), mS);
    },
    DN = /^(upperarm|lowerarm|hand|thumb|index|middle|ring|pinky)_/,
    DM = /^(upperarm|lowerarm|hand|thumb|index|middle|ring|pinky|thigh|calf|foot|ball)_/,
    m0 = DZ[0] >= DU[0],
    m1 = -1 / 0,
    m2 = 1 / 0;
  for (let mm = 0; mm < Dz; mm++)
    ((m1 = Math.max(m1, D4[3 * mm + 1])), (m2 = Math.min(m2, D4[3 * mm + 1])));
  let m3 = m1 - m2,
    m4 = DF * m3,
    m5 = new Map(),
    m6 = (mS, mE, mF) =>
      Math.floor(mS / m4) + ',' + Math.floor(mE / m4) + ',' + Math.floor(mF / m4);
  if (DF > 0)
    for (let mS = 0; mS < Dz; mS++) {
      if (DL[mS] || D8?.[mS]) continue;
      let mE = m6(D4[3 * mS], D4[3 * mS + 1], D4[3 * mS + 2]),
        mF = m5.get(mE);
      (mF || m5.set(mE, (mF = [])), mF.push(mS));
    }
  let m7 = new Map(),
    m8 = (mC, mt) => {
      let [mH, me, mR] = DJ(mC),
        mQ = Math.floor(mH / m4),
        mj = Math.floor(me / m4),
        mz = Math.floor(mR / m4);
      mt.clear();
      let mO = 0;
      for (let mJ = -1; mJ <= 1; mJ++)
        for (let mZ = -1; mZ <= 1; mZ++)
          for (let mU = -1; mU <= 1; mU++)
            for (let mK of m5.get(mQ + mJ + ',' + (mj + mZ) + ',' + (mz + mU)) ?? [])
              if (!(Math.hypot(D4[3 * mK] - mH, D4[3 * mK + 1] - me, D4[3 * mK + 2] - mR) > m4)) {
                for (let [mT, mA] of ks(Dk, Dw, mK, m7)) mt.set(mT, (mt.get(mT) ?? 0) + mA);
                mO++;
              }
      for (let [mn, mo] of mt) mt.set(mn, mo / Math.max(1, mO));
      return mO;
    },
    m9 = new Int32Array(Dz).fill(-1);
  Dj.forEach((mC, mt) => {
    for (let mH of mC) m9[mH] = mt;
  });
  let mk = Dj.map(() => []);
  for (let mC = 0; mC < D5.length; mC += 3) {
    let mt = m9[D5[mC]];
    mt >= 0 &&
      m9[D5[mC + 1]] === mt &&
      m9[D5[mC + 2]] === mt &&
      mk[mt].push(D5[mC], D5[mC + 1], D5[mC + 2]);
  }
  let mw = { cloth: 0, anchored: 0, pieces: Dj.length };
  return (
    Dj.forEach((mH, me) => {
      let mR = [],
        mQ = new Uint8Array(mH.length),
        mj = mH.map((mJ) => DI(DJ(mJ))).sort((mJ, mZ) => mJ - mZ),
        mz = mj[mj.length >> 1];
      mH.forEach((mJ, mZ) => {
        let mU = DJ(mJ),
          mK = new Map();
        if ((mR.push(mK), mw.cloth++, DF > 0 && m8(mJ, mK))) {
          let mo = 0;
          for (let [mX, mL] of mK) DM.test(D6[mX].name) && (mo += mL);
          if (mo < 0.3) {
            ((mQ[mZ] = 1), mw.anchored++);
            return;
          }
          mK.clear();
        }
        let mT = mU[0] >= (DZ[0] + DU[0]) / 2 === m0 ? 'l' : 'r';
        (mU[1] < DK ? Dh(mU, mK, mz) : Dg(mU, mT, mK), ks(Dk, Dw, mJ, DO));
        let mA = ls((mU[1] - DG) / Math.max(0.000001, DX - DG));
        if (mA > 0) {
          let mb = 0;
          for (let [mx, my] of DO) DN.test(D6[mx].name) || (mb += my);
          if (mb > 0.05) {
            for (let [mW, mq] of mK) mK.set(mW, mq * (1 - mA));
            for (let [mP, mY] of DO)
              DN.test(D6[mP].name) || mK.set(mP, (mK.get(mP) ?? 0) + (mA * mY) / mb);
          }
        }
        let mn = 0;
        for (let [mv, mB] of DO) DN.test(D6[mv].name) && (mn += mB);
        if (DS > 0 && mn > 0 && DB[mT] >= 0) {
          let [mG] = Fs(mU, D6[DB[mT]]),
            mg = Math.min(mn, DS) * (1 - ls(mG / 0.6));
          if (mg > 0) {
            for (let [mI, mN] of mK) mK.set(mI, mN * (1 - mg));
            mK.set(DB[mT], (mK.get(DB[mT]) ?? 0) + mg);
          }
        }
      });
      let mO = DE > 0 ? rh(mH, mk[me], D4, mR, mQ, DE * m3) : mR;
      mH.forEach((mJ, mZ) => Ns(Dk, Dw, mJ, mO[mZ]));
    }),
    mw
  );
}
function rh(D3, D4, D5, D6, D7, D8, { tol: D9 = 0.0001, maxIter: Dk = 400 } = {}) {
  let Dw = D3.length,
    DV = new Map(),
    DD = new Map(),
    Dm = new Int32Array(Dw),
    DS = 0;
  D3.forEach((Dy, DW) => {
    DV.set(Dy, DW);
    let Dq =
        Math.round(D5[3 * Dy] * 100000) +
        ',' +
        Math.round(D5[3 * Dy + 1] * 100000) +
        ',' +
        Math.round(D5[3 * Dy + 2] * 100000),
      DP = DD.get(Dq);
    (DP === void 0 && DD.set(Dq, (DP = DS++)), (Dm[DW] = DP));
  });
  let DE = new Float64Array(DS),
    DF = new Map(),
    DC = new Float64Array(DS),
    Dt = new Int32Array(DS).fill(-1);
  D3.forEach((Dy, DW) => {
    Dt[Dm[DW]] < 0 && (Dt[Dm[DW]] = DW);
  });
  let DH = (Dy, DW, Dq) => {
      let DP = Dy < DW ? Dy * DS + DW : DW * DS + Dy;
      DF.set(DP, (DF.get(DP) ?? 0) + Dq);
    },
    De = (Dy, DW) => [Dy[0] - DW[0], Dy[1] - DW[1], Dy[2] - DW[2]],
    DR = (Dy, DW) => [
      Dy[1] * DW[2] - Dy[2] * DW[1],
      Dy[2] * DW[0] - Dy[0] * DW[2],
      Dy[0] * DW[1] - Dy[1] * DW[0],
    ];
  for (let Dy = 0; Dy < D4.length; Dy += 3) {
    let DW = [0, 1, 2].map((DY) => Dm[DV.get(D4[Dy + DY])]);
    if (DW[0] === DW[1] || DW[1] === DW[2] || DW[0] === DW[2]) continue;
    let Dq = [0, 1, 2].map((DY) => [
        D5[3 * D4[Dy + DY]],
        D5[3 * D4[Dy + DY] + 1],
        D5[3 * D4[Dy + DY] + 2],
      ]),
      DP = Math.hypot(...DR(De(Dq[1], Dq[0]), De(Dq[2], Dq[0])));
    if (!(DP < 1e-14)) {
      for (let DY = 0; DY < 3; DY++) DE[DW[DY]] += DP / 6;
      for (let Dv = 0; Dv < 3; Dv++) {
        let DB = De(Dq[(Dv + 1) % 3], Dq[Dv]),
          DG = De(Dq[(Dv + 2) % 3], Dq[Dv]);
        DH(
          DW[(Dv + 1) % 3],
          DW[(Dv + 2) % 3],
          Math.max(
            0,
            (0.5 * (DB[0] * DG[0] + DB[1] * DG[1] + DB[2] * DG[2])) /
              (Math.hypot(...DR(DB, DG)) || 1e-12),
          ),
        );
      }
    }
  }
  for (let Dg = 0; Dg < Dw; Dg++) DC[Dm[Dg]] = Math.max(DC[Dm[Dg]], (D7[Dg] ? 100 : 1) / (D8 * D8));
  let DQ = new Uint32Array(DS);
  for (let DI of DF.keys()) (DQ[Math.floor(DI / DS)]++, DQ[DI % DS]++);
  let Dj = new Uint32Array(DS + 1);
  for (let Dh = 0; Dh < DS; Dh++) Dj[Dh + 1] = Dj[Dh] + DQ[Dh];
  let Dz = new Uint32Array(Dj[DS]),
    DO = new Float64Array(Dj[DS]),
    DJ = Dj.slice(0, DS),
    DZ = new Float64Array(DS);
  for (let [DN, DM] of DF) {
    let m0 = Math.floor(DN / DS),
      m1 = DN % DS;
    ((Dz[DJ[m0]] = m1),
      (DO[DJ[m0]++] = -DM),
      (Dz[DJ[m1]] = m0),
      (DO[DJ[m1]++] = -DM),
      (DZ[m0] += DM),
      (DZ[m1] += DM));
  }
  for (let m2 = 0; m2 < DS; m2++) DZ[m2] = DZ[m2] + DE[m2] * DC[m2] || 1;
  let DU = (m3, m4) => {
      for (let m5 = 0; m5 < DS; m5++) {
        let m6 = DZ[m5] * m3[m5];
        for (let m7 = Dj[m5]; m7 < Dj[m5 + 1]; m7++) m6 += DO[m7] * m3[Dz[m7]];
        m4[m5] = m6;
      }
    },
    DK = new Set();
  for (let m3 of D6) for (let m4 of m3.keys()) DK.add(m4);
  let DT = Array.from({ length: DS }, () => new Map()),
    DA = new Float64Array(DS),
    Dn = new Float64Array(DS),
    DX = new Float64Array(DS),
    DL = new Float64Array(DS),
    Db = new Float64Array(DS),
    Dx = new Float64Array(DS);
  for (let m5 of DK) {
    for (let m8 = 0; m8 < DS; m8++) {
      let m9 = D6[Dt[m8]].get(m5) ?? 0;
      ((Dx[m8] = DE[m8] * DC[m8] * m9), (Db[m8] = m9));
    }
    DU(Db, DL);
    let m6 = 0,
      m7 = 0;
    for (let mk = 0; mk < DS; mk++)
      ((DA[mk] = DE[mk] > 0 ? Dx[mk] - DL[mk] : 0),
        (Dn[mk] = DA[mk] / DZ[mk]),
        (DX[mk] = Dn[mk]),
        (m6 += Dx[mk] * Dx[mk]),
        (m7 += DA[mk] * Dn[mk]));
    m6 = Math.sqrt(m6) || 1;
    for (let mw = 0; mw < Dk && m7 > 0; mw++) {
      DU(DX, DL);
      let mV = 0;
      for (let mF = 0; mF < DS; mF++) mV += DX[mF] * DL[mF];
      if (!(mV > 0)) break;
      let mD = m7 / mV,
        mm = 0;
      for (let mC = 0; mC < DS; mC++)
        ((Db[mC] += mD * DX[mC]),
          (DA[mC] = DE[mC] > 0 ? DA[mC] - mD * DL[mC] : 0),
          (mm += DA[mC] * DA[mC]));
      if (Math.sqrt(mm) < D9 * m6) break;
      let mS = 0;
      for (let mt = 0; mt < DS; mt++) ((Dn[mt] = DA[mt] / DZ[mt]), (mS += DA[mt] * Dn[mt]));
      let mE = mS / m7;
      m7 = mS;
      for (let mH = 0; mH < DS; mH++) DX[mH] = Dn[mH] + mE * DX[mH];
    }
    for (let me = 0; me < DS; me++) Db[me] > 0.001 && DT[me].set(m5, Db[me]);
  }
  return D3.map((mR, mQ) => DT[Dm[mQ]]);
}
function ah(D3, D4) {
  let D5 = D3.length / 3,
    D6 = new Map(),
    D7 = new Int32Array(D5);
  for (let Dk = 0; Dk < D5; Dk++) {
    let Dw =
        Math.round(D3[3 * Dk] * 100000) +
        ',' +
        Math.round(D3[3 * Dk + 1] * 100000) +
        ',' +
        Math.round(D3[3 * Dk + 2] * 100000),
      DV = D6.get(Dw);
    (DV === void 0 && ((DV = Dk), D6.set(Dw, Dk)), (D7[Dk] = DV));
  }
  let D8 = Int32Array.from({ length: D5 }, (DD, Dm) => Dm),
    D9 = (DD) => {
      for (; D8[DD] !== DD;) DD = D8[DD] = D8[D8[DD]];
      return DD;
    };
  for (let DD = 0; DD < D4.length; DD += 3) {
    let Dm = D7[D4[DD]],
      DS = D7[D4[DD + 1]],
      DE = D7[D4[DD + 2]];
    ((D8[D9(Dm)] = D9(DS)), (D8[D9(DS)] = D9(DE)));
  }
  return Int32Array.from({ length: D5 }, (DF, DC) => D9(D7[DC]));
}
function Ns(D3, D4, D5, D6) {
  let D7 = [...D6]
      .filter(([, D9]) => D9 > 0.0001)
      .sort((D9, Dk) => Dk[1] - D9[1])
      .slice(0, 4),
    D8 = D7.reduce((D9, [, Dk]) => D9 + Dk, 0);
  for (let D9 = 0; D9 < 4; D9++)
    ((D3[4 * D5 + D9] = D7[D9]?.[0] ?? 0),
      (D4[4 * D5 + D9] = D7[D9] && D8 > 0 ? D7[D9][1] / D8 : 0));
}
function ks(D3, D4, D5, D6) {
  D6.clear();
  for (let D7 = 0; D7 < 4; D7++)
    D4[4 * D5 + D7] > 0 &&
      D6.set(D3[4 * D5 + D7], (D6.get(D3[4 * D5 + D7]) ?? 0) + D4[4 * D5 + D7]);
  return D6;
}
function Wu(
  { index: D3, weight: D4 },
  { positions: D5, segs: D6, index: D7 = null, skip: D8 = null },
  { lo: D9 = 0.2, hi: Dk = 0.85, bins: Dw = 6, from: DV = 'skin', layers: DD = !0 } = {},
) {
  let Dm = D5.length / 3,
    DS = D6.map(() => Array.from({ length: Dw }, () => []));
  for (let DF = 0; DF < Dm; DF++) {
    let DC = -1,
      Dt = 0;
    for (let DR = 0; DR < 4; DR++)
      D4[4 * DF + DR] > Dt && ((Dt = D4[4 * DF + DR]), (DC = D3[4 * DF + DR]));
    if (DC < 0 || DC >= D6.length || Dt < 0.5) continue;
    let [DH, De] = Fs([D5[3 * DF], D5[3 * DF + 1], D5[3 * DF + 2]], D6[DC]);
    DH < D9 ||
      DH > Dk ||
      DS[DC][Math.min(Dw - 1, Math.floor(((DH - D9) / (Dk - D9)) * Dw))].push(De);
  }
  let DE = DV !== 'skin' && D7 ? ju(D5, D7, { skip: D8 }) : null;
  return D6.map((DQ, Dj) => {
    let Dz = [];
    DS[Dj].forEach((DK, DT) => {
      DK.length < 3 ||
        (DK.sort((DA, Dn) => DA - Dn),
        Dz.push([D9 + ((DT + 0.5) * (Dk - D9)) / Dw, DK[DK.length >> 1]]));
    });
    let DO = DV === 'skin' || (DV === 'both' && Dz.length >= 2) || !DE,
      DJ = DO ? Dz : Du(DE, DQ, { lo: D9, hi: Dk, stations: Dw, layers: DD }),
      [DZ, DU] = lh(DJ);
    return {
      bone: Dj,
      name: DQ.name,
      head: DQ.head.slice(),
      tail: DQ.tail.slice(),
      r: [DZ, DU],
      from: DO ? 'skin' : 'surface',
    };
  });
}
function lh(D3) {
  if (!D3.length) return [0, 0];
  if (D3.length === 1) return [D3[0][1], D3[0][1]];
  let D4 = D3.reduce((D9, Dk) => D9 + Dk[0], 0) / D3.length,
    D5 = D3.reduce((D9, Dk) => D9 + Dk[1], 0) / D3.length,
    D6 = D3.reduce((D9, Dk) => D9 + (Dk[0] - D4) ** 2, 0),
    D7 = D3.reduce((D9, Dk) => D9 + (Dk[0] - D4) * (Dk[1] - D5), 0),
    D8 = D6 > 1e-12 ? D7 / D6 : 0;
  return [
    Math.min(2 * D5, Math.max(0.5 * D5, D5 - D8 * D4)),
    Math.min(2 * D5, Math.max(0.5 * D5, D5 + D8 * (1 - D4))),
  ];
}
function Vu(D3, { positions: D4, segs: D5, skip: D6 = null }, D7, D8 = {}) {
  let {
      bones: D9 = ['upperarm_l', 'upperarm_r'],
      sized: Dk = {},
      margin: Dw = 1.25,
      fade: DV = 0.5,
      reach: DD = 0.4,
      cap: Dm = 0.6,
      alone: DS = !1,
      to: DE = (DO) => ['clavicle_' + DO, 'spine_03', 'spine_02'],
    } = D8,
    DF = D3.index,
    DC = D3.weight,
    Dt = D4.length / 3,
    DH = new Map(),
    De = (DO) => D5.findIndex((DJ) => DJ.name === DO),
    DR = new Map();
  for (let DO of D9) DR.set(DO, { reach: DD, scale: 1, torso: !0 });
  for (let [DJ, DZ] of Object.entries(Dk ?? {}))
    Number.isFinite(DZ) && DZ > 0 && DR.set(DJ, { reach: 1, scale: DZ, torso: D9.includes(DJ) });
  let DQ = new Map(D5.map((DU, DK) => [DK, []]));
  D5.forEach((DU, DK) => {
    let DT = DU.parent != null ? De(DU.parent) : -1;
    DT >= 0 && DQ.get(DT).push(DK);
  });
  let Dj = (DU) => {
    let DK = new Set([DU]),
      DT = [DU];
    for (; DT.length;) for (let DA of DQ.get(DT.pop())) DK.has(DA) || (DK.add(DA), DT.push(DA));
    return DK;
  };
  for (let DU of D7) {
    let DK = DR.get(DU.name),
      DT = DK?.scale ?? 1;
    ((DU.keep = [DU.r[0] * Dw * DT, DU.r[1] * Dw * DT]), (DU.active = !!DK && DU.r[0] > 0));
  }
  let Dz = 0;
  for (let [DA, Dn] of DR) {
    let DX = De(DA),
      DL = D7.find((Dq) => Dq.bone === DX);
    if (DX < 0 || !DL || !(DL.r[0] > 0)) continue;
    let Db = Dj(DX),
      Dx = DA.slice(-1),
      Dy = D5[DX].parent != null ? De(D5[DX].parent) : -1,
      DW = (Dn.torso ? DE(Dx).map(De) : [Dy]).filter((Dq) => Dq >= 0);
    for (let Dq = 0; Dq < Dt; Dq++) {
      if (D6?.[Dq]) continue;
      let DP = 0;
      for (let m0 = 0; m0 < 4; m0++) DF[4 * Dq + m0] === DX && (DP += DC[4 * Dq + m0]);
      if (!(DP > 0)) continue;
      let DY = [D4[3 * Dq], D4[3 * Dq + 1], D4[3 * Dq + 2]],
        [Dv, DB, DG] = Fs(DY, D5[DX]);
      if (Dv > Dn.reach || Dv > 1) continue;
      let Dg = Dn.scale * (DL.r[0] + (DL.r[1] - DL.r[0]) * Math.max(0, Math.min(1, Dv))),
        DI = Dv >= 0 ? DB / Dg : Math.hypot(DB / Dg, (Dv * DG) / (Dm * Dg)),
        Dh = 1 - ls((DI - Dw) / DV);
      if (Dh >= 1) continue;
      ks(DF, DC, Dq, DH);
      let DN = 0;
      for (let [m1, m2] of DH) Db.has(m1) || (DN += m2);
      let DM = DP * (1 - Dh);
      if (DN > 0) {
        for (let [m3, m4] of DH) Db.has(m3) || DH.set(m3, m4 + (DM * m4) / DN);
      } else {
        if ((DS || !Dn.torso) && DW.length) {
          let m5 = DW[0],
            m6 = 1 / 0;
          for (let m7 of DW) {
            let m8 = Fs(DY, D5[m7]),
              m9 = Math.hypot(m8[1], Math.max(0, -m8[0], m8[0] - 1) * m8[2]);
            m9 < m6 && ((m6 = m9), (m5 = m7));
          }
          DH.set(m5, (DH.get(m5) ?? 0) + DM);
        } else continue;
      }
      (DH.set(DX, DP * Dh), Ns(DF, DC, Dq, DH), Dz++);
    }
  }
  return Dz;
}
function ch(D3, { positions: D4, I: D5, W: D6, segs: D7 }) {
  let D8 = [];
  for (let D9 = 0; D9 < D4.length / 3; D9++) {
    let Dk = -1,
      Dw = 0;
    for (let Dm = 0; Dm < 4; Dm++)
      D6[4 * D9 + Dm] > Dw && ((Dw = D6[4 * D9 + Dm]), (Dk = D5[4 * D9 + Dm]));
    if (Dk !== D3) continue;
    let [DV, DD] = Fs([D4[3 * D9], D4[3 * D9 + 1], D4[3 * D9 + 2]], D7[D3]);
    DV > 0.15 && DV < 0.6 && D8.push(DD);
  }
  return (D8.sort((DS, DE) => DS - DE), D8.length ? D8[D8.length >> 1] : 0);
}
function Gu(D3, { positions: D4, segs: D5 }, D6 = {}) {
  let D7 = D3.index,
    D8 = D3.weight,
    D9 = D4.length / 3,
    Dk = (DF) => D5.findIndex((DC) => DC.name === DF),
    Dw = new Map(),
    DV = {},
    DD = (DF) => [D4[3 * DF], D4[3 * DF + 1], D4[3 * DF + 2]];
  if (D6.parts) {
    let DF = D5.map((DH) => D5.map((De) => pa(DH.name, De.name))),
      DC = new Set(['spine_01', 'spine_02']),
      Dt = 0;
    for (let DH = 0; DH < D9; DH++) {
      let De = -1,
        DR = 0;
      for (let Dj = 0; Dj < 4; Dj++)
        D8[4 * DH + Dj] > DR && ((DR = D8[4 * DH + Dj]), (De = D7[4 * DH + Dj]));
      if (De < 0) continue;
      ks(D7, D8, DH, Dw);
      let DQ = !1;
      for (let Dz of Dw.keys()) {
        let DO = DF[De][Dz];
        (DO === 'cut' || (D6.parts !== 'cut' && DO === 'evidence' && DC.has(D5[De].name))) &&
          (Dw.delete(Dz), (DQ = !0));
      }
      DQ && (Ns(D7, D8, DH, Dw), Dt++);
    }
    DV.parts = Dt;
  }
  let Dm = Dk('thigh_l'),
    DS = Dk('thigh_r'),
    DE = Dk('pelvis');
  if (D6.hips && Dm >= 0 && DS >= 0 && DE >= 0) {
    let { at: DJ = 0.1, width: DZ = 0.3, reach: DU = [1.2, 1.6] } = D6.hips,
      DK = ['spine_01', 'spine_02'].map(Dk).filter((DX) => DX >= 0),
      DT = (D5[Dm].head[0] + D5[DS].head[0]) / 2,
      DA = Math.abs(D5[Dm].head[0] - D5[DS].head[0]) / 2,
      Dn = 0;
    for (let [DX, DL] of [
      [Dm, DS],
      [DS, Dm],
    ]) {
      let Db = ch(DX, { positions: D4, I: D7, W: D8, segs: D5 }) || 0.08,
        Dx = Math.sign(D5[DX].head[0] - DT);
      for (let Dy = 0; Dy < D9; Dy++) {
        let DW = DD(Dy);
        if (Math.sign(DW[0] - DT) !== Dx || Math.abs(DW[0] - DT) < 0.5 * DA) continue;
        let [Dq, DP] = Fs(DW, D5[DX]);
        if (Dq < -0.5 || Dq > 0.4 || DP > DU[1] * Db) continue;
        ks(D7, D8, Dy, Dw);
        let DY = Dw.get(DE) ?? 0,
          Dv = Dw.get(DX) ?? 0,
          DB = Dw.get(DL) ?? 0,
          DG = DK.reduce((m2, m3) => m2 + (Dw.get(m3) ?? 0), 0),
          Dg = DY + Dv + DB + DG;
        if (Dg <= 0.5) continue;
        let DI = ls((Dq + DJ) / (1.6 * DZ) + 0.5),
          Dh = 1 - ls((DP / Db - DU[0]) / (DU[1] - DU[0])),
          DN = Dg * (1 - DI),
          DM = Dq > 0 || DY + DG <= 0 ? 0 : DG / (DY + DG),
          m0 = Dv + DB > 0 ? Dv / (Dv + DB) : 1,
          m1 = new Map([
            [DX, Dg * DI * m0],
            [DL, Dg * DI * (1 - m0)],
            [DE, DN * (1 - DM)],
          ]);
        for (let m2 of DK) m1.set(m2, DM > 0 ? (DN * DM * (Dw.get(m2) ?? 0)) / DG : 0);
        for (let [m3, m4] of m1) Dw.set(m3, (1 - Dh) * (Dw.get(m3) ?? 0) + Dh * m4);
        (Ns(D7, D8, Dy, Dw), Dn++);
      }
    }
    DV.hips = Dn;
  }
  return DV;
}
var dh = /^(upperarm|lowerarm|hand|thumb|index|middle|ring|pinky)_/,
  uh = /^(thumb|index|middle|ring|pinky)_/,
  ci = {
    hip: 1 / 7,
    hips: { at: 0.05, width: 0.3 },
    parts: 'cut',
    seams: 0.003,
    lat: { down: 0.15, to: 'spine_03' },
    envelope: { alone: !0, measure: { from: 'both' } },
  };
function Yi(D3, D4) {
  let D5 = fh(D3),
    D6 = D5[D4],
    D7 = [];
  for (let D8 = 0; D8 < D5.length; D8++) D5[D8] === D6 && D7.push(D8);
  return Uint32Array.from(D7);
}
var Yu = new WeakMap();
function fh(D3) {
  let D4 = D3.attributes.position,
    D5 = Yu.get(D3);
  if (D5?.length === D4.count) return D5;
  let D6 = D4.count,
    D7 = new Map(),
    D8 = new Int32Array(D6);
  for (let DD = 0; DD < D6; DD++) {
    let Dm =
        Math.round(D4.getX(DD) * 100000) +
        ',' +
        Math.round(D4.getY(DD) * 100000) +
        ',' +
        Math.round(D4.getZ(DD) * 100000),
      DS = D7.get(Dm);
    ((D8[DD] = DS === void 0 ? DD : DS), DS === void 0 && D7.set(Dm, DD));
  }
  let D9 = (DE) => {
      for (; D8[DE] !== DE;) DE = D8[DE] = D8[D8[DE]];
      return DE;
    },
    Dk = D3.index,
    Dw = Dk ? Dk.count : D6,
    DV = (DE) => (Dk ? Dk.getX(DE) : DE);
  for (let DE = 0; DE + 2 < Dw; DE += 3) {
    let DF = D9(DV(DE)),
      DC = D9(DV(DE + 1)),
      Dt = D9(DV(DE + 2));
    ((D8[DF] = DC), (D8[D9(DC)] = Dt));
  }
  return ((D5 = Int32Array.from({ length: D6 }, (DH, De) => D9(De))), Yu.set(D3, D5), D5);
}
var li = (D3) =>
  !(D3 === 'root' || D3.startsWith('ik_') || D3.startsWith('socket_') || D3.includes('_leaf'));
function ph(D3, D4, D5, D6 = null, D7 = null) {
  let D8 = [];
  for (let D9 of D4.bones.keys()) {
    if (!li(D9) || !D3.has(D9) || D6?.has(D9)) continue;
    let Dk = D3.get(D9),
      Dw = kN[D9] && D3.get(kN[D9]);
    if (!Dw) {
      let DV = [...D4.parent].find(([DD, Dm]) => Dm === D9 && D3.has(DD) && li(DD));
      Dw = DV && D3.get(DV[0]);
    }
    (D9 === 'Head' &&
      (Dw =
        D7 && D7.distanceTo(Dk) > 0.001 ? D7.clone() : Dk.clone().setY(Math.max(D5, Dk.y + 0.05))),
      !(!Dw || Dw.distanceTo(Dk) < 0.000001) &&
        D8.push({
          name: D9,
          head: Dk.toArray(),
          tail: Dw.toArray(),
          parent: D4.parent.get(D9) ?? null,
        }));
  }
  return D8;
}
function Hu({
  meshes: D3,
  place: D4,
  joints: D5,
  ref: D6,
  ours: D7,
  THREE: D8,
  moveJoints: D9,
  head: Dk = null,
  proxy: Dw = !1,
  shape: DV = {},
  tags: DD = [],
  bare: Dm = null,
}) {
  D7.updateMatrixWorld(!0);
  let DS = new Map();
  (D7.traverse((DT) => {
    DT.isBone && !DS.has(DT.name) && DS.set(DT.name, DT);
  }),
    D9(D7, DS, { align: { p: D5 } }, D8));
  let DE = [];
  D7.traverse((DT) => {
    DT.isSkinnedMesh && DE.push(DT);
  });
  let DF = DE[0].skeleton.bones;
  for (let DT of DE) (DT.removeFromParent(), DT.geometry.dispose());
  D7.updateMatrixWorld(!0);
  let DC = new D8['Skeleton'](DF),
    Dt = D3.map((DA) => {
      let Dn = DA.geometry.clone();
      return (
        Dn.applyMatrix4(new D8.Matrix4().multiplyMatrices(D4, DA.matrixWorld)),
        { m: DA, geo: Dn }
      );
    }),
    DH = Dt.reduce((DA, Dn) => DA + Dn.geo.attributes.position.count, 0),
    De = new Float32Array(DH * 3),
    DR = [],
    DQ = 0;
  for (let { geo: DA } of Dt) {
    let Dn = DA.attributes.position;
    for (let DX = 0; DX < Dn.count; DX++)
      De.set([Dn.getX(DX), Dn.getY(DX), Dn.getZ(DX)], 3 * (DQ + DX));
    if (DA.index) {
      for (let DL = 0; DL < DA.index.count; DL++) DR.push(DQ + DA.index.getX(DL));
    } else {
      for (let Db = 0; Db < Dn.count; Db++) DR.push(DQ + Db);
    }
    DQ += Dn.count;
  }
  let Dj = -1 / 0;
  for (let Dx = 1; Dx < De.length; Dx += 3) Dj = Math.max(Dj, De[Dx]);
  let Dz = ph(D5, D6, Dk?.skullTop ?? Dj, Dm, Dk?.end ?? null),
    DO = new Uint8Array(DH);
  if (Dk?.headOnly?.size) {
    let Dy = 0;
    for (let { m: DW, geo: Dq } of Dt) {
      let DP = Dq.attributes.position.count;
      (Dk.headOnly.has(DW) && DO.fill(1, Dy, Dy + DP), (Dy += DP));
    }
  }
  let DJ = [];
  for (let DY = 0, Dv = 0; DY < Dt.length; Dv += Dt[DY].geo.attributes.position.count, DY++)
    DJ.push(Dv);
  let DZ = [],
    DU = new Int16Array(DH).fill(-1),
    DK = DO.slice();
  for (let DB of DD) {
    let DG = D3[DB.mesh];
    if (!DG || !(DB.vertex >= 0 && DB.vertex < DG.geometry.attributes.position.count)) continue;
    let Dg = Array.from(Yi(DG.geometry, DB.vertex), (Dh) => DJ[DB.mesh] + Dh);
    DB.kind === 'cloth' && DZ.push(Dg);
    let DI = DB.kind === 'prop' ? DF.findIndex((Dh) => Dh.name === DB.bone) : -1;
    if (DI >= 0) {
      for (let Dh of Dg) ((DU[Dh] = DI), (DK[Dh] = 1));
    }
  }
  return {
    input: {
      positions: De,
      index: Uint32Array.from(DR),
      segs: Dz,
      alone: DO,
      held: DK,
      cloth: DZ.map((DN) => Uint32Array.from(DN)),
      top: Dj,
      head: Dk ? { chin: Dk.chin, skullTop: Dk.skullTop ?? Dj } : null,
      joints: new Map([...D5].map(([DN, DM]) => [DN, { x: DM.x, y: DM.y, z: DM.z }])),
      proxy: Dw,
      shape: DV,
    },
    finish: (DN) => {
      DN.stats.props = DU.reduce((m2, m3) => m2 + (m3 >= 0), 0);
      let DM = Dz.map((m2) => DF.findIndex((m3) => m3.name === m2.name)),
        m0 = 0,
        m1 = [];
      for (let { m: m2, geo: m3 } of Dt) {
        let m4 = m3.attributes.position.count,
          m5 = new Uint16Array(4 * m4),
          m6 = new Float32Array(4 * m4);
        for (let m8 = 0; m8 < 4 * m4; m8++)
          ((m5[m8] = DM[DN.index[4 * m0 + m8]]), (m6[m8] = DN.weight[4 * m0 + m8]));
        for (let m9 = 0; m9 < m4; m9++)
          DU[m0 + m9] >= 0 &&
            (m5.fill(0, 4 * m9, 4 * m9 + 4),
            m6.fill(0, 4 * m9, 4 * m9 + 4),
            (m5[4 * m9] = DU[m0 + m9]),
            (m6[4 * m9] = 1));
        (m3.setAttribute('skinIndex', new D8['Uint16Buffer' + 'Attribute'](m5, 4)),
          m3.setAttribute('skinWeight', new D8['Float32Buffe' + 'rAttribute'](m6, 4)));
        let m7 = new D8['SkinnedMesh'](m3, m2.material);
        ((m7.name = m2.name || 'Body'),
          (m7.frustumCulled = !1),
          D7.add(m7),
          m7.updateMatrixWorld(!0),
          m7.bind(DC, m7.matrixWorld.clone()),
          m1.push(m7),
          (m0 += m4));
      }
      return { scene: D7, meshes: m1, stats: DN.stats };
    },
  };
}
function Xu(
  {
    positions: D3,
    index: D4,
    segs: D5,
    alone: D6,
    held: D7,
    cloth: D8,
    top: D9,
    head: Dk,
    joints: Dw,
    proxy: DV,
    shape: DD,
  },
  Dm = null,
) {
  let DS = { ...ci, ...DD },
    DE;
  if (DV) DE = hh({ positions: D3, index: D4, alone: D6, segs: D5, joints: Dw, height: D9 });
  else {
    let DF = qu(D5, DS);
    ((DE = Gi(
      { positions: D3, index: D4, bones: DF.segs },
      { exclude: D7.includes(1) ? D7 : null, link: 0.006 * D9, onProgress: Dm },
    )),
      zu(DE, D5.length, DF.owner),
      (DE.stats.bones = D5.length));
    let DC = Date.now();
    DE.stats.shape = Gu(DE, { positions: D3, segs: D5 }, DS);
    let Dt = D7.map((DH, De) => (DH && !D6[De] ? 1 : 0));
    ((DE.envelopes = Wu(
      DE,
      { positions: D3, segs: D5, index: D4, skip: Dt },
      DS.envelope?.measure ?? {},
    )),
      DS.envelope &&
        (DE.stats.envelope = Vu(
          DE,
          { positions: D3, segs: D5, skip: D7 },
          DE.envelopes,
          DS.envelope === !0 ? {} : DS.envelope,
        )),
      D8.length &&
        (DE.stats.cloth = Uu(
          DE,
          { positions: D3, index: D4, segs: D5, pieces: D8, skip: D7 },
          DS.cloth ?? {},
        )),
      (DE.stats.ms.shape = Date.now() - DC));
  }
  if (
    (Dk &&
      gh(DE, {
        positions: D3,
        alone: D6,
        segs: D5,
        joints: Dw,
        chin: Dk.chin,
        skullTop: Dk.skullTop ?? D9,
        height: D9,
      }),
    DS.seams > 0)
  ) {
    let DH = Date.now();
    ((DE.stats.seams = Ku(DE, D3, D4, DS.seams * D9, D7)), (DE.stats.ms.seams = Date.now() - DH));
  }
  return DE;
}
function hh({ positions: D3, index: D4, alone: D5, segs: D6, joints: D7, height: D8 }) {
  let D9 = Date.now(),
    Dk = D8 / 1.83,
    Dw = D3.length / 3,
    DV = xu({ positions: D3, index: D4, bones: D6, height: D8 }, { exclude: D5 }),
    DD = Gi({ positions: DV.positions, index: DV.index, bones: D6 }),
    Dm = [];
  for (let DZ = 0; DZ < D4.length; DZ += 3)
    !D5[D4[DZ]] && !D5[D4[DZ + 1]] && !D5[D4[DZ + 2]] && Dm.push(D4[DZ], D4[DZ + 1], D4[DZ + 2]);
  let DS = Uint32Array.from(Dm),
    DE = D6.map((DU) => ti.indexOf(ei(DU.name))),
    DF = Int32Array.from(DV.inputBone, (DU) => (DU >= 0 ? DE[DU] : -1)),
    DC = Bu(
      {
        positions: DV.positions,
        index: DV.index,
        skinIndex: DD.index,
        skinWeight: DD.weight,
        labels: DV.region,
      },
      { positions: D3, index: DS, labels: DF },
      D6.length,
      { maxDistance: Math.max(3 * DV.h, 0.015 * Dk), link: 0.006 * D8 },
    ),
    Dt = DC.index,
    DH = DC.weight,
    De = DV.positions,
    DR = 0.03 * Dk,
    DQ = new Map(),
    Dj = (DU, DK, DT) => DU + ',' + DK + ',' + DT;
  for (let DU = 0; DU < De.length / 3; DU++) {
    let DK = Dj(
        Math.floor(De[3 * DU] / DR),
        Math.floor(De[3 * DU + 1] / DR),
        Math.floor(De[3 * DU + 2] / DR),
      ),
      DT = DQ.get(DK);
    (DT || DQ.set(DK, (DT = [])), DT.push(DU));
  }
  let Dz = 0;
  for (let DA = 0; DA < Dw; DA++) {
    if (!DC.unfilled[DA] || D5[DA]) continue;
    let Dn = D3[3 * DA],
      DX = D3[3 * DA + 1],
      DL = D3[3 * DA + 2],
      Db = Math.floor(Dn / DR),
      Dx = Math.floor(DX / DR),
      Dy = Math.floor(DL / DR),
      DW = 1 / 0,
      Dq = -1;
    for (let DP = 0; DP < 12 && (Dq < 0 || (DP - 1) * DR < Math.sqrt(DW)); DP++)
      for (let DY = -DP; DY <= DP; DY++)
        for (let Dv = -DP; Dv <= DP; Dv++)
          for (let DB = -DP; DB <= DP; DB++)
            if (Math.max(Math.abs(DY), Math.abs(Dv), Math.abs(DB)) === DP)
              for (let DG of DQ.get(Dj(Db + DY, Dx + Dv, Dy + DB)) ?? []) {
                let Dg =
                  (De[3 * DG] - Dn) ** 2 + (De[3 * DG + 1] - DX) ** 2 + (De[3 * DG + 2] - DL) ** 2;
                Dg < DW && ((DW = Dg), (Dq = DG));
              }
    if (!(Dq < 0)) {
      for (let DI = 0; DI < 4; DI++)
        ((Dt[4 * DA + DI] = DD.index[4 * Dq + DI]), (DH[4 * DA + DI] = DD.weight[4 * Dq + DI]));
      Dz++;
    }
  }
  let DO = Date.now(),
    DJ = mh({
      positions: D3,
      index: DS,
      labels: DF,
      segs: D6,
      joints: D7,
      height: D8,
      I: Dt,
      W: DH,
    });
  return {
    index: Dt,
    weight: DH,
    stats: {
      vertices: Dw,
      bones: DD.stats.bones,
      welded: DC.stats.welded,
      unseen: DD.stats.unseen,
      proxy: DV.stats,
      heat: DD.stats,
      transfer: DC.stats,
      loose: Dz,
      hands: DJ,
      ms: {
        proxy: DV.stats.ms.total,
        heat: DD.stats.ms.total,
        copy: DO - D9 - DV.stats.ms.total - DD.stats.ms.total,
        hands: DJ.ms,
        total: Date.now() - D9,
      },
    },
  };
}
function mh({
  positions: D3,
  index: D4,
  labels: D5,
  segs: D6,
  joints: D7,
  height: D8,
  I: D9,
  W: Dk,
}) {
  let Dw = Date.now(),
    DV = D8 / 1.83,
    DD = D3.length / 3,
    Dm = new Float32Array(DD).fill(-1),
    DS = [];
  for (let DR of ['l', 'r']) {
    let DQ = D7.get('hand_' + DR),
      Dj = D7.get('lowerarm_' + DR);
    if (!DQ || !Dj) continue;
    let Dz = [DQ.x - Dj.x, DQ.y - Dj.y, DQ.z - Dj.z],
      DO = Math.hypot(...Dz) || 1;
    D6.forEach((DZ, DU) => {
      DZ.name.endsWith('_' + DR) &&
        (/^(lowerarm|hand)_/.test(DZ.name) || uh.test(DZ.name)) &&
        DS.push(DU);
    });
    let DJ = [ti.indexOf('hand_' + DR), ti.indexOf('arm_' + DR)];
    for (let DZ = 0; DZ < DD; DZ++) {
      if (!DJ.includes(D5[DZ])) continue;
      let DU =
        ((D3[3 * DZ] - DQ.x) * Dz[0] +
          (D3[3 * DZ + 1] - DQ.y) * Dz[1] +
          (D3[3 * DZ + 2] - DQ.z) * Dz[2]) /
        DO;
      if (DU < -0.04 * DV) continue;
      let DK = Math.min(1, Math.max(0, (DU + 0.03 * DV) / (0.02 * DV)));
      Dm[DZ] = DK * DK * (3 - 2 * DK);
    }
  }
  let DE = [];
  for (let DT = 0; DT < D4.length; DT += 3)
    Dm[D4[DT]] >= 0 &&
      Dm[D4[DT + 1]] >= 0 &&
      Dm[D4[DT + 2]] >= 0 &&
      DE.push(D4[DT], D4[DT + 1], D4[DT + 2]);
  if (!DE.length || !DS.length) return { vertices: 0, ms: Date.now() - Dw };
  let DF = new Int32Array(DD).fill(-1),
    DC = [];
  for (let DA of DE) DF[DA] < 0 && ((DF[DA] = DC.length), DC.push(DA));
  let Dt = new Float32Array(3 * DC.length);
  DC.forEach((Dn, DX) => Dt.set(D3.subarray(3 * Dn, 3 * Dn + 3), 3 * DX));
  let DH = Gi(
      { positions: Dt, index: Uint32Array.from(DE, (Dn) => DF[Dn]), bones: DS.map((Dn) => D6[Dn]) },
      { link: 0.006 * D8 },
    ),
    De = new Map();
  return (
    DC.forEach((Dn, DX) => {
      let DL = Dm[Dn];
      De.clear();
      for (let Dy = 0; Dy < 4; Dy++)
        if (
          (Dk[4 * Dn + Dy] > 0 &&
            De.set(D9[4 * Dn + Dy], (De.get(D9[4 * Dn + Dy]) ?? 0) + (1 - DL) * Dk[4 * Dn + Dy]),
          DH.weight[4 * DX + Dy] > 0)
        ) {
          let DW = DS[DH.index[4 * DX + Dy]];
          De.set(DW, (De.get(DW) ?? 0) + DL * DH.weight[4 * DX + Dy]);
        }
      let Db = [...De].sort((Dq, DP) => DP[1] - Dq[1]).slice(0, 4),
        Dx = Db.reduce((Dq, [, DP]) => Dq + DP, 0) || 1;
      for (let Dq = 0; Dq < 4; Dq++)
        ((D9[4 * Dn + Dq] = Db[Dq]?.[0] ?? 0), (Dk[4 * Dn + Dq] = Db[Dq] ? Db[Dq][1] / Dx : 0));
    }),
    { vertices: DC.length, ms: Date.now() - Dw }
  );
}
function gh(
  D3,
  { positions: D4, alone: D5, segs: D6, joints: D7, chin: D8, skullTop: D9, height: Dk },
) {
  let Dw = D6.findIndex((DR) => DR.name === 'Head'),
    DV = D7.get('Head');
  if (Dw < 0 || !DV) return;
  let DD = D3.weight,
    Dm = D3.index,
    DS = D4.length / 3,
    DE = Dk / 1.83,
    DF = 0.06 * DE,
    DC = Math.tan((20 * Math.PI) / 180),
    Dt = new Set(D6.map((DR, DQ) => (dh.test(DR.name) ? DQ : -1)).filter((DR) => DR >= 0)),
    DH = -1 / 0;
  for (let DR = 0; DR < DS; DR++) {
    if (D5[DR]) continue;
    let DQ = D4[3 * DR],
      Dj = D4[3 * DR + 1],
      Dz = D4[3 * DR + 2];
    Math.abs(Dj - DV.y) < 0.01 * DE && Math.abs(DQ - DV.x) < 0.04 * DE && (DH = Math.max(DH, Dz));
  }
  Number.isFinite(DH) || (DH = DV.z + 0.08 * DE);
  let De = Math.max(D9 - D8[1], 0.1 * DE);
  for (let DO = 0; DO < DS; DO++) {
    let DJ = 4 * DO;
    if (D5[DO]) {
      (Dm.fill(0, DJ, DJ + 4), DD.fill(0, DJ, DJ + 4), (Dm[DJ] = Dw), (DD[DJ] = 1));
      continue;
    }
    let DZ = D4[3 * DO],
      DU = D4[3 * DO + 1],
      DK = D4[3 * DO + 2];
    if (DU < D8[1] - DF - 0.02 * DE || Math.hypot(DZ - DV.x, DK - DV.z) >= De) continue;
    let DT = 0;
    for (let Dx = 0; Dx < 4; Dx++) Dt.has(Dm[DJ + Dx]) && (DT += DD[DJ + Dx]);
    if (DT >= 0.5) continue;
    let DA = Math.min(1, Math.max(0, (DU - DV.y - DC * (DH - DK) + DF) / DF));
    if (DA <= 0) continue;
    let Dn = DA * DA * (3 - 2 * DA),
      DX = -1,
      DL = 0;
    for (let Dy = 0; Dy < 4; Dy++)
      ((DD[DJ + Dy] *= 1 - Dn),
        Dm[DJ + Dy] === Dw && (DX = Dy),
        DD[DJ + Dy] < DD[DJ + DL] && (DL = Dy));
    (DX < 0 && ((DX = DL), (Dm[DJ + DX] = Dw), (DD[DJ + DX] = 0)), (DD[DJ + DX] += Dn));
    let Db = 0;
    for (let DW = 0; DW < 4; DW++) Db += DD[DJ + DW];
    for (let Dq = 0; Dq < 4; Dq++) DD[DJ + Dq] /= Db;
  }
}
function Ju(D3, D4 = null, D5 = null) {
  if (D5?.aborted) return Promise.reject(new DOMException('Cancelled', 'AbortError'));
  let D6 = () => {
      let D8 = Xu(D3, D4);
      return ((D8.stats.worker = !1), D8);
    },
    D7;
  try {
    D7 = new Worker(new URL('./rigging/weight-worker.js', import.meta.url), { type: 'module' });
  } catch {
    return Promise.resolve().then(D6);
  }
  return new Promise((D8, D9) => {
    let Dk = !1;
    (D5?.addEventListener(
      'abort',
      () => {
        (D7.terminate(), D9(new DOMException('Cancelled', 'AbortError')));
      },
      { once: !0 },
    ),
      (D7.onmessage = ({ data: Dw }) => {
        if (((Dk = !0), Dw.progress)) {
          D4?.(...Dw.progress);
          return;
        }
        (D7.terminate(),
          Dw.error ? D9(new Error(Dw.error)) : ((Dw.result.stats.worker = !0), D8(Dw.result)));
      }),
      (D7.onerror = (Dw) => {
        if ((Dw.preventDefault?.(), D7.terminate(), Dk)) {
          D9(new Error(Dw.message || 'The weighing stopped with an error.'));
          return;
        }
        try {
          D8(D6());
        } catch (DV) {
          D9(DV);
        }
      }),
      D7.postMessage(D3));
  });
}
var di = { version: '1.0.1', file: 'hand_landmarker-float16-1.task', megabytes: 20 },
  wh = null,
  Zu = () => wh ?? new URL('assets/vendor/', document.baseURI).href,
  tf = ['thumb', 'index', 'middle', 'ring', 'pinky'],
  nf = ['01', '02', '03', '04_leaf'],
  yh = (D3, D4) =>
    D3 === 0 ? 'hand_' + D4 : tf[(D3 - 1) >> 2] + '_' + nf[(D3 - 1) & 3] + '_' + D4,
  of = (D3) => tf.flatMap((D4) => nf.map((D5) => D4 + '_' + D5 + '_' + D3)),
  Qu = 384,
  ef = { skin: { color: 13212284, back: 3817544 }, grey: { color: 11843773, back: 2895926 } },
  va = null;
function sf() {
  return (
    (va ??= (async () => {
      let D3 = Zu() + 'mediapipe/' + di.version,
        D4 = await import(D3 + '/vision_bundle.mjs'),
        D5 = await D4.FilesetResolver.forVisionTasks(D3 + '/wasm'),
        D6 = (D7) =>
          D4.HandLandmarker.createFromOptions(D5, {
            baseOptions: { modelAssetPath: Zu() + 'mediapipe-models/' + di.file, delegate: D7 },
            runningMode: 'IMAGE',
            numHands: 1,
            minHandDetectionConfidence: 0.3,
            minHandPresenceConfidence: 0.3,
            minTrackingConfidence: 0.3,
          });
      try {
        return await D6('GPU');
      } catch {
        return await D6('CPU');
      }
    })().catch((D3) => {
      throw ((va = null), D3);
    })),
    va
  );
}
function kh(D3, D4, D5, D6) {
  let D7 = D5.dir,
    D8 = D5.palm,
    D9 = new D6['Vector3']().crossVectors(D7, D8).normalize(),
    Dk = D5.length,
    Dw = D3.all,
    DV = new Map(),
    DD = [],
    Dm = [];
  for (let DE = 0; DE < Dw.length; DE += 9) {
    let DF = !0;
    for (let DC = 0; DC < 9 && DF; DC += 3) {
      let Dt = Dw[DE + DC] - D4.x,
        DH = Dw[DE + DC + 1] - D4.y,
        De = Dw[DE + DC + 2] - D4.z,
        DR = Dt * D7.x + DH * D7.y + De * D7.z,
        DQ = Dt * D9.x + DH * D9.y + De * D9.z,
        Dj = Dt * D8.x + DH * D8.y + De * D8.z;
      DF = DR > -0.6 * Dk && DR < 1.6 * Dk && Math.abs(DQ) < 0.9 * Dk && Math.abs(Dj) < 0.45 * Dk;
    }
    if (DF)
      for (let Dz = 0; Dz < 9; Dz += 3) {
        let DO =
            Math.round(Dw[DE + Dz] * 100000) +
            ',' +
            Math.round(Dw[DE + Dz + 1] * 100000) +
            ',' +
            Math.round(Dw[DE + Dz + 2] * 100000),
          DJ = DV.get(DO);
        (DJ === void 0 &&
          ((DJ = DD.length / 3),
          DV.set(DO, DJ),
          DD.push(Dw[DE + Dz], Dw[DE + Dz + 1], Dw[DE + Dz + 2])),
          Dm.push(DJ));
      }
  }
  let DS = new D6['BufferGeomet' + 'ry']();
  return (
    DS.setAttribute('position', new D6['Float32Buffe' + 'rAttribute'](DD, 3)),
    DS.setIndex(Dm),
    DS.computeVertexNormals(),
    DS
  );
}
var Bs = null;
function rf({
  body: D3,
  wrist: D4,
  elbow: D5,
  side: D6,
  landmarker: D7,
  THREE: D8,
  views: D9 = 5,
  look: Dk = 'skin',
  onShot: Dw = null,
}) {
  let DV = ri(D3, D4, D5, D8);
  if (!DV) return { joints: new Map(), views: 0, read: 0 };
  Bs ||
    ((Bs = new D8['WebGLRendere' + 'r']({ antialias: !0, preserveDrawingBuffer: !0 })),
    Bs.setSize(Qu, Qu, !1));
  let DD = DV.length,
    Dm = ef[Dk] ?? ef.skin,
    DS = new D8.Mesh(
      kh(D3, D4, DV, D8),
      new D8['MeshStandard' + 'Material']({
        color: Dm.color,
        roughness: 0.75,
        side: D8.DoubleSide,
      }),
    ),
    DE = new D8['Scene']();
  DE.background = new D8['Color'](Dm.back);
  let DF = new D8['DirectionalL' + 'ight'](16777215, 2.4);
  (DE.add(DS, DF, DF.target, new D8['HemisphereLi' + 'ght'](16777215, 9079434, 1.1)),
    DS.updateMatrixWorld(!0));
  let DC = 0.8 * DD,
    Dt = D4.clone().addScaledVector(DV.dir, 0.5 * DD),
    DH = new D8['Orthographic' + 'Camera'](-DC, DC, DC, -DC, 0.01, 6 * DD),
    De = new D8['Raycaster'](),
    DR = Array.from({ length: 21 }, () => []),
    DQ = 0,
    Dj = 0;
  for (let DJ of [1, -1])
    for (let DZ = 0; DZ < D9; DZ++) {
      let DU = D9 === 1 ? 0 : ((DZ / (D9 - 1)) * 2 - 1) * (Math.PI / 3),
        DK = DV.palm.clone().multiplyScalar(DJ).applyAxisAngle(DV.dir, DU).normalize();
      (DH.position.copy(Dt).addScaledVector(DK, 3 * DD),
        DH.up.copy(DV.dir),
        DH.lookAt(Dt),
        DH.updateMatrixWorld(!0),
        DF.position.copy(DH.position).addScaledVector(DV.dir, DD),
        DF.target.position.copy(Dt),
        DF.target.updateMatrixWorld(!0),
        Bs.render(DE, DH),
        Dj++);
      let DT = D7.detect(Bs.domElement).landmarks?.[0] ?? null;
      if ((Dw?.(Bs.domElement, DT, { flip: DJ, turn: DU }), !DT)) continue;
      DQ++;
      let DA = new D8.Vector3().setFromMatrixColumn(DH.matrixWorld, 0),
        Dn = new D8['Vector3']().setFromMatrixColumn(DH.matrixWorld, 1),
        DX = DK.clone().negate();
      DT.forEach((DL, Db) => {
        De.set(
          DH.position
            .clone()
            .addScaledVector(DA, (DL.x * 2 - 1) * DC)
            .addScaledVector(Dn, (1 - DL.y * 2) * DC),
          DX,
        );
        let Dx = De.intersectObject(DS, !1);
        if (!Dx.length) return;
        let Dy = Dx[0].point,
          DW = Dx[1] && Dx[1].distance - Dx[0].distance < 0.4 * DD ? Dx[1].point : Dy;
        DR[Db].push(Dy.clone().add(DW).multiplyScalar(0.5));
      });
    }
  (DS.geometry.dispose(), DS.material.dispose());
  let Dz = (DL) => {
      let Db = [...DL].sort((Dx, Dy) => Dx - Dy);
      return Db.length % 2 ? Db[Db.length >> 1] : (Db[Db.length / 2 - 1] + Db[Db.length / 2]) / 2;
    },
    DO = new Map();
  return (
    DR.forEach((DL, Db) => {
      DL.length >= 2 &&
        DO.set(
          yh(Db, D6),
          new D8['Vector3'](
            Dz(DL.map((Dx) => Dx.x)),
            Dz(DL.map((Dx) => Dx.y)),
            Dz(DL.map((Dx) => Dx.z)),
          ),
        );
    }),
    { joints: DO, views: Dj, read: DQ }
  );
}
var ui = Object.fromEntries(Ps.filter((D3) => D3.twin).map((D3) => [D3.id, D3.twin])),
  vh = new Set(['chin', 'groin']);
function af({
  mount: D3,
  player: D4,
  THREE: D5,
  onSave: D6,
  onTurn: D7,
  onHeight: D8,
  onClose: D9,
  onBind: Dk,
  onTags: Dw,
  onJoints: DV,
  onMeasure: DD,
  onEnvelopes: Dm,
  onDigits: DS,
}) {
  let DE = !1,
    DF = '',
    DC = null,
    DH = null,
    De = null,
    DR = [],
    DQ = null,
    Dj = 0,
    Dz = 'unsure',
    DO = 0,
    DJ = new Set(),
    DZ = !0,
    DU = null,
    DK = !1,
    DT = 5,
    DA = new Set(),
    DX = null,
    DL = !1,
    Db = null,
    Dx = null,
    Dy = 'front',
    DW = 'l',
    Dq = !1,
    DP = '',
    DY = !1,
    Dv = !1,
    DB = '',
    DG = '',
    Dg = null,
    DI = [],
    Dh = [],
    DN = !1,
    DM = !1,
    m0 = !1,
    m1 = 0,
    m2 = {},
    m3 = [],
    m4 = null,
    m5 = '',
    m6 = null,
    m7 = null,
    m8 = {},
    m9 = !1,
    mk = null,
    mw = !1,
    mV = null,
    mD = [],
    mm = new Map(),
    mS = {},
    mE = null,
    mF = !1,
    mC = !1,
    mt = !1,
    mH = null,
    me = (Sv, SB, SG) => {
      let Sg = document.createElement(Sv);
      return (SB && (Sg.className = SB), SG != null && (Sg.textContent = SG), Sg);
    },
    mR = (Sv, SB, SG, Sg = 'lib-btn lib-btn--sm') => {
      let SI = me('button', Sg, Sv);
      return (
        (SI.type = 'button'),
        (SI.title = SB),
        SI.addEventListener('click', (SN) => {
          (SN.stopPropagation(), SG(SN));
        }),
        SI
      );
    };
  function mQ() {
    for (let Sv of Ps) {
      let SB = Yo(DH, ...De[Sv.id]);
      m2[Sv.id] = SB ? (SB.front + SB.back) / 2 : 0;
    }
  }
  let mj = (Sv) => Ki.has(Sv) && !DJ.has(Sv);
  function mz() {
    return Ps.map((Sv) => ({
      id: Sv.id,
      label: mj(Sv.id)
        ? Sv.label + ' \u2014 found on the mesh; drag it if it\u2019s wrong'
        : Sv.label,
      kind: mj(Sv.id) ? 'found' : 'placed',
      pos: new D5['Vector3'](De[Sv.id][0], De[Sv.id][1], m2[Sv.id] ?? 0),
    }));
  }
  let mO = (Sv = !0) => {
      De = Iu(De, DH, DC, D5, { own: DJ, mirror: DZ, mid: Dj, tips: Sv });
    },
    mJ = () => {
      let Sv = { ...De };
      for (let SB of ma) DJ.has(SB) || delete Sv[SB];
      return Sv;
    };
  function mZ() {
    let Sv = Vi(mJ(), DR, DQ, DC, D5, { digits: DT });
    ((m7 = Sv.joints),
      (DO = Sv.moved),
      (DX = Number.isFinite(Sv.head?.skullTop) ? Sv.head.skullTop : null));
  }
  function mU() {
    let Sv = (m6 = new Map(m7));
    for (let [Sg, SI] of Object.entries(m8)) Sv.has(Sg) && Sv.set(Sg, new D5['Vector3'](...SI));
    if (m8.head_top?.length === 3) Sv.set('head_top', new D5['Vector3'](...m8.head_top));
    else {
      if (Sv.has('Head') && DX != null) {
        let SN = Sv.get('Head');
        Sv.set('head_top', new D5['Vector3'](SN.x, Math.max(DX, SN.y + 0.05), SN.z));
      }
    }
    let SB = [],
      SG = [];
    for (let [SM, r0] of DC.parent) {
      if (
        !r0 ||
        !Sv.has(SM) ||
        !Sv.has(r0) ||
        /^(root|ik_|socket_)/.test(SM) ||
        /^(root|ik_|socket_)/.test(r0) ||
        mB(SM) ||
        mB(r0)
      )
        continue;
      let r1 = mv[mY(SM)].map((r2) => r2 * (/leaf/.test(SM) ? 0.55 : 1));
      (SB.push(...Sv.get(r0).toArray(), ...Sv.get(SM).toArray()), SG.push(...r1, ...r1));
    }
    if (Sv.has('Head') && Sv.has('head_top') && !mB('head_top')) {
      let r2 = mv.mid.map((r3) => r3 * 0.55);
      (SB.push(...Sv.get('Head').toArray(), ...Sv.get('head_top').toArray()),
        SG.push(...r2, ...r2));
    }
    (DU ||
      ((DU = new D5['LineSegments'](
        new D5['BufferGeomet' + 'ry'](),
        new D5['LineBasicMat' + 'erial']({
          vertexColors: !0,
          depthTest: !1,
          depthWrite: !1,
          transparent: !0,
          opacity: 0.9,
          toneMapped: !1,
        }),
      )),
      (DU.renderOrder = 1000),
      (DU.frustumCulled = !1),
      D4.addOverlay(DU)),
      DU.geometry.setAttribute('position', new D5['Float32Buffe' + 'rAttribute'](SB, 3)),
      DU.geometry.setAttribute('color', new D5['Float32Buffe' + 'rAttribute'](SG, 3)),
      mK());
  }
  function mK() {
    if ((Db && (D4.removeOverlay(Db), Db.geometry.dispose(), (Db = null)), !DL || !DY || !m6))
      return;
    Dx ??= kb(DC, D5);
    let { S: Sv } = kx({ j: m6, F: null, R0: Dx, THREE: D5 }),
      SB = [],
      SG = [],
      Sg = [
        [1, 0.27, 0.32],
        [0.45, 0.92, 0.32],
        [0.3, 0.58, 1],
      ];
    for (let [SI, SN] of Sv) {
      if (
        !m6.has(SI) ||
        !Dx.Q0.has(SI) ||
        /^(root|ik_|socket_)/.test(SI) ||
        /leaf/.test(SI) ||
        mB(SI) ||
        (mL(SI) && Dy !== 'fingers')
      )
        continue;
      let SM = SN.clone().multiply(Dx.Q0.get(SI)),
        r0 = m6.get(SI),
        r1 = kN[SI] && m6.get(kN[SI]),
        r2 = Math.min(Math.max((r1 ? r0.distanceTo(r1) : 0.08) * 0.33, 0.006), 0.06);
      [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ].forEach((r3, r4) => {
        (SB.push(
          ...r0.toArray(),
          ...new D5['Vector3'](...r3).applyQuaternion(SM).multiplyScalar(r2).add(r0).toArray(),
        ),
          SG.push(...Sg[r4], ...Sg[r4]));
      });
    }
    ((Db = new D5.LineSegments(
      new D5['BufferGeomet' + 'ry'](),
      new D5['LineBasicMat' + 'erial']({
        vertexColors: !0,
        depthTest: !1,
        depthWrite: !1,
        transparent: !0,
        opacity: 0.95,
        toneMapped: !1,
      }),
    )),
      Db.geometry.setAttribute('position', new D5['Float32Buffe' + 'rAttribute'](SB, 3)),
      Db.geometry.setAttribute('color', new D5['Float32Buffe' + 'rAttribute'](SG, 3)),
      (Db.renderOrder = 1001),
      (Db.frustumCulled = !1),
      D4.addOverlay(Db));
  }
  function mT() {
    (DU && (D4.removeOverlay(DU), DU.geometry.dispose(), (DU = null)),
      Db && (D4.removeOverlay(Db), Db.geometry.dispose(), (Db = null)));
  }
  let mA = () => D4.setMarkerEditor({ points: mz(), onDrag: Sj, onDrop: Sz }),
    mn = [
      'pelvis',
      'spine_01',
      'spine_02',
      'spine_03',
      'neck_01',
      'Head',
      'head_top',
      ...['l', 'r'].flatMap((Sv) =>
        [
          'clavicle',
          'upperarm',
          'lowerarm',
          'hand',
          'thigh',
          'calf',
          'foot',
          'ball',
          'ball_leaf',
        ].map((SB) => SB + '_' + Sv),
      ),
    ],
    mX = ['l', 'r'].flatMap((Sv) =>
      ['thumb', 'index', 'middle', 'ring', 'pinky'].flatMap((SB) =>
        ['01', '02', '03', '04_leaf'].map((SG) => SB + '_' + SG + '_' + Sv),
      ),
    ),
    mL = (Sv) => /^(thumb|index|middle|ring|pinky)_0(\d|4_leaf)_[lr]$/.test(Sv),
    mb = (Sv) => Sv === 'head_top' || /_leaf_[lr]$/.test(Sv),
    mx = () => Dy === 'free' || Dy === 'fingers',
    my = {
      pelvis: 'Pelvis',
      spine_01: 'Spine (low)',
      spine_02: 'Spine (middle)',
      spine_03: 'Chest',
      neck_01: 'Neck',
      Head: 'Head',
      head_top: 'Top of the head',
      clavicle: 'collarbone',
      upperarm: 'shoulder',
      lowerarm: 'elbow',
      hand: 'wrist',
      thigh: 'hip',
      calf: 'knee',
      foot: 'ankle',
      ball: 'ball of the foot',
      ball_leaf: 'tip of the toes',
    },
    mW = { '01': 'base knuckle', '02': 'middle knuckle', '03': 'top knuckle', '04_leaf': 'tip' },
    mq = (Sv) =>
      my[Sv] ??
      Sv.replace(
        /^(thumb|index|middle|ring|pinky)_(0\d(?:_leaf)?)_([lr])$/,
        (SB, SG, Sg, SI) => (SI === 'l' ? 'Left' : 'Right') + ' ' + SG + ', ' + mW[Sg],
      ).replace(
        /^(\w+)_([lr])$/,
        (SB, SG, Sg) => (Sg === 'l' ? 'Left' : 'Right') + ' ' + (my[SG] ?? SG),
      ),
    mP = (Sv) =>
      /_[lr]$/.test(Sv) ? Sv.replace(/_([lr])$/, (SB, SG) => (SG === 'l' ? '_r' : '_l')) : null,
    mY = (Sv) => (/_l$/.test(Sv) ? 'left' : /_r$/.test(Sv) ? 'right' : 'mid'),
    mv = { mid: [0.96, 0.82, 0.26], left: [0.25, 0.55, 1], right: [1, 0.31, 0.31] },
    mB = (Sv) => (mw && DZ && mY(Sv) === 'right') || DA.has(Sv);
  function mG() {
    return (Dy === 'fingers' ? [...mn, ...mX] : mn)
      .filter((Sv) => m6?.has(Sv))
      .map((Sv) => ({
        id: Sv,
        kind: mY(Sv),
        pos: m6.get(Sv).clone(),
        size: (mL(Sv) ? 0.3 : 1) * (mb(Sv) ? 0.65 : 1) * (m8[Sv] ? 1.45 : 1),
        hidden: mB(Sv),
        chosen: Sv === mk,
        label:
          '' +
          mq(Sv) +
          (m8[Sv] ? ' (moved)' : '') +
          ' \u2014 ' +
          (mx()
            ? 'click to pick it, then move it with the arrows'
            : 'drag to move it' + (Dy === 'side' ? ' (up and in depth)' : '')),
      }));
  }
  function mg() {
    (D4.setMarkerEditor(
      mx() ? { points: mG(), onSelect: mN } : { points: mG(), onDrag: S1, onDrop: S2 },
    ),
      D4.setPointGizmo(
        mx() && mk && m6?.has(mk) && !mB(mk)
          ? { pos: m6.get(mk), onMove: (Sv) => S0(mk, Sv), onEnd: S2 }
          : null,
      ));
  }
  function mI() {
    mB('hand_' + DW) && (DW = 'l');
    let Sv = ['hand_' + DW, ...mX.filter((Sg) => Sg.endsWith('_' + DW))]
      .filter((Sg) => m6?.has(Sg))
      .map((Sg) => m6.get(Sg));
    if (!Sv.length) return;
    let SB = Sv.reduce((Sg, SI) => Sg.add(SI), new D5.Vector3()).multiplyScalar(1 / Sv.length),
      SG = 2.2 * Math.max(...Sv.map((Sg) => Sg.distanceTo(SB)), 0.04);
    (((mk && !(mL(mk) || mk.startsWith('hand_'))) || mk?.slice(-1) !== DW) && (mk = null),
      D4.setFrontView('free', {
        at: SB.toArray(),
        reach: SG,
        from: [DW === 'l' ? 0.35 : -0.35, 0.75, 0.6],
      }));
  }
  function mN(Sv) {
    ((mk = Sv), mg(), SH(), SP());
  }
  let mM = !1;
  function S0(Sv, SB) {
    if (!DY || !m6?.has(Sv)) return null;
    DM || (SV(), (DM = !0));
    let SG = m6.get(Sv),
      Sg = SB.clone().sub(SG);
    DZ && !mP(Sv) && (Sg.x = 0);
    let SI = SG.clone().add(Sg);
    m8[Sv] = SI.toArray();
    let SN = DZ && mP(Sv);
    return (
      SN &&
        m6.has(SN) &&
        (m8[SN] = m6
          .get(SN)
          .clone()
          .add(new D5['Vector3'](-Sg.x, Sg.y, Sg.z))
          .toArray()),
      mU(),
      mM ||
        ((mM = !0),
        requestAnimationFrame(() => {
          ((mM = !1), DE && DY && D4.updateMarkers(mG()));
        })),
      SI
    );
  }
  function S1(Sv, SB, SG, Sg) {
    if (!DY || !m6?.has(Sv)) return;
    let SI = m6.get(Sv).clone();
    (Dy === 'side' ? ((SI.y = Sg?.y ?? SG), (SI.z = Sg?.z ?? SI.z)) : ((SI.x = SB), (SI.y = SG)),
      S0(Sv, SI));
  }
  function S2() {
    ((DM = !1), D4.updateMarkers(mG()), DV?.(structuredClone(m8)), Sk(), SP());
  }
  async function S3() {
    if (!(Dq || !DY || DT !== 5)) {
      ((Dq = !0),
        (DP = 'Fetching the hand model (about ' + di.megabytes + ' MB, the first time only)\u2026'),
        SP());
      try {
        let Sv = await sf();
        if (!DE || !DY) return;
        ((DP = 'Reading the hands\u2026'), SP(), await new Promise((Sg) => setTimeout(Sg, 30)));
        let SB = [],
          SG = {};
        for (let Sg of ['l', 'r']) {
          let SI = Sg === 'l' ? 'Left' : 'Right';
          if (!m6.has('hand_' + Sg) || !m6.has('lowerarm_' + Sg)) continue;
          let SN = rf({
              body: DH,
              wrist: m6.get('hand_' + Sg),
              elbow: m6.get('lowerarm_' + Sg),
              side: Sg,
              landmarker: Sv,
              THREE: D5,
            }),
            SM = of(Sg).filter((r0) => SN.joints.has(r0) && m6.has(r0));
          if (SN.read >= 3 && SM.length === 20) {
            for (let r0 of SM) SG[r0] = SN.joints.get(r0).toArray();
            SB.push(SI + ' hand read (' + SN.read + ' of ' + SN.views + ' views)');
          } else
            SB.push(
              SI +
                ' hand not read (' +
                SN.read +
                ' of ' +
                SN.views +
                ' views) \u2014 left as it was',
            );
        }
        (Object.keys(SG).length &&
          (SV(),
          Object.assign(m8, SG),
          DV?.(structuredClone(m8)),
          mk && SG[mk] && (mk = null),
          Sk(),
          mU(),
          mg(),
          SH()),
          (DP =
            'Detect fingers: ' +
            SB.join(' \u00B7 ') +
            '.' +
            (Object.keys(SG).length ? ' Ctrl+Z takes them back.' : '')));
      } catch (r1) {
        DP = 'Detect fingers: the hand model couldn\u2019t be used \u2014 ' + (r1?.message ?? r1);
      } finally {
        ((Dq = !1), DE && SP());
      }
    }
  }
  function S4() {
    (Sk(), Object.keys(m8).length && ((m8 = {}), (m9 = !0), DV?.({})));
  }
  let S5 = ci.envelope?.margin ?? 1.25,
    S6 = {
      pelvis: 'hips',
      spine_01: 'lower back',
      spine_02: 'middle back',
      spine_03: 'chest',
      neck_01: 'neck',
      Head: 'head',
      clavicle: 'collarbone',
      upperarm: 'upper arm',
      lowerarm: 'forearm',
      hand: 'hand',
      thigh: 'thigh',
      calf: 'shin',
      foot: 'foot',
      ball: 'toes',
    },
    S7 = { '01': 'first bone', '02': 'middle bone', '03': 'last bone' },
    S8 = (Sv) =>
      S6[Sv] ??
      Sv.replace(
        /^(thumb|index|middle|ring|pinky)_(0\d)_([lr])$/,
        (SB, SG, Sg, SI) => (SI === 'l' ? 'left' : 'right') + ' ' + SG + ', ' + S7[Sg],
      ).replace(
        /^(\w+)_([lr])$/,
        (SB, SG, Sg) => (Sg === 'l' ? 'left' : 'right') + ' ' + (S6[SG] ?? SG),
      ),
    S9 = (Sv) => !!Sv.active || mS[Sv.name] != null;
  function Sk() {
    mE && ((mC = !0), mF && SP());
  }
  let Sw = () => ({
    markers: De ? { ...De } : null,
    own: [...DJ],
    moved: structuredClone(m8),
    envSizes: { ...mS },
    tags: m3.map((Sv) => ({ ...Sv })),
  });
  function SV() {
    (DI.push(Sw()), DI.length > 60 && DI.shift(), (Dh.length = 0));
  }
  function SD(Sv) {
    (Sv.markers && (De = { ...Sv.markers }),
      (DJ = new Set(Sv.own)),
      (m8 = structuredClone(Sv.moved)),
      (mS = { ...Sv.envSizes }),
      (m3 = Sv.tags.map((SB) => ({ ...SB }))),
      D6({ ...De }, [...DJ]),
      DV?.(structuredClone(m8)),
      Dm?.({ ...mS }),
      Dw?.(m3.map((SB) => ({ ...SB }))),
      DY
        ? (mZ(), mU(), mg(), mk && !m6?.has(mk) && (mk = null), SL(), SZ(), Sk(), SH())
        : (mQ(), D4.updateMarkers(mz())),
      SP());
  }
  function Sm() {
    return !DE || Dv || !DI.length ? !1 : (Dh.push(Sw()), SD(DI.pop()), !0);
  }
  function SS() {
    return !DE || Dv || !Dh.length ? !1 : (DI.push(Sw()), SD(Dh.pop()), !0);
  }
  async function SE() {
    if (!DD || mt) return;
    ((mt = !0), (DB = ''), (m1 = 0), SP());
    let Sv = (SB, SG) => {
      m1 = SG ? SB / SG : 0;
      let Sg = D3.querySelector('.lib-retarget__status');
      Sg && mt && (Sg.textContent = Sq());
    };
    try {
      ((mE = await DD(
        mJ(),
        m3.map((SB) => ({ ...SB })),
        structuredClone(m8),
        Sv,
      )),
        (mC = !1));
    } catch (SB) {
      DB = SB?.message || String(SB);
    }
    ((mt = !1), SH(), SP());
  }
  function SF(Sv, SB, SG) {
    let Sg = [];
    for (let SI = -90; SI <= 0; SI += 15)
      Sg.push(
        new D5['Vector2'](Sv * Math.cos((SI * Math.PI) / 180), Sv * Math.sin((SI * Math.PI) / 180)),
      );
    for (let SN = 0; SN <= 90; SN += 15)
      Sg.push(
        new D5['Vector2'](
          SB * Math.cos((SN * Math.PI) / 180),
          SG + SB * Math.sin((SN * Math.PI) / 180),
        ),
      );
    return new D5.LatheGeometry(Sg, 20);
  }
  let SC = {};
  function SH() {
    if (mH) {
      for (let SB of mH.children) SB.geometry.dispose();
      (D4.removeOverlay(mH), (mH = null));
    }
    if (!mF || !mE || !DY) return;
    mH = new D5['Group']();
    let Sv = new D5['Vector3'](0, 1, 0);
    for (let SG of mE) {
      if (!(SG.r[0] > 0) || mB(SG.name) || (mL(SG.name) && Dy !== 'fingers')) continue;
      let Sg = S5 * (mS[SG.name] ?? 1),
        SI = new D5.Vector3(...SG.head),
        SN = new D5['Vector3'](...SG.tail),
        SM = SI.distanceTo(SN);
      if (SM < 0.00001) continue;
      let r0 = SG.name === mk ? 'chosen' : S9(SG) ? 'on' : 'off',
        r1 = mY(SG.name) + ':' + r0;
      SC[r1] ??= new D5['MeshBasicMat' + 'erial']({
        color: new D5['Color'](...(r0 === 'chosen' ? [1, 1, 1] : mv[mY(SG.name)])),
        transparent: !0,
        opacity: r0 === 'chosen' ? 0.3 : r0 === 'on' ? 0.2 : 0.07,
        depthWrite: !1,
        side: D5.DoubleSide,
        toneMapped: !1,
      });
      let r2 = new D5['Mesh'](SF(SG.r[0] * Sg, SG.r[1] * Sg, SM), SC[r1]);
      (r2.position.copy(SI),
        r2.quaternion.setFromUnitVectors(Sv, SN.clone().sub(SI).normalize()),
        (r2.renderOrder = 997),
        (r2.frustumCulled = !1),
        mH.add(r2));
    }
    D4.addOverlay(mH);
  }
  function SR(Sv, SB) {
    let SG = (SI, SN) => {
      Math.abs(SN - 1) < 0.001 ? delete mS[SI] : (mS[SI] = +SN.toFixed(3));
    };
    SG(Sv, SB);
    let Sg = DZ && mP(Sv);
    (Sg && SG(Sg, SB), SH());
  }
  function SQ() {
    DK ||
      ((DK = !0),
      requestAnimationFrame(() => {
        ((DK = !1), DE && !DY && D4.updateMarkers(mz()));
      }));
  }
  function Sj(Sv, SB, SG) {
    if (Dy !== 'front' || DY) return;
    (DN || (SV(), (DN = !0)), DZ && vh.has(Sv) && (SB = Dj));
    let Sg = /^wrist_([lr])$/.exec(Sv),
      SI = Sg && De[Sv];
    if (Sg) {
      for (let [SN, SM, r0] of [
        [Sv, 'tip_' + Sg[1], 1],
        ...(DZ ? [[ui[Sv], 'tip_' + ui[Sv].slice(-1), -1]] : []),
      ])
        !DJ.has(SM) &&
          De[SM] &&
          SN &&
          (De[SM] = [De[SM][0] + r0 * (SB - SI[0]), De[SM][1] + (SG - SI[1])]);
    }
    ((De[Sv] = [SB, SG]),
      Ki.has(Sv) && DJ.add(Sv),
      DZ && ui[Sv] && ((De[ui[Sv]] = [2 * Dj - SB, SG]), Ki.has(Sv) && DJ.add(ui[Sv])),
      S4(),
      mO(!1),
      SQ());
  }
  function Sz() {
    ((DN = !1), mO(), mQ(), D4.updateMarkers(mz()), D6({ ...De }, [...DJ]), SP());
  }
  function SO() {
    ((DY = !0), (m9 = !1), mZ(), mU(), mg(), SL(), SZ(), Sk(), SH(), SP());
  }
  function SJ() {
    if (mV) return mV;
    let Sv = new D5['MeshBasicMat' + 'erial']({ side: D5.DoubleSide });
    return (
      (mV = DR.map((SB, SG) => {
        let Sg = SB.geometry.clone();
        Sg.applyMatrix4(new D5['Matrix4']().multiplyMatrices(DQ, SB.matrixWorld));
        let SI = new D5['Mesh'](Sg, Sv);
        return ((SI.userData.mesh = SG), SI.updateMatrixWorld(!0), SI);
      })),
      mV
    );
  }
  let SZ = () => D4.setMeshPicker(DY && m4 ? { targets: SJ(), onPick: SA } : null),
    SU = (Sv) => Sv.mesh + ':' + Sv.vertex,
    SK = () => {
      (Dw?.(m3.map((Sv) => ({ ...Sv }))), Sk());
    },
    ST = (Sv) => {
      (SV(), Sv());
    };
  function SA({ object: Sv, faceIndex: SB }) {
    let SG = Sv.userData.mesh,
      Sg = DR[SG].geometry,
      SI = Sg.index ? Sg.index.getX(3 * SB) : 3 * SB,
      SN = Yi(Sg, SI),
      SM = { mesh: SG, vertex: SN[0] },
      r0 = DR.reduce((r3, r4) => r3 + r4.geometry.attributes.position.count, 0);
    if (m4 !== 'clear' && SN.length > 0.4 * r0) {
      ((m5 =
        'That\u2019s the body itself \u2014 tag the loose pieces on it (a cape, a skirt, a sword).'),
        SP());
      return;
    }
    ((m5 = ''), mm.set(SU(SM), SN.length));
    let r1 = m3.findIndex((r3) => SU(r3) === SU(SM)),
      r2 = r1 >= 0 && m3[r1].kind === m4;
    (r1 < 0 && m4 === 'clear') ||
      (SV(),
      r1 >= 0 && m3.splice(r1, 1),
      !r2 && m4 === 'cloth' && m3.push({ ...SM, kind: 'cloth' }),
      !r2 && m4 === 'prop' && m3.push({ ...SM, kind: 'prop', bone: Sn(Sv.geometry, SN) }),
      SK(),
      SL(),
      SP());
  }
  function Sn(Sv, SB) {
    if (!m6) return 'pelvis';
    let SG = [];
    for (let [r3, r4] of DC.parent)
      !r4 ||
        !li(r4) ||
        /^(ik_|socket_)/.test(r3) ||
        !m6.has(r3) ||
        !m6.has(r4) ||
        SG.push([r4, m6.get(r4), m6.get(r3)]);
    let Sg = Sv.attributes.position,
      SI = new D5['Vector3'](),
      SN = new D5['Line3'](),
      SM = new D5['Vector3'](),
      r0 = 1 / 0,
      r1 = 'pelvis',
      r2 = Math.max(1, Math.floor(SB.length / 1500));
    for (let r5 = 0; r5 < SB.length; r5 += r2) {
      SI.fromBufferAttribute(Sg, SB[r5]);
      for (let [r6, r7, r8] of SG) {
        SN.set(r7, r8).closestPointToPoint(SI, !0, SM);
        let r9 = SM.distanceToSquared(SI);
        r9 < r0 && ((r0 = r9), (r1 = r6));
      }
    }
    return r1.replace(/^(thumb|index|middle|ring|pinky)_\d+_([lr])$/, 'hand_$2');
  }
  let SX = {};
  function SL() {
    for (let SB of mD) (D4.removeOverlay(SB), SB.geometry.dispose());
    if (((mD = []), !DY)) return;
    let Sv = SJ();
    for (let SG of m3) {
      let Sg = Sv[SG.mesh]?.geometry;
      if (!Sg) continue;
      let SI = new Uint8Array(Sg.attributes.position.count),
        SN = Yi(DR[SG.mesh].geometry, SG.vertex);
      mm.set(SU(SG), SN.length);
      for (let r5 of SN) SI[r5] = 1;
      let SM = Sg.index,
        r0 = SM ? SM.count : Sg.attributes.position.count,
        r1 = (r6) => (SM ? SM.getX(r6) : r6),
        r2 = [];
      for (let r6 = 0; r6 + 2 < r0; r6 += 3)
        SI[r1(r6)] && SI[r1(r6 + 1)] && SI[r1(r6 + 2)] && r2.push(r1(r6), r1(r6 + 1), r1(r6 + 2));
      let r3 = new D5['BufferGeomet' + 'ry']();
      (r3.setAttribute('position', Sg.attributes.position),
        r3.setIndex(r2),
        (SX[SG.kind] ??= new D5['MeshBasicMat' + 'erial']({
          color: SG.kind === 'cloth' ? 16731469 : 4172287,
          transparent: !0,
          opacity: 0.55,
          side: D5.DoubleSide,
          depthWrite: !1,
          polygonOffset: !0,
          polygonOffsetFactor: -1,
          polygonOffsetUnits: -4,
          toneMapped: !1,
        })));
      let r4 = new D5['Mesh'](r3, SX[SG.kind]);
      ((r4.renderOrder = 998), (r4.frustumCulled = !1), D4.addOverlay(r4), mD.push(r4));
    }
  }
  function Sb() {
    D4.setMeshPicker(null);
    for (let Sv of mV ?? []) Sv.geometry.dispose();
    mV = null;
  }
  async function Sx() {
    ((Dv = !0), (DB = ''), (m1 = 0), (DG = ''), (Dg = new AbortController()));
    let { signal: Sv } = Dg;
    (SP(),
      await new Promise((Sg) => {
        (requestAnimationFrame(() => setTimeout(Sg, 30)), setTimeout(Sg, 100));
      }));
    let SB = (Sg, SI) => {
        m1 = SI ? Sg / SI : 0;
        let SN = D3.querySelector('.lib-retarget__status');
        SN && Dv && (SN.textContent = Sq());
      },
      SG = (Sg) => {
        DG = Sg;
        let SI = D3.querySelector('.lib-retarget__status');
        SI && Dv && (SI.textContent = Sq());
      };
    try {
      (await Dk(
        mJ(),
        [...DJ],
        m3.map((Sg) => ({ ...Sg })),
        structuredClone(m8),
        { ...mS },
        SB,
        { signal: Sv, stage: SG },
      ),
        (Dv = !1));
    } catch (Sg) {
      ((Dv = !1),
        (DB =
          Sg?.name === 'AbortError'
            ? 'Binding cancelled \u2014 nothing was changed.'
            : Sg?.message || String(Sg)),
        SP());
    } finally {
      ((Dg = null), (DG = ''));
    }
  }
  function Sy() {
    ((DY = !1),
      (DB = ''),
      (m4 = null),
      (mk = null),
      Dy !== 'front' && ((Dy = 'front'), D4.setFrontView('front')),
      D4.setMarkerEditor(null),
      D4.setPointGizmo(null),
      SZ(),
      SL(),
      mT(),
      SH(),
      mA(),
      SP());
  }
  function SW() {
    let Sv = [];
    (Dz === 'back' &&
      Sv.push('It seems to face away from you \u2014 turn it round (\u27F2 twice).'),
      Dz === 'side' &&
        Sv.push(
          'It seems to stand side-on \u2014 turn it a quarter (\u27F2 or \u27F3) so it faces you.',
        ),
      Sv.push(...Pu(De)));
    for (let SB of Ps) {
      if (ma.includes(SB.id)) continue;
      let [SG, Sg] = De[SB.id];
      if (Yo(DH, SG, Sg + (SB.id === 'groin' ? 0.03 * DH.height : 0))) continue;
      let SI = SB.id.replace(
        /^(\w+)_([lr])$/,
        (SN, SM, r0) => (r0 === 'l' ? 'left' : 'right') + ' ' + SM,
      );
      Sv.push('The ' + SI + ' dot isn\u2019t on the body \u2014 drag it onto the ' + SI + '.');
    }
    return Sv;
  }
  function Sq(Sv = DY ? [] : SW()) {
    return Dv
      ? DG ||
          'Weighting \u201C' +
            DF +
            '\u201D\u2019s mesh to the skeleton\u2026' +
            (m1 > 0 ? ' ' + Math.round(m1 * 100) + '%' : '')
      : mt
        ? 'Measuring the envelopes (the same weighing Bind runs)\u2026' +
          (m1 > 0 ? ' ' + Math.round(m1 * 100) + '%' : '')
        : DB ||
          (DY
            ? '\u201C' +
              DF +
              '\u201D \u00B7 skeleton built from the dots' +
              (Math.abs(DO) > 0.005
                ? ' \u00B7 chin put on the jaw line (' +
                  (DO > 0 ? 'up' : 'down') +
                  ' ' +
                  Math.round(Math.abs(DO) * 100) +
                  ' cm)'
                : '') +
              (Object.keys(m8).length
                ? ' \u00B7 ' +
                  Object.keys(m8).length +
                  ' joint' +
                  (Object.keys(m8).length === 1 ? '' : 's') +
                  ' moved since Rig'
                : '')
            : Sv.length
              ? Sv[0]
              : m9
                ? 'A dot moved, so the joints you moved after Rig were let go \u2014 the skeleton is built from the dots again.'
                : '\u201C' + DF + '\u201D \u00B7 dots placed \u00B7 press Rig');
  }
  function SP() {
    if (!DE) return;
    D3.innerHTML = '';
    let Sv = DY ? [] : SW(),
      SB = me('div', 'lib-comp__head');
    SB.appendChild(me('span', 'lib-comp__title', 'Rig it'));
    let SG = mR('\u21B6', 'Undo (Ctrl+Z)', Sm, 'lib-btn lib-btn--sm');
    ((SG.disabled = Dv || !DI.length), SG.setAttribute('aria-label', 'Undo'));
    let Sg = mR('\u21B7', 'Redo (Ctrl+Shift+Z)', SS, 'lib-btn lib-btn--sm');
    ((Sg.disabled = Dv || !Dh.length),
      Sg.setAttribute('aria-label', 'Redo'),
      SB.append(SG, Sg),
      SB.appendChild(
        Dv
          ? mR('Cancel', 'Stop binding \u2014 nothing is changed', () => Dg?.abort())
          : mR('Close', 'Back to the Character tool \u2014 the dots are kept', () => D9()),
      ),
      D3.appendChild(SB));
    let SI = me('p', 'lib-retarget__status' + (Sv.length || DB ? ' is-warn' : ' is-ready'));
    ((SI.textContent = Sq(Sv)), D3.appendChild(SI));
    let SN = me('ol', 'lib-autorig__steps');
    if (DY)
      SN.append(
        me(
          'li',
          null,
          'The lines are the skeleton \u2014 the middle yellow, the left blue, the right red: each bone should run down the middle of its limb. Check from the side too.',
        ),
        me(
          'li',
          null,
          'A dot is a joint \u2014 where its bone turns, not where it ends. The fainter lines past the last joints (fingertips, toes, the top of the head) are the end bones; the smaller dot at each end moves it, if it doesn\u2019t reach the end of the mesh.',
        ),
        me(
          'li',
          null,
          'A joint a little off? Drag it \u2014 from the front, the side or the back. Way off? Go back to the dots, move one, and Rig again.',
        ),
        me(
          'li',
          null,
          'A cape, a skirt, a sword? Tag it below \u2014 or leave it, and it is weighted as body.',
        ),
        me(
          'li',
          null,
          'Bind & wear: the mesh is weighted to the skeleton and the character plays the clips.',
        ),
      );
    else {
      SN.append(me('li', null, 'It should face you, standing. If it doesn\u2019t, turn it:'));
      let r1 = me('div', 'lib-retarget__tools'),
        r2 = (r5) => {
          ((DI.length || DJ.size || Object.keys(m8).length) &&
            !confirm(
              'Turning it places the dots again from scratch \u2014 the ones you moved are lost. Turn it?',
            )) ||
            D7(r5);
        };
      (r1.append(
        mR('\u27F2 Turn left', 'A quarter turn, so its front faces you', () => r2(-1)),
        mR('\u27F3 Turn right', 'A quarter turn the other way', () => r2(1)),
      ),
        SN.appendChild(r1));
      let r3 = me('label', 'lib-autorig__height');
      r3.append('Height ');
      let r4 = me('input');
      ((r4.type = 'number'),
        (r4.min = '0.3'),
        (r4.max = '3'),
        (r4.step = '0.01'),
        (r4.value = DH.height.toFixed(2)),
        (r4.title = 'How tall the character stands, in metres'),
        r4.addEventListener('change', () => {
          let r5 = Number(r4.value);
          r5 >= 0.3 && r5 <= 3 && Math.abs(r5 - DH.height) > 0.005
            ? D8?.(r5, DH.height)
            : (r4.value = DH.height.toFixed(2));
        }),
        r3.append(r4, ' m'),
        SN.appendChild(r3),
        SN.append(
          me(
            'li',
            null,
            'Drag the orange dots onto the chin (under it, where the jaw meets the neck), shoulders, wrists, groin and ankles. Hover one for its name.',
          ),
          me(
            'li',
            null,
            'The white dots \u2014 elbows, knees and the fingertips \u2014 find themselves on the mesh. Drag one only if it\u2019s wrong.',
          ),
          me(
            'li',
            null,
            'A hand that comes out wrong? Drag its fingertip dot onto the tip of the middle finger: the hand then runs from the wrist to it, and isn\u2019t guessed.',
          ),
          me('li', null, 'Press Rig.'),
        ));
    }
    D3.appendChild(SN);
    {
      let r5 = me('label', 'lib-autorig__height');
      r5.title =
        'How many digits each hand has, the thumb counted. Fewer than five: the fingers kept are the index, then the middle, then the ring \u2014 the pinky is the first to go. The others\u2019 bones stay in the skeleton with nothing weighted to them, so every clip still plays.';
      let r6 = me('select');
      for (let [r9, rk] of [
        [5, 'Five'],
        [4, 'Four \u2014 no pinky'],
        [3, 'Three \u2014 no pinky, no ring'],
        [2, 'Mitten \u2014 a thumb and one'],
      ]) {
        let rw = me('option', null, rk);
        ((rw.value = r9), r6.appendChild(rw));
      }
      ((r6.value = String(DT)),
        (r6.disabled = Dv || mt),
        r6.addEventListener('change', () => {
          ((DT = wa.includes(+r6.value) ? +r6.value : 5),
            (DA = new Set(ai(DT))),
            DS?.(DT),
            mk && mB(mk) && (mk = null),
            DY && (mZ(), Sk(), mU(), mg(), SH()),
            SP());
        }),
        r5.append('Fingers ', r6),
        D3.appendChild(r5));
      let r7 = me('div', 'lib-retarget__tools'),
        r8 = mR(
          Dq ? 'Reading the hands\u2026' : 'Detect fingers',
          'Find every finger joint of both hands with a hand-landmark model, and put them there. Five-fingered hands, after Rig. The first time, the browser fetches the model from this site \u2014 about ' +
            di.megabytes +
            ' MB \u2014 and keeps it. It runs on this computer: nothing of the character is sent anywhere. The joints are then yours to move; Reset joints or Ctrl+Z takes them back.',
          S3,
        );
      ((r8.disabled = Dq || Dv || mt || !DY || DT !== 5),
        r7.appendChild(r8),
        D3.appendChild(r7),
        D3.appendChild(
          me(
            'p',
            'lib-autorig__taghint',
            DP ||
              (DT !== 5
                ? 'Detect fingers: five-fingered hands only.'
                : DY
                  ? 'Detect fingers: finds the finger joints for you. Changes only the fingers.'
                  : 'Detect fingers: after Rig.'),
          ),
        ));
    }
    let SM = me('div', 'lib-retarget__tools'),
      r0 = (rV, rD, rm) =>
        mR(
          rV,
          rm,
          () => {
            ((Dy = rD),
              mK(),
              rD === 'fingers' ? mI() : D4.setFrontView(rD),
              rD !== 'fingers' && mk && mL(mk) && (mk = null),
              mg(),
              SH(),
              SP());
          },
          'lib-btn lib-btn--axis' + (Dy === rD ? ' is-on' : ''),
        );
    if (
      DY &&
      (SM.append(
        r0('Front', 'front', 'The skeleton from the front: drag a joint across and up'),
        r0(
          'Side',
          'side',
          'The skeleton from the side: each joint in the middle of its limb \u2014 drag one up and in depth',
        ),
        r0('Back', 'back', 'From behind: to tag a cape or what hangs on the back'),
        r0(
          'Free',
          'free',
          'Orbit, zoom and pan as you like: click a joint, then move it with the arrows',
        ),
        r0(
          'Fingers',
          'fingers',
          'Finger adjust: close on one hand, orbiting as you like \u2014 click a knuckle, then move it with the arrows',
        ),
      ),
      D3.appendChild(SM),
      Dy === 'fingers')
    ) {
      let rV = me('div', 'lib-retarget__tools'),
        rD = (rm, rS) => {
          let rE = mR(
            rS,
            'Adjust the ' + rS.toLowerCase() + "'s fingers",
            () => {
              ((DW = rm), mI(), mg(), SP());
            },
            'lib-btn lib-btn--sm' + (DW === rm ? ' is-on' : ''),
          );
          return ((rE.disabled = mB('hand_' + rm)), rE);
        };
      (rV.append(rD('l', 'Left hand'), rD('r', 'Right hand')), D3.appendChild(rV));
    }
    if (DY) {
      let rm = me('div', 'lib-autorig__tags');
      rm.appendChild(me('p', 'lib-autorig__tagshead', 'Cloth and props'));
      let rS = me('div', 'lib-retarget__tools'),
        rE = (rC, rt, rH) =>
          mR(
            rt,
            rH,
            () => {
              ((m4 = m4 === rC ? null : rC), (m5 = ''), SZ(), SP());
            },
            'lib-btn lib-btn--sm lib-autorig__tool is-' + rC + (m4 === rC ? ' is-on' : ''),
          );
      (rS.append(
        rE(
          'cloth',
          'Cloth',
          'Then click a cape, a skirt or a flap: it follows the body smoothly \u2014 the pelvis and thighs below the hips, the spine and collarbones above \u2014 never the calves',
        ),
        rE(
          'prop',
          'Prop',
          'Then click a sword, a quiver or a pouch: it moves rigidly with one bone, which you can change',
        ),
        rE('clear', 'Untag', 'Then click a tagged piece: weighted as body again'),
      ),
        rm.appendChild(rS),
        m5 && rm.appendChild(me('p', 'lib-retarget__issue', m5)),
        rm.appendChild(
          me(
            'p',
            'lib-autorig__taghint',
            m4
              ? 'Click a piece on the model to ' +
                  (m4 === 'clear' ? 'untag it' : 'tag it as ' + m4) +
                  '. Back view for what hangs behind.'
              : 'Everything is weighted as body unless you tag it.',
          ),
        ));
      let rF = [...DC.bones.keys()].filter(li);
      for (let rC of m3) {
        let rt = me('div', 'lib-autorig__tag is-' + rC.kind);
        if (
          (rt.appendChild(me('span', 'lib-autorig__swatch')),
          rt.appendChild(
            me(
              'span',
              'lib-autorig__tagname',
              (rC.kind === 'cloth' ? 'Cloth' : 'Prop') +
                ' \u00B7 ' +
                (mm.get(SU(rC)) ?? 0).toLocaleString() +
                ' vertices',
            ),
          ),
          rC.kind === 'prop')
        ) {
          let rH = me('select');
          rH.title = 'The bone it moves with';
          for (let re of rF) {
            let rR = me('option', null, re);
            ((rR.value = re), (rR.selected = re === rC.bone), rH.appendChild(rR));
          }
          (rH.addEventListener('change', () => {
            (SV(), (rC.bone = rH.value), SK());
          }),
            rt.appendChild(rH));
        }
        (rt.appendChild(
          mR(
            '\u2715',
            'Untag it: weighted as body',
            () =>
              ST(() => {
                ((m3 = m3.filter((rQ) => rQ !== rC)), SK(), SL(), SP());
              }),
            'lib-btn lib-btn--sm lib-autorig__untag',
          ),
        ),
          rm.appendChild(rt));
      }
      D3.appendChild(rm);
    }
    if (DY && DD) {
      let rQ = me('div', 'lib-autorig__tags lib-autorig__env');
      rQ.appendChild(me('p', 'lib-autorig__tagshead', 'Envelopes'));
      let rj = me('div', 'lib-retarget__tools'),
        rz = mR(
          mF ? 'Hide envelopes' : 'Show envelopes',
          'The space each bone moves: its weight fades outside what is drawn. Measured by the same weighing Bind runs.',
          () => {
            ((mF = !mF), mF && (!mE || mC) ? SE() : (SH(), SP()));
          },
          'lib-btn lib-btn--sm' + (mF ? ' is-on' : ''),
        );
      if (((rz.disabled = mt || Dv), rj.appendChild(rz), mF && mE && mC)) {
        let rJ = mR(
          'Measure again',
          'A joint, a dot or a tag changed since they were measured',
          SE,
          'lib-btn lib-btn--sm',
        );
        ((rJ.disabled = mt || Dv), rj.appendChild(rJ));
      }
      (Object.keys(mS).length &&
        rj.appendChild(
          mR(
            'Reset sizes',
            'Every envelope back to its measured size',
            () => {
              (SV(), (mS = {}), Dm?.({}), SH(), SP());
            },
            'lib-btn lib-btn--sm',
          ),
        ),
        rQ.appendChild(rj),
        mF &&
          mE &&
          mC &&
          rQ.appendChild(
            me(
              'p',
              'lib-retarget__issue',
              'Out of date: something moved since they were measured.',
            ),
          ));
      let rO = mF && mE && mk ? mE.find((rZ) => rZ.name === mk && rZ.r[0] > 0) : null;
      if (rO) {
        let rZ = me('div', 'lib-autorig__envsize'),
          rU = mS[rO.name] ?? 1;
        rZ.appendChild(me('span', 'lib-autorig__tagname', 'The ' + S8(rO.name)));
        let rK = me('input');
        ((rK.type = 'range'),
          (rK.min = '0.5'),
          (rK.max = '2'),
          (rK.step = '0.05'),
          (rK.value = String(rU)),
          (rK.title =
            'Bigger: the bone reaches further into what is round it. Smaller: it lets go sooner.'));
        let rT = me('span', 'lib-autorig__envk', '\u00D7' + rU.toFixed(2));
        (rK.addEventListener('input', () => {
          (m0 || (SV(), (m0 = !0)),
            SR(rO.name, Number(rK.value)),
            (rT.textContent = '\u00D7' + Number(rK.value).toFixed(2)));
        }),
          rK.addEventListener('change', () => {
            ((m0 = !1), Dm?.({ ...mS }), SP());
          }),
          rZ.append(rK, rT),
          mS[rO.name] != null &&
            rZ.appendChild(
              mR(
                'Reset',
                'Back to its measured size',
                () => {
                  (SV(), SR(rO.name, 1), Dm?.({ ...mS }), SP());
                },
                'lib-btn lib-btn--sm',
              ),
            ),
          rQ.appendChild(rZ),
          rQ.appendChild(
            me(
              'p',
              'lib-autorig__taghint',
              S9(rO)
                ? 'Its weight fades outside it' +
                    (DZ && mP(rO.name) ? ' \u2014 both sides, Mirror on' : '') +
                    '. Bind & wear to weigh with it.'
                : 'It limits nothing yet: size it, and its weight fades outside it.',
            ),
          ));
      } else
        mF && mE
          ? rQ.appendChild(
              me(
                'p',
                'lib-autorig__taghint',
                mx()
                  ? 'Click a joint to size the envelope of the bone that starts there.'
                  : 'In the free view (or Fingers), click a joint to size the envelope of the bone that starts there.',
              ),
            )
          : mF ||
            rQ.appendChild(
              me('p', 'lib-autorig__taghint', 'The space each bone moves, and how big it is.'),
            );
      D3.appendChild(rQ);
    }
    if (DY) {
      let rA = me('div', 'lib-retarget__tools'),
        rn = mR(
          'Bind & wear \u2713',
          'Weight the mesh to the skeleton and wear it',
          Sx,
          'lib-btn lib-btn--sm is-good',
        ),
        ro = mR('\u25C2 Back to the dots', 'Move a dot, then Rig again', Sy);
      ((rn.disabled = ro.disabled = Dv || mt),
        rA.append(ro, rn),
        Object.keys(m8).length &&
          rA.append(
            mR(
              'Reset joints',
              'Every joint back where the dots put it (Ctrl+Z brings them back)',
              () => {
                (SV(), (m8 = {}), DV?.({}), Sk(), mU(), mg(), SP());
              },
            ),
          ));
      let rX = me('label', 'lib-check lib-retarget__hold'),
        rL = me('input');
      ((rL.type = 'checkbox'),
        (rL.checked = DZ),
        rL.addEventListener('change', () => {
          ((DZ = rL.checked), !DZ && mw && ((mw = !1), mU(), mg(), SP()));
        }),
        rX.append(rL, ' Mirror left and right'),
        D3.appendChild(rX));
      let rb = me('label', 'lib-check lib-retarget__hold'),
        rx = me('input');
      ((rx.type = 'checkbox'),
        (rx.checked = mw && DZ),
        (rx.disabled = !DZ),
        rx.addEventListener('change', () => {
          ((mw = rx.checked), mk && mB(mk) && (mk = null), mU(), mg(), SH());
        }),
        (rb.title = DZ
          ? 'Hide the right side\u2019s joints: they still follow the left'
          : 'Needs Mirror: a hidden side must follow the other'),
        rb.append(rx, ' Show one side (the right follows)'),
        D3.appendChild(rb));
      let ry = me('label', 'lib-check lib-retarget__hold'),
        rW = me('input');
      ((rW.type = 'checkbox'),
        (rW.checked = DL),
        rW.addEventListener('change', () => {
          ((DL = rW.checked), mK());
        }),
        (ry.title =
          'Each bone\u2019s own axes at its joint, as it will stand once bound: X red, Y green (along the bone), Z blue. Worked out from the joints: a bone points at its next joint; its roll comes from the bend of the elbow or knee, the palm\u2019s line, the foot kept flat; a finger takes its hand\u2019s. The fingers\u2019 show in Fingers.'),
        ry.append(rW, ' Show bone axes'),
        D3.appendChild(ry),
        D3.appendChild(rA));
    } else {
      let rq = me('div', 'lib-retarget__tools'),
        rP = me('label', 'lib-check lib-retarget__hold'),
        rY = me('input');
      ((rY.type = 'checkbox'),
        (rY.checked = DZ),
        rY.addEventListener('change', () => {
          DZ = rY.checked;
        }),
        rP.append(rY, ' Mirror left and right'),
        rq.append(
          rP,
          mR(
            'Reset dots',
            'Every dot back where it was guessed, the elbows, knees and fingertips found again (Ctrl+Z brings them back)',
            () => {
              (SV(),
                (DJ = new Set()),
                S4(),
                (De = ka(DH, DC, D5)),
                mO(),
                mQ(),
                D4.updateMarkers(mz()),
                D6({ ...De }, []),
                SP());
            },
          ),
        ),
        DJ.size &&
          rq.append(
            mR(
              'Find the white dots',
              'Let the elbows, knees and fingertips you moved find themselves again',
              () => {
                (SV(),
                  (DJ = new Set()),
                  S4(),
                  mO(),
                  mQ(),
                  D4.updateMarkers(mz()),
                  D6({ ...De }, []),
                  SP());
              },
            ),
          ),
        D3.appendChild(rq));
      let rv = me('div', 'lib-retarget__tools'),
        rB = mR(
          'Rig',
          Sv.length ? 'Fix the dots first' : 'Build the skeleton from the dots',
          SO,
          'lib-btn lib-btn--go',
        );
      ((rB.disabled = Sv.length > 0), rv.appendChild(rB), D3.appendChild(rv));
      for (let rG of Sv.slice(1)) D3.appendChild(me('p', 'lib-retarget__issue', rG));
    }
  }
  function SY() {
    ((DE = !1),
      (DY = !1),
      (m4 = null),
      (mk = null),
      D4.setMarkerEditor(null),
      D4.setPointGizmo(null),
      D4.setFrontView(!1),
      mT(),
      SL(),
      SH(),
      Sb());
  }
  return {
    get isOpen() {
      return DE;
    },
    open(Sv, SB) {
      (DE && SY(),
        (DI.length = 0),
        (Dh.length = 0),
        (DN = DM = m0 = !1),
        (Dx = null),
        (DT = wa.includes(SB.digits) ? SB.digits : 5),
        (DA = new Set(ai(DT))),
        (DE = !0),
        (DF = Sv),
        (DC = SB.ref),
        (DH = SB.body),
        (DR = SB.meshes),
        (DQ = SB.place),
        (Dj = ii(DH)),
        (Dz = $u(DH)),
        (Dy = 'front'),
        (DY = !1),
        (Dv = !1),
        (DB = ''),
        (DP = ''),
        (DJ = new Set(SB.own ?? [])),
        (m3 = (SB.tags ?? []).map((SG) => ({ ...SG }))),
        (m4 = null),
        (m6 = null),
        (m7 = null),
        (m8 = structuredClone(SB.joints ?? {})),
        (m9 = !1),
        (mk = null),
        (mS = { ...(SB.envelopes ?? {}) }),
        (mE = null),
        (mF = !1),
        (mC = !1),
        (mt = !1),
        mm.clear(),
        Sb(),
        (De = SB.markers ? { ...SB.markers } : ka(DH, DC, D5)),
        mO(),
        mQ(),
        D4.setFrontView(!0),
        mA(),
        SP(),
        SB.markers ? SB.rigged && SO() : D6({ ...De }, [...DJ]));
    },
    undo: Sm,
    redo: SS,
    get binding() {
      return Dv;
    },
    close: SY,
    markers: () => (De ? { ...De } : null),
  };
}
var _h = 100 * 1024 * 1024,
  xh = new Set(['exact', 'proportions']),
  Hi = (D3) => xh.has(D3?.tier) || (D3?.tier === 'custom' && D3.ready),
  Mh = 50 * 1024 * 1024,
  Xi = 2048,
  lf = [
    'map',
    'normalMap',
    'roughnessMap',
    'metalnessMap',
    'aoMap',
    'emissiveMap',
    'alphaMap',
    'bumpMap',
    'specularMap',
  ];
function Ch(D3) {
  D3.traverse((D4) => {
    if (!D4.isMesh) return;
    let D5 = (D6) => {
      if (!D6?.isMeshPhongMaterial && !D6?.isMeshLambertMaterial) return D6;
      let D7 = new D1({
        name: D6.name,
        color: D6.color,
        map: D6.map,
        normalMap: D6.normalMap,
        emissive: D6.emissive,
        emissiveMap: D6.emissiveMap,
        alphaMap: D6.alphaMap,
        transparent: D6.transparent,
        opacity: D6.opacity,
        alphaTest: D6.alphaTest,
        side: D6.side,
        roughness: 0.8,
        metalness: 0,
      });
      return (D6.dispose(), D7);
    };
    D4.material = Array.isArray(D4.material) ? D4.material.map(D5) : D5(D4.material);
  });
}
function Sh(D3) {
  let D4 = new D1({ name: 'grey', color: 11844033, roughness: 0.75, metalness: 0 });
  D3.traverse((D5) => {
    if (D5.isMesh) {
      for (let D6 of [].concat(D5.material || [])) D6?.dispose?.();
      D5.material = D4;
    }
  });
}
async function $h(D3) {
  let D4 = !1;
  if (
    (D3.scene.traverse((D7) => {
      for (let D8 of [].concat(D7.material || []))
        for (let D9 of lf) {
          let Dk = D8[D9]?.image;
          Dk && Math.max(Dk.width || 0, Dk.height || 0) > Xi && (D4 = !0);
        }
    }),
    !D4)
  )
    return null;
  D3.scene.traverse((D7) => {
    for (let D8 of [].concat(D7.material || []))
      for (let D9 of lf) {
        let Dk = D8[D9];
        if (!Dk) continue;
        let Dw = D9 === 'alphaMap' || (D9 === 'map' && (D8.transparent || D8.alphaTest > 0));
        Dk.userData.mimeType = Dw ? 'image/png' : 'image/jpeg';
      }
  });
  let { GLTFExporter: D5 } = await import('./dependencies/gltf-exporter.js'),
    D6 = {
      writeNode(D7, D8) {
        D7.userData?.name && (D8.name = D7.userData.name);
      },
    };
  return (
    O(D3.scene),
    new D5()
      .register(() => D6)
      .parseAsync(D3.scene, { binary: !0, maxTextureSize: Xi, animations: [] })
  );
}
function cf({
  mount: D3,
  player: D4,
  manifest: D5,
  assetRoot: D6,
  animals: D7 = null,
  onPick: D8,
  note: D9 = () => {},
  onChange: Dk = () => {},
  replay: Dw = async () => {},
  reveal: DV = () => {},
}) {
  let DD = new Vg(),
    Dm = null,
    DS = null,
    DE = [],
    DF = !1,
    DC = null,
    Dt = null,
    DH = null,
    De = (mS, mE, mF) => {
      let mC = document.createElement(mS);
      return (mE && (mC.className = mE), mF != null && (mC.textContent = mF), mC);
    },
    DR = (mS, mE, mF, mC = 'lib-btn lib-btn--axis') => {
      let mt = De('button', mC, mS);
      return (
        (mt.type = 'button'),
        (mt.title = mE),
        mt.addEventListener('click', (mH) => {
          (mH.stopPropagation(), mF(mH));
        }),
        mt
      );
    },
    DQ = (mS) => new Promise((mE, mF) => DD.parse(mS, '', mE, mF)),
    Dj = async (mS) => {
      let mE = await DQ(mS);
      return (kY(mE), mE);
    };
  async function Dz(mS) {
    let { FBXLoader: mE } = await import('./dependencies/fbx-loader.js'),
      mF,
      mC,
      mt = (mQ) => {
        let mj = new Vh(),
          mz = !1,
          mO;
        ((mC = new Promise((mZ) => {
          mO = mZ;
        })),
          (mj.onStart = () => {
            mz = !0;
          }),
          (mj.onLoad = () => mO()));
        let mJ = new mE(mj).parse(mQ, '');
        return (mz || mO(), mJ);
      };
    try {
      mF = mt(mS);
    } catch (mQ) {
      try {
        mF = mt(kg(new Uint8Array(mS)));
      } catch {
        throw mQ;
      }
    }
    let mH = Promise.race([mC, new Promise((mj) => setTimeout(mj, 8000))]),
      me = p(mF);
    kP(me);
    let mR = [];
    return (
      me.traverse((mj) => {
        mj.isSkinnedMesh && mR.push(mj);
      }),
      F(mR, VN),
      Ch(me),
      { scene: me, parser: { json: {} }, pictures: mH }
    );
  }
  let DO = () => D5.rigs?.human?.file ?? D5.rig?.file,
    DJ = () => Object.entries(D5.characters || {}).filter(([, mS]) => !mS.default),
    DZ = null;
  async function DU() {
    if (DH) return DH;
    let mS = await fetch(D6 + '/' + DO()),
      mE = (await DQ(await mS.arrayBuffer())).scene;
    ((DZ = mE), (DH = ky(mE, VN)));
    try {
      DH.hands = Lu(mE, DH, VN);
    } catch {}
    return DH;
  }
  async function DK(mS, mE = 'glb', mF = null) {
    let mC;
    try {
      mC = mE === 'fbx' ? await Dz(mS) : await Dj(mS);
    } catch (me) {
      let mR = String(me?.message || me);
      throw /DRACOLoader|KTX2Loader|MeshoptDecoder/i.test(mR)
        ? new Error(
            'This file is compressed. Export it again without compression (in Blender\u2019s glTF export, turn off Compression).',
          )
        : mE === 'fbx' && /version|binary|ascii/i.test(mR)
          ? new Error(
              'This FBX can\u2019t be read (' +
                mR.slice(0, 80) +
                '). Export it again as FBX 2014 or newer, binary.',
            )
          : new Error('That isn\u2019t a .' + mE + ' we can read (' + mR.slice(0, 120) + ').');
    }
    let mt = await C(mC.scene, D6, VN).catch(() => null),
      mH = kW(mC, await DU(), VN);
    if (
      mH.tier === 'reject' &&
      ((mH.stats?.coreFound ?? 1 / 0) < 8 ||
        /no skinned mesh|Missing (a main bone|main bones)/.test(mH.errors.join(' ')))
    ) {
      let mQ = kO(mC, await DU(), VN, { map: mF, rigMaps: (mj) => A.find(mj), preset: mt });
      if (mQ.tier === 'custom') mH = mQ;
      else {
        if (/no skinned mesh/.test(mH.errors.join(' ')) && si(mC.scene).length) {
          let mj = si(mC.scene);
          mH = {
            tier: 'unrigged',
            errors: [],
            warnings: [],
            fixes: [
              'No skeleton yet: put dots on its joints and press Rig \u2014 ours is fitted to it.',
            ],
            stats: {
              meshes: mj.length,
              vertices: mj.reduce((mz, mO) => mz + mO.geometry.attributes.position.count, 0),
            },
          };
        }
      }
    }
    return { gltf: mC, report: mH, preset: mt };
  }
  async function DT(mS) {
    let mE = await K.list().catch(() => []),
      mF = new Set([...mS].map(kz)),
      mC = null,
      mt = 0;
    for (let mQ of mE) {
      if (mQ.kind !== 'custom' || !mQ.map?.pelvis) continue;
      let mj = Object.values(mQ.map);
      if (!mF.has(kz(mQ.map.pelvis))) continue;
      let mz = mj.filter((mO) => mF.has(kz(mO))).length / mj.length;
      (mz > mt || (mz === mt && (mQ.created || 0) > (mC?.created || 0))) && ((mC = mQ), (mt = mz));
    }
    if (!mC || mt < 0.9) return null;
    let mH = await K.get(mC.id);
    if (!mH?.blob) return null;
    let { gltf: me, report: mR } = await DK(
      await mH.blob.arrayBuffer(),
      mH.format || 'glb',
      mH.map ?? null,
    );
    return mR.tier !== 'custom' || !mR.ready
      ? null
      : { gltf: me, report: mR, name: mH.name ?? mC.id };
  }
  async function DA(mS) {
    mS = mS || '';
    let mE = D4.getState();
    if (mS === (mE.character ?? (mE.rig === 'human' ? '' : mE.rig))) return ((DC = null), !0);
    if (((DC = null), !mS))
      return (mE.rig !== 'human' && (await D4.setRig('human')), await D4.setCharacter(null), Dn());
    if (D5.rigs?.[mS]) return (await D4.setRig(mS), Dn());
    let mF,
      mC = 'glb',
      mt = null,
      mH = null;
    if (mS.startsWith('o.')) {
      let mz = (mH = D5.characters?.[mS.slice(2)]);
      if (!mz)
        return (
          D9(
            'This scene uses a character that is no longer in the library. Showing the mannequin.',
          ),
          await D4.setCharacter(null),
          Dn(!1)
        );
      ((mF = await (await fetch(D6 + '/' + mz.file)).arrayBuffer()), (mC = mz.format || 'glb'));
    } else {
      if (mS.startsWith('u.')) {
        let mO = await K.get(mS).catch(() => null);
        if (!mO)
          return (
            (DC = mS),
            D9(
              'Made with a character that stays on its owner\u2019s computer. Showing the mannequin \u2014 add the same file in Character to see it.',
            ),
            mE.rig !== 'human' && (await D4.setRig('human')),
            await D4.setCharacter(null),
            Dn(!1)
          );
        ((mF = await mO.blob.arrayBuffer()), (mC = mO.format || 'glb'), (mt = mO.map ?? null));
      } else return !1;
    }
    let { gltf: me, report: mR, preset: mQ } = await DK(mF, mC, mt);
    if (
      (mH?.material === 'grey' && Sh(me.scene),
      mR.mended &&
        mR.ready &&
        mS.startsWith('u.') &&
        K.get(mS)
          .then((mJ) => (mJ ? K.put({ ...mJ, kind: 'custom', map: mR.map }) : null))
          .catch(() => {}),
      !Hi(mR))
    )
      return (
        (DS = { name: mS, report: mR }),
        D9(
          mR.tier === 'custom'
            ? 'That character\u2019s bones aren\u2019t all mapped yet \u2014 open Retarget (\u2699) in Character. Showing the mannequin.'
            : mR.tier === 'unrigged'
              ? 'That character isn\u2019t rigged yet \u2014 \u2699 on its card places its joints. Showing the mannequin.'
              : 'That character no longer fits our skeleton. Showing the mannequin.',
        ),
        await D4.setCharacter(null),
        Dn(!1)
      );
    let mj =
      mS.startsWith('u.') && !DE.find((mJ) => mJ.id === mS)?.thumb
        ? kQ({ model: me.scene, clone: VI, THREE: VN })
        : null;
    return (
      mj &&
        K.get(mS)
          .then(async (mJ) => {
            !mJ || mJ.thumb || (await K.put({ ...mJ, thumb: mj }), (DE = await K.list()), m0());
          })
          .catch(() => {}),
      await D4.setCharacter(mS, (mJ) =>
        mR.tier === 'custom'
          ? kJ(mJ, me, mR, VN, { moveJoints: r, cloneSkinned: VI })
          : E(mJ, me, mR, VN).scene,
      ),
      (Dt = { ref: mS, report: mR, gltf: me, preset: mQ }),
      Dn()
    );
  }
  function Dn(mS = !0) {
    return (m1(), Dk(), mS);
  }
  function DX() {
    if (DC) return DC;
    let mS = D4.getState();
    return mS.character ?? (mS.rig && mS.rig !== 'human' ? mS.rig : '');
  }
  let DL = null,
    Db = {
      rigged: {
        label: '+ Rigged character',
        line: 'Keeps its own skeleton.',
        more: 'Its bones are matched to ours, and downloads come out on its own skeleton.',
        title:
          'A .glb or .fbx with a skeleton \u2014 ours, Mixamo, Unreal, Reallusion or its own. Checked here, kept in this browser, never uploaded.',
      },
      unrigged: {
        label: '+ Unrigged model',
        line: 'Rigged here, in the browser.',
        more: 'Place a few dots on its joints and it is rigged and skinned here.',
        title:
          'A .glb or .fbx with no skeleton \u2014 from an AI tool, a sculpt, a store model. Checked here, kept in this browser, never uploaded.',
      },
    };
  async function Dx(mS, mE = DL) {
    if (((DL = null), !mS || DF)) return;
    DV();
    let mF =
      (navigator.deviceMemory && navigator.deviceMemory <= 4) ||
      /iPhone|iPad|Android/i.test(navigator.userAgent)
        ? Mh
        : _h;
    if (mS.size > mF) {
      ((DS = {
        name: mS.name,
        error:
          'This file is ' +
          Math.round(mS.size / 1048576) +
          ' MB. The limit is ' +
          mF / 1048576 +
          ' MB \u2014 usually it\u2019s the textures: export them at 2K, or as JPEG.',
      }),
        m1());
      return;
    }
    if (/\.afcharacter$/i.test(mS.name)) {
      await Dv(mS);
      return;
    }
    let mC = mS.name.match(/\.(glb|fbx)$/i)?.[1].toLowerCase();
    if (!mC) {
      ((DS = {
        name: mS.name,
        error:
          'Characters are read from .glb or .fbx files (or a .afcharacter backup). In Blender: File \u2192 Export \u2192 glTF 2.0 (.glb) or FBX.',
      }),
        m1());
      return;
    }
    (navigator.storage?.persist?.().catch(() => {}), (DF = !0));
    let mt = (mH) => (
      (DS = { name: mS.name, pending: !0, step: mH }),
      m1(),
      new Promise((me) => setTimeout(me, 30))
    );
    await mt('Reading ' + (mS.size / 1048576).toFixed(1) + ' MB\u2026');
    try {
      let mH = await mS.arrayBuffer(),
        me = await T(mH),
        mR = await K.get(me);
      if (mR) {
        if (
          ((DF = !1),
          (DS = {
            name: mS.name,
            info:
              '\u201C' + mR.name + '\u201D is already in Yours \u2014 picked up where you left it.',
          }),
          mR.kind === 'unrigged')
        ) {
          await mV(me);
          return;
        }
        (D8(me), m1());
        return;
      }
      await mt('Checking the skeleton and the mesh\u2026');
      let { gltf: mQ, report: mj, preset: mz } = await DK(mH, mC);
      if (
        ((DS = { name: mS.name, report: mj, file: { buffer: mH, format: mC, id: me } }),
        Hi(mj) || mj.tier === 'custom' || mj.tier === 'unrigged')
      ) {
        let mO = mS.name.replace(/\.(glb|fbx)$/i, ''),
          mJ = mH;
        if (mC === 'glb')
          try {
            await mt('Shrinking big textures\u2026');
            let mU = await $h(mQ);
            mU &&
              (await DK(mU)).report.tier === mj.tier &&
              ((mJ = mU),
              mj.fixes.push(
                'Textures drawn down to at most ' +
                  Xi +
                  '\u00D7' +
                  Xi +
                  ' (' +
                  (mH.byteLength / 1048576).toFixed(1) +
                  ' \u2192 ' +
                  (mU.byteLength / 1048576).toFixed(1) +
                  ' MB).',
              ));
          } catch {}
        (mj.stats.vertices > 300000 &&
          mj.warnings.push(
            mj.stats.vertices.toLocaleString() +
              ' vertices \u2014 heavy for a browser; phones may struggle.',
          ),
          (DS = { name: mS.name, report: mj }),
          mJ.byteLength > 20 * 1048576 &&
            mj.warnings.push(
              'It is ' +
                (mJ.byteLength / 1048576).toFixed(0) +
                ' MB \u2014 large for a browser. Smaller textures help most.',
            ));
        let mZ = kQ({ model: mQ.scene, clone: VI, THREE: VN });
        if (
          (await K.put({
            id: me,
            name: mO,
            format: mC,
            ...(mZ ? { thumb: mZ } : {}),
            blob: new Blob([mJ], {
              type: mC === 'fbx' ? 'application/octet-stream' : 'model/gltf-binary',
            }),
            bytes: mJ.byteLength,
            heightCm: mj.stats.heightCm,
            created: Date.now(),
            ...(mj.tier === 'custom'
              ? { kind: 'custom', map: mj.map, mapFrom: mj.source?.kind ?? null }
              : {}),
            ...(mj.tier === 'unrigged'
              ? { kind: 'unrigged', markers: null, own: null, turn: 0 }
              : {}),
          }),
          (DE = await K.list()),
          (DF = !1),
          mz && mj.tier === 'custom' && mj.ready)
        ) {
          ((DS = { name: mS.name, report: mj, target: mz.label }), D8(me));
          return;
        }
        if (mj.tier === 'custom' || mj.tier === 'unrigged') {
          ((DS = {
            name: mS.name,
            report: mj,
            file: { buffer: mH, format: mC, id: me },
            choice: { id: me, kind: mj.tier, intent: mE },
          }),
            m1());
          return;
        }
        if (mE === 'unrigged') {
          ((DS = {
            name: mS.name,
            report: mj,
            file: { buffer: mH, format: mC, id: me },
            choice: { id: me, kind: 'ours', intent: mE },
          }),
            m1());
          return;
        }
        D8(me);
        return;
      }
    } catch (mK) {
      let mT = mK instanceof TypeError || mK instanceof ReferenceError || mK instanceof RangeError;
      DS = {
        name: mS.name,
        error: mT
          ? '\u201C' +
            mS.name +
            '\u201D couldn\u2019t be imported: something in it isn\u2019t handled here yet \u2014 that is our fault, not the file\u2019s. If it is a Mixamo, UE4/UE5 or CC rig, no import is needed: pick your export preset (Skeleton, by the download button). (Detail: ' +
            String(mK.message).slice(0, 120) +
            ')'
          : mK.message,
      };
    }
    ((DF = !1), m1());
  }
  async function Dy(mS) {
    confirm(
      'Delete \u201C' +
        mS.name +
        '\u201D from this browser? Scenes that use it will open with the mannequin.',
    ) &&
      (await K.remove(mS.id),
      (DE = await K.list()),
      D4.getState().character === mS.id ? D8('') : m1());
  }
  function DW(mS) {
    return !!(
      mS.markers ||
      mS.map ||
      mS.tags?.length ||
      Object.keys(mS.joints ?? {}).length ||
      Object.keys(mS.envelopes ?? {}).length
    );
  }
  let Dq = null;
  async function DP(mS, mE) {
    let mF = await K.get(mS.id);
    if (!mF) return;
    let mC = () => kq(mF.blob, mF.name + '.' + (mF.format || 'glb'));
    if (!DW(mF)) {
      mC();
      return;
    }
    (Dq?.remove(), (Dq = De('div', 'lib-char__ask')));
    let mt = (mH, me, mR) => {
      let mQ = DR(
        mH,
        me,
        () => {
          (Dq?.remove(), (Dq = null), mR?.());
        },
        'lib-btn lib-btn--sm',
      );
      return (Dq.appendChild(mQ), mQ);
    };
    (mt(
      'The file (.' + (mF.format || 'glb') + ')',
      'The character as a file, to use in Blender, an engine\u2026',
      mC,
    ).focus(),
      mt(
        'Backup with its rig',
        'The file and everything done to it here \u2014 Add character takes it back as it was',
        () => DY(mF),
      ),
      mt('\u2715', 'Cancel'),
      mE?.closest('.lib-char')?.after(Dq));
  }
  async function DY(mS) {
    let { zipSync: mE, strToU8: mF } = await import('./dependencies/compression.js'),
      { blob: mC, source: mt, thumb: mH, ...me } = mS,
      mR = 'character.' + (mS.format || 'glb'),
      mQ = mt ? 'source.' + (mS.sourceFormat || 'glb') : null,
      mj = {
        'character.json': mF(
          JSON.stringify(
            { format: 'actionforge-character', version: 1, file: mR, source: mQ, record: me },
            null,
            1,
          ),
        ),
        [mR]: new Uint8Array(await mC.arrayBuffer()),
      };
    (mt && (mj[mQ] = new Uint8Array(await mt.arrayBuffer())),
      kq(
        new Blob([mE(mj, { level: 0 })], { type: 'application/zip' }),
        (mS.name.replace(/[^\w\- ]+/g, '').trim() || 'character') + '.afcharacter',
      ));
  }
  async function Dv(mS) {
    ((DF = !0), (DS = { name: mS.name, pending: !0, step: 'Reading the backup\u2026' }), m1());
    try {
      let {
          unzipSync: mE,
          strToU8: mF,
          strFromU8: mC,
        } = await import('./dependencies/compression.js'),
        mt = mE(new Uint8Array(await mS.arrayBuffer())),
        mH = mt['character.json'] && JSON.parse(mC(mt['character.json']));
      if (mH?.format !== 'actionforge-character' || !mH.record?.id || !mt[mH.file])
        throw new Error('That isn\u2019t a character backup this tool wrote.');
      let me = (mj) => (/\.fbx$/i.test(mj) ? 'application/octet-stream' : 'model/gltf-binary'),
        mR = {
          ...mH.record,
          blob: new Blob([mt[mH.file]], { type: me(mH.file) }),
          ...(mH.source && mt[mH.source]
            ? { source: new Blob([mt[mH.source]], { type: me(mH.source) }) }
            : {}),
        },
        mQ = await K.get(mR.id);
      if (
        mQ &&
        !confirm(
          '\u201C' +
            mQ.name +
            '\u201D is already here. Replace it with the backup\u2019s \u2014 its rig work as it was saved?',
        )
      ) {
        ((DF = !1), (DS = null), m1());
        return;
      }
      if (
        (await K.put(mR),
        (DE = await K.list()),
        (DF = !1),
        (DS = { name: mS.name, info: '\u201C' + mR.name + '\u201D is back, with its rig work.' }),
        mR.kind === 'unrigged')
      ) {
        await mV(mR.id);
        return;
      }
      (D8(mR.id), m1());
    } catch (mj) {
      ((DF = !1), (DS = { name: mS.name, error: mj.message }), m1());
    }
  }
  async function DB(mS) {
    let { buffer: mE, format: mF, id: mC } = mS.file;
    ((DF = !0),
      (DS = { name: mS.name, pending: !0, step: 'Setting its skeleton aside\u2026' }),
      m1());
    try {
      let mt = mF === 'fbx' ? await Dz(mE) : await Dj(mE),
        mH = DG(mt.scene),
        { GLTFExporter: me } = await import('./dependencies/gltf-exporter.js');
      (await mt.pictures, O(mH));
      let mR = await new me().parseAsync(mH, { binary: !0 }),
        mQ = mS.name.replace(/\.(glb|fbx)$/i, ''),
        mj = new Blob([mR], { type: 'model/gltf-binary' });
      (await K.put({
        id: mC,
        name: mQ,
        format: 'glb',
        blob: mj,
        bytes: mR.byteLength,
        created: Date.now(),
        kind: 'unrigged',
        markers: null,
        own: null,
        turn: 0,
        thumb: kQ({ model: mH, clone: VI, THREE: VN }) ?? void 0,
      }),
        (DE = await K.list()),
        (DF = !1),
        (DS = null),
        await mV(mC));
    } catch (mz) {
      ((DF = !1),
        (DS = { name: mS.name, error: 'Couldn\u2019t set its skeleton aside: ' + mz.message }),
        m1());
    }
  }
  function DG(mS) {
    (mS.updateMatrixWorld(!0),
      mS.traverse((mF) => {
        mF.isSkinnedMesh && mF.skeleton?.pose();
      }),
      mS.updateMatrixWorld(!0));
    let mE = new VM();
    return (
      (mE.name = 'character'),
      mS.traverse((mF) => {
        if (!mF.isMesh || !mF.geometry?.attributes?.position) return;
        let mC = mF.geometry.clone();
        (mC.deleteAttribute('skinIndex'), mC.deleteAttribute('skinWeight'));
        let mt = new D2(mC, mF.material);
        ((mt.name = mF.name),
          mF.matrixWorld.decompose(mt.position, mt.quaternion, mt.scale),
          mE.add(mt));
      }),
      mE
    );
  }
  let Dg = null,
    DI = '',
    Dh = null;
  function DN(mS) {
    ((Dg = mS), m0());
  }
  function DM(mS) {
    return (
      (DI = String(mS || '')
        .trim()
        .toLowerCase()),
      m0()
    );
  }
  function m0() {
    if (!Dg) return 0;
    let mS = D7?.current() ? 'animal:' + D7.current() : DX(),
      mE = (me) => !DI || me.toLowerCase().includes(DI);
    Dg.innerHTML = '';
    let mF = 0,
      mC = (me, mR) => {
        let mQ = mR.filter(Boolean);
        if (mQ.length) {
          Dg.appendChild(De('div', 'lib-chargrid__title', me));
          for (let mj of mQ) Dg.appendChild(mj);
        }
      },
      mt = ({ id: me, name: mR, icon: mQ, badge: mj, meta: mz, title: mO, onClick: mJ }) => {
        if (!mE(mR)) return null;
        mF++;
        let mZ = De('button', 'lib-tile lib-chartile' + (mS === me ? ' is-active' : ''));
        if (
          ((mZ.type = 'button'),
          (mZ.title = mO || mR),
          mZ.setAttribute('aria-pressed', String(mS === me)),
          mQ)
        ) {
          let mK = De('img', 'lib-tile__media');
          ((mK.src = mQ), (mK.alt = ''), (mK.loading = 'lazy'), mZ.appendChild(mK));
        } else {
          let mT = De('div', 'lib-tile__media lib-tile__media--placeholder'),
            mA = 0;
          for (let mn = 0; mn < mR.length; mn++) mA = (mA * 31 + mR.charCodeAt(mn)) % 360;
          (mT.style.setProperty('--tile-hue', String(mA)),
            (mT.textContent = mR
              .split(/[\s_-]+/)
              .map((mo) => mo[0] || '')
              .join('')
              .slice(0, 2)
              .toUpperCase()),
            mZ.appendChild(mT));
        }
        mj &&
          mZ.appendChild(
            De('span', 'lib-chartile__badge' + (mj === 'Own skeleton' ? ' is-own' : ''), mj),
          );
        let mU = De('div', 'lib-tile__body');
        return (
          mU.appendChild(De('span', 'lib-tile__name', mR)),
          mz && mU.appendChild(De('span', 'lib-tile__meta', mz)),
          mZ.appendChild(mU),
          mZ.addEventListener('click', mJ),
          mZ
        );
      };
    (mC('Characters', [
      mt({
        id: '',
        name: 'Mannequin',
        icon: D6 + '/icons/characters/mannequin.webp',
        title: 'Our mannequin',
        onClick: () => D8(''),
      }),
      ...DJ().map(([me, mR]) =>
        mt({
          id: 'o.' + me,
          name: mR.label || me,
          icon: mR.icon ? D6 + '/' + mR.icon : null,
          badge: mR.skeleton ? 'Own skeleton' : null,
          title: [mR.note || 'An ActionForge character', mR.license]
            .filter(Boolean)
            .join(' \u00B7 '),
          onClick: () => D8('o.' + me),
        }),
      ),
    ]),
      Dh ||
        ((Dh = De('input')),
        (Dh.type = 'file'),
        (Dh.accept = '.glb,.fbx,.afcharacter,model/gltf-binary'),
        (Dh.hidden = !0),
        Dh.addEventListener('change', () => {
          let me = Dh.files?.[0];
          ((Dh.value = ''), Dx(me));
        })));
    let mH = (me) =>
      mE(Db[me].label) || !DI
        ? (() => {
            let mR = De('button', 'lib-tile lib-chartile lib-chartile--add');
            ((mR.type = 'button'),
              (mR.title = Db[me].more + ' ' + Db[me].title),
              mR.appendChild(De('div', 'lib-tile__media lib-chartile__plus', DF ? '\u2026' : '+')));
            let mQ = De('div', 'lib-tile__body');
            return (
              mQ.appendChild(
                De('span', 'lib-tile__name', DF ? 'Checking\u2026' : Db[me].label.slice(2)),
              ),
              mQ.appendChild(
                De(
                  'span',
                  'lib-tile__meta',
                  me === 'rigged' ? 'keeps its skeleton' : 'rigged here',
                ),
              ),
              mR.appendChild(mQ),
              (mR.disabled = DF),
              mR.addEventListener('click', () => {
                (DV(), (DL = me), Dh.click());
              }),
              mR
            );
          })()
        : null;
    return (
      mC('Yours', [
        ...DE.map((me) =>
          mt({
            id: me.id,
            name: me.name,
            icon: me.thumb || null,
            badge:
              me.kind === 'unrigged'
                ? 'Needs rigging'
                : me.kind === 'custom'
                  ? 'Own skeleton'
                  : null,
            meta: me.heightCm ? me.heightCm + ' cm' : null,
            title:
              me.kind === 'unrigged'
                ? me.name + ' \u2014 not rigged yet: click to place its joints'
                : me.name + ' \u2014 wear it',
            onClick: () => (me.kind === 'unrigged' ? mV(me.id) : D8(me.id)),
          }),
        ),
        mH('rigged'),
        mH('unrigged'),
      ]),
      D7 &&
        mC(
          'Animals',
          D7.list().map((me) =>
            mt({
              id: 'animal:' + me.id,
              name: me.name,
              icon: me.picture ? D6 + '/animals/' + me.picture : null,
              meta: me.clips.length + ' animations',
              title: me.name + ' \u2014 an animal, with its own animations',
              onClick: () => D7.onPick(me.id),
            }),
          ),
        ),
      Dg.appendChild(Dh),
      mF
    );
  }
  function m1() {
    if ((m0(), m4.isOpen || m9.isOpen)) return;
    let mS = D4.getState(),
      mE = DX();
    D3.innerHTML = '';
    let mF = De('div', 'lib-comp__head');
    (mF.appendChild(De('span', 'lib-comp__title', 'Character')), D3.appendChild(mF));
    let mC = De('div', 'lib-rigs');
    for (let mK of mS.rigs ?? []) {
      let mT = mK.id === 'human' ? mS.rig === 'human' : mS.rig === mK.id;
      mC.appendChild(
        DR(
          mK.label,
          mK.id === 'human'
            ? 'The full body \u2014 characters are worn on it'
            : 'A body of its own (characters are worn on the full body)',
          () => D8(mK.id === 'human' ? (mS.character ?? '') : mK.id),
          'lib-btn lib-btn--axis' + (mT ? ' is-on' : ''),
        ),
      );
    }
    D3.appendChild(mC);
    let mt = (mA, mn) => {
        let mo = De('div', 'lib-chars');
        mo.appendChild(De('div', 'lib-chars__title', mA));
        let mX = De('div', 'lib-chars__row');
        for (let mL of mn) mX.appendChild(mL);
        (mo.appendChild(mX), D3.appendChild(mo));
      },
      mH = (mA, mn, mo) =>
        DR(
          mA,
          mo,
          () => D8(mn),
          'lib-btn lib-btn--axis' + (mE === mn && (mn || mS.rig === 'human') ? ' is-on' : ''),
        );
    mt('Characters', [
      mH('Mannequin', '', 'Our mannequin'),
      ...DJ().map(([mA, mn]) =>
        mH(
          mn.label || mA,
          'o.' + mA,
          [mn.note || 'An ActionForge character', mn.license].filter(Boolean).join(' \u00B7 '),
        ),
      ),
    ]);
    let me = DE.map((mA) => {
        let mn = De('span', 'lib-char' + (mE === mA.id ? ' is-on' : '')),
          mo = mA.kind === 'unrigged',
          mX = DR(
            mA.name,
            mo
              ? mA.name + ' \u2014 not rigged yet: click to place its joints'
              : '' +
                  (mA.heightCm ? mA.heightCm + ' cm \u00B7 ' : '') +
                  (mA.bytes / 1048576).toFixed(1) +
                  ' MB \u2014 wear it',
            () => (mo ? mV(mA.id) : D8(mA.id)),
            'lib-char__name',
          ),
          mL = async () => {
            let mb = prompt('Rename the character', mA.name)?.trim();
            mb && (await K.rename(mA.id, mb), (DE = await K.list()), m1());
          };
        return (
          mX.addEventListener('dblclick', (mb) => {
            (mb.stopPropagation(), mL());
          }),
          mn.append(
            mX,
            ...(mo
              ? [De('span', 'lib-char__badge', 'Needs rigging')]
              : mA.kind === 'autorigged'
                ? [De('span', 'lib-char__badge is-ok', 'Rigged here')]
                : mA.kind === 'custom'
                  ? [De('span', 'lib-char__badge is-own', 'Own skeleton')]
                  : []),
            DR('\u270E', 'Rename', mL, 'lib-btn lib-btn--icon'),
            ...(mA.kind === 'custom'
              ? [
                  DR(
                    '\u2699',
                    'Retarget: which of its bones plays which of ours',
                    () => m7(mA.id),
                    'lib-btn lib-btn--icon',
                  ),
                ]
              : []),
            ...(mA.kind === 'unrigged'
              ? [
                  DR(
                    '\u2699',
                    'Rig it: put dots on its joints',
                    () => mV(mA.id),
                    'lib-btn lib-btn--icon',
                  ),
                ]
              : []),
            ...(mA.kind === 'autorigged'
              ? [
                  DR(
                    '\u2699',
                    'Rig it again: move its dots',
                    () => mV(mA.id),
                    'lib-btn lib-btn--icon',
                  ),
                ]
              : []),
            DR(
              '\u2193',
              DW(mA)
                ? 'Save a copy: the file, or a backup with its rig work to add back later'
                : 'Save a copy of the file',
              (mb) => DP(mA, mb.currentTarget),
              'lib-btn lib-btn--icon',
            ),
            DR('\u2715', 'Delete from this browser', () => Dy(mA), 'lib-btn lib-btn--icon'),
          ),
          mn
        );
      }),
      mR = De('input');
    ((mR.type = 'file'),
      (mR.accept = '.glb,.fbx,.afcharacter,model/gltf-binary'),
      (mR.hidden = !0),
      mR.addEventListener('change', () => {
        let mA = mR.files?.[0];
        ((mR.value = ''), Dx(mA));
      }),
      mt('Yours', me),
      D3.appendChild(mR));
    let mQ = De('div', 'lib-addways');
    for (let mA of ['rigged', 'unrigged']) {
      let mn = De('div', 'lib-addway'),
        mo = DR(
          DF ? 'Checking\u2026' : Db[mA].label,
          Db[mA].more + ' ' + Db[mA].title + ' Or drop it on the stage.',
          () => {
            ((DL = mA), mR.click());
          },
          'lib-btn lib-btn--sm',
        );
      ((mo.disabled = DF),
        mn.append(mo, De('p', 'lib-comp__hint lib-addway__line', Db[mA].line)),
        mQ.appendChild(mn));
    }
    (D3.appendChild(mQ),
      DC &&
        D3.appendChild(
          De(
            'p',
            'lib-adj__warn',
            'This scene was made with a character that isn\u2019t in this browser. Add the same file to see it.',
          ),
        ));
    let mj = Dt?.ref === mS.character && !Dt.preset ? Dt.report.align : null;
    if (mj && !mj.identity) {
      let mX = De('label', 'lib-check lib-retarget__hold');
      mX.title =
        'Freezes the character in our T-pose, the pose every clip starts from. Only what you see \u2014 nothing is changed.';
      let mL = De('input');
      ((mL.type = 'checkbox'),
        (mL.checked = mS.restPreview === 'T'),
        mL.addEventListener('change', () => {
          (D4.setRestPreview(mL.checked ? 'T' : null, mL.checked ? 'T' : null), m1());
        }),
        mX.append(mL, ' Hold in T-pose (to check)'),
        D3.appendChild(mX));
      let mb = De('label', 'lib-check lib-retarget__hold');
      mb.title =
        'Freezes the character in the pose it was modelled in \u2014 its rest pose, and the one its exported files carry. Only what you see \u2014 nothing is changed.';
      let mx = De('input');
      ((mx.type = 'checkbox'),
        (mx.checked = mS.restPreview === 'theirs'),
        mx.addEventListener('change', () => {
          (D4.setRestPreview(mx.checked ? mj.S : null, mx.checked ? 'theirs' : null, {
            lift: mj.lift ?? 0,
          }),
            m1());
        }),
        mb.append(mx, ' Hold in its own pose'),
        D3.appendChild(mb),
        D3.appendChild(
          De('p', 'lib-retarget__note', 'View only \u2014 doesn\u2019t change anything.'),
        ));
    }
    if (DS) {
      Dm = De('div', 'lib-charcheck');
      let my = DS.report;
      if (DS.pending)
        Dm.appendChild(
          De(
            'p',
            'lib-comp__hint',
            '\u201C' + DS.name + '\u201D \u2014 ' + (DS.step ?? 'checking\u2026'),
          ),
        );
      else {
        if (DS.error) Dm.appendChild(De('p', 'lib-charcheck__bad', DS.error));
        else {
          if (DS.info) Dm.appendChild(De('p', 'lib-charcheck__ok', DS.info));
          else {
            if (my) {
              let mq = Hi(my),
                mP = my.stats.heightCm ? ' \u00B7 ' + my.stats.heightCm + ' cm' : '',
                mY = DS.choice,
                mv = mq && my.tier === 'custom' ? (DS.target ?? null) : null;
              Dm.appendChild(
                De(
                  'p',
                  mq || mY ? 'lib-charcheck__ok' : 'lib-charcheck__bad',
                  mv
                    ? mv + ' \u00B7 worn'
                    : mY?.kind === 'unrigged'
                      ? '\u201C' +
                        DS.name +
                        '\u201D has no skeleton' +
                        (mY.intent === 'rigged'
                          ? ' \u2014 so there are no bones to map. It can be rigged here instead.'
                          : '.')
                      : mY?.kind === 'custom'
                        ? '\u201C' +
                          DS.name +
                          '\u201D already has its own skeleton' +
                          (my.stats?.bones ? ' (' + my.stats.bones + ' bones)' : '') +
                          '.'
                        : mY?.kind === 'ours'
                          ? '\u201C' + DS.name + '\u201D is already on our skeleton' + mP + '.'
                          : mq
                            ? my.tier === 'exact'
                              ? '\u201C' + DS.name + '\u201D fits our skeleton exactly' + mP + '.'
                              : my.tier === 'custom'
                                ? '\u201C' +
                                  DS.name +
                                  '\u201D is on its own skeleton, mapped to ours' +
                                  mP +
                                  '.'
                                : '\u201C' +
                                  DS.name +
                                  '\u201D is on our skeleton, fitted as below' +
                                  mP +
                                  '.'
                            : '\u201C' + DS.name + '\u201D can\u2019t be worn yet:',
                ),
              );
              let mB = (mG, mg) => {
                if (!mG?.length) return;
                let mI = De('ul', mg);
                for (let mN of mG) mI.appendChild(De('li', null, mN));
                Dm.appendChild(mI);
              };
              if (mY) {
                let mG = De('div', 'lib-charcheck__choice'),
                  mg = (mN) =>
                    DR(
                      'Keep its skeleton \u2014 map its bones',
                      'Match its bones to ours: most are found by name and shape, and you check the rest',
                      () => {
                        ((DS = null), m7(mY.id));
                      },
                      'lib-btn lib-btn--sm' + (mN ? ' is-good' : ''),
                    ),
                  mI = (mN) =>
                    DR(
                      mN ? 'Rig it here \u2014 ignore its skeleton' : 'Rig it here instead',
                      'Set its skeleton aside and rig the mesh here: place the dots, Rig, Bind',
                      () => DB(DS),
                      'lib-btn lib-btn--sm' + (mN ? ' is-good' : ''),
                    );
                (mY.kind === 'custom'
                  ? (mG.appendChild(
                      De(
                        'p',
                        'lib-comp__hint',
                        mY.intent === 'unrigged'
                          ? 'You chose to rig it here \u2014 its skeleton is set aside and the mesh rigged from dots. Or keep the skeleton it has: its bones are matched to ours.'
                          : 'Keep it: its bones are matched to ours, so every clip plays on it and downloads on its own skeleton, under its own names. Or set it aside and rig the mesh here, from dots.',
                      ),
                    ),
                    mG.append(...(mY.intent === 'unrigged' ? [mI(!0), mg(!1)] : [mg(!0), mI(!1)])))
                  : mY.kind === 'ours'
                    ? (mG.appendChild(
                        De(
                          'p',
                          'lib-comp__hint',
                          'It is rigged on our skeleton already, so it can be worn as it is. Or set its skeleton aside and rig it again here, from dots.',
                        ),
                      ),
                      mG.append(
                        DR(
                          'Wear it as it is',
                          'On our skeleton: every clip plays on it',
                          () => {
                            ((DS = null), D8(mY.id), m1());
                          },
                          'lib-btn lib-btn--sm is-good',
                        ),
                        mI(!1),
                      ))
                    : (mG.appendChild(
                        De(
                          'p',
                          'lib-comp__hint',
                          'Place a few dots on its joints \u2014 chin, shoulders, wrists, hips, ankles \u2014 and it is rigged and skinned here, in the browser.',
                        ),
                      ),
                      mG.append(
                        DR(
                          'Rig it here \u2014 place the dots',
                          'Open the rigger on it',
                          () => {
                            ((DS = null), mV(mY.id));
                          },
                          'lib-btn lib-btn--sm is-good',
                        ),
                      )),
                  Dm.appendChild(mG));
              }
              if (
                (mY?.kind !== 'unrigged' && mB(my.errors, 'lib-charcheck__errors'),
                mB(my.warnings, 'lib-charcheck__warnings'),
                mv || mB(my.fixes, 'lib-charcheck__fixes'),
                !mq && !mY && DS.file && my.tier !== 'unrigged' && my.tier !== 'custom')
              ) {
                let mN = DR(
                  'Rig it here instead',
                  'Ignore its skeleton and rig the mesh here: place the dots, Rig, Bind \u2014 as for a model with no skeleton',
                  () => DB(DS),
                  'lib-btn lib-btn--sm',
                );
                ((mN.disabled = DF), Dm.appendChild(mN));
              }
              if (my.tier === 'custom' && my.map && !mv) {
                let mM = De('details', 'lib-charmap');
                mM.appendChild(
                  De('summary', null, 'Bone mapping (' + Object.keys(my.map).length + ' of ours)'),
                );
                let S0 = De('div', 'lib-charmap__rows');
                for (let [S1, S2] of Object.entries(my.map)) {
                  let S3 = De('div', 'lib-charmap__row');
                  (S3.append(
                    De('span', 'lib-charmap__ours', S1),
                    De('span', 'lib-charmap__arrow', '\u2190'),
                    De('span', 'lib-charmap__theirs', my.names?.[S2] ?? S2),
                    De(
                      'span',
                      'lib-charmap__how',
                      my.how?.[S1] === 'name'
                        ? 'by name'
                        : my.how?.[S1] === 'structure'
                          ? 'by shape'
                          : my.how?.[S1]
                            ? 'recognised'
                            : '',
                    ),
                  ),
                    S0.appendChild(S3));
                }
                (mM.appendChild(S0), Dm.appendChild(mM));
              }
            }
          }
        }
      }
      let mW = DR(
        '\u2715',
        'Dismiss',
        () => {
          ((DS = null), m1());
        },
        'lib-btn lib-btn--icon lib-charcheck__close',
      );
      (Dm.appendChild(mW), D3.appendChild(Dm));
    }
    let mz = De('p', 'lib-comp__hint lib-charstore');
    ((mz.textContent =
      'Your characters are read and kept in this browser only \u2014 never uploaded.'),
      navigator.storage
        ?.persisted?.()
        .then((S4) => {
          !S4 &&
            DE.length &&
            (mz.textContent +=
              ' This browser may clear them if space runs low: keep a copy (\u2193), or install the site.');
        })
        .catch(() => {}),
      D3.appendChild(mz));
    let mO = De('details', 'lib-charguide');
    mO.appendChild(De('summary', null, 'Make a character on our skeleton'));
    let mJ = De('ol');
    for (let S4 of [
      'Download the skeleton template (below) and open it in Blender 4.2 or newer.',
      'Model around the mannequin, or bring your character in and fit the skeleton to it: in Edit Mode (X-Axis Mirror on) move the joints to your character\u2019s knees, elbows, hips. A T-pose, an A-pose or a relaxed rest all work; don\u2019t rename bones.',
      'Select your mesh, then the armature, and Parent \u2192 With Automatic Weights. The helper bones are set not to deform, so they\u2019re skipped.',
      'Export: File \u2192 Export \u2192 glTF 2.0 (.glb), Include \u2192 Selected Objects, no compression.',
      'Add the .glb here \u2014 or drop it on the stage. It says \u201Cfits our skeleton exactly\u201D or \u201Cwith its own proportions\u201D, and the clips play on it.',
    ])
      mJ.appendChild(De('li', null, S4));
    mO.appendChild(mJ);
    let mZ = De('p', 'lib-charguide__links'),
      mU = (S5, S6, S7) => {
        let S8 = De('a', null, S5);
        return ((S8.href = S6), (S8.download = S7), S8);
      };
    (mZ.append(
      mU(
        'Skeleton template (.blend)',
        D6 + '/downloads/actionforge-skeleton.blend',
        'actionforge-skeleton.blend',
      ),
      document.createTextNode(' \u00B7 '),
      mU('Skeleton (.glb)', D6 + '/' + DO(), 'actionforge-skeleton.glb'),
      document.createTextNode(' \u00B7 CC0, by Quaternius'),
    ),
      mO.appendChild(mZ),
      D3.appendChild(mO));
  }
  async function m2(mS) {
    if (!mS) return null;
    let mE = await K.get(mS).catch(() => null);
    return mE
      ? {
          id: mE.id,
          name: mE.name,
          format: mE.format || 'glb',
          blob: mE.blob,
          ...(mE.map ? { kind: 'custom', map: mE.map } : {}),
          ...(mE.kind === 'autorigged'
            ? {
                rig: {
                  markers: mE.markers ?? null,
                  own: mE.own ?? [],
                  tags: mE.tags ?? [],
                  joints: mE.joints ?? {},
                  envelopes: mE.envelopes ?? {},
                  turn: mE.turn || 0,
                  height: mE.height ?? null,
                },
                source: mE.source ? { format: mE.sourceFormat ?? 'glb', blob: mE.source } : null,
              }
            : {}),
        }
      : null;
  }
  async function m3(mS = []) {
    let mE = 0;
    for (let mF of mS) {
      if (await K.get(mF.id).catch(() => null)) continue;
      let mC = (mt) => (mt === 'fbx' ? 'application/octet-stream' : 'model/gltf-binary');
      (await K.put({
        id: mF.id,
        name: mF.name,
        format: mF.format,
        ...(mF.map ? { kind: 'custom', map: mF.map } : {}),
        ...(mF.rig
          ? {
              kind: 'autorigged',
              markers: mF.rig.markers,
              own: mF.rig.own,
              tags: mF.rig.tags,
              joints: mF.rig.joints,
              envelopes: mF.rig.envelopes ?? {},
              turn: mF.rig.turn,
              height: mF.rig.height,
              ...(mF.source
                ? {
                    source: new Blob([mF.source.bytes], { type: mC(mF.source.format) }),
                    sourceFormat: mF.source.format,
                  }
                : {}),
            }
          : {}),
        blob: new Blob([mF.bytes], { type: mC(mF.format) }),
        bytes: mF.bytes.length,
        heightCm: null,
        created: Date.now(),
      }),
        mE++);
    }
    return (
      mE && (navigator.storage?.persist?.().catch(() => {}), (DE = await K.list()), m1()),
      mE
    );
  }
  let m4 = vu({
      mount: D3,
      player: D4,
      THREE: VN,
      ourParent: new Map(),
      ourFigure: async () => {
        await DU();
        let mS = VI(DZ);
        return (
          mS.traverse((mE) => {
            mE.isSkinnedMesh && (mE.skeleton.pose(), (mE.frustumCulled = !1));
          }),
          mS
        );
      },
      onChange: async (mS) => {
        let mE = m5?.id;
        if (!mE) return;
        let mF = kO(Dt.gltf, await DU(), VN, { map: mS, preset: Dt.preset ?? null }),
          mC = await K.get(mE);
        (mC && (await K.put({ ...mC, map: mF.map, kind: 'custom' })),
          A.put(mF, mC?.name ?? mE, mF.map),
          await m6(mE, mF),
          m4.update(mF));
      },
      onSaveFile: () => {
        let mS = Dt?.report;
        if (!mS) return;
        let mE = {
          format: 'actionforge-rigmap',
          version: 1,
          name: DE.find((mF) => mF.id === m5?.id)?.name ?? 'rig',
          signature: mS.signature,
          map: Object.fromEntries(
            Object.entries(mS.map).map(([mF, mC]) => [mF, mS.names?.[mC] ?? mC]),
          ),
        };
        kq(
          new Blob([JSON.stringify(mE, null, 1)], { type: 'application/json' }),
          (mE.name.replace(/[^\w\- ]+/g, '').trim() || 'rig') + '.rigmap.json',
        );
      },
      readFile: async (mS) => {
        let mE = Dt?.report,
          mF;
        try {
          mF = JSON.parse(await mS.text());
        } catch {
          throw new Error('That isn\u2019t a mapping file.');
        }
        if (mF?.format !== 'actionforge-rigmap' || typeof mF.map != 'object')
          throw new Error('That isn\u2019t a mapping file.');
        let mC = new Map(Object.entries(mE.names ?? {}).map(([me, mR]) => [mR, me])),
          mt = {},
          mH = 0;
        for (let [me, mR] of Object.entries(mF.map)) {
          let mQ = mC.get(mR) ?? (mE.names?.[mR] != null ? mR : null) ?? mE.keys?.get(kz(mR));
          mQ && mE.bones.includes(mQ) ? (mt[me] = mQ) : mH++;
        }
        return { map: mt, lost: mH, sameRig: mF.signature === mE.signature };
      },
      onClose: async () => {
        let mS = m5?.id;
        (m4.close(),
          (m5 = null),
          Dt?.ref === mS && !Dt.report.ready
            ? (D9('Map its main bones to wear it \u2014 \u2699 on its card opens Retarget again.'),
              await D4.setCharacter(null),
              (Dt = null),
              D8(DX() === mS ? '' : DX()))
            : mS &&
              Dt?.ref === mS &&
              ((DS = { name: DE.find((mE) => mE.id === mS)?.name ?? mS, report: Dt.report }),
              D8(mS)),
          (DE = await K.list()),
          m1());
      },
    }),
    m5 = null;
  async function m6(mS, mE) {
    (await D4.setCharacter(
      mS,
      (mF) =>
        mE.ready
          ? kJ(mF, Dt.gltf, mE, VN, { moveJoints: r, cloneSkinned: VI })
          : kZ(mF, Dt.gltf, mE, VN),
      { force: !0 },
    ),
      (Dt = { ...Dt, ref: mS, report: mE }),
      mE.ready && (await Dw()));
  }
  async function m7(mS) {
    let mE = await K.get(mS);
    if (!mE) return;
    let mF = await DU();
    m4.ourParentFill?.(mF.parent);
    let {
      gltf: mC,
      report: mt,
      preset: mH,
    } = await DK(await mE.blob.arrayBuffer(), mE.format || 'glb', mE.map ?? null);
    if (mt.tier !== 'custom') {
      ((DS = { name: mE.name, report: mt }), m1());
      return;
    }
    (mt.source?.kind === 'character' && mE.mapFrom === 'saved' && (mt.source = { kind: 'saved' }),
      (Dt = { ref: mS, report: mt, gltf: mC, preset: mH }),
      (m5 = { id: mS }),
      await m6(mS, mt),
      m4.open(mE.name, mt));
  }
  let m8 = null,
    m9 = af({
      mount: D3,
      player: D4,
      THREE: VN,
      onSave: async (mS, mE) => {
        let mF = m8 && (await K.get(m8.id));
        mF && (await K.put({ ...mF, markers: mS, own: mE }));
      },
      onTags: async (mS) => {
        let mE = m8 && (await K.get(m8.id));
        mE && (await K.put({ ...mE, tags: mS }));
      },
      onDigits: async (mS) => {
        let mE = m8 && (await K.get(m8.id));
        mE && (await K.put({ ...mE, digits: mS }));
      },
      onJoints: async (mS) => {
        let mE = m8 && (await K.get(m8.id));
        mE && (await K.put({ ...mE, joints: mS }));
      },
      onHeight: async (mS, mE) => {
        let mF = m8?.id,
          mC = mF && (await K.get(mF));
        if (!mC || !(mS > 0) || !(mE > 0)) return;
        let mt = mS / mE,
          mH = mC.markers
            ? Object.fromEntries(
                Object.entries(mC.markers).map(([mR, [mQ, mj]]) => [mR, [mQ * mt, mj * mt]]),
              )
            : null,
          me = mC.joints
            ? Object.fromEntries(
                Object.entries(mC.joints).map(([mR, mQ]) => [mR, mQ.map((mj) => mj * mt)]),
              )
            : null;
        (await K.put({ ...mC, height: mS, markers: mH, joints: me }), m9.close(), await mV(mF));
      },
      onTurn: async (mS) => {
        let mE = m8?.id,
          mF = mE && (await K.get(mE));
        mF &&
          (await K.put({
            ...mF,
            turn: ((((mF.turn || 0) + mS) % 4) + 4) % 4,
            markers: null,
            own: null,
            joints: null,
          }),
          m9.close(),
          await mV(mE));
      },
      onClose: () => mw(),
      onMeasure: async (mS, mE = [], mF = {}, mC = null) => {
        let mt = m8 && (await K.get(m8.id));
        if (!mt) return null;
        let { heat: mH } = await mk(mt, mS, mE, mF, {}, mC);
        return mH.envelopes ?? null;
      },
      onEnvelopes: async (mS) => {
        let mE = m8 && (await K.get(m8.id));
        mE && (await K.put({ ...mE, envelopes: mS }));
      },
      onBind: async (
        mS,
        mE,
        mF = [],
        mC = {},
        mt = {},
        mH = null,
        { signal: me = null, stage: mR = () => {} } = {},
      ) => {
        let mQ = m8?.id,
          mj = mQ && (await K.get(mQ));
        if (!mj) return;
        let mz = () => {
            if (me?.aborted) throw new DOMException('Cancelled', 'AbortError');
          },
          {
            job: mO,
            heat: mJ,
            source: mZ,
            sourceFormat: mU,
            pictures: mK,
          } = await mk(mj, mS, mF, mC, mt, mH, me);
        (mz(),
          mR('Building the character file\u2026'),
          await new Promise((mx) => setTimeout(mx, 30)));
        let mT = mO.finish(mJ),
          { GLTFExporter: mA } = await import('./dependencies/gltf-exporter.js');
        (await mK, O(mT.scene));
        let mn = await new mA().parseAsync(mT.scene, { binary: !0 });
        (mz(), mR('Checking it\u2026'));
        let { report: mo } = await DK(mn);
        if (!Hi(mo))
          throw new Error(
            'The rigged character didn\u2019t pass the check: ' +
              (mo.errors[0] ?? 'unknown reason') +
              '. Try moving the dots nearest the problem, then Rig and Bind again.',
          );
        (mz(),
          await K.put({
            ...mj,
            kind: 'autorigged',
            markers: mS,
            own: mE,
            tags: mF,
            joints: mC,
            envelopes: mt,
            blob: new Blob([mn], { type: 'model/gltf-binary' }),
            format: 'glb',
            bytes: mn.byteLength,
            heightCm: mo.stats.heightCm ?? mj.heightCm,
            source: mZ,
            sourceFormat: mU,
          }),
          as.note('skinned'),
          m9.close(),
          (m8 = null),
          (DS = null),
          await D4.setCharacter(null),
          (Dt = null),
          (DE = await K.list()),
          D8(mQ));
        let mX = mT.stats,
          mL = [
            mF.filter((mx) => mx.kind === 'cloth').length,
            mF.filter((mx) => mx.kind === 'prop').length,
          ],
          mb = mL.some(Boolean)
            ? ' \u00B7 ' + mL[0] + ' cloth, ' + mL[1] + ' prop' + (mL[1] === 1 ? '' : 's')
            : '';
        D9(
          'Rigged: ' +
            mX.vertices.toLocaleString() +
            ' vertices weighted to ' +
            mX.bones +
            ' bones in ' +
            (mX.ms.total / 1000).toFixed(1) +
            ' s' +
            (mX.worker ? ' (in the background)' : '') +
            mb +
            '. \u2699 on its card to move its dots, tag cloth and props, and rig it again.',
        );
      },
    });
  async function mk(mS, mE, mF, mC, mt, mH, me = null) {
    let mR = await DU(),
      mQ = mS.source ?? mS.blob,
      mj = mS.sourceFormat ?? mS.format ?? 'glb',
      mz = await mQ.arrayBuffer(),
      mO = mj === 'fbx' ? await Dz(mz) : await Dj(mz),
      mJ = ga(mO.scene, VN, { turn: mS.turn || 0, height: mS.height ?? null }),
      mZ = si(mO.scene),
      mU = mS.digits ?? 5,
      { joints: mK, head: mT } = Vi(mE, mZ, mJ, mR, VN, { digits: mU }),
      mA = (mL) => mL?.length === 3 && mL.every(Number.isFinite);
    for (let [mL, mb] of Object.entries(mC ?? {}))
      mK.has(mL) && mA(mb) && mK.set(mL, new D0(...mb));
    mT && mA(mC?.head_top) && ((mT.end = new D0(...mC.head_top)), (mT.skullTop = mT.end.y));
    let mn = Object.fromEntries(
        Object.entries(mt ?? {}).filter(
          ([, mx]) => Number.isFinite(mx) && mx > 0 && Math.abs(mx - 1) > 0.001,
        ),
      ),
      mo = Object.keys(mn).length ? { envelope: { ...ci.envelope, sized: mn } } : {},
      mX = Hu({
        meshes: mZ,
        place: mJ,
        joints: mK,
        ref: mR,
        ours: VI(DZ),
        THREE: VN,
        moveJoints: r,
        head: mT,
        tags: mF,
        shape: mo,
        bare: new Set(ai(mU)),
      });
    return {
      job: mX,
      heat: await Ju(mX.input, mH, me),
      source: mQ,
      sourceFormat: mj,
      pictures: mO.pictures ?? null,
    };
  }
  async function mw() {
    let mS = m8 && (await K.get(m8.id));
    if (
      (m9.close(), (m8 = null), await D4.setCharacter(null), (Dt = null), mS?.kind === 'autorigged')
    ) {
      D8(mS.id);
      return;
    }
    (D8(DX() || ''),
      D9('Its dots are kept \u2014 \u2699 on its card to finish rigging it.'),
      (DE = await K.list()),
      m1());
  }
  async function mV(mS) {
    let mE = await K.get(mS);
    if (!mE) return;
    let mF = await DU(),
      {
        gltf: mC,
        report: mt,
        preset: mH,
      } = await DK(
        await (mE.source ?? mE.blob).arrayBuffer(),
        mE.sourceFormat ?? mE.format ?? 'glb',
      );
    if (mt.tier !== 'unrigged') {
      ((DS = { name: mE.name, report: mt }), m1());
      return;
    }
    let me = ga(mC.scene, VN, { turn: mE.turn || 0, height: mE.height ?? null }),
      mR = si(mC.scene),
      mQ = Ui(mR, me, VN);
    ((m8 = { id: mS }),
      await D4.setCharacter(mS, (mj) => Tu(mj, { ...mC, scene: mC.scene.clone(!0) }, me, VN), {
        force: !0,
      }),
      (Dt = { ref: mS, report: mt, gltf: mC, preset: mH }),
      m9.open(mE.name, {
        ref: mF,
        body: mQ,
        meshes: mR,
        place: me,
        digits: mE.digits ?? 5,
        markers: mE.markers ?? null,
        own: mE.own ?? [],
        tags: mE.tags ?? [],
        joints: mE.joints ?? {},
        envelopes: mE.envelopes ?? {},
        rigged: mE.kind === 'autorigged',
      }));
  }
  (K.list()
    .then((mS) => {
      ((DE = mS), m1());
    })
    .catch(() => m1()),
    m1());
  let mD = (mS) => (m9.isOpen ? (mS ? m9.redo() : m9.undo()) || !0 : !1);
  function mm() {
    m9.isOpen && !m9.binding && mw();
  }
  return {
    render: m1,
    apply: DA,
    ref: DX,
    add: Dx,
    recordFor: m2,
    adopt: m3,
    retargetOpen: m7,
    autorigOpen: mV,
    mountGrid: DN,
    filterGrid: DM,
    rigUndo: mD,
    closeRig: mm,
    rigForAnimation: DT,
    get rigging() {
      return m9.isOpen;
    },
  };
}
var df = 'cgstuff.news.seen';
function uf({ button: D3, url: D4 = '/news.json' }) {
  if (!D3) return;
  let releaseFocus = null;
  let D5 = null,
    D6 = null,
    D7 = document.createElement('span');
  ((D7.className = 'af-news__dot'), (D7.hidden = !0), D3.appendChild(D7));
  let D8 = () => {
      try {
        return localStorage.getItem(df);
      } catch {
        return null;
      }
    },
    D9 = (DS) => {
      try {
        localStorage.setItem(df, DS);
      } catch {}
    };
  async function Dk() {
    if (D5) return D5;
    let DS = await fetch(D4, { cache: 'no-cache' });
    if (!DS.ok) throw new Error('news returned ' + DS.status);
    return ((D5 = (await DS.json()).entries ?? []), D5);
  }
  (Dk()
    .then((DS) => {
      DS[0] && DS[0].id !== D8() && (D7.hidden = !1);
    })
    .catch(() => {}),
    D3.addEventListener('click', () => Dw()));
  async function Dw() {
    if (D6) return;
    ((D6 = document.createElement('div')),
      (D6.className = 'af-newsbox'),
      D6.addEventListener('click', (Dt) => {
        Dt.target === D6 && DV();
      }));
    let DS = bo('div', 'af-newsbox__panel');
    (DS.setAttribute('role', 'dialog'),
      DS.setAttribute('aria-modal', 'true'),
      DS.setAttribute('aria-label', 'What\u2019s new'));
    let DE = bo('div', 'af-newsbox__head');
    DE.appendChild(bo('h2', 'af-newsbox__title', 'What\u2019s new'));
    let DF = bo('button', 'af-newsbox__close', '\u2715');
    ((DF.type = 'button'),
      (DF.title = 'Close'),
      DF.setAttribute('aria-label', 'Close'),
      DF.addEventListener('click', DV),
      DE.appendChild(DF));
    let DC = bo('div', 'af-newsbox__body');
    (DC.appendChild(bo('p', 'af-newsbox__empty', 'Loading\u2026')),
      DS.append(DE, DC),
      D6.appendChild(DS),
      document.body.appendChild(D6),
      (releaseFocus = containModalFocus(DS)),
      document.addEventListener('keydown', DD),
      DF.focus());
    try {
      let Dt = await Dk();
      ((DC.innerHTML = ''),
        Dt.length || DC.appendChild(bo('p', 'af-newsbox__empty', 'Nothing yet.')));
      for (let DH of Dt) DC.appendChild(Dm(DH));
      Dt[0] && (D9(Dt[0].id), (D7.hidden = !0));
    } catch {
      ((DC.innerHTML = ''),
        DC.appendChild(
          bo('p', 'af-newsbox__empty', 'The news couldn\u2019t be loaded. Try again in a moment.'),
        ));
    }
  }
  function DV() {
    (releaseFocus?.(), (releaseFocus = null), D6?.remove(), (D6 = null), document.removeEventListener('keydown', DD), D3.focus());
  }
  function DD(DS) {
    DS.key === 'Escape' && DV();
  }
  function Dm(DS) {
    let DE = bo('article', 'af-newsbox__entry');
    if (DS.date) {
      let DF = new Date(DS.date + 'T12:00:00');
      DE.appendChild(
        bo(
          'time',
          'af-newsbox__date',
          Number.isNaN(DF.getTime())
            ? DS.date
            : DF.toLocaleDateString(void 0, { day: 'numeric', month: 'long', year: 'numeric' }),
        ),
      );
    }
    DS.title && DE.appendChild(bo('h3', 'af-newsbox__entrytitle', DS.title));
    for (let DC of DS.sections ?? []) {
      DC.title && DE.appendChild(bo('h4', 'af-newsbox__section', DC.title));
      let Dt = bo('ul', 'af-newsbox__list');
      for (let DH of DC.items ?? []) Dt.appendChild(bo('li', null, DH));
      DE.appendChild(Dt);
    }
    return DE;
  }
}
function bo(D3, D4, D5) {
  let D6 = document.createElement(D3);
  return (D4 && (D6.className = D4), D5 != null && (D6.textContent = D5), D6);
}
function ff({ button: D3, url: D4 = '/faq.json' }) {
  if (!D3) return;
  let releaseFocus = null;
  let D5 = null,
    D6 = null;
  async function D7() {
    if (D5) return D5;
    let DV = await fetch(D4, { cache: 'no-cache' });
    if (!DV.ok) throw new Error('faq returned ' + DV.status);
    return ((D5 = (await DV.json()).entries ?? []), D5);
  }
  D3.addEventListener('click', () => D8());
  async function D8() {
    if (D6) return;
    ((D6 = document.createElement('div')),
      (D6.className = 'af-newsbox'),
      D6.addEventListener('click', (DE) => {
        DE.target === D6 && D9();
      }));
    let DV = wo('div', 'af-newsbox__panel');
    (DV.setAttribute('role', 'dialog'),
      DV.setAttribute('aria-modal', 'true'),
      DV.setAttribute('aria-label', 'Frequently asked questions'));
    let DD = wo('div', 'af-newsbox__head');
    DD.appendChild(wo('h2', 'af-newsbox__title', 'FAQ'));
    let Dm = wo('button', 'af-newsbox__close', '\u2715');
    ((Dm.type = 'button'),
      (Dm.title = 'Close'),
      Dm.setAttribute('aria-label', 'Close'),
      Dm.addEventListener('click', D9),
      DD.appendChild(Dm));
    let DS = wo('div', 'af-newsbox__body');
    (DS.appendChild(wo('p', 'af-newsbox__empty', 'Loading\u2026')),
      DV.append(DD, DS),
      D6.appendChild(DV),
      document.body.appendChild(D6),
      (releaseFocus = containModalFocus(DV)),
      document.addEventListener('keydown', Dk),
      Dm.focus());
    try {
      let DE = await D7();
      ((DS.innerHTML = ''),
        DE.length || DS.appendChild(wo('p', 'af-newsbox__empty', 'Nothing yet.')));
      for (let DF of DE) DS.appendChild(Dw(DF));
    } catch {
      ((DS.innerHTML = ''),
        DS.appendChild(
          wo(
            'p',
            'af-newsbox__empty',
            'The questions couldn\u2019t be loaded. Try again in a moment.',
          ),
        ));
    }
  }
  function D9() {
    (releaseFocus?.(), (releaseFocus = null), D6?.remove(), (D6 = null), document.removeEventListener('keydown', Dk), D3.focus());
  }
  function Dk(DV) {
    DV.key === 'Escape' && D9();
  }
  function Dw(DV) {
    let DD = wo('details', 'af-faq__item');
    DD.appendChild(wo('summary', 'af-faq__q', DV.q ?? ''));
    let Dm = wo('div', 'af-faq__a');
    for (let DE of [].concat(DV.a ?? [])) Dm.appendChild(wo('p', null, DE));
    let DS = (DV.links ?? []).filter((DF) => DF?.text && Ah(DF.href));
    if (DS.length) {
      let DF = wo('p', 'af-faq__links');
      for (let DC of DS) {
        let Dt = wo('a', null, DC.text);
        ((Dt.href = DC.href),
          /^https:/i.test(DC.href) && ((Dt.target = '_blank'), (Dt.rel = 'noopener noreferrer')),
          DF.appendChild(Dt));
      }
      Dm.appendChild(DF);
    }
    return (DD.appendChild(Dm), DD);
  }
}
var Ah = (D3) =>
  typeof D3 == 'string' && (/^https:\/\/[^\s]+$/i.test(D3) || /^\/(?!\/)[^\s]*$/.test(D3));
function wo(D3, D4, D5) {
  let D6 = document.createElement(D3);
  return (D4 && (D6.className = D4), D5 != null && (D6.textContent = D5), D6);
}
S();
{
  let e = (D3) => {
      let D4 = D3.textContent.trim();
      D3.title &&
        !D3.hasAttribute('aria-label') &&
        D4.length <= 2 &&
        !/[a-z0-9]/i.test(D4) &&
        D3.setAttribute('aria-label', D3.title);
    },
    t = (D3) => {
      (D3.matches?.('button') && e(D3), D3.querySelectorAll?.('button').forEach(e));
    };
  (new MutationObserver((D3) => {
    for (let D4 of D3)
      D4.addedNodes.forEach((D5) => {
        D5.nodeType === 1 && t(D5);
      });
  }).observe(document.body, { childList: !0, subtree: !0 }),
    t(document.body));
  let n = (D3) => D3.setAttribute('aria-pressed', String(D3.classList.contains('is-on'))),
    i = [
      ...document.querySelectorAll(
        '#lib-skeleton, #lib-wireframe, #lib-follow, #lib-inplace-view, #lib-mirror, #lib-reverse, #lib-reverse-origin, [data-axis]',
      ),
    ],
    l = new MutationObserver((D3) => D3.forEach((D4) => n(D4.target)));
  for (let o of i) (n(o), l.observe(o, { attributes: !0, attributeFilter: ['class'] }));
}
(uf({ button: document.getElementById('af-news') }),
  ff({ button: document.getElementById('af-faq') }),
  X({ button: document.getElementById('af-support') }));
var $o = 'assets/animation-library',
  _a = !0,
  qo = 'a_tpose',
  fi = 'idle_loop',
  Eh = $o + '/manifests/library.json',
  Rt = (D3) => document.getElementById(D3),
  pe = {
    stage: Rt('lib-stage'),
    grid: Rt('lib-grid'),
    search: Rt('lib-search'),
    follow: Rt('lib-follow'),
    tabAnims: Rt('lib-tab-anims'),
    tabChars: Rt('lib-tab-chars'),
    tabPoses: Rt('lib-tab-poses'),
    poses: Rt('lib-poses'),
    charGrid: Rt('lib-chargrid'),
    count: Rt('lib-count'),
    rigPanel: Rt('lib-rig-panel'),
    bundleFormat: Rt('lib-bundle-format'),
    bundleTarget: Rt('lib-bundle-target'),
    fbxTargetRow: Rt('lib-fbx-target-row'),
    bundleSkeleton: Rt('lib-bundle-skeleton'),
    bundleMannequin: Rt('lib-bundle-mannequin'),
    mannequinRow: Rt('lib-mannequin-row'),
    split: Rt('lib-split'),
    splitRow: Rt('lib-split-row'),
    cameraPanel: Rt('lib-camera-panel'),
    status: Rt('lib-status'),
    title: Rt('lib-title'),
    meta: Rt('lib-meta'),
    playPause: Rt('lib-playpause'),
    scrub: Rt('lib-scrub'),
    time: Rt('lib-time'),
    unit: Rt('lib-unit'),
    speed: Rt('lib-speed'),
    loop: Rt('lib-loop'),
    autoKey: Rt('lib-autokey'),
    skeleton: Rt('lib-skeleton'),
    wireframe: Rt('lib-wireframe'),
    viewtools: Rt('lib-viewtools'),
    shadeColour: Rt('lib-shade-colour'),
    shadeGrey: Rt('lib-shade-grey'),
    onion: Rt('lib-onion'),
    onionMore: Rt('lib-onion-more'),
    reframe: Rt('lib-reframe'),
    inPlaceView: Rt('lib-inplace-view'),
    mirror: Rt('lib-mirror'),
    reverse: Rt('lib-reverse'),
    reverseOrigin: Rt('lib-reverse-origin'),
    composer: Rt('lib-composer'),
    adjust: Rt('lib-adjust'),
    rail: Rt('lib-rail'),
    propsPanel: Rt('lib-props-panel'),
    presetsPanel: Rt('lib-presets-panel'),
    importPanel: Rt('lib-import-panel'),
    barLinks: Rt('af-links'),
    ikPanel: Rt('lib-ik-panel'),
    toolPanel: Rt('lib-toolpanel'),
    axesGroup: Rt('lib-axes-group'),
    axesTag: Rt('lib-axes-tag'),
    transport: Rt('lib-transport'),
    bundleBar: Rt('lib-bundle'),
    bundleCount: Rt('lib-bundle-count'),
    bundleGo: Rt('lib-bundle-go'),
    bundleRest: Rt('lib-bundle-rest'),
    saveMine: Rt('lib-save-mine'),
    bundleClear: Rt('lib-bundle-clear'),
    bundleAll: Rt('lib-bundle-all'),
    bundleRig: Rt('lib-bundle-rig'),
    inPlace: Rt('lib-inplace'),
    inPlaceRow: Rt('lib-inplace-row'),
    chips: Rt('lib-chips'),
    chipsEmpty: Rt('lib-chips-empty'),
    group: Rt('lib-group'),
    currentTags: Rt('lib-current-tags'),
    drawer: Rt('lib-drawer'),
    seq: Rt('lib-seq'),
    strips: Rt('lib-strips'),
    undo: Rt('lib-undo'),
    redo: Rt('lib-redo'),
    share: Rt('lib-share'),
  };
var Oh = (D3) => Math.floor(D3) + '.' + String(Math.floor((D3 % 1) * 100)).padStart(2, '0') + 's',
  mf = 'cgstuff.library.timeUnit',
  Rs = 'sec';
try {
  let e = localStorage.getItem(mf);
  (e === 'frames' || e === 'sec') && (Rs = e);
} catch {}
var vs = null,
  xa = null,
  pi = [],
  js = (D3) => (Rs === 'frames' && vs ? Math.round(D3 * vs) + 'f' : Oh(D3));
function yo(
  D3,
  {
    error: D4 = !1,
    retry: D5 = null,
    detail: D6 = null,
    close: D7 = !1,
    retryLabel: D8 = 'Retry',
  } = {},
) {
  if (D4) document.getElementById('workspace-export')?.close();
  ((pe.status.hidden = !1), pe.status.classList.toggle('is-error', D4), (pe.status.innerHTML = ''));
  let D9 = document.createElement('p');
  if (((D9.textContent = D3), pe.status.appendChild(D9), D6)) {
    let Dk = document.createElement('p');
    ((Dk.className = 'lib-status__detail'), (Dk.textContent = D6), pe.status.appendChild(Dk));
  }
  if (D5 || D7) {
    let Dw = document.createElement('div');
    Dw.className = 'lib-status__actions';
    let DV = (DD, Dm) => {
      let DS = document.createElement('button');
      ((DS.type = 'button'),
        (DS.className = 'lib-btn'),
        (DS.textContent = DD),
        DS.addEventListener('click', Dm),
        Dw.appendChild(DS));
    };
    (D5 && DV(D8, D5),
      D7 &&
        DV('Close', () => {
          pe.status.hidden = !0;
        }),
      pe.status.appendChild(Dw));
  }
}
var Ho = () => {
  pe.status.hidden = !0;
};
function Ih() {
  try {
    let D3 = document.createElement('canvas');
    return !!(D3.getContext('webgl2') || D3.getContext('webgl'));
  } catch {
    return !1;
  }
}
async function initializeWorkspace() {
  if ((Ho(), !Ih())) {
    yo(
      'Your browser can\u2019t show 3D here \u2014 WebGL is off or unavailable. Try an up-to-date Chrome, Edge or Firefox, with hardware acceleration turned on in its settings.',
      { error: !0 },
    );
    return;
  }
  yo('Loading library\u2026');
  let D3;
  try {
    let rL = await fetch(Eh, { cache: 'no-cache' });
    if (!rL.ok) throw new Error('manifest returned ' + rL.status);
    D3 = await rL.json();
  } catch (rb) {
    yo('Could not load the animation manifest. ' + rb.message, { error: !0, retry: initializeWorkspace });
    return;
  }
  let D4 = D3.clips || {};
  D4[qo] && (D4[qo].unlisted = !0);
  let D5 = P({ container: pe.stage, assetRoot: $o }),
    D6 = !1,
    D7 = null,
    D8 = D({
      root: pe.grid,
      assetRoot: $o,
      onClearFilters: () => DW(),
      onSelect: (rx, ry) => {
        if (D6) return Dv(rx, ry);
        ((D7 = [rx, ry]),
          yo('Loading\u2026 \u201C' + (ry.label || rx) + '\u201D plays when it\u2019s ready'));
      },
      onDragOut: (rx, ry, rW) => Sv(rx, ry, rW),
      onToggleSelect: (rx) => {
        (Db(rx), Dz?.render());
      },
    }),
    D9 = null,
    Dk = [],
    Dw = null,
    DV = null,
    DD = null,
    Dm = new Proxy(
      {},
      {
        get: (rx, ry) => (DV ?? D4)[ry],
        has: (rx, ry) => ry in (DV ?? D4),
        ownKeys: () => Reflect.ownKeys(DV ?? D4),
        getOwnPropertyDescriptor: (rx, ry) => {
          let rW = DV ?? D4;
          return ry in rW
            ? { value: rW[ry], enumerable: !0, configurable: !0, writable: !0 }
            : void 0;
        },
      },
    ),
    DS = () => kC(D5.getRigDescription()),
    DE = () => Oc(D5.getRigDescription());
  function DF() {
    let rx = D8.getSelected();
    return rx.length ? rx : D9 ? [D9] : [];
  }
  let DC = new Map();
  function DH(rx) {
    let ry = rx.filter((rP) => D4[rP]?.rootMotion),
      rW = rx.filter((rP) => !D4[rP]?.rootMotion && DC.get(rP)),
      rq = ry.length + rW.length > 0;
    ((pe.inPlace.disabled = !rq),
      pe.inPlaceRow.classList.toggle('is-disabled', !rq),
      (pe.inPlaceRow.title =
        !ry.length && rW.length
          ? rW.length +
            ' clip(s) in this download turn: In place, with YAW, holds them facing one way'
          : rq
            ? ry.length + ' clip(s) in this download travel'
            : 'Nothing in this download has root motion'),
      rq || (pe.inPlace.checked = !1),
      DM());
  }
  let DR = null,
    DQ = null,
    Dj = null,
    Dz = null,
    DO = null,
    DJ = null,
    DZ = Hd(),
    DU = !1,
    DK = null,
    DT = null,
    DA = !1,
    DX = null,
    DL = !1;
  function Db(rx) {
    let ry = rx.length;
    ((pe.bundleCount.textContent =
      ry === 0 ? (D9 ? 'Current clip' : 'Nothing selected') : ry + ' selected'),
      pe.bundleCount.classList.toggle('is-active', ry > 0));
    let rW = DR?.isActive?.(),
      rq = DF();
    pe.bundleGo.disabled = !rW && rq.length === 0;
    let rP = !Dw && !rW && rq.length > 1;
    ((pe.split.disabled = !rP),
      pe.splitRow.classList.toggle('is-disabled', !rP),
      (pe.splitRow.title = rP
        ? 'One file per clip, together in a .zip'
        : rW
          ? 'A composite is one clip'
          : 'Select two or more clips to get one file per clip'),
      rP || (pe.split.checked = !1));
    let rY = pe.bundleFormat.value === 'fbx' ? 'FBX' : 'GLB';
    ((pe.bundleGo.textContent = rW
      ? '\u2193 Download composite'
      : rq.length > 1
        ? pe.split.checked
          ? '\u2193 Download ' + rq.length + ' ' + rY + 's as .zip'
          : '\u2193 Download ' + rq.length + ' as one ' + rY
        : '\u2193 Download'),
      DH(rW ? [] : rq));
  }
  Db([]);
  let Dx = () =>
      Object.values(D4).filter(
        (rx) => !rx.deprecated && !rx.unlisted && !kA(rx) && rx.status?.exported !== !1,
      ).length,
    Dy = (rx) => {
      let ry = DV ? Object.keys(DV).length : Dx();
      pe.count.textContent = (rx < ry ? rx + ' of ' + ry : rx) + ' clip' + (ry === 1 ? '' : 's');
    };
  function DW() {
    ((pe.search.value = ''), D8.filter(''), Dy(D8.clearTags()), Dq(), D9 && D8.setActive(D9));
  }
  function Dq() {
    let rx = D8.tagVocabulary(),
      ry = new Set(D8.getActiveTags());
    if (((pe.chips.innerHTML = ''), (pe.chipsEmpty.hidden = rx.length > 0), !!rx.length)) {
      for (let [rW, rq] of rx) {
        let rP = document.createElement('button');
        ((rP.type = 'button'),
          (rP.className = 'lib-chip' + (ry.has(rW) ? ' is-on' : '')),
          (rP.textContent = rW + ' ' + rq),
          rP.setAttribute('aria-pressed', String(ry.has(rW))),
          rP.addEventListener('click', () => {
            (Dy(D8.toggleTag(rW)), Dq(), D9 && D8.setActive(D9));
          }),
          pe.chips.appendChild(rP));
      }
      if (ry.size) {
        let rY = document.createElement('button');
        ((rY.type = 'button'),
          (rY.className = 'lib-chip lib-chip--clear'),
          (rY.textContent = '\u2715 clear'),
          rY.addEventListener('click', () => {
            (Dy(D8.clearTags()), Dq(), D9 && D8.setActive(D9));
          }),
          pe.chips.appendChild(rY));
      }
    }
  }
  D8.setGrouped(pe.group.checked);
  let DP = D8.render(D3);
  (Dy(DP), Dq());
  let DY = await new Promise((rx) => {
    let ry = async () => {
      (Ho(), yo('Loading library\u2026'));
      try {
        rx(await D5.init(D3));
      } catch (rW) {
        yo('Could not load the rig. ' + rW.message, { error: !0, retry: ry });
      }
    };
    ry();
  });
  if (D4[qo])
    try {
      let rx = await D5.loadClip(qo, D4[qo]);
      (D5.setGripReference?.(rx) ?? 0) || console.warn('[Props] grip reference captured nothing');
    } catch (ry) {
      console.warn('[Props] could not read ' + qo + ':', ry.message);
    }
  else
    console.warn(
      '[Props] no "' +
        qo +
        '" clip \u2014 held props will sit wherever each clip leaves the socket.',
    );
  (Ho(),
    (pe.transport.hidden = !1),
    pe.viewtools && (pe.viewtools.hidden = !1),
    document.body.classList.add('is-ready'),
    console.log('[AnimationLibrary] rig loaded \u2014 ' + DY.bones + ' bones, ' + DP + ' clip(s)'));
  async function Dv(rW, rq) {
    if (rW === D9) {
      DG();
      return;
    }
    if (rq.animal) {
      ((D9 = rW),
        S1(),
        D6 && Sm(),
        (vs = rq.fps || null),
        DN(),
        D8.setActive(rW),
        (pe.title.textContent = rq.label || rW),
        m2(rq),
        (pe.currentTags.innerHTML = ''),
        DX?.render(),
        Db(D8.getSelected()));
      try {
        (await D5.play(rW, rq), Ho(), (pe.scrub.max = String(rq.duration || 0)), DB(!1));
      } catch (rY) {
        ((D9 = null),
          Db(D8.getSelected()),
          yo('Could not play "' + (rq.label || rW) + '". ' + rY.message, {
            error: !0,
            retry: () => Dv(rW, rq),
          }));
      }
      return;
    }
    ((D9 = rW),
      DO?.picked(),
      S1(),
      DT?.refresh(),
      (vs = rq.fps || null),
      DN(),
      mq?.refresh?.(),
      DX?.render(),
      D8.setActive(rW),
      (pe.title.textContent = rq.label || rW),
      m2(rq),
      (pe.currentTags.innerHTML = ''));
    for (let rv of rq.tags || []) {
      let rB = document.createElement('button');
      ((rB.type = 'button'),
        (rB.className = 'lib-chip lib-chip--sm'),
        (rB.textContent = rv),
        (rB.title = 'Filter by "' + rv + '"'),
        rB.addEventListener('click', () => {
          (Dy(D8.toggleTag(rv)), Dq(), D8.setActive(D9));
        }),
        pe.currentTags.appendChild(rB));
    }
    if (
      ((pe.inPlaceView.disabled = !rq.rootMotion && !DC.get(D9)),
      DM(),
      !rq.rootMotion && !DC.has(D9))
    ) {
      let rG = D9;
      Promise.resolve(D5.loadClip(rG, rq))
        .then((rg) => {
          (DC.set(
            rG,
            !!rg &&
              kv(rg, {
                rootName: D3.rig?.joints?.[0] || 'root',
                rootRest: D5.getPoseRest()?.get?.(D3.rig?.joints?.[0] || 'root') ?? null,
              }),
          ),
            !(D9 !== rG || !DC.get(rG)) &&
              ((pe.inPlaceView.disabled = !1),
              (pe.inPlaceView.title = 'Preview held in place: with YAW, facing one way throughout'),
              DH(DF()),
              DM()));
        })
        .catch(() => {});
    }
    ((pe.inPlaceView.title = rq.rootMotion
      ? 'Preview with root motion removed'
      : 'This clip already animates in place'),
      Db(D8.getSelected()),
      D5.getState().inPlace && (m0(), DM()),
      D6 && Sm());
    let rP = setTimeout(() => pe.stage.classList.add('is-switching'), 150);
    try {
      (await D5.play(rW, rq), Ho(), (pe.scrub.max = String(rq.duration || 0)), DB(!1));
    } catch (rg) {
      ((D9 = null),
        Db(D8.getSelected()),
        yo('Could not load "' + rW + '". ' + rg.message, { error: !0, retry: () => Dv(rW, rq) }));
    }
    (clearTimeout(rP), pe.stage.classList.remove('is-switching'));
  }
  let DB = (rW) => {
    ((pe.playPause.textContent = rW ? '\u25B6' : '\u23F8'),
      pe.playPause.setAttribute('aria-label', rW ? 'Play' : 'Pause'));
  };
  function DG() {
    let rW = D5.getState();
    (rW.finished ? D5.replay() : D5.setPaused(!rW.paused), DB(D5.getState().paused));
  }
  pe.playPause.addEventListener('click', DG);
  let Dg = !1,
    DI = !1;
  pe.scrub.addEventListener('pointerdown', () => {
    Dg = !0;
    let rW = D5.getState();
    ((DI = !rW.paused && !rW.finished), DI && (D5.setPaused(!0), DB(!0)));
  });
  let Dh = () => {
    Dg && ((Dg = !1), DI && (D5.setPaused(!1), DB(!1)), (DI = !1));
  };
  (pe.scrub.addEventListener('pointerup', Dh),
    pe.scrub.addEventListener('pointercancel', Dh),
    pe.scrub.addEventListener('input', () => {
      (D5.seek(Number(pe.scrub.value)), (pe.time.textContent = js(Number(pe.scrub.value))));
    }));
  function DN() {
    let rW = !!vs;
    pe.unit.disabled = !rW;
    let rq = Rs === 'frames' && rW ? 'frames' : 'sec';
    ((pe.unit.textContent = rq === 'frames' ? 'FRAMES' : 'SEC'),
      pe.unit.classList.toggle('is-on', rq === 'frames'),
      (pe.unit.title = rW
        ? rq === 'frames'
          ? 'Showing frames \u2014 click for seconds'
          : 'Showing seconds \u2014 click for frames'
        : 'This clip has no fps recorded \u2014 re-export it from Blender'));
    let rP = D5.getState();
    pe.time.textContent = js(rP.time) + ' / ' + js(rP.duration);
  }
  (pe.unit.addEventListener('click', () => {
    Rs = Rs === 'frames' ? 'sec' : 'frames';
    try {
      localStorage.setItem(mf, Rs);
    } catch {}
    DN();
  }),
    DN(),
    pe.speed.addEventListener('change', () => D5.setSpeed(Number(pe.speed.value))),
    pe.loop.addEventListener('change', () => D5.setLoop(pe.loop.checked)),
    pe.skeleton.addEventListener('click', () =>
      pe.skeleton.classList.toggle('is-on', D5.toggleSkeleton()),
    ),
    pe.wireframe.addEventListener('click', () =>
      pe.wireframe.classList.toggle('is-on', D5.toggleWireframe()),
    ));
  {
    let rW = (rq) => {
      for (let [rP, rY] of [
        [pe.shadeColour, rq !== 'grey'],
        [pe.shadeGrey, rq === 'grey'],
      ])
        (rP?.classList.toggle('is-on', rY), rP?.setAttribute('aria-pressed', String(rY)));
    };
    (pe.shadeColour?.addEventListener('click', () => rW(D5.setShading('colour'))),
      pe.shadeGrey?.addEventListener('click', () => rW(D5.setShading('grey'))));
  }
  pe.onion &&
    pe.onionMore &&
    (xa = su({
      toggle: pe.onion,
      more: pe.onionMore,
      player: D5,
      clock: () => mT(),
      seek: (rq) => {
        let rP = mT(),
          rY = D5.getState();
        rP && rY.duration > 0 && D5.seek((rq / Math.max(1, rP.frames - 1)) * rY.duration);
      },
      marks: {
        get: () => pi,
        set: (rq) => {
          ((pi = q(W(rq))), SD());
        },
      },
      clipKey: () => (DR?.getComposite?.() ? 'sequence' : D9) ?? '',
    }));
  {
    let rq = 'cgstuff.library.follow',
      rP = (rv, rB) => {
        if (
          (pe.follow.classList.toggle('is-on', D5.setStageFollow(rv)),
          pe.follow.setAttribute('aria-pressed', String(rv)),
          rB)
        )
          try {
            localStorage.setItem(rq, rv ? '1' : '0');
          } catch {}
      },
      rY = !1;
    try {
      rY = localStorage.getItem(rq) === '1';
    } catch {}
    (rP(rY, !1),
      pe.follow.addEventListener('click', () => rP(!pe.follow.classList.contains('is-on'), !0)));
  }
  function DM() {
    let rv = D5.getState();
    pe.inPlaceView.classList.toggle('is-on', rv.inPlace);
    for (let rB of pe.axesGroup.querySelectorAll('[data-axis]'))
      (rB.classList.toggle('is-on', !!rv.lock[rB.dataset.axis]),
        (rB.disabled = pe.inPlaceView.disabled));
    ((pe.axesTag.textContent = w1(rv.lock)), (pe.axesTag.hidden = !pe.inPlace.checked));
  }
  pe.inPlaceView.addEventListener('click', () => {
    (D5.setInPlace(!D5.getState().inPlace), m0(), DM(), SD());
  });
  function m0() {
    pe.inPlace.disabled || (pe.inPlace.checked = D5.getState().inPlace);
  }
  pe.mirror.addEventListener('click', () => {
    (pe.mirror.classList.toggle('is-on', D5.setMirrored(!D5.getState().mirrored)), SD());
  });
  function m1() {
    let rv = D5.getState();
    (pe.reverse.classList.toggle('is-on', rv.reversed),
      pe.reverseOrigin.classList.toggle('is-on', rv.reverseOrigin),
      (pe.reverseOrigin.disabled = !rv.reversed));
  }
  (pe.reverse.addEventListener('click', () => {
    (D5.setReversed(!D5.getState().reversed), m1(), SD());
  }),
    pe.reverseOrigin.addEventListener('click', () => {
      (D5.setReverseOrigin(!D5.getState().reverseOrigin), m1(), SD());
    }));
  for (let rv of pe.axesGroup.querySelectorAll('[data-axis]'))
    rv.addEventListener('click', () => {
      let rB = rv.dataset.axis;
      (D5.setLock({ [rB]: !D5.getState().lock[rB] }), DM(), SD());
    });
  pe.reframe.addEventListener('click', () => D5.frameRig());
  function m2(rB) {
    rB &&
      (pe.meta.textContent = [
        (rB.duration || 0).toFixed(2) + 's',
        rB.frames ? rB.frames + ' frames' : null,
        rB.fps ? rB.fps + ' fps' : null,
        rB.loops ? 'loop' : 'one-shot',
        rB.rootMotion
          ? 'travels ' + ((rB.rootDistance ?? 0) * (D5.getState().bodyScale ?? 1)).toFixed(2) + 'm'
          : 'in place',
        rB.category,
      ]
        .filter(Boolean)
        .join(' \u00B7 '));
  }
  function m3() {
    D9 && m2(D4[D9]);
    let rB = !!D5.getCustom?.();
    ((pe.bundleSkeleton.options[0].textContent = rB ? 'Default (its own skeleton)' : 'Default'),
      (pe.bundleSkeleton.title = rB
        ? 'Default: the skeleton of the character that is worn, under its own bone names. Pick another to download on that one instead.'
        : ''),
      me?.render(),
      mb?.render(),
      mQ?.render());
  }
  for (let [rB, rG] of Object.entries(s))
    rG.verified && pe.bundleTarget.appendChild(new Option(rG.label, rB));
  ((pe.bundleTarget.value = s[H]?.verified ? H : (pe.bundleTarget.options[0]?.value ?? '')),
    pe.bundleTarget.options.length ||
      pe.bundleFormat.querySelector('option[value="fbx"]')?.remove());
  function m4() {
    let rg = pe.bundleFormat.value === 'fbx',
      rI = !Dw && pe.bundleSkeleton.value !== 'default',
      rN = rg && !rI;
    ((pe.bundleTarget.disabled = !rN),
      pe.fbxTargetRow.classList.toggle('is-disabled', !rN),
      (pe.fbxTargetRow.title = rN
        ? 'Scale and axes for the app the FBX is going into'
        : rI
          ? 'That skeleton brings its own units'
          : 'GLB is always in metres; Units is for FBX'));
    let rM = pe.bundleSkeleton.value !== 'default';
    ((pe.bundleRig.disabled = rM),
      (pe.bundleRig.parentElement.title = rM
        ? 'Animation only: the clip goes onto your own character on that skeleton.'
        : ''),
      (pe.bundleRest.disabled = rM),
      (pe.bundleRest.title = rM
        ? 'You already have that skeleton\u2019s own character: import the animation onto it. There is no character of ours to give on it.'
        : 'The character on screen, alone, standing in its rest pose with its skeleton \u2014 no animation in the file. Import it into your engine first, to make the character; then download the clips without the mesh and import them onto its skeleton.'),
      (pe.mannequinRow.hidden = pe.bundleSkeleton.value !== 'ue5'));
  }
  let m5 = () =>
    pe.bundleSkeleton.value === 'ue5' ? pe.bundleMannequin.value : pe.bundleSkeleton.value;
  (pe.bundleFormat.addEventListener('change', m4),
    pe.bundleTarget.addEventListener('change', m4),
    pe.bundleSkeleton.addEventListener('change', () => {
      let rg = pe.bundleFormat.querySelector('option[value="fbx"]');
      (pe.bundleSkeleton.value !== 'default' &&
        pe.bundleFormat.value !== 'fbx' &&
        rg &&
        ((pe.bundleFormat.value = 'fbx'), Db(D8.getSelected())),
        m4());
    }),
    pe.bundleFormat.addEventListener('change', () => Db(D8.getSelected())),
    pe.split.addEventListener('change', () => Db(D8.getSelected())),
    m4());
  let m6 = ['adjust', 'props', 'picker', 'import', 'presets'],
    m7 = [
      ...m6.map((rg) => '.lib-rail__btn[data-tool="' + rg + '"]'),
      '#lib-reverse-origin',
      '#lib-axes-group',
      '#lib-inplace-view',
      '#lib-skeleton',
      '#lib-wireframe',
      '#lib-follow',
      '#lib-inplace-row',
      '#lib-split-row',
      '#lib-bundle-rest',
      '#lib-save-mine',
    ].join(', '),
    m8 = ['#lib-bundle-rig', '#lib-bundle-mannequin', '#lib-bundle-skeleton'];
  function m9(rg) {
    document.documentElement.classList.toggle('is-animal', rg);
    let rI = [
      ...document.querySelectorAll(m7),
      ...m8.map((rN) => document.querySelector(rN)?.closest('label')).filter(Boolean),
    ];
    for (let rN of rI) (rN.classList.toggle('is-off-for-animal', rg), (rN.inert = rg));
    m4();
  }
  async function mk() {
    let rg = Dw,
      rI = DR?.getComposite?.() ?? null,
      rN = (rI ? DR.sourceIds() : DF()).filter((Ek) => DV?.[Ek]);
    if (!rg || !rN.length) return;
    let rM = rN.map((Ek) => DV[Ek].take),
      E0 = pe.bundleFormat.value === 'fbx',
      E1 = rN.some((Ek) => DV[Ek].mine),
      E2 = rN.map((Ek) => DV[Ek].made).find(Boolean) ?? null,
      E3 = D5.getState(),
      E4 = VO(mL?.get() ?? []).length > 0,
      E5 = D5.ikWillBake?.() ?? !1,
      E6 =
        rI || E4 || E5 || E3.reversed || E3.mirrored || E1
          ? {
              composed: !!rI,
              posed: E4,
              ik: E5,
              reversed: E3.reversed,
              mirrored: E3.mirrored,
              lab: E1,
              made: E2,
            }
          : null,
      E7 = [
        ...(E4 || E5 ? ['adjusted'] : []),
        ...(E3.reversed ? ['reversed'] : []),
        ...(E3.mirrored ? ['mirrored'] : []),
      ],
      E8 = (Ek) => String(Ek).replace(/[^A-Za-z0-9_]+/g, '_'),
      E9 = () => Db(D8.getSelected());
    ((pe.bundleGo.disabled = !0),
      (pe.bundleGo.textContent = 'Writing ' + (E0 ? 'FBX' : 'GLB') + '\u2026'),
      await new Promise((Ek) => setTimeout(Ek, 30)));
    try {
      let Ek = u(rg.name, rM, { edits: E6 }),
        Ew = null;
      E6 &&
        (Ew = (rI ? [rI] : await Promise.all(rN.map((ES) => D5.loadClip(ES, DV[ES])))).map(
          (ES, EE) => {
            let EF = D5.bakeIk(D5.presentClip(ES), { fps: DV[rN[rI ? 0 : EE]]?.fps }).clone();
            return (
              (EF.name = E8(
                [rI ? rM.join('_') : DV[rN[EE]].mine ? DV[rN[EE]].label : rM[EE], ...E7].join('_'),
              )),
              EF
            );
          },
        ));
      let EV = E0
          ? await d({
              gltf: await mw.fresh(rg),
              takes: rM,
              clips: Ew,
              fbxTarget: pe.bundleTarget.value,
              provenance: Ek,
            })
          : new Blob([Ew ? xc(await mw.bytesOf(rg), Ew, Ek) : _c(await mw.bytesOf(rg), rM, Ek)], {
              type: 'model/gltf-binary',
            }),
        ED = rI
          ? rM.join('_')
          : rM.length === 1
            ? DV[rN[0]].mine
              ? DV[rN[0]].label
              : rM[0]
            : rM.length + '_animations',
        Em =
          rg.id +
          '_' +
          ED +
          (E0 && pe.bundleTarget.value ? '_' + pe.bundleTarget.value : '') +
          (rI ? '_composite' : '') +
          E7.map((ES) => '_' + ES).join('');
      (U(EV, E8(Em) + '.' + (E0 ? 'fbx' : 'glb')),
        (pe.bundleGo.textContent = (EV.size / 1024 / 1024).toFixed(1) + ' MB \u2713'),
        setTimeout(E9, 2500));
    } catch (ES) {
      (console.error(ES),
        E9(),
        yo('The download couldn\u2019t be made. Try again, or try the other format (GLB / FBX).', {
          error: !0,
          detail: ES.message,
          close: !0,
          retryLabel: 'Try again',
          retry: () => {
            (Ho(), pe.bundleGo.click());
          },
        }));
    } finally {
      pe.bundleGo.disabled = DF().length === 0;
    }
  }
  let mw = fd({ urlOf: (rg) => $o + '/animals/' + rg.file }),
    mV = fetch($o + '/animals/list.json')
      .then((rg) => (rg.ok ? rg.json() : null))
      .then((rg) => {
        ((Dk = dd(rg)), DQ?.render());
      })
      .catch(() => {}),
    mD = (rg) => {
      let rI =
        String(rg || '')
          .split('&')
          .find((rN) => rN.startsWith('r='))
          ?.slice(2) ?? '';
      return rI.startsWith(Js) && rI.length > Js.length ? rI.slice(Js.length) : null;
    };
  function mm(rg) {
    let rI = [D5.getRigRoot(), D5.getCustom?.()?.companion].filter(Boolean);
    if (rg) {
      for (let [rM, E0] of rg) rM.visible = E0;
      return null;
    }
    let rN = rI.map((E1) => [E1, E1.visible]);
    for (let E1 of rI) E1.visible = !1;
    return rN;
  }
  function mS(rg) {
    let rI = D5.getState();
    (!!rg.skeleton !== rI.skeleton && pe.skeleton.classList.toggle('is-on', D5.toggleSkeleton()),
      !!rg.wireframe !== rI.wireframe &&
        pe.wireframe.classList.toggle('is-on', D5.toggleWireframe()));
  }
  async function mE() {
    (mM(),
      DU &&
        DK != null &&
        (clearTimeout(DK),
        (DK = null),
        DZ.save({ state: mY(), clip: D9, project: DT?.current() ?? null })));
    let rg = D5.getState();
    ((DD = { state: mY(), clip: D9, look: { skeleton: rg.skeleton, wireframe: rg.wireframe } }),
      mS({}),
      Dj?.markEdited?.([]));
    let rI = mm(null);
    return (await SE('', { body: !1 }), rI);
  }
  function mF(rg, rI) {
    let rN = mC.then(() => mt(rg, rI));
    return ((mC = rN.catch(() => {})), rN);
  }
  let mC = Promise.resolve();
  async function mt(rg, { clip: rI = null, aside: rN = null } = {}) {
    let rM = Dk.find((E2) => E2.id === rg);
    if (!rM) return !1;
    if (Dw?.id === rg) return (rI && DV?.[rI] && rI !== D9 && (await Dv(rI, DV[rI])), !0);
    let E0 = setTimeout(() => pe.stage.classList.add('is-switching'), 150),
      E1 = null;
    try {
      await mw.bytesOf(rM);
      for (let E6 of Dj?.get() ?? []) m6.includes(E6) && Dj.hide(E6);
      (Dw ? await SE('', { body: !1 }) : (E1 = await mE()),
        rN &&
          typeof rN == 'object' &&
          (DD = { ...DD, state: String(rN.state ?? ''), clip: rN.clip ?? null }));
      let { animations: E2 } = await D5.setBody({
        key: 'animal.' + rM.id,
        url: mw.urlOf(rM),
        rig: km,
        size: rM.size,
      });
      ((E1 = null),
        (Dw = rM),
        (DV = ud(rM, Object.fromEntries(E2.map((E7) => [E7.name, E7.duration])))));
      for (let E7 of E2) D5.addClip(Zs(rM.id, E7.name), E7);
      let E3 = [];
      try {
        E3 = (await VP(VW)).filter((E8) => E8?.info?.animal === rM.id);
      } catch (E8) {
        console.warn(E8);
      }
      for (let E9 of E3) {
        try {
          D5.addClip(E9.id, k8(E9, await import('./dependencies/three.js')));
        } catch (Ek) {
          console.warn('[Animals] a saved loop is unreadable:', E9.name, Ek.message);
          continue;
        }
        DV[E9.id] = {
          label: E9.name,
          duration: E9.duration || 0,
          tags: ['yours'],
          rootMotion: !1,
          loops: !0,
          animal: rM.id,
          take: E9.info.take,
          fps: E9.info.fps,
          icon: E9.thumb || void 0,
          file: null,
          mine: !0,
          made: E9.lab?.madeWhat ?? null,
        };
      }
      for (let Ew of E2) {
        let EV = DV[Zs(rM.id, Ew.name)],
          ED = Ew.tracks.find((ES) => ES.times.length > 2);
        if (!EV) continue;
        let Em = ED ? (ED.times[ED.times.length - 1] - ED.times[0]) / (ED.times.length - 1) : 0;
        ((EV.fps = Em > 0 ? Math.round(1 / Em) : 30),
          (EV.frames = Math.max(2, Math.round(Ew.duration * EV.fps) + 1)));
      }
      (m9(!0), D8.clearTags(), Dy(D8.render({ ...D3, clips: DV })), Dq(), (D9 = null));
      let E4 = Zs(rM.id, rM.stands),
        E5 = rI && DV[rI] ? rI : DV[E4] ? E4 : Object.keys(DV)[0];
      return (E5 && (await Dv(E5, DV[E5])), mb?.render(), SD(), !0);
    } catch (ES) {
      if ((console.error(ES), !Dw && DD)) {
        let EE = DD;
        ((DD = null), E1 && mm(E1), mS(EE.look), await SS(EE.state, { asStep: !1 }));
      }
      return (
        yo('Could not load the ' + rM.name + '. ' + ES.message, {
          error: !0,
          retry: () => mF(rg, { clip: rI }),
        }),
        !1
      );
    } finally {
      (clearTimeout(E0), pe.stage.classList.remove('is-switching'), DQ?.render());
    }
  }
  async function mH({ restore: rg = !0 } = {}) {
    if (!Dw) return;
    let rI = DD;
    ((Dw = null),
      (DV = null),
      m9(!1),
      await D5.setBody(null),
      rI && mS(rI.look),
      D8.clearTags(),
      Dy(D8.render({ ...D3, clips: D4 })),
      Dq(),
      (DD = null));
    let rN = rI?.clip && D4[rI.clip] ? rI.clip : D4[fi] ? fi : null;
    ((D9 = null),
      rN && (await Dv(rN, D4[rN])),
      rg && rI && (await SS(rI.state), SD()),
      DQ?.render());
  }
  DQ = cf({
    mount: pe.rigPanel,
    player: D5,
    manifest: D3,
    animals: { list: () => Dk, current: () => Dw?.id ?? null, onPick: (rg) => mF(rg) },
    assetRoot: $o,
    onPick: async (rg) => {
      Dw && (await mH());
      let rI = mY()
        .split('&')
        .filter((rN) => rN && !rN.startsWith('r='));
      (rg && rI.push('r=' + rg), await SS(rI.join('&')), SD());
    },
    note: ro,
    reveal: () => Dj?.show('rig'),
    onChange: () => m3(),
    replay: () => SS(mY()),
  });
  let me = Yc({ mount: pe.cameraPanel, player: D5 });
  (D5.onState((rg) => DB(rg.paused || rg.finished)),
    D5.onTick((rg, rI) => {
      (rI > 0 && pe.scrub.max !== String(rI) && (pe.scrub.max = String(rI)),
        !Dg && ((pe.scrub.value = String(rg)), (pe.time.textContent = js(rg) + ' / ' + js(rI))));
    }));
  let mR = D3.props ?? {},
    mQ = Xc({
      mount: pe.propsPanel,
      player: D5,
      props: mR,
      THREE: await import('./dependencies/three.js'),
      loadGlb: (rg) => D5.parseGlb(rg),
      onChange: () => {
        (SD(), mb?.render());
      },
    });
  {
    let rg = function (E4, E5) {
        (rN?.remove(),
          (rN = document.createElement('div')),
          (rN.className = 'lib-resume lib-dropask'),
          rN.setAttribute('role', 'dialog'),
          rN.append(Object.assign(document.createElement('span'), { textContent: E4.name + ':' })));
        let E6 = null;
        for (let [E7, E8, E9] of [...E5, ['\u2715', 'Cancel', null]]) {
          let Ek = Object.assign(document.createElement('button'), {
            type: 'button',
            className: 'lib-btn lib-btn--sm',
            textContent: E7,
            title: E8,
          });
          (Ek.addEventListener('click', () => {
            (rN?.remove(), (rN = null), E9?.(E4));
          }),
            rN.append(Ek),
            (E6 ??= Ek));
        }
        (pe.status.parentElement.appendChild(rN), E6.focus());
      },
      rI = pe.stage,
      rN = null,
      rM = (E4) => {
        (Dj?.show('rig'), DQ?.add(E4));
      },
      E0 = (E4) => {
        (Dj?.show('props'), mQ.addFile(E4));
      },
      E1 = (E4) => {
        (Dj?.show('import'), Dz?.importFiles([E4]));
      };
    async function E2(E4) {
      let E5 = null;
      try {
        E5 = kI(await E4.arrayBuffer());
      } catch {}
      if (E5?.curves && !E5.meshes) {
        E1(E4);
        return;
      }
      if (E5?.meshes && !E5.curves) {
        rM(E4);
        return;
      }
      rg(E4, [
        ['Import animation', 'Its animation, onto our skeleton \u2014 joins the library', E1],
        ['Wear it', 'The character \u2014 checked, then worn', rM],
      ]);
    }
    (rI.addEventListener('dragover', (E4) => {
      [...(E4.dataTransfer?.types ?? [])].includes('Files') &&
        (E4.preventDefault(), rI.classList.add('is-dropping'));
    }),
      rI.addEventListener('dragleave', (E4) => {
        rI.contains(E4.relatedTarget) || rI.classList.remove('is-dropping');
      }),
      rI.addEventListener('drop', (E4) => {
        let E5 = [...(E4.dataTransfer?.files ?? [])];
        if (!E5.length) return;
        (E4.preventDefault(), rI.classList.remove('is-dropping'));
        let E6 = E5.find((E7) => /\.(glb|fbx|afcharacter)$/i.test(E7.name));
        if (E6 && /\.afcharacter$/i.test(E6.name)) {
          rM(E6);
          return;
        }
        if (!E6) {
          ro(
            'Drop a .glb or .fbx here \u2014 a character to wear, a prop to hold, or an animation to import.',
          );
          return;
        }
        if (/\.fbx$/i.test(E6.name)) {
          E2(E6);
          return;
        }
        E3(E6);
      }));
    async function E3(E4) {
      let E5 = null;
      try {
        E5 = k6(await E4.arrayBuffer());
      } catch {}
      if (E5?.animations && !E5.meshes) {
        E1(E4);
        return;
      }
      rg(E4, [
        ...(E5?.animations
          ? [['Import animation', 'Its animation, onto our skeleton \u2014 joins the library', E1]]
          : []),
        ['Wear it', 'A character \u2014 rigged or not: checked, then worn, mapped or rigged', rM],
        ['Hold it', 'A prop, held in a hand', E0],
      ]);
    }
  }
  let mj = () => {
      let E4 = DR?.getComposite?.();
      return E4
        ? Math.max(2, Math.round(E4.duration * (Dm[DR.sourceIds()[0]]?.fps || 30)) + 1)
        : D9
          ? (Dm[D9]?.frames ?? null)
          : null;
    },
    mz = 'cgstuff.library.advanced',
    mO = !1;
  try {
    mO = localStorage.getItem(mz) === '1';
  } catch {}
  let mJ = 'cgstuff.library.poseAutoKey',
    mZ = !0;
  try {
    let E4 = localStorage.getItem(mJ);
    E4 != null && (mZ = E4 === '1');
  } catch {}
  let mU = () => mO && mZ;
  function mK() {
    (D5.setPoseAutoKey(mO ? mZ : !0), D5.setIkAutoKey(mU()));
    let E5 = pe.autoKey;
    E5 &&
      ((E5.disabled = !mO),
      E5.classList.toggle('is-on', mU()),
      E5.setAttribute('aria-pressed', String(mU())),
      (E5.title = mO
        ? mZ
          ? 'Auto-key is on: what you move \u2014 a pose, an IK control, an Adjust slider \u2014 is keyed on this frame'
          : 'Auto-key is off: a pose waits for K; an IK control or a slider is moved for the whole animation until it is keyed (\u25C6 or K)'
        : 'Auto-key \u2014 in Advanced mode (the switch in the Strips bar)'));
  }
  (pe.autoKey?.addEventListener('click', () => {
    mZ = !mZ;
    try {
      localStorage.setItem(mJ, mZ ? '1' : '0');
    } catch {}
    mK();
  }),
    mK());
  let mT = () => {
    let E5 = D5.getState(),
      E6 = mj();
    return !(E5.duration > 0) || !E6
      ? null
      : { u: Math.min(1, Math.max(0, (E5.time || 0) / E5.duration)), frames: E6 };
  };
  D5.setIkClock(mT);
  let mA = cu({
      mount: document.getElementById('lib-picker-panel'),
      player: D5,
      three: () => import('./dependencies/three.js'),
      rigUrl:
        $o +
        '/' +
        (Object.values(D3.rigs ?? {}).find((E5) => E5.default)?.file ??
          Object.values(D3.rigs ?? {})[0]?.file ??
          D3.rig?.file),
      restClip: () => (D4[qo] ? D5.loadClip(qo, D4[qo]) : null),
    }),
    mX = () => (D9 && D4[D9]?.imported ? (Dz?.recordOf(D9) ?? null) : null);
  DO = hu({
    mount: document.getElementById('lib-stage-panel'),
    stage: document.getElementById('lib-stage'),
    player: D5,
    three: () => import('./dependencies/three.js'),
    onChange: () => {
      (SD(), DJ?.());
    },
    work: {
      name: () => mX()?.name ?? null,
      camera: () => mX()?.camera ?? null,
      keep(E5) {
        let E6 = mX();
        E6 && (E5 ? (E6.camera = E5) : delete E6.camera, VY(VW, E6).catch(() => {}));
      },
    },
  });
  let mL = tu({
    mount: document.getElementById('lib-pose-panel'),
    player: D5,
    clock: mT,
    onChange: () => {
      (SD(), DX?.render());
    },
    onPending: () => DX?.render(),
  });
  {
    let E5 = '';
    D5.onState?.((E6) => {
      let E7 = (E6.pose?.dataBones || []).join(',');
      E7 !== E5 && ((E5 = E7), DX?.view?.() === 'graph' && DX.render());
    });
  }
  let mb = kd({
      mount: pe.ikPanel,
      player: D5,
      clock: mT,
      advanced: () => mO,
      onChange: () => {
        (SD(), DX?.render());
      },
    }),
    mx = '';
  (D5.onState((E6) => {
    let E7 = [
      E6.ik?.selected,
      E6.ik?.gizmoMode,
      E6.ik?.dragging,
      (E6.ik?.enabled ?? []).join(),
    ].join('|');
    E7 !== mx && ((mx = E7), mb?.render(), SD(), DX?.render());
  }),
    (Dz = k9({
      bar: pe.barLinks,
      panel: pe.importPanel,
      onOpen: () => Dj?.show('import'),
      customRig: (E6) => DQ?.rigForAnimation?.(E6) ?? null,
      player: D5,
      assetRoot: $o,
      THREE: await import('./dependencies/three.js'),
      selection: {
        isSelected: (E6) => D8.isSelected(E6),
        isVisible: (E6) => D8.isVisible(E6),
        setSelected: (E6, E7) => D8.setSelected(E6, E7),
      },
      onAdd: (E6, E7, E8 = !1) => {
        ((D4[E6] = {
          label: E7.name,
          duration: E7.duration,
          rootMotion: !!E7.info?.travel?.moved,
          tags: ['imported'],
          imported: !0,
          icon: E7.thumb || void 0,
          file: null,
        }),
          Dy(D8.render({ ...D3, clips: D4 })),
          Dq(),
          E8 && Dv(E6, D4[E6]));
      },
      onRemove: (E6) => {
        (delete D4[E6], Dy(D8.render({ ...D3, clips: D4 })), Dq());
      },
    })));
  let my = 'a_tpose';
  !0 &&
    md({
      bar: pe.barLinks,
      before: pe.barLinks?.querySelector('.af-import') ?? null,
      fps: () => D4[my]?.fps || 30,
      canScreen: () => !!(D5.getClips()?.shown && D5.getRigRoot()),
      onCreate: async ({ name: E6, frames: E7, from: E8 }) => {
        let E9 = my;
        if (E8 === 'screen') {
          let Ew = await import('./dependencies/three.js'),
            EV = D5.getClips()?.shown,
            ED = D5.getRigRoot();
          if (!EV || !ED) throw new Error('nothing is on screen to start from');
          let Em = hd({
            rigRoot: ED,
            like: EV,
            THREE: Ew,
            name: E6 + ' \u2014 start',
            rootName: D3.rig?.joints?.[0] || 'root',
          });
          if (!Em.tracks.length) throw new Error('the pose on screen could not be read');
          let ES = await k5(Gr(Em), Em.name, 'pose'),
            EE = null;
          try {
            let { clone: EF } = await import('./dependencies/skeleton-utils.js'),
              EC = EF(ED);
            (EC.traverse((Et) => {
              Et.isSkinnedMesh && Et.skeleton.pose();
            }),
              EC.updateMatrixWorld(!0),
              (EE = kR({ rig: EC, clip: Em, clone: EF, THREE: Ew })));
          } catch {}
          if (
            !(await Dz?.adoptRecord(
              k7(ES, Em.name, Em, { source: 'pose', mode: 'hips', from: 'A held pose' }, EE),
            ))
          )
            throw new Error('the pose could not be kept');
          E9 = ES;
        } else {
          if (!D4[my]) throw new Error('the rest pose is not in this library');
        }
        await mW({ state: 'c=' + E9 + '@0-H~@0-' + (E7 - 1), clip: null });
        let Ek = await DT?.saveNew(E6);
        (pe.seq.hidden && Sq(!0),
          Dj?.show('pose'),
          D5.setPaused(!0),
          D5.seek(0),
          ro(
            (Ek ? '\u201C' + Ek + '\u201D' : 'A new animation') +
              ': ' +
              E7 +
              ' frames. Click a joint and turn it, move along the timeline, and pose again \u2014 each pose is keyed where the playhead is.',
          ));
      },
    });
  async function mW({ state: E6, clip: E7 }) {
    (DZ.begin(),
      E7 && D4[E7] && E7 !== D9 && !/(^|&)c=/.test(E6 || '') && (await Dv(E7, D4[E7])),
      await SS(E6 || ''),
      history.replaceState(null, '', E6 ? '#' + E6 : location.pathname + location.search));
  }
  (kk(), kV());
  {
    let E6 = document.createElement('div'),
      E7 = document.createElement('div');
    (pe.presetsPanel.after(E6), E6.after(E7), kw(E6), kD(E7));
  }
  ((DT = cd({
    mount: pe.presetsPanel,
    scene: () => ({ state: mY(), clip: D9 }),
    open: mW,
    fresh: () => mW({ state: '', clip: D9 }),
    recent: () => DZ.list().filter((E8) => E8.id !== DZ.current() && E8.state),
    openRecent: async (E8) => {
      (DZ.begin(E8),
        E8.clip &&
          D4[E8.clip] &&
          E8.clip !== D9 &&
          !/(^|&)c=/.test(E8.state || '') &&
          (await Dv(E8.clip, D4[E8.clip])),
        await SS(E8.state || ''),
        history.replaceState(
          null,
          '',
          E8.state ? '#' + E8.state : location.pathname + location.search,
        ));
    },
    onShare: (E8, E9) => Sw(E9, E8),
    clipsFor: (E8, E9) =>
      rd(E8, E9)
        .map((Ek) => Dz?.recordOf(Ek))
        .filter(Boolean),
    adoptClips: async (E8) => {
      for (let E9 of E8) await Dz?.adoptRecord(E9);
    },
    characterFor: (E8) => DQ?.recordFor(E8) ?? null,
    adoptCharacters: (E8) => DQ?.adopt(E8) ?? 0,
    onCurrent: () => S1(),
    describe: (E8) => {
      let E9 = [],
        Ek = E8.match(/c=([^&]*)/);
      (Ek && E9.push(Ek[1].split('~').length + ' layers'),
        /[?&#]?a=/.test(E8) && E9.push('adjusted'),
        /(^|&)i=/.test(E8) && E9.push('posed'),
        /:k|\/k/.test(E8) && E9.push('keyed'),
        /(^|&)m=1/.test(E8) && E9.push('mirrored'),
        /(^|&)b=[12]/.test(E8) && E9.push('reversed'),
        /(^|&)v=/.test(E8) && E9.push('in place'));
      let Ew = E8.match(/p=([^&]*)/);
      return (
        Ew && E9.push(Ew[1].split(',').length === 2 ? 'both hands' : 'prop'),
        E9.join(' \u00B7 ')
      );
    },
  })),
    (Dj = Gc({
      rail: pe.rail,
      panel: pe.toolPanel,
      onChange: (E8) => {
        (pe.toolPanel.classList.toggle('has-picker', E8.includes('picker')),
          E8.includes('picker') && mA.show(),
          E8.includes('stage') && DO.show(),
          !E8.includes('rig') &&
            D5.getState().restPreview &&
            (D5.setRestPreview(null), DQ?.render()),
          E8.includes('rig') || DQ?.closeRig?.(),
          DA && (D5.setPoseMode(E8.includes('pose') || E8.includes('picker')), DX?.render()));
      },
    })));
  let mq = Hc({
    mount: pe.adjust,
    player: D5,
    travels: () =>
      DR?.getComposite?.()
        ? DR.sourceIds().some((E8) => D4[E8]?.rootMotion)
        : !!(D9 && D4[D9]?.rootMotion),
    seam: () => {
      let E8 = D5.getClips?.();
      return !E8?.raw || !E8?.shown ? null : { before: Os(E8.raw).seam, after: Os(E8.shown).seam };
    },
    frames: mj,
    clock: mT,
    advanced: () => mO,
    autoKey: mU,
    onChange: () => {
      (SD(), DX?.render());
    },
  });
  D5.onTick(() => {
    (mq.tick(), mL?.tick(), xa?.tick());
  });
  function mP(E8) {
    return E8.startsWith('user.')
      ? (D4[E8]?.label || E8.slice(5).replace(/_[0-9a-f]{8,}$/, ''))
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '_')
          .replace(/^_+|_+$/g, '') || E8.slice(5)
      : E8;
  }
  function mY() {
    let E8 = [],
      E9 = DR?.getComposite?.() ? DR.shareUrl() : null;
    E9 && E8.push('c=' + E9.split('#c=')[1]);
    let Ek = DQ?.ref();
    Ek && E8.push('r=' + Ek);
    let Ew = V0(mq.get());
    Ew && E8.push('a=' + Ew);
    let EV = kB(D5.getState().props);
    EV && E8.push('p=' + EV);
    let ED = kt(D5.getState().ik, DS());
    ED && E8.push('i=' + ED);
    let Em = wb(mL?.get() ?? []);
    Em && E8.push('k=' + Em);
    let ES = W(pi);
    ES && E8.push('o=' + ES);
    let EE = D5.getState();
    return (
      EE.mirrored && E8.push('m=1'),
      EE.reversed && E8.push(EE.reverseOrigin ? 'b=2' : 'b=1'),
      EE.inPlace && E8.push('v=' + w2(EE.lock)),
      DO?.get() && E8.push('cam=' + zi(DO.get())),
      E8.join('&')
    );
  }
  function mv() {
    let E8 = [];
    (DR?.getComposite?.() && E8.push('compose'), V0(mq.get()) && E8.push('adjust'));
    let E9 = D5.getState(),
      Ek = Object.values(E9.props ?? {}).some(Boolean),
      Ew = (E9.ik?.props ?? []).some((EV) => EV.on);
    return (
      (Ek || Ew) && E8.push('props'),
      kt(E9.ik, DS()) && E8.push('ik'),
      VO(mL?.get() ?? []).length && E8.push('pose'),
      E8
    );
  }
  let mB = Ud({ limit: 100 }),
    mG = !0,
    mg = null,
    mI = 350;
  function mN() {
    ((pe.undo.disabled = !mB.canUndo()), (pe.redo.disabled = !mB.canRedo()));
  }
  function mM() {
    (clearTimeout(mg), (mg = null), !(mG || (DD && !Dw)) && mB.record(mY()) && (mN(), S1()));
  }
  let S0 = () => ({
    state: mY(),
    clip: D9,
    project: DT?.current() ?? null,
    aside: Dw && DD ? { state: DD.state, clip: DD.clip } : null,
  });
  function S1() {
    !DU || (DD && !Dw) || (clearTimeout(DK), (DK = setTimeout(() => DZ.save(S0()), 400)));
  }
  window.addEventListener('pagehide', () => {
    !DU || DK == null || (clearTimeout(DK), DZ.save(S0()));
  });
  function S2() {
    mG || DL || (DD && !Dw) || (clearTimeout(mg), (mg = setTimeout(mM, mI)));
  }
  async function S3() {
    if (mG) return;
    mM();
    let E8 = mB.undo();
    E8 != null && (await SS(E8, { asStep: !1 }));
  }
  async function S4() {
    if (mG) return;
    mM();
    let E8 = mB.redo();
    E8 != null && (await SS(E8, { asStep: !1 }));
  }
  (pe.undo.addEventListener('click', S3), pe.redo.addEventListener('click', S4));
  let S5 = null,
    S6 = null,
    S7 = () => {
      (S5?.remove(), (S5 = null), (S6 = null));
    };
  function S8(E8, { url: E9 = null, copied: Ek = !1, notes: Ew = [], error: EV = null }) {
    S7();
    let ED = document.createElement('div');
    ((ED.className = 'lib-sharepop' + (EV ? ' is-error' : '')),
      ED.setAttribute('role', 'dialog'),
      ED.setAttribute('aria-label', 'Share link'));
    let Em = (EF) => {
      let EC = document.createElement('p');
      return ((EC.textContent = EF), ED.appendChild(EC), EC);
    };
    if (E9) {
      let EF = document.createElement('input');
      ((EF.type = 'text'),
        (EF.readOnly = !0),
        (EF.value = E9),
        (EF.className = 'lib-sharepop__url'),
        EF.addEventListener('focus', () => EF.select()),
        ED.appendChild(EF),
        Em(
          Ek
            ? 'Copied. Whoever opens it sees exactly this.'
            : 'Copy it from the box \u2014 the clipboard is blocked here.',
        ));
    }
    EV && Em(EV);
    for (let EC of Ew) Em(EC).className = 'lib-sharepop__note';
    document.body.appendChild(ED);
    let ES = ED.offsetWidth,
      EE = ED.offsetHeight;
    ((ED.style.left =
      Math.max(8, Math.min(window.innerWidth - ES - 8, E8.left + E8.width / 2 - ES / 2)) + 'px'),
      (ED.style.top =
        (E8.top - EE - 8 >= 8
          ? E8.top - EE - 8
          : Math.min(window.innerHeight - EE - 8, E8.bottom + 8)) + 'px'),
      ED.querySelector('input')?.select(),
      (S5 = ED));
  }
  (window.addEventListener(
    'pointerdown',
    (E8) => {
      S5 && !S5.contains(E8.target) && !S6?.contains(E8.target) && S7();
    },
    !0,
  ),
    window.addEventListener('keydown', (E8) => {
      E8.key === 'Escape' && S7();
    }));
  let S9 = null,
    Sk = (E8 = mY(), E9 = mv().length > 0) => {
      let Ek = E9 && E8 !== S9;
      (pe.share.classList.toggle('is-due', Ek),
        (pe.share.title = Ek
          ? 'Copy a short link to exactly this \u2014 these changes are not in one yet'
          : 'Copy a short link to exactly this'));
    };
  async function Sw(E8, E9 = null) {
    if (S5 && S6 === E8) {
      S7();
      return;
    }
    if ((S7(), E8.disabled)) return;
    let Ek = E8.getBoundingClientRect(),
      Ew = E8.innerHTML,
      EV = E9 ?? mY();
    ((E8.disabled = !0),
      (E8.textContent = E8.textContent.trim().length > 2 ? 'Sharing\u2026' : '\u2026'));
    try {
      let ED = EV.split('&').some((EF) => EF.startsWith('c=')) || E9 != null ? null : D9,
        Em = await Vd({ state: EV, clip: ED }, { origin: location.origin }),
        ES = !0;
      try {
        await navigator.clipboard.writeText(Em);
      } catch {
        ES = !1;
      }
      let EE = [];
      ((ED?.startsWith('user.') || /(?:^|[=~,])user\./.test(EV)) &&
        EE.push(
          'Imported clips are not in the link \u2014 whoever opens it needs the same files imported.',
        ),
        S8(Ek, { url: Em, copied: ES, notes: EE }),
        as.note('shared'),
        EV === mY() && ((S9 = EV), Sk()));
    } catch (EF) {
      S8(Ek, { error: EF.message || 'Could not make a link.' });
    } finally {
      ((E8.disabled = !1), (E8.innerHTML = Ew));
    }
    S6 = S5 ? E8 : null;
  }
  pe.share.addEventListener('click', () => Sw(pe.share));
  function SV() {
    try {
      let E8 = [];
      for (let Ew of mL.get()) {
        for (let EV of Ew.keys || []) E8.push({ u: EV.u, bones: Object.keys(EV.bones || {}) });
        for (let [ED, Em] of Object.entries(Ew.curves || {}))
          for (let ES of Em || []) E8.push({ u: ES.u, bones: [ED] });
      }
      for (let [EE, EF] of Object.entries(D5.getState().ik?.keys || {}))
        for (let EC of EF || []) E8.push({ u: EC.u, ik: EE });
      let E9 = mq.get();
      for (let Et of wq) for (let EH of wv(E9, Et) || []) E8.push({ u: EH.u });
      for (let ER of pi) E8.push({ u: ER, mark: !0 });
      let Ek = (DR?.getComposite?.() ? Dm[DR.sourceIds()[0]]?.fps : Dm[D9]?.fps) || 30;
      D5.setOnionKeys?.(
        E8.sort((EQ, Ej) => EQ.u - Ej.u),
        Ek,
      );
    } catch {}
  }
  function SD() {
    if (DD && !Dw) return;
    (S2(), SV(), DT?.refresh());
    let E8 = mv();
    Dj?.markEdited?.(E8);
    try {
      let E9 = mY();
      (Sk(E9, E8.length > 0), Sm(E9));
    } catch {}
  }
  function Sm(E8 = mY()) {
    let E9 = D9 && !E8.split('&').some((Ew) => Ew.startsWith('c=')) ? 'clip=' + D9 : '',
      Ek = [E8, E9].filter(Boolean).join('&');
    try {
      history.replaceState(null, '', Ek ? '#' + Ek : location.pathname + location.search);
    } catch {}
  }
  async function SS(E8, E9 = {}) {
    Dw && !mD(E8) && (await mH({ restore: !1 }));
    let { asStep: Ek = !0 } = E9;
    ((mG = !0), clearTimeout(mg));
    try {
      return await SE(E8, E9);
    } finally {
      (await new Promise((Ew) => setTimeout(Ew, 150)),
        (mG = !1),
        SV(),
        Ek ? mB.record(mY()) : mB.reset(mY()),
        mN(),
        S1());
    }
  }
  async function SE(
    E8,
    { allowClipFallback: E9 = !1, body: Ek = !0, clip: Ew = null, aside: EV = null } = {},
  ) {
    let ED = String(E8 || '')
        .split('&')
        .filter(Boolean),
      Em = (EQ) => ED.find((Ej) => Ej.startsWith(EQ + '='))?.slice(EQ.length + 1),
      ES = Ek ? mD(E8) : null,
      EE = !1;
    if (ES) {
      if (
        (await Promise.race([mV, new Promise((EQ) => setTimeout(EQ, 3000))]),
        !Dk.some((EQ) => EQ.id === ES) ||
          !(await mF(ES, { clip: Ew ?? (E9 ? Em('clip') : null) ?? null, aside: EV })))
      )
        return !1;
      EE = !0;
    }
    if (Ek && !EE)
      try {
        await DQ?.apply(Em('r') ?? '');
      } catch (EQ) {
        ro('Couldn\u2019t put that character on: ' + EQ.message);
      }
    mq.set(V2(Em('a') ?? ''));
    let EF = kG(Em('p') ?? '');
    for (let Ej of ['l', 'r']) {
      let Ez = EF[Ej];
      await D5.setProp(Ez && mR[Ez] ? Ez : null, Ez ? mR[Ez] : null, Ej);
    }
    (mQ?.refresh(),
      D5.setIkOptions(kH(Em('i') ?? '', DS())),
      mb?.render(),
      mL?.set(wy(Em('k') ?? '')),
      (pi = q(Em('o') ?? '')),
      xa?.refresh(),
      pe.mirror.classList.toggle('is-on', D5.setMirrored(Em('m') === '1')));
    {
      let EO = Em('b');
      ((EO === '1' || EO === '2') && D5.setReverseOrigin(EO === '2'),
        D5.setReversed(EO === '1' || EO === '2'),
        m1());
    }
    (DO?.set(pu(Em('cam'))), DJ?.());
    let EC = Em('v');
    (EC != null && D5.setLock(w3(EC)), D5.setInPlace(EC != null), m0(), DM());
    let EH = Em('c');
    if (EH) {
      let EJ = Kc(EH, DE());
      if (
        (EJ[0] && Dm[EJ[0].id] && EJ[0].id !== D9 && Dv(EJ[0].id, Dm[EJ[0].id]),
        (await DR.restore(EJ, zc(EH), qc(EH))) || (EJ[0] && Dm[EJ[0].id]))
      )
        return !0;
    } else DR?.clear?.();
    if (EE) return !0;
    let ER = Em('clip');
    return E9 && ER && D4[ER]
      ? (ER !== D9 && Dv(ER, D4[ER]), !0)
      : E9 && D4[E8]
        ? (Dv(E8, D4[E8]), !0)
        : !1;
  }
  DR = Uc({
    mount: pe.composer,
    player: D5,
    clips: Dm,
    body: DE,
    getSelected: () => DF().filter((E8) => Dm[E8]),
    onShare: (E8) => Sw(E8),
    rootName: () => (Dw ? null : D3.rig?.joints?.[0] || 'root'),
    onChange: (E8) => {
      (SC(),
        Db(D8.getSelected()),
        SD(),
        DX?.render(),
        !E8 && D5.getState().id === '__composite__' && D9 && Dm[D9] && D5.play(D9, Dm[D9]));
    },
  });
  let SF = null;
  function SC() {
    let E8 = DR?.getStack?.(),
      E9 = E8?.length > 0 ? { offset: E8.offset || 0, length: E8.length } : null,
      Ek = SF;
    if (
      ((SF = E9),
      !Ek ||
        !E9 ||
        mG ||
        (DD && !Dw) ||
        (Math.abs(Ek.offset - E9.offset) < 1e-9 && Math.abs(Ek.length - E9.length) < 1e-9))
    )
      return;
    let Ew = mq.get();
    if (Object.keys(Ew.ranges || {}).length || Object.keys(Ew.keys || {}).length) {
      let ED = {},
        Em = {};
      for (let [ES, EE] of Object.entries(Ew.ranges || {})) ED[ES] = V4(EE, Ek, E9);
      for (let [EF, EC] of Object.entries(Ew.keys || {})) Em[EF] = w8(EC, Ek, E9);
      mq.set({ ...Ew, ranges: ED, keys: Em });
    }
    mL?.rescale(Ek, E9);
    let EV = D5.getState().ik;
    if (Object.keys(EV?.ranges || {}).length || Object.keys(EV?.keys || {}).length) {
      let Et = {},
        EH = {};
      for (let [ER, EQ] of Object.entries(EV.ranges || {})) Et[ER] = V4(EQ, Ek, E9);
      for (let [Ej, Ez] of Object.entries(EV.keys || {})) EH[Ej] = w8(Ez, Ek, E9);
      (D5.setIkOptions({ ranges: Et, keys: EH }), mb?.render());
    }
  }
  let SH = (E8) =>
    E8 && E8.length
      ? DE().keys.every((E9) => E8.includes(E9))
        ? 'Full body'
        : E8.map((E9) => DE().labels[E9] ?? E9[0].toUpperCase() + E9.slice(1)).join(' \u00B7 ')
      : 'Layer';
  function SR(E8, E9, Ek, Ew, EV, ED, Em, ES) {
    let EE = VZ(Ek),
      EF = (EJ) => EV + EJ * ED,
      EC = E9.neutral,
      EH = E9.neutral;
    for (let EJ of Ek) ((EC = Math.min(EC, EJ.v)), (EH = Math.max(EH, EJ.v)));
    let ER = EH - EC,
      EQ = (EZ) => (ER > 1e-9 ? (EZ - EC) / ER : 0.5),
      Ej = [];
    for (let EZ = 0; EZ <= 160; EZ++) Ej.push([EF(EZ / 160), EQ(EE(EZ / 160))]);
    let Ez = EE(ED > 0 ? Math.min(1, Math.max(0, (ES.time || 0) / ED)) : 0),
      EO = (EU) => +Number(EU).toFixed(1);
    return {
      name: E9.label,
      sub: wB(Ew, E8) ? 'muted' : 'keys',
      kind: 'adjust',
      head: {
        kind: 'adjust',
        key: E8,
        keyed: !0,
        mute: !!Ew.muted?.[E8],
        solo: !!Ew.solo?.[E8],
        muted: wB(Ew, E8),
        value: Ez,
        min: E9.min,
        max: E9.max,
        step: E9.step ?? 1,
        unit: E9.unit,
      },
      spark: { points: Ej, zero: EQ(E9.neutral) },
      strips: Ek.map((EU) => {
        let EK = Math.round(EU.u * (Em - 1)),
          ET = EF(EU.u);
        return {
          label: '',
          start: ET,
          end: ET,
          kind: 'key',
          edit: {
            kind: 'key',
            key: E8,
            uid: EK,
            u: EU.u,
            v: EU.v,
            i: EU.i,
            h: Vz(EU),
            off: EV,
            noFade: !0,
            control: E9.label,
            unit: E9.unit,
            min: E9.min,
            max: E9.max,
            step: E9.step ?? 1,
          },
          title:
            E9.label +
            ' ' +
            EO(EU.v) +
            E9.unit +
            ' \u00B7 frame ' +
            (EK + 1) +
            (EU.i && EU.i !== V9 ? ' \u00B7 ' + VQ(EU.i).toLowerCase() : '') +
            ' \u2014 drag to move, right-click for more',
        };
      }),
    };
  }
  function SQ(E8, E9, Ek, Ew, EV) {
    let ED = VJ(E8),
      Em = _a ? Vj(E8) : [],
      ES = (Ez) => Ek + Ez * Ew,
      EE = (Ez) => {
        let EO = 0;
        for (let EJ of ED.values()) EO += V8(EJ(Ez), [0, 0, 0, 1]);
        return EO;
      },
      EF = [],
      EC = 0;
    for (let Ez = 0; Ez <= 160; Ez++) {
      let EO = EE(Ez / 160);
      (EF.push(EO), (EC = Math.max(EC, EO)));
    }
    let EH = EF.map((EJ, EZ) => [ES(EZ / 160), EC > 1e-9 ? EJ / EC : 0]),
      ER = new Set(VH(E8)),
      EQ = E8.id === mL.selected() ? mL.pending() : null,
      Ej = EQ
        ? [
            {
              label: '',
              start: ES(EQ.u),
              end: ES(EQ.u),
              kind: 'pending',
              title:
                'Not keyed yet \u2014 ' +
                EQ.bones.length +
                ' bones on frame ' +
                (Math.round(EQ.u * (EV - 1)) + 1) +
                '; K keys it',
            },
          ]
        : [];
    return {
      name: E8.name,
      sub: E9 ? 'muted' : 'pose \u00B7 ' + ER.size + ' bones',
      kind: 'pose',
      head: {
        kind: 'pose',
        key: E8.id,
        mute: E8.mute,
        solo: E8.solo,
        muted: E9,
        weight: E8.weight,
      },
      spark: { points: EH, zero: 0 },
      strips: Em.map((EJ) => {
        let EZ = Math.round(EJ.u * (EV - 1)),
          EU = ES(EJ.u),
          EK = mL.keyedAt(E8.id, EJ.u),
          ET = Object.keys(EK).length;
        return {
          label: '',
          start: EU,
          end: EU,
          kind: 'key',
          edit: {
            kind: 'key',
            group: 'pose',
            key: E8.id,
            uid: EZ,
            u: EJ.u,
            v: EK,
            i: EJ.i,
            off: Ek,
            noFade: !0,
            vector: !0,
            control: E8.name,
          },
          title:
            E8.name +
            ' \u00B7 ' +
            ET +
            ' ' +
            (ET === 1 ? 'bone' : 'bones') +
            ' keyed \u00B7 frame ' +
            (EZ + 1) +
            (EJ.i && EJ.i !== V9 ? ' \u00B7 ' + VQ(EJ.i).toLowerCase() : '') +
            ' \u2014 drag to move, right-click for more',
        };
      }).concat(Ej),
    };
  }
  let Sj = (E8) =>
    Object.entries(E8.offsets || {})
      .filter(
        ([E9, Ek]) => E8.keys?.[E9]?.length || (Ek && Ek.some((Ew) => Math.abs(Ew) > 0.000001)),
      )
      .map(([E9]) => E9);
  function Sz(E8, E9, Ek, Ew, EV, ED) {
    let Em = Ek.keys[E8],
      ES = VZ(VK(Em, [0, 1, 2])),
      EE = (EJ) => Ew + EJ * EV,
      EF = (EJ) => {
        let EZ = ES(EJ);
        return Math.hypot(EZ[0], EZ[1], EZ[2]);
      },
      EC = 0,
      EH = [];
    for (let EJ = 0; EJ <= 160; EJ++) {
      let EZ = EF(EJ / 160);
      (EH.push(EZ), (EC = Math.max(EC, EZ)));
    }
    let ER = EH.map((EU, EK) => [EE(EK / 160), EC > 1e-9 ? EU / EC : 0]),
      EQ = E8.startsWith('pole.') ? (Ek.labels?.[E9] ?? E9) + ' pole' : (Ek.labels?.[E8] ?? E8),
      Ej = Sj(Ek).some((EU) => Ek.solo?.[EU]),
      Ez = !!Ek.muted?.[E8] || (Ej && !Ek.solo?.[E8]),
      EO = (EU) => +(Math.hypot(EU[0] || 0, EU[1] || 0, EU[2] || 0) * 100).toFixed(1);
    return {
      name: EQ,
      sub: Ez ? 'muted' : 'IK keys',
      kind: 'ik',
      head: {
        kind: 'ik',
        key: E8,
        keyed: !0,
        mute: !!Ek.muted?.[E8],
        solo: !!Ek.solo?.[E8],
        muted: Ez,
        weight: Ek.weights?.[E8] ?? 1,
      },
      spark: { points: ER, zero: 0 },
      strips: (_a ? Em : []).map((EU) => {
        let EK = Math.round(EU.u * (ED - 1)),
          ET = EE(EU.u);
        return {
          label: '',
          start: ET,
          end: ET,
          kind: 'key',
          edit: {
            kind: 'key',
            group: 'ik',
            key: E8,
            uid: EK,
            u: EU.u,
            v: EU.v,
            i: EU.i,
            h: Vz(EU),
            off: Ew,
            noFade: !0,
            vector: !0,
            control: EQ,
          },
          title:
            EQ +
            ' ' +
            EO(EU.v) +
            ' cm from the animation \u00B7 frame ' +
            (EK + 1) +
            (EU.i && EU.i !== V9 ? ' \u00B7 ' + VQ(EU.i).toLowerCase() : '') +
            ' \u2014 drag to move, right-click for more',
        };
      }),
    };
  }
  let SO = (E8, E9) =>
    E8 === 'ik'
      ? D5.getState().ik?.keys?.[E9] || []
      : E8 === 'pose'
        ? mL.keysOf(E9).map((Ek) => ({ u: Ek.u, i: Ek.i, v: Ek.bones }))
        : wv(mq.get(), E9) || [];
  function SJ(E8, E9, Ek) {
    if (E8 !== 'ik') {
      mq.setCurve(E9, Ek);
      return;
    }
    (Ek?.length
      ? D5.setIkOptions({ keys: { ...(D5.getState().ik?.keys || {}), [E9]: Ek } })
      : D5.setIkOptions({ offsets: { [E9]: null } }),
      mb?.render(),
      SD(),
      DX?.render());
  }
  function SZ(E8, E9, Ek = 'adjust') {
    let Ew = mj();
    if (Ew) {
      if (Ek === 'pose') {
        mL.moveKeys(E8, E9);
        return;
      }
      SJ(Ek, E8, wm(SO(Ek, E8), E9, Ew));
    }
  }
  let SU = ['#b07cff', '#ffd166', '#ff8fd0', '#3ddbd9', '#ff9f43', '#c6e84d', '#d2b48c', '#e6a0ff'],
    SK = [
      ['X', '#ff5252'],
      ['Y', '#5fd35f'],
      ['Z', '#4d94ff'],
    ],
    ST = [['W', '#e8e3c8'], ...SK],
    SA = [
      ['Turn X', '#ff9a9a'],
      ['Turn Y', '#a6e8a6'],
      ['Turn Z', '#9cc2ff'],
    ],
    SX = null,
    SL = null;
  function Sb() {
    let E8 = D5.getState(),
      E9 = E8.duration || 0,
      Ek = DR?.getStack?.(),
      Ew = Ek ? E8.id === '__composite__' : !0,
      EV = (Ek ? Dm[Ek.layers[0]?.id]?.fps : vs) || 30,
      ED = [],
      Em = 0,
      ES = E9 > 0 ? E9 : 3,
      EE = 1;
    if (Ek) {
      EE = Ew && Ek.length > 0 ? E9 / Ek.length : 1;
      let ER = Ek.offset + Ek.length,
        EQ = 0.0001,
        Ej = new Map(),
        Ez = Ek.layers[0]?.track,
        EO = Ek.layers.filter((EU) => EU.track === Ez).length,
        EJ = Hs(
          Ek.layers.map((EU) => ({
            track: EU.track,
            start: EU.start,
            end: EU.end ?? ER,
            fadeIn: EU.fadeIn,
            fadeOut: EU.fadeOut,
          })),
        );
      Ek.layers.forEach((EU, EK) => {
        let ET = EU.speed > 0 ? EU.speed : 1,
          EA = (EU.duration / ET) * EE,
          En = EU.start * EE,
          EX = (EU.end == null ? ER : EU.end) * EE,
          EL = (EU.clipIn / ET) * EE,
          Eb = EK === 0 ? 0 : EJ[EK].fadeIn * EE,
          Ex = EK === 0 ? 0 : EJ[EK].fadeOut * EE,
          Ey = Math.min(EX, En + Math.max(0, EA - EL)),
          EW = { reason: 'Nothing before it on this track to step with' };
        {
          let Ev = EJ[EK].from;
          if (
            (Ev < 0 &&
              Ek.layers.forEach((EB, EG) => {
                if (EG === EK || EB.track !== EU.track || !(EB.start < EU.start - EQ)) return;
                let Eg = EB.end ?? ER;
                (Ev < 0 || Eg > (Ek.layers[Ev].end ?? ER)) && (Ev = EG);
              }),
            Ev >= 0)
          ) {
            let EB = Ek.layers[Ev],
              EG = (EN) => ({
                name: EN.label,
                feet: EN.feet,
                frames: EN.frames,
                loops: EN.loops,
                clipIn: EN.clipIn,
                start: EN.start,
                speed: EN.speed,
                mirror: EN.mirror,
                reverse: EN.reverse,
              }),
              Eg = EU.start + (EJ[EK].xIn > 0 ? EJ[EK].xIn / 2 : 0),
              EI = Pc({ out: EG(EB), into: EG(EU), at: Eg, fps: Ek.fps });
            EW =
              EI.clipIn != null
                ? {
                    from: EB.label,
                    foot: EI.foot,
                    clipIn: (EI.clipIn / ET) * EE,
                    inStep: Math.abs(EI.clipIn - EU.clipIn) * Ek.fps < 0.5,
                  }
                : { from: EB.label, reason: EI.reason };
          }
        }
        let Eq = {
            mirror: !!EU.mirror,
            reverse: !!EU.reverse,
            origin: !!EU.origin,
            speed: ET,
            repeat: EU.repeat || 'auto',
            measured: !!EU.measured,
            overruns: EX - En > EA - EL + EQ,
          },
          EP = {
            label:
              EU.label +
              (EU.mirror ? '  \u21CB' : '') +
              (EU.reverse ? '  \u25C2' : '') +
              (ET !== 1 ? '  ' + +ET.toFixed(2) + '\u00D7' : ''),
            start: En,
            end: EX,
            cut: !EU.loops && EU.end == null && EA - EL > EX - En + EQ,
            title:
              EU.label +
              ' \u2014 ' +
              EU.duration.toFixed(2) +
              ' s, ' +
              (EU.loops ? 'cycles' : 'one-shot') +
              (EL > 0 ? ', starts ' + Math.round(EU.clipIn * Ek.fps) + ' f in' : ''),
            edit:
              EK === 0
                ? {
                    kind: 'layer',
                    index: EK,
                    uid: EU.uid,
                    track: EU.track,
                    clipIn: EL,
                    k: EE,
                    speed: ET,
                    noFade: !0,
                    name: EU.label,
                    props: Eq,
                    clipLen: EU.duration,
                    feet: EW,
                    lonely: EU.track === Ez && EO === 1,
                  }
                : {
                    kind: 'layer',
                    index: EK,
                    uid: EU.uid,
                    track: EU.track,
                    clipIn: EL,
                    k: EE,
                    speed: ET,
                    fadeIn: Eb,
                    fadeOut: Ex,
                    name: EU.label,
                    props: Eq,
                    clipLen: EU.duration,
                    feet: EW,
                    xIn: EJ[EK].xIn > 0,
                    xOut: EJ[EK].xOut > 0,
                  },
            xfadeIn: EJ[EK].xIn * EE,
            xfadeFrom: EJ[EK].from,
          };
        if (Ey < EX - EQ && EA > 0) {
          if (EU.loops) {
            EP.repeats = [];
            for (let EN = Ey; EN < EX - EQ; EN += EA)
              EP.repeats.push({ start: EN, end: Math.min(EN + EA, EX) });
          } else EP.hold = { start: Ey, end: EX };
        }
        EP.cut && (EP.title += ' \u2014 cut at ' + Math.round(((EL + EX - En) / EA) * 100) + '%');
        let EY = Ej.get(EU.track);
        if (!EY) {
          let EM = EU.track === Ez;
          ((EY = {
            name: EU.trackName || (EM ? 'Base' : SH(EU.regions)),
            sub: EU.muted ? 'muted' : EM ? 'whole body' : Math.round(EU.weight * 100) + '% weight',
            strips: [],
            drop: { kind: 'track', track: EU.track },
            head: {
              track: EU.track,
              isBase: EM,
              given: EU.trackName,
              mute: EU.mute,
              solo: EU.solo,
              muted: EU.muted,
              weight: EU.weight,
              regions: EU.regionWeights,
            },
          }),
            Ej.set(EU.track, EY));
        }
        EY.strips.push(EP);
      });
      let EZ = Ej.get(Ez);
      if (EZ?.strips.length) {
        let EU = [...EZ.strips].sort((EK, ET) => EK.start - ET.start);
        (EU[0].start > EQ && (EU[0].holdBefore = { start: 0, end: EU[0].start }),
          EU.forEach((EK, ET) => {
            let EA = EU[ET + 1],
              En = EA ? EA.start : ER * EE;
            En > EK.end + EQ && (EK.holdAfter = { start: EK.end, end: En });
          }));
      }
      (ED.push({
        name: '+ New layer',
        sub: 'drop to add',
        kind: 'new',
        strips: [],
        empty: !0,
        hint: 'Drop a clip, or drag a strip up here, for a layer of its own',
        drop: { kind: 'new' },
      }),
        ED.push(...[...Ej.values()].reverse()),
        (Em = Ek.offset * EE),
        (ES = ER * EE));
    } else
      ED.push({
        name: 'Base',
        sub: 'drop a clip to start',
        strips: [],
        empty: !0,
        drop: { kind: 'start' },
      });
    let EF = !Ek || Ew ? mq.get() : {},
      EC = mj() || 2;
    if (!Ek || Ew) {
      let EK = mL.get(),
        ET = new Set(VO(EK).map((EA) => EA.id));
      for (let EA of EK) ED.push(SQ(EA, !ET.has(EA.id), Em, E9, EC));
    }
    for (let En of wq) {
      let EX = wx[En],
        EL = wv(EF, En);
      if (EL) {
        ED.push(SR(En, EX, EL, EF, Em, E9, EC, E8));
        continue;
      }
      let Eb = EF[En] ?? EX.neutral;
      if (Math.abs(Eb - EX.neutral) < 0.000001) continue;
      let Ex = wG(EF, En),
        Ey = Em + Ex.start * E9,
        EW = Em + Ex.end * E9,
        Eq = EW - Ey,
        EP = Ex.start > 0 ? Ex.blendIn * E9 : 0,
        EY = Ex.end < 1 ? Ex.blendOut * E9 : 0,
        Ev = EP + EY;
      (Ev > Eq && Ev > 0 && ((EP *= Eq / Ev), (EY *= Eq / Ev)),
        ED.push({
          name: EX.label,
          sub: wB(EF, En) ? 'muted' : 'adjust',
          kind: 'adjust',
          head: {
            kind: 'adjust',
            key: En,
            mute: !!EF.muted?.[En],
            solo: !!EF.solo?.[En],
            muted: wB(EF, En),
            value: Eb,
            min: EX.min,
            max: EX.max,
            step: EX.step ?? 1,
            unit: EX.unit,
          },
          strips: [
            {
              label:
                '' +
                Math.round(Eb) +
                EX.unit +
                (Ex.start > 0 || Ex.end < 1
                  ? ''
                  : '  \u00B7  whole clip \u2014 drag an edge to limit it'),
              start: Ey,
              end: EW,
              kind: 'adjust',
              rampIn: EP,
              rampOut: EY,
              edit: {
                kind: 'adjust',
                key: En,
                blendIn: Ex.blendIn * E9,
                blendOut: Ex.blendOut * E9,
                off: Em,
              },
              title:
                EX.label +
                ' ' +
                Math.round(Eb) +
                EX.unit +
                (Ex.start > 0 || Ex.end < 1 ? ' \u2014 part of the clip' : ' \u2014 whole clip'),
            },
          ],
        }));
    }
    if (!Ek || Ew) {
      let EB = E8.ik || {};
      for (let [EG, Eg] of Object.entries(EB.offsets || {})) {
        let EI = EG.replace(/^pole\./, '');
        if (!(EB.enabled || []).includes(EI)) continue;
        if (EB.keys?.[EG]?.length) {
          ED.push(Sz(EG, EI, EB, Em, E9, EC));
          continue;
        }
        if (!Eg || Eg.every((Fw) => Math.abs(Fw) < 0.000001)) continue;
        let EN = wN(EB.ranges?.[EG]),
          EM = Em + EN.start * E9,
          F0 = Em + EN.end * E9,
          F1 = F0 - EM,
          F2 = EN.start > 0 ? EN.blendIn * E9 : 0,
          F3 = EN.end < 1 ? EN.blendOut * E9 : 0,
          F4 = F2 + F3;
        F4 > F1 && F4 > 0 && ((F2 *= F1 / F4), (F3 *= F1 / F4));
        let F5 = EG.startsWith('pole.')
            ? (EB.labels?.[EI] ?? EI) + ' pole'
            : (EB.labels?.[EG] ?? EG),
          F6 = Math.round(Math.hypot(Eg[0], Eg[1], Eg[2]) * 1000) / 10,
          F7 = Math.round(Math.hypot(Eg[3] || 0, Eg[4] || 0, Eg[5] || 0)),
          F8 = [F6 ? F6 + ' cm' : '', F7 ? F7 + '\u00B0' : ''].filter(Boolean).join(' \u00B7 '),
          F9 = Sj(EB).some((Fw) => EB.solo?.[Fw]),
          Fk = !!EB.muted?.[EG] || (F9 && !EB.solo?.[EG]);
        ED.push({
          name: F5,
          sub: Fk ? 'muted' : 'IK',
          kind: 'ik',
          head: {
            kind: 'ik',
            key: EG,
            mute: !!EB.muted?.[EG],
            solo: !!EB.solo?.[EG],
            muted: Fk,
            weight: EB.weights?.[EG] ?? 1,
          },
          strips: [
            {
              label: F8 + (wM(EN) ? '  \u00B7  whole clip \u2014 drag an edge to limit it' : ''),
              start: EM,
              end: F0,
              kind: 'ik',
              rampIn: F2,
              rampOut: F3,
              edit: {
                kind: 'ik',
                key: EG,
                blendIn: EN.blendIn * E9,
                blendOut: EN.blendOut * E9,
                off: Em,
              },
              title:
                F5 + ' IK ' + F8 + (wM(EN) ? ' \u2014 whole clip' : ' \u2014 part of the clip'),
            },
          ],
        });
      }
    }
    let EH = Ek ? EE : D9 && Dm[D9]?.duration > 0 ? E9 / Dm[D9].duration : 1;
    return {
      duration: ES,
      fps: EV,
      tracks: ED,
      scale: EH,
      advanced: mO,
      poseKeys: !!D5.getState().pose?.mode,
      keyUid: (Fw) => Math.round(Math.min(1, Math.max(0, (Fw - Em) / (E9 || 1))) * (EC - 1)),
      canAddTrack: !!Ek,
      hasSequence: !!Ek,
      graph: () => {
        let Fw = [],
          FV = [];
        if (!Ek || Ew) {
          wq.forEach((Fj, Fz) => {
            let FO = wv(EF, Fj),
              FJ = wx[Fj];
            FO &&
              Fw.push({
                group: 'adjust',
                key: Fj,
                label: FJ.label,
                muted: wB(EF, Fj),
                curve: FO,
                axes: [
                  {
                    axis: null,
                    label: FJ.label,
                    colour: SU[Fz % SU.length],
                    unit: FJ.unit,
                    scale: 1,
                    min: FJ.min,
                    max: FJ.max,
                    rest: FJ.neutral ?? 0,
                  },
                ],
              });
          });
          let FS = E8.ik || {},
            FE = Sj(FS).some((Fj) => FS.solo?.[Fj]);
          for (let Fj of Object.keys(FS.offsets || {})) {
            let Fz = Fj.replace(/^pole\./, ''),
              FO = FS.keys?.[Fj];
            !FO?.length ||
              !(FS.enabled || []).includes(Fz) ||
              Fw.push({
                group: 'ik',
                key: Fj,
                curve: FO,
                label: Fj.startsWith('pole.')
                  ? (FS.labels?.[Fz] ?? Fz) + ' pole'
                  : (FS.labels?.[Fj] ?? Fj),
                muted: !!FS.muted?.[Fj] || (FE && !FS.solo?.[Fj]),
                ...(Fj.startsWith('pole.') ? {} : { euler: [3, 4, 5] }),
                axes: [
                  ...SK.map(([FJ, FZ], FU) => ({
                    axis: FU,
                    label: FJ,
                    colour: FZ,
                    unit: 'cm',
                    scale: 100,
                    min: -kE,
                    max: kE,
                  })),
                  ...(Fj.startsWith('pole.')
                    ? []
                    : SA.map(([FJ, FZ], FU) => ({
                        axis: 3 + FU,
                        label: FJ,
                        colour: FZ,
                        unit: '\u00B0',
                        scale: 1,
                        min: -3600,
                        max: 3600,
                      }))),
                ],
              });
          }
          let FF = mL.get(),
            FC = new Set(VO(FF).map((FJ) => FJ.id)),
            FH = new Set(E8.pose?.dataBones ?? []),
            FR = mL.selected(),
            FQ = (FJ) =>
              String(FJ)
                .replace(/_(l|r)$/, (FZ, FU) => (FU === 'l' ? ' L' : ' R'))
                .replace(/_/g, ' ')
                .replace(/^\w/, (FZ) => FZ.toUpperCase());
          for (let FJ of FF) {
            let FZ = Vj(FJ);
            FZ.length && FV.push({ id: FJ.id, name: FJ.name, muted: !FC.has(FJ.id), keys: FZ });
            for (let FU of VH(FJ)) {
              let FK = mL.isCurveBone(FJ.id, FU);
              Fw.push({
                group: 'bone',
                key: FJ.id + ':' + FU,
                label: FQ(FU),
                parent: FJ.name,
                quiet: !0,
                selfKey: !0,
                picked: FJ.id === FR && FH.has(FU),
                muted: !FC.has(FJ.id),
                curve: FK ? mL.boneCurve(FJ.id, FU) : mL.boneQuatCurve(FJ.id, FU),
                ...(FK ? { euler: [0, 1, 2] } : {}),
                axes: FK
                  ? SK.map(([FT, FA], FX) => ({
                      axis: FX,
                      label: FT,
                      colour: FA,
                      unit: '\u00B0',
                      scale: 1,
                      min: -3600,
                      max: 3600,
                    }))
                  : ST.map(([FT, FA], FX) => ({
                      axis: FX,
                      label: FT,
                      colour: FA,
                      unit: '',
                      scale: 1,
                      min: -10,
                      max: 10,
                      rest: FX === 0 ? 1 : 0,
                    })),
              });
            }
          }
        }
        let FD = Ek?.layers[0]?.track,
          Fm = Ek
            ? Ek.layers
                .filter((FT) => FT.track === FD)
                .map((FT) => ({ t: FT.start * EE, label: FT.label }))
            : [];
        return {
          frames: EC,
          fps: EV,
          offset: Em,
          clock: E9,
          duration: ES,
          playing: Ew,
          controls: Fw,
          poses: FV,
          marks: Fm,
          partner: D5.posePartner,
        };
      },
      offset: Em,
      clock: E9,
      playId: E8.id,
      playing: Ew,
      previewing: (!Ek || !Ew) && D9 ? Dm[D9]?.label || D9 : null,
      range: Ek?.range ? { start: Ek.range.start * EE, end: Ek.range.end * EE } : null,
    };
  }
  let Sx = 'cgstuff.library.strips',
    Sy = pe.transport.parentNode,
    SW = pe.transport.nextSibling;
  function Sq(E8) {
    (document.body.classList.toggle('is-strips', E8),
      (pe.seq.hidden = !E8),
      E8 ? DX.slot.appendChild(pe.transport) : Sy.insertBefore(pe.transport, SW),
      pe.strips.setAttribute('aria-pressed', String(E8)));
    try {
      localStorage.setItem(Sx, E8 ? '1' : '0');
    } catch {}
    (E8 && DX.render(), window.dispatchEvent(new Event('resize')));
  }
  function SP(E8) {
    if (E8.uid == null) return E8.index;
    let E9 = DR.getStack()?.layers.findIndex((Ek) => Ek.uid === E8.uid) ?? -1;
    return E9 >= 0 ? E9 : E8.index;
  }
  function SY(E8, E9) {
    if (E8.kind === 'layer') {
      let Ek = E8.k || 1,
        Ew = {};
      ('start' in E9 && (Ew.start = E9.start / Ek),
        'end' in E9 && (Ew.end = E9.end == null ? null : E9.end / Ek),
        'clipIn' in E9 && (Ew.clipIn = (E9.clipIn / Ek) * (E8.speed || 1)),
        'fadeIn' in E9 && (Ew.fadeIn = E9.fadeIn / Ek),
        'fadeOut' in E9 && (Ew.fadeOut = E9.fadeOut / Ek),
        DR.setTiming(SP(E8), Ew));
    } else {
      if (E8.kind === 'key') {
        let EV = D5.getState().duration || 0;
        if (!(EV > 0) || !('start' in E9)) return;
        let ED = Math.min(1, Math.max(0, (E9.start - (E8.off || 0)) / EV));
        SZ(E8.key, [{ from: E8.u, to: ED }], E8.group);
      } else {
        if (E8.kind === 'adjust') {
          let Em = D5.getState().duration || 0;
          if (!(Em > 0)) return;
          let ES = wG(mq.get(), E8.key),
            EE = E8.off || 0,
            EF = 'start' in E9 ? (E9.start - EE) / Em : ES.start,
            EC = 'end' in E9 ? (E9.end - EE) / Em : ES.end,
            Et = 'blendIn' in E9 ? E9.blendIn / Em : ES.blendIn,
            EH = 'blendOut' in E9 ? E9.blendOut / Em : ES.blendOut;
          mq.setRange(E8.key, { start: EF, end: EC, blendIn: Et, blendOut: EH });
        } else {
          if (E8.kind === 'ik') {
            let ER = D5.getState(),
              EQ = ER.duration || 0;
            if (!(EQ > 0)) return;
            let Ej = { ...(ER.ik?.ranges || {}) },
              Ez = wN(Ej[E8.key]),
              EO = E8.off || 0,
              EJ = (EU) => Math.min(1, Math.max(0, EU)),
              EZ = {
                start: EJ('start' in E9 ? (E9.start - EO) / EQ : Ez.start),
                end: EJ('end' in E9 ? (E9.end - EO) / EQ : Ez.end),
                blendIn: Math.max(0, 'blendIn' in E9 ? E9.blendIn / EQ : Ez.blendIn),
                blendOut: Math.max(0, 'blendOut' in E9 ? E9.blendOut / EQ : Ez.blendOut),
              };
            (wM(EZ) ? delete Ej[E8.key] : (Ej[E8.key] = EZ),
              D5.setIkOptions({ ranges: Ej }),
              SD(),
              DX?.render());
          }
        }
      }
    }
  }
  function Sv(E8, E9, Ek) {
    if (!DX) return;
    pe.seq.hidden && Sq(!0);
    let Ew = { label: E9.label || E8, duration: E9.duration || 0 },
      EV = document.createElement('div');
    ((EV.className = 'lib-dragghost'),
      (EV.textContent = Ew.label),
      document.body.appendChild(EV),
      document.body.classList.add('is-dragging-clip'));
    let ED = (EF) => {
        ((EV.style.left = EF.clientX + 14 + 'px'), (EV.style.top = EF.clientY + 10 + 'px'));
        let EC = DX.previewDrop(EF.clientX, EF.clientY, Ew);
        EV.classList.toggle('is-over', !!EC);
      },
      Em = () => {
        (window.removeEventListener('pointermove', ED),
          window.removeEventListener('pointerup', ES),
          window.removeEventListener('keydown', EE, !0),
          EV.remove(),
          document.body.classList.remove('is-dragging-clip'));
      },
      ES = async (EF) => {
        Em();
        let EC = DX.dropAt(EF.clientX, EF.clientY, Ew);
        EC && (await SB(E8, EC));
      },
      EE = (EF) => {
        EF.key === 'Escape' && (EF.preventDefault(), DX.clearDrop(), Em());
      };
    (window.addEventListener('pointermove', ED),
      window.addEventListener('pointerup', ES),
      window.addEventListener('keydown', EE, !0),
      ED(Ek));
  }
  async function SB(E8, { drop: E9, start: Ek }) {
    let Ew = Sb().scale || 1,
      EV = Ek / Ew;
    if (E9.kind === 'track') await DR.dropStrip({ id: E8, track: E9.track, start: EV });
    else {
      if (E9.kind === 'new') await DR.dropStrip({ id: E8, track: null, start: EV, baseId: D9 });
      else {
        if (E9.kind === 'base') await DR.dropStrip({ id: E8, start: EV, baseId: D9, toBase: !0 });
        else {
          if (E9.kind === 'start') await DR.dropStrip({ id: E8, start: EV });
          else return;
        }
      }
    }
    as.note('strips');
  }
  ((DX = Kd({
    mount: pe.seq,
    player: D5,
    body: DE,
    model: Sb,
    togglePlay: DG,
    fmt: js,
    onEdit: SY,
    onProps: (E8, E9) => {
      E8.kind === 'layer' && DR.setStripProps(SP(E8), E9);
    },
    onRange: (E8) => {
      if (E8 === 'auto' || E8 === 'manual') {
        DR.setRange(E8);
        return;
      }
      let E9 = Sb().scale || 1;
      DR.setRange({ start: E8.start / E9, end: E8.end / E9 });
    },
    onPlaySequence: () => DR.playSequence(),
    onClear: () => DR.clear(),
    onDelete: (E8) => {
      E8.kind === 'layer' && DR.removeStrip(SP(E8));
    },
    onSplit: (E8) => {
      let E9 = Sb();
      if (E8?.kind !== 'layer' || !E9.hasSequence || E9.playing === !1) return null;
      let Ek = ((E9.offset || 0) + (D5.getState().time || 0)) / (E9.scale || 1);
      return DR.splitStrip(SP(E8), Ek);
    },
    onDuplicate: (E8) => (E8?.kind === 'layer' ? DR.copyStrip(SP(E8)) : null),
    onCopyTo: (E8, E9, Ek) => {
      if (E8?.kind !== 'layer') return null;
      let Ew = Sb().scale || 1,
        EV = { start: Ek.start / Ew, end: Ek.end / Ew };
      return (E9 && (EV.track = E9.kind === 'new' ? null : E9.track), DR.copyStrip(SP(E8), EV));
    },
    onCopy: (E8) => {
      let E9 = (Array.isArray(E8) ? E8 : [E8]).filter((Ew) => Ew?.kind === 'layer'),
        Ek = E9.length ? DR.copyStrips(E9.map(SP)) : !1;
      return (Ek && (SL = 'strips'), Ek);
    },
    onCopyKeys: (E8) => {
      let E9 = mj();
      if (!E9 || !E8.length) return 0;
      let Ek = E8.map((EV) => Math.round(EV.u * (E9 - 1))),
        Ew = Math.min(...Ek);
      return (
        (SX = E8.map((EV, ED) => ({
          key: EV.key,
          group: EV.group || 'adjust',
          df: Ek[ED] - Ew,
          v: EV.v,
          i: EV.i,
          h: EV.h ?? null,
        }))),
        (SL = 'keys'),
        SX.length
      );
    },
    onKeyProps: (E8, E9) => {
      if (E8.group === 'pose') {
        'i' in E9 && mL.setInterp(E8.key, E8.u, E9.i);
        return;
      }
      let Ek = mj(),
        Ew = SO(E8.group, E8.key);
      if (!Ek || !Ew.length) return;
      let EV = Ew.find((ED) => Math.abs(ED.u - E8.u) < 1e-9);
      EV &&
        SJ(E8.group, E8.key, Vb(Ew, EV.u, 'v' in E9 ? E9.v : EV.v, Ek, 'i' in E9 ? E9.i : EV.i));
    },
    onSetKey: (E8) => {
      let E9 = [
          ...new Set(
            E8.filter(
              (EF) =>
                (EF.kind === 'key' && !EF.group) ||
                (EF.kind === 'key' && EF.group === 'adjust') ||
                EF.kind === 'adjust',
            ).map((EF) => EF.key),
          ),
        ],
        Ek = [
          ...new Set(
            E8.filter((EF) => (EF.kind === 'key' && EF.group === 'ik') || EF.kind === 'ik').map(
              (EF) => EF.key,
            ),
          ),
        ],
        Ew = [
          ...new Set(
            E8.filter((EF) => (EF.kind === 'key' && EF.group === 'pose') || EF.kind === 'pose').map(
              (EF) => EF.key,
            ),
          ),
        ];
      if (!E9.length && !Ek.length && !Ew.length) {
        let EF = D5.getState();
        EF.pose?.pending || (EF.pose?.bone && mL.selected())
          ? (Ew = [mL.selected()])
          : EF.ik?.selected
            ? (Ek = [EF.ik.selected])
            : mq.lastTouched() && E9.push(mq.lastTouched());
      }
      let EV = Ew.filter((EC) => mL.keyNow(EC)).map(
          (EC) => mL.get().find((Et) => Et.id === EC)?.name ?? 'pose',
        ),
        ED = E9.filter((EC) => wx[EC]?.kind === 'offset' && mq.keyAt(EC)).map((EC) => wx[EC].label);
      if (Ek.length) {
        let EC = D5.setIkOptions({ keyAt: Ek });
        for (let Et of Ek)
          EC.keys?.[Et]?.length && ED.push(EC.labels?.[Et.replace(/^pole\./, '')] ?? Et);
        (mb?.render(), SD(), DX?.render());
      }
      if ((ED.push(...EV), !ED.length)) return null;
      let Em = mj(),
        ES = D5.getState(),
        EE =
          Em && ES.duration > 0
            ? Math.round(VX((ES.time || 0) / ES.duration, Em) * (Em - 1)) + 1
            : null;
      return 'Keyed ' + ED.join(', ') + (EE ? ' on frame ' + EE : '');
    },
    onPose: (E8, E9) => mL.setLayer(E8, E9),
    onCurves: (E8, { live: E9 = !1 } = {}) => {
      DL = E9;
      for (let { group: Ek, key: Ew, curve: EV } of E8)
        if (Ek === 'bone') {
          let ED = Ew.indexOf(':'),
            Em = Ew.slice(0, ED),
            ES = Ew.slice(ED + 1);
          mL.isCurveBone(Em, ES)
            ? mL.setBoneCurve(Em, ES, EV, { live: E9 })
            : mL.setBoneQuat(Em, ES, EV, { live: E9 });
        } else SJ(Ek, Ew, EV);
    },
    onAdvanced: (E8) => {
      mO = !!E8;
      try {
        localStorage.setItem(mz, mO ? '1' : '0');
      } catch {}
      (mK(), mq.refresh(), mb?.render(), DX?.render());
    },
    onMoveMany: (E8) => {
      let E9 = Sb().scale || 1;
      for (let ED of E8)
        (ED.edit.kind === 'adjust' || ED.edit.kind === 'ik') &&
          SY(ED.edit, { start: ED.start, end: ED.end });
      let Ek = D5.getState().duration || 0,
        Ew = new Map();
      for (let Em of E8) {
        if (Em.edit.kind !== 'key' || !(Ek > 0)) continue;
        let ES = Math.min(1, Math.max(0, (Em.start - (Em.edit.off || 0)) / Ek)),
          EE = (Em.edit.group || 'adjust') + '|' + Em.edit.key;
        (Ew.has(EE) || Ew.set(EE, []), Ew.get(EE).push({ from: Em.edit.u, to: ES }));
      }
      for (let [EF, EC] of Ew) {
        let [Et, EH] = EF.split('|');
        SZ(EH, EC, Et);
      }
      let EV = E8.filter((ER) => ER.edit.kind === 'layer');
      EV.length &&
        DR.moveStrips(EV.map((ER) => ({ i: SP(ER.edit), start: ER.start / E9, end: ER.end / E9 })));
    },
    onDeleteMany: (E8) => {
      for (let EV of E8) EV.kind === 'adjust' && mq.resetKey(EV.key);
      let E9 = new Map();
      for (let ED of E8) {
        if (ED.kind !== 'key') continue;
        let Em = (ED.group || 'adjust') + '|' + ED.key;
        (E9.has(Em) || E9.set(Em, []), E9.get(Em).push(ED.u));
      }
      for (let [ES, EE] of E9) {
        let [EF, EC] = ES.split('|');
        if (EF === 'pose') {
          mL.removeKeys(EC, EE);
          continue;
        }
        SJ(
          EF,
          EC,
          SO(EF, EC).filter((Et) => !EE.some((EH) => Math.abs(EH - Et.u) < 1e-9)),
        );
      }
      let Ek = E8.filter((Et) => Et.kind === 'ik');
      if (Ek.length) {
        let Et = { ...(D5.getState().ik?.ranges || {}) };
        for (let EH of Ek) delete Et[EH.key];
        (D5.setIkOptions({
          offsets: Object.fromEntries(Ek.map((ER) => [ER.key, null])),
          ranges: Et,
        }),
          mb?.render(),
          SD(),
          DX?.render());
      }
      let Ew = E8.filter((ER) => ER.kind === 'layer');
      Ew.length && DR.removeStrips(Ew.map(SP));
    },
    onIk: (E8, E9 = {}, Ek = {}) => {
      let Ew = D5.getState().ik || {},
        EV = {};
      for (let [ED, Em] of [
        ['muted', 'mute'],
        ['solo', 'solo'],
      ]) {
        if (!(Em in E9)) continue;
        let ES = { ...(Ew[ED] || {}) };
        (E9[Em] ? (ES[E8] = !0) : delete ES[E8], (EV[ED] = ES));
      }
      if ('weight' in E9) {
        let EE = { ...(Ew.weights || {}) },
          EF = Math.min(1, Math.max(0, Number(E9.weight)));
        (Math.abs(EF - 1) < 0.000001 ? delete EE[E8] : (EE[E8] = EF), (EV.weights = EE));
      }
      (D5.setIkOptions(EV), SD(), Ek.live || (DX?.render(), mb?.render()));
    },
    onAdjust: (E8, E9 = {}, Ek = {}) => {
      ('value' in E9 && mq.setValue(E8, E9.value, Ek),
        ('mute' in E9 || 'solo' in E9) && mq.setFlags(E8, E9));
    },
    onDuplicateMany: (E8) => DR.duplicateStrips(E8.map(SP)),
    onSplitMany: (E8) => {
      let E9 = Sb();
      if (!E9.hasSequence || E9.playing === !1) return [];
      let Ek = ((E9.offset || 0) + (D5.getState().time || 0)) / (E9.scale || 1);
      return DR.splitStrips(E8.map(SP), Ek);
    },
    onTrack: (E8, E9, Ek) => DR.setTrack(E8, E9, Ek),
    onPaste: (E8) => {
      if (SL === 'keys' && SX?.length) {
        let EV = mj(),
          ED = D5.getState();
        if (!EV || !(ED.duration > 0)) return { keys: [] };
        let Em = Math.round(VX((ED.time || 0) / ED.duration, EV) * (EV - 1)),
          ES = new Map();
        for (let EF of SX) {
          let EC = Math.min(EV - 1, Em + EF.df),
            EH = EF.group + '|' + EF.key;
          (ES.has(EH) || ES.set(EH, []), ES.get(EH).push({ ...EF, frame: EC }));
        }
        let EE = [];
        for (let [ER, EQ] of ES) {
          let [Ej, Ez] = ER.split('|');
          if (Ej === 'pose') {
            for (let EJ of EQ)
              (mL.pasteKey(Ez, EJ.frame / (EV - 1), EJ.v, EJ.i),
                EE.push({ kind: 'key', group: Ej, key: Ez, uid: EJ.frame }));
            continue;
          }
          let EO = SO(Ej, Ez);
          EO.length ||
            (Ej === 'ik'
              ? D5.setIkOptions({ keyAt: Ez })
              : Math.abs((mq.get()[Ez] ?? 0) - wx[Ez].neutral) > 0.000001 && mq.keyAt(Ez),
            (EO = SO(Ej, Ez)));
          for (let EZ of EQ)
            ((EO = Vb(EO, EZ.frame / (EV - 1), EZ.v, EV, EZ.i, EZ.h ?? null)),
              EE.push({ kind: 'key', group: Ej, key: Ez, uid: EZ.frame }));
          SJ(Ej, Ez, EO);
        }
        return { keys: EE };
      }
      let E9 = Sb(),
        Ek = E9.hasSequence
          ? ((E9.offset || 0) + (E9.playing === !1 ? 0 : D5.getState().time || 0)) / (E9.scale || 1)
          : 0,
        Ew = E8?.kind === 'layer' ? DR.getStack()?.layers[SP(E8)]?.track : void 0;
      return DR.paste({ at: Ek, track: Ew });
    },
    canPaste: () => (SL === 'keys' ? !!SX?.length : DR.hasClipboard()),
    onMoveTrack: (E8, E9, Ek) => {
      let Ew = E8.k || 1;
      (E8.kind === 'layer' &&
        (E9.kind === 'track' || E9.kind === 'new') &&
        DR.moveStripToTrack(SP(E8), E9.kind === 'new' ? null : E9.track, {
          start: Ek.start / Ew,
          end: Ek.end / Ew,
        })) ||
        DX.render();
    },
    onClose: () => Sq(!1),
  })),
    pe.strips.addEventListener('click', () => Sq(pe.seq.hidden)),
    (pe.strips.hidden = !1));
  try {
    localStorage.getItem(Sx) === '1' && Sq(!0);
  } catch {}
  (pe.bundleAll.addEventListener('click', () => D8.selectAll(!0)),
    pe.bundleClear.addEventListener('click', () => {
      (D8.clearSelection(), Db([]));
    }),
    pe.bundleRest.addEventListener('click', async () => {
      let E8 = pe.bundleRest.textContent;
      ((pe.bundleRest.disabled = !0), (pe.bundleRest.textContent = 'Writing\u2026'));
      try {
        let E9 = m5(),
          Ek = pe.bundleFormat.value === 'fbx',
          Ew = D5.getState().character,
          EV = await J({
            rigRoot: D5.getRigRoot(),
            clips: [],
            restPose: !0,
            withRig: !0,
            rootName: D3.rig?.joints?.[0] || 'root',
            format: pe.bundleFormat.value,
            fbxTarget: pe.bundleTarget.value,
            skeleton: E9,
            assetRoot: $o,
            rigFile: Ew ? null : D3.rigs?.[D5.getState().rig]?.file || D3.rig?.file || null,
            custom: D5.getCustom?.() ?? null,
            THREE: await import('./dependencies/three.js'),
            provenance: Ew || E9 !== 'default' ? null : Z([], D4, { skeleton: E9 }),
          }),
          ED =
            {
              ue5: '_ue5_manny',
              'ue5-quinn': '_ue5_quinn',
              ue4: '_ue4',
              reallusion: '_cc',
              mixamo: '_mixamo',
            }[E9] ?? (Ek && pe.bundleTarget.value ? '_' + pe.bundleTarget.value : '');
        (U(
          EV,
          (Ew || E9 !== 'default' ? 'character' : 'actionforge_mannequin') +
            '_rest_pose' +
            ED +
            '.' +
            (Ek ? 'fbx' : 'glb'),
        ),
          (pe.bundleRest.textContent = (EV.size / 1024 / 1024).toFixed(1) + ' MB \u2713'));
      } catch (Em) {
        (console.error(Em),
          yo('The character couldn\u2019t be written. Try the other format (GLB / FBX).', {
            error: !0,
            detail: Em.message,
            close: !0,
          }));
      } finally {
        setTimeout(() => {
          ((pe.bundleRest.textContent = E8), Db(D8.getSelected()));
        }, 2500);
      }
    }),
    pe.bundleGo.addEventListener('click', async () => {
      if (Dw) {
        await mk();
        return;
      }
      let E8 = DR.getComposite(),
        E9 = E8 ? DR.sourceIds() : DF().filter((EE) => D4[EE]);
      if (!E9.length) return;
      let Ek = () => Db(D8.getSelected());
      pe.bundleGo.disabled = !0;
      let Ew = pe.bundleFormat.value === 'fbx' ? 'FBX' : 'GLB',
        EV = E9.length,
        ED = {
          skeleton: 'Fetching the skeleton\u2026',
          retarget: 'Retargeting ' + (EV > 1 ? EV + ' clips' : 'the clip') + '\u2026',
          write: 'Writing ' + Ew + '\u2026',
        },
        Em = (EE) => (
          (pe.bundleGo.textContent = EE),
          new Promise((EF) => {
            let EC = setTimeout(EF, 50);
            requestAnimationFrame(() =>
              setTimeout(() => {
                (clearTimeout(EC), EF());
              }, 0),
            );
          })
        ),
        ES = (EE) => Em(ED[EE] ?? 'Packing\u2026');
      await Em(
        E8 ? 'Packing\u2026' : 'Loading ' + (EV > 1 ? EV + ' clips' : 'the clip') + '\u2026',
      );
      try {
        let EE = E8 ? [E8] : await Promise.all(E9.map((EL) => D5.loadClip(EL, D4[EL]))),
          EF = pe.bundleRig.checked && !pe.bundleRig.disabled,
          EC = pe.inPlace.checked && !pe.inPlace.disabled,
          EH = D5.getState().mirrored,
          ER = D5.getState().reversed,
          EQ = D5.getState().reverseOrigin,
          Ej = mq.get(),
          Ez = {
            rigRoot: D5.getRigRoot(),
            propPlacements: D5.getPropPlacements?.() ?? null,
            withRig: EF,
            inPlace: EC,
            mirrored: EH,
            reversed: ER,
            reverseOrigin: EQ,
            adjust: Ej,
            restFrames: D5.getRestFrames(),
            poses: mL.get(),
            poseRest: D5.getPoseRest(),
            THREE: await import('./dependencies/three.js'),
            lock: D5.getState().lock,
            rootName: D3.rig?.joints?.[0] || 'root',
            format: pe.bundleFormat.value,
            fbxTarget: pe.bundleTarget.value,
            skeleton: m5(),
            assetRoot: $o,
            rigFile: D5.getState().character
              ? null
              : D3.rigs?.[D5.getState().rig]?.file || D3.rig?.file || null,
            bakeIk: (EL) => D5.bakeIk(EL),
            fitClip: (EL) => D5.fitClip(EL),
            custom: D5.getCustom?.() ?? null,
            onStage: ES,
          },
          EO = pe.bundleFormat.value === 'fbx' ? 'fbx' : 'glb',
          EJ = (EL) => Z(EL, D4, { adjust: Ej, poses: mL.get(), composed: !!E8, skeleton: m5() }),
          EZ = D5.ikWillBake?.() ?? !1,
          EU =
            ({
              ue5: '_ue5_manny',
              'ue5-quinn': '_ue5_quinn',
              ue4: '_ue4',
              reallusion: '_cc',
              mixamo: '_mixamo',
            }[m5()] ??
              (pe.bundleFormat.value === 'fbx' && pe.bundleTarget.value
                ? '_' + pe.bundleTarget.value
                : '')) +
            (E8 ? '_composite' : '') +
            (mq.isNeutral() && !EZ && !VO(mL.get()).length ? '' : '_adjusted') +
            (ER ? '_reversed' : '') +
            (EH ? '_mirrored' : '') +
            (D5.getState().fitted ? '_fit' : '') +
            (EC ? '_inplace' : '') +
            (EF ? '' : '_anim_only'),
          EK = (EL) =>
            EL.replace(/\.(fbx|glb|zip)$/i, '')
              .replace(/[^A-Za-z0-9_]+/g, '_')
              .replace(/_{2,}/g, '_')
              .replace(/^_+|_+$/g, '') + (EL.match(/\.(fbx|glb|zip)$/i)?.[0] ?? '');
        if (pe.split.checked && !E8 && EE.length > 1) {
          let {
            blob: EL,
            files: Eb,
            bytes: Ex,
          } = await m({
            entries: EE.map((Ey, EW) => ({
              id: E9[EW],
              clip: Ey,
              name: EK('' + mP(E9[EW]) + EU + '.' + EO),
            })),
            exportOne: (Ey, EW) => J({ ...Ez, clips: [Ey], provenance: EJ([EW]), onStage: null }),
            onProgress: (Ey, EW) => {
              pe.bundleGo.textContent = 'Packing ' + Ey + '/' + EW + '\u2026';
            },
          });
          (U(EL, EK('actionforge_' + Eb + '_clips' + EU + '.zip')),
            as.note('exported'),
            (pe.bundleGo.textContent =
              Eb + ' files, ' + (Ex / 1024 / 1024).toFixed(1) + ' MB \u2713'),
            setTimeout(Ek, 2500));
          return;
        }
        let ET = await J({ ...Ez, clips: EE, provenance: EJ(E9) }),
          EA = E8 ? DT?.current() : null,
          En = EU.replace('_composite', '').replace('_adjusted', ''),
          EX = EA
            ? '' + EA + En + '.' + EO
            : E8
              ? '' + E9.map(mP).join('_') + EU + '.' + EO
              : E9.length === 1
                ? '' + mP(E9[0]) + EU + '.' + EO
                : 'actionforge_' + E9.length + '_clips' + EU + '.' + EO;
        (U(ET, EK(EX)),
          as.note('exported'),
          (pe.bundleGo.textContent = (ET.size / 1024 / 1024).toFixed(1) + ' MB \u2713'),
          setTimeout(Ek, 2500));
      } catch (Ey) {
        (console.error(Ey),
          Ek(),
          yo(
            'The download couldn\u2019t be made. Try again, or try the other format (GLB / FBX). If it keeps failing, tell us on Discord with the clip\u2019s name.',
            {
              error: !0,
              detail: Ey.message,
              close: !0,
              retryLabel: 'Try again',
              retry: () => {
                (Ho(), pe.bundleGo.click());
              },
            },
          ));
      } finally {
        pe.bundleGo.disabled = DF().length === 0;
      }
    }));
  let SG = () => Dz?.get().map((E8) => E8.name) ?? [];
  (bd({
    button: pe.saveMine,
    nameNow: () =>
      DT?.current() || (DR?.isActive?.() ? 'My animation' : D4[D9]?.label) || 'My animation',
    whatNow: () =>
      DR?.isActive?.()
        ? 'The sequence on the timeline'
        : D9 && D4[D9]
          ? '\u201C' + (D4[D9].label ?? D9) + '\u201D as it plays'
          : '',
    taken: SG,
    onSave: async ({ name: E8 }) => {
      if (Dw)
        throw new Error(
          'an animal\u2019s animations stay its own. Put the person back on stage first.',
        );
      let E9 = DR?.getComposite?.() ?? null,
        Ek = E9 ? null : D9;
      if (!E9 && !(Ek && D4[Ek])) throw new Error('there is nothing on stage to save.');
      let Ew = E9 ?? (await D5.loadClip(Ek, D4[Ek])),
        EV = await import('./dependencies/three.js'),
        ED = D3.rig?.joints?.[0] || 'root',
        Em = D5.getState(),
        [ES] = f({
          clips: [Ew],
          rigRoot: D5.getRigRoot(),
          rootName: ED,
          inPlace: pe.inPlace.checked && !pe.inPlace.disabled,
          lock: Em.lock,
          mirrored: Em.mirrored,
          reversed: Em.reversed,
          reverseOrigin: Em.reverseOrigin,
          adjust: mq.get(),
          restFrames: D5.getRestFrames(),
          poses: mL.get(),
          poseRest: D5.getPoseRest(),
          bakeIk: (ER) => D5.bakeIk(ER),
        }).clips,
        EE = ES.clone();
      EE.name = Yr(E8, SG());
      let EF = null;
      try {
        let { clone: ER } = await import('./dependencies/skeleton-utils.js'),
          EQ = ER(D5.getRigRoot());
        (EQ.traverse((Ej) => {
          Ej.isSkinnedMesh && Ej.skeleton.pose();
        }),
          EQ.updateMatrixWorld(!0),
          (EF = kR({ rig: EQ, clip: EE, clone: ER, THREE: EV })));
      } catch {}
      let EC = gd(EE, ED),
        EH = await k5(Gr(EE), EE.name, 'made');
      if (
        !(await Dz?.adoptRecord(
          k7(
            EH,
            EE.name,
            EE,
            {
              source: 'made',
              mode: EC.moved ? 'locomotion' : 'hips',
              travel: EC,
              from: E9
                ? 'A sequence made here'
                : 'Made here from \u201C' + (D4[Ek]?.label ?? Ek) + '\u201D',
            },
            EF,
          ),
        ))
      )
        throw new Error('it could not be kept in this browser.');
      return (
        ro(
          'Saved \u201C' +
            EE.name +
            '\u201D with your animations: it is in the grid and in the Import pane, and in your library folder if you have chosen one.',
        ),
        EE.name
      );
    },
  }),
    pe.group.addEventListener('change', () => {
      (Dy(D8.setGrouped(pe.group.checked)), D9 && D8.setActive(D9));
    }),
    pe.search.addEventListener('keydown', (E8) => {
      if (E8.key !== 'Enter') return;
      if ((E8.preventDefault(), SI === 'chars')) {
        pe.charGrid.querySelector('.lib-chartile:not(.lib-chartile--add)')?.click();
        return;
      }
      if (SI === 'poses') return;
      let E9 = D8.firstShown();
      E9 && E9 !== D9 && Dv(E9, Dm[E9]);
    }),
    pe.search.addEventListener('input', () => {
      if (SI === 'chars') {
        SM(DQ.filterGrid(pe.search.value));
        return;
      }
      if (SI === 'poses') {
        r0(rH.filter(pe.search.value));
        return;
      }
      (Dy(D8.filter(pe.search.value)), D9 && D8.setActive(D9));
    }));
  let Sg = 'cgstuff.library.panelTab',
    SI = 'anims',
    SN = { anims: '', poses: '', chars: '' },
    SM = (E8) => {
      pe.count.textContent = E8 + ' character' + (E8 === 1 ? '' : 's');
    },
    r0 = (E8) => {
      pe.count.textContent = E8 + ' pose' + (E8 === 1 ? '' : 's');
    },
    r1 = I(),
    r2 = g({ assetRoot: $o, manifest: D3 }),
    r3 = (E8) => (h(E8) ? (r1.get(E8)?.kind ?? null) : kT(D4[E8])),
    r4 = new Map(),
    r5 = (E8) => (h(E8) ? (r1.get(E8)?.pose ?? null) : (r4.get(E8) ?? null));
  async function r6(E8) {
    if (!h(E8) && !r4.has(E8)) {
      let E9 = await D5.loadClip(E8, D4[E8]);
      r4.set(E8, kT(D4[E8]) === 'hand' ? { hand: kn(E9) } : kX(E9));
    }
    return r5(E8);
  }
  let r7 = () => D5.getState().pose?.bones ?? [];
  function r8(E8, { hand: E9 = 'both', mirrored: Ek = !1 } = {}) {
    let Ew = r5(E8),
      EV = new Set(D5.poseBones()),
      ED = rH.onlyPicked() ? r7() : [],
      Em = (EE) =>
        Object.fromEntries(
          Object.entries(EE).filter(([EF]) => EV.has(EF) && (!ED.length || ED.includes(EF))),
        );
    if (Ew.hand) {
      let EE = {};
      for (let EF of ED.length || E9 === 'both' ? ['l', 'r'] : [Ek ? (E9 === 'l' ? 'r' : 'l') : E9])
        Object.assign(EE, ko(Ew.hand, EF));
      return { turns: Em(EE), place: null };
    }
    let ES = !ED.length || ED.includes('pelvis') ? (Ew.places?.pelvis ?? null) : null;
    return {
      turns: Em(Ek ? wt(Ew.turns) : Ew.turns),
      place: ES && (Ek ? [-ES[0], ES[1], ES[2]] : [...ES]),
    };
  }
  function r9() {
    let E8 = D5.getRigRoot()?.getObjectByName('pelvis');
    return E8?.parent && !DQ?.ref() && (D5.getState().ik?.limbs ?? []).includes('pelvis')
      ? E8
      : null;
  }
  function rk() {
    let E8 = D5.getRigRoot(),
      E9 = E8?.getObjectByName('pelvis');
    return (
      D5.withDrawnPose(() => {
        let Ek = {};
        for (let Ew of D5.poseBones()) {
          let EV = E8.getObjectByName(Ew);
          EV && (Ek[Ew] = EV.quaternion.toArray());
        }
        return { turns: Ek, hips: E9 ? E9.position.toArray() : null };
      }) ?? { turns: {}, hips: null }
    );
  }
  function rw(E8, E9, Ek) {
    let Ew = kL(Ek.turns, E8.turns, E9);
    if (!Object.keys(Ew).length) return !1;
    D5.getState().pose?.autoKey === !1 && Dj?.show('pose');
    let EV = E8.place && Ek.hips ? r9() : null;
    if (EV) {
      let Em = Ek.hips.map((EF, EC) => EF + (E8.place[EC] - EF) * E9),
        ES = D5.withDrawnPose(() => EV.getWorldPosition(EV.position.clone())),
        EE = D5.withDrawnPose(() => EV.parent.localToWorld(EV.position.clone().fromArray(Em)));
      if (ES && EE && ES.distanceTo(EE) > 0.005) {
        let EF = D5.getState().ik ?? {};
        ((EF.enabled ?? []).includes('pelvis') ||
          D5.setIkOptions({ enabled: [...(EF.enabled ?? []), 'pelvis'] }),
          D5.reachIk('pelvis', EE.toArray()),
          mb?.render?.());
      }
    }
    let ED = D5.takePoseTargets(Ew);
    return (SD(), ED);
  }
  let rV = 'cgstuff.remix.now',
    rD = (() => {
      try {
        return JSON.parse(sessionStorage.getItem(rV) ?? 'null');
      } catch {
        return null;
      }
    })();
  function rm(E8) {
    rD = E8 ?? null;
    try {
      rD ? sessionStorage.setItem(rV, JSON.stringify(rD)) : sessionStorage.removeItem(rV);
    } catch {}
  }
  let rS = (E8) => (h(E8) ? (r1.get(E8)?.from ?? null) : null);
  async function rE(E8, { hand: E9 = 'both', mirrored: Ek = !1 } = {}) {
    if (r3(E8)) {
      if (Dw) {
        ro('Poses are for the human character: this one takes none.');
        return;
      }
      try {
        (await r6(E8),
          rm(rS(E8)),
          !rw(r8(E8, { hand: E9, mirrored: Ek }), 1, rk()) &&
            rH.onlyPicked() &&
            r7().length &&
            ro('That pose turns none of the joints that are picked.'));
      } catch (Ew) {
        (console.error(Ew), yo('That pose could not be read.', { error: !0, close: !0 }));
      }
    }
  }
  let rF = null,
    rC = {
      begin(E8, { hand: E9 }) {
        return Dw || !r3(E8)
          ? !1
          : r5(E8)
            ? ((rF = { id: E8, hand: E9, from: rk(), mirrored: null, aim: null, t: 0 }), !0)
            : (r6(E8).catch(() => {}), !1);
      },
      to(E8, E9) {
        let Ek = rF;
        if (!Ek) return;
        (Ek.mirrored !== E9 &&
          ((Ek.mirrored = E9), (Ek.aim = r8(Ek.id, { hand: Ek.hand, mirrored: E9 }))),
          (Ek.t = E8));
        let Ew =
          Ek.aim.place && Ek.from.hips && r9()
            ? { pelvis: Ek.from.hips.map((EV, ED) => EV + (Ek.aim.place[ED] - EV) * E8) }
            : {};
        D5.tryPose({ turns: kL(Ek.from.turns, Ek.aim.turns, E8), places: Ew });
      },
      end(E8) {
        let E9 = rF;
        ((rF = null),
          D5.tryPose(null),
          E9?.aim && E8 && (rw(E9.aim, E9.t, E9.from), rm(rS(E9.id))));
      },
    };
  async function rt(E8, E9, { view: Ek = !1 } = {}) {
    if (Dw) {
      ro('Poses are of the human character: this one has none to keep.');
      return;
    }
    let Ew = rk(),
      EV = G(Ew, { kind: E8, hand: E9 ?? 'r' });
    if (!EV) return;
    let ED = Ek ? (DO?.get() ?? null) : null;
    if (ED) {
      let EF = await import('./dependencies/three.js'),
        EC = D5.getRigRoot()
          ?.getObjectByName(D3.rig?.joints?.[0] || 'root')
          ?.getWorldPosition(new EF.Vector3());
      EC &&
        (ED = {
          ...ED,
          position: [ED.position[0] - EC.x, ED.position[1], ED.position[2] - EC.z],
          target: [ED.target[0] - EC.x, ED.target[1], ED.target[2] - EC.z],
        });
    }
    let Em = ED && E8 === 'hand' ? G(Ew, { kind: 'body' }) : null,
      ES = window.prompt(E8 === 'hand' ? 'A name for this hand pose' : 'A name for this pose', '');
    if (!ES?.trim()) return;
    let EE = await r2.pictureOf(E8, EV);
    try {
      await r1.add({ name: ES, kind: E8, pose: EV, picture: EE, camera: ED, stand: Em, from: rD });
    } catch (error) {
      ro('Could not save this pose: ' + error.message);
      return;
    }
    (rH.showKind(E8),
      ro(
        rD
          ? '\u201C' +
              ES.trim() +
              '\u201D is kept with your poses, as a remix of \u201C' +
              rD.name +
              '\u201D. Post it from the community page.'
          : '\u201C' + ES.trim() + '\u201D is kept with your poses.',
      ));
  }
  let rH = mu({
    mount: pe.poses,
    clips: D4,
    assetRoot: $o,
    onTake: rE,
    blend: rC,
    own: r1,
    onSave: rt,
    hasView: () => !!DO?.get(),
  });
  DJ = () => rH.paintView();
  {
    let E8 = new URLSearchParams(location.search).get('remix');
    E8 &&
      (async () => {
        for (; !D6;) await new Promise((E9) => setTimeout(E9, 120));
        if (
          (await Promise.all([r1.ready, Dz?.ready]),
          history.replaceState(null, '', location.pathname + location.hash),
          h(E8))
        ) {
          let E9 = r1.get(E8);
          if (!E9) return;
          (rR('poses'),
            rH.showKind(E9.kind),
            await rE(E8, { hand: 'r' }),
            E9.camera && (DO?.set(E9.camera), SD(), DJ?.()),
            ro(
              '\u201C' +
                E9.name +
                '\u201D is in your poses, to remix' +
                (E9.from ? ': a copy of ' + (E9.from.by?.name ?? 'someone') + '\u2019s' : '') +
                '. Change the character, then \u201CSave this pose\u201D.',
            ));
        } else
          D4[E8] &&
            (await Dv(E8, D4[E8]),
            ro('\u201C' + (D4[E8].label || E8) + '\u201D is among your animations, to remix.'));
      })().catch((E9) => console.error(E9));
  }
  (rH.onCount((E9) => {
    SI === 'poses' && r0(E9);
  }),
    D5.onState((E9) => rH.setPicked((E9.pose?.bones ?? []).length)));
  function rR(E9) {
    ((SN[SI] = pe.search.value), (SI = E9 === 'poses' || E9 === 'chars' ? E9 : 'anims'));
    for (let [Ek, Ew] of [
      ['anims', pe.tabAnims],
      ['poses', pe.tabPoses],
      ['chars', pe.tabChars],
    ])
      (Ew.classList.toggle('is-on', SI === Ek),
        Ew.setAttribute('aria-selected', String(SI === Ek)));
    ((pe.grid.hidden = SI !== 'anims'),
      (pe.poses.hidden = SI !== 'poses'),
      (pe.charGrid.hidden = SI !== 'chars'),
      (pe.search.value = SN[SI]),
      (pe.search.placeholder =
        SI === 'chars'
          ? 'Search characters\u2026'
          : SI === 'poses'
            ? 'Search poses\u2026'
            : 'Search name or tag\u2026'),
      SI === 'chars'
        ? SM(DQ.filterGrid(pe.search.value))
        : SI === 'poses'
          ? r0(rH.filter(pe.search.value))
          : Dy(D8.filter(pe.search.value)));
    try {
      localStorage.setItem(Sg, SI);
    } catch {}
  }
  (DQ.mountGrid(pe.charGrid),
    pe.tabAnims.addEventListener('click', () => rR('anims')),
    pe.tabPoses.addEventListener('click', () => rR('poses')),
    pe.tabChars.addEventListener('click', () => rR('chars')));
  try {
    let E9 = localStorage.getItem(Sg);
    (E9 === 'chars' || E9 === 'poses') && rR(E9);
  } catch {}
  document.addEventListener('af:save-project', () => { Dw || DT?.save(); });
  window.addEventListener('keydown', (Ek) => {
    if (
      (Ek.ctrlKey || Ek.metaKey) &&
      !Ek.altKey &&
      !Ek.shiftKey &&
      (Ek.key === 's' || Ek.key === 'S')
    ) {
      (Ek.preventDefault(), Dw || DT?.save());
      return;
    }
    if ((Ek.ctrlKey || Ek.metaKey) && !Ek.altKey && /^[zy]$/i.test(Ek.key)) {
      if (
        Ek.target.matches(
          'input[type=text], input[type=search], input[type=number], textarea, [contenteditable=""], [contenteditable="true"]',
        )
      )
        return;
      Ek.preventDefault();
      let EV = Ek.key.toLowerCase() === 'y' || Ek.shiftKey;
      if (DQ?.rigging) {
        DQ.rigUndo(EV);
        return;
      }
      EV ? S4() : S3();
      return;
    }
    let Ew = Ek.target.closest(
      'input, textarea, select, [contenteditable=""], [contenteditable="true"]',
    );
    if (Ek.key === '/' && !Ew && !Ek.ctrlKey && !Ek.metaKey && !Ek.altKey) {
      (Ek.preventDefault(), pe.search.focus(), pe.search.select());
      return;
    }
    if (
      !Ew &&
      !Ek.ctrlKey &&
      !Ek.metaKey &&
      !Ek.altKey &&
      (pe.seq?.hidden ?? !0) &&
      ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(Ek.key)
    ) {
      Ek.preventDefault();
      let ED = D5.getState();
      ED.paused || (D5.setPaused(!0), DB(!0));
      let Em = vs || 30,
        ES = Number(pe.scrub.max) || 0,
        EE =
          Ek.key === 'Home'
            ? 0
            : Ek.key === 'End'
              ? ES
              : Math.round((ED.time || 0) * Em) / Em +
                ((Ek.key === 'ArrowLeft' ? -1 : 1) * (Ek.shiftKey ? 10 : 1)) / Em;
      D5.seek(Math.min(ES, Math.max(0, EE)));
      return;
    }
    Ek.code !== 'Space' ||
      Ek.target.closest(
        'input, textarea, select, button, a[href], [role=checkbox], [role=button], [role=slider], [contenteditable=""], [contenteditable="true"]',
      ) ||
      (Ek.preventDefault(), DG());
  });
  {
    let Ek = document.getElementById('lib-credit'),
      Ew = null,
      EV = () => {
        if (!Ek) return;
        let ED = DR?.getComposite?.() ? DR.sourceIds() : D9 ? [D9] : [],
          Em = V(
            ED.map((EE) => Dm[EE]),
            { ownRig: !!D5.getState().character && !Dw },
          ),
          ES = JSON.stringify(Em);
        if (
          ES !== Ew &&
          ((Ew = ES),
          (Ek.textContent = ''),
          Em.forEach((EE, EF) => {
            if (EF) {
              let EC = document.createElement('span');
              ((EC.textContent = '\u00B7'), Ek.append(' ', EC, ' '));
            }
            (Ek.append(EE.what + ' by '),
              EE.makers.forEach((Et, EH) => {
                EH && Ek.append(', ');
                let ER = document.createElement(Et.url ? 'a' : 'b');
                (Et.url &&
                  ((ER.href = Et.url), (ER.target = '_blank'), (ER.rel = 'noopener noreferrer')),
                  (ER.textContent = Et.name),
                  Ek.append(ER));
              }));
          }),
          Em.length)
        ) {
          let EE = document.createElement('span');
          ((EE.textContent = 'CC0'), Ek.append(' ', EE));
        }
      };
    (D5.onState(EV), EV());
  }
  let rQ = 'host',
    rj = (async () => {
      let ED = null;
      try {
        ED = window.localStorage;
      } catch {}
      if (Q(rQ, ED))
        try {
          let Em = await fetch(a, { credentials: 'same-origin' });
          if (!Em.ok) return;
          let ES = c(await Em.json());
          if (!ES.length) return;
          let EE = await import('./dependencies/three.js');
          for (let EF of ES)
            D4[j(EF)] = z(EF, async () => {
              let EC = await fetch(a + '/' + encodeURIComponent(EF.id) + '/motion', {
                credentials: 'same-origin',
              });
              if (!EC.ok) throw new Error(EF.name + ': its motion could not be fetched');
              let Et = await EC.json();
              return k8({ name: EF.name, duration: Et.duration, tracks: Et.tracks }, EE);
            });
          (Dy(D8.render({ ...D3, clips: D4 })), Dq());
        } catch {}
    })();
  {
    let ED = (ES) => typeof ES == 'string' && ES.includes(R),
      Em = DZ.latest();
    (new URLSearchParams(location.search).has('s') ||
      ED(decodeURIComponent(location.hash)) ||
      ED(Em?.state) ||
      ED(Em?.clip)) &&
      (await Promise.race([rj, new Promise((ES) => setTimeout(ES, 2500))]));
  }
  let rz = decodeURIComponent(location.hash.slice(1)),
    rO = null,
    rJ = null,
    rZ = null,
    rU = new URLSearchParams(location.search).get('s');
  if (rU) {
    try {
      let ES = await Gd(rU, location.hash.slice(1), { origin: location.origin });
      ((rz = ES.state), (rO = ES.clip && D4[ES.clip] ? ES.clip : null), (rZ = ES.clip));
    } catch (EE) {
      ((rz = ''), (rJ = EE.message));
    }
    history.replaceState(null, '', location.pathname + (rz ? '#' + rz : ''));
  }
  await Promise.race([Dz?.ready, new Promise((EF) => setTimeout(EF, 3000))]);
  let rK = DZ.latest(),
    rT = null;
  (!rz && !rU && rK && (rK.state || D4[rK.clip])
    ? ((rT = rK),
      (rz = rK.state),
      rK.clip && D4[rK.clip] && (rO = rK.clip),
      (rZ = rK.clip ?? null),
      DZ.begin(rK))
    : rK && rz && rK.state === rz
      ? DZ.begin(rK)
      : DZ.begin(),
    rO && !rz.split('&').some((EF) => EF.startsWith('c=')) && (await Dv(rO, D4[rO])));
  let rA =
      !!(rK && rz) &&
      rz
        .split('&')
        .filter((EF) => !EF.startsWith('clip='))
        .join('&') === rK.state,
    rn = rT?.aside ?? (rA ? rK.aside : null) ?? null;
  if (!((await SS(rz, { allowClipFallback: !0, clip: rZ, aside: rn })) || !!rO) && !D7) {
    let EF =
      D4[fi] && !D4[fi].deprecated
        ? fi
        : Object.keys(D4)
            .filter((EC) => !D4[EC].deprecated && !D4[EC].unlisted && !kA(D4[EC]))
            .sort()[0];
    EF && (await Dv(EF, D4[EF]));
  }
  if (((D6 = !0), D7)) {
    let [EC, Et] = D7;
    ((D7 = null), Ho(), EC !== D9 && (await Dv(EC, Et)));
  }
  (rJ && (yo(rJ, { error: !0 }), setTimeout(Ho, 6000)),
    rU && !rJ && (S9 = mY()),
    Sk(),
    rT?.project && DT?.setCurrent(rT.project),
    (DU = !0),
    (DA = !0),
    D5.setPoseMode(Dj.get().includes('pose') || Dj.get().includes('picker')),
    rT?.state && rX(),
    document.dispatchEvent(
      new CustomEvent('af:ready', {
        detail: {
          player: D5,
          poseUi: mL,
          ikPanel: mb,
          stage: pe.stage,
          clock: mT,
          setIkCurve: (EH, ER) => SJ('ik', EH, ER),
          setLaneKeys: (EH) => {
            ((_a = !!EH), DX?.render());
          },
        },
      }),
    ));
  function ro(EH) {
    let ER = document.createElement('div');
    ((ER.className = 'lib-resume'),
      ER.setAttribute('role', 'status'),
      ER.append(Object.assign(document.createElement('span'), { textContent: EH })));
    let EQ = document.createElement('button');
    ((EQ.type = 'button'),
      (EQ.className = 'lib-btn lib-btn--sm'),
      (EQ.textContent = '\u2715'),
      (EQ.title = 'Dismiss'));
    let Ej = () => {
      (clearTimeout(Ez), ER.remove());
    };
    (EQ.addEventListener('click', Ej), ER.append(EQ), pe.status.parentElement.appendChild(ER));
    let Ez = setTimeout(Ej, 14000);
  }
  function rX() {
    let EH = document.createElement('div');
    ((EH.className = 'lib-resume'),
      EH.setAttribute('role', 'status'),
      EH.append(
        Object.assign(document.createElement('span'), {
          textContent: rT.project
            ? 'Picked up \u201C' + rT.project + '\u201D where you left off'
            : 'Picked up where you left off',
        }),
      ));
    let ER = document.createElement('button');
    ((ER.type = 'button'),
      (ER.className = 'lib-btn lib-btn--sm'),
      (ER.textContent = 'Start fresh'),
      (ER.title = 'Clear the scene \u2014 the last one stays saved, and Ctrl+Z brings it back'));
    let EQ = () => {
      (clearTimeout(Ej), EH.remove());
    };
    (ER.addEventListener('click', async () => {
      (EQ(), DZ.begin(), DT?.setCurrent(null), await SS(''));
    }),
      EH.append(ER),
      pe.status.parentElement.appendChild(EH));
    let Ej = setTimeout(EQ, 12000);
  }
}
export const ready = initializeWorkspace();
