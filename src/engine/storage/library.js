import { c } from './database.js';
var y = 'actionforge',
  m = 2,
  p = 'presets',
  l = 'clips',
  d = 'props',
  g = { [p]: 'projects', [l]: 'animations', [d]: 'props' },
  x = { [p]: 'name', [l]: 'id', [d]: 'id' },
  u = null;
function S(r) {
  (r.objectStoreNames.contains(p) || r.createObjectStore(p, { keyPath: 'name' }),
    r.objectStoreNames.contains(l) ||
      r.createObjectStore(l, { keyPath: 'id' }).createIndex('at', 'at'),
    r.objectStoreNames.contains(d) ||
      r.createObjectStore(d, { keyPath: 'id' }).createIndex('at', 'at'));
}
function w() {
  return (
    u ||
    ((u = new Promise((E, F) => {
      if (typeof indexedDB > 'u') {
        F(new Error('IndexedDB is unavailable'));
        return;
      }
      let C = indexedDB.open(y, m);
      ((C.onupgradeneeded = () => S(C.result)),
        (C.onsuccess = () => E(C.result)),
        (C.onerror = () => F(C.error ?? new Error('Could not open the database'))),
        (C.onblocked = () => F(new Error('Another tab is using an older version'))));
    })),
    u)
  );
}
var f = (E, F, C) =>
  w().then(
    (H) =>
      new Promise((R, Q) => {
        let j = H.transaction(E, F),
          z = C(j.objectStore(E));
        ((j.onabort = () => Q(j.error)),
          (j.onerror = () => Q(j.error)),
          z
            ? ((z.onsuccess = () => R(z.result)), (z.onerror = () => Q(z.error)))
            : (j.oncomplete = () => R()));
      }),
  );
async function h(r) {
  return ((await f(r, 'readonly', (E) => E.getAll())) ?? []).sort(
    (E, F) => (F.at ?? 0) - (E.at ?? 0),
  );
}
var P = (r, E) => f(r, 'readwrite', (F) => F.put(E));
async function A(E, F) {
  let C = await P(E, F);
  return (c(g[E], F?.[x[E]]), C);
}
async function I(E, F) {
  let C = await f(E, 'readwrite', (H) => H.delete(F));
  return (c(g[E], F, !0), C);
}
var N = (r, E) => f(r, 'readonly', (F) => F.get(E));
async function b(E, F) {
  if (!F?.length) return 0;
  let C = await w();
  return new Promise((H, R) => {
    let Q = C.transaction(E, 'readwrite'),
      j = Q.objectStore(E);
    for (let z of F) j.put(z);
    ((Q.oncomplete = () => {
      for (let J of F) c(g[E], J?.[x[E]]);
      H(F.length);
    }),
      (Q.onabort = () => R(Q.error)),
      (Q.onerror = () => R(Q.error)));
  });
}
async function O() {
  if (!navigator.storage?.persist) return { supported: !1, persisted: !1 };
  try {
    return (await navigator.storage.persisted?.())
      ? { supported: !0, persisted: !0 }
      : { supported: !0, persisted: await navigator.storage.persist() };
  } catch {
    return { supported: !1, persisted: !1 };
  }
}
async function k() {
  if (!navigator.storage?.estimate) return null;
  try {
    let { usage: r = 0, quota: E = 0 } = await navigator.storage.estimate();
    return { used: r, quota: E };
  } catch {
    return null;
  }
}
async function B(E, F, C = () => !0) {
  if ((await h(E)).length) return 0;
  for (let s of F) {
    let H;
    try {
      H = JSON.parse(localStorage.getItem(s) || 'null');
    } catch {
      continue;
    }
    if (!Array.isArray(H) || !H.length) continue;
    let a = H.filter(C);
    if (a.length) return (await b(E, a), a.length);
  }
  return 0;
}
export {
  p as a,
  l as b,
  d as c,
  S as d,
  h as e,
  P as f,
  A as g,
  I as h,
  N as i,
  b as j,
  O as k,
  k as l,
  B as m,
};
