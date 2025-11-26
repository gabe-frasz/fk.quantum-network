import { useState } from "react";

import { getRandomBit } from "../utils/get-random-bit";
import { getRandomFilter } from "../utils/get-random-filter";
import type { Filter } from "../types/filter";

export function useFilter() {
	const [aliceValue, setAliceValue] = useState(getRandomBit());
	const [betoValue, setBetoValue] = useState<number | null>(null);
	const [aliceFilter, setAliceFilter] = useState<Filter>(getRandomFilter());
	const [betoFilter, setBetoFilter] = useState<Filter>(getRandomFilter());
	const [isAnimationActive, setIsAnimationActive] = useState(false);

	function toggleBetoFilter() {
		setBetoFilter((prev) => (prev === "+" ? "X" : "+"));
	}

	function handleTest() {
		setIsAnimationActive(true);

		setTimeout(() => {
			if (aliceFilter === betoFilter) {
				setBetoValue(aliceValue);
			} else {
				setBetoValue(getRandomBit());
			}
		}, 500);

		setTimeout(() => {
			setIsAnimationActive(false);
		}, 4500);

		setTimeout(() => {
			setAliceValue(getRandomBit());
			setBetoValue(null);
			setAliceFilter(getRandomFilter());
		}, 6000);
	}

	return {
		aliceValue,
		betoValue,
		aliceFilter,
		betoFilter,
		isAnimationActive,
		toggleBetoFilter,
		handleTest,
	};
}
