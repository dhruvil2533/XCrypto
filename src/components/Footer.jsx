import { Avatar, Box, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import Profile from '../assets/IMG_20220310_103827.jpg'

const Footer = () => {
  return (
    <Box 
      bgColor={"blackAlpha.900"} 
      color={"whiteAlpha.700"} 
      minH={"48"} 
      px={"16"}
      py={["16", "8"]}
    >
      <Stack direction={["column", "row"]} h={"full"} alignItems={"center"} gap={["5","20"]}>
        <VStack width={"full"} alignItems={["center", 'flex-start']}>
          <Text fontWeight={"bold"}>About Us</Text>
          <Text 
            fontSize={"sm"} 
            letterSpacing={"widest"} 
            textAlign={["center", "left"]}
          >
            We are the best crypto trading app in India. We provide our services at the most reasonable price.
          </Text>
        </VStack>

        <VStack>
          <Avatar src={ Profile } boxSize={"28"} mt={["4", "0"]} />
          <Text>Our Founder</Text>
        </VStack>
      </Stack>
    </Box>
  )
}

export default Footer