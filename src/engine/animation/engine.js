import {
  A as V,
  B as D,
  C as m,
  D as S,
  E as r,
  F as E,
  H as F,
  J as C,
  o as s,
  p as H,
  s as a,
} from '../rigging/retargeting.js';
import { E as R, F as l, b as Q, c as j, e as z, i as p, j as O, t as f, u as Z } from './math.js';
import { b as U, e as u, g as d, h as K, j as T, k as A, l as X } from '../storage/library.js';
import { a as L, b, d as x } from '../storage/database.js';
import {
  Ad as y,
  Id as W,
  Kd as q,
  Mc as P,
  Me as Y,
  Nc as v,
  Oc as B,
  Ve as G,
  Ye as g,
  _e as I,
  ad as h,
  b as N,
  bd as i,
  c as M,
  ed as k0,
  fd as k1,
  gd as k2,
  id as k3,
  ke as k4,
  le as k5,
  md as k6,
  n as k7,
  pg as k8,
  qg as k9,
  xd as kk,
  yd as kw,
  zd as kV,
} from '../dependencies/three-compat.js';
var fo = { type: 'change' },
  an = { type: 'start' },
  mo = { type: 'end' },
  jt = new k0(),
  wo = new W(),
  Fi = Math.cos(70 * v.DEG2RAD),
  go = class extends P {
    constructor(kD, km) {
      (super(),
        (this.object = kD),
        (this.domElement = km),
        (this.domElement.style.touchAction = 'none'),
        (this.enabled = !0),
        (this.target = new i()),
        (this.cursor = new i()),
        (this.minDistance = 0),
        (this.maxDistance = 1 / 0),
        (this.minZoom = 0),
        (this.maxZoom = 1 / 0),
        (this.minTargetRadius = 0),
        (this.maxTargetRadius = 1 / 0),
        (this.minPolarAngle = 0),
        (this.maxPolarAngle = Math.PI),
        (this.minAzimuthAngle = -1 / 0),
        (this.maxAzimuthAngle = 1 / 0),
        (this.enableDamping = !1),
        (this.dampingFactor = 0.05),
        (this.enableZoom = !0),
        (this.zoomSpeed = 1),
        (this.enableRotate = !0),
        (this.rotateSpeed = 1),
        (this.enablePan = !0),
        (this.panSpeed = 1),
        (this.screenSpacePanning = !0),
        (this.keyPanSpeed = 7),
        (this.zoomToCursor = !1),
        (this.autoRotate = !1),
        (this.autoRotateSpeed = 2),
        (this.keys = {
          LEFT: 'ArrowLeft',
          UP: 'ArrowUp',
          RIGHT: 'ArrowRight',
          BOTTOM: 'ArrowDown',
        }),
        (this.mouseButtons = { LEFT: N.ROTATE, MIDDLE: N.DOLLY, RIGHT: N.PAN }),
        (this.touches = { ONE: M.ROTATE, TWO: M.DOLLY_PAN }),
        (this.target0 = this.target.clone()),
        (this.position0 = this.object.position.clone()),
        (this.zoom0 = this.object.zoom),
        (this._domElementKeyEvents = null),
        (this.getPolarAngle = function () {
          return ks.phi;
        }),
        (this.getAzimuthalAngle = function () {
          return ks.theta;
        }),
        (this.getDistance = function () {
          return this.object.position.distanceTo(this.target);
        }),
        (this.listenToKeyEvents = function (wf) {
          (wf.addEventListener('keydown', wH), (this._domElementKeyEvents = wf));
        }),
        (this.stopListenToKeyEvents = function () {
          (this._domElementKeyEvents.removeEventListener('keydown', wH),
            (this._domElementKeyEvents = null));
        }),
        (this.saveState = function () {
          (kS.target0.copy(kS.target),
            kS.position0.copy(kS.object.position),
            (kS.zoom0 = kS.object.zoom));
        }),
        (this.reset = function () {
          (kS.target.copy(kS.target0),
            kS.object.position.copy(kS.position0),
            (kS.object.zoom = kS.zoom0),
            kS.object.updateProjectionMatrix(),
            kS.dispatchEvent(fo),
            kS.update(),
            (kF = kE.NONE));
        }),
        (this.update = (function () {
          let wf = new i(),
            wJ = new h().setFromUnitVectors(kD.up, new i(0, 1, 0)),
            wZ = wJ.clone().invert(),
            wU = new i(),
            wu = new h(),
            wd = new i(),
            wK = 2 * Math.PI;
          return function (wT = null) {
            let wA = kS.object.position;
            (wf.copy(wA).sub(kS.target),
              wf.applyQuaternion(wJ),
              ks.setFromVector3(wf),
              kS.autoRotate && kF === kE.NONE && kL(kA(wT)),
              kS.enableDamping
                ? ((ks.theta += kH.theta * kS.dampingFactor), (ks.phi += kH.phi * kS.dampingFactor))
                : ((ks.theta += kH.theta), (ks.phi += kH.phi)));
            let wX = kS.minAzimuthAngle,
              wL = kS.maxAzimuthAngle;
            (isFinite(wX) &&
              isFinite(wL) &&
              (wX < -Math.PI ? (wX += wK) : wX > Math.PI && (wX -= wK),
              wL < -Math.PI ? (wL += wK) : wL > Math.PI && (wL -= wK),
              wX <= wL
                ? (ks.theta = Math.max(wX, Math.min(wL, ks.theta)))
                : (ks.theta =
                    ks.theta > (wX + wL) / 2 ? Math.max(wX, ks.theta) : Math.min(wL, ks.theta))),
              (ks.phi = Math.max(kS.minPolarAngle, Math.min(kS.maxPolarAngle, ks.phi))),
              ks.makeSafe(),
              kS.enableDamping === !0
                ? kS.target.addScaledVector(kR, kS.dampingFactor)
                : kS.target.add(kR),
              kS.target.sub(kS.cursor),
              kS.target.clampLength(kS.minTargetRadius, kS.maxTargetRadius),
              kS.target.add(kS.cursor));
            let wb = !1;
            if ((kS.zoomToCursor && ku) || kS.object.isOrthographicCamera)
              ks.radius = kv(ks.radius);
            else {
              let wx = ks.radius;
              ((ks.radius = kv(ks.radius * ka)), (wb = wx != ks.radius));
            }
            if (
              (wf.setFromSpherical(ks),
              wf.applyQuaternion(wZ),
              wA.copy(kS.target).add(wf),
              kS.object.lookAt(kS.target),
              kS.enableDamping === !0
                ? ((kH.theta *= 1 - kS.dampingFactor),
                  (kH.phi *= 1 - kS.dampingFactor),
                  kR.multiplyScalar(1 - kS.dampingFactor))
                : (kH.set(0, 0, 0), kR.set(0, 0, 0)),
              kS.zoomToCursor && ku)
            ) {
              let wy = null;
              if (kS.object.isPerspectiveCamera) {
                let wW = wf.length();
                wy = kv(wW * ka);
                let wq = wW - wy;
                (kS.object.position.addScaledVector(kZ, wq),
                  kS.object.updateMatrixWorld(),
                  (wb = !!wq));
              } else {
                if (kS.object.isOrthographicCamera) {
                  let wP = new i(kU.x, kU.y, 0);
                  wP.unproject(kS.object);
                  let wY = kS.object.zoom;
                  ((kS.object.zoom = Math.max(
                    kS.minZoom,
                    Math.min(kS.maxZoom, kS.object.zoom / ka),
                  )),
                    kS.object.updateProjectionMatrix(),
                    (wb = wY !== kS.object.zoom));
                  let wv = new i(kU.x, kU.y, 0);
                  (wv.unproject(kS.object),
                    kS.object.position.sub(wv).add(wP),
                    kS.object.updateMatrixWorld(),
                    (wy = wf.length()));
                } else
                  (console.warn(
                    'WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.',
                  ),
                    (kS.zoomToCursor = !1));
              }
              wy !== null &&
                (this.screenSpacePanning
                  ? kS.target
                      .set(0, 0, -1)
                      .transformDirection(kS.object.matrix)
                      .multiplyScalar(wy)
                      .add(kS.object.position)
                  : (jt.origin.copy(kS.object.position),
                    jt.direction.set(0, 0, -1).transformDirection(kS.object.matrix),
                    Math.abs(kS.object.up.dot(jt.direction)) < Fi
                      ? kD.lookAt(kS.target)
                      : (wo.setFromNormalAndCoplanarPoint(kS.object.up, kS.target),
                        jt.intersectPlane(wo, kS.target))));
            } else {
              if (kS.object.isOrthographicCamera) {
                let wB = kS.object.zoom;
                ((kS.object.zoom = Math.max(kS.minZoom, Math.min(kS.maxZoom, kS.object.zoom / ka))),
                  wB !== kS.object.zoom && (kS.object.updateProjectionMatrix(), (wb = !0)));
              }
            }
            return (
              (ka = 1),
              (ku = !1),
              wb ||
              wU.distanceToSquared(kS.object.position) > kC ||
              8 * (1 - wu.dot(kS.object.quaternion)) > kC ||
              wd.distanceToSquared(kS.target) > kC
                ? (kS.dispatchEvent(fo),
                  wU.copy(kS.object.position),
                  wu.copy(kS.object.quaternion),
                  wd.copy(kS.target),
                  !0)
                : !1
            );
          };
        })()),
        (this.dispose = function () {
          (kS.domElement.removeEventListener('contextmenu', wQ),
            kS.domElement.removeEventListener('pointerdown', ww),
            kS.domElement.removeEventListener('pointercancel', wD),
            kS.domElement.removeEventListener('wheel', wE),
            kS.domElement.removeEventListener('pointermove', wV),
            kS.domElement.removeEventListener('pointerup', wD),
            kS.domElement.getRootNode().removeEventListener('keydown', wC, { capture: !0 }),
            kS._domElementKeyEvents !== null &&
              (kS._domElementKeyEvents.removeEventListener('keydown', wH),
              (kS._domElementKeyEvents = null)));
        }));
      let kS = this,
        kE = {
          NONE: -1,
          ROTATE: 0,
          DOLLY: 1,
          PAN: 2,
          TOUCH_ROTATE: 3,
          TOUCH_PAN: 4,
          TOUCH_DOLLY_PAN: 5,
          TOUCH_DOLLY_ROTATE: 6,
        },
        kF = kE.NONE,
        kC = 0.000001,
        ks = new k9(),
        kH = new k9(),
        ka = 1,
        kR = new i(),
        kl = new B(),
        kQ = new B(),
        kc = new B(),
        kj = new B(),
        kz = new B(),
        kp = new B(),
        kO = new B(),
        kf = new B(),
        kJ = new B(),
        kZ = new i(),
        kU = new B(),
        ku = !1,
        kd = [],
        kK = {},
        kT = !1;
      function kA(wf) {
        return wf !== null
          ? ((2 * Math.PI) / 60) * kS.autoRotateSpeed * wf
          : ((2 * Math.PI) / 60 / 60) * kS.autoRotateSpeed;
      }
      function kX(wf) {
        let wJ = Math.abs(wf * 0.01);
        return Math.pow(0.95, kS.zoomSpeed * wJ);
      }
      function kL(wf) {
        kH.theta -= wf;
      }
      function kb(wf) {
        kH.phi -= wf;
      }
      let kx = (function () {
          let wf = new i();
          return function (wJ, wZ) {
            (wf.setFromMatrixColumn(wZ, 0), wf.multiplyScalar(-wJ), kR.add(wf));
          };
        })(),
        ky = (function () {
          let wf = new i();
          return function (wJ, wZ) {
            (kS.screenSpacePanning === !0
              ? wf.setFromMatrixColumn(wZ, 1)
              : (wf.setFromMatrixColumn(wZ, 0), wf.crossVectors(kS.object.up, wf)),
              wf.multiplyScalar(wJ),
              kR.add(wf));
          };
        })(),
        kW = (function () {
          let wf = new i();
          return function (wJ, wZ) {
            let wU = kS.domElement;
            if (kS.object.isPerspectiveCamera) {
              let wu = kS.object.position;
              wf.copy(wu).sub(kS.target);
              let wd = wf.length();
              ((wd *= Math.tan(((kS.object.fov / 2) * Math.PI) / 180)),
                kx((2 * wJ * wd) / wU.clientHeight, kS.object.matrix),
                ky((2 * wZ * wd) / wU.clientHeight, kS.object.matrix));
            } else
              kS.object.isOrthographicCamera
                ? (kx(
                    (wJ * (kS.object.right - kS.object.left)) / kS.object.zoom / wU.clientWidth,
                    kS.object.matrix,
                  ),
                  ky(
                    (wZ * (kS.object.top - kS.object.bottom)) / kS.object.zoom / wU.clientHeight,
                    kS.object.matrix,
                  ))
                : (console.warn(
                    'WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.',
                  ),
                  (kS.enablePan = !1));
          };
        })();
      function kq(wf) {
        kS.object.isPerspectiveCamera || kS.object.isOrthographicCamera
          ? (ka /= wf)
          : (console.warn(
              'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.',
            ),
            (kS.enableZoom = !1));
      }
      function kP(wf) {
        kS.object.isPerspectiveCamera || kS.object.isOrthographicCamera
          ? (ka *= wf)
          : (console.warn(
              'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.',
            ),
            (kS.enableZoom = !1));
      }
      function kY(wf, wJ) {
        if (!kS.zoomToCursor) return;
        ku = !0;
        let wZ = kS.domElement.getBoundingClientRect(),
          wU = wf - wZ.left,
          wu = wJ - wZ.top,
          wd = wZ.width,
          wK = wZ.height;
        ((kU.x = (wU / wd) * 2 - 1),
          (kU.y = -(wu / wK) * 2 + 1),
          kZ.set(kU.x, kU.y, 1).unproject(kS.object).sub(kS.object.position).normalize());
      }
      function kv(wf) {
        return Math.max(kS.minDistance, Math.min(kS.maxDistance, wf));
      }
      function kB(wf) {
        kl.set(wf.clientX, wf.clientY);
      }
      function kG(wf) {
        (kY(wf.clientX, wf.clientX), kO.set(wf.clientX, wf.clientY));
      }
      function kg(wf) {
        kj.set(wf.clientX, wf.clientY);
      }
      function kI(wf) {
        (kQ.set(wf.clientX, wf.clientY), kc.subVectors(kQ, kl).multiplyScalar(kS.rotateSpeed));
        let wJ = kS.domElement;
        (kL((2 * Math.PI * kc.x) / wJ.clientHeight),
          kb((2 * Math.PI * kc.y) / wJ.clientHeight),
          kl.copy(kQ),
          kS.update());
      }
      function kh(wf) {
        (kf.set(wf.clientX, wf.clientY),
          kJ.subVectors(kf, kO),
          kJ.y > 0 ? kq(kX(kJ.y)) : kJ.y < 0 && kP(kX(kJ.y)),
          kO.copy(kf),
          kS.update());
      }
      function kN(wf) {
        (kz.set(wf.clientX, wf.clientY),
          kp.subVectors(kz, kj).multiplyScalar(kS.panSpeed),
          kW(kp.x, kp.y),
          kj.copy(kz),
          kS.update());
      }
      function kM(wf) {
        (kY(wf.clientX, wf.clientY),
          wf.deltaY < 0 ? kP(kX(wf.deltaY)) : wf.deltaY > 0 && kq(kX(wf.deltaY)),
          kS.update());
      }
      function w0(wf) {
        let wJ = !1;
        switch (wf.code) {
          case kS.keys.UP:
            (wf.ctrlKey || wf.metaKey || wf.shiftKey
              ? kb((2 * Math.PI * kS.rotateSpeed) / kS.domElement.clientHeight)
              : kW(0, kS.keyPanSpeed),
              (wJ = !0));
            break;
          case kS.keys.BOTTOM:
            (wf.ctrlKey || wf.metaKey || wf.shiftKey
              ? kb((-2 * Math.PI * kS.rotateSpeed) / kS.domElement.clientHeight)
              : kW(0, -kS.keyPanSpeed),
              (wJ = !0));
            break;
          case kS.keys.LEFT:
            (wf.ctrlKey || wf.metaKey || wf.shiftKey
              ? kL((2 * Math.PI * kS.rotateSpeed) / kS.domElement.clientHeight)
              : kW(kS.keyPanSpeed, 0),
              (wJ = !0));
            break;
          case kS.keys.RIGHT:
            (wf.ctrlKey || wf.metaKey || wf.shiftKey
              ? kL((-2 * Math.PI * kS.rotateSpeed) / kS.domElement.clientHeight)
              : kW(-kS.keyPanSpeed, 0),
              (wJ = !0));
            break;
        }
        wJ && (wf.preventDefault(), kS.update());
      }
      function w1(wf) {
        if (kd.length === 1) kl.set(wf.pageX, wf.pageY);
        else {
          let wJ = wO(wf),
            wZ = 0.5 * (wf.pageX + wJ.x),
            wU = 0.5 * (wf.pageY + wJ.y);
          kl.set(wZ, wU);
        }
      }
      function w2(wf) {
        if (kd.length === 1) kj.set(wf.pageX, wf.pageY);
        else {
          let wJ = wO(wf),
            wZ = 0.5 * (wf.pageX + wJ.x),
            wU = 0.5 * (wf.pageY + wJ.y);
          kj.set(wZ, wU);
        }
      }
      function w3(wf) {
        let wJ = wO(wf),
          wZ = wf.pageX - wJ.x,
          wU = wf.pageY - wJ.y,
          wu = Math.sqrt(wZ * wZ + wU * wU);
        kO.set(0, wu);
      }
      function w4(wf) {
        (kS.enableZoom && w3(wf), kS.enablePan && w2(wf));
      }
      function w5(wf) {
        (kS.enableZoom && w3(wf), kS.enableRotate && w1(wf));
      }
      function w6(wf) {
        if (kd.length == 1) kQ.set(wf.pageX, wf.pageY);
        else {
          let wZ = wO(wf),
            wU = 0.5 * (wf.pageX + wZ.x),
            wu = 0.5 * (wf.pageY + wZ.y);
          kQ.set(wU, wu);
        }
        kc.subVectors(kQ, kl).multiplyScalar(kS.rotateSpeed);
        let wJ = kS.domElement;
        (kL((2 * Math.PI * kc.x) / wJ.clientHeight),
          kb((2 * Math.PI * kc.y) / wJ.clientHeight),
          kl.copy(kQ));
      }
      function w7(wf) {
        if (kd.length === 1) kz.set(wf.pageX, wf.pageY);
        else {
          let wJ = wO(wf),
            wZ = 0.5 * (wf.pageX + wJ.x),
            wU = 0.5 * (wf.pageY + wJ.y);
          kz.set(wZ, wU);
        }
        (kp.subVectors(kz, kj).multiplyScalar(kS.panSpeed), kW(kp.x, kp.y), kj.copy(kz));
      }
      function w8(wf) {
        let wJ = wO(wf),
          wZ = wf.pageX - wJ.x,
          wU = wf.pageY - wJ.y,
          wu = Math.sqrt(wZ * wZ + wU * wU);
        (kf.set(0, wu), kJ.set(0, Math.pow(kf.y / kO.y, kS.zoomSpeed)), kq(kJ.y), kO.copy(kf));
        let wd = (wf.pageX + wJ.x) * 0.5,
          wK = (wf.pageY + wJ.y) * 0.5;
        kY(wd, wK);
      }
      function w9(wf) {
        (kS.enableZoom && w8(wf), kS.enablePan && w7(wf));
      }
      function wk(wf) {
        (kS.enableZoom && w8(wf), kS.enableRotate && w6(wf));
      }
      function ww(wf) {
        kS.enabled !== !1 &&
          (kd.length === 0 &&
            (kS.domElement.setPointerCapture(wf.pointerId),
            kS.domElement.addEventListener('pointermove', wV),
            kS.domElement.addEventListener('pointerup', wD)),
          !wz(wf) && (wc(wf), wf.pointerType === 'touch' ? wR(wf) : wm(wf)));
      }
      function wV(wf) {
        kS.enabled !== !1 && (wf.pointerType === 'touch' ? wl(wf) : wS(wf));
      }
      function wD(wf) {
        switch ((wj(wf), kd.length)) {
          case 0:
            (kS.domElement.releasePointerCapture(wf.pointerId),
              kS.domElement.removeEventListener('pointermove', wV),
              kS.domElement.removeEventListener('pointerup', wD),
              kS.dispatchEvent(mo),
              (kF = kE.NONE));
            break;
          case 1:
            let wJ = kd[0],
              wZ = kK[wJ];
            wR({ pointerId: wJ, pageX: wZ.x, pageY: wZ.y });
            break;
        }
      }
      function wm(wf) {
        let wJ;
        switch (wf.button) {
          case 0:
            wJ = kS.mouseButtons.LEFT;
            break;
          case 1:
            wJ = kS.mouseButtons.MIDDLE;
            break;
          case 2:
            wJ = kS.mouseButtons.RIGHT;
            break;
          default:
            wJ = -1;
        }
        switch (wJ) {
          case N.DOLLY:
            if (kS.enableZoom === !1) return;
            (kG(wf), (kF = kE.DOLLY));
            break;
          case N.ROTATE:
            if (wf.ctrlKey || wf.metaKey || wf.shiftKey) {
              if (kS.enablePan === !1) return;
              (kg(wf), (kF = kE.PAN));
            } else {
              if (kS.enableRotate === !1) return;
              (kB(wf), (kF = kE.ROTATE));
            }
            break;
          case N.PAN:
            if (wf.ctrlKey || wf.metaKey || wf.shiftKey) {
              if (kS.enableRotate === !1) return;
              (kB(wf), (kF = kE.ROTATE));
            } else {
              if (kS.enablePan === !1) return;
              (kg(wf), (kF = kE.PAN));
            }
            break;
          default:
            kF = kE.NONE;
        }
        kF !== kE.NONE && kS.dispatchEvent(an);
      }
      function wS(wf) {
        switch (kF) {
          case kE.ROTATE:
            if (kS.enableRotate === !1) return;
            kI(wf);
            break;
          case kE.DOLLY:
            if (kS.enableZoom === !1) return;
            kh(wf);
            break;
          case kE.PAN:
            if (kS.enablePan === !1) return;
            kN(wf);
            break;
        }
      }
      function wE(wf) {
        kS.enabled === !1 ||
          kS.enableZoom === !1 ||
          kF !== kE.NONE ||
          (wf.preventDefault(), kS.dispatchEvent(an), kM(wF(wf)), kS.dispatchEvent(mo));
      }
      function wF(wf) {
        let wJ = wf.deltaMode,
          wZ = { clientX: wf.clientX, clientY: wf.clientY, deltaY: wf.deltaY };
        switch (wJ) {
          case 1:
            wZ.deltaY *= 16;
            break;
          case 2:
            wZ.deltaY *= 100;
            break;
        }
        return (wf.ctrlKey && !kT && (wZ.deltaY *= 10), wZ);
      }
      function wC(wf) {
        wf.key === 'Control' &&
          ((kT = !0),
          kS.domElement.getRootNode().addEventListener('keyup', ws, { passive: !0, capture: !0 }));
      }
      function ws(wf) {
        wf.key === 'Control' &&
          ((kT = !1),
          kS.domElement
            .getRootNode()
            .removeEventListener('keyup', ws, { passive: !0, capture: !0 }));
      }
      function wH(wf) {
        kS.enabled === !1 || kS.enablePan === !1 || w0(wf);
      }
      function wR(wf) {
        switch ((wp(wf), kd.length)) {
          case 1:
            switch (kS.touches.ONE) {
              case M.ROTATE:
                if (kS.enableRotate === !1) return;
                (w1(wf), (kF = kE.TOUCH_ROTATE));
                break;
              case M.PAN:
                if (kS.enablePan === !1) return;
                (w2(wf), (kF = kE.TOUCH_PAN));
                break;
              default:
                kF = kE.NONE;
            }
            break;
          case 2:
            switch (kS.touches.TWO) {
              case M.DOLLY_PAN:
                if (kS.enableZoom === !1 && kS.enablePan === !1) return;
                (w4(wf), (kF = kE.TOUCH_DOLLY_PAN));
                break;
              case M.DOLLY_ROTATE:
                if (kS.enableZoom === !1 && kS.enableRotate === !1) return;
                (w5(wf), (kF = kE.TOUCH_DOLLY_ROTATE));
                break;
              default:
                kF = kE.NONE;
            }
            break;
          default:
            kF = kE.NONE;
        }
        kF !== kE.NONE && kS.dispatchEvent(an);
      }
      function wl(wf) {
        switch ((wp(wf), kF)) {
          case kE.TOUCH_ROTATE:
            if (kS.enableRotate === !1) return;
            (w6(wf), kS.update());
            break;
          case kE.TOUCH_PAN:
            if (kS.enablePan === !1) return;
            (w7(wf), kS.update());
            break;
          case kE.TOUCH_DOLLY_PAN:
            if (kS.enableZoom === !1 && kS.enablePan === !1) return;
            (w9(wf), kS.update());
            break;
          case kE.TOUCH_DOLLY_ROTATE:
            if (kS.enableZoom === !1 && kS.enableRotate === !1) return;
            (wk(wf), kS.update());
            break;
          default:
            kF = kE.NONE;
        }
      }
      function wQ(wf) {
        kS.enabled !== !1 && wf.preventDefault();
      }
      function wc(wf) {
        kd.push(wf.pointerId);
      }
      function wj(wf) {
        delete kK[wf.pointerId];
        for (let wJ = 0; wJ < kd.length; wJ++)
          if (kd[wJ] == wf.pointerId) {
            kd.splice(wJ, 1);
            return;
          }
      }
      function wz(wf) {
        for (let wJ = 0; wJ < kd.length; wJ++) if (kd[wJ] == wf.pointerId) return !0;
        return !1;
      }
      function wp(wf) {
        let wJ = kK[wf.pointerId];
        (wJ === void 0 && ((wJ = new B()), (kK[wf.pointerId] = wJ)), wJ.set(wf.pageX, wf.pageY));
      }
      function wO(wf) {
        let wJ = wf.pointerId === kd[0] ? kd[1] : kd[0];
        return kK[wJ];
      }
      (kS.domElement.addEventListener('contextmenu', wQ),
        kS.domElement.addEventListener('pointerdown', ww),
        kS.domElement.addEventListener('pointercancel', wD),
        kS.domElement.addEventListener('wheel', wE, { passive: !1 }),
        kS.domElement.getRootNode().addEventListener('keydown', wC, { passive: !0, capture: !0 }),
        this.update());
    }
  },
  _t = Object.freeze({
    name: 'human',
    sides: { l: { ends: '_l', name: 'Left' }, r: { ends: '_r', name: 'Right' } },
    hips: ['pelvis', 'hips', 'hip'],
    limbs: {
      arm_l: {
        bones: ['upperarm_l', 'lowerarm_l', 'hand_l'],
        label: 'L arm',
        end: 'hand',
        hangs: 'chest',
        bend: 'Left elbow',
      },
      arm_r: {
        bones: ['upperarm_r', 'lowerarm_r', 'hand_r'],
        label: 'R arm',
        end: 'hand',
        hangs: 'chest',
        bend: 'Right elbow',
      },
      leg_l: {
        bones: ['thigh_l', 'calf_l', 'foot_l'],
        label: 'L leg',
        end: 'foot',
        hangs: 'pelvis',
        bend: 'Left knee',
      },
      leg_r: {
        bones: ['thigh_r', 'calf_r', 'foot_r'],
        label: 'R leg',
        end: 'foot',
        hangs: 'pelvis',
        bend: 'Right knee',
      },
    },
    parts: [
      {
        part: 'hand_{side}',
        bones: /^hand_/,
        fingers: !0,
        moves: 'arm_{side}',
        label: '{Side} hand',
        ease: 1.5,
      },
      {
        part: 'foot_{side}',
        bones: /^(foot|ball)_/,
        moves: 'leg_{side}',
        label: '{Side} foot',
        ease: 1.5,
      },
      { part: 'pelvis', bones: /^pelvis$/, moves: 'pelvis', label: 'Hips', ease: 1.5 },
      { part: 'spine', bones: /^spine_/ },
    ],
    fingers: /^(thumb|index|middle|ring|pinky)_/,
    sockets: {
      hand_l: { name: 'Left hand', hand: 'l' },
      hand_r: { name: 'Right hand', hand: 'r' },
      hip_l: { name: 'Left hip', bone: 'pelvis', at: [0.17, 0.02, 0], along: [0.08, -0.9, -0.42] },
      hip_r: {
        name: 'Right hip',
        bone: 'pelvis',
        at: [-0.17, 0.02, 0],
        along: [-0.08, -0.9, -0.42],
      },
      back: {
        name: 'Back',
        bone: 'spine_03',
        at: [-0.13, 0.17, -0.15],
        along: [0.42, -0.9, -0.08],
      },
    },
  }),
  Gr = Object.freeze({
    name: 'quadruped',
    sides: { l: { ends: 'L', name: 'left' }, r: { ends: 'R', name: 'right' } },
    hips: ['Body'],
    hipsLabel: 'Body',
    hipsHandle: 'Torso2',
    body: 'Body',
    limbs: {
      front_l: {
        bones: ['FrontUpperLegL', 'FrontLowerLegL'],
        foot: 'IKFrontLegL',
        label: 'Front left leg',
        end: 'foot',
        bend: 'Front left knee',
      },
      front_r: {
        bones: ['FrontUpperLegR', 'FrontLowerLegR'],
        foot: 'IKFrontLegR',
        label: 'Front right leg',
        end: 'foot',
        bend: 'Front right knee',
      },
      back_l: {
        bones: ['BackLegL', 'BackUpperLegL', 'BackLowerLegL'],
        foot: 'IKBackLegL',
        label: 'Back left leg',
        end: 'foot',
        bend: 'Back left knee',
      },
      back_r: {
        bones: ['BackLegR', 'BackUpperLegR', 'BackLowerLegR'],
        foot: 'IKBackLegR',
        label: 'Back right leg',
        end: 'foot',
        bend: 'Back right knee',
      },
    },
    parts: [
      {
        part: 'foot_front_{side}',
        bones: /^(IKFrontLeg|FF)[LR]$/,
        moves: 'front_{side}',
        label: 'Front {Side} foot',
        ease: 1.5,
      },
      {
        part: 'foot_back_{side}',
        bones: /^(IKBackLeg|FFB)[LR]$/,
        moves: 'back_{side}',
        label: 'Back {Side} foot',
        ease: 1.5,
      },
      { part: 'body', bones: /^(Body|Back|Torso)$/, moves: 'body', label: 'Body', ease: 1.3 },
    ],
    fingers: /^$/,
    helpers: /^PoleTarget/,
    sockets: {},
    posable: /^(Neck\d*|Head|Ear\d*[LR]|Tail\d*)$/,
    regions: {
      keys: ['head', 'body', 'tail'],
      labels: { head: 'Neck and head', body: 'Body and legs', tail: 'Tail' },
      bones: { head: /^(Neck\d*|Head|Ear\d*[LR])$/, tail: /^Tail\d*$/ },
      other: 'body',
      presets: { 'Head only': ['head'], 'Tail only': ['tail'], 'Head and tail': ['head', 'tail'] },
      first: 'Head only',
    },
  });
function sn(kD) {
  return Object.fromEntries(
    Object.entries(kD.limbs).map(([km, { bones: kS, label: kE }]) => [
      km,
      { root: kS[0], mid: kS[1], tip: kS[2], label: kE },
    ]),
  );
}
function Jr(kD) {
  let [km, kS] = Object.values(kD.sides).map((kE) => kE.ends);
  return (kE) => {
    let kF = String(kE);
    return kF.endsWith(km)
      ? kF.slice(0, -km.length) + kS
      : kF.endsWith(kS)
        ? kF.slice(0, -kS.length) + km
        : kF;
  };
}
function yo(kD, km, kS, kE, kF) {
  return kD.dot(km) < -0.999999 ? kF.setFromAxisAngle(kS, Math.PI) : kF.setFromUnitVectors(kD, km);
}
function xo(kD, km, kS, kE, kF, kC, ks = {}) {
  let kH = ks.soften ?? 0.05,
    ka = new kC['Vector3'](),
    ke = new kC.Vector3(),
    kR = new kC['Vector3']();
  (kD.getWorldPosition(ka), km.getWorldPosition(ke), kS.getWorldPosition(kR));
  let kl = ka.distanceTo(ke),
    kQ = ke.distanceTo(kR);
  if (kl < 0.000001 || kQ < 0.000001) return !1;
  let kc = new kC['Vector3']().subVectors(kE, ka),
    kj = kc.length();
  if (kj < 0.000001) return !1;
  let kz = kl + kQ,
    kp = Math.min(ka.distanceTo(kR), kz),
    kO = Math.max(kz * (1 - kH), kp),
    kf = !0;
  if (kj > kO) {
    kf = kj <= kz;
    let kB = kj - kO,
      kG = kz - kO || 0.000001;
    kj = kO + kG * (1 - Math.exp(-kB / kG));
  }
  let kJ = bo((kl * kl + kQ * kQ - kj * kj) / (2 * kl * kQ), -1, 1),
    kZ = bo((kl * kl + kj * kj - kQ * kQ) / (2 * kl * kj), -1, 1),
    kU = Math.PI - Math.acos(kJ),
    ku = Math.acos(kZ),
    kd = kc.clone().normalize(),
    kK = kF.clone().normalize(),
    kT = new kC['Vector3']().crossVectors(kd, kK);
  (kT.lengthSq() < 1e-8 &&
    ((kT = new kC['Vector3']().crossVectors(kd, new kC['Vector3'](0, 0, 1))),
    kT.lengthSq() < 1e-8 && kT.crossVectors(kd, new kC['Vector3'](0, 1, 0))),
    kT.normalize());
  let kA = new kC['Vector3']().subVectors(ke, ka).normalize(),
    kX = yo(kA, kd, kT, kC, new kC['Quaternion']()),
    kL = new kC['Quaternion']().setFromAxisAngle(kT, ku),
    kb = new kC['Quaternion']();
  kD.parent.getWorldQuaternion(kb).invert();
  let kx = new kC['Quaternion']();
  kD.getWorldQuaternion(kx);
  let ky = kL.clone().multiply(kX).multiply(kx);
  (kD.quaternion.copy(kb.clone().multiply(ky)),
    kD.updateMatrixWorld(!0),
    km.getWorldPosition(ke),
    kS.getWorldPosition(kR));
  let kW = new kC.Vector3().subVectors(kR, ke).normalize(),
    kq = new kC['Vector3']().subVectors(kE, ke).normalize(),
    kP = yo(kW, kq, kT, kC, new kC['Quaternion']()),
    kY = new kC['Quaternion']();
  km.parent.getWorldQuaternion(kY).invert();
  let kv = new kC['Quaternion']();
  return (
    km.getWorldQuaternion(kv),
    km.quaternion.copy(kY.multiply(kP).multiply(kv)),
    km.updateMatrixWorld(!0),
    kf
  );
}
function bo(kD, km, kS) {
  return kD < km ? km : kD > kS ? kS : kD;
}
var Ke = (kD, km) => [kD[0] - km[0], kD[1] - km[1], kD[2] - km[2]],
  ze = (kD, km) => [kD[0] + km[0], kD[1] + km[1], kD[2] + km[2]],
  Ne = (kD, km) => [kD[0] * km, kD[1] * km, kD[2] * km],
  Bt = (kD, km) => kD[0] * km[0] + kD[1] * km[1] + kD[2] * km[2],
  ln = (kD, km) => [
    kD[1] * km[2] - kD[2] * km[1],
    kD[2] * km[0] - kD[0] * km[2],
    kD[0] * km[1] - kD[1] * km[0],
  ],
  Ve = (kD) => Math.hypot(kD[0], kD[1], kD[2]),
  zt = (kD) => {
    let km = Ve(kD);
    return km > 1e-12 ? Ne(kD, 1 / km) : [0, 0, 0];
  },
  lt = (kD, km) => Ke(kD, Ne(km, Bt(kD, km))),
  Wi = (kD, km, kS) => {
    let kE = Math.cos(kS),
      kF = Math.sin(kS);
    return ze(ze(Ne(kD, kE), Ne(ln(km, kD), kF)), Ne(km, Bt(km, kD) * (1 - kE)));
  };
