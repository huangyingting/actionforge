import { m as V, n as D, o as m } from './pipeline.js';
import { w as S } from '../animation/engine.js';
import { b as r } from '../animation/poses.js';
var ne = Object.freeze({ name: 'Quaternius', url: 'https://quaternius.com/' });
function Y(E) {
  if (!E) return null;
  if (E.community) return E.by ? { name: String(E.by) } : null;
  let F = typeof E.source?.author == 'string' ? E.source.author.trim() : '';
  return F ? { name: F } : E.source?.origin === 'quaternius' || E.animal ? ne : null;
}
function le(E) {
  let F = new Map();
  for (let C of E ?? []) {
    let t = Y(C);
    t && !F.has(t.name) && F.set(t.name, t);
  }
  return [...F.values()];
}
function me(E, { ownRig: F = !1 } = {}) {
  let C = [];
  F || C.push({ what: 'rig', makers: [ne] });
  let t = le(E);
  return (t.length && C.push({ what: 'animation', makers: t }), C);
}
function we({
  root: t,
  assetRoot: H,
  onSelect: e,
  onToggleSelect: j,
  onDragOut: J = null,
  onClearFilters: d = null,
  groupOrder: K = null,
}) {
  let n = !1;
  t.addEventListener('dragstart', (kz) => kz.preventDefault());
  let M = {},
    k0 = null,
    k1 = '',
    k2 = new Set(),
    k3 = new Set(),
    k4 = !1,
    k5 = (kz) => kz.toFixed(2) + 's';
  function k6(kz) {
    let kp = [k5(kz.duration || 0)];
    return (
      kz.frames && kp.push(kz.frames + 'f'),
      kz.fps && kp.push(kz.fps + 'fps'),
      kz.loops && kp.push('loop'),
      kp.push(k7(kz)),
      kp.join(' \u00B7 ')
    );
  }
  function k7(kz) {
    if (!kz.rootMotion) return 'in place';
    let kp = kz.rootDistance ?? 0,
      kO = kz.rootPathLength ?? 0;
    return kp < 0.05 && kO > 0.05
      ? 'returns (' + kO.toFixed(2) + 'm travelled)'
      : 'travels ' + kp.toFixed(2) + 'm';
  }
  function k8(kz, kp) {
    if (k3.size) {
      let kJ = new Set(kp.tags || []);
      for (let kZ of k3) if (!kJ.has(kZ)) return !1;
    }
    if (!k1) return !0;
    let kO = [kz, kp.label || '', kp.category || '', ...(kp.tags || [])].map((kU) =>
      kU.toLowerCase(),
    );
    if (kO.join(' ').includes(k1)) return !0;
    let kf = k9(k1);
    return !!kf && kO.some((kU) => k9(kU).includes(kf));
  }
  function k9(kz) {
    return kz.replace(/[\s_-]+/g, '');
  }
  function kk() {
    let kz = new Map();
    for (let [kp, kO] of Object.entries(M))
      if (!(kO.deprecated || kO.unlisted || r(kO) || kO.status?.exported === !1)) {
        for (let kf of kO.tags || []) kz.set(kf, (kz.get(kf) || 0) + 1);
      }
    return [...kz.entries()].sort((kJ, kZ) => kZ[1] - kJ[1] || kJ[0].localeCompare(kZ[0]));
  }
  let kw = () =>
      Object.keys(M)
        .filter((kz) => !M[kz].deprecated && !M[kz].unlisted && !r(M[kz]))
        .filter((kz) => M[kz].status?.exported !== !1)
        .filter((kz) => k8(kz, M[kz]))
        .sort((kz, kp) => (M[kz].label || kz).localeCompare(M[kp].label || kp)),
    kV = new IntersectionObserver(
      (kz) => {
        for (let kp of kz) {
          let kO = kp.target;
          kp.isIntersecting
            ? (kO.hasAttribute('src') || (kO.src = kO.dataset.src), kO.play().catch(() => {}))
            : kO.pause();
        }
      },
      { rootMargin: '150px' },
    );
  function kD(kz, kp) {
    if (kp.preview) {
      let kO = document.createElement('video');
      return (
        (kO.className = 'lib-tile__media'),
        (kO.dataset.src = /^(https?:|\/)/.test(kp.preview) ? kp.preview : H + '/' + kp.preview),
        (kO.muted = !0),
        (kO.loop = !0),
        (kO.playsInline = !0),
        (kO.autoplay = !0),
        (kO.preload = 'auto'),
        kO.setAttribute('disablepictureinpicture', ''),
        kV.observe(kO),
        kO.addEventListener(
          'error',
          () => {
            kO.replaceWith(kp.icon ? km(kz, kp) : kS(kz));
          },
          { once: !0 },
        ),
        kO
      );
    }
    return kp.icon ? km(kz, kp) : kS(kz);
  }
  function km(kz, kp) {
    let kO = document.createElement('img');
    return (
      (kO.className = 'lib-tile__media'),
      (kO.loading = 'lazy'),
      (kO.alt = kp.label || kz),
      (kO.src = /^(data:|https?:|\/)/.test(kp.icon) ? kp.icon : H + '/' + kp.icon),
      (kO.onerror = () => kO.replaceWith(kS(kz))),
      kO
    );
  }
  function kS(kz) {
    let kp = document.createElement('div');
    kp.className = 'lib-tile__media lib-tile__media--placeholder';
    let kO = 0;
    for (let kf = 0; kf < kz.length; kf++) kO = (kO * 31 + kz.charCodeAt(kf)) % 360;
    return (
      kp.style.setProperty('--tile-hue', String(kO)),
      (kp.textContent = kz
        .split('_')
        .map((kJ) => kJ[0] || '')
        .join('')
        .slice(0, 3)
        .toUpperCase()),
      kp
    );
  }
  function kr(kz, kp) {
    let kO = document.createElement('button');
    if (
      ((kO.className = 'lib-tile'),
      (kO.type = 'button'),
      (kO.dataset.id = kz),
      kO.setAttribute('aria-pressed', String(kz === k0)),
      kz === k0 && kO.classList.add('is-active'),
      kO.appendChild(kD(kz, kp)),
      kp.rootMotion)
    ) {
      let ku = document.createElement('span');
      ((ku.className = 'lib-tile__rm'),
        (ku.textContent = '\u2192'),
        (ku.title = k7(kp)),
        kO.appendChild(ku));
    }
    let kf = document.createElement('span');
    ((kf.className = 'lib-tile__pick'),
      kf.setAttribute('role', 'checkbox'),
      kf.setAttribute('aria-checked', String(k2.has(kz))),
      kf.setAttribute('aria-label', 'Select ' + (kp.label || kz) + ' for bundle'),
      (kf.tabIndex = 0),
      kf.classList.toggle('is-checked', k2.has(kz)));
    let kJ = (kd) => {
      (kd.stopPropagation(),
        kd.preventDefault(),
        k2.has(kz) ? k2.delete(kz) : k2.add(kz),
        kf.classList.toggle('is-checked', k2.has(kz)),
        kf.setAttribute('aria-checked', String(k2.has(kz))),
        kO.classList.toggle('is-picked', k2.has(kz)),
        j?.([...k2]));
    };
    (kf.addEventListener('click', kJ),
      kf.addEventListener('keydown', (kd) => {
        (kd.key === ' ' || kd.key === 'Enter') && kJ(kd);
      }),
      kO.appendChild(kf),
      kO.classList.toggle('is-picked', k2.has(kz)));
    let kZ = document.createElement('div');
    kZ.className = 'lib-tile__body';
    let kU = document.createElement('span');
    return (
      (kU.className = 'lib-tile__name'),
      (kU.textContent = kp.label || kz),
      kZ.appendChild(kU),
      (kO.title =
        (kp.label || kz) +
        '\n' +
        k6(kp) +
        (kp.tags?.length ? '\n' + kp.tags.join(', ') : '') +
        (kp.by
          ? '\nMade by ' + kp.by + ' \u00B7 shared with the ActionForge community \u00B7 CC0'
          : '') +
        (!kp.by && Y(kp) ? '\nMade by ' + Y(kp).name : '')),
      kO.appendChild(kZ),
      kO.addEventListener('click', () => {
        if (n) {
          n = !1;
          return;
        }
        e(kz, kp);
      }),
      J &&
        kO.addEventListener('pointerdown', (kd) => {
          if (kd.button !== 0 || kd.pointerType === 'touch' || kd.target.closest('.lib-tile__pick'))
            return;
          let kK = kd.clientX,
            kT = kd.clientY,
            kA = (ko) => {
              Math.hypot(ko.clientX - kK, ko.clientY - kT) < 6 ||
                (kn(),
                (n = !0),
                window.addEventListener(
                  'pointerup',
                  () =>
                    setTimeout(() => {
                      n = !1;
                    }, 0),
                  { once: !0 },
                ),
                J(kz, kp, ko));
            },
            kn = () => {
              (window.removeEventListener('pointermove', kA),
                window.removeEventListener('pointerup', kn));
            };
          (window.addEventListener('pointermove', kA), window.addEventListener('pointerup', kn));
        }),
      kO
    );
  }
  let kE = new Map(),
    kF = new Map(),
    kC = null;
  function kt(kz, kp) {
    let kO = kE.get(kz);
    return (kO || ((kO = kr(kz, kp)), kE.set(kz, kO), t.appendChild(kO)), kO);
  }
  function ks(kz) {
    let kp = kF.get(kz);
    return (
      kp ||
        ((kp = document.createElement('h3')),
        (kp.className = 'lib-group'),
        kF.set(kz, kp),
        t.appendChild(kp)),
      kp
    );
  }
  function kH() {
    return (
      kC || ((kC = document.createElement('p')), (kC.className = 'lib-empty'), t.appendChild(kC)),
      kC
    );
  }
  function ka(kz) {
    kz && kz.clips && (M = kz.clips);
    let kp = kw();
    for (let kJ of kE.values()) kJ.hidden = !0;
    for (let kZ of kF.values()) kZ.hidden = !0;
    if (!kp.length) {
      let kU = kH();
      kU.hidden = !1;
      let ku = [...k3];
      if (
        ((kU.textContent =
          k1 && ku.length
            ? 'No clips match "' + k1 + '" with ' + ku.join(' + ') + '.'
            : k1
              ? 'No clips match "' + k1 + '".'
              : ku.length
                ? 'No clip is tagged ' + ku.join(' + ') + '.'
                : 'No animations in the library yet.'),
        (k1 || ku.length) && d)
      ) {
        let kd = document.createElement('button');
        ((kd.type = 'button'),
          (kd.className = 'lib-btn lib-btn--sm lib-empty__clear'),
          (kd.textContent = 'Clear filters'),
          kd.addEventListener('click', d),
          kU.appendChild(document.createElement('br')),
          kU.appendChild(kd));
      }
      return 0;
    }
    kC && (kC.hidden = !0);
    let kO = 0,
      kf = (kK) => {
        ((kK.hidden = !1), (kK.style.order = String(kO++)));
      };
    if (k4) {
      let kK = new Map();
      for (let kA of kp) {
        let kn = M[kA].category || 'Uncategorised';
        (kK.has(kn) || kK.set(kn, []), kK.get(kn).push(kA));
      }
      let kT = [...kK.keys()].sort(
        K ??
          ((ko, kX) =>
            ko === 'Uncategorised' ? 1 : kX === 'Uncategorised' ? -1 : ko.localeCompare(kX)),
      );
      kT.forEach((ko, kX) => {
        if (kT.length > 1 && kX > 0) {
          let kL = ks(ko);
          ((kL.textContent = ko + ' \u00B7 ' + kK.get(ko).length), kf(kL));
        }
        for (let kb of kK.get(ko)) kf(kt(kb, M[kb]));
      });
    } else {
      for (let ko of kp) kf(kt(ko, M[ko]));
    }
    return kp.length;
  }
  function ke(kz) {
    k0 = kz;
    for (let kp of t.querySelectorAll('.lib-tile')) {
      let kO = kp.dataset.id === kz;
      (kp.classList.toggle('is-active', kO), kp.setAttribute('aria-pressed', String(kO)));
    }
  }
  function kR(kz) {
    return ((k1 = (kz || '').trim().toLowerCase()), ka({ clips: M }));
  }
  function kl(kz) {
    if ((k2.clear(), kz)) {
      for (let kp of kw()) k2.add(kp);
    }
    for (let [kO, kf] of kE) {
      let kJ = k2.has(kO);
      kf.classList.toggle('is-picked', kJ);
      let kZ = kf.querySelector('.lib-tile__pick');
      kZ && (kZ.classList.toggle('is-checked', kJ), kZ.setAttribute('aria-checked', String(kJ)));
    }
    j?.([...k2]);
  }
  function kQ(kz) {
    return ((k4 = !!kz), ka({ clips: M }));
  }
  function kc(kz) {
    return (k3.has(kz) ? k3.delete(kz) : k3.add(kz), ka({ clips: M }));
  }
  function kj() {
    return (k3.clear(), ka({ clips: M }));
  }
  return {
    render: ka,
    setActive: ke,
    filter: kR,
    selectAll: kl,
    tagVocabulary: kk,
    toggleTag: kc,
    clearTags: kj,
    setGrouped: kQ,
    getActiveTags: () => [...k3],
    getSelected: () => {
      let kz = new Set(kw());
      return [...k2].filter((kp) => kz.has(kp));
    },
    clearSelection: () => kl(!1),
    firstShown: () =>
      [...kE.entries()]
        .filter(([, kz]) => !kz.hidden)
        .sort((kz, kp) => Number(kz[1].style.order) - Number(kp[1].style.order))[0]?.[0] ?? null,
    isVisible: (kz) => kw().includes(kz),
    isSelected: (kz) => k2.has(kz),
    setSelected(kz, kp) {
      kp ? k2.add(kz) : k2.delete(kz);
      let kO = kE.get(kz);
      if (kO) {
        kO.classList.toggle('is-picked', kp);
        let kf = kO.querySelector('.lib-tile__pick');
        kf && (kf.classList.toggle('is-checked', kp), kf.setAttribute('aria-checked', String(kp)));
      }
      return (j?.([...k2]), kp);
    },
  };
}
async function ve({ entries: E, exportOne: F, onProgress: C = () => {} }) {
  if (!E?.length) throw new Error('No clips selected');
  let { zip: t } = await import('../dependencies/compression.js'),
    H = {},
    e = 0;
  for (let j = 0; j < E.length; j++) {
    let { id: z, clip: O, name: J } = E[j];
    C(j, E.length, z);
    let U = await F(O, z),
      d = new Uint8Array(await U.arrayBuffer());
    e += d.length;
    let K = J;
    for (let A = 2; K in H; A++) K = J.replace(/(\.\w+)$/, '-' + A + '$1');
    H[K] = [d, { level: 0 }];
  }
  C(E.length, E.length, null);
  let Q = await new Promise((n, o) => {
    t(H, { level: 0 }, (X, x) => (X ? o(X) : n(x)));
  });
  return {
    blob: new Blob([Q], { type: 'application/zip' }),
    files: Object.keys(H).length,
    bytes: e,
  };
}
var oe = '20261018.1bcdfda1',
  ce = ['actionforge.app', 'www.actionforge.app', 'localhost', '127.0.0.1', ''];
