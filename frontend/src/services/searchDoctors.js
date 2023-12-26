import axios from 'axios';

const searchDoctors = async (searchText, selectedButton, sortDirection, specialtyFilter, minRating, skip) => {
    try {
        const params = {
            query: searchText,
            sort: selectedButton,
            sortOrder: sortDirection,
            skip: skip,
        };
        if (specialtyFilter !== '') {
            params.specialty = specialtyFilter;
        }
        if (minRating !== 0) {
            params.minRating = minRating;
        }

        const response = await axios.get(`http://localhost:3000/doctor/search`, {
            params: params
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export default searchDoctors;
