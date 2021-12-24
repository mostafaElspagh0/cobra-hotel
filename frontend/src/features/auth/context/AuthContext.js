import {createContext, useState} from "react";
import decodeToken from "../utils/decodeToken";
import * as Api from "../api/AuthApi"

const AuthContext = createContext({
    isAuthenticated : false,
    user : {},
    signIn : ()=>{},
    signOut: ()=>{},
    status: null,
    error: null,
    dismissError: ()=>{},
    getToken: ()=>{},
});

const AuthProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = decodeToken(token)
            if (!decoded) {
                return false;
            }
            const currentTime = Date.now() / 1000;
            return decoded.exp >= currentTime;
        }
        return false;
    });
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem("token");
        if (token) {
            return decodeToken(token);
        }
        return null;
    });
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    const getToken = () => {
        return localStorage.getItem("token");
    };

    const forgetPassword = async (email)=>{

        try {
            let res = await Api.forgetPassword(email);
            if(res.status === 200){
                setStatus("success");
                setError(null);

            }else{
                setStatus("error");
                setError("invalid email");
            }
        } catch (e) {

            setStatus("error");
            setError("invalid email");
        }
    };



    const getRole = () => {
        if (user) {
            return user.user.job_type;
        }
        return null;
    };
    const dismissError = () => {
        setStatus(null);
    };
    const signIn = async (email, password) => {
        setStatus('loading');
        try {
            const token = await Api.signIn(email, password);
            const decoded = decodeToken(token);
            if (decoded) {
                localStorage.setItem("token", token);
                setIsAuthenticated(true);
                setUser(decoded);
                setStatus('success');
            } else {
                setStatus('error');
                setError("Invalid email or password");
            }
        } catch (e) {
            setStatus('error');
            setError("Something went wrong")
        }
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
                getRole,
                getToken,
                forgetPassword
            }
        }>
            {props.children}
        </AuthContext.Provider>
    );
}

export {AuthContext, AuthProvider};