var V = Object.freeze({ start: 0, end: 1, blendIn: 0, blendOut: 0 }),
  W = (r) => Math.min(1, Math.max(0, Number(r) || 0));
function D(r) {
  let E = Math.max(0, Number(r?.blend) || 0);
  return {
    blendIn: Math.max(0, Number(r?.blendIn ?? E) || 0),
    blendOut: Math.max(0, Number(r?.blendOut ?? E) || 0),
  };
}
function Mt(r) {
  return r ? { start: r.start ?? 0, end: r.end ?? 1, ...D(r) } : { ...V };
}
function z(r) {
  if (!r) return !0;
  let { blendIn: E, blendOut: F } = D(r);
  return (r.start ?? 0) <= 0 && (r.end ?? 1) >= 1 && E <= 0 && F <= 0;
}
function On({ start: E = 0, end: F = 1, fadeIn: a = 0, fadeOut: p = 0 } = {}, O) {
  let f = F - E;
  if (!(f > 0) || O < E - 1e-9 || O > F + 1e-9) return 0;
  let J = Math.max(0, Number(a) || 0),
    d = Math.max(0, Number(p) || 0),
    A = J + d;
  A > f && ((J *= f / A), (d *= f / A));
  let b = 1;
  return (
    J > 0 && (b = Math.min(b, (O - E) / J)),
    d > 0 && (b = Math.min(b, (F - O) / d)),
    (b = Math.min(1, Math.max(0, b))),
    b * b * (3 - 2 * b)
  );
}
function kt(r, E) {
  if (z(r)) return 1;
  let F = W(r?.start ?? 0),
    a = W(r?.end ?? 1);
  if (!(a - F > 0) || E < F || E > a) return 0;
  let { blendIn: c, blendOut: p } = D(r);
  return On({ start: F, end: a, fadeIn: F > 0 ? c : 0, fadeOut: a < 1 ? p : 0 }, E);
}
function tn(E, F) {
  if (z(E) || !(F > 0)) return [];
  let a = W(E?.start ?? 0),
    p = W(E?.end ?? 1);
  if (!(p > a)) return [];
  let { blendIn: O, blendOut: J } = D(E),
    d = p - a,
    A = a > 0 ? O : 0,
    b = p < 1 ? J : 0,
    x = A + b,
    y = x > d ? d / x : 1,
    v = [a, a + A * y, p - b * y, p];
  return [...new Set(v.filter((g) => g >= 0 && g <= 1))].sort((g, I) => g - I).map((g) => g * F);
}
function Me(E, F, a) {
  if (z(E) || !(F?.length > 0) || !(a?.length > 0)) return E;
  let l = Mt(E),
    c = (O) => W((F.offset + O * F.length - a.offset) / a.length),
    p = F.length / a.length;
  return { start: c(l.start), end: c(l.end), blendIn: l.blendIn * p, blendOut: l.blendOut * p };
}
function ve(E, F) {
  let a = Math.max(2, Math.round(F || 0)) - 1,
    e = E || V,
    { blendIn: c, blendOut: p } = D(e);
  return {
    start: Math.round((e.start ?? 0) * a) + 1,
    end: Math.round((e.end ?? 1) * a) + 1,
    blendIn: Math.round(c * a),
    blendOut: Math.round(p * a),
  };
}
function Ae(E = {}, F) {
  let a = Math.max(2, Math.round(F || 0)),
    c = a - 1,
    p = W((Math.round(E.start ?? 1) - 1) / c),
    O = W((Math.round(E.end ?? a) - 1) / c),
    { blendIn: f, blendOut: J } = D(E);
  return {
    start: Math.min(p, O),
    end: Math.max(p, O),
    blendIn: Math.max(0, Math.round(f) / c),
    blendOut: Math.max(0, Math.round(J) / c),
  };
}
function nn(E) {
  if (z(E)) return '';
  let F = (c) => String(+Number(c || 0).toFixed(3)),
    { blendIn: s, blendOut: a } = D(E),
    l = s <= 0 && a <= 0 ? '' : F(s) === F(a) ? ':' + F(s) : ':' + F(s) + ':' + F(a);
  return F(E?.start ?? 0) + '-' + F(E?.end ?? 1) + l;
}
function en(E) {
  let F = /^([0-9.]+)-([0-9.]+)(?::([0-9.]+))?(?::([0-9.]+))?$/.exec(String(E || '').trim());
  if (!F) return { ...V };
  let s = W(Number(F[1])),
    a = W(Number(F[2])),
    l = Math.max(0, Number(F[3] ?? 0) || 0);
  return {
    start: Math.min(s, a),
    end: Math.max(s, a),
    blendIn: l,
    blendOut: F[4] != null ? Math.max(0, Number(F[4]) || 0) : l,
  };
}
var K = 's',
  rt = 'l',
  G = 'c',
  Nn = ['sine', 'quad', 'cubic', 'quart', 'quint', 'expo', 'circ', 'back', 'bounce', 'elastic'],
  Sn = ['in', 'out', 'io'],
  _n = new Set(['back', 'bounce', 'elastic']);
function ct(r) {
  let [E, F = null] = String(r ?? '').split('.');
  return !Nn.includes(E) || (F != null && !Sn.includes(F)) ? null : { name: E, way: F };
}
var un = (r) => ct(r) != null,
  Fn = (r, E = null) => (E ? r + '.' + E : r),
  on = 1.70158,
  In = {
    sine: (r) => 1 - Math.cos((r * Math.PI) / 2),
    quad: (r) => r * r,
    cubic: (r) => r * r * r,
    quart: (r) => r * r * r * r,
    quint: (r) => r * r * r * r * r,
    expo: (r) => (r <= 0 ? 0 : Math.pow(2, 10 * (r - 1))),
    circ: (r) => 1 - Math.sqrt(Math.max(0, 1 - r * r)),
    back: (r) => r * r * ((on + 1) * r - on),
    bounce: (r) => 1 - En(1 - r),
    elastic: (r) =>
      r <= 0
        ? 0
        : r >= 1
          ? 1
          : -Math.pow(2, 10 * r - 10) * Math.sin((r * 10 - 10.75) * ((2 * Math.PI) / 3)),
  };
function En(r) {
  return r < 1 / 2.75
    ? 7.5625 * r * r
    : r < 2 / 2.75
      ? ((r -= 1.5 / 2.75), 7.5625 * r * r + 0.75)
      : r < 2.5 / 2.75
        ? ((r -= 2.25 / 2.75), 7.5625 * r * r + 0.9375)
        : ((r -= 2.625 / 2.75), 7.5625 * r * r + 0.984375);
}
function $n(E, F) {
  let s = ct(E);
  if (!s) return F;
  let a = In[s.name],
    l = s.way ?? (_n.has(s.name) ? 'out' : 'in');
  return l === 'in'
    ? a(F)
    : l === 'out'
      ? 1 - a(1 - F)
      : F < 0.5
        ? a(2 * F) / 2
        : 1 - a(2 - 2 * F) / 2;
}
var Tn = {
    sine: 'Sinusoidal',
    quad: 'Quadratic',
    cubic: 'Cubic',
    quart: 'Quartic',
    quint: 'Quintic',
    expo: 'Exponential',
    circ: 'Circular',
    back: 'Back',
    bounce: 'Bounce',
    elastic: 'Elastic',
  },
  Bn = { in: 'Ease in', out: 'Ease out', io: 'Ease in and out' };
function Oe(r) {
  if (r === rt) return 'Linear';
  if (r === G) return 'Step';
  let E = ct(r);
  return E ? Tn[E.name] + (E.way ? ', ' + Bn[E.way].toLowerCase() : '') : 'Bezier';
}
var cn = 1e-9,
  Cn = 1e-7,
  xt = (r) => Math.min(1, Math.max(0, Number(r) || 0)),
  $ = (r) => (r === rt || r === G || un(r) ? r : K),
  vt = (r) => (r == null || r === '' || !Number.isFinite(Number(r)) ? null : Number(r)),
  At = (r) =>
    r == null || r === '' || !(Number(r) > 0) || !Number.isFinite(Number(r)) ? null : Number(r);
function k(E, F = E?.v) {
  if (E?.tin == null && E?.tout == null) return null;
  if (Array.isArray(F)) {
    let A = (N) => F.map((M, k0) => vt(Array.isArray(N) ? N[k0] : null)),
      b = A(E.tin),
      x = A(E.tout);
    for (let N = 0; N < F.length; N++) ((b[N] ??= x[N]), (x[N] ??= b[N]));
    if (b.every((M) => M == null)) return null;
    let y = F.map(
        (M, k0) => b[k0] != null && (!!(Array.isArray(E.free) && E.free[k0]) || b[k0] !== x[k0]),
      ),
      v = (M) => F.map((k0, k1) => (b[k1] == null ? null : At(Array.isArray(M) ? M[k1] : null))),
      g = v(E.lin),
      I = v(E.lout);
    return {
      tin: b,
      tout: x,
      ...(y.some(Boolean) ? { free: y } : {}),
      ...(g.some((M) => M != null) ? { lin: g } : {}),
      ...(I.some((M) => M != null) ? { lout: I } : {}),
    };
  }
  let a = vt(E.tin),
    p = vt(E.tout);
  if (a == null && p == null) return null;
  ((a ??= p), (p ??= a));
  let O = At(Array.isArray(E.lin) ? E.lin[0] : E.lin),
    J = At(Array.isArray(E.lout) ? E.lout[0] : E.lout);
  return {
    tin: a,
    tout: p,
    ...(E.free || a !== p ? { free: !0 } : {}),
    ...(O != null ? { lin: O } : {}),
    ...(J != null ? { lout: J } : {}),
  };
}
var an = ['auto', 'vector'],
  rn = (r) => (an.includes(r) ? r : null);
function at(E, F = E?.v, s = k(E, F)) {
  if (E?.ht == null) return null;
  if (Array.isArray(F)) {
    let l = F.map((c, p) =>
      c == null || s?.tin?.[p] != null ? null : rn(Array.isArray(E.ht) ? E.ht[p] : null),
    );
    return l.some(Boolean) ? { ht: l } : null;
  }
  let a = s ? null : rn(Array.isArray(E.ht) ? E.ht[0] : E.ht);
  return a ? { ht: a } : null;
}
function St(r, E) {
  let F = (s, a) =>
    Array.isArray(s) ? s.map((l) => (l == null ? null : a(l))) : s == null ? s : a(s);
  return {
    ...(r.tin != null || r.tout != null
      ? { tin: F(r.tin, (s) => s * E), tout: F(r.tout, (s) => s * E) }
      : {}),
    ...(r.lin != null ? { lin: F(r.lin, (s) => s / E) } : {}),
    ...(r.lout != null ? { lout: F(r.lout, (s) => s / E) } : {}),
  };
}
var _t = (r) => (r == null || r === '' || !Number.isFinite(Number(r)) ? null : Number(r)),
  P = (r, E) => $(Array.isArray(r?.i) ? r.i[E] : r?.i);
