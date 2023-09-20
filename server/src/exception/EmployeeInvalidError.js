class EmployeeInvalidError extends Error {
  constructor(message) {
    super(message);
    this.name = "EmployeeInvalidError";
  }
}

export default EmployeeInvalidError;