function ji(kD, km) {
  let kS = Math.min(1, Math.max(-1, Bt(kD, km))),
    kE = ln(kD, km);
  if (Ve(kE) < 1e-9) {
    if (kS > 0) return (ks) => ks;
    kE = lt(Math.abs(kD[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0], kD);
  }
  let kF = zt(kE),
    kC = Math.sqrt(Math.max(0, 1 - kS * kS));
  return (ks) => ze(ze(Ne(ks, kS), Ne(ln(kF, ks), kC)), Ne(kF, Bt(kF, ks) * (1 - kS)));
}
function _o(kD, km, kS = null, kE = 0, kF = null) {
  let [kC, ks, kH] = kD,
    ka = Ke(ks, kC),
    ke = Ve(ka),
    kR = Ve(Ke(kH, ks)),
    kl = Ke(km, kC),
    kQ = Ve(kl);
  if (ke < 1e-9 || kR < 1e-9 || kQ < 1e-9) return kD;
  let kc = Math.min(Math.max(kQ, Math.abs(ke - kR) + 0.00001), ke + kR - 0.00001),
    kj = Ne(kl, 1 / kQ),
    kz = kF && Ve(lt(kF, kj)) > 0.000001 * Ve(kF) ? lt(kF, kj) : lt(ka, kj);
  (Ve(kz) < 0.000001 * ke && (kz = lt(Ke(kH, kC), kj)),
    Ve(kz) < 0.000001 * ke && kS && (kz = lt(kS, kj)),
    Ve(kz) < 1e-9 && (kz = lt(Math.abs(kj[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0], kj)),
    kE && (kz = Wi(kz, kj, kE)));
  let kp = (ke * ke - kR * kR + kc * kc) / (2 * kc),
    kO = Math.sqrt(Math.max(0, ke * ke - kp * kp));
  return [kC, ze(ze(kC, Ne(kj, kp)), Ne(zt(kz), kO)), ze(kC, Ne(kj, kc))];
}
function Bi(kD, km, kS = null, kE = 0, kF = null) {
  let [kC, ks, kH, ka] = kD,
    ke = Ke(ks, kC),
    kR = Ke(ka, kH),
    kl = ze(ke, kR);
  if (Ve(kl) < 1e-9) return kD;
  let [, kQ, kc] = _o([kC, ze(kC, kl), ka], km, kS, kE, kF),
    kj = ji(zt(kl), zt(Ke(kQ, kC))),
    kz = ze(kC, kj(ke)),
    kp = ze(kz, Ke(kc, kQ));
  return [kC, kz, kp, ze(kp, kj(kR))];
}
var Mo = (kD, km, kS = null, kE = 0, kF = null) =>
    kD.length === 4 ? Bi(kD, km, kS, kE, kF) : _o(kD, km, kS, kE, kF),
  zi = Object.freeze([
    'ik_hand_root',
    'ik_hand_gun',
    'ik_hand_l',
    'ik_hand_r',
    'socket_offhand',
    'socket_offhand_grip',
  ]),
  cn = sn(_t),
  Ni = 0.25;
function ko(kD, km, kS, kE, kF) {
  let kC = kD.getWorldPosition(new kE['Vector3']()),
    ks = km.getWorldPosition(new kE['Vector3']()),
    kH = kS.getWorldPosition(new kE['Vector3']()),
    ka = new kE['Vector3']().subVectors(ks, kC),
    ke = new kE['Vector3']().subVectors(kH, ks),
    kR = ka.length(),
    kl = ke.length();
  if (kR < 1e-9 || kl < 1e-9) return !1;
  let kQ = new kE['Vector3']().crossVectors(ka, ke);
  if (kQ.length() / (kR * kl) < Ni) return !1;
  kQ.normalize();
  let kc = new kE['Vector3']().subVectors(kH, kC);
  if (kc.lengthSq() > 1e-12) {
    kc.normalize();
    let kj = new kE['Vector3']().crossVectors(kQ, kc),
      kz = new kE['Vector3']().subVectors(ks, kC);
    kj.dot(kz) < 0 && kQ.negate();
  }
  return (kF.copy(kQ).applyQuaternion(km.getWorldQuaternion(new kE['Quaternion']()).invert()), !0);
}
function vo(kD, km, kS, kE, kF, kC) {
  return (
    kF.copy(km).applyQuaternion(kD.getWorldQuaternion(kC)),
    kF.crossVectors(kF, kS),
    kF.lengthSq() < 1e-12 ? null : kF.normalize()
  );
}
function So(kD, km, kS, kE, kF, kC) {
  let { a: ks, b: kH, c: ka, axis: ke, perp: kR } = kC;
  return (
    kD.getWorldPosition(ks),
    km.getWorldPosition(kH),
    kS.getWorldPosition(ka),
    ke.subVectors(ka, ks),
    ke.lengthSq() < 1e-12
      ? kE
      : (ke.normalize(),
        kR.subVectors(kH, ks),
        kR.addScaledVector(ke, -kR.dot(ke)),
        kR.lengthSq() < 1e-10 ? kE : kR.normalize())
  );
}
function Vi(kD, km, kS, kE) {
  let kF = kD.getWorldPosition(new kE['Vector3']()),
    kC = km.getWorldPosition(new kE['Vector3']()),
    ks = kS.getWorldPosition(new kE.Vector3()),
    kH = new kE['Vector3']().subVectors(ks, kF);
  if (kH.lengthSq() < 1e-12) return new kE['Vector3'](0, 0, 1);
  kH.normalize();
  let ka = new kE['Vector3']().subVectors(kC, kF),
    ke = ka.clone().addScaledVector(kH, -ka.dot(kH));
  return ke.lengthSq() < 1e-10 ? new kE.Vector3(0, 0, 1) : ke.normalize();
}
function Oo(kD, km, kS = _t) {
  let kE = (kB) => {
      let kG = null;
      return (
        kD.traverse((kg) => {
          !kG && kg.name === kB && (kG = kg);
        }),
        kG
      );
    },
    kF = {};
  for (let [kB, kG] of Object.entries(kS === _t ? cn : sn(kS))) {
    if (kS.limbs[kB]?.foot) {
      let kN = kS.limbs[kB],
        kM = kN.bones.map(kE),
        w0 = kE(kN.foot);
      if (kM.every(Boolean) && w0?.parent && kM[0].parent) {
        kD.updateMatrixWorld(!0);
        let w1 = kM[0].getWorldPosition(new km['Vector3']()),
          w2 = w0.getWorldPosition(new km['Vector3']()).sub(w1).normalize(),
          w3 = kM[1].getWorldPosition(new km['Vector3']()).sub(w1);
        kF[kB] = {
          reach: !0,
          segs: kM,
          foot: w0,
          label: kN.label,
          root: kM[0],
          mid: kM[kM.length - 1],
          tip: w0,
          hint: w3.sub(w2.multiplyScalar(w3.dot(w2))).toArray(),
          swing: Number(kN.swing) > 0 ? (kN.swing * Math.PI) / 180 : null,
          end: new km.Vector3(),
          rest: null,
          hinge: new km['Vector3'](),
          calibrated: !0,
        };
      }
      continue;
    }
    for (let w4 of ['root', 'mid', 'tip'])
      if (zi.includes(kG[w4]))
        throw new Error(
          'IK stage: ' +
            kB +
            '.' +
            w4 +
            ' is "' +
            kG[w4] +
            '", which is a PROP SOCKET. Sockets carry held objects; nothing solves to them. Use a target_* bone.',
        );
    let kg = kE(kG.root),
      kI = kE(kG.mid),
      kh = kE(kG.tip);
    if (kg && kI && kh && kg.parent && kI.parent) {
      let w5 = new km['Vector3']();
      kF[kB] = {
        root: kg,
        mid: kI,
        tip: kh,
        label: kG.label,
        rest: Vi(kg, kI, kh, km),
        hinge: w5,
        calibrated: ko(kg, kI, kh, km, w5),
      };
    }
  }
  let kC = kS.hips.reduce((w6, w7) => w6 || kE(w7), null),
    ks = null;
  {
    let w6 = kC && kS.hipsHandle ? kE(kS.hipsHandle) : null;
    if (w6) {
      let w7 = null;
      (kD.traverse((w8) => {
        if (w7 || !w8.isSkinnedMesh) return;
        let w9 = w8.skeleton.bones.indexOf(kC),
          wk = w8.skeleton.bones.indexOf(w6);
        w9 < 0 ||
          wk < 0 ||
          (w7 = new km['Vector3']()
            .setFromMatrixPosition(new km.Matrix4().copy(w8.skeleton.boneInverses[wk]).invert())
            .applyMatrix4(w8.skeleton.boneInverses[w9]));
      }),
        w7 ||
          (kD.updateMatrixWorld(!0),
          (w7 = kC.worldToLocal(w6.getWorldPosition(new km['Vector3']())))),
        (ks = new km.Object3D()),
        (ks.name = 'hips-handle'),
        (ks.userData.ikEffector = !0),
        ks.position.copy(w7),
        kC.add(ks),
        ks.updateMatrixWorld(!0));
    }
  }
  let kH = null,
    ka = { active: !1, position: new km.Vector3(), quaternion: new km['Quaternion']() },
    ke = new Map(),
    kR = Object.values(kF).filter((w8) => w8.reach),
    kl = {},
    kQ = null,
    kc = {},
    kj = (w8) => {
      let w9 = kl[w8];
      return (kc[w8] ?? 1) * (w9 && kQ != null && !j(w9) ? z(w9, kQ) : 1);
    },
    kz = new km['Vector3'](),
    kp = new Map(),
    kO = {
      a: new km.Vector3(),
      b: new km.Vector3(),
      c: new km.Vector3(),
      axis: new km['Vector3'](),
      perp: new km['Vector3'](),
    },
    kf = !1,
    kJ = Object.keys(kF).map((w8) => ({
      limb: w8,
      label: kF[w8].label,
      active: !1,
      reached: !0,
      hasTarget: !1,
      root: new km.Vector3(),
      mid: new km.Vector3(),
      tip: new km['Vector3'](),
      pole: new km.Vector3(),
      fkTip: new km['Vector3'](),
      target: new km.Vector3(),
      hasPole: !1,
      poleTarget: new km['Vector3'](),
    })),
    kZ = Object.fromEntries(kJ.map((w8) => [w8.limb, w8])),
    kU = new km.Vector3(),
    ku = new km['Quaternion'](),
    kd = new km['Vector3'](),
    kK = new km['Vector3'](),
    kT = new km['Vector3'](),
    kA = new km['Quaternion'](),
    kX = new km['Quaternion'](),
    kL = new km['Quaternion']();
  function kb(w8, w9 = {}) {
    return kF[w8]
      ? w9.enabled === !1 || !w9.node
        ? (ke.delete(w8), !0)
        : (ke.set(w8, {
            node: w9.node,
            poleNode: w9.poleNode ?? null,
            positionWeight: w9.positionWeight ?? 1,
            soften: w9.soften ?? 0.05,
            matchRotation: w9.matchRotation !== !1,
          }),
          !0)
      : !1;
  }
  function kx(w8 = {}) {
    return !kC || !w8.node || w8.enabled === !1
      ? ((kH = null), !1)
      : ((kH = {
          node: w8.node,
          positionWeight: w8.positionWeight ?? 1,
          matchRotation: w8.matchRotation !== !1,
        }),
        !0);
  }
  function ky() {
    let w8 = He(kH.positionWeight) * kj('pelvis');
    w8 <= 0 ||
      ((ka.active = !0),
      ka.position.copy(kC.position),
      ka.quaternion.copy(kC.quaternion),
      (ks ?? kC).getWorldPosition(kU),
      kH.node.getWorldPosition(kd),
      w8 < 1 && kd.lerpVectors(kU, kd, w8),
      kH.matchRotation &&
        (kC.getWorldQuaternion(ku),
        kH.node.getWorldQuaternion(kX),
        w8 < 1 && kX.slerp(ku, 1 - w8),
        kC.parent.getWorldQuaternion(kL).invert(),
        kC.quaternion.copy(kL.multiply(kX))),
      ks &&
        (kC.updateMatrixWorld(!0),
        kd.sub(ks.getWorldPosition(kO.b)).add(kC.getWorldPosition(kO.c))),
      kC.position.copy(kC.parent.worldToLocal(kd)),
      kC.updateMatrixWorld(!0));
  }
  function kW(w8, w9, wk, ww) {
    let wV = kp.get(w8);
    (wV ||
      ((wV = {
        reach: !0,
        segs: w9.segs.map(() => new km['Quaternion']()),
        footP: new km.Vector3(),
        footQ: new km['Quaternion'](),
      }),
      kp.set(w8, wV)),
      w9.segs.forEach((wF, wC) => wV.segs[wC].copy(wF.quaternion)),
      wV.footP.copy(w9.foot.position),
      wV.footQ.copy(w9.foot.quaternion),
      w9.foot.getWorldPosition(kU),
      kf && kZ[w8].fkTip.copy(kU),
      kd.copy(kU),
      wk &&
        (wk.node.getWorldPosition(kd),
        ww < 1 && kd.lerpVectors(kU, kd, ww),
        wk.matchRotation &&
          (w9.foot.getWorldQuaternion(ku),
          wk.node.getWorldQuaternion(kX),
          ww < 1 && kX.slerp(ku, 1 - ww),
          w9.foot.parent.getWorldQuaternion(kL).invert(),
          w9.foot.quaternion.copy(kL.multiply(kX))),
        w9.foot.position.copy(w9.foot.parent.worldToLocal(kO.c.copy(kd))),
        w9.foot.updateMatrixWorld(!0)));
    let wD = 0;
    if (wk?.poleNode) {
      w9.root.getWorldPosition(kO.a);
      let wF = kO.axis.subVectors(kd, kO.a);
      wF.lengthSq() > 1e-12 &&
        (wF.normalize(),
        w9.mid.getWorldPosition(kz).sub(kO.a),
        wk.poleNode.getWorldPosition(kT).sub(kO.a),
        kz.addScaledVector(wF, -kz.dot(wF)),
        kT.addScaledVector(wF, -kT.dot(wF)),
        kz.lengthSq() > 1e-10 &&
          kT.lengthSq() > 1e-10 &&
          ((wD = Math.atan2(kO.perp.crossVectors(kz, kT).dot(wF), kz.dot(kT)) * kj('pole.' + w8)),
          w9.swing && (wD = Math.max(-w9.swing, Math.min(w9.swing, wD)))));
    }
    let wm = w9.segs.map((wC) => wC.getWorldPosition(kO.a).toArray());
    wm.push(kO.a.copy(w9.end).applyMatrix4(w9.mid.matrixWorld).toArray());
    let wS = wm[wm.length - 1],
      wE =
        Math.hypot(wS[0] - kd.x, wS[1] - kd.y, wS[2] - kd.z) < 1e-7 * (1 + kd.length()) && !wD
          ? null
          : Mo(wm, kd.toArray(), w9.hint, wD);
    for (let wC = 0; wE && wC < w9.segs.length; wC++) {
      let ws = w9.segs[wC];
      (ws.getWorldPosition(kO.a),
        wC + 1 < w9.segs.length
          ? w9.segs[wC + 1].getWorldPosition(kO.b)
          : kO.b.copy(w9.end).applyMatrix4(w9.mid.matrixWorld));
      let wH = kO.b.sub(kO.a),
        wR = kO.c.fromArray(wE[wC + 1]).sub(kO.perp.fromArray(wE[wC]));
      wH.lengthSq() < 1e-12 ||
        wR.lengthSq() < 1e-12 ||
        (kA.setFromUnitVectors(wH.normalize(), wR.normalize()),
        ws.getWorldQuaternion(kX).premultiply(kA),
        ws.parent.getWorldQuaternion(kL).invert(),
        ws.quaternion.copy(kL.multiply(kX)),
        ws.updateMatrixWorld(!0));
    }
    if (kf) {
      let wl = kZ[w8];
      ((wl.active = !!wk), (wl.hasTarget = !!wk), (wl.reached = !0), wl.target.copy(kd));
    }
  }
  function kq() {
    (ke.clear(), (kH = null), kv());
  }
  function kP(w8 = null) {
    return ((kQ = w8), !kH || !kC ? !1 : (kD.updateMatrixWorld(!0), ky(), ka.active));
  }
  function kY(w8 = null) {
    if (((kQ = w8), !(!ke.size && !kH && !kf))) {
      if ((kD.updateMatrixWorld(!0), kf)) {
        for (let w9 of kJ) ((w9.active = !1), (w9.hasTarget = !1), (w9.hasPole = !1));
      }
      for (let wk of kR) wk.mid.worldToLocal(wk.foot.getWorldPosition(wk.end));
      kH && kC && ky();
      for (let [ww, wV] of ke) {
        let wD = kF[ww],
          wm = He(wV.positionWeight) * kj(ww);
        if (wm <= 0) continue;
        if (wD.reach) {
          kW(ww, wD, wV, wm);
          continue;
        }
        let wS = kp.get(ww);
        (wS ||
          ((wS = {
            root: new km.Quaternion(),
            mid: new km['Quaternion'](),
            tip: new km['Quaternion'](),
          }),
          kp.set(ww, wS)),
          wS.root.copy(wD.root.quaternion),
          wS.mid.copy(wD.mid.quaternion),
          wS.tip.copy(wD.tip.quaternion),
          wD.tip.getWorldPosition(kU),
          wV.matchRotation && wD.tip.getWorldQuaternion(ku),
          kf && kZ[ww].fkTip.copy(kU),
          wV.node.getWorldPosition(kd),
          wm < 1 && kd.lerpVectors(kU, kd, wm),
          wD.calibrated || (wD.calibrated = ko(wD.root, wD.mid, wD.tip, km, wD.hinge)),
          wD.root.getWorldPosition(kO.a),
          kK.subVectors(kd, kO.a));
        let wE = kK.lengthSq() > 1e-12;
        wE && kK.normalize();
        let wF = null;
        if (wV.poleNode && wE) {
          wV.poleNode.getWorldPosition(kT);
          let ws = kj('pole.' + ww);
          (ws < 1 && kT.lerpVectors(wD.mid.getWorldPosition(kz), kT, ws),
            kT.sub(kO.a),
            kT.addScaledVector(kK, -kT.dot(kK)),
            (wF = kT.lengthSq() < 1e-10 ? null : kT.normalize()));
        }
        (!wF && wD.calibrated && wE && (wF = vo(wD.mid, wD.hinge, kK, km, kT, kA)),
          wF || (wF = So(wD.root, wD.mid, wD.tip, wD.rest, km, kO)));
        let wC = xo(wD.root, wD.mid, wD.tip, kd, wF, km, { soften: wV.soften });
        if (kf) {
          let wH = kZ[ww];
          ((wH.active = !0), (wH.hasTarget = !0), (wH.reached = wC !== !1), wH.target.copy(kd));
        }
        (wV.matchRotation &&
          (wV.node.getWorldQuaternion(kX),
          wm < 1 && kX.slerp(ku, 1 - wm),
          wD.tip.parent.getWorldQuaternion(kL).invert(),
          wD.tip.quaternion.copy(kL.multiply(kX))),
          wD.tip.updateMatrixWorld(!0));
      }
      if (ka.active) {
        for (let [wR, wl] of Object.entries(kF)) wl.reach && !kp.has(wR) && kW(wR, wl, null, 1);
      }
      if (kf)
        for (let wQ of kJ) {
          let wc = kF[wQ.limb];
          if (
            (wc.root.getWorldPosition(wQ.root),
            wc.mid.getWorldPosition(wQ.mid),
            wc.tip.getWorldPosition(wQ.tip),
            wc.reach)
          ) {
            let wp = ke.get(wQ.limb)?.poleNode;
            (wQ.pole.set(0, 0, 0),
              (wQ.hasPole = !!wp),
              wp && wp.getWorldPosition(wQ.poleTarget),
              wQ.hasTarget || wQ.fkTip.copy(wQ.tip));
            continue;
          }
          let wj = null;
          (wc.calibrated &&
            (kK.subVectors(wQ.tip, wQ.root),
            kK.lengthSq() > 1e-12 && (wj = vo(wc.mid, wc.hinge, kK.normalize(), km, kT, kA))),
            wQ.pole.copy(wj ?? So(wc.root, wc.mid, wc.tip, wc.rest, km, kO)));
          let wz = ke.get(wQ.limb);
          ((wQ.hasPole = !!wz?.poleNode),
            wQ.hasPole && wz.poleNode.getWorldPosition(wQ.poleTarget),
            wQ.hasTarget || wQ.fkTip.copy(wQ.tip));
        }
    }
  }
  function kv() {
    if (
      (ka.active &&
        (kC.position.copy(ka.position),
        kC.quaternion.copy(ka.quaternion),
        kC.updateMatrixWorld(!0),
        (ka.active = !1)),
      !!kp.size)
    ) {
      for (let [w8, w9] of kp) {
        let wk = kF[w8];
        if (wk) {
          if (w9.reach) {
            (wk.segs.forEach((ww, wV) => ww.quaternion.copy(w9.segs[wV])),
              wk.foot.position.copy(w9.footP),
              wk.foot.quaternion.copy(w9.footQ),
              wk.root.updateMatrixWorld(!0),
              wk.foot.updateMatrixWorld(!0));
            continue;
          }
          (wk.root.quaternion.copy(w9.root),
            wk.mid.quaternion.copy(w9.mid),
            wk.tip.quaternion.copy(w9.tip),
            wk.root.updateMatrixWorld(!0));
        }
      }
      kp.clear();
    }
  }
  return {
    run: kY,
    carry: kP,
    restore: kv,
    set: kb,
    clear: kq,
    setWindows: (w8) => {
      kl = {};
      for (let [w9, wk] of Object.entries(w8 || {})) wk && !j(wk) && (kl[w9] = Q(wk));
    },
    hasWindows: () => Object.keys(kl).length > 0,
    setFactors: (w8) => {
      kc = {};
      for (let [w9, wk] of Object.entries(w8 || {})) kc[w9] = He(Number(wk));
    },
    limbs: () => Object.keys(kF),
    label: (w8) => kF[w8]?.label ?? w8,
    tipBone: (w8) => kF[w8]?.tip?.name ?? null,
    tip: (w8) => kF[w8]?.tip ?? null,
    mid: (w8) => kF[w8]?.mid ?? null,
    root: (w8) => kF[w8]?.root ?? null,
    chainBones: (w8) => {
      let w9 = kF[w8];
      return w9?.reach
        ? [...w9.segs.map((wk) => wk.name), w9.foot.name]
        : w9
          ? [w9.root?.name, w9.mid?.name, w9.tip?.name].filter(Boolean)
          : [];
    },
    placedBones: (w8) => (kF[w8]?.reach ? [kF[w8].foot.name] : []),
    followers: () => Object.keys(kF).filter((w8) => kF[w8].reach),
    poled: () => Object.keys(kF),
    active: () => [...ke.keys()],
    setPelvis: kx,
    pelvis: () => kC,
    pelvisHandle: () => ks ?? kC,
    pelvisActive: () => !!(kH && kC),
    pelvisBone: () => kC?.name ?? null,
    setDebug(w8) {
      kf = !!w8;
    },
    isDebug: () => kf,
    debugData: () => (kf ? kJ : []),
  };
}
var $o = 2.5,
  Po = Object.freeze(['root', 'pelvis', 'tip', 'prop']),
  Ao = (kD) => {
    let km = ((Number(kD) || 0) + 180) % 360;
    return (km < 0 ? km + 360 : km) - 180;
  },
  Io = (kD) => 'pole.' + kD,
  pn = Object.freeze([...Object.keys(cn), ...Object.keys(cn).map(Io), 'pelvis']);
function ra(kD) {
  if (!kD || kD === _t) return pn;
  let km = Object.keys(kD.limbs);
  return [...km, ...km.map(Io), 'pelvis'];
}
function aa(kD = {}, km = pn) {
  let kS = new Set(kD.enabled ?? []),
    kE = kD.offsets ?? {},
    kF = [],
    kC = He(kD.positionWeight ?? 1);
  Math.abs(kC - 1) > 0.000001 && kF.push('w:' + +kC.toFixed(3));
  for (let ks of km) {
    let kH = kD.keys?.[ks];
    if (Array.isArray(kH) && kH.length) {
      let kf = kH.some((kK) => [3, 4, 5].some((kT) => Math.abs(Number(kK.v?.[kT]) || 0) > 0.000001))
          ? 6
          : 3,
        kJ = (kK, kT) =>
          kK == null || !Number.isFinite(Number(kK))
            ? null
            : kT < 3
              ? Number(kK) * 100
              : Number(kK),
        kZ = kH.map((kK) => {
          let kT = f(kK),
            kA = Z(kK),
            kX = (kb) =>
              Array.from({ length: kf }, (kx, ky) => (kb?.[ky] != null ? kJ(kb[ky], ky) : null)),
            kL = (kb) => Array.from({ length: kf }, (kx, ky) => kb?.[ky] ?? null);
          return {
            u: kK.u,
            i: Array.isArray(kK.i) ? kK.i.slice(0, kf) : kK.i,
            v: Array.from({ length: kf }, (kb, kx) => kJ(kK.v?.[kx], kx)),
            ...(kT && Array.isArray(kT.tin)
              ? {
                  tin: kX(kT.tin),
                  tout: kX(kT.tout),
                  free: Array.from({ length: kf }, (kb, kx) => !!kT.free?.[kx]),
                  lin: kL(kT.lin),
                  lout: kL(kT.lout),
                }
              : {}),
            ...(kA && Array.isArray(kA.ht) ? { ht: kL(kA.ht) } : {}),
          };
        }),
        kU = kD.weights?.[ks],
        ku = kD.parents?.[ks],
        kd =
          (ku && ku !== 'root' ? ';p=' + ku : '') +
          (kD.muted?.[ks] ? ';m' : '') +
          (kD.solo?.[ks] ? ';s' : '') +
          (kU != null && Math.abs(kU - 1) > 0.000001 ? ';w' + Math.round(He(kU) * 100) : '');
      kF.push(ks + ':' + (kS.has(ks) ? 1 : 0) + '/' + R(kZ, { digits: 2 }) + kd);
      continue;
    }
    let ka = kE[ks],
      ke = !ka || ka.every((kK) => Math.abs(kK) < 0.000001);
    if (!kS.has(ks) && ke) continue;
    let kR = ka ?? [0, 0, 0, 0, 0, 0],
      kl = kR.slice(0, 3).map((kK) => +(kK * 100).toFixed(2)),
      kQ = kR.slice(3, 6).map((kK) => +(Number(kK) || 0).toFixed(2)),
      kc = kQ.some((kK) => Math.abs(kK) > 0.000001) ? [...kl, ...kQ] : kl,
      kj = kD.parents?.[ks];
    kj && kj !== 'root' && kc.push(kj);
    let kz = p(kD.ranges?.[ks]),
      kp = kD.weights?.[ks],
      kO =
        (kD.muted?.[ks] ? ';m' : '') +
        (kD.solo?.[ks] ? ';s' : '') +
        (kp != null && Math.abs(kp - 1) > 0.000001 ? ';w' + Math.round(He(kp) * 100) : '');
    kF.push(ks + ':' + (kS.has(ks) ? 1 : 0) + '/' + kc.join('/') + (kz ? '@' + kz : '') + kO);
  }
  return kF.join(',');
}
function sa(kD, km = pn) {
  let kS = {
    positionWeight: 1,
    enabled: [],
    offsets: {},
    parents: {},
    ranges: {},
    muted: {},
    solo: {},
    weights: {},
    keys: {},
  };
  for (let kE of km) kS.offsets[kE] = null;
  for (let kF of String(kD || '')
    .split(',')
    .filter(Boolean)) {
    let kC = kF.indexOf(':');
    if (kC < 0) continue;
    let ks = kF.slice(0, kC),
      [kH, ...ka] = kF.slice(kC + 1).split(';');
    if (km.includes(ks)) {
      for (let kO of ka)
        kO === 'm'
          ? (kS.muted[ks] = !0)
          : kO === 's'
            ? (kS.solo[ks] = !0)
            : /^w\d+$/.test(kO)
              ? (kS.weights[ks] = He(Number(kO.slice(1)) / 100))
              : kO.startsWith('p=') && Po.includes(kO.slice(2)) && (kS.parents[ks] = kO.slice(2));
    }
    if (ks === 'w') {
      let kf = Number(kH);
      Number.isFinite(kf) && (kS.positionWeight = He(kf));
      continue;
    }
    if (!km.includes(ks)) continue;
    let ke = kH.indexOf('/');
    if (ke > 0 && kH[ke + 1] === 'k') {
      let kJ = l(kH.slice(ke + 1));
      kJ &&
        ((kS.keys[ks] = kJ.map((kZ) => {
          let kU = Array.isArray(kZ.v) ? kZ.v : [kZ.v],
            ku = f(kZ),
            kd = Z(kZ),
            kK = (kX, kL) =>
              kX == null ? null : kL < 3 ? Co((Number(kX) || 0) / 100, $o) : Ao(Number(kX) || 0),
            kT = (kX) =>
              [0, 1, 2, 3, 4, 5].map((kL) =>
                kX?.[kL] != null ? (kL < 3 ? kX[kL] / 100 : kX[kL]) : null,
              ),
            kA = (kX) => [0, 1, 2, 3, 4, 5].map((kL) => kX?.[kL] ?? null);
          return {
            u: kZ.u,
            i: Array.isArray(kZ.i) ? [0, 1, 2, 3, 4, 5].map((kX) => kZ.i[kX] ?? null) : kZ.i,
            v: [0, 1, 2, 3, 4, 5].map((kX) => kK(kU[kX], kX)),
            ...(ku && Array.isArray(ku.tin)
              ? {
                  tin: kT(ku.tin),
                  tout: kT(ku.tout),
                  free: [0, 1, 2, 3, 4, 5].map((kX) => !!ku.free?.[kX]),
                  lin: kA(ku.lin),
                  lout: kA(ku.lout),
                }
              : {}),
            ...(kd && Array.isArray(kd.ht) ? { ht: kA(kd.ht) } : {}),
          };
        })),
        kH.slice(0, ke) === '1' && kS.enabled.push(ks));
      continue;
    }
    let kR = kH.indexOf('@');
    if (kR >= 0) {
      let kZ = O(kH.slice(kR + 1));
      j(kZ) || (kS.ranges[ks] = kZ);
    }
    let kl = (kR >= 0 ? kH.slice(0, kR) : kH).split('/'),
      kQ = kl[kl.length - 1];
    if (kl.length > 1 && kQ !== '' && !Number.isFinite(Number(kQ))) {
      let kU = kl.pop();
      Po.includes(kU) && (kS.parents[ks] = kU);
    }
    let kc = kl.map(Number);
    if ((kc.length !== 4 && kc.length !== 7) || kc.some((ku) => !Number.isFinite(ku))) continue;
    kc[0] && kS.enabled.push(ks);
    let kj = kc.slice(1, 4).map((ku) => Co(ku / 100, $o)),
      kz = kc.length === 7 ? kc.slice(4, 7).map(Ao) : [0, 0, 0],
      kp = [...kj, ...kz];
    kp.some((ku) => Math.abs(ku) > 0.000001) && (kS.offsets[ks] = kp);
  }
  return kS;
}
function Co(kD, km) {
  return kD < -km ? -km : kD > km ? km : kD;
}
function He(kD) {
  return kD < 0 ? 0 : kD > 1 ? 1 : kD;
}
var Nt = null;
function un(kD) {
  if (Nt) return Nt;
  let km = new kD['WebGLRendere' + 'r']({ antialias: !0, alpha: !0 });
  (km.setSize(96, 96, !1), km.setPixelRatio(1));
  let kS = new kD.Scene();
  kS.add(new kD['AmbientLight'](16777215, 2.2));
  let kE = new kD['DirectionalL' + 'ight'](16777215, 2.4);
  (kE.position.set(2, 3, 4), kS.add(kE));
  let kF = new kD['PerspectiveC' + 'amera'](35, 1, 0.01, 100);
  return ((Nt = { renderer: km, scene: kS, camera: kF }), Nt);
}
function ca(kD, km) {
  if (!kD || !km) return null;
  let { renderer: kS, scene: kE, camera: kF } = un(km),
    kC = kD.clone(!0);
  kE.add(kC);
  try {
    let ks = new km.Box3().setFromObject(kC);
    if (ks.isEmpty()) return null;
    let kH = ks.getSize(new km['Vector3']()),
      ka = ks.getCenter(new km['Vector3']()),
      ke = Math.max(kH.x, kH.y, kH.z) * 0.5 || 0.1,
      kR = (ke / Math.tan((kF.fov * Math.PI) / 360)) * 1.1;
    return (
      kF.position.set(ka.x + kR * 0.6, ka.y + kR * 0.45, ka.z + kR * 0.75),
      kF.lookAt(ka),
      (kF.near = Math.max(0.001, kR - ke * 4)),
      (kF.far = kR + ke * 8),
      kF.updateProjectionMatrix(),
      kS.render(kE, kF),
      kS.domElement.toDataURL('image/png')
    );
  } catch {
    return null;
  } finally {
    kE.remove(kC);
  }
}
function Wo({ rig: kD, clip: km, clone: kS, THREE: kE, at: kF = 0.35 }) {
  if (!kD || !km || !kS || !kE) return null;
  let { renderer: kC, scene: ks, camera: kH } = un(kE),
    ka = kS(kD);
  ks.add(ka);
  let ke = new kE.AnimationMixer(ka);
  try {
    (ke.clipAction(km).play(), ke.setTime(km.duration * kF), ka.updateMatrixWorld(!0));
    let kR = new kE['Box3']().setFromObject(ka);
    if (kR.isEmpty()) return null;
    let kl = kR.getSize(new kE['Vector3']()),
      kQ = kR.getCenter(new kE.Vector3()),
      kc = Math.max(kl.y, Math.max(kl.x, kl.z) * 0.6) * 0.5 || 0.5;
    kC.setSize(160, 160, !1);
    let kj = (kc / Math.tan((kH.fov * Math.PI) / 360)) * 1.35;
    return (
      kH.position.set(kQ.x + kj * 0.55, kQ.y + kj * 0.18, kQ.z + kj * 0.8),
      kH.lookAt(kQ),
      (kH.near = Math.max(0.001, kj - kc * 4)),
      (kH.far = kj + kc * 8),
      kH.updateProjectionMatrix(),
      kC.render(ks, kH),
      kC.domElement.toDataURL('image/webp', 0.82)
    );
  } catch {
    return null;
  } finally {
    (ke.stopAllAction(), ke.uncacheRoot(ka), ks.remove(ka), kC.setSize(96, 96, !1));
  }
}
var Lo = 200,
  Fo = 240;
function pa({ model: kD, clone: km, THREE: kS }) {
  if (!kD || !km || !kS) return null;
  let { renderer: kE, scene: kF, camera: kC } = un(kS),
    ks = null;
  try {
    ((ks = km(kD)), kF.add(ks), ks.updateMatrixWorld(!0));
    let kH = new kS['Box3']().setFromObject(ks);
    if (kH.isEmpty()) return null;
    let ka = kH.getSize(new kS.Vector3()),
      ke = kH.getCenter(new kS.Vector3()),
      kR = Math.max(ka.y, Math.max(ka.x, ka.z) * 0.6) * 0.5 || 0.5;
    (kE.setSize(Lo, Fo, !1), (kC.aspect = Lo / Fo));
    let kl = (kR / Math.tan((kC.fov * Math.PI) / 360)) * 1.3;
    return (
      kC.position.set(ke.x + kl * 0.34, ke.y + kl * 0.12, ke.z + kl * 0.94),
      kC.lookAt(ke),
      (kC.near = Math.max(0.001, kl - kR * 4)),
      (kC.far = kl + kR * 8),
      kC.updateProjectionMatrix(),
      kE.render(kF, kC),
      kE.domElement.toDataURL('image/webp', 0.82)
    );
  } catch {
    return null;
  } finally {
    (ks && kF.remove(ks), (kC.aspect = 1), kC.updateProjectionMatrix(), kE.setSize(96, 96, !1));
  }
}
var Di =
    /^(mixamorig\d*[:_]?|cc_base_|ccbase_?|rl_|def[-_.]|org[-_.]|mch[-_.]|j_bip_|j_adj_|j_sec_|valvebiped\.bip01_|bip0?0?1[\s_]?)/i,
  qi = /(^|[^a-z])(end|nub|tip|leaf|top)([^a-z]|$)|_end$|end$/i,
  Qi = new Set([
    'twist',
    'roll',
    'share',
    'corrective',
    'helper',
    'ik',
    'pole',
    'target',
    'socket',
    'attach',
    'weapon',
    'prop',
    'jiggle',
    'breast',
    'hair',
    'skirt',
    'cloth',
    'eye',
    'jaw',
    'tongue',
    'teeth',
    'brow',
    'lip',
    'cheek',
    'nose',
    'ear',
  ]),
  Ui = /^j_(sec|adj)_/i,
  Yi = /(metacarpal|carpal|palm|_meta)/i,
  Xi = [
    'pelvis',
    'spine',
    'Head',
    ...['l', 'r'].flatMap((kD) =>
      ['upperarm', 'lowerarm', 'hand', 'thigh', 'calf', 'foot'].map((km) => km + '_' + kD),
    ),
  ],
  Ti = ['spine_01', 'spine_02', 'spine_03'];
function Vt(kD) {
  return Xi.filter((km) => (km === 'spine' ? !Ti.some((kS) => kD[kS]) : !kD[km]));
}
function Dt(kD) {
  let km = String(kD ?? '');
  km = km.split(/[:|]/).pop();
  for (let kH = 0; kH < 3; kH++) km = km.replace(Di, '');
  let kS = null,
    kE = (ka, ke) => {
      if (kS) return;
      let kR = ka.exec(km);
      kR && ((kS = ke(kR)), (km = km.replace(ka, ' ')));
    };
  (kE(/\.([LR])(?=(\.\d+)?$)/, (ka) => ka[1].toLowerCase()),
    kE(/^(left|right)(?=[A-Z_\s.]|$)/i, (ka) => ka[1][0].toLowerCase()),
    kE(/(^|[_\s.\-])([LRlr])(?=[_\s.\-]|$)/, (ka) => ka[2].toLowerCase()),
    kE(/^([lr])(?=[A-Z])/, (ka) => ka[1]),
    kE(/(left|right)/i, (ka) => ka[1][0].toLowerCase()));
  let kF = km
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/([A-Za-z])(\d)/g, '$1 $2')
      .replace(/(\d)([A-Za-z])/g, '$1 $2')
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter(Boolean),
    kC = kF.filter((ka) => /^\d+$/.test(ka)).map(Number),
    ks = Ui.test(String(kD ?? '')) || kF.some((ka) => Qi.has(ka));
  return {
    side: kS,
    tokens: kF,
    text: kF.join(' '),
    digits: kC,
    end: qi.test(kD ?? ''),
    helper: ks,
    meta: Yi.test(kD ?? ''),
  };
}
var Me = (kD, ...km) => km.some((kS) => kD.tokens.includes(kS));
function Mt(kD) {
  if (kD.helper) return 'helper';
  let km = kD.text;
  return kD.meta
    ? 'meta'
    : Me(kD, 'thumb') || /finger 0\b/.test(km)
      ? 'thumb'
      : Me(kD, 'index', 'pointer') || /finger 1\b/.test(km)
        ? 'index'
        : Me(kD, 'middle', 'mid') || /finger 2\b/.test(km)
          ? 'middle'
          : Me(kD, 'ring') || /finger 3\b/.test(km)
            ? 'ring'
            : Me(kD, 'pinky', 'little') || /finger 4\b/.test(km)
              ? 'pinky'
              : Me(kD, 'hand', 'wrist')
                ? 'hand'
                : Me(kD, 'forearm', 'lowerarm', 'elbow') || /(fore|lower) arm/.test(km)
                  ? 'lowerarm'
                  : /upper arm/.test(km) || Me(kD, 'upperarm', 'shldr', 'humerus', 'arm')
                    ? 'upperarm'
                    : Me(kD, 'clavicle', 'collar')
                      ? 'clavicle'
                      : Me(kD, 'shoulder')
                        ? 'shoulder'
                        : Me(kD, 'thigh', 'upleg', 'femur') || /(up|upper) leg/.test(km)
                          ? 'thigh'
                          : Me(kD, 'calf', 'shin', 'knee', 'tibia') ||
                              /lower leg/.test(km) ||
                              Me(kD, 'leg')
                            ? 'calf'
                            : Me(kD, 'foot', 'ankle')
                              ? 'foot'
                              : Me(kD, 'toe', 'toes', 'toebase', 'ball')
                                ? 'ball'
                                : Me(kD, 'neck')
                                  ? 'neck'
                                  : Me(kD, 'head')
                                    ? 'head'
                                    : Me(kD, 'hips', 'hip', 'pelvis')
                                      ? 'hips'
                                      : Me(
                                            kD,
                                            'spine',
                                            'chest',
                                            'abdomen',
                                            'waist',
                                            'torso',
                                            'back',
                                          )
                                        ? 'spine'
                                        : Me(kD, 'root', 'boneroot')
                                          ? 'root'
                                          : null;
}
var qt = (kD) => kD.userData?.name ?? kD.userData?.originalName ?? kD.name;
function zo(kD) {
  let km = new Set();
  for (let kS of kD) {
    let kE = kS.geometry.attributes.skinIndex,
      kF = kS.geometry.attributes.skinWeight;
    if (!kE || !kF) continue;
    let kC = new Set();
    for (let ks = 0; ks < kE.count; ks++)
      for (let kH = 0; kH < 4; kH++)
        kF.getComponent(ks, kH) > 0.0001 && kC.add(kE.getComponent(ks, kH));
    for (let ka of kC) for (let ke = kS.skeleton.bones[ka]; ke?.isBone; ke = ke.parent) km.add(ke);
  }
  return km;
}
function No(kD, km, kS = null, kE = null) {
  kD.updateMatrixWorld(!0);
  let kF = [];
  kD.traverse((w4) => {
    w4.isBone && (!kS || kS.has(w4)) && kF.push(w4);
  });
  let kC = new Map(kF.map((w4) => [w4, Dt(qt(w4))])),
    ks = new Map(
      kF.map((w4) => [w4, kE?.get(w4)?.clone() ?? w4.getWorldPosition(new km['Vector3']())]),
    ),
    kH = (w4) => w4.children.filter((w5) => w5.isBone && kC.has(w5)),
    ka = (w4) => {
      let w5 = [],
        w6 = w4.parent;
      for (; w6?.isBone;) (kC.has(w6) && w5.push(w6), (w6 = w6.parent));
      return w5;
    },
    kR = (...w4) => {
      let w5 = w4.map((w6) => [w6, ...ka(w6)]);
      return w5[0].find((w6) => w5.every((w7) => w7.includes(w6))) ?? null;
    },
    kl = (w4, w5) => {
      let w6 = [],
        w7 = w5;
      for (; w7 && w7 !== w4;) (kC.has(w7) && w6.unshift(w7), (w7 = w7.parent));
      return w7 === w4 ? w6 : null;
    },
    kQ = [],
    kc = kF.filter((w4) => !kC.get(w4).helper),
    kj = kc.filter((w4) => kH(w4).filter((w5) => !kC.get(w5).helper).length === 0);
  if (kc.length < 10) return { map: {}, how: {}, notes: ['too few bones to be a humanoid'] };
  let kz = new km['Box3']();
  kc.forEach((w4) => kz.expandByPoint(ks.get(w4)));
  let kp = kz.getSize(new km.Vector3()),
    kO = Math.max(kp.x, kp.y, kp.z),
    kf = null,
    kJ = 'y',
    kZ = 1,
    kU = (w4) => (w5, w6) => {
      let w7 = w5.clone().sub(w6);
      return ((w7[w4] = 0), w7.length());
    };
  for (let w4 of ['x', 'y', 'z']
    .filter((w5) => kp[w5] > 0.5 * kO)
    .sort((w5, w6) => kp[w6] - kp[w5])) {
    let w5 = kU(w4);
    for (let w6 of [1, -1]) {
      let w7 = kj.map((wk) => [wk, w6 * ks.get(wk)[w4]]).sort((wk, ww) => wk[1] - ww[1]),
        w8 = w7[0],
        w9 =
          w8 &&
          w7.find(
            ([wk, ww]) =>
              ww - w8[1] < 0.12 * kp[w4] && w5(ks.get(wk), ks.get(w8[0])) > 0.08 * kp[w4],
          );
      w9 && !kf && ((kf = { sgn: w6, f1: w8[0], f2: w9[0] }), (kJ = w4), (kZ = kp[w4]));
    }
  }
  if (!kf)
    return { map: {}, how: {}, notes: ['no two feet found \u2014 not a two-legged character?'] };
  let ku = kU(kJ),
    kd = new km['Vector3']();
  kd[kJ] = kf.sgn;
  let kK = (wk) => ks.get(wk)[kJ] * kf.sgn,
    kT = ks.get(kf.f1).clone().add(ks.get(kf.f2)).multiplyScalar(0.5),
    kA = (wk) =>
      ks
        .get(wk)
        .clone()
        .sub(ks.get(ka(wk)[0] ?? wk)),
    kX = kA(kf.f1).add(kA(kf.f2));
  kX.addScaledVector(kd, -kX.dot(kd)).normalize();
  let kL = new km['Vector3']().crossVectors(kd, kX).normalize(),
    kb = (wk) => Math.abs(ks.get(wk).clone().sub(kT).dot(kL)),
    kx = kc.filter((wk) => kb(wk) < 0.05 * kZ);
  if (!kx.length) return { map: {}, how: {}, notes: ['no bones down the middle of the body'] };
  let ky = kx.reduce((wk, ww) => (kK(ww) > kK(wk) ? ww : wk)),
    kW = kR(kf.f1, kf.f2, ky);
  if (!kW) return { map: {}, how: {}, notes: ['the feet and the head share no parent bone'] };
  let kq = kl(kW, ky) ?? [],
    kP = new Set([...kq, ...(kl(kW, kf.f1) ?? []), ...(kl(kW, kf.f2) ?? []), kW]),
    kY = kc
      .filter((wk) => !kP.has(wk) && kH(wk).filter((ww) => !kC.get(ww).helper).length >= 3)
      .sort((wk, ww) => kb(ww) - kb(wk)),
    kv = [];
  for (let wk of kY)
    if (!kv.length) kv.push(wk);
    else {
      if (ks.get(wk).distanceTo(ks.get(kv[0])) > 0.3 * kZ) {
        kv.push(wk);
        break;
      }
    }
  kv.length < 2 &&
    kQ.push('Two hands with fingers weren\u2019t found \u2014 map the arms by hand.');
  let kB = (ww) => (ks.get(ww).clone().sub(ks.get(kW)).dot(kL) > 0 ? 'l' : 'r'),
    kG = {},
    kg = {},
    kI = (ww, wV, wD = 'structure') => {
      wV && ((kG[ww] = wV.name), (kg[ww] = wD));
    },
    kh = (ww) => kC.get(ww).end || (kH(ww).length === 0 && kC.get(ww).digits.includes(4)),
    kN = ka(kW);
  (kN.length && kI('root', kN[kN.length - 1]), kI('pelvis', kW));
  let kM = kv.length === 2 ? kR(kv[0], kv[1]) : null;
  (!kM || !kq.includes(kM)) && (kM = kq[Math.floor(kq.length * 0.6)]);
  let w0 = kq.indexOf(kM),
    w1 = kq.slice(0, w0 + 1).filter((ww) => !kC.get(ww).helper),
    w2 = kq.slice(w0 + 1).filter((ww) => !kC.get(ww).helper);
  w2.length <= 1 && (w2 = kq.slice(w0 + 1));
  let w3 = w2.find((ww) => Mt(kC.get(ww)) === 'head' && !kC.get(ww).end);
  (w3 || ((w3 = w2[w2.length - 1]), w3 && kh(w3) && (w3 = w2[w2.length - 2])),
    (w2 = w3 ? w2.slice(0, w2.indexOf(w3)) : w2),
    w1.length && kI('spine_03', w1[w1.length - 1]),
    w1.length >= 2 && kI('spine_01', w1[0]),
    w1.length >= 3 && kI('spine_02', w1[Math.round((w1.length - 1) / 2)]),
    w2.length && kI('neck_01', w2[0]),
    kI('Head', w3));
  for (let ww of kv) {
    let wV = kB(ww),
      wD = (kl(kM, ww) ?? []).filter((wp) => !kC.get(wp).helper);
    if (wD.length < 2) continue;
    let wm = wD.map((wp) => Mt(kC.get(wp))),
      wS = null,
      wE = null,
      wF = wm.indexOf('clavicle'),
      wC = wm.indexOf('shoulder'),
      ws = wm.indexOf('upperarm');
    wF >= 0
      ? ((wS = wD[wF]), (wE = ws >= 0 ? wD[ws] : wC > wF ? wD[wC] : wD[wF + 1]))
      : wC >= 0 && ws > wC
        ? ((wS = wD[wC]), (wE = wD[ws]))
        : wD.length >= 4
          ? ((wS = wD[0]), (wE = wD[1]))
          : (wE = wD[0]);
    let wH = wF >= 0 || wC >= 0 || ws >= 0 ? 'name' : 'structure';
    (kI('clavicle_' + wV, wS, wH), kI('upperarm_' + wV, wE, wH));
    let wR = wD.slice(wD.indexOf(wE) + 1, wD.length - 1),
      wl = ks.get(wE).clone().add(ks.get(ww)).multiplyScalar(0.5),
      wQ = wR.find((wp) => Mt(kC.get(wp)) === 'lowerarm');
    (wR.length &&
      kI(
        'lowerarm_' + wV,
        wQ ??
          wR.reduce(
            (wp, wO) => (ks.get(wO).distanceTo(wl) < ks.get(wp).distanceTo(wl) ? wO : wp),
            wR[0],
          ),
        wQ ? 'name' : 'structure',
      ),
      kI('hand_' + wV, ww));
    let wc = kH(ww)
      .filter((wp) => !kC.get(wp).helper)
      .map((wp) => {
        let wO = [],
          wf = wp;
        for (; wf;) (wO.push(wf), (wf = kH(wf).filter((wU) => !kC.get(wU).helper)[0]));
        let wJ = wO.filter((wU) => !kh(wU)),
          wZ = (wU) => ks.get(wU).distanceTo(ks.get(ww));
        return (
          wJ.length &&
            (kC.get(wJ[0]).meta || (wJ.length >= 4 && wZ(wJ[0]) < 0.5 * wZ(wJ[1]))) &&
            (wJ = wJ.slice(1)),
          wJ.slice(0, 3)
        );
      })
      .filter((wp) => wp.length);
    if (!wc.length) continue;
    let wj = new Map();
    for (let wp of wc) {
      let wO = Mt(kC.get(wp[0]));
      ['thumb', 'index', 'middle', 'ring', 'pinky'].includes(wO) && !wj.has(wO) && wj.set(wO, wp);
    }
    let wz;
    if (wj.size === wc.length) wz = wj;
    else {
      wz = new Map();
      let wf = wc.reduce((wZ, wU) =>
        ks.get(wU[0]).distanceTo(ks.get(ww)) < ks.get(wZ[0]).distanceTo(ks.get(ww)) ? wU : wZ,
      );
      wz.set('thumb', wf);
      let wJ = wc
        .filter((wZ) => wZ !== wf)
        .sort(
          (wZ, wU) =>
            ks.get(wZ[0]).distanceTo(ks.get(wf[0])) - ks.get(wU[0]).distanceTo(ks.get(wf[0])),
        );
      ['index', 'middle', 'ring', 'pinky'].forEach((wZ, wU) => wJ[wU] && wz.set(wZ, wJ[wU]));
    }
    for (let [wZ, wU] of wz)
      wU.forEach((wu, wd) =>
        kI(wZ + '_0' + (wd + 1) + '_' + wV, wu, wj.size === wc.length ? 'name' : 'structure'),
      );
  }
  for (let wu of [kf.f1, kf.f2]) {
    let wd = (kl(kW, wu) ?? []).filter((wq) => !kC.get(wq).helper);
    if (wd.length < 2) continue;
    let wK = wd.find((wq) => ku(ks.get(wq), ks.get(kW)) > 0.03 * kZ) ?? wd[0],
      wT = kB(wK),
      wA = wd.slice(wd.indexOf(wK)),
      wX = wA.findIndex((wq, wP) => {
        let wY = wA[wP + 1];
        if (!wY || wP === 0) return !1;
        let wv = ks.get(wY).clone().sub(ks.get(wq)),
          wB = Math.abs(wv.dot(kd));
        return wv.length() > 0.000001 && wB < wv.length() * 0.7;
      });
    wX < 0 && (wX = wA.length - 1);
    let wL = wA[wX],
      wb = wA[wX + 1] && !kh(wA[wX + 1]) ? wA[wX + 1] : null,
      wx = (kK(wK) + kK(wL)) / 2,
      wy = wA.slice(1, wX),
      wW =
        wy.find((wq) => Mt(kC.get(wq)) === 'calf') ??
        (wy.length
          ? wy.reduce((wq, wP) => (Math.abs(kK(wP) - wx) < Math.abs(kK(wq) - wx) ? wP : wq), wy[0])
          : null);
    (kI('thigh_' + wT, wK), kI('calf_' + wT, wW), kI('foot_' + wT, wL), wb && kI('ball_' + wT, wb));
  }
  return { map: kG, how: kg, notes: kQ };
}
var Vo = ['thumb', 'index', 'middle', 'ring', 'pinky'],
  et = (kD) =>
    Object.assign(
      {},
      ...['l', 'r'].map((km) => kD(km, km === 'l' ? 'Left' : 'Right', km.toUpperCase())),
    ),
  ft = (kD, km) =>
    Object.fromEntries(
      Vo.flatMap((kS) => [1, 2, 3].map((kE) => [kS + '_0' + kE + '_' + kD, km(kS, kE)])).filter(
        ([, kS]) => kS,
      ),
    ),
  tt = (kD, km, kS, kE, kF, kC, ks) => ({
    pelvis: kD,
    spine_01: km,
    spine_02: kS,
    spine_03: kE,
    neck_01: kF,
    Head: kC,
    ...(ks ? { root: ks } : {}),
  }),
  Zi = (kD) => kD[0].toUpperCase() + kD.slice(1),
  jo = { thumb: 'Thumb', index: 'Index', middle: 'Mid', ring: 'Ring', pinky: 'Pinky' },
  Bo = (kD) => ({
    ['clavicle_' + kD]: 'clavicle_' + kD,
    ['upperarm_' + kD]: 'upperarm_' + kD,
    ['lowerarm_' + kD]: 'lowerarm_' + kD,
    ['hand_' + kD]: 'hand_' + kD,
    ['thigh_' + kD]: 'thigh_' + kD,
    ['calf_' + kD]: 'calf_' + kD,
    ['foot_' + kD]: 'foot_' + kD,
    ['ball_' + kD]: 'ball_' + kD,
    ...ft(kD, (km, kS) => km + '_0' + kS + '_' + kD),
  }),
  Ki = [
    {
      id: 'mixamo',
      label: 'Mixamo',
      map: {
        ...tt('Hips', 'Spine', 'Spine1', 'Spine2', 'Neck', 'Head'),
        ...et((kD, km) => ({
          ['clavicle_' + kD]: km + 'Shoulder',
          ['upperarm_' + kD]: km + 'Arm',
          ['lowerarm_' + kD]: km + 'ForeArm',
          ['hand_' + kD]: km + 'Hand',
          ['thigh_' + kD]: km + 'UpLeg',
          ['calf_' + kD]: km + 'Leg',
          ['foot_' + kD]: km + 'Foot',
          ['ball_' + kD]: km + 'ToeBase',
          ...ft(kD, (kS, kE) => km + 'Hand' + Zi(kS) + kE),
        })),
      },
    },
    {
      id: 'ue5',
      label: 'Unreal Engine 5 Mannequin',
      needs: ['spine_05'],
      map: {
        ...tt('pelvis', 'spine_01', 'spine_03', 'spine_05', 'neck_01', 'head', 'root'),
        ...et(Bo),
      },
    },
    {
      id: 'ue4',
      label: 'Unreal Engine 4 Mannequin',
      map: {
        ...tt('pelvis', 'spine_01', 'spine_02', 'spine_03', 'neck_01', 'head', 'root'),
        ...et(Bo),
      },
    },
    {
      id: 'cc',
      label: 'Character Creator / AccuRIG',
      map: {
        ...tt(
          'CC_Base_Hip',
          'CC_Base_Waist',
          'CC_Base_Spine01',
          'CC_Base_Spine02',
          'CC_Base_NeckTwist01',
          'CC_Base_Head',
          'CC_Base_BoneRoot',
        ),
        ...et((kD, km, kS) => ({
          ['clavicle_' + kD]: 'CC_Base_' + kS + '_Clavicle',
          ['upperarm_' + kD]: 'CC_Base_' + kS + '_Upperarm',
          ['lowerarm_' + kD]: 'CC_Base_' + kS + '_Forearm',
          ['hand_' + kD]: 'CC_Base_' + kS + '_Hand',
          ['thigh_' + kD]: 'CC_Base_' + kS + '_Thigh',
          ['calf_' + kD]: 'CC_Base_' + kS + '_Calf',
          ['foot_' + kD]: 'CC_Base_' + kS + '_Foot',
          ['ball_' + kD]: 'CC_Base_' + kS + '_ToeBase',
          ...ft(kD, (kE, kF) => 'CC_Base_' + kS + '_' + jo[kE] + kF),
        })),
      },
    },
    {
      id: 'rigify',
      label: 'Rigify (deform bones)',
      map: {
        ...tt(
          'DEF-spine',
          'DEF-spine.001',
          'DEF-spine.002',
          'DEF-spine.003',
          'DEF-spine.004',
          'DEF-spine.006',
        ),
        ...et((kD, km, kS) => ({
          ['clavicle_' + kD]: 'DEF-shoulder.' + kS,
          ['upperarm_' + kD]: 'DEF-upper_arm.' + kS,
          ['lowerarm_' + kD]: 'DEF-forearm.' + kS,
          ['hand_' + kD]: 'DEF-hand.' + kS,
          ['thigh_' + kD]: 'DEF-thigh.' + kS,
          ['calf_' + kD]: 'DEF-shin.' + kS,
          ['foot_' + kD]: 'DEF-foot.' + kS,
          ['ball_' + kD]: 'DEF-toe.' + kS,
          ...ft(kD, (kE, kF) =>
            kE === 'thumb' ? 'DEF-thumb.0' + kF + '.' + kS : 'DEF-f_' + kE + '.0' + kF + '.' + kS,
          ),
        })),
      },
    },
    {
      id: 'daz',
      label: 'Daz Genesis 8',
      map: {
        ...tt('hip', 'abdomenLower', 'chestLower', 'chestUpper', 'neckLower', 'head'),
        ...et((kD) => ({
          ['clavicle_' + kD]: kD + 'Collar',
          ['upperarm_' + kD]: kD + 'ShldrBend',
          ['lowerarm_' + kD]: kD + 'ForearmBend',
          ['hand_' + kD]: kD + 'Hand',
          ['thigh_' + kD]: kD + 'ThighBend',
          ['calf_' + kD]: kD + 'Shin',
          ['foot_' + kD]: kD + 'Foot',
          ['ball_' + kD]: kD + 'Toe',
          ...ft(kD, (km, kS) => '' + kD + jo[km] + kS),
        })),
      },
    },
    {
      id: 'biped',
      label: '3ds Max Biped',
      map: {
        ...tt(
          'Bip01 Pelvis',
          'Bip01 Spine',
          'Bip01 Spine1',
          'Bip01 Spine2',
          'Bip01 Neck',
          'Bip01 Head',
          'Bip01',
        ),
        ...et((kD, km, kS) => ({
          ['clavicle_' + kD]: 'Bip01 ' + kS + ' Clavicle',
          ['upperarm_' + kD]: 'Bip01 ' + kS + ' UpperArm',
          ['lowerarm_' + kD]: 'Bip01 ' + kS + ' Forearm',
          ['hand_' + kD]: 'Bip01 ' + kS + ' Hand',
          ['thigh_' + kD]: 'Bip01 ' + kS + ' Thigh',
          ['calf_' + kD]: 'Bip01 ' + kS + ' Calf',
          ['foot_' + kD]: 'Bip01 ' + kS + ' Foot',
          ['ball_' + kD]: 'Bip01 ' + kS + ' Toe0',
          ...ft(
            kD,
            (kE, kF) => 'Bip01 ' + kS + ' Finger' + Vo.indexOf(kE) + (kF === 1 ? '' : kF - 1),
          ),
        })),
      },
    },
    {
      id: 'synty',
      label: 'Synty POLYGON',
      map: {
        ...tt('Hips', 'Spine_01', 'Spine_02', 'Spine_03', 'Neck', 'Head', 'Root'),
        ...et((kD, km, kS) => ({
          ['clavicle_' + kD]: 'Clavicle_' + kS,
          ['upperarm_' + kD]: 'Shoulder_' + kS,
          ['lowerarm_' + kD]: 'Elbow_' + kS,
          ['hand_' + kD]: 'Hand_' + kS,
          ['thigh_' + kD]: 'UpperLeg_' + kS,
          ['calf_' + kD]: 'LowerLeg_' + kS,
          ['foot_' + kD]: 'Ankle_' + kS,
          ['ball_' + kD]: 'Ball_' + kS,
        })),
      },
    },
  ],
  Ge = (kD) =>
    String(kD ?? '')
      .split(/[:|]/)
      .pop()
      .replace(/^mixamorig\d*/i, '')
      .replace(/^bip0*1(?=[\s_]|$)/i, 'bip01')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '');
