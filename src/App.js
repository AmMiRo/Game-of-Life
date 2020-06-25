import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import Header from "./Components/Header.js";
import Info from "./Components/Info.js";
import Game from "./Components/Game";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Game} />
        <Route path="/info" component={Info} />
      </Switch>
    </div>
  );
}

export default App;
