import { useState, useEffect } from 'react'
import { Stack, Text, Card, CardHeader, Heading, CardBody, SimpleGrid, Button, CardFooter } from '@chakra-ui/react'
import axios from 'axios'
import NavTab from '../components/NavTab'
import { useRouter } from 'next/router'

const Acta = () => {

    const [Actas, setActas] = useState([])

    //const [status, setStatus] = useState()

    const router = useRouter()

    const getActa = async () => {
        const response = await axios.get(`${process.env.API_URL}/getActas`)
        console.log(response.data)
        setActas(response.data)
    }

    const getFileUp = async (id) => {
        try{
            const res = await axios.get(`${process.env.API_URL}/files/get/${id}`)
            console.log(res)
            if(res.status === 200){
                console.log(res)
                return true
            }
        }catch(error){
            return false
        }
    }

    useEffect(() => {
        getActa()
    }, [])

    const showActas = () => {
        if (Actas.length === 0) {
            return (
                <Card boxShadow='md' ml={30} my={4} variant='outline' overflow='hidden' alignItems='center' borderRadius={20} backgroundColor={"white"}>
                    <CardHeader>
                        <Heading size='md'>Sin Actas</Heading>
                    </CardHeader>
                    <CardBody>
                        <Text>No se ha encontrado ninguna Acta</Text>
                    </CardBody>
                </Card>
            )
        } else {
            return Actas.map(Actap => {
                console.log(Actap._id)
                    if(getFileUp(Actap._id) === true){
                        return (
                            <Card key={Actap._id} boxShadow='lg' ml={30} my={4} variant='outline' overflow='hidden' alignItems='center' borderRadius={20} backgroundColor={"white"}>
                                <CardHeader>
                                    <Heading size='md'>{Actap.name}</Heading>
                                    <Text>{Actap.description}</Text>
                                    <Text>{Actap.date}</Text>
                                </CardHeader>
                                <CardFooter>
                                    <Button colorScheme='blue' variant='solid' onClick={()=> router.push(`${process.env.API_URL}/file/download/${Actap._id}`)}>Descargar</Button>
                                </CardFooter>
                            </Card>
                        )
                    }else{
                        return (
                            <Card key={Actap._id} boxShadow='lg' ml={30} my={4} variant='outline' overflow='hidden' alignItems='center' borderRadius={20} backgroundColor={"white"}>
                                <CardHeader>
                                    <Heading size='md'>{Actap.name}</Heading>
                                    <Text>{Actap.description}</Text>
                                    <Text>{Actap.date}</Text>
                                </CardHeader>
                            </Card>
                        )
                    }
            })
        }
    }

    return (
        <Stack alignItems={'center'} textAlign={'center'} backgroundColor={"rgb(244,247,254)"}>
            <NavTab />
            <SimpleGrid>
                {showActas()}
            </SimpleGrid>
        </Stack>
    )
}

export default Acta