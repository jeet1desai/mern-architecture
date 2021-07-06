import userConstants from '../constants/user.constant';
import userService from '../services/user.service';
import { toast } from 'react-toastify';

const userActions = {
    register,
    login,
    verifyToken,
};

export default userActions;

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(user => {
                dispatch(success(user));
                // history.push('/login');
                toast.success('Registration successful');
                toast.info('Now login');
            },
                error => {
                    dispatch(failure(error.toString()));
                    toast.error(error.toString());
                }
            );
    };
    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function login(email, password) {
    return dispatch => {
        dispatch(request({ email }));

        userService.login(email, password)
            .then(
                user => {
                    dispatch(success(user));
                    // history.push(from);
                    toast.success('Login successful');
                    toast.info('Go to HomePage');
                },
                error => {
                    dispatch(failure(error.toString()));
                    toast.error(error.toString());
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function verifyToken(token) {
    return dispatch => {
        dispatch(request(token));

        userService.verifyToken(token)
            .then(
                user => {
                    dispatch(success(user));
                    // history.push(from);
                    // toast.success('Login successful');
                },
                error => {
                    dispatch(failure(error.toString()));
                    // toast.error(error.toString());
                }
            );
    };

    function request(token) { return { type: userConstants.TOKEN_REQUEST, token } }
    function success(user) { return { type: userConstants.TOKEN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.TOKEN_FAILURE, error } }
}