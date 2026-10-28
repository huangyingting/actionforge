import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { build } from 'esbuild';

async function list(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) =>
      entry.isDirectory()
        ? list(path.join(directory, entry.name))
        : [path.join(directory, entry.name)],
    ),
  );
  return files.flat();
}
const files = (await list('out')).map((file) => file.slice(4).replaceAll(path.sep, '/')).sort();
if (files.some((file) => file.startsWith('scripts/'))) {
  throw new Error('Published scripts must be compiled from src/, not copied from public/scripts.');
}
const hash = createHash('sha256');
for (const file of files.filter(
  (file) => !['sw.js', 'version.json', 'recovery-inventory.json'].includes(file),
)) {
  hash.update(file).update(await readFile(`out/${file}`));
}
const version = `source-${hash.digest('hex').slice(0, 20)}`;
const manifest = JSON.parse(await readFile('out/manifest.webmanifest', 'utf8'));
manifest.start_url = './';
manifest.scope = './';
await writeFile('out/manifest.webmanifest', JSON.stringify(manifest, null, 2));
const catalog = JSON.parse(
  await readFile('out/assets/animation-library/manifests/library.json', 'utf8'),
);
const seed = [
  ...Object.values(catalog.rigs as Record<string, { file: string }>).map(
    (rig) => `assets/animation-library/${rig.file}`,
  ),
  ...['a_tpose', 'idle_loop', 'walk_loop'].map(
    (id) => `assets/animation-library/${catalog.clips[id].file}`,
  ),
  ...files.filter((file) => file.startsWith('assets/animation-library/icons/')),
];
const shell = files.filter(
  (file) =>
    !file.startsWith('assets/animation-library/') &&
    !['sw.js', 'version.json', 'recovery-inventory.json'].includes(file) &&
    !file.endsWith('.txt') &&
    !file.endsWith('.map'),
);
await build({
  entryPoints: ['src/offline/service-worker.ts'],
  outfile: 'out/sw.js',
  bundle: true,
  minify: true,
  target: 'es2022',
  define: {
    __BUILD_VERSION__: JSON.stringify(version),
    __SHELL_FILES__: JSON.stringify(shell),
    __LIBRARY_SEED__: JSON.stringify(seed),
  },
});
await writeFile('out/version.json', JSON.stringify({ version }));
await writeFile('out/.nojekyll', '');
console.log(
  `Built offline shell ${version}: ${shell.length} shell resources, ${seed.length} library seeds.`,
);
