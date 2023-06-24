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
import drain from "../assets/drain_2.gif";
import whoami from "../assets/whoami.jpg";

export const HeavensDoor = () => {
    const token = localStorage.getItem('token');
    const [proceed, setProceed] = useState("");
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
          navigate("/login_user");
        }
      }, [token, navigate]);

    const handleEntry = () => {
        const validEntries = ["julian", "assange", "julianassange", "julian assange", "wikileaks", "wiki leaks", "freedom fighter", "a revolutionary", "for the people"];
        const enteredValue = proceed.toLowerCase();

        if (validEntries.includes(enteredValue)) {
            setIsConfirmationOpen(true);
        } else {
            alert("Invalid entry. Please try again.");
            alert("No Hints.");
            alert("Perhaps you are not worthy. Please return home and explore our other features.");
        }
    };

    const handleConfirmEntry = () => {
        localStorage.setItem('entryToHeavenToken', true);
        setIsConfirmationOpen(false);
        navigate('/god_mode');
    };

    const handleCancelEntry = () => {
        setIsConfirmationOpen(false);
        navigate('/');
    };

    return (
        <Stack direction={'column'} width="100vw" height="100vh" bgColor="black" style={{
            backgroundImage: `url(${drain})`,
            backgroundRepeat: 'repeat',
            backgroundSize: 'auto',
            backgroundPosition: 'center',
        }}>
            <Stack direction={'column'} justifyContent={'center'} justifyItems={'center'} alignContent={'center'} alignItems={'center'} fontFamily={'monospace'}>

                <Box width={'50vw'} height={'50vh'} mt={5}>
                    <img src={whoami} alt="whoami" />
                </Box>

                <Stack mt={'10vh'} justifyContent={'center'} justifyItems={'center'} alignContent={'center'} alignItems={'center'} pt={59} >

                    <Text align={'center'} bg={'#0B2208'} width={'23vw'} fontFamily={'monospace'}>
                        Correctly name the person above for entry.
                    </Text>

                </Stack>

                <Input
                    _placeholder={{
                        color: "red",
                        textAlign: "center",
                        lineHeight: "inherit",
                        fontFamily: 'monospace'
                    }}
                    placeholder={"Who is he?"}
                    color={"red"}
                    width={"40vw"}
                    value={proceed}
                    position={"relative"}
                    borderColor={"red"}
                    borderBlock={"red"}
                    focusBorderColor={"red"}
                    onChange={(val) => setProceed(val.target.value)}
                    mb={5}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            event.preventDefault();
                            handleEntry();
                        }
                    }}
                />

                <Button
                    fontSize="18px"
                    variant="solid"
                    colorScheme="yellow"
                    size="md"
                    onClick={handleEntry}
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
                    mb={2}
                >
                    PROCEED
                </Button>

                <Button
                    as={Link}
                    to={'/'}
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
                    mb={2}
                >
                    Return Home
                </Button>

                <Modal isOpen={isConfirmationOpen} onClose={handleCancelEntry}>
                    <ModalOverlay />
                    <ModalContent bg={'black'}>
                        <ModalHeader>You have successfully gained entry.</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            Do you wish to proceed?
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="red" mr={5} onClick={handleConfirmEntry}>
                                Yes.
                            </Button>
                            <Button colorScheme="blue" onClick={handleCancelEntry}>
                                No.
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

            </Stack>
        </Stack>
    )
};