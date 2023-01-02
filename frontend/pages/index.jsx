import NavTab from '../components/NavTab'
import { Stack, Grid, GridItem, Box, VStack, Heading } from '@chakra-ui/react'
import Head from 'next/head'
import directiva from '../components/directiva'
import showA from '../components/showA'

export default function Home() {
  return (
    <Stack bg={'rgb(244, 247, 254)'}>
      <Head>
        <title>Inicio</title>
      </Head>
      <NavTab />
      <Grid
        templateAreas={`
                  "nav main"
                  "nav footer"`}
        gridTemplateRows={'650px 1fr 30px'}
        gridTemplateColumns={'300px 1fr'}
        h='200px'
        gap='1'
        color='blackAlpha.700'
        fontWeight='bold'
      >
        <GridItem pl='2' area={'nav'} margin={4} >
          {directiva()}
        </GridItem>
        <GridItem pl='2' boxShadow={'xl'} bg={'white'} margin={4} area={'main'}>
          <VStack>
            <Heading>Asamblea recientemente agregadas</Heading>
            {showA()}
          </VStack>
        </GridItem>
        <GridItem pl='2' margin={4} bg='blue.300' area={'footer'}>
          <Box as="footer" margin={4} p={4} bg="gray.700" color="white">
            CONTACTO: 0000000 | EMAIL: JEFATURA@GMAIL.COM | DIRECCIÓN: CALLE 0000 N° 0000 | HORARIO DE ATENCIÓN: LUNES A VIERNES DE 8:00 A 12:00 Y DE 14:00 A 18:00
          </Box>
        </GridItem>
      </Grid>
    </Stack>
  )
}