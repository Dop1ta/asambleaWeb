import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

const NavTab = ({ Tittle1, Tittle2 }) => {
  return (
    <Tabs isFitted variant='enclosed'>
      <TabList mb='1em'>
        <Tab>{Tittle1}</Tab>
        <Tab>{Tittle2}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <p>one!</p>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default NavTab