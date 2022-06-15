import React from "react";
import "./style.css"

// const Navbar = (props) => {
//   const { heading } = props
//   return (
//     <div className={heading === "" ? "navbar p-4" : "navbar"}>
//       <h1>{heading}</h1>
//     </div>
//   );
// }


const Navbar = (props) => {
  const { box, logo } = props;
  return (
    <div className="navbar">
      <div>{logo}</div>
      <h1>{box}</h1>

    </div>
  );
}

export default Navbar;
