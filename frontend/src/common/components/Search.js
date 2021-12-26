import TextField from '@mui/material/TextField';
import * as React from "react";

const Search = () => {
    return (
        <TextField id="outlined-search" label="Search Here" type="search"
                   style={{
                       width: '30vw'
                   }}
        />


    );
}
export default Search;