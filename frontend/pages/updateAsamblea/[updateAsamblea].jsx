import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Button, Container, FormControl, FormLabel, Card, CardBody, Text, Textarea, Input, ButtonGroup, Stack } from '@chakra-ui/react'
import NavTabAdmin from '../../components/NavTabAdmin'
import Swal from 'sweetalert2'
import Head from 'next/head'

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

const Update = (data) => {
  const router = useRouter()

  const [Asamblea] = useState(data.data)
  const time = Asamblea.time + 'T' + Asamblea.hour

  let [values, setAsamblea] = useState({
    name: '',
    time: '',
    hour: '',
    place: '',
    description: '',
  })

  const onSubmit = async (e) => {
    e.preventDefault()

    for (const key in values) {
      if (values[key] === '') {
        values[key] = Asamblea[key]
      }
    }
    for (const key in values.time) {
      if (values.time[key] === 'T') {
        const [time, hour] = values.time.split('T')
        values.time = time
        values.hour = hour
      }
    }
    try {
      const response = await axios.put(`${process.env.API_URL}/getMeetings/update/${Asamblea._id}/639a48dffe299c865e0ea1f9`, values)
      if (response.status === 200) {
        Swal.fire({
          title: 'Asamblea modificada',
          text: 'La asamblea se ha modificado correctamente',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.isConfirmed) {
            router.push('/options/asambleasAdmin')
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
    <Stack alignItems={'center'} textAlign={'center'} backgroundColor={"rgb(244,247,254)"}>
      <Head>
        <title>Modificar Asamblea</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      <NavTabAdmin />
      <Card backgroundColor={'white'} borderRadius={10} boxShadow={'md'} >
        <CardBody>
          <Text textColor={'black'} fontWeight={'bold'} fontSize={20}>Modifique su Asamblea o Actividad</Text>
        </CardBody>
      </Card>
      <Container backgroundColor={'white'} borderRadius={10} boxShadow={'xl'}>
        <FormControl isRequired marginTop={4}>
          <FormLabel>Nombre de la asamblea</FormLabel>
          <Input type="text" name={"name"} defaultValue={Asamblea.name} onChange={onChange} />
        </FormControl>
        <FormControl isRequired marginTop={4}>
          <FormLabel>Fecha y hora</FormLabel>
          <Input
            size="md"
            type="datetime-local"
            defaultValue={time}
            name={"time"}
            onChange={onChange}
          />
        </FormControl>
        <FormControl isRequired marginTop={4}>
          <FormLabel>Lugar donde se realiza</FormLabel>
          <Input type={"text"} name={"place"} defaultValue={Asamblea.place} onChange={onChange} />
        </FormControl>
        <FormControl isRequired marginTop={4}>
          <FormLabel>Descipcion</FormLabel>
          <Textarea type={"text"} name={"description"} defaultValue={Asamblea.description} onChange={onChange} />
        </FormControl>
        <ButtonGroup variant='outline' spacing='6' marginTop={4} marginBottom={4}>
          <Button colorScheme='blue' type="submit" onClick={onSubmit}>Modificar</Button>
          <Button colorScheme='red' type="submit" onClick={() => router.push('/options/asambleasAdmin')}>Cancel</Button>
        </ButtonGroup>
      </Container>
    </Stack>
  )
}

export default Update