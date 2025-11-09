import { useState, useEffect } from "react";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    HStack,
} from "@chakra-ui/react";
import IconPicker from "./IconPicker";

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
            // If editing existing card with icon, use it; otherwise use default
            if (initialData.iconSVG) {
                // If it's a string, use it directly
                if (typeof initialData.iconSVG === 'string') {
                    setIconSVG(initialData.iconSVG);
                } else {
                    // If it's a JSX element, use default (will be converted by SuperAdminDashboard)
                    setIconSVG(DEFAULT_ICON);
                }
            }
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create card data with string SVG
        const cardData = {
            title,
            route,
            iconSVG: iconSVG, // Store as string for localStorage compatibility
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
                        bg="darkGreen"
                        color="white"
                        borderColor="darkprimary"
                        _hover={{ borderColor: "primary" }}
                        _focus={{ borderColor: "secondary" }}
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel color="white">Link URL</FormLabel>
                    <Input
                        value={route}
                        onChange={(e) => setRoute(e.target.value)}
                        placeholder="https://example.com"
                        bg="darkGreen"
                        color="white"
                        borderColor="darkprimary"
                        _hover={{ borderColor: "primary" }}
                        _focus={{ borderColor: "secondary" }}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel color="white">Icon</FormLabel>
                    <IconPicker
                        selectedIcon={iconSVG}
                        onSelectIcon={setIconSVG}
                    />
                </FormControl>

                <HStack width="100%" justify="flex-end" spacing={3} pt={4}>
                    <Button variant="ghost" onClick={onCancel} color="white">
                        Cancel
                    </Button>
                    <Button type="submit" bg="primary" color="white" _hover={{ bg: "darkprimary" }}>
                        {initialData ? "Update Card" : "Add Card"}
                    </Button>
                </HStack>
            </VStack>
        </form>
    );
}
