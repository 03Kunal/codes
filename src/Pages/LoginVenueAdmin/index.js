import { useState } from "react";
import { useForm } from "react-hook-form";
import { withRouter, Link } from "react-router-dom";
import EyeInvisibleIcon from "../../../Assets/Icons/EyeInvisibleIcon";
import EyeVisibleIcon from "../../../Assets/Icons/EyeVisibleIcon";
import Logo from "../../../Assets/Images/logo-black.png";

const LoginVanueAdmin = (props) => {
  const [oldPasswordToggle, setOldPasswordToggle] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    props.history.push("/restaurant/restaurant-home");
  };

  return (
    <div>
      <div className="headerBorder"></div>
      <div className="container mb-30 mt-60">
        <div className="signinLogo">
          <img src={Logo} alt="logo-black" />
        </div>
        <div className="signForm mt-50">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group px-30">
              <p className="formLabel">Email</p>
              <input
                className="form-control style_2"
                type="email"
                {...register("email", {
                  required: "*This field is required",
                })}
              />
              {errors.email && (
                <span className="input-error">{errors.email.message}</span>
              )}
            </div>
            <div className="form-group px-30">
              <p className="formLabel">Password</p>
              <div className="passwithicon">
                <input
                  className="form-control style_2"
                  type={oldPasswordToggle ? "text" : "password"}
                  {...register("password", {
                    required: "*This field is required",
                  })}
                />
                {errors.password && (
                  <span className="input-error">{errors.password.message}</span>
                )}
                {!oldPasswordToggle ? (
                  <EyeVisibleIcon onClick={() => setOldPasswordToggle(true)} />
                ) : (
                  <EyeInvisibleIcon
                    onClick={() => setOldPasswordToggle(false)}
                  />
                )}
              </div>
              <p className="text-end mb-0 mt-1">
                <Link to="#">Forgot Password?</Link>
              </p>
            </div>

            <div className="d-grid mt-30">
              <button className="btn btn-primary" type="submit">
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(LoginVanueAdmin);
