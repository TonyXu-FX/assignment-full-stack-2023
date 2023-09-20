import axios from 'axios';

const baseUrl = "http://localhost:8082/api";

export const getEmployees = async () => {
  const res = await axios.get(`${baseUrl}/employees`);
  return res.data;
}