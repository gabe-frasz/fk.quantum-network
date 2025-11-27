import { useState } from "react";

import { getRandomFilter } from "../utils/get-random-filter";

export const TOTAL_BITS = 7;
export const ANIMATION_DURATION_MS = 1600;

function getRandomFilterSequence(length: number) {
  return Array.from({ length }, () => getRandomFilter());
}

export function useSpy() {
  const [aliceFilters, setAliceFilters] = useState(getRandomFilterSequence(TOTAL_BITS));
  const [evaFilters, setEvaFilters] = useState(getRandomFilterSequence(TOTAL_BITS));
  const [errorRate, setErrorRate] = useState(0);
  const [showResults, setShowResults] = useState(false);

  function toggleFilter(index: number) {
    evaFilters[index] = evaFilters[index] === "X" ? "+" : "X";
    setEvaFilters([...evaFilters]);
  }

  function handleTest() {
    if (showResults) return resetTest();
    setShowResults(true);

    for (let i = 1; i <= TOTAL_BITS; i++) {
      const errorsQuantity = aliceFilters.slice(0, i).reduce(
        (acc, curr, i) => curr !== evaFilters[i] ? ++acc : acc,
        0
      );

      setTimeout(() => {
        setErrorRate(Math.round((errorsQuantity / i) * 100));
      }, ANIMATION_DURATION_MS * i - 800);
    }
  }

  function resetTest() {
    setAliceFilters(getRandomFilterSequence(TOTAL_BITS));
    setErrorRate(0);
    setShowResults(false);
  }

  return {
    aliceFilters,
    evaFilters,
    errorRate,
    showResults,
    toggleFilter,
    handleTest,
  };
}
