import { c as D } from './database.js';
var P = 'cgstuff-own-poses',
  g = 'poses',
  m = 'cgstuff-own-poses',
  b = null,
  C = () =>
    (b ??= new Promise((S, reject) => {
      try {
        let r = indexedDB.open(P, 1);
        ((r.onupgradeneeded = () => r.result.createObjectStore(g, { keyPath: 'id' })),
          (r.onsuccess = () => {
            r.result.onversionchange = () => { r.result.close(); b = null; };
            S(r.result);
          }),
          (r.onerror = r.onblocked = () => reject(r.error ?? new Error('Pose storage is unavailable'))));
      } catch (error) {
        reject(error);
      }
    }).catch((error) => { b = null; throw error; })),
  l = (S, r) =>
    C().then((E) =>
      E
        ? new Promise((F, reject) => {
            let t = E.transaction(g, S),
              H = r(t.objectStore(g));
            ((t.oncomplete = () => F(H?.result ?? null)),
              (t.onerror = t.onabort = () => reject(t.error ?? new Error('Pose could not be saved. Check available browser storage.'))));
          })
        : null,
    ).catch((error) => {
      if (S === 'readonly') return null;
      throw error;
    }),
  B = async () => (await l('readonly', (S) => S.getAll())) ?? [],
  L = (S) => l('readonly', (r) => r.get(S));
async function R(S) {
  await l('readwrite', (r) => r.put(S));
  try {
    let r = new BroadcastChannel(m);
    (r.postMessage('changed'), r.close());
  } catch {}
}
function U() {
  let S = [],
    r = new Set(),
    E = new Map(),
    F = () => {
      for (let z of r) z(S);
    },
    t = typeof BroadcastChannel == 'function' ? new BroadcastChannel(m) : null;
  async function H() {
    let z = await l('readonly', (p) => p.getAll());
    (z && (S = z.sort((p, O) => (p.made ?? 0) - (O.made ?? 0))), F());
  }
  let Q = H();
  t &&
    (t.onmessage = () => {
      H();
    });
  let c = () => {
    (t?.postMessage('changed'), F());
  };
  return {
    ready: Q,
    all: () => [...S],
    get: (z) => S.find((p) => p.id === z) ?? null,
    async add({
      name: z,
      kind: O,
      pose: J,
      picture: Z = null,
      camera: K = null,
      stand: T = null,
      from: A = null,
    }) {
      let X = {
        id: 'own.' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
        name: String(z).trim().slice(0, 60) || 'Pose',
        kind: O,
        pose: J,
        picture: Z,
        made: Date.now(),
        ...(K ? { camera: K, ...(T ? { stand: T } : {}) } : {}),
        ...(A ? { from: A } : {}),
      };
      await l('readwrite', (W) => W.put(X));
      return ((S = [...S, X]), D('poses', X.id), c(), X.id);
    },
    async rename(z, p) {
      let O = S.find((Z) => Z.id === z),
        J = String(p ?? '')
          .trim()
          .slice(0, 60);
      return !O || !J || J === O.name
        ? !1
        : (await l('readwrite', (Z) => Z.put({ ...O, name: J })), (O.name = J), D('poses', O.id), c(), !0);
    },
    async remove(z) {
      if (!S.some((O) => O.id === z)) return !1;
      await l('readwrite', (O) => O.delete(z));
      S = S.filter((O) => O.id !== z);
      let p = E.get(z);
      return (
        p && (URL.revokeObjectURL(p), E.delete(z)),
        D('poses', z, !0),
        c(),
        !0
      );
    },
    onChange(z) {
      return (r.add(z), () => r.delete(z));
    },
    pictureUrl(z) {
      let p = S.find((O) => O.id === z);
      return p?.picture ? (E.has(z) || E.set(z, URL.createObjectURL(p.picture)), E.get(z)) : null;
    },
  };
}
var j = (S) => typeof S == 'string' && S.startsWith('own.');
export { B as a, L as b, R as c, U as d, j as e };
