// Build script: AnaMariatul-SC FUNGuild / FungalTraits / PICRUSt2 explainer deck (14 slides, 16:9)
// Usage: node build_deck.js [repoRoot] [outFile]
const pptxgen = require("pptxgenjs");
const sharp = require("sharp");
const React = require("react");
const RDS = require("react-dom/server");
const fa = require("react-icons/fa");
const fs = require("fs");
const path = require("path");
const { applyTheme } = require("/mnt/skills/public/pptx/scripts/apply_theme.js");

const ROOT = process.argv[2] || "/home/claude/AnaMariatul-PPT-Picrust2";
const OUT = process.argv[3] || "/mnt/user-data/outputs/AnaMariatul-SC-PICRUSt2-FUNGuild-Explainer.pptx";
const ASSETS = path.join(__dirname, "assets");
const MD = path.join(ROOT, "AnaMariatul-SC-FunGuildFungalTrait-PICRUSt2-PPTexplainer.md");

// ------------------------------------------------------------------ theme
const THEME = {
  name: "Mangrove ITS Explainer",
  headFontFace: "Cambria",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "1B2A33", lt1: "FFFFFF", dk2: "0E3B38", lt2: "EEF4F3",
    accent1: "268675", // fungal green (figs 01, 05, 07)
    accent2: "216B91", // FungalTraits blue (figs 02-04)
    accent3: "8155A3", // FUNGuild purple (figs 02-04)
    accent4: "A7AFB5", // "other / unassigned" gray
    accent5: "C9822B", // caution / table callouts / OTU_9
    accent6: "22536D", // navy
    hlink: "216B91", folHlink: "8155A3",
  },
};
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5 in (16:9)
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
pres.title = "Sample SC: Long-Read ITS Profiling, Guilds and PICRUSt2 Explainer";
pres.author = "LIHTR-BIOME";
const C = pres.SchemeColor;
const K = { ink: C.text1, white: C.background1, deep: C.text2, tint: C.background2,
  green: C.accent1, blue: C.accent2, purple: C.accent3, gray: C.accent4, amber: C.accent5, navy: C.accent6 };
const H = { mute: "5B6B73", line: "D5DEDD", amberTint: "FBF2E2", amberLine: "D9A24F", greenTint: "E6F2EF",
  blueTint: "E4EFF5", purpleTint: "F0EAF5", grayTint: "EEF1F3", cardDark: "14504A", onDark: "CFE3DF", mint: "7CC9BB" };

const W = 13.333, MX = 0.6, CW = 12.133; // slide width, side margin, content width
const shadow = () => ({ type: "outer", color: "0B2B29", blur: 8, offset: 2, angle: 90, opacity: 0.12 });

// ------------------------------------------------------------------ layouts
const footer = (color) => ({ text: { text: "Sample SC  ·  ONT ITS  ·  FUNGuild / FungalTraits  ·  PICRUSt2", options: { x: MX, y: 7.1, w: 8, h: 0.25, fontSize: 10, color, margin: 0 } } });
function layout(title, bg, kick, tit, sub, foot) {
  pres.defineSlideMaster({
    title, background: { color: bg },
    objects: [
      footer(foot),
      { placeholder: { options: { name: "kicker", type: "body", x: MX, y: 0.3, w: CW, h: 0.28, fontSize: 12, bold: true, color: kick, charSpacing: 1, margin: 0, valign: "top", align: "left" }, text: "" } },
      { placeholder: { options: { name: "title", type: "title", x: MX, y: 0.58, w: CW, h: 0.72, fontSize: 34, bold: true, color: tit, margin: 0, valign: "top", align: "left" }, text: "" } },
      { placeholder: { options: { name: "sub", type: "body", x: MX, y: 1.32, w: CW, h: 0.4, fontSize: 16, color: sub, margin: 0, valign: "top", align: "left" }, text: "" } },
    ],
    slideNumber: { x: 12.2, y: 7.08, w: 0.53, h: 0.28, fontSize: 10, color: foot, align: "right" },
  });
}
layout("LIGHT", "FFFFFF", C.accent1, C.text1, "5B6B73", "7A8A91");
layout("DARK", "0B3431", "7CC9BB", C.background1, "BFD9D4", "7FA39E");

