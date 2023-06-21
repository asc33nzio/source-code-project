import { Flex, Img, Text } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import ghub from '../assets/thumbnails/ghub.png';
import gmail from '../assets/thumbnails/gmail.png';
import ig from '../assets/thumbnails/ig.png';
import linkedin from '../assets/thumbnails/in.png';
import wa from '../assets/thumbnails/wa.png';

export default function Footer() {

    return (
        <Flex id={"bikinibottom"} direction={'row'} justifyContent={'center'} alignItems={'center'} bgGradient="linear(to bottom, #A09006 0.1%, #000000)" width={'100vw'} height={'10vh'}>
            <Text fontFamily={'monospace'} fontSize={'18px'} fontWeight={'bold'} color={'black'}>Contact SCP's</Text> 
            
            <Link to="https://wa.me/+6285894085699" target="_blank" rel="noopener noreferrer">
                <Img src={wa} alt='whatsapp' cursor={'pointer'} ml={10} mr={10} h={'45px'} w={'45px'} />
            </Link>

            <Link to="mailto:amadeo.f.marli@gmail.com" target="_blank" rel="noopener noreferrer">
                <Img src={gmail} alt='gmail' cursor={'pointer'} mr={10} h={'50px'} w={'50px'} />
            </Link>

            <Link to="https://www.linkedin.com/in/amdmarli" target="_blank" rel="noopener noreferrer">
                <Img src={linkedin} alt='linkedin' cursor={'pointer'} mr={10} h={'50px'} w={'50px'} />
            </Link>

            <Link to="https://www.instagram.com/amdmarli" target="_blank" rel="noopener noreferrer">
                <Img src={ig} alt='instagram' cursor={'pointer'} mr={10} h={'50px'} w={'50px'} />
            </Link>

            <Link to="https://github.com/asc33nzio" target="_blank" rel="noopener noreferrer">
                <Img src={ghub} alt='github' cursor={'pointer'} mr={10} h={'50px'} w={'50px'} />
            </Link>

            <Text fontFamily={'monospace'} fontSize={'18px'} fontWeight={'bold'} color={'black'}>Developer</Text> 
        </Flex>
    )
};