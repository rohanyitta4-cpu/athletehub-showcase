/** Project metadata for the engineering showcase. */

export const SITE = {
  product: "AthleteHub",
  tagline: "Performance intelligence for every athlete.",
  designer: "Rohan",
  contact: "athletehubdev@gmail.com",
  github: "https://github.com/rohanyitta4-cpu/AthleteHub-Demo",
} as const;

export const NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "System" },
  { id: "frontend", label: "Product" },
  { id: "trace", label: "Request" },
  { id: "data", label: "Data" },
  { id: "code", label: "Code" },
  { id: "roadmap", label: "Roadmap" },
] as const;
