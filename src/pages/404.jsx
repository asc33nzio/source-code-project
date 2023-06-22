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
        navigate(`/verification/${token}`);
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

// // index.jsx
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { App } from './App';
// import { VerificationLandingPage } from './pages/verification_landing_page';

// ReactDOM.render(
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<App />} />
//       <Route path="/verification/*" element={<VerificationLandingPage />} />
//     </Routes>
//   </BrowserRouter>,
//   document.getElementById('root')
// );

// // verification_landing_page.jsx
// import { useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// export const VerificationLandingPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const token = location.pathname.replace('/verification/', ''); // Extract the token from the URL path

//     // Send a request to the backend API to verify the account using the token
//     // Example code:
//     // axios.patch('https://minpro-blog.purwadhikabootcamp.com/api/auth/verify', {}, { headers: { Authorization: `Bearer ${token}` } })
//     //   .then(response => {
//     //     // Handle successful verification
//     //     alert('Verification successful! You may now login.');
//     //     navigate('/login_user');
//     //   })
//     //   .catch(error => {
//     //     // Handle verification error
//     //     alert('Failed to verify account. Please check your e-mail or try again later.');
//     //   });

//     // For testing purposes, navigate to the login page directly
//     navigate('/login_user');
//   }, [location.pathname, navigate]);

//   return null; // Render nothing on the landing page
// };