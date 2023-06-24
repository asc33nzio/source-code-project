import { Flex, Stack, Text } from '@chakra-ui/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import caro_1 from '../assets/caro_1.jpg';
import caro_2 from '../assets/caro_2.jpg';
import caro_3 from '../assets/caro_3.jpg';
import caro_4 from '../assets/caro_4.gif';
import caro_5 from '../assets/caro_5.jpg';
import caro_6 from '../assets/caro_6.jpg';
import caro_7 from '../assets/caro_7.jpg';
import caro_8 from '../assets/caro_8.jpg';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const carouselImages = [caro_1, caro_2, caro_3, caro_4, caro_5, caro_6, caro_7, caro_8];

export default function Carousel() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://minpro-blog.purwadhikabootcamp.com/api/blog/pagFav?page=1&orderBy=total_fav&sort=DESC');
        if (response.ok) {
          const data = await response.json();
          setArticles(data.result)
        } else {
          console.error('failed to fetch articles.', response.status, response.statusText);
        }
      } catch (error) {
        console.error('API not responding', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Flex bg='black' justifyContent='center' justifyItems='center' alignContent='center' alignItems='center'>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={15}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        autoHeight='true'
        height='auto'
        coverflowEffect={{ stretch: '100' }}
      >
        {articles.map((article, index) => (
          <SwiperSlide key={index} height='auto'>
            <Stack height='100%' width='100%' position='relative'>
              <img src={carouselImages[index]} alt={`caro_${index + 1}`} onClick={() => navigate(`/article/${article.id}`)} style={{ cursor: 'pointer' }} />
              <Stack position='absolute' zIndex={1} top={0} right={0} color='white'>
                <Text fontFamily='monospace' fontSize='22px' color='yellow' textAlign={'right'}>
                  {article.title}
                </Text>
              </Stack>
              <Stack position={'absolute'} zIndex={1}>
                <div style={{ color: 'white', fontFamily: 'monospace', textAlign: 'left' }}>
                  <Text color='#259A80' fontWeight='bold' fontSize='20px' fontFamily='monospace' textAlign={'left'} mt={'80px'}>
                    {article.total_fav}
                  </Text>
                  People loved this article.
                </div>
              </Stack>
              <Stack direction={'column'} position={'static'} zIndex={1}>
                <Text color='white' fontFamily='monospace' fontStyle='italic' textAlign={'center'}>
                  {article.Category.name}
                </Text>
              </Stack>
            </Stack>
          </SwiperSlide>
        ))}

      </Swiper>
    </Flex >
  );
}
