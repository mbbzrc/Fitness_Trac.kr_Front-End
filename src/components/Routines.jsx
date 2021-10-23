import React, { useEffect, useState } from "react";
import { fetchAllPublicRoutines } from "../api";

const Routines = () => {
  const [routineList, setRoutineList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await fetchAllPublicRoutines();
        setRoutineList(results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h2>all routines</h2>
      <p>
        Welcome to Fitness Trac.kr routines! This is where activities work
        together so you can workout better.
      </p>
      <div id="routines">
        {routineList.length > 0 &&
          routineList.map(({ name, goal, creatorName, activities, id }) => {
            return (
              <div key={id} className="card routine">
                <h3>
                  <span className="name">{name}</span>
                </h3>
                <p>
                  <span className="card-label">Goal - </span>
                  {goal}
                </p>
                <div className="routine-activities">
                  <p className="card-label">Activities </p>
                  <ul>
                    {activities.length > 0 &&
                      activities.map(
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
                              <span className="description">
                                {description}{" "}
                              </span>
                              ({count} {count > 1 ? "reps" : "rep"} for{" "}
                              {duration} {duration > 1 ? "mins" : "min"})
                            </li>
                          );
                        }
                      )}
                  </ul>
                </div>
                <p className="owner">Created by: {creatorName}</p>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Routines;
