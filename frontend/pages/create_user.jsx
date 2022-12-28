import { useEffect, useState } from 'react'
import { Button, Container, FormControl, FormLabel, Heading, HStack, Input, InputGroup, InputLeftAddon, Radio, RadioGroup, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import axios from 'axios'
import NavTab from '../components/NavTab'


const create_user = () => {

    const [values, setValues] = useState({
        name: '',
        rut: '',
        rol: '',
        email: '',
        number: '',
        address: ''
    })

    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(values)
    }

    const onChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    return (
        <Stack alignItems={"center"} textAlign={'center'} backgroundColor={"rgb(244,247,254)"}>
            <NavTab/>
            <Container maxW="container.md" centerContent>
                <Heading textAlign={"center"} my={4}>Agregar Vecino</Heading>
                <Stack my={4}>
                    <FormControl>
                        <FormLabel>Nombre</FormLabel>
                        <Input placeholder='Ej: Pedro Martinez' type={"text"} maxLength={100} onChange={onChange} name={"name"}/>
                    </FormControl><FormControl>
                        <FormLabel>Rut</FormLabel>
                        <Input placeholder='Ej: 9.999.999-k' maxLength={12} onChange={onChange} name={"rut"}/>
                    </FormControl>
                    <FormControl as='fieldset'>
                        <FormLabel as='legend'>Rol</FormLabel>
                        <RadioGroup>
                            <HStack spacing='24px'>
                                <Radio value='Vecino' name={"rol"} onChange={onChange}>Vecino</Radio>
                                <Radio value='Presidente' name={"rol"} onChange={onChange}>Presidente</Radio>
                                <Radio value='Vicepresidente' name={"rol"} onChange={onChange}>Vicepresidente</Radio>
                                <Radio value='Secretario' name={"rol"} onChange={onChange}>Secretario/a</Radio>
                                <Radio value='Tesorero' name={"rol"} onChange={onChange}>Tesorero/a</Radio>
                            </HStack>
                        </RadioGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input placeholder='Ej: pedro.martinez@gmail.com' type='email' maxLength={100} onChange={onChange} name={"email"}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Numero de telefono</FormLabel>
                        <InputGroup>
                            <InputLeftAddon children='+56'/>
                            <Input placeholder='Ej: 912341234' type='tel' maxLength={9} onChange={onChange} name={"number"}/>
                        </InputGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Direccion</FormLabel>
                        <Input placeholder='Ej: Los Carrera #123' maxLength={200} onChange={onChange} name={"address"}/>
                    </FormControl>
                    <Button onClick={onSubmit}>Agregar</Button>
                </Stack>
            </Container>
        </Stack>
    )
}

export default create_user