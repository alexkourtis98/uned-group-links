import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactDOMServer from "react-dom/server";
import axios from "axios";
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
    Spinner,
    Text,
    Alert,
    AlertIcon,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import CardEditor from "../components/CardEditor";
import { Categories } from "../assets/categories";
import { getCardsFromEnv, getAdminSecret } from "../utils/envCardsReader";

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
    const [isDeploying, setIsDeploying] = useState(false);
    const [deploymentStatus, setDeploymentStatus] = useState(null);
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

        // Load cards from environment variable (managed by Vercel)
        const envCards = getCardsFromEnv();
        if (envCards && envCards.length > 0) {
            setCards(envCards);
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

    // Function to save cards via Vercel API
    const saveCardsToVercel = async (updatedCards) => {
        setIsDeploying(true);
        setDeploymentStatus("Updating cards and triggering deployment...");

        try {
            const adminSecret = getAdminSecret();

            const response = await axios.post("/api/update-cards", {
                cards: updatedCards,
                adminSecret: adminSecret
            });

            if (response.data.success) {
                setDeploymentStatus("Deployment started! Changes will be live in 1-2 minutes.");

                toast({
                    title: "Deployment Started",
                    description: "Your changes are being deployed. The page will reload when complete.",
                    status: "info",
                    duration: 120000, // 2 minutes
                    isClosable: true,
                });

                // Poll for deployment completion or auto-reload after 90 seconds
                setTimeout(() => {
                    window.location.reload();
                }, 90000); // 90 seconds
            }
        } catch (error) {
            console.error("Error saving cards:", error);
            setDeploymentStatus(null);

            toast({
                title: "Error",
                description: error.response?.data?.error || "Failed to save changes. Please try again.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsDeploying(false);
        }
    };

    const handleDeleteCard = (index) => {
        if (window.confirm("Are you sure you want to delete this card?")) {
            const updatedCards = cards.filter((_, i) => i !== index);
            setCards(updatedCards);
            saveCardsToVercel(updatedCards);

            toast({
                title: "Card deleted",
                description: "Deploying changes...",
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
        saveCardsToVercel(updatedCards);
        onClose();

        toast({
            title: editingCard ? "Card updated" : "Card added",
            description: "Deploying changes...",
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
                        <Button
                            colorScheme="green"
                            onClick={handleAddCard}
                            isDisabled={isDeploying}
                        >
                            Add New Card
                        </Button>
                        <Button
                            colorScheme="red"
                            onClick={handleLogout}
                            isDisabled={isDeploying}
                        >
                            Logout
                        </Button>
                    </HStack>
                </HStack>

                {/* Deployment Status Alert */}
                {isDeploying && (
                    <Alert status="info" variant="solid" borderRadius="md">
                        <Spinner size="sm" mr={3} />
                        <VStack align="start" spacing={0}>
                            <Text fontWeight="bold">Deploying Changes...</Text>
                            <Text fontSize="sm">{deploymentStatus}</Text>
                        </VStack>
                    </Alert>
                )}

                {deploymentStatus && !isDeploying && (
                    <Alert status="success" variant="solid" borderRadius="md">
                        <AlertIcon />
                        <Text>{deploymentStatus}</Text>
                    </Alert>
                )}

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
                                                isDisabled={isDeploying}
                                            />
                                            <IconButton
                                                icon={<DeleteIcon />}
                                                colorScheme="red"
                                                isDisabled={isDeploying}
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
