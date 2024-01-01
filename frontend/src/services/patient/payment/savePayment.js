import api from "../../api";


const SavePayment = async (id) => {
    try {
        const response = await api.post(`/payment/create-payment/${id}`);
        const data = response.data;
        console.log(data)
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

export default SavePayment;