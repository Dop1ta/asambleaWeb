import { useState, useEffect } from 'react'
import { Stack, SimpleGrid, Card, Button, Text, CardHeader, Heading, CardBody, CardFooter } from '@chakra-ui/react'
import NavTab from '../components/NavTab'
import axios from 'axios'
import { TrashIcon } from 'chakra-ui-ionicons'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

const Asambleas = () => {

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
    try {
      const responde = await axios.delete(`${process.env.API_URL}/getMeetings/delete/${id}/639a48dffe299c865e0ea1f9`)

      if (responde.status === 200) {
        Swal.fire({
          title: 'Producto Eliminado',
          text: 'El producto se ha creado correctamente',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.isConfirmed) {
            router.reload()
          }
        })
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Ha ocurrido un error',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }

    } catch (error) {
      console.log(error)
    }
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
          <SimpleGrid columns={3} key={asambleas._id} >
            <Card boxShadow='lg' marginLeft={30} marginTop={4} variant='outline' overflow='hidden' alignItems='center' borderRadius={20} backgroundColor={"white"}>
              <CardHeader textAlign={'center'}>
                <Heading size='md'>{asambleas.name}</Heading>
                <Text>Dia: {asambleas.time}</Text>
                <Text>Hora: {asambleas.hour}</Text>
                <Text>{asambleas.description}</Text>
                <Button leftIcon={<TrashIcon />} colorScheme='red' variant='solid' marginTop={3} onClick={() => deleteId(asambleas._id)} >Eliminar</Button>
              </CardHeader>
            </Card >
          </SimpleGrid>
        )
      }).reverse()
    }
  }

  return (
    <Stack alignItems={"center"} textAlign={'center'} backgroundColor={"rgb(244,247,254)"}>
      <NavTab />
      {showAsambleas()}
    </Stack>
  )
}

export default Asambleas