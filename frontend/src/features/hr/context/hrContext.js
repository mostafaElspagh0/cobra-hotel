import {createContext, useContext, useEffect, useState} from "react";
import * as Api from "../api/employeeApi";
import {AuthContext} from "../../auth/context/AuthContext";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import * as React from "react";
import {useLocation, useNavigate} from "react-router-dom";

const HrContext = createContext()

const HrContextProvider = (props) => {
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState({users: [], count: 0});
    const [isLoading, setIsLoading] = useState(true);
    const [popup, setPopup] = useState(false);
    const [popupData, setPopupData] = useState({});
    const [error, setError] = useState(null);
    const [firstLoad, setFirstLoad] = useState(false);
    const Navigate = useNavigate()
    const location = useLocation()
    const {getToken} = useContext(AuthContext);
    const init = async ()=>{
        setFirstLoad(true);
    }
    const openEdit = (row) => {
        setPopupData(row);
        setPopup(true);
        Navigate(`/dashboard/Employee/edit/${row._id}`)
    }
    const closeEdit = () => {
        setPopup(false);
        Navigate(`/dashboard/Employee`)
    }
    const updateRow = async (row) => {
        let id =  popupData._id
        return Api.updateEmployeeById(getToken(), id ,row).then(res => {
            setPopup(false);
            setError(null);
            setRows({count: rows.count, users: rows.users.map(r => r._id === id ? res.data.user : r)})
        }).catch(err => {
            setError(err.response.data.message)
        })
    }

    const deleteRow = async () => {
        return Api.deleteEmployeeById(getToken(), popupData._id).then(() => {
            setError(null);
            setRows({count: rows.count -1, users: rows.users.filter(r => r._id !== popupData._id)})
        }).catch(err => {
            setError(err.response.data.message)
        })
    }

    const dismissError = () => {
        setError(null)
    }
    const getPage = (page) => {
        setPage(page);
        setIsLoading(true);
        Api.getEmployees(getToken(),page,10).then(
            (res) => {
                setRows(res.data)
                setIsLoading(false);
            }
        )
    }

    useEffect(() => {
        if(firstLoad){


            async function j(){

                getPage(0);
                if(location.pathname.includes('edit')){
                    setIsLoading(true);
                    let id = location.pathname.split('/')[4]
                    Api.getEmployeeId(getToken(), id).then(res => {
                        setPopupData(res)
                        setPopup(true)
                        setIsLoading(false);
                    })
                }
                else{
                    getPage(0);
                }
            }
            j()
        }


    }, [firstLoad]);

    const columns = [
        {
            field: '_id',
            headerName: 'Edit',
            renderCell: (e) => {
                return (
                    <IconButton onClick={
                        () => {
                            openEdit(e.row)
                        }
                    }>
                        <EditIcon/>
                    </IconButton>
                )
            },
            sortable: false,
            filterable: false,
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 200,
            sortable: false,
            filterable: false
        },
        {
            field: 'job_type',
            headerName: 'job',
            sortable: false,
            filterable: false
        },
        {
            field: 'email', headerName: 'email',
            width: 250,
            sortable: false,
            filterable: false
        },
        {
            field: 'password',
            headerName: 'password',
            hide: true,
        },
        {
            field: 'created_at',
            headerName: 'Year',
            type: 'dateTime',
            hide: true,
            valueGetter: ({value}) => value && new Date(value),
        },
        {
            field: 'updated_at',
            headerName: 'updated_at',
            type: 'dateTime',
            hide: true,
            valueGetter: ({value}) => value && new Date(value),
        },
        {
            field: '__v',
            headerName: 'Name',
            hide: true
        }
    ]

    return (
        <HrContext.Provider value={
            {
                rows,
                popup,
                getPage,
                isLoading,
                columns,
                page,
                popupData,
                error,
                updateRow,
                closeEdit,
                deleteRow,
                dismissError,
                init
            }
        }>
            {props.children}
        </HrContext.Provider>
    )
}

export {HrContext, HrContextProvider}