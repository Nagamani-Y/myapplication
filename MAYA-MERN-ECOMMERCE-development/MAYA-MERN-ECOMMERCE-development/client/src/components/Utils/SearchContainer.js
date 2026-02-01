import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { searchProducts,getAllProducts } from "../Redux/Actions/actions";

const SearchProducts = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const hasMounted = useRef(false);

  // Debounce effect: waits 400ms after user stops typing
  useEffect(() => {
     if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    const delay = setTimeout(() => {
      if (searchQuery.trim() !== "") {
        dispatch(searchProducts(searchQuery));
      } else {
      dispatch(getAllProducts());
    }
  }, 400);

    return () => clearTimeout(delay);
  }, [searchQuery, dispatch]);

  return (
    <div
      className="d-flex align-items-center position-relative"
      style={{ width: "50%", maxWidth: "400px" }}
    >
      <input
        type="text"
        className="form-control shadow-sm px-4 py-2"
        placeholder="Search for..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          borderRadius: "30px",
          border: "1px solid #ccc",
          fontSize: "15px",
          paddingRight: "40px",
        }}
      />
      <i
        className="bi bi-search position-absolute"
        style={{
          right: "15px",
          color: "#777",
          cursor: "pointer",
        }}
      ></i>
    </div>
  );
};

export default SearchProducts;