function Do(kD, km) {
  let kS = new Map();
  for (let kF of kD) {
    let kC = Ge(km[kF] ?? kF);
    kS.has(kC) || kS.set(kC, kF);
  }
  let kE = null;
  for (let ks of Ki) {
    if (ks.needs && !ks.needs.every((ka) => kS.has(Ge(ka)))) continue;
    let kH = {};
    for (let [ka, ke] of Object.entries(ks.map)) {
      let kR = kS.get(Ge(ke));
      kR && (kH[ka] = kR);
    }
    Object.keys(kH).filter((kl) => !/^(thumb|index|middle|ring|pinky)_/.test(kl)).length >= 10 &&
      (!kE || Object.keys(kH).length > Object.keys(kE.map).length) &&
      (kE = { id: ks.id, label: ks.label, map: kH });
  }
  return kE;
}
var dn = {
  hips: 'pelvis',
  spine: 'spine_01',
  chest: 'spine_02',
  upperChest: 'spine_03',
  neck: 'neck_01',
  head: 'Head',
};
for (let [t, n] of [
  ['l', 'left'],
  ['r', 'right'],
]) {
  Object.assign(dn, {
    [n + 'Shoulder']: 'clavicle_' + t,
    [n + 'UpperArm']: 'upperarm_' + t,
    [n + 'LowerArm']: 'lowerarm_' + t,
    [n + 'Hand']: 'hand_' + t,
    [n + 'UpperLeg']: 'thigh_' + t,
    [n + 'LowerLeg']: 'calf_' + t,
    [n + 'Foot']: 'foot_' + t,
    [n + 'Toes']: 'ball_' + t,
  });
  for (let o of ['Index', 'Middle', 'Ring', 'Little']) {
    let e = o === 'Little' ? 'pinky' : o.toLowerCase();
    Object.assign(dn, {
      ['' + n + o + 'Proximal']: e + '_01_' + t,
      ['' + n + o + 'Intermediate']: e + '_02_' + t,
      ['' + n + o + 'Distal']: e + '_03_' + t,
    });
  }
}
function qo(kD) {
  let km = kD?.parser?.json?.extensions,
    kS = km?.VRMC_vrm?.humanoid?.humanBones,
    kE = km?.VRM?.humanoid?.humanBones;
  if (!kS && !kE) return null;
  let kF = new Map();
  kD.scene.traverse((kH) => {
    let ka = kD.parser.associations?.get(kH);
    ka?.nodes != null && kH.isBone && kF.set(ka.nodes, kH.name);
  });
  let kC = {},
    ks = (kH, ka) => {
      let ke = dn[kH],
        kR = /^(left|right)Thumb(Metacarpal|Proximal|Intermediate|Distal)$/.exec(kH ?? '');
      (kR &&
        (ke =
          'thumb_0' +
          (kS
            ? { Metacarpal: 1, Proximal: 2, Distal: 3 }[kR[2]]
            : { Proximal: 1, Intermediate: 2, Distal: 3 }[kR[2]]) +
          '_' +
          kR[1][0]),
        ke && kF.has(ka) && (kC[ke] = kF.get(ka)));
    };
  if (kS) {
    for (let [kH, ka] of Object.entries(kS)) ks(kH, ka?.node);
  } else {
    for (let ke of kE) ks(ke?.bone, ke?.node);
  }
  return (
    !kC.spine_03 && kC.spine_02 && ((kC.spine_03 = kC.spine_02), delete kC.spine_02),
    Object.keys(kC).length ? { id: 'vrm', label: kS ? 'VRM 1.0' : 'VRM 0.x', map: kC } : null
  );
}
function Qo(kD, km, kS) {
  let kE = (kH) => (kH == null ? '' : Ge(kS[kH] ?? kH)),
    kF = kD
      .map((kH) => kE(km[kH]) + '>' + kE(kH))
      .sort()
      .join('\n'),
    kC = 3735928559,
    ks = 1103547991;
  for (let kH = 0; kH < kF.length; kH++) {
    let ka = kF.charCodeAt(kH);
    ((kC = Math.imul(kC ^ ka, 2654435761)), (ks = Math.imul(ks ^ ka, 1597334677)));
  }
  return (
    (kC = Math.imul(kC ^ (kC >>> 16), 2246822507) ^ Math.imul(ks ^ (ks >>> 13), 3266489909)),
    (ks = Math.imul(ks ^ (ks >>> 16), 2246822507) ^ Math.imul(kC ^ (kC >>> 13), 3266489909)),
    'rig.' + (4294967296 * (2097151 & ks) + (kC >>> 0)).toString(36)
  );
}
var Uo = [100, 0.01, 2.54, 1 / 2.54, 1000, 0.001],
  Gi = [
    'pelvis',
    'spine_01',
    'spine_02',
    'spine_03',
    'neck_01',
    'Head',
    'clavicle_l',
    'clavicle_r',
    'upperarm_l',
    'upperarm_r',
    'thigh_l',
    'thigh_r',
  ],
  Ji = 0.5;
