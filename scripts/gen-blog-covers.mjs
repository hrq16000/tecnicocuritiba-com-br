import sharp from "sharp";
import fs from "fs/promises";
import path from "path";

// Reproduz src/lib/blogImages.ts (hashSlug + IMAGE_POOL) para saber qual foto
// Unsplash cada slug recebeu — assim otimizamos exatamente a capa atual.
const BASE = "auto=format&fit=crop&q=90";
const IMAGE_POOL = [
  "photo-1517694712202-14dd9538aa97","photo-1496181133206-80ce9b88a853","photo-1498050108023-c5249f4df085",
  "photo-1519389950473-47ba0277781c","photo-1555066931-4365d14bab8c","photo-1484788984921-03950022c9ef",
  "photo-1591799264318-7e6ef8ddb7ea","photo-1624996379697-f01d168b1a52","photo-1629654297299-c8506221ca97",
  "photo-1602837385569-08ac19ec83af","photo-1563206767-5b18f218e8de","photo-1601737487795-dab272f52420",
  "photo-1518770660439-4636190af475","photo-1588508065123-287b28e013da","photo-1621274403997-37aace184f49",
  "photo-1555617778-02518510b9fa","photo-1581092918056-0c4c3acd3789","photo-1597872200969-2b65d56bd16b",
  "photo-1587202372775-e229f172b9d7","photo-1562408590-e32931084e23","photo-1544197150-b99a580bb7a8",
  "photo-1558494949-ef010cbdcc31","photo-1550751827-4bd374c3f58b","photo-1557597774-9d273605dfa9",
  "photo-1563013544-824ae1b704d3","photo-1614064641938-3bbee52942c7","photo-1510915228340-29c85a43dcfe",
  "photo-1504384308090-c894fdcc538d","photo-1526374965328-7f61d4dc18c5","photo-1580894894513-541e068a3e2b",
  "photo-1553877522-43269d4ea984","photo-1460925895917-afdab827c52f","photo-1551288049-bebda4e38f71",
  "photo-1559526324-4b87b5e36e44","photo-1531482615713-2afd69097998","photo-1454165804606-c3d57bc86b40",
  "photo-1557804506-669a67965ba0","photo-1573164574472-797cdf4a583a","photo-1499951360447-b19be8fe80f5",
  "photo-1434030216411-0b793f4b4173","photo-1511707171634-5f897ff02aa9","photo-1512054502232-10a0a035d672",
  "photo-1593359677879-a4bb92f829d1","photo-1558618666-fcd25c85f82e","photo-1585771724684-38269d6639fd",
  "photo-1527443224154-c4a3942d3acf","photo-1558618666-fcd25c85f82e","photo-1566576912321-d58ddd7a6088",
  "photo-1531545514256-b1400bc00f31","photo-1461749280684-dccba630e2f6","photo-1550745165-9bc0b252726f",
  "photo-1535378620166-273708d44e4c","photo-1542831371-29b0f74f9713","photo-1515879218367-8466d910auj7",
  "photo-1483058712412-4245e9b90334","photo-1487058792275-0ad4aaf24ca7","photo-1488590528505-98d2b5aba04b",
  "photo-1504639725590-34d0984388bd","photo-1461749280684-dccba630e2f6","photo-1605810230434-7631ac76ec81"
];
const hashSlug = (s) => { let h=0; for (const c of s) { h = ((h<<5)-h)+c.charCodeAt(0); h|=0; } return Math.abs(h); };
const unsplashUrl = (slug, w=1600) => `https://images.unsplash.com/${IMAGE_POOL[hashSlug(slug) % IMAGE_POOL.length]}?${BASE}&w=${w}`;

const SLUGS = [
  "quanto-custa-formatar-computador-curitiba",
  "meu-computador-precisa-de-formatacao",
  "notebook-nao-liga-o-que-fazer",
  "computador-lento-causas-solucoes",
  "sinais-computador-com-virus",
  "quando-trocar-hd-por-ssd",
  "como-fazer-upgrade-ssd-nvme",
  "upgrade-ram-quando-vale-a-pena",
  "backup-como-proteger-seus-arquivos",
  "como-escolher-tecnico-informatica-confiavel-curitiba",
];

const WIDTHS = [480, 768, 1200];
const outRoot = "public/blog-covers";
await fs.mkdir(outRoot, { recursive: true });

const results = [];
let totalBefore = 0, totalAfterAvif1200 = 0;

for (const slug of SLUGS) {
  const url = unsplashUrl(slug, 1600);
  const outDir = path.join(outRoot, slug);
  await fs.mkdir(outDir, { recursive: true });
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const beforeBytes = buf.length;
    totalBefore += beforeBytes;

    // Crop 1200x630 base (16:8.4 ~ social/OG friendly)
    const base = sharp(buf).resize({ width: 1200, height: 630, fit: "cover", position: "attention" });

    let after1200Avif = 0;
    for (const w of WIDTHS) {
      const h = Math.round(w * 630 / 1200);
      const src = await base.clone().resize({ width: w, height: h, fit: "cover" }).toBuffer();
      const jpg = await sharp(src).jpeg({ quality: 82, progressive: true, mozjpeg: true }).toBuffer();
      const webp = await sharp(src).webp({ quality: 80 }).toBuffer();
      const avif = await sharp(src).avif({ quality: 50, effort: 4 }).toBuffer();
      await fs.writeFile(path.join(outDir, `cover-${w}.jpg`), jpg);
      await fs.writeFile(path.join(outDir, `cover-${w}.webp`), webp);
      await fs.writeFile(path.join(outDir, `cover-${w}.avif`), avif);
      if (w === 1200) after1200Avif = avif.length;
    }
    totalAfterAvif1200 += after1200Avif;
    results.push({ slug, ok: true, beforeBytes, after1200Avif });
    console.log(`✓ ${slug} — before ${(beforeBytes/1024).toFixed(0)}KB → AVIF 1200w ${(after1200Avif/1024).toFixed(0)}KB`);
  } catch (e) {
    results.push({ slug, ok: false, error: String(e) });
    console.error(`✗ ${slug} — ${e.message}`);
  }
}

console.log("\n=== TOTAL ===");
console.log(`Before (Unsplash originals): ${(totalBefore/1024).toFixed(0)} KB`);
console.log(`After  (AVIF 1200w local):   ${(totalAfterAvif1200/1024).toFixed(0)} KB`);
console.log(`Failures: ${results.filter(r=>!r.ok).map(r=>r.slug).join(", ") || "none"}`);
await fs.writeFile("/tmp/blog-covers-report.json", JSON.stringify(results, null, 2));
