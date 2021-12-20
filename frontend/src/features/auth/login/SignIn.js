import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import logo from '../../../common/logo.svg';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Switch} from "@material-ui/core";
import {AppBar} from "@mui/material";
import {useContext} from "react";
import {ColorModeContext} from "../../theme/ToggleColorMode";
import {useForm, Controller} from "react-hook-form";

const SignIn = (props) => {
    const {toggleColorMode} = useContext(ColorModeContext);
    const {handleSubmit, control} = useForm();
    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <Container component="main" maxWidth="xs">
            <AppBar>
                <Box sx={
                    {
                        alignSelf: 'flex-end',
                    }
                }>
                    <Switch onChange={(e) => toggleColorMode()}/>
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
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        render={({field: {onChange, value}, fieldState: {error}}) => (
                            <TextField
                                label="Password"
                                variant="outlined"
                                fullWidth
                                required
                                margin={'normal'}
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                                type="password"
                            />
                        )}
                        rules={{
                            required: 'Password required',
                            minLength: {value: 8, message: 'Password must be at least 8 characters'}
                        }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign In
                    </Button>
                    <Typography variant="body2" color="textSecondary" align="left">
                        {'lost your password'}
                        <Button
                            component="a"
                            href="/signup"
                            variant="text"
                            color="primary"
                            sx={{ml: 2}}
                        >
                            Forgot password?
                        </Button>
                    </Typography>

                </Box>
            </Box>
        </Container>
    )

}

export default SignIn;