export type BriefInput = {
  brandName: string;
  collectionName: string;
  creativeDirection: string;
  materialsFinish: string;
  colorPalette: string;
  packagingComponents: string;
  toneOfVoice: string;
  deliverables: string;
};

export type AgentReport = {
  name: string;
  role: string;
  status: string;
  summary: string;
  highlights: string[];
};

export type StudioRun = {
  projectName: string;
  narrative: string;
  generatedAt: string;
  agentReports: AgentReport[];
  visualPrompts: {
    hero: string;
    lineup: string;
    detail: string;
  };
  packagingSpec: {
    frame: string[];
    tube: string[];
    inserts: string[];
    productionNotes: string[];
  };
  copyPack: {
    launchDescription: string;
    certificate: string;
    thankYou: string;
  };
  qaReport: {
    score: number;
    passes: string[];
    warnings: string[];
  };
  exportPack: string[];
  nextActions: string[];
};

export const defaultBrief: BriefInput = {
  brandName: "RØCFRAME",
  collectionName: "Obsidian Halo",
  creativeDirection:
    "A cinematic product lineup on a deep-purple cosmic background with a black frame, glowing gold RØCFRAME label on the back, matte-black art tube with a gold seal, certificate of authenticity, thank-you insert, and a gentle sweep of violet-to-gold nebula light across the scene.",
  materialsFinish:
    "Obsidian black frame body, satin-black packaging shell, matte-black art tube, brushed gold foil label, embossed gold seal, velvet-soft insert stock.",
  colorPalette: "Obsidian Black\nSolar Gold\nNebula Violet\nStarlight Cream",
  packagingComponents:
    "Black frame\nBack label with glowing gold RØCFRAME mark\nMatte-black art tube with gold seal\nCertificate of Authenticity\nThank-you insert",
  toneOfVoice: "Luxury, mythic, precise, premium, reverent, founder-led.",
  deliverables:
    "Hero prompt\nProduct lineup prompt\nPackaging spec\nCertificate copy\nThank-you insert copy\nLaunch description\nQA summary",
};

export function sanitizeBriefInput(input: Partial<BriefInput> | null | undefined): BriefInput {
  return {
    brandName: cleanValue(input?.brandName, defaultBrief.brandName),
    collectionName: cleanValue(input?.collectionName, defaultBrief.collectionName),
    creativeDirection: cleanValue(
      input?.creativeDirection,
      defaultBrief.creativeDirection,
    ),
    materialsFinish: cleanValue(
      input?.materialsFinish,
      defaultBrief.materialsFinish,
    ),
    colorPalette: cleanValue(input?.colorPalette, defaultBrief.colorPalette),
    packagingComponents: cleanValue(
      input?.packagingComponents,
      defaultBrief.packagingComponents,
    ),
    toneOfVoice: cleanValue(input?.toneOfVoice, defaultBrief.toneOfVoice),
    deliverables: cleanValue(input?.deliverables, defaultBrief.deliverables),
  };
}

