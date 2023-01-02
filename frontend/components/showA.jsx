import { useState, useEffect } from 'react'
import axios from 'axios'
import { Stack, Title, Card, Text, CardHeader, Heading, CardBody, Box, Container } from '@chakra-ui/react'
import Comment from './comment'
import Cookies from 'js-cookie'

const showA = () => {

  const [asambleaget, setAsambleas] = useState([])

  const getAsambleas = async () => {
    try {
      const response = await axios.get(`${process.env.API_URL}/getMeetings`)
      setAsambleas(response.data)
    } catch (error) {
      console.log('===============>ta malo')
    }
  }

  const getA = () => {
    if (asambleaget.length === 0) {
      return (
        <Card boxShadow='lg' margin={30} alignItems='center' width={'400px'} borderRadius={20} backgroundColor={"white"}>
          <CardHeader>
            <Heading size='md'>Sin Asambleas</Heading>
          </CardHeader>
          <CardBody>
            <Text>Lamentablemente no se encontro ninguna asamblea agendada, para poder agendar nuevas reunion tiene que cambiar a la vista de administrador</Text>
          </CardBody>
        </Card>
      )
    } else {

      const objetFinal = asambleaget[asambleaget.length - 1]
      return (
        <Card boxShadow='lg' margin={30} alignItems='center' width={'400px'} borderRadius={10} backgroundColor={"white"}>
          <CardHeader textAlign={'center'}>
            <Heading size='md'>{objetFinal.name}</Heading>
            <Text>Dia: {objetFinal.time}</Text>
            <Text>Hora: {objetFinal.hour}</Text>
            <Text>{objetFinal.description}</Text>
          </CardHeader>
          <Box>
            {Cookies.get('logged') === 'true' ? <Comment cid={objetFinal._id} /> : null}
          </Box>
        </Card >
      )
    }
  }

  useEffect(() => {
    getAsambleas()
  }, [])

  return (
    <Stack >
      {getA()}
    </Stack>
  )
}

export default showA