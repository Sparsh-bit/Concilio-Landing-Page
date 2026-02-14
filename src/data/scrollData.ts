// Scroll-driven content model for the cinematic landing page

export const TOTAL_FRAMES = 200;
export const SCROLL_HEIGHT_VH = 500;
export const FRAME_FOLDER = "/frames/";
export const FRAME_PREFIX = "ezgif-frame-";

// Percentage of image height cropped from the bottom.
export const WATERMARK_CROP_PERCENT = 0.055;

export interface HUDPhase {
  id: string;
  startProgress: number;
  endProgress: number;
  headline: string;
  subline: string;
  readouts: string[];
  tag?: string;
  position: "left" | "right" | "center" | "bottom-left" | "bottom-right";
}

export const hudPhases: HUDPhase[] = [
  {
    id: "intro",
    startProgress: 0,
    endProgress: 0.16,
    headline: "Signal\nAcquired",
    subline: "A controlled cinematic sequence begins. Scroll to initiate progression.",
    readouts: ["SEQUENCE ONLINE", "SUBJECT: VEHICLE", "ENVIRONMENT: ACTIVE"],
    tag: "CONCILIO SYSTEM",
    position: "left",
  },
  {
    id: "charge",
    startProgress: 0.16,
    endProgress: 0.35,
    headline: "Core\nCharging",
    subline:
      "Mechanical subsystems lock in. The platform moves from static state to live motion.",
    readouts: ["POWER ROUTING", "TORQUE DISTRIBUTION", "FRAMESET STABILIZED"],
    tag: "PHASE 02",
    position: "right",
  },
  {
    id: "transform",
    startProgress: 0.35,
    endProgress: 0.62,
    headline: "Structural\nShift",
    subline:
      "Visual tension rises as components reconfigure into a higher-order silhouette.",
    readouts: ["ARMATURE DEPLOY", "JOINT MATRIX", "MOTION CLASS: AGGRESSIVE"],
    tag: "PHASE 03",
    position: "left",
  },
  {
    id: "convergence",
    startProgress: 0.62,
    endProgress: 0.82,
    headline: "Form\nConvergence",
    subline:
      "The transformation resolves with disciplined timing, industrial contrast, and clarity.",
    readouts: ["CORE ENGAGED", "TARGET GEOMETRY", "BALANCE: VERIFIED"],
    tag: "PHASE 04",
    position: "right",
  },
  {
    id: "arrival",
    startProgress: 0.82,
    endProgress: 1,
    headline: "Final\nCommand",
    subline:
      "Cinematic transformation direction designed for premium product and brand launches.",
    readouts: ["STATE: HUMANOID", "SYSTEM READY", "MISSION COMPLETE"],
    tag: "PHASE 05",
    position: "center",
  },
];

export const statsData = [
  { value: "200", label: "Rendered Frames", icon: "building" },
  { value: "500vh", label: "Scroll Narrative", icon: "shield" },
  { value: "4K", label: "Retina Ready Canvas", icon: "zap" },
  { value: "60fps", label: "Fluid Perception", icon: "trending-down" },
];

export const solutionsData = [
  {
    title: "Narrative Systems",
    description:
      "Scrollytelling architecture that synchronizes frame, typography, and motion under one timeline.",
    icon: "fuel",
    color: "#F59E0B",
  },
  {
    title: "Interface Direction",
    description:
      "High-contrast HUD overlays designed to guide attention without obstructing the cinematic subject.",
    icon: "graduation-cap",
    color: "#10B981",
  },
  {
    title: "Performance Layer",
    description:
      "Canvas-based frame delivery with high-DPI scaling and efficient drawing for premium visual fidelity.",
    icon: "store",
    color: "#8B5CF6",
  },
  {
    title: "Launch Strategy",
    description:
      "Conversion-aware page architecture that transitions from emotion to credibility to action.",
    icon: "building-2",
    color: "#3B82F6",
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Discovery",
    time: "Phase 01",
    description: "Define audience, message hierarchy, and cinematic intent.",
  },
  {
    number: "02",
    title: "Storyboarding",
    time: "Phase 02",
    description: "Map frame milestones to exact copy, overlay behavior, and pacing.",
  },
  {
    number: "03",
    title: "Build",
    time: "Phase 03",
    description: "Implement canvas rendering, interaction logic, and adaptive layout systems.",
  },
  {
    number: "04",
    title: "Refinement",
    time: "Phase 04",
    description: "Polish motion curves, contrast, and typography for production-level finish.",
  },
];

export const featuresData = [
  {
    title: "Single Scroll Source",
    description: "One master progress signal drives every transition in sync.",
  },
  {
    title: "High-DPI Rendering",
    description: "Device-pixel-ratio scaling keeps frames sharp on modern displays.",
  },
  {
    title: "Cinematic HUD",
    description: "Edge-aligned copy with disciplined motion and low visual noise.",
  },
  {
    title: "Story-Led Layout",
    description: "Hero tension resolves into clear service narrative and proof blocks.",
  },
  {
    title: "Reduced Motion Support",
    description: "Accessible fallback behavior for motion-sensitive users.",
  },
  {
    title: "Premium Dark Theme",
    description: "Industrial palette, controlled accents, and elevated typography.",
  },
];
