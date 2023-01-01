import { useState } from 'react'
import { Button, Container, FormControl, FormLabel, Heading,Input, Stack } from '@chakra-ui/react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import Head from 'next/head'

const login = () => {

    const [values, setValues] = useState({
        rut: ''
    })

    const router = useRouter()

    const mainRouter = () => {
        router.push('/')
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(values)
        try {
            const response = await axios.post(`${process.env.API_URL}/login`, values)
            Cookies.set('rut', response.data.person)
            Cookies.set('logged', 'true')
            console.log(response)
            if(response.status === 201) {
                Swal.fire({
                    title: 'Inicio de sesion',
                    text: 'Se ha iniciado sesión correctamente',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then((result) => {
                    if(result.isConfirmed) {
                        if(Cookies.get('rut') === "0.000.000-0") {
                            router.push('/options/asambleasAdmin')
                        } else {
                            router.push('/')
                        }
                    }
                })
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Error al iniciar sesión',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }
        } catch (err) {
            Cookies.set('logged', 'false')
            Swal.fire({
                title: 'Error',
                text: 'Error al iniciar sesión',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    }

    const onChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    return (
        <Stack alignItems={"center"} textAlign={'center'} backgroundColor={"rgb(244,247,254)"} my={10}>
            <Head>
                <title>Inicio de sesión</title>
            </Head>
            <Container maxW="container.md" centerContent>
                <Heading textAlign={"center"} my={4}>Iniciar Sesión</Heading>
                <Stack my={4}>
                    <FormControl>
                        <FormLabel>RUT</FormLabel>
                        <Input placeholder='Ej: 9.999.999-k' maxLength={12} onChange={onChange} name={"rut"}/>
                    </FormControl>
                    <Stack>
                        <Button colorScheme={'blue'} onClick={onSubmit}>Iniciar Sesión</Button>
                        <Button colorScheme={'red'} onClick={mainRouter}>Cancelar</Button>
                    </Stack>
                </Stack>
            </Container>
        </Stack>
    )
}

export default login