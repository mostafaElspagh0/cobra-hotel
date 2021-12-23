import * as React from 'react';
import {Container} from "@mui/material";
import {Fragment, useContext, useEffect, useState} from "react";
import {DataGrid} from '@mui/x-data-grid';
import Grid from "@mui/material/Grid";
import {
    FormControl,
    InputAdornment,
    OutlinedInput, Paper,
} from "@material-ui/core";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import * as Api from "../api/employeeApi"
import {AuthContext} from "../../auth/context/AuthContext";
import {Outlet, useLocation, useNavigate} from "react-router-dom";


const Hr = () => {
    const {getToken} = useContext(AuthContext);
    const [rows, setRows] = useState({users: [], count: 0});
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(0);
    const Location = useLocation();
    const Navigate = useNavigate();
    const columns = [
        {
            field: '_id',
            headerName: 'Edit',
            renderCell: ({id}) => {
                return (
                    <IconButton onClick={
                        (e) => Navigate(`edit/${id}`)
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
    const a = 1;
    useEffect(() => {
            setIsLoading(true);
            const fetchData = async () => {
                Api.getEmployees(getToken()).then(
                    (res) => {
                        setRows(res.data)
                        setIsLoading(false);
                    }
                )
            }
            fetchData();
        }, [a]
    )

    const handlePageChange = (page) => {
        setIsLoading(true);
        Api.getEmployees(getToken(), page).then(
            (res) => {
                setRows(res.data)
                setPage(page);
                setIsLoading(false);
            }
        )
    }

    const isPopup = () => {
        return Location.pathname.includes('/edit')
    }
    return (
        <Fragment>
            {isPopup() &&

                <Paper
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '80%',
                        height: '80%',
                        padding: '20px',
                        zIndex: '1000'
                    }}>
                    <Outlet/>
                </Paper>
            }
            <Container style={
                (isPopup()) ? {
                    WebkitFilter: 'blur(5px)',
                    MozFilter: 'blur(5px)',
                    MsFilter: 'blur(5px)',
                    OFilter: 'blur(5px)',
                    filter: 'blur(5px)',
                    pointerEvents: 'none'
                } : {}
            }>
                <Grid container spacing={3} justifyContent={'center'}>
                    <Grid item xs={12}/>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <OutlinedInput
                                endAdornment={
                                    <InputAdornment position="end">
                                        <SearchIcon/>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <DataGrid
                            loading={isLoading}
                            getRowId={(row) => row._id}
                            rows={rows.users}
                            disableSelectionOnClick
                            pageSize={10}
                            page={page}
                            onPageChange={(e, g,) => {
                                handlePageChange(e)
                            }}
                            rowsPerPageOptions={[]}
                            rowCount={rows.count}
                            paginationMode={"server"}
                            columns={columns}
                            style={
                                {
                                    minHeight: "65vh",
                                    width: '100%',
                                    overflow: 'auto',
                                }
                            }
                        />
                    </Grid>
                </Grid>
            </Container>
        </Fragment>
    );
}
export default Hr;