function Pn(r, E) {
  let F = E.filter((s, a) => r[a] != null);
  return F.every((s) => s === F[0]) ? (F[0] ?? K) : r.map((s, a) => (s == null ? null : E[a]));
}
function w(E) {
  let F = [];
  for (let c of E || []) {
    let p = Number(c?.u);
    if (!Number.isFinite(p)) continue;
    let O, f;
    if (Array.isArray(c.v)) {
      if (((O = c.v.map(_t)), O.every((d) => d == null))) continue;
      f = Array.isArray(c.i)
        ? Pn(
            O,
            O.map((d, A) => $(c.i[A])),
          )
        : $(c.i);
    } else {
      if (((O = Number(c.v)), !Number.isFinite(O))) continue;
      f = $(Array.isArray(c.i) ? c.i[0] : c.i);
    }
    let J = k(c, O);
    F.push({ u: p, v: O, i: f, ...J, ...at(c, O, J) });
  }
  F.sort((u, d) => u.u - d.u);
  let a = [];
  for (let u of F)
    a.length && Math.abs(a[a.length - 1].u - u.u) < cn ? (a[a.length - 1] = u) : a.push(u);
  return a;
}
function qn(E, F, a, p, O) {
  let f = F.length,
    J = new Float64Array(f),
    d = new Float64Array(f);
  ((J[0] = a[0] / F[0]), (d[0] = p[0] / F[0]));
  for (let A = 1; A < f; A++) {
    let b = F[A] - E[A] * J[A - 1];
    ((J[A] = a[A] / b), (d[A] = (p[A] - E[A] * d[A - 1]) / b));
  }
  O[f - 1] = d[f - 1];
  for (let x = f - 2; x >= 0; x--) O[x] = d[x] - J[x] * O[x + 1];
  return O.every(Number.isFinite);
}
function zn(E, F, O, J, x, g, I) {
  let N = F.length,
    k0 = Float64Array.from(E),
    k1 = Float64Array.from(F),
    k2 = Float64Array.from(O),
    k3 = Float64Array.from(J),
    k4 = new Uint8Array(N),
    k5 = new Uint8Array(N),
    k6,
    k7;
  do {
    if (!qn(E, F, O, J, x)) return !1;
    let k8 = !1,
      k9 = !1;
    k6 = k7 = !1;
    do {
      for (let kk = 0; kk < N; kk++) {
        if (x[kk] >= g[kk] && x[kk] <= I[kk]) continue;
        k6 = !0;
        let kw = x[kk] > I[kk] ? I[kk] : g[kk];
        (kw !== 0 || k8) &&
          ((k4[kk] = 1), (E[kk] = O[kk] = 0), (F[kk] = 1), (J[kk] = kw), (k9 = !0));
      }
      k8 = !0;
    } while (k6 && !k9);
    if (!k9)
      for (let kV = 0; kV < N; kV++) {
        if (!k4[kV] || k5[kV] >= 2) continue;
        let kD =
          -(k0[kV] * x[(kV + N - 1) % N] + k1[kV] * x[kV] + k2[kV] * x[(kV + 1) % N] - k3[kV]) *
          k1[kV];
        ((kD > 0 && x[kV] < I[kV]) || (kD < 0 && x[kV] > g[kV])) &&
          ((E[kV] = k0[kV]),
          (F[kV] = k1[kV]),
          (O[kV] = k2[kV]),
          (J[kV] = k3[kV]),
          (k4[kV] = 0),
          k5[kV]++,
          (k7 = !0));
      }
  } while (k6 || k7);
  return !0;
}
function ln(r, E, F, s) {
  s > 0
    ? ((r[F] = Math.min(r[F], s)), (E[F] = 0))
    : s < 0
      ? ((r[F] = 0), (E[F] = Math.max(E[F], s)))
      : (r[F] = E[F] = 0);
}
function sn(r, E, F) {
  let s = F / (r + F / 3);
  return (s < 1 && ((r *= s), (E *= s)), { hy: E, adj: 1 - (3 * r) / F });
}
function Kn(E, F, O = null, J = null) {
  let x = E.length,
    v = new Float64Array(x),
    g = new Float64Array(x);
  if (x < 2) return { min: v, mout: g };
  let I = (k5) => O?.[k5] ?? null,
    N = (k5) => (I(k5) ? 'own' : (J?.[k5] ?? 'clamped')),
    k0 = (k5) => N(k5) === 'clamped',
    k1 = (k5) => N(k5) === 'vector',
    k2 = new Uint8Array(x);
  for (let k5 = 0; k5 < x; k5++) {
    let k6 = I(k5);
    if (k6) {
      ((k2[k5] = 1), (v[k5] = k6.tin), (g[k5] = k6.tout));
      continue;
    }
    if (k1(k5)) {
      k2[k5] = 1;
      let k9 = k5 > 0 ? (F[k5] - F[k5 - 1]) / (E[k5] - E[k5 - 1]) : null,
        kk = k5 < x - 1 ? (F[k5 + 1] - F[k5]) / (E[k5 + 1] - E[k5]) : null;
      ((v[k5] = k9 ?? kk), (g[k5] = kk ?? k9));
      continue;
    }
    if (k5 === 0 || k5 === x - 1) {
      k2[k5] = 1;
      continue;
    }
    if (!k0(k5)) continue;
    let k7 = F[k5 - 1] - F[k5],
      k8 = F[k5 + 1] - F[k5];
    ((k7 <= 0 && k8 <= 0) || (k7 >= 0 && k8 >= 0)) && (k2[k5] = 1);
  }
  let k3 = 0;
  for (let kw = 1; kw < x; kw++) {
    if (!k2[kw]) continue;
    let kV = k1(k3),
      kD = k1(kw);
    ((kw - k3 >= 2 || kV !== kD) && k4(k3, kw, kV, kD), (k3 = kw));
  }
  return { min: v, mout: g };
  function k4(km, kS, kr, kE) {
    let kF = kS - km + 1,
      kC = new Float64Array(kF),
      ks = new Float64Array(kF),
      kH = new Float64Array(kF);
    for (let kf = 1; kf < kF; kf++)
      ((kC[kf] = E[km + kf] - E[km + kf - 1]), (ks[kf] = F[km + kf] - F[km + kf - 1]));
    kH[0] = kH[kF - 1] = 1;
    for (let kJ = 1; kJ < kF - 1; kJ++) kH[kJ] = kC[kJ + 1] / kC[kJ];
    let ka = new Float64Array(kF).fill(1 / 0),
      kR = new Float64Array(kF).fill(-1 / 0);
    for (let kZ = 1; kZ < kF; kZ++)
      (k0(km + kZ - 1) && ln(ka, kR, kZ - 1, ks[kZ]),
        k0(km + kZ) && ln(ka, kR, kZ, ks[kZ] * kH[kZ]));
    let kl = new Float64Array(kF),
      kQ = new Float64Array(kF),
      kc = new Float64Array(kF),
      kj = new Float64Array(kF),
      kz = 0,
      kp = 0;
    if (kr) ((kl[0] = 0), (kQ[0] = 2), (kc[0] = 1 / kH[1]), (kj[0] = ks[1]));
    else {
      let kU = I(km)?.lout ?? kC[1] / 3,
        ku = sn(kU, g[km] * kU, kC[1]);
      ((kz = ku.adj), (kl[0] = kc[0] = 0), (kQ[0] = 1), (kj[0] = ku.hy));
    }
    if (kE)
      ((kl[kF - 1] = kH[kF - 1] * kH[kF - 1]),
        (kQ[kF - 1] = 2 * kH[kF - 1]),
        (kc[kF - 1] = 0),
        (kj[kF - 1] = ks[kF - 1] * kH[kF - 1] * kH[kF - 1]));
    else {
      let kd = I(kS)?.lin ?? kC[kF - 1] / 3,
        kK = sn(kd, v[kS] * kd, kC[kF - 1]);
      ((kp = kK.adj), (kl[kF - 1] = kc[kF - 1] = 0), (kQ[kF - 1] = 1), (kj[kF - 1] = kK.hy));
    }
    for (let kT = 1; kT < kF - 1; kT++)
      ((kl[kT] = kH[kT] * kH[kT]),
        (kQ[kT] = 2 * (kH[kT] + 1)),
        (kc[kT] = 1 / kH[kT + 1]),
        (kj[kT] = ks[kT] * kH[kT] * kH[kT] + ks[kT + 1]));
    ((kF > 2 || kE) && (kQ[1] += kH[1] * kz), (kF > 2 || kr) && (kQ[kF - 2] += kp));
    let kO = new Float64Array(kF);
    if (zn(kl, kQ, kc, kj, kO, kR, ka)) {
      for (let kA = 1; kA < kF - 1; kA++) v[km + kA] = g[km + kA] = (3 * kO[kA]) / kC[kA + 1];
      (kr && ((g[km] = (3 * kO[0]) / kC[1]), km === 0 && (v[km] = g[km])),
        kE && ((v[kS] = (3 * kO[kF - 1]) / kC[kF - 1]), kS === x - 1 && (g[kS] = v[kS])));
      return;
    }
    for (let ko = 1; ko < kF - 1; ko++) {
      let kX = ks[ko] / kC[ko],
        kL = ks[ko + 1] / kC[ko + 1];
      v[km + ko] = g[km + ko] =
        Math.sign(kX) * Math.min(Math.abs((kX + kL) / 2), 3 * Math.min(Math.abs(kX), Math.abs(kL)));
    }
  }
}
function Rn(E, F) {
  let s = 0,
    a = E.length - 2;
  for (; s < a;) {
    let l = (s + a + 1) >> 1;
    E[l] <= F ? (s = l) : (a = l - 1);
  }
  return s;
}
function ft(E, F, a, l = null) {
  let c = (O) => (l == null ? (Array.isArray(O) ? O[0] : O) : O?.[l]),
    p = E.map((O) => {
      let f = c(O.tin),
        J = c(O.tout);
      return f != null || J != null
        ? { tin: f ?? J, tout: J ?? f, lin: c(O.lin) ?? null, lout: c(O.lout) ?? null }
        : null;
    });
  return Kn(
    F,
    a,
    p,
    E.map((O) => c(O.ht) ?? null),
  );
}
var Ft = (r, E = null) => {
  let F = (s) => (E == null ? (Array.isArray(s) ? s[0] : s) : s?.[E]);
  return { lin: r.map((s) => F(s.lin) ?? null), lout: r.map((s) => F(s.lout) ?? null) };
};
function jn(E, J, g, I, k0, k1, k2, k3, k4) {
  let k5 = g - E,
    k6 = k2 ?? k5 / 3,
    k7 = k3 ?? k5 / 3,
    k8 = k0 * k6,
    k9 = k1 * k7;
  (k6 > k5 && ((k8 *= k5 / k6), (k6 = k5)), k7 > k5 && ((k9 *= k5 / k7), (k7 = k5)));
  let kk = E + k6,
    kw = g - k7,
    kV = J + k8,
    kD = I - k9,
    km = 0,
    kS = 1,
    kr = (k4 - E) / k5;
  for (let kF = 0; kF < 40; kF++) {
    let kC = 1 - kr,
      ks = kC * kC * kC * E + 3 * kC * kC * kr * kk + 3 * kC * kr * kr * kw + kr * kr * kr * g - k4;
    if (Math.abs(ks) < 1e-14) break;
    ks > 0 ? (kS = kr) : (km = kr);
    let kH = 3 * kC * kC * (kk - E) + 6 * kC * kr * (kw - kk) + 3 * kr * kr * (g - kw),
      ka = kH > 1e-15 ? kr - ks / kH : (km + kS) / 2;
    ((ka > km && ka < kS) || (ka = (km + kS) / 2), (kr = ka));
  }
  let kE = 1 - kr;
  return kE * kE * kE * J + 3 * kE * kE * kr * kV + 3 * kE * kr * kr * kD + kr * kr * kr * I;
}
function wt(E, F, p, O, J, A, x = null, y = null) {
  let v = E.length;
  if (A <= E[0]) return F[0];
  if (A >= E[v - 1]) return F[v - 1];
  let g = Rn(E, A);
  if (E[g + 1] - A < Cn) return F[g + 1];
  let I = E[g + 1] - E[g],
    N = (A - E[g]) / I;
  if (p[g] === G) return F[g];
  if (p[g] === rt) return F[g] + (F[g + 1] - F[g]) * N;
  if (un(p[g])) return F[g] + (F[g + 1] - F[g]) * $n(p[g], N);
  let M = y?.[g] ?? null,
    k0 = x?.[g + 1] ?? null;
  if (M != null || k0 != null) return jn(E[g], F[g], E[g + 1], F[g + 1], J[g], O[g + 1], M, k0, A);
  let k1 = N * N,
    k2 = k1 * N;
  return (
    (2 * k2 - 3 * k1 + 1) * F[g] +
    (k2 - 2 * k1 + N) * I * J[g] +
    (3 * k1 - 2 * k2) * F[g + 1] +
    (k2 - k1) * I * O[g + 1]
  );
}
function fn(E, F) {
  let a = E.filter((O) => Array.isArray(O.v) && O.v[F] != null);
  if (!a.length) return null;
  let l = a.map((O) => O.u),
    c = a.map((O) => O.v[F]),
    p = a.map((O) => P(O, F));
  return { ks: a, us: l, ys: c, is: p, ...Ft(a, F), ...ft(a, l, c, F) };
}
function R(E) {
  let F = w(E);
  if (!F.length) return () => null;
  if (Array.isArray(F[0].v)) {
    let x = Math.max(...F.map((v) => (Array.isArray(v.v) ? v.v.length : 0))),
      y = Array.from({ length: x }, (v, g) => fn(F, g));
    return (v) => y.map((g) => (g ? wt(g.us, g.ys, g.is, g.min, g.mout, v, g.lin, g.lout) : 0));
  }
  let a = F.map((v) => v.u),
    p = F.map((v) => v.i),
    O = F.map((v) => v.v),
    { min: J, mout: d } = ft(F, a, O),
    { lin: A, lout: b } = Ft(F);
  return (v) => wt(a, O, p, J, d, v, A, b);
}
function Ne(r, E) {
  return (r || []).map((F) => {
    let s = (a) => E.map((l) => (Array.isArray(a) ? (a[l] ?? null) : null));
    return {
      u: F.u,
      i: Array.isArray(F.i) ? E.map((a) => F.i[a] ?? null) : F.i,
      v: E.map((a) => _t(F.v?.[a])),
      ...(F.tin != null || F.tout != null
        ? {
            tin: s(F.tin),
            tout: s(F.tout),
            free: s(F.free).map(Boolean),
            ...(F.lin != null ? { lin: s(F.lin) } : {}),
            ...(F.lout != null ? { lout: s(F.lout) } : {}),
          }
        : {}),
      ...(F.ht != null ? { ht: s(F.ht) } : {}),
    };
  });
}
function It(E, F = null) {
  let a = w(E);
  if (!a.length) return [];
  let c =
    F == null
      ? { ks: a, us: a.map((A) => A.u), ys: a.map((A) => Number(A.v) || 0), is: a.map((A) => A.i) }
      : fn(a, F);
  if (!c) return [];
  let { min: p, mout: O } = F == null ? ft(a, c.us, c.ys, null) : c,
    f = (A) => (F == null ? A : A?.[F]),
    J = c.us.length,
    d = (A, b) => {
      let x = A > 0 ? c.us[A] - c.us[A - 1] : null,
        y = A < J - 1 ? c.us[A + 1] - c.us[A] : null;
      return ((b < 0 ? (x ?? y) : (y ?? x)) ?? 0) / 3;
    };
  return c.ks.map((A, b) => {
    let x = f(A.tin) != null,
      y = x && !!f(A.free),
      v = x ? (f(A.lin) ?? null) : null,
      g = x ? (f(A.lout) ?? null) : null;
    return {
      u: A.u,
      v: c.ys[b],
      i: c.is[b],
      tin: p[b],
      tout: O[b],
      own: x,
      free: y,
      type: x ? (y ? 'free' : 'aligned') : (f(A.ht) ?? 'clamped'),
      lin: v,
      lout: g,
      lenIn: v ?? d(b, -1),
      lenOut: g ?? d(b, 1),
    };
  });
}
var Hn = (r, E) => r[0] * E[0] + r[1] * E[1] + r[2] * E[2] + r[3] * E[3];
function hn(E) {
  let F = w(E);
  if (!F.length) return () => null;
  let a = null,
    l = F.map((O) => {
      let f = Array.from({ length: 4 }, (A, b) => (Array.isArray(O.v) ? (O.v[b] ?? null) : null)),
        J = !1;
      f.every((A) => A != null) &&
        (a && Hn(a, f) < 0 && ((f = f.map((A) => -A)), (J = !0)), (a = f));
      let d = (A) => (Array.isArray(A) ? A.map((b) => (b == null ? null : -b)) : A);
      return { ...O, v: f, ...(J && O.tin != null ? { tin: d(O.tin), tout: d(O.tout) } : {}) };
    }),
    c = [0, 0, 0, 1],
    p = [0, 1, 2, 3].map((O) => {
      let J = l.filter((x) => x.v[O] != null);
      if (!J.length) return null;
      let d = J.map((x) => x.u),
        A = J.map((x) => x.v[O]),
        b = J.map((x) => P(x, O));
      return { us: d, ys: A, is: b, ...Ft(J, O), ...ft(J, d, A, O) };
    });
  return (O) => {
    let f = p.map((d, A) => (d ? wt(d.us, d.ys, d.is, d.min, d.mout, O, d.lin, d.lout) : c[A])),
      J = Math.hypot(f[0], f[1], f[2], f[3]);
    return J < 0.000001 ? c.slice() : f.map((d) => d / J);
  };
}
function T(r, E) {
  let F = Math.max(2, Math.round(E || 0)) - 1;
  return Math.round(xt(r) * F) / F;
}
function q(r, E) {
  let F = Math.max(2, Math.round(E || 0)) - 1;
  return Math.round((Number(r) || 0) * F) / F;
}
function U(r, E) {
  if (!(r?.length >= 2)) return K;
  let F = null;
  for (let s of r)
    if (s.u < E) F = s;
    else break;
  return $((F ?? r.find((a) => a.u > E) ?? r[r.length - 1]).i);
}
function Et(E, F, a, p, O = null, J = void 0) {
  let A = T(F, p),
    b = w(E),
    x = b.find((M) => q(M.u, p) === A),
    y = J === void 0 ? (x ? { ...k(x, x.v), ...at(x, x.v) } : null) : J;
  if (!Array.isArray(a))
    return w([...b.filter((M) => M !== x), { u: A, v: a, i: O ?? x?.i ?? U(b, A), ...(y || {}) }]);
  let v = a.map(_t),
    g = Math.max(v.length, Array.isArray(x?.v) ? x.v.length : 0),
    I = Array.from(
      { length: g },
      (M, k0) => v[k0] ?? (Array.isArray(x?.v) ? (x.v[k0] ?? null) : null),
    ),
    N = I.map((M, k0) =>
      M == null
        ? null
        : v[k0] == null
          ? P(x, k0)
          : O != null
            ? $(Array.isArray(O) ? O[k0] : O)
            : Array.isArray(x?.v) && x.v[k0] != null
              ? P(x, k0)
              : U(
                  b
                    .filter((k1) => Array.isArray(k1.v) && k1.v[k0] != null)
                    .map((k1) => ({ u: k1.u, i: P(k1, k0) })),
                  A,
                ),
    );
  return w([...b.filter((M) => M !== x), { u: A, v: I, i: N, ...(y || {}) }]);
}
function L(E, F, a, c, p) {
  let O = T(F, a),
    f = p?.kind && an.includes(p.kind) ? p.kind : null,
    J = p && !f && p.tin != null;
  return w(
    w(E).map((g) => {
      if (q(g.u, a) !== O) return g;
      if (c == null || !Array.isArray(g.v)) {
        let { tin: k6, tout: k7, free: k8, lin: k9, lout: kk, ht: kw, ...kV } = g;
        return f
          ? { ...kV, ht: f }
          : J
            ? {
                ...kV,
                tin: p.tin,
                tout: p.tout ?? p.tin,
                ...(p.free ? { free: !0 } : {}),
                ...(p.lin != null ? { lin: p.lin } : {}),
                ...(p.lout != null ? { lout: p.lout } : {}),
              }
            : kV;
      }
      let I = g.v.length,
        N = (kD) =>
          Array.from({ length: I }, (km, kS) => (Array.isArray(kD) ? (kD[kS] ?? null) : null)),
        k0 = N(g.tin),
        k1 = N(g.tout),
        k2 = N(g.free).map(Boolean),
        k3 = N(g.lin),
        k4 = N(g.lout),
        k5 = N(g.ht);
      return (
        (k0[c] = J ? p.tin : null),
        (k1[c] = J ? (p.tout ?? p.tin) : null),
        (k2[c] = !!(J && p.free)),
        (k3[c] = J ? (p.lin ?? null) : null),
        (k4[c] = J ? (p.lout ?? null) : null),
        (k5[c] = f),
        { ...g, tin: k0, tout: k1, free: k2, lin: k3, lout: k4, ht: k5 }
      );
    }),
  );
}
function Se(r, E, F) {
  let s = T(E, F);
  return w(r).filter((a) => q(a.u, F) !== s);
}
function pn(r, E, F) {
  if (!(E?.length > 0) || !(F?.length > 0)) return w(r);
  let s = F.length / E.length;
  return w(
    (r || []).map((a) => ({
      ...a,
      u: (E.offset + Number(a.u) * E.length - F.offset) / F.length,
      ...St(a, s),
    })),
  );
}
function _e(E, F, p) {
  if (z(E)) return [{ u: 0, v: F, i: K }];
  let O = xt(E?.start ?? 0),
    J = xt(E?.end ?? 1);
  if (!(J > O)) return [];
  let { blendIn: A, blendOut: b } = D(E),
    x = O > 0 ? A : 0,
    y = J < 1 ? b : 0,
    v = J - O,
    g = x + y;
  g > v && ((x *= v / g), (y *= v / g));
  let I = 1 / (Math.max(2, Math.round(p || 0)) - 1),
    N = O + x,
    M = J - y;
  M - N < cn && (M = N);
  let k0 = [];
  return (
    O > 0 &&
      (x > 0 ? k0.push({ u: O, v: 0, i: K }) : k0.push({ u: Math.max(0, O - I), v: 0, i: G })),
    k0.push({ u: N, v: F, i: K }),
    J < 1 &&
      (y > 0
        ? (k0.push({ u: M, v: F, i: K }), k0.push({ u: J, v: 0, i: K }))
        : (k0.push({ u: J, v: F, i: G }), k0.push({ u: Math.min(1, J + I), v: 0, i: K }))),
    w(k0)
  );
}
var Ot = {
    sine: 'si',
    quad: 'qa',
    cubic: 'cu',
    quart: 'qr',
    quint: 'qn',
    expo: 'ex',
    circ: 'ci',
    back: 'ba',
    bounce: 'bo',
    elastic: 'el',
  },
  Nt = { in: 'i', out: 'o', io: 'b' };
