import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import MenuButton from './MenuButton'

const NavTab = ({ Tittle1, Tittle2 }) => {
  return (
    <Tabs size='md' variant='enclosed'>
      <TabList >
        <Tab>Inicio</Tab>
        <Tab>Actividades</Tab>
        <Tab>Foro</Tab>
        <Tab>Consultas</Tab>
        <MenuButton />
      </TabList>
      <TabPanels>
        <TabPanel>
          <p></p>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
      </TabPanels>
    </Tabs >
  )
}

export default NavTab