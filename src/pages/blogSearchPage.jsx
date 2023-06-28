import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Avatar, Box, Button, Divider, Flex, FormControl, FormLabel, HStack, Heading, Input, Select, Stack, Text } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

export const BlogSearchPage = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [sorting, setSorting] = useState("DESC");
    const [page, setPage] = useState(null);
    const [totalPage, setTotalPage] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState();
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const onClick = (blogId) => {
        navigate(`/article/${blogId}`)
    }

    const handleNewest = () => {
        setSorting("DESC")
    }

    const handleOldest = () => {
        setSorting("ASC")
    }

    const handleSortChange = (e) => {
        const selectedValue = e.target.value;

        if (selectedValue === "newest") {
            handleNewest();
        } else if (selectedValue === "oldest") {
            handleOldest();
        }
    };

    const goToPrevPage = () => {
        if (page > 1) {
            handleSearch(page - 1)
        }
    }

    const goToNextPage = () => {
        if (page < totalPage) {
            handleSearch(page + 1)
        }
    }
    const fetchCategories = async () => {
        try {
            const response = await Axios.get('https://minpro-blog.purwadhikabootcamp.com/api/blog/allCategory');
            setCategories(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = async (page) => {
        try {
            const response = await Axios.get(`https://minpro-blog.purwadhikabootcamp.com/api/blog?id_cat=${selectedCategory}&sort=${sorting}&page=${page}&size=7`, {
                params: {
                    search: query,
                },
            });

            setSearchResults(response.data.result);
            setPage(response.data.blogPage)
            setTotalPage(response.data.page)
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };
    return (
        <>
            <Box
                bgGradient="linear(to top, #A09006 0%, #A09006 35%, #000000 40%, #000000 60%, #A09006 65%, #A09006 100%)"
                width={'102vw'}
                height={'135vh'}
            >
                <Box>
                    <Navbar />
                </Box>

                <Flex justifyContent="center" margin="20px auto" fontFamily={'monospace'}>
                    <Box bgColor="black" h="350px" w="350px" mr="30px" p="15px" borderRadius="10px" boxShadow="2px 2px 5px black">
                        <FormControl>
                            <FormLabel color="#88012A" fontSize={'22px'} fontWeight={'bold'}>What is it that you seek?</FormLabel>
                            <Input color="#88012A" type="text" value={query} onChange={handleInputChange} borderColor="#259A80" focusBorderColor="#88012A" placeholder="Title or Keywords here.." _placeholder={{ color: "#88012A" }} />
                            <Select color="#88012A" value={selectedCategory} onChange={handleCategoryChange} mt="10px" borderColor="#259A80" focusBorderColor="#88012A" placeholder="Categories">
                                <option style={{ backgroundColor: "#334756" }} value="">All</option>
                                {categories?.map((category) => (
                                    <option style={{ backgroundColor: "#334756" }} key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </Select>

                            <Select color="#88012A" onChange={handleSortChange} placeholder={"Sort by Time"} mt="10px" borderColor="#259A80" focusBorderColor="#88012A" _placeholder={{ color: "#88012A" }}>
                                <option value="newest">Newest</option>
                                <option value="oldest">Oldest</option>
                            </Select>

                            <Stack>
                                <Button
                                    mt={7}
                                    onClick={handleSearch}
                                    bgColor="#88012A"
                                    color="#082032"
                                    _hover={{
                                        transform: "scale(2)",
                                        textColor: '#88012A',
                                        bg: 'black',
                                        _before: {
                                            bg: 'inherit',
                                        },
                                        _after: {
                                            bg: 'inherit',
                                        },
                                    }}
                                    w={'100px'}
                                    alignSelf={'center'}
                                >
                                    Search
                                </Button>
                            </Stack>

                        </FormControl>
                    </Box>
                    <Box bgColor="black" w="900px" h="800px" mr="30px" p="25px" borderRadius="10px" boxShadow="5px 5px 15px black">
                        <Flex justifyContent="space-between">
                            <Heading color="#88012A" fontSize="25px" fontFamily={'monospace'}>Finders Keepers.</Heading>

                        </Flex>
                        {searchResults?.map((item) => (
                            <Box key={item.id} mt="15px" onClick={() => onClick(item?.id)} cursor="pointer">
                                <Box>
                                    <HStack spacing={1} color="#88012A">
                                        <Avatar bg="#88012A" size="lg" src={`https://minpro-blog.purwadhikabootcamp.com/${item.imageURL}`} mr="20px" />
                                        <Box>
                                            <Text fontSize="14px" color={'#259A80'}>{item.User.username}</Text>
                                            <Heading fontSize="24px" overflow="hidden" whiteSpace="nowrap" maxW="500px" fontFamily={'papyrus'}>{item.title}</Heading>
                                            <Text fontSize="12px" color={'#259A80'}>
                                                {new Date(`${item.createdAt}`).toLocaleDateString("en-us", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric"
                                                })}
                                            </Text>
                                        </Box>
                                    </HStack>
                                </Box>
                                <Divider mt="10px" color="gray.900" />
                            </Box>
                        ))}
                        {page === null ? null : (
                            <Flex mt="15px" mb="15px" justifyContent="center">
                                <Button
                                    bgColor="#259A80"
                                    color="black"
                                    onClick={goToPrevPage}
                                    disabled={page === 1}
                                    colorScheme="yellow"
                                    size="md"
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
                                    mb={5}
                                >
                                    <ArrowBackIcon />
                                </Button>

                                <Button
                                    disabled
                                    bgColor="#259A80"
                                    color="black"
                                    colorScheme="yellow"
                                    size="md"
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
                                    mb={5}
                                    ml={4}
                                    mr={4}
                                >
                                    {page}
                                </Button>

                                <Button
                                    onClick={goToNextPage}
                                    disabled={page === totalPage}
                                    bgColor="#259A80"
                                    color="black"
                                    colorScheme="yellow"
                                    size="md"
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
                                    mb={5}
                                >
                                    <ArrowForwardIcon />
                                </Button>
                            </Flex>
                        )}
                    </Box>
                </Flex>
            </Box>
            <Footer />
        </>
    )
}