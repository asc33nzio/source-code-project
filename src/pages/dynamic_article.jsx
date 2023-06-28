import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, Flex, Heading, IconButton, Img, Stack, Text } from '@chakra-ui/react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import ReactHtmlParser from 'html-react-parser';
import anon from "../assets/default_ava.jpg";
import axios from "axios";

export function DynamicArticle() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch(`https://minpro-blog.purwadhikabootcamp.com/api/blog/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setArticle(data[0]);
                    // console.log(data[0]) //revisit later on in the case the API gets revamped (fuck you API provider)
                } else {
                    console.error('Failed to fetch article:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Failed to fetch article:', error);
            }
        };

        fetchArticle();
    }, [id]);

    if (!article) {
        return null; // Render nothing if the article is non existent (does not include isDeleted = true)
    }

    const { User } = article; // Destructure the User property from the article object

    const handleLike = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login_user");
            return;
        }

        const updatedLiked = !liked; // Save the updated value of 'liked' before making the API request

        try {
            const response = await axios.post(
                "https://minpro-blog.purwadhikabootcamp.com/api/blog/like",
                { BlogId: id },
                {
                    headers: { Authorization: `Bearer ${token}` },
                    "Content-Type": "application/json",
                }
            );
            console.log(response.data);
            console.log({ BlogId: id });
            alert("Article added to liked list.");
            setLiked(updatedLiked); // Update the 'liked' state after the successful API request
        } catch (error) {
            console.log(error);
            alert("This article is already in your liked list.");
        }
    };

    return (
        <>
            <Stack direction={'column'} width={'102vw'} height={'100%'} bgColor={'#A09006'}>
                <Navbar />

                <Stack direction={'column'} w={'50vw'} h={'200vh'} bgColor={'#A09006'} alignContent={'center'}>
                    <Stack
                        key={article.id}
                        direction={'column'}
                        w={'102vw'}
                        h={'165vh'}
                        bgColor={'#A09006'}
                        alignContent={'center'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        justifyItems={'center'}
                        width={'102vw'}
                    >
                        <Heading fontFamily={'monospace'} fontSize={'50px'} textColor={'black'} pb={8}>
                            {ReactHtmlParser(article.title)}
                        </Heading>

                        <Img src={`https://minpro-blog.purwadhikabootcamp.com/${article.imageURL}`} maxWidth={'60%'} maxHeight={'60%'} objectFit={"fit"} pb={10} />

                        <Text fontFamily={'monospace'} fontSize={'25px'} textColor={'#88012A'}>
                            {ReactHtmlParser(article.content)}
                        </Text>

                        <IconButton
                            icon={liked ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
                            size={'lg'}
                            aria-label="Like this article"
                            onClick={handleLike}
                        />

                        <Text fontFamily={'monospace'} fontSize={'20px'} textColor={'#259A80'}>Like This Article!</Text>

                        <Flex align={'center'} justify={'center'}>
                            <Stack
                                direction={'column'}
                                w={'50vw'}
                                h={'15vh'}
                                bgColor={'#A09006'}
                                alignContent={'flex-start'}
                                justifyContent={'flex-start'}
                                alignItems={'flex-start'}
                                justifyItems={'flex-start'}
                                mt={8}
                            >
                                <Text fontFamily={'monospace'} fontSize={'18px'} textColor={'black'} mt={3}>
                                    Keywords: {article.Blog_Keywords ? article.Blog_Keywords.map(keyword => keyword.Keyword.name).join(', ') : ''}
                                </Text>

                                <Text fontFamily={'monospace'} fontSize={'18px'} textColor={'black'}>
                                    Category: {article.Category.name}
                                </Text>

                            </Stack>
                            <Stack
                                direction={'row'}
                                w={'50vw'}
                                h={'15vh'}
                                bgColor={'#A09006'}
                                alignContent={'flex-end'}
                                justifyContent={'flex-end'}
                                alignItems={'flex-end'}
                                justifyItems={'flex-end'}
                                marginRight={'30px'}
                            >
                                <Stack direction={'column'} bgColor={'#A09006'}>
                                    <Text fontFamily={'monospace'} fontSize={'18px'} textColor={'black'} bgColor={'#A09006'}>
                                        Created at: {new Date(`${article.createdAt}`).toLocaleDateString("en-us", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric"
                                        })}
                                    </Text>

                                    <Stack fontFamily={'monospace'} fontSize={'18px'} textColor={'black'} bgColor={'#A09006'} direction={'row'}>
                                        <Text>
                                            Author:
                                        </Text>

                                        <Avatar
                                            size={'lg'}
                                            src={article.User.imgProfile ? `https://minpro-blog.purwadhikabootcamp.com/${article.User.imgProfile}` : anon} />

                                        <Text fontWeight={'bold'} fontSize={'22px'}>
                                            {User ? User.username : ''}
                                        </Text>
                                    </Stack>

                                </Stack>
                            </Stack>
                        </Flex>
                    </Stack>

                </Stack>

                <Footer />
            </Stack>
        </>

    );
}