import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthContext";

function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const authContext = useAuth();

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    async function handleRegister() {
        if (await authContext.register(username, password)) {
            alert("You have register! Please login.");
            navigate("/");
        }
    }

    return(
        <div>
            <h1>Welcome!</h1>
            <p>Please fill up below and register.</p>
            <div>
                <label>Username: </label>
                <input type="text" 
                    name="username" 
                    value={username} 
                    onChange={handleUsernameChange} 
                    onKeyDown={(e) => {
                        if(e.key === "Enter" && username)
                            handleRegister();
                    }}/>
            </div>
            <div>
                <label>Password: </label>
                <input type="password" 
                name="password" 
                value={password} 
                onChange={handlePasswordChange}
                onKeyDown={(e) => {
                        if(e.key === "Enter" && username)
                            handleRegister();
                }}/>
            </div>
            <div>
                <button type="button"
                    name="register"
                    onClick={handleRegister}>Register</button>
            </div>
            
        </div>
    )
}

export default Register;