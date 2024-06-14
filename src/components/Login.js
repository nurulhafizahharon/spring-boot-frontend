import { /*useEffect,*/ useState } from "react";
// import { useLocalState } from "../util/useLocalStorage";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthContext";

function Login() {

    // const [jwt, setJwt] = useLocalState("", "jwt");
    const [username, setUsername] = useState("admin");
    const [password, setPassword] = useState("password");
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const navigate = useNavigate();

    const authContext = useAuth();


    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    async function handleLogin() {
        if (await authContext.login(username, password)) {
            navigate(`/dashboard/${username}`)
            
        } else {
            setShowErrorMessage(true);
        }

        // console.log("Sending a request...");
        // try {
        //     const response = axios.post(`http://localhost:8020/authenticate/login`, {username, password});
        //     console.log(response);
        // } catch (error) {
        //     console.log(error);
        // }
        
        // if(!jwt) {
            // const reqBody = {
            //     username: username,
            //     password: password
            // }

            // fetch("authenticate/login", {
            //     headers: {
            //     "Content-Type": "application/json"
            //     },
            //     method: "post",
            //     body: JSON.stringify(reqBody)
            // }).then((response) => {
            //     console.log(response);
            //     if(response.status === 200)
            //         return response.json();
            //     else
            //         return Promise.reject("Invalid login attempt.");
            // })
            // .then((data) => {
            //     setJwt(data.token);
            // }).catch((message) => {
            //     console.log(message);
            //     alert(message);
            // });
        // }
    }

    return (
        <>
            <h2>Welcome! Please login.</h2>
            {showErrorMessage && <div>Authenticated Failed</div>}
            <div>
                <label htmlFor="username">Username: </label>
                <input 
                    type="text" 
                    name="username"
                    value={username} 
                    onChange={handleUsernameChange}
                    onKeyDown={(e) => {
                        if(e.key === "Enter" && username) {
                            handleLogin();
                        }
                    }}/>
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <input 
                    type="password"
                    name="password" 
                    value={password} 
                    onChange={handlePasswordChange}
                    onKeyDown={(e) => {
                        if(e.key === "Enter" && username) {
                            handleLogin();
                        }
                    }}/>
            </div>
            <div>
                <button 
                    type="button"
                    name="login"
                    onClick={handleLogin}>Login</button>
            </div>
        </>
    );
}

export default Login;