import React from 'react';
import {Link} from 'react-router-dom';

const Home = () => {
    return (
        <>
            <h2>Welcome to Fitness Trac.kr!</h2>
            <p><em>Don't walk into the gym without a plan!</em></p>
            <p>With Fitness Trac.kr, you can create custom <strong><Link to='/activities'>ACTIVITIES</Link></strong> or take advantage of what other users have already contributed. If you're ready for a workout, check out the <strong><Link to='/routines'>ROUTINES</Link></strong> our registered users have customized for you!</p>
            <p>Interested in building your own routines? <Link to='/account/register'>Create an account</Link> with us! You can keep your routines private or share them with everyone else.</p>
        </>
    )
}

export default Home;