function wa(kD, km, kS, { map: kE = null, rigMaps: kF = null, preset: kC = null } = {}) {
  let ks = kD.scene,
    kH = ks.parent;
  kH?.remove(ks);
  try {
    return Ri(kD, km, kS, kE, kF, kC);
  } finally {
    kH?.add(ks);
  }
}
function Ri(kD, km, kS, kE, kF, kC) {
  let ks = [],
    kH = [],
    ka = [],
    kR = kD.scene;
  kR.updateMatrixWorld(!0);
  let kl = [];
  kR.traverse((ws) => {
    ws.isSkinnedMesh && kl.push(ws);
  });
  let kQ,
    kc,
    kj = !kl.length;
  if (kj) {
    ((kc = new Set()),
      kR.traverse((wH) => {
        wH.isBone && kc.add(wH);
      }));
    let ws = 0;
    if (
      (kR.traverse((wH) => {
        wH.isMesh && ws++;
      }),
      kc.size < 10 &&
        !ws &&
        kR.traverse((wH) => {
          wH !== kR &&
            !wH.isMesh &&
            !wH.isCamera &&
            !wH.isLight &&
            !wH.isBone &&
            ((wH.isBone = !0), (wH.type = 'Bone'), kc.add(wH));
        }),
      kc.size < 10)
    )
      return (
        ks.push(
          'This file has no skinned mesh and no skeleton to speak of \u2014 nothing to put our clips on.',
        ),
        { tier: 'reject', errors: ks, warnings: kH, fixes: ka, stats: {} }
      );
    kQ = new Map([...kc].map((wH) => [wH.name, wH.matrixWorld.clone()]));
  } else ((kQ = D(V(kl, kS), kR, kS)), (kc = zo(kl)));
  let kz = new Map(
      [...kc]
        .map((wH) => [
          wH,
          kQ.has(wH.name) ? new kS['Vector3']().setFromMatrixPosition(kQ.get(wH.name)) : null,
        ])
        .filter(([, wH]) => wH),
    ),
    kp = new Map();
  kR.traverse((wH) => {
    wH.isBone && !kp.has(wH.name) && kp.set(wH.name, wH);
  });
  let kO = Object.fromEntries([...kp].map(([wH, wR]) => [wH, qt(wR)])),
    kf = [...kc].filter((wH) => kQ.has(wH.name)).map((wH) => wH.name),
    kJ = kj
      ? []
      : [...new Set(kl.flatMap((wH) => wH.skeleton.bones))]
          .filter((wH) => wH?.isBone && !kc.has(wH))
          .map((wH) => kO[wH.name] ?? qt(wH))
          .filter((wH) => {
            let wR = Dt(wH);
            return !wR.end && !wR.helper;
          }),
    kZ = Object.fromEntries(kf.map((wH) => [wH, kz.get(kp.get(wH))])),
    kU = Object.fromEntries(
      kf.map((wH) => {
        let wR = kp.get(wH).parent;
        for (; wR?.isBone && !kc.has(wR);) wR = wR.parent;
        return [wH, wR?.isBone ? wR.name : null];
      }),
    ),
    ku = kf.filter((wH) => {
      let wR = Dt(kO[wH] ?? wH);
      return !wR.end && !wR.helper;
    }),
    kd = new Set(ku),
    kK = Object.fromEntries(
      ku.map((wH) => {
        let wR = kU[wH];
        for (; wR && !kd.has(wR);) wR = kU[wR];
        return [wH, wR ?? null];
      }),
    ),
    kT = Qo(ku, kK, kO),
    kA = No(kR, kS, kc, kz),
    kX = { ...kA.map },
    kL = { ...kA.how },
    kb = Do(kf, kO),
    kx = qo(kD);
  for (let wH of [kb, kx])
    if (wH) {
      for (let [wR, wl] of Object.entries(wH.map)) ((kX[wR] = wl), (kL[wR] = wH.id));
    }
  if (kC?.map) {
    for (let [wQ, wc] of Object.entries(kC.map)) kp.has(wc) && ((kX[wQ] = wc), (kL[wQ] = kC.id));
  }
  let ky = new Map(kf.map((wj) => [Ge(kO[wj] ?? wj), wj])),
    kW = kE ? null : (kF?.({ signature: kT, keys: ky }) ?? null),
    kq = (wj) => {
      let wz = { ...wj };
      for (let [wp, wO] of Object.entries(wz)) (!kp.has(wO) || !km.bones.has(wp)) && delete wz[wp];
      return wz;
    },
    kP = kE ?? kW ?? null,
    kY = !1;
  kP &&
    Vt(kq(kP)).length > Vt(kq(kX)).length &&
    ((kP = kC?.map ? null : { ...kX, ...kq(kP) }), (kY = !0));
  let kv = kq(kP ?? kX);
  kY && ka.push('The mapping kept with it was missing main bones: matched again.');
  let kB =
      kP && !kY
        ? kE
          ? { kind: 'character' }
          : { kind: 'saved' }
        : kC?.map
          ? { kind: 'known', label: kC.label }
          : kx
            ? { kind: 'known', label: kx.label }
            : kb
              ? { kind: 'known', label: kb.label }
              : { kind: 'auto' },
    kG = Vt(kv),
    kg = { bones: kc.size, mapped: Object.keys(kv).length, missing: kG },
    kI = { map: kX, notes: kA.notes },
    kh = (kC?.map ? kC : null) ?? kx ?? kb,
    kN = {
      errors: ks,
      warnings: kH,
      fixes: ka,
      map: kv,
      how: kL,
      suggested: kX,
      known: kh ? { id: kh.id, label: kh.label } : null,
      mended: kY,
      missing: kG,
      stats: kg,
      names: kO,
      bones: kf,
      unweighted: kJ,
      joints: kZ,
      parents: kU,
      frames: kQ,
      signature: kT,
      keys: ky,
      source: kB,
      skeletonOnly: kj,
    },
    kM = (wj) => kz.get(kp.get(kv[wj])) ?? null,
    w0 = Gi.filter((wj) => kv[wj] && kM(wj) && km.joint.has(wj));
  if (kG.length || w0.length < 4) {
    let wj = new kS['Box3']();
    for (let wJ of kz.values()) wj.expandByPoint(wJ);
    let wz = wj.getSize(new kS['Vector3']()),
      wp = Math.max(wz.x, wz.y, wz.z) || 1,
      wO = Uo.find((wZ) => Math.abs(1.8 / wp / wZ - 1) < 0.5) ?? 1,
      wf = wj.getCenter(new kS['Vector3']()).multiplyScalar(wO);
    kN.place = new kS['Matrix4']()
      .makeTranslation(-wf.x, -wj.min.y * wO, -wf.z)
      .multiply(new kS['Matrix4']().makeScale(wO, wO, wO));
  }
  if (kG.length) {
    ks.push(kG.length + ' of the main bones aren\u2019t mapped yet: ' + kG.join(', ') + '.');
    for (let wZ of kI.notes) kH.push(wZ);
    return { ...kN, tier: 'custom', ready: !1 };
  }
  let w1 = F(
      w0.map(kM),
      w0.map((wU) => km.joint.get(wU)),
      kS,
    ),
    w2 = Uo.find((wU) => Math.abs(w1.s / wU - 1) < 0.15),
    w3 = w2 ?? w1.s;
  (w2 && w2 !== 1
    ? ka.push(
        w2 === 0.01
          ? 'Exported in centimetres \u2014 scaled to metres.'
          : 'Scaled by ' + +w2.toFixed(4) + ' (units).',
      )
    : !w2 && Math.abs(w1.s - 1) > 0.15 && ka.push('Scaled by ' + w1.s.toFixed(3) + ' to our size.'),
    kC && w1.R.copy(Ei(w1.R, kS)));
  let w4 = kS.MathUtils.radToDeg(2 * Math.acos(Math.min(1, Math.abs(w1.R.w))));
  w4 > 5 && ka.push('Turned ' + w4.toFixed(0) + '\u00B0 to stand and face like ours.');
  let w5 = new kS['Matrix4']().compose(
      new kS['Vector3'](),
      w4 > 5 ? w1.R : new kS['Quaternion'](),
      new kS.Vector3().setScalar(w3),
    ),
    w6 = new kS['Vector3']().subVectors(
      km.joint.get('pelvis'),
      kM('pelvis').clone().applyMatrix4(w5),
    );
  w6.y = 0;
  let w7 = new kS['Matrix4']().makeTranslation(w6.x, 0, w6.z).multiply(w5),
    w8 = new Map(),
    w9 = new Map();
  for (let [wU, wu] of Object.entries(kv)) {
    let wd = kQ.get(wu);
    if (!wd) continue;
    let wK = new kS.Matrix4().multiplyMatrices(w7, wd);
    (w9.set(wU, wK), w8.set(wU, new kS['Vector3']().setFromMatrixPosition(wK)));
  }
  let wk = m(km, kS),
    ww = kC?.turns
      ? new Map(
          Object.entries(kv)
            .filter(([, wT]) => kC.turns.has(wT))
            .map(([wT, wA]) => [wT, kC.turns.get(wA)]),
        )
      : null,
    wV = ww ? r({ j: w8, turn: ww, R0: wk, THREE: kS }) : S({ j: w8, F: null, R0: wk, THREE: kS }),
    wD = E(w8, wk, wV.info, kS);
  ww &&
    ka.push(
      'Recognised as ' +
        kC.what +
        ': its rest pose is taken as the ' +
        kC.preset +
        ' export takes it, so it plays here as its download will.',
    );
  let wm = [...kc].filter((wT) => !Object.values(kv).includes(wT.name) && kQ.has(wT.name));
  if (kI.notes.length) {
    for (let wT of kI.notes) kH.push(wT);
  }
  let wS =
    kB.kind === 'saved'
      ? ' (your saved mapping for this rig)'
      : kB.kind === 'known'
        ? ' (recognised: ' + kB.label + ')'
        : kB.kind === 'character'
          ? ' (as you mapped it)'
          : '';
  ka.push(
    'Its own skeleton' +
      (kj ? ' \u2014 a skeleton only, no mesh' : '') +
      ': ' +
      Object.keys(kv).length +
      ' bones mapped to ours' +
      wS +
      (wm.length ? ', ' + wm.length + ' more follow them' : '') +
      '.',
  );
  let wE = -1 / 0,
    wF = 1 / 0,
    wC = new kS['Vector3']();
  if (kj) {
    for (let wA of kz.values())
      (wC.copy(wA).applyMatrix4(w7), (wE = Math.max(wE, wC.y)), (wF = Math.min(wF, wC.y)));
  }
  for (let wX of kl) {
    let wL = new kS['Matrix4']().multiplyMatrices(w7, wX.matrixWorld),
      wb = wX.geometry.attributes.position;
    for (let wx = 0; wx < wb.count; wx += 3)
      (wC.fromBufferAttribute(wb, wx).applyMatrix4(wL),
        (wE = Math.max(wE, wC.y)),
        (wF = Math.min(wF, wC.y)));
  }
  return (
    Object.assign(kg, {
      meshes: kl.length,
      vertices: kl.reduce((wy, wW) => wy + wW.geometry.attributes.position.count, 0),
      heightCm: Math.round((wE - wF) * 100),
      scale: w3,
      rotDeg: +w4.toFixed(1),
    }),
    {
      ...kN,
      tier: 'custom',
      ready: !0,
      place: w7,
      align: { j: w8, S: wV.S, p: wV.p, identity: wV.identity, F: w9, info: wV.info },
      rest: wD,
    }
  );
}
function Ei(kD, km) {
  let kS = new km.Matrix4().makeRotationFromQuaternion(kD).elements,
    kE = (kR) => [kS[kR * 4], kS[kR * 4 + 1], kS[kR * 4 + 2]],
    kF = (kR, kl = -1) => {
      let kQ = -1;
      for (let kj = 0; kj < 3; kj++)
        kj !== kl && (kQ < 0 || Math.abs(kR[kj]) > Math.abs(kR[kQ])) && (kQ = kj);
      let kc = [0, 0, 0];
      return ((kc[kQ] = Math.sign(kR[kQ]) || 1), [kc, kQ]);
    },
    [kC, ks] = kF(kE(0)),
    [kH] = kF(kE(1), ks),
    ka = new km['Vector3'](...kC),
    ke = new km['Vector3'](...kH);
  return new km['Quaternion']().setFromRotationMatrix(
    new km.Matrix4().makeBasis(ka, ke, new km['Vector3']().crossVectors(ka, ke)),
  );
}
function Hi(kD, km, kS, kE) {
  let { map: kF, frames: kC, place: ks, align: kH } = km,
    ka = new Map(Object.entries(kF).map(([kO, kf]) => [kf, kO])),
    ke = [];
  kD.traverse((kO) => {
    kO.isBone && ke.push(kO);
  });
  let kR = ke.filter((kO) => kC.has(kO.name)).map((kO) => kO.name),
    kl = new Set(kR),
    kQ = (kO) => new kE['Matrix4']().multiplyMatrices(ks, kC.get(kO)),
    kc = (kO) =>
      new kE['Quaternion']().setFromRotationMatrix(new kE['Matrix4']().extractRotation(kO)),
    kj = new Map(
      ke.map((kO) => [
        kO.name,
        kO.parent?.isBone && kl.has(kO.parent.name) ? kO.parent.name : null,
      ]),
    ),
    kz = new Map(),
    kp = new Map();
  for (let kO of kR) {
    let kf = kj.get(kO);
    kp.set(kO, kf ? kQ(kf).invert().multiply(kQ(kO)) : null);
    let kJ = ka.get(kO);
    if (kJ) {
      let kZ = kH.S.get(kJ) ?? new kE['Quaternion']();
      kz.set(kO, {
        kind: 'mapped',
        our: kJ,
        inT: kZ
          .clone()
          .invert()
          .multiply(kc(kQ(kO))),
      });
    } else kz.set(kO, { kind: 'hold' });
  }
  for (let kU of kR) {
    if (kz.get(kU).kind !== 'hold') continue;
    let ku = kj.get(kU);
    for (; ku && kz.get(ku).kind !== 'mapped';) ku = kj.get(ku);
    if (!ku) continue;
    let kd = (kA) => kR.filter((kX) => kj.get(kX) === kA),
      kK = null,
      kT = kU;
    for (let kA = 0; kA < 8 && !kK; kA++) {
      let kX = kd(kT),
        kL = kX.find((kb) => kz.get(kb).kind === 'mapped');
      if (kL) kK = kL;
      else {
        if (kX.length === 1) kT = kX[0];
        else break;
      }
    }
    kK &&
      !/^(pelvis|spine|neck|Head)/.test(kz.get(kK).our) &&
      kz.set(kU, { kind: 'twist', to: kK, share: Ji });
  }
  for (let kb of kR) {
    let kx = kz.get(kb);
    if (kx.kind !== 'mapped') continue;
    let ky = kR.filter((kP) => kj.get(kP) === kb && kz.get(kP).kind === 'mapped');
    if (ky.length !== 1) continue;
    let kW = kz.get(ky[0]).our,
      kq = kS.get(kW);
    kq?.parent?.name &&
      kq.parent.name !== kx.our &&
      kS.has(kx.our) &&
      (kx.chord = {
        child: ky[0],
        ourChild: kW,
        dir: new kE['Vector3']().setFromMatrixPosition(kp.get(ky[0])).normalize(),
      });
  }
  return {
    order: kR,
    role: kz,
    bindLocal: kp,
    parentOf: kj,
    hips: kF.pelvis ?? null,
    root: kF.root ?? null,
  };
}
function hn(kD, km, kS, kE, kF) {
  let kC = new Map(),
    ks = new Map();
  (km.traverse((kz) => {
    kz.isBone && !kC.has(kz.name) && kC.set(kz.name, kz);
  }),
    kS.traverse((kz) => {
      kz.isBone && !ks.has(kz.name) && ks.set(kz.name, kz);
    }));
  let kH = new Map(),
    ka = new kF['Quaternion'](),
    ke = new kF['Quaternion'](),
    kR = new kF['Vector3'](),
    kl = new kF['Vector3'](),
    kQ = new kF['Matrix4'](),
    kc = (kz) => kC.get(kz).getWorldQuaternion(ke).multiply(kE.get(kz).clone().invert()),
    kj = (kz) => kc(kz.our).multiply(kz.inT);
  return function () {
    (km.updateMatrixWorld(!0), kS.updateMatrixWorld(!0), kH.clear());
    for (let kz of kD.order) {
      let kp = ks.get(kz);
      if (!kp) continue;
      let kO = kD.parentOf.get(kz),
        kf = kO ? kH.get(kO) : kp.parent.matrixWorld,
        kJ = kD.role.get(kz),
        kZ = kO
          ? new kF['Matrix4']().multiplyMatrices(kf, kD.bindLocal.get(kz))
          : kp.matrixWorld.clone(),
        kU = new kF['Vector3'](),
        ku = new kF['Quaternion'](),
        kd = new kF['Vector3']();
      kZ.decompose(kU, ku, kd);
      let kK = ku;
      if (kJ.kind === 'mapped') {
        if (((kK = kj(kJ)), kJ.chord)) {
          let kA = kJ.chord.dir.clone().applyQuaternion(kK),
            kX = kC
              .get(kJ.chord.ourChild)
              .getWorldPosition(kR)
              .sub(kC.get(kJ.our).getWorldPosition(kl))
              .normalize();
          kK = new kF['Quaternion']().setFromUnitVectors(kA.normalize(), kX).multiply(kK);
        }
        (kz === kD.hips || kz === kD.root) && kC.get(kJ.our).getWorldPosition(kU);
      } else {
        if (kJ.kind === 'twist') {
          let kL = kD.role.get(kJ.to),
            kb = new kF['Matrix4']().compose(kU, ku, kd);
          for (let kP = kJ.to, kY = []; ;) {
            if ((kY.unshift(kP), (kP = kD.parentOf.get(kP)), kP === kz)) {
              for (let kv of kY) kb.multiply(kD.bindLocal.get(kv));
              break;
            }
            if (!kP) break;
          }
          kb.decompose(kR, ka, kl);
          let kx = kj(kL).multiply(ka.clone().invert()),
            ky = kR.clone().sub(kU).normalize(),
            kW = ky.dot(new kF['Vector3'](kx.x, kx.y, kx.z)),
            kq = new kF['Quaternion'](ky.x * kW, ky.y * kW, ky.z * kW, kx.w).normalize();
          kK = new kF['Quaternion']().slerp(kq, kJ.share).multiply(ku);
        }
      }
      let kT = new kF['Matrix4']().compose(kU, kK, kd);
      (kH.set(kz, kT),
        kQ.copy(kp.parent.matrixWorld),
        kO && kQ.copy(kf),
        kQ.invert().multiply(kT).decompose(kp.position, kp.quaternion, kp.scale));
    }
    kS.updateMatrixWorld(!0);
  };
}
function ga(kD, km, kS, kE, { moveJoints: kF, cloneSkinned: kC }) {
  kD.updateMatrixWorld(!0);
  let ks = new Map();
  kD.traverse((kO) => {
    kO.isBone && ks.set(kO.name, kO);
  });
  let kH = new Map([...ks].map(([kO, kf]) => [kO, kf.getWorldQuaternion(new kE.Quaternion())])),
    ka = [];
  kD.traverse((kO) => {
    kO.isMesh && ka.push(kO);
  });
  for (let kO of ka) kO.removeFromParent();
  (kF(kD, ks, kS, kE), kD.updateMatrixWorld(!0));
  let ke = kD.clone(!0),
    kR = kC(km.scene),
    kl = new kE.Group();
  ((kl.name = '__character__'),
    kS.place.decompose(kl.position, kl.quaternion, kl.scale),
    kl.add(km.scene),
    km.scene.traverse((kf) => {
      kf.isMesh && (kf.frustumCulled = !1);
    }),
    kl.updateMatrixWorld(!0));
  let kQ = kS.skeletonOnly ? new kE['SkeletonHelp' + 'er'](km.scene) : null,
    kc = Hi(km.scene, kS, ks, kE),
    kj = hn(kc, kD, kl, kH, kE);
  kj();
  function kz(kf, kJ = 30) {
    let kZ = ke.clone(!0),
      kU = new kE['Group']();
    kS.place.decompose(kU.position, kU.quaternion, kU.scale);
    let ku = kR.clone(!0);
    kU.add(ku);
    let kd = hn(kc, kZ, kU, kH, kE),
      kK = new kE['AnimationMix' + 'er'](kZ);
    kK.clipAction(kf).play();
    let kT = Math.max(2, Math.round(kf.duration * kJ) + 1),
      kA = new Float32Array(kT),
      kX = new Map();
    ku.traverse((kW) => {
      kW.isBone && kc.role.has(kW.name) && !kX.has(kW.name) && kX.set(kW.name, kW);
    });
    let kL = new Map([...kX.keys()].map((kW) => [kW, new Float32Array(kT * 4)])),
      kb = [kc.hips, kc.root].filter((kW) => kW && kX.has(kW)),
      kx = new Map(kb.map((kW) => [kW, new Float32Array(kT * 3)]));
    for (let kW = 0; kW < kT; kW++) {
      let kq = (kW / (kT - 1)) * kf.duration;
      ((kA[kW] = kq), kK.setTime(Math.min(kq, kf.duration - 0.000001)), kd());
      for (let [kP, kY] of kX) {
        let kv = kL.get(kP),
          kB = kY.quaternion;
        (kW &&
          kB.x * kv[kW * 4 - 4] +
            kB.y * kv[kW * 4 - 3] +
            kB.z * kv[kW * 4 - 2] +
            kB.w * kv[kW * 4 - 1] <
            0 &&
          kB.set(-kB.x, -kB.y, -kB.z, -kB.w),
          kB.toArray(kv, kW * 4));
      }
      for (let kG of kb) kX.get(kG).position.toArray(kx.get(kG), kW * 3);
    }
    (kK.stopAllAction(), kK.uncacheRoot(kZ));
    let ky = [];
    for (let [kg, kI] of kL)
      ky.push(new kE['QuaternionKe' + 'yframeTrack'](kg + '.quaternion', kA, kI));
    for (let [kh, kN] of kx) ky.push(new kE['VectorKeyfra' + 'meTrack'](kh + '.position', kA, kN));
    return new kE['AnimationCli' + 'p'](kf.name, kf.duration, ky);
  }
  function kp() {
    let kf = kC(kR);
    kf.updateMatrixWorld(!0);
    let kJ = new Map();
    kf.traverse((kZ) => {
      kZ.isBone && !kJ.has(kZ.name) && kJ.set(kZ.name, kZ);
    });
    for (let kZ of kc.order) {
      let kU = kJ.get(kZ);
      kU &&
        (kU.parent.updateWorldMatrix(!0, !1),
        new kE.Matrix4()
          .copy(kU.parent.matrixWorld)
          .invert()
          .multiply(kS.frames.get(kZ))
          .decompose(kU.position, kU.quaternion, kU.scale),
        kU.updateMatrixWorld(!0));
    }
    return kf;
  }
  return {
    scene: kD,
    companion: kl,
    overlay: kQ,
    drive: kj,
    bake: kz,
    exportScene: kp,
    plan: kc,
    names: kS.names,
    scale: kS.stats?.scale ?? 1,
    driverFor: (kf, kJ) => hn(kc, kf, kJ, kH, kE),
  };
}
function Yo(kD, km, kS) {
  let { map: kE, frames: kF, place: kC, align: ks } = km,
    kH = new Map(Object.entries(kE).map(([kz, kp]) => [kp, kz])),
    ka = (kz) => new kS['Matrix4']().multiplyMatrices(kC, kF.get(kz)),
    ke = (kz) => new kS['Quaternion']().setFromRotationMatrix(new kS.Matrix4().extractRotation(kz));
  kD.updateMatrixWorld(!0);
  let kR = [];
  kD.traverse((kz) => {
    kz.isBone && kF.has(kz.name) && kR.push(kz);
  });
  let kl = new Map(),
    kQ = new kS['Vector3'](),
    kc = new kS['Quaternion'](),
    kj = new kS['Vector3']();
  for (let kz of kR) {
    let kp = kz.parent?.isBone && kl.has(kz.parent.name) ? kz.parent.name : null,
      kO = kp
        ? kl
            .get(kp)
            .clone()
            .multiply(ka(kp).invert().multiply(ka(kz.name)))
        : ka(kz.name),
      kf = kH.get(kz.name);
    if (kf) {
      kO.decompose(kQ, kc, kj);
      let kZ = ks.S.get(kf) ?? new kS['Quaternion']();
      kO.compose(
        kQ,
        kZ
          .clone()
          .invert()
          .multiply(ke(ka(kz.name))),
        kj,
      );
    }
    kl.set(kz.name, kO);
    let kJ = kp ? kl.get(kp) : kz.parent.matrixWorld;
    new kS['Matrix4']()
      .copy(kJ)
      .invert()
      .multiply(kO)
      .decompose(kz.position, kz.quaternion, kz.scale);
  }
  kD.updateMatrixWorld(!0);
}
function ya(kD, km, kS, kE) {
  let kF = [];
  kD.traverse((kH) => {
    kH.isMesh && kF.push(kH);
  });
  for (let kH of kF) kH.removeFromParent();
  let kC = new kE['Group']();
  ((kC.name = '__character__'),
    kS.place.decompose(kC.position, kC.quaternion, kC.scale),
    kC.add(km.scene),
    km.scene.traverse((ka) => {
      ka.isMesh && (ka.frustumCulled = !1);
    }),
    kC.updateMatrixWorld(!0));
  let ks = kS.skeletonOnly ? new kE['SkeletonHelp' + 'er'](km.scene) : null;
  return { scene: kD, companion: kC, overlay: ks, drive() {}, preview: !0 };
}
var fn = 30,
  Zo = Object.freeze(['locomotion', 'hips']),
  Xo = new WeakMap();
