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
                    <Grid container  sm={12} spacing={5}>
                        <Grid container item sm={12}>
                            <Grid item sm={6}>
                                <TextField id="outlined-search" label="Subject" type="search"
                                           style={{
                                               width:'30vw'
                                           }}
                                />
                            </Grid>
                            <Grid item sm={6}>
                                <TextField id="outlined-search" label="Subject" type="search"
                                           style={{
                                               width:'30vw'
                                           }}
                                />
                            </Grid>
                        </Grid>

                        <Grid item >
                            <TextField id="outlined-search" label="Subject" type="search"
                                       style={{
                                           width:'30vw'
                                       }}
                            />
                        </Grid>

                        <Grid item >
                            <TextareaAutosize
                                aria-label="minimum height"
                                minRows={13}
                                placeholder="Your Announcement"
                                style={{ width:"40vw",
                                    backgroundColor :"inherit",
                                    borderColor:"#adadad",
                                    borderRadius:"6px",
                                    padding:"1%"
                                }}
                            />
                        </Grid>
                        <Grid item >
                            <Grid item></Grid>
                            <Button variant="contained" sx={{
                                color:"white",
                                width:'15vw'
                            }}
                            >
                                Push Announcement

                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </Fragment>






    );
}
export default Send ;