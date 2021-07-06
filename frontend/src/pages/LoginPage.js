import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import userActions from '../actions/user.action';


function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();
        if (email && password) {
            dispatch(userActions.login(email, password));
        }
    }
    
    return (
        <div className="container my-5 col-6">
            <h3 className="my-4">Login</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address *</label>
                    <input type="email" className="form-control"
                        id="email" placeholder="Email..."
                        onChange={(e) => setEmail(e.target.value)} value={email}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password *</label>
                    <input type="password" className="form-control"
                        id="password" placeholder="Password..."
                        onChange={(e) => setPassword(e.target.value)} value={password}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/register">
                    <Button variant="outlined" color="primary">Register</Button>
                </Link>
                <Link to="/">
                    <Button variant="outlined" color="primary">Home Page</Button>
                </Link>
            </form>
        </div>
    )
}

export default LoginPage
