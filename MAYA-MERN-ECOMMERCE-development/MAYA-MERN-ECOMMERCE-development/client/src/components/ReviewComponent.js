import React, { useState } from "react";
import Rating from "react-rating";
import { useDispatch } from "react-redux";
import { addReview } from "./Redux/Actions/actions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ReviewComponent = ({ user, product }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleReviews = () => {
    let alreadyReviewed = false;

    if (product.reviews && product.reviews.length > 0) {
      for (let i = 0; i < product.reviews.length; i++) {
        if (product.reviews[i].userID === user._id) {
          alreadyReviewed = true;
          break;
        }
      }
    }

    if (alreadyReviewed) {
      setComment("");
      setRating(0);
      toast.warning("You have already reviewed this product", {
        position: "bottom-left",
    }
);
    } else {
      const review = {
        name: user.name,
        userID: user._id,
        comment: comment,
        rating: rating,
      };

      dispatch(addReview({ review, product }));
      setComment("");
      setRating(0);
      toast.success("Review submitted successfully!", { position: "bottom-left" });
    }
  };

  return (
    <div className="mt-5">
      <h4 className="text-primary fw-bold mb-3">Customer Reviews</h4>

      {/* Review form layout */}
      <div className="card shadow-sm p-3 mb-4">
        <h5 className="fw-semibold mb-2">Write a Review</h5>

        <Rating
          initialRating={rating}
          onChange={(e) => setRating(e)}
          emptySymbol={
            <i className="fa fa-star-o fa-2x" style={{ color: "#ccc" }} />
          }
          fullSymbol={
            <i className="fa fa-star fa-2x" style={{ color: "#FFD700" }} />
          }
          fractions={2}
        />

        <textarea
          className="form-control mb-2 mt-3"
          rows="3"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience..."
        ></textarea>
        {user._id ? ( <button className="btn btn-primary" onClick={handleReviews}>
          Submit Review
        </button>):( <button className="btn btn-primary" onClick={() => navigate("/login")}>
          Login to Review
        </button>)}
       
      </div>

      {/* Review List */}
      <div className="card shadow-sm p-3">
        <h5 className="fw-semibold mb-3">Customer Feedback</h5>
        {product.reviews && product.reviews.length > 0 ? (
          product.reviews.map((rev, index) => (
            <div
              key={index}
              className="border-bottom pb-2 mb-3"
            >
              <div className="d-flex align-items-center justify-content-between">
                <strong>{rev.name}</strong>
                <Rating
                  initialRating={rev.rating}
                  readonly
                  emptySymbol={
                    <i
                      className="fa fa-star-o"
                      style={{ color: "#ccc", fontSize: "18px" }}
                    />
                  }
                  fullSymbol={
                    <i
                      className="fa fa-star"
                      style={{ color: "#FFD700", fontSize: "18px" }}
                    />
                  }
                />
              </div>
              <p className="mt-2 mb-1 text-muted">{rev.comment}</p>
              <small className="text-secondary">
                {rev.createdAt
                  ? new Date(rev.createdAt).toLocaleDateString()
                  : ""}
              </small>
            </div>
          ))
        ) : (
          <p className="text-muted">No reviews yet. Be the first to review!</p>
        )}
      </div>
    </div>
  );
};

export default ReviewComponent;
