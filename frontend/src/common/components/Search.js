import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import {Grid} from "@material-ui/core";
import * as React from "react";

const Search =()=>{
    return(
            <Grid Container  alignItems="space-arround"  direction="column" minHeight="100vh"  >

                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 , margin:'auto'  }}
                    style={{ height : '45px' , backgroundColor : '#6FCC75' ,borderRadius : '120px' }}
                >

                    <InputBase
                        sx={{ ml: 1, flex: 1 , color : 'white'  }}

                        placeholder="Search Here For Hr"
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />

                </Paper>
            </Grid>
    );
}
export default Search ;