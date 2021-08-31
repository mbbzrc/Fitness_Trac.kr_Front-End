import React, { useState, useEffect } from "react";

import { createRoutine } from "../api";

const MyRoutinesForm = ({ fetchData, checkRoutineList }) => {
  const [form, setForm] = useState({
    name: "",
    goal: "",
    isPublic: false,
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const handleFormChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleOptionChange = (event) => {
    let isPublicValue;
    if (event.target.value == "true") {
      isPublicValue = true;
    } else if (event.target.value == "false") {
      isPublicValue = false;
    }
    setForm({ ...form, isPublic: isPublicValue });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    const { name, goal, isPublic } = form;
    if (!name || !goal) {
      setErrorMessage("Both name and goal are required!");
      return;
    }
    if (checkRoutineList(name)) {
      setErrorMessage(
        "This routine already exists! Please choose another name."
      );
      return;
    }
    try {
      await createRoutine(name, goal, isPublic);
      setForm({ name: "", goal: "", isPublic: false });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h3>Create New Routine</h3>
      <form className="form-create">
        <label>
          <span>Name: </span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleFormChange}
          />
        </label>
        <label>
          <span>Goal: </span>
          <textarea name="goal" value={form.goal} onChange={handleFormChange} />
        </label>
        <label>
          <span>Share your routine?</span>
          <div className="input-radio">
            <input
              type="radio"
              name="isPublic"
              value="false"
              onChange={handleOptionChange}
              checked={form.isPublic === false}
            />
            <span className="input-radio-label">Private</span>
            <input
              type="radio"
              name="isPublic"
              value="true"
              onChange={handleOptionChange}
              checked={form.isPublic === true}
            />
            <span className="input-radio-label">Public</span>
          </div>
        </label>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <input type="submit" value="Create routine" onClick={handleSubmit} />
      </form>
    </>
  );
};

export default MyRoutinesForm;
