import axios from 'axios';
import * as Constants from './constants';

const baseUrl = "http://localhost:8082/api";

/**
 * Return a list of all employees
 */
export const getEmployees = async () => {
  const res = await axios.get(baseUrl + Constants.EMP_ENDPOINT);
  return res.data;
}

/**
 * Update the info of the given employee in the db
 * Return a promise with the results of the call
 */
export const editEmployee = (employee) => {
  return axios.put(
    `${baseUrl}${Constants.EMP_ENDPOINT}/${employee._id}`,
    employee
  );
}


/**
 * Add a given employee to the db
 * Return a promise with the results of the call
 *   In particular, the added employee with their new _id
 */
export const addEmployee = (employee) => {
  return axios.post(
    baseUrl + Constants.EMP_ENDPOINT,
    employee
  )
}

/**
 * Delete the given employee from the db
 * Return a promise with the results of the call
 */
export const deleteEmployee = (employee) => {
  return axios.delete(`${baseUrl}${Constants.EMP_ENDPOINT}/${employee._id}`,)
}
