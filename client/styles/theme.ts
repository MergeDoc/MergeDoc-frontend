import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            light: '#819ca9',
            main: '#546e7a',
            dark: '#29434e',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ffffff',
            main: '#cfd8dc',
            dark: '#9ea7aa',
            contrastText: '#000a12',
        },
    },
});

export default theme;