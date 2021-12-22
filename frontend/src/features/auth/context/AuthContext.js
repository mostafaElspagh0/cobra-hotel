import {createContext, useEffect, useState} from "react";
import axios from "axios";
import config from "../../../config/config";

const AuthContext = createContext();

const AuthProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwt_decode(token);
            const currentTime = Date.now() / 1000;
            return decoded.exp >= currentTime;
        }
        return false;
    });
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem("token");
        if (token) {
            return jwt_decode(token);
        }
        return null;
    });
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);
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
    }, [isAuthenticated]);
    const getRole = () => {
        if (user) {
            return user.user.job_type;
        }
        return null;
    };
    function jwt_decode(token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        } catch (e) {
            return null;
        }
    }
    const dismissError = () => {
        setStatus(null);
    };
    const signIn = (email, password) => {
        setStatus('loading');
        const data = {
            email,
            password
        };
        axios.post(`${config.api_url}/auth/login`, data)
            .then(res => {
                if (res.status === 200 && res.data.token) {
                    const decoded = jwt_decode(res.data.token);
                    setIsAuthenticated(true);
                    localStorage.setItem("token", res.data.token);
                    setUser(decoded);
                    setStatus('success');
                } else if (res.status === 200 && !res.data.token && res.data.errors) {
                    setStatus('error');
                    setError(res.data.errors[0].msg);
                } else {
                    setStatus('error');
                    setError("Something went wrong");
                }
            })
            .catch(err => {
                setStatus('error');
                setError(err.message);
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
                signOut,
                status,
                error,
                dismissError,
                getRole
            }
        }>
            {props.children}
        </AuthContext.Provider>
    );
}

export {AuthContext, AuthProvider};