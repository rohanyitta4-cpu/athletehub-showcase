/** Project metadata for the engineering showcase. */

export const SITE = {
  product: "AthleteHub",
  designer: "Rohan",
  contact: "athletehubdev@gmail.com",
  github: "https://github.com/rohanyitta4-cpu/AthleteHub-Demo",
} as const;

export const NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "System" },
  { id: "trace", label: "Trace" },
  { id: "frontend", label: "App" },
  { id: "data", label: "Data" },
  { id: "code", label: "Code" },
] as const;
