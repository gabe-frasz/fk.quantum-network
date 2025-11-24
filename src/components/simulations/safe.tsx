import { useEffect, useState } from "react";

import { generateSafePassword } from "../../utils/generate-safe-password.ts";

export function SafeSimulation() {
  const [password, setPassword] = useState("");
  const [safePassword, setSafePassword] = useState("");
  const [isQuantumModeActive, setIsQuantumModeActive] = useState(false);
  const [isSafeOpen, setIsSafeOpen] = useState(false);
  const [triesLeft, setTriesLeft] = useState(2);

  useEffect(() => {
    setSafePassword(generateSafePassword());
  }, []);

  function handlePasswordChange(newDigit: string) {
    if (isSafeOpen) return;
    setPassword(prev => prev.length < 4 ? prev + newDigit : prev);
  }

  function handlePasswordReset() {
    setPassword("");
  }

  function handleSubmit() {
    setTriesLeft(prev => prev - 1 > 0 ? prev - 1 : 0);

    const safePasswordArr = safePassword.split("");
    const passwordArr = password.split("");

    for (const digit of passwordArr) {
      const safeDigitIndex = safePasswordArr.findIndex(safeDigit => safeDigit === digit);
      if (safeDigitIndex === -1) return;

      safePasswordArr.splice(safeDigitIndex, 1);
    }

    if (safePasswordArr.length !== 0) return;

    setPassword("");
    setIsSafeOpen(true);
  }

  return (
    <div className="w-full mt-8 mb-12 p-4 flex flex-col justify-center items-center border border-stone-300 rounded-lg">
      {/* Safe */}
      <div className="relative w-96 h-64 mb-4 p-4 bg-stone-600 border border-stone-800 rounded">

        {/* Safe lid */}
        <div className={`absolute top-4 left-4 bottom-4 right-4 p-4 flex justify-around items-center bg-stone-500 border border-stone-800 rounded origin-left transition-transform delay-300 duration-500 z-30 ${isSafeOpen ? "rotate-y-20" : ""}`}>
          <SafePanel
            password={password}
            safePassword={safePassword}
            isSafeOpen={isSafeOpen}
            isQuantumModeActive={isQuantumModeActive}
            onDigitKeyPress={handlePasswordChange}
            onReset={handlePasswordReset}
            onSubmit={handleSubmit}
          />

          {/* Safe lid handle */}
          <div className={`relative w-16 h-16 p-1 bg-stone-600 rounded-full transition-transorm duration-300 ${isSafeOpen ? "rotate-90" : ""}`}>
            <div className="w-full h-full bg-stone-500 border border-stone-700 rounded-full"></div>

            <div className="absolute top-0.5 left-1/2 bottom-0.5 -translate-x-1/2 w-2 bg-stone-500 border-2 border-stone-700 rounded-full"></div>
          </div>
        </div>

        {/* Safe lid pins */}
        <div className="absolute top-4 left-4 bottom-4 w-1 py-8 flex flex-col justify-between z-40">
          {
            Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="relative w-1 h-6 bg-stone-400 rounded-full">
                <div className="absolute top-1 w-full h-px bg-stone-800"></div>
                <div className="absolute bottom-1 w-full h-px bg-stone-800"></div>
              </div>
            ))
          }
        </div>

        {/* Inside of the safe*/}
        <div className="absolute top-4 left-4 bottom-4 right-4 bg-stone-950 rounded z-10"></div>
      </div>

      <button
        disabled={triesLeft > 0}
        onClick={() => setIsQuantumModeActive(prev => !prev)}
        className="px-4 py-2 text-black bg-white rounded-full cursor-pointer transition-all gradient-border hover:text-white hover:scale-105 active:scale-95 disabled:hover:text-black disabled:hover:scale-100 disabled:opacity-50 disabled:active:scale-100 disabled:cursor-default"
      >
        Modo Quântico
      </button>
    </div>
  );
}

interface SafePanelProps {
  password: string;
  safePassword: string;
  isSafeOpen: boolean;
  isQuantumModeActive: boolean;
  onDigitKeyPress: (digit: string) => void;
  onReset: () => void;
  onSubmit: () => void;
}

function SafePanel(props: SafePanelProps) {
  const { password, safePassword, isSafeOpen, isQuantumModeActive } = props
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
        <div className="w-full h-5 mb-1 pl-2 text-emerald-950 tracking-[.3rem] font-safe-code bg-emerald-700">{password}</div>

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
          ></button>

          <button onClick={() => onDigitKeyPress("0")} className={getDigitKeyClass(0)}>0</button>

          <button
            onClick={onSubmit}
            className="w-full h-full bg-emerald-700 transition-transform active:translate-x-px active:translate-y-px"
          ></button>
        </div>
      </div>
    );
  }
