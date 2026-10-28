import {
  C as V,
  D,
  G as m,
  J as S,
  b as r,
  c as E,
  e as F,
  g as C,
  o as t,
  p as s,
  q as a,
  r as e,
  u as R,
  v as l,
  w as Q,
  x as c,
  y as j,
} from '../rigging/retargeting.js';
import { b as p, c as O, d as f } from '../animation/channels.js';
import { Aa as J, Ra as U, _ as u, ba as d, ca as K, ta as T } from '../animation/math.js';
import { a as A } from '../dependencies/gltf-exporter-compat.js';
import {
  Jg as n,
  Zd as o,
  ad as X,
  bd as L,
  fd as b,
  hg as x,
} from '../dependencies/three-compat.js';
var we = {
    blender: {
      label: 'Blender',
      scale: 100,
      rotate: [0, 180, 0],
      cameraY: -90,
      verified: !0,
      note: 'Measured in Blender with default FBX import settings.',
    },
    unreal: {
      label: 'Unreal',
      scale: 100,
      rotate: [0, 180, 0],
      cameraY: -90,
      verified: !0,
      note: 'Measured in Unreal with default FBX import settings.',
    },
    unity: {
      label: 'Unity',
      scale: 1,
      rotate: [0, 180, 0],
      cameraY: -90,
      verified: !0,
      note: 'Measured in Unity. It applies its own Scale Factor, so the object lands at scale 1 with no adjustment.',
    },
    maya: {
      label: 'Maya',
      scale: 100,
      rotate: [0, 180, 0],
      cameraY: -90,
      verified: !1,
      note: "Never opened in Maya \u2014 these are Blender's numbers.",
    },
  },
  be = 'blender';
function rt(y, W, q) {
  let P = typeof W == 'string' ? we[W] : W;
  if (!P) throw new Error('Unknown FBX target "' + W + '"');
  let Y = (G) => ((Number(G) || 0) * Math.PI) / 180;
  (y.scale.setScalar(P.scale ?? 1),
    y.rotation.set(Y(P.rotate?.[0]), Y(P.rotate?.[1]), Y(P.rotate?.[2]), 'XYZ'),
    y.updateMatrixWorld(!0));
  let v = 0;
  y.traverse((G) => {
    G.isSkinnedMesh && (G.bind(G.skeleton), v++);
  });
  let B = 0;
  if (P.cameraY) {
    let G = Y(P.cameraY);
    (y.traverse((g) => {
      g.isCamera && ((g.rotation.y += G), B++);
    }),
      B && y.updateMatrixWorld(!0));
  }
  return { rebound: v, cameras: B };
}
function ce(y, W) {
  let q = 0,
    P = 0;
  return (
    y.traverse((Y) => {
      if (!Y.isSkinnedMesh) return;
      let v = Y.skeleton;
      for (let B = 0; B < v.bones.length; B++) {
        let G = new W.Matrix4().copy(v.boneInverses[B]).invert(),
          g = v.bones[B].matrixWorld;
        for (let I = 0; I < 16; I++) q = Math.max(q, Math.abs(G.elements[I] - g.elements[I]));
        P++;
      }
    }),
    { worst: q, bones: P }
  );
}
var ot = 8;
function st(y, W, q) {
  if (!y || !W || !q) return y;
  let P = Object.keys(W);
  if (!P.length) return y;
  let Y = y.clone(),
    v = new Float32Array([0, Math.max(y.duration, 1 / 30)]);
  for (let B of P) {
    let { pos: G, quat: g } = W[B],
      I = (h) => {
        let N = Y.tracks.findIndex((M) => M.name === h.name);
        N >= 0 ? (Y.tracks[N] = h) : Y.tracks.push(h);
      };
    (I(new q['VectorKeyfra' + 'meTrack'](B + '.position', v, new Float32Array([...G, ...G]))),
      I(
        new q['QuaternionKe' + 'yframeTrack'](B + '.quaternion', v, new Float32Array([...g, ...g])),
      ));
  }
  return Y;
}
function at(W, q, P) {
  if (!W || !q || !P) return W;
  let Y = (k2) => {
      let k3 = null;
      return (
        q.traverse((k4) => {
          !k3 && k4.name === k2 && (k3 = k4);
        }),
        k3
      );
    },
    v = C.map(({ follower: k2, hand: k3 }) => ({ follower: Y(k2), hand: Y(k3), name: k2 })).filter(
      (k2) => k2.follower && k2.hand && k2.follower.parent,
    );
  if (!v.length) return W;
  let G = v.filter((k2) => W.tracks.some((k3) => k3.name === k2.name + '.position'));
  if (!G.length) return W;
  let I = new P['AnimationMix' + 'er'](q),
    h = I.clipAction(W);
  h.play();
  let N = W.clone(),
    k0 = new P['Vector3'](),
    k1 = new P.Matrix4();
  for (let { follower: k2, hand: k3, name: k4 } of G) {
    let k5 = N.tracks.find((k9) => k9.name === k4 + '.position');
    if (!k5) continue;
    let k6 = [];
    for (let k9 = 0; k9 < k5.times.length - 1; k9++) {
      let kk = k5.times[k9],
        kw = k5.times[k9 + 1];
      for (let kV = 0; kV < ot; kV++) k6.push(kk + (kw - kk) * (kV / ot));
    }
    k6.push(k5.times[k5.times.length - 1]);
    let k7 = new Float32Array(k6.length * 3);
    for (let kD = 0; kD < k6.length; kD++)
      (I.setTime(Math.min(k6[kD], W.duration - 0.000001)),
        q.updateMatrixWorld(!0),
        k0.setFromMatrixPosition(k3.matrixWorld),
        k1.copy(k2.parent.matrixWorld).invert(),
        k0.applyMatrix4(k1),
        (k7[kD * 3] = k0.x),
        (k7[kD * 3 + 1] = k0.y),
        (k7[kD * 3 + 2] = k0.z));
    let k8 = N.tracks.indexOf(k5);
    N.tracks[k8] = new k5['constructor'](k5.name, new Float32Array(k6), k7);
  }
  return (h.stop(), I.uncacheClip(W), N);
}
function ue(y, W) {
  y.updateMatrixWorld(!0);
  let q = [];
  if (
    (y.traverse((g) => {
      g.isBone && q.push(g);
    }),
    !q.length)
  )
    return null;
  let P = q.filter((g) => !g.parent?.isBone),
    Y = P.length === 1 ? P[0] : null,
    v = Y?.parent ?? null,
    B = v ? v.matrixWorld.clone().invert() : new W['Matrix4'](),
    G = new W.Matrix4();
  return {
    skeleton: Y ? Y.name : null,
    joints: q.map((g) => ({
      name: g.name,
      ibm: Array.from(G.multiplyMatrices(B, g.matrixWorld).invert().elements),
    })),
  };
}
function Me(y, W) {
  y.updateMatrixWorld(!0);
  let q = 0;
  return (
    y.traverse((P) => {
      if (!P.isSkinnedMesh) return;
      let Y = [...P.skeleton.bones],
        v = new Set(Y),
        B = (G) => {
          for (let g of G.children) g.isBone && (v.has(g) || (v.add(g), Y.push(g)), B(g));
        };
      for (let G of P.skeleton.bones) B(G);
      ((q += Y.length - P.skeleton.bones.length),
        P.bind(Y.length === P.skeleton.bones.length ? P.skeleton : new W.Skeleton(Y)));
    }),
    q
  );
}
var it = 1179937895,
  lt = 1313821514,
  ct = 5130562,
  xe = (y) => (4 - (y % 4)) % 4;
