import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "../Redux/Actions/actions";
import { addItem } from "../Redux/Slices/cartSlice";
import ReviewComponent from "../ReviewComponent";
const ProductDesScreen = () => {
  const params = useParams();
  const productId = params.id;
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const { product, status, error } = useSelector(
    (state) => state.products.productById
  );
  const user = useSelector((state) => state.users.auth);

  const handleAddCart = () => {
    dispatch(addItem({ product, quantity }));
  };

  useEffect(() => {
    dispatch(getProductById(productId));
  }, [dispatch, productId]);

  if (error)
    return <h1 className="text-center mt-5 text-danger">Product not found ❌</h1>;

  return (
    <div
      className="container mt-5 py-4"
      style={{
        background: "linear-gradient(135deg, #f9f9ff, #e3f2fd)",
        borderRadius: "20px",
      }}
    >
      {status === "LOADING" && (
        <h4 className="text-center text-primary">Loading product...</h4>
      )}

      <div className="row align-items-center">
        {/* Product Image */}
        <div className="col-md-6 text-center mb-4">
          <div
            className="card border-0 shadow-lg rounded-4 p-4"
            style={{
              backgroundColor: "#ffffff",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid rounded-4"
              style={{
                maxHeight: "400px",
                objectFit: "contain",
                transition: "transform 0.3s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="col-md-6">
          <div
            className="card border-0 shadow-lg p-4 rounded-4"
            style={{ backgroundColor: "#ffffff" }}
          >
            <h2 className="fw-bold text-primary mb-3">{product.name}</h2>
            <p className="text-muted mb-4" style={{ fontSize: "1.1rem" }}>
              {product.description}
            </p>
            <h3 className="text-success fw-bold mb-3">
              ₹{product.price} <span className="fs-5 text-secondary">/piece</span>
            </h3>

            <hr />

            <div className="mb-3">
              <label htmlFor="quantity" className="form-label fw-semibold">
                Select Quantity
              </label>
              <select
                id="quantity"
                className="form-select w-50"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              >
                {[...Array(product.countInStock || 0).keys()].map((x, i) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="d-grid mt-4">
              <button
                className="btn btn-lg fw-bold text-white"
                style={{
                  background: "linear-gradient(90deg, #007bff, #00c6ff)",
                  border: "none",
                }}
                onClick={handleAddCart}
                disabled={product.countInStock === 0}
              >
                {product.countInStock === 0 ? "Out of Stock" : "🛒 Add to Cart"}
              </button>
            </div>

            <div className="mt-3">
              <small className="text-muted">
                {product.countInStock > 0
                  ? `${product.countInStock} items available`
                  : "No stock available"}
              </small>
            </div>
            <div>
            <ReviewComponent user={user} product={product}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDesScreen;
