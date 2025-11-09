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

const ADMIN_EMAIL = "akourtisdev@gmail.com";
const ADMIN_PASSWORD = "snickerS11?.?";

export default function SuperAdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simple authentication check
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
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
                bg="gray.800"
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
                                    bg="gray.700"
                                    color="white"
                                    borderColor="gray.600"
                                    _hover={{ borderColor: "gray.500" }}
                                    _focus={{ borderColor: "blue.500" }}
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel color="white">Password</FormLabel>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                    bg="gray.700"
                                    color="white"
                                    borderColor="gray.600"
                                    _hover={{ borderColor: "gray.500" }}
                                    _focus={{ borderColor: "blue.500" }}
                                />
                            </FormControl>

                            <Button
                                type="submit"
                                colorScheme="blue"
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
