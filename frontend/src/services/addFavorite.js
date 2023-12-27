import axios from 'axios';

const addFavorite = async (doctorId) => {
    try {
        console.log(doctorId);
        const token = localStorage.getItem('token');
        const response = await axios.post(`http://localhost:3000/favorites/${doctorId}`, {}, {
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