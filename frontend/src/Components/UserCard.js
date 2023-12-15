import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';


function UserCard({type, width})
{
    
    return(
        <Card variant='outlined' style={{width:{width}, background:'#F4F9FB', borderRadius:'10px'}}>
            <div className='user-card-img'>
            <Avatar style={{ margin:'1%',marginLeft:'5%',marginRight:'5%', height: '75px', width: '75px', float: 'left' }}>H</Avatar>
                {type==='doctor' ? <DoctorDetails/> : <PatientDetails/>}
            </div>
        </Card>
    )
}

function PatientDetails()
    {
        return (
            <div className="patientDetails" style={{margin:'3%'}}>
            <div className="docName"><p>Name: Patient name</p></div>
            <div className="docSpeciality"><p>Age: 5</p></div>
            <div className="docExperience"><p>Phone: 12345678910</p></div>
          </div>
        )
    }

function DoctorDetails()
    {
        return (
            <div className="patientDetails" style={{margin:'3%'}}>
            <div className="docName"><p>Dr. Amna Irum</p></div>
            <div className="docSpeciality"><p>Nephrologist</p></div>
            <div className="docExperience"><p>5+ Years of Experience</p></div>
          </div>
        )
    }

export default UserCard;