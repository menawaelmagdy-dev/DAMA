/**
 * Mirror every ERA Residence asset referenced by src/lib/era.ts into /public/era
 * and rewrite src/lib/assets.local.json so the site is served fully self-hosted.
 *
 *   npm run assets:fetch
 *
 * Run this on a machine with normal internet access — the build sandbox this
 * project was created in can only reach npm/GitHub, which is why the site ships
 * pointing at ERA's own CDN.
 */
import fs from "node:fs/promises";
import path from "node:path";

const ERA_TS = "src/lib/era.ts";
const OUT_DIR = "public/era";
const MANIFEST = "src/lib/assets.local.json";

const source = await fs.readFile(ERA_TS, "utf8");

const cdn = /const CDN = "([^"]+)"/.exec(source)?.[1];
const folderM = /const M = `\$\{CDN\}\/([^`]+)`/.exec(source)?.[1];
const folderS = /const S = `\$\{CDN\}\/([^`]+)`/.exec(source)?.[1];

if (!cdn || !folderM || !folderS) {
  console.error("Could not parse the CDN folders out of src/lib/era.ts");
  process.exit(1);
}

const targets = new Map(); // absolute url -> filename

const add = (folder, file) => {
  if (file.includes("${")) return; // skip the helper template, e.g. `${S}/${file}`
  const decoded = decodeURIComponent(file);
  targets.set(`${cdn}/${folder}/${file}`, path.basename(decoded));
};

for (const m of source.matchAll(/`\$\{M\}\/([^`]+)`/g)) add(folderM, m[1]);
for (const m of source.matchAll(/`\$\{S\}\/([^`]+)`/g)) add(folderS, m[1]);
for (const m of source.matchAll(/U\("([^"]+)"\)/g)) add(folderS, m[1]);

console.log(`Found ${targets.size} assets to mirror.`);

await fs.mkdir(OUT_DIR, { recursive: true });

const manifest = {};
let ok = 0;
const failed = [];

for (const [url, filename] of targets) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await fs.writeFile(path.join(OUT_DIR, filename), buf);
    manifest[url] = `/era/${filename}`;
    ok += 1;
    process.stdout.write(`✓ ${filename} (${(buf.length / 1024).toFixed(0)} KB)\n`);
  } catch (err) {
    failed.push(`${url} — ${err.message}`);
    process.stdout.write(`✗ ${filename}\n`);
  }
}

await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");

console.log(`\nMirrored ${ok}/${targets.size} assets into ${OUT_DIR}.`);
console.log(`Wrote ${MANIFEST} — the site now serves these locally.`);
if (failed.length) {
  console.log(`\nFailed:\n${failed.join("\n")}`);
  process.exitCode = 1;
}
