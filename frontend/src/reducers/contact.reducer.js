import contactConstants from "../constants/contact.constant";

const initialState = { loading: false, items: [], error: "" }

export function contacts(state = initialState, action) {
    switch (action.type) {
        case contactConstants.GET_ALL_CONTACT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case contactConstants.GET_ALL_CONTACT_SUCCESS:
            return {
                ...state,
                items: action.users
            };
        case contactConstants.GET_ALL_CONTACT_FAILURE:
            return {
                ...state,
                error: action.error
            };


        case contactConstants.ADD_CONTACT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case contactConstants.ADD_CONTACT_SUCCESS:
            return {
                ...state,
                items: [...state.items, action.user]
            };
        case contactConstants.ADD_CONTACT_FAILURE:
            return {
                ...state,
                error: action.error
            };


        case contactConstants.UPDATE_CONTACT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case contactConstants.UPDATE_CONTACT_SUCCESS:
            return {
                ...state,
                items: state.items.map((u) => (
                    u._id === action.id ? action.user : u
                ))
            };
        case contactConstants.UPDATE_CONTACT_FAILURE:
            return {
                ...state,
                error: action.error
            };


        case contactConstants.DELETE_CONTACT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case contactConstants.DELETE_CONTACT_SUCCESS:
            return {
                ...state,
                items: state.items.filter((u)=> u._id !== action.id)
            };
        case contactConstants.DELETE_CONTACT_FAILURE:
            return {
                ...state,
                error: action.error
            };


        default:
            return state
    }
}