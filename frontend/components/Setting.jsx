import React from 'react'
import { Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react'

function Setting() {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label='Options'
        // icon={<HamburgerIcon />}
        variant='outline'
      />
      <MenuList>
        <MenuItem command='⌘T'>
          New Tab
        </MenuItem>
        <MenuItem command='⌘N'>
          New Window
        </MenuItem>
        <MenuItem command='⌘⇧N'>
          Open Closed Tab
        </MenuItem>
        <MenuItem command='⌘O'>
          Open File...
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default Setting