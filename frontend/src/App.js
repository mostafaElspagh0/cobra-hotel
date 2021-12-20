import React, {Fragment, useContext, useEffect} from 'react';
import SignInPage from "./features/auth/components/SignInPage";
import {Route, Routes,useNavigate,useLocation} from "react-router-dom";
import {AuthContext} from "./features/auth/AuthContext";
function App() {
    const {isAuthenticated , user} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if(!isAuthenticated && location.pathname !== '/login'){
            navigate('/login');
        }
        if(isAuthenticated && location.pathname === '/login'){
            navigate('/');
        }
    }, [isAuthenticated,location.pathname,navigator]);
    return (
        <Fragment>
            <Routes>
                <Route path="/login" element={<SignInPage />} />
                <Route path="/" element={<div>{"fdfsf"}</div>} />
            </Routes>
        </Fragment>
    );
}

export default App;
