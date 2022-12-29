import { useState, useEffect } from 'react'
import { Stack, SimpleGrid, Card, Button, Text, CardHeader, Heading, CardBody, CardFooter } from '@chakra-ui/react'
import NavTabAdmin from '../../components/NavTabAdmin'
import axios from 'axios'
import { TrashIcon } from 'chakra-ui-ionicons'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

import { EditIcon } from '@chakra-ui/icons'

const AsambleaAdmin = () => {

  const [asamblea, setAsambleas] = useState([])

  const router = useRouter()

  const getAsambleas = async () => {
    try {
      const response = await axios.get(`${process.env.API_URL}/getMeetings`)
      setAsambleas(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteId = async (id) => {
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
            axios.delete(`${process.env.API_URL}/getMeetings/delete/${id}/639a48dffe299c865e0ea1f9`)
            router.reload()
          }
        })
      }
    })
  }

  const registrarA = () => {
    router.push('/create/crearAsamblea')
  }

  useEffect(() => {
    getAsambleas()
  }, [])

  const showAsambleas = () => {
    if (asamblea.length === 0) {
      return (
        <Card boxShadow='lg' marginLeft={30} marginTop={4} variant='outline' overflow='hidden' alignItems='center' borderRadius={20} backgroundColor={"white"}>
          <CardHeader>
            <Heading size='md'>Sin Asambleas</Heading>
          </CardHeader>
          <CardBody>
            <Text>Lamentablemente no se encontro ninguna asamblea agendada</Text>
          </CardBody>
          <CardFooter>
            <Button onClick={registrarA}>Crear una asamblea</Button>
          </CardFooter>
        </Card>
      )
    } else {
      return asamblea.map(asambleas => {
        return (
          <Card key={asambleas._id} boxShadow='lg' marginLeft={30} marginTop={4} variant='outline' overflow='hidden' alignItems='center' borderRadius={20} backgroundColor={"white"}>
            <CardHeader textAlign={'center'}>
              <Heading size='md'>{asambleas.name}</Heading>
              <Text>Dia: {asambleas.time}</Text>
              <Text>Hora: {asambleas.hour}</Text>
              <Text>{asambleas.description}</Text>
              <Button leftIcon={<EditIcon />} colorScheme='blue' variant='solid' margin={4} onClick={() => router.push(`/updateAsamblea/${asambleas._id}`)} >Editar</Button>
              <Button leftIcon={<TrashIcon />} colorScheme='red' variant='solid' margin={4} onClick={() => deleteId(asambleas._id)} >Eliminar</Button>
            </CardHeader>
          </Card >
        )
      }).reverse()
    }
  }

  return (
    <Stack alignItems={"center"} textAlign={'center'} backgroundColor={"rgb(244,247,254)"}>
      <NavTabAdmin />
      <SimpleGrid columns={3}>
        {showAsambleas()}
      </SimpleGrid>
    </Stack>
  )
}

export default AsambleaAdmin