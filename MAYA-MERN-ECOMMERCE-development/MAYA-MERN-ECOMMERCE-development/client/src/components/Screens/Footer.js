import React from "react";

const Footer = () => {
  return (
    <footer
      className="bg-dark text-light py-3 mt-auto border-top"
      style={{
        fontSize: "0.95rem",
      }}
    >
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        {/* Left Section */}
        <div className="text-center text-md-start mb-2 mb-md-0">
          <h6 className="mb-1 fw-semibold">Maya’s Store</h6>
          <p className="mb-0 text-secondary">
            Shop smart, live better — since {new Date().getFullYear()}.
          </p>
        </div>

        {/* Center Links */}
        <div className="d-flex gap-3 my-2 my-md-0">
          <a href="/privacy" className="text-light text-decoration-none">
            Privacy Policy
          </a>
          <a href="/terms" className="text-light text-decoration-none">
            Terms of Use
          </a>
          <a href="/contact" className="text-light text-decoration-none">
            Contact
          </a>
        </div>

        {/* Right Social Icons */}
        <div className="d-flex gap-3">
          <a href="#" className="text-light">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-light">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="text-light">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </div>

      <div className="text-center mt-2 text-secondary small">
        © {new Date().getFullYear()} Maya’s Store. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
