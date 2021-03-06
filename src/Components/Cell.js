import React from "react";

const Cell = ({ i, j, grid, setGrid, running }) => {
  //   console.log(running);
  return (
    <div
      key={`${i}-${j}`}
      onClick={
        running
          ? () => {}
          : () => {
              const g = grid;
              const g2 = JSON.parse(JSON.stringify(grid));
              g2[i][j] = g[i][j] ? 0 : 1;
              setGrid(g2);
            }
      }
      style={{
        width: 15,
        height: 15,
        backgroundColor: grid[i][j] ? "LightGray" : undefined,
        border: "solid 1px black",
      }}
    />
  );
};

export default Cell;
