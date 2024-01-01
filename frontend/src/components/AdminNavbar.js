import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import logo from './healthySenseLogo.png';
import './NavBar.css';
import { Outlet, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LogoutIcon from '@mui/icons-material/Logout';
import { ListItemButton, ListItemIcon, ListItemText, List, Drawer, IconButton } from '@mui/material';
import { style } from '@mui/system';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';

function AdminNavbar() {
    const navigate = useNavigate();
    const [selectedButton, setSelectedButton] = useState('/admin');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };


    const handleButtonClick = (path) => {
        navigate(path);
        setSelectedButton(path);
    };

    return (
        <>

            <Box className="top">
                <Box className="logo">
                    <img src={logo} className="healthySenseLogo" alt="logo" />
                    <h2>HealthySense</h2>
                </Box>
                <Box className="pfp" sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Avatar
                        onClick={handleProfileMenuOpen}
                        style={{ marginRight: '5%', height: '65px', width: '65px', float: 'right' }}>H</Avatar>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleProfileMenuClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                        <MenuItem onClick={() => handleButtonClick('/logout')}>
                            <ListItemIcon sx={styles.menuItemIcon}>
                                <LogoutIcon fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </Box>
                <Box className="pfp" sx={{ display: { xs: 'block', md: 'none' } }}>
                    <IconButton onClick={handleDrawerOpen} style={{ marginRight: '5%', height: '55px', width: '45px', float: 'right', color: 'white' }}>
                        <MenuIcon style={{ fontSize: '30px' }} />
                    </IconButton>
                </Box>
                <Drawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={handleDrawerClose}
                >
                    <Box sx={{ width: 280, color: '#000', display: 'flex', flexDirection: 'column' }}>
                        <Avatar style={{ margin: '5%', height: '65px', width: '65px', alignSelf: 'center', marginBottom: 50 }}>H</Avatar>

                        <List>
                            <ListItemButton

                                onClick={() => handleButtonClick('/admin')}
                                sx={selectedButton === '/admin' ? styles.selectedListItem : null}
                            >
                                <ListItemIcon sx={selectedButton === '/admin' ? styles.selectedListItemIcon : styles.listItemIcon}><HomeIcon /></ListItemIcon>
                                <ListItemText sx={selectedButton === '/admin' ? styles.selectedBtnText : styles.btnText} primary="Home" />
                            </ListItemButton>
                            <ListItemButton
                                onClick={() => handleButtonClick('/admin/doctors')}
                                sx={selectedButton === '/admin/doctors' ? styles.selectedListItem : null}
                            >
                                <ListItemIcon sx={selectedButton === '/admin/doctors' ? styles.selectedListItemIcon : styles.listItemIcon}><FavoriteIcon /></ListItemIcon>
                                <ListItemText sx={selectedButton === '/admin/doctors' ? styles.selectedBtnText : styles.btnText} primary="Doctors" />
                            </ListItemButton>
                            <ListItemButton
                                sx={selectedButton === '/admin/patients' ? styles.selectedListItem : null}
                                onClick={() => handleButtonClick('/admin/patients')}>
                                <ListItemIcon sx={selectedButton === '/admin/patients' ? styles.selectedListItemIcon : styles.listItemIcon}><EventNoteIcon /></ListItemIcon>
                                <ListItemText sx={selectedButton === '/admin/patients' ? styles.selectedBtnText : styles.btnText} primary="Patients" />
                            </ListItemButton>
                            <ListItemButton
                                sx={selectedButton === '/logout' ? styles.selectedListItem : null}
                            >
                                <ListItemIcon sx={selectedButton === '/logout' ? styles.selectedListItemIcon : styles.listItemIcon}><LogoutIcon /></ListItemIcon>
                                <ListItemText sx={selectedButton === '/logout' ? styles.selectedBtnText : styles.btnText} primary="Logout" />
                            </ListItemButton>

                        </List>
                    </Box>
                </Drawer >
            </Box >
            <Box className="navBar" sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Button
                    sx={selectedButton === '/admin' ? styles.selectedBtn : styles.btn}
                    onClick={() => handleButtonClick('/admin')}
                >
                    Home
                </Button>
                <Button
                    sx={selectedButton === '/admin/doctors' ? styles.selectedBtn : styles.btn}
                    onClick={() => handleButtonClick('/admin/doctors')}
                >Doctors</Button>
                <Button
                    sx={selectedButton === '/admin/patients' ? styles.selectedBtn : styles.btn}
                    onClick={() => handleButtonClick('/admin/patients')}
                >Patients</Button>
            </Box>

            <Outlet />
        </>
    );
}

const styles = {
    menuItemIcon: {
        minWidth: '25px',
        color: '#2854c3',
    },
    btn:
    {
        color: "#979797",
        textTransform: 'none',
        border: 'none',
        borderRadius: '0px',
        transition: '0.3s',

        '&:hover': {
            backgroundColor: '#2854C3',
            color: '#fff',

        },
    },
    selectedBtn: {
        // Add styles for the selected button
        backgroundColor: '#2854C3',
        textTransform: 'none',
        border: 'none',
        borderRadius: '0px',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#2854C3',
            color: '#fff',
        },
    },
    selectedListItem: {
        backgroundColor: '#2854C3', // Add styles for the selected ListItemButton
        color: '#fff',
        '&:hover': {
            backgroundColor: '#2854C3',
            color: '#fff',
        },
    },
    listItemIcon: {
        minWidth: '35px',
        color: '#2854c3',
    },
    btnText: {
        color: '#000',
    },
    selectedBtnText: {
        color: '#fff',
    },
    selectedListItemIcon: {
        minWidth: '35px',
        color: '#fff',
    },


}

export default AdminNavbar;