import { Button } from "../../../common/Button";
import type { TombolaReward } from "../../../../models/TombolaItem";
import { TombolaItemDisplay } from "./TombolaItemDisplay";

interface TombolaControlsProps {

  ticketCost: number;
  isSpinning: boolean;
  canSpin: boolean;
  onSpin: () => void;
  lastReward: TombolaReward | null;
  showReward: boolean;
}

export const TombolaControls = ({
  ticketCost,
  isSpinning,
  canSpin,
  onSpin,
  lastReward,
  showReward,
}: TombolaControlsProps) => {
  return (
    <>
      <div className="tombola-controls">
        <Button
          title={isSpinning ? "Dreht..." : `Drehen (${ticketCost} Ticket${ticketCost > 1 ? "s" : ""})`}
          onClick={onSpin}
          className={`base-green-btn tombola-spin-btn ${!canSpin ? "opacity-50 cursor-not-allowed" : ""}`}
        />
      </div>

      {lastReward && !showReward && (
        <div className="tombola-last-reward">
          <div className="text-sm text-[#f2e69f]">Letztes Ergebnis:</div>
          <div className="flex items-center gap-2 mt-1">
            <TombolaItemDisplay item={lastReward.item} size="small" showName={true} />
          </div>
        </div>
      )}
    </>
  );
};
