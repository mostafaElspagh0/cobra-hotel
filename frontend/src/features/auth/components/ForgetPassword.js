import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import logo from '../../../common/resoursces/logo.svg';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {CircularProgress, IconButton, Switch} from "@material-ui/core";
import {Alert, AppBar} from "@mui/material";
import {useContext} from "react";
import {DarkModeContext} from "../../darkMode/DarkModeProvider";
import {useForm, Controller} from "react-hook-form";
import CloseIcon from '@mui/icons-material/Close';
import {Navigate, useNavigate} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";

const ForgetPassword = ()=>{
    const {toggleColorMode,isDark} = useContext(DarkModeContext);
    const {handleSubmit, control} = useForm();
    const {status, error, dismissError} = useContext(AuthContext);
    const navigate = useNavigate();
    const {
        isAuthenticated,
        forgetPassword
    } = useContext(AuthContext);
    const onSubmit = (data) => {
        forgetPassword(data.email);
        //signIn(data.email, data.password);
    };
    if(isAuthenticated){
        return <Navigate to="/"/>
    }
    return (
        <Container component="main" maxWidth="xs">
            <AppBar>
                <Box sx={
                    {
                        alignSelf: 'flex-end',
                    }
                }>
                    <Switch
                        checked={isDark()}
                        onChange={() => toggleColorMode()}/>
                </Box>
            </AppBar>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'

                }}
            >
                <img src={logo} alt="logo" width="150" height="150" style={{
                    margin: '10px'
                }}/>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{mt: 1}}>
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        render={({field: {onChange, value}, fieldState: {error}}) => (
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                required
                                disabled={status === 'loading'}
                                value={value}
                                margin={'normal'}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                                type="email"
                            />
                        )}
                        rules={{
                            required: 'Email required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: 'invalid email address'
                            }
                        }}
                    />


                    {status === 'error' && (
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
                    {status === 'success' && (
                        <Alert
                            severity="success"
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
                            reset password link has been sent to your email
                        </Alert>

                    )}
                    {status === 'loading' && (
                        <CircularProgress/>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={status === 'loading'}

                        sx={{mt: 3, mb: 2}}
                    >
                        Sign In
                    </Button>
                    <Typography variant="body2" color="textSecondary" align="left">
                        {'you have your password? '}
                        <Button
                            onClick={() => {navigate('/login'); dismissError()}}
                            variant="text"
                            color="primary"
                            disabled={status === 'loading'}
                            sx={{ml: 2}}
                        >
                            login instead
                        </Button>
                    </Typography>

                </Box>
            </Box>
        </Container>
    )

}

export default ForgetPassword;