function Z(r) {
  if (r === rt) return 'L';
  if (r === G) return 'S';
  let E = ct(r);
  return E ? 'E' + Ot[E.name] + (E.way ? Nt[E.way] : '') : '';
}
function X(r) {
  if (r === 'L') return rt;
  if (r === 'S') return G;
  let E = /^E([a-z]{2})([iob]?)$/.exec(r || ''),
    F = E && Object.keys(Ot).find((s) => Ot[s] === E[1]);
  return F ? Fn(F, E[2] ? Object.keys(Nt).find((s) => Nt[s] === E[2]) : null) : K;
}
var $t = '(?:[LS]|E[a-z]{2}[iob]?)?',
  Wn = '\\^((?:[LS]|E[a-z]{2}[iob]?)?(?:\\.(?:[LS]|E[a-z]{2}[iob]?)?)*)',
  Dn = (r) => (Array.isArray(r) ? '^' + r.map((E) => (E == null ? '' : Z(E))).join('.') : Z(r)),
  Un = (r, E) => (E != null ? E.split('.').map((F) => X(F)) : X(r)),
  Yn = '(?:' + Wn + '|(' + $t + '))';
function Tt(E, { digits: F = 3 } = {}) {
  if (E?.tin == null && E?.ht == null) return '';
  let a = (O) => String(+Number(O || 0).toFixed(F)),
    l = (O) => (O == null ? '' : String(+Number(O).toFixed(5))),
    c = (O, J, d, A, b, x) =>
      O == null
        ? x === 'auto'
          ? 'A'
          : x === 'vector'
            ? 'V'
            : ''
        : (d ? a(O) + '_' + a(J) : a(O)) + (A != null || b != null ? 'w' + l(A) + 'w' + l(b) : ''),
    p = Array.isArray(E.v)
      ? E.v.map((O, f) =>
          c(E.tin?.[f], E.tout?.[f], E.free?.[f], E.lin?.[f], E.lout?.[f], E.ht?.[f]),
        )
      : [c(E.tin, E.tout, E.free, E.lin, E.lout, E.ht)];
  return p.some(Boolean) ? p.join('/') : '';
}
var Ln = '[-0-9._/AVw]';
function Bt(E, F = null) {
  let a = (f) => (/^-?(?:[0-9]+\.?[0-9]*|\.[0-9]+)$/.test(f) ? Number(f) : NaN),
    c = String(E || '')
      .split('/')
      .map((J) => {
        if (!J) return null;
        if (J === 'A') return { ht: 'auto' };
        if (J === 'V') return { ht: 'vector' };
        let [A, b = '', x = ''] = J.split('w'),
          [y, v] = A.split('_').map(a);
        if (!Number.isFinite(y) || (v !== void 0 && !Number.isFinite(v))) return null;
        let g = b === '' ? null : a(b),
          I = x === '' ? null : a(x);
        return {
          tin: y,
          tout: v ?? y,
          free: v !== void 0,
          lin: Number.isFinite(g) ? g : null,
          lout: Number.isFinite(I) ? I : null,
        };
      });
  if (F == null) {
    let f = c[0];
    return f
      ? f.ht
        ? { ht: f.ht }
        : {
            tin: f.tin,
            tout: f.tout,
            ...(f.free ? { free: !0 } : {}),
            ...(f.lin != null ? { lin: f.lin } : {}),
            ...(f.lout != null ? { lout: f.lout } : {}),
          }
      : {};
  }
  let p = Array.from({ length: F }, (J, u) => c[u] ?? null),
    O = (J) => p.map((u) => (u && u.tin != null ? J(u) : null));
  return {
    ...(p.some((J) => J?.tin != null)
      ? {
          tin: O((J) => J.tin),
          tout: O((J) => J.tout),
          free: O((J) => J.free).map(Boolean),
          lin: O((J) => J.lin),
          lout: O((J) => J.lout),
        }
      : {}),
    ...(p.some((J) => J?.ht) ? { ht: p.map((J) => J?.ht ?? null) } : {}),
  };
}
function ht(E, { digits: F = 3 } = {}) {
  let s = w(E);
  if (!s.length) return '';
  let a = (c) => String(+Number(c || 0).toFixed(F)),
    l = (c) => {
      let p = Tt(c, { digits: F });
      return p ? '~' + p : '';
    };
  return (
    'k' +
    s
      .map(
        (c) =>
          +c.u.toFixed(5) +
          '=' +
          (Array.isArray(c.v) ? c.v.map((p) => (p == null ? '' : a(p))).join('/') : a(c.v)) +
          l(c) +
          Dn(c.i),
      )
      .join('|')
  );
}
function pt(E) {
  let F = String(E || '').trim();
  if (F[0] !== 'k') return null;
  let a = [];
  for (let p of F.slice(1).split('|')) {
    let O = new RegExp(
      '^(-?[0-9.]+)=((?:-?[0-9.]+)?(?:\\/(?:-?[0-9.]+)?)*)(?:~(' + Ln + '*))?' + Yn + '$',
    ).exec(p.trim());
    if (!O) continue;
    let f = O[2].split('/').map((d) => (d === '' ? null : Number(d)));
    if (
      f.some((d) => d != null && !Number.isFinite(d)) ||
      f.every((d) => d == null) ||
      (f.length === 1 && f[0] == null)
    )
      continue;
    let J = { u: Number(O[1]), v: f.length > 1 ? f : f[0], i: Un(O[5], O[4]) };
    (O[3] && Object.assign(J, Bt(O[3], f.length > 1 ? f.length : null)), a.push(J));
  }
  let c = w(a);
  return c.length ? c : null;
}
var B = (r, E, F) => q(r, F) === q(E, F);
function Ct(r, E) {
  return {
    v: r.v?.[E] ?? null,
    i: P(r, E),
    tin: r.tin?.[E] ?? null,
    tout: r.tout?.[E] ?? null,
    free: !!r.free?.[E],
    lin: r.lin?.[E] ?? null,
    lout: r.lout?.[E] ?? null,
    ht: r.ht?.[E] ?? null,
  };
}
function Y(E, F, a) {
  let p = Math.max(Array.isArray(E.v) ? E.v.length : 0, F + 1),
    O = (I, N) =>
      Array.from({ length: p }, (M, k0) =>
        k0 === F ? (a[I] ?? (I === 'free' ? !1 : null)) : N(k0),
      ),
    J = O('v', (I) => E.v?.[I] ?? null),
    d = Array.from({ length: p }, (I, N) =>
      N === F ? (a.v == null ? null : a.i) : E.v?.[N] != null ? P(E, N) : null,
    ),
    A = O('tin', (I) => E.tin?.[I] ?? null),
    b = O('tout', (I) => E.tout?.[I] ?? null),
    x = O('free', (I) => !!E.free?.[I]),
    y = O('lin', (I) => E.lin?.[I] ?? null),
    v = O('lout', (I) => E.lout?.[I] ?? null),
    g = O('ht', (I) => E.ht?.[I] ?? null);
  return {
    u: E.u,
    v: J,
    i: d,
    ...(A.some((I) => I != null) ? { tin: A, tout: b, free: x, lin: y, lout: v } : {}),
    ...(g.some(Boolean) ? { ht: g } : {}),
  };
}
var Pt = { v: null, i: null, tin: null, tout: null, free: !1, lin: null, lout: null, ht: null },
  qt = (r, E) => ({
    u: E,
    v: new Array(Math.max(0, ...r.map((F) => (Array.isArray(F.v) ? F.v.length : 0)))).fill(null),
  });
