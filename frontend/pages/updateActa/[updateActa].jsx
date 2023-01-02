import { useState } from 'react'
import { useRouter } from 'next/router'
import NavTabAdmin from '../../components/NavTabAdmin'
import axios from 'axios'
import { Button, Container, FormControl, Card, CardBody, Input, Stack, FormLabel, ButtonGroup, Text } from '@chakra-ui/react'
import Swal from 'sweetalert2'

export async function getServerSideProps(context) {
    try {
        const res = await axios.get(`${process.env.API_URL}/getActas/search/${context.params.updateActa}`)
        return {
            props: {
                data: res.data
            }
        }
    } catch (error) {
        return {
            redirect: {
                destination: '/create/create_Acta',
                permanet: false
            }
        }
    }
}

const updateActa = (data) => {

    const router = useRouter()

    const [Actau] = useState(data.data)

    let [values, setActas] = useState({
        name: '',
        description: '',
        date: '',
    })

    const onSubmit = async (e) => {
        e.preventDefault()

        for (const key in values) {
            if (values[key] === '') {
                values[key] = Actau[key]
            }
        }

        try {
            const response = await axios.put(`${process.env.API_URL}/getActas/update/${Actau._id}`, values)
            if (response.status === 200) {
                Swal.fire({
                    title: 'Acta Actualizada',
                    text: 'El acta se ha modificado correctamente',
                    icon: 'success',
                    confimButtinText: 'Ok'
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.push('/options/ActaAdmin')
                    }
                })
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Error al ingresar los nuevos parametros',
                    icon: 'error',
                    confimButtonText: 'Ok'
                })
            }
        } catch {
            Swal.fire({
                title: 'Error',
                text: 'No se ha podido actualizar el Acta',
                icon: 'error',
                confirmButonText: 'Ok'
            })
        }
    }
    const onChange = (e) => {
        setActas({
            ...values,
            [e.target.name]: e.target.value,
        })
    }

    const deletef = axios.put(`${process.env.API_URL}/file/delete/${Actau.idacta}`)

    return (
        <Stack alignItems={'center'} textAlign={'center'} backgroundColor={"rgb(244,247,254"}>
            <NavTabAdmin />
            <Card backgroundColor={'white'} bordeusRadius={10} boxShadow={'md'}>
                <CardBody>
                    <Text textColor={'black'} fontWeight={'bold'} fontSize={20}>Modifique el Acta</Text>
                </CardBody>
            </Card>
            <Container maxW="container.md" centerContent>
                <Stack my={4}>
                    <FormControl>
                        <FormLabel>Nombre</FormLabel>
                        <Input type="text" name={"name"} defaultValue={Actau.name} onChange={onChange} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Descripción</FormLabel>
                        <Input type="text" name={"description"} defaultValue={Actau.description} onChange={onChange} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Fecha</FormLabel>
                        <Input type="Date" name={"date"} defaultValue={Actau.date} onChange={onChange} />
                    </FormControl>
                    <FormControl>
                    <Button coloScheme={'red'} onClick={() => deletef()}>Eliminar</Button>
                    </FormControl>
                    <Stack>
                        <ButtonGroup variant='outline' spacing='6' my={4} mb={4}>
                            <Button coloScheme={'blue'} onClick={onSubmit}>Actualizar</Button>
                            <Button coloScheme={'red'} onClick={() => router.push('/options/ActaAdmin')}>Cancelar</Button>
                        </ButtonGroup>
                    </Stack>
                </Stack>
            </Container>
        </Stack>
    )
}

export default updateActa