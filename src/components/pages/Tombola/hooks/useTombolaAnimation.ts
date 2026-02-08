import { useState, useEffect, useCallback } from "react";
import type { TombolaItem, TombolaReward } from "../../../../models/TombolaItem";
import { selectRandomItem, findShuffledIndex } from "../utils/tombolaHelpers";
import { TOMBOLA_ANIMATION } from "../constants/tombolaAnimationConstants";

interface UseTombolaAnimationProps {
  items: TombolaItem[];
  shuffledItems: TombolaItem[];
  hasSpun: boolean;
  onSpinComplete?: (reward: TombolaReward) => void;
}

/**
 * Hook to manage tombola spinning animation and selection logic.
 *
 * Handles:
 * - Idle rotation when not spinning
 * - Spin animation with random selection
 * - Reward popup display
 *
 * @param props - Configuration for the animation
 * @returns Animation state and control functions
 */
export const useTombolaAnimation = ({
  items,
  shuffledItems,
  hasSpun,
  onSpinComplete,
}: UseTombolaAnimationProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lastReward, setLastReward] = useState<TombolaReward | null>(null);
  const [showReward, setShowReward] = useState(false);

  // Idle rotation effect
  useEffect(() => {
    if (hasSpun || isSpinning || shuffledItems.length === 0) return;

    const idleInterval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % shuffledItems.length);
    }, TOMBOLA_ANIMATION.IDLE_ROTATION_INTERVAL);

    return () => clearInterval(idleInterval);
  }, [hasSpun, isSpinning, shuffledItems.length]);

  /**
   * Starts the spin animation and selects a random item.
   */
  const startSpin = useCallback(() => {
    if (isSpinning || shuffledItems.length === 0) return;

    setIsSpinning(true);
    setShowReward(false);

    const selectedItem = selectRandomItem(items);
    const targetIndex = findShuffledIndex(shuffledItems, selectedItem);
    const totalSteps =
      TOMBOLA_ANIMATION.SPINS_BEFORE_STOP * shuffledItems.length + targetIndex;
    let currentStep = 0;

    const spinInterval = setInterval(() => {
      currentStep++;
      setSelectedIndex(currentStep % shuffledItems.length);

      if (currentStep >= totalSteps) {
        clearInterval(spinInterval);

        setTimeout(() => {
          const reward: TombolaReward = {
            item: selectedItem,
            timestamp: new Date(),
          };

          setLastReward(reward);
          setShowReward(true);
          setIsSpinning(false);

          if (onSpinComplete) {
            onSpinComplete(reward);
          }
        }, TOMBOLA_ANIMATION.REWARD_POPUP_DELAY);
      }
    }, TOMBOLA_ANIMATION.STEP_DURATION);
  }, [isSpinning, shuffledItems, items, onSpinComplete]);

  const closeRewardPopup = useCallback(() => {
    setShowReward(false);
  }, []);

  return {
    isSpinning,
    selectedIndex,
    lastReward,
    showReward,
    startSpin,
    closeRewardPopup,
  };
};
