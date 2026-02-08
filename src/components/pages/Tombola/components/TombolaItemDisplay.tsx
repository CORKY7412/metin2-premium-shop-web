import type { TombolaItem } from "../../../../models/TombolaItem";

interface TombolaItemDisplayProps {
  item: TombolaItem;
  size?: "small" | "medium" | "large";
  showName?: boolean;
}

export const TombolaItemDisplay = ({
  item,
  size = "medium",
  showName = true,
}: TombolaItemDisplayProps) => {
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-24 h-24",
  };

  const iconSizes = {
    small: "text-xl",
    medium: "text-2xl",
    large: "text-6xl",
  };

  if (item.isPenalty) {
    return (
      <>
        <div className={`tombola-penalty-icon ${size === "large" ? "tombola-penalty-icon-large" : ""}`}>
          <i className={`fa-solid fa-skull-crossbones ${iconSizes[size]}`} aria-hidden="true"></i>
        </div>
        {showName && (
          <span className={`font-bold ${size === "large" ? "text-red-600" : "text-[#f2e69f]"}`}>
            {item.penaltyText}
          </span>
        )}
      </>
    );
  }

  return (
    <>
      <img
        src={`/images/items/${item.shopItem!.imageName}.png`}
        alt={item.shopItem!.name}
        className={`${sizeClasses[size]} m-auto`}
      />
      {showName && (
        <span className="font-bold text-[#f2e69f]">{item.shopItem!.name}</span>
      )}
    </>
  );
};
