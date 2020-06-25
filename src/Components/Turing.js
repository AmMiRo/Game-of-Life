import React from "react";

const Turing = () => {
  return (
    <div className="info">
      <h1>Turing Completeness of the Game of Life</h1>
      <p>
        In computability theory a system of data-manipulation rules (such as a
        computer's instruction set, a programming language, or a cellular
        automaton) is said to be Turing complete if it can be used to simulate
        any Turing machine. A turing machine, invented by Alen Turing, is a
        mathematical model of computation which manipulates symbols on a strip
        of tape according to a table of rules. Given adequate time and memory a
        Turing machine is capable of computing anything currently computable.
      </p>
      <p>
        Conway's Game of Life is a cellular automata that is capable of
        simulating a turing machine. Info about a Game of Life program that
        simulates a Turing machine can be found{" "}
        <a
          href="http://rendell-attic.org/gol/tm.htm"
          rel="noopener noreferrer"
          target="_blank"
        >
          here
        </a>
        .
      </p>
    </div>
  );
};

export default Turing;
