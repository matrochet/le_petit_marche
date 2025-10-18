#!/usr/bin/env node
/* eslint-disable */
/*
  Heuristic Tailwind responsiveness audit
  - Scans .tsx/.ts/.jsx/.js files under a directory (default: src)
  - Counts Tailwind breakpoint prefixes (sm:, md:, lg:, xl:)
  - Flags files that likely lack responsive variants
  - Outputs a human-readable summary and optional JSON/Markdown report

  Usage examples (PowerShell):
    node src/utils/test-responsiveness.js
    node src/utils/test-responsiveness.js --dir src/components
    node src/utils/test-responsiveness.js --dir src --out reports/responsiveness.json --format json
*/

const fs = require("fs");
const path = require("path");

const DEFAULT_DIR = "src";
const SUPPORTED_EXT = new Set([".tsx", ".ts", ".jsx", ".js"]);
const BREAKPOINTS = ["sm:", "md:", "lg:", "xl:"]; // scope to requested ones

function parseArgs(argv) {
  const args = { dir: DEFAULT_DIR, out: null, format: "console" };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--dir" && argv[i + 1]) args.dir = argv[++i];
    else if (a === "--out" && argv[i + 1]) args.out = argv[++i];
    else if (a === "--format" && argv[i + 1]) args.format = argv[++i];
    else if (a === "--help" || a === "-h") args.help = true;
  }
  return args;
}

function printHelp() {
  console.log(
    `Tailwind responsiveness audit\n\nOptions:\n  --dir <path>     Root to scan (default: ${DEFAULT_DIR})\n  --out <path>     Write report to file (json|md depending on --format)\n  --format <fmt>   console|json|md (default: console)\n  --help           Show this help\n`
  );
}

function walk(dir) {
  const out = [];
  const stack = [dir];
  while (stack.length) {
    const d = stack.pop();
    let entries;
    try {
      entries = fs.readdirSync(d, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const ent of entries) {
      const p = path.join(d, ent.name);
      if (ent.isDirectory()) {
        // Skip common output/build folders
        if (
          ent.name === ".next" ||
          ent.name === "node_modules" ||
          ent.name === ".git"
        )
          continue;
        stack.push(p);
      } else if (SUPPORTED_EXT.has(path.extname(ent.name))) {
        out.push(p);
      }
    }
  }
  return out;
}

function stripInterpolations(str) {
  // Remove template literal interpolations to avoid breaking class extraction
  return str.replace(/\$\{[^}]*\}/g, "");
}

function extractClassNameLines(content) {
  const lines = content.split(/\r?\n/);
  const out = [];
  for (const line of lines) {
    if (line.includes("className=") || line.includes("class=")) out.push(line);
  }
  return out;
}

function countBreakpointsInText(text) {
  const counts = Object.fromEntries(
    BREAKPOINTS.map((bp) => [bp.slice(0, -1), 0])
  );
  for (const bp of BREAKPOINTS) {
    const key = bp.slice(0, -1);
    const regex = new RegExp(`(^|\\s)${bp.replace(":", ":")}`, "g");
    const m = text.match(regex);
    counts[key] += m ? m.length : 0;
  }
  return counts;
}

function analyzeFile(filePath) {
  let content = "";
  try {
    content = fs.readFileSync(filePath, "utf8");
  } catch (e) {
    return { file: filePath, error: e.message };
  }

  const classLines = extractClassNameLines(content).map(stripInterpolations);
  const joined = classLines.join("\n");
  const counts = countBreakpointsInText(joined);
  const totalResponsive = Object.values(counts).reduce((a, b) => a + b, 0);

  // Heuristic issue detection per line
  const potentialIssues = [];
  if (classLines.length > 0 && totalResponsive === 0) {
    potentialIssues.push(
      "No responsive variants (sm:, md:, lg:, xl:) detected in className usage"
    );
  }

  // Flag lines with width/height/layout classes lacking any breakpoint prefixes
  const LAYOUT_PATTERNS =
    /(w-|h-|max-w-|min-w-|grid-cols-|flex|fixed|absolute|overflow-x|overflow-y)/;
  for (const ln of classLines) {
    if (LAYOUT_PATTERNS.test(ln) && !/(^|\s)(sm:|md:|lg:|xl:)/.test(ln)) {
      potentialIssues.push(
        "Layout-impacting classes without responsive variants (line): " +
          ln.trim()
      );
    }
  }

  return {
    file: filePath,
    classNameLineCount: classLines.length,
    breakpointCounts: counts,
    hasResponsive: totalResponsive > 0,
    potentialIssues,
  };
}

