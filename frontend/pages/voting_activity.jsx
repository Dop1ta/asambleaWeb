import { Stack, Radio, RadioGroup,Button, Text, Box, SimpleGrid, Card, CardHeader, CardBody, Heading} from '@chakra-ui/react'
import {useState, useEffect} from 'react'
import Tab_votingActivity from '../components/Tab_votingActivity';
import axios from 'axios'



const voting_activity = () => {
  const [votingAct, setVotingAct] = useState([])

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

  const getNameByRuts = async(rut) => {
    try{
      return await axios.get(`${process.env.API_URL}/getUsers/rut/${rut}`)

    }catch(error){
      return{
        redirect: {
            destination: '',
            permanet: false
      }
  }
  }
  }

  let [values, setTargetVote] = useState({
    rut_v: '',
    name_v: ''
  })

  const onSumbit = async (e) => {
    e.preventDefault()
        try {
          console.log(values)
          const response = await axios.post(`${process.env.API_URL}/createTargetVote/${User._id}`, values)
          if (response.status === 201) {
            Swal.fire({
              title: 'Producto creado',
              text: 'El producto se ha creado correctamente',
              icon: 'success',
              confirmButtonText: 'Ok'
            }).then((result) => {
              if (result.isConfirmed) {
                router.push('/voting_activity')
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
        setTargetVote({
          ...values,
          [e.target.name]: e.target.value,
        })
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
                  <Stack key={votingActs._id}>
                  <Box as="span" flex='1' textAlign='left'>Votación Presidencia</Box>
                  <RadioGroup>
                        <Stack direction='row'>
                            <Radio value={votingActs.rut1} name='rut_v' onChange={onChange}>{getNameByRuts(votingActs.rut1)}</Radio>
                            <Radio value={votingActs.rut2} name='rut_v' onChange={onChange}>{getNameByRuts(votingActs.rut2)}</Radio>
                            <Radio value={votingActs.rut3} name='rut_v' onChange={onChange}>{getNameByRuts(votingActs.rut3)}</Radio>
                            <Radio value={votingActs.rut4} name='rut_v' onChange={onChange}>{getNameByRuts(votingActs.rut4)}</Radio>
                            <Button colorScheme="blue" size="md"type="sumbit" onClick={onSumbit}>Guardar Voto</Button>
                        </Stack>
                    </RadioGroup>
                  </Stack>
      )
    }).reverse()
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