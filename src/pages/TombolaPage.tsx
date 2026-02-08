import { useState } from "react";
import { Tombola } from "../components/common/Tombola/Tombola";
import { tombolaTier1Items, tombolaTier2Items, tombolaTier3Items } from "../testing/TombolaItemMocking";
import type { TombolaReward, TombolaTier } from "../models/TombolaItem";
import { Header } from "../components/pages/ShopPage/Header";
import { Navigation } from "../components/common/Navigation/Navigation";
import { useUser } from "../context/UserContext";

export const TombolaPage = () => {
  const { tombolaTickets, removeTombolaTickets } = useUser();
  const [selectedTier, setSelectedTier] = useState<TombolaTier>(2);

  const getTierItems = () => {
    switch (selectedTier) {
      case 1: return tombolaTier1Items;
      case 2: return tombolaTier2Items;
      case 3: return tombolaTier3Items;
    }
  };

  const handleSpin = (reward: TombolaReward) => {
    removeTombolaTickets(selectedTier);

    if (reward.item.isPenalty) {
      console.log("Strafe:", reward.item.penaltyText);
    } else {
      console.log("Gewonnen:", reward.item.shopItem?.name);
    }
  };

  const tierDescriptions = [
    {
      tier: 1,
      name: "Bronze",
      cost: 1,
      description: "Sichere Gewinne, niedrige Chancen auf DR-Gutschein",
      color: "from-[#cd7f32] to-[#8b5a00]",
      borderColor: "border-[#cd7f32]"
    },
    {
      tier: 2,
      name: "Silber",
      cost: 2,
      description: "Moderate Gewinnchancen, höheres Risiko",
      color: "from-[#c0c0c0] to-[#808080]",
      borderColor: "border-[#c0c0c0]"
    },
    {
      tier: 3,
      name: "Gold",
      cost: 3,
      description: "Beste Items möglich, höchstes Risiko!",
      color: "from-[#ffd700] to-[#daa520]",
      borderColor: "border-[#ffd700]"
    }
  ];

  return (
    <div className="metin-container page-image mx-auto">
      <Header />

      <div className="px-3 sm:px-4 md:px-5">
        <div className="mt-2">
          <Navigation activeTab="tombola" />
        </div>

        <div className="mt-3 sm:mt-4 md:mt-5 pb-5">
          <h2 className="item-sample text-[#f2e69f] border-[#E8A314] mb-3 sm:mb-4 border-b text-lg sm:text-xl md:text-2xl">
            Tombola
          </h2>

          <div className="bg-[rgba(0,0,0,0.3)] p-3 sm:p-4 mb-4 sm:mb-5 border-2 border-[#e8a314] text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <i className="fa-solid fa-ticket text-[#e8a314] text-xl sm:text-2xl"></i>
              <span className="text-[#f2e69f] text-lg sm:text-xl font-bold">
                Verfügbare Tickets: {tombolaTickets}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#f2e69f]">
              Du erhältst täglich 3 neue Tickets!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-5">
            {tierDescriptions.map(({ tier, name, cost, description, color, borderColor }) => (
              <button
                key={tier}
                onClick={() => setSelectedTier(tier as TombolaTier)}
                className={`p-3 sm:p-4 border-2 transition-all ${borderColor} ${
                  selectedTier === tier
                    ? `bg-linear-to-br ${color} shadow-lg scale-105`
                    : 'bg-[rgba(0,0,0,0.3)] hover:bg-[rgba(0,0,0,0.4)]'
                }`}
              >
                <h3 className={`text-base sm:text-lg font-bold mb-2 ${
                  selectedTier === tier ? 'text-[#3c1e16]' : 'text-[#f2e69f]'
                }`}>
                  {name}-Stufe
                </h3>
                <div className={`text-xs sm:text-sm mb-2 ${
                  selectedTier === tier ? 'text-[#3c1e16]' : 'text-[#f2e69f]'
                }`}>
                  <i className="fa-solid fa-ticket mr-1"></i>
                  Kosten: {cost} Ticket{cost > 1 ? 's' : ''}
                </div>
                <p className={`text-xs ${
                  selectedTier === tier ? 'text-[#3c1e16]' : 'text-[#f2e69f]'
                }`}>
                  {description}
                </p>
              </button>
            ))}
          </div>

          <Tombola
            items={getTierItems()}
            ticketCost={selectedTier}
            onSpin={handleSpin}
            availableTickets={tombolaTickets}
          />

          <div className="mt-4 sm:mt-5 p-3 sm:p-4 bg-[rgba(0,0,0,0.2)] border border-[#662d12]">
            <h3 className="text-[#e8a314] text-sm sm:text-base mb-2 font-bold">
              <i className="fa-solid fa-circle-info mr-2"></i>
              Spielmechanik
            </h3>
            <ul className="text-xs sm:text-sm text-[#f2e69f] space-y-1">
              <li><strong className="text-[#e8a314]">Bronze-Stufe:</strong> Niedrige Gewinnchancen, aber sicher. Ideal für garantierte Belohnungen!</li>
              <li><strong className="text-[#e8a314]">Silber-Stufe:</strong> Moderate Chancen auf bessere Items, aber auch höheres Risiko auf Nieten.</li>
              <li><strong className="text-[#e8a314]">Gold-Stufe:</strong> Die besten Items warten auf dich - aber auch die meisten Straffelder!</li>
              <li className="text-red-400"><i className="fa-solid fa-skull-crossbones mr-1"></i> Rote Felder bedeuten keine Belohnung!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
