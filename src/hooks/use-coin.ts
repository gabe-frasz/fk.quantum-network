import { useState } from "react";

export function useCoin() {
  const [isCoinSpinning, setIsCoinSpinning] = useState(true);
  const [coinSide, setCoinSide] = useState<"cara" | "coroa" | "?">("?");
  const [rotation, setRotation] = useState(0);
  const [isMeasureButtonDisabled, setIsMeasureButtonDisabled] = useState(false);

  function toggleCoinSpinning() {
    if (!isCoinSpinning) {
      setCoinSide("?");
      setIsCoinSpinning(true);
      setRotation(0);
      return;
    }

    setIsCoinSpinning(false);
    setIsMeasureButtonDisabled(true);

    const coinSide = Math.floor(Math.random() * 2);

    setTimeout(() => {
      setRotation((5 * 360) + (coinSide * 180));
    }, 50);

    setTimeout(() => {
      setCoinSide(coinSide === 0 ? "cara" : "coroa");
      setIsMeasureButtonDisabled(false);
    }, 2500);
  }

  return {
    coinSide,
    isCoinSpinning,
    toggleCoinSpinning,
    isMeasureButtonDisabled,
    rotation,
  }
}
