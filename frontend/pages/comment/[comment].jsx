import { useEffect, useState } from 'react'
import { Box, Card, CardBody, CardHeader, Container, Heading, Stack, Text, StackDivider, SimpleGrid, CardFooter, Button, Textarea } from '@chakra-ui/react'
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

    const addComment = () => {
        
    }

    const showComments = () => {
        return comment.map(comments => {
            return (
                <Card>
                    <CardBody>
                        <Heading>{comments.username}</Heading>
                        <Text>{comments.comment}</Text>
                    </CardBody>
                </Card>
            )
        })
    }

    return (
        <Stack my={4}>
            <Textarea placeholder='Agregar un comentario'/>
            <Stack direction={'row'}>
                <Button onClick={addComment}>Comentar</Button>
                <Button onClick={() => router.reload()}>Cancelar</Button>
            </Stack>
            <SimpleGrid>
                {showComments()}
            </SimpleGrid>
        </Stack>
    )
}

export default comment