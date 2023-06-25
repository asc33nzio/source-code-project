import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Flex,
    ChakraProvider,
    extendTheme,
    Heading,
    Input,
    Button,
    FormControl,
    FormErrorMessage,
    Stack,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    currentUsername: Yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
    newUsername: Yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
});

const initialValues = {
    currentUsername: '',
    newUsername: '',
};

export const ChangeUsername = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleReset = async (values) => {
        try {
            values.FE_URL = 'https://scp--sourcecode-project.netlify.app';
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            await axios.patch(
                'https://minpro-blog.purwadhikabootcamp.com/api/auth/changeUsername',
                values,
                { headers }
            );

            localStorage.clear();
            alert("Username change successful! Please verify your account and login again.");
            navigate('/login_user');


        } catch (error) {
            console.error(error);
            alert("Username change unsuccessful. Please try again.")
        }
    };

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

    return (
        <ChakraProvider theme={checkboxTheme}>
            <Flex
                width={'100vw'}
                height={'100vh'}
                alignContent={'center'}
                justifyContent={'center'}
                alignItems={'center'}
                justifyItems={'center'}
                backgroundColor={'black'}
                color={'#FEE101'}
                position={'fixed'}
                inset={'0'}
            >
                <Flex direction="column" mt={-3} mr={2} >
                    <Flex
                        direction={'column'}
                        width={'30vw'}
                        height={'30vh'}
                        alignItems={'center'}
                        position={'relative'}
                        fontFamily={'monospace'}
                    >
                        <Heading position={'block'} fontFamily={'monospace'} textAlign={'center'} >
                            New username<br />Prevent identity theft.
                        </Heading>

                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleReset}
                        >
                            {(formik) => (
                                <Form>
                                    <Field name="currentUsername">
                                        {({ field, form }) => (
                                            <FormControl
                                                isInvalid={form.errors.currentUsername && form.touched.currentUsername}
                                                mt={3}
                                            >
                                                <Input
                                                    {...field}
                                                    id="currentUsername"
                                                    placeholder="Enter your old username"
                                                    type="text"
                                                    w={'50vh'}
                                                    position={"relative"}
                                                    borderColor={'red'}
                                                    borderBlock={'red'}
                                                    focusBorderColor={'red'}
                                                />
                                                <FormErrorMessage>
                                                    {form.errors.currentUsername}
                                                </FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>

                                    <Field name="newUsername">
                                        {({ field, form }) => (
                                            <FormControl
                                                isInvalid={
                                                    form.errors.newUsername && form.touched.newUsername
                                                }
                                                mt={3}
                                            >
                                                <Input
                                                    {...field}
                                                    id="newUsername"
                                                    placeholder="Confirm your new username"
                                                    type="text"
                                                    w={'50vh'}
                                                    position={"relative"}
                                                    borderColor={'red'}
                                                    borderBlock={'red'}
                                                    focusBorderColor={'red'}
                                                />
                                                <FormErrorMessage>
                                                    {form.errors.newUsername}
                                                </FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>

                                    <Stack justifyContent={"space-between"} direction={'row'}>
                                        <Link to={'/'}>
                                            <Button
                                                colorScheme="yellow"
                                                size="md"
                                                mt={5}
                                            >
                                                Return Home
                                            </Button>
                                        </Link>

                                        <Button
                                            colorScheme="yellow"
                                            size="md"
                                            type="submit"
                                            isLoading={formik.isSubmitting}
                                            mt={5}
                                        >
                                            Confirm username change
                                        </Button>
                                    </Stack>

                                </Form>
                            )}
                        </Formik>
                    </Flex>
                </Flex>
            </Flex>
        </ChakraProvider>
    );
};
