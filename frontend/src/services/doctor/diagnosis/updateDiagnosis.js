import api from "../../api";


const updateDiagnosis = async (id, diagnosis) => {
    try {
        const response = await api.post(`/doctor/diagnosis/update/${id}/diagnosis`, diagnosis);
        const data = response.data;
        if (data.success) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}
export default updateDiagnosis;