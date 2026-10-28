import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { parse } from 'parse5';
import type { DefaultTreeAdapterTypes } from 'parse5';
import { format } from 'prettier';
import { execFileSync } from 'node:child_process';

const snapshot = (file: string) =>
  execFileSync('git', ['show', `a5154e4:${file}`], { maxBuffer: 5 * 1024 * 1024 });

type Node = DefaultTreeAdapterTypes.Node;
const attributes: Record<string, string> = {
  class: 'className',
  for: 'htmlFor',
  tabindex: 'tabIndex',
  readonly: 'readOnly',
  autocomplete: 'autoComplete',
  autofocus: 'autoFocus',
  crossorigin: 'crossOrigin',
  playsinline: 'playsInline',
  allowfullscreen: 'allowFullScreen',
  maxlength: 'maxLength',
  minlength: 'minLength',
  rowspan: 'rowSpan',
  colspan: 'colSpan',
  srcset: 'srcSet',
  'stroke-width': 'strokeWidth',
  'stroke-linecap': 'strokeLinecap',
  'stroke-linejoin': 'strokeLinejoin',
  'stroke-dasharray': 'strokeDasharray',
  'fill-rule': 'fillRule',
  'clip-rule': 'clipRule',
  viewbox: 'viewBox',
  value: 'defaultValue',
  checked: 'defaultChecked',
  spellcheck: 'spellCheck',
};
const boolean = new Set([
  'hidden',
  'disabled',
  'checked',
  'multiple',
  'required',
  'autofocus',
  'readonly',
  'autoplay',
  'loop',
  'muted',
  'controls',
  'playsinline',
  'allowfullscreen',
  'open',
]);
const voidElements = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
]);

function render(node: Node): string {
  if (node.nodeName === '#text') {
    const text = node as DefaultTreeAdapterTypes.TextNode;
    if (
      !text.value.trim() &&
      text.parentNode &&
      ['table', 'thead', 'tbody', 'tfoot', 'tr', 'colgroup'].includes(text.parentNode.nodeName)
    )
      return '';
    return `{${JSON.stringify(text.value)}}`;
  }
  if (!('tagName' in node)) return '';
  if (['script', 'style'].includes(node.tagName)) return '';
  if (node.tagName === 'noscript') {
    const html = node.childNodes
      .filter((child) => child.nodeName === '#text')
      .map((child) => (child as DefaultTreeAdapterTypes.TextNode).value)
      .join('');
    return `<noscript dangerouslySetInnerHTML={{ __html: ${JSON.stringify(html)} }} />`;
  }
  const props: Record<string, string | boolean | number> = {};
  for (const attr of node.attrs) {
    if (attr.name === 'selected') continue;
    const key =
      attr.name === 'value' && node.tagName === 'option'
        ? 'value'
        : attributes[attr.name] || attr.name;
    if (attr.name === 'style') {
      const style = Object.fromEntries(
        attr.value
          .split(';')
          .filter((s) => s.includes(':'))
          .map((s) => {
            const index = s.indexOf(':');
            return [
              s
                .slice(0, index)
                .trim()
                .replace(/-([a-z])/g, (_, c: string) => c.toUpperCase()),
              s.slice(index + 1).trim(),
            ];
          }),
      );
      props.style = JSON.stringify(style);
    } else
      props[key] =
        key === 'tabIndex'
          ? Number(attr.value)
          : key === 'spellCheck'
            ? attr.value === 'true'
            : boolean.has(attr.name)
              ? true
              : attr.value;
  }
  if (node.tagName === 'select') {
    const selected = node.childNodes.find(
      (child) => 'attrs' in child && child.attrs.some((a) => a.name === 'selected'),
    );
    if (selected && 'attrs' in selected)
      props.defaultValue = selected.attrs.find((a) => a.name === 'value')?.value || '';
  }
  const attrs = Object.entries(props)
    .map(([key, value]) =>
      key === 'style'
        ? ` style={${value}}`
        : value === true
          ? ` ${key}`
          : ` ${key}={${JSON.stringify(value)}}`,
    )
    .join('');
  return voidElements.has(node.tagName)
    ? `<${node.tagName}${attrs}/>`
    : `<${node.tagName}${attrs}>${node.childNodes.map(render).join('')}</${node.tagName}>`;
}

for (const [file, name] of [
  ['index.html', 'WorkspaceShell'],
  ['motion-lab.html', 'MotionLabShell'],
  ['support.html', 'SupportShell'],
]) {
  const html = snapshot(`public/${file}`).toString();
  const tree = parse(html);
  const htmlNode = tree.childNodes.find(
    (n) => n.nodeName === 'html',
  ) as DefaultTreeAdapterTypes.Element;
  const body = htmlNode.childNodes.find(
    (n) => n.nodeName === 'body',
  ) as DefaultTreeAdapterTypes.Element;
  const style = file === 'motion-lab.html' ? html.match(/<style>([\s\S]*?)<\/style>/)?.[1] : '';
  const content = `export function ${name}() { return <>${style ? `<style>{${JSON.stringify(style)}}</style>` : ''}${body.childNodes.map(render).join('')}</>; }`;
  await mkdir('src/components', { recursive: true });
  await writeFile(
    `src/components/${name}.tsx`,
    await format(content, { parser: 'typescript', singleQuote: true, printWidth: 100 }),
  );
}
await mkdir('src/styles', { recursive: true });
for (const file of ['base.css', 'library.css', 'game-lab.css']) {
  const css = snapshot(`public/styles/${file}`).toString();
  await writeFile(`src/styles/${file}`, css.replaceAll('../assets/vendor/fonts/', '../fonts/'));
}
await mkdir('src/fonts', { recursive: true });
for (const font of [
  'orbitron-700-latin.woff2',
  'rajdhani-400-latin.woff2',
  'rajdhani-700-latin.woff2',
]) {
  await writeFile(`src/fonts/${font}`, await readFile(`public/assets/vendor/fonts/${font}`));
}
