import api from "../../api";


const GetHistory = async (patientId) => {
    try {
        const response = await api.get(`http://localhost:5000/doctor/patient/history/${patientId}`);
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