'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'var(--font-eveleth-clean), sans-serif',
    },

    palette: {
        primary: {
            main: '#38227b',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#f3c267',
            contrastText: '#1a1a40',
        },
        background: {
            default: '#31317e',
            paper: '#31317e',
        },
        text: {
            primary: '#ffffff',
            secondary: '#f3c267',
        },
    },
});

export default theme;