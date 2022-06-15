import { useEffect } from "react";
import { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import ArrowLeftIcon from "../../../Assets/Icons/ArrowLeftIcon";
import EditIcon from "../../../Assets/Icons/EditIcon";
// import MainViewsSidebar from '../../../Components/MainViewsSidebar';
import Header from "../Header";
import axios from "../../../axios";
import store from "store";
import { Button, message, Spin, Modal } from "antd";
import { getUserDetails } from "../../../helpers/getUserDetails";
import {
  errorNotify,
  internalErrorNotify,
  successNotify,
  unauthenticatedNotify,
} from "../../../helpers/notiication";
import { useForm } from "react-hook-form";

const Profile_detail = (props) => {
  //defining states
  const [edit, setEdit] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [fieldsLoading, setFieldsLoading] = useState(false);
  const [deletePop, setDeletePop] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors,
  } = useForm();

  useEffect(() => {
    setFieldsLoading(true);
    getUserDetails()
      .then((res) => {
        if (res.data.status === "200") {
          setUserDetails(res.data);
          setFirstName(res.data.data.first_name);
          setLastName(res.data.data.last_name);
        } else if (res.data.status === "201") {
          errorNotify(res.data.message);
        } else {
          internalErrorNotify();
        }
        setFieldsLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          unauthenticatedNotify(props.history);
        } else {
          internalErrorNotify();
        }
        setFieldsLoading(false);
      });
  }, []);

  const onSubmit1 = (e) => {
    e.preventDefault();
    if (firstName === "") message.error("First Name is required ");
    else if (lastName === "") message.error("Last Name is required");
    else if (!firstName.match(/^[A-Za-z]+$/))
      message.error("Enter a valid First Name");
    else if (!lastName.match(/^[A-Za-z]+$/))
      message.error("Enter a valid Last Name");
    else {
    }
  };

  const onSubmit = (data) => {
    setEditLoading(true);
    const bodyFormData = new FormData();
    bodyFormData.append("first_name", firstName);
    bodyFormData.append("last_name", lastName);
    axios
      .post("edit-user-details", bodyFormData, {
        headers: {
          Authorization: `Bearer ${store.get("hhr_token")}`,
        },
      })
      .then((res) => {
        if (res.data.status === "200") {
          setUserDetails(res.data);
          setEdit(false);
        } else if (res.data.status === "201") {
          errorNotify(res.data.message);
        } else {
          internalErrorNotify();
        }
        setEditLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          unauthenticatedNotify(props.history);
        } else {
          internalErrorNotify();
        }
        setEditLoading(false);
      });
  };

  const handleDeleteAccount = () => {
    setDeleteLoading(true);
    axios
      .get("delete-user-account", {
        headers: {
          Authorization: `Bearer ${store.get("hhr_token")}`,
        },
      })
      .then((res) => {
        if (res.data.status === "200") {
          store.remove("hhr_token");
          setDeleteLoading(false);
          successNotify(res.data.message);
          props.history.push("/signin-customer");
        } else if (res.data.status === "201") {
          setDeleteLoading(false);
          errorNotify(res.data.message);
        } else {
          setDeleteLoading(false);
          internalErrorNotify();
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setDeleteLoading(false);
          unauthenticatedNotify(props.history);
        } else {
          setDeleteLoading(false);
          internalErrorNotify();
        }
      });
  };

  return (
    <div className="accountPage pb-50">
      <div className="container">
        <div className="row">
          {/* <MainViewsSidebar userDetails={userDetails} /> */}
          <div className="col-sm-9">
            <div className="my-account">
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="d-inline-flex align-items-start px-4 pl-0">
                    <h2 className="heading_2">My Account</h2>
                    {edit ? (
                      <>
                        {/* <button onClick={handleSubmit}>Save</button> */}
                        <Button
                          type="primary"
                          size="large"
                          loading={editLoading}
                          className="btn btn-primary mx-3"
                          htmlType="submit"
                        >
                          Save
                        </Button>
                        <Button
                          type="primary"
                          size="large"
                          className="btn btn-primary"
                          onClick={() => setEdit(false)}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <EditIcon onClick={() => setEdit(true)} />
                    )}
                  </div>
                  <Spin spinning={fieldsLoading}>
                    <table className="table mb-0 myAccountTable">
                      <tr>
                        <th>First name</th>
                        <td>
                          {edit ? (
                            <input
                              className="form-control"
                              type="text"
                              defaultValue={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              onKeyUp={(e) => {
                                if (firstName === "") {
                                  setError("firstName", {
                                    type: "manual",
                                    message: "*This field is required",
                                  });
                                } else if (
                                  !e.target.value.match(/^[A-Za-z]+$/)
                                ) {
                                  setError("firstName", {
                                    type: "manual",
                                    message:
                                      "Should not contain numeric,Space & special characters",
                                  });
                                } else {
                                  clearErrors("firstName");
                                }
                              }}
                            />
                          ) : (
                            <>{userDetails?.data?.first_name}</>
                          )}
                          {errors.firstName && (
                            <span className="input-error">
                              {errors.firstName.message}
                            </span>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th>Last name</th>
                        <td>
                          {edit ? (
                            <input
                              className="form-control"
                              type="text"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              onKeyUp={(e) => {
                                if (firstName === "") {
                                  setError("lastName", {
                                    type: "manual",
                                    message: "*This field is required",
                                  });
                                } else if (
                                  !e.target.value.match(/^[A-Za-z]+$/)
                                ) {
                                  setError("lastName", {
                                    type: "manual",
                                    message:
                                      "Should not contain numeric,Space & special characters",
                                  });
                                } else {
                                  clearErrors("lastName");
                                }
                              }}
                            />
                          ) : (
                            <>{userDetails?.data?.last_name}</>
                          )}
                          {errors.lastName && (
                            <span className="input-error">
                              {errors.lastName.message}
                            </span>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th>E-mail</th>
                        <td>
                          {edit ? (
                            <input
                              className="form-control"
                              type="text"
                              value={userDetails?.data?.email}
                              onChange={(e) => setLastName(e.target.value)}
                              required
                              disabled
                            />
                          ) : (
                            <>{userDetails?.data?.email}</>
                          )}
                        </td>
                      </tr>
                    </table>
                  </Spin>
                </form>
              </div>
              <table className="table acountLinks myAccountTable">
                <tr>
                  <th></th>
                  <td>
                    <div className="form-check form-switch form-switch-end text-left">
                      <label
                        className="form-check-label"
                        htmlFor="flexSwitchCheckDefault"
                      >
                        I'd like to receive news, updates and promotions from
                        Happy Hour Restaurent via Email
                      </label>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>
                    <Link to="#" className="blacklink">
                      Payment Cards
                    </Link>
                  </th>
                </tr>
                <tr>
                  <th>
                    <Link to="/change-password" className="blacklink">
                      Change Password
                    </Link>
                  </th>
                </tr>
                <tr>
                  {/* <Spin spinning={deleteLoading}> */}
                  <th>
                    <Link
                      to="#"
                      onClick={() => setDeletePop(true)}
                      className="blacklink"
                      style={deleteLoading ? { pointerEvents: "none" } : null}
                    >
                      <Spin
                        spinning={deleteLoading}
                        style={{ marginRight: "5px" }}
                      />
                      Delete Account
                    </Link>
                    <Modal
                      title="Please Confirm"
                      visible={deletePop}
                      okText="Yes"
                      cancelText="No"
                      onOk={() => handleDeleteAccount()}
                      onCancel={() => setDeletePop(false)}
                    >
                      Are you sure you want to delete your account?
                    </Modal>
                  </th>
                  {/* </Spin> */}
                </tr>
                <tr>
                  <th>
                    <a
                      href="/privacy-policy"
                      className="blacklink"
                      target={"_blank"}
                    >
                      Privacy Policy
                    </a>
                  </th>
                </tr>
                <tr>
                  <th>
                    <Link to="#" className="blacklink">
                      Terms & Conditions
                    </Link>
                  </th>
                </tr>
                <tr>
                  <th>
                    <Link to="#" className="blacklink">
                      Contact
                    </Link>
                  </th>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Profile_detail);
