import {useState, useEffect} from 'react'
import { Stack, SimpleGrid, Card, Text, CardHeader, Heading, CardBody } from '@chakra-ui/react'
import Tab_votingActivity from '../components/Tab_votingActivity'
import axios from 'axios'

const view_voting = () => {

const [votingAct, setVotingAct] = useState([])

  const getVotingAct = async () => {
    try {
      const response = await axios.get(`${process.env.API_URL}/getAllVotingActivity`)
      setVotingAct(response.data)
    } catch (error) {
    }
  }

  useEffect(() => {
    getVotingAct()
  }, [])

  const showVotingAct = () => {

    if (votingAct.length === 0) {
      return (
        <Card boxShadow='lg' marginLeft={30} marginTop={4} variant='outline' overflow='hidden' alignItems='center' borderRadius={20} backgroundColor={"white"} width={'400px'}>
          <CardHeader>
            <Heading size='md'>Sin Resultados</Heading>
          </CardHeader>
          <CardBody>
            <Text>No hay resultados disponibles</Text>
          </CardBody>
        </Card>
      )
    } else {
      return votingAct.map(votingActs => {
        return (
          <Card key={votingActs._id} boxShadow='lg' marginLeft={30} marginTop={4} variant='outline' overflow='hidden' alignItems='center' borderRadius={20} backgroundColor={"white"}>
            <CardHeader textAlign={'center'}>
              <Heading size='md'>{votingActs.name}</Heading>
              <Text>Fecha de Inicio: {votingActs.startDate_vote}</Text>
              <Text>Fecha de Finalización: {votingActs.endDate_vote}</Text>
              <Text>Ganador: {votingActs.ganador}</Text>
            </CardHeader>
          </Card >
        )
      })
    }
  }
  return (
    <Stack alignItems={"center"} textAlign={'center'} backgroundColor={"rgb(244,247,254)"}>
      <Tab_votingActivity />
      <SimpleGrid columns={3}>
        {showVotingAct()}
      </SimpleGrid>
    </Stack>
  )
}

export default view_voting