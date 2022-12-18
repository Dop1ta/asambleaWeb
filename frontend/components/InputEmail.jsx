import React from 'react'
import { Input, Stack } from '@chakra-ui/react'

const InputEmail = () => {
    const message = 'Ej: gabriel.nancupillan1901@alumnos.ubiobio.cl'
  return (
    <Stack spacing = {3}>
        <Input placeholder={message} />
    </Stack>
  )
}

export default InputEmail