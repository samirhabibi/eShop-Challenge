import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./component/navvbar";
import Home from "./component/Home";
import Cart from "./component/Cart";
function App() {
  return (
    <Router>
      <div>
        <Navbar></Navbar>
        <br></br>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/cart" component={Cart} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
