import { Button } from "../../../common/Button";
import type { TombolaReward } from "../../../../models/TombolaItem";
import { TombolaItemDisplay } from "./TombolaItemDisplay";

interface TombolaRewardPopupProps {
  reward: TombolaReward;
  isVisible: boolean;
  onClose: () => void;
}

export const TombolaRewardPopup = ({ reward, isVisible, onClose }: TombolaRewardPopupProps) => {
  if (!isVisible) return null;

  const isPenalty = reward.item.isPenalty;

  return (
    <div className="tombola-reward-overlay" onClick={onClose}>
      <div
        className={`tombola-reward-popup ${isPenalty ? "tombola-reward-popup-penalty" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="tombola-reward-header">
          <h3>{isPenalty ? "Schade!" : "Glückwunsch!"}</h3>
        </div>

        <div className="tombola-reward-content">
          <TombolaItemDisplay item={reward.item} size="large" showName={false} />

          <div className={`tombola-reward-name ${isPenalty ? "text-red-600" : ""}`}>
            {isPenalty ? reward.item.penaltyText : reward.item.shopItem!.name}
          </div>

          <div className="tombola-reward-description">
            {isPenalty
              ? "Diesmal leider kein Gewinn. Versuch es nochmal!"
              : "Du hast dieses Item gewonnen!"}
          </div>
        </div>

        <div className="tombola-reward-actions">
          <Button title="OK" onClick={onClose} className="base-green-btn w-full" />
        </div>
      </div>
    </div>
  );
};
