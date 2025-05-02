import { Link } from 'react-router-dom';
import Header from "../../app/layout/Header";
import Footer from '../../app/layout/Footer';

const Services = () => {

    return (
        <>
            <Header />
            <main className="site-wrapper">
                <div className="pt-table desktop-768">
                    <div
                    className="pt-tablecell page-home relative"
                    style={{
                        backgroundImage:
                        "url('https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80')",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                    }}
                    >
                    <div className="overlay"></div>
        
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 offset-md-1 col-md-10 offset-lg-2 col-lg-8">
                                <div className="page-title home text-center">
                                <span className="heading-page"> Welcome to <span style={{ color: "var(--main-color)" }}>HAMSY</span> Compiler Services</span>
                                <p className="mt-3 text-white">
                                    HAMSY Compiler is an AI-powered code optimization and compilation simulation tool.
                                    It enhances code efficiency while visualizing memory and compilation
                                    stages like AST, parse trees, and IR generation. 🚀
                                </p>
                                </div>
            
                                <div className="hexagon-menu clear">
                                {[
                                    { icon: "fa-universal-access", title: "Welcome", link: "/source-code" },
                                    { icon: "fa-bullseye", title: "Compiler", link: "/what-is-compiler" },
                                    { icon: "fa-braille", title: "Services", link: "/" },
                                    { icon: "fa-id-badge", title: "Benefits", link: "/" },
                                    { icon: "fa-life-ring", title: "Works", link: "/" },
                                    { icon: "fa-clipboard", title: "Testimonials", link: "/" },
                                    { icon: "fa-map-signs", title: "Contact", link: "/" },
                                ].map((item, index) => (
                                    <div className="hexagon-item" key={index}>
                                    <div className="hex-item">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                    <div className="hex-item">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                    <Link to={item.link} className="hex-content">
                                        <span className="hex-content-inner">
                                        <span className="icon">
                                            <i className={`fa ${item.icon}`}></i>
                                        </span>
                                        <span className="title">{item.title}</span>
                                        </span>
                                        <svg
                                        viewBox="0 0 173.20508075688772 200"
                                        height="200"
                                        width="174"
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        >
                                        <path
                                            d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
                                            fill="#1e2530"
                                        ></path>
                                        </svg>
                                    </Link>
                                    </div>
                                ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Services;