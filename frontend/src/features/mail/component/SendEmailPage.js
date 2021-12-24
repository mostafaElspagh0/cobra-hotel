import {Fragment} from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import * as React from "react";
import Container from "@mui/material/Container";

const SendEmailPage = () => {
    return (
        <Fragment>
            <Container>
                <Grid container spacing={5}>
                    <Grid item xs={12}/>
                    <Grid item xs={12} sm={6}>
                        <TextField id="outlined-search" label="Title" type="search" fullWidth/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField id="outlined-search" label="To" type="search" fullWidth/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField id="outlined-search" label="Subject" type="search"
                                   fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextareaAutosize
                            aria-label="minimum height"
                            minRows={ 8 }
                            placeholder="Your E-mail"
                            resize="none"
                            style={{
                                width: "100%",
                                borderRadius: "5px",
                                padding: "10px",
                                resize: "none"
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <Button variant="contained" >
                            Send E-mail
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </Fragment>


    );
}
export default SendEmailPage;