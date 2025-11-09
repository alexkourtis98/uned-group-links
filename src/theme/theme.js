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
        darkprimary: "#003C32",
        primary: "#005447",
        secondary: "#7FB89D",
        lightGreen: "#E6F2EE",
        lightBlue: "#E6F2EE", // Keep alias for backward compatibility
        dark: "#1d2021",
        light: "#FEFEFE",
        // Dark mode green backgrounds
        darkestGreen: "#001410",
        darkerGreen: "#002920",
        darkGreen: "#003C32",
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
    styles: {
        global: (props) => ({
            body: {
                bg: props.colorMode === 'dark' ? 'darkestGreen' : 'light',
            },
        }),
    },
    config
});

export default theme;
