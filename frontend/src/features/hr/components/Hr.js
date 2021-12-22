import * as React from 'react';
import {Container} from "@mui/material";
import {Fragment} from "react";
import {DataGrid} from '@mui/x-data-grid';
import Grid from "@mui/material/Grid";
import {FormControl, InputAdornment, OutlinedInput} from "@material-ui/core";
import SearchIcon from '@mui/icons-material/Search';

const columns = [
    {field: 'id', headerName: 'ID', width: 70, editable: true},
    {field: 'firstName', headerName: 'First name', width: 130},
    {field: 'lastName', headerName: 'Last name', width: 130},
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 90,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.getValue(params.id, 'firstName') || ''} ${
                params.getValue(params.id, 'lastName') || ''
            }`,
    },
];

const rows = [
    {id: 1, lastName: 'Snow', firstName: 'Jon', age: 35},
    {id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42},
    {id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45},
    {id: 4, lastName: 'Stark', firstName: 'Arya', age: 16},
    {id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null},
    {id: 6, lastName: 'Melisandre', firstName: null, age: 150},
    {id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44},
    {id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36},
    {id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65},
    {id: 10, lastName: "fdsjif" , firstName: "fjd",age: 42},
    {id: 11, lastName: 'Snow', firstName: 'Jon', age: 35},
    {id: 12, lastName: 'Lannister', firstName: 'Cersei', age: 42},
    {id: 13, lastName: 'Lannister', firstName: 'Jaime', age: 45},
    {id: 14, lastName: 'Stark', firstName: 'Arya', age: 16},
    {id: 15, lastName: 'Targaryen', firstName: 'Daenerys', age: null},
    {id: 16, lastName: 'Melisandre', firstName: null, age: 150},
    {id: 17, lastName: 'Clifford', firstName: 'Ferrara', age: 44},
    {id: 18, lastName: 'Frances', firstName: 'Rossini', age: 36},
    {id: 19, lastName: 'Roxie', firstName: 'Harvey', age: 65},
    {id: 20, lastName: "fdsjif" , firstName: "fjd",age: 42},


];

const Hr = () => {

    return (
        <Fragment>
            <Container>
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
                            rows={rows}
                            columns={columns}
                            pageSize={10}
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