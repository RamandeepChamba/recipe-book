export function range(x, y) {
  return Array.from({ length: y - x + 1 }, (_, i) => i + x);
}
