import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const frontendRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const schemaSrc = path.resolve(
  frontendRoot,
  "../backend/prisma/schema.prisma",
);
const schemaDest = path.join(frontendRoot, "prisma", "schema.prisma");
const prismaCli = path.join(
  frontendRoot,
  "node_modules",
  "prisma",
  "build",
  "index.js",
);

mkdirSync(path.dirname(schemaDest), { recursive: true });
writeFileSync(schemaDest, readFileSync(schemaSrc));

const env = { ...process.env };
if (!env.DATABASE_URL) {
  env.DATABASE_URL = "postgresql://127.0.0.1:5432/prisma_generate";
}

const result = spawnSync(
  process.execPath,
  [prismaCli, "generate", "--schema", schemaDest],
  {
    cwd: frontendRoot,
    env,
    stdio: "inherit",
  },
);

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}
