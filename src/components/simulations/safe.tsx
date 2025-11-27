import { useSafe } from "../../hooks/use-safe.ts";
import { SimulationContainer } from "./container.tsx";

export function SafeSimulation() {
  const {
    password,
    safePassword,
    isQuantumModeActive,
    isSafeOpen,
    triesLeft,
    handlePasswordChange,
    resetPassword,
    handleSubmit,
    toggleQuantumMode,
  } = useSafe();

  return (
    <SimulationContainer>
      {/* Safe */}
      <div className="relative w-full max-w-96 h-64 mb-4 p-4 bg-stone-600 border border-stone-800 rounded">

        {/* Safe lid */}
        <div className={`absolute top-4 left-4 bottom-4 right-4 p-4 flex justify-around items-center bg-stone-500 border border-stone-800 rounded origin-left transition-transform delay-300 duration-500 z-30 ${isSafeOpen ? "-rotate-y-20" : ""}`}>
          <SafePanel
            password={password}
            safePassword={safePassword}
            isQuantumModeActive={isQuantumModeActive}
            onDigitKeyPress={handlePasswordChange}
            onReset={resetPassword}
            onSubmit={handleSubmit}
          />

          {/* Safe lid handle */}
          <div className={`relative w-16 h-16 p-1 bg-stone-600 rounded-full transition-transorm duration-300 ${isSafeOpen ? "rotate-90" : ""}`}>
            <div className="w-full h-full bg-stone-500 border border-stone-700 rounded-full"/>

            <div className="absolute top-0.5 left-1/2 bottom-0.5 -translate-x-1/2 w-2 bg-stone-500 border-2 border-stone-700 rounded-full"/>
          </div>
        </div>

        {/* Safe lid pins */}
        <div className="absolute top-4 left-4 bottom-4 w-1 py-8 flex flex-col justify-between z-40">
          {
            Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="relative w-1 h-6 bg-stone-400 rounded-full">
                <div className="absolute top-1 w-full h-px bg-stone-800"/>
                <div className="absolute bottom-1 w-full h-px bg-stone-800"/>
              </div>
            ))
          }
        </div>

        {/* Inside of the safe*/}
        <div className="absolute top-4 left-4 bottom-4 right-4 bg-stone-950 rounded z-10"/>
      </div>

      <button
        disabled={triesLeft > 0}
        onClick={toggleQuantumMode}
        className="px-4 py-2 text-black bg-white rounded-full cursor-pointer transition-all gradient-border hover:text-white hover:scale-105 active:scale-95 disabled:hover:text-black disabled:hover:scale-100 disabled:opacity-50 disabled:active:scale-100 disabled:cursor-default"
      >
        Modo Quântico
      </button>
    </SimulationContainer>
  );
}

interface SafePanelProps {
  password: string;
  safePassword: string;
  isQuantumModeActive: boolean;
  onDigitKeyPress: (digit: string) => void;
  onReset: () => void;
  onSubmit: () => void;
}

function SafePanel(props: SafePanelProps) {
  const { password, safePassword, isQuantumModeActive } = props
  const { onDigitKeyPress, onReset, onSubmit } = props;

  function getDigitKeyClass(digit: number) {
    let className = "w-full h-full text-xs text-black bg-stone-500 transition-all active:translate-x-px active:translate-y-px"

    if (!isQuantumModeActive) return className;

    const isSafeDigit = safePassword.includes(digit.toString());
    if (isSafeDigit) return className += " bg-emerald-700 text-white";

    return className += " opacity-25";
  }

  return (
    <div className="w-20 p-1 bg-stone-400 border-2 border-stone-300 rounded">
      <div className="w-full h-5 mb-1 pl-2 text-emerald-950 tracking-[.4rem] font-safe-code bg-emerald-700">
        {password}
      </div>

      <div className="grid grid-cols-3 gap-1">
        {
          Array.from({ length: 9 }).map((_, i) => (
            <button
              key={i}
              onClick={() => onDigitKeyPress((i + 1).toString())}
              className={getDigitKeyClass(i + 1)}
            >
              {i + 1}
            </button>
          ))
        }

        <button
          onClick={onReset}
          className="w-full h-full bg-rose-800 transition-transform active:translate-x-px active:translate-y-px"
        />

        <button onClick={() => onDigitKeyPress("0")} className={getDigitKeyClass(0)}>0</button>

        <button
          onClick={onSubmit}
          className="w-full h-full bg-emerald-700 transition-transform active:translate-x-px active:translate-y-px"
        />
      </div>
    </div>
  );
}
