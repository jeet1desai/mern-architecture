import React, { useEffect } from 'react';
import MaterialTable from "material-table";
import { useDispatch, useSelector } from 'react-redux';
import contactActions from '../actions/contact.action';

function UsersPage() {

    const users = useSelector(state => state.contacts.items);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(contactActions.getAllContact());
    }, [dispatch]);

    return (
        <div className="container my-5">
            <MaterialTable
                columns={[
                    { title: "Name", field: "name" },
                    { title: "Email", field: "email" },
                    { title: "Phone", field: "phone" },
                ]}
                data={users}
                title="Contact Table"
                options={{
                    exportButton: true
                }}
                editable={{
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                dispatch(contactActions.addContact(newData));
                                resolve();
                            }, 1000);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(async () => {
                                dispatch(contactActions.updateContact(newData, oldData._id));
                                resolve();
                            }, 1000);
                        }),
                    onRowDelete: oldData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                dispatch(contactActions.deleteContact(oldData._id));
                                resolve();
                            }, 1000);
                        }),
                }}
            />
        </div>
    )
}

export default UsersPage
