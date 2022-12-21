import React from 'react'
import NavTab from '../components/NavTab'
import { Center, Image, Grid, GridItem, Heading, SimpleGrid, Stack } from '@chakra-ui/react'


export default function Home() {
  return (
    <Stack>
      <Center>
        <Image
          borderRadius='full'
          width='80px'
          height='80px'
          boxSize='80px'
          src='/icon.png'
          alt='Dan Abramov'
        />
        <Heading mb={4}>
          DIRECTIVA DE BARRIO LAUTARO JOSEFINA
        </Heading >
      </Center>
      <Center>
        <NavTab></NavTab>
      </Center>
    </Stack>
  )
}
