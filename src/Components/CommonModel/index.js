import React from "react";
import { Button, Modal } from "react-bootstrap";

function CommonModel(props) {
  const {
    toggleBtn,
    handelClick,
    modalTitle,
    modalBody,
    settoggleBtn,
    handelClickCancel,
    styleBtn,
    styleBtnBack,
  } = props;

  return (
    <div>
     
      <Modal
        show={toggleBtn}
        onHide={() => settoggleBtn(false)}
        style={{ top: "250px" }}
        className="commonModal"
      >
        <div className="text-center">
          <Modal.Title className="fw-bolder pt-4">{modalTitle}</Modal.Title>
          <Modal.Body >{modalBody}</Modal.Body>
        </div>
        <Modal.Footer>
          <Button
            className={styleBtnBack}
            style={{
              color: "white",
              backgroundColor: "grey",
              borderRadius: "15px",
              marginRight: "10px",
            }}
            onClick={handelClickCancel}
          >
            Back
          </Button>
          <Button
            className={styleBtn}
            style={{
              paddingInline:"22px",
              color: "white",
              borderRadius: "15px",
            }}
            onClick={handelClick}
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CommonModel;
