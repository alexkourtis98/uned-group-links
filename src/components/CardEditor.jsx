import { useState, useEffect } from "react";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    VStack,
    HStack,
} from "@chakra-ui/react";

// Default SVG icon for new cards
const DEFAULT_ICON = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 17L12 22L22 17" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12L12 17L22 12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>`;

export default function CardEditor({ initialData, onSave, onCancel }) {
    const [title, setTitle] = useState("");
    const [route, setRoute] = useState("");
    const [iconSVG, setIconSVG] = useState(DEFAULT_ICON);

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || "");
            setRoute(initialData.route || "");
            // Convert JSX icon back to string if it exists
            if (initialData.iconSVG) {
                // For simplicity, we'll use a default icon for existing cards
                // In production, you'd want to serialize/deserialize JSX properly
                setIconSVG(DEFAULT_ICON);
            }
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create card data
        // Note: For now, we're using a string representation
        // In production, you'd want proper JSX handling
        const cardData = {
            title,
            route,
            iconSVG: DEFAULT_ICON, // This will be converted to JSX when rendering
            span: 1,
            requireSelection: false,
        };

        onSave(cardData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
                <FormControl isRequired>
                    <FormLabel color="white">Card Title</FormLabel>
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g., Academic Calendar"
                        bg="gray.700"
                        color="white"
                        borderColor="gray.600"
                        _hover={{ borderColor: "gray.500" }}
                        _focus={{ borderColor: "blue.500" }}
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel color="white">Link URL</FormLabel>
                    <Input
                        value={route}
                        onChange={(e) => setRoute(e.target.value)}
                        placeholder="https://example.com"
                        bg="gray.700"
                        color="white"
                        borderColor="gray.600"
                        _hover={{ borderColor: "gray.500" }}
                        _focus={{ borderColor: "blue.500" }}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel color="white">Icon SVG (Optional)</FormLabel>
                    <Textarea
                        value={iconSVG}
                        onChange={(e) => setIconSVG(e.target.value)}
                        placeholder="Paste SVG code here..."
                        bg="gray.700"
                        color="white"
                        borderColor="gray.600"
                        _hover={{ borderColor: "gray.500" }}
                        _focus={{ borderColor: "blue.500" }}
                        rows={6}
                        fontFamily="monospace"
                        fontSize="sm"
                    />
                </FormControl>

                <HStack width="100%" justify="flex-end" spacing={3} pt={4}>
                    <Button variant="ghost" onClick={onCancel} color="white">
                        Cancel
                    </Button>
                    <Button type="submit" colorScheme="blue">
                        {initialData ? "Update Card" : "Add Card"}
                    </Button>
                </HStack>
            </VStack>
        </form>
    );
}
