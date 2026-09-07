#!/usr/bin/env node

import path from "node:path";
import process from "node:process";
import {
  mergeReports,
  readJson,
  validateAvatar,
  validateBrand,
  validateProject,
  validateShotPlan
} from "./lib/validators.mjs";

const [projectArg, shotPlanArg] = process.argv.slice(2);

if (!projectArg || !shotPlanArg) {
  console.error("Usage: node scripts/validate-project.mjs <project.json> <shot-plan.json>");
  process.exit(2);
}

const projectPath = path.resolve(projectArg);
const shotPlanPath = path.resolve(shotPlanArg);
const project = await readJson(projectPath);
const shotPlan = await readJson(shotPlanPath);
const projectDirectory = path.dirname(projectPath);
const brandPath = path.resolve(projectDirectory, project.brandProfilePath ?? "brand.json");
const avatarPath = path.resolve(projectDirectory, project.avatarProfilePath ?? "avatar.json");
const brand = await readJson(brandPath);
const avatar = await readJson(avatarPath);

const report = mergeReports(
  validateBrand(brand),
  validateAvatar(avatar),
  validateProject(project, brand, avatar),
  validateShotPlan(shotPlan, project, avatar)
);

for (const warning of report.warnings) console.warn(`WARN: ${warning}`);
for (const error of report.errors) console.error(`ERROR: ${error}`);

if (report.errors.length > 0) {
  console.error(`Validation failed with ${report.errors.length} error(s) and ${report.warnings.length} warning(s).`);
  process.exit(1);
}

console.log(`Validation passed with ${report.warnings.length} warning(s).`);

