import type { CVProps } from "../content/config";

export const getLanguageSkills = (t: CVProps) => [
  { name: t.portuguese, percentage: 100 },
  { name: t.english, percentage: 100 },
  { name: t.german, percentage: 90 },
  { name: t.spanish, percentage: 90 },
];
