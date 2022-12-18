import React from 'react'
import { Input, Stack } from '@chakra-ui/react'

const InputText = ({ message }) => {
  return (
    <Stack spacing = {3}>
        <Input placeholder={message} />
    </Stack>
  )
}

export default InputText