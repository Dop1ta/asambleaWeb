import { useEffect, useState } from 'react'
import { Box, Card, CardBody, CardHeader, Container, Heading, Stack, Text, StackDivider, SimpleGrid, CardFooter, Button } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'

export async function getServerSideProps(context) {
    try {
        const res = await axios.get(`${process.env.API_URL}/getForo/${context.params.comment}`)
        return {
        props: {
            data: res.data
        }
        }
    } catch (error) {
        return {
        redirect: {
            destination: '/',
            permanent: false
        }
        }
    }
}

const comment = () => {

    const comment = data.data

    const router = useRouter()

    return (
        <Card>
            <CardHeader>
                <Heading>{foro.name}</Heading>
            </CardHeader>
            <CardBody>

            </CardBody>
        </Card>
    )
}

export default comment