import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

const FooterBox = styled(Box)({
    backgroundColor: '#2854C3',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60px',
    width: '100%',
});

function Footer() {
    return (
        <FooterBox>
            <Typography variant="body1">©HealthySense</Typography>
            <Typography variant="body2">All rights reserved</Typography>
        </FooterBox>
    );
}

export default Footer;