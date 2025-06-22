import { createTheme } from '@mui/material/styles';

const AppStyle = createTheme({
    palette: {
        vividBlue: {
            main: '#236BCF',
            contrastText: '#FFFFFF'
        },
        brightRed: {
            main: '#E94C4C',
            contrastText: '#E94C4C'
        },
        coolGray: {
            main: '#9F9F9F',
            contrastText: '#9F9F9F'
        },
        grayDark: {
            main: '#8D8D8D',
            contrastText: '#FFFFFF'
        },
        slateBlue: {
            main: '#495361'
        },
        lightGray: {
            main: '#D9D9D9'
        },
        ghostWhite: {
            main: '#F7F9FA'
        },
        ashGray: {
            main: '#9DA0A5'
        },
        veryLightGray: {
            main: '#EBEBEB'
        },
        dark: {
            main: '#000000'
        },
        light : {
            main: '#FFFFFF'
        },
        skyBlue: {
            main: "#48A2C8"
        },
        vividGreen: {
            main: '#66bb6a',
            contrastText: '#FFFFFF'
        },
        strongGreen: {
            main: '#10932D',
            contrastText: '#FFFFFF'
        }
    },
    typography: {
        fontFamily: 'Raleway, Lato, Montserrat, Roboto, Arial, sans-serif'
    }
});

export default AppStyle;