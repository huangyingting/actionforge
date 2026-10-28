import { b as V } from '../animation/channels.js';
var C = Object.freeze({
    width: 400,
    height: 480,
    fps: 30,
    seconds: 8,
    yaw: 34.5,
    pitch: 10.5,
    zoom: 1.35,
    lift: 0,
    lens: 35,
    background: '#22262c',
    ambient: 2.2,
    key: 2.4,
    inPlace: !0,
    bitrate: 450000,
    quality: 0.55,
  }),
  y = (m, S, E, t) => {
    let s = Number(m);
    return Number.isFinite(s) ? Math.min(E, Math.max(S, s)) : t;
  };
function G(D) {
  let m = C,
    S = D && typeof D == 'object' ? D : {};
  return {
    width: Math.round(y(S.width, 120, 1024, m.width)),
    height: Math.round(y(S.height, 120, 1024, m.height)),
    fps: Math.round(y(S.fps, 10, 60, m.fps)),
    seconds: y(S.seconds, 1, 20, m.seconds),
    yaw: y(S.yaw, -180, 180, m.yaw),
    pitch: y(S.pitch, -30, 85, m.pitch),
    zoom: y(S.zoom, 0.6, 4, m.zoom),
    lift: y(S.lift, -1, 1, m.lift),
    lens: y(S.lens, 10, 80, m.lens),
    background:
      typeof S.background == 'string' && /^#[0-9a-f]{6}$/i.test(S.background)
        ? S.background
        : m.background,
    ambient: y(S.ambient, 0, 8, m.ambient),
    key: y(S.key, 0, 8, m.key),
    inPlace: typeof S.inPlace == 'boolean' ? S.inPlace : m.inPlace,
    bitrate: Math.round(y(S.bitrate, 100000, 3000000, m.bitrate)),
    quality: y(S.quality, 0, 1, m.quality),
  };
}
function ce({ THREE: t, clone: s, canvas: e = null, root: c = 'root', whole: z = !1 }) {
  let p = e ?? document.createElement('canvas'),
    f = new t['WebGLRendere' + 'r']({ canvas: p, antialias: !0, alpha: !1 });
  f.setPixelRatio(1);
  let Z = new t.Scene(),
    U = new t['AmbientLight'](16777215, C.ambient),
    u = new t['DirectionalL' + 'ight'](16777215, C.key);
  (u.position.set(2, 3, 4), Z.add(U, u));
  let d = new t['PerspectiveC' + 'amera'](C.lens, C.width / C.height, 0.01, 100),
    A = G(null),
    n = null,
    o = null,
    q = null,
    g = null,
    h = null,
    N = 0,
    k0 = '';
  function k1() {
    (q && (q.stopAllAction(), o && q.uncacheRoot(o)),
      o &&
        (Z.remove(o),
        o.traverse((kF) => {
          kF.isSkinnedMesh && kF.skeleton?.dispose();
        })),
      (o = null),
      (q = null),
      (g = null),
      (h = null));
  }
  let k2 = () => (g ? Math.max(0.05, Math.min(g.duration, A.seconds)) : 0);
  function k3() {
    let kF = new t['Box3'](),
      kC = new t['Vector3'](),
      kt = 14,
      ks = k2();
    for (let ka = 0; ka < kt; ka++)
      (q.setTime((ks * ka) / (kt - 1)),
        o.updateMatrixWorld(!0),
        o.traverse((ke) => {
          ke.isBone && kF.expandByPoint(ke.getWorldPosition(kC));
        }));
    if (kF.isEmpty()) return { centre: new t['Vector3'](0, 0.9, 0), radius: 1 };
    let kH = kF.getSize(new t['Vector3']());
    return {
      centre: kF.getCenter(new t.Vector3()),
      radius: (Math.max(kH.y, Math.max(kH.x, kH.z) * 0.6) * 0.5 || 0.5) * 1.14,
    };
  }
  function k4() {
    let kF = k2(),
      kC = new t['Vector3'](),
      kt = new t.Box3(),
      ks = [];
    for (let kH = 0; kH < 10; kH++)
      (q.setTime((kF * kH) / 9),
        o.updateMatrixWorld(!0),
        o.traverse((ka) => {
          let ke = ka.isMesh && ka.geometry?.attributes?.position;
          if (ke) {
            for (
              let kR = 0, kl = Math.max(1, Math.floor(ke.count / 20000));
              kR < ke.count;
              kR += kl
            )
              (ka.isSkinnedMesh ? ka.getVertexPosition(kR, kC) : kC.fromBufferAttribute(ke, kR),
                kC.applyMatrix4(ka.matrixWorld),
                ks.push(kC.x, kC.y, kC.z),
                kt.expandByPoint(kC));
          }
        }));
    return kt.isEmpty()
      ? null
      : { centre: kt.getCenter(new t['Vector3']()), points: Float32Array.from(ks), radius: 1 };
  }
  function k5(kF, kC = !0) {
    let kt = new Set(kF),
      ks = new t['Vector3'](),
      kH = new t['Box3'](),
      ka = [];
    return (
      kC && q.setTime(0),
      o.updateMatrixWorld(!0),
      o.traverse((ke) => {
        !ke.isBone ||
          !kt.has(ke.name) ||
          (ke.getWorldPosition(ks), ka.push(ks.x, ks.y, ks.z), kH.expandByPoint(ks));
      }),
      kH.isEmpty()
        ? null
        : { centre: kH.getCenter(new t['Vector3']()), points: Float32Array.from(ka), radius: 1 }
    );
  }
  function k6(kF, kC) {
    let kt = new t['Vector3'](0, 1, 0).cross(kC).normalize(),
      ks = kC.clone().cross(kt),
      kH = new t['Vector3'](),
      ka = h.points,
      ke = Math.tan((A.lens * Math.PI) / 360),
      kR = A.width / A.height,
      kl = 1 / 0,
      kQ = -1 / 0,
      kc = 1 / 0,
      kj = -1 / 0;
    for (let kp = 0; kp < ka.length; kp += 3) {
      kH.set(ka[kp] - kF.x, ka[kp + 1] - kF.y, ka[kp + 2] - kF.z);
      let kO = kH.dot(kt),
        kf = kH.dot(ks);
      (kO < kl && (kl = kO), kO > kQ && (kQ = kO), kf < kc && (kc = kf), kf > kj && (kj = kf));
    }
    kF.addScaledVector(kt, (kl + kQ) / 2).addScaledVector(ks, (kc + kj) / 2);
    let kz = 0;
    for (let kJ = 0; kJ < ka.length; kJ += 3) {
      kH.set(ka[kJ] - kF.x, ka[kJ + 1] - kF.y, ka[kJ + 2] - kF.z);
      let kZ = kH.dot(kC) + Math.max(Math.abs(kH.dot(ks)), Math.abs(kH.dot(kt)) / kR) / ke;
      kZ > kz && (kz = kZ);
    }
    return kz * ke * 1.03;
  }
  function k7() {
    if (
      (f.setSize(A.width, A.height, !1),
      (Z.background = new t.Color(A.background)),
      (U.intensity = A.ambient),
      (u.intensity = A.key),
      (d.fov = A.lens),
      (d.aspect = A.width / A.height),
      h)
    ) {
      let kF = (A.yaw * Math.PI) / 180,
        kC = (A.pitch * Math.PI) / 180,
        kt = h.centre.clone();
      h.points &&
        (h.radius = k6(
          kt,
          new t['Vector3'](Math.sin(kF) * Math.cos(kC), Math.sin(kC), Math.cos(kF) * Math.cos(kC)),
        ));
      let ks = (h.radius / Math.tan((A.lens * Math.PI) / 360)) * A.zoom;
      ((kt.y += A.lift * h.radius * 2),
        d.position.set(
          kt.x + ks * Math.sin(kF) * Math.cos(kC),
          kt.y + ks * Math.sin(kC),
          kt.z + ks * Math.cos(kF) * Math.cos(kC),
        ),
        d.lookAt(kt),
        (d.near = Math.max(0.01, ks - h.radius * 6)),
        (d.far = ks + h.radius * 12));
    }
    d.updateProjectionMatrix();
  }
  function k8(kF, kC, kt = A, { focus: ks = null, rest: kH = !1 } = {}) {
    ((A = G(kt)), (n = { rig: kF, clip: kC, focus: ks, rest: kH }), k1(), (o = s(kF)), Z.add(o));
    let ka = ks?.length && kH ? k5(ks, !1) : null;
    ((q = new t.AnimationMixer(o)),
      (g = A.inPlace ? V(kC, { rootName: c }) : kC),
      q.clipAction(g).play(),
      (h = ka || (ks?.length && k5(ks)) || (z && k4()) || k3()),
      k7(),
      kk(0));
  }
  function k9(kF) {
    let kC = A;
    if (((A = G(kF)), n && (kC.inPlace !== A.inPlace || kC.seconds !== A.seconds))) {
      k8(n.rig, n.clip, A, { focus: n.focus, rest: n.rest });
      return;
    }
    k7();
  }
  function kk(kF) {
    q && (q.setTime(Math.max(0, kF)), f.render(Z, d));
  }
  function kw() {
    kV();
    let kF = performance.now(),
      kC = () => {
        let kt = k2();
        (kt && kk(((performance.now() - kF) / 1000) % kt), (N = requestAnimationFrame(kC)));
      };
    N = requestAnimationFrame(kC);
  }
  function kV() {
    (cancelAnimationFrame(N), (N = 0));
  }
  async function kD() {
    if (!g || typeof VideoEncoder > 'u' || typeof VideoFrame > 'u') return null;
    let { width: kF, height: kC, fps: kt } = A,
      ks = Math.max(1, Math.round(k2() * kt)),
      kH = { codec: 'vp09.00.40.08', width: kF, height: kC, framerate: kt, latencyMode: 'quality' },
      ka = async (kU) => !!(await VideoEncoder.isConfigSupported(kU).catch(() => null))?.supported,
      ke = { ...kH, bitrateMode: 'quantizer' },
      kR = !0;
    if (
      !(await ka(ke)) &&
      ((ke = { ...kH, bitrateMode: 'variable', bitrate: A.bitrate }), (kR = !1), !(await ka(ke)))
    )
      return null;
    let { Muxer: kl, ArrayBufferTarget: kQ } = await import('../dependencies/video-muxer.js'),
      kc = new kQ(),
      kj = new kl({ target: kc, video: { codec: 'V_VP9', width: kF, height: kC, frameRate: kt } }),
      kz = !1,
      kp = null,
      kO = new VideoEncoder({
        output: (kU, ku) => {
          try {
            kj.addVideoChunk(kU, ku);
          } catch {
            kz = !0;
          }
        },
        error: () => {
          ((kz = !0), kp?.());
        },
      }),
      kf = 'ondequeue' in kO;
    kf && kO.addEventListener('dequeue', () => kp?.());
    let kJ = () =>
        new Promise((kU) => {
          kf ? (kp = kU) : setTimeout(kU, 2);
        }),
      kZ = !!N;
    kV();
    try {
      kO.configure(ke);
      let kU = Math.round(52 - A.quality * 32),
        ku = 1000000 / kt;
      for (let kd = 0; kd < ks && !kz; kd++) {
        kk(kd / kt);
        let kK = new VideoFrame(p, { timestamp: Math.round(kd * ku), duration: Math.round(ku) });
        for (
          kO.encode(kK, { keyFrame: kd === 0, ...(kR ? { vp9: { quantizer: kU } } : {}) }),
            kK.close();
          kO.encodeQueueSize > 4 && !kz;
        )
          await kJ();
      }
      return (
        await kO.flush(),
        kz ? null : (kj.finalize(), new Blob([kc.buffer], { type: 'video/webm' }))
      );
    } finally {
      try {
        kO.close();
      } catch {}
      kZ && kw();
    }
  }
  async function km() {
    let kF = await kD().catch(() => null);
    if (kF) return ((k0 = 'frame by frame'), kF);
    let kC = await kS();
    return ((k0 = kC ? 'filmed' : ''), kC);
  }
  function kS() {
    if (!g || typeof MediaRecorder > 'u' || typeof p.captureStream != 'function')
      return Promise.resolve(null);
    let kF = ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm'].find((ks) =>
      MediaRecorder.isTypeSupported(ks),
    );
    if (!kF) return Promise.resolve(null);
    let kC = !!N,
      kt = k2();
    return (
      kV(),
      new Promise((ks) => {
        let kH = 0,
          ka = !1,
          ke = null,
          kR = null,
          kl = [],
          kQ = (kp) => {
            if (!ka) {
              ((ka = !0), cancelAnimationFrame(kH), clearTimeout(kc));
              for (let kO of ke?.getTracks() ?? []) kO.stop();
              (kC && kw(), ks(kp));
            }
          },
          kc = setTimeout(
            () => {
              try {
                kR?.stop();
              } catch {}
              kQ(null);
            },
            kt * 3000 + 6000,
          );
        try {
          ((ke = p.captureStream(A.fps)),
            (kR = new MediaRecorder(ke, { mimeType: kF, videoBitsPerSecond: A.bitrate })));
        } catch {
          kQ(null);
          return;
        }
        ((kR.ondataavailable = (kp) => {
          kp.data?.size && kl.push(kp.data);
        }),
          (kR.onerror = () => kQ(null)),
          (kR.onstop = () => kQ(kl.length ? new Blob(kl, { type: 'video/webm' }) : null)),
          kk(0),
          kR.start());
        let kj = performance.now(),
          kz = () => {
            let kp = (performance.now() - kj) / 1000;
            if (kp >= kt) {
              try {
                kR.stop();
              } catch {
                kQ(null);
              }
              return;
            }
            (kk(kp), (kH = requestAnimationFrame(kz)));
          };
        kH = requestAnimationFrame(kz);
      })
    );
  }
  async function kr(kF = 0.35) {
    if (!g) return null;
    let kC = !!N;
    kV();
    try {
      kk(k2() * Math.max(0, Math.min(1, kF)));
      let kt = p.toDataURL('image/webp', 0.85);
      return await (await fetch(kt)).blob();
    } catch {
      return null;
    } finally {
      kC && kw();
    }
  }
  function kE() {
    (kV(), k1(), f.dispose(), f.forceContextLoss?.());
  }
  return {
    canvas: p,
    show: k8,
    setLook: k9,
    draw: kk,
    run: kw,
    stop: kV,
    record: km,
    picture: kr,
    dispose: kE,
    get look() {
      return A;
    },
    get length() {
      return k2();
    },
    get made() {
      return k0;
    },
  };
}
async function ue({ THREE: m, clone: S, rig: E, clip: t, look: s, root: H = 'root' }) {
  let e = null;
  try {
    return ((e = ce({ THREE: m, clone: S, root: H })), e.show(E, t, s), await e.record());
  } catch {
    return null;
  } finally {
    e?.dispose();
  }
}
var fe = (D) =>
  new Promise((m) => {
    let S = new FileReader();
    ((S.onload = () => m(typeof S.result == 'string' ? S.result : null)),
      (S.onerror = () => m(null)),
      S.readAsDataURL(D));
  });
export { C as a, G as b, ce as c, ue as d, fe as e };
