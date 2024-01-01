import api from "./api";

const fetchUser = async (id) => {
    try {
        const response = await api.get(`/users/${id}`);
        const fetchedUser = await response.data;

        return fetchedUser;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export default fetchUser;

