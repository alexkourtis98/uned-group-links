/*
 *
 *   MIT License
 *
 *   Copyright (c) 2023 Open Source Alexandros Kourtis
 *
 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 *
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 *
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 *
 *   Project members:
 *     - Alexandros Kourtis
 *
 * /
 */

import {useEffect, useState} from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {Box, Flex, Heading, useColorModeValue} from "@chakra-ui/react";
import MenuButton from "./MenuButton";
import {Categories} from "../assets/categories";

function RouteDictionary(route) {
    for (let i = 0; i < Categories.length; i++) {
        if (Categories[i].route === route) return Categories[i].title;
    }
}

export default function Header() {
    const navigate = useNavigate();
    const loc = useLocation();
    const [currentName, setCurrentName] = useState(RouteDictionary(loc.pathname));
    useEffect(() => {
        setCurrentName(RouteDictionary(`${loc.pathname}`));
    }, [loc]);

    const goToHomePage = () => {
        navigate("/");
    };

    return (
        <>
            <Flex
                bgColor={useColorModeValue("light", "darkprimary")}
                position={{sm: "relative", lg: "sticky"}}
                direction="row"
                w="100%"
                alignItems="center"
                zIndex={99}
                justifyContent="space-between"
                paddingLeft="0rem"
                paddingRight="1rem"
                paddingBottom="1rem"
                paddingTop="1rem"
                top="0"
            >
                <Flex
                    w={"fit-content"}
                    direction={"row"}
                    alignItems={{sm: "start", lg: "center"}}
                    justifyContent="space-between"
                    gap={4}
                    padding="0"
                    margin="0"
                >
                    <Flex
                        alignItems="center"
                        justifyContent="space-between"
                        padding="0"
                        margin="0"
                        w={{sm: "100%", lg: "fit-content"}}
                    >
                        <Box
                            display={{sm: "block", lg: "none"}}
                        >
                            <Box onClick={goToHomePage}></Box>
                        </Box>
                    </Flex>
                    <Heading
                        gridColumnStart={1}
                        gridColumnEnd={3}
                        fontSize={{sm: 16, md: 16, lg: 26, xl: 32}}
                        w="100%"
                        padding="0"
                        margin="0"
                        fontWeight={500}
                    >
                        <a href="/"><b>
                            UNED Links
                        </b></a>
                    </Heading>
                </Flex>
                <Box display={{sm: "none", lg: "block"}}>
                    <MenuButton/>
                </Box>
            </Flex>
            <Flex
                w="100%"
                paddingX="20px"
                zIndex={99}
                height="60px"
                alignItems="center"
                justifyContent="space-around"
                backgroundColor={useColorModeValue("lightBlue", "primary")}
                display={{sm: "flex", lg: "none"}}
                position="fixed"
                bottom="0"
            >
                <Box onClick={goToHomePage}>
                    <svg
                        className="home-svg"
                        width="28"
                        height="30.8"
                        viewBox="0 0 20 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1 8L10 1L19 8V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8Z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            stroke={useColorModeValue("#094169", "#eee")}
                        />
                        <path
                            d="M7 21V11H13V21"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            stroke={useColorModeValue("#094169", "#eee")}
                        />
                    </svg>
                </Box>
                <MenuButton/>
            </Flex>
            <Outlet/>
        </>
    );
}
