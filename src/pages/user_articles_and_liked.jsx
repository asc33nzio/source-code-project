import React, { useEffect, useState, useCallback } from 'react';
import { Flex, Box, Button, Heading, Text, Stack } from '@chakra-ui/react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import ban_1 from "../assets/ban_1.jpg";
import ban_2 from "../assets/ban_2.jpg";
import ban_3 from "../assets/ban_3.jpg";
import ban_4 from "../assets/ban_4.jpg";
import ban_5 from "../assets/ban_5.jpg";
import ban_6 from "../assets/ban_6.jpg";
import ban_7 from "../assets/ban_7.jpg";
import ban_8 from "../assets/ban_8.jpg";
import ReactHtmlParser from 'html-react-parser';

const bannerImages = [ban_1, ban_2, ban_3, ban_4, ban_5, ban_6, ban_7, ban_8];

export function UserArticlesPage() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [userArticles, setUserArticles] = useState([]);
    const [likedArticles, setLikedArticles] = useState([]);
    const [userArticlesPage, setUserArticlesPage] = useState(1);
    const [likedArticlesPage, setLikedArticlesPage] = useState(1);
    const [userArticlesTotalPages, setUserArticlesTotalPages] = useState(1);
    const [likedArticlesTotalPages, setLikedArticlesTotalPages] = useState(1);

    useEffect(() => {
        if (!token) {
          navigate("/login_user");
        }
      }, [token, navigate]);

    const fetchUserArticles = useCallback(async () => {
        try {
            const response = await axios.get(
                `https://minpro-blog.purwadhikabootcamp.com/api/blog/pagUser?page=${userArticlesPage}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setUserArticles(response.data.result);
            setUserArticlesTotalPages(response.data.page);
        } catch (error) {
            console.error('Failed to fetch user articles:', error);
        }
    }, [userArticlesPage, token]);

    const fetchLikedArticles = useCallback(async () => {
        try {
            const response = await axios.get(
                `https://minpro-blog.purwadhikabootcamp.com/api/blog/pagLike?page=${likedArticlesPage}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setLikedArticles(response.data.result);
            console.log(response.data)

            // Check if the response result is empty because the idiotic API defines the page size of ALL total articles in the DB rather than total liked articles how IDIOTIC
            if (response.data.result.length === 0) {
                setLikedArticlesTotalPages(likedArticlesPage);
            } else if (response.data.result.length === 8) {
                setLikedArticlesTotalPages(likedArticlesPage + 1);
            } else {
                setLikedArticlesTotalPages(likedArticlesPage);
            }

        } catch (error) {
            console.error('Failed to fetch liked articles:', error);
        }
    }, [likedArticlesPage, token]);

    useEffect(() => {
        fetchUserArticles();
        fetchLikedArticles();
    }, [fetchUserArticles, fetchLikedArticles]);

    const handlePrevUserArticlesPage = () => {
        setUserArticlesPage((page) => Math.max(page - 1, 1));
    };

    const handleNextUserArticlesPage = () => {
        setUserArticlesPage((page) => Math.min(page + 1, userArticlesTotalPages));
    };

    const handlePrevLikedArticlesPage = () => {
        setLikedArticlesPage((page) => Math.max(page - 1, 1));
    };

    const handleNextLikedArticlesPage = () => {
        setLikedArticlesPage((page) => Math.min(page + 1, likedArticlesTotalPages));
    };

    return (
        <Flex height="150vh" bg={'black'}>

            <Box width="50vw" bg="black" p={4}>

                <Stack direction={'row'} justify={'space-between'}>
                    <Heading as="h2" size="lg" mb={10}>
                        Articles You Posted
                    </Heading>

                    <Button
                        as={Link}
                        to={'/'}
                        backgroundColor={'white'}
                        color={'black'}
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
                        Return
                    </Button>
                </Stack>

                {userArticles.map(article => (
                    <Box
                        key={article.id}
                        borderWidth="1px"
                        borderRadius="md"
                        p={4}
                        my={2}
                        style={{
                            backgroundImage: `url(https://minpro-blog.purwadhikabootcamp.com/${article.imageURL})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        <Link to={`/article/${article.id}`} target="_blank" rel="noreferrer noopener">
                            <Heading as="h2" size="md" mb={2} color={'#88012A'}>
                                {ReactHtmlParser(article.title)}
                            </Heading>

                            <Text color={'yellow.400'}>
                                {ReactHtmlParser(article.content)}
                            </Text>
                        </Link>

                    </Box>
                ))}

                <Stack direction={'row'} justify={'space-between'}>
                    <Button
                        mt={4}
                        onClick={handlePrevUserArticlesPage}
                        disabled={userArticlesPage === 1}
                        colorScheme="black"
                        background={'black'}
                        color={'white'}
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
                        Previous Page
                    </Button>

                    <Text color={'white'} fontFamily={'monospace'}>{`Page ${userArticlesPage} of ${userArticlesTotalPages}`}</Text>

                    <Button
                        mt={4}
                        onClick={handleNextUserArticlesPage}
                        disabled={userArticlesPage === userArticlesTotalPages}
                        colorScheme="black"
                        background={'black'}
                        color={'white'}
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
                        Next Page
                    </Button>


                </Stack>
            </Box>

            <Box width="50vw" bg="white" p={4} color={'black'} textAlign={'right'}>

                <Stack direction={"row"} justify={'space-between'}>
                    <Button
                        as={Link}
                        to={'/'}
                        colorScheme='black'
                        background={'black'}
                        color={'white'}
                        _hover={{
                            textColor: 'black',
                            bg: 'white',
                            _before: {
                                bg: 'inherit',
                            },
                            _after: {
                                bg: 'inherit',
                            },
                        }}>
                        Home
                    </Button>

                    <Heading as="h2" size="lg" mb={10}>
                        Articles You Liked
                    </Heading>
                </Stack>

                {likedArticles.map((article, index) => (
                    <Box
                        key={article.id}
                        borderWidth="1px"
                        borderRadius="md"
                        p={4}
                        my={2}
                        borderColor={'black'}
                        style={{
                            backgroundImage: `url(${bannerImages[index]})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >

                        <Link to={`/article/${article.BlogId}`} target="_blank" rel="noreferrer noopener">
                            <Heading as="h3" size="md" mb={2} color={'white'}>
                                {ReactHtmlParser(article.Blog.title)}
                            </Heading>

                            <Text color={'white'}>
                                {ReactHtmlParser(article.Blog.content)}
                            </Text>
                        </Link>
                    </Box>
                ))}

                <Stack direction={'row'} justify={'space-between'}>

                    <Button
                        mt={4}
                        onClick={handlePrevLikedArticlesPage}
                        disabled={likedArticlesPage === 1}
                        colorScheme="black"
                        background={'black'}
                        color={'white'}
                        _hover={{
                            textColor: 'black',
                            bg: 'white',
                            _before: {
                                bg: 'inherit',
                            },
                            _after: {
                                bg: 'inherit',
                            },
                        }}
                    >
                        Previous Page
                    </Button>

                    <Text color={'black'} fontFamily={'monospace'}>{`Page ${likedArticlesPage} of ${likedArticlesTotalPages}`}</Text>

                    <Button
                        mt={4}
                        onClick={handleNextLikedArticlesPage}
                        disabled={likedArticlesPage === likedArticlesTotalPages}
                        colorScheme="black"
                        background={'black'}
                        color={'white'}
                        _hover={{
                            textColor: 'black',
                            bg: 'white',
                            _before: {
                                bg: 'inherit',
                            },
                            _after: {
                                bg: 'inherit',
                            },
                        }}
                    >
                        Next Page
                    </Button>
                </Stack>
            </Box>

        </Flex>
    );
}
