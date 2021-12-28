import React, { useContext, useState} from "react";
import {
    CircularProgress,
    IconButton,
    TextField
} from "@material-ui/core";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {Alert, Rating} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useForm, Controller} from "react-hook-form";
import Grid from "@mui/material/Grid";
import * as Api from "../api/employeeApi";
import {AuthContext} from "../../auth/context/AuthContext";
import {PopupContext} from "../../../common/contexts/PopupContext";

import Typography from "@mui/material/Typography";


const ReviewEmployee = () => {
    const {handleSubmit, control} = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const {getToken} = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState("");
    const { getPopupData} = useContext(PopupContext);
    const onCreate = (data) => {

        Api.addReview(getToken(), getPopupData()._id, data).then(r => {
        });

    };
    return (
        <Box component="form" onSubmit={handleSubmit(onCreate)} noValidate sx={{mt: 1}}>
            <Grid container spacing={3}>

                <Grid item xs={12}>
                    <Controller
                        name="rating"
                        control={control}
                        render={({field: {onChange, value}, fieldState: {error}}) => (
                            <Grid container  >
                                <Typography component="legend">rating</Typography>
                                <Box margin={1}/>
                                <Rating
                                    max={10}
                                    name="simple-controlled"
                                    value={value}
                                    onChange={onChange}
                                />
                            </Grid>
                        )}
                        rules={{
                            required: 'rating is required',
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="comment"

                        control={control}
                        render={({field: {onChange, value}, fieldState: {error}}) => (
                            <TextField
                                label="comment"
                                variant="outlined"
                                fullWidth
                                required
                                disabled={isLoading}
                                value={value}
                                margin={'normal'}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                                type="text"
                            />


                        )}
                        rules={{
                            required: 'job is required',

                        }}
                    />
                </Grid>

                {isError && (
                    <Alert
                        severity="error"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => setIsError(false)}
                            >
                                <CloseIcon/>
                            </IconButton>
                        }
                    >
                        {errorMessage}
                    </Alert>

                )}
                {isLoading && (
                    <CircularProgress/>
                )}
                <Grid item xs={6} sm={3}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={isLoading}

                        sx={{mt: 3, mb: 2}}
                    >
                        create
                    </Button>
                </Grid>

            </Grid>
        </Box>
    )
}

export default ReviewEmployee;