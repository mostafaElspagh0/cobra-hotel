import React, {useContext, useEffect} from "react";
import {
    CircularProgress,
    TextField
} from "@material-ui/core";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useForm, Controller} from "react-hook-form";
import {HrContext} from "../context/hrContext";
import Grid from "@mui/material/Grid";
import {PopupContext} from "../../../common/contexts/PopupContext";
import * as Api from "../api/employeeApi";
import {AuthContext} from "../../auth/context/AuthContext";

const EditEmployee = () => {
    const {handleSubmit, control, setValue} = useForm();
    const [isLoading] = React.useState(false);

    const {updateRows,rows} = useContext(HrContext);
    const {getToken} = useContext(AuthContext);
    const {getPopupData, closePopup} = useContext(PopupContext);

    const onUpdate = (data) => {
        let row = {
            ...popupData,
            ...data
        }

        Api.updateEmployeeById(getToken(), row._id ,row).then(res => {
            updateRows({count: rows.count, users: rows.users.map(r => r._id === row._id ? res.data.user : r)})
        }).then(() => {
            closePopup();
        })
    };
    const onDelete = () => {
        Api.deleteEmployeeById(getToken(), popupData._id).then(() => {
            updateRows({count: rows.count -1, users: rows.users.filter(r => r._id !== popupData._id)})
        }).then(() => {
            closePopup();
        })
    };
    const popupData = getPopupData();
    useEffect(()=>{
        if(popupData){
            setValue("name", popupData.name);
            setValue("email", popupData.email);
            setValue("phone", popupData.phone);
            setValue("address", popupData.address);
            setValue("job_type", popupData.job_type);
        }
    },[popupData])
    return (
        <Box component="form" onSubmit={handleSubmit(onUpdate)} noValidate sx={{mt: 1}}>
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
                            onDelete();
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

export default EditEmployee;