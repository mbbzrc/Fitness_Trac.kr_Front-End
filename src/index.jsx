import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

// import { checkToken, getCurrentUser } from "./auth";

import { Routines, MyRoutines, Activities, Account, Home } from "./components";

const App = () => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  return (
    <div className="app">
      <div id="title">
        <img id="logo" src="/assets/logo.png" alt="logo" />
        <h1>Fitness Trac.kr</h1>
      </div>
      <Router>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/routines">Routines</Link>
          {currentUser && <Link to="/my-routines">My Routines</Link>}
          <Link to="/activities">Activities</Link>
          <Link to={currentUser ? "/account" : "/account/login"}>Account</Link>
        </nav>
        <Switch>
          <Route path="/routines">
            <Routines />
          </Route>
          <Route path="/my-routines">
            <MyRoutines currentUser={currentUser} />
          </Route>
          <Route path="/activities">
            <Activities currentUser={currentUser} />
          </Route>
          <Route path="/account">
            <Account
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
      <footer>&copy;2021 Fitness Track.r. All rights reserved.</footer>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
