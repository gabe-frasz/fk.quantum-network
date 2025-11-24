import { SimulationContainer } from "./container";
import { useCoin } from "../../hooks/use-coin.ts";

export function SpinningCoinSimulation() {
  const {
    coinSide,
    isCoinSpinning,
    toggleCoinSpinning,
    isMeasureButtonDisabled,
    rotation,
  } = useCoin();

  return (
    <SimulationContainer>
      <h3 className="w-full mb-8 text-center text-lg text-stone-900 font-bold">
        Valor: {coinSide}
      </h3>

      <div className="perspective-[15000px]">
        <div
          className={`relative w-16 h-16 mb-8 transform-3d rounded-full transition-transform ease-out duration-3000 ${isCoinSpinning ? "animate-y-spin" : ""}`}
          style={{
            transform: isCoinSpinning ? "rotateY(0deg)" : `rotateY(${rotation}deg)`,
          }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[url(/images/coin-face-side.png)] bg-contain rounded-full backface-hidden" />
          <div className="absolute top-0 left-0 w-full h-full bg-[url(/images/coin-crown-side.png)] bg-contain rounded-full rotate-y-180 backface-hidden" />
        </div>
      </div>

      <button
        disabled={isMeasureButtonDisabled}
        onClick={toggleCoinSpinning}
        className="px-4 py-1 text-white font-bold bg-black rounded-full transition-transform hover:cursor-pointer active:scale-95 disabled:opacity-50 hover:disabled:cursor-default active:disabled:scale-100"
      >
        {isCoinSpinning ? "Medir" : "Girar novamente"}
      </button>
    </SimulationContainer>
  );
}
