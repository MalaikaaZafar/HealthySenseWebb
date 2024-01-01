import api from './api';

const fetchFavorites = async () => {
    try {
        const response = await api.get(`/favorites`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export default fetchFavorites;