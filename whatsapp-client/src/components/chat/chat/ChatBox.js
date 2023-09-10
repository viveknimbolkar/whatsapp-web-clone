import React, { useContext, useEffect, useState } from 'react'
import ChatHeader from './ChatHeader'
import { AccountContext } from '../../../context/AccountProvider'
import styled from '@emotion/styled'
import { Box } from '@mui/material'
import Messages from './Messages'
import { getConversation } from '../../../service/api'

const ChatBoxWrapper = styled(Box)`
width:100%;
`

function ChatBox() {
    const { account, person } = useContext(AccountContext);
    const [conversation, setConversation] = useState({})

    //fetch conversations
    useEffect(() => {
        // fetch all conversations of clicked user
        const fetchConversation = async () => {
            let data = await getConversation({
                senderId: account.sub,
                receiverId: person.sub
            })
            setConversation(data.conversations)
        }
        fetchConversation();
    }, [person.sub, account.sub])

    return (
        <ChatBoxWrapper>
            <ChatHeader personId={person.sub} name={person.name} picture={person.picture} />
            <Messages person={person} conversation={conversation} />
        </ChatBoxWrapper>
    )
}

export default ChatBox