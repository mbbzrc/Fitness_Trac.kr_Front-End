import React, { useState, useEffect } from "react";

import { fetchRoutinesByUser } from "../api";

import { MyRoutinesForm, MyRoutinesItem } from "./index";

const MyRoutines = ({ currentUser }) => {
  const [myRoutinesList, setMyRoutinesList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await fetchRoutinesByUser(currentUser.username);
        setMyRoutinesList(results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  function checkRoutineList(name) {
    const myRoutinesListLowercase = myRoutinesList.map((routine) => {
      const routineName = routine.name.toLowerCase();
      return routineName;
    });
    const nameLowercase = name.toLowerCase();
    return myRoutinesListLowercase.includes(nameLowercase);
  }

  return (
    <>
      <h2>my routines</h2>
      <p>
        Create and customize your personal routines here! It's up to you whether
        you make them public or keep them private. Be sure to add some
        activities once you've created a routine.
      </p>
      <div id="my-routines">
        <MyRoutinesForm
          setMyRoutinesList={setMyRoutinesList}
          myRoutinesList={myRoutinesList}
          checkRoutineList={checkRoutineList}
        />
        <h3>Existing Routines</h3>
        <ul>
          {myRoutinesList.length > 0 &&
            myRoutinesList.map(
              ({ name, goal, creatorName, activities, isPublic, id }) => {
                return (
                  <MyRoutinesItem
                    key={id}
                    myRoutinesList={myRoutinesList}
                    setMyRoutinesList={setMyRoutinesList}
                    checkRoutineList={checkRoutineList}
                    name={name}
                    goal={goal}
                    creatorName={creatorName}
                    activities={activities}
                    isPublic={isPublic}
                    id={id}
                  />
                );
              }
            )}
        </ul>
      </div>
    </>
  );
};

export default MyRoutines;
