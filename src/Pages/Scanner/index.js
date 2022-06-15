import axios from "axios";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { QrReader } from "react-qr-reader";
import CommonButton from "../../../Component/CommonButton";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import CommonModel from "../../../Component/CommonModel";
import img from "../../../Assets/img/error.jpeg";
import Home from "..";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function QrCode(props) {
  const [data, setData] = useState("");
  const [qrData, setQRData] = useState("");
  const [loading, setloading] = useState(true);
  const [cameraStatus, setCameraStatus] = useState({
    cameraModal: false,
    noCamera: false,
  });

  const [modalToggle, setModalToggle] = useState({
    valid: false,
    inValid: false,
  });

  // const camera = useSelector((state) => state.cameraInfoReducer.camera);
  //  console.log(camera)

  // useEffect(() => {
  //   camera === false &&
  //     setCameraStatus({ ...cameraStatus, cameraModal: true, noCamera: true });
  // }, []);

  const fetchDataQRCode = async () => {
    var logdata = JSON.parse(window.localStorage.getItem("Login"));
    const id = qrData.id;

    try {
      const { data: response } = await axios.get(
        `${process.env.REACT_APP_API_URL}/customer-qrcode-scan/${id}`,
        {
          headers: {
            Authorization: `Bearer ${logdata.token}`,
          },
        }
      );
      setData(response);
    } catch (error) {
      console.error(error.message);
    }
  };

  const qrResult = (data) => {
    const hhr = data.includes("hhr_verified");
    // console.log(hhr,"hhr")
    // console.log(qrData, "fsfjdksfnsdkjvndfkj");

    if (hhr === true) {
      setModalToggle({ ...modalToggle, valid: true });
      setQRData(JSON.parse(data));
      console.log(qrData);
    } else {
      setModalToggle({ ...modalToggle, inValid: true });
    }
  };
  return (
    <div>
      <Home />

      <div
        style={{
          textAlign: "center",
          paddingTop: "25px",
          paddingBottom: "20px",
        }}
      >
        <Link to="/bookings">
          <p className="mainbtn">Bookings</p>
        </Link>
        <Link to="/services">
          <p className="mainbtn">Services</p>
        </Link>
        <Link to="/scanner">
          <p
            style={{ backgroundColor: "#526af3", color: "white" }}
            className="mainbtn"
          >
            Scan+
          </p>
        </Link>
      </div>

      {cameraStatus.noCamera === true && (
        <div className="nodata">
          <img src={img} alt="something went worng" width="350" height="200" />
          {/* <h2 className="text-center fw-bolder pt-3">Not access camera</h2> */}
        </div>
      )}

      <div className="Scanner_position">
        {!qrData?.hhr_verified && (
          <div>
            {loading ? (
              <div className="d-flex justify-content-center  text-primary sppiner ">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : null}
            <QrReader
              className="Scanner"
              videoContainerStyle={{
                width: 300,
                height: 300,
              }}
              constraints={{
                facingMode: "environment",
              }}
              onResult={(result, error) => {
                if (result) {
                  qrData === "" && qrResult(result?.text);
                  // console.log(result?.text, "result");
                  // MediaStreamTrack.stop();
                }
                if (error) {
                  setloading(false);
                  // console.info(error,"aaaaa");
                  // console.log(error.message,"sss")
                  error.message === "Requested device not found" &&
                    setCameraStatus({
                      ...cameraStatus,
                      cameraModal: true,
                      noCamera: true,
                    }) &&
                    alert("Requested device not found");
                }
              }}
              style={{
                height: "100%",
                overflow: "auto",
                border: "10px solid black",
              }}
            />
          </div>
        )}
        <div>
          {qrData.hhr_verified === true &&
            data &&
            data?.data.map((item) => (
              <Row
                key={item.customer_email}
                className="text-center pt-5"
                style={{ fontSize: "16px" }}
              >
                {qrData.type === "1" && (
                  <Row>
                    <p className="text-center fw-bolder">Name</p>
                    <p className="text-center">{item.customer_name}</p>
                  </Row>
                )}

                <Row>
                  <p className="text-center fw-bolder">Email</p>
                  <p className="text-center">{item.customer_email}</p>
                </Row>
                <Row>
                  <Col xs={6}>
                    <p className="text-center fw-bolder">Booking Date</p>
                  </Col>
                  <Col xs={6}>
                    <p className="text-center">{item.booking_date}</p>
                  </Col>
                </Row>
                {qrData.type === "1" && (
                  <Row>
                    <Col xs={6}>
                      <p className="text-center fw-bolder">Mobile Number</p>
                    </Col>
                    <Col xs={6}>
                      <p className="text-center">
                        {item.customer_mobile_number}
                      </p>
                    </Col>
                  </Row>
                )}
                <Row>
                  <Col xs={6}>
                    <p className="text-center fw-bolder">Time</p>
                  </Col>
                  <Col xs={6}>
                    <p className="text-center">{item.time}</p>
                  </Col>
                </Row>
                {qrData.type === "1" && (
                  <Row>
                    <Col xs={6}>
                      <p className="text-center fw-bolder">Total People</p>
                    </Col>
                    <Col xs={6}>
                      <p className="text-center">{item.total_people}</p>
                    </Col>
                  </Row>
                )}
                {qrData.type === "1" && (
                  <Row>
                    <Col xs={6}>
                      <p className="text-center fw-bolder">Table Numbers</p>
                    </Col>
                    <Col xs={6}>
                      <p className="text-center"> {item.table_numbers}</p>
                    </Col>
                  </Row>
                )}
                <div className="mt-3 text-center mb-3">
                  <CommonButton
                    handelClick={() => {
                      // setHhr(false);
                      setQRData("");
                    }}
                    label="Next"
                    type="submit"
                  />
                </div>
              </Row>
            ))}
        </div>
      </div>

      <CommonModel
        toggleBtn={modalToggle.valid}
        settoggleBtn={() => setModalToggle({ ...modalToggle, valid: false })}
        modalBody={
          <>
            <CheckIcon style={{ background: "#526bf3" }} className="right" />
            <h2 className="fw-bolder pt-4">Booking Accepted</h2>
          </>
        }
        handelClick={() => {
          // setmodal_QrActive(false);
          setModalToggle({ ...modalToggle, valid: false });
          fetchDataQRCode();
        }}
        styleBtn={"qr_btn"}
        styleBtnBack={"dummy"}
      />

      <CommonModel
        toggleBtn={modalToggle.inValid}
        settoggleBtn={() => setModalToggle({ ...modalToggle, inValid: false })}
        modalBody={
          <>
            <CloseIcon style={{ background: "#f51f3c" }} className="worng" />
            <h2 className="fw-bolder pt-4">Booking is not valid</h2>
          </>
        }
        handelClick={() => {
          // history.push("./home");
          setModalToggle({ ...modalToggle, inValid: false });
        }}
        styleBtn={"qr_btn_notvalid"}
        styleBtnBack={"dummy"}
      />

      <CommonModel
        toggleBtn={cameraStatus.cameraModal}
        settoggleBtn={() =>
          setCameraStatus({ ...cameraStatus, cameraModal: false })
        }
        modalTitle={"Camera"}
        modalBody={
          <p>
            Camera not available on your devices <br />
            You are not use scanner on this device
          </p>
        }
        handelClickCancel={() => {
          setCameraStatus({ ...cameraStatus, cameraModal: false });
        }}
        styleBtnBack={"theme_clr"}
        styleBtn={"dummy"}
      />
    </div>
  );
}

export default QrCode;
