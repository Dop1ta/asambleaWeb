import React, { useState, useEffect } from 'react'
import { Button, Container, FormControl, FormLabel, Heading, HStack, Input, InputGroup, InputLeftAddon, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import NavTabAdmin from '../../components/NavTabAdmin'

export async function getServerSideProps(context) {
    try {
        const res = await axios.get(`${process.env.API_URL}/getUsers/search/639a48dffe299c865e0ea1f9/${context.params.updateprofile}`)
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

const updateprofile = (data) => {

    const router = useRouter()

    const [user, setUser] = useState({
        name: data.data.name,
        rol: data.data.rol,
        email: data.data.email,
        number: data.data.number,
        address: data.data.address
    })

    const profileRouter = () => {
        router.push('/profile')
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(user)
        try {
            const response = await axios.put(`${process.env.API_URL}/getUsers/update/639a48dffe299c865e0ea1f9/${data.data._id}`, user)
            console.log(response)
            if(response.status === 201) {
                Swal.fire({
                    title: 'Usuario Actualizado',
                    text: 'El perfil se ha actualizado correctamente',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then((result) => {
                    if(result.isConfirmed) {
                        router.push('/profile')
                    }
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

    const fillUser = () => {
        console.log(user)
    }

    useEffect(() => {
        fillUser()
        console.log(data.data)
    }, [])

    return (
        <Stack alignItems={"center"} textAlign={'center'} backgroundColor={"rgb(244,247,254)"}>
            <NavTabAdmin/>
            <Container maxW="container.md" centerContent>
                <Heading textAlign={"center"} my={4}>Actualizar Perfil</Heading>
                <Stack my={4}>
                    <FormControl>
                        <FormLabel>Nombre</FormLabel>
                        <Input placeholder='Ej: Pedro Martinez' maxLength={100} onChange={onChange} name={"name"} defaultValue={data.data.name}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input placeholder='Ej: pedro.martinez@gmail.com' type='email' maxLength={100} onChange={onChange} name={"email"} defaultValue={data.data.email}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Numero de telefono</FormLabel>
                        <InputGroup>
                            <InputLeftAddon children='+56'/>
                            <Input placeholder='Ej: 912341234' maxLength={9} onChange={onChange} name={"number"} defaultValue={data.data.number}/>
                        </InputGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Direccion</FormLabel>
                        <Input placeholder='Ej: Los Carrera #123' maxLength={200} onChange={onChange} name={"address"} defaultValue={data.data.address}/>
                    </FormControl>
                    <Stack>
                        <Button colorScheme={'blue'} onClick={onSubmit}>Actualizar</Button>
                        <Button colorScheme={'red'} onClick={profileRouter}>Cancelar</Button>
                    </Stack>
                </Stack>
            </Container>
        </Stack>
    )
}

export default updateprofile