import React, { useContext, useState } from 'react'
import { Box } from '@mui/material'
import Menu from './menu/Menu'
import styled from '@emotion/styled'
import EmptyChat from './chat/EmptyChat'
import ChatBox from './chat/ChatBox'
import { AccountContext } from '../../context/AccountProvider'
import ContactInfo from './contact-info/ContactInfo'
import { GeneralContext } from '../../context/GeneralContext'

const ChatWrapper = styled(Box)`
  display:flex;
  height:100%;
`

const MenuContainer = styled(Box)`
  min-width:410px;
`

const ChatContainer = styled(Box)`
 width:100%;
`



function ChatDialog() {
  const { person } = useContext(AccountContext);
  const { toggleContactInfo, toggleChat } = useContext(GeneralContext)
  return (
    <>
      <ChatWrapper>
        <MenuContainer>
          <Menu />
        </MenuContainer>
        <ChatContainer>
          {Object.keys(person).length ? <ChatBox /> : <EmptyChat />}
        </ChatContainer>
        {toggleContactInfo ? <ContactInfo /> : <></>}
      </ChatWrapper>
    </>
  )
}

export default ChatDialog