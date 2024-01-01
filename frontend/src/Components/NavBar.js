import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import logo from './healthySenseLogo.png';
import './NavBar.css';
import { ButtonGroup } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Outlet, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import zIndex from '@mui/material/styles/zIndex';



function NavBar() {
  const navigate = useNavigate();
  return (
    <>
      <header>
        <Box className="top">
          <Box className="logo">
            <img src={logo} className="healthySenseLogo" alt="logo" />
            <h2>HealthySense</h2>
          </Box>
          <Box className="pfp">
            <Avatar style={{ marginRight: '5%', marginTop: '2%', height: '65px', width: '65px', float: 'right' }}>H</Avatar>
          </Box>
        </Box>
        <Box className="navBar">
          <ButtonGroup variant="text" aria-label="text button group">
            <Button style={{ color: "#979797", textTransform: 'none', borderRight: 'none' }}
            onClick={() => navigate('/')}
            >Home</Button>
            <Button style={{ color: "#979797", textTransform: 'none', borderRight: 'none' }}
              onClick={() => navigate('/favorites')}
            >Favorites</Button>
            <Button style={{ color: "#979797", textTransform: 'none', borderRight: 'none' }}>Book Appointment</Button>
            <Button style={{ color: "#979797", textTransform: 'none', borderRight: 'none' }}>Appointments</Button>
            <Button style={{ color: "#979797", textTransform: 'none', borderRight: 'none' }}>About Us</Button>
            <Button style={{ color: "#979797", textTransform: 'none', borderRight: 'none' }}>Contact Us</Button>
          </ButtonGroup>
        </Box>
      </header>
      <Outlet />
    </>
  );
}

export default NavBar;
