import React, {Fragment} from 'react';
import SignInPage from "./features/auth/components/SignInPage";
import {Navigate, Route, Routes, useParams} from "react-router-dom";
import RequireRole from "./features/auth/components/RequireRole";
import DashBoardPage from "./features/dashBoard/components/DashBoardPage";
import Hr from "./features/hr/components/Hr";
import EditEmployee from "./features/hr/components/EditEmployee";
const Com = () => {
        let c = useParams();
        return <div>{c.id}</div>

};
function App() {
    return (
        <Fragment>
            <Routes>
                <Route path="/login" element={<SignInPage />} />
                <Route path="/dashboard" element={<DashBoardPage/>} >
                    <Route path="employee" element={<RequireRole roles={['Manager','Hr']}><Hr/></RequireRole>} >
                        <Route path="edit/:id" element={<EditEmployee/>} />
                    </Route>
                    <Route path="Orders" element={<RequireRole roles={['Manager']}><Com/>sadfasflkj</RequireRole>} />
                    <Route path="Announcement" element={<RequireRole roles={['Manager',"Hr"]}><Com/>sadfasflkj</RequireRole>} />
                    <Route path=":id" element={<Com/>} />
                </Route>
                <Route path="/" element={<Navigate path='/' to='dashboard'/>} />

            </Routes>
        </Fragment>
    );
}

export default App;
