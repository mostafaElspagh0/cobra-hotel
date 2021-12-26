import {Fragment} from "react";
import TextField from "@mui/material/TextField";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from "@mui/material/Button";
import drawing from "../arrival/resource/drawing.png";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import {Controller, useForm} from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import SelectInput from "@material-ui/core/Select/SelectInput";
import {Select} from "@mui/material";

const Announcement = () => {
    const {control, handleSubmit} = useForm();
    const itemsSelected = new Set()
    const onSubmit = data => {
        console.log(data);
    };
    return (
        <Fragment>
            <Container>
                <Box component={"form"} onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Grid container spacing={5}>
                        <Grid item xs={12}/>
                        <Grid item xs={12} sm={6}>

                            <Controller
                                name="to"
                                control={control}
                                defaultValue=""
                                render={({field: {onChange, value}, fieldState: {error}}) => (
                                    <Select
                                        label="to"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        error={!!error}
                                        select
                                        renderValue={(selected) => {
                                            itemsSelected.add(selected)
                                            console.log(itemsSelected)
                                            return selected;
                                            // return selected.value;
                                            // // return (
                                            // //     selected.map((option) => option.name).join(", ") ||
                                            // //     "Select some options"
                                            // // );
                                        }}
                                        SelectProps={{
                                            multiple: true,
                                            value: [value],
                                            onChange: onChange
                                        }}
                                        helperText={error ? error.message : null}
                                        type="email"
                                    >

                                        <MenuItem value="admin">Admin</MenuItem>
                                        <MenuItem value="user1">User1</MenuItem>
                                        <MenuItem value="user2">User2</MenuItem>
                                    </Select>
                                )}
                                rules={{
                                    required: 'Email required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: 'invalid email address'
                                    }
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
                                name="Subject"
                                control={control}
                                defaultValue=""
                                render={({field: {onChange, value}, fieldState: {error}}) => (
                                    <TextField
                                        label="subject"
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
                                        placeholder="Your E-mail"
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
                            <Button variant="contained" type={"submit"}>
                                Send E-mail
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Fragment>
    );
}

export default Announcement;