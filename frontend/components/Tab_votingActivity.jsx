import { Tabs, TabList, TabPanels, Tab, TabPanel, Button } from '@chakra-ui/react'
import ButtonAlertVoting from './ButtonAlertVoting';
import MenuButtonIcon from '../components/MenuButton'


function Tab_votingActivity() {
    return (
      <Tabs>
        <TabList>
          <Tab>Votar</Tab>
          <Tab isDisabled>Crear Votación</Tab>
          <Tab>Visualizar el conteo de votos</Tab>
          <MenuButtonIcon></MenuButtonIcon>
        </TabList>
        <TabPanels>
          <TabPanel><ButtonAlertVoting></ButtonAlertVoting>
          <div><Button colorScheme="blue" >Votar por Dopa</Button></div>
          <div><Button colorScheme="blue">Votar por Manu</Button></div>
          <div><Button colorScheme="blue">Votar por Nancu</Button></div></TabPanel>
          <TabPanel>
          </TabPanel>
          <TabPanel>Visualizar el conteo de votos</TabPanel>
        </TabPanels>
      </Tabs>
    )
  }

export default Tab_votingActivity;