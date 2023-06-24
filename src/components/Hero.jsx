import {
    Stack,
    Flex,
    Button,
    Text,
    VStack,
    useBreakpointValue,
} from '@chakra-ui/react';
import { Link as ROUTER_LINK, useNavigate } from "react-router-dom";
import hero_bg from '../assets/hero_bg.jpg';
import axios from "axios";

export default function Hero() {
    const navigate = useNavigate();

    const handleLike = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login_user");
            return;
        }

        try {
            const response = await axios.post(
                "https://minpro-blog.purwadhikabootcamp.com/api/blog/like",
                { BlogId: 211 },
                {
                    headers: { Authorization: `Bearer ${token}` },
                    "Content-Type": "application/json",
                }
            );
            console.log(response.data);
            alert("Article added to liked list.");
        } catch (error) {
            console.log(error);
            alert("This article is already in your liked list.");
        }
    };

    return (
        <Flex
            w={'full'}
            h={'100vh'}
            backgroundImage={`url(${hero_bg})`}
            backgroundSize={'cover'}
            backgroundPosition={'center center'}>
            <VStack
                w={'full'}
                justify={'center'}
                px={useBreakpointValue({ base: 4, md: 8 })}
                bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
                <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
                    <Text
                        color={'#88012A'}
                        fontWeight={700}
                        lineHeight={1.2}
                        fontSize={useBreakpointValue({ base: '5xl', md: '7xl' })}>
                        Deepmind’s AI Is Learning About the Art of Coding<br />
                    </Text>
                    <Text
                        color={'#FD2171'}
                        fontWeight={350}
                        lineHeight={1.2}
                        fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}>
                        AlphaDev has made small but significant improvements to decades-old C++ algorithms.<br />
                        Its builders say that’s just the start.
                    </Text>
                    <Stack direction={'row'}>
                        <ROUTER_LINK to={"/article/211"}>
                            <Button
                                bg={'#88012A'}
                                rounded={'full'}
                                color={'black'}
                                _hover={{ bg: '#FEE101' }}
                            >
                                Read Article
                            </Button>
                        </ROUTER_LINK>
                        <Button
                            bg={'#FD2171'}
                            rounded={'full'}
                            color={'black'}
                            _hover={{ bg: '#FEE101' }}
                            onClick={handleLike}
                        >
                            Add to Liked Articles
                        </Button>
                    </Stack>
                </Stack>
            </VStack>
        </Flex>
    );
}