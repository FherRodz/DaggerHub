import * as React from 'react';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Settings from '@mui/icons-material/Settings'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useUser } from '@auth0/nextjs-auth0';


const Header = () => {
    const [settingsAnchor, setSettingsAnchor] = useState<null | HTMLElement>(null);
    const { user, isLoading} = useUser();

    const handleShowSettings = (event: React.MouseEvent<HTMLElement>) => {
        setSettingsAnchor(event.currentTarget);
    }

    const handleCloseSettings = () => {
        setSettingsAnchor(null);
    }

    const handleLogout = () => {
        setSettingsAnchor(null);
        window.location.href = '/auth/logout';
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography onClick={() => window.location.href = '/'} variant='h3' component='div' sx={{":hover": { cursor: 'pointer' }}}>
                        DaggerHub
                    </Typography>
                    <div>
                        <Button color='inherit' sx={{ ':hover': { color: 'secondary.main' } }} href='/'>Home</Button>
                        <Button color='inherit' sx={{ ':hover': { color: 'secondary.main' } }} href='/bundles'>Bundles</Button>
                        { !user && (
                            <Button sx={{ backgroundColor: 'secondary.main' ,':hover': { color: 'secondary.main', backgroundColor: 'transparent' } }} href='/auth/login'>Login</Button>
                        )}
                        {user && (
                            <div style={{ display: 'inline-block' }}>
                                <IconButton 
                                    size='large'
                                    edge='end'
                                    color='inherit'
                                    aria-label='settings'
                                    sx={{ 
                                        ml: 2, 
                                        ':hover': { color: 'secondary.main' }, 
                                        transform: settingsAnchor ? 'rotate(30deg)' : 'rotate(0deg)', 
                                        transition: 'transform 0.3s ease' 
                                    }}
                                    onClick={handleShowSettings}
                                >
                                    <Settings />
                                </IconButton>
                                <Menu
                                    id='settings-menu'
                                    anchorEl={settingsAnchor}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(settingsAnchor)}
                                    onClose={handleCloseSettings}
                                >
                                    <MenuItem sx={{ ':hover': { backgroundColor: 'secondary.main' } }} onClick={handleCloseSettings}>Profile</MenuItem>
                                    <MenuItem sx={{ ':hover': { backgroundColor: 'secondary.main' } }} onClick={handleCloseSettings}>Account</MenuItem>
                                    <MenuItem sx={{ ':hover': { backgroundColor: 'secondary.main' } }} onClick={handleLogout}>Logout</MenuItem>
                                </Menu>
                            </div>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header;