function aggregate(results) {
  const totals = { sm: 0, md: 0, lg: 0, xl: 0 };
  let filesFlagged = 0;
  let filesWithNoResponsive = 0;
  for (const r of results) {
    if (r.error) continue;
    totals.sm += r.breakpointCounts.sm || 0;
    totals.md += r.breakpointCounts.md || 0;
    totals.lg += r.breakpointCounts.lg || 0;
    totals.xl += r.breakpointCounts.xl || 0;
    if (r.potentialIssues && r.potentialIssues.length) filesFlagged += 1;
    if (r.classNameLineCount > 0 && !r.hasResponsive)
      filesWithNoResponsive += 1;
  }
  return { totals, filesFlagged, filesWithNoResponsive };
}

function toConsoleReport(dir, results) {
  const { totals, filesFlagged, filesWithNoResponsive } = aggregate(results);
  const scanned = results.length;
  console.log("\nTailwind responsiveness audit");
  console.log("Directory:", dir);
  console.log("Scanned files:", scanned);
  console.log("Breakpoint counts:", totals);
  console.log(
    "Files flagged:",
    filesFlagged,
    "| Files with no responsive variants:",
    filesWithNoResponsive
  );

  if (filesFlagged) {
    console.log("\nPotential issues:");
    for (const r of results) {
      if (!r.potentialIssues || r.potentialIssues.length === 0) continue;
      console.log("\n- ", r.file);
      for (const issue of r.potentialIssues.slice(0, 5)) {
        console.log("   •", issue);
      }
      if (r.potentialIssues.length > 5)
        console.log("   • (+" + (r.potentialIssues.length - 5) + " more)");
    }
  }
}

function toJsonReport(dir, results) {
  const summary = aggregate(results);
  return JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      rootDir: dir,
      scannedFilesCount: results.length,
      summary,
      files: results,
    },
    null,
    2
  );
}

function toMarkdownReport(dir, results) {
  const { totals, filesFlagged, filesWithNoResponsive } = aggregate(results);
  let md = `# Tailwind responsiveness audit\n\n`;
  md += `- Directory: ${dir}\n`;
  md += `- Scanned files: ${results.length}\n`;
  md += `- Breakpoint counts: sm=${totals.sm}, md=${totals.md}, lg=${totals.lg}, xl=${totals.xl}\n`;
  md += `- Files flagged: ${filesFlagged}\n`;
  md += `- Files with no responsive variants: ${filesWithNoResponsive}\n\n`;
  if (filesFlagged) {
    md += `## Potential issues by file\n`;
    for (const r of results) {
      if (!r.potentialIssues || r.potentialIssues.length === 0) continue;
      md += `\n### ${r.file}\n`;
      r.potentialIssues.forEach((iss) => (md += `- ${iss}\n`));
    }
  }
  return md;
}

function ensureParentDir(filePath) {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    printHelp();
    process.exit(0);
  }
  const dir = path.resolve(process.cwd(), args.dir || DEFAULT_DIR);

  const files = walk(dir);
  const results = files.map(analyzeFile);

  if (!args.out || args.format === "console") {
    toConsoleReport(dir, results);
    return;
  }

  const format = (args.format || "json").toLowerCase();
  let content;
  if (format === "json") content = toJsonReport(dir, results);
  else if (format === "md") content = toMarkdownReport(dir, results);
  else content = toJsonReport(dir, results);

  const outPath = path.resolve(process.cwd(), args.out);
  ensureParentDir(outPath);
  fs.writeFileSync(outPath, content, "utf8");
  console.log(`Report written: ${outPath}`);
}

if (require.main === module) {
  main();
}
