import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from './utils/PrivateRoute.js';
import BubblePage from './components/BubblePage'

import Login from "./components/Login";
import "./styles.scss";

function App() {
  return (
      <div className="App">
        <PrivateRoute path='bubbles-page' component={BubblePage} />
        <Route exact path="/" component={Login} />
      </div>
  );
}

export default App;
