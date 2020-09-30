import React, { useState, useRef, useEffect } from "react";
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

  const [inputs, setInputs] = useState({ rows: 30, cols: 30, gen: "" });
  const [numRows, setRows] = useState(30);
  const [numCols, setColumns] = useState(30);
  const [grid, setGrid] = useState(generateEmptyGrid());
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [history, setHistory] = useState([grid]);
  const [customize, setCustomize] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isJumping, setIsJumping] = useState(false);

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

  const speeds = [300, 600, 900, 1200];

  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = () => {
    if (!runningRef.current) {
      return;
    }
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < g.length; i++) {
          for (let j = 0; j < g[0].length; j++) {
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
  };

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

  const jump = (e) => {
    e.preventDefault();
    setIsLoading(true);
    let newHistory = JSON.parse(JSON.stringify(history));
    const n = inputs.gen;
    console.log(n);
    if (n < newHistory.length - 1) {
      for (let i = newHistory.length; i === n; i--) {
        console.log(newHistory.length);
        newHistory.pop();
      }
      console.log(newHistory.length);
    } else if (n > newHistory.length) {
      for (let i = newHistory.length; i === n + 1; i++) {
        const g = newHistory[newHistory.length - 1];
        const g2 = JSON.parse(JSON.stringify(g));

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
        newHistory.push(g2);
      }
    }
    setHistory(newHistory);
    setGrid(newHistory[newHistory.length - 1]);
    setIsLoading(false);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInputs({ ...inputs, [e.target.id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const rows = Math.floor(Number(inputs.rows));
    const cols = Math.floor(Number(inputs.cols));
    setRows(rows);
    setColumns(cols);
    setGrid(generateEmptyGrid(rows, cols));
    setHistory([grid]);
  };

  return (
    <>
      {isLoading ? (
        <div className="large-container">
          <h1 className="loading">Loading...</h1>
        </div>
      ) : (
        <div className="large-container">
          <div className="small-container">
            <button
              className="active-buttons"
              onClick={() => {
                setRunning(!running);
                setCustomize(false);
                if (!running) {
                  runningRef.current = true;
                  runSimulation();
                }
              }}
            >
              {running ? "stop" : "start"}
            </button>
            <button
              className={running ? "dead-buttons" : "active-buttons"}
              onClick={running ? () => {} : nextGrid}
            >
              next
            </button>
            <button
              className={running ? "dead-buttons" : "active-buttons"}
              onClick={
                running
                  ? ""
                  : () => {
                      setRunning(false);
                      const newGrid = [];
                      for (let i = 0; i < numRows; i++) {
                        newGrid.push(
                          Array.from(Array(numCols), () =>
                            Math.random() > 0.7 ? 1 : 0
                          )
                        );
                      }
                      setGrid(newGrid);
                      setHistory([newGrid]);
                    }
              }
            >
              seed
            </button>
            <button
              className={running ? "dead-buttons" : "active-buttons"}
              onClick={
                running
                  ? ""
                  : () => {
                      setGrid(generateEmptyGrid());
                      setHistory([grid]);
                    }
              }
            >
              clear
            </button>
            <button
              className={running ? "dead-buttons" : "active-buttons"}
              onClick={() => {
                setCustomize(!customize);
                setIsJumping(false);
              }}
            >
              customize
            </button>
            <button
              className={running ? "dead-buttons" : "active-buttons"}
              onClick={
                running
                  ? () => {}
                  : () => {
                      setCustomize(false);
                      setIsJumping(!isJumping);
                    }
              }
            >
              jump
            </button>
          </div>
          {isJumping ? (
            <form>
              <label>
                Go to generation:
                <input
                  className="inputs"
                  name="jump"
                  type="text"
                  id="gen"
                  onChange={handleChange}
                />
              </label>
              <button type="submit" className="active-buttons" onClick={jump}>
                go
              </button>
            </form>
          ) : (
            ""
          )}
          {customize ? (
            <div className="customize-container">
              <form className="form-container" onSubmit={handleSubmit}>
                <label>
                  rows
                  <input
                    className="inputs"
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
                    className="inputs"
                    name="columns"
                    id="cols"
                    type="text"
                    onChange={handleChange}
                    value={inputs.cols}
                  />
                </label>
                <button
                  className="active-buttons"
                  type="submit"
                  onClick={handleSubmit}
                >
                  submit
                </button>
              </form>
              <div className="small-container">
                <button
                  className={
                    running
                      ? "dead-buttons"
                      : speed === speeds.length - 1
                      ? "dead-buttons"
                      : "active-buttons"
                  }
                  onClick={
                    running
                      ? () => {}
                      : () => {
                          setSpeed(
                            speed === speeds.length - 1 ? speed : speed + 1
                          );
                        }
                  }
                >
                  slower
                </button>
                <button
                  className={
                    running
                      ? "dead-buttons"
                      : speed === 0
                      ? "dead-buttons"
                      : "active-buttons"
                  }
                  onClick={
                    running
                      ? () => {}
                      : () => {
                          setSpeed(speed === 0 ? speed : speed - 1);
                        }
                  }
                >
                  faster
                </button>
              </div>
            </div>
          ) : (
            ""
          )}

          <Grid
            grid={grid}
            setGrid={setGrid}
            numCols={numCols}
            running={running}
          />
          <div className="small-container">
            <p className="text-info">
              Speed:{" "}
              {speed === 0
                ? "fast"
                : speed === 1
                ? "normal"
                : speed === 2
                ? "slow"
                : speed === 3
                ? "slowest"
                : ""}
            </p>
            <p className="text-info">Generation: {history.length - 1}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Game;