function zt(E, F, a, p = null) {
  if (p != null) {
    let x = w(E),
      y = F.map((g) => ({
        k: x.find((I) => B(I.u, g.from, a) && I.v?.[p] != null),
        to: T(g.to, a),
      })).filter((g) => g.k);
    if (!y.length) return x;
    let v = x.map((g) => (y.some((I) => I.k === g) ? Y(g, p, Pt) : g));
    for (let g of y) {
      let I = Ct(g.k, p),
        N = v.findIndex((M) => q(M.u, a) === g.to);
      N >= 0 ? (v[N] = Y(v[N], p, I)) : v.push(Y(qt(x, g.to), p, I));
    }
    return w(v);
  }
  let O = w(E),
    J = F.map((M) => ({ k: O.find((k0) => B(k0.u, M.from, a)), to: T(M.to, a) })).filter(
      (M) => M.k,
    );
  if (!J.length) return O;
  let A = new Set(J.map((M) => M.to)),
    b = O.filter((M) => !J.some((k0) => k0.k === M) && !A.has(q(M.u, a)));
  return w([...b, ...J.map((M) => ({ ...M.k, u: M.to }))]);
}
function Qn(E, F, s, a, l) {
  return w(
    w(E).map((c) => {
      if (!B(c.u, F, s)) return c;
      if (a == null || !Array.isArray(c.v)) return { ...c, v: l };
      let p = c.v.slice();
      return ((p[a] = l), { ...c, v: p });
    }),
  );
}
function Ee(E, F, s, a) {
  let l = Math.max(2, Math.round(F || 0));
  return w(
    w(E).map((c) => {
      let p = Math.round(c.u * (l - 1));
      if (!a.has(p)) return c;
      let O = a.get(p);
      if (s == null || !Array.isArray(c.v)) return { ...c, v: O };
      if (c.v[s] == null) return c;
      let f = c.v.slice();
      return ((f[s] = O), { ...c, v: f });
    }),
  );
}
function $e(E, F, a, p = null) {
  let O = w(E),
    f = T(F, a);
  if (p != null) {
    if (!O.length || O.some((x) => B(x.u, f, a) && x.v?.[p] != null)) return O;
    let J = R(O)(f)?.[p] ?? 0,
      d = O.filter((x) => x.v?.[p] != null).map((x) => ({ u: x.u, i: P(x, p) })),
      A = { ...Pt, v: J, i: U(d, f) },
      b = O.findIndex((x) => B(x.u, f, a));
    return w(b >= 0 ? O.map((x, y) => (y === b ? Y(x, p, A) : x)) : [...O, Y(qt(O, f), p, A)]);
  }
  return !O.length || O.some((x) => B(x.u, f, a)) ? O : w([...O, { u: f, v: R(O)(f), i: U(O, f) }]);
}
function Gn(E, F, a, p, O) {
  let J = w(E),
    d = T(F, a),
    A = J.findIndex((y) => B(y.u, d, a));
  if (p == null) {
    let y = O.i ?? (A >= 0 ? J[A].i : U(J, d)),
      v = {
        u: d,
        v: O.v,
        i: y,
        ...(O.tin != null
          ? {
              tin: O.tin,
              tout: O.tout ?? O.tin,
              ...(O.free ? { free: !0 } : {}),
              lin: O.lin,
              lout: O.lout,
            }
          : O.ht
            ? { ht: O.ht }
            : {}),
      };
    return w([...J.filter((g, I) => I !== A), v]);
  }
  let b =
      O.i ??
      (A >= 0 && J[A].v?.[p] != null
        ? P(J[A], p)
        : U(
            J.filter((g) => g.v?.[p] != null).map((g) => ({ u: g.u, i: P(g, p) })),
            d,
          )),
    x = {
      v: O.v,
      i: b,
      tin: O.tin ?? null,
      tout: O.tout ?? O.tin ?? null,
      free: !!O.free,
      lin: O.lin ?? null,
      lout: O.lout ?? null,
      ht: O.tin == null ? (O.ht ?? null) : null,
    };
  return w(A >= 0 ? J.map((g, I) => (I === A ? Y(g, p, x) : g)) : [...J, Y(qt(J, d), p, x)]);
}
function Te(E, F, s, a = null) {
  let l = (c) => F.some((p) => B(c.u, p, s));
  return a != null ? w(w(E).map((c) => (l(c) ? Y(c, a, Pt) : c))) : w(E).filter((c) => !l(c));
}
function Be(E, F, a, c, p = null) {
  let O = $(c),
    f = (J) => F.some((d) => B(J.u, d, a));
  return p != null
    ? w(w(E).map((J) => (f(J) && J.v?.[p] != null ? Y(J, p, { ...Ct(J, p), i: O }) : J)))
    : w(w(E).map((J) => (f(J) ? { ...J, i: O } : J)));
}
function Ce(E, F, { pt: p, lin: O, frames: J, copy: x = !1 }) {
  let v = Math.max(2, Math.round(J || 0)),
    g = (k3) => k3 / (v - 1),
    I = (k3, k4, k5) => Math.min(k5, Math.max(k4, k3)),
    N = F.map((k3) => {
      let [k4, k5] = p(k3.f, k3.v, k3);
      return {
        i: k3,
        f2: I(Math.round(k4), 0, v - 1),
        v2: I(k5, k3.min ?? -1 / 0, k3.max ?? 1 / 0),
      };
    }),
    M = (k3) => (k3.v2 - (k3.i.shift || 0)) / (k3.i.scale || 1),
    k0 = (k3) => {
      let k4 = k3.i.scale || 1,
        k5 = 1 / (v - 1),
        k6 = k3.i.lenIn != null && k3.i.lenOut != null,
        k7 = k6 ? k3.i.lenIn / k5 : 1,
        k8 = k6 ? k3.i.lenOut / k5 : 1,
        k9 = (kS) => kS * k4 * k5,
        kk = (kS) => kS / k4 / k5,
        kw = O(k8, k9(k3.i.tout) * k8),
        kV = O(-k7, -k9(k3.i.tin) * k7);
      kw[0] < 0 && kV[0] > 0 && ([kw, kV] = [kV, kw]);
      let kD = (kS) => (Math.abs(kS[0]) < 1e-9 ? Math.sign(kS[1] || 1) * 1000000 : kS[1] / kS[0]),
        km = (kS, kr) => (k6 ? Math.max(Math.abs(kS[0]), 0.001) * k5 : (kr ?? null));
      return {
        tin: kk(kD(kV)),
        tout: kk(kD(kw)),
        free: !!k3.i.free,
        lin: km(kV, k3.i.lin),
        lout: km(kw, k3.i.lout),
      };
    },
    k1 = w(E),
    k2 = k1;
  if (x) {
    for (let k3 of N) {
      let k4 = k1.find((k7) => B(k7.u, g(k3.i.f), J)),
        k5 = k4 ? Ct(k4, k3.i.axis ?? 0) : null,
        k6 = k3.i.axis == null ? k4?.i : k5?.i;
      k2 = Gn(k2, g(k3.f2), v, k3.i.axis ?? null, {
        v: M(k3),
        i: k6,
        ...(k3.i.own ? k0(k3) : { ht: k3.i.kind ?? null }),
      });
    }
    return { curve: k2, landed: N.map((k7) => k7.f2) };
  }
  for (let k7 of new Set(F.map((k8) => k8.axis ?? null))) {
    let k8 = N.filter((k9) => (k9.i.axis ?? null) === k7 && k9.f2 !== k9.i.f);
    k8.length &&
      (k2 = zt(
        k2,
        k8.map((k9) => ({ from: g(k9.i.f), to: g(k9.f2) })),
        v,
        k7,
      ));
  }
  for (let k9 of N)
    ((k2 = Qn(k2, g(k9.f2), v, k9.i.axis ?? null, M(k9))),
      k9.i.own && (k2 = L(k2, g(k9.f2), v, k9.i.axis ?? null, k0(k9))));
  return { curve: k2, landed: N.map((kk) => kk.f2) };
}
var Pe = [
    ['free', 'Free'],
    ['vector', 'Vector'],
    ['aligned', 'Aligned'],
    ['auto', 'Automatic'],
    ['clamped', 'Auto Clamped'],
  ],
  qe = (r) => r?.type ?? (r?.own ? (r.free ? 'free' : 'aligned') : 'clamped');
