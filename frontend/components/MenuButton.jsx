import React from 'react'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    IconButton
  } from '@chakra-ui/react'

function MenuButtonIcon() {
    return (
        <Menu>
        <MenuButton as={IconButton} colorScheme="blue">
          ---
        </MenuButton>
        <MenuList>
          <MenuItem>Profile</MenuItem>
          <MenuItem>ConfigUser</MenuItem>
          <MenuItem>Log off</MenuItem>
        </MenuList>
      </Menu>
    )
  }

export default MenuButtonIcon