import NavTab from '../components/NavTab'
import { Stack, Grid, GridItem, Box, VStack, Heading } from '@chakra-ui/react'
import Head from 'next/head'
import directiva from '../components/directiva'
import showA from '../components/showA'

export default function Home() {
  return (
    <Stack bg={'rgb(244, 247, 254)'} textAlign={'center'}>
      <Head>
        <title>Inicio</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      <NavTab />
      <Grid
        templateAreas={`
                  "nav main"
                  "nav footer"`}
        gridTemplateColumns={'300px 1fr'}
        h='0'
        gap='1'
        color='blackAlpha.700'
        fontWeight='bold'
      >
        <GridItem pl='2' area={'nav'} margin={4} >
          {directiva()}
        </GridItem>
      </Grid>
      <GridItem pl='2' margin={4} bg={'rgb(244, 247, 254)'} height={600}>
        <VStack>
          <Heading>Asamblea recientemente agregadas</Heading>
          {showA()}
        </VStack>
      </GridItem>
    </Stack>
  )
}