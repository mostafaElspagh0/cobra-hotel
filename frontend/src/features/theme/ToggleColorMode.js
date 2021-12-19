import React, {createContext, useMemo, useState} from 'react';
import {ThemeProvider} from "@emotion/react";
import {createTheme, CssBaseline} from "@material-ui/core";
import {amber, deepOrange, grey,green,} from "@material-ui/core/colors";


const ColorModeContext = createContext();

const ToggleColorMode = props => {
    const [mode, setMode] = useState('light');
    const getDesignTokens = (mode) => ({
        palette: {
            type: mode,
            mode,
            primary: {
                main: '#6fcc75',
            },
            secondary: {
                main: '#ff9400',
            },
            ...(mode === 'light'
                ? {
                    // palette values for light mode

                }
                : {
                    // palette values for dark mode
                    secondary: deepOrange,

                }),
        },
    });
    const theme = useMemo(
        () => createTheme(getDesignTokens(mode)), [mode],
    );
    const toggleColorMode = () => {
        setMode(mode === "light" ? "dark" : "light");
    };
    return (
        <ColorModeContext.Provider value={{
            toggleColorMode, colorMode: mode
        }}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                {props.children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}
export default ToggleColorMode;
export {ColorModeContext}                         ;