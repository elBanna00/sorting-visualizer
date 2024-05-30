export function getQuickSortAnimations(
  array: number[]
): [number, number, number, boolean][] {
  const animations: [number, number, number, boolean][] = [];
  if (array.length <= 1) return animations;
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

function quickSortHelper(
  array: number[],
  low: number,
  high: number,
  animations: [number, number, number, boolean][]
): void {
  if (low < high) {
    const pivotIndex = partition(array, low, high, animations);
    quickSortHelper(array, low, pivotIndex - 1, animations);
    quickSortHelper(array, pivotIndex + 1, high, animations);
  }
}

function partition(
  array: number[],
  low: number,
  high: number,
  animations: [number, number, number, boolean][]
): number {
  const pivot = array[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    animations.push([high, j, high, false]); // Indicate comparing
    if (array[j] < pivot) {
      i++;
      animations.push([high, i, j, true]); // Indicate swapping
      swap(array, i, j);
    }
  }
  animations.push([high, i + 1, high, true]); // Indicate final swap with pivot
  swap(array, i + 1, high);
  return i + 1;
}

function swap(array: number[], i: number, j: number): void {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}
