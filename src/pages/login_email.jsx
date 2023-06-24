import * as React from "react";
import { Button, Checkbox, Flex, Heading, Input, InputGroup, InputRightElement, Link, Text, extendTheme, ChakraProvider } from "@chakra-ui/react";
import { useNavigate, Link as ROUTER_LINK } from "react-router-dom";
import { Image } from "@chakra-ui/react";
import User from "../assets/login_thumbs/user.png";
import Phone from "../assets/login_thumbs/phone.png";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setAuthToken, setLoggedIn } from '../redux/store';
import { useFormik } from "formik";
import * as Yup from 'yup';

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

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid e-mail address').required('E-mail is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(/^(?=.*[A-Z])(?=.*\W).+$/, 'Password must contain an uppercase letter and a symbol')
    .required('Password is required'),
});

export function LoginEmail() {
  const [show, setShow] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    setShow(!show);
    formik.setFieldValue('email', formik.values.email);
  };

  const handleLogin = async (values) => {
    try {
      const response = await axios.post(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/login",
        {
          username: "",
          email: values.email,
          phone: "",
          password: values.password,
        }
      );
      console.log(response.data);
      const token = response.data.token;
      dispatch(setAuthToken(token));
      localStorage.setItem("token", token);
      // localStorage.setItem("token_name_or_anything", response.data.token) because that is the response location

      // Dispatch an action to set the logged-in status
      dispatch(setLoggedIn());
      alert('Login successful. Click ok to return to the source')
      navigate('/');

    } catch (error) {
      console.error(error);
      alert('Incorrect e-mail or password')
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <ChakraProvider theme={checkboxTheme}>

      <Flex width={'100vw'}
        height={'100vh'}
        justifyContent={'center'}
        alignItems={'center'}
        backgroundColor={'black'}
        color={'#FEE101'}
        position={'fixed'}
        inset={'0'}>

        <Flex direction="column" alignItems="center" mt={-3} mr={2}>
          <ROUTER_LINK to={'/login_user'}>
            <Image
              src={User}
              alt="User Thumbnail"
              boxSize="60px"
              cursor="pointer"
            />
          </ROUTER_LINK>
        </Flex>

        <Flex
          direction={'column'}
          width={'30vw'}
          height={'30vh'}
          justifyContent={'center'}
          alignItems={'center'}
          position={'relative'}
          fontFamily={'monospace'}
        >

          <Heading position={"block"} fontFamily={'monospace'}>RETURN TO THE SOURCE.</Heading>

          <form onSubmit={formik.handleSubmit}>
            <Input
              id="email"
              name="email"
              placeholder={"Enter your e-mail address"}
              position={"relative"}
              borderColor={'red'}
              borderBlock={'red'}
              focusBorderColor={'red'}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleLogin(formik.values);
                }
              }}
            />
            {formik.errors.email && formik.touched.email && (
              <Text color="red" fontSize="sm">{formik.errors.email}</Text>
            )}

            <InputGroup size='md'>
              <Input
                id="password"
                name="password"
                pr={'4.5rem'}
                type={show ? 'text' : 'password'}
                placeholder={'Enter your password'}
                position={"relative"}
                borderColor={'red'}
                borderBlock={'red'}
                focusBorderColor={'red'}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleLogin(formik.values);
                  }
                }}
              />

              <InputRightElement width={'4.5rem'}>

                <Button h={'1.75rem'}
                  size={'sm'}
                  onClick={handleClick}
                  _hover={{ bg: '#E00047' }}
                  color={show ? '#52001E' : '#52001E'}>
                  {show ? 'Hide!' : 'Show!'}
                </Button>

              </InputRightElement>
            </InputGroup>
            {formik.errors.password && formik.touched.password && (
              <Text color="red" fontSize="sm">{formik.errors.password}</Text>
            )}

            <Flex direction={'row'} justifyContent={'space-between'} alignItems={'center'} bgColor={'none'} width={'30vw'} height={'3vh'} marginTop={'10px'}>

              <Checkbox alignself={'flex-start'}><Text fontSize={'13px'}>Remember Me</Text></Checkbox>

              <Button
                mt={4}
                colorScheme="yellow"
                size="md"
                onClick={() => {
                  formik.setFieldValue('password', formik.values.password);
                  handleLogin(formik.values);
                }}
              >
                Login
              </Button>

              <Text>
                <Link href="/forget_password">Forget Password</Link>
              </Text>

            </Flex>

            <Flex direction={'row'} justifyContent={'space-between'} alignItems={'center'} bgColor={'none'} width={'30vw'} height={'3vh'}>
              <Text >
                <ROUTER_LINK to="/">
                  Return Home
                </ROUTER_LINK>
              </Text>

              <Text>
                <Link href='/register'>Sign Up</Link>
              </Text>
            </Flex>
          </form>
        </Flex>

        <Flex direction="row" alignItems="center" mt={-3} ml={0}>
          <ROUTER_LINK to={'/login_phone'}>
            <Image
              src={Phone}
              alt="Phone Thumbnail"
              boxSize="65px"
              cursor="pointer"
            />
          </ROUTER_LINK>
        </Flex>

      </Flex>
    </ChakraProvider>
  )
}