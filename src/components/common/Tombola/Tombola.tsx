import { useState, useEffect } from 'react';
import type { TombolaItem, TombolaReward } from '../../../models/TombolaItem';
import { Button } from '../Button';
import './Tombola.css';

interface TombolaProps {
  items: TombolaItem[];
  ticketCost: number;
  onSpin?: (reward: TombolaReward) => void;
  disabled?: boolean;
  availableTickets: number;
}

export const Tombola = ({ items, ticketCost, onSpin, disabled = false, availableTickets }: TombolaProps) => {
  const [shuffledItems, setShuffledItems] = useState<TombolaItem[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lastReward, setLastReward] = useState<TombolaReward | null>(null);
  const [showReward, setShowReward] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  };

  useEffect(() => {
    setShuffledItems(shuffleArray(items));
    setHasSpun(false);
    setSelectedIndex(0);
  }, [items]);

  useEffect(() => {
    if (hasSpun || isSpinning || shuffledItems.length === 0) return;

    const idleInterval = setInterval(() => {
      setSelectedIndex(prev => (prev + 1) % shuffledItems.length);
    }, 1500);

    return () => clearInterval(idleInterval);
  }, [hasSpun, isSpinning, shuffledItems.length]);

  const selectRandomItem = (): TombolaItem => {
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    let random = Math.random() * totalWeight;

    for (let i = 0; i < items.length; i++) {
      random -= items[i].weight;

      if (random <= 0)
        return items[i];
    }

    return items[0];
  };

  const findShuffledIndex = (selectedItem: TombolaItem): number => {
    return shuffledItems.findIndex(item => item === selectedItem);
  };

  const handleSpin = () => {
    if (isSpinning || disabled || availableTickets < ticketCost || shuffledItems.length === 0) return;

    setHasSpun(true);
    setIsSpinning(true);
    setShowReward(false);

    const selectedItem = selectRandomItem();
    const targetIndex = findShuffledIndex(selectedItem);
    const spinsBeforeStop = 3;
    const totalSteps = (spinsBeforeStop * shuffledItems.length) + targetIndex;
    const stepDuration = 80;
    let currentStep = 0;

    const spinInterval = setInterval(() => {
      currentStep++;
      setSelectedIndex(currentStep % shuffledItems.length);

      if (currentStep >= totalSteps) {
        clearInterval(spinInterval);

        setTimeout(() => {
          const reward: TombolaReward = {
            item: selectedItem,
            timestamp: new Date()
          };
          setLastReward(reward);
          setShowReward(true);
          setIsSpinning(false);

          if (onSpin) {
            onSpin(reward);
          }
        }, 300);
      }
    }, stepDuration);
  };

  const closeRewardPopup = () => {
    setShowReward(false);
  };

  const canSpin = availableTickets >= ticketCost && !disabled && !isSpinning;

  return (
    <div className="tombola-container">
      <div className="tombola-wrapper">
        <div className="tombola-wheel">

          <div className="tombola-items">
            {shuffledItems.map((tombolaItem, index) => (
              <div
                key={index}
                className={`tombola-slot ${tombolaItem.isPenalty ? 'tombola-slot-penalty' : ''} ${selectedIndex === index ? 'tombola-slot-active' : ''} ${isSpinning ? 'tombola-spinning' : ''}`}
              >
                <div className="tombola-slot-inner">
                  {tombolaItem.isPenalty ? (
                    <>
                      <div className="tombola-penalty-icon">
                        <i className="fa-solid fa-skull-crossbones"></i>
                      </div>
                      <div className="tombola-item-name">{tombolaItem.penaltyText}</div>
                    </>
                  ) : (
                    <>
                      <div className="tombola-item-image">
                        <img
                          src={`/images/items/${tombolaItem.shopItem!.imageName}.png`}
                          alt={tombolaItem.shopItem!.name}
                        />
                      </div>
                      <div className="tombola-item-name">{tombolaItem.shopItem!.name}</div>
                    </>
                  )}
                  <div className="tombola-item-chance">
                    {((tombolaItem.weight / shuffledItems.reduce((sum, item) => sum + item.weight, 0)) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="tombola-controls">
          <Button
            title={isSpinning ? "Dreht..." : `Drehen (${ticketCost} Ticket${ticketCost > 1 ? 's' : ''})`}
            onClick={handleSpin}
            className={`base-green-btn tombola-spin-btn ${!canSpin ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
        </div>

        {lastReward && !showReward && (
          <div className="tombola-last-reward">
            <div className="text-sm text-[#f2e69f]">Letztes Ergebnis:</div>
            <div className="flex items-center gap-2 mt-1">
              {lastReward.item.isPenalty ? (
                <>
                  <i className="fa-solid fa-skull-crossbones text-red-600 text-2xl"></i>
                  <span className="font-bold text-[#f2e69f]">{lastReward.item.penaltyText}</span>
                </>
              ) : (
                <>
                  <img
                    src={`/images/items/${lastReward.item.shopItem!.imageName}.png`}
                    alt={lastReward.item.shopItem!.name}
                    className="w-8 h-8"
                  />
                  <span className="font-bold text-[#f2e69f]">{lastReward.item.shopItem!.name}</span>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {showReward && lastReward && (
        <div className="tombola-reward-overlay" onClick={closeRewardPopup}>
          <div className={`tombola-reward-popup ${lastReward.item.isPenalty ? 'tombola-reward-popup-penalty' : ''}`} onClick={(e) => e.stopPropagation()}>
            <div className="tombola-reward-header">
              <h3>{lastReward.item.isPenalty ? 'Schade!' : 'Glückwunsch!'}</h3>
            </div>
            <div className="tombola-reward-content">
              {lastReward.item.isPenalty ? (
                <>
                  <div className="tombola-penalty-icon-large">
                    <i className="fa-solid fa-skull-crossbones"></i>
                  </div>
                  <div className="tombola-reward-name text-red-600">{lastReward.item.penaltyText}</div>
                  <div className="tombola-reward-description">
                    Diesmal leider kein Gewinn. Versuch es nochmal!
                  </div>
                </>
              ) : (
                <>
                  <div className="tombola-reward-image">
                    <img
                      src={`/images/items/${lastReward.item.shopItem!.imageName}.png`}
                      alt={lastReward.item.shopItem!.name}
                    />
                  </div>
                  <div className="tombola-reward-name">{lastReward.item.shopItem!.name}</div>
                  <div className="tombola-reward-description">
                    Du hast dieses Item gewonnen!
                  </div>
                </>
              )}
            </div>
            <div className="tombola-reward-actions">
              <Button
                title="OK"
                onClick={closeRewardPopup}
                className="base-green-btn w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