function Ko({
  buffer: kD,
  file: km = null,
  take: kS = null,
  sourceRig: kE,
  ourRig: kF,
  boneMap: kC,
  THREE: ks,
  FBXLoader: kH,
  name: ka = 'imported',
  mode: ke = 'locomotion',
  footIk: kR = !0,
}) {
  if ((!km && (!kD || !kH)) || !kE || !kF || !kC || !ks)
    throw new Error('importMixamoClip is missing something it needs');
  km ??= new kH().parse(kD, '');
  let kl = km.animations ?? [];
  if (!kl.length) throw new Error('There is no animation in that file');
  let kQ = kS ?? Qt(kl);
  if (kQ.duration < 0.1)
    throw new Error(
      'That animation is only ' +
        kQ.duration.toFixed(2) +
        's \u2014 it looks like a T-pose download rather than a motion',
    );
  let kc = Xo.get(kE);
  kc ||
    ((kc = []),
    kE.traverse((ku) => {
      ku.isBone && kc.push([ku, ku.position.clone(), ku.quaternion.clone(), ku.scale.clone()]);
    }),
    Xo.set(kE, kc));
  for (let [ku, kd, kK, kT] of kc)
    (ku.position.copy(kd), ku.quaternion.copy(kK), ku.scale.copy(kT));
  (kE.traverse((kA) => {
    kA.isSkinnedMesh && kA.skeleton.pose();
  }),
    kE.updateMatrixWorld(!0),
    kF.updateMatrixWorld(!0));
  let kj = new Set();
  kE.traverse((kA) => {
    kA.name && kj.add(kA.name);
  });
  let kz = kQ.tracks.filter((kA) => kj.has(kA.name.split('.')[0])).length;
  if (!kz)
    throw new Error('None of those bones match the Mixamo skeleton \u2014 is it a Mixamo export?');
  let kp = er(km, kE, ks),
    kO = kQ;
  if (Math.abs(kp - 1) > 0.002) {
    kO = kQ.clone();
    let kA = kO.tracks.find((kX) => kX.name === 'mixamorigHips.position');
    if (kA) {
      for (let kX = 0; kX < kA.values.length; kX++) kA.values[kX] *= kp;
    }
  }
  let { scale: kf, proportion: kJ } = H({
      sourceRoot: kE,
      targetRoot: kF,
      THREE: ks,
      bones: {
        sourceHip: 'mixamorigHips',
        sourceAnkle: 'mixamorigLeftFoot',
        targetHip: 'pelvis',
        targetAnkle: 'foot_l',
        units: 0.01,
      },
    }),
    kZ = s({
      clip: kO,
      sourceRoot: kE,
      targetRoot: kF,
      map: kC,
      THREE: ks,
      fps: fn,
      hip: 'mixamorigHips',
      travelScale: kf,
      name: ka,
      footIk: kR ? mn(kC) : null,
    }),
    kU = gn(kZ, kF, ks, ke);
  return {
    clip: kZ,
    info: {
      takes: kl.length,
      boundTracks: kz,
      sourceTracks: kQ.tracks.length,
      tracks: kZ.tracks.length,
      duration: kZ.duration,
      proportion: kJ,
      travelScale: kf,
      sizeFit: kp,
      mode: ke,
      travel: kU,
    },
  };
}
function er(kD, km, kS) {
  let kE = (kQ) => {
      if (typeof kQ?.traverse != 'function') return null;
      let kc = new Map();
      kQ.traverse((kf) => {
        kf.name && !kc.has(kf.name) && kc.set(kf.name, kf);
      });
      let kj = 0,
        kz = 0,
        kp = 0,
        kO = 0;
      for (let kf of ['Left', 'Right']) {
        let kJ = kc.get('mixamorig' + kf + 'UpLeg'),
          kZ = kc.get('mixamorig' + kf + 'Leg'),
          kU = kc.get('mixamorig' + kf + 'Foot');
        if (!kJ || !kZ || !kU) continue;
        ((kj += Math.abs(kJ.position.y) + kZ.position.length() + kU.position.length()), kp++);
        let ku = kc.get('mixamorig' + kf + 'ToeBase');
        ku && ((kz += ku.position.length()), kO++);
      }
      return kp && kj > 1e-9 ? { leg: kj / kp, foot: kO ? kz / kO : 0, at: kc } : null;
    },
    kF = kE(kD),
    kC = kE(km);
  if (!kF || !kC) return 1;
  let ks = new kS.Vector3(),
    kH = kC.at.get('mixamorigHips')?.getWorldPosition(ks).y,
    ka = ['Left', 'Right']
      .map((kQ) => kC.at.get('mixamorig' + kQ + 'Foot')?.getWorldPosition(ks).y)
      .filter(Number.isFinite);
  if (!(kH > 0) || !ka.length) return 1;
  let ke = ka.reduce((kQ, kc) => kQ + kc, 0) / ka.length,
    kR = kF.leg / kC.leg,
    kl = (kH - ke) * kR + ke * (kF.foot > 0 && kC.foot > 0 ? kF.foot / kC.foot : kR);
  return kl > 1e-9 ? kH / kl : 1;
}
function mn(kD) {
  return ['foot_l', 'foot_r']
    .map((km) => ({ foot: km, sourceFoot: Object.keys(kD).find((kS) => kD[kS] === km) }))
    .filter((km) => km.sourceFoot);
}
function Go(kD, km = null) {
  let kS = (kE) => kD.has(kE);
  if (km?.size && kS('Head')) {
    let kE = 0;
    for (let kF of km) kD.has(kF) && kE++;
    if (kE / km.size >= 0.85) return 'default';
  }
  return [...kD].some((kC) => /^mixamorig/i.test(kC))
    ? 'mixamo'
    : kS('CC_Base_Hip') && kS('CC_Base_BoneRoot')
      ? 'reallusion'
      : kS('pelvis') && kS('head') && kS('spine_05')
        ? 'ue5'
        : kS('pelvis') && kS('head') && kS('spine_03')
          ? 'ue4'
          : null;
}
var wn = 0.1;
function Jo(kD) {
  return (kD?.animations ?? [])
    .filter((km) => km.duration >= wn)
    .map((km) => ({ clip: km, name: String(km.name || 'take').replace(/^.*\|/, '') || 'take' }));
}
var Qt = (kD) => kD.reduce((km, kS) => (kS.duration > km.duration ? kS : km));
function Ro({ file: kD, take: km = null, ourRig: kS, THREE: kE, name: kF = 'imported' }) {
  if (!kD || !kS || !kE) throw new Error('importNativeClip is missing something it needs');
  let kC = kD.animations ?? [];
  if (!kC.length) throw new Error('There is no animation in that file');
  let ks = km ?? Qt(kC);
  if (ks.duration < wn)
    throw new Error(
      'That animation is only ' +
        ks.duration.toFixed(2) +
        's \u2014 it looks like a pose rather than a motion',
    );
  kS.updateMatrixWorld(!0);
  let kH = new Map();
  kS.traverse((kZ) => {
    kZ.isBone && !kH.has(kZ.name) && kH.set(kZ.name, kZ);
  });
  let ka = tr(kD, kH, kE),
    ke = 1 / 0;
  for (let kZ of ks.tracks) kZ.times.length && (ke = Math.min(ke, kZ.times[0]));
  if (
    (Number.isFinite(ke) || (ke = 0),
    !ks.tracks.some((kU) => kH.has(kU.name.slice(0, kU.name.lastIndexOf('.')))))
  )
    throw new Error('None of those bones are on our skeleton');
  let kR = new Map(ks.tracks.map((kU) => [kU.name, kU])),
    kl = ka.top + '.position',
    kQ = ka.top + '.quaternion',
    kc = ka.parentName
      ? ['position', 'quaternion', 'scale'].map((kU) => kR.get(ka.parentName + '.' + kU) ?? null)
      : [null, null, null],
    kj = !ka.passThrough || kc.some(Boolean),
    kz = [],
    kp = 0;
  for (let kU of ks.tracks) {
    let ku = kU.name.lastIndexOf('.'),
      kd = kU.name.slice(0, ku),
      kK = kU.name.slice(ku + 1);
    if (!kH.has(kd)) {
      kd !== ka.parentName && kp++;
      continue;
    }
    if (kj && (kU.name === kl || kU.name === kQ)) continue;
    let kT = kU.clone();
    if (kK === 'position' && ka.scale !== 1) {
      for (let kA = 0; kA < kT.values.length; kA++) kT.values[kA] *= ka.scale;
    }
    kz.push(kT);
  }
  if ((kj && kz.push(...nr(kR.get(kl) ?? null, kR.get(kQ) ?? null, kc, ka, kE)), !kz.length))
    throw new Error('None of those bones are on our skeleton');
  if (ke > 0.000001) {
    for (let kX of kz) for (let kL = 0; kL < kX.times.length; kL++) kX.times[kL] -= ke;
  }
  let kO = new kE['AnimationCli' + 'p'](kF, -1, kz),
    kf = kz.find((kb) => kb.name === ka.top + '.position'),
    kJ = 0;
  if (kf) {
    let kb = kf.values;
    for (let kx = 3; kx < kb.length; kx += 3)
      kJ = Math.max(kJ, Math.hypot(kb[kx] - kb[0], kb[kx + 1] - kb[1], kb[kx + 2] - kb[2]));
  }
  return {
    clip: kO,
    info: {
      source: 'default',
      takes: kC.length,
      boundTracks: kz.length,
      sourceTracks: ks.tracks.length,
      dropped: kp,
      tracks: kz.length,
      duration: kO.duration,
      mode: 'native',
      scale: ka.scale,
      turn: ka.turnDeg,
      folded: kc.filter(Boolean).length,
      travel:
        kJ > 0.01
          ? { moved: !0, distance: kJ, reason: 'root motion from the file' }
          : { moved: !1, reason: 'in place' },
    },
  };
}
function tr(kD, km, kS) {
  let kE = new Map(),
    kF = (kp, kO) => {
      kp.isBone &&
        (!kE.has(kp.name) || kE.get(kp.name).depth > kO) &&
        kE.set(kp.name, { bone: kp, depth: kO });
      for (let kf of kp.children ?? []) kF(kf, kO + 1);
    };
  typeof kD.traverse == 'function' && kF(kD, 0);
  let kC = [];
  for (let [kp, kO] of km) {
    let kf = kE.get(kp)?.bone;
    if (!kf) continue;
    let kJ = kO.position.length(),
      kZ = kf.position.length();
    kJ > 0.0001 && kZ > 1e-9 && kC.push(kJ / kZ);
  }
  kC.sort((kU, ku) => kU - ku);
  let ks = kC.length ? kC[Math.floor(kC.length / 2)] : 1,
    kH = Math.abs(ks - 1) < 0.01 ? 1 : ks,
    ka = [...km.values()].find((kU) => !kU.parent?.isBone),
    ke = ka ? kE.get(ka.name)?.bone : null,
    kR = ke?.parent && !ke.parent.isBone ? ke.parent : null,
    kl = (kU) => new kS.Matrix4().compose(kU.position, kU.quaternion, kU.scale),
    kQ = kR ? kl(kR) : new kS['Matrix4'](),
    kc = ka
      ? kl(ka).multiply(
          kQ
            .clone()
            .multiply(ke ? kl(ke) : new kS['Matrix4']())
            .invert(),
        )
      : new kS['Matrix4'](),
    kj =
      !ke ||
      kc.elements.every((kU, ku) => Math.abs(kU - new kS['Matrix4']().elements[ku]) < 0.000001),
    kz = new kS['Quaternion']();
  return (
    kc.decompose(new kS['Vector3'](), kz, new kS['Vector3']()),
    {
      scale: kH,
      top: ka?.name ?? 'root',
      C: kc,
      passThrough: kj,
      parentName: kR?.name || null,
      parentRest: {
        position: kR?.position ?? new kS['Vector3'](),
        quaternion: kR?.quaternion ?? new kS['Quaternion'](),
        scale: kR?.scale ?? new kS.Vector3(1, 1, 1),
      },
      topRest: {
        position: ke?.position ?? new kS['Vector3'](),
        quaternion: ke?.quaternion ?? new kS['Quaternion'](),
        scale: ke?.scale ?? new kS['Vector3'](1, 1, 1),
      },
      turnDeg: kj ? 0 : (2 * Math.acos(Math.min(1, Math.abs(kz.w))) * 180) / Math.PI,
    }
  );
}
function nr(kD, km, [kS, kE, kF], kC, ks) {
  let kH = [kD, km, kS, kE, kF].filter(Boolean),
    ka = [...new Set(kH.flatMap((kT) => [...kT.times]))].sort((kT, kA) => kT - kA);
  ka.length || ka.push(0);
  let ke = (kT, kA) => {
      if (!kT) return () => kA;
      let kX = kT.createInterpolant(),
        kL = kA.clone();
      return (kb) => kL.fromArray(kX.evaluate(kb));
    },
    kR = ke(kD, kC.topRest.position),
    kl = ke(km, kC.topRest.quaternion),
    kQ = ke(kS, kC.parentRest.position),
    kc = ke(kE, kC.parentRest.quaternion),
    kj = ke(kF, kC.parentRest.scale),
    kz = new ks['Vector3'](1, 1, 1),
    kp = new Float32Array(ka.length * 3),
    kO = new Float32Array(ka.length * 4),
    kf = new ks['Matrix4'](),
    kJ = new ks['Matrix4'](),
    kZ = new ks['Matrix4'](),
    kU = new ks['Vector3'](),
    ku = new ks.Quaternion(),
    kd = new ks.Vector3(),
    kK = new ks['Quaternion']();
  for (let kT = 0; kT < ka.length; kT++) {
    let kA = ka[kT];
    (kf.compose(kQ(kA).clone(), kc(kA).clone().normalize(), kj(kA).clone()),
      kJ.compose(kR(kA).clone(), kl(kA).clone().normalize(), kz),
      kZ.copy(kC.C).multiply(kf).multiply(kJ).decompose(kU, ku, kd),
      kU.multiplyScalar(kC.scale).toArray(kp, kT * 3),
      kT && kK.dot(ku) < 0 && ku.set(-ku.x, -ku.y, -ku.z, -ku.w),
      ku.toArray(kO, kT * 4),
      kK.copy(ku));
  }
  return [
    new ks['VectorKeyfra' + 'meTrack'](kC.top + '.position', new Float32Array(ka), kp),
    new ks['QuaternionKe' + 'yframeTrack'](kC.top + '.quaternion', new Float32Array(ka), kO),
  ];
}
function Eo({
  file: kD,
  take: km = null,
  def: kS,
  sourceRig: kE,
  ourRig: kF,
  boneMap: kC,
  THREE: ks,
  name: kH = 'imported',
  mode: ka = 'locomotion',
  footIk: ke = !0,
}) {
  if (!kD || !kS || !kE || !kF || !kC || !ks)
    throw new Error('importForeignClip is missing something it needs');
  let kR = kD.animations ?? [];
  if (!kR.length) throw new Error('There is no animation in that file');
  let kl = km ?? Qt(kR);
  if (kl.duration < 0.1)
    throw new Error(
      'That animation is only ' +
        kl.duration.toFixed(2) +
        's \u2014 it looks like a pose rather than a motion',
    );
  let kQ = new Map();
  kE.traverse((kU) => {
    kU.isBone && !kQ.has(kU.name) && kQ.set(kU.name, kU);
  });
  for (let [kU, ku] of Object.entries(kS.pose ?? {}))
    kQ.get(kU)?.quaternion.multiply(
      new ks['Quaternion']().setFromEuler(new ks['Euler'](...ku.map(ks.MathUtils.degToRad))),
    );
  (kE.updateMatrixWorld(!0), kF.updateMatrixWorld(!0));
  let kc = kl.tracks.filter((kd) => kQ.has(kd.name.split('.')[0])).length;
  if (!kc) throw new Error('None of those bones match the ' + kS.label + ' skeleton');
  let { scale: kj, proportion: kz } = H({
      sourceRoot: kE,
      targetRoot: kF,
      THREE: ks,
      bones: {
        sourceHip: kS.hip,
        sourceAnkle: kS.ankle,
        targetHip: 'pelvis',
        targetAnkle: 'foot_l',
        units: 1 / kS.units,
      },
    }),
    kp = Object.keys(kC).find((kd) => kC[kd] === 'root'),
    kO = s({
      clip: kl,
      sourceRoot: kE,
      targetRoot: kF,
      map: kC,
      THREE: ks,
      fps: fn,
      hip: kS.hip,
      root: kp ?? null,
      travelScale: kj,
      name: kH,
      footIk: ke ? mn(kC) : null,
    }),
    kf = kl.tracks.find((kd) => kd.name === kp + '.position'),
    kJ = 0;
  if (kf) {
    let kd = kf.values;
    for (let kK = 3; kK < kd.length; kK += 3)
      kJ = Math.max(kJ, Math.hypot(kd[kK] - kd[0], kd[kK + 1] - kd[1], kd[kK + 2] - kd[2]));
  }
  let kZ =
    kJ * kj > 0.01
      ? { moved: !0, distance: kJ * kj, reason: 'root motion from the file' }
      : gn(kO, kF, ks, ka);
  return {
    clip: kO,
    info: {
      source: kS.map,
      takes: kR.length,
      boundTracks: kc,
      sourceTracks: kl.tracks.length,
      tracks: kO.tracks.length,
      duration: kO.duration,
      proportion: kz,
      travelScale: kj,
      mode: ka,
      travel: kZ,
    },
  };
}
var To = new WeakMap();
function Ho({
  file: kD,
  take: km = null,
  rig: kS,
  ourRig: kE,
  THREE: kF,
  name: kC = 'imported',
  mode: ks = 'locomotion',
  footIk: kH = !0,
}) {
  let { gltf: ka, report: ke } = kS ?? {};
  if (!kD || !ka || !ke?.ready || !kE || !kF)
    throw new Error('importCustomClip is missing something it needs');
  let kR = kD.animations ?? [];
  if (!kR.length) throw new Error('There is no animation in that file');
  let kl = km ?? Qt(kR);
  if (kl.duration < wn)
    throw new Error(
      'That animation is only ' +
        kl.duration.toFixed(2) +
        's \u2014 it looks like a pose rather than a motion',
    );
  let kQ = To.get(ka);
  if (!kQ) {
    let kX = new kF['Group']();
    (ke.place.decompose(kX.position, kX.quaternion, kX.scale),
      ka.scene.parent?.remove(ka.scene),
      kX.add(ka.scene));
    let kL = [];
    (ka.scene.traverse((kb) =>
      kL.push([kb, kb.position.clone(), kb.quaternion.clone(), kb.scale.clone()]),
    ),
      (kQ = { group: kX, kept: kL }),
      To.set(ka, kQ));
  }
  for (let [kb, kx, ky, kW] of kQ.kept)
    (kb.position.copy(kx), kb.quaternion.copy(ky), kb.scale.copy(kW));
  Yo(ka.scene, ke, kF);
  let kc = new Map();
  ka.scene.traverse((kq) => {
    kq.isBone && !kc.has(kq.name) && kc.set(kq.name, kq);
  });
  let kj = new Map([...kc.keys()].map((kq) => [Ge(kq), kq])),
    kz = [];
  for (let kq of kl.tracks) {
    let kP = kq.name.lastIndexOf('.'),
      kY = kq.name.slice(0, kP),
      kv = kq.name.slice(kP + 1),
      kB = kc.has(kY) ? kY : kj.get(Ge(kY));
    if (!kB) continue;
    let kG = kq.clone();
    ((kG.name = kB + '.' + kv), kz.push(kG));
  }
  if (!kz.length)
    throw new Error(
      'None of those bones are on ' + (kS.name ?? 'that character') + '\u2019s skeleton',
    );
  let kp = new kF.AnimationClip(kl.name, kl.duration, kz),
    kO = {};
  for (let [kg, kI] of Object.entries(ke.map)) kc.has(kI) && (kO[kI] = kg);
  let kf = ke.map.pelvis,
    kJ = ke.map.root && kc.has(ke.map.root) ? ke.map.root : null;
  kE.updateMatrixWorld(!0);
  let { scale: kZ, proportion: kU } = H({
      sourceRoot: kQ.group,
      targetRoot: kE,
      THREE: kF,
      bones: {
        sourceHip: kf,
        sourceAnkle: ke.map.foot_l,
        targetHip: 'pelvis',
        targetAnkle: 'foot_l',
      },
    }),
    ku = s({
      clip: kp,
      sourceRoot: kQ.group,
      targetRoot: kE,
      map: kO,
      THREE: kF,
      fps: fn,
      hip: kf,
      root: kJ,
      travelScale: kZ,
      name: kC,
      footIk: kH ? mn(kO) : null,
    }),
    kd = kJ ? kp.tracks.find((kh) => kh.name === kJ + '.position') : null,
    kK = 0;
  if (kd) {
    let kh = kd.values;
    for (let kN = 3; kN < kh.length; kN += 3)
      kK = Math.max(kK, Math.hypot(kh[kN] - kh[0], kh[kN + 1] - kh[1], kh[kN + 2] - kh[2]));
  }
  let kT = kK * (ke.stats?.scale ?? 1) * kZ,
    kA =
      kT > 0.01
        ? { moved: !0, distance: kT, reason: 'root motion from the file' }
        : gn(ku, kE, kF, ks);
  return {
    clip: ku,
    info: {
      source: 'custom',
      takes: kR.length,
      boundTracks: kz.length,
      sourceTracks: kl.tracks.length,
      tracks: ku.tracks.length,
      duration: ku.duration,
      proportion: kU,
      travelScale: kZ,
      mode: ks,
      travel: kA,
    },
  };
}
function gn(kD, km, kS, kE) {
  let kF = kD.tracks.find((kf) => kf.name === 'pelvis.position');
  if (!kF) return { moved: !1, reason: 'no hip translation in the clip' };
  if (kE === 'hips') return { moved: !1, reason: 'left on the hips, as asked' };
  let kC = (kf) => {
      let kJ = null;
      return (
        km.traverse((kZ) => {
          !kJ && kZ.name === kf && (kJ = kZ);
        }),
        kJ
      );
    },
    ks = kC('root'),
    kH = kC('pelvis');
  if (!ks || !kH) return { moved: !1, reason: 'this rig has no root bone' };
  let ka = kH.position.clone(),
    ke = ks.position.clone(),
    kR = ks.quaternion.clone(),
    kl = kF.times.length,
    kQ = new Float32Array(kl * 3),
    kc = new Float32Array(kl * 3),
    kj = new kS['Vector3'](),
    kz = 0;
  for (let kf = 0; kf < kl; kf++) {
    let kJ = kF.values[kf * 3] - ka.x,
      kZ = kF.values[kf * 3 + 1] - ka.y,
      kU = kF.values[kf * 3 + 2] - ka.z;
    (kj.set(kJ, kZ, 0).applyQuaternion(kR),
      (kc[kf * 3] = ke.x + kj.x),
      (kc[kf * 3 + 1] = ke.y + kj.y),
      (kc[kf * 3 + 2] = ke.z + kj.z),
      (kQ[kf * 3] = ka.x),
      (kQ[kf * 3 + 1] = ka.y),
      (kQ[kf * 3 + 2] = ka.z + kU),
      (kz = Math.max(kz, Math.hypot(kJ, kZ))));
  }
  kF.values.set(kQ);
  let kp = new kS['VectorKeyfra' + 'meTrack']('root.position', new Float32Array(kF.times), kc),
    kO = kD.tracks.findIndex((ku) => ku.name === 'root.position');
  return (kO >= 0 ? (kD.tracks[kO] = kp) : kD.tracks.push(kp), { moved: !0, distance: kz });
}
var kt = Object.freeze([
    {
      id: '16:9',
      label: '16:9',
      ratio: 16 / 9,
      res: [1920, 1080],
      hint: 'Widescreen: film, video, most screens',
    },
    {
      id: '2.39:1',
      label: '2.39:1',
      ratio: 2.39,
      res: [2048, 858],
      hint: 'Cinema scope: the wide film frame',
    },
    {
      id: '4:5',
      label: '4:5',
      ratio: 4 / 5,
      res: [1080, 1350],
      hint: 'A tall frame: portraits, social posts',
    },
    { id: '1:1', label: '1:1', ratio: 1, res: [1080, 1080], hint: 'Square' },
  ]),
  or = (kD) => kt.find((km) => km.id === kD) ?? kt[0],
  Ca = (kD, km) => kt.find((kS) => Math.abs(kD / km - kS.ratio) < 0.004)?.id ?? 'custom',
  nt = 36,
  ir = 8,
  rr = 300,
  ot = 180 / Math.PI,
  $e = (kD, km, kS) => Math.min(kS, Math.max(km, kD)),
  xe = (kD, km) => (Number.isFinite(Number(kD)) && kD !== null && kD !== '' ? Number(kD) : km);
function ar(kD, km = nt) {
  return 2 * Math.atan($e(xe(km, nt), 1, 200) / 2 / $e(xe(kD, 50), 1, 5000)) * ot;
}
function Oa(kD, km = nt) {
  return $e(xe(km, nt), 1, 200) / 2 / Math.tan($e(xe(kD, 40), 0.1, 179) / ot / 2);
}
function Ia(kD, km, kS = nt) {
  let kE = ar(kD, kS) / ot;
  return (km >= 1 ? 2 * Math.atan(Math.tan(kE / 2) / km) : kE) * ot;
}
function ei(kD, km, kS = nt) {
  let kE = $e(xe(kD, 40), 0.1, 179) / ot / 2;
  return $e(xe(kS, nt), 1, 200) / 2 / (km >= 1 ? Math.tan(kE) * km : Math.tan(kE));
}
var La = (kD, km) => (km >= 1 ? kD / km : kD);
function Fa(kD, km, kS, kE = 0.05) {
  let kF = Math.max(1, kD),
    kC = Math.max(1, km),
    ks = { w: kF * (1 - 2 * kE), h: kC * (1 - 2 * kE) },
    kH = Math.min(ks.w, ks.h * kS),
    ka = kH / kS;
  return { x: (kF - kH) / 2, y: (kC - ka) / 2, w: kH, h: ka };
}
function Wa(kD, km, kS) {
  let kE = $e(xe(kD, 40), 0.1, 179) / ot / 2;
  return 2 * Math.atan((Math.tan(kE) * Math.max(1, km)) / Math.max(1, kS)) * ot;
}
var sr = (kD, km) => [kD[0] - km[0], kD[1] - km[1], kD[2] - km[2]],
  yn = (kD, km) => [
    kD[1] * km[2] - kD[2] * km[1],
    kD[2] * km[0] - kD[0] * km[2],
    kD[0] * km[1] - kD[1] * km[0],
  ],
  ti = (kD) => Math.hypot(kD[0], kD[1], kD[2]),
  bn = (kD) => {
    let km = ti(kD) || 1;
    return [kD[0] / km, kD[1] / km, kD[2] / km];
  },
  lr = (kD, km, kS = 1) => [kD[0] + km[0] * kS, kD[1] + km[1] * kS, kD[2] + km[2] * kS];
function ja(kD, km, kS = 0) {
  let kE = bn(sr(km, kD)),
    kF = yn(kE, [0, 1, 0]);
  (ti(kF) < 0.000001 && (kF = yn(kE, [0, 0, -1])), (kF = bn(kF)));
  let kC = yn(kF, kE),
    ks = xe(kS, 0) / ot;
  return bn(
    lr([kC[0] * Math.cos(ks), kC[1] * Math.cos(ks), kC[2] * Math.cos(ks)], kF, Math.sin(ks)),
  );
}
function Ba(kD, km, kS) {
  let kE = Math.max(km, kS);
  return { x: xe(kD.shiftX, 0) * kE, y: -xe(kD.shiftY, 0) * kE };
}
var za = Object.freeze([
    { id: 'close', label: 'Close-up', hint: 'The head and shoulders' },
    { id: 'medium', label: 'Medium', hint: 'From the waist up' },
    { id: 'wide', label: 'Wide', hint: 'The whole figure, with room round it' },
    {
      id: 'ots',
      label: 'Over shoulder',
      hint: 'From behind the shoulder, at what the character faces',
    },
    { id: 'low', label: 'Low angle', hint: 'From near the floor, looking up' },
    { id: 'high', label: 'High angle', hint: 'From above, looking down' },
    { id: 'front', label: 'Front', hint: 'Square to its front, with no perspective' },
    { id: 'side', label: 'Side', hint: 'Square to its right side, with no perspective' },
    { id: 'back', label: 'Back', hint: 'Square to its back, with no perspective' },
  ]),
  Na = Object.freeze([
    {
      id: 'front',
      label: 'Front',
      hint: 'Look at the character square to its front, with no perspective. Turn the view with the mouse, or press this again, and it is the ordinary view',
    },
    {
      id: 'side',
      label: 'Side',
      hint: 'Look at the character square to its right side, with no perspective',
    },
    {
      id: 'back',
      label: 'Back',
      hint: 'Look at the character square to its back, with no perspective',
    },
    {
      id: 'top',
      label: 'Top',
      hint: 'Look at the character from straight above, with no perspective: its front toward you',
    },
  ]);
function ni(kD) {
  let km = (ks, kH) =>
      Array.isArray(ks) && ks.length >= 3 && ks.every(Number.isFinite) ? [ks[0], ks[1], ks[2]] : kH,
    kS = or(kD?.frame),
    kE = Math.round($e(xe(kD?.resX, kS.res[0]), 16, 16384)),
    kF = Math.round($e(xe(kD?.resY, kS.res[1]), 16, 16384)),
    kC = $e(xe(kD?.clipStart, 0.05), 0.001, 1000);
  return {
    position: km(kD?.position, [1.7, 1.45, 3.6]),
    target: km(kD?.target, [0, 1, 0]),
    roll: $e(xe(kD?.roll, 0), -180, 180),
    type: kD?.type === 'ortho' ? 'ortho' : 'persp',
    lens: $e(xe(kD?.lens, 50), ir, rr),
    sensor: $e(xe(kD?.sensor, nt), 4, 100),
    orthoScale: $e(xe(kD?.orthoScale, 4), 0.05, 1000),
    resX: kE,
    resY: kF,
    resPct: Math.round($e(xe(kD?.resPct, 100), 1, 400)),
    clipStart: kC,
    clipEnd: $e(xe(kD?.clipEnd, 500), kC + 0.01, 100000),
    shiftX: $e(xe(kD?.shiftX, 0), -2, 2),
    shiftY: $e(xe(kD?.shiftY, 0), -2, 2),
  };
}
var cr = 0.6,
  pr = 12;
function ur(kD) {
  let km = kt.find((kE) => Math.abs(kE.ratio - kD) < 0.01);
  if (km) return km.res;
  let kS = (kE) => Math.max(16, Math.round(kE / 2) * 2);
  return kD >= 1 ? [1920, kS(1920 / kD)] : [kS(1920 * kD), 1920];
}
function oi({ file: kD, take: km = null, ourRig: kS, THREE: kE }) {
  let kF = null;
  if (
    (kD.traverse((kh) => {
      !kF && kh.isCamera && (kF = kh);
    }),
    !kF)
  )
    return null;
  (kD.updateMatrixWorld(!0), kS.updateMatrixWorld(!0));
  let kC = new Map();
  for (let kh of km?.tracks ?? []) {
    let kN = kh.name.lastIndexOf('.'),
      kM = kh.name.slice(0, kN),
      w0 = kh.name.slice(kN + 1);
    kN > 0 && kC.set(kM, { ...(kC.get(kM) ?? {}), [w0]: kh });
  }
  let ks = new Set();
  for (let w1 = kF; w1; w1 = w1.parent) ks.add(w1);
  let kH = [];
  if (
    (kD.traverse((w2) => {
      kC.has(w2.name) && !ks.has(w2) && kH.push(w2);
    }),
    kH.length ||
      kD.traverse((w2) => {
        w2.isBone && kH.push(w2);
      }),
    kH.length ||
      kD.traverse((w2) => {
        w2 !== kD && !ks.has(w2) && !w2.isCamera && !w2.isLight && kH.push(w2);
      }),
    !kH.length)
  )
    return null;
  let ka = (w2) => {
      let w3 = 0;
      for (let w4 = w2.parent; w4; w4 = w4.parent) w3++;
      return w3;
    },
    ke = kH.reduce((w2, w3) => (ka(w3) < ka(w2) ? w3 : w2)),
    kR = new kE.Matrix4().copy((ke.parent ?? kD).matrixWorld).invert(),
    kl = new kE['Vector3'](),
    kQ = (w2, w3) => {
      let w4 = 1 / 0,
        w5 = -1 / 0;
      for (let w6 of w2)
        (w6.getWorldPosition(kl),
          w3 && kl.applyMatrix4(w3),
          (w4 = Math.min(w4, kl.y)),
          (w5 = Math.max(w5, kl.y)));
      return w5 - w4;
    },
    kc = [];
  kS.traverse((w2) => {
    w2.isBone && kc.push(w2);
  });
  let kj = kQ(kH, kR),
    kz = kQ(kc, null),
    kp = kj > 0.000001 && kz > 0.000001 ? kz / kj : 1,
    kO = [];
  for (let w2 = kF; w2 && w2 !== kD.parent; w2 = w2.parent) kO.unshift(w2);
  let kf = new kE.Matrix4(),
    kJ = new kE.Matrix4(),
    kZ = new kE.Vector3(),
    kU = new kE['Quaternion'](),
    ku = new kE.Vector3();
  kO[0]?.parent && kf.copy(kO[0].parent.matrixWorld);
  for (let w3 of kO) {
    let w4 = kC.get(w3.name) ?? {};
    (kZ.copy(w3.position),
      kU.copy(w3.quaternion),
      ku.copy(w3.scale),
      w4.position && kZ.fromArray(w4.position.values, 0),
      w4.quaternion && kU.fromArray(w4.quaternion.values, 0).normalize(),
      w4.scale && ku.fromArray(w4.scale.values, 0),
      kf.multiply(kJ.compose(kZ, kU, ku)));
  }
  kf.premultiply(kR);
  let kd = new kE['Vector3']().setFromMatrixPosition(kf).multiplyScalar(kp),
    kK = new kE.Matrix4().extractRotation(kf),
    kT = new kE['Vector3'](0, 0, -1).applyMatrix4(kK).normalize(),
    kA = new kE['Vector3'](0, 1, 0).applyMatrix4(kK).normalize();
  if (!Number.isFinite(kd.x + kd.y + kd.z + kT.x + kT.y + kT.z)) return null;
  let kX = new kE['Vector3'](0, kz / 2, 0),
    kL = Math.min(pr, Math.max(cr, kX.clone().sub(kd).dot(kT))),
    kb = kd.clone().addScaledVector(kT, kL),
    kx = new kE.Vector3().crossVectors(kT, new kE['Vector3'](0, 1, 0)),
    ky = 0;
  if (kx.lengthSq() > 1e-10) {
    kx.normalize();
    let w5 = new kE['Vector3']().crossVectors(kx, kT);
    ky = (Math.atan2(kA.dot(kx), kA.dot(w5)) * 180) / Math.PI;
  }
  let kW = !!kF.isOrthographicCamera,
    kq = kW ? Math.abs(kF.right - kF.left) : 0,
    kP = kW ? Math.abs(kF.top - kF.bottom) : 0,
    kY = kW
      ? kq > 1e-9 && kP > 1e-9
        ? kq / kP
        : 16 / 9
      : kF.aspect > 0.05 && kF.aspect < 20
        ? kF.aspect
        : 16 / 9,
    [kv, kB] = ur(kY),
    kG = Number.isFinite(kF.near) ? kF.near * kp : 0.05,
    kg = Number.isFinite(kF.far) ? kF.far * kp : 500,
    kI = (w6) => Math.round(w6 * 10000) / 10000;
  return ni({
    position: kd.toArray().map(kI),
    target: kb.toArray().map(kI),
    roll: Math.abs(ky) < 0.05 ? 0 : Math.round(ky * 10) / 10,
    type: kW ? 'ortho' : 'persp',
    ...(kW
      ? { orthoScale: kI(Math.max(kq, kP) * kp) }
      : { lens: Math.round(ei(kF.fov, kY) * 10) / 10 }),
    resX: kv,
    resY: kB,
    clipStart: kI(Math.max(0.001, kG)),
    clipEnd: kI(Math.min(100000, kg)),
  });
}
var dr = 1;
function ii(kD) {
  let km = new Uint8Array(kD.buffer, kD.byteOffset, kD.byteLength),
    kS = '';
  for (let kE = 0; kE < km.length; kE += 32768)
    kS += String.fromCharCode.apply(null, km.subarray(kE, kE + 32768));
  return btoa(kS);
}
function ri(kD) {
  let km = atob(kD),
    kS = new Uint8Array(km.length);
  for (let kE = 0; kE < km.length; kE++) kS[kE] = km.charCodeAt(kE);
  return new Float32Array(kS.buffer, kS.byteOffset, kS.length / 4);
}
var si = 'user.',
  se = (kD, km, kS) => {
    let kE = document.createElement(kD);
    return (km && (kE.className = km), kS != null && (kE.textContent = kS), kE);
  };
