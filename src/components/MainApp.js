import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import ErrorPage from "./ErrorPage";
import ListUsers from "./ListUsers";
import Header from "./Header";
import Logout from "./Logout";
import AuthProvider, { useAuth } from "../security/AuthContext";
import Register from "./Register";

function AuthenticatedRoute({children}) {
    const authContext = useAuth();

    if (authContext.isAuthenticated) {
        return children
    }
    return <Navigate to="/" />
}

function Homepage() {

    // const [jwt, setJwt] = useLocalState("", "jwt");

    // if(!jwt) {
    //     const reqBody = {
    //     username: "admin",
    //     password: "password"
    //     }

    //     fetch("authenticate/login", {
    //         headers: {
    //         "Content-Type": "application/json"
    //         },
    //         method: "post",
    //         body: JSON.stringify(reqBody)
    //     }).then((response) => response.json())
    //     .then((data) => {
    //         setJwt(data.token);
    //     });
    // }

    return(
        <div className="App">
            <AuthProvider>
                <BrowserRouter>
                <Header/>
                    <Routes>
                        <Route path="/" element={<Login/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/dashboard/:username" 
                            element={
                                <AuthenticatedRoute>
                                    <Dashboard/>
                                </AuthenticatedRoute>
                            }/>
                        <Route path="/listusers" 
                            element={
                                <AuthenticatedRoute>
                                    <ListUsers/>
                                </AuthenticatedRoute>
                            }/>
                        <Route path="/logout" 
                            element={
                                <AuthenticatedRoute>
                                    <Logout/>
                                </AuthenticatedRoute>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="*" element={<ErrorPage/>}/>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
    
}

export default Homepage;