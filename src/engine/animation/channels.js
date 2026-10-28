var h = { x: !0, y: !1, z: !0, yaw: !1 };
function z(m, { rootName: S = 'root', lock: F = h } = {}) {
  let H = { ...h, ...F };
  if (!H.x && !H.y && !H.z && !H.yaw) return m;
  let a = m.clone();
  return (
    (a.tracks = a.tracks.flatMap((R) => {
      let [l, Q] = $(R.name);
      if (l !== S) return [R];
      if (Q === 'position') {
        let c = R.clone(),
          p = c.values;
        for (let J = 0; J < p.length; J += 3)
          (H.x && (p[J] = 0), H.y && (p[J + 1] = 0), H.z && (p[J + 2] = 0));
        return [c];
      }
      return Q === 'quaternion' && H.yaw ? [] : [R];
    })),
    a
  );
}
function C(m, { partner: S = L } = {}) {
  let F = m.clone();
  return (
    (F.name = m.name ? m.name + '_mirrored' : m.name),
    (F.tracks = F.tracks.map((H) => {
      let e = H.clone(),
        [R, l] = $(e.name);
      e.name = S(R) + '.' + l;
      let Q = e.values;
      if (l === 'position') {
        for (let c = 0; c < Q.length; c += 3) Q[c] = -Q[c];
      } else {
        if (l === 'quaternion') {
          for (let p = 0; p < Q.length; p += 4) ((Q[p + 1] = -Q[p + 1]), (Q[p + 2] = -Q[p + 2]));
        }
      }
      return e;
    })),
    F
  );
}
function j(S, { rootName: F = 'root', fromOrigin: H = !1 } = {}) {
  let R = S.clone();
  R.name = S.name ? S.name + '_reversed' : S.name;
  let Q = S.duration;
  if (
    ((R.tracks = R.tracks.map((T) => {
      let A = T.clone(),
        X = A.times.length;
      if (!X) return A;
      let b = A.values.length / X,
        W = T.times,
        q = T.values;
      for (let P = 0; P < X; P++) {
        let Y = X - 1 - P;
        A.times[P] = Math.max(0, Q - W[Y]);
        for (let B = 0; B < b; B++) A.values[P * b + B] = q[Y * b + B];
      }
      return A;
    })),
    !H)
  )
    return R;
  let J = (T) => R.tracks.find((A) => A.name === F + '.' + T),
    Z = J('position'),
    U = J('quaternion'),
    K = [0, 0, 0, 1];
  if (U && U.times.length > 1) {
    let T = U.values,
      A = T.length - 4;
    K = k(v([T[A], T[A + 1], T[A + 2], T[A + 3]], [-T[0], -T[1], -T[2], T[3]]));
    for (let X = 0; X < T.length; X += 4) {
      let b = v(K, [T[X], T[X + 1], T[X + 2], T[X + 3]]);
      ((T[X] = b[0]), (T[X + 1] = b[1]), (T[X + 2] = b[2]), (T[X + 3] = b[3]));
    }
  }
  if (Z && Z.times.length > 1) {
    let x = Z.values,
      y = x.length - 3,
      W = [x[0], x[2]],
      q = [x[y], x[y + 2]];
    for (let P = 0; P < x.length; P += 3) {
      let Y = w(K, [x[P] - W[0], 0, x[P + 2] - W[1]]);
      ((x[P] = Y[0] + q[0]), (x[P + 2] = Y[2] + q[1]));
    }
  }
  return R;
}
function v(m, S) {
  return [
    m[3] * S[0] + m[0] * S[3] + m[1] * S[2] - m[2] * S[1],
    m[3] * S[1] - m[0] * S[2] + m[1] * S[3] + m[2] * S[0],
    m[3] * S[2] + m[0] * S[1] - m[1] * S[0] + m[2] * S[3],
    m[3] * S[3] - m[0] * S[0] - m[1] * S[1] - m[2] * S[2],
  ];
}
function w(m, S) {
  let F = v(v(m, [S[0], S[1], S[2], 0]), [-m[0], -m[1], -m[2], m[3]]);
  return [F[0], F[1], F[2]];
}
function k(m) {
  let S = Math.hypot(m[1], m[3]);
  return S > 1e-9 ? [0, m[1] / S, 0, m[3] / S] : [0, 0, 0, 1];
}
function L(m) {
  return m.endsWith('_l') ? m.slice(0, -2) + '_r' : m.endsWith('_r') ? m.slice(0, -2) + '_l' : m;
}
function M(m = h) {
  let S = { ...h, ...m },
    F = ['x', 'y', 'z'].filter((H) => S[H]).map((H) => H.toUpperCase());
  return (S.yaw && F.push('YAW'), F.length ? F.join(' ') : 'nothing');
}
var _ = ['x', 'y', 'z', 'yaw'];
function O(m = h) {
  let S = { ...h, ...m };
  return _.filter((F) => S[F]).join('.');
}
function E(m) {
  let S = new Set(
    String(m || '')
      .split('.')
      .filter(Boolean),
  );
  return Object.fromEntries(_.map((F) => [F, S.has(F)]));
}
function $(m) {
  let S = m.lastIndexOf('.');
  return S < 0 ? [m, ''] : [m.slice(0, S), m.slice(S + 1)];
}
export { h as a, z as b, C as c, j as d, M as e, O as f, E as g };
