import React, { useState } from "react";
import Rules from "./Rules";
import Conway from "./Conway";
import Turing from "./Turing";
import CellularAutomata from "./Cellular-Automata";

const Info = () => {
  const [selected, setSelected] = useState("");

  return (
    <div className="large-container">
      <div className="small-container">
        <h2 className="info-links" onClick={() => setSelected("rules")}>
          Game of Life Rules
        </h2>
        <h2 className="info-links" onClick={() => setSelected("conway")}>
          John Horton Conway
        </h2>
        <h2 className="info-links" onClick={() => setSelected("turing")}>
          Turing Completeness
        </h2>
        <h2 className="info-links" onClick={() => setSelected("cells")}>
          Cellular Automata
        </h2>
      </div>
      {selected === "rules" ? (
        <Rules />
      ) : selected === "conway" ? (
        <Conway />
      ) : selected === "turing" ? (
        <Turing />
      ) : selected === "cells" ? (
        <CellularAutomata />
      ) : (
        ""
      )}
    </div>
  );
};

export default Info;
