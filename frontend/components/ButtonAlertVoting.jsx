import {Button } from '@chakra-ui/react'
import Alerts_votingActivity from './Alerts';

function ButtonAlertVoting (){
    return(<div><Button colorScheme="blue">Votar por Diego</Button>
    <Alerts_votingActivity s = "true"></Alerts_votingActivity>
    </div>
    )
}

export default ButtonAlertVoting;