import Navbar from "../../Component/Navbar";
import "../Login/style.css";
import "./style.css";
import InputField from "../../Component/InputField";
import { useHistory } from "react-router-dom";
import CommonButton from "../../Component/CommonButton";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CommonAlert from "../../Component/CommanAlert";

const ChangePin = () => {
  const history = useHistory();
  const [passwordToggle, setPasswordToggle] = useState({
    oldPassword: "password",
    newPassword: "password",
    comfirmPassword: "password",
  });
  const [alertToggle, setAlertToggle] = useState({
    successAlert: false,
    blankAlert: false,
    matchAlert: false,
    oldAlert: false,
  });
  const [password, setPassword] = useState({
    oldPassword: null,
    newPassword: null,
    confirmPassword: null,
  });

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    var logdata = JSON.parse(window.localStorage.getItem("Login"));
    if (!logdata) {
      history.push("/");
    }
    // return () => {

    // };
  }, []);

  const onSubmit = (data) => {
    // password.confirmPassword === "" ||
    // password.newPassword === "" ||
    // password.oldPassword === ""
    //   ? setAlertToggle({ ...alertToggle, blankAlert: true })
    //   : fetchData();

    const fetchData = async () => {
      var logdata = JSON.parse(window.localStorage.getItem("Login"));

      try {
        const { data: response } = await axios.post(
          `${process.env.REACT_APP_API_URL}/change-password`,
          {
            old_password: password.oldPassword,
            new_password: password.newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${logdata.token}`,
              Accept: "application/json",
            },
          }
        );
        console.log(response.message, "bb");

        if (response.message === "Old password does not match") {
          setAlertToggle({ ...alertToggle, oldAlert: true });
        }
        if (response.message === "Your password changed successfully") {
          setAlertToggle({ ...alertToggle, successAlert: true });
          setTimeout(() => {
            history.push("/bookings");
          }, 3000);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    password.confirmPassword === null ||
    password.newPassword === null ||
    password.oldPassword === null
      ? setAlertToggle({ ...alertToggle, blankAlert: true })
      : setAlertToggle({ ...alertToggle, matchAlert: false });

    password.newPassword !== null &&
      password.confirmPassword !== null &&
      password.oldPassword !== null &&
      password.newPassword === password.confirmPassword &&
      fetchData();
    if (password.newPassword !== password.confirmPassword) {
      setAlertToggle({ ...alertToggle, matchAlert: true });
    }
  };

  const handleOldPassword = (oldPassword) => {
    var Regex = /(?=.*?[0-9])(?=.*?[A-Za-z]).+/;
    oldPassword.match(Regex)
      ? clearErrors("oldPassword")
      : setError("oldPassword", {
          type: "manual",
          message: "Password contain atleast one number and one alphabet",
        });
    oldPassword.match(Regex) ||
      (oldPassword === "" &&
        setError("oldPassword", {
          type: "manual",
          message: "field is requried",
        }));
  };

  const handleNewPassword = (newPassword) => {
    var Regex = /(?=.*?[0-9])(?=.*?[A-Za-z]).+/;
    newPassword.match(Regex) || newPassword === null
      ? clearErrors("newPassword")
      : setError("newPassword", {
          type: "manual",
          message: "Password contain atleast one number and one alphabet",
        });
    newPassword.match(Regex) ||
      (newPassword === "" &&
        setError("newPassword", {
          type: "manual",
          message: "field is requried",
        }));
  };

  const handleConfirmPassword = (confirmPassword) => {
    var Regex = /(?=.*?[0-9])(?=.*?[A-Za-z]).+/;
    confirmPassword.match(Regex) || confirmPassword === null
      ? clearErrors("confirmPassword")
      : setError("confirmPassword", {
          type: "manual",
          message: "Password contain atleast one number and one alphabet",
        });

    confirmPassword.match(Regex) ||
      (confirmPassword === "" &&
        setError("confirmPassword", {
          type: "manual",
          message: "field is requried",
        }));
  };

  return (
    <>
      <Navbar
        box="Change Password"
        logo={
          <>
            <Link className="text-white" to="/bookings">
              <ArrowBackIcon />
            </Link>
          </>
        }
      />

      <CommonAlert
        showAlert={alertToggle.oldAlert}
        alertColor={"danger"}
        hidesetAlert={() => setAlertToggle({ ...alertToggle, oldAlert: false })}
        alertContent={"Please enter valid old password"}
      />

      <CommonAlert
        showAlert={alertToggle.matchAlert}
        alertColor={"danger"}
        hidesetAlert={() =>
          setAlertToggle({ ...alertToggle, matchAlert: false })
        }
        alertContent={"Please enter new and confirm password same"}
      />
      <CommonAlert
        showAlert={alertToggle.successAlert}
        alertColor={"success"}
        hidesetAlert={() =>
          setAlertToggle({ ...alertToggle, successAlert: false })
        }
        alertContent={"Your password change successfully"}
      />

      <CommonAlert
        showAlert={alertToggle.blankAlert}
        alertColor={"danger"}
        hidesetAlert={() =>
          setAlertToggle({ ...alertToggle, blankAlert: false })
        }
        alertContent={"Please fill the form then submit"}
      />

      <div className="p-3 custom-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="pt-3">
            <label className="fw-bolder"> Old Password</label>
            <div className="pass-wrapper">
              <InputField
                customClassName={
                  errors?.oldPassword?.message ? "error" : "input-field"
                }
                autoFocus
                placeholder="Enter old your password"
                name="password"
                onClick={() => {
                  setAlertToggle({
                    ...alertToggle,
                    oldAlert: false,
                    matchAlert: false,
                    blankAlert: false,
                  });
                }}
                onChange={(e) => {
                  handleOldPassword(e.target.value);
                  setPassword({ ...password, oldPassword: e.target.value });
                }}
                type={passwordToggle.oldPassword}
                // value={inputpassword}
                // register={register("oldpassword", {
                //   required: "*Password is required",
                //   pattern: {
                //     value: RegExp("(?=.*?[0-9])(?=.*?[A-Za-z]).+"),
                //     message:
                //       "Password should contain atleast one number and one alphabet",
                //   },
                // })}
              />
              {passwordToggle.oldPassword === "password" ? (
                <VisibilityOffIcon
                  className="visible"
                  onClick={() => {
                    setPasswordToggle({
                      ...passwordToggle,
                      oldPassword: "text",
                    });
                  }}
                />
              ) : (
                <VisibilityIcon
                  className="visible"
                  onClick={() => {
                    setPasswordToggle({
                      ...passwordToggle,
                      oldPassword: "password",
                    });
                  }}
                />
              )}
            </div>

            <span className="error-text">{errors?.oldPassword?.message}</span>
            {!errors?.oldPassword?.message && <br />}
          </div>

          <div className="pt-3">
            <label className="fw-bolder"> New Password</label>

            <div className="pass-wrapper">
              <InputField
                customClassName={
                  errors?.newPassword?.message ? "error" : "input-field"
                }
                placeholder="Enter new your password"
                name="password"
                onClick={() => {
                  setAlertToggle({
                    ...alertToggle,
                    oldAlert: false,
                    matchAlert: false,
                    blankAlert: false,
                  });
                }}
                onChange={(e) => {
                  handleNewPassword(e.target.value);
                  setPassword({ ...password, newPassword: e.target.value });
                }}
                type={passwordToggle.newPassword}
                // register={register("newpassword", {
                //   required: "*Password is required",
                //   pattern: {
                //     value: RegExp("(?=.*?[0-9])(?=.*?[A-Za-z]).+"),
                //     message:
                //       "Password should contain atleast one number and one alphabet",
                //   },
                // })}
              />
              {passwordToggle.newPassword === "password" ? (
                <VisibilityOffIcon
                  className="visible"
                  onClick={() => {
                    setPasswordToggle({
                      ...passwordToggle,
                      newPassword: "text",
                    });
                  }}
                />
              ) : (
                <VisibilityIcon
                  className="visible"
                  onClick={() => {
                    setPasswordToggle({
                      ...passwordToggle,
                      newPassword: "password",
                    });
                  }}
                />
              )}
            </div>

            <span className="error-text">{errors?.newPassword?.message}</span>
            {!errors?.newPassword?.message && <br />}
          </div>

          <div className="pt-3">
            <label className="fw-bolder">Confirm Password</label>

            <div className="pass-wrapper">
              <InputField
                customClassName={
                  errors?.confirmPassword?.message ? "error" : "input-field"
                }
                placeholder="Enter confirm your password"
                name="password"
                onClick={() => {
                  setAlertToggle({
                    ...alertToggle,
                    oldAlert: false,
                    matchAlert: false,
                    blankAlert: false,
                  });
                }}
                onChange={(e) => {
                  handleConfirmPassword(e.target.value);
                  setPassword({ ...password, confirmPassword: e.target.value });
                }}
                type={passwordToggle.comfirmPassword}
                // register={register("conpassword", {
                //   required: "*Password is required",
                //   pattern: {
                //     value: RegExp("(?=.*?[0-9])(?=.*?[A-Za-z]).+"),
                //     message:
                //       "Password should contain atleast one number and one alphabet",
                //   },
                // })}
              />
              {passwordToggle.comfirmPassword === "password" ? (
                <VisibilityOffIcon
                  className="visible"
                  onClick={() => {
                    setPasswordToggle({
                      ...passwordToggle,
                      comfirmPassword: "text",
                    });
                  }}
                />
              ) : (
                <VisibilityIcon
                  className="visible"
                  onClick={() => {
                    setPasswordToggle({
                      ...passwordToggle,
                      comfirmPassword: "password",
                    });
                  }}
                />
              )}
            </div>

            <span className="error-text">
              {errors?.confirmPassword?.message}
            </span>
            {!errors?.confirmPassword?.message && <br />}
          </div>

          <div className="mt-4">
            <CommonButton label="Submit" type="submit" />
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePin;
