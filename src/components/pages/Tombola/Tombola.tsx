import type { TombolaItem, TombolaReward } from "../../../models/TombolaItem";
import { useTombolaItems } from "./hooks/useTombolaItems";
import { useTombolaAnimation } from "./hooks/useTombolaAnimation";
import { TombolaWheel } from "./components/TombolaWheel";
import { TombolaControls } from "./components/TombolaControls";
import { TombolaRewardPopup } from "./components/TombolaRewardPopup";
import "./Tombola.css";

interface TombolaProps {
  items: TombolaItem[];
  ticketCost: number;
  availableTickets: number;
  onSpin?: (reward: TombolaReward) => void;
  disabled?: boolean;
}

export const Tombola = ({
  items,
  ticketCost,
  availableTickets,
  onSpin,
  disabled = false,
}: TombolaProps) => {

  const { shuffledItems, hasSpun, setHasSpun } = useTombolaItems(items);
  const { isSpinning, selectedIndex, lastReward, showReward, startSpin, closeRewardPopup } =
    useTombolaAnimation({
      items,
      shuffledItems,
      hasSpun,
      onSpinComplete: onSpin,
    });

  const handleSpin = () => {
    if (!canSpin) return;
    setHasSpun(true);
    startSpin();
  };

  const canSpin = availableTickets >= ticketCost && !disabled && !isSpinning;

  return (
    <div className="tombola-container">
      <div className="tombola-wrapper">

        <TombolaWheel
          items={shuffledItems}
          allItems={items}
          selectedIndex={selectedIndex}
          isSpinning={isSpinning}
        />

        <TombolaControls
          ticketCost={ticketCost}
          isSpinning={isSpinning}
          canSpin={canSpin}
          onSpin={handleSpin}
          lastReward={lastReward}
          showReward={showReward}
        />
      </div>

      {lastReward && (
        <TombolaRewardPopup
          reward={lastReward}
          isVisible={showReward}
          onClose={closeRewardPopup}
        />
      )}
    </div>
  );
};
