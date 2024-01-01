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
import InfoIcon from '@mui/icons-material/Info';
import MailIcon from '@mui/icons-material/Mail';
import LogoutIcon from '@mui/icons-material/Logout';
import { ListItemButton, ListItemIcon, ListItemText, List, Drawer, IconButton } from '@mui/material';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';

import { style } from '@mui/system';
import UserNotifications from './UserNotifications';
import Cookies from 'js-cookie';

function NavBar() {
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState('/');
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

  const handleLogout = () => {
    //clear cookies
    Cookies.remove('token');

    navigate('/login');
  }
  return (
    <>

      <Box className="top">
        <Box className="logo">
          <img src={logo} className="healthySenseLogo" alt="logo" />
          <h2>HealthySense</h2>
        </Box>
        <Box className="pfp" sx={{ display: { xs: 'none', md: 'block' } }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', float: 'right', gap: 3 }}>
            <UserNotifications />
            <Avatar
              onClick={handleProfileMenuOpen}
              style={{ marginRight: '5%', height: '65px', width: '65px', float: 'right' }}>H</Avatar>
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <MenuItem onClick={() => handleButtonClick('/profile')} sx={styles.menuItem} >
              <ListItemIcon sx={styles.menuItemIcon}>
                <AccountCircleOutlined fontSize="small" />
              </ListItemIcon>
              <ListItemText sx={styles.btnText} primary="Profile" />
            </MenuItem>
            <MenuItem onClick={() => handleLogout()} sx={styles.menuItem} >
              <ListItemIcon sx={styles.menuItemIcon}>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText sx={styles.btnText} primary="Logout" />
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

                onClick={() => handleButtonClick('/')}
                sx={selectedButton === '/' ? styles.selectedListItem : null}
              >
                <ListItemIcon sx={selectedButton === '/' ? styles.selectedListItemIcon : styles.listItemIcon}><HomeIcon /></ListItemIcon>
                <ListItemText sx={selectedButton === '/' ? styles.selectedBtnText : styles.btnText} primary="Home" />
              </ListItemButton>
              <ListItemButton
                sx={selectedButton === '/profile' ? styles.selectedListItem : null}
                onClick={() => handleButtonClick('/profile')}>
                <ListItemIcon sx={selectedButton === '/profile' ? styles.selectedListItemIcon : styles.listItemIcon}><AccountCircleOutlined /></ListItemIcon>
                <ListItemText sx={selectedButton === '/profile' ? styles.selectedBtnText : styles.btnText} primary="Profile" />
              </ListItemButton>
              <ListItemButton
                onClick={() => handleButtonClick('/favorites')}
                sx={selectedButton === '/favorites' ? styles.selectedListItem : null}
              >
                <ListItemIcon sx={selectedButton === '/favorites' ? styles.selectedListItemIcon : styles.listItemIcon}><FavoriteIcon /></ListItemIcon>
                <ListItemText sx={selectedButton === '/favorites' ? styles.selectedBtnText : styles.btnText} primary="Favorites" />
              </ListItemButton>
              <ListItemButton
                sx={selectedButton === '/appointments' ? styles.selectedListItem : null}
                onClick={() => handleButtonClick('/appointments')}>
                <ListItemIcon sx={selectedButton === '/appointments' ? styles.selectedListItemIcon : styles.listItemIcon}><EventNoteIcon /></ListItemIcon>
                <ListItemText sx={selectedButton === '/appointments' ? styles.selectedBtnText : styles.btnText} primary="Appointments" />
              </ListItemButton>
              <ListItemButton
                sx={selectedButton === '/contact' ? styles.selectedListItem : null}
                onClick={() => handleButtonClick('/contact')}>
                <ListItemIcon sx={selectedButton === '/contact' ? styles.selectedListItemIcon : styles.listItemIcon}><MailIcon /></ListItemIcon>
                <ListItemText sx={selectedButton === '/contact' ? styles.selectedBtnText : styles.btnText} primary="Contact Us" />
              </ListItemButton>
              <ListItemButton
                sx={selectedButton === '/about' ? styles.selectedListItem : null}
                onClick={() => handleButtonClick('/about')}>
                <ListItemIcon sx={selectedButton === '/about' ? styles.selectedListItemIcon : styles.listItemIcon}><InfoIcon /></ListItemIcon>
                <ListItemText sx={selectedButton === '/about' ? styles.selectedBtnText : styles.btnText} primary="About Us" />
              </ListItemButton>
              <ListItemButton
                sx={selectedButton === '/logout' ? styles.selectedListItem : null}
                onClick={() => handleLogout()}
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
          sx={selectedButton === '/' ? styles.selectedBtn : styles.btn}
          onClick={() => handleButtonClick('/')}
        >
          Home
        </Button>
        <Button
          sx={selectedButton === '/favorites' ? styles.selectedBtn : styles.btn}
          onClick={() => handleButtonClick('/favorites')}
        >
          Favorites
        </Button>
        <Button sx={styles.btn}>Appointments</Button>
        <Button sx={styles.btn}>About Us</Button>
        <Button sx={styles.btn}>Contact Us</Button>
      </Box>

      <Outlet />
    </>
  );
}

const styles = {
  menuItemIcon: {
    minWidth: '25px',
    color: 'inherit',
  },
  menuItem: {
    color: "#2854c3",
    textTransform: 'none',
    border: 'none',
    borderRadius: '0px',
    transition: '0.3s',

    '&:hover': {
      backgroundColor: '#2854C3',
      color: '#fff',

    },
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

export default NavBar;