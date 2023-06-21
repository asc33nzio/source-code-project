import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from 'react-router-dom';
import { Flex, Heading, Img, Stack, Text } from '@chakra-ui/react';
import ReactHtmlParser from 'html-react-parser';

export function DynamicArticle() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch(`https://minpro-blog.purwadhikabootcamp.com/api/blog/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setArticle(data[0]);
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
        return null; // Render nothing if the article is non existent
    }

    const { User } = article; // Destructure the User property from the article object

    return (
        <>
            <Stack direction={'column'} width={'100%'} height={'100%'} bgColor={'#A09006'}>
                <Navbar />

                <Stack direction={'column'} w={'50vw'} h={'200vh'} bgColor={'#A09006'} alignContent={'center'}>
                    <Stack
                        key={article.id}
                        direction={'column'}
                        w={'100vw'}
                        h={'165vh'}
                        bgColor={'#A09006'}
                        alignContent={'center'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        justifyItems={'center'}
                    >
                        <Heading fontFamily={'monospace'} fontSize={'50px'} textColor={'black'} pb={8}>
                            {ReactHtmlParser(article.title)}
                        </Heading>
                        <Img src={`https://minpro-blog.purwadhikabootcamp.com/${article.imageURL}`} maxWidth={'60%'} maxHeight={'60%'} objectFit={"fit"} pb={10} />
                        <Text fontFamily={'monospace'} fontSize={'25px'} textColor={'#88012A'}>
                            {ReactHtmlParser(article.content)}
                        </Text>
                        <Flex justify={'space-between'}>
                            <Stack
                                direction={'row'}
                                w={'50vw'}
                                h={'15vh'}
                                bgColor={'#A09006'}
                                alignContent={'center'}
                                justifyContent={'left'}
                                alignItems={'center'}
                                justifyItems={'left'}
                            >
                                <Text fontFamily={'monospace'} fontSize={'18px'} textColor={'black'}>
                                    Keywords: {article.Blog_Keywords ? article.Blog_Keywords.map(keyword => keyword.Keyword.name).join(', ') : ''}
                                </Text>
                            </Stack>
                            <Stack
                                direction={'row'}
                                w={'50vw'}
                                h={'15vh'}
                                bgColor={'#A09006'}
                                alignContent={'center'}
                                justifyContent={'right'}
                                alignItems={'center'}
                                justifyItems={'right'}
                            >
                                <Stack direction={'column'} bgColor={'#A09006'}>
                                    <Text fontFamily={'monospace'} fontSize={'18px'} textColor={'black'} bgColor={'#A09006'}>
                                        Created at: {article.createdAt}
                                    </Text>
                                    <Text fontFamily={'monospace'} fontSize={'18px'} textColor={'black'} bgColor={'#A09006'}>
                                        Author: {User ? User.username : ''}
                                    </Text>
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