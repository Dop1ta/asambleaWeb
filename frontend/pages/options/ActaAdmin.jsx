import { useState, useEffect } from 'react'
import { Stack, SimpleGrid, Card, Button, Text, CardHeader, Heading } from '@chakra-ui/react'
import NavTabAdmin from '../../components/NavTabAdmin'
import axios from 'axios'
import { TrashIcon } from 'chakra-ui-ionicons'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { EditIcon, AiOutlinePlus } from '@chakra-ui/icons'


const ActaAdmin = () => {

    const [Actas, setActas] = useState([])

    const router = useRouter()

    const getActa = async () => {
        try {
            const response = await axios.get(`${process.env.API_URL}/getActas`)
            setActas(response.data)
        } catch (error) {
        }
    }

    useEffect(() => {
        getActa()
    }, [])

    const deleteId = async (id) => {
        try {
            Swal.fire({
                title: 'Estas seguro?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borrarlo!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Eliminado!',
                        'Reunion eliminada.',
                        'OK'
                    ).then((result) => {
                        if (result.isConfirmed) {
                            axios.delete(`${process.env.API_URL}/getActas/delete/${id}`)
                            router.reload()
                        }
                    })
                }
            })
        } catch (err) {

        }
    }

    const updateActa = (id) => {
        router.push(`/updateActa/${id}`)
    }

    const showActas = () => {
        try {
            return Actas.map(Actap => {
                return (
                    <Card key={Actap._id} boxShadow='lg' ml={30} my={4} variant='outline' overflow='hidden' alignItems='center' borderRadius={20} backgroundColor={"white"}>
                        <CardHeader>
                            <Heading size='md'>{Actap.name}</Heading>
                            <Text>{Actap.description}</Text>
                            <Text>{Actap.date}</Text>
                            <Button leftIcon={<EditIcon />} colorScheme='blue' variant='solid' margin={4} onClick={() => updateActa(Actap._id)} >Editar</Button>
                            <Button leftIcon={<TrashIcon />} colorScheme='red' variant='solid' margin={4} onClick={() => deleteId(Actap._id)} >Eliminar</Button>
                        </CardHeader>
                    </Card >
                )
            })
        } catch (error) {

        }
    }

    const creatShow = () => {
        router.push('/create/create_Acta')
    }

    return (
        <Stack alignItems={'center'} textAlign={'center'} backgroundColor={"rgb(244,247,254)"}>
            <Head>
                <title>Acta vista administrador</title>
            </Head>
            <NavTabAdmin />
            <Stack my={4}>
                <Button backgroundColor={'white'} lefticon={<AiOutlinePlus />} onClick={() => creatShow()} size='md'>Crear Acta</Button>
            </Stack>
            <SimpleGrid columns={3}>
                {showActas()}
            </SimpleGrid>
        </Stack>
    )
}

export default ActaAdmin