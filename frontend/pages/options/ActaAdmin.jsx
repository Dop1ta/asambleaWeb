import { useState, useEffect } from 'react'
import { Stack, Button, Text, Card, CardHeader, Heading, SimpleGrid} from '@chakra-ui/react'
import axios from 'axios'
import { AiOutlinePlus } from "react-icons/md"
import { useRouter } from 'next/router'
import NavTabAdmin from '../components/NavTabAdmin'
import Swal from 'sweetalert2'
import { EditIcon,TrashIcon } from 'chakra-ui-ionicons'

const Acta = () => {

    const [Actas, setActas] = useState([])

    const router = useRouter()

    const getActa = async () => {
        const response = await axios.get(`${process.env.API_URL}/getActa/639a48dffe299c865e0ea1f9`)
        setActas(response.data)
    }

    useEffect(() => {
        getActa()
    }, [])

    const createActa = () => {
        router.push('/create/create_Acta')
    }


    const deleteActa = async (id) => {
        Swal.fire({
            title: 'Estas seguro de eliminar el acta?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Borrar'
        }).then((result) =>{
            if (result.isconfimed) {
                Swal.fire(
                    'Acta Eliminada',
                    'Ok'
                ).then((result) => {
                    if (result.isConfirmed) {
                        axios.delete(`${process.env.API_URL}/getActa/delete/${id}/639a48dffe299c865e0ea1f9`)
                        router.reload()
                    }
                })
            }
        })
    }

    const showActas = () => {
        return Actas.map(Actap => {
            return(
                <Card key={Actap._id} boxShadow='lg' ml={30} my={4} variant='outline' overflow='hidden' alignItems='center' borderRadius={20} backgroundColor={"white"}>
                    <CardHeader>
                        <Heading size='md'>{Actap.name}</Heading>
                        <Text>{Actap.description}</Text>
                        <Text>{Acta.date}</Text>
                        <Button leftIcon={<EditIcon/>} colorScheme= 'blue' variant='solid' margin={4} onClick={() => router.push(`/updateActa/${Actap._id}`)} >Editar</Button>
                        <Button leftIcon={<TrashIcon/>} colorScheme= 'red' variant='solid' margin={4} onClick={() => deleteid(Acta._id)} >Eliminar</Button>
                    </CardHeader>
                </Card>
            )
        })
    }

    return (
        <Stack alignItems={'center'} textAlign={'center'} backgroundColor={"rgb(244,247,254)"}>
            <NavTabAdmin/>
            <Heading textAlign={'center'} ml={30} my={4}>Actas</Heading>
            <Stack ml={30} my={4}>
                <Button lefticon={<AiOutlinePlus/>} onClick={createActa} size='md'>Crear Acta</Button>
            </Stack>
            <SimpleGrid>
                {showActas()}
            </SimpleGrid>
        </Stack>
    )
}

export default ActaAdmin