import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from '../resoursces/logo.svg'
import {CssBaseline} from "@mui/material";
import avatar from '../resoursces/avat.png';
import {useContext, useState} from "react";
import PropTypes from 'prop-types';
import {ButtonGroup} from "@material-ui/core";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../features/auth/AuthContext";
import {ColorModeContext} from "../../features/theme/ToggleColorMode";
import Switch from "@material-ui/core/Switch";

const Nav = ({pages, currentPage}) => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const {toggleColorMode,isDark} = useContext(ColorModeContext);
    const navigate = useNavigate();
    const {signOut} = useContext(AuthContext);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{mr: 2, display: {xs: 'none', md: 'flex'}}}
                    >
                        <CssBaseline>
                            <Box sx={{display: 'flex'}}>
                                <img src={logo} alt={logo} width={60}/>
                            </Box>
                        </CssBaseline>
                    </Typography>
                    {/*small screen*/}
                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={() => {
                                    handleCloseNavMenu();
                                    navigate(page.path, {replace: false});
                                }}>
                                    <Typography textAlign="center">{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}
                    >
                        <Box sx={{display: 'flex'}}>
                            {currentPage}
                        </Box>
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        <ButtonGroup
                            disableElevation>
                            {pages.map((page) => (
                                <Button
                                    key={page.name}
                                    variant={page.isActive ? 'contained' : 'text'}
                                    color={page.isActive ? 'warning' : 'inherit'}
                                    onClick={() => {
                                        handleCloseNavMenu();
                                        navigate(page.path, {replace: false});
                                    }}
                                    sx={{my: 2, color: 'white', display: 'block'}}
                                >
                                    {page.name}
                                </Button>
                            ))}
                        </ButtonGroup>

                    </Box>

                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar alt="Remy Sharp" src={avatar}/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >

                            <MenuItem>
                                <Switch
                                    checked={isDark()}
                                    onChange={(e) => toggleColorMode()}/>
                            </MenuItem>
                            <MenuItem>
                                <Button onClick={() => {
                                    signOut();
                                }}>Logout</Button>
                            </MenuItem>


                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>

    );
};


Nav.prototype = {
    pages: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        path: PropTypes.string,
        component: PropTypes.func,
        isActive: PropTypes.bool,
    })).isRequired,
    currentPage: PropTypes.string.isRequired,
};


export default Nav;
