import axios from 'axios';

const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/messages`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

export default fetchMessages;