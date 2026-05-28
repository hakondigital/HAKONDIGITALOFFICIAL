import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..", "public", "images");

const jobs = [
  // Portfolio cards render at ~h-52 / max ~600px wide → 1400px is plenty
  { input: "carpentry-showcase.png", output: "carpentry-showcase.jpg", width: 1400, quality: 75, format: "jpeg" },
  { input: "anthony-hamer-associates.png", output: "anthony-hamer-associates.jpg", width: 1400, quality: 75, format: "jpeg" },
  { input: "irx-advisors.png", output: "irx-advisors.jpg", width: 1400, quality: 75, format: "jpeg" },
  // Founder photo renders at max 400px wide → 800px @ 2x DPR
  { input: "noah-campbell.jpeg", output: "noah-campbell.jpg", width: 800, quality: 80, format: "jpeg" },
];

for (const job of jobs) {
  const src = path.join(root, job.input);
  const dst = path.join(root, job.output);
  try {
    const before = (await fs.stat(src)).size;
    const pipeline = sharp(src).resize({ width: job.width, withoutEnlargement: true });
    if (job.format === "jpeg") {
      await pipeline.jpeg({ quality: job.quality, mozjpeg: true }).toFile(dst);
    } else {
      await pipeline.webp({ quality: job.quality }).toFile(dst);
    }
    const after = (await fs.stat(dst)).size;
    const pct = ((1 - after / before) * 100).toFixed(1);
    console.log(`${job.input} -> ${job.output}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB (-${pct}%)`);
  } catch (err) {
    console.error(`Failed ${job.input}: ${err.message}`);
  }
}
