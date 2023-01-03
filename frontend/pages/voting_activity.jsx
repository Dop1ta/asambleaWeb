import { Stack, Radio, RadioGroup, Button, Text, Box, SimpleGrid, Card, CardHeader, CardBody, Heading } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import Tab_votingActivity from '../components/Tab_votingActivity';
import axios from 'axios'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';


const voting_activity = () => {
  const [votingAct, setVotingAct] = useState([])

  const router = useRouter()

  const getVotingAct = async () => {
    try {
      const response = await axios.get(`${process.env.API_URL}/getVotingActivityByState/search/1`)
      setVotingAct(response.data)
    } catch (error) {
    }
  }

  useEffect(() => {
    getVotingAct()
  }, [])

  const castAVote = (id) => {
    router.push(`/vote/${id}`)
  }
  const showVotingActs = () => {
    if (votingAct.length === 0) {
      return (
        <Card boxShadow='lg' marginLeft={30} marginTop={4} variant='outline' overflow='hidden' alignItems='center' borderRadius={20} backgroundColor={"white"} width={'400px'}>
          <CardHeader>
            <Heading size='md'>Sin Votaciones Activas</Heading>
          </CardHeader>
          <CardBody>
            <Text>No puedes votar hasta que se agende una nueva votación</Text>
          </CardBody>
        </Card>
      )
    } else {
      console.log(votingAct)
      return votingAct.map(votingActs => {
        return (
          <Card key={votingActs._id}>
            <CardHeader>
              <Heading size='md'>{votingActs.name}</Heading>
              <Text>Fecha de inicio: {votingActs.startDate_vote}</Text>
              <Text>Fecha de caducidad: {votingActs.endDate_vote}</Text>
              <Button colorScheme="blue" size="md" type="sumbit" onClick={() => castAVote(votingActs._id)}>Abrir votación</Button>
            </CardHeader>
          </Card>
        )
      })
    }
  }
  return (
    <Stack alignItems={"center"} textAlign={'center'} backgroundColor={"rgb(244,247,254)"}>
      <Tab_votingActivity />
      <SimpleGrid columns={3}>
        {showVotingActs()}
      </SimpleGrid>
    </Stack>
  )
}

export default voting_activity