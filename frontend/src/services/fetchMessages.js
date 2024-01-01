import api from "./api";

const fetchMessages = async (id) => {
    try {
      const response = await api.get(`/messages/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

export default fetchMessages;