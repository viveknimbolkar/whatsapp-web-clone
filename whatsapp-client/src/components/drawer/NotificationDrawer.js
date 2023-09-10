import styled from '@emotion/styled'
import ArrowBack from '@mui/icons-material/ArrowBack'
import { Avatar, Box, Drawer, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';

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

const NotificationMenuWrapper = styled(Box)`
background-color:#fff;
overflow-y:scroll;
`

const NotificationCard = ({ onClick, icon, name, hasCheckbox = true }) => {
    const NotificationCardWrapper = styled(Box)`
        display:flex;
        align-items:center;
        justify-content:space-between;
        padding:20px 30px;
        gap:10px;
        font-size:16px;
        cursor:pointer;
        &:hover{
            background-color: #e0e0e0;
        }
    `
    return <>
        <NotificationCardWrapper onClick={onClick}>
            {icon} {name} {hasCheckbox ? <Checkbox /> : <></>}
        </NotificationCardWrapper>
    </>
}

function NotificationDrawer({ isDrawerOpen, setDrawerOpen }) {
    const settings = [
        {
            label: "Message Notifications",
            value: "message-notifications",
            hasCheckbox:true,
        },
        {
            label: "Show Previews",
            value: "show-previews",
        },
        {
            label: "Sounds",
            value: "sounds",
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
                <ArrowBack onClick={setDrawerOpen} />
                <Typography>Notifications</Typography>
            </SettingsDrawerHeader>
            <NotificationMenuWrapper>
                {
                    settings.map((item, i) => {
                        return <NotificationCard hasCheckbox={item.hasCheckbox} key={`${item.label}-${i}`} icon={item.icon} name={item.label} onClick={item.onClick} />
                    })
                }
            </NotificationMenuWrapper>
        </Drawer></>
    )
}

export default NotificationDrawer