import React from "react";
import "./style.css"

const CommonButton = (props) => {
  const { label, type, handelClick } = props;
  return (
    <>
      <button className="common-btn" onClick={handelClick} type={type}>{label}</button>
    </>
  );
}

export default CommonButton;
