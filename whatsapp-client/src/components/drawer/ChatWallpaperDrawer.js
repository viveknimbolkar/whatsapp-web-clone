import styled from '@emotion/styled'
import ArrowBack from '@mui/icons-material/ArrowBack'
import { Avatar, Box, Drawer, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import { updateChatWallpaper } from '../../service/api';
import { AccountContext } from '../../context/AccountProvider';
import { GeneralContext } from '../../context/GeneralContext';
import { noMessageYetImage } from '../constant/data';

const drawerStyle = {
    width: "410px",
    height: "100%",
    boxShadow: "none",
    backgroundColor: "#EDEDED",
}

const ChatWallpaperDrawerHeader = styled(Box)`
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

const ChatWallpaperWrapper = styled(Box)`
background-color:#fff;
overflow-y:scroll;
display:flex;
flex-wrap:wrap;
padding:20px 20px;
gap:10px;
`

const ChatwallpaperCard = ({ onClick, color }) => {
    const ChatwallpaperCardWrapper = styled(Box)`
        width:100px;
        height:100px;
        background-color: ${color.color};
        &:hover{
            transform:scale(0.9);
        }
    `
    return <>
        <ChatwallpaperCardWrapper onClick={onClick}>
        </ChatwallpaperCardWrapper>
    </>
}

function ChatWallpaperDrawer({ isDrawerOpen, setDrawerOpen }) {
    const { account } = useContext(AccountContext)
    const { setChatWallpaper } = useContext(GeneralContext)
    const handleColorChange = async (color) => {
        const res = await updateChatWallpaper({
            userid: account.sub,
            color: color === "image-wallpaper" ? "image-wallpaper" : color.color,
        })
        if (res.status === 200) {
            setChatWallpaper(res.color)
        }
    }

    const background = [

        {
            label: "Default",
            color: "#bbe4e5",
            value: "color-1"
        },
        {
            label: "Default",
            color: "#bbe4e5",
            value: "color-1"
        },
        {
            label: "Default",
            color: "rgb(174, 216, 199)",
            value: "color-3"
        },
        {
            label: "Default",
            color: "rgb(203, 218, 236)",
            value: "color-4"
        },
        {
            label: "Default",
            color: "rgb(102, 210, 213)",
            value: "color-5"
        },
        {
            label: "Default",
            color: "rgb(99, 189, 207)",
            value: "color-6"
        },
        {
            label: "Default",
            color: "rgb(214, 208, 240)",
            value: "color-7"
        },
        {
            label: "Default",
            color: "rgb(206, 206, 206)",
            value: "color-8"
        },
        {
            label: "Default",
            color: "rgb(209, 218, 190)",
            value: "color-9"
        },
        {
            label: "Default",
            color: "rgb(230, 225, 177)",
            value: "color-10"
        },
        {
            label: "Default",
            color: "rgb(254, 239, 169)",
            value: "color-11"
        },
        {
            label: "Default",
            color: "rgb(254, 210, 151)",
            value: "color-12"
        },
        {
            label: "Default",
            color: "rgb(253, 154, 155)",
            value: "color-13"
        },
        {
            label: "Default",
            color: "rgb(253, 103, 105)",
            value: "color-14"
        },
        {
            label: "Default",
            color: "rgb(251, 70, 104)",
            value: "color-15"
        },
        {
            label: "Default",
            color: "rgb(146, 32, 64)",
            value: "color-16"
        },
        {
            label: "Default",
            color: "rgb(220, 110, 79)",
            value: "color-17"
        },
        {
            label: "Default",
            color: "rgb(100, 77, 82)",
            value: "color-18"
        },
        {
            label: "Default",
            color: "rgb(81, 126, 126)",
            value: "color-19"
        },
        {
            label: "Default",
            color: "rgb(49, 144, 187)",
            value: "color-20"
        },
        {
            label: "Default",
            color: "rgb(53, 85, 138)",
            value: "color-21"
        },
        {
            label: "Default",
            color: "rgb(85, 98, 111)",
            value: "color-22"
        },
        {
            label: "Default",
            color: "rgb(85, 98, 111)",
            value: "color-22"
        },
        {
            label: "Default",
            color: "rgb(29, 35, 38)",
            value: "color-23"
        },
        {
            label: "Default",
            color: "rgb(48, 30, 52)",
            value: "color-24"
        },
        {
            label: "Default",
            color: "rgb(236, 240, 241)",
            value: "color-24"
        },
        {
            label: "Default",
            color: "rgb(255, 254, 162)",
            value: "color-25"
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
            <ChatWallpaperDrawerHeader>
                <ArrowBack onClick={setDrawerOpen} />
                <Typography>Chat Wallpaper</Typography>
            </ChatWallpaperDrawerHeader>
            <ChatWallpaperWrapper>
                <img onClick={(e) => { handleColorChange('image-wallpaper') }} alt="default wallpaper" width={100} height={100} src={noMessageYetImage} />
                {
                    background.map((item, i) => {
                        return <ChatwallpaperCard onClick={(e) => handleColorChange(item)} color={item} key={`${item.color}-${i}`} />
                    })
                }
            </ChatWallpaperWrapper>
        </Drawer></>
    )
}

export default ChatWallpaperDrawer