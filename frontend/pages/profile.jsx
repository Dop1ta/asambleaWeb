import { useEffect, useState } from 'react'
import { Box, Card, CardBody, CardHeader, Container, Heading, Stack, Text, StackDivider, SimpleGrid, CardFooter, Button } from '@chakra-ui/react'
import axios from 'axios'
import NavTab from '../components/NavTab'
import { useRouter } from 'next/router'
import { EditIcon } from '@chakra-ui/icons'
import Cookies from 'js-cookie'
import Head from 'next/head'

const profile = () => {

    const [user, setUser] = useState([])

    const router = useRouter()

    const getUser = async () => {
        const response = await axios.get(`${process.env.API_URL}/getUsers/rut/${Cookies.get('rut')}`)
        setUser(response.data)
    }

    const showUser = () => {
        if(user.rut === '0.000.000-0') {
            return null
        } else {
            return (
                <Card backgroundColor={'white'} align={'center'} minW='md'>
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
                        <Button colorScheme={'blue'} leftIcon={<EditIcon/>} onClick={() => router.push(`/updateprofile/${user._id}`)}>Editar</Button>
                    </CardFooter>
                </Card>
            )
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <Stack alignItems={"center"} textAlign={'center'} backgroundColor={"rgb(244,247,254)"}>
            <Head>
                <title>Perfil</title>
            </Head>
            <NavTab/>
            <Container maxW="container.md" my={4}>
                <Heading textAlign={"center"} my={4}>Perfil</Heading>
                <Stack alignItems={'center'}>
                    {showUser()}
                </Stack>
            </Container>
        </Stack>
    )
}

export default profile