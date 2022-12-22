import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Button,
    CloseButton,
    useDisclosure,
    Box
  } from '@chakra-ui/react'

  function Alerts_votingActivity({s}) {
    const {
      isOpen: isVisible,
      onClose,
      onOpen,
    } = useDisclosure({ defaultIsOpen: s })

    return isVisible ? (
      <Alert status='success'>
        <AlertIcon />
        <Box>
          <AlertTitle>¡Has votado Correctamente!</AlertTitle>
          <AlertDescription>
            Haz click en "Visualizar conteo de votos" para poder ver los resultados.
          </AlertDescription>
        </Box>
        <CloseButton
          alignSelf='flex-start'
          position='relative'
          right={-1}
          top={-1}
          onClick={onClose}
        />
      </Alert>
    ) : (onClose)
  }

export default Alerts_votingActivity;