import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userOrders } from "../Redux/Actions/actions";
import { useNavigate } from "react-router-dom";

const UserOrdersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.users.auth);
  const { orders } = useSelector((state) => state.order.UserOrders);

  useEffect(() => {
    if (user?._id) {
      dispatch(userOrders(user._id));
    }
  }, [user._id, dispatch]);

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-center mb-4" style={{ color: "#0d6efd" }}>
        📦 My Orders
      </h2>

      {orders && orders.length > 0 ? (
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card border-0 shadow-sm rounded-4 p-4">
              <div className="table-responsive">
                <table className="table table-striped align-middle text-center">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th>Order ID</th>
                      <th>Item</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => {
                      const firstItem = order.orderItems[0];
                      const total = order.orderItems.reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0
                      );
                      return (
                        <tr key={order._id}>
                          <td>{order._id}</td>
                          <td>{firstItem?.name}</td>
                          <td>{firstItem?.quantity}</td>
                          <td>₹{firstItem?.price}</td>
                          <td>₹{total}</td>
                          <td>
                            <span
                              className={`badge ${
                                order.isDelivered
                                  ? "bg-success"
                                  : "bg-warning text-dark"
                              }`}
                            >
                              {order.isDelivered ? "Delivered" : "Processing"}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-primary rounded-3"
                              onClick={() =>
                                navigate(`/order/${order._id}`)
                              }
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h5 className="text-center text-muted mt-5">No orders yet 🛍️</h5>
      )}

      <div className="text-center mt-4">
        <button
          className="btn btn-outline-primary px-4 py-2 rounded-3 fw-semibold"
          onClick={() => navigate("/")}
        >
          🛍️ Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default UserOrdersPage;
