import { Link } from "react-router-dom";
import "../../features/css/style.css"
import "./Header.css";

function Header() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark" style={{ backgroundColor: "#282828" }}>
          <div className="container-fluid">
              <Link
              className="navbar-brand"
              to="/"
              style={{ color: "var(--main-color)" }}
              ><b>HAMSY</b></Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                  <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse justify-content-between" id="mynavbar">
                  <ul className="navbar-nav me-auto">
                      <li className="nav-item">
                          <Link className="nav-link" to="/">Home</Link>
                      </li>
                      <li className="nav-item">
                          <Link className="nav-link" to="/about">About</Link>
                      </li>
                      <li className="nav-item">
                          <Link className="nav-link" to="/services">Services</Link>
                      </li>
                  </ul>
                  <form className="d-flex">
                      <Link className="btn btn-outline-light p-2 mx-4 px-4 contact-us-button" to="/contact">Contact Us</Link>
                  </form>
              </div>
          </div>
      </nav>
    );
}

export default Header;
