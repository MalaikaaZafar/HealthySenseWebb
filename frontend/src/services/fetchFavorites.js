import axios from 'axios';

const fetchFavorites = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:3000/favorites`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export default fetchFavorites;