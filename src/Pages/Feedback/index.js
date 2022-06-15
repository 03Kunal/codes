import { useForm } from "react-hook-form";
import { withRouter, Link } from "react-router-dom";
import ArrowLeftIcon from "../../../Assets/Icons/ArrowLeftIcon";

const Feedback = (props) => {
  //defining states
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className="headerBorder"></div>
      <div className="d-breadcrumb">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <ArrowLeftIcon />
            </li>
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/my-account">ACCOUNT</Link>
            </li>
            <li className="breadcrumb-item active">MY ACCOUNT</li>
          </ol>
        </nav>
      </div>
      <div className="contact-form pt-30 pb-50">
        <h2 className="heading_2 mb-30">Feedback Form</h2>
        <h2 className="heading_2 text-center mb-30">
          Your Feedback is important to us
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <p className="formLabel">Name</p>
                <input
                  className="form-control style_2"
                  type="text"
                  {...register("name", {
                    required: "*This field is required",
                  })}
                />
                {errors.name && (
                  <span className="input-error">{errors.name.message}</span>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <p className="formLabel">Subject</p>
                <input
                  className="form-control style_2"
                  type="text"
                  {...register("subject", {
                    required: "*This field is required",
                  })}
                />
                {errors.subject && (
                  <span className="input-error">{errors.subject.message}</span>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <p className="formLabel">E-mail address</p>
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
            </div>
          </div>
          <div className="form-group">
            <p className="formLabel">Message</p>
            <textarea
              className="form-control style_2"
              type="text"
              {...register("message", {
                required: "*This field is required",
              })}
            ></textarea>
            {errors.message && (
              <span className="input-error">{errors.message.message}</span>
            )}
          </div>

          <div className="text-center">
            <p>
              If you got any questions, please do not hesitate to send us a
              message or call us during opening hours. We shall reply you
              shortly!
            </p>
            <button className="btn btn-primary large-btn mt-20" type="submit">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Feedback);
