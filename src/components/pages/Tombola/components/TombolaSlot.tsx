import type { TombolaItem } from "../../../../models/TombolaItem";
import { calculateChance } from "../utils/tombolaHelpers";

interface TombolaSlotProps {
  item: TombolaItem;
  allItems: TombolaItem[];
  isActive: boolean;
  isSpinning: boolean;
}

export const TombolaSlot = ({ item, allItems, isActive, isSpinning }: TombolaSlotProps) => {
  const className = [
    "tombola-slot",
    item.isPenalty ? "tombola-slot-penalty" : "",
    isActive ? "tombola-slot-active" : "",
    isSpinning ? "tombola-spinning" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className}>
      <div className="tombola-slot-inner">
        {item.isPenalty ? (
          <>
            <div className="tombola-penalty-icon">
              <i className="fa-solid fa-skull-crossbones" aria-hidden="true"></i>
            </div>
            <div className="tombola-item-name">{item.penaltyText}</div>
          </>
        ) : (
          <>
            <div className="tombola-item-image">
              <img
                src={`/images/items/${item.shopItem!.imageName}.png`}
                alt={item.shopItem!.name}
              />
            </div>
            <div className="tombola-item-name">{item.shopItem!.name}</div>
          </>
        )}
        <div className="tombola-item-chance">{calculateChance(item, allItems)}%</div>
      </div>
    </div>
  );
};
