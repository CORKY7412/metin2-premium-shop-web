import type { TombolaTier } from "../models/TombolaItem";

export interface TierDescription {
  tier: TombolaTier;
  name: string;
  cost: number;
  description: string;
  color: string;
  borderColor: string;
}

export const TOMBOLA_TIERS: TierDescription[] = [
  {
    tier: 1,
    name: "Bronze",
    cost: 1,
    description: "Sichere Gewinne, niedrige Chancen auf DR-Gutschein",
    color: "from-[#cd7f32] to-[#8b5a00]",
    borderColor: "border-[#cd7f32]",
  },
  {
    tier: 2,
    name: "Silber",
    cost: 2,
    description: "Moderate Gewinnchancen, höheres Risiko",
    color: "from-[#c0c0c0] to-[#808080]",
    borderColor: "border-[#c0c0c0]",
  },
  {
    tier: 3,
    name: "Gold",
    cost: 3,
    description: "Beste Items möglich, höchstes Risiko!",
    color: "from-[#ffd700] to-[#daa520]",
    borderColor: "border-[#ffd700]",
  },
];

export const TOMBOLA_INFO_TEXT = {
  title: "Spielmechanik",
  rules: [
    {
      tier: "Bronze-Stufe",
      description: "Niedrige Gewinnchancen, aber sicher. Ideal für garantierte Belohnungen!",
    },
    {
      tier: "Silber-Stufe",
      description: "Moderate Chancen auf bessere Items, aber auch höheres Risiko auf Nieten.",
    },
    {
      tier: "Gold-Stufe",
      description: "Die besten Items warten auf dich - aber auch die meisten Straffelder!",
    },
  ],
  penaltyWarning: "Rote Felder bedeuten keine Belohnung!",
  dailyTicketsInfo: "Du erhältst täglich 3 neue Tickets!",
};
