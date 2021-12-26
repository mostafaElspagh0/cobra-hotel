import React, {useContext} from "react";
import {
    CircularProgress,
    IconButton,
    TextField
} from "@material-ui/core";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {Alert} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useForm, Controller} from "react-hook-form";
import {HrContext} from "../context/hrContext";
import Grid from "@mui/material/Grid";

const CreateEmployee = () => {
    const {handleSubmit, control} = useForm();
    const {popupData, error, closeEdit, updateRow, isLoading, dismissError, deleteRow} = useContext(HrContext);

    if (isLoading || !popupData) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress/>
            </Box>
        )
    }

    return (
        <Box component="form" onSubmit={handleSubmit(updateRow)} noValidate sx={{mt: 1}}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <IconButton onClick={(e) => closeEdit()}>
                        <CloseIcon/>
                    </IconButton>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="name"
                        control={control}
                        defaultValue={popupData.name}
                        render={({field: {onChange, value}, fieldState: {error}}) => (
                            <TextField
                                label="name"
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
                            required: 'Name is required',
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="phone"
                        control={control}
                        defaultValue={popupData.phone}
                        render={({field: {onChange, value}, fieldState: {error}}) => (
                            <TextField
                                label="phone"
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
                            required: 'phone is required',
                            equalTo: {
                                value: 11,
                                message: 'phone must be equal to phone'
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Controller
                        name="job_type"
                        control={control}
                        defaultValue={popupData.job_type}
                        render={({field: {onChange, value}, fieldState: {error}}) => (
                            <TextField
                                label="job_type"
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
                            required: 'job type required',
                            validate: value => {
                                if (['Manager', 'Hr', 'Receptionist', 'Barista'].includes(value)) {
                                    return true;
                                }
                                return 'job type must be admin, hr or employee';
                            }

                        }}
                    />
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Controller
                        name="email"
                        control={control}
                        defaultValue={popupData.email}
                        render={({field: {onChange, value}, fieldState: {error}}) => (
                            <TextField
                                label="email"
                                variant="outlined"
                                fullWidth
                                disabled={isLoading}
                                required
                                margin={'normal'}
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                                type="text"
                            />
                        )}
                        rules={{
                            required: 'Password required',
                            minLength: {value: 8, message: 'Password must be at least 8 characters'}
                        }}
                    />
                </Grid>
                {error && (
                    <Alert
                        severity="error"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => dismissError()}
                            >
                                <CloseIcon/>
                            </IconButton>
                        }
                    >
                        {error}
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
                        Update
                    </Button>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Button
                        fullWidth
                        variant="contained"
                        disabled={isLoading}
                        onClick={() => {
                            deleteRow(popupData).then(() => {
                                closeEdit();
                            });
                        }}
                        sx={{mt: 3, mb: 2}}
                    >
                        delete
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default CreateEmployee;