import React, { useState, useEffect } from "react";

import { createActivity, deleteActivity, fetchAllActivities } from "../api";

import { checkToken } from "../auth";

const Activities = ({ currentUser }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const [activityList, setActivityList] = useState([]);

  const fetchData = async () => {
    try {
      const results = await fetchAllActivities();
      setActivityList(results);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFormChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  function checkActivityList(name) {
    const activityListLowercase = activityList.map((activity) => {
      const activityName = activity.name.toLowerCase();
      return activityName;
    });
    const nameLowercase = name.toLowerCase();
    return activityListLowercase.includes(nameLowercase);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    const { name, description } = form;
    if (!name || !description) {
      setErrorMessage("Both name and description are required!");
      return;
    }
    if (!checkToken()) {
      setErrorMessage("You are not logged in!");
      return;
    }
    if (checkActivityList(name)) {
      setErrorMessage("Activity already exists!");
      return;
    }
    try {
      await createActivity(name, description);
      setForm({ name: "", description: "" });
      fetchData();
    } catch (error) {
      setErrorMessage(error.message);
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    await deleteActivity(id);
    fetchData();
  };

  return (
    <>
      <h2>activities</h2>
      <p>
        Welcome to Fitness Trac.kr activities! Check out our fitness database
        below.{" "}
        {currentUser.loggedIn
          ? "These activities are visible to all users, so anything you create can be used to customize a new routine."
          : null}
      </p>
      {currentUser.loggedIn ? (
        <>
          <h3>Create New Activity</h3>
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
              <span>Description: </span>
              <textarea
                name="description"
                value={form.description}
                onChange={handleFormChange}
              />
            </label>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <input
              type="submit"
              value="Create activity"
              onClick={handleSubmit}
            />
          </form>
        </>
      ) : null}
      <h3>All Activities</h3>
      <div id="activities">
        {activityList.length > 0 &&
          activityList.map(({ name, description, id }) => {
            return (
              <div key={id} className="card activity">
                <span className="name">{name}</span>
                <p>
                  <span className="card-label">Description - </span>
                  {description}
                </p>
                <span
                  className="material-icons"
                  onClick={() => handleDelete(id)}
                >
                  delete
                </span>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Activities;
