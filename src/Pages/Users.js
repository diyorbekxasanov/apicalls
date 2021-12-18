import {React, useState, useEffect} from 'react'
import { getDo } from '../servises'

function Users() {
    const [users, getUsers] = useState([])
    async function UsersDo() {
        const a = await getDo("/users")
        getUsers(a)
    }
    useEffect(()=>{
        UsersDo()
    },[])
    return (
        <div>
            <h1 className="text-center">users</h1>
            <div className="row">
                <div className="col-8 offset-2">
                    <table className="table table-bordered table-striped table-hover text-center">
                        <thead>
                            <tr>
                                <th>N</th>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((item,index)=>
                                <tr key={index}>
                                    <td>{item.id} </td>
                                    <td>{item.name} </td>
                                    <td>{item.username} </td>
                                    <td>{item.email} </td>
                                </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Users
