import api from "../../api";


const updateDiagnosis = async (id, diagnosis) => {
    try {
        const response = await api.put(`/doctor/diagnosis/update/${id}`, diagnosis);
        const data = response.data;
        if (data.message === "Success") {
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