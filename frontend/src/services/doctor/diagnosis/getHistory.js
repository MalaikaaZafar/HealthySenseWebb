import api from "../../api";


const GetHistory = async (appid,patientId) => {
    try {
        const response = await api.get(`/doctor/${appid}/history/${patientId}`);
        const data = await response.data;
        if(data.History === null){
            if(data.app === null){
                return null;
            }
            else{
                return { data: [] , appoinment: data.app};
            }
        }
        return { data: data.History , appoinment: data.app};
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default GetHistory;