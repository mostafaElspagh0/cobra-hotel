import {AuthContext} from "../../auth/context/AuthContext";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import Nav from "../../../common/components/Nav";
import Box from "@mui/material/Box";
const {useContext} = require("react");

const DashBoardPage = () => {
    const {isAuthenticated, getRole} = useContext(AuthContext);
    const location = useLocation();
    const activePagePath = decodeURI(location.pathname).split('/')[2];
    if (!isAuthenticated) {
        return <Navigate to="/login"/>
    }
    const getPages = (role) => {
        // TODO: refactor this can done in a better way
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
                path: "email",
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
            },
            'rooms': {
                name: "Rooms",
                path: "rooms",
                component: () => {
                    return <div>Dashboard</div>
                }
            },
            'Reservation': {
                name: "Reservation",
                path: "Reservation",
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
                    pages['Cleaning'],
                    pages['rooms'],
                    pages['Reservation']
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
                    pages['Cleaning'],
                    pages['rooms'],
                    pages['Reservation']
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
        // decode the url
        console.log(ret)
        return ret.map(page => {
            console.log(page);
            return {
                name: page.name,
                path: page.path,
                component: page.component,
                isActive: page.path === activePagePath
            }
        });

    }
    return (
        <div style={{
                minHeight: "100vh",
                display: "flex",
                flexFlow: "column",
            }}>
            <Nav pages={getPages(getRole())} activePage={activePagePath}/>
            <Box style={{
                flex: 1,
            }}>
              <Outlet/>
            </Box>
        </div>
    )
}


export default DashBoardPage;