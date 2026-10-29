import { containModalFocus } from './modal';

var p = Object.freeze({
  lines: Object.freeze([
    'ActionForge is free. Tips to help fund development are coming soon.',
    'In the meantime, you can help by:',
  ]),
  ways: Object.freeze([
    Object.freeze({ text: 'Subscribing on YouTube', href: 'https://www.youtube.com/@cgstuff87' }),
    Object.freeze({ text: 'Joining the Discord', href: 'https://discord.gg/uwWgHYKFNq' }),
    Object.freeze({ text: 'Sharing ActionForge with other animators' }),
  ]),
});
function m({ button: D, config: S = p }) {
  if (!D) return;
  let E = null;
  let releaseFocus = null;
  D.addEventListener('click', () => F());
  function F() {
    if (E) return;
    ((E = r('div', 'af-newsbox')),
      E.addEventListener('click', (z) => {
        z.target === E && C();
      }));
    let H = r('div', 'af-newsbox__panel af-support');
    (H.setAttribute('role', 'dialog'),
      H.setAttribute('aria-modal', 'true'),
      H.setAttribute('aria-label', 'Support ActionForge'));
    let R = r('div', 'af-newsbox__head');
    R.appendChild(r('h2', 'af-newsbox__title', 'Support ActionForge'));
    let Q = r('button', 'af-newsbox__close', '\u2715');
    ((Q.type = 'button'),
      (Q.title = 'Close'),
      Q.setAttribute('aria-label', 'Close'),
      Q.addEventListener('click', C),
      R.appendChild(Q));
    let j = r('div', 'af-newsbox__body');
    (u(j, S),
      H.append(R, j),
      E.appendChild(H),
      document.body.appendChild(E),
      (releaseFocus = containModalFocus(H)),
      document.addEventListener('keydown', s),
      Q.focus());
  }
  function C() {
    (releaseFocus?.(), (releaseFocus = null), E?.remove(), (E = null), document.removeEventListener('keydown', s), D.focus());
  }
  function s(H) {
    H.key === 'Escape' && C();
  }
}
function w(D, S = p) {
  return !D || !S?.lines?.length ? !1 : ((D.textContent = ''), u(D, S), !0);
}
function u(D, S) {
  for (let F of S.lines ?? []) D.appendChild(r('p', 'af-support__note', F));
  if (!S.ways?.length) return;
  let E = r('ul', 'af-support__ways');
  for (let C of S.ways) {
    let s = r('li');
    if (C.href) {
      let H = r('a', null, C.text);
      ((H.href = C.href), (H.target = '_blank'), (H.rel = 'noopener noreferrer'), s.appendChild(H));
    } else s.textContent = C.text;
    E.appendChild(s);
  }
  D.appendChild(E);
}
function r(D, S, E) {
  let F = document.createElement(D);
  return (S && (F.className = S), E != null && (F.textContent = E), F);
}
export { m as a, w as b };
