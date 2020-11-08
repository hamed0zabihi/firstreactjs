import React from "react";
import User from "./Component/User.js";

import { BrowserRouter, Switch, Route } from "react-router-dom";
// import logo from "./logo.svg";
import "./App.css";
import CatalogUser from "./Component/CatalogUser.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <User />
          </Route>
          <Route path="/user/:name" component={CatalogUser}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
