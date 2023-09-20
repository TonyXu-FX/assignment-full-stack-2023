import axios from 'axios';

const baseUrl = "http://localhost:8082/api";

export const getEmployees = async () => {
  const res = await axios.get(`${baseUrl}/employees`);
  return res.data;
}

export const editEmployee = (employee) => {
  return axios.put(
    `${baseUrl}/employees/${employee._id}`,
    employee
  );
}

export const addEmployee = (employee) => {
  return axios.post(
    `${baseUrl}/employees`,
    employee
  )
}
