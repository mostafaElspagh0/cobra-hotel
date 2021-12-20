import {createContext, useEffect, useState} from "react";
import axios from "axios";
import config from "../../config/config";
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

    useEffect(() => {

        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwt_decode(token);
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
                localStorage.removeItem("token");
                setIsAuthenticated(false);
                setUser(null);
            } else {
                setIsAuthenticated(true);
                setUser(decoded);
            }
        }
    }, []);
    const signIn = (email , password) => {
        console.log(config)
        const data = {
            email,
            password
        };
         axios.post(`${config.api_url}/auth/login`, data)
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
    const signOut = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUser(null);
    };
    return (
        <AuthContext.Provider value={
            {
                isAuthenticated,
                user,
                signIn,
                signOut
            }
        }>
            {props.children}
        </AuthContext.Provider>
    );
}

export {AuthContext, AuthProvider};