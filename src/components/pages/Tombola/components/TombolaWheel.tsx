import type { TombolaItem } from "../../../../models/TombolaItem";
import { TombolaSlot } from "./TombolaSlot";

interface TombolaWheelProps {
  items: TombolaItem[];
  allItems: TombolaItem[];
  selectedIndex: number;
  isSpinning: boolean;
}

export const TombolaWheel = ({ items, allItems, selectedIndex, isSpinning }: TombolaWheelProps) => {
  return (
    <div className="tombola-wheel">
      <div className="tombola-items">
        {items.map((item, index) => (
          <TombolaSlot
            key={index}
            item={item}
            allItems={allItems}
            isActive={selectedIndex === index}
            isSpinning={isSpinning}
          />
        ))}
      </div>
    </div>
  );
};
