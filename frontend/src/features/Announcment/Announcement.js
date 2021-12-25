import {Fragment} from "react";
import TextField from "@mui/material/TextField";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from "@mui/material/Button";
import drawing from "../arrival/resource/drawing.png";
import CardMedia from "@mui/material/CardMedia";

const Announcement =()=>
{
    return(
        <Fragment>
            <Container>
                <Grid container lg={12} spacing={6}  >

                    <Grid  container item lg={6}   spacing={6}>
                        <Grid item > </Grid>
                        <Grid item > </Grid>

                                <Grid item xs={12}>

                                    <TextField id="outlined-search" label="Title" type="search"
                                               style={{
                                                   width:'25vw'
                                               }}
                                    />

                                </Grid>
                            <Grid item xs={12}>

                                <TextField id="outlined-search" label="Subject" type="search"
                                           style={{
                                               width:'30vw'
                                           }}
                                />

                            </Grid>
                            <Grid item xs={12}>
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
                    <Grid item lg={6}  display="flex" justifyContent="center" alignItems="center">
                        <CardMedia
                            component="img"
                            alt="green iguana"

                            image={drawing}
                            style={{
                                width:'20vw',
                                height:'40vh'
                            }}
                        />
                    </Grid>
                </Grid>

            </Container>
        </Fragment>
    );
}

export default Announcement;