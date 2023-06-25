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
    currentPhone: Yup.number()
    .typeError('You have a unique number. What universe are you from?')
    .min(1000000000, 'Phone number must be 10-12 digits long').required('Phone number is required'),
    newPhone: Yup.number()
    .typeError('You have a unique number. What universe are you from?')
    .min(1000000000, 'Phone number must be 10-12 digits long').required('Phone number is required'),
});

const initialValues = {
    currentPhone: '',
    newPhone: '',
};

export const ChangePhone = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleReset = async (values) => {
        try {
            values.FE_URL = 'https://scp--sourcecode-project.netlify.app';
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            await axios.patch(
                'https://minpro-blog.purwadhikabootcamp.com/api/auth/changePhone',
                values,
                { headers }
            );

            localStorage.clear();
            alert("Phone number change successful! Please verify your account and login again.");
            navigate('/login_phone');


        } catch (error) {
            console.error(error);
            alert("Phone number change unsuccessful. Please try again.")
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
                            New phone number<br />Leave no trace.
                        </Heading>

                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleReset}
                        >
                            {(formik) => (
                                <Form>
                                    <Field name="currentPhone">
                                        {({ field, form }) => (
                                            <FormControl
                                                isInvalid={form.errors.currentPhone && form.touched.currentPhone}
                                                mt={3}
                                            >
                                                <Input
                                                    {...field}
                                                    id="currentPhone"
                                                    placeholder="Enter your old phone number"
                                                    type="number"
                                                    w={'50vh'}
                                                    position={"relative"}
                                                    borderColor={'red'}
                                                    borderBlock={'red'}
                                                    focusBorderColor={'red'}
                                                />
                                                <FormErrorMessage>
                                                    {form.errors.currentPhone}
                                                </FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>

                                    <Field name="newPhone">
                                        {({ field, form }) => (
                                            <FormControl
                                                isInvalid={
                                                    form.errors.newPhone && form.touched.newPhone
                                                }
                                                mt={3}
                                            >
                                                <Input
                                                    {...field}
                                                    id="newPhone"
                                                    placeholder="Confirm your new phone number"
                                                    type="number"
                                                    w={'50vh'}
                                                    position={"relative"}
                                                    borderColor={'red'}
                                                    borderBlock={'red'}
                                                    focusBorderColor={'red'}
                                                />
                                                <FormErrorMessage>
                                                    {form.errors.newPhone}
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
                                            Confirm number change
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
