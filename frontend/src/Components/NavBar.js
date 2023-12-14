import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import logo from './healthySenseLogo.svg';
import './NavBar.css';
import { ButtonGroup } from '@mui/material';

function NavBar() {
  return (
    <header>
      <div className="top">
        <div className="logo">
          <img src={logo} className="healthySenseLogo" alt="logo" />
          <h2>HealthySense</h2>
        </div>
        <div className="pfp">
         <Avatar style={{ marginRight:'5%', marginTop:'2%', height: '65px', width: '65px', float: 'right' }}>H</Avatar>
        </div>
      </div>
      <div className="navBar">
        <ButtonGroup variant="text" aria-label="text button group">
        <Button >Home</Button>
        <Button >Book Appointment</Button>
        <Button>Appointments</Button>
        <Button>About Us</Button>
        <Button>Contact Us</Button>
        </ButtonGroup>
      </div>
    </header>
  );
}

export default NavBar;
