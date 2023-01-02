import NavTab from '../components/NavTab'
import { Stack } from '@chakra-ui/react'
import Head from 'next/head'
import directiva from '../components/directiva'

// export async function getServerSideProps() {
//   try {
//     const res = await axios.get(`${process.env.API_URL}/getMeetings/recently/`)
//     return {
//       props: {
//         data: res.data
//       }
//     }
//   } catch (error) {
//     return {
//       redirect: {
//         destination: '/asambleas',
//         permanent: false
//       }
//     }
//   }
// }

export default function Home(data) {
  return (
    <Stack>
      <Head>
        <title>Inicio</title>
      </Head>
      <NavTab/>
      <Stack direction={'row'} my={4}>

        {directiva()}
      </Stack>
    </Stack>
  )
}