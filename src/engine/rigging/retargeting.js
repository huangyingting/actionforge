import { ga as V, ha as D } from '../animation/math.js';
function St(m) {
  let S = m?.groups ?? [],
    E = new Set(),
    F = !1;
  for (let c of S) {
    if (E.has(c.materialIndex)) {
      F = !0;
      break;
    }
    E.add(c.materialIndex);
  }
  if (!F) return S.length;
  let C = m.index,
    H = C ? C.count : m.attributes.position.count,
    R = (j) => (C ? C.getX(j) : j),
    l = new Map();
  for (let j of S) {
    l.has(j.materialIndex) || l.set(j.materialIndex, []);
    let z = l.get(j.materialIndex);
    for (let O = j.start, J = Math.min(H, j.start + j.count); O < J; O++) z.push(R(O));
  }
  let Q = [];
  m.clearGroups();
  for (let Z of [...l.keys()].sort((U, d) => U - d)) {
    let U = l.get(Z);
    m.addGroup(Q.length, U.length, Z);
    for (let d of U) Q.push(d);
  }
  return (m.setIndex(Q), m.groups.length);
}
function Tt(m) {
  let S = 0;
  return (
    m.traverse((r) => {
      if (!r.isMesh || !r.geometry?.attributes?.position) return;
      let E = r.geometry.groups.length;
      St(r.geometry) !== E && S++;
    }),
    S
  );
}
var ze = Symbol('part of one mesh');
function Rt(m) {
  let S = m?.parser?.associations,
    r = new Map();
  return (
    m?.scene?.traverse((E) => {
      if (!E.isMesh || !E.geometry) return;
      delete E.geometry.userData[ze];
      let F = S?.get(E),
        C = E.parent;
      F?.primitives === void 0 ||
        !C ||
        C.isMesh ||
        S.get(C)?.meshes !== F.meshes ||
        (r.has(C) || r.set(C, { name: C.name }), (E.geometry.userData[ze] = r.get(C)));
    }),
    r.size
  );
}
function Wt(m) {
  let S = m[0],
    r = (E, F) =>
      E.elements.every((C, s) => Math.abs(C - F.elements[s]) <= 1e-9 * Math.max(1, Math.abs(C)));
  return new Set(m.map((E) => E.geometry)).size !== m.length
    ? !1
    : m.every(
        (E) =>
          E.parent &&
          E.parent === S.parent &&
          !E.children.length &&
          !Array.isArray(E.material) &&
          !!E.isSkinnedMesh == !!S.isSkinnedMesh &&
          E.position.equals(S.position) &&
          E.quaternion.equals(S.quaternion) &&
          E.scale.equals(S.scale) &&
          (!E.isSkinnedMesh ||
            (E.bindMode === S.bindMode &&
              r(E.bindMatrix, S.bindMatrix) &&
              E.skeleton.bones.length === S.skeleton.bones.length &&
              E.skeleton.bones.every((F, C) => F === S.skeleton.bones[C]) &&
              E.skeleton.boneInverses.every((F, C) => r(F, S.skeleton.boneInverses[C])))),
      );
}
function De(m) {
  return m.isInterleavedBufferAttribute
    ? { array: m.data.array, stride: m.data.stride, offset: m.offset }
    : { array: m.array, stride: m.itemSize, offset: 0 };
}
function It(m, S) {
  let E = m[0],
    F = Object.keys(E.attributes),
    C = Object.keys(E.morphAttributes ?? {}),
    H = (O) => O.morphAttributes ?? {},
    R = (O, J) =>
      O &&
      O.itemSize === J.itemSize &&
      O.normalized === J.normalized &&
      De(O).array.constructor === De(J).array.constructor;
  for (let O of m)
    if (
      Object.keys(O.attributes).length !== F.length ||
      Object.keys(H(O)).length !== C.length ||
      !!O.morphTargetsRelative != !!E.morphTargetsRelative ||
      !F.every((J) => R(O.attributes[J], E.attributes[J])) ||
      !C.every(
        (J) =>
          H(O)[J]?.length === E.morphAttributes[J].length &&
          H(O)[J].every((Z, U) => R(Z, E.morphAttributes[J][U])),
      )
    )
      return null;
  let l = m.every(
      (J) =>
        J.index &&
        F.every((Z) => J.attributes[Z] === E.attributes[Z]) &&
        C.every((Z) => J.morphAttributes[Z].every((U, K) => U === E.morphAttributes[Z][K])),
    ),
    Q = (J) => {
      let Z = J[0].itemSize,
        U = new (De(J[0])['array']['constructor'])(J.reduce((A, X) => A + X.count, 0) * Z),
        K = 0;
      for (let A of J) {
        let X = De(A);
        for (let L = 0; L < A.count; L++)
          for (let b = 0; b < Z; b++) U[K++] = X.array[L * X.stride + X.offset + b];
      }
      let T = new S.BufferAttribute(U, Z, J[0].normalized);
      return (
        J[0].name && (T.name = J[0].name),
        J[0].gpuType !== void 0 && (T.gpuType = J[0].gpuType),
        T
      );
    },
    c = new S['BufferGeomet' + 'ry']();
  ((c.name = E.name),
    (c.userData = { ...E.userData }),
    delete c.userData[ze],
    (c.morphTargetsRelative = E.morphTargetsRelative));
  for (let J of F) c.setAttribute(J, l ? E.attributes[J] : Q(m.map((Z) => Z.attributes[J])));
  for (let Z of C)
    c.morphAttributes[Z] = E.morphAttributes[Z].map((U, d) =>
      l ? U : Q(m.map((K) => K.morphAttributes[Z][d])),
    );
  let j = [],
    z = 0;
  return (
    m.forEach((U, K) => {
      let T = U.index ? U.index.count : U.attributes.position.count;
      c.addGroup(j.length, T, K);
      for (let A = 0; A < T; A++) j.push(z + (U.index ? U.index.getX(A) : A));
      l || (z += U.attributes.position.count);
    }),
    c.setIndex(
      new S['BufferAttrib' + 'ute'](
        c.attributes.position.count > 65535 ? Uint32Array.from(j) : Uint16Array.from(j),
        1,
      ),
    ),
    c
  );
}
function Ht(m, S) {
  let E = new Map();
  m.traverse((C) => {
    let H = C.isMesh && C.geometry?.userData?.[ze];
    H && (E.has(H) || E.set(H, []), E.get(H).push(C));
  });
  let F = 0;
  for (let [C, H] of E) {
    if (H.length < 2 || !Wt(H)) continue;
    let R = It(
      H.map((j) => j.geometry),
      S,
    );
    if (!R) continue;
    let l = H[0],
      Q = H.map((j) => j.material),
      c = l.isSkinnedMesh ? new S['SkinnedMesh'](R, Q) : new S['Mesh'](R, Q);
    ((c.name = C.name || l.name),
      (c.userData = { ...l.userData }),
      c.position.copy(l.position),
      c.quaternion.copy(l.quaternion),
      c.scale.copy(l.scale));
    for (let j of ['visible', 'castShadow', 'receiveShadow', 'frustumCulled', 'renderOrder'])
      c[j] = l[j];
    (l.morphTargetInfluences &&
      ((c.morphTargetInfluences = l.morphTargetInfluences.slice()),
      (c.morphTargetDictionary = { ...l.morphTargetDictionary })),
      l.parent.add(c),
      l.isSkinnedMesh && ((c.bindMode = l.bindMode), c.bind(l.skeleton, l.bindMatrix)));
    for (let z of H) z.removeFromParent();
    F++;
  }
  return F;
}
var it = 15,
  Ft = [0, 0, 0, 1],
  Bt = (m) => [0, Math.sin(m / 2), 0, Math.cos(m / 2)];
function Pt(m, S) {
  let [E, F, C, H] = m,
    [R, l, Q] = S,
    c = 2 * (F * Q - C * l),
    j = 2 * (C * R - E * Q),
    z = 2 * (E * l - F * R);
  return [R + H * c + (F * z - C * j), l + H * j + (C * c - E * z), Q + H * z + (E * j - F * c)];
}
var ct = (m) => {
    let S = m.lastIndexOf('.');
    return S < 0 ? [m, ''] : [m.slice(0, S), m.slice(S + 1)];
  },
  at = (m, S, r) =>
    m.tracks.find((E) => {
      let [F, C] = ct(E.name);
      return F === S && C === r;
    }) ?? null;
function Ue(m, S) {
  let r = m.createInterpolant();
  return Array.from(S, (E) => Array.from(r.evaluate(E)));
}
function lt(m, { rootName: S = 'root', hipsName: E = 'pelvis', rootRest: F = null } = {}) {
  let C = at(m, E, 'quaternion');
  if (!C || C.times.length < 2) return null;
  let H = Array.from(C.times),
    R = at(m, S, 'quaternion'),
    l = R ? Ue(R, H) : H.map(() => [...(F ?? Ft)]),
    Q = Ue(C, H).map((j, z) => V(l[z], j)),
    c = [0];
  for (let j = 1; j < Q.length; j++) {
    let z = V(Q[j], D(Q[j - 1]));
    (z[3] < 0 && (z = z.map((O) => -O)), c.push(c[j - 1] + 2 * Math.atan2(z[1], z[3])));
  }
  return { times: H, turn: c, root: l };
}
function tn(m, S = {}) {
  let r = lt(m, S);
  return !!r && (Math.abs(r.turn[r.turn.length - 1]) * 180) / Math.PI >= (S.from ?? it);
}
function nn(
  m,
  {
    rootName: S = 'root',
    hipsName: E = 'pelvis',
    children: F = null,
    from: C = it,
    rootRest: H = null,
  } = {},
) {
  let R = lt(m, { rootName: S, hipsName: E, rootRest: H });
  if (!R) return m;
  let { times: l, turn: Q, root: c } = R;
  if ((Math.abs(Q[Q.length - 1]) * 180) / Math.PI < C) return m;
  let j = H ? [...H] : c[0],
    z = c.map((Z, U) => V(V(D(j), Bt(-Q[U])), Z)),
    O = new Set(F?.length ? F : [E]),
    J = m.clone();
  return (
    (J.tracks = J.tracks.map((Z) => {
      let [U, K] = ct(Z.name);
      return U === S && K === 'quaternion'
        ? new Z.constructor(
            Z.name,
            l,
            l.flatMap(() => j),
          )
        : O.has(U)
          ? K === 'quaternion'
            ? new Z.constructor(
                Z.name,
                l,
                Ue(Z, l).flatMap((T, A) => V(z[A], T)),
              )
            : K === 'position'
              ? new Z.constructor(
                  Z.name,
                  l,
                  Ue(Z, l).flatMap((T, A) => Pt(z[A], T)),
                )
              : Z
          : Z;
    })),
    J
  );
}
var He = { r: 'ik_hand_r', l: 'socket_offhand_grip' },
  ut = [
    { follower: 'ik_hand_gun', hand: 'hand_r' },
    { follower: 'socket_offhand', hand: 'hand_l' },
  ],
  rn = 'r';
