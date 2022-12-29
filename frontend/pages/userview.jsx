import { useEffect, useState } from 'react'
import { Box, Card, CardBody, CardHeader, Container, Heading, Stack, Text, StackDivider, SimpleGrid, CardFooter, Button } from '@chakra-ui/react'
import { TrashIcon, AddIcon, EllipseIcon, AddCircle, AddCircleIcon } from 'chakra-ui-ionicons'
import axios from 'axios'
import NavTab from '../components/NavTab'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

const userview = () => {

    const [users, setUsers] = useState([])

    const router = useRouter()

    const getUsers = async () => {
        const response = await axios.get(`${process.env.API_URL}/getUsers/639a48dffe299c865e0ea1f9`)
        setUsers(response.data)
    }

    const createRouter = () => {
        router.push('/create/create_user')
    }

    const showUsers = () => {
        return users.map(user => {
            return (
                <Card key={user._id} maxW='sm'   backgroundColor={'white'}>
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
                    <CardFooter>
                        <Stack direction={'row'}>
                            <Button colorScheme={'teal'} leftIcon={<EllipseIcon/>}>Editar</Button>
                            <Button colorScheme={'red'} leftIcon={<TrashIcon/>}>Eliminar</Button>
                        </Stack>
                    </CardFooter>
                </Card>
            )
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