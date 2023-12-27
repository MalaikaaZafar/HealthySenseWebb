import axios from 'axios';

const removeFavorite = async (doctorId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`http://localhost:3000/favorites/${doctorId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            return true;
        }
        return false;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export default removeFavorite;

