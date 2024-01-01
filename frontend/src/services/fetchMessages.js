import api from "./api";

const fetchMessages = async () => {
    try {
      const response = await api.get(`/messages`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

export default fetchMessages;