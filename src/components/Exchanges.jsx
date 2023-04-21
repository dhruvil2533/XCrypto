import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from "../index"
import { Container, HStack, VStack, Image, Heading, Text, Button} from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';

const Exchanges = () => {

  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };

  const btns = new Array(6).fill(1);

  useEffect(() => {
    
    const fetchExchanges = async () => {
      try {
        const {data} = await axios.get(`${server}/exchanges?page=${page}`);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchExchanges();
  }, [page]);

  if(error) { // if(error) return <Error />    will also work the same
    return <ErrorComponent message={"Error While Fetching Exchanges Data"}/>
  }
  
  return (
    <Container maxW={"container.xl"}>
      {
        loading ? 
          <Loader /> : 
          <>
            <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
              {
                exchanges.map((i) => (
                  <ExchangeCard
                    key={i.id}
                    name={i.name} 
                    img={i.image} 
                    rank={i.trust_score_rank} 
                    url={i.url} 
                  />
                ))
              }
            </HStack>
            <HStack p={"8"}>
              {
                btns.map((item, index) => (
                  <Button
                    key={index}
                    bgColor={"blackAlpha.900"}
                    color={"white"}
                    onClick={() => changePage(index+1)}
                  >
                    { index+1 }
                  </Button>
                ))
              }
            </HStack>
          </>
      }
    </Container>
  )
}

const ExchangeCard = ({name, img, rank, url}) => (
  <>
    <a href={ url } target={'blank'}>
      <VStack w={"52"} 
        shadow={"lg"} 
        p={"8"} 
        borderRadius={"lg"} 
        transition={"all 0.3s"} 
        m={"4"}
        css={{
          "&:hover": {
            transform: "scale(1.1)"
          } 
        }}
      >
        <Image
          src={ img } 
          w={"10"}
          h={"10"} 
          objectFit={"contain"} 
          alt={"Exchange"} 
        />

        <Heading size={"md"} noOfLines={1}>{ rank }</Heading>

        <Text noOfLines={1}>{ name }</Text>
      </VStack>
    </a>
  </>
);

export default Exchanges;