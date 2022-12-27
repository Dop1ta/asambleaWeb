import {
  Stack,
  Center,
  Image,
  Heading,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink
} from '@chakra-ui/react'

const NavTab = () => {

  return (
    <Stack bg='blackAlpha.50'>
      <Center >
        <Image
          borderRadius='full'
          width='80px'
          height='80px'
          boxSize='80px'
          src='/icon.png'
          alt='Dan Abramov'
        />
        <Heading mb={4}>
          Junta de vecinos "Rodrigo Beltran anashe Josefinasons"
        </Heading >
      </Center>
      <Center>
        <Breadcrumb separator='-'>
          <BreadcrumbItem>
            <BreadcrumbLink href='http://localhost:3000'>Inicio</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href='http://localhost:3000/asambleas'>Asambleas</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href='#'>Contact</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href='#'>Contact</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href='#'>Contact</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Center>
    </Stack>
  )
}

export default NavTab