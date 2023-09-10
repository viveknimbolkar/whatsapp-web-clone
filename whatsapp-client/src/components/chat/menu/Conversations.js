import React, { useContext, useEffect, useState } from 'react'
import { getAllUsers, getConversation, setConversation } from '../../../service/api';
import { Avatar, Box, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { AccountContext } from '../../../context/AccountProvider';
import formatDate from '../../../utils/commonUtils';

const ConversationWrapper = styled(Box)`
    height:100%;
    overflow-y: scroll;
`
const UserCardWrapper = styled(Box)`
cursor:pointer;
    background-color:#fff;
    display:flex;
    align-items-center;
    justify-content:space-between;
    padding:10px;
    border-bottom:1px solid #b8b8b8;

`
const UserCardMoreWrapper = styled(Box)`
`

const AvtarAndInfoWrapper = styled(Box)`
    display:flex;
    gap:10px;
    align-items:center;
`

function UserCard({ name, picture, user }) {
    const [latestMessage, setLatestMessage] = useState(undefined);
    const [latestMessageTime, setLatestMessageTime] = useState(undefined);
    const { setPerson, account } = useContext(AccountContext)

    const getUser = async () => {
        setPerson(user)
        await setConversation({ senderId: account.sub, receiverId: user.sub })
    }
    // fetch latest messages
    useEffect(() => {
        const getLatestMessages = async () => {
            const response = await getConversation({ senderId: account.sub, receiverId: user.sub });
            if(response.conversations?.message){
                setLatestMessage(response.conversations?.message)
                setLatestMessageTime(formatDate(response.conversations.updatedAt))
            }
        }
        getLatestMessages()
    }, [latestMessage, user.sub, account.sub])

    return <>
        <UserCardWrapper onClick={getUser}>
            <AvtarAndInfoWrapper>
                <Avatar alt={name} src={picture} />
                <UserCardMoreWrapper>
                    <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>{name}</Typography>
                    <Typography variant='p' sx={{ fontSize: 14 }}>{user.isTyping?"Typing...":latestMessage}</Typography>
                </UserCardMoreWrapper>
            </AvtarAndInfoWrapper>
            <Box>
                <Typography variant='t' sx={{ fontSize: 14 }}>{latestMessageTime}</Typography>
            </Box>
        </UserCardWrapper>
    </>
}

function Conversations({ searchUserText }) {
    const [users, setUsers] = useState([]);
    const { account, socket, activeUsers, setActiveUsers } = useContext(AccountContext)

    useEffect(() => {
        let fetchUsers = async () => {
            let response = await getAllUsers()
            const searchUserOnQuery = response.users.filter(user => user.name.toLowerCase().includes(searchUserText.toLowerCase()))
            if (searchUserOnQuery !== "") {
                setUsers(searchUserOnQuery);
            } else {
                setUsers(response)
            }
        }
        fetchUsers()
    }, [searchUserText])



    // emit socket event to add current user in pipe
    useEffect(() => {
        socket.current.emit('add-user', account)
        socket.current.on('get-active-users', getAllActiveUsers => {
            console.log("getAllActiveUsers " ,getAllActiveUsers);
            setActiveUsers(getAllActiveUsers)
        })
    }, [account])

    return (
        <>
            <ConversationWrapper>
                {
                    users.length > 0 && users.map((user, index) => {
                        return <UserCard user={user} key={`card-${user.sub}-${index}`} name={user.name} picture={user.picture} isMuted={false} isSeen={false} lastMessageTime={'12:23 PM'} totalUnreadMessages={49} lastMessage={"What are you doing?"} />
                    })
                }

            </ConversationWrapper>
        </>
    )
}

export default Conversations