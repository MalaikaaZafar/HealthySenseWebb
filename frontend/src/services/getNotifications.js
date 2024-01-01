import api from "./api";


const getNotifications = async () => {
    try {
        const res = await api.get(`/notifications`);
        console.log(res);
        if (res.status === 200) {
            return res.data;
        }
        return false;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export default getNotifications;