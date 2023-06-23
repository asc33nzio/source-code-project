import { Box, Button, Container, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Card({ article, href }) {

  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/article/${article.id}`);
  };

  const fullImageUrl = `https://minpro-blog.purwadhikabootcamp.com/${article.imageURL}`;
  
  return (
    <Box
      maxW={{ base: 'full', md: '275px' }}
      w={'full'}
      borderWidth={'1px'}
      borderRadius={'lg'}
      overflow={'hidden'}
      p={5}
      backgroundImage={`url(${fullImageUrl})`}
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <Stack align={'start'} spacing={2}>
        <Box mt={2}>
          <Heading size='md' color={'#259A80'}>{article.title}</Heading>
          <Text mt={1} fontSize={'sm'} color={'#88012A'} fontWeight={'bold'}>
            {article.Category.name}
          </Text>
        </Box>
        <Button variant={'link'} colorScheme={'yellow'} size={'sm'} color={'#259A80'} onClick={handleReadMore} target="_blank">
          Read more
        </Button>
      </Stack>
    </Box>
  );
};

export default function Top_Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://minpro-blog.purwadhikabootcamp.com/api/blog/');
        if (response.ok) {
          const data = await response.json();
          // console.log(data.result)
          setArticles(data.result);
        } else {
          console.error('Failed to fetch articles.', response.status, response.statusText);
        }
      } catch (error) {
        console.error('API not responding', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box p={4} bg={'#A09006'}>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'} color={'white'}>
          Latest Articles
        </Heading>
        <Text color={'#112022'} fontSize={{ base: 'sm', sm: 'lg' }}>
          The vanguard for news on all fronts that you shouldn't miss.<br />
          Always stay ahead with SCP.
        </Text>
      </Stack>

      <Container maxW={'5xl'} mt={12}>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          {articles.map((article) => (
            <Card
              key={article.id}
              article={article}
              href={`https://minpro-blog.purwadhikabootcamp.com/article/${article.id}`}
            />
          ))}
        </Flex>
      </Container>
    </Box>
  );
}