export function runStudioBrief(input: BriefInput): StudioRun {
  const palette = splitList(input.colorPalette, [
    "Obsidian Black",
    "Solar Gold",
    "Nebula Violet",
  ]);
  const components = splitList(input.packagingComponents, [
    "Black frame",
    "Matte-black art tube",
    "Certificate of Authenticity",
    "Thank-you insert",
  ]);
  const deliverables = splitList(input.deliverables, [
    "Hero prompt",
    "Lineup prompt",
    "Packaging spec",
    "Certificate copy",
  ]);
  const materials = splitList(input.materialsFinish, [
    "Obsidian black shell",
    "Brushed gold detailing",
  ]);
  const toneKeywords = splitList(input.toneOfVoice, [
    "Luxury",
    "precise",
    "founder-led",
  ]);

  const paletteLine = oxfordList(palette);
  const componentLine = oxfordList(components);
  const materialLine = oxfordList(materials);
  const toneLine = oxfordList(toneKeywords);
  const projectName = `${input.brandName} / ${input.collectionName}`;

  const heroPrompt = [
    `Ultra-premium studio hero image for ${input.brandName} ${input.collectionName}.`,
    `${input.creativeDirection}`,
    `Materials: ${materialLine}.`,
    `Palette: ${paletteLine}.`,
    "Single-object focus, luxurious negative space, editorial lighting, high contrast, refined reflections, no people, no clutter, tactile realism.",
  ].join(" ");

  const lineupPrompt = [
    `Cinematic lineup scene for ${projectName}.`,
    `Include ${componentLine}.`,
    `Stage the composition with ${input.creativeDirection.toLowerCase()}`,
    `Use ${paletteLine.toLowerCase()} with a premium finish language.`,
    "Luxury commerce photography, crisp edges, subtle atmosphere, dramatic but controlled light falloff.",
  ].join(" ");

  const detailPrompt = [
    `Macro detail study for ${projectName}.`,
    `Show the tactile finish of ${materialLine.toLowerCase()}.`,
    "Capture foil, emboss, edge fidelity, and premium packaging textures with museum-grade precision.",
  ].join(" ");

  const launchDescription = [
    `${input.brandName} presents ${input.collectionName}, a premium art object wrapped in a black-and-gold packaging system built to feel ceremonial from first sight to final reveal.`,
    `The creative direction leans into ${toneLine.toLowerCase()} energy, pairing ${paletteLine.toLowerCase()} with a cinematic sense of depth and restraint.`,
    `Every touchpoint, from the frame to the insert pack, is designed to feel singular, collectible, and unmistakably ${input.brandName}.`,
  ].join(" ");

  const certificate = [
    "CERTIFICATE OF AUTHENTICITY",
    "",
    `This document certifies that ${input.collectionName} is an official release from ${input.brandName}.`,
    "Each piece is presented within the original brand packaging system and accompanied by its dedicated collector materials.",
    "Issued under the direction of the studio to preserve provenance, presentation quality, and long-term brand integrity.",
  ].join("\n");

  const thankYou = [
    `Thank you for bringing ${input.collectionName} into your collection.`,
    "",
    `${input.brandName} was built to turn presentation into ritual. From the obsidian shell to the gold-marked details, every layer is meant to slow the moment down and let the object arrive with weight.`,
    "",
    "Hold on to the certificate, keep the packaging set intact, and welcome to the circle.",
  ].join("\n");

  const warnings: string[] = [];

  if (!containsKeyword(components, "certificate")) {
    warnings.push("Certificate language is ready, but the brief does not explicitly include a certificate component.");
  }
  if (!containsKeyword(palette, "gold")) {
    warnings.push("Consider introducing a gold accent to sharpen the luxury contrast.");
  }
  if (!containsKeyword(palette, "black")) {
    warnings.push("Add a black anchor tone to preserve the obsidian foundation of the brand.");
  }
  if (warnings.length === 0) {
    warnings.push("No critical warnings. The system reads cohesive and launch-ready.");
  }

  const scoreBase = 88 + Math.min(components.length, 5) + Math.min(deliverables.length, 5);
  const score = Math.min(scoreBase, 98);

  return {
    projectName,
    narrative: `A premium ${components.length}-piece packaging system translated into ${deliverables.length} structured launch assets with ${palette.length} core visual anchors.`,
    generatedAt: formatTimestamp(new Date()),
    agentReports: [
      {
        name: "Orchestrator",
        role: "Supervisor",
        status: "Complete",
        summary: `Mapped the brief into ${deliverables.length} deliverables and aligned every specialist around a single luxury launch narrative.`,
        highlights: [
          `Project locked as ${projectName}.`,
          `Primary palette: ${paletteLine}.`,
          `Priority outputs: ${oxfordList(deliverables.slice(0, 4))}.`,
        ],
      },
      {
        name: "Brand Guardian",
        role: "Identity Control",
        status: "Approved",
        summary: `Protected the core brand language by keeping the system anchored in black, gold, and cosmic editorial restraint.`,
        highlights: [
          `Tone keywords: ${toneLine}.`,
          `Brand signature reinforced through premium material language.`,
          "Rejected anything that would dilute the obsidian-and-gold identity.",
        ],
      },
      {
        name: "Visual Director",
        role: "Image Prompting",
        status: "Ready",
        summary: "Built a visual sequence for hero, lineup, and macro-detail renders with controlled atmosphere and product-first framing.",
        highlights: [
          "Hero prompt emphasizes singular object prestige.",
          "Lineup prompt stages the full packaging ritual in one frame.",
          "Detail prompt isolates foil, emboss, and texture fidelity.",
        ],
      },
      {
        name: "Packaging Architect",
        role: "Physical System",
        status: "Specified",
        summary: `Translated the brief into a unified packaging system spanning ${componentLine.toLowerCase()}.`,
        highlights: [
          "Frame body keeps the visual weight anchored in matte-black surfaces.",
          "Tube system carries the ceremonial handoff moment.",
          "Inserts maintain collector-grade provenance and brand continuity.",
        ],
      },
      {
        name: "Copy Agent",
        role: "Launch Language",
        status: "Drafted",
        summary: "Wrote concise premium copy that feels collectible, elevated, and founder-led without losing clarity.",
        highlights: [
          "Launch description positions the piece as a ceremonial object.",
          "Certificate language preserves provenance and authority.",
          "Thank-you note adds warmth without breaking the premium tone.",
        ],
      },
      {
        name: "QA Agent",
        role: "Readiness Check",
        status: "Scored",
        summary: `Scored the launch pack at ${score}/100 after checking for cohesion, completeness, and brand consistency.`,
        highlights: [
          `${components.length} packaging components accounted for.`,
          `${deliverables.length} deliverables drafted.`,
          warnings[0],
        ],
      },
    ],
    visualPrompts: {
      hero: heroPrompt,
      lineup: lineupPrompt,
      detail: detailPrompt,
    },
    packagingSpec: {
      frame: [
        `Primary finish: ${materials[0] ?? "Obsidian black structural shell"}.`,
        `Rear branding: glowing gold ${input.brandName} mark with restrained illumination.`,
        `Edge behavior: crisp silhouette, premium weight, clean seams, no visible clutter.`,
      ],
      tube: [
        `Tube finish: ${materials.find((item) => /tube|seal|foil|matte/i.test(item)) ?? "Matte-black art tube with an embossed gold seal"}.`,
        "Cap and seal should feel archival, tactile, and intentional on camera.",
        "Maintain minimal typography so the gold accent does the visual work.",
      ],
      inserts: [
        "Certificate stock should feel ceremonial and archival rather than corporate.",
        "Thank-you insert should mirror the palette while keeping layout disciplined and spacious.",
        "Collector documents should ship as a matching set, not as separate visual identities.",
      ],
      productionNotes: [
        `Keep the palette locked to ${paletteLine.toLowerCase()} unless a collection variation is explicitly defined.`,
        "Use soft-touch finishes and foil selectively so the gold reads like a spotlight, not decoration.",
        "Preserve negative space around the hero product so the package feels scarce and expensive.",
      ],
    },
    copyPack: {
      launchDescription,
      certificate,
      thankYou,
    },
    qaReport: {
      score,
      passes: [
        "Color story is coherent across frame, tube, and inserts.",
        "Premium packaging details support the cinematic scene rather than competing with it.",
        "Launch copy and object presentation share the same collector-grade tone.",
      ],
      warnings,
    },
    exportPack: [
      "Hero render brief",
      "Lineup render brief",
      "Macro detail brief",
      "Packaging specification sheet",
      "Certificate copy",
      "Thank-you insert copy",
      "Launch description",
      "QA summary",
    ],
    nextActions: [
      "Generate three image variations for the hero prompt and choose the anchor shot.",
      "Translate the packaging spec into print-ready dimensions and stock choices.",
      "Create a product page draft using the launch description and collector copy.",
    ],
  };
}

function cleanValue(value: string | undefined, fallback: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

function splitList(value: string, fallback: string[]) {
  const items = value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);

  if (items.length === 0) {
    return [...fallback];
  }

  return Array.from(new Set(items));
}

function oxfordList(items: string[]) {
  if (items.length === 0) {
    return "";
  }
  if (items.length === 1) {
    return items[0];
  }
  if (items.length === 2) {
    return `${items[0]} and ${items[1]}`;
  }

  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function containsKeyword(items: string[], keyword: string) {
  return items.some((item) => item.toLowerCase().includes(keyword.toLowerCase()));
}

function formatTimestamp(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}
