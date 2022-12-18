import React from 'react'
import { Input, Stack } from '@chakra-ui/react'

const InputRut = () => {
    const message = 'Ej: 99.999.999-k'
  return (
    <Stack spacing = {3}>
        <Input placeholder={message} />
    </Stack>
  )
}

export default InputRut