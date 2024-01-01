import axios from "axios";

const saveDiagnosis = async (id, diagnosis) => {
    try {
        const response = await axios.post(`http://localhost:5000/doctor/appointments/${id}/diagnosis`, diagnosis);
        const data = response.data;
        if (data.ID) {
            return data.ID;
        }
        else {
            return null;
        }
    }
    catch (err) {
        console.log(err);
        return null;
    }
}
export default saveDiagnosis;
