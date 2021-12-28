import {Container, IconButton} from "@mui/material";
import {Fragment, useContext, useEffect, useState} from "react";
import {DataGrid} from '@mui/x-data-grid';
import Grid from "@mui/material/Grid";
import {
    ButtonGroup,
    FormControl,
    InputAdornment,
    OutlinedInput,
} from "@material-ui/core";
import SearchIcon from '@mui/icons-material/Search';
import {Outlet, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import * as React from "react";
import {PopupContext} from "../contexts/PopupContext";
import Pop2up from "./Popup";
import GradingTwoToneIcon from '@mui/icons-material/GradingTwoTone';
import {SearchableTableContext} from "../contexts/SearchableTableContext";
import Popup from "./Popup";


const SearchableTable = (props) => {
    const {
        getPage,
        isLoading,
        rows,
        page,
        init,
        addSearchTerm,
        searchTerm,
    } = useContext(SearchableTableContext);
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
                                Navigate(`/dashboard/Employee/edit/${e.row._id}`)
                            }
                        }>
                            <EditIcon/>
                        </IconButton>
                        <IconButton onClick={
                            (k) => {
                                openPopup(e.row)
                                Navigate(`/dashboard/Employee/review/${e.row._id}`)
                            }
                        }>
                            <GradingTwoToneIcon/>
                        </IconButton>
                    </ButtonGroup>
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
        }
    ]
    const handleSearch = (e) => {
        e.preventDefault();
        addSearchTerm(searchText);
    };
    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
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
                    <Grid item xs={8} component={"form"} onSubmit={handleSearch}>
                        <FormControl
                            fullWidth>
                            <OutlinedInput
                                onChange={handleSearchChange}
                                value={searchText}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton type={"submit"}>
                                            <SearchIcon/>
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4} alignSelf={"center"}>
                        <Button
                            variant={"contained"}
                            color={"primary"}
                            fullWidth
                            size={"large"}
                            onClick={() => {
                                openPopup();
                                Navigate(`/dashboard/Employee/add`)
                            }}>

                            Add
                        </Button>
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
export default SearchableTable;