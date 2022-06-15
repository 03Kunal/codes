import React from "react";
import ErrorImage from "../../../Assets/Images/errorImage.png";
const PageNotFound = (props) => {
  return (
    <div>
      <img
        src={ErrorImage}
        className="rounded mx-auto d-block"
        alt="errorImage"
        height={400}
      />
      <h2 className="text-center">Page not found</h2>
      <button
        className="btn btn-primary mx-auto d-block mt-3"
        onClick={() => props.history.goBack()}
      >
        Go Back
      </button>
    </div>
  );
};

export default PageNotFound;
