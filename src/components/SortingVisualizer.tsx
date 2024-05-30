import React, { useState, useEffect } from "react";
import "./SortingVisualizer.css";
import { getMergeSortAnimations } from "../algorithms/mergeSort";
import { getQuickSortAnimations } from "../algorithms/quickSort";

const randomIntFromInterval = (min: number, max: number): number => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};
// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = randomIntFromInterval(5, 250);

// This is the main color of the array bars.
const PRIMARY_COLOR = "pink";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "blue";

const SortingVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  //On each mount reset the array
  useEffect(() => {
    resetArray();
  }, []);
  const resetArray = () => {
    setIsSorting(true);
    const newArray = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      newArray.push(randomIntFromInterval(5, 730));
    }
    setArray(newArray);
    setIsSorting(false);
  };

  const mergeSort = () => {
    setIsSorting(true);
    const animations = getMergeSortAnimations(array);
    console.log(animations, animations.length);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName(
        "array-bar"
      ) as HTMLCollectionOf<HTMLElement>;
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i] as [number, number];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    setIsSorting(false);
  };

  const quickSort = () => {
    setIsSorting(true);
    const animations = getQuickSortAnimations(array);
    console.log(animations, animations.length);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName(
        "array-bar"
      ) as HTMLCollectionOf<HTMLElement>;
      const [pivotIndex, barOneIdx, barTwoIdx, swap] = animations[i];
      const pivotStyle = arrayBars[pivotIndex].style;
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      setTimeout(() => {
        pivotStyle.backgroundColor = SECONDARY_COLOR;
        barOneStyle.backgroundColor = PRIMARY_COLOR;
        barTwoStyle.backgroundColor = PRIMARY_COLOR;
        if (swap) {
          const tempHeight = barOneStyle.height;
          barOneStyle.height = barTwoStyle.height;
          barTwoStyle.height = tempHeight;
        }
      }, i * ANIMATION_SPEED_MS);
    }
    setIsSorting(false);
  };

  return (
    <>
      <header>Sorting Visualizer</header>
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}
          ></div>
        ))}
      </div>
      <div className="button-container">
        <button className="button" onClick={quickSort} disabled={isSorting}>
          Quick Sort
        </button>
        <button className="button" onClick={resetArray} disabled={isSorting}>
          Generate New Array
        </button>
        <button className="button" onClick={mergeSort} disabled={isSorting}>
          Merge Sort
        </button>
      </div>
    </>
  );
};

export default SortingVisualizer;
