import * as React from "react";
import { Button, Checkbox, Flex, Heading, Input, InputGroup, InputRightElement, Link, Text, extendTheme, ChakraProvider } from "@chakra-ui/react";
import { useNavigate, Link as ROUTER_LINK } from "react-router-dom";
import { Image } from "@chakra-ui/react";
import Mail from "../assets/login_thumbs/mail.png";
import User from "../assets/login_thumbs/user.png";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setAuthToken, setLoggedIn } from '../redux/store';

export function LoginPhone() {
  const [show, setShow] = React.useState(false)
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleClick = () => setShow(!show)

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

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/login",
        {
          username: "",
          email: "",
          phone: phone,
          password: password,
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
      console.error('Incorrect username or password');
      // Handle error or display error message to the user
    }
  };

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
          fontFamily={'Cascadia Mono'}
        >

          <Heading position={"block"} fontFamily={'monospace'}>RETURN TO THE SOURCE.</Heading>

          <Input
            placeholder={"Enter your phone number"}
            position={"relative"}
            borderColor={'red'}
            borderBlock={'red'}
            focusBorderColor={'red'}
            value={phone}
            onChange={(input) => setPhone(input.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleLogin();
              }
            }}
            />

          <InputGroup size='md'>
            <Input
              pr={'4.5rem'}
              type={show ? 'text' : 'password'}
              placeholder={'Enter your password'}
              position={"relative"}
              borderColor={'red'}
              borderBlock={'red'}
              focusBorderColor={'red'}
              value={password}
              onChange={(input) => setPassword(input.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleLogin();
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

          <Flex direction={'row'} justifyContent={'space-between'} alignItems={'center'} bgColor={'none'} width={'30vw'} height={'3vh'} marginTop={'10px'}>

            <Checkbox>Remember Me</Checkbox>

            <Button
              mt={4}
              colorScheme="yellow"
              size="md"
              onClick={handleLogin}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleLogin();
                }
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
              <ROUTER_LINK to="/register">
                Return Home
              </ROUTER_LINK>
            </Text>

            <Text>
              <Link href='/'>Sign Up</Link>
            </Text>
          </Flex>
        </Flex>

        <Flex direction="row" alignItems="center" mt={-3} ml={4}>
          <ROUTER_LINK to={'/login_email'}>
            <Image
              src={Mail}
              alt="Email Thumbnail"
              boxSize="40px"
              cursor="pointer"
            />
          </ROUTER_LINK>
        </Flex>

      </Flex>
    </ChakraProvider>
  )
}