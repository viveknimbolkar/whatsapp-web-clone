import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem } from '@mui/material';

function HeaderMenu({ isDrawerOpen, setDrawerOpen, setSettingsDrawerOpen }) {
    const [menuOpen, setMenuOpen] = useState(null);
    const handleOpen = (e) => {
        setMenuOpen(e.currentTarget)
    }
    const handleClose = (e) => {
        setMenuOpen(null)
    }
    return (
        <>
            <MoreVertIcon onClick={handleOpen} />
            <Menu
                id="basic-menu"
                anchorEl={menuOpen}
                open={menuOpen}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom", horizontal: "start"
                }}
            >
                <MenuItem
                    onClick={() => {
                        setMenuOpen(null);
                        setDrawerOpen()
                    }}
                >Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Starred Messages</MenuItem>
                <MenuItem onClick={handleClose}>New Community</MenuItem>
                <MenuItem onClick={handleClose}>Select Chats</MenuItem>
                <MenuItem onClick={() => {
                    setMenuOpen(null);
                    setSettingsDrawerOpen()
                }}>Settings</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </>
    )
}

export default HeaderMenu