import React from 'react'
import { Stack, Image, Grid, GridItem } from '@chakra-ui/react'
import { Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react'
import Setting from '../components/Setting'

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
        <Image
          borderRadius='full'
          boxSize='80px'
          src='/icon.png'
          alt='Dan Abramov'
        />
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
    </Grid>
  )
}
