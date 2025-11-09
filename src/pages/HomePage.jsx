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

import {useEffect, useState} from "react";
import {Categories} from "../assets/categories";
import MenuBox from "../components/MenuBox";
import {Flex, Grid, Heading} from "@chakra-ui/react";
import {motion} from "framer-motion";
import {getCardsFromEnv} from "../utils/envCardsReader";

const stagger = {
    inView: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export default function HomePage() {
    const [categoriesListForSearch, setCategoriesListForSearch] =
        useState(Categories);

    useEffect(() => {
        window.scrollTo(0, 0);

        // Load cards from environment variable (set by admin via Vercel API)
        const cards = getCardsFromEnv();
        setCategoriesListForSearch(cards);
    }, []);
    return (
        <Flex
            direction="column"
            align="center"
            justify="start"
            w="100%"
            h="100%"
            marginTop="2rem"
            gap="3rem"
            px={{sm: "1rem", lg: "5rem"}}
        >
            <Grid
                as={motion.section}
                initial="initial"
                animate="inView"
                variants={stagger}
                className="home-grid"
                w={{sm: "100%"}}
                gap={{sm: 2, md: 3, lg: 4}}
                templateColumns={{
                    sm: "repeat(3, 1fr)",
                    "2xl": "repeat(5, 1fr)",
                }}
            >
                {categoriesListForSearch.length === 0 ? (
                    <Heading
                        gridColumnStart={1}
                        gridColumnEnd={3}
                        fontSize={{sm: 11.95, md: 16, lg: 26, xl: 32}}
                        w="100%"
                        fontWeight={500}
                    >
                        Η αναζήτηση δεν επέστρεψε αποτελέσματα.
                    </Heading>
                ) : null}
                {categoriesListForSearch.map(category => (
                    <MenuBox category={category} key={category.title}/>
                ))}
            </Grid>
        </Flex>
    );
}
