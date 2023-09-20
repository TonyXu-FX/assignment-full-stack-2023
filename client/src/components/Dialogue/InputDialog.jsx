import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

/**
 * A dialog containing some content and the option to "submit" or "close"
 * visible - the visibility of the dialog
 * title - title shown in the top-left corner
 * children - the main content of the dialog
 * handleClose - called when the dialog is closed through anymeans
 * handleSubmit - called when the submit button is pressed
 * isDelete - when true, the submit button becomes a delete button
 * isError - toggles the error notification of the dialog
 * errorMsg - the message displayed in the above notification
 */
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
          variant={isDelete ? "danger" : "success"}
        >
          {isDelete ? "Delete" : "Submit"}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default InputDialog;
