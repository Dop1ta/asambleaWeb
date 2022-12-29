import { useState } from 'react'
import axios from 'axios'
import NavTabAdmin from '../../components/NavTabAdmin'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import {
  FormControl,
  FormLabel,
  Input,
  Container,
  Stack,
  Textarea,
  Button,
  ButtonGroup,
} from '@chakra-ui/react'

export default function CrearA() {

  let [values, setAsamblea] = useState({
    name: '',
    time: '',
    hour: '',
    place: '',
    description: '',
  })

  const router = useRouter()

  const backAsambleas = () => {
    router.push('/asambleas')
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const [time, hour] = values.time.split('T')
      values.time = time
      values.hour = hour
      const response = await axios.post(`${process.env.API_URL}/createMeeting/639a48dffe299c865e0ea1f9`, values)
      if (response.status === 201) {
        Swal.fire({
          title: 'Producto creado',
          text: 'El producto se ha creado correctamente',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.isConfirmed) {
            router.push('/asambleas')
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
      Swal.fire({
        title: 'Error',
        text: 'Ha ocurrido un error',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  }

  const onChange = (e) => {
    setAsamblea({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Stack alignItems={'center'} textAlign={'center'} backgroundColor={"rgb(244,247,254)"} h="100hv">
      <NavTabAdmin />
      <Container backgroundColor={'white'} borderRadius={10} boxShadow={'xl'}>
        <FormControl isRequired marginTop={4}>
          <FormLabel>Nombre de la asamblea</FormLabel>
          <Input placeholder='Ejemplo: Asamblea para perritos' type="text" onChange={onChange} name={"name"} />
        </FormControl>
        <FormControl isRequired marginTop={4}>
          <FormLabel>Fecha y hora</FormLabel>
          <Input
            placeholder="Select Date and Time"
            size="md"
            type="datetime-local"
            onChange={onChange}
            name={"time"}
          />
        </FormControl>
        <FormControl isRequired marginTop={4}>
          <FormLabel>Lugar donde se realiza</FormLabel>
          <Input placeholder='Ejemplo: Lota' type={"text"} onChange={onChange} name={"place"} />
        </FormControl>
        <FormControl isRequired marginTop={4}>
          <FormLabel>Descipcion</FormLabel>
          <Textarea placeholder='Ejemplo: La reunion sera de ayuda a los perritos' type={"text"} onChange={onChange} name={"description"} />
        </FormControl>
        <ButtonGroup variant='outline' spacing='6' marginTop={4} marginBottom={4}>
          <Button colorScheme='blue' onClick={onSubmit} type="submit">Guardar</Button>
          <Button colorScheme='red' onClick={backAsambleas} type="submit">Cancel</Button>
        </ButtonGroup>
      </Container>
    </Stack>
  )
}