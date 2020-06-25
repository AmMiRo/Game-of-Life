import React, { useState, useRef, useCallback, useEffect } from "react";
import produce from "immer";
import Grid from "./Grid.js";

const Game = () => {
  // generates an empty grid
  const generateEmptyGrid = (row, col) => {
    const rows = [];
    for (let i = 0; i < (row ? row : numRows); i++) {
      rows.push(Array.from(Array(col ? col : numCols), () => 0));
    }
    return rows;
  };

  const [inputs, setInputs] = useState({ rows: 25, cols: 25 });
  const [numRows, setRows] = useState(25);
  const [numCols, setColumns] = useState(25);
  const [grid, setGrid] = useState(generateEmptyGrid());
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [history, setHistory] = useState([grid]);

  // updates history with each iteration of grid
  useEffect(() => {
    setHistory([...history, grid]);
  }, [grid]);

  // list of neighbors for each cell
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

  const speeds = [300, 500, 1000];

  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    console.log(speeds[speed]);
    if (!runningRef.current) {
      return;
    }
    setGrid((g) => {
      return produce(g, (gridCopy) => {
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
              gridCopy[i][j] = 0;
            } else if (g[i][j] === 0 && numNeighbors === 3) {
              gridCopy[i][j] = 1;
            }
          }
        }
      });
    });
    setTimeout(runSimulation, speeds[speed]);
  }, []);

  const nextGrid = () => {
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
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInputs({ ...inputs, [e.target.id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const rows = Number(inputs.rows);
    const cols = Number(inputs.cols);
    setRows(rows);
    setColumns(cols);
    setGrid(generateEmptyGrid(rows, cols));
    setHistory([grid]);
  };

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
      <button onClick={nextGrid}>next</button>
      <button
        onClick={() => {
          setRunning(false);
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
        lear
      </button>
      <form onSubmit={handleSubmit}>
        <label>
          rows
          <input
            name="rows"
            id="rows"
            type="text"
            onChange={handleChange}
            value={inputs.rows}
          />
        </label>
        <label>
          columns
          <input
            name="columns"
            id="cols"
            type="text"
            onChange={handleChange}
            value={inputs.cols}
          />
        </label>
        <button type="submit" onClick={handleSubmit}>
          submit
        </button>
      </form>
      <p>Generation: {history.length - 1}</p>
      {speed - 1 >= 0 ? (
        <button onClick={() => setSpeed(speed - 1)}>slower</button>
      ) : (
        ""
      )}
      {speed + 1 <= speeds.length ? (
        <button onClick={() => setSpeed(speed + 1)}>faster</button>
      ) : (
        ""
      )}
      <Grid grid={grid} setGrid={setGrid} numCols={numCols} running={running} />
    </>
  );
};

export default Game;
