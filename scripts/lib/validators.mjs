import { readFile } from "node:fs/promises";

const ACTIVE_PRODUCTION_STATES = new Set([
  "generating",
  "editing",
  "qa",
  "delivered"
]);

export async function readJson(path) {
  const raw = await readFile(path, "utf8");
  try {
    return JSON.parse(raw);
  } catch (error) {
    throw new Error(`${path}: invalid JSON (${error.message})`);
  }
}

export function validateBrand(brand) {
  const errors = [];
  const warnings = [];

  requireObject(brand, "brand", errors);
  requireString(brand?.brandId, "brand.brandId", errors);
  requireString(brand?.displayName, "brand.displayName", errors);
  requireObject(brand?.messaging, "brand.messaging", errors);
  requireObject(brand?.visual, "brand.visual", errors);
  requireArray(brand?.channels, "brand.channels", errors, true);
  requireObject(brand?.compliance, "brand.compliance", errors);

  if (brand?.status === "draft") {
    warnings.push("Brand profile is still marked draft.");
  }

  if (brand?.visual?.logoPaths?.length === 0) {
    warnings.push("Brand profile has no logo asset; confirm that a text-only treatment is intentional.");
  }

  return { errors, warnings };
}

export function validateAvatar(avatar) {
  const errors = [];
  const warnings = [];
  const allowedModes = new Set([
    "owned",
    "licensed-library",
    "new-consented",
    "generated-fictional",
    "none"
  ]);

  requireObject(avatar, "avatar", errors);
  requireString(avatar?.avatarId, "avatar.avatarId", errors);
  if (!allowedModes.has(avatar?.mode)) {
    errors.push("avatar.mode is missing or unsupported.");
  }
  requireObject(avatar?.authorization, "avatar.authorization", errors);
  requireObject(avatar?.voice, "avatar.voice", errors);
  requireObject(avatar?.continuity, "avatar.continuity", errors);

  const realPersonMode = avatar?.mode === "owned" || avatar?.mode === "new-consented";
  const licensedMode = avatar?.mode === "licensed-library";
  if ((realPersonMode || licensedMode) && avatar?.authorization?.status !== "verified") {
    warnings.push("Avatar consent or catalogue licence is not verified.");
  }

  if (avatar?.mode === "none" && avatar?.voice?.source === "avatar-default") {
    errors.push("Avatar mode none cannot use avatar-default as the voice source.");
  }

  if (avatar?.mode !== "none" && avatar?.identity?.adultConfirmed !== true) {
    warnings.push("Adult status is not explicitly confirmed for the visible presenter.");
  }

  return { errors, warnings };
}

export function validateProject(project, brand, avatar) {
  const errors = [];
  const warnings = [];

  requireObject(project, "project", errors);
  requireString(project?.projectId, "project.projectId", errors);
  requireString(project?.brandProfilePath, "project.brandProfilePath", errors);
  requireString(project?.avatarProfilePath, "project.avatarProfilePath", errors);
  requireString(project?.objective?.primary, "project.objective.primary", errors);
  requireString(project?.objective?.metric, "project.objective.metric", errors);
  requireString(project?.offer, "project.offer", errors);
  requireString(project?.audience, "project.audience", errors);
  requireNumber(project?.targetDurationSec, "project.targetDurationSec", errors, { positive: true });
  requireObject(project?.approvals, "project.approvals", errors);

  if (project?.platform?.width < 320 || project?.platform?.height < 320) {
    errors.push("Project output dimensions must both be at least 320 px.");
  }

  if (ACTIVE_PRODUCTION_STATES.has(project?.state) && project?.approvals?.production?.status !== "approved") {
    errors.push(`Project state ${project.state} requires production approval.`);
  }

  if (project?.state === "delivered" && project?.approvals?.publication?.status === "rejected") {
    warnings.push("Project is delivered but publication approval is rejected; do not publish it.");
  }

  if (brand && avatar) {
    const allowed = avatar.authorization?.allowedBrands ?? [];
    if (avatar.mode !== "none" && !allowed.includes("*") && !allowed.includes(brand.brandId)) {
      errors.push(`Avatar ${avatar.avatarId} is not authorised for brand ${brand.brandId}.`);
    }

    const rightsRequired = ["owned", "licensed-library", "new-consented"].includes(avatar.mode);
    if (ACTIVE_PRODUCTION_STATES.has(project?.state) && rightsRequired && avatar.authorization?.status !== "verified") {
      errors.push("Active production requires verified avatar consent or licence.");
    }
  }

  for (const asset of project?.sourceAssets ?? []) {
    if (ACTIVE_PRODUCTION_STATES.has(project?.state) && asset.rightsStatus === "pending") {
      errors.push(`Source asset ${asset.path} still has pending rights.`);
    }
  }

  if (project?.approvals?.brief?.status !== "approved") {
    warnings.push("Brief approval is still pending.");
  }
  if (project?.approvals?.production?.status !== "approved") {
    warnings.push("External generation is not yet approved.");
  }

  return { errors, warnings };
}