function ze(E, F, a, c, p) {
  if (p === 'clamped') return L(E, F, a, c, null);
  if (p === 'auto' || p === 'vector') return L(E, F, a, c, { kind: p });
  let O = It(E, c).find((d) => B(d.u, F, a));
  if (!O) return w(E);
  let f = { lin: O.lin, lout: O.lout };
  if (p === 'free') return L(E, F, a, c, { tin: O.tin, tout: O.tout, free: !0, ...f });
  let J = (O.tin + O.tout) / 2;
  return L(E, F, a, c, { tin: J, tout: J, ...f });
}
function Ke(E, F, a, p, O, J, { apart: d = !1, len: A = null } = {}) {
  let b = It(E, p).find((I) => B(I.u, F, a));
  if (!b || !Number.isFinite(J)) return w(E);
  let x = d || b.type === 'free' || b.type === 'vector',
    y = A != null && A > 0 ? A : null,
    v = O === 'in' ? (y ?? b.lin) : b.lin,
    g = O === 'out' ? (y ?? b.lout) : b.lout;
  return x
    ? L(
        E,
        F,
        a,
        p,
        O === 'in'
          ? { tin: J, tout: b.tout, free: !0, lin: v, lout: g }
          : { tin: b.tin, tout: J, free: !0, lin: v, lout: g },
      )
    : L(E, F, a, p, { tin: J, tout: J, lin: v, lout: g });
}
var C = {
    armSpace: {
      label: 'Arms \u2195',
      unit: '\u00B0',
      min: -120,
      max: 120,
      neutral: 0,
      kind: 'offset',
      axis: [0, 0, 1],
      mirror: !0,
      bones: { upperarm_l: 1, upperarm_r: 1 },
      legs: !1,
    },
    armFwd: {
      label: 'Arms \u2194',
      unit: '\u00B0',
      min: -120,
      max: 120,
      neutral: 0,
      kind: 'offset',
      axis: [0, -1, 0],
      mirror: !0,
      bones: { upperarm_l: 1, upperarm_r: 1 },
      legs: !1,
    },
    posture: {
      label: 'Posture',
      unit: '\u00B0',
      min: -90,
      max: 90,
      neutral: 0,
      kind: 'offset',
      axis: [1, 0, 0],
      mirror: !1,
      bones: { spine_01: 0.5, spine_02: 0.3, spine_03: 0.2 },
      legs: !1,
    },
    chestTurn: {
      label: 'Chest \u2194',
      unit: '\u00B0',
      min: -90,
      max: 90,
      neutral: 0,
      kind: 'offset',
      axis: [0, 1, 0],
      mirror: !1,
      bones: { spine_01: 0.15, spine_02: 0.35, spine_03: 0.5 },
      legs: !1,
    },
    chestPitch: {
      label: 'Chest \u2195',
      unit: '\u00B0',
      min: -90,
      max: 90,
      neutral: 0,
      kind: 'offset',
      axis: [1, 0, 0],
      mirror: !1,
      bones: { spine_01: 0.15, spine_02: 0.35, spine_03: 0.5 },
      legs: !1,
    },
    headPitch: {
      label: 'Head \u2195',
      unit: '\u00B0',
      min: -80,
      max: 80,
      neutral: 0,
      kind: 'offset',
      axis: [-1, 0, 0],
      mirror: !1,
      bones: { neck_01: 0.4, Head: 0.6 },
      legs: !1,
    },
    headYaw: {
      label: 'Head \u2194',
      unit: '\u00B0',
      min: -90,
      max: 90,
      neutral: 0,
      kind: 'offset',
      axis: [0, 1, 0],
      mirror: !1,
      bones: { neck_01: 0.4, Head: 0.6 },
      legs: !1,
    },
    speed: {
      label: 'Speed',
      unit: 'x',
      min: 0.1,
      max: 5,
      neutral: 1,
      step: 0.05,
      kind: 'time',
      legs: !1,
    },
  },
  tt = Object.keys(C),
  mt = tt.filter((r) => C[r].kind === 'offset'),
  We = tt.filter((r) => C[r].kind !== 'offset');
function Jn() {
  let r = {};
  for (let E of tt) r[E] = C[E].neutral;
  return ((r.ranges = {}), (r.muted = {}), (r.solo = {}), (r.keys = {}), r);
}
function Rt(r, E) {
  let F = r?.keys?.[E];
  return Array.isArray(F) && F.length && C[E]?.kind === 'offset' ? F : null;
}
function mn(r, E) {
  if (Rt(r, E)) return !0;
  let F = C[E];
  return Math.abs((r?.[E] ?? F.neutral) - F.neutral) > 0.000001;
}
function Vn(r, E) {
  if (r?.muted?.[E]) return !0;
  let F = r?.solo || {};
  return mt.some((s) => F[s] && mn(r, s)) && mt.includes(E) && !F[E];
}
function dn(r) {
  if (!r) return r;
  let E = { ...r };
  for (let F of mt)
    Vn(r, F) &&
      ((E[F] = C[F].neutral), E.keys?.[F] && ((E.keys = { ...E.keys }), delete E.keys[F]));
  return E;
}
function bn(r) {
  return r ? tt.some((E) => mn(r, E)) : !1;
}
function Zn(r, E) {
  let F = r?.ranges?.[E];
  return F && !z(F) ? Mt(F) : { ...V };
}
function Xn(r) {
  return !bn(dn(r));
}
function De(r) {
  return r ? tt.some((E) => C[E].legs && Math.abs((r[E] ?? 0) - C[E].neutral) > 0.000001) : !1;
}
function kn(r) {
  return [-r[0], -r[1], -r[2], r[3]];
}
function lt(E, F) {
  let [a, p, O, f] = E,
    [J, d, A, b] = F;
  return [
    f * J + a * b + p * A - O * d,
    f * d - a * A + p * b + O * J,
    f * A + a * d - p * J + O * b,
    f * b - a * J - p * d - O * A,
  ];
}
function te(E, F) {
  let [a, p, O, J] = E,
    [d, A, b] = F,
    x = 2 * (p * b - O * A),
    y = 2 * (O * d - a * b),
    v = 2 * (a * A - p * d);
  return [d + J * x + (p * v - O * y), A + J * y + (O * x - a * v), b + J * v + (a * y - p * x)];
}
function Kt(E, F) {
  let s = Math.hypot(E[0], E[1], E[2]) || 1,
    a = F / 2,
    l = Math.sin(a) / s;
  return [E[0] * l, E[1] * l, E[2] * l, Math.cos(a)];
}
function Ue(r) {
  let E = new Map(),
    F = (a, c) => {
      a.name && E.set(a.name, c);
      let p = a.quaternion,
        O = lt(c, [p.x, p.y, p.z, p.w]);
      for (let f of a.children || []) F(f, O);
    };
  return (F(r, [0, 0, 0, 1]), E);
}
function Ye(E, F, s, { cuts: a = !1 } = {}) {
  if (Xn(F)) return E;
  F = dn(F);
  let l = ne(E, F, s, a);
  return ((l = le(l, F.speed ?? 1)), l);
}
function ne(E, F, O, J = !1) {
  if (!O) return E;
  let g = new Map();
  for (let k1 of mt) {
    let k2 = C[k1],
      k3 = Rt(F, k1),
      k4 = F[k1] ?? k2.neutral,
      k5 = null,
      k6 = null,
      k7 = null;
    if (k3 && k3.length > 1) {
      if (k3.every((k9) => Math.abs(k9.v - k2.neutral) < 0.000001)) continue;
      let k8 = R(k3);
      ((k6 = (k9) => k8(k9) - k2.neutral), (k7 = k3.map((k9) => k9.u)));
    } else {
      if ((k3 && (k4 = k3[0].v), Math.abs(k4 - k2.neutral) < 0.000001)) continue;
      k5 = k3 ? { ...V } : Zn(F, k1);
    }
    for (let [k9, kk] of Object.entries(k2.bones)) {
      let kw = O.get(k9);
      if (!kw) continue;
      let kV = k2.mirror && k9.endsWith('_r') ? -1 : 1,
        kD = (Math.PI / 180) * kk * kV,
        km = te(kn(kw), k2.axis),
        kS = k6
          ? { axis: km, at: k6, perDeg: kD, times: k7 }
          : { axis: km, rad: (k4 - k2.neutral) * kD, range: k5 },
        kr = g.get(k9);
      kr ? kr.push(kS) : g.set(k9, [kS]);
    }
  }
  if (!g.size) return E;
  let I = E.duration || 0,
    N = jt(E),
    k0 = E.clone();
  return (
    (k0.tracks = k0.tracks.map((kE) => {
      let kF = kE.name.lastIndexOf('.'),
        kC = kF < 0 ? kE.name : kE.name.slice(0, kF),
        ks = kF < 0 ? '' : kE.name.slice(kF + 1),
        kH = g.get(kC);
      if (!kH || ks !== 'quaternion') return kE;
      if (!kH.some((kl) => kl.at || !z(kl.range)) || !(I > 0)) {
        let kl = kH.reduce(
            (kj, kz) => (kj ? lt(Kt(kz.axis, kz.rad), kj) : Kt(kz.axis, kz.rad)),
            null,
          ),
          kQ = kE.clone(),
          kc = kQ.values;
        for (let kj = 0; kj < kc.length; kj += 4) {
          let kz = lt(kl, [kc[kj], kc[kj + 1], kc[kj + 2], kc[kj + 3]]);
          ((kc[kj] = kz[0]), (kc[kj + 1] = kz[1]), (kc[kj + 2] = kz[2]), (kc[kj + 3] = kz[3]));
        }
        return kQ;
      }
      let ka = Dt(kE.times, kH, I, N);
      J &&
        (ka = Wt(
          ka,
          kH.flatMap((kp) => kp.times || []),
          I,
        ));
      let kR = Ut(kE.times, kE.values, ka);
      for (let kp = 0; kp < ka.length; kp++) {
        let kO = Ht(ka[kp], I, N),
          kf = null;
        for (let kU of kH) {
          let ku = kU.at ? kU.at(kO) * kU.perDeg : kU.rad * kt(kU.range, kO);
          if (Math.abs(ku) < 1e-12) continue;
          let kd = Kt(kU.axis, ku);
          kf = kf ? lt(kd, kf) : kd;
        }
        if (!kf) continue;
        let kJ = kp * 4,
          kZ = lt(kf, [kR[kJ], kR[kJ + 1], kR[kJ + 2], kR[kJ + 3]]);
        ((kR[kJ] = kZ[0]), (kR[kJ + 1] = kZ[1]), (kR[kJ + 2] = kZ[2]), (kR[kJ + 3] = kZ[3]));
      }
      return new kE['constructor'](kE.name, ka, kR);
    })),
    k0
  );
}
function jt(E) {
  let F = null;
  for (let O of E?.tracks ?? []) (!F || O.times.length > F.length) && (F = O.times);
  if (!F || F.length < 3) return 1 / 30;
  let a = new Map();
  for (let f = 1; f < F.length; f++) {
    let J = Math.round((F[f] - F[f - 1]) * 1000000) / 1000000;
    J > 0 && a.set(J, (a.get(J) || 0) + 1);
  }
  let c = 0,
    p = 0;
  for (let [u, d] of a) d > p && ((p = d), (c = u));
  return c > 0 ? c : 1 / 30;
}
function ee(r, E) {
  let F = Math.round(r / E);
  return F >= 1 && Math.abs(r / E - F) < 0.01 ? r / F : E;
}
function Ht(E, F, a) {
  if (!(F > 0)) return 0;
  let l = Math.round(F / a);
  if (!(l >= 1) || Math.abs(F / a - l) >= 0.01) return E / F;
  let c = (E / F) * l,
    p = Math.round(c);
  return Math.abs(c - p) < 0.001 ? p / l : E / F;
}
function Wt(E, F, a) {
  let c = [];
  for (let f of F) {
    let J = f * a;
    !(J > 0.0001) || J > a + 1e-9 || c.push(J - 0.0001);
  }
  if (!c.length) return E;
  let p = [...E, ...c].sort((d, A) => d - A),
    O = [];
  for (let d of p) (!O.length || d - O[O.length - 1] > 0.0001 * 0.5) && O.push(d);
  return new Float32Array(O);
}
function Dt(E, F, a, p) {
  let O = (v) => Math.round(Math.min(a, Math.max(0, v)) * 1000000) / 1000000;
  p = ee(a, p);
  let J = Array.from(E, O).sort((v, g) => v - g),
    d = p * 0.01,
    A = (v) => {
      let g = 0,
        I = J.length - 1;
      for (; g <= I;) {
        let N = (g + I) >> 1;
        if (Math.abs(J[N] - v) <= d) return !0;
        J[N] < v ? (g = N + 1) : (I = N - 1);
      }
      return !1;
    },
    b = [];
  for (let v of F)
    if (v.times) {
      for (let g of v.times) b.push(g * a);
    } else b.push(...tn(v.range, a));
  let x = Math.floor(a / p + 0.000001);
  for (let I = 0; I <= x; I++) b.push(I * p);
  b.push(a);
  let y = new Set(J);
  for (let N of b.map(O).sort((M, k0) => M - k0)) A(N) || (y.add(N), J.splice(oe(J, N), 0, N));
  return new Float32Array([...y].sort((M, k0) => M - k0));
}
function oe(E, F) {
  let s = 0,
    a = E.length;
  for (; s < a;) {
    let l = (s + a) >> 1;
    E[l] < F ? (s = l + 1) : (a = l);
  }
  return s;
}
function Ut(E, F, p) {
  let O = new Float32Array(p.length * 4),
    J = E.length - 1,
    A = 0;
  for (let x = 0; x < p.length; x++) {
    let y = p[x];
    for (; A < J - 1 && E[A + 1] < y;) A++;
    let v = E[A],
      g = E[Math.min(A + 1, J)],
      I = [F[A * 4], F[A * 4 + 1], F[A * 4 + 2], F[A * 4 + 3]],
      N = Math.min(A + 1, J),
      M = [F[N * 4], F[N * 4 + 1], F[N * 4 + 2], F[N * 4 + 3]],
      k0 = g - v,
      k1 = k0 > 0 ? Math.min(1, Math.max(0, (y - v) / k0)) : 0,
      k2 = re(I, M, k1);
    ((O[x * 4] = k2[0]), (O[x * 4 + 1] = k2[1]), (O[x * 4 + 2] = k2[2]), (O[x * 4 + 3] = k2[3]));
  }
  return O;
}
function re(E, F, a) {
  let [p, O, J, A] = F,
    b = E[0] * p + E[1] * O + E[2] * J + E[3] * A;
  if ((b < 0 && ((p = -p), (O = -O), (J = -J), (A = -A), (b = -b)), b > 0.9995)) {
    let I = [
        E[0] + (p - E[0]) * a,
        E[1] + (O - E[1]) * a,
        E[2] + (J - E[2]) * a,
        E[3] + (A - E[3]) * a,
      ],
      N = Math.hypot(...I) || 1;
    return I.map((M) => M / N);
  }
  let x = Math.acos(b),
    y = Math.sin(x),
    v = Math.sin((1 - a) * x) / y,
    g = Math.sin(a * x) / y;
  return [E[0] * v + p * g, E[1] * v + O * g, E[2] * v + J * g, E[3] * v + A * g];
}
function le(r, E) {
  if (!(E > 0) || Math.abs(E - 1) < 0.000001) return r;
  let F = r.clone(),
    s = 1 / E;
  return (
    (F.tracks = F.tracks.map((a) => {
      let c = a.clone();
      for (let p = 0; p < c.times.length; p++) c.times[p] *= s;
      return c;
    })),
    (F.duration = r.duration * s),
    F
  );
}
function Le(E) {
  if (!bn(E)) return '';
  let F = [];
  for (let a of tt) {
    let c = C[a],
      p = (E?.muted?.[a] ? ';m' : '') + (E?.solo?.[a] ? ';s' : ''),
      O = Rt(E, a);
    if (O) {
      F.push(a + ':' + ht(O) + p);
      continue;
    }
    let f = E[a] ?? c.neutral;
    if (Math.abs(f - c.neutral) < 0.000001) continue;
    let J = nn(E?.ranges?.[a]);
    F.push(a + ':' + +f.toFixed(3) + (J ? '@' + J : '') + p);
  }
  return F.join(',');
}
function Qe(E) {
  let F = Jn();
  for (let a of String(E || '')
    .split(',')
    .filter(Boolean)) {
    let [p, ...O] = a.split(';'),
      J = p.indexOf(':');
    if (J < 0) continue;
    let d = p.slice(0, J),
      A = p.indexOf('@', J),
      b = A < 0 ? p.slice(J + 1) : p.slice(J + 1, A),
      x = C[d];
    if (!x) continue;
    if (
      (O.includes('m') && (F.muted[d] = !0), O.includes('s') && (F.solo[d] = !0), b.startsWith('k'))
    ) {
      let v = x.kind === 'offset' ? pt(b) : null;
      v && (F.keys[d] = v.map((g) => ({ ...g, v: Math.min(x.max, Math.max(x.min, g.v)) })));
      continue;
    }
    if (A >= 0) {
      let g = en(p.slice(A + 1));
      z(g) || (F.ranges[d] = g);
    }
    let y = Number(b);
    Number.isFinite(y) && (F[d] = Math.min(x.max, Math.max(x.min, y)));
  }
  return F;
}
var j = 1e-9,
  ut = [0, 0, 0, 1],
  yn = (r) =>
    !!r && r !== 'root' && !r.startsWith('ik_') && !r.includes('_leaf') && !r.startsWith('socket_'),
  Xe = (r) => /^(thumb|index|middle|ring|pinky)_\d+_[lr]$/.test(r || '');
