const { execSync } = require("child_process");
const fs = require("fs");

try {
  execSync(
    "npx --yes lighthouse https://lestow.com/ --only-categories=performance,accessibility --chrome-flags='--headless --no-sandbox --disable-dev-shm-usage' --quiet --output=json --output-path=/tmp/lh.json",
    { stdio: "inherit", timeout: 180000 },
  );
} catch (e) {
  console.error("lighthouse failed", e.message);
  process.exit(1);
}

const r = JSON.parse(fs.readFileSync("/tmp/lh.json", "utf8"));
console.log(
  "perf",
  Math.round(r.categories.performance.score * 100),
  "a11y",
  Math.round(r.categories.accessibility.score * 100),
);

for (const a of Object.values(r.audits)) {
  if (a.score === null || a.score >= 1) continue;
  if (a.scoreDisplayMode !== "binary" && a.scoreDisplayMode !== "numeric") continue;
  if (a.scoreDisplayMode === "numeric" && a.score > 0.9) continue;
  console.log(String(a.score), a.id, "-", a.title);
}
