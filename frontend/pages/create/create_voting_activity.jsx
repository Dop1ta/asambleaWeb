import {useState} from 'react'
import {Button, Container, FormControl, FormLabel, Heading, Stack, Radio, RadioGroup, Input, useToast, Link} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import axios from 'axios'
import Tab_votingActivity from '../../components/Tab_votingActivity';

const create_voting_activity = () => {

    let [values, setVotingAct ] = useState({
        name: '',
        startDate_vote: '',
        endDate_vote: '',
        rut1: '',
        rut2: '',
        rut3: '',
        rut4: '',
      })
    
      const router = useRouter()
    
      const backVotingAct = () => {
        router.push('/voting_activity')
      }
    
      const onSubmit = async (e) => {
        e.preventDefault()
        try {
          console.log(values)
          const response = await axios.post(`${process.env.API_URL}/createVotingActivity/639a48dffe299c865e0ea1f9`, values)
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
        setVotingAct({
          ...values,
          [e.target.name]: e.target.value,
        })
      }

    return (
        <Stack alignItems={"center"} backgroundColor={"rgb(244,247,254)"}>
        <Tab_votingActivity/>
        <Container maxW="container.md" backgroundColor={'white'} borderRadius={10} boxShadow={'xl'}>
            <Heading textAlign={"center"} my={10}>Crear Votación</Heading>
            <Stack>
                <FormControl isRequired>
                    <FormLabel textAlign={'center'}>Cargo:</FormLabel>
                    <Input placeholder='Ejemplo: Presidente' type={"text"} onChange={onChange} name={"name"} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Fecha de Inicio</FormLabel>
                    <Input placeholder="Select Date and Time" size="md" type="datetime-local" onChange={onChange} name={"startDate_vote"}/>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Fecha de Termino</FormLabel>
                    <Input placeholder="Select Date and Time" size="md" type="datetime-local" onChange={onChange} name={"endDate_vote"}/>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Candidato 1 (Ingresar Rut)</FormLabel>
                    <Input placeholder="00.000.000-0" onChange={onChange} name={"rut1"}/>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Candidato 2 (Ingresar Rut)</FormLabel>
                    <Input placeholder="00.000.000-0" onChange={onChange} name={"rut2"}/>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Candidato 3 (Ingresar Rut)</FormLabel>
                    <Input placeholder="00.000.000-0" onChange={onChange} name={"rut3"}/>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Candidato 4 (Ingresar Rut)</FormLabel>
                    <Input placeholder="00.000.000-0" onChange={onChange} name={"rut4"}/>
                </FormControl>
            </Stack>
            <Button colorScheme="blue" size="md" my="5" type="sumbit" onClick={onSubmit} >Guardar</Button>
            <Button colorScheme="red" mx={'2'} size="md" my="5" type="sumbit" onClick={backVotingAct} >Cancelar</Button>
        </Container>
        </Stack>
    )
}

export default create_voting_activity