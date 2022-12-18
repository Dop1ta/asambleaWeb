import React from 'react'
import { Stack } from '@chakra-ui/react'
import InputName from '../components/InputName'
import InputEmail from '../components/InputEmail'
import InputRut from '../components/InputRut'

const user = () => {
  return (
    <Stack >
        <InputEmail></InputEmail>
        <InputName></InputName>
        <InputRut></InputRut>
    </Stack>
  )
}

export default user