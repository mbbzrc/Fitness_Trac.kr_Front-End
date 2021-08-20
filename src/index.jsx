import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom';

import {checkToken, getCurrentUser} from './auth';

import {
    Routines,
    MyRoutines,
    Activities,
    Account,
    Home
} from './components';

const App = () => {
    const getStoredUsername = () => {
        if (getCurrentUser()) {
            const storedUser = getCurrentUser();
            if (storedUser.hasOwnProperty('username')) {
                const storedUsername = storedUser.username;
                return storedUsername;
            } else {
                return '';
            }
        } else {
            return '';
        }
    }

    const [currentUser, setCurrentUser] = useState({
        username: getStoredUsername(),
        loggedIn: checkToken() ? true : false
    });

    return (
        <div className='app'>
            <h1>Fitness Trac.kr</h1>
            <Router>
                <nav>
                    <Link to='/'>Home</Link>
                    <Link to='/routines'>Routines</Link>
                    {currentUser.loggedIn ? <Link to='/my-routines'>My Routines</Link> : null}
                    <Link to='/activities'>Activities</Link>
                    <Link to={currentUser.loggedIn ? '/account' : '/account/login'}>Account</Link>                    
                </nav>
                <Switch>
                        <Route path='/routines'>
                            <Routines />
                        </Route>
                        <Route path='/my-routines'>
                            <MyRoutines currentUser={currentUser} />
                        </Route>
                        <Route path='/activities'>
                            <Activities currentUser={currentUser} />
                        </Route>
                        <Route path='/account'>
                            <Account currentUser={currentUser} setCurrentUser={setCurrentUser} />
                        </Route>
                        <Route path='/'>
                            <Home />
                        </Route>
                    </Switch>
            </Router>
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);