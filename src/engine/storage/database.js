var c = 'cgstuff.folder.set',
  i = 'cgstuff.folder.dirty',
  a = new Set(),
  n = () => {
    try {
      return globalThis.localStorage ?? null;
    } catch {
      return null;
    }
  },
  s = () => {
    try {
      let V = JSON.parse(n()?.getItem(i) ?? '{}');
      return V && typeof V == 'object' && !Array.isArray(V) ? V : {};
    } catch {
      return {};
    }
  },
  d = (V) => {
    try {
      n()?.setItem(i, JSON.stringify(V));
    } catch {}
  },
  l = (V, D) => V + '\n' + D,
  u = {
    get() {
      try {
        return n()?.getItem(c) === '1';
      } catch {
        return !1;
      }
    },
    put(V) {
      try {
        V ? n()?.setItem(c, '1') : (n()?.removeItem(c), n()?.removeItem(i));
      } catch {}
    },
    name: c,
  },
  g = {
    all: () =>
      Object.entries(s()).map(([V, D]) => {
        let S = V.indexOf('\n');
        return { shelf: V.slice(0, S), key: V.slice(S + 1), gone: !!D };
      }),
    add(V, D, S = !1) {
      let E = s();
      ((E[l(V, D)] = S ? 1 : 0), d(E));
    },
    clear(V, D) {
      let S = s();
      l(V, D) in S && (delete S[l(V, D)], d(S));
    },
  };
function m(V, D, S = !1) {
  if (D != null) {
    u.get() && g.add(V, String(D), S);
    for (let E of a)
      try {
        E(V, String(D), !!S);
      } catch (F) {
        console.error(F);
      }
  }
}
var p = (V) => (a.add(V), () => a.delete(V));
export { u as a, g as b, m as c, p as d };
