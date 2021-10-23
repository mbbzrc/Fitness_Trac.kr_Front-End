import React, { useState } from "react";

import { deleteRoutine } from "../api";
import MyRoutinesItemEdit from "./MyRoutinesItemEdit";

const MyRoutinesItem = ({
  myRoutinesList,
  setMyRoutinesList,
  checkRoutineList,
  name,
  goal,
  creatorName,
  activities,
  isPublic,
  id,
}) => {
  const [toggle, setToggle] = useState(false);

  const handleEditToggle = () => {
    setToggle(!toggle);
  };

  const handleDelete = async (id) => {
    try {
      await deleteRoutine(id);
      const newList = myRoutinesList.filter((item) => item.id !== id);
      setMyRoutinesList(newList);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {!toggle ? (
        <div key={id} className="card routine">
          <span className="name">{name}</span>
          <p>
            <span className="card-label">Goal - </span>
            {goal}
          </p>
          {activities && activities.length > 0 ? (
            <div className="routine-activities">
              <p className="card-label">Activities </p>
              <ul>
                {activities.map(
                  ({
                    name,
                    description,
                    count,
                    duration,
                    routineActivityId,
                  }) => {
                    return (
                      <li key={routineActivityId}>
                        <span className="name">{name}: </span>
                        <span className="description">{description} </span>(
                        {count} {count > 1 ? "reps" : "rep"} for {duration}{" "}
                        {duration > 1 ? "mins" : "min"})
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          ) : (
            <p>
              <em>no activities added yet</em>
            </p>
          )}
          <p>Status: {isPublic ? <span>public</span> : <span>private</span>}</p>
          <p className="owner">Created by: {creatorName}</p>
          <div className="material-icons">
            <span onClick={handleEditToggle}>edit</span>
            <span onClick={() => handleDelete(id)}>delete</span>
          </div>
        </div>
      ) : (
        <MyRoutinesItemEdit
          myRoutinesList={myRoutinesList}
          setMyRoutinesList={setMyRoutinesList}
          checkRoutineList={checkRoutineList}
          toggle={toggle}
          setToggle={setToggle}
          name={name}
          goal={goal}
          creatorName={creatorName}
          isPublic={isPublic}
          id={id}
        />
      )}
    </>
  );
};

export default MyRoutinesItem;
