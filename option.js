import React, { useState } from "react";
import Grid from "./Grid.js";

const Game = () => {
  const generateEmptyGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  };

  const [numRows, setRows] = useState(25);
  const [numCols, setColumns] = useState(25);
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });
  const [running, setRunning] = useState(false);
  const [generation, setGeneration] = useState(1);
  const [speed, setSpeed] = useState(500);
  const [intervalId, setIntervalId] = useState();

  const neighbors = [
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
    [1, 0],
    [-1, 1],
    [-1, -1],
    [-1, 0],
  ];

  const play = () => {
    const g = grid;
    const g2 = JSON.parse(JSON.stringify(grid));

    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        let numNeighbors = 0;
        neighbors.forEach(([x, y]) => {
          const newI = i + x;
          const newJ = j + y;
          if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
            numNeighbors += g[newI][newJ];
          }
        });
        if (numNeighbors < 2 || numNeighbors > 3) {
          g2[i][j] = 0;
        } else if (g[i][j] === 0 && numNeighbors === 3) {
          g2[i][j] = 1;
        }
      }
    }
    setGrid(g2);
    setGeneration(generation + 1);
    console.log(generation);
  };

  const runGame = () => {
    clearInterval(intervalId);
    const instance = setInterval(play, speed);
    setIntervalId(instance);
  };

  const pauseGame = () => {
    clearInterval(intervalId);
  };

  return (
    <>
      <button
        onClick={() => {
          if (!running) {
            runGame();
            setRunning(true);
          } else if (running) {
            pauseGame();
            setRunning(false);
          }
        }}
      >
        {running ? "stop" : "start"}
      </button>
      <button
        onClick={() => {
          const newGrid = [];
          for (let i = 0; i < numCols; i++) {
            newGrid.push(
              Array.from(Array(numRows), () => (Math.random() > 0.7 ? 1 : 0))
            );
          }
          setGrid(newGrid);
        }}
      >
        seed
      </button>
      <button
        onClick={() => {
          setGrid(generateEmptyGrid());
        }}
      >
        clear
      </button>
      <Grid grid={grid} setGrid={setGrid} numCols={numCols} />
    </>
  );
};

export default Game;
