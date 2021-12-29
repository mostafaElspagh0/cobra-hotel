import React, {useContext, useState} from "react";
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
import MenuItem from "@mui/material/MenuItem";
import * as Api from "../api/employeeApi";
import {AuthContext} from "../../auth/context/AuthContext";
import {PopupContext} from "../../../common/contexts/PopupContext";

const CreateEmployee = () => {
    const {handleSubmit, control} = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const {getToken} = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState("");
    const {updateRows} = useContext(HrContext);
    const {closePopup} = useContext(PopupContext);
    const onCreate = (data) => {
        setIsLoading(true);
        setIsError(false);
        setErrorMessage("");
        Api.addEmployee(getToken(), data)
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
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="name"
                        control={control}
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
                        name="job_type"
                        defaultValue={"Manager"}
                        control={control}
                        render={({field: {onChange, value}, fieldState: {error}}) => (
                            <TextField
                                label="job"
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

                                <MenuItem value='Manager'>Manager</MenuItem>
                                <MenuItem value='Hr'>HR</MenuItem>
                                <MenuItem value='Receptionist'>Receptionist</MenuItem>
                                <MenuItem value="Barista">Barista</MenuItem>
                            </TextField>
                        )}
                        rules={{
                            required: 'job is required',
                            validate: (value) => {
                               if(['Manager','Hr','Receptionist','Barista'].includes(value)){
                                   return true;
                               }
                                return 'Please select a valid job type';
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="email"
                        control={control}
                        render={({field: {onChange, value}, fieldState: {error}}) => (
                            <TextField
                                label="email"
                                variant="outlined"
                                fullWidth
                                required
                                disabled={isLoading}
                                value={value}
                                margin={'normal'}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                                type="email"
                            />
                        )}
                        rules={{
                            required: 'email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: 'invalid email address',
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="phone"
                        control={control}
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
                            pattern: {
                                value: /^[0-9]{11}$/,
                                message: 'invalid phone number',
                            },

                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="password"
                        control={control}
                        render={({field: {onChange, value}, fieldState: {error}}) => (
                            <TextField
                                label="password"
                                variant="outlined"
                                fullWidth
                                required
                                disabled={isLoading}
                                value={value}
                                margin={'normal'}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                                type="password"
                            />
                        )}
                        rules={{
                            minLength: {
                                value: 8,
                                message: 'password must be at least 8 characters',
                            },
                            required: 'password is required',
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="address"
                        control={control}
                        render={({field: {onChange, value}, fieldState: {error}}) => (
                            <TextField
                                label="address"
                                variant="outlined"
                                fullWidth
                                required
                                multiline
                                maxRows={2}
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
                            required: 'address is required',
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

export default CreateEmployee;