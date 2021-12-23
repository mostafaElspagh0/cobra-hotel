import {Fragment} from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import * as React from "react";
import Container from "@mui/material/Container";

const Send =()=>{
    return(
            <Fragment>
                <Container>
                    <Grid container  sm={12} direction="column" spacing={5}>
                                    <Grid item></Grid>
                                    <Grid item></Grid>
                        <Grid container item sm={12} >
                            <Grid item sm={6} display="flex" justifyContent="flex-end">
                                <TextField id="outlined-search" label="Title" type="search"
                                           style={{
                                               width:'30vw'
                                           }}
                                />
                            </Grid>
                            <Grid item sm={4} display="flex" justifyContent="space-evenly">
                                <TextField id="outlined-search" label="To" type="search"
                                           style={{
                                               width:'30vw'
                                           }}
                                />
                            </Grid>
                        </Grid>

                        <Grid item  display="flex" justifyContent="center">
                            <TextField id="outlined-search" label="Subject" type="search"
                                       style={{
                                           width:'30vw'
                                       }}
                            />
                        </Grid>

                        <Grid item display="flex" justifyContent="center">
                            <TextareaAutosize
                                aria-label="minimum height"
                                minRows={13}
                                placeholder="Your E-mail"
                                style={{ width:"40vw",
                                    backgroundColor :"inherit",
                                    borderColor:"#adadad",
                                    borderRadius:"6px",
                                    padding:"1%"
                                }}
                            />
                        </Grid>
                        <Grid item  display="flex" justifyContent="center">
                            <Grid item></Grid>
                            <Button variant="contained" sx={{
                                color:"white",
                                width:'15vw'
                            }}
                            >
                                Send E-mail

                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </Fragment>






    );
}
export default Send ;