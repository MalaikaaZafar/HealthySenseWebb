import api from "../api";

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

        const response = await api.get(`/admin/patient/search`, {
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
