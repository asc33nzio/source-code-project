import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    Flex,
    Text,
    Alert,
    AlertIcon,
    CloseButton,
} from '@chakra-ui/react';
import { useNavigate, useParams, Link } from 'react-router-dom'

const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid e-mail address').required('E-mail is required'),
    phone: Yup.number()
        .typeError('You have a unique number. What universe are you from?')
        .min(1000000000, 'Phone number must be 10-12 digits long').required('Phone number is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .matches(/^(?=.*[A-Z])(?=.*\W).+$/, 'Password must contain an uppercase letter and a symbol')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

const initialValues = {
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
};

export const RegisterPage = () => {
    const navigate = useNavigate();
    const { token } = useParams();

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const response = await axios.post(
                'https://minpro-blog.purwadhikabootcamp.com/api/auth/', values,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data); 
            
            setTimeout(() => {
                alert("Before you can use your account, your need to verify. Please check your e-mail and spam folder.")
            }, 500);

            navigate("/")

            // Reset form values after successful registration
            setSubmitting(false);

        } catch (error) {
            setErrors({ submit: 'Failed to register. Please try again.' });
            alert('Failed to register. Please try again.')
            setSubmitting(false);
        }
    };

    return (
        <Flex justify="center" align="center" height="100vh" bg={'black'}>
            <Box bg="#A09006" p={8} borderRadius="md" maxWidth={400} width="100%">
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ isSubmitting }) => (
                        <Form>
                            <FormControl mb={4}>
                                <FormLabel htmlFor="username" color='black' >Username</FormLabel>
                                <Field as={Input} type="text" id="username" name="username" color='black' placeholder={'Enter a cool username here.'} />
                                <ErrorMessage name="username" component={Text} color="red" fontSize="xs" mt={1} />
                            </FormControl>

                            <FormControl mb={4}>
                                <FormLabel htmlFor="email" color='black' >Email</FormLabel>
                                <Field as={Input} type="email" id="email" name="email" color='black' placeholder={'Enter a valid e-mail address. No fakes.'} />
                                <ErrorMessage name="email" component={Text} color="red" fontSize="xs" mt={1} />
                            </FormControl>

                            <FormControl mb={4}>
                                <FormLabel htmlFor="phone" color='black' >Phone Number</FormLabel>
                                <Field as={Input} type="text" id="phone" name="phone" color='black' placeholder={"10-12 digits or it's no good."} />
                                <ErrorMessage name="phone" component={Text} color="red" fontSize="xs" mt={1} />
                            </FormControl>

                            <FormControl mb={4}>
                                <FormLabel htmlFor="password" color='black' >Password</FormLabel>
                                <Field as={Input} type="password" id="password" name="password" color='black' placeholder={"One's password is a reflection of one's self."} />
                                <ErrorMessage name="password" component={Text} color="red" fontSize="xs" mt={1} />
                            </FormControl>

                            <FormControl mb={4}>
                                <FormLabel htmlFor="confirmPassword" color='black' >Confirm Password</FormLabel>
                                <Field as={Input} type="password" id="confirmPassword" name="confirmPassword" color='black' placeholder={"What's left to be said?"} />
                                <ErrorMessage name="confirmPassword" component={Text} color="red" fontSize="xs" mt={1} />
                            </FormControl>

                            <Flex justify="space-between">
                                <Button type="submit" colorScheme="yellow" isLoading={isSubmitting} mb={2}>
                                    Register
                                </Button>

                                <Link to={'/'}>
                                    <Button colorScheme="yellow" mb={2}>
                                        Return Home
                                    </Button>
                                </Link>
                            </Flex>

                            <ErrorMessage name="submit">
                                {errorMessage => (
                                    <Alert status="error" mb={4}>
                                        <AlertIcon />
                                        {errorMessage}
                                        <CloseButton position="absolute" right="8px" top="8px" onClick={() => errorMessage.setErrors(null)} />
                                    </Alert>
                                )}
                            </ErrorMessage>
                        </Form>
                    )}
                </Formik>

            </Box>
        </Flex>
    );
};