function ut(q, P) {
  let Y = (kr) => ({ buffer: q, skinned: !1, reason: kr });
  if (!P?.joints?.length) return Y('no joints');
  let v = new Uint8Array(q),
    G = new DataView(q);
  if (v.byteLength < 20 || G.getUint32(0, !0) !== it) return Y('not a GLB');
  let h = G.getUint32(12, !0);
  if (G.getUint32(16, !0) !== lt) return Y('first chunk is not JSON');
  let N = JSON.parse(new TextDecoder().decode(v.subarray(20, 20 + h))),
    k0 = new Uint8Array(0),
    k1 = 20 + h;
  if (k1 + 8 <= v.byteLength && G.getUint32(k1 + 4, !0) === ct) {
    let kr = G.getUint32(k1, !0);
    k0 = v.subarray(k1 + 8, k1 + 8 + kr);
  }
  let k2 = new Map();
  (N.nodes ?? []).forEach((kE, kF) => {
    kE.name != null && k2.set(kE.name, k2.has(kE.name) ? -1 : kF);
  });
  let k3 = [];
  for (let kE of P.joints) {
    let kF = k2.get(kE.name);
    if (kF === void 0) return Y('joint "' + kE.name + '" has no node');
    if (kF === -1) return Y('joint "' + kE.name + '" names more than one node');
    k3.push(kF);
  }
  let k4 = k0.byteLength + xe(k0.byteLength),
    k5 = new Float32Array(P.joints.flatMap((kC) => kC.ibm)),
    k6 = k4 + k5.byteLength,
    k7 = new Uint8Array(k6);
  (k7.set(k0, 0),
    k7.set(new Uint8Array(k5.buffer), k4),
    (N.buffers = N.buffers?.length ? N.buffers : [{ byteLength: 0 }]),
    (N.buffers[0].byteLength = k6),
    (N.bufferViews = N.bufferViews ?? []),
    (N.accessors = N.accessors ?? []),
    N.bufferViews.push({ buffer: 0, byteOffset: k4, byteLength: k5.byteLength }),
    N.accessors.push({
      bufferView: N.bufferViews.length - 1,
      componentType: 5126,
      count: P.joints.length,
      type: 'MAT4',
    }));
  let k8 = { joints: k3, inverseBindMatrices: N.accessors.length - 1 };
  (P.skeleton != null && k2.get(P.skeleton) >= 0 && (k8.skeleton = k2.get(P.skeleton)),
    (N.skins = [...(N.skins ?? []), k8]));
  let k9 = new TextEncoder().encode(JSON.stringify(N)),
    kk = k9.byteLength + xe(k9.byteLength),
    kw = k6 + xe(k6),
    kV = 20 + kk + 8 + kw,
    kD = new Uint8Array(kV),
    km = new DataView(kD.buffer);
  (km.setUint32(0, it, !0),
    km.setUint32(4, 2, !0),
    km.setUint32(8, kV, !0),
    km.setUint32(12, kk, !0),
    km.setUint32(16, lt, !0),
    kD.set(k9, 20),
    kD.fill(32, 20 + k9.byteLength, 20 + kk));
  let kS = 20 + kk;
  return (
    km.setUint32(kS, kw, !0),
    km.setUint32(kS + 4, ct, !0),
    kD.set(k7, kS + 8),
    { buffer: kD.buffer, skinned: !0 }
  );
}
function Z(y) {
  return (
    y.traverse((W) => {
      W.isSkinnedMesh && (W.skeleton.boneInverses = W.skeleton.boneInverses.map((q) => q.clone()));
    }),
    y
  );
}
function ke(y, W = []) {
  let q = new Set();
  for (let v of W ?? []) for (let B of v?.tracks ?? []) q.add(x.parseTrackName(B.name).nodeName);
  let P = [];
  y.traverse((G) => {
    G !== y &&
      ((G.type !== 'Group' && G.type !== 'Object3D') ||
        q.has(G.name) ||
        q.has(G.uuid) ||
        P.push(G));
  });
  let Y = 0;
  for (let G of P.reverse()) Bt(G) && Y++;
  return Y;
}
var $t = 0.000001;
function Bt(y) {
  let W = y.parent;
  if (!W) return !1;
  if (!y.children.length) return (W.remove(y), !0);
  if (y.children.some((v) => v.isBone)) return !1;
  y.matrixAutoUpdate && y.updateMatrix();
  let q = [];
  for (let v of y.children) {
    v.matrixAutoUpdate && v.updateMatrix();
    let B = new b().multiplyMatrices(y.matrix, v.matrix),
      G = new L(),
      g = new X(),
      I = new L();
    B.decompose(G, g, I);
    let h = new b().compose(G, g, I),
      N = Math.max(1, ...B.elements.map(Math.abs));
    if (h.elements.some((M, k0) => Math.abs(M - B.elements[k0]) > $t * N)) return !1;
    q.push({ child: v, p: G, q: g, s: I, m: B });
  }
  let P = W.children.indexOf(y);
  W.remove(y);
  for (let { child: M, p: k0, q: k1, s: k2, m: k3 } of q)
    (M.position.copy(k0), M.quaternion.copy(k1), M.scale.copy(k2), M.matrix.copy(k3), W.add(M));
  let Y = W.children.splice(W.children.length - q.length, q.length);
  return (W.children.splice(P, 0, ...Y), W.updateMatrixWorld(!0), !0);
}
var Rt = '/api/community/library',
  St = 'community.',
  _t = 'af.community.host',
  ft = (y, W) => (typeof y == 'string' ? y.replace(/\s+/g, ' ').trim().slice(0, W) : '');
function Ht(y, W) {
  if (y === 'all') return !0;
  try {
    return y === 'host' && W?.getItem(_t) === '1';
  } catch {
    return !1;
  }
}
function en(y) {
  return (Array.isArray(y?.clips) ? y.clips : [])
    .map((W) => {
      let q = typeof W?.id == 'string' && /^[\w-]{1,64}$/.test(W.id) ? W.id : '',
        P = ft(W?.name, 80),
        Y = ft(W?.by, 40),
        v = Number(W?.duration);
      if (!q || !P || !Y || !(v > 0)) return null;
      let B = (G) => (typeof G == 'string' && G.startsWith('/') ? G : '');
      return {
        id: q,
        name: P,
        by: Y,
        byId: typeof W.byId == 'string' && /^[\w-]{1,64}$/.test(W.byId) ? W.byId : '',
        duration: v,
        travels: W.travels === !0,
        picture: B(W.picture),
        preview: B(W.preview),
      };
    })
    .filter(Boolean);
}
var tn = (y) => '' + St + y.id.replaceAll('-', '.');
function nn(y, W) {
  return {
    label: y.name,
    duration: y.duration,
    rootMotion: y.travels,
    tags: ['community'],
    community: !0,
    by: y.by,
    byId: y.byId || void 0,
    preview: y.preview || void 0,
    icon: y.picture || void 0,
    file: null,
    load: W,
  };
}
var pt = (y, W) => [...new Set(y.map((q) => (W[q]?.community ? W[q].by : null)).filter(Boolean))];
function dt(y, W) {
  let q = new Map();
  for (let P of y) {
    let Y = W[P];
    Y?.community &&
      Y.by &&
      !q.has(Y.byId || Y.by) &&
      q.set(Y.byId || Y.by, { name: Y.by, ...(Y.byId ? { id: Y.byId } : {}) });
  }
  return [...q.values()];
}
var Ut = {
    100: Float64Array,
    102: Float32Array,
    105: Int32Array,
    108: BigInt64Array,
    98: Uint8Array,
  },
  It = 128,
  Ft = 8,
  ve = 0.0001,
  Ct = 102;
