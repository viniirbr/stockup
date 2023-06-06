export function joinArray(arrayOfStrings: string[]): string {
  if (arrayOfStrings.length === 0) return "";
  if (arrayOfStrings.length === 1) return arrayOfStrings[0];

  const firstPart = [arrayOfStrings.slice(0, -1).join(", ")];
  const lastItem = arrayOfStrings.slice(-1);

  return [...firstPart, ...lastItem].join(" and ");
}