function ft(m, S) {
  let r = null;
  return (
    m.traverse((E) => {
      !r && E.name === S && (r = E);
    }),
    r
  );
}
function sn(m) {
  return { l: ft(m, He.l), r: ft(m, He.r) };
}
function an(m, S, E) {
  if (!m || !S) return null;
  let F = new E['Group']();
  F.name = '__prop__';
  let C = null;
  if (
    (S.traverse((s) => {
      !C && s.name === 'grip' && (C = s);
    }),
    C)
  ) {
    S.updateMatrixWorld(!0);
    let s = new E['Vector3']();
    (C.getWorldPosition(s), S.worldToLocal(s), S.position.sub(s));
  }
  return (F.add(S), m.add(F), F);
}
function cn(m, S) {
  !m || !S || m.remove(S);
}
function ln(m, S, E = () => !1, F = () => null) {
  let C = (J) => {
      let Z = null;
      return (
        m.traverse((U) => {
          !Z && U.name === J && (Z = U);
        }),
        Z
      );
    },
    H = ut.map(({ follower: J, hand: Z }) => [C(J), C(Z)]).filter(([J, Z]) => J && Z && J.parent);
  if (!H.length) return () => {};
  let R = ut
      .map(({ hand: J }, Z) => {
        let U = C(He[Z === 0 ? 'r' : 'l']),
          d = C(J);
        return !U?.parent || !d ? null : { grip: U, hand: d, ref: null };
      })
      .filter(Boolean),
    l = new S['Matrix4'](),
    Q = new S['Matrix4'](),
    c = new S.Vector3(),
    j = new S['Quaternion'](),
    z = new S['Vector3']();
  O.setReference = function () {
    m.updateMatrixWorld(!0);
    let J = 0;
    for (let Z of R)
      ((Z.ref = new S['Matrix4']().copy(Z.hand.matrixWorld).invert().multiply(Z.grip.matrixWorld)),
        J++);
    return J;
  };
  function O() {
    m.updateMatrixWorld(!0);
    for (let [Z, U] of H)
      E(Z.name) ||
        (l.copy(Z.parent.matrixWorld).invert(),
        Q.multiplyMatrices(l, U.matrixWorld),
        Q.decompose(c, j, z),
        Z.position.copy(c),
        Z.quaternion.copy(j),
        Z.updateMatrixWorld(!0));
    let J = F();
    if (J) {
      for (let { grip: K, hand: T, ref: A } of R)
        A &&
          (J.has(K.name) ||
            E(K.name) ||
            (Q.multiplyMatrices(T.matrixWorld, A),
            l.copy(K.parent.matrixWorld).invert(),
            Q.premultiply(l),
            Q.decompose(c, j, z),
            K.position.copy(c),
            K.quaternion.copy(j),
            K.updateMatrixWorld(!0)));
    }
  }
  return O;
}
function un(m) {
  return m
    ? ['r', 'l']
        .filter((S) => m[S])
        .filter((S) => !String(m[S]).startsWith('drop:'))
        .map((S) => S + ':' + m[S])
        .join(',')
    : '';
}
function fn(m) {
  let S = { l: null, r: null };
  for (let r of String(m || '')
    .split(',')
    .filter(Boolean)) {
    let E = r.indexOf(':');
    if (E < 0) continue;
    let F = r.slice(0, E);
    (F === 'l' || F === 'r') && (S[F] = r.slice(E + 1) || null);
  }
  return S;
}
function hn({
  clip: Z,
  sourceRoot: k0,
  targetRoot: k1,
  map: k2,
  THREE: k3,
  fps: k4 = 30,
  hip: k5 = null,
  root: k6 = null,
  travelScale: k7 = 1,
  name: k8 = null,
  restAlign: k9 = null,
  local: kk = null,
  chains: kw = null,
  twists: kV = null,
  mix: kD = null,
  keyed: km = null,
  footIk: kS = null,
}) {
  let kr = kD?.chest ?? 1,
    kE = kD?.spine ?? 1,
    kF = kD?.twist ?? 1,
    kC = (kM) => {
      let w0 = new Map();
      return (
        kM.traverse((w1) => {
          w1.isBone && !w0.has(w1.name) && w0.set(w1.name, w1);
        }),
        w0
      );
    },
    kt = kC(k0),
    ks = kC(k1);
  (k0.updateMatrixWorld(!0), k1.updateMatrixWorld(!0));
  let kH = new Map();
  for (let [kM, w0] of kt) kH.set(kM, w0.getWorldQuaternion(new k3['Quaternion']()));
  let ka = new Map(),
    kR = new Map(),
    kl = new Map();
  for (let [w1, w2] of ks)
    (ka.set(w1, w2.getWorldQuaternion(new k3.Quaternion())),
      kR.set(w1, w2.quaternion.clone()),
      w2.parent &&
        !w2.parent.isBone &&
        kl.set(w1, w2.parent.getWorldQuaternion(new k3['Quaternion']())));
  let kQ = [...ks.values()].sort((w3, w4) => pt(w3) - pt(w4)),
    kc = new Map();
  for (let [w3, w4] of Object.entries(k2)) kt.has(w3) && ks.has(w4) && kc.set(w4, w3);
  let kj = new Map();
  for (let w5 of kw ?? []) {
    let w6 = w5.source.filter((ww) => kt.has(ww)),
      w7 = w5.target.filter((ww) => ks.has(ww));
    if (!w6.length || w7.length < 2) continue;
    let w8 = (ww, wV) => {
        let wD = wV.map((wr) => ww.get(wr).getWorldPosition(new k3.Vector3())),
          wm = [0];
        for (let wr = 1; wr < wD.length; wr++) wm.push(wm[wr - 1] + wD[wr].distanceTo(wD[wr - 1]));
        let wS = wm[wm.length - 1] || 1;
        return wm.map((wE) => wE / wS);
      },
      w9 = w8(kt, w6),
      wk = w8(ks, w7);
    w7.forEach((ww, wV) => {
      let wD = 0;
      for (; wD < w9.length - 2 && w9[wD + 1] < wk[wV];) wD++;
      let wm = Math.min(wD + 1, w6.length - 1),
        wS = w9[wm] - w9[wD];
      kj.set(ww, {
        a: w6[wD],
        b: w6[wm],
        t: wS > 1e-9 ? Math.min(1, Math.max(0, (wk[wV] - w9[wD]) / wS)) : 0,
      });
    });
  }
  let kz = [];
  for (let ww of kV ?? []) {
    let wV = ks.get(ww.bone),
      wD = ks.get(ww.parent),
      wm = ks.get(ww.child);
    if (!wV || !wD || !wm || wV.parent !== wD || (ww.driver && !ks.has(ww.driver))) continue;
    let wS = wm.position.clone().normalize(),
      wr = wm.position.length() || 1,
      wE = Math.min(1, Math.max(0, wV.position.dot(wS) / wr)),
      wF = (ww.driver ? wE : -(1 - wE)) * (ww.share ?? 1) * kF;
    kz.push({ ...ww, axis: wS, w: wF });
  }
  let kp = new k3['AnimationMix' + 'er'](k0);
  kp.clipAction(Z).play();
  let kO = Math.max(2, Math.round(Z.duration * k4) + 1),
    kf = new Float32Array(kO),
    kJ = new Map();
  for (let wC of kc.keys()) kJ.set(wC, new Float32Array(kO * 4));
  for (let ws of kj.keys()) kJ.has(ws) || kJ.set(ws, new Float32Array(kO * 4));
  for (let wH of kz) kJ.set(wH.bone, new Float32Array(kO * 4));
  for (let wa of km ?? []) ks.has(wa) && !kJ.has(wa) && kJ.set(wa, new Float32Array(kO * 4));
  let kZ = k5 ? k2[k5] : null,
    kU = kZ ? new Float32Array(kO * 3) : null,
    ku = k6 && k2[k6] && ks.has(k2[k6]) && kt.has(k6) ? k2[k6] : null,
    kd = ku ? new Float32Array(kO * 3) : null,
    kK = ku ? kt.get(k6).getWorldPosition(new k3['Vector3']()) : null,
    kT = ku ? ks.get(ku) : null,
    kA = kT ? kT.position.clone() : null,
    kn = kT ? (kT.parent?.matrixWorld.clone() ?? new k3['Matrix4']()) : null,
    ko = kT
      ? (kT.parent?.getWorldQuaternion(new k3['Quaternion']()).invert() ?? new k3['Quaternion']())
      : null,
    kX = ku && kZ && ks.get(kZ)?.parent === kT,
    kL = kX ? ks.get(kZ).getWorldPosition(new k3['Vector3']()) : null,
    kb = new k3['Matrix4'](),
    kx = new k3['Quaternion'](),
    ky = new k3['Vector3'](1, 1, 1),
    kW = k5 && kt.has(k5) ? kt.get(k5).getWorldPosition(new k3['Vector3']()) : null,
    kq = [];
  for (let wR of kS ?? []) {
    let wl = ks.get(wR.foot),
      wQ = wl?.parent,
      wc = wQ?.parent;
    if (
      !wl ||
      !wQ?.isBone ||
      !wc?.isBone ||
      !kt.has(wR.sourceFoot) ||
      ![wc, wQ, wl].every((wz) => kJ.has(wz.name))
    )
      continue;
    let wj = [];
    for (let wz = wl; wz?.isBone; wz = wz.parent) wj.unshift(wz);
    kq.push({
      foot: wl,
      calf: wQ,
      thigh: wc,
      chain: wj,
      weight: wR.weight ?? 1,
      base: wj[0].parent ? wj[0].parent.matrixWorld.clone() : new k3['Matrix4'](),
      footRest: wl.getWorldPosition(new k3['Vector3']()),
      src: kt.get(wR.sourceFoot),
      srcRest: kt.get(wR.sourceFoot).getWorldPosition(new k3['Vector3']()),
      bend: null,
    });
  }
  let kP = kZ && ks.has(kZ) ? ks.get(kZ).position.clone() : null,
    kY =
      kZ && ks.has(kZ)
        ? (ks.get(kZ).parent?.getWorldQuaternion(new k3['Quaternion']()).invert() ??
          new k3['Quaternion']())
        : null,
    kv = new k3['Quaternion'](),
    kB = new k3['Quaternion'](),
    kG = new k3['Quaternion'](),
    kg = new k3['Quaternion'](),
    kI = new k3['Vector3'](),
    kh = new Map();
  for (let wp = 0; wp < kO; wp++) {
    let wO = (wp / (kO - 1)) * Z.duration;
    ((kf[wp] = wO),
      kp.setTime(Math.min(wO, Z.duration - 0.000001)),
      k0.updateMatrixWorld(!0),
      kh.clear());
    for (let wf of kQ) {
      let wJ = wf.parent,
        wZ =
          wJ && kh.has(wJ.name)
            ? kh.get(wJ.name)
            : wJ?.isBone
              ? ka.get(wJ.name)
              : (kl.get(wf.name) ?? null),
        wU = kj.get(wf.name);
      if (wU) {
        let wT = kt
            .get(wU.a)
            .getWorldQuaternion(new k3['Quaternion']())
            .multiply(ae(kH.get(wU.a), k3)),
          wA = kt
            .get(wU.b)
            .getWorldQuaternion(new k3['Quaternion']())
            .multiply(ae(kH.get(wU.b), k3));
        if ((kv.copy(wT).slerp(wA, wU.t), kE < 1)) {
          let wo = kc.get(wf.name),
            wX = wo
              ? kt
                  .get(wo)
                  .getWorldQuaternion(new k3['Quaternion']())
                  .multiply(ae(kH.get(wo), k3))
              : (wZ ?? Ie(k3))
                  .clone()
                  .multiply(kR.get(wf.name))
                  .multiply(ae(ka.get(wf.name), k3));
          kv.copy(wX.slerp(kv, kE));
        }
        (kB.copy(kv),
          k9?.has(wf.name) && kB.multiply(k9.get(wf.name)),
          kB.multiply(ka.get(wf.name)),
          kh.set(wf.name, kB.clone()),
          kG.copy(wZ ?? Ie(k3)).invert(),
          kG.multiply(kB).toArray(kJ.get(wf.name), wp * 4));
        continue;
      }
      let wu = kc.get(wf.name);
      if (!wu) {
        let wL = kg.copy(wZ ?? Ie(k3)).multiply(kR.get(wf.name));
        (kh.set(wf.name, wL.clone()),
          kJ.has(wf.name) && kR.get(wf.name).toArray(kJ.get(wf.name), wp * 4));
        continue;
      }
      let wd = kt.get(wu).getWorldQuaternion(kg),
        wK = kk?.get(wf.name);
      if (wK && kh.has(wK.anchor) && kt.has(wK.sourceAnchor)) {
        let wb = kt
            .get(wK.sourceAnchor)
            .getWorldQuaternion(new k3['Quaternion']())
            .multiply(ae(kH.get(wK.sourceAnchor), k3)),
          wx = wd.clone().multiply(ae(kH.get(wu), k3)),
          wy = kh.get(wK.anchor).clone().multiply(ae(wK.anchorRest, k3));
        (kB
          .copy(wy)
          .multiply(wK.C)
          .multiply(wb.invert())
          .multiply(wx)
          .multiply(ae(wK.C, k3))
          .multiply(wK.rest),
          kr < 1 &&
            (kv.copy(wd).multiply(ae(kH.get(wu), k3)),
            k9?.has(wf.name) && kv.multiply(k9.get(wf.name)),
            kv.multiply(ka.get(wf.name)),
            kB.copy(kv.slerp(kB, kr))));
      } else
        (kv.copy(wd).multiply(ae(kH.get(wu), k3)),
          kB.copy(kv),
          k9?.has(wf.name) && kB.multiply(k9.get(wf.name)),
          kB.multiply(ka.get(wf.name)));
      (kh.set(wf.name, kB.clone()),
        kG.copy(wZ ?? Ie(k3)).invert(),
        kG.multiply(kB).toArray(kJ.get(wf.name), wp * 4));
    }
    for (let wW of kz) {
      let wq = kh.get(wW.parent);
      if (!wq) continue;
      let wP;
      if (wW.driver)
        wP = wq
          .clone()
          .invert()
          .multiply(kh.get(wW.driver))
          .multiply(ae(kR.get(wW.driver), k3));
      else {
        let wY = kh.get(ks.get(wW.parent).parent?.name) ?? kl.get(wW.parent) ?? Ie(k3);
        wP = ae(kR.get(wW.parent), k3).clone().multiply(wY.clone().invert().multiply(wq));
      }
      new k3.Quaternion()
        .setFromAxisAngle(wW.axis, wW.w * Vt(wP, wW.axis))
        .multiply(kR.get(wW.bone))
        .toArray(kJ.get(wW.bone), wp * 4);
    }
    (kd &&
      (kt.get(k6).getWorldPosition(kI).sub(kK).multiplyScalar(k7).applyQuaternion(ko).add(kA),
      kI.toArray(kd, wp * 3)),
      kU && kW && kP && kX
        ? (kx.fromArray(kJ.get(ku) ?? kR.get(ku).toArray(), kJ.has(ku) ? wp * 4 : 0),
          kb
            .compose(new k3['Vector3']().fromArray(kd, wp * 3), kx, ky)
            .premultiply(kn)
            .invert(),
          kt.get(k5).getWorldPosition(kI).sub(kW).multiplyScalar(k7).add(kL).applyMatrix4(kb),
          kI.toArray(kU, wp * 3))
        : kU &&
          kW &&
          kP &&
          (kt.get(k5).getWorldPosition(kI).sub(kW).multiplyScalar(k7).applyQuaternion(kY).add(kP),
          kI.toArray(kU, wp * 3)));
    for (let wv of kq) kN(wv, wp);
  }
  function kN(wB, wG) {
    let wg = new Map(),
      wI = wB.base;
    for (let VE of wB.chain) {
      let VF = kJ.has(VE.name)
          ? new k3['Quaternion']().fromArray(kJ.get(VE.name), wG * 4)
          : kR.get(VE.name),
        VC =
          VE.name === kZ && kU
            ? new k3['Vector3']().fromArray(kU, wG * 3)
            : VE.name === ku && kd
              ? new k3['Vector3']().fromArray(kd, wG * 3)
              : VE.position;
      ((wI = wI.clone().multiply(new k3.Matrix4().compose(VC, VF, VE.scale))), wg.set(VE.name, wI));
    }
    let wh = (Vs) => new k3.Vector3().setFromMatrixPosition(wg.get(Vs)),
      wN = (Vs) => {
        let VH = new k3['Quaternion']();
        return (wg.get(Vs).decompose(new k3.Vector3(), VH, new k3['Vector3']()), VH);
      },
      wi = wh(wB.thigh.name),
      wM = wh(wB.calf.name),
      V0 = wh(wB.foot.name),
      V1 = wB.src
        .getWorldPosition(new k3.Vector3())
        .sub(wB.srcRest)
        .multiplyScalar(k7)
        .add(wB.footRest);
    wB.weight < 1 && V1.lerp(V0, 1 - wB.weight);
    let V2 = wM.distanceTo(wi),
      V3 = V0.distanceTo(wM),
      V4 = V1.clone().sub(wi),
      V5 = Math.min(Math.max(V4.length(), Math.abs(V2 - V3) + 0.00001), V2 + V3 - 0.00001),
      V6 = V4.normalize(),
      V7 = wM.clone().sub(wi);
    (V7.sub(V6.clone().multiplyScalar(V7.dot(V6))),
      V7.lengthSq() < (0.02 * V2) ** 2 &&
        (V7 = wB.bend ? wB.bend.clone() : new k3['Vector3'](0, 0, 1)),
      V7.sub(V6.clone().multiplyScalar(V7.dot(V6))).normalize(),
      (wB.bend = V7.clone()));
    let V8 = Math.min(1, Math.max(-1, (V2 * V2 + V5 * V5 - V3 * V3) / (2 * V2 * V5))),
      V9 = wi
        .clone()
        .addScaledVector(V6, V2 * V8)
        .addScaledVector(V7, V2 * Math.sqrt(1 - V8 * V8)),
      Vk = wi.clone().addScaledVector(V6, V5),
      Vw = new k3.Quaternion().setFromUnitVectors(
        wM.clone().sub(wi).normalize(),
        V9.clone().sub(wi).normalize(),
      ),
      VV = V0.clone().sub(wM).applyQuaternion(Vw).normalize(),
      VD = new k3.Quaternion().setFromUnitVectors(VV, Vk.clone().sub(V9).normalize()),
      Vm = Vw.clone().multiply(wN(wB.thigh.name)),
      VS = VD.clone().multiply(Vw).multiply(wN(wB.calf.name)),
      Vr = wN(wB.foot.name);
    (wN(wB.thigh.parent.name)
      .invert()
      .multiply(Vm)
      .toArray(kJ.get(wB.thigh.name), wG * 4),
      Vm.clone()
        .invert()
        .multiply(VS)
        .toArray(kJ.get(wB.calf.name), wG * 4),
      VS.clone()
        .invert()
        .multiply(Vr)
        .toArray(kJ.get(wB.foot.name), wG * 4));
  }
  let ki = [];
  for (let [wB, wG] of kJ)
    ki.push(new k3['QuaternionKe' + 'yframeTrack'](wB + '.quaternion', kf, Qt(wG)));
  return (
    kU && ki.push(new k3['VectorKeyfra' + 'meTrack'](kZ + '.position', kf, kU)),
    kd && ki.push(new k3['VectorKeyfra' + 'meTrack'](ku + '.position', kf, kd)),
    kp.stopAllAction(),
    kp.uncacheRoot(k0),
    new k3['AnimationCli' + 'p'](k8 ?? Z.name + '_retarget', Z.duration, ki)
  );
}
function mn({ sourceRoot: m, targetRoot: S, bones: E, THREE: F }) {
  let C = (j, z) => {
      let O = null;
      return (
        j.traverse((J) => {
          !O && J.name === z && (O = J);
        }),
        O
      );
    },
    H = (j, z) => {
      let O = C(j, z);
      if (!O) throw new Error('measureProportion: no bone "' + z + '"');
      return O.getWorldPosition(new F['Vector3']()).y;
    };
  (m.updateMatrixWorld(!0), S.updateMatrixWorld(!0));
  let R = Math.abs(H(m, E.sourceHip) - H(m, E.sourceAnkle)),
    l = Math.abs(H(S, E.targetHip) - H(S, E.targetAnkle));
  if (R < 1e-9) throw new Error('measureProportion: source leg has no length');
  let Q = l / R,
    c = E.units ?? 1;
  return { scale: Q, proportion: Q / c, source: R, target: l };
}
var pt = (m) => {
    let S = 0,
      r = m.parent;
    for (; r;) (S++, (r = r.parent));
    return S;
  },
  Ot = null,
  Ie = (m) => (Ot ??= new m['Quaternion']()),
  ht = new WeakMap();
