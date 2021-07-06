import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import userActions from '../actions/user.action';


function HomePage() {

    const user = useSelector(state => state.verifyToken.user);
    const dispatch = useDispatch();

    const history = useHistory();

    useEffect(() => {
        let token = localStorage.getItem('token');
        dispatch(userActions.verifyToken({ token }));
    }, [dispatch])


    const logout = () => {
        localStorage.removeItem('token');
        history.push('/login');
    }


    return (
        <div className="home-main">
            {user ?
                <>
                    <div className="l-main">
                        <div>
                            <span className="name">{user.displayName}</span>
                            <Button variant="outlined" color="secondary" onClick={logout}>Logout</Button>
                        </div>
                        <Link to="/users">
                            <Button variant="outlined">Users</Button>
                        </Link>
                    </div>
                </> :
                <>
                    <Link to="/login">
                        <Button variant="outlined">Login</Button>
                    </Link>
                    <Link to="/register">
                        <Button variant="outlined" color="primary">Register</Button>
                    </Link>
                </>
            }


        </div>
    )
}

export default HomePage
