export function containModalFocus(dialog: HTMLElement): () => void {
  const background = Array.from(document.body.children)
    .filter((element): element is HTMLElement => element instanceof HTMLElement && !element.contains(dialog))
    .map(element => ({ element, inert: element.inert }));
  for (const { element } of background) element.inert = true;
  const focusable = () => Array.from(dialog.querySelectorAll<HTMLElement>(
    'a[href],button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),summary,[tabindex="0"]',
  )).filter(element => element.getClientRects().length > 0 && !element.closest('[inert]'));
  const onKey = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') return;
    const items = focusable();
    const target = event.shiftKey ? items.at(-1) : items[0];
    if (!items.length || !dialog.contains(document.activeElement) ||
      document.activeElement === (event.shiftKey ? items[0] : items.at(-1))) {
      event.preventDefault();
      target?.focus();
    }
  };
  document.addEventListener('keydown', onKey, true);
  return () => {
    document.removeEventListener('keydown', onKey, true);
    for (const { element, inert } of background) element.inert = inert;
  };
}