function ue(E = globalThis.location?.hostname ?? '') {
  let F = String(E).toLowerCase();
  return ce.includes(F) ? !0 : F.endsWith('.actionforge.app');
}
function Me(E = globalThis.location?.hostname ?? '') {
  let F = ue(E),
    C = F ? '' : ' \u2014 running on ' + E + ', which is not a published host';
  return (
    (globalThis.__afBuild = { id: oe, host: E, authorised: F }),
    console.info(
      'ActionForge \u00B7 build ' +
        oe +
        C +
        '\nCode \u00A9 CGstuff, all rights reserved.\nRig & animations by Quaternius, CC0 \u2014 https://quaternius.com \u00B7 https://www.patreon.com/quaternius\nLicences, including the MIT notices for the libraries this is built on: /THIRD-PARTY-NOTICES.txt\nhttps://actionforge.app',
    ),
    F
  );
}
var pe = { ik_hand_l: 'hand_l', ik_hand_r: 'hand_r', socket_offhand_grip: 'hand_l' };
function de(E, F, C, t) {
  let H = (O) => C.align?.p.get(O) ?? null,
    e = new Map([...F].map(([O, J]) => [O, J.getWorldPosition(new t['Vector3']())])),
    Q = (O, J) => {
      (O.parent.updateWorldMatrix(!0, !1),
        O.position.copy(J).applyMatrix4(new t['Matrix4']().copy(O.parent.matrixWorld).invert()),
        O.updateMatrixWorld(!0));
    },
    j = 0,
    z = [];
  E.traverse((O) => {
    O.isBone && z.push(O);
  });
  for (let O of z) {
    let J = O.name;
    if (J === 'root' || J.startsWith('ik_') || J.startsWith('socket_')) continue;
    let U = H(J);
    U && (Q(O, U), j++);
  }
  for (let [d, K] of Object.entries(pe)) {
    let A = F.get(d),
      n = F.get(K);
    A && n && Q(A, e.get(d).clone().sub(e.get(K)).add(n.getWorldPosition(new t['Vector3']())));
  }
  return (E.updateMatrixWorld(!0), j);
}
function Ce(t, H, e, j) {
  let J = [];
  t.updateMatrixWorld(!0);
  let d = new Map();
  t.traverse((kV) => {
    kV.isBone && d.set(kV.name, kV);
  });
  let K = e.tier === 'proportions' && e.align;
  K && de(t, d, e, j);
  let n = new Map(),
    M = (kV) => {
      if (n.has(kV)) return n.get(kV);
      let kD = K ? e.align.j.get(kV.name) : null,
        km = kD
          ? new j.Matrix4()
              .compose(
                kD,
                e.align.S.get(kV.name)
                  .clone()
                  .multiply(kV.getWorldQuaternion(new j['Quaternion']())),
                new j['Vector3'](1, 1, 1),
              )
              .invert()
          : new j['Matrix4']().copy(kV.matrixWorld).invert();
      return (n.set(kV, km), km);
    },
    k0 = (kV) => (K && e.align.j.get(kV.name)) || kV.getWorldPosition(new j['Vector3']()),
    k1 = [...d.values()].filter(
      (kV) =>
        kV.name !== 'root' &&
        !kV.name.startsWith('ik_') &&
        !kV.name.startsWith('socket_') &&
        !kV.name.includes('leaf'),
    ),
    k2 = [];
  t.traverse((kV) => {
    kV.isSkinnedMesh && k2.push(kV);
  });
  let k3 = k2[0]?.parent ?? t;
  for (let kV of k2) kV.parent.remove(kV);
  k3 !== t && !k3.children.length && k3.parent && k3.parent.remove(k3);
  let k4 = k3.parent ? k3 : t,
    k5 = (kD) => {
      for (let km = kD; km?.isBone; km = km.parent) {
        let kS = d.get(km.name) ?? d.get(km.name.replace(/_1$/, ''));
        if (kS) return kS;
      }
      return null;
    },
    k6 = [],
    k7 = [];
  (H.scene.updateMatrixWorld(!0),
    H.scene.traverse((kD) => {
      kD.isSkinnedMesh ? k6.push(kD) : kD.isMesh && k7.push(kD);
    }));
  let k8 = new j['Vector3'](),
    k9 = new j['Matrix4'](),
    kk = 0;
  for (let kD of k6) {
    let km = [],
      kS = [],
      kr = new Map(),
      kE = (ka) => (
        kr.has(ka) || (kr.set(ka, km.length), km.push(ka), kS.push(M(ka).clone())),
        kr.get(ka)
      ),
      kF = new Set(),
      kC = kD.skeleton.bones.map((ka, ke) => {
        let kR = k5(ka);
        return kR ? kE(kR) : (kF.add(ke), kE(d.get('root')));
      }),
      kt = new j['Matrix4']().multiplyMatrices(e.place, kD.bindMatrix),
      ks = kD.geometry.attributes.skinIndex,
      kH = kD.geometry.attributes.skinWeight;
    if (ks && kH) {
      k9.copy(kt);
      for (let ka = 0; ka < ks.count; ka++) {
        let ke = null;
        for (let kR = 0; kR < 4; kR++) {
          let kl = ks.getComponent(ka, kR);
          if (kF.has(kl) && kH.getComponent(ka, kR) > 0) {
            if (!ke) {
              k8.fromBufferAttribute(kD.geometry.attributes.position, ka).applyMatrix4(k9);
              let kQ = 1 / 0;
              for (let kc of k1) {
                let kj = k8.distanceToSquared(k0(kc));
                kj < kQ && ((kQ = kj), (ke = kc));
              }
            }
            (ks.setComponent(ka, kR, kE(ke)), kk++);
          } else ks.setComponent(ka, kR, kC[kl]);
        }
      }
      ks.needsUpdate = !0;
    }
    (kD.bind(new j.Skeleton(km, kS), kt),
      (kD.frustumCulled = !1),
      kD.removeFromParent(),
      k4.add(kD),
      kD.position.set(0, 0, 0),
      kD.quaternion.identity(),
      kD.scale.set(1, 1, 1));
  }
  kk && J.push(kk + ' unweighted vertex weights given to their nearest bone.');
  let kw = 0;
  for (let kz of k7) {
    let kp = null;
    for (let kf = kz.parent; kf && !kp; kf = kf.parent) kf.isBone && (kp = k5(kf));
    if (!kp) {
      kw++;
      continue;
    }
    let kO = new j.Matrix4().multiplyMatrices(e.place, kz.matrixWorld);
    (kz.removeFromParent(),
      kp.add(kz),
      kO.premultiply(M(kp)).decompose(kz.position, kz.quaternion, kz.scale));
  }
  return (
    kw &&
      J.push(kw + ' loose object' + (kw === 1 ? '' : 's') + ' not attached to the body left out.'),
    t.updateMatrixWorld(!0),
    { scene: t, notes: J }
  );
}
function Ae(E, F) {
  let C = 0,
    t = [];
  for (let H of E) {
    let e = H.skeleton,
      Q = e.bones.map((j) => {
        let z = j.parent;
        return z &&
          z.isBone &&
          z.name === j.name &&
          j.children.filter((p) => p.isBone).length === 0 &&
          j.position.lengthSq() < 1e-12 &&
          Math.abs(1 - Math.abs(j.quaternion.w)) < 1e-9
          ? (C++, t.push(j), z)
          : j;
      });
    C && H.bind(new F['Skeleton'](Q, e.boneInverses), H.bindMatrix);
  }
  for (let j of t) j.parent?.remove(j);
  return C;
}
var se = {
  ue4: { what: 'the Unreal Engine 4 mannequin\u2019s skeleton', preset: 'Unreal Engine 4' },
  ue5: {
    what: 'the Unreal Engine 5 mannequin\u2019s skeleton (Manny\u2019s)',
    preset: 'Unreal Engine 5',
  },
  'ue5-quinn': {
    what: 'the Unreal Engine 5 mannequin\u2019s skeleton (Quinn\u2019s)',
    preset: 'Unreal Engine 5',
  },
  mixamo: { what: 'a Mixamo rig', preset: 'Mixamo' },
  reallusion: { what: 'a Reallusion rig (CC / ActorCore)', preset: 'Reallusion (CC / ActorCore)' },
};
async function Ie(E, F, C) {
  let t = new Set();
  E.traverse((j) => {
    j.name && t.add(j.name);
  });
  let H = S(t);
  if (!H || !se[H]) return null;
  if (H === 'ue5')
    try {
      let j = E.getObjectByName('calf_l')?.position.length() ?? 0,
        z = async (O) => (await D(O, F, C)).getObjectByName('calf_l').position.length();
      j &&
        Math.abs(j - (await z('ue5-quinn'))) < Math.abs(j - (await z('ue5'))) &&
        (H = 'ue5-quinn');
    } catch {}
  let e = V[H],
    Q = { id: H, ...se[H], label: e.label, map: null, turns: null };
  if (H === 'mixamo') {
    if (!fe(E, C)) return Q;
    try {
      let { bones: O } = await m(e.map ?? H, F);
      Q.map = Object.fromEntries(Object.entries(O).map(([J, U]) => [U, J]));
    } catch {}
    return ((Q.turns = new Map()), Q);
  }
  try {
    let { bones: J } = await m(e.map ?? H, F);
    Q.map = Object.fromEntries(Object.entries(J).map(([d, K]) => [K, d]));
    let U = Object.entries(e.pose ?? {});
    if (U.length) {
      let d = (await D(H, F, C)).clone(!0);
      d.updateMatrixWorld(!0);
      let K = [];
      d.traverse((o) => {
        o.isBone && K.push(o);
      });
      let A = new Map(K.map((o) => [o, o.getWorldQuaternion(new C['Quaternion']())])),
        n = new Map(K.map((o) => [o.name, o]));
      for (let [o, X] of U)
        n.get(o)?.quaternion.multiply(
          new C.Quaternion().setFromEuler(new C['Euler'](...X.map((x) => (x * Math.PI) / 180))),
        );
      (d.updateMatrixWorld(!0), (Q.turns = new Map()));
      for (let x of K) {
        let y = x.getWorldQuaternion(new C['Quaternion']()).multiply(A.get(x).invert());
        2 * Math.acos(Math.min(1, Math.abs(y.w))) > 0.00001 && Q.turns.set(x.name, y);
      }
    }
  } catch {}
  return Q;
}
function fe(E, F) {
  E.updateMatrixWorld(!0);
  let C = (Q) => {
      let j = null;
      return (
        E.traverse((z) => {
          !j && new RegExp('^(?:mixamorig\\d*[:_]?)?' + Q + '$', 'i').test(z.name) && (j = z);
        }),
        j
      );
    },
    t = (Q) => {
      let j = C(Q + 'Arm'),
        z = C(Q + 'ForeArm');
      return j && z
        ? z.getWorldPosition(new F.Vector3()).sub(j.getWorldPosition(new F.Vector3())).normalize()
        : null;
    },
    H = t('Left'),
    e = t('Right');
  return !!(H && e && H.angleTo(e) > (160 * Math.PI) / 180);
}
export { me as a, we as b, ve as c, oe as d, Me as e, de as f, Ce as g, Ae as h, Ie as i };
