import { useState, useEffect } from "react";
import type { TombolaItem } from "../../../../models/TombolaItem";
import { shuffleArray } from "../utils/tombolaHelpers";

/**
 * Hook to manage tombola items shuffling and tracking.
 *
 * @param items - The original items array
 * @returns Shuffled items and hasSpun state
 */
export const useTombolaItems = (items: TombolaItem[]) => {
  const [shuffledItems, setShuffledItems] = useState<TombolaItem[]>([]);
  const [hasSpun, setHasSpun] = useState(false);

  useEffect(() => {
    setShuffledItems(shuffleArray(items));
    setHasSpun(false);
  }, [items]);

  return {
    shuffledItems,
    hasSpun,
    setHasSpun,
  };
};
