import axios from "axios";

const SavePayment = async (id) => {
    try {
        const response = await axios.post(`http://localhost:5000/payment/create-payment/${id}`);
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