import { Card, Container, Box, Typography, Button } from '@mui/material';
import TimeIcon from '@mui/icons-material/AccessTime';
import PatientIcon from '@mui/icons-material/PersonOutlineOutlined';
import ProblemIcon from '@mui/icons-material/DescriptionOutlined';
import FeeIcon from '@mui/icons-material/AttachMoneyOutlined';
import MessageIcon from '@mui/icons-material/MessageOutlined';
import ReschedIcon from '@mui/icons-material/EditCalendarOutlined';
import CancelIcon from '@mui/icons-material/EventBusyOutlined';

import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import { style } from '@mui/system';


const DetailComponent = ({appt}) => {
  const  navigate  = useNavigate();
  const reschedAppt = () => {
    navigate(`/patient/appointments/reschedule/${appt._id}`);
  };

  const cancelAppt = () => {
    navigate(`/patient/appointments/cancel/${appt._id}`);
  };


  return (
    <Container x={{paddingLeft:0, paddingRight:0}}>
      <Card sx={{ marginTop: 2, padding:2, display: 'flex', flexDirection: 'row', background:'#eeeeee' }}>
        <Box display='flex' flexDirection='column' alignItems='flex-start' sx={{margin:4, width:'100%'}}>
        <Box display="flex" alignItems="center" sx={styles.heading}>
            <TimeIcon sx={{ marginRight: 1 }} />
            <Typography variant="h6">Appointment Timing</Typography>
          </Box>
         <Box display="flex" flexDirection="column" sx={{ marginLeft: 4 }}>
            <Typography variant="body1">{appt.time}</Typography>
            <Typography variant="body1">{format(new Date(appt.date), 'yyyy-MM-dd')}</Typography>
          </Box>
          <Box display="flex" alignItems="center" sx={styles.heading}>
            <PatientIcon sx={{ marginRight: 1 }} />
            <Typography variant="h6" >Doctor Information</Typography>
          </Box>
          <Box display="flex" flexDirection="column" sx={{ marginLeft: 4 }}>
            <Typography variant="body1">{appt.doctorId.specialization}</Typography>
            <Typography variant="body1">{appt.doctorId.experience} Years of Experience</Typography>
            <Typography variant="body1">{appt.doctorId.workingHours}</Typography>
          </Box>
          <Box display="flex" alignItems="center" sx={styles.heading}>
            <ProblemIcon sx={{ marginRight: 1 }} />
            <Typography variant="h6" >Problem Description</Typography>
          </Box>
          <Box display="flex" flexDirection="column" sx={{ marginLeft: 4 }}>
            <Typography variant="body1">{appt.problem}</Typography>
          </Box>
          <Box display="flex" alignItems='center' sx={styles.heading}>
            <FeeIcon sx={{ marginRight: 1 }} />
            <Typography variant="h6" >Fee Information</Typography>
          </Box>
          <Box display="flex" flexDirection="column" sx={{ marginLeft: 4 }}>
            <Typography color="primary" fontWeight="bold">{appt.paymentStatus}</Typography>
            {
              appt.doctorId.session.map((sess) => {
                if (sess.type === appt.type) {
                  return <Typography variant="body1">Rs. {sess.fee}</Typography>
                }
              })
            }
          </Box>
        </Box>
        <Box sx={{margin:4, width:'100%'}}>
          <Box display="flex" flexDirection="column" >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar defaultValue={dayjs(appt.date)} readOnly disabled
                             sx={{ '& .Mui-selected': {  backgroundColor: appt?.status==="Cancelled"?'red': appt?.status==="Booked"?"#2854C3":"green" } }}/>
            </LocalizationProvider>
            <Box display="flex" justifyContent="center">
          {appt &&
           appt.status ==="Booked" && (
              <Box display="flex" flexDirection="row" justifyContent="center">
                 <Button onClick={reschedAppt} variant="contained" sx={styles.button} startIcon={<MessageIcon/>}>Chat</Button>
                <Button onClick={reschedAppt} variant="contained" sx={styles.button} startIcon={<ReschedIcon/>}>Reschedule</Button>
                <Button onClick={cancelAppt} variant="contained" sx={styles.button} startIcon={<CancelIcon/>}>Cancel</Button>
              </Box>)}
          {appt && appt.status === "Completed" && (
             <Box display="flex" flexDirection="row" justifyContent="center">
             <Button onClick={reschedAppt} variant="contained" sx={styles.button} startIcon={<MessageIcon/>}>Diagnosis</Button>
            <Button onClick={reschedAppt} variant="contained" sx={styles.button} startIcon={<ReschedIcon/>}>Report</Button>
          </Box>
          )}
        </Box>
          </Box>
        </Box>
      </Card>
    </Container>
  );
}


const styles={
  heading:{
      marginTop:2,
      marginBottom:1,
  },

  button:{
    padding:2, width:"100%", m:1, textAlign:'left', textTransform:'none', background:'#2854C3',
    "&:hover": {
      background: "#2854C3",
      boxShadow: "0 0 0 0.2rem #2854C3",
    }
  }

}
export default DetailComponent;