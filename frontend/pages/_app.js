import '../styles/globals.css'
import { ChakraProvider } from "@chakra-ui/react"

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider backgroundColor={"rgb(244,247,254)"} >
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
