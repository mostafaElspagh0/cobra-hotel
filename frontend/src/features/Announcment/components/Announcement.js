import {Fragment, useContext} from "react";
import TextField from "@mui/material/TextField";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {Controller, useForm} from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import * as Api from "../api/announcmentApi";
import {AuthContext} from "../../auth/context/AuthContext";

const Announcement = () => {
    const {control, handleSubmit} = useForm();
    const {getToken} = useContext(AuthContext);
    const onSubmit = data => {
        Api.addAnnouncement(getToken(),data);
    };
    return (
        <Fragment>
            <Container>
                <Box component={"form"} onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Grid container spacing={5}>
                        <Grid item xs={12}/>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="target_audience"
                                control={control}
                                defaultValue="All"
                                render={({field: {onChange, value}, fieldState: {error}}) => (
                                    <TextField
                                        label="To"
                                        variant="outlined"
                                        fullWidth
                                        select
                                        required
                                        error={!!error}
                                        SelectProps={{
                                            value: [value],
                                            onChange: onChange
                                        }}
                                        helperText={error ? error.message : null}
                                        type="text"
                                    >
                                        <MenuItem value="All">All</MenuItem>
                                        <MenuItem value="Manager">Managers</MenuItem>
                                        <MenuItem value="Hr">Hr team</MenuItem>
                                        <MenuItem value="Receptionist">Receptionists</MenuItem>
                                        <MenuItem value="Barista">Baristas</MenuItem>
                                    </TextField>
                                )}
                                rules={{
                                    required: 'this field is required'
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{
                            display: {
                                xs: 'none',
                                sm: 'block'
                            }
                        }}/>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="title"
                                control={control}
                                defaultValue=""
                                render={({field: {onChange, value}, fieldState: {error}}) => (
                                    <TextField
                                        label="title"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
                                        helperText={error ? error.message : null}
                                        type="text"
                                    />
                                )}
                                rules={{
                                    required: 'subject is required',
                                }}
                            />

                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="body"
                                control={control}
                                defaultValue=""
                                render={({field: {onChange, value}, fieldState: {error}}) => (
                                    <TextareaAutosize
                                        aria-label="minimum height"
                                        minRows={8}
                                        placeholder="Announcement body"
                                        resize="none"
                                        style={{
                                            width: "100%",
                                            backgroundColor: "inherit",
                                            borderColor: "#adadad",

                                            borderRadius: "5px",
                                            padding: "1%",
                                            resize: "none"
                                        }}
                                        label="subject"
                                        required
                                        value={value}
                                        onChange={onChange}
                                        type="text"
                                    />
                                )}
                                rules={{
                                    required: 'subject is required',
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" type={"submit"}>
                                add announcement
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Fragment>
    );
}

export default Announcement;