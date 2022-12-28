import { useState } from 'react'
import { Stack, Button, text} from '@chakra-ui/react'
import { AiOutlinePlus } from "react-icons/md"

const Acta = () => {

    const [Acta] = useState([])

    const getActa = async

    const createActa = async () => {
        return (
            <Stack spacing={4} direction='row' align='center'>
                <Button lefticon={<AiOutlinePlus/>}colorScheme='yellow' size='md'>
                    Crear Acta
                </Button>
            </Stack>
        )
    }
}

export default Acta