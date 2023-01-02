import { useState, useEffect } from 'react'
import axios from 'axios'
import { Stack, Title, Card, Text, CardHeader, Heading, CardBody, SimpleGrid, Container } from '@chakra-ui/react'

const showA = () => {

  const [asambleaget, setAsambleas] = useState([])

  const getAsambleas = async () => {
    try {
      const response = await axios.get(`${process.env.API_URL}/getMeetings`)
      console.log(response.data)
      setAsambleas(response.data)
    } catch (error) {
      console.log('===============>ta malo')
    }
  }

  const getA = () => {
    console.log('=============================', asambleaget.length)
    if (asambleaget.length === 0) {
      return (
        <Card boxShadow='lg' margin={30} alignItems='center' borderRadius={20} backgroundColor={"white"}>
          <CardHeader>
            <Heading size='md'>Sin Asambleas</Heading>
          </CardHeader>
          <CardBody>
            <Text>Lamentablemente no se encontro ninguna asamblea agendada, para poder agendar nuevas reunion tiene que cambiar a la vista de administrador</Text>
          </CardBody>
        </Card>
      )
    } else {
      return asambleaget.map(asambleas => {
        return (
          <Card key={asambleas._id} boxShadow='lg' margin={30} alignItems='center' borderRadius={10} backgroundColor={"white"}>
            <CardHeader textAlign={'center'}>
              <Heading size='md'>{asambleas.name}</Heading>
              <Text>Dia: {asambleas.time}</Text>
              <Text>Hora: {asambleas.hour}</Text>
              <Text>{asambleas.description}</Text>
            </CardHeader>
          </Card >
        )
      }).reverse()
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