import React from "react";
import Cell from "./Cell.js";

const Grid = ({ numCols, grid, setGrid }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${numCols}, 16px)`,
      }}
    >
      {grid.map((rows, i) =>
        rows.map((col, j) => {
          return <Cell grid={grid} setGrid={setGrid} i={i} j={j} />;
        })
      )}
    </div>
  );
};

export default Grid;
