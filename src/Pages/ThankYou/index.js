import { Link } from "react-router-dom";
import ArrowLeftIcon from "../../../Assets/Icons/ArrowLeftIcon";
import Header from "../Header";
import "./style.css";
import thankYouSmiley from "../../../Assets/Images/Smiley.png";

const ThankYou = () => {
  const nextPage = () => {};

  return (
    <div className="customeHeader">
      <Header />
      <div className="d-breadcrumb xs-hide">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <ArrowLeftIcon />
            </li>
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            {/* <li className="breadcrumb-item active">
              {restaurantDetail.restaurant_name}
            </li> */}
          </ol>
        </nav>
      </div>
      <div className="d-breadcrumb blueBg">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item noAfterBefore">
              <ArrowLeftIcon />
            </li>
            <li className="breadcrumb-item widthFull text-center">
              <Link to="/">Get service</Link>
            </li>
            {/* <li className="breadcrumb-item active">
              {restaurantDetail.restaurant_name}
            </li> */}
          </ol>
        </nav>
      </div>
      <div className="pt-50 p-50 pb-0 text-center">
        <img
          className="thankYou_Smiley pb-20"
          alt="thankYou_Smiley"
          src={thankYouSmiley}
        />
        <h1 class="heading_1 f46 f-900">Thank you</h1>
        <p className="f32 f-600 p-20 pt-0 m-0 pb-0 ">
          Our staff will serve you shortaly
        </p>
      </div>
      <div className="container">
        <hr />
      </div>
      <div class="d-grid mt-20 pb-20">
        <button class="btn btn-primary maxButton" onClick={() => nextPage()}>
          Browse Menu
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
