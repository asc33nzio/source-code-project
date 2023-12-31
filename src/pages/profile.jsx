import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Img,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { Form, Link, useNavigate } from "react-router-dom";
import anon from "../assets/default_ava.jpg";

export function Profile() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const initialPp = localStorage.getItem('profilePicture') || anon; // Get profile picture from local storage or use 'anon' as initial value
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(0);
  const [pp, setPp] = useState(initialPp);

  useEffect(() => {
    if (!token) {
      navigate("/login_user");
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const header = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get("https://minpro-blog.purwadhikabootcamp.com/api/auth/", { headers: header });
        const { username, email, phone, imgProfile } = response.data;
        setUsername(username);
        setEmail(email);
        setPhone(phone);

        if (imgProfile !== null) { // Conditional to avoid CORB flags for users with no avatars
          setPp(`https://minpro-blog.purwadhikabootcamp.com/${imgProfile}`);
          localStorage.setItem('profilePicture', `https://minpro-blog.purwadhikabootcamp.com/${imgProfile}`);
        }
      } catch (error) {
        console.error("Error fetching profile data.", error);
      }
    };

    fetchProfileData();
  }, [token]);

  const handleProfilePictureUpload = async () => {
    const fileInput = document.getElementById('profilePicture');
    const file = fileInput.files[0];

    // Check if a file is selected
    if (!file) {
      alert('Please select a file.');
      return;
    }

    // Check if the file type is allowed
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      alert('Only JPG, JPEG, and PNG files are allowed.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        'https://minpro-blog.purwadhikabootcamp.com/api/profile/single-uploaded',
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log('Profile picture updated.');
      alert('Profile picture has been updated.');
      // Update the pp state with the new profile picture
      setPp(`https://minpro-blog.purwadhikabootcamp.com/${response.data.imgProfile}`);
      localStorage.setItem('profilePicture', `https://minpro-blog.purwadhikabootcamp.com/${response.data.imgProfile}`);
    } catch (error) {
      console.error('Error updating profile picture. Please try again.', error);
      alert('Error updating profile picture. Please try again.', error);
    }
  };

  return (
    <Box
      bg="#A09006"
      color="black"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Flex direction="column" alignItems="center">
        <Box
          bg="white"
          borderRadius="full"
          overflow="hidden"
          mb={8}
          width="150px"
          height="150px"
        >
          <Img
            src={pp}
            alt={`${username}'s avatar`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>

        <Box mb={2} align={'center'} fontSize={'20px'} fontFamily={'papyrus'}>
          Username:
          <Text fontWeight={'bold'} fontSize={'23px'} fontFamily={'monospace'} color={'#88012A'}>
            {username}
          </Text>
        </Box>
        <Box mb={2} align={'center'} fontSize={'20px'} fontFamily={'papyrus'}>
          Email:
          <Text fontWeight={'bold'} fontSize={'23px'} fontFamily={'monospace'}>
            {email}
          </Text>
        </Box>
        <Box mb={4} align={'center'} fontSize={'20px'} fontFamily={'papyrus'}>
          Phone Number:
          <Text fontWeight={'bold'} fontSize={'23px'} fontFamily={'monospace'}>
            {phone}
          </Text>
        </Box>

        <Form align={'center'}>

          <FormControl mb={2}>
            <FormLabel fontFamily={'monospace'} htmlFor={'profilePicture'}>Upload profile picture:</FormLabel>
            <Input
              fontFamily={'monospace'}
              type="file"
              id="profilePicture"
              variant="filled"
              _focus={{ outline: "none" }}
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="yellow"
            size="md" mb={2}
            fontFamily={'monospace'}
            onClick={handleProfilePictureUpload}
            variant="solid"
            _hover={{
              textColor: '#88012A',
              bg: 'black',
              _before: {
                bg: 'inherit',
              },
              _after: {
                bg: 'inherit',
              },
            }}
          >
            Update Profile Picture
          </Button>

        </Form>

        <Stack direction={'row'} justify={'space-between'} w={'315px'}>
          <Button as={Link}
            to={'/change_username'}
            colorScheme="yellow"
            size="md" mb={2}
            fontFamily={'monospace'}
            variant="solid"
            _hover={{
              textColor: '#88012A',
              bg: 'black',
              _before: {
                bg: 'inherit',
              },
              _after: {
                bg: 'inherit',
              },
            }}
          >
            Change Username
          </Button>

          <Button as={Link}
            to={'/change_email'}
            colorScheme="yellow"
            size="md" mb={2}
            fontFamily={'monospace'}
            variant="solid"
            _hover={{
              textColor: '#88012A',
              bg: 'black',
              _before: {
                bg: 'inherit',
              },
              _after: {
                bg: 'inherit',
              },
            }}
          >
            Change E-Mail
          </Button>


        </Stack>
        <Stack direction={'row'} justify={'space-between'} w={'315px'}>
          <Button as={Link}
            to={'/change_phone'}
            colorScheme="yellow"
            size="md" mb={2}
            fontFamily={'monospace'}
            variant="solid"
            _hover={{
              textColor: '#88012A',
              bg: 'black',
              _before: {
                bg: 'inherit',
              },
              _after: {
                bg: 'inherit',
              },
            }}
          >
            Change Phone Number
          </Button>

          <Button as={Link}
            to={'/change_password'}
            colorScheme="yellow"
            size="md" mb={2}
            fontFamily={'monospace'}
            variant="solid"
            _hover={{
              textColor: '#88012A',
              bg: 'black',
              _before: {
                bg: 'inherit',
              },
              _after: {
                bg: 'inherit',
              },
            }}
          >
            Change Password
          </Button>
        </Stack>

        <Button as={Link}
          to={'/'}
          colorScheme="yellow"
          size="md" mb={2}
          fontFamily={'monospace'}
          variant="solid"
          _hover={{
            textColor: '#88012A',
            bg: 'black',
            _before: {
              bg: 'inherit',
            },
            _after: {
              bg: 'inherit',
            },
          }}
        >
          Return Home
        </Button>

      </Flex>

    </Box>
  );
}
