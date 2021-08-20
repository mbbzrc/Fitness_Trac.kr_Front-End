import React, {useEffect, useState} from 'react';
import {fetchAllPublicRoutines} from '../api';

const Routines = () => {
    const [routineList, setRoutineList] = useState([]);

    const fetchData = async () => {
        try {
            const results = await fetchAllPublicRoutines();
            setRoutineList(results);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <div id='routines'>
                <h2>All Routines:</h2>
                <p>Welcome to Fitness Trac.kr routines! This is where activities work together so you can workout better.</p>
                {routineList.length > 0 && routineList.map(({name, goal, creatorName, activities, id}) => {
                    return <div key={id} className='card routine'>
                        <h3>Routine: <span className='name'>{name}</span></h3>
                        <p>Goal: {goal}</p>
                        <div className='routine-activities'>
                            <p>Activities: </p>
                            <ul>
                                {activities.length > 0 && activities.map(({name, description, count, duration, routineActivityId}) => {
                                    return <li key={routineActivityId}>{name}: {description} | <span className='count'>Count: {count}</span> | <span className='duration'>Duration: {duration}</span></li>
                                })}
                            </ul>
                        </div>
                        <p>Created by: {creatorName}</p>
                    </div>
                })}
            </div>
        </>
    )
}

export default Routines;