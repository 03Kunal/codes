import { useForm } from "react-hook-form";
import { withRouter, Link } from "react-router-dom";
import MyaccountSidebar from "../../RestaurantViews/Myaccount-sidebar";

const EditProfile = (props) => {
  //defining states
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {};

  return (
    <div>
      <div className="headerBorder"></div>
      <div className="container mb-30 mt-60 pb-50">
        <div className="row">
          <div className="col-sm-3">
            <MyaccountSidebar />
          </div>

          <div className="col-md-9">
            <div className="signupForm mt-50">
              <h3 className="text-center">Edit Profile</h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <p className="formLabel">E-mail</p>
                      <input
                        className="form-control"
                        type="email"
                        disabled
                        placeholder="email@hhr.com"
                      />
                      {errors.email && (
                        <span className="input-error">
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <p className="formLabel">City</p>
                      <input
                        className="form-control"
                        type="text"
                        {...register("city", {
                          required: "*This field is required",
                        })}
                      />
                      {errors.city && (
                        <span className="input-error">
                          {errors.city.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <p className="formLabel">First name</p>
                      <input
                        className="form-control"
                        type="text"
                        {...register("firstName", {
                          required: "*This field is required",
                        })}
                      />
                      {errors.firstName && (
                        <span className="input-error">
                          {errors.firstName.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <p className="formLabel">Last name</p>
                      <input
                        className="form-control"
                        type="text"
                        {...register("lastName", {
                          required: "*This field is required",
                        })}
                      />
                      {errors.lastName && (
                        <span className="input-error">
                          {errors.lastName.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="d-grid mt-30 mb-10">
                  <button className="btn btn-primary large-btn" type="submit">
                    Update account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(EditProfile);