export function validateShotPlan(plan, project, avatar) {
  const errors = [];
  const warnings = [];
  const ids = new Set();

  requireObject(plan, "shotPlan", errors);
  requireString(plan?.projectId, "shotPlan.projectId", errors);
  requireNumber(plan?.totalDurationSec, "shotPlan.totalDurationSec", errors, { positive: true });
  requireArray(plan?.shots, "shotPlan.shots", errors, true);

  if (project?.projectId && plan?.projectId !== project.projectId) {
    errors.push("Shot plan projectId does not match project.json.");
  }

  if (project?.targetDurationSec && Math.abs(plan?.totalDurationSec - project.targetDurationSec) > 0.25) {
    errors.push("Shot plan total duration does not match the project target duration.");
  }

  let previousEnd = 0;
  let ctaCount = 0;
  let arRollCount = 0;

  for (const [index, shot] of (plan?.shots ?? []).entries()) {
    const label = shot?.id || `shot[${index}]`;
    requireString(shot?.id, `${label}.id`, errors);
    requireNumber(shot?.startSec, `${label}.startSec`, errors);
    requireNumber(shot?.endSec, `${label}.endSec`, errors, { positive: true });

    if (ids.has(shot?.id)) errors.push(`Duplicate shot id ${shot.id}.`);
    ids.add(shot?.id);

    if (shot?.endSec <= shot?.startSec) {
      errors.push(`${label} must end after it starts.`);
    }

    if (shot?.startSec < previousEnd - 0.01) {
      errors.push(`${label} overlaps the previous shot.`);
    } else if (shot?.startSec > previousEnd + 0.04) {
      errors.push(`${label} leaves an uncovered timeline gap.`);
    }
    previousEnd = shot?.endSec ?? previousEnd;

    const duration = (shot?.endSec ?? 0) - (shot?.startSec ?? 0);
    if (duration > 8) warnings.push(`${label} is ${duration.toFixed(2)} s; consider a shorter controllable shot.`);
    if (duration > 0 && duration < 1) warnings.push(`${label} is under 1 s; verify readability and visual stability.`);

    if (shot?.role === "broll") {
      if (shot?.direction?.noTalking !== true) {
        errors.push(`${label} is B-roll and must set noTalking to true.`);
      }
      if (shot?.audio?.mode === "dialogue") {
        errors.push(`${label} is B-roll and cannot use dialogue audio mode.`);
      }
    }

    if (shot?.role === "aroll") {
      arRollCount += 1;
      if (shot?.audio?.mode !== "dialogue") {
        errors.push(`${label} is A-roll and must use dialogue audio mode.`);
      }
      if (shot?.direction?.noTalking === true) {
        errors.push(`${label} is A-roll but is marked noTalking.`);
      }
    }

    if (shot?.role === "cta") {
      ctaCount += 1;
      if (!shot?.overlays?.cta) warnings.push(`${label} is a CTA shot without CTA overlay text.`);
    }

    if (shot?.source?.rightsStatus === "pending") {
      warnings.push(`${label} uses a source with pending rights.`);
    }

    if (shot?.direction?.camera?.implementation === "native" && !shot?.source?.provider) {
      warnings.push(`${label} requests native camera movement without a provider.`);
    }
  }

  if (Math.abs(previousEnd - (plan?.totalDurationSec ?? 0)) > 0.04) {
    errors.push("The final shot does not end at totalDurationSec.");
  }

  if (avatar?.mode === "none" && arRollCount > 0) {
    errors.push("Avatar mode none is incompatible with A-roll shots.");
  }

  if (ctaCount === 0) warnings.push("Shot plan has no dedicated CTA shot.");

  const spokenModes = new Set(["dialogue", "voiceover"]);
  if (project?.audioMaster?.mode === "none" && (plan?.shots ?? []).some((shot) => spokenModes.has(shot?.audio?.mode))) {
    errors.push("The shot plan uses speech while audioMaster.mode is none.");
  }

  return { errors, warnings };
}

export function mergeReports(...reports) {
  return reports.reduce(
    (result, report) => ({
      errors: [...result.errors, ...report.errors],
      warnings: [...result.warnings, ...report.warnings]
    }),
    { errors: [], warnings: [] }
  );
}

function requireObject(value, label, errors) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    errors.push(`${label} must be an object.`);
  }
}

function requireArray(value, label, errors, nonEmpty = false) {
  if (!Array.isArray(value)) {
    errors.push(`${label} must be an array.`);
  } else if (nonEmpty && value.length === 0) {
    errors.push(`${label} cannot be empty.`);
  }
}

function requireString(value, label, errors) {
  if (typeof value !== "string" || value.trim() === "") {
    errors.push(`${label} must be a non-empty string.`);
  }
}

function requireNumber(value, label, errors, options = {}) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    errors.push(`${label} must be a finite number.`);
  } else if (options.positive && value <= 0) {
    errors.push(`${label} must be greater than zero.`);
  }
}

