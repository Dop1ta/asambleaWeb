import { Tabs, TabList, TabPanels, Tab, TabPanel, Button, Container, FormControl, FormLabel, Heading, Stack, Radio, RadioGroup, Input, useToast, Link, Text,
Accordion, AccordionItem, AccordionButton,AccordionPanel, AccordionIcon, Box} from '@chakra-ui/react'
import ButtonAlertVoting from './ButtonAlertVoting';
import MenuButtonIcon from '../components/MenuButton'


function Tab_votingActivity() {
    const toast = useToast();
    return (
      <Tabs align='center'>
        <TabList>
          <Link mx={5} my={5} align='left' href='http://localhost:3000'>Inicio</Link>
          <Tab>Votar</Tab>
          <Tab>Crear Votación</Tab>
          <Tab>Visualizar el conteo de votos</Tab>
          <MenuButtonIcon></MenuButtonIcon>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Container maxW="container.md">
              <Text as='b' fontSize='3xl'>Votar</Text>
              <Accordion allowToggle>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex='1' textAlign='left'>Votación Presidencia</Box>
                    <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                  <RadioGroup>
                        <Stack direction='row'>
                            <Radio value='1'>Persona 1</Radio>
                            <Radio value='2'>Persona 2</Radio>
                            <Radio value='3'>Persona 3</Radio>
                            <Radio value='4'>Persona 4</Radio>
                            <Button colorScheme="blue" size="md"type="sumbit" onClick={() => toast({ title: "Has votado correctamente" })}>Guardar Voto</Button>
                        </Stack>
                    </RadioGroup>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                    <Box as="span" flex='1' textAlign='left'>Votación Secretario</Box>
                    <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                  <RadioGroup>
                        <Stack direction='row'>
                            <Radio value='1'>Persona 1</Radio>
                            <Radio value='2'>Persona 2</Radio>
                            <Radio value='3'>Persona 3</Radio>
                            <Radio value='4'>Persona 4</Radio>
                            <Button colorScheme="blue" size="md"type="sumbit" onClick={() => toast({ title: "Has votado correctamente" })}>Guardar Voto</Button>
                        </Stack>
                    </RadioGroup>
                  </AccordionPanel>
                  </AccordionItem>
              </Accordion>
            </Container>
          </TabPanel>
          <TabPanel>
          <Container maxW="container.md">
            <Text as='b' fontSize='3xl'>Crear Votación</Text>
            <Stack>
                <FormControl isRequired>
                    <FormLabel textAlign={'center'}>Cargo:</FormLabel>
                    <RadioGroup>
                        <Stack direction='row'>
                            <Radio value='1'>Presidente</Radio>
                            <Radio value='2'>Bicepresidente</Radio>
                            <Radio value='3'>Secretario</Radio>
                            <Radio value='4'>Tesorero</Radio>
                            <Stack direction='row'>
                                <Radio value= '5'>Otro</Radio>
                                <Input placeholder='Ejemplo: Secretario 2.'/>
                            </Stack>
                        </Stack>
                    </RadioGroup>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Fecha de Inicio</FormLabel>
                    <Input placeholder="Select Date and Time" size="md" type="datetime-local" /*onChange={onChange}*/ name={"time"}/>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Fecha de Termino</FormLabel>
                    <Input placeholder="Select Date and Time" size="md" type="datetime-local" /*onChange={onChange}*/ name={"time"}/>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Candidato 1 (Ingresar Rut)</FormLabel>
                    <Input placeholder="00.000.000-0"/>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Candidato 2 (Ingresar Rut)</FormLabel>
                    <Input placeholder="00.000.000-0"/>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Candidato 3 (Ingresar Rut)</FormLabel>
                    <Input placeholder="00.000.000-0"/>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Candidato 4 (Ingresar Rut)</FormLabel>
                    <Input placeholder="00.000.000-0"/>
                </FormControl>
            </Stack>
            <Button colorScheme="blue" size="md" my="5" type="sumbit" onClick={() => toast({ title: "Has agendado la votación correctamente" })}>Guardar</Button>
        </Container>
          </TabPanel>
          <TabPanel>Visualizar el conteo de votos</TabPanel>
        </TabPanels>
      </Tabs>
    )
  }

export default Tab_votingActivity;