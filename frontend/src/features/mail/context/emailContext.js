import {createContext, useContext, useState} from "react";
import * as Api from '../api/mailApi';
import {AuthContext} from "../../auth/context/AuthContext";
const EmailContext = createContext();

const EmailContextProvider = (props) =>{
    const {getToken} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendEmail = ({to,Subject,body}) =>{
        setIsLoading(true);
        setError(null);
        const token = getToken();
        Api.sendEmailApi(token,to,Subject,body)
            .then(res =>{
                setIsLoading(false);
            })
            .catch(err =>{
                setError(err);
                setIsLoading(false);
            })
    };




    return (
        <EmailContext.Provider value={{sendEmail,isLoading,error}}>
            {props.children}
        </EmailContext.Provider>
    )
}

export {EmailContext,EmailContextProvider};