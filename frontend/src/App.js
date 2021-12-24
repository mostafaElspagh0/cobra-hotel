import React, {Fragment} from 'react';
import SignInPage from "./features/auth/components/SignInPage";
import {Navigate, Route, Routes, useParams} from "react-router-dom";
import RequireRole from "./features/auth/components/RequireRole";
import DashBoardPage from "./features/dashBoard/components/DashBoardPage";
import Hr from "./features/hr/components/Hr";
import EditEmployee from "./features/hr/components/EditEmployee";
import ForgetPassword from "./features/auth/components/ForgetPassword";
import Orders from "./features/Orders/Component/Orders";
import SendEmailPage from "./features/mail/component/SendEmailPage";
import Announcement from "./features/Announcment/Announcement";
import Arrival from "./features/arrival/component/Arrival";
import Clean from "./features/Cleaning/Clean";
const Com = () => {
        let c = useParams();
        return <div>{c.id}</div>

};
function App() {
    return (
        <Fragment>
            <Routes>
                <Route path="/login" element={<SignInPage />} />
                <Route path="/forgot-password" element={<ForgetPassword />} />
                <Route path="/dashboard" element={<DashBoardPage/>} >
                    <Route path="employee" element={<RequireRole roles={['Manager','Hr']}><Hr/></RequireRole>} >
                        <Route path="edit/:id" element={<EditEmployee/>} />
                    </Route>
                    <Route path="email" element={<RequireRole roles={['Manager','Hr']}><SendEmailPage/></RequireRole>} />
                    <Route path="Orders" element={<RequireRole roles={['Manager','Barista']}><Orders/></RequireRole>} />
                    <Route path="Announcement" element={<RequireRole roles={['Manager',"Hr"]}><Announcement/></RequireRole>} />
                    <Route path="Arrival" element={<RequireRole roles={['Manager',"Hr"]}><Arrival/></RequireRole>} />
                    <Route path="Cleaning" element={<RequireRole roles={['Manager',"Hr"]}><Clean/></RequireRole>} />
                    <Route path=":id" element={<Com/>} />
                </Route>
                <Route path="/" element={<Navigate path='/' to='dashboard'/>} />

            </Routes>
        </Fragment>
    );
}

export default App;
