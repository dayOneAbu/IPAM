import { type ClassValue, clsx } from "clsx";
import { sortedIndex } from "lodash";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getLastIp({
  arr,
  upperRange,
}: {
  arr: number[];
  upperRange: number;
}) {
  const index = sortedIndex(arr, upperRange);
  return arr[index] == upperRange ? arr[index] : arr[index - 1];
}
