import api from './api';

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

        const response = await api.get(`/doctor/search`, {
            params: params
        });
        console.log("nigga works");
        return response.data;
    } catch (error) {
        console.error(error);
        return -1;
    }
};

export default searchDoctors;
