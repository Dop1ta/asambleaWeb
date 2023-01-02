import { Container, Stack, Radio, RadioGroup,Button, useToast, Text, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box} from '@chakra-ui/react'
import React from 'react'
import Tab_votingActivity from '../components/Tab_votingActivity';

export async function getServerSideProps(context){
  try{
      const res = await axios.get(`${process.env.API_URL}/getVotingActivityByState/search/1`)
      return{
          props: {
              data: res.data
          }
      }
  }catch (error){
      return{
          redirect: {
              destination: '',
              permanet: false
          }
      }
  }
}


const voting_activity = (data) => {
  const router = useRouter()

  const [User] = useState(data.data)

  let [values, setUser] = useState({
    votos: '',
  })

  const onSumbit = async (e) => {
    e.preventDefault()

    for (const key in values) {
      if (values[key] === '') {
        values[key] = User[key]
      }
    }
    for (const key in values.time) {
      if (values.time[key] === 'T') {
        const [time, hour] = values.time.split('T')
        values.time = time
        values.hour = hour
      }
    }

    console.log(values)

    try {
      const response = await axios.put(`${process.env.API_URL}/updateUserVote/${User._id}/639a48dffe299c865e0ea1f9`, values)
      if (response.status === 200) {
        Swal.fire({
          title: 'Voto emitido',
          text: 'Tu voto ha sido guardado correctamente',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.isConfirmed) {
            router.push('/view_voting')
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
    setUser({
      ...values,
      [e.target.name]: e.target.value,
    })
  }



    const toast = useToast();
    return (
        <Stack alignItems={"center"} backgroundColor={"rgb(244,247,254)"} >
        <Tab_votingActivity/>
        <Container maxW={"container.md"}>
              <Text as='b' fontSize='3xl'>Votar</Text>
              <Accordion allowToggle size={"xl"}>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex='1' textAlign='left'>Votación Presidencia</Box>
                    <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                  <RadioGroup alignItems onChange={onChange}>
                        <Stack direction='row'>
                            <Radio value='1'>NombreRut(votingActs.rut1)</Radio>
                            <Radio value='2'>{votingActs.rut2}</Radio>
                            <Radio value='3'>{votingActs.rut3}</Radio>
                            <Radio value='4'>{votingActs.rut4}</Radio>
                            <Button colorScheme="blue" size="md"type="sumbit" onClick={onSumbit}>Guardar Voto</Button>
                        </Stack>
                    </RadioGroup>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                    <Box as="span" flex='1' textAlign='left'>Votación Secretario</Box>
                    <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                  <RadioGroup>
                        <Stack direction='row'>
                            <Radio value='1'>{votingActs.rut1}</Radio>
                            <Radio value='2'>{votingActs.rut2}</Radio>
                            <Radio value='3'>{votingActs.rut3}</Radio>
                            <Radio value='4'>{votingActs.rut4}</Radio>
                            <Button colorScheme="blue" size="md"type="sumbit" onClick={() => toast({ title: "Has votado correctamente" })}>Guardar Voto</Button>
                        </Stack>
                    </RadioGroup>
                  </AccordionPanel>
                  </AccordionItem>
              </Accordion>
            </Container>
        </Stack>
    )
}

export default voting_activity