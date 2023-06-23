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
} from "@chakra-ui/react";
import axios from "axios";
import { Form, Link } from "react-router-dom";
import anon from "../assets/default_ava.jpg";

export function Profile() {
  const token = localStorage.getItem('token');
  const initialPp = localStorage.getItem('profilePicture') || anon; // Get profile picture from local storage or use 'anon' as initial value
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(0);
  const [pp, setPp] = useState(initialPp);

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
          >
            Update Profile Picture
          </Button>

        </Form>

        <Button as={Link}
          to={'/'}
          colorScheme="yellow"
          size="md" mb={2}
          fontFamily={'monospace'}>
          Return Home
        </Button>

      </Flex>

    </Box>
  );
}
