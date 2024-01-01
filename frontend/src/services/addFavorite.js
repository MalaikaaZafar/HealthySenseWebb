import api from './api';

const addFavorite = async (doctorId) => {
    try {
        console.log(doctorId);
        const token = localStorage.getItem('token');
        const response = await api.post(`/favorites/${doctorId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export default addFavorite;