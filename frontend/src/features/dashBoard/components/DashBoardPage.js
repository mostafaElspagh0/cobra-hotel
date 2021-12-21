import {AuthContext} from "../../auth/AuthContext";
import {Navigate} from "react-router-dom";
import Nav from "../../../common/components/Nav";

const {useContext} = require("react");

const DashBoardPage = () => {
    const {isAuthenticated, getRole} = useContext(AuthContext);
    if (!isAuthenticated) {
        return <Navigate to="/login"/>
    }
    const getPages = (role) => {
        const pages = {
            'Employee': {
                name: "Employee",
                path: "/Employee",
                component: () => {
                    return <div>Dashboard</div>
                }
            },
            'Announcement': {
                name: "Announcement",
                path: "/Announcement",
                component: () => {
                    return <div>Dashboard</div>
                }
            },
            'Send E-mail': {
                name: "Send E-mail",
                path: "/Send E-mail",
                component: () => {
                    return <div>Dashboard</div>
                }
            },
            'Orders': {
                name: "Orders",
                path: "/Orders",
                component: () => {
                    return <div>Dashboard</div>
                }
            },
            'Storage': {
                name: "Storage",
                path: "/Storage",
                component: () => {
                    return <div>Dashboard</div>
                }
            },
            'Arrival': {
                name: "Arrival",
                path: "/Arrival",
                component: () => {
                    return <div>Dashboard</div>
                }
            },
            'Cleaning': {
                name: "Cleaning",
                path: "/Cleaning",
                component: () => {
                    return <div>Dashboard</div>
                }
            }
        };
        switch (role) {
            case 'Manager':
                return [
                    pages['Employee'],
                    pages['Announcement'],
                    pages['Send E-mail'],
                    pages['Orders'],
                    pages['Storage'],
                    pages['Arrival'],
                    pages['Cleaning']
                ];
            case 'Hr':
                return [
                    pages['Employee'],
                    pages['Announcement'],
                    pages['Send E-mail'],
                ];
            case 'Receptionist':
                return [
                    pages['Orders'],
                    pages['Storage'],
                    pages['Arrival'],
                    pages['Cleaning']
                ];

            case 'Barista':
                return [
                    pages['Orders'],
                    pages['Storage'],
                ];
            default:
                return [];

        }

    }
    return (
        <div>
            <Nav pages={getPages(getRole())}/>
        </div>
    )
}


export default DashBoardPage;