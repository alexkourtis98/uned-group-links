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

import {Box, Flex, Text, useColorModeValue,} from "@chakra-ui/react";

export default function ProjectMembersCard({data}) {
    const SelectBorderColor = () => {
        return useColorModeValue("primary", "light");
    };
    return (
        <a href={data.socialMedia}>
            <Box w="100%" my={{sm: ".25rem", md: ".5rem", lg: ".75rem"}} borderRadius="20" overflow="hidden"
                 border="2px"
                 borderColor={SelectBorderColor()}>
                <Flex>
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
                        {data.name}
                    </Text>
                </Flex>
            </Box>
        </a>
    );
}
