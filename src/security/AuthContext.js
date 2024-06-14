import { createContext, useContext, useState } from "react";
import { executeJwtAuthenticationService, executeRegisterService } from "../api/AuthenticationApiService";
import { apiClient } from "../api/ApiClient";

// create context
export const AuthContext = createContext();

// create hook to let the other components to use
export const useAuth = () => useContext(AuthContext);

// Share the created context with other components
function AuthProvider({children}) {

    // Put some state in the context
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [token, setToken] = useState(null);
    const [username, setUsername] = useState(null);

    async function login(username, password) {
        try {
            const response = await executeJwtAuthenticationService(username, password);
            if(response.status === 200) {
                const jwtToken = "Bearer " + response.data.token;
                setAuthenticated(true);
                setUsername(username);
                setToken(jwtToken);

                apiClient.interceptors.request.use((config) => {
                    console.log("intercepting and adding a token");
                    config.headers.Authorization = jwtToken;
                    return config;
                });
                return true;
            } else {
                logout();
                return false;
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    async function register(username, password) {
        try {
            const response = await executeRegisterService(username, password);
            if(response.status === 200) {
                console.log("User created");
                return true;
            } else {
                console.log("Unable to create user.")
                return false;
            }
            
        } catch (error) {
            console.log(error);
        }
    }
    // function login(username, password) {
    //     if (username === "admin" && password === "password") {
    //         setAuthenticated(true);
    //         return true;
            
    //     } else {
    //         setAuthenticated(false);
    //         return false;
    //     }
    // }

    function logout() {
        setAuthenticated(false);
        setUsername(null);
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout, register, token, username}}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider;