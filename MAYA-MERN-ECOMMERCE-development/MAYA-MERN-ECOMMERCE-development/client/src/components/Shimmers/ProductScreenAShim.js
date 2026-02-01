import React from "react";

const ProductShimmer = () => {
  const shimmerCards = Array(6).fill(0); // show 6 placeholders

  const shimmerAnimation = {
    animation: "shimmer 1.5s infinite linear",
    background: "linear-gradient(90deg, #f0f0f0 25%, #e6e6e6 50%, #f0f0f0 75%)",
    backgroundSize: "200% 100%",
  };

  return (
    <div className="container my-4">
      <style>
        {`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}
      </style>

      <div className="row justify-content-center">
        {shimmerCards.map((_, index) => (
          <div key={index} className="col-md-3 col-sm-6 mb-4">
            <div
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "16px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
              }}
            >
              {/* Image shimmer */}
              <div
                style={{
                  ...shimmerAnimation,
                  height: "180px",
                  borderRadius: "10px",
                  marginBottom: "10px",
                }}
              ></div>

              {/* Text shimmer lines */}
              <div
                style={{
                  ...shimmerAnimation,
                  height: "14px",
                  width: "75%",
                  borderRadius: "4px",
                  marginBottom: "8px",
                }}
              ></div>
              <div
                style={{
                  ...shimmerAnimation,
                  height: "14px",
                  width: "50%",
                  borderRadius: "4px",
                  marginBottom: "12px",
                }}
              ></div>
              <div
                style={{
                  ...shimmerAnimation,
                  height: "14px",
                  width: "25%",
                  borderRadius: "4px",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductShimmer;
