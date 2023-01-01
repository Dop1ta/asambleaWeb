import { useEffect, useState } from 'react'
import { Card, CardBody, Heading, Stack, Text, SimpleGrid, Button, Textarea } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'

const comment = (cid) => {

    const [user, setUser] = useState([])

    const getUser = async () => {
        const response = await axios.get(`${process.env.API_URL}/getUsers/rut/${Cookies.get('rut')}`)
        setUser(response.data)
    }

    const [ comment, setComment ] = useState({
        username: user.name,
        comment: '',
        userid: user._id,
        activityid: cid,
    })

    const [ comments, setComments ] = useState([])

    const router = useRouter()

    const addComment = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${process.env.API_URL}/createForo/${user._id}/${cid}`)
            console.log(response)
            if(response.status === 201) {
                Swal.fire({
                    title: 'Comentario',
                    text: 'Se ha comentado correctamente',
                    icon: 'success',
                    confirmButtonText: 'Continuar'
                }).then((result) => {
                    if(result.isConfirmed) {
                        router.reload()
                    }
                })
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Error al comentar',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }
        } catch (err) {
            Cookies.set('logged', 'false')
            Swal.fire({
                title: 'Error',
                text: 'Error al comentar',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    }

    const getComments = async () => {
        const response = await axios.get(`${process.env.API_URL}/getForo/${cid}`)
        setComments(response.data)
    }

    const showComments = () => {
        return comments.map(comments => {
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

    const onChange = (e) => {
        setComment({
            ...comment,
            [e.target.name]: e.target.value
        })
        console.log(comment.comment)
    }

    useEffect(() => {
        getComments()
        getUser()
    }, [])

    return (
        <Stack my={4}>
            <Textarea placeholder='Agregar un comentario' name='comment' onChange={onChange}/>
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