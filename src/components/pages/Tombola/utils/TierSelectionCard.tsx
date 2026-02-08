import type { TierDescription } from "../../../../constants/tombolaConstants";
import type { TombolaTier } from "../../../../models/TombolaItem";

interface TierSelectionCardProps {
  tier: TierDescription;
  selectedTier: TombolaTier;
  onSelect: (tier: TombolaTier) => void;
}

export const TierSelectionCard = ({ tier, selectedTier, onSelect }: TierSelectionCardProps) => {
  const isSelected = selectedTier === tier.tier;

  return (
    <button
      onClick={() => onSelect(tier.tier)}
      className={`p-3 sm:p-4 border-2 transition-all ${tier.borderColor} ${isSelected
        ? `bg-linear-to-br ${tier.color} shadow-lg scale-105`
        : 'bg-[rgba(0,0,0,0.3)] hover:bg-[rgba(0,0,0,0.4)]'
        }`}
      aria-pressed={isSelected}
      aria-label={`${tier.name}-Stufe auswählen, kostet ${tier.cost} Ticket${tier.cost > 1 ? 's' : ''}`}
    >
      <h3 className={`text-base sm:text-lg font-bold mb-2 ${isSelected ? 'text-[#3c1e16]' : 'text-[#f2e69f]'
        }`}>
        {tier.name}-Stufe
      </h3>
      <div className={`text-xs sm:text-sm mb-2 ${isSelected ? 'text-[#3c1e16]' : 'text-[#f2e69f]'
        }`}>
        <i className="fa-solid fa-ticket mr-1" aria-hidden="true"></i>
        Kosten: {tier.cost} Ticket{tier.cost > 1 ? 's' : ''}
      </div>
      <p className={`text-xs ${isSelected ? 'text-[#3c1e16]' : 'text-[#f2e69f]'
        }`}>
        {tier.description}
      </p>
    </button>
  );
};
