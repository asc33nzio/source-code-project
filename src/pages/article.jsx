import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Flex, Heading, Img, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';


export function Articles() {
    const [article, setArticle] = useState(null);

    useEffect(() => {
        fetch('https://minpro-blog.purwadhikabootcamp.com/api/blog')
            .then(response => response.json())
            .then(data => {
                // Filter the articles based on a condition (in this case, article with the title 'test')
                const filteredArticles = data.result.filter(article => article.title === 'test');
                setArticle(filteredArticles[0]); // Set the first matching article as the selected article
            });
    }, []);

    return (
        <>
            <Navbar />

            <Stack direction={'column'} w={'102vw'} h={'200vh'} bgColor={'#A09006'} alignContent={'center'} >
                {article && ( // Check if article is not null before rendering
                    <Stack direction={'column'} w={'102vw'} h={'165vh'} bgColor={'#A09006'} alignContent={'center'} justifyContent={'center'} alignItems={'center'} justifyItems={'center'}>
                        <Img src={`https://minpro-blog.purwadhikabootcamp.com/${article.imageURL}`} />
                        <Heading fontFamily={'monospace'} fontSize={'50px'} textColor={'black'}>{article.title}</Heading>
                        <Text fontFamily={'monospace'} fontSize={'25px'} textColor={'#88012A'}>{article.content}</Text>
                        <Flex justify={'space-between'}>
                            <Stack direction={'row'} w={'50vw'} h={'15vh'} bgColor={'#A09006'} alignContent={'center'} justifyContent={'left'} alignItems={'center'} justifyItems={'left'}>
                                <Text fontFamily={'monospace'} fontSize={'18px'} textColor={'black'}>Keywords: {article.Blog_Keywords.map(keyword => keyword.Keyword.name).join(', ')}</Text>
                            </Stack>
                            <Stack direction={'row'} w={'50vw'} h={'15vh'} bgColor={'#A09006'} alignContent={'center'} justifyContent={'right'} alignItems={'center'} justifyItems={'right'}>
                                <Stack direction={'column'}>
                                    <Text fontFamily={'monospace'} fontSize={'18px'} textColor={'black'}>Created at: {article.createdAt}</Text>
                                    <Text fontFamily={'monospace'} fontSize={'18px'} textColor={'black'}>Author: {article.User.username}</Text>
                                </Stack>
                            </Stack>
                        </Flex>
                    </Stack>
                )}
            </Stack>

            <Footer />
        </>
    );
}
