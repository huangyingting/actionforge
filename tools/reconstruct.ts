import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';
import { format } from 'prettier';

const modules: Record<string, string> = {
  'app-4JQULA2W.js': 'workspace.js',
  'lab-72QIVQDF.js': 'motion-lab.js',
  'support-FZHEHS7G.js': 'support-page.js',
  'weigh-OPIQUMM7.js': 'rigging/weight-worker.js',
  'chunk-3UOX4UCD.js': 'animation/channels.js',
  'chunk-4DVGLAQP.js': 'viewport/previews.js',
  'chunk-52V366VX.js': 'storage/poses.js',
  'chunk-5XWVQFQS.js': 'export/pipeline.js',
  'chunk-AMAQLGCD.js': 'export/character.js',
  'chunk-CO4MCQPB.js': 'rigging/retargeting.js',
  'chunk-CPUGT4BZ.js': 'viewport/pose-pictures.js',
  'chunk-D5VHZ24B.js': 'storage/sandbox.js',
  'chunk-FM4UWJW2.js': 'animation/engine.js',
  'chunk-P4M7LDLI.js': 'ui/support.js',
  'chunk-PFCWXCJE.js': 'animation/math.js',
  'chunk-QAYMYIFY.js': 'storage/database.js',
  'chunk-SMYC4QRH.js': 'viewport/player.js',
  'chunk-UHE5JC23.js': 'storage/characters.js',
  'chunk-WZJAMXK2.js': 'storage/library.js',
  'chunk-ZBXR6ILP.js': 'animation/poses.js',
  'chunk-WOT6VMZA.js': 'interop/exports.js',
  'worker-chunk-EKRUETHP.js': 'interop/worker.js',
  'chunk-424QW4UB.js': 'api/library.js',
  'chunk-B3W5HN4L.js': 'api/sandbox.js',
  'chunk-HQ47KXIE.js': 'api/previews.js',
  'chunk-L5QZ4J3N.js': 'api/export.js',
  'chunk-PSEENFNU.js': 'api/poses.js',
  'chunk-SIOXDXDL.js': 'api/characters.js',
  'chunk-SNZBGXSF.js': 'dependencies/skeleton-utils.js',
  'chunk-AEX4U7TB.js': 'dependencies/gltf-loader.js',
  'chunk-5OE2BFZ5.js': 'dependencies/fbx-loader.js',
  'chunk-WF24PV27.js': 'dependencies/gltf-exporter.js',
  'chunk-V3QDYHZ2.js': 'dependencies/compression.js',
  'chunk-U5OA4UBJ.js': 'dependencies/three.js',
  'chunk-LITFYBKH.js': 'dependencies/three-compat.js',
  'chunk-LRBD3KUD.js': 'dependencies/fbx-loader-compat.js',
  'chunk-LTFKZNF4.js': 'dependencies/gltf-exporter-compat.js',
  'chunk-RV72EV3K.js': 'dependencies/gltf-loader-compat.js',
  'chunk-LRDA3RI3.js': 'dependencies/skeleton-utils-compat.js',
  'chunk-ACLMWW67.js': 'dependencies/fbx-exporter.js',
  'chunk-MVBEEGRT.js': 'dependencies/compression-compat.js',
  'chunk-7LC4R6EN.js': 'dependencies/video-muxer.js',
};
const root = process.argv[3];
const input = process.argv[2];
if (!input || !root)
  throw new Error(
    'Usage: node tools/reconstruct.ts ARCHIVED_SCRIPTS OUTPUT_DIRECTORY. Normal builds use src/ directly.',
  );
const replacements: Record<string, string> = {
  'chunk-U5OA4UBJ.js': "export * from 'three';",
  'chunk-AEX4U7TB.js': "export { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';",
  'chunk-5OE2BFZ5.js': "export { FBXLoader } from 'three/addons/loaders/FBXLoader.js';",
  'chunk-WF24PV27.js': "export { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';",
  'chunk-SNZBGXSF.js':
    "export { clone, retarget, retargetClip } from 'three/addons/utils/SkeletonUtils.js';",
  'chunk-V3QDYHZ2.js': "export * from 'fflate';",
  'chunk-LRBD3KUD.js': "export { FBXLoader as a } from 'three/addons/loaders/FBXLoader.js';",
  'chunk-LTFKZNF4.js':
    "export { GLTFExporter as a } from 'three/addons/exporters/GLTFExporter.js';",
  'chunk-RV72EV3K.js': "export { GLTFLoader as a } from 'three/addons/loaders/GLTFLoader.js';",
  'chunk-LRDA3RI3.js':
    "export { retarget as a, retargetClip as b, clone as c } from 'three/addons/utils/SkeletonUtils.js';",
  'chunk-ACLMWW67.js': "export * from '@comfyorg/fbx-exporter-three';",
  'chunk-7LC4R6EN.js': "export * from 'mp4-muxer';",
};

