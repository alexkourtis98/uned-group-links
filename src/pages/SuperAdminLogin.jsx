import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Text,
    VStack,
    useToast,
} from "@chakra-ui/react";
import { getAdminCredentials } from "../utils/envCardsReader";

export default function SuperAdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);

        // Get admin credentials from environment variables
        const adminCredentials = getAdminCredentials();

        // Simple authentication check
        if (email === adminCredentials.email && password === adminCredentials.password) {
            // Set session token
            localStorage.setItem("adminToken", btoa(`${email}:${Date.now()}`));

            toast({
                title: "Login successful",
                description: "Welcome to the admin panel",
                status: "success",
                duration: 3000,
                isClosable: true,
            });

            navigate("/super-admin/dashboard");
        } else {
            toast({
                title: "Login failed",
                description: "Invalid email or password",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }

        setLoading(false);
    };

    return (
        <Container maxW="md" py={20}>
            <Box
                bg="darkerGreen"
                p={8}
                borderRadius="lg"
                boxShadow="xl"
            >
                <VStack spacing={6}>
                    <Heading color="white" size="lg">
                        Super Admin Login
                    </Heading>
                    <Text color="gray.400" fontSize="sm">
                        Enter your credentials to access the admin panel
                    </Text>

                    <form onSubmit={handleLogin} style={{ width: "100%" }}>
                        <VStack spacing={4}>
                            <FormControl isRequired>
                                <FormLabel color="white">Email</FormLabel>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@example.com"
                                    bg="darkGreen"
                                    color="white"
                                    borderColor="darkprimary"
                                    _hover={{ borderColor: "primary" }}
                                    _focus={{ borderColor: "secondary" }}
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel color="white">Password</FormLabel>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                    bg="darkGreen"
                                    color="white"
                                    borderColor="darkprimary"
                                    _hover={{ borderColor: "primary" }}
                                    _focus={{ borderColor: "secondary" }}
                                />
                            </FormControl>

                            <Button
                                type="submit"
                                bg="primary"
                                color="white"
                                _hover={{ bg: "darkprimary" }}
                                width="100%"
                                isLoading={loading}
                                loadingText="Logging in..."
                            >
                                Login
                            </Button>
                        </VStack>
                    </form>
                </VStack>
            </Box>
        </Container>
    );
}
