// NusaData — main.ts
// Program penyerahan entry (Node 22, hanya pustaka standar).
// Tugasnya satu: menyalin situs statis di app/ dan tangkapan layar di
// screenshots/ ke direktori keluaran, lalu menulis dossier.json memakai
// pustaka make.fun yang divendor — dossier itu yang dibaca juri.
// vendor/makefun-frontend.ts TIDAK BOLEH diubah: gate membandingkan
// dossier hasil program ini dengan dossier yang ditulis salinan pustaka
// milik mereka sendiri, byte demi byte.
//
// Di luar container penilai, MAKEFUN_OUTPUT_DIR menggantikan /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outDir, { recursive: true });
cpSync(join(repoRoot, 'app'), join(outDir, 'app'), { recursive: true });

const shotsDir = join(outDir, 'screenshots');
mkdirSync(shotsDir, { recursive: true });
if (existsSync(join(repoRoot, 'screenshots'))) {
  cpSync(join(repoRoot, 'screenshots'), shotsDir, { recursive: true });
}

// Batas gate (lihat reference/gate.json di kit): hanya text_max_bytes
// yang membentuk isi dossier; sisanya menolak entry yang memang akan
// ditolak penilai (lebih dari 4 tangkapan layar, satu di atas 256 KiB,
// app/ di atas 993 berkas atau 16 MiB).
const dossier = buildDossier(outDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
writeFileSync(join(outDir, 'dossier.json'), dossier);
