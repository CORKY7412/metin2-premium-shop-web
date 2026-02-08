import { useState } from "react";
import { Header } from "../components/pages/ShopPage/Header";
import { Navigation } from "../components/common/Navigation/Navigation";
import { TicketDisplay } from "../components/pages/Tombola/utils/TicketDisplay";
import { TierSelectionCard } from "../components/pages/Tombola/utils/TierSelectionCard";
import { TombolaInfoBox } from "../components/pages/Tombola/utils/TombolaInfoBox";
import { useUser } from "../context/UserContext";
import { getTombolaItemsByTier } from "../utils/tombolaUtils";
import { TOMBOLA_TIERS } from "../constants/tombolaConstants";
import type { TombolaReward, TombolaTier } from "../models/TombolaItem";
import { Tombola } from "../components/pages/Tombola/Tombola";


export const TombolaPage = () => {
  const { tombolaTickets, removeTombolaTickets } = useUser();
  const [selectedTier, setSelectedTier] = useState<TombolaTier>(2);

  const handleSpin = (reward: TombolaReward) => {
    removeTombolaTickets(selectedTier);

    if (reward.item.isPenalty) {
      // TODO: Show penalty notification to user
      console.warn("Penalty received:", reward.item.penaltyText);
    } else {
      // TODO: Add reward to user inventory
      console.log("Reward won:", reward.item.shopItem?.name);
    }
  };

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

          <TicketDisplay ticketCount={tombolaTickets} />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-5">
            {TOMBOLA_TIERS.map((tier) => (
              <TierSelectionCard
                key={tier.tier}
                tier={tier}
                selectedTier={selectedTier}
                onSelect={setSelectedTier}
              />
            ))}
          </div>

          <Tombola
            items={getTombolaItemsByTier(selectedTier)}
            ticketCost={selectedTier}
            onSpin={handleSpin}
            availableTickets={tombolaTickets}
          />

          <TombolaInfoBox />
        </div>
      </div>
    </div>
  );
};
