import { Box, Avatar } from '@mui/material'
import React, { useContext, useState } from 'react'
import { AccountContext } from '../../../context/AccountProvider'
import styled from '@emotion/styled'
import ChatIcon from '@mui/icons-material/Chat';
import HeaderMenu from './HeaderMenu';
import ProfileDrawer from '../../drawer/ProfileDrawer';
import SettingsDrawer from '../../drawer/SettingsDrawer';

const HeaderContainer = styled(Box)`
    background-color:#EDEDED;
    padding:12px 18px;
    display:flex;
    align-items:center;
    justify-content:space-between;
`

const HeaderActionContainer = styled(Box)`
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:20px;
`

function Header() {
    const { account } = useContext(AccountContext)
    const [infoDrawer, setInfoDrawer] = useState(false);
    const [settingsDrawer, setSettingsDrawer] = useState(false);

    return (
        <>
            <HeaderContainer>
                <Avatar alt={account.given_name} src={account.picture} onClick={() => setInfoDrawer(true)} />
                <HeaderActionContainer>
                    <ChatIcon />
                    <HeaderMenu isDrawerOpen={infoDrawer} setDrawerOpen={(e => { setInfoDrawer(!infoDrawer) })} isSettingsDrawerOpen={infoDrawer} setSettingsDrawerOpen={(e => { setSettingsDrawer(!settingsDrawer) })} />
                </HeaderActionContainer>
            </HeaderContainer>
            <ProfileDrawer isDrawerOpen={infoDrawer} setDrawerOpen={(e => { setInfoDrawer(!infoDrawer) })} />
            <SettingsDrawer isDrawerOpen={settingsDrawer} setDrawerOpen={(e => { setSettingsDrawer(!settingsDrawer) })} />
        </>
    )
}

export default Header