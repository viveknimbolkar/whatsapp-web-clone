import styled from '@emotion/styled'
import { Avatar, Box, Switch, Typography } from '@mui/material'
import React, { useContext } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { AccountContext } from '../../../context/AccountProvider';
import SpeedIcon from '@mui/icons-material/Speed';
import HttpsIcon from '@mui/icons-material/Https';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import StarIcon from '@mui/icons-material/Star'; import NotificationsIcon from '@mui/icons-material/Notifications';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { defaultProfilePicture, iconPDF, noMessageYetImage, qrCodeImage } from '../../constant/data';
import { GeneralContext } from '../../../context/GeneralContext';
const ContactInfoWrapper = styled(Box)`
min-width:410px;
overflow-y:scroll;
color:#111b21;
height:100%;
svg{
    color:gray;
}
`
const ContactInfoHeaderWrapper = styled(Box)`
display:flex;
gap:30px;
justify-content:start;
padding:10px;
align-items:center;
`
const AvatarWrapper = styled(Box)`
display:flex;
flex-direction:column;
gap:10px;
justify-content:center;
align-items:center;
background-color:#fff;
padding:10px 0px;
`
const AboutWrapper = styled(Box)`
background-color:#fff;
margin:10px 0px;
padding:10px;
`
const MediaWrapper = styled(Box)`
background-color:#fff;
margin:10px 0px;
padding:10px;
`
const MediaFlex = styled(Box)`
display:flex;
align-items:center;
justify-content:space-between;
`
const MediaImagesWrapper = styled(Box)`
display:flex;
align-items:center;
justify-content:space-around;

img{
    width:80px;
    height:80px;
    border-radius:10px;
    margin:10px 0px;
    cursor:pointer;
}
`


const MoreSettingsWrapper = styled(Box)`
background-color:#fff;
margin:10px 0px;
padding:10px 0px;
`

function SettingCard({ icon, title, actionIcon = <ChevronRightIcon />, hasSwitch = false }) {

    const SettingCardWrapper = styled(Box)`
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:10px 10px;
    cursor:pointer;
    &:hover{
        background-color:#ededed;
    }
    `
    return <>
        <SettingCardWrapper>
            <Box sx={{ display: 'flex', gap: '10px' }}>
                {icon}
                <Typography>{title}</Typography>
            </Box>
            {hasSwitch ? <Switch /> : actionIcon}
        </SettingCardWrapper>
    </>
}

function Actioncard({ icon, title }) {

    const ActionCard = styled(Box)`
    display:flex;
    align-items:center;
    justify-content:start;
    padding:10px 10px;
    cursor:pointer;
    color:red;
    gap:10px;
    svg{
        color:red;
    }
    &:hover{
        background-color:#ededed;
    }
    `

    return <>
        <ActionCard>
            {icon}{title}
        </ActionCard>
    </>
}

function ContactInfo() {
    const { account, person } = useContext(AccountContext)
    const { setToggleContactInfo } = useContext(GeneralContext)
    console.log('person',person);
    const settings = [
        {
            icon: <StarIcon />,
            title: "Starred messages",
        },
        {
            icon: <NotificationsIcon />,
            title: "Mute Notifications",
            hasSwitch: true,
        },
        {
            icon: <HttpsIcon />,
            title: "Enctyption",
        },
        {
            icon: <SpeedIcon />,
            title: "Disappearing Messages",
        },
    ]
    const accountActionSettings = [
        {
            icon: <DeleteIcon />,
            title: "Delete Chat",
            onClick:()=>{
                
            }
        },
        {
            icon: <BlockIcon />,
            title: `Block ${account.given_name}`,
        },
        {
            icon: <ThumbDownIcon />,
            title: `Report ${account.given_name}`,
        },
        {
            icon: <SpeedIcon />,
            title: "Disappearing Messages",
        },
    ]
    return (
        <ContactInfoWrapper>
            <ContactInfoHeaderWrapper>
                <CloseIcon onClick={e => setToggleContactInfo(false)} />
                <Typography>Contact Info</Typography>
            </ContactInfoHeaderWrapper>
            <AvatarWrapper>
                <Avatar sx={{ width: 200, height: 200 }} alt={account.given_name} src={account.picture} />
                <Typography variant='h6'>{account.given_name}</Typography>
                <Typography variant='p'>{account.email}</Typography>
            </AvatarWrapper>
            <AboutWrapper>
                <Typography sx={{ fontWeight: 600 }}>About</Typography>
                <Typography sx={{ fontSize: 14 }}>{account.bio}</Typography>
            </AboutWrapper>
            <MediaWrapper>
                <MediaFlex>
                    <Typography>Media, Links and Docs</Typography>
                    <ChevronRightIcon />
                </MediaFlex>
                <MediaImagesWrapper>
                    {/* <img src={defaultProfilePicture} alt='Image 3' /> */}
                    <img src={iconPDF} alt='Image' />
                    <img src={qrCodeImage} alt='Image 2' />
                    <img src={defaultProfilePicture} alt='Image 3' />
                </MediaImagesWrapper>
            </MediaWrapper>
            <MoreSettingsWrapper>
                {
                    settings.map((setting, i) => {
                        return <SettingCard icon={setting.icon} title={setting.title} actionIcon={setting.actionIcon} hasSwitch={setting.hasSwitch} />
                    })
                }
            </MoreSettingsWrapper>
            <MoreSettingsWrapper>
                {accountActionSettings.map((action, i) => {
                    return <Actioncard icon={action.icon} title={action.title} />
                })}
            </MoreSettingsWrapper>
        </ContactInfoWrapper>
    )
}

export default ContactInfo