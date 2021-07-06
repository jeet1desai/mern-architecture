import userConstants from '../constants/user.constant';


export function verifyToken(state = {}, action) {
    switch (action.type) {
        case userConstants.TOKEN_REQUEST:
            return { verifingToken: true };
        case userConstants.TOKEN_SUCCESS:
            return { user: action.user.user };
        case userConstants.TOKEN_FAILURE:
            return {};
        default:
            return state
    }
}