import React from 'react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useRouter } from 'next/router'

function MenuButtonIcon() {

  const router = useRouter()

  const loginRouter = () => {
    router.push('/login')
  }

  return (
    <Menu>
      <MenuButton as={IconButton} colorScheme="blue">
        ‡
      </MenuButton>
      <MenuList>
        <MenuItem onClick={loginRouter}>Iniciar sesion</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default MenuButtonIcon