import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactDOMServer from "react-dom/server";
import {
    Box,
    Button,
    Container,
    Heading,
    HStack,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useToast,
    VStack,
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import CardEditor from "../components/CardEditor";
import { Categories } from "../assets/categories";

// Helper function to convert JSX icon to SVG string
const convertJSXIconToString = (icon) => {
    if (typeof icon === 'string') {
        return icon; // Already a string
    }

    // If it's a JSX element, convert to string
    try {
        return ReactDOMServer.renderToStaticMarkup(icon);
    } catch (error) {
        console.error("Error converting JSX icon:", error);
        // Return a default icon if conversion fails
        return `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>`;
    }
};

export default function SuperAdminDashboard() {
    const [cards, setCards] = useState([]);
    const [editingCard, setEditingCard] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        // Check authentication
        const token = localStorage.getItem("adminToken");
        if (!token) {
            navigate("/super-admin");
            return;
        }

        // Load cards from localStorage or use default
        const storedCards = localStorage.getItem("adminCards");
        if (storedCards) {
            setCards(JSON.parse(storedCards));
        } else {
            // Initialize with default categories
            // Convert all JSX icons to strings before storing
            const categoriesWithStringIcons = Categories.map(category => ({
                ...category,
                iconSVG: convertJSXIconToString(category.iconSVG)
            }));
            setCards(categoriesWithStringIcons);
            localStorage.setItem("adminCards", JSON.stringify(categoriesWithStringIcons));
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        toast({
            title: "Logged out",
            status: "info",
            duration: 2000,
            isClosable: true,
        });
        navigate("/super-admin");
    };

    const handleAddCard = () => {
        setEditingCard(null);
        onOpen();
    };

    const handleEditCard = (index) => {
        setEditingCard({ ...cards[index], index });
        onOpen();
    };

    const handleDeleteCard = (index) => {
        if (window.confirm("Are you sure you want to delete this card?")) {
            const updatedCards = cards.filter((_, i) => i !== index);
            setCards(updatedCards);
            localStorage.setItem("adminCards", JSON.stringify(updatedCards));
            toast({
                title: "Card deleted",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        }
    };

    const handleSaveCard = (cardData) => {
        // Ensure icon is a string before saving
        const cardDataWithStringIcon = {
            ...cardData,
            iconSVG: convertJSXIconToString(cardData.iconSVG)
        };

        let updatedCards;

        if (editingCard !== null && editingCard.index !== undefined) {
            // Edit existing card
            updatedCards = cards.map((card, i) =>
                i === editingCard.index ? cardDataWithStringIcon : card
            );
        } else {
            // Add new card
            updatedCards = [...cards, cardDataWithStringIcon];
        }

        setCards(updatedCards);
        localStorage.setItem("adminCards", JSON.stringify(updatedCards));
        onClose();

        toast({
            title: editingCard ? "Card updated" : "Card added",
            status: "success",
            duration: 2000,
            isClosable: true,
        });
    };

    return (
        <Container maxW="container.xl" py={8}>
            <VStack spacing={6} align="stretch">
                <HStack justify="space-between">
                    <Heading color="white">Admin Dashboard</Heading>
                    <HStack>
                        <Button colorScheme="green" onClick={handleAddCard}>
                            Add New Card
                        </Button>
                        <Button colorScheme="red" onClick={handleLogout}>
                            Logout
                        </Button>
                    </HStack>
                </HStack>

                <Box bg="darkerGreen" borderRadius="lg" p={6} overflowX="auto">
                    <Table variant="simple" colorScheme="whiteAlpha">
                        <Thead>
                            <Tr>
                                <Th color="white">Title</Th>
                                <Th color="white">Link</Th>
                                <Th color="white">Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {cards.map((card, index) => (
                                <Tr key={index}>
                                    <Td color="white">{card.title}</Td>
                                    <Td color="gray.400" maxW="300px" isTruncated>
                                        {card.route}
                                    </Td>
                                    <Td>
                                        <HStack spacing={2}>
                                            <IconButton
                                                icon={<EditIcon />}
                                                bg="primary"
                                                color="white"
                                                _hover={{ bg: "darkprimary" }}
                                                size="sm"
                                                onClick={() => handleEditCard(index)}
                                                aria-label="Edit card"
                                            />
                                            <IconButton
                                                icon={<DeleteIcon />}
                                                colorScheme="red"
                                                size="sm"
                                                onClick={() => handleDeleteCard(index)}
                                                aria-label="Delete card"
                                            />
                                        </HStack>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            </VStack>

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent bg="darkerGreen">
                    <ModalHeader color="white">
                        {editingCard ? "Edit Card" : "Add New Card"}
                    </ModalHeader>
                    <ModalCloseButton color="white" />
                    <ModalBody pb={6}>
                        <CardEditor
                            initialData={editingCard}
                            onSave={handleSaveCard}
                            onCancel={onClose}
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Container>
    );
}
