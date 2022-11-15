export const colorIntToHex = (color: number) =>
  "#" + color.toString(16).padStart(6, "0");
