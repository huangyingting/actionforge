import '../interop/worker.js';
function On(V, D, S, r, E) {
  let F = E[0] - r[0],
    C = E[1] - r[1],
    H = E[2] - r[2],
    a = F * F + C * C + H * H || 1e-12,
    e = ((V - r[0]) * F + (D - r[1]) * C + (S - r[2]) * H) / a;
  return ((e = e < 0 ? 0 : e > 1 ? 1 : e), [r[0] + e * F, r[1] + e * C, r[2] + e * H]);
}
function Un(V, D) {
  let S = V.length / 3,
    r = new Int32Array(S),
    E = new Map(),
    F = 0,
    C = (a) => Math.round(a / D);
  for (let a = 0; a < S; a++) {
    let e = C(V[3 * a]) + ',' + C(V[3 * a + 1]) + ',' + C(V[3 * a + 2]),
      R = E.get(e);
    (R === void 0 && ((R = F++), E.set(e, R)), (r[a] = R));
  }
  let H = new Float64Array(3 * F);
  for (let Q = 0; Q < S; Q++) H.set([V[3 * Q], V[3 * Q + 1], V[3 * Q + 2]], 3 * r[Q]);
  return { map: r, V: H, m: F };
}
function Wn(V, D, S) {
  let E = [1 / 0, 1 / 0, 1 / 0],
    F = [-1 / 0, -1 / 0, -1 / 0];
  for (let Q = 0; Q < V.length; Q += 3)
    for (let j = 0; j < 3; j++)
      ((E[j] = Math.min(E[j], V[Q + j])), (F[j] = Math.max(F[j], V[Q + j])));
  let C = Math.max(F[0] - E[0], F[1] - E[1], F[2] - E[2], 0.000001) / S,
    H = [0, 1, 2].map((z) => Math.max(1, Math.ceil((F[z] - E[z]) / C) + 1)),
    e = new Map(),
    R = (z, p) => Math.min(H[p] - 1, Math.max(0, Math.floor((z - E[p]) / C)));
  for (let z = 0; z < D.length; z += 3) {
    let p = [1 / 0, 1 / 0, 1 / 0],
      O = [-1 / 0, -1 / 0, -1 / 0];
    for (let J = 0; J < 3; J++)
      for (let Z = 0; Z < 3; Z++) {
        let U = V[3 * D[z + J] + Z];
        ((p[Z] = Math.min(p[Z], U)), (O[Z] = Math.max(O[Z], U)));
      }
    for (let d = R(p[0], 0); d <= R(O[0], 0); d++)
      for (let K = R(p[1], 1); K <= R(O[1], 1); K++)
        for (let T = R(p[2], 2); T <= R(O[2], 2); T++) {
          let A = d + H[0] * (K + H[1] * T),
            X = e.get(A);
          (X || e.set(A, (X = [])), X.push(z));
        }
  }
  return {
    mn: E,
    h: C,
    dims: H,
    cells: e,
    V: V,
    T: D,
    triStamp: new Int32Array(D.length / 3),
    cellStamp: new Map(),
    stamp: 0,
  };
}
function Tn(E, C, H) {
  let { mn: e, h: Q, dims: z, cells: O, V: J, T: Z, triStamp: U, cellStamp: d } = E,
    K = H[0] - C[0],
    T = H[1] - C[1],
    X = H[2] - C[2],
    q = Math.max(1, Math.ceil((2 * Math.hypot(K, T, X)) / Q)),
    P = ++E.stamp;
  for (let Y = 0; Y <= q; Y++) {
    let v = Y / q,
      B = Math.floor((C[0] + v * K - e[0]) / Q),
      G = Math.floor((C[1] + v * T - e[1]) / Q),
      g = Math.floor((C[2] + v * X - e[2]) / Q);
    for (let N = -1; N <= 1; N++)
      for (let i = -1; i <= 1; i++)
        for (let k0 = -1; k0 <= 1; k0++) {
          let k1 = B + N,
            k2 = G + i,
            k3 = g + k0;
          if (k1 < 0 || k2 < 0 || k3 < 0 || k1 >= z[0] || k2 >= z[1] || k3 >= z[2]) continue;
          let k4 = k1 + z[0] * (k2 + z[1] * k3);
          if (d.get(k4) === P) continue;
          d.set(k4, P);
          let k5 = O.get(k4);
          if (k5) {
            for (let k6 of k5)
              if (
                U[k6 / 3] !== P &&
                ((U[k6 / 3] = P), Ln(C, K, T, X, J, 3 * Z[k6], 3 * Z[k6 + 1], 3 * Z[k6 + 2]))
              )
                return !0;
          }
        }
  }
  return !1;
}
function Ln(V, E, C, H, e, Q, j, z) {
  let O = e[j] - e[Q],
    J = e[j + 1] - e[Q + 1],
    Z = e[j + 2] - e[Q + 2],
    U = e[z] - e[Q],
    d = e[z + 1] - e[Q + 1],
    K = e[z + 2] - e[Q + 2],
    T = C * K - H * d,
    X = H * U - E * K,
    q = E * d - C * U,
    P = O * T + J * X + Z * q;
  if (Math.abs(P) < 1e-14) return !1;
  let Y = 1 / P,
    v = V[0] - e[Q],
    B = V[1] - e[Q + 1],
    G = V[2] - e[Q + 2],
    g = (v * T + B * X + G * q) * Y;
  if (g < 0 || g > 1) return !1;
  let N = B * Z - G * J,
    i = G * O - v * Z,
    k0 = v * J - B * O,
    k1 = (E * N + C * i + H * k0) * Y;
  if (k1 < 0 || g + k1 > 1) return !1;
  let k2 = (U * N + d * i + K * k0) * Y;
  return k2 > 0.001 && k2 < 0.999;
}
function rn(
  { positions: E, index: e, bones: J },
  {
    cutoff: d = 0.01,
    tol: v = 0.001,
    maxIter: k0 = 3000,
    exclude: k1 = null,
    link: k2 = 0,
    linkWeight: k3 = 4,
    onProgress: k4 = null,
  } = {},
) {
  let k5 = Date.now(),
    k6 = E.length / 3,
    k7 = J.length,
    { map: k8, V: k9, m: kk } = Un(E, 0.00001),
    kw = [];
  for (let kW = 0; kW < e.length; kW += 3) {
    if (k1 && (k1[e[kW]] || k1[e[kW + 1]] || k1[e[kW + 2]])) continue;
    let kq = k8[e[kW]],
      kP = k8[e[kW + 1]],
      kY = k8[e[kW + 2]];
    kq !== kP && kP !== kY && kq !== kY && kw.push(kq, kP, kY);
  }
  let kV = Uint32Array.from(kw),
    kD = new Uint8Array(kk);
  for (let kv = 0; kv < k6; kv++) k1?.[kv] || (kD[k8[kv]] = 1);
  let km = new Float64Array(kk),
    kS = new Map(),
    kr = (kB, kG, kg) => {
      let kI = kB < kG ? kB * kk + kG : kG * kk + kB;
      kS.set(kI, (kS.get(kI) ?? 0) + kg);
    };
  for (let kB = 0; kB < kV.length; kB += 3) {
    let kG = [kV[kB], kV[kB + 1], kV[kB + 2]],
      kg = kG.map((kM) => [k9[3 * kM], k9[3 * kM + 1], k9[3 * kM + 2]]),
      kI = (kM, w0) => [kM[0] - w0[0], kM[1] - w0[1], kM[2] - w0[2]],
      kh = (kM, w0) => [
        kM[1] * w0[2] - kM[2] * w0[1],
        kM[2] * w0[0] - kM[0] * w0[2],
        kM[0] * w0[1] - kM[1] * w0[0],
      ],
      kN = (kM, w0) => kM[0] * w0[0] + kM[1] * w0[1] + kM[2] * w0[2],
      ki = Math.hypot(...kh(kI(kg[1], kg[0]), kI(kg[2], kg[0])));
    if (!(ki < 1e-14)) {
      for (let kM = 0; kM < 3; kM++) km[kG[kM]] += ki / 6;
      for (let w0 = 0; w0 < 3; w0++) {
        let w1 = kI(kg[(w0 + 1) % 3], kg[w0]),
          w2 = kI(kg[(w0 + 2) % 3], kg[w0]);
        kr(
          kG[(w0 + 1) % 3],
          kG[(w0 + 2) % 3],
          Math.max(0, (0.5 * kN(w1, w2)) / Math.hypot(...kh(w1, w2))),
        );
      }
    }
  }
  let kE = 0;
  if (k2 > 0) {
    let w3 = Int32Array.from({ length: kk }, (w7, w8) => w8),
      w4 = (w7) => {
        for (; w3[w7] !== w7;) w7 = w3[w7] = w3[w3[w7]];
        return w7;
      };
    for (let w7 = 0; w7 < kV.length; w7 += 3)
      ((w3[w4(kV[w7])] = w4(kV[w7 + 1])), (w3[w4(kV[w7 + 1])] = w4(kV[w7 + 2])));
    let w5 = new Map(),
      w6 = (w8, w9, wk) =>
        Math.floor(w8 / k2) + ',' + Math.floor(w9 / k2) + ',' + Math.floor(wk / k2);
    for (let w8 = 0; w8 < kk; w8++)
      if (kD[w8] && km[w8] > 0) {
        let w9 = w6(k9[3 * w8], k9[3 * w8 + 1], k9[3 * w8 + 2]),
          wk = w5.get(w9);
        (wk || w5.set(w9, (wk = [])), wk.push(w8));
      }
    for (let ww = 0; ww < kk; ww++) {
      if (!kD[ww] || !(km[ww] > 0)) continue;
      let wV = k9[3 * ww],
        wD = k9[3 * ww + 1],
        wm = k9[3 * ww + 2],
        wS = Math.floor(wV / k2),
        wr = Math.floor(wD / k2),
        wE = Math.floor(wm / k2),
        wF = w4(ww),
        wC = k2,
        ws = -1;
      for (let wH = -1; wH <= 1; wH++)
        for (let wa = -1; wa <= 1; wa++)
          for (let we = -1; we <= 1; we++)
            for (let wR of w5.get(wS + wH + ',' + (wr + wa) + ',' + (wE + we)) ?? []) {
              if (w4(wR) === wF) continue;
              let wl = Math.hypot(wV - k9[3 * wR], wD - k9[3 * wR + 1], wm - k9[3 * wR + 2]);
              wl < wC && ((wC = wl), (ws = wR));
            }
      ws >= 0 && (kr(ww, ws, k3), kE++);
    }
  }
  let kF = new Uint32Array(kk);
  for (let wQ of kS.keys()) (kF[Math.floor(wQ / kk)]++, kF[wQ % kk]++);
  let kC = new Uint32Array(kk + 1);
  for (let wc = 0; wc < kk; wc++) kC[wc + 1] = kC[wc] + kF[wc];
  let kt = new Uint32Array(kC[kk]),
    ks = new Float64Array(kC[kk]),
    kH = kC.slice(0, kk),
    ka = new Float64Array(kk);
  for (let [wj, wz] of kS) {
    let wp = Math.floor(wj / kk),
      wO = wj % kk;
    ((kt[kH[wp]] = wO),
      (ks[kH[wp]++] = -wz),
      (kt[kH[wO]] = wp),
      (ks[kH[wO]++] = -wz),
      (ka[wp] += wz),
      (ka[wO] += wz));
  }
  let ke = Date.now(),
    kR = Wn(k9, kV, 64),
    kl = new Float64Array(3 * kk);
  for (let wf = 0; wf < kV.length; wf += 3) {
    let wJ = 3 * kV[wf],
      wZ = 3 * kV[wf + 1],
      wU = 3 * kV[wf + 2],
      wu = k9[wZ] - k9[wJ],
      wd = k9[wZ + 1] - k9[wJ + 1],
      wK = k9[wZ + 2] - k9[wJ + 2],
      wT = k9[wU] - k9[wJ],
      wA = k9[wU + 1] - k9[wJ + 1],
      wo = k9[wU + 2] - k9[wJ + 2],
      wX = wd * wo - wK * wA,
      wL = wK * wT - wu * wo,
      wb = wu * wA - wd * wT;
    for (let wx of [wJ, wZ, wU]) ((kl[wx] += wX), (kl[wx + 1] += wL), (kl[wx + 2] += wb));
  }
  let kQ = new Int32Array(kk).fill(-1),
    kc = new Float64Array(kk),
    kj = 0,
    kz = J.map(() => [0, 0, null]);
  for (let wy = 0; wy < kk; wy++) {
    if (!kD[wy]) continue;
    let wW = k9[3 * wy],
      wq = k9[3 * wy + 1],
      wP = k9[3 * wy + 2],
      wY = Math.hypot(kl[3 * wy], kl[3 * wy + 1], kl[3 * wy + 2]) || 1,
      wv = [
        wW - (0.0001 * kl[3 * wy]) / wY,
        wq - (0.0001 * kl[3 * wy + 1]) / wY,
        wP - (0.0001 * kl[3 * wy + 2]) / wY,
      ];
    for (let wI = 0; wI < k7; wI++) {
      let wh = On(wW, wq, wP, J[wI].head, J[wI].tail);
      ((kz[wI][0] = wI),
        (kz[wI][1] = Math.hypot(wh[0] - wW, wh[1] - wq, wh[2] - wP)),
        (kz[wI][2] = wh));
    }
    let wB = kz.slice().sort((wN, wi) => wN[1] - wi[1]),
      wG = -1,
      wg = 0;
    for (let wN = 0; wN < Math.min(wB.length, 6); wN++)
      if (!Tn(kR, wv, wB[wN][2])) {
        ((wG = wB[wN][0]), (wg = wB[wN][1]));
        break;
      }
    (wG < 0 && (kj++, (wG = wB[0][0]), (wg = wB[0][1])),
      (kQ[wy] = wG),
      (kc[wy] = 1 / Math.max(wg * wg, 1e-8)));
  }
  let kp = Date.now(),
    kO = new Float64Array(kk);
  for (let wi = 0; wi < kk; wi++) kO[wi] = ka[wi] + km[wi] * kc[wi] || 1;
  let kf = (wM, V0) => {
      for (let V1 = 0; V1 < kk; V1++) {
        let V2 = kO[V1] * wM[V1];
        for (let V3 = kC[V1]; V3 < kC[V1 + 1]; V3++) V2 += ks[V3] * wM[kt[V3]];
        V0[V1] = V2;
      }
    },
    kJ = new Int32Array(4 * kk).fill(-1),
    kZ = new Float32Array(4 * kk),
    kU = (wM, V0, V1) => {
      let V2 = 3;
      if (!(V1 <= kZ[4 * wM + 3])) {
        for (; V2 > 0 && kZ[4 * wM + V2 - 1] < V1;)
          ((kZ[4 * wM + V2] = kZ[4 * wM + V2 - 1]), (kJ[4 * wM + V2] = kJ[4 * wM + V2 - 1]), V2--);
        ((kZ[4 * wM + V2] = V1), (kJ[4 * wM + V2] = V0));
      }
    },
    ku = new Float64Array(kk),
    kd = new Float64Array(kk),
    kK = new Float64Array(kk),
    kT = new Float64Array(kk),
    kA = new Float64Array(kk),
    ko = new Float64Array(kk),
    kX = 0,
    kL = 0;
  for (let wM = 0; wM < k7; wM++) {
    let V0 = !1;
    for (let V4 = 0; V4 < kk; V4++) {
      let V5 = kQ[V4] === wM;
      ((ko[V4] = V5 ? km[V4] * kc[V4] : 0), (kA[V4] = V5 ? 1 : 0), (V0 ||= V5));
    }
    if (!V0) continue;
    (kL++, kf(kA, kT));
    let V1 = 0,
      V2 = 0;
    for (let V6 = 0; V6 < kk; V6++)
      ((ku[V6] = ko[V6] - kT[V6]),
        (kd[V6] = ku[V6] / kO[V6]),
        (kK[V6] = kd[V6]),
        (V1 += ko[V6] * ko[V6]),
        (V2 += ku[V6] * kd[V6]));
    V1 = Math.sqrt(V1);
    let V3 = 0;
    for (; V3 < k0; V3++) {
      kf(kK, kT);
      let V7 = 0;
      for (let VV = 0; VV < kk; VV++) V7 += kK[VV] * kT[VV];
      let V8 = V2 / V7,
        V9 = 0;
      for (let VD = 0; VD < kk; VD++)
        ((kA[VD] += V8 * kK[VD]), (ku[VD] -= V8 * kT[VD]), (V9 += ku[VD] * ku[VD]));
      if (Math.sqrt(V9) < v * V1) break;
      let Vk = 0;
      for (let Vm = 0; Vm < kk; Vm++) ((kd[Vm] = ku[Vm] / kO[Vm]), (Vk += ku[Vm] * kd[Vm]));
      let Vw = Vk / V2;
      V2 = Vk;
      for (let VS = 0; VS < kk; VS++) kK[VS] = kd[VS] + Vw * kK[VS];
    }
    kX += V3;
    for (let Vr = 0; Vr < kk; Vr++) kA[Vr] > d && kU(Vr, wM, kA[Vr]);
    k4?.(wM + 1, k7);
  }
  let kb = Date.now(),
    kx = new Uint16Array(4 * k6),
    ky = new Float32Array(4 * k6);
  for (let VE = 0; VE < k6; VE++) {
    let VF = k8[VE];
    if (k1?.[VE]) continue;
    let VC = 0;
    for (let Vt = 0; Vt < 4; Vt++) kJ[4 * VF + Vt] >= 0 && (VC += kZ[4 * VF + Vt]);
    if (VC <= 0) {
      ((kx[4 * VE] = Math.max(0, kQ[VF])), (ky[4 * VE] = 1));
      continue;
    }
    for (let Vs = 0; Vs < 4; Vs++)
      kJ[4 * VF + Vs] < 0 ||
        ((kx[4 * VE + Vs] = kJ[4 * VF + Vs]), (ky[4 * VE + Vs] = kZ[4 * VF + Vs] / VC));
  }
  return {
    index: kx,
    weight: ky,
    stats: {
      vertices: k6,
      welded: kk,
      unseen: kj,
      links: kE,
      bones: kL,
      iterations: Math.round(kX / Math.max(1, kL)),
      ms: { surface: ke - k5, visibility: kp - ke, solve: kb - kp, total: Date.now() - k5 },
    },
  };
}
var mn = /^(thumb|index|middle|ring|pinky)_/,
  nn = ['torso', 'arm_l', 'arm_r', 'hand_l', 'hand_r', 'leg_l', 'leg_r'];
