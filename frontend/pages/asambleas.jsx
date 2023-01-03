import { useState, useEffect } from 'react'
import { Stack, SimpleGrid, Card, Text, CardHeader, Heading, CardBody, GridItem, Box } from '@chakra-ui/react'
import NavTab from '../components/NavTab'
import axios from 'axios'
import Head from 'next/head'

const Asambleas = () => {

  const [asamblea, setAsambleas] = useState([])

  const getAsambleas = async () => {
    try {
      const response = await axios.get(`${process.env.API_URL}/getMeetings`)
      setAsambleas(response.data)
    } catch (error) {
    }
  }

  useEffect(() => {
    getAsambleas()
  }, [])

  const showAsambleas = () => {

    if (asamblea.length === 0) {
      return (
        <Card boxShadow='lg' marginLeft={30} marginTop={4} variant='outline' overflow='hidden' alignItems='center' borderRadius={20} backgroundColor={"white"} width={'400px'}>
          <CardHeader>
            <Heading size='md'>Sin Asambleas</Heading>
          </CardHeader>
          <CardBody>
            <Text>Lamentablemente no se encontro ninguna asamblea agendada, para poder agendar nuevas reunion tiene que cambiar a la vista de administrador</Text>
          </CardBody>
        </Card>
      )
    } else {
      return asamblea.map(asambleas => {
        const dateA = asambleas.time + 'T' + asambleas.hour
        if (Date.parse(dateA) >= Date.now()) {
          return (
            <Card key={asambleas._id} boxShadow='lg' marginLeft={30} marginTop={4} variant='outline' overflow='hidden' alignItems='center' borderRadius={20} backgroundColor={"white"} width={'350px'}>
              <CardHeader textAlign={'center'}>
                <Heading size='md' margin={4}>{asambleas.name}</Heading>
                <Text>Dia: {asambleas.time}</Text>
                <Text>Hora: {asambleas.hour}</Text>
                <Text>{asambleas.description}</Text>
              </CardHeader>
            </Card >
          )
        }
      }).reverse()
    }
  }

  return (
    <Stack alignItems={"center"} textAlign={'center'} backgroundColor={"rgb(244,247,254)"} >
      <Head>
        <link rel="icon" href="/icon.png" />
        <title>Asambleas</title>
      </Head>
      <NavTab />
      <SimpleGrid columns={2} >
        {showAsambleas()}
      </SimpleGrid>

    </Stack >
  )
}

export default Asambleas