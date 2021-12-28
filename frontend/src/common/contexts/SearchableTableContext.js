import {createContext, useContext, useEffect, useState} from "react";
import {AuthContext} from "../../features/auth/context/AuthContext";
import * as React from "react";
import {useLocation} from "react-router-dom";

const SearchableTableContext = createContext()

const SearchableTableContextProvider = (props) => {
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState({users: [], count: 0});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [firstLoad, setFirstLoad] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation()
    const {getToken} = useContext(AuthContext);
    const init = async () => {
        setFirstLoad(true);
    }
    const addSearchTerm = async (search) => {
        setSearchTerm(search)
        await getPage(0, search);
    }

    const updateRows = (rows) => {
        return getPage(page);
    }

    const dismissError = () => {
        setError(null)
    }
    const getPage = async (page, search) => {
        setPage(page);
        setIsLoading(true);

    }

    useEffect(() => {
        if (firstLoad) {
            async function j() {
                await getPage(0);
                if (location.pathname.includes('edit')) {
                    setIsLoading(true);
                    let id = location.pathname.split('/')[4]
                } else {
                    await getPage(0);
                }
            }
            j()
        }
    }, [firstLoad]);
    return (
        <SearchableTableContext.Provider value={
            {
                rows,
                getPage,
                isLoading,
                page,
                error,
                dismissError,
                init,
                addSearchTerm,
                searchTerm,
                updateRows
            }
        }>
            {props.children}
        </SearchableTableContext.Provider>
    )
}

export {SearchableTableContextProvider, SearchableTableContext}