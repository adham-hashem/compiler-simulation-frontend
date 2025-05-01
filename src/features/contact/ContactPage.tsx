import React from "react";
import { Link } from "react-router-dom";
import Header from "../../app/layout/Header";
import Footer from "../../app/layout/Footer";

const ContactPage = () => {
return (
    <>
        <Header />
        <div className="container-fluid text-white main-background-color px-5 py-4">
            Contact Us
            We’re here to help! If you have any questions, feedback, or inquiries about our platform, feel free to reach out.
            Our team is always available to assist you.

            <h6>Reach Out to Us</h6>
            <p>You can contact us through the following methods:</p>
            <ul>
                <li><strong>Email:</strong> support@NoteMaster.com</li>
                <li><strong>Phone:</strong> +123-456-7890</li>
                <li><strong>Address:</strong> 123 Main Street, City, Country</li>
            </ul>

            <h6>Send Us a Message</h6>
            <p>You can also send us a message directly using the form below, and we will get back to you as soon as possible:</p>

            {/* Contact Form */}
            <form>
                <div className="row mb-3">
                    <div className="col-sm-5 mt-2">
                        <input type="text" className="form-control" placeholder="Your Name" required />
                    </div>
                    <div className="col-sm-5 mt-2 input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                @
                            </div>
                        </div>
                        <input type="email" className="form-control" placeholder="Your Email" required />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-sm-5">
                        <input type="text" className="form-control" placeholder="Subject" required />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-sm-5">
                        <textarea className="form-control" placeholder="Message" rows={4} required></textarea>
                    </div>
                </div>
                <div>
                    <Link to="" className="btn py-2 mb-2 px-5 nextButton">Send Message</Link>
                </div>
            </form>
        </div>
        <Footer />
    </>
);
};

export default ContactPage;