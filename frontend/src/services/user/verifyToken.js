import Cookies from 'js-cookie';
import api from '../api';

export const verifyToken = async () => {
    const token = Cookies.get('token');
    console.log(token);
    if (!token) {
        return false;
    }
    try {
        const response = await api.get('/verifyuser');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return false;
    }
};