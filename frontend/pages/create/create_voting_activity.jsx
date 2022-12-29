import {Button, Container, FormControl, FormLabel, Heading, Stack, Radio, RadioGroup, Input, useToast, Link} from '@chakra-ui/react'
import Tab_votingActivity from '../../components/Tab_votingActivity';

const create_voting_activity = () => {
    const toast = useToast();
    return (
        <Stack alignItems={"center"} backgroundColor={"rgb(244,247,254)"}>
        <Tab_votingActivity/>
        <Container maxW="container.md"  >
            <Heading textAlign={"center"} my={10}>Crear Votación</Heading>
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
        </Stack>
    )
}

export default create_voting_activity