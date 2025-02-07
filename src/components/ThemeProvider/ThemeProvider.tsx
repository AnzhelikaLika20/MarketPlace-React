import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#283593',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#FFB300',
        },
        text: {
            primary: '#333333',
            secondary: '#283593',
        },
        background: {
            default: '#F5F5F5',
        },
    },
});

export default theme;