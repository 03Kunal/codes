import React from 'react'
import { Alert } from 'react-bootstrap';

function CommonAlert(props) {
 const {alertColor, showAlert, hidesetAlert, alertContent} = props;
  return (
    <div>
      <Alert
        show={showAlert}
        variant={alertColor}
        onClose={hidesetAlert}
        dismissible
      >
        <Alert.Heading>{alertContent}</Alert.Heading>
      </Alert>
    </div>
  );
}

export default CommonAlert