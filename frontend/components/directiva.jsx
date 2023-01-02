import { useEffect, useState } from 'react'
import { Box, Card, Heading, Stack, Text, CardHeader, CardBody, StackDivider } from '@chakra-ui/react'
import axios from 'axios'

const directiva = () => {

    const [users, setUsers] = useState([])

    const getUsers = async () => {
        const response = await axios.get(`${process.env.API_URL}/getUsersAll`)
        setUsers(response.data)
    }

    const showUsers = () => {
        return users.map(user => {
            if(user.rol === 'Vecino') {
                return null
            } else {
                return (
                    <Box key={user._id}>
                        <Heading size='xs' textTransform='uppercase'>{user.rol}</Heading>
                        <Text pt='2' fontSize='sm'>{user.name}</Text>
                    </Box>
                )
            }
        })
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <Card>
            <CardHeader>
                <Heading size='md'>Directiva</Heading>
            </CardHeader>

            <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                    {showUsers()}
                </Stack>
            </CardBody>
        </Card>
    )
}

export default directiva