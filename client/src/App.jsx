import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { BsPencilFill, BsTrashFill } from 'react-icons/bs';
import InputDialog from './components/Dialogue/InputDialog';
import './App.css';
import { addEmployee, deleteEmployee, editEmployee, getEmployees } from './helpers/api';
import { isEmployeeValid } from './helpers/helpers';

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
      title={currentEmp !== null ? "Edit Employee" : "Add Employee"}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      isError={isError}
      errorMsg={"Error: Some field is invalid"}
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
      title={"Delete Employee"}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      isDelete
    >
      {currentEmp !== null ?
        `Are you sure you want to delete ${currentEmp.firstName} ${currentEmp.lastName}?` :
        null}
    </InputDialog>
  );
}

function App() {
  const [employees, setEmployees] = useState([]);
  
  const [employeeDialogVisible, setEmployeeDialogVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
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
      setEmployees(employees.map((emp, index) => {
        if (index === currEmpIndex)
          return newEmp;
        return emp;
      }))
    } else {
      setEmployees([...employees, newEmp])
    }
  }

  const onEmployeeFail = () => {
    setIsError(true);
    if (currentEmp !== null) {
      setErrorMsg("Failed to edit employee");
    } else {
      setErrorMsg("Failed to add employee");
    }
  }

  const onDeleteSuccess = () => {
    setEmployees(employees.filter((_, index) => index !== currEmpIndex))
  }

  const onDeleteFail = (err) => {
    setIsError(true);
    setErrorMsg("Failed to delete employee");
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
