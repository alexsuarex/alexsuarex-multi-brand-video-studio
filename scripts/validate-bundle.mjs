#!/usr/bin/env node

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import {
  mergeReports,
  readJson,
  validateAvatar,
  validateBrand,
  validateProject,
  validateShotPlan
} from "./lib/validators.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const requiredFiles = [
  "SKILL.md",
  "README.md",
  "references/intake-and-state.md",
  "references/brand-and-avatar.md",
  "references/creative-modules.md",
  "references/avatar-camera-and-gestures.md",
  "references/silent-broll.md",
  "references/provider-routing.md",
  "references/quality-control.md",
  "references/portability.md",
  "schemas/brand-profile.schema.json",
  "schemas/avatar-profile.schema.json",
  "schemas/project-brief.schema.json",
  "schemas/shot-plan.schema.json",
  "schemas/capabilities.schema.json",
  "templates/project-brief.example.json",
  "templates/shot-plan.example.json",
  "evals/evals.json"
];

const errors = [];
const warnings = [];

for (const relativePath of requiredFiles) {
  try {
    await readFile(path.join(root, relativePath));
  } catch {
    errors.push(`Missing required file: ${relativePath}`);
  }
}

const skill = await readFile(path.join(root, "SKILL.md"), "utf8");
const skillLines = skill.split(/\r?\n/).length;
if (skillLines > 500) errors.push(`SKILL.md has ${skillLines} lines; keep it at or below 500.`);
if (!skill.startsWith("---\n")) errors.push("SKILL.md is missing YAML frontmatter.");
if (!/^name:\s+multi-brand-video-studio$/m.test(skill)) errors.push("SKILL.md has an invalid or missing name.");
if (!/^description:\s+\S.+$/m.test(skill)) errors.push("SKILL.md has an invalid or missing description.");
const frontmatterMatch = skill.match(/^---\n([\s\S]*?)\n---/);
if (!frontmatterMatch) {
  errors.push("SKILL.md frontmatter delimiters are invalid.");
} else {
  const keys = [...frontmatterMatch[1].matchAll(/^([A-Za-z0-9-]+):/gm)].map((match) => match[1]);
  const allowedKeys = new Set(["name", "description", "license", "allowed-tools", "metadata", "compatibility"]);
  for (const key of keys) {
    if (!allowedKeys.has(key)) errors.push(`Unexpected SKILL.md frontmatter key: ${key}`);
  }
  const description = frontmatterMatch[1].match(/^description:\s*(.+)$/m)?.[1] ?? "";
  if (description.length > 1024) errors.push("SKILL.md description exceeds 1024 characters.");
  if (description.includes("<") || description.includes(">")) errors.push("SKILL.md description cannot contain angle brackets.");
}

const jsonFiles = (await walk(root)).filter((file) => file.endsWith(".json"));
for (const file of jsonFiles) {
  try {
    await readJson(file);
  } catch (error) {
    errors.push(error.message);
  }
}

const brand = await readJson(path.join(root, "templates/brand-profile.example.json"));
const avatar = await readJson(path.join(root, "templates/avatar-profile.example.json"));
const project = await readJson(path.join(root, "templates/project-brief.example.json"));
const shotPlan = await readJson(path.join(root, "templates/shot-plan.example.json"));
const exampleReport = mergeReports(
  validateBrand(brand),
  validateAvatar(avatar),
  validateProject(project, brand, avatar),
  validateShotPlan(shotPlan, project, avatar)
);
errors.push(...exampleReport.errors.map((message) => `Example: ${message}`));
warnings.push(...exampleReport.warnings.map((message) => `Example: ${message}`));

const evals = await readJson(path.join(root, "evals/evals.json"));
if (!Array.isArray(evals.evals) || evals.evals.length < 3) {
  errors.push("evals/evals.json must include at least three eval cases.");
}

const textFiles = (await walk(root)).filter((file) => /\.(md|json|mjs|yml|yaml|example)$/.test(file));
const secretPatterns = [
  /ghp_[A-Za-z0-9]{20,}/,
  /sk-[A-Za-z0-9_-]{20,}/,
  /(?:api[_-]?key|token)\s*[:=]\s*["'][^"']{8,}["']/i
];
for (const file of textFiles) {
  const body = await readFile(file, "utf8");
  if (secretPatterns.some((pattern) => pattern.test(body))) {
    errors.push(`Possible committed secret in ${path.relative(root, file)}.`);
  }
}

for (const warning of warnings) console.warn(`WARN: ${warning}`);
for (const error of errors) console.error(`ERROR: ${error}`);

if (errors.length > 0) {
  console.error(`Bundle validation failed with ${errors.length} error(s).`);
  process.exit(1);
}

console.log(`Bundle validation passed: ${jsonFiles.length} JSON files, ${evals.evals.length} evals, ${skillLines} SKILL.md lines.`);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if ([".git", "node_modules", "dist", "renders", "work"].includes(entry.name)) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(fullPath));
    else files.push(fullPath);
  }
  return files;
}
