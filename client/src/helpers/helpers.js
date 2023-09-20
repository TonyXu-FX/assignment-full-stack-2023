export const isEmployeeValid = (employee) => {
  return employee.firstName 
      && employee.lastName 
      && employee.salary != undefined
      && employee.salary >= 0;
}