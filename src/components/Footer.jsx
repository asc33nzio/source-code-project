import { Flex, Img, Text, Input, Button, useToast, Box, CloseButton } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import ghub from '../assets/thumbnails/ghub.png';
import gmail from '../assets/thumbnails/gmail.png';
import ig from '../assets/thumbnails/ig.png';
import linkedin from '../assets/thumbnails/in.png';
import wa from '../assets/thumbnails/wa.png';
import { useRef } from 'react';

export default function Footer() {
    const toast = useToast();
    const emailInputRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const emailInput = emailInputRef.current.value;

        if (!emailRegex.test(emailInput)) {
            toast({
                title: 'Invalid E-mail',
                description: 'Please enter a valid e-mail address.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } else {
            alert('Thank you for joining our newsletter. Stay tuned for our new projects.');

            toast({
                title: 'WELCOME.',
                description: 'Looking in all the right places.',
                status: 'HELLO VISITOR.',
                duration: 800,
                isClosable: true,
                render: ({ onClose }) => (
                    <Box
                        p={0}
                        m={0}
                        bg="black"
                        color="#A09006"
                        borderRadius="md"
                        width="470px"
                        fontSize="8px"
                    >
                        <CloseButton position="absolute" right={4} top={4} onClick={onClose} />
                        <pre>
                            {`
                                                 ...---:.                                         
                                        ...:------=#%+%%=------::..                                
                                    .::----------+#%+-=#%+-----------:..                           
                                .:--------------+%#-----*%+--------------:.                        
                             .:---:------------*%#-------#%*-----------------.                     
                           .------------------*%#---------*%#------------------:                   
                         :-------------------#%*---=-------+%%=-------------------.                
                       :---------------:---=#%+-------------+#%=-------------------:               
                     .------------------:-=%%+--------=-------#%+--------------------:             
                    :---::----:----------=#%=------------------#%*--------------------:            
                   :-:-----:-----:------+%#=--------------------*%*--------------------:           
                  :---:-------:--------+%#-----------------------+%#---------------------.         
                 ::-------------------#%*-------------------------+%#=--------------------         
                :-::---::---::-------#%+------------------------:--=%%=--------------------        
               .-:------------------#%%##############################%%+-----:--------:----:       
               :--:-----::------:-=#%%=----+#%%*++==-=-===+*#%#+=----*%%*-------------------.      
              .::------------:---+%##%---+%%*=-----::--------=+%%#=--+%#%*-------------------      
              :------:--:--:----+%#-*%-+%%+------::-------------=#%*-+%-+%#=-------::-----:--      
              ---:----::--:---:*%*--*%#%*-------------:-----------+%#*%--+%%=----------------.     
             .-:--------------#%*---*%%*--::-------:------:-:-----:+%%%---=#%=---:-:---------:     
             .--:-:--:-:::---#%+----*%#--------:-:::-------:--------*%%--::-#%+-:----------:::     
             .---::::-:-:--=%%=-----*%--::-:--------------::---------#%-:----#%+---::-----:--:     
             .:::::--:---:=%#=------*%-----::---:---------------:--:-#%----::-*%*-:----------.     
              --:-:-:-:::+%#----:--:*%-------:--------------:::----::#%--------+%#=----------.     
              :::::::::-+%#------:-:+%+--:-:----:-:------:-------:---%%---------+%#--:::-----      
               ::::::--*%*----------*%%=--::---::--:---:----:-:::-:-#%%---:------=#%=-:-----:      
               :---:::*%+----:-::-:-*%%%----:--------::--:-:----:::*%%%--------:-:-#%+:---::       
                :::-=#%=-------:----*%=##=---::---:-:::--::-:::::=#%**%-:--:::-:-::-#%*:::-.       
                .--=%%=--:-:::----:-*%--*%#=::-----:::---:::-::=*%#=-*%-:-:--:::-:-:-*%*:-:        
                 .=%#=:---::--------*%:::=*%#+=--::-:--:::-:-+#%#+:--+%--------:::--:-+%#:         
                  =#===-=-==----====*%==-=-=*#%%#*+++==++*##%%#+=====*%==-==-=-=======-**          
                   :*******************************************************************=           
                     :---:--:-:----::::::-::::--::::::::::-::---::-::-:-::::::::--::::             
                      .:-:::--:--:-:::::::-:-:::::::-:--:-:::::::-:::-:::::::::::---:              
                        .::::::::-::--::--::::-::::::-::::-:::::::::-:::::::-::::::                
                          .:-::--:-:-------::::::::-:-:::::::::::::-::::::--:::::                  
                            .:-::::-::---:::-::::-::-::-::::::::::-::--:-:::::.                    
                               .::-::::::::::::--::-::::::-:::::::::::::-::..                      
                                  ..:::::::-::::-:::-:::::::::-::---::::.                          
                                      ..:::::::::::::::::::::::::::..                              
                                            ....:::::::::::....   
        `}
                        </pre>
                    </Box>
                ),
            });
        };
    };


    return (
        <Flex
            id={"bikinibottom"}
            direction={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            bgGradient="linear(to bottom, #A09006 0.1%, #000000)"
            width={'102vw'}
            height={'10vh'}
        >

            <Flex
                position="absolute"
                bottom={0}
                left={0}
                ml={1}
                mb={1}
                alignItems="center"
            >
                <Input
                    ref={emailInputRef}
                    name="email"
                    type="email"
                    placeholder="Join our newsletter."
                    mr={1}
                    bg="black"
                    color="#88012A"
                    _placeholder={{ color: "#88012A" }}
                    borderRadius="md"
                    size="sm"
                    maxWidth="150px"
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          handleSubmit(event);
                        }
                      }}
                    required
                />
                <Button
                    onClick={handleSubmit}
                    bgColor="grey.800"
                    color="white"
                    size="sm"
                    borderRadius="md"
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
                    Go.
                </Button>
            </Flex>

            <Text fontFamily={'monospace'} fontSize={'18px'} fontWeight={'bold'} color={'black'}>
                Contact SCP's
            </Text>

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

            <Text fontFamily={'monospace'} fontSize={'18px'} fontWeight={'bold'} color={'black'}>
                Developer
            </Text>

        </Flex>
    )
};
