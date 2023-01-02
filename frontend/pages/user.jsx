import { useEffect, useState } from 'react'
import { Container, Heading, Input, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import axios from 'axios'
import NavTab from '../components/NavTab'
import Head from 'next/head'

const user = () => {

    const [users, setUsers] = useState([])

    const getUsers = async () => {
        const response = await axios.get(`${process.env.API_URL}/getUsersAll`)
        setUsers(response.data)
    }

    const showUsers = () => {
        return users.map(user => {
            if(user.rut === '0.000.000-0') {
                return null
            } else {
                return (
                    <Tr key={user._id}>
                        <Td>{user.name}</Td>
                    </Tr>
                )
            }
        })
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <Stack alignItems={"center"} textAlign={'center'} backgroundColor={"rgb(244,247,254)"}>
            <Head>
                <title>Lista de usuarios</title>
            </Head>
            <NavTab/>
            <Container maxW="container.md">
                <Heading textAlign={"center"} my={4}>Vecinos</Heading>
                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>Nombre</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {showUsers()}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Container>
        </Stack>
    )
}

export default user