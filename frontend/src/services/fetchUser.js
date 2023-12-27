import axios from 'axios';

const fetchUser = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3000/users/${id}`);
        const fetchedUser = await response.data;

        return fetchedUser;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export default fetchUser;

