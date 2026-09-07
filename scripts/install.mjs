#!/usr/bin/env node

import { cp, mkdir, readFile, stat } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const args = parseArgs(process.argv.slice(2));
const skillName = "multi-brand-video-studio";
const source = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

if (!args.target || !["codex", "claude", "gemini", "agents"].includes(args.target)) {
  usage("Choose --target codex|claude|gemini|agents.");
}

if (args.scope === "project" && !args.project) {
  usage("Project scope requires --project /absolute/path/to/project.");
}

const roots = {
  codex: args.scope === "project" ? ".codex/skills" : ".codex/skills",
  claude: args.scope === "project" ? ".claude/skills" : ".claude/skills",
  gemini: args.scope === "project" ? ".gemini/skills" : ".gemini/skills",
  agents: args.scope === "project" ? ".agents/skills" : ".agents/skills"
};
const base = args.scope === "project" ? path.resolve(args.project) : os.homedir();
const destination = path.join(base, roots[args.target], skillName);

if (path.resolve(destination) === source) {
  console.log(`Already installed at ${destination}`);
  process.exit(0);
}

if (await exists(destination) && !args.force) {
  console.error(`Destination already exists: ${destination}`);
  console.error("Re-run with --force only after reviewing the existing installation.");
  process.exit(1);
}

if (args.dryRun) {
  console.log(`Would install ${source} -> ${destination}`);
  process.exit(0);
}

await mkdir(path.dirname(destination), { recursive: true });
await cp(source, destination, {
  recursive: true,
  force: args.force,
  errorOnExist: !args.force,
  filter: (entry) => {
    const relative = path.relative(source, entry);
    const segments = relative.split(path.sep);
    if (segments.some((segment) => [".git", "node_modules", "dist", "renders", "work"].includes(segment))) return false;
    if (path.basename(entry) === ".env") return false;
    return !/\.(mp4|mov|wav|mp3)$/i.test(entry);
  }
});

const installedSkill = await readFile(path.join(destination, "SKILL.md"), "utf8");
if (!installedSkill.includes("name: multi-brand-video-studio")) {
  console.error("Installation copied files but SKILL.md did not pass the identity check.");
  process.exit(1);
}

console.log(`Installed ${skillName} at ${destination}`);

function parseArgs(values) {
  const parsed = { target: null, scope: "user", project: null, force: false, dryRun: false };
  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    if (value === "--target") parsed.target = values[++index];
    else if (value === "--scope") parsed.scope = values[++index];
    else if (value === "--project") parsed.project = values[++index];
    else if (value === "--force") parsed.force = true;
    else if (value === "--dry-run") parsed.dryRun = true;
    else usage(`Unknown option: ${value}`);
  }
  if (!["user", "project"].includes(parsed.scope)) usage("Choose --scope user|project.");
  return parsed;
}

async function exists(target) {
  try {
    await stat(target);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
}

function usage(message) {
  if (message) console.error(message);
  console.error("Usage: node scripts/install.mjs --target codex|claude|gemini|agents [--scope user|project] [--project PATH] [--dry-run] [--force]");
  process.exit(2);
}

