import { useState } from "react";
import {
    Box,
    Button,
    Grid,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    Tab,
    TabList,
    Tabs,
    Text,
    Textarea,
    VStack,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { getIconsByCategory, searchIcons } from "../assets/iconLibrary";

export default function IconPicker({ selectedIcon, onSelectIcon }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [showCustom, setShowCustom] = useState(false);
    const [customSVG, setCustomSVG] = useState("");

    // Get filtered icons based on search and category
    const getFilteredIcons = () => {
        if (searchQuery) {
            return searchIcons(searchQuery);
        }
        return getIconsByCategory(activeCategory);
    };

    const filteredIcons = getFilteredIcons();

    const handleIconClick = (svg) => {
        onSelectIcon(svg);
        setShowCustom(false);
    };

    const handleCustomSVGSubmit = () => {
        if (customSVG.trim()) {
            onSelectIcon(customSVG);
            setShowCustom(false);
        }
    };

    return (
        <VStack spacing={4} align="stretch">
            {/* Search Bar */}
            <InputGroup>
                <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.400" />
                </InputLeftElement>
                <Input
                    placeholder="Search icons..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    bg="darkGreen"
                    color="white"
                    borderColor="darkprimary"
                    _hover={{ borderColor: "primary" }}
                    _focus={{ borderColor: "secondary" }}
                />
            </InputGroup>

            {/* Category Tabs */}
            {!searchQuery && (
                <Tabs
                    variant="soft-rounded"
                    onChange={(index) => {
                        const categories = ["all", "social", "academic", "action"];
                        setActiveCategory(categories[index]);
                    }}
                >
                    <TabList>
                        <Tab color="gray.300" _selected={{ color: "white", bg: "primary" }}>
                            All
                        </Tab>
                        <Tab color="gray.300" _selected={{ color: "white", bg: "primary" }}>
                            Social
                        </Tab>
                        <Tab color="gray.300" _selected={{ color: "white", bg: "primary" }}>
                            Academic
                        </Tab>
                        <Tab color="gray.300" _selected={{ color: "white", bg: "primary" }}>
                            Actions
                        </Tab>
                    </TabList>
                </Tabs>
            )}

            {/* Selected Icon Preview */}
            {selectedIcon && !showCustom && (
                <Box
                    p={4}
                    bg="darkGreen"
                    borderRadius="md"
                    borderWidth="2px"
                    borderColor="primary"
                >
                    <Text color="white" fontSize="sm" mb={2}>
                        Selected Icon:
                    </Text>
                    <Box
                        w="50px"
                        h="50px"
                        dangerouslySetInnerHTML={{ __html: selectedIcon }}
                    />
                </Box>
            )}

            {/* Icon Grid */}
            {!showCustom && (
                <Box
                    maxH="300px"
                    overflowY="auto"
                    p={2}
                    bg="darkerGreen"
                    borderRadius="md"
                    css={{
                        "&::-webkit-scrollbar": {
                            width: "8px",
                        },
                        "&::-webkit-scrollbar-track": {
                            background: "#002920",
                        },
                        "&::-webkit-scrollbar-thumb": {
                            background: "#003C32",
                            borderRadius: "4px",
                        },
                        "&::-webkit-scrollbar-thumb:hover": {
                            background: "#718096",
                        },
                    }}
                >
                    {filteredIcons.length === 0 ? (
                        <Text color="gray.400" textAlign="center" py={4}>
                            No icons found
                        </Text>
                    ) : (
                        <Grid
                            templateColumns="repeat(auto-fill, minmax(70px, 1fr))"
                            gap={2}
                        >
                            {filteredIcons.map((icon, index) => (
                                <VStack
                                    key={index}
                                    p={2}
                                    bg={selectedIcon === icon.svg ? "primary" : "darkGreen"}
                                    borderRadius="md"
                                    cursor="pointer"
                                    onClick={() => handleIconClick(icon.svg)}
                                    _hover={{
                                        bg: selectedIcon === icon.svg ? "darkprimary" : "primary",
                                        transform: "scale(1.05)",
                                    }}
                                    transition="all 0.2s"
                                    spacing={1}
                                >
                                    <Box
                                        w="40px"
                                        h="40px"
                                        dangerouslySetInnerHTML={{ __html: icon.svg }}
                                    />
                                    <Text
                                        color="white"
                                        fontSize="xs"
                                        textAlign="center"
                                        noOfLines={1}
                                    >
                                        {icon.name}
                                    </Text>
                                </VStack>
                            ))}
                        </Grid>
                    )}
                </Box>
            )}

            {/* Custom SVG Input */}
            {showCustom && (
                <VStack spacing={3} align="stretch">
                    <Textarea
                        value={customSVG}
                        onChange={(e) => setCustomSVG(e.target.value)}
                        placeholder="Paste your custom SVG code here..."
                        bg="darkGreen"
                        color="white"
                        borderColor="darkprimary"
                        _hover={{ borderColor: "primary" }}
                        _focus={{ borderColor: "secondary" }}
                        rows={8}
                        fontFamily="monospace"
                        fontSize="sm"
                    />
                    <HStack justify="flex-end">
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setShowCustom(false)}
                            color="white"
                        >
                            Cancel
                        </Button>
                        <Button
                            size="sm"
                            bg="primary"
                            color="white"
                            _hover={{ bg: "darkprimary" }}
                            onClick={handleCustomSVGSubmit}
                            isDisabled={!customSVG.trim()}
                        >
                            Use Custom Icon
                        </Button>
                    </HStack>
                </VStack>
            )}

            {/* Toggle Custom SVG Button */}
            <Button
                variant="outline"
                size="sm"
                onClick={() => {
                    setShowCustom(!showCustom);
                    if (!showCustom) {
                        setCustomSVG(selectedIcon || "");
                    }
                }}
                color="white"
                borderColor="gray.600"
                _hover={{ borderColor: "gray.500", bg: "gray.700" }}
            >
                {showCustom ? "Choose from Library" : "Use Custom SVG"}
            </Button>
        </VStack>
    );
}
