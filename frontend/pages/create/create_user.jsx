import { useState } from 'react'
import { Button, ButtonGroup, Container, FormControl, FormLabel, Heading, HStack, Input, InputGroup, InputLeftAddon, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import axios from 'axios'
import NavTab from '../../components/NavTab'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import NavTabAdmin from '../../components/NavTabAdmin'
import Cookies from 'js-cookie'
import Head from 'next/head'

const create_user = () => {

    const [values, setValues] = useState({
        name: '',
        rut: '',
        rol: '',
        email: '',
        number: '',
        address: '',
        votos: '',
        admin: '0'
    })

    const router = useRouter()

    const userRouter = () => {
        router.push('/userview')
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(values)
        try {
            const response = await axios.post(`${process.env.API_URL}/createUser/639a48dffe299c865e0ea1f9`, values)
            console.log(response)
            if (response.status === 201) {
                Swal.fire({
                    title: 'Usuario creado',
                    text: 'El usuario se a creado correctamente',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.push('/userview')
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
                text: 'No se ha podido crear el usuario',
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
        <Stack alignItems={"center"} textAlign={'center'} backgroundColor={"rgb(244,247,254)"}>
            <Head>
                <title>Creación de usuario</title>
                <link rel="icon" href="/icon.png" />
            </Head>
            <NavTabAdmin />
            <Container maxW="container.md" centerContent>
                <Heading textAlign={"center"} my={4}>Agregar Usuario</Heading>
                <Stack my={4}>
                    <FormControl>
                        <FormLabel>Nombre</FormLabel>
                        <Input placeholder='Ej: Pedro Martinez' maxLength={100} onChange={onChange} name={"name"} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Rut</FormLabel>
                        <Input placeholder='Ej: 9.999.999-k' maxLength={12} onChange={onChange} name={"rut"} />
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
                        <Input placeholder='Ej: pedro.martinez@gmail.com' type='email' maxLength={100} onChange={onChange} name={"email"} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Numero de telefono</FormLabel>
                        <InputGroup>
                            <InputLeftAddon children='+56' />
                            <Input placeholder='Ej: 912341234' type={'number'} maxLength={9} onChange={onChange} name={"number"} />
                        </InputGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Direccion</FormLabel>
                        <Input placeholder='Ej: Los Carrera #123' maxLength={200} onChange={onChange} name={"address"} />
                    </FormControl>
                    <FormControl>
                        <ButtonGroup spacing='6'>
                            <Button colorScheme={'blue'} variant='outline' onClick={onSubmit}>Agregar</Button>
                            <Button colorScheme={'red'} variant='outline' onClick={userRouter}>Cancelar</Button>
                        </ButtonGroup>
                    </FormControl>
                </Stack>
            </Container>
        </Stack>
    )
}

export default create_user