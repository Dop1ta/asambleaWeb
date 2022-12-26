import { Button, useDisclosure, useToast} from '@chakra-ui/react';

function ButtonAlertVoting() {
     const toast = useToast();
  return (
    <>
      <Button colorScheme="blue" onClick={() => toast({ title: "Has votado correctamente" })}>
  Votar por Diego
    </Button>
    </>
  );
}

export default ButtonAlertVoting;