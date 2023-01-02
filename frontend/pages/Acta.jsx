import { useState, useEffect } from 'react'
import { Stack, Text, Card, CardHeader, Heading, CardBody, SimpleGrid } from '@chakra-ui/react'
import axios from 'axios'
import NavTab from '../components/NavTab'
import ArrowDownIcon from '@chakra-ui/icons'

const Acta = () => {

    const [Actas, setActas] = useState([])

    const getActa = async () => {
        const response = await axios.get(`${process.env.API_URL}/getActa/639a48dffe299c865e0ea1f9`)
        setActas(response.data)
    }


    useEffect(() => {
        getActa()
    }, [])

    const showActas = () => {
        if (Acta.length === 0) {
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
                    return (
                        <Card key={Actap._id} boxShadow='lg' ml={30} my={4} variant='outline' overflow='hidden' alignItems='center' borderRadius={20} backgroundColor={"white"}>
                            <CardHeader>
                                <Heading size='md'>{Actap.name}</Heading>
                                <Text>{Actap.description}</Text>
                                <Text>{Acta.date}</Text>
                                <Button leftIcon={<ArrowDownIcon />} colorScheme='blue' variant='solid' margin={4} onClick={() => router.push(`${process.env.API_URL}/file/download/${Actap._id}`)} >Descargar</Button>
                            </CardHeader>
                        </Card>
                    )
                })
        }
    }

    //const [dow, setDown] = useState([])

    /*const download = async () => {
        const down = await axios.get(`${process.env.API_URL}/file/download`)
        setDown(down.data)
    }*/

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