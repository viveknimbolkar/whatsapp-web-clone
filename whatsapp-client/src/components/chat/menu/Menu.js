import React, { useState } from 'react'
import Header from './Header'
import Search from './Search'
import Conversations from './Conversations'
import styled from '@emotion/styled'
import { Box } from '@mui/material'

const MenuWrapper = styled(Box)`
  height:100%;
  overflow:hidden;
`
function Menu() {
  const [searchUserText, setSearchUserText] = useState("")
  return (
    <MenuWrapper>
      <Header />
      <Search setSearchUserText={setSearchUserText} />
      <Conversations searchUserText={searchUserText} />
    </MenuWrapper>
  )
}

export default Menu