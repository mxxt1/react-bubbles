import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from './utils/PrivateRoute.js';
import BubblePage from './components/BubblePage.js';


import Login from "./components/Login";
import "./styles.scss";

function App() {
  return (
      <div className="App">
      <Switch>
        <PrivateRoute exact path='/bubbles-page' component={BubblePage} />
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
      </Switch>  
      </div>
  );
}

export default App;
