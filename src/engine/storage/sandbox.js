import { c as D } from './database.js';
var u = (() => {
    try {
      let S = new URLSearchParams(globalThis.location?.search ?? '').get('sandbox');
      return S && /^[a-z0-9-]{1,24}$/.test(S) ? S : null;
    } catch {
      return null;
    }
  })(),
  p = u ? 'actionforge-story-lab-' + u : 'actionforge-story-lab',
  a = 'kept',
  f = (S) => S === 'board' || S === 'assets:mine' || /^asset:mine-/.test(String(S)),
  y = 1500,
  c = null;
function h() {
  return (
    (c ??= new Promise((S, E) => {
      let F;
      try {
        F = indexedDB.open(p, 1);
      } catch (s) {
        E(s);
        return;
      }
      let C = setTimeout(() => E(new Error('the store did not open')), y);
      ((F.onupgradeneeded = () => {
        F.result.objectStoreNames.contains(a) || F.result.createObjectStore(a);
      }),
        (F.onsuccess = () => {
          clearTimeout(C);
          let H = F.result;
          ((H.onversionchange = () => {
            (H.close(), (c = null));
          }),
            (H.onclose = () => {
              c = null;
            }),
            S(H));
        }),
        (F.onerror = () => {
          (clearTimeout(C), E(F.error));
        }));
    }).catch((S) => {
      throw ((c = null), S);
    })),
    c
  );
}
var i = async (S, E) => {
  let F = await h();
  return new Promise((C, H) => {
    let R = F.transaction(a, S),
      Q = E(R.objectStore(a));
    ((R.oncomplete = () => C(Q.result)), (R.onerror = R.onabort = () => H(R.error ?? Q.error)));
  });
};
async function w(S) {
  try {
    return await i('readonly', (E) => E.get(S));
  } catch {
    return;
  }
}
async function b(S, E) {
  try {
    return (await i('readwrite', (F) => F.put(E, S)), !0);
  } catch {
    return !1;
  }
}
async function m(S, E) {
  return (await b(S, E)) ? (!u && f(S) && D('stories', S, E == null), !0) : !1;
}
async function x() {
  try {
    let S = (await i('readonly', (F) => F.getAllKeys())).filter(f),
      E = [];
    for (let F of S) {
      let C = await w(F);
      C != null && E.push([F, C]);
    }
    return E;
  } catch {
    return [];
  }
}
export { u as a, f as b, w as c, b as d, m as e, x as f };
