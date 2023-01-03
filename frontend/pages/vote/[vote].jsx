import Tab_votingActivity from "../../components/Tab_votingActivity";
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { Stack, Radio, RadioGroup, Button, Text } from "@chakra-ui/react";

export async function getServerSideProps(context) {
    try {
        const res = await axios.get(`${process.env.API_URL}/getVotingActivity/search/${context.params.vote}`)
        return {
            props: {
                data: res.data
            }
        }
    } catch (error) {
        return {
            redirect: {
                destination: '/',
                permanet: false
            }
        }
    }
}

const vote = (data)  =>{
    const router = useRouter()
    const [Vote] = useState(data.data)

    const [user, setUser] = useState([])

    const getUser = async () => {
      const response = await axios.get(`${process.env.API_URL}/getUsers/rut/${Cookies.get('rut')}`)
      setUser(response.data)
  }
    useEffect(() => {
    getUser()
    }, [])
    let [values, setValues] = useState({
        rut: Cookies.get('rut'),
        rut_v: '',
        name_v: Vote._id,
      })

    const onSumbit = async (e) => {
        console.log(values)
        e.preventDefault()
        try {
            const response = await axios.post(`${process.env.API_URL}/createTargetVote/${user._id}`, values)
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
      setValues({
          ...values,
          [e.target.name]: e.target.value,
      })
  }
    return(
        <Stack alignItems={'center'} textAlign={'center'}>
        <Tab_votingActivity/>
        <Text>Votación para {Vote.name}</Text>
        <RadioGroup>
              <Stack direction='row'>
                <Radio value={Vote.rut1} name='rut_v' onChange={onChange}>{Vote.rut1}</Radio>
                <Radio value={Vote.rut2} name='rut_v' onChange={onChange}>{Vote.rut2}</Radio>
                <Radio value={Vote.rut3} name='rut_v' onChange={onChange}>{Vote.rut3}</Radio>
                <Radio value={Vote.rut4} name='rut_v' onChange={onChange}>{Vote.rut4}</Radio>
                <Button colorScheme="blue" size="md" type="sumbit" onClick={onSumbit}>Guardar Voto</Button>
              </Stack>
            </RadioGroup>
        </Stack>
    )
}

export default vote