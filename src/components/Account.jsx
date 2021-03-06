import React, { useEffect } from "react";
import { storeCurrentUser } from "../auth";

import { Route, Switch, Link } from "react-router-dom";

import { Login, Register } from "./index";

import { clearCurrentUser } from "../auth";

const Account = ({ currentUser, setCurrentUser }) => {
  const handleLogout = () => {
    clearCurrentUser();
    setCurrentUser(null);
  };

  useEffect(() => {
    storeCurrentUser(currentUser);
  }, [currentUser]);

  return (
    <div className="account">
      {currentUser ? (
        <>
          <h2>welcome, {currentUser.username}</h2>
          <div>
            <Link to="/account/login" onClick={handleLogout}>
              Log out
            </Link>
          </div>
        </>
      ) : (
        <Switch>
          <Route path="/account/login">
            <Login setCurrentUser={setCurrentUser} />
          </Route>
          <Route path="/account/register">
            <Register setCurrentUser={setCurrentUser} />
          </Route>
        </Switch>
      )}
    </div>
  );
};

export default Account;
