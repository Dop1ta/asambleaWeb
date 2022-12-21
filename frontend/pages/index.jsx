import { useState, useEffect } from 'react'
import NavTab from '../components/NavTab'
import { Center, Image, Grid, GridItem, Heading, SimpleGrid, Stack } from '@chakra-ui/react'
import axios from 'axios'

console.log(process.env.API_URL)


export default function Home() {

  const [asambleas, setAsambleas] = useState([])

  const getAsambleas = async () => {
    const response = await axios.get('/asambleas')
    console.log(response)
  }

  useEffect(() => {

  }, [])

  return (
    <Stack bg='blackAlpha.50'>
      <Center >
        <Image
          borderRadius='full'
          width='80px'
          height='80px'
          boxSize='80px'
          src='/icon.png'
          alt='Dan Abramov'
        />
        <Heading mb={4}>
          Junta de vecinos "Rodrigo Beltran anashe Josefinasons"
        </Heading >
      </Center>
      <Center>
        <NavTab></NavTab>
      </Center>
    </Stack>
  )
}