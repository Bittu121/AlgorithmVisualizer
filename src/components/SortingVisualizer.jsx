import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notification from "./Notification";
import "./SortingVisualizer.css";
import { MdOutlineDataArray } from "react-icons/md";

function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const [speed, setSpeed] = useState(50);

  //random array of unique integers
  const generateRandomArray = () => {
    const newArray = [];

    while (newArray.length < 50) {
      const randomNumber = generateRandomInteger(1, 200);
      if (!newArray.includes(randomNumber)) {
        newArray.push(randomNumber);
      }
    }
    setArray(newArray);
  };

  // generate a random integer within a range
  const generateRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // Bubble Sort
  const bubbleSort = () => {
    const ans = [];
    const arrayCopy = array.slice();
    for (let i = 0; i < arrayCopy.length; i++) {
      for (let j = 0; j < arrayCopy.length - i - 1; j++) {
        if (arrayCopy[j] > arrayCopy[j + 1]) {
          // Swap elements
          ans.push([j, j + 1]);
          const temp = arrayCopy[j];
          arrayCopy[j] = arrayCopy[j + 1];
          arrayCopy[j + 1] = temp;
        }
      }
    }
    animateSorting(ans, "Bubble Sort", "O(n^2)", "O(1)");
  };

  // Insertion Sort
  const insertionSort = () => {
    const ans = [];
    const arrayCopy = array.slice();
    for (let i = 1; i < arrayCopy.length; i++) {
      let key = arrayCopy[i];
      let j = i - 1;
      while (j >= 0 && arrayCopy[j] > key) {
        ans.push([j + 1, j]);
        arrayCopy[j + 1] = arrayCopy[j];
        j--;
      }
      arrayCopy[j + 1] = key;
    }
    animateSorting(ans, "Insertion Sort", "O(n^2)", "O(1)");
  };

  //Selection Sort
  const selectionSort = () => {
    const ans = [];
    const arrayCopy = array.slice();
    for (let i = 0; i < arrayCopy.length - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < arrayCopy.length; j++) {
        if (arrayCopy[j] < arrayCopy[minIdx]) {
          minIdx = j;
        }
      }
      ans.push([minIdx, i]);
      const temp = arrayCopy[i];
      arrayCopy[i] = arrayCopy[minIdx];
      arrayCopy[minIdx] = temp;
    }
    animateSorting(ans, "Selection Sort", "O(n^2)", "O(1)");
  };

  // Function to animate the sorting process
  const animateSorting = (ans, algorithm, timeComplexity, spaceComplexity) => {
    let currIndex = 0;
    const arrayBars = document.getElementsByClassName("array-bar");

    const runAnimationStep = () => {
      if (currIndex < ans.length) {
        const [firstIndex, secondIndex] = ans[currIndex];
        const barOneStyle = arrayBars[firstIndex].style;
        const barTwoStyle = arrayBars[secondIndex].style;
        barOneStyle.backgroundColor = "red";
        barTwoStyle.backgroundColor = "red";

        // Swap heights
        const tempHeight = barOneStyle.height;
        barOneStyle.height = barTwoStyle.height;
        barTwoStyle.height = tempHeight;

        // Update value display
        const barOneValue = array[firstIndex];
        const barTwoValue = array[secondIndex];
        array[firstIndex] = barTwoValue;
        array[secondIndex] = barOneValue;

        document.getElementsByClassName("array-bar-value")[
          firstIndex
        ].innerText = barTwoValue;
        document.getElementsByClassName("array-bar-value")[
          secondIndex
        ].innerText = barOneValue;

        // Reset color after swapping
        setTimeout(() => {
          barOneStyle.backgroundColor = "#007bff";
          barTwoStyle.backgroundColor = "#007bff";
          currIndex++;
          runAnimationStep();
        }, speed);
      } else {
        //show notification for time and space complexity after sorting completed
        toast.success(
          <Notification
            timeAndSpaceComplexity={`Algorithm: ${algorithm}, Time Complexity: ${timeComplexity}, Space Complexity: ${spaceComplexity}`}
          />,
          {
            position: "top-right",
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      }
    };
    runAnimationStep();
  };

  //speed range input change
  const handleSpeedChange = (e) => {
    setSpeed(parseInt(e.target.value));
  };

  return (
    <div className="sorting-visualizer-container">
      <h2 className="heading">Algorithm Visualizer</h2>
      <ToastContainer />
      <div className="array-container">
        {array.map((value, idx) => (
          <div className="array-bar" key={idx} style={{ height: `${value}px` }}>
            <span className="array-bar-value">{value}</span>
          </div>
        ))}
      </div>
      <div className="buttons">
        <button onClick={generateRandomArray}>
          Generate Random Array
          <MdOutlineDataArray />
        </button>
        <button onClick={insertionSort}>Insertion Sort</button>
        <button onClick={selectionSort}>Selection Sort</button>
        <button onClick={bubbleSort}>Bubble Sort</button>
        <input
          type="range"
          min="10"
          max="1000"
          value={speed}
          onChange={handleSpeedChange}
        />
        <label>Speed: {speed}ms</label>
      </div>
    </div>
  );
}

export default SortingVisualizer;
