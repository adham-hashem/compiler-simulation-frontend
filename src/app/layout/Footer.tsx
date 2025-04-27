import { Link } from "react-router-dom";
import { Instagram, Twitter,  } from "lucide-react";
import "../../features/css/style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faWhatsapp, faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {


    return (
        <div className="container-fluid text-white text-center p-3" style={{ backgroundColor: "#282828" }}>
            <h4 style={{ color: "#706CEE" }} className="mt-4 mb-4"><b>HAMSY</b></h4>
            <div className="links mb-4">
                <Link
                    className="mr-5"
                    to=""
                >Home</Link>
                <Link
                    className="mr-5"
                    to=""
                >About Us</Link>
                <Link
                    className="mr-5"
                    to=""
                >What Is Compiler</Link>
                <Link
                    className="mr-5"
                    to=""
                >Contact With Us</Link>
            </div>
            <div className="mb-4">
                <FontAwesomeIcon
                    icon={faInstagram}
                    style={{ color: "#706CEE", fontSize: "25px" }}
                    className="mr-4"
                    spin 
                />
                <FontAwesomeIcon
                    icon={faTwitter}
                    style={{ color: "#706CEE", fontSize: "25px" }}
                    className="mr-4"
                    spin
                />
                <FontAwesomeIcon
                    icon={faWhatsapp}
                    style={{ color: "#706CEE", fontSize: "25px" }}
                    className="mr-4"
                    spin
                />
                <FontAwesomeIcon
                    icon={faFacebook}
                    style={{ color: "#706CEE", fontSize: "25px" }}
                    className="mr-4"
                    spin
                />
            </div>
            <hr style={{ border: "1px solid white" }} />
            <div style={{ color: "white", padding: "10px" }}>
                © {new Date().getFullYear()} All Rights Reserved
            </div>
        </div>
    );
};

export default Footer;