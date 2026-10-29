import { a as V } from './dependencies/fbx-loader-compat.js';
import {
  b as D,
  c as m,
  d as S,
  e as E,
  f as F,
  g as C,
  h as s,
  i as H,
} from './export/character.js';
import { a, b as R, i as Q, l as c, m as j, n as z, q as p, r as O } from './export/pipeline.js';
import { a as f, c as J } from './storage/characters.js';
import {
  N as Z,
  O as u,
  P as d,
  R as K,
  T,
  a as X,
  b as L,
  c as b,
  m as x,
  o as y,
  s as W,
  t as q,
  v as P,
  w as Y,
} from './animation/engine.js';
import { b as v } from './animation/poses.js';
import { G as B, I as G, s as g } from './rigging/retargeting.js';
import { b as I, c as h } from './animation/channels.js';
import { k as N, l as i, m as M, n as k0, p as k1, q as k2, r as k3 } from './animation/math.js';
import { b as k4, e as k5, g as k6, h as k7 } from './storage/library.js';
import './storage/database.js';
import { a as k8 } from './dependencies/gltf-loader-compat.js';
import { c as k9 } from './dependencies/skeleton-utils-compat.js';
import './dependencies/gltf-exporter-compat.js';
import {
  Ad as kk,
  Ed as kw,
  Id as kV,
  Jg as kD,
  Kd as km,
  Ke as kS,
  Mf as kE,
  Oc as kF,
  Pf as kC,
  Re as kt,
  Vb as kH,
  Vc as ke,
  Vd as kR,
  Wd as kQ,
  Xe as kj,
  Ye as kz,
  Zd as kp,
  ad as kO,
  bd as kf,
  bf as kJ,
  ef as kZ,
  gd as kU,
  hg as kK,
  id as kT,
  j as kA,
  kd as kX,
  ke as kL,
  kg as kb,
  le as kx,
  lf as ky,
  md as kW,
  me as kq,
  n as kP,
  ne as kY,
  oe as kv,
  pe as kB,
  pg as kG,
  vg as kg,
  wf as kI,
  xd as kh,
  yd as kN,
  yf as kM,
  yg as w0,
  zd as w1,
  zf as w2,
} from './dependencies/three-compat.js';
import './interop/exports.js';
var $l = {
    l: { ankle: 'foot_l', ball: 'ball_l', thigh: 'thigh_l' },
    r: { ankle: 'foot_r', ball: 'ball_r', thigh: 'thigh_r' },
  },
  Sl = 21,
  Tl = 0.05,
  di = 0.25,
  Ol = 0.3,
  Rl = 3,
  Al = 0.6,
  Ll = 0.02;
function ha(w3, { start: w4 = 0, reverse: w5 = !1 } = {}) {
  let w6 = w3.N;
  return (w7) =>
    Object.fromEntries(
      ['l', 'r'].map((w8) => [
        w8,
        Uint8Array.from({ length: w7 }, (w9, wk) => {
          let ww = (wk * w6) / w7,
            wV = w5 ? w6 - ww : w4 + ww;
          return w3.feet[w8].down[((Math.round(wV) % w6) + w6) % w6];
        }),
      ]),
    );
}
function lr(w3) {
  let w4 = w3.N;
  return (w5) =>
    Object.fromEntries(
      ['l', 'r'].map((w6) => [
        w6,
        Uint8Array.from(
          { length: w5 },
          (w7, w8) =>
            w3.feet[w6].down[Math.min(w4 - 1, Math.round((w8 * (w4 - 1)) / Math.max(w5 - 1, 1)))],
        ),
      ]),
    );
}
function ma(w3, w4, { fps: w5 = 60, contacts: w6 = null, rest: w7 = Al, band: w8 = Ll } = {}) {
  let w9 = new kb(w3);
  w9.clipAction(w4).play();
  let wk = Math.max(8, Math.round(w4.duration * w5) + 1),
    ww = w4.duration / (wk - 1),
    wV = (wb) => {
      let wx = w3.getObjectByName(wb);
      if (!wx) throw new Error('The rig has no ' + wb);
      return wx;
    },
    wD = wV('root'),
    wm = wV('pelvis'),
    wS = Object.fromEntries(
      Object.entries($l).map(([wb, wx]) => [
        wb,
        { ankle: wV(wx.ankle), ball: wV(wx.ball), thigh: wV(wx.thigh) },
      ]),
    ),
    wE = new kf(),
    wF = (wb) => {
      (w9.setTime(Math.min(wb, w4.duration - 0.000001)), w3.updateMatrixWorld(!0));
    },
    wC = { root: new Float32Array(wk * 3), pelvis: new Float32Array(wk * 3) };
  for (let wb of 'lr')
    for (let wx of ['ankle', 'ball']) wC[wx + '_' + wb] = new Float32Array(wk * 3);
  for (let wy = 0; wy < wk; wy++) {
    (wF(wy * ww),
      wD.getWorldPosition(wE).toArray(wC.root, wy * 3),
      wm.getWorldPosition(wE).toArray(wC.pelvis, wy * 3));
    for (let wW of 'lr')
      (wS[wW].ankle.getWorldPosition(wE).toArray(wC['ankle_' + wW], wy * 3),
        wS[wW].ball.getWorldPosition(wE).toArray(wC['ball_' + wW], wy * 3));
  }
  wF(0);
  let wH = wS.l.thigh.getWorldPosition(new kf()).distanceTo(wS.r.thigh.getWorldPosition(new kf()));
  (w9.stopAllAction(),
    w9.uncacheRoot(w3),
    w3.traverse((wq) => {
      wq.isSkinnedMesh && wq.skeleton.pose();
    }));
  let we = (wq, wP) => new kf(wC[wq][wP * 3], wC[wq][wP * 3 + 1], wC[wq][wP * 3 + 2]),
    wR = (wq) => Math.min(Math.max(wq, 0), wk - 1),
    wQ = we('root', wk - 1)
      .sub(we('root', 0))
      .setY(0),
    wj = wQ.length() > 0.05,
    wz = wj ? wQ.clone().normalize() : new kf(0, 0, 1),
    wp = new kf(0, 1, 0).cross(wz).normalize(),
    wO = (wq) => {
      let wP = [];
      for (let wY of 'lr') for (let wv = 0; wv < wk; wv++) wP.push(wC[wq + '_' + wY][wv * 3 + 1]);
      return (wP.sort((wB, wG) => wB - wG), wP[Math.floor(wP.length * 0.03)]);
    },
    wf = wO('ankle'),
    wJ = wO('ball'),
    wZ = (wq) =>
      Float32Array.from({ length: wk }, (wP, wY) => {
        let wv = wR(wY - 1),
          wB = wR(wY + 1);
        return we(wq, wB).setY(0).distanceTo(we(wq, wv).setY(0)) / Math.max(wB - wv, 1);
      }),
    wU = wZ('root'),
    wK = Math.max(...wU, 1e-9),
    wT = (wq, wP) => {
      let wY = [...wq].sort((wv, wB) => wv - wB);
      return wY[Math.min(wY.length - 1, Math.floor(wY.length * wP))];
    },
    wA = {};
  if (w6) {
    let wq = typeof w6 == 'function' ? w6(wk) : w6;
    for (let wP of 'lr')
      wA[wP] = {
        down: Uint8Array.from({ length: wk }, (wY, wv) => (wq[wP][wv] ? 1 : 0)),
        stances: [],
        swings: [],
      };
  } else {
    let wY = {};
    for (let wB of 'lr')
      for (let wG of ['ankle', 'ball']) {
        let wg = Array.from({ length: wk }, (wh, wN) => wC[wG + '_' + wB][wN * 3 + 1]),
          wI = wG === 'ankle' ? wf : wJ;
        wY[wG + '_' + wB] = {
          v: wZ(wG + '_' + wB),
          y: wg,
          ceiling: wI + Math.max(Ol * (wT(wg, 0.97) - wI), w7 > 0 ? w8 : 0),
        };
      }
    let wv = Math.max(wT([...wY.ball_l.v, ...wY.ball_r.v], 0.9), w7 * ww);
    for (let wh of 'lr') {
      let wN = new Uint8Array(wk);
      if (wv < 0.000001) wN.fill(1);
      else {
        let wM = Float32Array.from(
          { length: wk },
          (V1, V2) =>
            Math.min(
              ...['ball', 'ankle'].map((V3) => {
                let V4 = wY[V3 + '_' + wh];
                return V4.y[V2] <= V4.ceiling ? V4.v[V2] : 1 / 0;
              }),
            ) / wv,
        );
        for (let V1 = 0, V2 = null; V1 <= wk; V1++)
          if (V1 < wk && wM[V1] <= di)
            ((V2 ??= { from: V1, seeded: !1 }), (V2.to = V1), wM[V1] <= Tl && (V2.seeded = !0));
          else {
            if (V2) {
              if (V2.seeded) {
                for (let V3 = V2.from; V3 <= V2.to; V3++) wN[V3] = 1;
              }
              V2 = null;
            }
          }
        let V0 = (V4) => {
          let V5 = [];
          for (let V6 = 0, V7 = -1; V6 <= wk; V6++)
            V6 < wk && wN[V6] === V4
              ? V7 < 0 && (V7 = V6)
              : V7 >= 0 && (V5.push([V7, V6 - 1]), (V7 = -1));
          return V5;
        };
        for (let [V4, V5] of V0(0))
          V4 > 0 && V5 < wk - 1 && V5 - V4 + 1 <= 2 && wN.fill(1, V4, V5 + 1);
        for (let [V6, V7] of V0(1))
          V6 > 0 && V7 < wk - 1 && V7 - V6 + 1 < Rl && wN.fill(0, V6, V7 + 1);
      }
      wA[wh] = { down: wN, stances: [], swings: [] };
    }
  }
  for (let V8 of 'lr') {
    let V9 = wA[V8].down;
    for (let Vk = 0, Vw = -1; Vk <= wk; Vk++) {
      if (Vk < wk && V9[Vk]) {
        Vw < 0 && (Vw = Vk);
        continue;
      }
      if (Vw < 0) continue;
      let VV = Vw,
        VD = Vk - 1,
        Vm = Math.round((VV + VD) / 2);
      Vw = -1;
      let VS = we('ankle_' + V8, Vm),
        VE = we('ball_' + V8, Vm),
        VF = VS.clone().add(VE).multiplyScalar(0.5).setY(0),
        VC = we('pelvis', Vm).setY(0),
        Vt = wC['ankle_' + V8][VV * 3 + 1] - wf,
        VH = wC['ball_' + V8][VV * 3 + 1] - wJ;
      wA[V8].stances.push({
        land: VV,
        lift: VD,
        frames: VD - VV + 1,
        plant: VF,
        lane: VF.clone().sub(VC).dot(wp),
        ahead: VF.clone().sub(VC).dot(wz),
        yaw: Math.atan2(VE.x - VS.x, VE.z - VS.z) - Math.atan2(wz.x, wz.z),
        lands: Vt <= VH ? 'heel' : 'toe',
      });
    }
  }
  let wn = (VR) => (VR.length ? VR.reduce((VQ, Vj) => VQ + Vj, 0) / VR.length : NaN),
    wo = (VR) => {
      let VQ = wA[VR].stances;
      return VQ.length
        ? wn(VQ.map((Vj) => Vj.lane))
        : wn(
            Array.from({ length: wk }, (Vj, Vz) =>
              we('ball_' + VR, Vz)
                .sub(we('pelvis', Vz))
                .dot(wp),
            ),
          );
    },
    wX = (VR) => wU[VR] < 0.15 * wK || !wj,
    wL = {
      duration: w4.duration,
      frames: wk,
      rootMotion: wj,
      speed: wQ.length() / w4.duration,
      top: wK / ww,
      stride: wQ.length(),
      steps: wA.l.stances.length + wA.r.stances.length,
      laneL: wo('l'),
      laneR: wo('r'),
      stanceWidth: wo('l') - wo('r'),
      hipWidth: wH,
      dutyL: wA.l.down.reduce((VR, VQ) => VR + VQ, 0) / wk,
      dutyR: wA.r.down.reduce((VR, VQ) => VR + VQ, 0) / wk,
    };
  return {
    shot: !0,
    N: wk,
    dt: ww,
    dir: wz,
    left: wp,
    speed: wL.speed,
    rootMotion: wj,
    travelD: wQ,
    ankleFloor: wf,
    ballFloor: wJ,
    P: wC,
    feet: wA,
    pace: Float32Array.from(wU, (VR) => VR / ww),
    starts: wX(0) ? 'still' : 'moving',
    ends: wX(wk - 1) ? 'still' : 'moving',
    summary: wL,
  };
}
function Po(
  w3,
  w4,
  { fps: w5 = 60, contacts: w6 = null, walk: w7 = !0, rest: w8 = w7 ? 0 : Al, band: w9 = Ll } = {},
) {
  let wk = new kb(w3);
  wk.clipAction(w4).play();
  let ww = Math.max(8, Math.round(w4.duration * w5)),
    wV = w4.duration / ww,
    wD = (wq) => {
      let wP = w3.getObjectByName(wq);
      if (!wP) throw new Error('The rig has no ' + wq);
      return wP;
    },
    wm = wD('root'),
    wS = wD('pelvis'),
    wE = Object.fromEntries(
      Object.entries($l).map(([wq, wP]) => [
        wq,
        { ankle: wD(wP.ankle), ball: wD(wP.ball), thigh: wD(wP.thigh) },
      ]),
    ),
    wF = new kf(),
    wC = (wq) => {
      (wk.setTime(wq), w3.updateMatrixWorld(!0));
    },
    wH = { root: new Float32Array(ww * 3), pelvis: new Float32Array(ww * 3) };
  for (let wq of 'lr')
    for (let wP of ['ankle', 'ball']) wH[wP + '_' + wq] = new Float32Array(ww * 3);
  for (let wY = 0; wY < ww; wY++) {
    (wC(wY * wV),
      wm.getWorldPosition(wF).toArray(wH.root, wY * 3),
      wS.getWorldPosition(wF).toArray(wH.pelvis, wY * 3));
    for (let wv of 'lr')
      (wE[wv].ankle.getWorldPosition(wF).toArray(wH['ankle_' + wv], wY * 3),
        wE[wv].ball.getWorldPosition(wF).toArray(wH['ball_' + wv], wY * 3));
  }
  wC(0);
  let we = wE.l.thigh.getWorldPosition(new kf()).distanceTo(wE.r.thigh.getWorldPosition(new kf()));
  wC(w4.duration - 0.00001);
  let wR = wm.getWorldPosition(new kf());
  (wk.stopAllAction(),
    wk.uncacheRoot(w3),
    w3.traverse((wB) => {
      wB.isSkinnedMesh && wB.skeleton.pose();
    }));
  let wQ = (wB, wG) => new kf(wH[wB][wG * 3], wH[wB][wG * 3 + 1], wH[wB][wG * 3 + 2]),
    wj = wR.clone().sub(wQ('root', 0)).setY(0),
    wz = wj.length() > 0.05,
    wp = (wB) => {
      let wG = [];
      for (let wg of 'lr') for (let wI = 0; wI < ww; wI++) wG.push(wH[wB + '_' + wg][wI * 3 + 1]);
      return (wG.sort((wh, wN) => wh - wN), wG[Math.floor(wG.length * 0.03)]);
    },
    wO = wp('ankle'),
    wf = wp('ball'),
    wJ = (wB, wG) =>
      wH['ball_' + wB][wG * 3 + 1] < wf + 0.025 || wH['ankle_' + wB][wG * 3 + 1] < wO + 0.02,
    wZ,
    wU;
  if (wz) ((wZ = wj.clone().normalize()), (wU = wj.length() / w4.duration));
  else {
    if (!w7) ((wZ = new kf(0, 0, 1)), (wU = 0));
    else {
      let wB = [];
      for (let wG of 'lr')
        for (let wg = 0; wg < ww; wg++)
          if (wJ(wG, wg)) {
            let wI = wQ('ball_' + wG, (wg + ww - 1) % ww),
              wh = wQ('ball_' + wG, (wg + 1) % ww);
            wB.push(
              wh
                .clone()
                .sub(wI)
                .divideScalar(2 * wV),
            );
          }
      ((wZ = (
        wB.length ? wB.sort((wN, wM) => wN.z - wM.z)[Math.floor(wB.length / 2)] : new kf(0, 0, -1)
      )
        .clone()
        .setY(0)
        .negate()),
        (wU = wZ.length()),
        wZ.normalize(),
        Number.isFinite(wZ.x) || wZ.set(0, 0, 1));
    }
  }
  let wK = new kf(0, 1, 0).cross(wZ).normalize(),
    wT = (wN) => (wz ? new kf() : wZ.clone().multiplyScalar(wU * wN * wV)),
    wA = (wN, wM) => wQ(wN, wM).add(wT(wM)),
    wn = {},
    wo = wz ? wj : wZ.clone().multiplyScalar(wU * w4.duration);
  if (w6) {
    let wN = typeof w6 == 'function' ? w6(ww) : w6;
    for (let wM of 'lr')
      wn[wM] = {
        down: Uint8Array.from({ length: ww }, (V0, V1) => (wN[wM][V1] ? 1 : 0)),
        stances: [],
        swings: [],
      };
  } else {
    let V0 = (V5, V6) => {
        let V7 = wA(V5, ((V6 % ww) + ww) % ww);
        return V6 < 0 ? V7.sub(wo) : V6 >= ww ? V7.add(wo) : V7;
      },
      V1 = (V5) =>
        Float32Array.from(
          { length: ww },
          (V6, V7) => V0(V5, V7 + 1).distanceTo(V0(V5, V7 - 1)) / 2,
        ),
      V2 = (V5, V6) => {
        let V7 = [...V5].sort((V8, V9) => V8 - V9);
        return V7[Math.min(V7.length - 1, Math.floor(V7.length * V6))];
      },
      V3 = {};
    for (let V5 of 'lr')
      for (let V6 of ['ankle', 'ball']) {
        let V7 = Array.from({ length: ww }, (V9, Vk) => wH[V6 + '_' + V5][Vk * 3 + 1]),
          V8 = V6 === 'ankle' ? wO : wf;
        V3[V6 + '_' + V5] = {
          v: V1(V6 + '_' + V5),
          y: V7,
          ceiling: V8 + Math.max(Ol * (V2(V7, 0.97) - V8), w8 > 0 ? w9 : 0),
        };
      }
    let V4 = Math.max(V2([...V3.ball_l.v, ...V3.ball_r.v], 0.9), w8 * wV);
    for (let V9 of 'lr') {
      let Vk = new Uint8Array(ww);
      if (V4 < 0.000001) Vk.fill(1);
      else {
        let Vw = Float32Array.from(
            { length: ww },
            (VD, Vm) =>
              Math.min(
                ...['ball', 'ankle'].map((VS) => {
                  let VE = V3[VS + '_' + V9];
                  return VE.y[Vm] <= VE.ceiling ? VE.v[Vm] : 1 / 0;
                }),
              ) / V4,
          ),
          VV = Vw.findIndex((VD) => VD > di);
        if (VV < 0) Vk.fill(1);
        else {
          let VD = [];
          for (let VS = 1, VE = null; VS <= ww + 1; VS++) {
            let VF = (VV + VS) % ww;
            VS <= ww && Vw[VF] <= di
              ? ((VE ??= { from: VS, seeded: !1 }), (VE.to = VS), Vw[VF] <= Tl && (VE.seeded = !0))
              : VE && (VD.push(VE), (VE = null));
          }
          for (let VC of VD)
            if (VC.seeded) {
              for (let Vt = VC.from; Vt <= VC.to; Vt++) Vk[(VV + Vt) % ww] = 1;
            }
          let Vm = (VH, VR) => {
            let VQ = Vk.findIndex((Vj, Vz) => Vj !== VH && Vk[(Vz + ww - 1) % ww] === VH);
            if (!(VQ < 0))
              for (let Vj = 0; Vj < ww;) {
                let Vz = (VQ + Vj) % ww;
                if (Vk[Vz] === VH) {
                  Vj++;
                  continue;
                }
                let Vp = 0;
                for (; Vp < ww && Vk[(Vz + Vp) % ww] !== VH;) Vp++;
                if (Vp <= VR) {
                  for (let VO = 0; VO < Vp; VO++) Vk[(Vz + VO) % ww] = VH;
                }
                Vj += Vp;
              }
          };
          (Vm(1, 2), Vm(0, Rl - 1));
        }
      }
      wn[V9] = { down: Vk, stances: [], swings: [] };
    }
  }
  let wX = (VH, VR) => {
    let VQ = wA(VH, VR % ww);
    return (VR >= ww && VQ.add(wz ? wj : wZ.clone().multiplyScalar(wU * w4.duration)), VQ);
  };
  for (let VH of 'lr') {
    let VR = wn[VH].down;
    if (VR.every((Vz) => Vz) || !VR.some((Vz) => Vz)) continue;
    let VQ = [];
    for (let Vz = 0; Vz < ww; Vz++) VR[Vz] && !VR[(Vz + ww - 1) % ww] && VQ.push(Vz);
    for (let Vp of VQ) {
      let VO = Vp;
      for (; VR[(VO + 1) % ww] && VO - Vp < ww;) VO++;
      let Vf = Math.round((Vp + VO) / 2),
        VJ = wX('ankle_' + VH, Vf),
        VZ = wX('ball_' + VH, Vf),
        VU = VJ.clone().add(VZ).multiplyScalar(0.5).setY(0),
        VK = wX('pelvis', Vf).setY(0),
        VT = wH['ankle_' + VH][Vp * 3 + 1] - wO,
        VA = wH['ball_' + VH][Vp * 3 + 1] - wf;
      wn[VH].stances.push({
        land: Vp,
        lift: VO % ww,
        frames: VO - Vp + 1,
        plant: VU,
        lane: VU.clone().sub(VK).dot(wK),
        ahead: VU.clone().sub(VK).dot(wZ),
        yaw: Math.atan2(VZ.x - VJ.x, VZ.z - VJ.z) - Math.atan2(wZ.x, wZ.z),
        lands: VT <= VA ? 'heel' : 'toe',
      });
    }
    let Vj = wn[VH].stances;
    for (let Vn = 0; Vn < Vj.length; Vn++) {
      let Vo = Vj[Vn],
        VX = Vj[(Vn + 1) % Vj.length],
        VL = Vo.land + Vo.frames - 1,
        Vb = VX.land + (VX.land <= Vo.land ? ww : 0),
        Vx = wX('ankle_' + VH, VL),
        Vy = wX('ankle_' + VH, Vb),
        VW = Vy.clone().sub(Vx).setY(0),
        Vq = Math.max(VW.lengthSq(), 1e-8),
        VP = [];
      for (let VY = 0; VY < Sl; VY++) {
        let Vv = Math.round(VL + ((Vb - VL) * VY) / (Sl - 1)),
          VB = wX('ankle_' + VH, Vv),
          VG = VB.clone().sub(Vx);
        VP.push({ along: VG.clone().setY(0).dot(VW) / Vq, side: VG.dot(wK), up: VB.y - wO });
      }
      wn[VH].swings.push({ from: VL % ww, frames: Vb - VL, length: Math.sqrt(Vq), path: VP });
    }
  }
  let wL = (Vg) => wn[Vg].stances.reduce((VI, Vh) => Math.min(VI, Vh.land), 1 / 0),
    wb = (Vg) => (Vg.length ? Vg.reduce((VI, Vh) => VI + Vh, 0) / Vg.length : NaN),
    wx = (Vg) =>
      wn[Vg].stances.length
        ? wn[Vg].stances.map((VI) => VI.lane)
        : [
            wb(
              Array.from({ length: ww }, (VI, Vh) =>
                wQ('ball_' + Vg, Vh)
                  .sub(wQ('pelvis', Vh))
                  .dot(wK),
              ),
            ),
          ],
    wy = (Vg) => wn[Vg].down.reduce((VI, Vh) => VI + Vh, 0) / ww,
    wW = {
      duration: w4.duration,
      frames: ww,
      rootMotion: wz,
      speed: wU,
      stride: wU * w4.duration,
      steps: wn.l.stances.length + wn.r.stances.length,
      stepLength: (wU * w4.duration) / Math.max(wn.l.stances.length + wn.r.stances.length, 1),
      laneL: wb(wx('l')),
      laneR: wb(wx('r')),
      stanceWidth: wb(wx('l')) - wb(wx('r')),
      hipWidth: we,
      lead: wL('l') <= wL('r') ? 'left' : 'right',
      lands:
        [...wn.l.stances, ...wn.r.stances].filter((Vg) => Vg.lands === 'heel').length >=
        [...wn.l.stances, ...wn.r.stances].length / 2
          ? 'heel'
          : 'toe',
      dutyL: wy('l'),
      dutyR: wy('r'),
      swingLift: Math.max(
        0,
        ...['l', 'r'].flatMap((Vg) => wn[Vg].swings.flatMap((VI) => VI.path.map((Vh) => Vh.up))),
      ),
    };
  return {
    N: ww,
    dt: wV,
    dir: wZ,
    left: wK,
    speed: wU,
    rootMotion: wz,
    travelD: wj,
    ankleFloor: wO,
    ballFloor: wf,
    P: wH,
    feet: wn,
    summary: wW,
  };
}
var Hu = new kf(0, 1, 0);
function Cl(w3, w4, { rig: w5, name: w6 = w3.name, rootName: w7 = 'root' } = {}) {
  let w8 = w5.getObjectByName(w7);
  if (!w8) throw new Error('The rig has no ' + w7);
  let w9 = new kO();
  w8.parent && (w8.parent.updateWorldMatrix(!0, !1), w8.parent.getWorldQuaternion(w9));
  let wk = w9
      .clone()
      .invert()
      .multiply(new kO().setFromAxisAngle(Hu, (w4 * Math.PI) / 180))
      .multiply(w9),
    ww = w3.clone();
  ww.name = w6;
  let wV = !1;
  for (let wD of ww.tracks)
    if (wD.name === w7 + '.position') {
      let wm = new kf().fromArray(wD.values, 0),
        wS = new kf();
      for (let wE = 0; wE < wD.values.length; wE += 3)
        wS.fromArray(wD.values, wE).sub(wm).applyQuaternion(wk).add(wm).toArray(wD.values, wE);
    } else {
      if (wD.name === w7 + '.quaternion') {
        let wF = new kO();
        for (let wC = 0; wC < wD.values.length; wC += 4)
          wF.fromArray(wD.values, wC).premultiply(wk).toArray(wD.values, wC);
        wV = !0;
      }
    }
  return (
    wV ||
      ww.tracks.push(
        new kI(w7 + '.quaternion', [0], w8.quaternion.clone().premultiply(wk).toArray()),
      ),
    ww
  );
}
var ga = { thigh: 0.091, hips: 0.149, trunk: 0.161, forearm: 0.059, hand: 0.063 },
  _u = {
    thigh: { from: 'thigh_l', to: 'calf_l', own: /^thigh.*_l$/ },
    hips: { from: 'thigh_l', to: 'thigh_r', own: /^pelvis$/ },
    trunk: { from: 'spine_01', to: 'neck_01', own: /^spine_0[123]$/ },
    forearm: { from: 'lowerarm_l', to: 'hand_l', own: /^lowerarm.*_l$/ },
    hand: {
      from: 'hand_l',
      to: 'middle_01_l',
      own: /^hand_l$|^(index|middle|ring|pinky)_0[12]_l$/,
    },
  },
  Fu = (w3, w4, w5) => {
    let w6 = w5.clone().sub(w4),
      w7 = Math.min(Math.max(w3.clone().sub(w4).dot(w6) / Math.max(w6.lengthSq(), 1e-12), 0), 1);
    return w3.distanceTo(w4.clone().addScaledVector(w6, w7));
  };
function Pl(w3, w4 = 0.9) {
  w3.updateMatrixWorld(!0);
  let w5 = (w8) => w3.getObjectByName(w8)?.getWorldPosition(new kf()),
    w6 = new Map();
  w3.traverse((w8) => {
    if (!w8.isSkinnedMesh) return;
    let w9 = w8.geometry,
      wk = w9.attributes.skinIndex,
      ww = w9.attributes.skinWeight;
    if (!(!wk || !ww))
      for (let wV = 0; wV < w9.attributes.position.count; wV++) {
        let wD = 0,
          wm = -1;
        for (let wE = 0; wE < 4; wE++) {
          let wF = ww.getComponent(wV, wE);
          wF > wm && ((wm = wF), (wD = wk.getComponent(wV, wE)));
        }
        let wS = w8.skeleton.bones[wD]?.name;
        wS &&
          (w6.has(wS) || w6.set(wS, []),
          w6.get(wS).push(w8.getVertexPosition(wV, new kf()).applyMatrix4(w8.matrixWorld)));
      }
  });
  let w7 = { ...ga };
  for (let [w8, w9] of Object.entries(_u)) {
    let wk = w5(w9.from),
      ww = w5(w9.to);
    if (!wk || !ww) continue;
    let wV = [...w6]
      .filter(([wD]) => w9.own.test(wD))
      .flatMap(([, wD]) => wD.map((wm) => Fu(wm, wk, ww)))
      .sort((wD, wm) => wD - wm);
    wV.length >= 8 && (w7[w8] = wV[Math.min(wV.length - 1, Math.floor(wV.length * w4))]);
  }
  return w7;
}
var Nu = { amount: 1, gap: 0.02, scale: 1, ease: 0.3, most: 0.6 },
  Fl = ['l', 'r'],
  Vu = new kf(0, 1, 0),
  Nl = (w3, w4) => new kO().setFromAxisAngle(new kf().crossVectors(w4, Vu).normalize(), w3);
function Hl(w3, w4, w5) {
  if (w4 <= 0) return { E: w3.E, W: w3.W, M: w3.M };
  let w6 = Nl(w4, w5),
    w7 = (w8) => w8.clone().sub(w3.S).applyQuaternion(w6).add(w3.S);
  return { E: w7(w3.E), W: w7(w3.W), M: w7(w3.M) };
}
function Vl(w3, w4, w5, w6) {
  let w7 = w4 === 'l' ? 'r' : 'l',
    w8 = w3.body,
    w9 = {},
    wk = [
      ['thigh', w8.hip[w4], w8.knee[w4], w6.thigh],
      ['other thigh', w8.hip[w7], w8.knee[w7], w6.thigh],
      ['hips', w8.hip.l, w8.hip.r, w6.hips],
      ['trunk', w8.low, w8.neck, w6.trunk],
    ];
  for (let [ww, wV, wD, wm] of wk)
    for (let [wS, wE, wF, wC] of [
      ['forearm', w5.E, w5.W, w6.forearm],
      ['hand', w5.W, w5.M, w6.hand],
    ])
      w9[wS + '\u2013' + ww] = Yt(wE, wF, wV, wD) - wC - wm;
  return w9;
}
var _l = (w3, w4) => {
    let w5 = w3.arm.l.S.clone().sub(w3.arm.r.S).setY(0).normalize();
    return w4 === 'l' ? w5 : w5.negate();
  },
  Wl = (w3, w4) =>
    Object.fromEntries(Object.entries({ ...ga, ...w3 }).map(([w5, w6]) => [w5, w6 * w4]));
function Bl(w3, { radii: w4 = ga, scale: w5 = 1 } = {}) {
  let w6 = Wl(w4, w5),
    w7 = {};
  for (let w8 of w3)
    for (let w9 of Fl)
      for (let [wk, ww] of Object.entries(Vl(w8, w9, w8.arm[w9], w6)))
        w7[wk] = Math.min(w7[wk] ?? 1 / 0, ww);
  return w7;
}
function jl({ frames: w3, source: w4 = {}, radii: w5 = ga, opts: w6 = {}, loop: w7 = !0 }) {
  let w8 = { ...Nu, ...w6 },
    w9 = Wl(w5, w8.scale),
    wk = w3.length,
    ww = (wE) => Math.min(w8.gap, w4[wE] ?? 1 / 0),
    wV = (wE, wF, wC) =>
      Math.max(
        0,
        ...Object.entries(Vl(wE, wF, Hl(wE.arm[wF], wC, _l(wE, wF)), w9)).map(
          ([wH, we]) => ww(wH) - we,
        ),
      ),
    wD = w3.map(() => ({ l: null, r: null })),
    wm = [0, 0],
    wS = 0;
  for (let wE of Fl) {
    let wF = w3.map((wj) => {
      let wz = 0,
        wp = Math.max(wj.arm[wE].S.distanceTo(wj.arm[wE].W), 0.1);
      for (let wO = 0; wO < 24; wO++) {
        let wf = wV(wj, wE, wz);
        if (wf <= 0.0001 || wz >= w8.most) break;
        wz = Math.min(wz + (wf + 0.001) / wp, w8.most);
      }
      return wz;
    });
    if (
      (w3.forEach((wj) => {
        wm[0] = Math.max(wm[0], wV(wj, wE, 0));
      }),
      !wF.some((wj) => wj > 0))
    )
      continue;
    let wC = w3.map((wj) => wj.arm[wE].W.clone().sub(wj.arm[wE].S)),
      wH = [0];
    for (let wj = 1; wj <= wk; wj++) wH.push(wH[wj - 1] + wC[wj % wk].distanceTo(wC[wj - 1]));
    let we = wH[wk],
      wR = (wz, wp) => {
        let wO = Math.abs(wH[wp] - wH[wz]);
        return w7 ? Math.min(wO, we - wO) : wO;
      },
      wQ = (wz) => (wz < w8.ease ? 0.5 * (1 + Math.cos((Math.PI * wz) / w8.ease)) : 0);
    w3.forEach((wz, wp) => {
      let wO = 0;
      for (let wZ = 0; wZ < wk; wZ++) wF[wZ] > 0 && (wO = Math.max(wO, wF[wZ] * wQ(wR(wp, wZ))));
      if (((wO *= w8.amount), (wm[1] = Math.max(wm[1], wV(wz, wE, wO))), wO < 0.00001)) return;
      let wf = wz.arm[wE],
        wJ = _l(wz, wE);
      ((wS = Math.max(wS, Hl(wf, wO, wJ).W.distanceTo(wf.W))),
        (wD[wp][wE] = wf.qClav.clone().invert().multiply(Nl(wO, wJ).multiply(wf.qUp))));
    });
  }
  return { turns: wD, short: wm, pushed: wS };
}
var mo = (w3) => w3 - Math.floor(w3),
  fi = (w3) => w3?.i != null && w3.i !== N,
  Il = (w3) => (w3?.keys ?? []).some(fi);
function ya(w3, w4, w5) {
  let w6 = w4.filter((w8) => Number.isFinite(w8.p)).sort((w8, w9) => w8.p - w9.p),
    w7 = w6.length;
  return !w7 || !w6.some(fi)
    ? w3
    : (w8) => {
        let w9 = w5 ? Math.floor(w8) : 0,
          wk = w8 - w9,
          ww = -1;
        for (let wH = 0; wH < w7; wH++) w6[wH].p <= wk + 1e-9 && (ww = wH);
        let wV, wD, wm, wS;
        if (w5) {
          ww < 0 ? ((wV = w6[w7 - 1]), (wD = wV.p - 1)) : ((wV = w6[ww]), (wD = wV.p));
          let we = ww < 0 ? 0 : ww + 1;
          ((wm = w6[we % w7]), (wS = wm.p + (we >= w7 ? 1 : 0)));
        } else {
          if (ww < 0 || ww >= w7 - 1) return w3(w8);
          ((wV = w6[ww]), (wD = wV.p), (wm = w6[ww + 1]), (wS = wm.p));
        }
        if (!fi(wV) || wS - wD < 1e-9) return w3(w8);
        let wE = w3(wD + w9);
        if (wV.i === M) return wE;
        let wF = w3(wS + w9),
          wC = (wk - wD) / (wS - wD);
        return wE + (wF - wE) * (wV.i === i ? wC : k2(wV.i, wC));
      };
}
function Dl(w3, w4, w5 = !0) {
  let w6 = w3.length,
    w7 = Math.max(w5 ? 4 : 1, Math.round(w4));
  return w6 < 2
    ? w3
    : w5
      ? Array.from({ length: w7 }, (w8, w9) => {
          let wk = (w9 / w7) * w6,
            ww = Math.floor(wk),
            wV = wk - ww;
          return w3[ww % w6] * (1 - wV) + w3[(ww + 1) % w6] * wV;
        })
      : Array.from({ length: w7 + 1 }, (w8, w9) => {
          let wk = (w9 / w7) * (w6 - 1),
            ww = Math.min(Math.floor(wk), w6 - 2),
            wV = wk - ww;
          return w3[ww] * (1 - wV) + w3[ww + 1] * wV;
        });
}
function cr(w3, w4) {
  let w5 = w3.length,
    w6 = [],
    w7 = new Array(w5).fill(0);
  for (let w8 = 0; w8 < w5 - 1; w8++) w6.push((w4[w8 + 1] - w4[w8]) / (w3[w8 + 1] - w3[w8]));
  for (let w9 = 1; w9 < w5 - 1; w9++) {
    if (w6[w9 - 1] * w6[w9] <= 0) continue;
    let wk = w3[w9] - w3[w9 - 1],
      ww = w3[w9 + 1] - w3[w9];
    w7[w9] = (3 * (wk + ww)) / ((2 * ww + wk) / w6[w9 - 1] + (ww + 2 * wk) / w6[w9]);
  }
  return ((w7[0] = w6[0] ?? 0), (w7[w5 - 1] = w6[w5 - 2] ?? 0), w7);
}
function ur(w3, w4, w5, w6 = w5) {
  let w7 = w3.length;
  return (w8) => {
    if (w8 <= w3[0]) return w4[0] + (w8 - w3[0]) * w5[0];
    if (w8 >= w3[w7 - 1]) return w4[w7 - 1] + (w8 - w3[w7 - 1]) * w6[w7 - 1];
    let w9 = 0;
    for (; w8 > w3[w9 + 1];) w9++;
    let wk = w3[w9 + 1] - w3[w9],
      ww = (w8 - w3[w9]) / wk,
      wV = ww * ww,
      wD = wV * ww;
    return (
      (2 * wD - 3 * wV + 1) * w4[w9] +
      (wD - 2 * wV + ww) * wk * w6[w9] +
      (-2 * wD + 3 * wV) * w4[w9 + 1] +
      (wD - wV) * wk * w5[w9 + 1]
    );
  };
}
function pi(w3) {
  let w4 = (w3?.keys ?? []).map((w6) => ({ ...w6 })),
    w5 = (w6) =>
      w3.flip
        ? {
            dv: -w6.dv,
            ...(w6.tin != null ? { tin: -w6.tin } : {}),
            ...(w6.tout != null ? { tout: -w6.tout } : {}),
          }
        : {};
  return (
    w3?.mirror
      ? w4.flatMap((w6, w7) => {
          let w8 = mo(w6.u) % 0.5;
          return [
            { ...w6, u: w8, of: w7, twin: !1 },
            { ...w6, u: w8 + 0.5, ...w5(w6), of: w7, twin: !0 },
          ];
        })
      : w4.map((w6, w7) => ({ ...w6, u: mo(w6.u), of: w7, twin: !1 }))
  ).sort((w6, w7) => w6.u - w7.u);
}
function Nt(w3) {
  let w4 = pi(w3);
  if (!w4.some((wF) => wF.du || wF.dv || wF.tin != null || wF.tout != null))
    return {
      from: (wF) => wF,
      to: (wF) => wF,
      lift: () => 0,
      moved: !1,
      keys: w4.map((wF) => ({ ...wF, p: mo(wF.u), tin: 0, tout: 0 })),
    };
  let w5 = [],
    w6 = [];
  for (let wF of [-1, 0, 1]) for (let wC of w4) (w5.push(wC.u + wF), w6.push(wC.u + wC.du + wF));
  let w7 = ur(w5, w6, cr(w5, w6)),
    w8 = [-1, 0, 1]
      .flatMap((wH) => w4.map((we) => ({ k: we, p: we.u + we.du + wH })))
      .sort((wH, we) => wH.p - we.p),
    w9 = w8.map((wH) => wH.p),
    wk = w8.map((wH) => wH.k.dv),
    ww = cr(w9, wk),
    wV = (wH, we) =>
      wH < 0 || we >= w9.length
        ? ww[Math.min(Math.max(wH, 0), w9.length - 1)]
        : (wk[we] - wk[wH]) / (w9[we] - w9[wH]),
    wD = w8.map((wH, we) => (wH.k.type === 'vector' ? wV(we - 1, we) : (wH.k.tin ?? ww[we]))),
    wm = w8.map((wH, we) => (wH.k.type === 'vector' ? wV(we, we + 1) : (wH.k.tout ?? ww[we]))),
    wS = ur(w9, wk, wD, wm),
    wE = new Map(
      w8
        .map((wH, we) => [wH.k, { tin: wD[we], tout: wm[we], p: wH.p }])
        .filter(([, wH]) => wH.p >= -0.5 && wH.p < 1.5)
        .map(([wH, we]) => [wH, { tin: we.tin, tout: we.tout }]),
    );
  return {
    from: (wH) => {
      let we = Math.floor(wH),
        wR = wH - we,
        wQ = wR - 0.5,
        wj = wR + 0.5;
      for (let wz = 0; wz < 40; wz++) {
        let wp = (wQ + wj) / 2;
        w7(wp) < wR ? (wQ = wp) : (wj = wp);
      }
      return (wQ + wj) / 2 + we;
    },
    to: (wH) => {
      let we = Math.floor(wH);
      return w7(wH - we) + we;
    },
    lift: wS,
    moved: !0,
    keys: w4.map((wH) => ({ ...wH, p: mo(wH.u + wH.du), ...wE.get(wH) })),
  };
}
function bn(w3, w4) {
  let w5 = w3.length,
    w6 = mo(w4) * w5,
    w7 = Math.floor(w6),
    w8 = w6 - w7,
    w9 = w3[(w7 + w5 - 1) % w5],
    wk = w3[w7 % w5],
    ww = w3[(w7 + 1) % w5],
    wV = w3[(w7 + 2) % w5];
  return (
    wk +
    0.5 * w8 * (ww - w9 + w8 * (2 * w9 - 5 * wk + 4 * ww - wV + w8 * (3 * (wk - ww) + wV - w9)))
  );
}
function zl(w3, w4, w5 = 0) {
  let w6 = Nt(w4),
    w7 = w4?.late ?? 0,
    w8 = w4?.amount ?? 1;
  if (!w6.moved && !w7 && w8 === 1 && !Il(w4)) return w3;
  let w9 = w3.length,
    wk = w8 === 1 ? 0 : w3.reduce((wV, wD) => wV + wD, 0) / w9,
    ww = ya((wV) => wk + w8 * (bn(w3, w6.from(wV) - w7 - w5) - wk) + w6.lift(mo(wV)), w6.keys, !0);
  return w3.map((wV, wD) => ww(w5 + wD / w9));
}
function dr(w3, w4) {
  let w5 = w3.length - 1;
  if (w5 < 1) return w3[0] ?? 0;
  let w6 = Math.min(Math.max(w4, 0), 1) * w5,
    w7 = Math.min(Math.floor(w6), w5 - 1),
    w8 = w6 - w7,
    w9 = (wm) => w3[Math.min(Math.max(wm, 0), w5)],
    wk = w9(w7 - 1),
    ww = w9(w7),
    wV = w9(w7 + 1),
    wD = w9(w7 + 2);
  return (
    ww +
    0.5 * w8 * (wV - wk + w8 * (2 * wk - 5 * ww + 4 * wV - wD + w8 * (3 * (ww - wV) + wD - wk)))
  );
}
function dn(w3) {
  let w4 = (wH) => Math.min(Math.max(wH, 0), 1),
    w5 = (w3?.keys ?? [])
      .map((wH, we) => ({ ...wH, u: w4(wH.u), of: we, twin: !1 }))
      .sort((wH, we) => wH.u - we.u);
  if (!w5.some((wH) => wH.du || wH.dv || wH.tin != null || wH.tout != null))
    return {
      from: (wH) => wH,
      to: (wH) => wH,
      lift: () => 0,
      moved: !1,
      keys: w5.map((wH) => ({ ...wH, p: wH.u, tin: 0, tout: 0 })),
    };
  let w6 = [0],
    w7 = [0];
  for (let wH of w5)
    wH.u > 0.000001 &&
      wH.u < 1 - 0.000001 &&
      wH.u - w6[w6.length - 1] > 0.000001 &&
      (w6.push(wH.u), w7.push(wH.u + wH.du));
  (w6.push(1), w7.push(1));
  for (let we = 1; we < w7.length - 1; we++)
    w7[we] = Math.min(Math.max(w7[we], w7[we - 1] + 0.0001), 1 - 0.0001 * (w7.length - 1 - we));
  let w8 = ur(w6, w7, cr(w6, w7)),
    w9 = (wR) => w8(w4(wR)),
    wk = w5
      .map((wR) => ({ k: wR, p: w9(wR.u) }))
      .sort((wR, wQ) => wR.p - wQ.p)
      .filter((wR, wQ, wj) => !wQ || wR.p - wj[wQ - 1].p > 0.000001),
    ww = wk.map((wR) => wR.p),
    wV = wk.map((wR) => wR.k.dv),
    wD = cr(ww, wV),
    wm = (wR, wQ) => (wR < 0 || wQ >= ww.length ? 0 : (wV[wQ] - wV[wR]) / (ww[wQ] - ww[wR])),
    wS = wk.map((wR, wQ) => (wR.k.type === 'vector' ? wm(wQ - 1, wQ) : (wR.k.tin ?? wD[wQ]))),
    wE = wk.map((wR, wQ) => (wR.k.type === 'vector' ? wm(wQ, wQ + 1) : (wR.k.tout ?? wD[wQ]))),
    wF = ww.length > 1 ? ur(ww, wV, wS, wE) : () => wV[0] ?? 0,
    wC = new Map(wk.map((wR, wQ) => [wR.k, { tin: wS[wQ], tout: wE[wQ] }]));
  return {
    from: (wR) => {
      let wQ = w4(wR),
        wj = 0,
        wz = 1;
      for (let wp = 0; wp < 40; wp++) {
        let wO = (wj + wz) / 2;
        w8(wO) < wQ ? (wj = wO) : (wz = wO);
      }
      return (wj + wz) / 2;
    },
    to: w9,
    lift: (wR) => (ww.length ? wF(Math.min(Math.max(wR, ww[0]), ww[ww.length - 1])) : 0),
    moved: !0,
    keys: w5.map((wR) => ({ ...wR, p: w9(wR.u), tin: 0, tout: 0, ...wC.get(wR) })),
  };
}
function Yl(w3, w4) {
  let w5 = dn(w4),
    w6 = w4?.late ?? 0,
    w7 = w4?.amount ?? 1;
  if (!w5.moved && !w6 && w7 === 1 && !Il(w4)) return w3;
  let w8 = w3.length - 1,
    w9 = w7 === 1 ? 0 : w3.reduce((ww, wV) => ww + wV, 0) / w3.length,
    wk = ya((ww) => w9 + w7 * (dr(w3, w5.from(ww) - w6) - w9) + w5.lift(ww), w5.keys, !1);
  return w3.map((ww, wV) => wk(w8 > 0 ? wV / w8 : 0));
}
function hi(w3, w4) {
  let w5 = dn(w4),
    w6 = w4?.late ?? 0,
    w7 = w4?.amount ?? 1,
    w8 = w7 === 1 ? 0 : w3.reduce((wk, ww) => wk + ww, 0) / w3.length,
    w9 = ya((wk) => w8 + w7 * (dr(w3, w5.from(wk) - w6) - w8) + w5.lift(wk), w5.keys, !1);
  return (wk) => w9(Math.min(Math.max(wk, 0), 1));
}
function ql(w3) {
  let w4 = w3.length,
    w5 = (wk) => [
      { u: 0, du: 0, dv: 0 },
      ...wk.map((ww) => ({ u: ww, du: 0, dv: 0 })),
      { u: 1, du: 0, dv: 0 },
    ];
  if (w4 < 5) return w5([0.5]);
  let w6 = Array.from(w3);
  for (let wk = 0; wk < 2; wk++)
    w6 = w6.map(
      (ww, wV) =>
        0.25 * w6[Math.max(wV - 1, 0)] + 0.5 * w6[wV] + 0.25 * w6[Math.min(wV + 1, w4 - 1)],
    );
  let w7 = Math.max(...w6) - Math.min(...w6),
    w8 = [];
  for (let ww = 1; ww < w4 - 1; ww++) {
    let wV = w6[ww - 1],
      wD = w6[ww],
      wm = w6[ww + 1];
    ((wD > wV && wD >= wm) || (wD < wV && wD <= wm)) && w8.push(ww);
  }
  let w9 = w8
    .filter((wS, wE) => Math.abs(w6[wS] - w6[wE ? w8[wE - 1] : 0]) > 0.05 * w7)
    .map((wS) => wS / (w4 - 1))
    .filter((wS, wE, wF) => wS > 0.03 && wS < 0.97 && (!wE || wS - wF[wE - 1] > 0.04));
  return (w9.length < 1 && (w9 = [0.5]), w5(w9.slice(0, 8)));
}
function fr(w3, w4 = 0) {
  return {
    keys: (w3?.keys ?? [])
      .filter((w5) => w5.lock)
      .map((w5) => ({ u: w5.u, du: w5.du + (w5.kind === 'lift' ? w4 : 0), dv: 0 })),
  };
}
function Go(w3, w4 = 0) {
  let w5 = Nt(fr(w3, w4));
  return w5.moved
    ? {
        ...w3,
        keys: w3.keys.map((w6) => {
          let w7 = w5.to(mo(w6.u));
          return w6.lock
            ? { ...w6, u: mo(w7), du: 0 }
            : { ...w6, u: mo(w7), du: mo(w6.u) + w6.du - w7 };
        }),
      }
    : w3;
}
function Gl(w3, w4, w5 = 0, w6 = 0) {
  let w7 = Nt(fr(w4, w5)),
    w8 = Nt(Go(w4, w5)),
    w9 = (wk) => {
      let ww = w7.from(wk);
      return bn(w3, ww) + w6 * (ww - wk);
    };
  return ya((wk) => w9(w8.from(wk)) + w8.lift(mo(wk)), w8.keys, !0);
}
function Ul(w3, w4) {
  let w5 = Nt(w4),
    w6 = w4?.late ?? 0,
    w7 = w4?.amount ?? 1,
    w8 = w7 === 1 ? 0 : w3.reduce((w9, wk) => w9 + wk, 0) / w3.length;
  return ya((w9) => w8 + w7 * (bn(w3, w5.from(w9) - w6) - w8) + w5.lift(mo(w9)), w5.keys, !0);
}
function mi(w3, w4 = !0) {
  let w5 = w3.length,
    w6 = Array.from(w3);
  for (let wk = 0; wk < 2; wk++)
    w6 = w6.map(
      (ww, wV) => 0.25 * w6[(wV + w5 - 1) % w5] + 0.5 * w6[wV] + 0.25 * w6[(wV + 1) % w5],
    );
  let w7 = Math.max(...w6) - Math.min(...w6),
    w8 = [];
  for (let ww = 0; ww < w5; ww++) {
    let wV = w6[(ww + w5 - 1) % w5],
      wD = w6[ww],
      wm = w6[(ww + 1) % w5];
    ((wD > wV && wD >= wm) || (wD < wV && wD <= wm)) && w8.push(ww);
  }
  let w9 = w8
    .filter(
      (wS, wE) => Math.abs(w6[wS] - w6[w8[(wE + 1) % w8.length]]) > 0.05 * w7 || w8.length <= 2,
    )
    .map((wS) => wS / w5);
  return (
    w4 &&
      (w9 = [...new Set(w9.map((wS) => +(wS % 0.5).toFixed(4)))].filter((wS, wE, wF) =>
        wF.every(
          (wC, wH) => wH >= wE || Math.min(Math.abs(wS - wC), 0.5 - Math.abs(wS - wC)) > 0.06,
        ),
      )),
    w9.length === 1 && w4 && w9.push((w9[0] + 0.25) % 0.5),
    w9.length < 2 && (w9 = w4 ? [0.12, 0.37] : [0.12, 0.37, 0.62, 0.87]),
    w9
      .sort((wS, wE) => wS - wE)
      .slice(0, w4 ? 4 : 8)
      .map((wS) => ({ u: wS, du: 0, dv: 0 }))
  );
}
var wa = new kf(0, 1, 0),
  oo = 180 / Math.PI,
  pr = [
    {
      key: 'fwd',
      short: 'Rot X (forward)',
      colour: '#ff5a6a',
      flip: !1,
      up: 'tipped forward',
      down: 'back',
    },
    {
      key: 'side',
      short: 'Rot Y (side)',
      colour: '#7bd66b',
      flip: !0,
      up: 'tipped to its left',
      down: 'to its right',
    },
    {
      key: 'twist',
      short: 'Rot Z (twist)',
      colour: '#5aa0ff',
      flip: !0,
      up: 'turned left',
      down: 'turned right',
    },
  ],
  jn = [
    {
      key: 'locX',
      short: 'Loc X (side)',
      colour: '#ff5a6a',
      flip: !0,
      up: 'to its left',
      down: 'to its right',
      axis: 'x',
    },
    {
      key: 'locY',
      short: 'Loc Y (forward)',
      colour: '#7bd66b',
      flip: !1,
      up: 'ahead',
      down: 'behind',
      axis: 'z',
    },
    {
      key: 'locZ',
      short: 'Loc Z (up)',
      colour: '#5aa0ff',
      flip: !1,
      up: 'higher',
      down: 'lower',
      axis: 'y',
    },
  ],
  gi = [
    {
      key: 'aimX',
      short: 'Target X (side)',
      colour: '#ff5a6a',
      flip: !0,
      up: 'to its left',
      down: 'to its right',
      axis: 'x',
    },
    {
      key: 'aimY',
      short: 'Target Y (forward)',
      colour: '#7bd66b',
      flip: !1,
      up: 'ahead',
      down: 'behind',
      axis: 'z',
    },
    {
      key: 'aimZ',
      short: 'Target Z (up)',
      colour: '#5aa0ff',
      flip: !1,
      up: 'higher',
      down: 'lower',
      axis: 'y',
    },
  ],
  Wu = [
    {
      key: 'roll',
      short: 'Roll',
      colour: '#ffd166',
      flip: !0,
      up: 'rolled one way',
      down: 'the other',
      turn: !0,
    },
  ],
  yi = [
    {
      key: 'upX',
      short: 'Up target X (side)',
      colour: '#b8414d',
      flip: !0,
      up: 'to its left',
      down: 'to its right',
      axis: 'x',
    },
    {
      key: 'upY',
      short: 'Up target Y (forward)',
      colour: '#55964a',
      flip: !1,
      up: 'ahead',
      down: 'behind',
      axis: 'z',
    },
    {
      key: 'upZ',
      short: 'Up target Z (up)',
      colour: '#3f72b5',
      flip: !1,
      up: 'higher',
      down: 'lower',
      axis: 'y',
    },
  ],
  hr = (w3) => [...gi, ...(w3 === 'curve' ? Wu : w3 === 'up' ? yi : [])],
  In = [
    {
      key: 'pinX',
      short: 'Pin X',
      colour: '#ff5a6a',
      up: 'along +X',
      down: 'along \u2212X',
      own: 'x',
      axis: 'x',
    },
    {
      key: 'pinY',
      short: 'Pin Y',
      colour: '#7bd66b',
      up: 'along +Y',
      down: 'along \u2212Y',
      own: 'y',
      axis: 'z',
    },
    {
      key: 'pinZ',
      short: 'Pin Z',
      colour: '#5aa0ff',
      up: 'along +Z',
      down: 'along \u2212Z',
      own: 'z',
      axis: 'y',
    },
    {
      key: 'pinFwd',
      short: 'Pin Rot X',
      colour: '#b8414d',
      up: 'tipped one way',
      down: 'the other',
      turn: 'fwd',
    },
    {
      key: 'pinSide',
      short: 'Pin Rot Y',
      colour: '#55964a',
      up: 'tipped one way',
      down: 'the other',
      turn: 'side',
    },
    {
      key: 'pinTwist',
      short: 'Pin Rot Z',
      colour: '#3f72b5',
      up: 'turned one way',
      down: 'the other',
      turn: 'twist',
    },
    {
      key: 'hold',
      short: 'Hold (0\u20131)',
      colour: '#ffd166',
      up: 'held',
      down: 'free',
      hold: !0,
    },
  ];
function mr(w3, w4, w5, w6) {
  let w7 = w5.map((w8) => w8.clone().invert());
  return {
    loc: w4.map((w8, w9) => w8.clone().sub(w6[w9]).applyQuaternion(w7[w9])),
    ...va(w3.map((w8, w9) => w7[w9].clone().multiply(w8))),
  };
}
var wi = ['+y', '-y', '+x', '-x', '+z', '-z'],
  Uo = (w3) =>
    new kf(
      w3?.[1] === 'x' ? 1 : 0,
      w3?.[1] === 'y' || !w3 ? 1 : 0,
      w3?.[1] === 'z' ? 1 : 0,
    ).multiplyScalar(w3?.[0] === '-' ? -1 : 1),
  xn = (w3) => ({ x: '+y', y: '+z', z: '+x' })[w3?.[1] ?? 'y'];
function vi(w3, w4) {
  let w5 = w3.getObjectByName(w4);
  if (!w5) return {};
  w3.updateMatrixWorld(!0);
  let w6 = w5.getWorldQuaternion(new kO()),
    w7 = [
      ['left', 1, 0, 0],
      ['right', -1, 0, 0],
      ['up', 0, 1, 0],
      ['down', 0, -1, 0],
      ['forward', 0, 0, 1],
      ['back', 0, 0, -1],
    ];
  return Object.fromEntries(
    wi.map((w8) => {
      let w9 = Uo(w8).applyQuaternion(w6);
      return [
        w8,
        w7.reduce((wk, ww) =>
          w9.x * ww[1] + w9.y * ww[2] + w9.z * ww[3] > w9.x * wk[1] + w9.y * wk[2] + w9.z * wk[3]
            ? ww
            : wk,
        )[0],
      ];
    }),
  );
}
var mt = {
  hips: { label: 'Pelvis', bones: ['pelvis'], loc: !1 },
  spine: { label: 'Spine (all three)', bones: ['spine_01', 'spine_02', 'spine_03'] },
  spine_01: { label: 'Spine 1', bones: ['spine_01'] },
  spine_02: { label: 'Spine 2', bones: ['spine_02'] },
  chest: { label: 'Chest', bones: ['spine_03'] },
  neckhead: { label: 'Neck and head', bones: ['neck_01', 'Head'] },
  neck: { label: 'Neck', bones: ['neck_01'] },
  head: { label: 'Head', bones: ['Head'] },
  arm: {
    label: 'Arms (shoulder to hand)',
    bones: ['clavicle', 'upperarm', 'lowerarm', 'hand'],
    sided: !0,
  },
  shoulder: { label: 'Shoulders', bones: ['clavicle'], sided: !0 },
  upperarm: { label: 'Upper arms', bones: ['upperarm'], sided: !0 },
  forearm: { label: 'Forearms', bones: ['lowerarm'], sided: !0 },
  hand: { label: 'Hands', bones: ['hand'], sided: !0 },
  hand_l: { label: 'Left hand', bones: ['hand_l'], pin: 'l' },
  hand_r: { label: 'Right hand', bones: ['hand_r'], pin: 'r' },
};
function Bu(w3) {
  let w4 = new ke();
  for (let w5 of w3) {
    let w6 = w5.dot(w3[0]) < 0 ? -1 : 1;
    ((w4.x += w6 * w5.x), (w4.y += w6 * w5.y), (w4.z += w6 * w5.z), (w4.w += w6 * w5.w));
  }
  return (w4.normalize(), new kO(w4.x, w4.y, w4.z, w4.w));
}
var gr = (w3, w4) => {
  let w5 = Math.hypot(w3, w4);
  return w5 > 1e-9 ? new kO().setFromAxisAngle(new kf(w3 / w5, 0, -w4 / w5), w5) : new kO();
};
function va(w3) {
  let w4 = Bu(w3),
    w5 = w4.clone().invert(),
    w6 = { mid: w4, fwd: [], side: [], twist: [], wide: 0 },
    w7 = 0;
  for (let w8 of w3) {
    let w9 = w8.clone().multiply(w5),
      wk = wa.clone().applyQuaternion(w9),
      ww = Math.hypot(wk.x, wk.z),
      wV = Math.atan2(ww, wk.y),
      wD = ww > 1e-9 ? (wk.z / ww) * wV : 0,
      wm = ww > 1e-9 ? (wk.x / ww) * wV : 0,
      wS = gr(wD, wm).invert().multiply(w9),
      wE = 2 * Math.atan2(wS.y, wS.w);
    ((wE -= 2 * Math.PI * Math.round((wE - w7) / (2 * Math.PI))),
      (w7 = wE),
      w6.fwd.push(wD * oo),
      w6.side.push(wm * oo),
      w6.twist.push(wE * oo),
      (w6.wide = Math.max(w6.wide, wV * oo)));
  }
  return w6;
}
function Xl(w3) {
  let w4 = wa.clone().applyQuaternion(w3),
    w5 = Math.hypot(w4.x, w4.z),
    w6 = Math.atan2(w5, w4.y),
    w7 = w5 > 1e-9 ? (w4.z / w5) * w6 : 0,
    w8 = w5 > 1e-9 ? (w4.x / w5) * w6 : 0,
    w9 = gr(w7, w8).invert().multiply(w3),
    wk = 2 * Math.atan2(w9.y, w9.w);
  return (
    wk > Math.PI ? (wk -= 2 * Math.PI) : wk < -Math.PI && (wk += 2 * Math.PI),
    { fwd: w7 * oo, side: w8 * oo, twist: wk * oo }
  );
}
var Kl = ({ fwd: w3 = 0, side: w4 = 0, twist: w5 = 0 }) =>
    gr(w3 / oo, w4 / oo).multiply(new kO().setFromAxisAngle(wa, w5 / oo)),
  Ql = (w3) => new kO(w3.x, -w3.y, -w3.z, w3.w),
  Dn = (w3) => new kf(-w3.x, w3.y, w3.z);
function yr(w3, w4, w5) {
  let w6 = Ql(w4).invert().multiply(w5);
  return w6.clone().invert().multiply(Ql(w3)).multiply(w6);
}
function ki({ mid: w3, fwd: w4, side: w5, twist: w6 }) {
  return w4.map((w7, w8) =>
    gr(w4[w8] / oo, w5[w8] / oo)
      .multiply(new kO().setFromAxisAngle(wa, w6[w8] / oo))
      .multiply(w3),
  );
}
function wr(w3, w4, w5, w6) {
  let w7 = [];
  w3.traverse((wD) => {
    wD.isBone && w7.push(wD);
  });
  let w8 = w7.map((wD) => [wD, wD.position.clone(), wD.quaternion.clone(), wD.scale.clone()]),
    w9 = w4.tracks
      .map((wD) => {
        let { nodeName: wm, propertyName: wS } = kK.parseTrackName(wD.name),
          wE = w3.getObjectByName(wm);
        return wE && ['position', 'quaternion', 'scale'].includes(wS)
          ? { b: wE, prop: wS, at: wD.createInterpolant() }
          : null;
      })
      .filter(Boolean),
    wk = w3.getObjectByName('root'),
    ww = w5.map((wD) => w3.getObjectByName(wD)),
    wV = ww.map((wD) => (wD ? { turns: [], places: [] } : null));
  for (let wD of w6) {
    for (let [wS, wE, wF, wC] of w8)
      (wS.position.copy(wE), wS.quaternion.copy(wF), wS.scale.copy(wC));
    for (let wH of w9) wH.b[wH.prop].fromArray(wH.at.evaluate(wD));
    w3.updateMatrixWorld(!0);
    let wm = wk ? wk.getWorldPosition(new kf()) : new kf();
    ww.forEach((we, wR) => {
      we &&
        (wV[wR].turns.push(we.getWorldQuaternion(new kO())),
        wV[wR].places.push(we.getWorldPosition(new kf()).sub(wm)));
    });
  }
  return wV;
}
function bi(w3, w4, w5) {
  let w6 = w4.clone().addScaledVector(w3, -w4.dot(w3)),
    w7 = w5.clone().addScaledVector(w3, -w5.dot(w3));
  return w6.lengthSq() < 1e-12 || w7.lengthSq() < 1e-12
    ? 0
    : Math.atan2(w3.dot(new kf().crossVectors(w6, w7)), w6.dot(w7));
}
function vr(w3, w4, w5, w6) {
  let w7 = (wm, wS) =>
      w3.map((wE, wF) =>
        w4[wF].clone().addScaledVector(wm.clone().applyQuaternion(wE), wS).sub(w5[wF]),
      ),
    w8 = w3.map((wm) => w6.axis.clone().applyQuaternion(wm)),
    w9 = w8.reduce((wm, wS) => wm.add(wS), new kf()).normalize(),
    wk = Math.abs(w9.y) > 0.8 ? new kf(0, 0, 1) : wa.clone(),
    ww = (wm, wS) => bi(wS, wk, w6.square.clone().applyQuaternion(wm)),
    wV = 0,
    wD =
      w6.roll !== 'curve'
        ? null
        : w3.map((wm, wS) => {
            let wE = ww(wm, w8[wS]);
            return (
              (wE -= 2 * Math.PI * Math.round((wE - wV) / (2 * Math.PI))),
              (wV = wE),
              wE * oo
            );
          });
  return {
    tgt: w7(w6.axis, w6.dist),
    up: w6.roll === 'up' ? w7(w6.upAxis, w6.upDist) : null,
    rolls: wD,
    rollOf: ww,
  };
}
var ju = (w3) => w3 - Math.floor(w3);
function xi(w3, w4, w5 = !0) {
  let w6 = (w4 ? -1 : 1) * (w3.mirror && w3.flip ? -1 : 1);
  return {
    ...w3,
    keys: (w3.keys ?? []).map((w7) => ({
      ...w7,
      u: w3.mirror || !w5 ? w7.u : ju(w7.u + 0.5),
      dv: w6 * w7.dv,
      ...(w7.tin != null ? { tin: w6 * w7.tin } : {}),
      ...(w7.tout != null ? { tout: w6 * w7.tout } : {}),
    })),
  };
}
var zn = (w3) =>
    !!w3 &&
    (!!w3.late ||
      !!w3.step ||
      (w3.amount ?? 1) !== 1 ||
      (w3.keys ?? []).some(
        (w4) => w4.du || w4.dv || w4.tin != null || w4.tout != null || w4.type === 'vector',
      )),
  gt = Math.PI / 180,
  Ct = new kf(0, 1, 0),
  Qo = (w3) => new kO().setFromAxisAngle(Ct, w3),
  fn = (w3) => Math.min(Math.max(w3, 0), 1),
  qt = (w3) => {
    let w4 = fn(w3);
    return w4 * w4 * (3 - 2 * w4);
  },
  Yn = (w3, w4) => {
    let w5 = [...w3].sort((w6, w7) => w6 - w7);
    return w5[Math.min(w5.length - 1, Math.floor(w5.length * w4))];
  },
  Zl = (w3) => {
    let w4 = Ct.clone().applyQuaternion(w3),
      w5 = Math.hypot(w4.x, w4.z);
    return w5 > 1e-9
      ? new kf(w4.x / w5, 0, w4.z / w5).multiplyScalar(Math.atan2(w5, w4.y))
      : new kf();
  },
  En = (w3) => {
    let w4 = w3.length();
    return w4 > 1e-9
      ? new kO().setFromAxisAngle(new kf().crossVectors(Ct, w3).normalize(), w4)
      : new kO();
  },
  kr = (w3) => {
    let w4 = 0;
    for (let w5 = w3.parent; w5; w5 = w5.parent) w4++;
    return w4;
  },
  Jl = (w3, w4) => {
    for (let w5 = w3; w5; w5 = w5.parent) if (w5 === w4) return !0;
    return !1;
  };
function ec({
  rig: w3,
  controls: w4,
  trunk: w5,
  limbs: w6,
  limbsOK: w7,
  hips: w8,
  standing: w9,
  M: wk,
  halfOn: ww,
  sides: wV,
  sideName: wD = (wH, we) => wH + '_' + we,
}) {
  let wm = [],
    wS = [];
  for (let wH of w4 ?? [])
    (!wH.kind || wH.kind === 'bone') &&
      (wH.sided ? wV : [null]).forEach((we) =>
        wH.bones.forEach((wR, wQ) => {
          let wj = w3.getObjectByName(we ? wD(wR, we) : wR),
            wz = w5.indexOf(wj),
            wp = w7 ? w6.findIndex((wK) => wK.includes(wj)) : -1;
          if (!wj || (wz < 0 && wp < 0)) return;
          let wO = {},
            wf = {};
          for (let wK of [...pr, ...(wj === w8 ? [] : jn)]) {
            let wT = wH.channels?.[wK.key];
            if (!wT) continue;
            let wA = {
              ...(we === wV[1] ? xi(wT, wK.flip, ww) : wT),
              late: ((wT.late ?? 0) + wQ * (wT.step ?? 0)) / wk,
            };
            zn(wA) && ((wK.axis ? wf : wO)[wK.key] = wA);
          }
          let wJ = wH.pose?.rot ? new kO(...wH.pose.rot).normalize() : null,
            wZ = wH.pose?.loc && wj !== w8 ? new kf(...wH.pose.loc) : null;
          if (wJ && we === wV[1]) {
            let wn = w3.getObjectByName(wD(wR, wV[0]));
            wJ = wn ? yr(wJ, w9.get(wn), w9.get(wj)) : wJ;
          }
          (wZ && we === wV[1] && (wZ = Dn(wZ)),
            wJ && Math.abs(wJ.w) > 1 - 1e-10 && (wJ = null),
            wZ && wZ.lengthSq() < 1e-14 && (wZ = null));
          let wU = { b: wj, name: wj.name, j: wz, si: wp, li: wp < 0 ? -1 : w6[wp].indexOf(wj) };
          ((Object.keys(wO).length || wJ) && wm.push({ ...wU, chans: wO, turn: wJ }),
            (Object.keys(wf).length || wZ) && wS.push({ ...wU, locs: wf, shift: wZ }));
        }),
      );
  let wE = wm.some((we) => we.si >= 0);
  wS.sort((we, wR) => kr(we.b) - kr(wR.b));
  let wF = [];
  for (let we of w4 ?? [])
    we.kind === 'aim' &&
      (we.sided ? wV : [null]).forEach((wR) => {
        let wQ = w3.getObjectByName(wR ? wD(we.bones[0], wR) : we.bones[0]),
          wj = we.space ? w3.getObjectByName(we.space) : null;
        if (!wQ?.isBone) return;
        let wz = {};
        for (let wO of hr(we.roll)) {
          let wf = we.channels?.[wO.key];
          if (!wf) continue;
          let wJ = { ...(wR === wV[1] ? xi(wf, wO.flip, ww) : wf), late: (wf.late ?? 0) / wk };
          zn(wJ) && (wz[wO.key] = wJ);
        }
        let wp = we.upAxis && we.upAxis[1] !== (we.axis ?? '+y')[1] ? we.upAxis : xn(we.axis);
        wF.push({
          b: wQ,
          name: wQ.name,
          axis: Uo(we.axis),
          dist: we.distance ?? 0.5,
          roll: we.roll ?? 'none',
          square: Uo(xn(we.axis)),
          upAxis: Uo(wp),
          upDist: we.upDistance ?? 0.3,
          space: wj?.isBone && !Jl(wj, wQ) ? wj : null,
          chans: wz,
        });
      });
  wF.sort((wR, wQ) => kr(wR.b) - kr(wQ.b));
  let wC = [];
  for (let wR of w4 ?? [])
    if (wR.kind === 'pin') {
      let wQ = wV.indexOf(wR.hand),
        wj = wR.to ? w3.getObjectByName(wR.to) : null;
      if (!w7 || wQ < 0) continue;
      let wz = {};
      for (let wp of In) {
        let wO = wR.channels?.[wp.key];
        if (!wO) continue;
        let wf = { ...wO, late: (wO.late ?? 0) / wk };
        zn(wf) && (wz[wp.key] = wf);
      }
      wC.push({
        si: wQ,
        name: w6[wQ][3].name,
        arm: w6[wQ],
        hand: w6[wQ][3],
        to: wj?.isBone && !Jl(wj, w6[wQ][0]) ? wj : null,
        chans: wz,
      });
    }
  return (
    wC.sort(
      (wJ, wZ) =>
        (w6.some((wU) => wU.includes(wJ.to)) ? 1 : 0) -
        (w6.some((wU) => wU.includes(wZ.to)) ? 1 : 0),
    ),
    { ctl: wm, placed: wS, aims: wF, pins: wC, limbed: wE }
  );
}
function tc({
  S: w3,
  ctl: w4,
  placed: w5,
  aims: w6,
  pins: w7,
  trunk: w8,
  limbs: w9,
  limbsOK: wk,
  sides: ww,
  laidOn: wV,
  Lh: wD,
  Fh: wm,
}) {
  let wS = null;
  if (w4.length) {
    for (let wH of w3) wH.hipsQ = wH.trunkQ[0];
    let wF = new Map();
    for (let we of w4) {
      let wR = w3.map((wO) => (we.j >= 0 ? wO.trunkQ[we.j] : wO.limbQ[we.si][we.li + 1])),
        wQ = wF.get(we.name) ?? wR,
        wj = Object.keys(we.chans).length ? va(wQ) : { wide: 0 };
      for (let wO of Object.keys(we.chans)) wj[wO] = wV(wj[wO], we.chans[wO]);
      let wz = wj.mid ? ki(wj) : wQ;
      (we.turn && (wz = wz.map((wf) => wf.clone().multiply(we.turn))), wF.set(we.name, wz));
      let wp = Math.max(...wz.map((wf, wJ) => wf.angleTo(wR[wJ]))) / gt;
      !wS || wp > wS.far
        ? (wS = { far: wp, bone: we.name, wide: Math.max(wS?.wide ?? 0, wj.wide) })
        : (wS.wide = Math.max(wS.wide, wj.wide));
    }
    let wC = [];
    (w8.forEach((wf, wJ) => {
      let wZ = wF.get(wf.name);
      wC.push(
        w3.map((wU, wK) => {
          if (wZ) {
            let wA = wZ[wK].clone().multiply(wU.trunkQ[wJ].clone().invert());
            return ((wU.trunkQ[wJ] = wZ[wK]), wA);
          }
          let wT = wJ ? wC[wJ - 1][wK] : null;
          return (wT && (wU.trunkQ[wJ] = wT.clone().multiply(wU.trunkQ[wJ])), wT);
        }),
      );
    }),
      ww.forEach((wf, wJ) => {
        if (!wk) return;
        let wZ = w8.indexOf(w9[wJ][0].parent),
          wU = wZ >= 0 ? wC[wZ] : w3.map(() => null);
        if (!w4.some((wT) => wT.si === wJ)) {
          w3.forEach((wT, wA) => {
            wU[wA] && wT.armQ[wJ] && (wT.armQ[wJ] = wU[wA].clone().multiply(wT.armQ[wJ]));
          });
          return;
        }
        for (let wT = 0; wT < 4; wT++) {
          let wA = wF.get(w9[wJ][wT].name),
            wn = wU;
          wU = w3.map((wo, wX) => {
            let wL = wo.limbQ[wJ][wT + 1];
            return wA
              ? ((wo.limbQ[wJ][wT + 1] = wA[wX]), wA[wX].clone().multiply(wL.clone().invert()))
              : (wn[wX] && (wo.limbQ[wJ][wT + 1] = wn[wX].clone().multiply(wL)), wn[wX]);
          });
        }
        let wK = (wo, wX) => wo.clone().invert().multiply(wX);
        for (let wo of w3) {
          let [wX, wL, wb, wx, wy] = wo.limbQ[wJ];
          (((wo.limb ??= [])[wJ] = [
            wK(wZ >= 0 ? wo.trunkQ[wZ] : wX, wL),
            wK(wL, wb),
            wK(wb, wx),
            wK(wx, wy),
          ]),
            (wo.armQ[wJ] = wb),
            wo.foreQ && (wo.foreQ[wJ] = wo.limb[wJ][2].clone()));
        }
      }));
  }
  let wE = null;
  for (let wf of w5) {
    let wJ = wf.shift
        ? new kf()
            .addScaledVector(wD, wf.shift.x)
            .addScaledVector(Ct, wf.shift.y)
            .addScaledVector(wm, wf.shift.z)
        : null,
      wZ = w3.map(() => (wJ ? wJ.clone() : new kf()));
    for (let wT of jn) {
      let wA = wf.locs[wT.key],
        wn = wT.axis === 'x' ? wD : wT.axis === 'z' ? wm : Ct;
      if (!wA) continue;
      let wo = w3.map((wX) => wX.at0.get(wf.b)[wT.axis]);
      wV(wo, wA).forEach((wX, wL) => wZ[wL].addScaledVector(wn, wX - wo[wL]));
    }
    let wU = w5.find((wX) => wX.b === wf.b && wX.off);
    wU ? (wU.off.forEach((wX, wL) => wX.add(wZ[wL])), (wf.skip = !0)) : (wf.off = wZ);
    let wK = Math.max(...(wU ?? wf).off.map((wX) => wX.length()));
    (!wE || wK > wE.far) && (wE = { far: wK, bone: wf.name });
  }
  for (let wX of w6) {
    let wL = w3.map((wy) => wy.aim.get(wX)),
      wb = vr(
        wL.map((wy) => wy.q),
        wL.map((wy) => wy.p),
        wL.map((wy) => wy.sp),
        wX,
      ),
      wx = (wy, wW) => {
        for (let [wq, wP] of wW)
          wX.chans[wq] &&
            wV(
              wy.map((wY) => wY[wP]),
              wX.chans[wq],
            ).forEach((wY, wv) => {
              wy[wv][wP] = wY;
            });
        return wy;
      };
    ((wX.tgt = wx(wb.tgt, [
      ['aimX', 'x'],
      ['aimY', 'z'],
      ['aimZ', 'y'],
    ])),
      (wX.up =
        wb.up &&
        wx(wb.up, [
          ['upX', 'x'],
          ['upY', 'z'],
          ['upZ', 'y'],
        ])),
      (wX.rollOf = wb.rollOf),
      (wX.rolls = wb.rolls && wX.chans.roll ? wV(wb.rolls, wX.chans.roll) : wb.rolls));
  }
  for (let wy of w7) {
    let wW = w3.map((wP) => wP.pin.get(wy)),
      wq = mr(
        wW.map((wP) => wP.q),
        wW.map((wP) => wP.p),
        wW.map((wP) => wP.sq),
        wW.map((wP) => wP.sp),
      );
    for (let wP of In) {
      let wY = wy.chans[wP.key];
      if (wY) {
        if (wP.turn) wq[wP.turn] = wV(wq[wP.turn], wY);
        else {
          if (!wP.hold) {
            let wv = wy.to ? wP.own : wP.axis;
            wV(
              wq.loc.map((wB) => wB[wv]),
              wY,
            ).forEach((wB, wG) => {
              wq.loc[wG][wv] = wB;
            });
          }
        }
      }
    }
    ((wy.loc = wq.loc),
      (wy.rot = ki(wq)),
      (wy.hold = (
        wy.chans.hold
          ? wV(
              w3.map(() => 1),
              wy.chans.hold,
            )
          : w3.map(() => 1)
      ).map(fn)));
  }
  return { spun: wS, shifted: wE };
}
var oc = (w3, w4) =>
  Array.from({ length: w4 }, (w5, w6) => w3.slice(0, w6 + 1).reduce((w7, w8) => w7 + w8, 0));
function nc(w3, { posture: w4, spine: w5, c: w6, Fh: w7, Lh: w8 }) {
  let w9 = w4 && (w4.forward || w4.side || w4.twist) ? w4 : null;
  if (!w9) return { body: w3, bent: w9 };
  let wk = oc(w5, w6),
    ww = w7
      .clone()
      .multiplyScalar((w9.forward ?? 0) * gt)
      .addScaledVector(w8, (w9.side ?? 0) * gt),
    wV = (w9.twist ?? 0) * gt,
    wD = (wm, wS) => (wm === 0 ? 0 : wm <= w6 ? wk[wm - 1] : w9.head ? (wm === wS ? 0 : 0.5) : 1);
  return {
    body: w3.map((wm) =>
      wm.map((wS, wE) => {
        let wF = wD(wE, wm.length - 1);
        return wF
          ? En(ww.clone().multiplyScalar(wF))
              .multiply(Qo(wV * wF))
              .multiply(wS)
          : wS;
      }),
    ),
    bent: w9,
  };
}
function Ei(w3, w4, w5, { fps: w6, one: w7, K: w8, M: w9 }) {
  let wk = 2 * Math.PI * w4,
    ww = 4,
    wV = 1 / w6 / ww,
    wD = w3[0].clone(),
    wm = new kf(),
    wS = w3.map(() => null);
  if (w7) {
    wS[0] = wD.clone();
    for (let wE = 0; wE < w8 - 1; wE++) {
      for (let wF = 0; wF < ww; wF++) {
        let wC = w3[wE]
          .clone()
          .lerp(w3[wE + 1], (wF + 1) / ww)
          .sub(wD)
          .multiplyScalar(wk * wk)
          .addScaledVector(wm, -2 * w5 * wk);
        (wm.addScaledVector(wC, wV), wD.addScaledVector(wm, wV));
      }
      wS[wE + 1] = wD.clone();
    }
    return wS;
  }
  for (let wH = 0; wH < 6; wH++)
    for (let we = 0; we < w9; we++) {
      for (let wR = 0; wR < ww; wR++) {
        let wQ = w3[we]
          .clone()
          .lerp(w3[(we + 1) % w9], (wR + 1) / ww)
          .sub(wD)
          .multiplyScalar(wk * wk)
          .addScaledVector(wm, -2 * w5 * wk);
        (wm.addScaledVector(wQ, wV), wD.addScaledVector(wm, wV));
      }
      wS[(we + 1) % w9] = wD.clone();
    }
  return wS;
}
function ac(
  w3,
  {
    Ft: w4,
    over: w5,
    over0: w6,
    spine: w7,
    c: w8,
    lever: w9,
    L0: wk,
    F0: ww,
    Lh: wV,
    Fh: wD,
    loop: wm,
  },
) {
  if (!w4) return { body: w3, armTip: null, followed: null };
  let { K: wS } = wm,
    wE = w6.reduce((wf, wJ) => wf.add(wJ), new kf()).divideScalar(wS),
    wF = w5.map((wf, wJ) =>
      wf.clone().sub(w6[wJ]).addScaledVector(w6[wJ].clone().sub(wE), w4.loosen),
    );
  if (!wF.some((wf) => wf.lengthSq() > 1e-12)) return { body: w3, armTip: null, followed: null };
  let wC = 5 + (0.9 - 5) * fn(w4.lag),
    wH = 1 + (0.2 - 1) * fn(w4.bounce),
    we = Ei(wF, wC, wH, wm),
    wR = Ei(we, wC * 1.3, wH, wm),
    wQ = Ei(we, wC * 0.8, wH * 0.8, wm),
    wj = (wf, wJ, wZ) =>
      new kf()
        .addScaledVector(wV, (2 * wf.dot(wk)) / wJ)
        .addScaledVector(wD, (2 * wf.dot(ww) - wZ * wf.y) / wJ),
    wz = oc(w7, w8),
    wp = 0,
    wO = [];
  return {
    body: w3.map((wf, wJ) => {
      let wZ = wj(we[wJ].clone().sub(wF[wJ]), w9.chest, 1.5).multiplyScalar(w4.amount * w4.chest),
        wU = wj(wR[wJ].clone().sub(we[wJ]), w9.head * 2, 1).multiplyScalar(w4.amount * w4.head);
      return (
        wO.push(wj(wQ[wJ].clone().sub(we[wJ]), w9.arm, 0).multiplyScalar(-w4.amount * w4.arms)),
        (wp = Math.max(wp, wZ.length())),
        wf.map((wK, wT) =>
          wT === 0
            ? wK
            : En(
                wZ
                  .clone()
                  .multiplyScalar(wT <= w8 ? wz[wT - 1] : 1)
                  .addScaledVector(wU, wT <= w8 ? 0 : wT === wf.length - 1 ? 1 : 0.5),
              ).multiply(wK),
        )
      );
    }),
    armTip: wO,
    followed: { chest: wp / gt, arms: Math.max(...wO.map((wf) => wf.length())) / gt },
  };
}
function Mi(w3, w4) {
  let w5 = qt(2 * w3.w - 1),
    w6 = new kf(w3.O.x, 0, w3.O.z),
    w7 = w6.lengthSq() > 1e-10 ? Math.min(w4.dot(w6.normalize()), 0) * w5 : 0;
  if (w7 > -1e-7) return { A: w3.A.clone().add(w4), turn: null };
  let w8 = w6.multiplyScalar(w7),
    w9 = w3.A.clone().add(w4).sub(w8),
    wk = w9.clone().add(w3.O).add(w8),
    ww = w9.clone().sub(wk),
    wV = w3.O.length();
  if (ww.length() >= wV || ww.lengthSq() < 1e-10) return { A: w3.A.clone().add(w4), turn: null };
  let wD = wk.clone().addScaledVector(ww.normalize(), wV);
  return {
    A: wD,
    turn: new kO().setFromUnitVectors(w3.O.clone().normalize(), wk.sub(wD).normalize()),
  };
}
function rc({ fr: w3, down: w4, heelUp: w5, toeUp: w6, top: w7, L: w8, reach: w9, loop: wk }) {
  let { one: ww, K: wV, M: wD, travel: wm, opens: wS, closes: wE } = wk,
    wF = ww ? (wf) => Math.min(Math.max(wf, 0), wV - 1) : (wf) => ((wf % wD) + wD) % wD,
    wC = w3.map(() => new kf());
  if (!w8 || w8.amount <= 0 || !w4.some((wf) => wf) || (!ww && w4.every((wf) => wf))) return wC;
  let wH = (wf) =>
      ww ? w3[wF(wf)].A.clone() : w3[wF(wf)].A.clone().addScaledVector(wm, Math.floor(wf / wD)),
    we = (wf, wJ) => wH(wf).addScaledVector(w3[wF(wf)].O, wJ),
    wR = Math.max(
      Yn(
        w3.map((wf, wJ) => wH(wJ + 1).distanceTo(wH(wJ - 1)) / 2),
        0.9,
      ),
      1e-9,
    ),
    wQ = w3.map((wf, wJ) => {
      if (!w4[wJ]) return 0;
      let wZ = ((1 - wf.w) * w5[wJ]) / w7.heel + (wf.w * w6[wJ]) / w7.toe,
        wU = 1 - qt((wZ - w8.FLOOR) / (w8.CLEAR - w8.FLOOR)),
        wK =
          1 -
          qt(
            (we(wJ + 1, wf.w).distanceTo(we(wJ - 1, wf.w)) / 2 / wR - w8.STILL) /
              (w8.MOVING - w8.STILL),
          );
      return wU * (wK + (1 - wK) * w8.grip);
    }),
    wj = ww ? -1 : w4.findIndex((wf) => !wf),
    wz = ww ? wV : wD,
    wp = [];
  for (let wf = 1, wJ = null; wf <= wz + 1; wf++) {
    let wZ = wj + wf;
    if (wf <= wz && w4[wF(wZ)]) {
      if (!wJ) wJ = { a: wZ, c: [new kf()] };
      else {
        let wU = (w3[wF(wZ - 1)].w + w3[wF(wZ)].w) / 2,
          wK = we(wZ, wU)
            .sub(we(wZ - 1, wU))
            .setY(0),
          wT = wJ.c[wJ.c.length - 1]
            .clone()
            .addScaledVector(wK, -Math.min(wQ[wF(wZ - 1)], wQ[wF(wZ)])),
          wA = w3[wF(wZ)],
          wn = (wo) => Mi(wA, wT.clone().multiplyScalar(wo)).A.distanceTo(wA.hip) > w9;
        if (wT.lengthSq() > 1e-12 && wn(1)) {
          let wo = 0,
            wX = 1;
          for (let wL = 0; wL < 14; wL++) {
            let wb = (wo + wX) / 2;
            wn(wb) ? (wX = wb) : (wo = wb);
          }
          wT.multiplyScalar(wo);
        }
        wJ.c.push(wT);
      }
      wJ.b = wZ;
    } else wJ && (wp.push(wJ), (wJ = null));
  }
  if (ww)
    for (let wx of wp) {
      if (!(wE && wx.b === wV - 1)) continue;
      let wy = wx.c[wx.c.length - 1].clone(),
        wW = wS && wx.a === 0;
      wx.c.forEach((wq, wP) =>
        wq.addScaledVector(wy, wW ? -qt(wP / Math.max(wx.c.length - 1, 1)) : -1),
      );
    }
  let wO = wC;
  if (ww && wp.length && wp[0].a > 0) {
    let wq = wp[0],
      wP = [0];
    for (let wY = 1; wY <= wq.a; wY++) wP.push(wP[wY - 1] + wH(wY).distanceTo(wH(wY - 1)));
    for (let wv = 0; wv < wq.a; wv++)
      wO[wv].copy(wq.c[0]).multiplyScalar(wP[wv] / Math.max(wP[wq.a], 1e-9));
  }
  wp.forEach((wB, wG) => {
    wB.c.forEach((V2, V3) => wO[wF(wB.a + V3)].copy(V2));
    let wg = ww && wG + 1 === wp.length,
      wI = wg ? null : wp[(wG + 1) % wp.length],
      wh = wg ? wV - 1 : wI.a + (wG + 1 === wp.length ? wD : 0),
      wN = wB.c[wB.c.length - 1],
      wM = wg ? new kf() : wI.c[0],
      V0 = [0];
    for (let V2 = wB.b + 1; V2 <= wh; V2++)
      V0.push(V0[V0.length - 1] + wH(V2).distanceTo(wH(V2 - 1)));
    let V1 = Math.max(V0[V0.length - 1], 1e-9);
    for (let V3 = wB.b + 1; V3 < wh + (wg ? 1 : 0); V3++)
      wO[wF(V3)].copy(wN).lerp(wM, V0[V3 - wB.b] / V1);
  });
  for (let wB of wO) wB.multiplyScalar(w8.amount);
  return wO;
}
function ic({ hipsAt: w3, legs: w4, floor: w5, Rc: w6, limitAt: w7, loop: w8 }) {
  let { fps: w9, K: wk, mod: ww } = w8,
    wV = Object.entries(w4),
    wD = 0,
    wm = 0,
    wS = new kf(w6.side ? 1 : 0, w6.down ? 1 : 0, w6.side ? 1 : 0),
    wE = Object.fromEntries(
      wV.map(([wp, wO]) => [
        wp,
        wO.feet.map((wf, wJ) => {
          let wZ = wf.w,
            wU = ((1 - wZ) * wO.heelUp[wJ]) / w5.top.heel + (wZ * wO.toeUp[wJ]) / w5.top.toe;
          return wO.down[wJ] ? 1 - qt((wU - w5.FLOOR) / (w5.CLEAR - w5.FLOOR)) : 0;
        }),
      ]),
    ),
    wF = (wp, wO) => w4[wp].feet[wO].A.clone().sub(w4[wp].feet[wO].socket),
    wC = w3.map((wp, wO) =>
      Object.fromEntries(
        wV.map(([wf, wJ]) => {
          let wZ = w3[wO].distanceTo(wF(wf, wO)),
            wU = wJ.reachAt ? wJ.reachAt(wO) : w7(wO, w6.limit) * wJ.limb;
          return [wf, wZ > wU ? wU + (1 - wE[wf][wO]) * (wZ - wU) : wU];
        }),
      ),
    ),
    wH = (wp, wO) => {
      let wf = wO.clone();
      for (let wJ = 0; wJ < 24; wJ++) {
        let wZ = !1;
        for (let [wU] of wV) {
          if (wE[wU][wp] <= 0) continue;
          let wK = wf.clone().sub(wF(wU, wp)),
            wT = wK.length(),
            wA = wT - wC[wp][wU];
          if (wA <= 0.000001) continue;
          let wn = wK.multiplyScalar(1 / wT).multiply(wS),
            wo = wn.lengthSq();
          wo < 0.02 || (wf.addScaledVector(wn, -wA / wo), (wZ = !0));
        }
        if (!wZ) break;
      }
      return wf;
    },
    we = w3.map((wp, wO) => wH(wO, w3[wO]).sub(w3[wO])),
    wR = Math.max(2, Math.round(w6.spread * w9)),
    wQ = (wp) => 0.5 * (1 + Math.cos((Math.PI * wp) / (wR + 1))),
    wj = w3.map(() => new kf());
  for (let wp of ['x', 'y', 'z'])
    for (let wO of [1, -1])
      for (let wf = 0; wf < wk; wf++) {
        let wJ = 0;
        for (let wZ = -wR; wZ <= wR; wZ++)
          wJ = Math.max(wJ, Math.max(wO * we[ww(wf + wZ)][wp], 0) * wQ(wZ));
        wj[wf][wp] += wO * wJ;
      }
  let wz = w3.map((wU, wK) =>
    wH(wK, w3[wK].clone().add(wj[wK])).sub(w3[wK]).multiplyScalar(w6.amount),
  );
  return (
    wz.forEach((wU, wK) => {
      ((wD = Math.max(wD, wU.length())), (wm = Math.max(wm, wU.distanceTo(wz[ww(wK - 1)]))));
    }),
    { hipsAt: w3.map((wU, wK) => wU.clone().add(wz[wK])), reached: wD, jump: wm }
  );
}
function sc(w3, w4) {
  let w5 = [];
  w3.traverse((w9) => {
    w9.isBone && w5.push(w9);
  });
  let w6 = w5.map((w9) => [w9, w9.position.clone(), w9.quaternion.clone(), w9.scale.clone()]),
    w7 = w4.tracks
      .map((w9) => {
        let { nodeName: wk, propertyName: ww } = kK.parseTrackName(w9.name),
          wV = w3.getObjectByName(wk);
        return wV && ['position', 'quaternion', 'scale'].includes(ww)
          ? { b: wV, prop: ww, at: w9.createInterpolant() }
          : null;
      })
      .filter(Boolean),
    w8 = () => {
      for (let [w9, wk, ww, wV] of w6)
        (w9.position.copy(wk), w9.quaternion.copy(ww), w9.scale.copy(wV));
    };
  return {
    bones: w5,
    rest: w6,
    channels: w7,
    sourceAt: (w9) => {
      w8();
      for (let wk of w7) wk.b[wk.prop].fromArray(wk.at.evaluate(w9));
      w3.updateMatrixWorld(!0);
    },
    atRest: () => {
      (w8(), w3.updateMatrixWorld(!0));
    },
  };
}
var Iu = Object.freeze({
  places: ['ankle', 'ball'],
  numbers: ['heelUp', 'toeUp'],
  turns: ['footQ'],
  ways: ['knee'],
  kept: ['hip'],
});
function lc({
  S: w3,
  reading: w4,
  fixed: w5,
  ground: w6 = 0,
  start: w7,
  M: w8,
  sides: w9,
  foot: wk = Iu,
}) {
  let ww = w4.N,
    wV = Object.fromEntries(w9.map((wC) => [wC, 0])),
    wD = null;
  if (!w9.every((wC) => w4.feet[wC].stances.length)) return { clocks: wD, more: wV };
  let wm = w3.map((wC) => Object.fromEntries(w9.map((wH) => [wH, wC[wH]]))),
    wS = (wC) => ((wC % w8) + w8) % w8,
    wE = (wC) => w4.travelD.clone().multiplyScalar(Math.floor(wC / w8)),
    wF = (wC) => {
      let wH = w5(wC);
      return wH?.keys?.some((we) => we.lock)
        ? wH
        : {
            keys: w4.feet[wC].stances.flatMap((we) => [
              { u: (we.land / ww) % 1, du: 0, dv: 0, lock: !0, kind: 'land' },
              { u: ((we.land + we.frames) / ww) % 1, du: 0, dv: 0, lock: !0, kind: 'lift' },
            ]),
          };
    };
  for (let wC of w9) {
    let wH = w4.feet[wC].stances,
      we = wH.reduce((wj, wz) => wj + wz.frames, 0) / ww / wH.length,
      wR = 1 / wH.length - we;
    wV[wC] = Math.min(Math.max(w6, -0.6 * we), 0.6 * wR);
    let wQ = Nt(fr(wF(wC), wV[wC]));
    wQ.moved &&
      (((wD ??= {})[wC] = wQ.from),
      w3.forEach((wj, wz) => {
        let wp = w7 / ww + wz / w8,
          wO = wQ.from(wp),
          wf = wz + (wO - wp) * w8,
          wJ = Math.floor(wf),
          wZ = wf - wJ,
          wU = wm[wS(wJ)][wC],
          wK = wm[wS(wJ + 1)][wC],
          wT = (wL, wb, wx, wy) =>
            wb +
            0.5 *
              wZ *
              (wx - wL + wZ * (2 * wL - 5 * wb + 4 * wx - wy + wZ * (3 * (wb - wx) + wy - wL))),
          wA = (wL) => [-1, 0, 1, 2].map((wb) => wm[wS(wJ + wb)][wC][wL]),
          wn = (wL) => wT(...wA(wL)),
          wo = (wL) => {
            let [wb, wx, wy, wW] = wA(wL).map((wq, wP) => wq.clone().add(wE(wJ + wP - 1)));
            return new kf(
              wT(wb.x, wx.x, wy.x, wW.x),
              wT(wb.y, wx.y, wy.y, wW.y),
              wT(wb.z, wx.z, wy.z, wW.z),
            );
          },
          wX = {};
        for (let wL of wk.places) wX[wL] = wo(wL);
        for (let wb of wk.kept) wX[wb] = wm[wz][wC][wb];
        for (let wx of wk.turns) wX[wx] = wU[wx].clone().slerp(wK[wx], wZ);
        for (let wy of wk.ways) wX[wy] = wU[wy].clone().lerp(wK[wy], wZ).normalize();
        for (let wW of wk.numbers) wX[wW] = wn(wW);
        ((wX.down = (wZ < 0.5 ? wU : wK).down),
          (wj[wC] = wX),
          ((wj.is ??= {})[wC] = ((Math.round(wO * ww) % ww) + ww) % ww));
      }));
  }
  return { clocks: wD, more: wV };
}
var fc = [
    { id: 'F', theta: 0 },
    { id: 'FL', theta: 45 },
    { id: 'L', theta: 90 },
    { id: 'BL', theta: 135 },
    { id: 'B', theta: 180 },
    { id: 'BR', theta: -135 },
    { id: 'R', theta: -90 },
    { id: 'FR', theta: -45 },
  ],
  ka = {
    45: { hips: 25, knees: 0.7, feet: 0.5, gap: 12, bulge: 1, stride: 1, lean: 1, swing: 1 },
    90: { hips: 45, knees: 0.7, feet: 0.5, gap: 12, bulge: 3, stride: 0.75, lean: 0.7, swing: 1 },
    135: { hips: 25, knees: 0.7, feet: 0.5, gap: 13, bulge: 1, stride: 0.85, lean: 0.3, swing: 1 },
    180: { hips: 0, knees: 0.7, feet: 0, gap: 14, bulge: 0, stride: 0.85, lean: 0, swing: 1 },
    spine: [0.25, 0.35, 0.4],
  },
  je = ['l', 'r'],
  cc = { amount: 1, chest: 1, head: 0.5, arms: 1, lag: 0.5, bounce: 0.4, loosen: 0 },
  uc = { amount: 1, hips: 1, chest: 0.5, head: 0, weight: 1, arms: 1 },
  dc = { amount: 1, limit: 0.995, down: !0, side: !0, give: 0.015, spread: 0.15 },
  br = { amount: 1, grip: 1, FLOOR: 0.04, CLEAR: 0.2, STILL: 0.05, MOVING: 0.25 },
  pn = { heel: 0.05, width: 0.09 },
  Du = { closed: 1, open: 3, speed: { 45: 0.7, 90: 0.5, 135: 0.55 }, quickest: 1.75 },
  pc = {
    unarmed: {
      side: { l: 'toward', r: 'toward' },
      toward: { hips: 67, chest: 0.8, hipSwing: 12, toes: [64, 72], kneesTo: [82, 60], stride: 1 },
      away: { hips: 67, chest: 0.8, hipSwing: 12, stride: 1 },
    },
    rifleWalk: {
      side: { l: 'away', r: 'toward' },
      toward: { hips: 28, chest: 0.2, hipSwing: 5, toes: [61, 26], kneesTo: [64, 39], stride: 0.8 },
      away: { hips: 22, chest: 0.1, hipSwing: 7, toes: [-16, -55], kneesTo: [-28, -49], stride: 1 },
    },
    rifleRun: {
      side: { l: 'away', r: 'toward' },
      toward: { hips: 57, chest: 0.63, hipSwing: 4, kneesTo: [84, 71], stride: 0.95 },
      away: { hips: 51, chest: 0.67, hipSwing: 5, kneesTo: [-65, -64], stride: 0.65 },
    },
  },
  hc = (w3) => ({
    hips: w3.hips / 2,
    chest: w3.chest,
    hipSwing: w3.hipSwing * 0.7,
    ...(w3.toes ? { toes: w3.toes.map((w4) => w4 / 2) } : {}),
    ...(w3.kneesTo ? { kneesTo: w3.kneesTo.map((w4) => w4 / 2) } : {}),
  });
function zu(w3, w4, w5) {
  let { P: w6, N: w7, dir: w8, left: w9 } = w4,
    wk = w6.ankle_l,
    ww = w6.ankle_r,
    wV = new Float32Array(w7),
    wD = new Float32Array(w7),
    wm = 0,
    wS = 0;
  for (let wJ = 0; wJ < w7; wJ++) {
    let wZ = wk[wJ * 3] - ww[wJ * 3],
      wU = wk[wJ * 3 + 2] - ww[wJ * 3 + 2];
    ((wV[wJ] = wZ * w9.x + wU * w9.z),
      (wD[wJ] = wZ * w8.x + wU * w8.z),
      (wm = Math.max(wm, Math.abs(wD[wJ]))),
      (wS += wV[wJ] / w7));
  }
  let { closed: wE, open: wF, speed: wC = 1, quickest: wH = Du.quickest } = w3.tactical,
    we = Math.sin(w5),
    wR = w3.stride ?? 1,
    wQ = w3.tactical.asked ?? wR,
    wj = (wK) => {
      let wT = 1 / 0,
        wA = -1 / 0;
      for (let wn = 0; wn < w7; wn++) {
        let wo = wV[wn] + wK * we * wD[wn];
        ((wT = Math.min(wT, wo)), (wA = Math.max(wA, wo)));
      }
      return [wT, wA];
    },
    wz = (wK) => {
      let [wT, wA] = wj(wK);
      return wA - wT <= wF - wE + 1e-9;
    },
    wp = wR;
  if (!wz(wR)) {
    let wK = 0,
      wT = wR;
    for (let wA = 0; wA < 30; wA++) {
      let wn = (wK + wT) / 2;
      wz(wn) ? (wK = wn) : (wT = wn);
    }
    wp = wK;
  }
  let wO = (wE - wj(wp)[0]) / 2,
    wf = Math.max(wp / Math.max(wC, 0.05), 1 / Math.max(wH, 0.1));
  return {
    stride: wp,
    asked: wQ,
    limited: wp < wQ - 0.000001,
    widen: wO,
    stance: wS + 2 * wO,
    amp: wm,
    closed: wE,
    open: wF,
    speed: wC,
    time: wf,
  };
}
function ba(w3) {
  let w4 = null;
  for (let w6 of w3.tracks) (!w4 || w6.times.length > w4.times.length) && (w4 = w6);
  let w5 = w4?.times.length ?? 0;
  return (w5 > 1 && Math.round((w5 - 1) / (w4.times[w5 - 1] - w4.times[0]))) || 30;
}
function mc(w3) {
  let w4 = w3.duration,
    w5 = w3.tracks.map((w6) => {
      let w7 = w6.times.length,
        w8 = w6.getValueSize(),
        w9 = new Float32Array(w7),
        wk = new Float32Array(w6.values.length);
      for (let ww = 0; ww < w7; ww++)
        ((w9[ww] = w4 - w6.times[w7 - 1 - ww]),
          wk.set(w6.values.subarray((w7 - 1 - ww) * w8, (w7 - ww) * w8), ww * w8));
      return new w6['constructor'](w6.name, w9, wk);
    });
  return new w2(w3.name + '_reversed', w4, w5);
}
function Ho(w3) {
  let {
      rig: w4,
      clip: w5,
      reading: w6,
      theta: w7,
      warp: w8 = w7,
      p: w9,
      spine: wk = ka.spine,
      name: ww,
      shift: wV = 0,
      fps: wD = ba(w3.clip),
      lock: wm = null,
      lean: wS = null,
      reach: wE = null,
      arms: wF = null,
      curves: wC = null,
      follow: wH = null,
      posture: wR = null,
      controls: wQ = null,
      shot: wj = !1,
      walk: wz = !0,
    } = w3,
    wp = !!wj;
  wp && ((wV = 0), wj === !0 && (wj = {}));
  let wO = !wp && wz !== !1,
    wf = (DP) => {
      let DY = w4.getObjectByName(DP);
      if (!DY) throw new Error('The rig has no ' + DP);
      return DY;
    },
    wJ = wf('root'),
    wZ = wf('pelvis'),
    wU = ['spine_01', 'spine_02', 'spine_03'].map(wf),
    wK = [wZ, ...wU, ...['neck_01', 'Head'].map((DP) => w4.getObjectByName(DP)).filter(Boolean)],
    wT = je.map((DP) => w4.getObjectByName('upperarm_' + DP)).filter(Boolean),
    wA = Object.fromEntries(
      je.map((DP) => [
        DP,
        Object.fromEntries(
          ['clavicle', 'upperarm', 'lowerarm', 'hand', 'middle_01'].map((DY) => [
            DY,
            w4.getObjectByName(DY + '_' + DP),
          ]),
        ),
      ]),
    ),
    wX = w4.getObjectByName('spine_01'),
    wL = w4.getObjectByName('neck_01'),
    wb = wF && wX && wL && je.every((DP) => Object.values(wA[DP]).every(Boolean)) ? wF : null,
    wx = wb ? (w9.swing ?? 1) : 1,
    wy = Object.fromEntries(
      je.map((DP) => [
        DP,
        {
          thigh: wf('thigh_' + DP),
          calf: wf('calf_' + DP),
          foot: wf('foot_' + DP),
          ball: wf('ball_' + DP),
        },
      ]),
    ),
    wW = Object.fromEntries(je.map((DP) => [DP, w4.getObjectByName('ball_leaf_' + DP) ?? null])),
    wq = w6.N,
    wP = w6.dt,
    wY = Math.sign(w8) || 1,
    wv = w9.tactical ? zu(w9, w6, w8 * gt) : null;
  wv &&
    (w9 = {
      ...w9,
      hips: 0,
      knees: 0,
      feet: 0,
      bulge: 0,
      stride: wv.stride,
      time: w9.time ?? wv.time,
    });
  let wB = w8 * gt,
    wG = (wp ? w7 : w8) * gt,
    wg = wY * Math.min(Math.abs(w9.hips), Math.abs(w8)) * gt,
    wI = wB - wg,
    wh = (wp ? wq - 1 : wq) * wP,
    wN = Math.max(4, Math.round(wh * Math.min(Math.max(w9.time ?? w9.stride ?? 1, 0.3), 3) * wD)),
    wM = wN / (wh * wD),
    V0 = wp ? wN + 1 : wN,
    V1 = w9.time == null ? wM : Math.min(Math.max(w9.stride ?? 1, wv ? 0.05 : 0.3), 2),
    V2 = {
      lift: w9.lift ?? 1,
      bounce: w9.bounce ?? 1,
      sway: w9.sway ?? 1,
      drop: (w9.drop ?? 0) / 100,
    },
    V3 = new kf(0, 0, 1),
    V4 = new kf(1, 0, 0),
    V5 = V3.clone().applyAxisAngle(Ct, wG),
    V6 = V3.clone().applyAxisAngle(Ct, wg),
    V7 = V4.clone().applyAxisAngle(Ct, wg),
    V8 = wg + w9.knees * wI,
    V9 = wg + w9.feet * wI,
    Vk = Math.sign(w7) || 1,
    Vw = (DP) => (DP === 'l') == Vk > 0,
    VV = (DP) => (w9.toes ? Vk * w9.toes[Vw(DP) ? 0 : 1] * gt : V9),
    VD = (DP) => (w9.kneesTo ? Vk * w9.kneesTo[Vw(DP) ? 0 : 1] * gt : V8),
    Vm = Math.abs(Math.sin(wI)),
    VS = {};
  for (let DP of je) {
    let DY = w6.feet[DP].down,
      Dv = new Float32Array(wq).fill(-1);
    for (let DB = 0; DB < wq; DB++) {
      if (DY[DB]) continue;
      let DG = 0,
        Dg = 0;
      for (
        ;
        (wp ? DB - DG - 1 >= 0 && !DY[DB - DG - 1] : !DY[(DB - DG - 1 + wq * 2) % wq]) && DG < wq;
      )
        DG++;
      for (; (wp ? DB + Dg + 1 < wq && !DY[DB + Dg + 1] : !DY[(DB + Dg + 1) % wq]) && Dg < wq;)
        Dg++;
      Dv[DB] = (DG + 1) / (DG + Dg + 2);
    }
    VS[DP] = Dv;
  }
  let VE = new kO(),
    VF = (DI, Dh) => {
      (DI.parent.getWorldQuaternion(VE),
        DI.quaternion.copy(VE.invert().multiply(Dh)),
        DI.updateMatrixWorld(!0));
    },
    VC = (DI, Dh) => {
      (DI.position.copy(DI.parent.worldToLocal(Dh.clone())), DI.updateMatrixWorld(!0));
    },
    { bones: VH, channels: VR, sourceAt: VQ, atRest: Vj } = sc(w4, w5),
    Vz = Object.fromEntries(
      je.map((DI) => [DI, wy[DI].calf.position.length() + wy[DI].foot.position.length()]),
    ),
    Vp = [
      ...new Set([
        wJ,
        wZ,
        ...VR.filter((DI) => DI.prop === 'position' && VH.includes(DI.b)).map((DI) => DI.b),
      ]),
    ],
    VO = ((Math.round(wV) % wq) + wq) % wq,
    Vf = (DI) => DI.getWorldPosition(new kf()),
    VJ = (DI) => DI.getWorldQuaternion(new kO()),
    VZ = (DI) => ({
      body: {
        hip: Object.fromEntries(je.map((Dh) => [Dh, Vf(wy[Dh].thigh)])),
        knee: Object.fromEntries(je.map((Dh) => [Dh, Vf(wy[Dh].calf)])),
        low: Vf(wX),
        neck: Vf(wL),
      },
      arm: Object.fromEntries(
        je.map((Dh) => {
          let DN = wA[Dh];
          return [
            Dh,
            {
              S: Vf(DN.upperarm),
              E: Vf(DN.lowerarm),
              W: Vf(DN.hand),
              M: Vf(DN.middle_01),
              ...(DI ? { qClav: VJ(DN.clavicle), qUp: VJ(DN.upperarm) } : {}),
            },
          ];
        }),
      ),
    });
  Vj();
  let VU = wK.map(VJ),
    VK = new Map(VH.map((DI) => [DI, VJ(DI)])),
    VT = {
      chest: Math.max(Vf(wZ).distanceTo(Vf(wU[wU.length - 1])), 0.1),
      head: Math.max(Vf(wU[wU.length - 1]).distanceTo(Vf(wK[wK.length - 1])), 0.1),
      arm:
        wT.length && w4.getObjectByName('hand_l')
          ? Math.max(Vf(wT[0]).distanceTo(Vf(w4.getObjectByName('hand_l'))), 0.2)
          : 0.55,
    },
    VA = je.map((DI) => ['clavicle', 'upperarm', 'lowerarm', 'hand'].map((Dh) => wA[DI][Dh])),
    VX = wT.length === 2 && VA.every((DI) => DI.every(Boolean)),
    {
      ctl: VL,
      placed: Vb,
      aims: Vx,
      pins: Vy,
      limbed: VW,
    } = ec({
      rig: w4,
      controls: wQ,
      trunk: wK,
      limbs: VA,
      limbsOK: VX,
      hips: wZ,
      standing: VK,
      M: wN,
      halfOn: wO,
      sides: je,
    });
  for (let DI of Vb) Vp.includes(DI.b) || Vp.push(DI.b);
  let Vq = [],
    VP = (Dh) => (wp ? Dh : Dh % wq) * wP;
  for (let Dh = 0; Dh < V0; Dh++) {
    let DN = wp ? (Dh * (wq - 1)) / wN : VO + (Dh * wq) / wN,
      DM = wp ? Math.min(wq - 1, Math.round(DN)) : Math.round(DN) % wq,
      m0 = !wp && DN >= wq ? w6.travelD : null;
    VQ(VP(DN));
    let m1 = { at: DN, i: DM, root: Vf(wJ), pelvisP: Vf(wZ), trunkQ: wK.map(VJ), armQ: wT.map(VJ) };
    (wb && ((m1.shape = VZ(!1)), (m1.foreQ = je.map((m2) => wA[m2].lowerarm.quaternion.clone()))),
      VW && (m1.limbQ = VA.map((m2) => [VJ(m2[0].parent), ...m2.map(VJ)])));
    for (let m2 of Vb) (m1.at0 ??= new Map()).set(m2.b, Vf(m2.b).sub(m1.root));
    for (let m3 of Vy)
      (m1.pin ??= new Map()).set(m3, {
        p: Vf(m3.hand),
        q: VJ(m3.hand),
        sp: m3.to ? Vf(m3.to) : m1.root.clone(),
        sq: m3.to ? VJ(m3.to) : new kO(),
      });
    for (let m4 of Vx)
      (m1.aim ??= new Map()).set(m4, {
        p: Vf(m4.b),
        q: VJ(m4.b),
        sp: m4.space ? Vf(m4.space) : m1.root.clone(),
        sq: m4.space ? VJ(m4.space) : null,
      });
    m0 && (m1.root.add(m0), m1.pelvisP.add(m0));
    for (let m5 of je) {
      let m6 = Vf(wy[m5].foot),
        m7 = Vf(wy[m5].ball),
        m8 = Vf(wy[m5].thigh),
        m9 = Vf(wy[m5].calf),
        mk = m6.clone().sub(m8),
        mw = m9
          .clone()
          .sub(m8)
          .addScaledVector(mk, -m9.clone().sub(m8).dot(mk) / Math.max(mk.lengthSq(), 1e-9));
      ((m1[m5] = {
        ankle: m6,
        ball: m7,
        hip: m8,
        footQ: VJ(wy[m5].foot),
        knee: mw.length() > 0.01 ? mw.normalize() : V3.clone(),
        heelUp: m6.y - w6.ankleFloor,
        toeUp: m7.y - w6.ballFloor,
        down: !!w6.feet[m5].down[DM],
      }),
        m0 && (m6.add(m0), m7.add(m0), m8.add(m0)));
    }
    Vq.push(m1);
  }
  let { clocks: VY, more: Vv } = wp
      ? { clocks: null, more: { l: 0, r: 0 } }
      : lc({
          S: Vq,
          reading: w6,
          fixed: (mV) => wC?.footY?.[mV] ?? wC?.footX?.[mV] ?? wC?.footZ?.[mV],
          ground: w9.ground ?? 0,
          start: VO,
          M: wN,
          sides: je,
        }),
    VB = Vq[0].root,
    VG = new kf(0, VB.y, 0),
    Vg = (mV) => {
      let mD = new ke();
      for (let mm of mV) {
        let mS = mm.dot(mV[0]) < 0 ? -1 : 1;
        ((mD.x += mS * mm.x), (mD.y += mS * mm.y), (mD.z += mS * mm.z), (mD.w += mS * mm.w));
      }
      return (mD.normalize(), new kO(mD.x, mD.y, mD.z, mD.w));
    },
    VI = wp ? (mV) => Math.min(Math.max(mV, 0), V0 - 1) : (mV) => ((mV % wN) + wN) % wN,
    Vh = null,
    VN = null,
    VM = null,
    D0 = !1,
    D1 = !1,
    D2 = null;
  if (wp) {
    let mV = (mQ) => mQ.clone().setY(0),
      mD = Vq.map(
        (mQ, mj) =>
          mV(Vq[VI(mj + 1)].root).distanceTo(mV(Vq[VI(mj - 1)].root)) /
          Math.max(VI(mj + 1) - VI(mj - 1), 1),
      ),
      mm = Math.max(Yn(mD, 0.8), 0.25 * Math.max(...mD), 1e-9),
      mS = mD.map((mQ) => qt(mQ / (0.5 * mm)));
    ((Vh = mS.map((mQ, mj) => {
      let mz = 0;
      for (let mp = -2; mp <= 2; mp++) mz += mS[VI(mj + mp)];
      return mz / 5 < 0.001 ? 0 : mz / 5;
    })),
      (D0 = wj.opens ?? mD[0] < 0.15 * mm),
      (D1 = wj.closes ?? mD[V0 - 1] < 0.15 * mm));
    let mE = Math.max(2, Math.round(0.2 * wD));
    if (D0) {
      for (let mQ = 0; mQ < Math.min(mE, V0); mQ++) Vh[mQ] = Math.min(Vh[mQ], qt(mQ / mE));
    }
    if (D1) {
      for (let mj = 0; mj < Math.min(mE, V0); mj++)
        Vh[V0 - 1 - mj] = Math.min(Vh[V0 - 1 - mj], qt(mj / mE));
    }
    let mF = [0];
    for (let mz = 1; mz < V0; mz++)
      mF.push(mF[mz - 1] + mV(Vq[mz].root).distanceTo(mV(Vq[mz - 1].root)));
    let mC = Math.max(mF[V0 - 1], 1e-9),
      mH = (mp, mO, mf) => mV(mp[mO][mf].clone().sub(mp.root)),
      mR = new kf();
    ((D2 = mF.map((mp) => qt(mp / mC))), (VM = {}), (VN = {}));
    for (let mp of je) {
      let mO = (mL) => (D0 ? mH(Vq[0], mp, mL) : D1 ? mH(Vq[V0 - 1], mp, mL) : mR),
        mf = (mL) => (D1 ? mH(Vq[V0 - 1], mp, mL) : mO(mL)),
        mJ = mO('ankle'),
        mZ = mf('ankle'),
        mU = mO('ball'),
        mK = mf('ball');
      VM[mp] = Vq.map((mL, mb) => ({
        ankle: mJ.clone().lerp(mZ, D2[mb]),
        ball: mU.clone().lerp(mK, D2[mb]),
      }));
      let mT = Vq.map((mL) => mL[mp].down),
        mA = Float32Array.from(Vh),
        mX = [];
      for (let mL = 0, mb = -1; mL <= V0; mL++)
        mL < V0 && mT[mL]
          ? mb < 0 && (mb = mL)
          : mb >= 0 && (mX.push({ a: mb, b: mL - 1, v: Math.min(Vh[mb], Vh[mL - 1]) }), (mb = -1));
      (mX.forEach((mx, my) => {
        for (let mY = mx.a; mY <= mx.b; mY++) mA[mY] = mx.v;
        let mW = mX[my - 1],
          mq = mW ? mW.b : 0,
          mP = mW ? mW.v : Vh[0];
        for (let mv = mq + (mW ? 1 : 0); mv < mx.a; mv++)
          mA[mv] = mP + (mx.v - mP) * qt((mv - mq) / (mx.a - mq));
        if (my === mX.length - 1) {
          for (let mB = mx.b + 1; mB < V0; mB++)
            mA[mB] = mx.v + (Vh[V0 - 1] - mx.v) * qt((mB - mx.b) / Math.max(V0 - 1 - mx.b, 1));
        }
      }),
        (VN[mp] = mA));
    }
  }
  let D3 = (mx) => (Vh ? Vh[mx] : 1),
    D4 = wp ? (mx, my) => Yl(mx, my) : (mx, my) => zl(mx, my, VO / wq),
    D5 = (mx, my) => (Vh ? my + (1 - my) * (1 - Vh[mx]) : my),
    { spun: D6, shifted: D7 } = tc({
      S: Vq,
      ctl: VL,
      placed: Vb,
      aims: Vx,
      pins: Vy,
      trunk: wK,
      limbs: VA,
      limbsOK: VX,
      sides: je,
      laidOn: D4,
      Lh: V7,
      Fh: V6,
    }),
    D8 =
      wx !== 1
        ? {
            upper: wT.map((mx, my) => Vg(Vq.map((mW) => mW.armQ[my]))),
            fore: je.map((mx, my) => Vg(Vq.map((mW) => mW.foreQ[my]))),
          }
        : null,
    D9 = w6.travelD.clone().applyAxisAngle(Ct, wG).multiplyScalar(V1),
    Dk = Vq.map((mx) => mx.pelvisP.clone().sub(mx.root)),
    Dw = Dk.map((mx) => mx.clone()),
    DV = (mx) => (mx.late ? { ...mx, late: mx.late / wN } : mx);
  wC?.hipY &&
    D4(
      Dk.map((mx) => mx.y),
      DV(wC.hipY),
    ).forEach((mx, my) => {
      Dk[my].y = mx;
    });
  for (let [mx, my] of [
    ['hipX', V4],
    ['hipZ', V3],
  ])
    wC?.[mx] &&
      D4(
        Dk.map((mW) => mW.dot(my)),
        DV(wC[mx]),
      ).forEach((mW, mq) => {
        Dk[mq].addScaledVector(my, mW - Dk[mq].dot(my));
      });
  if (V2.bounce !== 1 || V2.sway !== 1 || V2.drop !== 0) {
    let mW = Dk.reduce((mP, mY) => mP + mY.y, 0) / wN,
      mq = Dk.reduce((mP, mY) => mP + mY.dot(V4), 0) / wN;
    for (let mP of Dk) {
      let mY = mP.dot(V4);
      (mP.addScaledVector(V4, mq + (mY - mq) * V2.sway - mY),
        (mP.y = mW + (mP.y - mW) * V2.bounce - V2.drop));
    }
  }
  let DD = {
      heel: Math.max(
        Yn(
          Vq.flatMap((mv) => je.map((mB) => mv[mB].heelUp)),
          0.97,
        ),
        0.0001,
      ),
      toe: Math.max(
        Yn(
          Vq.flatMap((mv) => je.map((mB) => mv[mB].toeUp)),
          0.97,
        ),
        0.0001,
      ),
    },
    Dm = wm ? { ...br, ...wm } : null,
    DS = wE && (wE.amount ?? dc.amount) > 0 ? { ...dc, ...wE } : null,
    DE = Math.min(Math.max(w9.chest ?? 0, 0), 1),
    DF = wK.length - 1 - wU.length,
    DC = wK.map((mv, mB) => {
      let mG = mB === 0 ? 1 : Math.max(1 - wk.slice(0, mB).reduce((mg, mI) => mg + mI, 0), 0);
      return mB <= wU.length
        ? DE
          ? DE + (1 - DE) * mG
          : mG
        : DE * (1 - (mB - wU.length) / Math.max(DF, 1));
    }),
    DH = DC.map((mv, mB) => (mB === 0 ? wg : mB <= wU.length || mv ? wg * mv : 0)),
    DR = wS && (wS.amount ?? uc.amount) > 0 ? { ...uc, ...wS } : null,
    DQ,
    Dj = null;
  if (!DR) DQ = Vq.map((mv, mB) => wK.map((mG, mg) => Qo(DH[mg] * D3(mB)).multiply(mv.trunkQ[mg])));
  else {
    let mv = wU.length,
      mB = wK.map((S2, S3) =>
        S3 <= mv
          ? DR.hips + ((DR.chest - DR.hips) * S3) / mv
          : DR.chest + ((DR.head - DR.chest) * (S3 - mv)) / Math.max(wK.length - 1 - mv, 1),
      ),
      mG = w9.lean ?? 1,
      mg = w7 * gt,
      mI = Vq.map((S2) =>
        wK.map((S3, S4) => {
          let S5 = S2.trunkQ[S4].clone().multiply(VU[S4].clone().invert()),
            S6 = Zl(S5);
          return { tip: S6, heading: En(S6).invert().multiply(S5) };
        }),
      ),
      mh = wp && (D0 || D1),
      mN = wK.map((S2, S3) => mI.reduce((S4, S5) => S4.add(S5[S3].tip), new kf()).divideScalar(V0)),
      mM = (S2, S3) =>
        mh
          ? D0 && D1
            ? mI[0][S3].tip.clone().lerp(mI[V0 - 1][S3].tip, D2[S2])
            : mI[D1 ? V0 - 1 : 0][S3].tip
          : mN[S3],
      S0 = new kf(),
      S1 = new kf();
    ((DQ = mI.map((S2, S3) =>
      wK.map((S4, S5) => {
        let S6 = DH[S5] * D3(S3),
          S7 = wp ? V4.clone().applyAxisAngle(Ct, wg * D3(S3)) : V7,
          S8 = [];
        S8[S5] = mM(S3, S5);
        let S9 = S2[S5].tip.clone().applyAxisAngle(Ct, S6),
          Sk = mh
            ? S8[S5].clone()
            : S8[S5].clone().lerp(S8[S5].clone().applyAxisAngle(Ct, mg).multiplyScalar(mG), mB[S5]),
          Sw = S2[S5].tip.clone().sub(S8[S5]),
          SV = V5.clone().multiplyScalar(Sw.dot(V3)).addScaledVector(S7, Sw.dot(V4)),
          SD = S9.clone().lerp(Sk.add(Sw.lerp(SV, mB[S5])), DR.amount);
        return (
          S5 === mv && (S0.add(S9), S1.add(SD)),
          En(SD).multiply(Qo(S6)).multiply(S2[S5].heading).multiply(VU[S5])
        );
      }),
    )),
      (Dj = { was: [S0.z / wN / gt, S0.x / wN / gt], now: [S1.z / wN / gt, S1.x / wN / gt] }));
  }
  let Dz = nc(DQ, { posture: wR, spine: wk, c: wU.length, Fh: V6, Lh: V7 }),
    Dp = Dz.bent;
  DQ = Dz.body;
  let DO = wH && (wH.amount ?? cc.amount) > 0 ? { ...cc, ...wH } : null,
    Df = ac(DQ, {
      Ft: DO,
      over: Dk,
      over0: Dw,
      spine: wk,
      c: wU.length,
      lever: VT,
      L0: V4,
      F0: V3,
      Lh: V7,
      Fh: V6,
      loop: { fps: wD, one: wp, K: V0, M: wN },
    }),
    DJ = Df.armTip,
    DZ = Df.followed;
  DQ = Df.body;
  let DU = { one: wp, K: V0, M: wN, travel: D9, opens: D0, closes: D1 };
  function DK(S2) {
    let S3 = new Map(VH.map((SJ) => [SJ, new Float32Array((wN + 1) * 4)])),
      S4 = new Map(Vp.map((SJ) => [SJ, new Float32Array((wN + 1) * 3)])),
      S5 = Vq.map((SJ) =>
        VG.clone().add(SJ.root.clone().sub(VB).applyAxisAngle(Ct, wG).multiplyScalar(V1)),
      ),
      S6 = {},
      S7 = 0;
    for (let SJ of je) {
      let SZ = SJ === 'l' ? 1 : -1;
      S6[SJ] = Vq.map((SU, SK) => {
        let ST = VS[SJ][SU.is?.[SJ] ?? SU.i],
          SA = ST >= 0 ? (w9.bulge / 100) * Math.sin(Math.PI * ST) * Vm : 0,
          SX = VN ? VN[SJ][SK] : 1,
          SL = wp ? V4.clone().applyAxisAngle(Ct, wg * SX) : V7,
          Sb = (SP, SY) => {
            let Sv = SP.clone().sub(SU.root),
              SB = S5[SK].clone();
            return (
              SY && (Sv.sub(SY), SB.add(SY.clone().applyAxisAngle(Ct, wg * SX))),
              SB.addScaledVector(V5, V1 * Sv.dot(V3))
                .addScaledVector(SL, Sv.dot(V4) + SZ * (S2 + SA) * SX)
                .setY(SP.y)
            );
          },
          Sx = fn((SU[SJ].heelUp - SU[SJ].toeUp) / 0.03 + 0.5),
          Sy = SU[SJ].ball
            .clone()
            .sub(SU[SJ].ankle)
            .applyAxisAngle(Ct, VV(SJ) * SX),
          SW = SU[SJ].hip
            .clone()
            .sub(SU.pelvisP)
            .applyQuaternion(
              DQ[SK][0].clone().multiply((SU.hipsQ ?? SU.trunkQ[0]).clone().invert()),
            ),
          Sq = Sb(SU[SJ].ankle, VM?.[SJ][SK].ankle).lerp(
            Sb(SU[SJ].ball, VM?.[SJ][SK].ball).sub(Sy),
            Sx,
          );
        return (
          V2.lift !== 1 &&
            ST >= 0 &&
            (Sq.y += (V2.lift - 1) * Math.sin(Math.PI * ST) * Math.max(Sq.y - w6.ankleFloor, 0)),
          { A: Sq, O: Sy, w: Sx, socket: SW, share: SX }
        );
      });
    }
    for (let SU of je) {
      let SK = (ST) => (wp ? ST : Go(ST, Vv[SU]));
      if (wC?.footY?.[SU]) {
        let ST = S6[SU].map((SA) => SA.A.y);
        D4(ST, SK(wC.footY[SU])).forEach((SA, SX) => {
          let SL = S6[SU][SX],
            Sb = SA - ST[SX];
          if (Math.abs(Sb) < 1e-7) return;
          if (!Vq[SX][SU].down) {
            SL.A.y = Math.max(SA, w6.ankleFloor);
            return;
          }
          let Sx = Sb * qt(2 * SL.w - 1),
            Sy = SL.O.clone().negate(),
            SW = Sy.length(),
            Sq = new kf(Sy.x, 0, Sy.z);
          if (Math.abs(Sx) < 1e-7 || Sq.lengthSq() < 1e-10) return;
          let SP = Math.min(Math.max(Sy.y + Sx, -0.2 * SW), 0.98 * SW),
            SY = SL.A.clone().add(SL.O),
            Sv = Sq.normalize()
              .multiplyScalar(Math.sqrt(SW * SW - SP * SP))
              .setY(SP);
          ((SL.pre = new kO().setFromUnitVectors(
            SL.O.clone().normalize(),
            Sv.clone().negate().normalize(),
          )),
            (SL.A = SY.add(Sv)),
            (SL.O = Sv.clone().negate()));
        });
      }
      if (wC?.footX?.[SU]) {
        let SA = S6[SU].map((SX, SL) => SX.A.clone().sub(S5[SL]).dot(V7));
        D4(SA, SK(wC.footX[SU])).forEach((SX, SL) => {
          S6[SU][SL].A.addScaledVector(V7, SX - SA[SL]);
        });
      }
      if (wC?.footZ?.[SU]) {
        let SX = S6[SU].map((SL, Sb) => SL.A.clone().sub(S5[Sb]).dot(V5));
        D4(SX, SK(wC.footZ[SU])).forEach((SL, Sb) => {
          S6[SU][Sb].A.addScaledVector(V5, SL - SX[Sb]);
        });
      }
    }
    let S8 = Vq.map((SL, Sb) => S5[Sb].clone().add(Dk[Sb].clone().applyAxisAngle(Ct, wg * D3(Sb))));
    for (let SL of je)
      S6[SL].forEach((Sb, Sx) => {
        Sb.hip = S8[Sx].clone().add(Sb.socket);
      });
    let S9 = Math.min(
      1,
      Math.max(...je.flatMap((Sb) => S6[Sb].map((Sx) => Sx.hip.distanceTo(Sx.A) / Vz[Sb]))),
    );
    for (let Sb of je)
      rc({
        fr: S6[Sb],
        down: Vq.map((Sx) => Sx[Sb].down),
        heelUp: Vq.map((Sx) => Sx[Sb].heelUp),
        toeUp: Vq.map((Sx) => Sx[Sb].toeUp),
        top: DD,
        L: Dm,
        reach: (S9 + (DS ? DS.give * DS.amount : 0)) * Vz[Sb],
        loop: DU,
      }).forEach((Sx, Sy) => {
        (Object.assign(S6[Sb][Sy], Mi(S6[Sb][Sy], Sx)), (S7 = Math.max(S7, Sx.length())));
      });
    let Sk = S8;
    if (DR && DR.weight > 0) {
      let Sx = Math.min((DA + S2) / Math.max(DA, 0.001), 2),
        Sy = Vq.map((Sv, SB) => {
          let SG = Dk[SB];
          return S5[SB].clone()
            .addScaledVector(V5, SG.dot(V3))
            .addScaledVector(V7, SG.dot(V4) * Sx)
            .setY(S8[SB].y);
        }),
        SW = (Sv, SB) =>
          Math.max(
            ...je.map((SG) => SB.clone().add(S6[SG][Sv].socket).distanceTo(S6[SG][Sv].A) / Vz[SG]),
          ),
        Sq = Math.min(DS ? DS.limit : 1, Math.max(S9, ...Vq.map((Sv, SB) => SW(SB, S8[SB])))),
        SP = Vq.map((Sv, SB) => {
          if (SW(SB, Sy[SB]) <= Sq) return 1;
          let SG = 0,
            Sg = 1;
          for (let SI = 0; SI < 12; SI++) {
            let Sh = (SG + Sg) / 2;
            SW(SB, S8[SB].clone().lerp(Sy[SB], Sh)) <= Sq ? (SG = Sh) : (Sg = Sh);
          }
          return SG;
        }),
        SY = SP.map((Sv, SB) =>
          Math.min(Sv, 0.25 * SP[VI(SB - 1)] + 0.5 * Sv + 0.25 * SP[VI(SB + 1)]),
        );
      Sk = Vq.map((Sv, SB) => S8[SB].clone().lerp(Sy[SB], DR.amount * DR.weight * SY[SB] * D3(SB)));
    }
    let Sw = 0,
      SV = 0;
    if (DS) {
      let Sv = Object.fromEntries(
        je.map((SB) => [
          SB,
          {
            feet: S6[SB],
            down: Vq.map((SG) => SG[SB].down),
            heelUp: Vq.map((SG) => SG[SB].heelUp),
            toeUp: Vq.map((SG) => SG[SB].toeUp),
            limb: Vz[SB],
          },
        ]),
      );
      ({
        hipsAt: Sk,
        reached: Sw,
        jump: SV,
      } = ic({
        hipsAt: Sk,
        legs: Sv,
        floor: { top: DD, FLOOR: br.FLOOR, CLEAR: br.CLEAR },
        Rc: DS,
        limitAt: D5,
        loop: { fps: wD, K: V0, mod: VI },
      }));
    }
    let SD = null;
    if (w9.hipSwing) {
      let SB = Vk > 0 ? 'l' : 'r',
        SG = Vk > 0 ? 'r' : 'l',
        Sg = D9.clone().normalize(),
        SI = Vq.map((r0, r1) => S6[SB][r1].A.clone().sub(S6[SG][r1].A).dot(Sg)),
        Sh = Math.min(...SI),
        SN = Math.max(...SI),
        SM = (Math.sign(wg) || Vk) * w9.hipSwing * gt;
      SN - Sh > 0.000001 &&
        (SD = Float32Array.from(SI, (r0) => SM * (2 * qt((SN - r0) / (SN - Sh)) - 1)));
    }
    let Sm = Object.fromEntries(je.map((r0) => [r0, []])),
      SS = [],
      SE = Vx.map((r0) => ({ bone: r0.name, at: [], up: r0.up ? [] : null, far: 0 })),
      SF = Vy.map((r0) => ({ hand: r0.name, to: r0.to?.name ?? null, short: 0, far: 0 })),
      SC = 1 / 0,
      SH = 0,
      SR = 0,
      SQ = { gap: 1 / 0, at: 0, shin: 1 / 0, shinAt: 0 },
      Sj = { least: 1 / 0, at: 0, most: -1 / 0 },
      Sz = { gap: 1 / 0, at: 0, inward: 0, inwardAt: 0 },
      Sp = { gap: 1 / 0, at: 0 };
    for (let r0 = 0; r0 < V0; r0++) {
      let r1 = Vq[r0];
      (VQ(VP(r1.at)), VC(wJ, S5[r0]), VC(wZ, Sk[r0]));
      let r2 = SD ? SD[r0] * D3(r0) : 0;
      for (let r6 = 0; r6 < (DR || DZ || Dp || D6 || DE ? wK.length : 1 + wU.length); r6++)
        VF(wK[r6], r2 && DC[r6] ? Qo(r2 * DC[r6]).multiply(DQ[r0][r6]) : DQ[r0][r6]);
      r1.limb &&
        VA.forEach((r7, r8) => {
          r1.limb[r8] && r7.forEach((r9, rk) => r9.quaternion.copy(r1.limb[r8][rk]));
        });
      let r3 = DE ? DH[wU.length] * D3(r0) + r2 * DC[wU.length] : 0;
      (DR &&
        DR.arms > 0 &&
        wT.forEach((r7, r8) =>
          VF(
            r7,
            VJ(r7).slerp(r3 ? Qo(r3).multiply(r1.armQ[r8]) : r1.armQ[r8], DR.amount * DR.arms),
          ),
        ),
        DJ && wT.forEach((r7) => VF(r7, En(DJ[r0]).multiply(VJ(r7)))),
        D8 &&
          (wT.forEach((r7, r8) =>
            VF(
              r7,
              VJ(r7)
                .multiply(r1.armQ[r8].clone().invert())
                .multiply(D8.upper[r8].clone().slerp(r1.armQ[r8], wx)),
            ),
          ),
          je.forEach((r7, r8) => {
            wA[r7].lowerarm.quaternion.copy(D8.fore[r8].clone().slerp(r1.foreQ[r8], wx));
          }),
          w4.updateMatrixWorld(!0)));
      for (let r7 of Vb) {
        if (r7.skip) continue;
        let r8 = null;
        for (let rk = r7.b.parent; rk && !r8; rk = rk.parent)
          r8 = Vb.find((rw) => rw.b === rk && rw.off) ?? null;
        let r9 = r8 ? r7.off[r0].clone().sub(r8.off[r0]) : r7.off[r0];
        r9.lengthSq() > 0 && VC(r7.b, Vf(r7.b).add(r9));
      }
      (Vx.forEach((rw, rV) => {
        let rD = r1.aim.get(rw),
          rm = Vf(wJ),
          rS = (rz) =>
            rw.space
              ? Vf(rw.space).add(
                  rz.clone().applyQuaternion(VJ(rw.space).multiply(rD.sq.clone().invert())),
                )
              : rm
                  .clone()
                  .addScaledVector(V7, rz.x)
                  .addScaledVector(V6, rz.z)
                  .setY(rm.y + rz.y),
          rE = rS(rw.tgt[r0]),
          rF = Vf(rw.b),
          rC = rE.clone().sub(rF),
          rH = rw.up ? rS(rw.up[r0]) : null,
          rR = SE[rV];
        if (
          (rR.at.push(rE.clone().sub(rm)),
          rH && rR.up.push(rH.clone().sub(rm)),
          rC.lengthSq() < 1e-10)
        )
          return;
        rC.normalize();
        let rQ = VJ(rw.b),
          rj = new kO()
            .setFromUnitVectors(rw.axis.clone().applyQuaternion(rQ).normalize(), rC)
            .multiply(rQ);
        (rw.roll === 'curve'
          ? rj.premultiply(new kO().setFromAxisAngle(rC, rw.rolls[r0] * gt - rw.rollOf(rj, rC)))
          : rH &&
            rj.premultiply(
              new kO().setFromAxisAngle(
                rC,
                bi(rC, rw.upAxis.clone().applyQuaternion(rj), rH.clone().sub(rF)),
              ),
            ),
          (rR.far = Math.max(rR.far, rj.angleTo(rQ) / gt)),
          VF(rw.b, rj));
      }),
        Vy.forEach((rw, rV) => {
          let rD = rw.hold[r0],
            [, rm, rS, rE] = rw.arm;
          if (rD <= 0.000001) return;
          let rF = rw.loc[r0],
            rC = rw.to
              ? Vf(rw.to).add(rF.clone().applyQuaternion(VJ(rw.to)))
              : Vf(wJ)
                  .addScaledVector(V7, rF.x)
                  .addScaledVector(Ct, rF.y)
                  .addScaledVector(V6, rF.z),
            rH = (rw.to ? VJ(rw.to) : Qo(wg)).multiply(rw.rot[r0]),
            rR = Vf(rE),
            rQ = VJ(rE),
            rj = rR.clone().lerp(rC, rD),
            rz = Vf(rm),
            rp = rR.clone().sub(rz),
            rO = Vf(rS).sub(rz);
          (rO.addScaledVector(rp, -rO.dot(rp) / Math.max(rp.lengthSq(), 1e-9)),
            b(rm, rS, rE, rj, rO.length() > 0.01 ? rO.normalize() : V6.clone().negate(), kD),
            VF(rE, rQ.slerp(rH, rD)));
          let rJ = Vf(rE);
          ((SF[rV].short = Math.max(SF[rV].short, rJ.distanceTo(rj))),
            (SF[rV].far = Math.max(SF[rV].far, rJ.distanceTo(rR))));
        }));
      let r4 = {};
      for (let rw of je) {
        let rV = S6[rw][r0].A;
        if ((wy[rw].thigh.updateMatrixWorld(!0), DS)) {
          let rS = Vf(wy[rw].thigh),
            rE = rS.distanceTo(rV),
            rF = D5(r0, DS.limit) * Vz[rw];
          rE > rF && (rV = rS.clone().lerp(rV, (rF + (1 - DS.amount) * (rE - rF)) / rE));
        }
        let rD = r1[rw].knee.clone();
        if (wv) {
          let rC = rV.clone().sub(Vf(wy[rw].thigh));
          (rD.set(0, rC.z, -rC.y), rD.lengthSq() > 1e-8 ? rD.normalize() : rD.copy(V3));
        }
        (b(wy[rw].thigh, wy[rw].calf, wy[rw].foot, rV, rD.applyAxisAngle(Ct, VD(rw) * D3(r0)), kD, {
          soften: 0,
        }),
          w4.updateMatrixWorld(!0));
        let rm = Qo(VV(rw) * S6[rw][r0].share).multiply(r1[rw].footQ);
        for (let rH of [S6[rw][r0].pre, S6[rw][r0].turn]) rH && rm.premultiply(rH);
        (VF(wy[rw].foot, rm),
          (r4[rw] = Vf(wy[rw].foot)),
          (SR = Math.max(SR, Vf(wy[rw].thigh).distanceTo(rV) / Vz[rw])),
          Sm[rw].push({ ankle: r4[rw], ball: Vf(wy[rw].ball) }));
      }
      let r5 = Math.min(r4.l.distanceTo(r4.r), Yt(Vf(wy.l.calf), r4.l, Vf(wy.r.calf), r4.r));
      r5 < SC && D3(r0) > 0.5 && ((SC = r5), (SH = r0));
      {
        let rR = je.map((rp) => Vf(wy[rp].thigh)),
          rQ = je.map((rp) => Vf(wy[rp].calf)),
          rj = [r4.l, r4.r],
          rz = Math.min(
            Yt(rR[0], rQ[0], rR[1], rQ[1]),
            Yt(rR[0], rQ[0], rQ[1], rj[1]),
            Yt(rQ[0], rj[0], rR[1], rQ[1]),
            Yt(rQ[0], rj[0], rQ[1], rj[1]),
          );
        rz < Sp.gap && ((Sp.gap = rz), (Sp.at = r0));
      }
      {
        let rp = Object.fromEntries(
            je.map((rA) => {
              let rX = r4[rA],
                rL = Vf(wy[rA].ball),
                rb = rL.clone().sub(rX).setY(0);
              rb.lengthSq() > 1e-10 && rb.normalize();
              let rx = wW[rA] ? Vf(wW[rA]) : rL.clone().addScaledVector(rb, 0.07),
                ry = new kf(rX.x, Math.min(rX.y, rL.y), rX.z).addScaledVector(rb, -pn.heel),
                rW = rx.clone().sub(ry),
                rq = rW.length(),
                rP = Math.min(pn.width / 2, rq / 2 - 0.0001);
              return (
                rq > 0.000001 && (rW.multiplyScalar(rP / rq), ry.add(rW), rx.sub(rW)),
                [rA, [ry, rx]]
              );
            }),
          ),
          rO = Yt(rp.l[0], rp.l[1], rp.r[0], rp.r[1]) - pn.width;
        rO < SQ.gap && ((SQ.gap = rO), (SQ.at = r0));
        let rJ = rp.l[0].clone().add(rp.l[1]).sub(rp.r[0]).sub(rp.r[1]).multiplyScalar(0.5).dot(V4);
        (rJ < Sj.least && ((Sj.least = rJ), (Sj.at = r0)), (Sj.most = Math.max(Sj.most, rJ)));
        let rZ = Object.fromEntries(je.map((rA) => [rA, Vf(wy[rA].calf)])),
          rU = Object.fromEntries(je.map((rA) => [rA, Vf(wy[rA].thigh)])),
          rK = rZ.l.distanceTo(rZ.r);
        rK < Sz.gap && ((Sz.gap = rK), (Sz.at = r0));
        let rT =
          Math.min(Yt(rp.l[0], rp.l[1], rZ.r, r4.r), Yt(rp.r[0], rp.r[1], rZ.l, r4.l)) -
          pn.width / 2 -
          DT / 2;
        rT < SQ.shin && ((SQ.shin = rT), (SQ.shinAt = r0));
        for (let rA of je) {
          let rX = r4[rA].clone().sub(rU[rA]),
            rL = rZ[rA].clone().sub(rU[rA]);
          rL.addScaledVector(rX, -rL.dot(rX) / Math.max(rX.lengthSq(), 1e-9));
          let rb = rL.dot(rU[rA === 'l' ? 'r' : 'l'].clone().sub(rU[rA]).setY(0).normalize());
          rb > Sz.inward && ((Sz.inward = rb), (Sz.inwardAt = r0));
        }
      }
      for (let rx of VH) rx.quaternion.toArray(S3.get(rx), r0 * 4);
      for (let ry of Vp) ry.position.toArray(S4.get(ry), r0 * 3);
      wb && SS.push(VZ(!0));
    }
    let SO = null;
    if (wb) {
      let rW = wb.radii,
        rq = wb.scale ?? 1,
        rP = jl({
          frames: SS,
          source: Bl(
            Vq.map((rv) => rv.shape),
            { radii: rW, scale: rq },
          ),
          radii: rW,
          opts: wb,
          loop: !wp,
        }),
        rY = (rv) =>
          Vy.some((rB) => je[rB.si] === rv || rB.to === wA[rv].hand) ||
          VL.some((rB) => je[rB.si] === rv && rB.turn) ||
          Vb.some((rB) => je[rB.si] === rv && rB.shift);
      (rP.turns.forEach((rv, rB) => {
        for (let rG of je)
          rv[rG] &&
            !rY(rG) &&
            (Vh
              ? new kO().fromArray(S3.get(wA[rG].upperarm), rB * 4).slerp(rv[rG], qt(2 * Vh[rB]))
              : rv[rG]
            ).toArray(S3.get(wA[rG].upperarm), rB * 4);
      }),
        (SO = je.every(rY)
          ? { short: [rP.short[0], rP.short[0]], pushed: 0, held: !0 }
          : { short: rP.short, pushed: rP.pushed }));
    }
    if (!wp) {
      for (let rv of VH) S3.get(rv).copyWithin(wN * 4, 0, 4);
      for (let rB of Vp) S4.get(rB).copyWithin(wN * 3, 0, 3);
      (VQ(VO * wP), wJ.parent.worldToLocal(VG.clone().add(D9)).toArray(S4.get(wJ), wN * 3));
    }
    let Sf = 0;
    for (let rG of je) {
      let rg = (E0) => {
        let E1 = Vq[E0][rG],
          E2 = S6[rG][E0].w;
        return E1.down && ((1 - E2) * E1.heelUp) / DD.heel + (E2 * E1.toeUp) / DD.toe <= br.FLOOR;
      };
      if (!wp && Vq.every((E0, E1) => rg(E1))) continue;
      let rI = (E0, E1) => {
          let E2 = Sm[rG][VI(E0)];
          return E2.ankle
            .clone()
            .lerp(E2.ball, E1)
            .addScaledVector(D9, wp ? 0 : Math.floor(E0 / wN));
        },
        rh = wp ? -1 : Vq.findIndex((E0, E1) => !rg(E1)),
        rN = wp ? V0 : wN,
        rM = null;
      for (let E0 = 1; E0 <= rN + 1; E0++) {
        let E1 = rh + E0;
        if (E0 <= rN && rg(VI(E1))) {
          if (!rM) rM = [new kf()];
          else {
            let E2 = (S6[rG][VI(E1 - 1)].w + S6[rG][VI(E1)].w) / 2;
            rM.push(
              rM[rM.length - 1].clone().add(
                rI(E1, E2)
                  .sub(rI(E1 - 1, E2))
                  .setY(0),
              ),
            );
          }
        } else {
          if (rM) {
            for (let E3 of rM) for (let E4 of rM) Sf = Math.max(Sf, E3.distanceTo(E4));
            rM = null;
          }
        }
      }
    }
    return {
      quats: S3,
      poss: S4,
      closest: SC,
      closestAt: SH,
      stretch: SR,
      slide: Sf,
      locked: S7,
      reached: Sw,
      jump: SV,
      armed: SO,
      aimed: SE.length ? SE : null,
      pinned: SF.length ? SF : null,
      feet: SQ,
      order: Sj,
      knees: Sz,
      legs: Sp,
      swivel: SD ? Math.max(...SD.map(Math.abs)) / gt : 0,
    };
  }
  let DT = w9.gap / 100,
    DA = Math.abs(w6.summary.laneL - w6.summary.laneR) / 2,
    DX = wv
      ? wv.widen
      : Math.max(DT / (2 * Math.max(Math.cos(wI), 0.2)) - DA, (w9.width ?? 0) / 100),
    DL = DK(DX),
    Db = 1;
  if (wv) {
    for (; DL.order.least < wv.closed - 0.002 && Db < 6;)
      ((DX += (wv.closed - DL.order.least) / 2 + 0.002), (DL = DK(DX)), Db++);
  } else {
    for (; DL.closest < DT - 0.002 && Db < 6;)
      ((DX += (DT - DL.closest) * 0.6 + 0.003), (DL = DK(DX)), Db++);
  }
  if (
    (w4.traverse((S2) => {
      S2.isSkinnedMesh && S2.skeleton.pose();
    }),
    wv &&
      DL.order.most - DL.order.least > wv.open - wv.closed + 0.003 &&
      (w3.p.tactical.again ?? 0) < 2)
  ) {
    let S2 = (wv.open - wv.closed) / (DL.order.most - DL.order.least);
    return Ho({
      ...w3,
      p: {
        ...w3.p,
        stride: wv.stride * S2,
        tactical: {
          ...w3.p.tactical,
          again: (w3.p.tactical.again ?? 0) + 1,
          asked: w3.p.tactical.asked ?? wv.asked,
        },
      },
    });
  }
  let Dx = Float32Array.from({ length: wN + 1 }, (S3, S4) => S4 / wD),
    Dy = [];
  for (let S3 of VH) Dy.push(new kI(S3.name + '.quaternion', Dx, DL.quats.get(S3)));
  for (let S4 of Vp) Dy.push(new kM(S4.name + '.position', Dx, DL.poss.get(S4)));
  let DW = new w2(ww ?? 'dir_' + w7, wN / wD, Dy),
    Dq = wp
      ? lr(w6)
      : VY
        ? (S5) =>
            Object.fromEntries(
              je.map((S6) => [
                S6,
                Uint8Array.from(
                  { length: S5 },
                  (S7, S8) =>
                    w6.feet[S6].down[((Math.round(VY[S6](VO / wq + S8 / S5) * wq) % wq) + wq) % wq],
                ),
              ]),
            )
        : ha(w6, { start: VO });
  return {
    clip: DW,
    contacts: Dq,
    aims: DL.aimed,
    report: {
      theta: w7,
      warp: w8,
      shift: VO,
      hips: wg / gt,
      alpha: wI / gt,
      widen: DX,
      closest: DL.closest,
      closestAt: DL.closestAt,
      gap: DT,
      stride: V1,
      time: wM,
      frames: wN,
      fps: wD,
      slide: DL.slide,
      stretch: DL.stretch,
      tries: Db,
      locked: DL.locked,
      lean: Dj,
      controls:
        D6 || D7
          ? { far: 0, bone: null, wide: 0, ...D6, shift: D7?.far ?? 0, shiftBone: D7?.bone ?? null }
          : null,
      aims: DL.aimed?.map((S5) => ({ bone: S5.bone, far: S5.far })) ?? null,
      pins: DL.pinned,
      follow: DZ,
      reached: DL.reached,
      jump: DL.jump,
      arms: DL.armed,
      feet: DL.feet,
      order: DL.order,
      knees: DL.knees,
      legs: DL.legs,
      tactical: wv ? { ...wv, stance: wv.stance + 2 * (DX - wv.widen), widen: DX } : null,
      chest: DE,
      hipSwing: DL.swivel,
    },
  };
}
function Yt(w3, w4, w5, w6) {
  let w7 = w4.clone().sub(w3),
    w8 = w6.clone().sub(w5),
    w9 = w3.clone().sub(w5),
    wk = w7.dot(w7),
    ww = w7.dot(w8),
    wV = w8.dot(w8),
    wD = w7.dot(w9),
    wm = w8.dot(w9),
    wS = wk * wV - ww * ww,
    wE = wS > 1e-9 ? (ww * wm - wV * wD) / wS : 0,
    wF;
  return (
    (wE = Math.min(Math.max(wE, 0), 1)),
    (wF = wV > 1e-9 ? (ww * wE + wm) / wV : 0),
    wF < 0
      ? ((wF = 0), (wE = Math.min(Math.max(-wD / wk, 0), 1)))
      : wF > 1 && ((wF = 1), (wE = Math.min(Math.max((ww - wD) / wk, 0), 1))),
    w3.clone().addScaledVector(w7, wE).distanceTo(w5.clone().addScaledVector(w8, wF))
  );
}
var Si = (w3) => ((w3 + 540) % 360) - 180,
  gc = (w3, w4) => w3.feet[w4].stances[0]?.land ?? 0,
  Yu = { hips: 0, knees: 0, feet: 0, gap: 0, bulge: 0, stride: 1 };
function $i(w3, w4) {
  return gc(w3, 'l') - Math.round((gc(w4, 'l') / w4.N) * w3.N);
}
function yc({ makeRig: w3, clip: w4, ref: w5, theta: w6 = 0, name: w7, lock: w8 = null }) {
  let w9 = Po(w3(), w4);
  if (!w9.feet.l.stances.length) throw new Error('no left-foot contact found in it');
  let {
    clip: wk,
    contacts: ww,
    report: wV,
  } = Ho({
    rig: w3(),
    clip: w4,
    reading: w9,
    theta: w6,
    warp: 0,
    p: Yu,
    name: w7 ?? w4.name,
    shift: $i(w9, w5),
    lock: w8,
  });
  return { clip: wk, contacts: ww, report: wV };
}
var Er = {
    mixamo: {
      hips: 'Hips',
      head: 'Head',
      shoulderL: 'LeftShoulder',
      shoulderR: 'RightShoulder',
      l: {
        hip: 'LeftUpLeg',
        knee: 'LeftLeg',
        ankle: 'LeftFoot',
        ball: 'LeftToeBase',
        tip: 'LeftToe_End',
      },
      r: {
        hip: 'RightUpLeg',
        knee: 'RightLeg',
        ankle: 'RightFoot',
        ball: 'RightToeBase',
        tip: 'RightToe_End',
      },
    },
    ours: {
      hips: 'pelvis',
      head: 'Head',
      shoulderL: 'clavicle_l',
      shoulderR: 'clavicle_r',
      l: { hip: 'thigh_l', knee: 'calf_l', ankle: 'foot_l', ball: 'ball_l', tip: 'ball_leaf_l' },
      r: { hip: 'thigh_r', knee: 'calf_r', ankle: 'foot_r', ball: 'ball_r', tip: 'ball_leaf_r' },
    },
  },
  qu = (w3) => (w3 * 180) / Math.PI,
  qn = (w3, w4) => {
    let w5 = [...w3].sort((w6, w7) => w6 - w7);
    return w5[Math.min(w5.length - 1, Math.floor(w5.length * w4))];
  },
  ko = (w3) => {
    let w4 = w3.filter(Number.isFinite);
    return w4.length ? w4.reduce((w5, w6) => w5 + w6, 0) / w4.length : NaN;
  },
  xr = (w3) => {
    let w4 = w3.filter(Number.isFinite);
    return w4.length ? [Math.min(...w4), Math.max(...w4)] : [NaN, NaN];
  };
function Gu(w3) {
  let w4 = new Set();
  return (
    w3.traverse((w5) => {
      w5.isBone && w4.add(w5.name.replace(/^mixamorig\d*:?/, ''));
    }),
    ['mixamo', 'ours'].find((w5) =>
      [Er[w5].hips, Er[w5].l.ankle, Er[w5].r.ball].every((w6) => w4.has(w6)),
    ) ?? null
  );
}
function wc(w3, w4, w5, { bones: w6 = null } = {}) {
  let w7 = Uu(w4),
    w8 = Math.max(4, Math.round(w4.duration * w7)),
    w9 = new w5['AnimationMix' + 'er'](w3);
  w9.clipAction(w4).play();
  try {
    return Qu(
      w3,
      w5,
      w6,
      w8,
      w7,
      w4.duration,
      (wk) => (w9.setTime(Math.min(wk / w7, w4.duration - 0.00001)), null),
    );
  } finally {
    (w9.stopAllAction(), w9.uncacheRoot(w3));
  }
}
function Uu(w3) {
  let w4 = w3.tracks.reduce(
    (w5, w6) => (w6.times.length > w5.length ? w6.times : w5),
    w3.tracks[0].times,
  );
  return Math.max(1, Math.round((w4.length - 1) / Math.max(w4[w4.length - 1] - w4[0], 0.000001)));
}
function Qu(w3, w4, w5, w6, w7, w8, w9) {
  let wk = w5 ? null : Gu(w3),
    ww = w5 ?? Er[wk];
  if (!ww) throw new Error('neither a Mixamo skeleton nor ours');
  let wV = {};
  w3.traverse((V6) => {
    V6.isBone && (wV[V6.name.replace(/^mixamorig\d*:?/, '')] ??= V6);
  });
  let wD = [
      ww.hips,
      ww.head,
      ww.shoulderL,
      ww.shoulderR,
      ...'lr'.split('').flatMap((V6) => [ww[V6].hip, ww[V6].knee, ww[V6].ankle, ww[V6].ball]),
    ],
    wm = wD.filter((V6) => !wV[V6]);
  if (wm.length) throw new Error('the skeleton has no ' + wm.join(', '));
  let wS = new w4.Vector3(0, 1, 0),
    wE = new w4.Vector3(0, 0, 1),
    wF = new w4.Vector3(1, 0, 0),
    wC = (V6) => new w4.Vector3(V6.x, 0, V6.z),
    wH = (V6) => qu(Math.atan2(V6.x, V6.z)),
    we = [
      ...new Set([
        ...wD,
        ...'lr'
          .split('')
          .map((V6) => ww[V6].tip)
          .filter((V6) => wV[V6]),
      ]),
    ],
    wR = Object.fromEntries(we.map((V6) => [V6, []])),
    wQ = [];
  for (let V6 = 0; V6 <= w6; V6++) {
    let V7 = w9(V6);
    w3.updateMatrixWorld(!0);
    for (let V8 of we) {
      let V9 = wV[V8].getWorldPosition(new w4['Vector3']());
      wR[V8].push(V7 ? V9.add(V7) : V9);
    }
    wQ.push(wV[ww.head].getWorldQuaternion(new w4['Quaternion']()));
  }
  let wj =
      wR[ww.l.hip][0].distanceTo(wR[ww.l.knee][0]) + wR[ww.l.knee][0].distanceTo(wR[ww.l.ankle][0]),
    wz = wj < 5 ? 100 : wj > 500 ? 0.1 : 1,
    wp = Object.fromEntries(we.map((Vk) => [Vk, wR[Vk].map((Vw) => Vw.multiplyScalar(wz))])),
    wO = (Vk) => ({
      hip: wp[ww[Vk].hip],
      knee: wp[ww[Vk].knee],
      ank: wp[ww[Vk].ankle],
      ball: wp[ww[Vk].ball],
      tip: wp[ww[Vk].tip] ?? null,
    }),
    wf = { l: wO('l'), r: wO('r') },
    wJ = wp[ww.hips],
    wZ = wj * wz,
    wU = wf.l.hip[0].distanceTo(wf.r.hip[0]),
    wK = wC(wJ[w6].clone().sub(wJ[0])),
    wT = wK.length() > 0.15 * wZ,
    wA = {
      ank: qn(
        ['l', 'r'].flatMap((Vk) => wf[Vk].ank.map((Vw) => Vw.y)),
        0.03,
      ),
      ball: qn(
        ['l', 'r'].flatMap((Vk) => wf[Vk].ball.map((Vw) => Vw.y)),
        0.03,
      ),
    },
    wn = (Vk) => {
      let Vw = Vk.clone().multiplyScalar(1 / w6),
        VV = (VE, VF) => {
          let VC = Math.floor(VF / w6),
            Vt = ((VF % w6) + w6) % w6;
          return VE[Vt].clone()
            .addScaledVector(Vw, wT ? 0 : Vt)
            .addScaledVector(Vk, VC);
        },
        VD = (VE, VF) => VV(VE, VF + 1).distanceTo(VV(VE, VF - 1)) / 2,
        Vm = qn(
          ['l', 'r'].flatMap((VE) => Array.from({ length: w6 }, (VF, VC) => VD(wf[VE].ball, VC))),
          0.9,
        ),
        VS = {};
      for (let VE of 'lr') {
        let VF = (VR) =>
            qn(
              wf[VE][VR].map((VQ) => VQ.y),
              0.97,
            ),
          VC = Array.from(
            { length: w6 },
            (VR, VQ) =>
              Math.min(
                ...['ball', 'ank'].map((Vj) =>
                  wf[VE][Vj][VQ].y <= wA[Vj] + 0.3 * (VF(Vj) - wA[Vj]) ? VD(wf[VE][Vj], VQ) : 1 / 0,
                ),
              ) / Math.max(Vm, 1e-9),
          ),
          Vt = new Uint8Array(w6),
          VH = Math.max(
            0,
            VC.findIndex((VR) => VR > 0.3),
          );
        for (let VR = 1, VQ = null; VR <= w6 + 1; VR++) {
          let Vj = (VH + VR) % w6;
          if (VR <= w6 && VC[Vj] <= 0.3)
            ((VQ ??= { from: VR, seed: !1 }), (VQ.to = VR), VC[Vj] <= 0.1 && (VQ.seed = !0));
          else {
            if (VQ) {
              if (VQ.seed) {
                for (let Vz = VQ.from; Vz <= VQ.to; Vz++) Vt[(VH + Vz) % w6] = 1;
              }
              VQ = null;
            }
          }
        }
        VS[VE] = Vt;
      }
      return { down: VS, G: VV };
    },
    wo = wK.clone();
  if (!wT) {
    let Vk = [];
    for (let Vw of 'lr')
      for (let VV = 1; VV < w6; VV++)
        wf[Vw].ball[VV].y < wA.ball + 0.02 * wZ &&
          Vk.push(wC(wf[Vw].ball[VV + 1].clone().sub(wf[Vw].ball[VV - 1])).multiplyScalar(0.5));
    wo = Vk.length
      ? new w4['Vector3'](
          -qn(
            Vk.map((VD) => VD.x),
            0.5,
          ) * w6,
          0,
          -qn(
            Vk.map((VD) => VD.z),
            0.5,
          ) * w6,
        )
      : new w4.Vector3(0, 0, 0.000001);
    for (let VD = 0; VD < 3; VD++) {
      let Vm = wn(wo),
        VS = new w4['Vector3'](),
        VE = 0;
      for (let VF of 'lr')
        for (let VC = 0; VC < w6; VC++)
          Vm.down[VF][VC] &&
            Vm.down[VF][(VC + 1) % w6] &&
            (VS.add(
              wC(
                wf[VF].ank[VC + 1]
                  .clone()
                  .lerp(wf[VF].ball[VC + 1], 0.5)
                  .sub(wf[VF].ank[VC].clone().lerp(wf[VF].ball[VC], 0.5)),
              ),
            ),
            VE++);
      VE && (wo = VS.multiplyScalar(-w6 / VE));
    }
  }
  let { down: wX, G: wL } = wn(wo),
    wb = wo.lengthSq() > 1e-8 ? wo.clone().normalize() : wE.clone(),
    wx = wH(wb),
    wy = Math.abs(Math.abs(wx) - 90) < 45,
    wW = new w4['Vector3']().crossVectors(wS, wb).normalize();
  wy && wW.dot(wE) < 0 && wW.negate();
  let wq = Math.abs(Math.sin((wx * Math.PI) / 180)) > 0.35,
    wP = (Vt) => Vt.dot(wb),
    wY = (Vt) => Vt.dot(wW),
    wv = wq ? Math.sign(wx) : 1,
    wB = (Vt, VH) => wL(wf[Vt].ank, VH).lerp(wL(wf[Vt].ball, VH), 0.5),
    wG = (Vt, VH) => {
      let VR = ((VH % w6) + w6) % w6;
      return wH(wC(wf[Vt].ball[VR].clone().sub(wf[Vt].ank[VR]))) * wv;
    },
    wg = wq ? (wx > 0 ? 'l' : 'r') : null,
    wI = wg ? (wg === 'l' ? 'r' : 'l') : null,
    wh = {};
  for (let Vt of 'lr') {
    let VH = wX[Vt],
      VR = Vt === 'l' ? 'r' : 'l',
      VQ = [];
    for (let VU = 0; VU < w6; VU++)
      if (VH[VU] && !VH[(VU + w6 - 1) % w6]) {
        let VK = VU;
        for (; VH[(VK + 1) % w6] && VK - VU < w6;) VK++;
        VQ.push({ land: VU, lift: VK });
      }
    let Vj = [],
      Vz = [],
      Vp = [],
      VO = [],
      Vf = [];
    for (let VT = 0; VT < w6; VT++) {
      let VA = wf[Vt].ank[VT].clone().sub(wf[Vt].hip[VT]),
        Vn = wf[Vt].knee[VT].clone().sub(wf[Vt].hip[VT]);
      Vn.addScaledVector(VA, -Vn.dot(VA) / VA.lengthSq());
      let Vo = wC(wf[Vt].ball[VT].clone().sub(wf[Vt].ank[VT])).length(),
        VX = Vn.length() > 0.03 * wZ ? wH(wC(Vn)) * wv : NaN,
        VL = Vo > 0.35 * wf[Vt].ball[VT].distanceTo(wf[Vt].ank[VT]) ? wG(Vt, VT) : NaN;
      ((VH[VT] ? Vj : Vz).push(VL), (VH[VT] ? Vp : VO).push(VX), Vf.push(VA.length() / wZ));
    }
    let VJ = VQ.map((Vb) => {
        let Vx = Vb.land - 1;
        for (; !VH[((Vx % w6) + w6) % w6] && Vb.land - Vx < w6;) Vx--;
        let Vy = wB(Vt, Vx),
          VW = wB(Vt, Vb.land),
          Vq = VW.clone().sub(Vy),
          VP = Math.max(Vq.length(), 0.000001),
          VY = [],
          Vv = 0,
          VB = 0,
          VG = null,
          Vg = null,
          VI = 0;
        for (let Vh = Vx; Vh <= Vb.land; Vh++) {
          let VN = wB(Vt, Vh),
            VM = VN.clone().sub(Vy).dot(Vq) / (VP * VP),
            D0 = wY(VN.clone().sub(Vy).addScaledVector(Vq, -VM)),
            D1 = VN.clone().sub(wB(VR, Vh));
          (Math.abs(D0) > Math.abs(Vv) && ((Vv = D0), (VB = VM)),
            (VI = Math.max(VI, wL(wf[Vt].ank, Vh).y - wA.ank)));
          let D2 = { share: VM, ra: wP(D1), rx: wY(D1) };
          if (Vg && !VG && Vg.ra * D2.ra < 0) {
            let D3 = Vg.ra / (Vg.ra - D2.ra);
            VG = {
              share: Vg.share + (D2.share - Vg.share) * D3,
              across: Vg.rx + (D2.rx - Vg.rx) * D3,
            };
          }
          ((Vg = D2),
            VY.push({
              along: wP(VN),
              across: wY(VN),
              up: wL(wf[Vt].ank, Vh).y - wA.ank,
              toe: wG(Vt, Vh),
            }));
        }
        return {
          frames: Vb.land - Vx,
          length: wP(Vq),
          bow: Vv,
          bowAt: VB,
          pass: VG,
          lift: VI,
          heelRise: wL(wf[Vt].ank, Vx).y - wA.ank,
          path: VY,
        };
      }),
      VZ = VQ.map((Vb) => {
        let Vx = Math.round((Vb.land + Vb.lift) / 2),
          Vy = wB(Vt, Vx);
        return {
          land: Vb.land,
          lift: Vb.lift % w6,
          along: wP(Vy),
          across: wY(Vy),
          toe: wG(Vt, Vx),
        };
      });
    wh[Vt] = {
      down: [...VH],
      duty: VH.reduce((Vb, Vx) => Vb + Vx, 0) / w6,
      prints: VZ,
      swings: VJ,
      track: ko(VZ.map((Vb) => Vb.across)),
      toe: ko(Vj),
      toeAir: xr(Vz),
      knee: ko(Vp),
      kneeAir: ko(VO),
      fold: Math.min(...Vf),
      lift: ko(VJ.map((Vb) => Vb.lift)),
      heelRise: ko(VJ.map((Vb) => Vb.heelRise)),
      bow: ko(VJ.map((Vb) => Vb.bow)),
      bowAt: ko(VJ.map((Vb) => Vb.bowAt)),
      step: ko(VJ.map((Vb) => Vb.length)),
      pass: VJ[0]?.pass ?? null,
    };
  }
  let wN = [],
    wM = [],
    V0 = [],
    V1 = [],
    V2 = { legs: 1 / 0, feet: 1 / 0 },
    V3 = 0;
  for (let Vb = 0; Vb < w6; Vb++) {
    (wN.push(
      wH(
        new w4['Vector3']().crossVectors(
          wC(wf.l.hip[Vb].clone().sub(wf.r.hip[Vb])).normalize(),
          wS,
        ),
      ) * wv,
    ),
      wM.push(
        wH(
          new w4['Vector3']().crossVectors(
            wC(wp[ww.shoulderL][Vb].clone().sub(wp[ww.shoulderR][Vb])).normalize(),
            wS,
          ),
        ) * wv,
      ),
      V0.push(wH(wC(wE.clone().applyQuaternion(wQ[Vb]))) * wv),
      wg && V1.push(wP(wB(wg, Vb).sub(wB(wI, Vb)))),
      !wX.l[Vb] && !wX.r[Vb] && V3++);
    let Vx = wf.l,
      Vy = wf.r;
    V2.legs = Math.min(
      V2.legs,
      Yt(Vx.hip[Vb], Vx.knee[Vb], Vy.hip[Vb], Vy.knee[Vb]),
      Yt(Vx.hip[Vb], Vx.knee[Vb], Vy.knee[Vb], Vy.ank[Vb]),
      Yt(Vx.knee[Vb], Vx.ank[Vb], Vy.hip[Vb], Vy.knee[Vb]),
      Yt(Vx.knee[Vb], Vx.ank[Vb], Vy.knee[Vb], Vy.ank[Vb]),
    );
    let VW = (VY) => {
        let Vv = wC(VY.ball[Vb].clone().sub(VY.ank[Vb])),
          VB = Vv.lengthSq() > 1e-8 ? Vv.normalize() : wE.clone(),
          VG = new w4['Vector3'](
            VY.ank[Vb].x,
            Math.min(VY.ank[Vb].y, VY.ball[Vb].y),
            VY.ank[Vb].z,
          ).addScaledVector(VB, -pn.heel * 100),
          Vg = VY.tip ? VY.tip[Vb].clone() : VY.ball[Vb].clone().addScaledVector(VB, 7),
          VI = Vg.clone().sub(VG),
          Vh = VI.length();
        return (
          Vh > 0.000001 &&
            (VI.multiplyScalar(Math.min(pn.width * 50, Vh / 2 - 0.01) / Vh),
            VG.add(VI),
            Vg.sub(VI)),
          [VG, Vg]
        );
      },
      Vq = VW(Vx),
      VP = VW(Vy);
    V2.feet = Math.min(V2.feet, Yt(Vq[0], Vq[1], VP[0], VP[1]) - pn.width * 100);
  }
  let V4 = (VY) => {
      let [Vv, VB] = xr(VY);
      return { mean: ko(VY), min: Vv, max: VB, swing: (VB - Vv) / 2 };
    },
    V5 = wh.l.prints.length + wh.r.prints.length;
  return {
    skeleton: wk,
    fps: w7,
    frames: w6,
    seconds: w8,
    rootMotion: wT,
    legLen: wZ,
    hipW: wU,
    heading: wx,
    sideways: wy,
    lateral: wq,
    lead: wg,
    trail: wI,
    travel: wo.length(),
    speed: wo.length() / w8,
    steps: V5,
    cadence: (V5 / w8) * 60,
    stepTime: w8 / Math.max(V5, 1),
    flight: V3 / w6,
    feet: wh,
    hips: V4(wN),
    chest: V4(wM),
    head: ko(V0),
    bob: xr(wJ.map((VY) => VY.y)).reduce((VY, Vv) => Vv - VY),
    tracks: Math.abs(wh.l.track - wh.r.track),
    front: wy ? (wh.l.track > wh.r.track ? 'l' : 'r') : null,
    order: wg ? xr(V1) : null,
    gaps: V2,
    series: { hips: wN, chest: wM, head: V0, order: V1 },
  };
}
var Xu = 'actionforge-playground',
  Sr = 'sets',
  Gn = null;
function Ku() {
  return (
    Gn ||
    ((Gn = new Promise((w3, w4) => {
      if (typeof indexedDB > 'u') {
        w4(new Error('This browser has no IndexedDB'));
        return;
      }
      let w5 = indexedDB.open(Xu, 1);
      ((w5.onupgradeneeded = () => {
        w5.result.objectStoreNames.contains(Sr) ||
          w5.result.createObjectStore(Sr, { keyPath: 'id' });
      }),
        (w5.onsuccess = () => w3(w5.result)),
        (w5.onerror = () =>
          w4(w5.error ?? new Error('Could not open the playground\u2019s store'))),
        (w5.onblocked = () =>
          w4(
            new Error(
              'Another tab is holding the playground\u2019s store \u2014 close it and try again',
            ),
          )));
    })),
    Gn.catch(() => {
      Gn = null;
    }),
    Gn)
  );
}
var Mr = (w3, w4) =>
    Ku().then(
      (w5) =>
        new Promise((w6, w7) => {
          let w8 = w5.transaction(Sr, w3),
            w9 = w4(w8.objectStore(Sr)),
            wk;
          ((w9.onsuccess = () => {
            wk = w9.result;
          }),
            (w8.oncomplete = () => w6(wk)),
            (w8.onerror = () => w7(w8.error ?? new Error('The playground\u2019s store failed'))),
            (w8.onabort = () =>
              w7(
                w8.error ??
                  new Error('The playground\u2019s store refused the write (storage full?)'),
              )));
        }),
    ),
  Zu = (w3) => ({
    name: w3.name,
    duration: w3.duration,
    tracks: w3.tracks.map((w4) => ({
      name: w4.name,
      kind: w4.ValueTypeName,
      times: w4.times,
      values: w4.values,
    })),
  }),
  Ju = (w3) =>
    'set.' +
    (String(w3)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '') || 'set'),
  ed = (w3, w4) => ({
    id: Ju(w3),
    name: String(w3 || 'A set').slice(0, 80),
    at: Date.now(),
    clips: w4.map((w5) => ({
      id: w5.id,
      theta: w5.theta,
      clip: Zu(w5.clip),
      N: w5.reading.N,
      down: {
        l: Uint8Array.from(w5.reading.feet.l.down),
        r: Uint8Array.from(w5.reading.feet.r.down),
      },
    })),
  }),
  Un = {
    async send(w3, w4) {
      let w5 = ed(w3, w4);
      await Mr('readwrite', (w6) => w6.put(w5));
      for (let w6 of (await Un.list()).slice(48)) await Un.remove(w6.id);
      return { id: w5.id, name: w5.name };
    },
    async list() {
      return ((await Mr('readonly', (w3) => w3.getAll())) || [])
        .map(({ clips: w3, ...w4 }) => ({ ...w4, count: w3?.length ?? 0 }))
        .sort((w3, w4) => (w4.at || 0) - (w3.at || 0));
    },
    get: (w3) => Mr('readonly', (w4) => w4.get(w3)),
    remove: (w3) => Mr('readwrite', (w4) => w4.delete(w3)),
  };
function td(w3) {
  let w4 = w3.clone(!0),
    w5 = [];
  w4.traverse((w6) => {
    (w6.isMesh || w6.isLine || w6.isCamera || w6.isLight) && w5.push(w6);
  });
  for (let w6 of w5) w6.removeFromParent();
  return (w4.updateMatrixWorld(!0), w4);
}
function od(w3) {
  let w4 = (w5) =>
    w5?.isMeshPhongMaterial || w5?.isMeshLambertMaterial
      ? new kZ({
          name: w5.name,
          color: w5.color,
          map: w5.map,
          normalMap: w5.normalMap,
          emissive: w5.emissive,
          emissiveMap: w5.emissiveMap,
          alphaMap: w5.alphaMap,
          transparent: w5.transparent,
          opacity: w5.opacity,
          alphaTest: w5.alphaTest,
          side: w5.side,
          roughness: 0.8,
          metalness: 0,
        })
      : w5;
  w3.traverse((w5) => {
    w5.isMesh && (w5.material = Array.isArray(w5.material) ? w5.material.map(w4) : w4(w5.material));
  });
}
function nd(w3) {
  let w4 = new kZ({ name: 'grey', color: 11844033, roughness: 0.75, metalness: 0 });
  w3.traverse((w5) => {
    w5.isMesh && (w5.material = w4);
  });
}
async function vc({ ref: w3, manifest: w4, assetRoot: w5, template: w6, rigBytes: w7, parse: w8 }) {
  let w9 = new kR();
  if (!w3) {
    let wQ = k9(w6);
    w9.add(wQ);
    let wj = () => {
      let wz = k9(w9);
      return {
        rig: wz.children[0],
        body: wz,
        overlay: null,
        drive: null,
        fitter: null,
        name: 'Our mannequin',
        again: wj,
      };
    };
    return {
      rig: wQ,
      body: w9,
      overlay: null,
      drive: null,
      fitter: null,
      name: 'Our mannequin',
      again: wj,
    };
  }
  let wk = null;
  if (w3.startsWith('o.')) {
    let wz = w4.characters?.[w3.slice(2)];
    if (!wz) throw new Error('the site no longer carries it');
    wk = {
      buffer: await (await fetch(w5 + '/' + wz.file)).arrayBuffer(),
      format: wz.format || 'glb',
      map: null,
      name: wz.label ?? w3,
      grey: wz.material === 'grey',
    };
  } else {
    let wp = await f.get(w3);
    if (!wp) throw new Error('it is no longer kept in this browser');
    wk = {
      buffer: await wp.blob.arrayBuffer(),
      format: wp.format || 'glb',
      map: wp.map ?? null,
      name: wp.name || w3,
      grey: !1,
    };
  }
  let ww;
  if (wk.format === 'fbx') {
    let { FBXLoader: wO } = await import('./dependencies/fbx-loader.js'),
      wf;
    try {
      wf = new wO().parse(wk.buffer, '');
    } catch (wU) {
      try {
        wf = new wO().parse(g(new Uint8Array(wk.buffer)), '');
      } catch {
        throw wU;
      }
    }
    let wJ = Q(wf),
      wZ = [];
    (wJ.traverse((wK) => {
      wK.isSkinnedMesh && wZ.push(wK);
    }),
      s(wZ, kD),
      od(wJ),
      (ww = { scene: wJ, parser: { json: {} } }));
  } else ww = await w8(wk.buffer.slice(0));
  wk.grey && nd(ww.scene);
  let wV = B(w6, kD),
    wD = G(ww, wV, kD);
  if (
    wD.tier === 'reject' &&
    ((wD.stats?.coreFound ?? 1 / 0) < 8 ||
      /no skinned mesh|Missing (a main bone|main bones)/.test(wD.errors.join(' ')))
  ) {
    let wK = W(ww, wV, kD, {
      map: wk.map,
      rigMaps: (wT) => J.find(wT),
      preset: await H(ww.scene, w5, kD).catch(() => null),
    });
    wK.tier === 'custom' && (wD = wK);
  }
  if (!(wD.tier === 'exact' || wD.tier === 'proportions' || (wD.tier === 'custom' && wD.ready)))
    throw new Error(
      wD.tier === 'custom'
        ? 'not all of its main bones are matched to ours yet \u2014 match them in the Character tool on the main page'
        : /no skinned mesh/.test((wD.errors ?? []).join(' '))
          ? 'it has no skeleton \u2014 rig it in the Character tool on the main page'
          : (wD.errors?.[0] ?? 'it doesn\u2019t fit our skeleton'),
    );
  let wm = (await w8(w7.slice(0))).scene;
  wm.updateMatrixWorld(!0);
  let wS = td(wm),
    wE =
      wD.tier === 'custom'
        ? q(wm, ww, wD, kD, { moveJoints: F, cloneSkinned: k9 })
        : C(wm, ww, wD, kD).scene,
    wF = wE.companion ? wE.scene : wE,
    wC = wE.companion ? wE : null;
  (w9.add(wF),
    wC && w9.add(wC.companion),
    w9.traverse((wT) => {
      wT.isMesh && ((wT.frustumCulled = !1), (wT.castShadow = !0));
    }));
  let wH = x({ ours: wS, theirs: wF, THREE: kD }),
    we = wk.name,
    wR = () => {
      let wT = k9(w9),
        wA = wT.children[0],
        wn = wC ? wT.children[1] : null;
      return {
        rig: wA,
        body: wT,
        overlay: null,
        drive: wC ? wC.driverFor(wA, wn) : null,
        fitter: wH,
        name: we,
        again: wR,
      };
    };
  return {
    rig: wF,
    body: w9,
    overlay: wC?.overlay ?? null,
    drive: wC ? () => wC.drive() : null,
    fitter: wH,
    custom: wC,
    name: we,
    again: wR,
  };
}
function kc({
  undoBtn: w3,
  redoBtn: w4,
  state: w5,
  apply: w6,
  ready: w7,
  busy: w8,
  most: w9 = 200,
}) {
  let wk = [],
    ww = [],
    wV = () => {
      ((w3.disabled = !wk.length), (w4.disabled = !ww.length));
    };
  function wD(wS) {
    (wk.push(w5(wS)), wk.length > w9 && wk.shift(), (ww.length = 0), wV());
  }
  function wm(wS, wE) {
    !wS.length || !w7() || (wE.push(w5()), w6(JSON.parse(wS.pop())));
  }
  return (
    w3.addEventListener('click', () => wm(wk, ww)),
    w4.addEventListener('click', () => wm(ww, wk)),
    addEventListener('keydown', (wS) => {
      let wE = wS.key.toLowerCase(),
        wF =
          wS.target instanceof HTMLElement &&
          wS.target.matches('input:not([type=checkbox]):not([type=range]), textarea, select');
      !(wS.ctrlKey || wS.metaKey) ||
        (wE !== 'z' && wE !== 'y') ||
        wF ||
        w8() ||
        (wm(wE === 'y' || wS.shiftKey ? ww : wk, wE === 'y' || wS.shiftKey ? wk : ww),
        wS.preventDefault());
    }),
    {
      mark: wD,
      drop() {
        (wk.pop(), wV());
      },
      clear() {
        ((wk.length = ww.length = 0), wV());
      },
      shown: wV,
      count: () => [wk.length, ww.length],
    }
  );
}
function bc(w3) {
  let {
      els: w4,
      CHANNELS: w5,
      curves: w6,
      undo: w7,
      sides: w8,
      sideColour: w9,
      src: wk,
      roundNow: ww,
      framesNow: wV,
      noFeetNow: wD,
      viewOf: wm,
      chanOf: wS,
      rangeOf: wE,
      stancesNow: wF,
      resetCurve: wC,
    } = w3,
    wH = w7.mark,
    we = (DO) => DO - Math.floor(DO),
    wR = (DO) => Math.min(Math.max(DO, 0), 1),
    wQ = (DO) => (ww() ? we(DO) : wR(DO)),
    wj = (DO, Df) => (ww() ? bn(DO, Df) : dr(DO, Df)),
    wz = new Set(),
    wp = null,
    wO = [],
    wf = () => !ww() || w4.curveOne.checked,
    wJ = () => wD() && !w5[w4.curveChan.value]?.ctl,
    wZ = !1;
  try {
    wZ = localStorage.getItem('actionforge.lab.onecycle') === '1';
  } catch {}
  ((w4.curveOne.checked = wZ),
    w4.curveOne.addEventListener('change', () => {
      wZ = w4.curveOne.checked;
      try {
        localStorage.setItem('actionforge.lab.onecycle', wZ ? '1' : '0');
      } catch {}
      wq();
    }));
  let wU = () => wm(w4.curveChan.value),
    wK = Object.fromEntries(Object.keys(w5).map((DO) => [DO, !1])),
    wT = () => {
      let DO = w4.curveChan.value;
      return w4.curveAdv.checked
        ? Object.keys(w5).filter(
            (Df) =>
              Df === DO ||
              wz.has(Df) ||
              (wK[Df] && (!w4.curveOnly.checked || w5[Df].group === w5[DO].group)),
          )
        : [DO];
    },
    wA = 16;
  function wX() {
    let DO = w4.hipCurve,
      Df = devicePixelRatio || 1,
      DJ = Math.round(DO.clientWidth * Df),
      DZ = Math.round(DO.clientHeight * Df);
    return (
      (DO.width !== DJ || DO.height !== DZ) && ((DO.width = DJ), (DO.height = DZ)),
      {
        W: DJ,
        H: DZ,
        dpr: Df,
        x0: 8 * Df,
        x1: DJ - 8 * Df,
        y0: (wA + 8) * Df,
        y1: DZ - (6 + 7 * w8.length) * Df,
      }
    );
  }
  let wL = { x0: 0, x1: 1, zy: 1, py: 0 };
  function wb(DO, Df = wX()) {
    let DJ = wE(DO),
      { W: DZ, H: DU, dpr: DK, x0: DT, x1: DA, y0: DX, y1: DL } = Df,
      Db = wL.x1 - wL.x0,
      Dx = (DP) => w5[DP].unit ?? 'cm',
      Dy =
        w4.curveAdv.checked && !w4.curveNorm.checked
          ? Math.max(
              ...wT()
                .filter((DP) => Dx(DP) === Dx(DO))
                .map((DP) => wE(DP).half),
              DJ.half,
            )
          : DJ.half,
      DW = Dy / wL.zy,
      Dq = DJ.mid + wL.py * Dy;
    return {
      W: DZ,
      H: DU,
      dpr: DK,
      mid: Dq,
      half: DW,
      own: Dy,
      y0: DX,
      y1: DL,
      X: (DA - DT) / Db,
      Y: (DL - DX) / (2 * DW),
      px: (DP) => DT + ((DP - wL.x0) / Db) * (DA - DT),
      py: (DP) => DX + ((Dq + DW - DP) / (2 * DW)) * (DL - DX),
      u: (DP) => wL.x0 + ((DP - DT) / (DA - DT)) * Db,
      v: (DP) => Dq + DW - ((DP - DX) / (DL - DX)) * 2 * DW,
    };
  }
  let wx = () => wb(w4.curveChan.value),
    wy = (DO) => {
      if (wf()) return DO >= wL.x0 - 0.03 && DO <= wL.x1 + 0.03 ? [0] : [];
      let Df = [];
      for (let DJ = Math.floor(wL.x0 - DO); DJ <= Math.ceil(wL.x1 - DO); DJ++)
        DO + DJ >= wL.x0 - 0.03 && DO + DJ <= wL.x1 + 0.03 && Df.push(DJ);
      return Df;
    },
    wW = 46;
  function wq() {
    if (!wf()) return;
    let DO = Math.min(wL.x1 - wL.x0, 1);
    ((wL.x0 = Math.min(Math.max(wL.x0, 0), 1 - DO)), (wL.x1 = wL.x0 + DO));
  }
  function wP(DO, Df, DJ, DZ = 0) {
    let DU = wQ(DO.u + DO.du),
      DK = DJ(DU),
      DT = 0.004,
      DA = (DJ(DU + DT) - DK) / DT,
      DX = (DK - DJ(DU - DT)) / DT,
      DL = Df.px(DU + DZ),
      Db = Df.py(DK),
      Dx = (Dy, DW) => {
        let Dq = DW * Df.X,
          DP = -DW * Dy * Df.Y,
          DY = Math.hypot(Dq, DP) || 1;
        return [DL + (Dq / DY) * wW * Df.dpr, Db + (DP / DY) * wW * Df.dpr];
      };
    return {
      p: DU,
      v: DK,
      kx: DL,
      ky: Db,
      out: DA,
      into: DX,
      tipOut: Dx(DA, 1),
      tipIn: Dx(DX, -1),
    };
  }
  let wY = (DO, Df) =>
      DO.key === Df.key &&
      DO.of === Df.of &&
      !!DO.twin == !!Df.twin &&
      (DO.part ?? null) === (Df.part ?? null),
    wv = (DO, Df) =>
      wO.some((DJ) => !DJ.part && DJ.key === DO && DJ.of === Df.of && !!DJ.twin == !!Df.twin),
    wB = (DO, Df, DJ) =>
      wO.some((DZ) => DZ.part === DJ && DZ.key === DO && DZ.of === Df.of && !!DZ.twin == !!Df.twin),
    wG = (DO, Df) => wO.some((DJ) => DJ.key === DO && DJ.of === Df.of && !!DJ.twin == !!Df.twin),
    wg = () => (wJ() ? [] : wT().filter((DO) => w5[DO])),
    wI = (DO) => (DO === w4.curveChan.value ? wU() : wm(DO)),
    wh = (DO) => wS(DO.key)?.keys[DO.of] ?? null,
    wN = () =>
      wO
        .filter(
          (DO, Df, DJ) =>
            w5[DO.key] &&
            DJ.findIndex((DZ) => DZ.key === DO.key && DZ.of === DO.of && !!DZ.twin == !!DO.twin) ===
              Df,
        )
        .map((DO) => ({ key: DO.key, of: DO.of, twin: !!DO.twin })),
    wM = () => wO.some((DO) => !DO.part);
  function V0() {
    let DO = new Map();
    for (let Df of wO)
      Df.part ||
        !wS(Df.key) ||
        (DO.has(Df.key) || DO.set(Df.key, new Map()),
        DO.get(Df.key).has(Df.of) || DO.get(Df.key).set(Df.of, !!Df.twin));
    return DO;
  }
  function V1(DO) {
    let Df = (DK) => DK?.i != null && DK.i !== N,
      DJ = ww(),
      DZ = new Map(),
      DU = [...DO].sort((DK, DT) => wQ(DK.u + DK.du) - wQ(DT.u + DT.du));
    return (
      DU.forEach((DK, DT) =>
        DZ.set(DK, { hasIn: !Df(DU[DT - 1] ?? (DJ ? DU[DU.length - 1] : null)), hasOut: !Df(DK) }),
      ),
      DZ
    );
  }
  let V2 = (DO) =>
      [0.001, 0.002, 0.005, 0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 45, 90].find(
        (Df) => Df * DO.Y >= 24 * DO.dpr,
      ) ?? 90,
    V3 = 0;
  function V4(DO, Df = !1) {
    w4.curveHint &&
      ((w4.curveHint.textContent = DO),
      clearTimeout(V3),
      !Df &&
        DO &&
        (V3 = setTimeout(() => {
          V7?.kind !== 'xf' && (w4.curveHint.textContent = '');
        }, 3000)));
  }
  function V5(DO = null) {
    if (!wk() || !w4.hipCurve.clientWidth) return;
    if (wJ()) {
      let m2 = w4.hipCurve;
      m2.getContext('2d').clearRect(0, 0, m2.width, m2.height);
      return;
    }
    let Df = wX(),
      DJ = wb(w4.curveChan.value, Df),
      DZ = w4.hipCurve.getContext('2d'),
      { key: DU, def: DK, side: DT, ch: DA, s: DX, at: DL, keys: Db } = wU(),
      Dx = w4.curveAdv.checked,
      Dy = (m3) => '#' + m3.toString(16).padStart(6, '0'),
      DW = wL.x0,
      Dq = wL.x1,
      DP = [];
    for (let m3 = Math.floor(DW); m3 < Math.ceil(Dq); m3++) DP.push(m3);
    let DY = (m4, m5, m6, m7) => {
      for (let m8 of [...DP, DP[0] - 1])
        DZ.fillRect(DJ.px(m4 + m8), m6, DJ.px(m5 + m8) - DJ.px(m4 + m8), m7);
    };
    DZ.clearRect(0, 0, DJ.W, DJ.H);
    let Dv = wf();
    if (
      (Dv &&
        (DZ.save(),
        DZ.beginPath(),
        DZ.rect(DJ.px(0) - 6 * DJ.dpr, 0, DJ.px(1) - DJ.px(0) + 12 * DJ.dpr, DJ.H),
        DZ.clip()),
      DK.foot)
    ) {
      DZ.fillStyle = '#1b1b1b';
      for (let [m4, m5] of wF(DT)) DY(m4, m5, 0, DJ.y1);
    }
    w8.forEach((m6, m7) => {
      DZ.fillStyle = Dy(w9[m6]);
      for (let [m8, m9] of wF(m6)) {
        (DY(m8, m9, DJ.y1 + (5 + m7 * 7) * DJ.dpr, 5 * DJ.dpr), (DZ.globalAlpha = 0.35));
        for (let mk of DP) DZ.fillRect(DJ.px(m8 + mk), 0, DJ.dpr, DJ.y1);
        DZ.globalAlpha = 1;
      }
    });
    let DB = (m6, m7, m8) => m8.find((m9) => m9 * m6 >= m7) ?? m8[m8.length - 1];
    ((DZ.lineWidth = DJ.dpr), (DZ.font = 9 * DJ.dpr + 'px ui-monospace, Consolas, monospace'));
    let DG = wV(),
      Dg = DB(DJ.X / DG, 34 * DJ.dpr, [1, 2, 5, 10, 20, 50, 100]);
    ((DZ.textBaseline = 'bottom'), (DZ.textAlign = 'left'));
    for (let m6 = Math.ceil((DW * DG) / Dg) * Dg; m6 <= Dq * DG; m6 += Dg) {
      let m7 = DJ.px(m6 / DG),
        m8 = m6 % DG === 0;
      ((DZ.strokeStyle = m8 ? '#3a3a3a' : '#1f1f1f'),
        DZ.beginPath(),
        DZ.moveTo(m7, 0),
        DZ.lineTo(m7, DJ.y1),
        DZ.stroke(),
        (DZ.fillStyle = '#666'),
        DZ.fillText(String(ww() ? ((m6 % DG) + DG) % DG : m6), m7 + 3 * DJ.dpr, DJ.y1));
    }
    let DI = DK.scale ?? 100,
      Dh = DB(
        DJ.Y,
        24 * DJ.dpr,
        [0.001, 0.002, 0.005, 0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 45, 90],
      );
    DZ.textBaseline = 'middle';
    for (let m9 = Math.ceil((DJ.mid - DJ.half) / Dh) * Dh; m9 <= DJ.mid + DJ.half; m9 += Dh) {
      let mk = DJ.py(m9);
      mk < 8 * DJ.dpr ||
        mk > DJ.y1 - 10 * DJ.dpr ||
        ((DZ.strokeStyle = '#1f1f1f'),
        DZ.beginPath(),
        DZ.moveTo(0, mk),
        DZ.lineTo(DJ.W, mk),
        DZ.stroke(),
        (DZ.fillStyle = '#666'),
        DZ.fillText('' + (m9 * DI).toFixed(Dh * DI < 1 ? 1 : 0), 3 * DJ.dpr, mk - 6 * DJ.dpr));
    }
    let DN = Math.max(DX.length, Math.round(DJ.W / (2 * DJ.dpr))),
      DM = (mw, mV, mD, mm = DJ) => {
        ((DZ.strokeStyle = mV), (DZ.lineWidth = mD * DJ.dpr), DZ.beginPath());
        for (let mS = 0; mS <= DN; mS++) {
          let mE = DW + ((Dq - DW) * mS) / DN,
            mF = mm.px(mE),
            mC = mm.py(mw(mE));
          mS ? DZ.lineTo(mF, mC) : DZ.moveTo(mF, mC);
        }
        DZ.stroke();
      },
      m0 = wg().map((mw) =>
        mw === DU
          ? { key: mw, v: { def: DK, side: DT, ch: DA, s: DX, at: DL, keys: Db }, fr: DJ }
          : { key: mw, v: wm(mw), fr: wb(mw, Df) },
      );
    for (let { key: mw, v: mV, fr: mD } of m0)
      mw !== DU &&
        ((DZ.globalAlpha = 0.75), DM(mV.at, mV.def.colour, 1.5, mD), (DZ.globalAlpha = 1));
    let m1 = Dx ? DK.colour : DK.foot ? Dy(w9[DT]) : '#09c5cc';
    (DM((mm) => wj(DX, mm), '#666', 1), DM(DL, m1, Dx ? 2.5 : 2));
    for (let mm of w3.marksOf?.(DU, DT) ?? []) {
      let mS = Dv ? [mm.u, ...(mm.u === 0 ? [1] : [])] : wy(mm.u).map((mE) => mm.u + mE);
      ((DZ.strokeStyle = DZ.fillStyle = '#ff6b6b'),
        (DZ.lineWidth = 2 * DJ.dpr),
        (DZ.textBaseline = 'bottom'),
        (DZ.textAlign = 'left'));
      for (let mE of mS) {
        let mF = DJ.px(mE),
          mC = DJ.py(mm.from),
          mH = DJ.py(mm.to);
        (DZ.beginPath(),
          DZ.moveTo(mF, mC),
          DZ.lineTo(mF, mH),
          DZ.stroke(),
          DZ.beginPath(),
          DZ.arc(mF, mC, 3.5 * DJ.dpr, 0, Math.PI * 2),
          DZ.stroke(),
          DZ.beginPath(),
          DZ.arc(mF, mH, 3 * DJ.dpr, 0, Math.PI * 2),
          DZ.fill());
        let mR = Math.min(mC, mH) - 4 * DJ.dpr,
          mQ = mR - 10 * DJ.dpr < (wA + 14) * DJ.dpr ? Math.max(mC, mH) + 15 * DJ.dpr : mR;
        mm.text &&
          DZ.fillText(
            mm.text,
            Math.min(mF + 6 * DJ.dpr, DJ.W - DZ.measureText(mm.text).width - 4 * DJ.dpr),
            mQ,
          );
      }
      DZ.lineWidth = DJ.dpr;
    }
    for (let { key: mj, v: mz, fr: mp } of [...m0].sort(
      (mO, mf) => (mO.key === DU) - (mf.key === DU),
    )) {
      let mO = mj === DU ? m1 : mz.def.colour,
        mf = V1(mz.keys);
      for (let mJ of mz.keys) {
        if (!wG(mj, mJ)) continue;
        let mZ = mz.ch.keys[mJ.of],
          mU = mf.get(mJ);
        for (let mK of wy(wQ(mJ.u + mJ.du))) {
          let mT = wP(mJ, mp, mz.at, mK);
          for (let [mA, mX, mL] of [
            ['in', mT.tipIn, mU.hasIn],
            ['out', mT.tipOut, mU.hasOut],
          ]) {
            if (!mL) continue;
            let mb = V7,
              mx =
                (mb?.kind === 'handle' &&
                mb.tip &&
                mb.key === mj &&
                mb.of === mJ.of &&
                !!mb.twin == !!mJ.twin &&
                mb.side === mA &&
                mb.turn === mK
                  ? mb.tip
                  : null) ?? mX,
              my = wB(mj, mJ, mA);
            ((DZ.strokeStyle = my ? '#fff' : 'rgba(255, 255, 255, 0.7)'),
              (DZ.lineWidth = DJ.dpr),
              DZ.beginPath(),
              DZ.moveTo(mT.kx, mT.ky),
              DZ.lineTo(mx[0], mx[1]),
              DZ.stroke(),
              DZ.beginPath(),
              DZ.arc(mx[0], mx[1], (my ? 4.5 : 3.5) * DJ.dpr, 0, Math.PI * 2),
              my
                ? ((DZ.fillStyle = '#fff'),
                  DZ.fill(),
                  (DZ.lineWidth = 1.5 * DJ.dpr),
                  (DZ.strokeStyle = mO),
                  DZ.stroke())
                : V6(mZ)
                  ? ((DZ.fillStyle = '#fff'), DZ.fill())
                  : ((DZ.fillStyle = '#12161c'), DZ.fill(), DZ.stroke()));
          }
        }
      }
      for (let mW of mz.keys)
        for (let mq of wy(wQ(mW.u + mW.du))) {
          let mP = mz.ch.keys[mW.of],
            mY = wP(mW, mp, mz.at, mq),
            mv = mP.du || mP.dv || V6(mP) || mP.i,
            mB = wv(mj, mW),
            mG = (mB ? 6 : 4.5) * DJ.dpr;
          (mj === DU &&
            (mP.du || mP.dv) &&
            !mW.lock &&
            !DK.foot &&
            ((DZ.strokeStyle = '#888'),
            (DZ.lineWidth = DJ.dpr),
            DZ.beginPath(),
            DZ.arc(DJ.px(mW.u + mq), DJ.py(wj(DX, mW.u)), 3 * DJ.dpr, 0, Math.PI * 2),
            DZ.stroke()),
            (DZ.fillStyle = mB
              ? '#fff'
              : mv
                ? '#ffd166'
                : mW.lock
                  ? w4.curvePlant.checked
                    ? '#bbb'
                    : '#666'
                  : mO),
            (DZ.globalAlpha = mB || mj === DU ? 1 : 0.85),
            DZ.beginPath(),
            mW.lock
              ? DZ.rect(mY.kx - mG * 0.85, mY.ky - mG * 0.85, mG * 1.7, mG * 1.7)
              : DZ.arc(mY.kx, mY.ky, mG, 0, Math.PI * 2),
            DZ.fill(),
            (DZ.globalAlpha = 1),
            (DZ.lineWidth = 1.5 * DJ.dpr),
            (DZ.strokeStyle = mB ? mO : '#12161c'),
            DZ.stroke());
        }
    }
    if (
      ((DZ.fillStyle = '#888'),
      (DZ.textBaseline = 'top'),
      (DZ.textAlign = 'right'),
      Dv && DZ.restore(),
      (DZ.fillStyle = '#888'),
      (DZ.textBaseline = 'top'),
      (DZ.textAlign = 'right'),
      DZ.fillText(DK.up + ' \u2191  ' + (DK.unit ?? 'cm'), DJ.W - 4 * DJ.dpr, (wA + 2) * DJ.dpr),
      (DZ.textAlign = 'left'),
      V7?.kind === 'box')
    ) {
      let mg = V7;
      ((DZ.strokeStyle = '#fff'),
        (DZ.lineWidth = DJ.dpr),
        DZ.setLineDash([4 * DJ.dpr, 3 * DJ.dpr]),
        DZ.strokeRect(mg.px0, mg.py0, mg.px1 - mg.px0, mg.py1 - mg.py0),
        DZ.setLineDash([]));
    }
    if (V7?.kind === 'xf' && V7.mode !== 'move') {
      let mI = V7;
      ((DZ.strokeStyle = 'rgba(255, 255, 255, 0.6)'),
        (DZ.lineWidth = DJ.dpr),
        DZ.setLineDash([3 * DJ.dpr, 3 * DJ.dpr]),
        DZ.beginPath(),
        DZ.moveTo(mI.pivot[0], mI.pivot[1]),
        DZ.lineTo(mI.last[0], mI.last[1]),
        DZ.stroke(),
        DZ.setLineDash([]),
        DZ.beginPath(),
        DZ.arc(mI.pivot[0], mI.pivot[1], 4 * DJ.dpr, 0, Math.PI * 2),
        DZ.stroke());
    }
    if (
      ((DZ.fillStyle = 'rgba(255,255,255,0.07)'), DZ.fillRect(0, 0, DJ.W, wA * DJ.dpr), DO != null)
    ) {
      ((DZ.strokeStyle = DZ.fillStyle = '#fff'), (DZ.lineWidth = DJ.dpr));
      for (let mh of DP) {
        let mN = DJ.px(DO + mh);
        (DZ.beginPath(),
          DZ.moveTo(mN, 0),
          DZ.lineTo(mN, DJ.H),
          DZ.stroke(),
          DZ.beginPath(),
          DZ.moveTo(mN - 5 * DJ.dpr, 0),
          DZ.lineTo(mN + 5 * DJ.dpr, 0),
          DZ.lineTo(mN, 9 * DJ.dpr),
          DZ.fill());
      }
    }
    DR();
  }
  let V6 = (DO) => DO.tin != null || DO.tout != null || DO.type === 'vector',
    V7 = null,
    V8 = null,
    V9 = (DO) => {
      let Df = wx(),
        DJ = w4.hipCurve.getBoundingClientRect();
      return { f: Df, px: (DO.clientX - DJ.left) * Df.dpr, py: (DO.clientY - DJ.top) * Df.dpr };
    };
  function Vk(DO, Df) {
    let DJ = wX(),
      DZ = w4.curveChan.value,
      DU = null,
      DK = null;
    for (let DT of wg()) {
      let DA = wI(DT),
        DX = wb(DT, DJ),
        DL = V1(DA.keys);
      for (let Db of DA.keys)
        for (let Dx of wy(wQ(Db.u + Db.du))) {
          let Dy = wP(Db, DX, DA.at, Dx);
          if (wG(DT, Db)) {
            let Dq = DL.get(Db);
            for (let [DP, DY, Dv] of [
              ['out', Dy.tipOut, Dq.hasOut],
              ['in', Dy.tipIn, Dq.hasIn],
            ]) {
              let DB = Dv ? Math.hypot(DY[0] - DO, DY[1] - Df) : 1 / 0;
              DB < 9 * DJ.dpr &&
                (!DU || DB < DU.d) &&
                (DU = { kind: 'handle', key: DT, k: Db, side: DP, turn: Dx, d: DB });
            }
          }
          let DW = Math.hypot(Dy.kx - DO, Dy.ky - Df) - (DT === DZ ? 0.5 * DJ.dpr : 0);
          DW < 11 * DJ.dpr &&
            (!DK || DW < DK.d) &&
            (DK = { kind: 'key', key: DT, k: Db, turn: Dx, d: DW });
        }
    }
    return DU && (!DK || DU.d < DK.d) ? DU : DK;
  }
  let Vw = (DO) => DO.type ?? (V6(DO) ? 'aligned' : 'auto');
  function VV(DO, Df = !1) {
    if (!DO) wO = [];
    else {
      let DJ = {
        key: DO.key ?? w4.curveChan.value,
        of: DO.of,
        twin: !!DO.twin,
        part: DO.part ?? null,
      };
      wO = Df ? (wO.some((DZ) => wY(DZ, DJ)) ? wO.filter((DZ) => !wY(DZ, DJ)) : [...wO, DJ]) : [DJ];
    }
    Vm();
  }
  function VD(DO, Df = 'set') {
    let DJ = DO.map((DZ) => ({ key: DZ.key, of: DZ.of, twin: !!DZ.twin, part: null }));
    (Df === 'take'
      ? (wO = wO.filter(
          (DZ) => !DJ.some((DU) => DU.key === DZ.key && DU.of === DZ.of && DU.twin === !!DZ.twin),
        ))
      : (wO = [...(Df === 'add' ? wO.filter((DZ) => !DJ.some((DU) => wY(DZ, DU))) : []), ...DJ]),
      Vm());
  }
  function Vm() {
    let DO = wO[wO.length - 1] ?? null;
    ((wp = DO ? { key: DO.key, of: DO.of, twin: !!DO.twin } : null),
      wp && w5[wp.key] && wp.key !== w4.curveChan.value && ((w4.curveChan.value = wp.key), Dz(!0)));
    let Df = wp && wh(wp);
    ((w4.curveHandle.disabled = w4.curveFlat.disabled = !Df),
      (w4.curveHandle.value = Df ? Vw(Df) : 'auto'));
  }
  let VS = () =>
      wg().flatMap((DO) =>
        wI(DO).keys.map((Df) => ({ key: DO, of: Df.of, twin: !!Df.twin, p: wQ(Df.u + Df.du) })),
      ),
    VE = () => VD(VS()),
    VF = () =>
      VD(
        VS().filter(
          (DO) =>
            !wO.some(
              (Df) => !Df.part && Df.key === DO.key && Df.of === DO.of && !!Df.twin === DO.twin,
            ),
        ),
      ),
    VC = (DO, Df = !1) =>
      VD(
        VS().filter((DJ) => DJ.key === DO),
        Df ? 'add' : 'set',
      );
  function VH(DO, Df = !1) {
    let DJ = 0.5 / wV(),
      DZ = (DU) => Math.abs(ww() ? ((DU - DO + 1.5) % 1) - 0.5 : DU - DO) < DJ;
    VD(
      VS().filter((DU) => DZ(DU.p)),
      Df ? 'add' : 'set',
    );
  }
  let VR = (DO, Df = !1) => {
      let DJ = +w4.time.value;
      VD(
        VS().filter((DZ) => (DO < 0 ? DZ.p <= DJ : DZ.p >= DJ)),
        Df ? 'add' : 'set',
      );
    },
    VQ = () => {
      let DO = new Set(wO.map((Df) => Df.key));
      VD(VS().filter((Df) => DO.has(Df.key)));
    };
  function Vj(DO, Df, DJ, DZ) {
    let DU = wX(),
      DK = [];
    for (let DT of wg()) {
      let DA = wI(DT),
        DX = wb(DT, DU);
      for (let DL of DA.keys)
        wy(wQ(DL.u + DL.du)).some((Db) => {
          let Dx = wP(DL, DX, DA.at, Db);
          return Dx.kx >= DO && Dx.kx <= Df && Dx.ky >= DJ && Dx.ky <= DZ;
        }) && DK.push({ key: DT, of: DL.of, twin: !!DL.twin });
    }
    return DK;
  }
  function Vz(DO, Df, DJ = wI(DO)) {
    let DZ = DJ.ch,
      DU = DJ.keys,
      DK = ww(),
      DT = [...Df.keys()].filter(
        (DX) => DZ.keys[DX] && (!DZ.keys[DX].lock || w4.curvePlant.checked),
      );
    if (
      !DT.length ||
      (!DK && DT.some((DX) => DZ.keys[DX].u <= 0.000001 || DZ.keys[DX].u >= 1 - 0.000001))
    )
      return;
    let DA = DT.map((DX) => {
      let DL = Df.get(DX);
      return (
        DK && (DL -= Math.round(DL)),
        { i: DX, was: DZ.keys[DX].du, stood: wQ(DZ.keys[DX].u) + DZ.keys[DX].du, by: DL }
      );
    }).sort((DX, DL) => DX.stood - DL.stood);
    for (let DX of DA) {
      let DL = -0.45 - DX.was,
        Db = 0.45 - DX.was;
      for (let Dx of DU) {
        if (DT.includes(Dx.of)) continue;
        let Dy = Dx.u + Dx.du - DX.stood;
        if (DK) {
          let DW = Dy - Math.ceil(Dy),
            Dq = Dy - Math.floor(Dy);
          ((DL = Math.max(DL, DW + 0.02)), (Db = Math.min(Db, Dq - 0.02)));
        } else Dy < 0 ? (DL = Math.max(DL, Dy + 0.02)) : (Db = Math.min(Db, Dy - 0.02));
      }
      (DK || ((DL = Math.max(DL, 0.004 - DX.stood)), (Db = Math.min(Db, 0.996 - DX.stood))),
        (DX.lo = DL),
        (DX.hi = Db));
    }
    if (new Set(DA.map((DP) => +DP.by.toFixed(9))).size === 1) {
      let DP = Math.max(...DA.map((DB) => DB.lo)),
        DY = Math.min(...DA.map((DB) => DB.hi)),
        Dv = DP > DY ? 0 : Math.min(Math.max(DA[0].by, DP), DY);
      for (let DB of DA) DZ.keys[DB.i].du = DB.was + Dv;
    } else {
      let DG = -1 / 0;
      for (let Dg of DA) {
        let DI = Dg.lo > Dg.hi ? 0 : Math.min(Math.max(Dg.by, Dg.lo), Dg.hi);
        (Dg.stood + DI < DG + 0.02 && (DI = Math.min(DG + 0.02 - Dg.stood, Math.max(Dg.hi, 0))),
          (DZ.keys[Dg.i].du = Dg.was + DI),
          (DG = Dg.stood + DI));
      }
    }
    DT.some((Dh) => DZ.keys[Dh].lock) && w3.plantMoved(DO);
  }
  function Vp(DO, Df) {
    let DJ = wS(DO);
    for (let [DZ, { by: DU, twin: DK }] of Df) {
      let DT = DJ?.keys[DZ];
      DT && !DT.lock && Number.isFinite(DU) && (DT.dv += DU * (DJ.flip && DK ? -1 : 1));
    }
  }
  function VO(DO, Df, DJ, DZ, DU, DK = !1) {
    let DT = wI(DO),
      DA = DT.keys.find((Dq) => Dq.of === Df && !!Dq.twin == !!DJ),
      DX = DT.ch.keys[Df];
    if (!DA || !DX || !Number.isFinite(DU)) return;
    let DL = wP(DA, wb(DO), DT.at),
      Db = DT.ch.flip && DA.twin ? -1 : 1,
      Dx = DZ === 'out',
      Dy = Vw(DX),
      DW = DK || Dy === 'free' || Dy === 'vector';
    (DW &&
      ((DX.tin ??= DA.tin * Db),
      (DX.tout ??= DA.tout * Db),
      Dy === 'vector' && ((DX.tin = DA.tin * Db), (DX.tout = DA.tout * Db))),
      (Dx || !DW) && (DX.tout = (DA.tout + DU - DL.out) * Db),
      (!Dx || !DW) && (DX.tin = (DA.tin + DU - DL.into) * Db),
      (DX.type = DW ? 'free' : 'aligned'));
  }
  function Vf(DO, Df, DJ, DZ, DU) {
    let DK = wI(DO),
      DT = DK.keys.find((Db) => Db.of === Df && !!Db.twin == !!DJ),
      DA = DK.ch.keys[Df];
    if (!DT || !DA) return;
    let DX = wP(DT, wb(DO), DK.at),
      DL = DK.ch.flip && DT.twin ? -1 : 1;
    (Number.isFinite(DZ) && (DA.tin = (DT.tin + DZ - DX.into) * DL),
      Number.isFinite(DU) && (DA.tout = (DT.tout + DU - DX.out) * DL),
      (DA.type = DA.type === 'vector' ? 'free' : (DA.type ?? 'aligned')));
  }
  (w4.hipCurve.addEventListener('contextmenu', (DO) => DO.preventDefault()),
    w4.hipCurve.addEventListener('pointerleave', () => {
      V8 = null;
    }),
    w4.hipCurve.addEventListener('pointerdown', (DO) => {
      if (!wk() || V7?.kind === 'xf') return;
      (D5(), w4.hipCurve.focus({ preventScroll: !0 }));
      try {
        w4.hipCurve.setPointerCapture(DO.pointerId);
      } catch {}
      let { f: Df, px: DJ, py: DZ } = V9(DO),
        DU = DO.ctrlKey || DO.metaKey;
      if (DO.button === 2) {
        DO.preventDefault();
        let DL = Vk(DJ, DZ);
        (DL?.kind === 'key' &&
          !wv(DL.key, DL.k) &&
          VV({ key: DL.key, of: DL.k.of, twin: DL.k.twin }),
          (V7 = null),
          DF(DO.clientX, DO.clientY));
        return;
      }
      if (DO.button === 1) {
        (DO.preventDefault(),
          (V7 = {
            kind: 'pan',
            px: DJ,
            py: DZ,
            view: { ...wL },
            X: Df.X,
            Y: Df.Y,
            own: Df.own,
            moved: !1,
          }));
        return;
      }
      if (DO.button !== 0) return;
      if (DZ < wA * Df.dpr) {
        ((V7 = { kind: 'scrub' }), VU(Df.u(DJ)));
        return;
      }
      let DK = Vk(DJ, DZ);
      if (DO.altKey && DK?.kind === 'key') {
        DU ? VC(DK.key, DO.shiftKey) : VH(wQ(DK.k.u + DK.k.du), DO.shiftKey);
        return;
      }
      if (!DK) {
        let Db = VK(DJ, DZ);
        if (Db && DU) {
          Db !== w4.curveChan.value && (wz.delete(Db) || wz.add(Db), (wK[Db] = !0), Dz(!0));
          return;
        }
        if (Db) {
          Db !== w4.curveChan.value && !wz.has(Db) && (wz.clear(), (w4.curveChan.value = Db), Dz());
          let Dx = wX();
          V7 = {
            kind: 'curve',
            px: DJ,
            py: DZ,
            X: Df.X,
            way: null,
            moved: !1,
            was: [w4.curveChan.value, ...wz]
              .filter((Dy) => w5[Dy] && !w5[Dy].foot)
              .map((Dy) => ({
                key: Dy,
                late: w6[Dy].late ?? 0,
                dv: w6[Dy].keys.map((DW) => DW.dv),
                Y: wb(Dy, Dx).Y,
              })),
          };
          return;
        }
        V7 = {
          kind: 'box',
          px0: DJ,
          py0: DZ,
          px1: DJ,
          py1: DZ,
          how: DU ? 'take' : DO.shiftKey ? 'add' : 'set',
          side: DU,
          more: DO.shiftKey,
        };
        return;
      }
      let DT = { key: DK.key, of: DK.k.of, twin: !!DK.k.twin };
      if (DK.kind === 'handle') {
        let Dy = { ...DT, part: DK.side },
          DW = wO.some((Dq) => wY(Dq, Dy));
        if (DO.shiftKey) {
          VV(Dy, !0);
          return;
        }
        if (DW && wO.length > 1) {
          V7 = { kind: 'press', px0: DJ, py0: DZ, alone: Dy };
          return;
        }
        (VV(Dy),
          (V7 = {
            kind: 'handle',
            ...DT,
            side: DK.side,
            turn: DK.turn,
            moved: !1,
            was: null,
            tip: null,
          }));
        return;
      }
      if (DO.shiftKey) {
        VV(DT, !0);
        return;
      }
      let DA = wv(DT.key, DK.k),
        DX = { ...DT, part: null };
      (DA ? ((wO = [...wO.filter((Dq) => !wY(Dq, DX)), DX]), Vm()) : VV(DT),
        (V7 = { kind: 'press', px0: DJ, py0: DZ, alone: DA ? DX : null }));
    }),
    w4.hipCurve.addEventListener('pointermove', (DO) => {
      let { f: Df, px: DJ, py: DZ } = V9(DO);
      V8 = [DJ, DZ];
      let DU = V7;
      if (!(!DU || DU.kind === 'xf')) {
        if (DU.kind === 'scrub') {
          VU(Df.u(DJ));
          return;
        }
        if (DU.kind === 'curve') {
          let DK = Math.hypot(DJ - DU.px, DZ - DU.py);
          if (!DU.moved) {
            if (DK < 4 * Df.dpr) return;
            (wH(),
              (DU.moved = !0),
              (DU.way = Math.abs(DJ - DU.px) >= Math.abs(DZ - DU.py) ? 'time' : 'value'));
          }
          let DT =
              DO.shiftKey || DU.way === 'time'
                ? Math.round(((DJ - DU.px) / DU.X) * wV() * 4) / 4
                : 0,
            DA = DO.shiftKey || DU.way === 'value';
          for (let DX of DU.was) {
            let DL = w6[DX.key];
            ((DL.late = DX.late + DT),
              DL.keys.forEach((Db, Dx) => {
                Db.lock || (Db.dv = DX.dv[Dx] + (DA ? -(DZ - DU.py) / DX.Y : 0));
              }));
          }
          w3.fieldsShown();
          return;
        }
        if (DU.kind === 'pan') {
          let Db = (DJ - DU.px) / DU.X,
            Dx = (DZ - DU.py) / DU.Y / DU.own;
          (Math.hypot(DJ - DU.px, DZ - DU.py) > 4 * Df.dpr && (DU.moved = !0),
            (wL.x0 = DU.view.x0 - Db),
            (wL.x1 = DU.view.x1 - Db),
            (wL.py = DU.view.py + Dx),
            wq());
          return;
        }
        if (DU.kind === 'box') {
          ((DU.px1 = DJ), (DU.py1 = DZ));
          return;
        }
        if (DU.kind === 'press') {
          if (Math.hypot(DJ - DU.px0, DZ - DU.py0) < 3 * Df.dpr) return;
          ((V7 = null), VA('move', [DU.px0, DU.py0], { release: !0 }) && Vb(DJ, DZ, DO));
          return;
        }
        if (DU.kind === 'handle') {
          if (DO.buttons & 2) {
            VJ();
            return;
          }
          let Dy = wI(DU.key),
            DW = wb(DU.key),
            Dq = Dy.keys.find((DG) => DG.of === DU.of && !!DG.twin == !!DU.twin);
          if (!Dq) return;
          let DP = wP(Dq, DW, Dy.at, DU.turn),
            DY = DU.side === 'out',
            Dv = DY ? DP.tipOut : DP.tipIn;
          if (!DU.moved) {
            if (Math.hypot(DJ - Dv[0], DZ - Dv[1]) < 2 * Df.dpr) return;
            (wH(), (DU.was = JSON.stringify(w6)), (DU.moved = !0));
          }
          let DB = DY ? Math.max(DJ - DP.kx, 4 * Df.dpr) : Math.min(DJ - DP.kx, -4 * Df.dpr);
          (VO(DU.key, DU.of, DU.twin, DU.side, -(DZ - DP.ky) / DW.Y / (DB / DW.X), DO.altKey),
            (DU.tip = [DP.kx + DB, DZ]));
        }
      }
    }));
  function VJ() {
    let DO = V7;
    return DO?.kind !== 'handle'
      ? !1
      : ((V7 = null), DO.moved && (Object.assign(w6, JSON.parse(DO.was)), w7.drop()), !0);
  }
  let VZ = () => {
    let DO = V7;
    if (!(!DO || DO.kind === 'xf')) {
      if (((V7 = null), DO.kind === 'box')) {
        let Df = Math.min(DO.px0, DO.px1),
          DJ = Math.max(DO.px0, DO.px1),
          DZ = Math.min(DO.py0, DO.py1),
          DU = Math.max(DO.py0, DO.py1),
          DK = DJ - Df > 2 || DU - DZ > 2;
        if (DO.side && !DK) {
          VR(wQ(wx().u(DO.px0)) < +w4.time.value ? -1 : 1, DO.more);
          return;
        }
        VD(DK ? Vj(Df, DJ, DZ, DU) : [], DO.how);
        return;
      }
      if (DO.kind === 'press') {
        DO.alone && wO.length > 1 && VV(DO.alone);
        return;
      }
      DO.kind === 'scrub' || DO.kind === 'pan' || (DO.moved && (w3.byHand(), w3.remake()));
    }
  };
  (w4.hipCurve.addEventListener('pointerup', VZ),
    w4.hipCurve.addEventListener('pointercancel', () => {
      V7?.kind === 'handle' ? VJ() : VZ();
    }));
  function VU(DO) {
    ((w4.time.value = Math.min(wQ(DO), 0.9995)), w4.time.dispatchEvent(new Event('input')));
  }
  {
    let DO = (Df) =>
      VU(Math.min(Math.max(Df.offsetX / Math.max(w4.contacts.clientWidth, 1), 0), 0.9995));
    (w4.contacts.addEventListener('pointerdown', (Df) => {
      (w4.contacts.setPointerCapture(Df.pointerId), DO(Df));
    }),
      w4.contacts.addEventListener('pointermove', (Df) => {
        Df.buttons && DO(Df);
      }));
  }
  function VK(Df, DJ) {
    let DZ = wX(),
      DU = w4.curveChan.value;
    for (let DK of [DU, ...wT().filter((DT) => DT !== DU)]) {
      if (w5[DK].foot) continue;
      let DT = wb(DK, DZ);
      if (Math.abs(DT.py(wm(DK).at(DT.u(Df))) - DJ) < 6 * DZ.dpr) return DK;
    }
    return null;
  }
  let VT = { move: 'Move', rotate: 'Rotate', scale: 'Scale' };
  function VA(Df, DJ, { release: DZ = !1, copy: DU = !1 } = {}) {
    if (!wk() || !DJ || wJ()) return !1;
    let DK = wX(),
      DT = [],
      DA = [],
      DX = new Set(),
      DL = wg();
    for (let Dy of wO) {
      if (!DL.includes(Dy.key)) continue;
      let DW = wI(Dy.key),
        Dq = wb(Dy.key, DK),
        DP = DW.keys.find((Dg) => Dg.of === Dy.of && !!Dg.twin == !!Dy.twin);
      if (!DP) continue;
      let DY = wQ(DP.u + DP.du),
        Dv = wy(DY)[0] ?? 0,
        DB = wP(DP, Dq, DW.at, Dv),
        DG = DW.ch.keys[Dy.of];
      if (Dy.part)
        !DU &&
          !wv(Dy.key, DP) &&
          DA.push({
            key: Dy.key,
            of: Dy.of,
            twin: !!Dy.twin,
            side: Dy.part,
            turn: Dv,
            kx: DB.kx,
            ky: DB.ky,
            tip: Dy.part === 'out' ? DB.tipOut : DB.tipIn,
          });
      else {
        if (DX.has(Dy.key + '|' + Dy.of)) continue;
        (DX.add(Dy.key + '|' + Dy.of),
          DT.push({
            key: Dy.key,
            of: Dy.of,
            twin: !!Dy.twin,
            p: DY,
            turn: Dv,
            value: DW.at(DY),
            px: DB.kx,
            py: DB.ky,
            sin: DB.into,
            sout: DB.out,
            own: V6(DG),
            type: DG.type ?? null,
            i: DG.i ?? null,
          }));
      }
    }
    if (!DT.length && !DA.length)
      return (V4(DU || Df === 'rotate' ? 'Pick keys first' : 'Pick keys or handles first'), !1);
    let Db = [...DT.map((Dg) => [Dg.px, Dg.py]), ...DA.map((Dg) => Dg.tip)],
      Dx = [
        (Math.min(...Db.map((Dg) => Dg[0])) + Math.max(...Db.map((Dg) => Dg[0]))) / 2,
        (Math.min(...Db.map((Dg) => Dg[1])) + Math.max(...Db.map((Dg) => Dg[1]))) / 2,
      ];
    return (
      D5(),
      wH(),
      (V7 = {
        kind: 'xf',
        mode: Df,
        release: DZ,
        copy: DU,
        items: DT,
        hands: DA,
        pivot: Dx,
        was: JSON.stringify(w6),
        sel0: wO.map((Dg) => ({ ...Dg })),
        start: DJ.slice(),
        last: DJ.slice(),
        virt: DJ.slice(),
        lock: null,
        typed: ['', ''],
        field: 0,
        snap: !1,
      }),
      addEventListener('pointermove', VL, !0),
      addEventListener('pointerdown', VL, !0),
      addEventListener('pointerup', VL, !0),
      addEventListener('contextmenu', VX, !0),
      addEventListener('keydown', Vx, !0),
      (w4.hipCurve.style.cursor = Df === 'move' ? 'move' : 'crosshair'),
      Vv(),
      !0
    );
  }
  let VX = (Df) => {
    (Df.preventDefault(), Df.stopPropagation());
  };
  function VL(Df) {
    let DJ = V7;
    if (DJ?.kind === 'xf') {
      if ((VX(Df), Df.type === 'pointermove')) {
        if (Df.buttons & 2) {
          VG(!1);
          return;
        }
        let { px: DZ, py: DU } = V9(Df);
        Vb(DZ, DU, Df);
        return;
      }
      if (Df.type === 'pointerdown') {
        Df.button === 2 ? VG(!1) : Df.button === 0 && VG(!0);
        return;
      }
      Df.type === 'pointerup' && DJ.release && Df.button === 0 && VG(!0);
    }
  }
  function Vb(Df, DJ, DZ) {
    let DU = V7,
      DK = DZ?.shiftKey ? 0.1 : 1;
    ((DU.virt = [DU.virt[0] + (Df - DU.last[0]) * DK, DU.virt[1] + (DJ - DU.last[1]) * DK]),
      (DU.last = [Df, DJ]),
      (DU.snap = !!(DZ?.ctrlKey || DZ?.metaKey)),
      Vv());
  }
  function Vx(Df) {
    let DJ = V7;
    if (DJ?.kind !== 'xf') return;
    let DZ = Df.key;
    if ((VX(Df), DZ === 'Escape')) {
      VG(!1);
      return;
    }
    if (DZ === 'Enter' || DZ === ' ') {
      VG(!0);
      return;
    }
    if (DZ === 'Control' || DZ === 'Meta') {
      ((DJ.snap = !0), Vv());
      return;
    }
    if (DZ.length === 1) {
      if ('xXyY'.includes(DZ) && DJ.mode !== 'rotate') {
        let DU = DZ.toLowerCase();
        ((DJ.lock = DJ.lock === DU ? null : DU), (DJ.field = DJ.lock === 'y' ? 1 : 0), Vv());
        return;
      }
      if ('gGrRsS'.includes(DZ)) {
        let DK = { g: 'move', r: 'rotate', s: 'scale' }[DZ.toLowerCase()];
        if (DK !== DJ.mode && !DJ.copy) {
          let DT = DJ.last.slice(),
            DA = DJ.release,
            DX = DJ.sel0;
          (VG(!1), (wO = DX), Vm(), VA(DK, DT, { release: DA }));
        }
        return;
      }
      if (DZ === '-') {
        let DL = DJ.typed[DJ.field];
        ((DJ.typed[DJ.field] = DL.startsWith('-') ? DL.slice(1) : '-' + DL), Vv());
        return;
      }
      /^[0-9.]$/.test(DZ) && ((DJ.typed[DJ.field] += DZ), Vv());
    }
  }
  (addEventListener(
    'keydown',
    (Df) => {
      let DJ = V7;
      DJ?.kind !== 'xf' ||
        (Df.key !== 'Tab' && Df.key !== 'Backspace') ||
        (VX(Df),
        Df.key === 'Tab'
          ? DJ.mode === 'move' && !DJ.lock && (DJ.field = 1 - DJ.field)
          : (DJ.typed[DJ.field] = DJ.typed[DJ.field].slice(0, -1)),
        Vv());
    },
    !0,
  ),
    addEventListener('keyup', (Df) => {
      V7?.kind === 'xf' && (Df.key === 'Control' || Df.key === 'Meta') && ((V7.snap = !1), Vv());
    }));
  let Vy = (Df) => (/[0-9]/.test(Df) && Number.isFinite(Number(Df)) ? Number(Df) : null);
  function VW() {
    let Df = V7,
      [DJ, DZ] = Df.start,
      [DU, DK] = Df.virt,
      DT = Df.typed.map(Vy),
      DA = DT.some((DP) => DP != null),
      DX = { mode: Df.mode };
    if (Df.mode === 'move')
      return (
        (DX.dx = DU - DJ),
        (DX.dy = DK - DZ),
        (DX.typed = DA ? DT : null),
        Df.lock === 'x' && (DX.dy = 0),
        Df.lock === 'y' && (DX.dx = 0),
        DX
      );
    let [DL, Db] = Df.pivot;
    if (Df.mode === 'rotate') {
      let DP =
        ((Math.atan2(-(DK - Db), DU - DL) - Math.atan2(-(DZ - Db), DJ - DL)) * 180) / Math.PI;
      return (
        (DP = ((DP + 540) % 360) - 180),
        Df.snap && !DA && (DP = Math.round(DP / 5) * 5),
        DT[0] != null && (DP = DT[0]),
        (DX.deg = DP),
        (DX.angle = (DP * Math.PI) / 180),
        DX
      );
    }
    let Dx = DJ - DL,
      Dy = DZ - Db,
      DW = Dx * Dx + Dy * Dy,
      Dq = DW > 1 ? ((DU - DL) * Dx + (DK - Db) * Dy) / DW : 1;
    return (
      Df.snap && !DA && (Dq = Math.round(Dq * 10) / 10),
      DT[0] != null && (Dq = DT[0]),
      (DX.k = Dq),
      (DX.sx = Df.lock === 'y' ? 1 : Dq),
      (DX.sy = Df.lock === 'x' ? 1 : Dq),
      DX
    );
  }
  function Vq(Df, [DJ, DZ]) {
    let [DU, DK] = V7.pivot;
    if (Df.mode === 'move') return [DJ + Df.dx, DZ + Df.dy];
    if (Df.mode === 'scale') return [DU + (DJ - DU) * Df.sx, DK + (DZ - DK) * Df.sy];
    let DT = DJ - DU,
      DA = -(DZ - DK),
      DX = Math.cos(Df.angle),
      DL = Math.sin(Df.angle);
    return [DU + DT * DX - DA * DL, DK - (DT * DL + DA * DX)];
  }
  function VP(Df, [DJ, DZ]) {
    if (Df.mode === 'scale') return [DJ * Df.sx, DZ * Df.sy];
    if (Df.mode !== 'rotate') return [DJ, DZ];
    let DU = -DZ,
      DK = Math.cos(Df.angle),
      DT = Math.sin(Df.angle);
    return [DJ * DK - DU * DT, -(DJ * DT + DU * DK)];
  }
  function VY(Df, DJ, DZ) {
    let DU = V7,
      DK = wV(),
      DT = w5[DJ.key].scale ?? 100,
      DA = DJ.p + DJ.turn,
      DX,
      DL;
    if (Df.mode === 'move' && Df.typed)
      ((DX = DA + (Df.typed[0] ?? 0) / DK), (DL = DJ.value + (Df.typed[1] ?? 0) / DT));
    else {
      let [Db, Dx] = Vq(Df, [DJ.px, DJ.py]);
      ((DX = DZ.u(Db)), (DL = DZ.v(Dx)));
    }
    if (DU.snap && Df.mode === 'move' && !Df.typed) {
      DX = Math.round(DX * DK) / DK;
      let Dy = V2(DZ);
      DL = DJ.value + Math.round((DL - DJ.value) / Dy) * Dy;
    }
    return (
      Df.mode === 'move' && DU.lock === 'x' && (DL = DJ.value),
      Df.mode === 'move' && DU.lock === 'y' && (DX = DA),
      { u: DX, value: DL }
    );
  }
  function Vv() {
    let Df = V7;
    if (Df?.kind !== 'xf') return;
    let DJ = VW(),
      DZ = wX();
    if ((Object.assign(w6, JSON.parse(Df.was)), Df.copy)) {
      let DK = [];
      for (let DT of Df.items) {
        let { u: DA, value: DX } = VY(DJ, DT, wb(DT.key, DZ)),
          DL = VI(DT.key, wQ(DA), {
            value: DX,
            sin: DT.sin,
            sout: DT.sout,
            own: DT.own,
            type: DT.type,
            i: DT.i,
          });
        DL && DK.push({ key: DT.key, ...DL });
      }
      ((wO = DK.map((Db) => ({ ...Db, part: null }))), Vm(), VB(DJ));
      return;
    }
    let DU = new Map();
    for (let Db of Df.items) (DU.has(Db.key) || DU.set(Db.key, []), DU.get(Db.key).push(Db));
    for (let [Dx, Dy] of DU) {
      let DW = wb(Dx, DZ),
        Dq = new Map(),
        DP = new Map();
      for (let DY of Dy) {
        let { u: Dv, value: DB } = VY(DJ, DY, DW);
        (Dq.set(DY.of, Dv - (DY.p + DY.turn)), DP.set(DY.of, { by: DB - DY.value, twin: DY.twin }));
      }
      (Vz(Dx, Dq), Vp(Dx, DP));
    }
    if (DJ.mode !== 'move')
      for (let [DG, Dg] of DU) {
        let DI = wb(DG, DZ),
          Dh = (DN, DM) => {
            let [m0, m1] = VP(DJ, [DM * DI.X, -DM * DN * DI.Y]),
              m2 = DM > 0 ? Math.max(m0, 0.000001) : Math.min(m0, -0.000001);
            return -(m1 / DI.Y) / (m2 / DI.X);
          };
        for (let DN of Dg)
          DN.own && DN.type !== 'vector' && Vf(DG, DN.of, DN.twin, Dh(DN.sin, -1), Dh(DN.sout, 1));
      }
    if (DJ.mode !== 'scale')
      for (let DM of Df.hands) {
        let m0 = wb(DM.key, DZ),
          m1 = DM.side === 'out',
          [m2, m3] = DM.tip;
        if (DJ.mode === 'move' && !DJ.typed) ((m2 += DJ.dx), (m3 += DJ.dy));
        else {
          if (DJ.mode === 'rotate') {
            let m5 = DM.tip[0] - DM.kx,
              m6 = -(DM.tip[1] - DM.ky),
              m7 = Math.cos(DJ.angle),
              m8 = Math.sin(DJ.angle);
            ((m2 = DM.kx + m5 * m7 - m6 * m8), (m3 = DM.ky - (m5 * m8 + m6 * m7)));
          }
        }
        let m4 = m1 ? Math.max(m2 - DM.kx, 4 * DZ.dpr) : Math.min(m2 - DM.kx, -4 * DZ.dpr);
        VO(DM.key, DM.of, DM.twin, DM.side, -(m3 - DM.ky) / m0.Y / (m4 / m0.X));
      }
    VB(DJ);
  }
  function VB(Df) {
    let DJ = V7,
      DZ = wV(),
      DU = DJ.items[0] ?? DJ.hands[0],
      DK = DU ? w5[DU.key] : null,
      DT = DU ? wb(DU.key) : null,
      DA = (Db) => (DJ.typed[Db] ? '[' + DJ.typed[Db] + (DJ.field === Db ? '|' : '') + ']' : ''),
      DX;
    if (Df.mode === 'move') {
      let Db = Df.typed ? (Df.typed[0] ?? 0) : DT ? (Df.dx / DT.X) * DZ : 0,
        Dx = Df.typed ? (Df.typed[1] ?? 0) : DT ? (-Df.dy / DT.Y) * (DK.scale ?? 100) : 0;
      DX =
        'Dx ' +
        (DA(0) || +Db.toFixed(2)) +
        ' frames \u00B7 Dy ' +
        (DA(1) || +Dx.toFixed(2)) +
        ' ' +
        (DK?.unit ?? 'cm');
    } else
      DX =
        Df.mode === 'rotate'
          ? (DA(0) || +Df.deg.toFixed(1)) + '\u00B0'
          : '\u00D7 ' +
            (DA(0) || +Df.k.toFixed(3)) +
            (DJ.hands.length && !DJ.items.length ? ' (a handle here has no length to scale)' : '');
    let DL =
      DJ.lock === 'x' ? ' \u00B7 time only (X)' : DJ.lock === 'y' ? ' \u00B7 value only (Y)' : '';
    V4(
      '' +
        (DJ.copy ? 'Duplicate \u00B7 ' : '') +
        VT[Df.mode] +
        ' \u00B7 ' +
        DX +
        DL +
        (DJ.snap ? ' \u00B7 snapping (Ctrl)' : '') +
        ' \u2014 ' +
        (DJ.release ? 'let go' : 'click or Enter') +
        ' to keep, Esc or right-click to cancel',
      !0,
    );
  }
  function VG(Df) {
    let DJ = V7;
    if (DJ?.kind === 'xf') {
      if (
        (removeEventListener('pointermove', VL, !0),
        removeEventListener('pointerdown', VL, !0),
        removeEventListener('pointerup', VL, !0),
        removeEventListener('keydown', Vx, !0),
        setTimeout(() => removeEventListener('contextmenu', VX, !0), 600),
        (w4.hipCurve.style.cursor = ''),
        V4(''),
        Df)
      ) {
        if ((Vv(), (V7 = null), JSON.stringify(w6) === DJ.was)) {
          w7.drop();
          return;
        }
        (w3.byHand(), w3.remake());
        return;
      }
      ((V7 = null),
        Object.assign(w6, JSON.parse(DJ.was)),
        wk() && w3.plantShown(),
        (wO = DJ.sel0),
        Vm(),
        w7.drop());
    }
  }
  function Vg(Df, DJ, DZ = !0) {
    let DU = w5[Df],
      DK = wS(Df),
      DT = ww();
    if (!DU || !DK || w3.keyBlocked(Df, DJ)) return null;
    DZ && wH();
    let DA = wm(Df),
      DX = DA.at(DJ),
      DL =
        [...DA.keys]
          .sort((Dq, DP) => wQ(Dq.u + Dq.du) - wQ(DP.u + DP.du))
          .filter((Dq) => wQ(Dq.u + Dq.du) <= DJ)
          .pop() ??
        (DT ? [...DA.keys].sort((Dq, DP) => wQ(Dq.u + Dq.du) - wQ(DP.u + DP.du)).pop() : null),
      Db = !1;
    if (DT) {
      if (DU.foot) {
        let Dq = Nt(Go(DK)),
          DP = Nt({
            keys: DK.keys.filter((Dv) => Dv.lock).map((Dv) => ({ u: Dv.u, du: Dv.du, dv: 0 })),
          }),
          DY = DP.from(Dq.from(DJ));
        DK.keys.push({ u: we(DY), du: DJ - DY, dv: Dq.lift(DJ) });
      } else {
        let Dv = Nt(DK),
          DB = Dv.from(DJ);
        ((Db = !!DK.mirror && we(DB) >= 0.5),
          DK.keys.push({
            u: DK.mirror ? we(DB) % 0.5 : we(DB),
            du: DJ - DB,
            dv: Dv.lift(DJ) * (DK.mirror && DK.flip && we(DB) >= 0.5 ? -1 : 1),
          }));
      }
    } else {
      let DG = dn(DK),
        Dg = Math.min(Math.max(DG.from(DJ), 0.004), 0.996);
      DK.keys.push({ u: Dg, du: DJ - Dg, dv: DG.lift(DJ) });
    }
    let Dx = DK.keys.length - 1,
      Dy = DK.keys[Dx],
      DW = DL ? DK.keys[DL.of]?.i : null;
    return (
      DW &&
        DW !== N &&
        ((Dy.i = DW), Dy.lock || (Dy.dv += (DX - wm(Df).at(DJ)) * (DK.flip && Db ? -1 : 1))),
      { of: Dx, twin: Db }
    );
  }
  function VI(Df, DJ, DZ) {
    let DU = wS(Df);
    if (!DU) return null;
    let DK = wV(),
      DT = (Db, Dx) => Math.abs(ww() ? ((Db - Dx + 1.5) % 1) - 0.5 : Db - Dx) < 0.5 / DK,
      DA = wm(Df).keys.find((Db) => DT(wQ(Db.u + Db.du), DJ)),
      DX = DA ? { of: DA.of, twin: !!DA.twin } : Vg(Df, DJ, !1);
    if (!DX) return null;
    let DL = DU.keys[DX.of];
    if ((DZ.i && DZ.i !== N ? (DL.i = DZ.i) : delete DL.i, !DL.lock)) {
      let Db = wm(Df),
        Dx = Db.keys.find((Dy) => Dy.of === DX.of && !!Dy.twin === DX.twin);
      Dx && (DL.dv += (DZ.value - Db.at(wQ(Dx.u + Dx.du))) * (DU.flip && DX.twin ? -1 : 1));
    }
    return (
      delete DL.tin,
      delete DL.tout,
      delete DL.type,
      DZ.type === 'vector'
        ? (DL.type = 'vector')
        : DZ.own && (Vf(Df, DX.of, DX.twin, DZ.sin, DZ.sout), (DL.type = DZ.type ?? 'aligned')),
      DX
    );
  }
  function Vh() {
    if (!wk()) return;
    let Df = !1,
      DJ = !1;
    for (let [DZ, DU] of V0()) {
      let DK = wS(DZ),
        DT = [...DU.keys()]
          .filter((DX) => DK.keys[DX] && !DK.keys[DX].lock)
          .sort((DX, DL) => DL - DX),
        DA = DK.keys.filter((DX) => !DX.lock).length - DT.length;
      if (!(!DT.length || DA < 1)) {
        (Df || (wH(), (Df = !0)),
          (DJ ||= DT.some((DX) => {
            let DL = DK.keys[DX];
            return DL.du || DL.dv || V6(DL) || DL.i;
          })));
        for (let DX of DT) DK.keys.splice(DX, 1);
      }
    }
    Df && (VV(null), DJ && w3.remake());
  }
  w4.hipCurve.addEventListener('dblclick', (Df) => {
    if (!wk()) return;
    let { f: DJ, px: DZ, py: DU } = V9(Df);
    if (DU < wA * DJ.dpr) return;
    let DK = Vk(DZ, DU);
    if (DK?.kind === 'handle') {
      wH();
      let DX = wS(DK.key).keys[DK.k.of];
      (delete DX.tin,
        delete DX.tout,
        delete DX.type,
        VV({ key: DK.key, of: DK.k.of, twin: DK.k.twin }),
        w3.remake());
      return;
    }
    if (DK) {
      (VV({ key: DK.key, of: DK.k.of, twin: DK.k.twin }), Vh());
      return;
    }
    let DT = w4.curveChan.value,
      DA = Vg(DT, wQ(DJ.u(DZ)));
    DA && (VV({ key: DT, ...DA }), wS(DT).keys[DA.of].i && w3.remake());
  });
  let VN = null;
  function VM() {
    let Df = [],
      DJ = wX();
    for (let DU of wN()) {
      if (
        !wO.some((Db) => !Db.part && Db.key === DU.key && Db.of === DU.of && !!Db.twin === DU.twin)
      )
        continue;
      let DK = wI(DU.key),
        DT = DK.keys.find((Db) => Db.of === DU.of && !!Db.twin === DU.twin);
      if (!DT) continue;
      let DA = wQ(DT.u + DT.du),
        DX = wP(DT, wb(DU.key, DJ), DK.at),
        DL = DK.ch.keys[DU.of];
      Df.push({
        key: DU.key,
        p: DA,
        value: DK.at(DA),
        sin: DX.into,
        sout: DX.out,
        own: V6(DL),
        type: DL.type ?? null,
        i: DL.i ?? null,
      });
    }
    if (!Df.length) {
      V4('Pick keys to copy them');
      return;
    }
    let DZ = Math.min(...Df.map((Db) => Db.p));
    ((VN = Df.map((Db) => ({ ...Db, dp: Db.p - DZ }))),
      V4('Copied ' + Df.length + ' key' + (Df.length > 1 ? 's' : '')));
  }
  function D0() {
    if (!VN?.length) {
      V4('Nothing copied yet: pick keys and press Ctrl+C');
      return;
    }
    let Df = +w4.time.value,
      DJ = [],
      DZ = 0,
      DU = !1;
    for (let DK of VN) {
      let DT = ww() ? we(Df + DK.dp) : Df + DK.dp;
      if (!w5[DK.key] || !wS(DK.key) || (!ww() && DT > 1)) {
        DZ++;
        continue;
      }
      DU || (wH(), (DU = !0));
      let DA = VI(DK.key, DT, DK);
      DA ? DJ.push({ key: DK.key, ...DA }) : DZ++;
    }
    if (!DJ.length) {
      (DU && w7.drop(),
        V4('Nothing to paste here: those curves are not there, or there is no room for a key'));
      return;
    }
    (VD(DJ),
      V4(
        'Pasted ' +
          DJ.length +
          ' key' +
          (DJ.length > 1 ? 's' : '') +
          (DZ ? ' \u00B7 ' + DZ + ' had nowhere to go' : ''),
      ),
      w3.byHand(),
      w3.remake());
  }
  function D1(Df) {
    let DJ = V0();
    if (!DJ.size || !wk()) return;
    let DZ = wV(),
      DU = +w4.time.value;
    wH();
    for (let [DK, DT] of DJ) {
      let DA = wI(DK),
        DX = new Map();
      for (let [DL, Db] of DT) {
        let Dx = DA.keys.find((DW) => DW.of === DL && !!DW.twin === Db);
        if (!Dx) continue;
        let Dy = wQ(Dx.u + Dx.du);
        DX.set(DL, (Df === 'frame' ? DU : Math.round(Dy * DZ) / DZ) - Dy);
      }
      Vz(DK, DX, DA);
    }
    (w3.byHand(), w3.remake());
  }
  function D2(Df) {
    if (!w4.curveAdv.checked) {
      V4('Tick "several curves" to show and hide curves');
      return;
    }
    let DJ = new Set(wO.map((DU) => DU.key));
    for (let DU of Object.keys(w5))
      Df === 'none'
        ? (wK[DU] = !0)
        : ((Df === 'picked' && DJ.has(DU)) || (Df === 'others' && !DJ.has(DU))) && (wK[DU] = !1);
    let DZ = wg();
    ((wO = wO.filter((DK) => DZ.includes(DK.key))), Vm(), Dz(!0));
  }
  function D3() {
    let Df = [];
    for (let DK of wO) {
      let DT = wI(DK.key),
        DA = DT.keys.find((DX) => DX.of === DK.of && !!DX.twin == !!DK.twin);
      if (DA) {
        let DX = wQ(DA.u + DA.du);
        Df.push(DX + (wy(DX)[0] ?? 0));
      }
    }
    if (!Df.length) {
      Dt();
      return;
    }
    let DJ = Math.min(...Df),
      DZ = Math.max(...Df),
      DU = Math.max((DZ - DJ) * 0.15, 3 / wV());
    (Object.assign(wL, { x0: DJ - DU, x1: DZ + DU, zy: 1, py: 0 }), wq());
  }
  let D4 = null;
  function D5() {
    D4 &&
      (D4.remove(),
      (D4 = null),
      removeEventListener('pointerdown', D6, !0),
      removeEventListener('keydown', D7, !0));
  }
  let D6 = (Df) => {
      D4 && !D4.contains(Df.target) && D5();
    },
    D7 = (Df) => {
      Df.key === 'Escape' && (Df.preventDefault(), Df.stopPropagation(), D5());
    };
  function D8(Df, DJ, DZ, DU) {
    D5();
    let DK = (DX, DL, Db) => {
      let Dx = document.createElement(DX);
      return ((Dx.className = DL), Db != null && (Dx.textContent = Db), Dx);
    };
    ((D4 = DK('div', 'lib-seq__menu lib-seq__menu--graph')),
      D4.setAttribute('role', 'menu'),
      D4.append(DK('div', 'lib-seq__menu-title', DZ)));
    for (let DX of DU) {
      let DL = DK('div', 'lib-seq__menu-row'),
        Db = DK('div', 'lib-seq__menu-group');
      DL.append(DK('span', 'lib-seq__menu-label', DX.label || ''));
      for (let Dx of DX.items) {
        let Dy = DK(
          'button',
          'lib-btn lib-btn--sm lib-seq__menu-opt' + (Dx.on ? ' is-on' : ''),
          Dx.text,
        );
        ((Dy.type = 'button'),
          Dx.tip && (Dy.title = Dx.tip),
          (Dy.disabled = !!Dx.off),
          Dy.addEventListener('click', (DW) => {
            (D5(), Dx.run(DW));
          }),
          Db.append(Dy));
      }
      (DL.append(Db), D4.append(DL));
    }
    (D4.addEventListener('contextmenu', (DW) => DW.preventDefault()), document.body.append(D4));
    let DT = D4.offsetWidth,
      DA = D4.offsetHeight;
    ((D4.style.left = Math.max(8, Math.min(Df, innerWidth - DT - 8)) + 'px'),
      (D4.style.top = (DJ + DA + 8 > innerHeight ? Math.max(8, DJ - DA - 4) : DJ + 4) + 'px'),
      addEventListener('pointerdown', D6, !0),
      addEventListener('keydown', D7, !0));
  }
  let D9 = () => {
    let Df = w4.hipCurve.getBoundingClientRect(),
      DJ = devicePixelRatio || 1;
    return V8
      ? [Df.left + V8[0] / DJ, Df.top + V8[1] / DJ]
      : [Df.left + Df.width / 2, Df.top + Df.height / 2];
  };
  function Dk(Df) {
    let DJ = wN();
    if (DJ.length) {
      wH();
      for (let DZ of DJ) {
        let DU = wh(DZ);
        DU && (Df === N ? delete DU.i : (DU.i = Df));
      }
      (Vm(), w3.byHand(), w3.remake());
    }
  }
  function Dw(Df) {
    let DJ = wN().filter((DZ) => k0(wh(DZ)?.i));
    if (!DJ.length) {
      V4('Give the keys an easing first');
      return;
    }
    wH();
    for (let DZ of DJ) {
      let DU = wh(DZ);
      DU.i = k1(k0(DU.i).name, Df);
    }
    (w3.byHand(), w3.remake());
  }
  function DV() {
    let Df = wN().map(wh).filter(Boolean),
      DJ = new Set(Df.map((DA) => DA.i ?? N)),
      DZ = DJ.size === 1 ? [...DJ][0] : null,
      DU = k0(DZ),
      DK = (DA, DX, DL) => ({
        text: DA,
        tip: DL,
        on: DZ === DX,
        off: !Df.length,
        run: () => Dk(DX),
      }),
      DT = (DA) => ({
        text: k3[DA],
        tip: k3[DA] + ' easing to the next key',
        on: DU?.name === DA,
        off: !Df.length,
        run: () => Dk(k1(DA, DU?.way ?? null)),
      });
    return [
      {
        label: 'Interpolation',
        items: [
          DK(
            'Bezier',
            N,
            "The animation's own curve to the next key, bent by the keys \u2014 as every key has it to begin with",
          ),
          DK('Linear', i, 'A straight line to the next key'),
          DK('Step', M, 'Holds, then jumps at the next key'),
        ],
      },
      {
        label: 'Easing',
        items: ['sine', 'quad', 'cubic', 'quart', 'quint', 'expo', 'circ'].map(DT),
      },
      { label: 'Dynamic', items: ['back', 'bounce', 'elastic'].map(DT) },
    ];
  }
  function DD() {
    let Df = wN()
        .map(wh)
        .filter((DK) => DK && k0(DK.i)),
      DJ = new Set(Df.map((DK) => k0(DK.i).way ?? null)),
      DZ = DJ.size === 1 ? [...DJ][0] : void 0,
      DU = (DK, DT, DA) => ({
        text: DK,
        tip: DA,
        on: DZ === DT,
        off: !Df.length,
        run: () => Dw(DT),
      });
    return [
      {
        label: 'Ease',
        items: [
          DU('Auto', null, 'As Blender has it: in for an easing, out for Back, Bounce and Elastic'),
          DU('In', 'in', 'Starts slowly'),
          DU('Out', 'out', 'Arrives slowly'),
          DU('In and out', 'io', 'Slow at both ends'),
        ],
      },
    ];
  }
  let Dm = [
    [
      'auto',
      'Automatic',
      "The curve chooses its slope here, the smoothest that doesn't overshoot (1)",
    ],
    ['aligned', 'Aligned', 'Your handles, the two sides in one line (2)'],
    ['free', 'Free', 'Your handles, each side its own (3)'],
    ['vector', 'Vector', 'Each side straight at the key next to it \u2014 no ease (4)'],
    ['flat', 'Flat', 'The handles level: the curve comes in and goes out flat here (5)'],
  ];
  function DS() {
    let Df = new Set(wN().map(wh).filter(Boolean).map(Vw));
    return [
      {
        label: 'Handle type',
        items: Dm.map(([DJ, DZ, DU]) => ({
          text: DZ,
          tip: DU,
          on: DJ !== 'flat' && Df.size === 1 && Df.has(DJ),
          off: !wO.length,
          run: () => DQ(DJ),
        })),
      },
    ];
  }
  let DE = () => [
    {
      label: 'Selection to',
      items: [
        {
          text: 'Current Frame',
          tip: "The picked keys to the playhead's frame",
          off: !wM(),
          run: () => D1('frame'),
        },
        {
          text: 'Nearest Frame',
          tip: 'Each picked key to its nearest whole frame',
          off: !wM(),
          run: () => D1('nearest'),
        },
      ],
    },
    {
      label: 'Handles',
      items: [
        {
          text: 'Flatten Handles',
          tip: 'Level handles on the picked keys',
          off: !wO.length,
          run: () => DQ('flat'),
        },
      ],
    },
  ];
  function DF(Df, DJ) {
    D8(Df, DJ, 'Keys', [
      {
        label: 'Clipboard',
        items: [
          { text: 'Copy', tip: 'The picked keys (Ctrl+C)', off: !wM(), run: VM },
          {
            text: 'Paste',
            tip: 'At the playhead, on the same curves (Ctrl+V)',
            off: !VN?.length,
            run: D0,
          },
        ],
      },
      ...DS(),
      ...DV(),
      ...DD(),
      {
        label: 'Keys',
        items: [
          {
            text: 'Duplicate',
            tip: 'Copies of the picked keys, to move (Shift+D)',
            off: !wM(),
            run: (DZ) => {
              let { px: DU, py: DK } = V9(DZ);
              VA('move', [DU, DK], { copy: !0 });
            },
          },
          { text: 'Delete', tip: 'The picked keys away (Delete, X)', off: !wM(), run: Vh },
        ],
      },
      ...DE(),
    ]);
  }
  function DC(Df) {
    let DJ = Df.ctrlKey || Df.metaKey,
      DZ = Df.altKey,
      DU = Df.shiftKey,
      DK = Df.key,
      DT = DK.length === 1 ? DK.toLowerCase() : DK,
      DA = (DX = !1, DL = !1, Db = !1) => DJ === DX && DZ === DL && DU === Db;
    return DK === 'Escape'
      ? VJ()
        ? !0
        : wO.length
          ? (VV(null), !0)
          : !1
      : V7
        ? !1
        : DA() && /^[grs]$/.test(DT)
          ? (V8
              ? VA({ g: 'move', r: 'rotate', s: 'scale' }[DT], V8)
              : V4(DK.toUpperCase() + ' with the pointer over the graph'),
            !0)
          : DA(!1, !1, !0) && DT === 'd'
            ? (V8 ? VA('move', V8, { copy: !0 }) : V4('Shift+D with the pointer over the graph'),
              !0)
            : (!DJ && !DZ && (DK === 'Delete' || DK === 'Backspace')) || (DA() && DT === 'x')
              ? (Vh(), !0)
              : (DA() || DA(!0)) && DT === 'a'
                ? (VE(), !0)
                : DA(!1, !0) && DT === 'a'
                  ? (VV(null), !0)
                  : DA(!0) && DT === 'i'
                    ? (VF(), !0)
                    : DA() && (Df.code === 'BracketLeft' || Df.code === 'BracketRight')
                      ? (VR(Df.code === 'BracketLeft' ? -1 : 1), !0)
                      : DA() && DT === 'l'
                        ? (VQ(), !0)
                        : DA() && DT === 'h'
                          ? (D2('picked'), !0)
                          : DA(!1, !1, !0) && DT === 'h'
                            ? (D2('others'), !0)
                            : DA(!1, !0) && DT === 'h'
                              ? (D2('none'), !0)
                              : DA() && DT === 't'
                                ? (D8(...D9(), 'Interpolation', DV()), !0)
                                : DA(!0) && DT === 'e'
                                  ? (D8(...D9(), 'Easing', DD()), !0)
                                  : DA() && DT === 'v'
                                    ? (D8(...D9(), 'Handle type', DS()), !0)
                                    : DA(!1, !1, !0) && DT === 's'
                                      ? (D8(...D9(), 'Snap', DE()), !0)
                                      : DJ && !DZ && !DU && DT === 'c'
                                        ? getSelection?.()?.toString()
                                          ? !1
                                          : (VM(), !0)
                                        : DJ && !DZ && DT === 'v'
                                          ? (D0(), !0)
                                          : !DJ && DK === 'Home'
                                            ? (Dt(), !0)
                                            : (DA() && DT === 'f') ||
                                                (Df.code === 'NumpadDecimal' && !DJ && !DZ)
                                              ? (D3(), !0)
                                              : DA() && '12345'.includes(DK) && wO.length
                                                ? (DQ(
                                                    ['auto', 'aligned', 'free', 'vector', 'flat'][
                                                      +DK - 1
                                                    ],
                                                  ),
                                                  !0)
                                                : !1;
  }
  (addEventListener('keydown', (Df) => {
    !wk() ||
      V7?.kind === 'xf' ||
      D4 ||
      (Df.target instanceof HTMLElement &&
        Df.target.matches('input:not([type=checkbox]):not([type=range]), textarea, select')) ||
      (!V8 && document.activeElement !== w4.hipCurve) ||
      (DC(Df) && Df.preventDefault());
  }),
    w4.hipCurve.addEventListener(
      'wheel',
      (Df) => {
        if (!wk()) return;
        Df.preventDefault();
        let { f: DJ, px: DZ, py: DU } = V9(Df),
          DK = Math.exp(-Df.deltaY * 0.0015),
          DT = DJ.u(DZ),
          DA = (DJ.v(DU) - (DJ.mid - wL.py * DJ.own)) / DJ.own;
        if (!Df.shiftKey) {
          let DX = wL.x1 - wL.x0,
            DL = Math.min(Math.max(DX / DK, 0.05), 4);
          ((wL.x0 = DT - ((DT - wL.x0) * DL) / DX), (wL.x1 = wL.x0 + DL));
        }
        if (!Df.ctrlKey) {
          let Db = Math.min(Math.max(wL.zy * DK, 0.1), 60);
          ((wL.py = DA - ((DA - wL.py) * wL.zy) / Db), (wL.zy = Db));
        }
        wq();
      },
      { passive: !1 },
    ));
  let Dt = () => Object.assign(wL, { x0: 0, x1: 1, zy: 1, py: 0 });
  w4.curveFit.addEventListener('click', Dt);
  let DH = { auto: w4.hAuto, aligned: w4.hAligned, free: w4.hFree, vector: w4.hVector };
  function DR() {
    let Df = wp,
      DJ = Df && w5[Df.key] && wS(Df.key) ? wI(Df.key) : null,
      DZ = DJ?.keys.find((DK) => DK.of === Df.of && !!DK.twin == !!Df.twin),
      DU = DZ ? Vw(DJ.ch.keys[DZ.of]) : null;
    for (let DK of [w4.keyFrame, w4.keyValue, w4.curveFlat, ...Object.values(DH)])
      DK.disabled = !DZ;
    for (let [DT, DA] of Object.entries(DH)) DA.classList.toggle('on', DU === DT);
    for (let [DX, DL] of [
      [w4.keyFrame, DZ ? +(wQ(DZ.u + DZ.du) * wV()).toFixed(2) : ''],
      [w4.keyValue, DZ ? +(DJ.at(wQ(DZ.u + DZ.du)) * (DJ.def.scale ?? 100)).toFixed(2) : ''],
    ])
      document.activeElement !== DX && DX.value !== String(DL) && (DX.value = DL);
  }
  for (let [Df, DJ] of Object.entries(DH)) DJ.addEventListener('click', () => DQ(Df));
  (w4.keyFrame.addEventListener('change', () => {
    let DZ = wp;
    if (!DZ || !wk() || !Number.isFinite(+w4.keyFrame.value)) return;
    let DU = wI(DZ.key).keys.find((DT) => DT.of === DZ.of && !!DT.twin == !!DZ.twin);
    if (!DU) return;
    let DK = +w4.keyFrame.value / wV() - wQ(DU.u + DU.du);
    (ww() && (DK -= Math.round(DK)), wH());
    for (let [DT, DA] of V0()) {
      let DX = wS(DT);
      for (let DL of DA.keys()) {
        let Db = DX.keys[DL],
          Dx = !ww() && (Db.u <= 0.000001 || Db.u >= 1 - 0.000001);
        (!Db.lock || w4.curvePlant.checked) &&
          !Dx &&
          (Db.du = Math.min(Math.max(Db.du + DK, -0.45), 0.45));
      }
      [...DA.keys()].some((Dy) => DX.keys[Dy].lock) && w3.plantMoved(DT);
    }
    (w3.byHand(), w3.remake());
  }),
    w4.keyValue.addEventListener('change', () => {
      let DZ = wp;
      if (!DZ || !wk() || !Number.isFinite(+w4.keyValue.value)) return;
      let DU = wI(DZ.key),
        DK = DU.keys.find((DX) => DX.of === DZ.of && !!DX.twin == !!DZ.twin);
      if (!DK || DU.ch.keys[DK.of].lock) return;
      let DT = (DX) => w5[DX].unit ?? 'cm',
        DA = +w4.keyValue.value / (DU.def.scale ?? 100) - DU.at(wQ(DK.u + DK.du));
      wH();
      for (let [DX, DL] of V0())
        DT(DX) === DT(DZ.key) &&
          Vp(DX, new Map([...DL].map(([Db, Dx]) => [Db, { by: DA, twin: Dx }])));
      (w3.byHand(), w3.remake());
    }));
  function DQ(DZ) {
    let DU = wN();
    if (!(!DU.length || !wk())) {
      wH();
      for (let DK of DU) {
        let DT = wI(DK.key),
          DA = DT.keys.find((Dy) => Dy.of === DK.of && !!Dy.twin === DK.twin),
          DX = DT.ch.keys[DK.of];
        if (!DA || !DX) continue;
        let DL = wP(DA, wb(DK.key), DT.at),
          Db = DT.ch.flip && DA.twin ? -1 : 1,
          Dx = (Dy) => {
            ((DX.tin = (DA.tin + Dy - DL.into) * Db), (DX.tout = (DA.tout + Dy - DL.out) * Db));
          };
        (delete DX.type,
          DZ === 'auto' || DZ === 'vector'
            ? (delete DX.tin, delete DX.tout, DZ === 'vector' && (DX.type = 'vector'))
            : DZ === 'free'
              ? ((DX.tin = DA.tin * Db), (DX.tout = DA.tout * Db), (DX.type = 'free'))
              : (Dx(DZ === 'flat' ? 0 : (DL.into + DL.out) / 2), (DX.type = 'aligned')));
      }
      (Vm(), w3.byHand(), w3.remake());
    }
  }
  (w4.curveHandle.addEventListener('change', () => DQ(w4.curveHandle.value)),
    w4.curveFlat.addEventListener('click', () => DQ('flat')));
  let Dj = (DZ) => {
    let DU = w6[DZ];
    return (
      !!DU.late ||
      !!DU.step ||
      (DU.amount ?? 1) !== 1 ||
      (w5[DZ].foot ? w8.flatMap((DK) => DU[DK].keys) : DU.keys).some(
        (DK) => (!DK.lock && (DK.du || DK.dv)) || V6(DK) || !!DK.i,
      )
    );
  };
  (w4.curveReset.addEventListener('click', () => {
    let DZ = w4.curveChan.value,
      DU = Dj(DZ);
    (wH(), wC(DZ), w3.fieldsShown(), DU && w3.remake());
  }),
    w4.curvePlantReset.addEventListener('click', () => {
      if (wk()) {
        wH();
        for (let DZ of Object.keys(w5).filter((DU) => w5[DU].foot))
          for (let DU of w8) for (let DK of w6[DZ][DU].keys) DK.lock && (DK.du = 0);
        (w3.plantShown(), w3.byHand(), w3.remake());
      }
    }),
    w4.curveResetAll.addEventListener('click', () => {
      if (wk()) {
        wH();
        for (let DZ of Object.keys(w5)) wC(DZ, !0);
        (w3.plantShown(), Dz(), w3.byHand(), w3.remake());
      }
    }));
  let Dz = (DZ = !1) => {
    wD() &&
      !w5[w4.curveChan.value]?.ctl &&
      (w4.curveChan.value = Object.keys(w5).find((DT) => w5[DT].ctl) ?? w4.curveChan.value);
    let DU = w4.curveChan.value,
      DK = wJ();
    (document.documentElement.classList.toggle('nocurve', DK),
      wz.delete(DU),
      (w4.curveName.textContent = DK
        ? 'No control picked'
        : w5[DU].group + ' \u00B7 ' + w5[DU].short),
      (w4.curveName.style.color = DK ? '' : w5[DU].colour),
      (w4.curveMirror.checked = w6[DU].mirror),
      (w4.curveFoot.disabled = !w5[DU].foot || w6[DU].mirror),
      DZ || VV(null),
      w3.shown(),
      (wK[DU] = !0));
    for (let DT of w4.curveList.querySelectorAll('div'))
      ((DT.querySelector('input').checked = wK[DT.dataset.key]),
        DT.querySelector('button').classList.toggle('on', DT.dataset.key === DU),
        DT.querySelector('button').classList.toggle('also', wz.has(DT.dataset.key)));
  };
  function Dp() {
    w4.curveList.textContent = '';
    let DZ = wD(),
      DU = (DK) => !DZ || Object.values(w5).some((DT) => DT.group === DK && DT.ctl);
    DZ &&
      !Object.values(w5).some((DK) => DK.ctl) &&
      w4.curveList.appendChild(
        Object.assign(document.createElement('p'), {
          className: 'note',
          textContent:
            'No controls yet. Add one under Controls, on the right: its curves are listed here.',
        }),
      );
    for (let DK of [...new Set(Object.values(w5).map((DT) => DT.group))].filter(DU)) {
      w4.curveList.appendChild(Object.assign(document.createElement('h3'), { textContent: DK }));
      for (let [DT, DA] of Object.entries(w5)) {
        if (DA.group !== DK) continue;
        let DX = document.createElement('div'),
          DL = Object.assign(document.createElement('input'), {
            type: 'checkbox',
            title: 'Show this curve',
          }),
          Db = Object.assign(document.createElement('button'), {
            type: 'button',
            textContent: DA.short,
            title: 'Edit ' + DK.toLowerCase() + ': ' + DA.short.toLowerCase(),
          });
        ((DX.dataset.key = DT),
          (Db.style.color = DA.colour),
          DL.addEventListener('change', () => {
            ((wK[DT] = DL.checked || DT === w4.curveChan.value), (DL.checked = wK[DT]));
          }),
          Db.addEventListener('click', (Dx) => {
            (Dx.ctrlKey || Dx.metaKey
              ? DT !== w4.curveChan.value &&
                !DA.foot &&
                (wz.delete(DT) || wz.add(DT), (wK[DT] = !0))
              : (wz.clear(), (w4.curveChan.value = DT)),
              Dz());
          }),
          DX.append(DL, Db),
          w4.curveList.appendChild(DX));
      }
    }
  }
  return (
    Dp(),
    w4.curveAdv.addEventListener('change', () => {
      let DZ = w4.curveAdv.checked,
        DU = w4.curveChan.value;
      if (
        (DZ || wz.clear(),
        (w4.curveNormWrap.hidden = !DZ),
        w4.curveList.classList.toggle('several', DZ),
        DZ)
      ) {
        for (let DK of Object.keys(w5)) wK[DK] = w5[DK].group === w5[DU].group;
      }
      Dz();
    }),
    w4.curveChan.addEventListener('change', () => {
      (wz.clear(), Dz());
    }),
    w4.curveFoot.addEventListener('change', () => VV(null)),
    {
      alsoPicked: wz,
      curveVis: wK,
      curvePick: VV,
      curveShown: Dz,
      listBuild: Dp,
      drawCurve: V5,
      viewHeld: wq,
      curveMoved: Dj,
      dropPicks: () => {
        ((wp = null), (wO = []));
      },
      oneWanted: () => wZ,
      busy: () => V7?.kind === 'xf',
      check: {
        dots: () => {
          let DZ = wX(),
            DU = w4.hipCurve.getBoundingClientRect(),
            DK = [],
            DT = ([DA, DX]) => [DU.left + DA / DZ.dpr, DU.top + DX / DZ.dpr];
          for (let DA of wg()) {
            let DX = wI(DA),
              DL = wb(DA, DZ),
              Db = V1(DX.keys);
            for (let Dx of DX.keys)
              for (let Dy of wy(wQ(Dx.u + Dx.du))) {
                let DW = wP(Dx, DL, DX.at, Dy),
                  Dq = Db.get(Dx);
                DK.push({
                  key: DA,
                  of: Dx.of,
                  twin: !!Dx.twin,
                  turn: Dy,
                  lock: !!Dx.lock,
                  at: DT([DW.kx, DW.ky]),
                  ...(wG(DA, Dx)
                    ? { in: Dq.hasIn ? DT(DW.tipIn) : null, out: Dq.hasOut ? DT(DW.tipOut) : null }
                    : {}),
                });
              }
          }
          return DK;
        },
        line: (DZ, DU) => {
          let DK = wX(),
            DT = w4.hipCurve.getBoundingClientRect(),
            DA = wb(DZ, DK);
          return [DT.left + DA.px(DU) / DK.dpr, DT.top + DA.py(wI(DZ).at(DU)) / DK.dpr];
        },
        under: (DZ, DU) => {
          let DK = wX(),
            DT = w4.hipCurve.getBoundingClientRect(),
            DA = (DZ - DT.left) * DK.dpr,
            DX = (DU - DT.top) * DK.dpr,
            DL = Vk(DA, DX);
          return DL ? DL.kind : VK(DA, DX) ? 'line' : DX < wA * DK.dpr ? 'ruler' : null;
        },
        picks: () => wO.map((DZ) => ({ ...DZ })),
        view: () => ({ ...wL }),
        draw: () => V5(+w4.time.value),
      },
    }
  );
}
var Ti = (w3) => w3 - Math.floor(w3),
  Oi = (w3, w4) => {
    let w5 = new kB(
      new kN().setFromPoints(w3),
      new kv({ color: w4, size: 11, sizeAttenuation: !1, depthTest: !1 }),
    );
    return ((w5.renderOrder = 7), (w5.frustumCulled = !1), w5);
  };
function Ri(w3, w4, w5) {
  let w6 = w3.P[w4],
    w7 = Ti(w5) * w3.N,
    w8 = Math.floor(w7) % w3.N,
    w9 = (w8 + 1) % w3.N,
    wk = (wD) => new kf(w6[wD * 3], w6[wD * 3 + 1], w6[wD * 3 + 2]),
    ww = wk(w9);
  w9 === 0 && w3.rootMotion && ww.add(w3.travelD);
  let wV = wk(w8).lerp(ww, w7 - Math.floor(w7));
  return w3.rootMotion ? wV : wV.addScaledVector(w3.dir, w3.speed * w7 * w3.dt);
}
function xc(w3) {
  let { renderer: w4, camera: w5, orbit: w6, framesNow: w7, setPlaying: w8 } = w3,
    w9 = [],
    wk = null,
    ww = (wS, wE) => Math.abs(Ti(wS - wE + 0.5) - 0.5) < 0.5 / w7(),
    wV = (wS) => {
      let wE = [];
      for (let wF of wS)
        for (let wC of wF) {
          let wH = Ti(wC.p ?? wC.u + wC.du);
          wE.some((we) => ww(we, wH)) || wE.push(wH);
        }
      return wE;
    };
  function wD(wS) {
    let wE = w4.domElement.getBoundingClientRect(),
      wF = new kf(),
      wC = null,
      wH = 13;
    for (let we of w9) {
      let wR = we.points.geometry.attributes.position,
        wQ = !0;
      for (let wj = we.points; wj; wj = wj.parent) wj.visible || (wQ = !1);
      if (wQ) {
        we.points.updateWorldMatrix(!0, !1);
        for (let wz = 0; wz < wR.count; wz++) {
          let wp = we.points.localToWorld(wF.fromBufferAttribute(wR, wz).clone()),
            wO = wp.clone().project(w5),
            wf = Math.hypot(
              ((wO.x + 1) / 2) * wE.width + wE.left - wS.clientX,
              ((1 - wO.y) / 2) * wE.height + wE.top - wS.clientY,
            );
          wO.z < 1 && wf < wH && ((wH = wf), (wC = { set: we, i: wz, world: wp }));
        }
      }
    }
    return wC;
  }
  function wm(wS, wE, wF) {
    return wF.lengthSq() < 1e-8
      ? null
      : (w3.mark(), wS.items[wE].apply(wF), w3.byHand(), w3.remake());
  }
  {
    let wS = new kG(),
      wE = (wC) => {
        let wH = w4.domElement.getBoundingClientRect();
        return new kF(
          ((wC.clientX - wH.left) / wH.width) * 2 - 1,
          1 - ((wC.clientY - wH.top) / wH.height) * 2,
        );
      };
    (w4.domElement.addEventListener('pointerdown', (wC) => {
      if (wC.button !== 0 || !w3.on() || w3.gizmoAxis()) return;
      let wH = wD(wC);
      if (!wH) return;
      w6.enabled = !1;
      let we = wH.set.points.geometry.attributes.position;
      ((wk = {
        ...wH,
        was: w3.playing(),
        local: new kf().fromBufferAttribute(we, wH.i),
        delta: new kf(),
        plane: new kV().setFromNormalAndCoplanarPoint(
          w5.getWorldDirection(new kf()).negate(),
          wH.world,
        ),
      }),
        w8(!1),
        w4.domElement.setPointerCapture?.(wC.pointerId));
    }),
      w4.domElement.addEventListener('pointermove', (wC) => {
        if (!wk) {
          w3.on() && (w4.domElement.style.cursor = wD(wC) ? 'grab' : '');
          return;
        }
        wS.setFromCamera(wE(wC), w5);
        let wH = wS.ray.intersectPlane(wk.plane, new kf());
        if (!wH) return;
        (wk.delta.copy(wH).sub(wk.world), wC.shiftKey && wk.delta.set(0, wk.delta.y, 0));
        let we = wk.local.clone().add(wk.delta),
          wR = wk.set.points.geometry.attributes.position;
        (wR.setXYZ(wk.i, we.x, we.y, we.z), (wR.needsUpdate = !0));
      }));
    let wF = () => {
      let wC = wk;
      if (!wC) return;
      ((wk = null), (w6.enabled = !0), w3.letGo());
      let wH = wm(wC.set, wC.i, wC.delta),
        we = () => w8(wC.was);
      wH ? wH.finally(we) : we();
    };
    (w4.domElement.addEventListener('pointerup', wF),
      w4.domElement.addEventListener('pointercancel', wF),
      w4.domElement.addEventListener('dblclick', (wC) => {
        let wH = w3.on() ? w3.addable() : null;
        if (!wH || wD(wC)) return;
        let we = wH.cell,
          wR = we.reading,
          wQ = w4.domElement.getBoundingClientRect(),
          wj = null,
          wz = 10,
          wp = wH.trails;
        we.marks.updateWorldMatrix(!0, !1);
        for (let [wO, wf] of wp)
          for (let wJ = 0; wJ < wR.N; wJ++) {
            let wZ = we.marks.localToWorld(Ri(wR, wO, wJ / wR.N)).project(w5),
              wU = Math.hypot(
                ((wZ.x + 1) / 2) * wQ.width + wQ.left - wC.clientX,
                ((1 - wZ.y) / 2) * wQ.height + wQ.top - wC.clientY,
              );
            wZ.z < 1 &&
              wU < wz &&
              (!wf || w3.inSwing(wf, wJ / wR.N)) &&
              ((wz = wU), (wj = { side: wf, x: wJ / wR.N }));
          }
        wj && w3.add(wj.side, wj.x);
      }));
  }
  return {
    sameTime: ww,
    timesOf: wV,
    keep: (wC) => {
      w9 = w9.filter(wC);
    },
    add: (wC) => {
      w9.push(wC);
    },
    check: {
      dots: () =>
        w9.flatMap((wC, wH) =>
          wC.items.map((we, wR) => ({
            set: wH,
            kind: wC.kind,
            i: wR,
            at: +(we.x * w7()).toFixed(1),
          })),
        ),
      move: (wC, wH, we) => wm(w9[wC], wH, new kf(...we)),
    },
  };
}
var xa = (w3) => w3.replace(/_[lr]$/, (w4) => (w4 === '_l' ? '_r' : '_l'));
function Ec(w3) {
  let {
      scene: w4,
      camera: w5,
      renderer: w6,
      orbit: w7,
      els: w8,
      picks: w9,
      setPlaying: wk,
      acrossTurn: ww,
    } = w3,
    wV = null,
    wD = null,
    wm = null,
    wS = 0,
    wE = new kT();
  w4.add(wE);
  let wF = new L(w5, w6.domElement);
  (wF.setSpace('local'),
    wF.setSize(0.7),
    (wF.visible = wF.enabled = !1),
    w4.add(wF),
    wF.attach(wE));
  let wC = new kB(
    new kN().setAttribute('position', new kh(w9.length * 3, 3)),
    new kv({
      color: 16765286,
      size: 9,
      sizeAttenuation: !1,
      depthTest: !1,
      transparent: !0,
      opacity: 0.9,
    }),
  );
  ((wC.renderOrder = 6), (wC.frustumCulled = !1), (wC.visible = !1), w4.add(wC));
  function wH() {
    let wj = wV ? w3.poseOf(wV) : null,
      wz = new kU().setFromQuaternion(new kO(...(wj?.rot ?? [0, 0, 0, 1])), 'XYZ'),
      wp = wj?.loc ?? [0, 0, 0],
      wO = w3.placeless(wV?.part),
      wf = 180 / Math.PI;
    ((w8.poseWho.textContent = wV
      ? 'Pose (' +
        w3.partLabel(wV.part) +
        (wV.side ? ': ' + (wV.side === 'l' ? 'left' : 'right') + ' picked' : '') +
        ')'
      : 'Pose'),
      (w8.poseRX.value = +(wz.x * wf).toFixed(2)),
      (w8.poseRY.value = +(wz.y * wf).toFixed(2)),
      (w8.poseRZ.value = +(wz.z * wf).toFixed(2)),
      (w8.poseLX.value = +(wp[0] * 100).toFixed(2)),
      (w8.poseLY.value = +(wp[2] * 100).toFixed(2)),
      (w8.poseLZ.value = +(wp[1] * 100).toFixed(2)));
    for (let wJ of [w8.poseRX, w8.poseRY, w8.poseRZ, w8.poseReset]) wJ.disabled = !wV;
    for (let wZ of [w8.poseLX, w8.poseLY, w8.poseLZ]) wZ.disabled = !wV || wO;
  }
  function we(wj) {
    let wz = wE.quaternion;
    return {
      turn:
        wj.space === 'local'
          ? wj.q0.clone().invert().multiply(wz)
          : wj.world0
              .clone()
              .invert()
              .multiply(wz.clone().multiply(wj.q0.clone().invert()))
              .multiply(wj.world0),
      move: wE.position.clone().sub(wj.p0),
    };
  }
  function wR(wj, wz, wp, wO) {
    wj &&
      (wj.quaternion.copy(wz.q).multiply(wp),
      wj.position.copy(wz.p),
      wO.lengthSq() > 0 &&
        (wj.parent.updateWorldMatrix(!0, !1),
        wj.position.copy(wj.parent.worldToLocal(wj.parent.localToWorld(wz.p.clone()).add(wO)))),
      wj.updateMatrixWorld(!0));
  }
  function wQ() {
    let wj = w3.cell(),
      wz = w8.poseOn.checked && !!wj && w3.ready();
    if (((wC.visible = wz), (wF.visible = wF.enabled = wz && !!wV), !wz)) return;
    let wp = wD ?? wm;
    if (wp) {
      let { turn: wZ, move: wU } = wp.done ?? we(wp);
      (wR(wp.bone, wp.at, wZ, wU),
        wp.pair &&
          w8.poseWhen.value === 'cycle' &&
          wR(wp.pair, wp.pairAt, ww(wZ, wp.name, xa(wp.name)), Dn(wU)));
    }
    let wO = wC.geometry.attributes.position,
      wf = new kf();
    (w9.forEach((wK, wT) => {
      let wA = wj.rig.getObjectByName(wK.name);
      wA && (wA.getWorldPosition(wf), wO.setXYZ(wT, wf.x, wf.y, wf.z));
    }),
      (wO.needsUpdate = !0));
    let wJ = wV && wj.rig.getObjectByName(wV.name);
    wJ && !wp && (wJ.getWorldPosition(wE.position), wJ.getWorldQuaternion(wE.quaternion));
  }
  wF.addEventListener('dragging-changed', (wj) => {
    if (((w7.enabled = !wj.value), wj.value)) {
      let wf = w3.cell(),
        wJ = wV && wf?.rig.getObjectByName(wV.name);
      if (!wJ) return;
      let wZ = wV.side ? wf.rig.getObjectByName(xa(wV.name)) : null,
        wU = wm ? wm.was : w3.playing(),
        wK = (wT) => ({ q: wT.quaternion.clone(), p: wT.position.clone() });
      ((wm = null),
        (wD = {
          name: wV.name,
          space: wF.space,
          was: wU,
          bone: wJ,
          at: wK(wJ),
          world0: wJ.getWorldQuaternion(new kO()),
          pair: wZ,
          pairAt: wZ && wK(wZ),
          q0: wE.quaternion.clone(),
          p0: wE.position.clone(),
        }),
        wk(!1));
      return;
    }
    let wz = wD;
    if (((wD = null), (wS = performance.now()), !wz)) return;
    ((wz.done = we(wz)), (wm = wz));
    let wp = wV ? w3.apply(wV, wz.done.turn, wz.done.move) : null,
      wO = () => {
        wm === wz && ((wm = null), wk(wz.was));
      };
    wp ? wp.finally(wO) : wO();
  });
  {
    let wj = null;
    (w6.domElement.addEventListener('pointerdown', (wz) => {
      wj = [wz.clientX, wz.clientY];
    }),
      w6.domElement.addEventListener('pointerup', (wz) => {
        let wp = w3.cell();
        if (
          !w8.poseOn.checked ||
          !wp ||
          !wj ||
          Math.hypot(wz.clientX - wj[0], wz.clientY - wj[1]) > 5 ||
          wF.axis ||
          wD ||
          wm ||
          performance.now() - wS < 250
        )
          return;
        let wO = w6.domElement.getBoundingClientRect(),
          wf = new kf(),
          wJ = null,
          wZ = 16;
        for (let wU of w9) {
          let wK = wp.rig.getObjectByName(wU.name);
          if (!wK) continue;
          wK.getWorldPosition(wf).project(w5);
          let wT = Math.hypot(
            ((wf.x + 1) / 2) * wO.width + wO.left - wz.clientX,
            ((1 - wf.y) / 2) * wO.height + wO.top - wz.clientY,
          );
          wf.z < 1 && wT < wZ && ((wZ = wT), (wJ = wU));
        }
        wJ && ((wV = wJ), wH());
      }));
  }
  (w8.poseOn.addEventListener('change', () => {
    (w8.poseOn.checked || (wV = null), wH());
  }),
    w8.poseMode.addEventListener('change', () => wF.setMode(w8.poseMode.value)),
    w8.poseSpace.addEventListener('change', () => wF.setSpace(w8.poseSpace.value)));
  for (let wz of [w8.poseRX, w8.poseRY, w8.poseRZ, w8.poseLX, w8.poseLY, w8.poseLZ])
    wz.addEventListener('change', () => {
      if (!wV || !w3.ready()) return;
      let wp = (wf) => (Number.isFinite(+wf.value) ? +wf.value : 0),
        wO = Math.PI / 180;
      (w3.mark(),
        w3.setPose(wV, {
          rot: new kO()
            .setFromEuler(new kU(wp(w8.poseRX) * wO, wp(w8.poseRY) * wO, wp(w8.poseRZ) * wO, 'XYZ'))
            .toArray(),
          loc: w3.placeless(wV.part)
            ? [0, 0, 0]
            : [wp(w8.poseLX) / 100, wp(w8.poseLZ) / 100, wp(w8.poseLY) / 100],
        }),
        wH(),
        w3.edited());
    });
  return {
    gizmo: wF,
    shown: wH,
    step: wQ,
    picked: () => wV,
    letGo: () => {
      wS = performance.now();
    },
    check: {
      pick: (wp) => ((wV = w9.find((wO) => wO.name === wp) ?? null), wH(), !!wV),
      state: () => ({ held: !!wD, kept: !!wm, playing: w3.playing() }),
      take: () => wF.dispatchEvent({ type: 'dragging-changed', value: !0 }),
      turn: (wp) => {
        wE.quaternion.copy(wD.q0).multiply(new kO(...wp));
      },
      drop: () => wF.dispatchEvent({ type: 'dragging-changed', value: !1 }),
    },
  };
}
function Mc(w3) {
  let w4 = +w3.min,
    w5 = +w3.max,
    w6 = +w3.step || 0.01,
    w7 = w3.dataset.soft === 'fixed',
    w8 = Math.min(Math.max(0, w4), w5),
    w9 = Object.assign(document.createElement('input'), {
      type: 'range',
      className: 'soft',
      min: w4,
      max: w5,
      step: w6,
    });
  ((w9.value = w3.value),
    w7 || (w3.removeAttribute('min'), w3.removeAttribute('max')),
    w3.before(w9));
  let wk = (ww) => {
    w7 ||
      (Math.abs(ww - w8) < w6 / 2
        ? ((w9.min = w4), (w9.max = w5))
        : (ww > +w9.max && (w9.max = ww), ww < +w9.min && (w9.min = ww)));
  };
  ((w3._sync = () => {
    let ww = +w3.value;
    Number.isFinite(ww) &&
      (w7 && ((ww = Math.min(Math.max(ww, w4), w5)), (w3.value = ww)), wk(ww), (w9.value = ww));
  }),
    w9.addEventListener('input', () => {
      w3.value = w9.value;
    }),
    w9.addEventListener('change', () => {
      ((w3.value = w9.value), w3.dispatchEvent(new Event('change', { bubbles: !0 })));
    }),
    w3.addEventListener('change', () => w3._sync()));
}
(K(), T(), E());
var $o = 'assets/animation-library',
  Yi = S === 'dev',
  A = (w3) => document.getElementById(w3);
A('toPlay').hidden = !Yi;
var l = {
    source: A('source'),
    mixamo: A('mixamo'),
    play: A('play'),
    rate: A('rate'),
    time: A('time'),
    clock: A('clock'),
    rootMotion: A('rootMotion'),
    prints: A('prints'),
    lanes: A('lanes'),
    trails: A('trails'),
    bones: A('bones'),
    libAnims: A('lib-tab-anims'),
    libChars: A('lib-tab-chars'),
    libSearch: A('lib-search'),
    libCount: A('lib-count'),
    libGrid: A('lib-grid'),
    libCharGrid: A('lib-chargrid'),
    facing: A('facing'),
    startOver: A('startOver'),
    exOne: A('exOne'),
    shotOpens: A('shotOpens'),
    shotCloses: A('shotCloses'),
    saveName: A('saveName'),
    saveOne: A('saveOne'),
    saveEight: A('saveEight'),
    savedList: A('savedList'),
    savedRemove: A('savedRemove'),
    saveNote: A('saveNote'),
    generate: A('generate'),
    toPlay: A('toPlay'),
    advanced: A('advanced'),
    view: A('view'),
    status: A('status'),
    contacts: A('contacts'),
    stPreset: A('stPreset'),
    stChest: A('stChest'),
    stSwing: A('stSwing'),
    stRows: A('stRows'),
    dirTable: A('dirTable'),
    results: A('results'),
    resultsStale: A('resultsStale'),
    strafe: A('strafe'),
    strafeNote: A('strafeNote'),
    strafeClear: A('strafeClear'),
    exSkeleton: A('exSkeleton'),
    exFormat: A('exFormat'),
    exTarget: A('exTarget'),
    exMotion: A('exMotion'),
    exMesh: A('exMesh'),
    exSplit: A('exSplit'),
    exGo: A('exGo'),
    exRest: A('exRest'),
    exNote: A('exNote'),
    polLock: A('polLock'),
    polGrip: A('polGrip'),
    polGripOut: A('polGripOut'),
    polLockSource: A('polLockSource'),
    polLean: A('polLean'),
    polHips: A('polHips'),
    polChest: A('polChest'),
    polHead: A('polHead'),
    polWeapon: A('polWeapon'),
    polWeight: A('polWeight'),
    polLean45: A('polLean45'),
    polLean90: A('polLean90'),
    polLean135: A('polLean135'),
    polLean180: A('polLean180'),
    polReach: A('polReach'),
    polReachLimit: A('polReachLimit'),
    polReachDown: A('polReachDown'),
    polReachSide: A('polReachSide'),
    polArms: A('polArms'),
    polGap: A('polGap'),
    polScale: A('polScale'),
    polShapes: A('polShapes'),
    polSwing45: A('polSwing45'),
    polSwing90: A('polSwing90'),
    polSwing135: A('polSwing135'),
    polSwing180: A('polSwing180'),
    gaitPreset: A('gaitPreset'),
    gaitReset: A('gaitReset'),
    gaitSpeed: A('gaitSpeed'),
    gaitShare: A('gaitShare'),
    gaitStride: A('gaitStride'),
    gaitCadence: A('gaitCadence'),
    gaitWidth: A('gaitWidth'),
    gaitLift: A('gaitLift'),
    gaitDrop: A('gaitDrop'),
    gaitBounce: A('gaitBounce'),
    gaitSway: A('gaitSway'),
    gaitSwing: A('gaitSwing'),
    gaitLean: A('gaitLean'),
    gaitOut: A('gaitOut'),
    gaitPostF: A('gaitPostF'),
    gaitPostS: A('gaitPostS'),
    gaitPostT: A('gaitPostT'),
    gaitHeadAhead: A('gaitHeadAhead'),
    hipTrail: A('hipTrail'),
    hipCurve: A('hipCurve'),
    curveMirror: A('curveMirror'),
    curveReset: A('curveReset'),
    curveChan: A('curveChan'),
    curveFoot: A('curveFoot'),
    gaitGround: A('gaitGround'),
    ctlKind: A('ctlKind'),
    aimDist: A('aimDist'),
    aimAxis: A('aimAxis'),
    aimRoll: A('aimRoll'),
    aimUpAxis: A('aimUpAxis'),
    aimUpDist: A('aimUpDist'),
    aimSpace: A('aimSpace'),
    aimWho: A('aimWho'),
    pinTo: A('pinTo'),
    pinWho: A('pinWho'),
    trailEdit: A('trailEdit'),
    styleList: A('styleList'),
    styleLoad: A('styleLoad'),
    styleName: A('styleName'),
    styleSave: A('styleSave'),
    styleFile: A('styleFile'),
    styleOpenBtn: A('styleOpenBtn'),
    styleOpen: A('styleOpen'),
    styleDelete: A('styleDelete'),
    styleNote: A('styleNote'),
    poseOn: A('poseOn'),
    poseWho: A('poseWho'),
    poseMode: A('poseMode'),
    poseSpace: A('poseSpace'),
    poseWhen: A('poseWhen'),
    poseReset: A('poseReset'),
    poseRX: A('poseRX'),
    poseRY: A('poseRY'),
    poseRZ: A('poseRZ'),
    poseLX: A('poseLX'),
    poseLY: A('poseLY'),
    poseLZ: A('poseLZ'),
    ctlPart: A('ctlPart'),
    ctlAdd: A('ctlAdd'),
    chLate: A('chLate'),
    chAmt: A('chAmt'),
    ctlStep: A('ctlStep'),
    ctlBone: A('ctlBone'),
    chAll: A('chAll'),
    curveOnly: A('curveOnly'),
    keyFrame: A('keyFrame'),
    keyValue: A('keyValue'),
    hAuto: A('hAuto'),
    hAligned: A('hAligned'),
    hFree: A('hFree'),
    hVector: A('hVector'),
    curveHint: A('curveHint'),
    outList: A('outList'),
    outOnly: A('outOnly'),
    poseResetAll: A('poseResetAll'),
    ftOn: A('ftOn'),
    ftPreset: A('ftPreset'),
    ftReset: A('ftReset'),
    ftChest: A('ftChest'),
    ftHead: A('ftHead'),
    ftArms: A('ftArms'),
    ftLag: A('ftLag'),
    ftBounce: A('ftBounce'),
    ftLoosen: A('ftLoosen'),
    curveUndo: A('curveUndo'),
    curveRedo: A('curveRedo'),
    curveFit: A('curveFit'),
    curvePlantReset: A('curvePlantReset'),
    curveResetAll: A('curveResetAll'),
    curvePlant: A('curvePlant'),
    curveAdv: A('curveAdv'),
    curveNorm: A('curveNorm'),
    curveOne: A('curveOne'),
    curveNormWrap: A('curveNormWrap'),
    curveList: A('curveList'),
    curveHandle: A('curveHandle'),
    curveFlat: A('curveFlat'),
    curveBox: A('curveBox'),
    curveDock: A('curveDock'),
    curveName: A('curveName'),
    curveGrip: A('curveGrip'),
  },
  yt = (w3, w4 = !1) => {
    ((l.status.textContent = l.status.title = w3), (l.status.className = w4 ? 'bad' : ''));
  };
((l.advanced.checked = document.documentElement.classList.contains('advanced')),
  l.advanced.addEventListener('change', () => {
    document.documentElement.classList.toggle('advanced', l.advanced.checked);
    try {
      localStorage.setItem('actionforge.lab.advanced', l.advanced.checked ? '1' : '0');
    } catch {}
  }));
var Sn = { l: 640460, r: 16752451 },
  Sc = fc.filter((w3) => w3.theta !== 0),
  No = new kQ({
    antialias: !0,
    canvas: Object.assign(document.createElement('canvas'), { id: 'stage' }),
  });
(A('viewport').prepend(No.domElement),
  No.setPixelRatio(Math.min(devicePixelRatio || 1, 2)),
  (No.outputColorSpace = kH),
  (No.shadowMap.enabled = !0),
  (No.shadowMap.type = kA));
var go = new kp();
go.background = new kX(1382428);
var gn = new kw(35, 1, 0.05, 200),
  $n = new X(gn, No.domElement),
  $c = {
    single: { pos: [3.4, 1.9, 2.2], target: [0, 0.8, 0.2] },
    grid: { pos: [-4.2, 8.5, -8.5], target: [0, 0.6, 0.4] },
  },
  qi = (w3) => {
    (gn.position.set(...$c[w3].pos), $n.target.set(...$c[w3].target), $n.update());
  };
(qi('single'), go.add(new kE(14674175, 3813672, 1.2)));
var Zo = new kC(16777215, 2.2);
((Zo.castShadow = !0),
  Zo.shadow.mapSize.set(2048, 2048),
  Object.assign(Zo.shadow.camera, { left: -6, right: 6, top: 6, bottom: -6, near: 0.1, far: 16 }),
  go.add(Zo, Zo.target));
var Gi = new w1(new km(400, 400), new kZ({ color: 1909030, roughness: 1 }));
((Gi.rotation.x = -Math.PI / 2), (Gi.receiveShadow = !0), go.add(Gi));
var Ar = new w0(400, 800, 3095108, 2501940);
((Ar.position.y = 0.001), go.add(Ar));
var Mo = await (await fetch($o + '/manifests/library.json')).json(),
  ad = new k8(),
  Ui = (w3) => new Promise((w4, w5) => ad.parse(w3, '', w4, w5)),
  zc = await (await fetch($o + '/' + (Mo.rigs?.human?.file ?? Mo.rig.file))).arrayBuffer(),
  rd = await Ui(zc.slice(0)),
  La = rd.scene,
  dt = () => k9(La),
  Mn = Pl(dt());
La.traverse((w3) => {
  w3.isMesh && ((w3.castShadow = !0), (w3.frustumCulled = !1));
});
function Yc(w3, w4, { cycles: w5 = [-3, -2, -1, 0, 1, 2, 3], at: w6 = new kf() } = {}) {
  let w7 = new kR(),
    w8 = new kR();
  w8.position.copy(w6);
  let w9 = k9(La),
    wk = new kR();
  wk.add(w9);
  let ww = new kR();
  (w8.add(wk, ww), w7.add(w8));
  let wV = new kb(w9),
    wD = new kg(w9);
  ((wD.visible = l.bones.checked), w7.add(wD));
  let wm = {
    group: w7,
    rig: w9,
    holder: wk,
    marks: ww,
    mixer: wV,
    skel: wD,
    reading: w4,
    clip: w3,
    cycles: w5,
    action: null,
    rootMotion: !1,
  };
  return (
    (wm.setRootMotion = (wS) => {
      ((wm.rootMotion = wS),
        wm.action?.stop(),
        wV.uncacheRoot(w9),
        (wm.action = wV.clipAction(wS ? w3 : I(w3, { rootName: 'root' }))),
        wm.action.play(),
        wm.worn && Cu(wm, wS),
        wk.position.set(0, 0, 0),
        ww.position.set(0, 0, 0),
        Lr(wm));
    }),
    wm.setRootMotion(!1),
    wm
  );
}
var id = new kk(0.09, 0.006, 0.24);
function Lr(w3) {
  let { marks: w4, reading: w5, cycles: w6 } = w3;
  if ((w4.clear(), !w5)) return;
  let w7 = w5.rootMotion
      ? w5.travelD.clone()
      : w5.dir.clone().multiplyScalar(w5.speed * w5.N * w5.dt),
    w8 = w3.rootMotion ? [-1, 0, 1, 2, 3, 4, 5, 6] : w6;
  for (let w9 of 'lr') {
    let wk = new kW({ color: Sn[w9], transparent: !0, opacity: 0.55 }),
      ww = new kL({ color: Sn[w9], transparent: !0, opacity: 0.8 });
    for (let wV of w8) {
      let wD = w7.clone().multiplyScalar(wV);
      if (l.prints.checked)
        for (let wm of w5.feet[w9].stances) {
          let wS = new w1(id, wk);
          (wS.position.copy(wm.plant).add(wD).setY(0.004),
            (wS.rotation.y = Math.atan2(w5.dir.x, w5.dir.z) + wm.yaw),
            w4.add(wS));
        }
      if (l.trails.checked) {
        let wE = [];
        for (let wF = 0; wF <= w5.N; wF++) {
          let wC = wF % w5.N,
            wH = new kf(
              w5.P['ankle_' + w9][wC * 3],
              w5.P['ankle_' + w9][wC * 3 + 1],
              w5.P['ankle_' + w9][wC * 3 + 2],
            );
          (w5.rootMotion
            ? wF === w5.N && wH.add(w5.travelD)
            : wH.addScaledVector(w5.dir, w5.speed * wF * w5.dt),
            wE.push(wH.add(wD)));
        }
        w4.add(Tc(wE, Sn[w9], 0.8, ww));
      }
    }
    if (w9 === 'l' && l.hipTrail.checked) {
      let we = new kL({ color: 16777215, transparent: !0, opacity: 0.85 });
      for (let wR of w8) {
        let wQ = w7.clone().multiplyScalar(wR),
          wj = [];
        for (let wz = 0; wz <= w5.N; wz++) {
          let wp = wz % w5.N,
            wO = new kf(w5.P.pelvis[wp * 3], w5.P.pelvis[wp * 3 + 1], w5.P.pelvis[wp * 3 + 2]);
          (w5.rootMotion
            ? wz === w5.N && wO.add(w5.travelD)
            : wO.addScaledVector(w5.dir, w5.speed * wz * w5.dt),
            wj.push(wO.add(wQ)));
        }
        w4.add(Tc(wj, 16777215, 0.85, we));
      }
    }
    if (l.lanes.checked) {
      let wf = w9 === 'l' ? w5.summary.laneL : w5.summary.laneR,
        wJ = 1.3 * Math.max(...w8.map(Math.abs), 1) + 1,
        wZ = new kf(w5.P.pelvis[0], 0, w5.P.pelvis[2])
          .clone()
          .addScaledVector(w5.left, wf)
          .addScaledVector(w5.dir, -wJ),
        wU = wZ.clone().addScaledVector(w5.dir, 2 * wJ);
      w4.add(
        new kx(
          new kN().setFromPoints([wZ.setY(0.003), wU.setY(0.003)]),
          new ky({ color: Sn[w9], dashSize: 0.08, gapSize: 0.06 }),
        ).computeLineDistances(),
      );
    }
  }
  Ud(w3);
}
function Tc(w3, w4, w5, w6) {
  let w7 = new kN().setFromPoints(w3);
  if (!l.trailEdit.checked) return new kx(w7, w6);
  let w8 = w3.map((wV, wD) => wV.distanceTo(w3[Math.max(wD - 1, 0)])),
    w9 = Math.max(...w8, 1e-9),
    wk = new kX(w4),
    ww = [];
  w8[0] = w8[1] ?? 0;
  for (let wV of w8) {
    let wD = 0.22 + 0.78 * Math.sqrt(wV / w9);
    ww.push(wk.r * wD, wk.g * wD, wk.b * wD);
  }
  return (
    w7.setAttribute('color', new kh(ww, 3)),
    new kx(w7, new kL({ vertexColors: !0, transparent: !0, opacity: Math.min(w5 + 0.15, 1) }))
  );
}
function sd(w3, w4) {
  if (!w4?.length) return null;
  let w5 = new kR();
  w3.group.add(w5);
  let w6 = (w8, w9) => new kL({ color: w8, transparent: !0, opacity: w9, depthTest: !1 }),
    w7 = {
      group: w5,
      marks: w4.flatMap((w8) =>
        [[w8.at, 16765286, 0.022, 'at'], ...(w8.up ? [[w8.up, 5032432, 0.014, 'up']] : [])].map(
          ([w9, wk, ww, wV]) => {
            let wD = {
              name: w8.bone,
              which: wV,
              ctl:
                ft.find(
                  (wm) => wm.kind === 'aim' && [Zn(wm.part), xa(Zn(wm.part))].includes(w8.bone),
                ) ?? null,
              bone: w3.rig.getObjectByName(w8.bone),
              pts: w9,
              dot: new w1(new kz(ww, 12, 8), new kW({ color: wk, depthTest: !1 })),
              to: new kx(new kN().setFromPoints([new kf(), new kf()]), w6(wk, 0.6)),
              path: new kY(new kN().setFromPoints(w9), w6(wk, 0.45)),
            };
            for (let wm of [wD.dot, wD.to, wD.path])
              ((wm.renderOrder = 5), (wm.frustumCulled = !1), w5.add(wm));
            return wD;
          },
        ),
      ),
    };
  return (wu(w7), w7);
}
function ld(w3, w4) {
  if (!w3.aims) return;
  let w5 = w3.rig.getObjectByName('root').getWorldPosition(new kf());
  for (let w6 of w3.aims.marks) {
    let w7 = !w6.ctl || !ft.includes(w6.ctl) || Eu(w6.ctl);
    for (let wV of [w6.dot, w6.to, w6.path]) wV.visible = w7;
    let w8 = w6.pts.length,
      w9 = (w4 - Math.floor(w4)) * w8,
      wk = Math.floor(w9) % w8,
      ww = w6.pts[wk]
        .clone()
        .lerp(w6.pts[(wk + 1) % w8], w9 - Math.floor(w9))
        .add(w5);
    (w6.dot.position.copy(ww),
      w6.path.position.copy(w5),
      w6.bone && w6.to.geometry.setFromPoints([w6.bone.getWorldPosition(new kf()), ww]));
  }
}
function qc(w3, w4, w5) {
  if (!w3.rootMotion) return w3.speed * w4;
  let w6 = (w4 / w5) * w3.N,
    w7 = Math.floor(w6) % w3.N,
    w8 = (w7 + 1) % w3.N,
    w9 = w6 - Math.floor(w6),
    wk = (wD) => new kf(w3.P.root[wD * 3] - w3.P.root[0], 0, w3.P.root[wD * 3 + 2] - w3.P.root[2]),
    ww = wk(w7),
    wV = w8 === 0 ? w3.travelD.clone() : wk(w8);
  return ww.lerp(wV, w9).dot(w3.dir);
}
function Pi(w3, w4) {
  let w5 = w3.action.getClip().duration,
    w6 = w4 % w5,
    w7 = Math.floor(w4 / w5),
    w8 = w3.reading;
  if (((w3.action.time = w6), w3.mixer.update(0), w3.rootMotion))
    w3.holder.position.copy(w8.travelD).multiplyScalar(w7 % 6);
  else {
    let w9 = qc(w8, w6, w5) + w7 * w8.summary.stride;
    w3.marks.position
      .copy(w8.dir)
      .multiplyScalar(w8.summary.stride > 0.000001 ? -(w9 % w8.summary.stride) : 0)
      .sub(new kf(w8.P.root[0], 0, w8.P.root[2]));
  }
  if (w3.worn?.action) {
    let wk = w3.worn;
    ((wk.action.time = w6), wk.mixer.update(0), wk.drive?.());
  }
  return w3.rig.getObjectByName('pelvis').getWorldPosition(new kf());
}
var ye = new Map(),
  Tn = {},
  Qi = 0.3,
  Cr = !1,
  cd = new Set(['swim_fwd_loop', 'swim_idle_loop', 'slide_loop']),
  ud = ([w3, w4]) =>
    (!w4.rig || w4.rig === 'human') &&
    w4.loops &&
    (w4.rootDistance ?? 0) > Qi &&
    w4.feet &&
    (!w4.category || w4.category === 'locomotion') &&
    !/climb/.test(w3);
for (let [e, t] of Object.entries(Mo.clips)) {
  if ((t.rig && t.rig !== 'human') || v(t)) continue;
  let o = ud([e, t]),
    n = (t.rootDistance ?? 0) > Qi,
    r = !t.loops || Math.abs(t.rootDisplacement?.[1] ?? 0) > 0.05;
  (ye.set(e, { label: t.label ?? e, file: t.file, clip: null, once: r, plain: !o, still: !n }),
    !((r || cd.has(e)) && !Cr) &&
      (Tn[e] = {
        ...t,
        category: o
          ? 'Cycles'
          : !t.loops && n
            ? 'Played once'
            : t.category
              ? t.category[0].toUpperCase() + t.category.slice(1)
              : 'Other',
      }));
}
var Oc = { Cycles: 0, 'Played once': 1, Yours: 3 },
  dd = (w3, w4) => (Oc[w3] ?? 2) - (Oc[w4] ?? 2) || w3.localeCompare(w4);
function Gc(w3) {
  let w4 = w3.tracks.find((w7) => w7.name === 'root.position');
  if (!w4 || w4.times.length < 2) return { over: 0, up: 0 };
  let w5 = w4.values,
    w6 = w5.length - 3;
  return { over: Math.hypot(w5[w6] - w5[0], w5[w6 + 2] - w5[2]), up: Math.abs(w5[w6 + 1] - w5[1]) };
}
function fd(w3) {
  let w4 = 0;
  for (let w5 of w3.tracks) {
    if (!w5.name.endsWith('.quaternion') || w5.times.length < 2) continue;
    let w6 = w5.values,
      w7 = w6.length - 4,
      w8 = Math.abs(w6[0] * w6[w7] + w6[1] * w6[w7 + 1] + w6[2] * w6[w7 + 2] + w6[3] * w6[w7 + 3]);
    w4 = Math.max(w4, (2 * Math.acos(Math.min(1, w8)) * 180) / Math.PI);
  }
  return w4 < 12;
}
var Hi = (w3) => {
    let w4 = Gc(w3),
      w5 = !fd(w3) || w4.up > 0.05,
      w6 = w4.over <= Qi;
    return { once: w5, still: w6, plain: w5 || w6 };
  },
  Pr = (w3, w4, w5 = null) =>
    w3?.once
      ? ma(dt(), w4, w5 ? { contacts: w5 } : {})
      : Po(dt(), w4, { ...(w5 ? { contacts: w5 } : {}), walk: !w3?.plain }),
  jr = () => {
    let w3 = ye.get(ot);
    return w3 ? (ye.get(w3.origin ?? ot) ?? w3) : null;
  },
  ta = () => !!jr()?.plain,
  On = new Option('', ''),
  Ir = Object.assign(document.createElement('optgroup'), { label: 'Adjusted' }),
  Qn = Object.assign(document.createElement('optgroup'), { label: 'Generated' });
l.source.append(On, Ir, Qn);
var ot = ye.has('walk_loop') ? 'walk_loop' : [...ye.keys()][0];
((On.value = ot), (On.textContent = ye.get(ot).label), (l.source.value = ot));
async function oa(w3) {
  let w4 = ye.get(w3);
  if (
    !w4.clip &&
    ((w4.clip = w4.doc
      ? await oa(w4.doc.from)
      : w4.record
        ? d(w4.record, kD)
        : (await Ui(await (await fetch($o + '/' + w4.file)).arrayBuffer())).animations[0]),
    w4.plain && !w4.once && Gc(w4.clip).up > 0.05 && (w4.once = !0),
    w4.doc)
  ) {
    let w5 = ye.get(w4.doc.from);
    Object.assign(w4, { once: w5.once, plain: w5.plain, still: w5.still });
  }
  return w4.clip;
}
async function Xi(w3) {
  let w4 = ye.get(w3);
  if (w4) {
    if (w3 !== (ye.get(ot)?.origin ?? ot)) {
      let w5 = ye.get('gait:' + w3);
      (Ir.replaceChildren(...(w5 ? [new Option(w5.label, 'gait:' + w3)] : [])),
        Qn.replaceChildren());
      for (let w6 of [...ye.keys()]) w6.startsWith('gen:') && ye.delete(w6);
      for (let w7 of So) xo.remove(w7.group);
      ((So = []),
        (jt = null),
        Zi(!1),
        (l.exGo.disabled = l.toPlay.disabled = l.saveEight.disabled = !0),
        (l.exNote.textContent =
          'The one in the view can be exported now; all eight, after Generate.'),
        l.results.replaceChildren(
          Object.assign(document.createElement('p'), {
            className: 'note',
            textContent: 'Press Generate.',
          }),
        ));
    }
    ((On.value = w3),
      (On.textContent = w4.label),
      (l.source.value = w3),
      (l.saveName.value = w4.doc ? w4.label : ''),
      Ta((w8) => {
        w8.last = w3;
      }),
      await Ln());
  }
}
var Uc = null;
async function pd() {
  Uc ??= (await (await fetch($o + '/manifests/bone-maps.json')).json()).maps.mixamo.bones;
  let w3 = (await z('mixamo', $o, kD)).clone(!0);
  return (w3.updateMatrixWorld(!0), w3);
}
async function Qc(w3) {
  let w4 = await pd(),
    w5 = await w3.arrayBuffer(),
    w6;
  try {
    w6 = new V().parse(w5, '');
  } catch {
    w6 = new V().parse(g(new Uint8Array(w5)), '');
  }
  let w7 = new Set();
  if (
    (w6.traverse((w9) => {
      w9.name && w7.add(w9.name);
    }),
    Y(w7) !== 'mixamo')
  )
    throw new Error("That isn't a Mixamo skeleton \u2014 this loader reads Mixamo FBX files");
  let w8 = w3.name.replace(/\.fbx$/i, '');
  return {
    name: w8,
    clip: P({
      file: w6,
      sourceRig: w4,
      ourRig: dt(),
      boneMap: Uc,
      THREE: kD,
      name: w8,
      mode: 'locomotion',
    }).clip,
  };
}
(l.mixamo.addEventListener('change', async () => {
  let w3 = l.mixamo.files?.[0];
  if (((l.mixamo.value = ''), !!w3))
    try {
      yt('Reading ' + w3.name + '\u2026');
      let { name: w4, clip: w5 } = await Qc(w3),
        w6 = 'mixamo:' + w4,
        w7 = Hi(w5);
      if (w7.once && !Cr)
        throw new Error(
          'it is played once, and the Motion Lab works on animations that loop \u2014 a walk, a run, an idle',
        );
      (ye.set(w6, { label: w4 + ' (Mixamo)', clip: w5, ...w7 }),
        (Tn[w6] = {
          label: w4 + ' (Mixamo)',
          category: 'Yours',
          loops: !w7.once,
          rootMotion: !w7.still,
          duration: w5.duration,
        }),
        ys(),
        await Xi(w6));
    } catch (w8) {
      (console.error(w8), yt("Couldn't read " + w3.name + ': ' + w8.message, !0));
    }
}),
  l.source.addEventListener('change', async () => {
    let w3 = l.source.value;
    (ye.get(w3)?.generated && (await na(), ye.has(w3) && (l.source.value = w3)), Ln());
  }));
var Qe = null;
function hd(w3, w4) {
  let w5 = l.contacts,
    w6 = devicePixelRatio || 1,
    w7 = Math.round(w5.clientWidth * w6),
    w8 = Math.round(w5.clientHeight * w6);
  if (!w7 || !w3) return;
  (w5.width !== w7 || w5.height !== w8) && ((w5.width = w7), (w5.height = w8));
  let w9 = w5.getContext('2d');
  (w9.clearRect(0, 0, w7, w8),
    ['l', 'r'].forEach((wk, ww) => {
      let wV = w3.feet[wk].down,
        wD = wV.length,
        wm = 8 * w6 + ww * 26 * w6;
      w9.fillStyle = '#' + Sn[wk].toString(16).padStart(6, '0');
      for (let wS = 0; wS < wD; wS++)
        wV[wS] && w9.fillRect((wS / wD) * w7, wm, w7 / wD + 0.5, 14 * w6);
      w9.fillStyle = '#fff';
      for (let wE of w3.feet[wk].stances) {
        let wF = (wE.land / wD) * w7;
        (w9.beginPath(),
          w9.moveTo(wF, wm - 2 * w6),
          w9.lineTo(wF - 4 * w6, wm - 8 * w6),
          w9.lineTo(wF + 4 * w6, wm - 8 * w6),
          w9.fill(),
          (w9.font = 9 * w6 + 'px ui-monospace, Consolas, monospace'),
          w9.fillText(wE.lands, wF + 5 * w6, wm + 11 * w6));
      }
    }),
    (w9.strokeStyle = '#fff'),
    (w9.lineWidth = 1),
    w9.beginPath(),
    w9.moveTo(w4 * w7, 0),
    w9.lineTo(w4 * w7, w8),
    w9.stroke());
}
async function Ln() {
  let w3 = l.source.value;
  if (!w3) return;
  let w4 = ye.get(w3);
  (w4.generated || (ot = w3), yt('Reading ' + w4.label + '\u2026'));
  let w5 = w4.clip ?? (await oa(w3)),
    w6;
  try {
    w6 = w4.reading ?? Pr(w4, w5);
  } catch (wk) {
    (console.error(wk),
      yt("Couldn't read " + (w4.plain ? 'it' : 'the cycle') + ': ' + wk.message, !0));
    return;
  }
  (Qe && go.remove(Qe.group),
    (Qe = Yc(w5, w6)),
    df(Qe),
    (Qe.aims = sd(Qe, w4.aims)),
    Qe.setRootMotion(l.rootMotion.checked),
    go.add(Qe.group));
  let w7 = !1;
  (!w4.generated && !w4.origin && ce?.origin !== w3 && (ns(w3, w6, w5), (w7 = ef(w3))),
    md(w3, w4, w5, w6),
    es(l.view.value));
  let w8 = w6.summary;
  (Oa.setActive(ye.get(ot)?.origin ?? ot), (l.exOne.disabled = l.saveOne.disabled = !1), Ou());
  let w9 = ye.get(w4.origin ?? w3) ?? w4;
  (yt(
    '' +
      w4.label +
      (St ? ' on ' + St.name : '') +
      ': ' +
      (w6.shot
        ? 'played once \u2014 ' +
          w8.duration.toFixed(2) +
          ' s, ' +
          (w8.stride > 0.05 ? 'goes ' + w8.stride.toFixed(2) + ' m' : 'where it stands')
        : w9.plain && !w4.generated
          ? w8.duration.toFixed(2) +
            ' s, it comes round \u2014 ' +
            (w8.stride > 0.05 ? 'goes ' + w8.stride.toFixed(2) + ' m' : 'where it stands')
          : w8.speed.toFixed(2) +
            ' m/s, ' +
            Math.round((w8.steps / w8.duration) * 60) +
            ' steps a minute') +
      '.' +
      (w4.report && Xc(w4.report) ? ' Warning: ' + Kc(w4.report) + '.' : ''),
  ),
    w7 && wt());
}
var Hr = 'It stays where it stands: there is no eight to make of it.',
  Rc = null,
  Ac = null;
function md(w3, w4, w5, w6) {
  let w7 = jr(),
    w8 = !!w7?.plain,
    w9 = !!w7?.still,
    wk = document.documentElement.classList;
  if (
    (wk.toggle('plain', w8),
    wk.toggle('still', w9),
    (l.shotOpens.disabled = l.shotCloses.disabled = !w8 || w9),
    (l.poseWhen.options[0].textContent = w8 ? 'whole animation' : 'whole cycle'),
    w8 &&
      ((l.curvePlant.checked = !1),
      l.trailEdit.checked &&
        ((l.trailEdit.checked = !1), l.trailEdit.dispatchEvent(new Event('change')))),
    (l.curveOne.disabled = !co()),
    (l.curveOne.checked = !co() || ra.oneWanted()),
    Bd(),
    w4.generated)
  )
    return;
  let ww = w4.origin ?? w3;
  if (
    (Ac !== ww &&
      ((Ac = ww),
      w8 &&
        !Fe[l.curveChan.value]?.ctl &&
        (l.curveChan.value = Object.keys(Fe).find((wE) => Fe[wE].ctl) ?? l.curveChan.value),
      rn(),
      uo(),
      w8 || ((l.gaitOut.className = 'note'), (l.gaitOut.textContent = 'Nothing changed yet.')),
      jt ||
        (l.results.replaceChildren(
          Object.assign(document.createElement('p'), {
            className: 'note',
            textContent: w9 ? Hr : 'Press Generate.',
          }),
        ),
        (l.exNote.textContent = w9
          ? 'The one in the view can be exported now.'
          : 'The one in the view can be exported now; all eight, after Generate.'))),
    w9 && l.view.value !== 'single' && (l.view.value = 'single'),
    !w8 || w4.origin || Rc === w3)
  )
    return;
  Rc = w3;
  let wV = w6.summary,
    wD =
      w7.label +
      ' is not a walk or a run. What any motion can take is set on it: a pose (tick Pose over the view) and controls, on the right; the posture and the follow-through, on the left; and its curves, below \u2014 ' +
      (ce?.feet
        ? 'the hips\u2019 and the feet\u2019s, a planted foot held where it is'
        : 'a control\u2019s only: its feet are never read on the floor, so the hips\u2019 and the feet\u2019s curves have nothing to hold to') +
      '. The gait and the styles are a walk\u2019s or a run\u2019s.';
  if (((l.gaitOut.className = 'note'), w9)) {
    l.gaitOut.textContent = wD + ' ' + Hr;
    return;
  }
  let wm = w6.shot ? w6 : ma(dt(), w5);
  ((l.shotOpens.checked = wm.starts === 'still'), (l.shotCloses.checked = wm.ends === 'still'));
  let wS = [l.shotOpens.checked ? 'first' : '', l.shotCloses.checked ? 'last' : ''].filter(Boolean);
  l.gaitOut.textContent =
    wD +
    ' Its eight are made of it as it is: ' +
    wV.duration.toFixed(2) +
    ' s, it goes ' +
    wm.summary.stride.toFixed(2) +
    ' m. It opens ' +
    (wm.starts === 'still' ? 'standing' : 'moving') +
    ' and ends ' +
    (wm.ends === 'still' ? 'standing' : 'moving') +
    ': ' +
    (wS.length
      ? 'its ' +
        wS.join(' and its ') +
        ' pose ' +
        (wS.length > 1 ? 'are' : 'is') +
        ' kept as the source has ' +
        (wS.length > 1 ? 'them' : 'it') +
        ', in every direction'
      : 'neither end is held, so every direction travels from its first frame to its last') +
    '. (Advanced, under Directions, overrules it.)';
}
(l.facing.addEventListener('change', () => {
  (l.facing.blur(),
    document.documentElement.classList.toggle('travel', l.facing.value === 'travel'),
    jt &&
      nn().catch((w3) => {
        (console.error(w3), yt('Generating failed: ' + w3.message, !0));
      }));
}),
  document.documentElement.classList.toggle('travel', l.facing.value === 'travel'));
for (let e of ['shotOpens', 'shotCloses'])
  l[e].addEventListener('change', () => {
    jt &&
      nn().catch((w3) => {
        (console.error(w3), yt('Generating failed: ' + w3.message, !0));
      });
  });
for (let e of l.dirTable.querySelectorAll('tr[data-a]'))
  for (let t of e.querySelectorAll('input')) t.value = ka[e.dataset.a][t.dataset.k];
for (let e of [45, 90, 135, 180])
  ((l['polLean' + e].value = ka[e].lean), (l['polSwing' + e].value = ka[e].swing));
var Lc = (w3) => ({
    ...Object.fromEntries(
      [...l.dirTable.querySelector('tr[data-a="' + w3 + '"]').querySelectorAll('input')].map(
        (w4) => [w4.dataset.k, +w4.value],
      ),
    ),
    lean: +l['polLean' + w3].value,
    swing: +l['polSwing' + w3].value,
  }),
  gd = (w3) =>
    'Hips ' +
    w3.hips.toFixed(0) +
    '\u00B0, legs ' +
    w3.alpha.toFixed(0) +
    '\u00B0 from them, foot lanes +' +
    (w3.widen * 100).toFixed(1) +
    ' cm each, stride \u00D7' +
    +(+w3.stride).toFixed(2) +
    ' \u2014 closest ' +
    (w3.closest * 100).toFixed(1) +
    ' cm' +
    (w3.closest < w3.gap - 0.002 ? ' (under the leg gap!)' : '') +
    ', legs ' +
    (w3.stretch * 100).toFixed(1) +
    '% stretched, a planted foot drifts ' +
    no(w3.slide) +
    ' mm (the source: ' +
    (Sa == null ? '\u2026' : no(Sa) + ' mm') +
    ')' +
    (w3.locked > 0 ? ', the lock moving a foot ' + no(w3.locked) + ' mm at most' : '') +
    (w3.reached > 0.00005
      ? ', the hips ' + no(w3.reached) + " mm at most for the legs' reach"
      : '') +
    (w3.lean ? '; the chest leans ' + Cc(w3.lean.now) + ' (it was ' + Cc(w3.lean.was) + ')' : '') +
    (w3.arms
      ? w3.arms.short[0] > 0.0005
        ? '; an arm came ' +
          (w3.arms.short[0] * 100).toFixed(1) +
          ' cm too close' +
          (w3.arms.short[1] > 0.0005
            ? ', still ' + (w3.arms.short[1] * 100).toFixed(1) + ' cm'
            : ' \u2014 swung clear') +
          ', a wrist moved ' +
          (w3.arms.pushed * 100).toFixed(1) +
          ' cm at most'
        : '; the arms are clear'
      : '') +
    '.' +
    yd(w3),
  yd = (w3) => {
    if (!w3.feet) return '';
    let w4 = (w5) => (w5 * 100).toFixed(1) + ' cm';
    return (
      ' Feet ' +
      (w3.feet.gap < 0
        ? 'overlap by ' + w4(-w3.feet.gap) + ' (frame ' + w3.feet.at + ')'
        : w4(w3.feet.gap) + ' apart at the nearest') +
      '; ' +
      (w3.order.least < 0
        ? 'they cross \u2014 the left ' +
          w4(-w3.order.least) +
          ' to the right of the right (frame ' +
          w3.order.at +
          ')'
        : 'the left stays ' + w4(w3.order.least) + ' to the left of the right at least') +
      ('; knees ' +
        w4(w3.knees.gap) +
        ' apart' +
        (w3.knees.inward > 0.01
          ? ', one ' +
            w4(w3.knees.inward) +
            ' in from its leg\u2019s line (frame ' +
            w3.knees.inwardAt +
            ')'
          : ', neither in from its leg\u2019s line') +
        (w3.legs
          ? '; the legs, whole, ' +
            w4(w3.legs.gap) +
            ' apart at the nearest (frame ' +
            w3.legs.at +
            ')'
          : '') +
        '.') +
      (w3.chest || w3.hipSwing
        ? ' The chest goes ' +
          Math.round((w3.chest ?? 0) * 100) +
          '% of the way with the hips' +
          (w3.hipSwing
            ? '; the hips swing ' + w3.hipSwing.toFixed(0) + '\u00B0 either way with the cross'
            : '') +
          '.'
        : '')
    );
  },
  Xc = (w3) => w3.closest < w3.gap - 0.002 || w3.stretch > 1.002,
  Kc = (w3) =>
    [
      w3.closest < w3.gap - 0.002
        ? 'the legs come within ' + (w3.closest * 100).toFixed(1) + ' cm of each other'
        : '',
      w3.stretch > 1.002 ? 'a leg is asked to reach past its length' : '',
    ]
      .filter(Boolean)
      .join('; ');
function Ea(w3, w4, w5, w6) {
  let w7 = Object.assign(document.createElement('div'), {
    className: 'res ' + (w4 ? 'bad' : 'ok'),
    title: w6,
  });
  (w7.append(
    Object.assign(document.createElement('b'), { textContent: w3 }),
    Object.assign(document.createElement('span'), { textContent: w5 }),
  ),
    l.results.append(
      w7,
      Object.assign(document.createElement('div'), { className: 'full adv', textContent: w6 }),
    ));
}
var Cc = ([w3, w4]) =>
    Math.abs(w3).toFixed(0) +
    '\u00B0 ' +
    (w3 >= 0 ? 'forward' : 'back') +
    (Math.abs(w4) >= 0.5
      ? ', ' + Math.abs(w4).toFixed(0) + '\u00B0 ' + (w4 > 0 ? 'left' : 'right')
      : ''),
  no = (w3) => (w3 * 1000).toFixed(w3 < 0.01 ? 1 : 0),
  _r = { hips: 0, knees: 0, feet: 0, gap: 0, bulge: 0, stride: 1 },
  Sa = null,
  So = [],
  xo = new kR();
go.add(xo);
function Zc() {
  let w3 = l.polLock.checked ? { grip: +l.polGrip.value } : null,
    w4 = l.polWeapon.checked,
    w5 = l.polLean.checked
      ? {
          hips: +l.polHips.value / 100,
          chest: w4 ? 0 : +l.polChest.value / 100,
          head: w4 ? 0 : +l.polHead.value / 100,
          weight: l.polWeight.checked ? 1 : 0,
        }
      : null,
    w6 =
      l.polArms.checked && !w4
        ? { radii: Mn, gap: (+l.polGap.value || 0) / 100, scale: +l.polScale.value || 1 }
        : null,
    w7 = l.polReach.checked
      ? {
          limit: Math.min(Math.max(+l.polReachLimit.value || 99.5, 90), 100) / 100,
          down: l.polReachDown.checked,
          side: l.polReachSide.checked,
        }
      : null;
  return { lock: w3, lean: w5, reach: w7, arms: w6, weapon: w4 };
}
async function nn() {
  let w3 = ye.get(ot),
    w4 = jr();
  if (w4?.still) {
    yt(w4.label + ': ' + Hr[0].toLowerCase() + Hr.slice(1));
    return;
  }
  let w5 = w3.clip ?? (await oa(ot));
  (yt('Generating from ' + w3.label + '\u2026'),
    kd(ot, w5),
    await new Promise((wR) => setTimeout(wR, 0)));
  let w6 = !!w4?.plain,
    w7 = w6 ? { opens: l.shotOpens.checked, closes: l.shotCloses.checked } : !1,
    w8 = (wR, wQ = null) => (w6 ? ma : Po)(dt(), wR, wQ ? { contacts: wQ } : {}),
    w9 = (w3.reading && !!w3.reading.shot === w6 ? w3.reading : null) ?? w8(w5),
    { lock: wk, lean: ww, reach: wV, arms: wD } = Zc(),
    wm = w6 ? null : mc(w5),
    wS = w6 ? null : Po(dt(), wm, { contacts: ha(w9, { reverse: !0 }) }),
    wE = w6 ? 0 : $i(wS, w9);
  ((Sa = Ho({ rig: dt(), clip: w5, reading: w9, theta: 0.0001, p: _r, shot: w7 }).report.slide),
    (Qn.innerHTML = ''),
    (l.results.innerHTML = ''));
  let wF = [{ id: 'F', theta: 0, clip: w5, reading: w9 }];
  if (wk && l.polLockSource.checked) {
    let wR = Ho({
        rig: dt(),
        clip: w5,
        reading: w9,
        theta: 0,
        warp: 0,
        p: _r,
        name: w5.name,
        lock: wk,
        shot: w7,
      }),
      wQ = w8(wR.clip, wR.contacts);
    ((wF[0] = { id: 'F', theta: 0, clip: wR.clip, reading: wQ }),
      ye.set('gen:F', {
        label: 'F (feet locked)',
        clip: wR.clip,
        generated: !0,
        theta: 0,
        report: null,
        reading: wQ,
      }),
      Qn.appendChild(new Option('F (feet locked)', 'gen:F')),
      Ea(
        'F',
        !1,
        'the source, its feet locked',
        'F: the source, its feet locked \u2014 a planted foot drifts ' +
          no(wR.report.slide) +
          ' mm (it was ' +
          no(Sa) +
          ' mm), the lock moving a foot ' +
          no(wR.report.locked) +
          ' mm at most.',
      ));
  } else
    Ea(
      'F',
      !1,
      'the source, as it is',
      'F: the source itself, unchanged \u2014 a planted foot drifts ' + no(Sa) + ' mm.',
    );
  let wC = (wj, wz) => Math.round(((wj.feet[wz].stances[0]?.land ?? 0) / wj.N) * 100) + '%',
    wH = l.facing.value === 'travel';
  if (wH)
    for (let wj of Sc) {
      let wz = Cl(wF[0].clip, wj.theta, { rig: dt(), name: w3.label + ' ' + wj.id }),
        wp = w6
          ? ma(dt(), wz, { contacts: lr(wF[0].reading) })
          : Po(dt(), wz, { contacts: ha(wF[0].reading) }),
        wO = 'gen:' + wj.id,
        wf = wj.id + ' (' + (wj.theta > 0 ? '+' : '') + wj.theta + '\u00B0)';
      (ye.set(wO, {
        label: wf,
        clip: wz,
        generated: !0,
        theta: wj.theta,
        report: null,
        reading: wp,
      }),
        Qn.appendChild(new Option(wf, wO)),
        Ea(
          wj.id,
          !1,
          'made: it faces the way it goes',
          wj.id +
            ': the source turned ' +
            (Math.abs(wj.theta) === 180
              ? 'right about'
              : Math.abs(wj.theta) + '\u00B0 to its ' + (wj.theta > 0 ? 'left' : 'right')) +
            ', whole \u2014 it faces the way it goes, and nothing else of it is changed.',
        ),
        wF.push({ id: wj.id, theta: wj.theta, clip: wz, reading: wp }));
    }
  else
    for (let wJ of Sc) {
      let wZ = vd(wJ.theta),
        wU = Math.abs(wJ.theta) > 90 || !!wZ?.away,
        wK = w3.label + ' ' + wJ.id,
        wT = w6 ? null : Ji(wJ.id),
        wA,
        wn = null,
        wo,
        wX = null;
      wT
        ? ({
            clip: wA,
            contacts: wo,
            report: wX,
          } = yc({ makeRig: dt, clip: wT.clip, ref: w9, theta: wJ.theta, name: wK, lock: wk }))
        : w6
          ? ({
              clip: wA,
              report: wn,
              contacts: wo,
            } = Ho({
              rig: dt(),
              clip: w5,
              reading: w9,
              theta: wJ.theta,
              warp: wU ? Si(wJ.theta - 180) : wJ.theta,
              p: { ...Lc(Math.abs(wJ.theta)), ...Pc(wJ.theta), ...(wZ?.p ?? {}), stride: 1 },
              name: wK,
              lock: wk,
              lean: ww,
              reach: wV,
              arms: wD,
              shot: w7,
            }))
          : ({
              clip: wA,
              report: wn,
              contacts: wo,
            } = Ho({
              rig: dt(),
              clip: wU ? wm : w5,
              reading: wU ? wS : w9,
              theta: wJ.theta,
              warp: wU ? Si(wJ.theta - 180) : wJ.theta,
              p: { ...Lc(Math.abs(wJ.theta)), ...Pc(wJ.theta), ...(wZ?.p ?? {}) },
              name: wK,
              shift: wU ? wE : 0,
              lock: wk,
              lean: ww,
              reach: wV,
              arms: wD,
            }));
      let wL = w8(wA, wo),
        wb = 'gen:' + wJ.id;
      (ye.set(wb, {
        label: wJ.id + ' (' + (wJ.theta > 0 ? '+' : '') + wJ.theta + '\u00B0)',
        clip: wA,
        generated: !0,
        theta: wJ.theta,
        report: wn,
        reading: wL,
      }),
        Qn.appendChild(
          new Option(wJ.id + ' (' + (wJ.theta > 0 ? '+' : '') + wJ.theta + '\u00B0)', wb),
        ));
      let wx = !!wn && Xc(wn);
      (Ea(
        wJ.id,
        wx,
        wT ? 'by hand (' + wT.label + ')' : wx ? 'warning \u2014 ' + Kc(wn) : 'made',
        wn
          ? wJ.id +
              ': ' +
              gd(wn) +
              ' Lands L ' +
              wC(wL, 'l') +
              ', R ' +
              wC(wL, 'r') +
              ' of the cycle.'
          : wJ.id +
              ': by hand (' +
              wT.label +
              ') \u2014 ' +
              wL.speed.toFixed(2) +
              ' m/s (the source: ' +
              w9.speed.toFixed(2) +
              '), a ' +
              wA.duration.toFixed(2) +
              ' s cycle, left foot lands at ' +
              wC(wL, 'l') +
              ' of it, right at ' +
              wC(wL, 'r') +
              ' (the source: ' +
              wC(w9, 'l') +
              ', ' +
              wC(w9, 'r') +
              '); a planted foot drifts ' +
              no(wX.slide) +
              ' mm' +
              (wX.locked > 0 ? ', the lock moving a foot ' + no(wX.locked) + ' mm at most' : '') +
              '.',
      ),
        wF.push({ id: wJ.id, theta: wJ.theta, clip: wA, reading: wL }));
    }
  Ed(wF);
  {
    let wy = bd(wF);
    Ea('All', wy.bad, wy.few, wy.full);
  }
  let we = w3.origin ?? ot;
  ((jt = {
    set: wF,
    baseId: ot,
    origin: we,
    once: w6,
    travel: wH,
    ours: !w3.generated && !!ye.get(we)?.file && (w6 || wH || !Rn.size),
  }),
    (l.exGo.disabled = l.saveEight.disabled = !1),
    (l.toPlay.disabled = w6),
    (l.exNote.textContent = 'Ready: ' + wF.length + ' clips from ' + w3.label + '.'),
    es(l.view.value),
    Zi(!1),
    yt('Made the eight from ' + w3.label + '. Pick one under Show, or View: All directions.'));
}
var _i = (w3) => {
  let w4 = parseFloat(w3.value);
  return Number.isFinite(w4) ? w4 : null;
};
function Pc(w3) {
  let w4 = _i(l.stChest),
    w5 = (_i(l.stSwing) ?? 0) * (Math.abs(w3) === 90 ? 1 : 0.7);
  return {
    ...(w4 ? { chest: Math.min(Math.max(w4, 0), 1) } : {}),
    ...(w5 ? { hipSwing: w5 } : {}),
  };
}
var wd = { 90: 'L', '-90': 'R', 45: 'FL', '-45': 'FR', 135: 'BL', '-135': 'BR' },
  Ko = (w3, w4) => l.stRows.querySelector('[data-dir="' + w3 + '"] [data-k="' + w4 + '"]');
function vd(w3) {
  let w4 = wd[w3];
  if (!w4) return null;
  let w5 = (w9) => _i(Ko(w4, w9)),
    w6 = (w9, wk) => (w5(w9) != null && w5(wk) != null ? [w5(w9), w5(wk)] : null),
    w7 = w6('toeLead', 'toeTrail'),
    w8 = w6('kneeLead', 'kneeTrail');
  return {
    away: Ko(w4, 'fam')?.value === 'away',
    p: {
      ...(w5('hips') != null ? { hips: w5('hips') } : {}),
      ...(w5('stride') != null ? { stride: w5('stride') } : {}),
      ...(w7 ? { toes: w7 } : {}),
      ...(w8 ? { kneesTo: w8 } : {}),
    },
  };
}
function Fr(w3, w4 = !1) {
  let w5 = pc[w3] ?? null,
    w6 = (w8, w9) => {
      w8.value = w9 == null ? '' : Math.round(w9 * 100) / 100;
    };
  (w6(l.stChest, w5 ? w5[w5.side.r].chest : 0), w6(l.stSwing, w5 ? w5[w5.side.r].hipSwing : 0));
  let w7 = (w8, w9) => {
    (w6(Ko(w8, 'hips'), w9.hips),
      w6(Ko(w8, 'stride'), w9.stride),
      w6(Ko(w8, 'toeLead'), w9.toes?.[0]),
      w6(Ko(w8, 'toeTrail'), w9.toes?.[1]),
      w6(Ko(w8, 'kneeLead'), w9.kneesTo?.[0]),
      w6(Ko(w8, 'kneeTrail'), w9.kneesTo?.[1]));
  };
  for (let w8 of ['l', 'r']) {
    let w9 = w5 ? w5.side[w4 ? (w8 === 'l' ? 'r' : 'l') : w8] : 'toward',
      wk = w8.toUpperCase();
    ((Ko(wk, 'fam').value = w9), w7(wk, w5 ? w5[w9] : {}));
    let ww = (wV) => {
      let wD = hc(wV);
      return { hips: wD.hips, toes: wD.toes, kneesTo: wD.kneesTo };
    };
    (w7('F' + wk, w5 ? ww(w5.toward) : {}), w7('B' + wk, w5 ? ww(w5.away) : {}));
  }
}
var Fi = null;
function kd(w3, w4) {
  if (!(l.stPreset.value !== 'auto' || Fi === w3)) {
    Fi = w3;
    try {
      let w5 = wc(dt(), w4, kD),
        w6 = Math.abs(w5.hips.mean) >= 15 && Math.abs(w5.chest.mean) >= 15,
        w7 = w6 ? (w5.flight > 0.03 || w5.cadence > 140 ? 'rifleRun' : 'rifleWalk') : 'unarmed';
      (Fr(w7, w6 && w5.hips.mean > 0),
        (l.stPreset.title =
          'Auto picked ' +
          (w7 === 'unarmed'
            ? 'the unarmed walk\u2019s'
            : w7 === 'rifleRun'
              ? 'the rifle run\u2019s'
              : 'the rifle walk\u2019s') +
          ' values: the source stands ' +
          (w6
            ? 'turned ' +
              Math.abs(w5.hips.mean).toFixed(0) +
              '\u00B0 to its ' +
              (w5.hips.mean > 0 ? 'left' : 'right') +
              ' at the hips'
            : 'square (hips ' + Math.abs(w5.hips.mean).toFixed(0) + '\u00B0 off straight ahead)') +
          '.'));
    } catch (w8) {
      (console.error(w8), Fr('unarmed'));
    }
  }
}
l.stPreset.addEventListener('change', () => {
  ((Fi = null),
    l.stPreset.value !== 'auto' && Fr(l.stPreset.value),
    jt &&
      nn().catch((w3) => {
        (console.error(w3), yt('Generating failed: ' + w3.message, !0));
      }));
});
for (let e of [l.stChest, l.stSwing, ...l.stRows.querySelectorAll('[data-k]')])
  e.addEventListener('change', () => {
    jt &&
      nn().catch((w3) => {
        (console.error(w3), yt('Generating failed: ' + w3.message, !0));
      });
  });
Fr(l.stPreset.value === 'auto' ? 'unarmed' : l.stPreset.value);
function bd(w3) {
  let w4 = (wk, ww) => (wk.feet[ww].stances[0]?.land ?? 0) / wk.N,
    w5 = w3[0].reading,
    w6 = 0,
    w7 = '';
  for (let wk of w3.slice(1))
    for (let ww of 'lr') {
      let wV = Math.abs(w4(wk.reading, ww) - w4(w5, ww)),
        wD = Math.min(wV, 1 - wV);
      wD > w6 && ((w6 = wD), (w7 = wk.id + ', ' + (ww === 'l' ? 'left' : 'right') + ' foot'));
    }
  let w8 = 1 / Math.min(...w3.map((wm) => wm.reading.N)),
    w9 = w6 > 1.5 * w8;
  return {
    bad: w9,
    few: w9 ? 'warning \u2014 out of step: ' + w7 : 'land in step',
    full:
      'In step: the source lands L ' +
      Math.round(w4(w5, 'l') * 100) +
      '%, R ' +
      Math.round(w4(w5, 'r') * 100) +
      '% of the cycle; ' +
      (w9
        ? 'the furthest from it is ' + w7 + ', ' + (w6 * 100).toFixed(1) + '% of the cycle out.'
        : 'every clip lands with it, to the frame (' + (w6 * 100).toFixed(1) + '% at most).'),
  };
}
for (let e of [
  'polLock',
  'polGrip',
  'polLockSource',
  'polLean',
  'polHips',
  'polChest',
  'polHead',
  'polWeapon',
  'polWeight',
  'polLean45',
  'polLean90',
  'polLean135',
  'polLean180',
  'polReach',
  'polReachLimit',
  'polReachDown',
  'polReachSide',
  'polArms',
  'polGap',
  'polScale',
  'polSwing45',
  'polSwing90',
  'polSwing135',
  'polSwing180',
])
  l[e].addEventListener('change', () => {
    jt &&
      nn().catch((w3) => {
        (console.error(w3), yt('Generating failed: ' + w3.message, !0));
      });
  });
l.polGrip.addEventListener('input', () => {
  l.polGripOut.textContent = (+l.polGrip.value).toFixed(2);
});
var jt = null,
  Ki = !1,
  Zi = (w3) => {
    ((Ki = w3), (l.resultsStale.hidden = !w3));
  },
  na = async () => {
    Ki &&
      jt &&
      (await nn().catch((w3) => {
        (console.error(w3), yt('Generating failed: ' + w3.message, !0));
      }));
  },
  Rn = new Map();
function Ji(w3) {
  if (w3 !== 'L' && w3 !== 'R') return null;
  let w4 = Rn.get(w3),
    w5 = Rn.get(w3 === 'L' ? 'R' : 'L');
  return w4 ?? (w5 ? { clip: h(w5.clip), label: w5.label + ', mirrored' } : null);
}
function Jc() {
  ((l.strafeClear.disabled = !Rn.size),
    (l.strafeNote.textContent = Rn.size
      ? ['L', 'R'].map((w3) => w3 + ': ' + Ji(w3).label).join(' \u00B7 ')
      : 'None: both strafes are generated.'));
}
(l.strafe.addEventListener('change', async () => {
  let w3 = l.strafe.files?.[0];
  if (((l.strafe.value = ''), !!w3))
    try {
      yt('Reading ' + w3.name + '\u2026');
      let { name: w4, clip: w5 } = await Qc(w3),
        w6 = Po(dt(), w5),
        w7 = (Math.atan2(w6.dir.x, w6.dir.z) * 180) / Math.PI;
      if (Math.abs(Math.abs(w7) - 90) > 30)
        throw new Error(
          'it travels at ' +
            w7.toFixed(0) +
            '\u00B0 \u2014 a strafe goes sideways, near \u00B190\u00B0',
        );
      (Rn.set(w7 > 0 ? 'L' : 'R', { clip: w5, label: w4 }), Jc(), await nn());
    } catch (w8) {
      (console.error(w8), yt("Couldn't use " + w3.name + ': ' + w8.message, !0));
    }
}),
  l.strafeClear.addEventListener('click', () => {
    (Rn.clear(),
      Jc(),
      So.length &&
        nn().catch((w3) => {
          (console.error(w3), yt('Generating failed: ' + w3.message, !0));
        }));
  }),
  l.generate.addEventListener('click', () =>
    nn().catch((w3) => {
      (console.error(w3), yt('Generating failed: ' + w3.message, !0));
    }),
  ));
var xd = (() => {
  let w3 = new kt();
  return (
    w3.moveTo(-0.07, 0),
    w3.lineTo(0.07, 0),
    w3.lineTo(0.07, 0.42),
    w3.lineTo(0.2, 0.42),
    w3.lineTo(0, 0.78),
    w3.lineTo(-0.2, 0.42),
    w3.lineTo(-0.07, 0.42),
    w3.closePath(),
    new kj(w3).rotateX(Math.PI / 2)
  );
})();
function Ed(w3) {
  for (let w5 of So) xo.remove(w5.group);
  So = [];
  let w4 = 2.4;
  for (let w6 of w3) {
    let w7 = (w6.theta * Math.PI) / 180,
      w8 = Yc(w6.clip, w6.reading, {
        cycles: [-1, 0, 1],
        at: new kf(Math.sin(w7) * w4, 0, Math.cos(w7) * w4),
      });
    if (w6.theta === 0) {
      let w9 = new w1(xd, new kW({ color: 3112447, side: kP }));
      (w9.position.set(Math.sin(w7) * w4, 0.006, Math.cos(w7) * w4 + 0.55), w8.group.add(w9));
    }
    (xo.add(w8.group), So.push(w8), Lu(w8));
  }
}
var Md = () => (xo.visible ? 'grid' : 'single');
function es(w3) {
  let w4 = So.length > 0,
    w5 = w3 === 'grid' && w4;
  ((xo.visible = w5),
    Qe && (Qe.group.visible = !w5),
    (l.rootMotion.disabled = w5),
    w3 !== 'single' &&
      !w4 &&
      yt('Generate first: All directions shows the eight made from the source.'));
}
l.view.addEventListener('change', async () => {
  (l.view.value === 'grid' && (await na()), es(l.view.value), qi(Md()));
});
var Ai = !1;
l.trailEdit.addEventListener('change', () => {
  l.trailEdit.checked
    ? !l.trails.checked &&
      !l.hipTrail.checked &&
      ((l.trails.checked = l.hipTrail.checked = !0), (Ai = !0))
    : Ai && ((l.trails.checked = l.hipTrail.checked = !1), (Ai = !1));
});
for (let e of ['prints', 'lanes', 'trails', 'hipTrail', 'trailEdit'])
  l[e].addEventListener('change', () => {
    Qe && (Lr(Qe), wu(Qe.aims));
    for (let w3 of So) Lr(w3);
  });
(l.rootMotion.addEventListener('change', () => {
  (Qe && Qe.setRootMotion(l.rootMotion.checked), qi('single'));
}),
  l.bones.addEventListener('change', () => {
    Qe && (Qe.skel.visible = l.bones.checked);
    for (let w3 of So) w3.skel.visible = l.bones.checked;
  }));
var Ca = [
    'Stride',
    'Cadence',
    'Width',
    'Lift',
    'Drop',
    'Bounce',
    'Sway',
    'Swing',
    'Lean',
    'PostF',
    'PostS',
    'PostT',
  ],
  Sd = {
    Stride: 1,
    Cadence: 1,
    Width: 0,
    Lift: 1,
    Drop: 0,
    Bounce: 1,
    Sway: 1,
    Swing: 1,
    Lean: 1,
    PostF: 0,
    PostS: 0,
    PostT: 0,
  },
  $r = {
    Stroll: { Stride: 0.88, Cadence: 0.8, Bounce: 0.9, Sway: 1.15, Swing: 0.8, Lift: 0.9 },
    Brisk: { Stride: 1.12, Cadence: 1.15, Bounce: 1.1, Swing: 1.2, Lift: 1.05 },
    Heavy: {
      Stride: 0.92,
      Cadence: 0.85,
      Width: 3,
      Bounce: 1.35,
      Sway: 1.1,
      Swing: 0.9,
      Lift: 0.9,
      Drop: 2,
      Ground: 3,
    },
    Sneak: {
      Stride: 0.75,
      Cadence: 0.7,
      Width: -1,
      Bounce: 0.6,
      Sway: 0.7,
      Swing: 0.4,
      Lift: 1.3,
      Drop: 7,
      PostF: 22,
    },
  },
  ts = (w3) => {
    ce && ((l.gaitGround.value = Math.round(ce.duty * 100) + (w3.Ground ?? 0)), ou());
    for (let w4 of Ca) ((l['gait' + w4].value = w3[w4] ?? Sd[w4]), l['gait' + w4]._sync?.());
    l.gaitSpeed.value = +(+l.gaitStride.value * +l.gaitCadence.value).toFixed(3);
  },
  Hc = (w3) =>
    w3.speed.toFixed(2) +
    ' m/s \u00B7 stride ' +
    w3.summary.stride.toFixed(2) +
    ' m \u00B7 ' +
    Math.round((w3.summary.steps / w3.summary.duration) * 60) +
    ' steps a minute';
async function $d() {
  let w3 = ye.get(ot).origin ?? ot,
    w4 = ye.get(w3),
    w5 = xo.visible ? 'grid' : ye.get(l.source.value)?.generated ? l.source.value : null,
    w6 = w4.clip ?? (await oa(w3));
  (await (w4.plain ? Td : Od)(w3, w4, w6),
    (an = ru()),
    Jd(w3),
    jt &&
      (w5
        ? ((Ki = !0),
          await na(),
          w5 !== 'grid' && ye.has(w5) && ((l.source.value = w5), await Ln()))
        : Zi(!0)));
}
async function Td(w3, w4, w5) {
  let w6 = !!w4.once,
    w7 = Pr(w4, w5);
  (ce?.origin !== w3 && ns(w3, w7, w5),
    (l.gaitOut.className = 'note'),
    (l.gaitOut.textContent = 'Making\u2026'),
    await new Promise((wR) => setTimeout(wR, 0)));
  let w8 = l.polWeapon.checked,
    w9 = ba(w5),
    wk = {
      forward: +l.gaitPostF.value,
      side: +l.gaitPostS.value,
      twist: +l.gaitPostT.value,
      head: l.gaitHeadAhead.checked,
    },
    ww = l.ftOn.checked
      ? {
          chest: w8 ? 0 : +l.ftChest.value,
          head: +l.ftHead.value,
          arms: w8 ? 0 : +l.ftArms.value,
          lag: +l.ftLag.value,
          bounce: +l.ftBounce.value,
          loosen: +l.ftLoosen.value,
        }
      : null,
    wV = Ho({
      rig: dt(),
      clip: w5,
      reading: w7,
      theta: 0,
      warp: 0,
      name: w5.name,
      walk: !1,
      controls: Mu(),
      posture: wk,
      follow: ww,
      curves: ce.feet ? tu() : null,
      p: { ..._r, time: 1 },
      fps: w9 < 12 ? 30 : w9,
      ...(w6 ? { shot: {} } : {}),
    }),
    wD = Pr(w4, wV.clip, wV.contacts),
    wm = 'gait:' + w3,
    wS = w4.label + ' (adjusted)';
  (ye.has(wm) || Ir.appendChild(new Option(wS, wm)),
    ye.set(wm, { label: wS, clip: wV.clip, reading: wD, origin: w3, report: null, aims: wV.aims }),
    (l.source.value = wm),
    await Ln());
  let wE = wV.report,
    wF = wE.controls,
    wC = [
      [wk.forward, 'forward', 'back'],
      [wk.side, 'to its left', 'to its right'],
      [wk.twist, 'twisted left', 'twisted right'],
    ]
      .filter(([wR]) => wR)
      .map(([wR, wQ, wj]) => Math.abs(wR) + '\u00B0 ' + (wR > 0 ? wQ : wj)),
    wH = [
      wF && (wF.far >= 0.05 || wF.shift >= 0.0005)
        ? 'Controls: ' +
          [
            wF.far >= 0.05
              ? wF.bone + ' turned up to ' + wF.far.toFixed(1) + "\u00B0 from the source's"
              : '',
            wF.shift >= 0.0005
              ? wF.shiftBone + ' up to ' + (wF.shift * 100).toFixed(1) + ' cm off its joint'
              : '',
          ]
            .filter(Boolean)
            .join('; ') +
          '.' +
          (wF.wide > 100
            ? ' A part tips more than 100\u00B0 from its own middle: its curves may not hold there.'
            : '')
        : '',
      wE.aims?.some((wR) => wR.far >= 0.05)
        ? 'Aim: ' +
          wE.aims
            .filter((wR) => wR.far >= 0.05)
            .map((wR) => wR.bone + ' turned up to ' + wR.far.toFixed(1) + '\u00B0 onto its target')
            .join('; ') +
          '.'
        : '',
      wE.pins?.length
        ? 'Pin: ' +
          wE.pins
            .map(
              (wR) =>
                wR.hand +
                ' held to ' +
                (wR.to ?? 'the world') +
                (wR.far >= 0.001
                  ? ', moved up to ' + (wR.far * 100).toFixed(1) + ' cm to stay'
                  : '') +
                (wR.short >= 0.002
                  ? ' \u2014 the arm falls ' + (wR.short * 100).toFixed(1) + ' cm short at most'
                  : ''),
            )
            .join('; ') +
          '.'
        : '',
      wC.length ? 'Posture: the spine ' + wC.join(', ') + '.' : '',
      wE.follow && Math.max(wE.follow.chest, wE.follow.arms) >= 0.05
        ? 'The chest follows the hips up to ' +
          wE.follow.chest.toFixed(1) +
          '\u00B0 behind' +
          (wE.follow.arms >= 0.05 ? ', the arms ' + wE.follow.arms.toFixed(1) + '\u00B0' : '') +
          '.'
        : '',
    ].filter(Boolean),
    we = ce.feet
      ? Object.keys(Fe)
          .filter((wR) => !Fe[wR].ctl && jd(wR))
          .map((wR) => Fe[wR].group.toLowerCase() + ' ' + Fe[wR].plain)
      : [];
  ((l.gaitOut.className = wE.stretch > 1.002 ? 'note bad' : 'note'),
    (l.gaitOut.textContent =
      w4.label +
      ', as set: ' +
      wV.clip.duration.toFixed(2) +
      ' s (' +
      wE.frames +
      ' frames), ' +
      (w6 ? 'played once' : 'and it still comes round') +
      '. ' +
      (we.length ? 'Curves: ' + we.join(', ') + '. ' : '') +
      (wH.length
        ? wH.join(' ')
        : we.length
          ? ''
          : 'Nothing is set on it yet: it is its source, frame for frame. ' +
            (ce.feet ? 'Move a key in the graph, pose' : 'Pose') +
            ' a bone (tick Pose over the view), add a control, or bend the spine under Posture.') +
      (wE.stretch > 1.002
        ? ' A leg is asked to reach past its length: the hips were turned or moved further than its feet, which stay where they stood, allow.'
        : '')));
}
async function Od(w3, w4, w5) {
  let w6 = Po(dt(), w5),
    w7 = Object.fromEntries(Ca.map((wR) => [wR, +l['gait' + wR].value])),
    { lock: w8, reach: w9, arms: wk, weapon: ww } = Zc(),
    wV = w7.Stride * w7.Cadence;
  (ce?.origin !== w3 && ns(w3, w6, w5),
    (l.gaitOut.className = 'note'),
    (l.gaitOut.textContent = 'Making\u2026'),
    await new Promise((wR) => setTimeout(wR, 0)));
  let wD = Ho({
      rig: dt(),
      clip: w5,
      reading: w6,
      theta: 0,
      warp: 0,
      name: w5.name,
      lock: w8,
      reach: w9,
      arms: wk ?? { radii: Mn, amount: 0 },
      curves: tu(),
      controls: Mu(),
      posture: {
        forward: w7.PostF,
        side: w7.PostS,
        twist: w7.PostT,
        head: l.gaitHeadAhead.checked,
      },
      follow: l.ftOn.checked
        ? {
            chest: ww ? 0 : +l.ftChest.value,
            head: +l.ftHead.value,
            arms: ww ? 0 : +l.ftArms.value,
            lag: +l.ftLag.value,
            bounce: +l.ftBounce.value,
            loosen: +l.ftLoosen.value,
          }
        : null,
      lean: { hips: 1, chest: 1, head: 0, weight: 1 },
      p: {
        ..._r,
        gap: 8,
        stride: w7.Stride,
        time: 1 / w7.Cadence,
        width: w7.Width,
        lift: w7.Lift,
        drop: w7.Drop,
        bounce: w7.Bounce,
        sway: w7.Sway,
        swing: w7.Swing,
        lean: Math.max(0, 1 + w7.Lean * (wV - 1)),
      },
    }),
    wm = Po(dt(), wD.clip, { contacts: wD.contacts }),
    wS = 'gait:' + w3,
    wE = w4.label + ' (adjusted)';
  (ye.has(wS) || Ir.appendChild(new Option(wE, wS)),
    ye.set(wS, { label: wE, clip: wD.clip, reading: wm, origin: w3, report: null, aims: wD.aims }),
    (l.source.value = wS),
    await Ln());
  let wF = wD.report,
    wC = wF.slide > 0.005,
    wH = wF.stretch > 1.002,
    we = wF.controls;
  ((l.gaitOut.className = wC || wH ? 'note bad' : 'note'),
    (l.gaitOut.textContent =
      'Source: ' +
      Hc(w6) +
      '. Adjusted: ' +
      Hc(wm) +
      ', a ' +
      wD.clip.duration.toFixed(2) +
      ' s cycle (' +
      wF.frames +
      ' frames).' +
      (wC
        ? " The legs can't span it: a planted foot slips " +
          no(wF.slide) +
          ' mm' +
          (wF.reached > 0.0005 ? ', the hips dropped ' + no(wF.reached) + ' mm' : '') +
          ' \u2014 shorten the stride or lower the hips.'
        : ' Planted feet hold (' +
          no(wF.slide) +
          ' mm)' +
          (wF.reached > 0.0005
            ? ', the hips moving ' + no(wF.reached) + " mm for the legs' reach"
            : '') +
          '.') +
      (wF.follow && Math.max(wF.follow.chest, wF.follow.arms) >= 0.05
        ? ' The chest follows the hips up to ' +
          wF.follow.chest.toFixed(1) +
          '\u00B0 behind' +
          (wF.follow.arms >= 0.05 ? ', the arms ' + wF.follow.arms.toFixed(1) + '\u00B0' : '') +
          '.'
        : '') +
      (we && (we.far >= 0.05 || we.shift >= 0.0005)
        ? ' Controls: ' +
          [
            we.far >= 0.05
              ? we.bone + ' turned up to ' + we.far.toFixed(1) + "\u00B0 from the source's"
              : '',
            we.shift >= 0.0005
              ? we.shiftBone + ' up to ' + (we.shift * 100).toFixed(1) + ' cm off its joint'
              : '',
          ]
            .filter(Boolean)
            .join('; ') +
          '.' +
          (we.wide > 100
            ? ' A part tips more than 100\u00B0 from its own middle: its curves may not hold there.'
            : '')
        : '') +
      (wF.aims?.some((wR) => wR.far >= 0.05)
        ? ' Aim: ' +
          wF.aims
            .filter((wR) => wR.far >= 0.05)
            .map((wR) => wR.bone + ' turned up to ' + wR.far.toFixed(1) + '\u00B0 onto its target')
            .join('; ') +
          '.'
        : '') +
      (wF.pins?.length
        ? ' Pin: ' +
          wF.pins
            .map(
              (wR) =>
                wR.hand +
                ' held to ' +
                (wR.to ?? 'the world') +
                (wR.far >= 0.001
                  ? ', moved up to ' + (wR.far * 100).toFixed(1) + ' cm to stay'
                  : '') +
                (wR.short >= 0.002
                  ? ' \u2014 the arm falls ' + (wR.short * 100).toFixed(1) + ' cm short at most'
                  : ''),
            )
            .join('; ') +
          '.'
        : '') +
      (wF.arms?.short[1] > 0.005
        ? ' An arm comes ' +
          (wF.arms.short[1] * 100).toFixed(1) +
          " cm closer to the body than the source's ever do" +
          (wF.arms.held ? ' (posed or pinned: left as set)' : '') +
          '.'
        : wF.arms?.pushed > 0.005
          ? ' The arms were swung ' + (wF.arms.pushed * 100).toFixed(1) + ' cm clear of the body.'
          : '')));
}
var wt = () =>
    $d().catch((w3) => {
      (console.error(w3),
        (l.gaitOut.className = 'note bad'),
        (l.gaitOut.textContent = "It couldn't be made: " + w3.message));
    }),
  Rd = () => {
    let w3 = Math.max(+l.gaitSpeed.value || 1, 0.1),
      w4 = +l.gaitShare.value;
    ((l.gaitStride.value = +Math.pow(w3, 1 - w4).toFixed(3)),
      (l.gaitCadence.value = +Math.pow(w3, w4).toFixed(3)));
  };
for (let e of ['gaitSpeed', 'gaitShare'])
  l[e].addEventListener('change', () => {
    ($t(an ?? void 0), Rd(), (l.gaitPreset.value = ''), wt());
  });
l.gaitGround.addEventListener('change', () => {
  ((l.gaitPreset.value = ''), $t(an ?? void 0), ou(), wt());
});
for (let e of Ca)
  l['gait' + e].addEventListener('change', () => {
    ($t(an ?? void 0),
      (l.gaitSpeed.value = +(+l.gaitStride.value * +l.gaitCadence.value).toFixed(3)),
      (l.gaitPreset.value = ''),
      wt());
  });
(l.gaitPreset.addEventListener('change', () => {
  let w3 = l.gaitPreset.value;
  w3 && (Xr(Kd[w3], !0), (l.gaitPreset.value = w3));
}),
  l.gaitReset.addEventListener('click', () => {
    ((l.gaitPreset.value = ''), (l.ftPreset.value = ''));
    for (let w3 of ft) w3.pose && (w3.pose = Ur());
    for (let w4 of yn) ((l['ft' + w4].value = Dr[w4]), l['ft' + w4]._sync?.());
    $t();
    for (let w5 of Object.keys(Fe)) Cn(w5, !0);
    (ea(), Pn(), ts({}), wt());
  }));
for (let e of document.querySelectorAll('input[data-soft]')) Mc(e);
var yn = ['Chest', 'Head', 'Arms', 'Lag', 'Bounce', 'Loosen'],
  Dr = { Chest: 1, Head: 0.5, Arms: 1, Lag: 0.5, Bounce: 0.4, Loosen: 0 },
  Ni = {
    Stiff: { Chest: 0.6, Head: 0.3, Arms: 0.5, Lag: 0.2, Bounce: 0.1, Loosen: 0 },
    Loose: { Chest: 1.2, Head: 0.8, Arms: 1.3, Lag: 0.6, Bounce: 0.6, Loosen: 0.5 },
    Heavy: { Chest: 1.2, Head: 0.6, Arms: 1, Lag: 0.8, Bounce: 0.25, Loosen: 0.3 },
  };
l.ftOn.addEventListener('change', () => {
  ($t(an ?? void 0), wt());
});
for (let e of yn)
  l['ft' + e].addEventListener('change', () => {
    ($t(an ?? void 0), (l.ftPreset.value = ''), wt());
  });
(l.ftReset.addEventListener('click', () => {
  ($t(an ?? void 0), (l.ftPreset.value = ''), (l.ftOn.checked = !0));
  for (let w3 of yn) ((l['ft' + w3].value = Dr[w3]), l['ft' + w3]._sync?.());
  wt();
}),
  l.ftPreset.addEventListener('change', () => {
    let w3 = Ni[l.ftPreset.value];
    if (w3) {
      $t(an ?? void 0);
      for (let w4 of yn) ((l['ft' + w4].value = w3[w4]), l['ft' + w4]._sync?.());
      wt();
    }
  }),
  l.gaitHeadAhead.addEventListener('change', () => {
    ($t(an ?? void 0), wt());
  }));
var Fe = {
    hipY: {
      group: 'Hips',
      short: 'Loc Z (height)',
      plain: 'height',
      colour: '#5aa0ff',
      up: 'higher',
      down: 'lower',
    },
    hipX: {
      group: 'Hips',
      short: 'Loc X (side)',
      plain: 'side to side',
      colour: '#ff5a6a',
      flip: !0,
      up: 'left',
      down: 'right',
    },
    hipZ: {
      group: 'Hips',
      short: 'Loc Y (forward)',
      plain: 'forward',
      colour: '#7bd66b',
      up: 'ahead',
      down: 'behind',
    },
    footY: {
      group: 'Feet',
      short: 'Loc Z (lift)',
      plain: 'lift',
      colour: '#5aa0ff',
      foot: !0,
      up: 'higher',
      down: 'lower',
    },
    footX: {
      group: 'Feet',
      short: 'Loc X (side)',
      plain: 'side to side',
      colour: '#ff5a6a',
      foot: !0,
      flip: !0,
      up: 'left',
      down: 'right',
    },
    footZ: {
      group: 'Feet',
      short: 'Loc Y (forward)',
      plain: 'forward',
      colour: '#7bd66b',
      foot: !0,
      up: 'ahead of the hips',
      down: 'behind',
    },
  },
  _o = ['footY', 'footX', 'footZ'],
  Ce = Object.fromEntries(
    Object.entries(Fe).map(([w3, w4]) => [
      w3,
      w4.foot
        ? { mirror: !0, l: { keys: [] }, r: { keys: [] } }
        : { keys: [], mirror: !0, flip: !!w4.flip },
    ]),
  ),
  ft = [],
  ce = null,
  nt = (w3) => w3 - Math.floor(w3),
  co = () => !jr()?.once,
  eu = (w3) => Math.min(Math.max(w3, 0), 1),
  Ad = (w3) => (co() ? nt(w3) : eu(w3)),
  Ld = (w3) => (co() ? Nt(w3) : dn(w3)),
  Cd = (w3, w4) => (co() ? Ul(w3, w4) : hi(w3, w4)),
  os = () => ta() && !!ce && !ce.feet,
  _c = !1;
function ns(w3, w4, w5) {
  let w6 = ta(),
    w7 = w6 ? new kf(1, 0, 0) : w4.left,
    w8 = w6 ? new kf(0, 0, 1) : w4.dir,
    w9 = (wV, wD, wm) => {
      let wS = w4.P[wV],
        wE = new kf(
          wS[wD * 3] - w4.P.root[wD * 3],
          wS[wD * 3 + 1] - w4.P.root[wD * 3 + 1],
          wS[wD * 3 + 2] - w4.P.root[wD * 3 + 2],
        );
      return wm ? wE.dot(wm) : wE.y;
    },
    wk = (wV, wD) => Array.from({ length: w4.N }, (wm, wS) => w9(wV, wS, wD)),
    ww = (wV) => ({ l: wk('ankle_l', wV), r: wk('ankle_r', wV) });
  if (
    ((ce = {
      origin: w3,
      reading: w4,
      clip: w5,
      duty: (w4.summary.dutyL + w4.summary.dutyR) / 2,
      feet: ['l', 'r'].some((wV) => w4.feet[wV].down.some(Boolean)),
      samples: {
        hipY: wk('pelvis', null),
        hipX: wk('pelvis', w7),
        hipZ: wk('pelvis', w8),
        footY: ww(null),
        footX: ww(w7),
        footZ: ww(w8),
      },
    }),
    w6 || _c)
  ) {
    for (let [wV, wD] of Object.entries(Fe)) wD.ctl || (Ce[wV].mirror = !w6);
    _c = w6;
  }
  for (let wm of ft) fu(wm);
  for (let wS of Object.keys(Fe)) Cn(wS, !0);
  ((l.gaitGround.value = Math.round(ce.duty * 100)), ra.dropPicks(), aa.clear(), uo());
}
var $a = (w3) => {
  let w4 = ce.reading;
  return w4.feet[w3].stances.map((w5, w6, w7) => {
    let w8 = nt((w5.land + w5.frames) / w4.N),
      w9 = nt(w7[(w6 + 1) % w7.length].land / w4.N);
    return { lift: w8, land: w9, len: nt(w9 - w8) || 1 };
  });
};
function Pd(w3, w4) {
  let w5 = ce.reading,
    w6 = ce.samples[w3][w4],
    w7 = w5.N - 1,
    w8 = w5.feet[w4].stances,
    w9 = [],
    wk = [],
    ww = 0;
  for (let wV of w8) (wV.land > ww && wk.push([ww, wV.land]), (ww = wV.lift));
  ww < w7 && wk.push([ww, w7]);
  for (let wD of w8)
    (wD.land > 0 && w9.push({ u: wD.land / w7, du: 0, dv: 0, lock: !0, kind: 'land' }),
      wD.lift < w7 && w9.push({ u: wD.lift / w7, du: 0, dv: 0, lock: !0, kind: 'lift' }));
  (wk[0]?.[0] === 0 && w9.push({ u: 0, du: 0, dv: 0 }),
    wk.length && wk[wk.length - 1][1] === w7 && w9.push({ u: 1, du: 0, dv: 0 }));
  for (let [wm, wS] of wk) {
    if (wS - wm < 3) continue;
    let wE = Math.round((wm + wS) / 2);
    if (w3 === 'footY') {
      let wF = -1 / 0;
      for (let wC = wm + 1; wC < wS; wC++) w6[wC] > wF && ((wF = w6[wC]), (wE = wC));
    }
    w9.push({ u: Math.min(Math.max(wE / w7, 0.002), 0.998), du: 0, dv: 0 });
  }
  return w9.sort((wH, we) => wH.u - we.u);
}
function Fc(w3, w4, w5 = null) {
  if (!co()) return Pd(w3, w4);
  let w6 = ce.samples[w3][w4],
    w7 = [];
  return (
    $a(w4).forEach((w8, w9) => {
      let wk = (wV) => w5?.filter((wD) => wD.lock && wD.kind === wV)[w9]?.du ?? 0;
      w7.push(
        { u: w8.lift, du: wk('lift'), dv: 0, lock: !0, kind: 'lift' },
        { u: w8.land, du: wk('land'), dv: 0, lock: !0, kind: 'land' },
      );
      let ww = 0.5;
      if (w3 === 'footY') {
        let wV = -1 / 0;
        for (let wD = 1; wD < 20; wD++) {
          let wm = bn(w6, w8.lift + (w8.len * wD) / 20);
          wm > wV && ((wV = wm), (ww = wD / 20));
        }
      }
      w7.push({ u: nt(w8.lift + w8.len * ww), du: 0, dv: 0 });
    }),
    w7
  );
}
function Cn(w3 = l.curveChan.value, w4 = !1) {
  if (!ce) return;
  let w5 = Ce[w3] ?? {},
    w6 = w5.mirror ?? Fe[w3].mirror ?? !0;
  ((Ce[w3] = Fe[w3].foot
    ? {
        mirror: w6,
        l: { keys: Fc(w3, 'l', w4 ? null : w5.l.keys) },
        r: { keys: Fc(w3, 'r', w4 ? null : w5.r.keys) },
      }
    : {
        mirror: w6,
        flip: !!Fe[w3].flip,
        keys: co() ? mi(ce.samples[w3], w6) : ql(ce.samples[w3]),
      }),
    ra.dropPicks());
}
function as(w3) {
  let w4 = $a('l'),
    w5 = $a('r'),
    w6 = Ce[w3].l.keys,
    w7 = [],
    w8 = Fe[w3].flip ? -1 : 1,
    w9 = (wk) => ({
      ...(wk?.tin != null ? { tin: w8 * wk.tin } : {}),
      ...(wk?.tout != null ? { tout: w8 * wk.tout } : {}),
      ...(wk?.type ? { type: wk.type } : {}),
      ...(wk?.i ? { i: wk.i } : {}),
    });
  w5.forEach((wk, ww) => {
    for (let wV of ['lift', 'land']) {
      let wD = w6.filter((wm) => wm.lock && wm.kind === wV)[Math.min(ww, w4.length - 1)];
      w7.push({ u: wk[wV], du: wD?.du ?? 0, dv: 0, lock: !0, kind: wV, ...w9(wD) });
    }
  });
  for (let wk of w6) {
    if (wk.lock) continue;
    let ww = Math.max(
        0,
        w4.findIndex((wm) => nt(wk.u - wm.lift) <= wm.len),
      ),
      wV = w4[ww],
      wD = w5[Math.min(ww, w5.length - 1)];
    w7.push({
      u: nt(wD.lift + (nt(wk.u - wV.lift) / wV.len) * wD.len),
      du: (wk.du * wD.len) / wV.len,
      dv: w8 * wk.dv,
      ...w9(wk),
    });
  }
  return w7;
}
var Vi = (w3, w4) => (w4 === 'r' && Ce[w3].mirror ? { keys: as(w3) } : Ce[w3][w4]),
  tu = () =>
    Object.fromEntries(
      Object.entries(Fe)
        .filter(([, w3]) => !w3.ctl)
        .map(([w3, w4]) => {
          let w5 = Ce[w3],
            w6 = (w7) => w7.map((w8) => ({ ...w8 }));
          return [
            w3,
            w4.foot
              ? { l: { keys: w6(Vi(w3, 'l').keys) }, r: { keys: w6(Vi(w3, 'r').keys) } }
              : { ...w5, keys: w6(w5.keys) },
          ];
        }),
    );
function Hd(w3) {
  for (let w4 of _o)
    if (w4 !== w3) {
      for (let w5 of ['l', 'r'])
        for (let w6 of ['lift', 'land']) {
          let w7 = Ce[w3][w5].keys.filter((w8) => w8.lock && w8.kind === w6);
          Ce[w4][w5].keys
            .filter((w8) => w8.lock && w8.kind === w6)
            .forEach((w8, w9) => {
              w7[w9] && (w8.du = w7[w9].du);
            });
        }
    }
}
function ou() {
  if (!ce) return;
  let w3 = ((+l.gaitGround.value || 0) - Math.round(ce.duty * 100)) / 100;
  for (let w4 of _o)
    for (let w5 of ['l', 'r']) {
      let w6 = Ce[w4][w5].keys.filter((w8) => w8.lock),
        w7 = w6.filter((w8) => w8.kind === 'land');
      w6.filter((w8) => w8.kind === 'lift').forEach((w8, w9) => {
        w8.du = (w7[w9]?.du ?? 0) + w3;
      });
    }
}
function Nr() {
  let w3 = Ce.footY.l.keys.filter((w6) => w6.lock),
    w4 = w3.find((w6) => w6.kind === 'lift'),
    w5 = w3.find((w6) => w6.kind === 'land');
  w4 && w5 && (l.gaitGround.value = Math.round(ce.duty * 100 + (w4.du - w5.du) * 100));
}
var Nc = new WeakMap();
function Vc(w3) {
  if (!w3 || !ce) return w3;
  let w4 = ce.clip,
    w5 = ba(w4),
    w6 = Math.round(w4.duration * (w5 < 12 ? 30 : w5)),
    w7 = co(),
    w8 = Nc.get(w3);
  return (
    (!w8 || w8.F !== w6 || w8.round !== w7) &&
      ((w8 = { F: w6, round: w7, out: Dl(w3, w6, w7) }), Nc.set(w3, w8)),
    w8.out
  );
}
function nu(w3) {
  let w4 = Fe[w3];
  if (!w4.foot) {
    let w8 = Ce[w3],
      w9 = tn(w3),
      wk = (w8.late ?? 0) + (w9 ? (w8.step ?? 0) * w9.show : 0),
      ww = Vc(ce.samples[w3]);
    return {
      key: w3,
      def: w4,
      ch: w8,
      s: ww,
      at: Cd(ww, wk ? { ...w8, late: wk / Xn() } : w8),
      keys: Ld(w8).keys,
    };
  }
  let w5 = Ce[w3].mirror ? 'l' : l.curveFoot.value,
    w6 = Ce[w3][w5],
    w7 = Vc(ce.samples[w3][w5]);
  return co()
    ? {
        key: w3,
        def: w4,
        side: w5,
        ch: w6,
        s: w7,
        at: Gl(w7, w6, 0, w3 === 'footZ' ? ce.reading.summary.stride : 0),
        keys: Nt(Go(w6)).keys.map((wV) => ({
          ...wV,
          u: nt(w6.keys[wV.of].u),
          du: w6.keys[wV.of].du,
        })),
      }
    : { key: w3, def: w4, side: w5, ch: w6, s: w7, at: hi(w7, w6), keys: dn(w6).keys };
}
function Wi(w3) {
  if (!co()) {
    let w7 = ce.reading,
      w8 = Math.max(w7.N - 1, 1);
    return w7.feet[w3].stances.map((w9) => [w9.land / w8, w9.lift / w8]);
  }
  let w4 = Vi('footY', w3).keys.filter((w9) => w9.lock),
    w5 = w4.filter((w9) => w9.kind === 'land'),
    w6 = w4.filter((w9) => w9.kind === 'lift');
  return w5.map((w9, wk) => {
    let ww = Ad(w9.u + w9.du),
      wV = w6[(wk + 1) % w6.length] ?? w6[0];
    return [ww, ww + (nt(wV.u + wV.du - ww) || 1)];
  });
}
function _d(w3) {
  let w4 = Fe[w3].foot ? ce.samples[w3][Ce[w3].mirror ? 'l' : l.curveFoot.value] : ce.samples[w3],
    w5 = Math.min(...w4),
    w6 = Math.max(...w4);
  return { mid: (w5 + w6) / 2, half: Math.max(1.3 * (w6 - w5), Fe[w3].least ?? 0.04) };
}
var Xn = () => {
    let w3 = ye.get('gait:' + ce.origin)?.clip ?? ye.get(ce.origin)?.clip;
    return w3 ? Math.max(1, Math.round(w3.duration * ba(w3))) : 40;
  },
  au = (w3) => (Fe[w3]?.foot ? (Ce[w3].mirror ? 'l' : l.curveFoot.value) : null),
  Fd = (w3) => (!Ce[w3] || !Fe[w3] ? null : Fe[w3].foot ? Ce[w3][au(w3)] : Ce[w3]),
  Nd = [
    'gaitSpeed',
    'gaitShare',
    ...Ca.map((w3) => 'gait' + w3),
    'gaitGround',
    'gaitHeadAhead',
    'ftOn',
    ...yn.map((w3) => 'ft' + w3),
  ],
  ru = () =>
    Object.fromEntries(
      Nd.map((w3) => [w3, l[w3].type === 'checkbox' ? l[w3].checked : l[w3].value]),
    ),
  an = null,
  Pa = (w3 = ru()) =>
    JSON.stringify({
      curves: Ce,
      fields: w3,
      ctls: ft.map(
        ({ id: w4, part: w5, kind: w6, on: w7, show: w8, aim: w9, pin: wk, pose: ww }) => ({
          id: w4,
          part: w5,
          kind: w6,
          on: w7,
          show: w8,
          aim: w9,
          pin: wk,
          pose: ww,
        }),
      ),
    });
function iu(w3) {
  for (let w4 of [...ft]) w3.ctls.some((w5) => w5.id === w4.id) || Gr(w4);
  for (let w5 of w3.ctls) {
    let w6 = Object.assign(
      ft.find((w7) => w7.id === w5.id) ?? qr(w5.part, w5.kind, w5.id, w5.aim ?? w5.pin),
      w5,
    );
    (w6.kind === 'aim' || w6.kind === 'pin') && Yr(w6);
  }
  Object.assign(Ce, w3.curves);
  for (let [w7, w8] of Object.entries(w3.fields ?? {}))
    l[w7].type === 'checkbox' ? (l[w7].checked = w8) : ((l[w7].value = w8), l[w7]._sync?.());
  for (let w9 of ft) ss(w9);
  (rn(),
    Fe[l.curveChan.value] || (l.curveChan.value = 'hipY'),
    Nr(),
    uo(),
    Pn(),
    aa.shown(),
    (l.gaitPreset.value = ''));
}
var aa = kc({
    undoBtn: l.curveUndo,
    redoBtn: l.curveRedo,
    state: Pa,
    apply: (w3) => {
      (iu(w3), wt());
    },
    ready: () => !!ce,
    busy: () => ra.busy(),
  }),
  $t = aa.mark,
  ra = bc({
    els: l,
    CHANNELS: Fe,
    curves: Ce,
    undo: aa,
    sides: ['l', 'r'],
    sideColour: Sn,
    src: () => ce,
    roundNow: co,
    framesNow: Xn,
    noFeetNow: os,
    viewOf: nu,
    chanOf: Fd,
    rangeOf: _d,
    stancesNow: Wi,
    resetCurve: Cn,
    keyBlocked: (w3, w4) => {
      let w5 = Fe[w3],
        w6 = au(w3),
        w7 = co();
      return !!(
        w5.foot &&
        w3 !== 'footY' &&
        Wi(w6).some(([w8, w9]) => {
          if (!w7) return w4 > w8 - 0.02 && w4 < w9 + 0.02;
          let wk = nt(w4 - w8);
          return wk < w9 - w8 + 0.02 || wk > 0.98;
        })
      );
    },
    plantMoved: (w3) => {
      (Hd(w3), Nr());
    },
    plantShown: () => Nr(),
    remake: () => wt(),
    byHand: () => {
      l.gaitPreset.value = '';
    },
    fieldsShown: () => ea(),
    shown: () => {
      ((An = !1), ea(), Wr());
    },
  }),
  {
    alsoPicked: Ha,
    curveVis: zr,
    curvePick: Vd,
    curveShown: uo,
    listBuild: rn,
    drawCurve: Wd,
    viewHeld: Bd,
    curveMoved: jd,
  } = ra;
window.eightWayGraph = { ...ra.check, state: () => Pa(), undo: () => aa.count() };
var Bi = 0,
  Id = null,
  An = !1,
  Kn = () => (Id ??= dt()),
  tn = (w3) => ft.find((w4) => w4.id === Fe[w3]?.ctl) ?? null,
  Zn = (w3) => mt[w3].bones[0] + (mt[w3].sided ? '_l' : ''),
  _a = { dist: 1, axis: '+y', roll: 'none', upAxis: '+z', upDist: 0.3, space: '' },
  rs = { to: 'other' };
function su(w3) {
  w3.pin.to !== 'other' ||
    !ft.some((w4) => w4 !== w3 && w4.kind === 'pin' && w4.pin.to === 'other') ||
    ((w3.pin.to = 'pelvis'),
    yt(
      'The other hand is pinned to this one already: the ' +
        mt[w3.part].label.toLowerCase() +
        ' is pinned to the hips.',
    ));
}
function lu(w3) {
  if (w3.pin.to !== 'other') return w3.pin.to || null;
  let w4 = ft.find((w5) => w5.kind === 'pin' && w5.pin.to === 'other');
  return w4 === w3 || !w4 ? (mt[w3.part].pin === 'l' ? 'hand_r' : 'hand_l') : null;
}
function cu(w3) {
  let w4 = Object.entries(vi(Kn(), Zn(w3))),
    w5 = (w8) => w4.find(([, w9]) => w9 === w8)?.[0],
    w6 = (mt[w3].sided ? null : w5('forward')) ?? '+y',
    w7 = w5('up');
  return { axis: w6, upAxis: w7 && w7[1] !== w6[1] ? w7 : xn(w6) };
}
var is = (w3) => (w3.upAxis?.[1] && w3.upAxis[1] !== w3.axis[1] ? w3.upAxis : xn(w3.axis));
function uu(w3) {
  let w4 = Kn().getObjectByName(Zn(w3.part));
  for (let w5 = w3.aim.space ? Kn().getObjectByName(w3.aim.space) : null; w5; w5 = w5.parent)
    if (w5 === w4) return null;
  return w3.aim.space || null;
}
var ia = (w3) =>
    w3.kind === 'aim'
      ? hr(w3.aim.roll)
      : w3.kind === 'pin'
        ? In
        : [...pr, ...(mt[w3.part].loc === !1 ? [] : jn)],
  Fo = (w3) => Object.keys(Fe).filter((w4) => Fe[w4].ctl === w3.id),
  du = (w3) => mt[w3.part].label + (w3.kind === 'aim' ? ': aim' : w3.kind === 'pin' ? ': pin' : '');
function fu(w3) {
  let w4 = mt[w3.part],
    w5 = ce.reading,
    w6 = Array.from({ length: w5.N }, (w9, wk) => wk * w5.dt),
    w7 = w4.sided ? '_l' : '',
    w8 = () => Object.fromEntries(ia(w3).map((w9) => [w9.key, new Array(w5.N).fill(0)]));
  if (w3.kind === 'aim') {
    let [w9, wk] = wr(dt(), ce.clip, [w4.bones[0] + w7, uu(w3) ?? 'root'], w6),
      ww =
        w9 && wk
          ? vr(w9.turns, w9.places, wk.places, {
              axis: Uo(w3.aim.axis),
              dist: w3.aim.dist,
              roll: w3.aim.roll,
              square: Uo(xn(w3.aim.axis)),
              upAxis: Uo(is(w3.aim)),
              upDist: w3.aim.upDist,
            })
          : null,
      wV = (wD, wm) => Object.fromEntries(wm.map((wS) => [wS.key, wD.map((wE) => wE[wS.axis])]));
    w3.read = [
      ww
        ? {
            ...wV(ww.tgt, gi),
            ...(ww.up ? wV(ww.up, yi) : {}),
            ...(ww.rolls ? { roll: ww.rolls } : {}),
          }
        : w8(),
    ];
  } else {
    if (w3.kind === 'pin') {
      let wD = lu(w3),
        [wm, wS] = wr(dt(), ce.clip, [w4.bones[0], wD ?? 'root'], w6),
        wE =
          wm && wS
            ? mr(wm.turns, wm.places, wD ? wS.turns : wS.turns.map(() => new kO()), wS.places)
            : null;
      w3.read = [
        wE
          ? Object.fromEntries(
              In.map((wF) => [
                wF.key,
                wF.hold
                  ? new Array(w5.N).fill(1)
                  : wF.turn
                    ? wE[wF.turn]
                    : wE.loc.map((wC) => wC[wD ? wF.own : wF.axis]),
              ]),
            )
          : w8(),
      ];
    } else {
      let wF = wr(
        dt(),
        ce.clip,
        w4.bones.map((wC) => wC + w7),
        w6,
      );
      w3.read = wF.map((wC) =>
        wC
          ? {
              ...va(wC.turns),
              ...Object.fromEntries(jn.map((wH) => [wH.key, wC.places.map((we) => we[wH.axis])])),
            }
          : w8(),
      );
    }
  }
  ss(w3);
}
function ss(w3) {
  w3.show = Math.min(Math.max(w3.show | 0, 0), w3.read.length - 1);
  for (let w4 of ia(w3)) ce.samples[w3.id + '.' + w4.key] = w3.read[w3.show][w4.key];
}
var ls = (w3) => {
  (Ha.delete(w3),
    delete Fe[w3],
    delete Ce[w3],
    delete zr[w3],
    delete ce?.samples[w3],
    l.curveChan.querySelector('option[value="' + w3 + '"]')?.remove());
};
function Yr(w3) {
  let w4 = mt[w3.part],
    w5 = ia(w3),
    w6 = du(w3);
  for (let w7 of Fo(w3)) w5.some((w8) => w3.id + '.' + w8.key === w7) || ls(w7);
  fu(w3);
  for (let w8 of w5) {
    let w9 = w3.id + '.' + w8.key;
    Fe[w9] ||
      ((Fe[w9] = {
        group: w6,
        short: w8.short,
        colour: w8.colour,
        flip: !!w8.flip,
        up: w8.up,
        down: w8.down,
        ...(w8.hold
          ? { unit: '', scale: 1, least: 0.7 }
          : w8.axis
            ? { least: 0.02 }
            : { unit: '\u00B0', scale: 1, least: 2 }),
        ctl: w3.id,
        mirror: !(w4.sided || w4.pin) && !ta(),
      }),
      (zr[w9] = !1),
      l.curveChan.add(new Option(w6 + ': ' + w8.short, w9)),
      Cn(w9));
  }
}
function qr(w3, w4 = 'bone', w5 = 'c' + ++Bi, w6 = null) {
  let w7 = {
    id: w5,
    part: w3,
    kind: w4,
    on: !0,
    show: 0,
    ...(w4 === 'aim'
      ? { aim: { ...(w6 ?? _a) } }
      : w4 === 'pin'
        ? { pin: { ...(w6 ?? rs) } }
        : { pose: Ur() }),
  };
  return (ft.push(w7), w4 === 'pin' && su(w7), Yr(w7), w7);
}
function Gr(w3) {
  for (let w4 of Fo(w3)) ls(w4);
  ft.splice(ft.indexOf(w3), 1);
}
function Dd(w3, w4) {
  if (!ce || !mt[w3] || (w4 === 'aim' && mt[w3].bones.length > 1) || (w4 === 'pin') != !!mt[w3].pin)
    return;
  let w5 = ft.find((w7) => w7.part === w3 && w7.kind === w4);
  w5 || $t();
  let w6 = w5 ?? qr(w3, w4);
  if ((rn(), Ha.clear(), (l.curveChan.value = Fo(w6)[0]), !w5 && l.curveAdv.checked)) {
    for (let w7 of Object.keys(Fe)) zr[w7] = Fe[w7].ctl === w6.id;
  }
  (uo(), !w5 && w4 !== 'bone' && wt());
}
function zd(w3) {
  let w4 = w3.on && (w3.kind !== 'bone' || cs(w3) || Fo(w3).some((w5) => zn(Ce[w5])));
  ($t(),
    Fo(w3).includes(l.curveChan.value) && (l.curveChan.value = 'hipY'),
    Gr(w3),
    rn(),
    uo(),
    w4 && wt());
}
var Ur = () => ({ rot: [0, 0, 0, 1], loc: [0, 0, 0] }),
  cs = (w3) =>
    !!w3.pose &&
    (Math.abs(w3.pose.rot[3]) < 1 - 1e-10 || w3.pose.loc.some((w4) => Math.abs(w4) > 1e-7)),
  Yd = {
    pelvis: 'hips',
    spine_01: 'spine_01',
    spine_02: 'spine_02',
    spine_03: 'chest',
    neck_01: 'neck',
    Head: 'head',
    clavicle: 'shoulder',
    upperarm: 'upperarm',
    lowerarm: 'forearm',
    hand: 'hand',
  },
  qd = Object.entries(Yd).flatMap(([w3, w4]) =>
    mt[w4].sided
      ? ['l', 'r'].map((w5) => ({ name: w3 + '_' + w5, part: w4, side: w5 }))
      : [{ name: w3, part: w4, side: null }],
  ),
  pu = (w3) => {
    ((en = w3), (l.play.textContent = w3 ? 'Pause' : 'Play'));
  },
  Wc = (w3) => (
    Kn().updateMatrixWorld(!0),
    Kn().getObjectByName(w3)?.getWorldQuaternion(new kO()) ?? new kO()
  ),
  hu = (w3, w4, w5) => yr(w3, Wc(w4), Wc(w5)),
  bo = Ec({
    scene: go,
    camera: gn,
    renderer: No,
    orbit: $n,
    els: l,
    picks: qd,
    cell: () => Qe,
    ready: () => !!ce,
    playing: () => en,
    setPlaying: pu,
    acrossTurn: hu,
    poseOf: (w3) => Vr(w3)?.pose,
    partLabel: (w3) => mt[w3].label,
    placeless: (w3) => w3 === 'hips',
    apply: (w3, w4, w5) => gu(w3, w4, w5),
    setPose: (w3, w4) => {
      Vr(w3, !0).pose = w4;
    },
    edited: () => (uo(), (l.gaitPreset.value = ''), wt()),
    mark: () => $t(),
  }),
  { shown: Pn, step: mu } = bo;
function Vr(w3, w4 = !1) {
  let w5 = ft.find((w7) => w7.kind === 'bone' && w7.part === w3.part);
  if (w5 || !w4 || !ce) return w5 ?? null;
  let w6 = qr(w3.part, 'bone');
  return (rn(), w6);
}
function Eo(w3, w4, w5, w6 = !1) {
  if (!Ce[w3] || (Math.abs(w5) < 1e-9 && !w6)) return;
  let w7 = Ce[w3];
  if (!co()) {
    let wV = dn(w7),
      wD = wV.keys.find((wS) => Math.abs(wS.p - w4) < 0.5 / Xn());
    if (wD) {
      w7.keys[wD.of].dv += w5;
      return;
    }
    let wm = Math.min(Math.max(wV.from(w4), 0.004), 0.996);
    w7.keys.push({ u: wm, du: eu(w4) - wm, dv: wV.lift(w4) + w5 });
    return;
  }
  let w8 = Nt(w7),
    w9 = w8.keys.find((wS) => Math.abs(nt(wS.p - w4 + 0.5) - 0.5) < 0.5 / Xn());
  if (w9) {
    w7.keys[w9.of].dv += w5 * (w7.mirror && w7.flip && w9.twin ? -1 : 1);
    return;
  }
  let wk = w8.from(w4),
    ww = w7.mirror && w7.flip && nt(wk) >= 0.5 ? -1 : 1;
  w7.keys.push({
    u: w7.mirror ? nt(wk) % 0.5 : nt(wk),
    du: w4 - wk,
    dv: (w8.lift(nt(w4)) + w5) * ww,
  });
}
function gu(w3, w4, w5) {
  if (!ce || (Math.abs(w4.w) > 1 - 1e-10 && w5.lengthSq() < 1e-12)) return null;
  $t();
  let w6 = Vr(w3, !0),
    w7 = w3.side === 'r',
    w8 = w7 ? hu(w4, w3.name, xa(w3.name)) : w4.clone(),
    w9 = w7 ? Dn(w5) : w5.clone();
  w3.part === 'hips' && w9.set(0, 0, 0);
  let wk = new kO(...w6.pose.rot);
  if (l.poseWhen.value === 'key') {
    let ww = nt(+l.time.value + (w7 && !ta() ? 0.5 : 0)),
      wV = Object.fromEntries(
        ['fwd', 'side', 'twist'].map((wE) => [wE, nu(w6.id + '.' + wE).at(ww)]),
      ),
      wD = w6.read[w6.show].mid,
      wm = wD
        .clone()
        .multiply(wk)
        .multiply(w8)
        .multiply(wk.clone().invert())
        .multiply(wD.clone().invert()),
      wS = Xl(Kl(wV).multiply(wm));
    for (let wE of ['fwd', 'side', 'twist'])
      Eo(
        w6.id + '.' + wE,
        ww,
        wE === 'twist' ? ((wS[wE] - wV[wE] + 540) % 360) - 180 : wS[wE] - wV[wE],
      );
    (Eo(w6.id + '.locX', ww, w9.x), Eo(w6.id + '.locY', ww, w9.z), Eo(w6.id + '.locZ', ww, w9.y));
  } else
    ((w6.pose.rot = wk.multiply(w8).normalize().toArray()),
      (w6.pose.loc = [w6.pose.loc[0] + w9.x, w6.pose.loc[1] + w9.y, w6.pose.loc[2] + w9.z]));
  return (Pn(), uo(), (l.gaitPreset.value = ''), wt());
}
(l.poseResetAll.addEventListener('click', () => {
  if (ft.some(cs)) {
    $t();
    for (let w3 of ft) w3.pose && (w3.pose = Ur());
    (Pn(), wt());
  }
}),
  l.poseReset.addEventListener('click', () => {
    let w3 = bo.picked(),
      w4 = w3 && Vr(w3);
    !w4 || !cs(w4) || ($t(), (w4.pose = Ur()), Pn(), wt());
  }),
  (window.eightWayPose = {
    pick: bo.check.pick,
    apply: (w3, w4 = [0, 0, 0]) => bo.picked() && gu(bo.picked(), new kO(...w3), new kf(...w4)),
    turnOf: (w3) => Qe.rig.getObjectByName(w3).getWorldQuaternion(new kO()).toArray(),
    state: bo.check.state,
    take: bo.check.take,
    turn: bo.check.turn,
    drop: bo.check.drop,
    frame: () => {
      (Pi(Qe, mn), mu());
    },
  }));
var Jn = xc({
    renderer: No,
    camera: gn,
    orbit: $n,
    framesNow: Xn,
    on: () => l.trailEdit.checked,
    gizmoAxis: () => bo.gizmo.axis,
    playing: () => en,
    setPlaying: pu,
    letGo: () => bo.letGo(),
    addable: () =>
      Qe && ce && [ce.origin, 'gait:' + ce.origin].includes(l.source.value)
        ? {
            cell: Qe,
            trails: [
              ...(l.hipTrail.checked ? [['pelvis', null]] : []),
              ...(l.trails.checked ? us().map((w3) => ['ankle_' + w3, w3]) : []),
            ],
          }
        : null,
    inSwing: (w3, w4) => yu(w3, w4),
    add: (w3, w4) => vu(w3, w4),
    mark: () => $t(),
    byHand: () => {
      l.gaitPreset.value = '';
    },
    remake: () => wt(),
  }),
  { sameTime: Gd, timesOf: ji } = Jn,
  yu = (w3, w4) => !Wi(w3).some(([w5, w6]) => nt(w4 - w5) < w6 - w5);
function Tr(w3, w4, w5, w6, w7 = !1) {
  if (Math.abs(w6) < 1e-9 && !w7) return;
  let w8 = Ce[w3][w4],
    w9 = Nt(Go(w8)),
    wk = w9.keys.find((wD) => !wD.lock && Gd(wD.p, w5));
  if (wk) {
    w8.keys[wk.of].dv += w6;
    return;
  }
  let ww = Nt({
      keys: w8.keys.filter((wD) => wD.lock).map((wD) => ({ u: wD.u, du: wD.du, dv: 0 })),
    }),
    wV = ww.from(w9.from(w5));
  w8.keys.push({ u: nt(wV), du: w5 - wV, dv: w9.lift(nt(w5)) + w6 });
}
var us = () => (Ce.footY.mirror ? ['l'] : ['l', 'r']);
function Ud(w3) {
  if (
    (Jn.keep((w8) => w8.kind === 'aim'),
    !l.trailEdit.checked ||
      !ce ||
      w3 !== Qe ||
      ![ce.origin, 'gait:' + ce.origin].includes(l.source.value))
  )
    return;
  let w4 = w3.reading,
    w5 = ce.reading.left,
    w6 = ce.reading.dir,
    w7 = (w8, w9, wk, ww, wV) => {
      if (!wk.length || !w4.P[w9]) return;
      let wD = Oi(
        wk.map((wm) => Ri(w4, w9, wm)),
        ww,
      );
      (w3.marks.add(wD),
        Jn.add({
          kind: w8,
          points: wD,
          items: wk.map((wm) => ({ x: wm, apply: (wS) => wV(wm, wS) })),
        }));
    };
  if (
    (l.hipTrail.checked &&
      w7(
        'hips',
        'pelvis',
        ji(['hipX', 'hipY', 'hipZ'].map((w8) => Nt(Ce[w8]).keys)),
        16777215,
        (w8, w9) => {
          (Eo('hipX', w8, w9.dot(w5)), Eo('hipY', w8, w9.y), Eo('hipZ', w8, w9.dot(w6)));
        },
      ),
    l.trails.checked)
  ) {
    for (let w8 of us())
      w7(
        'foot ' + w8,
        'ankle_' + w8,
        ji(_o.map((w9) => Nt(Go(Ce[w9][w8])).keys.filter((wk) => !wk.lock))).filter((w9) =>
          yu(w8, w9),
        ),
        Sn[w8],
        (w9, wk) => {
          (Tr('footX', w8, w9, wk.dot(w5)),
            Tr('footY', w8, w9, wk.y),
            Tr('footZ', w8, w9, wk.dot(w6)));
        },
      );
  }
}
function wu(w3) {
  Jn.keep((w4) => w4.kind !== 'aim');
  for (let w4 of w3?.marks ?? []) w4.keys && (w4.path.remove(w4.keys), (w4.keys = null));
  if (!(!w3 || !l.trailEdit.checked || !ce))
    for (let w5 of w3.marks) {
      let w6 =
        w5.which === 'at'
          ? ft.find((wk) => wk.kind === 'aim' && wk.on && Zn(wk.part) === w5.name)
          : null;
      if (!w6) continue;
      let w7 = ji(['aimX', 'aimY', 'aimZ'].map((wk) => Nt(Ce[w6.id + '.' + wk]).keys)),
        w8 = w5.pts.length;
      if (!w7.length) continue;
      let w9 = (wk) => {
        let ww = nt(wk) * w8,
          wV = Math.floor(ww) % w8;
        return w5.pts[wV].clone().lerp(w5.pts[(wV + 1) % w8], ww - Math.floor(ww));
      };
      ((w5.keys = Oi(w7.map(w9), 16777215)),
        w5.path.add(w5.keys),
        Jn.add({
          kind: 'aim',
          points: w5.keys,
          items: w7.map((wk) => ({
            x: wk,
            apply: (ww) => {
              (Eo(w6.id + '.aimX', wk, ww.x),
                Eo(w6.id + '.aimY', wk, ww.z),
                Eo(w6.id + '.aimZ', wk, ww.y));
            },
          })),
        }));
    }
}
function vu(w3, w4) {
  if (($t(), w3)) {
    for (let w5 of _o) Tr(w5, w3, w4, 0, !0);
  } else {
    for (let w6 of ['hipX', 'hipY', 'hipZ']) Eo(w6, w4, 0, !0);
  }
  Lr(Qe);
}
window.eightWayTrails = {
  ...Jn.check,
  add: (w3, w4) => vu(w3, w4 / Xn()),
  shaded: () => Qe.marks.children.filter((w3) => w3.isLine && w3.material.vertexColors).length,
};
var ds = 'actionforge.eightway.styles',
  ku = () => {
    let w3 = ce.reading,
      w4 = w3.feet.l.stances[0];
    return w4 ? nt(w4.land / w3.N) : 0;
  },
  bu = (w3) => !!(w3.du || w3.dv || w3.tin != null || w3.tout != null || w3.type || w3.i),
  Qr = (w3, w4 = 1) => ({
    ...(w3.tin != null ? { tin: w4 * w3.tin } : {}),
    ...(w3.tout != null ? { tout: w4 * w3.tout } : {}),
    ...(w3.type ? { type: w3.type } : {}),
    ...(w3.i ? { i: w3.i } : {}),
  });
function Bc(w3) {
  let w4 = Ce[w3],
    w5 = ku();
  return {
    mirror: w4.mirror,
    ...(w4.late ? { late: w4.late } : {}),
    ...(w4.step ? { step: w4.step } : {}),
    ...((w4.amount ?? 1) !== 1 ? { amount: w4.amount } : {}),
    keys: w4.keys.filter(bu).map((w6) => {
      let w7 = nt(w6.u - w5),
        w8 = 1;
      return (
        w4.mirror && w7 >= 0.5 && ((w7 -= 0.5), w4.flip && (w8 = -1)),
        { u: +w7.toFixed(5), du: w6.du, dv: w8 * w6.dv, ...Qr(w6, w8) }
      );
    }),
  };
}
function jc(w3, w4) {
  if (!w4 || !Ce[w3] || Fe[w3].foot) return;
  let w5 = w4.mirror ?? Ce[w3].mirror,
    w6 = !!Fe[w3].flip,
    w7 = ku(),
    w8 = w5 ? 0.5 : 1,
    w9 = {
      mirror: w5,
      flip: w6,
      keys: mi(ce.samples[w3], w5),
      ...(w4.late ? { late: w4.late } : {}),
      ...(w4.step ? { step: w4.step } : {}),
      ...(w4.amount != null && w4.amount !== 1 ? { amount: w4.amount } : {}),
    };
  for (let wk of w4.keys ?? []) {
    let ww = nt(wk.u + w7),
      wV = 1;
    (w5 && ww >= 0.5 && ((ww -= 0.5), w6 && (wV = -1)),
      (w9.keys = w9.keys.filter((wD) => {
        let wm = Math.abs((w5 ? nt(wD.u) % 0.5 : nt(wD.u)) - ww) % w8;
        return Math.min(wm, w8 - wm) > 0.03;
      })),
      w9.keys.push({ u: ww, du: wk.du ?? 0, dv: wV * (wk.dv ?? 0), ...Qr(wk, wV) }));
  }
  Ce[w3] = w9;
}
function Qd() {
  let w3 = { mirror: Ce.footY.mirror };
  for (let w4 of us()) {
    let w5 = $a(w4);
    w3[w4] = {
      locks: Ce.footY[w4].keys.filter((w6) => w6.lock).map((w6) => ({ kind: w6.kind, du: w6.du })),
      ...Object.fromEntries(
        _o.map((w6) => [
          w6,
          Ce[w6][w4].keys
            .filter((w7) => !w7.lock && bu(w7))
            .map((w7) => {
              let w8 = Math.max(
                  0,
                  w5.findIndex((wk) => nt(w7.u - wk.lift) <= wk.len),
                ),
                w9 = w5[w8];
              return {
                swing: w8,
                through: +(nt(w7.u - w9.lift) / w9.len).toFixed(5),
                du: w7.du / w9.len,
                dv: w7.dv,
                ...Qr(w7),
              };
            }),
        ]),
      ),
    };
  }
  return w3;
}
function Xd(w3) {
  if (w3) {
    for (let w4 of _o) Ce[w4].mirror = w3.mirror ?? !0;
    for (let w5 of ['l', 'r']) {
      let w6 = w3[w5],
        w7 = $a(w5);
      if (!w6) {
        if (w5 === 'r' && !Ce.footY.mirror) {
          for (let w8 of _o) Ce[w8].r = { keys: as(w8) };
        }
        continue;
      }
      for (let w9 of _o) {
        let wk = Ce[w9][w5];
        for (let ww of ['lift', 'land']) {
          let wV = (w6.locks ?? []).filter((wD) => wD.kind === ww);
          wk.keys
            .filter((wD) => wD.lock && wD.kind === ww)
            .forEach((wD, wm) => {
              wV[wm] && (wD.du = wV[wm].du);
            });
        }
        for (let wD of w6[w9] ?? []) {
          let wm = w7[Math.min(wD.swing ?? 0, w7.length - 1)],
            wS = nt(wm.lift + (wD.through ?? 0.5) * wm.len);
          ((wk.keys = wk.keys.filter(
            (wE) => wE.lock || Math.abs(nt(wE.u - wS + 0.5) - 0.5) > 0.03,
          )),
            wk.keys.push({ u: wS, du: (wD.du ?? 0) * wm.len, dv: wD.dv ?? 0, ...Qr(wD) }));
        }
      }
    }
  }
}
var fs = (w3) => ({
  style: 1,
  name: w3,
  from: ce.origin,
  gait: Object.fromEntries(Ca.map((w4) => [w4, +l['gait' + w4].value])),
  headAhead: l.gaitHeadAhead.checked,
  follow: { on: l.ftOn.checked, ...Object.fromEntries(yn.map((w4) => [w4, +l['ft' + w4].value])) },
  hips: Object.fromEntries(['hipY', 'hipX', 'hipZ'].map((w4) => [w4, Bc(w4)])),
  feet: Qd(),
  controls: ft.map((w4) => ({
    part: w4.part,
    kind: w4.kind,
    on: w4.on,
    ...(w4.aim ? { aim: w4.aim } : {}),
    ...(w4.pin ? { pin: w4.pin } : {}),
    ...(w4.pose ? { pose: w4.pose } : {}),
    curves: Object.fromEntries(ia(w4).map((w5) => [w5.key, Bc(w4.id + '.' + w5.key)])),
  })),
});
function Xr(w3, w4 = !1) {
  if (!ce || !w3) return null;
  if (($t(), !w4)) {
    for (let w5 of [...ft]) Gr(w5);
  }
  for (let w6 of ['hipY', 'hipX', 'hipZ', ..._o]) Cn(w6, !0);
  if (
    (ts(w3.gait ?? {}), w3.headAhead != null && (l.gaitHeadAhead.checked = w3.headAhead), w3.follow)
  ) {
    ((l.ftOn.checked = w3.follow.on !== !1), (l.ftPreset.value = ''));
    for (let w7 of yn) ((l['ft' + w7].value = w3.follow[w7] ?? Dr[w7]), l['ft' + w7]._sync?.());
  }
  for (let w8 of ['hipY', 'hipX', 'hipZ']) jc(w8, w3.hips?.[w8]);
  if ((Xd(w3.feet), !w4))
    for (let w9 of w3.controls ?? []) {
      if (!mt[w9.part]) continue;
      let wk = qr(w9.part, w9.kind ?? 'bone', void 0, w9.aim ?? w9.pin);
      ((wk.on = w9.on !== !1),
        w9.pose && wk.pose && (wk.pose = { rot: [...w9.pose.rot], loc: [...w9.pose.loc] }));
      for (let ww of ia(wk)) jc(wk.id + '.' + ww.key, w9.curves?.[ww.key]);
    }
  return (
    rn(),
    Fe[l.curveChan.value] || (l.curveChan.value = 'hipY'),
    Ha.clear(),
    Nr(),
    uo(),
    Pn(),
    wt()
  );
}
var Kd = {
    Stroll: { gait: $r.Stroll },
    Brisk: { gait: $r.Brisk },
    Heavy: {
      gait: $r.Heavy,
      follow: { on: !0, ...Ni.Heavy },
      hips: { hipY: { mirror: !0, keys: [{ u: 0.05, du: 0.06, dv: -0.02 }] } },
    },
    Sneak: { gait: $r.Sneak, headAhead: !0, follow: { on: !0, ...Ni.Stiff } },
  },
  Kr = () => {
    try {
      return JSON.parse(localStorage.getItem(ds) ?? '{}') ?? {};
    } catch {
      return {};
    }
  };
function ps(w3 = '') {
  let w4 = Kr();
  (l.styleList.replaceChildren(
    new Option(Object.keys(w4).length ? '(saved styles)' : '(none saved yet)', ''),
    ...Object.keys(w4)
      .sort()
      .map((w5) => new Option(w5, w5)),
  ),
    (l.styleList.value = w4[w3] ? w3 : ''));
}
var on = (w3, w4 = !1) => {
  ((l.styleNote.textContent = w3), (l.styleNote.className = w4 ? 'note bad' : 'note'));
};
(l.styleSave.addEventListener('click', () => {
  if (!ce) return;
  let w3 = Kr(),
    w4 = l.styleName.value.trim() || l.styleList.value || 'Style ' + (Object.keys(w3).length + 1);
  w3[w4] = fs(w4);
  try {
    (localStorage.setItem(ds, JSON.stringify(w3)),
      ps(w4),
      (l.styleName.value = ''),
      on('Saved "' + w4 + '" in this browser.'));
  } catch (w5) {
    on("It couldn't be saved here: " + w5.message, !0);
  }
}),
  l.styleLoad.addEventListener('click', () => {
    let w3 = Kr()[l.styleList.value];
    if (!w3) {
      on('Pick a saved style first.', !0);
      return;
    }
    (Xr(w3), on('Loaded "' + w3.name + '".'));
  }),
  l.styleDelete.addEventListener('click', () => {
    let w3 = Kr(),
      w4 = l.styleList.value;
    w3[w4] &&
      (delete w3[w4],
      localStorage.setItem(ds, JSON.stringify(w3)),
      ps(),
      on('"' + w4 + '" is out of this browser.'));
  }),
  l.styleFile.addEventListener('click', () => {
    if (!ce) return;
    let w3 = l.styleName.value.trim() || l.styleList.value || 'style',
      w4 = document.createElement('a');
    ((w4.href = URL.createObjectURL(
      new Blob([JSON.stringify(fs(w3), null, 1)], { type: 'application/json' }),
    )),
      (w4.download = w3.replace(/[^A-Za-z0-9_-]+/g, '_') + '.style.json'),
      w4.click(),
      setTimeout(() => URL.revokeObjectURL(w4.href), 2000),
      on('"' + w3 + '" saved as a file.'));
  }),
  l.styleOpenBtn.addEventListener('click', () => l.styleOpen.click()),
  l.styleOpen.addEventListener('change', async () => {
    let w3 = l.styleOpen.files[0];
    if (((l.styleOpen.value = ''), !!w3))
      try {
        let w4 = JSON.parse(await w3.text());
        if (w4?.style !== 1) throw new Error('not a style of this page');
        (Xr(w4), on('Loaded "' + (w4.name ?? w3.name) + '" from the file.'));
      } catch (w5) {
        on("That file couldn't be loaded: " + w5.message, !0);
      }
  }),
  ps(),
  (window.eightWayStyles = { now: () => fs('check'), apply: (w3) => Xr(w3) }));
var xu = 'actionforge.lab.work',
  Zd = 24,
  hs = () => {
    try {
      let w3 = JSON.parse(localStorage.getItem(xu) || 'null');
      return w3?.v === 1 ? { works: {}, ...w3 } : { v: 1, works: {} };
    } catch {
      return { v: 1, works: {} };
    }
  };
function Ta(w3) {
  let w4 = hs();
  w3(w4);
  for (let [w5] of Object.entries(w4.works)
    .sort((w6, w7) => (w7[1].at ?? 0) - (w6[1].at ?? 0))
    .slice(Zd))
    delete w4.works[w5];
  try {
    localStorage.setItem(xu, JSON.stringify(w4));
  } catch (w6) {
    console.warn(w6);
  }
}
var Ii = new Map();
function Jd(w3) {
  if (!ce || ce.origin !== w3) return;
  let w4 = Pa();
  Ta((w5) => {
    w4 === Ii.get(w3) ? delete w5.works[w3] : (w5.works[w3] = { at: Date.now(), state: w4 });
  });
}
function Di() {
  ((l.gaitPreset.value = ''), (l.ftPreset.value = ''));
  for (let w3 of [...ft]) Gr(w3);
  for (let w4 of Object.keys(Fe)) Cn(w4, !0);
  ((l.ftOn.checked = !0), (l.gaitHeadAhead.checked = !0), (l.gaitShare.value = 0.5));
  for (let w5 of yn) ((l['ft' + w5].value = Dr[w5]), l['ft' + w5]._sync?.());
  (ts({}), rn(), Fe[l.curveChan.value] || (l.curveChan.value = 'hipY'), uo(), Pn());
}
function ef(w3) {
  (Di(), Ii.set(w3, Pa()));
  let w4 = hs().works[w3]?.state ?? ye.get(w3)?.doc?.state ?? null;
  if (!w4 || w4 === Ii.get(w3)) return !1;
  try {
    return (
      iu(JSON.parse(w4)),
      (Bi = Math.max(Bi, ...ft.map((w5) => +String(w5.id).slice(1) || 0))),
      aa.clear(),
      !0
    );
  } catch (w5) {
    return (
      console.warn(w5),
      Ta((w6) => {
        delete w6.works[w3];
      }),
      Di(),
      !1
    );
  }
}
l.startOver.addEventListener('click', () => {
  ce &&
    ($t(),
    Di(),
    on(
      'Everything on this ' + (ta() ? 'animation' : 'cycle') + ' is back to the source\u2019s own.',
    ),
    wt());
});
var hn = null,
  Eu = (w3) => (l.outOnly.checked ? w3 === tn(l.curveChan.value) : hn ? w3.id === hn : !w3.hidden);
function Wr() {
  let w3 = tn(l.curveChan.value);
  if ((hn && !ft.some((w4) => w4.id === hn) && (hn = null), !ft.length)) {
    l.outList.replaceChildren(
      Object.assign(document.createElement('div'), {
        className: 'note',
        textContent: 'No controls yet.',
      }),
    );
    return;
  }
  l.outList.replaceChildren(
    ...ft.map((w4) => {
      let w5 = Object.assign(document.createElement('div'), {
          className: 'outRow' + (w4 === w3 ? ' sel' : '') + (Eu(w4) ? '' : ' unseen'),
        }),
        w6 = w4.kind === 'aim',
        w7 = (wV, wD, wm, wS) => {
          let wE = Object.assign(document.createElement('button'), {
            type: 'button',
            className: wV,
            textContent: wD,
            title: wm,
          });
          return (wE.addEventListener('click', wS), wE);
        },
        w8 = w7(
          w4.hidden ? 'off' : '',
          w4.hidden ? '\u25CB' : '\u25CF',
          w6 ? 'Its gizmo in the view: shown, or hidden' : 'Nothing of it is drawn in the view',
          () => {
            ((w4.hidden = !w4.hidden), Wr());
          },
        ),
        w9 = w7(
          hn === w4.id ? 'lit' : '',
          '\u25CE',
          w6
            ? 'Its gizmo alone in the view (again: all of them back)'
            : 'Nothing of it is drawn in the view',
          () => {
            ((hn = hn === w4.id ? null : w4.id), Wr());
          },
        );
      w8.disabled = w9.disabled = !w6;
      let wk = w7('name', du(w4), 'Pick it: its curves in the graph', () => {
          (Ha.clear(), (l.curveChan.value = Fo(w4)[0]));
          for (let wV of Fo(w4)) zr[wV] = !0;
          uo();
        }),
        ww = Object.assign(document.createElement('input'), {
          type: 'checkbox',
          checked: w4.on,
          title:
            'On. Off: it does nothing \u2014 the part as the source has it \u2014 and keeps its curves.',
        });
      return (
        ww.addEventListener('change', () => {
          ($t(), (w4.on = ww.checked), wt());
        }),
        w5.append(
          w8,
          w9,
          wk,
          ww,
          w7('', '\u00D7', 'This control, and its curves, away', () => zd(w4)),
        ),
        w5
      );
    }),
  );
}
l.outOnly.addEventListener('change', Wr);
var Mu = () =>
    ft
      .filter((w3) => w3.on)
      .map((w3) => {
        let w4 = mt[w3.part],
          w5 = Object.fromEntries(
            ia(w3).map((w6) => {
              let w7 = Ce[w3.id + '.' + w6.key];
              return [w6.key, { ...w7, keys: w7.keys.map((w8) => ({ ...w8 })) }];
            }),
          );
        return w3.kind === 'pin'
          ? { kind: 'pin', hand: w4.pin, to: lu(w3), channels: w5 }
          : w3.kind === 'aim'
            ? {
                kind: 'aim',
                bones: w4.bones,
                sided: !!w4.sided,
                axis: w3.aim.axis,
                distance: w3.aim.dist,
                roll: w3.aim.roll,
                upAxis: is(w3.aim),
                upDistance: w3.aim.upDist,
                space: uu(w3),
                channels: w5,
              }
            : { bones: w4.bones, sided: !!w4.sided, channels: w5, pose: w3.pose };
      }),
  tf = () => {
    let w3 = l.curveChan.value,
      w4 = Fe[w3],
      w5 = os();
    return w4.foot || (w5 && !w4.ctl)
      ? []
      : [
          ...new Set([
            w3,
            ...Ha,
            ...(l.chAll.checked ? Object.keys(Fe).filter((w6) => Fe[w6].group === w4.group) : []),
          ]),
        ].filter((w6) => Fe[w6] && !Fe[w6].foot && (!w5 || Fe[w6].ctl));
  };
function ea() {
  let w3 = l.curveChan.value,
    w4 = tn(w3),
    w5 = Fe[w3].foot || (os() && !w4) ? null : Ce[w3];
  ((l.chLate.disabled = l.chAmt.disabled = l.chAll.disabled = !w5),
    (l.chLate.value = w5?.late ?? 0),
    (l.chAmt.value = w5?.amount ?? 1),
    (l.ctlStep.disabled = !w4 || mt[w4.part].bones.length < 2),
    (l.ctlStep.value = w5?.step ?? 0));
  let w6 = w4 ? mt[w4.part].bones : [];
  ((l.ctlBone.disabled = w6.length < 2),
    l.ctlBone.replaceChildren(...w6.map((wD, wm) => new Option(wD.replace(/_/g, ' '), wm))),
    w4 && (l.ctlBone.value = w4.show));
  let w7 = w4?.kind === 'aim' && !An,
    w8 = w7 ? w4.aim : _a,
    w9 = w7 || l.ctlKind.value === 'aim',
    wk = Zn(w7 ? w4.part : l.ctlPart.value);
  if (l.aimAxis.dataset.bone !== wk) {
    let wD = vi(Kn(), wk),
      wm = () =>
        wi.map(
          (wS) =>
            new Option(
              '' +
                (wS[0] === '-' ? '\u2212' : '') +
                wS[1].toUpperCase() +
                ' (' +
                (wD[wS] ?? '?') +
                ')',
              wS,
            ),
        );
    (l.aimAxis.replaceChildren(...wm()),
      l.aimUpAxis.replaceChildren(...wm()),
      (l.aimAxis.dataset.bone = wk));
  }
  ((l.aimDist.value = Math.round(w8.dist * 100)),
    (l.aimAxis.value = w8.axis),
    (l.aimRoll.value = w8.roll),
    (l.aimUpAxis.value = is(w8)),
    (l.aimUpDist.value = Math.round(w8.upDist * 100)),
    (l.aimSpace.value = w8.space),
    (l.aimWho.textContent = w7
      ? 'Aim (' + mt[w4.part].label + ')'
      : w9
        ? 'Aim (next: ' + mt[l.ctlPart.value].label + ')'
        : 'Aim'));
  for (let wS of [l.aimDist, l.aimAxis, l.aimRoll, l.aimSpace]) wS.disabled = !w9;
  l.aimUpAxis.disabled = l.aimUpDist.disabled = !w9 || w8.roll !== 'up';
  let ww = w4?.kind === 'pin' && !An,
    wV = ww || l.ctlKind.value === 'pin';
  ((l.pinTo.value = (ww ? w4.pin : rs).to),
    (l.pinTo.disabled = !wV),
    (l.pinWho.textContent = ww
      ? 'Pin (' + mt[w4.part].label + ')'
      : wV
        ? 'Pin (next: ' + mt[l.ctlPart.value].label + ')'
        : 'Pin'));
}
l.pinTo.addEventListener('change', () => {
  let w3 = tn(l.curveChan.value);
  if (w3?.kind !== 'pin' || An) {
    rs.to = l.pinTo.value;
    return;
  }
  ($t(), (w3.pin.to = l.pinTo.value), su(w3));
  for (let w4 of Fo(w3)) ls(w4);
  (Yr(w3), rn(), (l.curveChan.value = Fo(w3)[0]), uo(), (l.gaitPreset.value = ''), wt());
});
function of(w3, w4) {
  let w5 = tn(l.curveChan.value);
  if (w5?.kind !== 'aim' || An) {
    ((_a[w3] = w4), ea());
    return;
  }
  ($t(),
    (w5.aim[w3] = w4),
    Yr(w5),
    rn(),
    Fe[l.curveChan.value] || (l.curveChan.value = Fo(w5)[0]),
    uo(),
    (l.gaitPreset.value = ''),
    wt());
}
for (let [e, t, o] of [
  [l.aimDist, 'dist', (w3) => Math.max(+w3 || 1, 1) / 100],
  [l.aimAxis, 'axis', (w3) => w3],
  [l.aimRoll, 'roll', (w3) => w3],
  [l.aimUpAxis, 'upAxis', (w3) => w3],
  [l.aimUpDist, 'upDist', (w3) => Math.max(+w3 || 1, 1) / 100],
  [l.aimSpace, 'space', (w3) => w3],
])
  e.addEventListener('change', () => of(t, o(e.value)));
function nf() {
  let w3 = l.ctlKind.value,
    w4 = w3 === 'aim',
    w5 = w3 === 'pin',
    w6 = l.ctlPart.value;
  (l.ctlPart.replaceChildren(
    ...Object.entries(mt)
      .filter(([, w7]) => (w5 ? w7.pin : !w7.pin && (!w4 || w7.bones.length === 1)))
      .map(([w7, w8]) => new Option(w8.label, w7)),
  ),
    (l.ctlPart.value = [...l.ctlPart.options].some((w7) => w7.value === w6)
      ? w6
      : w5
        ? 'hand_l'
        : w4
          ? 'head'
          : 'chest'),
    w4 && Object.assign(_a, cu(l.ctlPart.value)),
    (An = w3 !== 'bone'),
    ce && ea());
}
(l.ctlKind.addEventListener('change', nf),
  l.ctlPart.addEventListener('change', () => {
    ((An = l.ctlKind.value !== 'bone'),
      l.ctlKind.value === 'aim' && Object.assign(_a, cu(l.ctlPart.value)),
      ce && ea());
  }),
  l.ctlPart.replaceChildren(
    ...Object.entries(mt)
      .filter(([, w3]) => !w3.pin)
      .map(([w3, w4]) => new Option(w4.label, w3)),
  ),
  (l.ctlPart.value = 'chest'),
  l.ctlBone.addEventListener('change', () => {
    let w3 = tn(l.curveChan.value);
    w3 && ((w3.show = +l.ctlBone.value), ss(w3), Vd(null));
  }));
for (let [e, t] of [
  [l.chLate, 'late'],
  [l.chAmt, 'amount'],
  [l.ctlStep, 'step'],
])
  e.addEventListener('change', () => {
    let w3 = +e.value,
      w4 = tf();
    if (!(!ce || !Number.isFinite(w3) || !w4.length)) {
      $t();
      for (let w5 of w4)
        (t !== 'step' || (tn(w5) && mt[tn(w5).part].bones.length > 1)) && (Ce[w5][t] = w3);
      ((l.gaitPreset.value = ''), wt());
    }
  });
(l.ctlAdd.addEventListener('click', () => Dd(l.ctlPart.value, l.ctlKind.value)),
  l.curveMirror.addEventListener('change', () => {
    let w3 = l.curveChan.value,
      w4 = Ce[w3],
      w5 = l.curveMirror.checked;
    if (($t(), Fe[w3].foot)) {
      for (let w6 of _o) (w5 || (Ce[w6].r = { keys: as(w6) }), (Ce[w6].mirror = w5));
    } else
      ((Ce[w3] = w5
        ? { ...w4, mirror: !0, keys: w4.keys.filter((w7) => nt(w7.u) < 0.5) }
        : { ...w4, mirror: !1, keys: pi(w4).map(({ of: w7, twin: w8, ...w9 }) => w9) }),
        Ce[w3].keys.length || Cn(w3));
    (uo(), wt());
  }),
  l.curveGrip.addEventListener('pointerdown', (w3) => {
    l.curveGrip.setPointerCapture(w3.pointerId);
  }),
  l.curveGrip.addEventListener('pointermove', (w3) => {
    w3.buttons &&
      (document.documentElement.style.setProperty(
        '--dock-h',
        Math.round(Math.min(Math.max(innerHeight - w3.clientY, 150), innerHeight * 0.75)) + 'px',
      ),
      ks());
  }),
  l.exSkeleton.add(new Option('ActionForge (ours)', 'default')));
for (let [e, t] of Object.entries(j)) l.exSkeleton.add(new Option(t.label, e));
for (let [e, t] of Object.entries(a)) l.exTarget.add(new Option(t.label, e));
l.exTarget.value = R;
function Zr() {
  let w3 = l.exSkeleton.value !== 'default';
  ((l.exMesh.disabled = w3),
    (l.exTarget.disabled = l.exFormat.value !== 'fbx'),
    (l.exRest.disabled = w3));
}
(l.exSkeleton.addEventListener('change', () => {
  (l.exSkeleton.value !== 'default' && (l.exFormat.value = 'fbx'), Zr());
}),
  l.exFormat.addEventListener('change', Zr),
  Zr());
var Su = (w3) =>
    w3
      .replace(/[^A-Za-z0-9_]+/g, '_')
      .replace(/_{2,}/g, '_')
      .replace(/^_+|_+$/g, ''),
  $u = (w3) =>
    Su(w3.replace(/^gait:(.*)$/, '$1_adjusted').replace(/^(mixamo:|mine:(user\.)?)/, '')) ||
    'cycle';
async function Tu(w3, { file: w4, ours: w5, origin: w6 }) {
  let w7 = l.exSkeleton.value,
    w8 = l.exFormat.value,
    w9 = l.exTarget.value,
    wk = l.exMotion.value,
    ww = l.exMesh.checked && !l.exMesh.disabled,
    wV = w3.map((we) => Object.assign(we.clip.clone(), { name: we.name }));
  wk === 'both' &&
    (wV = wV.concat(
      wV.map((we) => Object.assign(I(we, { rootName: 'root' }), { name: we.name + '_inplace' })),
    ));
  let wD = w5 ? p([w6], Mo.clips, { skeleton: w7 }) : null,
    wm = St,
    wS = () => {
      if (!wm) return dt();
      let we = vs();
      return (we.rig.removeFromParent(), we.rig.updateMatrixWorld(!0), we.rig);
    },
    wE = {
      withRig: ww,
      inPlace: wk === 'inplace',
      rootName: 'root',
      format: w8,
      fbxTarget: w9,
      skeleton: w7,
      assetRoot: $o,
      rigFile: wm ? null : (Mo.rigs?.human?.file ?? Mo.rig?.file ?? null),
      THREE: kD,
      provenance: wD,
      fitClip: wm?.fitter ? (we) => wm.fitter.fit(we) : null,
      custom: wm?.custom ?? null,
    },
    wF =
      ({
        ue5: '_ue5_manny',
        'ue5-quinn': '_ue5_quinn',
        ue4: '_ue4',
        reallusion: '_cc',
        mixamo: '_mixamo',
      }[w7] ?? (w8 === 'fbx' ? '_' + w9 : '')) +
      (wk === 'inplace' ? '_inplace' : '') +
      (ww ? '' : '_anim_only'),
    wC,
    wH;
  (l.exSplit.value === 'zip' && wV.length > 1
    ? (({ blob: wC } = await m({
        entries: wV.map((we) => ({ id: we.name, clip: we, name: '' + we.name + wF + '.' + w8 })),
        exportOne: (we) => c({ ...wE, rigRoot: wS(), clips: [we] }),
        onProgress: (we, wR) => {
          l.exNote.textContent = 'Packing ' + we + '/' + wR + '\u2026';
        },
      })),
      (wH = '' + w4 + wF + '.zip'))
    : ((wC = await c({ ...wE, rigRoot: wS(), clips: wV })), (wH = '' + w4 + wF + '.' + w8)),
    O(wC, wH),
    (l.exNote.textContent =
      'Saved ' +
      wH +
      ' \u2014 ' +
      wV.length +
      ' clip' +
      (wV.length === 1 ? '' : 's') +
      (wm ? ', on ' + wm.name : '') +
      ', ' +
      (wC.size / 1048576).toFixed(1) +
      ' MB.' +
      (w5 ? '' : ' No public-domain note inside: it did not all come from the library.')));
}
async function af() {
  let w3 = l.exSkeleton.value,
    w4 = l.exFormat.value,
    w5 = l.exTarget.value,
    w6 = St,
    w7 = w6
      ? (() => {
          let wD = vs();
          return (wD.rig.removeFromParent(), wD.rig.updateMatrixWorld(!0), wD.rig);
        })()
      : dt(),
    w8 = await c({
      rigRoot: w7,
      clips: [],
      restPose: !0,
      withRig: !0,
      rootName: 'root',
      format: w4,
      fbxTarget: w5,
      skeleton: w3,
      assetRoot: $o,
      rigFile: w6 ? null : (Mo.rigs?.human?.file ?? Mo.rig?.file ?? null),
      custom: w6?.custom ?? null,
      THREE: kD,
      provenance: w6 || w3 !== 'default' ? null : p([], Mo.clips, { skeleton: w3 }),
    }),
    w9 =
      {
        ue5: '_ue5_manny',
        'ue5-quinn': '_ue5_quinn',
        ue4: '_ue4',
        reallusion: '_cc',
        mixamo: '_mixamo',
      }[w3] ?? (w4 === 'fbx' ? '_' + w5 : ''),
    wk = w3 !== 'default',
    ww = wk ? (j[w3]?.label ?? w3) + "'s own character" : w6 ? w6.name : 'our mannequin',
    wV =
      (wk ? 'character' : Su(w6?.name ?? '') || 'actionforge_mannequin') +
      '_rest_pose' +
      w9 +
      '.' +
      w4;
  (O(w8, wV),
    (l.exNote.textContent =
      'Saved ' +
      wV +
      ' \u2014 ' +
      ww +
      ' alone, at rest, ' +
      (w8.size / 1048576).toFixed(1) +
      ' MB. Import it first; then the animations without the character.'));
}
l.exRest.addEventListener('click', async () => {
  ((l.exRest.disabled = !0), (l.exNote.textContent = 'Writing the character\u2026'));
  try {
    await af();
  } catch (w3) {
    (console.error(w3),
      (l.exNote.textContent = 'The character couldn\u2019t be written: ' + w3.message));
  }
  Zr();
});
async function rf() {
  await na();
  let { set: w3, baseId: w4, ours: w5, origin: w6 } = jt,
    w7 = $u(w4);
  await Tu(
    w3.map((w8) => ({ clip: w8.clip, name: w7 + '_' + w8.id })),
    { file: w7 + '_8way', ours: w5, origin: w6 },
  );
}
async function sf() {
  let w3 = l.source.value,
    w4 = ye.get(w3),
    w5 = w4.clip ?? (await oa(w3)),
    w6 = w4.generated ? w3.slice(4) : '',
    w7 = $u(w4.generated ? (jt?.baseId ?? ot) : w3) + (w6 ? '_' + w6 : ''),
    w8 = w4.generated ? (jt?.origin ?? ot) : (w4.origin ?? w3),
    w9 = !!ye.get(w8)?.file && !(w6 && !jt?.once && !jt?.travel && Ji(w6));
  await Tu([{ clip: w5, name: w7 }], { file: w7, ours: w9, origin: w8 });
}
for (let [e, t] of [
  [l.exGo, rf],
  [l.exOne, sf],
])
  e.addEventListener('click', async () => {
    ((e.disabled = !0),
      (l.exNote.textContent = 'Packing\u2026'),
      await new Promise((w3) => setTimeout(w3, 0)));
    try {
      await t();
    } catch (w3) {
      (console.error(w3), (l.exNote.textContent = 'The export failed: ' + w3.message));
    }
    e.disabled = !1;
  });
var lf = (w3) =>
    w3
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '') || 'animation',
  Jo = (w3, w4 = !1) => {
    ((l.saveNote.textContent = w3), (l.saveNote.className = w4 ? 'note bad' : 'note'));
  };
function Ou() {
  let w3 = ye.get(ot),
    w4 = ye.get(w3?.origin ?? ot),
    w5 = ta()
      ? w3?.origin
        ? 'adjusted'
        : ''
      : l.gaitPreset.value || l.styleList.value || (w3?.origin ? 'styled' : '');
  l.saveName.placeholder = w4 ? (w4.doc || !w5 ? w4.label : w4.label + ' \u2014 ' + w5) : 'a name';
}
var ms = () => l.saveName.value.trim() || l.saveName.placeholder;
for (let e of ['gaitPreset', 'styleList']) l[e].addEventListener('change', Ou);
async function Ru(w3, w4, w5, w6) {
  let w7 = y({ rig: La, clip: w4, clone: k9, THREE: kD }),
    w8 = { moved: w5.summary.stride > 0.05, distance: w5.summary.stride },
    w9 = {
      ...u(
        'user.lab_' + lf(w3),
        w3,
        w4,
        { mode: 'locomotion', travel: w8, from: 'Motion Lab', source: 'lab' },
        w7,
      ),
      lab: w6,
    };
  return (await k6(k4, w9), w9);
}
async function Fa() {
  let w3 = [],
    w4 = [];
  try {
    w3 = (await k5(k4)).filter((w6) => w6.source === 'lab');
  } catch (w6) {
    console.warn(w6);
  }
  try {
    w4 = await Un.list();
  } catch (w7) {
    console.warn(w7);
  }
  let w5 = (w8, w9) => {
    let wk = Object.assign(document.createElement('optgroup'), { label: w8 });
    return (wk.append(...w9.map(([ww, wV]) => new Option(wV, ww))), w9.length ? [wk] : []);
  };
  l.savedList.replaceChildren(
    new Option(w3.length + w4.length ? '(saved from here)' : '(nothing saved yet)', ''),
    ...w5(
      'Your animations',
      w3.map((w8) => ['clip:' + w8.id, w8.name]),
    ),
    ...w5(
      'Sets for the playground',
      w4.map((w8) => ['set:' + w8.id, w8.name]),
    ),
  );
}
var Or = () => {
  let w3 = ye.get(ot)?.origin ?? ot;
  return ye.get(w3)?.doc?.from ?? w3;
};
(l.saveOne.addEventListener('click', async () => {
  let w3 = l.source.value,
    w4 = ye.get(w3);
  if (w4) {
    l.saveOne.disabled = !0;
    try {
      let w5 = w4.clip ?? (await oa(w3)),
        w6 = w4.generated ? w3.slice(4) : '',
        w7 = w4.reading ?? Pr(w4, w5),
        w8 = ms() + (w6 ? ' ' + w6 : ''),
        w9 = w6
          ? { origin: Or(), dir: w6 }
          : w4.origin
            ? { origin: Or(), state: Pa() }
            : { origin: Or() },
        wk = await Ru(w8, w5, w7, w9);
      (Jo(
        'Saved \u201C' +
          wk.name +
          '\u201D with your animations. It is in the panel here under Yours, and on the main page under Yours (reload it, if it is open)' +
          (Yi ? ' \u2014 and in the playground\u2019s lists' : '') +
          '.',
      ),
        await Na(),
        await Fa());
    } catch (ww) {
      (console.error(ww), Jo('It couldn\u2019t be saved: ' + ww.message, !0));
    }
    l.saveOne.disabled = !1;
  }
}),
  l.saveEight.addEventListener('click', async () => {
    if (jt) {
      l.saveEight.disabled = !0;
      try {
        await na();
        let w3 = ms(),
          w4 = Or();
        for (let w5 of jt.set)
          await Ru(w3 + ' ' + w5.id, w5.clip, w5.reading, { origin: w4, dir: w5.id });
        (Jo(
          'Saved \u201C' +
            w3 +
            ' F\u201D to \u201C' +
            w3 +
            ' FR\u201D with your animations: eight of them. They are on the main page under Yours (reload it, if it is open)' +
            (Yi ? ', and in the playground\u2019s Jump list' : '') +
            '.',
        ),
          await Na(),
          await Fa());
      } catch (w6) {
        (console.error(w6), Jo('They couldn\u2019t be saved: ' + w6.message, !0));
      }
      l.saveEight.disabled = !1;
    }
  }),
  l.toPlay.addEventListener('click', async () => {
    if (jt)
      try {
        await na();
        let w3 = await Un.send(ms(), jt.set);
        (Jo(
          'Sent to the playground as \u201C' +
            w3.name +
            '\u201D: there, pick it under Walk, Run or Sprint.',
        ),
          await Fa());
      } catch (w4) {
        (console.error(w4), Jo('It couldn\u2019t be sent to the playground: ' + w4.message, !0));
      }
  }),
  l.savedRemove.addEventListener('click', async () => {
    let w3 = l.savedList.value,
      w4 = l.savedList.selectedOptions[0]?.textContent ?? '';
    if (!w3) {
      Jo('Pick what to remove in the list first.', !0);
      return;
    }
    try {
      if (w3.startsWith('clip:')) {
        let w5 = 'mine:' + w3.slice(5);
        ((ye.get(ot)?.origin ?? ot) === w5 &&
          (await Xi(ye.get(w5)?.doc?.from ?? [...ye.keys()][0])),
          await k7(k4, w3.slice(5)),
          ye.delete(w5),
          ye.delete('gait:' + w5),
          await Na());
      } else await Un.remove(w3.slice(4));
      (Jo('\u201C' + w4 + '\u201D is out of this browser.'), await Fa());
    } catch (w6) {
      (console.error(w6), Jo('It couldn\u2019t be removed: ' + w6.message, !0));
    }
  }),
  Fa());
var Ma = new kR();
go.add(Ma);
var Ic = '';
function cf(w3) {
  let w4 = !!w3 && l.polShapes.checked,
    w5 = +l.polScale.value || 1;
  if (((Ma.visible = w4), !w4)) return;
  let w6 = (w8) => w3.getObjectByName(w8).getWorldPosition(new kf()),
    w7 = [
      ...['l', 'r'].flatMap((w8) => [
        ['thigh_' + w8, 'calf_' + w8, Mn.thigh, 7068794],
        ['lowerarm_' + w8, 'hand_' + w8, Mn.forearm, 16765286],
        ['hand_' + w8, 'middle_01_' + w8, Mn.hand, 16765286],
      ]),
      ['thigh_l', 'thigh_r', Mn.hips, 7068794],
      ['spine_01', 'neck_01', Mn.trunk, 7068794],
    ];
  if (Ic !== String(w5)) {
    Ma.clear();
    for (let [w8, w9, wk, ww] of w7)
      Ma.add(
        new kq(
          new kJ(new kS(wk * w5, w6(w8).distanceTo(w6(w9)), 3, 10)),
          new kL({ color: ww, transparent: !0, opacity: 0.55 }),
        ),
      );
    Ic = String(w5);
  }
  w7.forEach(([wV, wD], wm) => {
    let wS = w6(wV),
      wE = w6(wD),
      wF = Ma.children[wm];
    (wF.position.copy(wS).add(wE).multiplyScalar(0.5),
      wF.quaternion.setFromUnitVectors(new kf(0, 1, 0), wE.sub(wS).normalize()));
  });
}
var Oa = D({
  root: l.libGrid,
  assetRoot: $o,
  groupOrder: dd,
  onSelect: (w3) =>
    Xi(w3).catch((w4) => {
      (console.error(w4), yt("That animation couldn't be used: " + w4.message, !0));
    }),
});
Oa.setGrouped(!0);
var Ra = 'anims',
  Br = { anims: '', chars: '' },
  gs = (w3, w4) => w3 + ' ' + w4 + (w3 === 1 ? '' : 's');
function ys() {
  let w3 = Oa.render({ clips: Tn });
  return (
    Oa.setActive(ye.get(ot)?.origin ?? ot),
    Ra === 'anims' && (l.libCount.textContent = gs(w3, 'animation')),
    w3
  );
}
async function Na() {
  let w3 = [];
  try {
    w3 = (await k5(k4)).filter((w6) => !Z(w6));
  } catch (w6) {
    console.warn(w6);
  }
  for (let w7 of Object.keys(Tn)) w7.startsWith('mine:') && delete Tn[w7];
  let w4 = (w8, w9) => {
      let wk = ye.get(w8);
      Tn[w8] = {
        label: w9.name || w9.id,
        icon: w9.thumb ?? null,
        category: 'Yours',
        loops: !wk.once,
        rootMotion: !wk.still,
        rootDistance: w9.info?.travel?.distance ?? 0,
        duration: w9.duration ?? 0,
      };
    },
    w5 = w3.filter((w8) => !w8.lab?.dir);
  for (let w8 of w5.filter((w9) => !w9.lab?.state)) {
    let w9 = 'mine:' + w8.id;
    if (!ye.has(w9)) {
      let wk = d(w8, kD);
      ye.set(w9, { label: w8.name || w8.id, record: w8, clip: wk, ...Hi(wk) });
    }
    (ye.get(w9).once && !Cr) || w4(w9, w8);
  }
  for (let ww of w5.filter((wV) => wV.lab?.state)) {
    let wV = 'mine:' + ww.id,
      wD = ww.lab.origin,
      wm = ye.get(wD),
      wS = !!wm && !wm.doc,
      wE = ye.get(wV);
    if (wS)
      ye.set(wV, {
        ...(wE?.doc ? wE : {}),
        label: ww.name || ww.id,
        record: ww,
        clip: wE?.doc ? wE.clip : null,
        once: wm.once,
        plain: wm.plain,
        still: wm.still,
        doc: { from: wD, state: ww.lab.state },
      });
    else {
      if (!wE) {
        let wF = d(ww, kD);
        ye.set(wV, { label: ww.name || ww.id, record: ww, clip: wF, ...Hi(wF) });
      }
    }
    (ye.get(wV).once && !Cr) || w4(wV, ww);
  }
  ys();
}
function ws(w3) {
  Ra = w3;
  for (let [w4, w5] of [
    [l.libAnims, w3 === 'anims'],
    [l.libChars, w3 === 'chars'],
  ])
    (w4.classList.toggle('is-on', w5), w4.setAttribute('aria-selected', String(w5)));
  ((l.libGrid.hidden = w3 !== 'anims'),
    (l.libCharGrid.hidden = w3 !== 'chars'),
    (l.libSearch.value = Br[w3]),
    (l.libSearch.placeholder =
      w3 === 'anims' ? 'Search name or tag\u2026' : 'Search characters\u2026'),
    w3 === 'anims' ? ys() : Va());
}
(l.libAnims.addEventListener('click', () => ws('anims')),
  l.libChars.addEventListener('click', () => ws('chars')),
  l.libSearch.addEventListener('input', () => {
    ((Br[Ra] = l.libSearch.value),
      Ra === 'anims' ? (l.libCount.textContent = gs(Oa.filter(Br.anims), 'animation')) : Va());
  }));
var zi = [],
  St = null,
  Aa = '',
  Li = 0,
  Ci = new Map(),
  Xo = (w3, w4, w5) => {
    let w6 = document.createElement(w3);
    return (w4 && (w6.className = w4), w5 != null && (w6.textContent = w5), w6);
  };
function Va() {
  let w3 = Br.chars.trim().toLowerCase(),
    w4 = 0,
    w5 = ({ ref: w8, name: w9, icon: wk, badge: ww, meta: wV, title: wD, onClick: wm }) => {
      if (w3 && !w9.toLowerCase().includes(w3)) return null;
      w4++;
      let wS = Xo('button', 'lib-tile lib-chartile' + (Aa === w8 ? ' is-active' : ''));
      if (
        ((wS.type = 'button'),
        (wS.title = wD || w9),
        wS.setAttribute('aria-pressed', String(Aa === w8)),
        wk)
      )
        wS.appendChild(
          Object.assign(Xo('img', 'lib-tile__media'), { src: wk, alt: '', loading: 'lazy' }),
        );
      else {
        let wF = Xo(
            'div',
            'lib-tile__media lib-tile__media--placeholder',
            w9
              .split(/[\s_-]+/)
              .map((wH) => wH[0] || '')
              .join('')
              .slice(0, 2)
              .toUpperCase(),
          ),
          wC = 0;
        for (let wH = 0; wH < w9.length; wH++) wC = (wC * 31 + w9.charCodeAt(wH)) % 360;
        (wF.style.setProperty('--tile-hue', String(wC)), wS.appendChild(wF));
      }
      ww &&
        wS.appendChild(
          Xo('span', 'lib-chartile__badge' + (ww === 'Own skeleton' ? ' is-own' : ''), ww),
        );
      let wE = Xo('div', 'lib-tile__body');
      return (
        wE.appendChild(Xo('span', 'lib-tile__name', w9)),
        wV && wE.appendChild(Xo('span', 'lib-tile__meta', wV)),
        wS.appendChild(wE),
        wS.addEventListener('click', wm),
        wS
      );
    },
    w6 = [],
    w7 = (w8, w9) => {
      let wk = w9.filter(Boolean);
      wk.length && w6.push(Xo('div', 'lib-chargrid__title', w8), ...wk);
    };
  return (
    w7('Characters', [
      w5({
        ref: '',
        name: 'Mannequin',
        icon: $o + '/icons/characters/mannequin.webp',
        title: 'Our mannequin',
        onClick: () => Rr(''),
      }),
      ...Object.entries(Mo.characters ?? {})
        .filter(([, w8]) => !w8.default)
        .map(([w8, w9]) =>
          w5({
            ref: 'o.' + w8,
            name: w9.label || w8,
            icon: w9.icon ? $o + '/' + w9.icon : null,
            badge: w9.skeleton ? 'Own skeleton' : null,
            title: [w9.note || 'An ActionForge character', w9.license]
              .filter(Boolean)
              .join(' \u00B7 '),
            onClick: () => Rr('o.' + w8),
          }),
        ),
    ]),
    w7(
      'Yours',
      zi.map((w8) =>
        w5({
          ref: w8.id,
          name: w8.name || w8.id,
          icon: w8.thumb || null,
          badge:
            w8.kind === 'unrigged' ? 'Needs rigging' : w8.kind === 'custom' ? 'Own skeleton' : null,
          meta: w8.heightCm ? w8.heightCm + ' cm' : null,
          title:
            w8.kind === 'unrigged'
              ? w8.name +
                ' \u2014 not rigged yet: it is rigged in the Character tool on the main page'
              : w8.name + ' \u2014 wear it',
          onClick: () =>
            w8.kind === 'unrigged'
              ? yt(
                  w8.name +
                    ' is not rigged yet: rig it in the Character tool on the main page, and it can be worn here.',
                  !0,
                )
              : Rr(w8.id),
        }),
      ),
    ),
    w6.push(
      Xo(
        'p',
        'lib-note',
        'A character is added, rigged and matched to our bones in the Character tool on the main page. It is then listed here.',
      ),
    ),
    l.libCharGrid.replaceChildren(...w6),
    Ra === 'chars' && (l.libCount.textContent = gs(w4, 'character')),
    w4
  );
}
async function Au() {
  try {
    zi = await f.list();
  } catch (w3) {
    (console.warn(w3), (zi = []));
  }
  Va();
}
async function uf(w3) {
  if (!Ci.has(w3)) {
    let w4 = await vc({
      ref: w3,
      manifest: Mo,
      assetRoot: $o,
      template: La,
      rigBytes: zc,
      parse: Ui,
    });
    (w4.rig.updateMatrixWorld(!0),
      (w4.rest = []),
      w4.rig.traverse((w5) => {
        (w5.isBone || w5 === w4.rig) &&
          w4.rest.push([w5, w5.position.clone(), w5.quaternion.clone(), w5.scale.clone()]);
      }),
      (w4.mixer = new kb(w4.rig)),
      w4.body.scale.setScalar(1 / (w4.fitter?.s ?? 1)),
      Ci.set(w3, w4));
  }
  return Ci.get(w3);
}
function df(w3) {
  St &&
    (w3.rig.traverse((w4) => {
      w4.isMesh && (w4.visible = !1);
    }),
    w3.holder.add(St.body),
    St.overlay && go.add(St.overlay),
    (w3.worn = St));
}
function vs() {
  let w3 = St.again(),
    w4 = [],
    w5 = [];
  (St.rig.traverse((w7) => w4.push(w7)), w3.rig.traverse((w7) => w5.push(w7)));
  let w6 = new Map(w4.map((w7, w8) => [w7, w5[w8]]));
  w3.rest = St.rest.map(([w7, w8, w9, wk]) => [w6.get(w7), w8, w9, wk]).filter(([w7]) => w7);
  for (let [w7, w8, w9, wk] of w3.rest)
    (w7.position.copy(w8), w7.quaternion.copy(w9), w7.scale.copy(wk));
  return w3;
}
function Lu(w3) {
  if (
    (w3.worn && (w3.worn.body.removeFromParent(), (w3.worn = null)),
    w3.rig.traverse((w4) => {
      w4.isMesh && (w4.visible = !0);
    }),
    !!St?.again)
  )
    try {
      let w4 = vs();
      ((w4.mixer = new kb(w4.rig)),
        w3.rig.traverse((w5) => {
          w5.isMesh && (w5.visible = !1);
        }),
        w3.holder.add(w4.body),
        (w3.worn = w4),
        Cu(w3, !1));
    } catch (w5) {
      (console.error(w5),
        w3.worn && (w3.worn.body.removeFromParent(), (w3.worn = null)),
        w3.rig.traverse((w6) => {
          w6.isMesh && (w6.visible = !0);
        }));
    }
}
function ff(w3, w4) {
  if (w3?.worn && w3.worn !== St) {
    (console.error(w4),
      w3.worn.body.removeFromParent(),
      (w3.worn = null),
      w3.rig.traverse((w6) => {
        w6.isMesh && (w6.visible = !0);
      }));
    return;
  }
  console.error(w4);
  let w5 = St?.name ?? 'The character';
  (St?.body.removeFromParent(),
    St?.overlay?.removeFromParent(),
    (St = null),
    (Aa = ''),
    w3 &&
      ((w3.worn = null),
      w3.rig.traverse((w6) => {
        w6.isMesh && (w6.visible = !0);
      })),
    Va(),
    yt(w5 + " couldn't play this, and was taken off: " + (w4?.message ?? w4), !0));
}
function Cu(w3, w4) {
  let w5 = w3.worn;
  try {
    (w5.mixer.stopAllAction(), w5.mixer.uncacheRoot(w5.rig));
    for (let [w7, w8, w9, wk] of w5.rest)
      (w7.position.copy(w8), w7.quaternion.copy(w9), w7.scale.copy(wk));
    let w6 = w5.fitter ? w5.fitter.fit(w3.clip) : w3.clip;
    ((w5.action = w5.mixer.clipAction(w4 ? w6 : I(w6, { rootName: 'root' }))), w5.action.play());
  } catch (ww) {
    ff(w3, ww);
  }
}
async function Rr(w3) {
  let w4 = ++Li;
  try {
    w3 && yt('Reading the character\u2026');
    let w5 = w3 ? await uf(w3) : null;
    if (w4 !== Li) return;
    (St?.body.removeFromParent(),
      St?.overlay?.removeFromParent(),
      (St = w5),
      (Aa = w3),
      Ta((w6) => {
        w6.who = w3;
      }),
      Va(),
      await Ln());
    for (let w6 of So) Lu(w6);
    St?.fitter &&
      yt(
        l.status.textContent +
          ' ' +
          St.name +
          ' is ' +
          St.fitter.s.toFixed(2) +
          "\u00D7 our size: shown at our mannequin's, the cycle fitted to its lengths.",
      );
  } catch (w7) {
    (console.error(w7),
      w4 === Li &&
        (Ta((w8) => {
          w8.who = Aa;
        }),
        yt("That character can't be worn here: " + (w7?.message ?? w7), !0)));
  }
}
(addEventListener('focus', () => {
  (Na(), Au());
}),
  ws('anims'),
  await Na(),
  await Au());
var en = !0,
  mn = 0;
(l.play.addEventListener('click', () => {
  ((en = !en), (l.play.textContent = en ? 'Pause' : 'Play'));
}),
  l.time.addEventListener('input', () => {
    ((en = !1), (l.play.textContent = 'Play'));
    let w3 = Qe?.action.getClip().duration ?? 1;
    mn = Math.floor(mn / w3) * w3 + +l.time.value * w3;
  }));
function ks() {
  let w3 = A('viewport'),
    w4 = Math.max(w3.clientWidth, 1),
    w5 = Math.max(w3.clientHeight, 1);
  (No.setSize(w4, w5), (gn.aspect = w4 / w5), gn.updateProjectionMatrix());
}
addEventListener('resize', ks);
new ResizeObserver(ks).observe(A('viewport'));
var Dc = performance.now();
function Pu(w3) {
  let w4 = Math.min(0.05, (w3 - Dc) / 1000);
  if (((Dc = w3), en && (mn += w4 * +l.rate.value), Qe)) {
    let w5 = Qe.action.getClip().duration,
      w6 = mn % w5;
    if (xo.visible) {
      for (let w7 of So) Pi(w7, mn);
    } else {
      let w8 = Pi(Qe, mn);
      if ((ld(Qe, w6 / w5), mu(), Qe.rootMotion)) {
        let w9 = new kf(w8.x, 0.8, w8.z).sub($n.target);
        ($n.target.add(w9), gn.position.add(w9));
      } else {
        let wk = Qe.reading,
          ww = qc(wk, w6, w5) + Math.floor(mn / w5) * wk.summary.stride;
        Ar.position
          .copy(wk.dir)
          .multiplyScalar(-(ww % 0.5))
          .setY(0.001);
      }
      (Zo.position.set(w8.x + 2, 4, w8.z + 1.5), Zo.target.position.set(w8.x, 0, w8.z));
    }
    (xo.visible &&
      (Ar.position.set(0, 0.001, 0), Zo.position.set(2, 6, 1.5), Zo.target.position.set(0, 0, 0)),
      en && (l.time.value = w6 / w5),
      (l.clock.textContent = w6.toFixed(2) + ' s'),
      hd(Qe.reading, w6 / w5));
  }
  (cf(Qe && !xo.visible ? Qe.rig : null),
    Wd(
      Qe && ce && !xo.visible && [ce.origin, 'gait:' + ce.origin].includes(l.source.value)
        ? +l.time.value
        : null,
    ),
    $n.update(),
    A('viewport').clientWidth > 0 && !document.hidden && No.render(go, gn),
    requestAnimationFrame(Pu));
}
ks();
{
  let e = hs();
  (e.last &&
    ye.has(e.last) &&
    Tn[e.last] &&
    !ye.get(e.last).generated &&
    !ye.get(e.last).origin &&
    ((ot = e.last), (On.value = ot), (On.textContent = ye.get(ot).label), (l.source.value = ot)),
    await Ln(),
    e.who && (await Rr(e.who)));
}
requestAnimationFrame(Pu);
