import { useState } from "react";

import { getRandomBit } from "../utils/get-random-bit";

export function useFilter() {
	const [aliceValue, setAliceValue] = useState(getRandomBit());
	const [betoValue, setBetoValue] = useState<number | null>(null);
	const [aliceFilter, setAliceFilter] = useState<"X" | "+">(
		getRandomBit() === 0 ? "X" : "+",
	);
	const [betoFilter, setBetoFilter] = useState<"X" | "+">("+");
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
			setAliceFilter(getRandomBit() === 0 ? "X" : "+");
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
