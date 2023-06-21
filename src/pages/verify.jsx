import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Text, Flex, Alert, AlertIcon, CloseButton, Spinner, Stack } from '@chakra-ui/react';

export const VerifyAccount = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const header = {
      Authorization: `Bearer ${token}`
    };

    const getVerified = async () => {
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
        console.log(err);
        <Alert status="error" mt={4}>
          <AlertIcon />
          Failed to verify account. Please check your e-mail or try again later.
          <CloseButton position="absolute" right="8px" top="8px" onClick={() => { }} />
        </Alert>
      }
    };

    getVerified();
  }, [navigate, token]);

  return (
    <Flex justify="center" align="center" height="100vh" bg="black" fontFamily={'monospace'} >
      <Box bg="#A09006" p={8} borderRadius="md" maxWidth={400} width="100%">
        <Text color="black" fontSize="30px" fontWeight="bold" mb={4} textAlign={'center'}>
          Verifying your account....
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
        
      </Box>
    </Flex>
  );
};
