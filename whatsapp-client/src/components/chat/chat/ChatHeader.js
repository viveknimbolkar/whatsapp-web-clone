import styled from '@emotion/styled'
import { Avatar, Box, Menu, MenuItem, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useContext } from 'react'
import { AccountContext } from '../../../context/AccountProvider';
import { GeneralContext } from '../../../context/GeneralContext';

const ChatHeaderWrapper = styled(Box)`
    background-color:#EDEDED;
    display:flex;
    align-items:center;
    gap:10px;
    justify-content:space-between;
    padding-right:20px;
    border-left:1px solid gray;
`

const HeaderMenuWrapper = styled(Box)`
    display:flex;
    align-items:center;
    gap:10px;
    justify-content:space-between;
`

const PictureWrapper = styled(Box)`
display:flex;
gap:10px;
align-items:center;
cursor:pointer;
    padding:12px 18px;
    width:100%;
`
function ChatHeader({ personId, picture, name }) {
    const { isTyping, setIsTyping } = useContext(GeneralContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { setToggleContactInfo, setToggleChat } = useContext(GeneralContext)
    const open = Boolean(anchorEl);
    const { activeUsers } = useContext(AccountContext)
    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <ChatHeaderWrapper>
                <PictureWrapper onClick={e => { setToggleContactInfo(true) }}>
                    <Avatar src={picture} alt='User Image' />
                    <Box>
                        <Typography>{name}</Typography>
                        {activeUsers?.find(user =>
                            user.sub === personId)
                            ? <Typography>{isTyping ? "typing..." : "online"}</Typography>
                            : <></>
                        }
                    </Box>
                </PictureWrapper>
                <HeaderMenuWrapper>
                    <MoreVertIcon onClick={handleOpen} />
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={(e) => {
                            setAnchorEl(null)
                            setToggleContactInfo(true);
                        }}>Contact Info</MenuItem>
                        <MenuItem onClick={handleClose}>Select Messages</MenuItem>
                        <MenuItem onClick={() => {
                            setToggleChat(false);
                            setAnchorEl(null)
                        }}>Close Chat</MenuItem>
                        <MenuItem onClick={handleClose}>Mute Notifications</MenuItem>
                        <MenuItem onClick={handleClose}>Disappearing Messages</MenuItem>
                        <MenuItem onClick={handleClose}>Clear Messages</MenuItem>
                        <MenuItem onClick={handleClose}>Delete Chat</MenuItem>
                        <MenuItem onClick={handleClose}>Report</MenuItem>
                        <MenuItem onClick={handleClose}>Block</MenuItem>
                    </Menu>
                </HeaderMenuWrapper>
            </ChatHeaderWrapper>
        </>
    )
}

export default ChatHeader