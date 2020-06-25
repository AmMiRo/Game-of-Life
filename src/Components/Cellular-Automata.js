import React from "react";

const CellularAutomata = () => {
  return (
    <div className="info">
      <h1>Cellular Automata</h1>
      <p>
        A cellular automaton is a discrete model studied in automata theory,
        consists of a regular grid of cells, each in one of a finite number of
        states, such as on and off. An initial state is selected by assigning a
        state for each cell. Each new generation is created according to some
        fixed rule (generally, a mathematical function) that determines the new
        state of each cell in terms of the current state of the cell and the
        states of the cells in its neighborhood.
      </p>
      <p>
        While the concept of a cellular automaton was originally discovered in
        the 1940s by Stanislaw Ulam and John von Neumann, it did not gain
        interest outside of academia until 1970s due to Conway's Game of Life.
      </p>
    </div>
  );
};

export default CellularAutomata;