function ai(kD) {
  return (
    String(kD)
      .replace(/\.[^.]+$/, '')
      .replace(/[_-]+/g, ' ')
      .replace(/\s*\(\d+\)\s*$/, '')
      .trim() || 'imported'
  );
}
async function hr(kD, km, kS) {
  return si + li(km) + '_' + (await _n(new Uint8Array(kD), kS));
}
async function fr(kD, km, kS, kE) {
  return si + li(kS) + '_' + (await _n(new TextEncoder().encode(kD + '|' + km), kE));
}
var mr = (kD) => _n(new Uint8Array(kD), ''),
  li = (kD) =>
    kD
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '');
async function _n(kD, km) {
  if (globalThis.crypto?.subtle?.digest) {
    let kE = new Uint8Array(kD.length + km.length);
    kE.set(kD);
    for (let kC = 0; kC < km.length; kC++) kE[kD.length + kC] = km.charCodeAt(kC);
    let kF = await crypto.subtle.digest('SHA-256', kE);
    return [...new Uint8Array(kF).slice(0, 5)]
      .map((ks) => ks.toString(16).padStart(2, '0'))
      .join('');
  }
  let kS = 2166136261;
  for (let ks = 0; ks < kD.length; ks++) ((kS ^= kD[ks]), (kS = Math.imul(kS, 16777619) >>> 0));
  for (let kH = 0; kH < km.length; kH++)
    ((kS ^= km.charCodeAt(kH)), (kS = Math.imul(kS, 16777619) >>> 0));
  return kS.toString(16).padStart(8, '0');
}
function Ka(kD) {
  let km = kD instanceof Uint8Array ? kD : new Uint8Array(kD),
    kS = new DataView(km.buffer, km.byteOffset, km.byteLength);
  if (km.byteLength < 20 || kS.getUint32(0, !0) !== 1179937895) return null;
  let kE = JSON.parse(new TextDecoder().decode(km.subarray(20, 20 + kS.getUint32(12, !0))));
  return { meshes: kE.meshes?.length ?? 0, animations: kE.animations?.length ?? 0 };
}
var wr = (kD) => !!kD?.info?.animal;
function gr(kD, km, kS, kE, kF) {
  return {
    id: kD,
    name: km,
    at: Date.now(),
    thumb: kF || void 0,
    duration: kS.duration,
    source: kE.source ?? 'mixamo',
    info: { proportion: kE.proportion, mode: kE.mode, travel: kE.travel, from: kE.from },
    tracks: kS.tracks.map((kC) => ({
      name: kC.name,
      type: kC.ValueTypeName,
      times: kC.times,
      values: kC.values,
    })),
  };
}
function xn(kD, km) {
  let kS = {
      quaternion: km.QuaternionKeyframeTrack,
      vector: km.VectorKeyframeTrack,
      number: km.NumberKeyframeTrack,
      QuaternionKeyframeTrack: km.QuaternionKeyframeTrack,
      VectorKeyframeTrack: km.VectorKeyframeTrack,
      NumberKeyframeTrack: km.NumberKeyframeTrack,
    },
    kE = (kC) =>
      kC.endsWith('.quaternion')
        ? km.QuaternionKeyframeTrack
        : kC.endsWith('.position') || kC.endsWith('.scale')
          ? km.VectorKeyframeTrack
          : null,
    kF = [];
  for (let kC of kD.tracks) {
    let ks = kS[kC.type] ?? kE(kC.name);
    ks && kF.push(new ks(kC.name, kC.times, kC.values));
  }
  return new km['AnimationCli' + 'p'](kD.name, kD.duration, kF);
}
function Ga({
  bar: kD,
  panel: km,
  player: kS,
  assetRoot: kE,
  THREE: kF,
  onAdd: kC,
  onRemove: ks,
  selection: kH = null,
  onOpen: ka = null,
  customRig: ke = null,
}) {
  let kR = null,
    kl = [],
    kQ = Zo[0],
    kc = null,
    kj = null,
    kz = document.createElement('input');
  ((kz.type = 'file'),
    (kz.accept = '.fbx,.glb,model/gltf-binary,application/octet-stream'),
    (kz.multiple = !0),
    (kz.hidden = !0));
  let kp = se('button', 'af-import', 'Import animation');
  ((kp.type = 'button'),
    (kp.title =
      'Bring in an animation (FBX or GLB) on our own skeleton, Mixamo, Unreal (UE4 / UE5) or Reallusion (CC / ActorCore). Read on this machine \u2014 nothing is uploaded'),
    kp.addEventListener('click', () => {
      (ka?.(), kz.click());
    }),
    kD?.appendChild(kp),
    kD?.appendChild(kz),
    kz.addEventListener('change', async () => {
      let kB = [...(kz.files ?? [])];
      ((kz.value = ''), await kK(kB));
    }),
    km &&
      (km.addEventListener('dragover', (kB) => {
        [...(kB.dataTransfer?.types ?? [])].includes('Files') &&
          (kB.preventDefault(), km.classList.add('is-dropping'));
      }),
      km.addEventListener('dragleave', (kB) => {
        km.contains(kB.relatedTarget) || km.classList.remove('is-dropping');
      }),
      km.addEventListener('drop', async (kB) => {
        let kG = [...(kB.dataTransfer?.files ?? [])];
        kG.length && (kB.preventDefault(), km.classList.remove('is-dropping'), await kO(kG));
      })));
  async function kO(kB) {
    let kG = [...kB].filter((kg) => /\.(fbx|glb)$/i.test(kg.name));
    if (!kG.length) {
      kW('Animations come in as .fbx or .glb files', 5000);
      return;
    }
    await kK(kG);
  }
  async function kf(kB) {
    let { loadSkeleton: kG } = await import('../api/export.js'),
      kg = (await kG('mixamo', kE, kB)).clone(!0);
    return (kg.updateMatrixWorld(!0), kg);
  }
  async function kJ(kB = 'mixamo') {
    if (!kR) {
      let kg = await fetch(kE + '/manifests/bone-maps.json');
      if (!kg.ok) throw new Error('bone-maps.json returned ' + kg.status);
      kR = (await kg.json()).maps ?? {};
    }
    let kG = kR[kB]?.bones;
    if (!kG) throw new Error('No ' + kB + ' bone map');
    return kG;
  }
  async function kZ(kB) {
    kW('Reading ' + kB.name + '\u2026');
    try {
      let kG = kS.getReferenceRig?.() ?? kS.getRigRoot();
      if (!kG) throw new Error('The rig is still loading');
      let { clone: kg } = await import('../dependencies/skeleton-utils.js'),
        kI = kg(kG);
      (kI.traverse((wC) => {
        wC.isSkinnedMesh && wC.skeleton.pose();
      }),
        kI.updateMatrixWorld(!0));
      let kh = await kB.arrayBuffer(),
        kN = ai(kB.name),
        kM;
      if (/\.glb$/i.test(kB.name)) {
        let { GLTFLoader: wC } = await import('../dependencies/gltf-loader.js'),
          ws = await new wC().parseAsync(kh, '');
        ((kM = ws.scene), (kM.animations = ws.animations));
      } else {
        let { FBXLoader: wH } = await import('../dependencies/fbx-loader.js');
        try {
          kM = new wH().parse(kh, '');
        } catch {
          kM = new wH().parse(a(new Uint8Array(kh)), '');
        }
      }
      let w0 = new Set();
      kM.traverse((wR) => {
        wR.name && w0.add(wR.name);
      });
      let w1 = new Set();
      kI.traverse((wR) => {
        wR.isBone && w1.add(wR.name);
      });
      let w2 = Go(w0, w1),
        w3 = null;
      if ((w2 || ((w3 = (await ke?.(w0)) ?? null), w3 && (w2 = 'custom')), !w2))
        throw new Error(
          "That skeleton isn't one we read yet: ours, Mixamo, Unreal (UE4 / UE5) and Reallusion (CC / ActorCore) are \u2014 and any rig you have mapped: add a character on this rig to your Characters and map it, then import its animations",
        );
      let w4 = Jo(kM),
        w5;
      if (w4.length > 1) {
        if (((w5 = await ku(kB.name, w4)), !w5?.length))
          return (kW(kB.name + ' \u2014 nothing imported', 4000), { name: kB.name, cancelled: !0 });
      } else w5 = [w4[0] ?? { clip: null, name: kN }];
      let w6 = w4.length > 1,
        w7,
        w8;
      if (w2 === 'default')
        ((w8 = 'Our skeleton'),
          (w7 = (wR, wl) => Ro({ file: kM, take: wR, ourRig: kI, THREE: kF, name: wl })));
      else {
        if (w2 === 'custom')
          ((w8 = w3.name + '\u2019s rig'),
            (w7 = (wR, wl) =>
              Ho({ file: kM, take: wR, rig: w3, ourRig: kI, THREE: kF, name: wl, mode: kQ })));
        else {
          if (w2 === 'mixamo') {
            w8 = 'Mixamo';
            let wR = await kf(kF),
              wl = await kJ('mixamo');
            w7 = (wQ, wc) =>
              Ko({
                file: kM,
                take: wQ,
                sourceRig: wR,
                ourRig: kI,
                boneMap: wl,
                THREE: kF,
                name: wc,
                mode: kQ,
              });
          } else {
            let { SKELETONS: wQ, loadSkeleton: wc } = await import('../api/export.js'),
              wj = w2;
            if (w2 === 'ue5') {
              let wO = kM.getObjectByName('calf_l')?.position.length() ?? 0,
                wf = async (wJ) =>
                  (await wc(wJ, kE, kF)).getObjectByName('calf_l').position.length();
              Math.abs(wO - (await wf('ue5-quinn'))) < Math.abs(wO - (await wf('ue5'))) &&
                (wj = 'ue5-quinn');
            }
            let wz = wQ[wj];
            w8 = wz.label;
            let wp = await kJ(wz.map);
            w7 = async (wJ, wZ) =>
              Eo({
                file: kM,
                take: wJ,
                def: wz,
                sourceRig: kg(await wc(wj, kE, kF)),
                ourRig: kI,
                boneMap: wp,
                THREE: kF,
                name: wZ,
                mode: kQ,
              });
          }
        }
      }
      let w9 = w2 === 'default' ? 'native' : kQ,
        wk = w6 ? await mr(kh) : null,
        ww = new Map();
      if (/\.glb$/i.test(kB.name)) {
        for (let wJ of w5)
          try {
            ww.set(wJ, oi({ file: kM, take: wJ.clip, ourRig: kI, THREE: kF }));
          } catch {}
      }
      let wV = 0,
        wD = 0,
        wm = !0,
        wS = null,
        wE = !0;
      for (let wZ = 0; wZ < w5.length; wZ++) {
        let wU = w5[wZ],
          wu = w6 ? ai(wU.name) : kN;
        w6 && kW('Importing ' + (wZ + 1) + ' of ' + w5.length + ': ' + wu + '\u2026');
        let { clip: wd, info: wK } = await w7(wU.clip, wu),
          wT = w6 ? await fr(wk, wU.name, wu, w9) : await hr(kh, wu, w9),
          wA = kl.some((wx) => wx.id === wT),
          wX = Wo({ rig: kI, clip: wd, clone: kg, THREE: kF });
        wK.from = w8;
        let wL = gr(wT, wu, wd, wK, wX),
          wb = ww.get(wU) ?? kl.find((wx) => wx.id === wT)?.camera ?? null;
        wb && (wL.camera = wb);
        try {
          await d(U, wL);
        } catch {
          wm = !1;
        }
        (kS.addClip(wT, wd),
          (kl = [wL, ...kl.filter((wx) => wx.id !== wT)]),
          kC?.(wT, wL, !wA && wE),
          wA || (wE = !1),
          wA ? wD++ : wV++,
          (wS = { name: wu, clip: wd, info: wK, record: wL, already: wA }));
      }
      kq();
      let wF = wm
        ? ''
        : ' \u00B7 not saved: this browser is blocking storage, so it goes when the page closes';
      if (w6) {
        let wx = [wV && wV + ' added', wD && wD + ' already imported, updated in place'].filter(
          Boolean,
        );
        kW(kB.name + ' \u2014 ' + w8 + ' \u00B7 ' + wx.join(', ') + wF, wm ? 8000 : 15000);
      } else {
        let { name: wy, clip: wW, info: wq, record: wP, already: wY } = wS,
          wv =
            wP.tracks.reduce((wg, wI) => wg + wI.times.byteLength + wI.values.byteLength, 0) / 1024,
          wB = wq.travel?.moved
            ? ' \u00B7 travels ' + wq.travel.distance.toFixed(1) + ' m'
            : ' \u00B7 in place',
          wG = ww.get(w5[w5.length - 1]) ? ' \u00B7 with its camera (Stage)' : '';
        kW(
          wY
            ? wy + ' \u2014 already imported, updated in place' + wG + wF
            : wy +
                ' \u2014 ' +
                w8 +
                wB +
                ' \u00B7 ' +
                wW.duration.toFixed(2) +
                's, ' +
                wv.toFixed(0) +
                ' KB' +
                wG +
                wF,
          wm ? 8000 : 15000,
        );
      }
      return { name: kB.name };
    } catch (wg) {
      return (
        kW(wg.message || 'That file could not be read', 6000),
        { name: kB.name, error: wg.message || 'could not be read' }
      );
    }
  }
  let kU = null;
  function ku(kB, kG) {
    return km
      ? (kU?.done(null),
        ka?.(),
        new Promise((kg) => {
          ((kU = {
            file: kB,
            takes: kG,
            picked: new Set(),
            scroll: 0,
            done: (kI) => {
              ((kU = null), kq(), kg(kI));
            },
          }),
            kq(),
            kW('Choose which animations to bring in from ' + kB));
        }))
      : Promise.resolve(kG);
  }
  function kd(kB) {
    let kG = se('div', 'lib-import__takes');
    kG.appendChild(
      se(
        'p',
        'lib-comp__hint',
        kB.file + ' holds ' + kB.takes.length + ' animations \u2014 pick the ones to bring in.',
      ),
    );
    let kg = se('label', 'lib-import__take lib-import__take--all'),
      kI = document.createElement('input');
    ((kI.type = 'checkbox'),
      (kI.className = 'lib-import__pick'),
      kg.append(kI, se('span', 'lib-import__take-name', 'All (' + kB.takes.length + ')')),
      kG.appendChild(kg));
    let kh = se('div', 'lib-import__take-list'),
      kN = kB.takes.map((w3, w4) => {
        let w5 = se('label', 'lib-import__take'),
          w6 = document.createElement('input');
        return (
          (w6.type = 'checkbox'),
          (w6.className = 'lib-import__pick'),
          (w6.checked = kB.picked.has(w4)),
          w6.addEventListener('change', () => {
            (w6.checked ? kB.picked.add(w4) : kB.picked.delete(w4), w2());
          }),
          w5.append(
            w6,
            se('span', 'lib-import__take-name', w3.name),
            se('span', 'lib-preset__note', w3.clip.duration.toFixed(2) + 's'),
          ),
          kh.appendChild(w5),
          w6
        );
      });
    (kh.addEventListener('scroll', () => {
      kB.scroll = kh.scrollTop;
    }),
      kG.appendChild(kh));
    let kM = se('div', 'lib-import__take-actions'),
      w0 = se('button', 'lib-btn lib-btn--sm');
    ((w0.type = 'button'),
      w0.addEventListener('click', () => kB.done(kB.takes.filter((w3, w4) => kB.picked.has(w4)))));
    let w1 = se('button', 'lib-btn lib-btn--sm', 'Cancel');
    ((w1.type = 'button'),
      w1.addEventListener('click', () => kB.done(null)),
      kM.append(w0, w1),
      kG.appendChild(kM),
      kI.addEventListener('change', () => {
        (kB.picked.clear(),
          kI.checked && kB.takes.forEach((w3, w4) => kB.picked.add(w4)),
          kN.forEach((w3, w4) => {
            w3.checked = kB.picked.has(w4);
          }),
          w2());
      }));
    function w2() {
      let w3 = kB.picked.size;
      ((kI.checked = w3 === kB.takes.length),
        (kI.indeterminate = w3 > 0 && w3 < kB.takes.length),
        (w0.textContent = w3 ? 'Import ' + w3 : 'Import'),
        (w0.disabled = !w3));
    }
    return (
      w2(),
      queueMicrotask(() => {
        kh.scrollTop = kB.scroll;
      }),
      kG
    );
  }
  async function kK(kB) {
    let kG = [];
    for (let kh of kB) kG.push(await kZ(kh));
    if (kG.length < 2) return;
    let kg = kG.filter((kN) => kN?.error),
      kI = kG.filter((kN) => !kN?.error && !kN?.cancelled).length;
    kW(
      kI +
        ' imported' +
        (kg.length
          ? ', ' +
            kg.length +
            ' skipped \u2014 ' +
            kg.map((kN) => kN.name + ': ' + kN.error).join(' \u00B7 ')
          : ''),
      kg.length ? 20000 : 6000,
    );
  }
  function kT() {
    if (!kl.length) {
      kW('Nothing to export yet', 4000);
      return;
    }
    let kB = {
        format: 'actionforge.clips',
        version: dr,
        exported: new Date().toISOString(),
        origin: location.origin,
        clips: kl.map((kg) => ({
          ...kg,
          tracks: kg.tracks.map((kI) => ({
            name: kI.name,
            type: kI.type,
            times: ii(kI.times),
            values: ii(kI.values),
          })),
        })),
      },
      kG = new Blob([JSON.stringify(kB)], { type: 'application/json' });
    (C(
      kG,
      'actionforge-clips-' + new Date().toISOString().slice(0, 10) + '-' + kl.length + '.json',
    ),
      kW('Exported ' + kl.length + ' clip' + (kl.length === 1 ? '' : 's'), 4000));
  }
  async function kA(kB) {
    kW('Reading ' + kB.name + '\u2026');
    try {
      let kG = JSON.parse(await kB.text()),
        kg = Array.isArray(kG) ? kG : kG?.clips;
      if (!Array.isArray(kg)) throw new Error('That is not a clips file');
      let kI = [];
      for (let kN of kg)
        !kN?.id ||
          !Array.isArray(kN.tracks) ||
          kI.push({
            ...kN,
            at: Number(kN.at) || Date.now(),
            tracks: kN.tracks.map((kM) => ({
              name: kM.name,
              type: kM.type,
              times: typeof kM.times == 'string' ? ri(kM.times) : Float32Array.from(kM.times),
              values: typeof kM.values == 'string' ? ri(kM.values) : Float32Array.from(kM.values),
            })),
          });
      if (!kI.length) throw new Error('No clips in that file');
      await T(U, kI);
      for (let kM of kI)
        try {
          (kS.addClip(kM.id, xn(kM, kF)), kC?.(kM.id, kM));
        } catch {}
      let kh = new Set(kl.map((w0) => w0.id));
      ((kl = [
        ...kI.filter((w0) => !kh.has(w0.id)),
        ...kl.map((w0) => kI.find((w1) => w1.id === w0.id) ?? w0),
      ]),
        kq(),
        kW('Imported ' + kI.length + ' clip' + (kI.length === 1 ? '' : 's'), 4000));
    } catch (w0) {
      kW(w0.message || 'Could not read that file', 6000);
    }
  }
  async function kX() {
    try {
      kl = (await u(U)).filter((kB) => !wr(kB));
    } catch {
      kl = [];
    }
    for (let kB of kl) {
      let kG;
      try {
        kG = xn(kB, kF);
      } catch (kg) {
        console.warn(
          '[Import] stored clip "' + (kB?.name ?? kB?.id) + '" is unreadable:',
          kg.message,
        );
        continue;
      }
      (kS.addClip(kB.id, kG), kC?.(kB.id, kB));
    }
    (kq(), kL());
  }
  async function kL() {
    ((kc = await A()), (kj = await X()), kq());
  }
  async function kb(kB) {
    try {
      await K(U, kB.id);
    } catch {}
    if (
      ((kl = kl.filter((kG) => kG.id !== kB.id)),
      ks?.(kB.id),
      kq(),
      kW('Removed \u201C' + kB.name + '\u201D.', 8000),
      kx)
    ) {
      let kG = se('button', 'lib-btn lib-btn--sm lib-import__undo', 'Undo');
      ((kG.type = 'button'),
        kG.addEventListener('click', async () => {
          (kG.remove(), await kP(kB), kW('\u201C' + kB.name + '\u201D is back.', 4000));
        }),
        kx.append(' ', kG));
    }
  }
  let kx = null,
    ky = 0;
  function kW(kB, kG = 0) {
    ((kp.disabled = kG === 0 && !!kB),
      kx &&
        ((kx.textContent = kB),
        (kx.hidden = !kB),
        clearTimeout(ky),
        kG &&
          (ky = setTimeout(() => {
            kx && (kx.hidden = !0);
          }, kG))));
  }
  function kq() {
    if (!km) return;
    km.innerHTML = '';
    let kB = se('div', 'lib-comp__head');
    kB.appendChild(se('span', 'lib-comp__title', 'Imported'));
    let kG = se('button', 'lib-btn lib-btn--sm', '+ Add animation');
    if (
      ((kG.type = 'button'),
      (kG.title =
        'Bring in an animation (FBX or GLB) on our own skeleton, Mixamo, Unreal (UE4 / UE5) or Reallusion (CC / ActorCore). Read on this machine \u2014 nothing is uploaded'),
      kG.addEventListener('click', () => kz.click()),
      kB.appendChild(kG),
      km.appendChild(kB),
      kU && km.appendChild(kd(kU)),
      kH && kl.length)
    ) {
      let w3 = kl.filter((w6) => kH.isVisible(w6.id)),
        w4 = w3.length > 0 && w3.every((w6) => kH.isSelected(w6.id)),
        w5 = se('button', 'lib-btn lib-btn--sm', w4 ? 'Select none' : 'Select all');
      ((w5.type = 'button'),
        (w5.disabled = !w3.length),
        (w5.title = w3.length
          ? (w4 ? 'Clear' : 'Select') + ' ' + w3.length + ' imported clip(s) for download'
          : 'None of these are in the current view \u2014 clear the search or tag filter'),
        w5.addEventListener('click', () => {
          for (let w6 of w3) kH.setSelected(w6.id, !w4);
          kq();
        }),
        kB.appendChild(w5));
    }
    let kg = se('div', 'lib-ik__row lib-import__backup');
    kg.appendChild(se('span', 'lib-adj__label', 'Backup'));
    let kI = se('div', 'lib-ik__modes'),
      kh = se('button', 'lib-btn lib-btn--axis', 'Save\u2026');
    ((kh.type = 'button'),
      (kh.title = 'Write every imported clip to a file you keep'),
      (kh.disabled = !kl.length),
      kh.addEventListener('click', kT),
      kI.appendChild(kh));
    let kN = se('button', 'lib-btn lib-btn--axis', 'Restore\u2026');
    ((kN.type = 'button'),
      (kN.title =
        'Read a file written by Save \u2014 merged with what is here, never replacing it'),
      kI.appendChild(kN),
      kg.appendChild(kI));
    let kM = document.createElement('input');
    ((kM.type = 'file'),
      (kM.accept = 'application/json,.json'),
      (kM.hidden = !0),
      kM.addEventListener('change', () => {
        let w6 = kM.files?.[0];
        ((kM.value = ''), w6 && kA(w6));
      }),
      kN.addEventListener('click', () => kM.click()),
      km.appendChild(kM),
      km.appendChild(kg),
      (kx = se('p', 'lib-comp__hint')),
      (kx.hidden = !0),
      km.appendChild(kx));
    let w0 = se('div', 'lib-ik__row');
    w0.appendChild(se('span', 'lib-adj__label', 'Motion'));
    let w1 = se('div', 'lib-ik__modes');
    for (let [w6, w7, w8] of [
      [
        'locomotion',
        'Root travels',
        'Walks, runs, turns \u2014 the ground movement goes to the root bone, so In place and root motion work',
      ],
      [
        'hips',
        'Hips carry it',
        'Jumps, flips, anything that leaves the floor \u2014 all of the movement stays on the hips',
      ],
    ]) {
      let w9 = se('button', 'lib-btn lib-btn--axis' + (kQ === w6 ? ' is-on' : ''), w7);
      ((w9.type = 'button'),
        (w9.title = w8),
        w9.addEventListener('click', () => {
          ((kQ = w6), kq());
        }),
        w1.appendChild(w9));
    }
    if (
      (w0.appendChild(w1),
      km.appendChild(w0),
      km.appendChild(
        se(
          'p',
          'lib-comp__hint',
          kQ === 'hips'
            ? 'Next import: all of its movement stays on the hips \u2014 for jumps and flips.'
            : 'Next import: its ground movement goes to the root \u2014 for walks, runs and turns.',
        ),
      ),
      kc)
    ) {
      let wk = [];
      if (kl.length) {
        let wD =
          kl.reduce(
            (wm, wS) =>
              wm + wS.tracks.reduce((wE, wF) => wE + wF.times.byteLength + wF.values.byteLength, 0),
            0,
          ) / 1024;
        (wk.push(kl.length + ' clip' + (kl.length === 1 ? '' : 's')),
          wk.push(wD > 1024 ? (wD / 1024).toFixed(1) + ' MB' : wD.toFixed(0) + ' KB'));
      }
      kj?.quota && wk.push((kj.quota / 1073741824).toFixed(1) + ' GB available');
      let ww = se('p', 'lib-comp__hint', wk.join(' \u00B7 '));
      wk.length && km.appendChild(ww);
      let wV = se(
        'p',
        'lib-comp__hint' + (kc.persisted ? '' : ' is-warn'),
        kc.persisted
          ? 'Kept on this machine, and the browser has agreed not to clear it. Export anyway to move them elsewhere.'
          : 'This browser has NOT promised to keep these \u2014 they can be cleared under disk pressure, and Safari deletes them after seven days away. Use Save to keep a copy.',
      );
      km.appendChild(wV);
    }
    if (!kl.length) {
      km.appendChild(
        se(
          'p',
          'lib-comp__hint',
          'Drop an FBX or GLB here \u2014 on our own skeleton, or Mixamo, Unreal (UE4 / UE5) or Reallusion (CC / ActorCore) \u2014 and it joins the library. Read and kept on this machine \u2014 nothing is uploaded, and only the animation is stored, never the character.',
        ),
      );
      return;
    }
    let w2 = se('ul', 'lib-presets');
    for (let wm of kl) {
      let wS = se('li', 'lib-preset');
      if (kH) {
        let wC = kH.isVisible(wm.id),
          ws = document.createElement('input');
        ((ws.type = 'checkbox'),
          (ws.className = 'lib-import__pick'),
          (ws.checked = wC && kH.isSelected(wm.id)),
          (ws.disabled = !wC),
          (ws.title = wC
            ? 'Include in the next download'
            : 'Hidden by the current search or tag filter, so it cannot be downloaded'),
          ws.addEventListener('change', () => {
            (kH.setSelected(wm.id, ws.checked), kq());
          }),
          wS.appendChild(ws));
      }
      let wE = se('button', 'lib-preset__open');
      ((wE.type = 'button'),
        wE.appendChild(se('span', 'lib-preset__name', wm.name)),
        wE.appendChild(
          se(
            'span',
            'lib-preset__note',
            '' +
              (wm.info?.from ? wm.info.from + ' \u00B7 ' : '') +
              wm.duration.toFixed(2) +
              's \u00B7 ' +
              wm.tracks.length +
              ' tracks',
          ),
        ),
        wE.addEventListener('click', () => kC?.(wm.id, wm, !0)),
        wS.appendChild(wE));
      let wF = se('button', 'lib-btn lib-btn--icon', '\u2715');
      ((wF.type = 'button'),
        (wF.title = 'Remove from this machine'),
        wF.addEventListener('click', () => kb(wm)),
        wS.appendChild(wF),
        w2.appendChild(wS));
    }
    km.appendChild(w2);
  }
  async function kP(kB) {
    if (!kB?.id) return null;
    if (kl.some((kg) => kg.id === kB.id)) return kB.id;
    let kG = xn(kB, kF);
    try {
      await d(U, kB);
    } catch {}
    return (kS.addClip(kB.id, kG), (kl = [kB, ...kl]), kC?.(kB.id, kB), kq(), kB.id);
  }
  let kY = (kB) => kl.find((kG) => kG.id === kB) ?? null;
  kq();
  let kv = kX();
  return {
    render: kq,
    restore: kX,
    ready: kv,
    adoptRecord: kP,
    recordOf: kY,
    importFiles: kO,
    get: () => [...kl],
  };
}
var yr = 'actionforge-authoring',
  Ut = 'folders',
  mt = null;
function br() {
  return (
    mt ||
    ((mt = new Promise((kD, km) => {
      if (typeof indexedDB > 'u') {
        km(new Error('This browser has no IndexedDB'));
        return;
      }
      let kS = indexedDB.open(yr, 1);
      ((kS.onupgradeneeded = () => {
        kS.result.objectStoreNames.contains(Ut) ||
          kS.result.createObjectStore(Ut, { keyPath: 'id' });
      }),
        (kS.onsuccess = () => kD(kS.result)),
        (kS.onerror = () => km(kS.error ?? new Error('Could not open the folders database'))),
        (kS.onblocked = () =>
          km(
            new Error('Another tab is holding the folders database \u2014 close it and try again'),
          )));
    })),
    mt.catch(() => {
      mt = null;
    }),
    mt)
  );
}
async function Mn(kD, km) {
  let kS = await br();
  return new Promise((kE, kF) => {
    let kC = kS.transaction(Ut, kD),
      ks;
    (Promise.resolve(km(kC.objectStore(Ut))).then((kH) => {
      ks = kH;
    }),
      (kC.oncomplete = () => kE(ks)),
      (kC.onerror = () => kF(kC.error ?? new Error('Folders database error'))),
      (kC.onabort = () => kF(kC.error ?? new Error('Folders database write was refused'))));
  });
}
var kn = (kD) =>
    new Promise((km, kS) => {
      ((kD.onsuccess = () => km(kD.result)), (kD.onerror = () => kS(kD.error)));
    }),
  ci = {
    supported: typeof window < 'u' && typeof window.showDirectoryPicker == 'function',
    async list(kD = 'source') {
      return ((await Mn('readonly', (km) => kn(km.getAll()))) || [])
        .filter((km) => km.kind === kD)
        .sort((km, kS) => (km.added || 0) - (kS.added || 0));
    },
    async add(kD, km = 'source') {
      let kS = {
        id: km + '.' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        name: kD.name,
        kind: km,
        handle: kD,
        added: Date.now(),
      };
      return (await Mn('readwrite', (kE) => kn(kE.put(kS))), kS);
    },
    remove: (kD) => Mn('readwrite', (km) => kn(km.delete(kD))),
  },
  pi = (kD = 'read') => window.showDirectoryPicker({ mode: kD });
async function vn(kD, { mode: km = 'read', ask: kS = !1 } = {}) {
  return (await kD.queryPermission({ mode: km })) === 'granted'
    ? !0
    : kS
      ? (await kD.requestPermission({ mode: km })) === 'granted'
      : !1;
}
var ui = 'actionforge.kept',
  xr = 128 * 1024,
  _r = 'ActionForge library.txt',
  hi = {
    Int8Array: Int8Array,
    Uint8Array: Uint8Array,
    Uint8ClampedArray: Uint8ClampedArray,
    Int16Array: Int16Array,
    Uint16Array: Uint16Array,
    Int32Array: Int32Array,
    Uint32Array: Uint32Array,
    Float32Array: Float32Array,
    Float64Array: Float64Array,
  },
  Mr = {
    'model/gltf-binary': 'glb',
    'image/webp': 'webp',
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'video/webm': 'webm',
    'video/mp4': 'mp4',
  };
