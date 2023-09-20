export const DELETE = "Delete";
export const SUBMIT = "SUBMIT";

// API
export const EMP_ENDPOINT = "/employees"

// Employees Table Page
export const EDIT_EMP = "Edit Employee";
export const ADD_EMP = "Add Employee";
export const DELETE_EMP = "Delete Employee"
export const EMP_INVALID_FIELD_MSG = "Error: Some field is invalid";
export const confirmEmpDelete = (firstName, lastName) => `Are you sure you want to delete ${firstName} ${lastName}?`;
export const EDIT_EMP_FAILED = "Failed to edit employee";
export const ADD_EMP_FAILED = "Failed to add employee";
export const DELETE_EMP_FAILED = "Failed to delete employee";