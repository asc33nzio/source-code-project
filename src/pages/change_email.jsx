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
    currentEmail: Yup.string().email('Invalid e-mail address').required('Old e-mail is required'),
    newEmail: Yup.string().email('Invalid e-mail address').required('New e-mail is required'),
});

const initialValues = {
    currentEmail: '',
    newEmail: '',
};

export const ChangeEmail = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleReset = async (values) => {
        try {
            values.FE_URL = 'https://scp--sourcecode-project.netlify.app';
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            await axios.patch(
                'https://minpro-blog.purwadhikabootcamp.com/api/auth/changeEmail',
                values,
                { headers }
            );
            
            localStorage.clear();
            alert("Email change succesful! Please verify your account and login again.");
            navigate('/login_email');


        } catch (error) {
            console.error(error);
            alert("E-mail change unsuccessful. Please try again.")
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
                            New e-mail<br />For every occasion
                        </Heading>

                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleReset}
                        >
                            {(formik) => (
                                <Form>
                                    <Field name="currentEmail">
                                        {({ field, form }) => (
                                            <FormControl
                                                isInvalid={form.errors.currentEmail && form.touched.currentEmail}
                                                mt={3}
                                            >
                                                <Input
                                                    {...field}
                                                    id="currentEmail"
                                                    placeholder="Enter your old e-mail"
                                                    type="email"
                                                    w={'50vh'}
                                                    position={"relative"}
                                                    borderColor={'red'}
                                                    borderBlock={'red'}
                                                    focusBorderColor={'red'}
                                                />
                                                <FormErrorMessage>
                                                    {form.errors.currentEmail}
                                                </FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>

                                    <Field name="newEmail">
                                        {({ field, form }) => (
                                            <FormControl
                                                isInvalid={
                                                    form.errors.newEmail && form.touched.newEmail
                                                }
                                                mt={3}
                                            >
                                                <Input
                                                    {...field}
                                                    id="newEmail"
                                                    placeholder="Confirm your new e-mail"
                                                    type="email"
                                                    w={'50vh'}
                                                    position={"relative"}
                                                    borderColor={'red'}
                                                    borderBlock={'red'}
                                                    focusBorderColor={'red'}
                                                />
                                                <FormErrorMessage>
                                                    {form.errors.newEmail}
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
                                            Confirm E-mail Change
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
