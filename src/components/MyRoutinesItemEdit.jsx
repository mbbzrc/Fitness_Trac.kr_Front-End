import React, { useEffect, useState } from "react";

import {
  addActivityToRoutine,
  updateRoutine,
  getRoutineActivitiesByRoutineId,
  deleteRoutineActivity,
} from "../api";
import MyRoutinesActivitiesForm from "./MyRoutinesActivitiesForm";

const MyRoutinesItemEdit = ({
  myRoutinesList,
  setMyRoutinesList,
  checkRoutineList,
  setToggle,
  toggle,
  name,
  goal,
  isPublic,
  id,
}) => {
  const initialState = {
    name: name,
    goal: goal,
    isPublic: isPublic,
  };

  const [routineActivities, setRoutineActivities] = useState([]);

  const [pendingActivities, setPendingActivities] = useState([]);

  const [form, setForm] = useState({ ...initialState });

  const [errorMessage, setErrorMessage] = useState(null);

  const fetchRoutineData = async () => {
    try {
      const fetchedRoutineActivities = await getRoutineActivitiesByRoutineId(
        id
      );
      if (!fetchedRoutineActivities) return;
      setRoutineActivities(fetchedRoutineActivities);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRoutineData();
  }, []);

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
    if (checkRoutineList(name) && name !== name) {
      setErrorMessage(
        "This routine already exists! Please choose another name."
      );
      return;
    }
    try {
      if (pendingActivities.length > 0) {
        await Promise.all(
          pendingActivities.map(
            ({ routineId, activityId, count, duration }) => {
              addActivityToRoutine(routineId, activityId, count, duration);
            }
          )
        );
      }
      const updatedRoutine = await updateRoutine(name, goal, isPublic, id);
      const itemIndex = myRoutinesList.findIndex((item) => item.id == id);
      const newList = [...myRoutinesList];
      newList.splice(itemIndex, 1, updatedRoutine);
      setMyRoutinesList(newList);
      setPendingActivities([]);
      setToggle(!toggle);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setToggle(!toggle);
    setForm({ ...initialState });
    setPendingActivities([]);
  };

  const handleDelete = async (routineActivityId) => {
    await deleteRoutineActivity(routineActivityId);
    fetchRoutineData();
  };

  return (
    <form className="form-edit">
      <h4>Edit Routine</h4>
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
      <ul>
        {routineActivities.length > 0
          ? routineActivities.map(
              ({ name, count, duration, routineActivityId }) => {
                return (
                  <li key={routineActivityId}>
                    <span
                      className="material-icons"
                      onClick={() => handleDelete(routineActivityId)}
                    >
                      delete
                    </span>{" "}
                    {name} ({count} {count > 1 ? "reps" : "rep"} for {duration}{" "}
                    {duration > 1 ? "mins" : "min"})
                  </li>
                );
              }
            )
          : null}
      </ul>
      <label>
        <span>Add activities to your routine: </span>
        <MyRoutinesActivitiesForm
          id={id}
          pendingActivities={pendingActivities}
          setPendingActivities={setPendingActivities}
          routineActivities={routineActivities}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      </label>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="form-buttons">
        <input
          type="submit"
          value="Update routine"
          disabled={errorMessage ? true : false}
          onClick={handleSubmit}
        />
        <input type="button" value="Cancel" onClick={handleCancel} />
      </div>
    </form>
  );
};

export default MyRoutinesItemEdit;
