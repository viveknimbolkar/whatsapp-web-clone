import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'
import './contextify.css'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { noMessageYetImage } from '../../constant/data'
import { getChatWallpaper, getConversation, getMessages, newMessage } from '../../../service/api'
import Footer from './Footer'
import { AccountContext } from '../../../context/AccountProvider'
import formatDate from '../../../utils/commonUtils'
import { Menu, Item, Separator, Submenu, useContextMenu } from 'react-contexify';
import 'react-contexify/ReactContexify.css';
import { GeneralContext } from '../../../context/GeneralContext'
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';


const ChatWrapper = styled(Box)`
height:82vh;
overflow-y:scroll;
`

const MyMsgWrapper = styled(Box)`
    width:fit-content;
    background-color:#dcf8c6;
    margin-left:auto;
    border-radius:10px;
    word-break:break-word;
    display:flex;
    margin-top:5px;
    padding:5px 8px;
    max-width:60%;
    margin-right:10px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`

const SenderMsgWrapper = styled(Box)`
    width:fit-content;
    background-color:#fff;
    border-radius:10px;
    word-break:break-word;
    display:flex;
    margin-top:5px;
    padding:5px 8px;
    max-width:60%;
    margin-left:10px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`

const MediaMessageWrapper = styled(Box)`
    border-radius:10px;
`

const MediaMsgWrapper = styled(Box)`

`

const ImageWrapper = styled(Box)`
    border-radius:10px;
    max-width: 300px;
    overflow:hidden;
    position:relative;
    .media-image{
        width:100%;
        objit-fit:cover;
        height:100%;
    }
    sub{
        position:absolute;
        bottom:0;
        right:0;
    }
`

const ModalImageWrapper = styled(Box)`
width:100%;
height:100%;
background-color:#fff;
text-align:center;
.media-image{
    width:75%;
    object-fit:cover;
}
`
const AMessage = ({ message, currentUser, senderId, text, createdAt, msgType }) => {
    var time = formatDate(createdAt);
    const [open, setOpen] = useState(false);

    const MediaMessage = () => {
        return <>
            <MediaMessageWrapper>
                {(message?.text?.includes(".jpg") ||
                    message?.text?.includes(".jpeg") ||
                    message?.text?.includes(".png"))
                    ? <ImageWrapper>
                        <img onClick={(e) => setOpen(true)} className='media-image' src={message.text} alt={message.text} />
                        <sub>{time}</sub>
                    </ImageWrapper>
                    : <MediaMsgWrapper>
                        sdf
                    </MediaMsgWrapper>}
            </MediaMessageWrapper>
            <Modal
                open={open}
            >
                <>
                    <ModalImageWrapper>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'end',
                            padding: '20px'
                        }}>
                            <CloseIcon onClick={e => setOpen(false)} sx={{ cursor: 'pointer' }} />
                        </Box>
                        <img className='media-image' src={message.text} alt={message.text} />
                    </ModalImageWrapper>
                </>
            </Modal >
        </>
    }

    const TextMessage = () => {
        return <>
            <Typography sx={{ fontSize: 12 }}>
                {text} &nbsp;
                <sub style={{ color: 'gray' }}>{time}</sub>
            </Typography>
        </>
    }

    return <>
        {currentUser === senderId
            ? <MyMsgWrapper>
                {
                    msgType === 'text' ? <TextMessage /> : <MediaMessage />
                }

            </MyMsgWrapper>
            : <SenderMsgWrapper>
                {
                    msgType === 'text' ? <TextMessage /> : <MediaMessage />
                }

            </SenderMsgWrapper>
        }

    </>
}

