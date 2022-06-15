import { withRouter, Link } from "react-router-dom";
import ArrowLeftIcon from "../../../Assets/Icons/ArrowLeftIcon";
import Header from "../Header";
import Profile_detail from "./Profile_detail";

const Info = (props) => {
  return (
    <div>
      <Header />
      <div className="d-breadcrumb">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <ArrowLeftIcon
                onClick={() => props.history.push("/my-account")}
              />
            </li>
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active">MY ACCOUNT</li>
          </ol>
        </nav>
      </div>
      <div>
        <Profile_detail />
      </div>
    </div>
  );
};

export default withRouter(Info);
