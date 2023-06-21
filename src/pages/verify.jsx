import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Text, Flex, Alert, AlertIcon, CloseButton, Spinner, Stack, Button } from '@chakra-ui/react';

export const VerifyAccount = () => {
  // const { token } = useParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const location = useLocation();

  useEffect(() => {
    const storedToken = new URLSearchParams(location.search).get('token');

    localStorage.setItem('verificationToken', storedToken);
  }, [location.search]);

  const handleVerify = async () => {
    const storedToken = localStorage.getItem('verificationToken');

    const header = {
      Authorization: `Bearer ${storedToken}`
    };

    try {
      const response = await axios.patch('https://minpro-blog.purwadhikabootcamp.com/api/auth/verify', {}, { headers: header });

      alert('Verification successful! You may now login.');

      const interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      setTimeout(() => {
        navigate('/login_user');
        clearInterval(interval);
      }, 10000);

      console.log(response);
    } catch (err) {
      <Alert status="error" mt={4}>
        <AlertIcon />
          Failed to verify account. Please check your e-mail or try again later.
        <CloseButton position="absolute" right="8px" top="8px" onClick={() => { }} />
      </Alert>
    }
  };

  return (
    <Flex justify="center" align="center" height="100vh" bg="black" fontFamily={'monospace'} >
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
          Redirecting you to the login page in <Text color={'#39FF14'} fontSize={'25px'}>{countdown}</Text> second(s)...
        </Text>
        <Button type="button" onClick={handleVerify}>
          Verify Account
        </Button>
      </Box>
    </Flex>
  );
};