function kr(kD) {
  let km = (kS, kE) => [...kE].every((kF, kC) => kD[kS + kC] === kF.charCodeAt(0));
  return kD.length < 12
    ? null
    : km(0, 'glTF')
      ? 'glb'
      : km(0, 'RIFF') && km(8, 'WEBP')
        ? 'webp'
        : kD[0] === 137 && km(1, 'PNG')
          ? 'png'
          : kD[0] === 255 && kD[1] === 216 && kD[2] === 255
            ? 'jpg'
            : km(0, 'Kaydara FBX')
              ? 'fbx'
              : null;
}
function vr(kD) {
  let km = '';
  for (let kS = 0; kS < kD.length; kS += 32768)
    km += String.fromCharCode.apply(null, kD.subarray(kS, kS + 32768));
  return btoa(km);
}
function Sr(kD) {
  let km = atob(kD),
    kS = new Uint8Array(km.length);
  for (let kE = 0; kE < km.length; kE++) kS[kE] = km.charCodeAt(kE);
  return kS;
}
async function $r(kD) {
  let km = [],
    kS = (kF, kC, { ext: ks = 'bin', more: kH = {} } = {}) =>
      kC.byteLength < xr
        ? { $t: kF, ...kH, b64: vr(kC) }
        : (km.push({ ext: kr(kC) ?? ks, bytes: kC }), { $t: kF, ...kH, $side: km.length - 1 }),
    kE = async (kF) => {
      if (kF === void 0 || typeof kF == 'function') return null;
      if (kF === null || typeof kF != 'object')
        return typeof kF == 'number' && !Number.isFinite(kF) ? null : kF;
      if (typeof Blob < 'u' && kF instanceof Blob)
        return kS('Blob', new Uint8Array(await kF.arrayBuffer()), {
          ext: Mr[kF.type] ?? 'bin',
          more: { type: kF.type },
        });
      if (kF instanceof ArrayBuffer) return kS('ArrayBuffer', new Uint8Array(kF));
      if (ArrayBuffer.isView(kF))
        return kS(
          hi[kF.constructor.name] ? kF.constructor.name : 'Uint8Array',
          new Uint8Array(kF.buffer, kF.byteOffset, kF.byteLength),
        );
      if (kF instanceof Date) return { $t: 'Date', ms: kF.getTime() };
      if (kF instanceof Map) return { $t: 'Map', of: await kE([...kF]) };
      if (kF instanceof Set) return { $t: 'Set', of: await kE([...kF]) };
      if (Array.isArray(kF)) {
        let ks = [];
        for (let kH of kF) ks.push(await kE(kH));
        return ks;
      }
      let kC = {};
      for (let [ka, ke] of Object.entries(kF))
        ke !== void 0 && typeof ke != 'function' && (kC[ka] = await kE(ke));
      return kC;
    };
  return { json: await kE(kD), sides: km };
}
async function Pr(kD, km = async () => null) {
  let kS = async (kE) => {
    if (kE === null || typeof kE != 'object') return kE;
    if (Array.isArray(kE)) {
      let kC = [];
      for (let ks of kE) kC.push(await kS(ks));
      return kC;
    }
    if (typeof kE.$t == 'string') {
      if (kE.$t === 'Date') return new Date(kE.ms);
      if (kE.$t === 'Map') return new Map(await kS(kE.of));
      if (kE.$t === 'Set') return new Set(await kS(kE.of));
      let kH = typeof kE.b64 == 'string' ? Sr(kE.b64) : await km(kE.$side);
      if (!kH) throw new Error('a part of it is missing');
      if (kE.$t === 'Blob') return new Blob([kH], { type: kE.type ?? '' });
      let ka = kH.buffer.slice(kH.byteOffset, kH.byteOffset + kH.byteLength);
      return kE.$t === 'ArrayBuffer' ? ka : new (hi[kE.$t] ?? Uint8Array)(ka);
    }
    let kF = {};
    for (let [ke, kR] of Object.entries(kE)) kF[ke] = await kS(kR);
    return kF;
  };
  return kS(kD);
}
var fi = (kD, km) =>
    String(kD ?? '')
      .replace(/[<>:"/\\|?*\u0000-\u001f]/g, '_')
      .replace(/\s+/g, ' ')
      .replace(/[. ]+$/, '')
      .trim()
      .slice(0, km) || '_',
  Xt = (kD) => fi(kD, 90).replace(/[[\]]/g, '_'),
  Ar = (kD, km) => fi(kD, 60).replace(/[[\]]/g, '_') + ' [' + Xt(km) + ']',
  Cr = (kD) => /\[([^[\]]+)\]\.json$/.exec(kD)?.[1] ?? null,
  di = (kD, km) => kD.includes(' [' + km + '].');
function Or({ shelves: kD, dirty: km }) {
  let kS = new Map(),
    kE = (kQ) => (
      kS.has(kQ) ||
        kS.set(
          kQ,
          Promise.resolve()
            .then(() => kD[kQ].open())
            .catch((kc) => {
              throw (kS.delete(kQ), kc);
            }),
        ),
      kS.get(kQ)
    ),
    kF = (kQ, kc, kj) => kQ.getDirectoryHandle(kD[kc].dir, { create: kj }),
    kC = async (kQ) => {
      let kc = [];
      for await (let kj of kQ.keys()) kc.push(kj);
      return kc;
    };
  async function ks(kQ, kc, kj) {
    let kz = await (await kQ.getFileHandle(kc, { create: !0 })).createWritable();
    (await kz.write(kj), await kz.close());
  }
  async function kH(kQ, kc, kj, kz) {
    let kp = await kF(kQ, kc, !0),
      kO = Xt(kj),
      kf = Ar(kD[kc].label(kz, kj) ?? kj, kj),
      { json: kJ, sides: kZ } = await $r(kz),
      kU = kZ.map((kd, kK) => kf + '.' + (kK + 1) + '.' + kd.ext);
    for (let kd = 0; kd < kZ.length; kd++) await ks(kp, kU[kd], kZ[kd].bytes);
    await ks(
      kp,
      kf + '.json',
      JSON.stringify({ format: ui, version: 1, shelf: kc, key: kj, sides: kU, record: kJ }),
    );
    let ku = new Set([kf + '.json', ...kU]);
    for (let kK of await kC(kp))
      di(kK, kO) && !ku.has(kK) && (await kp.removeEntry(kK).catch(() => {}));
  }
  async function ka(kQ, kc, kj) {
    let kz;
    try {
      kz = await kF(kQ, kc, !1);
    } catch {
      return;
    }
    let kp = Xt(kj);
    for (let kO of await kC(kz)) di(kO, kp) && (await kz.removeEntry(kO).catch(() => {}));
  }
  async function ke(kQ, kc) {
    let kj = JSON.parse(await (await (await kQ.getFileHandle(kc)).getFile()).text());
    if (kj?.format !== ui) return null;
    let kz = await Pr(kj.record, async (kp) => {
      let kO = kj.sides?.[kp];
      return kO
        ? new Uint8Array(await (await (await kQ.getFileHandle(kO)).getFile()).arrayBuffer())
        : null;
    });
    return { key: kj.key, record: kz };
  }
  async function kR(kQ, kc, kj, kz = !1) {
    let kp = kz ? null : await (await kE(kc)).get(kj);
    (kp == null ? await ka(kQ, kc, kj) : await kH(kQ, kc, kj, kp), km.clear(kc, kj));
  }
  async function kl(kQ) {
    let kc = { wrote: 0, brought: 0, failed: 0 };
    for (let { shelf: kj, key: kz, gone: kp } of km.all()) {
      if (!kD[kj]) {
        km.clear(kj, kz);
        continue;
      }
      try {
        (await kR(kQ, kj, kz, kp), kp || kc.wrote++);
      } catch {
        kc.failed++;
      }
    }
    for (let kO of Object.keys(kD))
      try {
        let kf = await kE(kO),
          kJ = new Map((await kf.all()).map(([ku, kd]) => [Xt(ku), [ku, kd]])),
          kZ = null;
        try {
          kZ = await kF(kQ, kO, !1);
        } catch {}
        let kU = new Map();
        if (kZ)
          for (let ku of await kC(kZ)) {
            let kd = Cr(ku);
            kd && kU.set(kd, ku);
          }
        for (let [kK, [kT, kA]] of kJ)
          if (!kU.has(kK))
            try {
              (await kH(kQ, kO, kT, kA), kc.wrote++);
            } catch {
              kc.failed++;
            }
        for (let [kX, kL] of kU)
          if (!kJ.has(kX))
            try {
              let kb = await ke(kZ, kL);
              kb && (await kf.put(kb.record, kb.key), kc.brought++);
            } catch {
              kc.failed++;
            }
      } catch {
        kc.failed++;
      }
    return kc;
  }
  return { write: kH, remove: ka, one: kR, reconcile: kl };
}
var Sn = (kD, km) => async () => {
    let kS = await import('../api/library.js'),
      kE = kS[kD];
    return {
      all: async () => (await kS.all(kE)).map((kF) => [kF[km], kF]),
      get: (kF) => kS.get(kE, kF),
      put: (kF) => kS.putQuiet(kE, kF),
    };
  },
  Ir = Object.freeze({
    animations: { dir: 'animations', label: (kD) => kD?.name, open: Sn('CLIPS', 'id') },
    projects: { dir: 'projects', label: (kD) => kD?.name, open: Sn('PRESETS', 'name') },
    props: { dir: 'props', label: (kD) => kD?.name ?? kD?.label, open: Sn('PROPS', 'id') },
    characters: {
      dir: 'characters',
      label: (kD) => kD?.name,
      open: async () => {
        let { characterStore: kD } = await import('../api/characters.js');
        return {
          all: async () => (await kD.everything()).map((km) => [km.id, km]),
          get: (km) => kD.get(km),
          put: (km) => kD.putQuiet(km),
        };
      },
    },
    poses: {
      dir: 'poses',
      label: (kD) => kD?.name,
      open: async () => {
        let kD = await import('../api/poses.js');
        return {
          all: async () => (await kD.rawAll()).map((km) => [km.id, km]),
          get: (km) => kD.rawGet(km),
          put: (km) => kD.rawPut(km),
        };
      },
    },
    stories: {
      dir: 'stories',
      label: (kD, km) =>
        km === 'board' ? 'Stories' : km === 'assets:mine' ? 'Models brought in' : 'Model',
      open: async () => {
        let kD = await import('../api/sandbox.js');
        return {
          all: () => kD.workKept(),
          get: (km) => kD.read(km),
          async put(km, kS) {
            if ((await kD.keepQuiet(kS, km), kS === 'assets:mine' && Array.isArray(km))) {
              let kE = { ...((await kD.read('assets')) ?? {}) };
              for (let kF of km) kF?.id && (kE[kF.id] = kF.version ?? '0');
              await kD.keepQuiet('assets', kE);
            }
          },
        };
      },
    },
  }),
  Yt = 'library',
  Lr = 1200;
function Fr({ shelves: kD = Ir, folders: km = ci } = {}) {
  let kS = Or({ shelves: kD, dirty: b }),
    kE = new Set(),
    kF = new Set(),
    kC = km.supported ? 'none' : 'unsupported',
    ks = null,
    kH = null,
    ka = (kO) => {
      if (kO !== kC) {
        kC = kO;
        for (let kf of kE)
          try {
            kf(kC);
          } catch (kJ) {
            console.error(kJ);
          }
      }
    },
    ke = new Map(),
    kR = Promise.resolve(),
    kl = (kO, kf, kJ) => {
      let kZ = kO + '\n' + kf;
      (clearTimeout(ke.get(kZ)),
        ke.set(
          kZ,
          setTimeout(() => {
            (ke.delete(kZ),
              (kR = kR
                .then(() => (kC === 'on' && ks ? kS.one(ks.handle, kO, kf, kJ) : null))
                .catch((kU) => {
                  (console.warn('[library folder] not written:', kU), kC === 'on' && ka('asleep'));
                })));
          }, Lr),
        ));
    };
  x((kO, kf, kJ) => {
    if (!(!kD[kO] || kC === 'unsupported')) {
      if (kC === 'on') kl(kO, kf, kJ);
      else {
        for (let kZ of kF)
          try {
            kZ(kC);
          } catch (kU) {
            console.error(kU);
          }
      }
    }
  });
  function kQ() {
    return kC === 'unsupported'
      ? Promise.resolve(kC)
      : (kH ??= (async () => {
          try {
            ks = (await km.list(Yt)).at(-1) ?? null;
          } catch {
            ks = null;
          }
          if (!ks) return (ka('none'), kC);
          L.put(!0);
          let kO = !1;
          try {
            kO = await vn(ks.handle, { mode: 'readwrite' });
          } catch {
            kO = !1;
          }
          return (
            ka(kO ? 'on' : 'asleep'),
            kO &&
              (kR = kR
                .then(() => kS.reconcile(ks.handle))
                .catch((kf) => console.warn('[library folder]', kf))),
            kC
          );
        })().finally(() => {
          kH = null;
        }));
  }
  async function kc() {
    return await (kR = kR.then(() => kS.reconcile(ks.handle)));
  }
  async function kj() {
    if (kC === 'unsupported') return null;
    let kO;
    try {
      kO = await pi('readwrite');
    } catch {
      return null;
    }
    try {
      for (let kf of await km.list(Yt)) await km.remove(kf.id);
    } catch {}
    ((ks = await km.add(kO, Yt)), L.put(!0), ka('on'));
    try {
      let kJ = await (await kO.getFileHandle(_r, { create: !0 })).createWritable();
      (await kJ.write(
        'This folder is kept by ActionForge (actionforge.app).\r\n\r\nWhat you keep on the site is written here as you keep it: your animations, poses, characters, projects, props and stories.\r\nIf your browser is ever cleared, open the site, choose this folder again as your library folder, and it is all back.\r\n\r\nNothing in here is uploaded anywhere. The files are yours.\r\n',
      ),
        await kJ.close());
    } catch {}
    return kc();
  }
  async function kz() {
    if (!ks) return null;
    let kO = !1;
    try {
      kO = await vn(ks.handle, { mode: 'readwrite', ask: !0 });
    } catch {
      kO = !1;
    }
    return kO ? (ka('on'), kc()) : null;
  }
  async function kp() {
    try {
      for (let kO of await km.list(Yt)) await km.remove(kO.id);
    } catch {}
    ((ks = null), L.put(!1), kC !== 'unsupported' && ka('none'));
  }
  try {
    globalThis.addEventListener?.('storage', (kO) => {
      kO.key === L.name && kQ();
    });
  } catch {}
  return {
    supported: km.supported,
    state: () => kC,
    name: () => ks?.name ?? '',
    start: kQ,
    pick: kj,
    wake: kz,
    forget: kp,
    onState(kO) {
      return (kE.add(kO), () => kE.delete(kO));
    },
    onUnwritten(kO) {
      return (kF.add(kO), () => kF.delete(kO));
    },
  };
}
var Pe = Fr(),
  De = (kD, km = {}, ...kS) => {
    let kE = Object.assign(document.createElement(kD), km);
    return (kE.append(...kS), kE);
  },
  mi = 'cgstuff.folder.later',
  $n =
    'Keep your work in a folder on this computer, so that clearing the browser does not lose it.',
  Wr =
    '\n.libfolder { position: fixed; left: 50%; bottom: 14px; transform: translateX(-50%); z-index: 900; display: flex; align-items: center; gap: 10px;\n    max-width: min(760px, calc(100vw - 32px)); padding: 10px 12px; background: #10161e; border: 1px solid var(--primary-color, #29c6d8);\n    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.55); color: #dbe4ee; font: 13px/1.4 var(--font-primary, system-ui, sans-serif); }\n.libfolder[hidden] { display: none; }\n.libfolder__said { margin: 0; min-width: 0; }\n.libfolder__btn { flex: none; padding: 5px 12px; background: none; border: 1px solid #44525f; color: #fff; cursor: pointer; font: inherit; white-space: nowrap; }\n.libfolder__btn:hover { border-color: var(--primary-color, #29c6d8); }\n.libfolder__btn--go { background: var(--primary-color, #29c6d8); border-color: var(--primary-color, #29c6d8); color: #06151a; font-weight: 700; }\n.libfolder-row { display: flex; flex-direction: column; gap: 0.35rem; margin-top: 0.6rem; padding-top: 0.6rem; border-top: 1px s' +
    'olid var(--border-color, #253040); }\n.libfolder-row__head { font-size: 0.68rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-muted, #8b98a8); }\n.libfolder-row__name { font-size: 0.72rem; color: var(--text-primary, #dbe4ee); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.libfolder-row__acts { display: flex; flex-wrap: wrap; gap: 0.3rem; }\n.libfolder-row__hint { margin: 0; font-size: 0.62rem; line-height: 1.45; color: var(--text-muted, #8b98a8); }\n',
  wi = !1;
function gi() {
  wi || ((wi = !0), document.head.append(De('style', { textContent: Wr })));
}
var vt = (kD, km, kS = 'libfolder__btn') => {
  let kE = De('button', { type: 'button', className: kS, textContent: kD });
  return (kE.addEventListener('click', km), kE);
};
function Pn(kD, km) {
  if (!km) return '';
  let kS = ['\u201C' + kD + '\u201D is your library folder.'];
  return (
    km.wrote &&
      kS.push(km.wrote + ' ' + (km.wrote === 1 ? 'thing was' : 'things were') + ' written to it.'),
    km.brought &&
      kS.push(km.brought + ' ' + (km.brought === 1 ? 'was' : 'were') + ' brought back from it.'),
    km.failed && kS.push(km.failed + ' could not be carried over.'),
    !km.wrote && !km.brought && !km.failed && kS.push('It has everything you keep.'),
    kS.join(' ')
  );
}
var wt = null;
function ns({ reload: kD = () => location.reload() } = {}) {
  if (!Pe.supported || wt) return;
  gi();
  let km = De('p', { className: 'libfolder__said' }),
    kS = De('span', { style: 'display:flex;gap:8px;flex:none' });
  ((wt = De('div', { className: 'libfolder', hidden: !0, role: 'status' }, km, kS)),
    document.body.append(wt));
  let kE = () => {
      try {
        return sessionStorage.getItem(mi) === '1';
      } catch {
        return !1;
      }
    },
    kF = 0,
    kC = (kj, ...kz) => {
      (clearTimeout(kF), (km.textContent = kj), kS.replaceChildren(...kz), (wt.hidden = !1));
    },
    ks = () => {
      (clearTimeout(kF), (wt.hidden = !0));
    },
    kH = () =>
      vt('Not now', () => {
        try {
          sessionStorage.setItem(mi, '1');
        } catch {}
        ks();
      });
  function ka(kj) {
    if (!kj) {
      ks();
      return;
    }
    (kC(
      Pn(Pe.name(), kj),
      ...(kj.brought ? [vt('Reload to see them', kD, 'libfolder__btn libfolder__btn--go')] : []),
      vt('Close', ks),
    ),
      kj.brought ? (kF = setTimeout(kD, 2600)) : (kF = setTimeout(ks, 7000)));
  }
  let ke = (kj) => kC(kj),
    kR = () =>
      kC(
        $n,
        vt(
          'Choose a folder',
          async () => {
            (ke('Writing your work into the folder\u2026'), ka(await Pe.pick()));
          },
          'libfolder__btn libfolder__btn--go',
        ),
        kH(),
      ),
    kl = () =>
      kC(
        'Your library folder \u201C' +
          Pe.name() +
          '\u201D is not open yet: what you keep is not written to it until it is.',
        vt(
          'Open the folder',
          async () => {
            let kj = await Pe.wake();
            kj ? ka(kj) : kl();
          },
          'libfolder__btn libfolder__btn--go',
        ),
        kH(),
      );
  Pe.onUnwritten((kj) => {
    kE() || !wt.hidden || (kj === 'none' ? kR() : kj === 'asleep' && kl());
  });
  let kQ = 'cgstuff.folder.offered.installed',
    kc = () => {
      try {
        return (
          matchMedia('(display-mode: standalone)').matches ||
          matchMedia('(display-mode: window-controls-overlay)').matches
        );
      } catch {
        return !1;
      }
    };
  Pe.start().then((kj) => {
    if (kE()) return;
    if (kj === 'asleep') {
      kl();
      return;
    }
    if (kj !== 'none' || !kc()) return;
    let kz = !0;
    try {
      ((kz = localStorage.getItem(kQ) === '1'), localStorage.setItem(kQ, '1'));
    } catch {}
    kz || kR();
  });
}
function os(kD) {
  gi();
  let km = De('div', { className: 'libfolder-row__name' }),
    kS = De('div', { className: 'libfolder-row__acts' }),
    kE = De('p', { className: 'libfolder-row__hint' });
  (kD.classList.add('libfolder-row'),
    kD.replaceChildren(
      De('div', { className: 'libfolder-row__head', textContent: 'Library folder' }),
      km,
      kS,
      kE,
    ));
  let kF = (ka, ke, kR) => {
      let kl = De('button', {
        type: 'button',
        className: 'lib-btn lib-btn--sm',
        textContent: ka,
        title: ke,
      });
      return (kl.addEventListener('click', kR), kl);
    },
    kC = '';
  async function ks() {
    ((kC = 'Writing your work into the folder\u2026'), kH());
    let ka = await Pe.pick();
    ((kC = Pn(Pe.name(), ka)), kH(), ka?.brought && setTimeout(() => location.reload(), 2200));
  }
  function kH() {
    let ka = Pe.state();
    if (ka === 'unsupported') {
      ((km.textContent = 'Not in this browser'),
        kS.replaceChildren(),
        (kE.textContent =
          'Chrome and Edge on a desktop can write what you keep into a folder on your computer. This browser cannot.'));
      return;
    }
    ((km.textContent =
      ka === 'none'
        ? 'None chosen'
        : '\u201C' + Pe.name() + '\u201D' + (ka === 'asleep' ? ' \u2014 not open yet' : '')),
      kS.replaceChildren(
        ...(ka === 'none'
          ? [kF('Choose a folder\u2026', $n, ks)]
          : [
              ...(ka === 'asleep'
                ? [
                    kF(
                      'Open it',
                      'The browser asks your leave to write to it, once each time the site is opened',
                      async () => {
                        let ke = await Pe.wake();
                        ((kC = Pn(Pe.name(), ke)),
                          kH(),
                          ke?.brought && setTimeout(() => location.reload(), 2200));
                      },
                    ),
                  ]
                : []),
              kF(
                'Change\u2026',
                'Choose another folder: what you keep is written there from now',
                ks,
              ),
              kF(
                'Stop using it',
                'What you keep is no longer written to a folder. What is in the folder stays there',
                async () => {
                  (await Pe.forget(), (kC = ''), kH());
                },
              ),
            ]),
      ),
      (kE.textContent =
        kC ||
        (ka === 'none'
          ? $n + ' If the browser is ever cleared, choose the same folder again and it is all back.'
          : ka === 'asleep'
            ? 'What you keep is written there once it is open.'
            : 'What you keep is written there as you keep it.')));
  }
  (Pe.onState(() => {
    ((kC = ''), kH());
  }),
    kH(),
    Pe.start().then(kH));
}
var An = 'cgstuff.offline.off',
  yi = 'af-library',
  qe = (kD, km = {}, ...kS) => {
    let kE = Object.assign(document.createElement(kD), km);
    return (kE.append(...kS), kE);
  },
  it = () => new URL(document.documentElement.dataset.root || './', location.href),
  St = (kD) =>
    kD >= 1048576
      ? (kD / 1024 / 1024).toFixed(kD >= 10485760 ? 0 : 1) + ' MB'
      : Math.max(1, Math.round(kD / 1024)) + ' KB';
function jr() {
  let kD = process.env.NODE_ENV === 'production' &&
      typeof navigator < 'u' && 'serviceWorker' in navigator && typeof caches < 'u',
    km = new Set(),
    kS = new Set(),
    kE = null,
    kF = null,
    kC = !1,
    ks = !1,
    kH = !1,
    ka = null,
    ke = () => {
      try {
        return localStorage.getItem(An) === '1';
      } catch {
        return !1;
      }
    },
    kR = (kK) => {
      try {
        kK ? localStorage.setItem(An, '1') : localStorage.removeItem(An);
      } catch {}
    },
    kl = () => {
      for (let kK of kS)
        try {
          kK();
        } catch (kT) {
          console.error(kT);
        }
    };
  function kQ(kK = !1) {
    ((ks = ks || kK), (kH = !0));
    for (let kT of km)
      try {
        kT();
      } catch (kA) {
        console.error(kA);
      }
    kl();
  }
  let kc = () =>
    new Promise((kK) => {
      let kT = navigator.serviceWorker.controller;
      if (!kT) {
        kK(null);
        return;
      }
      let kA = new MessageChannel(),
        kX = setTimeout(() => kK(null), 2000);
      ((kA.port1.onmessage = (kL) => {
        (clearTimeout(kX), kK(kL.data?.version ?? null));
      }),
        kT.postMessage({ type: 'af:version' }, [kA.port2]));
    });
  async function kj() {
    try {
      let kK = await fetch(new URL('version.json', it()), { cache: 'no-store' }),
        kT = kK.ok ? (await kK.json())?.version : null,
        kA = await kc();
      if (!kT || !kA || kT === kA) return;
      (kE.update().catch(() => {}),
        setTimeout(() => {
          !kH && !kE.waiting && !kE.installing && kQ(!0);
        }, 25000));
    } catch {}
  }
  function kz() {
    return !kD || ke()
      ? Promise.resolve(null)
      : (kF ??= (async () => (
          (kE = await navigator.serviceWorker.register(new URL('sw.js', it()).href, {
            scope: it().pathname,
          })),
          kE.waiting && navigator.serviceWorker.controller && kQ(),
          kE.addEventListener('updatefound', () => {
            let kK = kE.installing;
            kK?.addEventListener('statechange', () => {
              kK.state === 'installed' && navigator.serviceWorker.controller ? kQ() : kl();
            });
          }),
          navigator.serviceWorker.addEventListener('controllerchange', () => {
            kC ? location.reload() : kl();
          }),
          kj(),
          kl(),
          kE
        ))().catch(
          (kK) => (console.warn('[offline] the site is not kept:', kK), (kF = null), null),
        ));
  }
  let kp = async (kK) => {
    for (let kT of await caches.keys()) kK(kT) && (await caches.delete(kT));
  };
  async function kO() {
    if (((kC = !0), kE?.waiting && !ks)) {
      (kE.waiting.postMessage('af:load'), setTimeout(() => location.reload(), 4000));
      return;
    }
    try {
      (await kp((kK) => kK.startsWith('af-shell-') || kK === 'af-pages'), await kE?.unregister());
    } catch {}
    location.reload();
  }
  async function kf() {
    kR(!0);
    try {
      for (let kK of await navigator.serviceWorker.getRegistrations())
        kK.scope === it().href && (await kK.unregister());
      await kp((kT) => kT.startsWith('af-'));
    } catch {}
    ((kE = null), (kF = null), (kH = !1), (ks = !1), kl());
  }
  async function kJ() {
    (kR(!1), await kz(), kl());
  }
  let kZ = async () => {
    let kK = await fetch(new URL('offline-library.json', it()), { cache: 'no-store' });
    if (!kK.ok) throw new Error("the library's list: " + kK.status);
    return kK.json();
  };
  async function kU() {
    let kK = await kZ(),
      kT = await caches.open(yi),
      kA = 0,
      kX = 0;
    for (let [kL, kb] of kK.files) (await kT.match(new URL(kL, it()).href)) && (kA++, (kX += kb));
    return {
      files: kK.files.length,
      bytes: kK.bytes,
      have: kA,
      haveBytes: kX,
      shellBytes: kK.shell ?? 0,
    };
  }
  async function ku(kK = () => {}) {
    let kT = await kZ(),
      kA = await caches.open(yi),
      kX = new Set(),
      kL = 0,
      kb = 0,
      kx = 0,
      ky = 0,
      kW = async () => {
        for (; ky < kT.files.length;) {
          let [kP, kY] = kT.files[ky++],
            kv = new URL(kP, it()).href;
          if ((kX.add(kv), !(await kA.match(kv))))
            try {
              let kB = await fetch(kv);
              kB.status === 200 ? await kA.put(kv, kB) : kx++;
            } catch {
              kx++;
            }
          (kL++, (kb += kY), kK({ done: kL, files: kT.files.length, bytes: kb, total: kT.bytes }));
        }
      };
    await Promise.all(Array.from({ length: 6 }, kW));
    let kq = new URL('assets/animation-library/', it()).href;
    for (let kP of await kA.keys())
      kP.url.startsWith(kq) && !kX.has(kP.url) && (await kA.delete(kP));
    return { files: kT.files.length, failed: kx };
  }
  kD &&
    (window.addEventListener('beforeinstallprompt', (kK) => {
      (kK.preventDefault(), (ka = kK), kl());
    }),
    window.addEventListener('appinstalled', () => {
      ((ka = null), kl());
    }));
  async function kd() {
    if (!ka) return !1;
    let kK = ka;
    ((ka = null), kK.prompt());
    let kT = await kK.userChoice.catch(() => null);
    return (kl(), kT?.outcome === 'accepted');
  }
  return {
    supported: kD,
    built: !0,
    state: () => (kD ? (ke() ? 'off' : 'on') : 'unsupported'),
    kept: () => !!navigator.serviceWorker?.controller,
    ready: () => kH,
    installable: () => !!ka,
    start: kz,
    load: kO,
    remove: kf,
    keep: kJ,
    install: kd,
    libraryState: kU,
    fetchLibrary: ku,
    onReady(kK) {
      return (km.add(kK), kH && kK(), () => km.delete(kK));
    },
    onChange(kK) {
      return (kS.add(kK), () => kS.delete(kK));
    },
  };
}
var _e = jr(),
  Br =
    '\n.afnote { position: fixed; left: 50%; bottom: 66px; transform: translateX(-50%); z-index: 901; display: flex; align-items: center; gap: 10px;\n    max-width: min(760px, calc(100vw - 32px)); padding: 10px 12px; background: #10161e; border: 1px solid var(--primary-color, #29c6d8);\n    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.55); color: #dbe4ee; font: 13px/1.4 var(--font-primary, system-ui, sans-serif); }\n.afnote[hidden] { display: none; }\n.afnote p { margin: 0; min-width: 0; }\n.afnote button { flex: none; padding: 5px 12px; background: var(--primary-color, #29c6d8); border: 1px solid var(--primary-color, #29c6d8); color: #06151a; font: inherit; font-weight: 700; cursor: pointer; white-space: nowrap; }\n.afoffline-row { display: flex; flex-direction: column; gap: 0.35rem; margin-top: 0.6rem; padding-top: 0.6rem; border-top: 1px solid var(--border-color, #253040); }\n.afoffline-row__head { font-size: 0.68rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-muted, #8b98a8' +
    '); }\n.afoffline-row__said { font-size: 0.72rem; color: var(--text-primary, #dbe4ee); }\n.afoffline-row__acts { display: flex; flex-wrap: wrap; gap: 0.3rem; }\n.afoffline-row__hint { margin: 0; font-size: 0.62rem; line-height: 1.45; color: var(--text-muted, #8b98a8); }\n.afoffline-row__hint:empty { display: none; }\n',
  bi = !1;
function xi() {
  bi || ((bi = !0), document.head.append(qe('style', { textContent: Br })));
}
function _i(kD, km = null, kS = null) {
  xi();
  let kE = qe('div', { className: 'afnote', role: 'status' }, qe('p', { textContent: kD }));
  if (km) {
    let kF = qe('button', { type: 'button', textContent: km });
    (kF.addEventListener('click', () => {
      ((kF.disabled = !0), kS());
    }),
      kE.append(kF));
  }
  return (document.body.append(kE), kE);
}
function rs() {
  if (!_e.supported) return;
  let kD = null;
  (_e.onReady(() => {
    kD ??= _i('A new version of ActionForge is ready.', 'Load it', () => _e.load());
  }),
    _e.start());
}
function as(kD) {
  let km = null,
    kS = () => {
      if (navigator.onLine) {
        km && (km.remove(), (km = null), location.reload());
        return;
      }
      km ??= _i(kD);
    };
  (window.addEventListener('online', kS), window.addEventListener('offline', kS), kS());
}
var zr = () => typeof matchMedia == 'function' && matchMedia('(display-mode: standalone)').matches;
function ss(kD) {
  xi();
  let km = qe('div', { className: 'afoffline-row__said' }),
    kS = qe('div', { className: 'afoffline-row__acts' }),
    kE = qe('p', { className: 'afoffline-row__hint' }),
    kF = qe('p', { className: 'afoffline-row__hint' });
  (kD.classList.add('afoffline-row'),
    kD.replaceChildren(
      qe('div', { className: 'afoffline-row__head', textContent: 'Offline' }),
      km,
      kS,
      kE,
      kF,
    ));
  let kC = (kc, kj, kz) => {
      let kp = qe('button', {
        type: 'button',
        className: 'lib-btn lib-btn--sm',
        textContent: kc,
        title: kj,
      });
      return (kp.addEventListener('click', kz), kp);
    },
    ks = null,
    kH = null,
    ka = '',
    ke = !1,
    kR = () => {
      _e.libraryState().then(
        (kc) => {
          ((ks = kc), kQ());
        },
        () => {},
      );
    };
  async function kl() {
    ((kH = { done: 0, files: ks?.files ?? 0, bytes: 0, total: ks?.bytes ?? 0 }), kQ());
    try {
      let kc = await _e.fetchLibrary((kj) => {
        ((kH = kj), kQ());
      });
      ka = kc.failed
        ? kc.failed + ' of its files could not be fetched. Press again to try those.'
        : '';
    } catch {
      ka = 'The library could not be fetched: is there a connection?';
    }
    ((kH = null), kR(), kQ());
  }
  function kQ() {
    let kc = _e.state();
    if (((kF.textContent = ''), kc === 'unsupported')) {
      ((km.textContent = _e.built ? 'Not in this browser' : 'Only on the published site'),
        kS.replaceChildren(),
        (kE.textContent = _e.built
          ? 'This browser cannot keep the site for use without a connection.'
          : 'This is the working copy: the site is kept for use without a connection where it is published.'));
      return;
    }
    if (kc === 'off') {
      ((km.textContent = 'Not kept on this computer'),
        kS.replaceChildren(
          kC(
            'Keep it for offline',
            'The site is kept on this computer, and opens with no connection',
            () => _e.keep(),
          ),
        ),
        (kE.textContent = ke
          ? 'Removed: nothing of the site is kept on this computer now. Your animations and projects are still here. ' +
            (zr()
              ? "The app stays installed: remove it from its window's menu."
              : "If you installed it as an app, it stays installed: remove it from its window's menu.")
          : 'The site needs a connection to open.'));
      return;
    }
    ((km.textContent = _e.kept()
      ? 'Kept on this computer: it opens with no connection.'
      : 'Being kept on this computer\u2026'),
      _e.kept() &&
        (kF.textContent =
          'Kept by your browser, in its own storage for this site, not in a folder you can open.' +
          (ks ? ' About ' + St(ks.shellBytes + ks.haveBytes) + '.' : '')));
    let kj = ks && ks.have >= ks.files;
    (kS.replaceChildren(
      ...(_e.ready()
        ? [kC('Load the new version', 'A new version of the site is ready', () => _e.load())]
        : []),
      ...(_e.installable()
        ? [
            kC('Install as an app', 'ActionForge in a window of its own, with its own icon', () =>
              _e.install(),
            ),
          ]
        : []),
      ...(kH || kj
        ? []
        : [
            kC(
              ks
                ? 'Fetch the whole library \u00B7 ' + St(ks.bytes - ks.haveBytes)
                : 'Fetch the whole library',
              'Every animation, pose, character and prop of the library, kept for use with no connection',
              kl,
            ),
          ]),
      kC(
        'Remove the offline copy',
        'Nothing of the site is kept on this computer any more. What you have made stays',
        () => {
          ((ke = !0), _e.remove());
        },
      ),
    ),
      (kE.textContent = kH
        ? 'Fetching the library: ' +
          kH.done +
          ' of ' +
          kH.files +
          ' files, ' +
          St(kH.bytes) +
          ' of ' +
          St(kH.total) +
          '\u2026'
        : ka ||
          (ks
            ? kj
              ? 'The whole library is kept: ' + St(ks.bytes) + '.'
              : 'Of the library, ' +
                ks.have +
                ' of ' +
                ks.files +
                ' files are kept so far: each as it is first used.'
            : 'The library is kept as each thing in it is first used.')));
  }
  (_e.onChange(kQ),
    kQ(),
    _e.supported &&
      _e.start().then(() => {
        _e.state() === 'on' && kR();
      }));
}
var ct = new k8(),
  Ce = new i(),
  rt = new i(),
  we = new h(),
  Mi = { X: new i(1, 0, 0), Y: new i(0, 1, 0), Z: new i(0, 0, 1) },
  Cn = { type: 'change' },
  ki = { type: 'mouseDown', mode: null },
  vi = { type: 'mouseUp', mode: null },
  Si = { type: 'objectChange' },
  $i = class extends k3 {
    constructor(kD, km) {
      (super(),
        km === void 0 &&
          (console.warn(
            'THREE.TransformControls: The second parameter "domElement" is now mandatory.',
          ),
          (km = document)),
        (this.isTransformControls = !0),
        (this.visible = !1),
        (this.domElement = km),
        (this.domElement.style.touchAction = 'none'));
      let kS = new In();
      ((this._gizmo = kS), this.add(kS));
      let kE = new Ln();
      ((this._plane = kE), this.add(kE));
      let kF = this;
      function kC(kO, kf) {
        let kJ = kf;
        (Object.defineProperty(kF, kO, {
          get: function () {
            return kJ !== void 0 ? kJ : kf;
          },
          set: function (kZ) {
            kJ !== kZ &&
              ((kJ = kZ),
              (kE[kO] = kZ),
              (kS[kO] = kZ),
              kF.dispatchEvent({ type: kO + '-changed', value: kZ }),
              kF.dispatchEvent(Cn));
          },
        }),
          (kF[kO] = kf),
          (kE[kO] = kf),
          (kS[kO] = kf));
      }
      (kC('camera', kD),
        kC('object', void 0),
        kC('enabled', !0),
        kC('axis', null),
        kC('mode', 'translate'),
        kC('translationSnap', null),
        kC('rotationSnap', null),
        kC('scaleSnap', null),
        kC('space', 'world'),
        kC('size', 1),
        kC('dragging', !1),
        kC('showX', !0),
        kC('showY', !0),
        kC('showZ', !0));
      let ks = new i(),
        kH = new i(),
        ka = new h(),
        ke = new h(),
        kR = new i(),
        kl = new h(),
        kQ = new i(),
        kc = new i(),
        kj = new i(),
        kz = 0,
        kp = new i();
      (kC('worldPosition', ks),
        kC('worldPositionStart', kH),
        kC('worldQuaternion', ka),
        kC('worldQuaternionStart', ke),
        kC('cameraPosition', kR),
        kC('cameraQuaternion', kl),
        kC('pointStart', kQ),
        kC('pointEnd', kc),
        kC('rotationAxis', kj),
        kC('rotationAngle', kz),
        kC('eye', kp),
        (this._offset = new i()),
        (this._startNorm = new i()),
        (this._endNorm = new i()),
        (this._cameraScale = new i()),
        (this._parentPosition = new i()),
        (this._parentQuaternion = new h()),
        (this._parentQuaternionInv = new h()),
        (this._parentScale = new i()),
        (this._worldScaleStart = new i()),
        (this._worldQuaternionInv = new h()),
        (this._worldScale = new i()),
        (this._positionStart = new i()),
        (this._quaternionStart = new h()),
        (this._scaleStart = new i()),
        (this._getPointer = Nr.bind(this)),
        (this._onPointerDown = Dr.bind(this)),
        (this._onPointerHover = Vr.bind(this)),
        (this._onPointerMove = qr.bind(this)),
        (this._onPointerUp = Qr.bind(this)),
        this.domElement.addEventListener('pointerdown', this._onPointerDown),
        this.domElement.addEventListener('pointermove', this._onPointerHover),
        this.domElement.addEventListener('pointerup', this._onPointerUp));
    }
    ['updateMatrixWorld'](kD) {
      (this.object !== void 0 &&
        (this.object.updateMatrixWorld(),
        this.object.parent === null
          ? console.error(
              'TransformControls: The attached 3D object must be a part of the scene graph.',
            )
          : this.object.parent.matrixWorld.decompose(
              this._parentPosition,
              this._parentQuaternion,
              this._parentScale,
            ),
        this.object.matrixWorld.decompose(
          this.worldPosition,
          this.worldQuaternion,
          this._worldScale,
        ),
        this._parentQuaternionInv.copy(this._parentQuaternion).invert(),
        this._worldQuaternionInv.copy(this.worldQuaternion).invert()),
        this.camera.updateMatrixWorld(),
        this.camera.matrixWorld.decompose(
          this.cameraPosition,
          this.cameraQuaternion,
          this._cameraScale,
        ),
        this.camera.isOrthographicCamera
          ? this.camera.getWorldDirection(this.eye).negate()
          : this.eye.copy(this.cameraPosition).sub(this.worldPosition).normalize(),
        super.updateMatrixWorld(kD));
    }
    ['pointerHover'](kD) {
      if (this.object === void 0 || this.dragging === !0) return;
      kD !== null && ct.setFromCamera(kD, this.camera);
      let km = On(this._gizmo.picker[this.mode], ct);
      km ? (this.axis = km.object.name) : (this.axis = null);
    }
    ['pointerDown'](kD) {
      if (
        !(this.object === void 0 || this.dragging === !0 || (kD != null && kD.button !== 0)) &&
        this.axis !== null
      ) {
        kD !== null && ct.setFromCamera(kD, this.camera);
        let km = On(this._plane, ct, !0);
        (km &&
          (this.object.updateMatrixWorld(),
          this.object.parent.updateMatrixWorld(),
          this._positionStart.copy(this.object.position),
          this._quaternionStart.copy(this.object.quaternion),
          this._scaleStart.copy(this.object.scale),
          this.object.matrixWorld.decompose(
            this.worldPositionStart,
            this.worldQuaternionStart,
            this._worldScaleStart,
          ),
          this.pointStart.copy(km.point).sub(this.worldPositionStart)),
          (this.dragging = !0),
          (ki.mode = this.mode),
          this.dispatchEvent(ki));
      }
    }
    ['pointerMove'](kD) {
      let km = this.axis,
        kS = this.mode,
        kE = this.object,
        kF = this.space;
      if (
        (kS === 'scale'
          ? (kF = 'local')
          : (km === 'E' || km === 'XYZE' || km === 'XYZ') && (kF = 'world'),
        kE === void 0 || km === null || this.dragging === !1 || (kD !== null && kD.button !== -1))
      )
        return;
      kD !== null && ct.setFromCamera(kD, this.camera);
      let kC = On(this._plane, ct, !0);
      if (kC) {
        if ((this.pointEnd.copy(kC.point).sub(this.worldPositionStart), kS === 'translate'))
          (this._offset.copy(this.pointEnd).sub(this.pointStart),
            kF === 'local' &&
              km !== 'XYZ' &&
              this._offset.applyQuaternion(this._worldQuaternionInv),
            km.indexOf('X') === -1 && (this._offset.x = 0),
            km.indexOf('Y') === -1 && (this._offset.y = 0),
            km.indexOf('Z') === -1 && (this._offset.z = 0),
            kF === 'local' && km !== 'XYZ'
              ? this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale)
              : this._offset.applyQuaternion(this._parentQuaternionInv).divide(this._parentScale),
            kE.position.copy(this._offset).add(this._positionStart),
            this.translationSnap &&
              (kF === 'local' &&
                (kE.position.applyQuaternion(we.copy(this._quaternionStart).invert()),
                km.search('X') !== -1 &&
                  (kE.position.x =
                    Math.round(kE.position.x / this.translationSnap) * this.translationSnap),
                km.search('Y') !== -1 &&
                  (kE.position.y =
                    Math.round(kE.position.y / this.translationSnap) * this.translationSnap),
                km.search('Z') !== -1 &&
                  (kE.position.z =
                    Math.round(kE.position.z / this.translationSnap) * this.translationSnap),
                kE.position.applyQuaternion(this._quaternionStart)),
              kF === 'world' &&
                (kE.parent && kE.position.add(Ce.setFromMatrixPosition(kE.parent.matrixWorld)),
                km.search('X') !== -1 &&
                  (kE.position.x =
                    Math.round(kE.position.x / this.translationSnap) * this.translationSnap),
                km.search('Y') !== -1 &&
                  (kE.position.y =
                    Math.round(kE.position.y / this.translationSnap) * this.translationSnap),
                km.search('Z') !== -1 &&
                  (kE.position.z =
                    Math.round(kE.position.z / this.translationSnap) * this.translationSnap),
                kE.parent && kE.position.sub(Ce.setFromMatrixPosition(kE.parent.matrixWorld)))));
        else {
          if (kS === 'scale') {
            if (km.search('XYZ') !== -1) {
              let ks = this.pointEnd.length() / this.pointStart.length();
              (this.pointEnd.dot(this.pointStart) < 0 && (ks *= -1), rt.set(ks, ks, ks));
            } else
              (Ce.copy(this.pointStart),
                rt.copy(this.pointEnd),
                Ce.applyQuaternion(this._worldQuaternionInv),
                rt.applyQuaternion(this._worldQuaternionInv),
                rt.divide(Ce),
                km.search('X') === -1 && (rt.x = 1),
                km.search('Y') === -1 && (rt.y = 1),
                km.search('Z') === -1 && (rt.z = 1));
            (kE.scale.copy(this._scaleStart).multiply(rt),
              this.scaleSnap &&
                (km.search('X') !== -1 &&
                  (kE.scale.x =
                    Math.round(kE.scale.x / this.scaleSnap) * this.scaleSnap || this.scaleSnap),
                km.search('Y') !== -1 &&
                  (kE.scale.y =
                    Math.round(kE.scale.y / this.scaleSnap) * this.scaleSnap || this.scaleSnap),
                km.search('Z') !== -1 &&
                  (kE.scale.z =
                    Math.round(kE.scale.z / this.scaleSnap) * this.scaleSnap || this.scaleSnap)));
          } else {
            if (kS === 'rotate') {
              this._offset.copy(this.pointEnd).sub(this.pointStart);
              let kH =
                  20 /
                  this.worldPosition.distanceTo(Ce.setFromMatrixPosition(this.camera.matrixWorld)),
                ka = !1;
              (km === 'XYZE'
                ? (this.rotationAxis.copy(this._offset).cross(this.eye).normalize(),
                  (this.rotationAngle =
                    this._offset.dot(Ce.copy(this.rotationAxis).cross(this.eye)) * kH))
                : (km === 'X' || km === 'Y' || km === 'Z') &&
                  (this.rotationAxis.copy(Mi[km]),
                  Ce.copy(Mi[km]),
                  kF === 'local' && Ce.applyQuaternion(this.worldQuaternion),
                  Ce.cross(this.eye),
                  Ce.length() === 0
                    ? (ka = !0)
                    : (this.rotationAngle = this._offset.dot(Ce.normalize()) * kH)),
                (km === 'E' || ka) &&
                  (this.rotationAxis.copy(this.eye),
                  (this.rotationAngle = this.pointEnd.angleTo(this.pointStart)),
                  this._startNorm.copy(this.pointStart).normalize(),
                  this._endNorm.copy(this.pointEnd).normalize(),
                  (this.rotationAngle *=
                    this._endNorm.cross(this._startNorm).dot(this.eye) < 0 ? 1 : -1)),
                this.rotationSnap &&
                  (this.rotationAngle =
                    Math.round(this.rotationAngle / this.rotationSnap) * this.rotationSnap),
                kF === 'local' && km !== 'E' && km !== 'XYZE'
                  ? (kE.quaternion.copy(this._quaternionStart),
                    kE.quaternion
                      .multiply(we.setFromAxisAngle(this.rotationAxis, this.rotationAngle))
                      .normalize())
                  : (this.rotationAxis.applyQuaternion(this._parentQuaternionInv),
                    kE.quaternion.copy(we.setFromAxisAngle(this.rotationAxis, this.rotationAngle)),
                    kE.quaternion.multiply(this._quaternionStart).normalize()));
            }
          }
        }
        (this.dispatchEvent(Cn), this.dispatchEvent(Si));
      }
    }
    ['pointerUp'](kD) {
      (kD !== null && kD.button !== 0) ||
        (this.dragging && this.axis !== null && ((vi.mode = this.mode), this.dispatchEvent(vi)),
        (this.dragging = !1),
        (this.axis = null));
    }
    ['dispose']() {
      (this.domElement.removeEventListener('pointerdown', this._onPointerDown),
        this.domElement.removeEventListener('pointermove', this._onPointerHover),
        this.domElement.removeEventListener('pointermove', this._onPointerMove),
        this.domElement.removeEventListener('pointerup', this._onPointerUp),
        this.traverse(function (kD) {
          (kD.geometry && kD.geometry.dispose(), kD.material && kD.material.dispose());
        }));
    }
    ['attach'](kD) {
      return ((this.object = kD), (this.visible = !0), this);
    }
    ['detach']() {
      return ((this.object = void 0), (this.visible = !1), (this.axis = null), this);
    }
    ['reset']() {
      this.enabled &&
        this.dragging &&
        (this.object.position.copy(this._positionStart),
        this.object.quaternion.copy(this._quaternionStart),
        this.object.scale.copy(this._scaleStart),
        this.dispatchEvent(Cn),
        this.dispatchEvent(Si),
        this.pointStart.copy(this.pointEnd));
    }
    ['getRaycaster']() {
      return ct;
    }
    ['getMode']() {
      return this.mode;
    }
    ['setMode'](kD) {
      this.mode = kD;
    }
    ['setTranslationSnap'](kD) {
      this.translationSnap = kD;
    }
    ['setRotationSnap'](kD) {
      this.rotationSnap = kD;
    }
    ['setScaleSnap'](kD) {
      this.scaleSnap = kD;
    }
    ['setSize'](kD) {
      this.size = kD;
    }
    ['setSpace'](kD) {
      this.space = kD;
    }
  };
function Nr(kD) {
  if (this.domElement.ownerDocument.pointerLockElement) return { x: 0, y: 0, button: kD.button };
  {
    let km = this.domElement.getBoundingClientRect();
    return {
      x: ((kD.clientX - km.left) / km.width) * 2 - 1,
      y: (-(kD.clientY - km.top) / km.height) * 2 + 1,
      button: kD.button,
    };
  }
}
function Vr(kD) {
  if (this.enabled)
    switch (kD.pointerType) {
      case 'mouse':
      case 'pen':
        this.pointerHover(this._getPointer(kD));
        break;
    }
}
function Dr(kD) {
  this.enabled &&
    (document.pointerLockElement || this.domElement.setPointerCapture(kD.pointerId),
    this.domElement.addEventListener('pointermove', this._onPointerMove),
    this.pointerHover(this._getPointer(kD)),
    this.pointerDown(this._getPointer(kD)));
}
function qr(kD) {
  this.enabled && this.pointerMove(this._getPointer(kD));
}
function Qr(kD) {
  this.enabled &&
    (this.domElement.releasePointerCapture(kD.pointerId),
    this.domElement.removeEventListener('pointermove', this._onPointerMove),
    this.pointerUp(this._getPointer(kD)));
}
function On(kD, km, kS) {
  let kE = km.intersectObject(kD, !0);
  for (let kF = 0; kF < kE.length; kF++) if (kE[kF].object.visible || kS) return kE[kF];
  return !1;
}
var Tt = new k2(),
  de = new i(0, 1, 0),
  Pi = new i(0, 0, 0),
  Ai = new k1(),
  Zt = new h(),
  Gt = new h(),
  Qe = new i(),
  Ci = new k1(),
  At = new i(1, 0, 0),
  pt = new i(0, 1, 0),
  Ct = new i(0, 0, 1),
  Kt = new i(),
  $t = new i(),
  Pt = new i(),
  In = class extends k3 {
    constructor() {
      (super(), (this.isTransformControlsGizmo = !0), (this.type = 'TransformControlsGizmo'));
      let kD = new k6({ depthTest: !1, depthWrite: !1, fog: !1, toneMapped: !1, transparent: !0 }),
        km = new k4({ depthTest: !1, depthWrite: !1, fog: !1, toneMapped: !1, transparent: !0 }),
        kS = kD.clone();
      kS.opacity = 0.15;
      let kE = km.clone();
      kE.opacity = 0.5;
      let kF = kD.clone();
      kF.color.setHex(16711680);
      let kC = kD.clone();
      kC.color.setHex(65280);
      let ks = kD.clone();
      ks.color.setHex(255);
      let kH = kD.clone();
      (kH.color.setHex(16711680), (kH.opacity = 0.5));
      let ka = kD.clone();
      (ka.color.setHex(65280), (ka.opacity = 0.5));
      let ke = kD.clone();
      (ke.color.setHex(255), (ke.opacity = 0.5));
      let kR = kD.clone();
      kR.opacity = 0.25;
      let kl = kD.clone();
      (kl.color.setHex(16776960), (kl.opacity = 0.25), kD.clone().color.setHex(16776960));
      let kQ = kD.clone();
      kQ.color.setHex(7895160);
      let kc = new Y(0, 0.04, 0.1, 12);
      kc.translate(0, 0.05, 0);
      let kj = new y(0.08, 0.08, 0.08);
      kj.translate(0, 0.04, 0);
      let kz = new kw();
      kz.setAttribute('position', new kk([0, 0, 0, 1, 0, 0], 3));
      let kp = new Y(0.0075, 0.0075, 0.5, 3);
      kp.translate(0, 0.25, 0);
      function kO(kb, kx) {
        let ky = new I(kb, 0.0075, 3, 64, kx * Math.PI * 2);
        return (ky.rotateY(Math.PI / 2), ky.rotateX(Math.PI / 2), ky);
      }
      function kf() {
        let kb = new kw();
        return (kb.setAttribute('position', new kk([0, 0, 0, 1, 1, 1], 3)), kb);
      }
      let kJ = {
          X: [
            [new kV(kc, kF), [0.5, 0, 0], [0, 0, -Math.PI / 2]],
            [new kV(kc, kF), [-0.5, 0, 0], [0, 0, Math.PI / 2]],
            [new kV(kp, kF), [0, 0, 0], [0, 0, -Math.PI / 2]],
          ],
          Y: [
            [new kV(kc, kC), [0, 0.5, 0]],
            [new kV(kc, kC), [0, -0.5, 0], [Math.PI, 0, 0]],
            [new kV(kp, kC)],
          ],
          Z: [
            [new kV(kc, ks), [0, 0, 0.5], [Math.PI / 2, 0, 0]],
            [new kV(kc, ks), [0, 0, -0.5], [-Math.PI / 2, 0, 0]],
            [new kV(kp, ks), null, [Math.PI / 2, 0, 0]],
          ],
          XYZ: [[new kV(new G(0.1, 0), kR.clone()), [0, 0, 0]]],
          XY: [[new kV(new y(0.15, 0.15, 0.01), ke.clone()), [0.15, 0.15, 0]]],
          YZ: [[new kV(new y(0.15, 0.15, 0.01), kH.clone()), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]],
          XZ: [
            [new kV(new y(0.15, 0.15, 0.01), ka.clone()), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]],
          ],
        },
        kZ = {
          X: [
            [new kV(new Y(0.2, 0, 0.6, 4), kS), [0.3, 0, 0], [0, 0, -Math.PI / 2]],
            [new kV(new Y(0.2, 0, 0.6, 4), kS), [-0.3, 0, 0], [0, 0, Math.PI / 2]],
          ],
          Y: [
            [new kV(new Y(0.2, 0, 0.6, 4), kS), [0, 0.3, 0]],
            [new kV(new Y(0.2, 0, 0.6, 4), kS), [0, -0.3, 0], [0, 0, Math.PI]],
          ],
          Z: [
            [new kV(new Y(0.2, 0, 0.6, 4), kS), [0, 0, 0.3], [Math.PI / 2, 0, 0]],
            [new kV(new Y(0.2, 0, 0.6, 4), kS), [0, 0, -0.3], [-Math.PI / 2, 0, 0]],
          ],
          XYZ: [[new kV(new G(0.2, 0), kS)]],
          XY: [[new kV(new y(0.2, 0.2, 0.01), kS), [0.15, 0.15, 0]]],
          YZ: [[new kV(new y(0.2, 0.2, 0.01), kS), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]],
          XZ: [[new kV(new y(0.2, 0.2, 0.01), kS), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]],
        },
        kU = {
          START: [[new kV(new G(0.01, 2), kE), null, null, null, 'helper']],
          END: [[new kV(new G(0.01, 2), kE), null, null, null, 'helper']],
          DELTA: [[new k5(kf(), kE), null, null, null, 'helper']],
          X: [[new k5(kz, kE.clone()), [-1000, 0, 0], null, [1000000, 1, 1], 'helper']],
          Y: [
            [new k5(kz, kE.clone()), [0, -1000, 0], [0, 0, Math.PI / 2], [1000000, 1, 1], 'helper'],
          ],
          Z: [
            [
              new k5(kz, kE.clone()),
              [0, 0, -1000],
              [0, -Math.PI / 2, 0],
              [1000000, 1, 1],
              'helper',
            ],
          ],
        },
        ku = {
          XYZE: [[new kV(kO(0.5, 1), kQ), null, [0, Math.PI / 2, 0]]],
          X: [[new kV(kO(0.5, 0.5), kF)]],
          Y: [[new kV(kO(0.5, 0.5), kC), null, [0, 0, -Math.PI / 2]]],
          Z: [[new kV(kO(0.5, 0.5), ks), null, [0, Math.PI / 2, 0]]],
          E: [[new kV(kO(0.75, 1), kl), null, [0, Math.PI / 2, 0]]],
        },
        kd = { AXIS: [[new k5(kz, kE.clone()), [-1000, 0, 0], null, [1000000, 1, 1], 'helper']] },
        kK = {
          XYZE: [[new kV(new g(0.25, 10, 8), kS)]],
          X: [[new kV(new I(0.5, 0.1, 4, 24), kS), [0, 0, 0], [0, -Math.PI / 2, -Math.PI / 2]]],
          Y: [[new kV(new I(0.5, 0.1, 4, 24), kS), [0, 0, 0], [Math.PI / 2, 0, 0]]],
          Z: [[new kV(new I(0.5, 0.1, 4, 24), kS), [0, 0, 0], [0, 0, -Math.PI / 2]]],
          E: [[new kV(new I(0.75, 0.1, 2, 24), kS)]],
        },
        kT = {
          X: [
            [new kV(kj, kF), [0.5, 0, 0], [0, 0, -Math.PI / 2]],
            [new kV(kp, kF), [0, 0, 0], [0, 0, -Math.PI / 2]],
            [new kV(kj, kF), [-0.5, 0, 0], [0, 0, Math.PI / 2]],
          ],
          Y: [
            [new kV(kj, kC), [0, 0.5, 0]],
            [new kV(kp, kC)],
            [new kV(kj, kC), [0, -0.5, 0], [0, 0, Math.PI]],
          ],
          Z: [
            [new kV(kj, ks), [0, 0, 0.5], [Math.PI / 2, 0, 0]],
            [new kV(kp, ks), [0, 0, 0], [Math.PI / 2, 0, 0]],
            [new kV(kj, ks), [0, 0, -0.5], [-Math.PI / 2, 0, 0]],
          ],
          XY: [[new kV(new y(0.15, 0.15, 0.01), ke), [0.15, 0.15, 0]]],
          YZ: [[new kV(new y(0.15, 0.15, 0.01), kH), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]],
          XZ: [[new kV(new y(0.15, 0.15, 0.01), ka), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]],
          XYZ: [[new kV(new y(0.1, 0.1, 0.1), kR.clone())]],
        },
        kA = {
          X: [
            [new kV(new Y(0.2, 0, 0.6, 4), kS), [0.3, 0, 0], [0, 0, -Math.PI / 2]],
            [new kV(new Y(0.2, 0, 0.6, 4), kS), [-0.3, 0, 0], [0, 0, Math.PI / 2]],
          ],
          Y: [
            [new kV(new Y(0.2, 0, 0.6, 4), kS), [0, 0.3, 0]],
            [new kV(new Y(0.2, 0, 0.6, 4), kS), [0, -0.3, 0], [0, 0, Math.PI]],
          ],
          Z: [
            [new kV(new Y(0.2, 0, 0.6, 4), kS), [0, 0, 0.3], [Math.PI / 2, 0, 0]],
            [new kV(new Y(0.2, 0, 0.6, 4), kS), [0, 0, -0.3], [-Math.PI / 2, 0, 0]],
          ],
          XY: [[new kV(new y(0.2, 0.2, 0.01), kS), [0.15, 0.15, 0]]],
          YZ: [[new kV(new y(0.2, 0.2, 0.01), kS), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]],
          XZ: [[new kV(new y(0.2, 0.2, 0.01), kS), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]],
          XYZ: [[new kV(new y(0.2, 0.2, 0.2), kS), [0, 0, 0]]],
        },
        kX = {
          X: [[new k5(kz, kE.clone()), [-1000, 0, 0], null, [1000000, 1, 1], 'helper']],
          Y: [
            [new k5(kz, kE.clone()), [0, -1000, 0], [0, 0, Math.PI / 2], [1000000, 1, 1], 'helper'],
          ],
          Z: [
            [
              new k5(kz, kE.clone()),
              [0, 0, -1000],
              [0, -Math.PI / 2, 0],
              [1000000, 1, 1],
              'helper',
            ],
          ],
        };
      function kL(kb) {
        let kx = new k3();
        for (let ky in kb)
          for (let kW = kb[ky].length; kW--;) {
            let kq = kb[ky][kW][0].clone(),
              kP = kb[ky][kW][1],
              kY = kb[ky][kW][2],
              kv = kb[ky][kW][3],
              kB = kb[ky][kW][4];
            ((kq.name = ky),
              (kq.tag = kB),
              kP && kq.position.set(kP[0], kP[1], kP[2]),
              kY && kq.rotation.set(kY[0], kY[1], kY[2]),
              kv && kq.scale.set(kv[0], kv[1], kv[2]),
              kq.updateMatrix());
            let kG = kq.geometry.clone();
            (kG.applyMatrix4(kq.matrix),
              (kq.geometry = kG),
              (kq.renderOrder = 1 / 0),
              kq.position.set(0, 0, 0),
              kq.rotation.set(0, 0, 0),
              kq.scale.set(1, 1, 1),
              kx.add(kq));
          }
        return kx;
      }
      ((this.gizmo = {}),
        (this.picker = {}),
        (this.helper = {}),
        this.add((this.gizmo.translate = kL(kJ))),
        this.add((this.gizmo.rotate = kL(ku))),
        this.add((this.gizmo.scale = kL(kT))),
        this.add((this.picker.translate = kL(kZ))),
        this.add((this.picker.rotate = kL(kK))),
        this.add((this.picker.scale = kL(kA))),
        this.add((this.helper.translate = kL(kU))),
        this.add((this.helper.rotate = kL(kd))),
        this.add((this.helper.scale = kL(kX))),
        (this.picker.translate.visible = !1),
        (this.picker.rotate.visible = !1),
        (this.picker.scale.visible = !1));
    }
    ['updateMatrixWorld'](kD) {
      let km =
        (this.mode === 'scale' ? 'local' : this.space) === 'local' ? this.worldQuaternion : Gt;
      ((this.gizmo.translate.visible = this.mode === 'translate'),
        (this.gizmo.rotate.visible = this.mode === 'rotate'),
        (this.gizmo.scale.visible = this.mode === 'scale'),
        (this.helper.translate.visible = this.mode === 'translate'),
        (this.helper.rotate.visible = this.mode === 'rotate'),
        (this.helper.scale.visible = this.mode === 'scale'));
      let kS = [];
      ((kS = kS.concat(this.picker[this.mode].children)),
        (kS = kS.concat(this.gizmo[this.mode].children)),
        (kS = kS.concat(this.helper[this.mode].children)));
      for (let kE = 0; kE < kS.length; kE++) {
        let kF = kS[kE];
        ((kF.visible = !0), kF.rotation.set(0, 0, 0), kF.position.copy(this.worldPosition));
        let kC;
        if (
          (this.camera.isOrthographicCamera
            ? (kC = (this.camera.top - this.camera.bottom) / this.camera.zoom)
            : (kC =
                this.worldPosition.distanceTo(this.cameraPosition) *
                Math.min(
                  (1.9 * Math.tan((Math.PI * this.camera.fov) / 360)) / this.camera.zoom,
                  7,
                )),
          kF.scale.set(1, 1, 1).multiplyScalar((kC * this.size) / 4),
          kF.tag === 'helper')
        ) {
          ((kF.visible = !1),
            kF.name === 'AXIS'
              ? ((kF.visible = !!this.axis),
                this.axis === 'X' &&
                  (we.setFromEuler(Tt.set(0, 0, 0)),
                  kF.quaternion.copy(km).multiply(we),
                  Math.abs(de.copy(At).applyQuaternion(km).dot(this.eye)) > 0.9 &&
                    (kF.visible = !1)),
                this.axis === 'Y' &&
                  (we.setFromEuler(Tt.set(0, 0, Math.PI / 2)),
                  kF.quaternion.copy(km).multiply(we),
                  Math.abs(de.copy(pt).applyQuaternion(km).dot(this.eye)) > 0.9 &&
                    (kF.visible = !1)),
                this.axis === 'Z' &&
                  (we.setFromEuler(Tt.set(0, Math.PI / 2, 0)),
                  kF.quaternion.copy(km).multiply(we),
                  Math.abs(de.copy(Ct).applyQuaternion(km).dot(this.eye)) > 0.9 &&
                    (kF.visible = !1)),
                this.axis === 'XYZE' &&
                  (we.setFromEuler(Tt.set(0, Math.PI / 2, 0)),
                  de.copy(this.rotationAxis),
                  kF.quaternion.setFromRotationMatrix(Ai.lookAt(Pi, de, pt)),
                  kF.quaternion.multiply(we),
                  (kF.visible = this.dragging)),
                this.axis === 'E' && (kF.visible = !1))
              : kF.name === 'START'
                ? (kF.position.copy(this.worldPositionStart), (kF.visible = this.dragging))
                : kF.name === 'END'
                  ? (kF.position.copy(this.worldPosition), (kF.visible = this.dragging))
                  : kF.name === 'DELTA'
                    ? (kF.position.copy(this.worldPositionStart),
                      kF.quaternion.copy(this.worldQuaternionStart),
                      Ce.set(1e-10, 1e-10, 1e-10)
                        .add(this.worldPositionStart)
                        .sub(this.worldPosition)
                        .multiplyScalar(-1),
                      Ce.applyQuaternion(this.worldQuaternionStart.clone().invert()),
                      kF.scale.copy(Ce),
                      (kF.visible = this.dragging))
                    : (kF.quaternion.copy(km),
                      this.dragging
                        ? kF.position.copy(this.worldPositionStart)
                        : kF.position.copy(this.worldPosition),
                      this.axis && (kF.visible = this.axis.search(kF.name) !== -1)));
          continue;
        }
        (kF.quaternion.copy(km),
          this.mode === 'translate' || this.mode === 'scale'
            ? (kF.name === 'X' &&
                Math.abs(de.copy(At).applyQuaternion(km).dot(this.eye)) > 0.99 &&
                (kF.scale.set(1e-10, 1e-10, 1e-10), (kF.visible = !1)),
              kF.name === 'Y' &&
                Math.abs(de.copy(pt).applyQuaternion(km).dot(this.eye)) > 0.99 &&
                (kF.scale.set(1e-10, 1e-10, 1e-10), (kF.visible = !1)),
              kF.name === 'Z' &&
                Math.abs(de.copy(Ct).applyQuaternion(km).dot(this.eye)) > 0.99 &&
                (kF.scale.set(1e-10, 1e-10, 1e-10), (kF.visible = !1)),
              kF.name === 'XY' &&
                Math.abs(de.copy(Ct).applyQuaternion(km).dot(this.eye)) < 0.2 &&
                (kF.scale.set(1e-10, 1e-10, 1e-10), (kF.visible = !1)),
              kF.name === 'YZ' &&
                Math.abs(de.copy(At).applyQuaternion(km).dot(this.eye)) < 0.2 &&
                (kF.scale.set(1e-10, 1e-10, 1e-10), (kF.visible = !1)),
              kF.name === 'XZ' &&
                Math.abs(de.copy(pt).applyQuaternion(km).dot(this.eye)) < 0.2 &&
                (kF.scale.set(1e-10, 1e-10, 1e-10), (kF.visible = !1)))
            : this.mode === 'rotate' &&
              (Zt.copy(km),
              de.copy(this.eye).applyQuaternion(we.copy(km).invert()),
              kF.name.search('E') !== -1 &&
                kF.quaternion.setFromRotationMatrix(Ai.lookAt(this.eye, Pi, pt)),
              kF.name === 'X' &&
                (we.setFromAxisAngle(At, Math.atan2(-de.y, de.z)),
                we.multiplyQuaternions(Zt, we),
                kF.quaternion.copy(we)),
              kF.name === 'Y' &&
                (we.setFromAxisAngle(pt, Math.atan2(de.x, de.z)),
                we.multiplyQuaternions(Zt, we),
                kF.quaternion.copy(we)),
              kF.name === 'Z' &&
                (we.setFromAxisAngle(Ct, Math.atan2(de.y, de.x)),
                we.multiplyQuaternions(Zt, we),
                kF.quaternion.copy(we))),
          (kF.visible = kF.visible && (kF.name.indexOf('X') === -1 || this.showX)),
          (kF.visible = kF.visible && (kF.name.indexOf('Y') === -1 || this.showY)),
          (kF.visible = kF.visible && (kF.name.indexOf('Z') === -1 || this.showZ)),
          (kF.visible =
            kF.visible &&
            (kF.name.indexOf('E') === -1 || (this.showX && this.showY && this.showZ))),
          (kF.material._color = kF.material._color || kF.material.color.clone()),
          (kF.material._opacity = kF.material._opacity || kF.material.opacity),
          kF.material.color.copy(kF.material._color),
          (kF.material.opacity = kF.material._opacity),
          this.enabled &&
            this.axis &&
            (kF.name === this.axis ||
              this.axis.split('').some(function (ks) {
                return kF.name === ks;
              })) &&
            (kF.material.color.setHex(16776960), (kF.material.opacity = 1)));
      }
      super.updateMatrixWorld(kD);
    }
  },
  Ln = class extends kV {
    constructor() {
      (super(
        new q(100000, 100000, 2, 2),
        new k6({
          visible: !1,
          wireframe: !0,
          side: k7,
          transparent: !0,
          opacity: 0.1,
          toneMapped: !1,
        }),
      ),
        (this.isTransformControlsPlane = !0),
        (this.type = 'TransformControlsPlane'));
    }
    ['updateMatrixWorld'](kD) {
      let km = this.space;
      switch (
        (this.position.copy(this.worldPosition),
        this.mode === 'scale' && (km = 'local'),
        Kt.copy(At).applyQuaternion(km === 'local' ? this.worldQuaternion : Gt),
        $t.copy(pt).applyQuaternion(km === 'local' ? this.worldQuaternion : Gt),
        Pt.copy(Ct).applyQuaternion(km === 'local' ? this.worldQuaternion : Gt),
        de.copy($t),
        this.mode)
      ) {
        case 'translate':
        case 'scale':
          switch (this.axis) {
            case 'X':
              (de.copy(this.eye).cross(Kt), Qe.copy(Kt).cross(de));
              break;
            case 'Y':
              (de.copy(this.eye).cross($t), Qe.copy($t).cross(de));
              break;
            case 'Z':
              (de.copy(this.eye).cross(Pt), Qe.copy(Pt).cross(de));
              break;
            case 'XY':
              Qe.copy(Pt);
              break;
            case 'YZ':
              Qe.copy(Kt);
              break;
            case 'XZ':
              (de.copy(Pt), Qe.copy($t));
              break;
            case 'XYZ':
            case 'E':
              Qe.set(0, 0, 0);
              break;
          }
          break;
        default:
          Qe.set(0, 0, 0);
      }
      (Qe.length() === 0
        ? this.quaternion.copy(this.cameraQuaternion)
        : (Ci.lookAt(Ce.set(0, 0, 0), Qe, de), this.quaternion.setFromRotationMatrix(Ci)),
        super.updateMatrixWorld(kD));
    }
  },
  ut = ['l', 'r'],
  Oi = (kD) => kD === 'root' || kD === 'pelvis' || kD.startsWith('ik_') || kD.startsWith('socket_'),
  Ur = (kD) => kD.name.slice(0, kD.name.lastIndexOf('.')),
  Yr = (kD) => kD.name.slice(kD.name.lastIndexOf('.') + 1);
