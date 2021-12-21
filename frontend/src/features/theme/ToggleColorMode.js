import React, {createContext, useMemo, useState} from 'react';
import {ThemeProvider} from "@emotion/react";
import {createTheme, CssBaseline} from "@material-ui/core";
import {deepOrange} from "@material-ui/core/colors";


const ColorModeContext = createContext();

const ToggleColorMode = props => {
    const [mode, setMode] = useState(() => {
        return localStorage.getItem('ColorMode') || 'light';
    });
    const isDark = () => mode === 'dark';
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
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        localStorage.setItem('ColorMode', newMode);
    };
    return (
        <ColorModeContext.Provider value={{
            toggleColorMode,
            isDark,
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