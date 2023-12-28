import axios from 'axios';

const sendMessage = async (message, secondary) => {
    try {
      const response = await axios.post(`http://localhost:3000/messages`, {message, secondary});
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
export default sendMessage;