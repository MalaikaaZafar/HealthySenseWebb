import api from "../../api";


const GetReport = async (reportId) => {
    try {
        const response = await api.get(`/report/appointment/${reportId}`);
        const data = await response.data;
        if (data.message && data.message === 'Diagnosis not found') {
            return { data: null, message: 'Diagnosis not found' };
        }
        return { data: data.data };
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default GetReport;