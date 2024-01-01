import axios from "axios";

const GetHistory = async (patientId) => {
    try {
        const response = await axios.get(`http://localhost:3000/doctor/patient/history/${patientId}`);
        const data = await response.data;
        if(data.History === null){
            return null;
        }
        return { data: data.History };
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default GetHistory;