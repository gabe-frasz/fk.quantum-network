import { useState } from "react";

function getRandomValue() {
	return Math.floor(Math.random() * 2);
}

export function useFilter() {
	const [aliceValue, setAliceValue] = useState(getRandomValue());
	const [betoValue, setBetoValue] = useState<number | null>(null);
	const [aliceFilter, setAliceFilter] = useState<"X" | "+">(
		getRandomValue() === 0 ? "X" : "+",
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
				setBetoValue(getRandomValue());
			}
		}, 500);

		setTimeout(() => {
			setIsAnimationActive(false);
		}, 4500);

		setTimeout(() => {
			setAliceValue(getRandomValue());
			setBetoValue(null);
			setAliceFilter(getRandomValue() === 0 ? "X" : "+");
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
