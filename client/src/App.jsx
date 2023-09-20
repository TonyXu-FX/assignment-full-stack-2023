import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { BsPencilFill, BsTrashFill } from 'react-icons/bs';
import InputDialog from './components/Dialogue/InputDialog';
import './App.css';
import { addEmployee, deleteEmployee, editEmployee, getEmployees } from './helpers/api';
import { isEmployeeValid } from './helpers/helpers';
import * as Constants from './helpers/constants';

/**
 * The table displaying all employee info
 * employees - list of employees to display
 * setCurrentEmp - function for setting which employee to edit
 * setCurrEmpIndex - function for setting the index of the above employee
 * setEmployeeDialogVisible - for toggling the edit/add employee dialogue
 * setDeleteDialogVisible - for toggling the delete employee dialogue
 */
const EmployeeTable = ({ 
  employees,
  setCurrentEmp,
  setCurrEmpIndex,
  setEmployeeDialogVisible,
  setDeleteDialogVisible,
}) => {
  const onEdit = (index) => {
    const editedEmp = employees[index];
    setCurrEmpIndex(index);
    setCurrentEmp(editedEmp);
    setEmployeeDialogVisible(true);
  }

  const onDelete = (index) => {
    const deletedEmp = employees[index];
    setCurrEmpIndex(index);
    setCurrentEmp(deletedEmp);
    setDeleteDialogVisible(true);
  }

  const mapEmployeeToRow = (employee, index) => (
    <tr key={employee._id}>
      <td>{employee.firstName}</td>
      <td>{employee.lastName}</td>
      <td>{'$' + Number(employee.salary).toLocaleString('en-US')}</td>
      <td>
        <button className='icon-btn' onClick={() => onEdit(index)}><BsPencilFill className='text-warning' /></button>
        <button className='icon-btn' onClick={() => onDelete(index)}><BsTrashFill className='text-danger' /></button>
      </td>
    </tr>
  );

  return (
    <table className='employee-table'>
      <thead className='emp-table-header'>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Salary</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {employees.map((employee, index) => mapEmployeeToRow(employee, index))}
      </tbody>
    </table>
  )
}

/** 
 * The form used for editing/adding an employee
 * dialogVisible - whether this form is visible
 * currentEmp - the employee being edited if there is one, null o/w
 * onSuccess - called when add/edit succeeds
 * onFailure - called when add/edit fails
 */
const EmployeeForm = ({ 
  dialogVisible,
  setDialogVisible,
  currentEmp,
  onSuccess,
  onFailure,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [salary, setSalary] = useState(0);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (currentEmp !== null) {
      setFirstName(currentEmp.firstName);
      setLastName(currentEmp.lastName);
      setSalary(currentEmp.salary);
    }
  }, [currentEmp])

  const handleClose = () => {
    setDialogVisible(false);
    setIsError(false);
    setFirstName("");
    setLastName("");
    setSalary("");
  }

  const handleSubmit = () => {
    const newEmp = {
      firstName: firstName,
      lastName: lastName,
      salary: salary,
      _id: currentEmp ? currentEmp._id : undefined
    }
    if (!isEmployeeValid(newEmp)) {
      setIsError(true);
      return;
    }

    if (currentEmp !== null) {
      editEmployee(newEmp).then(() => onSuccess(newEmp)).catch(onFailure);
    } else {
      addEmployee(newEmp).then(res => onSuccess(res.data)).catch(onFailure);
    }
    handleClose();
  }

  return (
    <InputDialog
      visible={dialogVisible}
      title={currentEmp !== null ? Constants.EDIT_EMP : Constants.ADD_EMP}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      isError={isError}
      errorMsg={Constants.EMP_INVALID_FIELD_MSG}
    >
      <Form>
        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control onChange={e => setFirstName(e.target.value)} value={firstName} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control onChange={e => setLastName(e.target.value)} value={lastName} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="salary">
          <Form.Label>Salary</Form.Label>
          <Form.Control onChange={e => setSalary(e.target.value)} value={salary} />
        </Form.Group>
      </Form>
    </InputDialog>
  );
}

