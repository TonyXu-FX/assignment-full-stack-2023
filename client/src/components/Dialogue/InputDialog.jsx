import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const InputDialog = ({ 
  visible,
  title, 
  children, 
  handleClose, 
  handleSubmit, 
  isDelete,
  isError,
  errorMsg
}) => {
  return (
    <Modal onHide={handleClose} show={visible}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {children}
        {isError ? <Alert variant='danger'>{errorMsg}</Alert> : null}
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={handleClose} variant="secondary">Close</Button>
        <Button 
          onClick={handleSubmit}
          variant={isDelete ? "danger" : "primary"}
        >
          {isDelete ? "Delete" : "Submit"}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default InputDialog;
