import React, {useContext, useState} from "react";
import {
    CircularProgress,
    IconButton,
    TextField
} from "@material-ui/core";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {Alert, CssBaseline} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useForm, Controller} from "react-hook-form";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import * as Api from "../api/reservationApi";
import {AuthContext} from "../../auth/context/AuthContext";
import {PopupContext} from "../../../common/contexts/PopupContext";
import {RoomsContext} from "../context/reservationContext";

const AddReservation = (props) => {
    const {handleSubmit, control} = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const {getToken} = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState("");
    const {updateRows} = useContext(RoomsContext);
    const {closePopup} = useContext(PopupContext);
    const onCreate = (data) => {
        setIsLoading(true);
        setIsError(false);
        setErrorMessage("");
        Api.addReservation(getToken(), data)
            .then(() => {
                setIsLoading(false);
                updateRows().then(() => {
                    closePopup()
                });
            })
            .catch(error => {
                setIsLoading(false);
                setIsError(true);
                setErrorMessage(error.message);
            });

    };
    return (
        <Box component="form" onSubmit={handleSubmit(onCreate)} noValidate sx={{mt: 1}}>
            <CssBaseline/>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="startDate"
                        defaultValue={"2021-12-03"}
                        control={control}
                        render={({field: {onChange, value}, fieldState: {error}}) => (
                            <TextField
                                label="Start Date"
                                variant="outlined"
                                fullWidth
                                required
                                disabled={isLoading}
                                value={value}
                                margin={'normal'}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                                type="date"

                            />
                        )}
                        rules={{
                            required: 'Name is required',
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="type"
                        defaultValue={"full"}
                        control={control}
                        render={({field: {onChange, value}, fieldState: {error}}) => (
                            <TextField
                                label="type"
                                variant="outlined"
                                fullWidth
                                select
                                required
                                disabled={isLoading}
                                value={value}
                                margin={'normal'}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                                type="text"
                            >
                                <MenuItem value='full'>full</MenuItem>
                                <MenuItem value='b&b'>b&b</MenuItem>
                                <MenuItem value='half'>half</MenuItem>
                            </TextField>
                        )}
                        rules={{
                            required: 'reservation type is required',
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="endDate"
                        defaultValue={"2021-12-03"}
                        control={control}
                        render={({field: {onChange, value}, fieldState: {error}}) => (
                            <TextField
                                label="End Date"
                                variant="outlined"
                                fullWidth
                                required
                                disabled={isLoading}
                                value={value}
                                margin={'normal'}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                                type="date"
                            />
                        )}
                        rules={{
                            required: 'end date is required',
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="roomId"
                        control={control}
                        render={({field: {onChange, value}, fieldState: {error}}) => (
                            <TextField
                                label="Room Id"
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
                            required: 'room id is required',
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

export default AddReservation;