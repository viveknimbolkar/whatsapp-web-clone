import styled from '@emotion/styled'
import { Avatar, Box, Drawer, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AccountContext } from '../../context/AccountProvider';
import EditIcon from '@mui/icons-material/Edit';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import { updateBio } from '../../service/api';

const drawerStyle = {
    width: "410px",
    height: "100%",
    boxShadow: "none",
    backgroundColor: "#EDEDED",
}

const DrawerHeader = styled(Box)`
    background-color: #008069;
    width:100%;
    height:120px;
    color:white;
    display:flex;
    & > svg, & > p{
        margin-top:auto;
        padding:10px;
        font-size:20px;
        font-weight:600;
    }
    & > svg{
        width:35px;
        height:35px;
        cursor:pointer;
    }
`

const AvatarWrapper = styled(Box)`
    display:flex;
    justify-content:center;
    align-items:center;
    height:200px;
    padding:30px 0px;
`
const UsernameWrapper = styled(Box)`
    display:flex;
    justify-content:space-between;
    align-items:center;
`
const usernameWrapperStyle = {
    backgroundColor: "#fff",
    padding: "30px 20px",
}
function ProfileDrawer({ isDrawerOpen, setDrawerOpen }) {
    const { account } = useContext(AccountContext)
    const [toggleEditName, setToggleEditName] = useState(false)
    const [toggleEditBio, setToggleEditBio] = useState(false)
    const [newName, setNewName] = useState(account.name)
    const [bio, setBio] = useState(account.bio ? account.bio : "Available")

    return (
        <> <Drawer
            hideBackdrop={true}
            open={isDrawerOpen}
            onClose={setDrawerOpen}
            PaperProps={{
                sx: drawerStyle
            }}
        >
            <DrawerHeader>
                <ArrowBackIcon onClick={setDrawerOpen} />
                <Typography>Profile</Typography>
            </DrawerHeader>
            <AvatarWrapper>
                <Avatar sx={{ width: 200, height: 200 }} alt={account.given_name} src={account.picture} />
            </AvatarWrapper>
            <Box sx={usernameWrapperStyle}>
                <Typography sx={{ fontSize: '14px', color: "#008069", margin: "10px 0" }}>Your name</Typography>
                <UsernameWrapper>
                    {!toggleEditName ?
                        <>
                            <Typography>{account.given_name}</Typography> <EditIcon onClick={() => setToggleEditName(prev => !prev)} style={{ cursor: "pointer" }} />
                        </>
                        : <>
                            <TextField id="standard-basic" value={newName} onChange={(e) => setNewName(e.target.value)} color='success' variant="standard" />
                            <DownloadDoneIcon style={{ cursor: 'pointer' }} onClick={() => setToggleEditName(prev => !prev)} />
                        </>
                    }

                </UsernameWrapper>
            </Box>
            <Typography sx={{
                padding: "20px",
                color: "gray",
                fontSize: "14px"
            }}>
                This is not your username or pin. This name will be visible to your WhatsApp contacts.
            </Typography>
            <Box sx={usernameWrapperStyle}>

                <Typography sx={{ fontSize: '14px', color: "#008069", margin: "10px 0" }}>About</Typography>
                <UsernameWrapper>
                    {toggleEditBio ? <>
                        <TextField id="standard-basic" value={account.bio ?? bio} onChange={(e) => {
                            setBio(e.target.value)
                        }} color='success' variant="standard" />
                        <DownloadDoneIcon style={{ cursor: 'pointer' }} onClick={async () => {
                            setToggleEditBio(prev => !prev);
                            const updatedBio = await updateBio({ bio, userid: account.sub })
                            setBio(updatedBio.bio)
                        }} />
                    </> : <>
                        <Typography>{bio}</Typography> <EditIcon onClick={() => setToggleEditBio(prev => !prev)} style={{ cursor: "pointer" }} />
                    </>
                    }

                </UsernameWrapper>
            </Box>
        </Drawer></>
    )
}

export default ProfileDrawer