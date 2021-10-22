import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../api";

const Login = ({ setCurrentUser }) => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const handleFormChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value.trim() });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null);
    const { username, password } = form;

    if (!username || !password) {
      setErrorMessage("Something's not right! Please check and try again.");
      return;
    }

    try {
      const user = await loginUser(username, password);
      setCurrentUser(user);
    } catch ({ name, message }) {
      setErrorMessage(message);
      console.error(name, message);
    }
  };

  return (
    <>
      <h2>log in</h2>
      <form>
        <label>
          <span>username: </span>
          <input
            type="text"
            value={form.username}
            name="username"
            onChange={handleFormChange}
          />
        </label>
        <label>
          <span>password: </span>
          <input type="password" name="password" onChange={handleFormChange} />
        </label>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <input type="submit" value="Log in" onClick={handleSubmit} />
      </form>
      <p>
        Need an account? Click <Link to="/account/register">here</Link> to
        register.
      </p>
    </>
  );
};

export default Login;
