import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders } = useSelector((state) => state.order.UserOrders);

  const order = orders.find((o) => o._id === id);

  if (!order) {
    return (
      <div className="text-center mt-5">
        <h5>Order not found</h5>
        <button
          className="btn btn-outline-primary mt-3"
          onClick={() => navigate("/userOrders")}
        >
          🔙 Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-center mb-4" style={{ color: "#0d6efd" }}>
        🧾 Order Details
      </h2>

      <div className="card border-0 shadow-sm rounded-4 p-4 mx-auto" style={{ maxWidth: "800px" }}>
        <h5 className="fw-bold text-primary mb-3">
          Order ID: <span className="text-dark">{order._id}</span>
        </h5>
        <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
        <p><strong>Transaction ID:</strong> {order.transactionId}</p>
        <p><strong>Email:</strong> {order.email}</p>
        <p>
          <strong>Shipping:</strong>{" "}
          {order.shippingAddress[0]?.address}, {order.shippingAddress[0]?.city},{" "}
          {order.shippingAddress[0]?.country} - {order.shippingAddress[0]?.zipcode}
        </p>

        <div className="table-responsive mt-3">
          <table className="table table-striped align-middle text-center">
            <thead className="bg-primary text-white">
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.price}</td>
                  <td>₹{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-between mt-3">
          <h5>
            Total: ₹
            {order.orderItems.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            )}
          </h5>
          <span
            className={`badge ${
              order.isDelivered ? "bg-success" : "bg-warning text-dark"
            } px-3 py-2`}
          >
            {order.isDelivered ? "Delivered" : "Processing"}
          </span>
        </div>

        <div className="text-center mt-4">
          <button
            className="btn btn-outline-primary px-4 py-2 rounded-3 fw-semibold"
            onClick={() => navigate("/userOrders")}
          >
            🔙 Back to My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
