import React from 'react';
import { useParams } from 'react-router-dom';
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
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(/^(?=.*[A-Z])(?=.*\W).+$/, 'Password must contain an uppercase letter and a symbol')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const initialValues = {
  password: '',
  confirmPassword: '',
};

export const ResetPassword = () => {
  const { token } = useParams();

  const handleReset = async (values) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await axios.patch(
        'https://minpro-blog.purwadhikabootcamp.com/api/auth/resetPass',
        {
          password: values.password,
          confirmPassword: values.confirmPassword
        },
        { headers }
      );

      alert("Password reset success! Please do remember your new password.")

    } catch (error) {
      console.error(error);
      alert("Password reset unsuccessful. Please try again.")
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
        <Flex direction="column" alignItems="center" mt={-3} mr={2} >
          <Flex
            direction={'column'}
            width={'30vw'}
            height={'30vh'}
            justifyContent={'center'}
            alignItems={'center'}
            position={'relative'}
            fontFamily={'monospace'}
          >
            <Heading position={'block'} fontFamily={'monospace'} alignContent={'center'} textAlign={'center'} >
              Start Fresh With<br />A New Password
            </Heading>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleReset}
            >
              {(formik) => (
                <Form alignContent={'center'} justifyContent={'center'} alignItems={'center'}>
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
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              handleReset();
                            }
                          }}
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
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              handleReset();
                            }
                          }}
                        />
                        <FormErrorMessage>
                          {form.errors.confirmPassword}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Flex justifyContent={"center"}>
                    <Button
                      colorScheme="yellow"
                      size="md"
                      type="submit"
                      isLoading={formik.isSubmitting}
                      mt={5}
                    >
                      Confirm Password Reset
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>
          </Flex>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};
