import * as React from "react";
import { Flex, Heading, Input, Text, extendTheme, ChakraProvider, Button } from "@chakra-ui/react";
import { Link as ROUTER_LINK } from "react-router-dom";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setAuthToken } from '../redux/store';

export function Forget() {
    const [email, setEmail] = React.useState("");

    const checkboxTheme = extendTheme({
        components: {
            Checkbox: {
                baseStyle: {
                    control: {
                        _checked: {
                            bg: 'red',
                            borderColor: 'red',
                        },
                    },
                },
            },
        },
    });

    const dispatch = useDispatch();

    const handleForget = async () => {
        try {
            const response = await axios.put(
                "https://minpro-blog.purwadhikabootcamp.com/api/auth/forgotPass",
                {
                    email: email,
                }
            );
            console.log(response.data);
            alert("Check your e-mail for the password reset link.")
            dispatch(setAuthToken(response.data.token));
        } catch (error) {
            console.error(error);
            alert('Email does not exist');
            // Handle error or display error message to the user
        }
    };

    return (
        <ChakraProvider theme={checkboxTheme}>
            <Flex
                width={'100vw'}
                height={'100vh'}
                justifyContent={'center'}
                alignItems={'center'}
                backgroundColor={'black'}
                color={'#FEE101'}
                position={'fixed'}
                inset={'0'}
            >
                <Flex direction="column" alignItems="center" mt={-3} mr={2}>
                    <Flex
                        direction={'column'}
                        width={'30vw'}
                        height={'30vh'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        position={'relative'}
                        fontFamily={'Cascadia Mono'}
                    >
                        <Heading position={"block"} fontFamily={'monospace'}>
                            FORGET ME NOT.
                        </Heading>

                        <Input
                            placeholder={"Enter your e-mail address"}
                            position={"relative"}
                            borderColor={'red'}
                            borderBlock={'red'}
                            focusBorderColor={'red'}
                            value={email}
                            onChange={(input) => setEmail(input.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                  handleForget();
                                }
                              }}
                        />

                        <Flex
                            direction={'row'}
                            justifyContent={'space-between'}
                            alignItems={'center'}
                            bgColor={'none'}
                            width={'30vw'}
                            height={'3vh'}
                        >
                            <Flex direction={'row'} justifyContent={'space-between'} alignItems={'center'} bgColor={'none'} width={'30vw'} height={'3vh'} marginTop={'10px'}>

                                <Text>
                                    <ROUTER_LINK to={'/'}>Return Home</ROUTER_LINK>
                                </Text>

                                <Button
                                    mt={35}
                                    mr={3}
                                    colorScheme="yellow"
                                    size="md"
                                    onClick={handleForget}
                                >
                                Reset Password
                                </Button>

                                <Text>
                                    <ROUTER_LINK to={'/register'}>Register</ROUTER_LINK>
                                </Text>

                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </ChakraProvider >
    );
}
