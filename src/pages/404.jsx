import { Box, Flex, Spinner, Stack, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import React from "react";

export const NotFound = () => {
    // const [countdown, setCountdown] = useState(5);
    const navigate = useNavigate();
    const { token } = useParams();

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setCountdown((prevCountdown) => prevCountdown - 1);
    //     }, 1000);

    //     setTimeout(() => {
    //         navigate('/login_user');
    //         clearInterval(interval);
    //     }, countdown * 1000);

    //     return () => {
    //         clearInterval(interval);
    //     };
    // }, [navigate, countdown]);

    useEffect(() => {
        navigate(`https://scp--sourcecode-project.netlify.app/verification/${token}`);
    }, [navigate, token]);

    return (
        <>
            <Box>
                <Text>
                    Are you trying to verify your account? Please wait..
                </Text>
            </Box>
            <Flex justify="center" align="center" height="100vh" bg="black" fontFamily={'monospace'}>
                <Box bg="#A09006" p={8} borderRadius="md" maxWidth={400} width="100%">
                    <Text color="black" fontSize="30px" fontWeight="bold" mb={4} textAlign={'center'}>
                        Verifying your account....You need to keep the verification link you clicked in your e-mail open and click the verify account button below for this to work.
                    </Text>
                    <Stack justify={'center'} align={'center'}>
                        <Spinner size="lg" color="#39FF14" thickness="2px" />
                    </Stack>
                    <Text color="black" fontSize="sm" mt={2} textAlign={'center'}>
                        Please wait, this may take a moment.
                    </Text>
                    <Text color="black" fontSize="sm" mt={4} textAlign={'center'}>
                        Redirecting you to the verify page in <Text color={'#39FF14'} fontSize={'25px'}>countdown!</Text> second(s)...
                    </Text>
                    {/* <Button type="button" onClick={handleVerify}>
                Verify Account
              </Button> */}
                </Box>
            </Flex>
        </>
    );
};