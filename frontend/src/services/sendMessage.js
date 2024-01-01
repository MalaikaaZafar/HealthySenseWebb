import api from "./api";

const sendMessage = async (message, secondary) => {
  try {
    const response = await api.post(`/messages`, { message, secondary });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export default sendMessage;