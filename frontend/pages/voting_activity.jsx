import { Stack, Radio, RadioGroup, Button, Text, Box, SimpleGrid, Card, CardHeader, CardBody, Heading } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import Tab_votingActivity from '../components/Tab_votingActivity';
import axios from 'axios'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';


const voting_activity = () => {
  const [votingAct, setVotingAct] = useState([])

  const router = useRouter()

  const getVotingAct = async () => {
    try {
      const response = await axios.get(`${process.env.API_URL}/getVotingActivityByState/search/1`)
      console.log(response.data)
      setVotingAct(response.data)
    } catch (error) {
    }
  }

  useEffect(() => {
    getVotingAct()
  }, [])


  const closeVotingActivity = async (id) => {
    votingAct.state = '0'
    try {
        console.log(id)
        const response = await axios.put(`${process.env.API_URL}/closeVotingActivity/${id}/639a48dffe299c865e0ea1f9/`, votingAct.state)
        if (response.status === 201) {
            Swal.fire({
                title: 'Votación cerrada',
                text: 'La votación se ha cerrado correctamente.',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then((result) => {
                if (result.isConfirmed) {
                    router.push('/userview')
                }
            })
        }
    } catch (err) {
        Swal.fire({
            title: 'Error',
            text: 'No se ha podido cerrar la votación correctamente.',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }
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
      return votingAct.map(votingActs => {
        return (
          <Card key={votingActs._id}>
            <CardHeader>
              <Heading size='md'>{votingActs.name}</Heading>
              <Text>Fecha de inicio: {votingActs.startDate_vote}</Text>
              <Text>Fecha de caducidad: {votingActs.endDate_vote}</Text>
              <Button colorScheme="blue" size="md" type="sumbit" onClick={() => closeVotingActivity(votingActs._id)}>Cerrar Votación</Button>
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