import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, deleteCartItem, clearCart } from "../Redux/Slices/cartSlice";
import PaymentButton from "../paymentButton";
import { useNavigate, Link } from "react-router-dom";

const CartPage = () => {
  const cartItems = useSelector((state) => state?.cart?.cartItems);
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.auth);
  const dispatch = useDispatch();

  const handleAddCart = (product, quantity) => {
    dispatch(addItem({ product, quantity }));
  };

  const handleDelete = (delItem) => {
    dispatch(deleteCartItem(delItem));
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear the entire cart?")) {
      dispatch(clearCart());
    }
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="container pt-3  my-5">
      <h2 className="text-center fw-bold mb-4" style={{ color: "#0d6efd" }}>
        🛒 My Shopping Cart
      </h2>

      {cartItems.length === 0 ? (
        <div className="text-center text-muted mt-5 pt-5">
          <i
            className="fa fa-shopping-cart fa-3x mb-3"
            style={{ color: "#9e9e9e" }}
          ></i>
          <h5>Your cart is empty</h5>
          <Link
            to="/"
            className="btn btn-outline-primary px-4 py-2 mt-3 rounded-3"
          >
            Back To Home
          </Link>
        </div>
      ) : (
        <div className="row justify-content-center g-4">
          {/* Left side - Cart Items */}
          <div className="col-lg-8">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="card mb-3 shadow-sm border-0 rounded-4"
                style={{
                  background: "#ffffff",
                  transition: "0.3s",
                }}
              >
                <div className="row g-0 align-items-center p-3">
                  <div className="col-md-3 text-center">
                    <Link 
                    to={`/product/${item?.product?._id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}>
                    <img
                      src={item?.product?.image}
                      alt={item?.product?.name}
                      className="img-fluid rounded-3"
                      style={{
                        maxHeight: "120px",
                        objectFit: "contain",
                      }}
                    />
                    </Link>
                  </div>

                  <div className="col-md-6">
                    <div className="card-body">
                      <h5 className="card-title fw-semibold">
                        {item?.product?.name}
                      </h5>
                      <p className="text-success fw-bold mb-1">
                        ₹{item?.product?.price}
                      </p>
                      <div className="d-flex align-items-center mt-2">
                        <label className="me-2 mb-0">Qty:</label>
                        <select
                          className="form-select form-select-sm w-auto"
                          value={item?.quantity}
                          onChange={(e) =>
                            handleAddCart(item?.product, e.target.value)
                          }
                        >
                          {[...Array(item?.product?.countInStock).keys()].map(
                            (x, i) => (
                              <option key={i + 1} value={i + 1}>
                                {i + 1}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3 text-center">
                    <h6 className="fw-bold text-primary mb-2">
                      ₹{item?.product?.price * item?.quantity}
                    </h6>
                    <button
                      className="btn btn-sm btn-outline-danger rounded-pill"
                      onClick={() => handleDelete(item?.product)}
                    >
                      <i className="fa fa-trash me-1"></i> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Buttons */}
            <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap">
              <Link
                to="/"
                className="btn btn-outline-primary px-4 py-2 fw-semibold rounded-pill shadow-sm mb-3"
              >
                <i className="fa fa-arrow-left me-2"></i> Continue Shopping
              </Link>

              <button
                className="btn btn-outline-danger px-4 py-2 fw-semibold rounded-pill shadow-sm mb-3"
                onClick={handleClearCart}
              >
                <i className="fa fa-trash me-2"></i> Clear Cart
              </button>
            </div>
          </div>

          {/* Right side - Order Summary */}
          <div className="col-lg-4">
            <div
              className="card border-0 shadow-lg rounded-4 p-4"
              style={{
                background: "linear-gradient(135deg, #f1f8e9, #dcedc8)",
              }}
            >
              <h5
                className="fw-bold text-center mb-3"
                style={{ color: "#2e7d32" }}
              >
                🧾 Order Summary
              </h5>
              <p className="d-flex justify-content-between mb-2">
                <span>Total Items:</span>
                <span>{cartItems.length}</span>
              </p>
              <p className="d-flex justify-content-between fw-bold mb-3">
                <span>Total Amount:</span>
                <span className="text-success">₹{totalAmount}</span>
              </p>

              {user._id ? (
                <PaymentButton cartItems={cartItems} amount={totalAmount} />
              ) : (
                <button
                  className="btn w-100 fw-bold text-white mt-2 rounded-pill"
                  style={{
                    background: "linear-gradient(90deg, #28a745, #20c997)",
                    border: "none",
                  }}
                  onClick={() => navigate("/login")}
                >
                  Login to Continue
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
