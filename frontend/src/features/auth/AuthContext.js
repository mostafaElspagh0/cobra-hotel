import {createContext, useState} from "react";
import axios from "axios";
const AuthContext = createContext();

const AuthProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    function jwt_decode(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }

    const signIn = (email , password) => {
        const data = {
            email,
            password
        };
         axios.post("http://localhost:4000/auth/login", data)
            .then(res => {
                if(res.status === 200 && res.data.token) {
                    const decoded = jwt_decode(res.data.token);
                    setIsAuthenticated(true);
                    localStorage.setItem("token", res.data.token);
                    setUser(decoded);
                }
                throw new Error("Invalid Credentials");
            })
            .catch(err => {
                console.log(err);
            });
    };
    return (
        <AuthContext.Provider value={
            {
                isAuthenticated,
                user,
                signIn
            }
        }>
            {props.children}
        </AuthContext.Provider>
    );
}

export {AuthContext, AuthProvider};