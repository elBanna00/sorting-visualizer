import React, { useState, useEffect } from "react";
import "./SortingVisualizer.css";

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 200;

// This is the main color of the array bars.
const PRIMARY_COLOR = "pink";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "green";

const SortingVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const newArray = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      newArray.push(randomIntFromInterval(5, 730));
    }
    setArray(newArray);
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
    </>
  );
};

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
const randomIntFromInterval = (min: number, max: number): number => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const arraysAreEqual = (arrayOne: number[], arrayTwo: number[]): boolean => {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
};

export default SortingVisualizer;
