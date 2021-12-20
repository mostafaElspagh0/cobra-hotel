import Nav from '../../common/components/Nav';
import Search from '../../common/components/Search';
import {Fragment} from "react";
import Container from "@mui/material/Container";

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";

const Bar = () => {
    return (
        <Fragment>
            <Grid container minHeight="100vh" direction="column">
                <Nav/>
                <Container>
                    <Grid  container direction="row" justifyItems="space-arround">


                                <Button variant="contained" sx={{
                                    color: 'white', marginLeft: '40px'
                                }}>Orders</Button>


                            <Search/>


                    </Grid>
                </Container>


            </Grid>

        </Fragment>
);

}
export default Bar;