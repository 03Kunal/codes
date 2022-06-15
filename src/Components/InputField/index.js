import React from "react";
import "./style.css"

const InputField = (props) => {
  const { label, customClassName,onChange, placeholder, name, type, register, ...rest} = props;
  return (
    <>
      <p className="input-field-label">{label}</p>
      <input
        className={customClassName}
        placeholder={placeholder}
        name={name}
        type={type}
        onChange={onChange}
        {...register}
        {...rest}
      />
    </>
  );
}

export default InputField;
