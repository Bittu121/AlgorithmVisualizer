import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SortingVisualizer from "./components/SortingVisualizer";

function App() {
  return (
    <>
      <div className="App">
        <SortingVisualizer />
      </div>
    </>
  );
}

export default App;
