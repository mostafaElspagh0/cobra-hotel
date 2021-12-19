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


const SignIn = (props) => {
    const {toggleColorMode} = useContext(ColorModeContext);
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
                <Box component="form" onSubmit={() => {
                }} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
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
                            variant="body2"
                            color="primary"
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