function Qt(m) {
  for (let S = 4; S + 3 < m.length; S += 4)
    m[S] * m[S - 4] + m[S + 1] * m[S - 3] + m[S + 2] * m[S - 2] + m[S + 3] * m[S - 1] < 0 &&
      ((m[S] = -m[S]), (m[S + 1] = -m[S + 1]), (m[S + 2] = -m[S + 2]), (m[S + 3] = -m[S + 3]));
  return m;
}
function Vt(m, S) {
  let r = 2 * Math.atan2(m.x * S.x + m.y * S.y + m.z * S.z, m.w);
  return (r > Math.PI && (r -= 2 * Math.PI), r < -Math.PI && (r += 2 * Math.PI), r);
}
function ae(m, S) {
  let r = ht.get(m);
  return (r || ((r = new S['Quaternion']().copy(m).invert()), ht.set(m, r)), r);
}
var je = new TextEncoder(),
  Ee = new TextDecoder(),
  et = 27,
  qe = 20,
  tt = 140,
  mt = (m) =>
    m < 7500 ? { wide: !1, meta: 12, sentinel: 13 } : { wide: !0, meta: 24, sentinel: 25 };
function Dt(m, S, r) {
  let E = String.fromCharCode(m[r]);
  switch (E) {
    case 'C':
      return 2;
    case 'Y':
      return 3;
    case 'I':
    case 'F':
      return 5;
    case 'D':
    case 'L':
      return 9;
    case 'S':
    case 'R':
      return 5 + S.getUint32(r + 1, !0);
    case 'f':
    case 'd':
    case 'l':
    case 'i':
    case 'b':
      return 13 + S.getUint32(r + 9, !0);
    default:
      throw new Error('FBX: unknown property type "' + E + '" at ' + r);
  }
}
function Fe(m) {
  let S = m instanceof Uint8Array ? m : new Uint8Array(m),
    E = new DataView(S.buffer, S.byteOffset, S.byteLength);
  if (Ee.decode(S.subarray(0, 18)) !== 'Kaydara FBX Binary') throw new Error('Not a binary FBX');
  let F = E.getUint32(23, !0),
    C = mt(F),
    H = (j) => (C.wide ? Number(E.getBigUint64(j, !0)) : E.getUint32(j, !0));
  function R(j, z) {
    let O = [];
    for (;;) {
      if (z && j + C.meta > S.length - qe - tt) return { nodes: O, pos: j, ended: !1 };
      let J = H(j);
      if (J === 0) return { nodes: O, pos: j + C.sentinel, ended: !0 };
      let Z = H(j + (C.wide ? 8 : 4)),
        U = S[j + C.meta],
        K = Ee.decode(S.subarray(j + C.meta + 1, j + C.meta + 1 + U)),
        T = j + C.meta + 1 + U,
        X = [];
      for (let x = 0; x < Z; x++) {
        let W = Dt(S, E, T);
        (X.push(S.slice(T, T + W)), (T += W));
      }
      let L = [],
        b = !1;
      if (T < J) {
        let q = R(T, !1);
        ((L = q.nodes), (b = q.ended), (T = q.pos));
      }
      if (T !== J) throw new Error('FBX: record "' + K + '" ends at ' + T + ', expected ' + J);
      (O.push({ name: K, props: X, children: L, sentinel: b }), (j = J));
    }
  }
  let { nodes: l, pos: Q, ended: c } = R(et, !0);
  return { version: F, nodes: l, topSentinel: c, footer: S.slice(Q) };
}
function Ge({ version: m, nodes: S, topSentinel: E, footer: F }) {
  let C = mt(m),
    H = (J) =>
      C.meta +
      1 +
      je.encode(J.name).length +
      J.props.reduce((Z, U) => Z + U.length, 0) +
      J.children.reduce((Z, U) => Z + H(U), 0) +
      (J.sentinel ? C.sentinel : 0),
    R = et + S.reduce((J, Z) => J + H(Z), 0) + (E ? C.sentinel : 0) + qe,
    l = ((R + 15) & -16) - R;
  l === 0 && (l = 16);
  let Q = new Uint8Array(R + l + tt),
    j = new DataView(Q.buffer);
  (Q.set(je.encode('Kaydara FBX Binary  \0'), 0),
    (Q[21] = 26),
    (Q[22] = 0),
    j.setUint32(23, m, !0));
  let z = (J, Z) => (C.wide ? j.setBigUint64(J, BigInt(Z), !0) : j.setUint32(J, Z, !0)),
    O = et,
    f = (J) => {
      let Z = O,
        U = je.encode(J.name);
      (z(Z, Z + H(J)),
        z(Z + (C.wide ? 8 : 4), J.props.length),
        z(
          Z + (C.wide ? 16 : 8),
          J.props.reduce((K, T) => K + T.length, 0),
        ),
        (Q[Z + C.meta] = U.length),
        Q.set(U, Z + C.meta + 1),
        (O = Z + C.meta + 1 + U.length));
      for (let K of J.props) (Q.set(K, O), (O += K.length));
      for (let T of J.children) f(T);
      J.sentinel && (O += C.sentinel);
    };
  for (let J of S) f(J);
  return (
    E && (O += C.sentinel),
    Q.set(F.subarray(0, qe), O),
    Q.set(F.subarray(F.length - tt), O + qe + l),
    Q
  );
}
function gn(m) {
  let S = Fe(m),
    r = (F) => {
      ((F.children = F.children.filter((C) => C.name !== 'LayerElementColor')),
        F.children.forEach(r));
    };
  S.nodes.forEach(r);
  let E = Ge(S);
  return E.buffer.slice(E.byteOffset, E.byteOffset + E.byteLength);
}
function wn(m) {
  let S = m instanceof Uint8Array ? m : new Uint8Array(m);
  if (String.fromCharCode(...S.subarray(0, 18)) !== 'Kaydara FBX Binary') return null;
  let E = Fe(S).nodes.find((s) => s.name === 'Objects'),
    F = 0,
    C = 0;
  for (let s of E?.children ?? [])
    s.name === 'Geometry' && _e(s.props[2]) === 'Mesh' ? F++ : s.name === 'AnimationCurve' && C++;
  return { meshes: F, curves: C };
}
function _e(m) {
  return m[0] === 83 ? Ee.decode(m.subarray(5)) : null;
}
function Ae(m) {
  let S = typeof m == 'string' ? je.encode(m) : m,
    r = new Uint8Array(5 + S.length);
  return ((r[0] = 83), new DataView(r.buffer).setUint32(1, S.length, !0), r.set(S, 5), r);
}
function zt(m) {
  let S = new Uint8Array(141),
    r = new DataView(S.buffer);
  ((S[0] = 100), r.setUint32(1, 16, !0), r.setUint32(5, 0, !0), r.setUint32(9, 128, !0));
  for (let E = 0; E < 16; E++) r.setFloat64(13 + E * 8, m[E], !0);
  return S;
}
function yn(m, S) {
  let E = Fe(m),
    F = E.nodes.find((s) => s.name === 'Objects'),
    C = 0;
  for (let s of F?.children ?? []) {
    if (s.name !== 'Deformer' || _e(s.props[2]) !== 'Cluster') continue;
    let H = s.children.find((R) => R.name === 'TransformAssociateModel');
    H && ((H.props = [zt(S)]), C++);
  }
  return { bytes: C ? Ge(E) : m instanceof Uint8Array ? m : new Uint8Array(m), changed: C };
}
function bn(m, S) {
  let E = Fe(m),
    F = E.nodes.find((s) => s.name === 'Objects'),
    C = 0;
  for (let s of F?.children ?? []) {
    if (
      (s.name !== 'Model' && s.name !== 'NodeAttribute') ||
      _e(s.props[1]) !== S + '\0\u0001' + s.name ||
      _e(s.props[2]) !== 'LimbNode'
    )
      continue;
    s.props[2] = Ae('Root');
    let H = s.name === 'NodeAttribute' && s.children.find((R) => R.name === 'TypeFlags');
    (H && (H.props = ['Null', 'Skeleton', 'Root'].map(Ae)), C++);
  }
  return { bytes: C ? Ge(E) : m instanceof Uint8Array ? m : new Uint8Array(m), changed: C };
}
function Ce(m) {
  let S = new Uint8Array(9);
  return ((S[0] = 76), new DataView(S.buffer).setBigInt64(1, BigInt(m), !0), S);
}
var Ne = (m, S) => ({ name: m, props: S, children: [], sentinel: !1 });
function _n(m) {
  let S = Fe(m),
    E = S.nodes.find((l) => l.name === 'Objects'),
    F = (l) => new DataView(l.buffer, l.byteOffset + 1, 8).getBigInt64(0, !0),
    C = (E?.children ?? [])
      .filter((l) => l.name === 'AnimationStack')
      .map((l) => {
        let Q = l.children.find((O) => O.name === 'Properties70')?.children ?? [],
          c = (O) => {
            let J = Q.find((Z) => _e(Z.props[0]) === O);
            return J && J.props[4]?.[0] === 76 ? F(J.props[4]) : null;
          },
          j = c('LocalStart') ?? 0x0n,
          z = c('LocalStop') ?? 0x0n;
        return {
          name: (_e(l.props[1]) ?? '').split('\0')[0],
          ls: j,
          le: z,
          rs: c('ReferenceStart') ?? j,
          re: c('ReferenceStop') ?? z,
        };
      });
  if (!C.length) return { bytes: m, takes: 0 };
  let s = {
      name: 'Takes',
      sentinel: !0,
      props: [],
      children: [
        Ne('Current', [Ae(C[0].name)]),
        ...C.map((l) => ({
          name: 'Take',
          sentinel: !0,
          props: [Ae(l.name)],
          children: [
            Ne('FileName', [Ae(l.name.replace(/[^\w-]+/g, '_') + '.tak')]),
            Ne('LocalTime', [Ce(l.ls), Ce(l.le)]),
            Ne('ReferenceTime', [Ce(l.rs), Ce(l.re)]),
          ],
        })),
      ],
    },
    H = S.nodes.findIndex((l) => l.name === 'Takes');
  H >= 0 ? (S.nodes[H] = s) : S.nodes.push(s);
  let R = S.nodes
    .find((l) => l.name === 'Documents')
    ?.children.find((l) => l.name === 'Document')
    ?.children.find((l) => l.name === 'Properties70')
    ?.children.find((l) => _e(l.props[0]) === 'ActiveAnimStackName');
  return (
    R && R.props.length >= 5 && (R.props[4] = Ae(C[0].name)),
    { bytes: Ge(S), takes: C.length }
  );
}
var Ut = ['thumb', 'index', 'middle', 'ring', 'pinky'],
  Be = (m) => m === 'root' || m.startsWith('ik_') || m.startsWith('socket_'),
  xe = {
    pelvis: 'spine_01',
    spine_01: 'spine_02',
    spine_02: 'spine_03',
    spine_03: 'neck_01',
    neck_01: 'Head',
  };
