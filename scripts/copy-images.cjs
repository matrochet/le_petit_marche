/* eslint-env node */
"use strict";

// Copy product images from src/app/images_le_petit_marché to public/images_le_petit_marché
// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require("fs");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require("path");

function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.error(`Source folder not found: ${src}`);
    process.exit(1);
  }
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const files = fs.readdirSync(src);
  let count = 0;
  for (const f of files) {
    const from = path.join(src, f);
    const to = path.join(dest, f);
    const stat = fs.statSync(from);
    if (stat.isFile()) {
      fs.copyFileSync(from, to);
      count++;
    }
  }
  console.log(`Copied ${count} file(s) from ${src} to ${dest}`);
}

const src = path.resolve(
  __dirname,
  "..",
  "src",
  "app",
  "images_le_petit_marché"
);
const dest = path.resolve(__dirname, "..", "public", "images_le_petit_marché");
copyDir(src, dest);
