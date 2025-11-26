import type { Filter } from "../types/filter";

export function getRandomFilter(): Filter {
  return Math.floor(Math.random() * 2) === 0 ? "X" : "+";
}
