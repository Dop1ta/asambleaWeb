import { useEffect, useState } from 'react'
import { Card, CardBody, Heading, Stack, Text, SimpleGrid, Button, Textarea, CardFooter, Container, StackDivider } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'
import { TrashIcon } from 'chakra-ui-ionicons'

const comment = (cid) => {

    const [user, setUser] = useState([])

    const getUser = async () => {
        const response = await axios.get(`${process.env.API_URL}/getUsers/rut/${Cookies.get('rut')}`)
        setUser(response.data)
    }

    const [comment, setComment] = useState({
        username: user.name,
        comment: '',
        userid: user._id,
        activityid: cid.cid,
    })

    const [comments, setComments] = useState([])

    const router = useRouter()

    const addComment = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${process.env.API_URL}/createForo/${user._id}/${cid.cid}`, comment)
            console.log(response)
            if (response.status === 201) {
                Swal.fire({
                    title: 'Comentario',
                    text: 'Se ha comentado correctamente',
                    icon: 'success',
                    confirmButtonText: 'Continuar'
                }).then((result) => {
                    if (result.isConfirmed) {
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
        const response = await axios.get(`${process.env.API_URL}/getForo/${cid.cid}`)
        setComments(response.data)
    }

    const deleteComment = (id) => {
        Swal.fire({
            title: 'Eliminar comentario',
            text: '¿Estas seguro?, esta acción no se puede deshacer',
            icon: 'warning',
            confirmButtonText: 'Eliminar',
            showCancelButton: true,
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                const response = axios.delete(`${process.env.API_URL}/getForo/deleteUser/${user._id}/${id}`)
                console.log(response.status)
                Swal.fire({
                    title: 'Comentario Eliminado',
                    text: 'El comentario se ha eliminado correctamente',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.reload()
                    }
                })
            }
        }).catch(e => {
            console.log(e)
        })
    }

    const showDelete = (idc, id) => {
        if (user._id !== idc) {
            return null
        } else {
            return <Button colorScheme={'red'} onClick={() => deleteComment(id)}>Eliminar</Button>
        }
    }

    const showComments = () => {
        return comments.map(comments => {
            if (Cookies.get('logged') === 'false') {
                return null
            } else {
                return (
                    <Card key={comments._id} minW={'sm'} variant={'filled'}>
                        <CardBody>
                            <Stack>
                                <Heading size={'md'}>{comments.username}</Heading>
                                <Text py={'2'}>{comments.comment}</Text>
                            </Stack>
                        </CardBody>
                        <CardFooter>
                            {showDelete(comments.userid, comments._id)}
                        </CardFooter>
                    </Card>
                )
            }
        }).reverse()
    }

    const onChange = (e) => {
        setComment({
            ...comment,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (Cookies.get('logged') === 'true') {
            getComments()
            getUser()
        }
    }, [])

    return (
        <Container my={4} centerContent>
            <Textarea placeholder='Agregar un comentario' name='comment' onChange={onChange} />
            <Stack direction={'row'} my={4}>
                <Button colorScheme={'blue'} onClick={addComment}>Comentar</Button>
                <Button onClick={() => router.reload()}>Cancelar</Button>
            </Stack>
            <SimpleGrid spacing={2}>
                {showComments()}
            </SimpleGrid>
        </Container>
    )
}

export default comment