import contactConstants from '../constants/contact.constant';
import contactService from '../services/contact.service';
import { toast } from 'react-toastify';

const contactActions = {
    getAllContact,
    addContact,
    updateContact,
    deleteContact
};


export default contactActions;

function getAllContact() {
    return dispatch => {
        dispatch(request());

        contactService.getAllContact()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: contactConstants.GET_ALL_CONTACT_REQUEST } }
    function success(users) { return { type: contactConstants.GET_ALL_CONTACT_SUCCESS, users } }
    function failure(error) { return { type: contactConstants.GET_ALL_CONTACT_FAILURE, error } }
}

function addContact(user) {
    return dispatch => {
        dispatch(request());

        contactService.addContact(user)
            .then(
                user => {
                    dispatch(success(user))
                    toast.success('New data added successfully');
                },
                error => {
                    dispatch(failure(error.toString()));
                    toast.error(error.toString());
                }
            );
    };

    function request() { return { type: contactConstants.ADD_CONTACT_REQUEST } }
    function success(user) { return { type: contactConstants.ADD_CONTACT_SUCCESS, user } }
    function failure(error) { return { type: contactConstants.ADD_CONTACT_FAILURE, error } }
}

function updateContact(user, id) {
    return dispatch => {
        dispatch(request());

        contactService.updateContact(user, id)
            .then(
                user => {
                    dispatch(success(user, id))
                    toast.success('Data updated successfully');
                },
                error => {
                    dispatch(failure(error.toString()));
                    toast.error(error.toString());
                }
            );
    };

    function request() { return { type: contactConstants.UPDATE_CONTACT_REQUEST } }
    function success(user, id) { return { type: contactConstants.UPDATE_CONTACT_SUCCESS, user, id } }
    function failure(error) { return { type: contactConstants.UPDATE_CONTACT_FAILURE, error } }
}

function deleteContact(id) {
    return dispatch => {
        dispatch(request(id));

        contactService.deleteContact(id)
            .then(
                user => {
                    dispatch(success(user._id))
                    toast.success('Data deleted successfully');
                },
                error => {
                    dispatch(failure(error.toString()));
                    toast.error(error.toString());
                }
            );
    };

    function request(id) { return { type: contactConstants.DELETE_CONTACT_REQUEST, id } }
    function success(id) { return { type: contactConstants.DELETE_CONTACT_SUCCESS, id } }
    function failure(error) { return { type: contactConstants.DELETE_CONTACT_FAILURE, error } }
}