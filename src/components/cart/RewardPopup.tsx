import { Button } from "../common/Button";
import { RewardItem } from "./RewardItem";
import type { PurchaseReward } from "../../models/Cart";

interface RewardPopupProps {
  rewards: PurchaseReward[];
  onClose: () => void;
}

export const RewardPopup = ({ rewards, onClose }: RewardPopupProps) => {
  return (
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-[url('/images/item_bg.jpg')] border-3 border-[#e8a314] max-w-md w-full p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-linear-to-br from-[#e8a314] to-[#f2e69f] p-4 mb-4 -m-6 mb-4">
          <h3 className="text-2xl font-bold text-[#3c1e16] text-center">
            Kauf erfolgreich!
          </h3>
        </div>

        <div className="space-y-3 mb-6">
          <h4 className="text-[#e8a314] font-bold text-lg mb-3">
            Deine Belohnungen:
          </h4>
          {rewards.map((reward, index) => (
            <RewardItem key={index} reward={reward} />
          ))}
        </div>

        <Button
          title="Großartig!"
          onClick={onClose}
          className="base-green-btn w-full"
        />
      </div>
    </div>
  );
};