for (let e of ['l', 'r']) {
  Object.assign(xe, {
    ['clavicle_' + e]: 'upperarm_' + e,
    ['upperarm_' + e]: 'lowerarm_' + e,
    ['lowerarm_' + e]: 'hand_' + e,
    ['hand_' + e]: 'middle_01_' + e,
    ['thigh_' + e]: 'calf_' + e,
    ['calf_' + e]: 'foot_' + e,
    ['foot_' + e]: 'ball_' + e,
    ['ball_' + e]: 'ball_leaf_' + e,
  });
  for (let t of Ut)
    Object.assign(xe, {
      [t + '_01_' + e]: t + '_02_' + e,
      [t + '_02_' + e]: t + '_03_' + e,
      [t + '_03_' + e]: t + '_04_leaf_' + e,
    });
}
var Ct = 2,
  Nt = /^(pelvis|spine_0\d|neck_0\d|Head)$/,
  dt = 10,
  nt = 0.05;
function gt(m, S) {
  let r = new Map();
  for (let E of m)
    (E.updateMatrixWorld(!0),
      E.skeleton.bones.forEach((F, C) => {
        r.has(F.name) ||
          r.set(
            F.name,
            new S.Matrix4()
              .copy(E.matrixWorld)
              .multiply(E.bindMatrixInverse)
              .multiply(new S['Matrix4']().copy(E.skeleton.boneInverses[C]).invert()),
          );
      }));
  return r;
}
function Mn(m, S, E) {
  let F = [];
  S.traverse((C) => {
    C.isBone && F.push(C);
  });
  for (let C = F.length - 1; C >= 0; C--) {
    let s = F[C];
    if (m.has(s.name)) continue;
    let H = s.children.find((R) => R.isBone && m.has(R.name));
    H &&
      (H.updateMatrix(),
      m.set(
        s.name,
        new E.Matrix4().copy(m.get(H.name)).multiply(new E['Matrix4']().copy(H.matrix).invert()),
      ));
  }
  return m;
}
function wt(m, S) {
  let E = m.joint,
    F = m.parent,
    C = new Map(),
    H = new Map();
  for (let [Q, j] of m.bones) {
    C.set(Q, j.getWorldQuaternion(new S['Quaternion']()));
    let z = 0;
    for (let O = j.parent; O; O = O.parent) z++;
    H.set(Q, z);
  }
  let R = [...m.bones.keys()].sort((J, Z) => H.get(J) - H.get(Z)),
    l = new Map();
  for (let J of ['l', 'r'])
    for (let [Z, U, d] of [
      ['upperarm_' + J, 'lowerarm_' + J, 'hand_' + J],
      ['thigh_' + J, 'calf_' + J, 'foot_' + J],
    ]) {
      if (!E.has(Z) || !E.has(U) || !E.has(d)) continue;
      let K = new S['Vector3'](1, 0, 0).applyQuaternion(C.get(U)),
        T = E.get(U).clone().sub(E.get(Z)).normalize(),
        A = E.get(d)
          .clone()
          .sub(E.get(U))
          .normalize()
          .applyAxisAngle(K, Math.PI / 6);
      l.set(Z, { normal: new S['Vector3']().crossVectors(T, A).normalize(), child: U, end: d });
    }
  return { o: E, Q0: C, par: F, order: R, hinge: l };
}
var Le = (m) => (2 * Math.acos(Math.min(1, Math.abs(m.w))) * 180) / Math.PI;
function yt({ j: E, F: C, R0: H, THREE: l }) {
  let { o: z, Q0: Z, par: L, order: b, hinge: x } = H,
    B = (kV) => Nt.test(kV),
    g = () => new l['Vector3'](),
    I = (kV, kD, km) => kV.get(kD).clone().sub(kV.get(km)),
    N = (kV, kD) =>
      kV.get('index_01_' + kD) && kV.get('pinky_01_' + kD)
        ? I(kV, 'index_01_' + kD, 'pinky_01_' + kD)
        : null,
    k0 = new Map(),
    k1 = new Map();
  for (let kV of b) {
    if (!E.has(kV)) continue;
    let kD = L.get(kV),
      km = kD && k0.has(kD) ? k0.get(kD).clone() : new l['Quaternion'](),
      kS = xe[kV],
      kr = 0,
      kE = 0,
      kF = '',
      kC = 0;
    if (B(kV))
      (kS &&
        E.has(kS) &&
        z.has(kS) &&
        (kC =
          (I(z, kS, kV)
            .normalize()
            .angleTo(I(E, kS, kV).normalize()) *
            180) /
          Math.PI),
        (kF = 'own'));
    else {
      if (!Be(kV) && kS && E.has(kS) && z.has(kS)) {
        let kt = I(z, kS, kV).normalize(),
          ks = I(E, kS, kV).normalize(),
          kH = new l['Quaternion']().setFromUnitVectors(kt.clone().applyQuaternion(km), ks);
        ((kr = Le(kH)), (kC = (kt.angleTo(ks) * 180) / Math.PI), (km = kH.multiply(km)));
        let ka = null,
          kR = null,
          kl = kV.slice(-1);
        if (/^(upperarm|thigh)_/.test(kV) && x.has(kV)) {
          let { normal: kQ, child: kc, end: kj } = x.get(kV),
            kz = E.has(kj) && E.has(kc) ? I(E, kj, kc).normalize() : null,
            kp = kz ? (ks.angleTo(kz) * 180) / Math.PI : 0,
            kO =
              kV.startsWith('thigh') && E.has('ball_' + kl) && E.has('foot_' + kl)
                ? I(E, 'ball_' + kl, 'foot_' + kl).setY(0)
                : null,
            kf =
              kp > dt &&
              kO &&
              kO.lengthSq() > 1e-8 &&
              Math.abs(
                g()
                  .crossVectors(ks, kz)
                  .normalize()
                  .dot(
                    g()
                      .crossVectors(g().set(0, 1, 0), kO)
                      .normalize(),
                  ),
              ) < Math.SQRT1_2;
          kp > dt && !kf
            ? ((ka = kQ.clone()), (kR = g().crossVectors(ks, kz).normalize()), (kF = 'bend'))
            : kV.startsWith('thigh') &&
              E.has('ball_' + kl) &&
              E.has('foot_' + kl) &&
              ((ka = I(z, 'ball_' + kl, 'foot_' + kl)),
              (kR = I(E, 'ball_' + kl, 'foot_' + kl)),
              (kF = 'foot'));
        } else
          /^(lowerarm|hand)_/.test(kV)
            ? ((ka = N(z, kl)), (kR = N(E, kl)), (kF = ka && kR ? 'palm' : ''))
            : /^foot_/.test(kV) &&
              ((ka = g().set(0, 1, 0)), (kR = g().set(0, 1, 0)), (kF = 'flat'));
        if (ka && kR) {
          let kJ = ka.clone().applyQuaternion(km);
          kJ.addScaledVector(ks, -kJ.dot(ks));
          let kZ = kR.clone();
          if ((kZ.addScaledVector(ks, -kZ.dot(ks)), kJ.length() > 0.001 && kZ.length() > 0.001)) {
            (kJ.normalize(), kZ.normalize());
            let kU = Math.atan2(g().crossVectors(kJ, kZ).dot(ks), kJ.dot(kZ));
            kF === 'bend' && Math.abs(kU) > Math.PI / 2
              ? (kF = 'backwards')
              : ((km = new l['Quaternion']().setFromAxisAngle(ks, kU).multiply(km)),
                (kE = (kU * 180) / Math.PI));
          }
        }
      }
    }
    (k0.set(kV, km), k1.set(kV, { swing: kr, twist: kE, cue: kF, abs: kC }));
  }
  let k2 = 0,
    k3 = '',
    k4 = new Map();
  if (C) {
    for (let ku of b) {
      if (!C.has(ku) || !k0.has(ku)) continue;
      let kd = new l['Quaternion']();
      (C.get(ku).decompose(g(), kd, g()),
        k4.set(ku, kd.normalize().multiply(Z.get(ku).clone().invert())));
    }
    for (let [kK, kT] of k1) {
      if (Be(kK) || B(kK)) continue;
      let kA = k4.get(kK);
      if (!kA) {
        ((k2 = 1 / 0), (k3 = kK));
        break;
      }
      let kn = xe[kK];
      if (kn && E.has(kn) && z.has(kn)) {
        let ko =
          (I(z, kn, kK)
            .normalize()
            .applyQuaternion(kA)
            .angleTo(I(E, kn, kK).normalize()) *
            180) /
          Math.PI;
        ko > k2 && ((k2 = ko), (k3 = kK));
      }
      if (kT.cue && kT.cue !== 'backwards' && kT.cue !== 'own') {
        let kX = Le(kA.clone().multiply(k0.get(kK).clone().invert()));
        kX > k2 && ((k2 = kX), (k3 = kK));
      }
    }
  }
  let k5 = !!C && k2 < Ct,
    k6 = (kL) => !Be(kL) && !B(kL) && xe[kL] && E.has(xe[kL]) && z.has(xe[kL]),
    k7 = new Map();
  for (let kL of b) {
    if (!k0.has(kL)) continue;
    let kb = L.get(kL);
    k7.set(
      kL,
      k5
        ? k6(kL)
          ? k4.get(kL)
          : kb && k7.has(kb)
            ? k7.get(kb).clone()
            : new l.Quaternion()
        : k0.get(kL),
    );
  }
  let k8 = !0;
  for (let [kx, ky] of k7) Le(ky) < nt ? k7.set(kx, new l.Quaternion()) : Be(kx) || (k8 = !1);
  let k9 = new Map();
  for (let kW of b) {
    if (!E.has(kW)) continue;
    let kq = L.get(kW);
    k9.set(
      kW,
      kq && k9.has(kq) && k7.has(kq)
        ? k9
            .get(kq)
            .clone()
            .add(E.get(kW).clone().sub(E.get(kq)).applyQuaternion(k7.get(kq).clone().invert()))
        : E.get(kW).clone(),
    );
  }
  let kk = ['ball_l', 'ball_r', 'foot_l', 'foot_r'].filter((kP) => k9.has(kP) && E.has(kP)),
    kw = 0;
  if (kk.length) {
    let kP = Math.min(...kk.map((kv) => E.get(kv).y)),
      kY = Math.min(...kk.map((kv) => k9.get(kv).y));
    if (kY < kP - 0.00001) {
      kw = kP - kY;
      for (let [kv, kB] of k9) kv !== 'root' && (kB.y += kw);
    }
  }
  return {
    S: k7,
    p: k9,
    info: k1,
    trusted: k5,
    worst: Number.isFinite(k2) ? k2 : 180,
    at: k3,
    identity: k8,
    lift: kw,
  };
}
function $n({ j: m, turn: S, R0: E, THREE: F }) {
  let { par: C, order: H } = E,
    R = new Map(),
    l = new Map(),
    Q = !0;
  for (let J of H) {
    if (!m.has(J)) continue;
    let Z = S.get(J) ?? null,
      U = Z ? Le(Z) : 0;
    (R.set(J, Z && U >= nt ? Z.clone().invert() : new F['Quaternion']()),
      l.set(J, { swing: U, twist: 0, cue: Z ? 'preset' : 'own', abs: U }),
      Z && U >= nt && !Be(J) && (Q = !1));
  }
  let j = new Map();
  for (let K of H) {
    if (!m.has(K)) continue;
    let T = C.get(K);
    j.set(
      K,
      T && j.has(T) && R.has(T)
        ? j
            .get(T)
            .clone()
            .add(m.get(K).clone().sub(m.get(T)).applyQuaternion(R.get(T).clone().invert()))
        : m.get(K).clone(),
    );
  }
  let z = ['ball_l', 'ball_r', 'foot_l', 'foot_r'].filter((A) => j.has(A) && m.has(A)),
    O = 0;
  if (z.length) {
    let A = Math.min(...z.map((L) => m.get(L).y)),
      X = Math.min(...z.map((L) => j.get(L).y));
    if (X < A - 0.00001) {
      O = A - X;
      for (let [L, b] of j) L !== 'root' && (b.y += O);
    }
  }
  return { S: R, p: j, info: l, trusted: !1, worst: 0, at: '', identity: Q, lift: O };
}
function bt(m, S, E, F) {
  let { o: C } = S,
    H = {},
    R = (Z, U, K) => Z.get(K).clone().sub(Z.get(U)).normalize(),
    l = (...Z) => Z.every((U) => m.has(U) && C.has(U)),
    Q = (Z, U) => (Z.angleTo(U) * 180) / Math.PI,
    j = 'l';
  if (l('upperarm_' + j, 'lowerarm_' + j, 'hand_' + j)) {
    let Z = R(m, 'upperarm_' + j, 'lowerarm_' + j),
      U = R(C, 'upperarm_' + j, 'lowerarm_' + j);
    ((H.armsDown = ((Math.asin(-Z.y) - Math.asin(-U.y)) * 180) / Math.PI),
      (H.armsForward =
        ((Math.atan2(Z.z, Math.abs(Z.x)) - Math.atan2(U.z, Math.abs(U.x))) * 180) / Math.PI),
      (H.elbows =
        Q(Z, R(m, 'lowerarm_' + j, 'hand_' + j)) - Q(U, R(C, 'lowerarm_' + j, 'hand_' + j))));
  }
  if (l('thigh_' + j, 'calf_' + j, 'foot_' + j)) {
    let K = R(m, 'thigh_' + j, 'calf_' + j),
      T = R(C, 'thigh_' + j, 'calf_' + j);
    if (
      ((H.legsOut =
        ((Math.atan2(Math.abs(K.x), -K.y) - Math.atan2(Math.abs(T.x), -T.y)) * 180) / Math.PI),
      (H.knees = Q(K, R(m, 'calf_' + j, 'foot_' + j)) - Q(T, R(C, 'calf_' + j, 'foot_' + j))),
      l('ball_' + j))
    ) {
      let A = R(m, 'foot_' + j, 'ball_' + j),
        X = R(C, 'foot_' + j, 'ball_' + j);
      H.toesOut = ((Math.atan2(A.x, A.z) - Math.atan2(X.x, X.z)) * 180) / Math.PI;
    }
  }
  H.palms = (E.get('lowerarm_' + j)?.twist ?? 0) + (E.get('hand_' + j)?.twist ?? 0);
  let z = (L) => Math.max(0, ...[...E].filter(([b]) => L.test(b)).map(([, b]) => b.swing));
  ((H.fingers = z(/^(index|middle|ring|pinky|thumb)_0[123]_[lr]$/)),
    (H.limbs = z(/^(clavicle|upperarm|lowerarm|hand|thigh|calf|foot|ball)_[lr]$/)),
    (H.spine = z(/^(pelvis|spine_0\d|neck_01)$/)));
  let O = '',
    J = -1;
  for (let [L, b] of E)
    /^(clavicle|upperarm|lowerarm|hand|thigh|calf|foot)_[lr]$/.test(L) &&
      b.swing > J &&
      ((J = b.swing), (O = L));
  H.worstLimb = O;
  for (let x in H) typeof H[x] == 'number' && (H[x] = +H[x].toFixed(1));
  return H;
}
function _t(m) {
  let S = [],
    r = (E) => Math.round(Math.abs(E)) + '\u00B0';
  return (
    Math.abs(m.armsDown ?? 0) >= 3 &&
      S.push('arms ' + r(m.armsDown) + ' ' + (m.armsDown > 0 ? 'down' : 'up')),
    Math.abs(m.armsForward ?? 0) >= 3 &&
      S.push(r(m.armsForward) + ' ' + (m.armsForward > 0 ? 'forward' : 'back')),
    (m.elbows ?? 0) >= 3 && S.push('elbows bent ' + r(m.elbows)),
    Math.abs(m.palms ?? 0) >= 10 && S.push('palms turned ' + r(m.palms)),
    Math.abs(m.legsOut ?? 0) >= 2 &&
      S.push('legs ' + r(m.legsOut) + ' ' + (m.legsOut > 0 ? 'apart' : 'together')),
    (m.knees ?? 0) >= 3 && S.push('knees bent ' + r(m.knees)),
    Math.abs(m.toesOut ?? 0) >= 3 &&
      S.push('toes ' + r(m.toesOut) + ' ' + (m.toesOut > 0 ? 'out' : 'in')),
    (m.fingers ?? 0) >= 5 && S.push('fingers curled up to ' + r(m.fingers)),
    ((m.armsDown ?? 0) >= 20 ? 'A-pose \u2014 ' : '') +
      (S.join(', ') || 'within a few degrees of our T-pose')
  );
}
var Ke = [
    'pelvis',
    'spine_01',
    'spine_02',
    'spine_03',
    'neck_01',
    'Head',
    ...['l', 'r'].flatMap((m) =>
      ['clavicle', 'upperarm', 'lowerarm', 'hand', 'thigh', 'calf', 'foot'].map((S) => S + '_' + m),
    ),
  ],
  xt = ['thumb', 'index', 'middle', 'ring', 'pinky'],
  Xe = (m) => m === 'root' || m.startsWith('ik_') || m.startsWith('socket_') || m.includes('leaf'),
  jt = (m) => m === 'root' || m.startsWith('ik_') || m.startsWith('socket_'),
  Je = {
    pelvis: 'spine_01',
    spine_01: 'spine_02',
    spine_02: 'spine_03',
    spine_03: 'neck_01',
    neck_01: 'Head',
  };
