import api from "./api";


const banUser = async (id) => {
    try {
        const res = await api.put(`/admin/${id}`);
        console.log(res);
        if (res.status === 200) {
            return true;
        }
        return false;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export default banUser;