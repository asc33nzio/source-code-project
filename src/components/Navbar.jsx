import {
    Box,
    Flex,
    Avatar,
    HStack,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    chakra,
    Text,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link as ROUTER_LINK, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from 'react-scroll';
import React, { useEffect, useState } from "react";
import anon from "../assets/default_ava.jpg";
import { useSelector, useDispatch } from "react-redux";
import { setLoggedIn, setLoggedOut } from '../redux/store';
import axios from 'axios';

const ChakraText = chakra(Text);

const NavLink = ({ to, children, fontWeight, fontFamily }) => (
    <Box
        as={ROUTER_LINK}
        to={to}
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: '#FEE101',
        }}
        fontWeight={fontWeight}
        fontFamily={fontFamily}
    >
        {children}
    </Box>
);

export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isLoggedOut = useSelector(state => state.auth.isLoggedOut);
    const [userAvatar, setUserAvatar] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const CustomMenuItem = chakra(MenuItem, {
        baseStyle: {
            _hover: {
                bg: "black",
            },
        },
    });

    useEffect(() => {
        const token = localStorage.getItem("token");

        // Function to fetch user login status from the API
        const fetchLoginStatus = async () => {
            try {
                // Make a GET request to the API endpoint to check login status
                const response = await axios.get(
                    "https://minpro-blog.purwadhikabootcamp.com/api/auth/",
                    {
                        headers: {
                            Authorization: `Bearer ${token}` // Use the authToken state variable in the headers
                        },
                    }
                );

                if (response.data.imgProfile) {
                    setUserAvatar(
                        `https://minpro-blog.purwadhikabootcamp.com/${response.data.imgProfile}`
                    );
                } else {
                    setUserAvatar('');
                }

                console.log("Exit the matrix. Return to the source.");
                console.log("Welcome");
                console.log(response.data.username);
                // Conditional to check if the response indicates that the user is logged in
                if (token) { //if (response.headers.authorization) { //not necessary anymore since we are now basing the auth from localstorage
                    dispatch(setLoggedIn());
                } else {
                    dispatch(setLoggedOut());
                }
            } catch (error) {
                console.error("Error fetching login status:", error);
                alert('Cannot verify your credentials. Please login or create an account to enjoy a better experience.');
            }
        };

        fetchLoginStatus();
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(setLoggedOut());
        localStorage.clear();
        localStorage.setItem('chakra-ui-color-mode', 'dark');
    };

    useEffect(() => {
        const checkWindowWidth = () => {
          const isMobileResolution = window.innerWidth < 1024;
    
          if (isMobileResolution) {
            navigate(`/where's_waldo`);
            alert("Sorry! This app is not optimized to be used on mobile displays. Please open on a PC.");
          }
        };
    
        checkWindowWidth(); // INITIAL CHECK
    
        const interval = setInterval(checkWindowWidth, 500); 
    
        return () => {
          clearInterval(interval);
        };
      }, [navigate]);

    return (
        <>
            <Box bg={'#A09006'} px={4} position="sticky" top={0} zIndex={100} w={'102vw'}>
                <Flex h={100} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={25} alignItems={'center'}>
                        <Box color={'#112022'} fontSize={'8px'}>
                            <Text
                                _hover={{
                                    color: '#259A80',
                                    bg: 'yellow',
                                    cursor: 'pointer'
                                }}
                                onClick={() => window.open('https://www.google.com/search?q=What+really+happened+to+Aaron+Swartz?', '_blank')}
                            >
                                ░██████╗░█████╗░██╗░░░██╗██████╗░░█████╗░███████╗    ░█████╗░░█████╗░██████╗░███████╗<br />
                                ██╔════╝██╔══██╗██║░░░██║██╔══██╗██╔══██╗██╔════╝    ██╔══██╗██╔══██╗██╔══██╗██╔════╝<br />
                                ╚█████╗░██║░░██║██║░░░██║██████╔╝██║░░╚═╝█████╗░░    ██║░░╚═╝██║░░██║██║░░██║█████╗░░<br />
                                ░╚═══██╗██║░░██║██║░░░██║██╔══██╗██║░░██╗██╔══╝░░    ██║░░██╗██║░░██║██║░░██║██╔══╝░░<br />
                                ██████╔╝╚█████╔╝╚██████╔╝██║░░██║╚█████╔╝███████╗    ╚█████╔╝╚█████╔╝██████╔╝███████╗<br />
                                ╚═════╝░░╚════╝░░╚═════╝░╚═╝░░╚═╝░╚════╝░╚══════╝    ░╚════╝░░╚════╝░╚═════╝░╚══════╝</Text></Box>
                        <HStack // Main stack for navbar children elements // md++ displays // responsiveness? the fuck is that. got no time for that. bro had to waste time making sure the API provider is doing their job right
                            textColor={'#1C1F0C'}
                            fontFamily={'monospace'}
                            fontSize={'20px'}
                            transition={'background-color 10s linear'}
                            as={'nav'}
                            spacing={5}
                            display={{ base: 'none', md: 'flex' }}>

                            <NavLink key='Home' fontWeight={'bold'} to="/">
                                Home
                            </NavLink>

                            <NavLink key='Search_Articles' fontWeight={'bold'} to="/">
                                Search Articles
                            </NavLink>

                            <ScrollLink
                                to="bikinibottom"
                                smooth={true}
                                duration={5000}
                            >
                                <ChakraText
                                    px={2}
                                    py={1}
                                    rounded="md"
                                    fontWeight="bold"
                                    fontFamily="monospace"
                                    _hover={{
                                        cursor: 'pointer',
                                        textDecoration: 'none',
                                        bg: '#FEE101',
                                    }}
                                >
                                    About
                                </ChakraText>
                            </ScrollLink>


                        </HStack>
                    </HStack>

                    <Flex alignItems={'center'}>
                        {!isLoggedOut ? (
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={'full'}
                                    variant={'link'}
                                    cursor={'pointer'}
                                    minW={0}>
                                    <Avatar
                                        size={'lg'}
                                        src={ userAvatar || anon } />
                                </MenuButton>
                                <MenuList zIndex={100} bg={'#B9AE0C'} color={'#259A80'} fontWeight={'bold'} fontFamily={'monospace'} fontSize={'15px'}>
                                    <ROUTER_LINK to={"/profile"}>
                                        <CustomMenuItem bg={'#B9AE0C'} fontWeight={'bold'}>
                                            Profile
                                        </CustomMenuItem>
                                    </ROUTER_LINK>

                                    <ROUTER_LINK to={"/write"}>
                                        <CustomMenuItem bg={'#B9AE0C'} fontWeight={'bold'}>
                                            Write Something
                                        </CustomMenuItem>
                                    </ROUTER_LINK>

                                    <ROUTER_LINK to={"/user_articles"}>
                                        <CustomMenuItem bg={'#B9AE0C'} fontWeight={'bold'}>
                                            Your Articles
                                        </CustomMenuItem>
                                    </ROUTER_LINK>

                                    <ROUTER_LINK to={"/heavens_door"}>
                                        <CustomMenuItem bg={'#B9AE0C'} fontWeight={'bold'}>
                                            God Mode
                                        </CustomMenuItem>
                                    </ROUTER_LINK>

                                    <MenuDivider />

                                    <CustomMenuItem bg={'#B9AE0C'} fontWeight={'bold'} onClick={handleLogout}>
                                        Logout
                                    </CustomMenuItem>
                                </MenuList>
                            </Menu>
                        ) : (
                            <Box display="flex" justifyContent="space-between" mr={5}>
                                <Button as={ROUTER_LINK} to="/register" fontSize="18px" variant="solid" colorScheme="yellow" size="md" marginRight="1rem"
                                    _hover={{
                                        textColor: '#88012A',
                                        bg: 'black',
                                        _before: {
                                            bg: 'inherit',
                                        },
                                        _after: {
                                            bg: 'inherit',
                                        },
                                    }}>
                                    Register
                                </Button>

                                <Button as={ROUTER_LINK} to="/verification" fontSize="18px" variant="solid" colorScheme="yellow" size="md" marginRight="1rem"
                                    _hover={{
                                        textColor: '#88012A',
                                        bg: 'black',
                                        _before: {
                                            bg: 'inherit',
                                        },
                                        _after: {
                                            bg: 'inherit',
                                        },
                                    }}>
                                    Verify
                                </Button>

                                <Button as={ROUTER_LINK} to="/login_user" fontSize="18px" variant="solid" colorScheme="yellow" size="md"
                                    _hover={{
                                        textColor: '#88012A',
                                        bg: 'black',
                                        _before: {
                                            bg: 'inherit',
                                        },
                                        _after: {
                                            bg: 'inherit',
                                        },
                                    }}>
                                    Login
                                </Button>
                            </Box>
                        )
                        }
                    </Flex>
                </Flex>

                {/* For responsive purposes. Do later when time is abundant. */}
                {/* {isOpen ? (
                    <Box pb={5} display={{ md: 'block' }}>
                        <Stack as={'nav'} spacing={5}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                            {isLoggedOut ? (
                                <NavLink key='Login' fontSize={'50px'} fontWeight={'bold'}>
                                    <ROUTER_LINK to="/login_user">Login</ROUTER_LINK>
                                </NavLink>
                            ) : null}
                        </Stack>
                    </Box>
                ) : null} */}
            </Box>
        </>
    );
}