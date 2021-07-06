import { USER_API } from "../constants/api.constant";


const userService = {
    register,
    login,
    verifyToken,
};

export default userService;

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${USER_API}/register`, requestOptions).then(handleResponse);
}


function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${USER_API}/login`, requestOptions)
        .then(handleResponse)
        .then(({token, user}) => {
            // localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);
            return user;
        });
}

function verifyToken(token) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(token)
    };

    return fetch(`${USER_API}/tokenIsValid`, requestOptions)
        .then(handleResponse);
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // logout();
                // location.reload(true);
                // console.log(data.msg);
            }
            const error = (data && data.msg) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}