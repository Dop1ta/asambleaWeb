import {
  Center,
  Image,
  Heading,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Box
} from '@chakra-ui/react'
import Menu from './MenuButton'

const Tab_votingActivity = () => {

  return (
    <Box backgroundColor={'rgb(244,247,254)'} width="100%" >
      <Center>
        <Image
          borderRadius='full'
          width='60px'
          height='60px'
          boxSize='60px'
          src='/icon.png'
          alt='Dan Abramov'
          marginRight={"20px"}
        />
        <Heading textAlign={"center"} my={8} textColor={"#180B67"} fontSize={"50"}>Plataforma de Votación de Vecinos</Heading >
        <Image borderRadius='full' width='60px' height='60px' boxSize='60px' src='/icon.png' alt='Dan Abramov' marginLeft={"20px"}/>
      </Center>
      <Center>
        <Breadcrumb separator='-'>
          <BreadcrumbItem>
            <BreadcrumbLink href='/viewAdmin'>Inicio</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href='/voting_activity'>Votaciones en Curso</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem >
            <BreadcrumbLink href='/create/create_voting_activity'>Crear Votación</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href='view_voting'>Resultados de Votación</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <Menu />
          </BreadcrumbItem>
        </Breadcrumb>
      </Center>
    </Box>
  )
}

export default Tab_votingActivity