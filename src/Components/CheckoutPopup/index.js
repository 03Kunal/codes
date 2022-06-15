import React from "react";
import { Col, Offcanvas, Row } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { setBottomSheet } from "../../Actions/BottomSheetAction";
import "./style.css"

const BookingBottomSheet = (props) => {
  const dispatch = useDispatch();


  const show = useSelector(
    (state) => state.bottomSheetReducer.bottomSheet,
  );
  const closedSheet = () => {
    dispatch(setBottomSheet(false));
  }
  

  return (
    <>
      <Offcanvas show={show} placement={'bottom'} onHide={closedSheet}>
        <Offcanvas.Body>
          <Row>
            <Col xs={6}>
              <p>Arrived</p>
            </Col>
            <Col xs={6}>
              <p>Re-schedule</p>
            </Col>
            <Col xs={6}>
              <p>Cancel Booking</p>
            </Col>
            <Col xs={6}>
              <p>No Show</p>
            </Col>
            <div classNameNameName="text-center mt-2">
              <h5 classNameNameName="mb-0">Pre-odders</h5>
              <p classNameNameName="mb-0">123456</p>
              <p classNameNameName="mb-0">4x Menu</p>
            </div>
            <div classNameNameName="text-center mt-2">
              <h5 classNameNameName="mb-0">Booking Code</h5>
              <p classNameNameName="mb-0">123456</p>
            </div>
            <div classNameNameName="text-center mt-2">
              <h5 classNameNameName="mb-0">Contact</h5>
              <p classNameNameName="mb-0">{props.booking}</p>
              <p classNameNameName="mb-0">{props.mobile}</p>
            </div>
          </Row>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default BookingBottomSheet;













// import React from "react";
// import "./style.css"

// const BookingBottomSheet = (props) => {

//   return (
//     <>

// <Modal show={show} onHide={handleClose} className="modall">
//                         <Modal.Header closeButton>
//                             <Modal.Title className='fw-bolder'>Are you sure to Logout then press 'Submit'</Modal.Title>
//                         </Modal.Header>
//                         <Modal.Body className='text-center'>{<LogoutIcon className='logo'/>}</Modal.Body>
//                         <Modal.Footer>
//                             <Button variant="secondary" onClick={handleClose}>
//                                 Close
//                             </Button>
//                             {/* <Button variant="primary" onClick={handleClose}> */}
//                             <Button variant="primary" onClick={()=>{window.localStorage.clear(); history.push("./")
//                              setShow(false)}}>
//                                 Submit
//                             </Button>
//                         </Modal.Footer>
//                     </Modal>


//     </>
//   );
// }

// export default BookingBottomSheet;
