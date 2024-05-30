export function getMergeSortAnimations(
  array: number[]
): [number, number | number[]][] {
  const animations: [number, number | number[]][] = [];
  if (array.length <= 1) return animations;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray: number[],
  startIdx: number,
  endIdx: number,
  auxiliaryArray: number[],
  animations: [number, number | number[]][]
): void {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray: number[],
  startIdx: number,
  middleIdx: number,
  endIdx: number,
  auxiliaryArray: number[],
  animations: [number, number | number[]][]
): void {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    animations.push([i, j]); // Compare i and j
    animations.push([i, j]); // Revert the color change
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]); // Overwrite value at index k with value at index i
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]); // Overwrite value at index k with value at index j
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([i, i]); // Compare i with itself
    animations.push([i, i]); // Revert the color change
    animations.push([k, auxiliaryArray[i]]); // Overwrite value at index k with value at index i
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push([j, j]); // Compare j with itself
    animations.push([j, j]); // Revert the color change
    animations.push([k, auxiliaryArray[j]]); // Overwrite value at index k with value at index j
    mainArray[k++] = auxiliaryArray[j++];
  }
}