for (let e of ['l', 'r']) {
  Object.assign(Je, {
    ['clavicle_' + e]: 'upperarm_' + e,
    ['upperarm_' + e]: 'lowerarm_' + e,
    ['lowerarm_' + e]: 'hand_' + e,
    ['hand_' + e]: 'middle_01_' + e,
    ['thigh_' + e]: 'calf_' + e,
    ['calf_' + e]: 'foot_' + e,
    ['foot_' + e]: 'ball_' + e,
  });
  for (let t of xt)
    Object.assign(Je, { [t + '_01_' + e]: t + '_02_' + e, [t + '_02_' + e]: t + '_03_' + e });
}
var Ye = (m) => xt.some((S) => m.startsWith(S + '_'));
function An(m, S) {
  m.updateMatrixWorld(!0);
  let E = new Map(),
    F = new Map(),
    C = new Map();
  m.traverse((H) => {
    H.isBone &&
      (E.set(H.name, H),
      F.set(H.name, H.parent?.isBone ? H.parent.name : null),
      C.set(H.name, H.getWorldPosition(new S['Vector3']())));
  });
  let s = new S['Box3']();
  return (
    m.traverse((H) => {
      H.isMesh &&
        H.geometry &&
        (H.geometry.computeBoundingBox(),
        s.union(H.geometry.boundingBox.clone().applyMatrix4(H.matrixWorld)));
    }),
    { bones: E, parent: F, joint: C, height: s.isEmpty() ? null : s.max.y - Math.min(0, s.min.y) }
  );
}
function qt(E, C, H) {
  let R = () => new H['Vector3'](),
    l = E.length,
    j = R(),
    z = R();
  (E.forEach((k1) => j.add(k1)),
    C.forEach((k1) => z.add(k1)),
    j.divideScalar(l),
    z.divideScalar(l));
  let J = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    Z = 0;
  for (let k1 = 0; k1 < l; k1++) {
    let k2 = E[k1].clone().sub(j),
      k3 = C[k1].clone().sub(z);
    Z += k2.lengthSq();
    let k4 = k2.toArray(),
      k5 = k3.toArray();
    for (let k6 = 0; k6 < 3; k6++) for (let k7 = 0; k7 < 3; k7++) J[k6][k7] += k4[k6] * k5[k7];
  }
  let [[K, T, L], [b, x, W], [q, Y, B]] = J,
    G = [
      [K + x + B, W - Y, q - L, T - b],
      [W - Y, K - x - B, T + b, q + L],
      [q - L, T + b, -K + x - B, W + Y],
      [T - b, q + L, W + Y, -K - x + B],
    ],
    g = 10 * Math.max(...G.flat().map(Math.abs)) + 1e-9;
  for (let k8 = 0; k8 < 4; k8++) G[k8][k8] += g;
  let I = [1, 0.1, 0.2, 0.3];
  for (let k9 = 0; k9 < 2000; k9++) {
    let kk = G.map((kV) => kV.reduce((kD, km, kS) => kD + km * I[kS], 0)),
      kw = Math.hypot(...kk);
    I = kk.map((kV) => kV / kw);
  }
  let N = new H['Quaternion'](I[1], I[2], I[3], I[0]).normalize(),
    k0 = 0;
  for (let kV = 0; kV < l; kV++)
    k0 += C[kV].clone().sub(z).dot(E[kV].clone().sub(j).applyQuaternion(N));
  return { s: k0 / Z, R: N };
}
var Gt = [100, 0.01, 2.54, 1 / 2.54, 1000, 0.001],
  Lt = [
    'pelvis',
    'spine_01',
    'spine_02',
    'spine_03',
    'neck_01',
    'Head',
    'clavicle_l',
    'clavicle_r',
    'upperarm_l',
    'upperarm_r',
    'thigh_l',
    'thigh_r',
  ],
  Kt = ['KHR_draco_mesh_compression', 'EXT_meshopt_compression', 'KHR_texture_basisu'];
