import { c, d as S, e as r, f as E } from '../animation/poses.js';
import '../animation/math.js';
import '../interop/exports.js';
var b = 'pose-look.json',
  H = 'icons',
  u = Object.freeze([
    'hand_' + S,
    ...c.map((F) => F + '_' + S),
    ...['thumb', 'index', 'middle', 'ring', 'pinky'].map((F) => F + '_04_leaf_' + S),
  ]),
  d = Object.freeze({ yaw: -35, pitch: 25, zoom: 1.6 }),
  _ = Object.freeze([
    ['yaw', 'Round the hand', -180, 180, 1],
    ['pitch', 'From above', -30, 85, 1],
    ['zoom', 'How far', 0.8, 4, 0.02],
  ]),
  O = (F, C, s, R) => {
    let Q = Number(F);
    return Number.isFinite(Q) ? Math.min(s, Math.max(C, Q)) : R;
  },
  l = (F) => Object.fromEntries(_.map(([C, , s, R]) => [C, O(F?.[C], s, R, d[C])])),
  w = (F, C) => ({ ...F, ...C, lift: 0 });
function x(F, C, R, Q, j) {
  let z = E(Q ? r(Q) : {}, S),
    f = new C['AnimationCli' + 'p'](
      'hand',
      0,
      Object.entries(z).map(
        ([J, Z]) => new C['QuaternionKe' + 'yframeTrack'](J + '.quaternion', [0], Z),
      ),
    );
  F.show(R, f, j, { focus: u, rest: !0 });
}
async function D({ stage: F, THREE: C, rig: R, kind: Q, clip: j, bodyLook: z, handView: f }) {
  return j ? (Q === 'hand' ? x(F, C, R, j, w(z, f)) : F.show(R, j, z), F.picture(0)) : null;
}
export {
  u as HAND_BONES,
  d as HAND_FIRST,
  _ as HAND_VIEW_ROWS,
  H as PICTURES_DIR,
  b as POSE_LOOK_FILE,
  w as handLookOf,
  D as posePicture,
  l as readHandView,
  x as showHand,
};
