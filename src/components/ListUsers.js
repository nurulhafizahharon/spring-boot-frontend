import { useEffect, useState } from "react";
import { deleteUserApi, retrieveAllUsersApi } from "../api/UserApiService";
import { useAuth } from "../security/AuthContext";

function ListUsers() {
    // const users = [
    //     {id: 1, username: "admin"},
    //     {id: 2, username: "fiza"},
    //     {id: 3, username: "anthony"}
    // ];

    const [message, setMessage] = useState(null);
    const [users, setUsers] = useState([]);
    const token = useAuth().token;

    useEffect(() => refreshUsers(), []);

    function refreshUsers() {
        retrieveAllUsersApi(token)
            .then((response) => {
                console.log(response.data);
                setUsers(response.data)
            })
            .catch((error) => console.log(error));
    }

    function deleteUser(username, id) {
        console.log("clicked " + id);
        deleteUserApi(id, token)
            .then(() => {
                setMessage(`Delete username ${username} is successful`);
                refreshUsers();
            })
            .catch((error) => console.log(error));
    }

    return (
        <div className="container">
            <h1>List of the users</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.userId}>
                                <td>{user.userId}</td>
                                <td>{user.username}</td>
                                <td>
                                    <button className="btn btn-warning" 
                                        onClick={() => deleteUser(user.username, user.userId)}>
                                            Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListUsers;