
import * as React from "react";
import  {PopupContext} from "../../../common/contexts/PopupContext";
import {Fragment, useContext, useEffect, useState} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {ButtonGroup, FormControl, InputAdornment, OutlinedInput} from "@material-ui/core";
import {Button, Container, IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import GradingTwoToneIcon from "@mui/icons-material/GradingTwoTone";
import Popup from "../../../common/components/Popup";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import {DataGrid} from "@mui/x-data-grid";
import {ReservationContext} from "../context/reservationContext";


const Reservation = () => {
    const {
        getPage,
        isLoading,
        rows,
        page,
        init,
        addSearchTerm,
        searchTerm,
    } = useContext(ReservationContext);
    const Navigate = useNavigate();
    const {
        openPopup,
        popup
    } = useContext(PopupContext);
    const [searchText, setSearchText] = useState(searchTerm);
    const columns = [
        {
            field: '_id',
            headerName: 'Edit',
            renderCell: (e) => {
                return (
                    <ButtonGroup
                        color={"primary"}
                        variant={"text"}
                    >
                        <IconButton onClick={
                            (k) => {
                                openPopup(e.row)
                                Navigate(`/dashboard/Reservation/edit/${e.row._id}`)
                            }
                        }>
                            <EditIcon/>
                        </IconButton>
                    </ButtonGroup>
                )
            },
            sortable: false,
            filterable: false,
        },
        {
            field: 'type',
            headerName: 'Type',
            width: 100,
            sortable: false,
            filterable: false
        },
        {
            field: 'room',
            headerName: 'Room',
            valueGetter: (e) => {
                return e.row.room.roomId
            },
            width: 100,
            type: 'text',
            sortable: false,
            filterable: false
        },
        {
            field: 'startDate',
            headerName: 'start Date',
            type: 'date',
            renderCell: (e) => {
                return new Date(e.value).toLocaleDateString()
            },
            width: 100,
            sortable: false,
            filterable: false
        },
        {
            field: 'endDate', headerName: 'end Date',
            width: 100,
            renderCell: (e) => {
                return new Date(e.value).toLocaleDateString()
            },
            type: 'date',
            sortable: false,
            filterable: false
        },
        {
            field: 'user', headerName: 'added by',
            width: 100,
            renderCell: (e) => {
                return (e.value.name)
            },
            type: 'date',
            sortable: false,
            filterable: false
        },
        {
            field: 'createdAt', headerName: 'created at',
            width: 250,
            renderCell: (e) => {
                return  `${new Date(e.value).toLocaleDateString()} ${new Date(e.value).toLocaleTimeString()}`;
            },
            type: 'date',
            sortable: false,
            filterable: false
        },

    ]
    const handleSearch = (e) => {
        e.preventDefault();
        addSearchTerm(searchText);
    };
    const handlePageChange = (page) => {
        getPage(page);
    };
    useEffect(() => {
        init();
    }, []);
    return (
        <Fragment>

            <Popup>
                <Outlet/>
            </Popup>

            <Container style={
                (popup) ? {
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
                    <Grid item xs={12} component={"form"} onSubmit={handleSearch}>
                       <Button
                           variant={'contained'}
                           fullWidth
                           onClick={() => {
                               openPopup();
                               Navigate(`/dashboard/Reservation/add`)
                           }}
                       > add</Button>
                    </Grid>

                    <Grid item xs={12}>
                        <DataGrid
                            loading={isLoading}
                            getRowId={(row) => row._id}
                            rows={rows.users}
                            disableSelectionOnClick
                            pageSize={10}
                            page={page}
                            onPageChange={(p,) => {
                                handlePageChange(p)
                            }}
                            rowsPerPageOptions={[10]}
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
export default Reservation;