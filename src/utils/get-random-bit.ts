import type { Bit } from "../types/bit";

export function getRandomBit(): Bit {
  return Math.floor(Math.random() * 2) as Bit;
}
