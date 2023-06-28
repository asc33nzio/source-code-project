import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
      alert("Please feel free to express yourself, write whatever you feel!");
      alert("To start, why not upload a profile picture?");
      alert("Happy blogging! Enjoy your stay!");

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
    <Flex justify="center" align="center" height="130vh" bg="black" fontFamily={'monospace'}>
      <Box bg="#A09006" p={8} borderRadius="md" maxWidth={400} width="100%">
        <Box as='p' textAlign='center' color="yellow.700" fontSize="30px" fontWeight="bold" mb={4} >
          Don't Trust, Verify.
        </Box>

        <Box as='p' textAlign='center' color="black" fontSize="15px" fontWeight="bold" mb={4} >
          Normally, the link you click in your e-mail should verify your account. In the case that it doesn't, please follow the steps below. Open your e-mail and copy-paste your authentication token.
        </Box>

        <Box as='p' textAlign='center' color={'white'}>
          Check your spam folder too!
        </Box>

        <Box as='p' textAlign='center' color={'black'} mb={3}>
          The sender should be
        </Box>

        <Box as='p' textAlign='center' color={'blue.200'} fontWeight={'bold'} fontSize={'17px'}>
          fachriza.theblues@gmail.com
        </Box>

        <Box as='p' textAlign='center' color={'black'} mt={3}>
          Open the link and copy-paste everything in the input below
        </Box>

        <Box as='p' textAlign='center' color={'white'} mb={3}>
          You should copy everything after
        </Box>

        <Box as='p' textAlign='center' color={'yellow.700'} fontWeight={'bold'} fontSize={'16px'}>
          https://sourcecodeproject.netlify.app/
        </Box>

        <Box as='p' textAlign='center' color={'white'} mt={3} mb={3}>
          Sorry, not sorry mobile users, this app is not intended for mobile users anyway😛
        </Box>

        <Stack justify={'center'} align={'center'}>
          <Spinner size="lg" color="green.300" thickness="2px" />
        </Stack>

        <Box as='p' textAlign='center' color="black" fontSize="sm" mt={2} >
          Please wait, this may take a moment.
        </Box>

        <Box as='p' textAlign='center' color="black" fontSize="sm" mt={1} >
          Redirecting you to the login page in{' '}
        </Box>

        <Box as='p' textAlign='center' color={'green.300'} fontSize={'25px'}>
          {countdown}
        </Box>

        <Box textAlign={'center'}>
          {' '}
          second(s)...after you send the auth key
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
              placeholder={'Example key: eyJhbGciOiJIUzI...XK8'}
              mt={3}
              value={token}
              onChange={handleInputChange}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleVerify();
                }
              }}
              color={'blue.200'}
              _placeholder={{
                color: 'yellow.700',
              }}
            />
          </Stack>

          <Stack direction={'column'} alignContent={'center'} justifyContent={'center'} alignItems={'center'} justifyItems={'center'}>
            <Button type="button" onClick={handleVerify} mt={5} textColor={'green.300'} fontWeight={'bold'} fontSize={'19px'} >
              Verify Account
            </Button>

            <Link to={'/'}>
              <Button type="button" mt={5} textColor={'green.700'}>
                Return Home
              </Button>
            </Link>
          </Stack>


        </Stack>
      </Box>
    </Flex>
  );
};
