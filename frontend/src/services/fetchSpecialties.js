import axios from 'axios';

const fetchSpecialties = async () => {
    const data = await axios.get('http://localhost:3000/doctor/specialties');
    const specialties = data.data.specialties;
    console.log(specialties);
    return specialties;
};

export default fetchSpecialties;