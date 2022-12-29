import React from 'react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

function MenuButtonIcon() {

  const route = useRouter()

  const handleRoute = (routes) => {
    route.push(routes)
  }

  return (
    <Menu>
      <MenuButton as={IconButton} colorScheme="blue">
        ‡
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => { handleRoute('/viewAdmin') }}>Vista admin</MenuItem>
        <MenuItem>Config User</MenuItem>
        <MenuItem>Log off</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default MenuButtonIcon