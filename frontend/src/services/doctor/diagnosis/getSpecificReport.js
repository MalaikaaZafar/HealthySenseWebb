import api from "../../api";



const GetSpecificReport = async (appointment) => {
    try {
        const response = await api.get(`http://localhost:5000/report/appointment/${appointment}`);
        const data = await response.data;
        if (data.message === 'Diagnosis not found') {
            return {message: 'Diagnosis not found'};
        }
        return { data: data.data };
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default GetSpecificReport;