function parse(filename: string, text: string) {
  return ts.createSourceFile(filename, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
}
const original = new Map<string, string>();
for (const filename of Object.keys(modules))
  original.set(filename, await readFile(path.join(input, filename), 'utf8'));

// Public library facades retain the original upstream export names.
function facadeNames(facade: string): Map<string, string> {
  const tree = parse(facade, original.get(facade)!);
  const locals = new Map<string, string>();
  const exports = new Map<string, string>();
  for (const statement of tree.statements) {
    if (
      ts.isImportDeclaration(statement) &&
      statement.importClause?.namedBindings &&
      ts.isNamedImports(statement.importClause.namedBindings)
    ) {
      for (const specifier of statement.importClause.namedBindings.elements) {
        locals.set(specifier.name.text, specifier.propertyName?.text || specifier.name.text);
      }
    }
    if (
      ts.isExportDeclaration(statement) &&
      statement.exportClause &&
      ts.isNamedExports(statement.exportClause)
    ) {
      for (const specifier of statement.exportClause.elements) {
        exports.set(
          locals.get(specifier.propertyName?.text || specifier.name.text)!,
          specifier.name.text,
        );
      }
    }
  }
  return exports;
}
const threeNames = facadeNames('chunk-U5OA4UBJ.js');
const threeTree = parse('three', original.get('chunk-LITFYBKH.js')!);
const threeExports = threeTree.statements.find(ts.isExportDeclaration)?.exportClause;
if (!threeExports || !ts.isNamedExports(threeExports))
  throw new Error('Three.js export table not found.');
replacements['chunk-LITFYBKH.js'] = threeExports.elements
  .map((specifier) => {
    const name = threeNames.get(specifier.name.text);
    if (name) return `export { ${name} as ${specifier.name.text} } from 'three';`;
    if (specifier.name.text === 'Jg')
      return `import * as THREE from 'three'; export { THREE as Jg };`;
    throw new Error(`Unknown Three.js export: ${specifier.name.text}`);
  })
  .join('\n');
replacements['chunk-MVBEEGRT.js'] = [...facadeNames('chunk-V3QDYHZ2.js')]
  .map(([alias, name]) => `export { ${name} as ${alias} } from 'fflate';`)
  .join('\n');

let decodedCount = 0;
for (const [filename, destination] of Object.entries(modules)) {
  let text = replacements[filename];
  if (!text) {
    const source = original.get(filename)!;
    const tree = parse(filename, source);
    const bootstrap = tree.statements.find(
      (node) =>
        ts.isExpressionStatement(node) &&
        node.getText(tree).includes('parseInt(') &&
        node.getText(tree).includes('shift'),
    );
    if (bootstrap) {
      const bootstrapText = bootstrap.getText(tree);
      const decoderName = bootstrapText.match(/(?:const|var|let)\s+\w+=(\w+),/)?.[1];
      const arrayName = bootstrapText.match(/}\((\w+),0x/)?.[1];
      if (!decoderName || !arrayName) throw new Error(`Unknown decoder bootstrap in ${filename}`);
      const decoderFunctions = tree.statements
        .filter(ts.isFunctionDeclaration)
        .filter((node) => node.name && [decoderName, arrayName].includes(node.name.text));
      const context = vm.createContext({});
      vm.runInContext(
        `${decoderFunctions.map((node) => node.getText(tree)).join('\n')}\n${bootstrapText}`,
        context,
        { timeout: 10000 },
      );
      const decode = vm.runInContext(decoderName, context) as (index: number) => string;
      const virtual = path.resolve(filename);
      const host = ts.createCompilerHost({ allowJs: true, noResolve: true });
      host.getSourceFile = (file) => (file === virtual ? tree : undefined);
      const program = ts.createProgram(
        [virtual],
        { allowJs: true, noResolve: true, noLib: true },
        host,
      );
      const checker = program.getTypeChecker();
      const decoder = checker.getSymbolAtLocation(
        decoderFunctions.find((node) => node.name?.text === decoderName)!.name!,
      )!;
      const aliases = new Set([decoder]);
      const variables: ts.VariableDeclaration[] = [];
      function collect(node: ts.Node) {
        if (
          ts.isVariableDeclaration(node) &&
          ts.isIdentifier(node.name) &&
          node.initializer &&
          ts.isIdentifier(node.initializer)
        )
          variables.push(node);
        ts.forEachChild(node, collect);
      }
      collect(tree);
      for (let pass = 0; pass < 10; pass++) {
        for (const variable of variables) {
          if (aliases.has(checker.getSymbolAtLocation(variable.initializer!)!))
            aliases.add(checker.getSymbolAtLocation(variable.name)!);
        }
      }
      const removed = new Set<ts.Node>([bootstrap, ...decoderFunctions]);
      let unresolved = 0;
      const transformed = ts.transform(tree, [
        (context) => {
          const factory = context.factory;
          const visit: ts.Visitor = (node) => {
            if (removed.has(node)) return undefined;
            if (
              ts.isVariableDeclaration(node) &&
              aliases.has(checker.getSymbolAtLocation(node.name)!)
            )
              return undefined;
            if (
              ts.isCallExpression(node) &&
              ts.isIdentifier(node.expression) &&
              aliases.has(checker.getSymbolAtLocation(node.expression)!)
            ) {
              if (node.arguments.length !== 1 || !ts.isNumericLiteral(node.arguments[0])) {
                unresolved++;
                return node;
              }
              decodedCount++;
              return factory.createStringLiteral(decode(Number(node.arguments[0].text)));
            }
            const next = ts.visitEachChild(node, visit, context);
            if (ts.isVariableStatement(next) && !next.declarationList.declarations.length)
              return undefined;
            return next;
          };
          return (root) => ts.visitNode(root, visit) as ts.SourceFile;
        },
      ]);
      if (unresolved) throw new Error(`${filename} has ${unresolved} dynamic decoder calls.`);
      text = ts.createPrinter().printFile(transformed.transformed[0] as ts.SourceFile);
      transformed.dispose();
    } else text = source;
  }
  // Constant folding removes split strings and encoded property names without running application code.
  const tree = parse(filename, text);
  const transformed = ts.transform(tree, [
    (context) => {
      const factory = context.factory;
      const visit: ts.Visitor = (node) => {
        const next = ts.visitEachChild(node, visit, context);
        if (
          ts.isBinaryExpression(next) &&
          next.operatorToken.kind === ts.SyntaxKind.PlusToken &&
          ts.isStringLiteral(next.left) &&
          ts.isStringLiteral(next.right)
        ) {
          return factory.createStringLiteral(next.left.text + next.right.text);
        }
        if (
          ts.isElementAccessExpression(next) &&
          ts.isStringLiteral(next.argumentExpression) &&
          /^[A-Za-z_$][\w$]*$/.test(next.argumentExpression.text)
        ) {
          return ts.isOptionalChain(next)
            ? factory.createPropertyAccessChain(
                next.expression,
                next.questionDotToken,
                next.argumentExpression.text,
              )
            : factory.createPropertyAccessExpression(next.expression, next.argumentExpression.text);
        }
        if (ts.isNumericLiteral(next)) return factory.createNumericLiteral(Number(next.text));
        if (ts.isStringLiteral(next)) {
          let value = next.text;
          const referenced = path.posix.basename(value);
          if (
            Object.hasOwn(modules, referenced) &&
            (value.startsWith('./') || value === referenced)
          ) {
            value = path.posix.relative(path.posix.dirname(destination), modules[referenced]);
            if (!value.startsWith('.')) value = `./${value}`;
          }
          return factory.createStringLiteral(value);
        }
        return next;
      };
      return (root) => ts.visitNode(root, visit) as ts.SourceFile;
    },
  ]);
  text = ts.createPrinter().printFile(transformed.transformed[0] as ts.SourceFile);
  transformed.dispose();
  text = await format(text, { parser: 'babel', singleQuote: true, printWidth: 100 });
  const target = path.join(root, destination);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, text);
  console.log(`${filename} -> ${target} (${text.length} characters)`);
}
console.log(
  `Decoded ${decodedCount} string references. Replaced upstream libraries with package imports.`,
);
