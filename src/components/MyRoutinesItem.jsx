import React, {useState} from 'react';

import {deleteRoutine} from '../api';
import MyRoutinesItemEdit from './MyRoutinesItemEdit';

const MyRoutinesItem = ({fetchData, checkRoutineList, name, goal, creatorName, activities, isPublic, id}) => {
    const [toggle, setToggle] = useState(false)

    const [pendingActivities, setPendingActivities] = useState([]);

    const handleEditToggle = () => {
        setToggle(!toggle);
    }

    const handleDelete = async (id) => {
        try {
            const results = await deleteRoutine(id);
            fetchData();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
        {!toggle ? (
            <div key={id} className='card routine'>
                <h3>Routine: <span className='name'>{name}</span></h3>
                <p>Goal: {goal}</p>
                {activities.length > 0 &&
                <div className='routine-activities'>
                    <p>Activities: </p>
                    <ul>
                        {activities.map(({name, description, count, duration, routineActivityId}) => {
                            return <li key={routineActivityId}>
                                <span className='name'>{name}: </span>
                                <span className='description'>{description} </span>
                                ({count} {count > 1 ? 'reps' : 'rep'} for {duration} {duration > 1 ? 'mins' : 'min'})
                            </li>
                        })}
                    </ul>
                </div>
                }
                <p>Status: {isPublic ? <span>public</span> : <span>private</span>}</p>
                <p>Created by: {creatorName}</p>
                <span className='material-icons' onClick={() => handleDelete(id)}>delete</span>
                <span className='material-icons' onClick={handleEditToggle}>edit</span>
            </div>
        ) : (
            <MyRoutinesItemEdit
                fetchData={fetchData}
                pendingActivities={pendingActivities}
                setPendingActivities={setPendingActivities}
                checkRoutineList={checkRoutineList}
                toggle={toggle}
                setToggle={setToggle}
                name={name}
                goal={goal}
                creatorName={creatorName}
                isPublic={isPublic}
                id={id} />
        )}
        </>
    )
}

export default MyRoutinesItem;