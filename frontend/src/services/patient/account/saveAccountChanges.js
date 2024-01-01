import axios from "axios";

const saveAccountChanges = async (id, form_data) => {
    try {
        const response = await axios.post(`http://localhost:5000/patient/update/${id}`, form_data);
        const data = response.data;
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

export default saveAccountChanges;