function jt(y, W) {
  let q = Ut[y[0]];
  if (!q)
    throw new Error('FBX: a property of type "' + String.fromCharCode(y[0]) + '" is not an array');
  let P = new DataView(y.buffer, y.byteOffset, y.byteLength),
    Y = P.getUint32(1, !0),
    v = P.getUint32(5, !0) === 1,
    B = y.subarray(13, 13 + P.getUint32(9, !0)),
    G = (v ? W(B) : B).slice(0, Y * q.BYTES_PER_ELEMENT);
  return new q(G.buffer, 0, Y);
}
function mt(y, W, q) {
  let P = new Uint8Array(W.buffer, W.byteOffset, W.byteLength),
    Y = P.length > It,
    v = Y ? q(P, { level: 1 }) : P,
    B = new Uint8Array(13 + v.length),
    G = new DataView(B.buffer);
  return (
    (B[0] = y),
    G.setUint32(1, W.length, !0),
    G.setUint32(5, Y ? 1 : 0, !0),
    G.setUint32(9, v.length, !0),
    B.set(v, 13),
    B
  );
}
function Ae(y) {
  let W = new Uint8Array(5);
  return ((W[0] = 73), new DataView(W.buffer).setInt32(1, y, !0), W);
}
var z = (y, W, q = null) => ({ name: y, props: W, children: q ?? [], sentinel: !!q });
async function ht(y) {
  let { unzlibSync: W, zlibSync: q } = await import('../dependencies/compression.js'),
    P = y instanceof Uint8Array ? y : new Uint8Array(y),
    Y = a(P),
    v = Y.nodes.find((G) => G.name === 'Objects')?.children ?? [],
    B = (G, g) => G.children.find((I) => I.name === g);
  return {
    u8: P,
    tree: Y,
    objects: v,
    child: B,
    links: Y.nodes.find((G) => G.name === 'Connections')?.children ?? [],
    meshes: v.filter((G) => G.name === 'Geometry' && R(G.props[2]) === 'Mesh'),
    says: (G, g) => {
      let I = B(G, g)?.props[0];
      return (I && R(I)) ?? '';
    },
    read: (G, g) => {
      let I = B(G, g);
      return I?.props[0] ? jt(I.props[0], W) : null;
    },
    put: (G, g, I) => {
      let h = B(G, g);
      h.props = [mt(h.props[0][0], I, q)];
    },
    array: (G, g) => mt(G, g, q),
  };
}
async function yt(Y) {
  let {
      u8: G,
      tree: k0,
      objects: k1,
      links: k2,
      meshes: k3,
      child: k4,
      says: k5,
      read: k6,
      put: k7,
    } = await ht(Y),
    k8 = (km) => new DataView(km.buffer, km.byteOffset, km.byteLength).getBigInt64(1, !0),
    k9 = (km) => km?.[0] === 76,
    kk = new Map(k1.filter((km) => k9(km.props[0])).map((km) => [k8(km.props[0]), km])),
    kw = new Map();
  for (let km of k2) {
    if (km.name !== 'C' || R(km.props[0]) !== 'OO' || !k9(km.props[1]) || !k9(km.props[2]))
      continue;
    let kS = k8(km.props[2]);
    (kw.has(kS) || kw.set(kS, []), kw.get(kS).push(k8(km.props[1])));
  }
  let kV = (kr, kE, kF) =>
      (kw.get(k8(kr.props[0])) ?? [])
        .map((kC) => kk.get(kC))
        .filter((kC) => kC?.name === kE && R(kC.props[2]) === kF),
    kD = { meshes: 0, before: 0, after: 0 };
  for (let kr of k3) {
    let kE = k6(kr, 'Vertices'),
      kF = k6(kr, 'PolygonVertexIndex');
    if (
      !kE ||
      !kF ||
      kr.children.some(
        (ku) =>
          ku.name.startsWith('LayerElement') && /^ByVert/.test(k5(ku, 'MappingInformationType')),
      )
    )
      continue;
    let kC = kE.length / 3,
      ks = kV(kr, 'Deformer', 'Skin')
        .flatMap((ku) => kV(ku, 'Deformer', 'Cluster'))
        .map((ku) => ({ node: ku, at: k6(ku, 'Indexes'), by: k6(ku, 'Weights') }))
        .filter((ku) => ku.at && ku.by),
      kH = kV(kr, 'Deformer', 'BlendShape')
        .flatMap((ku) => kV(ku, 'Deformer', 'BlendShapeChannel'))
        .flatMap((ku) =>
          kV(ku, 'Geometry', 'Shape').map((kd) => ({
            node: kd,
            channel: ku,
            at: k6(kd, 'Indexes'),
            rows: ['Vertices', 'Normals']
              .filter((kK) => k4(kd, kK))
              .map((kK) => ({ k: kK, of: k6(kd, kK) })),
          })),
        )
        .filter((ku) => ku.at),
      ka = new Array(kC).fill('');
    (ks.forEach((ku, kd) => {
      for (let kK = 0; kK < ku.at.length; kK++) ka[ku.at[kK]] += '|' + kd + ':' + ku.by[kK];
    }),
      kH.forEach((ku, kd) => {
        for (let kK = 0; kK < ku.at.length; kK++)
          ka[ku.at[kK]] +=
            '|s' +
            kd +
            ':' +
            ku.rows
              .map((kT) => kT.of[3 * kK] + ',' + kT.of[3 * kK + 1] + ',' + kT.of[3 * kK + 2])
              .join(';');
      }));
    let kR = (ku) => (kF[ku] < 0 ? ~kF[ku] : kF[ku]),
      kl = [];
    for (let ku = 0; ku < kF.length; ku++) kF[ku] < 0 && kl.push(ku + 1);
    let kQ = new Int32Array(kC),
      kc = new Uint8Array(kC),
      kj = new Int32Array(kC),
      kz = new Map(),
      kp = [],
      kO = !1;
    for (let kd = 1; kd <= Ft && !kO; kd++) {
      (kQ.fill(-1), kz.clear(), (kp = []), (kO = !0));
      let kK = (kA) => {
          kj[kA] !== kd && ((kj[kA] = kd), kc[kA]++, (kO = !1));
        },
        kT = new Map();
      for (let kA = 0, kn = 0; kA < kl.length; kn = kl[kA++]) {
        let ko = [],
          kX = [];
        for (let ky = kn; ky < kl[kA]; ky++) {
          let kW = kR(ky);
          if (kQ[kW] < 0) {
            let kq =
                kE[3 * kW] +
                ',' +
                kE[3 * kW + 1] +
                ',' +
                kE[3 * kW + 2] +
                ka[kW] +
                (kc[kW] ? '|sheet' + kc[kW] : ''),
              kP = kz.get(kq);
            (kP === void 0 && ((kP = kp.length), kz.set(kq, kP), kp.push(kW)), (kQ[kW] = kP));
          }
          (kX.includes(kQ[kW]) && !ko.includes(kW) && kK(kW), ko.push(kW), kX.push(kQ[kW]));
        }
        let kL = kX
            .slice()
            .sort((kY, kv) => kY - kv)
            .join(),
          kb = ko
            .slice()
            .sort((kY, kv) => kY - kv)
            .join(),
          kx = kT.get(kL);
        if (kx === void 0) kT.set(kL, kb);
        else {
          if (kx !== kb) {
            for (let kY of ko) kK(kY);
          }
        }
      }
    }
    if (!kO || kp.length === kC) continue;
    let kf = new kE['constructor'](kp.length * 3);
    (kp.forEach((kv, kB) => {
      ((kf[3 * kB] = kE[3 * kv]),
        (kf[3 * kB + 1] = kE[3 * kv + 1]),
        (kf[3 * kB + 2] = kE[3 * kv + 2]));
    }),
      k7(kr, 'Vertices', kf),
      k7(
        kr,
        'PolygonVertexIndex',
        Int32Array.from(kF, (kv, kB) => (kv < 0 ? ~kQ[kR(kB)] : kQ[kR(kB)])),
      ));
    let kJ = new Int32Array(kp.length),
      kZ = 0,
      kU = (kv) => {
        kZ++;
        let kB = [];
        for (let kG = 0; kG < kv.length; kG++) {
          let kg = kQ[kv[kG]];
          kg >= 0 && kJ[kg] !== kZ && ((kJ[kg] = kZ), kB.push(kG));
        }
        return kB;
      };
    for (let kv of ks) {
      let kB = kU(kv.at);
      if (!kB.length) {
        kv.node.children = kv.node.children.filter(
          (kG) => kG.name !== 'Indexes' && kG.name !== 'Weights',
        );
        continue;
      }
      (k7(
        kv.node,
        'Indexes',
        Int32Array.from(kB, (kG) => kQ[kv.at[kG]]),
      ),
        k7(
          kv.node,
          'Weights',
          kv.by.constructor.from(kB, (kG) => kv.by[kG]),
        ));
    }
    for (let kG of kH) {
      let kg = kU(kG.at);
      k7(
        kG.node,
        'Indexes',
        Int32Array.from(kg, (kh) => kQ[kG.at[kh]]),
      );
      for (let kh of kG.rows) {
        let kN = new kh.of['constructor'](kg.length * 3);
        (kg.forEach((ki, kM) => {
          ((kN[3 * kM] = kh.of[3 * ki]),
            (kN[3 * kM + 1] = kh.of[3 * ki + 1]),
            (kN[3 * kM + 2] = kh.of[3 * ki + 2]));
        }),
          k7(kG.node, kh.k, kN));
      }
      let kI = k6(kG.channel, 'FullWeights');
      kI && kI.length === kG.at.length && k7(kG.channel, 'FullWeights', kI.slice(0, kg.length));
    }
    (kD.meshes++, (kD.before += kC), (kD.after += kp.length));
  }
  return { bytes: kD.meshes ? e(k0) : G, ...kD };
}
async function gt(P) {
  let { u8: Y, tree: v, meshes: G, child: N, says: k0, read: k1, array: k2 } = await ht(P),
    k3 = { meshes: 0, edges: 0, hard: 0 };
  for (let k4 of G) {
    if (N(k4, 'LayerElementSmoothing')) continue;
    let k5 = k1(k4, 'PolygonVertexIndex'),
      k6 = N(k4, 'LayerElementNormal');
    if (!k5?.length || !k6 || k0(k6, 'MappingInformationType') !== 'ByPolygonVertex') continue;
    let k7 = k1(k6, 'Normals'),
      k8 = k0(k6, 'ReferenceInformationType') === 'IndexToDirect' ? k1(k6, 'NormalsIndex') : null;
    if (!k7 || (k8 ? k8.length : k7.length / 3) !== k5.length) continue;
    let k9 = (ks, kH) => {
        let ka = 3 * (k8 ? k8[ks] : ks),
          kR = 3 * (k8 ? k8[kH] : kH);
        return (
          Math.abs(k7[ka] - k7[kR]) <= ve &&
          Math.abs(k7[ka + 1] - k7[kR + 1]) <= ve &&
          Math.abs(k7[ka + 2] - k7[kR + 2]) <= ve
        );
      },
      kk = (ks) => (k5[ks] < 0 ? ~k5[ks] : k5[ks]),
      kw = 0;
    for (let ks = 0; ks < k5.length; ks++) kw = Math.max(kw, kk(ks) + 1);
    let kV = new Map(),
      kD = [],
      km = [],
      kS = [],
      kr = [];
    for (let kH = 0, ka = 0; ka < k5.length; ka++)
      if (!(k5[ka] >= 0)) {
        for (let kR = kH; kR <= ka; kR++) {
          let kl = kR < ka ? kR + 1 : kH,
            kQ = kk(kR),
            kc = kk(kl);
          if (kQ === kc) continue;
          let kj = kQ < kc ? kQ * kw + kc : kc * kw + kQ,
            kz = kV.get(kj);
          if (kz === void 0) {
            (kV.set(kj, kD.length), kD.push(kR), km.push(kl), kS.push(1), kr.push(1));
            continue;
          }
          (kS[kz]++,
            (kr[kz] =
              kS[kz] === 2 &&
              (kk(kD[kz]) === kQ
                ? k9(kD[kz], kR) && k9(km[kz], kl)
                : k9(kD[kz], kl) && k9(km[kz], kR))
                ? 1
                : 0));
        }
        kH = ka + 1;
      }
    if (!kD.length) continue;
    let kE = z('Edges', [k2(105, Int32Array.from(kD))]),
      kF = k4.children.findIndex((kp) => kp.name === 'Edges');
    (kF >= 0
      ? (k4.children[kF] = kE)
      : k4.children.splice(
          k4.children.findIndex((kp) => kp.name === 'PolygonVertexIndex') + 1,
          0,
          kE,
        ),
      k4.children.splice(
        k4.children.indexOf(k6) + 1,
        0,
        z(
          'LayerElementSmoothing',
          [Ae(0)],
          [
            z('Version', [Ae(Ct)]),
            z('Name', [l('')]),
            z('MappingInformationType', [l('ByEdge')]),
            z('ReferenceInformationType', [l('Direct')]),
            z('Smoothing', [k2(105, Int32Array.from(kr))]),
          ],
        ),
      ));
    let kC = k4.children.find(
      (kp) =>
        kp.name === 'Layer' &&
        kp.props[0]?.[0] === 73 &&
        new DataView(kp.props[0].buffer, kp.props[0].byteOffset, 5).getInt32(1, !0) === 0,
    );
    if (kC) {
      let kp = z(
          'LayerElement',
          [],
          [z('Type', [l('LayerElementSmoothing')]), z('TypedIndex', [Ae(0)])],
        ),
        kO = kC.children.findIndex(
          (kf) => kf.name === 'LayerElement' && k0(kf, 'Type') === 'LayerElementNormal',
        );
      kC.children.splice(kO >= 0 ? kO + 1 : kC.children.length, 0, kp);
    }
    (k3.meshes++, (k3.edges += kD.length), (k3.hard += kr.filter((kf) => !kf).length));
  }
  return { bytes: k3.meshes ? e(v) : Y, ...k3 };
}
var Wt = [
  'map',
  'normalMap',
  'roughnessMap',
  'metalnessMap',
  'aoMap',
  'emissiveMap',
  'alphaMap',
  'bumpMap',
  'specularMap',
];
function wt(y) {
  return (
    y.traverse((W) => {
      W.isMesh && W.geometry && (W.geometry.userData.uvOrigin = 'bottom');
    }),
    y
  );
}
function Lt(y) {
  for (let W of [].concat(y.material ?? []))
    for (let q of Wt) {
      let P = W?.[q];
      if (P?.isTexture) return P.flipY === !1;
    }
  return y.geometry?.userData?.uvOrigin !== 'bottom';
}
function bt(y) {
  if (!y.isMesh || !y.geometry || !Lt(y)) return !1;
  let W = ['uv', 'uv1', 'uv2', 'uv3'].filter((q) => y.geometry.attributes[q]);
  if (!W.length) return !1;
  y.geometry = y.geometry.clone();
  for (let q of W) {
    let P = y.geometry.attributes[q];
    for (let Y = 0; Y < P.count; Y++) P.setY(Y, 1 - P.getY(Y));
    P.needsUpdate = !0;
  }
  return ((y.geometry.userData.uvOrigin = 'bottom'), !0);
}
function Ot(y) {
  let W = y.image;
  return W ? W.width > 0 && W.height > 0 : !1;
}
function fe(y) {
  let W = new Set(),
    q = new Set();
  return (
    y?.traverse?.((P) => {
      for (let Y of [].concat(P.material || []))
        if (!(!Y || W.has(Y))) {
          W.add(Y);
          for (let [v, B] of Object.entries(Y))
            !B?.isTexture ||
              B.isCubeTexture ||
              B.isRenderTargetTexture ||
              Ot(B) ||
              ((Y[v] = null), (Y.needsUpdate = !0), q.add(B));
        }
    }),
    q.size
  );
}
function xt(y) {
  y.updateMatrixWorld(!0);
  let W = new Set();
  (y.traverse((q) => {
    if (!q.isSkinnedMesh || !q.skeleton || W.has(q.skeleton)) return;
    W.add(q.skeleton);
    let { bones: P, boneInverses: Y } = q.skeleton;
    P.forEach((v, B) => {
      v && v.matrixWorld.copy(Y[B]).invert();
    });
    for (let v of P) {
      if (!v) continue;
      (v.parent
        ? new b().copy(v.parent.matrixWorld).invert().multiply(v.matrixWorld)
        : v.matrixWorld.clone()
      ).decompose(v.position, v.quaternion, v.scale);
    }
  }),
    y.updateMatrixWorld(!0));
}
function Ue(y, W) {
  let { buffer: q, skinned: P, reason: Y } = ut(y, W);
  return (P || console.warn('[export] animation-only GLB written without a skin: ' + Y), q);
}
function oe(y) {
  let W = new Set();
  for (let q of y ?? []) {
    let P = q?.tracks?.find((B) => B.times.length > 2);
    if (!P) continue;
    let Y = P.times,
      v = (Y[Y.length - 1] - Y[0]) / (Y.length - 1);
    v > 0 && W.add(Math.round(1 / v));
  }
  return W.size === 1 ? [...W][0] : Mt;
}
function se(y) {
  let W = [];
  y.traverse((q) => {
    (q.isMesh || q.isSkinnedMesh) && W.push(q);
  });
  for (let q of W) q.parent?.remove(q);
  return y;
}
function _e(y) {
  let W = [];
  y.traverse((q) => {
    q.userData?.ikEffector && W.push(q);
  });
  for (let q of W) q.parent?.remove(q);
  return y;
}
function Nt({
  clips: W,
  rigRoot: q = null,
  rootName: P = 'root',
  inPlace: Y = !1,
  lock: v = void 0,
  mirrored: B = !1,
  reversed: G = !1,
  reverseOrigin: I = !1,
  adjust: h = null,
  restFrames: N = null,
  poses: M = null,
  poseRest: k0 = null,
  fitClip: k1 = null,
  bakeIk: k2 = null,
}) {
  let k3 = !1,
    k4 = W.map((k6) => {
      let k7 = k6;
      if (
        (G && (k7 = f(k7, { rootName: P, fromOrigin: I })),
        u(h) || (k7 = d(k7, h, N)),
        Y &&
          v?.yaw &&
          (k7 = F(k7, {
            rootRest: k0?.get?.(P) ?? q?.getObjectByName(P)?.quaternion.toArray() ?? null,
            rootName: P,
            children: (q?.getObjectByName(P)?.children ?? [])
              .filter((k8) => k8.isBone)
              .map((k8) => k8.name),
          })),
        M?.length && (k7 = J(k7, M, k0)),
        B && (k7 = O(k7)),
        k1)
      ) {
        let k8 = k7;
        ((k7 = k1(k7)), k7 !== k8 && (k3 = !0));
      }
      return (Y && (k7 = p(k7, { rootName: P, lock: v })), k7);
    }),
    k5 = !1;
  return (
    k2 &&
      (k4 = k4.map((k6) => {
        let k7 = k2(k6);
        return (k7 !== k6 && (k5 = !0), k7);
      })),
    { clips: k4, fitted: k3, ikApplied: k5 }
  );
}
async function Cn({
  rigRoot: P,
  clips: Y,
  withRig: v = !0,
  provenance: G = null,
  inPlace: N = !1,
  lock: k0 = void 0,
  rootName: k1 = 'root',
  mirrored: k2 = !1,
  reversed: k3 = !1,
  reverseOrigin: k4 = !1,
  adjust: k5 = null,
  restFrames: k6 = null,
  format: k7 = 'glb',
  fbxTarget: k8 = be,
  skeleton: k9 = 'default',
  assetRoot: kk = '',
  rigFile: kw = null,
  propPlacements: kV = null,
  poses: kD = null,
  poseRest: km = null,
  bakeIk: kS = null,
  fitClip: kr = null,
  custom: kE = null,
  tweaks: kF = null,
  THREE: kC = null,
  restPose: ks = !1,
  onStage: kH = null,
}) {
  if (ks) Y = [];
  else {
    if (!Y?.length) throw new Error('No clips selected');
  }
  if (k9 !== 'default' && !de[k9])
    throw new Error('Export to the ' + k9 + ' skeleton is not built yet');
  let ka = Nt({
      clips: Y,
      rigRoot: P,
      rootName: k1,
      inPlace: N,
      lock: k0,
      mirrored: k2,
      reversed: k3,
      reverseOrigin: k4,
      adjust: k5,
      restFrames: k6,
      poses: kD,
      poseRest: km,
      fitClip: kr,
      bakeIk: kS,
    }),
    kR = ka.clips,
    { fitted: kl, ikApplied: kQ } = ka;
  {
    let kU = [];
    ((!u(k5) || kQ || T(kD || []).length) && kU.push('adjusted'),
      kl && kU.push('fit'),
      kU.length &&
        (kR = kR.map((ku) => {
          let kd = ku.clone();
          return ((kd.name = (ku.name || 'clip') + '_' + kU.join('_')), kd);
        })));
  }
  let kc = P;
  if ((v || (kc = _e(se(P.clone(!0)))), kE && k9 === 'default'))
    return Tt({
      custom: kE,
      clips: kR,
      withRig: v,
      format: k7,
      fbxTarget: k8,
      provenance: G,
      THREE: kC,
    });
  if (k9 !== 'default')
    return Gt({
      skeleton: k9,
      clips: kR,
      rigRoot: P,
      provenance: G,
      format: k7,
      fbxTarget: k8,
      assetRoot: kk,
      THREE: kC,
      withRig: v,
      tweaks: kF,
      onStage: kH,
    });
  let kj = kC ? kR.map((ku) => at(ku, kc, kC)).map((ku) => st(ku, kV, kC)) : kR;
  if (k7 === 'fbx') {
    let ku = kw ? await Vt(kw, kk, v, kC, kc) : null,
      kd = oe(Y);
    return (
      await kH?.('write'),
      ku ? H(ku, kj, k8, G, kC, !1, 100, kd) : H(kc, kj, k8, G, kC, !0, 1, kd)
    );
  }
  let { clone: kz } = await import('../dependencies/skeleton-utils.js'),
    kp = Z(kz(P));
  (kp.traverse((kK) => {
    kK.isSkinnedMesh && kK.skeleton.pose();
  }),
    _e(kp),
    kp.updateMatrixWorld(!0));
  let kO = !v && kC ? ue(kp, kC) : null;
  v || se(kp);
  let kf = new o();
  (kf.add(kp), ke(kf, kj), await kH?.('write'), fe(kf));
  let kJ = await new A().parseAsync(kf, {
    binary: !0,
    animations: kj,
    onlyVisible: !1,
    includeCustomExtensions: !1,
  });
  kO && (kJ = Ue(kJ, kO));
  let kZ = G ? Ie(kJ, G) : kJ;
  return new Blob([kZ], { type: 'model/gltf-binary' });
}
var Mt = 30,
  de = {
    mixamo: {
      label: 'Mixamo',
      data: 'skeletons/mixamo.json',
      hip: 'mixamorigHips',
      ankle: 'mixamorigLeftFoot',
      sourceHip: 'pelvis',
      sourceAnkle: 'foot_l',
      units: 100,
      namespace: 'mixamorig',
    },
    ue5: { ...pe(), label: 'Unreal Engine 5 (Manny)', data: 'skeletons/ue5-mannequin.json' },
    'ue5-quinn': { ...pe(), label: 'Unreal Engine 5 (Quinn)', data: 'skeletons/ue5-quinn.json' },
    ue4: {
      ...pe(),
      map: 'ue4',
      label: 'Unreal Engine 4',
      data: 'skeletons/ue4-mannequin.json',
      pose: structuredClone(pe().pose),
      chains: null,
      twists: null,
    },
    reallusion: {
      label: 'Reallusion (CC / ActorCore)',
      map: 'reallusion',
      data: 'skeletons/reallusion-cc.json',
      rootBone: null,
      holder: null,
      upright: [-Math.PI / 2, 0, 0],
      hip: 'CC_Base_Hip',
      ankle: 'CC_Base_L_Foot',
      sourceHip: 'pelvis',
      sourceAnkle: 'foot_l',
      sourceRoot: 'root',
      units: 100,
      alignRest: !0,
      pose: { CC_Base_L_Upperarm: [0, 0, 30], CC_Base_R_Upperarm: [0, 0, -30] },
      mix: { align: 0, chest: 0, spine: 0, twist: 0 },
    },
  };
