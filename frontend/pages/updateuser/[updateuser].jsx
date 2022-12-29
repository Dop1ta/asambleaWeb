import React, { useState, useEffect } from 'react'
import { Button, Container, FormControl, FormLabel, Heading, HStack, Input, InputGroup, InputLeftAddon, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import NavTabAdmin from '../../components/NavTabAdmin'

export async function getServerSideProps(context) {
    try {
        const res = await axios.get(`${process.env.API_URL}/getUsers/search/639a48dffe299c865e0ea1f9/${context.params.updateuser}`)
        return {
        props: {
            data: res.data
        }
        }
    } catch (error) {
        return {
        redirect: {
            destination: '/userview',
            permanent: false
        }
        }
    }
}

const updateuser = (data) => {

    const router = useRouter()

    const [values, setValues] = useState({
        name: '',
        rut: '',
        rol: '',
        email: '',
        number: '',
        address: ''
    })

    const [user, setUser] = useState({
        name: '',
        rol: '',
        email: '',
        number: '',
        address: ''
    })

    const userRouter = () => {
        router.push('/userview')
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(values)
        try {
            const response = await axios.post(`${process.env.API_URL}/getUsers/update/639a48dffe299c865e0ea1f9/${id}`, values)
            console.log(response)
            if(response.status === 201) {
                Swal.fire({
                    title: 'Usuario creado',
                    text: 'El usuario se a actualizado correctamente',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Error al ingresar los parametros',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }
        } catch (err) {
            Swal.fire({
                title: 'Error',
                text: 'No se ha podido actualizar el usuario',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    }

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        console.log(data)
    }, [])

    return (
        <Stack alignItems={"center"} textAlign={'center'} backgroundColor={"rgb(244,247,254)"}>
            <NavTabAdmin/>
            <Container maxW="container.md" centerContent>
                <Heading textAlign={"center"} my={4}>Actualizar Usuario</Heading>
                <Stack my={4}>
                    <FormControl>
                        <FormLabel>Nombre</FormLabel>
                        <Input placeholder='Ej: Pedro Martinez' maxLength={100} onChange={onChange} name={"name"} value={data.data.name}/>
                    </FormControl>
                    <FormControl as='fieldset'>
                        <FormLabel as='legend'>Rol</FormLabel>
                        <RadioGroup value={data.data.rol}>
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
                        <Input placeholder='Ej: pedro.martinez@gmail.com' type='email' maxLength={100} onChange={onChange} name={"email"} value={data.data.email}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Numero de telefono</FormLabel>
                        <InputGroup>
                            <InputLeftAddon children='+56'/>
                            <Input placeholder='Ej: 912341234' maxLength={9} onChange={onChange} name={"number"} value={data.data.number}/>
                        </InputGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Direccion</FormLabel>
                        <Input placeholder='Ej: Los Carrera #123' maxLength={200} onChange={onChange} name={"address"} value={data.data.address}/>
                    </FormControl>
                    <Stack>
                        <Button colorScheme={'blue'} onClick={onSubmit}>Actualizar</Button>
                        <Button colorScheme={'red'} onClick={userRouter}>Cancelar</Button>
                    </Stack>
                </Stack>
            </Container>
        </Stack>
    )
}

export default updateuser