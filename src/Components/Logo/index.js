import "./style.css"
import logo from "../../Assets/img/logo-black.png"

const Logo = () => {
  return (
    <>
      <div className="text-center mt-5">
        <img src={logo} alt="logo" className="logo"></img>
      </div>
    </>
  );
}

export default Logo;
