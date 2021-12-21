import React, {Fragment} from 'react';
import SignInPage from "./features/auth/components/SignInPage";
import {Route, Routes} from "react-router-dom";
import DashBoardPage from "./features/dashBoard/components/DashBoardPage";
function App() {
    return (
        <Fragment>
            <Routes>
                <Route path="/login" element={<SignInPage />} />
                <Route path="/dashboard/*" element={<DashBoardPage/>} />
                <Route path="/" element={<DashBoardPage/>} />

            </Routes>
        </Fragment>
    );
}

export default App;
