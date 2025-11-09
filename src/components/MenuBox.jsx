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
 *   Made by Open Source UoM (https://opensource.uom.gr)
 *
 *   Project members:
 *     -Alexandros Kourtis
 *
 * /
 */

import {Box, Flex, GridItem, Heading, useColorModeValue,} from "@chakra-ui/react";
import {motion} from "framer-motion";

const rotateIn = {
    initial: {
        rotateX: "180deg",
        opacity: 0,
    },
    inView: {
        rotateX: "0deg",
        opacity: 1,
        transition: {
            duration: 0.45,
            ease: "easeIn",
        },
    },
};

export default function MenuBox({category}) {
    const {title, iconSVG, route, span, requireSelection} =
        category;
    let condition = requireSelection;

    const handleNavigation = () => {
        window.open(route, "_blank");
    };

    const handleSelection = () => {
        handleNavigation();
    };

    return (
        <GridItem
            as={motion.div}
            variants={rotateIn}
            viewport={{once: true}}
            cursor="pointer"
            onClick={handleSelection}
            colSpan={span}
            role={"group"}
            border="2px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
            borderColor={useColorModeValue("primary", "light")}
            backgroundColor={useColorModeValue("primary", "transparent")}
            className={`menu-box-${span} ${condition ? "disabled" : ""}`}
            rounded="0.75rem"
            p={{sm: 2, md: 4, lg: 6}}
        >
            <Flex
                w="100%"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
            >
                <Box
                    minW={{sm: "12px", md: "48px", lg: "52px"}}
                    maxW={{sm: "16px", md: "48px", lg: "52px"}}
                    className={`svg-container ${useColorModeValue(
                        "light-mode-svg",
                        "dark-mode-svg"
                    )}`}
                >
                    {iconSVG}
                </Box>
                <Box
                    minW={{sm: "8px", md: "28px", lg: "32px"}}
                    maxW={{sm: "12px", md: "28px", lg: "32px"}}
                    className={`svg-container ${useColorModeValue(
                        "light-mode-svg",
                        "dark-mode-svg"
                    )}`}
                >
                    <svg
                        className="stroke-svg"
                        width="100%"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M0.873535 9L8.91951 1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M0.873535 1H8.91951V9"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </Box>
            </Flex>
            <Heading
                fontSize={{sm: "min(3vw, 12px)", md: 14, lg: 24, xl: 30}}
                color="light"
                w="100%"
                fontWeight={500}
            >
                {title}
            </Heading>
        </GridItem>
    );
}
