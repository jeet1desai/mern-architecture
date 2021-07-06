import { CONTACT_API } from "../constants/api.constant";


const contactService = {
    getAllContact,
    addContact,
    updateContact,
    deleteContact,
};

export default contactService;


function getAllContact() {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${CONTACT_API}`, requestOptions).then(handleResponse);
}


function addContact(user){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${CONTACT_API}`, requestOptions).then(handleResponse);
}


function updateContact(user, id){
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${CONTACT_API}/${id}`, requestOptions).then(handleResponse);
}

function deleteContact(id){
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id})
    };

    return fetch(`${CONTACT_API}/${id}`, requestOptions).then(handleResponse);
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