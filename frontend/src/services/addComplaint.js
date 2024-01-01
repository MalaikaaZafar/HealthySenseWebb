import api from "./api";




const addComplaint = async (patId, complaint) => {
    try {
        const body = {
            description: complaint,

        };
        const res = await api.post(`/doctor/complaint/${patId}`, body, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
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

export default addComplaint;