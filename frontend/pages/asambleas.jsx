import { useState, useEffect } from 'react'
import { Stack, SimpleGrid, Card, CardBody, Text, CardHeader, Heading } from '@chakra-ui/react'
import NavTab from '../components/NavTab'
import axios from 'axios'

const Asambleas = () => {

  const [asamblea, setAsambleas] = useState([])

  const getAsambleas = async () => {
    const response = await axios.get(`${process.env.API_URL}/getMeetings`)
    setAsambleas(response.data)
  }

  useEffect(() => {
    getAsambleas()
  }, [])

  const showAsambleas = () => {
    return asamblea.map(asambleas => {
      return (
        <Card key={asambleas._id} boxShadow='lg' marginLeft={30} marginTop={4} variant='outline' overflow='hidden' alignItems='center' borderRadius={20} backgroundColor={"white"}>
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

  return (
    <Stack alignItems={"center"} backgroundColor={"rgb(244,247,254)"}>
      <NavTab />
      <SimpleGrid columns={3}>
        {showAsambleas()}
      </SimpleGrid >
    </Stack>
  )
}

export default Asambleas