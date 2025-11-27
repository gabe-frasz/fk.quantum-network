import { useEffect, useState } from "react";

import { generateSafePassword } from "../utils/generate-safe-password.ts";

export function useSafe() {
  const [password, setPassword] = useState("");
  const [safePassword, setSafePassword] = useState("");
  const [isQuantumModeActive, setIsQuantumModeActive] = useState(false);
  const [isSafeOpen, setIsSafeOpen] = useState(false);
  const [triesLeft, setTriesLeft] = useState(1);

  useEffect(() => {
    setSafePassword(generateSafePassword());
  }, []);

  function handlePasswordChange(newDigit: string) {
    if (isSafeOpen) return;
    setPassword(prev => prev.length < 4 ? prev + newDigit : prev);
  }

  function resetPassword() {
    setPassword("");
  }

  function handleSubmit() {
    if (isSafeOpen) return;

    setTriesLeft(prev => prev - 1 > 0 ? prev - 1 : 0);

    const safePasswordArr = safePassword.split("");
    const passwordArr = password.split("");

    for (const digit of passwordArr) {
      const safeDigitIndex = safePasswordArr.findIndex(safeDigit => safeDigit === digit);
      if (safeDigitIndex === -1) return setPassword("FAIL");

      safePasswordArr.splice(safeDigitIndex, 1);
    }

    if (safePasswordArr.length !== 0) return setPassword("FAIL");

    setPassword("");
    setIsSafeOpen(true);
  }

  function toggleQuantumMode() {
    if (triesLeft > 0) return;
    setIsQuantumModeActive(prev => !prev);
  }

  return {
    password,
    safePassword,
    isQuantumModeActive,
    isSafeOpen,
    triesLeft,
    handlePasswordChange,
    resetPassword,
    handleSubmit,
    toggleQuantumMode,
  }
}
