import api from "../../api";


const getAccountDetails = async (id) => {
    try {
        const response = await api.get(`/patient/account/${id}`);
        const data = response.data;
        data.user.dob = data.user.dob.slice(0, 10);
        if (data.user.phoneNumber[0] === '+') {
            data.user.phoneNumber = data.user.phoneNumber.slice(3);
        }
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default getAccountDetails;