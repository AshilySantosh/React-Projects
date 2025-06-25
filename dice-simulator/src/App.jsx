import React, { useState } from "react";
import "./App.css";

const diceFaces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

function App() {
  const [currentFace, setCurrentFace] = useState("🎲");
  const [history, setHistory] = useState([]);

  const handleRoll = () => {
    let rollCount = 0;

    const roll = setInterval(() => {
      const random = Math.floor(Math.random() * 6);
      setCurrentFace(diceFaces[random]);
      rollCount++;

      if (rollCount >= 10) {
        clearInterval(roll);

        const final = Math.floor(Math.random() * 6);
        const finalFace = diceFaces[final];
        setCurrentFace(finalFace);

        setHistory((prev) => [`Roll ${prev.length + 1}: ${finalFace}`, ...prev]);
      }
    }, 100);
  };

  const handleReset = () => {
    setCurrentFace("🎲");
    setHistory([]);
  };

  return (
    <div className="container">
      <div className="dice-box">
        <h1>Dice Roll Simulator</h1>
        <div id="dice">{currentFace}</div>

        <div className="btns">
          <button className="btn" id="roll-btn" onClick={handleRoll}>
            Roll the dice
          </button>
          <button className="btn" id="reset" onClick={handleReset}>
            Reset
          </button>
        </div>

        <div id="dice-history">
          {history.map((roll, index) => (
            <div key={index}>{roll}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