function Sn(v, k0, k1, k2 = {}) {
  let k3 = [],
    k4 = [],
    k5 = [],
    k6 = v.scene,
    k7 = v.parser?.json ?? {},
    k8 = (w2) => ({ tier: w2, errors: k3, warnings: k4, fixes: k5, stats: {} }),
    k9 = [...(k7.extensionsUsed || []), ...(k7.extensionsRequired || [])],
    kk = Kt.filter((w2) => k9.includes(w2));
  if (kk.length)
    return (
      k3.push(
        'This file is compressed (' +
          kk.join(', ') +
          "). Export it again without compression \u2014 in Blender's glTF export, turn off Compression.",
      ),
      k8('reject')
    );
  k6.updateMatrixWorld(!0);
  let kw = [];
  if (
    (k6.traverse((w2) => {
      w2.isSkinnedMesh && kw.push(w2);
    }),
    !kw.length)
  )
    return (
      k3.push(
        'This file has no skinned mesh \u2014 nothing is attached to a skeleton. Bind the mesh to our skeleton (Parent \u2192 With Automatic Weights) and export again.',
      ),
      k8('reject')
    );
  let kV = new Map(),
    kD = new Map();
  k6.traverse((w2) => {
    w2.name && (w2.isBone ? kV.has(w2.name) || kV.set(w2.name, w2) : kD.set(w2.name, w2));
  });
  for (let w2 of k0.bones.keys())
    !kV.has(w2) &&
      kV.has(w2 + '_1') &&
      k5.push(
        'Bone \u201C' +
          w2 +
          '\u201D came in as \u201C' +
          w2 +
          '_1\u201D because another object in the file is also called \u201C' +
          w2 +
          '\u201D. Read as \u201C' +
          w2 +
          '\u201D.',
      );
  let km = (w3) => (kV.has(w3) ? w3 : kV.has(w3 + '_1') ? w3 + '_1' : null),
    kS = (w3) => w3.replace(/_1$/, ''),
    kr = Ke.filter((w3) => km(w3));
  if (kr.length < 8)
    return (
      k3.push(
        'This character is rigged to a different skeleton (' +
          kr.length +
          ' of our ' +
          Ke.length +
          ' main bones found by name). Characters on other skeletons are coming; for now, bind it to our skeleton \u2014 the template below \u2014 and export again.',
      ),
      { ...k8('reject'), stats: { coreFound: kr.length } }
    );
  let kE = Ke.filter((w3) => !km(w3));
  if (kE.length)
    return (
      k3.push(
        'Missing ' +
          (kE.length === 1 ? 'a main bone' : 'main bones') +
          ': ' +
          kE.join(', ') +
          '. Every limb, the spine, neck and head are needed.',
      ),
      { ...k8('reject'), stats: { coreFound: kr.length } }
    );
  let kF = [...k0.bones.keys()].filter((w3) => !km(w3) && !Ke.includes(w3)),
    kC = kF.filter(Ye);
  kC.length && k4.push(kC.length + ' finger bones are missing, so the fingers won\u2019t animate.');
  let kt = kF.filter((w3) => !Ye(w3) && !Xe(w3));
  kt.length && k4.push('Missing ' + kt.join(', ') + ' \u2014 that part will be stiff.');
  let ks = [...kV.keys()].filter((w3) => !k0.bones.has(kS(w3)) && w3 !== 'neutral_bone');
  ks.length &&
    k4.push(
      ks.length +
        ' extra bone' +
        (ks.length === 1 ? '' : 's') +
        ' (' +
        ks.slice(0, 4).join(', ') +
        (ks.length > 4 ? '\u2026' : '') +
        ') will follow the nearest bone of ours rigidly.',
    );
  let kH = new Map();
  for (let w3 of kw) {
    let w4 = w3.geometry.attributes.skinIndex,
      w5 = w3.geometry.attributes.skinWeight;
    if (!(!w4 || !w5)) {
      for (let w6 = 0; w6 < w4.count; w6++)
        for (let w7 = 0; w7 < 4; w7++) {
          if (w5.getComponent(w6, w7) <= 0.0001) continue;
          let w8 = w3.skeleton.bones[w4.getComponent(w6, w7)];
          w8 && kH.set(w8.name, (kH.get(w8.name) || 0) + 1);
        }
    }
  }
  let ka = [...kH.keys()].filter((w9) => jt(kS(w9)) && k0.bones.has(kS(w9)));
  ka.length &&
    k3.push(
      'The mesh is weighted to helper bones that must not deform it: ' +
        ka.map((w9) => w9 + ' (' + kH.get(w9) + ' vertices)').join(', ') +
        '. In Blender, turn off Deform on root, ik_* and socket_* bones before Automatic Weights \u2014 the template has them off.',
    );
  let kR = kH.get('neutral_bone') || 0;
  (kR &&
    (k4.push(
      kR +
        ' vertex weight' +
        (kR === 1 ? ' is' : 's are') +
        ' on no bone (Blender left them unweighted). They\u2019re given to the nearest bone.',
    ),
    k5.push('Unweighted vertices assigned to their nearest bone.')),
    (k7.meshes || []).some((w9) =>
      (w9.primitives || []).some((wk) => wk.attributes && 'JOINTS_1' in wk.attributes),
    ) &&
      k4.push(
        'Some vertices are weighted to more than 4 bones. The browser uses the strongest 4, so check shoulders and hips.',
      ));
  let kl = gt(kw, k1),
    kQ = new Map([...kl].map(([w9, wk]) => [w9, new k1['Vector3']().setFromMatrixPosition(wk)])),
    kc = (w9) => kQ.get(km(w9)),
    kj = kr.filter((w9) => kc(w9));
  if (kj.length < 8)
    return (
      k3.push(
        'The main bones aren\u2019t part of the mesh\u2019s skin, so its bind pose can\u2019t be read. Bind the mesh to the armature and export again.',
      ),
      k8('reject')
    );
  let kz = kj.filter((w9) => Lt.includes(w9)),
    kp = kz.length >= 6 ? kz : kj,
    kO = qt(
      kp.map(kc),
      kp.map((w9) => k0.joint.get(w9)),
      k1,
    ),
    kf = k1.MathUtils.radToDeg(2 * Math.acos(Math.min(1, Math.abs(kO.R.w)))),
    kJ = Gt.find((w9) => Math.abs(kO.s / w9 - 1) < 0.15),
    kZ = kJ ?? 1;
  (kJ &&
    k5.push(
      kJ === 0.01
        ? 'Exported in centimetres \u2014 scaled to metres.'
        : 'Scaled by ' + +kJ.toFixed(4) + ' (units).',
    ),
    kf > 5 && k5.push('Turned ' + kf.toFixed(0) + '\u00B0 to stand and face like ours.'));
  let kU = new k1['Matrix4']().compose(
      new k1.Vector3(),
      kf > 5 ? kO.R : new k1['Quaternion'](),
      new k1['Vector3']().setScalar(kZ),
    ),
    ku = kc('pelvis').clone().applyMatrix4(kU),
    kd = new k1['Vector3']().subVectors(k0.joint.get('pelvis'), ku);
  kd.y = 0;
  let kK = new k1.Matrix4().makeTranslation(kd.x, kd.y, kd.z).multiply(kU),
    kT = (w9) => (kc(w9) ? kc(w9).clone().applyMatrix4(kK) : null),
    kA = kT('Head').y / k0.joint.get('Head').y;
  ((kA > 0.5 && kA < 2) ||
    k3.push(
      'After unit correction the character is ' +
        Math.round(kT('Head').y * 100) +
        ' cm to the head \u2014 check the export\u2019s units.',
    ),
    kT('upperarm_l') &&
      kT('upperarm_r') &&
      Math.sign(kT('upperarm_l').x - kT('upperarm_r').x) !==
        Math.sign(k0.joint.get('upperarm_l').x - k0.joint.get('upperarm_r').x) &&
      k3.push(
        'Left and right are swapped: upperarm_l is on the character\u2019s right. Rename the sides or mirror the rig.',
      ));
  let kn = new Map(),
    ko = new Map();
  for (let w9 of k0.bones.keys()) {
    let wk = km(w9);
    if (!wk || !kl.has(wk)) continue;
    let ww = new k1['Matrix4']().multiplyMatrices(kK, kl.get(wk));
    (ko.set(w9, ww), kn.set(w9, new k1.Vector3().setFromMatrixPosition(ww)));
  }
  let kX = wt(k0, k1),
    kL = yt({ j: kn, F: ko, R0: kX, THREE: k1 }),
    kb = bt(kn, kX, kL.info, k1),
    kx = (wV) => kL.p.get(wV) ?? null,
    ky = 0,
    kW = '',
    kq = 0,
    kP = '';
  for (let wV of k0.bones.keys()) {
    let wD = kx(wV);
    if (!wD || Xe(wV)) continue;
    let wm = wD.distanceTo(k0.joint.get(wV));
    wm > ky && ((ky = wm), (kW = wV));
  }
  let kY = 0;
  for (let [wS, wr] of kL.info) Xe(wS) || (kY = Math.max(kY, wr.swing, Math.abs(wr.twist)));
  for (let [wE, wF] of Object.entries(Je)) {
    if (!kT(wE) || !kT(wF) || Ye(wE)) continue;
    let wC = new k1['Vector3']().subVectors(kT(wF), kT(wE)).normalize(),
      ws = new k1['Vector3']().subVectors(k0.joint.get(wF), k0.joint.get(wE)).normalize(),
      wH = k1.MathUtils.radToDeg(wC.angleTo(ws));
    wH > kq + 0.5 && ((kq = wH), (kP = wE));
  }
  let kv = k2.posTol ?? 0.01,
    kB = k2.turnTol ?? 0.5,
    kG = 100,
    kg = (wa) =>
      wa
        .replace(/_l$/, ' (left)')
        .replace(/_r$/, ' (right)')
        .replace(/^upperarm/, 'upper arm')
        .replace(/^lowerarm/, 'forearm')
        .replace(/^calf/, 'shin')
        .replace(/_/g, ' '),
    kI = 0,
    kh = '';
  for (let [wa, wR] of kL.info) !Xe(wa) && !Ye(wa) && wR.swing > kI && ((kI = wR.swing), (kh = wa));
  let kN;
  if (k3.length) kN = 'reject';
  else {
    if (ky <= kv && kY <= kB) kN = 'exact';
    else {
      if (kI > kG)
        ((kN = 'reject'),
          k3.push(
            'The ' +
              kg(kh) +
              ' points ' +
              kI.toFixed(0) +
              '\u00B0 from ours \u2014 more than any rest pose. Check that ' +
              kh +
              ' and ' +
              (Je[kh] ?? 'its child') +
              ' sit on the right joints.',
          ));
      else {
        kN = 'proportions';
        let wl = (wJ, wZ) =>
            wJ.slice(1).reduce((wU, wu, wd) => wU + wZ(wu).distanceTo(wZ(wJ[wd])), 0),
          wQ = (wJ) => k0.joint.get(wJ),
          wc = (wJ) => (wJ.every((wZ) => kx(wZ)) ? wl(wJ, kx) / wl(wJ, wQ) : 1),
          wj = (wJ, wZ) => {
            let wU = wc(wZ);
            return Math.abs(wU - 1) >= 0.03
              ? wJ +
                  ' ' +
                  Math.round(Math.abs(wU - 1) * 100) +
                  '% ' +
                  (wU > 1 ? 'longer' : 'shorter')
              : null;
          },
          wz = ['upperarm_l', 'lowerarm_l', 'hand_l'],
          wp = ['upperarm_r', 'clavicle_r', 'spine_03', 'clavicle_l', 'upperarm_l'],
          wO = [
            wj('legs', ['thigh_l', 'calf_l', 'foot_l']),
            wj('arms', wz),
            wj('torso', ['pelvis', 'spine_01', 'spine_02', 'spine_03', 'neck_01']),
            wj('shoulders', wp),
          ].filter(Boolean);
        if (wO.length || ky > kv) {
          let wJ = wO.length
            ? wO.join(', ')
            : 'joints up to ' + (ky * 100).toFixed(1) + ' cm from ours';
          k5.push(
            'Its own proportions (' +
              wJ +
              '): every clip is fitted to them, so the feet stay planted.',
          );
        }
        if (!kL.identity) {
          let wZ = _t(kb);
          k5.push(
            /within a few/.test(wZ)
              ? 'Its rest pose is a few degrees off our T-pose \u2014 aligned, so clips play as they do on the mannequin.'
              : 'Rest pose: ' +
                  wZ +
                  '. Aligned to our T-pose, so clips play as they do on the mannequin.',
          );
        }
        (!kL.trusted &&
          !kL.identity &&
          kL.worst >= 2 &&
          k5.push(
            'Its bone rolls differ from the template (' +
              kg(kL.at) +
              ' by ' +
              kL.worst.toFixed(0) +
              '\u00B0), so its rest pose is read from the joints.',
          ),
          !kL.trusted &&
            Math.abs(kb.palms ?? 0) >= 20 &&
            (kb.elbows ?? 0) < 10 &&
            k4.push(
              'Palms turn with straight elbows, so we put the turn in the forearms. If the upper arms are turned instead, bend the elbows 10\u201315\u00B0 in the rest pose and export again.',
            ));
        for (let [wU, wu] of kL.info)
          wu.cue === 'backwards' &&
            k4.push(
              'The ' +
                kg(wU)
                  .replace(/^upper arm/, 'elbow')
                  .replace(/^thigh/, 'knee') +
                ' bends backwards at rest, so its twist is guessed.',
            );
        (!kL.trusted &&
          !kL.identity &&
          !(kn.has('index_01_l') && kn.has('pinky_01_l')) &&
          k4.push('No finger bones, so the hands\u2019 turn is taken from the arms.'),
          (Math.abs(wc(wz) - 1) >= 0.03 || Math.abs(wc(wp) - 1) >= 0.03) &&
            k4.push(
              'Arms or shoulders differ from ours, so two-handed props and hands touching the body may not line up yet.',
            ));
        let wf = (wd) => wd('pelvis').y - (wd('foot_l').y + wd('foot_r').y) / 2;
        if (kx('pelvis') && kx('foot_l') && kx('foot_r')) {
          let wd = wf(kx) / wf(wQ);
          (wd < 0.6 || wd > 1.6) &&
            k4.push(
              'Its legs are ' +
                wd.toFixed(2) +
                '\u00D7 ours \u2014 far enough that strides and jumps will look scaled.',
            );
        }
      }
    }
  }
  let ki = -1 / 0,
    kM = 1 / 0,
    w0 = new k1['Vector3'](),
    w1 = new k1['Matrix4']();
  for (let wK of kw) {
    w1.multiplyMatrices(kK, wK.bindMatrix);
    let wT = wK.geometry.attributes.position;
    for (let wA = 0; wA < wT.count; wA++)
      (w0.fromBufferAttribute(wT, wA).applyMatrix4(w1),
        w0.y > ki && (ki = w0.y),
        w0.y < kM && (kM = w0.y));
  }
  return {
    tier: kN,
    errors: k3,
    warnings: k4,
    fixes: k5,
    place: kK,
    nameOf: km,
    align: { j: kn, S: kL.S, p: kL.p, trusted: kL.trusted, identity: kL.identity, lift: kL.lift },
    rest: kb,
    stats: {
      meshes: kw.length,
      vertices: kw.reduce((wo, wX) => wo + wX.geometry.attributes.position.count, 0),
      joints: kQ.size,
      heightCm: Math.round((ki - kM) * 100),
      maxPosCm: +(ky * 100).toFixed(2),
      worstPos: kW,
      maxDirDeg: +kq.toFixed(2),
      worstDir: kP,
      turnDeg: +kY.toFixed(2),
      framesTrusted: kL.trusted,
      scale: kZ,
      rotDeg: +kf.toFixed(1),
    },
  };
}
var Pe = null,
  we = null;