// ------------------------------------------------------------------ helpers
const rt = (str, base = {}) => str.split(/(\*\*.+?\*\*|~.+?~)/).filter(Boolean).map((p) => {
  if (p.startsWith("**")) return { text: p.slice(2, -2), options: { ...base, bold: true } };
  if (p.startsWith("~")) return { text: p.slice(1, -1), options: { ...base, italic: true } };
  return { text: p, options: { ...base } };
});
// paragraphs -> runs with breakLine; items are strings (mini-markup) or {t, opts}
function paras(items, base = {}, gap = 0, bullet = false) {
  const out = [];
  items.forEach((it, i) => {
    const t = typeof it === "string" ? it : it.t;
    const o = { ...base, ...(typeof it === "string" ? {} : it.o) };
    const runs = rt(t, o);
    runs[0].options.paraSpaceAfter = gap;
    if (bullet) runs[0].options.bullet = bullet === "number" ? { type: "number", indent: 16 } : { indent: 14 };
    if (i < items.length - 1) runs[runs.length - 1].options.breakLine = true;
    out.push(...runs);
  });
  return out;
}
function tx(s, t, o) { s.addText(t, { isTextBox: true, margin: 0, valign: "top", fontSize: 14, color: K.ink, ...o }); }
function card(s, o) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: o.x, y: o.y, w: o.w, h: o.h, rectRadius: o.r ?? 0.12, objectName: o.name || "Card",
    fill: o.fillT ? { color: o.fill, transparency: o.fillT } : { color: o.fill ?? K.white },
    line: o.line ? { color: o.line, width: o.lw ?? 1, dashType: o.dash || "solid" } : { type: "none" },
    shadow: o.shadow ? shadow() : undefined,
  });
}
function badge(s, x, y, letter, color, d = 0.36, name = "Badge") {
  s.addText(letter, { shape: pres.shapes.OVAL, x, y, w: d, h: d, fill: { color }, color: K.white, bold: true, fontSize: d >= 0.5 ? 18 : 14,
    align: "center", valign: "middle", margin: 0, objectName: name });
}
function iconCircle(s, x, y, d, color, iconData, name = "Icon") {
  s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color }, line: { type: "none" }, objectName: name + " circle" });
  const k = d * 0.52;
  s.addImage({ data: iconData, x: x + (d - k) / 2, y: y + (d - k) / 2, w: k, h: k, altText: name });
}
function swatch(s, x, y, color, d = 0.2, hatchImg) {
  if (hatchImg) s.addImage({ path: hatchImg, x, y, w: d * 1.6, h: d, altText: "Hatched swatch (OTU_9)" });
  else s.addShape(pres.shapes.RECTANGLE, { x, y, w: d, h: d, fill: { color }, line: { type: "none" }, objectName: "Swatch" });
}
function pill(s, x, y, w, text, fill, color = K.white, fs = 11) {
  s.addText(text, { shape: pres.shapes.ROUNDED_RECTANGLE, rectRadius: 0.1, x, y, w, h: 0.26, fill: { color: fill }, color, bold: true, fontSize: fs,
    align: "center", valign: "middle", margin: 0, charSpacing: 1, objectName: "Tag" });
}
// rows of "swatch  pct  label"
function statRows(s, x, y, w, rows, pitch = 0.36, pctW = 0.92) {
  rows.forEach((r, i) => {
    const yy = y + i * pitch;
    swatch(s, x, yy + 0.04, r.color, 0.2, r.hatch);
    const off = r.hatch ? 0.4 : 0.3;
    tx(s, r.pct, { x: x + off, y: yy, w: pctW, h: 0.3, fontSize: 15, bold: true, valign: "middle" });
    tx(s, r.label, { x: x + off + pctW + 0.02, y: yy, w: w - off - pctW - 0.02, h: 0.3, fontSize: 14, valign: "middle" });
  });
}
// image in a framed card; contain-fit keeps the original aspect ratio
function figure(s, img, bx, by, bw, bh, alt) {
  const ar = IMG[img].w / IMG[img].h;
  let w = bw, h = bw / ar;
  if (h > bh) { h = bh; w = bh * ar; }
  const x = bx, y = by;
  card(s, { x: x - 0.06, y: y - 0.06, w: w + 0.12, h: h + 0.12, fill: K.white, line: H.line, lw: 0.75, shadow: true, r: 0.06, name: "Figure frame" });
  s.addImage({ path: IMG[img].path, x, y, w, h, altText: alt });
  return { x, y, w, h };
}
function tableCallout(s, o) { // amber, dashed: companion-TSV items not plotted in the PNG
  card(s, { x: o.x, y: o.y, w: o.w, h: o.h, fill: H.amberTint, line: H.amberLine, lw: 1.25, dash: "dash", name: "Table callout" });
  pill(s, o.x + 0.2, o.y + 0.17, 1.55, "TABLE CALLOUT", K.amber);
  tx(s, o.src, { x: o.x + 1.85, y: o.y + 0.17, w: o.w - 2.0, h: 0.28, fontSize: 11, color: H.mute, valign: "middle" });
}
const SRC = { fig: (f) => path.join(ROOT, "figures", f) };
const IMG = {};
async function loadImg(key, p) { const m = await sharp(p).metadata(); IMG[key] = { path: p, w: m.width, h: m.height }; }
async function icon(name, color = "#FFFFFF") {
  const svg = RDS.renderToStaticMarkup(React.createElement(fa[name], { color, size: 256 }));
  const buf = await sharp(Buffer.from(svg)).resize(256, 256).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

// ------------------------------------------------------------------ speaker notes from the markdown
function cleanMd(s) {
  return s.replace(/\*\*(.+?)\*\*/g, "$1").replace(/`/g, "")
    .replace(/(^|[^\w*])\*(?!\s)([^*\n]+?)\*(?![\w*])/g, "$1$2");
}
function bulletsToText(block) {
  return block.split("\n").filter((l) => l.trim() && !/^\s*---/.test(l)).map((l) => {
    const m = l.match(/^(\s*)(?:[*]|\d+\.)\s+(.*)$/);
    if (!m) return cleanMd(l.trim());
    const depth = Math.floor(m[1].length / 2);
    return (depth === 0 ? "• " : "    – ") + cleanMd(m[2]);
  }).join("\n");
}
function parseNotes() {
  const md = fs.readFileSync(MD, "utf8");
  const parts = md.split(/^### Slide (\d\d):[^\n]*\n/m); // [pre, "01", body, "02", body ...]
  const notes = {};
  for (let i = 1; i < parts.length; i += 2) {
    const n = parts[i]; let body = parts[i + 1].split(/\n---\s*\n/)[0];
    body = body.replace(/\n## PART[\s\S]*$/, "");
    const grab = (marker, until) => {
      const re = new RegExp("\\* \\*\\*" + marker + "[^\\n]*\\n([\\s\\S]*?)" + (until ? "(?=\\n\\* \\*\\*" + until + ")" : "$"));
      const m = body.match(re); return m ? m[1] : null;
    };
    let main = grab("Plain-English Elaboration"), ref = grab("Visual Elements Guide", "Plain-English Elaboration");
    if (!main) main = grab("Plain Description"); // slide 01
    if (!main) { const m = body.match(/\* \*\*Visual Wireframe:\*\*[^\n]*\n([\s\S]*)$/); main = m ? m[1] : body; }
    let txt = "SPEAKER NOTES — PLAIN-ENGLISH ELABORATION\n" + bulletsToText(main);
    if (ref) txt += "\n\nON-SLIDE CALLOUT REFERENCE (exact values)\n" + bulletsToText(ref);
    notes[n] = txt;
  }
  return notes;
}

// ------------------------------------------------------------------ slide scaffolding
let NOTES = {}; let curPart = "";
function part(title) { pres.addSection({ title }); curPart = title; }
function mk(n, layoutName, kicker, title, sub) {
  const s = pres.addSlide({ masterName: layoutName, sectionTitle: curPart });
  if (kicker) s.addText(kicker, { placeholder: "kicker" });
  s.addText(rt(title), { placeholder: "title" });
  if (sub) s.addText(rt(sub), { placeholder: "sub" });
  const nk = String(n).padStart(2, "0");
  if (NOTES[nk]) s.addNotes(NOTES[nk]);
  return s;
}
const P = {
  1: "PART 1 · INTRODUCTION & FOUNDATIONS", 2: "PART 2 · WHO IS IN YOUR SAMPLE?", 3: "PART 3 · WHAT ARE THEY DOING?",
  4: "PART 4 · WHAT IS THEIR METABOLIC POTENTIAL?", 5: "PART 5 · SYNTHESIS & NEXT STEPS", 6: "PART 6 · ACTION & DEFENSE",
};


// pptxgenjs writes one <a:pPr> per text run; a paragraph may only carry one, and it must come first.
// Keep the first (it holds bullet / spacing) and drop the rest so PowerPoint opens the file without repair.
async function dedupeParagraphProps(file) {
  const JSZip = require(require("module").createRequire("/usr/local/lib/node_modules_global/pptxgenjs/package.json").resolve("jszip"));
  const zip = await JSZip.loadAsync(fs.readFileSync(file));
  let removed = 0;
  for (const name of Object.keys(zip.files).filter((n) => /^ppt\/(slides|notesSlides)\/[^/]+\.xml$/.test(n))) {
    let xml = await zip.file(name).async("string");
    xml = xml.replace(/<a:p>([\s\S]*?)<\/a:p>/g, (m, inner) => {
      const re = /<a:pPr\b[^>]*?(?:\/>|>[\s\S]*?<\/a:pPr>)/g;
      let k = 0;
      const out = inner.replace(re, (blk) => { k++; if (k === 1) return blk; removed++; return ""; });
      return "<a:p>" + out + "</a:p>";
    });
    zip.file(name, xml);
  }
  fs.writeFileSync(file, await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" }));
  return removed;
}


// ---- draft-text cards are read straight from the markdown so deck and source stay identical
function mdCards(n) {
  const md = fs.readFileSync(MD, "utf8");
  const sec = md.split(/^### Slide /m).find((x) => x.startsWith(String(n).padStart(2, "0") + ":"));
  return [...sec.matchAll(/^\s+> "(.*)"\s*$/gm)].map((m) => m[1].replace(/\*(?!\s)([^*]+?)\*/g, "~$1~"));
}
function narrative(n, part, title, sub, fs) {
  const s = mk(n, "LIGHT", P[part] + "  ·  THESIS & MANUSCRIPT NARRATIVE", title, sub);
  const q = mdCards(n);
  [[MX, "RESULTS PARAGRAPH  ·  OBJECTIVE SEQUENCE FINDINGS", K.blue, q[0]], [MX + 6.19, "DISCUSSION & ECOLOGICAL INTERPRETATION", K.green, q[1]]].forEach((c, i) => {
    card(s, { x: c[0], y: 1.88, w: 5.94, h: 4.87, fill: "F8FAFC", line: "E2E8F0", lw: 1, name: "Draft card " + (i + 1) });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: c[0] + 0.15, y: 2.0, w: 5.64, h: 0.4, rectRadius: 0.1, fill: { color: c[2] }, line: { type: "none" }, objectName: "Ribbon " + (i + 1) });
    tx(s, c[1], { x: c[0] + 0.35, y: 2.0, w: 5.3, h: 0.4, fontSize: 11.5, bold: true, color: K.white, charSpacing: 1, valign: "middle" });
    tx(s, rt(c[3], {}), { x: c[0] + 0.3, y: 2.58, w: 5.36, h: 4.1, fontSize: fs, color: "334155", lineSpacingMultiple: 1.08 });
  });
  tx(s, "Draft for adaptation: add literature and dataset citations before reuse. The right-hand card is interpretation, not measurement.", { x: MX, y: 6.84, w: CW, h: 0.22, fontSize: 10.5, color: H.mute });
  return s;
}

// ================================================================== BUILD
(async () => {
  NOTES = parseNotes();
  for (let i = 1; i <= 8; i++) {
    const f = fs.readdirSync(path.join(ROOT, "figures")).find((n) => n.startsWith("0" + i + "_") && n.endsWith(".png"));
    await loadImg("f" + i, SRC.fig(f));
  }
  const ic = {};
  for (const n of ["FaProjectDiagram", "FaBalanceScale", "FaLeaf", "FaRulerHorizontal", "FaFilter", "FaWater", "FaSeedling", "FaCogs",
    "FaCheck", "FaFlask", "FaMicroscope", "FaDna", "FaExclamationTriangle", "FaInfoCircle"]) ic[n] = await icon(n);

  // ---------------------------------------------------------------- 01 title
  part("1 · Introduction & Foundations");
  {
    const s = mk(1, "DARK", "LONG-READ NANOPORE ITS  ·  SAMPLE SC", "Long-Read Nanopore ITS Profiling of Sample SC", null);
    s.addShape(pres.shapes.OVAL, { x: 9.6, y: -1.4, w: 5.2, h: 5.2, fill: { color: K.green, transparency: 84 }, line: { type: "none" }, objectName: "Deco circle 1" });
    s.addShape(pres.shapes.OVAL, { x: 11.5, y: 0.9, w: 2.4, h: 2.4, fill: { color: K.amber, transparency: 88 }, line: { type: "none" }, objectName: "Deco circle 2" });
    s.addText("Community Structure, Ecological Guilds, and Metabolic Potential", { isTextBox: true, x: MX, y: 1.55, w: CW, h: 0.5, fontSize: 24, color: "A9DDD2", margin: 0, valign: "top" });
    s.addText(rt("An explainer walkthrough of FUNGuild, FungalTraits, and PICRUSt2 functional predictions in ~Sonneratia alba~ rhizosphere & sediment", { color: H.onDark }),
      { isTextBox: true, x: MX, y: 2.2, w: 10.4, h: 0.7, fontSize: 16, margin: 0, valign: "top" });
    // metadata card (left)
    card(s, { x: MX, y: 3.15, w: 5.9, h: 3.75, fill: H.cardDark, name: "Metadata card" });
    tx(s, "PROJECT METADATA", { x: MX + 0.3, y: 3.35, w: 5.3, h: 0.25, fontSize: 12, bold: true, color: H.mint, charSpacing: 1 });
    const meta = [
      ["SAMPLE ID", "**SC** (barcode13 / N701-1)  ·  single sample, n = 1"],
      ["HOST TREE", "~Sonneratia alba~ (labeled SC for suspected ~S. caseolaris~; updated after botanical consultation)"],
      ["SAMPLE TYPE", "Cut rhizosphere root tissue + surrounding intertidal sediment (with litter); habitat confirmed 1 Nov 2026"],
      ["PLATFORM", "Oxford Nanopore (ONT) full-length ITS1–5.8S–ITS2 amplicon"],
    ];
    const mrow = [0, 0.62, 1.48, 2.34];
    meta.forEach((m, i) => {
      const yy = 3.75 + mrow[i];
      tx(s, m[0], { x: MX + 0.3, y: yy, w: 5.3, h: 0.2, fontSize: 11, bold: true, color: H.mint, charSpacing: 1 });
      s.addText(rt(m[1], { color: K.white }), { isTextBox: true, margin: 0, valign: "top", x: MX + 0.3, y: yy + 0.24, w: 5.3, h: 0.5, fontSize: 14 });
    });
    // snapshot card (right)
    const rx = 6.8, rw = 5.93;
    card(s, { x: rx, y: 3.15, w: rw, h: 3.75, fill: H.cardDark, name: "Snapshot card" });
    tx(s, "AT-A-GLANCE DATA SNAPSHOT", { x: rx + 0.3, y: 3.35, w: 5.3, h: 0.25, fontSize: 12, bold: true, color: H.mint, charSpacing: 1 });
    const snap = [
      ["103,015", "raw reads delivered", 103015, K.gray],
      ["52,404", "preprocessed reads (primers verified, Q ≥ 12)", 52404, K.green],
      ["48,988", "reads in 41 core ITS OTUs", 48988, K.green],
      ["40,364", "reads in 34 fungal core OTUs", 40364, K.green],
      ["28,587", "reads in 27 PICRUSt2-predicted OTUs", 28587, K.green],
    ];
    snap.forEach((r, i) => {
      const yy = 3.78 + i * 0.6;
      tx(s, r[0], { x: rx + 0.3, y: yy, w: 1.55, h: 0.45, fontSize: 24, bold: true, color: K.white, fontFace: undefined, valign: "middle" });
      tx(s, r[1], { x: rx + 1.9, y: yy, w: 2.55, h: 0.45, fontSize: 13, color: H.onDark, valign: "middle" });
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rx + 4.55, y: yy + 0.12, w: Math.max(0.08, 1.2 * r[2] / 103015), h: 0.22, rectRadius: 0.05, fill: { color: r[3] }, line: { type: "none" }, objectName: "Read bar " + (i + 1) });
    });
  }

  // ---------------------------------------------------------------- 02 concepts
  {
    const s = mk(2, "LIGHT", P[1] + "  ·  BIOINFORMATICS 101", "Four Key Concepts for Reading the Figures", "A quick reference guide before we look at any data");
    const cards = [
      ["FaProjectDiagram", K.green, H.greenTint, "What is an OTU?", "Polished ITS sequences sharing **≥98% identity** are grouped into an operational cluster (OTU_1, OTU_2…). An OTU is a **sequence group**, not automatically a verified species."],
      ["FaBalanceScale", K.amber, H.amberTint, "Reads ≠ cells or biomass", "If one OTU has 9,715 reads and another 970, its DNA was sequenced ~10× more often, **not** 10× more fungus. Copy number and PCR efficiency vary, so we report read proportions."],
      ["FaLeaf", K.purple, H.purpleTint, "What are ecological guilds?", "FungalTraits (genus) and FUNGuild (genus or family) match a taxon to published lifestyles: saprotroph, pathotroph, symbiotroph. They list **capacities**, not measured disease or decay."],
      ["FaRulerHorizontal", K.blue, H.blueTint, "What is NSTI in PICRUSt2?", "**Nearest Sequenced Taxon Index**: the branch distance from your OTU to the closest sequenced fungal genome. Low (<0.20) = close relative; ~1.0+ = functions extrapolated from a distant one."],
    ];
    cards.forEach((c, i) => {
      const x = MX + (i % 2) * 6.2, y = 1.95 + Math.floor(i / 2) * 2.6;
      card(s, { x, y, w: 5.93, h: 2.35, fill: c[2], name: "Concept card " + (i + 1) });
      iconCircle(s, x + 0.3, y + 0.3, 0.8, c[1], ic[c[0]], c[3]);
      tx(s, c[3], { x: x + 1.35, y: y + 0.3, w: 4.35, h: 0.4, fontSize: 19, bold: true, fontFace: THEME.headFontFace });
      s.addText(rt(c[4]), { isTextBox: true, margin: 0, valign: "top", x: x + 1.35, y: y + 0.82, w: 4.35, h: 1.45, fontSize: 15, color: K.ink });
    });
  }

  // ---------------------------------------------------------------- 03 pipeline
  {
    const s = mk(3, "LIGHT", P[1] + "  ·  THE PIPELINE", "From Raw Reads to High-Confidence Fungal Clusters", "Primer verification, rescuing long amplicons (>900 bp), consensus polishing, and eukaryote filtering");
    const steps = [
      ["Delivered raw ONT reads", "103,015", "raw basecalled reads", "Reads of 300–2,000 bp. We bypassed the provider’s 400–900 bp cutoff so true sequences could be rebuilt.", K.gray],
      ["Strict primer & quality gate", "52,404", "reads retained", "ITS1 + ITS4 ends, ≥200 bp, mean Q ≥ 12. **13,021** kept reads are >900 bp, a size class like the ~1,100–1,150 bp gel band.", K.green],
      ["Consensus, polishing & ITSx", "41 OTUs", "48,988 reads (93.48% of all)", "amplicon_sorter + 2× Racon polishing; ITSx sets ITS boundaries. Validation reads map uniquely at 93.18%.", K.green],
      ["Conservative fungal core", "34 OTUs", "40,364 reads", "UNITE + ITSx screen separates **7** non-fungal/uncertain OTUs (8,624 reads, 16.46%), including two nematode-matching OTUs.", K.green],
    ];
    steps.forEach((st, i) => {
      const x = MX + i * 3.1, y = 1.95, w = 2.8;
      card(s, { x, y, w, h: 3.55, fill: K.white, line: H.line, lw: 1, shadow: true, name: "Step card " + (i + 1) });
      badge(s, x + 0.2, y + 0.2, String(i + 1), K.deep, 0.4, "Step number");
      tx(s, st[0], { x: x + 0.72, y: y + 0.17, w: w - 0.9, h: 0.5, fontSize: 14, bold: true, valign: "middle" });
      tx(s, st[1], { x: x + 0.2, y: y + 0.85, w: w - 0.4, h: 0.55, fontSize: 30, bold: true, color: i === 0 ? H.mute : K.green, fontFace: THEME.headFontFace, valign: "middle" });
      tx(s, st[2], { x: x + 0.2, y: y + 1.42, w: w - 0.4, h: 0.28, fontSize: 12, color: H.mute });
      s.addText(rt(st[3]), { isTextBox: true, margin: 0, valign: "top", x: x + 0.2, y: y + 1.85, w: w - 0.4, h: 1.6, fontSize: 14, color: K.ink });
      if (i < 3) s.addShape(pres.shapes.RIGHT_ARROW, { x: x + w + 0.03, y: y + 1.62, w: 0.24, h: 0.3, fill: { color: K.gray }, line: { type: "none" }, objectName: "Flow arrow" });
    });
    card(s, { x: MX, y: 5.85, w: CW, h: 1.05, fill: H.greenTint, name: "Why it matters strip" });
    iconCircle(s, MX + 0.3, 6.1, 0.55, K.green, ic.FaFilter, "Filter");
    s.addText(rt("**Why filter?** Universal ITS1–ITS4 primers also amplify non-fungal soil eukaryotes. Guild and PICRUSt2 analyses therefore run only on the **34-OTU conservative fungal core**."),
      { isTextBox: true, margin: 0, valign: "middle", x: MX + 1.1, y: 5.95, w: CW - 1.5, h: 0.85, fontSize: 15, color: K.ink });
  }

  // ---------------------------------------------------------------- 04 fig 01
  part("2 · Who Is in Your Sample?");
  {
    const s = mk(4, "LIGHT", P[2] + "  ·  FIGURE 01", "Community Context & Taxonomic Resolution", "Accounting for all 52,404 preprocessed reads across core OTUs and fungal phyla");
    figure(s, "f1", MX + 0.06, 2.0, 7.8, 3.5, "Figure 01: community context and taxonomic resolution");
    card(s, { x: MX, y: 5.78, w: 7.92, h: 1.15, fill: H.grayTint, name: "Denominator strip" });
    tx(s, "52,404", { x: MX + 0.25, y: 5.9, w: 1.9, h: 0.9, fontSize: 30, bold: true, color: K.deep, fontFace: THEME.headFontFace, valign: "middle" });
    s.addText(rt("**Shared denominator** in both panels: all preprocessed reads = 100% (93.48% core OTUs + 0.01% ambiguous + 6.51% unassigned)."),
      { isTextBox: true, margin: 0, valign: "middle", x: MX + 2.2, y: 5.88, w: 5.5, h: 0.95, fontSize: 14 });
    const rx = 8.85, rw = 3.88;
    card(s, { x: rx, y: 1.95, w: rw, h: 2.45, fill: K.white, line: H.line, shadow: true, name: "Panel A card" });
    badge(s, rx + 0.2, 2.1, "A", K.deep); tx(s, "Read assignment", { x: rx + 0.65, y: 2.1, w: 3, h: 0.36, fontSize: 16, bold: true, valign: "middle" });
    tx(s, "read → OTU gate: ≥85% identity, ≥90% span", { x: rx + 0.2, y: 2.52, w: 3.5, h: 0.25, fontSize: 12, color: H.mute });
    statRows(s, rx + 0.2, 2.88, rw - 0.35, [
      { color: K.green, pct: "77.02%", label: "Fungal input OTUs" }, { color: K.gray, pct: "16.46%", label: "Other / uncertain core" },
      { color: "D2D6D8", pct: "0.01%", label: "Ambiguous (4 reads)" }, { color: "D2D6D8", pct: "6.51%", label: "No qualifying match" }], 0.37);
    card(s, { x: rx, y: 4.58, w: rw, h: 2.37, fill: K.white, line: H.line, shadow: true, name: "Panel B card" });
    badge(s, rx + 0.2, 4.7, "B", K.deep); tx(s, "Fungal phylum", { x: rx + 0.65, y: 4.7, w: 3, h: 0.36, fontSize: 16, bold: true, valign: "middle" });
    tx(s, "OTU → UNITE: ≥90% id, ≥90% query, ≥80% ref", { x: rx + 0.2, y: 5.12, w: 3.6, h: 0.25, fontSize: 12, color: H.mute });
    statRows(s, rx + 0.2, 5.5, rw - 0.35, [
      { color: "D2D6D8", pct: "45.24%", label: "Unresolved phylum" }, { color: K.green, pct: "26.52%", label: "Chytridiomycota" },
      { color: K.gray, pct: "22.98%", label: "Outside fungal input" }, { color: K.green, pct: "5.27%", label: "Ascomycota" }], 0.35);
  }

  // ---------------------------------------------------------------- 05 fig 02
  // ---------------------------------------------------------------- 05 narrative 1
  narrative(5, 2, "Thesis Draft: Community Composition", "Community context and taxonomic resolution: Results and Discussion drafts to adapt for a thesis or manuscript", 12.5);

  part("3 · What Are They Doing?");
  {
    const s = mk(6, "LIGHT", P[3] + "  ·  FIGURE 02", "Ecological Annotation Coverage", "How much of your mangrove fungal community can literature databases explain today?");
    figure(s, "f2", MX + 0.06, 2.0, 7.8, 3.5, "Figure 02: guild annotation coverage");
    card(s, { x: MX, y: 5.75, w: 7.92, h: 1.2, fill: H.greenTint, name: "Reading tips" });
    s.addText(paras([
      "**Why so low?** FungalTraits matches by genus, FUNGuild by genus or family; the abundant OTUs (e.g. OTU_1, 9,715 reads) lack a genus-level match.",
      "**Read the bars:** unassigned segments stay visible, so a 4% guild is not mistaken for 40–85% of the community."], { fontSize: 14, color: K.ink }, 4),
      { isTextBox: true, margin: 0, valign: "middle", x: MX + 0.25, y: 5.85, w: 7.45, h: 1.0 });
    const rx = 8.85, rw = 3.88;
    card(s, { x: rx, y: 1.95, w: rw, h: 2.4, fill: K.white, line: H.line, shadow: true, name: "Panel A card" });
    badge(s, rx + 0.2, 2.1, "A", K.deep); tx(s, "Annotated reads", { x: rx + 0.65, y: 2.1, w: 3, h: 0.36, fontSize: 16, bold: true, valign: "middle" });
    tx(s, "% of all 52,404 preprocessed reads", { x: rx + 0.2, y: 2.52, w: 3.5, h: 0.25, fontSize: 12, color: H.mute });
    statRows(s, rx + 0.2, 2.9, rw - 0.35, [{ color: K.blue, pct: "4.71%", label: "FungalTraits" }, { color: K.purple, pct: "10.67%", label: "FUNGuild" }], 0.4);
    tx(s, "Unassigned fungal-core reads: 72.3% (FT), 66.3% (FG); outside fungal input: 23.0%", { x: rx + 0.2, y: 3.75, w: rw - 0.4, h: 0.5, fontSize: 12, color: H.mute });
    card(s, { x: rx, y: 4.55, w: rw, h: 2.4, fill: K.white, line: H.line, shadow: true, name: "Panel B card" });
    badge(s, rx + 0.2, 4.7, "B", K.deep); tx(s, "Within fungal input", { x: rx + 0.65, y: 4.7, w: 3, h: 0.36, fontSize: 16, bold: true, valign: "middle" });
    tx(s, "40,364 fungal reads  ·  34 fungal OTUs", { x: rx + 0.2, y: 5.12, w: 3.5, h: 0.25, fontSize: 12, color: H.mute });
    [["6.1%", "FungalTraits", "of reads · 4 of 34 OTUs (11.8%)", K.blue], ["13.9%", "FUNGuild", "of reads · 6 of 34 OTUs (17.6%)", K.purple]].forEach((r, i) => {
      const y = 5.5 + i * 0.7;
      tx(s, r[0], { x: rx + 0.2, y, w: 1.3, h: 0.6, fontSize: 28, bold: true, color: r[3], fontFace: THEME.headFontFace, valign: "middle" });
      s.addText([{ text: r[1], options: { bold: true, breakLine: true, fontSize: 14 } }, { text: r[2], options: { color: H.mute, fontSize: 12 } }],
        { isTextBox: true, margin: 0, valign: "middle", x: rx + 1.5, y, w: rw - 1.65, h: 0.6, color: K.ink });
    });
  }

  // ---------------------------------------------------------------- 06 fig 03
  {
    const s = mk(7, "LIGHT", P[3] + "  ·  FIGURE 03", "Putative Lifestyles & Guild Composition", "FungalTraits lifestyles, FUNGuild trophic modes, and the role of OTU_9");
    figure(s, "f3", MX + 0.06, 2.0, 7.4, 4.05, "Figure 03: putative lifestyles and guild composition");
    card(s, { x: MX, y: 6.3, w: 7.52, h: 0.65, fill: H.amberTint, line: H.amberLine, dash: "dash", name: "Hatching key" });
    s.addImage({ path: path.join(ASSETS, "hatch_blue.png"), x: MX + 0.2, y: 6.5, w: 0.5, h: 0.25, altText: "Hatched swatch" });
    s.addText(rt("**Hatched = OTU_9** (~Gibellulopsis~, 2,101 reads = 4.01%), flagged “?” in the chimera audit (Slide 09). All axes keep the 52,404-read denominator."),
      { isTextBox: true, margin: 0, valign: "middle", x: MX + 0.85, y: 6.33, w: 6.55, h: 0.6, fontSize: 13, color: K.ink });
    const rx = 8.5, rw = 4.23;
    const panels = [
      ["A", K.blue, "FungalTraits: primary", [["plant pathogen", "4.01%", "100% OTU_9"], ["soil saprotroph", "0.70%", "3 solid OTUs"]]],
      ["B", K.blue, "FungalTraits: secondary", [["litter saprotroph", "4.20%", "0.19% solid + 4.01% hatched"], ["foliar endophyte", "0.45%", "OTU_19, solid"]]],
      ["C", K.purple, "FUNGuild: combined labels", [["Plant Pathogen–Parasite–Saprotroph", "5.69%", "chytrid family, OTU_7"], ["Plant Pathogen", "4.01%", "100% OTU_9"]]],
    ];
    panels.forEach((p, i) => {
      const y = 1.95 + i * 1.7;
      card(s, { x: rx, y, w: rw, h: 1.55, fill: K.white, line: H.line, shadow: true, name: "Panel " + p[0] });
      badge(s, rx + 0.2, y + 0.14, p[0], p[1]); tx(s, p[2], { x: rx + 0.65, y: y + 0.14, w: 3.4, h: 0.36, fontSize: 15, bold: true, valign: "middle" });
      p[3].forEach((r, j) => {
        const yy = y + 0.62 + j * 0.45;
        tx(s, r[1], { x: rx + 0.2, y: yy, w: 0.85, h: 0.4, fontSize: 18, bold: true, color: p[1], valign: "middle" });
        s.addText([{ text: r[0], options: { bold: true, breakLine: true, fontSize: 13 } }, { text: r[2], options: { color: H.mute, fontSize: 12 } }],
          { isTextBox: true, margin: 0, valign: "middle", x: rx + 1.1, y: yy - 0.03, w: rw - 1.25, h: 0.46, color: K.ink });
      });
    });
  }

  // ---------------------------------------------------------------- 07 fig 04
  {
    const s = mk(8, "LIGHT", P[3] + "  ·  FIGURE 04", "Sensitivity Analysis & Pipeline Stability", "Testing the impact of omitting OTU_9 and comparing three independent clustering workflows");
    figure(s, "f4", MX + 0.06, 2.0, 8.0, 3.57, "Figure 04: guild sensitivity analysis");
    card(s, { x: MX, y: 5.9, w: 8.12, h: 1.05, fill: H.amberTint, line: H.amberLine, dash: "dash", name: "OTU_9 takeaway" });
    tx(s, "85%", { x: MX + 0.25, y: 5.98, w: 1.5, h: 0.9, fontSize: 36, bold: true, color: K.amber, fontFace: THEME.headFontFace, valign: "middle" });
    s.addText(rt("of FungalTraits-annotated reads come from **OTU_9 alone** (2,101 / 2,466), which is why the next slide examines it closely."),
      { isTextBox: true, margin: 0, valign: "middle", x: MX + 1.85, y: 5.98, w: 6.0, h: 0.9, fontSize: 14 });
    const rx = 9.0, rw = 3.73;
    card(s, { x: rx, y: 1.95, w: rw, h: 2.4, fill: K.white, line: H.line, shadow: true, name: "Panel A card" });
    badge(s, rx + 0.2, 2.1, "A", K.deep); tx(s, "Drop OTU_9", { x: rx + 0.65, y: 2.1, w: 2.8, h: 0.36, fontSize: 16, bold: true, valign: "middle" });
    tx(s, "annotated reads, with vs. without OTU_9", { x: rx + 0.2, y: 2.52, w: 3.4, h: 0.25, fontSize: 12, color: H.mute });
    [["FungalTraits", "4.71%", "0.70%", K.blue], ["FUNGuild", "10.67%", "6.67%", K.purple]].forEach((r, i) => {
      const y = 2.9 + i * 0.72;
      tx(s, r[0], { x: rx + 0.2, y, w: 3.3, h: 0.25, fontSize: 13, color: H.mute });
      s.addText([{ text: r[1], options: { color: H.mute } }, { text: "  →  ", options: { color: H.mute } }, { text: r[2], options: { color: r[3], bold: true } }],
        { isTextBox: true, margin: 0, valign: "top", x: rx + 0.2, y: y + 0.25, w: 3.3, h: 0.4, fontSize: 22, bold: true });
    });
    card(s, { x: rx, y: 4.55, w: rw, h: 2.4, fill: K.white, line: H.line, shadow: true, name: "Panel B card" });
    badge(s, rx + 0.2, 4.7, "B", K.deep); tx(s, "Three workflows", { x: rx + 0.65, y: 4.7, w: 2.8, h: 0.36, fontSize: 16, bold: true, valign: "middle" });
    tx(s, "% annotated reads, same input reads", { x: rx + 0.2, y: 5.12, w: 3.4, h: 0.25, fontSize: 12, color: H.mute });
    const hd = (t, c) => ({ text: t, options: { bold: true, color: c, fontSize: 12, align: t === "" ? "left" : "center" } });
    const cl = (t, o = {}) => ({ text: t, options: { fontSize: 13, align: "center", color: "1B2A33", ...o } });
    s.addTable([
      [hd("", "5B6B73"), hd("FT", "216B91"), hd("FG", "8155A3")],
      [cl("VSEARCH 90%", { align: "left" }), cl("4.89"), cl("10.76")],
      [cl("VSEARCH 95%", { align: "left" }), cl("4.87"), cl("10.71")],
      [cl("amplicon_sorter", { align: "left", bold: true }), cl("4.71", { bold: true }), cl("10.67", { bold: true })],
    ], { x: rx + 0.2, y: 5.5, w: 3.33, colW: [1.63, 0.85, 0.85], rowH: 0.34, border: { type: "solid", pt: 0.5, color: "E1E8E7" }, margin: [0, 0.06, 0, 0.06], valign: "middle" });
  }

  // ---------------------------------------------------------------- 08 OTU_9 spotlight
  {
    const s = mk(9, "LIGHT", P[3] + "  ·  SPECIAL SPOTLIGHT", "Demystifying OTU_9 (Gibellulopsis)", "Amplicon structure, gel-band size match, chimera audit, and plausible rhizosphere ecology");
    // gel card
    card(s, { x: MX, y: 1.95, w: 5.0, h: 2.15, fill: K.white, line: H.line, shadow: true, name: "Gel card" });
    const gh = 1.85, gw = gh * 1280 / 1056;
    s.addImage({ path: path.join(ASSETS, "gel_crop.png"), x: MX + 0.15, y: 2.1, w: gw, h: gh, altText: "Agarose gel: NTC, sample lane 1 with multiple bands, and 100 bp ladder" });
    s.addText(rt("**PCR gel, lane 1:** multi-band profile with an upper band at **~1,100–1,150 bp**, between the 1,000 and 1,500 bp ladder marks. Band size alone does not establish OTU identity."),
      { isTextBox: true, margin: 0, valign: "top", x: MX + 0.3 + gw, y: 2.15, w: 5.0 - gw - 0.45, h: 1.8, fontSize: 12.5, color: K.ink });
    // schematic card
    const sy = 4.28;
    card(s, { x: MX, y: sy, w: 5.0, h: 2.67, fill: K.white, line: H.line, shadow: true, name: "Schematic card" });
    tx(s, "SCHEMATIC  ·  not to scale", { x: MX + 0.2, y: sy + 0.1, w: 3, h: 0.22, fontSize: 10, bold: true, color: H.mute, charSpacing: 1 });
    // consensus lengths (proportional)
    const bx = MX + 1.5, full = 3.3;
    tx(s, "00012 · 520 bp", { x: MX + 0.2, y: sy + 0.4, w: 1.25, h: 0.28, fontSize: 12, valign: "middle" });
    s.addShape(pres.shapes.RECTANGLE, { x: bx, y: sy + 0.42, w: full * 520 / 1131, h: 0.24, fill: { color: K.green }, line: { type: "none" }, objectName: "Consensus 520 bp" });
    tx(s, "00039 · 1,129 bp", { x: MX + 0.2, y: sy + 0.76, w: 1.25, h: 0.28, fontSize: 12, valign: "middle" });
    const ins = full * 520 / 1129;
    s.addShape(pres.shapes.RECTANGLE, { x: bx, y: sy + 0.78, w: ins, h: 0.24, fill: { color: K.green }, line: { type: "none" }, objectName: "Shared 520 bp part" });
    s.addShape(pres.shapes.RECTANGLE, { x: bx + ins, y: sy + 0.78, w: full - ins, h: 0.24, fill: { color: K.amber, transparency: 25 }, line: { type: "none" }, objectName: "Extra ~610 bp" });
    tx(s, "extra ~610 bp vs 00012: insertion proposed, identity and position untested (ITS regions 98.9% identical)", { x: bx, y: sy + 1.05, w: 3.35, h: 0.4, fontSize: 10.5, color: H.mute });
    // UCHIME reference alignment
    tx(s, "UCHIME-ref alignment, 5′ end of ITS1", { x: MX + 0.2, y: sy + 1.5, w: 4.5, h: 0.22, fontSize: 11, bold: true });
    const ux = MX + 1.5, uw = 3.3, gap = 0.45;
    [["OTU_9", 0, K.green, false], ["DQ825985", gap, K.blue, true], ["EF377335", 0, K.gray, false]].forEach((r, i) => {
      const yy = sy + 1.78 + i * 0.22;
      tx(s, r[0], { x: MX + 0.2, y: yy - 0.02, w: 1.25, h: 0.22, fontSize: 11, valign: "middle" });
      s.addShape(pres.shapes.RECTANGLE, { x: ux + r[1], y: yy, w: uw - r[1], h: 0.15, fill: { color: r[2] }, line: { type: "none" }, objectName: "Alignment bar " + r[0] });
      if (r[3]) s.addShape(pres.shapes.RECTANGLE, { x: ux, y: yy, w: gap, h: 0.15, fill: { color: K.white }, line: { color: K.amber, width: 1, dashType: "dash" }, objectName: "Missing 22 bp" });
    });
    tx(s, "dashed box = 22 bp missing from DQ825985", { x: ux, y: sy + 2.4, w: 3.3, h: 0.22, fontSize: 10.5, color: "8A5A12", bold: true });
    // dossier cards
    const dx = 5.9, dw = 3.3;
    card(s, { x: dx, y: 1.95, w: dw, h: 5.0, fill: H.greenTint, name: "Identity and ecology card" });
    iconCircle(s, dx + 0.2, 2.12, 0.5, K.green, ic.FaDna, "DNA");
    tx(s, "Identity, structure & ecology", { x: dx + 0.8, y: 2.12, w: dw - 0.95, h: 0.5, fontSize: 14, bold: true, valign: "middle" });
    s.addText(paras([
      "UNITE: **Gibellulopsis** (Plectosphaerellaceae), 2,101 reads = 4.01%; genus-level assignment",
      "**99.55%** identity (446/448 bp) to ~G. piscis~ DQ825985; species not confirmed",
      "Two amplicons, **520 bp** and **1,129 bp**; the longer length is similar to the **~1,100–1,150 bp gel band**, which is not proof of identity",
      "FungalTraits: primary plant pathogen, secondary litter saprotroph",
    ], { fontSize: 14, color: K.ink }, 7, true), { isTextBox: true, margin: 0, valign: "top", x: dx + 0.2, y: 2.85, w: dw - 0.4, h: 4.0 });
    const ex = dx + dw + 0.25, ew = CW + MX - ex;
    card(s, { x: ex, y: 1.95, w: ew, h: 5.0, fill: H.amberTint, line: H.amberLine, dash: "dash", name: "UCHIME card" });
    iconCircle(s, ex + 0.2, 2.12, 0.5, K.amber, ic.FaExclamationTriangle, "Caution");
    tx(s, "Why UCHIME-ref said “?”", { x: ex + 0.8, y: 2.12, w: ew - 0.95, h: 0.5, fontSize: 14, bold: true, valign: "middle" });
    s.addText(paras([
      "De novo screen: **passed** (N, score 0.0317)",
      "Reference DQ825985 lacks **22 bp** at the 5′ end of ITS1; related ~V. dahliae~ EF377335 has it and shares 2 SNPs",
      "Misses VSEARCH’s positive thresholds (mindiffs ≥ 3, mindiv ≥ 0.8%)",
      "**Plausible explanation:** a truncated 5′ reference. A mosaic is not ruled out; OTU_9 is kept and hatched",
    ], { fontSize: 14, color: K.ink }, 7, true), { isTextBox: true, margin: 0, valign: "top", x: ex + 0.2, y: 2.85, w: ew - 0.4, h: 4.0 });
  }

  // ---------------------------------------------------------------- 09 fig 05
  // ---------------------------------------------------------------- 10 narrative 2
  narrative(10, 3, "Thesis Draft: Guilds & OTU_9", "Ecological annotation and ~Gibellulopsis~: Results and Discussion drafts to adapt for a thesis or manuscript", 12.5);

  part("4 · Metabolic Potential (PICRUSt2)");
  {
    const s = mk(11, "LIGHT", P[4] + "  ·  FIGURE 05", "Fungal PICRUSt2 Diagnostics & Reference Distance", "Read retention (54.55%) and evolutionary distance (weighted NSTI = 1.047) come before any pathway");
    figure(s, "f5", MX + 0.06, 2.0, 7.8, 3.12, "Figure 05: PICRUSt2 diagnostics");
    const bw = 3.82;
    card(s, { x: MX, y: 5.45, w: bw, h: 1.5, fill: K.white, line: H.line, shadow: true, name: "Panel B card" });
    badge(s, MX + 0.18, 5.57, "B", K.deep, 0.32); tx(s, "Distance vs. abundance", { x: MX + 0.6, y: 5.57, w: 3.1, h: 0.32, fontSize: 14, bold: true, valign: "middle" });
    s.addText(rt("Weighted NSTI **1.047** (median 0.913). OTU_9 sits at 0.271, chytrid OTU_1 at 1.383; red × = excluded beyond 2.0."),
      { isTextBox: true, margin: 0, valign: "top", x: MX + 0.18, y: 5.97, w: bw - 0.36, h: 0.95, fontSize: 13.5, color: K.ink });
    const cx = MX + bw + 0.28;
    card(s, { x: cx, y: 5.45, w: bw, h: 1.5, fill: K.white, line: H.line, shadow: true, name: "Panel C card" });
    badge(s, cx + 0.18, 5.57, "C", K.deep, 0.32); tx(s, "Eligibility curve", { x: cx + 0.6, y: 5.57, w: 3.1, h: 0.32, fontSize: 14, bold: true, valign: "middle" });
    s.addText(rt("**0%** retained at NSTI ≤ 0.20, **4.72%** at ≤ 0.50, then a jump from **34.9% to 53.5%** at ≈1.38 where OTU_1 enters."),
      { isTextBox: true, margin: 0, valign: "top", x: cx + 0.18, y: 5.97, w: bw - 0.36, h: 0.95, fontSize: 13.5, color: K.ink });
    // funnel
    const rx = 8.8, rw = 3.93;
    card(s, { x: rx, y: 1.95, w: rw, h: 5.0, fill: K.white, line: H.line, shadow: true, name: "Panel A card" });
    badge(s, rx + 0.2, 2.1, "A", K.deep); tx(s, "Representation funnel", { x: rx + 0.65, y: 2.1, w: 3.1, h: 0.36, fontSize: 16, bold: true, valign: "middle" });
    tx(s, "% of 52,404 preprocessed reads", { x: rx + 0.2, y: 2.52, w: 3.5, h: 0.25, fontSize: 12, color: H.mute });
    [["Fungal input", "34 OTUs", 77.02, "D2D6D8"], ["Placed on tree", "29 OTUs", 56.16, K.gray], ["Used for predictions", "27 OTUs", 54.55, K.green]].forEach((r, i) => {
      const y = 2.95 + i * 0.82, mw = 3.0;
      tx(s, r[0], { x: rx + 0.2, y, w: 1.9, h: 0.25, fontSize: 13, bold: true });
      tx(s, r[1], { x: rx + 2.0, y, w: 1.7, h: 0.25, fontSize: 12, color: H.mute, align: "right" });
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rx + 0.2, y: y + 0.3, w: mw * r[2] / 77.02, h: 0.3, rectRadius: 0.05, fill: { color: r[3] }, line: { type: "none" }, objectName: "Funnel bar " + (i + 1) });
      tx(s, r[2].toFixed(2) + "%", { x: rx + 0.2 + mw * r[2] / 77.02 + 0.08, y: y + 0.3, w: 0.8, h: 0.3, fontSize: 13, bold: true, valign: "middle" });
    });
    s.addText(paras([
      "**5 OTUs** (10,935 reads) failed alignment, including the OTU_2 / OTU_5 pair (9,600 reads)",
      "**2 OTUs** above NSTI 2.0 removed (OTU_13, OTU_33; 842 reads)",
    ], { fontSize: 13, color: K.ink }, 6, true), { isTextBox: true, margin: 0, valign: "top", x: rx + 0.2, y: 5.5, w: rw - 0.4, h: 1.35 });
  }

  // ---------------------------------------------------------------- 10 fig 06
  {
    const s = mk(12, "LIGHT", P[4] + "  ·  FIGURE 06", "Predicted Enzyme Profiles (840 EC Categories)", "Core housekeeping machinery, database nomenclature status, and detrital polysaccharide hydrolases");
    figure(s, "f6", MX + 0.06, 2.0, 6.4, 4.9, "Figure 06: predicted EC profile");
    const rx = 7.5, rw = 5.23;
    card(s, { x: rx, y: 1.95, w: rw, h: 1.55, fill: K.white, line: H.line, shadow: true, name: "Panel A card" });
    badge(s, rx + 0.2, 2.07, "A", K.deep, 0.32); tx(s, "Top 15 ECs: housekeeping leads", { x: rx + 0.65, y: 2.07, w: 4.4, h: 0.32, fontSize: 14, bold: true, valign: "middle" });
    s.addText(rt("**11 blue** = named ECs (ATPase #1, RNA pol #3, DNA pol #5, glucan 1,4-α-glucosidase **#6**); **4 gray** = transferred/deleted IDs (ranks 2, 9, 14, 15), so the number was retired, not the gene."),
      { isTextBox: true, margin: 0, valign: "top", x: rx + 0.2, y: 2.5, w: rw - 0.4, h: 0.95, fontSize: 13, color: K.ink });
    card(s, { x: rx, y: 3.68, w: rw, h: 1.45, fill: K.white, line: H.line, shadow: true, name: "Panel B card" });
    badge(s, rx + 0.2, 3.8, "B", K.deep, 0.32); tx(s, "Six broad EC classes", { x: rx + 0.65, y: 3.8, w: 4.4, h: 0.32, fontSize: 14, bold: true, valign: "middle" });
    s.addText(rt("**EC 3 hydrolases lead** (14.48M units, 238 ECs), then EC 2 transferases 10.32M, EC 1 oxidoreductases 5.42M, EC 6 ligases 3.80M, EC 5 isomerases 2.62M, EC 4 lyases 2.14M."),
      { isTextBox: true, margin: 0, valign: "top", x: rx + 0.2, y: 4.23, w: rw - 0.4, h: 0.85, fontSize: 13, color: K.ink });
    tableCallout(s, { x: rx, y: 5.31, w: rw, h: 1.64, src: "ec_predicted_profiles.tsv · ranks 17–23" });
    const hd = (t) => ({ text: t, options: { bold: true, fontSize: 11, color: "8A5A12" } });
    const c = (t, o = {}) => ({ text: t, options: { fontSize: 12.5, color: "1B2A33", ...o } });
    s.addTable([
      [hd("RANK"), hd("EC"), hd("DESCRIPTION")],
      [c("17"), c("EC:2.4.1.16"), c("Chitin synthase")], [c("18"), c("EC:2.5.1.18"), c("Glutathione transferase")],
      [c("19"), c("EC:5.3.1.4"), c("L-arabinose isomerase")], [c("23"), c("EC:3.2.1.14"), c("Chitinase")],
    ], { x: rx + 0.2, y: 5.7, w: rw - 0.4, colW: [0.6, 1.4, rw - 0.4 - 2.0], rowH: 0.235, border: { type: "none" }, margin: [0, 0.04, 0, 0.04], valign: "middle" });
  }

  // ---------------------------------------------------------------- 11 fig 07
  {
    const s = mk(13, "LIGHT", P[4] + "  ·  FIGURE 07", "Predicted MetaCyc Metabolic Pathway Profile", "Top 20 of 67 reconstructed fungal pathways: core eukaryotic bioenergetics and conserved metabolism");
    figure(s, "f7", MX + 0.06, 2.0, 4.85, 4.9, "Figure 07: predicted MetaCyc pathway profile");
    const rx = 6.1, rw = 6.63;
    card(s, { x: rx, y: 1.95, w: rw, h: 0.55, fill: H.grayTint, name: "Legend" });
    swatch(s, rx + 0.2, 2.13, K.green, 0.2); tx(s, "solid = 26 other OTUs", { x: rx + 0.5, y: 2.0, w: 2.2, h: 0.45, fontSize: 13, valign: "middle" });
    swatch(s, rx + 2.9, 2.13, null, 0.2, path.join(ASSETS, "hatch_green.png")); tx(s, "hatched = OTU_9 (2.4–11.1%; 23.6% at rank 18)", { x: rx + 3.4, y: 2.0, w: 3.15, h: 0.45, fontSize: 13, valign: "middle" });
    const groups = [
      ["1–12", K.green, "Core energy, nucleotide & fatty-acid metabolism", "Aerobic respiration I & II, peroxisomal β-oxidation, de novo pyrimidine/purine biosynthesis, fungal TCA cycle II, tRNA charging."],
      ["13–15", K.blue, "Cell wall, signaling & the C2 carbon shunt", "GDP-mannose biosynthesis (cell-wall mannoproteins), inositol trisphosphate signaling, and the glyoxylate cycle for acetate/fatty-acid carbon."],
      ["16–20", K.purple, "Nucleoside salvage & branched-chain fermentation", "Pyrimidine/guanosine salvage; rank 18 is named “(engineered)” only because MetaCyc curated it that way: the enzymes are ordinary fungal ones."],
    ];
    groups.forEach((g, i) => {
      const y = 2.65 + i * 1.12;
      card(s, { x: rx, y, w: rw, h: 1.0, fill: K.white, line: H.line, shadow: true, name: "Rank group " + g[0] });
      s.addText(g[0], { shape: pres.shapes.ROUNDED_RECTANGLE, rectRadius: 0.1, x: rx + 0.2, y: y + 0.12, w: 0.85, h: 0.3, fill: { color: g[1] }, color: K.white, bold: true, fontSize: 12, align: "center", valign: "middle", margin: 0, objectName: "Rank tag" });
      tx(s, g[2], { x: rx + 1.2, y: y + 0.08, w: rw - 1.4, h: 0.3, fontSize: 14, bold: true, valign: "middle" });
      tx(s, g[3], { x: rx + 0.2, y: y + 0.46, w: rw - 0.4, h: 0.5, fontSize: 12.5, color: H.mute });
    });
    card(s, { x: rx, y: 6.0, w: rw, h: 0.95, fill: H.amberTint, line: H.amberLine, dash: "dash", name: "Caveat" });
    iconCircle(s, rx + 0.2, 6.2, 0.55, K.amber, ic.FaExclamationTriangle, "Caution");
    s.addText(rt("**Core metabolism, not marine adaptation:** OTUs whose nearest reference is the soil chytrid Spipu1 supply ~84–93% of each top-12 pathway. That is reference proximity, not transfer from one genome."),
      { isTextBox: true, margin: 0, valign: "middle", x: rx + 0.95, y: 6.03, w: rw - 1.15, h: 0.9, fontSize: 13, color: K.ink });
  }

  // ---------------------------------------------------------------- 12 fig 08
  {
    const s = mk(14, "LIGHT", P[4] + "  ·  FIGURE 08", "Which OTUs Drive the Predictions?", "Stratified heatmap of the top 12 MetaCyc pathways across all 27 retained fungal OTUs");
    figure(s, "f8", MX + 0.06, 2.0, 7.6, 4.4, "Figure 08: pathway contributions by OTU");
    tx(s, "Each row sums to 100%; cells ≥10% are printed; * marks OTU_9 (borderline chimera call). Similar columns reflect shared reference predictions, not metabolic interaction.",
      { x: MX, y: 6.55, w: 7.75, h: 0.42, fontSize: 11.5, color: H.mute });
    const rx = 8.75, rw = 3.98;
    card(s, { x: rx, y: 1.95, w: rw, h: 2.55, fill: K.white, line: H.line, shadow: true, name: "Top columns card" });
    tx(s, "Columns 1–4 carry ≈72% of predicted reads", { x: rx + 0.2, y: 2.07, w: rw - 0.4, h: 0.4, fontSize: 14, bold: true });
    [["OTU_1", "33–37%", "Chytridiomycota", K.green], ["OTU_4", "16–18%", "unresolved phylum", K.gray], ["OTU_6", "11–12%", "unresolved phylum", K.gray], ["OTU_7", "10–11%", "Chytridiomycota", K.green]].forEach((r, i) => {
      const y = 2.55 + i * 0.38;
      s.addText(r[0], { shape: pres.shapes.ROUNDED_RECTANGLE, rectRadius: 0.08, x: rx + 0.2, y: y + 0.03, w: 0.75, h: 0.28, fill: { color: r[3] }, color: K.white, bold: true, fontSize: 11.5, align: "center", valign: "middle", margin: 0, objectName: "OTU tag" });
      tx(s, r[1], { x: rx + 1.05, y, w: 0.9, h: 0.34, fontSize: 15, bold: true, valign: "middle" });
      tx(s, r[2], { x: rx + 2.0, y, w: rw - 2.15, h: 0.34, fontSize: 13, color: H.mute, valign: "middle" });
    });
    s.addText(rt("then OTU_9* (~Gibellulopsis~) at 2.4–8.1%"), { isTextBox: true, margin: 0, valign: "top", x: rx + 0.2, y: 4.1, w: rw - 0.4, h: 0.3, fontSize: 12, color: H.mute });
    tableCallout(s, { x: rx, y: 4.7, w: rw, h: 2.25, src: "marker_predicted_and_nsti.tsv" });
    s.addText(paras([
      "Predicted **ITS copy number = 1** for all 29 placed OTUs",
      "**14 of 27** OTUs (86.4% of predicted reads) have one nearest genome, ~Spizellomyces punctatus~ (Spipu1): a reference concentration, not pathway transfer",
    ], { fontSize: 13.5, color: K.ink }, 6, true), { isTextBox: true, margin: 0, valign: "top", x: rx + 0.2, y: 5.2, w: rw - 0.4, h: 1.7 });
  }

  // ---------------------------------------------------------------- 13 synthesis
  // ---------------------------------------------------------------- 15 narrative 3
  narrative(15, 4, "Thesis Draft: Predicted Functions", "PICRUSt2 diagnostics and predicted functions: Results and Discussion drafts to adapt for a thesis or manuscript", 12);

  part("5 · Synthesis & Next Steps");
  {
    const s = mk(16, "LIGHT", P[5] + "  ·  SYNTHESIS", "Ecological Synthesis for Sample SC", "Connecting sequence observations to plausible roles in cut rhizosphere roots and intertidal sediment");
    const pillars = [
      [K.green, "FaWater", "Abundant chytrids & unresolved lineages", H.greenTint,
        "**Chytridiomycota 26.52%** (13,895 reads) outnumber Ascomycota (5.27%) about 5 : 1; **45.24%** are unresolved-phylum fungi; **16.46%** are non-fungal (incl. two nematode matches).",
        "Zoosporic chytrids (Lobulomycetales OTU_1, Spizellomycetaceae OTU_7) fit waterlogged, tidal mud rich in submerged detritus, pollen and chitin."],
      [K.navy, "FaSeedling", "Root- & litter-associated ascomycetes", H.blueTint,
        "~Gibellulopsis~ OTU_9 (**4.01%**; its longer 1,129 bp consensus is similar in size to the ~1,100–1,150 bp gel band) plus minor saprotrophs and endophytes (OTU_19, 31, 41, 23).",
        "The “plant pathogen” label comes from crop literature; the secondary “litter saprotroph” label fits an asymptomatic endophyte or saprotroph just as well."],
      [K.amber, "FaCogs", "Conserved core fungal metabolism", H.amberTint,
        "**840 ECs** (EC 3 hydrolases lead) and **67 MetaCyc pathways** across 54.55% of preprocessed reads; weighted NSTI = **1.047**.",
        "14 of 27 OTUs (86.4% of reads) have the terrestrial chytrid ~Spizellomyces punctatus~ (Spipu1) as nearest reference: baseline metabolism, not marine-adaptation genes."],
    ];
    pillars.forEach((p, i) => {
      const x = MX + i * 4.115, w = 3.9;
      iconCircle(s, x, 1.95, 0.62, p[0], ic[p[1]], p[2]);
      tx(s, p[2], { x: x + 0.78, y: 1.95, w: w - 0.8, h: 0.62, fontSize: 15, bold: true, valign: "middle", fontFace: THEME.headFontFace });
      tx(s, "OBSERVED IN SAMPLE SC", { x, y: 2.72, w, h: 0.22, fontSize: 11, bold: true, color: H.mute, charSpacing: 1 });
      card(s, { x, y: 2.97, w, h: 1.78, fill: p[3], name: "Observed box " + (i + 1) });
      s.addText(rt(p[4]), { isTextBox: true, margin: 0, valign: "top", x: x + 0.2, y: 3.1, w: w - 0.4, h: 1.55, fontSize: 15, color: K.ink });
      tx(s, "PLAUSIBLE ECOLOGICAL CONTEXT", { x, y: 4.9, w, h: 0.22, fontSize: 11, bold: true, color: H.mute, charSpacing: 1 });
      card(s, { x, y: 5.15, w, h: 1.78, fill: K.white, line: p[0], lw: 1.25, dash: "dash", name: "Plausible box " + (i + 1) });
      s.addText(rt(p[5]), { isTextBox: true, margin: 0, valign: "top", x: x + 0.2, y: 5.28, w: w - 0.4, h: 1.55, fontSize: 15, color: K.ink });
    });
  }

  // ---------------------------------------------------------------- 14 takeaways
  {
    const s = mk(17, "DARK", P[5] + "  ·  TAKEAWAYS", "Key Takeaways and Next Steps", "What you can conclude confidently today, and how to build on this single-sample baseline");
    tx(s, "SUPPORTED BY THIS DATASET", { x: MX, y: 1.95, w: 6, h: 0.25, fontSize: 12, bold: true, color: H.mint, charSpacing: 1 });
    tx(s, "RECOMMENDED NEXT STEPS", { x: 6.95, y: 1.95, w: 5.8, h: 0.25, fontSize: 12, bold: true, color: H.mint, charSpacing: 1 });
    const left = [
      ["Full-length ONT consensus recovery", "13,021 long reads >900 bp kept; 7 non-fungal OTUs separated; 34 fungal OTUs (40,364 reads)."],
      ["Chytrid & unresolved-lineage dominance", "Chytridiomycota 26.52% and unresolved-phylum fungi 45.24% dominate; Ascomycota is 5.27%."],
      ["Transparent guild coverage & OTU_9 check", "Guild databases cover 4.71% / 10.67% of reads; OTU_9 keeps a borderline “?” chimera flag."],
      ["Exploratory functional supplement", "PICRUSt2 covers 54.55% of reads at NSTI 1.047; Spipu1 is nearest reference for 86.4%: hypotheses only."],
    ];
    left.forEach((r, i) => {
      const y = 2.3 + i * 1.15;
      card(s, { x: MX, y, w: 6.1, h: 1.05, fill: K.white, name: "Takeaway card " + (i + 1) });
      badge(s, MX + 0.2, y + 0.3, String(i + 1), K.green, 0.45, "Number");
      tx(s, r[0], { x: MX + 0.85, y: y + 0.12, w: 5.1, h: 0.28, fontSize: 14.5, bold: true });
      tx(s, r[1], { x: MX + 0.85, y: y + 0.42, w: 5.1, h: 0.58, fontSize: 14, color: H.mute });
    });
    const right = [
      ["FaFlask", "Replication, controls & compartment separation", "n ≥ 3–5 trees per site/zone, extraction and PCR negatives; split washed roots, rhizosphere mud and bulk sediment."],
      ["FaMicroscope", "Targeted culturing & gel-band / salinity assays", "Isolate root ascomycetes, bait chytrids across NaCl gradients, and repeat the PCR to sequence the longer band afresh (Slide 18)."],
      ["FaDna", "Shotgun metagenomics or RNA-Seq", "Measure true mangrove-adapted functional genes and in situ transcription beyond sparse-reference predictions."],
    ];
    right.forEach((r, i) => {
      const y = 2.3 + i * 1.55;
      card(s, { x: 6.95, y, w: 5.78, h: 1.43, fill: H.cardDark, line: H.mint, lw: 1, name: "Next-step card " + (i + 1) });
      iconCircle(s, 7.15, y + 0.4, 0.62, K.green, ic[r[0]], r[1]);
      s.addText(paras([{ t: r[1], o: { bold: true, fontSize: 14.5, color: K.white } }, { t: r[2], o: { fontSize: 14, color: H.onDark } }], {}, 3),
        { isTextBox: true, margin: 0, valign: "middle", x: 8.0, y: y + 0.1, w: 4.55, h: 1.23 });
    });
  }


  // ---------------------------------------------------------------- 18 protocol blueprint
  part("6 · Action & Defense");
  {
    const s = mk(18, "LIGHT", P[6] + "  ·  EXPERIMENTAL BLUEPRINT", "Experimental Validation Blueprint", "Proposed follow-ups for amplicon structure, root associates, and salinity responses");
    const cards = [
      [K.amber, "FaDna", "Test the longer OTU_9-associated amplicon",
        "Does the stored **1,129 bp** consensus `00039` contain an insertion relative to the **520 bp** consensus `00012`? Establish its identity and location. A Group I intron is a testable possibility, not a confirmed structure.",
        ["Repeat ITS1/ITS4 PCR with a negative control; run a fresh gel. The photographed historical gel cannot be excised.",
          "Excise and purify the fresh band; sequence the whole product with overlapping bidirectional coverage (add internal primers if needed).",
          "Align to `00039`, `00012`, and references; document insertion boundaries before assigning an intron type. Band size alone does not establish identity."]],
      [K.navy, "FaSeedling", "Test putative root associates",
        "Can culturable ~Gibellulopsis~ (OTU_9) or ~Wardomycopsis~ (OTU_19) be recovered from root tissue rather than adhering sediment?",
        ["Collect replicate root and adjacent sediment samples separately, with collection and processing controls.",
          "Wash roots and surface-sterilize with a lab-validated procedure; include a final-rinse or tissue-imprint control for carryover.",
          "Culture root sections on suitable medium with lab-approved antibacterial supplement; identify isolates by ITS sequencing and compare with the target OTUs. Recovery alone does not prove an in-plant lifestyle."]],
      [K.green, "FaWater", "Sediment chytrid baiting & salinity",
        "Recover zoosporic fungi and test isolate growth across a defined salt gradient.",
        ["Bait replicate fresh sediment subsamples in defined brackish medium with pollen or chitin; include uninoculated and substrate controls, document sporangia, and sequence any isolates.",
          "Compare replicate isolates on a constant base medium with 0%, 2%, 4%, and 6% added NaCl, recording total salinity and growth endpoints. These are added-NaCl values, not in situ tolerance limits."]],
    ];
    cards.forEach((c, i) => {
      const x = MX + i * 4.115, w = 3.9, y = 1.85;
      card(s, { x, y, w, h: 4.6, fill: "F8FAFC", line: "E2E8F0", lw: 1, name: "Protocol card " + (i + 1) });
      iconCircle(s, x + 0.2, y + 0.15, 0.55, c[0], ic[c[1]], c[2]);
      tx(s, c[2], { x: x + 0.9, y: y + 0.15, w: w - 1.05, h: 0.55, fontSize: 14, bold: true, valign: "middle" });
      const body = [{ t: "OBJECTIVE", o: { bold: true, fontSize: 10, color: c[0], charSpacing: 1 } }, { t: c[3].replace(/`/g, ""), o: { fontSize: 11.5 } }, { t: "PROPOSED EXPERIMENT", o: { bold: true, fontSize: 10, color: c[0], charSpacing: 1 } }];
      const runs = paras(body, { color: "334155" }, 3);
      const steps = paras(c[4].map((t) => ({ t: t.replace(/`/g, ""), o: { fontSize: 11.5 } })), { color: "334155" }, 3, "number");
      runs[runs.length - 1].options.breakLine = true;
      s.addText([...runs, ...steps], { isTextBox: true, margin: 0, valign: "top", x: x + 0.22, y: y + 0.85, w: w - 0.44, h: 3.65, lineSpacingMultiple: 1.05 });
    });
    card(s, { x: MX, y: 6.55, w: CW, h: 0.42, fill: H.amberTint, line: H.amberLine, dash: "dash", name: "Protocol status" });
    s.addText(rt("**Protocol status:** study-design starting points. Choose exact sterilization, medium, incubation, and control conditions from a cited method and the local lab SOP before bench work."),
      { isTextBox: true, margin: 0, valign: "middle", x: MX + 0.25, y: 6.55, w: CW - 0.5, h: 0.42, fontSize: 11, color: K.ink });
  }

  // ---------------------------------------------------------------- 19 defense cheat sheet
  {
    const s = mk(19, "LIGHT", P[6] + "  ·  THESIS DEFENSE CHEAT SHEET", "Thesis Defense Cheat Sheet", "Evidence-based answers to four likely examiner questions");
    const qa = [
      ["Your sample is unreplicated (n = 1). How can you draw scientific conclusions?", "Claiming regional generalizability or seasonal stability.",
        "SC describes one confirmed cut-root and sediment sample under defined processing gates. We make no site-wide or seasonal claim. A read-ID train/held-out split gave 93.18% unique assignment of held-out reads, and VSEARCH at two thresholds plus amplicon_sorter gave similar aggregate guild-annotation coverage. These checks show technical consistency within this sample; biological replication remains future work.", 1.1],
      ["Why is your ecological guild coverage below 11% of preprocessed reads?", "Treating unannotated reads as lacking ecological roles.",
        "FungalTraits annotated 4.71% and probable/highly probable FUNGuild annotated 10.67% of all 52,404 preprocessed reads, or 6.11% and 13.86% of fungal-core reads. Chytridiomycota plus unresolved-phylum fungi account for 71.75% of preprocessed reads (93.15% of fungal-core reads). Many OTUs lack an accepted genus or family match in the trait tables; unresolved classification does not mean they are functionless or necessarily uncultured. We retain conservative assignment gates rather than inflate coverage.", 1.3],
      ["FUNGuild shows 4% Plant Pathogens. Is the mangrove tree dying or diseased?", "Diagnosing disease from a trait label.",
        "The sequence data cannot diagnose disease in the host. OTU_9 (~Gibellulopsis~) supplies all of the FungalTraits primary plant-pathogen reads and the exact single-label FUNGuild “Plant Pathogen” bar; OTU_7 and OTU_31 have separate combined FUNGuild labels that also include plant pathogen. OTU_9’s secondary litter-saprotroph label and this root/sediment setting make alternative ecological roles plausible, but host symptoms and root localization were not measured.", 1.15],
      ["PICRUSt2 was designed for bacterial 16S. Can you trust it for fungal ITS?", "Treating inferred pathways as verified fungal activity.",
        "We used the fungal ITS reference and present PICRUSt2 only as an exploratory supplement. Weighted NSTI is 1.047, and 14 of 27 retained OTUs representing 86.4% of predicted-input reads have Spipu1 as their nearest sequenced reference. PICRUSt2 infers functions across the tree rather than copying that one genome. Its developers caution that fungal predictions have limited accuracy. These pathways motivate experiments; they are not direct measurements of genes, transcription, or enzyme activity.", 1.3],
    ];
    let y = 1.85;
    qa.forEach((r, i) => {
      const h = r[3];
      card(s, { x: MX, y, w: 3.7, h, fill: H.blueTint, name: "Question " + (i + 1) });
      badge(s, MX + 0.15, y + 0.15, String(i + 1), K.blue, 0.38, "Question number");
      s.addText([{ text: r[0], options: { bold: true, fontSize: 12.5, breakLine: true } }, { text: "Likely concern: " + r[1], options: { fontSize: 11, color: H.mute } }],
        { isTextBox: true, margin: 0, valign: "middle", x: MX + 0.65, y: y + 0.05, w: 2.9, h: h - 0.1, color: K.ink, paraSpaceAfter: 2 });
      card(s, { x: MX + 3.82, y, w: CW - 3.82, h, fill: K.white, line: "E2E8F0", lw: 1, name: "Response " + (i + 1) });
      s.addText(rt(r[2]), { isTextBox: true, margin: 0, valign: "middle", x: MX + 4.05, y: y + 0.05, w: CW - 4.27, h: h - 0.1, fontSize: 12, color: "334155", lineSpacingMultiple: 1.05 });
      y += h + 0.08;
    });
  }

  // ---------------------------------------------------------------- write
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  const n = await dedupeParagraphProps(OUT);
  console.log("wrote", OUT, "(removed", n, "duplicate paragraph-property blocks)");
})().catch((e) => { console.error(e); process.exit(1); });
