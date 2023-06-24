import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Flex, Alert, AlertIcon, CloseButton, Spinner, Button } from '@chakra-ui/react';

export const VerifyAuto = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        const header = {
            Authorization: `Bearer ${token}`
        };

        const getVerified = async () => {
            try {
                const response = await axios.patch(`https://minpro-blog.purwadhikabootcamp.com/api/auth/verify/`, {}, { headers: header });

                alert("Verification successful! You may now login.");
                alert("Please feel free to express yourself, write whatever you feel!");
                alert("To start, why not upload a profile picture?");
                alert("Happy blogging! Enjoy your stay!");

                const interval = setInterval(() => {
                    setCountdown((prevCountdown) => prevCountdown - 1);
                }, 1000);

                setTimeout(() => {
                    navigate('/login_user');
                    clearInterval(interval);
                }, 10000);

                console.log(response);
            } catch (err) {
                console.log(err);
                <Alert status="error" mt={4}>
                    <AlertIcon />
                    Failed to verify account. Please check your e-mail and try again, or try to verify your account manually.
                    <CloseButton position="absolute" right="8px" top="8px" onClick={() => { }} />
                </Alert>
            }
        };

        getVerified();
    }, [navigate, token]);

    return (

        <Flex justify="center" align="center" height="100vh" bg="black" fontFamily={'monospace'} >
            <Box bg="#A09006" p={8} borderRadius="md" maxWidth={400} width="100%">
                <Box color="yellow.700" fontSize="30px" fontWeight="bold" mb={4} textAlign={'center'}>
                    Verifying your account....
                </Box>
                <Box justify={'center'} align={'center'}>
                    <Spinner size="lg" color="green.300" thickness="2px" />
                </Box>

                <Box color="black" fontSize="sm" mt={2} textAlign={'center'}>
                    Please wait, this may take a moment.
                </Box>

                <Box color="black" fontSize="sm" mt={4} textAlign={'center'}>
                    Redirecting you to the login page in <Box color={'green.300'} fontSize={'25px'}>{countdown}</Box> second(s)...
                </Box>

                <Box textAlign="center">
                    <Link to={'/login_user'}>
                        <Button type="button" mt={5} textColor={'yellow.700'}>
                            Login
                        </Button>
                    </Link>
                </Box>

            </Box>
        </Flex>
    );
};