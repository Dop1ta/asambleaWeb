import { Heading, Tab } from '@chakra-ui/react'
import React from 'react'
import MenuButtonIcon from '../components/MenuButton'
import Tab_votingActivity from '../components/Tab_votingActivity'

const create_voting_activity = () => {
    return (
    <body>
        <Heading mb="4">Gestor de actividades de votaciónW</Heading>
        <div align="right">
        <MenuButtonIcon></MenuButtonIcon>
        </div>
        <div><Tab_votingActivity></Tab_votingActivity></div>
    </body>
    )
}

export default create_voting_activity