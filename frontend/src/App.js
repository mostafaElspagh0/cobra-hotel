import React, {Fragment} from 'react';
import SignInPage from "./features/auth/components/SignInPage";
import {Navigate, Route, Routes} from "react-router-dom";
import DashBoardPage from "./features/dashBoard/components/DashBoardPage";
function App() {
    return (
        <Fragment>
            <Routes>
                <Route path="/login" element={<SignInPage />} />
                <Route path="/dashboard/*" element={<DashBoardPage/>} />
                <Route path="/" element={<Navigate path='/' to='dashboard'/>} />

            </Routes>
        </Fragment>
    );
}

export default App;