function Messages({ person, conversation }) {
    const { account, socket } = useContext(AccountContext);
    const { setToggleContactInfo, isTyping, setIsTyping, chatWallpaper, setChatWallpaper } = useContext(GeneralContext)
    const [messages, setMessages] = useState([])
    const [incommingMessage, setIncommingMessage] = useState([])
    const [textMessage, setTextMessage] = useState('')
    const [fileUrl, setFileUrl] = useState('')
    const [hasNewMessageTrigger, setHasNewMessageTrigger] = useState(false)
    const [file, setFile] = useState(undefined)
    const scrollRef = useRef(null)

    const MessagesWrapper = styled(Box)`
    ${!chatWallpaper || chatWallpaper === "image-wallpaper"
            ? `
                background-image:url(${noMessageYetImage});
                background-size:50%;
               `
            : `background-color:${chatWallpaper};`
        }
    `

    useEffect(() => {
        // typing event
        if (textMessage !== "") {
            socket.current.emit('start-typing')
        } else {
            socket.current.emit('stop-typing')
        }
        socket.current.on("start-typing", (userid) => {
            setIsTyping(true)
            console.log(socket.current);
        })
        
        socket.current.on("stop-typing", (userid) => {
            setIsTyping(false)
        })
    }, [textMessage])


    // add new message
    const sendText = async (e) => {
        const code = e.keyCode || e.which;
        if (code === 13) {
            let message = {}
            if (!file) {
                message = {
                    senderId: account.sub,
                    receiverId: person.sub,
                    conversationId: conversation._id,
                    type: 'text',
                    text: textMessage,
                }
            } else {
                message = {
                    senderId: account.sub,
                    receiverId: person.sub,
                    conversationId: conversation._id,
                    type: 'file',
                    text: fileUrl,
                }
            }
            socket.current.emit('send-message', message)
            await newMessage(message)
            setTextMessage('')
            setFileUrl('')
            setFile()
            setHasNewMessageTrigger(prev => !prev)
        }
    }
    useEffect(() => {
        const height = scrollRef.current?.scrollHeight;
        scrollRef.current.scrollTop = height;
    }, [messages])

    // fetch all messages and sent to renderes
    useEffect(() => {
        const fetchMessages = async () => {
            let response = await getMessages(conversation._id)
            setMessages(response.messages)
        }
        fetchMessages()
    }, [person._id, conversation._id, hasNewMessageTrigger])

    useEffect(() => {
        socket.current.on('get-message', data => {
            setIncommingMessage({
                ...data,
                createdAt: Date.now() // to add time in db
            })
        })

    }, [])

    useEffect(() => {
        const fetchChatWallpaper = async () => {
            const wallpaperResponse = await getChatWallpaper({ userid: account.sub });
            if (wallpaperResponse) {
                setChatWallpaper(wallpaperResponse)
            }
        }
        fetchChatWallpaper()
    }, [chatWallpaper])

    useEffect(() => {
        // setting up incomming msg
        incommingMessage &&
            conversation?.members?.includes(incommingMessage.senderId) &&
            setMessages(
                prev => [...prev, incommingMessage]
            )
    }, [incommingMessage, conversation])

    const { show } = useContextMenu({
        id: 'user-specific-menu',
    });

    function handleContextMenu(event) {
        show({
            event,
            props: {
                key: 'value'
            }
        })
    }
    const handleItemClick = ({ id, event, props }) => {
        switch (id) {
            case "contact-info":
                setToggleContactInfo(true)
                break;
            case "select-messages":
                console.log(event, props);
                break;
            case "close-chat":
                console.log(event, props);
                break;
            case "mute-notifications":
                console.log(event, props);
                break;
            case "disappearing-messages":
                console.log(event, props);
                break;
            case "clear-message":
                console.log(event, props);
                break;
            case "delete-chat":
                console.log(event, props);
                break;
            case "report":
                console.log(event, props);
                break;
            case "block":
                console.log(event, props);
                break;
            default:
                console.log("default menu");
        }
    }

    return (
        <MessagesWrapper onContextMenu={handleContextMenu}>
            <ChatWrapper ref={scrollRef}>
                {messages && messages.map((msg, index) => {
                    return <AMessage key={`${index}-msg`} message={msg} currentUser={account.sub} senderId={msg.senderId} text={msg.text} msgType={msg.type} createdAt={msg.createdAt} />
                })}
            </ChatWrapper>
            <Menu id={'user-specific-menu'}>
                <Item id="contact-info" onClick={handleItemClick}>Contact Info</Item>
                <Item id="select-messages" onClick={handleItemClick}>Select Messages</Item>
                <Item id="close-chat" onClick={handleItemClick}>Close Chat</Item>
                <Item id="mute-notifications" onClick={handleItemClick}>Mute Notifications</Item>
                <Item id="disappearing-messages" onClick={handleItemClick}>Disappearing messages</Item>
                <Item id="clear-message" onClick={handleItemClick}>Clear Message</Item>
                <Item id="delete-chat" onClick={handleItemClick}>Delete Chat</Item>
                <Item id="report" onClick={handleItemClick}>Report</Item>
                <Item id="block" onClick={handleItemClick}>Block</Item>
            </Menu>
            <Footer fileUrl={fileUrl} setFileUrl={setFileUrl} file={file} setFile={setFile} sendText={sendText} textMessage={textMessage} setTextMessage={setTextMessage} />
        </MessagesWrapper>
    )
}

export default Messages