/**
 * Confirmation dialogue for deleting employee
 * dialogVisible - whether this form is visible
 * currentEmp - the employee being deleted
 * onSuccess - called when delete succeeds
 * onFailure - called when delete fails
 */
const DeleteForm = ({
  dialogVisible,
  setDialogVisible,
  currentEmp,
  onSuccess,
  onFailure
}) => {
  const handleSubmit = () => {
    deleteEmployee(currentEmp).then(onSuccess).catch(onFailure);
    handleClose();
  }

  const handleClose = () => {
    setDialogVisible(false)
  }

  return (
    <InputDialog
      visible={dialogVisible}
      title={Constants.DELETE_EMP}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      isDelete
    >
      {currentEmp !== null ?
        Constants.confirmEmpDelete(currentEmp.firstName, currentEmp.lastName) :
        null}
    </InputDialog>
  );
}

function App() {
  const [employees, setEmployees] = useState([]);
  
  const [employeeDialogVisible, setEmployeeDialogVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  
  // Used to hold the employee being edited/deleted, if there is one
  const [currentEmp, setCurrentEmp] = useState(null);
  const [currEmpIndex, setCurrEmpIndex] = useState(-1);

  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onAddEmployee = () => {
    setCurrEmpIndex(-1);
    setCurrentEmp(null);
    setEmployeeDialogVisible(true);
  }

  const onEmployeeSuccess = (newEmp) => {
    if (currentEmp !== null) {
      // If currentEmp is not null, editing an employee
      setEmployees(employees.map((emp, index) => {
        if (index === currEmpIndex)
          return newEmp;
        return emp;
      }))
    } else {
      // currentEmp is not, adding an employee
      setEmployees([...employees, newEmp])
    }
  }

  const onEmployeeFail = () => {
    setIsError(true);
    if (currentEmp !== null) {
      // If currentEmp is not null, editing an employee
      setErrorMsg(Constants.EDIT_EMP_FAILED);
    } else {
      // currentEmp is not, adding an employee
      setErrorMsg(Constants.ADD_EMP_FAILED);
    }
  }

  const onDeleteSuccess = () => {
    setEmployees(employees.filter((_, index) => index !== currEmpIndex))
  }

  const onDeleteFail = () => {
    setIsError(true);
    setErrorMsg(Constants.DELETE_EMP_FAILED);
  }

  useEffect(() => {
    getEmployees()
      .then(emps => setEmployees(emps))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
      <h2>EMPLOYEES</h2>
      <EmployeeTable
        employees={employees}
        setCurrentEmp={setCurrentEmp}
        setEmployeeDialogVisible={setEmployeeDialogVisible}
        setCurrEmpIndex={setCurrEmpIndex}
        setDeleteDialogVisible={setDeleteDialogVisible}
      />
      <Button
        className='add-emp-btn'
        variant='success'
        onClick={onAddEmployee}
      >
        Add Employee
      </Button>
      <EmployeeForm
        dialogVisible={employeeDialogVisible}
        setDialogVisible={setEmployeeDialogVisible}
        currentEmp={currentEmp}
        setCurrentEmp={setCurrentEmp}
        onSuccess={onEmployeeSuccess}
        onFailure={onEmployeeFail}
      />
      <DeleteForm
        dialogVisible={deleteDialogVisible}
        setDialogVisible={setDeleteDialogVisible}
        currentEmp={currentEmp}
        setCurrentEmp={setCurrentEmp}
        onSuccess={onDeleteSuccess}
        onFailure={onDeleteFail}
      />
      {
        isError ? 
          <Alert
            variant='danger'
            onClose={() => setIsError(false)}
            dismissible
          >
            {errorMsg}
          </Alert> :
          null
      }
    </div>
  );
}

export default App;
