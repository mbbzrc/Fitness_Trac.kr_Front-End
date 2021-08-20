import React, { useEffect } from 'react';
import {storeCurrentUser} from '../auth';

import {
    Route,
    Switch
} from 'react-router-dom';

import {
    Login,
    Register
} from './index';

import {clearCurrentUser} from '../auth';

const Account = ({currentUser, setCurrentUser}) => {
    const handleLogout = () => {
        clearCurrentUser();
        setCurrentUser({
            username: '',
            loggedIn: false
        });
    }

    useEffect(() => {
        storeCurrentUser(currentUser);
    }, [currentUser])

    return (
        <div className='account'>
        {currentUser.loggedIn ? (
            <>
                <h2>Welcome, {currentUser.username}!</h2>
                <div><a href='#' onClick={handleLogout}>Log out</a></div>
            </>
        ) : (
            <Switch>
                <Route path='/account/login'>
                    <Login setCurrentUser={setCurrentUser} />
                </Route>
                <Route path='/account/register'>
                    <Register setCurrentUser={setCurrentUser} />
                </Route>
            </Switch>                
        )}
        </div>
    );
}

export default Account;