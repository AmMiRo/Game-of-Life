import React, { useState, useRef, useCallback, useEffect } from "react";
import produce from "immer";
import Grid from "./Grid.js";
import { set } from "object-path";

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
  const [speed, setSpeed] = useState(500);
  const [history, setHistory] = useState([grid]);

  useEffect(() => {
    setHistory([...history, grid]);
    console.log(history);
  }, [grid]);

  const operations = [
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
    [1, 0],
    [-1, 1],
    [-1, -1],
    [-1, 0],
  ];

  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;
              if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
                neighbors += g[newI][newJ];
              }
            });
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][j] = 0;
            } else if (g[i][j] === 0 && neighbors === 3) {
              gridCopy[i][j] = 1;
            }
          }
        }
      });
    });
    setTimeout(runSimulation, speed);
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setRunning(!running);
          if (!running) {
            runningRef.current = true;
            runSimulation();
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
          setHistory([newGrid]);
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
