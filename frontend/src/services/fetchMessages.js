import axios from 'axios';

const fetchMessages = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/messages/${id}`);
      console.log(response.data); 
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

export default fetchMessages;