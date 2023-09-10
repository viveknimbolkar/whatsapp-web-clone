import styled from '@emotion/styled'
import { Avatar, Box, Drawer, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AccountContext } from '../../context/AccountProvider';
import EditIcon from '@mui/icons-material/Edit';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import { updateBio } from '../../service/api';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import HelpIcon from '@mui/icons-material/Help';
import DownloadIcon from '@mui/icons-material/Download';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import ArticleIcon from '@mui/icons-material/Article';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NotificationDrawer from './NotificationDrawer';
import ChatWallpaperDrawer from './ChatWallpaperDrawer';

const drawerStyle = {
    width: "410px",
    height: "100%",
    boxShadow: "none",
    backgroundColor: "#EDEDED",
}

const SettingsDrawerHeader = styled(Box)`
    background-color: #008069;
    width:100%;
    height:100px;
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
const ProfileWrapper = styled(Box)`
background-color:#fff;
display:flex;
align-items:center;
padding:20px; 
gap:10px;
`

const SettingMenuWrapper = styled(Box)`
background-color:#fff;
overflow-y:scroll;
`

const SettingCard = ({ onClick, icon, name }) => {
    const SettingWrapper = styled(Box)`
        display:flex;
        align-items:center;
        padding:20px 30px;
        gap:10px;
        font-size:16px;
        cursor:pointer;
        &:hover{
            background-color: #e0e0e0;
        }
    `
    return <>
        <SettingWrapper onClick={onClick}>
            {icon} {name}
        </SettingWrapper>
    </>
}

function SettingsDrawer({ isDrawerOpen, setDrawerOpen }) {
    const { account } = useContext(AccountContext)
    const [toggleNotificationDrawer, setToggleNotificationDrawer] = useState(false)
    const [toggleChatWallpaperDrawer, setToggleChatWallpaperDrawer] = useState(false)
    const [toggleEditBio, setToggleEditBio] = useState(false)
    const [newName, setNewName] = useState(account.name)
    const [bio, setBio] = useState(account.bio ? account.bio : "Available")

    const settings = [
        {
            label: "Notifications",
            value: "notifications",
            icon: <NotificationsIcon />,
            onClick: () => {
                setToggleNotificationDrawer(!toggleNotificationDrawer);
            }
        },
        {
            label: "Privacy",
            value: "privacy",
            icon: <SecurityIcon />
        },
        {
            label: "Security",
            value: "security",
            icon: <SecurityIcon />
        },
        {
            label: "Theme",
            value: "theme",
            icon: <DarkModeIcon />
        },
        {
            label: "Chat Wallpaper",
            value: "chat wallpaper",
            icon: <WallpaperIcon />,
            onClick: () => {
                setToggleChatWallpaperDrawer(!toggleChatWallpaperDrawer);
            }
        },
        {
            label: "Help",
            value: "help",
            icon: <HelpIcon />
        },
        {
            label: "Keyboard Shortcuts",
            value: "keyboard-shortcuts",
            icon: <KeyboardIcon />
        },
        {
            label: "Logout",
            value: "logout",
            icon: <LogoutIcon />,
            onClick: () => {
                localStorage.removeItem("whatsapp-clone")
            }
        },
    ];

    return (
        <> <Drawer
            hideBackdrop={true}
            open={isDrawerOpen}
            onClose={setDrawerOpen}
            PaperProps={{
                sx: drawerStyle
            }}
        >
            <SettingsDrawerHeader>
                <ArrowBackIcon onClick={setDrawerOpen} />
                <Typography>Settings</Typography>
            </SettingsDrawerHeader>
            <ProfileWrapper>
                <Avatar sx={{ width: 80, height: 80 }} alt={account.given_name} src={account.picture} />
                <Box>
                    <Typography style={{ fontWeight: 800 }}>{account.given_name}</Typography>
                    <Typography>{account.bio}</Typography>
                </Box>
            </ProfileWrapper>
            <SettingMenuWrapper>
                {
                    settings.map((item, i) => {
                        return <SettingCard key={`${item.label}-${i}`} icon={item.icon} name={item.label} onClick={item.onClick} />
                    })
                }
            </SettingMenuWrapper>
            <NotificationDrawer isDrawerOpen={toggleNotificationDrawer} setDrawerOpen={(e => { setToggleNotificationDrawer(!toggleNotificationDrawer) })} />
            <ChatWallpaperDrawer isDrawerOpen={toggleChatWallpaperDrawer} setDrawerOpen={e => setToggleChatWallpaperDrawer(!toggleChatWallpaperDrawer)} />
        </Drawer></>
    )
}

export default SettingsDrawer