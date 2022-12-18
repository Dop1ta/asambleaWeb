import React from 'react'
import { Stack, Image, Grid, GridItem } from '@chakra-ui/react'
import NavTab from '../components/NavTab'
import Setting from '../components/Setting'

export default function Home() {
  return (
    <Stack>
      <header>
        <div>
          <Grid templateColumns='repeat(3, 1fr)'>
            <GridItem>
              <Image
                borderRadius='full'
                boxSize='80px'
                src='/icon.png'
                alt='Dan Abramov'
              />
            </GridItem>
            <GridItem bg='blue.500'>
              <h1 >Directiva Concepcion</h1>
            </GridItem>
            <GridItem>
              <Setting />
            </GridItem>
          </Grid>
        </div>
      </header>
      <NavTab Tittle1='Tittle1' Tittle2='Tittle2' />
    </Stack>
  )
}
