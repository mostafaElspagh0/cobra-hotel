import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {TextField} from "@material-ui/core";
import {DataGrid} from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import * as React from "react";

const columns = [
    { field: 'Room.n', headerName: 'Number', width: 90 },
    { field: 'Status before', headerName: 'Status before', width: 130 },
    { field: 'Status after', headerName: 'Status after', width: 130},
    {field: 'Notes', headerName: 'Notes', width: 70},
    {field: 'Cleaner name', headerName: 'Cleaner name', width: 130},
    {field: 'Get Key', headerName: 'Get key', width: 90},
    {field: 'Take key', headerName: 'Take key', width: 90},
    {field: 'Search', headerName: 'Search',
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
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 10, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 11, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 12, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 13, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 15, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 16, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 17, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 18, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 19, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];




const Clean =()=>
{
    return(<Container>
        <Grid container sm={12} spacing={5}>
            <Grid item sm={12}></Grid>
            <Grid container item sm={12} >
                <Grid  item sm={4} display="flex" justifyContent="center">
                    <Button variant="contained" sx={{
                        color:"white",
                        width:'15vw'
                    }}
                    >
                        Add-Room

                    </Button>
                </Grid>
                <Grid item sm={8} display="flex" justifyContent="center">
                    <TextField id="outlined-search" label="Search Here" type="search"
                               style={{
                                   width:'30vw'
                               }}/>
                </Grid>

            </Grid>

        </Grid>
        <Grid container sm={12} spacing={5}>
            <Grid item sm={12}></Grid>
            <Grid item sm={12} >
                <div style={{ height: "100vh", width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={12}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </div>
            </Grid>
        </Grid>
    </Container>);
}

export default Clean ;