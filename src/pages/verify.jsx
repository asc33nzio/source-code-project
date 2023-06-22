import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Flex, Alert, AlertIcon, CloseButton, Spinner, Stack, Button, Input } from '@chakra-ui/react';

export const VerifyAccount = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleVerify = async () => {
    const headers = {
      Authorization: `Bearer ${token}`
    };

    try {
      const response = await axios.patch(
        `https://minpro-blog.purwadhikabootcamp.com/api/auth/verify/`,
        {},
        {
          headers: headers
        }
      );

      alert("Verification successful! You may now login.");
      alert("PS. Yes, it's quite a tedious process, sorry. Don't blame me. I'm not the API provider.");
      alert("Enjoy your stay!")

      const interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      setTimeout(() => {
        navigate('/login_user');
        clearInterval(interval);
      }, 1000);

      console.log(response);

    } catch (error) {
      console.log(error)
      setError('Failed to verify. Please check your authentication key again, or make a new account.');
    }
  };

  const handleInputChange = (event) => {
    setToken(event.target.value);
  };

  return (
    <Flex justify="center" align="center" height="110vh" bg="black" fontFamily={'monospace'}>
      <Box bg="#A09006" p={8} borderRadius="md" maxWidth={400} width="100%">
        <Box as='p' textAlign='center' color="#39FF14" fontSize="30px" fontWeight="bold" mb={4} >
          Don't Trust, Verify.
        </Box>

        <Box as='p' textAlign='center' color="black" fontSize="15px" fontWeight="bold" mb={4} >
          Please open your e-mail and copy-paste your authentication token.
        </Box>

        <Box as='p' textAlign='center' color={'white'}>
          Check your spam folder too!
        </Box>

        <Box as='p' textAlign='center' color={'black'} mb={3}>
          The sender should be
        </Box>

        <Box as='p' textAlign='center' color={'teal'} fontWeight={'bold'} fontSize={'17px'}>
          fachriza.theblues@gmail.com
        </Box>

        <Box as='p' textAlign='center' color={'black'} mt={3}>
          Open the link and copy-paste everything in the input below
        </Box>

        <Box as='p' textAlign='center' color={'white'} mb={3}>
          You should copy everything after
        </Box>

        <Box as='p' textAlign='center' color={'gold'} fontWeight={'bold'} fontSize={'17px'}>
          http://localhost:3000/verification/
        </Box>

        <Box as='p' textAlign='center' color={'white'} mt={3} mb={3}>
          Sorry, not sorry mobile users, this app is not intended for mobile users anyway😛
        </Box>

        <Stack justify={'center'} align={'center'}>
          <Spinner size="lg" color="#39FF14" thickness="2px" />
        </Stack>

        <Box as='p' textAlign='center' color="black" fontSize="sm" mt={2} >
          Please wait, this may take a moment.
        </Box>

        <Box as='p' textAlign='center' color="black" fontSize="sm" mt={1} >
          Redirecting you to the login page in{' '}
        </Box>

        <Box as='p' textAlign='center' color={'#39FF14'} fontSize={'25px'}>
          {countdown}
        </Box>
        
        <Box textAlign={'center'}>
        {' '}
        second(s)...
        </Box>

        <Stack>
          {error && (
            <Alert status="error" mt={4} color={'maroon'}>
              <AlertIcon />
              {error}
              <CloseButton position="absolute" right="8px" top="8px" color={'red'} onClick={() => setError('')} />
            </Alert>
          )}
          <Stack>
            <Input
              placeholder={'Your auth key here..'}
              mt={3}
              value={token}
              onChange={handleInputChange}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleVerify();
                }
              }}
            />
          </Stack>
          <Button type="button" onClick={handleVerify} alignSelf={'center'} mt={5} textColor={'#39FF14'}>
            Verify Account
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
};