function tn(V) {
  let D = /_([lr])$/.exec(V)?.[1];
  return /^(upperarm|lowerarm)_/.test(V)
    ? 'arm_' + D
    : /^hand_/.test(V) || mn.test(V)
      ? 'hand_' + D
      : /^(thigh|calf|foot|ball)_/.test(V)
        ? 'leg_' + D
        : 'torso';
}
function cn(V, D) {
  let S = tn(V),
    r = tn(D);
  if (S === r) return 'join';
  let E = (C, H) =>
      S.startsWith(C) && r.startsWith(H)
        ? [V, D, S, r]
        : r.startsWith(C) && S.startsWith(H)
          ? [D, V, r, S]
          : null,
    F;
  if ((F = E('torso', 'arm'))) {
    let [C, H, , a] = F;
    return /^upperarm_/.test(H) &&
      (C === 'spine_03' || C === 'neck_01' || C === 'clavicle_' + a.slice(-1))
      ? 'join'
      : 'cut';
  }
  if ((F = E('torso', 'leg'))) {
    let [e, R] = F;
    return /^thigh_/.test(R)
      ? e === 'pelvis'
        ? 'join'
        : e === 'spine_01' || e === 'spine_02'
          ? 'evidence'
          : 'cut'
      : 'cut';
  }
  return (F = E('arm', 'hand'))
    ? F[2].slice(-1) === F[3].slice(-1) && /^lowerarm_/.test(F[0])
      ? 'join'
      : 'cut'
    : E('leg', 'leg')
      ? 'evidence'
      : 'cut';
}
function qn(E, e, O, J, U, d, K, T, P, Y, v, B) {
  let G = K - J,
    g = T - U,
    N = P - d,
    i = Y - J,
    k0 = v - U,
    k1 = B - d,
    k2 = E - J,
    k3 = e - U,
    k4 = O - d,
    k5 = G * k2 + g * k3 + N * k4,
    k6 = i * k2 + k0 * k3 + k1 * k4,
    k7 = (ke, kR, kl) => (E - ke) * (E - ke) + (e - kR) * (e - kR) + (O - kl) * (O - kl);
  if (k5 <= 0 && k6 <= 0) return k7(J, U, d);
  let k8 = E - K,
    k9 = e - T,
    kk = O - P,
    kw = G * k8 + g * k9 + N * kk,
    kV = i * k8 + k0 * k9 + k1 * kk;
  if (kw >= 0 && kV <= kw) return k7(K, T, P);
  let kD = k5 * kV - kw * k6;
  if (kD <= 0 && k5 >= 0 && kw <= 0) {
    let ke = k5 / (k5 - kw);
    return k7(J + ke * G, U + ke * g, d + ke * N);
  }
  let km = E - Y,
    kS = e - v,
    kr = O - B,
    kE = G * km + g * kS + N * kr,
    kF = i * km + k0 * kS + k1 * kr;
  if (kF >= 0 && kE <= kF) return k7(Y, v, B);
  let kC = kE * k6 - k5 * kF;
  if (kC <= 0 && k6 >= 0 && kF <= 0) {
    let kR = k6 / (k6 - kF);
    return k7(J + kR * i, U + kR * k0, d + kR * k1);
  }
  let kt = kw * kF - kE * kV;
  if (kt <= 0 && kV - kw >= 0 && kE - kF >= 0) {
    let kl = (kV - kw) / (kV - kw + (kE - kF));
    return k7(K + kl * (Y - K), T + kl * (v - T), P + kl * (B - P));
  }
  let ks = 1 / (kt + kC + kD),
    kH = kC * ks,
    ka = kD * ks;
  return k7(J + G * kH + i * ka, U + g * kH + k0 * ka, d + N * kH + k1 * ka);
}
function Nn(S, E, { leaf: H = 8, beta: e = 2 } = {}) {
  let Q = E.length / 3,
    z = new Float64Array(9 * Q),
    O = new Float64Array(3 * Q),
    J = new Float64Array(3 * Q),
    Z = new Float64Array(Q);
  for (let i = 0; i < Q; i++) {
    for (let k7 = 0; k7 < 3; k7++)
      for (let k8 = 0; k8 < 3; k8++) z[9 * i + 3 * k7 + k8] = S[3 * E[3 * i + k7] + k8];
    let k0 = 9 * i,
      k1 = z[k0 + 3] - z[k0],
      k2 = z[k0 + 4] - z[k0 + 1],
      k3 = z[k0 + 5] - z[k0 + 2],
      k4 = z[k0 + 6] - z[k0],
      k5 = z[k0 + 7] - z[k0 + 1],
      k6 = z[k0 + 8] - z[k0 + 2];
    ((J[3 * i] = 0.5 * (k2 * k6 - k3 * k5)),
      (J[3 * i + 1] = 0.5 * (k3 * k4 - k1 * k6)),
      (J[3 * i + 2] = 0.5 * (k1 * k5 - k2 * k4)),
      (Z[i] = Math.hypot(J[3 * i], J[3 * i + 1], J[3 * i + 2])));
    for (let k9 = 0; k9 < 3; k9++)
      O[3 * i + k9] = (z[k0 + k9] + z[k0 + 3 + k9] + z[k0 + 6 + k9]) / 3;
  }
  let U = Int32Array.from({ length: Q }, (kk, kw) => kw),
    d = Math.max(16, Math.ceil((4 * Q) / H) + 16),
    K = new Int32Array(d),
    T = new Int32Array(d),
    X = new Int32Array(d).fill(-1),
    q = new Int32Array(d).fill(-1),
    P = new Float64Array(3 * d),
    Y = new Float64Array(3 * d),
    v = new Float64Array(d),
    B = 0,
    G = (kk, kw) => {
      let kV = B++;
      ((K[kV] = kk), (T[kV] = kw - kk));
      let kD = 0,
        km = 0,
        kS = 0,
        kr = 0,
        kE = 0,
        kF = 0,
        kC = 0,
        kt = [1 / 0, 1 / 0, 1 / 0],
        ks = [-1 / 0, -1 / 0, -1 / 0];
      for (let kQ = kk; kQ < kw; kQ++) {
        let kc = U[kQ],
          kj = Z[kc];
        ((kD += kj),
          (km += kj * O[3 * kc]),
          (kS += kj * O[3 * kc + 1]),
          (kr += kj * O[3 * kc + 2]),
          (kE += J[3 * kc]),
          (kF += J[3 * kc + 1]),
          (kC += J[3 * kc + 2]));
        for (let kz = 0; kz < 3; kz++)
          ((kt[kz] = Math.min(kt[kz], O[3 * kc + kz])),
            (ks[kz] = Math.max(ks[kz], O[3 * kc + kz])));
      }
      kD > 0
        ? ((km /= kD), (kS /= kD), (kr /= kD))
        : ((km = (kt[0] + ks[0]) / 2), (kS = (kt[1] + ks[1]) / 2), (kr = (kt[2] + ks[2]) / 2));
      let kH = 0;
      for (let kp = kk; kp < kw; kp++) {
        let kO = 9 * U[kp];
        for (let kf = 0; kf < 3; kf++)
          kH = Math.max(
            kH,
            (z[kO + 3 * kf] - km) ** 2 +
              (z[kO + 3 * kf + 1] - kS) ** 2 +
              (z[kO + 3 * kf + 2] - kr) ** 2,
          );
      }
      if (
        ((P[3 * kV] = km),
        (P[3 * kV + 1] = kS),
        (P[3 * kV + 2] = kr),
        (Y[3 * kV] = kE),
        (Y[3 * kV + 1] = kF),
        (Y[3 * kV + 2] = kC),
        (v[kV] = kH * e * e),
        kw - kk <= H)
      )
        return kV;
      let ka = 0;
      for (let kJ = 1; kJ < 3; kJ++) ks[kJ] - kt[kJ] > ks[ka] - kt[ka] && (ka = kJ);
      U.subarray(kk, kw).sort((kZ, kU) => O[3 * kZ + ka] - O[3 * kU + ka]);
      let ke = (kk + kw) >> 1,
        kR = G(kk, ke),
        kl = G(ke, kw);
      return ((X[kV] = kR), (q[kV] = kl), kV);
    };
  Q && G(0, Q);
  let g = new Float64Array(9 * Q);
  for (let kk = 0; kk < Q; kk++) g.set(z.subarray(9 * U[kk], 9 * U[kk] + 9), 9 * kk);
  let N = new Int32Array(256);
  return {
    at: (kw, kV, kD) => {
      if (!Q) return 0;
      let km = 0,
        kS = 0;
      for (N[km++] = 0; km;) {
        let kr = N[--km],
          kE = P[3 * kr] - kw,
          kF = P[3 * kr + 1] - kV,
          kC = P[3 * kr + 2] - kD,
          kt = kE * kE + kF * kF + kC * kC;
        if (kt > v[kr]) {
          kS += (kE * Y[3 * kr] + kF * Y[3 * kr + 1] + kC * Y[3 * kr + 2]) / (kt * Math.sqrt(kt));
          continue;
        }
        if (X[kr] < 0) {
          for (let ks = K[kr], kH = K[kr] + T[kr]; ks < kH; ks++) {
            let ka = 9 * ks,
              ke = g[ka] - kw,
              kR = g[ka + 1] - kV,
              kl = g[ka + 2] - kD,
              kQ = g[ka + 3] - kw,
              kc = g[ka + 4] - kV,
              kj = g[ka + 5] - kD,
              kz = g[ka + 6] - kw,
              kp = g[ka + 7] - kV,
              kO = g[ka + 8] - kD,
              kf = Math.hypot(ke, kR, kl),
              kJ = Math.hypot(kQ, kc, kj),
              kZ = Math.hypot(kz, kp, kO),
              kU = ke * (kc * kO - kj * kp) + kR * (kj * kz - kQ * kO) + kl * (kQ * kp - kc * kz),
              ku =
                kf * kJ * kZ +
                (ke * kQ + kR * kc + kl * kj) * kZ +
                (kQ * kz + kc * kp + kj * kO) * kf +
                (kz * ke + kp * kR + kO * kl) * kJ;
            kS += 2 * Math.atan2(kU, ku);
          }
          continue;
        }
        ((N[km++] = X[kr]), (N[km++] = q[kr]));
      }
      return kS / (4 * Math.PI);
    },
    nodes: B,
  };
}
function pn(
  { positions: k0, index: k1, bones: k2, height: k3 },
  { exclude: k4 = null, h: k5 = k3 / 220, band: k6 = 1.25 * k5 } = {},
) {
  let k7 = Date.now(),
    k8 = k0.length / 3,
    k9 = new Int32Array(k8),
    kk = new Map(),
    kw = 0;
  for (let wf = 0; wf < k8; wf++) {
    let wJ =
        Math.round(k0[3 * wf] * 100000) +
        ',' +
        Math.round(k0[3 * wf + 1] * 100000) +
        ',' +
        Math.round(k0[3 * wf + 2] * 100000),
      wZ = kk.get(wJ);
    (wZ === void 0 && ((wZ = kw++), kk.set(wJ, wZ)), (k9[wf] = wZ));
  }
  let kV = new Float64Array(3 * kw);
  for (let wU = 0; wU < k8; wU++)
    for (let wu = 0; wu < 3; wu++) kV[3 * k9[wU] + wu] = k0[3 * wU + wu];
  let kD = [];
  for (let wd = 0; wd < k1.length; wd += 3) {
    if (k4 && (k4[k1[wd]] || k4[k1[wd + 1]] || k4[k1[wd + 2]])) continue;
    let wK = k9[k1[wd]],
      wT = k9[k1[wd + 1]],
      wA = k9[k1[wd + 2]];
    wK !== wT && wT !== wA && wK !== wA && kD.push(wK, wT, wA);
  }
  let km = Uint32Array.from(kD),
    kS = km.length / 3,
    kr = Int32Array.from({ length: kw }, (wo, wX) => wX),
    kE = (wo) => {
      for (; kr[wo] !== wo;) wo = kr[wo] = kr[kr[wo]];
      return wo;
    };
  for (let wo = 0; wo < km.length; wo += 3)
    ((kr[kE(km[wo])] = kE(km[wo + 1])), (kr[kE(km[wo + 1])] = kE(km[wo + 2])));
  let kF = new Map(),
    kC = [0, 0, 0];
  for (let wX = 0; wX < kw; wX++)
    for (let wL = 0; wL < 3; wL++) kC[wL] += kV[3 * wX + wL] / Math.max(1, kw);
  for (let wb = 0; wb < km.length; wb += 3) {
    let wx = 3 * km[wb],
      wy = 3 * km[wb + 1],
      wW = 3 * km[wb + 2],
      wq = kV[wx] - kC[0],
      wP = kV[wx + 1] - kC[1],
      wY = kV[wx + 2] - kC[2],
      wv = kV[wy] - kC[0],
      wB = kV[wy + 1] - kC[1],
      wG = kV[wy + 2] - kC[2],
      wg = kV[wW] - kC[0],
      wI = kV[wW + 1] - kC[1],
      wh = kV[wW + 2] - kC[2],
      wN = kE(km[wb]);
    kF.set(
      wN,
      (kF.get(wN) ?? 0) +
        wq * (wB * wh - wG * wI) +
        wP * (wG * wg - wv * wh) +
        wY * (wv * wI - wB * wg),
    );
  }
  let ks = 0;
  for (let wi of kF.values()) wi < 0 && ks++;
  for (let wM = 0; wM < km.length; wM += 3)
    if (kF.get(kE(km[wM])) < 0) {
      let V0 = km[wM + 1];
      ((km[wM + 1] = km[wM + 2]), (km[wM + 2] = V0));
    }
  let kH = kF.size,
    ka = [1 / 0, 1 / 0, 1 / 0],
    ke = [-1 / 0, -1 / 0, -1 / 0];
  for (let V1 = 0; V1 < km.length; V1++)
    for (let V2 = 0; V2 < 3; V2++) {
      let V3 = kV[3 * km[V1] + V2];
      ((ka[V2] = Math.min(ka[V2], V3)), (ke[V2] = Math.max(ke[V2], V3)));
    }
  let kR = k6 + 2 * k5,
    kl = [0, 1, 2].map((V4) => Math.ceil((ke[V4] - ka[V4] + 2 * kR) / k5) + 1);
  for (; kl[0] * kl[1] * kl[2] > 40000000;)
    ((k5 *= 1.2),
      (k6 *= 1.2),
      (kl = [0, 1, 2].map((V4) => Math.ceil((ke[V4] - ka[V4] + 2 * (k6 + 2 * k5)) / k5) + 1)));
  let [kQ, kc, kj] = kl,
    kz = kQ * kc,
    kp = kz * kj,
    kO = [ka[0] - (k6 + 2 * k5), ka[1] - (k6 + 2 * k5), ka[2] - (k6 + 2 * k5)],
    kf = (V4) => kO[0] + V4 * k5,
    kJ = (V4) => kO[1] + V4 * k5,
    kZ = (V4) => kO[2] + V4 * k5,
    kU = 4,
    ku = Math.ceil(kQ / kU),
    kd = Math.ceil(kc / kU),
    kK = Math.ceil(kj / kU),
    kT = new Uint8Array(kp),
    kA = new Uint8Array(ku * kd * kK),
    ko = k6 * k6;
  for (let V4 = 0; V4 < km.length; V4 += 3) {
    let V5 = 3 * km[V4],
      V6 = 3 * km[V4 + 1],
      V7 = 3 * km[V4 + 2],
      V8 = Math.max(0, Math.ceil((Math.min(kV[V5], kV[V6], kV[V7]) - k6 - kO[0]) / k5)),
      V9 = Math.min(kQ - 1, Math.floor((Math.max(kV[V5], kV[V6], kV[V7]) + k6 - kO[0]) / k5)),
      Vk = Math.max(0, Math.ceil((Math.min(kV[V5 + 1], kV[V6 + 1], kV[V7 + 1]) - k6 - kO[1]) / k5)),
      Vw = Math.min(
        kc - 1,
        Math.floor((Math.max(kV[V5 + 1], kV[V6 + 1], kV[V7 + 1]) + k6 - kO[1]) / k5),
      ),
      VV = Math.max(0, Math.ceil((Math.min(kV[V5 + 2], kV[V6 + 2], kV[V7 + 2]) - k6 - kO[2]) / k5)),
      VD = Math.min(
        kj - 1,
        Math.floor((Math.max(kV[V5 + 2], kV[V6 + 2], kV[V7 + 2]) + k6 - kO[2]) / k5),
      );
    for (let Vm = VV; Vm <= VD; Vm++)
      for (let VS = Vk; VS <= Vw; VS++)
        for (let Vr = V8; Vr <= V9; Vr++) {
          let VE = Vr + kQ * VS + kz * Vm;
          kT[VE] ||
            (qn(
              kf(Vr),
              kJ(VS),
              kZ(Vm),
              kV[V5],
              kV[V5 + 1],
              kV[V5 + 2],
              kV[V6],
              kV[V6 + 1],
              kV[V6 + 2],
              kV[V7],
              kV[V7 + 1],
              kV[V7 + 2],
            ) < ko &&
              (kT[VE] = 1));
        }
    for (let VF = Math.floor(VV / kU); VF <= Math.floor(VD / kU); VF++)
      for (let VC = Math.floor(Vk / kU); VC <= Math.floor(Vw / kU); VC++)
        for (let Vs = Math.floor(V8 / kU); Vs <= Math.floor(V9 / kU); Vs++)
          kA[Vs + ku * (VC + kd * VF)] = 1;
  }
  let kX = Date.now(),
    kL = Nn(kV, km),
    kb = 0;
  for (let VH = 0; VH < kK; VH++)
    for (let Va = 0; Va < kd; Va++)
      for (let Ve = 0; Ve < ku; Ve++) {
        let VR = Ve * kU,
          Vl = Va * kU,
          VQ = VH * kU,
          Vc = Math.min(kQ, VR + kU),
          Vj = Math.min(kc, Vl + kU),
          Vz = Math.min(kj, VQ + kU);
        if (!kA[Ve + ku * (Va + kd * VH)]) {
          if (
            (kb++,
            Math.abs(kL.at(kf((VR + Vc - 1) / 2), kJ((Vl + Vj - 1) / 2), kZ((VQ + Vz - 1) / 2))) <
              0.5)
          )
            continue;
          for (let Vp = VQ; Vp < Vz; Vp++)
            for (let VO = Vl; VO < Vj; VO++)
              kT.fill(2, VR + kQ * VO + kz * Vp, Vc + kQ * VO + kz * Vp);
          continue;
        }
        for (let Vf = VQ; Vf < Vz; Vf++)
          for (let VJ = Vl; VJ < Vj; VJ++)
            for (let VZ = VR; VZ < Vc; VZ++) {
              let VU = VZ + kQ * VJ + kz * Vf;
              kT[VU] || (kb++, Math.abs(kL.at(kf(VZ), kJ(VJ), kZ(Vf))) >= 0.5 && (kT[VU] = 2));
            }
      }
  let kx = Date.now(),
    ky = (Vu, Vd, VK) => {
      let VT = Math.round((Vu - kO[0]) / k5),
        VA = Math.round((Vd - kO[1]) / k5),
        Vo = Math.round((VK - kO[2]) / k5);
      return VT < 0 || VA < 0 || Vo < 0 || VT >= kQ || VA >= kc || Vo >= kj
        ? -1
        : VT + kQ * VA + kz * Vo;
    },
    kW = k2.map((Vu, Vd) => Vd),
    kq = kW.length,
    kP = Int32Array.from(k2, (Vu) =>
      mn.test(Vu.name) ? k2.findIndex((Vd) => Vd.name === 'hand_' + Vu.name.slice(-1)) : -1,
    ).map((Vu, Vd) => (Vu >= 0 ? Vu : Vd)),
    kY = new Float64Array(kq);
  for (let Vu = 0; Vu < kq; Vu++) {
    let Vd = k2[kW[Vu]],
      VK = [Vd.tail[0] - Vd.head[0], Vd.tail[1] - Vd.head[1], Vd.tail[2] - Vd.head[2]],
      VT = Math.hypot(...VK) || 1;
    for (let Vx = 0; Vx < 3; Vx++) VK[Vx] /= VT;
    let VA = Math.abs(VK[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0],
      Vo = [
        VK[1] * VA[2] - VK[2] * VA[1],
        VK[2] * VA[0] - VK[0] * VA[2],
        VK[0] * VA[1] - VK[1] * VA[0],
      ],
      VX = Math.hypot(...Vo);
    for (let Vy = 0; Vy < 3; Vy++) Vo[Vy] /= VX;
    let VL = [
        VK[1] * Vo[2] - VK[2] * Vo[1],
        VK[2] * Vo[0] - VK[0] * Vo[2],
        VK[0] * Vo[1] - VK[1] * Vo[0],
      ],
      Vb = [];
    for (let VW of [0.25, 0.5, 0.75]) {
      let Vq = [
        Vd.head[0] + VW * VT * VK[0],
        Vd.head[1] + VW * VT * VK[1],
        Vd.head[2] + VW * VT * VK[2],
      ];
      for (let VP = 0; VP < 16; VP++) {
        let VY = (VP * Math.PI) / 8,
          Vv = [0, 1, 2].map((Vg) => Math.cos(VY) * Vo[Vg] + Math.sin(VY) * VL[Vg]),
          VB = !1,
          VG = -1;
        for (let Vg = 0; Vg * k5 * 0.5 < 0.4 * k3; Vg++) {
          let VI = Vg * k5 * 0.5,
            Vh = ky(Vq[0] + VI * Vv[0], Vq[1] + VI * Vv[1], Vq[2] + VI * Vv[2]);
          if (Vh >= 0 && kT[Vh] > 0) VB = !0;
          else {
            if (VB) {
              VG = VI;
              break;
            } else {
              if (VI > 0.1 * k3) break;
            }
          }
        }
        VG > 0 && Vb.push(VG);
      }
    }
    (Vb.sort((VN, Vi) => VN - Vi),
      (kY[Vu] = Math.max(2 * k5, 0.012 * k3, Vb.length ? Vb[Vb.length >> 1] : 0)));
  }
  let kv = new Float64Array(3 * kq),
    kB = new Float64Array(3 * kq),
    kG = new Float64Array(kq);
  for (let VN = 0; VN < kq; VN++) {
    let Vi = k2[kW[VN]];
    for (let VM = 0; VM < 3; VM++)
      ((kv[3 * VN + VM] = Vi.head[VM]), (kB[3 * VN + VM] = Vi.tail[VM] - Vi.head[VM]));
    kG[VN] = kB[3 * VN] ** 2 + kB[3 * VN + 1] ** 2 + kB[3 * VN + 2] ** 2 || 1e-12;
  }
  let kg = new Int8Array(kp).fill(-1),
    kI = 0;
  for (let D0 = 0; D0 < kj; D0++)
    for (let D1 = 0; D1 < kc; D1++)
      for (let D2 = 0; D2 < kQ; D2++) {
        let D3 = D2 + kQ * D1 + kz * D0;
        if (!kT[D3]) continue;
        kI++;
        let D4 = kf(D2),
          D5 = kJ(D1),
          D6 = kZ(D0),
          D7 = 1 / 0,
          D8 = 0;
        for (let D9 = 0; D9 < kq; D9++) {
          let Dk = D4 - kv[3 * D9],
            Dw = D5 - kv[3 * D9 + 1],
            DV = D6 - kv[3 * D9 + 2],
            DD = (Dk * kB[3 * D9] + Dw * kB[3 * D9 + 1] + DV * kB[3 * D9 + 2]) / kG[D9];
          DD = DD < 0 ? 0 : DD > 1 ? 1 : DD;
          let Dm = Dk - DD * kB[3 * D9],
            DS = Dw - DD * kB[3 * D9 + 1],
            Dr = DV - DD * kB[3 * D9 + 2],
            DE = (Dm * Dm + DS * DS + Dr * Dr) / (kY[D9] * kY[D9]);
          DE < D7 && ((D7 = DE), (D8 = D9));
        }
        kg[D3] = kP[D8];
      }
  let kh = Date.now(),
    kN = new Uint8Array(kq * kq);
  for (let DF = 0; DF < kq; DF++)
    for (let DC = 0; DC < kq; DC++)
      kN[DF * kq + DC] = { join: 0, cut: 1, evidence: 2 }[cn(k2[kW[DF]].name, k2[kW[DC]].name)];
  let ki = [
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
    kM = new Uint8Array(kp),
    w0 = [];
  for (let Ds = 0; Ds < kj; Ds++)
    for (let DH = 0; DH < kc; DH++)
      for (let Da = 0; Da < kQ; Da++) {
        let De = Da + kQ * DH + kz * Ds;
        if (!kT[De]) continue;
        let DR = kg[De];
        for (let [Dl, DQ, Dc] of ki) {
          let Dj = Da + Dl,
            Dz = DH + DQ,
            Dp = Ds + Dc;
          if (Dj < 0 || Dj >= kQ || Dz >= kc || Dz < 0 || Dp >= kj) continue;
          let DO = Dj + kQ * Dz + kz * Dp;
          if (!kT[DO] || kg[DO] === DR) continue;
          let Df = kN[DR * kq + kg[DO]];
          Df === 1 ? ((kM[De] = 1), (kM[DO] = 1)) : Df === 2 && w0.push(De, DO);
        }
      }
  let w1 = 0;
  if (w0.length) {
    let DJ = new Uint8Array(kp),
      DZ = new Uint8Array(kp),
      DU = (Dd, DK, DT) => {
        let DA = Dd % kQ,
          Do = Math.floor(Dd / kQ) % kc,
          DX = Math.floor(Dd / kz);
        for (let DL = -DK; DL <= DK; DL++)
          for (let Db = -DK; Db <= DK; Db++)
            for (let Dx = -DK; Dx <= DK; Dx++) {
              let Dy = DA + Dx,
                DW = Do + Db,
                Dq = DX + DL;
              Dy >= 0 &&
                DW >= 0 &&
                Dq >= 0 &&
                Dy < kQ &&
                DW < kc &&
                Dq < kj &&
                (DT[Dy + kQ * DW + kz * Dq] = 1);
            }
      };
    for (let Dd of w0) DJ[Dd] || DU(Dd, 2, DJ);
    let Du = (0.003 * k3) / 1.8;
    for (let DK = 0; DK < km.length; DK += 3) {
      let DT = 3 * km[DK],
        DA = 3 * km[DK + 1],
        Do = 3 * km[DK + 2],
        DX = (kV[DT] + kV[DA] + kV[Do]) / 3,
        DL = (kV[DT + 1] + kV[DA + 1] + kV[Do + 1]) / 3,
        Db = (kV[DT + 2] + kV[DA + 2] + kV[Do + 2]) / 3,
        Dx = ky(DX, DL, Db);
      if (Dx < 0 || !DJ[Dx]) continue;
      let Dy = kV[DA] - kV[DT],
        DW = kV[DA + 1] - kV[DT + 1],
        Dq = kV[DA + 2] - kV[DT + 2],
        DP = kV[Do] - kV[DT],
        DY = kV[Do + 1] - kV[DT + 1],
        Dv = kV[Do + 2] - kV[DT + 2],
        DB = DW * Dv - Dq * DY,
        DG = Dq * DP - Dy * Dv,
        Dg = Dy * DY - DW * DP,
        DI = Math.hypot(DB, DG, Dg);
      DI < 1e-14 ||
        ((DB /= DI),
        (DG /= DI),
        (Dg /= DI),
        Math.abs(kL.at(DX + Du * DB, DL + Du * DG, Db + Du * Dg)) >= 0.75 && (w1++, DU(Dx, 2, DZ)));
    }
    for (let Dh = 0; Dh < w0.length; Dh += 2)
      (DZ[w0[Dh]] || DZ[w0[Dh + 1]]) && ((kM[w0[Dh]] = 1), (kM[w0[Dh + 1]] = 1));
  }
  let w2 = 0;
  for (let DN = 0; DN < kp; DN++) kM[DN] && ((kT[DN] = 0), (kg[DN] = -1), w2++);
  let w3 = Date.now(),
    w4 = kQ - 1,
    w5 = (kQ - 1) * (kc - 1),
    w6 = new Map(),
    w7 = [],
    w8 = [],
    w9 = (Di, DM, m0) => {
      let m1 = Di + w4 * DM + w5 * m0,
        m2 = w6.get(m1);
      if (m2 !== void 0) return m2;
      let m3 = 0,
        m4 = 0,
        m5 = 0,
        m6 = 0,
        m7 = (mw, mV, mD) => kT[Di + mw + kQ * (DM + mV) + kz * (m0 + mD)] > 0;
      for (let mw = 0; mw < 2; mw++)
        for (let mV = 0; mV < 2; mV++)
          (m7(0, mw, mV) !== m7(1, mw, mV) && ((m3 += 0.5), (m4 += mw), (m5 += mV), m6++),
            m7(mw, 0, mV) !== m7(mw, 1, mV) && ((m3 += mw), (m4 += 0.5), (m5 += mV), m6++),
            m7(mw, mV, 0) !== m7(mw, mV, 1) && ((m3 += mw), (m4 += mV), (m5 += 0.5), m6++));
      let m8 = new Map(),
        m9 = -1,
        mk = 0;
      for (let mD = 0; mD < 2; mD++)
        for (let mm = 0; mm < 2; mm++)
          for (let mS = 0; mS < 2; mS++) {
            let mr = kg[Di + mD + kQ * (DM + mm) + kz * (m0 + mS)];
            if (mr < 0) continue;
            let mE = (m8.get(mr) ?? 0) + 1;
            (m8.set(mr, mE), mE > mk && ((mk = mE), (m9 = mr)));
          }
      return (
        (m2 = w8.length),
        w7.push(kf(Di + m3 / m6), kJ(DM + m4 / m6), kZ(m0 + m5 / m6)),
        w8.push(m9),
        w6.set(m1, m2),
        m2
      );
    },
    wk = [],
    ww = (Di, DM, m0, m1, m2) => {
      if (m2) {
        let m4 = DM;
        ((DM = m1), (m1 = m4));
      }
      let m3 = (m5, m6) =>
        (w7[3 * m5] - w7[3 * m6]) ** 2 +
        (w7[3 * m5 + 1] - w7[3 * m6 + 1]) ** 2 +
        (w7[3 * m5 + 2] - w7[3 * m6 + 2]) ** 2;
      m3(Di, m0) <= m3(DM, m1) ? wk.push(Di, DM, m0, Di, m0, m1) : wk.push(Di, DM, m1, DM, m0, m1);
    };
  for (let Di = 1; Di < kj - 1; Di++)
    for (let DM = 1; DM < kc - 1; DM++)
      for (let m0 = 1; m0 < kQ - 1; m0++) {
        let m1 = m0 + kQ * DM + kz * Di,
          m2 = kT[m1] > 0;
        (m2 !== kT[m1 + 1] > 0 &&
          ww(w9(m0, DM - 1, Di - 1), w9(m0, DM, Di - 1), w9(m0, DM, Di), w9(m0, DM - 1, Di), !m2),
          m2 !== kT[m1 + kQ] > 0 &&
            ww(w9(m0 - 1, DM, Di - 1), w9(m0 - 1, DM, Di), w9(m0, DM, Di), w9(m0, DM, Di - 1), !m2),
          m2 !== kT[m1 + kz] > 0 &&
            ww(
              w9(m0 - 1, DM - 1, Di),
              w9(m0, DM - 1, Di),
              w9(m0, DM, Di),
              w9(m0 - 1, DM, Di),
              !m2,
            ));
      }
  let wV = w8.length,
    wD = Int32Array.from({ length: wV }, (m3, m4) => m4),
    wm = (m3) => {
      for (; wD[m3] !== m3;) m3 = wD[m3] = wD[wD[m3]];
      return m3;
    };
  for (let m3 = 0; m3 < wk.length; m3 += 3)
    ((wD[wm(wk[m3])] = wm(wk[m3 + 1])), (wD[wm(wk[m3 + 1])] = wm(wk[m3 + 2])));
  let wS = new Map();
  for (let m4 = 0; m4 < wk.length; m4 += 3) {
    let m5 = 3 * wk[m4],
      m6 = 3 * wk[m4 + 1],
      m7 = 3 * wk[m4 + 2],
      m8 = w7[m5] - kC[0],
      m9 = w7[m5 + 1] - kC[1],
      mk = w7[m5 + 2] - kC[2],
      mw = w7[m6] - kC[0],
      mV = w7[m6 + 1] - kC[1],
      mD = w7[m6 + 2] - kC[2],
      mm = w7[m7] - kC[0],
      mS = w7[m7 + 1] - kC[1],
      mr = w7[m7 + 2] - kC[2],
      mE = wm(wk[m4]);
    wS.set(
      mE,
      (wS.get(mE) ?? 0) +
        (m8 * (mV * mr - mD * mS) + m9 * (mD * mm - mw * mr) + mk * (mw * mS - mV * mm)) / 6,
    );
  }
  let wr = 0;
  for (let mF of wS.values()) mF < 0 && wr++;
  let wE = [];
  for (let mC = 0; mC < wk.length; mC += 3)
    wS.get(wm(wk[mC])) > 0 && wE.push(wk[mC], wk[mC + 1], wk[mC + 2]);
  let wF = new Int32Array(wV).fill(-1),
    wC = 0;
  for (let ms of wE) wF[ms] < 0 && (wF[ms] = wC++);
  let ws = new Float64Array(3 * wC),
    wH = new Int16Array(wC);
  for (let mH = 0; mH < wV; mH++)
    if (wF[mH] >= 0) {
      for (let ma = 0; ma < 3; ma++) ws[3 * wF[mH] + ma] = w7[3 * mH + ma];
      wH[wF[mH]] = w8[mH] >= 0 ? kW[w8[mH]] : -1;
    }
  let wa = Uint32Array.from(wE, (me) => wF[me]),
    we = Array.from({ length: wC }, () => new Set());
  for (let me = 0; me < wa.length; me += 3)
    for (let mR = 0; mR < 3; mR++)
      (we[wa[me + mR]].add(wa[me + ((mR + 1) % 3)]), we[wa[me + ((mR + 1) % 3)]].add(wa[me + mR]));
  let wR = we.map((ml) => Int32Array.from(ml)),
    wl = new Float64Array(3 * wC);
  for (let ml = 0; ml < 10; ml++)
    for (let mQ of [0.5, -0.53]) {
      for (let mc = 0; mc < wC; mc++) {
        let mj = wR[mc];
        if (!mj.length) {
          for (let mf = 0; mf < 3; mf++) wl[3 * mc + mf] = ws[3 * mc + mf];
          continue;
        }
        let mz = 0,
          mp = 0,
          mO = 0;
        for (let mJ of mj) ((mz += ws[3 * mJ]), (mp += ws[3 * mJ + 1]), (mO += ws[3 * mJ + 2]));
        ((wl[3 * mc] = ws[3 * mc] + mQ * (mz / mj.length - ws[3 * mc])),
          (wl[3 * mc + 1] = ws[3 * mc + 1] + mQ * (mp / mj.length - ws[3 * mc + 1])),
          (wl[3 * mc + 2] = ws[3 * mc + 2] + mQ * (mO / mj.length - ws[3 * mc + 2])));
      }
      ws.set(wl);
    }
  for (let mZ = 0; mZ < 3; mZ++)
    for (let mU = 0; mU < wC; mU++)
      if (wH[mU] < 0) {
        for (let mu of wR[mU])
          if (wH[mu] >= 0) {
            wH[mU] = wH[mu];
            break;
          }
      }
  let wQ = k2.map((md) => nn.indexOf(tn(md.name))),
    wc = Int32Array.from(wH, (md) => (md >= 0 ? wQ[md] : -1)),
    wj = Date.now(),
    wz = new Float64Array(3 * kw);
  for (let md = 0; md < km.length; md += 3) {
    let mK = 3 * km[md],
      mT = 3 * km[md + 1],
      mA = 3 * km[md + 2],
      mo = kV[mT] - kV[mK],
      mX = kV[mT + 1] - kV[mK + 1],
      mL = kV[mT + 2] - kV[mK + 2],
      mb = kV[mA] - kV[mK],
      mx = kV[mA + 1] - kV[mK + 1],
      my = kV[mA + 2] - kV[mK + 2],
      mW = mX * my - mL * mx,
      mq = mL * mb - mo * my,
      mP = mo * mx - mX * mb;
    for (let mY of [mK, mT, mA]) ((wz[mY] += mW), (wz[mY + 1] += mq), (wz[mY + 2] += mP));
  }
  let wp = new Int16Array(k8).fill(-1),
    wO = new Int16Array(kw).fill(-2);
  for (let mv = 0; mv < k8; mv++) {
    if (k4?.[mv]) continue;
    let mB = k9[mv];
    if (wO[mB] === -2) {
      let mG = Math.hypot(wz[3 * mB], wz[3 * mB + 1], wz[3 * mB + 2]) || 1,
        mg = -1;
      for (let mI of [-1.5, -0.75, 0, 0.75]) {
        let mh = ky(
          kV[3 * mB] + (mI * k5 * wz[3 * mB]) / mG,
          kV[3 * mB + 1] + (mI * k5 * wz[3 * mB + 1]) / mG,
          kV[3 * mB + 2] + (mI * k5 * wz[3 * mB + 2]) / mG,
        );
        if (mh >= 0 && kg[mh] >= 0) {
          mg = kW[kg[mh]];
          break;
        }
      }
      wO[mB] = mg;
    }
    wp[mv] = wO[mB];
  }
  return {
    positions: Float32Array.from(ws),
    index: wa,
    bone: wH,
    region: wc,
    inputBone: wp,
    h: k5,
    stats: {
      pieces: kH,
      turned: ks,
      grid: kQ + '\u00D7' + kc + '\u00D7' + kj,
      h: +(k5 * 1000).toFixed(1),
      inside: kI,
      queries: kb,
      treeNodes: kL.nodes,
      carved: w2,
      buried: w1,
      hollows: wr,
      vertices: wC,
      triangles: wa.length / 3,
      input: kS,
      ms: {
        band: kX - k7,
        winding: kx - kX,
        label: kh - kx,
        carve: w3 - kh,
        surface: wj - w3,
        total: Date.now() - k7,
      },
    },
  };
}
function dn(V, D = 0.00001) {
  let S = V.length / 3,
    r = new Int32Array(S),
    E = new Map(),
    F = 0,
    C = (a) => Math.round(a / D);
  for (let a = 0; a < S; a++) {
    let e = C(V[3 * a]) + ',' + C(V[3 * a + 1]) + ',' + C(V[3 * a + 2]),
      R = E.get(e);
    (R === void 0 && ((R = F++), E.set(e, R)), (r[a] = R));
  }
  let H = new Float64Array(3 * F);
  for (let Q = 0; Q < S; Q++) H.set([V[3 * Q], V[3 * Q + 1], V[3 * Q + 2]], 3 * r[Q]);
  return { map: r, V: H, m: F };
}
function Mn(V, D) {
  let S = new Float64Array(V.length);
  for (let E = 0; E < D.length; E += 3) {
    let F = 3 * D[E],
      C = 3 * D[E + 1],
      H = 3 * D[E + 2],
      e = V[C] - V[F],
      R = V[C + 1] - V[F + 1],
      Q = V[C + 2] - V[F + 2],
      j = V[H] - V[F],
      z = V[H + 1] - V[F + 1],
      p = V[H + 2] - V[F + 2],
      O = R * p - Q * z,
      J = Q * j - e * p,
      Z = e * z - R * j;
    for (let U of [F, C, H]) ((S[U] += O), (S[U + 1] += J), (S[U + 2] += Z));
  }
  for (let d = 0; d < S.length; d += 3) {
    let K = Math.hypot(S[d], S[d + 1], S[d + 2]) || 1;
    ((S[d] /= K), (S[d + 1] /= K), (S[d + 2] /= K));
  }
  return S;
}
function Qn(V, D, S) {
  let E = new Map(),
    F = (C, H, a) => C + ',' + H + ',' + a;
  for (let C = 0; C < D.length; C += 3) {
    let H = [1 / 0, 1 / 0, 1 / 0],
      a = [-1 / 0, -1 / 0, -1 / 0];
    for (let e = 0; e < 3; e++)
      for (let R = 0; R < 3; R++) {
        let Q = V[3 * D[C + e] + R];
        ((H[R] = Math.min(H[R], Q)), (a[R] = Math.max(a[R], Q)));
      }
    for (let j = Math.floor(H[0] / S); j <= Math.floor(a[0] / S); j++)
      for (let z = Math.floor(H[1] / S); z <= Math.floor(a[1] / S); z++)
        for (let p = Math.floor(H[2] / S); p <= Math.floor(a[2] / S); p++) {
          let O = F(j, z, p),
            J = E.get(O);
          (J || E.set(O, (J = [])), J.push(C));
        }
  }
  return { cells: E, cell: S, key: F };
}
function Bn(V, E, C, H) {
  let e = [C[0] - E[0], C[1] - E[1], C[2] - E[2]],
    R = [H[0] - E[0], H[1] - E[1], H[2] - E[2]],
    Q = [V[0] - E[0], V[1] - E[1], V[2] - E[2]],
    j = (v, B) => v[0] * B[0] + v[1] * B[1] + v[2] * B[2],
    z = j(e, Q),
    O = j(R, Q);
  if (z <= 0 && O <= 0) return [1, 0, 0];
  let J = [V[0] - C[0], V[1] - C[1], V[2] - C[2]],
    Z = j(e, J),
    U = j(R, J);
  if (Z >= 0 && U <= Z) return [0, 1, 0];
  let d = z * U - Z * O;
  if (d <= 0 && z >= 0 && Z <= 0) {
    let v = z / (z - Z);
    return [1 - v, v, 0];
  }
  let K = [V[0] - H[0], V[1] - H[1], V[2] - H[2]],
    T = j(e, K),
    A = j(R, K);
  if (A >= 0 && T <= A) return [0, 0, 1];
  let X = T * O - z * A;
  if (X <= 0 && O >= 0 && A <= 0) {
    let B = O / (O - A);
    return [1 - B, 0, B];
  }
  let L = Z * A - T * U;
  if (L <= 0 && U - Z >= 0 && T - A >= 0) {
    let G = (U - Z) / (U - Z + (T - A));
    return [0, 1 - G, G];
  }
  let q = 1 / (L + X + d),
    P = X * q,
    Y = d * q;
  return [1 - P - Y, P, Y];
}
function Gn(V, D, S, E, F, C) {
  let H = [F[0] - E[0], F[1] - E[1], F[2] - E[2]],
    e = [C[0] - E[0], C[1] - E[1], C[2] - E[2]],
    R = [D[1] * e[2] - D[2] * e[1], D[2] * e[0] - D[0] * e[2], D[0] * e[1] - D[1] * e[0]],
    Q = H[0] * R[0] + H[1] * R[1] + H[2] * R[2];
  if (Math.abs(Q) < 1e-14) return null;
  let j = 1 / Q,
    z = [V[0] - E[0], V[1] - E[1], V[2] - E[2]],
    p = (z[0] * R[0] + z[1] * R[1] + z[2] * R[2]) * j;
  if (p < 0 || p > 1) return null;
  let O = [z[1] * H[2] - z[2] * H[1], z[2] * H[0] - z[0] * H[2], z[0] * H[1] - z[1] * H[0]],
    J = (D[0] * O[0] + D[1] * O[1] + D[2] * O[2]) * j;
  if (J < 0 || p + J > 1) return null;
  let Z = (e[0] * O[0] + e[1] * O[1] + e[2] * O[2]) * j;
  return Math.abs(Z) <= S ? [Z, [1 - p - J, p, J]] : null;
}
function wn(
  E,
  e,
  J,
  {
    maxDistance: d,
    maxAngle: v = 35,
    link: k0 = 0,
    cutoff: k1 = 0.01,
    tol: k2 = 0.000001,
    maxIter: k3 = 4000,
  } = {},
) {
  let k4 = Date.now(),
    k5 = E.positions,
    k6 = E.index,
    k7 = E.skinIndex,
    k8 = E.skinWeight,
    k9 = e.positions.length / 3,
    { map: kk, V: kw, m: kV } = dn(e.positions),
    kD = [];
  for (let kW = 0; kW < e.index.length; kW += 3) {
    let kq = kk[e.index[kW]],
      kP = kk[e.index[kW + 1]],
      kY = kk[e.index[kW + 2]];
    kq !== kP && kP !== kY && kq !== kY && kD.push(kq, kP, kY);
  }
  let km = Uint32Array.from(kD),
    kS = Mn(kw, km),
    kr = Qn(k5, k6, d),
    kE = (kv, kB) => [k5[3 * k6[kv + kB]], k5[3 * k6[kv + kB] + 1], k5[3 * k6[kv + kB] + 2]],
    kF = dn(k5),
    kC = new Uint32Array(k6.length);
  for (let kv = 0; kv < k6.length; kv++) kC[kv] = kF.map[k6[kv]];
  let kt = Mn(kF.V, kC),
    ks = (kB, kG) => {
      let kg = [0, 0, 0];
      for (let kh = 0; kh < 3; kh++) {
        let kN = 3 * kF.map[k6[kB + kh]];
        for (let ki = 0; ki < 3; ki++) kg[ki] += kG[kh] * kt[kN + ki];
      }
      let kI = Math.hypot(...kg) || 1;
      return [kg[0] / kI, kg[1] / kI, kg[2] / kI];
    },
    kH = Math.cos((v * Math.PI) / 180),
    ka = E.labels,
    ke = e.labels ? new Int32Array(kV).fill(-1) : null;
  if (ke) {
    for (let kB = k9 - 1; kB >= 0; kB--) ke[kk[kB]] = e.labels[kB];
  }
  let kR = new Float64Array(kV * J),
    kl = new Uint8Array(kV),
    kQ = new Int32Array(k6.length / 3).fill(-1);
  for (let kG = 0; kG < kV; kG++) {
    let kg = [kw[3 * kG], kw[3 * kG + 1], kw[3 * kG + 2]],
      kI = [kS[3 * kG], kS[3 * kG + 1], kS[3 * kG + 2]],
      kh = [Math.floor(kg[0] / kr.cell), Math.floor(kg[1] / kr.cell), Math.floor(kg[2] / kr.cell)],
      kN = null;
    for (let kM = -1; kM <= 1; kM++)
      for (let w0 = -1; w0 <= 1; w0++)
        for (let w1 = -1; w1 <= 1; w1++)
          for (let w2 of kr.cells.get(kr.key(kh[0] + kM, kh[1] + w0, kh[2] + w1)) ?? []) {
            if (
              kQ[w2 / 3] === kG ||
              ((kQ[w2 / 3] = kG),
              ke && ka && ke[kG] >= 0 && ka[k6[w2]] >= 0 && ka[k6[w2]] !== ke[kG])
            )
              continue;
            let w3 = kE(w2, 0),
              w4 = kE(w2, 1),
              w5 = kE(w2, 2),
              w6 = Gn(kg, kI, d, w3, w4, w5),
              w7,
              w8,
              w9 = !1;
            if (w6) ((w7 = w6[1]), (w8 = Math.abs(w6[0])), (w9 = !0));
            else {
              w7 = Bn(kg, w3, w4, w5);
              let ww = [0, 1, 2].map((wV) => w7[0] * w3[wV] + w7[1] * w4[wV] + w7[2] * w5[wV]);
              w8 = Math.hypot(ww[0] - kg[0], ww[1] - kg[1], ww[2] - kg[2]);
            }
            if (w8 > d) continue;
            let wk = (w9 ? 0 : d) + w8;
            (!kN || wk < kN.rank) && (kN = { rank: wk, t: w2, bary: w7 });
          }
    if (!kN) continue;
    let ki = ks(kN.t, kN.bary);
    if (!(Math.abs(ki[0] * kI[0] + ki[1] * kI[1] + ki[2] * kI[2]) < kH)) {
      for (let wV = 0; wV < 3; wV++) {
        let wD = k6[kN.t + wV],
          wm = kN.bary[wV];
        for (let wS = 0; wS < 4; wS++) {
          let wr = k8[4 * wD + wS];
          wr > 0 && (kR[kG * J + k7[4 * wD + wS]] += wm * wr);
        }
      }
      kl[kG] = 1;
    }
  }
  let kc = Date.now(),
    kj = new Map(),
    kz = (wE, wF, wC) => {
      let ws = wE < wF ? wE * kV + wF : wF * kV + wE;
      kj.set(ws, (kj.get(ws) ?? 0) + wC);
    };
  for (let wE = 0; wE < km.length; wE += 3) {
    let wF = [km[wE], km[wE + 1], km[wE + 2]];
    for (let wC = 0; wC < 3; wC++) {
      let ws = wF[wC],
        wH = wF[(wC + 1) % 3],
        wa = wF[(wC + 2) % 3],
        we = [
          kw[3 * wH] - kw[3 * ws],
          kw[3 * wH + 1] - kw[3 * ws + 1],
          kw[3 * wH + 2] - kw[3 * ws + 2],
        ],
        wR = [
          kw[3 * wa] - kw[3 * ws],
          kw[3 * wa + 1] - kw[3 * ws + 1],
          kw[3 * wa + 2] - kw[3 * ws + 2],
        ],
        wl = Math.hypot(
          we[1] * wR[2] - we[2] * wR[1],
          we[2] * wR[0] - we[0] * wR[2],
          we[0] * wR[1] - we[1] * wR[0],
        );
      kz(
        wH,
        wa,
        wl > 1e-14
          ? Math.max(0.001, (0.5 * (we[0] * wR[0] + we[1] * wR[1] + we[2] * wR[2])) / wl)
          : 0.001,
      );
    }
  }
  let kp = Int32Array.from({ length: kV }, (wQ, wc) => wc),
    kO = (wQ) => {
      for (; kp[wQ] !== wQ;) wQ = kp[wQ] = kp[kp[wQ]];
      return wQ;
    };
  for (let wQ = 0; wQ < km.length; wQ += 3)
    ((kp[kO(km[wQ])] = kO(km[wQ + 1])), (kp[kO(km[wQ + 1])] = kO(km[wQ + 2])));
  if (k0 > 0) {
    let wc = new Map(),
      wj = (wp, wO, wf) =>
        Math.floor(wp / k0) + ',' + Math.floor(wO / k0) + ',' + Math.floor(wf / k0);
    for (let wp = 0; wp < kV; wp++) {
      let wO = wj(kw[3 * wp], kw[3 * wp + 1], kw[3 * wp + 2]),
        wf = wc.get(wO);
      (wf || wc.set(wO, (wf = [])), wf.push(wp));
    }
    let wz = Int32Array.from({ length: kV }, (wJ, wZ) => kO(wZ));
    for (let wJ = 0; wJ < kV; wJ++) {
      let wZ = kw[3 * wJ],
        wU = kw[3 * wJ + 1],
        wu = kw[3 * wJ + 2],
        wd = Math.floor(wZ / k0),
        wK = Math.floor(wU / k0),
        wT = Math.floor(wu / k0),
        wA = k0,
        wo = -1;
      for (let wX = -1; wX <= 1; wX++)
        for (let wL = -1; wL <= 1; wL++)
          for (let wb = -1; wb <= 1; wb++)
            for (let wx of wc.get(wd + wX + ',' + (wK + wL) + ',' + (wT + wb)) ?? []) {
              if (wz[wx] === wz[wJ]) continue;
              let wy = Math.hypot(wZ - kw[3 * wx], wU - kw[3 * wx + 1], wu - kw[3 * wx + 2]);
              wy < wA && ((wA = wy), (wo = wx));
            }
      wo >= 0 && (kz(wJ, wo, 1), (kp[kO(wJ)] = kO(wo)));
    }
  }
  let kf = new Set();
  for (let wW = 0; wW < kV; wW++) kl[wW] && kf.add(kO(wW));
  let kJ = new Uint8Array(kV),
    kZ = 0,
    kU = 0;
  for (let wq = 0; wq < kV; wq++) kl[wq] || (kf.has(kO(wq)) ? ((kJ[wq] = 1), kU++) : kZ++);
  let ku = [],
    kd = new Int32Array(kV).fill(-1);
  for (let wP = 0; wP < kV; wP++) kJ[wP] && ((kd[wP] = ku.length), ku.push(wP));
  let kK = ku.length,
    kT = 0;
  if (kK) {
    let wY = Array.from({ length: kK }, () => []),
      wv = new Float64Array(kK);
    for (let [V0, V1] of kj) {
      let V2 = Math.floor(V0 / kV),
        V3 = V0 % kV;
      (kJ[V2] && ((wv[kd[V2]] += V1), wY[kd[V2]].push([V3, V1])),
        kJ[V3] && ((wv[kd[V3]] += V1), wY[kd[V3]].push([V2, V1])));
    }
    let wB = [];
    for (let V4 = 0; V4 < J; V4++)
      for (let V5 = 0; V5 < kV; V5++)
        if (kl[V5] && kR[V5 * J + V4] > 0) {
          wB.push(V4);
          break;
        }
    let wG = new Float64Array(kK),
      wg = new Float64Array(kK),
      wI = new Float64Array(kK),
      wh = new Float64Array(kK),
      wN = new Float64Array(kK),
      wi = new Float64Array(kK),
      wM = (V6, V7) => {
        for (let V8 = 0; V8 < kK; V8++) {
          let V9 = wv[V8] * V6[V8];
          for (let [Vk, Vw] of wY[V8]) kJ[Vk] && (V9 -= Vw * V6[kd[Vk]]);
          V7[V8] = V9;
        }
      };
    for (let V6 of wB) {
      let V7 = 0;
      for (let Vk = 0; Vk < kK; Vk++) {
        let Vw = 0;
        for (let [VV, VD] of wY[Vk]) kJ[VV] || (Vw += VD * kR[VV * J + V6]);
        ((wi[Vk] = Vw), (V7 += Vw * Vw), (wG[Vk] = 0));
      }
      if (V7 === 0) continue;
      ((V7 = Math.sqrt(V7)), wM(wG, wN));
      let V8 = 0;
      for (let Vm = 0; Vm < kK; Vm++)
        ((wg[Vm] = wi[Vm] - wN[Vm]),
          (wI[Vm] = wg[Vm] / wv[Vm]),
          (wh[Vm] = wI[Vm]),
          (V8 += wg[Vm] * wI[Vm]));
      let V9 = 0;
      for (; V9 < k3; V9++) {
        wM(wh, wN);
        let VS = 0;
        for (let Vt = 0; Vt < kK; Vt++) VS += wh[Vt] * wN[Vt];
        let Vr = V8 / VS,
          VE = 0;
        for (let Vs = 0; Vs < kK; Vs++)
          ((wG[Vs] += Vr * wh[Vs]), (wg[Vs] -= Vr * wN[Vs]), (VE += wg[Vs] * wg[Vs]));
        if (Math.sqrt(VE) < k2 * V7) break;
        let VF = 0;
        for (let VH = 0; VH < kK; VH++) ((wI[VH] = wg[VH] / wv[VH]), (VF += wg[VH] * wI[VH]));
        let VC = VF / V8;
        V8 = VF;
        for (let Va = 0; Va < kK; Va++) wh[Va] = wI[Va] + VC * wh[Va];
      }
      kT += V9;
      for (let Ve = 0; Ve < kK; Ve++) kR[ku[Ve] * J + V6] = Math.max(0, wG[Ve]);
    }
  }
  let kA = Date.now(),
    ko = new Uint16Array(4 * k9),
    kX = new Float32Array(4 * k9),
    kL = new Uint8Array(k9),
    kb = new Uint8Array(k9),
    kx = new Array(4);
  for (let VR = 0; VR < k9; VR++) {
    let Vl = kk[VR];
    if (((kL[VR] = kl[Vl]), !kl[Vl] && !kJ[Vl])) {
      kb[VR] = 1;
      continue;
    }
    for (let Vc = 0; Vc < 4; Vc++) kx[Vc] = [0, 0];
    for (let Vj = 0; Vj < J; Vj++) {
      let Vz = kR[Vl * J + Vj];
      if (Vz <= kx[3][1]) continue;
      let Vp = 3;
      for (; Vp > 0 && kx[Vp - 1][1] < Vz;) ((kx[Vp] = kx[Vp - 1]), Vp--);
      kx[Vp] = [Vj, Vz];
    }
    let VQ = 0;
    for (let VO = 0; VO < 4; VO++) kx[VO][1] >= k1 && (VQ += kx[VO][1]);
    if (VQ <= 0) {
      kb[VR] = 1;
      continue;
    }
    for (let Vf = 0; Vf < 4; Vf++)
      kx[Vf][1] < k1 || ((ko[4 * VR + Vf] = kx[Vf][0]), (kX[4 * VR + Vf] = kx[Vf][1] / VQ));
  }
  let ky = 0;
  for (let VJ = 0; VJ < kV; VJ++) ky += kl[VJ];
  return {
    index: ko,
    weight: kX,
    trusted: kL,
    unfilled: kb,
    stats: {
      vertices: k9,
      welded: kV,
      trusted: ky,
      filled: kU,
      unfilled: kZ,
      iterations: kT,
      ms: { match: kc - k4, fill: kA - kc, total: Date.now() - k4 },
    },
  };
}
function yn(V, D, { skip: S = null, res: E = 64 } = {}) {
  let F = [1 / 0, 1 / 0, 1 / 0],
    C = [-1 / 0, -1 / 0, -1 / 0];
  for (let j = 0; j < V.length; j += 3)
    for (let z = 0; z < 3; z++)
      ((F[z] = Math.min(F[z], V[j + z])), (C[z] = Math.max(C[z], V[j + z])));
  let H = Math.max(C[0] - F[0], C[1] - F[1], C[2] - F[2], 0.000001) / E,
    e = [0, 1, 2].map((p) => Math.max(1, Math.ceil((C[p] - F[p]) / H) + 1)),
    R = new Map(),
    Q = (p, O) => Math.min(e[O] - 1, Math.max(0, Math.floor((p - F[O]) / H)));
  for (let p = 0; p < D.length; p += 3) {
    if (S && (S[D[p]] || S[D[p + 1]] || S[D[p + 2]])) continue;
    let O = [1 / 0, 1 / 0, 1 / 0],
      J = [-1 / 0, -1 / 0, -1 / 0];
    for (let Z = 0; Z < 3; Z++)
      for (let U = 0; U < 3; U++) {
        let d = V[3 * D[p + Z] + U];
        ((O[U] = Math.min(O[U], d)), (J[U] = Math.max(J[U], d)));
      }
    for (let K = Q(O[0], 0); K <= Q(J[0], 0); K++)
      for (let T = Q(O[1], 1); T <= Q(J[1], 1); T++)
        for (let A = Q(O[2], 2); A <= Q(J[2], 2); A++) {
          let X = K + e[0] * (T + e[1] * A),
            L = R.get(X);
          (L || R.set(X, (L = [])), L.push(p));
        }
  }
  return { mn: F, h: H, dims: e, cells: R, P: V, T: D };
}
function Rn(V, D, S, r) {
  return gn(V, D, S, r, !0)[0] ?? 1 / 0;
}
function Yn(V, D, S, r, { gap: E = 0.35, min: F = 0.01 } = {}) {
  let C = gn(V, D, S, r, !1);
  if (!C.length) return 1 / 0;
  let H = C[0],
    a = E * C[0] + F;
  for (let e = 1; e < C.length && !(C[e] - H > a); e++) H = C[e];
  return H;
}
function gn(V, E, C, H, e) {
  let { mn: R, h: Q, dims: j, cells: z, P: O, T: J } = V,
    Z = Math.floor((E[0] - R[0]) / Q),
    U = Math.floor((E[1] - R[1]) / Q),
    d = Math.floor((E[2] - R[2]) / Q),
    K = [Math.sign(C[0]) || 1, Math.sign(C[1]) || 1, Math.sign(C[2]) || 1],
    T = (B) => {
      let G = [Z, U, d][B] + (K[B] > 0 ? 1 : 0);
      return Math.abs(C[B]) < 1e-12 ? 1 / 0 : (R[B] + G * Q - E[B]) / C[B];
    },
    X = [T(0), T(1), T(2)],
    L = [0, 1, 2].map((B) => (Math.abs(C[B]) < 1e-12 ? 1 / 0 : Q / Math.abs(C[B]))),
    q = 1 / 0,
    P = 0,
    Y = new Set(),
    v = [];
  for (; P <= H && (!e || P < q);) {
    if (Z >= 0 && U >= 0 && d >= 0 && Z < j[0] && U < j[1] && d < j[2]) {
      let G = z.get(Z + j[0] * (U + j[1] * d));
      if (G)
        for (let g of G) {
          if (Y.has(g)) continue;
          Y.add(g);
          let N = Pn(E, C, O, 3 * J[g], 3 * J[g + 1], 3 * J[g + 2]);
          N > 0.00001 && N <= H && (v.push(N), N < q && (q = N));
        }
    } else {
      if (
        (Z < 0 && K[0] < 0) ||
        (U < 0 && K[1] < 0) ||
        (d < 0 && K[2] < 0) ||
        (Z >= j[0] && K[0] > 0) ||
        (U >= j[1] && K[1] > 0) ||
        (d >= j[2] && K[2] > 0)
      )
        break;
    }
    let B = X[0] < X[1] ? (X[0] < X[2] ? 0 : 2) : X[1] < X[2] ? 1 : 2;
    ((P = X[B]), (X[B] += L[B]), B === 0 ? (Z += K[0]) : B === 1 ? (U += K[1]) : (d += K[2]));
  }
  return v.sort((i, k0) => i - k0);
}
function Pn(V, E, C, H, e, R) {
  let Q = C[e] - C[H],
    j = C[e + 1] - C[H + 1],
    z = C[e + 2] - C[H + 2],
    O = C[R] - C[H],
    J = C[R + 1] - C[H + 1],
    Z = C[R + 2] - C[H + 2],
    U = E[1] * Z - E[2] * J,
    d = E[2] * O - E[0] * Z,
    K = E[0] * J - E[1] * O,
    T = Q * U + j * d + z * K;
  if (Math.abs(T) < 1e-14) return -1;
  let X = 1 / T,
    L = V[0] - C[H],
    q = V[1] - C[H + 1],
    P = V[2] - C[H + 2],
    Y = (L * U + q * d + P * K) * X;
  if (Y < 0 || Y > 1) return -1;
  let v = q * z - P * j,
    B = P * Q - L * z,
    G = L * j - q * Q,
    g = (E[0] * v + E[1] * B + E[2] * G) * X;
  return g < 0 || Y + g > 1 ? -1 : (O * v + J * B + Z * G) * X;
}
function _n(
  V,
  E,
  { stations: C = 6, rays: H = 12, lo: e = 0.15, hi: R = 0.85, far: Q = 0.6, layers: j = !0 } = {},
) {
  let z = [E.tail[0] - E.head[0], E.tail[1] - E.head[1], E.tail[2] - E.head[2]],
    O = Math.hypot(...z) || 1e-9,
    J = z.map((X) => X / O),
    Z = Math.abs(J[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0],
    U = [J[1] * Z[2] - J[2] * Z[1], J[2] * Z[0] - J[0] * Z[2], J[0] * Z[1] - J[1] * Z[0]],
    d = Math.hypot(...U);
  U = U.map((X) => X / d);
  let K = [J[1] * U[2] - J[2] * U[1], J[2] * U[0] - J[0] * U[2], J[0] * U[1] - J[1] * U[0]],
    T = [];
  for (let X = 0; X < C; X++) {
    let L = C === 1 ? (e + R) / 2 : e + ((R - e) * X) / (C - 1),
      q = [E.head[0] + L * z[0], E.head[1] + L * z[1], E.head[2] + L * z[2]],
      P = [];
    for (let Y = 0; Y < H; Y++) {
      let v = (2 * Math.PI * Y) / H,
        B = Math.cos(v),
        G = Math.sin(v),
        g = [B * U[0] + G * K[0], B * U[1] + G * K[1], B * U[2] + G * K[2]],
        N = j ? Yn(V, q, g, Q) : Rn(V, q, g, Q);
      Number.isFinite(N) && P.push(N);
    }
    P.length * 2 < H || (P.sort((i, k0) => i - k0), T.push([L, P[P.length >> 1]]));
  }
  return T;
}
var Pt = (V) => (V <= 0 ? 0 : V >= 1 ? 1 : V * V * (3 - 2 * V));
function jt(V, D) {
  let S = [D.tail[0] - D.head[0], D.tail[1] - D.head[1], D.tail[2] - D.head[2]],
    r = S[0] * S[0] + S[1] * S[1] + S[2] * S[2] || 1e-12,
    E = ((V[0] - D.head[0]) * S[0] + (V[1] - D.head[1]) * S[1] + (V[2] - D.head[2]) * S[2]) / r,
    F = [D.head[0] + E * S[0] - V[0], D.head[1] + E * S[1] - V[1], D.head[2] + E * S[2] - V[2]];
  return [E, Math.hypot(...F), Math.sqrt(r)];
}
function xn(V, { hip: E = 0, lat: C = !1 } = {}) {
  let H = [],
    e = [],
    R = (Q) => V.findIndex((j) => j.name === Q);
  for (let Q of ['l', 'r']) {
    let j = V[R('thigh_' + Q)],
      z = R('pelvis');
    E > 0 &&
      j &&
      z >= 0 &&
      (H.push({
        name: 'hip_' + Q,
        head: j.head.slice(),
        tail: j.head.map((X, L) => X + (X - j.tail[L]) * E),
      }),
      e.push(z));
    let O = V[R('upperarm_' + Q)],
      J = V[R('spine_03')],
      {
        down: Z = 0.3,
        inset: U = 0.25,
        to: d = 'spine_02',
        owner: K = 'spine_03',
      } = C === !0 ? {} : C || {},
      T = V[R(d)],
      A = R(K);
    if (C && O && J && T && A >= 0) {
      let X = O.head,
        L = Math.hypot(O.tail[0] - X[0], O.tail[1] - X[1], O.tail[2] - X[2]),
        q = X[0] - (X[0] - J.head[0]) * U,
        P = (X[2] + J.head[2]) / 2,
        Y = [q, X[1] - Z * L, P],
        v = [q, T.head[1], P];
      Y[1] > v[1] + 0.01 && (H.push({ name: 'lat_' + Q, head: Y, tail: v }), e.push(A));
    }
  }
  return { segs: [...V, ...H], owner: e };
}
function bn({ index: V, weight: D }, S, r) {
  if (!r.length) return;
  let E = new Map();
  for (let F = 0; F < V.length / 4; F++) {
    let C = !1;
    for (let H = 0; H < 4; H++) D[4 * F + H] > 0 && V[4 * F + H] >= S && (C = !0);
    if (C) {
      E.clear();
      for (let a = 0; a < 4; a++) {
        if (!(D[4 * F + a] > 0)) continue;
        let e = V[4 * F + a] >= S ? r[V[4 * F + a] - S] : V[4 * F + a];
        E.set(e, (E.get(e) ?? 0) + D[4 * F + a]);
      }
      Kt(V, D, F, E);
    }
  }
}
function kn({ index: V, weight: E }, C, H, e, R = null, Q = 3) {
  let j = C.length / 3,
    z = Cn(C, H),
    O = new Map(),
    J = (K, T, X) => Math.floor(K / e) + ',' + Math.floor(T / e) + ',' + Math.floor(X / e);
  for (let K = 0; K < j; K++) {
    if (R?.[K]) continue;
    let T = J(C[3 * K], C[3 * K + 1], C[3 * K + 2]),
      X = O.get(T);
    (X || O.set(T, (X = [])), X.push(K));
  }
  let Z = [];
  for (let L = 0; L < j; L++) {
    if (R?.[L]) continue;
    let q = C[3 * L],
      P = C[3 * L + 1],
      Y = C[3 * L + 2],
      v = Math.floor(q / e),
      B = Math.floor(P / e),
      G = Math.floor(Y / e),
      g = [];
    for (let N = -1; N <= 1; N++)
      for (let i = -1; i <= 1; i++)
        for (let k0 = -1; k0 <= 1; k0++)
          for (let k1 of O.get(v + N + ',' + (B + i) + ',' + (G + k0)) ?? [])
            z[k1] !== z[L] &&
              Math.hypot(C[3 * k1] - q, C[3 * k1 + 1] - P, C[3 * k1 + 2] - Y) <= e &&
              g.push(k1);
    g.length && Z.push([L, g]);
  }
  let U = new Map(),
    d = new Map();
  for (let k2 = 0; k2 < Q; k2++) {
    let k3 = [];
    for (let [k4, k5] of Z) {
      Zt(V, E, k4, U);
      for (let k6 of k5) for (let [k7, k8] of Zt(V, E, k6, d)) U.set(k7, (U.get(k7) ?? 0) + k8);
      k3.push([k4, new Map(U)]);
    }
    for (let [k9, kk] of k3) Kt(V, E, k9, kk);
  }
  return Z.length;
}
function An(E, { positions: e, index: J, segs: d, pieces: T = [], skip: v = null }, G = {}) {
  let { index: k0, weight: k1 } = E,
    {
      thigh: k2 = 0.55,
      theta: k3 = 1,
      behind: k4 = 0.7,
      shoulder: k5 = 1,
      len: k6 = 0.15,
      anchor: k7 = 0.006,
    } = G,
    k8 = (kB) => d.findIndex((kG) => kG.name === kB),
    k9 = k8('pelvis'),
    kk = k8('thigh_l'),
    kw = k8('thigh_r'),
    kV = k8('calf_l'),
    kD = k8('calf_r'),
    km = T.map((kB) => Array.from(kB).filter((kG) => !v?.[kG])).filter((kB) => kB.length);
  if (!km.length || [k9, kk, kw, kV, kD].some((kB) => kB < 0)) return { cloth: 0 };
  let kS = e.length / 3,
    kr = new Map(),
    kE = (kB) => [e[3 * kB], e[3 * kB + 1], e[3 * kB + 2]],
    kF = d[kk].head,
    kC = d[kw].head,
    kt = (kF[1] + kC[1]) / 2,
    ks = (d[kV].head[1] + d[kD].head[1]) / 2,
    kH = Math.max(0.001, kt - ks),
    ka = (kF[2] + kC[2]) / 2,
    ke = k8('upperarm_l') >= 0 ? d[k8('upperarm_l')].head[1] : kt + kH,
    kR = new Uint8Array(kS);
  for (let kB of km) for (let kG of kB) kR[kG] = 1;
  let kl = (kg, kI, kh) => {
      let kN = d[kg].head,
        ki = d[kI].head,
        kM = d[kI].tail,
        w0 = (w1, w2, w3) => [w1[0] + w3 * (w2[0] - w1[0]), w1[2] + w3 * (w2[2] - w1[2])];
      return kh >= kN[1]
        ? [kN[0], kN[2]]
        : kh >= ki[1]
          ? w0(kN, ki, (kN[1] - kh) / Math.max(0.000001, kN[1] - ki[1]))
          : kh >= kM[1]
            ? w0(ki, kM, (ki[1] - kh) / Math.max(0.000001, ki[1] - kM[1]))
            : [kM[0], kM[2]];
    },
    kQ = (kg, kI, kh) => {
      let kN = kl(kI, kh, kg[1]);
      return Math.hypot(kg[0] - kN[0], kg[2] - kN[1]);
    },
    kc = (kg, kI) => {
      let kh = [];
      for (let kN = 0; kN < kS; kN++) {
        if (kR[kN] || v?.[kN]) continue;
        let ki = -1,
          kM = 0;
        for (let w1 = 0; w1 < 4; w1++)
          k1[4 * kN + w1] > kM && ((kM = k1[4 * kN + w1]), (ki = k0[4 * kN + w1]));
        let w0 = kE(kN);
        ki === kg && w0[1] < kt - 0.2 * kH && w0[1] > ks + 0.1 * kH && kh.push(kQ(w0, kg, kI));
      }
      return (kh.sort((w2, w3) => w2 - w3), Math.max(0.02, kh.length ? kh[kh.length >> 1] : 0.07));
    },
    kj = kc(kk, kV),
    kz = kc(kw, kD),
    kp = ['pelvis', 'spine_01', 'spine_02', 'spine_03', 'neck_01'].map(k8).filter((kg) => kg >= 0),
    kO = kp.map((kg) => d[kg].head[1]),
    kf = { l: k8('clavicle_l'), r: k8('clavicle_r') },
    kJ = { l: k8('upperarm_l'), r: k8('upperarm_r') },
    kZ = kp.length > 3 ? kO[3] : kO[kO.length - 2],
    kU = (kg, kI, kh) => {
      let kN = kg[1],
        ki = 0;
      for (; ki < kO.length - 2 && kN > kO[ki + 1];) ki++;
      let kM = Math.max(0, Math.min(1, (kN - kO[ki]) / Math.max(0.000001, kO[ki + 1] - kO[ki])));
      (kh.set(kp[ki], 1 - kM), kh.set(kp[ki + 1], (kh.get(kp[ki + 1]) ?? 0) + kM));
      let w0 = kf[kI] >= 0 ? 0.6 * Pt((kN - kZ) / Math.max(0.000001, ke - kZ)) : 0;
      if (w0 > 0) {
        for (let [w1, w2] of kh) kh.set(w1, w2 * (1 - w0));
        kh.set(kf[kI], (kh.get(kf[kI]) ?? 0) + w0);
      }
      return kh;
    },
    ku = (kg) => Math.max(0, Math.min(kQ(kg, kk, kV) - kj, kQ(kg, kw, kD) - kz)),
    kd = (kg, kI, kh) => {
      let kN = kQ(kg, kk, kV),
        ki = kQ(kg, kw, kD),
        kM = Math.max(0.001, Math.min(kt - kg[1], kH)),
        w0 = kg[1] >= kt ? 0 : Math.max(0, Math.min(k2, 1 - kh / (kM * k3)));
      w0 *= 1 - k4 * Pt((ka - kg[2] - 1.2 * Math.min(kj, kz)) / 0.1);
      let w1 = kl(kk, kV, kg[1]),
        w2 = kl(kw, kD, kg[1]),
        w3 = Math.max(0.001, Math.hypot(w1[0] - w2[0], w1[1] - w2[1])),
        w4 = Pt(0.5 + (0.5 * (ki - kN)) / w3);
      return (kI.set(k9, 1 - w0), kI.set(kk, w0 * w4), kI.set(kw, w0 * (1 - w4)), kI);
    },
    kK = /^(upperarm|lowerarm|hand|thumb|index|middle|ring|pinky)_/,
    kT = /^(upperarm|lowerarm|hand|thumb|index|middle|ring|pinky|thigh|calf|foot|ball)_/,
    kA = kF[0] >= kC[0],
    ko = -1 / 0,
    kX = 1 / 0;
  for (let kg = 0; kg < kS; kg++)
    ((ko = Math.max(ko, e[3 * kg + 1])), (kX = Math.min(kX, e[3 * kg + 1])));
  let kL = ko - kX,
    kb = k7 * kL,
    kx = new Map(),
    ky = (kI, kh, kN) =>
      Math.floor(kI / kb) + ',' + Math.floor(kh / kb) + ',' + Math.floor(kN / kb);
  if (k7 > 0)
    for (let kI = 0; kI < kS; kI++) {
      if (kR[kI] || v?.[kI]) continue;
      let kh = ky(e[3 * kI], e[3 * kI + 1], e[3 * kI + 2]),
        kN = kx.get(kh);
      (kN || kx.set(kh, (kN = [])), kN.push(kI));
    }
  let kW = new Map(),
    kq = (ki, kM) => {
      let [w0, w1, w2] = kE(ki),
        w3 = Math.floor(w0 / kb),
        w4 = Math.floor(w1 / kb),
        w5 = Math.floor(w2 / kb);
      kM.clear();
      let w6 = 0;
      for (let w7 = -1; w7 <= 1; w7++)
        for (let w8 = -1; w8 <= 1; w8++)
          for (let w9 = -1; w9 <= 1; w9++)
            for (let wk of kx.get(w3 + w7 + ',' + (w4 + w8) + ',' + (w5 + w9)) ?? [])
              if (!(Math.hypot(e[3 * wk] - w0, e[3 * wk + 1] - w1, e[3 * wk + 2] - w2) > kb)) {
                for (let [ww, wV] of Zt(k0, k1, wk, kW)) kM.set(ww, (kM.get(ww) ?? 0) + wV);
                w6++;
              }
      for (let [wD, wm] of kM) kM.set(wD, wm / Math.max(1, w6));
      return w6;
    },
    kP = new Int32Array(kS).fill(-1);
  km.forEach((ki, kM) => {
    for (let w0 of ki) kP[w0] = kM;
  });
  let kY = km.map(() => []);
  for (let ki = 0; ki < J.length; ki += 3) {
    let kM = kP[J[ki]];
    kM >= 0 &&
      kP[J[ki + 1]] === kM &&
      kP[J[ki + 2]] === kM &&
      kY[kM].push(J[ki], J[ki + 1], J[ki + 2]);
  }
  let kv = { cloth: 0, anchored: 0, pieces: km.length };
  return (
    km.forEach((w0, w1) => {
      let w2 = [],
        w3 = new Uint8Array(w0.length),
        w4 = w0.map((w7) => ku(kE(w7))).sort((w7, w8) => w7 - w8),
        w5 = w4[w4.length >> 1];
      w0.forEach((w7, w8) => {
        let w9 = kE(w7),
          wk = new Map();
        if ((w2.push(wk), kv.cloth++, k7 > 0 && kq(w7, wk))) {
          let wm = 0;
          for (let [wS, wr] of wk) kT.test(d[wS].name) && (wm += wr);
          if (wm < 0.3) {
            ((w3[w8] = 1), kv.anchored++);
            return;
          }
          wk.clear();
        }
        let ww = w9[0] >= (kF[0] + kC[0]) / 2 === kA ? 'l' : 'r';
        (w9[1] < kt ? kd(w9, wk, w5) : kU(w9, ww, wk), Zt(k0, k1, w7, kr));
        let wV = Pt((w9[1] - kZ) / Math.max(0.000001, ke - kZ));
        if (wV > 0) {
          let wE = 0;
          for (let [wF, wC] of kr) kK.test(d[wF].name) || (wE += wC);
          if (wE > 0.05) {
            for (let [ws, wH] of wk) wk.set(ws, wH * (1 - wV));
            for (let [wa, we] of kr)
              kK.test(d[wa].name) || wk.set(wa, (wk.get(wa) ?? 0) + (wV * we) / wE);
          }
        }
        let wD = 0;
        for (let [wR, wl] of kr) kK.test(d[wR].name) && (wD += wl);
        if (k5 > 0 && wD > 0 && kJ[ww] >= 0) {
          let [wQ] = jt(w9, d[kJ[ww]]),
            wc = Math.min(wD, k5) * (1 - Pt(wQ / 0.6));
          if (wc > 0) {
            for (let [wj, wz] of wk) wk.set(wj, wz * (1 - wc));
            wk.set(kJ[ww], (wk.get(kJ[ww]) ?? 0) + wc);
          }
        }
      });
      let w6 = k6 > 0 ? Xn(w0, kY[w1], e, w2, w3, k6 * kL) : w2;
      w0.forEach((w7, w8) => Kt(k0, k1, w7, w6[w8]));
    }),
    kv
  );
}
function Xn(E, e, O, J, U, d, { tol: K = 0.0001, maxIter: T = 400 } = {}) {
  let P = E.length,
    Y = new Map(),
    v = new Map(),
    B = new Int32Array(P),
    G = 0;
  E.forEach((kC, kt) => {
    Y.set(kC, kt);
    let ks =
        Math.round(O[3 * kC] * 100000) +
        ',' +
        Math.round(O[3 * kC + 1] * 100000) +
        ',' +
        Math.round(O[3 * kC + 2] * 100000),
      kH = v.get(ks);
    (kH === void 0 && v.set(ks, (kH = G++)), (B[kt] = kH));
  });
  let g = new Float64Array(G),
    N = new Map(),
    i = new Float64Array(G),
    k0 = new Int32Array(G).fill(-1);
  E.forEach((kC, kt) => {
    k0[B[kt]] < 0 && (k0[B[kt]] = kt);
  });
  let k1 = (kC, kt, ks) => {
      let kH = kC < kt ? kC * G + kt : kt * G + kC;
      N.set(kH, (N.get(kH) ?? 0) + ks);
    },
    k2 = (kC, kt) => [kC[0] - kt[0], kC[1] - kt[1], kC[2] - kt[2]],
    k3 = (kC, kt) => [
      kC[1] * kt[2] - kC[2] * kt[1],
      kC[2] * kt[0] - kC[0] * kt[2],
      kC[0] * kt[1] - kC[1] * kt[0],
    ];
  for (let kC = 0; kC < e.length; kC += 3) {
    let kt = [0, 1, 2].map((ka) => B[Y.get(e[kC + ka])]);
    if (kt[0] === kt[1] || kt[1] === kt[2] || kt[0] === kt[2]) continue;
    let ks = [0, 1, 2].map((ka) => [
        O[3 * e[kC + ka]],
        O[3 * e[kC + ka] + 1],
        O[3 * e[kC + ka] + 2],
      ]),
      kH = Math.hypot(...k3(k2(ks[1], ks[0]), k2(ks[2], ks[0])));
    if (!(kH < 1e-14)) {
      for (let ka = 0; ka < 3; ka++) g[kt[ka]] += kH / 6;
      for (let ke = 0; ke < 3; ke++) {
        let kR = k2(ks[(ke + 1) % 3], ks[ke]),
          kl = k2(ks[(ke + 2) % 3], ks[ke]);
        k1(
          kt[(ke + 1) % 3],
          kt[(ke + 2) % 3],
          Math.max(
            0,
            (0.5 * (kR[0] * kl[0] + kR[1] * kl[1] + kR[2] * kl[2])) /
              (Math.hypot(...k3(kR, kl)) || 1e-12),
          ),
        );
      }
    }
  }
  for (let kQ = 0; kQ < P; kQ++) i[B[kQ]] = Math.max(i[B[kQ]], (U[kQ] ? 100 : 1) / (d * d));
  let k4 = new Uint32Array(G);
  for (let kc of N.keys()) (k4[Math.floor(kc / G)]++, k4[kc % G]++);
  let k5 = new Uint32Array(G + 1);
  for (let kj = 0; kj < G; kj++) k5[kj + 1] = k5[kj] + k4[kj];
  let k6 = new Uint32Array(k5[G]),
    k7 = new Float64Array(k5[G]),
    k8 = k5.slice(0, G),
    k9 = new Float64Array(G);
  for (let [kz, kp] of N) {
    let kO = Math.floor(kz / G),
      kf = kz % G;
    ((k6[k8[kO]] = kf),
      (k7[k8[kO]++] = -kp),
      (k6[k8[kf]] = kO),
      (k7[k8[kf]++] = -kp),
      (k9[kO] += kp),
      (k9[kf] += kp));
  }
  for (let kJ = 0; kJ < G; kJ++) k9[kJ] = k9[kJ] + g[kJ] * i[kJ] || 1;
  let kk = (kZ, kU) => {
      for (let ku = 0; ku < G; ku++) {
        let kd = k9[ku] * kZ[ku];
        for (let kK = k5[ku]; kK < k5[ku + 1]; kK++) kd += k7[kK] * kZ[k6[kK]];
        kU[ku] = kd;
      }
    },
    kw = new Set();
  for (let kZ of J) for (let kU of kZ.keys()) kw.add(kU);
  let kV = Array.from({ length: G }, () => new Map()),
    kD = new Float64Array(G),
    km = new Float64Array(G),
    kS = new Float64Array(G),
    kr = new Float64Array(G),
    kE = new Float64Array(G),
    kF = new Float64Array(G);
  for (let ku of kw) {
    for (let kT = 0; kT < G; kT++) {
      let kA = J[k0[kT]].get(ku) ?? 0;
      ((kF[kT] = g[kT] * i[kT] * kA), (kE[kT] = kA));
    }
    kk(kE, kr);
    let kd = 0,
      kK = 0;
    for (let ko = 0; ko < G; ko++)
      ((kD[ko] = g[ko] > 0 ? kF[ko] - kr[ko] : 0),
        (km[ko] = kD[ko] / k9[ko]),
        (kS[ko] = km[ko]),
        (kd += kF[ko] * kF[ko]),
        (kK += kD[ko] * km[ko]));
    kd = Math.sqrt(kd) || 1;
    for (let kX = 0; kX < T && kK > 0; kX++) {
      kk(kS, kr);
      let kL = 0;
      for (let kq = 0; kq < G; kq++) kL += kS[kq] * kr[kq];
      if (!(kL > 0)) break;
      let kb = kK / kL,
        kx = 0;
      for (let kP = 0; kP < G; kP++)
        ((kE[kP] += kb * kS[kP]),
          (kD[kP] = g[kP] > 0 ? kD[kP] - kb * kr[kP] : 0),
          (kx += kD[kP] * kD[kP]));
      if (Math.sqrt(kx) < K * kd) break;
      let ky = 0;
      for (let kY = 0; kY < G; kY++) ((km[kY] = kD[kY] / k9[kY]), (ky += kD[kY] * km[kY]));
      let kW = ky / kK;
      kK = ky;
      for (let kv = 0; kv < G; kv++) kS[kv] = km[kv] + kW * kS[kv];
    }
    for (let kB = 0; kB < G; kB++) kE[kB] > 0.001 && kV[kB].set(ku, kE[kB]);
  }
  return E.map((kG, kg) => kV[B[kg]]);
}
function Cn(V, D) {
  let S = V.length / 3,
    r = new Map(),
    E = new Int32Array(S);
  for (let H = 0; H < S; H++) {
    let a =
        Math.round(V[3 * H] * 100000) +
        ',' +
        Math.round(V[3 * H + 1] * 100000) +
        ',' +
        Math.round(V[3 * H + 2] * 100000),
      e = r.get(a);
    (e === void 0 && ((e = H), r.set(a, H)), (E[H] = e));
  }
  let F = Int32Array.from({ length: S }, (R, Q) => Q),
    C = (R) => {
      for (; F[R] !== R;) R = F[R] = F[F[R]];
      return R;
    };
  for (let R = 0; R < D.length; R += 3) {
    let Q = E[D[R]],
      j = E[D[R + 1]],
      z = E[D[R + 2]];
    ((F[C(Q)] = C(j)), (F[C(j)] = C(z)));
  }
  return Int32Array.from({ length: S }, (p, O) => C(E[O]));
}
function Kt(V, D, S, r) {
  let E = [...r]
      .filter(([, C]) => C > 0.0001)
      .sort((C, H) => H[1] - C[1])
      .slice(0, 4),
    F = E.reduce((C, [, H]) => C + H, 0);
  for (let C = 0; C < 4; C++)
    ((V[4 * S + C] = E[C]?.[0] ?? 0), (D[4 * S + C] = E[C] && F > 0 ? E[C][1] / F : 0));
}
function Zt(V, D, S, r) {
  r.clear();
  for (let E = 0; E < 4; E++)
    D[4 * S + E] > 0 && r.set(V[4 * S + E], (r.get(V[4 * S + E]) ?? 0) + D[4 * S + E]);
  return r;
}
function $n(
  { index: V, weight: D },
  { positions: S, segs: E, index: F = null, skip: C = null },
  { lo: H = 0.2, hi: e = 0.85, bins: R = 6, from: Q = 'skin', layers: j = !0 } = {},
) {
  let z = S.length / 3,
    O = E.map(() => Array.from({ length: R }, () => []));
  for (let Z = 0; Z < z; Z++) {
    let U = -1,
      d = 0;
    for (let A = 0; A < 4; A++) D[4 * Z + A] > d && ((d = D[4 * Z + A]), (U = V[4 * Z + A]));
    if (U < 0 || U >= E.length || d < 0.5) continue;
    let [K, T] = jt([S[3 * Z], S[3 * Z + 1], S[3 * Z + 2]], E[U]);
    K < H || K > e || O[U][Math.min(R - 1, Math.floor(((K - H) / (e - H)) * R))].push(T);
  }
  let J = Q !== 'skin' && F ? yn(S, F, { skip: C }) : null;
  return E.map((X, L) => {
    let q = [];
    O[L].forEach((G, g) => {
      G.length < 3 ||
        (G.sort((N, i) => N - i), q.push([H + ((g + 0.5) * (e - H)) / R, G[G.length >> 1]]));
    });
    let P = Q === 'skin' || (Q === 'both' && q.length >= 2) || !J,
      Y = P ? q : _n(J, X, { lo: H, hi: e, stations: R, layers: j }),
      [v, B] = Zn(Y);
    return {
      bone: L,
      name: X.name,
      head: X.head.slice(),
      tail: X.tail.slice(),
      r: [v, B],
      from: P ? 'skin' : 'surface',
    };
  });
}
function Zn(V) {
  if (!V.length) return [0, 0];
  if (V.length === 1) return [V[0][1], V[0][1]];
  let D = V.reduce((C, H) => C + H[0], 0) / V.length,
    S = V.reduce((C, H) => C + H[1], 0) / V.length,
    r = V.reduce((C, H) => C + (H[0] - D) ** 2, 0),
    E = V.reduce((C, H) => C + (H[0] - D) * (H[1] - S), 0),
    F = r > 1e-12 ? E / r : 0;
  return [
    Math.min(2 * S, Math.max(0.5 * S, S - F * D)),
    Math.min(2 * S, Math.max(0.5 * S, S + F * (1 - D))),
  ];
}
function In(E, { positions: e, segs: O, skip: J = null }, U, d = {}) {
  let {
      bones: K = ['upperarm_l', 'upperarm_r'],
      sized: T = {},
      margin: P = 1.25,
      fade: Y = 0.5,
      reach: v = 0.4,
      cap: B = 0.6,
      alone: G = !1,
      to: g = (k7) => ['clavicle_' + k7, 'spine_03', 'spine_02'],
    } = d,
    N = E.index,
    i = E.weight,
    k0 = e.length / 3,
    k1 = new Map(),
    k2 = (k7) => O.findIndex((k8) => k8.name === k7),
    k3 = new Map();
  for (let k7 of K) k3.set(k7, { reach: v, scale: 1, torso: !0 });
  for (let [k8, k9] of Object.entries(T ?? {}))
    Number.isFinite(k9) && k9 > 0 && k3.set(k8, { reach: 1, scale: k9, torso: K.includes(k8) });
  let k4 = new Map(O.map((kk, kw) => [kw, []]));
  O.forEach((kk, kw) => {
    let kV = kk.parent != null ? k2(kk.parent) : -1;
    kV >= 0 && k4.get(kV).push(kw);
  });
  let k5 = (kk) => {
    let kw = new Set([kk]),
      kV = [kk];
    for (; kV.length;) for (let kD of k4.get(kV.pop())) kw.has(kD) || (kw.add(kD), kV.push(kD));
    return kw;
  };
  for (let kk of U) {
    let kw = k3.get(kk.name),
      kV = kw?.scale ?? 1;
    ((kk.keep = [kk.r[0] * P * kV, kk.r[1] * P * kV]), (kk.active = !!kw && kk.r[0] > 0));
  }
  let k6 = 0;
  for (let [kD, km] of k3) {
    let kS = k2(kD),
      kr = U.find((ks) => ks.bone === kS);
    if (kS < 0 || !kr || !(kr.r[0] > 0)) continue;
    let kE = k5(kS),
      kF = kD.slice(-1),
      kC = O[kS].parent != null ? k2(O[kS].parent) : -1,
      kt = (km.torso ? g(kF).map(k2) : [kC]).filter((ks) => ks >= 0);
    for (let ks = 0; ks < k0; ks++) {
      if (J?.[ks]) continue;
      let kH = 0;
      for (let kO = 0; kO < 4; kO++) N[4 * ks + kO] === kS && (kH += i[4 * ks + kO]);
      if (!(kH > 0)) continue;
      let ka = [e[3 * ks], e[3 * ks + 1], e[3 * ks + 2]],
        [ke, kR, kl] = jt(ka, O[kS]);
      if (ke > km.reach || ke > 1) continue;
      let kQ = km.scale * (kr.r[0] + (kr.r[1] - kr.r[0]) * Math.max(0, Math.min(1, ke))),
        kc = ke >= 0 ? kR / kQ : Math.hypot(kR / kQ, (ke * kl) / (B * kQ)),
        kj = 1 - Pt((kc - P) / Y);
      if (kj >= 1) continue;
      Zt(N, i, ks, k1);
      let kz = 0;
      for (let [kf, kJ] of k1) kE.has(kf) || (kz += kJ);
      let kp = kH * (1 - kj);
      if (kz > 0) {
        for (let [kZ, kU] of k1) kE.has(kZ) || k1.set(kZ, kU + (kp * kU) / kz);
      } else {
        if ((G || !km.torso) && kt.length) {
          let ku = kt[0],
            kd = 1 / 0;
          for (let kK of kt) {
            let kT = jt(ka, O[kK]),
              kA = Math.hypot(kT[1], Math.max(0, -kT[0], kT[0] - 1) * kT[2]);
            kA < kd && ((kd = kA), (ku = kK));
          }
          k1.set(ku, (k1.get(ku) ?? 0) + kp);
        } else continue;
      }
      (k1.set(kS, kH * kj), Kt(N, i, ks, k1), k6++);
    }
  }
  return k6;
}
function Jn(V, { positions: D, I: S, W: r, segs: E }) {
  let F = [];
  for (let C = 0; C < D.length / 3; C++) {
    let H = -1,
      a = 0;
    for (let Q = 0; Q < 4; Q++) r[4 * C + Q] > a && ((a = r[4 * C + Q]), (H = S[4 * C + Q]));
    if (H !== V) continue;
    let [e, R] = jt([D[3 * C], D[3 * C + 1], D[3 * C + 2]], E[V]);
    e > 0.15 && e < 0.6 && F.push(R);
  }
  return (F.sort((j, z) => j - z), F.length ? F[F.length >> 1] : 0);
}
function vn(E, { positions: e, segs: O }, J = {}) {
  let U = E.index,
    d = E.weight,
    K = e.length / 3,
    T = (N) => O.findIndex((i) => i.name === N),
    P = new Map(),
    Y = {},
    v = (N) => [e[3 * N], e[3 * N + 1], e[3 * N + 2]];
  if (J.parts) {
    let N = O.map((k1) => O.map((k2) => cn(k1.name, k2.name))),
      i = new Set(['spine_01', 'spine_02']),
      k0 = 0;
    for (let k1 = 0; k1 < K; k1++) {
      let k2 = -1,
        k3 = 0;
      for (let k5 = 0; k5 < 4; k5++)
        d[4 * k1 + k5] > k3 && ((k3 = d[4 * k1 + k5]), (k2 = U[4 * k1 + k5]));
      if (k2 < 0) continue;
      Zt(U, d, k1, P);
      let k4 = !1;
      for (let k6 of P.keys()) {
        let k7 = N[k2][k6];
        (k7 === 'cut' || (J.parts !== 'cut' && k7 === 'evidence' && i.has(O[k2].name))) &&
          (P.delete(k6), (k4 = !0));
      }
      k4 && (Kt(U, d, k1, P), k0++);
    }
    Y.parts = k0;
  }
  let B = T('thigh_l'),
    G = T('thigh_r'),
    g = T('pelvis');
  if (J.hips && B >= 0 && G >= 0 && g >= 0) {
    let { at: k8 = 0.1, width: k9 = 0.3, reach: kk = [1.2, 1.6] } = J.hips,
      kw = ['spine_01', 'spine_02'].map(T).filter((kS) => kS >= 0),
      kV = (O[B].head[0] + O[G].head[0]) / 2,
      kD = Math.abs(O[B].head[0] - O[G].head[0]) / 2,
      km = 0;
    for (let [kS, kr] of [
      [B, G],
      [G, B],
    ]) {
      let kE = Jn(kS, { positions: e, I: U, W: d, segs: O }) || 0.08,
        kF = Math.sign(O[kS].head[0] - kV);
      for (let kC = 0; kC < K; kC++) {
        let kt = v(kC);
        if (Math.sign(kt[0] - kV) !== kF || Math.abs(kt[0] - kV) < 0.5 * kD) continue;
        let [ks, kH] = jt(kt, O[kS]);
        if (ks < -0.5 || ks > 0.4 || kH > kk[1] * kE) continue;
        Zt(U, d, kC, P);
        let ka = P.get(g) ?? 0,
          ke = P.get(kS) ?? 0,
          kR = P.get(kr) ?? 0,
          kl = kw.reduce((kJ, kZ) => kJ + (P.get(kZ) ?? 0), 0),
          kQ = ka + ke + kR + kl;
        if (kQ <= 0.5) continue;
        let kc = Pt((ks + k8) / (1.6 * k9) + 0.5),
          kj = 1 - Pt((kH / kE - kk[0]) / (kk[1] - kk[0])),
          kz = kQ * (1 - kc),
          kp = ks > 0 || ka + kl <= 0 ? 0 : kl / (ka + kl),
          kO = ke + kR > 0 ? ke / (ke + kR) : 1,
          kf = new Map([
            [kS, kQ * kc * kO],
            [kr, kQ * kc * (1 - kO)],
            [g, kz * (1 - kp)],
          ]);
        for (let kJ of kw) kf.set(kJ, kp > 0 ? (kz * kp * (P.get(kJ) ?? 0)) / kl : 0);
        for (let [kZ, kU] of kf) P.set(kZ, (1 - kj) * (P.get(kZ) ?? 0) + kj * kU);
        (Kt(U, d, kC, P), km++);
      }
    }
    Y.hips = km;
  }
  return Y;
}
var Hn = ['thumb', 'index', 'middle', 'ring', 'pinky'],
  fn = {
    pelvis: 'spine_01',
    spine_01: 'spine_02',
    spine_02: 'spine_03',
    spine_03: 'neck_01',
    neck_01: 'Head',
  };
for (let o of ['l', 'r']) {
  Object.assign(fn, {
    ['clavicle_' + o]: 'upperarm_' + o,
    ['upperarm_' + o]: 'lowerarm_' + o,
    ['lowerarm_' + o]: 'hand_' + o,
    ['hand_' + o]: 'middle_01_' + o,
    ['thigh_' + o]: 'calf_' + o,
    ['calf_' + o]: 'foot_' + o,
    ['foot_' + o]: 'ball_' + o,
    ['ball_' + o]: 'ball_leaf_' + o,
  });
  for (let t of Hn)
    Object.assign(fn, {
      [t + '_01_' + o]: t + '_02_' + o,
      [t + '_02_' + o]: t + '_03_' + o,
      [t + '_03_' + o]: t + '_04_leaf_' + o,
    });
}
var jn = /^(upperarm|lowerarm|hand|thumb|index|middle|ring|pinky)_/,
  Kn = /^(thumb|index|middle|ring|pinky)_/,
  En = {
    hip: 1 / 7,
    hips: { at: 0.05, width: 0.3 },
    parts: 'cut',
    seams: 0.003,
    lat: { down: 0.15, to: 'spine_03' },
    envelope: { alone: !0, measure: { from: 'both' } },
  };
function zn(
  {
    positions: V,
    index: D,
    segs: S,
    alone: E,
    held: F,
    cloth: C,
    top: H,
    head: e,
    joints: R,
    proxy: Q,
    shape: j,
  },
  z = null,
) {
  let p = { ...En, ...j },
    O;
  if (Q) O = Vn({ positions: V, index: D, alone: E, segs: S, joints: R, height: H });
  else {
    let J = xn(S, p);
    ((O = rn(
      { positions: V, index: D, bones: J.segs },
      { exclude: F.includes(1) ? F : null, link: 0.006 * H, onProgress: z },
    )),
      bn(O, S.length, J.owner),
      (O.stats.bones = S.length));
    let Z = Date.now();
    O.stats.shape = vn(O, { positions: V, segs: S }, p);
    let U = F.map((d, K) => (d && !E[K] ? 1 : 0));
    ((O.envelopes = $n(O, { positions: V, segs: S, index: D, skip: U }, p.envelope?.measure ?? {})),
      p.envelope &&
        (O.stats.envelope = In(
          O,
          { positions: V, segs: S, skip: F },
          O.envelopes,
          p.envelope === !0 ? {} : p.envelope,
        )),
      C.length &&
        (O.stats.cloth = An(
          O,
          { positions: V, index: D, segs: S, pieces: C, skip: F },
          p.cloth ?? {},
        )),
      (O.stats.ms.shape = Date.now() - Z));
  }
  if (
    (e &&
      ne(O, {
        positions: V,
        alone: E,
        segs: S,
        joints: R,
        chin: e.chin,
        skullTop: e.skullTop ?? H,
        height: H,
      }),
    p.seams > 0)
  ) {
    let d = Date.now();
    ((O.stats.seams = kn(O, V, D, p.seams * H, F)), (O.stats.ms.seams = Date.now() - d));
  }
  return O;
}
function Vn({ positions: E, index: H, alone: e, segs: O, joints: J, height: U }) {
  let d = Date.now(),
    K = U / 1.83,
    T = E.length / 3,
    P = pn({ positions: E, index: H, bones: O, height: U }, { exclude: e }),
    Y = rn({ positions: P.positions, index: P.index, bones: O }),
    v = [];
  for (let k8 = 0; k8 < H.length; k8 += 3)
    !e[H[k8]] && !e[H[k8 + 1]] && !e[H[k8 + 2]] && v.push(H[k8], H[k8 + 1], H[k8 + 2]);
  let B = Uint32Array.from(v),
    G = O.map((k9) => nn.indexOf(tn(k9.name))),
    g = Int32Array.from(P.inputBone, (k9) => (k9 >= 0 ? G[k9] : -1)),
    N = wn(
      {
        positions: P.positions,
        index: P.index,
        skinIndex: Y.index,
        skinWeight: Y.weight,
        labels: P.region,
      },
      { positions: E, index: B, labels: g },
      O.length,
      { maxDistance: Math.max(3 * P.h, 0.015 * K), link: 0.006 * U },
    ),
    i = N.index,
    k0 = N.weight,
    k1 = P.positions,
    k2 = 0.03 * K,
    k3 = new Map(),
    k4 = (k9, kk, kw) => k9 + ',' + kk + ',' + kw;
  for (let k9 = 0; k9 < k1.length / 3; k9++) {
    let kk = k4(
        Math.floor(k1[3 * k9] / k2),
        Math.floor(k1[3 * k9 + 1] / k2),
        Math.floor(k1[3 * k9 + 2] / k2),
      ),
      kw = k3.get(kk);
    (kw || k3.set(kk, (kw = [])), kw.push(k9));
  }
  let k5 = 0;
  for (let kV = 0; kV < T; kV++) {
    if (!N.unfilled[kV] || e[kV]) continue;
    let kD = E[3 * kV],
      km = E[3 * kV + 1],
      kS = E[3 * kV + 2],
      kr = Math.floor(kD / k2),
      kE = Math.floor(km / k2),
      kF = Math.floor(kS / k2),
      kC = 1 / 0,
      kt = -1;
    for (let ks = 0; ks < 12 && (kt < 0 || (ks - 1) * k2 < Math.sqrt(kC)); ks++)
      for (let kH = -ks; kH <= ks; kH++)
        for (let ka = -ks; ka <= ks; ka++)
          for (let ke = -ks; ke <= ks; ke++)
            if (Math.max(Math.abs(kH), Math.abs(ka), Math.abs(ke)) === ks)
              for (let kR of k3.get(k4(kr + kH, kE + ka, kF + ke)) ?? []) {
                let kl =
                  (k1[3 * kR] - kD) ** 2 + (k1[3 * kR + 1] - km) ** 2 + (k1[3 * kR + 2] - kS) ** 2;
                kl < kC && ((kC = kl), (kt = kR));
              }
    if (!(kt < 0)) {
      for (let kQ = 0; kQ < 4; kQ++)
        ((i[4 * kV + kQ] = Y.index[4 * kt + kQ]), (k0[4 * kV + kQ] = Y.weight[4 * kt + kQ]));
      k5++;
    }
  }
  let k6 = Date.now(),
    k7 = te({ positions: E, index: B, labels: g, segs: O, joints: J, height: U, I: i, W: k0 });
  return {
    index: i,
    weight: k0,
    stats: {
      vertices: T,
      bones: Y.stats.bones,
      welded: N.stats.welded,
      unseen: Y.stats.unseen,
      proxy: P.stats,
      heat: Y.stats,
      transfer: N.stats,
      loose: k5,
      hands: k7,
      ms: {
        proxy: P.stats.ms.total,
        heat: Y.stats.ms.total,
        copy: k6 - d - P.stats.ms.total - Y.stats.ms.total,
        hands: k7.ms,
        total: Date.now() - d,
      },
    },
  };
}
function te({ positions: V, index: E, labels: C, segs: H, joints: e, height: Q, I: j, W: z }) {
  let O = Date.now(),
    J = Q / 1.83,
    Z = V.length / 3,
    U = new Float32Array(Z).fill(-1),
    d = [];
  for (let v of ['l', 'r']) {
    let B = e.get('hand_' + v),
      G = e.get('lowerarm_' + v);
    if (!B || !G) continue;
    let g = [B.x - G.x, B.y - G.y, B.z - G.z],
      N = Math.hypot(...g) || 1;
    H.forEach((k0, k1) => {
      k0.name.endsWith('_' + v) &&
        (/^(lowerarm|hand)_/.test(k0.name) || Kn.test(k0.name)) &&
        d.push(k1);
    });
    let i = [nn.indexOf('hand_' + v), nn.indexOf('arm_' + v)];
    for (let k0 = 0; k0 < Z; k0++) {
      if (!i.includes(C[k0])) continue;
      let k1 =
        ((V[3 * k0] - B.x) * g[0] + (V[3 * k0 + 1] - B.y) * g[1] + (V[3 * k0 + 2] - B.z) * g[2]) /
        N;
      if (k1 < -0.04 * J) continue;
      let k2 = Math.min(1, Math.max(0, (k1 + 0.03 * J) / (0.02 * J)));
      U[k0] = k2 * k2 * (3 - 2 * k2);
    }
  }
  let K = [];
  for (let k3 = 0; k3 < E.length; k3 += 3)
    U[E[k3]] >= 0 && U[E[k3 + 1]] >= 0 && U[E[k3 + 2]] >= 0 && K.push(E[k3], E[k3 + 1], E[k3 + 2]);
  if (!K.length || !d.length) return { vertices: 0, ms: Date.now() - O };
  let T = new Int32Array(Z).fill(-1),
    X = [];
  for (let k4 of K) T[k4] < 0 && ((T[k4] = X.length), X.push(k4));
  let q = new Float32Array(3 * X.length);
  X.forEach((k5, k6) => q.set(V.subarray(3 * k5, 3 * k5 + 3), 3 * k6));
  let P = rn(
      { positions: q, index: Uint32Array.from(K, (k5) => T[k5]), bones: d.map((k5) => H[k5]) },
      { link: 0.006 * Q },
    ),
    Y = new Map();
  return (
    X.forEach((k5, k6) => {
      let k7 = U[k5];
      Y.clear();
      for (let kk = 0; kk < 4; kk++)
        if (
          (z[4 * k5 + kk] > 0 &&
            Y.set(j[4 * k5 + kk], (Y.get(j[4 * k5 + kk]) ?? 0) + (1 - k7) * z[4 * k5 + kk]),
          P.weight[4 * k6 + kk] > 0)
        ) {
          let kw = d[P.index[4 * k6 + kk]];
          Y.set(kw, (Y.get(kw) ?? 0) + k7 * P.weight[4 * k6 + kk]);
        }
      let k8 = [...Y].sort((kV, kD) => kD[1] - kV[1]).slice(0, 4),
        k9 = k8.reduce((kV, [, kD]) => kV + kD, 0) || 1;
      for (let kV = 0; kV < 4; kV++)
        ((j[4 * k5 + kV] = k8[kV]?.[0] ?? 0), (z[4 * k5 + kV] = k8[kV] ? k8[kV][1] / k9 : 0));
    }),
    { vertices: X.length, ms: Date.now() - O }
  );
}
function ne(E, { positions: C, alone: H, segs: e, joints: Q, chin: z, skullTop: O, height: J }) {
  let Z = e.findIndex((G) => G.name === 'Head'),
    U = Q.get('Head');
  if (Z < 0 || !U) return;
  let d = E.weight,
    K = E.index,
    T = C.length / 3,
    X = J / 1.83,
    q = 0.06 * X,
    P = Math.tan((20 * Math.PI) / 180),
    Y = new Set(e.map((G, g) => (jn.test(G.name) ? g : -1)).filter((G) => G >= 0)),
    v = -1 / 0;
  for (let G = 0; G < T; G++) {
    if (H[G]) continue;
    let g = C[3 * G],
      N = C[3 * G + 1],
      i = C[3 * G + 2];
    Math.abs(N - U.y) < 0.01 * X && Math.abs(g - U.x) < 0.04 * X && (v = Math.max(v, i));
  }
  Number.isFinite(v) || (v = U.z + 0.08 * X);
  let B = Math.max(O - z[1], 0.1 * X);
  for (let k0 = 0; k0 < T; k0++) {
    let k1 = 4 * k0;
    if (H[k0]) {
      (K.fill(0, k1, k1 + 4), d.fill(0, k1, k1 + 4), (K[k1] = Z), (d[k1] = 1));
      continue;
    }
    let k2 = C[3 * k0],
      k3 = C[3 * k0 + 1],
      k4 = C[3 * k0 + 2];
    if (k3 < z[1] - q - 0.02 * X || Math.hypot(k2 - U.x, k4 - U.z) >= B) continue;
    let k5 = 0;
    for (let kw = 0; kw < 4; kw++) Y.has(K[k1 + kw]) && (k5 += d[k1 + kw]);
    if (k5 >= 0.5) continue;
    let k6 = Math.min(1, Math.max(0, (k3 - U.y - P * (v - k4) + q) / q));
    if (k6 <= 0) continue;
    let k7 = k6 * k6 * (3 - 2 * k6),
      k8 = -1,
      k9 = 0;
    for (let kV = 0; kV < 4; kV++)
      ((d[k1 + kV] *= 1 - k7), K[k1 + kV] === Z && (k8 = kV), d[k1 + kV] < d[k1 + k9] && (k9 = kV));
    (k8 < 0 && ((k8 = k9), (K[k1 + k8] = Z), (d[k1 + k8] = 0)), (d[k1 + k8] += k7));
    let kk = 0;
    for (let kD = 0; kD < 4; kD++) kk += d[k1 + kD];
    for (let km = 0; km < 4; km++) d[k1 + km] /= kk;
  }
}
self.onmessage = ({ data: V }) => {
  try {
    let D = zn(V, (S, r) => self.postMessage({ progress: [S, r] }));
    self.postMessage({ result: D }, [D.index.buffer, D.weight.buffer]);
  } catch (S) {
    self.postMessage({ error: S?.message || String(S) });
  }
};
