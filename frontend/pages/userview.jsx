import { useEffect, useState } from 'react'
import { Box, Card, CardBody, CardHeader, Container, Heading, Stack, Text, StackDivider, SimpleGrid, CardFooter, Button } from '@chakra-ui/react'
import { TrashIcon, AddIcon } from 'chakra-ui-ionicons'
import axios from 'axios'
import NavTabAdmin from '../components/NavTabAdmin'
import { useRouter } from 'next/router'
import { EditIcon } from '@chakra-ui/icons'
import Swal from 'sweetalert2'

const userview = () => {

    const [users, setUsers] = useState([])

    const router = useRouter()

    const getUsers = async () => {
        const response = await axios.get(`${process.env.API_URL}/getUsers/639a48dffe299c865e0ea1f9`)
        setUsers(response.data)
    }

    const deleteUser = (id) => {
        Swal.fire({
            title: 'Eliminar usuario',
            text: '¿Estas seguro?, esta acción no se puede deshacer',
            icon: 'warning',
            confirmButtonText: 'Eliminar',
            showCancelButton: true,
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if(result.isConfirmed) {
                const response = axios.delete(`${process.env.API_URL}/getUsers/delete/639a48dffe299c865e0ea1f9/${id}`)
                console.log(response.status)
                if(response.status === 201) {
                    Swal.fire({
                        title: 'Usuario Eliminado',
                        text: 'El usuario se ha eliminado correctamente',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    }).then((result) => {
                        if(result.isConfirmed) {
                            router.reload()
                        }
                    })
                } else {
                    Swal.fire({
                        title: 'Usuario Eliminado',
                        text: 'El usuario se ha eliminado correctamente',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    }).then((result) => {
                        if(result.isConfirmed) {
                            router.reload()
                        }
                    })
                }
            }
        }).catch(e => {
            console.log(e)
        })
    }

    const createRouter = () => {
        router.push('/create/create_user')
    }

    const showUsers = () => {
        return users.map(user => {
            if(user.rut === '0.000.000-0') {
                return null
            } else {
                return (
                    <Card key={user._id} maxW='sm' backgroundColor={'white'} alignItems={'center'}>
                        <CardHeader>
                            <Heading size='md'>{user.name}</Heading>
                        </CardHeader>
                        <CardBody>
                            <Stack divider={<StackDivider/>} spacing='4'>
                                <Box>
                                    <Heading size='xs' >RUT</Heading>
                                    <Text pt='2' fontSize='sm'>{user.rut}</Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' >ROL</Heading>
                                    <Text pt='2' fontSize='sm'>{user.rol}</Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' >EMAIL</Heading>
                                    <Text pt='2' fontSize='sm'>{user.email}</Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' >TELEFONO</Heading>
                                    <Text pt='2' fontSize='sm'>{user.number}</Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' >DIRECCION</Heading>
                                    <Text pt='2' fontSize='sm'>{user.address}</Text>
                                </Box>
                            </Stack>
                        </CardBody>
                        <CardFooter >
                            <Stack direction={'row'} >
                                <Button colorScheme={'blue'} leftIcon={<EditIcon/>} onClick={() => router.push(`/updateuser/${user._id}`)}>Editar</Button>
                                <Button colorScheme={'red'} leftIcon={<TrashIcon/>} onClick={() => deleteUser(user._id)}>Eliminar</Button>
                            </Stack>
                        </CardFooter>
                    </Card>
                )
            }
        })
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <Stack alignItems={"center"} textAlign={'center'} backgroundColor={"rgb(244,247,254)"}>
            <NavTabAdmin/>
            <Container maxW="container.md" my={4}>
                <Heading textAlign={"center"} my={4}>Administrar Usuarios</Heading>
                <Stack my={4}>
                    <Button leftIcon={<AddIcon/>} onClick={createRouter}>Crear Usuario</Button>
                </Stack>
                <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(250px, 1fr))'>
                    {showUsers()}
                </SimpleGrid>
            </Container>
        </Stack>
    )
}

export default userview