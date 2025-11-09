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
 *     -Alexandros Kourtis
 *
 * /
 */

import {Accordion, Box, Flex, Grid, Text,} from "@chakra-ui/react";
import ProjectMembersList from "../components/ProjectMembersList";
import {motion} from "framer-motion";
import projectMembers from "../assets/projectMembers";

function AboutSettingsPage() {
    return (
        <Box
            align="center"
            marginTop="1em"
            fontSize={{sm: 11.95, md: 16, lg: 26, xl: 32}}
        >
            <Accordion allowToggle="true" mt="1rem">
                <Text
                    w="100%"
                    p="1rem"
                    display="flex"
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    fontWeight="bold"
                    fontSize={{sm: 14, md: 16, lg: 18}}
                >
                    UNED Group Links - A collection of useful links for UNED groups
                </Text>
                <Flex
                    w={{sm: "90%", md: "75%", lg: "50%"}}
                    direction="row"
                    align="center"
                    justify="start"
                >

                    <Grid
                        w="100%"
                        as={motion.section}
                        initial="initial"
                        animate="inView"
                        gap={{sm: "1.5rem", lg: "2.5rem"}}
                        templateRows={{sm: "1fr"}}
                    >
                        <ProjectMembersList
                            heading="Developers"
                            membersList={projectMembers}
                        />
                    </Grid>
                </Flex>
            </Accordion>
        </Box>
    );
}

export default AboutSettingsPage;
