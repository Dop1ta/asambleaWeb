import NavTab from '../components/NavTab'
import { Stack, Grid, GridItem, Box, VStack, Heading } from '@chakra-ui/react'
import Head from 'next/head'
import directiva from '../components/directiva'
import showA from '../components/showA'

export default function Home() {
  return (
    <Stack bg={'rgb(244, 247, 254)'} textAlign={'center'} alignItems={'center'}>
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
      </Grid>
      <GridItem pl='2' area={'nav'} margin={4} width={500}>
        {directiva()}
      </GridItem>
      <GridItem pl='2' margin={4} bg={'rgb(244, 247, 254)'}>
        <Heading>Asamblea recientemente agregadas</Heading>
        {showA()}
      </GridItem>
    </Stack>
  )
}