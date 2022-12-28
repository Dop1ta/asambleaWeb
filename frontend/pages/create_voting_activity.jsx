import { Container, FormControl, FormLabel, Heading, Stack, Radio, RadioGroup } from '@chakra-ui/react'
import React from 'react'
import Tab_votingActivity from '../components/Tab_votingActivity'

const create_voting_activity = () => {
    return (
        <Container maxW="container.md">
            <Heading textAlign={"center"} my={10}>Crear Votación</Heading>
            <Stack>
                <FormControl>
                    <RadioGroup >
                        <Stack direction='row'>
                            <Radio value='1'>Presidente</Radio>
                            <Radio value='2'>Bicepresidente</Radio>
                            <Radio value='3'>Secretario</Radio>
                            <Radio value='4'>Tesorero</Radio>
                        </Stack>
    </RadioGroup>
                </FormControl>
            </Stack>
        </Container>
    )
}

export default create_voting_activity