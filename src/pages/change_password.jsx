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
    currentPassword: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .matches(/^(?=.*[A-Z])(?=.*\W).+$/, 'Password must contain an uppercase letter and a symbol')
        .required('Old password is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .matches(/^(?=.*[A-Z])(?=.*\W).+$/, 'Password must contain an uppercase letter and a symbol')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

const initialValues = {
    currentPassword: '',
    password: '',
    confirmPassword: '',
};

export const ChangePassword = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleReset = async (values) => {
        try {
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            await axios.patch(
                'https://minpro-blog.purwadhikabootcamp.com/api/auth/changePass',
                values,
                { headers }
            );
            
            localStorage.clear();
            alert("Password change successful! Please verify and login again.");
            navigate('/login_user');


        } catch (error) {
            console.error(error);
            alert("Password change unsuccessful. Please try again.")
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
                            Start Fresh With<br />A New Password
                        </Heading>

                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleReset}
                        >
                            {(formik) => (
                                <Form>
                                    <Field name="currentPassword">
                                        {({ field, form }) => (
                                            <FormControl
                                                isInvalid={form.errors.currentPassword && form.touched.currentPassword}
                                                mt={3}
                                            >
                                                <Input
                                                    {...field}
                                                    id="currentPassword"
                                                    placeholder="Enter your old password"
                                                    type="password"
                                                    w={'50vh'}
                                                    position={"relative"}
                                                    borderColor={'red'}
                                                    borderBlock={'red'}
                                                    focusBorderColor={'red'}
                                                />
                                                <FormErrorMessage>
                                                    {form.errors.password}
                                                </FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>

                                    <Field name="password">
                                        {({ field, form }) => (
                                            <FormControl
                                                isInvalid={form.errors.password && form.touched.password}
                                                mt={3}
                                            >
                                                <Input
                                                    {...field}
                                                    id="password"
                                                    placeholder="Enter your new password"
                                                    type="password"
                                                    w={'50vh'}
                                                    position={"relative"}
                                                    borderColor={'red'}
                                                    borderBlock={'red'}
                                                    focusBorderColor={'red'}
                                                />
                                                <FormErrorMessage>
                                                    {form.errors.password}
                                                </FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>

                                    <Field name="confirmPassword">
                                        {({ field, form }) => (
                                            <FormControl
                                                isInvalid={
                                                    form.errors.confirmPassword && form.touched.confirmPassword
                                                }
                                                mt={3}
                                            >
                                                <Input
                                                    {...field}
                                                    id="confirmPassword"
                                                    placeholder="Confirm your new password"
                                                    type="password"
                                                    w={'50vh'}
                                                    position={"relative"}
                                                    borderColor={'red'}
                                                    borderBlock={'red'}
                                                    focusBorderColor={'red'}
                                                />
                                                <FormErrorMessage>
                                                    {form.errors.confirmPassword}
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
                                            Confirm Password Change
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
