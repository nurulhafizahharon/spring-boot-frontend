import { Link, useParams } from "react-router-dom";
// import { retrieveUserLevelApi } from "../api/UserApiService";
import { useAuth } from "../security/AuthContext";
import axios from "axios";
import { useState } from "react";

function Dashboard() {

    const {username} = useParams();
    const authContext = useAuth();
    const [message, setMessage] = useState(null);
    
    function callUserLevelApi() {

        axios.get("http://localhost:8020/user/", {headers: { Authorization: authContext.token}})
            .then((response) => successfulResponse(response))
            .catch((error) => errorResponse(error))
            .finally(() => console.log("cleanup"));
        // retrieveUserLevelApi(authContext.token)
        //     .then((response) => {
        //         console.log(response.data.message);
        //     })
        //     .catch((error) => console.log(error));

    }

    function successfulResponse(response) {
    console.log(response);
    // setMessage(response.data);
    setMessage(response.data.message);
  }
  function errorResponse(error) {
    console.log(error);
  }
    return (
        <>
            <h1>Dashboard</h1>
            <p>Welcome {username}!</p>
            <Link to="/listusers">Manage the users</Link>
            <button className="btn btn-success m-5" onClick={callUserLevelApi}>Call User Level</button>
            <div className="text-info">{message}</div>
        </>
    );
}

export default Dashboard;