import React from "react";

const Rules = () => {
  return (
    <div className="info">
      <h1>Game of Life Rules</h1>
      <p>
        Explaination: The Game of Life is a 0-player game devised by John Horton
        Conway in 1970. A player interacts with the game by determining it's
        initial input and then observes how it evolves. The game requires no
        further input.
      </p>
      <h2>Rules</h2>
      <ol>
        <li>
          Any live cell with fewer than 2 live neighbors dies, as if by
          underpopulation.
        </li>
        <li>
          Any live cell with 2 or 3 live neighbors lives on to the next
          generation.
        </li>
        <li>
          Any live cell with more than 3 live neighbors dies, as if by
          overpopulation.
        </li>
        <li>
          Any dead cell with exactly 3 live neighbors becomes a live cell, as if
          by reproduction.
        </li>
      </ol>
    </div>
  );
};

export default Rules;
