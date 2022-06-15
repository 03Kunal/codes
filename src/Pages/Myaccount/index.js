import "./style.css";
import { withRouter, Link } from "react-router-dom";
import ArrowLeftIcon from "../../../Assets/Icons/ArrowLeftIcon";
import MainViewsSidebar from "../../../Components/MainViewsSidebar";
import Header from "../Header";
import Profile_detail from "./Profile_detail";

const Myaccount = (props) => {
  return (
    <div>
      <Header />
      <div className="d-breadcrumb">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <ArrowLeftIcon onClick={() => props.history.push("/")} />
            </li>
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active">MY ACCOUNT</li>
          </ol>
        </nav>
      </div>
      <div className="accountPage pb-50">
        <div className="container">
          <div className="row">
            <MainViewsSidebar />
            <div className="col-9 info_hide">
              <Profile_detail />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Myaccount);
