import React from 'react'
import { Center, Image, Grid, GridItem, Text, SimpleGrid } from '@chakra-ui/react'


export default function Home() {
  return (
    <Grid
      templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
      gridTemplateRows={'82px 1fr 130px'}
      gridTemplateColumns={'180px 1fr'}
      h='200px'
      gap='1'
      color='blackAlpha.700'
      fontWeight='bold'
    >
      <GridItem pl='2' bg='orange.300' area={'header'}>
        <SimpleGrid columns={2}>
          <Image
            borderRadius='full'
            width='80px'
            height='80px'
            boxSize='80px'
            src='/icon.png'
            alt='Dan Abramov'
          />
          <Text fontSize='4xl'>
            I'm using a custom font-size value for this text
          </Text>
        </SimpleGrid>
      </GridItem>
      <GridItem pl='2' bg='pink.300' area={'nav'}>
        Nav
      </GridItem>
      <GridItem pl='2' bg='green.300' area={'main'}>
        Main
      </GridItem>
      <GridItem pl='2' bg='blue.300' area={'footer'}>
        Footer
      </GridItem>
    </Grid >
  )
}
