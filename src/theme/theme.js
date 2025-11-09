import {extendTheme} from "@chakra-ui/react";

const config = {
    // The initial color mode is inherited from the OS, try to get it from the
    // localStorage also (for when the user has no cookies)
    //initialColorMode: localStorage.getItem('chakra-ui-color-mode') || 'system',
    initialColorMode: 'system',
    useSystemColorMode: true,
}

const theme = extendTheme({
    colors: {
        darkprimary: "#06273E",
        primary: "#094169",
        secondary: "#7FB6D5",
        lightBlue: "#DFE6EB",
        dark: "#1d2021",
        light: "#FEFEFE",
    },
    fonts: {
        heading: `'Comfortaa', sans-serif`,
        body: `'Comfortaa', sans-serif`,
    },
    fontSizes: {},
    breakpoints: {
        sm: "280px",
        md: "768px",
        lg: "960px",
        xl: "1200px",
        "2xl": "1600px",
        "3xl": "1920px",
    },
    config
});

export default theme;
