import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const PaymentSuccess = () => {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center" 
         style={{ minHeight: "100vh" }}>
      <CheckCircle color="#28a745" size={80} className="mb-4" />
      <h1 className="fw-bold text-success mb-2">Payment Successful!</h1>
      <p className="text-muted mb-4">
        Your order has been placed successfully. 🎉
      </p>
      <Link to="/UserOrders" className="btn btn-success px-4 py-2 fw-bold rounded-3">
        View My Orders
      </Link>
      <Link to="/" className="btn btn-outline-secondary px-4 py-2 mt-3 rounded-3">
        Continue Shopping
      </Link>
    </div>
  );
};

export default PaymentSuccess;
