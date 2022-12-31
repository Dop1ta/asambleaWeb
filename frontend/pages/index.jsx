import NavTab from '../components/NavTab'
import { Stack } from '@chakra-ui/react'
import Head from 'next/head'

export default function Home() {
  return (
    <Stack>
      <Head>
        <title>Inicio</title>
      </Head>
      <NavTab></NavTab>
    </Stack>
  )
}