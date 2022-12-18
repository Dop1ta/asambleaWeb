import React from 'react'
import { Input, Stack } from '@chakra-ui/react'

const InputName = () => {
    const message = 'Ej: Manuel Cortes'
  return (
    <Stack spacing = {3}>
        <Input placeholder={message} />
    </Stack>
  )
}

export default InputName