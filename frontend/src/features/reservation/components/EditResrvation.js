import React, {useContext, useEffect, useState} from "react";
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
import {ReservationContext} from "../context/reservationContext";
import popup from "../../../common/components/Popup";

const EditReservation = (props) => {
    const {handleSubmit, control,setValue} = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const {getToken} = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState("");
    const {updateRows} = useContext(ReservationContext);
    const {closePopup,getPopupData} = useContext(PopupContext);
    useEffect(()=>{
        try{
        if(getPopupData()) {

            setValue("startDate", getPopupData().startDate.slice(0, 10))
            setValue("endDate", getPopupData().endDate.slice(0, 10))
            setValue("roomId", getPopupData().room.roomId)
            setValue("type", getPopupData().type)
        }}catch(e){

        }
    },[popup])

    const onCreate = (data) => {
        // Api.editReservation(get)
        // console.log(data);
        // console.log(getPopupData());
        // console.log(new Date(getPopupData().startDate).toLocaleDateString())
        setIsLoading(true);
        setIsError(false);
        setErrorMessage("");
        Api.editReservation(getToken(),getPopupData()._id,data)
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
    const onDelete = () => {
        setIsLoading(true);
        setIsError(false);
        setErrorMessage("");
        Api.deleteReservation(getToken(),getPopupData()._id)
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
                <Grid item xs={6} sm={3}>
                    <Button
                        onClick={()=>{
                            onDelete();
                        }}
                        fullWidth
                        variant="contained"
                        disabled={isLoading}

                        sx={{mt: 3, mb: 2}}
                    >
                        delete
                    </Button>
                </Grid>

            </Grid>
        </Box>
    )
}

export default EditReservation;