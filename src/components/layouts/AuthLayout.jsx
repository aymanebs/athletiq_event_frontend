import { Outlet } from "react-router-dom";
import "../../styles/AuthLayout.css";

function AuthLayout({ Title = "Join our community" }) {
  return (
    <div className="auth-layout-wrapper">
      <div className="wrapper">
        <section className="left">
          <h1>AthletiQ Event</h1>
          <p>Join us now and experience seamless events at your fingertips!</p>
        </section>
        <section className="right">
          <h2 className="heading">
            <span>{Title}</span>
          </h2>
          <div className="form-group">
            <Outlet/> 
          </div>
        </section>
      </div>
    </div>
  );
}

export default AuthLayout;