function Q(r, E) {
  return [
    r[3] * E[0] + r[0] * E[3] + r[1] * E[2] - r[2] * E[1],
    r[3] * E[1] - r[0] * E[2] + r[1] * E[3] + r[2] * E[0],
    r[3] * E[2] + r[0] * E[1] - r[1] * E[0] + r[2] * E[3],
    r[3] * E[3] - r[0] * E[0] - r[1] * E[1] - r[2] * E[2],
  ];
}
var gn = (r) => [-r[0], -r[1], -r[2], r[3]];
function bt(r) {
  let E = Math.hypot(r[0], r[1], r[2], r[3]) || 1;
  return r.map((F) => F / E);
}
var Qt = (r) => (r[3] < 0 ? r.map((E) => -E) : r);
function Yt(E, F) {
  let a = Qt(bt(E)),
    l = Math.acos(Math.min(1, a[3])),
    c = Math.sin(l);
  if (c < 1e-12) return [...ut];
  let p = Math.sin(l * F) / c;
  return [a[0] * p, a[1] * p, a[2] * p, Math.cos(l * F)];
}
function ke(r, E) {
  let F = r[0] * E[0] + r[1] * E[1] + r[2] * E[2] + r[3] * E[3] < 0 ? -1 : 1,
    s = Math.hypot(r[0] - F * E[0], r[1] - F * E[1], r[2] - F * E[2], r[3] - F * E[3]);
  return (4 * Math.asin(Math.min(1, s / 2)) * 180) / Math.PI;
}
function se(r) {
  let E = Qt(bt(r)),
    F = Math.hypot(E[0], E[1], E[2]);
  if (F < 1e-12) return [0, 0, 0];
  let s = (2 * Math.atan2(F, E[3]) * 180) / Math.PI;
  return [(E[0] / F) * s, (E[1] / F) * s, (E[2] / F) * s];
}
function ue(r) {
  let E = Math.hypot(r[0], r[1], r[2]);
  if (E < 1e-12) return [...ut];
  let F = (E * Math.PI) / 360,
    s = Math.sin(F) / E;
  return [r[0] * s, r[1] * s, r[2] * s, Math.cos(F)];
}
function Gt(E) {
  let [F, a, p, O] = bt(E),
    J = 1 - 2 * (a * a + p * p),
    A = 2 * (F * a - O * p),
    b = 2 * (F * p + O * a),
    x = 1 - 2 * (F * F + p * p),
    y = 2 * (a * p - O * F),
    v = 2 * (a * p + O * F),
    g = 1 - 2 * (F * F + a * a),
    I = 180 / Math.PI,
    N = Math.asin(Math.max(-1, Math.min(1, b)));
  return Math.abs(b) < 0.9999999
    ? [Math.atan2(-y, g) * I, N * I, Math.atan2(-A, J) * I]
    : [Math.atan2(v, x) * I, N * I, 0];
}
function yt([E, F, a]) {
  let p = Math.PI / 360,
    O = Math.cos(E * p),
    f = Math.cos(F * p),
    J = Math.cos(a * p),
    d = Math.sin(E * p),
    A = Math.sin(F * p),
    b = Math.sin(a * p);
  return [
    d * f * J + O * A * b,
    O * A * J - d * f * b,
    O * f * b + d * A * J,
    O * f * J - d * A * b,
  ];
}
function Jt(E, F = [0, 0, 0]) {
  let a = (J, d) => J + 360 * Math.round((d - J) / 360),
    c = (J) => J.map((d, A) => a(d, F[A] || 0)),
    p = (J) => J.reduce((d, A, b) => d + (A - (F[b] || 0)) ** 2, 0),
    O = c(E),
    f = c([E[0] + 180, 180 - E[1], E[2] + 180]);
  return p(f) < p(O) - 1e-9 ? f : O;
}
var Mn = (r) =>
    r.endsWith('_l') ? r.slice(0, -2) + '_r' : r.endsWith('_r') ? r.slice(0, -2) + '_l' : r,
  vn = (r) => [r[0], -r[1], -r[2], r[3]],
  ie = (r) => (r == null || r === '' || !Number.isFinite(Number(r)) ? null : Number(r));
