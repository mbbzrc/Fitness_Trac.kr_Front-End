import React, { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../api";

const Register = ({ setCurrentUser }) => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    passwordCheck: "",
  });

  const [errorMessage, setErrorMessage] = useState();

  const handleFormChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value.trim() });
  };

  const checkPassword = (password, passwordCheck) => {
    const conditions = ["$", "!", "@", "#"];
    if (password.length < 8) return false;
    if (password !== passwordCheck) return false;
    for (let i = 0; i < conditions.length; i++) {
      for (let j = 0; j < password.length; j++) {
        if (conditions[i] === password[j]) {
          return true;
        }
      }
    }
    return false;
  };

  const checkFields = () => {
    const { username, password, passwordCheck } = form;
    return username.length < 6
      ? false
      : !checkPassword(password, passwordCheck)
      ? false
      : true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null);
    const { username, password } = form;
    try {
      if (!checkFields()) {
        setErrorMessage("Something's not right! Please check and try again.");
        return;
      } else {
        await registerUser(username, password);
        setCurrentUser({ username: username, loggedIn: true });
      }
    } catch ({ name, message }) {
      setErrorMessage(message);
      console.error(name, message);
    }
  };

  return (
    <>
      <h2>create an account</h2>
      <form>
        <label>
          <span>username: </span>
          <input
            type="text"
            value={form.username}
            name="username"
            onChange={handleFormChange}
          />
          <span className="note">
            Create a username at least 6 characters long.
          </span>
        </label>
        <label>
          <span>password: </span>
          <input type="password" name="password" onChange={handleFormChange} />
        </label>
        <label>
          <span>retype password: </span>
          <input
            type="password"
            name="passwordCheck"
            onChange={handleFormChange}
          />
          <span className="note">
            Create a password at least 8 characters long and include at least 1
            of the following special characters: ( $ ! @ # ).
          </span>
        </label>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <input type="submit" value="Submit" onClick={handleSubmit} />
      </form>
      <p>
        Already have an account? Click <Link to="/account/login">here</Link> to
        log in.
      </p>
    </>
  );
};

export default Register;
