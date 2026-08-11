// Utilitários puros (sem dependências) para detectar e remover metadados
// sensíveis (EXIF / GPS / XMP / IPTC / comentários) de JPEG, PNG e WebP.
//
// Usado por:
//   - scripts/strip-exif.mjs        (remoção)
//   - scripts/check-photo-privacy.mjs (verificação / gate de CI)

/** Palavras que indicam dado pessoal dentro de blocos de metadados. */
const PERSONAL_HINTS = [
  "GPS",
  "GPSLatitude",
  "GPSLongitude",
  "geo:lat",
  "geo:long",
  "Artist",
  "Author",
  "Copyright",
  "OwnerName",
  "CameraOwnerName",
  "SerialNumber",
  "BodySerialNumber",
  "LensSerialNumber",
  "creator",
  "@gmail",
  "@hotmail",
  "@outlook",
  "iPhone",
  "Samsung",
];

function scanHints(buf) {
  const text = buf.toString("latin1");
  const found = new Set();
  for (const hint of PERSONAL_HINTS) {
    if (text.includes(hint)) found.add(hint);
  }
  return [...found];
}

export function detectKind(buf) {
  if (buf.length > 3 && buf[0] === 0xff && buf[1] === 0xd8) return "jpeg";
  if (buf.length > 8 && buf.toString("latin1", 1, 4) === "PNG") return "png";
  if (
    buf.length > 12 &&
    buf.toString("latin1", 0, 4) === "RIFF" &&
    buf.toString("latin1", 8, 12) === "WEBP"
  )
    return "webp";
  return null;
}

/* ------------------------------- JPEG ---------------------------------- */
// Remove todos os segmentos APPn (EXIF, XMP, IPTC/Photoshop, Flashpix) e COM.
// Mantém APP14/Adobe (necessário para cores CMYK/YCCK) e todos os segmentos
// estruturais (SOF, DHT, DQT, SOS, dados de imagem).
function processJpeg(buf) {
  const meta = [];
  const out = [Buffer.from([0xff, 0xd8])];
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) break;
    const marker = buf[i + 1];
    if (marker === 0xd8 || (marker >= 0xd0 && marker <= 0xd9)) {
      out.push(buf.subarray(i, i + 2));
      i += 2;
      continue;
    }
    if (marker === 0xda) {
      // Start of Scan: copia o resto do arquivo como está.
      out.push(buf.subarray(i));
      i = buf.length;
      break;
    }
    const len = buf.readUInt16BE(i + 2);
    const segment = buf.subarray(i, i + 2 + len);
    const isApp = marker >= 0xe0 && marker <= 0xef;
    const isComment = marker === 0xfe;
    const isAdobe = marker === 0xee;
    // APP0/JFIF é inofensivo e mantido para compatibilidade máxima.
    const isJfif = marker === 0xe0;
    if ((isApp && !isAdobe && !isJfif) || isComment) {
      meta.push({
        block: `JPEG APP${marker - 0xe0 >= 0 ? marker - 0xe0 : "?"}`,
        hints: scanHints(segment),
        bytes: segment.length,
      });
    } else {
      out.push(segment);
    }
    i += 2 + len;
  }
  return { meta, output: Buffer.concat(out) };
}

/* -------------------------------- PNG ---------------------------------- */
// Remove chunks auxiliares que carregam metadados: tEXt, zTXt, iTXt, eXIf,
// tIME, e o legado dSIG. Mantém IHDR/PLTE/IDAT/IEND/gAMA/sRGB/etc.
const PNG_DROP = new Set(["tEXt", "zTXt", "iTXt", "eXIf", "tIME", "dSIG"]);

function processPng(buf) {
  const meta = [];
  const out = [buf.subarray(0, 8)];
  let i = 8;
  while (i + 8 <= buf.length) {
    const len = buf.readUInt32BE(i);
    const type = buf.toString("latin1", i + 4, i + 8);
    const end = i + 12 + len;
    if (end > buf.length) break;
    const chunk = buf.subarray(i, end);
    if (PNG_DROP.has(type)) {
      meta.push({ block: `PNG ${type}`, hints: scanHints(chunk), bytes: chunk.length });
    } else {
      out.push(chunk);
    }
    i = end;
    if (type === "IEND") break;
  }
  return { meta, output: Buffer.concat(out) };
}

/* -------------------------------- WEBP --------------------------------- */
// Remove chunks EXIF e XMP  do container RIFF e reescreve o tamanho do RIFF.
const WEBP_DROP = new Set(["EXIF", "XMP "]);

function processWebp(buf) {
  const meta = [];
  const chunks = [];
  let i = 12;
  while (i + 8 <= buf.length) {
    const type = buf.toString("latin1", i, i + 4);
    const len = buf.readUInt32LE(i + 4);
    const padded = len + (len % 2);
    const end = i + 8 + padded;
    if (end > buf.length) break;
    const chunk = buf.subarray(i, end);
    if (WEBP_DROP.has(type)) {
      meta.push({ block: `WEBP ${type.trim()}`, hints: scanHints(chunk), bytes: chunk.length });
    } else {
      chunks.push(chunk);
    }
    i = end;
  }
  if (meta.length === 0) return { meta, output: buf };
  const body = Buffer.concat(chunks);
  const header = Buffer.alloc(12);
  header.write("RIFF", 0, "latin1");
  header.writeUInt32LE(body.length + 4, 4);
  header.write("WEBP", 8, "latin1");
  return { meta, output: Buffer.concat([header, body]) };
}

/**
 * Analisa um buffer de imagem.
 * @returns {{kind:string|null, meta:Array<{block:string,hints:string[],bytes:number}>, output:Buffer}}
 */
export function analyzeImage(buf) {
  const kind = detectKind(buf);
  if (kind === "jpeg") return { kind, ...processJpeg(buf) };
  if (kind === "png") return { kind, ...processPng(buf) };
  if (kind === "webp") return { kind, ...processWebp(buf) };
  return { kind, meta: [], output: buf };
}

/** Metadados que contêm GPS ou identificação pessoal. */
export function personalFlags(meta) {
  return [...new Set(meta.flatMap((m) => m.hints))];
}
