import { ga as V, ha as D, ia as S, na as r } from './math.js';
var p = Object.freeze(['body', 'hand']),
  d = (E) => (p.includes(E?.pose) ? E.pose : null),
  O = (E) => d(E) !== null,
  x = Object.freeze(
    ['thumb', 'index', 'middle', 'ring', 'pinky'].flatMap((E) =>
      [1, 2, 3].map((F) => E + '_0' + F),
    ),
  ),
  m = 'r';
function b(E, { side: F = m } = {}) {
  let C = {},
    H = '_' + F;
  for (let R of E?.tracks ?? []) {
    let Q = R.name.lastIndexOf('.');
    if (Q < 0 || R.name.slice(Q + 1) !== 'quaternion' || R.values.length < 4) continue;
    let j = R.name.slice(0, Q),
      z = j.endsWith(H) ? j.slice(0, -H.length) : null;
    z && x.includes(z) && (C[z] = Array.from(R.values.slice(0, 4)));
  }
  return C;
}
function v(E, F, { posedOn: C = m } = {}) {
  let H = {};
  for (let [R, Q] of Object.entries(E ?? {})) H[R + '_' + F] = F === C ? [...Q] : r(Q);
  return H;
}
function g(E) {
  let F = {},
    C = {};
  for (let H of E?.tracks ?? []) {
    let R = H.name.lastIndexOf('.');
    if (R < 0) continue;
    let Q = H.name.slice(0, R),
      j = H.name.slice(R + 1);
    j === 'quaternion' && H.values.length >= 4
      ? (F[Q] = Array.from(H.values.slice(0, 4)))
      : j === 'position' && H.values.length >= 3 && (C[Q] = Array.from(H.values.slice(0, 3)));
  }
  return { turns: F, places: C };
}
function P(E, F, C) {
  let H = {};
  for (let [R, Q] of Object.entries(F ?? {})) {
    let j = E?.[R];
    j && (H[R] = C >= 1 ? [...Q] : C <= 0 ? [...j] : V(j, S(V(D(j), Q), C)));
  }
  return H;
}
export { d as a, O as b, x as c, m as d, b as e, v as f, g, P as h };