function $e(y, W) {
  if (!W) return null;
  let q = {};
  return (
    y.traverse((P) => {
      P.isBone &&
        P.name.startsWith(W) &&
        !P.name.startsWith(W + ':') &&
        (q[P.name] = W + ':' + P.name.slice(W.length));
    }),
    Object.keys(q).length ? q : null
  );
}
function pe() {
  return {
    map: 'ue5',
    rootBone: 'root',
    holder: 'SK_Mannequin',
    upright: [-Math.PI / 2, 0, 0],
    hip: 'pelvis',
    ankle: 'foot_l',
    sourceHip: 'pelvis',
    sourceAnkle: 'foot_l',
    sourceRoot: 'root',
    units: 100,
    alignRest: !0,
    chestRelative: ['spine_03', 'neck_01'],
    pose: {
      upperarm_l: [-3, -58, -4.5],
      upperarm_r: [-3, -58, -4.5],
      lowerarm_l: [0, 0, 36],
      lowerarm_r: [0, 0, 36],
      hand_l: [-14, 0, 0],
      hand_r: [-14, 0, 0],
    },
    mix: { align: 0, chest: 0, spine: 0, twist: 0 },
    chains: [
      {
        source: ['spine_01', 'spine_02', 'spine_03'],
        target: ['spine_01', 'spine_02', 'spine_03', 'spine_04', 'spine_05'],
      },
    ],
    twists: ['l', 'r'].flatMap((y) => [
      ...['01', '02'].map((W) => ({
        bone: 'upperarm_twist_' + W + '_' + y,
        parent: 'upperarm_' + y,
        child: 'lowerarm_' + y,
      })),
      ...['01', '02'].map((W) => ({
        bone: 'lowerarm_twist_' + W + '_' + y,
        parent: 'lowerarm_' + y,
        child: 'hand_' + y,
        driver: 'hand_' + y,
      })),
      ...['01', '02'].map((W) => ({
        bone: 'thigh_twist_' + W + '_' + y,
        parent: 'thigh_' + y,
        child: 'calf_' + y,
      })),
      ...['01', '02'].map((W) => ({
        bone: 'calf_twist_' + W + '_' + y,
        parent: 'calf_' + y,
        child: 'foot_' + y,
        driver: 'foot_' + y,
      })),
    ]),
  };
}
async function Dt(y, W, q) {
  let P = await fetch(W + '/' + y.data);
  if (!P.ok) throw new Error(y.data + ' returned ' + P.status);
  let Y = await P.json();
  if (Y.format !== 'actionforge-skeleton') throw new Error(y.data + ' is not a skeleton file');
  let v = new q.Group();
  ((v.name = y.label), v.rotation.set(...(y.upright ?? [0, 0, 0])));
  let B = new Map();
  for (let G of Y.bones) {
    let g = new q.Bone();
    ((g.name = G.name),
      g.position.fromArray(G.p),
      g.quaternion.fromArray(G.q).normalize(),
      G.s && g.scale.fromArray(G.s),
      (G.parent ? B.get(G.parent) : v)?.add(g),
      B.set(G.name, g));
  }
  return (
    (v.userData.axes = Y.axes),
    (v.userData.unitScale = Y.unitScale ?? 1),
    v.updateMatrixWorld(!0),
    v
  );
}
var Be = new Map();
async function Pt(y, W, q) {
  if (Be.has(y)) return Be.get(y);
  let P = de[y];
  if (P.data) {
    let Y = await Dt(P, W, q);
    return (Be.set(y, Y), Y);
  }
  throw new Error('Skeleton "' + y + '" has no bone data');
}
async function Vt(W, q, P, Y, v = null) {
  if (!Y) return null;
  let [B, G] = String(W).split('?');
  if (!B.endsWith('.glb')) return null;
  let I = q + '/' + B.slice(0, -4) + '.fbx' + (G ? '?' + G : ''),
    h;
  try {
    let M = await fetch(I);
    if (!M.ok) return null;
    let { FBXLoader: k0 } = await import('../dependencies/fbx-loader.js');
    h = wt(new k0().parse(await M.arrayBuffer(), ''));
  } catch {
    return null;
  }
  (h.traverse((k1) => {
    k1.isSkinnedMesh && k1.skeleton.pose();
  }),
    h.updateMatrixWorld(!0));
  let N = 0;
  if (
    (h.traverse((k1) => {
      k1.isBone && N++;
    }),
    !N)
  )
    return null;
  for (let k1 of h.children) k1.isBone || k1.quaternion.identity();
  if ((h.updateMatrixWorld(!0), v)) {
    let k2 = new Map();
    h.traverse((k6) => {
      k6.isBone && !k2.has(k6.name) && k2.set(k6.name, k6);
    });
    let { clone: k3 } = await import('../dependencies/skeleton-utils.js'),
      k4 = (k6) => Z(k3(k6)),
      k5 = [];
    v.traverse((k6) => {
      if (!k6.isBone) return;
      let k7 = k2.get(k6.name);
      if (k7) {
        for (let k8 of k6.children) k8.isBone || k8.userData?.ikEffector || k5.push([k7, k8]);
      }
    });
    for (let [k6, k7] of k5) k6.add(k4(k7));
  }
  if (!P) {
    let k8 = [];
    h.traverse((k9) => {
      (k9.isMesh || k9.isSkinnedMesh) && k8.push(k9);
    });
    for (let k9 of k8) k9.parent?.remove(k9);
  }
  return (h.updateMatrixWorld(!0), h);
}
function kt(y, W, q, P) {
  if (!Number.isFinite(W) || W === 1) return;
  let Y = new Set();
  (y.traverse((v) => {
    (v.position.multiplyScalar(W),
      v.isMesh &&
        v.geometry &&
        !Y.has(v.geometry) &&
        ((v.geometry = v.geometry.clone()), v.geometry.scale(W, W, W), Y.add(v.geometry)));
  }),
    y.traverse((v) => {
      v.isSkinnedMesh &&
        (v.bindMatrix.scale(new P['Vector3'](W, W, W)),
        v.bindMatrixInverse.copy(v.bindMatrix).invert());
    }));
  for (let v of q ?? [])
    for (let B of v.tracks)
      if (B.name.endsWith('.position')) {
        for (let G = 0; G < B.values.length; G++) B.values[G] *= W;
      }
  y.updateMatrixWorld(!0);
}
var Se = null;
async function qt(y, W) {
  if (!Se) {
    let P = await fetch(W + '/manifests/bone-maps.json');
    if (!P.ok) throw new Error('bone-maps.json returned ' + P.status);
    Se = await P.json();
  }
  let q = Se.maps?.[y];
  if (!q) throw new Error('No bone map for "' + y + '"');
  return q;
}
async function Gt({
  skeleton: k0,
  clips: k1,
  rigRoot: k2,
  provenance: k3,
  format: k4,
  fbxTarget: k5,
  assetRoot: k6,
  THREE: k7,
  withRig: k8 = !0,
  tweaks: k9 = null,
  onStage: kk = null,
}) {
  if (!k7) throw new Error('Retargeting needs the THREE namespace');
  let kw = de[k0];
  await kk?.('skeleton');
  let kV = await Pt(k0, k6, k7),
    { bones: kD } = await qt(kw.map ?? k0, k6),
    { clone: km } = await import('../dependencies/skeleton-utils.js'),
    kS = Z(km(k2));
  (kS.traverse((kZ) => {
    kZ.isSkinnedMesh && kZ.skeleton.pose();
  }),
    kS.updateMatrixWorld(!0));
  let kr = {};
  for (let [kZ, kU] of Object.entries(kD)) kr[kU] = kZ;
  let { scale: kE } = s({
      sourceRoot: kS,
      targetRoot: kV,
      THREE: k7,
      bones: {
        sourceHip: kw.sourceHip,
        sourceAnkle: kw.sourceAnkle,
        targetHip: kw.hip,
        targetAnkle: kw.ankle,
        units: kw.units,
      },
    }),
    kF = Object.entries(k9?.pose ?? kw.pose ?? {}),
    kC = { ...kw.mix, ...k9?.mix },
    ks = kF.length ? km(kV) : kV;
  if (kF.length) {
    let ku = new Map();
    ks.traverse((kd) => {
      kd.isBone && ku.set(kd.name, kd);
    });
    for (let [kd, kK] of kF) {
      let kT = ku.get(kd);
      kT &&
        kT.quaternion.multiply(
          new k7['Quaternion']().setFromEuler(new k7['Euler'](...kK.map(k7.MathUtils.degToRad))),
        );
    }
    ks.updateMatrixWorld(!0);
  }
  let kH = kC.align ?? 1,
    ka = null;
  if (kw.alignRest) {
    ks.updateMatrixWorld(!0);
    let kA = new Map();
    ks.traverse((kX) => {
      kX.isBone && kA.set(kX.name, kX);
    });
    let kn = new Map();
    for (let [kX, kL] of Object.entries(kD)) {
      let kb = kA.get(kX);
      kb && kn.set(kL, kb.getWorldPosition(new k7['Vector3']()));
    }
    let { S: ko } = D({ j: kn, F: null, R0: V(m(kS, k7), k7), THREE: k7 });
    ka = new Map();
    for (let [kx, ky] of ko)
      kr[kx] && ka.set(kr[kx], new k7.Quaternion().slerp(ky.clone().invert(), kH));
  }
  let kR = null;
  if (ka && kw.chestRelative) {
    let kW = new Map(),
      kq = new Map();
    (ks.traverse((kN) => {
      kN.isBone && kW.set(kN.name, kN);
    }),
      kS.traverse((kN) => {
        kN.isBone && !kq.has(kN.name) && kq.set(kN.name, kN);
      }));
    let kP = (kN) => kN.getWorldQuaternion(new k7['Quaternion']()),
      kY = (kN) => kN.getWorldPosition(new k7['Vector3']()),
      [kv, kB] = kw.chestRelative,
      kG = kW.get(kr[kv]),
      kg = kW.get(kr[kB]),
      kI = kq.get(kv),
      kh = kq.get(kB);
    if (kG && kg && kI && kh) {
      let kN = new k7.Quaternion().setFromUnitVectors(
          kY(kh).sub(kY(kI)).normalize(),
          kY(kg).sub(kY(kG)).normalize(),
        ),
        ki = /^(pelvis|spine_0\d|neck_0\d|Head)$/,
        kM = new Set(Object.values(kr)),
        w0 = (w3) => {
          for (let w4 = w3.parent; w4?.isBone; w4 = w4.parent) if (w4 === kI) return !0;
          return !1;
        },
        w1 = (w3) => {
          let w4 = 0;
          for (let w5 = w3.parent; w5; w5 = w5.parent) w4++;
          return w4;
        },
        w2 = new Map();
      kR = new Map();
      for (let w3 of [...kq.values()].filter(w0).sort((w4, w5) => w1(w4) - w1(w5))) {
        let w4 = kr[w3.name],
          w5 = w4 && kW.get(w4);
        if (!w5) continue;
        let w6 = w5.parent;
        for (; w6?.isBone && !kM.has(w6.name);) w6 = w6.parent;
        if (!w6?.isBone) continue;
        let w7 = kq.get(kD[w6.name]);
        if (!w7) continue;
        let w8 = ki.test(w3.name)
          ? kP(w5)
          : kN
              .clone()
              .multiply(ka.get(w4) ?? new k7['Quaternion']())
              .multiply(kP(w5));
        w2.set(w4, w8);
        let w9 =
          w2.get(w6.name) ?? (ka.get(w6.name) ?? new k7['Quaternion']()).clone().multiply(kP(w6));
        kR.set(w4, { anchor: w6.name, sourceAnchor: w7.name, anchorRest: w9, rest: w8, C: kN });
      }
    }
  }
  await kk?.('retarget');
  let kl = k1.map((wk) =>
    t({
      clip: wk,
      sourceRoot: kS,
      targetRoot: ks,
      map: kr,
      THREE: k7,
      hip: kw.sourceHip,
      root: kw.sourceRoot ?? null,
      travelScale: kE,
      name: wk.name,
      restAlign: ka,
      local: kR,
      chains: kw.chains ?? null,
      twists: kw.twists ?? null,
      mix: kC,
      keyed: kF.map(([ww]) => ww),
      footIk:
        (k9?.footIk ?? kw.footIk ?? !0)
          ? ['foot_l', 'foot_r']
              .filter((ww) => kr[ww])
              .map((ww) => ({ foot: kr[ww], sourceFoot: ww }))
          : null,
    }),
  );
  if ((await kk?.('write'), k4 === 'fbx')) {
    if (kw.data) {
      let ww = kV.children.find((wV) => wV.isBone).clone(!0);
      if (kw.holder) {
        let wV = new k7['Group']();
        ((wV.name = kw.holder), wV.add(ww), (ww = wV));
      }
      return H(ww, kl, k5, k3, k7, !1, kV.userData.unitScale, oe(kl), {
        axes: kV.userData.axes,
        rootBone: kw.rootBone,
        names: $e(ww, kw.namespace),
      });
    }
    let wk = k8 ? kV : se(kV.clone(!0));
    return H(wk, kl, k5, k3, k7, !1, 1, oe(kl), {
      names: $e(kV, kw.namespace),
      unwrap: !!kw.unwrap,
    });
  }
  let kQ = Z(km(kV));
  (k8 || se(kQ),
    kQ.traverse((wD) => {
      wD.isSkinnedMesh && wD.skeleton.pose();
    }),
    kQ.updateMatrixWorld(!0),
    kt(kQ, 1 / (kw.units || 1), kl, k7),
    Me(kQ, k7),
    kQ.updateMatrixWorld(!0));
  let { worst: kc, bones: kj } = ce(kQ, k7);
  if (kj && kc > 0.0001)
    throw new Error(
      'GLB bind check failed (' +
        kc.toExponential(2) +
        ' across ' +
        kj +
        ' bones) \u2014 the mesh would arrive offset from its skeleton. Export cancelled.',
    );
  let kz = !1;
  kQ.traverse((wD) => {
    wD.isSkinnedMesh && (kz = !0);
  });
  let kp = !k8 || !kz ? ue(kQ, k7) : null,
    kO = new A(),
    kf = $e(kV, kw.namespace);
  (kf &&
    kO.register(() => ({
      writeNode(wD, wm) {
        wD.isBone && kf[wD.name] && (wm.name = kf[wD.name]);
      },
    })),
    fe(kQ));
  let kJ = await kO.parseAsync(kQ, {
    binary: !0,
    animations: kl,
    onlyVisible: !1,
    includeCustomExtensions: !1,
  });
  return (kp && (kJ = Ue(kJ, kp)), new Blob([k3 ? Ie(kJ, k3) : kJ], { type: 'model/gltf-binary' }));
}
async function Tt({
  custom: W,
  clips: q,
  withRig: P,
  format: Y,
  fbxTarget: v,
  provenance: B,
  THREE: G,
}) {
  let I = oe(q),
    h = q.map((k8) => W.bake(k8, I)),
    { clone: N } = await import('../dependencies/skeleton-utils.js'),
    k0 = Z(N(W.exportScene()));
  if ((P || se(k0), k0.updateMatrixWorld(!0), Y === 'fbx'))
    return H(k0, h, v, B, G, !1, 1, I, { pose: !1, names: W.names });
  let k1 = W.scale && Math.abs(W.scale - 1) > 0.000001 ? W.scale : 1;
  k1 !== 1 && (kt(k0, k1, h, G), Me(k0, G), k0.updateMatrixWorld(!0));
  let { worst: k2, bones: k3 } = ce(k0, G);
  if (k3 && k2 > 0.0001)
    throw new Error(
      'GLB bind check failed (' +
        k2.toExponential(2) +
        ' across ' +
        k3 +
        ' bones) \u2014 the mesh would arrive offset from its skeleton. Export cancelled.',
    );
  let k4 = !1;
  k0.traverse((k8) => {
    k8.isSkinnedMesh && (k4 = !0);
  });
  let k5 = !P || !k4 ? ue(k0, G) : null,
    k6 = {
      writeNode(k8, k9) {
        k8.isBone && W.names?.[k8.name] && (k9.name = W.names[k8.name]);
      },
    };
  fe(k0);
  let k7 = await new A()
    .register(() => k6)
    .parseAsync(k0, { binary: !0, animations: h, onlyVisible: !1, includeCustomExtensions: !1 });
  return (k5 && (k7 = Ue(k7, k5)), new Blob([B ? Ie(k7, B) : k7], { type: 'model/gltf-binary' }));
}
function Xt(y, W) {
  y.updateMatrixWorld(!0);
  let q = [];
  y.traverse((P) => {
    !P.isSkinnedMesh ||
      P.bindMode !== 'attached' ||
      P.bindMatrix.elements.every((Y, v) => Math.abs(Y - P.matrixWorld.elements[v]) < 1e-7) ||
      q.push(P);
  });
  for (let P of q)
    ((P.parent ? P.parent.matrixWorld.clone().invert() : new W['Matrix4']())
      .multiply(P.bindMatrix)
      .decompose(P.position, P.quaternion, P.scale),
      P.updateMatrixWorld(!0));
  return q.length;
}
async function H(
  q,
  P,
  Y,
  v,
  G,
  N = !0,
  k0 = 1,
  k1 = Mt,
  { pose: k2 = !0, names: k3 = null, axes: k4 = null, rootBone: k5 = null, unwrap: k6 = !1 } = {},
) {
  let k7 = N ? we[Y] : { scale: 1, rotate: [0, 0, 0], cameraY: 0 };
  if (!k7) throw new Error('Unknown FBX target "' + Y + '"');
  if (!G) throw new Error('FBX export needs the THREE namespace');
  let { clone: k8 } = await import('../dependencies/skeleton-utils.js'),
    k9 = Z(k8(q));
  (_e(k9),
    Xt(k9, G),
    k2 &&
      k9.traverse((kC) => {
        kC.isSkinnedMesh && kC.skeleton.pose();
      }),
    k9.updateMatrixWorld(!0),
    rt(k9, k7, G));
  let kk = new o();
  if (
    ((kk.name = k9.name),
    kk.add(k9),
    ke(kk, P),
    k6 && k9.parent === kk && !k9.isBone && (k9.type === 'Group' || k9.type === 'Object3D'))
  ) {
    kk.updateMatrixWorld(!0);
    for (let kC of [...k9.children]) kk.attach(kC);
    kk.remove(k9);
  }
  kk.updateMatrixWorld(!0);
  let kw = [];
  kk.traverse((ks) => {
    ks.isSkinnedMesh && kw.push(ks);
  });
  for (let ks of kw) {
    let kH = ks.skeleton?.bones?.[0];
    for (; kH?.parent?.isBone;) kH = kH.parent;
    let ka = kH?.parent;
    ka && !ka.isScene && ks.parent !== ka && !ka.isBone && ka.attach(ks);
  }
  (E(kk, G),
    kk.traverse((kR) => {
      kR.isMesh && bt(kR);
    }),
    kk.updateMatrixWorld(!0));
  let kV = null;
  {
    let kR = null;
    kk.traverse((kQ) => {
      !kR && kQ.isSkinnedMesh && (kR = kQ);
    });
    let kl = kR?.skeleton?.bones?.[0];
    for (; kl?.parent?.isBone;) kl = kl.parent;
    kl?.parent && !kl.parent.isScene && (kV = kl.parent.matrixWorld.elements.slice());
  }
  let { worst: kD, bones: km } = ce(kk, G);
  if (km && kD > 0.0001)
    throw new Error(
      'FBX bind check failed (' +
        kD.toExponential(2) +
        ' across ' +
        km +
        ' bones) \u2014 the mesh would arrive offset from its skeleton. Export cancelled.',
    );
  let { FBXExporter: kS } = await import('../dependencies/fbx-exporter.js'),
    kr = new kS();
  k3 &&
    kr.register(() =>
      kk.traverse((kQ) => {
        kQ.isBone && k3[kQ.name] && (kQ.name = k3[kQ.name]);
      }),
    );
  let kE = await kr.parseAsync(kk, {
      preset: 'threejs',
      ...(k4 ? { axisUp: k4.up, axisForward: k4.forward } : N ? {} : { axisForward: '-Z' }),
      unitScale: k0,
      fps: k1,
      animations: P,
      includeAnimations: !0,
      embedTextures: !0,
      creator: v?.copyright || 'ActionForge',
    }),
    kF = (await yt(kE)).bytes;
  if (((kF = (await gt(kF)).bytes), kV && (kF = Q(kF, kV).bytes), k5)) {
    let { bytes: kQ, changed: kc } = c(kF, k5);
    if (kc !== 2)
      throw new Error('FBX root check failed: "' + k5 + '" not found as a bone. Export cancelled.');
    kF = kQ;
  }
  if (P?.length) {
    let { bytes: kj, takes: kz } = j(kF);
    if (kz !== P.length)
      throw new Error(
        'FBX takes check failed: ' + kz + ' listed for ' + P.length + ' clip(s). Export cancelled.',
      );
    kF = kj;
  }
  return new Blob([kF], { type: 'application/octet-stream' });
}
function Ie(W, q) {
  let P = new Uint8Array(W),
    Y = new DataView(W);
  if (Y.getUint32(0, !0) !== 1179937895) return W;
  let v = Y.getUint32(12, !0);
  if (Y.getUint32(16, !0) !== 1313821514) return W;
  let B = JSON.parse(new TextDecoder().decode(P.subarray(20, 20 + v))),
    G = P.subarray(20 + v);
  ((B.asset = B.asset || {}),
    q.copyright && (B.asset.copyright = q.copyright),
    (B.asset.extras = { ...(B.asset.extras || {}), ...q.extras }));
  let g = new TextEncoder().encode(JSON.stringify(B)),
    I = (4 - (g.length % 4)) % 4;
  if (I) {
    let k0 = new Uint8Array(g.length + I);
    (k0.set(g), k0.fill(32, g.length), (g = k0));
  }
  let h = 20 + g.length + G.length,
    N = new Uint8Array(h),
    M = new DataView(N.buffer);
  return (
    M.setUint32(0, 1179937895, !0),
    M.setUint32(4, 2, !0),
    M.setUint32(8, h, !0),
    M.setUint32(12, g.length, !0),
    M.setUint32(16, 1313821514, !0),
    N.set(g, 20),
    N.set(G, 20 + g.length),
    N.buffer
  );
}
var vt = 'CC0-1.0';
function jn(
  W,
  q,
  {
    siteName: P = 'ActionForge',
    siteUrl: Y = 'https://actionforge.app',
    adjust: v = null,
    composed: B = !1,
    poses: G = null,
    skeleton: I = 'default',
  } = {},
) {
  let h = W.filter((k8) => q[k8]?.source?.resaleAllowed === !1),
    N = [...new Set(W.map((k8) => q[k8]?.source?.origin).filter(Boolean))],
    k0 = ['Animations from ' + P + ' \u2014 ' + Y],
    k1 = pt(W, q),
    k2 = W.filter((k8) => q[k8]?.community).length,
    k3 = W.filter((k8) => !q[k8]?.community && q[k8]?.source?.author),
    k4 = [...new Set(k3.map((k8) => q[k8].source.author))],
    k5 = k2 + k3.length;
  (k0.push(
    (k5 && k5 === W.length ? 'Rig' : 'Rig and animations') +
      ' created by Quaternius \u2014 https://quaternius.com \u00B7 https://www.patreon.com/quaternius',
  ),
    k4.length &&
      k0.push(
        '' +
          (k5 === W.length ? 'Animation' : 'Also animation') +
          (k3.length === 1 ? '' : 's') +
          ' by ' +
          k4.join(', '),
      ),
    k1.length &&
      k0.push(
        '' +
          (k5 === W.length && !k4.length ? 'Animation' : 'Also animation') +
          (k2 === 1 ? '' : 's') +
          ' by ' +
          k1.join(', ') +
          ' \u2014 shared with the ActionForge community, CC0',
      ),
    N.length && k0.push('Source material: ' + N.join(', ')));
  let k6 = v && !u(v) ? K(v) : '';
  (B && k0.push('Composed from ' + W.length + ' clips: ' + W.join(' + ')),
    k6 && k0.push('Adjusted: ' + k6));
  let k7 = G?.length ? U(G) : '';
  if (
    (k7 && k0.push('Posed: ' + k7),
    h.length &&
      k0.push(
        'NOT FOR RESALE: ' +
          h.join(', ') +
          ' derive from material that may be redistributed but not sold, including in converted or modified form.',
      ),
    h.length ||
      k0.push(
        'Animation dedicated to the public domain under CC0 1.0 \u2014 no attribution required.',
      ),
    I && I !== 'default')
  ) {
    let k8 = de[I]?.label ?? I;
    k0.push(
      'Skeleton: ' +
        k8 +
        ' \u2014 not covered by the above, and subject to ' +
        k8 +
        "'s own terms.",
    );
  }
  return {
    copyright: k0.join(' | '),
    extras: {
      generator: P,
      url: Y,
      author: k2 && k2 === W.length ? k1.join(', ') : ['Quaternius', ...k1].join(', '),
      authorUrl: k1.length ? void 0 : 'https://quaternius.com',
      rigAuthor: k1.length ? 'Quaternius' : void 0,
      communityAuthors: k1.length ? dt(W, q) : void 0,
      clips: W,
      license: h.length ? void 0 : vt,
      skeleton: I !== 'default' ? I : void 0,
      resaleRestricted: h,
      composed: B || void 0,
      adjust: k6 || void 0,
    },
  };
}
function Wn(y, W) {
  S(y, W);
}
function Ln(
  y,
  W,
  { siteName: q = 'ActionForge', siteUrl: P = 'https://actionforge.app', edits: Y = null } = {},
) {
  let v = Y
    ? [
        Y.composed && 'a sequence of ' + W.join(' + '),
        Y.posed && 'posed',
        Y.ik && 'legs or body moved',
        Y.reversed && 'reversed',
        Y.mirrored && 'mirrored',
        Y.lab && 'adjusted in the Animal Lab',
        Y.from && 'its motion taken from the ' + Y.from,
        Y.made && 'its motion made in the Animal Lab from a template (' + Y.made + ')',
      ].filter(Boolean)
    : [];
  return {
    copyright: [
      y + ' from ' + q + ' \u2014 ' + P,
      'Model, rig' +
        (Y?.made ? '' : ' and animations') +
        ' created by Quaternius (Ultimate Animated Animals) \u2014 https://quaternius.com \u00B7 https://www.patreon.com/quaternius',
      ...(v.length ? ['Edited on ' + q + ': ' + v.join(', ')] : []),
      'Dedicated to the public domain under CC0 1.0 \u2014 no attribution required.',
    ].join(' | '),
    extras: {
      generator: q,
      url: P,
      author: 'Quaternius',
      authorUrl: 'https://quaternius.com',
      license: vt,
      animal: y,
      clips: [...W],
      edited: v.length ? v : void 0,
    },
  };
}
async function On({ gltf: y, takes: W, clips: q = null, fbxTarget: P = be, provenance: Y = null }) {
  let v = q?.length
    ? q
    : (W ?? []).map((I) => y.animations.find((h) => h.name === I)).filter(Boolean);
  if (!v.length) throw new Error('No animations selected');
  r(y);
  let B = {},
    G = y.parser?.associations,
    g = y.parser?.json?.nodes ?? [];
  return (
    y.scene.traverse((I) => {
      let h = g[G?.get(I)?.nodes]?.name;
      I.isBone && h && h !== I.name && (B[I.name] = h);
    }),
    xt(y.scene),
    H(y.scene, v, P, Y, n, !0, 1, oe(v), { pose: !1, names: B })
  );
}
export {
  we as a,
  be as b,
  Rt as c,
  St as d,
  Ht as e,
  en as f,
  tn as g,
  nn as h,
  wt as i,
  fe as j,
  Nt as k,
  Cn as l,
  de as m,
  Pt as n,
  qt as o,
  vt as p,
  jn as q,
  Wn as r,
  Ln as s,
  On as t,
};
