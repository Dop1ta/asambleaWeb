import { Container, Stack, Radio, RadioGroup,Button, useToast, Text, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box} from '@chakra-ui/react'
import React from 'react'
import MenuButtonIcon from '../components/MenuButton'
import Tab_votingActivity from '../components/Tab_votingActivity';


const voting_activity = () => {
    const toast = useToast();
    return (
        <Stack alignItems={"center"} backgroundColor={"rgb(244,247,254)"} >
        <Tab_votingActivity/>
        <Container maxW={"container.md"}>
              <Text as='b' fontSize='3xl'>Votar</Text>
              <Accordion allowToggle size={"xl"}>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex='1' textAlign='left'>Votación Presidencia</Box>
                    <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                  <RadioGroup alignItems>
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
        </Stack>
    )
}

export default voting_activity