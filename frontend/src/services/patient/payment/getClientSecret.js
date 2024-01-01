import axios from "axios";

const GetClientSecret = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3000/payment/create-payment-intent/${id}`);
        const data = response.data;
        console.log(data);
        return data;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}

export default GetClientSecret;