function Xt(m = globalThis.navigator?.userAgent ?? '') {
  return /FBAN|FBAV|FB_IAB|Instagram|Line\/|Twitter|TikTok|musical_ly|Snapchat|LinkedInApp|Pinterest|GSA\/|; wv\)/i.test(
    m,
  );
}
function In(m, S) {
  Pe && (clearTimeout(Pe.timer), URL.revokeObjectURL(Pe.url));
  let r = URL.createObjectURL(m);
  Pe = {
    url: r,
    timer: setTimeout(() => {
      (URL.revokeObjectURL(r), (Pe = null), Ze());
    }, 600 * 1000),
  };
  let E = document.createElement('a');
  ((E.href = r),
    (E.download = S),
    (E.rel = 'noopener'),
    document.body.appendChild(E),
    E.click(),
    E.remove(),
    Yt(r, S, m.size));
}
function Yt(m, S, E) {
  Ze();
  let F = Xt();
  ((we = document.createElement('div')),
    (we.className = 'af-save' + (F ? ' af-save--warn' : '')),
    we.setAttribute('role', 'status'));
  let C = document.createElement('span');
  ((C.className = 'af-save__text'),
    (C.textContent = F
      ? 'This app\u2019s built-in browser may block downloads. If nothing saves, open this page in Chrome or Safari (\u22EF \u2192 Open in browser).'
      : 'Saving ' + S + ' (' + Jt(E) + '). Nothing arrived?'));
  let s = document.createElement('a');
  ((s.className = 'af-save__link'),
    (s.href = m),
    (s.download = S),
    (s.textContent = F ? 'Try saving ' + S : 'Save file'));
  let H = document.createElement('button');
  if (
    ((H.type = 'button'),
    (H.className = 'af-save__close'),
    (H.textContent = '\u2715'),
    (H.title = 'Dismiss'),
    H.setAttribute('aria-label', 'Dismiss'),
    H.addEventListener('click', Ze),
    we.append(C, s, H),
    document.body.appendChild(we),
    !F)
  ) {
    let R = we;
    setTimeout(() => {
      we === R && Ze();
    }, 12000);
  }
}
function Ze() {
  (we?.remove(), (we = null));
}
function Jt(m) {
  return m >= 1048576
    ? (m / 1048576).toFixed(1) + ' MB'
    : Math.max(1, Math.round(m / 1024)) + ' KB';
}
export {
  Tt as a,
  Rt as b,
  Ht as c,
  tn as d,
  nn as e,
  He as f,
  ut as g,
  rn as h,
  sn as i,
  an as j,
  cn as k,
  ln as l,
  un as m,
  fn as n,
  hn as o,
  mn as p,
  Fe as q,
  Ge as r,
  gn as s,
  wn as t,
  _e as u,
  Ae as v,
  yn as w,
  bn as x,
  _n as y,
  xe as z,
  gt as A,
  Mn as B,
  wt as C,
  yt as D,
  $n as E,
  bt as F,
  An as G,
  qt as H,
  Sn as I,
  In as J,
};
