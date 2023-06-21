import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
import { Form } from "react-router-dom";

export function Profile() {
  // const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePicture] = useState(     //const [profilePicture, setProfilePicture] = useState(
    "https://minpro-blog.purwadhikabootcamp.com/Public/Avatar-6.png"
  );
  const [typedValue] = useState(""); //const [typedValue, setTypedValue] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("/api/profile");
        const { username, email, phone } = response.data;
        setUsername(username);
        setEmail(email);
        setPhone(phone);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        // Handle error state or show error message
      }
    };

    fetchProfileData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put("/api/profile", {
        username,
        email,
        phone,
      });
      console.log("Profile updated:", response.data);
      // Show success message or perform any other necessary actions
    } catch (error) {
      console.error("Error updating profile:", error);
      // Handle error state or show error message
    }
  };

  const handleChangeEmail = async () => {
    const currentEmail = "";
    const newEmail = "";

    const headers = {
      Authorization: `Bearer ${auth.authToken}`,
    };

    try {
      const response = await axios.patch(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/changeEmail",
        {
          currentEmail,
          newEmail,
        },
        {
          headers,
        }
      );
      console.log("Email updated:", response.data);
      // Show success message or perform any other necessary actions
    } catch (error) {
      console.error("Error updating email:", error);
      // Handle error state or show error message
    }
  };

  const handleProfilePictureUpload = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("profilePicture", file);

    const headers = {
      Authorization: `Bearer ${auth.authToken}`,
    };

    try {
      const response = await axios.post(
        "https://minpro-blog.purwadhikabootcamp.com/api/profile/single-uploaded",
        formData,
        {
          headers,
        }
      );
      console.log("Profile picture updated:", response.data);
      // Show success message or perform any other necessary actions
    } catch (error) {
      console.error("Error updating profile picture:", error);
      // Handle error state or show error message
    }
  };

  // const handleInputChange = (e) => {
  //   setTypedValue(e.target.value);
  // };

  return (
    <Box
      p={8}
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
          mb={4}
          width="150px"
          height="150px"
        >
          <Img
            src={profilePicture}
            alt="Profile"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>

        <Text mb={2} fontWeight="bold">
          Username: {username}
        </Text>
        <Text mb={2} fontWeight="bold">
          Email: {email}
        </Text>
        <Text mb={4} fontWeight="bold">
          Phone number: {phone}
        </Text>

        <Form onSubmit={handleSubmit}>
          <FormControl mb={2}>
            <FormLabel>Update username:</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant="filled"
              _focus={{ outline: "none" }}
              color={typedValue ? "red" : "black"}
            //   onChange={handleInputChange}
            />
          </FormControl>

          <FormControl mb={2}>
            <FormLabel>Update Email:</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="filled"
              _focus={{ outline: "none" }}
              color={typedValue ? "red" : "black"}
            //   onChange={handleInputChange}
            />
          </FormControl>

          <FormControl mb={2}>
            <FormLabel>Update Phone number:</FormLabel>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              variant="filled"
              _focus={{ outline: "none" }}
              color={typedValue ? "red" : "black"}
            //   onChange={handleInputChange}
            />
          </FormControl>

          <FormControl mb={2}>
            <FormLabel>Upload profile picture:</FormLabel>
            <Input
              type="file"
              onChange={handleProfilePictureUpload}
              variant="filled"
              _focus={{ outline: "none" }}
              color={typedValue ? "red" : "black"}
            //   onChange={handleInputChange}
            />
          </FormControl>
        </Form>


          <Button type="submit" colorScheme="yellow" size="md" mb={2}>
            Update Profile
          </Button>
          <Button
            onClick={handleChangeEmail}
            colorScheme="yellow"
            size="md"
            mb={2}
          >
            Change Email
          </Button>

      </Flex>
      <Box mt={8} ml={150}>
        <Text fontWeight="bold">Liked Articles</Text>
        {/* Display the list of liked articles */}
        {/* ... */}
      </Box>
    </Box>
  );
}
