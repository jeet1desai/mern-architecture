import { combineReducers } from 'redux';

import { login } from './login.reducer';
import { registration } from './registration.reducer';
import { verifyToken } from './token.reducer';
import { contacts } from './contact.reducer';

const rootReducer = combineReducers({
    registration,
    login,
    verifyToken,
    contacts
});

export default rootReducer;