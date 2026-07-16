export const SECTORS = [
  "Profession libérale",
  "Hôtellerie-Restauration",
  "Commerce/E-commerce",
  "Services aux entreprises",
  "Immobilier",
  "Santé",
  "Autre",
] as const;

export type Sector = (typeof SECTORS)[number];
