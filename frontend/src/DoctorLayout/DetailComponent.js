import './AppointmentDetail.css';

function DetailComponent({timing, problem, fee, feeStatus}) {
  return (
    <div className="appointmentDetails">
    <div className="detail">
    <p className="heading">Appointment Timing</p>
      <p>Morning</p>
      <p>Today-21 January, Friday</p>
      <p style={{color: "#2854C3", fontWeight: "bold"}}>{timing}</p>
      </div>
      <div >
       <p className="heading">Problem Description </p>
       <div className="detail">
              <p>{problem}</p>
        </div>
      </div>
      <div >
      <div className="detail" style={{marginBottom: '0px'}}>
       <p className="heading">Fee information </p>
              <p  style={{color: "#2854C3", fontWeight: "bold"}}>{feeStatus}</p>
              <p>{fee}</p>
        </div>
      </div>
    </div>
  );
}

export default DetailComponent;
