import api from "./api";

const fetchSpecialties = async () => {
    const data = await api.get('/doctor/specialties');
    const specialties = data.data.specialties;
    console.log(specialties);
    return specialties;
};

export default fetchSpecialties;