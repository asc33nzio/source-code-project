import React from "react";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import waldo from "../assets/404.jpg";

export const NotFound = () => {
    return (
        <Box
            textAlign="center"
            p={8}
            width="100vw"
            height="100vh"
            backgroundImage={`url(${waldo})`}
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
        >
            <Flex
                direction="column"
                align="center"
                justify="center"
                height="100%"
            >
                <Heading as="h1" fontSize="60px" mb={5} color="white">
                    Oops! Page not found.
                </Heading>

                <Button
                    as={Link}
                    to="/"
                    fontSize="18px"
                    variant="solid"
                    colorScheme="yellow"
                    size="md"
                    _hover={{
                        textColor: "#88012A",
                        bg: "black",
                        _before: {
                            bg: "inherit",
                        },
                        _after: {
                            bg: "inherit",
                        },
                    }}
                    mb={2}
                >
                    Go Back Home
                </Button>
            </Flex>
        </Box>
    );
};
