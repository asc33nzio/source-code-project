import {
    Box,
    Button,
    Input,
    Stack,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import drain from "../assets/drain_1.gif";

export const Delete = () => {
    const token = localStorage.getItem('token');
    const [id, setId] = useState('');
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
          navigate("/login_user");
        }
      }, [token, navigate]);

    useEffect(() => {
        if (!localStorage.getItem("entryToHeavenToken")) {
          navigate('/');
        }
      }, [navigate]);

    const deleteHandler = async () => {
        setIsConfirmationOpen(true);
    };

    const handleCancelDelete = () => {
        setIsConfirmationOpen(false);
    };

    const handleConfirmDelete = async () => {
        try {
            const header = {
                Authorization: `Bearer ${token}`,
            };

            const response = await axios.patch(
                `https://minpro-blog.purwadhikabootcamp.com/api/blog/remove/${id}`,
                {
                    headers: header,
                }
            );
            console.log(response);
            alert(`You have deleted article number ${id}. Note that if you go to https://scp--sourcecode-project.netlify.app/article/${id} ,the remnant will still be there, but this article is already deleted from our database.`);
            setIsConfirmationOpen(false);

        } catch (err) {
            console.log(err)
            alert("That wasn't a valid article number.");
            alert("Article deletion failed. Please try again.");
            alert("This error will literally never happen unless you didn't insert any number or have a network error since the API design is just so lazy and stupid.");
        }
    }

    return (
        <Box width="100vw" height="120vh" bgColor="black" style={{
            backgroundImage: `url(${drain})`,
            backgroundRepeat: 'repeat',
            backgroundSize: 'auto',
            backgroundPosition: 'center',
        }}>
            <Stack justifyContent={'center'} justifyItems={'center'} alignContent={'center'} alignItems={'center'} fontFamily={'monospace'}>
                <Stack mt={'10vh'} justifyContent={'center'} justifyItems={'center'} alignContent={'center'} alignItems={'center'}>

                    <Text fontSize={"50px"} align={'center'} mb={20} fontWeight={'bold'} bg={'black'} width={'45vw'}>
                        Welcome to God Mode.
                    </Text>

                    <Text fontSize={"40px"} align={'center'} bg={'black'} width={'30vw'}>
                        Go to any article.
                    </Text>

                    <Text fontSize={"20px"} align={'center'} bg={'black'} width={'50vw'} mb={5}>
                        Due to a faulty design in the API,<br />
                        being logged in with any verified account will allow you to<br />
                        delete any article of your choosing
                    </Text>

                    <Text fontSize={"18px"} align={'center'} bg={'black'} width={'15vw'}>
                        For instance, go to
                    </Text>

                    <Text fontSize={"18px"} align={'center'} bg={'black'} width={'40vw'} color={'red'}>
                        <a href="https://scp--sourcecode-project.netlify.app/article/1" target="_blank" rel="noreferrer">https://scp--sourcecode-project.netlify.app/article/1</a>
                    </Text>

                    <Text fontSize={"18px"} align={'center'} bg={'black'} width={'35vw'}>
                        If you think this article sucks, go ahead and input the number "1" below.
                    </Text>

                    <Text align={'center'} bg={'black'} width={'20vw'}>
                        This goes the same for any article.
                    </Text>

                    <Text align={'center'} bg={'black'} width={'35vw'}>
                        Just remember the article number and go here for deletion.
                    </Text>

                    <Text align={'center'} bg={'black'} width={'38vw'}>
                        Feeling chaotic like a true god? Insert some random number to your liking.
                    </Text>
                </Stack>

                <Input
                    _placeholder={{
                        color: "red",
                        textAlign: "center",
                        lineHeight: "inherit",
                    }}
                    placeholder={"Let's get rid of that bad article..."}
                    color={'red'}
                    width={'40vw'}
                    value={id}
                    position={"relative"}
                    borderColor={'red'}
                    borderBlock={'red'}
                    focusBorderColor={'red'}
                    onChange={(val) => setId(val.target.value)}
                    mb={10}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            event.preventDefault();
                            deleteHandler();
                        }
                    }}
                />

                <Button
                    fontSize="18px"
                    variant="solid"
                    colorScheme="yellow"
                    size="md"
                    onClick={deleteHandler}
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
                    mb={3}
                >
                    DELETE
                </Button>

                <Button
                    as={Link}
                    to={"/search"}
                    fontSize="18px"
                    variant="solid"
                    colorScheme="yellow"
                    size="md"
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
                    mb={3}
                >
                    Find Some Bad Content
                </Button>

                <Button
                    as={Link}
                    to={"/"}
                    fontSize="18px"
                    variant="solid"
                    colorScheme="yellow"
                    size="md"
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

                <Modal isOpen={isConfirmationOpen} onClose={handleCancelDelete}>
                    <ModalOverlay />
                    <ModalContent bg={'black'}>
                        <ModalHeader>That's it... But just to be sure..</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            Was that article REALLY bad?
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="red" mr={5} onClick={handleConfirmDelete}>
                                Absolutely horrendous
                            </Button>
                            <Button onClick={handleCancelDelete}>
                                On 2nd thought, not really..
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

            </Stack>
        </Box>
    )
};