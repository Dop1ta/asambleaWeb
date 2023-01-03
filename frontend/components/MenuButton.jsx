import React, { useState } from 'react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { HamburgerIcon } from '@chakra-ui/icons'

function MenuButtonIcon() {

  let [ name, setName ] = useState('')

  const router = useRouter()

  const loginRouter = () => {
    if(Cookies.get('logged') === 'true') {
      Cookies.set('logged', 'false')
      Cookies.set('rut', '')
      setName('Iniciar Sesion')
      router.push('/')
    } else {
      router.push('/login')
    }
  }

  const profileRouter = () => {
    if(Cookies.get('logged') === 'true') {
      router.push('/profile')
    } else {
      router.push('/login')
    }
  }

  const checkLogin = () => {
    if(Cookies.get('logged') === 'true') {
      setName('Cerrar Sesion')
    } else {
      setName('Iniciar Sesion')
    }
  }

  useEffect(() => {
    checkLogin()
  }, [])

  return (
    <Menu>
      <MenuButton as={IconButton} colorScheme="blue">
        <HamburgerIcon/>
      </MenuButton>
      <MenuList>
        {Cookies.get('rut') === '0.000.000-0' ? null : <MenuItem onClick={profileRouter}>Perfil</MenuItem>}
        <MenuItem onClick={loginRouter}>{name}</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default MenuButtonIcon