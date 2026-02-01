import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logoutUser } from "./Redux/Slices/userAutSlice";
import { clearCart } from "./Redux/Slices/cartSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const token = useSelector((state) => state.users.auth);
  const totalQuantity = cartItems?.length || 0;
  const user = token;

  //Manual Offcanvas control (no Bootstrap JS)
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  const handleNavigate = (path) => {
    setIsOpen(false);
    setTimeout(() => navigate(path), 250);
  };

  const handleLogout = () => {
    setIsOpen(false);
    dispatch(logoutUser(null));
    dispatch(clearCart());
    toast.warning("Logged Out!...", { position: "bottom-left" });
    setTimeout(() => navigate("/login"), 250);
  };

  //Disable scroll when drawer open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isOpen]);

  return (
    <>
      {/* Navbar */}
      <nav
        className="navbar navbar-dark sticky-top shadow-sm"
        style={{
          background: "linear-gradient(90deg, #0d6efd, #20c997)",
          padding: "0.8rem 1.5rem",
        }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold fs-4 text-white" to="/">
            <i className="fa-solid fa-store me-2"></i>Maya's Store
          </Link>

          {/* Hamburger Icon */}
          <button className="navbar-toggler border-0" type="button" onClick={handleOpen}>
            <i className="fa-solid fa-bars text-white fs-3"></i>
          </button>
        </div>
      </nav>


      <div
        className={`offcanvas offcanvas-end text-bg-dark ${isOpen ? "show" : ""}`}
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          visibility: isOpen ? "visible" : "hidden",
          transition: "transform 0.3s ease-in-out, visibility 0.3s ease-in-out",
          width: "270px",
          zIndex: 1045,
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
        }}
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title fw-bold">
            <i className="fa-solid fa-store me-2 text-info"></i>Maya's Store
          </h5>
          <button type="button" className="btn-close btn-close-white" onClick={handleClose}></button>
        </div>

        <div className="offcanvas-body d-flex flex-column justify-content-between">
          <ul className="navbar-nav flex-grow-1">
            {user.token ? (
              <>
                <li className="nav-item mt-3 mb-2 text-light">
                  👋 Hi, <strong>{user.name || "User"}</strong>
                </li>
                <hr className="text-secondary" />
                <li className="nav-item mb-2">
                  <button
                    className="nav-link text-white bg-transparent border-0"
                    onClick={() => handleNavigate("/userProfile")}
                  >
                    <i className="fa-solid fa-user me-2 text-info"></i>
                    Profile
                  </button>
                </li>
                <li className="nav-item mb-2">
                  <button
                    className="nav-link text-white bg-transparent border-0"
                    onClick={() => handleNavigate("/UserOrders")}
                  >
                    <i className="fa-solid fa-box me-2 text-success"></i>
                    Orders
                  </button>
                </li>
                <li className="nav-item mb-2">
                  <button
                    className="nav-link text-danger bg-transparent border-0 fw-semibold"
                    onClick={handleLogout}
                  >
                    <i className="fa-solid fa-right-from-bracket me-2"></i>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item mb-2">
                  <button
                    className="nav-link text-white bg-transparent border-0"
                    onClick={() => handleNavigate("/login")}
                  >
                    <i className="fa-solid fa-right-to-bracket me-2"></i>
                    Login
                  </button>
                </li>
                <li className="nav-item mb-2">
                  <button
                    className="nav-link text-white bg-transparent border-0"
                    onClick={() => handleNavigate("/register")}
                  >
                    <i className="fa-solid fa-user-plus me-2"></i>
                    Register
                  </button>
                </li>
              </>
            )}
            <li className="nav-item mb-2">
              <button
                className="nav-link text-white bg-transparent border-0"
                onClick={() => handleNavigate("/cart")}
              >
                <i className="fa-solid fa-cart-shopping me-2 text-warning"></i>
                Cart{" "}
                {totalQuantity > 0 && (
                  <span className="badge bg-danger ms-1">{totalQuantity}</span>
                )}
              </button>
            </li>
          </ul>

          <div className="border-top pt-3 text-center text-secondary small">
            © {new Date().getFullYear()} Maya's Store
          </div>
        </div>
      </div>

      {/* ustom Backdrop */}
      {isOpen && (
        <div
          className="offcanvas-backdrop fade show"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1040,
          }}
          onClick={handleClose}
        ></div>
      )}
    </>
  );
};

export default Navbar;
