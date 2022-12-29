import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Button, Container, FormControl, FormLabel, Heading, Textarea, Input, ButtonGroup, Stack } from '@chakra-ui/react'
import NavTabAdmin from '../../components/NavTabAdmin'

export async function getServerSideProps(context) {
  try {
    const res = await axios.get(`${process.env.API_URL}/getMeetings/search/${context.params.updateAsamblea}`)
    return {
      props: {
        data: res.data
      }
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/create/crearAsamblea',
        permanent: false
      }
    }
  }
}

// api.put("/getMeetings/update/:id/:idadmin", meetingController.updateMeeting);
// api.get("/getMeetings/search/:id", meetingController.getMeetingById);

const Update = (data) => {
  const router = useRouter()

  const [Asamblea] = useState(data)

  return (
    <Stack alignItems={'center'} textAlign={'center'} backgroundColor={"rgb(244,247,254)"}>
      <NavTabAdmin />
      <Container backgroundColor={'white'} borderRadius={10} boxShadow={'xl'}>
        <FormControl isRequired marginTop={4}>
          <FormLabel>Nombre de la asamblea</FormLabel>
          <Input placeholder='Ejemplo: Asamblea para perritos' type="text" name={"name"} />
        </FormControl>
        <FormControl isRequired marginTop={4}>
          <FormLabel>Fecha y hora</FormLabel>
          <Input
            placeholder="Select Date and Time"
            size="md"
            type="datetime-local"

            name={"time"}
          />
        </FormControl>
        <FormControl isRequired marginTop={4}>
          <FormLabel>Lugar donde se realiza</FormLabel>
          <Input placeholder='Ejemplo: Lota' type={"text"} name={"place"} />
        </FormControl>
        <FormControl isRequired marginTop={4}>
          <FormLabel>Descipcion</FormLabel>
          <Textarea placeholder='Ejemplo: La reunion sera de ayuda a los perritos' type={"text"} name={"description"} />
        </FormControl>
        <ButtonGroup variant='outline' spacing='6' marginTop={4} marginBottom={4}>
          <Button colorScheme='blue' type="submit">Guardar</Button>
          <Button colorScheme='red' type="submit">Cancel</Button>
        </ButtonGroup>
      </Container>
    </Stack>
  )
}

export default Update