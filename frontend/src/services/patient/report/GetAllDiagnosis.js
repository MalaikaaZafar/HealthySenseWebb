import axios from "axios";

const GetAllDiagnosis = async (patientId) => {
    try {
        const response = await axios.get(`http://localhost:5000/patient/diagnosis/${patientId}`);
        const data = await response.data;
        if (data.message){
            return [];
        }
        return data.Diagnosis;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export default GetAllDiagnosis;