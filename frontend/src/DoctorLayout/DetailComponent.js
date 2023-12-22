import './AppointmentDetail.css';

function DetailComponent() {
  return (
    <div className="appointmentDetails">
        <div className='topComponent'>
       
    <div className="detail">
    <p className="heading">Appointment Timing</p>
      <p>Morning</p>
      <p>Today-21 January, Friday</p>
      <p style={{color: "#2854C3", fontWeight: "bold"}}>10:30 am - 11:30 am</p>
      </div>
       <div className="detail" >
       <p className="heading">Fee information </p>
              <p  style={{color: "#2854C3", fontWeight: "bold"}}>Paid</p>
              <p>1000 Rs.</p>
        </div>
        
        </div>
      <div >
       <p className="heading">Problem Description </p>
       <div className="detail">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.</p>
        </div>
      </div>
      <div >
      
      </div>
    </div>
  );
}

export default DetailComponent;
