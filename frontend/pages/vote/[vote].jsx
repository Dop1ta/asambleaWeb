import Tab_votingActivity_basic from "../../components/Tab_votingActivity_basic";
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

const vote = (data) => {
  const router = useRouter()
  const [Vote] = useState(data.data)

  const [user, setUser] = useState([])

  const getUser = async () => {
    try {
      const response = await axios.get(`${process.env.API_URL}/getUsers/rut/${Cookies.get('rut')}`)
      setUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getUser()
  }, [])

  const getUserSelected = async () => {
    try {
      const response1 = await axios.get(`${process.env.API_URL}/getUsers/rut/${rut}`)
      setUserSelected(response1.data)
    } catch (error) {
      console.log(error)
    }
  }

  const[userSelected,setUserSelected] = useState([])

  let [values, setValues] = useState({
    rut: '',
  })

  const [user2, setUser2] = useState({
    votos: userSelected.votos + 1
})
/*  let [values, setValues] = useState({
    rut: Cookies.get('rut'),
    rut_v: '',
    name_v: Vote._id,
  })
  */
  const onSumbit = async(e) =>{
    try{
        await axios.put(`${process.env.API_URL}/updateUserVote/${userSelected._id}/${user._id}`, user2)
    } catch(error) {

    }
  }
  /*const onSumbit = async (e) => {
    e.preventDefault()
    // console.log(user._id)
    // console.log(values)
    try {
      const response = await axios.post(`${process.env.API_URL}/createTargetVote/${user._id}`, values)
      if (response.status === 201) {
        Swal.fire({
          title: 'Voto emitido',
          text: 'El voto se ha guardado correctamente',
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
  }*/

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }
  return (
    <Stack alignItems={'center'} textAlign={'center'}>
      <Tab_votingActivity_basic/>
      <Text>Votaci??n para {Vote.name}</Text>
      <RadioGroup>
        <Stack direction='row'>
          <Radio value={Vote.rut1} name='rut' onChange={onChange}>{Vote.rut1}</Radio>
          <Radio value={Vote.rut2} name='rut' onChange={onChange}>{Vote.rut2}</Radio>
          <Radio value={Vote.rut3} name='rut' onChange={onChange}>{Vote.rut3}</Radio>
          <Radio value={Vote.rut4} name='rut' onChange={onChange}>{Vote.rut4}</Radio>
          <Button colorScheme="blue" size="md" type="sumbit" onClick={onSumbit}>Guardar Voto</Button>
        </Stack>
      </RadioGroup>
    </Stack>
  )
}

export default vote