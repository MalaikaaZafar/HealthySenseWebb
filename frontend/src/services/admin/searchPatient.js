import axios from 'axios';

const searchPatients = async (searchText, sortDirection, bloodGroupFilter, skip) => {
    try {
        const params = {
            query: searchText,
            sortOrder: sortDirection,
            skip: skip,
        };
        if (bloodGroupFilter !== '') {
            params.bloodGroup = bloodGroupFilter;
        }

        const response = await axios.get(`http://localhost:3000/admin/patient/search`, {
            params: params
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        return -1;
    }
};

export default searchPatients;
