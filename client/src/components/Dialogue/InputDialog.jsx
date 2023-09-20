import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const InputDialog = ({ visible, title, children, handleClose, handleSubmit, isDelete }) => {
  return (
    <Modal onHide={handleClose} show={visible}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {children}
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