function Ii(kD) {
  let km = kD.clone(!0),
    kS = [];
  km.traverse((kE) => {
    (kE.isMesh || kE.isSkinnedMesh || kE.isCamera || kE.isLight) && kS.push(kE);
  });
  for (let kE of kS) kE.removeFromParent();
  return (km.updateMatrixWorld(!0), km);
}
function Jt(kD, km) {
  let kS = null;
  return (
    kD.traverse((kE) => {
      !kS && kE.name === km && (kS = kE);
    }),
    kS
  );
}
function ds({ ours: kD, theirs: km, THREE: kS }) {
  let kE = Ii(kD),
    kF = Ii(km),
    kC = (kT) => Jt(kE, kT),
    ks = (kT) => Jt(kF, kT),
    kH = (kT) => kT.getWorldPosition(new kS['Vector3']()),
    ka = (kT) => kT.getWorldQuaternion(new kS.Quaternion()),
    ke = !0;
  if (
    (kE.traverse((kT) => {
      if (!ke || !kT.isBone) return;
      let kA = ks(kT.name);
      (!kA || kA.position.distanceTo(kT.position) > 0.00001) && (ke = !1);
    }),
    ke)
  )
    return null;
  let kR = (kT, kA) => ({
      pelvis: kA(kT, 'pelvis').position.clone(),
      root: kA(kT, 'root').position.clone(),
      ...Object.fromEntries(
        ut.flatMap((kX) => [
          ['ankle_' + kX, kH(kA(kT, 'foot_' + kX))],
          ['ball_' + kX, kH(kA(kT, 'ball_' + kX))],
          ['qfoot_' + kX, ka(kA(kT, 'foot_' + kX))],
        ]),
      ),
      hip: kH(kA(kT, 'pelvis')).y - (kH(kA(kT, 'foot_l')).y + kH(kA(kT, 'foot_r')).y) / 2,
    }),
    kl = kR(kE, Jt),
    kQ = kR(kF, Jt),
    kc = kQ.hip / kl.hip,
    kj = new kS.Vector3(1, 0, 0),
    kz = (kT, kA) => {
      let kX = kT.parent.getWorldQuaternion(new kS['Quaternion']()),
        kL = new kS['Quaternion']().setFromAxisAngle(kj, kA);
      kT.quaternion.premultiply(kX.clone().invert().multiply(kL).multiply(kX));
    },
    kp = ut.map((kT) => [ks('thigh_' + kT), ks('calf_' + kT)]),
    kO = kp.map(([kT, kA]) => [kT.quaternion.clone(), kA.quaternion.clone()]);
  for (let [kT, kA] of kp) (kz(kT, -0.5), kz(kA, 1));
  kF.updateMatrixWorld(!0);
  let kf = Oo(kF, kS);
  (kp.forEach(([kX, kL], kb) => {
    (kX.quaternion.copy(kO[kb][0]), kL.quaternion.copy(kO[kb][1]));
  }),
    kF.updateMatrixWorld(!0));
  let kJ = Object.fromEntries(ut.map((kX) => [kX, new kS.Object3D()])),
    kZ = new WeakMap();
  function kU(kX) {
    let kL = kX.clone();
    kL.tracks = [];
    for (let kb of kX.tracks) {
      let kx = Ur(kb),
        ky = Yr(kb);
      if (ky === 'scale' && !Oi(kx)) continue;
      if (ky !== 'position') {
        kL.tracks.push(kb);
        continue;
      }
      if (!Oi(kx)) continue;
      if (kx !== 'pelvis' && kx !== 'root') {
        kL.tracks.push(kb);
        continue;
      }
      let kW = kb.clone(),
        [kq, kP] = kx === 'pelvis' ? [kl.pelvis, kQ.pelvis] : [kl.root, kQ.root],
        kY = kW.values;
      for (let kv = 0; kv < kY.length; kv += 3)
        ((kY[kv] = kP.x + kc * (kY[kv] - kq.x)),
          (kY[kv + 1] = kP.y + kc * (kY[kv + 1] - kq.y)),
          (kY[kv + 2] = kP.z + kc * (kY[kv + 2] - kq.z)));
      kL.tracks.push(kW);
    }
    return kL;
  }
  function ku(kX) {
    let kL = null;
    for (let kx of kX.tracks) (!kL || kx.times.length > kL.length) && (kL = kx.times);
    if (kL && kL.length > 2 && kL[0] <= 0.000001 && kL[kL.length - 1] >= kX.duration - 0.0001)
      return Float32Array.from(kL);
    let kb = Math.max(2, Math.round(kX.duration * 30) + 1);
    return Float32Array.from({ length: kb }, (ky, kW) => (kX.duration * kW) / (kb - 1));
  }
  function kd(kX, kL) {
    let kb = ku(kX),
      kx = Math.max(kX.duration - 0.000001, 0),
      ky = new kS['AnimationMix' + 'er'](kE),
      kW = new kS['AnimationMix' + 'er'](kF);
    (ky.clipAction(kX).play(), kW.clipAction(kL).play());
    let kq = (w5, w6, w7) => {
        (w5.setTime(Math.min(w7, kx)), w6.updateMatrixWorld(!0));
      },
      kP = [],
      kY = 1 / 0;
    for (let w5 of kb) {
      kq(ky, kE, w5);
      let w6 = {};
      for (let w7 of ut)
        ((w6['ankle_' + w7] = kH(kC('foot_' + w7))),
          (w6['ball_' + w7] = kH(kC('ball_' + w7))),
          (w6['qfoot_' + w7] = ka(kC('foot_' + w7))),
          (kY = Math.min(kY, w6['ball_' + w7].y)));
      kP.push(w6);
    }
    let kv = Math.min(kl.ball_l.y, kl.ball_r.y),
      kB = kY >= kv - 0.01 && kY <= kv + 0.04,
      kG = ut.flatMap((w8) => ['thigh', 'calf', 'foot'].map((w9) => ks(w9 + '_' + w8))),
      kg = kG.map(() => new Float32Array(kb.length * 4)),
      kI = new kS['Vector3'](),
      kh = new kS['Vector3'](),
      kN = new kS['Vector3'](),
      kM = new kS['Vector3'](),
      w0 = new kS['Quaternion'](),
      w1 = new kS['Quaternion'](),
      w2 = new kS['Vector3'](0, 0, 1),
      w3 = Object.fromEntries(
        ut.map((w8) => [w8, kQ['ankle_' + w8].clone().sub(kQ['ball_' + w8])]),
      );
    if (
      (kb.forEach((w8, w9) => {
        if ((kq(kW, kF, w8), kB)) {
          let wk = kP[w9];
          for (let ww of ut) {
            let wV = wk['ankle_' + ww],
              wD = wk['ball_' + ww];
            w0.copy(wk['qfoot_' + ww]).multiply(kl['qfoot_' + ww].clone().invert());
            let wm = Math.min(1, Math.max(0, (kY + 0.03 - wD.y) / 0.015));
            kh.lerpVectors(wV, wD, wm);
            let wS = w3[ww].clone().applyQuaternion(w0);
            kI.set(kc * kh.x + wm * wS.x, 0, kc * kh.z + wm * wS.z);
            let wE = kQ['ankle_' + ww].y + kc * (wV.y - kl['ankle_' + ww].y),
              wF = kQ['ball_' + ww].y + (wD.y - kl['ball_' + ww].y) + wS.y;
            ((kI.y = wm * wF + (1 - wm) * wE),
              kM.copy(w2).applyQuaternion(w0),
              (kM.y = 0),
              kM.lengthSq() > 1e-8 ? w1.setFromUnitVectors(w2, kM.normalize()) : w1.identity(),
              kN.set(kQ['ankle_' + ww].x - kc * kl['ankle_' + ww].x, 0, 0).applyQuaternion(w1),
              kJ[ww].position.copy(kI).add(kN),
              kJ[ww].quaternion.copy(w0).multiply(kQ['qfoot_' + ww]),
              kJ[ww].updateMatrixWorld(!0),
              kf.set('leg_' + ww, { node: kJ[ww], soften: 0, matchRotation: !0 }));
          }
          kf.run();
        }
        (kG.forEach((wC, ws) => wC.quaternion.toArray(kg[ws], w9 * 4)), kB && kf.restore());
      }),
      ky.stopAllAction(),
      ky.uncacheRoot(kE),
      kW.stopAllAction(),
      kW.uncacheRoot(kF),
      !kB)
    )
      return kL;
    let w4 = new Set(kG.map((w8) => w8.name + '.quaternion'));
    return (
      (kL.tracks = kL.tracks.filter((w8) => !w4.has(w8.name))),
      kG.forEach((w8, w9) =>
        kL.tracks.push(new kS['QuaternionKe' + 'yframeTrack'](w8.name + '.quaternion', kb, kg[w9])),
      ),
      kL
    );
  }
  function kK(kX) {
    if (!kX) return kX;
    let kL = kZ.get(kX);
    if (kL) return kL;
    let kb = kd(kX, kU(kX));
    return ((kb.name = kX.name), kZ.set(kX, kb), kb);
  }
  return { s: kc, fit: kK };
}
export {
  go as a,
  $i as b,
  xo as c,
  _t as d,
  Gr as e,
  Jr as f,
  Oo as g,
  $o as h,
  Io as i,
  ra as j,
  aa as k,
  sa as l,
  ds as m,
  ca as n,
  Wo as o,
  pa as p,
  Xi as q,
  Ge as r,
  wa as s,
  ga as t,
  ya as u,
  Ko as v,
  Go as w,
  Ro as x,
  kt as y,
  or as z,
  Ca as A,
  ar as B,
  Oa as C,
  Ia as D,
  ei as E,
  La as F,
  Fa as G,
  Wa as H,
  ja as I,
  Ba as J,
  ni as K,
  hr as L,
  Ka as M,
  wr as N,
  gr as O,
  xn as P,
  Ga as Q,
  ns as R,
  os as S,
  rs as T,
  as as U,
  ss as V,
};
