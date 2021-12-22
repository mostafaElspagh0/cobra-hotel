import {Fragment, useContext} from 'react';
import {AuthContext} from '../context/AuthContext';
import {Navigate} from "react-router-dom";

const RequireRole = ({roles, children}) => {
    const {getRole, isAuthenticated} = useContext(AuthContext);
    if(!isAuthenticated) {
        return <Navigate to="/login"/>
    }
    if (roles.includes(getRole())) {
        return children;
    }
    // TODO: style this page
    return (
        <Fragment>
            you are not authorized to view this page
        </Fragment>
    );
};

export default RequireRole;