function ce(r, E) {
  if (!r) return null;
  let F = k({ v: E, ...r }, E),
    s = at({ v: E, ...r }, E, F);
  return F || s ? { ...F, ...s } : null;
}
function ae(E, F) {
  if (Array.isArray(E)) {
    let a = E.slice(0, 4).map((c) => (c == null ? null : $(c)));
    for (; a.length < 4;) a.push(null);
    let l = a.filter((c) => c != null);
    return !l.length || l.every((c) => c === F)
      ? null
      : l.every((c) => c === l[0]) && a.every((c) => c != null)
        ? l[0]
        : a;
  }
  let s = E == null ? null : $(E);
  return s == null || s === F ? null : s;
}
function H(E, F = 0) {
  let O = [];
  for (let N of E?.keys || []) {
    let M = Number(N?.u);
    if (!Number.isFinite(M)) continue;
    let k0 = $(N.i),
      k1 = {},
      k2 = {},
      k3 = {};
    for (let [k4, k5] of Object.entries(N.bones || {})) {
      if (!yn(k4) || !Array.isArray(k5) || k5.length !== 4) continue;
      let k6 = k5.map(ie);
      if (k6.every((k9) => k9 == null)) continue;
      k1[k4] = k6;
      let k7 = ae(N.ib?.[k4], k0);
      k7 != null && (k2[k4] = k7);
      let k8 = ce(N.hb?.[k4], k6);
      k8 && (k3[k4] = k8);
    }
    O.push({
      u: M,
      i: k0,
      bones: k1,
      ...(Object.keys(k2).length ? { ib: k2 } : {}),
      ...(Object.keys(k3).length ? { hb: k3 } : {}),
    });
  }
  O.sort((k9, kk) => k9.u - kk.u);
  let J = [];
  for (let k9 of O)
    J.length && Math.abs(J[J.length - 1].u - k9.u) < j ? (J[J.length - 1] = k9) : J.push(k9);
  let x = {};
  for (let [kk, kw] of Object.entries(E?.curves || {})) {
    if (!yn(kk)) continue;
    let kV = w(
      (Array.isArray(kw) ? kw : []).filter(
        (kD) =>
          Array.isArray(kD?.v) &&
          kD.v.length === 3 &&
          kD.v.every((km) => km == null || Number.isFinite(km)),
      ),
    );
    kV.length && (x[kk] = kV);
  }
  let v = Object.keys(x),
    g = (
      v.length
        ? J.map((kD) => {
            if (!v.some((ks) => ks in kD.bones)) return kD;
            let km = { ...kD.bones },
              kS = { ...(kD.ib || {}) },
              kr = { ...(kD.hb || {}) };
            for (let ks of v) (delete km[ks], delete kS[ks], delete kr[ks]);
            let { ib: kE, hb: kF, ...kC } = kD;
            return {
              ...kC,
              bones: km,
              ...(Object.keys(kS).length ? { ib: kS } : {}),
              ...(Object.keys(kr).length ? { hb: kr } : {}),
            };
          })
        : J
    ).filter((kD) => Object.keys(kD.bones).length),
    I = Number(E?.weight);
  return {
    id: E?.id || 'pose' + (F + 1),
    name: String(E?.name || 'Pose ' + (F + 1)),
    mute: !!E?.mute,
    solo: !!E?.solo,
    weight: Number.isFinite(I) ? Math.min(1, Math.max(0, I)) : 1,
    keys: g,
    ...(v.length ? { curves: x } : {}),
  };
}
var Vt = (r) => !!r?.keys?.length || Object.keys(r?.curves || {}).length > 0,
  fe = (r) => [
    ...new Set([
      ...(r?.keys || []).flatMap((E) => Object.keys(E.bones || {})),
      ...Object.keys(r?.curves || {}),
    ]),
  ],
  Zt = (r, E) => !!r?.curves?.[E]?.length;
function he(r) {
  let E = new Map();
  for (let F of Object.values(r?.curves || {})) for (let s of F) E.has(s.u) || E.set(s.u, s.i);
  for (let a of r?.keys || []) E.set(a.u, a.i);
  return [...E]
    .map(([l, c]) => ({ u: l, i: c }))
    .sort((l, c) => l.u - c.u)
    .filter((l, c, p) => !c || l.u - p[c - 1].u > j);
}
function Lt(r) {
  let E = (r || []).filter(Vt),
    F = E.some((s) => s.solo);
  return E.filter((s) => !s.mute && (!F || s.solo) && s.weight > 0);
}
function nt(E) {
  let F = new Map();
  for (let s of fe(E)) {
    let a = E.curves?.[s];
    if (a?.length) {
      let l = R(a);
      F.set(s, (c) => yt(l(c)));
    } else
      F.set(
        s,
        hn(
          E.keys
            .filter((c) => s in c.bones)
            .map((c) => ({ u: c.u, i: c.ib?.[s] ?? c.i, v: c.bones[s], ...(c.hb?.[s] || {}) })),
        ),
      );
  }
  return F;
}
function to(r, E) {
  let F = null,
    s = (a, l = !1) =>
      Array.isArray(a)
        ? [a[3], a[0], a[1], a[2]].map((c) =>
            c == null ? null : l && typeof c == 'number' ? -c : c,
          )
        : a;
  return (r?.keys || [])
    .filter((a) => E in a.bones)
    .map((a) => {
      let c = a.bones[E].slice(),
        p = !1;
      c.every((J) => J != null) &&
        (F &&
          F[0] * c[0] + F[1] * c[1] + F[2] * c[2] + F[3] * c[3] < 0 &&
          ((c = c.map((J) => -J)), (p = !0)),
        (F = c));
      let O = a.ib?.[E] ?? a.i,
        f = a.hb?.[E];
      return {
        u: a.u,
        v: [c[3], c[0], c[1], c[2]],
        i: Array.isArray(O) ? [O[3], O[0], O[1], O[2]] : O,
        ...(f?.tin
          ? { tin: s(f.tin, p), tout: s(f.tout, p), free: s(f.free ?? [!1, !1, !1, !1]) }
          : {}),
        ...(f?.lin ? { lin: s(f.lin) } : {}),
        ...(f?.lout ? { lout: s(f.lout) } : {}),
        ...(f?.ht ? { ht: s(f.ht) } : {}),
      };
    });
}
function no(E, F, a) {
  let p = w(a || []),
    O = E.keys.map((d) => {
      if (!(F in d.bones)) return d;
      let A = { ...d.bones },
        b = { ...(d.ib || {}) },
        x = { ...(d.hb || {}) };
      return (delete A[F], delete b[F], delete x[F], { ...d, bones: A, ib: b, hb: x });
    }),
    J = (d) => (Array.isArray(d) ? [d[1], d[2], d[3], d[0]] : void 0);
  for (let d of p) {
    let A = Array.isArray(d.v) ? d.v : [],
      b = [A[1] ?? null, A[2] ?? null, A[3] ?? null, A[0] ?? null],
      x = Array.isArray(d.i) ? [d.i[1], d.i[2], d.i[3], d.i[0]] : d.i,
      y = {
        tin: J(d.tin),
        tout: J(d.tout),
        free: J(d.free),
        lin: J(d.lin),
        lout: J(d.lout),
        ht: J(d.ht),
      },
      v = O.findIndex((g) => Math.abs(g.u - d.u) < j);
    v >= 0
      ? (O[v] = {
          ...O[v],
          bones: { ...O[v].bones, [F]: b },
          ib: { ...(O[v].ib || {}), [F]: x },
          hb: { ...(O[v].hb || {}), [F]: y },
        })
      : O.push({
          u: d.u,
          i: Array.isArray(x) ? 's' : x,
          bones: { [F]: b },
          ib: { [F]: x },
          hb: { [F]: y },
        });
  }
  return H({ ...E, keys: O });
}
function pe(r, E) {
  if (Zt(r, E)) return r.curves[E];
  let F = [0, 0, 0],
    s = (r?.keys || []).some((a) => E in a.bones) ? nt(r).get(E) : null;
  return (r?.keys || [])
    .filter((a) => E in a.bones)
    .map((a) => ((F = Jt(Gt(s(a.u)), F)), { u: a.u, i: a.i, v: F }));
}
function eo(E, F) {
  let s = pe(E, F);
  if (!s.length) return () => [0, 0, 0];
  let a = R(s);
  if (Zt(E, F)) return a;
  let l = nt(E).get(F);
  return (c) => Jt(Gt(l(c)), a(c));
}
function oo(E, F, a) {
  let l = { ...(E?.curves || {}) },
    c = w(a || []);
  c.length ? (l[F] = c) : delete l[F];
  let p = c.length
    ? E.keys
    : E.keys
        .map((O) => {
          let f = { ...O.bones };
          return (delete f[F], { ...O, bones: f });
        })
        .filter((O) => Object.keys(O.bones).length);
  return H({ ...E, keys: p, curves: l });
}
function An(r) {
  let E = Lt(r).map((F) => ({ w: F.weight, s: nt(F) }));
  return E.length
    ? {
        bones: [...new Set(E.flatMap((F) => [...F.s.keys()]))],
        times: [...new Set(Lt(r).flatMap((F) => he(F).map((s) => s.u)))],
        at(F, a) {
          let e = null;
          for (let c of E) {
            let p = c.s.get(F);
            if (!p) continue;
            let O = p(a);
            (c.w < 1 && (O = Yt(O, c.w)), (e = e ? Q(e, O) : O));
          }
          return e ?? [...ut];
        },
      }
    : null;
}
function ro(E, F, O = null, { cuts: J = !1 } = {}) {
  let x = An(F);
  if (!x || !E) return E;
  let v = E.duration || 0;
  if (!(v > 0)) return E;
  let g = jt(E),
    I = E.clone(),
    N = new Map(I.tracks.map((k1, k2) => [k1.name, k2])),
    k0 = I.tracks.find((k1) => k1.name.endsWith('.quaternion'))?.constructor;
  for (let k1 of x.bones) {
    let k2 = k1 + '.quaternion',
      k3 = N.get(k2);
    if (k3 == null) {
      let k7 = O?.get?.(k1) ?? O?.[k1];
      if (!k7 || !k0) continue;
      (I.tracks.push(new k0(k2, [0, v], [...k7, ...k7])), (k3 = I.tracks.length - 1));
    }
    let k4 = I.tracks[k3],
      k5 = Dt(k4.times, [{ times: x.times }], v, g);
    J && (k5 = Wt(k5, x.times, v));
    let k6 = Ut(k4.times, k4.values, k5);
    for (let k8 = 0; k8 < k5.length; k8++) {
      let k9 = x.at(k1, Ht(k5[k8], v, g)),
        kk = k8 * 4,
        kw = Q([k6[kk], k6[kk + 1], k6[kk + 2], k6[kk + 3]], k9);
      ((k6[kk] = kw[0]), (k6[kk + 1] = kw[1]), (k6[kk + 2] = kw[2]), (k6[kk + 3] = kw[3]));
    }
    I.tracks[k3] = new k4['constructor'](k2, k5, k6);
  }
  return I;
}
function me({ poses: E, index: F, bone: a, u: p, base: O, target: J }) {
  let d = E || [],
    A = new Set(Lt(d)),
    b = [...ut],
    x = [...ut];
  d.forEach((g, I) => {
    if (I === F || !A.has(g)) return;
    let N = nt(g).get(a);
    if (!N) return;
    let M = N(p);
    (g.weight < 1 && (M = Yt(M, g.weight)), I < F ? (b = Q(b, M)) : (x = Q(x, M)));
  });
  let y = Q(Q(gn(Q(O, b)), J), gn(x)),
    v = A.has(d[F]) ? d[F].weight : 1;
  return Qt(bt(v > 0.05 && v < 1 ? Yt(y, 1 / v) : y));
}
function lo(E, F) {
  let s = {};
  for (let [a, l] of nt(E)) s[a] = l(F);
  return s;
}
function st(E, F, a) {
  let c = E[0] * F[0] + E[1] * F[1] + E[2] * F[2] + E[3] * F[3],
    p = E;
  c < 0 && ((c = -c), (p = E.map((J) => -J)));
  let O = 1 - a,
    f = a;
  if (1 - c > 0.0001) {
    let J = Math.acos(Math.min(1, c)),
      d = Math.sin(J);
    ((O = Math.sin((1 - a) * J) / d), (f = Math.sin(a * J) / d));
  }
  return p.map((A, b) => O * A + f * F[b]);
}
var dt = (r) => {
  let E = Math.hypot(...r) || 1;
  return r.map((F) => F / E);
};
function de(E, F, a, p) {
  let O = Math.max(2, Math.round(p || 0)),
    J = (y) => Math.round(y * (O - 1)),
    d = new Set();
  for (let y of E?.keys || []) F.some((v) => v in y.bones) && d.add(J(y.u));
  for (let v of F) for (let g of E?.curves?.[v] || []) d.add(J(g.u));
  let A = [...d].sort((I, N) => I - N),
    b = A.filter((I) => I < a).pop(),
    x = A.find((I) => I > a);
  return { prev: b ?? a - 1, next: x ?? a + 1, any: A.length > 0 };
}
function so(E, g, k0, k1, k2, k3, { axes: k4 = null } = {}) {
  let { prev: k5, next: k6, any: k7 } = de(E, g, k0, k1);
  if (!k7) return null;
  let k8 = Math.max(2, Math.round(k1 || 0)),
    k9 = (kD) => kD / (k8 - 1),
    kk = nt(E),
    kw = (k0 - k5) / (k6 - k5),
    kV = {};
  for (let kD of g) {
    let km = E.curves?.[kD];
    if (km?.length) {
      let kH = R(km),
        ka = kH(k9(k5)),
        kR = kH(k9(k6)),
        kl = kH(k9(k0)),
        kQ = (kp, kO, kf) => kp.map((kJ, kZ) => kJ + (kO[kZ] - kJ) * kf),
        kc = kQ(ka, kR, kw),
        kj =
          k2 === 'breakdown'
            ? kQ(ka, kR, k3)
            : k2 === 'push'
              ? kQ(kl, kc, -k3)
              : k2 === 'relax'
                ? kQ(kl, kc, k3)
                : kQ(kl, k3 < 0.5 ? ka : kR, Math.abs((k3 - 0.5) * 2)),
        kz = k4 ? kl.map((kp, kO) => ('xyz'[kO] === k4 ? kj[kO] : kp)) : kj;
      kV[kD] = yt(kz);
      continue;
    }
    let kS = kk.get(kD),
      kr = [0, 0, 0, 1],
      kE = dt(kS ? kS(k9(k5)) : kr),
      kF = dt(kS ? kS(k9(k6)) : kr),
      kC = dt(kS ? kS(k9(k0)) : kr),
      ks = st(kE, kF, kw);
    kV[kD] = dt(
      k2 === 'breakdown'
        ? st(kE, kF, k3)
        : k2 === 'push'
          ? st(ks, kC, 1 + k3)
          : k2 === 'relax'
            ? st(kC, ks, k3)
            : st(kC, k3 < 0.5 ? kE : kF, Math.abs((k3 - 0.5) * 2)),
    );
  }
  return { bones: kV, prev: k5, next: k6 };
}
function uo(E, F) {
  let a = {},
    c = (E?.keys || []).find((p) => Math.abs(p.u - F) < j);
  c && Object.assign(a, c.bones);
  for (let [p, O] of Object.entries(E?.curves || {})) {
    let f = O.find((J) => Math.abs(J.u - F) < j);
    f && (a[p] = yt(f.v));
  }
  return a;
}
function io(E, F, a, c) {
  let p = An(E),
    O = {};
  for (let f of F) {
    let J = c(f);
    O[f] = p ? Q(J, p.at(f, a)) : [...J];
  }
  return O;
}
function co({ poses: E, index: F, u: a, targets: c, baseOf: p }) {
  let O = {};
  for (let [f, J] of Object.entries(c))
    O[f] = me({ poses: E, index: F, bone: f, u: a, base: p(f), target: J });
  return O;
}
function ao(E, F = Mn) {
  let s = {};
  for (let [a, l] of Object.entries(E)) s[F(a)] = vn(l);
  return s;
}
function fo(E, F = 'l', { ends: a = '_' + F, partner: c = Mn } = {}) {
  let p = {};
  for (let [O, f] of Object.entries(E)) O.endsWith(a) && (p[c(O)] = vn(f));
  return p;
}
function be(E, F, a, p = {}) {
  let O = T(F, a),
    J = E.keys.find((y) => q(y.u, a) === O),
    d = { ...(J?.bones || {}), ...p },
    A = { ...(E.curves || {}) };
  for (let y of Object.keys(A))
    (y in p && (A[y] = Et(A[y], O, Jt(Gt(p[y]), R(A[y])(O)), a)), delete d[y]);
  let b = E.keys.filter((v) => Object.keys(d).some((g) => g in v.bones)),
    x =
      Object.keys(d).length || J
        ? [
            ...E.keys.filter((v) => v !== J),
            {
              u: O,
              i: J?.i ?? U(b, O),
              bones: d,
              ...(J?.ib ? { ib: J.ib } : {}),
              ...(J?.hb ? { hb: J.hb } : {}),
            },
          ]
        : E.keys;
  return H({ ...E, keys: x, curves: A });
}
function ho(E, F, s, a, l) {
  return Zt(E, F)
    ? H({ ...E, curves: { ...E.curves, [F]: Et(E.curves[F], T(s, a), l.map(Number), a) } })
    : be(E, s, a, { [F]: yt(l) });
}
function po(r, E) {
  let F = r.keys
      .map((a) => {
        let l = { ...a.bones };
        return (delete l[E], { ...a, bones: l });
      })
      .filter((a) => Object.keys(a.bones).length),
    s = { ...(r.curves || {}) };
  return (delete s[E], H({ ...r, keys: F, curves: s }));
}
var gt = (r, E) => Object.fromEntries(Object.entries(r.curves || {}).map(([F, s]) => [F, E(s)]));
function mo(r, E, F) {
  let a = [],
    c = [
      ...r.keys.filter((p) => {
        let O = E.find((f) => Math.abs(f.from - p.u) < j);
        return (O && a.push({ ...p, u: T(O.to, F) }), !O);
      }),
    ];
  for (let p of a) {
    let O = c.findIndex((J) => q(J.u, F) === p.u);
    if (O < 0) {
      c.push(p);
      continue;
    }
    let f = (J) => Object.fromEntries(Object.entries(J || {}).filter(([d]) => !(d in p.bones)));
    c[O] = {
      ...p,
      bones: { ...c[O].bones, ...p.bones },
      ib: { ...f(c[O].ib), ...(p.ib || {}) },
      hb: { ...f(c[O].hb), ...(p.hb || {}) },
    };
  }
  return H({ ...r, keys: c, curves: gt(r, (J) => zt(J, E, F)) });
}
var bo = (r, E) =>
    H({
      ...r,
      keys: r.keys.filter((F) => !E.some((s) => Math.abs(s - F.u) < j)),
      curves: gt(r, (F) => F.filter((s) => !E.some((a) => Math.abs(a - s.u) < j))),
    }),
  yo = (r, E, F) =>
    H({
      ...r,
      keys: r.keys.map((s) => (Math.abs(s.u - E) < j ? { ...s, i: F, ib: void 0 } : s)),
      curves: gt(r, (s) => s.map((a) => (Math.abs(a.u - E) < j ? { ...a, i: F } : a))),
    });
