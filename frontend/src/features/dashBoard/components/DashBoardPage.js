import {AuthContext} from "../../auth/AuthContext";
import {Navigate, Outlet} from "react-router-dom";
import Nav from "../../../common/components/Nav";
import {useState} from "react";
import Grid from "@mui/material/Grid";

const {useContext} = require("react");

const DashBoardPage = () => {
    const {isAuthenticated, getRole} = useContext(AuthContext);
    const [activePage, setActivePage] = useState("/Announcement");
    console.log(activePage);
    if (!isAuthenticated) {
        return <Navigate to="/login"/>
    }
    const getPages = (role, activePage) => {
        const pages = {
            // path should be same as the path in the url
            // path should be unique
            'Employee': {
                name: "Employee",
                path: "Employee",
                component: () => {
                    return <div>Dashboard</div>
                }
            },
            'Announcement': {
                name: "Announcement",
                path: "Announcement",
                component: () => {
                    return <div>Dashboard</div>
                }
            },
            'Send E-mail': {
                name: "Send E-mail",
                path: "Send E-mail",
                component: () => {
                    return <div>Dashboard</div>
                }
            },
            'Orders': {
                name: "Orders",
                path: "Orders",
                component: () => {
                    return <div>Dashboard</div>
                }
            },
            'Storage': {
                name: "Storage",
                path: "Storage",
                component: () => {
                    return <div>Dashboard</div>
                }
            },
            'Arrival': {
                name: "Arrival",
                path: "Arrival",
                component: () => {
                    return <div>Dashboard</div>
                }
            },
            'Cleaning': {
                name: "Cleaning",
                path: "Cleaning",
                component: () => {
                    return <div>Dashboard</div>
                }
            }
        };
        let ret = [];
        switch (role) {
            case 'Manager':
                ret = [
                    pages['Employee'],
                    pages['Announcement'],
                    pages['Send E-mail'],
                    pages['Orders'],
                    pages['Storage'],
                    pages['Arrival'],
                    pages['Cleaning']
                ];
                break;
            case 'Hr':
                ret = [
                    pages['Employee'],
                    pages['Announcement'],
                    pages['Send E-mail'],
                ];
                break;
            case 'Receptionist':
                ret = [
                    pages['Orders'],
                    pages['Storage'],
                    pages['Arrival'],
                    pages['Cleaning']
                ];
                break;
            case 'Barista':
                ret = [
                    pages['Orders'],
                    pages['Storage'],
                ];
                break;
            default:
                return [];
        }
        return ret.map(page => {
            console.log(page.path, activePage);
            return {
                name: page.name,
                path: page.path,
                component: page.component,
            }
        });

    }
    return (
        <div>
            <Grid minHeight="100vh">
                <Nav pages={getPages(getRole())} activePage={activePage}/>
                <Outlet/>
            </Grid>
        </div>
    )
}


export default DashBoardPage;