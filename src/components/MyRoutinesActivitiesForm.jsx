import React, { useState, useEffect } from "react";

import { fetchAllActivities } from "../api";

const MyRoutinesActivitiesForm = ({
  pendingActivities,
  setPendingActivities,
  routineActivities,
  errorMessage,
  setErrorMessage,
  id,
}) => {
  const [activityList, setActivityList] = useState([]);

  const [selectedActivity, setSelectedActivity] = useState({
    routineId: id,
    activityId: null,
    count: 0,
    duration: 0,
    name: "",
  });

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

  const handleSelectChange = (event) => {
    setErrorMessage(null);
    const selectedName = event.target.value;
    const selectedIndex = event.target.options.selectedIndex;
    const activityId = Number(
      event.target.options[selectedIndex].getAttribute("data-key")
    );
    pendingActivities.forEach((activity) => {
      if (activityId === activity.activityId) {
        setErrorMessage("You already queued up this activity!");
        return;
      }
    });
    routineActivities.forEach((activity) => {
      if (activityId === activity.activityId) {
        setErrorMessage("This activity is already part of your routine!");
        return;
      }
    });
    setSelectedActivity({
      ...selectedActivity,
      activityId: activityId,
      name: selectedName,
    });
  };

  const handleNumberChange = (event) => {
    setErrorMessage(null);
    setSelectedActivity({
      ...selectedActivity,
      [event.target.name]: Number(event.target.value),
    });
  };

  const pushToStateArray = (selectedActivity) => {
    const newArray = [...pendingActivities];
    newArray.push(selectedActivity);
    return newArray;
  };

  const handleAddActivity = (event) => {
    event.preventDefault();
    setErrorMessage("");
    if (!selectedActivity.name) {
      setErrorMessage("Please choose an activity to add to your routine!");
      return;
    }
    if (selectedActivity.count < 1 || selectedActivity.duration < 1) {
      setErrorMessage("Please set activity count and duration!");
      return;
    }
    const newObject = pushToStateArray(selectedActivity);
    setPendingActivities(newObject);
  };

  const handleDelete = (activityId) => {
    for (let i = 0; i < activityList.length; i++) {
      if (pendingActivities[i].activityId === activityId) {
        pendingActivities.splice(i, 1);
        setPendingActivities([...pendingActivities]);
        return;
      }
    }
  };

  return (
    <>
      <select name="activities-list" onChange={handleSelectChange}>
        <option />
        {activityList
          ? activityList.map(({ id, name }) => {
              return (
                <option key={id} data-key={id} value={name}>
                  {name}
                </option>
              );
            })
          : null}
      </select>
      <div className="set-activity-parameters">
        <label>
          <span>Count: </span>
          <input
            type="number"
            min="0"
            name="count"
            value={selectedActivity.count}
            onChange={handleNumberChange}
          />
        </label>
        <label>
          <span>Duration (minutes): </span>
          <input
            type="number"
            min="0"
            name="duration"
            value={selectedActivity.duration}
            onChange={handleNumberChange}
          />
        </label>
        <button
          disabled={errorMessage ? true : false}
          onClick={handleAddActivity}
        >
          Add activity
        </button>
      </div>
      <ul>
        {pendingActivities.length > 0
          ? pendingActivities.map(({ name, count, duration, activityId }) => {
              return (
                <li key={activityId}>
                  <span
                    className="material-icons"
                    onClick={() => handleDelete(activityId)}
                  >
                    delete
                  </span>{" "}
                  {name} ({count} {count > 1 ? "reps" : "rep"} for {duration}{" "}
                  {duration > 1 ? "mins" : "min"})
                </li>
              );
            })
          : null}
      </ul>
    </>
  );
};

export default MyRoutinesActivitiesForm;
