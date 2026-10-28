import { c as D } from './database.js';
var f = 'actionforge-characters',
  h = 'characters',
  c = null;
function y() {
  return (
    c ||
    ((c = new Promise((E, F) => {
      if (typeof indexedDB > 'u') {
        F(new Error('This browser has no IndexedDB'));
        return;
      }
      let C = indexedDB.open(f, 1);
      ((C.onupgradeneeded = () => {
        let s = C.result;
        s.objectStoreNames.contains(h) || s.createObjectStore(h, { keyPath: 'id' });
      }),
        (C.onsuccess = () => E(C.result)),
        (C.onerror = () => F(C.error ?? new Error('Could not open the characters database'))),
        (C.onblocked = () =>
          F(
            new Error(
              'Another tab is holding the characters database \u2014 close it and try again',
            ),
          )));
    })),
    c.catch(() => {
      c = null;
    }),
    c)
  );
}
async function i(E, F) {
  let C = await y();
  return new Promise((H, R) => {
    let Q = C.transaction(h, E),
      j = Q.objectStore(h),
      z;
    (Promise.resolve(F(j)).then((p) => {
      z = p;
    }),
      (Q.oncomplete = () => H(z)),
      (Q.onerror = () => R(Q.error ?? new Error('Characters database error'))),
      (Q.onabort = () =>
        R(Q.error ?? new Error('Characters database write was refused (storage full?)'))));
  });
}
var l = (r) =>
    new Promise((E, F) => {
      ((r.onsuccess = () => E(r.result)), (r.onerror = () => F(r.error)));
    }),
  w = {
    async list() {
      return ((await i('readonly', (E) => l(E.getAll()))) || [])
        .map(({ blob: E, source: F, ...C }) => C)
        .sort((E, F) => (F.created || 0) - (E.created || 0));
    },
    get: (r) => i('readonly', (E) => l(E.get(r))),
    async put(E) {
      let F = await i('readwrite', (C) => l(C.put(E)));
      return (D('characters', E?.id), F);
    },
    async remove(E) {
      let F = await i('readwrite', (C) => l(C.delete(E)));
      return (D('characters', E, !0), F);
    },
    everything: () => i('readonly', (r) => l(r.getAll())).then((r) => r || []),
    putQuiet: (r) => i('readwrite', (E) => l(E.put(r))),
    async rename(E, F) {
      let C = await this.get(E);
      C &&
        ((C.name =
          String(F || '')
            .trim()
            .slice(0, 60) || C.name),
        await this.put(C));
    },
  };
async function S(E) {
  let F = await crypto.subtle.digest('SHA-256', E);
  return (
    'u.' +
    [...new Uint8Array(F)]
      .slice(0, 6)
      .map((C) => C.toString(16).padStart(2, '0'))
      .join('')
  );
}
var m = 'cgstuff.library.rigMaps',
  O = {
    all() {
      try {
        return JSON.parse(localStorage.getItem(m) || '{}');
      } catch {
        return {};
      }
    },
    find(E) {
      let F = this.all(),
        C = E.keys,
        H = null,
        R = 0;
      for (let [Q, j] of Object.entries(F)) {
        if (!j?.map || !Array.isArray(j.bones)) continue;
        let z = j.bones.filter((J) => C.has(J)).length,
          p = Q === E.signature ? 2 : z / Math.max(1, Math.min(j.bones.length, C.size));
        p >= 0.95 && Object.values(j.map).every((J) => C.has(J)) && p > R && ((H = j), (R = p));
      }
      return H ? Object.fromEntries(Object.entries(H.map).map(([J, Z]) => [J, C.get(Z)])) : null;
    },
    put(E, F, C) {
      if (!E?.signature) return;
      let H = new Map([...E.keys].map(([R, Q]) => [Q, R])),
        a = this.all();
      a[E.signature] = {
        name: F,
        bones: [...E.keys.keys()],
        map: Object.fromEntries(
          Object.entries(C)
            .map(([R, Q]) => [R, H.get(Q)])
            .filter(([, R]) => R),
        ),
        updated: Date.now(),
      };
      try {
        localStorage.setItem(m, JSON.stringify(a));
      } catch {}
    },
  };
export { w as a, S as b, O as c };
