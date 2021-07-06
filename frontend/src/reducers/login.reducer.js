import userConstants from '../constants/user.constant';


export function login(state = {}, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return { loggingIn: true };
        case userConstants.LOGIN_SUCCESS:
            return {};
        case userConstants.LOGIN_FAILURE:
            return {};
        default:
            return state
    }
}