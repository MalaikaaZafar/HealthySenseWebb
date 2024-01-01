import api from "../../api";


const saveDiagnosis = async (id, diagnosis) => {
    try {
        const response = await api.post(`/doctor/appointments/${id}/diagnosis`, diagnosis);
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