function go(r, E, F) {
  if (!(E?.length > 0) || !(F?.length > 0)) return r;
  let s = F.length / E.length;
  return H({
    ...r,
    keys: r.keys.map((a) => ({
      ...a,
      u: (E.offset + a.u * E.length - F.offset) / F.length,
      ...(a.hb
        ? {
            hb: Object.fromEntries(
              Object.entries(a.hb).map(([c, p]) => [c, { ...p, ...St(p, s) }]),
            ),
          }
        : {}),
    })),
    curves: gt(r, (a) => pn(a, E, F)),
  });
}
var xn = (r) =>
    String(r || '')
      .replace(/[^A-Za-z0-9 _-]/g, '')
      .trim()
      .slice(0, 24),
  ye = (r) => String(+Number(r || 0).toFixed(2));
function ge(E, F, s) {
  let a = E.hb?.[F],
    c = a ? Tt({ v: s, ...a }, { digits: 4 }) : '',
    p =
      !c && s.every((J) => J != null) && Math.abs(Math.hypot(...s) - 1) < 0.000001
        ? se(s).map(ye).join('/')
        : '@' + s.map((J) => (J == null ? '' : String(+J.toFixed(4)))).join('/'),
    O = E.ib?.[F],
    f =
      O == null
        ? ''
        : '^' + (Array.isArray(O) ? O.map((J) => (J == null ? '' : Z(J))).join('.') : Z(O));
  return F + '=' + p + (c ? '!' + c : '') + f;
}
function Mo(r) {
  return (r || [])
    .filter(Vt)
    .map((E) => {
      let F = E.keys.map(
          (l) =>
            '' +
            +l.u.toFixed(5) +
            Z(l.i) +
            ':' +
            Object.entries(l.bones)
              .map(([c, p]) => ge(l, c, p))
              .join('+'),
        ),
        s = Object.entries(E.curves || {})
          .map(([c, p]) => ';c=' + c + ':' + ht(p, { digits: 2 }).replace(/~/g, '!'))
          .join(''),
        a = xn(E.name);
      return (
        F.join('|') +
        s +
        (a ? ';n=' + a : '') +
        (E.mute ? ';m' : '') +
        (E.solo ? ';s' : '') +
        (E.weight < 1 - 0.000001 ? ';w' + Math.round(E.weight * 100) : '')
      );
    })
    .join('~');
}
function vo(E) {
  let F = [];
  for (let O of String(E || '')
    .split('~')
    .filter(Boolean)) {
    let [J, ...x] = O.split(';'),
      g = [];
    for (let k0 of J.split('|')) {
      let k1 = new RegExp('^(-?[0-9.]+)(' + $t + '):(.*)$').exec(k0.trim());
      if (!k1) continue;
      let k2 = {},
        k3 = {},
        k4 = {};
      for (let k5 of k1[3].split('+').filter(Boolean)) {
        let k6 = k5.indexOf('=');
        if (k6 < 0) continue;
        let k7 = k5.slice(0, k6),
          k8 = k5.slice(k6 + 1),
          k9 = null,
          kk = k8.indexOf('^');
        kk >= 0 && ((k9 = k8.slice(kk + 1)), (k8 = k8.slice(0, kk)));
        let kw = k8.indexOf('!');
        if (
          (kw >= 0 && ((k4[k7] = Bt(k8.slice(kw + 1), 4)), (k8 = k8.slice(0, kw))),
          k8.startsWith('@'))
        ) {
          let kV = k8
            .slice(1)
            .split('/')
            .map((kD) => (kD === '' ? null : Number(kD)));
          if (
            kV.length !== 4 ||
            kV.some((kD) => kD != null && !Number.isFinite(kD)) ||
            kV.every((kD) => kD == null)
          )
            continue;
          k2[k7] = kV;
        } else {
          let kD = k8.split('/').map(Number);
          if (!(kD.length === 3 && kD.every(Number.isFinite))) continue;
          k2[k7] = ue(kD);
        }
        k9 != null && (k3[k7] = k9.includes('.') ? k9.split('.').map((km) => X(km)) : X(k9));
      }
      g.push({ u: Number(k1[1]), i: X(k1[2]), bones: k2, ib: k3, hb: k4 });
    }
    let I = { keys: g, weight: 1, curves: {} };
    for (let km of x)
      if (km === 'm') I.mute = !0;
      else {
        if (km === 's') I.solo = !0;
        else {
          if (/^w\d+$/.test(km)) I.weight = Number(km.slice(1)) / 100;
          else {
            if (km.startsWith('n=')) I.name = xn(km.slice(2));
            else {
              if (km.startsWith('c=')) {
                let kS = km.indexOf(':'),
                  kr = kS > 2 ? pt(km.slice(kS + 1).replace(/!/g, '~')) : null;
                kr && (I.curves[km.slice(2, kS)] = kr);
              }
            }
          }
        }
      }
    let N = H(I, F.length);
    Vt(N) && F.push(N);
  }
  return F;
}
export {
  V as a,
  Mt as b,
  z as c,
  On as d,
  kt as e,
  Me as f,
  ve as g,
  Ae as h,
  nn as i,
  en as j,
  K as k,
  rt as l,
  G as m,
  ct as n,
  un as o,
  Fn as p,
  $n as q,
  Tn as r,
  Oe as s,
  k as t,
  at as u,
  R as v,
  Ne as w,
  It as x,
  T as y,
  Et as z,
  L as A,
  Se as B,
  pn as C,
  _e as D,
  ht as E,
  pt as F,
  zt as G,
  Qn as H,
  Ee as I,
  $e as J,
  Gn as K,
  Te as L,
  Be as M,
  Ce as N,
  Pe as O,
  qe as P,
  ze as Q,
  Ke as R,
  C as S,
  tt as T,
  mt as U,
  We as V,
  Jn as W,
  Rt as X,
  Vn as Y,
  Zn as Z,
  Xn as _,
  De as $,
  Ue as aa,
  Ye as ba,
  Le as ca,
  Qe as da,
  yn as ea,
  Xe as fa,
  Q as ga,
  gn as ha,
  Yt as ia,
  ke as ja,
  Gt as ka,
  yt as la,
  Mn as ma,
  vn as na,
  H as oa,
  Vt as pa,
  fe as qa,
  Zt as ra,
  he as sa,
  Lt as ta,
  nt as ua,
  to as va,
  no as wa,
  pe as xa,
  eo as ya,
  oo as za,
  ro as Aa,
  me as Ba,
  lo as Ca,
  de as Da,
  so as Ea,
  uo as Fa,
  io as Ga,
  co as Ha,
  ao as Ia,
  fo as Ja,
  be as Ka,
  ho as La,
  po as Ma,
  mo as Na,
  bo as Oa,
  yo as Pa,
  go as Qa,
  Mo as Ra,
  vo as Sa,
};
