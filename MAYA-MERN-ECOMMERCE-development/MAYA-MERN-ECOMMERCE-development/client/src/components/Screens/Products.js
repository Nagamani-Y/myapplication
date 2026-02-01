import axios from 'axios';
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../Redux/Actions/actions';
import SearchProducts from '../Utils/SearchContainer';
import FilterProducts from '../Utils/FilterProducts';
import ProductShimmer from '../Shimmers/ProductScreenAShim';

const Products = () => {
  const { products, status, error } = useSelector((state) => state.products.productsList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (error) {
    return <div className='text-center mt-5 text-danger fw-bold'>Error: {error}</div>;
  }

  return (
    <>
      <div className="d-flex flex-wrap justify-content-center align-items-center gap-3 mt-4">
        {/* Search bar */}
        <SearchProducts />

        {/* Sort Dropdown */}
        <FilterProducts />
        
      </div>


      <div className='container mt-5'>
        {status === 'LOADING' ? (
          <ProductShimmer />
        ) : (
          <div className="row justify-content-center">
            {products.map((product) => (
              <div
                key={product._id}
                className="col-md-3 col-sm-6 m-3"
              >
                <div
                  className="card border-0 shadow-sm h-100 p-3"
                  style={{
                    borderRadius: "16px",
                    backgroundColor: "#ffffff",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
                  }}
                >
                  <Link
                    to={`/product/${product._id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <img
                      src={product.image}
                      className="img-fluid rounded"
                      alt={product.name}
                      style={{
                        height: "220px",
                        objectFit: "cover",
                        borderRadius: "12px",
                      }}
                    />
                    <div className="mt-3 text-center">
                      <h5 className="fw-semibold text-dark">{product.name}</h5>
                      <Rating
                        readonly
                        allowFraction
                        initialValue={product.rating}
                        size={22}
                        fillColor="#f7c948"
                        emptyColor="#d3d3d3"
                      />
                      <h6 className="mt-2 text-success fw-bold">
                        ₹{product.price}
                      </h6>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
