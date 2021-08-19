import React, { Fragment, useEffect, useState, useContext } from 'react'
import axiosInstance from 'axios/axiosInstance'
import { CustomToastContext } from 'context/CustomToastContext'

export default function Home() {

    const [users, setUsers] = useState([])

    const { setToastConfig } = useContext(CustomToastContext)

    useEffect(() => {
        axiosInstance().get("/users?page=1").then(({ data: { data } }) => {
            setUsers(data);
            setToastConfig({ show: true, type: "success", message: "Data Loaded Successfully." });
        }).catch((error) => {
            setToastConfig(error);
        })
    }, [setUsers, setToastConfig])

    return (
        <Fragment>
            {
                users.map((user) => (
                    <div key={user.id} className="flex mb-3 flex-col rounded">
                        <div className="flex gap-5">
                            <div>{user.id}</div>
                            <div className="w-12 object-fit">
                                <img src={user.avatar} alt={user.first_name} className="rounded-full" />
                            </div>
                            <div>{user.first_name} {user.last_name}</div>
                            <div>{user.email}</div>
                        </div>
                    </div>
                ))
            }

            <button
                className="mt-10 p-2 bg-red-600 border border-red-600 text-white hover:bg-red-700 focus:bg-red-700 rounded"
                onClick={() => {
                    setToastConfig({ show: true, type: "error", message: "This is danger toaster" });
                }}>Show Error Toaster</button>
        </Fragment>
    )
}
