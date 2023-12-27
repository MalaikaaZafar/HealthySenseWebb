import axios from 'axios';

const searchDoctors = async (searchText, sortDirection, specialtyFilter, skip) => {
    try {
        const params = {
            query: searchText,
            sortOrder: sortDirection,
            skip: skip,
        };
        if (specialtyFilter !== '') {
            params.specialty = specialtyFilter;
        }

        const response = await axios.get(`http://localhost:3000/admin/doctor/search`, {
            params: params
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        return -1;
    }
};

export default searchDoctors;
