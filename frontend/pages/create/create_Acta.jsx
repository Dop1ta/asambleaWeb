import { useState } from 'react'
import { Button, Container, FormControl, FormLabel, Heading, Textarea, Input, ButtonGroup, Stack } from '@chakra-ui/react'
import axios from 'axios'
import NavTab from '../../components/NavTab'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

const create_Acta = () => {

    const [values, setActas] = useState({
        name: '',
        description: '',
        date: ''
    })

    const router = useRouter()

    const actaRouter = () => {
        router.push('/Acta')
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(values)
        try {
            const response = await axios.post(`${process.env.API_URL}/createActa/639a48dffe299c865e0ea1f9`, values)
            console.log(response)
            if(response.status === 201) {
                Swal.fire({
                    title: 'Acta Creada',
                    text: 'Acta creada correctamente',
                    icon: 'success',
                    confirmButtontext: 'ok'
                })
            }else{
                Swal.fire({
                    title: 'Error',
                    text: 'Error al ingresar parametros',
                    icon: 'error',
                    confirmButtontext: 'ok'
                })
            }
        }catch (err) {
            Swal.fire({
                title: 'Error',
                text: 'La acta no se ha podido crear',
                icon: 'error',
                confirmButtontext: 'ok'
            })
        }
    }

    const onChange = (e) => {
        setActas({
            ...values,
            [e.target.name]: e.target.value,
        })
    }

    return(
        <Stack alignItems={'center'} textAlign={'center'} backgroundColor={"rgb(244,247,254)"}>
            <NavTab/>
            <Container maxW="container.md" centerContent>
                <Heading textAlign={"center"} my={4}>Creacion de Acta</Heading>
                <Stack my={4}>
                    <FormControl>
                        <FormLabel>Nombre Acta</FormLabel>
                        <Input placeholder='Ej: Acta Caridad Vecinos' type={"text"} onChange={onChange} name={"name"} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Descripción</FormLabel>
                        <Textarea placeholder='Ej: Reunion para organizacion de la caridad anual de vecinos' type={"text"} onChange={onChange} name={"description"} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Fecha</FormLabel>
                        <Input placeholder="Seleccione fecha" size="md" type="date-local" onChange={onChange} name={"date"} />
                    </FormControl>
                    <Stack>
                        <ButtonGroup variant='outline' spacing='6'>
                            <Button colorScheme={'blue'} onClick={onSubmit}>Crear</Button>
                            <Button colorScheme={'red'} onClick={actaRouter}>Cancelar</Button>
                        </ButtonGroup>
                    </Stack>
                </Stack>
            </Container>
        </Stack>
    )
}

export default create_Acta