import axios from "axios";

const getAppointmentData = async (appointmentID) => {
    try {
        const response = await axios.get(`http://localhost:3000/doctor/appointments/${appointmentID}`);
        const data = response.data;
        console.log(data.AppointmentDetail);
        data.AppointmentDetail.date = data.AppointmentDetail.date.slice(0, 10);
        if(data.message==="Exists")
        {
            console.log("Exists")
            return data;
        }
        return data.AppointmentDetail;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}

export default getAppointmentData;